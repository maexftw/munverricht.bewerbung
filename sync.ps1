# GitHub & Jules Sync Automation

$JULES_API_KEY = "AQ.Ab8RN6KEn57urD61PhpSz0YiJf3Ul5Pga0nwtNqcSKD5ZIMYzg"
$CF_PROJECT = "maximilian-unverricht"

function Pull-Main {
    Write-Host ">>> Catching up with Jules (Pulling main)..." -ForegroundColor Cyan
    git checkout main
    git pull origin main
    Write-Host ">>> Sync complete." -ForegroundColor Green
}

function New-Task {
    param([string]$name)
    if (-not $name) { $name = Read-Host "Enter task name (e.g., feature-x)" }
    $branch = "ag-$name"
    Write-Host ">>> Creating new branch: $branch" -ForegroundColor Cyan
    git checkout main
    git pull origin main
    git checkout -b $branch
}

function Push-Task {
    $branch = git branch --show-current
    if ($branch -eq "main" -or $branch -eq "master") {
        Write-Error "CRITICAL: You are on $branch! Switch to a feature branch before pushing."
        return
    }
    Write-Host ">>> Pushing $branch to GitHub..." -ForegroundColor Cyan
    git push origin $branch
    Write-Host ">>> Creating Pull Request..." -ForegroundColor Cyan
    gh pr create --fill
}

function Check-Deploy {
    Write-Host ">>> Checking Cloudflare Status for $CF_PROJECT..." -ForegroundColor Cyan
    npx wrangler pages deployment list --project-name $CF_PROJECT --limit 1
}

function Jules-Status {
    Write-Host ">>> Querying Jules Sessions..." -ForegroundColor Cyan
    $headers = @{ "X-Goog-Api-Key" = $JULES_API_KEY }
    # Note: Using GitHub CLI to see Jules PRs as a fallback for API connectivity
    gh pr list --author "app/google-jules" --state open
}

Write-Host "-------------------------------------------"
Write-Host "Antigravity Unified Sync Tool v2.0"
Write-Host "Commands:"
Write-Host "  Pull-Main    - Get latest changes"
Write-Host "  New-Task     - Start a safe feature branch"
Write-Host "  Push-Task    - Push & Open PR"
Write-Host "  Check-Deploy - Check Cloudflare health"
Write-Host "  Jules-Status - See what Jules is doing"
Write-Host "-------------------------------------------"
