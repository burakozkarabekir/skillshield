import { NextRequest, NextResponse } from "next/server";
import { calculateScore } from "@/lib/scoring-engine";
import { QuizAnswer } from "@/lib/types";

interface ScoreRequest {
  answers: QuizAnswer[];
  jobCategoryId: string;
}

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
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
