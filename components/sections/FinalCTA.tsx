import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

export function FinalCTA() {
  return (
    <section className="py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-8 lg:px-10 text-center">
        <FadeUp>
          <p className="label-mono text-[#52525B] mb-6">Get started</p>
          <h2 className="text-h2 text-[#FAFAFA] mb-4">Ready to build?</h2>
          <p className="text-[#71717A] text-lg mb-12 max-w-md mx-auto leading-relaxed">
            We take on a limited number of engagements. Let&apos;s talk about yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#FAFAFA] text-[#0A0A0A] text-sm px-8 py-3 hover:bg-[#E4E4E7] transition-colors duration-150"
            >
              Book a consultation
              <ArrowRight size={14} />
            </a>
            <a
              href="mailto:hello@nallalabs.xyz"
              className="inline-flex items-center gap-2 border border-[#27272A] text-[#FAFAFA] text-sm px-8 py-3 hover:border-[#71717A] transition-colors duration-150"
            >
              Send us a brief
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
