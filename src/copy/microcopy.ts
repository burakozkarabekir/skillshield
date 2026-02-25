/**
 * Microcopy — Loading, Error, and Empty States — SkillShield
 *
 * Every state the user encounters should feel intentional,
 * on-brand, and human. Even the error messages.
 */

// ─── LOADING STATES ──────────────────────────────────────
export const loading = {
  quizLoading: [
    "Loading your questions...",
    "Preparing your assessment...",
    "Getting things ready...",
  ],
  scoreCalculating: [
    "Crunching 1,200+ data points...",
    "Cross-referencing your profile...",
    "Analyzing your responses against real labor data...",
  ],
  // Sequential messages shown during score calculation (cycle through these)
  scoreCalculatingSequence: [
    "Mapping your tasks to AI capability benchmarks...",
    "Comparing against 1,200+ occupation profiles...",
    "Calculating your task-by-task risk breakdown...",
    "Cross-referencing Bureau of Labor Statistics data...",
    "Generating your personalized insights...",
    "Almost there...",
  ],
  resultsLoading: [
    "Building your breakdown...",
    "Preparing your results...",
    "Generating your report...",
  ],
  shareCardGenerating: [
    "Creating your share card...",
    "Building your results card...",
    "Generating your shareable score...",
  ],
  premiumLoading: [
    "Building your personalized roadmap...",
    "Generating your 90-day plan...",
    "Creating your action plan...",
  ],
  generic: [
    "Working on it...",
    "One moment...",
    "Almost there...",
  ],
} as const;

// ─── ERROR STATES ────────────────────────────────────────
export const errors = {
  generic: {
    headlines: [
      "Something broke.",
      "That didn't work.",
      "Hit a snag.",
    ],
    body: [
      "Not your fault. Try refreshing the page.",
      "Something went wrong on our end. A refresh usually fixes it.",
      "We hit an error. Refresh the page and try again.",
    ],
    cta: "Refresh page",
  },
  quizSubmitFailed: {
    headlines: [
      "Your answers didn't go through.",
      "Submission failed.",
      "We couldn't save your answers.",
    ],
    body: [
      "Your answers are still here. Hit submit again and we'll retry.",
      "Connection issue. Don't worry — nothing's lost. Try submitting again.",
      "Something went wrong during submission. Your answers are safe. Try once more.",
    ],
    cta: "Try again",
  },
  scoreCalculationFailed: {
    headlines: [
      "Score calculation failed.",
      "We couldn't generate your score.",
      "Something went wrong with your results.",
    ],
    body: [
      "Your answers are saved. We'll try calculating your score again.",
      "The scoring engine hit an issue. Retrying now — your answers are safe.",
      "We're having trouble generating your results. Hang tight.",
    ],
    cta: "Retry calculation",
  },
  emailSubmitFailed: {
    headlines: [
      "That email didn't go through.",
      "Couldn't save your email.",
      "Email signup failed.",
    ],
    body: [
      "Check the address and try again.",
      "Double-check your email and give it another shot.",
      "Something went wrong. Make sure the email is correct and retry.",
    ],
    cta: "Try again",
  },
  paymentFailed: {
    headlines: [
      "Payment didn't go through.",
      "Transaction failed.",
      "We couldn't process your payment.",
    ],
    body: [
      "Check your card details and try again. You won't be charged twice.",
      "Your card was declined. Try a different payment method.",
      "Something went wrong with the payment. No charge was made. Try again.",
    ],
    cta: "Retry payment",
  },
  networkError: {
    headlines: [
      "You seem to be offline.",
      "No connection detected.",
      "Can't reach our servers.",
    ],
    body: [
      "Check your internet connection and try again.",
      "We can't connect right now. Make sure you're online and refresh.",
      "Looks like a connection issue. We'll retry when you're back online.",
    ],
    cta: "Retry connection",
  },
  notFound: {
    headlines: [
      "Page not found.",
      "This page doesn't exist.",
      "Nothing here.",
    ],
    body: [
      "The page you're looking for was moved or deleted.",
      "This URL doesn't lead anywhere. Head back to the homepage.",
      "Whatever you were looking for, it's not here. Try starting over.",
    ],
    cta: "Go to homepage",
  },
  rateLimit: {
    headlines: [
      "Slow down a bit.",
      "Too many requests.",
      "Give us a second.",
    ],
    body: [
      "You're moving faster than our servers. Wait a moment and try again.",
      "We got too many requests at once. Take a breath and retry in a few seconds.",
      "Our servers need a moment. Try again in 30 seconds.",
    ],
    cta: "Wait and retry",
  },
} as const;

// ─── EMPTY STATES ────────────────────────────────────────
export const empty = {
  noResults: {
    headlines: [
      "No results yet.",
      "Nothing to show here.",
      "Your results are waiting.",
    ],
    body: [
      "Take the quiz first to see your AI Career Risk Score.",
      "Complete the assessment to get your personalized risk breakdown.",
      "Start with the 3-minute quiz. Your score will appear here.",
    ],
    cta: "Take the quiz",
  },
  noSavedScores: {
    headlines: [
      "No saved scores.",
      "Your score history is empty.",
      "Nothing tracked yet.",
    ],
    body: [
      "Take the quiz and enter your email to start tracking your score over time.",
      "Once you've completed the assessment, your score history will appear here.",
      "Complete the quiz to see your first score.",
    ],
    cta: "Get your first score",
  },
  noPremiumPlan: {
    headlines: [
      "No action plan yet.",
      "Your roadmap is waiting.",
      "No plan generated.",
    ],
    body: [
      "Upgrade to SkillShield Pro to get your personalized 90-day reskilling roadmap.",
      "Your free score shows the risk. The Pro plan shows the path forward.",
      "Unlock your personalized action plan and start reducing your risk today.",
    ],
    cta: "Get my action plan",
  },
} as const;

// ─── FORM VALIDATION ─────────────────────────────────────
export const validation = {
  emailRequired: "We need your email to send updates.",
  emailInvalid: "That doesn't look like a valid email.",
  questionRequired: "Pick one to continue.",
  quizIncomplete: "You've got unanswered questions. Scroll up to find them.",
  genericRequired: "This field is required.",
} as const;

// ─── NAVIGATION & UI LABELS ──────────────────────────────
export const nav = {
  quizButton: "Take the Quiz",
  homeLink: "SkillShield",
  backToResults: "Back to my results",
  nextQuestion: "Next",
  previousQuestion: "Back",
  submitQuiz: "See my score",
  skipForNow: "Maybe later",
  learnMore: "Learn more",
  viewBreakdown: "See full breakdown",
  startOver: "Retake the quiz",
} as const;

// ─── ACCESSIBILITY / SCREEN READER TEXT ──────────────────
export const a11y = {
  scoreAnnouncement: (score: number) =>
    `Your AI Career Risk Score is ${score} out of 100.`,
  progressAnnouncement: (current: number, total: number) =>
    `Question ${current} of ${total}.`,
  loadingAnnouncement: "Your score is being calculated. Please wait.",
  errorAnnouncement: "An error occurred. Please check the message on screen.",
  chartLabel: "Task-by-task risk breakdown chart",
  skillChartLabel: "Skills ranked by protection value",
} as const;
