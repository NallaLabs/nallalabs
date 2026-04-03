import { FadeUp } from "@/components/motion/FadeUp";

const executives = [
  {
    name: "Allan Robinson",
    role: "Executive",
    href: "https://www.linkedin.com/in/allan-robinson-3b54511a4/",
  },
  {
    name: "Fred Gitonga",
    role: "Executive",
    href: "https://www.linkedin.com/in/fredgitonga",
  },
];

export function About() {
  return (
    <section id="about" className="py-28 bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left */}
          <FadeUp>
            <p className="label-mono mb-6">About</p>
            <h2 className="text-h2 text-[#0A0A0A] mb-6">
              Built by engineers who&apos;ve been in the infrastructure.
            </h2>
            <p className="text-[#52525B] leading-relaxed mb-6">
              Nalla Labs was built around a belief that blockchain infrastructure should be designed
              with the same rigor as financial systems. We work with a small number of clients at a
              time, which is how we maintain quality.
            </p>
            <p className="text-[#52525B] leading-relaxed">
              We are a 2-time founder-led team with senior engineering depth in DeFi protocols,
              payment infrastructure, and enterprise blockchain deployments across fintech, startups,
              and enterprises.
            </p>

            <div className="mt-10">
              <p className="label-mono mb-4">Leadership</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {executives.map((person) => (
                  <a
                    key={person.name}
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#E4E4E7] bg-white p-4 hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors duration-150"
                  >
                    <p className="text-sm font-semibold text-[#0A0A0A]">{person.name}</p>
                    <p className="text-xs text-[#52525B] mt-1">{person.role}</p>
                    <p className="text-xs text-[#1D4ED8] mt-3">LinkedIn profile</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <blockquote className="mt-10 border-l-2 border-[#1D4ED8] pl-6">
              <p className="text-xl font-semibold text-[#0A0A0A] tracking-tight">
                &ldquo;Fewer clients. Deeper work.&rdquo;
              </p>
            </blockquote>
          </FadeUp>

          {/* Right — founder credential block */}
          <FadeUp delay={0.1}>
            <div className="border border-[#E4E4E7] bg-white p-8">
              <p className="label-mono mb-6">Founders</p>
              <div className="font-mono text-sm space-y-0 text-[#52525B]">
                <div className="flex border-b border-[#F4F4F5] py-3">
                  <span className="text-[#A1A1AA] w-32 shrink-0">Role</span>
                  <span className="text-[#0A0A0A]">Lead Engineer + Advisor</span>
                </div>
                <div className="flex border-b border-[#F4F4F5] py-3">
                  <span className="text-[#A1A1AA] w-32 shrink-0">Founded</span>
                  <span className="text-[#0A0A0A]">2-time founder</span>
                </div>
                <div className="flex border-b border-[#F4F4F5] py-3">
                  <span className="text-[#A1A1AA] w-32 shrink-0">Experience</span>
                  <span className="text-[#0A0A0A]">8+ years blockchain engineering</span>
                </div>
                <div className="flex border-b border-[#F4F4F5] py-3">
                  <span className="text-[#A1A1AA] w-32 shrink-0">Focus</span>
                  <span className="text-[#0A0A0A]">DeFi protocols, payment systems</span>
                </div>
                <div className="flex py-3">
                  <span className="text-[#A1A1AA] w-32 shrink-0">Philosophy</span>
                  <span className="text-[#0A0A0A]">Precision over speed</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
