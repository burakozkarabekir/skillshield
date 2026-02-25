"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizState } from "@/hooks/useQuizState";
import ProgressBar from "@/components/ProgressBar";
import QuizOption from "@/components/QuizOption";
import Link from "next/link";

export default function QuizPage() {
  const router = useRouter();
  const {
    state,
    totalSteps,
    progress,
    currentQuestion,
    setAnswer,
    nextStep,
    prevStep,
    calculateResults,
  } = useQuizState();

  const currentAnswer = state.answers[currentQuestion?.id];

  const handleNext = () => {
    if (!currentAnswer) return;

    if (state.currentStep >= totalSteps - 1) {
      const result = calculateResults();
      router.push(`/results/${result.id}`);
    } else {
      nextStep();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentAnswer) {
      handleNext();
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header */}
      <header className="glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Back to home"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-electric to-electric-light flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className="font-semibold text-sm sm:text-base">
                SkillShield
              </span>
            </Link>
            <button
              onClick={() => router.push("/")}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Exit quiz"
            >
              Exit
            </button>
          </div>
          <ProgressBar
            progress={progress}
            currentStep={state.currentStep}
            totalSteps={totalSteps}
          />
        </div>
      </header>

      {/* Question Area */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentQuestion && (
                <div role="radiogroup" aria-labelledby="question-heading">
                  <h1
                    id="question-heading"
                    className="text-xl sm:text-2xl font-bold mb-2"
                  >
                    {currentQuestion.question}
                  </h1>
                  {currentQuestion.description && (
                    <p className="text-sm sm:text-base text-slate-400 mb-8">
                      {currentQuestion.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <QuizOption
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        selected={currentAnswer === option.value}
                        onSelect={(value) =>
                          setAnswer(currentQuestion.id, value)
                        }
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="glass border-t border-white/5">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={state.currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-white/5"
            aria-label="Previous question"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-electric hover:bg-electric-dark text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-electric/20 disabled:shadow-none"
            aria-label={
              state.currentStep >= totalSteps - 1
                ? "See your results"
                : "Next question"
            }
          >
            {state.currentStep >= totalSteps - 1 ? "See Results" : "Continue"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
