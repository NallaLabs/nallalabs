"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Download, Eye } from "lucide-react";
import { formatBytes, type Paper } from "@/lib/research";
import type { VersionStats } from "@/lib/research-stats";

const empty: VersionStats = { views: 0, paperDownloads: 0, deckDownloads: 0, bytes: 0 };

function sum(stats: VersionStats[]) {
  return stats.reduce(
    (a, s) => ({
      views: a.views + s.views,
      paperDownloads: a.paperDownloads + s.paperDownloads,
      deckDownloads: a.deckDownloads + s.deckDownloads,
      bytes: a.bytes + s.bytes,
    }),
    empty,
  );
}

/** Zenodo-style views/downloads box. Also records one view per browser session. */
export function PaperStats({ paper, version }: { paper: Paper; version: string }) {
  const [stats, setStats] = useState<Record<string, VersionStats> | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seenKey = `research-view:${paper.slug}:${version}`;
    let seen = false;
    try {
      seen = sessionStorage.getItem(seenKey) === "1";
      if (!seen) sessionStorage.setItem(seenKey, "1");
    } catch {
      // Storage can be blocked; counting the view anyway is the lesser error.
    }

    const load = () =>
      fetch(`/api/research/stats?paper=${paper.slug}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d: { versions: Record<string, VersionStats> }) => setStats(d.versions))
        .catch(() => setFailed(true));

    if (seen) {
      load();
    } else {
      fetch("/api/research/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper: paper.slug, version }),
        keepalive: true,
      })
        .catch(() => {})
        .finally(load);
    }
  }, [paper.slug, version]);

  if (failed) return null;

  const all = sum(Object.values(stats ?? {}));
  const current = stats?.[version] ?? empty;
  const fmt = (n: number) => (stats ? n.toLocaleString("en-GB") : "–");
  const rows: [string, (s: VersionStats) => string][] = [
    ["Views", (s) => fmt(s.views)],
    ["Full paper downloads", (s) => fmt(s.paperDownloads)],
    ["Briefing downloads", (s) => fmt(s.deckDownloads)],
    ["Data volume", (s) => (stats ? formatBytes(s.bytes) : "–")],
  ];

  return (
    <div className="border border-[#E4E4E7] bg-white">
      <div className="grid grid-cols-2 divide-x divide-[#E4E4E7]">
        <div className="p-5 text-center">
          <p className="text-3xl font-semibold tracking-tight text-[#0A0A0A]">{fmt(all.views)}</p>
          <p className="label-mono !text-[#52525B] mt-1 inline-flex items-center gap-1.5">
            <Eye size={13} /> Views
          </p>
        </div>
        <div className="p-5 text-center">
          <p className="text-3xl font-semibold tracking-tight text-[#0A0A0A]">
            {fmt(all.paperDownloads + all.deckDownloads)}
          </p>
          <p className="label-mono !text-[#52525B] mt-1 inline-flex items-center gap-1.5">
            <Download size={13} /> Downloads
          </p>
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-center gap-1.5 border-t border-[#E4E4E7] py-2.5 text-xs text-[#52525B] hover:text-[#0A0A0A] cursor-pointer"
      >
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? "Hide details" : "Show more details"}
      </button>

      {open ? (
        <div className="border-t border-[#E4E4E7] p-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[#71717A]">
                <th className="text-left font-normal pb-2" />
                <th className="text-right font-medium pb-2">All versions</th>
                <th className="text-right font-medium pb-2 pl-3">v{version}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label} className="border-t border-[#F4F4F5]">
                  <td className="py-2 text-[#0A0A0A]">{label}</td>
                  <td className="py-2 text-right tabular-nums text-[#52525B]">{value(all)}</td>
                  <td className="py-2 pl-3 text-right tabular-nums text-[#52525B]">{value(current)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[0.7rem] leading-relaxed text-[#A1A1AA]">
            Counted since publication. A view is one visit to this page per browser session;
            a download is each time a PDF is downloaded or opened from this site. Known bots are
            excluded.
          </p>
        </div>
      ) : null}
    </div>
  );
}
