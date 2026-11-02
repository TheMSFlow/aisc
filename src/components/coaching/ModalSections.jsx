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
// The Labs panel's closing sentence is swapped for coaching's: all of Labs
// comes with coaching (founder, 2026-11-02). Demo never re-renders that
// text, so the swap holds while the pop-up is open.
const LABS_HOME_LINE = "Labs is by subscription.";
const LABS_COACHING_LINE =
  "All of Labs is included in coaching, at no additional fee, for as long as your coaching runs.";

export function DemoInModal({ startPanel = 0 }) {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    ref.current?.querySelectorAll("#demo p").forEach((p) => {
      if (p.textContent.endsWith(LABS_HOME_LINE)) {
        p.textContent =
          p.textContent.slice(0, -LABS_HOME_LINE.length) + LABS_COACHING_LINE;
      }
    });
  }, []);

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
