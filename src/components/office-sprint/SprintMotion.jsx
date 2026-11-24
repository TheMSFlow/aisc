"use client";

import { useEffect } from "react";
import "./sprintMotion.css";

// The page's one motion script (founder, 2026-11-24: "subtle but effective and
// efficient"). No library. Only what is still below the fold is held back, and
// only once the browser is running, so the page is complete without JavaScript
// and nothing already on screen ever flashes. Each part plays once.
export default function SprintMotion() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.motionState = "in";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" },
    );

    const fold = window.innerHeight * 0.94;
    document.querySelectorAll("[data-motion]").forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      el.dataset.motionState = "pending";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
