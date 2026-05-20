"use client";

import { useState } from "react";

const ROLES = [
  "Software Engineer",
  "Engineering Manager / Lead",
  "Product Designer",
  "Product Manager",
  "Data Engineer / Scientist",
  "ML / AI Engineer",
  "Growth Marketer",
  "SDR / Sales Rep",
  "Customer Success",
  "Operations / Finance",
  "Full team build",
  "Other / multiple roles",
];

const BUDGETS = [
  "$2k–$3k / month",
  "$3k–$5k / month",
  "$5k+ / month",
  "Full-time team budget",
  "Not sure yet",
];

const TIMELINES = [
  "ASAP (this week)",
  "Within 30 days",
  "Within 60–90 days",
  "Just exploring",
];

export default function TalkForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: payload.email, source: "talk", details: payload }),
      });
      if (res.ok) setStatus("success");
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Got it.</h2>
        <p className="text-gray-600 leading-relaxed">
          A talent partner will reach out within one business day to book your
          intro call. Watch for an email from <strong>talent@hirefinalists.com</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Tell us about the role</h2>
      <p className="text-sm text-gray-500 mb-6">
        Takes 90 seconds. We&apos;ll email you within one business day.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field name="name" label="Your name" placeholder="Jane Doe" required />
          <Field name="company" label="Company" placeholder="Acme Inc." required />
        </div>
        <Field name="email" label="Work email" type="email" placeholder="you@company.com" required />
        <Select name="role" label="Role to hire" options={ROLES} required />
        <Select name="budget" label="Approximate budget" options={BUDGETS} required />
        <Select name="timeline" label="Timeline" options={TIMELINES} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Anything else we should know?
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Tech stack, stage, team size, any specifics..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Request a call"}
        </button>
        <p className="text-xs text-gray-400 text-center">
          No spam. We&apos;ll only reach out about this specific request.
        </p>
      </form>
    </>
  );
}

function Field({
  name, label, placeholder, type = "text", required = false,
}: { name: string; label: string; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}

function Select({
  name, label, options, required = false,
}: { name: string; label: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      >
        <option value="" disabled>Select...</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
