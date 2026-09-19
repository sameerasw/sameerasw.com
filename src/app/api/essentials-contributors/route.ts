import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type?: string;
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

    let res = await fetch(
      "https://api.github.com/repos/sameerasw/essentials/contributors?per_page=50",
      { headers, next: { revalidate: 86400 } }
    );

    if (
      (res.status === 401 || res.status === 403) &&
      headers["Authorization"]
    ) {
      const publicHeaders = { ...headers };
      delete publicHeaders["Authorization"];
      res = await fetch(
        "https://api.github.com/repos/sameerasw/essentials/contributors?per_page=50",
        { headers: publicHeaders, next: { revalidate: 86400 } }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "GitHub API error fetching contributors" },
        { status: res.status }
      );
    }

    const contributors: GitHubContributor[] = await res.json();

    const filtered = contributors
      .filter(
        (c) =>
          c.login.toLowerCase() !== "sameerasw" &&
          c.type !== "Bot" &&
          !c.login.toLowerCase().endsWith("[bot]")
      )
      .slice(0, 10)
      .map((c) => ({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        contributions: c.contributions,
      }));

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contributors" },
      { status: 500 }
    );
  }
}
