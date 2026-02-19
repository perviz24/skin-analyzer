import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medicinsk information | RelyOn Beauty Clinic",
  description:
    "Viktig information om AI-hudanalys. Detta är inte en medicinsk bedömning.",
};

export default function InformationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Tillbaka
        </Link>
      </Button>

      <h1 className="text-2xl font-bold tracking-tight mb-6">
        Viktig information
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
          <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
            Medicinsk ansvarsfriskrivning
          </h2>
          <p className="text-amber-700 dark:text-amber-400">
            Denna AI-hudanalys är <strong>inte en medicinsk bedömning</strong>{" "}
            och ersätter inte professionell medicinsk rådgivning, diagnos eller
            behandling. Rådgör alltid med en legitimerad läkare eller
            dermatolog för medicinska hudproblem.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Vad är AI-hudanalys?
          </h2>
          <p>
            Vår AI-hudanalys använder artificiell intelligens för att analysera
            utseendemässiga aspekter av din hud baserat på ett foto. Den kan
            identifiera tecken på åldrande, hudtextur, hudton och andra
            visuella egenskaper.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Vad analysen KAN göra
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identifiera synliga linjer och rynkor</li>
            <li>Bedöma hudtextur och porsynlighet</li>
            <li>Observera ojämn hudton och pigmentering</li>
            <li>Uppskatta hudens allmänna utseende</li>
            <li>
              Föreslå skönhetsbehandlingar baserat på observationerna
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Vad analysen INTE kan göra
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Diagnostisera hudsjukdomar (eksem, psoriasis, rosacea)</li>
            <li>Bedöma hudförändringar som kan vara maligna</li>
            <li>Ersätta en läkarundersökning</li>
            <li>Garantera resultat av rekommenderade behandlingar</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Om RelyOn Beauty Clinic
          </h2>
          <p>
            RelyOn Beauty Clinic är en IVO-registrerad skönhetsklinik i
            Örebro med legitimerade läkare. Alla behandlingar utförs med
            CE-märkta produkter och följer gällande medicinska riktlinjer.
          </p>
          <p>
            Om du har frågor om en behandling eller vill boka en kostnadsfri
            konsultation, kontakta oss:
          </p>
          <ul className="list-none pl-0 space-y-1">
            <li>Tel: 019-675 4646</li>
            <li>
              Webb:{" "}
              <a
                href="https://relyonclinic.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                relyonclinic.se
              </a>
            </li>
            <li>
              Bokning:{" "}
              <a
                href="https://www.bokadirekt.se/places/relyon-clinic-56180"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                bokadirekt.se
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Noggrannhet
          </h2>
          <p>
            AI-analysen ger en indikativ bedömning baserat på ett enda foto.
            Resultaten kan påverkas av belysning, bildkvalitet, smink och
            kameravinkel. För mest tillförlitliga resultat, använd ett foto
            taget i dagsljus utan smink med ansiktet rakt framifrån.
          </p>
        </section>
      </div>
    </div>
  );
}
