import type { Cohort } from "@/hooks/useOpenCohort";

export function formatCohortDates(cohort: Cohort) {
  const start = new Date(cohort.start_date);
  const end = new Date(cohort.end_date);

  // Day range: Thursday – Saturday
  const dayRange = `${start.toLocaleDateString(undefined, {
    weekday: "long",
  })} – ${end.toLocaleDateString(undefined, {
    weekday: "long",
  })}`;

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  const sameYear = start.getFullYear() === end.getFullYear();

  let dateRange: string;

  if (sameMonth) {
    // January 29 – 31, 2026
    dateRange = `${start.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    })} – ${end.getDate()}, ${end.getFullYear()}`;
  } else if (sameYear) {
    // Jan 29 – Feb 2, 2026
    dateRange = `${start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })} – ${end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  } else {
    // Dec 30, 2025 – Jan 2, 2026
    dateRange = `${start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} – ${end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  // Time range: 12:00 PM – 1:00 PM
  const timeRange = `${start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })} – ${end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;

  return { dayRange, dateRange, timeRange };
}
