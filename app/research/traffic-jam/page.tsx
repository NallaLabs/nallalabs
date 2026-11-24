import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/motion/FadeUp";
import { PaperViewer } from "@/components/research/PaperViewer";
import { FeedbackForm } from "@/components/research/FeedbackForm";
import { ShareButtons } from "@/components/research/ShareButtons";
import { PaperStats } from "@/components/research/PaperStats";
import { downloadUrl, formatDate, latestPublished, trafficJam } from "@/lib/research";

const paper = trafficJam;
const latest = latestPublished(paper);
const pageUrl = `https://nallalabs.xyz${paper.href}`;

const title = "Nairobi Traffic Congestion Research: Traffic Jam v1.0";
const shareTitle = "Nairobi's traffic isn't just a road problem. It's a coordination problem.";
const description =
  "Traffic Jam is open research on Nairobi traffic congestion: where commuters' time is lost, what it costs (about KSh 46bn a year), and the coordination system Nalla Labs is building with anyone who wants to help. Free preprint and briefing.";
const fullTitle = `${paper.title}: ${paper.subtitle}`;
const pdfUrl = `https://nallalabs.xyz${latest.file}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: paper.keywords,
  authors: [{ name: paper.author, url: paper.orcid ? `https://orcid.org/${paper.orcid}` : undefined }],
  alternates: {
    canonical: paper.href,
  },
  openGraph: {
    title: shareTitle,
    description,
    type: "article",
    url: pageUrl,
    siteName: "Nalla Labs",
    publishedTime: latest.publishedAt,
    authors: [paper.author],
    tags: paper.keywords,
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
  },
  // Google Scholar / Highwire Press tags so the preprint can be indexed as a paper.
  other: {
    citation_title: fullTitle,
    citation_author: "Robinson, Allan",
    citation_publication_date: latest.publishedAt.replaceAll("-", "/"),
    citation_online_date: latest.publishedAt.replaceAll("-", "/"),
    citation_technical_report_institution: "Nalla Labs",
    citation_pdf_url: pdfUrl,
    citation_abstract_html_url: pageUrl,
    citation_language: "en",
    citation_keywords: paper.keywords.join("; "),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id": `${pageUrl}#paper`,
      headline: fullTitle.slice(0, 110),
      name: fullTitle,
      alternativeHeadline: shareTitle,
      abstract: paper.abstract,
      description,
      keywords: paper.keywords.join(", "),
      inLanguage: "en",
      author: {
        "@type": "Person",
        name: paper.author,
        jobTitle: "VP AI Engineering",
        affiliation: { "@type": "Organization", name: "Nalla Labs", url: "https://nallalabs.xyz" },
        ...(paper.orcid ? { sameAs: `https://orcid.org/${paper.orcid}` } : {}),
      },
      publisher: { "@type": "Organization", name: "Nalla Labs", url: "https://nallalabs.xyz" },
      datePublished: latest.publishedAt,
      version: latest.version,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      image: `${pageUrl}/opengraph-image`,
      about: ["Traffic congestion", "Nairobi", "Public transport", "Urban mobility"],
      spatialCoverage: { "@type": "Place", name: "Nairobi, Kenya" },
      license: "https://creativecommons.org/licenses/by-nc/4.0/",
      isAccessibleForFree: true,
      encoding: [
        { "@type": "MediaObject", name: "Full paper (PDF)", contentUrl: pdfUrl, encodingFormat: "application/pdf" },
        ...(latest.deck
          ? [
              {
                "@type": "MediaObject",
                name: `${latest.deck.title} (PDF)`,
                contentUrl: `https://nallalabs.xyz${latest.deck.file}`,
                encodingFormat: "application/pdf",
              },
            ]
          : []),
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Nalla Labs", item: "https://nallalabs.xyz" },
        { "@type": "ListItem", position: 2, name: "Research", item: "https://nallalabs.xyz/research" },
        { "@type": "ListItem", position: 3, name: paper.title, item: pageUrl },
      ],
    },
  ],
};

