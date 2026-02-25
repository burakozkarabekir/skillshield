/**
 * SEO Job-Specific Landing Page Copy — SkillShield
 *
 * Template system for pages like:
 * "Will AI replace accountants?"
 * "Will AI replace graphic designers?"
 *
 * Each page gets a unique slug, title, and tailored copy
 * that ranks for "[job] AI replacement" searches.
 */

export interface JobSEOPage {
  slug: string;
  jobTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;
  riskSummary: string;
  averageScore: number;
  tasksAtRisk: string[];
  tasksSafe: string[];
  verdictHeadline: string;
  verdictBody: string;
  ctaHeadline: string;
  ctaSubhead: string;
}

// ─── SEO PAGE TEMPLATES ──────────────────────────────────
// Reusable patterns for generating pages at scale
export const seoTemplates = {
  metaTitle: (jobTitle: string) =>
    `Will AI Replace ${jobTitle}? Your Risk Score | SkillShield`,
  metaDescription: (jobTitle: string, avgScore: number) =>
    `The average AI risk score for ${jobTitle} is ${avgScore}/100. Take the free 3-minute quiz to get your personalized score and task-by-task breakdown.`,
  heroHeadline: (jobTitle: string) =>
    `Will AI replace ${jobTitle.toLowerCase()}?`,
  heroSubhead: (jobTitle: string, avgScore: number) =>
    `The average ${jobTitle.toLowerCase()} scores ${avgScore}/100 on AI career risk. Here's what that means — and how to get your own score.`,
  verdictCta: "Get your personal score",
} as const;

