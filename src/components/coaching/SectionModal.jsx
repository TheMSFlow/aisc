"use client";

import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

// Full-screen pop-up that shows a home-page section in place, so a visitor on
// /coaching can read the challenge detail without leaving the page.
//
// Every close goes through history: opening pushes an entry, the X and Escape
// step back, and the resulting popstate closes the pop-up. So the phone back
// button closes it too, and it never leaves a stray entry behind.
//
// No transform on the container: the Toolbox's own fixed "expand" sheet must
// still position against the viewport.
export default function SectionModal({ open, onClose, label, children }) {
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const requestClose = useCallback(() => {
    if (window.history.state?.sectionModal) window.history.back();
    else onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!window.history.state?.sectionModal) {
      window.history.pushState({ sectionModal: true }, "");
    }
    const onPop = () => onCloseRef.current();
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);

    const opener = document.activeElement;
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, requestClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-60 overflow-y-auto overscroll-contain bg-white"
    >
      {/* Floating X. Every section shown here must leave enough top space
          for it; ModalSections.jsx handles that without touching the
          home-page components. */}
      <button
        ref={closeRef}
        type="button"
        onClick={requestClose}
        aria-label={`Close ${label}`}
        className="fixed top-4 right-4 z-70 flex h-11 w-11 items-center justify-center rounded-full bg-white text-dark-blue shadow-[0_2px_4px_rgba(0,3,76,0.15),0_16px_40px_rgba(0,3,76,0.25)] ring-1 ring-dark-blue/10 transition-colors hover:bg-lilac focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent sm:top-6 sm:right-6"
      >
        <X className="h-5 w-5" />
      </button>
      {children}
    </div>
  );
}
