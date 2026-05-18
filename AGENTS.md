# AGENTS.md

This document describes the architecture and conventions of the EarthBloom e-commerce project for AI agents and developers.

## Project Overview

EarthBloom is an e-commerce store selling biodegradable sanitary pads and panty liners. Products come in four materials (bamboo, wood, corn, banana) and multiple size/pack-count variants. Checkout is handled by Stripe.

## Directory Structure

```
src/
├── components/
│   ├── BuyButton.tsx          # Checkout button — takes productId + variant object
│   └── Header.tsx             # Sticky top nav with brand logo and nav links
├── data/
│   └── products.ts            # Single source of truth for all product data + types
├── lib/
│   └── stripe.ts              # Server functions: getStripeEnabled, createCheckoutSession
├── routes/
│   ├── __root.tsx             # Root layout: Header, Footer, global styles
│   ├── index.tsx              # Product grid with search + filter (client-side)
│   ├── products/
│   │   └── $productId.tsx     # Product detail: size selector, pack selector, BuyButton
│   └── checkout/
│       ├── success.tsx        # Post-payment success page
│       └── cancel.tsx         # Cancelled checkout page
└── styles.css                 # Tailwind 4 import + base body styles
```

## Data Model

All product data lives in `src/data/products.ts`. The key types are:

```ts
ProductVariant {
  sku: string          // unique identifier e.g. "BAMB-XL-6"
  size: 'L' | 'XL' | 'XXL' | 'XXXL' | 'One Size'
  packSize: number     // 6, 12, 10, 20
  price: number        // in cents (USD)
  dimensions?: string  // e.g. "280mm with double wings"
}

Product {
  id: string           // URL-safe slug e.g. "bamboo-pad"
  material: 'bamboo' | 'wood' | 'corn' | 'banana'
  category: 'pad' | 'liner'
  variants: ProductVariant[]
  color: string        // Tailwind gradient classes for card/image background
  ...
}
```

## Stripe Integration

- `createCheckoutSession` in `src/lib/stripe.ts` is a TanStack server function (POST)
- It receives `{ productId, variant }` and creates a Stripe session with the variant's price
- `getStripeEnabled` checks whether `STRIPE_SECRET_KEY` is set — BuyButton uses this to show/hide
- If Stripe is not configured the BuyButton renders a disabled "Checkout Unavailable" state

## Routing

File-based routing via TanStack Router:
- `/` — searchable/filterable product grid
- `/products/:productId` — detail page with variant selection
- `/checkout/success` and `/checkout/cancel` — Stripe redirect targets

## Colour Palette

All brand colours are inline Tailwind arbitrary values:
- `#1a3a1f` — deep forest (primary backgrounds, text)
- `#2d5a27` — forest (hover states)
- `#4a7c59` — sage (secondary text, accents)
- `#6aab7e` — sage light (highlights, badges)
- `#e8f0ea` — mist (light backgrounds, chips)
- `#f7f3ec` — cream (page background)

## Conventions

- Product IDs are string slugs (`"bamboo-pad"`) not numbers — router params are matched by string
- Prices are always stored and passed in **cents** (integer), formatted for display with `/100`
- `BuyButton` requires both `productId` and `variant` props — do not call it with just an ID
- No global state management — variant selection is local React state in `$productId.tsx`
- Tailwind 4 is used — no `tailwind.config.js` needed

## Adding New Products

1. Add a new entry to the `products` array in `src/data/products.ts`
2. Choose a unique string `id`, set `material`, `category`, `color` gradient, and `variants`
3. No other files need changing — the grid and detail page are data-driven

## Adding New Materials

Update the `material` union type in `src/data/products.ts`, add an entry to `MATERIAL_LABELS` in `index.tsx`, and add entries to `MATERIAL_ICONS` and `MATERIAL_DESCRIPTIONS` in `$productId.tsx`.
