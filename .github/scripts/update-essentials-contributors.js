const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../../public/essentials-contributors.json');
const URL = 'https://api.github.com/repos/sameerasw/essentials/contributors?per_page=50';

async function main() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'sameerasw.com',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(URL, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const contributors = await res.json();
  const filtered = contributors
    .filter(
      (c) =>
        c.login.toLowerCase() !== 'sameerasw' &&
        c.type !== 'Bot' &&
        !c.login.toLowerCase().endsWith('[bot]')
    )
    .slice(0, 15)
    .map((c) => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      contributions: c.contributions,
    }));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(filtered, null, 2), 'utf8');
  console.log('Wrote', OUTPUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
