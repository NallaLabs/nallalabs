"use client";

import { useState } from "react";

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

const minMembers = 4;
const maxMembers = 4;

function memberName(index: number, field: keyof MemberField) {
  return `member_${index}_${field}`;
}

export function TechForMediaRegistrationForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState(4);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [submittedTeamName, setSubmittedTeamName] = useState<string | null>(null);

  const memberCards = Array.from({ length: teamSize }, (_, index) => index);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">1. Team basics</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Who is applying, and how do we reach the lead contact?
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Team name</span>
            <input
              type="text"
              name="teamName"
              required
              placeholder="e.g. Studio Loop"
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Lead name</span>
            <input
              type="text"
              name="leadName"
              required
              placeholder="Full name"
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Lead WhatsApp number</span>
            <input
              type="tel"
              name="leadWhatsApp"
              required
              placeholder="+254..."
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">Lead email</span>
            <input
              type="email"
              name="leadEmail"
              required
              placeholder="lead@example.com"
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="label-mono block text-[#52525B]">Number of members</span>
            <select
              name="teamSize"
              value={teamSize}
              onChange={(event) => handleTeamSizeChange(event.target.value)}
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
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
      </section>

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">2. Members</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Tell us who is on the team and what each person brings.
          </h3>
        </div>
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
                  <input
                    type="text"
                    name={memberName(index, "name")}
                    required
                    placeholder="Full name"
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </label>
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Email</span>
                  <input
                    type="email"
                    name={memberName(index, "email")}
                    placeholder="If available"
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </label>
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Phone / WhatsApp</span>
                  <input
                    type="tel"
                    name={memberName(index, "phone")}
                    placeholder="+254..."
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </label>
                <label className="space-y-2">
                  <span className="label-mono block text-[#52525B]">Profession / background</span>
                  <input
                    type="text"
                    name={memberName(index, "background")}
                    required
                    placeholder="Journalist, designer, creator, etc."
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="label-mono block text-[#52525B]">One skill they bring</span>
                  <input
                    type="text"
                    name={memberName(index, "skill")}
                    required
                    placeholder="Research, editing, coding, production, etc."
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </label>
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">3. Project seed</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Keep it light. We want to understand the problem, the audience, and the rough shape of the
            solution.
          </h3>
        </div>
        <div className="space-y-4">
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">
              What problem do you want to solve?
            </span>
            <textarea
              name="problem"
              required
              rows={4}
              maxLength={500}
              placeholder="2-3 sentences max."
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-y"
            />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">
              Who specifically has this problem?
            </span>
            <textarea
              name="audience"
              required
              rows={4}
              maxLength={500}
              placeholder="2-3 sentences max."
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-y"
            />
          </label>
          <label className="space-y-2">
            <span className="label-mono block text-[#52525B]">
              What do you think the solution could look like?
            </span>
            <textarea
              name="solution"
              required
              rows={4}
              maxLength={500}
              placeholder="2-3 sentences max."
              className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-y"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">4. Track selection</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Which build track best fits the idea?
          </h3>
        </div>
        <div className="grid gap-3">
          {tracks.map((track) => (
            <label
              key={track.value}
              className="border border-[#E4E4E7] bg-white p-4 flex items-start gap-3 cursor-pointer hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors"
            >
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
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">5. Technical experience</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Tell us how much technical experience is already in the team.
          </h3>
        </div>
        <div className="grid gap-3">
          {experienceOptions.map((option) => (
            <label
              key={option.value}
              className="border border-[#E4E4E7] bg-white p-4 flex items-start gap-3 cursor-pointer hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors"
            >
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
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">6. Commitment confirmation</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Confirm the team can show up for the programme schedule.
          </h3>
        </div>
        <div className="space-y-3">
          <label className="border border-[#E4E4E7] bg-white p-4 flex items-start gap-3 cursor-pointer hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
            <input
              type="checkbox"
              name="availableOnlineSessions"
              required
              className="mt-1 h-4 w-4 rounded border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
            />
            <span>
              <span className="block font-medium text-[#0A0A0A]">
                Available for 3 online sessions in June
              </span>
            </span>
          </label>
          <label className="border border-[#E4E4E7] bg-white p-4 flex items-start gap-3 cursor-pointer hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
            <input
              type="checkbox"
              name="availableInKisumu"
              required
              className="mt-1 h-4 w-4 rounded border-[#A1A1AA] text-[#1D4ED8] focus:ring-[#1D4ED8]"
            />
            <span>
              <span className="block font-medium text-[#0A0A0A]">Available in Kisumu on July 18</span>
            </span>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="label-mono text-[#1D4ED8] mb-2">7. Consent</p>
          <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            Confirm media and documentation consent.
          </h3>
        </div>
        <label className="border border-[#E4E4E7] bg-white p-4 flex items-start gap-3 cursor-pointer hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
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
      </section>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-red-600" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#0A0A0A] text-[#FAFAFA] text-sm font-medium py-4 hover:bg-[#27272A] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting registration..." : "Submit team registration"}
      </button>
    </form>
  );
}
