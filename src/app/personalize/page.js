import Link from "next/link";
import PersonalizeFlow from "@/components/personalize/PersonalizeFlow";
import { EMAIL_OPT_IN_TEXT } from "@/lib/leads/optIns";

export const metadata = {
  title: "Find Your Path | AI Stakeholder Challenge",
  description:
    "A few honest answers about your seat, your world, and what brought you here. Then the path into the AI Stakeholder Challenge that fits, with the reasoning to back it.",
  alternates: { canonical: "/personalize" },
};

// The wording of the optional "email me later" box lives in intelligence, which
// stores the exact words with each lead (WORKING_RULES.md rule 29). Read on the
// server and refreshed hourly. If it cannot be read, the built-in copy in
// lib/leads/optIns.js is shown instead, so the box never disappears; a check
// in intelligence keeps the two copies word for word the same.
async function getEmailOptInText() {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/public/leads/opt-ins`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.emailOptInText === "string" ? data.emailOptInText : null;
  } catch {
    return null;
  }
}

export default async function PersonalizePage() {
  const emailOptInText = (await getEmailOptInText()) ?? EMAIL_OPT_IN_TEXT;

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
      <PersonalizeFlow emailOptInText={emailOptInText} />
    </main>
  );
}
