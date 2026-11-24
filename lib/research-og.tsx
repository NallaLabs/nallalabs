import { ImageResponse } from "next/og";

/** Shared social-preview image for research pages (Open Graph and X/Twitter). */
export function researchShareImage({
  label,
  title,
  subtitle,
  size,
}: {
  label: string;
  title: string;
  subtitle: string;
  size: { width: number; height: number };
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          backgroundImage:
            "linear-gradient(rgba(250,250,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#FAFAFA",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: "0.12em" }}>
          <div style={{ color: "#A1A1AA" }}>NALLA LABS · RESEARCH</div>
          <div style={{ color: "#93C5FD" }}>nallalabs.xyz/research</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
          <div style={{ fontSize: 22, color: "#93C5FD", letterSpacing: "0.12em" }}>{label}</div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
            {title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.3, color: "#D4D4D8" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 360, background: "#1D4ED8" }} />
      </div>
    ),
    size,
  );
}
