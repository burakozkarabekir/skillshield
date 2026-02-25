import { kv } from "@vercel/kv";

/**
 * Vercel KV helpers for SkillShield.
 *
 * Key schema:
 *   quiz:{skill}        → Quiz questions JSON
 *   score:{id}          → Score result JSON
 *   user:{userId}:scores → Set of score IDs for a user
 *
 * KV is backed by Upstash Redis. Free tier: 3K commands/day, 256MB storage.
 * That's ~100 quiz completions/day on free tier (each uses ~30 commands).
 * Pro tier ($25/mo): 150K commands/day — good until ~5K daily users.
 */

export { kv };

// Key helpers — centralize key patterns to avoid typos
export const keys = {
  quiz: (skill: string) => `quiz:${skill}` as const,
  score: (id: string) => `score:${id}` as const,
  userScores: (userId: string) => `user:${userId}:scores` as const,
};
