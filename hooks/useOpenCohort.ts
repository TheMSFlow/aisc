import { useEffect, useState } from "react";

export type Cohort = {
  id: string;
  cohort_code: string;
  cohort_name: string | null;
  start_date: string;
  end_date: string;
  final_date: string;
};

export function useOpenCohort(challengeSlug: string = "aisc") {
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    let cancelled = false;

    async function fetchCohort() {
      setLoading(true);
      setError(null);

      try {
        if (!API_BASE) {
          throw new Error("VITE_API_BASE is not defined");
        }

        const res = await fetch(
          `${API_BASE}/api/public/challenge/open?challenge_slug=${challengeSlug}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch open cohort");
        }

        const data: { ok: boolean; cohort: Cohort | null } = await res.json();

        if (!cancelled) {
          setCohort(data.cohort);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setCohort(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCohort();

    return () => {
      cancelled = true;
    };
  }, [challengeSlug, API_BASE]);

  return { cohort, loading, error };
}
