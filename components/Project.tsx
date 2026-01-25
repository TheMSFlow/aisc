
import React from 'react';

export const Project: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-dark-blue p-8 md:p-12 text-white relative shadow-2xl rounded-sm">
            <div className="absolute -top-4 -right-4 bg-warning text-white px-6 py-2 font-bold uppercase text-xs tracking-widest shadow-lg">
              FINAL OUTPUT
            </div>
            <h3 className="font-heading text-3xl md:text-4xl leading-tight mb-8">
              THE 6-MONTH AI STAKEHOLDER ROADMAP
            </h3>
            <ul className="space-y-6 text-lg opacity-80">
              <li className="flex items-start space-x-3">
                <span className="text-warning text-sm mt-1 md:text-xl md:mt-0">
                  →
                </span>
                <span>What you focus on</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-warning text-sm mt-1 md:text-xl md:mt-0">
                  →
                </span>
                <span>What you delegate</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-warning text-sm mt-1 md:text-xl md:mt-0">
                  →
                </span>
                <span>What you stop doing</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-warning text-sm mt-1 md:text-xl md:mt-0">
                  →
                </span>
                <span>Where you apply AI deliberately</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-widest text-msblue mb-4">
              POST CHALLENGE PROJECT
            </h4>
            <h2 className="text-4xl md:text-5xl font-heading mb-8 text-dark-blue uppercase leading-tight">
              A Decision Document, Not a Strategy Deck.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              This challenge culminates in a single, personal decision document
              that acts as a filter for your next 180 days. Reusable every 6
              months.
            </p>
            <div className="p-6 bg-slate-50 border-l-4 border-msblue">
              <p className="text-lg font-bold italic text-msblue">
                "Within days, at least one leadership burden should already feel
                lighter."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
