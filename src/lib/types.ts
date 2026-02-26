// ─── Scoring Dimensions ─────────────────────────────────────────────────────
// Each dimension maps to a research-backed automation risk factor.
// Weights are derived from Frey & Osborne (2017), McKinsey (2023),
// and WEF Future of Jobs 2025.

export interface ScoringWeights {
  taskComposition: number; // 0.25 — What % of tasks are routine-cognitive?
  skillReplaceability: number; // 0.20 — Can AI do these skills now/soon/not yet?
  industryVelocity: number; // 0.15 — How fast is the industry adopting AI?
  experienceMoat: number; // 0.10 — Does seniority create defensibility?
  humanInteraction: number; // 0.15 — How much requires human judgment/presence?
  aiReadiness: number; // 0.15 — How prepared is the person for AI integration?
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  taskComposition: 0.25,
  skillReplaceability: 0.2,
  industryVelocity: 0.15,
  experienceMoat: 0.1,
  humanInteraction: 0.15,
  aiReadiness: 0.15,
};

// ─── Quiz Types ─────────────────────────────────────────────────────────────

export type Dimension = keyof ScoringWeights;

export interface AnswerOption {
  id: string;
  text: string;
  /** Score contribution 0-100 for this dimension (higher = more at risk) */
  score: number;
  /** Brief explanation shown in results for why this maps to risk */
  reasoning: string;
}

export interface QuizQuestion {
  id: string;
  /** The scoring dimension this question measures */
  dimension: Dimension;
  /** Plain-language question text */
  question: string;
  /** Subtext shown below the question for context */
  helpText?: string;
  answers: AnswerOption[];
}

export interface QuizAnswer {
  questionId: string;
  answerId: string;
}

// ─── Skill / Job Types ──────────────────────────────────────────────────────

export type RiskLevel = "low" | "medium" | "high";

export interface SkillRisk {
  skillName: string;
  riskLevel: RiskLevel;
  /** 0-100 */
  riskScore: number;
  /** Why this skill is at this risk level */
  explanation: string;
  /** What AI capability threatens this skill (if any) */
  aiCapability?: string;
  /** Time horizon: "now" | "2-3 years" | "5+ years" | "unlikely" */
  timeHorizon: "now" | "2-3 years" | "5+ years" | "unlikely";
}

export interface ReskillRecommendation {
  skill: string;
  reason: string;
  /** Estimated effort: "weeks" | "months" | "6+ months" */
  effort: "weeks" | "months" | "6+ months";
  resources?: string[];
}

// ─── Results Types ──────────────────────────────────────────────────────────

export interface DimensionScore {
  dimension: Dimension;
  label: string;
  score: number; // 0-100
  explanation: string;
}

export interface ScoringResult {
  /** Unique ID for this score (assigned on save) */
  scoreId?: string;
  /** Overall AI Career Risk Score: 0-100 */
  overallScore: number;
  /** Human-readable risk label */
  riskLabel: string;
  /** Brief summary paragraph */
  summary: string;
  /** Per-dimension breakdown */
  dimensions: DimensionScore[];
  /** Per-skill risk analysis */
  skillBreakdown: SkillRisk[];
  /** Reskilling priorities (premium tier) */
  reskillPriorities: ReskillRecommendation[];
  /** Job category used for scoring (passed through for premium report) */
  jobCategoryId?: string;
  /** Original quiz answers (passed through for premium report) */
  quizAnswers?: QuizAnswer[];
}

// ─── Job Category Types ─────────────────────────────────────────────────────

export interface JobCategory {
  id: string;
  label: string;
  /** Baseline automation exposure from research (0-100) */
  baselineRisk: number;
  /** Top skills associated with this job family */
  typicalSkills: string[];
  /** Industry velocity modifier (-10 to +10, added to industryVelocity) */
  industryModifier: number;
}

// ─── Assessment Quiz Types (alternative quiz format) ────────────────────────

export interface QuizAnswers {
  jobTitle: string;
  industry: string;
  experience: string;
  skills: string[];
  tasks: string[];
}

export interface ScoreResult {
  overallScore: number; // 0-100
  riskLevel: "Low" | "Medium" | "High";
  skillBreakdown: { skill: string; risk: number; label: "Low" | "Medium" | "High" }[];
  jobTitle: string;
  industry: string;
  headline: string;
  description: string;
}

export interface AssessmentQuestion {
  id: keyof QuizAnswers;
  title: string;
  subtitle: string;
  type: "single" | "multi" | "search";
  options: { value: string; label: string; riskWeight?: number }[];
  maxSelections?: number;
}
