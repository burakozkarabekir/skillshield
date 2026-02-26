import { QuizAnswers, ScoreResult } from "./types";
import { quizQuestions } from "./questions";

function getRiskLabel(score: number): "Low" | "Medium" | "High" {
  if (score <= 35) return "Low";
  if (score <= 65) return "Medium";
  return "High";
}

function getOptionRiskWeight(
  questionId: keyof QuizAnswers,
  value: string
): number {
  const question = quizQuestions.find((q) => q.id === questionId);
  if (!question) return 40;
  const option = question.options.find((o) => o.value === value);
  return option?.riskWeight ?? 40;
}

function generateHeadline(score: number, jobTitle: string): string {
  const titleLabel =
    quizQuestions[0].options.find((o) => o.value === jobTitle)?.label ??
    "Professional";

  if (score <= 20) return `${titleLabel}s are well-protected from AI disruption`;
  if (score <= 35) return `${titleLabel}s have a strong position in the AI era`;
  if (score <= 50)
    return `${titleLabel}s face moderate AI automation pressure`;
  if (score <= 65) return `${titleLabel}s should start future-proofing now`;
  if (score <= 80) return `${titleLabel}s face significant AI disruption risk`;
  return `${titleLabel}s are in the AI automation danger zone`;
}

function generateDescription(score: number): string {
  if (score <= 35)
    return "Your role involves skills that are difficult to automate. Focus on deepening your human-centric strengths.";
  if (score <= 65)
    return "Parts of your role are automatable, but you have room to pivot. A targeted reskilling plan can significantly lower your risk.";
  return "Many of your daily tasks are prime targets for AI automation. Acting now on a reskilling plan is critical for career security.";
}

export function calculateScore(answers: QuizAnswers): ScoreResult {
  // Weight factors for each category
  const weights = {
    jobTitle: 0.3,
    industry: 0.15,
    experience: 0.1,
    skills: 0.2,
    tasks: 0.25,
  };

  // Calculate individual category scores
  const jobTitleRisk = getOptionRiskWeight("jobTitle", answers.jobTitle);
  const industryRisk = getOptionRiskWeight("industry", answers.industry);
  const experienceRisk = getOptionRiskWeight("experience", answers.experience);

  // Average multi-select scores
  const skillsRisk =
    answers.skills.length > 0
      ? answers.skills.reduce(
          (sum, s) => sum + getOptionRiskWeight("skills", s),
          0
        ) / answers.skills.length
      : 40;

  const tasksRisk =
    answers.tasks.length > 0
      ? answers.tasks.reduce(
          (sum, t) => sum + getOptionRiskWeight("tasks", t),
          0
        ) / answers.tasks.length
      : 40;

  // Weighted overall score
  const overallScore = Math.round(
    jobTitleRisk * weights.jobTitle +
      industryRisk * weights.industry +
      experienceRisk * weights.experience +
      skillsRisk * weights.skills +
      tasksRisk * weights.tasks
  );

  // Clamp to 0-100
  const clampedScore = Math.max(0, Math.min(100, overallScore));

  // Build skill breakdown from selected skills
  const skillBreakdown: ScoreResult["skillBreakdown"] = answers.skills.map((skillValue) => {
    const question = quizQuestions.find((q) => q.id === "skills");
    const option = question?.options.find((o) => o.value === skillValue);
    const risk = option?.riskWeight ?? 40;
    return {
      skill: option?.label ?? skillValue,
      risk,
      label: getRiskLabel(risk),
    };
  });

  // Add task-based risks
  const taskBreakdown: ScoreResult["skillBreakdown"] = answers.tasks.map((taskValue) => {
    const question = quizQuestions.find((q) => q.id === "tasks");
    const option = question?.options.find((o) => o.value === taskValue);
    const risk = option?.riskWeight ?? 40;
    return {
      skill: option?.label ?? taskValue,
      risk,
      label: getRiskLabel(risk),
    };
  });

  const allBreakdown = [...skillBreakdown, ...taskBreakdown].sort(
    (a, b) => b.risk - a.risk
  );

  const industryLabel =
    quizQuestions[1].options.find((o) => o.value === answers.industry)?.label ??
    answers.industry;

  return {
    overallScore: clampedScore,
    riskLevel: getRiskLabel(clampedScore),
    skillBreakdown: allBreakdown,
    jobTitle: answers.jobTitle,
    industry: industryLabel,
    headline: generateHeadline(clampedScore, answers.jobTitle),
    description: generateDescription(clampedScore),
  };
}

/** Encode a ScoreResult into a URL-safe base64 string */
export function encodeResult(result: ScoreResult): string {
  const compact = {
    s: result.overallScore,
    j: result.jobTitle,
    i: result.industry,
    h: result.headline,
  };
  return Buffer.from(JSON.stringify(compact)).toString("base64url");
}

/** Decode a URL-safe base64 string back to partial result data */
export function decodeResult(
  encoded: string
): { score: number; jobTitle: string; industry: string; headline: string } | null {
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return {
      score: parsed.s,
      jobTitle: parsed.j,
      industry: parsed.i,
      headline: parsed.h,
    };
  } catch {
    return null;
  }
}
