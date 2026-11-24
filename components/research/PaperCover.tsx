import type { Paper, PaperVersion } from "@/lib/research";

/** Typographic cover for a paper card. Pure markup, so it never goes stale against the PDF. */
export function PaperCover({ paper, version }: { paper: Paper; version: PaperVersion }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0A0A0A] text-[#FAFAFA] p-6 sm:p-10 flex flex-col justify-between">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(#FAFAFA 1px, transparent 1px),
            linear-gradient(90deg, #FAFAFA 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      {/* Stylised congested corridor: many short bars, one clear lane. */}
      <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-60" aria-hidden>
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="absolute right-0 h-1.5 bg-[#FAFAFA]/25"
            style={{ bottom: `${row * 18 + 10}%`, width: `${100 - row * 14}%` }}
          />
        ))}
        <div className="absolute right-0 h-1.5 bg-[#1D4ED8]" style={{ bottom: "46%", width: "70%" }} />
      </div>

      <p className="relative label-mono !text-[#A1A1AA] !text-[0.65rem]">
        Nalla Labs · Research
      </p>
      <div className="relative">
        <p className="label-mono !text-[#93C5FD] !text-[0.65rem] mb-3">
          {paper.kind} · v{version.version}
        </p>
        <p className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.95] mb-4">
          {paper.title}
        </p>
        <p className="text-sm text-white/60 max-w-xs leading-relaxed">
          A passenger-centred diagnostic framework for congestion in Nairobi, Kenya
        </p>
      </div>
    </div>
  );
}
