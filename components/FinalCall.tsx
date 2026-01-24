
import React from 'react';
import Button from './Button';

export const FinalCall: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section
      id={id}
      className="bg-white py-24 md:py-40 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-msblue via-warning to-msblue"></div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <h4 className="font-heading text-xl tracking-[0.25em] text-msblue mb-8">
          JOIN THE TOP 1%
        </h4>

        <h2 className="text-4xl md:text-7xl font-heading mb-12 leading-tight uppercase">
          This is not about keeping up. <br />
          <span className="text-gradient-200 italic font-bold">
            It's about choosing where you stand.
          </span>
        </h2>

        <div className="space-y-6 text-xl md:text-2xl text-slate-600 mb-16 font-light">
          <p>AI will not wait.</p>
          <p>Your industry will not pause.</p>
          <p className="font-bold text-dark-blue">
            Your authority depends on clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-sm font-bold uppercase tracking-widest text-msblue">
          <div className="p-6 border border-msaccent bg-msaccent/20">
            Direction
          </div>
          <div className="p-6 border border-msaccent bg-msaccent/20">
            Relief
          </div>
          <div className="p-6 border border-msaccent bg-msaccent/20">
            A way forward
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <p className="text-2xl md:text-3xl font-heading uppercase tracking-tighter">
            If you're ready to stop observing and start owning —
          </p>

          <Button
            as="a"
            href="https://intelligence.michaelsteve.com/pay/challenge/aisc"
            className="scale-125 md:scale-150"
          >
            Join the AI Stakeholder Challenge
          </Button>

          <p className="pt-6 text-slate-400 text-xs font-bold tracking-[0.3em] uppercase">
            Strategic Leadership commitment required.
          </p>
        </div>
      </div>
    </section>
  );
};
