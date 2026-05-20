import Link from "next/link";

export const metadata = {
  title: "Terms of Service — HireFinalists",
  description: "The agreement between you and HireFinalists when you use our directory and subscription services.",
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 20, 2026</p>

      <div className="prose prose-lg text-gray-700 leading-relaxed space-y-5">
        <p>
          These terms govern your use of HireFinalists. By creating an account or subscribing, you agree to them. If you&apos;re using HireFinalists on behalf of a company, you confirm you have authority to bind that company to these terms.
        </p>

        <H2>1. The service</H2>
        <p>HireFinalists is a directory of pre-vetted contractors. Employers subscribe to browse profiles and unlock contact information. Contractors apply to be listed and are reviewed by our team. We are not the employer of any contractor and do not handle payroll between you and the contractors you hire.</p>

        <H2>2. Subscriptions and payment</H2>
        <p>Paid plans are billed monthly or annually in USD via Stripe. Trials are clearly labeled at signup. We&apos;ll charge your saved payment method on each billing cycle until you cancel. You can cancel anytime from your account or by emailing support@hirefinalists.com — cancellation takes effect at the end of the current billing period.</p>
        <p>Annual plans are non-refundable after 30 days. Monthly plans are non-refundable but you can cancel future billing at any time.</p>

        <H2>3. Acceptable use</H2>
        <p>Don&apos;t scrape, redistribute, or republish contractor data. Don&apos;t use the platform to spam contractors with off-platform offers, MLM pitches, or non-employment solicitations. Don&apos;t share your account credentials. Don&apos;t use HireFinalists to source candidates and then bypass us for compensation arrangements with the listed contractor — we do not charge placement fees, so there is no incentive to bypass us anyway.</p>

        <H2>4. Contractor relationships</H2>
        <p>When you hire a contractor you found through HireFinalists, the legal and financial relationship is between you and the contractor. HireFinalists is not a party to that contract. We don&apos;t guarantee performance, ongoing availability, or fit. We do guarantee that contractors listed on the platform passed our interview process at the time of listing.</p>

        <H2>5. Intellectual property</H2>
        <p>HireFinalists owns the platform, brand, and aggregated data. You retain ownership of content you submit. By submitting content, you grant us a license to display it on the platform as needed to provide the service.</p>

        <H2>6. Refunds and money-back guarantee</H2>
        <p>If you can&apos;t find a contractor to hire in your first 30 days on a Professional plan, email support@hirefinalists.com for a full refund of your first month.</p>

        <H2>7. Termination</H2>
        <p>We can suspend or terminate accounts that violate these terms, with notice when possible. You can close your account at any time.</p>

        <H2>8. Disclaimers and liability</H2>
        <p>The service is provided &quot;as is&quot;. We don&apos;t warrant any specific hiring outcome. To the maximum extent permitted by law, our total liability to you is limited to the amount you paid us in the 12 months before the claim.</p>

        <H2>9. Governing law and disputes</H2>
        <p>These terms are governed by the laws of Delaware, USA. Disputes will be resolved in the state or federal courts located in Delaware.</p>

        <H2>10. Changes</H2>
        <p>We may update these terms. Material changes will be announced by email 14 days before they take effect. Continued use after that period constitutes acceptance.</p>

        <H2>11. Contact</H2>
        <p>Questions: legal@hirefinalists.com. Anything else: <Link href="/talk" className="text-indigo-600 hover:text-indigo-700">talk to us</Link>.</p>
      </div>
    </article>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">{children}</h2>;
}
