# GitHub Sync Automation

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
    if ($LASTEXITCODE -ne 0) {
        Write-Host ">>> Falling back to 'master' branch..." -ForegroundColor Yellow
        git checkout master
    }
    git pull origin (git branch --show-current)
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

Write-Host "-------------------------------------------"
Write-Host "Antigravity GitHub Sync Tool Loaded"
Write-Host "Commands:"
Write-Host "  Pull-Main  - Get latest changes from Jules"
Write-Host "  New-Task   - Start a new safe feature branch"
Write-Host "  Push-Task  - Push changes and open a PR"
Write-Host "-------------------------------------------"
