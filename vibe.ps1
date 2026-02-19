# LAUNCH: Autonomous vibe coding session
# Usage: Open PowerShell, navigate to project folder, run: .\vibe.ps1
#
# What happens:
# 1. Git hooks are mechanically installed via GIT_TEMPLATE_DIR
# 2. Claude reads CLAUDE.md files for rules and hard stops
# 3. Reads PROJECT.md for the product brief
# 4. Brainstorms, plans, and builds — no questions asked
# 5. When done: run .\review.ps1 to see what happened
#
# To stop early: press Ctrl+C

$ProjectPath = $PSScriptRoot

Write-Host ""
Write-Host "=== AUTONOMOUS VIBE CODER ===" -ForegroundColor Cyan
Write-Host "Path: $ProjectPath" -ForegroundColor Gray
Write-Host ""

# ============================================
# MECHANICAL HOOK INSTALLATION via GIT_TEMPLATE_DIR
# ============================================
# This is the ONLY reliable way to enforce hooks.
# When git init runs (even inside npx create-next-app),
# Git copies everything from templateDir/hooks/ into .git/hooks/.
# The agent cannot bypass this. The hooks are baked in at repo creation.

$HooksSource = "$ProjectPath\.githooks"
$TemplateDir = "$ProjectPath\.git-template"

if (Test-Path $HooksSource) {
    # Create template directory structure
    $TemplateHooksDir = "$TemplateDir\hooks"
    if (-not (Test-Path $TemplateHooksDir)) {
        New-Item -ItemType Directory -Path $TemplateHooksDir -Force | Out-Null
    }

    # Copy latest hooks into template (always overwrite to get latest version)
    Copy-Item -Path "$HooksSource\pre-commit" -Destination "$TemplateHooksDir\pre-commit" -Force
    Copy-Item -Path "$HooksSource\commit-msg" -Destination "$TemplateHooksDir\commit-msg" -Force

    # Set GIT_TEMPLATE_DIR — this affects ALL git init in this PowerShell session
    $env:GIT_TEMPLATE_DIR = $TemplateDir
    Write-Host "  GIT_TEMPLATE_DIR set to: $TemplateDir" -ForegroundColor Green
    Write-Host "  Every 'git init' will auto-install hooks from .githooks/" -ForegroundColor Green

    # Also install hooks in any EXISTING repos right now
    $ExistingRepos = @()
    if (Test-Path "$ProjectPath\.git") {
        $ExistingRepos += $ProjectPath
    }
    Get-ChildItem -Path $ProjectPath -Directory -Recurse -Filter ".git" -Hidden -ErrorAction SilentlyContinue | ForEach-Object {
        if ($_.Parent.FullName -ne $ProjectPath) {
            $ExistingRepos += $_.Parent.FullName
        }
    }

    foreach ($Repo in $ExistingRepos) {
        # Copy hooks directly into .git/hooks/ for existing repos
        $RepoGitHooks = "$Repo\.git\hooks"
        if (-not (Test-Path $RepoGitHooks)) {
            New-Item -ItemType Directory -Path $RepoGitHooks -Force | Out-Null
        }
        Copy-Item -Path "$HooksSource\pre-commit" -Destination "$RepoGitHooks\pre-commit" -Force
        Copy-Item -Path "$HooksSource\commit-msg" -Destination "$RepoGitHooks\commit-msg" -Force
        Write-Host "  Hooks installed in existing repo: $Repo" -ForegroundColor Green
    }
} else {
    Write-Host "  WARNING: .githooks/ not found at $HooksSource" -ForegroundColor Red
    Write-Host "  Hooks will NOT be enforced!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Claude will brainstorm, plan, and build autonomously." -ForegroundColor White
Write-Host "Press Ctrl+C to stop at any time." -ForegroundColor DarkGray
Write-Host ""
Write-Host "When it finishes, run:  .\review.ps1" -ForegroundColor Yellow
Write-Host ""

# The prompt tells the agent to read files. Hard stops are repeated here
# because TentaGen analysis showed Claude ignores instructions only in files.
# Hook installation instructions are REMOVED — hooks are mechanical now.

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
  SCAFFOLD BOUNDARY: scaffold: commits = config files ONLY. Project-specific .tsx = separate feat: commit.

HARD STOP 4 — RESEARCH FIRST: Before npm install ANYTHING, check Ref MCP for serverless compatibility.
  Log every library choice in DECISIONS.md with WHY and source.

HARD STOP 5 — PROVE IT (TESTED.md REQUIRED):
  The word "done" is BANNED. Use ONLY: "tested-pass", "tested-fail", "untested".
  AFTER each feature, BEFORE committing: run Playwright (navigate, test, console check).
  WRITE results to TESTED.md — one row per feature.
  If TESTED.md doesn't exist at 5+ features, the git hook BLOCKS your commit.

HARD STOP 6 — CONTEXT CHECK (PROGRESS.md REQUIRED):
  PROGRESS.md is MANDATORY after feature #3 (and again at #6, #9, #12, #15).
  The git hook BLOCKS feature #4 if PROGRESS.md doesn't exist.

HARD STOP 7 — DESIGN LOCK: Lock colors/fonts in DESIGN-TOKENS.md during scaffold.

HARD STOP 8 — SESSION LIMIT: After 15 feature commits, STOP. Write SESSION-SUMMARY.md.

GIT HOOKS ARE PRE-INSTALLED. They are in .git/hooks/ already. Do NOT modify them.
Do NOT run git config core.hooksPath. Do NOT copy .githooks/. Hooks are mechanical and active.
If a hook blocks your commit, fix the issue — do NOT bypass with --no-verify.

WORKFLOW:
Step 1: Read all instruction files (CLAUDE.md x2 + PROJECT.md)
Step 2: ⛔ DEEP BRAINSTORM (do NOT rush this — it's the most important step):
  2a. Sequential Thinking MCP with MINIMUM 10 thought steps — explore the problem deeply
  2b. Research 2-3 competitor products with Firecrawl/Exa — what exists, what's good/bad
  2c. For each stakeholder: map their goals, fears, emotional journey
  2d. Debate 2+ technical approaches in DECISIONS.md with PROS/CONS before picking one
  2e. Write BRAINSTORM.md (MUST include "## Competitive Analysis" section)
Step 3: Write ARCHITECTURE.md, DESIGN-TOKENS.md, DECISIONS.md (with PROS/CONS)
Step 4: Write TASKS.md with sequential build tasks (MVP first)
  ⛔ GATE: Do NOT create TASKS.md until BRAINSTORM.md has competitive analysis and DECISIONS.md has PROS/CONS
Step 5: Scaffold the project (create-next-app, shadcn, packages)
Step 6: Build features one at a time — obey ALL hard stops
Step 7: Write SESSION-SUMMARY.md when done or at 15 features

AUTONOMY: Make all decisions. Log credentials needed in SETUP-NEEDED.md. Do NOT deploy. Do NOT ask questions.

Begin.
"@

Push-Location $ProjectPath
& claude --dangerously-skip-permissions --model opus "$prompt" 2>&1 | Tee-Object -FilePath "vibe-log.txt"
Pop-Location

# ============================================
# POST-SESSION: Verify hooks in all repos
# ============================================
Write-Host ""
Write-Host "=== POST-SESSION HOOK AUDIT ===" -ForegroundColor Cyan

$AllRepos = @()
if (Test-Path "$ProjectPath\.git") {
    $AllRepos += $ProjectPath
}
Get-ChildItem -Path $ProjectPath -Directory -Recurse -Filter ".git" -Hidden -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.Parent.FullName -ne $ProjectPath) {
        $AllRepos += $_.Parent.FullName
    }
}

