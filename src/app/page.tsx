import Link from "next/link";
import type { Metadata } from "next";
import HeroAnimation from "@/components/HeroAnimation";

export const metadata: Metadata = {
  title: "SkillShield — How AI-Proof Is Your Career?",
  description:
    "Get your free AI Career Risk Score. Take the 2-minute quiz to discover how vulnerable your job is to AI automation — and what to do about it.",
};

const SOCIAL_PROOF = [
  { stat: "47,000+", label: "Assessments taken" },
  { stat: "2 min", label: "Average completion" },
  { stat: "94%", label: "Found it accurate" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "AI Risk Score",
    description: "Get a precise 0-100 score showing how likely AI is to automate your current role.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "6-Dimension Analysis",
    description: "Understand your strengths across creativity, technical depth, leadership, and more.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Actionable Insights",
    description: "Get personalized recommendations to future-proof your career against AI disruption.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="SkillShield home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-electric-light flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">SkillShield</span>
          </Link>
          <Link
            href="/quiz"
            className="px-4 py-2 text-sm font-medium bg-electric/10 text-electric border border-electric/20 rounded-lg hover:bg-electric/20 transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric/10 border border-electric/20 text-electric text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric" />
            </span>
            Free 2-minute career assessment
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            How <span className="gradient-text">AI-proof</span> is
            <br />
            your career?
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get your personalized AI Career Risk Score. Discover which of your
            skills are most vulnerable to automation — and exactly what to do
            about it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/quiz"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric hover:bg-electric-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-electric/25 hover:shadow-electric/40 text-lg"
            >
              Get Your Score
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <span className="text-sm text-slate-500">No signup required</span>
          </div>

          {/* Hero animation */}
          <HeroAnimation />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8">
            {SOCIAL_PROOF.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold font-mono gradient-text">
                  {item.stat}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Your complete AI readiness assessment
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-lg mx-auto">
            Based on research into AI capabilities and labor market trends
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-electric/10 text-electric flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to find out?
            </h2>
            <p className="text-slate-400 mb-8">
              Join thousands of professionals who&apos;ve already discovered their
              AI Career Risk Score. It takes less than 2 minutes.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric hover:bg-electric-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-electric/25 hover:shadow-electric/40 text-lg"
            >
              Start Free Assessment
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-electric to-electric-light flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            SkillShield
          </div>
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} SkillShield. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
