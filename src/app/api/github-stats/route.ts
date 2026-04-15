import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour ( hopefuly cause i forgot if this counts in seconds or minutes )

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  stargazers_count: number;
  fork: boolean;
  language: string | null;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

function calcStreaks(days: ContributionDay[]): {
  current: number;
  longest: number;
  totalThisYear: number;
} {

  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const totalThisYear = sorted.reduce((s, d) => s + d.contributionCount, 0);


  let longest = 0;
  let run = 0;
  for (const d of sorted) {
    if (d.contributionCount > 0) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const reversed = [...sorted].reverse();
  let current = 0;
  let started = false;

  for (const d of reversed) {
    if (d.date > today) continue;
    if (d.contributionCount > 0) {
      started = true;
      current++;
    } else if (started) {
      if (d.date === today) continue;
      break;
    }
  }

  return { current, longest, totalThisYear };
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "sameerasw.com",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/sameerasw", { headers }),
      fetch(
        "https://api.github.com/users/sameerasw/repos?per_page=100&type=owner",
        { headers }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    const totalStars = repos.reduce(
      (sum, r) => sum + (r.fork ? 0 : r.stargazers_count),
      0
    );

    const languageCounts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language && !r.fork) {
        languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
      }
    });
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang);

    let current = 0;
    let longest = 0;
    let totalThisYear = 0;
    let graphqlOk = false;

    if (process.env.GITHUB_TOKEN) {
      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
            user(login: "sameerasw") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }`,
        }),
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const weeks: { contributionDays: ContributionDay[] }[] =
          gqlData?.data?.user?.contributionsCollection?.contributionCalendar
            ?.weeks ?? [];

        const allDays: ContributionDay[] = weeks.flatMap((w) => w.contributionDays);

        if (allDays.length > 0) {
          ({ current, longest, totalThisYear } = calcStreaks(allDays));
          graphqlOk = true;
        }
      }
    }

    return NextResponse.json({
      repos: user.public_repos,
      stars: totalStars,
      followers: user.followers,
      topLanguages,
      streak: { current, longest, totalThisYear },
      graphqlOk,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
