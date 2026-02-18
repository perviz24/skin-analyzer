import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { NextResponse } from "next/server";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

const skinAnalysisSchema = z.object({
  overallScore: z
    .number()
    .min(1)
    .max(100)
    .describe("Overall skin health score from 1 to 100"),
  skinAge: z
    .number()
    .optional()
    .describe("Estimated skin age in years, if determinable"),
  summary: z
    .string()
    .describe(
      "2-3 sentence summary in Swedish of the overall skin condition, starting with positives"
    ),
  positives: z
    .array(z.string())
    .describe(
      "List of 2-4 positive aspects of the skin, in Swedish (e.g., 'Jämn hudton', 'God elasticitet')"
    ),
  findings: z.array(
    z.object({
      area: z
        .string()
        .describe("Face area: panna, kinder, ögonområdet, käklinje, haka, näsa, läppar"),
      concern: z
        .string()
        .describe(
          "Skin concern type: fine_lines, wrinkles, acne, pigmentation, redness, dehydration, pores, skin_laxity, dark_circles, uneven_texture"
        ),
      severity: z
        .string()
        .describe("mild, moderate, or significant"),
      description: z
        .string()
        .describe("Brief description of the finding in Swedish, gentle and professional tone"),
    })
  ),
  recommendations: z.array(
    z.object({
      treatmentSlug: z
        .string()
        .describe(
          "Slug matching one of: botox, fillers, tear-trough, fillers-ovre-ogonlock, profhilo, sunekos, microneedling, plasma-pen, lashlift-browlift"
        ),
      reason: z
        .string()
        .describe("Why this treatment is recommended, in Swedish, 1-2 sentences"),
      priority: z
        .string()
        .describe("high, medium, or low priority"),
      concerns: z
        .array(z.string())
        .describe("Which concerns from findings this addresses"),
    })
  ),
});

const SYSTEM_PROMPT = `Du är en AI-hudanalysassistent för RelyOn Beauty Clinic i Örebro.

UPPGIFT: Analysera det bifogade ansiktsfotot och ge en professionell hudanalys.

REGLER:
- Börja ALLTID med positiva observationer
- Använd ett varmt, professionellt och uppmuntrande tonfall
- All text ska vara på svenska
- Undvik medicinsk terminologi — använd vardagligt språk
- Detta är INTE en medicinsk bedömning — det är en skönhetsanalys
- Rekommendera BARA behandlingar från klinikens utbud (se treatmentSlug-alternativen)
- Begränsa till max 3-4 resultat (findings) och 2-3 behandlingsrekommendationer
- Var ärlig men alltid snäll — aldrig dömande

BEHANDLINGAR SOM KAN REKOMMENDERAS:
- botox: Mot rynkor i panna, ögonområdet, runt munnen
- fillers: Volym i kinder, läppar, nasolabialveck
- tear-trough: Mörka ringar och hålighet under ögonen
- fillers-ovre-ogonlock: Volymförlust i övre ögonlocket
- profhilo: Hudförbättring, lyster, fukt (hela ansiktet)
- sunekos: Hudföryngring, fina linjer, mörka ringar
- microneedling: Textur, ärr, porer, ojämn hudton
- plasma-pen: Slapp hud, ögonlock, halslinjer
- lashlift-browlift: Ögonfransar och bryn

Om fotot inte visar ett ansikte eller är för dålig kvalitet, ge en overallScore på 0 och en summary som förklarar att bilden inte kunde analyseras.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Ingen bild skickades" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API-nyckel saknas. Kontakta administratören." },
        { status: 500 }
      );
    }

    // Strip data URL prefix if present, keep raw base64
    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const { object } = await generateObject({
      model: anthropic("claude-sonnet-4-5-20250929"),
      schema: skinAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analysera detta ansiktsfoto och ge en hudanalys enligt instruktionerna.",
            },
            {
              type: "image",
              image: base64Data,
            },
          ],
        },
      ],
      system: SYSTEM_PROMPT,
    });

    // Generate a simple ID for the result (no database yet)
    const id = crypto.randomUUID();

    // Store in memory for now (will be replaced with Convex)
    // For MVP, we return the result directly and store in sessionStorage on client
    return NextResponse.json({
      id,
      ...object,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Analysen misslyckades. Försök igen." },
      { status: 500 }
    );
  }
}
