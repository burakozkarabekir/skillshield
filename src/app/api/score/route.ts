import { NextResponse } from "next/server";

/**
 * Score API
 *
 * GET /api/score?id=<score_id> — Fetch a shareable score result
 *
 * Returns score data for rendering the results page and OG image.
 * Rate limited via middleware (30 req/min per IP).
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

  // TODO: Fetch score from Vercel KV
  return NextResponse.json({
    id,
    score: null,
    message: "Score API scaffold — connect to KV store",
  });
}
