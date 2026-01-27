import React from "react";

interface NavigationProps {
  isScrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  return (
    <nav
      className={`z-50 transition-all duration-300 transform ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md py-4"
          : "hidden bg-dark-blue py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a
          href="#orientation"
          className={`flex items-center transition-colors duration-300 ${
            isScrolled ? "text-msblue" : "text-white"
          }`}
        >
          {/* TEXT LOGO — md and up */}
          <span className="hidden xs:block font-heading text-lg md:text-2xl tracking-tighter">
            AI STAKEHOLDER <span className="font-bold">CHALLENGE</span>
          </span>

          {/* IMAGE LOGO — sm and below */}
          <img
            src="/aisc_clean.svg"
            alt="AI Stakeholder Challenge"
            className="block xs:hidden h-8 w-auto"
          />
        </a>

        <div className="flex space-x-8 items-center font-medium text-sm uppercase tracking-widest">
          <a
            href="#experience"
            className={`${
              isScrolled
                ? "text-msblue hover:text-warning"
                : "text-white hover:text-warning"
            } transition-colors font-medium hidden md:block`}
          >
            Curriculum
          </a>

          <a
            href="#pricing"
            className={`${
              isScrolled
                ? "text-msblue hover:text-warning"
                : "text-white hover:text-warning"
            } transition-colors font-medium hidden md:block`}
          >
            Pricing
          </a>

          <a
            href="#final-call"
            className={`${
              isScrolled
                ? "text-msblue hover:text-warning border-msblue hover:border-warning"
                : "text-white hover:text-warning hover:border-warning"
            } border-2 px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 font-narrow`}
          >
            Join the top 1%
          </a>
        </div>
      </div>
    </nav>
  );
};
