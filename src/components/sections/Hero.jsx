"use client";

import { useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import SlideShow from "@/components/awakening/SlideShow";

const AUDIENCE_WORDS = ["Boss", "Congregation", "Following", "Audience", "Staff", "Student"];

function RotatingWord({ words, interval = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    // Grid-stack technique: every word occupies the same cell, so the grid
    // track sizes to the widest word and the box never changes dimensions
    // as words rotate (the rotating word alone used to force jumpy <br /> wrapping).
    <span className="inline-grid text-warning">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <div className="bg-dark-blue text-white">
      <Section id="hero" spacing="hero">
        {/* Two-column: copy left, briefing right */}
        <div className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16 xl:gap-20 items-center">
          {/* Left — headline + body + CTA */}
          <div className="flex flex-col justify-between gap-10 lg:py-2">
            <div>
              <h1 className="font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-4xl xl:text-5xl">
                How will you respond when your {" "}
                <RotatingWord words={AUDIENCE_WORDS} /> <br />
                asks you about AI?
              </h1>

              <p className="mt-8 max-w-lg text-sm lg:text-base leading-relaxed text-white/55">
                In seven days, you won't just have the right answer. You'll have
                the clarity, the readiness, and the value to back it up. <br />
                This engagement is for leaders with{" "}
                <strong className="text-lilac">Responsibility</strong>,{" "}
                <strong className="text-lilac">Influence</strong>, and access to{" "}
                <strong className="text-lilac">Resources</strong>.
              </p>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-4">
              <Button
                href="#pricing"
                variant="primary"
                className="px-8 py-3 text-sm font-semibold"
              >
                Secure Your Spot
              </Button>
              <a
                href="#awakening"
                className="text-sm text-lilac/50 transition-colors hover:text-lilac"
              >
                Read The Awakening →
              </a>
            </div>
          </div>

          {/* Right — The Awakening briefing */}
          <div id="awakening" className="w-full">
            <SlideShow />
          </div>
        </div>
      </Section>
    </div>
  );
}
