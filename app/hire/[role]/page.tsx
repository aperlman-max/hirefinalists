import Link from "next/link";
import { notFound } from "next/navigation";
import { ROLES, CITIES, findRole, type RoleDef } from "@/lib/landing";
import { CONTRACTORS } from "@/lib/data";

type Props = { params: Promise<{ role: string }> };

export async function generateStaticParams() {
  return ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { role: roleSlug } = await params;
  const role = findRole(roleSlug as RoleDef["slug"]);
  if (!role) return {};
  return {
    title: `Hire LATAM ${role.plural} — HireFinalists`,
    description: `Hire vetted ${role.plural.toLowerCase()} from Latin America. Browse candidates by city — Mexico City, Buenos Aires, São Paulo, Medellín, Bogotá, Santiago, Lima, and more.`,
  };
}

export default async function HireRolePage({ params }: Props) {
  const { role: roleSlug } = await params;
  const role = findRole(roleSlug as RoleDef["slug"]);
  if (!role) notFound();

  const matchingCount = CONTRACTORS.filter((c) => role.matchesCategory(c.category)).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/hire" className="hover:text-gray-900">Browse by role</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{role.plural}</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Hire LATAM {role.plural.toLowerCase()}
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl mb-10">
        {role.description("Latin America", "")}
      </p>

      <Link
        href="/contractors"
        className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors mb-14"
      >
        Browse all {matchingCount} {role.plural.toLowerCase()} →
      </Link>

      <h2 className="text-xl font-bold text-gray-900 mb-5">By city</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {CITIES.map((c) => (
          <Link
            key={c.slug}
            href={`/hire/${role.slug}/${c.slug}`}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div className="font-medium text-gray-900">{role.plural} in {c.city}</div>
            <div className="text-xs text-gray-500 mt-1">{c.country} · {c.timezone}</div>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Other roles</h2>
        <div className="flex flex-wrap gap-2">
          {ROLES.filter((r) => r.slug !== role.slug).map((r) => (
            <Link
              key={r.slug}
              href={`/hire/${r.slug}`}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
            >
              {r.plural}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
