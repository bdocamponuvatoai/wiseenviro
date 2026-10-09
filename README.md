# Wise Environmental website

[![CI](https://github.com/bdocamponuvatoai/wiseenviro/actions/workflows/ci.yml/badge.svg)](https://github.com/bdocamponuvatoai/wiseenviro/actions/workflows/ci.yml)
[![CodeQL](https://github.com/bdocamponuvatoai/wiseenviro/actions/workflows/codeql.yml/badge.svg)](https://github.com/bdocamponuvatoai/wiseenviro/actions/workflows/codeql.yml)

Marketing site for Wise Environmental Solutions, Inc. (Oxford and Birmingham, AL), built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4 and TypeScript.

Every page is prerendered as static HTML. The only server code is the two form Server Actions (service request and job interest) and the generated Open Graph image.

## Requirements

- Node.js 24 (pinned in `.nvmrc`; 20.9 is the minimum Next.js supports)
- npm

## Commands

| Command             | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `npm install`       | Install dependencies                                        |
| `npm run dev`       | Start the dev server at http://localhost:3000               |
| `npm run build`     | Production build                                            |
| `npm start`         | Serve the production build                                  |
| `npm run lint`      | ESLint (`next build` no longer lints in Next 16)            |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`                   |
| `npm run format`    | Prettier (with Tailwind class sorting)                      |
| `npm test`          | Vitest unit tests (validation schemas, rate limiter)        |
| `npm run test:e2e`  | Playwright tests against the production build (build first) |

Install the Playwright browser once with `npx playwright install chromium`. To capture full-page screenshots of every page at 390px and 1440px:

```bash
SCREENSHOTS=1 npx playwright test tests/e2e/screenshots.spec.ts
```

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable               | Required           | Purpose                                                       |
| ---------------------- | ------------------ | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended        | Canonical URLs, sitemap, robots, Open Graph                   |
| `LEAD_WEBHOOK_URL`     | Yes, in production | Form submissions are POSTed here as JSON                      |
| `LEAD_WEBHOOK_SECRET`  | No                 | Sent as `Authorization: Bearer <secret>` with each submission |

Without `LEAD_WEBHOOK_URL`, development accepts submissions and logs them to the server console. Production refuses them and asks the visitor to call, so leads are never silently lost.

Webhook payload:

```json
{ "kind": "service-request" | "job-interest", "submittedAt": "ISO date", "data": { ...validated fields } }
```

## Deploying to Vercel

1. Import the repository in Vercel (framework preset: Next.js).
2. Add `NEXT_PUBLIC_SITE_URL`, `LEAD_WEBHOOK_URL` and optionally `LEAD_WEBHOOK_SECRET` for Production (and Preview if you want preview forms to deliver).
3. Deploy. Or deploy from the CLI with `vercel` (preview) or `vercel --prod`.

## Where to edit content

| What                                         | File                                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Company name, phone, offices, certifications | `src/lib/site-config.ts`                                                                 |
| Header, footer and legal navigation          | `src/lib/site-config.ts`                                                                 |
| Service pages (copy, lists, specs, FAQs)     | `src/content/services.ts`                                                                |
| Home page copy and images                    | `src/content/home.ts`                                                                    |
| Site-wide FAQ                                | `src/content/faq.ts`                                                                     |
| About and Careers copy                       | `src/content/company.ts`                                                                 |
| Contact form service types                   | `src/content/service-types.ts`                                                           |
| Form validation rules                        | `src/lib/validations/`                                                                   |
| Colors, type scale, radius, motion           | `src/app/globals.css` (design tokens)                                                    |
| Photos and logos                             | `src/assets/` (imported, so `next/image` gets sizes and blur placeholders automatically) |

A new service needs only a new entry in `src/content/services.ts`. Its page, card, sitemap entry and structured data are generated from that entry.

## Project structure

```
src/
  app/
    (marketing)/          public pages sharing the header and footer
    layout.tsx            fonts, metadata defaults, skip link
    globals.css           Tailwind import and design tokens
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.png, apple-icon.png
    not-found.tsx, error.tsx
  components/
    ui/                   button, form controls, accordion
    layout/               header, desktop and mobile navigation, footer, logo
    sections/             page sections (hero, services, FAQ, CTA, ...)
    forms/                contact and careers forms
  content/                typed site copy
  lib/
    actions/              Server Actions and spam protection
    validations/          zod/mini schemas shared by client and server
tests/
  unit/                   Vitest
  e2e/                    Playwright
```

## CI and quality gates

Every push to `main` and every pull request runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. `npm ci` (exact lockfile install)
2. `npm audit --omit=dev --audit-level=high` (fails on high or critical advisories in shipped code)
3. Prettier check, ESLint, TypeScript
4. Vitest unit tests
5. Production build
6. Playwright end-to-end tests: every page (status, one `h1`, no console errors, no horizontal scroll at 360 to 1440px), internal links, 404, redirects, security headers, keyboard navigation, and the forms with valid, invalid, empty and no-JavaScript submissions

[CodeQL](.github/workflows/codeql.yml) scans the code on every push and weekly, and [Dependabot](.github/dependabot.yml) opens weekly dependency and Action updates.

## Production checklist

Before pointing `www.wiseenviro.com` at this deployment:

- [ ] `LEAD_WEBHOOK_URL` set in Vercel (Production), and a test submission received at the destination
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final domain
- [ ] Custom domain added in Vercel with HTTPS; `wiseenviro.com` redirects to `www` (or the reverse)
- [ ] Branch ruleset and security settings applied (see [SECURITY.md](SECURITY.md#recommended-github-settings))
- [ ] Real photos in place of any placeholder or AI-generated imagery; alt text reviewed
- [ ] Privacy Policy and Terms reviewed by the company
- [ ] Old WordPress URLs checked: same paths are kept, and `/job-openings` and `/home` redirect
- [ ] Search Console: new sitemap (`/sitemap.xml`) submitted
- [ ] Vercel Speed Insights or Web Analytics enabled to watch real-user Core Web Vitals

## Security

See [SECURITY.md](SECURITY.md) for the threat surface, HTTP headers, secret handling, dependency scanning, recommended GitHub settings and how to report a vulnerability.
