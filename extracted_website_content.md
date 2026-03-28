# Maximilian Unverricht - Website Content Extraction

## Index.html Content

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maximilian Unverricht | Frontend Developer & Web Delivery</title>
    <meta name="description"
        content="Frontend Developer for websites, prototypes, and web delivery workflows | React, TypeScript, Vite, Cloudflare - Portfolio von Maximilian Unverricht">
    <meta property="og:image" content="maximilian-unverricht.pages.dev_.png">
    <!-- v3.0.5-CACHE-BUST -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet">
    <style>
        :root {
            color-scheme: dark;
            --bg-color: #05070d;
            --surface-1: rgba(10, 14, 24, 0.88);
            --surface-2: rgba(14, 19, 31, 0.82);
            --surface-3: rgba(18, 24, 38, 0.74);
            --surface-solid: #101624;
            --nav-bg: rgba(5, 7, 13, 0.8);
            --overlay-page: rgba(5, 7, 13, 0.98);
            --text-color: #edf2ff;
            --text-primary: #edf2ff;
            --text-secondary: #c8d3eb;
            --text-muted: #8e9ab2;
            --text-subtle: #67748e;
            --border-subtle: rgba(149, 165, 195, 0.18);
            --border-strong: rgba(149, 165, 195, 0.28);
            --accent-color: #60a5fa;
            --accent-soft: #93c5fd;
            --accent-strong: #bfdbfe;
            --accent-contrast: #f8fbff;
            --accent-border: rgba(96, 165, 250, 0.34);
            --accent-border-strong: rgba(96, 165, 250, 0.58);
            --accent-fill: rgba(37, 99, 235, 0.82);
            --accent-fill-strong: rgba(59, 130, 246, 0.92);
            --shadow-soft: 0 14px 34px rgba(4, 8, 18, 0.16);
            --shadow-glow-soft: 0 0 18px rgba(59, 130, 246, 0.1);
            --focus-ring: rgba(96, 165, 250, 0.5);
            --focus-ring-strong: rgba(147, 197, 253, 0.92);
            --scrollbar-track: #05070d;
            --scrollbar-thumb: #1a2334;
            --scrollbar-thumb-hover: #3b82f6;
            --scanline-color: rgba(59, 130, 246, 0.01);
            --scanline-opacity: 0.018;
            --crt-scanline-strong: rgba(0, 0, 0, 0.05);
            --crt-rgb-a: rgba(59, 130, 246, 0.005);
            --crt-rgb-b: rgba(37, 99, 235, 0.003);
            --crt-opacity: 0.11;
            --ambient-canvas-opacity: 0.24;
            --selection-bg: rgba(59, 130, 246, 0.3);
            --selection-text: #dbeafe;
        }

        :root[data-theme='light'] {
            color-scheme: light;
            --bg-color: #eef3fb;
            --surface-1: rgba(255, 255, 255, 0.9);
            --surface-2: rgba(247, 250, 255, 0.92);
            --surface-3: rgba(237, 243, 251, 0.96);
            --surface-solid: #ffffff;
            --nav-bg: rgba(238, 243, 251, 0.82);
            --overlay-page: rgba(238, 243, 251, 0.98);
            --text-color: #0f172a;
            --text-primary: #0f172a;
            --text-secondary: #334155;
            --text-muted: #52627a;
            --text-subtle: #748399;
            --border-subtle: rgba(71, 85, 105, 0.14);
            --border-strong: rgba(71, 85, 105, 0.24);
            --accent-color: #2563eb;
            --accent-soft: #1d4ed8;
            --accent-strong: #1e40af;
            --accent-contrast: #ffffff;
            --accent-border: rgba(37, 99, 235, 0.24);
            --accent-border-strong: rgba(37, 99, 235, 0.4);
            --accent-fill: rgba(37, 99, 235, 0.92);
            --accent-fill-strong: rgba(29, 78, 216, 0.96);
            --shadow-soft: 0 14px 34px rgba(15, 23, 42, 0.06);
            --shadow-glow-soft: 0 0 16px rgba(37, 99, 235, 0.06);
            --focus-ring: rgba(37, 99, 235, 0.35);
            --focus-ring-strong: rgba(37, 99, 235, 0.78);
            --scrollbar-track: #dfe8f5;
            --scrollbar-thumb: #b8c4d9;
            --scrollbar-thumb-hover: #2563eb;
            --scanline-color: rgba(37, 99, 235, 0.008);
            --scanline-opacity: 0.012;
            --crt-scanline-strong: rgba(148, 163, 184, 0.025);
            --crt-rgb-a: rgba(37, 99, 235, 0.004);
            --crt-rgb-b: rgba(59, 130, 246, 0.002);
            --crt-opacity: 0.06;
            --ambient-canvas-opacity: 0.16;
            --selection-bg: rgba(37, 99, 235, 0.18);
            --selection-text: #172554;
        }

        ::selection {
            background: var(--selection-bg);
            color: var(--selection-text);
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            margin: 0;
            overflow-wrap: anywhere;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
        }

        html {
            scroll-behavior: smooth;
        }

        .mono {
            font-family: 'JetBrains Mono', monospace;
        }

        ::-webkit-scrollbar {
            width: 4px;
        }

        ::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
        }

        .scanline {
            width: 100%;
            height: 100px;
            z-index: 50;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, var(--scanline-color) 50%, rgba(0, 0, 0, 0) 100%);
            opacity: var(--scanline-opacity);
            position: fixed;
            pointer-events: none;
            animation: scanline 22s linear infinite;
        }

        @keyframes scanline {
            0% {
                top: -100px;
            }

            100% {
                top: 100%;
            }
        }

        @keyframes firecrawl-pill {
            0%,
            100% {
                transform: translate3d(0, 0, 0);
                opacity: 0.56;
            }

            50% {
                transform: translate3d(0, -10px, 0);
                opacity: 0.88;
            }
        }

        .crt-overlay {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, var(--crt-scanline-strong) 50%), linear-gradient(90deg, var(--crt-rgb-a), var(--crt-rgb-b), var(--crt-rgb-a));
            z-index: 100;
            background-size: 100% 3px, 4px 100%;
            pointer-events: none;
            opacity: var(--crt-opacity);
        }

        #background-canvas-container,
        #code-ambient-canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            pointer-events: none;
        }

        #background-canvas-container canvas,
        #code-ambient-canvas-container canvas {
            display: block;
            width: 100% !important;
            height: 100% !important;
            opacity: var(--ambient-canvas-opacity);
            filter: none;
            contain: strict;
        }

        /* Ensure main content is above canvas */
        #root {
            position: relative;
            z-index: 10;
        }

        *:focus-visible {
            outline: 2px solid var(--focus-ring-strong);
            outline-offset: 3px;
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--bg-color) 70%, transparent), 0 0 18px var(--focus-ring);
        }

        .boot-shell {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at top, color-mix(in srgb, var(--accent-color) 8%, transparent) 0%, transparent 45%), var(--bg-color);
            color: var(--text-primary);
            font-family: 'Inter', sans-serif;
            text-align: center;
            padding: 20px;
        }

        .boot-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            letter-spacing: -0.05em;
            line-height: 0.95;
            text-wrap: balance;
        }

        .boot-subtitle {
            font-size: 1.1rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-family: 'JetBrains Mono', monospace;
            max-width: 34rem;
            text-wrap: balance;
        }

        .boot-links {
            display: flex;
            gap: 20px;
            margin-bottom: 3rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .boot-link {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 500;
            overflow-wrap: anywhere;
            transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease;
        }

        .boot-link:hover {
            color: var(--accent-strong);
        }

        .boot-link:focus-visible {
            border-radius: 999px;
        }

        .boot-diagnostic {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: var(--text-subtle);
            margin-top: 2rem;
        }

        .boot-error {
            color: #ef4444;
            margin-top: 20px;
            font-size: 12px;
            display: none;
            background: var(--surface-2);
            padding: 10px;
            border: 1px solid var(--border-subtle);
            text-align: left;
            overflow-x: auto;
            max-width: 800px;
        }

        @media (max-width: 639px) {
            .boot-shell {
                padding: 20px 12px;
            }

            .boot-title {
                font-size: 1.75rem;
            }

            .boot-subtitle {
                font-size: 0.875rem;
                margin-bottom: 1.25rem;
            }

            .boot-links {
                gap: 10px;
                margin-bottom: 1.75rem;
            }

            .boot-link {
                padding: 0.3rem 0.5rem;
                font-size: 0.875rem;
                border: 1px solid var(--border-subtle);
                border-radius: 999px;
                background: var(--surface-2);
            }

            .boot-diagnostic {
                margin-top: 1.25rem;
                font-size: 10px;
            }

            .noscript-shell {
                padding: 20px 12px;
            }
        }

        @media (max-width: 767px) {
            .boot-shell {
                padding: 24px 16px;
            }

            .boot-title {
                font-size: 2rem;
            }

            .boot-subtitle {
                font-size: 0.95rem;
                margin-bottom: 1.5rem;
            }

            .boot-links {
                gap: 12px;
                margin-bottom: 2rem;
            }

            .boot-link {
                padding: 0.35rem 0.6rem;
                border: 1px solid var(--border-subtle);
                border-radius: 999px;
                background: var(--surface-2);
            }

            .boot-diagnostic {
                margin-top: 1.5rem;
                font-size: 11px;
            }

            .noscript-shell {
                padding: 24px 16px;
            }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
            .boot-shell {
                padding: 32px 20px;
            }

            .boot-title {
                font-size: 2.25rem;
            }

            .boot-subtitle {
                font-size: 1rem;
                margin-bottom: 2rem;
            }

            .boot-links {
                gap: 16px;
                margin-bottom: 2.5rem;
            }

            .boot-link {
                padding: 0.4rem 0.7rem;
                font-size: 0.9375rem;
            }

            .boot-diagnostic {
                margin-top: 2rem;
                font-size: 11px;
            }

            .noscript-shell {
                padding: 32px 20px;
            }
        }

        @media (min-width: 1024px) {
            .boot-shell {
                padding: 40px 32px;
            }

            .boot-title {
                font-size: 2.75rem;
            }

            .boot-subtitle {
                font-size: 1.125rem;
                margin-bottom: 2.5rem;
            }

            .boot-links {
                gap: 24px;
                margin-bottom: 3rem;
            }

            .boot-link {
                padding: 0.5rem 0.85rem;
                font-size: 1rem;
            }

            .boot-diagnostic {
                margin-top: 2.5rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 40px 32px;
            }
        }

        @media (min-width: 1280px) {
            .boot-shell {
                padding: 48px 48px;
            }

            .boot-title {
                font-size: 3rem;
            }

            .boot-subtitle {
                font-size: 1.25rem;
                margin-bottom: 3rem;
            }

            .boot-links {
                gap: 32px;
                margin-bottom: 3.5rem;
            }

            .boot-link {
                padding: 0.6rem 1rem;
                font-size: 1.0625rem;
            }

            .boot-diagnostic {
                margin-top: 3rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 48px 48px;
            }
        }

        @media (min-width: 1536px) {
            .boot-shell {
                padding: 56px 64px;
            }

            .boot-title {
                font-size: 3.5rem;
            }

            .boot-subtitle {
                font-size: 1.375rem;
                margin-bottom: 4rem;
            }

            .boot-links {
                gap: 40px;
                margin-bottom: 4rem;
            }

            .boot-link {
                padding: 0.7rem 1.25rem;
                font-size: 1.125rem;
            }

            .boot-diagnostic {
                margin-top: 3.5rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 56px 64px;
            }
        }

        @media (min-width: 1920px) {
            .boot-shell {
                padding: 64px 80px;
            }

            .boot-title {
                font-size: 4rem;
            }

            .boot-subtitle {
                font-size: 1.5rem;
                margin-bottom: 5rem;
            }

            .boot-links {
                gap: 48px;
                margin-bottom: 5rem;
            }

            .boot-link {
                padding: 0.8rem 1.5rem;
                font-size: 1.25rem;
            }

            .boot-diagnostic {
                margin-top: 4rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 64px 80px;
            }
        }

        @media (min-width: 2560px) {
            .boot-shell {
                padding: 80px 96px;
            }

            .boot-title {
                font-size: 5rem;
            }

            .boot-subtitle {
                font-size: 1.75rem;
                margin-bottom: 6rem;
            }

            .boot-links {
                gap: 64px;
                margin-bottom: 6rem;
            }

            .boot-link {
                padding: 1rem 2rem;
                font-size: 1.5rem;
            }

            .boot-diagnostic {
                margin-top: 5rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 80px 96px;
            }
        }

        @media (max-width: 767px) {
            .noscript-shell {
                padding: 24px 16px;
            }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
            .noscript-shell {
                padding: 32px 20px;
            }
        }

        @media (min-width: 1024px) {
            .noscript-shell {
                padding: 40px 32px;
            }
        }

        @media (min-width: 1280px) {
            .noscript-shell {
                padding: 48px 48px;
            }
        }

        @media (min-width: 1536px) {
            .noscript-shell {
                padding: 56px 64px;
            }
        }

        @media (min-width: 1920px) {
            .noscript-shell {
                padding: 64px 80px;
            }
        }

        @media (min-width: 2560px) {
            .noscript-shell {
                padding: 80px 96px;
            }
        }

        .noscript-shell {
            padding: 40px;
            text-align: center;
            color: var(--text-primary);
            background-color: var(--bg-color);
            min-height: 100vh;
        }

        @media (prefers-reduced-motion: reduce) {
            .scanline {
                animation: none;
                opacity: calc(var(--scanline-opacity) * 0.4);
            }

            .crt-overlay {
                opacity: calc(var(--crt-opacity) * 0.55);
            }

            #background-canvas-container canvas,
            #code-ambient-canvas-container canvas {
                opacity: calc(var(--ambient-canvas-opacity) * 0.7);
            }

            html:focus-within {
                scroll-behavior: auto;
            }
        }

        @media (max-width: 639px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 1.75rem;
            }

            h2 {
                font-size: 1.5rem;
            }

            h3 {
                font-size: 1.25rem;
            }

            p {
                font-size: 1rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }

            .boot-link {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }
        }

        @media (max-width: 767px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 2rem;
            }

            h2 {
                font-size: 1.75rem;
            }

            h3 {
                font-size: 1.375rem;
            }

            p {
                font-size: 1rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }

            .boot-link {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 2.25rem;
            }

            h2 {
                font-size: 2rem;
            }

            h3 {
                font-size: 1.625rem;
            }

            p {
                font-size: 1.0625rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }
        }

        @media (min-width: 1024px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 2.75rem;
            }

            h2 {
                font-size: 2.25rem;
            }

            h3 {
                font-size: 1.875rem;
            }

            p {
                font-size: 1.125rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }
        }

        @media (min-width: 1280px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 3rem;
            }

            h2 {
                font-size: 2.5rem;
            }

            h3 {
                font-size: 2rem;
            }

            p {
                font-size: 1.25rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }
        }

        @media (min-width: 1536px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 3.5rem;
            }

            h2 {
                font-size: 3rem;
            }

            h3 {
                font-size: 2.25rem;
            }

            p {
                font-size: 1.375rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }
        }

        @media (min-width: 1920px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 4rem;
            }

            h2 {
                font-size: 3.5rem;
            }

            h3 {
                font-size: 2.5rem;
            }

            p {
                font-size: 1.5rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }
        }

        @media (min-width: 2560px) {
            body {
                font-size: 16px;
                line-height: 1.6;
            }

            h1 {
                font-size: 5rem;
            }

            h2 {
                font-size: 4.5rem;
            }

            h3 {
                font-size: 3rem;
            }

            p {
                font-size: 1.75rem;
            }

            a {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            button {
                min-height: 44px;
                min-width: 44px;
                padding: 0.75rem 1rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                min-height: 44px;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }
        }

        @media (max-width: 639px) {
            .boot-shell {
                padding: 20px 12px;
            }

            .boot-title {
                font-size: 1.75rem;
            }

            .boot-subtitle {
                font-size: 0.875rem;
                margin-bottom: 1.25rem;
            }

            .boot-links {
                gap: 10px;
                margin-bottom: 1.75rem;
            }

            .boot-link {
                padding: 0.3rem 0.5rem;
                font-size: 0.875rem;
                border: 1px solid var(--border-subtle);
                border-radius: 999px;
                background: var(--surface-2);
            }

            .boot-diagnostic {
                margin-top: 1.25rem;
                font-size: 10px;
            }

            .noscript-shell {
                padding: 20px 12px;
            }
        }

        @media (max-width: 767px) {
            .boot-shell {
                padding: 24px 16px;
            }

            .boot-title {
                font-size: 2rem;
            }

            .boot-subtitle {
                font-size: 0.95rem;
                margin-bottom: 1.5rem;
            }

            .boot-links {
                gap: 12px;
                margin-bottom: 2rem;
            }

            .boot-link {
                padding: 0.35rem 0.6rem;
                border: 1px solid var(--border-subtle);
                border-radius: 999px;
                background: var(--surface-2);
            }

            .boot-diagnostic {
                margin-top: 1.5rem;
                font-size: 11px;
            }

            .noscript-shell {
                padding: 24px 16px;
            }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
            .boot-shell {
                padding: 32px 20px;
            }

            .boot-title {
                font-size: 2.25rem;
            }

            .boot-subtitle {
                font-size: 1rem;
                margin-bottom: 2rem;
            }

            .boot-links {
                gap: 16px;
                margin-bottom: 2.5rem;
            }

            .boot-link {
                padding: 0.4rem 0.7rem;
                font-size: 0.9375rem;
            }

            .boot-diagnostic {
                margin-top: 2rem;
                font-size: 11px;
            }

            .noscript-shell {
                padding: 32px 20px;
            }
        }

        @media (min-width: 1024px) {
            .boot-shell {
                padding: 40px 32px;
            }

            .boot-title {
                font-size: 2.75rem;
            }

            .boot-subtitle {
                font-size: 1.125rem;
                margin-bottom: 2.5rem;
            }

            .boot-links {
                gap: 24px;
                margin-bottom: 3rem;
            }

            .boot-link {
                padding: 0.5rem 0.85rem;
                font-size: 1rem;
            }

            .boot-diagnostic {
                margin-top: 2.5rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 40px 32px;
            }
        }

        @media (min-width: 1280px) {
            .boot-shell {
                padding: 48px 48px;
            }

            .boot-title {
                font-size: 3rem;
            }

            .boot-subtitle {
                font-size: 1.25rem;
                margin-bottom: 3rem;
            }

            .boot-links {
                gap: 32px;
                margin-bottom: 3.5rem;
            }

            .boot-link {
                padding: 0.6rem 1rem;
                font-size: 1.0625rem;
            }

            .boot-diagnostic {
                margin-top: 3rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 48px 48px;
            }
        }

        @media (min-width: 1536px) {
            .boot-shell {
                padding: 56px 64px;
            }

            .boot-title {
                font-size: 3.5rem;
            }

            .boot-subtitle {
                font-size: 1.375rem;
                margin-bottom: 4rem;
            }

            .boot-links {
                gap: 40px;
                margin-bottom: 4rem;
            }

            .boot-link {
                padding: 0.7rem 1.25rem;
                font-size: 1.125rem;
            }

            .boot-diagnostic {
                margin-top: 3.5rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 56px 64px;
            }
        }

        @media (min-width: 1920px) {
            .boot-shell {
                padding: 64px 80px;
            }

            .boot-title {
                font-size: 4rem;
            }

            .boot-subtitle {
                font-size: 1.5rem;
                margin-bottom: 5rem;
            }

            .boot-links {
                gap: 48px;
                margin-bottom: 5rem;
            }

            .boot-link {
                padding: 0.8rem 1.5rem;
                font-size: 1.25rem;
            }

            .boot-diagnostic {
                margin-top: 4rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 64px 80px;
            }
        }

        @media (min-width: 2560px) {
            .boot-shell {
                padding: 80px 96px;
            }

            .boot-title {
                font-size: 5rem;
            }

            .boot-subtitle {
                font-size: 1.75rem;
                margin-bottom: 6rem;
            }

            .boot-links {
                gap: 64px;
                margin-bottom: 6rem;
            }

            .boot-link {
                padding: 1rem 2rem;
                font-size: 1.5rem;
            }

            .boot-diagnostic {
                margin-top: 5rem;
                font-size: 12px;
            }

            .noscript-shell {
                padding: 80px 96px;
            }
        }
    </style>
    <script>
        (function () {
            try {
                var savedTheme = localStorage.getItem('theme');
                var theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } catch (error) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.classList.add('dark');
            }
        })();
    </script>
