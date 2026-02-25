import {
  DEFAULT_WEIGHTS,
  Dimension,
  DimensionScore,
  QuizAnswer,
  ReskillRecommendation,
  RiskLevel,
  ScoringResult,
  SkillRisk,
} from "./types";
import { quizQuestions } from "@/data/quiz-questions";
import { jobCategories } from "@/data/job-categories";
import { skillRiskMap } from "@/data/skill-risk-map";

// ─── Dimension Labels ───────────────────────────────────────────────────────

const DIMENSION_LABELS: Record<Dimension, string> = {
  taskComposition: "Task Composition",
  skillReplaceability: "Skill Replaceability",
  industryVelocity: "Industry Adoption Speed",
  experienceMoat: "Experience & Expertise Moat",
  humanInteraction: "Human Interaction Dependency",
};

const DIMENSION_EXPLANATIONS: Record<Dimension, (score: number) => string> = {
  taskComposition: (s) =>
    s >= 70
      ? "Your daily tasks are heavily routine and procedural — the category most vulnerable to AI automation."
      : s >= 40
        ? "Your work mix includes both routine and non-routine tasks. The routine portions are at risk, but variety provides some protection."
        : "Your work involves significant creativity, improvisation, or novel problem-solving — tasks AI struggles with most.",
  skillReplaceability: (s) =>
    s >= 70
      ? "Your core skills overlap significantly with current AI capabilities. These tasks can already be partially or fully automated."
      : s >= 40
        ? "Some of your skills are in AI's reach, but others require judgment, creativity, or interpersonal abilities that provide defensibility."
        : "Your most important skills involve deeply human capabilities — relationship building, complex judgment, or physical expertise — that AI cannot replicate.",
  industryVelocity: (s) =>
    s >= 70
      ? "Your industry is adopting AI aggressively. Companies in your sector are already deploying AI to replace tasks and roles."
      : s >= 40
        ? "Your industry is exploring AI but hasn't fully committed. You have time to adapt, but the pressure is building."
        : "Your industry adopts AI slowly due to regulation, physical constraints, or institutional inertia. This buys time but doesn't eliminate long-term risk.",
  experienceMoat: (s) =>
    s >= 70
      ? "Your role could be learned quickly and doesn't rely on deep tacit knowledge. This makes it easier for AI (or anyone) to replace."
      : s >= 40
        ? "You've built moderate expertise and institutional knowledge. This creates some defensibility, but it may not be enough long-term."
        : "Your deep expertise, credentials, and institutional knowledge create a strong moat. AI would need years of context to approach your judgment.",
  humanInteraction: (s) =>
    s >= 70
      ? "Your work is primarily digital and remote-capable, making it more exposed to AI automation since it already flows through machines."
      : s >= 40
        ? "Your job has a mix of digital and in-person components. The in-person elements add defensibility against automation."
        : "Your work fundamentally requires human presence, empathy, or physical skill — the strongest protection against AI automation.",
};

// ─── Risk Labels & Summaries ────────────────────────────────────────────────

function getRiskLabel(score: number): string {
  if (score >= 75) return "High Risk";
  if (score >= 55) return "Moderate-High Risk";
  if (score >= 35) return "Moderate Risk";
  if (score >= 20) return "Low-Moderate Risk";
  return "Low Risk";
}

