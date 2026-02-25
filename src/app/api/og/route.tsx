import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * OG Image Generator
 *
 * Generates dynamic social preview images for quiz results.
 * Target: < 500ms generation time.
 *
 * Usage: /api/og?title=JavaScript&score=85&total=100
 *
 * Caching strategy (set in next.config.ts headers):
 *   - Edge: s-maxage=3600 (1 hour)
 *   - Stale-while-revalidate: 86400 (24 hours)
 *   - Same URL params = same cached image
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title") || "SkillShield";
  const score = searchParams.get("score") || "0";
  const total = searchParams.get("total") || "100";

  const percentage = Math.round((parseInt(score) / parseInt(total)) * 100);

  // Color based on score
  let scoreColor = "#ef4444"; // red
  if (percentage >= 80) scoreColor = "#22c55e"; // green
  else if (percentage >= 60) scoreColor = "#eab308"; // yellow

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#888",
            marginBottom: 16,
          }}
        >
          skillshield.dev
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: scoreColor,
          }}
        >
          {percentage}%
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#888",
            marginTop: 16,
          }}
        >
          {score} / {total} correct
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
