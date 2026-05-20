import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPETITORS, findCompetitor } from "@/lib/competitors";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const comp = findCompetitor(slug);
  if (!comp) return {};
  return {
    title: `HireFinalists vs ${comp.name} — an honest comparison`,
    description: comp.metaDescription,
    keywords: [
      `${comp.name.toLowerCase()} vs hirefinalists`,
      `${comp.name.toLowerCase()} alternative`,
      `${comp.name.toLowerCase()} competitor`,
      `better than ${comp.name.toLowerCase()}`,
    ],
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comp = findCompetitor(slug);
  if (!comp) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-gray-500 mb-3">
            <Link href="/vs" className="hover:text-gray-900">Comparisons</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{comp.name}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
            HireFinalists <span className="text-gray-400">vs</span> {comp.name}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-2">
            {comp.shortPitch}
          </p>
          <p className="text-sm text-gray-500">
            <strong className="text-gray-700">{comp.name} is best for:</strong> {comp.bestFor}
          </p>
        </div>
      </section>

      {/* Side-by-side */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Side-by-side comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-5 font-semibold text-gray-700 w-32">&nbsp;</th>
                <th className="text-left py-4 px-5 font-semibold text-indigo-700">HireFinalists</th>
                <th className="text-left py-4 px-5 font-semibold text-gray-700">{comp.name}</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Pricing" us="$299–$2,499/month flat. Concierge tier at $9,999/month." them={comp.comparison.pricing} />
              <Row label="Quality / vetting" us="Every contractor interviewed and scored on a 100-point rubric. Score visible on profile." them={comp.comparison.quality} />
              <Row label="Time to hire" us="Browse instantly. Typical time-to-hire: 5 days." them={comp.comparison.speed} />
              <Row label="Geography" us="LATAM-only — UTC-3 to UTC-8 for US overlap." them={comp.comparison.geography} />
              <Row label="Fees" us="No placement fees. No markup. Direct contract with the contractor." them={comp.comparison.fees} />
            </tbody>
          </table>
        </div>
      </section>

      {/* Weaknesses + advantages */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">
              Where {comp.name} falls short for many teams
            </h3>
            <ul className="space-y-2.5">
              {comp.weaknesses.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-500 mt-0.5">⚠</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Why teams pick HireFinalists</h3>
            <ul className="space-y-2.5">
              {comp.ourAdvantages.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* When each one wins */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="font-bold text-gray-900 mb-3 text-lg">Which should you actually pick?</h3>
          <p className="text-gray-700 leading-relaxed text-sm mb-4">
            We won&apos;t tell you HireFinalists is right for every team — it isn&apos;t. Pick {comp.name} if {comp.bestFor.toLowerCase()}
          </p>
          <p className="text-gray-700 leading-relaxed text-sm">
            Pick HireFinalists if you&apos;re building an ongoing team in Latin America,
            want to skip the screening phase, and prefer a flat monthly subscription
            over per-hire fees or markup-based pricing.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-14 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">Try HireFinalists free</h2>
          <p className="text-indigo-200 mb-7">
            Browse 5,000+ vetted contractors. Subscribe only when you find one to hire.
          </p>
          <Link
            href="/contractors"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Browse contractors free
          </Link>
        </div>
      </section>

      {/* Other comparisons */}
      <section className="bg-gray-50 border-t border-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Other comparisons</h3>
          <div className="flex flex-wrap gap-2">
            {COMPETITORS.filter((c) => c.slug !== comp.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/vs/${c.slug}`}
                className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
              >
                HireFinalists vs {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, us, them }: { label: string; us: string; them: string }) {
  return (
    <tr className="border-b border-gray-100 last:border-b-0">
      <td className="py-4 px-5 font-medium text-gray-500 align-top text-xs uppercase tracking-wider">{label}</td>
      <td className="py-4 px-5 text-gray-700 align-top">{us}</td>
      <td className="py-4 px-5 text-gray-700 align-top">{them}</td>
    </tr>
  );
}
