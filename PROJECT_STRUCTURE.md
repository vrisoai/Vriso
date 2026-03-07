# VRISO Project Structure

## Next.js App (primary)

```
app/
├── layout.tsx           # Root layout, next/font, metadata, SchemaOrg
├── page.tsx             # Home page
├── components/
│   ├── index.ts         # Barrel: Navbar, HeroSection, OrbitalCards, AnimatedHeadline, MonolithArtifact
│   ├── SchemaOrg.tsx    # Server component: JSON-LD for SEO/GEO (no 'use client')
│   ├── Navbar.tsx
│   ├── Navbar.css
│   ├── HeroSection.tsx
│   ├── AnimatedHeadline.tsx
│   ├── MonolithArtifact.tsx
│   ├── OrbitalCards.tsx
│   └── cards/
│       ├── index.ts     # Barrel: VelocitySlab, EconomicSlab, PerformancePillar
│       ├── VelocitySlab.tsx
│       ├── EconomicSlab.tsx
│       └── PerformancePillar.tsx
├── styles/        # Design system — layout imports globals.css
│   ├── globals.css    # Master: tokens → typography → components → tailwind + reset + reduced-motion
│   ├── tokens.css     # CSS custom properties only; no hex elsewhere
│   ├── typography.css # Font roles, heading scale, .gradient-text
│   └── components.css # .btn-primary, .btn-accent, .card, .badge-trust, links, .section, ::selection
└── lib/
    └── animations.ts   # Shared Framer Motion variants
```

- **Imports:** Use `@/app/components`, `@/app/styles/globals.css`, `@/app/lib/...` (see `tsconfig.json` paths).
- **Styles:** Layout imports `@/app/styles/globals.css`. All design tokens in `app/styles/tokens.css`. Component CSS (e.g. `Navbar.css`) uses `var(--color-*)` only.
- **Public:** Add a `public/` folder when you need static assets (images, favicons); Next.js will serve them.

## Root

- `DESIGN-TOKENS.md` — Quick reference for colors and fonts used across the site.
- `README-design-system.md` — Design system: font roles, color rules, SEO/GEO, light mode.
- `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs` — Next.js and tooling.

## Conventions

1. **Path alias:** `@/*` → project root; use `@/app/components` and `@/app/lib` in app code.
2. **Barrel files:** `app/components/index.ts` and `app/components/cards/index.ts` for cleaner imports.
3. **Client components:** Use `"use client"` only where needed (Navbar, HeroSection, OrbitalCards, cards, AnimatedHeadline, MonolithArtifact).
