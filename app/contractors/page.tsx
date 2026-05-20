import ContractorDirectory from "@/components/ContractorDirectory";
import { CATEGORIES, COUNTRIES } from "@/lib/data";
import { listContractors } from "@/lib/contractors";

export const metadata = {
  title: "Browse Contractors — HireFinalists",
  description: "Search and filter 5,000+ pre-vetted LATAM contractors. Filter by skill, country, availability, and more.",
};

export default async function ContractorsPage() {
  const contractors = await listContractors();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Contractors</h1>
        <p className="text-gray-500 text-lg">
          {contractors.length} pre-vetted candidates — all interview finalists, ready to hire.
        </p>
      </div>
      <ContractorDirectory
        contractors={contractors}
        categories={CATEGORIES}
        countries={COUNTRIES}
      />
    </div>
  );
}
