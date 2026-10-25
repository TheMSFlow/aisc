import Link from "next/link";

// The AI Readiness Check policy, linked from the gate at /ai-readiness. Source:
// program/AI_READINESS_CHECK_POLICY.md. It covers the free check only (founder,
// 2026-10-25: "this is ai readiness policy and it should be under a policy
// page as in 'policy/ai-readiness-check'").
//
// The two values below were proposed in the draft and are the founder's to
// confirm. Site pages show no raw email address, so requests go through the
// intelligence inquiry form.
const LAST_UPDATED = "25 October 2026";
const REPLY_WITHIN = "30 days";
const CONTACT_URL = "https://intelligence.michaelsteve.com/form/inquiry?src=AISC";

export const metadata = {
  title: "AI Readiness Check Policy | AI Stakeholder Challenge",
  description:
    "What we collect when you take the free AI readiness check, why we collect it, who handles it, and what you can do about it.",
  alternates: { canonical: "/policy/ai-readiness-check" },
};

function Heading({ children }) {
  return (
    <h2 className="mt-14 font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-3xl">
      {children}
    </h2>
  );
}

function P({ children }) {
  return <p className="mt-4 text-base leading-relaxed text-dark-blue/75">{children}</p>;
}

function List({ children }) {
  return (
    <ul className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-base leading-relaxed text-dark-blue/75 marker:text-msaccent">
      {children}
    </ul>
  );
}

function B({ children }) {
  return <strong className="font-semibold text-dark-blue">{children}</strong>;
}

export default function AiReadinessCheckPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-offwhite">
      <div className="px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="font-ptsans text-lg tracking-wide text-dark-blue sm:text-xl">
          AI STAKEHOLDER <span className="font-bold">CHALLENGE</span>
        </Link>
      </div>

      <article className="w-full px-5 pb-24 pt-10 sm:px-6 md:pt-16 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="text-balance font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl">
            AI Readiness Check policy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-dark-blue/70">
            <B>Michael Steve Clarity Studio</B>{" "}(&ldquo;we&rdquo;) runs aistakeholderchallenge.com
            and the AI Stakeholder Challenge. This policy explains what we collect when you take our
            free AI readiness check, why, and what you can do about it.
          </p>

          <Heading>What we collect</Heading>
          <P>When you take the free AI readiness check, we collect:</P>
          <List>
            <li>
              <B>Your first name and email address.</B>
            </li>
            <li>
              <B>Your answers and your scores</B>: how you rated the 24 statements, your six scores,
              your strongest dimension and where you chose to start.
            </li>
            <li>
              <B>What you asked for</B>: whether you asked to join our private WhatsApp community,
              whether you asked us to email you later, the exact words of each box you ticked, and
              when.
            </li>
            <li>
              <B>Where you came from</B>: the link or social post that brought you, the website
              that sent you, and the country your connection is in.
            </li>
            <li>
              <B>A scrambled (hashed) form of your internet address</B>, used only to stop the form
              being misused.
            </li>
          </List>
          <P>
            We do <B>not</B> keep the notes you write beside a statement. They go into your own
            report and nowhere else.
          </P>

          <Heading>Why we collect it</Heading>
          <List>
            <li>
              <B>To send you your report.</B> Your report is built from your answers and sent to
              your email.
            </li>
            <li>
              <B>To send you the invite to our private WhatsApp community</B>, if you ticked the
              box that asks for it.
            </li>
            <li>
              <B>To send you practical notes on AI and news of our programs</B>, only if you ticked
              the box that asks for them. You can stop them at any time.
            </li>
            <li>
              <B>To improve the check and our programs</B>, by looking at results across everyone
              who takes it.
            </li>
          </List>
          <P>
            If you leave the email box unticked, we use your email for your report and nothing else.
            Your report is the same either way.
          </P>

          <Heading>The private WhatsApp community</Heading>
          <P>
            If you ask to join, we show you the invite on the page and include it in your report
            email. Joining is your choice, and you join through WhatsApp yourself. We do not add your
            number.
          </P>
          <P>
            WhatsApp, a service run by Meta, runs the community under its own terms and privacy
            policy.
          </P>

          <Heading>Who else handles your data</Heading>
          <P>
            We use a small number of trusted services to run the check, and they handle your data
            only on our behalf:
          </P>
          <List>
            <li>
              <B>Resend</B>, which sends the email with your report.
            </li>
            <li>
              <B>Supabase</B>, which stores your answers and your choices.
            </li>
            <li>
              <B>Vercel</B>, which hosts our websites.
            </li>
          </List>
          <P>These services may store data outside your country, including in the United States.</P>
          <P>
            <B>We do not sell your data</B>, and we do not share it with anyone else for their own
            purposes.
          </P>

          <Heading>Your choices</Heading>
          <List>
            <li>
              <B>Ask to see, correct or delete your data</B>, by{" "}
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-msaccent underline underline-offset-2 hover:text-dark-blue"
              >
                sending us a message
              </a>
              . We will reply within {REPLY_WITHIN}.
            </li>
            <li>
              <B>Stop our notes and news</B> at any time. Every one we send carries a way to stop
              them.
            </li>
            <li>
              <B>Leave the WhatsApp community</B> at any time, from within WhatsApp.
            </li>
            <li>
              If you are unhappy with how we have handled your data, you may complain to the data
              protection authority where you live. In Nigeria, that is the Nigeria Data Protection
              Commission.
            </li>
          </List>

          <Heading>Changes to this policy</Heading>
          <P>
            If we change this policy, we will update the date below. The wording of each box you
            ticked is kept with your record, so a later change never alters what you asked for.
          </P>
          <p className="mt-10 border-t border-dark-blue/10 pt-6 text-sm text-dark-blue/50">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </article>
    </main>
  );
}
