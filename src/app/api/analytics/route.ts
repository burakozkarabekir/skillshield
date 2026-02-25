import { NextResponse } from "next/server";

// Analytics ingestion endpoint
// In production, pipe this to your analytics service (Mixpanel, PostHog, etc.)

export async function POST(request: Request) {
  try {
    const event = await request.json();

    // Log for now — replace with your analytics service
    console.log("[Analytics Event]", JSON.stringify(event));

    // TODO: Forward to analytics service
    // await fetch('https://api.mixpanel.com/track', { ... })
    // await posthog.capture(event.event, event.properties)

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
