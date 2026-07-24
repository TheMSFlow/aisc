"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Button from "@/components/global/Button";
import Section from "@/components/layout/Section";
import { useLocation } from "@/context/LocationContext";
import { trackEvent } from "@/lib/analytics";
import { SEAT_QUESTION, getPrompts } from "@/lib/personalize/questions";
import ProgressBar from "./ProgressBar";
import QuestionStep from "./QuestionStep";
import OpenPrompt from "./OpenPrompt";
import ResultsView from "./ResultsView";

const STEPS = ["intro", "seat", "leads", "pressing", "picture"];
const QUESTION_COUNT = 4;

const LOADING_LINES = [
  "Reading your answers.",
  "Weighing the paths.",
  "Almost there.",
];

const EMPTY_ANSWERS = { seat: null, leads: "", pressing: "", picture: "" };

function LoadingState() {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setLine((l) => Math.min(l + 1, LOADING_LINES.length - 1)),
      2400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-msaccent" />
      <p className="font-ptsans text-2xl font-bold uppercase tracking-tight text-dark-blue sm:text-3xl">
        {LOADING_LINES[line]}
      </p>
    </div>
  );
}

export default function PersonalizeFlow() {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [result, setResult] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);
  const { currency } = useLocation();
  const advanceTimer = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => clearTimeout(advanceTimer.current);
  }, [step]);

  const stepIndex = STEPS.indexOf(step);

  const goBack = () => setStep(STEPS[Math.max(stepIndex - 1, 0)]);

  const selectSeat = (id) => {
    setAnswers((a) => ({ ...a, seat: id }));
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => setStep("leads"), 250);
  };

  const submit = async (finalAnswers) => {
    setStep("loading");
    setRateLimited(false);
    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          seat: finalAnswers.seat,
          leads: finalAnswers.leads.trim(),
          pressing: finalAnswers.pressing.trim(),
          picture: finalAnswers.picture.trim(),
          currency,
        }),
      });
      if (!res.ok) {
        setRateLimited(res.status === 429);
        setStep("error");
        return;
      }
      const data = await res.json();
      if (!data?.ok || !data?.result) {
        setStep("error");
        return;
      }
      setResult(data.result);
      setResultId(data.id ?? null);
      trackEvent("personalize_complete", { seat: finalAnswers.seat });
      setStep("results");
    } catch {
      setStep("error");
    }
  };

  const restart = () => {
    setAnswers(EMPTY_ANSWERS);
    setResult(null);
    setResultId(null);
    setStep("intro");
  };

  const isQuestion = stepIndex >= 1;
  const prompts = getPrompts(answers.seat);

  return (
    <Section width="narrow" spacing="default" containerClassName="min-h-[70vh]">
      {isQuestion && (
        <div className="mb-10 flex flex-col gap-6">
          <button
            type="button"
            onClick={goBack}
            className="flex w-fit cursor-pointer items-center gap-2 text-xs text-dark-blue/50 transition-colors hover:text-dark-blue"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
          <ProgressBar step={stepIndex} total={QUESTION_COUNT} />
        </div>
      )}

      {step === "intro" && (
        <div className="flex min-h-[50vh] flex-col justify-center">
          <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            <Sparkles className="h-3.5 w-3.5 text-msaccent" /> Find your path
          </p>
          <h1 className="font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl lg:text-6xl">
            A few honest answers...
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dark-blue/55">
            Answer in your own words, the way you would with a
            trusted advisor. We read what you share and point you to the right
            way in, with the reasoning to back it.
          </p>
          <div className="mt-10">
            <Button
              variant="dark"
              className="px-10 py-3"
              onClick={() => {
                trackEvent("personalize_start");
                setStep("seat");
              }}
            >
              Start
            </Button>
          </div>
        </div>
      )}

      {step === "seat" && (
        <QuestionStep
          question={SEAT_QUESTION}
          value={answers.seat}
          onSelect={selectSeat}
        />
      )}

      {step === "leads" && (
        <OpenPrompt
          prompt={prompts[0]}
          value={answers.leads}
          onChange={(v) => setAnswers((a) => ({ ...a, leads: v }))}
          onContinue={() => setStep("pressing")}
        />
      )}

      {step === "pressing" && (
        <OpenPrompt
          prompt={prompts[1]}
          value={answers.pressing}
          onChange={(v) => setAnswers((a) => ({ ...a, pressing: v }))}
          onContinue={() => setStep("picture")}
        />
      )}

      {step === "picture" && (
        <OpenPrompt
          prompt={prompts[2]}
          value={answers.picture}
          onChange={(v) => setAnswers((a) => ({ ...a, picture: v }))}
          onContinue={() => submit(answers)}
          onSkip={() => submit({ ...answers, picture: "" })}
          continueLabel="See my path"
        />
      )}

      {step === "loading" && <LoadingState />}

      {step === "results" && result && (
        <ResultsView
          result={result}
          id={resultId}
          seat={answers.seat}
          onRestart={restart}
        />
      )}

      {step === "error" && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
          <p className="font-ptsans text-2xl font-bold uppercase tracking-tight text-dark-blue sm:text-3xl">
            That did not go through.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-dark-blue/55">
            {rateLimited
              ? "You have made a few attempts in a short window. Give it a little time, your answers are saved."
              : "Your answers are saved. Try again when you are ready."}
          </p>
          <Button
            variant="dark"
            className="px-10 py-3"
            onClick={() => submit(answers)}
          >
            Try again
          </Button>
        </div>
      )}
    </Section>
  );
}
