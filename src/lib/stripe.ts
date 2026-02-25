import Stripe from "stripe";

/**
 * Singleton Stripe client.
 * Import this instead of creating new Stripe instances.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});
