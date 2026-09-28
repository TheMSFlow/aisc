"use client";

import { useEffect, useRef } from "react";
import Curriculum from "@/components/sections/Curriculum";
import Value from "@/components/sections/Value";
import Demo from "@/components/sections/Demo";

// Home-page sections as shown inside /coaching's pop-up (SectionModal).
//
// RULE: the home-page components are never edited for this page. Every
// pop-up adjustment happens here, from the outside: descendant overrides
// on a wrapper, and (for the Toolbox start panel) driving the section's own
// controls. If a home section changes shape, fix the override here.

// Same compact spacing Value uses (Section spacing="compact").
export function CurriculumInModal() {
  return (
    <div className="[&_#curriculum]:py-12 md:[&_#curriculum]:py-16">
      <Curriculum />
    </div>
  );
}

export function ValueInModal() {
  return <Value />;
}

// The Toolbox is a fixed 100dvh slider. In the pop-up it needs:
// - top padding so its arrows clear the pop-up's floating X;
// - more height on phones (the inline 100dvh clips the visuals), so the
//   pop-up scrolls instead. `!` is required to beat the inline style.
// startPanel: opens on that panel (2 = Roadmap) by pressing the section's
// own "Next" control on mount, with the slide animation suppressed.
export function DemoInModal({ startPanel = 0 }) {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !startPanel) return;
    done.current = true;
    const root = ref.current;
    const next = root?.querySelector('button[aria-label="Next panel"]');
    const track = root?.querySelector(".transition-transform");
    if (!next) return;
    if (track) track.style.transition = "none";
    for (let i = 0; i < startPanel; i++) next.click();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (track) track.style.transition = "";
      }),
    );
  }, [startPanel]);

  return (
    <div
      ref={ref}
      className="[&_#demo]:pt-16 [&_#demo]:pb-8 sm:[&_#demo]:pt-20 lg:[&_#demo]:pb-0 [&_#demo]:h-[max(calc(100dvh_+_5rem),60rem)]! lg:[&_#demo]:h-[calc(100dvh_+_5rem)]!"
    >
      <Demo />
    </div>
  );
}
