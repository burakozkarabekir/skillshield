import { NextResponse } from "next/server";

/**
 * Quiz API
 *
 * GET /api/quiz?skill=javascript — Fetch quiz questions for a skill
 * POST /api/quiz — Submit quiz answers and get score
 *
 * Rate limited via middleware (30 req/min per IP).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skill = searchParams.get("skill");

  if (!skill) {
    return NextResponse.json(
      { error: "Missing 'skill' query parameter" },
      { status: 400 }
    );
  }

  // TODO: Fetch questions from Vercel KV
  return NextResponse.json({
    skill,
    questions: [],
    message: "Quiz API scaffold — connect to KV store",
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Validate answers, calculate score, store in KV
  return NextResponse.json({
    score: 0,
    total: 0,
    message: "Quiz submission scaffold — connect to KV store",
    answers: body,
  });
}
