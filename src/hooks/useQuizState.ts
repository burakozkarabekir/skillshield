"use client";

import { useState, useCallback } from "react";
import { QuizState, QuizResult, SkillBreakdown, SkillCategory, CATEGORY_LABELS } from "@/types/quiz";
import { QUIZ_QUESTIONS, JOB_TITLE_MAP } from "@/data/questions";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function calculateCategoryScore(
  answers: Record<string, string>,
  category: SkillCategory
): number {
  const categoryQuestions = QUIZ_QUESTIONS.filter((q) => q.category === category);
  if (categoryQuestions.length === 0) return 50;

  let totalWeight = 0;
  let count = 0;

  for (const question of categoryQuestions) {
    const answerValue = answers[question.id];
    if (!answerValue) continue;

    const option = question.options.find((o) => o.value === answerValue);
    if (option) {
      totalWeight += option.weight;
      count++;
    }
  }

  if (count === 0) return 50;
  // Normalize to 0-100 scale (weights are 0-10)
  return Math.round((totalWeight / count) * 10);
}

function getRiskLevel(score: number): "low" | "moderate" | "high" | "critical" {
  if (score >= 75) return "low";
  if (score >= 50) return "moderate";
  if (score >= 25) return "high";
  return "critical";
}

function generateSummary(score: number, jobTitle: string): string {
  if (score >= 75) {
    return `As a ${jobTitle}, your skill set is well-positioned for the AI era. Your combination of human-centric skills and adaptability gives you a strong foundation.`;
  }
  if (score >= 50) {
    return `As a ${jobTitle}, you have a moderate level of AI resilience. Some aspects of your role may be augmented by AI, but your core skills provide a reasonable buffer.`;
  }
  if (score >= 25) {
    return `As a ${jobTitle}, significant parts of your current role are at risk of AI automation. Proactive upskilling in human-centric areas is recommended.`;
  }
  return `As a ${jobTitle}, your current skill profile is highly vulnerable to AI disruption. Immediate action to diversify your skills is strongly recommended.`;
}

function generateRecommendations(skills: SkillBreakdown[]): string[] {
  const recommendations: string[] = [];
  const sorted = [...skills].sort((a, b) => a.score - b.score);

  // Recommend improvements for weakest areas
  for (const skill of sorted.slice(0, 3)) {
    if (skill.score < 50) {
      switch (skill.category) {
        case "creativity":
          recommendations.push(
            "Develop creative problem-solving skills through design thinking workshops or creative side projects."
          );
          break;
        case "technical":
          recommendations.push(
            "Deepen your technical expertise by learning to work alongside AI tools rather than competing with them."
          );
          break;
        case "interpersonal":
          recommendations.push(
            "Strengthen your interpersonal skills — empathy, negotiation, and relationship-building are irreplaceable."
          );
          break;
        case "adaptability":
          recommendations.push(
            "Embrace continuous learning and experiment with new AI tools weekly to build your adaptability muscle."
          );
          break;
        case "domain_expertise":
          recommendations.push(
            "Go deeper in your niche — become the go-to expert in a specific area that AI can't easily replicate."
          );
          break;
        case "leadership":
          recommendations.push(
            "Develop strategic thinking and leadership skills — these uniquely human capabilities are in growing demand."
          );
          break;
      }
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Continue building on your strengths while staying current with AI developments in your field."
    );
  }

  recommendations.push(
    "Build a personal brand around your unique expertise — AI can't replicate your specific perspective and experience."
  );

  return recommendations;
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: {},
    jobTitle: "",
    isComplete: false,
  });

  const totalSteps = QUIZ_QUESTIONS.length;
  const progress = ((state.currentStep) / totalSteps) * 100;
  const currentQuestion = QUIZ_QUESTIONS[state.currentStep];

  const setAnswer = useCallback((questionId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep >= totalSteps - 1) {
        return { ...prev, isComplete: true };
      }
      return { ...prev, currentStep: prev.currentStep + 1 };
    });
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  }, []);

  const calculateResults = useCallback((): QuizResult => {
    const categories: SkillCategory[] = [
      "creativity",
      "technical",
      "interpersonal",
      "adaptability",
      "domain_expertise",
      "leadership",
    ];

    const skills: SkillBreakdown[] = categories.map((category) => {
      const score = calculateCategoryScore(state.answers, category);
      return {
        category,
        label: CATEGORY_LABELS[category],
        score,
        description: getSkillDescription(category, score),
      };
    });

    const overallScore = Math.round(
      skills.reduce((sum, s) => sum + s.score, 0) / skills.length
    );

    const jobTitleValue = state.answers["job_title"] || "other";
    const jobTitle = JOB_TITLE_MAP[jobTitleValue] || "Professional";

    const result: QuizResult = {
      id: generateId(),
      overallScore,
      riskLevel: getRiskLevel(overallScore),
      jobTitle,
      skills,
      summary: generateSummary(overallScore, jobTitle),
      recommendations: generateRecommendations(skills),
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for the results page
    if (typeof window !== "undefined") {
      localStorage.setItem(`quiz_result_${result.id}`, JSON.stringify(result));
      localStorage.setItem("quiz_result_latest", JSON.stringify(result));
    }

    return result;
  }, [state.answers]);

  return {
    state,
    totalSteps,
    progress,
    currentQuestion,
    setAnswer,
    nextStep,
    prevStep,
    calculateResults,
  };
}

function getSkillDescription(category: SkillCategory, score: number): string {
  const level = score >= 70 ? "strong" : score >= 40 ? "moderate" : "weak";
  const descriptions: Record<SkillCategory, Record<string, string>> = {
    creativity: {
      strong: "Your creative thinking skills are a strong differentiator against AI.",
      moderate: "You have some creative skills, but could develop them further.",
      weak: "AI can likely handle the creative aspects of your current work.",
    },
    technical: {
      strong: "Your technical depth provides strong protection from automation.",
      moderate: "Your technical skills provide some buffer against AI.",
      weak: "Your technical work is highly susceptible to AI automation.",
    },
    interpersonal: {
      strong: "Your human connection skills are nearly impossible to automate.",
      moderate: "Your interpersonal skills give you a moderate advantage.",
      weak: "Your role doesn't leverage human interaction as a differentiator.",
    },
    adaptability: {
      strong: "Your adaptability means you'll thrive alongside AI evolution.",
      moderate: "You're moderately adaptable to technological change.",
      weak: "Your resistance to new tools puts you at higher risk.",
    },
    domain_expertise: {
      strong: "Your deep expertise is difficult for AI to replicate.",
      moderate: "Your domain knowledge provides some protection.",
      weak: "AI is rapidly catching up to your level of domain knowledge.",
    },
    leadership: {
      strong: "Strategic leadership remains a uniquely human capability.",
      moderate: "Your strategic involvement provides some resilience.",
      weak: "Your role's lack of strategic scope increases automation risk.",
    },
  };

  return descriptions[category][level];
}
