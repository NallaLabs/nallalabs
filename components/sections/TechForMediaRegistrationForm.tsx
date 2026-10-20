"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type MemberField = {
  name: string;
  email: string;
  phone: string;
  background: string;
  skill: string;
};

const tracks = [
  {
    value: "content-creation",
    label: "Content creation",
    description: "For tools that help teams produce, package, or distribute media content.",
  },
  {
    value: "monetization",
    label: "Monetization",
    description: "For revenue, payments, pricing, and income-building ideas.",
  },
  {
    value: "personal-brand",
    label: "Personal brand",
    description: "For creator identity, positioning, and reputation-building products.",
  },
  {
    value: "audience-growth",
    label: "Audience growth",
    description: "For discovery, community building, retention, and reach.",
  },
  {
    value: "creator-ip",
    label: "Creator IP",
    description: "For ownership, licensing, rights, archives, and digital asset control.",
  },
] as const;

const experienceOptions = [
  {
    value: "Yes (developer/coder)",
    label: "Yes, someone on the team can code",
  },
  {
    value: "A little (used no-code tools)",
    label: "A little - we've used no-code tools",
  },
  {
    value: "None at all",
    label: "None at all",
  },
] as const;

const steps = [
  { label: "Team basics", title: "Who is applying, and how do we reach the lead contact?" },
  { label: "Members", title: "Tell us who is on the team and what each person brings." },
  {
    label: "Project seed",
    title:
      "Keep it light. We want to understand the problem, the audience, and the rough shape of the solution.",
  },
  { label: "Track + experience", title: "Which build track fits the idea, and who can build it?" },
  { label: "Confirm", title: "Confirm the team can show up, then submit." },
] as const;

const lastStep = steps.length - 1;

const minMembers = 4;
const maxMembers = 4;

const inputClass =
  "w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors";

const choiceClass =
  "border border-[#E4E4E7] bg-white p-4 flex items-start gap-3 cursor-pointer hover:border-[#1D4ED8] hover:bg-[#EFF6FF] has-[:checked]:border-[#1D4ED8] has-[:checked]:bg-[#EFF6FF] transition-colors";

function memberName(index: number, field: keyof MemberField) {
  return `member_${index}_${field}`;
}

