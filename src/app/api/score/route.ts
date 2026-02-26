import { NextRequest, NextResponse } from "next/server";
import { calculateScore } from "@/lib/scoring-engine";
import { QuizAnswer } from "@/lib/types";
import { kv, keys, addEmailScoreAssociation, getEmailScores } from "@/lib/kv";
import type { ScoringResult } from "@/lib/types";

interface ScoreRequest {
  answers: QuizAnswer[];
  jobCategoryId: string;
  email?: string;
}

/**
 * GET /api/score?id=<score_id> — Fetch a saved score result from KV
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter" },
      { status: 400 }
    );
  }

  const score = await kv.get(keys.score(id));

  if (!score) {
    return NextResponse.json(
      { error: "Score not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(score);
}

/**
 * POST /api/score — Calculate a new score from quiz answers and save to KV
 */
export async function POST(request: NextRequest) {
  try {
    const body: ScoreRequest = await request.json();

    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { error: "Missing or invalid 'answers' array" },
        { status: 400 }
      );
    }

    if (!body.jobCategoryId || typeof body.jobCategoryId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'jobCategoryId'" },
        { status: 400 }
      );
    }

    const result = calculateScore(body.answers, body.jobCategoryId);

    // Generate a unique score ID and persist
    const scoreId = crypto.randomUUID().slice(0, 12);
    const resultWithId = { ...result, scoreId };

    await kv.set(keys.score(scoreId), resultWithId, { ex: 60 * 60 * 24 * 90 }); // 90 days TTL

    // Fetch previous score for comparison (if email provided)
    let previousScore: { overallScore: number; dimensions: ScoringResult["dimensions"]; createdAt: number } | null = null;
    if (body.email && typeof body.email === "string" && body.email.includes("@")) {
      // Get previous scores before adding the new one
      const existingScores = await getEmailScores(body.email);
      if (existingScores.length > 0) {
        // Most recent previous score
        const sorted = existingScores.sort((a, b) => b.createdAt - a.createdAt);
        const prevEntry = sorted[0];
        const prevData = await kv.get<ScoringResult>(keys.score(prevEntry.scoreId));
        if (prevData) {
          previousScore = {
            overallScore: prevData.overallScore,
            dimensions: prevData.dimensions,
            createdAt: prevEntry.createdAt,
          };
        }
      }

      // Associate email with score (non-blocking)
      addEmailScoreAssociation(body.email, {
        scoreId,
        overallScore: result.overallScore,
        jobCategoryId: body.jobCategoryId,
        createdAt: Date.now(),
      }).catch((err) => console.error("[Score] Email association failed:", err));
    }

    return NextResponse.json({ ...resultWithId, previousScore });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
