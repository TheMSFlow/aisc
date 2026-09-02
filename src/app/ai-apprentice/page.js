import ApprenticeHero from "@/components/aica/ApprenticeHero";
import ApprenticeProgramme from "@/components/aica/ApprenticeProgramme";

const TITLE = "AI Career Apprentice | Michael Steve";
const DESCRIPTION =
  "Sprint 1 is five free days that end with your own website online, built for recruiters and employers to visit. Mentorship and a paid apprenticeship follow for those who go further.";

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
