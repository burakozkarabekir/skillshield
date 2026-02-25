"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/questions";
import { calculateScore, encodeResult } from "@/lib/scoring";
import { QuizAnswers } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";
import QuizQuestion from "@/components/QuizQuestion";

const initialAnswers: QuizAnswers = {
  jobTitle: "",
  industry: "",
  experience: "",
  skills: [],
  tasks: [],
};

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"in" | "out">("in");

  const currentQuestion = quizQuestions[step];
  const isLastStep = step === quizQuestions.length - 1;

  const currentValue = answers[currentQuestion.id];
  const canProceed = Array.isArray(currentValue)
    ? currentValue.length > 0
    : currentValue !== "";

  const handleChange = useCallback(
    (value: string | string[]) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }));
    },
    [currentQuestion.id]
  );

  const goToNext = useCallback(() => {
    if (!canProceed || isAnimating) return;

    if (isLastStep) {
      // Calculate score and navigate to results
      const result = calculateScore(answers);
      const encoded = encodeResult(result);
      // Store full result in sessionStorage for the results page
      sessionStorage.setItem("quizResult", JSON.stringify(result));
      router.push(`/results?r=${encoded}`);
      return;
    }

    setIsAnimating(true);
    setSlideDirection("out");

    setTimeout(() => {
      setStep((prev) => prev + 1);
      setSlideDirection("in");
      setTimeout(() => setIsAnimating(false), 300);
    }, 200);
  }, [canProceed, isAnimating, isLastStep, answers, router]);

  const goToPrev = useCallback(() => {
    if (step === 0 || isAnimating) return;

    setIsAnimating(true);
    setSlideDirection("out");

    setTimeout(() => {
      setStep((prev) => prev - 1);
      setSlideDirection("in");
      setTimeout(() => setIsAnimating(false), 300);
    }, 200);
  }, [step, isAnimating]);

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-shield-900/20 via-gray-950 to-gray-950" />

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => (step === 0 ? router.push("/") : goToPrev())}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition-colors hover:border-gray-700 hover:text-white"
          >
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div className="flex-1">
            <ProgressBar current={step} total={quizQuestions.length} />
          </div>
        </div>

        {/* Question */}
        <div
          className={`transition-all duration-300 ${
            slideDirection === "in"
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <QuizQuestion
            question={currentQuestion}
            value={currentValue}
            onChange={handleChange}
          />
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            {currentQuestion.type === "multi" && "Tap to select multiple"}
          </div>
          <button
            onClick={goToNext}
            disabled={!canProceed}
            className="btn-primary gap-2"
          >
            {isLastStep ? "See My Score" : "Continue"}
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
        </div>
      </div>
    </div>
  );
}
