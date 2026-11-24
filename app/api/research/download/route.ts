import { NextResponse, after } from "next/server";
import { findDocument, type ResearchDoc } from "@/lib/research";
import { isBot, recordDownload } from "@/lib/research-stats";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doc = searchParams.get("doc") as ResearchDoc;
  const found = findDocument(searchParams.get("paper") || "", searchParams.get("version") || "", doc);

  if (!found) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  // Count after responding, and never let a stats failure block the download.
  if (!isBot(request)) {
    after(() =>
      recordDownload(found.paper.slug, found.version.version, doc, found.bytes).catch((error) =>
        console.error("[research/download]", error),
      ),
    );
  }

  return NextResponse.redirect(new URL(found.file, request.url), 302);
}
