import type { ReactNode } from "react";
import { Eyebrow, PartLabel, Stat, Tags } from "./ui";

// Copy source of truth: "FINAL Case Study Content" on the Portfolio Website 2026 Notion page.

function Part({ letter, label, lead, rest }: { letter: string; label: string; lead: ReactNode; rest?: ReactNode }) {
  return (
    <div className="border-t border-line px-[clamp(24px,3vw,36px)] py-[22px] text-[15px]">
      <div className="mb-2">
        <PartLabel letter={letter}>{label}</PartLabel>
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="text-pretty">{lead}</p>
        {rest && <p className="text-pretty text-ink-2">{rest}</p>}
      </div>
    </div>
  );
}

function WebSprint() {
  const cell = "flex flex-col gap-3 bg-surface px-[clamp(24px,3vw,40px)] py-7";
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-10 p-[clamp(28px,4vw,56px)]">
        <div className="min-w-0 flex-[1_1_440px]">
          <Eyebrow>01 · Client delivery · self-hosted AI infra</Eyebrow>
          <h3 className="mt-4 font-mono text-[clamp(34px,5.6vw,84px)] leading-[0.98] font-bold tracking-[-0.05em] wrap-anywhere">
            WebSprint
          </h3>
          <p className="mt-5 max-w-[560px] text-lg text-pretty text-ink-2">
            My studio: full-stack sites and AI assistants for owner-operated small businesses. Sites run on Vercel;
            the AI runs on hardware I maintain.
          </p>
          <Tags items={["Next.js", "Sanity", "Vercel", "Proxmox", "Ollama", "Cloudflare Tunnel"]} />
        </div>
        <div className="flex-[0_1_auto] font-mono">
          <div className="text-[clamp(64px,10vw,152px)] leading-[0.9] font-bold tracking-[-0.06em]">5</div>
          <div className="mt-2.5 text-right text-[13px] text-ink-3">active client engagements</div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-px border-t border-line bg-line">
        <div className={cell}>
          <PartLabel letter="C">Context</PartLabel>
          <p className="text-pretty">
            Founded early 2024 for early-stage founders who needed a technical partner instead of managing freelancers
            or hiring a CTO. The focus moved from MVP builds, to fixed-fee Sanity sites on a monthly retainer for small
            businesses and trades, to a 2026 productised offering for course sellers and photo/video studios that
            bundles an AI assistant in place of the separate subscriptions they&apos;d otherwise pay for.
          </p>
          <p className="text-pretty text-ink-2">
            The through-line: owner-operators with no in-house technical capacity who need someone else to fully own
            the technical side.
          </p>
        </div>
        <div className={cell}>
          <PartLabel letter="A">AI workflow</PartLabel>
          <p className="text-pretty">
            A design mockup gets turned into a developer feature spec by an AI agent, which I then review.
          </p>
          <p className="text-pretty text-ink-2">
            On a recent storefront build, that review caught a privacy error (the maker&apos;s private legal name used
            across the site instead of her public one), a brand misspelling carried into the domain and metadata, a
            missing product page, and a feature cut because it didn&apos;t serve the client&apos;s actual goal. For
            outreach, AI drafts every message but a human sends each one by hand.
          </p>
        </div>
        <div className={cell}>
          <PartLabel letter="S">Architecture</PartLabel>
          <p className="text-pretty">
            Client sites deploy on Vercel with Sanity as the CMS. Self-hosted infrastructure exists separately, purely
            for AI inference: a Proxmox homelab with one VM dedicated to a local LLM behind a passed-through GPU,
            reached via a Cloudflare Tunnel.
          </p>
          <p className="text-pretty text-ink-2">
            One shared model serves every client, told apart by system prompt and client knowledge base. Self-hosting
            removes per-token API costs, which is what makes a low monthly retainer with a bundled AI assistant
            profitable. I picked a used RTX 3060 12GB over an RTX 4060 8GB for VRAM and memory bandwidth, the actual
            generation-speed bottleneck.
          </p>
        </div>
        <div className={`${cell} bg-sunken`}>
          <PartLabel letter="E">Evidence</PartLabel>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-x-6 gap-y-[18px]">
            <Stat size="lg" accent value="3 / 4" label="paying clients retained" />
            <Stat size="lg" value="14 mo" label="average retention · longest 23" />
            <Stat size="lg" value="~1.6 wks" label="average build time per site" />
          </div>
          <p className="text-sm text-pretty text-ink-2">
            The one client not retained closed their business about six months after launch.
          </p>
        </div>
      </div>
    </article>
  );
}

