import { Card, CardContent } from "@/components/ui/card";

interface ScoreCardProps {
  overallScore: number;
  skinAge?: number;
  summary: string;
  positives: string[];
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-orange-600 dark:text-orange-400";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Utmärkt";
  if (score >= 60) return "Bra";
  if (score >= 40) return "Medel";
  return "Kan förbättras";
}

export function ScoreCard({
  overallScore,
  skinAge,
  summary,
  positives,
}: ScoreCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {/* Score circle */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border-4 border-primary/20">
            <div className="text-center">
              <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
              <span className="block text-xs text-muted-foreground">/100</span>
            </div>
          </div>
          <div>
            <p className={`text-lg font-semibold ${getScoreColor(overallScore)}`}>
              {getScoreLabel(overallScore)}
            </p>
            {skinAge && (
              <p className="text-sm text-muted-foreground">
                Uppskattad hudålder: <span className="font-medium">{skinAge} år</span>
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {summary}
        </p>

        {/* Positives */}
        {positives.length > 0 && (
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
            <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
              Det som är bra med din hud:
            </p>
            <ul className="space-y-1">
              {positives.map((positive) => (
                <li
                  key={positive}
                  className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400"
                >
                  <span className="mt-0.5">✓</span>
                  <span>{positive}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
