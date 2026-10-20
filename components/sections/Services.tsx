import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion/FadeUp";

const services = [
  {
    label: "Nalla Studio",
    title: "Advisory & Engineering",
    description:
      "We plan, design and build the systems that move money, water and data. That means payments and blockchain infrastructure, product and brand design, GIS and analytics, and AI that's tested before it ships.",
    tags: ["Financial infrastructure", "Product & design", "Data & GIS", "AI integration"],
    cta: "Start a project",
    href: "#contact",
  },
  {
    label: "Nalla Academy",
    title: "Zero to Hero Engineering",
    description:
      "A 26-week course that takes complete beginners to job-ready software engineers. It covers Go, Linux, databases and security, in plain English with Kenyan examples. Our best graduates join the Studio.",
    tags: ["26 weeks", "Go", "Linux", "Security"],
    cta: "See the curriculum",
    href: "https://academy.nallalabs.xyz",
  },
  {
    label: "Nalla Programmes",
    title: "Ecosystem & Events",
    description:
      "Hackathons, exhibitions and partnerships that bring technology to the people it's meant to serve. Tech for Media 2026 brings journalists, creatives and artists together to build for a media industry reshaped by AI.",
    tags: ["Tech for Media", "Hackathons", "Partnerships"],
    cta: "Register for Tech for Media",
    href: "/events/tech-for-media-2026",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left column */}
          <FadeUp>
            <div className="lg:sticky lg:top-32 self-start">
              <p className="label-mono mb-6">How we&apos;re built</p>
              <h2 className="text-h2 text-[#0A0A0A] mb-6">
                One lab. Three ways in.
              </h2>
              <p className="text-[#52525B] leading-relaxed">
                Most firms sell hours. We also train the people and grow the community around the
                work, so what we build keeps working after we leave.
              </p>
            </div>
          </FadeUp>

          {/* Right column — service cards */}
          <StaggerContainer className="space-y-4">
            {services.map((service) => (
              <StaggerItem key={service.label}>
                <a
                  href={service.href}
                  className="block border border-[#E4E4E7] p-8 group hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors duration-150"
                >
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
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#0A0A0A] group-hover:text-[#1D4ED8] transition-colors duration-150">
                    {service.cta}
                    <ArrowRight size={14} />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
