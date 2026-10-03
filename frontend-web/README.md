# frontend-web

The public portfolio site — Next.js 16, React 19, Tailwind v4. See the [root README](../README.md) for the project overview and [`DESIGN.md`](../DESIGN.md) before changing any UI.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
```

## Layout

- `app/page.tsx` composes the sections in `app/_components/` (Hero → About → case studies → Homelab → GitHub activity → Contact).
- `app/globals.css` holds the design tokens (`@theme`) — they mirror DESIGN.md.
- `lib/github.ts` fetches pinned repos, commit counts, the contribution calendar and the footer's last-updated date at build time, revalidated hourly.
- `app/api/contact/route.ts` verifies the Cloudflare Turnstile token, then sends the message through Resend with reply-to set to the visitor. Validation rules live in `lib/contact.ts`, shared by the form and the route.
- `lib/cv.ts` renders the CV links only if `public/joey-pang-cv.pdf` exists (use the phone-free web copy).

## SEO

- `app/layout.tsx` — `metadataBase`, title template, description, canonical, Open Graph (`profile`), Twitter card, robots, viewport `themeColor`.
- `app/opengraph-image.tsx` / `twitter-image.tsx` — the 1200×630 share card, rendered at build time with IBM Plex from `assets/fonts/` (OFL) and `assets/og-photo.png` (fade baked in by `design-reference/photos/ogphoto.swift`).
- `app/robots.ts`, `app/sitemap.ts` (lastModified = latest commit), `app/manifest.ts`.
- Icons: `app/favicon.ico` (16/32/48), `app/icon.png`, `app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png` (also maskable).
- JSON-LD in `app/page.tsx`: one `@graph` of WebSite + ProfilePage + Person.
- Security headers in `next.config.ts`.

## Environment

Put local values in `frontend-web/.env.local` (gitignored). Production values go in the Vercel project settings.

| Variable | Needed for |
|---|---|
| `RESEND_API_KEY` | Sending contact-form email. Use a **sending-only** key scoped to `joeykarkitpang.co.uk`. |
| `CONTACT_FROM_EMAIL` | e.g. `Joey Pang portfolio <contact@joeykarkitpang.co.uk>` (the domain must be verified in Resend) |
| `CONTACT_TO_EMAIL` | Where messages land |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | The Turnstile widget (public). Without it the widget doesn't render and the form can't submit. |
| `GOOGLE_SITE_VERIFICATION` | Optional. Only for Search Console's HTML-tag method; the DNS (domain property) method needs nothing here. |
| `GITHUB_TOKEN` | The contribution graph (GitHub GraphQL requires auth). Optional — without it the graph is hidden and repo cards still load via the unauthenticated REST API. A fine-grained token with no extra scopes is enough. |
