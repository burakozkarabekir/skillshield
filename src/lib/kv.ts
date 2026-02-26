import { kv } from "@vercel/kv";

/**
 * Vercel KV helpers for AdaptAI.
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
  lastReminderSent?: number;
}

export interface EmailScoreEntry {
  scoreId: string;
  overallScore: number;
  jobCategoryId?: string;
  createdAt: number;
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
  emailScores: (email: string) => `email:scores:${email.toLowerCase()}` as const,
};

// ─── Email-Score Association Helpers ─────────────────────────────────────────

export async function addEmailScoreAssociation(
  email: string,
  entry: EmailScoreEntry
): Promise<void> {
  const key = keys.emailScores(email);
  const existing = await kv.get<EmailScoreEntry[]>(key);
  const entries = existing ?? [];
  entries.push(entry);
  await kv.set(key, entries);
}

export async function getEmailScores(
  email: string
): Promise<EmailScoreEntry[]> {
  const key = keys.emailScores(email);
  return (await kv.get<EmailScoreEntry[]>(key)) ?? [];
}
