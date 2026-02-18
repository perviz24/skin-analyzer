# HANDOFF — Skin Analyzer (RelyOn Beauty Clinic)
Generated: 2026-02-18

## What Was Built This Session
- **Scaffold**: Next.js 16 + React 19 + TS + Tailwind v4 + shadcn/ui (New York/Zinc) — working
- **Landing page**: Hero, how-it-works, trust-badges, footer with RelyOn branding — working
- **Upload page** (`/analysera`): Camera selfie + file upload, photo preview, GDPR consent — working
- **AI Analysis API** (`/api/analyze`): Claude Sonnet 4.5 Vision via Vercel AI SDK `generateObject` — needs API key
- **Score card component**: Animated circle, color-coded score, skin age, positives — working
- **Findings list component**: Severity badges (Mild/Måttlig/Märkbar), area labels — working
- **Treatment recommendations**: Priority sorting, bokadirekt.se booking links, 9 treatments mapped — working
- **Results page** (`/resultat/[id]`): Composes all result components, share button, CTA — working (sessionStorage)
- **Analyzing overlay**: Animated Swedish progress steps with dots — working
- **Per-page metadata**: SEO titles/descriptions for /analysera and /resultat — working

## Current State
- Live URL: **Not deployed yet** (needs Convex + API key + Vercel setup)
- Last commit: `a9f30d5` — per-page metadata layouts
- Dev server: stopped (restart with `npm run dev` in project dir)
- Known issues:
  - `nul` file in root — Windows reserved device name phantom, gitignored, harmless
  - Convex not configured yet — excluded from tsconfig, schema/seed files ready
  - No ANTHROPIC_API_KEY set — API route will 500 without it
  - Results stored in sessionStorage (volatile) — will move to Convex when configured

## Next Steps (priority order)
1. **Set up Convex**: `npx convex dev --configure new --team pervz --project skin-analyzer --once`
2. **Add ANTHROPIC_API_KEY** to `.env.local`: `ANTHROPIC_API_KEY=sk-ant-...`
3. **Test full flow**: Upload photo → analyze → see results on localhost
4. **Wire Convex storage**: Replace sessionStorage with Convex mutations for persistent results
5. **Seed treatments data**: Run Convex seed function to populate treatments table
6. **Deploy to Vercel**: Set env vars, `vercel --prod --force --yes`
7. **Polish**: Dark mode audit, mobile responsive check, error states for API failures

## Key Architecture Decisions
- **No database yet**: Using sessionStorage so the full UI flow works before Convex is configured
- **Claude Sonnet 4.5 for analysis**: Via `generateObject` with Zod schema for structured output
- **Swedish-only**: All UI text in Swedish, AI system prompt requests Swedish responses
- **Base64 image transfer**: Photo captured as base64 data URL, sent directly to API route
- **Treatment mapping**: 9 RelyOn treatments hardcoded with bokadirekt.se booking URLs
- **Warm copper theme**: Primary color #C36226 (oklch), matches RelyOn clinic branding
- **GDPR consent**: Required checkbox before analysis, photo not stored

## Environment & Credentials
- **Missing**: `ANTHROPIC_API_KEY` (needed for AI analysis)
- **Missing**: Convex deployment URL (run `npx convex dev` to generate)
- **Set**: Git remote → https://github.com/perviz24/skin-analyzer
- **File**: `SETUP-NEEDED.md` has step-by-step instructions for human setup tasks

## File Structure
```
src/app/
  page.tsx                    — Landing page
  layout.tsx                  — Root layout (header + footer)
  analysera/page.tsx          — Upload/capture page
  resultat/[id]/page.tsx      — Results page
  api/analyze/route.ts        — AI analysis endpoint
  error.tsx, not-found.tsx, loading.tsx — Error boundaries

src/components/
  analyze/photo-capture.tsx   — Camera + file upload
  analyze/photo-preview.tsx   — Preview + consent + submit
  analyze/analyzing-overlay.tsx — Loading animation
  results/score-card.tsx      — Score circle + summary
  results/findings-list.tsx   — Findings with severity
  results/treatment-recommendations.tsx — Treatment cards
  landing/hero.tsx, how-it-works.tsx, trust-badges.tsx
  layout/header.tsx, footer.tsx

src/lib/types.ts              — Shared TypeScript interfaces
convex/schema.ts              — Database schema (not active yet)
convex/treatments.ts          — Treatment seed data
```
