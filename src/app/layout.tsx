import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillShield — How Safe Is Your Career From AI?",
  description:
    "Take the 2-minute quiz to get your AI Career Risk Score. Find out which of your skills are most at risk and get a personalized reskilling plan.",
  openGraph: {
    title: "SkillShield — How Safe Is Your Career From AI?",
    description:
      "Take the 2-minute quiz to get your AI Career Risk Score and find out if your job is at risk.",
    type: "website",
    siteName: "SkillShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillShield — How Safe Is Your Career From AI?",
    description:
      "Take the 2-minute quiz to get your AI Career Risk Score and find out if your job is at risk.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950">
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
