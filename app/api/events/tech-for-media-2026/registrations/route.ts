import { Resend } from "resend";
import { NextResponse } from "next/server";

type Member = {
  name?: string;
  email?: string;
  phone?: string;
  background?: string;
  skill?: string;
};

type RegistrationPayload = {
  website?: string;
  teamName?: string;
  leadName?: string;
  leadWhatsApp?: string;
  leadEmail?: string;
  teamSize?: number;
  members?: Member[];
  problem?: string;
  audience?: string;
  solution?: string;
  track?: string;
  technicalExperience?: string;
  availableOnlineSessions?: boolean;
  availableInKisumu?: boolean;
  consent?: boolean;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isTruthy(value: unknown) {
  return value === true;
}

function parseMembers(members: Member[] | undefined) {
  if (!Array.isArray(members)) {
    return [];
  }

  return members.map((member) => ({
    name: clean(member.name),
    email: clean(member.email),
    phone: clean(member.phone),
    background: clean(member.background),
    skill: clean(member.skill),
  }));
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RegistrationPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const website = clean(body.website);
  if (website) {
    return NextResponse.json({ message: "Thanks for your submission." });
  }

  const teamName = clean(body.teamName);
  const leadName = clean(body.leadName);
  const leadWhatsApp = clean(body.leadWhatsApp);
  const leadEmail = clean(body.leadEmail);
  const problem = clean(body.problem);
  const audience = clean(body.audience);
  const solution = clean(body.solution);
  const track = clean(body.track);
  const technicalExperience = clean(body.technicalExperience);
  const members = parseMembers(body.members);

  if (!teamName || !leadName || !leadWhatsApp || !leadEmail) {
    return NextResponse.json(
      { error: "Team name, lead name, lead WhatsApp, and lead email are required." },
      { status: 400 },
    );
  }

  if (!problem || !audience || !solution) {
    return NextResponse.json(
      { error: "Project seed answers are required." },
      { status: 400 },
    );
  }

  if (!track || !technicalExperience) {
    return NextResponse.json(
      { error: "Track selection and technical experience are required." },
      { status: 400 },
    );
  }

  if (!isTruthy(body.availableOnlineSessions) || !isTruthy(body.availableInKisumu) || !isTruthy(body.consent)) {
    return NextResponse.json(
      {
        error:
          "Please confirm the online sessions, Kisumu exhibition day, and consent before submitting.",
      },
      { status: 400 },
    );
  }

  const teamSize = Number(body.teamSize || members.length);
  if (!Number.isFinite(teamSize) || teamSize < 2 || teamSize > 5) {
    return NextResponse.json({ error: "Team size must be between 2 and 5." }, { status: 400 });
  }

  if (members.length !== teamSize) {
    return NextResponse.json(
      { error: "Please provide details for every member listed in the team size field." },
      { status: 400 },
    );
  }

  const invalidMember = members.find(
    (member) => !member.name || !member.background || !member.skill || !member.phone,
  );

  if (invalidMember) {
    return NextResponse.json(
      {
        error:
          "Each team member needs a name, phone number, background, and one skill they bring.",
      },
      { status: 400 },
    );
  }

  const toEmail =
    process.env.EVENT_REGISTRATION_TO_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    "hello@nallalabs.xyz";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Set RESEND_API_KEY and an event registration recipient.",
      },
      { status: 500 },
    );
  }

  const registrationId = `TFM-${Date.now().toString(36).toUpperCase()}`;
  const memberLines = members
    .map(
      (member, index) =>
        [
          `Member ${index + 1}: ${member.name}`,
          `  Email: ${member.email || "-"}`,
          `  Phone: ${member.phone}`,
          `  Background: ${member.background}`,
          `  Skill: ${member.skill}`,
        ].join("\n"),
    )
    .join("\n\n");

  const text = [
    `Registration ID: ${registrationId}`,
    `Team name: ${teamName}`,
    `Lead name: ${leadName}`,
    `Lead WhatsApp: ${leadWhatsApp}`,
    `Lead email: ${leadEmail}`,
    `Team size: ${teamSize}`,
    `Track: ${track}`,
    `Technical experience: ${technicalExperience}`,
    `Available for 3 online sessions in June: yes`,
    `Available in Kisumu on July 18: yes`,
    `Consent: yes`,
    "",
    "Project seed",
    `Problem: ${problem}`,
    `Audience: ${audience}`,
    `Solution: ${solution}`,
    "",
    "Members",
    memberLines,
  ].join("\n");

  const resend = new Resend(apiKey);
  const confirmationText = [
    `Hi ${leadName},`,
    "",
    "We have received your application for the Tech for Media Exhibition Programme 2026.",
    "",
    `Registration ID: ${registrationId}`,
    `Team name: ${teamName}`,
    "",
    "Here is a copy of the information you submitted:",
    "",
    text,
    "",
    "We will review the application and follow up with the lead contact using the WhatsApp number and email provided.",
    "",
    "Nalla Labs",
  ].join("\n");

  const adminSendPromise = resend.emails.send({
    from: "Nalla Labs <hello@nallalabs.xyz>",
    to: toEmail,
    replyTo: leadEmail,
    subject: `Tech for Media 2026 registration: ${teamName}`,
    text,
  });
  const confirmationSendPromise = resend.emails.send({
    from: "Nalla Labs <hello@nallalabs.xyz>",
    to: leadEmail,
    replyTo: toEmail,
    subject: `We received your Tech for Media 2026 application: ${teamName}`,
    text: confirmationText,
  });

  const timeoutPromise = new Promise<{
    kind: "timeout";
  }>((resolve) => {
    setTimeout(() => resolve({ kind: "timeout" }), 15000);
  });

  const outcome = await Promise.race([
    Promise.all([adminSendPromise, confirmationSendPromise]).then(
      ([adminResult, confirmationResult]) =>
        ({
          kind: "result",
          adminResult,
          confirmationResult,
        }) as const,
    ),
    timeoutPromise,
  ]);

  if (outcome.kind === "timeout") {
    return NextResponse.json(
      { error: "Registration delivery timed out while contacting Resend. Please try again." },
      { status: 502 },
    );
  }

  if (outcome.adminResult.error) {
    return NextResponse.json(
      { error: `Registration delivery failed: ${outcome.adminResult.error.message}` },
      { status: 502 },
    );
  }

  if (outcome.confirmationResult.error) {
    return NextResponse.json(
      { error: `Lead confirmation delivery failed: ${outcome.confirmationResult.error.message}` },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Registration received.",
    registrationId,
    teamName,
  });
}