function MemoAI() {
  return (
    <article className="min-w-0 flex-[1.45_1_380px] overflow-hidden rounded-card border border-line bg-surface">
      <div className="p-[clamp(24px,3vw,36px)]">
        <Eyebrow>02 · AI engineering · research project</Eyebrow>
        <h3 className="mt-3 font-mono text-[clamp(30px,3.6vw,48px)] leading-none font-bold tracking-[-0.045em]">
          MemoAI
        </h3>
        <p className="mt-3.5 text-pretty text-ink-2">
          A final-year research project testing whether LLMs can lower the barrier to spaced-repetition study tools.
        </p>
        <Tags items={["Python", "FastAPI", "MongoDB", "Ollama", "Next.js"]} />
      </div>
      <Part
        letter="C"
        label="Context"
        lead={
          <>
            Formally titled{" "}
            <span className="text-ink-2">
              &ldquo;Investigating How LLMs Can Reduce the Perceived Effort of Utilising Online Spaced-Repetition Tools
              to Lower the Barrier for Adoption Among University Students.&rdquo;
            </span>
          </>
        }
        rest="Spaced repetition works, but adoption is low because of the perceived effort of making and maintaining flashcards, not disbelief in the method. Anki, Brainscape and Quizlet need manual creation or CSV import, which just relocates the effort, and their paywalled AI features refine existing cards rather than generate from raw lecture material."
      />
      <Part
        letter="A"
        label="AI workflow"
        lead="The backend mediates every LLM call. The frontend never talks to the model directly; only structured data crosses that boundary, which tightens prompting and shrinks the hallucination surface."
        rest="An explicit 80/20 rule: the model does about 80% of deck generation, and the remaining 20% is mandatory human verification before anything saves. Generated content lands in draft entities, never the saved decks, so a hallucination corrupts a draft, not real study material. Full automation was considered and rejected for exactly this reason."
      />
      <Part
        letter="S"
        label="Architecture"
        lead="A single consolidated backend service rather than microservices: a deliberate trade-off for a solo developer on a fixed academic deadline. Web-first frontend."
      />
      <figure className="flex gap-4 border-t border-line px-[clamp(24px,3vw,36px)] py-7">
        <div aria-hidden className="flex-none font-mono text-[56px] leading-[0.8] font-bold text-accent">
          &ldquo;
        </div>
        <blockquote className="text-[clamp(17px,1.5vw,20px)] leading-normal font-medium tracking-[-0.01em] text-pretty">
          AI in education got framed as a cheating problem the moment it showed up in schools, and not enough people
          asked the opposite question: could it actually help people study? The same argument already settled in
          software engineering: AI didn&apos;t replace developers, it became a tool they use.
        </blockquote>
      </figure>
      <div className="flex flex-col gap-4 border-t border-line bg-sunken px-[clamp(24px,3vw,36px)] py-[22px]">
        <PartLabel letter="E">Evidence</PartLabel>
        <p className="text-[15px] text-pretty text-ink-2">
          An ethics-approved study with a counterbalanced design: participants did both manual and AI-assisted
          flashcard creation, in alternating order, to cancel out fatigue and order effects.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-x-6 gap-y-[18px]">
          <Stat value="12" label="recruited students" />
          <Stat value="100%" label="survey completion" />
          <Stat
            value="12 / 12"
            label="“strongly agree” AI generation would make them more likely to use spaced repetition regularly"
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,110px),1fr))] gap-x-6 gap-y-[18px]">
          {[
            ["3.72", "manual creation effort"],
            ["4.54", "AI-assisted effort reduction"],
            ["4.38", "review usability"],
            ["4.71", "perceived effort & adoption"],
          ].map(([v, l]) => (
            <Stat
              key={l}
              value={
                <>
                  {v}
                  <span className="text-[15px] text-ink-3"> /5</span>
                </>
              }
              label={l}
            />
          ))}
        </div>
        <p className="border-t border-line pt-3.5 text-sm text-pretty text-ink-2">
          <span className="text-ink">Limit:</span> no usage beyond the study. The self-hosted inference stack (RTX
          4060, 8GB VRAM) fell back to CPU past around four concurrent users, a real capacity ceiling.
        </p>
      </div>
    </article>
  );
}

