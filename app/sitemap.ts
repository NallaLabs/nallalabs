import type { MetadataRoute } from "next";
import { latestPublished, papers } from "@/lib/research";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestResearch = papers
    .map((p) => latestPublished(p).publishedAt)
    .sort()
    .at(-1);

  return [
    {
      url: "https://nallalabs.xyz",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://nallalabs.xyz/research",
      lastModified: latestResearch,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...papers.flatMap((p) => {
      const latest = latestPublished(p);
      return [
        {
          url: `https://nallalabs.xyz${p.href}`,
          lastModified: latest.publishedAt,
          changeFrequency: "monthly" as const,
          priority: 0.9,
        },
        // PDFs are indexed by Google and Google Scholar in their own right.
        ...[latest.file, latest.deck?.file].filter(Boolean).map((file) => ({
          url: `https://nallalabs.xyz${file}`,
          lastModified: latest.publishedAt,
          changeFrequency: "yearly" as const,
          priority: 0.6,
        })),
      ];
    }),
    {
      url: "https://nallalabs.xyz/events/tech-for-media-2026",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