</head>

<body>
    <div id="root">
        <div id="initial-loader" class="boot-shell">
            <h1 class="boot-title">Maximilian
                Unverricht</h1>
            <p class="boot-subtitle">
                Frontend Developer & Web Delivery</p>

            <div class="boot-links">
                <a href="mailto:info@graphiks.de" class="boot-link">Kontakt</a>
                <a href="https://github.com/maexftw" target="_blank" rel="noopener noreferrer" class="boot-link">GitHub</a>
                <a href="Maximilian_Unverricht_Resume.html" class="boot-link">Lebenslauf</a>
            </div>

            <div id="boot-diagnostic" class="boot-diagnostic">[SEITE_WIRD_GELADEN]</div>
            <div id="error-display" class="boot-error"></div>
        </div>
    </div>
    <noscript>
        <div class="noscript-shell">
            <h1>Maximilian Unverricht</h1>
            <p>Frontend Developer & Web Delivery</p>
            <p>
                <a href="mailto:info@graphiks.de" class="boot-link">info@graphiks.de</a> |
                <a href="https://github.com/maexftw" class="boot-link">GitHub</a>
            </p>
            <p>Please enable JavaScript to view the full site.</p>
        </div>
    </noscript>
    <script>
        (function () {
            var diag = document.getElementById('boot-diagnostic');
            var errDisplay = document.getElementById('error-display');

            window.onerror = function (msg, url, line, col, error) {
                if (diag) diag.innerText = '[FEHLER_BEIM_LADEN]';
                if (errDisplay) {
                    errDisplay.style.display = 'block';
                    errDisplay.innerText = "Ein Laufzeitfehler ist aufgetreten. Bitte lade die Seite neu.";
                }
                return false;
            };

            window.addEventListener('unhandledrejection', function (event) {
                if (diag) diag.innerText = '[FEHLER_BEIM_LADEN]';
                if (errDisplay) {
                    errDisplay.style.display = 'block';
                    errDisplay.innerText = "Ein Laufzeitfehler ist aufgetreten. Bitte lade die Seite neu.";
                }
            });

            setTimeout(function () {
                var loader = document.getElementById('initial-loader');
                if (loader && diag && diag.innerText === '[SEITE_WIRD_GELADEN]') {
                    // Only show stalled message if we are still strictly in the initial state
                    diag.innerText = '[LADEN_DAUERT_LAENGER]';
                }
            }, 8000);
        })();
    </script>
    <script type="module" src="/index.tsx"></script>
