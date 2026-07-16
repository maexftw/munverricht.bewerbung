# GitHub Workflow (Agent A & Agent B)

To avoid conflicts with Google Agent and protect the `main` branch, use the following workflow:

1. **Agent Catchup:** Always pull the latest changes before starting.
2. **Feature Branching:** Work on branches prefixed with `ag-` (e.g., `ag-new-feature`).
3. **Pull Requests:** Use PRs instead of direct pushes to `main`.

### Automation Scripts
Use the `sync.ps1` script for common operations:
- `. .\sync.ps1` (to load functions)
- `Pull-Main`
- `New-Task "name"`
- `Push-Task`
