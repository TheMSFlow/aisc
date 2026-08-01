// Pure formatting helpers. Times are pinned to Africa/Lagos so the (WAT)
// label is always accurate regardless of the viewer's own timezone.
const TZ = "Africa/Lagos";

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// "2026-08-05" for the given instant, as it falls on the Lagos calendar.
// Sortable as a plain string.
function lagosDayKey(date) {
  const parts = dayKeyFormat.formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

// Day 7's session runs 2 hours from 7PM, so the cohort is treated as live
// until 9PM WAT on the final day. Lagos is a fixed +01:00 with no DST, so the
// cutoff can be pinned directly to that offset.
const LIVE_CUTOFF_WAT = "T21:00:00+01:00";

// A running cohort stays "live" in the UI through its final day (day 7) and
// hands over to the next cohort once that day's session has ended.
export function isCohortLive(cohort, now = new Date()) {
  if (!cohort) return false;
  const finalDay = cohort.final_date ?? cohort.end_date;
  if (!finalDay) return false;
  const cutoff = new Date(`${lagosDayKey(new Date(finalDay))}${LIVE_CUTOFF_WAT}`);
  return now.getTime() < cutoff.getTime();
}

export function formatCohortDates(cohort) {
  const start = new Date(cohort.start_date);
  const end = new Date(cohort.end_date);

  const dayRange = `${start.toLocaleDateString(undefined, {
    weekday: "long",
    timeZone: TZ,
  })} \u2013 ${end.toLocaleDateString(undefined, {
    weekday: "long",
    timeZone: TZ,
  })}`;

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();
  const sameYear = start.getFullYear() === end.getFullYear();

  let dateRange;

  if (sameMonth) {
    // January 29 – 31, 2026
    dateRange = `${start.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      timeZone: TZ,
    })} \u2013 ${end.getDate()}, ${end.getFullYear()}`;
  } else if (sameYear) {
    // Jan 29 – Feb 2, 2026
    dateRange = `${start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      timeZone: TZ,
    })} \u2013 ${end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: TZ,
    })}`;
  } else {
    // Dec 30, 2025 – Jan 2, 2026
    dateRange = `${start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: TZ,
    })} \u2013 ${end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: TZ,
    })}`;
  }

  const formatTime = (date) =>
    date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: TZ,
      })
      .replace(":00", "")
      .replace(" AM", "AM")
      .replace(" PM", "PM");

  const startTime = `${formatTime(start)} (WAT)`;
  const timeRange = `${formatTime(start)} - ${formatTime(end)} (WAT)`;

  return { dayRange, dateRange, startTime, timeRange };
}

// Returns the last Thursday of the next calendar month (used when current cohort is live).
export function getLastThursdayOfNextMonth() {
  const now = new Date();
  const nextMonthYear =
    now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
  const nextMonthIndex = (now.getMonth() + 1) % 12; // 0-indexed
  // Last day of next month
  const lastDay = new Date(nextMonthYear, nextMonthIndex + 1, 0);
  const dow = lastDay.getDay(); // 0 = Sun, 4 = Thu
  const sub = (dow - 4 + 7) % 7;
  lastDay.setDate(lastDay.getDate() - sub);
  return lastDay;
}

// Formats a Date for pricing context — weekday + full date, no time.
export function formatPricingDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TZ,
  });
}
