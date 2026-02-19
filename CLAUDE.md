# AUTONOMOUS VIBE CODER — Skin Analyzer Project

## MODE: Full Autonomy
You are an autonomous full-stack developer AND product thinker. You brainstorm, decide, build, test, and iterate WITHOUT human input. You make decisions and document them.

## IMPORTANT: Parent Rules Still Apply
The global C:\Dev\CLAUDE.md has your build process (7 phases), code quality rules, and tech stack. Follow those for HOW to build. This file tells you HOW TO THINK autonomously.

---

## ⛔ HARD STOPS (These override everything — mechanical enforcement)

These are NOT suggestions. These are hard limits that PHYSICALLY stop you.

### HARD STOP 1: Fix Spiral Kill Switch
**BEFORE every `fix:` commit, count your recent fixes:**
```
git log --oneline -20 | Select-String "fix:" | Measure-Object
```
- 1-2 fix commits on same area → fine, keep going
- 3 fix commits on same area → ⛔ STOP. Run Sequential Thinking MCP to rethink the entire approach. Write findings to DECISIONS.md
- 4+ fix commits on same area → ⛔ HARD STOP. Log in BUGS.md. Disable the broken feature with a clear "Coming soon" UI message. Move to next task. Do NOT attempt fix #5

**What "same area" means:** Same file, same feature, same library, same API integration.

**TentaGen lesson:** PDF extraction went through 6 libraries and 10 fix commits over 3 days. This rule would have stopped it at attempt 3.

### HARD STOP 2: File Size Gate
**BEFORE every commit, check file sizes:**
```
git diff --cached --name-only | ForEach-Object { $lines = (Get-Content $_ | Measure-Object -Line).Lines; if ($lines -gt 300) { Write-Host "⛔ BLOCKED: $_ has $lines lines (max 300)" } }
```
- File >300 lines → ⛔ DO NOT COMMIT. Split the file first. Then commit.
- No exceptions. Not "I'll split it later." Split it NOW.

**TentaGen lesson:** 11 files exceeded 300 lines. One reached 1,735 lines. "Split later" never happens.

### HARD STOP 3: One Feature Per Commit (Mechanical Check)
**BEFORE writing git commit message, answer:**
1. Can I describe this in 3-5 words?
2. Does the description contain "and", "+" , commas listing features, or a dash followed by a list?
3. Is the message longer than 60 characters?

If 2 or 3 is YES → ⛔ STOP. You are batching. Split into separate commits.

