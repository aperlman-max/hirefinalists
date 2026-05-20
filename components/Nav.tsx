"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-900">
          Hire<span className="text-indigo-600">Finalists</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/contractors" className={pathname.startsWith("/contractors") ? "text-indigo-600" : "hover:text-gray-900 transition-colors"}>
            Browse Talent
          </Link>
          <Link href="/for-employers" className={pathname === "/for-employers" ? "text-indigo-600" : "hover:text-gray-900 transition-colors"}>
            For Employers
          </Link>
          <Link href="/pricing" className={pathname === "/pricing" ? "text-indigo-600" : "hover:text-gray-900 transition-colors"}>
            Pricing
          </Link>
          <Link href="/blog" className={pathname.startsWith("/blog") ? "text-indigo-600" : "hover:text-gray-900 transition-colors"}>
            Blog
          </Link>
          <Link href="/apply" className={pathname === "/apply" ? "text-indigo-600" : "hover:text-gray-900 transition-colors"}>
            Join as Contractor
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contractors"
            className="hidden sm:block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Hire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
