"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { shareCard, sharePrompt, shareTemplates, shareConfirmation } from "@/copy/share";
import { loading, errors, a11y } from "@/copy/microcopy";

function getScoreCategory(score: number): "low" | "moderate" | "high" | "critical" {
  if (score <= 25) return "low";
  if (score <= 50) return "moderate";
  if (score <= 75) return "high";
  return "critical";
}

function getRiskColor(score: number) {
  if (score <= 25) return "#22c55e";
  if (score <= 50) return "#eab308";
  if (score <= 75) return "#f97316";
  return "#ef4444";
}

function ShareContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams?.get("score") || "50", 10);
  const [copied, setCopied] = useState(false);

  const category = getScoreCategory(score);
  const color = getRiskColor(score);
  const headline = shareCard.cardHeadlines[category][0].replace("{{score}}", String(score));
  const subtext = shareCard.cardSubtext[0];
  const url = typeof window !== "undefined" ? window.location.origin : "https://adaptai.dev";

  function handleCopyLink() {
    const shareUrl = `${url}/quiz`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  function handleLinkedInShare() {
    const text = shareTemplates.linkedin[0]
      .replace("{{score}}", String(score))
      .replace("{{url}}", `${url}/quiz`);
    const encoded = encodeURIComponent(text);
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encoded}`,
      "_blank"
    );
  }

  function handleTwitterShare() {
    const text = shareTemplates.twitter[0]
      .replace("{{score}}", String(score))
      .replace("{{url}}", `${url}/quiz`);
    const encoded = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
  }

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        {/* Share Card Preview */}
        <div className="rounded-2xl border border-border bg-card-bg p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">
            AdaptAI
          </p>
          <p
            className="mt-6 text-7xl font-bold"
            style={{ color }}
          >
            {score}
          </p>
          <p className="text-lg text-muted">/100</p>
          <p className="mt-4 text-xl font-semibold">{headline}</p>
          <p className="mt-2 text-sm text-muted">{subtext}</p>
        </div>

        {/* Share Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold">{sharePrompt.headlines[1]}</h2>
          <p className="mt-2 text-sm text-muted">{sharePrompt.subheads[1]}</p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleLinkedInShare}
              className="rounded-lg bg-[#0077b5] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              {sharePrompt.buttonLabels.linkedin}
            </button>
            <button
              onClick={handleTwitterShare}
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              {sharePrompt.buttonLabels.twitter}
            </button>
            <button
              onClick={handleCopyLink}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-card-bg transition-colors"
            >
              {copied
                ? shareConfirmation.copied[0]
                : sharePrompt.buttonLabels.copy}
            </button>
          </div>
        </div>

        {/* Back to results */}
        <div className="mt-12 text-center">
          <a
            href={`/results?score=${score}`}
            className="text-sm text-accent hover:underline"
          >
            Sonuçlarıma dön
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-20 text-center">
          <p className="text-muted animate-pulse">
            {loading.shareCardGenerating[0]}
          </p>
        </div>
      }
    >
      <ShareContent />
    </Suspense>
  );
}
