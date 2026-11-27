"use client";

import { useState } from "react";

export default function FAQAccordion({ items, questionClassName = "font-ptsans text-base font-bold" }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="mt-12 divide-y divide-dark-blue/8 border-y border-dark-blue/8">
      {items.map((f, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-msblue"
            aria-expanded={open === i}
          >
            <span className={`${questionClassName} text-dark-blue`}>
              {f.q}
            </span>
            <span
              className={`shrink-0 text-xl text-dark-blue/25 transition-transform duration-200 ${
                open === i ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          {open === i && (
            <div className="pb-6 text-sm leading-relaxed text-dark-blue/60">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
