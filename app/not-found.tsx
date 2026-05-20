import Link from "next/link";

export const metadata = {
  title: "Page not found — HireFinalists",
};

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="text-7xl font-black text-indigo-600 mb-3">404</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        That page got hired away
      </h1>
      <p className="text-gray-500 mb-8">
        The link you followed doesn&apos;t exist — but our directory of vetted
        LATAM contractors does. Take a look while you&apos;re here.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/contractors"
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Browse contractors
        </Link>
        <Link
          href="/"
          className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
