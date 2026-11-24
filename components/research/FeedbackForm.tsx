"use client";

import { useState } from "react";
import { contributorRoles, feedbackTypes, latestPublished, type Paper } from "@/lib/research";

const fieldClass =
  "w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors";

export function FeedbackForm({ paper }: { paper: Paper }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);
  const hosted = paper.versions.filter((v) => v.file);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMessage(null);
    setFallbackMailto(null);

    const formData = new FormData(form);
    const payload = {
      paper: paper.slug,
      ...Object.fromEntries(
        ["name", "email", "role", "feedbackType", "version", "message", "website"].map((key) => [
          key,
          String(formData.get(key) || "").trim(),
        ]),
      ),
    };

    try {
      const response = await fetch("/api/research/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
        subject?: string;
        text?: string;
      };

      if (!response.ok) {
        // If delivery failed, let the reader send the same message from their own mail app.
        if (data.subject && data.text) {
          setFallbackMailto(
            `mailto:hello@nallalabs.xyz?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.text)}`,
          );
        }
        throw new Error(data.error || "We could not send your feedback.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-[#E4E4E7] bg-white p-10 flex flex-col items-center justify-center text-center h-full min-h-64">
        <p className="label-mono text-[#1D4ED8] mb-3">Received</p>
        <p className="text-[#0A0A0A] font-semibold text-lg mb-2">Thank you. This makes the next version better.</p>
        <p className="text-sm text-[#52525B] mb-6">
          We read every submission and reply from hello@nallalabs.xyz.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-[#52525B] underline underline-offset-4 hover:text-[#0A0A0A] cursor-pointer"
        >
          Send more feedback
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fb-name" className="label-mono block mb-2">Name</label>
          <input id="fb-name" type="text" name="name" required placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="fb-email" className="label-mono block mb-2">Email</label>
          <input id="fb-email" type="email" name="email" required placeholder="you@example.com" className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="fb-type" className="label-mono block mb-2">Feedback type</label>
          <select id="fb-type" name="feedbackType" className={`${fieldClass} appearance-none`}>
            {feedbackTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fb-role" className="label-mono block mb-2">You are a</label>
          <select id="fb-role" name="role" defaultValue="" className={`${fieldClass} appearance-none`}>
            <option value="">Prefer not to say</option>
            {contributorRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fb-version" className="label-mono block mb-2">Version read</label>
          <select
            id="fb-version"
            name="version"
            defaultValue={latestPublished(paper).version}
            className={`${fieldClass} appearance-none`}
          >
            {hosted.map((v) => (
              <option key={v.version} value={v.version}>
                v{v.version}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="fb-message" className="label-mono block mb-2">Comments</label>
        <textarea
          id="fb-message"
          name="message"
          rows={7}
          required
          placeholder="Your views, a number you think is wrong (cite the page), a source we missed, or how you'd like to help..."
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === "error" && errorMessage ? (
        <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{errorMessage}</p>
          {fallbackMailto ? (
            <p className="mt-2 text-[#52525B]">
              Your note isn&apos;t lost.{" "}
              <a href={fallbackMailto} className="text-[#0A0A0A] underline underline-offset-4">
                Send it from your email app
              </a>{" "}
              with everything already filled in.
            </p>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#0A0A0A] text-[#FAFAFA] text-sm py-3 hover:bg-[#27272A] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "submitting" ? "Sending..." : "Submit feedback"}
      </button>
      <p className="text-xs text-[#A1A1AA]">
        Goes straight to hello@nallalabs.xyz. We may credit substantive contributions in the
        next version. Tell us in your comments if you&apos;d rather stay anonymous.
      </p>
    </form>
  );
}
