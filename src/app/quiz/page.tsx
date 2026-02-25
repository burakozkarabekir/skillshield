"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS, TOTAL_STEPS } from "@/data/quiz-questions";
import { calculateRiskScore } from "@/lib/scoring";
import { trackEvent } from "@/lib/analytics";

type Answers = Record<string, string | number | Record<string, number>>;

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    taskBreakdown: { routine: 20, creative: 20, interpersonal: 20, physical: 20, analytical: 20 },
  });
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    trackEvent("quiz_start");
  }, []);

  const questionsForStep = QUIZ_QUESTIONS.filter((q) => q.step === currentStep);
  const progress = (currentStep / TOTAL_STEPS) * 100;

  const updateAnswer = useCallback((field: string, value: string | number | Record<string, number>) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateTaskBreakdown = useCallback((subField: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      taskBreakdown: {
        ...(prev.taskBreakdown as Record<string, number>),
        [subField]: value,
      },
    }));
  }, []);

  const canProceed = questionsForStep.every((q) => {
    if (q.type === "multi-slider") return true;
    const val = answers[q.field];
    if (!val) return false;
    if (q.validation?.minLength && typeof val === "string" && val.length < q.validation.minLength) return false;
    return true;
  });

  const handleNext = () => {
    trackEvent("quiz_step_complete", { step: currentStep });
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsCalculating(true);
    trackEvent("quiz_complete");

    const quizAnswers = {
      jobTitle: answers.jobTitle as string,
      jobCategory: answers.jobCategory as string,
      yearsExperience: Number(answers.yearsExperience) || 5,
      taskBreakdown: answers.taskBreakdown as {
        routine: number;
        creative: number;
        interpersonal: number;
        physical: number;
        analytical: number;
      },
      aiToolUsage: (answers.aiToolUsage as "none" | "experimenting" | "regular" | "daily-driver") || "none",
      educationLevel: "bachelors" as const,
      industryAdoption: (answers.industryAdoption as "slow" | "moderate" | "fast" | "bleeding-edge") || "moderate",
      remoteWork: "hybrid" as const,
      teamSize: "medium" as const,
      decisionMaking: (answers.decisionMaking as "none" | "some" | "significant" | "primary") || "some",
    };

    const score = calculateRiskScore(quizAnswers);

    // Store results for the results page
    sessionStorage.setItem("ss_results", JSON.stringify(score));
    sessionStorage.setItem("ss_answers", JSON.stringify(quizAnswers));

    // Dramatic pause for anticipation
    setTimeout(() => {
      router.push("/results");
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto w-full">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </div>
        <span className="text-sm text-gray-500">
          Step {currentStep} of {TOTAL_STEPS}
        </span>
      </nav>

      {/* Progress bar */}
      <div className="w-full h-1 bg-card-border">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Questions */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">
        {isCalculating ? (
          <div className="text-center fade-in-up">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Analyzing your career risk...</h2>
            <p className="text-gray-400">Evaluating 5 risk factors against AI capability data</p>
          </div>
        ) : (
          <div className="w-full space-y-8 fade-in-up">
            {questionsForStep.map((question) => (
              <div key={question.id} className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{question.question}</h2>
                  {question.subtext && (
                    <p className="text-sm text-gray-400 mt-1">{question.subtext}</p>
                  )}
                </div>

                {/* Text input */}
                {question.type === "text" && (
                  <input
                    type="text"
                    value={(answers[question.field] as string) || ""}
                    onChange={(e) => updateAnswer(question.field, e.target.value)}
                    placeholder="e.g. Senior Marketing Manager"
                    className="w-full bg-card-bg border border-card-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    autoFocus
                  />
                )}

                {/* Select / Radio grid */}
                {(question.type === "select" || question.type === "radio") && question.options && (
                  <div className={`grid gap-2 ${question.type === "select" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
                    {question.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateAnswer(question.field, option.value)}
                        className={`text-left px-4 py-3 rounded-xl border transition-all ${
                          answers[question.field] === option.value
                            ? "bg-accent/20 border-accent text-white"
                            : "bg-card-bg border-card-border text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {option.emoji && <span className="mr-2">{option.emoji}</span>}
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Multi-slider */}
                {question.type === "multi-slider" && question.sliderConfig && (
                  <div className="space-y-4">
                    {question.sliderConfig.labels.map((label, i) => {
                      const field = question.sliderConfig!.fields[i];
                      const breakdown = answers.taskBreakdown as Record<string, number>;
                      const value = breakdown[field] || 0;
                      return (
                        <div key={field}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">{label}</span>
                            <span className="text-accent font-mono">{value}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={value}
                            onChange={(e) => updateTaskBreakdown(field, Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      );
                    })}
                    <div className="text-sm text-gray-500 text-center">
                      Total:{" "}
                      <span
                        className={
                          Object.values(answers.taskBreakdown as Record<string, number>).reduce((a, b) => a + b, 0) === 100
                            ? "text-success"
                            : "text-warning"
                        }
                      >
                        {Object.values(answers.taskBreakdown as Record<string, number>).reduce((a, b) => a + b, 0)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-6 py-3 rounded-xl border border-card-border text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                  canProceed
                    ? "bg-accent hover:bg-accent-hover text-white"
                    : "bg-card-border text-gray-600 cursor-not-allowed"
                }`}
              >
                {currentStep === TOTAL_STEPS ? "Get My Score" : "Continue"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
