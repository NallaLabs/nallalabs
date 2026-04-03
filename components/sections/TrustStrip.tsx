import { FadeUp } from "@/components/motion/FadeUp";

const stats = [
  { value: "8+", label: "Years in blockchain engineering", mono: true },
  { value: "$2B+", label: "In system value managed", mono: true },
  { value: "EVM · L2 · Payments", label: "Core specializations", mono: false },
];

export function TrustStrip() {
  return (
    <section className="bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E4E4E7]">
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 py-6 first:pl-0 last:pr-0">
                <p
                  className={`text-3xl font-bold tracking-tight text-[#0A0A0A] mb-2 ${
                    stat.mono ? "" : "font-mono text-2xl"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-[#52525B]">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
