import { B, ContactLink, Heading, Lead, List, P, PolicyPage } from "@/components/policy/PolicyText";
import { INTELLIGENCE_URL } from "@/lib/sites";

// The AI Stakeholder Office Sprint policy, linked from the request form at
// intelligence.michaelsteve.com/form/office-sprint (consent box) and the
// sprint's FAQ. Built on the AI Readiness Check policy (2026-11-22). It covers
// the request and, once a sprint runs, the staff's work.
const LAST_UPDATED = "22 November 2026";
const REPLY_WITHIN = "30 days";
// The general inquiry form, with no preset: ?src=OS would open an Office Sprint
// request, which is wrong for a data request (founder, 2026-11-22).
const CONTACT_URL = `${INTELLIGENCE_URL}/form/inquiry`;

export const metadata = {
  title: "Office Sprint Policy | AI Stakeholder Office Sprint",
  description:
    "What we collect when your organization applies for and takes the AI Stakeholder Office Sprint, why, who sees it, and what you can do about it.",
  alternates: { canonical: "/policy/office-sprint" },
};

export default function OfficeSprintPolicyPage() {
  return (
    <PolicyPage
      title="AI Stakeholder Office Sprint policy"
      lastUpdated={LAST_UPDATED}
      back={{ href: "/office-sprint", label: "Back to the AI Stakeholder Office Sprint" }}
    >
      <Lead>
        <B>Michael Steve Clarity Studio</B>{" "}(&ldquo;we&rdquo;) runs aistakeholderchallenge.com
        and the AI Stakeholder Office Sprint. This policy explains what we collect when an
        organization applies for the sprint and when its people take part, why, and what you can do
        about it.
      </Lead>

      <Heading>When you apply for a sprint</Heading>
      <P>We collect the following:</P>
      <List>
        <li>
          <B>Organization information</B>: its name, its industry and how many people would take
          part.
        </li>
        <li>
          <B>Contact person</B>: your name, your role, your work email and your phone number.
        </li>
        <li>
          <B>Sprint details</B>: your preferred week and slot, and any note you add.
        </li>
        <li>
          <B>Questionnaire answers</B>: what you tell us about your organization, its teams and its
          use of AI.
        </li>
        <li>
          <B>Discovery call recording</B>: a recording of your call, made with your OK.
        </li>
        <li>
          <B>Consent</B>: that you agreed to this policy, and when.
        </li>
      </List>
      <P>
        We use it to hold your discovery call, to set your week, and to run your sprint. You book
        the discovery call through Cal.com, which handles the booking under its own privacy policy.
        After the call we keep notes of what you told us about your organization&rsquo;s needs.
      </P>
      <P>
        We record the discovery call so we have an accurate account of what you told us, and we ask
        for your OK at the start. If you would rather not be recorded, tell us and we will take
        notes instead. The recording stays with us and is not shared with your people.
      </P>

      <Heading>When your people take part</Heading>
      <P>Each person who joins with your organization&rsquo;s code gives us the following:</P>
      <List>
        <li>
          <B>Personal details</B>: their name, email address, role, and department or team.
        </li>
        <li>
          <B>Sprint work</B>: the tasks they sort, their readiness answers and scores,
          their data audit, the problems they name and rank, and the AI policy they write and
          submit.
        </li>
        <li>
          <B>Attendance</B>: whether they joined each live sprint and finished each day&rsquo;s work.
        </li>
      </List>
      <P>
        The data audit asks what information the work runs on, where it is kept and who answers for
        it. It never asks for the information itself.
      </P>

      <Heading>Who sees what</Heading>
      <List>
        <li>
          <B>Each person</B>{" "}sees their own results.
        </li>
        <li>
          <B>Your organization</B>{" "}sees group totals only: never one person&rsquo;s answers or
          policy, and never a group of fewer than 5 people on its own. What people wrote is shown
          as themes and counts, never in their own words. It sees how many people have registered
          and how many finished each day&rsquo;s work, not who.
        </li>
        <li>
          <B>We</B>{" "}see each person&rsquo;s work, so we can build your organization&rsquo;s report.
        </li>
      </List>
      <P>
        Before the sprint, your organization agrees never to ask us for anyone&rsquo;s individual
        answers, and we will not give them. Before they start, your people see a sample of the
        report, so they know exactly what their leadership will see.
      </P>
      <P>
        For a paid sprint with fewer than 5 people, how each person&rsquo;s work is shared is
        agreed with all of them before it starts.
      </P>

      <Heading>How long we keep it</Heading>
      <P>
        We keep your data for as long as we need it to run your sprint and improve our programs, or
        until you ask us to delete it. Each person&rsquo;s own PDFs are theirs to keep.
      </P>

      <Heading>Why we collect it</Heading>
      <List>
        <li>
          <B>To run the sprint</B>: the live sprints, the guided tools and each person&rsquo;s PDFs.
        </li>
        <li>
          <B>To build your organization&rsquo;s report</B> for the advisory call.
        </li>
        <li>
          <B>To improve the sprint and our programs</B>, by looking at results across the
          organizations that take it. We never name your organization or your people when we do.
        </li>
      </List>

      <Heading>Who else handles your data</Heading>
      <P>
        We use a small number of trusted services to run the sprint, and they handle your data only
        on our behalf:
      </P>
      <List>
        <li>
          <B>Supabase</B>, which stores applications and your people&rsquo;s work.
        </li>
        <li>
          <B>Resend</B>, which sends our emails.
        </li>
        <li>
          <B>Vercel</B>, which hosts our websites.
        </li>
        <li>
          <B>The video call service</B> we use for the discovery call and the live sprints.
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
          If you are unhappy with how we have handled your data, you may complain to the data
          protection authority where you live. In Nigeria, that is the Nigeria Data Protection
          Commission.
        </li>
      </List>

      <Heading>Changes to this policy</Heading>
      <P>If we change this policy, we will update the date below.</P>
    </PolicyPage>
  );
}
