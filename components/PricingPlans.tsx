"use client";

import { useState } from "react";
import Link from "next/link";

type Plan = {
  key: string;
  name: string;
  monthly: number;
  description: string;
  highlight: boolean;
  features: string[];
  cta: string;
  trial: string;
};

const PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    monthly: 299,
    description: "For small teams making their first LATAM hire.",
    highlight: false,
    features: [
      "Access to full contractor profiles",
      "Up to 10 profile unlocks per month",
      "Direct email contact",
      "Search & filter all 5,000+ contractors",
      "48-hour response SLA",
    ],
    cta: "Start Free Trial",
    trial: "7-day free trial",
  },
  {
    key: "professional",
    name: "Professional",
    monthly: 799,
    description: "For growing teams hiring 2–5 contractors per quarter.",
    highlight: true,
    features: [
      "Everything in Starter",
      "Unlimited profile unlocks",
      "Phone + LinkedIn access",
      "Video interview recordings",
      "Detailed interview notes",
      "Slack support channel",
      "New candidate alerts",
    ],
    cta: "Start Free Trial",
    trial: "7-day free trial",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    monthly: 2499,
    description: "For companies scaling a distributed LATAM team.",
    highlight: false,
    features: [
      "Everything in Professional",
      "Up to 5 team seats",
      "Dedicated account manager",
      "Custom talent sourcing requests",
      "Priority access to new candidates",
      "API access",
      "Monthly hiring strategy call",
    ],
    cta: "Start Free Trial",
    trial: "7-day free trial",
  },
];

const ANNUAL_DISCOUNT = 0.2;

export default function PricingPlans() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 rounded-full p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full transition-colors ${
              billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={`px-5 py-2 rounded-full transition-colors flex items-center gap-2 ${
              billing === "annual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Annual
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {PLANS.map((plan) => {
          const displayMonthly =
            billing === "annual"
              ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT))
              : plan.monthly;
          const annualTotal = displayMonthly * 12;
          const ctaHref = `/get-started?plan=${plan.key}&billing=${billing}`;

          return (
            <div
              key={plan.key}
              className={`rounded-2xl p-8 border flex flex-col ${
                plan.highlight
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-200 scale-105"
                  : "bg-white border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full w-fit mb-4">
                  MOST POPULAR
                </div>
              )}
              <h2 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h2>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>
                {plan.description}
              </p>
              <div className="mb-2">
                <span className={`text-5xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  ${displayMonthly.toLocaleString()}
                </span>
                <span className={`text-lg ml-1 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>
                  /month
                </span>
              </div>
              <div className={`text-xs mb-6 h-4 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>
                {billing === "annual"
                  ? `Billed annually — $${annualTotal.toLocaleString()}/yr`
                  : "Billed monthly"}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-indigo-200" : "text-green-500"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.highlight ? "text-indigo-100" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                  plan.highlight
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {plan.cta}
              </Link>
              <p className={`text-xs text-center mt-3 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>
                {plan.trial}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
