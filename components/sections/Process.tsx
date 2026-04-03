"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { CountUp } from "@/components/motion/CountUp";

const steps = [
  {
    num: 1,
    label: "Discover",
    description:
      "Understand your goals, constraints, and the technology landscape. We map what exists and what needs to be built.",
  },
  {
    num: 2,
    label: "Design",
    description:
      "Architecture and system specification. Every decision documented before any code is written.",
  },
  {
    num: 3,
    label: "Build",
    description:
      "Development and delivery. Audited, tested, and production-ready from day one.",
  },
  {
    num: 4,
    label: "Scale",
    description:
      "Optimization, monitoring, and ongoing iteration. We stay engaged as your system grows.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="mb-16">
          <p className="label-mono mb-4">How we work</p>
          <h2 className="text-h2 text-[#0A0A0A] max-w-md">
            A clear process, every engagement.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  delay,
}: {
  step: (typeof steps)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <div className="font-mono text-6xl font-bold text-[#E4E4E7] leading-none mb-4 tabular-nums">
        {isInView && (
          <CountUp target={step.num} prefix="0" duration={600} />
        )}
      </div>
      <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">{step.label}</h3>
      <p className="text-sm text-[#52525B] leading-relaxed">{step.description}</p>
    </motion.div>
  );
}
