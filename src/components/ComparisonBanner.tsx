"use client";

import type { DimensionScore } from "@/lib/types";

interface PreviousScore {
  overallScore: number;
  dimensions: DimensionScore[];
  createdAt: number;
}

interface ComparisonBannerProps {
  currentScore: number;
  currentDimensions: DimensionScore[];
  previous: PreviousScore;
}

function getScoreColor(score: number): string {
  if (score >= 65) return "var(--risk-high)";
  if (score >= 35) return "var(--risk-medium)";
  return "var(--risk-low)";
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ComparisonBanner({
  currentScore,
  currentDimensions,
  previous,
}: ComparisonBannerProps) {
  const overallDiff = currentScore - previous.overallScore;
  const improved = overallDiff < 0;
  const daysBetween = Math.round(
    (Date.now() - previous.createdAt) / (1000 * 60 * 60 * 24)
  );

  let summaryMessage: string;
  if (improved) {
    if (daysBetween > 60) {
      summaryMessage = `${Math.round(daysBetween / 30)} ayda ${Math.abs(overallDiff)} puan iyilestiniz!`;
    } else {
      summaryMessage = `${daysBetween} gunde ${Math.abs(overallDiff)} puan iyilestiniz!`;
    }
  } else if (overallDiff > 0) {
    summaryMessage = `Risk skorunuz ${overallDiff} puan artti. Detaylari inceleyin.`;
  } else {
    summaryMessage = "Skorunuz onceki degerlendirmeyle ayni kaldi.";
  }

  return (
    <div className="p-6 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent)]/5 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
          Ilerleme Karsilastirmasi
        </span>
        <span className="text-xs opacity-50">
          vs {formatDate(previous.createdAt)}
        </span>
      </div>

      {/* Overall score comparison */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="text-center">
          <p className="text-xs opacity-50 mb-1">Onceki</p>
          <p
            className="text-3xl font-bold"
            style={{ color: getScoreColor(previous.overallScore) }}
          >
            {previous.overallScore}
          </p>
        </div>
        <span className="text-2xl opacity-30">&rarr;</span>
        <div className="text-center">
          <p className="text-xs opacity-50 mb-1">Simdi</p>
          <p
            className="text-3xl font-bold"
            style={{ color: getScoreColor(currentScore) }}
          >
            {currentScore}
          </p>
        </div>
        <span
          className={`text-lg font-bold px-3 py-1 rounded-full ${
            improved
              ? "bg-green-100 text-green-700"
              : overallDiff > 0
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {overallDiff > 0 ? "+" : ""}
          {overallDiff}
        </span>
      </div>

      <p className="text-center text-sm font-medium mb-6">{summaryMessage}</p>

      {/* Dimension-level comparison bars */}
      <div className="space-y-3">
        {currentDimensions.map((dim) => {
          const prevDim = previous.dimensions.find(
            (d) => d.dimension === dim.dimension
          );
          const prevScore = prevDim?.score ?? 0;
          const dimDiff = dim.score - prevScore;
          const dimColor = getScoreColor(dim.score);

          return (
            <div key={dim.dimension}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{dim.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-50">{prevScore}</span>
                  <span className="text-xs opacity-30">&rarr;</span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: dimColor }}
                  >
                    {dim.score}
                  </span>
                  {dimDiff !== 0 && (
                    <span
                      className={`text-xs font-semibold ${
                        dimDiff < 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ({dimDiff > 0 ? "+" : ""}
                      {dimDiff})
                    </span>
                  )}
                </div>
              </div>
              <div className="relative w-full h-2 rounded-full bg-[var(--card-border)]">
                {/* Previous score indicator */}
                <div
                  className="absolute h-full rounded-full opacity-30"
                  style={{
                    width: `${prevScore}%`,
                    backgroundColor: getScoreColor(prevScore),
                  }}
                />
                {/* Current score */}
                <div
                  className="absolute h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${dim.score}%`,
                    backgroundColor: dimColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
