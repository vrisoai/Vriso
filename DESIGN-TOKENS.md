# VRISO design tokens — use site-wide

Single source: **colors and gradient** in `app/styles/tokens.css` (`:root`). **Tailwind** utilities come from `@theme` in `app/styles/globals.css`. **Fonts** are loaded in `app/layout.tsx` (next/font) and exposed as CSS variables on `<html>` (`--font-space-grotesk`, `--font-playfair`, `--font-jetbrains`).

---

## Colors

Use in **Tailwind**: `bg-bg-primary`, `text-text-secondary`, `border-border`, `text-action-accent`, etc.

Use in **CSS / inline**: `var(--color-bg-primary)`, `var(--color-text-primary)`, etc.

| Token | Value | Use for |
|-------|--------|--------|
| `--color-bg-primary` | `#121212` | Page background |
| `--color-bg-section` | `#1a1a1a` | Section blocks |
| `--color-bg-card` | `#1f1f1f` | Cards, panels |
| `--color-border` | `#262626` | Borders, dividers |
| `--color-text-primary` | `#e5e7eb` | Headings, primary text |
| `--color-text-secondary` | `#9ca3af` | Body, descriptions |
| `--color-text-tertiary` | `#6b7280` | Labels, metadata |
| `--color-text-micro` | `#4b5563` | Fine print |
| `--color-btn-bg` | `#0f0f0f` | Button background |
| `--color-btn-border` | `#1f2937` | Button border |
| `--color-btn-hover-bg` | `#161616` | Button hover |
| `--color-btn-hover-border` | `#374151` | Button hover border |
| `--color-action-accent` | `#2d5bff` | CTAs, focus rings, links |
| `--color-link` | `#3b82f6` | Default link |
| `--color-trust-amber` | `#fbbf24` | Trust badges, highlights |
| `--color-trust-amber-alt` | `#f59e0b` | Amber alternate |
| `--gradient-headline` | `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)` | Hero headline gradient (use in CSS) |

---

## Fonts

Loaded in **`app/layout.tsx`** via `next/font/google`. Variables are on `<html>`; body default is **Space Grotesk**.

| Role | Variable | Use for |
|------|----------|--------|
| **Display / UI** | `--font-space-grotesk` | Headings, nav, buttons, body default |
| **Serif** | `--font-playfair` | Subcopy, editorial (Playfair Display) |
| **Mono** | `--font-jetbrains` | Badges, code, stats (JetBrains Mono) |

**In React:** Use classes `.font-display`, `.font-serif`, `.font-mono` (from `app/styles/typography.css`) or `style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}`.

**In CSS:** `font-family: var(--font-space-grotesk), system-ui, sans-serif;`

---

See **README-design-system.md** for full usage rules and accessibility.
