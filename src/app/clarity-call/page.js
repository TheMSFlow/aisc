import ClarityCallRedirect from "@/components/clarity-call/ClarityCallRedirect";

const TITLE = "Book a 1:1 Clarity Call | AI Stakeholder Challenge";
const DESCRIPTION =
  "Twenty minutes with Michael Steve on the AI Stakeholder Challenge delivered privately, one-on-one, and scheduled around your calendar.";

// This page exists so the VVIP call is shared under our own domain (founder,
// 2026-11-02). A bare Cal.com link previews with Cal.com's card; this one
// carries the founder's artwork, GA counts every visit, and the booking URL
// lives in one place (BOOKING_URL in the component) if it ever changes.
const OG_IMAGE = {
  url: "/clarity-call/og.jpg",
  width: 1200,
  height: 627,
  alt: "Book a 1:1 Clarity Call with Michael Steve",
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/clarity-call",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/clarity-call",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  // A hop, not a landing page.
  robots: {
    index: false,
    follow: true,
  },
};

export default function ClarityCallPage() {
  return <ClarityCallRedirect />;
}
