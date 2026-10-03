import { getLastUpdated } from "@/lib/github";
import { site } from "@/lib/site";

export async function Footer() {
  const updated = await getLastUpdated();
  return (
    <footer className="border-t border-line">
      <div className="gutter flex flex-wrap justify-between gap-x-6 gap-y-2 py-6 font-mono text-xs text-ink-3">
        <span>© {new Date().getFullYear()} {site.name}</span>
        {updated && (
          <span>
            Last updated{" "}
            {new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        )}
      </div>
    </footer>
  );
}
