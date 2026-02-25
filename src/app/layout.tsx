import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillShield — AI Career Risk Assessment",
  description:
    "Find out how at-risk your career is from AI automation. Get a research-backed score with actionable reskilling advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
