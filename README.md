# Arlow

A recreation of the [Arlow](https://arlow.framer.website/) Framer template, a quiet
furniture-studio storefront, built with Next.js (App Router), React, TypeScript and
Tailwind CSS v4.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Optional environment variables:

| Variable | Purpose |
| --- | --- |
| `NEWSLETTER_WEBHOOK_URL` | Forward newsletter sign-ups (`{ email, source }` JSON POST) to a mailing-list service. Without it, the form validates the address but tells the visitor sign-ups are not connected yet. Nothing is stored. |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL used for Open Graph image URLs. On Vercel it defaults to the project's production domain. |

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, Collection 01 — Quiet Forms, statement, materials, styled spaces |
| `/shop` | Furniture & Objects grid (9 products) |
| `/shop/[slug]` | Product detail, generated from `data/products.ts` |
| `/about` | Studio story |
| `/lookbook` | Gallery with room filters and a lightbox |
| `/blog` | Journal index |
| `/blog/[slug]` | Eight articles, generated from `data/articles.ts` |
| `/contact` | Contact |
| `/materials` | Redirects to the Materials section on the home page (the reference has no such page) |
| anything else | Branded 404 |

## Structure

```
app/                 routes; (site)/ wraps pages in the shared header and footer
app/api/newsletter   sign-up endpoint
components/layout    SiteHeader, BrandLogo, CartPanel, SiteFooter, NewsletterForm
components/ui        MediaCard, BlurText, SplitHero, PageHeading, ArrowLink, RollLink, Lightbox
components/shop      ProductGrid, ProductDetails/Title, ProductGallery, RelatedProducts
components/home      ScrollRevealText
components/lookbook  LookbookGallery
components/blog      ArticleRow, ArticleBody, RelatedArticles
data/                products, articles, lookbook, navigation and shared copy
public/images        photography, grouped by page or product
```

Design tokens (colours, fonts, breakpoints) live in `app/globals.css`. Breakpoints follow
the reference: phone below 810px, tablet 810–1199px, desktop from 1200px. Above 1440px,
content stays in a centred 1440px frame (`.frame`), and only photographic backgrounds and
the product gallery strip run full width, as on the reference.

## Fidelity notes

All copy, prices, dimensions, materials, lead times and care notes were transcribed from
the live reference. Layout values were measured from the reference DOM at 1440, 1280,
1000, 768 and 390px, then compared element by element with this build.

Where this build intentionally differs from the reference:

- **Images** are the reference template's own photographs, downloaded from
  `framerusercontent.com`. Confirm you hold a licence for the Arlow template (or replace
  the files) before publishing.
- **Contact for Availability** opens an email to `hello@arlowstudio.com` with the product
  in the subject line. The reference links to a placeholder WhatsApp number
  (`wa.me/+1234567890`), which isn't a real destination.
- **Cart** (phone header) opens a short panel explaining that pieces are made to order. On
  the reference the control does nothing.
- **Header "Blog"** goes to the Journal index. The reference points it at the first article.
- **Journal index rows** link to their articles and show each article's own summary. On the
  reference, the rows are not links and every row repeats the same placeholder paragraph.
- **Product gallery strip** frames open in the lightbox. On the reference they show a
  "View" label without an action.
- **Newsletter** never claims a subscription unless `NEWSLETTER_WEBHOOK_URL` accepts it.
- The "Made in Framer" badge is not reproduced.

Known small differences: the statement block falls back to the platform sans-serif, just
as the reference does, so its line breaks vary by operating system. The gallery-strip
speed and blur-in timing were matched by eye. On phones, Lookbook labels stay visible
rather than appearing only on hover.
