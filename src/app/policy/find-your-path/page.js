import { B, ContactLink, Heading, Lead, List, P, PolicyPage } from "@/components/policy/PolicyText";

// The Find your path policy, linked from the email form on the /personalize
// results screen. Source: program/FIND_YOUR_PATH_POLICY.md. Same shape as the
// AI Readiness Check policy, without the WhatsApp and retention sections.
// Site pages show no raw email address, so requests go through the
// intelligence inquiry form.
const LAST_UPDATED = "25 October 2026";
const REPLY_WITHIN = "30 days";
const CONTACT_URL = "https://intelligence.michaelsteve.com/form/inquiry?src=AISC";

export const metadata = {
  title: "Find Your Path Policy | AI Stakeholder Challenge",
  description:
    "What we collect when you use Find your path, why we collect it, who handles it, and what you can do about it.",
  alternates: { canonical: "/policy/find-your-path" },
};

export default function FindYourPathPolicyPage() {
  return (
    <PolicyPage title="Find your path policy" lastUpdated={LAST_UPDATED}>
      <Lead>
        <B>Michael Steve Clarity Studio</B>{" "}(&ldquo;we&rdquo;) runs aistakeholderchallenge.com and
        the AI Stakeholder Challenge. This policy explains what we collect when you use Find your
        path, the questions that recommend a way into the challenge, why, and what you can do about
        it.
      </Lead>

      <Heading>What we collect</Heading>
      <P>
        <B>When you finish the questions</B>, whether or not you ask for the email, we keep:
      </P>
      <List>
        <li>
          <B>Your answers</B>: your seat, your currency, and what you typed in answer to the
          questions.
        </li>
        <li>
          <B>The recommendation</B> you were shown.
        </li>
        <li>
          <B>A scrambled (hashed) form of your internet address and the kind of browser you
          used</B>, used only to stop the page being misused.
        </li>
      </List>
      <P>
        <B>If you ask us to email you the recommendation</B>, we also keep:
      </P>
      <List>
        <li>
          <B>Your first name and email address.</B>
        </li>
        <li>
          <B>Whether you asked us to email you later</B>, the exact words of the box you ticked, and
          when.
        </li>
        <li>
          <B>Where you came from</B>: the link or social post that brought you, the website that
          sent you, and the country your connection is in.
        </li>
      </List>

      <Heading>Why we collect it</Heading>
      <List>
        <li>
          <B>To write your recommendation.</B> Your answers are used to choose and explain the way
          into the challenge that fits you.
        </li>
        <li>
          <B>To send you your recommendation</B>, if you ask for it.
        </li>
        <li>
          <B>To send you practical notes on AI and news of our programs</B>, only if you ticked the
          box that asks for them. You can stop them at any time.
        </li>
        <li>
          <B>To improve Find your path and our programs</B>, by looking at answers across everyone
          who uses it.
        </li>
      </List>
      <P>
        If you leave the email box unticked, we use your email to send your recommendation and
        nothing else.
      </P>

      <Heading>Who else handles your data</Heading>
      <P>
        We use a small number of trusted services, and they handle your data only on our behalf:
      </P>
      <List>
        <li>
          <B>Anthropic</B>, whose AI (Claude) writes your recommendation from your answers.
        </li>
        <li>
          <B>Resend</B>, which sends the email with your recommendation.
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
          <ContactLink href={CONTACT_URL}>sending us a message</ContactLink>. We will reply within{" "}
          {REPLY_WITHIN}.
        </li>
        <li>
          <B>Stop our notes and news</B> at any time. Every one we send carries a way to stop them.
        </li>
        <li>
          If you are unhappy with how we have handled your data, you may complain to the data
          protection authority where you live. In Nigeria, that is the Nigeria Data Protection
          Commission.
        </li>
      </List>

      <Heading>Changes to this policy</Heading>
      <P>
        If we change this policy, we will update the date below. The wording of the box you ticked
        is kept with your record, so a later change never alters what you asked for.
      </P>
    </PolicyPage>
  );
}
