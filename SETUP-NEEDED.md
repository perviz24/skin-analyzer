# SETUP NEEDED — Human Actions Required

## 1. Convex Setup
Run in terminal (interactive login required):
```bash
cd C:\Dev\projects\skin-analyzer
npx convex dev --configure new --team pervz --project skin-analyzer --once
```
This will:
- Log you into Convex
- Create the project
- Generate `.env.local` with CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL

## 2. Anthropic API Key
Add to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-... (get from console.anthropic.com)
```

## 3. After Convex is configured
Run to seed treatment data:
```bash
npx convex run seed:seedTreatments --once
```

## 4. Vercel Deployment (later)
- Set env vars in Vercel dashboard before deploying
- NEXT_PUBLIC_CONVEX_URL (production Convex URL)
- ANTHROPIC_API_KEY
