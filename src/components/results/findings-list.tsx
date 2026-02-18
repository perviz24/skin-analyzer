import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SkinFinding } from "@/lib/types";

interface FindingsListProps {
  findings: SkinFinding[];
}

const severityConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  mild: { label: "Mild", variant: "secondary" },
  moderate: { label: "Måttlig", variant: "default" },
  significant: { label: "Märkbar", variant: "outline" },
};

const areaLabels: Record<string, string> = {
  panna: "Panna",
  kinder: "Kinder",
  ögonområdet: "Ögonområdet",
  käklinje: "Käklinje",
  haka: "Haka",
  näsa: "Näsa",
  läppar: "Läppar",
};

export function FindingsList({ findings }: FindingsListProps) {
  if (findings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Inga anmärkningsvärda fynd hittades. Din hud ser bra ut!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Observationer</h2>
      {findings.map((finding, index) => {
        const severity = severityConfig[finding.severity] ?? severityConfig.mild;
        const areaLabel = areaLabels[finding.area] ?? finding.area;

        return (
          <Card key={`${finding.area}-${finding.concern}-${index}`}>
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{areaLabel}</span>
                    <Badge variant={severity.variant} className="text-xs">
                      {severity.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {finding.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
