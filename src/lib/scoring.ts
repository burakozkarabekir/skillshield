// AI Career Risk Scoring Algorithm
// Produces a 0-100 score where higher = more at risk of AI disruption

export interface QuizAnswers {
  jobTitle: string;
  jobCategory: string;
  yearsExperience: number;
  taskBreakdown: {
    routine: number;      // % of work that is routine/repetitive
    creative: number;     // % that requires creative thinking
    interpersonal: number; // % that requires human interaction
    physical: number;     // % that requires physical presence
    analytical: number;   // % that is data analysis/processing
  };
  aiToolUsage: 'none' | 'experimenting' | 'regular' | 'daily-driver';
  educationLevel: 'high-school' | 'bachelors' | 'masters' | 'phd' | 'bootcamp' | 'self-taught';
  industryAdoption: 'slow' | 'moderate' | 'fast' | 'bleeding-edge';
  remoteWork: 'fully-remote' | 'hybrid' | 'in-person';
  teamSize: 'solo' | 'small' | 'medium' | 'large';
  decisionMaking: 'none' | 'some' | 'significant' | 'primary';
}

export interface RiskScore {
  overall: number;            // 0-100
  category: 'low' | 'moderate' | 'high' | 'critical';
  factors: RiskFactor[];
  strengths: string[];
  vulnerabilities: string[];
  headline: string;
  shareText: string;
  timeframeYears: number;     // estimated years until significant impact
}

export interface RiskFactor {
  name: string;
  score: number;
  weight: number;
  description: string;
}

// Base risk by job category (researched from AI impact studies)
const JOB_CATEGORY_BASE_RISK: Record<string, number> = {
  'data-entry': 92,
  'customer-service': 78,
  'accounting': 75,
  'legal-research': 70,
  'copywriting': 72,
  'graphic-design': 65,
  'software-engineering': 35,
  'product-management': 30,
  'sales': 40,
  'marketing': 55,
  'hr': 45,
  'healthcare': 25,
  'education': 30,
  'trades': 15,
  'executive': 20,
  'research': 40,
  'finance': 60,
  'consulting': 35,
  'operations': 50,
  'content-creation': 68,
  'translation': 82,
  'journalism': 58,
  'real-estate': 35,
  'other': 50,
};

