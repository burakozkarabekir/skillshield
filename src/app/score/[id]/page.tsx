import Link from "next/link";
import type { Metadata } from "next";

// Dynamic score page with OG metadata for shared links
// When someone shares their score, this page generates the right OG tags
// so the preview card shows their exact score on LinkedIn/Twitter

interface ScorePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ s?: string; j?: string; c?: string; ref?: string }>;
}

export async function generateMetadata({ searchParams }: ScorePageProps): Promise<Metadata> {
  const { s, j, c } = await searchParams;
  const score = s || "50";
  const jobTitle = j ? decodeURIComponent(j) : "Professional";
  const category = c || "moderate";

  const ogImageUrl = `/api/og?score=${score}&job=${encodeURIComponent(jobTitle)}&category=${category}`;

  return {
    title: `${jobTitle}: ${score}/100 AI Risk Score | SkillShield`,
    description: `${jobTitle} scored ${score}/100 on the AI Career Risk Assessment. Find out YOUR score in 2 minutes.`,
    openGraph: {
      title: `${jobTitle} AI Risk: ${score}/100 — What's yours?`,
      description: `This ${jobTitle} scored ${score}/100 on the AI Career Risk Assessment. Take the free 2-minute quiz.`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${jobTitle} AI Risk Score: ${score}/100`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${jobTitle} AI Risk: ${score}/100`,
      description: `Take the free 2-min assessment. What's YOUR AI Career Risk Score?`,
      images: [ogImageUrl],
    },
  };
}

export default async function ScorePage({ searchParams }: ScorePageProps) {
  const { s, j, c, ref } = await searchParams;
  const score = s || "50";
  const jobTitle = j ? decodeURIComponent(j) : "Professional";
  const category = c || "moderate";

  const categoryColor = category === "critical" ? "text-danger"
    : category === "high" ? "text-warning"
    : category === "moderate" ? "text-accent"
    : "text-success";

  // Build quiz link with referral tracking
  const quizLink = ref ? `/quiz?ref=${ref}` : "/quiz";

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Skill</span>Shield
        </Link>
        <Link
          href={quizLink}
          className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
        >
          Get YOUR Score
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-2xl mx-auto">
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 mb-8 w-full">
          <p className="text-sm text-gray-500 mb-4">Someone&apos;s AI Career Risk Score</p>

          <div className={`text-6xl font-bold ${categoryColor} mb-2`}>
            {score}<span className="text-2xl text-gray-500">/100</span>
          </div>

          <h1 className="text-xl font-bold mb-2">{jobTitle}</h1>
          <p className="text-gray-400">
            {category === "critical" && "Critical AI disruption risk"}
            {category === "high" && "High AI disruption risk"}
            {category === "moderate" && "Moderate AI disruption risk"}
            {category === "low" && "Low AI disruption risk"}
          </p>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 w-full">
          <h2 className="text-2xl font-bold mb-2">What&apos;s YOUR score?</h2>
          <p className="text-gray-400 mb-6">
            Take the free 2-minute AI Career Risk Assessment and find out how safe your job really is.
          </p>
          <Link
            href={quizLink}
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Take the Quiz →
          </Link>
          <p className="text-xs text-gray-500 mt-3">Free · 2 minutes · No signup required</p>
        </div>
      </div>
    </main>
  );
}
