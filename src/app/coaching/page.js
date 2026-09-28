import Footer from "@/components/layout/Footer";
import CoachingHeader from "@/components/coaching/CoachingHeader";
import CoachingHero from "@/components/coaching/CoachingHero";
import CoachingJourney from "@/components/coaching/CoachingJourney";
import CoachingChallenge from "@/components/coaching/CoachingChallenge";
import CoachingTrack from "@/components/coaching/CoachingTrack";
import CoachingRhythm from "@/components/coaching/CoachingRhythm";
import CoachingGroup from "@/components/coaching/CoachingGroup";
import CoachingPlans from "@/components/coaching/CoachingPlans";
import CoachingFAQ from "@/components/coaching/CoachingFAQ";

const TITLE = "AI Stakeholder Coaching | Michael Steve";
const DESCRIPTION =
  "Live group coaching through your 6-Month AI Stakeholder Roadmap. It opens with the AI Stakeholder Challenge delivered privately, then three Saturday sessions a month with a facilitator and leaders executing their own.";

// Named explicitly: declaring an `openGraph` block replaces the parent's, so
// the generated card in ./opengraph-image.js is pointed at here.
const OG_IMAGE = {
  url: "/coaching/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AI Stakeholder Coaching | You declare your AI territory in seven days. Coaching is where it gets built.",
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/coaching",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/coaching",
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

export default function CoachingPage() {
  return (
    <>
      <CoachingHeader />
      <main>
        <CoachingHero />
        <CoachingJourney />
        <CoachingChallenge />
        <CoachingTrack />
        <CoachingRhythm />
        <CoachingGroup />
        <CoachingPlans />
        <CoachingFAQ />
      </main>
      <Footer showBriefings={false} />
    </>
  );
}
