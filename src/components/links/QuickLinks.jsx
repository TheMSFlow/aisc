"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share, Check, ChevronRight } from "lucide-react";

import { useCohort } from "@/context/CohortContext";
import { formatCohortDates } from "@/utils/cohortFormat";
import { trackEvent } from "@/lib/analytics";
import CurrencyPrice from "@/components/global/CurrencyPrice";
import { PRICING } from "@/lib/pricing";

const SITE_URL = "https://aistakeholderchallenge.com";

// Only the payment links leave the domain, so they are the only ones that
// carry UTMs. Tagging the internal links would split the GA session.
const CHECKOUT_URL =
  "https://intelligence.michaelsteve.com/pay/challenge/aisc" +
  "?utm_source=links&utm_medium=bio&utm_campaign=aisc_register";
const BRIEFING_URL =
  "https://intelligence.michaelsteve.com/pay/vip" +
  "?utm_source=links&utm_medium=bio&utm_campaign=awakening_briefing";

// Order is the founder's (2026-11-02), with the studio now focused on AISC
// and on VVIP seats in particular: the VVIP clarity call leads; the free
// readiness check comes next, as the free step before the paid ones; the AISC
// explainer and its checkout link sit adjacent so "decide" and "act" read as
// one unit; the paid Awakening briefing follows; AICA closes, for the
// graduates and young professionals this page is not mainly for.
//
// Copy note: no em-dashes, and no "Register"/"Sign up" as CTA language. Both
// are hard rules in agent-guides/COPY_GUIDE.md.
const links = [
  {
    id: "vvip_call",
    badge: "Private 1:1",
    headline: "AI Stakeholder Challenge, VVIP",
    persona:
      "You are the one people turn to for the AI answer, and your calendar does not wait for a cohort. VVIP is the full seven days delivered to you alone, with the facilitator beside you throughout. On the call we confirm it fits and set your start date.",
    highlights: ["Starts when you choose", "Facilitator with you all 7 days"],
    cta: "Book Your 20-Minute Call",
    // Our own hop to Cal.com, not the Cal.com link itself: see
    // app/clarity-call/page.js.
    href: "/clarity-call",
    external: false,
    // The founder's artwork, 1440x450. The artwork is the button's promise
    // ("Book A 1:1 Clarity Call"), so the card's headline names the offer.
    image: {
      src: "/clarity-call/banner.jpg",
      alt: "Book a 1:1 Clarity Call with Michael Steve",
      aspect: "aspect-[1440/450]",
    },
    // Balanced across business, government and faith; managers and team
    // leads added by the founder, 2026-11-02.
    tags: [
      "CEOs and Founders",
      "Managers",
      "Team Leads",
      "Public Office",
      "Faith Leaders",
    ],
  },
  {
    id: "readiness",
    badge: "Free Check",
    headline: "The AI Readiness Check",
    // The change it makes, not how it works (founder, 2026-11-02).
    persona:
      "Most leaders only guess whether they are ready for AI. Ten minutes from now, you stop guessing: you know where you already stand strong, and exactly where to start.",
    cta: "Take the Free Check",
    href: "/ai-readiness",
    external: false,
    // The six dimensions, in the check's own order.
    tags: [
      "Strategy",
      "Data Governance",
      "Talent",
      "Processes",
      "Impact Evaluation",
      "Collaboration",
    ],
  },
  {
    id: "aisc",
    badge: "Flagship Programme",
    headline: "AI Stakeholder Challenge",
    // Speaks to Emerging Leaders too (founder, 2026-11-02): their
    // organization is already looking for someone AI fluent.
    persona:
      "If you set the direction, you are the one people turn to for the AI answer. If you are still rising, your organization is already looking for someone who knows how to use AI well. Why not you? Seven days is what it takes.",
    cta: "See the Full Programme",
    href: "/",
    external: false,
    tags: ["Chiefs", "Leaders of Leaders", "Emerging Leaders"],
  },
  {
    // `register` survives as a code identifier only. The reader never sees it:
    // COPY_GUIDE bans it as CTA language, canonical replacements are
    // "Claim your seat" and "Secure Your Spot".
    id: "register",
    badge: "Next Cohort",
    headline: "Claim Your Seat",
    // The four outcomes as things a leader can picture holding, from the
    // FAQ's "What do I actually leave with", not the four pillar names
    // (founder, 2026-11-02).
    persona:
      "The next cohort is open. Seven days from your first session, you hold an honest picture of what AI means for your world, six scores that show where to begin, one problem in your world where AI can pay off, claimed as yours, and your own written rules for using AI.",
    cta: "Secure Your Spot",
    href: CHECKOUT_URL,
    external: true,
    showCohort: true,
    // No VVIP: VVIP always runs as its own private cohort (founder,
    // 2026-11-02), so it is not a seat in this one.
    tags: ["General Admission", "VIP"],
  },
  {
    // The paid briefing replaced the link to the briefings blog on
    // 2026-11-02 (founder). No price here: the briefing's fee is shared on
    // the page, never quoted in copy (lib/personalize/catalog.js).
    id: "briefing",
    badge: "Paid Private Briefing",
    headline: "The Awakening",
    subline: "A private AI leadership briefing",
    persona:
      "One focused session on the leadership shift AI has started, for you alone or for the leaders around you. Book one seat, or a block for your team.",
    // The founder, 2026-11-02: the card has to say it is paid and booked.
    // Still no figure (see above). The order is the real flow on /pay/vip:
    // pay for the seats, then book the time in Calendly.
    highlights: [
      "Paid by the seat",
      "Book your seats, then choose your time",
    ],
    cta: "Book a Private Briefing",
    href: BRIEFING_URL,
    external: true,
    tags: ["Executives", "Leadership Teams", "Communities"],
  },
  {
    id: "aica",
    // Drawn under its own divider: the one card here not for leaders.
    section: "For Graduates and Young Professionals",
    badge: "CSR Initiative",
    headline: "AI Career Apprentice [Cohort BETA]",
    // Diagnosis then promise, drawn from the founder's LinkedIn post of
    // 2026-09: the hiring criteria moved, most graduates have not moved with
    // them. The promise is the skill set, not the artifacts. A certificate,
    // a portfolio and a placement are where the skill shows up; they are not
    // what makes anyone hireable. Second half is Sprint 2's own language from
    // ApprenticeProgramme.jsx.
    persona:
      "The way employers search for talent has changed. They now want responsibility, social capital, initiative and, since 2025, AI fluency. Most graduates have not readjusted. Here, you readjust: real AI fluency you can put to work rather than talk about, the skill to solve your ideal employer's problems with AI, and the judgment to read any room, find where the value sits, and start delivering without being told how.",
    // Founder, 2026-11-02: a CSR initiative, free for a limited time and
    // starting soon, and they apply to hear when it opens. The "100 seats"
    // line is gone. "Apply", not "Register": COPY_GUIDE bans the latter.
    highlights: [
      "Free for a limited time",
      "Starting soon. Apply now to get updates.",
    ],
    cta: "See the Programme and Apply",
    href: "/ai-apprentice",
    external: false,
    // A standard card since 2026-11-02, so no artwork: the banner belongs to
    // the hero alone.
    tags: ["Graduates", "Corps Members", "Young Professionals"],
  },
];

