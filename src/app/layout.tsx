import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillShield — AI Career Risk Score | How Safe Is Your Job?",
  description:
    "Get your free AI Career Risk Score in 2 minutes. Find out how likely AI is to impact your job and what you can do about it.",
  keywords: ["AI job risk", "career risk score", "AI automation", "job safety", "AI career impact", "reskilling"],
  openGraph: {
    title: "SkillShield — What's Your AI Career Risk Score?",
    description: "Take the free 2-minute assessment. Find out if AI is coming for your job — and what to do about it.",
    type: "website",
    siteName: "SkillShield",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SkillShield AI Career Risk Score",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillShield — What's Your AI Career Risk Score?",
    description: "Take the free 2-minute assessment. Find out if AI is coming for your job.",
    images: ["/og-default.png"],
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
        {children}
      </body>
    </html>
  );
}
