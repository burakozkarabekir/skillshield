import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * POST /api/checkout — Create a Stripe Checkout session for AdaptAI Pro.
 *
 * Body: { scoreId?: string, email?: string }
 * Returns: { url: string } — Stripe hosted checkout URL
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scoreId, email } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const successUrl = scoreId
      ? `${appUrl}/premium/success?scoreId=${scoreId}&session_id={CHECKOUT_SESSION_ID}`
      : `${appUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = scoreId
      ? `${appUrl}/premium?scoreId=${scoreId}`
      : `${appUrl}/premium`;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "try",
      line_items: [
        {
          price_data: {
            currency: "try",
            unit_amount: 14900, // 149.00 TL
            product_data: {
              name: "AdaptAI Pro — Detaylı Kariyer Raporu",
              description:
                "Detaylı skor raporu, kişiselleştirilmiş öneri planı ve PDF kariyer raporu",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      metadata: {
        scoreId: scoreId || "",
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout session creation failed";
    console.error("[Checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