</body>

</html>

## First Debit Anschreiben

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
    <title>Anschreiben – First Debit | Maximilian Unverricht</title>
    <style>
        :root {
            --page-bg: #eceff3;
            --paper: #ffffff;
            --text: #111111;
            --muted: #444444;
            --line: #d7dce3;
            --accent: #1f3a66;
        }

        * {
            box-sizing: border-box;
        }

        html {
            font-size: 16px;
        }

        body {
            margin: 0;
            font-family: Inter, "Segoe UI", Arial, Helvetica, sans-serif;
            color: var(--text);
            background: var(--page-bg);
            line-height: 1.55;
            padding: 24px;
        }

        .letter {
            width: min(210mm, 100%);
            margin: 0 auto;
            background: var(--paper);
            border: 1px solid var(--line);
            box-shadow: 0 16px 38px rgba(10, 16, 28, 0.14);
            padding: 18mm 16mm;
        }

        .eyebrow {
            margin: 0 0 12px;
            font-size: 0.76rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--accent);
        }

        .header {
            margin-bottom: 14px;
            border-bottom: 1px solid var(--line);
            padding-bottom: 12px;
        }

        h1 {
            margin: 0;
            font-size: 1.85rem;
            line-height: 1.08;
            letter-spacing: -0.02em;
            color: #000;
        }

        .subtitle {
            margin: 8px 0 0;
            font-size: 1rem;
            font-weight: 600;
            color: var(--accent);
        }

        .contact-list {
            margin: 12px 0 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 4px;
            font-size: 0.94rem;
            color: var(--muted);
        }

        .contact-list a {
            color: #000;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 2px;
            word-break: break-word;
        }

        .meta {
            display: grid;
            gap: 6px;
            margin: 18px 0;
            padding: 12px 14px;
            border: 1px solid var(--line);
            background: #f8fafc;
        }

        .meta strong {
            color: #000;
        }

        p {
            margin: 0 0 12px;
            font-size: 0.98rem;
        }

        ul {
            margin: 0 0 14px;
            padding-left: 18px;
        }

        li {
            margin-bottom: 6px;
        }

        .signature {
            margin-top: 18px;
        }

        .footer-note {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid var(--line);
            font-size: 0.9rem;
            color: var(--muted);
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }

            .letter {
                width: 100%;
                padding: 14px;
            }

            h1 {
                font-size: 1.6rem;
            }
        }

        @page {
            size: A4;
            margin: 12mm;
        }

        @media print {
            :root {
                --paper: #ffffff;
                --text: #000000;
                --muted: #222222;
                --line: #bfc6d0;
                --accent: #000000;
            }

            * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            html,
            body {
                background: #fff !important;
                color: #000 !important;
                padding: 0;
                margin: 0;
                font-size: 10.8pt;
                line-height: 1.42;
            }

            .letter {
                width: auto;
                margin: 0;
                padding: 0;
                border: none;
                box-shadow: none;
                background: #fff;
            }
        }
    </style>
