import { kv } from "@vercel/kv";

/**
 * Vercel KV helpers for SkillShield.
 *
 * Key schema:
 *   quiz:{skill}                → Quiz questions JSON
 *   score:{id}                  → ScoringResult JSON (with scoreId)
 *   user:{userId}:scores        → Set of score IDs for a user
 *   premium:{email}             → PremiumRecord JSON
 *   waitlist:{email}            → WaitlistRecord JSON
 *   stripe:customer:{email}     → Stripe customer ID string
 *
 * KV is backed by Upstash Redis. Free tier: 3K commands/day, 256MB storage.
 * That's ~100 quiz completions/day on free tier (each uses ~30 commands).
 * Pro tier ($25/mo): 150K commands/day — good until ~5K daily users.
 */

export { kv };

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PremiumRecord {
  email: string;
  scoreId?: string;
  stripeSessionId: string;
  purchasedAt: number;
}

export interface WaitlistRecord {
  email: string;
  score?: number;
  category?: string;
  referralCode?: string;
  source: string;
  joinedAt: number;
}

// ─── Key helpers ────────────────────────────────────────────────────────────

export const keys = {
  quiz: (skill: string) => `quiz:${skill}` as const,
  score: (id: string) => `score:${id}` as const,
  userScores: (userId: string) => `user:${userId}:scores` as const,
  premium: (email: string) => `premium:${email.toLowerCase()}` as const,
  waitlist: (email: string) => `waitlist:${email.toLowerCase()}` as const,
  stripeCustomer: (email: string) => `stripe:customer:${email.toLowerCase()}` as const,
};
