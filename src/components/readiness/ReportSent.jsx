"use client";

import { useCohort } from "@/context/CohortContext";
import { formatPricingDate } from "@/utils/cohortFormat";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";

// The success page, which is also the sales page for the challenge. The
// report is on its way; the leader's result is restated in two lines; the
// WhatsApp invite appears only for a leader who ticked the box (its link comes
// from intelligence, never from this site's code); then the bridge to Day 2,
// the four things the seven days deliver and the seats (the site's own Value
// and Pricing sections, passed in from the page as `sales`).
//
// The Awakening block shows only once THE_AWAKENING_WHATSAPP_INVITE_URL is set
// on this site (read on the server by app/ai-readiness/page.js and passed in as
// `awakeningInviteUrl`), so it never points at a link that does not exist yet.
// Everyone who attends The Awakening joins its WhatsApp group first (founder,
// 2026-10-25), so the button is the group's invite link.

function AwakeningDate() {
  const { openCohort } = useCohort();
  if (!openCohort?.start_date) return null;
  // The Awakening runs on the Monday before the cohort's Thursday start.
  const monday = new Date(new Date(openCohort.start_date).getTime() - 3 * 24 * 60 * 60 * 1000);
  return (
    <p className="mt-2 text-sm text-dark-blue/60">
      The next one is on{" "}
      <span className="font-medium text-dark-blue/80">{formatPricingDate(monday)}</span>.
    </p>
  );
}

export default function ReportSent({ result, onRestart, sales, awakeningInviteUrl }) {
  const { email, strongest, start, inviteUrl } = result;

  return (
    <>
      <section className="w-full bg-dark-blue px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="text-balance font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your report is on its way.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            We sent it to {email}. It holds every rating, your six scores and your first moves.
            If it is not in your inbox in a few minutes, check your spam folder.
          </p>

          <dl className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-x-4">
              <dt className="text-sm text-white/50 sm:w-32">Strongest</dt>
              <dd className="font-ptsans text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                {strongest.name}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-x-4">
              <dt className="text-sm text-white/50 sm:w-32">Start here</dt>
              <dd className="font-ptsans text-3xl font-bold uppercase tracking-tight text-lilac sm:text-4xl">
                {start.name}
              </dd>
            </div>
          </dl>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75">
            Your first move: {start.firstMove}
          </p>

          {inviteUrl && (
            <div className="mt-12 max-w-2xl rounded-2xl bg-white px-6 py-7 sm:px-8">
              <p className="font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue">
                Your invite to the private WhatsApp community
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-dark-blue/65">
                You asked to join leaders who are planning to adopt AI in the next 30 days. Each
                request to join is approved by hand, so it may take a little while. The same invite
                is in your email.
              </p>
              <div className="mt-5">
                <Button href={inviteUrl} variant="dark" className="w-fit px-8 py-3">
                  Join the community
                </Button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="mt-12 cursor-pointer text-sm text-white/50 underline-offset-2 hover:text-white hover:underline"
          >
            Take the check again
          </button>
        </div>
      </section>

      <Section spacing="compact" className="pt-16 md:pt-24">
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl">
          Do this live, on your own situation.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-blue/70">
          On Day 2 of the AI Stakeholder Challenge you take this further, live: your six scores read
          against your own work, three moves for the week, and a one-page look at the data your work
          runs on. Nothing goes into an AI tool. It is one of four live sessions across seven days.
        </p>
      </Section>

      {sales}

      {awakeningInviteUrl && (
        <Section spacing="compact">
          <div className="max-w-3xl rounded-2xl bg-lilac px-6 py-8 sm:px-10">
            <h2 className="font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-3xl">
              Not ready to choose a seat? Start with The Awakening.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-dark-blue/70">
              A free live session, every month, on the Monday before each new cohort begins. The
              session link and everything else you need are shared in its WhatsApp group.
            </p>
            <AwakeningDate />
            <div className="mt-6">
              <Button href={awakeningInviteUrl} variant="dark" className="w-fit px-8 py-3">
                Join the WhatsApp group
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
