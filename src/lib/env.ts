import { z } from "zod";

/**
 * Server-side environment variables schema.
 * These are validated at build time and will throw if missing.
 */
const serverEnvSchema = z.object({
  // Vercel KV (auto-injected when you link a KV store in Vercel dashboard)
  KV_REST_API_URL: z.string().url(),
  KV_REST_API_TOKEN: z.string().min(1),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),

  // Resend (optional — email features degrade gracefully without it)
  RESEND_API_KEY: z.string().startsWith("re_").optional(),

  // App
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * Client-side environment variables schema.
 * Only NEXT_PUBLIC_ vars are accessible in the browser.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
});

/**
 * Validate and export server env vars.
 * Call this in server-side code only (API routes, server components, middleware).
 */
export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "Missing server environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Missing required server environment variables");
  }
  return parsed.data;
}

/**
 * Validate and export client env vars.
 * Safe to call anywhere — only exposes NEXT_PUBLIC_ vars.
 */
export function getClientEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
  if (!parsed.success) {
    console.error(
      "Missing client environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Missing required client environment variables");
  }
  return parsed.data;
}