const keyNumbers = [
  { value: "8.3 km/h", label: "Average peak-hour speed in Nairobi City in 2023, down from 27.5 km/h in 2013", tag: "Fact" },
  { value: "KSh 46bn", label: "Estimated yearly cost of weekday peak congestion (90% interval 33.6–70.8bn)", tag: "Estimate" },
  { value: "~1m hrs", label: "Person-hours lost to peak delay across the metro area every weekday", tag: "Estimate" },
  { value: "KSh 113–137bn", label: "Already announced for smart signals, traffic systems, cameras and BRT", tag: "Fact" },
];

const actors = [
  { name: "Infrastructure", detail: "Agencies that build capacity, measured by works delivered." },
  { name: "Operators", detail: "Matatu SACCOs and crews, working to daily cash targets." },
  { name: "Enforcement", detail: "Police and NTSA, judged on visible presence on the road." },
  { name: "Road users", detail: "Millions of drivers, riders and walkers, each taking their own fastest route." },
  { name: "Institutions", detail: "Planning bodies working to annual budgets and multi-year projects." },
];

const plan = [
  {
    step: "01",
    title: "Research in the open",
    body: "Publish the evidence, the models, the code and our own limitations. Anyone can re-run the numbers, and corrections go into the next version.",
  },
  {
    step: "02",
    title: "Diagnose before we fix",
    body: "Eight to ten weeks on one route and one stage, observing passengers, vehicles and junctions on a common clock, to find where delay starts, not just where the queue shows.",
  },
  {
    step: "03",
    title: "Give every problem an owner",
    body: "Agree one costed change with a named road authority and a willing SACCO, record it in a shared accountability log, and measure passengers against a comparison site.",
  },
  {
    step: "04",
    title: "Build the coordination system",
    body: "Grow the log into a shared, AI-assisted system that government agencies and operators can adopt. AI measures, detects, diagnoses and routes; named institutions decide and answer for results.",
  },
];

const findings = [
  {
    tag: "Estimated",
    text: "Weekday peak congestion costs the metro area about KSh 46.3 billion a year. The roughly one million person-hours lost each weekday is the firmer number; what an hour is worth drives most of the uncertainty.",
  },
  {
    tag: "Inferred",
    text: "Capacity isn't the whole story. JICA's own forecasts show speeds still falling, to 6.8 km/h on major roads by 2045, even with every planned road and BRT line built.",
  },
  {
    tag: "Illustrated",
    text: "Where a queue shows isn't always where it starts. A stage seat-supply model shows how delays on vehicles' return trips could leave passengers queuing at central stages.",
  },
  {
    tag: "Inferred",
    text: "The parts exist but aren't connected. Cameras, signal systems and data are arriving, but nothing links them to named owners or to passenger outcomes. Nairobi can increasingly see its traffic, but has no clear way to turn that into accountable action.",
  },
  {
    tag: "Proposed",
    text: "Diagnose first, then change one thing. A pilot should go ahead only with a baseline, a named owner, an agreed change, comparison sites and a pre-registered evaluation.",
  },
];

const contributors = [
  { who: "Commuters, crews & marshals", ask: "Tell us how the peaks really work on your route and at your stage. Your observations are evidence." },
  { who: "Researchers", ask: "Take one of the fifteen open problems (P1–P15), or replicate the cost, bottleneck and stage models under your own assumptions." },
  { who: "Engineers & data scientists", ask: "Test AI counting, incident detection and delay attribution against simple baselines on Nairobi data (P13). The model code is MIT-licensed." },
  { who: "Government & agencies", ask: "Name an owner for one site, measure ITS junctions before and after switch-on, and help start a shared accountability log." },
  { who: "SACCOs & operators", ask: "Work through one operational change with us, and share GPS and dispatch records under a data agreement." },
  { who: "Funders & other cities", ask: "Fund the eight- to ten-week diagnosis, or apply the framework in your own city using the minimum dataset in Appendix C." },
];

const statusStyles = {
  current: "border-[#1D4ED8] text-[#1D4ED8] bg-[#EFF6FF]",
  superseded: "border-[#E4E4E7] text-[#A1A1AA]",
  "in-progress": "border-dashed border-[#A1A1AA] text-[#52525B]",
} as const;

const statusLabels = {
  current: "Current",
  superseded: "Superseded",
  "in-progress": "In progress",
} as const;

