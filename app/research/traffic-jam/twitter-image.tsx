import { researchShareImage } from "@/lib/research-og";

export const alt = "Traffic Jam: Nairobi's traffic isn't just a road problem. It's a coordination problem.";
export const size = { width: 1200, height: 675 };
export const contentType = "image/png";

export default function TwitterImage() {
  return researchShareImage({
    label: "PREPRINT · TRAFFIC JAM v1.0",
    title: "Nairobi's traffic isn't just a road problem. It's a coordination problem.",
    subtitle: "Open research by Allan Robinson, Nalla Labs. Free to read, download and contribute.",
    size,
  });
}
