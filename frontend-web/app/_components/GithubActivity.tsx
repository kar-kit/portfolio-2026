import { getContributions, getPinnedRepos, type ContributionDay } from "@/lib/github";
import { site } from "@/lib/site";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function level(c: number) {
  if (c === 0) return "bg-raised";
  if (c <= 2) return "bg-accent-muted";
  if (c <= 5) return "bg-[#7a2124]";
  if (c <= 9) return "bg-accent";
  return "bg-accent-strong";
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function relative(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;
  return `Updated ${fmtDate(iso)}`;
}

function streaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Today often has no commits yet; don't let that zero out the current streak.
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  let current = 0;
  for (; i >= 0 && days[i].count; i--) current++;
  return { active: days.filter((d) => d.count).length, longest, current };
}

export async function GithubActivity() {
  const [calendar, repos] = await Promise.all([getContributions(), getPinnedRepos()]);
  const days = calendar?.weeks.flat() ?? [];
  const s = streaks(days);
  const monthLabels =
    calendar?.weeks.flatMap((w, i) => {
      const first = w[0] && new Date(w[0].date);
      return first && first.getUTCDate() <= 7 && i < calendar.weeks.length - 2
        ? [{ col: i + 1, label: MONTHS[first.getUTCMonth()] }]
        : [];
    }) ?? [];

  return (
    <section id="github" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="numeral -top-[0.06em] -left-[0.06em]">
        04
      </div>
      <div className="gutter relative flex flex-wrap items-end justify-between gap-x-10 gap-y-5 pt-[clamp(72px,9vw,128px)] pb-9">
        <div>
          <div className="mb-3.5 font-mono text-[13px] text-accent">Activity · from the GitHub API</div>
          <h2 className="font-mono text-[clamp(34px,5vw,72px)] leading-none font-bold tracking-[-0.045em]">
            {calendar ? `${calendar.total.toLocaleString("en-GB")} contributions` : "On GitHub"}
          </h2>
          <div className="mt-3 text-[15px] text-ink-2">
            {calendar ? "in the last 12 months at " : "Pinned work at "}
            <a href={site.github.url} target="_blank" rel="noopener noreferrer" className="font-mono">
              github.com/{site.github.handle}
            </a>
          </div>
        </div>
        <div className="font-mono text-xs text-ink-3">Refreshed hourly</div>
      </div>

      {calendar && (
        <>
          {/* Full-bleed moment (DESIGN.md › Layout & rhythm). */}
          <div className="relative overflow-x-auto border-y border-line bg-sunken">
            <div className="gutter min-w-[760px] pt-6 pb-5">
              <div
                className="grid h-5 gap-x-[3px] font-mono text-[11px] text-ink-3"
                style={{ gridTemplateColumns: `repeat(${calendar.weeks.length},minmax(0,1fr))` }}
              >
                {monthLabels.map((m) => (
                  <span key={m.col} className="row-start-1" style={{ gridColumn: `${m.col} / span 4` }}>
                    {m.label}
                  </span>
                ))}
              </div>
              <div
                className="grid gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${calendar.weeks.length},minmax(0,1fr))` }}
              >
                {calendar.weeks.map((w, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {w.map((d) => (
                      <span
                        key={d.date}
                        title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${fmtDate(d.date)}`}
                        className={`block aspect-square w-full rounded-[2px] ${level(d.count)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3.5 flex items-center justify-end gap-1 font-mono text-[11px] text-ink-3">
                <span className="mr-1">Less</span>
                {[0, 1, 3, 6, 10].map((c) => (
                  <span key={c} className={`size-[11px] rounded-[2px] ${level(c)}`} />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] border-b border-line">
            {[
              [s.active, "active days"],
              [`${s.longest} d`, "longest streak"],
              [`${s.current} d`, "current streak"],
            ].map(([v, l]) => (
              <div key={l} className="gutter py-5">
                <div className="font-mono text-[28px] font-bold tracking-[-0.03em]">{v}</div>
                <div className="text-[13px] text-ink-3">{l}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="gutter relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 pt-9 pb-[clamp(72px,9vw,120px)]">
        {repos.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank" rel="noopener noreferrer"
            aria-label={`${r.name} on GitHub (opens in a new tab)`}
            className="flex flex-col gap-2 rounded-card border border-line bg-surface px-[22px] py-5 text-ink hover:bg-raised hover:text-ink"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[15px] font-bold tracking-[-0.02em]">{r.name}</span>
              <span className="rounded-control border border-line px-1.5 font-mono text-[11px] text-ink-3">Public</span>
            </div>
            <p className="flex-1 text-sm text-pretty text-ink-2">{r.description ?? "This site. Built in public."}</p>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-ink-3">
              {r.language && <span>{r.language}</span>}
              {r.stars > 0 && <span>★ {r.stars}</span>}
              {r.commits !== null && <span>{r.commits.toLocaleString("en-GB")} commits</span>}
              <span>{relative(r.pushedAt)}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