export function TechForMediaRegistrationForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState(4);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [submittedTeamName, setSubmittedTeamName] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const hasNavigated = useRef(false);
  // Set when submit sends the person back to an earlier step, so the effect reports the gap
  // instead of focusing the heading. A ref, not state: clearing it must not re-run the effect.
  const pendingReport = useRef(false);

  const memberCards = Array.from({ length: teamSize }, (_, index) => index);

  // Returns the first invalid control in a step, or null when the step is complete.
  const firstInvalid = (index: number) => {
    const container = formRef.current?.querySelector(`[data-step="${index}"]`);
    if (!container) return null;
    const controls = container.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input:not([type=hidden]):not([tabindex='-1']), select, textarea");
    return Array.from(controls).find((control) => !control.checkValidity()) ?? null;
  };

  // After a step change: move focus to the new step's heading and bring the form into view.
  useEffect(() => {
    if (!hasNavigated.current) return;
    if (pendingReport.current) {
      pendingReport.current = false;
      firstInvalid(step)?.reportValidity();
    } else {
      headingRefs.current[step]?.focus({ preventScroll: true });
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const goTo = (index: number) => {
    hasNavigated.current = true;
    setErrorMessage(null);
    setStep(Math.max(0, Math.min(lastStep, index)));
  };

  const goNext = () => {
    const invalid = firstInvalid(step);
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    goTo(step + 1);
  };

  const handleTeamSizeChange = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return;
    }

    const clamped = Math.min(maxMembers, Math.max(minMembers, parsed));
    setTeamSize(clamped);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Before the last step, "Next" (or Enter) validates this step and moves forward.
    if (step < lastStep) {
      goNext();
      return;
    }

    // Every step must be complete; send the person back to the first gap.
    const incomplete = steps.findIndex((_, index) => firstInvalid(index) !== null);
    if (incomplete !== -1) {
      if (incomplete === step) {
        firstInvalid(step)?.reportValidity();
      } else {
        hasNavigated.current = true;
        pendingReport.current = true;
        setStep(incomplete);
      }
      return;
    }

    const form = event.currentTarget;
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(form);
    const members = memberCards.map((index) => ({
      name: String(formData.get(memberName(index, "name")) || "").trim(),
      email: String(formData.get(memberName(index, "email")) || "").trim(),
      phone: String(formData.get(memberName(index, "phone")) || "").trim(),
      background: String(formData.get(memberName(index, "background")) || "").trim(),
      skill: String(formData.get(memberName(index, "skill")) || "").trim(),
    }));

    const payload = {
      website: String(formData.get("website") || "").trim(),
      teamName: String(formData.get("teamName") || "").trim(),
      leadName: String(formData.get("leadName") || "").trim(),
      leadWhatsApp: String(formData.get("leadWhatsApp") || "").trim(),
      leadEmail: String(formData.get("leadEmail") || "").trim(),
      teamSize,
      members,
      problem: String(formData.get("problem") || "").trim(),
      audience: String(formData.get("audience") || "").trim(),
      solution: String(formData.get("solution") || "").trim(),
      track: String(formData.get("track") || "").trim(),
      technicalExperience: String(formData.get("technicalExperience") || "").trim(),
      availableOnlineSessions: formData.get("availableOnlineSessions") === "on",
      availableInKisumu: formData.get("availableInKisumu") === "on",
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/events/tech-for-media-2026/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
        registrationId?: string;
        teamName?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "We could not submit your registration.");
      }

      setSubmittedTeamName(data.teamName || payload.teamName);
      setRegistrationId(data.registrationId || null);
      setStatus("success");
      form.reset();
      setTeamSize(4);
      setStep(0);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-[#D4D4D8] bg-white p-8 sm:p-10">
        <p className="label-mono text-[#1D4ED8] mb-3">Registration received</p>
        <h3 className="text-2xl font-semibold tracking-tight text-[#0A0A0A] mb-4">
          {submittedTeamName ? `${submittedTeamName} is in the queue.` : "Your team is in the queue."}
        </h3>
        <p className="text-sm text-[#52525B] leading-relaxed mb-6">
          We have your submission and will review it for track matching and mentor assignment.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="border border-[#E4E4E7] bg-[#FAFAFA] p-4">
            <p className="label-mono text-[#52525B] mb-1">Reference</p>
            <p className="text-[#0A0A0A] font-medium">{registrationId || "Pending"}</p>
          </div>
          <div className="border border-[#E4E4E7] bg-[#FAFAFA] p-4">
            <p className="label-mono text-[#52525B] mb-1">Next step</p>
            <p className="text-[#0A0A0A] font-medium">Watch WhatsApp and email for follow-up.</p>
          </div>
        </div>
      </div>
    );
  }

  const stepHeader = (index: number) => (
    <div>
      <p className="label-mono text-[#1D4ED8] mb-2">
        Step {index + 1} of {steps.length} · {steps[index].label}
      </p>
      <h3
        ref={(el) => {
          headingRefs.current[index] = el;
        }}
        tabIndex={-1}
        className="text-xl font-semibold tracking-tight text-[#0A0A0A] focus:outline-none"
      >
        {steps[index].title}
      </h3>
    </div>
  );

  const stepProps = (index: number) => ({
    "data-step": index,
    hidden: step !== index,
    className: "space-y-4",
    role: "group" as const,
    "aria-label": `Step ${index + 1}: ${steps[index].label}`,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8 scroll-mt-24">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Progress */}
      <nav aria-label="Registration progress">
        <ol className="grid grid-cols-5 gap-1.5">
          {steps.map((item, index) => {
            const done = index < step;
            const current = index === step;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => done && goTo(index)}
                  disabled={!done}
                  aria-current={current ? "step" : undefined}
                  className="group w-full text-left disabled:cursor-default"
                >
                  <span
                    className={`block h-1 transition-colors ${
                      done || current ? "bg-[#1D4ED8]" : "bg-[#E4E4E7]"
                    } ${done ? "group-hover:bg-[#0A0A0A]" : ""}`}
                  />
                  <span
                    className={`mt-2 hidden sm:flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide ${
                      current ? "text-[#0A0A0A]" : done ? "text-[#1D4ED8]" : "text-[#A1A1AA]"
                    }`}
                  >
                    {done ? <Check size={11} aria-hidden /> : null}
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* 1. Team basics */}
      <div {...stepProps(0)}>
        {stepHeader(0)}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Team name</span>
            <input type="text" name="teamName" required placeholder="e.g. Studio Loop" className={inputClass} />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Lead name</span>
            <input type="text" name="leadName" required placeholder="Full name" className={inputClass} />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Lead WhatsApp number</span>
            <input type="tel" name="leadWhatsApp" required placeholder="+254..." className={inputClass} />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Lead email</span>
            <input type="email" name="leadEmail" required placeholder="lead@example.com" className={inputClass} />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="label-mono block text-[#52525B]">Number of members</span>
            <select
              name="teamSize"
              value={teamSize}
              onChange={(event) => handleTeamSizeChange(event.target.value)}
              className={inputClass}
            >
              {Array.from({ length: maxMembers - minMembers + 1 }, (_, index) => index + minMembers).map(
                (value) => (
                  <option key={value} value={value}>
                    {value} members
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </div>

      {/* 2. Members */}
      <div {...stepProps(1)}>
        {stepHeader(1)}
        <p className="text-sm text-[#52525B]">
          Add each teammate below. We use this to match mentors and identify teams that need extra
          technical support.
        </p>
        <div className="space-y-4">
          {memberCards.map((index) => (
            <fieldset key={index} className="border border-[#E4E4E7] bg-[#FAFAFA] p-5 sm:p-6">
              <legend className="px-2 label-mono text-[#1D4ED8]">
                {index === 0 ? "Member 1 - recommended lead" : `Member ${index + 1}`}
              </legend>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Name</span>
                  <input type="text" name={memberName(index, "name")} required placeholder="Full name" className={inputClass} />
                </label>
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Email</span>
                  <input type="email" name={memberName(index, "email")} placeholder="If available" className={inputClass} />
                </label>
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Phone / WhatsApp</span>
                  <input type="tel" name={memberName(index, "phone")} placeholder="+254..." className={inputClass} />
                </label>
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Profession / background</span>
                  <input
                    type="text"
                    name={memberName(index, "background")}
                    required
                    placeholder="Journalist, designer, creator, etc."
                    className={inputClass}
                  />
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="label-mono block text-[#52525B]">One skill they bring</span>
                  <input
                    type="text"
                    name={memberName(index, "skill")}
                    required
                    placeholder="Research, editing, coding, production, etc."
                    className={inputClass}
                  />
                </label>
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* 3. Project seed */}
      <div {...stepProps(2)}>
        {stepHeader(2)}
        <div className="space-y-4">
          {[
            { name: "problem", label: "What problem do you want to solve?" },
            { name: "audience", label: "Who specifically has this problem?" },
            { name: "solution", label: "What do you think the solution could look like?" },
          ].map((field) => (
            <label key={field.name} className="block space-y-2">
              <span className="label-mono block text-[#52525B]">{field.label}</span>
              <textarea
                name={field.name}
                required
                rows={4}
                maxLength={500}
                placeholder="2-3 sentences max."
                className={`${inputClass} resize-y`}
              />
            </label>
          ))}
        </div>
      </div>

      {/* 4. Track + technical experience */}
      <div {...stepProps(3)}>
        {stepHeader(3)}
        <fieldset className="space-y-3">
          <legend className="label-mono text-[#52525B] mb-3">Build track</legend>
          {tracks.map((track) => (
            <label key={track.value} className={choiceClass}>
              <input
                type="radio"
                name="track"
                value={track.value}
                required
                className="mt-1 h-4 w-4 border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              <span>
                <span className="block font-medium text-[#0A0A0A]">{track.label}</span>
                <span className="block text-sm text-[#52525B]">{track.description}</span>
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset className="space-y-3 pt-4">
          <legend className="label-mono text-[#52525B] mb-3">
            How much technical experience is already in the team?
          </legend>
          {experienceOptions.map((option) => (
            <label key={option.value} className={choiceClass}>
              <input
                type="radio"
                name="technicalExperience"
                value={option.value}
                required
                className="mt-1 h-4 w-4 border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              <span className="block font-medium text-[#0A0A0A]">{option.label}</span>
            </label>
          ))}
        </fieldset>
      </div>

      {/* 5. Commitment + consent */}
      <div {...stepProps(4)}>
        {stepHeader(4)}
        <fieldset className="space-y-3">
          <legend className="label-mono text-[#52525B] mb-3">Commitment</legend>
          <label className={choiceClass}>
            <input
              type="checkbox"
              name="availableOnlineSessions"
              required
              className="mt-1 h-4 w-4 rounded border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
            />
            <span className="block font-medium text-[#0A0A0A]">
              Available for 3 online sessions in September
            </span>
          </label>
          <label className={choiceClass}>
            <input
              type="checkbox"
              name="availableInKisumu"
              required
              className="mt-1 h-4 w-4 rounded border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
            />
            <span className="block font-medium text-[#0A0A0A]">Available in Kisumu in September</span>
          </label>
        </fieldset>
        <fieldset className="space-y-3 pt-4">
          <legend className="label-mono text-[#52525B] mb-3">Media and documentation consent</legend>
          <label className={choiceClass}>
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 rounded border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
            />
            <span className="text-sm text-[#52525B] leading-relaxed">
              Nalla Labs and Baraza Media Lab may photograph, document, and publish our project for
              non-commercial programme and community reporting purposes.
            </span>
          </label>
        </fieldset>
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-red-600" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex items-center gap-2 border border-[#E4E4E7] bg-white text-[#0A0A0A] text-sm font-medium px-5 py-4 hover:border-[#0A0A0A] transition-colors duration-150"
          >
            <ArrowLeft size={14} aria-hidden />
            Back
          </button>
        ) : null}
        {step < lastStep ? (
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-[#FAFAFA] text-sm font-medium py-4 hover:bg-[#27272A] transition-colors duration-150"
          >
            Next: {steps[step + 1].label}
            <ArrowRight size={14} aria-hidden />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex-1 bg-[#0A0A0A] text-[#FAFAFA] text-sm font-medium py-4 hover:bg-[#27272A] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting registration..." : "Submit team registration"}
          </button>
        )}
      </div>
    </form>
  );
}
