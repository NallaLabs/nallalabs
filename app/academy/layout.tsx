import type { Metadata } from "next";
import Link from "next/link";
import { BullMark } from "@/components/ui/BullMark";
import { ACADEMY_URL, MAIN_SITE_URL } from "@/lib/academy/site";

export const metadata: Metadata = {
  metadataBase: new URL(ACADEMY_URL),
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-[#E4E4E7]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
          <a href={MAIN_SITE_URL} className="flex items-center gap-2 hover:opacity-75 transition-opacity" aria-label="Nalla Labs home">
            <BullMark variant="light" size={36} />
            <span className="font-semibold text-sm tracking-tight">Nalla Labs</span>
          </a>
          <Link href="/" className="label-mono !text-[#1D4ED8] hover:!text-[#0A0A0A] transition-colors">
            Academy
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#E4E4E7] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-wrap justify-between gap-2 text-sm text-[#52525B]">
          <span>Nalla Labs Academy</span>
          <a href="mailto:hello@nallalabs.xyz" className="hover:text-[#0A0A0A]">
            hello@nallalabs.xyz
          </a>
        </div>
      </footer>
    </>
  );
}