function absoluteUrl(href) {
  if (/^https?:\/\//.test(href)) return href;
  if (typeof window !== "undefined") return window.location.origin + href;
  return SITE_URL + href;
}

function ShareButton({ href, title, className = "bg-white/60 hover:bg-white" }) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleShare(e) {
    e.preventDefault();
    e.stopPropagation();

    const url = absoluteUrl(href);
    trackEvent("link_share", { placement: "links", destination: title });

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        if (err.name !== "AbortError") copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label={`Share: ${title}`}
      className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-dark-blue/20 ${className} transition-colors duration-150 cursor-alias`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Share className="w-4 h-4 text-dark-blue/50" />
      )}
    </button>
  );
}

// One wrapper so every card is measured the same way, while internal links
// stay client-side navigations and only the payment link opens out.
function CardShell({ link, className, children }) {
  const onClick = () =>
    trackEvent("cta_click", { placement: "links", destination: link.id });

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={link.href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

// Live next-cohort line on the register card. Renders nothing until the cohort
// API answers, so the card never flashes a wrong date.
function CohortLine() {
  const { openCohort, loading } = useCohort();
  if (loading || !openCohort?.start_date) return null;

  // `end_date` is day 3, the last of the Thursday-to-Saturday block. The
  // challenge closes on day 7, so the reader must see `final_date` or the
  // 7-day programme advertises itself as a 3-day one. Same shaping as
  // cohort/CohortDateBlock.jsx.
  const { dateRange } = formatCohortDates({
    ...openCohort,
    end_date: openCohort.final_date ?? openCohort.end_date,
  });
  return (
    <p className="text-xs font-inter font-semibold text-msaccent">
      Next cohort: {dateRange}
    </p>
  );
}

// The hero is a light card on purpose. Its artwork (the VVIP call banner since
// 2026-11-02) is already deep blue, so a blue card behind it reads as one flat
// block; lilac is the palette's own light surface and lets the art carry the
// colour.
// Everything inside therefore runs on dark-blue ink, not white.
function HeroCard({ link }) {
  return (
    <CardShell
      link={link}
      className="block group relative overflow-hidden rounded-2xl bg-lilac text-dark-blue transition-colors duration-150 hover:bg-lilac-hover"
    >
      {link.image && (
        <div
          className={`relative w-full overflow-hidden ${link.image.aspect}`}
        >
          <Image
            src={link.image.src}
            alt={link.image.alt}
            fill
            priority
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative z-10 p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-msaccent">
              {link.badge}
            </span>
            <h2 className="text-2xl font-ptsans font-bold leading-tight text-dark-blue">
              {link.headline}
            </h2>
          </div>
          <ShareButton href={link.href} title={link.headline} />
        </div>

        <p className="text-sm font-inter font-light text-dark-blue/75 leading-relaxed border-l-2 border-msaccent/40 pl-3">
          {link.persona}
        </p>

        {/* The loud element on the page. Solid `warning` is the palette's
            urgency colour and it is spent here, on the offer and the real
            constraint behind it, so it does not compete with anything else on
            the card. Both pills share the one colour deliberately: they read as
            a single statement (free, but limited) rather than two claims. */}
        {link.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {link.highlights.map((highlight) => (
              <div
                key={highlight}
                className="bg-warning rounded-lg px-3 py-2 inline-block"
              >
                <span className="text-xs font-semibold text-white">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {link.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-wide uppercase bg-white/70 text-dark-blue/55 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dark-blue/10">
          <span className="text-sm font-semibold text-dark-blue">
            {link.cta}
          </span>
          <ChevronRight className="w-5 h-5 text-dark-blue/40 group-hover:translate-x-1 transition-transform duration-150" />
        </div>
      </div>
    </CardShell>
  );
}

function StandardCard({ link }) {
  return (
    <CardShell
      link={link}
      className="block group rounded-2xl border border-dark-blue/15 bg-white hover:border-dark-blue/30 hover:shadow-sm transition-all duration-150 overflow-hidden"
    >
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-msaccent">
              {link.badge}
            </span>
            <h2 className="text-lg font-ptsans font-bold text-dark-blue leading-snug">
              {link.headline}
            </h2>
            {link.subline && (
              <p className="text-xs font-inter font-light text-dark-blue/50">
                {link.subline}
              </p>
            )}
          </div>
          <ShareButton
            href={link.href}
            title={link.headline}
            className="bg-white/60 hover:bg-lilac/50"
          />
        </div>

        <p className="text-sm font-inter font-light text-dark-blue/70 leading-relaxed">
          {link.persona}
        </p>

        {/* Quieter than the hero's warning pills: that colour is spent on the
            hero. */}
        {link.highlights?.length > 0 && (
          <div className="bg-lilac rounded-lg px-3 py-2 space-y-0.5">
            {link.highlights.map((highlight) => (
              <p
                key={highlight}
                className="text-xs font-semibold text-msaccent"
              >
                {highlight}
              </p>
            ))}
          </div>
        )}

        {link.showCohort && (
          <div className="bg-lilac rounded-lg px-3 py-2 space-y-0.5">
            <p className="text-xs font-semibold text-msaccent">
              General Admission from{" "}
              <CurrencyPrice {...PRICING.generalAdmission} />
            </p>
            <CohortLine />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-dark-blue/10">
          <div className="flex flex-wrap gap-1.5">
            {link.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-wide uppercase bg-dark-blue/5 text-dark-blue/50 rounded-full px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <ChevronRight className="w-4 h-4 text-dark-blue/30 shrink-0 group-hover:translate-x-1 transition-transform duration-150" />
        </div>
      </div>
    </CardShell>
  );
}

// `strong` marks a change of audience, not just of offer, so it reads as a
// real break: more air above, a darker rule and an accent label.
function Divider({ label, strong = false }) {
  const rule = strong ? "bg-msaccent/30" : "bg-dark-blue/10";
  return (
    <div className={`flex items-center gap-3 ${strong ? "pt-6" : ""}`}>
      <div className={`flex-1 h-px ${rule}`} />
      <span
        className={`text-[10px] font-semibold tracking-[0.2em] uppercase text-center ${
          strong ? "text-msaccent" : "text-dark-blue/30"
        }`}
      >
        {label}
      </span>
      <div className={`flex-1 h-px ${rule}`} />
    </div>
  );
}

export default function QuickLinks() {
  const [hero, ...rest] = links;
  const leaders = rest.filter((link) => !link.section);
  const sectioned = rest.filter((link) => link.section);

  return (
    <div className="min-h-dvh bg-white/95">
      <div className="max-w-md mx-auto px-4 py-10 pb-16 space-y-8">
        {/* AISC branding: the page is on aistakeholderchallenge.com, so it
            carries the wordmark from layout/Header.jsx and the canonical meta
            tagline, not the studio's identity. */}
        <header className="text-center flex flex-col gap-2 items-center justify-center pt-2">
          <Image
            src="/aisc_favicon.svg"
            height={56}
            width={56}
            alt="AI Stakeholder Challenge"
          />
          <h1 className="font-ptsans text-xl tracking-wide text-dark-blue">
            AI STAKEHOLDER <span className="font-bold">CHALLENGE</span>
          </h1>
          <p className="text-sm font-inter font-light text-dark-blue/60">
            From Passive AI Awareness to AI Leader
          </p>
        </header>

        <HeroCard link={hero} />

        <Divider label="More Opportunities" />

        <div className="space-y-3">
          {leaders.map((link) => (
            <StandardCard key={link.id} link={link} />
          ))}
        </div>

        {/* Cards with a `section` sit after the leader cards, each under its
            own divider, so a leader can see where their part of the page ends. */}
        {sectioned.map((link) => (
          <div key={link.id} className="space-y-8">
            <Divider label={link.section} strong />
            <StandardCard link={link} />
          </div>
        ))}

        {/* Legal line only, matching layout/Footer.jsx. The studio is the
            copyright holder, not the branding on this page. */}
        <footer className="text-center pt-4">
          <a
            href="https://michaelsteve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.15em] uppercase text-dark-blue/40 font-inter"
          >
            © {new Date().getFullYear()} Michael Steve Clarity Studio
          </a>
        </footer>
      </div>
    </div>
  );
}
