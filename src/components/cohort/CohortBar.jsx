"use client";

import { useEffect, useState } from "react";
import { useCohort } from "@/context/CohortContext";
import { useCountdown } from "@/hooks/useCountdown";
import { formatCohortDates, isCohortLive } from "@/utils/cohortFormat";
import Button from "../global/Button";

export default function CohortBar() {
  const { openCohort, activeCohort, loading } = useCohort();
  const { label } = useCountdown(openCohort?.start_date ?? null);

  // Re-evaluated every minute so the bar hands over on the final day
  // without needing a reload.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const isLive = isCohortLive(activeCohort, now);

  // While live, the bar belongs to the running cohort. From its final day on,
  // it switches to the next open cohort.
  const cohort = isLive ? activeCohort : openCohort;

  if (loading || !cohort) return null;

  // Use final_date (day 7) as the display end so the range spans the full program
  const displayCohort = {
    ...cohort,
    end_date: cohort.final_date ?? cohort.end_date,
  };
  const { dateRange, startTime } = formatCohortDates(displayCohort);

  return (
    <div className="w-full border-b border-white/8 bg-dark-blue">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-1.5 sm:gap-6 sm:px-5 sm:py-2.5">
        <p className="min-w-0 text-xs text-lilac md:text-sm">
          <span className="opacity-70 sm:inline">
            {isLive ? "" : "Next cohort ->"}{" "}
          </span>
          <span className="font-medium">{dateRange}</span>
          <span className="hidden sm:inline">
            <span className="mx-2 opacity-40">·</span>
            <span className="opacity-80">{startTime}</span>
          </span>
          {isLive && (
            <>
              <span className="mx-1.5 opacity-40 sm:mx-2">·</span>
              <span className="font-semibold text-warning">Now live</span>
            </>
          )}
          {!isLive && label && (
            <>
              <span className="mx-1.5 opacity-40 sm:mx-2">·</span>
              <span className="font-semibold text-warning">{label}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
