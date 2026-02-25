import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SkillShield - Verify Your Skills",
    template: "%s | SkillShield",
  },
  description:
    "Take skill assessments, earn verified scores, and share your results. Prove what you know.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://skillshield.dev"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SkillShield",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@skillshield",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
