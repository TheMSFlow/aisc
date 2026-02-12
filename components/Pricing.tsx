import React, { useState } from "react";
import Button from "./Button";
import Tooltip from "./Tooltip";

const TIERS = [
  {
    name: "General Admission",
    usd: 99,
    ngn: 120000,
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=general-admission",
    isPopular: false,
    features: [
      {
        label: "3-Day Live Sprint",
        info: "Three consecutive live sessions focused on transforming leaders to AI stakeholders.",
      },
      {
        label: "All assignments",
        info: "Leaders will have access to all the post-session tasks and assignments",
      },
      {
        label: "Access to resources",
        info: "You’ll receive supporting resources that enable execution of your tasks and ultimately the 6-month AI Stakeholder Roadmap.",
      },
      {
        label: "Post-Challenge Project",
        info: "Capstone exercise representing your AI Stakeholer roadmap for the next 6 months and beyond.",
      },
      {
        label: "Peer-to-peer reflection (optional)",
        info: "Peer reflection helps participants sharpen their own thinking by observing clarity in others. It is not a review mechanism. Participation is optional and feedback is anonymized.",
      },
      {
        label: "Project Review Option",
        info: "You have the option to pay $200 / N200,000 for a VIP project submission, review and strategy session.",
      },
      {
        label: "Community access",
        info: "Private whatsapp group for reflection and awareness.",
      },
    ],
  },
  {
    name: "VIP (Only 10 seats)",
    usd: 399,
    ngn: 520000,
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=vip",
    isPopular: true,
    note: "VIP access is about decision confidence, not additional content.",
    features: [
      {
        label: "Everything in General Admission",
        info: "Includes the full General Admission experience.",
      },
      {
        label: "7-day private access",
        info: "Private feedback focused on your specific decisions and context.",
      },
      {
        label: "Pre-session Q&A",
        info: "10 VIP participants get to ask one question each in a more accessible setting, 1hr before the general session.",
      },
      {
        label: "Project Review & Feedback",
        info: "30mins private strategy session and assessment of your 6-month stakeholder mandate.",
      },
    ],
  },
  {
    name: "Private Viewing (Upgrade)",
    usd: 100,
    ngn: 135000,
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=private-viewing",
    isPopular: false,
    note: "Only available to General Admission, in the AISC learning center.",
    available: false,
    features: [
      {
        label: "Everything in General Admission",
        info: "Includes the full General Admission experience.",
      },
      {
        label: "Pre-session private viewing",
        info: "Observe VIP questions get answered without active participation, 1hr before the general sessions.",
      },
      {
        label: "Project Review Option",
        info: "You have the option to pay $300 / N350,000 for a VIP project submission, review and strategy session.",
      },
    ],
  },
];