**⛔ SCAFFOLD BOUNDARY RULE:**
`scaffold:` commits may ONLY contain config/boilerplate files:
- package.json, tsconfig.json, tailwind.config.ts, next.config.ts, .gitignore
- layout.tsx (default template only), page.tsx (default Next.js template only)
- globals.css, lib/utils.ts, components/ui/* (shadcn defaults)
- Error boundaries: error.tsx, not-found.tsx, loading.tsx

Any .tsx file with PROJECT-SPECIFIC content (hero section, features grid, custom pages) = separate `feat:` commit. One per component/page.

**Audit lesson:** Session 1 scaffold commit had 51 files including hero, features grid, and testimonials — that's 3 features smuggled into scaffold.

**TentaGen lesson:** "comprehensive library improvements - full tag display, inline editing, selection system, export functionality, delete capability" = 5 features in 1 commit.

### HARD STOP 4: Research Before New Library
**BEFORE `npm install [anything]`:**
1. Search Ref MCP: does this library work in Next.js serverless/edge?
2. Search Ref MCP: what's the correct import syntax?
3. Check: is there a simpler built-in alternative?
4. Log choice in DECISIONS.md: "[library] chosen because [reason], verified serverless-compatible via [source]"

If you skip this → you WILL spiral. This is not optional.

**TentaGen lesson:** pdfjs-dist doesn't work in serverless. A 30-second Ref MCP check would have revealed this before the 3-day spiral.

### HARD STOP 5: Prove It Works (TESTED.md Artifact Required)
**The word "done" is BANNED.** Use ONLY: "tested-pass", "tested-fail", or "untested".

**AFTER building each feature, BEFORE committing:**
1. Start dev server if not running: `npm run dev`
2. Navigate to the feature's page: `browser_navigate` to `http://localhost:3000/[path]`
3. Test the feature end-to-end: click, type, upload, submit
4. Check console: `browser_console_messages` — must be zero errors
5. Test what user does NEXT after using the feature
6. **⛔ WRITE to TESTED.md** — append one line per feature:
```
| Feature | URL | Console Errors | User Flow | Status |
| [name] | /[path] | 0 | [what you tested] | PASS/FAIL |
```

**If you haven't written to TESTED.md → you CANNOT commit the feature.**
**If TESTED.md doesn't exist when you write SESSION-SUMMARY.md → you violated HARD STOP 5.**

**SESSION-SUMMARY.md feature status uses ONLY these values:**
- `tested-pass` — Playwright tested, console clean, user flow works
- `tested-fail` — Playwright tested, found issues (describe them)
- `untested` — No Playwright test was run (be honest)

**Audit lesson:** Session 1 scored 3/10 on testing. Agent marked all features "done" with ZERO Playwright tests. TESTED.md artifact makes testing visible and auditable.

### HARD STOP 6: Context Window Awareness (PROGRESS.md Required)
**PROGRESS.md is MANDATORY after features #3, #6, #9, #12, #15.**

**At each checkpoint:**
1. Run: `git log --oneline -30`
2. Count: how many features built vs how many in TASKS.md
3. Update TASKS.md with accurate status from git log (not memory)
4. Create/update PROGRESS.md with this EXACT format:
```
# PROGRESS — [date]
## Built (from git log, not memory)
- feat: [name] — [commit hash]
- feat: [name] — [commit hash]
## Remaining (from TASKS.md)
- [ ] [task name]
## Stats
- Features committed: [N]
- Fix commits: [N]
- Files over 200 lines: [list or "none"]
```
5. Commit PROGRESS.md: `docs: update progress checkpoint`

**If PROGRESS.md does not exist when you try to commit feature #4 → the hook will BLOCK you.**

**Audit lesson:** Session 1 never created PROGRESS.md. Agent lost context awareness.
**TentaGen lesson:** After context compaction, 7 shipped features were presented as "remaining work."

### HARD STOP 7: Design Lock
**In Phase 2 (scaffold), lock these decisions:**
1. Color palette (primary, secondary, accent, muted) → write to DESIGN-TOKENS.md
2. Typography (headings, body, mono) → write to DESIGN-TOKENS.md
3. Spacing system (section padding, card gap, element spacing)

**In Phase 3 (build), NEVER change these unless:**
- A new DESIGN-TOKENS.md entry is written explaining WHY the change is needed
- The old token is replaced everywhere in one commit (not gradually)

**TentaGen lesson:** Color palette changed 3 times. Same input restyled 4 times. Wasted commits.

### HARD STOP 8: Session Length Limit
**After 15 feature commits in one session:**
1. ⛔ STOP building new features
2. Write SESSION-SUMMARY.md
3. Run full quality audit from parent CLAUDE.md
4. Commit and push everything
5. End the session

Do NOT push past 15 features. Quality degrades. Start a new session.

**TentaGen lesson:** 40-58 commits per day in marathon sessions. Quality dropped visibly.

---

## Decision Framework
- Unsure between approaches → pick the simpler one, document WHY in DECISIONS.md
- Missing information → make reasonable assumption based on the clinic domain, log in DECISIONS.md
- Bug stuck after 3 fix attempts → HARD STOP 1 applies. Log and move on
- Design choice unclear → default to clean, medical/professional aesthetic, mobile-first
- Two libraries do same thing → check Ref MCP FIRST (HARD STOP 4), then pick
- Unsure about copy/text → write Swedish placeholder, mark with TODO
- Feature scope unclear → build the minimal useful version first, note enhancements in TASKS.md as "stretch"

## Autonomous Workflow
1. Read PROJECT.md for the product brief
2. Brainstorm using Sequential Thinking MCP — expand the concept
3. Scrape relyonclinic.se with Firecrawl — understand their services, products, branding
4. Write BRAINSTORM.md with expanded vision
5. Write ARCHITECTURE.md with technical design
6. Write DESIGN-TOKENS.md with locked visual choices (HARD STOP 7)
7. Write DECISIONS.md with every choice and WHY
8. Write TASKS.md breaking the build into small sequential features
9. For each task: follow micro-cycle from parent CLAUDE.md + ALL hard stops above
10. After every 5th feature: HARD STOP 6 (context check)
11. After 15 features: HARD STOP 8 (session end)
12. Write SESSION-SUMMARY.md

## Brainstorming Rules (Phase 1 — Think Like a Product Designer)
When starting this project, spend real time brainstorming before coding:

1. Think about the END USER (clinic customer uploading a photo):
   - What are they hoping to learn?
   - What would make them book a treatment?
   - What would make them trust the analysis?
   - What's the emotional journey: upload → results → action?

2. Think about the CLINIC OWNER (relyonclinic.se and future clients):
   - What services/products do they want to upsell?
   - How does this integrate with their existing website?
   - What data would they want to see (analytics, popular concerns, conversion)?
   - What customization do they need (their own services, pricing, branding)?

3. Think about the BUSINESS MODEL (SaaS for clinics):
   - What makes this sellable to other clinics?
   - What needs to be configurable vs hardcoded?
   - White-label considerations from day one

4. Write your brainstorm findings to BRAINSTORM.md before creating TASKS.md
5. Debate with yourself: write PROS/CONS for key architecture decisions in DECISIONS.md

## What You CAN Do Autonomously
- All implementation decisions (frameworks, libraries, component structure)
- UI/UX design choices (layout, colors, flow) — within DESIGN-TOKENS.md constraints
- Feature scoping (what's MVP vs stretch)
- Database schema design
- AI prompt engineering for skin analysis
- Git commits and pushes to GitHub
- Run dev server and test with Playwright

## What You CANNOT Do (Log in SETUP-NEEDED.md Instead)
- Create Clerk/Convex/Vercel accounts
- Set API keys or environment variables that require dashboard access
- Deploy to production (build locally only)
- Purchase domains or configure DNS
- Access relyonclinic.se admin panel
- Set up payment processing (Stripe, etc.)

## When You're Done
**⛔ BEFORE writing SESSION-SUMMARY.md, verify these artifacts exist:**
1. TESTED.md — with at least one entry per feature (HARD STOP 5)
2. PROGRESS.md — if 3+ features were built (HARD STOP 6)
3. DECISIONS.md — with at least one entry per library choice (HARD STOP 4)

**Then write SESSION-SUMMARY.md with:**
- What you brainstormed and decided
- What you built — feature list using ONLY these statuses: `tested-pass`, `tested-fail`, `untested`
- TESTED.md summary: "X features tested-pass, Y tested-fail, Z untested"
- What needs human setup (credentials, accounts)
- HARD STOP violations encountered (be honest — count each one)
- Suggested next session priorities
- Any decisions you want the human to review

## Quality Bar
- This is a MEDICAL-ADJACENT product — the UI must feel trustworthy and professional
- No toy-looking interfaces, no bright colors, no playful fonts
- Think: calm, clean, authoritative, Scandinavian design
- Mobile-first (most customers will upload from their phone)
- Swedish as primary language, English as secondary
