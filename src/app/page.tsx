"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const SOCIAL_PROOF_NUMBERS = [
  "127,403",
  "127,418",
  "127,441",
  "127,467",
  "127,489",
];

export default function HomePage() {
  const [proofIndex, setProofIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackEvent("page_view", { page: "home" });

    const interval = setInterval(() => {
      setProofIndex((i) => (i + 1) % SOCIAL_PROOF_NUMBERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </div>
        <Link
          href="/quiz"
          className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
        >
          Take the Quiz
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-card-border rounded-full px-4 py-1.5 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            {mounted && (
              <span>
                <strong>{SOCIAL_PROOF_NUMBERS[proofIndex]}</strong> scores
                generated
              </span>
            )}
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 fade-in-up fade-in-up-delay-1">
          Is AI Coming for{" "}
          <span className="text-accent">Your Job?</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 fade-in-up fade-in-up-delay-2">
          Get your personalized AI Career Risk Score in 2 minutes. Understand
          your vulnerability, discover your strengths, and get a plan to
          stay ahead.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center fade-in-up fade-in-up-delay-3">
          <Link
            href="/quiz"
            className="pulse-share bg-accent hover:bg-accent-hover text-white text-lg font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-accent/25"
          >
            Get Your Free Score →
          </Link>
          <span className="text-sm text-gray-500">
            Free · 2 minutes · No signup required
          </span>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center fade-in-up fade-in-up-delay-4">
          <div>
            <div className="text-2xl font-bold text-accent">24</div>
            <div className="text-sm text-gray-500">Job categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">5</div>
            <div className="text-sm text-gray-500">Risk factors analyzed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">90-day</div>
            <div className="text-sm text-gray-500">Reskilling roadmap</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 border-t border-card-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Take the 2-Min Quiz",
                desc: "Answer questions about your role, tasks, and AI adoption",
              },
              {
                step: "2",
                title: "Get Your Risk Score",
                desc: "See your 0-100 score with detailed factor breakdown",
              },
              {
                step: "3",
                title: "Share & Compare",
                desc: "Share your score on LinkedIn and compare with peers",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-card-bg border border-card-border rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Don&apos;t wait until it&apos;s too late
          </h2>
          <p className="text-gray-400 mb-8">
            The professionals who act now will thrive. The ones who
            don&apos;t... won&apos;t.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-accent hover:bg-accent-hover text-white text-lg font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Get Your Free Score →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <div>
            <span className="text-accent font-bold">Skill</span>Shield ©{" "}
            {new Date().getFullYear()}
          </div>
          <div className="flex gap-6">
            <Link href="/waitlist" className="hover:text-white transition-colors">
              Waitlist
            </Link>
            <Link href="/jobs/software-engineer" className="hover:text-white transition-colors">
              Job Reports
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
