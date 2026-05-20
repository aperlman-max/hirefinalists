import { notFound } from "next/navigation";
import Link from "next/link";
import { getContractorContact, AVAILABILITY_LABELS } from "@/lib/data";
import { findContractor } from "@/lib/contractors";
import { getSubscription } from "@/lib/access";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const c = await findContractor(id);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.title} | HireFinalists`,
    description: c.bio,
  };
}

export default async function ContractorProfilePage({ params }: Props) {
  const { id } = await params;
  const c = await findContractor(id);
  if (!c) notFound();

  const sub = await getSubscription();
  const contact = sub.active ? getContractorContact(c) : null;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.name,
    jobTitle: c.title,
    description: c.bio,
    nationality: c.country,
    knowsLanguage: c.languages,
    knowsAbout: c.skills,
    alumniOf: { "@type": "EducationalOrganization", name: c.education },
    address: {
      "@type": "PostalAddress",
      addressLocality: c.city,
      addressCountry: c.country,
    },
  };

  const availColor =
    c.availability === "immediate"
      ? "text-green-700 bg-green-100"
      : c.availability === "2weeks"
      ? "text-amber-700 bg-amber-100"
      : "text-gray-700 bg-gray-100";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Link href="/contractors" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to directory
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main profile */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="flex items-start gap-6 mb-6">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-20 h-20 rounded-full bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{c.name}</h1>
                <p className="text-lg text-gray-600 mb-3">{c.title}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${availColor}`}>
                    {c.availability === "immediate" && (
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2" />
                    )}
                    {AVAILABILITY_LABELS[c.availability]}
                  </span>
                  <span className="text-sm font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    Interview Score: {c.interviewScore}/100
                  </span>
                  {c.verified && (
                    <span className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">${c.monthlyRate.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-0.5">per month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{c.yearsExperience}</div>
                <div className="text-xs text-gray-500 mt-0.5">years exp.</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">{c.timezone}</div>
                <div className="text-xs text-gray-500 mt-0.5">timezone</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900 capitalize">{c.english}</div>
                <div className="text-xs text-gray-500 mt-0.5">English</div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{c.bio}</p>
          </div>

          {/* Skills */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="font-semibold text-gray-900 text-lg mb-4">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span key={s} className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="font-semibold text-gray-900 text-lg mb-4">Previous Companies</h2>
            <div className="space-y-3">
              {c.previousCompanies.map((company) => (
                <div key={company} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                    {company[0]}
                  </div>
                  <span className="text-gray-700">{company}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="font-semibold text-gray-900 text-lg mb-4">Education</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="text-gray-700">{c.education}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${c.monthlyRate.toLocaleString()}<span className="text-lg font-normal text-gray-500">/mo</span>
              </div>
              <p className="text-sm text-gray-500">Full-time, USD</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">{c.city}, {c.country}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-gray-600">{c.languages.join(", ")}</span>
              </div>
            </div>

            {contact ? (
              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="block w-full bg-indigo-600 text-white text-center font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Email {c.name.split(" ")[0]}
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white border border-gray-200 text-gray-700 text-center font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  View LinkedIn
                </a>
                <div className="text-xs text-center text-green-700 font-medium pt-1">
                  ✓ Contact details unlocked
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="block w-full bg-indigo-600 text-white text-center font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors mb-3"
                >
                  Unlock Contact Info
                </Link>
                <p className="text-xs text-gray-400 text-center">
                  Subscribe to view email, LinkedIn, and video interview
                </p>
              </>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-900">{c.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Experience</span>
                <span className="font-medium text-gray-900">{c.yearsExperience} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Interview Score</span>
                <span className="font-bold text-green-700">{c.interviewScore}/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Availability</span>
                <span className="font-medium text-gray-900">{AVAILABILITY_LABELS[c.availability]}</span>
              </div>
            </div>
          </div>

          {contact ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-sm space-y-3">
              <p className="font-semibold text-gray-900">Direct contact</p>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</div>
                <div className="text-gray-700 break-all">{contact.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</div>
                <div className="text-gray-700">{contact.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Interview recording</div>
                <a
                  href={contact.interviewRecordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 break-all"
                >
                  Watch recording →
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-50 rounded-2xl p-6 text-sm">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Full profile locked</p>
                  <p className="text-gray-600 leading-relaxed">
                    Subscribe to unlock direct contact, LinkedIn profile, video interview recording, and detailed interview notes.
                  </p>
                  <Link href="/pricing" className="mt-3 inline-block text-indigo-600 font-medium hover:text-indigo-700">
                    View plans →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
