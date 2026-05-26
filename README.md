# Sthriyah — Pure Natural Care

A modern e-commerce store selling biodegradable sanitary pads and panty liners made from natural plant fibres. Built with TanStack Start and deployed on Netlify.

## Products

- **Bamboo Comfort Pads** — XL (280mm) & XXL (330mm), pack of 6 or 12
- **Wood Fibre Pads** — L, XL, XXL, XXXL, pack of 6 or 12
- **Corn Fibre Pads** — L, XL, XXL, XXXL, pack of 6 or 12
- **Banana Fibre Pads** — XL & XXL, pack of 6 or 12
- **Bamboo Panty Liners** — One size (155mm), pack of 10 or 20
- **Corn Fibre Panty Liners** — One size (155mm), pack of 10 or 20

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Payments | Stripe Checkout |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Running Locally

```bash
# Install dependencies
npm install

# Start the dev server (uses Netlify CLI for full feature parity)
netlify dev

# Or start with Vite directly
npm run dev
```

The dev server runs on http://localhost:8888 (Netlify CLI) or http://localhost:3000 (Vite).

## Environment Variables

```
STRIPE_SECRET_KEY=sk_test_...   # Required for checkout
SITE_URL=https://your-site.com  # Required in production for redirect URLs
```

## Build

```bash
npm run build
```

Output goes to `dist/client` (configured in `netlify.toml`).
