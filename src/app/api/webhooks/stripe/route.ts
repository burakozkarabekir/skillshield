import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { kv, keys } from "@/lib/kv";
import type { PremiumRecord } from "@/lib/kv";
import { sendPremiumConfirmationEmail } from "@/lib/email";

/**
 * Stripe Webhook Handler
 *
 * Receives events from Stripe and processes them.
 * Security: Validates webhook signature before processing.
 *
 * Setup:
 *   1. In Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   2. URL: https://skillshield.dev/api/webhooks/stripe
 *   3. Events to listen for: checkout.session.completed
 *   4. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET env var
 *
 * Local dev:
 *   stripe listen --forward-to localhost:3000/api/webhooks/stripe
 */

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
}

export async function POST(request: Request) {
  const stripe = getStripe();
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
        const email = session.customer_email;
        const scoreId = session.metadata?.scoreId;

        if (email) {
          // Save premium record to KV
          const premiumRecord: PremiumRecord = {
            email,
            scoreId: scoreId || undefined,
            stripeSessionId: session.id,
            purchasedAt: Date.now(),
          };
          await kv.set(keys.premium(email), premiumRecord);

          // Save Stripe customer mapping
          if (session.customer) {
            await kv.set(
              keys.stripeCustomer(email),
              session.customer as string
            );
          }

          // Send confirmation email
          await sendPremiumConfirmationEmail(email, scoreId);

          console.log(`[Webhook] Premium activated for ${email} (score: ${scoreId})`);
        } else {
          console.warn(`[Webhook] Checkout completed without email: ${session.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook handler error: ${message}`);
    // Return 200 anyway — don't make Stripe retry on our business logic errors
  }

  // Always return 200 quickly to acknowledge receipt
  return NextResponse.json({ received: true });
}
