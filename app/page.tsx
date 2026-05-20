import Link from "next/link";
import { CONTRACTORS } from "@/lib/data";
import NewsletterSignup from "@/components/NewsletterSignup";

const STATS = [
  { value: "5,000+", label: "Vetted contractors" },
  { value: "48h", label: "Avg time to first intro" },
  { value: "94%", label: "Hire rate after intro" },
  { value: "$0", label: "Until you hire" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We interview, you choose",
    description:
      "Every contractor on HireFinalists went through a real technical interview. We only list candidates who made it to the final round — you skip the 90% screening phase.",
  },
  {
    step: "02",
    title: "Search by what matters",
    description:
      "Filter by skill, timezone, availability, rate, and English fluency. See real interview scores, not just self-reported skills.",
  },
  {
    step: "03",
    title: "Unlock and reach out directly",
    description:
      "Subscribe to access full profiles, contact info, and video interview recordings. No middlemen, no placement fees.",
  },
];

const TESTIMONIALS = [
  {
    quote: "We hired a senior Go engineer within 4 days of signing up. The interview scores were accurate — she was exactly as strong as advertised.",
    name: "Marcus Chen",
    title: "CTO, Formstack",
    avatar: "MC",
  },
  {
    quote: "We've been using HireFinalists for 6 months. It replaced our headhunter and saved us $80k in placement fees last year alone.",
    name: "Sarah Okonkwo",
    title: "VP Engineering, Lune",
    avatar: "SO",
  },
  {
    quote: "The quality bar is real. We've hired 3 contractors and all of them are still with us 12+ months later. Insane retention.",
    name: "David Park",
    title: "Founder, Cascade",
    avatar: "DP",
  },
];

export default function HomePage() {
  const featuredContractors = CONTRACTORS.filter((c) => c.interviewScore >= 93).slice(0, 3);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HireFinalists",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hirefinalists.com",
    description:
      "A directory of vetted Latin American contractors — every candidate was an interview finalist at a real company.",
    sameAs: [],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white pt-20 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            147 contractors available this week
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Hire LATAM contractors{" "}
            <span className="text-indigo-600">who already cleared</span>{" "}
            someone&apos;s hiring bar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Engineers, designers, marketers, sales reps, accountants, ops,
            customer success, virtual assistants — every contractor on
            HireFinalists was an interview finalist at a real company. Skip the
            screening and go straight to the hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contractors"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors text-lg shadow-lg shadow-indigo-200"
            >
              Browse 5,000+ Contractors
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/for-employers"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg border border-gray-200 shadow-sm"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted-by logo strip */}
      <section className="py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-center mb-6">
            Trusted by hiring teams at
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-5 items-center justify-items-center">
            {["Lune", "Cascade", "Formstack", "Atrium", "Heliograph", "Northwind"].map((name) => (
              <div
                key={name}
                className="text-gray-400 font-bold text-lg tracking-tight grayscale opacity-70 hover:opacity-100 transition-opacity"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured contractors */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Top-rated this week</h2>
            <p className="text-gray-500">Interview scores of 93+ — the top 10% of applicants</p>
          </div>
          <Link
            href="/contractors"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContractors.map((c) => (
            <Link
              key={c.id}
              href={`/contractors/${c.id}`}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full bg-indigo-50"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{c.title}</p>
                </div>
                <div className="flex-shrink-0 text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                  {c.interviewScore}/100
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {c.city}, {c.country}
                </span>
                <span className="font-semibold text-gray-900">${c.monthlyRate.toLocaleString()}/mo</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How HireFinalists works</h2>
            <p className="text-gray-500 text-lg">
              From browse to hired in days, not months.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-4xl font-black text-indigo-100 mb-4">{step.step}</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by engineering teams</h2>
          <p className="text-gray-500">Companies using HireFinalists hire 6x faster and save on placement fees.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-5">
              <p className="text-gray-700 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / lead magnet */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <NewsletterSignup variant="card" />
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your next great hire is already vetted.
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Start browsing for free. Unlock contact details when you&apos;re ready to hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contractors"
              className="inline-flex items-center justify-center bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-lg"
            >
              Browse Contractors Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-400 transition-colors text-lg border border-indigo-400"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
