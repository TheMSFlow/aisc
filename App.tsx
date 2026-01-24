import React, { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { AuthorityShift } from "./components/AuthorityShift";
import { Experience } from "./components/Experience";
import { Project } from "./components/Project";
import { Payoff } from "./components/Payoff";
import { FilterSection } from "./components/FilterSection";
import { Pricing } from "./components/Pricing";
import { SeriousNotes } from "./components/SeriousNotes";
import { FinalCall } from "./components/FinalCall";
import { Navigation } from "./components/Navigation";
import { AIPreviewTool } from "./components/AIPreviewTool";
import { Faq } from "./components/Faq";

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />

      <main>
        <Hero id="orientation" />
        <Problem id="reframe" />
        <AuthorityShift id="authority" />
        <FilterSection id="is-is-not" />
        <Experience id="experience" />
        <Project id="project" />
        <Payoff id="payoff" />
        <Pricing id="pricing" />
        <FinalCall id="final-call" />

        {/* Interactive Tool using Gemini API concept */}
        <section className="bg-msaccent py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl text-msblue uppercase mb-4">
                While Waiting for the Challenge...
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Get a leadership-first perspective on your current AI
                pain-point.
              </p>
            </div>
            <AIPreviewTool />
          </div>
        </section>
      </main>
      <Faq id="faq" />
      <footer className="bg-dark-blue text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center ">
          <img
          className='mx-auto pb-2'
            src="/aisc_clean.svg"
            alt="AISC logo"
            style={{ width: "48px" }}
          />
          <p className="font-heading text-xl tracking-widest opacity-60 mb-4">
            AI STAKEHOLDER CHALLENGE
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Michael Steve Clarity Studio. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
