
import React from 'react';

export const Payoff: React.FC<{ id: string }> = ({ id }) => {
  const reports = [
    "One recurring task no longer needing you",
    "Fewer decisions chasing your attention",
    "Confidence in the work you’ve consciously declined",
    "More time for judgment, direction, and leadership decisions",
  ];

  return (
    <section
      id={id}
      className="bg-msblue py-24 md:py-32 relative text-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 L100,0" stroke="white" strokeWidth="0.1" />
          <path d="M0,80 L80,0" stroke="white" strokeWidth="0.1" />
          <path d="M0,60 L60,0" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h4 className="font-heading text-lg tracking-widest text-msaccent mb-4">
            THE PAYOFF
          </h4>
          <h2 className="text-4xl md:text-7xl font-heading mb-6 uppercase">
            Momentum follows clarity.
          </h2>
          <p className="text-xl md:text-2xl font-light opacity-80">
            What changes in the first 3–7 days
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reports.map((r, i) => (
            <div
              key={i}
              className="p-8 border-b-2 border-white/20 bg-white/5 flex items-center space-x-6"
            >
              <span className="text-3xl font-heading text-warning">
                0{i + 1}
              </span>
              <p className="text-xl md:text-2xl font-light italic leading-tight">
                {r}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-20 text-center">
          <p className="text-3xl md:text-5xl font-heading uppercase italic text-gradient-100 mb-6">
            This is not hype. <br /> It’s clarity, and the momentum that follows.
          </p>
        </div>
      </div>
    </section>
  );
};
