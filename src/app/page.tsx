"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-shield-900/20 via-gray-950 to-gray-950" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Logo / Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-shield-700/30 bg-shield-900/20 px-4 py-1.5 text-sm text-shield-300">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          Free 2-minute career assessment
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
          How safe is your career{" "}
          <span className="bg-gradient-to-r from-shield-400 to-shield-200 bg-clip-text text-transparent">
            from AI?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mb-8 text-lg text-gray-400 sm:text-xl">
          Get your AI Career Risk Score in under 2 minutes.
          <br className="hidden sm:block" /> Find out which skills to protect — and which
          to build next.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/quiz")}
          className="group relative inline-flex items-center gap-2 rounded-2xl bg-shield-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-shield-600/25 transition-all duration-200 hover:bg-shield-500 hover:shadow-xl hover:shadow-shield-500/30"
        >
          Take the Quiz
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>

        {/* Social proof */}
        <p className="mt-6 text-sm text-gray-500">
          Join 10,000+ professionals who&apos;ve assessed their AI career risk
        </p>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-800/50 pt-8">
          <div>
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-xs text-gray-500">Quick questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">&lt; 2 min</div>
            <div className="text-xs text-gray-500">To complete</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-gray-500">Free assessment</div>
          </div>
        </div>
      </div>
    </div>
  );
}
