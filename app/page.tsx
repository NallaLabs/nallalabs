import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Insights } from "@/components/sections/Insights";
import { Industries } from "@/components/sections/Industries";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Nalla Labs",
      url: "https://nallalabs.xyz",
      logo: "https://nallalabs.xyz/favicon.svg",
      description:
        "Nalla Labs designs, builds and staffs the digital systems African institutions run on: advisory and engineering, an engineering academy, and ecosystem programmes.",
      email: "hello@nallalabs.xyz",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@nallalabs.xyz",
          areaServed: "Worldwide",
          availableLanguage: ["en"],
        },
      ],
      employee: [
        { "@type": "Person", name: "Allan Robinson", jobTitle: "VP AI Engineering" },
        { "@type": "Person", name: "Fred Gitonga", jobTitle: "VP Payments + Blockchain" },
        { "@type": "Person", name: "Ann Maina", jobTitle: "VP Product" },
      ],
    },
    {
      "@type": "WebSite",
      name: "Nalla Labs",
      url: "https://nallalabs.xyz",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main className="relative">
        <Hero />
        <Partners />
        <Services />
        <Process />
        <About />
        <Insights />
        <Industries />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
