"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import { trackEvent } from "@/lib/analytics";
import { isComplete, profileFor } from "@/lib/readiness/profile";
import GateForm from "./GateForm";
import RateStep from "./RateStep";
import ProfileView from "./ProfileView";
import ReportSent from "./ReportSent";

// The free AI readiness check, start to finish: the gate, how to rate, six
// dimensions, the profile, and the success page. Progress is kept in this
// browser, so a refresh loses nothing. The Learning Center's Day 2 scorecard
// is a separate component in intelligence and is not affected by this one.

const STORE_KEY = "aisc_readiness_v1";
const API = process.env.NEXT_PUBLIC_API_BASE;

const EMPTY = {
  stage: "gate", // gate | intro | rate | profile | done
  session: null, // { id, firstName, email, whatsappOptIn, emailOptIn }
  ratings: {},
  index: 0,
  choice: { strongest: null, start: null, next: null },
  evidence: {},
  editing: false,
  result: null,
};

function readSaved() {
  if (typeof window === "undefined") return EMPTY;
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (saved?.session?.id) return { ...EMPTY, ...saved };
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

export default function ReadinessCheck({ initialScorecard, sales, awakeningInviteUrl }) {
  const [scorecard, setScorecard] = useState(initialScorecard);
  const [state, setState] = useState(readSaved);
  const loaded = useInBrowser();
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

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
  const profile = useMemo(
    () => (allRated ? profileFor(dimensions, state.ratings, state.choice) : null),
    [allRated, dimensions, state.ratings, state.choice],
  );

  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  const started = (session) => {
    trackEvent("readiness_start", {
      whatsapp_opt_in: session.whatsappOptIn,
      email_opt_in: session.emailOptIn,
    });
    set({ ...EMPTY, session, stage: "intro" });
  };

  const begin = () => {
    const firstOpen = dimensions.findIndex((d) => !isComplete(d, state.ratings));
    set({ stage: "rate", index: firstOpen === -1 ? 0 : firstOpen });
  };

  const next = () => {
    if (state.editing || state.index >= dimensions.length - 1) {
      set({ stage: "profile", editing: false });
      if (!state.editing) trackEvent("readiness_complete");
    } else {
      set({ index: state.index + 1 });
    }
  };

  const back = () => {
    if (state.index === 0) set({ stage: "intro" });
    else set({ index: state.index - 1 });
  };

  const send = async () => {
    if (!profile?.settled || sending) return;
    setSending(true);
    setSendError("");
    try {
      const res = await fetch(`${API}/api/public/aisc/readiness/report`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: state.session.id,
          ratings: state.ratings,
          evidence: state.evidence,
          choice: state.choice,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        trackEvent("readiness_report_sent", { whatsapp_opt_in: Boolean(data.inviteUrl) });
        set({ stage: "done", result: data });
        return;
      }
      if (res.status === 404) {
        setSendError("We could not find your details. Start again with your name and email.");
      } else if (res.status === 429) {
        setSendError("Too many tries from this connection. Please try again in an hour.");
      } else {
        setSendError("Your report did not send. Your answers are saved, so try again in a moment.");
      }
    } catch {
      setSendError("Your report did not send. Your answers are saved, so try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    setSendError("");
    setState(EMPTY);
  };

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-msaccent" />
      </div>
    );
  }

  if (state.stage === "done" && state.result) {
    return (
      <ReportSent
        result={state.result}
        onRestart={restart}
        sales={sales}
        awakeningInviteUrl={awakeningInviteUrl}
      />
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
      {state.stage === "profile" && (
        <button
          type="button"
          onClick={() => set({ stage: "rate", index: total - 1 })}
          className="mb-10 flex w-fit cursor-pointer items-center gap-2 text-sm text-dark-blue/55 transition-colors hover:text-dark-blue"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the statements
        </button>
      )}

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
            Twenty-four plain statements about your own work, in six dimensions. You get six scores
            side by side, with no total, so you can see where you are strongest and where to start.
            It takes about ten minutes, and your full report comes by email.
          </p>
          <GateForm
            whatsappOptInText={scorecard.whatsappOptInText}
            emailOptInText={scorecard.emailOptInText}
            onStarted={started}
          />
        </div>
      )}

      {state.stage === "intro" && (
        <div className="flex min-h-[60vh] flex-col justify-center">
          <h1 className="text-balance font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl">
            A snapshot, not a test.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dark-blue/65 sm:text-lg">
            {state.session?.firstName ? `${state.session.firstName}, answer` : "Answer"} for
            yourself, about what is true today. Plans and intentions do not count, and a low score
            is not a failure. It is the place to start.
          </p>
          <ul className="mt-8 flex flex-col gap-2 border-l-2 border-msaccent/40 pl-5">
            {scorecard.scale.map((s) => (
              <li key={s.value} className="text-base text-dark-blue/80">
                <span className="font-semibold tabular-nums text-dark-blue">{s.value}</span>
                <span className="text-dark-blue/40">  </span>
                {s.label}
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
          nextLabel={
            state.editing || state.index === total - 1 ? "See my profile" : "Next dimension"
          }
        />
      )}

      {state.stage === "profile" && profile && (
        <ProfileView
          profile={profile}
          ratings={state.ratings}
          outOf={scorecard.outOf}
          choice={state.choice}
          onChoose={(slot, key) =>
            setState((s) => {
              const choice = { ...s.choice, [slot]: key };
              // A new place to start can change the next lowest.
              if (slot === "start") choice.next = null;
              return { ...s, choice };
            })
          }
          onEdit={(key) =>
            set({ stage: "rate", editing: true, index: dimensions.findIndex((d) => d.key === key) })
          }
          email={state.session?.email}
          sending={sending}
          sendError={sendError}
          onSend={send}
        />
      )}
    </Section>
  );
}
