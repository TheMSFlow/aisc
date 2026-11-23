import Link from "next/link";
import {
  OFFICE_SPRINT_REQUEST_LABEL as REQUEST_LABEL,
  OFFICE_SPRINT_REQUEST_URL as REQUEST_URL,
} from "@/lib/officeSprint";

// The /office-sprint page's own header: the wordmark and the one action,
// always in reach. No in-page links (founder, 2026-11-22).

export default function OfficeSprintHeader() {
  return (
    <header className="sticky top-0 z-40">
      <nav
        aria-label="Primary"
        className="border-b border-white/8 bg-dark-blue px-5 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-3">
          <Link
            href="/office-sprint"
            className="whitespace-nowrap font-ptsans text-lg tracking-wide text-white sm:text-xl"
          >
            AI STAKEHOLDER <span className="font-bold">OFFICE SPRINT</span>
          </Link>

          <a
            href={REQUEST_URL}
            className="shrink-0 whitespace-nowrap rounded-full bg-lilac px-4 py-1.5 text-xs font-semibold text-dark-blue transition-colors hover:bg-lilac-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue lg:text-sm"
          >
            <span className="sm:hidden">Apply</span>
            <span className="hidden sm:inline">{REQUEST_LABEL}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
