"use client";

import { useState } from "react";

type Variant = "inline" | "card";

export default function NewsletterSignup({ variant = "card" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={status === "success" || status === "loading"}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success" || !email}
          className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
        >
          {status === "loading" ? "Sending..." : status === "success" ? "✓ Subscribed" : "Get the guide"}
        </button>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </form>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="text-3xl mb-3">📘</div>
      <h3 className="font-bold text-gray-900 text-xl mb-2">
        Free guide: The LATAM Hiring Playbook
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">
        A 24-page PDF covering rates, contracts, timezones, payroll, and the full interview playbook we use to vet every contractor on the platform. Free, no strings attached.
      </p>
      {status === "success" ? (
        <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-3 rounded-lg">
          ✓ Check your inbox — the guide is on the way.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            disabled={status === "loading"}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm"
          >
            {status === "loading" ? "Sending..." : "Send me the guide"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-xs text-gray-400 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}
