"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Loader2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import { trackEvent } from "@/lib/analytics";
import { isComplete, prioritised } from "@/lib/readiness/profile";
import GateForm from "./GateForm";
import RateStep from "./RateStep";
import ResultsView from "./ResultsView";

// The free AI readiness check, start to finish: the gate, the scale, six
// dimensions, and the results. The report is emailed as soon as the last
// dimension is rated (founder, 2026-11-19), and the results screen shows it
// going. Progress is kept in this browser, so a refresh loses nothing, and
// intelligence sends the report once per gate, so a refresh never sends a
// second. The Learning Center's Day 2 scorecard is a separate component in
// intelligence and is not affected by this one.

const STORE_KEY = "aisc_readiness_v1";
const API = process.env.NEXT_PUBLIC_API_BASE;

const EMPTY = {
  stage: "gate", // gate | intro | rate | results
  session: null, // { id, firstName, email, whatsappOptIn, emailOptIn }
  ratings: {},
  index: 0,
  evidence: {},
  result: null, // intelligence's reply once the report is sent
};

function readSaved() {
  if (typeof window === "undefined") return EMPTY;
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (saved?.session?.id) {
      // Progress saved before 2026-11-19 used "profile" and "done".
      const stage = ["profile", "done"].includes(saved.stage) ? "results" : saved.stage;
      return { ...EMPTY, ...saved, stage };
    }
  } catch {
    // Start fresh on anything unreadable.
  }
  return EMPTY;
}

// False on the server and while hydrating, true after. Until then the page
// shows a spinner, so the saved progress read in the browser never differs
// from what the server sent.
const noSubscribe = () => () => {};
function useInBrowser() {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
}

