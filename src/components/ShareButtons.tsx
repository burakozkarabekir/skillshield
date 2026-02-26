"use client";

interface ShareButtonsProps {
  score: number;
  headline: string;
  url: string;
}

export default function ShareButtons({
  score,
  headline,
  url,
}: ShareButtonsProps) {
  const shareText = `Yapay Zeka Kariyer Risk Puanım ${score}/100. ${headline}\n\nSeninki kaç:`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(url)}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      const btn = document.getElementById("copy-btn");
      if (btn) {
        btn.textContent = "Kopyalandı!";
        setTimeout(() => {
          btn.textContent = "Linki Kopyala";
        }, 2000);
      }
    } catch {
      // Fallback for older browsers
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-sm font-medium text-gray-400">
        Sonucunu paylaş
      </p>
      <div className="flex gap-3">
        {/* Twitter/X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Paylaş
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004182]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Paylaş
        </a>

        {/* Copy Link */}
        <button
          id="copy-btn"
          onClick={copyToClipboard}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
        >
          Linki Kopyala
        </button>
      </div>
    </div>
  );
}
