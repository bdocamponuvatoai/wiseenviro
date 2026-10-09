# Security

## Reporting a vulnerability

Please do not open a public issue for security problems. Report them privately through GitHub: **Security** tab → **Report a vulnerability**. You'll get an acknowledgement within 3 business days.

## What the site exposes

The site is almost entirely static HTML. The server-side surface is:

| Surface                                                | Protection                                                                                                                                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Contact form and careers form (Next.js Server Actions) | Same-origin check (built into Next.js), server-side zod validation of every field, honeypot field, minimum fill time, per-IP rate limit (5 per 10 minutes), 64 KB request body limit |
| Lead delivery (`LEAD_WEBHOOK_URL`)                     | Server-only module (`server-only`), 8 s timeout, optional bearer token (`LEAD_WEBHOOK_SECRET`), never exposed to the browser                                                         |
| Open Graph image route                                 | Static, generated at build time                                                                                                                                                      |

No database, user accounts, cookies or third-party scripts are used.

## HTTP security headers

Set for every route in `next.config.ts` and covered by an end-to-end test:

| Header                       | Value                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`    | `default-src 'self'`; no external scripts, styles, fonts or frames; `frame-ancestors 'none'`; `form-action 'self'`; `object-src 'none'` |
| `Strict-Transport-Security`  | `max-age=63072000; includeSubDomains`                                                                                                   |
| `X-Frame-Options`            | `DENY`                                                                                                                                  |
| `X-Content-Type-Options`     | `nosniff`                                                                                                                               |
| `Referrer-Policy`            | `strict-origin-when-cross-origin`                                                                                                       |
| `Permissions-Policy`         | camera, microphone, geolocation and topics disabled                                                                                     |
| `Cross-Origin-Opener-Policy` | `same-origin`                                                                                                                           |

`X-Powered-By` is removed.

**Known trade-off:** the CSP allows inline scripts (`'unsafe-inline'`) because nonce-based CSP would make every page dynamic. With no third-party scripts and no user-generated HTML, the XSS risk this leaves is low. If the site ever renders user content, switch to nonces (see the Next.js CSP guide) or SRI.

**HSTS preload:** `preload` is intentionally left out. Before adding it and submitting the domain to hstspreload.org, confirm that every `wiseenviro.com` subdomain (mail, webmail, legacy hosts) serves HTTPS. Preloading is very hard to undo.

## Secrets

- Secrets live only in environment variables (Vercel project settings or a local `.env.local`). `.env*` files are git-ignored; only `.env.example` (no values) is committed.
- Only `NEXT_PUBLIC_SITE_URL` reaches the browser, and it is not secret.
- Rotate `LEAD_WEBHOOK_SECRET` if it is ever exposed, and update it at the receiving end at the same time.

## Dependencies and code scanning

- **CI** (`.github/workflows/ci.yml`) fails if production dependencies have a high or critical advisory (`npm audit --omit=dev --audit-level=high`).
- **Dependabot** opens weekly update PRs for npm packages and GitHub Actions.
- **CodeQL** (`.github/workflows/codeql.yml`) scans every push and pull request, plus a weekly run.
- Workflows run with read-only `contents` permission and don't persist checkout credentials.

Known and accepted: `npm audit` reports a `braces` advisory in dev-only lint tooling (`eslint-config-next` → `fast-glob` → `micromatch`). It never ships to the site, and npm's suggested "fix" would downgrade the ESLint config to Next 14. Dependabot will pick up the upstream fix.

## Recommended GitHub settings

Repository → Settings:

1. **Branches → add a ruleset for `main`:** require a pull request, require the `Lint, test and build` and `Analyze JavaScript/TypeScript` checks to pass, and block force pushes and deletion.
2. **Code security:** enable secret scanning with push protection, Dependabot alerts, and private vulnerability reporting.
3. **Actions → General:** set workflow permissions to "Read repository contents".

## Hardening backlog

- The rate limiter is in memory, so each server instance counts separately. For stronger protection, add a Vercel Firewall rate-limit rule on POST requests, or back the limiter with a shared store (for example Upstash Redis from the Vercel Marketplace).
- Consider Vercel BotID or a CAPTCHA if spam gets past the honeypot.