function SectionHeading({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="label-mono mb-4">{label}</p>
      <h2 className="text-[1.65rem] sm:text-[2rem] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0A0A0A] mb-6">
        {children}
      </h2>
    </div>
  );
}

export default function TrafficJamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main className="relative pt-16">
        {/* Article header */}
        <header className="max-w-6xl mx-auto px-8 lg:px-10 pt-14 lg:pt-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-10">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-[#71717A] hover:text-[#0A0A0A] transition-colors"
            >
              <ArrowLeft size={14} />
              Research
            </Link>
            <span className="text-[#D4D4D8]">/</span>
            <span className="text-[#0A0A0A]">Traffic Jam</span>
          </nav>

          <FadeUp>
            <p className="label-mono !text-[#1D4ED8] mb-6">
              {paper.kind} · {paper.category} · v{latest.version}
            </p>
            <h1 className="text-display text-[#0A0A0A] mb-6 max-w-4xl">
              Nairobi&apos;s traffic isn&apos;t just a road problem. It&apos;s a coordination problem.
            </h1>
            <p className="text-xl text-[#52525B] leading-relaxed max-w-3xl">
              Open research on where commuters&apos; time is lost, what it costs, and who can act on
              it, and the coordination system we&apos;re building in the open, with anyone willing to
              help.
            </p>
          </FadeUp>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#E4E4E7] py-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-[#0A0A0A] text-[#FAFAFA] text-xs font-semibold flex items-center justify-center">
                AR
              </span>
              <div>
                <p className="text-sm font-medium text-[#0A0A0A]">{paper.author}</p>
                <p className="text-xs text-[#71717A]">
                  {paper.authorRole}
                  {paper.orcid ? (
                    <>
                      {" · "}
                      <a
                        href={`https://orcid.org/${paper.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-[#0A0A0A]"
                      >
                        ORCID
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            <p className="label-mono !text-[#52525B]">
              {formatDate(latest.publishedAt)} · {latest.pages} pages · Open for contribution
            </p>
          </div>
        </header>

        {/* Article body + sidebar */}
        <div className="max-w-6xl mx-auto px-8 lg:px-10 pt-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-14 lg:gap-20">
            <article className="space-y-20 min-w-0">
              {/* The pain */}
              <section>
                <SectionHeading id="why" label="Why we're doing this">
                  Two hours. Sometimes three. Every single day.
                </SectionHeading>
                <div className="space-y-5 text-lg text-[#3F3F46] leading-relaxed">
                  <p>
                    You&apos;ve just finished a long day of work. The matatu hasn&apos;t moved in
                    twenty minutes. Ahead, a junction is locked from every side. Nobody is
                    directing it, and nobody can. Two hours later, sometimes three, you get home
                    with nothing left for your family, your rest or yourself. At 6 a.m. it starts
                    again.
                  </p>
                  <p>
                    It doesn&apos;t matter whether you&apos;re in a matatu, an Uber, on a boda or
                    behind your own wheel. The feeling is the same: <strong className="text-[#0A0A0A] font-semibold">helpless</strong>.
                    You can&apos;t leave earlier forever. You can&apos;t take another road; it&apos;s
                    stuck too. And no one you could complain to seems to be in charge of the whole
                    picture.
                  </p>
                  <p>
                    Even on an average day, two peak trips cost a commuter about 122 hours a year,
                    roughly fifteen working days, sitting still. People cope by leaving home
                    earlier, paying in sleep and family time.
                  </p>
                  <p>
                    That missing owner is what we can&apos;t stop thinking about. The jam
                    isn&apos;t bad luck, and it isn&apos;t only too many cars. It&apos;s a system
                    failing millions of people every day, and systems can be studied, measured and
                    fixed.
                  </p>
                </div>
              </section>

              {/* The reframe */}
              <section>
                <SectionHeading id="problem" label="The real problem">
                  More roads alone won&apos;t fix it.
                </SectionHeading>
                <div className="space-y-5 text-lg text-[#3F3F46] leading-relaxed">
                  <p>
                    Nairobi is already investing: between KSh 113 and 137 billion has been
                    announced for smart signals at 210 junctions, traffic systems, speed cameras and
                    bus rapid transit. Those investments may well be needed. But JICA&apos;s own
                    forecasts show speeds still falling even after every planned road and BRT line is
                    built, and cities worldwide find that new road space fills with new traffic.
                  </p>
                  <p>
                    So we&apos;re testing a different explanation. Five systems shape peak road
                    space, and each optimises for something reasonable on its own terms:
                  </p>
                </div>
                <div className="mt-8 border-t border-l border-[#E4E4E7] grid grid-cols-1 sm:grid-cols-2">
                  {actors.map((a, i) => (
                    <div key={a.name} className={`border-r border-b border-[#E4E4E7] p-5 ${i === actors.length - 1 ? "sm:col-span-2" : ""}`}>
                      <p className="font-semibold text-[#0A0A0A] mb-1">{a.name}</p>
                      <p className="text-sm text-[#52525B] leading-relaxed">{a.detail}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="my-10 border-l-2 border-[#1D4ED8] pl-6">
                  <p className="text-2xl sm:text-[1.75rem] leading-snug tracking-[-0.01em] font-semibold text-[#0A0A0A]">
                    Every actor can be doing their job well, and the combined result is still a
                    jam.
                  </p>
                </blockquote>
                <p className="text-lg text-[#3F3F46] leading-relaxed">
                  Our working hypothesis is that a real share of daily peak delay comes from
                  coordination failures: problems that recur every evening, are seen by many
                  people and owned by no one, while the information that could locate their cause
                  sits scattered across agencies, operators and platforms. The research is
                  designed to test that, including the chance that it&apos;s wrong.
                </p>
              </section>

              {/* What it costs */}
              <section>
                <SectionHeading id="cost" label="What it costs">
                  Lost hours add up to a lost economy.
                </SectionHeading>
                <div className="grid grid-cols-2 border-t border-l border-[#E4E4E7]">
                  {keyNumbers.map((n) => (
                    <div key={n.value} className="border-r border-b border-[#E4E4E7] p-5 sm:p-6 bg-white">
                      <p className="label-mono !text-[0.65rem] mb-3">{n.tag}</p>
                      <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A] mb-2">
                        {n.value}
                      </p>
                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">{n.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[#A1A1AA]">
                  Facts are cited from published sources. Estimates come from our open, reproducible
                  cost model and always carry an uncertainty range. Every source is listed in the
                  paper.
                </p>
              </section>

              {/* What we're building */}
              <section>
                <SectionHeading id="plan" label="What we're building">
                  Measure together. Move together.
                </SectionHeading>
                <p className="text-lg text-[#3F3F46] leading-relaxed mb-8">
                  Our long-term goal is a{" "}
                  <strong className="text-[#0A0A0A] font-semibold">
                    shared, AI-assisted traffic coordination system for Kenya
                  </strong>
                  : open to the public, and built to be adopted by government agencies and private
                  operators. We get there one tested step at a time, through research done in the
                  open, together.
                </p>
                <ol className="border-t border-[#E4E4E7]">
                  {plan.map((p) => (
                    <li key={p.step} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#E4E4E7] py-6">
                      <span className="label-mono !text-[#1D4ED8] pt-1">{p.step}</span>
                      <div>
                        <p className="font-semibold text-[#0A0A0A] mb-1.5">{p.title}</p>
                        <p className="text-[#52525B] leading-relaxed">{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Findings */}
              <section>
                <SectionHeading id="findings" label={`Inside v${latest.version}`}>
                  What the paper finds, and how sure we are.
                </SectionHeading>
                <p className="text-[#52525B] leading-relaxed mb-8">
                  The paper labels every claim by how strong it is: estimated from data,
                  illustrated in a model, inferred from documents, or proposed for testing. No
                  fieldwork has been done yet. That&apos;s the next step.
                </p>
                <ol className="space-y-6">
                  {findings.map((finding, i) => (
                    <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-2 text-[#3F3F46] leading-relaxed">
                      <span className="label-mono !text-[#1D4ED8] pt-1">0{i + 1}</span>
                      <div>
                        <span className="label-mono !text-[0.6rem] border border-[#E4E4E7] px-1.5 py-0.5 mr-2 align-middle">
                          {finding.tag}
                        </span>
                        {finding.text}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Abstract */}
              <section>
                <SectionHeading id="abstract" label="Abstract">
                  {paper.title}: {paper.subtitle}
                </SectionHeading>
                <p className="text-[#3F3F46] leading-relaxed">{paper.abstract}</p>
                <p className="mt-4 text-sm text-[#71717A]">
                  <span className="font-medium text-[#52525B]">Keywords:</span>{" "}
                  {paper.keywords.join(", ")}
                </p>
              </section>

              {/* Contribute */}
              <section>
                <SectionHeading id="contribute" label="Open for contribution">
                  This is open-source research. Everyone stuck in traffic is a stakeholder.
                </SectionHeading>
                <p className="text-lg text-[#3F3F46] leading-relaxed mb-8">
                  No one organisation can solve a city&apos;s coordination problem alone,
                  including us. Traffic Jam has no funding and no sponsor; the evidence improves
                  fastest when others test, correct and extend it. Contribution is voluntary, and
                  here&apos;s where you fit:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#E4E4E7]">
                  {contributors.map((c) => (
                    <div key={c.who} className="border-r border-b border-[#E4E4E7] p-5 sm:p-6">
                      <h3 className="font-semibold tracking-tight text-[#0A0A0A] mb-2">{c.who}</h3>
                      <p className="text-sm text-[#52525B] leading-relaxed">{c.ask}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="#feedback"
                  className="mt-8 inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FAFAFA] text-sm px-6 py-3 hover:bg-[#27272A] transition-colors duration-150"
                >
                  Join the research
                  <ArrowRight size={14} />
                </a>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              <PaperStats paper={paper} version={latest.version} />

              <div>
                <p className="label-mono mb-4">Share this research</p>
                <ShareButtons
                  url={pageUrl}
                  text="Nairobi's traffic isn't just a road problem. It's a coordination problem. Open research from Nalla Labs:"
                />
              </div>


              <div className="border border-[#E4E4E7] bg-white p-6">
                <p className="label-mono mb-3">The paper</p>
                <p className="font-semibold text-[#0A0A0A] mb-1">
                  v{latest.version} · {formatDate(latest.publishedAt)}
                </p>
                <p className="text-sm text-[#52525B] mb-1">
                  {paper.kind}, not yet peer reviewed · {latest.pages} pages · {latest.sizeMb} MB PDF
                </p>
                <p className="text-xs text-[#A1A1AA] mb-5">{paper.license}</p>
                <a
                  href={downloadUrl(paper, latest.version, "paper")}
                  download
                  className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-[#FAFAFA] text-sm py-2.5 hover:bg-[#27272A] transition-colors"
                >
                  <Download size={14} />
                  Download PDF
                </a>
                {latest.deck ? (
                  <div className="mt-5 pt-5 border-t border-[#E4E4E7]">
                    <p className="text-sm font-medium text-[#0A0A0A] mb-1">Short on time?</p>
                    <p className="text-xs text-[#52525B] mb-3">
                      {latest.deck.title}. {latest.deck.pages} slides · {latest.deck.sizeMb} MB
                    </p>
                    <a
                      href={downloadUrl(paper, latest.version, "deck")}
                      download
                      className="flex items-center justify-center gap-2 border border-[#E4E4E7] text-[#0A0A0A] text-sm py-2.5 hover:border-[#0A0A0A] transition-colors"
                    >
                      <Download size={14} />
                      Download briefing
                    </a>
                  </div>
                ) : null}
              </div>

              <div className="bg-[#0A0A0A] text-[#FAFAFA] p-6">
                <p className="text-lg font-semibold tracking-tight mb-3">Why Nalla Labs?</p>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  We design, build and staff the systems African institutions run on: GIS, data
                  engineering and AI that&apos;s tested before it ships. A city-wide coordination
                  layer needs exactly that. And our team sits in this traffic too.
                </p>
                <a
                  href="#feedback"
                  className="flex items-center justify-center gap-2 bg-[#FAFAFA] text-[#0A0A0A] text-sm py-2.5 hover:bg-[#E4E4E7] transition-colors"
                >
                  Contribute
                </a>
              </div>
              <nav aria-label="On this page" className="hidden lg:block lg:sticky lg:top-24 border-t border-[#E4E4E7] pt-6">
                <p className="label-mono mb-4">On this page</p>
                <ul className="space-y-2.5 text-sm">
                  {[
                    ["#why", "Why we're doing this"],
                    ["#problem", "The real problem"],
                    ["#cost", "What it costs"],
                    ["#plan", "What we're building"],
                    ["#findings", "What the paper finds"],
                    ["#abstract", "Abstract"],
                    ["#contribute", "Where you fit"],
                    ["#paper", "Read the paper"],
                    ["#versions", "Version history"],
                    ["#feedback", "Send feedback"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className="text-[#71717A] hover:text-[#0A0A0A] transition-colors">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </div>

        {/* Viewer */}
        <section id="paper" className="py-24 bg-[#F4F4F5] border-y border-[#E4E4E7] scroll-mt-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-10">
            <FadeUp className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="label-mono mb-4">Read the paper</p>
                <h2 className="text-h2 text-[#0A0A0A]">Read it here, or take it with you.</h2>
              </div>
              <p className="text-sm text-[#52525B] max-w-md">
                Free to read, download and share. Please cite the version number, as figures can
                change between versions.
              </p>
            </FadeUp>
            <FadeUp delay={0.05}>
              <PaperViewer paper={paper} />
            </FadeUp>
          </div>
        </section>

        {/* Version tracker */}
        <section id="versions" className="py-24 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">
              <FadeUp>
                <p className="label-mono mb-6">Version history</p>
                <h2 className="text-h2 text-[#0A0A0A] mb-6">A living document.</h2>
                <p className="text-[#52525B] leading-relaxed">
                  Every published version stays available, with its date and what changed, so
                  you can see how the thinking moved and cite the exact version you read.
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <ol className="relative border-l border-[#E4E4E7]">
                  {paper.versions.map((v) => (
                    <li key={v.version} className="relative pl-8 pb-10 last:pb-0">
                      <span
                        className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] ${
                          v.status === "current"
                            ? "bg-[#1D4ED8]"
                            : v.status === "in-progress"
                              ? "bg-[#FAFAFA] border border-dashed border-[#A1A1AA]"
                              : "bg-[#D4D4D8]"
                        }`}
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
                          v{v.version}
                        </span>
                        <span className={`label-mono !text-[0.65rem] border px-2 py-0.5 ${statusStyles[v.status]}`}>
                          {statusLabels[v.status]}
                        </span>
                        <span className="text-sm text-[#A1A1AA]">
                          {v.status === "in-progress" ? "Upcoming" : formatDate(v.publishedAt)}
                        </span>
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {v.changes.map((c) => (
                          <li key={c} className="text-sm text-[#52525B] leading-relaxed">
                            — {c}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {v.file ? (
                          <a
                            href={downloadUrl(paper, v.version, "paper")}
                            download
                            className="inline-flex items-center gap-2 text-sm text-[#0A0A0A] border-b border-[#0A0A0A] pb-0.5 hover:text-[#1D4ED8] hover:border-[#1D4ED8] transition-colors"
                          >
                            <Download size={13} />
                            Full paper v{v.version}
                            {v.sizeMb ? ` (${v.sizeMb} MB)` : ""}
                          </a>
                        ) : null}
                        {v.deck ? (
                          <a
                            href={downloadUrl(paper, v.version, "deck")}
                            download
                            className="inline-flex items-center gap-2 text-sm text-[#0A0A0A] border-b border-[#0A0A0A] pb-0.5 hover:text-[#1D4ED8] hover:border-[#1D4ED8] transition-colors"
                          >
                            <Download size={13} />
                            Briefing, {v.deck.pages} slides ({v.deck.sizeMb} MB)
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section id="feedback" className="py-28 bg-[#F4F4F5] border-y border-[#E4E4E7] scroll-mt-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
              <FadeUp>
                <p className="label-mono mb-6">Feedback</p>
                <h2 className="text-h2 text-[#0A0A0A] mb-6">Tell us what we got wrong.</h2>
                <p className="text-[#52525B] leading-relaxed mb-6">
                  Views, comments, criticism, a better source, an offer of help. All feedback is
                  welcome. The most useful notes point to a page number and say what should
                  change.
                </p>
                <p className="text-[#52525B] leading-relaxed">
                  We read every submission. Corrections that hold up go into the next version,
                  credited to you.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <FeedbackForm paper={paper} />
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
