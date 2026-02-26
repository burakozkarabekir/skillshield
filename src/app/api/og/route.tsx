import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get("score") ?? "50", 10);
  const headline =
    searchParams.get("headline") ?? "Check your AI Career Risk Score";
  const riskLevel =
    score <= 35 ? "Low Risk" : score <= 65 ? "Medium Risk" : "High Risk";
  const ringColor = score <= 35 ? "#40c057" : score <= 65 ? "#fab005" : "#fa5252";
  const riskBg =
    score <= 35
      ? "rgba(64, 192, 87, 0.15)"
      : score <= 65
      ? "rgba(250, 176, 5, 0.15)"
      : "rgba(250, 82, 82, 0.15)";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(66, 99, 235, 0.15), transparent 60%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Shield icon + Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            color: "#748ffc",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#748ffc"
            strokeWidth="2"
          >
            <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          AdaptAI
        </div>

        {/* Score circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border: `6px solid ${ringColor}`,
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "64px",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              {score}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              out of 100
            </span>
          </div>
        </div>

        {/* Risk badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            backgroundColor: riskBg,
            color: ringColor,
            fontSize: "16px",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          {riskLevel}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: "500px",
            lineHeight: 1.3,
            marginBottom: "16px",
          }}
        >
          {headline}
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: "16px",
            color: "#6b7280",
          }}
        >
          Take the free quiz at adaptai.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
