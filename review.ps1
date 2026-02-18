# REVIEW: Check what the autonomous session built
# Usage: .\review.ps1

$ProjectPath = $PSScriptRoot

Write-Host ""
Write-Host "=== VIBE SESSION REVIEW ===" -ForegroundColor Cyan
Write-Host ""

# Session summary
if (Test-Path "$ProjectPath\SESSION-SUMMARY.md") {
    Write-Host "--- WHAT WAS BUILT ---" -ForegroundColor Green
    Get-Content "$ProjectPath\SESSION-SUMMARY.md"
    Write-Host ""
} else {
    Write-Host "[!] No SESSION-SUMMARY.md — session may still be running or crashed" -ForegroundColor Yellow
    Write-Host ""
}

# Decisions (most important to review)
if (Test-Path "$ProjectPath\DECISIONS.md") {
    Write-Host "--- DECISIONS (review these!) ---" -ForegroundColor Magenta
    Get-Content "$ProjectPath\DECISIONS.md"
    Write-Host ""
}

# Bugs
if (Test-Path "$ProjectPath\BUGS.md") {
    Write-Host "--- BUGS / BLOCKERS ---" -ForegroundColor Red
    Get-Content "$ProjectPath\BUGS.md"
    Write-Host ""
}

# Setup needed from you
if (Test-Path "$ProjectPath\SETUP-NEEDED.md") {
    Write-Host "--- YOUR ACTION NEEDED ---" -ForegroundColor Yellow
    Get-Content "$ProjectPath\SETUP-NEEDED.md"
    Write-Host ""
}

# Tasks
if (Test-Path "$ProjectPath\TASKS.md") {
    Write-Host "--- TASK STATUS ---" -ForegroundColor Blue
    Get-Content "$ProjectPath\TASKS.md"
    Write-Host ""
}

# Git log
if (Test-Path "$ProjectPath\.git") {
    Write-Host "--- RECENT COMMITS ---" -ForegroundColor Gray
    Push-Location $ProjectPath
    git log --oneline -20
    Pop-Location
    Write-Host ""
}

Write-Host "Done. If the build looks good, you can continue with:" -ForegroundColor DarkGray
Write-Host '  .\vibe.ps1  (picks up from TASKS.md)' -ForegroundColor DarkGray
Write-Host ""
