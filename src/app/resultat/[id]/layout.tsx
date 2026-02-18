import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ditt resultat | RelyOn Beauty Clinic",
  description:
    "Se din personliga hudanalys med poäng, observationer och behandlingsrekommendationer.",
};

export default function ResultatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
