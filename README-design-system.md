# VRISO Design System

## Font Role Guide

| Role   | Font            | Use Case                                                                 |
|--------|-----------------|---------------------------------------------------------------------------|
| Display| Space Grotesk   | Hero headlines, nav, CTAs, technical labels                              |
| Serif  | Playfair Display| Long-form copy, journal entries, editorial sections                       |
| Mono   | JetBrains Mono  | Bento metadata, stats, code snippets, timestamps                         |

## Color Usage Rules

- **Amber (#FBBF24):** Trust signal only. Use for verified metrics, badges, compliance indicators. Max 1–2 uses per page.
- **Cobalt (#2D5BFF):** Primary CTA only. One CTA per section maximum.
- **#E5E7EB:** All primary readable text. Never drop below this on #121212 bg.
- **#9CA3AF:** Subtitles, supporting copy, secondary labels.
- **No hardcoded colors in components.** Always reference `var(--color-*)` tokens.

## Heading Hierarchy (SEO Required)

- One `<h1>` per page — the primary keyword claim.
- `<h2>` for major sections.
- `<h3>` for subsections and card titles.
- Never skip levels. Google and LLMs use this to understand page structure.

## Font Loading (GEO + LCP)

Fonts are loaded via `next/font/google` in `app/layout.tsx`. Global styles (tokens, typography, components) live in `app/styles/` and are imported in the root layout.

- Automatic `font-display: swap` prevents invisible text during load.
- Fonts are self-hosted by Next.js (no third-party DNS lookup at render time).
- Font CSS variables (`--font-space-grotesk` etc.) are injected on `<html>`.

## SEO / GEO Notes

- All headings must be descriptive noun phrases, not clever wordplay.
- Use `aria-label` on all icon-only buttons and interactive elements.
- JSON-LD schema is injected via `<SchemaOrg />` server component in layout.
- The `knowsAbout` array in schema is the primary GEO signal for AI citation.
- `metadataBase` in layout.tsx must match the production domain exactly.

## Adding a Light Mode

Override `:root` variables inside a `[data-theme="light"]` selector in `tokens.css`. No component CSS needs to change — tokens are the single source of truth.
