"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import { downloadUrl, formatDate, type Paper, type PaperVersion, type ResearchDoc } from "@/lib/research";

type Doc = {
  key: string;
  doc: ResearchDoc;
  label: string;
  version: PaperVersion;
  file: string;
  pages?: number;
  sizeMb?: number;
  unit: string;
};

export function PaperViewer({ paper }: { paper: Paper }) {
  // Each hosted version contributes its paper and, if it has one, its slide deck.
  const docs: Doc[] = paper.versions
    .filter((v) => v.file)
    .flatMap((v) => [
      {
        key: `${v.version}-paper`,
        doc: "paper" as const,
        label: `v${v.version} · Full paper`,
        version: v,
        file: v.file!,
        pages: v.pages,
        sizeMb: v.sizeMb,
        unit: "pages",
      },
      ...(v.deck
        ? [
            {
              key: `${v.version}-deck`,
              doc: "deck" as const,
              label: `v${v.version} · Briefing`,
              version: v,
              file: v.deck.file,
              pages: v.deck.pages,
              sizeMb: v.deck.sizeMb,
              unit: "slides",
            },
          ]
        : []),
    ]);
  const [selected, setSelected] = useState(docs[0].key);
  const doc = docs.find((d) => d.key === selected) ?? docs[0];
  const active = doc.version;
  const file = doc.file;
  const downloadName = file.split("/").pop();
  const tracked = downloadUrl(paper, active.version, doc.doc);

  return (
    <div className="border border-[#E4E4E7] bg-white">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-[#E4E4E7] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Paper version">
          {docs.map((d) => (
            <button
              key={d.key}
              role="tab"
              aria-selected={d.key === doc.key}
              onClick={() => setSelected(d.key)}
              className={`label-mono !text-[0.7rem] border px-3 py-1.5 transition-colors cursor-pointer ${
                d.key === doc.key
                  ? "border-[#0A0A0A] bg-[#0A0A0A] !text-[#FAFAFA]"
                  : "border-[#E4E4E7] hover:border-[#0A0A0A] hover:!text-[#0A0A0A]"
              }`}
            >
              {d.label}
            </button>
          ))}
          <span className="text-xs text-[#A1A1AA] ml-1">
            Published {formatDate(active.publishedAt)}
            {doc.pages ? ` · ${doc.pages} ${doc.unit}` : ""}
            {doc.sizeMb ? ` · ${doc.sizeMb} MB` : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={tracked}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#E4E4E7] text-[#0A0A0A] text-sm px-4 py-2 hover:border-[#0A0A0A] transition-colors duration-150"
          >
            <ExternalLink size={14} />
            Open
          </a>
          <a
            href={tracked}
            download={downloadName}
            className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FAFAFA] text-sm px-4 py-2 hover:bg-[#27272A] transition-colors duration-150"
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>
      </div>

      {/* Embedded PDF. Mobile browsers often can't render PDFs inline, so the
          fallback content gives them the same open/download actions. */}
      <object
        key={file}
        data={`${file}#navpanes=0&view=FitH`}
        type="application/pdf"
        className="block w-full h-[75vh] min-h-[480px] bg-[#F4F4F5]"
        aria-label={`${paper.title} ${doc.label} PDF`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <FileText size={32} className="text-[#A1A1AA]" />
          <p className="text-sm text-[#52525B] max-w-sm">
            Your browser can&apos;t show the PDF here. Open it in a new tab or download it to read.
          </p>
          <a
            href={tracked}
            download={downloadName}
            className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FAFAFA] text-sm px-5 py-2.5 hover:bg-[#27272A] transition-colors"
          >
            <Download size={14} />
            Download {doc.label}
          </a>
        </div>
      </object>
    </div>
  );
}
