import { CONTRACTORS, CATEGORIES, Contractor } from "@/lib/data";

export type RoleSlug =
  | "engineers"
  | "designers"
  | "product-managers"
  | "data-engineers"
  | "ml-engineers"
  | "marketers"
  | "sales-reps"
  | "customer-success-managers"
  | "accountants"
  | "recruiters"
  | "virtual-assistants"
  | "content-writers"
  | "operations-leads";

export type RoleDef = {
  slug: RoleSlug;
  label: string;
  plural: string;
  matchesCategory: (cat: string) => boolean;
  description: (city: string, country: string) => string;
};

export const ROLES: RoleDef[] = [
  {
    slug: "engineers",
    label: "Software Engineer",
    plural: "Software Engineers",
    matchesCategory: (c) => c === "Engineering",
    description: (city, country) =>
      `Hire pre-vetted software engineers based in ${city}, ${country}. Every engineer on HireFinalists was an interview finalist at a US-caliber company. Overlapping US business hours, English-fluent, and 60–80% below US market rates.`,
  },
  {
    slug: "designers",
    label: "Designer",
    plural: "Designers",
    matchesCategory: (c) => c === "Design",
    description: (city, country) =>
      `Hire vetted product designers and UX designers from ${city}, ${country}. Strong portfolios, design-system experience, and real-time collaboration with your US team.`,
  },
  {
    slug: "product-managers",
    label: "Product Manager",
    plural: "Product Managers",
    matchesCategory: (c) => c === "Product",
    description: (city, country) =>
      `Hire experienced product managers in ${city}, ${country}. Vetted on product strategy, roadmapping, and execution. All finalists in real PM interview processes.`,
  },
  {
    slug: "data-engineers",
    label: "Data Engineer",
    plural: "Data Engineers",
    matchesCategory: (c) => c === "Data",
    description: (city, country) =>
      `Hire data engineers from ${city}, ${country}. Modern data stack (dbt, Snowflake, Airflow), real production experience, and vetted by senior data leaders.`,
  },
  {
    slug: "ml-engineers",
    label: "ML / AI Engineer",
    plural: "ML / AI Engineers",
    matchesCategory: (c) => c === "AI/ML",
    description: (city, country) =>
      `Hire machine learning and AI engineers from ${city}, ${country}. LLM application experience, production ML deployment, and vetted on real-world ML problems.`,
  },
  {
    slug: "marketers",
    label: "Growth Marketer",
    plural: "Growth Marketers",
    matchesCategory: (c) => c === "Marketing",
    description: (city, country) =>
      `Hire growth marketers and digital marketing specialists from ${city}, ${country}. SEO, paid acquisition, lifecycle, and conversion optimization — all vetted.`,
  },
  {
    slug: "sales-reps",
    label: "Sales Rep / SDR",
    plural: "Sales Reps & SDRs",
    matchesCategory: (c) => c === "Sales",
    description: (city, country) =>
      `Hire sales development reps and account executives from ${city}, ${country}. Quota-carrying experience selling to US buyers, vetted on real outbound playbooks.`,
  },
  {
    slug: "customer-success-managers",
    label: "Customer Success Manager",
    plural: "Customer Success Managers",
    matchesCategory: (c) => c === "Operations" || c === "Customer Success",
    description: (city, country) =>
      `Hire customer success managers from ${city}, ${country}. Track records of reducing churn, onboarding accounts, and managing customer lifecycle.`,
  },
  {
    slug: "accountants",
    label: "Accountant",
    plural: "Accountants",
    matchesCategory: (c) => c === "Finance",
    description: (city, country) =>
      `Hire accountants and bookkeepers in ${city}, ${country}. US GAAP experience, month-end close, payroll, and multi-entity bookkeeping — all vetted.`,
  },
  {
    slug: "recruiters",
    label: "Recruiter",
    plural: "Recruiters",
    matchesCategory: (c) => c === "HR / Recruiting",
    description: (city, country) =>
      `Hire technical and non-technical recruiters in ${city}, ${country}. Sourcing, screening, and closing experience for US startups.`,
  },
  {
    slug: "virtual-assistants",
    label: "Virtual Assistant",
    plural: "Virtual Assistants",
    matchesCategory: (c) => c === "Virtual Assistant",
    description: (city, country) =>
      `Hire executive assistants and virtual assistants from ${city}, ${country}. Calendar management, inbox triage, light bookkeeping — all vetted.`,
  },
  {
    slug: "content-writers",
    label: "Content Writer",
    plural: "Content Writers",
    matchesCategory: (c) => c === "Content / Writing",
    description: (city, country) =>
      `Hire content writers, SEO writers, and editorial leads from ${city}, ${country}. Native-quality English writing, portfolio of published work.`,
  },
  {
    slug: "operations-leads",
    label: "Operations Lead",
    plural: "Operations Leads",
    matchesCategory: (c) => c === "Operations",
    description: (city, country) =>
      `Hire operations leads and ops generalists in ${city}, ${country}. Process design, vendor management, and operational scaling for US startups.`,
  },
];

export type CityDef = {
  slug: string;
  city: string;
  country: string;
  timezone: string;
};

export const CITIES: CityDef[] = [
  { slug: "mexico-city", city: "Mexico City", country: "Mexico", timezone: "UTC-6" },
  { slug: "buenos-aires", city: "Buenos Aires", country: "Argentina", timezone: "UTC-3" },
  { slug: "sao-paulo", city: "São Paulo", country: "Brazil", timezone: "UTC-3" },
  { slug: "medellin", city: "Medellín", country: "Colombia", timezone: "UTC-5" },
  { slug: "bogota", city: "Bogotá", country: "Colombia", timezone: "UTC-5" },
  { slug: "santiago", city: "Santiago", country: "Chile", timezone: "UTC-4" },
  { slug: "lima", city: "Lima", country: "Peru", timezone: "UTC-5" },
  { slug: "montevideo", city: "Montevideo", country: "Uruguay", timezone: "UTC-3" },
  { slug: "guadalajara", city: "Guadalajara", country: "Mexico", timezone: "UTC-6" },
  { slug: "quito", city: "Quito", country: "Ecuador", timezone: "UTC-5" },
];

export function findRole(slug: string): RoleDef | undefined {
  return ROLES.find((r) => r.slug === slug);
}

export function findCity(slug: string): CityDef | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function contractorsForRoleAndCity(role: RoleDef, city: CityDef): Contractor[] {
  return CONTRACTORS.filter(
    (c) => role.matchesCategory(c.category) && (c.city === city.city || c.country === city.country)
  );
}

export function allLandingSlugs(): { role: string; city: string }[] {
  const out: { role: string; city: string }[] = [];
  for (const r of ROLES) {
    for (const c of CITIES) {
      out.push({ role: r.slug, city: c.slug });
    }
  }
  return out;
}

// silence the unused CATEGORIES import warning in case lint complains
void CATEGORIES;
