import QuickLinks from "@/components/links/QuickLinks";

const TITLE = "Links | AI Stakeholder Challenge";
const DESCRIPTION =
  "The AI Career Apprentice, the AI Stakeholder Challenge, the next open cohort, and The Awakening briefings. Every way in, in one place.";

// The share card stays the generated AISC one from src/app/opengraph-image.js
// The AI Career Apprentice artwork lives inside the hero card instead, so
// sharing this URL previews the site it actually lands on. It has to be named
// explicitly: declaring an `openGraph` block replaces the parent's entirely,
// and a file-based image is not merged back in.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AI Stakeholder Challenge | From AI Consumer to AI Leader",
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/links",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  // A link-in-bio surface, not a landing page. Kept out of search so it never
  // outranks /ai-apprentice, /awakening, or the homepage for their own terms.
  robots: {
    index: false,
    follow: true,
  },
};

export default function LinksPage() {
  return <QuickLinks />;
}
