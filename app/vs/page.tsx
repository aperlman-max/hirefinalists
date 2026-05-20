import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors";

export const metadata = {
  title: "HireFinalists vs alternatives — comparisons",
  description: "Honest comparisons between HireFinalists and Toptal, Upwork, Deel, RemoteLatinos, and other hiring platforms. Pick what's right for your team.",
};

export default function ComparisonsIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">How HireFinalists compares</h1>
        <p className="text-lg text-gray-500">
          Honest side-by-side comparisons. We&apos;ll tell you when a competitor is the better fit.
        </p>
      </header>
      <div className="space-y-4">
        {COMPETITORS.map((c) => (
          <Link
            key={c.slug}
            href={`/vs/${c.slug}`}
            className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
              HireFinalists vs {c.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-1">{c.shortPitch}</p>
            <p className="text-sm text-gray-400">
              Best for: {c.bestFor}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