export default function ReadinessCheck({ initialScorecard }) {
  const [scorecard, setScorecard] = useState(initialScorecard);
  const [state, setState] = useState(readSaved);
  const loaded = useInBrowser();
  const [sendError, setSendError] = useState(null); // { message, restart }
  const sendingRef = useRef(false);
  const autoSent = useRef(false);

  // If the server could not read the statements, ask from the browser.
  useEffect(() => {
    if (scorecard || !API) return;
    let cancelled = false;
    fetch(`${API}/api/public/aisc/readiness/scorecard`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.dimensions)) setScorecard(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [scorecard]);

  // Keep progress in this browser.
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {
      // Private browsing: carry on without saving.
    }
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.stage, state.index]);

  const dimensions = useMemo(() => scorecard?.dimensions ?? [], [scorecard]);
  const allRated = dimensions.length > 0 && dimensions.every((d) => isComplete(d, state.ratings));
  const dims = useMemo(
    () => (allRated ? prioritised(dimensions, state.ratings) : []),
    [allRated, dimensions, state.ratings],
  );

  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  const started = (session) => {
    trackEvent("readiness_start", { email_opt_in: session.emailOptIn });
    set({ ...EMPTY, session, stage: "intro" });
  };

  const begin = () => {
    const firstOpen = dimensions.findIndex((d) => !isComplete(d, state.ratings));
    set({ stage: "rate", index: firstOpen === -1 ? 0 : firstOpen });
  };

  const next = () => {
    if (state.index >= dimensions.length - 1) {
      set({ stage: "results" });
      trackEvent("readiness_complete");
    } else {
      set({ index: state.index + 1 });
    }
  };

  const back = () => {
    if (state.index === 0) set({ stage: "intro" });
    else set({ index: state.index - 1 });
  };

  // Ties are no longer settled by the leader: intelligence takes level
  // dimensions in the scorecard's order, as the results screen lists them.
  const sessionId = state.session?.id;
  const { ratings, evidence } = state;
  const send = useCallback(async () => {
    if (sendingRef.current || !sessionId) return;
    sendingRef.current = true;
    setSendError(null);
    try {
      const res = await fetch(`${API}/api/public/aisc/readiness/report`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: sessionId,
          ratings,
          evidence,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        trackEvent("readiness_report_sent");
        setState((s) => ({ ...s, result: data }));
        return;
      }
      if (res.status === 404) {
        setSendError({
          message: "We could not find your details. Start again with your name and email.",
          restart: true,
        });
      } else if (res.status === 429) {
        setSendError({ message: "Too many tries from this connection. Try again in an hour." });
      } else {
        setSendError({
          message: "Your report did not send. Your answers are saved, so try again in a moment.",
        });
      }
    } catch {
      setSendError({
        message: "Your report did not send. Your answers are saved, so try again in a moment.",
      });
    } finally {
      sendingRef.current = false;
    }
  }, [sessionId, ratings, evidence]);

  // Send as soon as the results screen opens, once.
  useEffect(() => {
    if (!loaded || state.stage !== "results" || state.result || !allRated) return;
    if (autoSent.current) return;
    autoSent.current = true;
    send();
  }, [loaded, state.stage, state.result, allRated, send]);

  const restart = () => {
    setSendError(null);
    autoSent.current = false;
    setState(EMPTY);
  };

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-msaccent" />
      </div>
    );
  }

  if (!scorecard) {
    return (
      <Section width="narrow" spacing="compact">
        <p className="font-ptsans text-2xl font-bold uppercase tracking-tight text-dark-blue">
          The readiness check is not available right now.
        </p>
        <p className="mt-3 text-sm text-dark-blue/60">Please try again in a few minutes.</p>
      </Section>
    );
  }

  const total = dimensions.length;

  return (
    <Section width="narrow" spacing="compact" containerClassName="h-auto">
      {state.stage === "rate" && (
        <ol className="mb-10 grid grid-cols-6 gap-1.5" aria-label="Progress">
          {dimensions.map((d, i) => (
            <li
              key={d.key}
              aria-label={`${d.name}${isComplete(d, state.ratings) ? ", rated" : ""}`}
              className={`h-1.5 rounded-full ${
                i === state.index
                  ? "bg-dark-blue"
                  : isComplete(d, state.ratings)
                    ? "bg-msaccent"
                    : "bg-dark-blue/10"
              }`}
            />
          ))}
        </ol>
      )}

      {state.stage === "gate" && (
        <div className="flex min-h-[60vh] flex-col justify-center">
          <h1 className="text-balance font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl lg:text-6xl">
            How ready are you for AI?
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dark-blue/65 sm:text-lg">
            Fill in your details to get started.
          </p>
          <GateForm
            // No WhatsApp box (founder, 2026-11-19): the invite is offered on
            // the results screen to everyone who finishes.
            whatsappOptInText={null}
            emailOptInText={scorecard.emailOptInText}
            onStarted={started}
          />
        </div>
      )}

      {state.stage === "intro" && (
        <div className="flex min-h-[60vh] flex-col justify-center">
          {/* No title and no explanation: the scale, then Begin (founder, 2026-11-19). */}
          <p className="text-xl font-medium text-dark-blue sm:text-2xl">
            Rate each statement from 1 to 5.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {scorecard.scale.map((s) => (
              <li key={s.value} className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dark-blue/15 bg-white text-sm font-semibold tabular-nums text-dark-blue">
                  {s.value}
                </span>
                <span className="text-lg text-dark-blue">{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button variant="dark" className="px-10 py-3" onClick={begin}>
              {Object.keys(state.ratings).length ? "Carry on" : "Begin"}
            </Button>
          </div>
        </div>
      )}

      {state.stage === "rate" && dimensions[state.index] && (
        <RateStep
          dimension={dimensions[state.index]}
          index={state.index}
          total={total}
          scale={scorecard.scale}
          ratings={state.ratings}
          evidence={state.evidence}
          // Built on the latest state, so quick clicks in a row all count.
          onRate={(id, n) => setState((s) => ({ ...s, ratings: { ...s.ratings, [id]: n } }))}
          onEvidence={(id, text) =>
            setState((s) => ({ ...s, evidence: { ...s.evidence, [id]: text } }))
          }
          onBack={back}
          onNext={next}
          nextLabel={state.index === total - 1 ? "See my results" : "Next dimension"}
        />
      )}

      {state.stage === "results" && allRated && (
        <ResultsView
          dims={dims}
          outOf={scorecard.outOf}
          scale={scorecard.scale}
          ratings={state.ratings}
          evidence={state.evidence}
          email={state.session?.email}
          status={state.result ? "sent" : sendError ? "error" : "sending"}
          error={sendError}
          inviteUrl={state.result?.inviteUrl}
          onRetry={send}
          onRestart={restart}
        />
      )}
    </Section>
  );
}
