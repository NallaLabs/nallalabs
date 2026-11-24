import { NextResponse } from "next/server";
import { sendToInbox } from "@/lib/email";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  projectType?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(body.name);
  const company = clean(body.company);
  const email = clean(body.email);
  const projectType = clean(body.projectType);
  const message = clean(body.message);
  const website = clean(body.website);

  if (website) {
    return NextResponse.json({ message: "Thanks for reaching out." });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const subject = `New inquiry from ${name}${company ? ` at ${company}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Company: ${company || "-"}`,
    `Email: ${email}`,
    `Project type: ${projectType || "-"}`,
    "",
    message,
  ].join("\n");

  const sent = await sendToInbox({ replyTo: email, subject, text });

  if (!sent.ok) {
    return NextResponse.json({ error: sent.error }, { status: sent.status });
  }

  return NextResponse.json({ message: "Inquiry sent." });
}
