import type { ReactNode } from "react";

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-xs text-ink-2">
      {items.map((t) => (
        <span key={t} className="rounded-control border border-line px-2 py-0.5">
          {t}
        </span>
      ))}
    </div>
  );
}

/** C / A / S / E part label used inside every case study. */
export function PartLabel({ letter, children }: { letter: string; children: ReactNode }) {
  return (
    <div className="font-mono text-[13px] text-ink-3">
      <span className="font-bold text-accent">{letter}</span>
      {"  "}
      {children}
    </div>
  );
}

export function Stat({
  value,
  label,
  size = "md",
  accent = false,
}: {
  value: ReactNode;
  label: string;
  size?: "md" | "lg";
  accent?: boolean;
}) {
  return (
    <div className="font-mono">
      <div
        className={`font-bold leading-[1.15] tracking-[-0.03em] ${size === "lg" ? "text-[30px]" : "text-[26px]"} ${accent ? "text-accent" : ""}`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-xs text-ink-3">{label}</div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="font-mono text-[13px] text-accent">{children}</div>;
}
