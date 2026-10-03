# Design System

Decided 2026-09-22, consulting RubbleOS's **AI Slop Specialist** persona (`Personas/AI Slop Specialist.md` in RubbleOS) at each choice below. Source: three reference desk-setup photos Joey shared — warm charcoal walls, real oak/wood desk surfaces, matte black hardware, restrained warm ambient light, plants. The palette is lifted from that real personal environment, not from a generic "dark mode SaaS" default — every token below has a stated reason. Don't add a color, gradient, or font without one.

## Why this exists

Per the persona's own recommended practice: encode exact tokens plus prose rationale so anyone (or any AI) working on this site knows what each choice is *for*, instead of defaulting to whatever's statistically common in training data (which is how projects end up with the reflexive indigo-gradient/Inter/glassmorphism look this system deliberately avoids).

## Colors

Warm-charcoal base, scarlet as the single accent doing all the work — not a second hue, not a gradient.

**2026-09-22, second revision**: sage green (the first revision) is out too — Joey's favorite color is scarlet red, and it's genuinely his, which is a stronger "why" than either prior option ("sourced from a reference photo" vs. "this is actually mine"). One real functional problem this creates: the palette already used a red-adjacent terracotta for `error`. Two red-family colors doing different jobs (one interactive, one "something's wrong") would be a genuine usability fault, not just an aesthetic one — so `error` moves to the amber/ochre that was previously sitting mostly-unused as `warning`, keeping the two states visually distinct at a glance. Sage green is dropped entirely rather than kept as a third color, per the system's own "one accent does all the work" rule — oak/amber is also dropped as a secondary tone for the same reason, one system shouldn't be juggling three warm hues.

| Token | Hex | Use | Why |
|---|---|---|---|
| `bg-base` | `#16140F` | Page background | Warm-tinted near-black, not pure `#000` (reads harsh/cheap) or blue-black (reads like generic dev-tool dark mode) |
| `bg-surface` | `#1E1B15` | Cards/panels | One step up from base, no glass/blur |
| `bg-raised` | `#262218` | Hover/active surfaces | |
| `border` | `#332C20` | Hairline borders | Structure comes from a 1px border, not a drop shadow or glow |
| `text-primary` | `#F2ECE1` | Body/headings | Warm off-white, not pure white — matches the warm light in the reference photos |
| `text-secondary` | `#B8AD9B` | Captions, muted body | |
| `text-tertiary` | `#7A7060` | Least emphasis | |
| `accent` | `#C1272D` | Links, active states, focus rings, primary CTA | Scarlet — Joey's actual favorite color, deliberately desaturated/darkened from a pure neon scarlet (`#FF2400`-ish) to stay premium rather than alarm-siren; also ties naturally to the competitive-powerlifting personal story already in the About section |
| `accent-strong` | `#E0524A` | Hover state | Lighter scarlet, for hover/active feedback |
| `accent-muted` | `#4A1A1A` | Subtle tag/background fills | Dark brick-red, for low-emphasis accent use |
| `error` | `#C9A227` | Error states | Moved here from `warning` specifically because the accent is now red — an error state also in the red family would be indistinguishable from a normal interactive element at a glance. Muted ochre, not bright yellow |

**Rule**: no gradients as a default. If one is ever used, a single low-opacity (6–8%) radial in `accent` (scarlet) behind a hero section only — never a multi-hue "aurora" gradient. Given a bold accent color, this restraint matters more, not less — scarlet used everywhere would tip from "confident" into "loud."

## Typography

