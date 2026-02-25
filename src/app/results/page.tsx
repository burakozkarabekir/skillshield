"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { scoreReveal, scoreContext, taskBreakdown, skillBreakdown, insights, scoreVisual } from "@/copy/results";
import { sharePrompt } from "@/copy/share";
import { premiumCta, emailCapture } from "@/copy/premium";
import { loading, errors, empty, a11y } from "@/copy/microcopy";

/**
 * Simulated score calculation based on quiz answers.
 * In production this would call a backend scoring API.
 */
function calculateScore(params: URLSearchParams): number {
  let score = 50;
  const weights: Record<string, Record<string, number>> = {
    "role-type": { knowledge: 8, creative: 4, technical: 2, interpersonal: -5, physical: -10 },
    "daily-tasks": { most: 15, half: 8, some: 2, rarely: -5 },
    "data-work": { daily: 6, weekly: 3, monthly: 0, rarely: -3 },
    "writing-output": { heavy: 8, significant: 4, moderate: 1, minimal: -3 },
    "decision-making": { strategic: -8, judgment: -4, "rule-based": 6, execution: 10 },
    "human-interaction": { essential: -8, important: -4, moderate: 2, minimal: 6 },
    "tool-adoption": { leading: -2, moderate: 0, slow: 4, resistant: 6 },
    "ai-exposure": { daily: -4, experimenting: -2, aware: 2, no: 5 },
    "unique-value": { relationships: -6, intuition: -4, creativity: -3, physical: -8, nothing: 10 },
    "industry": { tech: 3, finance: 5, healthcare: -4, education: 0, other: 2 },
    "experience-level": { junior: 4, mid: 2, senior: -2, veteran: -3 },
    "adaptability": { ready: -5, somewhat: 0, worried: 4, stuck: 8 },
  };
  for (const [key, valueMap] of Object.entries(weights)) {
    const answer = params.get(key);
    if (answer && valueMap[answer] !== undefined) {
      score += valueMap[answer];
    }
  }
  return Math.max(0, Math.min(100, score));
}

function getScoreRange(score: number) {
  return scoreReveal.ranges.find((r) => score >= r.min && score <= r.max)!;
}

function ScoreDisplay({ score }: { score: number }) {
  const range = getScoreRange(score);
  const tagline = scoreVisual.taglines[0](score);
  const percentile = Math.min(99, Math.max(1, score));

  return (
    <section className="px-6 pt-16 pb-12 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted">
          Your AI Career Risk Score
        </p>
        <div className="mt-6 relative inline-block">
          <p
            className="text-8xl font-bold sm:text-9xl"
            style={{ color: range.color }}
          >
            {score}
          </p>
          <p className="text-2xl text-muted font-light">/100</p>
        </div>
        <p
          className="mt-2 text-sm font-semibold uppercase tracking-wide"
          style={{ color: range.color }}
        >
          {range.label}
        </p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          {range.headlines[0]}
        </h1>
        <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
          {range.subheads[0]}
        </p>
        <p className="mt-6 text-sm text-muted">
          {scoreContext.comparisonLabels[0](score, percentile)}
        </p>
        <p className="mt-2 text-xs text-muted">{tagline}</p>

        {/* Accessibility */}
        <p className="sr-only" role="status" aria-live="polite">
          {a11y.scoreAnnouncement(score)}
        </p>
      </div>
    </section>
  );
}

type RiskLevel = "high" | "medium" | "low" | "safe";

