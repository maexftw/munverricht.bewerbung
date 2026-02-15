# Anti-Gravity Workflow Initializer

$targetDir = Get-Location
Write-Host ">>> Initializing Anti-Gravity Workflow in: $targetDir" -ForegroundColor Cyan

# 1. Copy template files
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Copy-Item "$scriptPath\sync.ps1" -Destination "$targetDir\sync.ps1" -Force
Copy-Item "$scriptPath\agents.md" -Destination "$targetDir\agents.md" -Force

# 2. Append to README.md
if (Test-Path "$targetDir\README.md") {
    $workflowDocs = Get-Content "$scriptPath\README_WORKFLOW.md" -Raw
    Add-Content -Path "$targetDir\README.md" -Value "`n$workflowDocs"
    Write-Host ">>> README.md updated." -ForegroundColor Green
}
else {
    Copy-Item "$scriptPath\README_WORKFLOW.md" -Destination "$targetDir\README.md" -Force
    Write-Host ">>> README.md created." -ForegroundColor Green
}

# 3. Check Git Status
if (-not (Test-Path "$targetDir\.git")) {
    Write-Host ">>> Git not initialized. Initializing..." -ForegroundColor Yellow
    git init
}

Write-Host ">>> Setup Complete! Run '. .\sync.ps1' to start." -ForegroundColor Green
