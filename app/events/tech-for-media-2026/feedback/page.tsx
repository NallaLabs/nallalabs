import type { Metadata } from "next";

const title = "Tech for Media Exhibition Programme 2026 — Feedback";
const description =
  "Share feedback on the Tech for Media Exhibition Programme 2026 hosted by Nalla Labs x Baraza Media Lab.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/events/tech-for-media-2026/feedback",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://nallalabs.xyz/events/tech-for-media-2026/feedback",
    siteName: "Nalla Labs",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function TechForMedia2026FeedbackPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-[#1F2937] bg-[#08111F] text-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-14 sm:py-16">
          <p className="label-mono text-[#93C5FD] mb-3">Tech for Media Exhibition Programme 2026</p>
          <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.98] tracking-[-0.03em] font-semibold">
            Event feedback
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/78">
            Tell us how the session went. This takes a couple of minutes and helps us improve the
            next cohort.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="border border-[#E4E4E7] bg-white p-4 sm:p-6">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSecCdG3ki6oEJkM6T_4e4roPVI7QLBahgDGlmsvtkBMfgLsjA/viewform?embedded=true"
              width="100%"
              height={2236}
              className="w-full border-0"
              title="Tech for Media Exhibition Programme 2026 feedback form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
