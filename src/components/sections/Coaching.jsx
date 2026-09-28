import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import CurrencyToggle from "@/components/global/CurrencyToggle";
import CurrencyPrice from "@/components/global/CurrencyPrice";
import {
  COACHING_CALL_NOTE,
  COACHING_CALL_URL,
  COACHING_FACTS as FACTS,
  COACHING_PLANS as PLANS,
} from "@/lib/coaching";

export default function Coaching() {
  return (
    <div className="bg-dark-blue text-white">
      <Section id="coaching" spacing="loose">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
          {/* Content */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
              AI Stakeholder Coaching
            </p>
            <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
              The Roadmap tells you <br className="hidden lg:block" />
              where to go. <br />
              For some leaders, <br className="hidden lg:block" />
              the guide matters more <br className="hidden lg:block" /> than the
              map.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">
              The 6-Month Roadmap runs in three phases over 180 days: AI Clarity
              and Labs, Implementation and Relationships, then Governance and
              Mandate. Most leaders do not want to navigate that alone.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
              The AI Stakeholder Coaching Program opens with the challenge
              delivered to you privately, then continues as live group
              coaching: three Saturday sessions a month, alongside leaders
              executing their own Roadmaps. Your questions get answered
              directly, and your thinking sharpens as you watch other leaders
              navigate the same phases. Your fluency compounds. The territory
              you discovered in the challenge gets built.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px bg-white/8">
              {FACTS.map((f) => (
                <div key={f.label} className="bg-dark-blue px-5 py-6">
                  <p className="font-ptsans text-3xl font-bold leading-none text-white">
                    {f.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-white/35">
              Coaching includes the AI Stakeholder Challenge at no additional
              fee. If you already know you want a guide through the roadmap,
              this is the more complete path.
            </p>
            <Link
              href="/coaching"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-lilac transition-colors hover:text-white"
            >
              See how coaching works
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Pricing panel */}
          <div className="flex flex-col">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                Pricing
              </p>
              {/* <CurrencyToggle dark={true} /> */}
            </div>

            <div className="flex flex-col gap-px bg-white/8">
              {PLANS.map((p) => (
                <div key={p.period} className="bg-dark-blue p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-white/55">{p.period}</span>
                    <CurrencyPrice
                      {...p.price}
                      className="font-ptsans text-2xl font-bold leading-none text-white"
                    />
                  </div>
                  {p.note && (
                    <p className="mt-1.5 text-xs text-white/25">{p.note}</p>
                  )}
                </div>
              ))}
            </div>

            <Button
              href={COACHING_CALL_URL}
              variant="primary"
              className="mt-6 w-full justify-center py-3 font-semibold"
            >
              Start with Coaching
            </Button>
            <p className="mt-3 text-center text-xs text-white/25">
              {COACHING_CALL_NOTE}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
