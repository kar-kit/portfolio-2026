import { site } from "./site";

// Everything here is fetched at build time and revalidated hourly (ISR).
// Without GITHUB_TOKEN the REST calls still work (60 req/h unauthenticated);
// the contribution calendar needs GraphQL, which requires a token, so it
// returns null and the section hides the graph rather than faking one.

const REVALIDATE_SECONDS = 3600;
const PINNED = ["SticksNBoulders", "MemoAI", "portfolio-2026"];

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function getJson<T>(path: string): Promise<{ data: T; res: Response } | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return { data: (await res.json()) as T, res };
  } catch {
    return null;
  }
}

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  commits: number | null;
  pushedAt: string;
  url: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
  default_branch: string;
};

async function countCommits(repo: string, branch: string): Promise<number | null> {
  const result = await getJson<unknown[]>(
    `/repos/${site.github.handle}/${repo}/commits?sha=${branch}&per_page=1`,
  );
  if (!result) return null;
  // With per_page=1, the "last" page number in the Link header is the commit count.
  const last = result.res.headers.get("link")?.match(/[?&]page=(\d+)>; rel="last"/);
  return last ? Number(last[1]) : result.data.length;
}

export async function getPinnedRepos(): Promise<Repo[]> {
  const repos = await Promise.all(
    PINNED.map(async (name) => {
      const result = await getJson<ApiRepo>(`/repos/${site.github.handle}/${name}`);
      if (!result) return null;
      const r = result.data;
      return {
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        commits: await countCommits(r.name, r.default_branch),
        pushedAt: r.pushed_at,
        url: r.html_url,
      } satisfies Repo;
    }),
  );
  return repos.filter((r) => r !== null);
}

export async function getLastUpdated(): Promise<string | null> {
  const result = await getJson<{ commit: { committer: { date: string } } }[]>(
    `/repos/${site.github.handle}/${site.repo}/commits?per_page=1`,
  );
  return result?.data[0]?.commit.committer.date ?? null;
}

export type ContributionDay = { date: string; count: number };
export type Contributions = { total: number; weeks: ContributionDay[][] };

export async function getContributions(): Promise<Contributions | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: site.github.handle } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
      ),
    };
  } catch {
    return null;
  }
}
