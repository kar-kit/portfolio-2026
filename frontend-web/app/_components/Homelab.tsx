import type { ReactNode } from "react";
import { Tags } from "./ui";

// Sanitized on purpose — no IPs, hostnames, SSIDs or auth details. See repo AGENTS.md before editing.

function Story({ n, title, diagram, children }: { n: string; title: string; diagram: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-[clamp(22px,2.6vw,28px)]">
      <div className="font-mono text-[13px] text-accent">{n}</div>
      <h3 className="font-mono text-[clamp(18px,1.6vw,21px)] leading-[1.2] font-bold tracking-[-0.03em]">{title}</h3>
      <div aria-hidden className="rounded-control border border-line bg-canvas p-3.5 font-mono text-[11px] text-ink-3">
        {diagram}
      </div>
      {children}
    </div>
  );
}

function Node({ title, sub, gpu = false }: { title: string; sub: string; gpu?: boolean }) {
  return (
    <div className={`min-w-0 rounded-control border bg-canvas px-3 py-2.5 font-mono ${gpu ? "border-accent" : "border-line"}`}>
      <div className="text-[13px] font-semibold wrap-anywhere text-ink">{title}</div>
      <div className="mt-0.5 text-[11px] text-ink-3">{sub}</div>
    </div>
  );
}

function Column({ label, grow = 1, children }: { label: string; grow?: number; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2" style={{ flex: `${grow} 1 0` }}>
      <div className="font-mono text-[11px] tracking-[0.06em] text-ink-3 uppercase">{label}</div>
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="flex flex-none items-center self-center px-0.5 font-mono text-sm text-ink-3">
      <span className="block h-px w-[clamp(12px,2vw,28px)] bg-line" />→
    </div>
  );
}

