# portfolio-2026

**[Live site: joeykarkitpang.co.uk](https://joeykarkitpang.co.uk)**

Joey Pang's personal portfolio and case-study site, built for the 2026 post-grad software engineering job search. Not [websprint.co.uk](https://websprint.co.uk) — that's his business.

**Stack** — Next.js 16 · React 19 · TypeScript · Tailwind v4 · Sanity CMS

---

## Status

Live at [joeykarkitpang.co.uk](https://joeykarkitpang.co.uk). Every section of the plan below exists in `frontend-web/` with real content; nothing is "coming soon" copy dressed up as done. Repo cards, commit counts and the contribution graph come live from the GitHub API, with no hardcoded numbers.

Launch checklist:

- [x] Deploy on Vercel (`joeykarkitpang.co.uk`, Root Directory `frontend-web`) with the env vars in `frontend-web/README.md`, including `GITHUB_TOKEN` for the contribution graph
- [ ] CV download: add the phone-free CV PDF as `frontend-web/public/joey-pang-cv.pdf` (the download links appear automatically once it's there)
- [ ] Confirm the homelab diagram's "Replication · off-box copy" box is accurate
- [ ] Sanity: content is hardcoded for v1; `backend-sanity/` is still an empty schema

## Repository layout

| Directory | What it is |
|---|---|
| [`frontend-web/`](frontend-web) | The public site — Next.js 16, React 19, Tailwind v4. |
| [`backend-sanity/`](backend-sanity) | Sanity Studio — content model for case studies, project data. |

## The plan

Hero → About → three project case studies → Contact → live GitHub activity, pulled via API rather than a static screenshot.

Each case study follows a **CASE** structure, deliberately not a tech-stack list:

- **C**ontext — the problem, who it affected, why existing solutions fell short
- **A**I-Workflow — which tool, what was prompted, what was validated or overridden
- **S**ystem Architecture — the structural decision made, the alternative rejected, why
- **E**vidence — the measurable before/after that proves the outcome

Three projects, chosen to cover three distinct competencies rather than three flavors of the same thing:

- **[SticksNBoulders](https://github.com/kar-kit/SticksNBoulders)** — full-stack system + testing discipline (1,188 tests), real external users
- **[MemoAI](https://github.com/kar-kit/MemoAI)** — AI-engineering: multi-model routing, self-hosted Ollama inference ([live demo](https://fyp-26-frontend.vercel.app))
- **WebSprint** — production business impact: full-stack client delivery, 3 of 4 paying clients retained (14-month average), 5 active client engagements today

Those first two links go to the actual repos with real code, real tests, and real READMEs — worth a look regardless of where this site is at.

## Local development

```bash
# frontend-web (npm — package-lock.json is the lockfile)
cd frontend-web
npm install
npm run dev
npm run typecheck   # next typegen && tsc --noEmit
npm run lint

# backend-sanity (bun — bun.lock is the lockfile)
cd backend-sanity
bun install
bun run dev
bun run typecheck
```

See [`AGENTS.md`](AGENTS.md) for the fuller dev-workflow and safety notes, including why a bare `tsc` on `frontend-web` produces a false-positive error on `LayoutProps`.
