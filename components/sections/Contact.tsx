"use client";

import { useState } from "react";
import { Mail, Calendar } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

const projectTypes = [
  "Advisory / Strategy",
  "Engineering",
  "Security Audit",
  "Scale & Optimization",
  "Not sure yet",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with actual form submission (Resend, Formspree, etc.)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-[#F4F4F5] border-y border-[#E4E4E7]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <FadeUp>
            <p className="label-mono mb-6">Contact</p>
            <h2 className="text-h2 text-[#0A0A0A] mb-6">Let&apos;s talk.</h2>
            <p className="text-[#52525B] leading-relaxed mb-10">
              Tell us about your project. We&apos;ll respond within 24 hours.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@nallalabs.xyz"
                className="flex items-center gap-3 text-sm text-[#52525B] hover:text-[#0A0A0A] transition-colors group"
              >
                <span className="w-8 h-8 border border-[#E4E4E7] flex items-center justify-center group-hover:border-[#0A0A0A] transition-colors">
                  <Mail size={14} />
                </span>
                hello@nallalabs.xyz
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-sm text-[#52525B] hover:text-[#0A0A0A] transition-colors group"
              >
                <span className="w-8 h-8 border border-[#E4E4E7] flex items-center justify-center group-hover:border-[#0A0A0A] transition-colors">
                  <Calendar size={14} />
                </span>
                Book a 30-min call on Calendly
              </a>
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.1}>
            {submitted ? (
              <div className="border border-[#E4E4E7] bg-white p-10 flex flex-col items-center justify-center text-center h-full min-h-64">
                <p className="label-mono text-[#1D4ED8] mb-3">Received</p>
                <p className="text-[#0A0A0A] font-semibold text-lg mb-2">Thanks for reaching out.</p>
                <p className="text-sm text-[#52525B]">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-mono block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-mono block mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-mono block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </div>

                <div>
                  <label className="label-mono block mb-2">Project type</label>
                  <select className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors appearance-none">
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-mono block mb-2">Brief description</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're working on..."
                    className="w-full border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A0A0A] text-[#FAFAFA] text-sm py-3 hover:bg-[#27272A] transition-colors duration-150"
                >
                  Send message
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
