import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion/FadeUp";

const articles = [
  {
    date: "Mar 2025",
    readTime: "6 min read",
    title: "Why most smart contract audits miss architectural risk",
    excerpt:
      "Line-by-line audits catch bugs. Architecture reviews catch the mistakes that make bugs inevitable. The difference is where most projects get it wrong.",
    href: "#",
  },
  {
    date: "Feb 2025",
    readTime: "8 min read",
    title: "L2 selection criteria for payment systems in 2025",
    excerpt:
      "Not all L2s are built the same. When your application moves real money, finality guarantees and sequencer trust models matter more than gas costs.",
    href: "#",
  },
  {
    date: "Jan 2025",
    readTime: "5 min read",
    title: "The hidden cost of building DeFi on the wrong chain",
    excerpt:
      "Chain selection is a decade-long decision. Most teams make it in a week based on developer familiarity. Here's what they should be asking instead.",
    href: "#",
  },
];

export function Insights() {
  return (
    <section id="insights" className="py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <FadeUp className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="label-mono mb-4">Insights</p>
            <h2 className="text-h2 text-[#0A0A0A] max-w-md">
              Thinking out loud.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-[#52525B] hover:text-[#0A0A0A] transition-colors"
          >
            All articles <ArrowRight size={14} />
          </a>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <StaggerItem key={article.title}>
              <a
                href={article.href}
                className="block border border-[#E4E4E7] p-8 group hover:border-[#1D4ED8] transition-colors duration-150 h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-[#A1A1AA]">{article.date}</span>
                  <span className="text-[#E4E4E7]">·</span>
                  <span className="font-mono text-xs text-[#A1A1AA]">{article.readTime}</span>
                </div>
                {/* Accent top border on hover */}
                <div className="h-px bg-[#E4E4E7] group-hover:bg-[#1D4ED8] transition-colors duration-150 mb-6" />
                <h3 className="text-base font-semibold text-[#0A0A0A] group-hover:text-[#1D4ED8] leading-snug mb-4 transition-colors duration-150">
                  {article.title}
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">{article.excerpt}</p>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