export function calculateRiskScore(answers: QuizAnswers): RiskScore {
  const factors: RiskFactor[] = [];

  // Factor 1: Job category base risk (30% weight)
  const baseRisk = JOB_CATEGORY_BASE_RISK[answers.jobCategory] ?? 50;
  factors.push({
    name: 'Role Automation Potential',
    score: baseRisk,
    weight: 0.30,
    description: `${answers.jobTitle} roles have a ${baseRisk}% base automation risk`,
  });

  // Factor 2: Task composition (25% weight)
  const taskRisk = Math.round(
    answers.taskBreakdown.routine * 0.9 +
    answers.taskBreakdown.analytical * 0.7 +
    answers.taskBreakdown.creative * 0.2 +
    answers.taskBreakdown.interpersonal * 0.1 +
    answers.taskBreakdown.physical * 0.05
  );
  factors.push({
    name: 'Task Vulnerability',
    score: Math.min(100, taskRisk),
    weight: 0.25,
    description: `${answers.taskBreakdown.routine}% of your work is routine — the most automatable type`,
  });

  // Factor 3: AI adaptability (20% weight) — INVERSE: higher adoption = lower risk
  const adaptabilityMap = { 'none': 85, 'experimenting': 55, 'regular': 30, 'daily-driver': 10 };
  const adaptabilityRisk = adaptabilityMap[answers.aiToolUsage];
  factors.push({
    name: 'AI Adaptability Gap',
    score: adaptabilityRisk,
    weight: 0.20,
    description: answers.aiToolUsage === 'none'
      ? 'Not using AI tools puts you at significant risk'
      : answers.aiToolUsage === 'daily-driver'
        ? 'Strong AI adoption — you\'re adapting well'
        : 'Some AI experience, but room to grow',
  });

  // Factor 4: Industry speed (15% weight)
  const industryMap = { 'slow': 25, 'moderate': 50, 'fast': 75, 'bleeding-edge': 90 };
  const industryRisk = industryMap[answers.industryAdoption];
  factors.push({
    name: 'Industry AI Adoption Speed',
    score: industryRisk,
    weight: 0.15,
    description: `Your industry is adopting AI at a ${answers.industryAdoption} pace`,
  });

  // Factor 5: Decision-making authority (10% weight) — higher authority = lower risk
  const decisionMap = { 'none': 80, 'some': 55, 'significant': 30, 'primary': 15 };
  const decisionRisk = decisionMap[answers.decisionMaking];
  factors.push({
    name: 'Decision Authority Shield',
    score: decisionRisk,
    weight: 0.10,
    description: answers.decisionMaking === 'primary'
      ? 'High decision-making authority protects your role'
      : 'Limited decision authority makes your role more replaceable',
  });

  // Calculate weighted overall score
  const overall = Math.round(
    factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  );

  // Determine category
  const category = overall >= 75 ? 'critical'
    : overall >= 50 ? 'high'
    : overall >= 30 ? 'moderate'
    : 'low';

  // Generate strengths and vulnerabilities
  const strengths: string[] = [];
  const vulnerabilities: string[] = [];

  if (answers.taskBreakdown.creative > 30) strengths.push('High creative component in your work');
  if (answers.taskBreakdown.interpersonal > 30) strengths.push('Strong interpersonal/relationship skills required');
  if (answers.aiToolUsage === 'daily-driver') strengths.push('Already leveraging AI as a daily tool');
  if (answers.decisionMaking === 'primary' || answers.decisionMaking === 'significant') strengths.push('Significant decision-making authority');
  if (answers.taskBreakdown.physical > 20) strengths.push('Physical presence requirement protects your role');

  if (answers.taskBreakdown.routine > 40) vulnerabilities.push('High percentage of routine/repetitive tasks');
  if (answers.aiToolUsage === 'none') vulnerabilities.push('No current AI tool adoption');
  if (answers.industryAdoption === 'bleeding-edge') vulnerabilities.push('Industry moving fast on AI adoption');
  if (answers.decisionMaking === 'none') vulnerabilities.push('No decision-making authority in current role');
  if (answers.taskBreakdown.analytical > 40) vulnerabilities.push('Heavy analytical work — AI excels here');

  // Timeframe estimate
  const timeframeYears = category === 'critical' ? 2
    : category === 'high' ? 4
    : category === 'moderate' ? 7
    : 10;

  // Generate viral headline
  const headline = generateHeadline(overall, category, answers.jobTitle);

  // Generate share text optimized for engagement
  const shareText = generateShareText(overall, category, answers.jobTitle, timeframeYears);

  return {
    overall,
    category,
    factors,
    strengths,
    vulnerabilities,
    headline,
    shareText,
    timeframeYears,
  };
}

function generateHeadline(score: number, category: string, jobTitle: string): string {
  if (category === 'critical') return `${jobTitle}: ${score}/100 AI Risk — Time to pivot`;
  if (category === 'high') return `${jobTitle}: ${score}/100 AI Risk — Action needed`;
  if (category === 'moderate') return `${jobTitle}: ${score}/100 AI Risk — Stay vigilant`;
  return `${jobTitle}: ${score}/100 AI Risk — Well positioned`;
}

function generateShareText(score: number, category: string, jobTitle: string, years: number): string {
  const emoji = category === 'critical' ? '🚨'
    : category === 'high' ? '⚠️'
    : category === 'moderate' ? '🔍'
    : '🛡️';

  return `${emoji} My AI Career Risk Score: ${score}/100

As a ${jobTitle}, AI could significantly impact my role within ${years} years.

What's YOUR score? Take the free 2-min assessment 👇`;
}

// Job categories for the quiz dropdown
export const JOB_CATEGORIES = [
  { value: 'software-engineering', label: 'Software Engineering' },
  { value: 'product-management', label: 'Product Management' },
  { value: 'data-entry', label: 'Data Entry / Admin' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'accounting', label: 'Accounting / Bookkeeping' },
  { value: 'legal-research', label: 'Legal / Paralegal' },
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education / Teaching' },
  { value: 'trades', label: 'Skilled Trades' },
  { value: 'executive', label: 'Executive / C-Suite' },
  { value: 'research', label: 'Research / Science' },
  { value: 'finance', label: 'Finance / Banking' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'operations', label: 'Operations / Logistics' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'translation', label: 'Translation / Localization' },
  { value: 'journalism', label: 'Journalism / Media' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'other', label: 'Other' },
] as const;
