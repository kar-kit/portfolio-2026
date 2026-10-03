"use client";

import { useEffect, useState } from "react";

const NAV = [
  ["about", "About"],
  ["work", "Work"],
  ["homelab", "Homelab"],
  ["github", "Activity"],
  ["contact", "Contact"],
] as const;

export function Header() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      let current = "top";
      for (const id of ["top", ...NAV.map(([id]) => id)]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-canvas">
      <div className="gutter flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 py-3.5">
        <a href="#top" className="font-mono text-[15px] font-bold tracking-[-0.02em] text-ink hover:text-ink">
          joey_pang
        </a>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`border-b py-1 ${active === id ? "border-accent text-accent" : "border-transparent text-ink-2"}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
