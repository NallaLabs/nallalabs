import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion/FadeUp";

const industries = [
  {
    label: "Fintech",
    title: "Financial Services",
    description:
      "Payment rails, settlement systems, and regulatory-compliant infrastructure for banks, neobanks, and financial platforms.",
    examples: ["Payment settlement", "Digital wallets", "Compliance automation"],
  },
  {
    label: "Startups",
    title: "Early Stage",
    description:
      "Architecture decisions that don't become technical debt. We help founders build the right foundation from the beginning.",
    examples: ["MVP architecture", "Token design", "Scalability planning"],
  },
  {
    label: "Enterprise",
    title: "Established Companies",
    description:
      "Blockchain adoption that integrates with existing systems. Clear ROI, manageable risk, and infrastructure that lasts.",
    examples: ["Legacy integration", "Supply chain", "Internal tooling"],
  },
];

export function Industries() {
  return (
    <section className="py-28 bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <FadeUp className="mb-16">
          <p className="label-mono mb-4">Industries</p>
          <h2 className="text-h2 text-[#0A0A0A] max-w-lg">
            We go deep in three verticals.
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <StaggerItem key={industry.label}>
              <div className="border border-[#E4E4E7] bg-white p-8 h-full">
                <p className="label-mono text-[#1D4ED8] mb-4">{industry.label}</p>
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-3">{industry.title}</h3>
                <p className="text-sm text-[#52525B] leading-relaxed mb-6">{industry.description}</p>
                <ul className="space-y-1.5">
                  {industry.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-sm text-[#71717A]">
                      <span className="w-1 h-1 rounded-full bg-[#A1A1AA] shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
