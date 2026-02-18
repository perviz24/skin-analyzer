# Run this once after cloning or scaffolding the project
# It tells git to use our custom hooks instead of the default .git/hooks/

git config core.hooksPath .githooks
Write-Host "Git hooks installed. Pre-commit and commit-msg hooks are now active." -ForegroundColor Green
Write-Host ""
Write-Host "What they enforce:" -ForegroundColor Cyan
Write-Host "  - No files over 300 lines (blocks commit)" -ForegroundColor White
Write-Host "  - No commit messages over 72 chars (catches batching)" -ForegroundColor White
Write-Host "  - No comma-separated feature lists in messages" -ForegroundColor White
Write-Host "  - No 'comprehensive/various/multiple' in messages" -ForegroundColor White
Write-Host "  - Fix spiral detection: warns at fix #3, blocks at fix #5" -ForegroundColor White
Write-Host "  - TESTED.md required: warns at 3 features, blocks at 5 features" -ForegroundColor White
Write-Host "  - PROGRESS.md required: warns at 3 features, blocks at 6 features" -ForegroundColor White
Write-Host "  - No secrets or .env files committed" -ForegroundColor White
Write-Host ""
Write-Host "Emergency bypass (use sparingly): git commit --no-verify" -ForegroundColor DarkGray
