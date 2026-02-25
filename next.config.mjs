/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance: compress responses
  compress: true,

  // Security + performance headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // Security headers
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        },
      ],
    },
    {
      // Cache static assets aggressively
      source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // OG images: cache at edge for 1 hour, stale-while-revalidate for 24h
      source: "/api/og(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
  ],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Reduce bundle size: only include what we need from packages
  experimental: {
    optimizePackageImports: ["stripe"],
  },
};

export default nextConfig;