</head>

<body>
    <article class="letter">
        <p class="eyebrow">Initiativbewerbung · AI Automation & Web Umsetzung</p>

        <header class="header">
            <h1>Maximilian Unverricht</h1>
            <p class="subtitle">Anschreiben für First Debit</p>
            <ul class="contact-list">
                <li><strong>E-Mail:</strong> <a href="mailto:info@graphiks.de">info@graphiks.de</a> · <strong>Telefon:</strong> <a href="tel:+491633229892">+49 163 3229892</a></li>
                <li><strong>Portfolio:</strong> <a href="https://munverricht.org" target="_blank" rel="noopener noreferrer">https://munverricht.org</a></li>
            </ul>
        </header>

        <section class="meta" aria-label="Einordnung">
            <div><strong>Ziel:</strong> Praktische KI-Umsetzung für datensensible interne Arbeitsprozesse</div>
            <div><strong>Schwerpunkt:</strong> Lokale LLMs, AI-Workflows, Web-Prototyping, Delivery</div>
            <div><strong>Relevante Phase:</strong> AI-Fokus seit 10/2025, Selbstständigkeitsfundament seit 2013</div>
        </section>

        <p>Sehr geehrtes First-Debit-Team,</p>

        <p>ich bewerbe mich initiativ bei Ihnen, weil ich genau an der Schnittstelle arbeite, die für ein datensensibles Unternehmen wie First Debit relevant sein kann: praktische KI-Anwendung, lokale LLM-Workflows, strukturierte Automation und schnelle Web-Umsetzung.</p>

        <p>Mein Werdegang ist nicht der klassische Lebenslauf mit Ausbildung, Studium und vorgezeichneter KI-Karriere. Dafür bringe ich etwas anderes mit: langjährige Selbstständigkeit seit 2013, echte Delivery-Erfahrung im Live-Betrieb und seit 10/2025 einen klaren Fokus darauf, wie sich AI-gestützte Arbeitsweisen in reale, kontrollierbare Prozesse übersetzen lassen.</p>

        <p>Was ich bei Ihnen einbringen kann, ist nicht nur allgemeines Interesse an KI, sondern eine sehr praktische Perspektive:</p>

        <ul>
            <li>lokale LLM- und RAG-nahe Denkweisen für sensible Kontexte</li>
            <li>nachvollziehbare AI-Workflows statt bloßer Tool-Demos</li>
            <li>schnelle Oberflächen und Prototypen für interne Nutzung</li>
            <li>Web-Umsetzung, die Ideen direkt sichtbar und testbar macht</li>
        </ul>

        <p>Ich kann dabei besonders an den Punkten sinnvoll sein, an denen Technologie nicht als Selbstzweck eingeführt werden soll, sondern konkrete Arbeit erleichtern muss – etwa bei Wissenssystemen, Dokumentenunterstützung, internen Prüf- und Recherche-Workflows oder prototypischen Oberflächen für operative Teams.</p>

        <p>Die letzten Monate habe ich bewusst genutzt, um meinen klassischen Web-Hintergrund mit AI-gestützter Umsetzung zu verbinden. Daraus sind nicht nur neue Ideen entstanden, sondern reale, vorzeigbare Artefakte: ein recruiter-taugliches Portfolio, dokumentierte AI-Use-Cases, lokale Workflow-Experimente mit praktischem Mehrwert und belastbare Delivery-Strecken bis zum Live-Deployment.</p>

        <p>Meine frühere Selbstständigkeit mit WordPress, Webflow, Performance-Marketing und Kundenprojekten ist dabei kein Nebenthema, sondern das Fundament: Ich bin gewohnt, eigenverantwortlich zu arbeiten, Anforderungen pragmatisch zu übersetzen und Ergebnisse so zu bauen, dass sie außerhalb eines Demo-Kontexts funktionieren.</p>

        <p>Ergänzend zu dieser Bewerbung habe ich eine eigene Bewerbungsseite für First Debit vorbereitet, auf der Sie Lebenslauf, Projektbelege und meine thematische Ausrichtung kompakt sehen können.</p>

        <p class="signature">Mit freundlichen Grüßen<br />Maximilian Unverricht</p>

        <p class="footer-note">Dieses Anschreiben ist als sauber formatiertes HTML-Artefakt für Direktversand, Browser-Ansicht und PDF-Druck vorbereitet.</p>
    </article>
