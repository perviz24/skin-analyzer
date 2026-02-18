# LAUNCH: Autonomous Skin Analyzer build session
# Usage: Open PowerShell, navigate to C:\Dev\projects\skin-analyzer, run: .\vibe.ps1
#
# What happens:
# 1. Claude reads CLAUDE.md files (project + parent) for rules and hard stops
# 2. Reads PROJECT.md for the product brief
# 3. Brainstorms, plans, and builds — no questions asked
# 4. When done: run .\review.ps1 to see what happened
#
# To stop early: press Ctrl+C

$ProjectPath = $PSScriptRoot

Write-Host ""
Write-Host "=== AUTONOMOUS VIBE CODER ===" -ForegroundColor Cyan
Write-Host "Project: Skin Analyzer" -ForegroundColor White
Write-Host "Path: $ProjectPath" -ForegroundColor Gray
Write-Host ""
Write-Host "Claude will brainstorm, plan, and build autonomously." -ForegroundColor White
Write-Host "Press Ctrl+C to stop at any time." -ForegroundColor DarkGray
Write-Host ""
Write-Host "When it finishes, run:  .\review.ps1" -ForegroundColor Yellow
Write-Host ""

# The prompt is deliberately repetitive about hard stops.
# Reason: TentaGen analysis showed Claude ignores instructions that are only in files.
# Repeating critical rules in the launch prompt increases compliance.

$prompt = @"
You are fully autonomous. Read these files FIRST, in this order:
1. CLAUDE.md in this project folder — contains 8 HARD STOPS you MUST obey
2. C:\Dev\CLAUDE.md — your build process and tech stack rules
3. PROJECT.md — the product brief

CRITICAL HARD STOPS (repeated here because you WILL forget if only in the file):

HARD STOP 1 — FIX SPIRAL: Before EVERY fix commit, run: git log --oneline -20 | Select-String "fix:"
  3 fixes on same area = STOP and rethink with Sequential Thinking MCP
  4+ fixes on same area = DISABLE the feature, log in BUGS.md, move on

HARD STOP 2 — FILE SIZE: Before EVERY commit, check modified file line counts.
  Any file >300 lines = DO NOT commit. Split the file first.

HARD STOP 3 — ONE FEATURE PER COMMIT: If your commit message contains "and", "+", or lists = STOP. Split.
  SCAFFOLD BOUNDARY: scaffold: commits = config files ONLY (package.json, tsconfig, tailwind.config, shadcn ui/).
  Any .tsx with project-specific content (hero, features, pages) = separate feat: commit.
  Session 1 smuggled 3 features into a 51-file scaffold commit.

HARD STOP 4 — RESEARCH FIRST: Before npm install ANYTHING, check Ref MCP for serverless compatibility.
  Log every library choice in DECISIONS.md with WHY and source.

HARD STOP 5 — PROVE IT (TESTED.md REQUIRED):
  The word "done" is BANNED. Use ONLY: "tested-pass", "tested-fail", "untested".
  AFTER each feature, BEFORE committing: run Playwright (navigate, test, console check).
  WRITE results to TESTED.md — one row per feature: name, URL, console errors, status.
  If TESTED.md doesn't exist when you write SESSION-SUMMARY.md = HARD STOP 5 violation.
  Session 1 scored 3/10 because ZERO Playwright tests were run.

HARD STOP 6 — CONTEXT CHECK (PROGRESS.md REQUIRED):
  PROGRESS.md is MANDATORY after features #3, #6, #9, #12, #15.
  Run git log, count features, update TASKS.md from facts not memory, write PROGRESS.md.
  If PROGRESS.md doesn't exist after 6 feat: commits = HARD STOP 6 violation.

HARD STOP 7 — DESIGN LOCK: Lock colors/fonts in DESIGN-TOKENS.md during scaffold. Never change in Phase 3.

HARD STOP 8 — SESSION LIMIT: After 15 feature commits, STOP. Write SESSION-SUMMARY.md and end.

WORKFLOW:
Step 1: Read all instruction files (CLAUDE.md x2 + PROJECT.md)
Step 2: Use Sequential Thinking MCP to brainstorm the product deeply
Step 3: Scrape relyonclinic.se with Firecrawl for services, products, branding
Step 4: Write BRAINSTORM.md, ARCHITECTURE.md, DESIGN-TOKENS.md, DECISIONS.md
Step 5: Write TASKS.md with sequential build tasks (MVP first)
Step 6: Scaffold the project (create-next-app, shadcn, packages)
Step 6b: IMMEDIATELY after git init, run: git config core.hooksPath .githooks
  This installs pre-commit hooks that BLOCK bad commits automatically.
  The hooks enforce: file size <300 lines, no feature batching, fix spiral detection, no secrets,
  TESTED.md required (warns at 3 features, BLOCKS at 5), PROGRESS.md required (warns at 3, BLOCKS at 6).
  You CANNOT bypass these. They are mechanical. If a commit is blocked, fix the issue first.
  Copy .githooks/ folder from project root into the scaffolded app folder if scaffold creates a subfolder.
Step 7: Build features one at a time — obey ALL hard stops
Step 8: Write SESSION-SUMMARY.md when done or at 15 features

AUTONOMY: Make all decisions. Log credentials needed in SETUP-NEEDED.md. Do NOT deploy. Do NOT ask questions.

Begin.
"@

Push-Location $ProjectPath
& claude --dangerously-skip-permissions --model opus "$prompt" 2>&1 | Tee-Object -FilePath "vibe-log.txt"
Pop-Location
