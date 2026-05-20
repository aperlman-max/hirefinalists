import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hirefinalists.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/contractors", "/contractors/*", "/pricing", "/for-employers", "/apply", "/blog", "/blog/*", "/hire", "/hire/*"],
        disallow: ["/api/", "/dashboard", "/get-started"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
