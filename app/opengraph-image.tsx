import { ImageResponse } from "next/og";

export const alt = "Nalla Labs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0A0A0A 0%, #10172A 55%, #1D4ED8 100%)",
          color: "#FAFAFA",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "#FAFAFA",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Nalla Labs
            </div>
            <div style={{ fontSize: 14, color: "#CBD5E1", letterSpacing: "0.08em" }}>
              nallalabs.xyz
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Blockchain & financial infrastructure advisory.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.3, color: "#E2E8F0" }}>
            Senior engineering for systems that need to work in production.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
