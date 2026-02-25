"use client";

import { ScoreResult } from "@/lib/types";

interface ScoreCardProps {
  result: ScoreResult;
}

function getRingColor(score: number): string {
  if (score <= 35) return "#40c057";
  if (score <= 65) return "#fab005";
  return "#fa5252";
}

function getRiskColorClass(level: "Low" | "Medium" | "High"): string {
  switch (level) {
    case "Low":
      return "text-risk-low";
    case "Medium":
      return "text-risk-medium";
    case "High":
      return "text-risk-high";
  }
}

function getRiskBgClass(level: "Low" | "Medium" | "High"): string {
  switch (level) {
    case "Low":
      return "bg-risk-low";
    case "Medium":
      return "bg-risk-medium";
    case "High":
      return "bg-risk-high";
  }
}

export default function ScoreCard({ result }: ScoreCardProps) {
  const ringColor = getRingColor(result.overallScore);

  return (
    <div className="w-full">
      {/* Score Ring */}
      <div className="mb-8 flex flex-col items-center">
        <div
          className="score-ring animate-score"
          style={
            {
              "--ring-color": ringColor,
              "--score": result.overallScore,
            } as React.CSSProperties
          }
        >
          <div className="score-ring-inner">
            <span className="text-4xl font-black text-white">
              {result.overallScore}
            </span>
            <span className="text-xs font-medium text-gray-400">out of 100</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
              result.riskLevel === "Low"
                ? "bg-risk-low/10 text-risk-low"
                : result.riskLevel === "Medium"
                ? "bg-risk-medium/10 text-risk-medium"
                : "bg-risk-high/10 text-risk-high"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${getRiskBgClass(
                result.riskLevel
              )}`}
            />
            {result.riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Headline */}
      <h2 className="mb-2 text-center text-xl font-bold text-white sm:text-2xl">
        {result.headline}
      </h2>
      <p className="mb-8 text-center text-sm text-gray-400">
        {result.description}
      </p>

      {/* Skill Breakdown */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Risk Breakdown
        </h3>
        <div className="space-y-3">
          {result.skillBreakdown.map((item, idx) => (
            <div key={idx}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-gray-300">{item.skill}</span>
                <span
                  className={`text-xs font-semibold ${getRiskColorClass(
                    item.label
                  )}`}
                >
                  {item.risk}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                <div
                  className={`animate-risk-bar h-full rounded-full ${getRiskBgClass(
                    item.label
                  )}`}
                  style={{
                    width: `${item.risk}%`,
                    animationDelay: `${idx * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
