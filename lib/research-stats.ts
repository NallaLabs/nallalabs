import { Redis } from "@upstash/redis";
import type { ResearchDoc } from "@/lib/research";

// Counters live in one Redis hash per paper, e.g. research:stats:traffic-jam,
// with fields like "1.0:views", "1.0:paper:downloads", "1.0:deck:bytes".

let client: Redis | null | undefined;

function redis() {
  if (client === undefined) {
    const configured =
      (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
      (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN);
    client = configured ? Redis.fromEnv() : null;
  }
  return client;
}

const key = (paper: string) => `research:stats:${paper}`;

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|curl|wget|python|headless|lighthouse/i;

export function isBot(request: Request) {
  const ua = request.headers.get("user-agent") || "";
  return !ua || BOT_UA.test(ua);
}

export async function recordView(paper: string, version: string) {
  await redis()?.hincrby(key(paper), `${version}:views`, 1);
}

export async function recordDownload(paper: string, version: string, doc: ResearchDoc, bytes: number) {
  const r = redis();
  if (!r) return;
  await r
    .pipeline()
    .hincrby(key(paper), `${version}:${doc}:downloads`, 1)
    .hincrby(key(paper), `${version}:${doc}:bytes`, bytes)
    .exec();
}

export type VersionStats = {
  views: number;
  paperDownloads: number;
  deckDownloads: number;
  bytes: number;
};

/** Returns per-version counters, or null when stats storage isn't configured. */
export async function getStats(paper: string): Promise<Record<string, VersionStats> | null> {
  const r = redis();
  if (!r) return null;
  const raw = (await r.hgetall<Record<string, number>>(key(paper))) ?? {};
  const out: Record<string, VersionStats> = {};
  for (const [field, value] of Object.entries(raw)) {
    const [version, ...rest] = field.split(":");
    const s = (out[version] ??= { views: 0, paperDownloads: 0, deckDownloads: 0, bytes: 0 });
    const n = Number(value) || 0;
    const metric = rest.join(":");
    if (metric === "views") s.views += n;
    else if (metric === "paper:downloads") s.paperDownloads += n;
    else if (metric === "deck:downloads") s.deckDownloads += n;
    else if (metric.endsWith(":bytes")) s.bytes += n;
  }
  return out;
}
