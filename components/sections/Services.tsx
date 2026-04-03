import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion/FadeUp";

const services = [
  {
    label: "Advisory",
    title: "Strategy & Architecture",
    description:
      "We help you make the right decisions before writing a single line of code. From blockchain adoption strategy and architecture design to tokenomics and regulatory guidance.",
    tags: ["Strategy", "Architecture", "Tokenomics", "Product Planning"],
  },
  {
    label: "Engineering",
    title: "Design & Build",
    description:
      "Full-stack blockchain engineering. Smart contract development, DeFi protocol design, payment infrastructure, and production-grade dApps and wallets.",
    tags: ["Smart Contracts", "DeFi Protocols", "Payment Systems", "dApps"],
  },
  {
    label: "Scale + Security",
    title: "Optimize & Secure",
    description:
      "Security audits, infrastructure optimization, and ongoing advisory for systems already in production. We find what others miss.",
    tags: ["Audits", "Optimization", "Integrations"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <FadeUp>
            <div className="lg:sticky lg:top-32 self-start">
              <p className="label-mono mb-6">What we do</p>
              <h2 className="text-h2 text-[#0A0A0A] mb-6">
                Three layers of expertise, one committed partner.
              </h2>
              <p className="text-[#52525B] leading-relaxed">
                We operate across strategy, engineering, and scale. Most clients start with advisory
                and stay for the build.
              </p>
            </div>
          </FadeUp>

          {/* Right column — service cards */}
          <StaggerContainer className="space-y-4">
            {services.map((service) => (
              <StaggerItem key={service.label}>
                <div className="border border-[#E4E4E7] p-8 group hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors duration-150 cursor-default">
                  <p className="label-mono text-[#1D4ED8] mb-3">{service.label}</p>
                  <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-[#52525B] border border-[#E4E4E7] bg-[#F4F4F5] px-2.5 py-1 group-hover:border-[#DBEAFE] group-hover:bg-[#DBEAFE] group-hover:text-[#1D4ED8] transition-colors duration-150"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
