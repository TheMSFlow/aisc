
import React from 'react';

export const Problem: React.FC<{ id: string }> = ({ id }) => {
  const problems = [
    {
      title: "Consuming AI content without changing how they work",
      icon: "👁️",
    },
    {
      title:
        "Using AI for quick wins, not for decisions, workflows, or leverage.",
      icon: "🛠️",
    },
    {
      title: "Feeling pressure to 'do something' without clarity on what",
      icon: "🌪️",
    },
  ];

  return (
    <section id={id} className="bg-dark-blue text-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-heading mb-6">
            AI SEEMS INTIMIDATING
          </h2>
          <p className="pt-2 italic">Because it demands a new level of</p>
          <div className="text-5xl md:text-7xl font-bold italic text-gradient-100 mb-8 uppercase">
            <p>COMPETENCE</p>
            <p>CAPACITY</p>
            <p>AND</p>
            <p>RESPONSIBILITY</p>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto">
            Right now, most leaders are stuck in one of three places:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {problems.map((p, i) => (
            <div
              key={i}
              className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-sm flex flex-col justify-between"
            >
              <span className="text-4xl mb-6 opacity-80">{p.icon}</span>
              <p className="text-lg md:text-xl font-medium leading-snug">
                {p.title}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center border-t border-white/10 pt-16">
          <p className="text-2xl md:text-3xl font-light italic mb-8">
            "The result is noise, distraction, and slow erosion of authority."
          </p>
          <div className="inline-block py-4 px-8 bg-msaccent/10 border border-msaccent/20">
            <p className="text-xl md:text-2xl font-heading tracking-widest uppercase">
              AI didn't create this problem.{" "}
              <span className="text-msaccent">It exposed it.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
