import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Dynamic OG image generation for share cards
// This is THE viral asset — when someone shares their score on LinkedIn,
// this image appears in the preview and drives clicks

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const score = parseInt(searchParams.get("score") || "50");
  const jobTitle = decodeURIComponent(searchParams.get("job") || "Professional");
  const category = searchParams.get("category") || "moderate";

  const categoryColor =
    category === "critical" ? "#ef4444"
    : category === "high" ? "#f59e0b"
    : category === "moderate" ? "#6366f1"
    : "#22c55e";

  const categoryLabel =
    category === "critical" ? "CRITICAL RISK"
    : category === "high" ? "HIGH RISK"
    : category === "moderate" ? "MODERATE RISK"
    : "LOW RISK";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 50%, ${categoryColor}15 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            fontSize: "28px",
            fontWeight: "bold",
            display: "flex",
            color: "#ededed",
          }}
        >
          <span style={{ color: "#6366f1" }}>Skill</span>Shield
        </div>

        {/* Score circle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            height: "200px",
            borderRadius: "100px",
            border: `6px solid ${categoryColor}`,
            marginBottom: "24px",
            boxShadow: `0 0 60px ${categoryColor}44`,
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: categoryColor,
              lineHeight: 1,
              display: "flex",
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#888",
              display: "flex",
            }}
          >
            / 100
          </span>
        </div>

        {/* Category badge */}
        <div
          style={{
            display: "flex",
            padding: "8px 24px",
            borderRadius: "20px",
            backgroundColor: `${categoryColor}22`,
            border: `1px solid ${categoryColor}44`,
            color: categoryColor,
            fontSize: "16px",
            fontWeight: "bold",
            letterSpacing: "2px",
            marginBottom: "16px",
          }}
        >
          {categoryLabel}
        </div>

        {/* Job title */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#ededed",
            display: "flex",
            marginBottom: "8px",
          }}
        >
          {jobTitle}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "18px",
            color: "#888",
            display: "flex",
          }}
        >
          AI Career Risk Assessment
        </div>

        {/* CTA */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "18px",
            color: "#6366f1",
            fontWeight: "600",
          }}
        >
          What&apos;s YOUR score? → skillshield.ai
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
