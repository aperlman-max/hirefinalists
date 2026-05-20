import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";

export const metadata = {
  title: "Pricing — HireFinalists",
  description: "Transparent pricing for hiring vetted LATAM contractors. No placement fees, no surprises.",
};

const CONCIERGE = {
  name: "Concierge",
  tagline: "Done-for-you hiring",
  price: 9999,
  description:
    "We run your entire hiring process. You tell us the role, we deliver 3 hand-picked finalists ready to sign — every month, guaranteed.",
  features: [
    "Dedicated talent partner for your account",
    "We define the rubric and run the interviews",
    "Guaranteed 3 hire-ready finalists / month",
    "Replacement guarantee if a contractor leaves in 90 days",
    "Slack channel with your talent partner",
    "Optional payroll & contractor management add-on",
  ],
  ctaHref: "/get-started?plan=concierge",
};

const FAQS = [
  {
    q: "Is there a placement fee when I hire?",
    a: "No. HireFinalists charges a flat monthly subscription. Once you find your contractor through our platform, you hire them directly with no placement fee or percentage of salary.",
  },
  {
    q: "What does 'vetted' actually mean?",
    a: "Every contractor on the platform went through a real technical interview with one of our senior interviewers. We only list candidates who scored above 80/100 and made it to a final-round level. You see their score and interview notes.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Month-to-month subscriptions can be cancelled at any time with no penalty. Annual subscriptions are non-refundable after 30 days.",
  },
  {
    q: "What if I don't find the right person?",
    a: "We add new vetted candidates every week. If you can't find who you need within 30 days, we'll refund your first month.",
  },
  {
    q: "How many contractors are in the directory?",
    a: "Over 5,000 active contractors, with 50–80 new candidates added weekly. You can browse names, titles, skills, and rates for free — contact info is gated behind a subscription.",
  },
  {
    q: "Do contractors need to be in Latin America?",
    a: "Yes, HireFinalists specializes in Latin America. All contractors are based in LATAM with timezones ranging from UTC-3 to UTC-8, making them ideal for US-based teams.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Flat-rate access. No placement fees.
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Subscribe to unlock full profiles and contact info. Hire as many contractors as you want — we never charge a % of salary.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <PricingPlans />
      </section>

      {/* Concierge tier */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-10 sm:p-14 grid md:grid-cols-2 gap-10 items-center shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
              Done-for-You
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{CONCIERGE.name}</h2>
            <p className="text-xl text-slate-300 mb-4">{CONCIERGE.tagline}</p>
            <p className="text-slate-400 leading-relaxed mb-6">{CONCIERGE.description}</p>
            <div className="mb-6">
              <span className="text-5xl font-black">${CONCIERGE.price.toLocaleString()}</span>
              <span className="text-xl text-slate-400 ml-1">/month</span>
            </div>
            <Link
              href={CONCIERGE.ctaHref}
              className="inline-block bg-amber-400 text-slate-900 font-bold px-8 py-3.5 rounded-xl hover:bg-amber-300 transition-colors"
            >
              Talk to a talent partner
            </Link>
          </div>
          <ul className="space-y-3">
            {CONCIERGE.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The math is obvious</h2>
          <p className="text-gray-500 mb-8">Compare HireFinalists to traditional recruiting</p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="text-red-500 font-semibold text-sm mb-3">Traditional Recruiter</div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between"><span>Placement fee (20% of $120k salary)</span><span className="font-bold text-gray-900">$24,000</span></div>
                <div className="flex justify-between"><span>Time-to-hire (avg 45 days)</span><span className="font-bold text-gray-900">~$12,000</span></div>
                <div className="flex justify-between"><span>Screening time (internal eng hours)</span><span className="font-bold text-gray-900">$3,000</span></div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900"><span>Total cost per hire</span><span className="text-red-600">~$39,000</span></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-indigo-200 p-6">
              <div className="text-indigo-600 font-semibold text-sm mb-3">HireFinalists (Professional)</div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between"><span>Monthly subscription</span><span className="font-bold text-gray-900">$799</span></div>
                <div className="flex justify-between"><span>Time-to-hire (avg 5 days)</span><span className="font-bold text-gray-900">~$1,000</span></div>
                <div className="flex justify-between"><span>No placement fee</span><span className="font-bold text-gray-900">$0</span></div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900"><span>Total cost per hire</span><span className="text-green-600">~$1,800</span></div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Save over <span className="font-bold text-gray-900">$37,000 per hire</span> compared to traditional recruiting.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Frequently asked questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Start your free trial today</h2>
          <p className="text-indigo-200 mb-8">7 days free. Cancel anytime. No placement fees, ever.</p>
          <Link
            href="/get-started?plan=professional"
            className="inline-block bg-white text-indigo-700 font-semibold px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
