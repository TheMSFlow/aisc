import React from "react";
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
        label: "Community access",
        info: "Private whatsapp group for reflection and awareness, not constant discussion or noise.",
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
        label: "1-month Intelligence Center Access",
        info: "You’ll receive access to supporting resources that enable execution of your 6-month AI Stakeholder Roadmap.",
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
        info: "30mins private strategy session and validation of your 6-month stakeholder mandate.",
      },
      {
        label: "3-month Intelligence Center Access",
        info: "You’ll receive access to supporting resources that enable execution of your 6-month AI Stakeholder Roadmap.",
      },
    ],
  },
  {
    name: "Private Viewing (Upgrade)",
    usd: 100,
    ngn: 100000,
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=private-viewing",
    isPopular: false,
    note: "Opportunity for an upgrade will be announced a few days before the challenge.",
    available: false,
    features: [
      {
        label: "Everything in General Admission",
        info: "Includes the full General Admission experience.",
      },
      {
        label: "Pre-session private viewing",
        info: "Observe live strategic discussions without active participation, 1hr before the general sessions.",
      },
      {
        label: "Project Review Option",
        info: "You have the option to pay $100 / N100,000 for a VIP project submission, review and strategy session.",
      },
      {
        label: "2-month Intelligence Center Access",
        info: "You’ll receive access to supporting resources that enable execution of your 6-month AI Stakeholder Roadmap.",
      },
    ],
  },
];

export const Pricing: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="bg-lilac py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-6xl text-dark-blue mb-6 uppercase">
            Choose your level of support
          </h2>
          <div className="flex flex-col-reverse gap-1 items-center justify-center">
            <p className="text-sm text-slate-500 font-light">
              Community Center access after payment
            </p>
            <img
              src="/paystack.webp"
              alt="Paystack Secure Payment"
              style={{ width: "150px" }}
            />
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
                  "relative flex flex-col p-6 md:p-10 border transition-all",
                  isPopular
                    ? "bg-msblue text-white border-msblue shadow-2xl scale-[1.03]"
                    : "bg-slate-50 border-slate-200 text-slate-700",
                ].join(" ")}
              >
                {/* Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-100 text-white px-6 py-1 text-xs font-bold uppercase tracking-widest">
                    Best Value
                  </div>
                )}

                {/* Tier name */}
                <h3 className="font-heading text-2xl md:text-3xl mb-6 min-h-[4rem] flex items-center">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mb-10 pb-8 border-b border-white/20">
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl md:text-5xl font-bold">
                      ${tier.usd}
                    </span>
                    <span className="ml-2 opacity-70 text-sm">USD</span>
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
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-warning">✓</span>
                        <span className="text-lg leading-snug">
                          {feature.label}
                        </span>
                      </div>

                      <Tooltip content={feature.info} />
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {tier.note && (
                  <p className="text-xs italic opacity-70 mb-6">{tier.note}</p>
                )}

                {/* CTA */}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
