"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { QuizResult, RISK_LEVELS } from "@/types/quiz";
import ScoreGauge from "@/components/ScoreGauge";
import SkillBar from "@/components/SkillBar";
import ShareButton from "@/components/ShareButton";

export default function ResultsPage() {
  const params = useParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    // Try to load from localStorage
    const stored = localStorage.getItem(`quiz_result_${id}`);
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      // Fallback: try latest result
      const latest = localStorage.getItem("quiz_result_latest");
      if (latest) {
        setResult(JSON.parse(latest));
      }
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400">
          Calculating your score...
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Result not found</h1>
          <p className="text-slate-400 mb-6">
            This result may have expired or the link is invalid.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric-dark text-white font-medium rounded-xl transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </main>
    );
  }

  const riskConfig = RISK_LEVELS[result.riskLevel];

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="glass border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="SkillShield home">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-electric to-electric-light flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="font-semibold">SkillShield</span>
          </Link>
          <ShareButton
            resultId={result.id}
            score={result.overallScore}
            jobTitle={result.jobTitle}
          />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10">
        {/* Score Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-slate-400 mb-1">Your AI Career Risk Score</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">
            {result.jobTitle}
          </h1>

          <ScoreGauge score={result.overallScore} size="lg" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="mt-6"
          >
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
                result.riskLevel === "low"
                  ? "bg-emerald/10 text-emerald border border-emerald/20"
                  : result.riskLevel === "moderate"
                  ? "bg-electric/10 text-electric border border-electric/20"
                  : result.riskLevel === "high"
                  ? "bg-amber/10 text-amber border border-amber/20"
                  : "bg-danger/10 text-danger border border-danger/20"
              }`}
            >
              {result.riskLevel === "critical" && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              )}
              {riskConfig.label}
            </span>
          </motion.div>
        </motion.section>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <p className="text-slate-300 leading-relaxed">{result.summary}</p>
        </motion.section>

        {/* Skill Breakdown */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Skill Breakdown
          </h2>
          <div className="space-y-3">
            {result.skills
              .sort((a, b) => b.score - a.score)
              .map((skill, index) => (
                <SkillBar key={skill.category} skill={skill} index={index} />
              ))}
          </div>
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Recommendations
          </h2>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 flex gap-3"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-electric/10 text-electric flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Premium CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-purple-500/10 to-electric/5" />
            <div className="absolute inset-0 glass" />
            <div className="relative p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber/10 text-amber text-xs font-medium border border-amber/20 mb-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                Premium
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Get your 90-day AI-proof plan
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mb-6 max-w-md">
                Personalized weekly action items, curated learning resources, and
                skill-building exercises tailored to your specific risk profile.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Personalized 90-day skill development roadmap",
                  "Weekly action items delivered to your inbox",
                  "AI tool recommendations for your specific role",
                  "Quarterly score reassessment",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <svg className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-electric hover:bg-electric-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-electric/25 hover:shadow-electric/40">
                Unlock Premium — $19
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Share CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.5 }}
          className="text-center pb-12"
        >
          <p className="text-slate-400 text-sm mb-4">
            Share your score and see how you compare
          </p>
          <div className="flex justify-center">
            <ShareButton
              resultId={result.id}
              score={result.overallScore}
              jobTitle={result.jobTitle}
            />
          </div>
          <div className="mt-8">
            <Link
              href="/quiz"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Retake the quiz
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
