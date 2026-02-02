import React, { useState } from "react";


interface TooltipProps {
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-label="More information"
        className="text-sm opacity-60 hover:opacity-100 transition "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-info-icon lucide-info"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      {/* Tooltip */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 z-50">
          <div className="bg-white text-slate-800 text-sm leading-relaxed p-4 shadow-xl border border-slate-200">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
