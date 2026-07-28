import Link from "next/link";
import { AUDIENCES, INDUSTRIES, THEMES } from "@/lib/blog/taxonomy";

const GROUPS = [
  { label: "For", entries: AUDIENCES, basePath: "/awakening/for", dimension: "audiences" },
  { label: "Worlds", entries: INDUSTRIES, basePath: "/awakening/industry", dimension: "industries" },
  { label: "Themes", entries: THEMES, basePath: "/awakening/theme", dimension: "theme" },
];

function Chip({ href, active, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
        active
          ? "gradient-200 border-transparent text-white shadow-sm"
          : "border-dark-blue/15 bg-white/50 text-dark-blue/70 hover:border-dark-blue/40 hover:bg-white hover:text-dark-blue"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Category navigation as real links (SEO-first, no client filtering).
 * `active` marks the current category page: { dimension, id }.
 */
export default function TaxonomyNav({ active }) {
  return (
    <nav aria-label="Browse briefings" className="flex flex-col gap-4">
      {GROUPS.map((group) => (
        <div key={group.label} className="flex flex-wrap items-baseline gap-2">
          <p className="w-20 shrink-0 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            {group.label}
          </p>
          {Object.values(group.entries).map((entry) => (
            <Chip
              key={entry.id}
              href={`${group.basePath}/${entry.id}`}
              active={
                active?.dimension === group.dimension && active?.id === entry.id
              }
            >
              {entry.shortLabel}
            </Chip>
          ))}
        </div>
      ))}
    </nav>
  );
}
