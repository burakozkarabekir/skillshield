export interface QuizAnswers {
  jobTitle: string;
  industry: string;
  experience: string;
  skills: string[];
  tasks: string[];
}

export interface SkillRisk {
  skill: string;
  risk: number; // 0-100
  label: "Low" | "Medium" | "High";
}

export interface ScoreResult {
  overallScore: number; // 0-100
  riskLevel: "Low" | "Medium" | "High";
  skillBreakdown: SkillRisk[];
  jobTitle: string;
  industry: string;
  headline: string;
  description: string;
}

export interface QuizQuestion {
  id: keyof QuizAnswers;
  title: string;
  subtitle: string;
  type: "single" | "multi" | "search";
  options: { value: string; label: string; riskWeight?: number }[];
  maxSelections?: number;
}
