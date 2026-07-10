const ONE_YEAR_IN_SECONDS = 31_536_000;

const ONE_YEAR_CACHE_HEADERS = {
  "Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`,
  "CDN-Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}`,
  "Vercel-CDN-Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}`,
};

const immutablePublicAssets = [
  "/file.svg",
  "/favicon.ico",
  "/creative-events.6b550ad3.jpg",
  "/globe.svg",
  "/fiction-app.fabc46d2.jpg",
  "/next.svg",
  "/office.3ec3723e.jpg",
  "/test.jpg",
  "/software.9b0c52d5.jpg",
  "/The-Greatest-Showman.2e5c5068.png",
  "/vercel.svg",
  "/window.svg",
];

const oneYearCacheHeaders = Object.entries(ONE_YEAR_CACHE_HEADERS).map(
  ([key, value]) => ({
    key,
    value,
  }),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remote image URLs must be versioned when their content changes.
    minimumCacheTTL: ONE_YEAR_IN_SECONDS,
    remotePatterns: [
      {
        hostname: "img.icons8.com",
      },
      {
        hostname: "example.com",
      },
      {
        hostname: "cruip-tutorials.vercel.app",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  serverExternalPackages: ["@pyroscope/nodejs"],
  async headers() {
    return [
      ...["/", "/contact", "/images", "/projet", "/projet/:path*"].map(
        (source) => ({
          source,
          headers: oneYearCacheHeaders,
        }),
      ),
      ...immutablePublicAssets.map((source) => ({
        source,
        headers: oneYearCacheHeaders,
      })),
      {
        source: "/:path*",
        has: [{ type: "header", key: "next-action" }],
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0",
          },
          {
            key: "CDN-Cache-Control",
            value: "no-store",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
