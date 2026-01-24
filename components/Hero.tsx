import { React, useEffect, useState } from "react";   

import Button from "./Button";

export const Hero: React.FC<{ id: string }> = ({ id }) => {
  const words = ["AI Novice", "AI Observer","AI Consumer"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id={id}
      className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden py-10"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-msblue via-warning to-msblue"></div>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-msaccent/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-lilac/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase sm:tracking-widest text-slate-500 w-full">
        <span className="flex items-center">
          <span className="w-1 h-1 bg-msblue rounded-full mr-2"></span> 3 Days
        </span>
        <span className="flex items-center">
          <span className="w-1 h-1 bg-msblue rounded-full mr-2"></span> 60 Min /
          Day
        </span>
        <span className="flex items-center">
          <span className="w-1 h-1 bg-msblue rounded-full mr-2"></span> One
          Clear Direction
        </span>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="font-heading text-5xl md:text-8xl leading-tight mb-8">
          <span className="block text-slate-900">AI STAKEHOLDER</span>
          <span className="text-gradient-100 font-bold italic">CHALLENGE</span>
        </h1>
        <p className="text-xl md:text-3xl text-slate-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          From{" "}
          <span className="transition-all duration-300 transform bg-lilac p-1 text-dark-blue italic">
            {words[index]}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-msblue">
            Strategic Stakeholder
          </span>{" "}
          in 3 Days
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-left max-w-4xl mx-auto bg-slate-50 p-8 md:p-12 border-l-4 border-msblue shadow-sm">
          <div className="space-y-4">
            <p className="text-lg md:text-xl leading-relaxed text-slate-700">
              Very few leaders use AI.
              <br />
              <span className="font-bold text-msblue">
                Almost none of them govern it.
              </span>
            </p>
            <Button
              variant="secondary"
              onClick={() =>
                document.getElementById("final-call")?.scrollIntoView()
              }
            >
              Join the Top 1%
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-slate-600">
              This challenge is designed for leaders who want to move beyond
              curiosity, tools, and hype to decide how they will actually lead
              in a world where AI already exists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
