import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — HireFinalists",
  description: "How HireFinalists collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 20, 2026</p>

      <div className="prose prose-lg text-gray-700 leading-relaxed space-y-5">
        <p>
          HireFinalists (&quot;we&quot;, &quot;us&quot;) operates the directory and platform at hirefinalists.com. This Privacy Policy explains what information we collect, how we use it, and the choices you have. We aim to be straightforward — no dark patterns.
        </p>

        <H2>Information we collect</H2>
        <p><strong>From employers:</strong> name, work email, company, payment information (handled by Stripe — we never see card numbers), and any free-text you share when you sign up or submit a request.</p>
        <p><strong>From contractors:</strong> name, email, LinkedIn URL, location, work history, skills, rates, interview recordings and notes (with consent), and the content of your application.</p>
        <p><strong>Automatically:</strong> IP address, browser user agent, timestamps, and pages visited. We use first-party analytics only.</p>

        <H2>How we use it</H2>
        <p>To provide the directory and connect employers with contractors. To process subscriptions and send transactional emails (receipts, password resets, account updates). To improve the platform. To enforce our terms.</p>

        <H2>Who we share it with</H2>
        <p>Service providers we contract with (e.g. Stripe for payments, Supabase for data hosting, Resend for email delivery). We don&apos;t sell personal data. Contractor profiles are shown to employers on a per-subscription basis; contractors opt in to being listed.</p>

        <H2>Your rights</H2>
        <p>You can request a copy of your data, correct it, or delete it. Email privacy@hirefinalists.com. EU/UK residents have additional rights under GDPR. California residents have additional rights under the CCPA. We honor all of them.</p>

        <H2>Data retention</H2>
        <p>We keep account data for as long as your account is active and for 30 days after deletion, except where law requires longer retention (e.g. financial records). Anonymous analytics are aggregated indefinitely.</p>

        <H2>Cookies</H2>
        <p>We use a small number of first-party cookies to keep you signed in, remember your subscription state, and measure aggregate site usage. We do not use third-party advertising cookies. You can disable cookies in your browser; some features won&apos;t work without them.</p>

        <H2>Security</H2>
        <p>Data is encrypted in transit (TLS) and at rest. Subscription state lives in a managed Postgres instance with row-level security. We follow least-privilege access internally.</p>

        <H2>Children</H2>
        <p>HireFinalists is for business use. We don&apos;t knowingly collect data from anyone under 16.</p>

        <H2>Changes to this policy</H2>
        <p>If we make material changes, we&apos;ll email account holders at least 14 days before the change takes effect.</p>

        <H2>Contact</H2>
        <p>Privacy questions: privacy@hirefinalists.com. General inquiries: <Link href="/talk" className="text-indigo-600 hover:text-indigo-700">talk to us</Link>.</p>
      </div>
    </article>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">{children}</h2>;
}
