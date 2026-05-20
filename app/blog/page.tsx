import Link from "next/link";
import { POSTS } from "@/lib/posts";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata = {
  title: "Blog — HireFinalists",
  description: "Practical guides on hiring remote LATAM contractors. Rates, timezones, contracts, and how to avoid expensive mistakes.",
};

export default function BlogIndexPage() {
  const posts = [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">The HireFinalists blog</h1>
        <p className="text-lg text-gray-500">
          Practical guides on hiring remote LATAM contractors — rates, timezones, contracts, and the mistakes that cost real money.
        </p>
      </header>
      <div className="mb-12">
        <NewsletterSignup variant="card" />
      </div>
      <div className="space-y-10">
        {posts.map((p) => (
          <article key={p.slug} className="border-b border-gray-100 pb-10 last:border-b-0">
            <Link href={`/blog/${p.slug}`} className="group block">
              <div className="text-xs text-gray-400 mb-2">
                {new Date(p.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {p.readingMinutes} min read
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                {p.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">{p.description}</p>
              <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                Read article →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
