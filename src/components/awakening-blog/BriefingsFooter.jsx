import Link from "next/link";
import ArticleCta from "./ArticleCta";
import { AUDIENCES } from "@/lib/blog/taxonomy";

function FooterLink({ href, children, external = false, newTab = false }) {
  const className =
    "relative inline-block text-sm text-lilac/70 transition-colors hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-msaccent after:transition-[width] after:duration-200 hover:after:w-full";
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

export default function BriefingsFooter() {
  return (
    <footer>
      {/* Zone 1 — light, white→lilac fade, carries the CTA card */}
      <div className="bg-linear-to-b from-offwhite to-[#e9eaff]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <ArticleCta className="" placement="briefings_footer" />
        </div>
      </div>

      {/* Horizon — day meets night */}
      <div className="h-0.5 bg-[linear-gradient(90deg,#6368da,#e9eaff,#860471)]" />

      {/* Zone 2 — dark close */}
      <div className="relative overflow-hidden bg-dark-blue text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[8%] h-115 w-190 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.16),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[2%] h-95 w-145 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.11),transparent_60%)]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Briefings by seat
              </p>
              <ul className="flex flex-col gap-2">
                {Object.values(AUDIENCES).map((audience) => (
                  <FooterLink
                    key={audience.id}
                    href={`/awakening/for/${audience.id}`}
                  >
                    For {audience.label}
                  </FooterLink>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                The challenge
              </p>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/">AISC</FooterLink>
                <FooterLink href="/#pricing">Pricing</FooterLink>
                <FooterLink href="/personalize">Find your path</FooterLink>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Explore
              </p>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/awakening">All briefings</FooterLink>
                <FooterLink href="/ai-apprentice" newTab>
                  Career Apprentice
                </FooterLink>
                <FooterLink href="https://aiclarityforchiefs.com" external>
                  AI Clarity for Chiefs
                </FooterLink>
              </ul>
            </div>
          </div>

          <p className="mt-12 text-xs text-lilac/50">
            <a
              href="https://michaelsteve.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              © {new Date().getFullYear()} Michael Steve Clarity Studio. All rights
              reserved.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
