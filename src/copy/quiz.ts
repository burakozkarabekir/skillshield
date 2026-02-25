/**
 * Quiz Page Copy — SkillShield
 *
 * Emotional target: Engagement + growing investment
 * Questions should feel personalized and insightful, not bureaucratic.
 *
 * 12 questions, each with 4–5 answer options.
 * Questions progress from easy/comfortable → more probing/thought-provoking.
 */

// ─── QUIZ INTRO ──────────────────────────────────────────
export const quizIntro = {
  headlines: [
    "Let's find your real risk.",
    "12 questions. Honest answers only.",
    "Ready to know the truth?",
  ],
  subheads: [
    "Every answer maps to a real AI capability benchmark. No filler questions.",
    "Be specific. The more honest your answers, the more useful your score.",
    "This takes about 3 minutes. Your career clarity lasts a lot longer.",
  ],
} as const;

// ─── PROGRESS INDICATORS ─────────────────────────────────
export const progress = {
  labels: [
    (current: number, total: number) => `${current} of ${total}`,
    (current: number, total: number) =>
      `Question ${current}/${total}`,
    (current: number, total: number) =>
      `${Math.round((current / total) * 100)}% complete`,
  ],
  encouragement: {
    quarter: "Good start. Keep going.",
    halfway: "Halfway there. Getting interesting.",
    threeQuarter: "Almost done. The good stuff is next.",
    final: "Last one. Make it count.",
  },
} as const;

// ─── QUESTIONS ───────────────────────────────────────────
export const questions = [
  {
    id: "role-type",
    question: "What best describes your work?",
    context: "Pick the closest match — even if it's not perfect.",
    options: [
      { value: "knowledge", label: "I mostly analyze information and make decisions" },
      { value: "creative", label: "I mostly create original content or designs" },
      { value: "technical", label: "I mostly build, code, or engineer things" },
      { value: "interpersonal", label: "I mostly manage people or client relationships" },
      { value: "physical", label: "I mostly do hands-on or physical work" },
    ],
  },
  {
    id: "daily-tasks",
    question: "How much of your day is spent on repetitive tasks?",
    context: "Think emails, data entry, scheduling, standard reports.",
    options: [
      { value: "most", label: "More than 75% — most of my day is routine" },
      { value: "half", label: "About 50% — a mix of routine and unique work" },
      { value: "some", label: "About 25% — mostly unique problems" },
      { value: "rarely", label: "Under 10% — almost everything I do is different" },
    ],
  },
  {
    id: "data-work",
    question: "How often do you work with data or spreadsheets?",
    context: "Pulling reports, analyzing numbers, making charts.",
    options: [
      { value: "daily", label: "Every day — it's core to my job" },
      { value: "weekly", label: "A few times a week" },
      { value: "monthly", label: "Occasionally, maybe monthly" },
      { value: "rarely", label: "Almost never" },
    ],
  },
  {
    id: "writing-output",
    question: "How much writing does your job require?",
    context: "Emails, reports, proposals, documentation, copy.",
    options: [
      { value: "heavy", label: "Writing is my primary output" },
      { value: "significant", label: "I write a lot but it's not my main job" },
      { value: "moderate", label: "Some writing, mostly short communications" },
      { value: "minimal", label: "Very little — I rarely write anything substantial" },
    ],
  },
  {
    id: "decision-making",
    question: "What kind of decisions do you make at work?",
    context: "Think about the hardest call you made last week.",
    options: [
      { value: "strategic", label: "High-stakes decisions with incomplete information" },
      { value: "judgment", label: "Decisions requiring experience and nuanced judgment" },
      { value: "rule-based", label: "Decisions following clear policies or procedures" },
      { value: "execution", label: "I mostly execute decisions others have made" },
    ],
  },
  {
    id: "human-interaction",
    question: "How critical is face-to-face interaction in your role?",
    context: "Could your job be done without ever meeting anyone in person?",
    options: [
      { value: "essential", label: "Impossible without it — I work with people all day" },
      { value: "important", label: "Very important but not every single day" },
      { value: "moderate", label: "Helpful but I could do most of my job remotely" },
      { value: "minimal", label: "I could do 95% of my job without seeing anyone" },
    ],
  },
  {
    id: "tool-adoption",
    question: "How quickly does your workplace adopt new technology?",
    context: "Think about the last major tool or system change.",
    options: [
      { value: "leading", label: "We're usually early adopters" },
      { value: "moderate", label: "We adopt things once they're proven" },
      { value: "slow", label: "We're behind — still using outdated tools" },
      { value: "resistant", label: "My industry resists change" },
    ],
  },
  {
    id: "ai-exposure",
    question: "Are you already using AI tools at work?",
    context: "ChatGPT, Copilot, Midjourney, or any AI-powered tool.",
    options: [
      { value: "daily", label: "Yes, daily — it's part of my workflow" },
      { value: "experimenting", label: "I've tried a few tools, experimenting" },
      { value: "aware", label: "I know about them but haven't used them at work" },
      { value: "no", label: "No, and I don't plan to" },
    ],
  },
  {
    id: "unique-value",
    question: "What's the hardest part of your job to explain to someone?",
    context: "This is often the part AI struggles with most.",
    options: [
      { value: "relationships", label: "The relationship dynamics and politics" },
      { value: "intuition", label: "The intuition built from years of experience" },
      { value: "creativity", label: "The creative leaps and original thinking" },
      { value: "physical", label: "The physical skill and coordination required" },
      { value: "nothing", label: "Honestly, most of it is pretty straightforward" },
    ],
  },
  {
    id: "industry",
    question: "Which industry are you in?",
    context: "Pick the closest. This affects your risk profile significantly.",
    options: [
      { value: "tech", label: "Technology / Software" },
      { value: "finance", label: "Finance / Banking / Insurance" },
      { value: "healthcare", label: "Healthcare / Medical" },
      { value: "education", label: "Education / Training" },
      { value: "other", label: "Other (retail, manufacturing, government, etc.)" },
    ],
  },
  {
    id: "experience-level",
    question: "How many years of experience do you have?",
    context: "In your current field, not total working years.",
    options: [
      { value: "junior", label: "0–2 years" },
      { value: "mid", label: "3–7 years" },
      { value: "senior", label: "8–15 years" },
      { value: "veteran", label: "15+ years" },
    ],
  },
  {
    id: "adaptability",
    question: "If your role changed dramatically in 12 months, how ready are you?",
    context: "Be honest — this is between you and your score.",
    options: [
      { value: "ready", label: "Bring it on — I adapt fast" },
      { value: "somewhat", label: "I'd manage, but it would be stressful" },
      { value: "worried", label: "I'd struggle without significant retraining" },
      { value: "stuck", label: "I honestly don't know what else I'd do" },
    ],
  },
] as const;

// ─── QUIZ COMPLETION / TRANSITION TO RESULTS ─────────────
export const quizComplete = {
  headlines: [
    "Done. Crunching your data now.",
    "Answers locked. Score incoming.",
    "Got it. Calculating your risk.",
  ],
  subheads: [
    "We're scoring your answers against 1,200+ occupation profiles.",
    "Analyzing your responses against the latest AI research data.",
    "Cross-referencing your profile with real labor market data.",
  ],
} as const;
