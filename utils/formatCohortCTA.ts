import type { Cohort } from "@/hooks/useOpenCohort";

function ordinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function formatCohortCTA(cohort: Cohort): string {
  const start = new Date(cohort.start_date);
  const end = new Date(cohort.end_date);

  const startDay = start.toLocaleDateString(undefined, { weekday: "long" });
  const endDay = end.toLocaleDateString(undefined, { weekday: "long" });

  const startDate = ordinal(start.getDate());
  const endDate = ordinal(end.getDate());

  const time = start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const cleanTime = time
    .replace(":00", "")
    .replace("AM", "am")
    .replace("PM", "pm");

  return `${startDay} ${startDate} – ${endDay} ${endDate}, ${cleanTime}`;
}
