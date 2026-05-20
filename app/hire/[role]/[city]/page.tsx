import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ROLES,
  CITIES,
  findRole,
  findCity,
  allLandingSlugs,
  contractorsForRoleAndCity,
  type RoleDef,
} from "@/lib/landing";

type Props = { params: Promise<{ role: string; city: string }> };

export async function generateStaticParams() {
  return allLandingSlugs();
}

export async function generateMetadata({ params }: Props) {
  const { role: roleSlug, city: citySlug } = await params;
  const role = findRole(roleSlug as RoleDef["slug"]);
  const city = findCity(citySlug);
  if (!role || !city) return {};
  const title = `Hire ${role.plural} in ${city.city}, ${city.country} — HireFinalists`;
  return {
    title,
    description: role.description(city.city, city.country).slice(0, 160),
    keywords: [
      `hire ${role.label.toLowerCase()} ${city.city.toLowerCase()}`,
      `${role.label.toLowerCase()} ${city.city.toLowerCase()}`,
      `remote ${role.label.toLowerCase()} ${city.country.toLowerCase()}`,
      `${city.country.toLowerCase()} ${role.label.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description: role.description(city.city, city.country).slice(0, 200),
    },
  };
}

export default async function HireLandingPage({ params }: Props) {
  const { role: roleSlug, city: citySlug } = await params;
  const role = findRole(roleSlug as RoleDef["slug"]);
  const city = findCity(citySlug);
  if (!role || !city) notFound();

  const matches = contractorsForRoleAndCity(role, city);
  const sampleMonthly =
    matches.length > 0
      ? [
          Math.min(...matches.map((c) => c.monthlyRate)),
          Math.max(...matches.map((c) => c.monthlyRate)),
        ]
      : [4500, 12000];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${role.plural} in ${city.city}, ${city.country}`,
    itemListElement: matches.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/contractors/${c.id}`,
      name: c.name,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-gray-500 mb-3">
            <Link href="/contractors" className="hover:text-gray-900">All contractors</Link>
            <span className="mx-2">/</span>
            <Link href={`/hire/${role.slug}`} className="hover:text-gray-900">{role.plural}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{city.city}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
            Hire vetted {role.plural.toLowerCase()} in {city.city}, {city.country}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mb-8">
            {role.description(city.city, city.country)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-2">
            <Link
              href="/contractors"
              className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors text-lg shadow-lg shadow-indigo-200"
            >
              Browse {matches.length || "all"} candidates
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg border border-gray-200"
            >
              See pricing
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Typical rate: ${sampleMonthly[0].toLocaleString()}–${sampleMonthly[1].toLocaleString()}/month · Timezone: {city.timezone}
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            ["🕐", "Timezone", `${city.timezone} — overlaps with US business hours`],
            ["💵", "Typical rate", `$${sampleMonthly[0].toLocaleString()}–$${sampleMonthly[1].toLocaleString()}/mo`],
            ["✅", "Vetting", "Interview score visible on every profile"],
          ].map(([icon, label, value]) => (
            <div key={label} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
              <div className="text-gray-900 font-medium">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Matching contractors */}
      {matches.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {role.plural} available in {city.city}
          </h2>
          <div className="space-y-4">
            {matches.map((c) => (
              <Link
                key={c.id}
                href={`/contractors/${c.id}`}
                className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-5">
                  <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {c.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-gray-900">${c.monthlyRate.toLocaleString()}/mo</span>
                        <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                          {c.interviewScore}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{c.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{c.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {matches.length === 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No matching profiles in {city.city} yet
            </h2>
            <p className="text-gray-600 mb-5">
              We add new vetted candidates every week. Browse {matches.length === 0 ? "the full directory" : "more candidates"} or join our waitlist for {city.city}-based {role.plural.toLowerCase()}.
            </p>
            <Link href="/contractors" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Browse all contractors
            </Link>
          </div>
        </section>
      )}

      {/* Cross-links to neighbors (great for SEO internal linking) */}
      <section className="bg-gray-50 border-t border-gray-100 py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Other places to hire {role.plural.toLowerCase()}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CITIES.filter((c) => c.slug !== city.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/hire/${role.slug}/${c.slug}`}
                className="text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {role.plural} in {c.city} →
              </Link>
            ))}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-12 mb-6">
            Other roles in {city.city}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ROLES.filter((r) => r.slug !== role.slug).map((r) => (
              <Link
                key={r.slug}
                href={`/hire/${r.slug}/${city.slug}`}
                className="text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {r.plural} in {city.city} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">
            Find your next hire in {city.city}
          </h2>
          <p className="text-indigo-200 mb-7">
            Browse vetted candidates free. Subscribe when you find one you want to talk to.
          </p>
          <Link
            href="/contractors"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Browse the directory
          </Link>
        </div>
      </section>
    </div>
  );
}
