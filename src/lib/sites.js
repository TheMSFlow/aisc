// Where the other ecosystem site lives. Local links to local, live to live
// (founder, 2026-11-22): under `npm run dev` a link to Intelligence opens the
// Intelligence dev server, so local testing never lands on production. Any
// build (preview or production) links to the live site. NODE_ENV is fixed at
// build time on the server and in the browser alike, so the two always agree.
export const IS_DEV = process.env.NODE_ENV === "development";

export const INTELLIGENCE_URL = IS_DEV
  ? "http://localhost:3001"
  : "https://intelligence.michaelsteve.com";

// Where the site reads Intelligence's public API. Local reads local; any
// build reads NEXT_PUBLIC_API_BASE, as before (founder, 2026-11-22).
export const INTELLIGENCE_API_BASE = IS_DEV
  ? INTELLIGENCE_URL
  : process.env.NEXT_PUBLIC_API_BASE;
