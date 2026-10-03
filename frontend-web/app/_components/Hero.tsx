import Image from "next/image";
import { CV_HREF, hasCv } from "@/lib/cv";
import heroPhoto from "@/public/images/hero/joey-hero.png";

/** The real photo (no cutout), duotoned to the palette, edges faded into the page. */
function Portrait() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] md:bottom-0 md:left-auto md:h-auto md:w-[58%] lg:w-[52%]">
      <Image
        src={heroPhoto}
        alt="Joey Pang smiling, in a black shirt"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1024px) 52vw, (min-width: 768px) 58vw, 100vw"
        className="object-cover object-[50%_30%] [mask-image:radial-gradient(ellipse_46%_52%_at_52%_44%,black_30%,transparent_100%)]"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[min(92vh,980px)] flex-col overflow-hidden bg-sunken">
      {/* Single permitted hero glow (DESIGN.md), placed behind the portrait. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_55%_at_74%_52%,rgb(193_39_45/0.10),rgb(193_39_45/0)_70%)]"
      />

      {/* Legibility scrims: functional, not decorative (DESIGN.md › hero photo). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(22_20_15/0.92)_0%,rgb(22_20_15/0.7)_36%,rgb(22_20_15/0)_60%)] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(0deg,rgb(22_20_15/0.95)_0%,rgb(22_20_15/0.6)_45%,rgb(22_20_15/0)_100%)] md:h-[35%]"
      />

      <div className="gutter relative isolate flex flex-1 flex-col justify-end pt-[46vh] md:pt-[clamp(72px,10vw,140px)] pb-[clamp(40px,5vw,64px)]">
        <Portrait />
        <div className="flex items-center gap-2.5 font-mono text-[13px] text-ink-2">
          <span className="size-2 flex-none rounded-full bg-accent" />
          <span>London or remote</span>
        </div>
        <h1 className="mt-[clamp(16px,2vw,24px)] font-mono text-[clamp(52px,10vw,168px)] leading-[0.9] font-bold tracking-[-0.06em] text-ink">
          Joey Pang
        </h1>
        <p className="mt-[clamp(20px,2.4vw,32px)] max-w-[1000px] font-mono text-[clamp(28px,4.2vw,68px)] leading-[1.02] font-bold tracking-[-0.045em] text-balance md:max-w-[52%]">
          Small, measured increments. <span className="text-ink-2">I don&apos;t cut corners.</span>
        </p>
        <div className="mt-[clamp(24px,3vw,36px)] max-w-[620px]">
          <p className="text-[clamp(17px,1.5vw,20px)] leading-normal text-pretty text-ink">
            Full-stack engineer, ready for a graduate role that ships to real users.
          </p>
          <p className="mt-2.5 font-mono text-sm text-ink-2">
            BSc Computer Science · First Class Honours · Brunel University London, 2026
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex h-12 items-center rounded-control bg-accent px-[22px] text-[15px] font-medium text-ink hover:bg-accent-strong hover:text-ink"
            >
              Read the case studies
            </a>
            {hasCv ? (
              <a
                href={CV_HREF}
                download
                className="inline-flex h-12 items-center rounded-control border border-line bg-canvas px-[22px] text-[15px] font-medium text-ink hover:bg-raised hover:text-ink"
              >
                Download CV (PDF)
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-control border border-line bg-canvas px-[22px] text-[15px] font-medium text-ink hover:bg-raised hover:text-ink"
              >
                Get in touch
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-line bg-canvas/90">
        <div className="gutter py-6">
          <div className="font-mono text-[clamp(32px,3.6vw,52px)] leading-[1.1] font-bold tracking-[-0.04em]">1,188</div>
          <div className="text-sm text-ink-2">automated tests · SticksNBoulders</div>
        </div>
        <div className="gutter py-6">
          <div className="font-mono text-[clamp(32px,3.6vw,52px)] leading-[1.1] font-bold tracking-[-0.04em]">5</div>
          <div className="text-sm text-ink-2">active client engagements · WebSprint</div>
        </div>
      </div>
    </section>
  );
}
