/**
 * Results / Score Reveal Page Copy — SkillShield
 *
 * Emotional target: Emotional spike (relief or urgency)
 *   → then desire to share
 *   → then feeling informed and in-control
 *
 * The moment they see "73/100" should hit them in the gut.
 * Then the breakdown should immediately make them feel informed.
 */

// ─── SCORE REVEAL ────────────────────────────────────────
// Dynamic headlines based on score ranges
export const scoreReveal = {
  ranges: [
    {
      min: 0,
      max: 25,
      label: "Low Risk",
      color: "#22c55e", // green
      headlines: [
        "You're in good shape.",
        "AI isn't coming for you. Yet.",
        "Breathe. Your career is solid.",
      ],
      subheads: [
        "Your role has strong defenses against automation. Here's why — and how to keep it that way.",
        "Only a small portion of your core tasks overlap with current AI capabilities.",
        "You're in the safest quartile. But 'safe' doesn't mean 'forever.' Here's your breakdown.",
      ],
    },
    {
      min: 26,
      max: 50,
      label: "Moderate Risk",
      color: "#eab308", // yellow
      headlines: [
        "You've got time. Use it.",
        "Not urgent. Not safe either.",
        "The window is still open.",
      ],
      subheads: [
        "About a third of your core tasks are automatable. That's manageable — if you act now.",
        "You're in the middle of the pack. Some of your tasks are already being automated elsewhere.",
        "Your role will change, not disappear. The question is whether you lead that change or follow it.",
      ],
    },
    {
      min: 51,
      max: 75,
      label: "High Risk",
      color: "#f97316", // orange
      headlines: [
        "This is your wake-up call.",
        "The clock is ticking.",
        "Time to make some moves.",
      ],
      subheads: [
        "More than half of your daily tasks overlap with what AI can do right now. Not next year — now.",
        "Your role is in the top 40% most affected by AI. The specific breakdown below shows where.",
        "This score is a signal, not a sentence. The difference between risk and ruin is what you do next.",
      ],
    },
    {
      min: 76,
      max: 100,
      label: "Critical Risk",
      color: "#ef4444", // red
      headlines: [
        "You need to see this.",
        "Let's be real with you.",
        "This is serious. But fixable.",
      ],
      subheads: [
        "The majority of your core tasks are already within AI's capability range. Your timeline is months, not years.",
        "You're in the highest risk category. That's not a death sentence — it's a starting gun.",
        "Most of your daily work overlaps with what AI systems can do today. Here's exactly what that means.",
      ],
    },
  ],
} as const;

// ─── SCORE CONTEXT BAR ───────────────────────────────────
export const scoreContext = {
  comparisonLabels: [
    (score: number, percentile: number) =>
      `Your score of ${score} puts you in the ${percentile}th percentile of risk.`,
    (score: number, percentile: number) =>
      `${score}/100 — higher than ${percentile}% of people who've taken this quiz.`,
    (score: number, percentile: number) =>
      `${percentile}% of professionals scored lower than your ${score}.`,
  ],
  industryComparison: (industry: string, avgScore: number) =>
    `The average score in ${industry} is ${avgScore}. Here's how your tasks compare.`,
} as const;

// ─── TASK BREAKDOWN SECTION ──────────────────────────────
export const taskBreakdown = {
  sectionHeadlines: [
    "Here's what AI can do — and can't.",
    "Your task-by-task breakdown.",
    "Where exactly is your risk?",
  ],
  riskLabels: {
    high: "High Automation Risk",
    medium: "Partial Automation Risk",
    low: "Low Automation Risk",
    safe: "Human Advantage",
  },
  riskDescriptions: {
    high: "AI can perform this task at or above average human level today.",
    medium: "AI can assist but still needs human oversight for quality.",
    low: "AI has limited capability here. Human skill is still dominant.",
    safe: "This task requires uniquely human qualities AI can't replicate.",
  },
} as const;

// ─── SKILL BREAKDOWN SECTION ─────────────────────────────
export const skillBreakdown = {
  sectionHeadlines: [
    "Skills that protect you.",
    "Your career armor, ranked.",
    "What makes you hard to replace.",
  ],
  subheads: [
    "These are the specific skills that lower your risk. Double down on the green ones.",
    "Skills in green are your moat. Skills in red are where AI is closing the gap fastest.",
    "Focus your upskilling here. These are the skills with the highest return on investment.",
  ],
  categories: {
    shielded: {
      label: "Your Shield Skills",
      description: "AI can't touch these. They make you irreplaceable.",
    },
    atRisk: {
      label: "Skills Under Threat",
      description:
        "AI is getting good at these. Start transitioning away from relying on them.",
    },
    emerging: {
      label: "Skills to Build",
      description:
        "You don't have these yet, but they'd drop your score significantly.",
    },
  },
} as const;

// ─── INSIGHT PARAGRAPHS ──────────────────────────────────
// These are generated dynamically but here are template patterns
export const insights = {
  sectionHeadlines: [
    "What this means for you.",
    "The bottom line.",
    "Your situation, decoded.",
  ],
  templates: {
    highRisk:
      "Your role's core value is concentrated in tasks that AI systems can already handle. This doesn't mean your job disappears tomorrow — adoption takes time. But the trajectory is clear, and professionals who reskill early will have the strongest negotiating position.",
    moderateRisk:
      "You're in a transitional zone. Parts of your role will be augmented by AI, making you more productive if you adopt the tools — or more replaceable if you don't. The key is becoming the person who uses AI, not the person AI replaces.",
    lowRisk:
      "Your work relies heavily on capabilities that AI still struggles with — whether that's physical presence, nuanced human judgment, or deep relationship management. Stay sharp on these strengths and keep monitoring which AI capabilities improve year over year.",
    adaptable:
      "Your willingness to adapt is one of your biggest assets. Pair that with the specific skill recommendations below and you'll be well ahead of most people in your field.",
    resistant:
      "You mentioned your industry is slow to adopt new technology. That might feel safe now, but it also means disruption — when it comes — will be more sudden. Industries that delay AI adoption tend to experience sharper, not slower, transitions.",
  },
} as const;

// ─── SCORE VISUAL LABELS ─────────────────────────────────
export const scoreVisual = {
  meterLabels: {
    low: "Low Risk",
    moderate: "Moderate",
    high: "High Risk",
    critical: "Critical",
  },
  // Shown under the big score number
  taglines: [
    (score: number) =>
      score <= 25
        ? "Your career is well-positioned."
        : score <= 50
          ? "Attention needed. Not urgent."
          : score <= 75
            ? "Action required soon."
            : "Immediate action recommended.",
  ],
} as const;
