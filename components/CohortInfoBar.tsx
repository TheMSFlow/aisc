import React from "react";
import type { Cohort } from "@/hooks/useOpenCohort";

type Props = {
  cohort: Cohort | null;
  loading?: boolean;
};

export const CohortInfoBar: React.FC<Props> = ({ cohort, loading = false }) => {
  if (loading || !cohort || !cohort.cohort_name) return null;

  return (
    <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-50 bg-warning text-white px-6 py-3">
      <p className="font-heading text-sm md:text-base uppercase tracking-widest">
        Join <span className="font-bold">{cohort.cohort_name}</span> Cohort
      </p>
    </button>
  );
};
