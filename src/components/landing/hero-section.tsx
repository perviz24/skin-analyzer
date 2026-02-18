import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground">
            <Camera className="h-3.5 w-3.5" />
            <span>AI-driven hudanalys</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Upptäck din huds
            <span className="text-primary"> potential</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Ladda upp en bild och få en personlig hudanalys med AI.
            Skräddarsydda behandlingsrekommendationer baserat på just din hud.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/analysera">
                Analysera din hud
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/#hur-det-fungerar">Hur det fungerar</Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-sm text-muted-foreground">
            Gratis analys &middot; Inga konton behövs &middot; GDPR-säkert
          </p>
        </div>
      </div>
    </section>
  );
}
