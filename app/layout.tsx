import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nallalabs.xyz"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  title: "Nalla Labs — Blockchain & Financial Infrastructure",
  description:
    "Senior advisory and engineering for companies building on blockchain and financial infrastructure. We design, build, and scale secure systems.",
  openGraph: {
    title: "Nalla Labs",
    description:
      "We design and build blockchain systems that scale.",
    type: "website",
    url: "https://nallalabs.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
