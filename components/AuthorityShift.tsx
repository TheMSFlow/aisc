
import React from 'react';

export const AuthorityShift: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section
      id={id}
      className="bg-msaccent py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-msblue to-warning opacity-20"></div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h4 className="font-heading text-lg tracking-widest text-msblue mb-4">
              AUTHORITY SHIFT
            </h4>
            <h2 className="text-4xl md:text-6xl font-heading leading-tight mb-8 text-dark-blue">
              THIS CHALLENGE IS NOT ABOUT LEARNING AI.
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-msblue italic mb-8">
              It's about deciding how you lead.
            </p>
            <div className="p-6 bg-white shadow-xl rounded-sm border-l-8 border-warning">
              <p className="text-xl md:text-2xl font-heading uppercase tracking-wide">
                Work is no longer the scarce resource. <br />
                <span className="text-warning">Judgment is.</span>
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <p className="text-slate-500 uppercase tracking-widest font-bold text-sm mb-6">
                Your value is no longer:
              </p>
              <ul className="space-y-4">
                {[
                  "how much you know",
                  "how fast you respond",
                  "how busy you are",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center line-through opacity-40 text-lg decoration-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-msblue uppercase tracking-widest font-bold text-sm mb-6">
                Your value IS:
              </p>
              <ul className="space-y-6">
                {[
                  { text: "what you choose", color: "text-msblue" },
                  { text: "what you delegate", color: "text-msblue" },
                  { text: "what you refuse", color: "text-warning" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center text-2xl md:text-3xl font-heading uppercase ${item.color}`}
                  >
                    <span className="mr-4">→</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-slate-600 font-heading tracking-widest uppercase">
            The AI Stakeholder Challenge is designed to help you protect and
            apply judgment deliberately.
          </p>
        </div>
      </div>
    </section>
  );
};
