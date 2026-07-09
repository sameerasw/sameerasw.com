const fs = require('fs');
const path = require('path');

const PROJECTS = [
  { id: 'essentials', repo: 'sameerasw/essentials' },
  { id: 'airsync-mac', repo: 'sameerasw/airsync-mac' },
  { id: 'my-internet', repo: 'sameerasw/my-internet' },
  { id: 'folder-icons', repo: 'sameerasw/folder-icons' },
  { id: 'zeninternet', repo: 'sameerasw/zeninternet' },
  { id: 'daily', repo: 'sameerasw/Daily' },
  { id: 'canvas', repo: 'sameerasw/Canvas' },
  { id: 'tasks', repo: 'sameerasw/tasks' },
  { id: 'Browser', repo: 'sameerasw/Browser' }
];

const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'project-details.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchWithAuth(url) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'sameerasw.com-updater'
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function run() {
  console.log('Starting GitHub project details update...');
  
  // Read existing file to preserve data in case of API failure
  let projectData = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      projectData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    } catch (e) {
      console.warn('Failed to parse existing project-details.json:', e);
    }
  }

  for (const proj of PROJECTS) {
    try {
      console.log(`Fetching details for ${proj.id} (${proj.repo})...`);
      const repoDetails = await fetchWithAuth(`https://api.github.com/repos/${proj.repo}`);
      
      let totalDownloads = 0;
      let latestVersion = '';
      let latestReleaseAt = repoDetails.pushed_at || repoDetails.updated_at || '';
      
      try {
        const releases = await fetchWithAuth(`https://api.github.com/repos/${proj.repo}/releases?per_page=100`);
        if (releases && Array.isArray(releases)) {
          if (releases.length > 0) {
            latestVersion = releases[0].tag_name || '';
            latestReleaseAt = releases[0].published_at || latestReleaseAt;
          }
          for (const rel of releases) {
            if (rel.assets && Array.isArray(rel.assets)) {
              for (const asset of rel.assets) {
                totalDownloads += (asset.download_count || 0);
              }
            }
          }
        }
      } catch (err) {
        console.warn(`Could not fetch releases for ${proj.id}:`, err.message);
      }

      projectData[proj.id] = {
        id: proj.id,
        repo: proj.repo,
        stars: repoDetails.stargazers_count || 0,
        downloads: totalDownloads,
        latestVersion: latestVersion,
        latestReleaseAt: latestReleaseAt,
        updatedAt: new Date().toISOString()
      };
      
      console.log(`Success ${proj.id}: Stars: ${projectData[proj.id].stars}, Downloads: ${projectData[proj.id].downloads}, Release Date: ${projectData[proj.id].latestReleaseAt}`);
    } catch (err) {
      console.error(`Error updating project ${proj.id}:`, err.message);
      // Fallback: keep existing data if we have it
      if (!projectData[proj.id]) {
        projectData[proj.id] = {
          id: proj.id,
          repo: proj.repo,
          stars: 0,
          downloads: 0,
          latestVersion: '',
          updatedAt: new Date().toISOString()
        };
      }
    }
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projectData, null, 2), 'utf8');
  console.log('Successfully wrote project-details.json');
}

run();
