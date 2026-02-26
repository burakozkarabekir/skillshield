import { NextRequest, NextResponse } from "next/server";
import { getEmailScores, kv, keys } from "@/lib/kv";
import type { ScoringResult } from "@/lib/types";

/**
 * GET /api/progress?email=X — Fetch all scores associated with an email
 * GET /api/progress?email=X&full=true — Include full dimension breakdowns
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const full = searchParams.get("full") === "true";

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Gecerli bir e-posta adresi gerekli" },
      { status: 400 }
    );
  }

  const entries = await getEmailScores(email);

  if (!entries || entries.length === 0) {
    return NextResponse.json(
      { error: "Bu e-posta icin skor bulunamadi", scores: [] },
      { status: 404 }
    );
  }

  // Sort by createdAt descending (newest first)
  entries.sort((a, b) => b.createdAt - a.createdAt);

  if (!full) {
    return NextResponse.json({ scores: entries });
  }

  // Full mode: fetch dimension breakdowns for each score
  const scoresWithDimensions = await Promise.all(
    entries.map(async (entry) => {
      const scoreData = await kv.get<ScoringResult>(keys.score(entry.scoreId));
      return {
        ...entry,
        dimensions: scoreData?.dimensions ?? [],
        riskLabel: scoreData?.riskLabel ?? "",
        summary: scoreData?.summary ?? "",
      };
    })
  );

  return NextResponse.json({ scores: scoresWithDimensions });
}
