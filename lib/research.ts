// Research papers and their published versions.
//
// To publish a new version: drop the PDF in public/research/<slug>/, then add an
// entry to the top of that paper's `versions` array. The newest version with a
// `file` is shown in the viewer by default; the tracker lists every entry.

export type PaperVersion = {
  version: string;
  /** ISO date the version was published: YYYY-MM-DD, or YYYY-MM if only the month is known. */
  publishedAt: string;
  /** Path under /public, or undefined if the version isn't hosted on the site. */
  file?: string;
  pages?: number;
  sizeMb?: number;
  /** Exact file size, used to report data volume in the stats. */
  bytes?: number;
  /** Optional companion slide deck summarising this version. */
  deck?: { title: string; file: string; pages: number; sizeMb: number; bytes: number };
  status: "current" | "superseded" | "in-progress";
  changes: string[];
};

export type Paper = {
  slug: string;
  href: string;
  category: string;
  /** e.g. "Preprint", "Working paper". */
  kind: string;
  title: string;
  subtitle: string;
  /** One-line hook used on the research index card. */
  excerpt: string;
  author: string;
  authorRole: string;
  orcid?: string;
  license: string;
  /** Verbatim abstract, shown on the page so Google Scholar can index it. */
  abstract: string;
  keywords: string[];
  versions: PaperVersion[];
};

export const trafficJam: Paper = {
  slug: "traffic-jam",
  href: "/research/traffic-jam",
  category: "Urban mobility",
  kind: "Preprint",
  title: "Traffic Jam",
  subtitle:
    "A Passenger-Centred Diagnostic Framework for Congestion, Public Transport Operations and Institutional Coordination in Nairobi, Kenya",
  excerpt:
    "More roads alone won't fix Nairobi's traffic. An open study of where passengers' time is lost, what it costs, and who can act on it.",
  author: "Allan Robinson",
  authorRole: "VP AI Engineering, Nalla Labs",
  orcid: "0009-0002-4515-6159",
  license: "CC BY-NC 4.0 (paper) · MIT (model code)",
  abstract:
    "Urban congestion in Nairobi is commonly addressed through road building, enforcement and transport technology, yet recurring delays may also arise from interactions among road capacity, public transport operations, traffic management, road-user behaviour and institutional coordination. This paper develops a passenger-centred framework for identifying where delay originates rather than only where it is observed, and sets out a research programme to test it. Using secondary data from the Japan International Cooperation Agency’s 2023 household survey, TomTom speed indicators and national statistics, a wage-based model estimates the economic cost of weekday peak congestion in the Nairobi Metropolitan Area at about KSh 46.3 billion a year under central assumptions; a Monte Carlo analysis gives a 90% uncertainty interval of KSh 33.6–70.8 billion, with the value of travel time and peak delay accounting for most of the variance. An illustrative stage seat-supply model shows how delays on inbound vehicle trips could produce passenger queues at central stages; it requires field calibration. A review of congestion economics, from Pigou and Vickrey to recent field experiments, and of Nairobi’s monitoring systems informs a proposed diagnosis-first pilot with a named operating owner, comparison sites and a pre-specified difference-in-differences evaluation, and a staged design for an AI-assisted coordination system in which decisions remain with responsible institutions. No primary fieldwork has yet been conducted. The contributions are a preliminary estimate, a diagnostic framework, an operational model, and a protocol for validation and replication in other cities.",
  keywords: [
    "Nairobi traffic",
    "urban congestion",
    "passenger travel time",
    "paratransit",
    "matatu",
    "traffic diagnosis",
    "institutional coordination",
    "congestion pricing",
    "AI-assisted transport management",
    "Kenya",
  ],
  versions: [
    {
      version: "2.0",
      publishedAt: "",
      status: "in-progress",
      changes: ["Folding in reader feedback, corrections, replications and new sources on v1.0."],
    },
    {
      version: "1.0",
      publishedAt: "2026-11-23",
      file: "/research/traffic-jam/Allan_Robinson_2026_TrafficJam_v1.0.pdf",
      pages: 66,
      sizeMb: 0.5,
      bytes: 480524,
      deck: {
        title: "Beyond the Traffic Jam: Stakeholder Briefing",
        file: "/research/traffic-jam/Allan_Robinson_2026_Beyond_the_Traffic_Jam_Briefing_v1.0.pdf",
        pages: 13,
        sizeMb: 9.8,
        bytes: 9770625,
      },
      status: "current",
      changes: [
        "First public preprint. Not yet peer reviewed.",
        "Companion 13-slide stakeholder briefing, Beyond the Traffic Jam: the problem, the evidence and the plan.",
        "Reproducible cost model with a Monte Carlo uncertainty analysis: about KSh 46.3bn a year (90% interval 33.6–70.8bn).",
        "Central-Stage Seat Supply and Passenger Queue Model, to be calibrated in the field.",
        "Diagnosis-first pilot protocol with a pre-specified difference-in-differences evaluation.",
        "Fifteen open problems (P1–P15) for contributors.",
      ],
    },
  ],
};

export const papers = [trafficJam];

export const feedbackTypes = [
  "General comment",
  "Critique or correction",
  "Data or source suggestion",
  "Offer of assistance",
  "Partnership or funding",
  "Other",
] as const;

export const contributorRoles = [
  "Researcher",
  "Engineer or data scientist",
  "Commuter",
  "Agency or government",
  "SACCO, rider or operator",
  "Funder",
  "Media",
  "Other",
];

export function latestPublished(paper: Paper) {
  return paper.versions.find((v) => v.file)!;
}

export function formatDate(iso: string) {
  if (!iso) return "Upcoming";
  const monthOnly = iso.length === 7;
  return new Date(`${monthOnly ? `${iso}-01` : iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: monthOnly ? undefined : "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type ResearchDoc = "paper" | "deck";

/** Tracked download link: counts the download, then redirects to the PDF. */
export function downloadUrl(paper: Paper, version: string, doc: ResearchDoc) {
  const params = new URLSearchParams({ paper: paper.slug, version, doc });
  return `/api/research/download?${params}`;
}

export function findDocument(paperSlug: string, version: string, doc: string) {
  const paper = papers.find((p) => p.slug === paperSlug);
  const v = paper?.versions.find((x) => x.version === version);
  if (!paper || !v) return null;
  if (doc === "paper" && v.file) return { paper, version: v, file: v.file, bytes: v.bytes ?? 0 };
  if (doc === "deck" && v.deck) return { paper, version: v, file: v.deck.file, bytes: v.deck.bytes };
  return null;
}

export function formatBytes(bytes: number) {
  if (bytes < 1e3) return `${bytes} B`;
  if (bytes < 1e6) return `${(bytes / 1e3).toFixed(1)} kB`;
  if (bytes < 1e9) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${(bytes / 1e9).toFixed(2)} GB`;
}
