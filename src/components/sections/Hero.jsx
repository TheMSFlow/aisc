"use client";

import { useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";

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
        {/* One column (founder, 2026-11-20). The Awakening slideshow left the
            hero that day: a video will take a place here when it is ready.
            SlideShow is kept in components/awakening, not deleted. */}
        <div className="flex flex-col gap-10">
          {/* On large screens the question runs the full width with no line
              breaks; the rotating word keeps the width of the longest word,
              so the line never jumps (founder, 2026-11-20). */}
          <h1 className="font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl xl:text-6xl">
            How will you respond when your{" "}
            <RotatingWord words={AUDIENCE_WORDS} /> <br className="lg:hidden" />
            asks you about AI?
          </h1>

          <div className="flex flex-col gap-8">
            <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-white/55 lg:text-base">
              <p>
                That question is where it starts. AI is changing how work gets
                done and how value is created, and the people who trust you
                will look to you to lead them through it. The AI Stakeholder
                Challenge gives you a clear position on AI and the mandate to safely
                take them from uncertainty to clarity and prosperity.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="max-w-md text-xs italic leading-relaxed text-white/45 lg:text-sm">
                Take it privately, one-on-one, fitted to your calendar or grow
                into it alongside other leaders in the next cohort.
              </p>
              <div className="flex flex-row flex-wrap items-center gap-3">
                <Button
                  href="/clarity-call"
                  variant="primary"
                  className="px-7 py-3 text-sm font-semibold"
                >
                  Secure 1:1 Access
                </Button>
                <Button
                  href="#pricing"
                  variant="secondary"
                  className="px-7 py-3 text-sm font-semibold"
                >
                  Join the Next Cohort
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
