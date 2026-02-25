/**
 * Share Card & Social Sharing Copy — SkillShield
 *
 * Emotional target: Social identity + conversation starter
 * The share card should make them look smart/proactive for taking it,
 * not scared.
 */

// ─── OG IMAGE / SHARE CARD TEXT ──────────────────────────
// This text appears on the preview card when shared on LinkedIn/Twitter
export const shareCard = {
  // The main text on the OG image (varies by score range)
  cardHeadlines: {
    low: [
      "My AI Career Risk Score: {{score}}/100. Feeling solid.",
      "Scored {{score}}/100 on AI risk. My career is harder to automate than I thought.",
      "{{score}}/100 AI risk. Low threat detected.",
    ],
    moderate: [
      "My AI Career Risk Score: {{score}}/100. Time to pay attention.",
      "Got my AI risk score: {{score}}/100. Some surprises in the breakdown.",
      "{{score}}/100 — not safe, not doomed. Now I know where to focus.",
    ],
    high: [
      "My AI Career Risk Score: {{score}}/100. Glad I checked.",
      "Just got my AI risk score. {{score}}/100. Now I have a plan.",
      "{{score}}/100 — the wake-up call I needed. What's your score?",
    ],
    critical: [
      "My AI Career Risk Score: {{score}}/100. Good thing I know now.",
      "{{score}}/100 AI career risk. Knowledge beats denial. What's yours?",
      "Just scored {{score}}/100. Better to know than to guess. Take the quiz.",
    ],
  },
  // Subtext on the card
  cardSubtext: [
    "Free AI Career Risk Assessment — SkillShield",
    "Take the 3-minute quiz at skillshield.com",
    "What's your AI Career Risk Score? Find out free.",
  ],
} as const;

// ─── SHARE PROMPT (ON-PAGE) ──────────────────────────────
// What we show on the results page to encourage sharing
export const sharePrompt = {
  headlines: [
    "Know someone who should see their score?",
    "Share it. Start the conversation.",
    "Your network needs to see this.",
  ],
  subheads: [
    "The professionals who share their score are starting the career conversations that matter.",
    "847,000 people have taken the quiz. Help your network join them.",
    "Sharing your score isn't bragging — it's a public service.",
  ],
  buttonLabels: {
    linkedin: "Share on LinkedIn",
    twitter: "Share on X",
    copy: "Copy link",
    email: "Send via email",
  },
} as const;

// ─── SHARE TEMPLATES (PRE-FILLED POST TEXT) ──────────────
export const shareTemplates = {
  linkedin: [
    "Just took the SkillShield AI Career Risk Assessment. My score: {{score}}/100.\n\nThe task-by-task breakdown was eye-opening. If you're wondering how AI might affect your role, this is worth 3 minutes.\n\n{{url}}",
    "I've been hearing about AI replacing jobs for years. Finally got a specific, data-backed answer for MY role.\n\nMy AI Career Risk Score: {{score}}/100.\n\nThe breakdown shows exactly which of my daily tasks are most at risk. Take it yourself: {{url}}",
    "Everyone's got an opinion about AI and jobs. SkillShield gives you data.\n\nMy score: {{score}}/100. What's yours?\n\n{{url}}",
  ],
  twitter: [
    "My AI Career Risk Score: {{score}}/100 🎯\n\n3-minute quiz, data-backed results. No fluff.\n\nWhat's yours? {{url}}",
    "Just found out {{score}}% of my core job tasks are automatable by AI.\n\nKnowledge > denial.\n\n{{url}}",
    "\"How will AI affect my job?\" is vague.\n\"{{score}}/100\" is specific.\n\nTake the quiz: {{url}}",
  ],
} as const;

// ─── SHARE SUCCESS / COPIED STATE ────────────────────────
export const shareConfirmation = {
  copied: [
    "Link copied. Share away.",
    "Copied to clipboard.",
    "Got it. Now paste it somewhere good.",
  ],
  shared: [
    "Shared. You're officially proactive.",
    "Done. Your network will thank you.",
    "Posted. Now let's get back to your results.",
  ],
} as const;