function getSummary(score: number, jobLabel: string): string {
  if (score >= 75)
    return `Your career profile in ${jobLabel} shows significant exposure to AI automation. Many of your daily tasks and core skills are in areas where AI is already capable or will be within 2-3 years. This doesn't mean your job disappears tomorrow, but it does mean proactive reskilling is important. Focus on developing skills AI can't easily replicate — relationship building, creative strategy, and complex judgment.`;
  if (score >= 55)
    return `Your career profile in ${jobLabel} has notable automation exposure, particularly in routine and digital aspects of your work. However, you have some defensible skills and elements that provide breathing room. Now is the ideal time to lean into the human, creative, and interpersonal parts of your role while building expertise in areas AI will augment rather than replace.`;
  if (score >= 35)
    return `Your career profile in ${jobLabel} has moderate AI exposure. Some of your tasks could be augmented or partially automated, but your role has meaningful elements that require human judgment, creativity, or interpersonal skill. Stay aware of AI tools entering your field and focus on becoming an expert at using AI to amplify your distinctly human contributions.`;
  if (score >= 20)
    return `Your career profile in ${jobLabel} is relatively well-protected from AI automation. Your work involves significant human judgment, interpersonal skill, or physical expertise that AI cannot replicate. Continue deepening your expertise and relationships. Your biggest opportunity is using AI tools to become more productive in your already-defensible role.`;
  return `Your career profile in ${jobLabel} is highly resistant to AI automation. Your work is fundamentally built on human qualities — empathy, physical skill, creative vision, or deep expertise — that represent AI's hardest challenges. Keep building on these strengths. AI will likely become a useful tool in your arsenal, not a competitor.`;
}

// ─── Core Scoring Algorithm ─────────────────────────────────────────────────

/**
 * Calculate the overall AI Career Risk Score from quiz answers.
 *
 * Algorithm:
 * 1. Compute per-dimension scores by averaging answers within each dimension.
 * 2. Apply job-category baseline blending (30% baseline, 70% quiz-derived).
 * 3. Apply industry modifier from job category.
 * 4. Compute weighted overall score using research-backed dimension weights.
 * 5. Generate skill-level risk breakdown based on job category + answers.
 * 6. Generate reskilling recommendations from high-risk skills.
 */
