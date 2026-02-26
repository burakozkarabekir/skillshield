"use client";

import { useState } from "react";
import type { DimensionScore } from "@/lib/types";

interface ScoreEntry {
  scoreId: string;
  overallScore: number;
  jobCategoryId?: string;
  createdAt: number;
  dimensions?: DimensionScore[];
  riskLabel?: string;
  summary?: string;
}

function getRiskLabel(score: number): string {
  if (score >= 75) return "Kritik Risk";
  if (score >= 50) return "Yuksek Risk";
  if (score >= 25) return "Orta Risk";
  return "Dusuk Risk";
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

function ScoreTimeline({ scores }: { scores: ScoreEntry[] }) {
  return (
    <div className="space-y-4">
      {scores.map((entry, idx) => {
        const color = getScoreColor(entry.overallScore);
        const isLatest = idx === 0;
        const prev = scores[idx + 1];
        const diff = prev ? entry.overallScore - prev.overallScore : null;

        return (
          <div
            key={entry.scoreId}
            className={`p-5 rounded-2xl border transition-all ${
              isLatest
                ? "border-[var(--accent)] bg-[var(--accent)]/5"
                : "border-[var(--card-border)] bg-[var(--card-bg)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl font-bold"
                  style={{ color }}
                >
                  {entry.overallScore}
                </span>
                <span className="text-sm opacity-60">/100</span>
                {diff !== null && (
                  <span
                    className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                      diff < 0
                        ? "bg-green-100 text-green-700"
                        : diff > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {diff > 0 ? "+" : ""}{diff} puan
                  </span>
                )}
              </div>
              <div className="text-right">
                <span
                  className="text-xs font-semibold uppercase px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                    color,
                  }}
                >
                  {entry.riskLabel || getRiskLabel(entry.overallScore)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm opacity-60">
              <span>{formatDate(entry.createdAt)}</span>
              {isLatest && (
                <span className="text-xs font-medium text-[var(--accent)]">
                  En son
                </span>
              )}
            </div>

            {/* Dimension comparison */}
            {entry.dimensions && entry.dimensions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-3">
                  Boyut Skorlari
                </p>
                <div className="grid gap-2">
                  {entry.dimensions.map((dim) => {
                    const dimColor = getScoreColor(dim.score);
                    const prevDim = prev
                      ? scores[idx + 1]?.dimensions?.find(
                          (d) => d.dimension === dim.dimension
                        )
                      : null;
                    const dimDiff = prevDim
                      ? dim.score - prevDim.score
                      : null;

                    return (
                      <div key={dim.dimension} className="flex items-center gap-3">
                        <span className="text-sm flex-1 truncate">{dim.label}</span>
                        <div className="w-24 h-2 rounded-full bg-[var(--card-border)]">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${dim.score}%`,
                              backgroundColor: dimColor,
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-bold w-8 text-right"
                          style={{ color: dimColor }}
                        >
                          {dim.score}
                        </span>
                        {dimDiff !== null && (
                          <span
                            className={`text-xs w-10 text-right ${
                              dimDiff < 0
                                ? "text-green-600"
                                : dimDiff > 0
                                  ? "text-red-600"
                                  : "text-gray-400"
                            }`}
                          >
                            {dimDiff > 0 ? "+" : ""}{dimDiff}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ProgressPage() {
  const [email, setEmail] = useState("");
  const [scores, setScores] = useState<ScoreEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;

    setLoading(true);
    setError(null);
    setScores(null);

    try {
      const res = await fetch(
        `/api/progress?email=${encodeURIComponent(email)}&full=true`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Skorlar yuklenemedi");
        return;
      }

      setScores(data.scores);
    } catch {
      setError("Bir hata olustu. Lutfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Ilerleme Takibi</h1>
          <p className="text-[var(--foreground)] opacity-60">
            E-postanla iliskilendirilmis tum skorlarini gor ve zaman icindeki
            degisimi takip et.
          </p>
        </div>

        {/* Email lookup form */}
        <form onSubmit={handleLookup} className="mb-10">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="senin@emailin.com"
              className="flex-1 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading || !email.includes("@")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                email.includes("@") && !loading
                  ? "bg-[var(--accent)] text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Yukleniyor..." : "Skorlarimi Gor"}
            </button>
          </div>
        </form>

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-[var(--foreground)] opacity-60 mb-4">{error}</p>
            <a
              href="/quiz"
              className="inline-block rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
            >
              Ilk Testini Coz
            </a>
          </div>
        )}

        {/* Results */}
        {scores && scores.length > 0 && (
          <>
            {/* Summary banner */}
            {scores.length > 1 && (
              <div className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] mb-6 text-center">
                <p className="text-sm opacity-60 mb-1">
                  {scores.length} degerlendirme tamamlandi
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-xs opacity-50">Ilk skor</p>
                    <p className="text-xl font-bold">
                      {scores[scores.length - 1].overallScore}
                    </p>
                  </div>
                  <span className="text-2xl opacity-30">&rarr;</span>
                  <div>
                    <p className="text-xs opacity-50">Son skor</p>
                    <p
                      className="text-xl font-bold"
                      style={{ color: getScoreColor(scores[0].overallScore) }}
                    >
                      {scores[0].overallScore}
                    </p>
                  </div>
                  {(() => {
                    const change =
                      scores[0].overallScore -
                      scores[scores.length - 1].overallScore;
                    return (
                      <span
                        className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                          change < 0
                            ? "bg-green-100 text-green-700"
                            : change > 0
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {change > 0 ? "+" : ""}
                        {change} puan
                      </span>
                    );
                  })()}
                </div>
              </div>
            )}

            <ScoreTimeline scores={scores} />

            {/* Retake CTA */}
            <div className="mt-8 text-center">
              <a
                href="/quiz"
                className="inline-block rounded-xl bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-white hover:opacity-90 transition-all"
              >
                Testi Tekrar Coz
              </a>
              <p className="mt-2 text-xs opacity-50">
                Yeni beceriler edindikce skorunun nasil degistigini gor
              </p>
            </div>
          </>
        )}

        {/* Empty state with scores loaded but empty */}
        {scores && scores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--foreground)] opacity-60 mb-4">
              Bu e-posta icin henuz bir skor bulunamadi.
            </p>
            <a
              href="/quiz"
              className="inline-block rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
            >
              Ilk Testini Coz
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
