import { Metadata } from "next";
import { decodeResult } from "@/lib/scoring";
import ResultsView from "@/components/ResultsView";

interface ResultsPageProps {
  searchParams: Promise<{ r?: string }>;
}

export async function generateMetadata({
  searchParams,
}: ResultsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const encoded = params.r;

  if (!encoded) {
    return {
      title: "Your AI Career Risk Score — SkillShield",
      description: "Take the quiz to find out your AI Career Risk Score.",
    };
  }

  const decoded = decodeResult(encoded);
  const score = decoded?.score ?? 50;
  const headline =
    decoded?.headline ?? "Find out your AI Career Risk Score";

  const ogImageUrl = `/api/og?score=${score}&headline=${encodeURIComponent(
    headline
  )}`;

  return {
    title: `AI Risk Score: ${score}/100 — SkillShield`,
    description: headline,
    openGraph: {
      title: `My AI Career Risk Score: ${score}/100`,
      description: headline,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: "website",
      siteName: "SkillShield",
    },
    twitter: {
      card: "summary_large_image",
      title: `My AI Career Risk Score: ${score}/100`,
      description: headline,
      images: [ogImageUrl],
    },
  };
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  return <ResultsView encodedResult={params.r ?? null} />;
}
