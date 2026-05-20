import type { MetadataRoute } from "next";
import { CONTRACTORS } from "@/lib/data";
import { POSTS } from "@/lib/posts";
import { ROLES, CITIES, allLandingSlugs } from "@/lib/landing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hirefinalists.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contractors`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/for-employers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/talk`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const contractorPages: MetadataRoute.Sitemap = CONTRACTORS.map((c) => ({
    url: `${SITE_URL}/contractors/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Programmatic SEO landing pages: /hire, /hire/[role], /hire/[role]/[city]
  const hirePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/hire`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...ROLES.map((r) => ({
      url: `${SITE_URL}/hire/${r.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...allLandingSlugs().map(({ role, city }) => ({
      url: `${SITE_URL}/hire/${role}/${city}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];

  void CITIES; // imported for type consistency

  return [...staticPages, ...contractorPages, ...blogPages, ...hirePages];
}
