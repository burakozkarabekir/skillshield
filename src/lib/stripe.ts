import Stripe from "stripe";

/**
 * Lazy-initialized singleton Stripe client.
 * Only creates the instance when first accessed (at runtime, not build time).
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}
