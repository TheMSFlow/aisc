import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The link preview for /office-sprint (2026-11-27, founder: "the Sprint
// landing page and any pdf it produces will be designed in the new mckinsey
// look"): the report cover's deep blue and faint arcs, the hero line in
// Newsreader, sentence case. Without the font file it falls back to the
// default face rather than failing.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AI Stakeholder Office Sprint: know your next step with AI in one week.";

const DEEP = "#00034c";
const MID = "#7f86e3";
const LIGHT = "#c6c9f3";

async function newsreader() {
  try {
    return await readFile(join(process.cwd(), "src/app/office-sprint/Newsreader-Medium.ttf"));
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await newsreader();
  const serif = font ? "Newsreader" : "serif";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px",
          backgroundColor: DEEP,
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <circle
              key={i}
              cx="1200"
              cy="630"
              r={60 + i * 52}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div style={{ display: "flex", fontSize: 26, color: LIGHT, fontFamily: serif }}>
          AI Stakeholder Office Sprint
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: serif,
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: "#fff",
              maxWidth: 900,
            }}
          >
            Know your next step with AI in one week.
          </div>
          <div style={{ display: "flex", width: 64, height: 3, backgroundColor: MID, marginTop: 34 }} />
          <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: LIGHT, maxWidth: 820 }}>
            Three live sprints for your people, then a report for your leadership.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: MID }}>
          <div style={{ display: "flex" }}>aistakeholderchallenge.com/office-sprint</div>
          <div style={{ display: "flex" }}>Michael Steve Clarity Studio</div>
        </div>
      </div>
    ),
    font
      ? { ...size, fonts: [{ name: "Newsreader", data: font, style: "normal", weight: 500 }] }
      : size,
  );
}
