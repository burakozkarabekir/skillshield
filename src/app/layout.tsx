import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SkillShield — AI Career Risk Score",
  description:
    "Discover how AI-proof your career really is. Take the free 2-minute quiz and get your personalized AI Career Risk Score.",
  keywords: [
    "AI career risk",
    "job automation",
    "career assessment",
    "AI-proof career",
    "future of work",
  ],
  openGraph: {
    title: "SkillShield — AI Career Risk Score",
    description:
      "How AI-proof is your career? Take the free quiz and find out.",
    type: "website",
    siteName: "SkillShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillShield — AI Career Risk Score",
    description:
      "How AI-proof is your career? Take the free quiz and find out.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-navy-900 text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
