"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Documents share one pdf.js worker. Tearing a document down is async, so the
// next load waits for the previous teardown to finish before reusing the worker.
let teardown: Promise<void> = Promise.resolve();

/**
 * Renders a PDF page by page with pdf.js, for browsers that can't show PDFs
 * inline (Chrome on Android, and iOS Safari, which only shows the first page).
 * Pages are drawn when they scroll near the viewport.
 */
export function PdfPages({ file, label, fallback }: { file: string; label: string; fallback: React.ReactNode }) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [failed, setFailed] = useState(false);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let task: { destroy: () => Promise<void> } | null = null;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        if (!pdfjs.GlobalWorkerOptions.workerPort) {
          pdfjs.GlobalWorkerOptions.workerPort = new Worker(
            new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url),
            { type: "module" },
          );
        }
        await teardown;
        if (cancelled) return;
        const loading = pdfjs.getDocument({ url: file });
        task = loading;
        const loaded = await loading.promise;
        if (!cancelled) setDoc(loaded);
      } catch (error) {
        console.error("[PdfPages]", error);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      if (task) teardown = task.destroy().catch(() => {});
    };
  }, [file]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    <div
      ref={containerRef}
      role="document"
      aria-label={label}
      className="h-[75vh] min-h-[480px] overflow-y-auto overscroll-contain bg-[#E4E4E7] p-2 sm:p-4 space-y-2 sm:space-y-4"
    >
      {!doc || !width ? (
        <p className="py-24 text-center text-sm text-[#71717A]">Loading document…</p>
      ) : (
        Array.from({ length: doc.numPages }, (_, i) => (
          <PdfPage key={i} doc={doc} pageNumber={i + 1} width={width - (width >= 640 ? 32 : 16)} />
        ))
      )}
    </div>
  );
}

function PdfPage({ doc, pageNumber, width }: { doc: PDFDocumentProxy; pageNumber: number; width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aspect, setAspect] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Read the page's shape up front so the placeholder has the right height.
  useEffect(() => {
    let cancelled = false;
    doc.getPage(pageNumber).then((page) => {
      const vp = page.getViewport({ scale: 1 });
      if (!cancelled) setAspect(vp.height / vp.width);
    });
    return () => {
      cancelled = true;
    };
  }, [doc, pageNumber]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || width <= 0) return;
    let task: { cancel: () => void; promise: Promise<void> } | null = null;
    let cancelled = false;

    doc.getPage(pageNumber).then((page) => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      task = page.render({ canvas, viewport });
      task.promise.catch(() => {});
    });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, pageNumber, width, visible]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={`Page ${pageNumber}`}
      className="block mx-auto bg-white shadow-sm"
      style={{ width, height: aspect ? width * aspect : width * 1.414 }}
    />
  );
}