</body>

</html>

## First Debit Bewerbung Plan

# First Debit – Bewerbungsplan

## Zielbild

Es entsteht ein kompaktes, zusammenhängendes Bewerbungspaket für eine **Initiativbewerbung** bei First Debit mit Fokus auf **AI, Automation und Web-Umsetzung**.

Das Paket besteht aus vier Bausteinen:

1. [`Anschreiben`](plans/First-Debit-Bewerbung-Plan.md)
2. [`Lebenslauf`](plans/First-Debit-Bewerbung-Plan.md)
3. [`Projekt-Demo`](plans/First-Debit-Bewerbung-Plan.md)
4. [`Bewerbungs-Unterseite`](plans/First-Debit-Bewerbung-Plan.md)

Wichtigste strategische Vorgabe:

- Kein generischer Standard-Lebenslauf
- Kein Fokus auf irrelevante frühe Stationen
- Stattdessen: **starker Beleg der letzten 6 Monate** plus belastbare Grundlage aus der Selbstständigkeit seit 2013
- Keine erfundene Spezialisierung, sondern saubere Darstellung dessen, was real vorhanden ist: **lokale LLMs, AI-Workflows, RAG-nahe Denkweise, Web-Delivery, iterative Umsetzung**

---

## Positionierung

### Kernbotschaft

Maximilian Unverricht verbindet langjährige praktische Web-Delivery mit einem neuen, real angewendeten AI-Arbeitsmodell.

Für First Debit ist die relevante Aussage nicht ein klassischer CV mit vielen Altstationen, sondern:

- jemand, der **AI nicht nur versteht, sondern in reale Arbeitsabläufe übersetzt**
- jemand, der **lokale Modelle, Datensensibilität und pragmatische Automation** zusammendenken kann
- jemand, der **Web-Prototypen, Oberflächen, interne Tools und verständliche Demos** schnell umsetzen kann
- jemand, der **ohne Konzern-Vokabular direkt lieferfähig** wirkt

### Empfohlener Zieltitel

Da es keine konkrete Ausschreibung gibt, wird die Bewerbung auf einen anschlussfähigen Zieltitel formuliert:

- **Initiativbewerbung AI Automation & Web Implementation**

Alternative intern für Textvarianten:

- **AI Workflow & Automation Specialist**
- **AI Prototyping & Web Delivery**
- **Praktische KI-Umsetzung für interne Tools und Workflows**

---

## Bewerbungsarchitektur

```mermaid
flowchart TD
    A[First Debit Bedarf] --> B[Initiativbewerbung]
    B --> C[Anschreiben]
    B --> D[Lebenslauf]
    B --> E[Projekt Demo]
    B --> F[Bewerbungs Unterseite]
    C --> G[Warum ich]
    D --> H[Belegbare Stationen]
    E --> I[ZBN Pipeline und AI Workflows]
    F --> J[Recruiter Scan mit Kontakt und Nachweisen]
```

---

## Baustein 1 – Anschreiben

### Zweck

Das Anschreiben verkauft **nicht** einen klassischen Karriereweg, sondern die Passung für ein Unternehmen, das KI praktisch einsetzen will.

### Zielstruktur

1. **Direkter Einstieg**
   - Initiativbewerbung
   - Bezug auf First Debit als Inkasso-Unternehmen mit möglichem Bedarf an AI-gestützten Prozessen

2. **Warum passend**
   - Schnittstelle aus AI-Verständnis, lokalen LLMs, Workflow-Denken und Web-Umsetzung
   - Fähigkeit, Ideen nicht nur zu diskutieren, sondern sichtbar zu bauen

3. **Was konkret eingebracht werden kann**
   - interne Recherche- und Wissenssysteme
   - Dokumenten- und Prozessunterstützung
   - prototypische Oberflächen für Mitarbeiter-Workflows
   - nachvollziehbare Demo-Strecken statt theoretischer KI-Slides

