import type { MetadataRoute } from "next";
import { weeks } from "@/lib/academy/curriculum";
import { ACADEMY_URL } from "@/lib/academy/site";

// Served as academy.nallalabs.xyz/sitemap.xml via the rewrite in next.config.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: ACADEMY_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...weeks.flatMap((w) => [
      {
        url: `${ACADEMY_URL}/week/${w.number}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      ...w.days.map((_, i) => ({
        url: `${ACADEMY_URL}/week/${w.number}/day/${i + 1}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ]),
  ];
}
