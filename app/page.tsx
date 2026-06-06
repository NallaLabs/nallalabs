import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { About } from "@/components/sections/About";
import { Insights } from "@/components/sections/Insights";
import { Industries } from "@/components/sections/Industries";
import { Capabilities } from "@/components/sections/Capabilities";
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
        "Senior advisory and engineering for companies building on blockchain and financial infrastructure.",
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
      founder: [
        { "@type": "Person", name: "Allan Robinson" },
        { "@type": "Person", name: "Fred Gitonga" },
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
        <TrustStrip />
        <Services />
        <Process />
        <CaseStudies />
        <About />
        <Insights />
        <Industries />
        <Capabilities />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
