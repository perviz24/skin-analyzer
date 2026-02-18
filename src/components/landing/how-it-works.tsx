import { Camera, Sparkles, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Camera,
    title: "1. Fota din hud",
    description:
      "Ta en selfie eller ladda upp en bild. Bra belysning och inga filter ger bäst resultat.",
  },
  {
    icon: Sparkles,
    title: "2. AI analyserar",
    description:
      "Vår AI granskar din hudkvalitet, textur, linjer och identifierar förbättringsområden.",
  },
  {
    icon: Heart,
    title: "3. Få rekommendationer",
    description:
      "Se personliga behandlingsförslag kopplade till klinikens tjänster — med direktlänk till bokning.",
  },
];

export function HowItWorks() {
  return (
    <section id="hur-det-fungerar" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Hur det fungerar
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tre enkla steg till din personliga hudanalys
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