$MissingHooks = 0
foreach ($Repo in $AllRepos) {
    $PreCommit = "$Repo\.git\hooks\pre-commit"
    $CommitMsg = "$Repo\.git\hooks\commit-msg"
    if ((Test-Path $PreCommit) -and (Test-Path $CommitMsg)) {
        Write-Host "  Hooks OK: $Repo" -ForegroundColor Green
    } else {
        Write-Host "  HOOKS MISSING: $Repo" -ForegroundColor Red
        $MissingHooks++
        # Install them now for future commits
        $RepoGitHooks = "$Repo\.git\hooks"
        if (-not (Test-Path $RepoGitHooks)) {
            New-Item -ItemType Directory -Path $RepoGitHooks -Force | Out-Null
        }
        Copy-Item -Path "$HooksSource\pre-commit" -Destination "$RepoGitHooks\pre-commit" -Force
        Copy-Item -Path "$HooksSource\commit-msg" -Destination "$RepoGitHooks\commit-msg" -Force
        Write-Host "  -> Hooks installed for future commits" -ForegroundColor Yellow
    }
}

if ($MissingHooks -gt 0) {
    Write-Host ""
    Write-Host "WARNING: $MissingHooks repo(s) had hooks missing during the session." -ForegroundColor Red
    Write-Host "GIT_TEMPLATE_DIR may not have worked for these repos." -ForegroundColor Red
} else {
    Write-Host "All repos had hooks installed." -ForegroundColor Green
}

Write-Host ""
Write-Host "Session complete. Run .\review.ps1 to audit." -ForegroundColor Yellow
