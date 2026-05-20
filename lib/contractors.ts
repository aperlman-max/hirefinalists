/**
 * Data access layer for contractors. Reads from Supabase when configured,
 * falls back to the in-memory seed array in `lib/data.ts` otherwise.
 *
 * Expected Supabase table shape (see supabase/schema.sql):
 *   contractors (
 *     id text primary key,
 *     name, title, country, city, timezone,
 *     skills text[], years_experience int, hourly_rate int, monthly_rate int,
 *     availability text, bio text, languages text[],
 *     education, previous_companies text[],
 *     interview_score int, verified boolean, avatar text,
 *     linkedin_url text, portfolio_url text, category, english,
 *     created_at timestamptz default now()
 *   )
 */
import { CONTRACTORS, Contractor } from "@/lib/data";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

type Row = {
  id: string;
  name: string;
  title: string;
  country: string;
  city: string;
  timezone: string;
  skills: string[];
  years_experience: number;
  hourly_rate: number;
  monthly_rate: number;
  availability: "immediate" | "2weeks" | "1month";
  bio: string;
  languages: string[];
  education: string;
  previous_companies: string[];
  interview_score: number;
  verified: boolean;
  avatar: string;
  linkedin_url: string | null;
  portfolio_url: string | null;
  category: string;
  english: "native" | "fluent" | "professional";
};

function rowToContractor(r: Row): Contractor {
  return {
    id: r.id,
    name: r.name,
    title: r.title,
    country: r.country,
    city: r.city,
    timezone: r.timezone,
    skills: r.skills,
    yearsExperience: r.years_experience,
    hourlyRate: r.hourly_rate,
    monthlyRate: r.monthly_rate,
    availability: r.availability,
    bio: r.bio,
    languages: r.languages,
    education: r.education,
    previousCompanies: r.previous_companies,
    interviewScore: r.interview_score,
    verified: r.verified,
    avatar: r.avatar,
    linkedinUrl: r.linkedin_url ?? undefined,
    portfolioUrl: r.portfolio_url ?? undefined,
    category: r.category,
    english: r.english,
  };
}

export async function listContractors(): Promise<Contractor[]> {
  if (!isSupabaseConfigured()) return CONTRACTORS;
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return CONTRACTORS;
    const { data, error } = await supabase
      .from("contractors")
      .select("*")
      .order("interview_score", { ascending: false });
    if (error || !data) {
      console.warn("[contractors] supabase read failed, using seed:", error?.message);
      return CONTRACTORS;
    }
    return (data as Row[]).map(rowToContractor);
  } catch (err) {
    console.warn("[contractors] supabase error, using seed:", err);
    return CONTRACTORS;
  }
}

export async function findContractor(id: string): Promise<Contractor | undefined> {
  if (!isSupabaseConfigured()) {
    return CONTRACTORS.find((c) => c.id === id);
  }
  try {
    const supabase = await getSupabaseServer();
    if (!supabase) return CONTRACTORS.find((c) => c.id === id);
    const { data, error } = await supabase.from("contractors").select("*").eq("id", id).maybeSingle();
    if (error || !data) return CONTRACTORS.find((c) => c.id === id);
    return rowToContractor(data as Row);
  } catch {
    return CONTRACTORS.find((c) => c.id === id);
  }
}
