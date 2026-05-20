export type Competitor = {
  slug: string;
  name: string;
  shortPitch: string;
  bestFor: string;
  comparison: {
    pricing: string;
    quality: string;
    speed: string;
    geography: string;
    fees: string;
  };
  weaknesses: string[];
  ourAdvantages: string[];
  metaDescription: string;
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "toptal",
    name: "Toptal",
    shortPitch: "Premium freelance marketplace with screened developers and designers.",
    bestFor: "One-off senior engineering projects when budget isn't a constraint.",
    comparison: {
      pricing: "$60–$120+/hour for senior engineers, billed through Toptal as a markup over what the contractor earns.",
      quality: "Top 3% claim — vetting is real but opaque. You don't see scores.",
      speed: "Matching takes 24–48 hours but you only see the candidates Toptal selects for you.",
      geography: "Global — talent from US, Europe, LATAM, Asia. Less optimized for US timezone overlap.",
      fees: "Significant markup baked into the hourly rate. Engagement minimums and trial periods.",
    },
    weaknesses: [
      "You can't browse candidates yourself — Toptal curates and you accept or reject.",
      "Markup is invisible. The contractor sees a fraction of what you pay.",
      "Project minimums (typically $500+ deposit) before you talk to anyone.",
      "Hourly billing only. No flat-rate subscription option.",
    ],
    ourAdvantages: [
      "You browse 5,000+ candidates yourself. See scores, skills, rates.",
      "Flat $799/month subscription — no markup, no placement fee.",
      "Direct contract with the contractor. They keep 100% of their rate.",
      "All contractors are LATAM-based, optimized for US timezone overlap.",
    ],
    metaDescription: "Toptal vs HireFinalists: how the two platforms compare on pricing, vetting, geography, and fees. A practical breakdown for hiring managers.",
  },
  {
    slug: "upwork",
    name: "Upwork",
    shortPitch: "The largest open marketplace — anyone can sign up to bid on your jobs.",
    bestFor: "Tactical, well-scoped work where you want competitive bids.",
    comparison: {
      pricing: "Anywhere from $5/hour to $200/hour. You set a budget and freelancers bid.",
      quality: "Highly variable. You're responsible for screening, vetting, and interviewing.",
      speed: "Job posts get 30–100 bids within hours, but filtering takes work.",
      geography: "Global open marketplace. Most freelancers are in SE Asia and Eastern Europe.",
      fees: "5% client fee on top of freelancer rates. Marketplace fees on the freelancer side too.",
    },
    weaknesses: [
      "Open marketplace means high noise — 90%+ of bids are unqualified.",
      "No quality filter. You do all the vetting work yourself.",
      "Hard to find senior-level talent for ongoing roles.",
      "Time-zone overlap is hit or miss depending on the freelancer.",
    ],
    ourAdvantages: [
      "Every contractor is pre-vetted with a visible interview score.",
      "Curated, not open — only contractors who clear our bar are listed.",
      "Designed for ongoing roles, not one-off gigs.",
      "LATAM-only for timezone overlap with US teams.",
    ],
    metaDescription: "Upwork vs HireFinalists: an honest comparison of an open marketplace versus a curated, vetted directory. Which fits your hiring needs?",
  },
  {
    slug: "deel",
    name: "Deel",
    shortPitch: "Payroll and compliance platform for paying international contractors.",
    bestFor: "Companies that already have hires and need a managed payroll/EOR solution.",
    comparison: {
      pricing: "$49/month per contractor for contractor management, $599/month for full EOR.",
      quality: "Deel doesn't source talent — they handle the legal/payment side after you've hired.",
      speed: "Onboarding a hire through Deel takes a day or two.",
      geography: "Global compliance — supports 150+ countries.",
      fees: "Per-contractor monthly fee plus payment processing.",
    },
    weaknesses: [
      "Deel doesn't help you find talent — they're payroll, not sourcing.",
      "You still need a separate solution for the hiring funnel.",
      "Per-contractor pricing scales linearly with team size.",
    ],
    ourAdvantages: [
      "We're the sourcing layer Deel doesn't have. Pair us with Deel for end-to-end.",
      "Flat-rate access to 5,000+ vetted candidates.",
      "Once you've hired through us, Deel handles payroll cleanly.",
    ],
    metaDescription: "Deel vs HireFinalists: a sourcing platform compared with a payroll platform. They complement each other — here's how to use both.",
  },
  {
    slug: "remotelatinos",
    name: "RemoteLatinos",
    shortPitch: "A directory of LATAM contractors available for remote work.",
    bestFor: "Browsing widely available LATAM contractors without quality filtering.",
    comparison: {
      pricing: "Free to browse for employers. Contractors create profiles themselves.",
      quality: "Self-reported. No vetting, no interviews, no scores.",
      speed: "Fast browse, but you do all the screening yourself.",
      geography: "LATAM-focused — similar to us.",
      fees: "No platform fee on hires.",
    },
    weaknesses: [
      "No interview vetting — contractors self-report skills and experience.",
      "Quality filter is entirely on you.",
      "No interview scores, video recordings, or detailed evaluation notes.",
    ],
    ourAdvantages: [
      "Every contractor passed a real interview with a senior reviewer.",
      "Interview scores are visible on every profile.",
      "Detailed interview notes and recordings available for subscribers.",
      "We replace the screening step entirely.",
    ],
    metaDescription: "RemoteLatinos vs HireFinalists: both focus on LATAM talent. The difference is vetting — here's how that affects your hiring outcomes.",
  },
];

export function findCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