4. **Warum der ungewöhnliche CV trotzdem passt**
   - Selbstständigkeit als Beleg für Eigenverantwortung, Umsetzungskraft und direkte Ergebnisorientierung
   - letztes halbes Jahr als eigentliche Relevanzzone für dieses Thema

5. **Call to action**
   - Verweis auf Unterseite und Demo
   - Gesprächsbereitschaft

### Tonalität

- direkt
- ruhig
- nicht anbiedernd
- nicht zu werblich
- fachlich greifbar
- ohne Buzzword-Überladung

---

## Baustein 2 – Lebenslauf

### Leitlinie

Der Lebenslauf wird **bewusst kompakt** gehalten und priorisiert Relevanz vor Vollständigkeitsritual.

### Empfohlene Struktur

1. **Kopfbereich**
   - Name
   - Ort
   - Kontakt
   - Portfolio

2. **Kurzprofil**
   - 3 bis 5 Zeilen
   - Fokus auf AI-Workflows, lokale LLMs, Web-Umsetzung, Selbstständigkeit als Delivery-Fundament

3. **Relevanteste Praxis**
   - **AI Workflow & Web Specialist** seit ca. 10/2025
   - Schwerpunkt auf letzte 6 Monate
   - keine falsche Datierung auf 2024

4. **Selbstständigkeit Graphiks.de**
   - 02/2013 bis 10/2025 als Hauptblock
   - Webdesign, WordPress, Webflow, Performance-Marketing, Conversion, Kundenbetrieb

5. **Zertifikate / Nachweise**
   - Google Ads
   - Google Analytics

6. **Bildung**
   - ehrlich und kurz
   - kein Studium, keine Ausbildung
   - nur vorhandener Schulabschluss, falls belastbar benennbar

7. **Optionaler Hinweis statt ausgeschmückter Alt-Historie**
   - früherer Werdegang auf Anfrage

### Lebenslauf-Prinzipien

- keine künstliche Aufblähung
- keine Rechtfertigungsprosa
- keine Lückenpanik
- Fokus auf **praktische Relevanz**
- letzte 6 Monate sichtbar stärker gewichten als frühe Jahre

---

## Baustein 3 – Projekt-Demo

### Hauptdemo

Die Demo sollte **nicht** wie ein allgemeines Portfolio wirken, sondern wie ein Beleg dafür, wie Maximilian für First Debit denken und bauen würde.

### Empfohlene Demo-Auswahl

#### A. ZBN Pipeline als Hauptbeleg

Darstellen als:

- Problem
- Ansatz
- Daten- und Modelllogik
- Nutzerwert
- Grenzen und Sorgfalt

Geplante Aussage:

- Verständnis für lokale LLM-Nutzung
- strukturierte Verarbeitung von Informationen
- Umgang mit sensiblen Inhalten und Datensouveränität
- Fähigkeit, komplexe AI-Logik in eine verständliche Anwendung zu übersetzen

#### B. Ergänzende Belege

- Portfolio-/Recruiter-Website als Beleg für schnelle Web-Delivery
- bestehende Kundenprojekte als Nachweis für Live-Betrieb und Verlässlichkeit
- AI-Agency-Workflow als Hinweis auf praktische Toolchain-Kompetenz

### Demo-Regel

Für First Debit ist **weniger, aber zielgenauer** besser als viele lose Projekte.

Empfehlung:

- 1 Hauptdemo
- 2 kurze Ergänzungsbelege
- jeweils im Muster **Problem → Lösung → Ergebnis**

---

## Baustein 4 – Bewerbungs-Unterseite

### Ziel

Eine dedizierte Seite für First Debit, damit die Bewerbung im Kopf bleibt und nicht nur wie ein PDF-Anhang wirkt.

### Inhaltsstruktur der Unterseite

1. **Hero**
   - Initiativbewerbung für First Debit
   - klare Ein-Zeilen-Positionierung
   - Direktlinks zu Kontakt, Lebenslauf, Demo

2. **Warum ich für dieses Thema relevant bin**
   - AI-Verständnis
   - lokale LLMs
   - Web-Umsetzung
   - pragmischer Delivery-Stil

3. **Was ich für First Debit konkret bauen könnte**
   - internes Wissenssystem
   - Dokumentenunterstützung
   - Recherche- und Prüf-Workflows
   - Prototypen für Sachbearbeitung oder Operations

4. **Beleg der letzten 6 Monate**
   - kurzer Leistungsblock
   - Tech und Systeme
   - reale Ergebnisse

5. **Projektbeweis**
   - ZBN Pipeline
   - 1 bis 2 weitere Cases

6. **Kurzlebenslauf auf der Seite**
   - reduzierte Timeline
   - Selbstständigkeit seit 2013
   - AI-Fokus seit 10/2025

7. **Kontaktabschluss**
   - Mail
   - Telefon
   - Lebenslauf Download

### UX-Regeln

- scanbar in unter 60 Sekunden
- klare Zwischenüberschriften
- keine Textwand
- kein allgemeines Portfolio-Wording
- sichtbarer Bezug zu First Debit

---

## Inhaltspriorität

### Was betont werden soll

- lokale LLMs und AI-Workflows
- Verständnis für datensensible Kontexte
- pragmatische Prototyping- und Umsetzungsfähigkeit
- Verbindung aus AI-Denken und Web-Delivery
- letztes halbes Jahr als relevante Transformationsphase

### Was nur Nebenrolle spielt

- alte, nicht themenrelevante Lebenslaufstationen
- klassische Designer-Selbstdarstellung
- umfangreiche Schulhistorie
- zu viele Einzelprojekte ohne Bezug zu First Debit

---

## Offene Fakten für die finale Textfassung

Diese Punkte müssen vor dem finalen Schreiben noch bestätigt werden:

1. exakter Start des AI-Fokus seit **10/2025**
2. genaue Formulierung des Schulabschlusses
3. ob **Google Analytics** als Zertifizierung formal belastbar genannt werden soll
4. welche 2 bis 3 Systeme neben der ZBN Pipeline gezeigt werden sollen
5. Ansprechpartner bei First Debit, falls auffindbar

---

## Empfohlene Umsetzung in Code Mode

1. Neue Bewerbungs-Unterseite als eigene Route oder klar abtrennbare Page innerhalb der bestehenden React-Struktur anlegen
2. Inhalte für First Debit separat textlich ausformulieren
3. Lebenslauftext in einer kompakten Fassung aktualisieren
4. Anschreiben als Markdown-Datei in [`plans/`](plans/First-Debit-Bewerbung-Plan.md) oder als exportierbares Textartefakt anlegen
5. Projektbeweise mit ZBN-Fokus in scanbarer Struktur ergänzen
6. Links zwischen Unterseite, Lebenslauf und Kontakt sauber verbinden

---

## Entscheidungsgrundlage

Die Bewerbung sollte **nicht** als klassischer Karriere-Nachweis verkauft werden, sondern als **Beleg praktischer AI-Umsetzungsfähigkeit mit starkem Selbstständigen-Fundament**.

