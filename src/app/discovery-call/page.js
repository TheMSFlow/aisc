import DiscoveryCallRedirect from "@/components/discovery-call/DiscoveryCallRedirect";

const TITLE = "Book a 1:1 Discovery Call | AI Stakeholder Challenge";
const DESCRIPTION =
  "Thirty minutes with Michael Steve on the AI Stakeholder Challenge delivered privately, one-on-one, and scheduled around your calendar.";

// This page exists so the VVIP call is shared under our own domain (founder,
// 2026-11-02). A bare Cal.com link previews with Cal.com's card; this one
// carries the founder's artwork, GA counts every visit, and the booking URL
// lives in one place (BOOKING_URL in the component) if it ever changes.
const OG_IMAGE = {
  url: "/discovery-call/og.jpg",
  width: 1200,
  height: 627,
  alt: "Book a 1:1 Discovery Call with Michael Steve",
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/discovery-call",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/discovery-call",
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

export default function DiscoveryCallPage() {
  return <DiscoveryCallRedirect />;
}
