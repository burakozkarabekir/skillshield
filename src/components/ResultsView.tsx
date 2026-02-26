"use client";

import { ScoringResult, RiskLevel } from "@/lib/types";

interface ResultsViewProps {
  result: ScoringResult;
  onRetake: () => void;
}

const riskColors: Record<RiskLevel, string> = {
  high: "var(--risk-high)",
  medium: "var(--risk-medium)",
  low: "var(--risk-low)",
};

const riskBgClasses: Record<RiskLevel, string> = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

function getScoreColor(score: number): string {
  if (score >= 65) return "var(--risk-high)";
  if (score >= 35) return "var(--risk-medium)";
  return "var(--risk-low)";
}

function ScoreGauge({ score }: { score: number }) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="var(--card-border)"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm opacity-60">/ 100</span>
      </div>
    </div>
  );
}

function DimensionBar({
  label,
  score,
  explanation,
}: {
  label: string;
  score: number;
  explanation: string;
}) {
  const color = getScoreColor(score);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="w-full h-3 rounded-full bg-[var(--card-border)] mb-2">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-sm opacity-70">{explanation}</p>
    </div>
  );
}

export default function ResultsView({ result, onRetake }: ResultsViewProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Score */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Yapay Zeka Kariyer Risk Skorun</h1>
        <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6"
          style={{
            backgroundColor: `color-mix(in srgb, ${getScoreColor(result.overallScore)} 15%, transparent)`,
            color: getScoreColor(result.overallScore),
          }}
        >
          {result.riskLabel}
        </div>
        <ScoreGauge score={result.overallScore} />
      </div>

      {/* Summary */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] mb-8">
        <h2 className="text-lg font-bold mb-3">Bu Ne Anlama Geliyor</h2>
        <p className="leading-relaxed opacity-80">{result.summary}</p>
      </div>

      {/* Dimension Breakdown */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] mb-8">
        <h2 className="text-lg font-bold mb-6">Boyuta Göre Risk Analizi</h2>
        {result.dimensions.map((dim) => (
          <DimensionBar
            key={dim.dimension}
            label={dim.label}
            score={dim.score}
            explanation={dim.explanation}
          />
        ))}
      </div>

      {/* Skill Breakdown */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] mb-8">
        <h2 className="text-lg font-bold mb-6">Yeteneklerin: Risk Analizi</h2>
        <div className="grid gap-4">
          {result.skillBreakdown.map((skill) => (
            <div
              key={skill.skillName}
              className={`p-4 rounded-xl border ${riskBgClasses[skill.riskLevel]}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{skill.skillName}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase">
                    {skill.riskLevel} risk seviyesi
                  </span>
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: riskColors[skill.riskLevel],
                    }}
                  />
                </div>
              </div>
              <p className="text-sm opacity-80 mb-2">{skill.explanation}</p>
              <div className="flex gap-4 text-xs opacity-60">
                {skill.aiCapability && (
                  <span>Yapay zeka yeteneği: {skill.aiCapability}</span>
                )}
                <span>Zaman çizelgesi: {skill.timeHorizon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reskilling Recommendations */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] mb-8">
        <h2 className="text-lg font-bold mb-2">
          Yeniden Beceri Kazanma Öncelikleri
        </h2>
        <p className="text-sm opacity-60 mb-6">
          Risk profiline göre, gelişimini odaklanman gereken alanlar.
        </p>
        <div className="grid gap-4">
          {result.reskillPriorities.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--background)]"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[var(--accent)]">
                  {rec.skill}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium">
                  {rec.effort}
                </span>
              </div>
              <p className="text-sm opacity-80 mb-3">{rec.reason}</p>
              {rec.resources && rec.resources.length > 0 && (
                <div className="text-xs opacity-60">
                  <span className="font-medium">Kaynaklar: </span>
                  {rec.resources.join(" · ")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={onRetake}
          className="flex-1 py-4 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent-light)] transition-all duration-200 font-semibold cursor-pointer"
        >
          Değerlendirmeyi Tekrarla
        </button>
      </div>

      {/* Methodology note */}
      <div className="text-center text-xs opacity-40 pb-8">
        <p>
          Metodoloji Frey &amp; Osborne (Oxford), McKinsey Global
          Institute, WEF Future of Jobs, O*NET ve güncel yapay zeka yetenek
          değerlendirmelerine dayanmaktadır. Skorlar tahmindir ve kariyer
          kararlarını yönlendirmeli — dikte etmemelidir.
        </p>
      </div>
    </div>
  );
}
