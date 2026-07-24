"use client";

import Button from "@/components/global/Button";
import RecommendationCard from "./RecommendationCard";
import EmailRecommendation from "./EmailRecommendation";

export default function ResultsView({ result, id, seat, onRestart }) {
  const { headline, confidence, primary, alternate, awakeningNote } = result;

  return (
    <div>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
        Your path
      </p>
      <h1 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
        {headline}
      </h1>
      {confidence === "low" && (
        <p className="mt-4 text-sm text-dark-blue/50">
          Based on what you shared, this is the closest fit.
        </p>
      )}

      <div className="mt-10">
        <RecommendationCard
          offer={primary.offer}
          reasoning={primary.reasoning}
          primary
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
          Also worth considering
        </p>
        <RecommendationCard
          offer={alternate.offer}
          reasoning={alternate.reasoning}
        />
      </div>

      {awakeningNote && (
        <div className="mt-6 rounded-[8px] bg-msaccent/10 p-8 lg:p-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            Also open to you
          </p>
          <h3 className="font-ptsans text-lg font-bold uppercase tracking-tight text-dark-blue">
            {awakeningNote.offer.name}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dark-blue/65">
            {awakeningNote.reasoning}
          </p>
          <p className="mt-2 text-xs font-medium text-dark-blue/45">
            {awakeningNote.offer.priceNote}
          </p>
          <div className="mt-5">
            <Button
              href={awakeningNote.offer.href}
              variant={awakeningNote.offer.buttonVariant}
              className="py-3 px-8"
            >
              {awakeningNote.offer.cta}
            </Button>
          </div>
        </div>
      )}

      <EmailRecommendation id={id} seat={seat} />

      <div className="mt-10">
        <Button variant="ghost-light" onClick={onRestart}>
          Start over
        </Button>
      </div>
    </div>
  );
}
