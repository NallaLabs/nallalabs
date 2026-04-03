import { Mail } from "lucide-react";
import { BullMark } from "@/components/ui/BullMark";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <BullMark variant="dark" size={32} />
              <p className="text-[#FAFAFA] font-semibold text-base">Nalla Labs</p>
            </div>
            <p className="text-[#71717A] text-sm leading-relaxed max-w-xs">
              Advisory and engineering for companies building on blockchain and financial infrastructure.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="label-mono text-[#52525B] mb-4">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-mono text-[#52525B] mb-4">Contact</p>
            <div className="space-y-3">
              <a
                href="mailto:hello@nallalabs.xyz"
                className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                <Mail size={14} />
                hello@nallalabs.xyz
              </a>
              <a
                href="#about"
                className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                Leadership
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#27272A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#52525B]">
            © {new Date().getFullYear()} Nalla Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
