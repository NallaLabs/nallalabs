import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { TechForMediaRegistrationForm } from "@/components/sections/TechForMediaRegistrationForm";

const title = "Tech for Media Exhibition Programme 2026";
const description =
  "Register a team for Nalla Labs x Baraza Media Lab's Tech for Media Exhibition Programme 2026. Build a real project, join online mentorship sessions, and exhibit in Kisumu.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: title,
  description,
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  organizer: {
    "@type": "Organization",
    name: "Nalla Labs",
    url: "https://nallalabs.xyz",
  },
  location: {
    "@type": "Place",
    name: "Baraza Media Lab",
    address: "Kisumu, Kenya",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KES",
    url: "https://nallalabs.xyz/events/tech-for-media-2026",
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/events/tech-for-media-2026",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://nallalabs.xyz/events/tech-for-media-2026",
    siteName: "Nalla Labs",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const tracks = [
  {
    title: "Content creation",
    description: "Tools for production workflows, editing, packaging, and publishing content.",
  },
  {
    title: "Monetization",
    description: "Ideas around payments, income streams, sponsorships, and direct support.",
  },
  {
    title: "Personal brand",
    description: "Products that help creators build identity, trust, and visibility.",
  },
  {
    title: "Audience growth",
    description: "Systems for discovery, retention, and community-building.",
  },
  {
    title: "Creator IP",
    description: "Ownership, licensing, archives, and digital rights tools.",
  },
];

export default function TechForMedia2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative overflow-hidden">
        <section className="relative border-b border-[#1F2937] bg-[#08111F] text-[#FAFAFA]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(29,78,216,0.38),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.07),_transparent_28%)]" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/6 px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase">
                  <Sparkles size={14} />
                  Nalla Labs x Baraza Media Lab
                </span>
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/6 px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase">
                  2026 open call
                </span>
              </div>

              <div className="space-y-4">
                <p className="label-mono text-[#93C5FD]">Event poster</p>
                <h1 className="text-[clamp(3rem,6vw,5.75rem)] leading-[0.95] tracking-[-0.04em] font-semibold max-w-4xl">
                  Tech for Media Exhibition Programme 2026
                </h1>
                <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/78">
                  Build a real project with your team, join structured online mentorship, and
                  showcase the work live in Kisumu. We are looking for groups that can think clearly,
                  scope honestly, and ship something useful.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="border border-white/12 bg-white/6 p-4">
                  <p className="label-mono text-[#93C5FD] mb-1">Format</p>
                  <p className="font-medium">Online mentorship + live exhibition</p>
                </div>
                <div className="border border-white/12 bg-white/6 p-4">
                  <p className="label-mono text-[#93C5FD] mb-1">Teams</p>
                  <p className="font-medium">4 people per team</p>
                </div>
                <div className="border border-white/12 bg-white/6 p-4">
                  <p className="label-mono text-[#93C5FD] mb-1">Prize</p>
                  <p className="font-medium">Cash prize for the winning project</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#E4E4E7] bg-[#F4F4F5]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "No full proposal required. We want a problem, a user, and a scopeable idea.",
                "Register as a team. One person can submit the form for everyone.",
              ].map((item) => (
                <div key={item} className="border border-[#E4E4E7] bg-white p-4 text-sm text-[#52525B]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <aside className="lg:sticky lg:top-8 self-start space-y-6">
                <div className="border border-[#E4E4E7] bg-white p-6 sm:p-8">
                  <p className="label-mono text-[#1D4ED8] mb-3">Tracks</p>
                  <div className="space-y-4">
                    {tracks.map((track) => (
                      <div key={track.title} className="border-t border-[#E4E4E7] pt-4 first:border-t-0 first:pt-0">
                        <h2 className="font-semibold tracking-tight text-[#0A0A0A]">{track.title}</h2>
                        <p className="text-sm text-[#52525B] leading-relaxed">{track.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[#E4E4E7] bg-[#0A0A0A] text-[#FAFAFA] p-6 sm:p-8">
                  <p className="label-mono text-[#93C5FD] mb-3">What we are asking for</p>
                  <ul className="space-y-3 text-sm leading-relaxed text-white/76">
                    <li>• Team name, lead contact, and number of members</li>
                    <li>• Each member&apos;s background and one skill they bring</li>
                    <li>• A short project seed: problem, audience, solution idea</li>
                    <li>• Track fit, technical experience, availability, and consent</li>
                  </ul>
                </div>
              </aside>

              <div className="border border-[#E4E4E7] bg-white p-6 sm:p-8 lg:p-10">
                <div className="mb-8">
                  <p className="label-mono text-[#1D4ED8] mb-3">Registration form</p>
                  <h2 className="text-h2 text-[#0A0A0A] mb-4">Sign up your team</h2>
                  <p className="text-[#52525B] leading-relaxed max-w-2xl">
                    Use one form per team. We will review submissions, match mentors, and follow up with
                    the lead contact.
                  </p>
                </div>

                <TechForMediaRegistrationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