function TaskBreakdownSection({ score }: { score: number }) {
  // Simulated task breakdown based on score range
  const sampleTasks: { name: string; risk: RiskLevel }[] = [
    { name: "Data entry and processing", risk: score > 40 ? "high" : "medium" },
    { name: "Report writing and generation", risk: score > 50 ? "high" : "medium" },
    { name: "Email communication", risk: "medium" },
    { name: "Strategic planning", risk: score > 75 ? "medium" : "low" },
    { name: "Client relationship management", risk: "safe" },
    { name: "Team leadership and mentoring", risk: "safe" },
  ];

  const riskColors: Record<RiskLevel, string> = {
    high: "bg-risk-critical",
    medium: "bg-risk-high",
    low: "bg-risk-moderate",
    safe: "bg-risk-low",
  };

  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold">{taskBreakdown.sectionHeadlines[0]}</h2>
        <div className="mt-8 space-y-4" aria-label={a11y.chartLabel}>
          {sampleTasks.map((task) => (
            <div key={task.name} className="flex items-center gap-4">
              <span
                className={`h-3 w-3 rounded-full shrink-0 ${riskColors[task.risk]}`}
              />
              <div className="flex-1">
                <p className="font-medium">{task.name}</p>
                <p className="text-xs text-muted">
                  {taskBreakdown.riskLabels[task.risk]} — {taskBreakdown.riskDescriptions[task.risk]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBreakdownSection({ score }: { score: number }) {
  return (
    <section className="px-6 py-16 bg-card-bg border-y border-border">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold">{skillBreakdown.sectionHeadlines[0]}</h2>
        <p className="mt-2 text-muted">{skillBreakdown.subheads[0]}</p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Shield Skills */}
          <div>
            <h3 className="font-semibold text-risk-low">
              {skillBreakdown.categories.shielded.label}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {skillBreakdown.categories.shielded.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Critical thinking</li>
              <li>Stakeholder management</li>
              <li>Creative problem-solving</li>
            </ul>
          </div>

          {/* At Risk */}
          <div>
            <h3 className="font-semibold text-risk-critical">
              {skillBreakdown.categories.atRisk.label}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {skillBreakdown.categories.atRisk.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Data analysis</li>
              <li>Report generation</li>
              <li>Basic coding</li>
            </ul>
          </div>

          {/* Emerging */}
          <div>
            <h3 className="font-semibold text-accent">
              {skillBreakdown.categories.emerging.label}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {skillBreakdown.categories.emerging.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>AI tool proficiency</li>
              <li>Prompt engineering</li>
              <li>Human-AI workflow design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightsSection({ score }: { score: number }) {
  const insightText =
    score > 75
      ? insights.templates.highRisk
      : score > 50
        ? insights.templates.moderateRisk
        : insights.templates.lowRisk;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold">{insights.sectionHeadlines[0]}</h2>
        <p className="mt-4 text-muted leading-relaxed">{insightText}</p>
      </div>
    </section>
  );
}

function ShareSection() {
  return (
    <section className="px-6 py-12 border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-bold">{sharePrompt.headlines[0]}</h2>
        <p className="mt-2 text-sm text-muted">{sharePrompt.subheads[0]}</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-card-bg transition-colors">
            {sharePrompt.buttonLabels.linkedin}
          </button>
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-card-bg transition-colors">
            {sharePrompt.buttonLabels.twitter}
          </button>
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-card-bg transition-colors">
            {sharePrompt.buttonLabels.copy}
          </button>
        </div>
      </div>
    </section>
  );
}

function EmailCaptureSection() {
  return (
    <section className="px-6 py-16 bg-card-bg border-y border-border">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold">{emailCapture.headlines[0]}</h2>
        <p className="mt-3 text-muted">{emailCapture.subheads[0]}</p>
        <form
          className="mt-8 flex gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={emailCapture.placeholder}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {emailCapture.ctas[0]}
          </button>
        </form>
        <p className="mt-3 text-xs text-muted">{emailCapture.disclaimer[0]}</p>
      </div>
    </section>
  );
}

function PremiumCtaSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border bg-card-bg p-8 sm:p-12">
          <h2 className="text-3xl font-bold">{premiumCta.headlines[0]}</h2>
          <p className="mt-4 text-muted">{premiumCta.subheads[0]}</p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {premiumCta.features.map((feature) => (
              <div key={feature.title}>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-3xl font-bold">
              {premiumCta.pricing.amount}{" "}
              <span className="text-base font-normal text-muted">
                {premiumCta.pricing.period}
              </span>
            </p>
            <p className="mt-2 text-sm text-muted">
              {premiumCta.pricing.anchoring[0]}
            </p>
            <button className="mt-6 rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors">
              {premiumCta.ctas[0]}
            </button>
            <p className="mt-3 text-xs text-muted">
              {premiumCta.guarantee[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();

  // Empty state: no quiz answers
  if (!searchParams || searchParams.toString() === "") {
    return (
      <div className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold">{empty.noResults.headlines[0]}</h1>
          <p className="mt-4 text-muted">{empty.noResults.body[0]}</p>
          <a
            href="/quiz"
            className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {empty.noResults.cta}
          </a>
        </div>
      </div>
    );
  }

  const score = calculateScore(searchParams);

  return (
    <>
      <ScoreDisplay score={score} />
      <TaskBreakdownSection score={score} />
      <SkillBreakdownSection score={score} />
      <InsightsSection score={score} />
      <ShareSection />
      <EmailCaptureSection />
      <PremiumCtaSection />
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-20 text-center">
          <p className="text-muted animate-pulse">{loading.resultsLoading[0]}</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
