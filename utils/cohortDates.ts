import type { Cohort } from "@/hooks/useOpenCohort";

export function formatCohortDates(cohort: Cohort) {
  const start = new Date(cohort.start_date);
  const end = new Date(cohort.end_date);

  const dayRange = `${start.toLocaleDateString(undefined, {
    weekday: "long",
  })} – ${end.toLocaleDateString(undefined, {
    weekday: "long",
  })}`;

  const dateRange = `${start.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  })} – ${end.toLocaleDateString(undefined, {
    day: "numeric",
    year: "numeric",
  })}`;

  const timeRange = `${start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })} – ${end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;

  return { dayRange, dateRange, timeRange };
}
