"use client";

import { useState } from "react";
import QuizFlow from "@/components/QuizFlow";
import ResultsView from "@/components/ResultsView";
import { ScoringResult } from "@/lib/types";

export default function QuizPage() {
  const [result, setResult] = useState<ScoringResult | null>(null);

  function handleRetake() {
    setResult(null);
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto mb-8">
        <a
          href="/"
          className="text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          &larr; Back to home
        </a>
      </div>

      {result ? (
        <ResultsView result={result} onRetake={handleRetake} />
      ) : (
        <QuizFlow onComplete={setResult} />
      )}
    </main>
  );
}
