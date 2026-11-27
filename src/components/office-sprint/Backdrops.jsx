// The Office Sprint page's backgrounds, in the executive-report style (founder,
// 2026-11-27: "I want to see more interesting backgrounds in the Mckinsey
// style"). Fine line work in the brand's blues, never glows. Each has one job:
// arcs open a section, contour lines carry the deep "exhibit" bands, and a dot
// grid sits under the light sections. All are decoration: hidden from screen
// readers and from the pointer.

const STROKE = "#7f86e3";

// Concentric arcs from a corner, as on the report's cover.
export function Arcs({ corner = "bottom-right", className = "" }) {
  const cx = corner.includes("right") ? 1100 : 0;
  const cy = corner.includes("bottom") ? 619 : 0;
  const align = `${corner.includes("right") ? "xMax" : "xMin"}${corner.includes("bottom") ? "YMax" : "YMin"}`;
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1100 619"
      preserveAspectRatio={`${align} slice`}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }, (_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={110 + i * 44}
          fill="none"
          stroke={STROKE}
          strokeOpacity={0.07 + (i % 3) * 0.05}
          strokeWidth={i % 4 === 0 ? 1.25 : 0.75}
        />
      ))}
    </svg>
  );
}

// Flowing contour lines across a band, like a terrain map of the data.
export function Contours({ className = "", lines = 22 }) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const y = 40 + i * 26;
    const a = 34 + (i % 5) * 7;
    const b = 22 + ((i * 3) % 7) * 5;
    return `M -20 ${y} C 220 ${y - a}, 420 ${y + b}, 620 ${y - b / 2} S 980 ${y + a}, 1220 ${y - a / 3}`;
  });
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={STROKE}
          strokeOpacity={i % 6 === 0 ? 0.3 : 0.14}
          strokeWidth={i % 6 === 0 ? 1.2 : 0.8}
        />
      ))}
    </svg>
  );
}

// A fine dot grid that fades toward the top, for the light sections.
export function DotGrid({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0, 3, 76, 0.13) 1px, transparent 1.2px)",
        backgroundSize: "22px 22px",
        maskImage:
          "linear-gradient(to bottom, transparent, #000 35%, #000 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 35%, #000 80%, transparent)",
      }}
    />
  );
}

// The deep bands' ground: deep blue, warming to a stronger blue at one edge.
export const DEEP_BAND =
  "bg-[linear-gradient(135deg,#00034c_0%,#000473_55%,#141d8f_100%)]";
