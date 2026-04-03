import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion/FadeUp";

const caseStudies = [
  {
    featured: true,
    industry: "Fintech Infrastructure",
    title: "Rebuilding payment settlement architecture for a Series B neobank",
    challenge: "Legacy settlement system creating 48h delays and growing compliance risk.",
    approach: "Designed a new event-driven settlement layer on EVM with real-time reconciliation.",
    outcome: "40% reduction in settlement latency; passed regulatory audit on first submission.",
    href: "#",
  },
  {
    featured: false,
    industry: "DeFi Protocol",
    title: "Smart contract audit and redesign for a lending protocol",
    challenge: "Pre-launch audit found critical reentrancy vulnerabilities in three contracts.",
    approach: "Full architecture review and redesign of the collateral management module.",
    outcome: "Protocol launched with zero security incidents; $80M TVL in first 90 days.",
    href: "#",
  },
  {
    featured: false,
    industry: "Enterprise Blockchain",
    title: "L2 migration strategy for an enterprise supply chain platform",
    challenge: "Rising L1 gas costs making the system uneconomical at scale.",
    approach: "Evaluated OP Stack, Arbitrum Orbit, and ZK rollup options; built migration plan.",
    outcome: "95% cost reduction post-migration with equivalent finality guarantees.",
    href: "#",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <FadeUp className="mb-16">
          <p className="label-mono mb-4">Case studies</p>
          <h2 className="text-h2 text-[#0A0A0A] max-w-lg">
            Work that speaks for itself.
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.title}>
              {cs.featured ? (
                <FeaturedCard cs={cs} />
              ) : (
                <RegularCard cs={cs} />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function FeaturedCard({ cs }: { cs: (typeof caseStudies)[0] }) {
  return (
    <div className="lg:col-span-1 bg-[#0A0A0A] p-8 flex flex-col h-full group">
      <p className="label-mono text-[#52525B] mb-6">{cs.industry}</p>
      <h3 className="text-lg font-semibold text-[#FAFAFA] leading-snug mb-6 flex-1">
        {cs.title}
      </h3>
      <div className="space-y-3 mb-8">
        <Row dark label="Challenge" value={cs.challenge} />
        <Row dark label="Approach" value={cs.approach} />
        <Row dark label="Outcome" value={cs.outcome} accent />
      </div>
      <a
        href={cs.href}
        className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors group-hover:gap-3 duration-150"
      >
        Read full case study <ArrowRight size={14} />
      </a>
    </div>
  );
}

function RegularCard({ cs }: { cs: (typeof caseStudies)[0] }) {
  return (
    <div className="border border-[#E4E4E7] p-8 flex flex-col h-full group hover:border-[#1D4ED8] transition-colors duration-150">
      <p className="label-mono mb-6">{cs.industry}</p>
      <h3 className="text-base font-semibold text-[#0A0A0A] leading-snug mb-6 flex-1">
        {cs.title}
      </h3>
      <div className="space-y-3 mb-8">
        <Row label="Challenge" value={cs.challenge} />
        <Row label="Approach" value={cs.approach} />
        <Row label="Outcome" value={cs.outcome} />
      </div>
      <a
        href={cs.href}
        className="inline-flex items-center gap-2 text-sm text-[#52525B] group-hover:text-[#1D4ED8] transition-colors group-hover:gap-3 duration-150"
      >
        Read full case study <ArrowRight size={14} />
      </a>
    </div>
  );
}

function Row({
  label,
  value,
  dark = false,
  accent = false,
}: {
  label: string;
  value: string;
  dark?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className={`font-mono text-xs shrink-0 w-20 pt-0.5 ${dark ? "text-[#52525B]" : "text-[#A1A1AA]"}`}>
        {label}
      </span>
      <span className={`text-sm leading-snug ${dark ? (accent ? "text-[#93C5FD]" : "text-[#A1A1AA]") : "text-[#52525B]"}`}>
        {value}
      </span>
    </div>
  );
}
