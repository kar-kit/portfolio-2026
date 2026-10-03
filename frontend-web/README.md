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
- `app/api/contact/route.ts` is a stub that returns 501 until a mail provider is chosen; the form falls back to showing the email address.

## Environment

| Variable | Needed for |
|---|---|
| `GITHUB_TOKEN` | The contribution graph (GitHub GraphQL requires auth). Optional — without it the graph is hidden and repo cards still load via the unauthenticated REST API. A fine-grained token with no extra scopes is enough. |
