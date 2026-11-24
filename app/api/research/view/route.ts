import { NextResponse } from "next/server";
import { papers } from "@/lib/research";
import { isBot, recordView } from "@/lib/research-stats";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { paper?: string; version?: string } | null;
  const paper = papers.find((p) => p.slug === body?.paper);
  const version = paper?.versions.find((v) => v.version === body?.version && v.file);

  if (!paper || !version) {
    return NextResponse.json({ error: "Unknown paper." }, { status: 400 });
  }

  // Awaited (not deferred) so the stats box, which reads right after, includes this view.
  if (!isBot(request)) {
    await recordView(paper.slug, version.version).catch((error) =>
      console.error("[research/view]", error),
    );
  }

  return new NextResponse(null, { status: 204 });
}