**IBM Plex Sans** (body copy only) + **IBM Plex Mono** (headlines, stats, dates, nav labels, case-study numbers). Weights 400/500/600/**700** — 700 added 2026-09-23 specifically for headline impact.

Why: Inter is the single most-cited "AI/SaaS default" font, precisely because its versatility signals nothing. A warm-cream-background-plus-serif pairing was deliberately rejected too — the persona's research flagged that combination as the *emerging* 2026 counter-cliché models reach for specifically to escape purple-gradient slop, so it would just trade one default for a newer one. Plex is an established, distinct system (not on either "overused" list found in that research) with a mono variant built to pair with it.

**2026-09-23 revision — Plex Mono is now the headline face, not just the data-label face.** Joey flagged the site as feeling flat/personality-less despite the font itself not being a cliché — the fix isn't a new typeface (chasing a "more authentic-feeling" font is the same treadmill as the color hunt: today's escape-hatch font is tomorrow's cliché), it's using the existing system with more conviction. A bold, large-scale monospace headline is a genuine, legible signal — "this person thinks in systems" — which lines up directly with how Joey described himself: always thinking about scalability, and a "fine, I'll do it myself" instinct when faced with half-finished solutions. Plex Sans stays for body copy where mono would hurt readability at length.

## Layout & rhythm

**2026-09-23**: the first mockup read as "a PDF or a slideshow" — a fair, specific critique. The cause wasn't decoration (there wasn't any) or the wrong layout primitive (repeating one primitive is normally a strength, per this system's own rule) — it was using the *identical* skeleton with zero variation five times down the page: same small mono eyebrow label top-left, same fixed content column, same container width, every single section. No scale contrast, no asymmetry, nothing to interrupt the rhythm. That sameness is what made it feel like paginated slides rather than a real page. Fix is structural, not ornamental — bold through scale and asymmetry, still flat, still no glow/gradient/shadow:

- **Hero breaks the shared template entirely.** No small eyebrow label + column here — an oversized, bold Plex Mono headline allowed to run close to the viewport edges, not politely contained in the same 560px column every other section uses.
- **Hero photo treatment, revised 2026-09-23 (second revision — full-bleed, not a side panel).** Joey's own correction, and a fair one: this is a personal portfolio, not a SaaS product page — the person should be front and center, not boxed into a side column like an afterthought. The photo is now the hero's full-bleed background, with the name and headline overlapping it directly, not split into two separate zones. This needs a dark scrim/gradient directly behind the text area for legibility — that's a functional necessity (contrast/accessibility), distinct from and not a violation of the "no decorative gradients" rule elsewhere in this file; it exists because text needs to read over a photo, not because it looks nice. Still a placeholder (same "don't fake it" rule as the About section — no real headshot exists yet; this is not the powerlifting podium photo, which stays in About). Whenever the real photo is shot, composition matters: subject positioned off-center with genuine negative space for the name/headline to sit in, not centered filling the whole frame. Joey's name is now a first-class hero element too — it was previously only a small link in the nav bar, which undersold it for a site whose whole point is making him memorable.
- **Section numbers become large background numerals, not repeated small labels.** Replace the identical top-left "01 / About", "02 / Work" pattern with a large, low-opacity oversized numeral bleeding behind or beside the section content — kills the "next slide" feeling that the identical small label produced every time.
- **Uneven emphasis across the three case studies, not three equal boxes.** Per this system's own text principle (spend disproportionate space on what matters, don't give everything equal weight) — let at least one case study run larger/more detailed than the other two, rather than three uniform cards of matching height.
- **At least one full-bleed, edge-to-edge moment** that deliberately breaks the centered max-width container (a divider, the GitHub contribution graph, or a section transition) — so the page isn't one continuous centered column top to bottom.
- Still no gradients beyond the one spec'd hero glow, no glassmorphism, no added shadows — the boldness comes from scale and asymmetry, not from decoration. Confident and busy are not the same thing.

## Shape & surface

- Border radius: 6px (buttons/inputs), 10px (cards). Nothing pill-shaped except genuinely circular elements (avatar, icon-only button).
- No backdrop-blur, no glassmorphism, no glow-under-rounded-rectangle (the specific pattern Anthropic's own Claude Design tool defaults to, per its own documentation).
- Flat surfaces, distinguished by the border + surface-color step, not shadows.
- Generous whitespace; deliberate variation in emphasis and scale between sections (see Layout & rhythm above) rather than one unvaried template repeated.

## Icons

No emoji-in-pastel-circle, no default Lucide "five" (Zap/Shield/Sparkles/Check/BarChart3) as decoration. If icons are used at all, monochrome line icons, subordinate to real content — a real number in Plex Mono beats a decorative icon making the same claim.

## Explicit avoid-list (checked against AI Slop Specialist)

- Indigo/violet default accent
- Multi-hue aurora/mesh gradients
- Glassmorphism (`backdrop-blur`, translucent white panels)
- Inter as the only typeface
- Warm-cream-background + serif headline (the 2026 counter-cliché)
- Rounded-full / pill-everything, glow-under-rounded-rectangle
- Bento grid without content that actually differs in type per cell
- Checkmark-bullet feature lists / icon-in-rounded-square feature cards as filler

## Photos

Real photos, monochrome, never cut out. Each portrait is a duotone in the palette's own two ends (`#16140F` shadows → `#DED6C8` highlights, capped below the headline's `#F2ECE1` so a face never outshines the text). In the hero, a CSS radial `mask-image` fades the photo's edges into the page. Pipeline and scripts: `design-reference/README.md`.

Why not cutouts (tried 2026-10-03, all rejected): a crisp background-removed cutout read as a cardboard stand-up; darkening its edges into the page read as "sinking into the background"; standing it on a panel was workable but busier. A cutout's silhouette edge always gives it away, and a real photo with a soft fade has no edge.

## Status

Implemented in `frontend-web/` (2026-10-03), ported from the Claude Design mockup in `design-reference/`. `app/globals.css` `@theme` mirrors the color tokens above — change both together.