export function Homelab() {
  const body = "text-[15px] text-pretty text-ink-2";
  return (
    <section id="homelab" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="numeral -top-[0.08em] -right-[0.04em]">
        03
      </div>
      <div className="gutter section-y relative mx-auto flex max-w-[1280px] flex-col gap-[clamp(32px,4vw,48px)]">
        <div className="max-w-[760px]">
          <h2 className="font-mono text-[clamp(34px,5vw,72px)] leading-none font-bold tracking-[-0.045em]">Homelab</h2>
          <p className="mt-[18px] text-[clamp(16px,1.3vw,18px)] text-pretty text-ink-2">
            Everything self-hosted behind MemoAI and WebSprint runs on hardware I built and maintain myself: a Proxmox
            hypervisor, a TrueNAS storage box, and a handful of VMs and containers. It&apos;s also where most of the
            systems instincts above actually came from.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-[clamp(16px,2vw,24px)]">
          <Story
            n="01"
            title="Right-sizing compute"
            diagram={
              <div className="flex items-center gap-3">
                <div className="flex flex-[1.4] flex-col gap-1.5">
                  <div className="flex h-11 flex-col overflow-hidden rounded border border-ink-3">
                    <div className="h-2.5 border-b border-line bg-raised" />
                  </div>
                  <span>Ubuntu VM + desktop</span>
                </div>
                <span className="text-sm">→</span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex h-11 items-end gap-1.5">
                    <div className="h-[22px] flex-1 rounded border border-accent" />
                    <div className="h-[22px] flex-1 rounded border border-accent" />
                  </div>
                  <span>2 × LXC, shell only</span>
                </div>
              </div>
            }
          >
            <p className={body}>
              Started with a full Ubuntu VM just to give an AI agent shell access. It didn&apos;t need a desktop
              environment, just a shell, so I replaced it with two minimal Linux containers.
            </p>
          </Story>

          <Story
            n="02"
            title="Diagnosing a GPU contention bug"
            diagram={
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1">
                  <span>Before · GPU memory</span>
                  <div className="flex h-4 overflow-hidden rounded-[3px] border border-line">
                    <div className="flex flex-[3] items-center border-r border-line bg-raised pl-1.5 text-ink-2">TTS</div>
                    <div className="flex flex-1 items-center bg-accent-muted pl-1.5 text-ink-2">LLM</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span>After · GPU memory</span>
                  <div className="flex h-4 overflow-hidden rounded-[3px] border border-line">
                    <div className="flex flex-1 items-center bg-accent pl-1.5 text-ink">LLM</div>
                  </div>
                </div>
                <span>TTS moved to CPU</span>
              </div>
            }
          >
            <p className={body}>
              A text-to-speech service was silently parking most of a shared GPU&apos;s memory, starving the LLM
              alongside it down to CPU at about 5 minutes per response. Moving TTS to CPU-only freed the GPU and
              dropped that to about 14 seconds.
            </p>
            <div className="flex items-baseline gap-2 border-t border-line pt-3 font-mono">
              <span className="text-[15px] text-ink-3">~5 min →</span>
              <span className="text-[26px] font-bold tracking-[-0.03em]">~14 s</span>
              <span className="text-xs text-ink-3">per response</span>
            </div>
          </Story>

          <Story
            n="03"
            title="One tool per access pattern, not one tool for everything"
            diagram={
              <div className="flex flex-col gap-1.5">
                {["single-writer", "multi-writer, live", "headless automation"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <span className="flex-1 rounded border border-line px-2 py-1 text-ink-2">{p}</span>
                    <span>→</span>
                    <span className="h-[22px] w-[26px] flex-none rounded border border-accent" />
                  </div>
                ))}
              </div>
            }
          >
            <p className={body}>
              Single-writer file access, multi-writer live collaboration and headless automation aren&apos;t the same
              problem. Learned the hard way: file sync and git&apos;s rename semantics don&apos;t mix, and one popular
              network file-sharing protocol can&apos;t even run chmod.
            </p>
          </Story>
        </div>

        <figure className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-line px-[clamp(20px,2.6vw,28px)] py-3.5 font-mono text-xs text-ink-3">
            <span>topology · simplified</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1.5">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] border border-accent" />
                GPU-bound
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] border border-line" />
                CPU / storage
              </span>
            </span>
          </div>
          <div className="overflow-x-auto p-[clamp(20px,2.6vw,28px)]">
            <div className="flex min-w-[760px] items-stretch">
              <Column label="Consumers">
                <Node title="WebSprint sites" sub="Vercel · AI assistant" />
                <Node title="MemoAI" sub="study backend" />
                <Node title="Me, remote" sub="admin" />
              </Column>
              <Arrow />
              <Column label="Edge">
                <Node title="Cloudflare Tunnel" sub="public → inference" />
                <div className="flex-1" />
                <Node title="Tailscale" sub="private mesh · SSH keys" />
              </Column>
              <Arrow />
              <Column label="Proxmox hypervisor" grow={1.7}>
                <div className="grid flex-1 grid-cols-2 gap-2 rounded-control border border-dashed border-line p-2.5">
                  <div className="col-span-2">
                    <Node gpu title="VM · local LLM" sub="GPU passed through" />
                  </div>
                  <Node title="LXC · agent shell" sub="minimal Linux" />
                  <Node title="LXC · agent shell" sub="minimal Linux" />
                  <div className="col-span-2">
                    <Node title="TTS service" sub="CPU-only" />
                  </div>
                </div>
              </Column>
              <Arrow />
              <Column label="Storage">
                <Node title="TrueNAS" sub="storage box" />
                <Node title="Snapshots" sub="scheduled" />
                <Node title="Replication" sub="off-box copy" />
              </Column>
            </div>
          </div>
        </figure>

        <Tags
          items={[
            "VM & container provisioning",
            "Docker & Docker Compose",
            "SSH key-based auth",
            "Tailscale mesh networking",
            "Cloudflare Tunnels",
            "Storage snapshots & replication",
          ]}
        />
      </div>
    </section>
  );
}
