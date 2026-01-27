import React from "react";
import type { Cohort } from "@/hooks/useOpenCohort";
import { formatCohortDates } from "@/utils/cohortDates";

type Props = {
  cohort: Cohort | null;
  loading?: boolean;
};

export function CohortDateBlock({ cohort, loading }: Props) {
  if (loading) {
    return (
      <ul className="space-y-4 text-lg font-light opacity-80">
        <li>Loading dates…</li>
      </ul>
    );
  }

  if (!cohort) {
    return (
      <ul className="space-y-4 text-lg font-light opacity-80">
        <li>Dates coming soon</li>
        <li>Time TBA</li>
      </ul>
    );
  }

  const { dayRange, dateRange, timeRange } = formatCohortDates(cohort);

  return (
    <ul className="space-y-4 text-lg font-light opacity-80">
      <li>{dayRange}</li>
      <li>{dateRange}</li>
      <li>{timeRange}</li>
    </ul>
  );
}
