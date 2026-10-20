import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

type Partner = {
  name: string;
  field: string;
  href: string;
  logo: { src: string; width: number; height: number };
  /** The logo is a symbol only, so the name is set beside it. */
  markOnly?: boolean;
};

const partners: Partner[] = [
  {
    name: "Baraza Media Lab",
    field: "Media innovation",
    href: "https://barazalab.com/",
    logo: { src: "/partners/baraza-media-lab.png", width: 900, height: 204 },
  },
  {
    name: "Nexillum",
    field: "Cloud infrastructure",
    href: "https://nexillum.com",
    logo: { src: "/partners/nexillum.svg", width: 644, height: 446 },
    markOnly: true,
  },
  {
    name: "Zone01 Kisumu",
    field: "Engineering talent",
    href: "https://www.zone01kisumu.ke/",
    logo: { src: "/partners/zone01-kisumu.png", width: 311, height: 118 },
  },
  {
    name: "Topizzy",
    field: "Payments",
    href: "https://topizzy.xyz",
    logo: { src: "/partners/topizzy.png", width: 264, height: 236 },
    markOnly: true,
  },
  {
    name: "Naked Journalism",
    field: "Independent media",
    href: "https://nakedjournalism.xyz",
    logo: { src: "/partners/naked-journalism.png", width: 325, height: 108 },
  },
];

export function Partners() {
  return (
    <section id="partners" className="bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-8 lg:px-10 py-14">
        <FadeUp>
          <p className="label-mono mb-6">Partners</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#E4E4E7] border border-[#E4E4E7]">
            {partners.map((partner) => (
              <li key={partner.name} className="bg-[#F4F4F5]">
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${partner.name} (opens in a new tab)`}
                  className="group flex h-full flex-col justify-between gap-8 p-6 hover:bg-white transition-colors duration-150"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex h-10 items-center gap-2.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-200">
                      <Image
                        src={partner.logo.src}
                        alt={partner.markOnly ? "" : partner.name}
                        width={partner.logo.width}
                        height={partner.logo.height}
                        className={`w-auto object-contain ${partner.markOnly ? "h-8" : "h-full max-w-[150px]"}`}
                      />
                      {partner.markOnly && (
                        <span className="text-lg font-semibold tracking-tight text-[#0A0A0A]">
                          {partner.name}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-[#A1A1AA] group-hover:text-[#1D4ED8] transition-colors duration-150"
                      aria-hidden
                    />
                  </span>
                  <span className="font-mono text-xs text-[#52525B] group-hover:text-[#1D4ED8] transition-colors duration-150">
                    {partner.field}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
