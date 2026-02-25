"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreResult } from "@/lib/types";
import { decodeResult } from "@/lib/scoring";
import ScoreCard from "@/components/ScoreCard";
import ShareButtons from "@/components/ShareButtons";

interface ResultsViewProps {
  encodedResult: string | null;
}

export default function ResultsView({ encodedResult }: ResultsViewProps) {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Try sessionStorage first (just took the quiz)
    const stored = sessionStorage.getItem("quizResult");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        // fall through to URL decode
      }
    }

    if (encodedResult) {
      setShareUrl(`${window.location.origin}/results?r=${encodedResult}`);

      // If no sessionStorage result, decode from URL for shared links
      if (!stored) {
        const decoded = decodeResult(encodedResult);
        if (decoded) {
          setResult({
            overallScore: decoded.score,
            riskLevel:
              decoded.score <= 35
                ? "Low"
                : decoded.score <= 65
                ? "Medium"
                : "High",
            skillBreakdown: [],
            jobTitle: decoded.jobTitle,
            industry: decoded.industry,
            headline: decoded.headline,
            description:
              decoded.score <= 35
                ? "Your role involves skills that are difficult to automate."
                : decoded.score <= 65
                ? "Parts of your role are automatable, but you have room to pivot."
                : "Many of your daily tasks are prime targets for AI automation.",
          });
        }
      }
    }
  }, [encodedResult]);

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-shield-900/20 via-gray-950 to-gray-950" />
        <div className="relative z-10 text-center">
          <p className="mb-4 text-gray-400">Loading your results...</p>
          <button onClick={() => router.push("/quiz")} className="btn-primary">
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-shield-900/20 via-gray-950 to-gray-950" />

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-shield-700/30 bg-shield-900/20 px-4 py-1.5 text-sm text-shield-300">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            Your AI Career Risk Score
          </div>
        </div>

        <ScoreCard result={result} />

        <div className="mt-8">
          <ShareButtons
            score={result.overallScore}
            headline={result.headline}
            url={shareUrl}
          />
        </div>

        {/* Premium CTA */}
        <div className="mt-8 rounded-2xl border border-shield-700/30 bg-gradient-to-br from-shield-900/30 to-gray-900 p-6 text-center">
          <h3 className="mb-2 text-lg font-bold text-white">
            Want to lower your risk score?
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Get a personalized 90-day reskilling roadmap with weekly action items
            tailored to your exact role and skills.
          </p>
          <button className="btn-primary w-full gap-2">
            Get My Reskilling Plan — $9/mo
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Cancel anytime. Results in your first week.
          </p>
        </div>

        {/* Retake */}
        <div className="mt-6 pb-8 text-center">
          <button
            onClick={() => {
              sessionStorage.removeItem("quizResult");
              router.push("/quiz");
            }}
            className="text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-300"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    </div>
  );
}
