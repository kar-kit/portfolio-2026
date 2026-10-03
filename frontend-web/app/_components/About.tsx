import Image from "next/image";
import headshot from "@/public/images/about/joey-headshot.png";
import podium from "@/public/images/about/powerlifting-podium.jpg";

const FACTS = [
  ["Degree", "BSc Computer Science, First Class Honours"],
  ["University", "Brunel University London, 2026"],
  ["Based", "London, UK"],
  ["Looking for", "Graduate / junior software engineer roles"],
] as const;

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="numeral -top-[0.08em] -right-[0.04em]">
        01
      </div>
      <div className="gutter section-y relative mx-auto flex max-w-[1280px] flex-wrap items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12">
        <div className="max-w-[680px] min-w-0 flex-[1_1_440px]">
          <div className="mb-5 font-mono text-[13px] text-accent">About</div>
          <p className="text-[clamp(22px,2.2vw,28px)] leading-[1.4] font-medium tracking-[-0.01em] text-pretty">
            I build systems other people rely on, because the work gets interesting once someone else&apos;s day
            depends on it running correctly.
          </p>
          <p className="mt-7 text-pretty text-ink-2">
            Most of what I&apos;ve shipped has had a real user on the other end: a powerlifting coach and his
            athletes logging training, small-business owners whose sites I run, students building flashcards from
            their own lectures. That has shaped how I work. Tests come before features, infrastructure stays boring
            enough that I understand it end to end, and AI tooling is treated as a collaborator whose output gets
            checked rather than trusted.
          </p>
          <p className="mt-4 text-pretty text-ink-2">
            Outside of code I compete in powerlifting, a sport of small, measured increments logged over months.
            It&apos;s roughly how I think about engineering progress too.
          </p>
          <dl className="mt-9 grid grid-cols-[minmax(0,120px)_minmax(0,1fr)] gap-x-5 gap-y-3 border-t border-line pt-5 text-[15px]">
            {FACTS.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="pt-0.5 font-mono text-[13px] text-ink-3">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-[clamp(0px,6vw,96px)] flex min-w-[240px] flex-[0_1_340px] flex-col gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface">
            <Image
              src={headshot}
              alt="Portrait of Joey Pang wearing glasses and a black bomber jacket"
              fill
              sizes="340px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <figure className="flex items-start gap-3">
            <div className="relative aspect-[4/3] flex-[0_0_112px] overflow-hidden rounded-control border border-line">
              <Image src={podium} alt="Joey Pang on the podium at Summer Slam, British Powerlifting, July 2026" fill sizes="112px" className="object-cover grayscale" />
            </div>
            <figcaption className="text-[13px] leading-normal text-ink-3">On the podium at Summer Slam, British Powerlifting, July 2026.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