// ─── SAMPLE JOB PAGES ────────────────────────────────────
export const jobPages: JobSEOPage[] = [
  {
    slug: "accountants",
    jobTitle: "Accountants",
    metaTitle: "Will AI Replace Accountants? Your Risk Score | SkillShield",
    metaDescription:
      "The average AI risk score for accountants is 72/100. Take the free 3-minute quiz to get your personalized score and task-by-task breakdown.",
    heroHeadline: "Will AI replace accountants?",
    heroSubhead:
      "The average accountant scores 72/100 on AI career risk. Bookkeeping is almost fully automatable. Advisory work is not. Where do you fall?",
    riskSummary:
      "Accounting is one of the highest-risk white-collar professions. AI can already handle bookkeeping, tax preparation, basic auditing, and financial reporting faster and cheaper than humans. But complex advisory, client relationships, and regulatory judgment remain firmly human.",
    averageScore: 72,
    tasksAtRisk: [
      "Bookkeeping and transaction recording",
      "Standard tax return preparation",
      "Financial report generation",
      "Invoice processing and reconciliation",
      "Basic audit procedures",
    ],
    tasksSafe: [
      "Complex tax strategy and planning",
      "Client relationship management",
      "Regulatory interpretation for novel situations",
      "Fraud detection requiring investigative judgment",
      "Business advisory and strategic counsel",
    ],
    verdictHeadline: "The verdict: evolve or compete with software.",
    verdictBody:
      "If your day is mostly bookkeeping and standard compliance, your risk is real. If you're doing strategic advisory and complex client work, you're in a stronger position. Most accountants are somewhere in between — which is exactly why getting your personal score matters.",
    ctaHeadline: "What's YOUR score as an accountant?",
    ctaSubhead:
      "The average is 72/100. But your daily tasks, experience level, and specialization all affect your personal risk. Find out in 3 minutes.",
  },
  {
    slug: "graphic-designers",
    jobTitle: "Graphic Designers",
    metaTitle:
      "Will AI Replace Graphic Designers? Your Risk Score | SkillShield",
    metaDescription:
      "The average AI risk score for graphic designers is 61/100. Take the free 3-minute quiz to get your personalized score and task-by-task breakdown.",
    heroHeadline: "Will AI replace graphic designers?",
    heroSubhead:
      "The average graphic designer scores 61/100 on AI career risk. Template work is toast. Original brand thinking is not.",
    riskSummary:
      "AI image generation has advanced faster than almost any other domain. Tools like Midjourney and DALL-E can now produce professional-quality visuals in seconds. But brand strategy, art direction, and designs that require deep client understanding remain human-led.",
    averageScore: 61,
    tasksAtRisk: [
      "Social media graphic creation from templates",
      "Stock image selection and basic photo editing",
      "Standard presentation design",
      "Simple logo variations and resizing",
      "Banner ad production",
    ],
    tasksSafe: [
      "Brand identity development and strategy",
      "Art direction and creative leadership",
      "User experience design requiring user research",
      "Complex multi-touchpoint campaign design",
      "Client presentation and concept selling",
    ],
    verdictHeadline: "The verdict: production work is disappearing. Thinking isn't.",
    verdictBody:
      "If you're primarily executing templates and production work, AI is already doing it faster. If you're the person who decides what gets made, why, and how it connects to business goals — you're the one who'll manage the AI, not compete with it.",
    ctaHeadline: "What's YOUR score as a designer?",
    ctaSubhead:
      "The average is 61/100. But whether you do production or strategy changes everything. Get your personal breakdown.",
  },
  {
    slug: "software-engineers",
    jobTitle: "Software Engineers",
    metaTitle:
      "Will AI Replace Software Engineers? Your Risk Score | SkillShield",
    metaDescription:
      "The average AI risk score for software engineers is 48/100. Take the free 3-minute quiz to get your personalized score and task-by-task breakdown.",
    heroHeadline: "Will AI replace software engineers?",
    heroSubhead:
      "The average software engineer scores 48/100 on AI career risk. Boilerplate code is trivial for AI. System design is not.",
    riskSummary:
      "AI coding assistants can now write, debug, and refactor code at a level that handles most routine programming tasks. But system architecture, understanding ambiguous requirements, cross-team coordination, and novel problem-solving remain deeply human. The role is transforming, not disappearing.",
    averageScore: 48,
    tasksAtRisk: [
      "Writing boilerplate and CRUD code",
      "Bug fixing in well-documented codebases",
      "Code review for style and standard issues",
      "Writing unit tests for existing code",
      "Documentation generation",
    ],
    tasksSafe: [
      "System architecture and design decisions",
      "Translating ambiguous business requirements into technical specs",
      "Cross-team technical leadership",
      "Performance optimization of complex systems",
      "Mentoring and growing engineering teams",
    ],
    verdictHeadline: "The verdict: 10x engineers just became 100x engineers.",
    verdictBody:
      "AI won't replace software engineers — it will amplify them. Engineers who adopt AI tools will be dramatically more productive. Those who don't will be out-competed by smaller teams using AI. The question isn't replacement. It's whether you're using the tools or losing to them.",
    ctaHeadline: "What's YOUR score as an engineer?",
    ctaSubhead:
      "The average is 48/100. But junior IC vs. senior architect makes a huge difference. Get your personal score.",
  },
  {
    slug: "registered-nurses",
    jobTitle: "Registered Nurses",
    metaTitle:
      "Will AI Replace Registered Nurses? Your Risk Score | SkillShield",
    metaDescription:
      "The average AI risk score for registered nurses is 23/100. Take the free 3-minute quiz to get your personalized score and task-by-task breakdown.",
    heroHeadline: "Will AI replace nurses?",
    heroSubhead:
      "The average registered nurse scores 23/100 on AI career risk. Hands-on care is irreplaceable. Charting is not.",
    riskSummary:
      "Nursing is one of the most AI-resistant professions. Physical patient care, emotional support, and clinical judgment in unpredictable situations are beyond AI's reach. However, documentation, scheduling, and routine monitoring tasks will be increasingly automated.",
    averageScore: 23,
    tasksAtRisk: [
      "Medical charting and documentation",
      "Routine vital sign monitoring",
      "Medication administration scheduling",
      "Patient record data entry",
    ],
    tasksSafe: [
      "Physical patient care and procedures",
      "Emergency response and triage decisions",
      "Patient and family emotional support",
      "Complex clinical judgment calls",
      "Interdisciplinary care coordination",
    ],
    verdictHeadline: "The verdict: AI will make nurses more efficient, not obsolete.",
    verdictBody:
      "Nursing combines physical skill, emotional intelligence, and rapid clinical judgment in ways AI cannot replicate. Expect AI to handle your paperwork, not your patients. The biggest change: nurses who embrace AI documentation tools will spend more time on actual care.",
    ctaHeadline: "What's YOUR score as a nurse?",
    ctaSubhead:
      "The average is 23/100. Your specific specialty and daily task mix affect your personal score. Find out.",
  },
  {
    slug: "marketing-managers",
    jobTitle: "Marketing Managers",
    metaTitle:
      "Will AI Replace Marketing Managers? Your Risk Score | SkillShield",
    metaDescription:
      "The average AI risk score for marketing managers is 55/100. Take the free 3-minute quiz to get your personalized score and task-by-task breakdown.",
    heroHeadline: "Will AI replace marketing managers?",
    heroSubhead:
      "The average marketing manager scores 55/100 on AI career risk. Content production is already automated. Strategy is holding firm.",
    riskSummary:
      "AI can now write copy, generate images, analyze campaign data, run A/B tests, and optimize ad spend — tasks that used to fill most of a marketer's day. But brand positioning, customer insight, creative direction, and cross-functional leadership still require human judgment.",
    averageScore: 55,
    tasksAtRisk: [
      "Social media content creation",
      "Basic copywriting (emails, ad copy, blog posts)",
      "Campaign performance reporting",
      "A/B test setup and analysis",
      "SEO keyword research and optimization",
    ],
    tasksSafe: [
      "Brand strategy and positioning",
      "Customer insight and persona development",
      "Creative campaign concepting",
      "Stakeholder management and cross-functional leadership",
      "Budget allocation and strategic planning",
    ],
    verdictHeadline: "The verdict: content producers are at risk. Strategists are not.",
    verdictBody:
      "The marketing managers most at risk are those who spend their days producing content and pulling reports. Those who focus on strategy, customer understanding, and team leadership are well-positioned. The smartest move: become the person who directs AI, not the person AI replaces.",
    ctaHeadline: "What's YOUR score as a marketer?",
    ctaSubhead:
      "The average is 55/100. But content-focused vs. strategy-focused roles score very differently. See yours.",
  },
] as const;

// ─── SEO SHARED ELEMENTS ─────────────────────────────────
export const seoShared = {
  methodology: {
    headline: "How we calculate these scores.",
    body: "Every score is derived from O*NET task-level data cross-referenced with published AI capability benchmarks. We analyze which specific tasks within each occupation can be performed by current AI systems, weighted by how much time workers spend on each task.",
  },
  disclaimerFooter:
    "Scores represent current AI capability overlap, not a prediction of job elimination. Actual job displacement depends on adoption speed, regulation, and economic factors. Updated quarterly.",
  relatedJobs: {
    headline: "See scores for related roles.",
  },
  breadcrumb: {
    home: "Home",
    careers: "Career Risk Scores",
  },
} as const;
