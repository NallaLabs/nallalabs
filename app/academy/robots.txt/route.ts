import { ACADEMY_URL } from "@/lib/academy/site";

// Served as academy.nallalabs.xyz/robots.txt via the rewrite in next.config.ts.
export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${ACADEMY_URL}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
