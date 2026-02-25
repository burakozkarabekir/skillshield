/**
 * Premium CTA & Email Capture Copy — SkillShield
 *
 * Emotional target: Empowerment + urgency
 * "You know the problem. Here's your personalized fix."
 */

// ─── PREMIUM CTA (ON RESULTS PAGE) ──────────────────────
export const premiumCta = {
  headlines: [
    "You know the score. Get the plan.",
    "Diagnosis: done. Treatment: here.",
    "Your score is free. Your roadmap is $29.",
  ],
  subheads: [
    "A personalized 90-day action plan based on your exact risk profile. Specific courses, skills, and career moves.",
    "Get a week-by-week reskilling roadmap tailored to your industry, experience level, and risk areas.",
    "Your free score shows the problem. SkillShield Pro shows the way out — with a plan built for your exact situation.",
  ],
  ctas: [
    "Get my action plan",
    "Unlock my roadmap",
    "Build my career plan",
  ],
  features: [
    {
      title: "90-Day Reskilling Roadmap",
      description: "Week-by-week plan. Specific courses and certifications. Matched to your risk areas.",
    },
    {
      title: "Salary Impact Projections",
      description: "How your earning potential changes based on different reskilling paths. Real numbers.",
    },
    {
      title: "AI-Proof Job Matching",
      description: "Roles in your industry with lower risk scores that use your existing experience.",
    },
    {
      title: "Monthly Risk Updates",
      description: "Your score recalculated monthly as AI capabilities change. Stay ahead of the curve.",
    },
  ],
  pricing: {
    amount: "$29",
    period: "one-time",
    anchoring: [
      "Less than one hour of career coaching.",
      "The average career pivot costs $12,000+ in lost income. This costs $29.",
      "One coffee a week for a month. Or a career plan for the next decade.",
    ],
  },
  guarantee: [
    "30-day money-back guarantee. If the plan isn't useful, you pay nothing.",
    "Full refund within 30 days. No questions, no forms, no friction.",
    "Try it risk-free for 30 days. Not happy? Get every penny back.",
  ],
} as const;

// ─── EMAIL CAPTURE (POST-SCORE, PRE-PREMIUM) ────────────
export const emailCapture = {
  headlines: [
    "Your score will change. We'll tell you when.",
    "AI capabilities shift monthly. Your risk does too.",
    "Want to know when your score changes?",
  ],
  subheads: [
    "Drop your email. We'll notify you when new AI developments affect your specific risk profile.",
    "Get a free monthly update when AI breakthroughs impact your job category. No spam. Unsubscribe anytime.",
    "We track AI capability updates daily. When something affects your score, you'll be the first to know.",
  ],
  ctas: [
    "Notify me",
    "Keep me updated",
    "Track my score",
  ],
  placeholder: "your@email.com",
  disclaimer: [
    "One email per month, max. Unsubscribe in one click.",
    "We'll only email when your risk profile changes. That's it.",
    "No spam. No newsletters. Just your score updates.",
  ],
  success: [
    "You're in. We'll watch your risk so you don't have to.",
    "Saved. You'll hear from us when something changes.",
    "Done. Your career radar is now active.",
  ],
} as const;

// ─── PREMIUM UPSELL IN EMAIL ─────────────────────────────
export const emailUpsell = {
  subject: [
    "Your AI risk score just changed.",
    "Update: your career risk moved {{direction}}.",
    "New AI development affects your role.",
  ],
  preheader: [
    "Your score went from {{oldScore}} to {{newScore}}. Here's why.",
    "A new AI model can now do something you do daily.",
    "Important update for your career risk profile.",
  ],
  body: {
    scoreIncrease:
      "Your AI Career Risk Score increased from {{oldScore}} to {{newScore}} this month. A new AI capability now overlaps with one of your core tasks. Here's what changed and what you can do about it.",
    scoreDecrease:
      "Good news: your risk score dropped from {{oldScore}} to {{newScore}}. The AI capabilities affecting your role haven't advanced as fast as projected. But don't get comfortable — here's the current landscape.",
    noChange:
      "Your score held steady at {{score}} this month. No major shifts in AI capabilities affecting your role. Here's a quick summary of what we're watching.",
  },
  premiumNudge: [
    "Want a specific plan? SkillShield Pro builds your 90-day roadmap. →",
    "Knowing the score is step one. Getting a plan is step two. →",
    "Score updates are free. Action plans are $29. →",
  ],
} as const;

// ─── NOTIFICATION COPY FOR PREMIUM USERS ─────────────────
export const premiumNotifications = {
  weeklyCheckIn: {
    subject: "Your week {{weekNumber}} action item",
    body: "This week's focus: {{skillName}}. Here's your task and the resource to complete it.",
  },
  milestoneReached: {
    subject: "Milestone: {{milestoneName}} complete",
    body: "You've finished {{milestoneName}}. Your projected risk reduction: {{reduction}} points. Next up: {{nextStep}}.",
  },
  scoreUpdate: {
    subject: "Your score dropped {{points}} points",
    body: "Your reskilling is working. You went from {{oldScore}} to {{newScore}}. The specific impact came from {{skillName}}. Keep going.",
  },
  inactivityNudge: {
    subject: [
      "Your plan is waiting.",
      "7 days since your last action.",
      "Quick check-in on your progress.",
    ],
    body: "You're on week {{weekNumber}} of your 90-day plan. The next step takes about {{timeEstimate}} minutes. Pick it back up?",
    cta: "Resume my plan",
  },
} as const;
