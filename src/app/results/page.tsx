"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ScoreGauge from "@/components/ScoreGauge";
import ShareButtons from "@/components/ShareButtons";
import ReferralTracker from "@/components/ReferralTracker";
import { trackEvent } from "@/lib/analytics";
import { generateReferralCode } from "@/lib/referral";
import type { RiskScore } from "@/lib/scoring";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<RiskScore | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    // Check if coming from a share link
    const sharedScore = searchParams.get("s");
    const sharedJob = searchParams.get("j");
    const sharedCategory = searchParams.get("c");
    const ref = searchParams.get("ref");

    if (ref) {
      trackEvent("referral_visit", { referralCode: ref });
    }

    if (sharedScore && sharedJob && sharedCategory) {
      // Visitor from shared link — show teaser, prompt to take quiz
      setResults({
        overall: parseInt(sharedScore),
        category: sharedCategory as RiskScore["category"],
        factors: [],
        strengths: [],
        vulnerabilities: [],
        headline: `${decodeURIComponent(sharedJob)}: ${sharedScore}/100 AI Risk`,
        shareText: "",
        timeframeYears: 5,
      });
      return;
    }

    // Load from session storage (just completed quiz)
    const stored = sessionStorage.getItem("ss_results");
    if (stored) {
      const parsed = JSON.parse(stored);
      setResults(parsed);
      trackEvent("score_view", {
        score: parsed.overall,
        category: parsed.category,
      });
    } else {
      router.push("/quiz");
    }

    // Generate or retrieve referral code
    let code = localStorage.getItem("ss_referral_code");
    if (!code) {
      code = generateReferralCode();
      localStorage.setItem("ss_referral_code", code);
    }
    setReferralCode(code);

    // Show email capture after 5 seconds
    const timer = setTimeout(() => setShowEmailCapture(true), 5000);
    return () => clearTimeout(timer);
  }, [router, searchParams]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    trackEvent("email_capture", {
      score: results?.overall ?? 0,
      category: results?.category ?? "",
    });

    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        score: results?.overall,
        category: results?.category,
        referralCode,
        source: "results_page",
      }),
    }).catch(() => {});

    setEmailSubmitted(true);
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isSharedView = searchParams.get("s") !== null;
  const glowClass = `glow-${results.category}`;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </Link>
        {isSharedView && (
          <Link
            href="/quiz"
            className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get YOUR Score
          </Link>
        )}
      </nav>

      <div className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full">
        {/* Score Card — THE viral asset */}
        <div className={`bg-card-bg border border-card-border rounded-2xl p-8 text-center mb-8 fade-in-up ${glowClass}`}>
          <h1 className="text-lg text-gray-400 mb-6">Your AI Career Risk Score</h1>

          <ScoreGauge score={results.overall} category={results.category} size={220} />

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">{results.headline}</h2>
            <p className="text-gray-400">
              {results.category === "critical" && "Your role faces significant AI disruption risk. Action needed now."}
              {results.category === "high" && "AI will meaningfully impact your role. Time to start adapting."}
              {results.category === "moderate" && "Some aspects of your role are at risk, but you have strengths to leverage."}
              {results.category === "low" && "Your role has strong defenses against AI automation. Stay sharp."}
            </p>
          </div>

          {results.timeframeYears > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-background rounded-lg px-4 py-2 text-sm">
              <span className="text-gray-500">Estimated impact timeline:</span>
              <span className="font-bold text-accent">{results.timeframeYears} years</span>
            </div>
          )}
        </div>

        {/* Shared view CTA */}
        {isSharedView && (
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 text-center mb-8 fade-in-up fade-in-up-delay-1">
            <h3 className="text-xl font-bold mb-2">
              Someone shared their score. What&apos;s yours?
            </h3>
            <p className="text-gray-400 mb-6">
              Take the free 2-minute quiz and find out your AI Career Risk Score.
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Take the Quiz Now →
            </Link>
          </div>
        )}

        {/* Factor Breakdown */}
        {!isSharedView && results.factors.length > 0 && (
          <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8 fade-in-up fade-in-up-delay-1">
            <h3 className="text-lg font-bold mb-6">Risk Factor Breakdown</h3>
            <div className="space-y-4">
              {results.factors.map((factor) => (
                <div key={factor.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{factor.name}</span>
                    <span className="font-mono text-accent">{factor.score}/100</span>
                  </div>
                  <div className="h-2 bg-card-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${factor.score}%`,
                        backgroundColor:
                          factor.score >= 75 ? "#ef4444"
                          : factor.score >= 50 ? "#f59e0b"
                          : factor.score >= 30 ? "#6366f1"
                          : "#22c55e",
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strengths & Vulnerabilities */}
        {!isSharedView && (results.strengths.length > 0 || results.vulnerabilities.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-8 fade-in-up fade-in-up-delay-2">
            {results.strengths.length > 0 && (
              <div className="bg-card-bg border border-success/30 rounded-2xl p-6">
                <h3 className="font-bold text-success mb-3">Your Strengths</h3>
                <ul className="space-y-2">
                  {results.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-success mt-0.5">+</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {results.vulnerabilities.length > 0 && (
              <div className="bg-card-bg border border-danger/30 rounded-2xl p-6">
                <h3 className="font-bold text-danger mb-3">Vulnerabilities</h3>
                <ul className="space-y-2">
                  {results.vulnerabilities.map((v, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-danger mt-0.5">!</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Share Section — THE growth engine */}
        {!isSharedView && (
          <div className="flex flex-col items-center text-center mb-8 fade-in-up fade-in-up-delay-3">
            <h3 className="text-xl font-bold mb-2">Share Your Score</h3>
            <p className="text-sm text-gray-400 mb-6">
              Challenge your network — what&apos;s their AI risk?
            </p>
            <ShareButtons
              score={results.overall}
              category={results.category}
              jobTitle={results.headline.split(":")[0]}
              shareText={results.shareText}
              referralCode={referralCode}
            />
          </div>
        )}

        {/* Referral Tracker */}
        {!isSharedView && referralCode && (
          <div className="flex justify-center mb-8 fade-in-up fade-in-up-delay-4">
            <ReferralTracker referralCount={0} referralCode={referralCode} />
          </div>
        )}

        {/* Premium upsell */}
        {!isSharedView && (
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-2xl p-8 text-center mb-8">
            <div className="text-xs uppercase tracking-wider text-accent mb-2">Premium</div>
            <h3 className="text-xl font-bold mb-2">Get Your 90-Day Reskilling Roadmap</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Personalized action plan based on your exact score, role, and risk factors.
              Weekly milestones. Specific courses and skills to learn.
            </p>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => trackEvent("premium_cta_click", { score: results.overall })}
                className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Get My Roadmap — $9/month
              </button>
              <span className="text-xs text-gray-500">Cancel anytime · 7-day free trial</span>
            </div>
          </div>
        )}

        {/* Email capture (delayed pop-up) */}
        {showEmailCapture && !emailSubmitted && !isSharedView && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-card-bg border border-card-border rounded-2xl p-8 max-w-md w-full fade-in-up">
              <h3 className="text-xl font-bold mb-2">Save Your Score</h3>
              <p className="text-sm text-gray-400 mb-6">
                Get your full report emailed to you, plus weekly AI career insights.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Email My Report
                </button>
              </form>
              <button
                onClick={() => setShowEmailCapture(false)}
                className="w-full text-sm text-gray-500 hover:text-gray-300 mt-3 transition-colors"
              >
                No thanks, I&apos;ll remember my score
              </button>
            </div>
          </div>
        )}

        {emailSubmitted && (
          <div className="bg-success/10 border border-success/30 rounded-xl p-4 text-center text-sm text-success mb-8">
            Check your inbox! Your full report is on its way.
          </div>
        )}
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
