import { ImageResponse } from "next/og";

export const alt = "Nalla Labs";
export const size = {
  width: 1200,
  height: 675,
};
export const contentType = "image/png";

export default function TwitterImage() {
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
          color: "#FAFAFA",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Nalla Labs
          </div>
          <div style={{ fontSize: 16, color: "#93C5FD", letterSpacing: "0.08em" }}>
            nallalabs.xyz
          </div>
        </div>
        <div style={{ maxWidth: 900, fontSize: 60, fontWeight: 700, lineHeight: 1.02 }}>
          Blockchain advisory and engineering for financial systems.
        </div>
      </div>
    ),
    size,
  );
}
