"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { BullMark } from "@/components/ui/BullMark";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Academy", href: "https://academy.nallalabs.xyz" },
  { label: "Events", href: "/events/tech-for-media-2026" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/#insights" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links are real <a href>s so search engines can follow them. On the home page,
  // section links scroll smoothly instead of navigating.
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    if (!href.startsWith("/#") || window.location.pathname !== "/") return;
    const el = document.querySelector(href.slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-[#E4E4E7]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-8 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
            aria-label="Nalla Labs home"
          >
            <BullMark variant="light" size={48} />
            <span className="text-[#0A0A0A] font-semibold text-sm tracking-tight leading-none">
              Nalla Labs
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-[#52525B] hover:text-[#0A0A0A] transition-colors duration-100 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#1D4ED8] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center gap-1 text-sm border border-[#0A0A0A] px-4 py-2 hover:bg-[#0A0A0A] hover:text-[#FAFAFA] transition-colors duration-150"
              onClick={(e) => handleNavClick(e, "/#contact")}
            >
              Book a Call
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1 text-[#0A0A0A]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center"
          >
            <div className="absolute top-5 left-6">
              <BullMark variant="dark" size={48} />
            </div>
            <button
              className="absolute top-5 right-6 text-[#FAFAFA]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-semibold text-[#FAFAFA] hover:text-[#A1A1AA] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="mt-4 text-lg border border-[#FAFAFA] text-[#FAFAFA] px-6 py-3 hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors"
              >
                Book a Call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
