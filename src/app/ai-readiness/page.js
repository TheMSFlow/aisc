import Link from "next/link";
import Value from "@/components/sections/Value";
import Pricing from "@/components/sections/Pricing";
import ReadinessCheck from "@/components/readiness/ReadinessCheck";

// The free AI readiness check. A public version of the Learning Center's Day 2
// Readiness Scorecard: first name and email first, the 24 statements, six
// scores and no total, and the report emailed by intelligence. This site stores
// and sends nothing itself. Scope: aisc/program/AI_READINESS_PUBLIC_SCOPE.md.

export const metadata = {
  title: "Free AI Readiness Check | AI Stakeholder Challenge",
  description:
    "Twenty-four plain statements about your own work. Six scores side by side, no total, and your report by email. See where you stand on AI in about ten minutes.",
  alternates: { canonical: "/ai-readiness" },
};

// The statements live in intelligence, so the wording has one home. Read on
// the server and refreshed hourly; if this read fails, the check asks again
// from the browser.
async function getScorecard() {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/public/aisc/readiness/scorecard`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data?.dimensions) ? data : null;
  } catch {
    return null;
  }
}

export default async function AiReadinessPage() {
  const scorecard = await getScorecard();
  // The Awakening's WhatsApp group: everyone who attends joins it first. Read
  // here on the server because the name has no NEXT_PUBLIC_ prefix. It is a
  // public join link, unlike the readiness community's, which intelligence
  // sends only to those who tick the box.
  const awakeningInviteUrl = process.env.THE_AWAKENING_WHATSAPP_INVITE_URL || null;

  return (
    <main className="flex min-h-screen flex-col bg-offwhite">
      <div className="px-5 py-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-ptsans text-lg tracking-wide text-dark-blue sm:text-xl"
        >
          AI STAKEHOLDER <span className="font-bold">CHALLENGE</span>
        </Link>
      </div>
      {/* The success page is also the sales page: the site's own Value and
          Pricing sections, rendered here on the server and shown by the check
          once the report has been sent. No site footer and no briefings on the
          readiness pages (founder, 2026-10-25). */}
      <ReadinessCheck
        initialScorecard={scorecard}
        sales={
          <>
            <Value />
            <Pricing />
          </>
        }
        awakeningInviteUrl={awakeningInviteUrl}
      />
    </main>
  );
}
