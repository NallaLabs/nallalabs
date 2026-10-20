import { ArrowUpRight } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";

type Leader = {
  name: string;
  role: string;
  focus: string;
  href?: string;
};

const leaders: Leader[] = [
  {
    name: "Allan Robinson",
    role: "VP AI Engineering",
    focus: "Leads AI engineering",
    href: "https://www.linkedin.com/in/allan-robinson-3b54511a4/",
  },
  {
    name: "Fred Gitonga",
    role: "VP Payments + Blockchain",
    focus: "Leads payments + blockchain infrastructure",
    href: "https://www.linkedin.com/in/fredgitonga",
  },
  {
    name: "Ann Maina",
    role: "VP Product",
    focus: "Leads product, brand + programme design",
    href: "https://www.linkedin.com/in/ann-maina-37797820b/",
  },
];

const facts = [
  { label: "Based", value: "Nairobi · Kisumu" },
  { label: "Practices", value: "Financial infrastructure, product + design, data + AI" },
  { label: "Academy", value: "26-week Zero to Hero engineering" },
  { label: "Programmes", value: "Tech for Media 2026" },
  { label: "Philosophy", value: "Precision over speed" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function LeaderCard({ person }: { person: Leader }) {
  const body = (
    <>
      <div className="flex items-start justify-between mb-8">
        <span
          className="flex h-12 w-12 items-center justify-center bg-[#0A0A0A] font-mono text-sm text-[#FAFAFA] group-hover:bg-[#1D4ED8] transition-colors duration-150"
          aria-hidden
        >
          {initials(person.name)}
        </span>
        {person.href && (
          <ArrowUpRight
            size={16}
            className="text-[#A1A1AA] group-hover:text-[#1D4ED8] transition-colors duration-150"
            aria-hidden
          />
        )}
      </div>
      <p className="text-lg font-semibold tracking-tight text-[#0A0A0A]">{person.name}</p>
      <p className="label-mono text-[#1D4ED8] mt-2">{person.role}</p>
      <p className="text-sm text-[#52525B] mt-4 leading-relaxed">{person.focus}</p>
    </>
  );

  const base = "group block h-full border border-[#E4E4E7] bg-white p-6";

  if (!person.href) return <div className={base}>{body}</div>;

  return (
    <a
      href={person.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${person.name} on LinkedIn`}
      className={`${base} hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors duration-150`}
    >
      {body}
    </a>
  );
}

export function About() {
  return (
    <section id="about" className="py-28 bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left — story */}
          <FadeUp>
            <p className="label-mono mb-6">About</p>
            <h2 className="text-h2 text-[#0A0A0A] mb-6">
              Engineers and designers who&apos;ve worked inside the systems.
            </h2>
            <p className="text-[#52525B] leading-relaxed mb-6">
              Nalla Labs started with one belief: the systems that move money, water and data in
              Africa deserve the same rigour as anywhere else. We take on a small number of
              engagements at a time, which is how we keep the work good.
            </p>
            <p className="text-[#52525B] leading-relaxed">
              We are a senior team across AI engineering, payments and product. We also train the next
              engineers ourselves, so the people who keep a system running are as strong as the
              people who built it.
            </p>

            <blockquote className="mt-10 border-l-2 border-[#1D4ED8] pl-6">
              <p className="text-xl font-semibold text-[#0A0A0A] tracking-tight">
                &ldquo;Fewer clients. Deeper work.&rdquo;
              </p>
            </blockquote>
          </FadeUp>

          {/* Right — at a glance */}
          <FadeUp delay={0.1}>
            <div className="border border-[#E4E4E7] bg-white p-8">
              <p className="label-mono mb-6">At a glance</p>
              <dl className="font-mono text-sm">
                {facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={`flex gap-4 py-3 ${i < facts.length - 1 ? "border-b border-[#F4F4F5]" : ""}`}
                  >
                    <dt className="text-[#A1A1AA] w-28 shrink-0">{fact.label}</dt>
                    <dd className="text-[#0A0A0A]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>
        </div>

        {/* Leadership — full width */}
        <div className="mt-20">
          <FadeUp>
            <p className="label-mono mb-6">Leadership</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaders.map((person) => (
              <StaggerItem key={person.name}>
                <LeaderCard person={person} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
