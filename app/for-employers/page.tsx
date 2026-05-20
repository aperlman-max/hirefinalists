import Link from "next/link";

export const metadata = {
  title: "For Employers — HireFinalists",
  description: "Hire pre-vetted LATAM engineers, designers, and PMs who were interview finalists. Skip screening, go straight to hiring.",
};

const BENEFITS = [
  {
    icon: "⚡",
    title: "Skip 90% of the process",
    description: "We've already done the hard part — sourcing, vetting, and interviewing. Every contractor in our directory was a finalist in a real interview process.",
  },
  {
    icon: "🎯",
    title: "Real interview scores, not vibes",
    description: "See exactly how each candidate performed: technical depth, communication, problem-solving, and culture fit — scored on a 100-point rubric.",
  },
  {
    icon: "⏱️",
    title: "Hire in days, not months",
    description: "Our average time from first profile view to signed contract is 5 days. No recruiters, no scheduling loops, no intermediaries.",
  },
  {
    icon: "💰",
    title: "No placement fees. Ever.",
    description: "Traditional recruiters charge 20%+ of first-year salary. HireFinalists charges a flat monthly subscription. Hire 10 people and still pay the same rate.",
  },
  {
    icon: "🕐",
    title: "Overlapping timezones",
    description: "All contractors are in LATAM — UTC-3 to UTC-8. That's perfect overlap with US teams. No async-only communication.",
  },
  {
    icon: "🌎",
    title: "Top talent, competitive rates",
    description: "LATAM has world-class engineers and designers. At $2,000–$5,000/month for senior-level talent, it's 60–80% below US market rates for equivalent skill.",
  },
];

const CASE_STUDIES = [
  {
    company: "Cascade (Series A, 85 employees)",
    result: "Hired 3 senior engineers in 12 days",
    detail: "Replaced a $180k annual recruiter contract with a $799/month HireFinalists subscription. Saved $178k in year one.",
    initials: "CA",
  },
  {
    company: "Lune (Pre-revenue, 12 employees)",
    result: "Built full-stack team in 30 days",
    detail: "Hired a frontend engineer, data engineer, and product designer. All still with the company after 14 months.",
    initials: "LU",
  },
  {
    company: "Formstack (Enterprise, 400+ employees)",
    result: "Reduced time-to-hire from 67 to 9 days",
    detail: "Used HireFinalists for a 6-month LATAM expansion hiring push. Onboarded 8 contractors with zero mis-hires.",
    initials: "FS",
  },
];

export default function ForEmployersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            For Hiring Managers, Founders &amp; Ops Leaders
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Stop interviewing people<br />who can&apos;t pass your bar.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every contractor on HireFinalists — across engineering, design,
            marketing, sales, ops, finance, customer success, and more — was
            already a finalist in a real interview. You review their score,
            watch their recording, and reach out directly. No screening calls
            needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contractors"
              className="inline-flex items-center justify-center bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-400 transition-colors text-lg"
            >
              Browse Contractors Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-lg border border-white/20"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-20 px-6 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The hiring funnel is broken</h2>
          <div className="space-y-4">
            {[
              ["📄", "You post a job", "500 applicants in 72 hours. Most are not qualified."],
              ["📞", "You screen resumes", "45 hours of engineering time. Down to 20 candidates."],
              ["🎙️", "You run phone screens", "8 calls. 6 hours. Down to 8."],
              ["💻", "You run technical interviews", "8 interviews. 32 engineering-hours. Down to 2."],
              ["🤝", "You make an offer", "1 accepts. 45+ days later. $20–40k in eng time cost."],
            ].map(([icon, step, desc]) => (
              <div key={step} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-amber-100">
                <span className="text-2xl">{icon}</span>
                <div>
                  <span className="font-semibold text-gray-900">{step} — </span>
                  <span className="text-gray-600 text-sm">{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-indigo-800 font-medium text-center">
              With HireFinalists, you skip straight to the last step — except the candidates are already vetted.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why teams choose HireFinalists</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What teams are saying</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.company} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4">
                  {cs.initials}
                </div>
                <p className="text-sm text-gray-500 mb-2">{cs.company}</p>
                <p className="font-bold text-gray-900 text-lg mb-3">{cs.result}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{cs.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to hire your next great contractor?</h2>
          <p className="text-gray-500 text-lg mb-8">Browse for free. Start a trial when you find someone you like.</p>
          <Link
            href="/contractors"
            className="inline-block bg-indigo-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-indigo-700 transition-colors text-lg shadow-lg shadow-indigo-200"
          >
            Browse Contractors Now
          </Link>
        </div>
      </section>
    </div>
  );
}
