"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    trackEvent("page_view", { page: "waitlist" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    trackEvent("waitlist_signup", { source: "waitlist_page" });

    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "waitlist_page" }),
    }).catch(() => {});

    // Simulated position (replace with actual count from API)
    setPosition(Math.floor(Math.random() * 500) + 1200);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-xl mx-auto">
        {!submitted ? (
          <>
            <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-1.5 text-sm text-warning mb-8 fade-in-up">
              Launching March 2026
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4 fade-in-up fade-in-up-delay-1">
              AI is changing careers.
              <br />
              <span className="text-accent">Are you ready?</span>
            </h1>

            <p className="text-gray-400 mb-8 fade-in-up fade-in-up-delay-2">
              Be the first to get your AI Career Risk Score. Free assessment
              launching soon — join 2,400+ professionals on the waitlist.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3 fade-in-up fade-in-up-delay-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-card-bg border border-card-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Join the Waitlist
              </button>
              <p className="text-xs text-gray-600">
                No spam. Just a launch notification and your free score.
              </p>
            </form>

            {/* Social proof */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center fade-in-up fade-in-up-delay-4">
              <div>
                <div className="text-xl font-bold text-accent">2,400+</div>
                <div className="text-xs text-gray-500">On waitlist</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">24</div>
                <div className="text-xs text-gray-500">Job categories</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">Free</div>
                <div className="text-xs text-gray-500">Risk assessment</div>
              </div>
            </div>
          </>
        ) : (
          <div className="fade-in-up">
            <div className="text-5xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold mb-4">You&apos;re in!</h1>
            <p className="text-gray-400 mb-6">
              You&apos;re #{position} on the waitlist. We&apos;ll email you when
              SkillShield launches.
            </p>

            {/* Referral boost */}
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 mb-8">
              <h3 className="font-bold mb-2">Move up the waitlist</h3>
              <p className="text-sm text-gray-400 mb-4">
                Share with friends to get early access + premium features
              </p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3 text-center">
                  <div className="font-bold text-accent">3 refs</div>
                  <div className="text-xs text-gray-500">Early access</div>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <div className="font-bold text-accent">5 refs</div>
                  <div className="text-xs text-gray-500">Free trial</div>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <div className="font-bold text-accent">10 refs</div>
                  <div className="text-xs text-gray-500">Free month</div>
                </div>
              </div>
            </div>

            <Link
              href="/quiz"
              className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Take the Quiz Now (Beta)
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
