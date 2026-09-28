"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// The /coaching page's own header: the coaching wordmark and in-page links
// only. No "Guide me" and no cohort countdown, so nothing pulls the visitor
// toward a different offer.
const NAV = [
  { label: "Roadmap", href: "#the-roadmap" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

export default function CoachingHeader() {
  const [open, setOpen] = useState(false);

  return (
    // Sticky on <header> itself: a sticky child only sticks within its
    // parent, so sticky on the <nav> alone scrolled away with the header.
    <header className="sticky top-0 z-40">
      <nav
        aria-label="Primary"
        className="border-b border-white/8 bg-dark-blue px-5 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-3">
          <Link
            href="/coaching"
            className="whitespace-nowrap font-ptsans text-lg tracking-wide text-white sm:text-xl"
          >
            AI STAKEHOLDER <span className="font-bold">COACHING</span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-lilac/80 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="coaching-mobile-menu"
            aria-label="Toggle navigation menu"
            className="shrink-0 text-lilac lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div
            id="coaching-mobile-menu"
            className="-mx-5 border-t border-white/8 bg-dark-blue px-5 pb-6 pt-2 sm:-mx-6 sm:px-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-base text-lilac/90 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
