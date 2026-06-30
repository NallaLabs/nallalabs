# Nalla Labs
Find us at nallalabs.xyz
Website for **Nalla Labs** — a blockchain and financial infrastructure advisory and engineering firm.

## Stack

- [Next.js 16](https://nextjs.org) — App Router, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [Framer Motion](https://www.framer.com/motion) — scroll and interaction animations
- [Geist](https://vercel.com/font) — Geist Sans + Geist Mono (local, no network)
- [Shadcn/ui](https://ui.shadcn.com) — accessible UI primitives
- [Lucide React](https://lucide.dev) — icons

## Structure

```
app/
  layout.tsx          # Root layout, Geist fonts, metadata
  page.tsx            # Homepage — composes all sections
  globals.css         # Design tokens, Tailwind theme, typography utilities

components/
  layout/
    Nav.tsx           # Fixed nav with scroll-triggered background
    Footer.tsx
  sections/
    Hero.tsx
    TrustStrip.tsx
    Services.tsx
    Process.tsx
    CaseStudies.tsx
    About.tsx
    Insights.tsx
    Industries.tsx
    Capabilities.tsx
    FinalCTA.tsx
    Contact.tsx
  motion/
    FadeUp.tsx        # Scroll-triggered fade-up wrapper + stagger container
    CountUp.tsx       # Number counter animation
  ui/                 # Shadcn components
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form posts inquiries to `/api/contact` and expects email delivery to be configured with Resend.

Required environment variables:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=hello@nallalabs.xyz
CONTACT_FROM_EMAIL="Nalla Labs <onboarding@resend.dev>"
```

If those variables are missing, the form will return a configuration error instead of silently dropping messages.

## SEO

The site now includes:

- canonical metadata
- robots.txt and sitemap.xml
- Open Graph and Twitter metadata
- JSON-LD organization schema

## Build

```bash
npm run build
npm start
```

## Deploy

Deploy to [Vercel](https://vercel.com) — zero configuration required with Next.js.
