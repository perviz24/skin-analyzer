# DECISIONS — Skin Analyzer

Every non-trivial decision is logged here with reasoning.

---

## D1: No Authentication for MVP
**Choice**: No Clerk auth, no user accounts
**Why**: Frictionless experience. Customer wants to snap photo and get results, not create an account. Every auth step reduces conversion. Auth adds for tracking/dashboard in Phase 2.
**Trade-off**: No persistent history for users, no admin dashboard yet

## D2: Convex over Supabase
**Choice**: Convex for database
**Why**: Default stack per CLAUDE.md. Real-time subscriptions (useful for future live analysis updates). Multi-tenant fields built-in with document model. No SQL complexity needed.
**Alternative considered**: Supabase — would add PostgreSQL overhead for no benefit at MVP

## D3: Claude Vision (Sonnet 4.5) for AI Analysis
**Choice**: claude-sonnet-4-5-20250929 via Vercel AI SDK
**Why**: Excellent vision capabilities, structured output support, good balance of quality/speed/cost. Opus would be overkill for image analysis. Haiku would lack nuance.
**Verified**: Vercel AI SDK supports vision via @ai-sdk/anthropic (checked Ref MCP)

## D4: Base64 Photo Transfer (No File Storage)
**Choice**: Encode photo as base64 on client, send to API route
**Why**: Simple, no file upload infrastructure needed. GDPR-friendly (photo never persisted). Acceptable for single-image analysis.
**Trade-off**: ~33% larger payload vs binary. Max ~10MB images. No retry/resume.
**Future**: Add Convex file storage if video analysis or multi-photo needed

## D5: CSS Overlays for Photo Annotations
**Choice**: CSS positioned markers over photo, not Canvas drawing
**Why**: Simpler, responsive, interactive (click/hover on markers). No Canvas library needed. Works on all devices.
**Trade-off**: Less precise than pixel-level drawing. Good enough for zone indication.

## D6: Temporary Results in Convex (24h)
**Choice**: Store analysis results in Convex with auto-cleanup
**Why**: Enables shareable result links (/resultat/[id]). User can refresh without re-analyzing. Anonymous (no PII).
**Alternative**: URL-encoded results — too large for URLs, not shareable

## D7: Single Clinic Hardcoded (Multi-tenant Ready)
**Choice**: RelyOn data hardcoded/seeded, but clinicId fields on all models
**Why**: MVP ships fast with real data. Architecture supports multiple clinics without refactoring schema.
**Future**: Admin dashboard to configure clinics, treatments, branding

## D8: Design Direction — Modern Medical, Not WordPress Clone
**Choice**: Modern app-like design inspired by (not copying) RelyOn's branding
**Why**: RelyOn's current site is WordPress/Elementor — not a good design reference. We take their copper color and professional tone, but build a modern experience.
**Tokens**: Locked in DESIGN-TOKENS.md (HARD STOP 7)

## D9: Swedish Primary Language
**Choice**: All UI text in Swedish, English as future addition
**Why**: First client is Swedish. Their customers are Swedish. Primary use case is Swedish market.
**Implementation**: Hardcoded Swedish strings for MVP. i18n framework for multi-language in Phase 2.

## D10: Balanced AI Reports (Positives First)
**Choice**: AI always includes positive findings before concerns
**Why**: Nobody wants to see only problems. Starting with positives builds trust and reduces defensiveness. Makes user more receptive to treatment recommendations.
**Implementation**: AI prompt explicitly requires 2-3 positive observations before concerns

## D11: Geist Font Over Montserrat
**Choice**: Geist (Vercel's font) for both headings and body
**Why**: Modern, clean, excellent readability. Ships with Next.js. Montserrat (RelyOn's font) is overused and doesn't feel premium.
**Trade-off**: Slight disconnect from RelyOn's current branding. Acceptable — the app should feel premium, not match their WordPress theme.

## D12: Demo Mode When API Key Missing
**Choice**: Return realistic mock analysis data when ANTHROPIC_API_KEY is not set
**Why**: Unblocks full-flow testing without credentials. User can see the complete UI working before setting up API key. Includes 2s simulated delay for realistic UX. Demo banner clearly shows this is example data.
**No new libraries needed**: Uses existing types and mock data in src/lib/mock-analysis.ts

## D13: next-themes for Dark Mode
**Choice**: next-themes library with class attribute strategy
**Why**: De facto standard for Next.js dark mode. Handles SSR hydration, system preference, localStorage persistence. Tailwind v4 already had dark mode CSS variables configured in globals.css. Zero custom code needed for theme persistence.
**Verified**: Ref MCP confirmed current API (ThemeProvider, useTheme hook, attribute="class")
