export interface QuizOption {
  label: string;
  value: string;
  weight: number; // 0-10, higher = more AI-resistant
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  category: SkillCategory;
  options: QuizOption[];
}

export type SkillCategory =
  | "creativity"
  | "technical"
  | "interpersonal"
  | "adaptability"
  | "domain_expertise"
  | "leadership";

export interface SkillBreakdown {
  category: SkillCategory;
  label: string;
  score: number; // 0-100
  description: string;
}

export interface QuizResult {
  id: string;
  overallScore: number; // 0-100, higher = safer from AI
  riskLevel: "low" | "moderate" | "high" | "critical";
  jobTitle: string;
  skills: SkillBreakdown[];
  summary: string;
  recommendations: string[];
  createdAt: string;
}

export interface QuizState {
  currentStep: number;
  answers: Record<string, string>;
  jobTitle: string;
  isComplete: boolean;
}

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  creativity: "Creative Thinking",
  technical: "Technical Depth",
  interpersonal: "Human Connection",
  adaptability: "Adaptability",
  domain_expertise: "Domain Expertise",
  leadership: "Leadership & Strategy",
};

export const RISK_LEVELS = {
  low: { label: "Low Risk", color: "emerald", range: "75-100" },
  moderate: { label: "Moderate Risk", color: "electric", range: "50-74" },
  high: { label: "High Risk", color: "amber", range: "25-49" },
  critical: { label: "Critical Risk", color: "danger", range: "0-24" },
} as const;
