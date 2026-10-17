import ApprenticeHero from "@/components/aica/ApprenticeHero";
import ApprenticeProgramme from "@/components/aica/ApprenticeProgramme";

const TITLE = "AI Career Apprentice | Michael Steve";
const DESCRIPTION =
  "Five days that end with your own website online, then 26 weeks of mentorship, an AI-optimised CV and portfolio, and a certificate when you graduate. A paid apprenticeship follows for those who go further.";

// Set here rather than as an `opengraph-image` file so the art stays with the
// rest of the page's assets in public/aica/. Without this the page inherits the
// generated AISC card from src/app/opengraph-image.js, which is the wrong offer.
const OG_IMAGE = {
  url: "/aica/og-image_ai_career_apprentice.jpg",
  width: 1200,
  height: 630,
  alt: "AI Career Apprentice, a programme by Michael Steve",
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/ai-apprentice",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ai-apprentice",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

// Standalone page: no site header, no logo bar, no footer, no blog chrome.
// It is strictly the AI Career Apprentice.
export default function AICareerApprentice() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ApprenticeHero />
      <ApprenticeProgramme />
    </main>
  );
}
