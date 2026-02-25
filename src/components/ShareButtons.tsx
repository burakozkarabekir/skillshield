"use client";

import { useState } from "react";
import { buildLinkedInShareUrl, buildTwitterShareUrl, buildShareUrl } from "@/lib/referral";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonsProps {
  score: number;
  category: string;
  jobTitle: string;
  shareText: string;
  referralCode?: string;
}

export default function ShareButtons({
  score,
  category,
  jobTitle,
  shareText,
  referralCode,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://skillshield.ai";

  const shareUrl = buildShareUrl(baseUrl, {
    score,
    jobTitle,
    category,
    ref: referralCode,
    utm_source: "share",
    utm_medium: "social",
  });

  const handleLinkedIn = () => {
    trackEvent("share_click_linkedin", { score, jobTitle, category });
    const url = buildLinkedInShareUrl(shareText, shareUrl);
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleTwitter = () => {
    trackEvent("share_click_twitter", { score, jobTitle, category });
    const url = buildTwitterShareUrl(shareText, shareUrl);
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleCopyLink = async () => {
    trackEvent("share_click_copy", { score, jobTitle, category });
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = `${shareText}\n\n${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {/* LinkedIn — PRIMARY CTA (this is the growth engine) */}
      <button
        onClick={handleLinkedIn}
        className="pulse-share flex items-center justify-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        Share on LinkedIn
      </button>

      {/* Twitter/X */}
      <button
        onClick={handleTwitter}
        className="flex items-center justify-center gap-3 bg-card-bg hover:bg-card-border border border-card-border text-white font-semibold py-3 px-6 rounded-xl transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        Share on X
      </button>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-3 bg-card-bg hover:bg-card-border border border-card-border text-gray-400 hover:text-white py-3 px-6 rounded-xl transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
            </svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
