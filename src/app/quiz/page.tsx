"use client";

import { useState } from "react";
import { quizIntro, progress, quizComplete } from "@/copy/quiz";
import { loading, errors, validation, nav, a11y } from "@/copy/microcopy";
import { quizQuestions } from "@/data/quiz-questions";

type QuizState = "intro" | "in-progress" | "submitting" | "error";

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentIndex];

  function getEncouragement() {
    const pct = currentIndex / totalQuestions;
    if (pct >= 0.92) return progress.encouragement.final;
    if (pct >= 0.75) return progress.encouragement.threeQuarter;
    if (pct >= 0.5) return progress.encouragement.halfway;
    if (pct >= 0.25) return progress.encouragement.quarter;
    return null;
  }

  function handleSelect(value: string) {
    setSelectedValue(value);
  }

  async function handleNext() {
    if (!selectedValue) return;
    const newAnswers = { ...answers, [currentQuestion.id]: selectedValue };
    setAnswers(newAnswers);
    setSelectedValue(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setState("submitting");

      // Build scoring payload directly from quiz-questions data
      const quizAnswerPayload = Object.entries(newAnswers).map(
        ([questionId, answerId]) => ({ questionId, answerId })
      );

      try {
        const res = await fetch("/api/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: quizAnswerPayload,
            jobCategoryId: "other",
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.scoreId) {
            window.location.href = `/results?scoreId=${data.scoreId}`;
          } else {
            setState("error");
          }
        } else {
          setState("error");
        }
      } catch {
        setState("error");
      }
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      const prevQuestion = quizQuestions[currentIndex - 1];
      setSelectedValue(answers[prevQuestion.id] || null);
      setCurrentIndex(currentIndex - 1);
    }
  }

  // ─── INTRO STATE ─────────────────────────────────────
  if (state === "intro") {
    return (
      <div className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {quizIntro.headlines[0]}
          </h1>
          <p className="mt-4 text-muted text-lg">
            {quizIntro.subheads[0]}
          </p>
          <button
            onClick={() => setState("in-progress")}
            className="mt-10 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {nav.quizButton}
          </button>
          <p className="mt-4 text-sm text-muted">
            32 soru. Yaklasik 7 dakika. Tamamen anonim.
          </p>
        </div>
      </div>
    );
  }

  // ─── SUBMITTING STATE ────────────────────────────────
  if (state === "submitting") {
    return (
      <div className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">{quizComplete.headlines[0]}</h2>
          <p className="mt-4 text-muted text-lg">
            {quizComplete.subheads[0]}
          </p>
          <div className="mt-10 space-y-3">
            {loading.scoreCalculatingSequence.map((msg, i) => (
              <p
                key={i}
                className="text-sm text-muted animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {msg}
              </p>
            ))}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {a11y.loadingAnnouncement}
          </p>
        </div>
      </div>
    );
  }

  // ─── ERROR STATE ─────────────────────────────────────
  if (state === "error") {
    return (
      <div className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold">
            {errors.quizSubmitFailed.headlines[0]}
          </h2>
          <p className="mt-4 text-muted">
            {errors.quizSubmitFailed.body[0]}
          </p>
          <button
            onClick={() => setState("submitting")}
            className="mt-8 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {errors.quizSubmitFailed.cta}
          </button>
          <p className="sr-only" role="alert">
            {a11y.errorAnnouncement}
          </p>
        </div>
      </div>
    );
  }

  // ─── IN-PROGRESS STATE ───────────────────────────────
  const encouragement = getEncouragement();
  const progressPct = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Progress bar */}
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span>{progress.labels[0](currentIndex + 1, totalQuestions)}</span>
          {encouragement && (
            <span className="italic">{encouragement}</span>
          )}
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden mb-10">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Screen reader progress announcement */}
        <p className="sr-only" role="status" aria-live="polite">
          {a11y.progressAnnouncement(currentIndex + 1, totalQuestions)}
        </p>

        {/* Question */}
        <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
        {currentQuestion.helpText && (
          <p className="mt-2 text-sm text-muted">{currentQuestion.helpText}</p>
        )}

        {/* Options */}
        <div className="mt-8 space-y-3">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleSelect(answer.id)}
              className={`w-full text-left rounded-lg border px-5 py-4 transition-colors cursor-pointer ${
                selectedValue === answer.id
                  ? "border-accent bg-accent/5 font-medium"
                  : "border-border hover:border-accent/50"
              }`}
            >
              {answer.text}
            </button>
          ))}
        </div>

        {/* Validation hint */}
        {!selectedValue && currentIndex > 0 && (
          <p className="mt-3 text-xs text-muted">{validation.questionRequired}</p>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="text-sm text-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {nav.previousQuestion}
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedValue}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {currentIndex === totalQuestions - 1 ? nav.submitQuiz : nav.nextQuestion}
          </button>
        </div>
      </div>
    </div>
  );
}
