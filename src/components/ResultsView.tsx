"use client";

import { ScoringResult, RiskLevel, DimensionScore } from "@/lib/types";
import { premiumCta } from "@/copy/premium";
import ComparisonBanner from "@/components/ComparisonBanner";

interface PreviousScoreData {
  overallScore: number;
  dimensions: DimensionScore[];
  createdAt: number;
}

interface ResultsViewProps {
  result: ScoringResult & { scoreId?: string };
  onRetake: () => void;
  previousScore?: PreviousScoreData;
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

function PremiumCTA({ scoreId }: { scoreId?: string }) {
  const params = new URLSearchParams();
  if (scoreId) params.set("scoreId", scoreId);
  const href = `/premium${params.toString() ? `?${params.toString()}` : ""}`;

  return (
    <div className="relative p-8 rounded-2xl border-2 border-accent bg-[var(--card-bg)] mb-8 text-center overflow-hidden">
      <h3 className="text-xl font-bold mb-2">{premiumCta.headlines[1]}</h3>
      <p className="text-sm opacity-70 mb-2 max-w-lg mx-auto">
        {premiumCta.subheads[0]}
      </p>
      <div className="flex flex-wrap justify-center gap-3 my-6">
        {premiumCta.features.map((f) => (
          <span
            key={f.title}
            className="text-xs px-3 py-1 rounded-full bg-accent/10 text-[var(--accent)] font-medium"
          >
            {f.title}
          </span>
        ))}
      </div>
      <a
        href={href}
        className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors"
      >
        {premiumCta.ctas[0]} — {premiumCta.pricing.amount}
      </a>
      <p className="mt-3 text-xs opacity-50">{premiumCta.guarantee[1]}</p>
    </div>
  );
}

function BlurredSection({
  title,
  children,
  scoreId,
}: {
  title: string;
  children: React.ReactNode;
  scoreId?: string;
}) {
  const params = new URLSearchParams();
  if (scoreId) params.set("scoreId", scoreId);
  const href = `/premium${params.toString() ? `?${params.toString()}` : ""}`;

  return (
    <div className="relative mb-8">
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]">
        <h2 className="text-lg font-bold mb-6">{title}</h2>
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[var(--card-bg)]/80 backdrop-blur-sm">
        <p className="text-lg font-bold mb-2">Premium icerik</p>
        <p className="text-sm opacity-70 mb-4 max-w-xs text-center">
          Detayli analiz ve kisisel oneriler icin AdaptAI Pro&apos;ya yukselt.
        </p>
        <a
          href={href}
          className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover transition-colors"
        >
          {premiumCta.pricing.amount} — Raporu Al
        </a>
      </div>
    </div>
  );
}

export default function ResultsView({ result, onRetake, previousScore }: ResultsViewProps) {
  const scoreId = (result as ScoringResult & { scoreId?: string }).scoreId;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Comparison Banner (if previous score exists) */}
      {previousScore && (
        <ComparisonBanner
          currentScore={result.overallScore}
          currentDimensions={result.dimensions}
          previous={previousScore}
        />
      )}

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

      {/* Dimension Breakdown — free */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] mb-8">
        <h2 className="text-lg font-bold mb-6">Boyuta Gore Risk Analizi</h2>
        {result.dimensions.map((dim) => (
          <DimensionBar
            key={dim.dimension}
            label={dim.label}
            score={dim.score}
            explanation={dim.explanation}
          />
        ))}
      </div>

      {/* Premium CTA */}
      <PremiumCTA scoreId={scoreId} />

      {/* Skill Breakdown — blurred (premium) */}
      <BlurredSection title="Yeteneklerin: Risk Analizi" scoreId={scoreId}>
        <div className="grid gap-4">
          {result.skillBreakdown.slice(0, 3).map((skill) => (
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
                    style={{ backgroundColor: riskColors[skill.riskLevel] }}
                  />
                </div>
              </div>
              <p className="text-sm opacity-80 mb-2">{skill.explanation}</p>
            </div>
          ))}
        </div>
      </BlurredSection>

      {/* Reskilling Recommendations — blurred (premium) */}
      <BlurredSection title="Yeniden Beceri Kazanma Oncelikleri" scoreId={scoreId}>
        <div className="grid gap-4">
          {result.reskillPriorities.slice(0, 2).map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--background)]"
            >
              <h3 className="font-semibold text-[var(--accent)]">{rec.skill}</h3>
              <p className="text-sm opacity-80 mt-2">{rec.reason}</p>
            </div>
          ))}
        </div>
      </BlurredSection>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={onRetake}
          className="flex-1 py-4 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent-light)] transition-all duration-200 font-semibold cursor-pointer"
        >
          Degerlendirmeyi Tekrarla
        </button>
      </div>

      {/* Methodology note */}
      <div className="text-center text-xs opacity-40 pb-8">
        <p>
          Metodoloji Frey &amp; Osborne (Oxford), McKinsey Global
          Institute, WEF Future of Jobs, O*NET ve guncel yapay zeka yetenek
          degerlendirmelerine dayanmaktadir. Skorlar tahmindir ve kariyer
          kararlarini yonlendirmeli — dikte etmemelidir.
        </p>
      </div>
    </div>
  );
}
