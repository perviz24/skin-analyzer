# PROJECT: Skin Analyzer — AI-Powered Skin Analysis Web App

## The Vision
A web app where clinic customers upload a photo (or video) of their face. AI analyzes skin quality, aging signs, and facial features, then points out specific issues and recommends treatments — with hyperlinks to the clinic's actual services and products.

## First Client
- Clinic: relyonclinic.se (Swedish aesthetics/beauty clinic)
- The app will be embedded into or linked from their existing website
- Primary language: Swedish

## Core Concept
Customer uploads photo → AI analyzes face → Shows visual results on the photo (markers, zones) → Lists findings (e.g., "fine lines around eyes", "uneven skin tone on cheeks") → For each finding, suggests a treatment from the clinic's service menu → Links to book or buy

## Who Uses This

### The Customer (End User)
- Uploads a selfie or video from their phone
- Gets an instant skin analysis report
- Sees specific issues highlighted on their own photo
- Gets personalized treatment recommendations
- Can click through to book treatments or buy products
- Might share results or come back to track changes over time

### The Clinic Owner (relyonclinic.se + future SaaS clients)
- Configures their services, products, and pricing
- Maps treatments to skin concerns (e.g., "wrinkles → Botox, from 2500 kr")
- Sees analytics: how many analyses done, most common concerns, conversion to bookings
- Embeds the app on their website
- Customizes branding (logo, colors, clinic name)

## Business Model (Future)
- This will be sold as a SaaS to other beauty/aesthetics clinics
- White-label ready: each clinic gets their own branded version
- Think about multi-tenant architecture from the start
- Pricing: monthly subscription per clinic

## What I Want AI to Brainstorm and Expand
I've given you the rough idea. YOU should:
- Think about what features would make this actually useful and compelling
- Consider the full user journey (before, during, after the analysis)
- Think about what would make a clinic WANT to pay for this
- Consider gamification, tracking over time, sharing, referrals
- Think about the AI pipeline: what model, what analysis is realistic, what's gimmicky
- Consider privacy/GDPR (Swedish/EU customers, face photos)
- Think about what's MVP vs what's phase 2/3

## Tech Stack
Follow C:\Dev\CLAUDE.md defaults:
- Next.js + TypeScript + Tailwind + shadcn/ui
- Convex for database (real-time, multi-tenant ready)
- Clerk for auth
- Vercel AI SDK + Anthropic Claude for the analysis AI
- Vercel for hosting

## Existing Resources
- relyonclinic.se — the client's current website (scrape for services/products/branding)
- No existing codebase — this is a fresh build

## Constraints
- Must work on mobile (primary use case is selfie upload from phone)
- Must feel medical/professional, not toy-like
- Must handle face photos with care (GDPR, privacy notice, no permanent storage without consent)
- Swedish as primary language
- Should be embeddable (iframe or standalone with clinic branding)
