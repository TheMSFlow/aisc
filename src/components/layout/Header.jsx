"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import Button from "../global/Button";
import CohortBar from "@/components/cohort/CohortBar";

const NAV = [
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Coaching", href: "/coaching" },
];

// Hash links stay plain anchors (in-page scroll); routes get Link prefetch.
function NavLink({ href, ...props }) {
  return href.startsWith("/#") ? (
    <a href={href} {...props} />
  ) : (
    <Link href={href} {...props} />
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <CohortBar />

      <nav
        aria-label="Primary"
        className="sticky top-0 z-40 border-b border-white/8 bg-dark-blue text-white"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-ptsans text-lg sm:text-xl tracking-wide text-white"
          >
            AI STAKEHOLDER <span className="font-bold">CHALLENGE</span>
          </Link>

<div className="flex flex-row gap-6">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="text-sm text-lilac/80 transition-colors hover:text-white"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="/personalize" variant="primary" iconLeft={Sparkles}>
              Guide me
            </Button>
          </div>
</div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="text-lilac lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="border-t border-white/8 bg-dark-blue px-5 pb-6 pt-2 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-base text-lilac/90 hover:text-white"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button
                href="/personalize"
                variant="primary"
                iconLeft={Sparkles}
                className=""
                onClick={() => setOpen(false)}
              >
                Guide me
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
