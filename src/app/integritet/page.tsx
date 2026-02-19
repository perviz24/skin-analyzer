import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy | RelyOn Beauty Clinic",
  description:
    "Läs om hur vi hanterar dina personuppgifter vid AI-hudanalys. GDPR-säkert.",
};

export default function IntegritetPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Tillbaka
        </Link>
      </Button>

      <h1 className="text-2xl font-bold tracking-tight mb-6">
        Integritetspolicy
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p className="text-foreground font-medium">
          Senast uppdaterad: 2026-02-19
        </p>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Vem ansvarar för dina uppgifter?
          </h2>
          <p>
            RelyOn Beauty Clinic i Örebro är personuppgiftsansvarig för
            behandlingen av dina uppgifter i samband med denna AI-hudanalys.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. Vilka uppgifter samlar vi in?
          </h2>
          <p>
            <strong className="text-foreground">Foto:</strong> Du laddar upp
            eller tar ett foto av ditt ansikte. Fotot skickas till vår server
            för AI-analys och raderas omedelbart efteråt. Vi sparar aldrig
            ditt foto.
          </p>
          <p>
            <strong className="text-foreground">Analysresultat:</strong>{" "}
            Resultatet av din hudanalys sparas tillfälligt (max 24 timmar) för
            att du ska kunna visa och dela det. Resultatet innehåller inga
            personuppgifter som kan kopplas till dig.
          </p>
          <p>
            <strong className="text-foreground">Teknisk data:</strong> Vi
            samlar inte in IP-adresser, cookies eller annan spårningsdata i
            grundversionen av tjänsten.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. Hur används AI i analysen?
          </h2>
          <p>
            Ditt foto analyseras av en AI-modell (Claude av Anthropic) som
            bedömer hudkvalitet, textur och tecken på åldrande. AI:n ger
            observationer och förslag på behandlingar från klinikens utbud.
          </p>
          <p>
            <strong className="text-foreground">Viktigt:</strong> Detta är
            inte en medicinsk bedömning. AI:n ger en indikativ skönhetsanalys
            och kan inte diagnostisera hudsjukdomar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. Rättslig grund
          </h2>
          <p>
            Behandlingen av ditt foto sker baserat på ditt uttryckliga
            samtycke (GDPR artikel 6.1a och artikel 9.2a). Du ger samtycke
            genom att kryssa i rutan innan analysen påbörjas. Du kan när som
            helst välja att inte använda tjänsten.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Hur länge sparas dina uppgifter?
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Foto: raderas omedelbart efter analys (sparas aldrig)</li>
            <li>Analysresultat: max 24 timmar, sedan raderas automatiskt</li>
            <li>Ingen permanent lagring av personuppgifter</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Dina rättigheter
          </h2>
          <p>Enligt GDPR har du rätt att:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Få information om vilka uppgifter vi behandlar</li>
            <li>Begära radering av dina uppgifter</li>
            <li>Återkalla ditt samtycke</li>
            <li>Lämna klagomål till Integritetsskyddsmyndigheten (IMY)</li>
          </ul>
          <p>
            Eftersom vi inte sparar personuppgifter permanent finns det i
            praktiken inga uppgifter att radera efter att analysen är klar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            7. Kontakt
          </h2>
          <p>
            RelyOn Beauty Clinic
            <br />
            Örebro, Sverige
            <br />
            Tel: 019-675 4646
            <br />
            Webb: relyonclinic.se
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            8. Tredjepartstjänster
          </h2>
          <p>
            Vi använder Anthropic (Claude) för AI-analys. Anthropic behandlar
            inte bilder som träningsdata och raderar dem efter bearbetning.
            Läs mer på{" "}
            <a
              href="https://www.anthropic.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Anthropics integritetspolicy
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
