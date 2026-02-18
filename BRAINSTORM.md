# BRAINSTORM — Skin Analyzer

## The Core Idea
A web app where clinic customers upload a selfie, AI analyzes their skin, and they receive personalized treatment recommendations linked to the clinic's actual services.

## Research: RelyOn Beauty Clinic (First Client)

### Services Offered (13 treatments)
| Treatment | Category | What It Treats |
|-----------|----------|---------------|
| Botox | Injection | Wrinkles (forehead, crow's feet, frown lines) |
| Fillers | Injection | Volume loss (lips, cheeks, jawline, nasolabial folds) |
| Tear Trough | Injection | Dark circles, under-eye hollows |
| Fillers övre ögonlock | Injection | Upper eyelid hollowing |
| Profhilo | Injection | Skin quality, hydration, fine lines |
| Sunekos | Injection | Collagen/elastin stimulation, skin quality |
| Microneedling/Dermapen | Skincare | Skin texture, scars, pores, pigmentation |
| Plasma Pen | Skincare | Skin tightening, sagging |
| Hyalase | Injection | Filler removal/correction |
| Hudförändringar/kirurgi | Surgical | Skin lesion removal |
| Microblading | Cosmetic | Eyebrow enhancement |
| Lashlift & Browlift | Cosmetic | Lash/brow lifting |
| Åderbråcksbehandling | Medical | Varicose veins |

### Clinic Branding
- Primary color: Warm copper (#C36226)
- Font: Montserrat
- Tone: Professional, trustworthy, medical expertise
- Location: Örebro, Sweden
- USPs: IVO-registered, CE-marked products, certified doctor, free follow-up
- Rating: 4.7/5 Google
- Booking: via bokadirekt.se

## User Journey Design

### The Customer (selfie uploader)
**Arrival**: Link on clinic website, social media ad, QR code in clinic waiting room
**Emotional state**: Curious, maybe self-conscious, hoping for validation + guidance
**Journey**:
1. See landing page → understands what this does in 3 seconds
2. Taps "Analysera din hud" → camera opens or file upload
3. Takes/uploads selfie → sees preview, gives GDPR consent
4. Waits 5-10 seconds → sees beautiful loading animation
5. Gets results → skin score + findings on their photo + treatment recommendations
6. Clicks "Boka behandling" → goes to clinic's booking page

**What converts them**:
- Seeing specific issues marked ON their own photo (personal, tangible)
- Gentle, encouraging language (not judgmental)
- Clear, specific recommendations (not generic)
- Easy one-tap booking

### The Clinic Owner
**Value proposition**:
- Lead generation: every analysis = warm lead with known concerns
- Upselling: targeted treatment recommendations based on AI findings
- Differentiation: first clinic in Örebro with AI skin analysis
- Data: anonymous analytics on most common concerns
- Branding: professional tool adds credibility

## AI Analysis Capabilities

### What Claude Vision CAN reliably identify:
- Fine lines and wrinkles (forehead, crow's feet, nasolabial, marionette)
- Skin texture (pore size, roughness, smoothness)
- Skin tone evenness (hyperpigmentation, redness, dark spots)
- Under-eye area (dark circles, hollowness, puffiness)
- Facial volume (cheek fullness, jawline definition)
- Skin hydration appearance
- Lip volume and symmetry
- Brow shape and position
- Overall skin clarity and radiance

### What it should NOT do:
- Medical diagnoses (eczema, rosacea, melanoma)
- Attractiveness ratings or comparisons
- Scare tactics or urgency creation
- Claim accuracy beyond "indicative assessment"

### Finding → Treatment Mapping
| AI Finding | Severity Range | Treatment(s) |
|-----------|---------------|-------------|
| Forehead wrinkles | Mild-Noticeable | Botox |
| Crow's feet | Mild-Noticeable | Botox |
| Frown lines (glabella) | Mild-Noticeable | Botox |
| Nasolabial folds | Mild-Noticeable | Fillers |
| Marionette lines | Moderate-Noticeable | Fillers |
| Lip volume loss | Mild-Moderate | Fillers |
| Under-eye circles/hollows | Mild-Noticeable | Tear Trough |
| Upper eyelid hollowing | Mild-Moderate | Fillers övre ögonlock |
| Skin texture/dullness | Moderate | Microneedling, Profhilo |
| Loss of skin elasticity | Moderate-Noticeable | Sunekos, Profhilo |
| Skin laxity/sagging | Moderate-Noticeable | Plasma Pen |
| Brow drooping | Mild-Moderate | Browlift |

## Emotional Design Principles

1. **Start with positives** — always highlight what's good about their skin first
2. **Frame as enhancement** — "areas that can be improved" not "problems"
3. **Gentle Swedish language** — "kan förbättras" not "problem"
4. **Trust through transparency** — explain what AI sees and why it recommends
5. **No pressure** — informative, not sales-pushy
6. **Medical credibility** — clean design, disclaimers, professional tone

## GDPR Compliance (MVP)
1. Explicit consent checkbox before photo upload
2. Privacy notice: photo analyzed then immediately deleted
3. No permanent photo storage
4. Analysis results stored temporarily (24h) without PII
5. Swedish-language privacy policy
6. Medical disclaimer on results

## SaaS Future (Architecture-Ready)
- Multi-tenant: clinicId on all data models
- Configurable: treatments from database, not hardcoded
- White-label: clinic branding from database (colors, logo, name)
- Embeddable: can work as standalone or iframe
- Analytics: anonymous concern trends per clinic

## MVP Scope (Session 1)
Build the complete customer flow: Landing → Upload → Analysis → Results with booking CTAs.
No auth, no admin dashboard, no tracking over time. Just the core value loop.
