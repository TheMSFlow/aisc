"use client";

import { usePathname } from "next/navigation";
import { Gauge, Sparkles } from "lucide-react";
import Button from "../global/Button";
import { trackEvent } from "@/lib/analytics";

// The `src` tag the free readiness check stores with the lead, so the leads
// table shows which page sent each person. /awakening/<slug> becomes
// "briefing:<slug>:footer"; hub and category pages become
// "awakening:<path>:footer". intelligence keeps up to 100 characters of
// letters, digits, spaces and _ . - + : / (lib/attribution/campaign.js).
// Links written inside a briefing use "briefing:<slug>" with no suffix.
function readinessSrc(pathname) {
  const parts = (pathname || "/awakening").split("/").filter(Boolean);
  const isArticle =
    parts.length === 2 &&
    !["industry", "for", "theme", "type", "feed.xml"].includes(parts[1]);
  const tag = isArticle
    ? `briefing:${parts[1]}`
    : parts.join(":") || "awakening";
  return `${tag}:footer`;
}

/**
 * The briefing-to-challenge CTA, rendered as a white card. Used in the blog
 * footer (BriefingsFooter) and available to MDX article bodies.
 * `className` overrides the outer spacing; `placement` tags the analytics event.
 */
export default function ArticleCta({
  className = "my-14",
  placement = "article_body",
}) {
  const pathname = usePathname();
  const readinessHref = `/ai-readiness?src=${readinessSrc(pathname)}`;

  return (
    <aside
      className={`rounded-3xl border border-dark-blue/10 bg-white px-6 py-10 shadow-[0_1px_2px_rgba(0,3,76,0.06),0_16px_50px_rgba(0,3,76,0.10)] sm:px-10 sm:py-12 ${className}`}
    >
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
        The AI Stakeholder Challenge
      </p>
      <h2 className="max-w-2xl font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-3xl">
        Awareness is where it starts. It is not where it ends.
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-blue/60">
        The AI Stakeholder Challenge is 7 days and 4 live sessions that move you
        from reading briefings to leading with them: clarity, governance, and a
        6-month roadmap built around your seat.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button
          to="/personalize"
          variant="dark"
          iconLeft={Sparkles}
          onClick={() =>
            trackEvent("cta_click", { placement, destination: "personalize" })
          }
        >
          Find your path
        </Button>
        <Button
          to="/#pricing"
          variant="secondary-light"
          onClick={() =>
            trackEvent("cta_click", { placement, destination: "pricing" })
          }
        >
          Secure Your Spot
        </Button>
        <Button
          to={readinessHref}
          variant="ghost-light-flush"
          iconLeft={Gauge}
          className="gap-2"
          onClick={() =>
            trackEvent("cta_click", { placement, destination: "ai_readiness" })
          }
        >
          Take the free readiness check
        </Button>
      </div>
    </aside>
  );
}
