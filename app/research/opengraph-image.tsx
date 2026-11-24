import { researchShareImage } from "@/lib/research-og";

export const alt = "Nalla Labs Research: open research on the systems African cities run on";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return researchShareImage({
    label: "OPEN RESEARCH",
    title: "Open research. Shared problems.",
    subtitle: "Versioned, open-source research on the systems African cities and institutions run on.",
    size,
  });
}
