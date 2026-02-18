import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { TreatmentRecommendation } from "@/lib/types";

interface TreatmentRecommendationsProps {
  recommendations: TreatmentRecommendation[];
}

const treatmentInfo: Record<string, { name: string; bookingUrl: string }> = {
  botox: {
    name: "Botox",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  fillers: {
    name: "Fillers",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  "tear-trough": {
    name: "Tear Trough",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  "fillers-ovre-ogonlock": {
    name: "Fillers övre ögonlock",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  profhilo: {
    name: "Profhilo",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  sunekos: {
    name: "Sunekos",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  microneedling: {
    name: "Microneedling",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  "plasma-pen": {
    name: "Plasma Pen",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
  "lashlift-browlift": {
    name: "Lashlift & Browlift",
    bookingUrl: "https://www.bokadirekt.se/places/relyon-clinic-56180",
  },
};

const priorityConfig: Record<string, { label: string; order: number }> = {
  high: { label: "Rekommenderas starkt", order: 1 },
  medium: { label: "Bra alternativ", order: 2 },
  low: { label: "Kan övervägas", order: 3 },
};

export function TreatmentRecommendations({
  recommendations,
}: TreatmentRecommendationsProps) {
  if (recommendations.length === 0) return null;

  const sorted = [...recommendations].sort((a, b) => {
    const orderA = priorityConfig[a.priority]?.order ?? 9;
    const orderB = priorityConfig[b.priority]?.order ?? 9;
    return orderA - orderB;
  });

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Behandlingsförslag</h2>
      <p className="text-sm text-muted-foreground -mt-1 mb-2">
        Baserat på din analys rekommenderar vi följande behandlingar hos RelyOn
        Beauty Clinic.
      </p>
      {sorted.map((rec) => {
        const info = treatmentInfo[rec.treatmentSlug];
        const priority = priorityConfig[rec.priority] ?? priorityConfig.medium;
        const name = info?.name ?? rec.treatmentSlug;
        const bookingUrl = info?.bookingUrl ?? "#";

        return (
          <Card key={rec.treatmentSlug}>
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="font-semibold">{name}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {priority.label}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {rec.reason}
              </p>
              <Button asChild size="sm" variant="outline" className="gap-1">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Boka behandling
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
