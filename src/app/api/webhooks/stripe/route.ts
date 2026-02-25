import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Stripe Webhook Handler
 *
 * Receives events from Stripe and processes them.
 * Security: Validates webhook signature before processing.
 *
 * Setup:
 *   1. In Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   2. URL: https://skillshield.dev/api/webhooks/stripe
 *   3. Events to listen for: checkout.session.completed, customer.subscription.updated,
 *      customer.subscription.deleted
 *   4. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET env var
 *
 * Local dev:
 *   stripe listen --forward-to localhost:3000/api/webhooks/stripe
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Process the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: Fulfill the purchase — unlock premium quiz access, etc.
        console.log(`Checkout completed: ${session.id}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Update user's subscription status in KV
        console.log(`Subscription updated: ${subscription.id}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Revoke premium access in KV
        console.log(`Subscription deleted: ${subscription.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook handler error: ${message}`);
    // Return 200 anyway — don't make Stripe retry on our business logic errors
    // We'll catch these in error monitoring
  }

  // Always return 200 quickly to acknowledge receipt
  return NextResponse.json({ received: true });
}
