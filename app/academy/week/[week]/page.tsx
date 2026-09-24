import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { weeks, getWeek, getPhase, projectsForWeek, GATE_PHASE } from "@/lib/academy/curriculum";
import { getLesson } from "@/lib/academy/lessons";

export const dynamicParams = false;

export function generateStaticParams() {
  return weeks.map((w) => ({ week: String(w.number) }));
}

export async function generateMetadata({ params }: PageProps<"/academy/week/[week]">): Promise<Metadata> {
  const week = getWeek(Number((await params).week));
  if (!week) return {};
  return {
    title: `Week ${week.number}: ${week.title} — Academy`,
    description: `Week ${week.number} of Zero to Hero Software Engineering. Deliverable: ${week.deliverable}.`,
    alternates: { canonical: `/week/${week.number}` },
  };
}

const criteriaLabels = ["understand", "explain", "build", "debug", "test", "secure", "deploy", "operate"] as const;

export default async function WeekPage({ params }: PageProps<"/academy/week/[week]">) {
  const week = getWeek(Number((await params).week));
  if (!week) notFound();

  const phase = getPhase(week.phase);
  const weekProjects = projectsForWeek(week.number);
  const written = await Promise.all(week.days.map((_, i) => getLesson(week.number, i + 1)));
  const isLastWeekOfPhase = phase && phase.weeks[phase.weeks.length - 1] === week.number;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <nav className="text-sm text-[#52525B] mb-8">
        <Link href="/" className="hover:text-[#0A0A0A]">
          Academy
        </Link>{" "}
        / Week {week.number}
      </nav>

      <p className="label-mono">
        {week.phase === GATE_PHASE ? "Month-3 gate" : `Phase ${phase!.number} · ${phase!.title}`}
      </p>
      <h1 className="text-display mt-2">
        Week {week.number}: {week.title}
      </h1>
      <p className="mt-4 text-lg">
        <span className="text-[#A1A1AA]">Friday deliverable: </span>
        {week.deliverable}
      </p>

      <div className="grid lg:grid-cols-[1fr_20rem] gap-12 mt-12">
        <ol className="space-y-3">
          {week.days.map((topic, i) => (
            <li key={i}>
              <Link
                href={`/week/${week.number}/day/${i + 1}`}
                className="group flex gap-4 border border-[#E4E4E7] bg-white p-5 hover:border-[#1D4ED8] transition-colors"
              >
                <span className="font-mono text-sm text-[#A1A1AA] w-12 shrink-0">Day {i + 1}</span>
                <span className="flex-1">
                  <span className="font-medium group-hover:text-[#1D4ED8] transition-colors">{topic}</span>
                  <span
                    className={`block mt-2 text-xs font-mono uppercase tracking-wider ${
                      written[i] ? "text-emerald-700" : "text-[#A1A1AA]"
                    }`}
                  >
                    {written[i] ? "Lesson ready" : "Outline only"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <aside className="space-y-8 text-sm">
          {phase && (
            <div className="space-y-3">
              <p className="label-mono">Threads this phase</p>
              <p>
                <span className="font-medium">Security. </span>
                {phase.securityThread}
              </p>
              <p>
                <span className="font-medium">AI. </span>
                {phase.aiThread}
              </p>
              <p>
                <span className="font-medium">System trace. </span>
                <span className="font-mono text-xs">{phase.systemTrace}</span>
              </p>
            </div>
          )}

          {weekProjects.map((p) => (
            <div key={p.number} className="border border-[#E4E4E7] bg-white p-4">
              <p className="label-mono">{p.number === "Capstone" ? "Capstone" : `Project ${p.number}`}</p>
              <p className="font-medium mt-1">{p.title}</p>
              <p className="text-[#52525B] mt-1">{p.what}</p>
              <p className="mt-3">
                <span className="text-[#A1A1AA]">Runs on: </span>
                {p.runsOn}
              </p>
            </div>
          ))}

          {phase && isLastWeekOfPhase && (
            <div>
              <p className="label-mono mb-3">Phase {phase.number} exit criteria</p>
              <dl className="space-y-2">
                {criteriaLabels.map((k) => (
                  <div key={k}>
                    <dt className="capitalize font-medium">{k}</dt>
                    <dd className="text-[#52525B]">{phase.exitCriteria[k]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </aside>
      </div>

      <nav className="flex justify-between mt-16 pt-6 border-t border-[#E4E4E7] text-sm">
        {getWeek(week.number - 1) ? (
          <Link href={`/week/${week.number - 1}`} className="hover:text-[#1D4ED8]">
            ← Week {week.number - 1}
          </Link>
        ) : (
          <span />
        )}
        {getWeek(week.number + 1) && (
          <Link href={`/week/${week.number + 1}`} className="hover:text-[#1D4ED8]">
            Week {week.number + 1} →
          </Link>
        )}
      </nav>
    </div>
  );
}
