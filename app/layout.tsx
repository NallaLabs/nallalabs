import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const description =
  "Senior advisory and engineering for companies building on blockchain and financial infrastructure. We design, build, and scale secure systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nallalabs.xyz"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  title: {
    default: "Nalla Labs — Blockchain & Financial Infrastructure",
    template: "%s — Nalla Labs",
  },
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nalla Labs",
    description,
    siteName: "Nalla Labs",
    locale: "en_US",
    type: "website",
    url: "https://nallalabs.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalla Labs",
    description,
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