function SticksNBoulders() {
  return (
    <article className="min-w-0 flex-[1_1_300px] overflow-hidden rounded-card border border-line bg-surface md:mt-[clamp(0px,5vw,72px)]">
      <div className="p-[clamp(24px,3vw,32px)]">
        <Eyebrow>03 · Full-stack system · testing discipline</Eyebrow>
        <h3 className="mt-3 font-mono text-[clamp(26px,2.8vw,40px)] leading-none font-bold tracking-[-0.045em] wrap-anywhere">
          SticksNBoulders
        </h3>
        <p className="mt-3.5 text-pretty text-ink-2">
          A powerlifting coaching platform replacing RTS, the industry-standard tool most coaches use and most hate.
        </p>
        <Tags items={["Next.js", "React", "TypeScript", "Vitest", "Appwrite"]} />
      </div>
      <div className="flex flex-col gap-3.5 border-t border-line bg-sunken px-[clamp(24px,3vw,32px)] py-5">
        <PartLabel letter="E">Evidence</PartLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,120px),1fr))] gap-x-6 gap-y-[18px]">
          <Stat value="1,188" label="automated tests" />
          <Stat value="2" label="real users today · athlete + coach" />
        </div>
        <p className="text-sm text-pretty text-ink-2">
          Me and my actual coach. Near-term, his other five athletes; by end of year, hopefully three more coaches.
          Small number, but both current users are the real target user.
        </p>
      </div>
      <Part
        letter="C"
        label="Context"
        lead="Most powerlifting coaches use RTS (Reactive Training Systems), priced for high-volume coaching businesses, so beginner coaches and athletes end up sharing accounts."
        rest="The athlete-side workflow was: get a program from RTS, log sets in Strong for its better mobile UI, send the coach videos and RPE notes over WhatsApp because RTS can't attach media to a set, then screenshot the workout into ChatGPT to estimate calories before logging it in Cronometer. Five tools for one session. Coaches retype custom exercise names in full every time because they break RTS's UI. My own coach was ready to go back to Excel."
      />
      <Part
        letter="A"
        label="AI workflow"
        lead="I don't vibe code. AI runs this like a real project: phasing features, separating concurrent work from trivial tweaks, and flagging what needs my coach's input before I build it."
        rest="For tests, I write the first edge-case example by hand, then an agent extends that pattern across the rest in Vitest. I trust the model more on low-stakes, easily checked changes; everything still goes through a PR on a dev→prod branch flow."
      />
      <Part
        letter="S"
        label="Architecture"
        lead="Self-hosted Appwrite on a repurposed gaming PC, not Firebase or Appwrite Cloud."
        rest="I don't know yet if this sees real scale, so a hard resource ceiling forces me to fix inefficient functions instead of paying for more compute. If it takes off, moving to Appwrite Cloud is a data migration, not a backend rewrite."
      />
    </article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="numeral -top-[0.06em] -left-[0.06em]">
        02
      </div>
      <div className="gutter section-y relative mx-auto flex max-w-[1360px] flex-col gap-[clamp(24px,3vw,40px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5 md:pl-[clamp(0px,14vw,200px)]">
          <div className="max-w-[640px]">
            <h2 className="font-mono text-[clamp(34px,5vw,72px)] leading-none font-bold tracking-[-0.045em]">
              Three case studies
            </h2>
            <p className="mt-4 text-pretty text-ink-2">
              Each one covers the problem, how AI tooling was used and checked, the architectural decision and what it
              replaced, and a measured result.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[13px] text-ink-3">
            {[
              ["C", "Context"],
              ["A", "AI workflow"],
              ["S", "System architecture"],
              ["E", "Evidence"],
            ].map(([l, t]) => (
              <span key={l}>
                <span className="font-bold text-accent">{l}</span> {t}
              </span>
            ))}
          </div>
        </div>
        <WebSprint />
        <div className="flex flex-wrap items-start gap-[clamp(20px,2.4vw,32px)]">
          <MemoAI />
          <SticksNBoulders />
        </div>
      </div>
    </section>
  );
}
