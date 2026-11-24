import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/motion/FadeUp";
import { PaperCover } from "@/components/research/PaperCover";
import { formatDate, latestPublished, papers } from "@/lib/research";

const description =
  "Open, versioned research from Nalla Labs on the systems African cities and institutions run on, starting with Traffic Jam, a study of Nairobi traffic congestion. Free to read, download and contribute.";

export const metadata: Metadata = {
  title: "Research: Open Studies on Nairobi Traffic and African Systems",
  description,
  keywords: ["Nalla Labs research", "Nairobi traffic research", "urban mobility Kenya", "open research Africa", "traffic congestion Nairobi"],
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: "Nalla Labs Research",
    description,
    type: "website",
    url: "https://nallalabs.xyz/research",
    siteName: "Nalla Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalla Labs Research",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Nalla Labs Research",
      url: "https://nallalabs.xyz/research",
      description,
      publisher: { "@type": "Organization", name: "Nalla Labs", url: "https://nallalabs.xyz" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: papers.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://nallalabs.xyz${p.href}`,
          name: `${p.title}: ${p.subtitle}`,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Nalla Labs", item: "https://nallalabs.xyz" },
        { "@type": "ListItem", position: 2, name: "Research", item: "https://nallalabs.xyz/research" },
      ],
    },
  ],
};

export default function ResearchIndexPage() {
  const [featured] = papers;
  const latest = latestPublished(featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main className="relative">
        {/* Hero */}
        <section className="relative pt-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-10 pt-24 pb-14 lg:pt-32 lg:pb-16">
            <FadeUp className="max-w-3xl">
              <p className="label-mono mb-6">Nalla Labs Research</p>
              <h1 className="text-display text-[#0A0A0A] mb-6">Open research. Shared problems.</h1>
              <p className="text-lg text-[#52525B] leading-relaxed max-w-2xl">
                We study the systems African cities and institutions run on, and publish every
                draft in the open. Read it, challenge it, help shape the next version.
              </p>
            </FadeUp>
          </div>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(#0A0A0A 1px, transparent 1px),
                linear-gradient(90deg, #0A0A0A 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
            aria-hidden
          />
        </section>

        {/* Featured paper */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8 lg:px-10">
            <FadeUp>
              <Link
                href={featured.href}
                className="group grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] border border-[#E4E4E7] bg-white hover:border-[#0A0A0A] transition-colors"
              >
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-[#0A0A0A]">
                  <PaperCover paper={featured} version={latest} />
                </div>
                <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="label-mono !text-[0.65rem] border border-[#1D4ED8] !text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5">
                        Featured · {featured.kind}
                      </span>
                      <span className="label-mono !text-[0.65rem] border border-[#E4E4E7] px-2 py-0.5">
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="text-h2 text-[#0A0A0A] mb-2">{featured.title}</h2>
                    <p className="text-sm text-[#71717A] leading-relaxed mb-5">{featured.subtitle}</p>
                    <p className="text-[#52525B] leading-relaxed">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-[#E4E4E7] pt-6">
                    <div className="text-sm">
                      <p className="text-[#0A0A0A] font-medium">{featured.author}</p>
                      <p className="label-mono !text-[0.65rem] mt-1">
                        {formatDate(latest.publishedAt)} · v{latest.version} · {latest.pages} pages
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-[#0A0A0A] whitespace-nowrap">
                      Read
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>

            {/* What's next */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FadeUp delay={0.05} className="border border-dashed border-[#A1A1AA] p-6 sm:p-8">
                <p className="label-mono !text-[0.65rem] mb-4">Coming next</p>
                <h3 className="font-semibold tracking-tight text-[#0A0A0A] mb-3">
                  Four follow-on papers, each with its own data
                </h3>
                <ul className="space-y-1.5 text-sm text-[#52525B] leading-relaxed">
                  <li>— The cost of congestion, with mode-specific measurements</li>
                  <li>— Where passenger queues really start</li>
                  <li>— Institutional coordination and accountability</li>
                  <li>— AI-assisted coordination, tested against simpler methods</li>
                </ul>
              </FadeUp>
              <FadeUp delay={0.1} className="border border-[#E4E4E7] bg-[#0A0A0A] text-[#FAFAFA] p-6 sm:p-8">
                <p className="label-mono !text-[0.65rem] !text-[#93C5FD] mb-4">Suggest a topic</p>
                <h3 className="font-semibold tracking-tight mb-2">
                  Know a system that needs fixing?
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Tell us the problem, the data and who&apos;s stuck in it. Good research starts
                  with people who live the problem.
                </p>
                <a
                  href="mailto:hello@nallalabs.xyz?subject=Research%20topic%20suggestion"
                  className="inline-flex items-center gap-2 text-sm border-b border-white/40 pb-0.5 hover:border-white transition-colors"
                >
                  hello@nallalabs.xyz
                  <ArrowUpRight size={13} />
                </a>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