export const Pricing = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState<"individuals" | "enterprise">(
    "individuals",
  );

  return (
    <section id={id} className="bg-lilac py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl md:text-6xl text-dark-blue mb-6 uppercase">
            Choose your level of support
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-20">
          <div className="bg-white/50 p-1 rounded-sm border border-slate-200 flex shadow-sm">
            <button
              onClick={() => setActiveTab("individuals")}
              className={`px-8 py-3 font-heading text-lg uppercase transition-all ${
                activeTab === "individuals"
                  ? "bg-msblue text-white shadow-md"
                  : "text-slate-500 hover:text-msblue"
              }`}
            >
              For Individuals
            </button>
            <button
              onClick={() => setActiveTab("enterprise")}
              className={`px-8 py-3 font-heading text-lg uppercase transition-all ${
                activeTab === "enterprise"
                  ? "bg-msblue text-white shadow-md"
                  : "text-slate-500 hover:text-msblue"
              }`}
            >
              For Enterprise
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {TIERS.map((tier, i) => {
            const isPopular = tier.isPopular;

            return (
              <div
                key={i}
                className={[
                  "relative flex flex-col p-6 md:p-10 border transition-all duration-500 rounded-sm",
                  isPopular
                    ? "bg-msblue text-white border-msblue shadow-2xl lg:scale-[1.03] z-10"
                    : "bg-slate-50 border-slate-200 text-slate-700",
                ].join(" ")}
              >
                {/* Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-100 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest">
                    {activeTab === "enterprise" ? "Boardroom" : "Best Value"}
                  </div>
                )}

                {/* Tier name */}
                <h3 className="font-heading text-2xl md:text-3xl mb-6 min-h-[4rem] flex items-center uppercase tracking-tight">
                  {activeTab === "enterprise" && tier.name.startsWith("VIP")
                    ? "VIP & C-SUITE"
                    : tier.name}
                </h3>

                {/* Price */}
                <div
                  className={`mb-10 pb-8 border-b ${isPopular ? "border-white/20" : "border-slate-200"}`}
                >
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl md:text-5xl font-bold">
                      ${tier.usd}
                    </span>
                    <span className="ml-2 opacity-70 text-sm font-bold">
                      USD
                    </span>
                  </div>
                  <div className="text-lg opacity-70">
                    ₦{tier.ngn.toLocaleString()}
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-5 mb-10">
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`font-bold ${isPopular ? "text-warning" : "text-msblue"}`}
                        >
                          ✓
                        </span>
                        <span className="text-lg leading-snug font-light">
                          {feature.label}
                        </span>
                      </div>

                      <Tooltip content={feature.info} />
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {tier.note && (
                  <p className={`text-xs italic mb-6 opacity-70`}>
                    {tier.note}
                  </p>
                )}

                {/* CTA - Hidden for Enterprise */}
                {activeTab === "individuals" && (
                  <Button
                    as="a"
                    href={tier.available === false ? undefined : tier.href}
                    variant={
                      tier.available === false
                        ? "tertiary"
                        : isPopular
                          ? "secondary"
                          : "tertiary"
                    }
                    disabled={tier.available === false}
                    className="w-full text-nowrap"
                  >
                    {tier.available === false
                      ? "Not Yet Available"
                      : "Secure Your Spot"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Enterprise Specific CTA button under the grid */}
        {activeTab === "enterprise" && (
          <div className="mt-12 flex justify-center animate-fade-in">
            <Button
              onClick={() => {
                window.location.href =
                  "mailto:sales@michaelsteve.com?subject=Enterprise AISC Inquiry";
              }}
              variant="secondary"
              className="px-12 scale-110"
            >
              Contact Sales
            </Button>
          </div>
        )}

        {/* Custom / Private Challenge Section (Bottom Block) */}
        <div className="mt-24 border-l-8 border-warning shadow-2xl animate-fade-in bg-dark-blue text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-msblue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="w-full px-6 py-16 md:py-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h3 className="font-heading text-3xl md:text-5xl uppercase tracking-tight">
                {activeTab === "individuals"
                  ? "Request A Private Challenge"
                  : "AI Transformation As A Unit"}
              </h3>

              <div className="space-y-6 max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
                  {activeTab === "enterprise"
                    ? "For enterprise teams, this can be used as an employee engagement and alignment experience around AI. For social groups and other organizations, it is delivered as a synchronized experience aligned around a shared goal."
                    : "Designed for enterprise, organizations, leadership teams, and high-trust groups who want alignment, clarity, and decision confidence around AI, together."}
                </p>

                <p className="text-sm md:text-base text-slate-300 italic">
                  This is not a scaled version of the public challenge. It is
                  the same foundational experience, delivered privately to
                  support alignment as a unit and build collective confidence
                  without external noise.
                </p>
              </div>

              {/* Eligibility */}
              <div className="pt-4">
                <p className="text-xs uppercase tracking-[0.4em] text-lilac-hover font-bold mb-8">
                  Eligibility & Scale Options
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
                  <div className="p-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors group">
                    <p className="text-xs uppercase tracking-widest text-lilac-hover font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      Option A: Multi-Tier Hybrid
                    </p>
                    <p className="text-xl font-light">
                      A minimum of <strong>5 VIP Seats</strong> combined with{" "}
                      <strong>10+ General Admission</strong> seats.
                    </p>
                  </div>
                  <div className="p-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors group">
                    <p className="text-xs uppercase tracking-widest text-lilac-hover font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      Option B: VIP Intensive
                    </p>
                    <p className="text-xl font-light">
                      A baseline of <strong>10 VIP Seats</strong> with
                      no upper cap on enrollment.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-10 font-light">
                  If your organization or high-trust group meets either
                  condition, the challenge is delivered as a private,
                  synchronized experience focused on your unique strategic
                  goals.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button
                  onClick={() => {
                    window.location.href =
                      "mailto:sales@michaelsteve.com?subject=Private AISC Request";
                  }}
                  variant="outline"
                  className="!text-white !border-white hover:!bg-white hover:!text-dark-blue px-12"
                >
                  Contact Sales
                </Button>
                <p className="mt-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Expect a response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
