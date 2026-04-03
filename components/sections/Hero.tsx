"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl"
        >
          {/* Label */}
          <motion.p variants={itemVariants} className="label-mono mb-8">
            Blockchain + Financial Infrastructure
          </motion.p>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-display text-[#0A0A0A] mb-6">
            We design and build systems financial infrastructure runs on.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#52525B] leading-relaxed max-w-xl mb-10"
          >
            Senior advisory and engineering for companies that need blockchain
            infrastructure done right the first time.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FAFAFA] text-sm px-6 py-3 hover:bg-[#27272A] transition-colors duration-150"
            >
              Work with us
              <ArrowRight size={14} />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 border border-[#E4E4E7] text-[#0A0A0A] text-sm px-6 py-3 hover:border-[#0A0A0A] transition-colors duration-150"
            >
              View our work
            </a>
          </motion.div>
        </motion.div>

        {/* Sparse background grid — structural only */}
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
      </div>
    </section>
  );
}
