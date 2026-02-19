import type { SkinAnalysisResult } from "./types";

// Realistic mock analysis for demo/testing when ANTHROPIC_API_KEY is not set
export const MOCK_ANALYSIS: Omit<SkinAnalysisResult, "id" | "createdAt"> = {
  overallScore: 74,
  skinAge: 32,
  summary:
    "Din hud ser generellt sett frisk och välvårdad ut med god lyster och jämn hudton. Vi ser några områden som kan förbättras med rätt behandling, framför allt fina linjer kring ögonen och en viss ojämnhet i hudtexturen på kinderna.",
  positives: [
    "Jämn och fin hudton utan märkbar pigmentering",
    "God elasticitet och spänst i huden",
    "Väl återfuktad hud med naturlig lyster",
  ],
  findings: [
    {
      area: "ögonområdet",
      concern: "fine_lines",
      severity: "mild",
      description:
        "Lätta fina linjer runt ögonen som blir synliga vid leende. Helt normalt och kan behandlas enkelt.",
    },
    {
      area: "kinder",
      concern: "uneven_texture",
      severity: "mild",
      description:
        "Något ojämn hudtextur på kinderna med synliga porer. Kan förbättras med hudvårdsbehandlingar.",
    },
    {
      area: "panna",
      concern: "fine_lines",
      severity: "moderate",
      description:
        "Måttliga expressionslinjer i pannan som syns vid ansiktsuttryck. Kan minskas med rätt behandling.",
    },
  ],
  recommendations: [
    {
      treatmentSlug: "profhilo",
      reason:
        "Profhilo förbättrar hudens kvalitet inifrån och ger ökad lyster och fukt. Perfekt för att behålla och förstärka din redan goda hudkvalitet.",
      priority: "high",
      concerns: ["fine_lines", "uneven_texture"],
    },
    {
      treatmentSlug: "microneedling",
      reason:
        "Microneedling stimulerar hudens naturliga läkningsprocess och förbättrar textur, porer och fina linjer. Ger jämnare och slätare hud.",
      priority: "medium",
      concerns: ["uneven_texture"],
    },
  ],
};
