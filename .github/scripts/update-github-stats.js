const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../../public/github-stats.json');
const USER = 'sameerasw';

function calcStreaks(days) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
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
  let current = 0;
  let started = false;
  for (const d of [...sorted].reverse()) {
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

async function main() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'sameerasw.com',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`, { headers }),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`, { headers }),
  ]);
  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API error: ${userRes.status} / ${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  const totalStars = repos.reduce((sum, r) => sum + (r.fork ? 0 : r.stargazers_count), 0);

  const languageCounts = {};
  for (const r of repos) {
    if (r.language && !r.fork) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    }
  }
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([lang]) => lang);

  let streak = { current: 0, longest: 0, totalThisYear: 0 };
  let graphqlOk = false;

  if (process.env.GITHUB_TOKEN) {
    const gqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          user(login: "${USER}") {
            contributionsCollection {
              contributionCalendar {
                weeks { contributionDays { date contributionCount } }
              }
            }
          }
        }`,
      }),
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const weeks = gqlData?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
      const allDays = weeks.flatMap((w) => w.contributionDays);
      if (allDays.length > 0) {
        streak = calcStreaks(allDays);
        graphqlOk = true;
      }
    }
  }

  const output = {
    repos: user.public_repos,
    stars: totalStars,
    followers: user.followers,
    topLanguages,
    streak,
    graphqlOk,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log('Wrote', OUTPUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
