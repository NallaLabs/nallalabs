import { Resend } from "resend";

type SendResult = { ok: true } | { ok: false; error: string; status: number };

/** Sends a plain-text email to the Nalla Labs inbox via Resend, with a 15s timeout. */
export async function sendToInbox({
  replyTo,
  subject,
  text,
}: {
  replyTo: string;
  subject: string;
  text: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@nallalabs.xyz";

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    };
  }

  const resend = new Resend(apiKey);
  const sendPromise = resend.emails.send({
    from: "Nalla Labs <hello@nallalabs.xyz>",
    to: toEmail,
    replyTo,
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
    return {
      ok: false,
      status: 502,
      error: "Email delivery timed out while contacting Resend. Please try again.",
    };
  }

  if (outcome.result.error) {
    return {
      ok: false,
      status: 502,
      error: `Email delivery failed: ${outcome.result.error.message}`,
    };
  }

  return { ok: true };
}
