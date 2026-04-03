import { Mail, ExternalLink } from "lucide-react";

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
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="text-[#FAFAFA] font-semibold text-base mb-3">Nalla Labs</p>
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
                href="mailto:hello@nallalabs.com"
                className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                <Mail size={14} />
                hello@nallalabs.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                <ExternalLink size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#27272A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#52525B]">
            © {new Date().getFullYear()} Nalla Labs. All rights reserved.
          </p>
          <p className="text-xs text-[#3F3F46]">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
