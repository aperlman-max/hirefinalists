import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, POSTS } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.publishedAt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "HireFinalists" },
    keywords: post.keywords.join(", "),
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors">
        ← All articles
      </Link>
      <div className="text-sm text-gray-400 mb-4">
        {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.readingMinutes} min read · {post.author}
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
        {post.title}
      </h1>
      <p className="text-xl text-gray-500 leading-relaxed mb-12 pb-12 border-b border-gray-100">
        {post.description}
      </p>
      <BlogBody body={post.body} />
      <aside className="mt-16 bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to hire?</h2>
        <p className="text-gray-600 mb-6">
          Browse 5,000+ pre-vetted LATAM contractors. Every one was an interview finalist at a real company.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contractors" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
            Browse Contractors Free
          </Link>
          <Link href="/pricing" className="inline-block bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
            See Pricing
          </Link>
        </div>
      </aside>
    </article>
  );
}

function BlogBody({ body }: { body: string }) {
  // Minimal markdown-ish renderer: ## h2, paragraphs, simple lists, table support, **bold**.
  const blocks: React.ReactNode[] = [];
  const lines = body.trim().split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // H2
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="text-2xl font-bold text-gray-900 mt-12 mb-4">
          {line.replace(/^##\s+/, "")}
        </h2>
      );
      i++; continue;
    }

    // Table (markdown-style with pipes)
    if (line.startsWith("|") && lines[i + 1]?.startsWith("|")) {
      const headerCells = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      blocks.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {headerCells.map((h, hi) => (
                  <th key={hi} className="py-3 px-3 text-left font-semibold text-gray-900">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-3 px-3 text-gray-700">{renderInline(cell, `${key}-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 space-y-2 my-5 text-gray-700 leading-relaxed">
          {items.map((it, idx) => <li key={idx}>{renderInline(it, `${key}-${idx}`)}</li>)}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal pl-6 space-y-2 my-5 text-gray-700 leading-relaxed">
          {items.map((it, idx) => <li key={idx}>{renderInline(it, `${key}-${idx}`)}</li>)}
        </ol>
      );
      continue;
    }

    // Paragraph
    blocks.push(
      <p key={key++} className="text-gray-700 leading-relaxed my-5">
        {renderInline(line, `p-${key}`)}
      </p>
    );
    i++;
  }

  return <div className="prose-lg">{blocks}</div>;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  // Bold via **...**
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<strong key={`${keyPrefix}-${i++}`} className="font-semibold text-gray-900">{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : text;
}
