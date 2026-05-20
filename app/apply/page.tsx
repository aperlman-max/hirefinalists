export const metadata = {
  title: "Apply as a Contractor — HireFinalists",
  description: "Apply to join the HireFinalists directory. We only list top-tier contractors who pass our interview process.",
};

const PROCESS = [
  {
    step: "1",
    title: "Submit your application",
    description: "Fill out a short form with your background, skills, and what you're looking for. Takes 5 minutes.",
  },
  {
    step: "2",
    title: "Interview with our team",
    description: "A 60-minute interview with a senior reviewer in your discipline (engineering, design, marketing, sales, finance, ops, etc.). We evaluate skill depth, communication, and English fluency.",
  },
  {
    step: "3",
    title: "Profile goes live",
    description: "Top 20% of applicants get listed. You get a scored profile that employers actually trust — no more competing on price alone.",
  },
  {
    step: "4",
    title: "Employers reach out to you",
    description: "Employers browse and unlock your profile. You get direct inbounds — no middlemen, no bidding wars.",
  },
];

export default function ApplyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          Applications open
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Join the HireFinalists directory
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
          We only list contractors who pass our interview. If you make it in, employers find you — not the other way around.
        </p>
      </div>

      {/* Benefits for contractors */}
      <div className="grid sm:grid-cols-3 gap-5 mb-14">
        {[
          { icon: "💼", title: "High-quality inbounds", desc: "Employers on HireFinalists are paying to find you. They're motivated, serious, and have budget." },
          { icon: "✅", title: "Your work does the talking", desc: "Your interview score is visible. You compete on merit, not on undercutting your rate." },
          { icon: "🚀", title: "It's free to be listed", desc: "We charge employers, not contractors. Getting listed and getting hired costs you nothing." },
        ].map((b) => (
          <div key={b.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">{b.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Process */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How it works</h2>
        <div className="space-y-4">
          {PROCESS.map((p) => (
            <div key={p.step} className="flex gap-5 items-start">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                {p.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-0.5">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Apply now</h2>
        <form className="space-y-5" action="#" method="post">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Costa"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="ana@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL</label>
            <input
              type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value="">Select country</option>
              {["Argentina", "Brazil", "Chile", "Colombia", "Ecuador", "Mexico", "Peru", "Uruguay", "Venezuela", "Bolivia", "Paraguay", "Other LATAM"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary role</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value="">Select role</option>
              {["Software Engineer", "Frontend Engineer", "Backend Engineer", "Full-Stack Engineer", "Mobile Engineer", "DevOps / Platform Engineer", "Data Engineer", "Data Scientist", "ML / AI Engineer", "Product Manager", "UX/UI Designer", "Product Designer", "Engineering Manager", "Growth Marketer", "Sales Engineer", "Customer Success", "Other"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Years of experience</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option>1–2 years</option>
              <option>3–5 years</option>
              <option>6–10 years</option>
              <option>10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Top 5 skills (comma-separated)</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="React, TypeScript, Node.js, PostgreSQL, AWS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Desired hourly rate (USD)</label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="65"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brief bio (2–3 sentences)</label>
            <textarea
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Describe your experience, what you've built, and what kinds of problems you like to solve."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Submit Application
          </button>
          <p className="text-xs text-gray-400 text-center">
            We review applications weekly. You&apos;ll hear back within 5 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
