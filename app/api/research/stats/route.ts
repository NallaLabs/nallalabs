import { NextResponse } from "next/server";
import { papers } from "@/lib/research";
import { getStats } from "@/lib/research-stats";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("paper");
  if (!papers.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Unknown paper." }, { status: 400 });
  }

  try {
    const stats = await getStats(slug!);
    if (!stats) {
      return NextResponse.json({ error: "Stats are not configured." }, { status: 503 });
    }
    return NextResponse.json(
      { versions: stats },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[research/stats]", error);
    return NextResponse.json({ error: "Stats are unavailable." }, { status: 502 });
  }
}
