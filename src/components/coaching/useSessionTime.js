"use client";

import { useEffect, useState } from "react";

// Shows each visitor the coaching session time in their own time zone, the
// way Cal.com and Calendly do. No service needed: 7PM WAT is a fixed instant
// (Lagos is UTC+1 all year, no daylight saving), so the browser converts it.
//
// Before the browser reports its time zone (server render, first paint) the
// hook returns the WAT defaults, so the page never flashes a wrong time.

const WAT_UTC_HOUR = 18; // 7PM WAT = 18:00 UTC
const SESSION_WEEKDAY_UTC = 6; // Saturday

// The next session instant, so daylight saving where the visitor lives is
// whatever applies on that actual date.
function nextSessionUtc(now = new Date()) {
  const d = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), WAT_UTC_HOUR),
  );
  const ahead = (SESSION_WEEKDAY_UTC - d.getUTCDay() + 7) % 7;
  d.setUTCDate(d.getUTCDate() + ahead);
  if (d <= now) d.setUTCDate(d.getUTCDate() + 7);
  return d;
}

const WAT = {
  ready: false,
  isWAT: true,
  time: "7PM",
  day: "Saturday",
  dayShort: "Sat",
  dayChanged: false,
};

export function useSessionTime() {
  const [state, setState] = useState(WAT);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const at = nextSessionUtc();
      const fmt = (opts, zone) =>
        new Intl.DateTimeFormat("en-US", { timeZone: zone, ...opts }).format(at);

      const time = fmt({ hour: "numeric", minute: "2-digit" }, tz);
      const day = fmt({ weekday: "long" }, tz);
      const watTime = fmt({ hour: "numeric", minute: "2-digit" }, "Africa/Lagos");

      // West and Central African zones on UTC+1 read the session exactly
      // as 7PM WAT, so they see WAT alone.
      const isWAT =
        tz === "Africa/Lagos" ||
        (tz?.startsWith("Africa/") && time === watTime && day === "Saturday");

      setState({
        ready: true,
        isWAT,
        time,
        day,
        dayShort: day.slice(0, 3),
        dayChanged: day !== "Saturday",
      });
    } catch {
      setState({ ...WAT, ready: true });
    }
  }, []);

  return state;
}

// Inline, for sentences: "7:00 PM your time (7PM WAT)", or with a day change
// "2:00 AM Sunday your time (7PM WAT Saturday)". WAT visitors: "7PM WAT".
export function SessionTime() {
  const t = useSessionTime();
  if (t.isWAT) return <>7PM WAT</>;
  return t.dayChanged ? (
    <>
      {t.time} {t.day} your time (7PM WAT Saturday)
    </>
  ) : (
    <>{t.time} your time (7PM WAT)</>
  );
}
