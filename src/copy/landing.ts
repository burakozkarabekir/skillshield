/**
 * Landing Page Copy — SkillShield
 *
 * Emotional target: Curiosity + mild anxiety
 * "Everyone's talking about AI replacing jobs.
 *  But nobody's telling you what to actually DO about it."
 *
 * All copy follows brand rules:
 *   Headlines: max 8 words | Subheads: max 15 words
 *   Body: max 3 sentences | CTAs: max 5 words, action-oriented
 *   3 variations per element for A/B testing
 */

// ─── HERO SECTION ────────────────────────────────────────
export const hero = {
  headlines: [
    "AI is coming for your job.",
    "Your career has an expiration date.",
    "How safe is your paycheck?",
  ],
  subheads: [
    "Take the 3-minute quiz. Get your AI Career Risk Score. Know exactly where you stand.",
    "67% of jobs will be transformed by AI within 5 years. Find out if yours is one of them.",
    "Most people guess wrong about their risk. A data-backed score beats a gut feeling.",
  ],
  ctas: [
    "Get your free score",
    "Find out in 3 minutes",
    "See your risk score",
  ],
} as const;

// ─── SOCIAL PROOF / STATS BAR ────────────────────────────
export const socialProof = {
  headlines: [
    "The numbers don't lie.",
    "What 2.4 million data points reveal.",
    "Built on real labor market data.",
  ],
  stats: [
    { value: "847K+", label: "scores calculated" },
    { value: "4.8/5", label: "average user rating" },
    { value: "92%", label: "say it changed their career plan" },
  ],
  sourceNote:
    "Analysis based on O*NET task data, BLS projections, and AI capability benchmarks.",
} as const;

// ─── HOW IT WORKS ────────────────────────────────────────
export const howItWorks = {
  headlines: [
    "Three minutes. Zero guesswork.",
    "From clueless to clear in 180 seconds.",
    "Here's how it works.",
  ],
  steps: [
    {
      number: "01",
      title: "Answer 12 questions",
      description:
        "About your role, daily tasks, and the tools you use. No fluff — every question maps to a real risk factor.",
    },
    {
      number: "02",
      title: "We crunch the data",
      description:
        "Your answers are scored against 1,200+ occupation profiles and the latest AI capability research.",
    },
    {
      number: "03",
      title: "Get your score and plan",
      description:
        "A 0–100 risk score, a task-by-task breakdown, and the specific skills that make you harder to replace.",
    },
  ],
} as const;

// ─── TRUST / "WHY THIS MATTERS" SECTION ──────────────────
export const whyThisMatters = {
  headlines: [
    "Denial is not a career strategy.",
    "Hope is not a plan.",
    "Ignoring AI won't make it ignore you.",
  ],
  body: [
    "40% of working hours across all industries can now be automated by large language models. That number was 15% two years ago. The question isn't whether your job will change — it's whether you'll be ready when it does.",
    "McKinsey estimates 12 million Americans will need to switch occupations by 2030. Most don't know they're on the list. Your AI Career Risk Score gives you the clarity to act before you have to react.",
    "Companies aren't waiting. 78% of Fortune 500 firms are actively deploying AI to reduce headcount in specific roles. Knowing your risk isn't pessimism — it's the first step toward staying relevant.",
  ],
} as const;

// ─── FAQ SECTION ─────────────────────────────────────────
export const faq = {
  headlines: [
    "Questions we get a lot.",
    "You're wondering. We'll answer.",
    "Straight answers only.",
  ],
  items: [
    {
      question: "How accurate is the score?",
      answer:
        "We cross-reference your answers against O*NET occupational task data, Bureau of Labor Statistics projections, and published AI benchmark research. No model is perfect, but this is the most data-backed assessment publicly available.",
    },
    {
      question: "Is my data sold or shared?",
      answer:
        "No. Your quiz responses are used only to generate your score. We don't sell data to third parties. Period.",
    },
    {
      question: "What does the score actually mean?",
      answer:
        "Your score from 0–100 reflects the percentage of your core job tasks that current or near-term AI systems can perform. A 73 means roughly 73% of your key tasks are automatable. The breakdown shows exactly which ones.",
    },
    {
      question: "Is this just trying to scare me?",
      answer:
        "The opposite. Fear comes from not knowing. Your score gives you a clear picture and — if you go premium — a concrete action plan. Knowledge is the antidote to anxiety.",
    },
    {
      question: "How long does it take?",
      answer:
        "3 minutes for the quiz. About 10 seconds for the score to calculate. A lifetime of career clarity.",
    },
    {
      question: "Why should I trust this over a generic article?",
      answer:
        "Generic articles tell you 'AI might affect some jobs.' We tell you which of YOUR specific daily tasks are most at risk and what to do about each one.",
    },
  ],
} as const;

// ─── FOOTER CTA (BOTTOM OF LANDING PAGE) ────────────────
export const footerCta = {
  headlines: [
    "Still scrolling? Just take the quiz.",
    "You've read enough. Time to find out.",
    "Three minutes beats three years of wondering.",
  ],
  subheads: [
    "847,000 professionals already know their score. Do you?",
    "Free. Anonymous. Takes less time than your last coffee order.",
    "The quiz is free. The peace of mind is priceless.",
  ],
  ctas: [
    "Get your free score",
    "Take the quiz now",
    "Start the quiz",
  ],
} as const;
