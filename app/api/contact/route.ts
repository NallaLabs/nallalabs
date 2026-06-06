import { Resend } from "resend";
import { NextResponse } from "next/server";

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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@nallalabs.xyz";

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.",
      },
      { status: 500 },
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

  const resend = new Resend(apiKey);
  const sendPromise = resend.emails.send({
    from: "Nalla Labs <hello@nallalabs.xyz>",
    to: toEmail,
    replyTo: email,
    subject,
    text,
  });

  const timeoutPromise = new Promise<{
    kind: "timeout";
  }>((resolve) => {
    setTimeout(() => resolve({ kind: "timeout" }), 15000);
  });

  const outcome = await Promise.race([
    sendPromise.then(
      (result) =>
        ({
          kind: "result",
          result,
        }) as const,
    ),
    timeoutPromise,
  ]);

  if (outcome.kind === "timeout") {
    return NextResponse.json(
      { error: "Email delivery timed out while contacting Resend. Please try again." },
      { status: 502 },
    );
  }

  if (outcome.result.error) {
    return NextResponse.json(
      { error: `Email delivery failed: ${outcome.result.error.message}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Inquiry sent." });
}
