import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getScoreColor(score: number): string {
  if (score >= 75) return "#10B981";
  if (score >= 50) return "#3B82F6";
  if (score >= 25) return "#F59E0B";
  return "#EF4444";
}

function getRiskLabel(score: number): string {
  if (score >= 75) return "Low Risk";
  if (score >= 50) return "Moderate Risk";
  if (score >= 25) return "High Risk";
  return "Critical Risk";
}

function getScoreColorBg(score: number): string {
  if (score >= 75) return "rgba(16, 185, 129, 0.15)";
  if (score >= 50) return "rgba(59, 130, 246, 0.15)";
  if (score >= 25) return "rgba(245, 158, 11, 0.15)";
  return "rgba(239, 68, 68, 0.15)";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const score = parseInt(searchParams.get("score") || "50", 10);
  const job = searchParams.get("job") || "Professional";

  const color = getScoreColor(score);
  const riskLabel = getRiskLabel(score);
  const scoreBg = getScoreColorBg(score);

  // Skill breakdown bars for visual interest
  const skills = [
    { label: "Creative Thinking", value: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
    { label: "Technical Depth", value: Math.min(100, score + Math.floor(Math.random() * 30) - 15) },
    { label: "Human Connection", value: Math.min(100, score + Math.floor(Math.random() * 25) - 12) },
    { label: "Adaptability", value: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
    { label: "Domain Expertise", value: Math.min(100, score + Math.floor(Math.random() * 30) - 15) },
    { label: "Leadership", value: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
  ].map((s) => ({ ...s, value: Math.max(5, Math.min(100, s.value)) }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          background: "linear-gradient(135deg, #0A0E1A 0%, #111827 50%, #0A0E1A 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            padding: "48px 56px",
            position: "relative",
          }}
        >
          {/* Left side - Score */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "45%",
              paddingRight: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span style={{ color: "#94A3B8", fontSize: "16px", fontWeight: 600 }}>
                SkillShield
              </span>
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#64748B",
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
                marginBottom: "8px",
                display: "flex",
              }}
            >
              AI Career Risk Score
            </div>

            <div
              style={{
                fontSize: "140px",
                fontWeight: 800,
                color: color,
                lineHeight: 1,
                letterSpacing: "-4px",
                fontFamily: "monospace",
                display: "flex",
                textShadow: `0 0 60px ${color}40`,
              }}
            >
              {score}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "12px",
                padding: "6px 16px",
                borderRadius: "20px",
                background: scoreBg,
                border: `1px solid ${color}30`,
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 600, color: color }}>
                {riskLabel}
              </span>
            </div>

            <div
              style={{
                fontSize: "22px",
                color: "#CBD5E1",
                marginTop: "16px",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {job}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)",
              display: "flex",
            }}
          />

          {/* Right side - Skill bars */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "55%",
              paddingLeft: "48px",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#E2E8F0",
                marginBottom: "8px",
                display: "flex",
              }}
            >
              Skill Breakdown
            </div>
            {skills.map((skill) => (
              <div
                key={skill.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#94A3B8" }}>
                    {skill.label}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: getScoreColor(skill.value),
                      fontFamily: "monospace",
                    }}
                  >
                    {skill.value}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${skill.value}%`,
                      height: "100%",
                      borderRadius: "4px",
                      background: `linear-gradient(90deg, ${getScoreColor(skill.value)}CC, ${getScoreColor(skill.value)})`,
                      display: "flex",
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Footer CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "12px",
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              <span>Take the free quiz at</span>
              <span style={{ color: "#3B82F6", fontWeight: 600 }}>
                skillshield.ai
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
