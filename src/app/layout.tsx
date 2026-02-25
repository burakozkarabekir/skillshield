import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillShield — AI Career Risk Score",
  description:
    "Find out how AI will affect your job. Take the free 3-minute quiz and get your personalized AI Career Risk Score with a task-by-task breakdown.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://skillshield.dev"
  ),
  openGraph: {
    title: "What's Your AI Career Risk Score?",
    description:
      "Take the free 3-minute quiz. Get your personalized score. Know exactly where you stand.",
    type: "website",
    siteName: "SkillShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's Your AI Career Risk Score?",
    description:
      "Take the free 3-minute quiz. Get your personalized score. Know exactly where you stand.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="border-b border-border px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight">
              SkillShield
            </a>
            <a
              href="/quiz"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
            >
              Take the Quiz
            </a>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-border px-6 py-12 mt-20">
          <div className="mx-auto max-w-5xl text-center text-sm text-muted">
            <p>
              Analysis based on O*NET task data, BLS projections, and AI
              capability benchmarks.
            </p>
            <p className="mt-2">
              Scores represent current AI capability overlap, not a prediction
              of job elimination.
            </p>
            <p className="mt-4 text-xs">
              &copy; {new Date().getFullYear()} SkillShield. All rights
              reserved.
            </p>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
