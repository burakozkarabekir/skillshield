"use client";

import { useState } from "react";
import { quizQuestions } from "@/data/quiz-questions";
import { jobCategories } from "@/data/job-categories";
import { QuizAnswer, ScoringResult } from "@/lib/types";

interface QuizFlowProps {
  onComplete: (result: ScoringResult) => void;
}

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const [step, setStep] = useState<"job" | "quiz" | "loading">("job");
  const [jobCategoryId, setJobCategoryId] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalQuestions = quizQuestions.length;
  const question = quizQuestions[currentQuestion];

  async function handleSubmit() {
    setStep("loading");
    setError(null);

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, jobCategoryId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Skor hesaplanamadı");
      }

      const result: ScoringResult = await res.json();
      onComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir şeyler yanlış gitti");
      setStep("quiz");
    }
  }

  function handleAnswerSelect(answerId: string) {
    setSelectedAnswer(answerId);
  }

  function handleNext() {
    if (!selectedAnswer) return;

    const newAnswers = [
      ...answers,
      { questionId: question.id, answerId: selectedAnswer },
    ];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question answered — submit
      setStep("loading");
      // Use newAnswers directly since state update is async
      submitAnswers(newAnswers);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStep("job");
    }
  }

  async function submitAnswers(finalAnswers: QuizAnswer[]) {
    setError(null);
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, jobCategoryId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Skor hesaplanamadı");
      }

      const result: ScoringResult = await res.json();
      onComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir şeyler yanlış gitti");
      setStep("quiz");
    }
  }

  // ─── Job Selection Screen ──────────────────────────────────────────────────
  if (step === "job") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Öncelikle, ne iş yapıyorsun?
          </h2>
          <p className="text-[var(--foreground)] opacity-60">
            En yakın eşleşmeyi seç. Bu, skorunu alanındaki
            araştırma verileriyle kalibre etmemize yardımcı olur.
          </p>
        </div>

        <div className="grid gap-3">
          {jobCategories.map((job) => (
            <button
              key={job.id}
              onClick={() => setJobCategoryId(job.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                jobCategoryId === job.id
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent-light)]"
              }`}
            >
              <span className="font-medium">{job.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (jobCategoryId) setStep("quiz");
          }}
          disabled={!jobCategoryId}
          className={`mt-8 w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer ${
            jobCategoryId
              ? "bg-[var(--accent)] text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Değerlendirmeye Devam Et
        </button>
      </div>
    );
  }

  // ─── Loading Screen ────────────────────────────────────────────────────────
  if (step === "loading") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent)] border-t-transparent mb-6" />
        <h2 className="text-2xl font-bold mb-2">Profilin analiz ediliyor...</h2>
        <p className="text-[var(--foreground)] opacity-60">
          Yanıtların otomasyon araştırma verileriyle karşılaştırılıyor
        </p>
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}
      </div>
    );
  }

  // ─── Quiz Questions Screen ─────────────────────────────────────────────────
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-60">
            Soru {currentQuestion + 1} / {totalQuestions}
          </span>
          <span className="text-sm opacity-60">
            %{Math.round(progress)} tamamlandı
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--card-border)]">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{question.question}</h2>
        {question.helpText && (
          <p className="text-[var(--foreground)] opacity-60">
            {question.helpText}
          </p>
        )}
      </div>

      {/* Answer options */}
      <div className="grid gap-3">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleAnswerSelect(answer.id)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              selectedAnswer === answer.id
                ? "border-[var(--accent)] bg-[var(--accent)]/10"
                : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent-light)]"
            }`}
          >
            <span className="text-base">{answer.text}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent-light)] transition-all duration-200 cursor-pointer"
        >
          Geri
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer ${
            selectedAnswer
              ? "bg-[var(--accent)] text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {currentQuestion < totalQuestions - 1 ? "İleri" : "Skorumu Göster"}
        </button>
      </div>
    </div>
  );
}
