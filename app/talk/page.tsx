import TalkForm from "@/components/TalkForm";

export const metadata = {
  title: "Talk to a talent partner — HireFinalists",
  description: "Book a 20-minute call with a HireFinalists talent partner. We'll scope your role, share matching profiles, and walk you through pricing.",
};

const BENEFITS = [
  ["⚡", "20-minute discovery call", "We'll learn what you're hiring for and timezone needs."],
  ["📋", "3 hand-picked profiles", "Within 48 hours we'll send you 3 matching candidates."],
  ["💸", "No commitment", "We don't charge anything until you hire someone."],
];

export default function TalkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        {/* Left: pitch */}
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
            Concierge / Custom Hires
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Tell us what you&apos;re hiring for. We&apos;ll handle the rest.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            For roles that need more than a directory search — leadership hires,
            complex stacks, or full-team builds — our talent partners run the
            entire process for you.
          </p>

          <div className="space-y-5 mb-8">
            {BENEFITS.map(([icon, title, desc]) => (
              <div key={title} className="flex items-start gap-4">
                <div className="text-2xl">{icon}</div>
                <div>
                  <div className="font-semibold text-gray-900">{title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                MR
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">María Rojas</div>
                <div className="text-xs text-gray-500">Head of Talent, HireFinalists</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              &ldquo;We&apos;ve placed senior engineers, designers, and ops leaders
              for 80+ US startups. Tell me what you need — most teams have a
              shortlist within 5 business days.&rdquo;
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <TalkForm />
          </div>
        </div>
      </div>
    </div>
  );
}