export function calculateScore(
  answers: QuizAnswer[],
  jobCategoryId: string
): ScoringResult {
  const job = jobCategories.find((j) => j.id === jobCategoryId);
  if (!job) {
    throw new Error(`Unknown job category: ${jobCategoryId}`);
  }

  // Step 1: Compute per-dimension raw scores
  const dimensionRawScores = computeDimensionScores(answers);

  // Step 2: Apply industry modifier to industryVelocity dimension
  const industryModified = { ...dimensionRawScores };
  industryModified.industryVelocity = clamp(
    dimensionRawScores.industryVelocity + job.industryModifier,
    0,
    100
  );

  // Step 3: Compute weighted quiz score
  const quizScore = Object.entries(DEFAULT_WEIGHTS).reduce(
    (total, [dim, weight]) => {
      return total + industryModified[dim as Dimension] * weight;
    },
    0
  );

  // Step 4: Blend with job category baseline (70% quiz, 30% baseline)
  // This anchors scores to research while allowing individual variation.
  const QUIZ_WEIGHT = 0.7;
  const BASELINE_WEIGHT = 0.3;
  const overallScore = Math.round(
    quizScore * QUIZ_WEIGHT + job.baselineRisk * BASELINE_WEIGHT
  );

  // Step 5: Build dimension breakdown
  const dimensions: DimensionScore[] = (
    Object.keys(DEFAULT_WEIGHTS) as Dimension[]
  ).map((dim) => ({
    dimension: dim,
    label: DIMENSION_LABELS[dim],
    score: Math.round(industryModified[dim]),
    explanation: DIMENSION_EXPLANATIONS[dim](industryModified[dim]),
  }));

  // Step 6: Build skill risk breakdown from job category
  const skillBreakdown = buildSkillBreakdown(job.typicalSkills, overallScore);

  // Step 7: Generate reskilling recommendations
  const reskillPriorities = generateReskillRecommendations(skillBreakdown);

  return {
    overallScore: clamp(overallScore, 0, 100),
    riskLabel: getRiskLabel(overallScore),
    summary: getSummary(overallScore, job.label),
    dimensions,
    skillBreakdown,
    reskillPriorities,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function computeDimensionScores(
  answers: QuizAnswer[]
): Record<Dimension, number> {
  const dimensionScores: Record<Dimension, number[]> = {
    taskComposition: [],
    skillReplaceability: [],
    industryVelocity: [],
    experienceMoat: [],
    humanInteraction: [],
  };

  for (const answer of answers) {
    const question = quizQuestions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const selectedAnswer = question.answers.find(
      (a) => a.id === answer.answerId
    );
    if (!selectedAnswer) continue;

    dimensionScores[question.dimension].push(selectedAnswer.score);
  }

  // Average scores per dimension; default to 50 (neutral) if no answers
  const result: Record<Dimension, number> = {} as Record<Dimension, number>;
  for (const [dim, scores] of Object.entries(dimensionScores)) {
    result[dim as Dimension] =
      scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 50;
  }

  return result;
}

function buildSkillBreakdown(
  typicalSkills: string[],
  overallScore: number
): SkillRisk[] {
  return typicalSkills.map((skillName) => {
    const mapped = skillRiskMap[skillName];
    if (mapped) {
      return mapped;
    }
    // Fallback: estimate from overall score for unmapped skills
    const estimatedScore = clamp(overallScore + randomOffset(), 0, 100);
    return {
      skillName,
      riskLevel: scoreToRiskLevel(estimatedScore),
      riskScore: estimatedScore,
      explanation: `This skill's automation risk is estimated based on your overall career profile. More specific assessment requires detailed task analysis.`,
      timeHorizon: estimatedScore > 60 ? "2-3 years" : "5+ years" as const,
    };
  });
}

function generateReskillRecommendations(
  skills: SkillRisk[]
): ReskillRecommendation[] {
  const highRiskSkills = skills
    .filter((s) => s.riskLevel === "high" || s.riskScore >= 65)
    .sort((a, b) => b.riskScore - a.riskScore);

  const recommendations: ReskillRecommendation[] = [];

  for (const skill of highRiskSkills.slice(0, 5)) {
    const rec = getRecommendationForSkill(skill);
    if (rec) recommendations.push(rec);
  }

  // Always add universal recommendations
  recommendations.push({
    skill: "AI Tool Proficiency",
    reason:
      "Regardless of your role, becoming an expert AI user makes you more valuable. Learn to prompt effectively, evaluate AI output critically, and integrate AI into your workflows.",
    effort: "weeks",
    resources: [
      "Coursera: AI For Everyone (Andrew Ng)",
      "LinkedIn Learning: Generative AI for Business",
    ],
  });

  return recommendations;
}

function getRecommendationForSkill(
  skill: SkillRisk
): ReskillRecommendation | null {
  const reskillMap: Record<string, ReskillRecommendation> = {
    "Data entry": {
      skill: "Data Analysis & Interpretation",
      reason:
        "Move from entering data to analyzing it. Learn to interpret trends, build dashboards, and translate data into business decisions.",
      effort: "months",
      resources: [
        "Google Data Analytics Certificate",
        "Coursera: Excel to MySQL",
      ],
    },
    Bookkeeping: {
      skill: "Financial Analysis & Advisory",
      reason:
        "Shift from recording transactions to advising on financial strategy. The analytical and advisory layer is much harder to automate.",
      effort: "months",
      resources: [
        "CPA exam prep",
        "Coursera: Financial Markets (Yale)",
      ],
    },
    Copywriting: {
      skill: "Brand Strategy & Voice Curation",
      reason:
        "Move from writing copy to defining the brand voice, editorial strategy, and quality standards that guide AI-generated content.",
      effort: "months",
      resources: [
        "Coursera: Brand Management (London Business School)",
        "The Brand Gap by Marty Neumeier",
      ],
    },
    Scheduling: {
      skill: "Project Management & Coordination",
      reason:
        "Expand from scheduling to full project management. Coordinating people, priorities, and deliverables requires human judgment.",
      effort: "months",
      resources: [
        "Google Project Management Certificate",
        "PMI CAPM certification",
      ],
    },
    "Legal research": {
      skill: "Legal Strategy & Client Advisory",
      reason:
        "Shift from research to strategic legal advice. Develop expertise in counseling clients, structuring deals, and courtroom strategy.",
      effort: "6+ months",
      resources: [
        "Advanced litigation workshops",
        "Negotiation courses (Harvard PON)",
      ],
    },
    "Contract review": {
      skill: "Contract Negotiation & Drafting Strategy",
      reason:
        "Move from reviewing contracts to negotiating and strategically structuring them. The human relationship in deal-making is defensible.",
      effort: "months",
      resources: [
        "Coursera: Successful Negotiation (Michigan)",
        "ABA Contract Drafting programs",
      ],
    },
    "Email correspondence": {
      skill: "Stakeholder Communication & Relationship Management",
      reason:
        "Evolve from email handling to strategic stakeholder management. Focus on high-stakes, nuanced communication where AI falls short.",
      effort: "weeks",
      resources: [
        "Crucial Conversations (book & workshop)",
        "LinkedIn Learning: Executive Communication",
      ],
    },
    "Social media management": {
      skill: "Community Building & Brand Strategy",
      reason:
        "Move from managing posts to building engaged communities. Strategy, brand voice, and real human connection are defensible.",
      effort: "months",
      resources: [
        "Meta Social Media Marketing Certificate",
        "Community management courses",
      ],
    },
    SEO: {
      skill: "Growth Strategy & Marketing Analytics",
      reason:
        "Expand from SEO tactics to holistic growth strategy. Understanding customer journeys and multi-channel attribution adds human value.",
      effort: "months",
      resources: [
        "Google Digital Marketing Certificate",
        "Reforge growth series",
      ],
    },
    "Ticket management": {
      skill: "Customer Success & Account Management",
      reason:
        "Move from reactive ticket handling to proactive customer success. Building relationships and driving adoption requires human connection.",
      effort: "months",
      resources: [
        "Gainsight Customer Success courses",
        "LinkedIn Learning: Customer Success Management",
      ],
    },
    "Document management": {
      skill: "Knowledge Management & Information Architecture",
      reason:
        "Move from filing documents to designing how organizations capture, share, and leverage knowledge. Strategic information architecture is human work.",
      effort: "months",
      resources: [
        "Coursera: Information Architecture",
        "KM certifications (KMI)",
      ],
    },
    "Record keeping": {
      skill: "Compliance & Governance Oversight",
      reason:
        "Move from recording to ensuring records meet governance standards. Compliance judgment and regulatory interpretation need humans.",
      effort: "months",
      resources: [
        "Coursera: Risk Management",
        "Industry-specific compliance certifications",
      ],
    },
    "Tax preparation": {
      skill: "Tax Planning & Advisory",
      reason:
        "Move from preparation to strategic tax planning. Complex tax strategy, estate planning, and advisory work remain human-centric.",
      effort: "6+ months",
      resources: ["CPA exam prep", "EA (Enrolled Agent) certification"],
    },
    "Issue resolution": {
      skill: "Complex Problem-Solving & Escalation Expertise",
      reason:
        "Specialize in the hardest, most emotionally sensitive issues that AI cannot handle. Become the expert for complex edge cases.",
      effort: "months",
      resources: [
        "Conflict resolution courses",
        "Advanced customer service certifications",
      ],
    },
    "Inventory tracking": {
      skill: "Supply Chain Strategy & Analytics",
      reason:
        "Move from tracking to optimizing. Strategic supply chain management, vendor relationships, and risk mitigation are human-centric.",
      effort: "months",
      resources: [
        "APICS CSCP certification",
        "Coursera: Supply Chain Management (Rutgers)",
      ],
    },
    "Literature review": {
      skill: "Research Design & Scientific Strategy",
      reason:
        "Move from reviewing literature to designing experiments and forming novel hypotheses. The creative research process is harder to automate.",
      effort: "6+ months",
      resources: [
        "Advanced research methods courses",
        "Grant writing workshops",
      ],
    },
  };

  return reskillMap[skill.skillName] || null;
}

function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 65) return "high";
  if (score >= 35) return "medium";
  return "low";
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Deterministic "random" offset for unmapped skills (seeded by string hash)
function randomOffset(): number {
  return 0; // Keep deterministic for now; in production, use skill name hash
}
