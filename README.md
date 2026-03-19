# Kinetic Ledger

LLM Token Dashboard built with Next.js 16 + Tailwind CSS 4

## Design System: "The Kinetic Ledger"

A sophisticated, high-velocity dashboard for LLM token management featuring:

- **No-Line Rule**: Structure through tonal depth, not borders
- **Glassmorphism**: Premium feel with backdrop-blur effects
- **Typography**: Space Grotesk (display) + Inter (UI) + JetBrains Mono (data)
- **Color System**: Deep obsidian base with Cyan (primary) and Emerald (tertiary) accents
- **Ambient Shadows**: Soft, atmospheric depth instead of harsh drop shadows

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- PostCSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Design Principles

1. **Intentional Asymmetry**: Break away from rigid grids
2. **Tonal Layering**: Use surface hierarchy for depth
3. **Editorial Typography**: High-contrast scales for data hierarchy
4. **Kinetic Energy**: Gradients and subtle animations

## Project Structure

```
kinetic-ledger/
├── app/
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Dashboard overview
│   └── globals.css      # Tailwind + custom utilities
├── tailwind.config.ts   # Full color system
└── package.json
```

## Color Tokens

- Surface: `#0b1326` (base)
- Primary: `#c3f5ff` (Cyan)
- Tertiary: `#a8ffd2` (Emerald)
- Text: `#dae2fd` (on-surface)

## Custom Utilities

- `.glass` - Glassmorphism effect
- `.gradient-primary` - Cyan gradient
- `.ambient-shadow` - Soft depth shadow
- `.text-display-lg` - 3.5rem display text

Built from Stitch design system export.
