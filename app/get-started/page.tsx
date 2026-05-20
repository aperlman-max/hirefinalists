"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const PLAN_DETAILS = {
  starter: { name: "Starter", price: "$299/month", trial: "7-day free trial" },
  professional: { name: "Professional", price: "$799/month", trial: "7-day free trial" },
  enterprise: { name: "Enterprise", price: "$2,499/month", trial: "7-day free trial" },
  concierge: { name: "Concierge", price: "$9,999/month", trial: "Talk to a talent partner" },
};

function GetStartedForm() {
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") ?? "professional") as keyof typeof PLAN_DETAILS;
  const plan = PLAN_DETAILS[planKey] ?? PLAN_DETAILS.professional;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-xl font-bold tracking-tight text-gray-900">
            Hire<span className="text-indigo-600">Finalists</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="bg-indigo-50 rounded-xl p-4 mb-6 flex justify-between items-center">
            <div>
              <div className="font-semibold text-gray-900">{plan.name} Plan</div>
              <div className="text-sm text-gray-500">{plan.trial}</div>
            </div>
            <div className="font-bold text-indigo-600">{plan.price}</div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Start your free trial</h1>
          <p className="text-gray-500 text-sm mb-6">
            7 days free — no charge until your trial ends. Cancel anytime.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Work email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting to checkout..." : "Continue to payment"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
            {[
              "7-day free trial, cancel anytime",
              "Secure checkout powered by Stripe",
              "No placement fees — ever",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing you agree to our{" "}
          <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense>
      <GetStartedForm />
    </Suspense>
  );
}
