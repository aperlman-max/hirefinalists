import Link from "next/link";
import { ROLES, CITIES } from "@/lib/landing";

export const metadata = {
  title: "Hire LATAM contractors by role and city — HireFinalists",
  description: "Browse vetted Latin American contractors by role and city. Engineers, designers, marketers, sales, ops, and more across Mexico, Argentina, Brazil, Colombia, Chile, and Peru.",
};

export default function HireIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Hire LATAM contractors by role and city</h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Browse pre-vetted contractors by role and where they live. Every candidate was an interview finalist at a real company.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-5">By role</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ROLES.map((r) => (
            <Link
              key={r.slug}
              href={`/hire/${r.slug}`}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <div className="font-medium text-gray-900">{r.plural}</div>
              <div className="text-xs text-gray-500 mt-1">{CITIES.length} cities</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-5">By city</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CITIES.map((c) => (
            <div key={c.slug} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
              <div className="font-medium text-gray-900">{c.city}, {c.country}</div>
              <div className="text-xs text-gray-500 mt-1 mb-2">{c.timezone}</div>
              <div className="flex flex-wrap gap-2">
                {ROLES.slice(0, 3).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/hire/${r.slug}/${c.slug}`}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
