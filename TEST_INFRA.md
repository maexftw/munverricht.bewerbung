# E2E Test Infra: Maximilian Unverricht Cyberpunk Portfolio

## Test Philosophy
- **Opaque-box & Requirement-driven**: Tests derive directly from `ORIGINAL_REQUEST.md` and `PROJECT.md` specifications without coupling to internal component private states.
- **Methodology**: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.
- **Runners**:
  - `npm run test:vitest` (Vitest + JSDOM for React 19 component tree, interactions, DOM accessibility, and layout assertions).
  - `npm test` (Node.js test runner for schema integrity, translation parity, and data contracts).

## Feature Inventory & Test Matrix
| # | Feature ID | Feature Name | Tier 1 (Feature Isolation) | Tier 2 (Boundary & Corner) | Tier 3 (Cross-Feature Pairwise) | Tier 4 (Real-World Journeys) |
|---|------------|--------------|:--------------------------:|:--------------------------:|:-------------------------------:|:----------------------------:|
| 1 | F01 | Cyberpunk Theme & Design Tokens | ≥5 tests | ≥5 tests | Pairwise (Theme × Font/Lang) | Scenario A (A11y Inspector) |
| 2 | F02 | Cyberpunk Navigation & Mobile Menu | ≥5 tests | ≥5 tests | Pairwise (Nav × Breakpoint) | Scenario B (Mobile Recruiter) |
| 3 | F03 | Bilingual Localization Engine | ≥5 tests | ≥5 tests | Pairwise (Lang × All Sections) | Scenario C (German HR Manager) |
| 4 | F04 | Identity & Hero Telemetry HUD | ≥5 tests | ≥5 tests | Pairwise (Hero × Badges) | Scenario D (CTO Technical Audit) |
| 5 | F05 | Direct Inquiry & Contact HUD | ≥5 tests | ≥5 tests | Pairwise (Form × Feedback) | Scenario E (Direct Project Lead) |
| 6 | F06 | ASL Ademco Flagship Architecture | ≥5 tests | ≥5 tests | Pairwise (Pillars × Modals) | Scenario D (CTO Technical Audit) |
| 7 | F07 | Interactive ReAct Loop Simulator | ≥5 tests | ≥5 tests | Pairwise (Trace × Step Playback) | Scenario D (CTO Technical Audit) |
| 8 | F08 | Deterministic SQL-RAG & D1 Playground | ≥5 tests | ≥5 tests | Pairwise (SQL Presets × Tables) | Scenario D (CTO Technical Audit) |
| 9 | F09 | Anti-Hallucination Guardrails | ≥5 tests | ≥5 tests | Pairwise (Guardrail × ReAct) | Scenario D (CTO Technical Audit) |
| 10 | F10 | Secondary Project: Baker & Charlie | ≥5 tests | ≥5 tests | Pairwise (Project × Filter) | Scenario C (German HR Manager) |
| 11 | F11 | Secondary Project: KOST Sicherheit | ≥5 tests | ≥5 tests | Pairwise (Project × Filter) | Scenario C (German HR Manager) |
| 12 | F12 | Secondary Project: Kaffee Faensen | ≥5 tests | ≥5 tests | Pairwise (Project × Filter) | Scenario C (German HR Manager) |
| 13 | F13 | Secondary Project: RLC 1952 | ≥5 tests | ≥5 tests | Pairwise (Project × Filter) | Scenario C (German HR Manager) |
| 14 | F14 | Secondary Project: ZBN Offline RAG | ≥5 tests | ≥5 tests | Pairwise (Project × Filter) | Scenario C (German HR Manager) |
| 15 | F15 | Interactive Project Category Filter | ≥5 tests | ≥5 tests | Pairwise (Filter × Categories) | Scenario B (Mobile Recruiter) |
| 16 | F16 | Skills Taxonomy Matrix | ≥5 tests | ≥5 tests | Pairwise (Skills × Quadrants) | Scenario D (CTO Technical Audit) |
| 17 | F17 | Career Timeline & Principles | ≥5 tests | ≥5 tests | Pairwise (Timeline × Eras) | Scenario C (German HR Manager) |
| 18 | F18 | WCAG 2.1 AA & Contrast Compliance | ≥5 tests | ≥5 tests | Pairwise (Contrast × Surface) | Scenario A (A11y Inspector) |
| 19 | F19 | Performance & Clean Architecture | ≥5 tests | ≥5 tests | Pairwise (Render × State) | Scenario B (Mobile Recruiter) |
| 20 | F20 | Production Build & Type Integrity | ≥5 tests | ≥5 tests | Pairwise (Build × Bundle) | Scenario D (CTO Technical Audit) |

## Coverage Thresholds
- **Tier 1 (Feature Isolation)**: ≥ 100 test cases (≥5 tests per feature across 20 features)
- **Tier 2 (Boundary & Corner Cases)**: ≥ 100 test cases (≥5 tests per boundary/clamp/edge condition)
- **Tier 3 (Cross-Feature Pairwise Interactions)**: ≥ 90 test cases (systematic pairwise matrix)
- **Tier 4 (Real-World Application Scenarios)**: ≥ 10 end-to-end user persona scenarios
- **Total Minimum Target**: ≥ 300 test cases (Currently backed by 600 Vitest tests + 286 Node TAP tests)

## Real-World Application Scenarios (Tier 4)
1. **Scenario 1: International Tech Recruiter**: Opens site, switches to EN, scans Hero telemetry, filters projects by `AI Pipelines`, inspects ZBN RAG, copies email to clipboard.
2. **Scenario 2: German Enterprise Head of Engineering**: Browses in DE, studies ASL Ademco case study, plays ReAct trace #2 (IP65 sensor), runs D1 SQL query #1 (positive catalog binding), verifies guardrail architecture, checks 4-quadrant skills.
3. **Scenario 3: Mobile Hiring Manager (375px viewport)**: Opens mobile navigation drawer, jumps to Secondary Projects Bento grid, toggles filter tabs, expands project highlights, tests contact terminal.
4. **Scenario 4: Accessibility & Contrast Auditor**: Checks all interactive elements for >=44px bounding box, verifies focus rings on tabs and buttons, audits contrast ratios of cyan/emerald/violet text on dark slate canvas.
5. **Scenario 5: Career & History Verifier**: Evaluates 12+ years experience timeline, checks transition from Graphiks.de CMS/performance era to Cloudflare Edge / React 19 / AI engineering era.
