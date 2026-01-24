
import React from 'react';

export const FilterSection: React.FC<{ id: string }> = ({ id }) => {
  const isItems = [
    "Practical and decision-focused",
    "Built for experienced leaders in every industry",
    "Grounded in real work, not examples",
    "Designed to produce clarity, not excitement"
  ];

  const isNotItems = [
    "A technical or coding course",
    "A tools workshop",
    "A motivational seminar",
    "A shortcut to easy money"
  ];

  return (
    <section id={id} className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          <div className="flex-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-slate-100">
            <h3 className="font-heading text-4xl mb-12 text-msblue">
              What this challenge IS
            </h3>
            <ul className="space-y-8">
              {isItems.map((item, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <span className="text-msblue text-2xl">✓</span>
                  <p className="text-xl md:text-2xl text-slate-700 font-light">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 p-8 md:p-16 bg-slate-50">
            <h3 className="font-heading text-4xl mb-12 text-warning">
              What this challenge IS NOT
            </h3>
            <ul className="space-y-8">
              {isNotItems.map((item, i) => (
                <li key={i} className="flex items-start space-x-4 opacity-60">
                  <span className="text-warning text-2xl">✕</span>
                  <p className="text-xl md:text-2xl text-slate-700 font-light">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center max-w-4xl mx-auto px-4 py-12 rounded-sm bg-lilac-hover">
          <p className="text-2xl md:text-4xl text-dark-blue italic leading-loose mb-8">
            "If you're looking to be overwhelmed with productivity tools, this
            isn't for you. <br />
            <br />
            If you're looking to step into the 1% of leaders who will lead with
            clarity in this new age of AI, this is for you."
          </p>
        </div>
      </div>
    </section>
  );
};
