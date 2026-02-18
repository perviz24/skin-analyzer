# ARCHITECTURE — Skin Analyzer MVP

## Tech Stack
- **Next.js 15** + TypeScript + React 19
- **Tailwind CSS** + shadcn/ui (New York style, Zinc)
- **Convex** — treatment catalog + anonymous analytics + temporary results
- **Vercel AI SDK** + @ai-sdk/anthropic — Claude Vision for skin analysis
- **Lucide React** — icons
- **Vercel** — hosting

## Pages
```
/ ..................... Landing page (hero + how it works + trust + CTA)
/analysera ............ Photo upload/capture page
/resultat/[id] ........ Analysis results page
```

## API Routes
```
POST /api/analyze ..... Receives base64 photo, calls Claude Vision, stores results in Convex, returns analysis ID
```

## Convex Schema

### treatments
```typescript
treatments: defineTable({
  name: v.string(),           // "Botox"
  slug: v.string(),           // "botox"
  description: v.string(),    // Short description in Swedish
  concerns: v.array(v.string()), // ["fine_lines", "wrinkles", "crow_feet"]
  clinicUrl: v.string(),      // "https://relyonclinic.se/botox/"
  bookingUrl: v.string(),     // "https://www.bokadirekt.se/places/relyon-beauty-clinic-34144"
  priceFrom: v.optional(v.number()), // Starting price in SEK
  category: v.string(),       // "injection" | "skincare" | "surgical" | "cosmetic"
  isActive: v.boolean(),
  clinicId: v.string(),       // "relyon" — for multi-tenant future
})

```

### analyses (temporary, anonymous)
```typescript
analyses: defineTable({
  overallScore: v.number(),
  skinAge: v.optional(v.number()),
  summary: v.string(),
  findings: v.array(v.object({
    area: v.string(),
    concern: v.string(),
    severity: v.string(),
    description: v.string(),
  })),
  recommendations: v.array(v.object({
    treatmentSlug: v.string(),
    reason: v.string(),
    priority: v.string(),
    concerns: v.array(v.string()),
  })),
  positives: v.array(v.string()),
  clinicId: v.string(),
  createdAt: v.number(),
  // NO photo stored, NO personal data
})
```

## AI Pipeline
```
Client: capture photo → base64 encode → POST /api/analyze
Server: validate image → call Claude Vision with structured prompt
        → parse JSON response → store in Convex → return analysis ID
Client: redirect to /resultat/[id] → fetch analysis from Convex → render
```

## Component Architecture
```
src/components/
├── layout/
│   ├── header.tsx ......... Clinic logo, nav
│   └── footer.tsx ......... Disclaimer, links
├── landing/
│   ├── hero-section.tsx ... Main CTA
│   ├── how-it-works.tsx ... 3-step explanation
│   └── trust-badges.tsx ... IVO, GDPR, AI badges
├── analyze/
│   ├── photo-capture.tsx .. Camera/upload UI
│   ├── photo-preview.tsx .. Preview with retake
│   └── consent-form.tsx ... GDPR checkbox
├── results/
│   ├── skin-score.tsx ..... Animated score circle
│   ├── findings-list.tsx .. Expandable finding cards
│   ├── photo-overlay.tsx .. Photo with zone markers
│   ├── recommendations.tsx  Treatment recommendation cards
│   └── positives-list.tsx . Good things about their skin
└── ui/ .................... shadcn components
```

## Key Technical Decisions
1. **No auth for MVP** — frictionless upload → results flow
2. **Base64 photo transfer** — simple, no file storage needed
3. **Convex for results** — temporary storage (24h), enables shareable links
4. **CSS overlays** — for photo annotations (not Canvas)
5. **Single clinic hardcoded** — multi-tenant fields exist but RelyOn is default
6. **Rate limiting** — simple in-memory counter per IP (10/hour)
