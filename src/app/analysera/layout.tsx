import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analysera din hud | RelyOn Beauty Clinic",
  description:
    "Ladda upp en bild och få en personlig AI-driven hudanalys med behandlingsrekommendationer.",
};

export default function AnalyzeraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
