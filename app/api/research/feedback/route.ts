import { NextResponse } from "next/server";
import { sendToInbox } from "@/lib/email";
import { feedbackTypes, papers } from "@/lib/research";

type FeedbackPayload = {
  name?: string;
  email?: string;
  role?: string;
  feedbackType?: string;
  paper?: string;
  version?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as FeedbackPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field, people don't.
  if (clean(body.website)) {
    return NextResponse.json({ message: "Thanks for your feedback." });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const role = clean(body.role);
  const message = clean(body.message, 10000);
  const feedbackType = (feedbackTypes as readonly string[]).includes(clean(body.feedbackType))
    ? clean(body.feedbackType)
    : "General comment";
  const paper = papers.find((p) => p.slug === clean(body.paper)) ?? papers[0];
  const version =
    paper.versions.find((v) => v.version === clean(body.version))?.version ?? "unspecified";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and comments are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const subject = `[Research Feedback] ${paper.title} v${version} — ${feedbackType} — ${name}`;
  const text = [
    `Research paper: ${paper.title}: ${paper.subtitle}`,
    `Version: v${version}`,
    `Feedback type: ${feedbackType}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Role: ${role || "-"}`,
    "",
    "Comments:",
    message,
  ].join("\n");

  const sent = await sendToInbox({ replyTo: email, subject, text });

  if (!sent.ok) {
    // Keep config details (env var names, provider errors) out of the public UI.
    console.error("[research/feedback]", sent.error);
    return NextResponse.json(
      { error: "We couldn't send your feedback right now.", subject, text },
      { status: sent.status },
    );
  }

  return NextResponse.json({ message: "Feedback sent." });
}
