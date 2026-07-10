export const ONE_YEAR_IN_SECONDS = 31_536_000;

// Cache immutable site payloads for one year in browsers and on shared CDNs.
// When content changes, a deploy or URL/version change must bust the cache.
export const ONE_YEAR_CACHE_HEADERS = {
  "Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`,
  "CDN-Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}`,
  "Vercel-CDN-Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}`,
} as const;

export const NO_STORE_CACHE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
} as const;