Das ist für eine Initiativbewerbung bei First Debit die glaubwürdigste und strategisch sauberste Linie.

## Lebenslauf Maximilian Unverricht 2026

# Maximilian Unverricht – AI Workflow & Web Delivery (React/WordPress)

**Standort:** Dortmund (DE) · **Arbeitsmodell:** Remote / Hybrid  
**E-Mail:** info@munverricht.org · **Telefon:** +49 163 3229892  
**Portfolio:** https://munverricht.org

---

## Profil

Pragmatischer Web- und Workflow-Spezialist mit **12 Jahren Berufserfahrung** und Fokus auf AI-gestützte Delivery: schnelle Iterationen, saubere Implementierung, zuverlässiges Deployment. Ich kombiniere WordPress-/Webflow-Praxis mit React/TypeScript sowie lokalen RAG-/Inferenz-Workflows (Datensouveränität/Zero-Cloud). Meine Arbeitsweise: **AI-gestützte, iterative Umsetzung (Vibe-Coding mit Review/Testing/Deployment-Fokus)** – mit dem Ziel, live-fähige Ergebnisse statt Konzeptfolien zu liefern.

---

## Kernkompetenzen

**Tech**
- React, TypeScript, Vite
- Framer Motion, Anime.js
- Cloudflare Pages, Wrangler (Build/Release)

**AI & Workflow**
- Agentic Coding: Roo Code, Cline, Cursor, VS Code
- Google AI Studio / Stitch
- Local AI & RAG: Offline-Workflows, lokale Inferenz, Datensouveränität (Zero-Cloud)

**Growth**
- WordPress (10+ Jahre), Webflow (2 Jahre)
- SEO-Struktur, Google Ads, Analytics
- Conversion-orientierte Seiten- und UX-Struktur

---

## Berufserfahrung

### AI Workflow & Web Specialist / Creative Technologist (selbstständig)
**Dortmund · seit 10/2025**

- Aufbau und Dokumentation lokaler **Offline-RAG-Workflows** zur Dokumentanalyse (Zero-Cloud, Validierung, Datenkontrolle).
- Umsetzung moderner Web-Projekte mit **React/TypeScript/Vite** inkl. Deployment über Cloudflare Pages/Wrangler.
- Aufbau einer AI-gestützten Umsetzungspipeline (**Roo Code/Cline/Cursor/VS Code**): Prototyp → Review → produktionsnaher Stand.
- Kontinuierliche Optimierung von Portfolio/Positionierung (UX/Content/Performance) mit schnellen, iterativen Releases.

### Selbstständiger Webdesigner & Performance Marketer (Graphiks.de)
**Dortmund · 02/2013 – 08/2025 (freiberuflich), seitdem projektbasiert**

- Konzeption, Design, Umsetzung und Betrieb von KMU-Websites (WordPress; Webflow für schnelle Prototypen).
- Performance-Marketing: Google Ads Setup/Optimierung, Tracking/Analytics-Auswertung, Landingpages & Conversion-Struktur.
- SEO-nahe Strukturarbeit, technischer Betrieb (Performance/Stabilität) und kontinuierliche Content-Iteration.

---

## Projekt-Auszug

- **munverricht.org** – eigenes Portfolio für AI-Workflow & Web-Delivery (React/Vite, iterative Releases).  
  https://munverricht.org
- **Fitness Drensteinfurt** – Relaunch mit Lead-Gen-Fokus (Landing-Ansatz, schnelle Live-Iteration).  
  https://fitness-drensteinfurt-v2.pages.dev/
- **TriXstar Portfolio** – Artist-Portfolio als Vibe-Coding-Umsetzung (React/Vite/Cloudflare).  
  https://trixstar-portfolio.pages.dev/
- **Immo Netzwerk Portal** – Plattform-Prototyp im React-Umfeld (Dashboard/Concept).  
  https://immonetzwerkportal.pages.dev/
- **Kaffee Faensen Commerce** – Custom-Commerce-Logik mit Stripe-Integration und Conversion-Fokus.  
  https://www.kaffee-faensen.de/shop/homepage
- **Kost Sicherheitstechnik / Bockel-Bartscher** – laufende Unternehmensseiten im Live-Betrieb.  
  https://www.kost-sicherheitstechnik.de/ · https://www.bockel-bartscher.de/

---

## Bildung

- Schulabschluss kurz auf Anfrage spezifizierbar

---

## Zertifikate und Lizenzen

- Google Ads-Zertifizierung
- Führerschein Klasse B

## Leistungsbericht Bewerbung letzte 6 Monate

# Leistungsbericht (Bewerbungs-Version) – letzte 6 Monate

**Name:** Maximilian Unverricht  
**Zeitraum:** ca. 08/2025–02/2026  
**Stand:** 20.02.2026  
**Ziel:** Kompakte, recruiter-taugliche Zusammenfassung meiner Arbeit auf Basis der dokumentierten Inhalte in diesem Workspace.

---

## 1) Kurzprofil

Ich arbeite pragmatisch als „Vibe Coder“ mit klarem Ergebnisfokus: schnell umsetzen, sauber testen, live bringen, danach iterativ verbessern.  
Im letzten halben Jahr habe ich meinen klassischen Web-Hintergrund systematisch mit AI-gestützten Entwicklungs-Workflows verbunden.

---

## 2) Was ich in den letzten 6 Monaten gemacht habe

## A) Portfolio- und Positionierungs-Update umgesetzt
- Eigenes Portfolio als moderne React/TypeScript/Vite-Anwendung weiterentwickelt.
- Inhalte für Recruiter geschärft (klare Positionierung, konkrete Use-Cases, nachvollziehbare Projektauswahl).
- UX/Content iterativ verbessert statt „Big Bang“-Relaunch.

## B) Zwei klare AI-Use-Cases produktionsnah dokumentiert
- **Offline-RAG-Ansatz (ZBN-Kontext):** lokale Dokumentanalyse mit Fokus auf Datensouveränität und Validierung.
- **AI-Accelerated Agency Workflow:** KI-Generierung + menschliche Verfeinerung + deploymentfähige Kundenübergabe.

## C) Projekt-Delivery und Veröffentlichung stabilisiert
- Build/Deployment-Workflow über Cloudflare Pages etabliert und auf Live-Stand gebracht.
- Relevante Projekt-Referenzen konsolidiert (u. a. TriXstar, Immo-Netzwerk, Fitness, Kaffee Faensen, WordPress-Bestandsprojekte).

## D) Technische und inhaltliche Qualität nachgeschärft
- Performance-/UX-Optimierungen an zentralen Komponenten (u. a. Animation/Boot-Verhalten, visuelle Struktur).
- Inhalte sprachlich präzisiert (u. a. RAC→RAG-Korrekturen, Cases klarer beschrieben, Kontaktbereich vereinfacht).

## E) Bewerbungsunterlagen direkt aus dem Workflow heraus erstellt
- HTML-Lebenslauf als sofort nutzbares Artefakt erstellt, damit Profilinformationen direkt teilbar sind.

