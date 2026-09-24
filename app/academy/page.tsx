import type { Metadata } from "next";
import Link from "next/link";
import {
  course,
  phases,
  weeks,
  projects,
  projectArtefacts,
  lessonContract,
  buildLoop,
  weeklyRhythm,
  weeksForPhase,
  GATE_PHASE,
  type Week,
} from "@/lib/academy/curriculum";

const description =
  "A 26-week path from complete beginner to production-capable software engineer: Go, Linux, PostgreSQL, networking, the web, cloud and AI-enabled systems.";

export const metadata: Metadata = {
  title: "Academy — Zero to Hero Software Engineering",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nalla Labs Academy — Zero to Hero Software Engineering",
    description,
    type: "website",
    url: "https://academy.nallalabs.xyz",
    siteName: "Nalla Labs",
  },
};

function WeekRow({ week }: { week: Week }) {
  return (
    <li>
      <Link
        href={`/week/${week.number}`}
        className="group flex items-baseline gap-4 py-3 border-t border-[#E4E4E7] hover:bg-white transition-colors px-2 -mx-2"
      >
        <span className="font-mono text-xs text-[#A1A1AA] w-14 shrink-0">Week {week.number}</span>
        <span className="flex-1 min-w-0">
          <span className="font-medium group-hover:text-[#1D4ED8] transition-colors">{week.title}</span>
          <span className="block text-sm text-[#52525B] truncate">{week.deliverable}</span>
        </span>
      </Link>
    </li>
  );
}

export default function AcademyPage() {
  const gate = weeks.find((w) => w.phase === GATE_PHASE)!;

  return (
    <>
      <section className="bg-[#08111F] text-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <p className="label-mono !text-[#93C5FD] mb-4">Nalla Labs Academy</p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.04em] font-semibold max-w-3xl">
            {course.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/75">{course.summary}</p>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              ["26", "weeks"],
              [String(phases.length), "phases"],
              [String(projects.length), "projects"],
              [`~${course.totalHours}`, "hours"],
            ].map(([n, label]) => (
              <div key={label} className="border border-white/12 bg-white/5 p-4">
                <dt className="label-mono !text-[#93C5FD]">{label}</dt>
                <dd className="text-2xl font-semibold mt-1">{n}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-white/60">Stack: {course.stack.join(" · ")}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <h2 className="text-h2 mb-2">Syllabus</h2>
        <p className="text-[#52525B] max-w-2xl mb-10">
          Weeks 1–13 lock down the fundamentals. Weeks 14–26 build and operate real systems. Every phase ends in a
          deployed, defended project.
        </p>
        <div className="space-y-12">
          {phases.map((phase) => (
            <div key={phase.number} className="grid md:grid-cols-[18rem_1fr] gap-4 md:gap-10">
              <div>
                <p className="label-mono">Phase {phase.number}</p>
                <h3 className="text-xl font-semibold tracking-tight mt-1">{phase.title}</h3>
                <p className="text-sm text-[#52525B] mt-1">{phase.focus}</p>
                <p className="text-sm mt-3">
                  <span className="text-[#A1A1AA]">Ends with </span>
                  {phase.endsWith}
                </p>
              </div>
              <ul>
                {weeksForPhase(phase.number).map((w) => (
                  <WeekRow key={w.number} week={w} />
                ))}
              </ul>
              {phase.number === 4 && (
                <div className="md:col-span-2 border border-[#1D4ED8]/30 bg-[#EFF6FF] p-5">
                  <p className="label-mono !text-[#1D4ED8]">Week {gate.number} · Month-3 gate</p>
                  <p className="mt-2 text-sm">
                    A timed build-and-debug assessment and an oral request trace across Phases 0–4. Pass, or leave
                    with a remediation plan.{" "}
                    <Link href={`/week/${gate.number}`} className="text-[#1D4ED8] underline underline-offset-2">
                      See the gate week
                    </Link>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#E4E4E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
          <h2 className="text-h2 mb-2">One product, eight projects</h2>
          <p className="text-[#52525B] max-w-2xl mb-10">
            Every project evolves Chama Ledger, a tool for a savings group to record contributions, loans and payouts,
            from a command-line tool into an AI-enabled distributed system.
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <li key={p.number} className="border border-[#E4E4E7] p-5 flex flex-col">
                <p className="label-mono">
                  {p.number === "Capstone" ? "Capstone" : `Project ${p.number}`} · Weeks {p.weeks}
                </p>
                <h3 className="font-semibold mt-1">{p.title}</h3>
                <p className="text-sm text-[#52525B] mt-2 flex-1">{p.what}</p>
                <p className="text-sm mt-4">
                  <span className="text-[#A1A1AA]">Scripted break: </span>
                  {p.scriptedBreak}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[#52525B] mt-8">
            Each project is assessed on the same four artefacts: {projectArtefacts.join("; ").toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-h2 mb-6">How a week runs</h2>
          <dl className="space-y-4">
            {weeklyRhythm.map((r) => (
              <div key={r.slot} className="border-t border-[#E4E4E7] pt-3">
                <dt className="font-medium">
                  {r.slot} <span className="text-[#A1A1AA] font-normal">· {r.who}</span>
                </dt>
                <dd className="text-sm text-[#52525B] mt-1">{r.what}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-h2 mb-6">How every lesson works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-[#27272A]">
            {lessonContract.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="label-mono mt-10 mb-3">The build loop</p>
          <p className="flex flex-wrap gap-2">
            {buildLoop.map((step, i) => (
              <span key={step} className="text-sm">
                <span className="border border-[#E4E4E7] bg-white px-2 py-1">{step}</span>
                {i < buildLoop.length - 1 && <span className="text-[#A1A1AA] ml-2">→</span>}
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
