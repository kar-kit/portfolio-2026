# design-reference

Source material, not shipped code.

- `joey-pang-portfolio.dc.html` — the original Claude Design mockup (claude.ai/design project `22d0e3fa-…`), kept for reference. It still contains the mockup's placeholder data (an invented email, made-up repo stats, random contribution graph); the real site in `frontend-web/` replaced all of it.
- `photos/` — the scripts that produce the site photos from iPhone originals (macOS, `swiftc -O <file>.swift -o <name>`):
  1. `photo.swift <in.jpg> <out.png>` — monochrome duotone in the palette (`#16140F` → `#DED6C8`).
  2. `crop.swift <in.png> <out.png> <px>` — trim empty space off the top.
  3. `strip.swift <file.png>…` — **always run last.** Re-encodes pixels only. iPhone originals carry GPS EXIF and CoreImage copies it into the output, so nothing goes into `public/` without this step.

  Resize with `sips -Z 2048` between steps 1 and 2. The edge fade is done in CSS (radial `mask-image` in `Hero.tsx`), not baked into the image.
