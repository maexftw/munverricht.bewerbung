---
version: alpha
name: "munverricht.org Operator Portfolio"
description: "A recruiter-facing AI workflow and web delivery portfolio built around one flagship ASL Ademco vertical-agent case. The visual language is precise, technical, evidence-led, and less toy-like than a generic terminal demo."
colors:
  primary: "#05070B"
  secondary: "#8EA0B8"
  tertiary: "#1D4ED8"
  neutral: "#F5F7FB"
  surface: "#0B111B"
  surfaceRaised: "#101827"
  surfaceSubtle: "#172033"
  textPrimary: "#F8FBFF"
  textSecondary: "#C5D1E3"
  textMuted: "#8EA0B8"
  evidence: "#7DD3FC"
  success: "#22C55E"
  warning: "#F59E0B"
  danger: "#EF4444"
typography:
  display:
    fontFamily: "Inter"
    fontSize: 5rem
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "0.03em"
  h1:
    fontFamily: "Inter"
    fontSize: 3.5rem
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  h2:
    fontFamily: "Inter"
    fontSize: 2.25rem
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: "Inter"
    fontSize: 1rem
    fontWeight: 450
    lineHeight: 1.7
    letterSpacing: "0em"
  body-lg:
    fontFamily: "Inter"
    fontSize: 1.15rem
    fontWeight: 450
    lineHeight: 1.75
    letterSpacing: "0em"
  label:
    fontFamily: "IBM Plex Mono"
    fontSize: 0.72rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.22em"
rounded:
  sm: 6px
  md: 12px
  lg: 18px
  xl: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textPrimary}"
    rounded: "{rounded.full}"
    padding: 14px
  case-card:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textPrimary}"
    rounded: "{rounded.xl}"
    padding: 24px
  evidence-chip:
    backgroundColor: "{colors.surfaceSubtle}"
    textColor: "{colors.evidence}"
    rounded: "{rounded.full}"
    padding: 8px
---

## Overview

munverricht.org is a proof-of-work portfolio for AI workflow and web delivery. The page should help a recruiter, founder, or technical lead understand within 10 seconds that Maximilian can turn fuzzy AI/project requirements into scoped, testable, browser-verifiable deliverables.

The new anchor is the ASL Ademco Vertical Agent case. It should not read like another project card. It is the flagship proof: domain understanding, catalog/RAG reasoning, partner-safe chat UX, frontend implementation, Cloudflare-ready delivery, evals, and QA discipline.

The aesthetic target is **operator-grade AI delivery portfolio**:

- technical, but not noisy;
- dark, precise, and high-contrast;
- evidence cards, diagrams, screenshots, and QA gates over decorative terminal noise;
- ASCII/glitch/matrix motifs only as accents;
- mobile-first hierarchy with no overlay blocking the first read;
- personal brand should be munverricht.org, not the old agency-domain naming.

## Colors

- **Primary `#05070B`:** near-black base for the main portfolio route. Use it to create focus and a high-end technical feel.
- **Surface `#0B111B` / Raised `#101827`:** layered panels. These should feel like operational dashboards, not generic SaaS cards.
- **Tertiary `#2F7CFF`:** main action and identity blue. Use for CTAs, active nav, and the `UNVERRICHT` accent.
- **Evidence `#7DD3FC`:** secondary cyan for proof labels, architecture lines, and test/eval chips.
- **Neutral `#F5F7FB`:** reserved for light surfaces, exports, and the separate webdesign landing route if kept. Do not let the light route dictate the main portfolio mood.
- **Success / Warning / Danger:** only for actual state, QA, or caveat labels. Do not decorate with status colors without meaning.

## Typography

Use Inter for readable portfolio and case-study copy. Use IBM Plex Mono or the current mono stack only for short labels, code-like tags, small section markers, and evidence chips.

Rules:

- Large display typography may stay uppercase and bold, but body copy must breathe.
- Do not set long paragraphs in mono.
- Labels can be mono, uppercase, and letter-spaced, but every label must carry useful meaning.
- Prefer fewer words per screen. Recruiters scan first and read second.

## Layout

Homepage order:

1. Hero with claim and two primary recruiter actions: ASL case and resume/contact.
2. Proof strip with capabilities the ASL case actually proves.
3. Featured ASL Ademco case module with Problem → Solution → Result and a small architecture flow.
4. Selected work, with ASL first and normal client/project cards after it.
5. Workflow/skills section framed as delivery process, not just tools.
6. Contact and legal/footer.

Case route order:

1. Case hero with role chips.
2. Ausgangslage / problem.
3. What was built.
4. Architecture/workflow diagram.
5. Evidence panel with tests, builds, QA checks, and caveats.
6. Screens/walkthroughs.
7. What this proves.
8. Recruiter/contact CTA.

Spacing should be generous. Each major section needs a clear job. If two sections both say “I use AI tools,” merge them.

## Elevation & Depth

Use restrained depth:

- Panels: 1px blue/slate border, subtle shadow, slight inner highlight.
- Hero: background code/ambient effects can exist, but must not reduce legibility.
- Featured case: more depth than normal project cards, because it is the page’s anchor.
- Avoid stacked translucent panels that make mobile text harder to read.

## Shapes

- Main panels: 18–24px radius.
- Pills/chips/buttons: full radius.
- Architecture modules: 12–18px radius.
- Avoid overly bubbly SaaS shapes. The site should feel precise and operational.

## Components

### Hero

The hero should answer:

1. Who is this?
2. What does he do now?
3. What proof should I click first?

Keep the name large. Reduce non-essential widgets above the fold. Terminal-style status panels should move below the first decision point or become smaller supporting evidence.

### ASL Featured Case Card

Required content:

- title: ASL Ademco Vertical Agent;
- one-sentence value proposition;
- Problem → Solution → Result;
- proof chips such as `Partner Mode`, `RAG/Evals`, `Cloudflare`, `Responsive QA`;
- CTA to the case route.

Do not label any test/build as currently green unless it has been rerun in the current workspace.

### Evidence Panel

Evidence chips must distinguish:

- `Verified in this pass`;
- `Existing evidence`;
- `Needs rerun`;
- `Not public`.

This keeps the portfolio honest and avoids fake confidence.

### Project Cards

Keep the existing Problem → Solution → Result pattern. It is recruiter-friendly. Promote ASL to a featured layout; do not bury it inside the normal grid.

### Navigation

Brand should read `munverricht.org`. Avoid legacy agency-domain wording as the main portfolio brand. If older business context remains relevant, place it in explanatory copy or legal context, not as the logo.

## Do's and Don'ts

Do:

- Lead with the ASL case as proof of delivery.
- Keep screenshots, architecture, and QA gates visible.
- Write claims in plain language first, technical terms second.
- Preserve German/English language handling through the existing `de | en` pattern.
- Keep `/webdesign` as a separate sales route for now, but stop making it the main brand anchor.
- Verify build, browser, mobile, console, and links before calling any slice done.

Don't:

- Do not redesign `/webdesign` in this pass unless required to remove legacy-brand references from global/shared elements.
- Do not change Cloudflare config or perform Cloudflare delete actions.
- Do not invent ASL metrics, customers, SKUs, or current green test status.
- Do not turn the homepage into a terminal toy with too many overlays.
- Do not make broad dependency/security fixes inside the redesign slice unless a vulnerability blocks the build or preview.