---

## 3) Systeme und Arbeitsmittel, mit denen ich praktisch gearbeitet habe

**Frontend & Delivery**
- React, TypeScript, Vite
- Framer Motion, Anime.js
- Cloudflare Pages, Wrangler

**AI- und Workflow-Ebene**
- Google AI Studio / Stitch (Generierungsanteil)
- Roo Code / Cline / VS Code (Umsetzung, Verfeinerung)
- Lokale Modellnutzung (u. a. Qwen/Mistral-Kontext laut Projektdokumentation)

**Methodik**
- Iteratives Arbeiten in kleinen Schritten
- Lokale Prüfung + schneller Feedback-Zyklus
- Dokumentierte Übergaben/Handoff-Logik

---

## 4) Projektauszug (relevante Arbeitsbeispiele)

- **Kaffee Faensen Commerce:** individuelle Shop-Logik + Stripe-Integration, Fokus auf kontrollierbare Conversion-Strecke.
- **TriXstar Portfolio:** modernes, schnell ausrollbares Portfolio-Setup.
- **Fitness Drensteinfurt Relaunch:** lokale Lead-Gen-/Marketing-Ausrichtung.
- **Immo Netzwerk Portal:** Plattform-Prototyping im React-Umfeld.
- **Kost Sicherheitstechnik / Bockel-Bartscher:** belastbare WordPress-Kundenarbeit aus dem Bestand.

---

## 5) Einordnung meiner Vorerfahrung (kompakt)

- **10 Jahre WordPress:** Kundenprojekte von Konzeption bis Live-Betrieb, inkl. technischer Betreuung und Marketingbezug.
- **2 Jahre Webflow:** schnelle Prototypen, visuelle Umsetzung und strukturierte Inhaltsarchitektur.

Diese Vorerfahrung ist die Basis dafür, dass ich neue AI-Workflows nicht nur „zeige“, sondern praktisch in reale Web- und Kundenkontexte übersetze.

---

## 6) Meine Arbeitsweise in einem Satz

Ich kombiniere langjährige Web-/Marketing-Praxis mit AI-gestützter Umsetzung und liefere nachvollziehbare, live-fähige Ergebnisse statt reiner Konzeptfolien.

---

## 7) Antwortbaustein für Rückfragen („Was haben Sie im letzten halben Jahr gemacht?“)

„Ich habe mein Arbeitsmodell auf AI-gestützte Web-Delivery umgestellt und dafür mein Portfolio sowie mehrere Kunden-/Case-Strecken praktisch umgesetzt. Konkret: moderne React/Vite-Umsetzungen, klare Deployments über Cloudflare, dokumentierte AI-Workflows (u. a. Offline-RAG und Agentur-Workflow) und parallel weiterhin nutzbare Kundenarbeit aus meinem WordPress/Webflow-Fundament. Wichtig war mir dabei immer: pragmatisch liefern, sauber nachschärfen, Ergebnisse sichtbar machen.“

---

## 8) Evidenzbasis im Workspace (Auszug)

- Handoff-/Session-Log mit konkreten Änderungen: `agents.md`
- Projektzusammenfassung und Arbeitsprinzipien: `README.md`
- Portfolio-Struktur und Sektionen: `App.tsx`
- Positionierung/Tooling im Hero-Bereich: `components/Hero.tsx`
- Chronologie & Erfahrungseinordnung: `components/Evolution.tsx`
- Offline-RAG-Use-Case: `components/ShowcaseA.tsx`
- AI-Agency-Workflow + Commerce-Case: `components/ShowcaseB.tsx`
- Projektarchiv (Referenzen): `components/Projects.tsx`
- Capability-/Tool-Matrix: `components/SkillMonitor.tsx`
- HTML-Lebenslauf-Artefakt: `public/Maximilian_Unverricht_Resume.html`

Hinweis: Dieser Bericht ist bewusst faktennah und auf nachweisbare Inhalte im aktuellen Ordnerstand begrenzt.

## Kurzversion 1 Seite

# Kurzversion (1 Seite) – Was ich im letzten halben Jahr gemacht habe

**Maximilian Unverricht**  
**Zeitraum:** letzte 6 Monate (ca. 08/2025–02/2026)  

Ich habe in den letzten Monaten meinen klassischen Web-Hintergrund gezielt mit AI-gestützten Workflows verbunden und in konkrete, live-fähige Ergebnisse überführt.

## Fokus der letzten 6 Monate

- Portfolio und Positionierung für Recruiter/Kunden praktisch umgesetzt und iterativ geschärft.
- Moderne Frontend-Strecken mit React, TypeScript und Vite aufgebaut, getestet und deployed.
- AI-gestützte Arbeitsweise in reale Delivery-Prozesse übersetzt (nicht nur prototypisch, sondern mit nutzbarer Struktur).
- Konkrete Case-Kommunikation aufgebaut: Offline-RAG-Ansatz + AI-Accelerated Agency Workflow.
- Projekt- und Referenzdarstellung konsolidiert (inkl. klassischer Kundenprojekte + neuer AI-/Vibe-Coding-Strecken).

## Konkrete Ergebnisse

- **Recruiter-fähige Website-Basis** mit klaren Sektionen zu Werdegang, Use Cases, Projekten und Skill-Matrix.
- **Stabiler Delivery-Stack** inkl. Build/Deployment über Cloudflare Pages.
- **Inhaltlicher Feinschliff** (präzisere Formulierungen, klare Cases, vereinfachte Kontaktstrecke).
- **Direkt nutzbares Bewerbungsartefakt** als HTML-Lebenslauf.

## Womit ich gearbeitet habe

- **Web/Frontend:** React, TypeScript, Vite, Framer Motion, Anime.js
- **Delivery:** Cloudflare Pages, Wrangler, GitHub
- **AI-Workflow:** Google AI Studio/Stitch, Roo Code/Cline/VS Code, lokale Modell-/RAG-Kontexte

## Einordnung meiner Erfahrung

- **10 Jahre WordPress** (Kundenprojekte, Betrieb, technische Betreuung, Marketingbezug)
- **2 Jahre Webflow** (visuelle Umsetzung, Prototyping, schnelle Content-Iteration)

## Arbeitsstil

Pragmatisch, schnell, iterativ: Ich arbeite in kleinen, nachvollziehbaren Schritten, teste früh und liefere sichtbare Ergebnisse statt langer Konzeptphasen.

## Kurzantwort für Interviews

„Ich habe mein Delivery-Modell in den letzten sechs Monaten konsequent auf AI-unterstützte Web-Umsetzung erweitert: moderne React/Vite-Projekte gebaut, sauber deployed, Inhalte recruiter-tauglich geschärft und klare Use Cases dokumentiert. Gleichzeitig nutze ich weiterhin mein langjähriges WordPress-/Webflow-Fundament, um schnell und zuverlässig in echte Kundenkontexte zu liefern.“