"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Contractor, AVAILABILITY_LABELS } from "@/lib/data";

type Props = {
  contractors: Contractor[];
  categories: string[];
  countries: string[];
};

export default function ContractorDirectory({ contractors, categories, countries }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [maxRate, setMaxRate] = useState(5000);
  const [sortBy, setSortBy] = useState<"score" | "rate_asc" | "rate_desc" | "experience">("score");

  const filtered = useMemo(() => {
    let results = contractors.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)) ||
          c.bio.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (category !== "All" && c.category !== category) return false;
      if (country !== "All" && c.country !== country) return false;
      if (availability !== "All" && c.availability !== availability) return false;
      if (c.monthlyRate > maxRate) return false;
      return true;
    });

    results.sort((a, b) => {
      if (sortBy === "score") return b.interviewScore - a.interviewScore;
      if (sortBy === "rate_asc") return a.monthlyRate - b.monthlyRate;
      if (sortBy === "rate_desc") return b.monthlyRate - a.monthlyRate;
      if (sortBy === "experience") return b.yearsExperience - a.yearsExperience;
      return 0;
    });

    return results;
  }, [contractors, search, category, country, availability, maxRate, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar filters */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Skill, name, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Availability
          </label>
          <div className="flex flex-col gap-2">
            {[
              { value: "All", label: "Any" },
              { value: "immediate", label: "Available Now" },
              { value: "2weeks", label: "Within 2 Weeks" },
              { value: "1month", label: "Within 1 Month" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAvailability(opt.value)}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  availability === opt.value
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt.value === "immediate" && (
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2" />
                )}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Max monthly rate: <span className="text-gray-900 font-bold">${maxRate.toLocaleString()}/mo</span>
          </label>
          <input
            type="range"
            min={2000}
            max={5000}
            step={100}
            value={maxRate}
            onChange={(e) => setMaxRate(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$2k</span>
            <span>$5k+</span>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span> contractors found
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="score">Sort: Interview Score</option>
            <option value="rate_asc">Sort: Rate (Low → High)</option>
            <option value="rate_desc">Sort: Rate (High → Low)</option>
            <option value="experience">Sort: Experience</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-medium text-gray-500">No contractors match your filters.</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setCountry("All"); setAvailability("All"); setMaxRate(200); }}
              className="mt-4 text-sm text-indigo-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c) => (
              <ContractorCard key={c.id} contractor={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContractorCard({ contractor: c }: { contractor: Contractor }) {
  const availColor =
    c.availability === "immediate"
      ? "text-green-700 bg-green-50"
      : c.availability === "2weeks"
      ? "text-amber-700 bg-amber-50"
      : "text-gray-600 bg-gray-100";

  return (
    <Link
      href={`/contractors/${c.id}`}
      className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-5">
        <img
          src={c.avatar}
          alt={c.name}
          className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {c.name}
              </h3>
              <p className="text-sm text-gray-500">{c.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${availColor}`}>
                {c.availability === "immediate" && <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 align-middle" />}
                {AVAILABILITY_LABELS[c.availability]}
              </span>
              <span className="text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                Score: {c.interviewScore}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{c.bio}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="text-gray-500">
              📍 {c.city}, {c.country}
            </span>
            <span className="text-gray-500">🕐 {c.timezone}</span>
            <span className="font-semibold text-gray-900">${c.monthlyRate.toLocaleString()}/mo</span>
            <span className="text-gray-500">{c.yearsExperience} yrs exp</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {c.skills.slice(0, 5).map((s) => (
              <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
            {c.skills.length > 5 && (
              <span className="text-xs text-gray-400 px-2.5 py-1">+{c.skills.length - 5} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
