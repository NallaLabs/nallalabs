import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { weeks, getWeek, getPhase, lessonContract, GATE_PHASE } from "@/lib/academy/curriculum";
import { getLesson } from "@/lib/academy/lessons";
import { Markdown } from "@/components/academy/Markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return weeks.flatMap((w) => w.days.map((_, i) => ({ week: String(w.number), day: String(i + 1) })));
}

async function resolve(params: PageProps<"/academy/week/[week]/day/[day]">["params"]) {
  const { week: w, day: d } = await params;
  const week = getWeek(Number(w));
  const day = Number(d);
  if (!week || !week.days[day - 1]) return null;
  return { week, day, topic: week.days[day - 1] };
}

export async function generateMetadata({ params }: PageProps<"/academy/week/[week]/day/[day]">): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  return {
    title: `Week ${r.week.number} Day ${r.day}: ${r.topic} — Academy`,
    description: r.topic,
    alternates: { canonical: `/week/${r.week.number}/day/${r.day}` },
  };
}

function neighbour(weekNumber: number, day: number, step: 1 | -1) {
  let w = weekNumber;
  let d = day + step;
  if (d < 1) {
    w -= 1;
    d = 5;
  } else if (d > 5) {
    w += 1;
    d = 1;
  }
  const week = getWeek(w);
  return week ? { week: w, day: d, topic: week.days[d - 1] } : null;
}

export default async function DayPage({ params }: PageProps<"/academy/week/[week]/day/[day]">) {
  const r = await resolve(params);
  if (!r) notFound();
  const { week, day, topic } = r;

  const lesson = await getLesson(week.number, day);
  const phase = getPhase(week.phase);
  const prev = neighbour(week.number, day, -1);
  const next = neighbour(week.number, day, 1);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
      <nav className="text-sm text-[#52525B] mb-8">
        <Link href="/" className="hover:text-[#0A0A0A]">
          Academy
        </Link>{" "}
        /{" "}
        <Link href={`/week/${week.number}`} className="hover:text-[#0A0A0A]">
          Week {week.number}
        </Link>{" "}
        / Day {day}
      </nav>

      <p className="label-mono">
        Week {week.number} · Day {day} ·{" "}
        {week.phase === GATE_PHASE ? "Month-3 gate" : `Phase ${phase!.number}: ${phase!.title}`}
      </p>
      <h1 className="text-h2 mt-2 mb-10">{topic}</h1>

      {lesson ? (
        <Markdown source={lesson} />
      ) : (
        <div className="border border-dashed border-[#A1A1AA] p-6">
          <p className="font-medium">This lesson is still being written.</p>
          <p className="text-sm text-[#52525B] mt-2">
            The plan for today is above. Every lesson in the course follows the same contract:
          </p>
          <ol className="list-decimal pl-5 mt-3 space-y-1 text-sm text-[#52525B]">
            {lessonContract.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="text-sm text-[#52525B] mt-4">
            <span className="text-[#A1A1AA]">This week&apos;s deliverable: </span>
            {week.deliverable}
          </p>
        </div>
      )}

      <nav className="grid grid-cols-2 gap-4 mt-16 pt-6 border-t border-[#E4E4E7] text-sm">
        {prev ? (
          <Link href={`/week/${prev.week}/day/${prev.day}`} className="group">
            <span className="text-[#A1A1AA]">
              ← Week {prev.week} · Day {prev.day}
            </span>
            <span className="block group-hover:text-[#1D4ED8] line-clamp-2">{prev.topic}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/week/${next.week}/day/${next.day}`} className="group text-right">
            <span className="text-[#A1A1AA]">
              Week {next.week} · Day {next.day} →
            </span>
            <span className="block group-hover:text-[#1D4ED8] line-clamp-2">{next.topic}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
