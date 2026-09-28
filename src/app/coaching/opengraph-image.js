import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "AI Stakeholder Coaching | You declare your AI territory in seven days. Coaching is where it gets built.";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "rgb(0, 3, 76)",
          backgroundImage:
            "radial-gradient(ellipse at 15% 0%, rgba(99,104,218,0.35), transparent 60%), radial-gradient(ellipse at 95% 0%, rgba(135,5,113,0.22), transparent 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            AI Stakeholder Coaching
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 40,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
              textTransform: "uppercase",
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            <div style={{ display: "flex" }}>
              You declare your AI territory in seven days.
            </div>
            <div style={{ display: "flex", color: "rgb(233, 234, 255)" }}>
              Coaching is where it gets built.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 28,
            fontSize: 24,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.6)" }}>
            aistakeholderchallenge.com/coaching
          </div>
          <div style={{ color: "rgb(99, 104, 218)" }}>Michael Steve</div>
        </div>
      </div>
    ),
    size
  );
}
