import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog/posts";
import { formatDate } from "@/lib/blog/format";
import { getTheme } from "@/lib/blog/taxonomy";

function FooterLink({ href, children, external = false, newTab = false }) {
  const className =
    "relative inline-block text-sm font-light text-lilac/70 transition-colors hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-msaccent after:transition-[width] after:duration-200 hover:after:w-full";
  return (
    <li>
      {external || newTab ? (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}

export default function Footer() {
  const briefings = getAllPosts().slice(0, 3);

  return (
    <footer>
      {/* Zone 1 — Briefings, in daylight. Starts on the FAQ's tone, fades
          vertically to lilac: a single 180° descent, no lateral tints. */}
      <div className="relative overflow-hidden bg-linear-to-b from-offwhite to-[#e9eaff]">
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
                The Awakening
              </p>
              <p className="mt-2 font-ptsans text-2xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-3xl">
                Briefings for the AI era
              </p>
            </div>
            <Link
              href="/awakening"
              className="group inline-flex items-center gap-2 rounded-full border border-dark-blue/15 bg-white px-5 py-2.5 text-sm text-dark-blue shadow-sm transition-colors hover:border-dark-blue hover:bg-dark-blue hover:text-white"
            >
              View all briefings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {briefings.map((post, i) => (
              <Link
                key={post.slug}
                href={`/awakening/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,3,76,0.08),0_16px_40px_rgba(0,3,76,0.14)]"
              >
                <div className="h-44 w-full overflow-hidden border-b border-dark-blue/5">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
                    <span className="font-bold text-msblue">0{i + 1}</span>
                    {"  /  "}
                    {getTheme(post.theme)?.shortLabel}
                  </p>
                  <p className="font-ptsans text-lg font-bold uppercase leading-tight tracking-tight text-dark-blue">
                    {post.title}
                  </p>
                  <p className="mt-auto border-t border-dark-blue/10 pt-4 text-[11px] font-light uppercase tracking-[0.2em] text-dark-blue/40">
                    {formatDate(post.date)} &middot; {post.readingTime} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* The horizon — where day meets night */}
      <div className="h-0.5 bg-[linear-gradient(90deg,#6368da,#e9eaff,#860471)]" />

      {/* Zone 2 — The dark close */}
      <div className="relative overflow-hidden bg-dark-blue text-white">
        <div className="pointer-events-none absolute -top-36 left-[8%] h-115 w-190 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.2),transparent_60%)]" />
        <div className="pointer-events-none absolute -top-28 right-[2%] h-95 w-145 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.14),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Brand + link columns */}
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <img src="/aisc.svg" alt="AISC" className="h-7 w-auto" />
              {/* <p className="mt-3 font-ptsans text-lg tracking-wider text-white/60">
                AI STAKEHOLDER CHALLENGE
              </p> */}
              <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-lilac/60">
                The AI Stakeholder Challenge is a 7-day community based
                engagement for leaders who want to move from passive AI
                awareness to active, deliberate AI leadership.
              </p>
              <p className="mt-5 text-sm font-light text-lilac/60">
                For inquiries,{" "}
                <a
                  href="https://intelligence.michaelsteve.com/form/inquiry?src=AISC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block text-lilac/70 transition-colors hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-msaccent after:transition-[width] after:duration-200 hover:after:w-full"
                >
                  contact us
                </a>
              </p>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Program
              </p>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/#curriculum">Curriculum</FooterLink>
                <FooterLink href="/#pricing">Pricing</FooterLink>
                <FooterLink href="/#faq">FAQ</FooterLink>
                <FooterLink href="/#coaching">Coaching</FooterLink>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Explore
              </p>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/awakening">The Awakening</FooterLink>
                <FooterLink href="/personalize">Find your path</FooterLink>
                <FooterLink href="/ai-apprentice" newTab>
                  Career Apprentice
                </FooterLink>
                <FooterLink href="https://aiclarityforchiefs.com" external>
                  AI Clarity for Chiefs
                </FooterLink>
              </ul>
            </div>
          </div>

          {/* Legal */}
          <p className="mt-14 border-t border-white/10 pt-6 text-xs text-lilac/50">
            <a
              href="https://michaelsteve.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              © {new Date().getFullYear()} Michael Steve Clarity Studio. All
              rights reserved.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
