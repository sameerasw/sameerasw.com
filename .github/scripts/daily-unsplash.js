const fs = require('fs');
const path = require('path');

const COLLECTION_ID = 'LqO9knU9z2A';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'unsplash-today.json');
const SCRIPTS_DIR = __dirname;
const HISTORY_FILE = path.join(SCRIPTS_DIR, 'unsplash-history.json');
const MOBILE_HISTORY_FILE = path.join(SCRIPTS_DIR, 'unsplash-mobile-history.json');

async function run() {
  if (!ACCESS_KEY) {
    console.error('Error: UNSPLASH_ACCESS_KEY environment variable is not set.');
    process.exit(1);
  }

  const TARGET = process.env.TARGET || 'both';
  console.log('Target parameter:', TARGET);

  // Load existing today's metadata to keep the non-targeted part
  let existingToday = null;
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      existingToday = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    } catch (e) {
      console.warn('Failed to parse existing unsplash-today.json:', e);
    }
  }

  const shouldUpdateDesktop = TARGET === 'both' || TARGET === 'desktop' || !existingToday;
  const shouldUpdateMobile = TARGET === 'both' || TARGET === 'mobile' || !existingToday;

  try {
    console.log('Fetching photos from collection:', COLLECTION_ID);
    const response = await fetch(`https://api.unsplash.com/collections/${COLLECTION_ID}/photos?per_page=30`, {
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.statusText}`);
    }

    const photos = await response.json();
    if (!photos || photos.length === 0) {
      throw new Error('No photos found in the collection.');
    }

    let outputData = {};

    // ---- Landscape Wallpaper Selection ----
    if (shouldUpdateDesktop) {
      const landscapePhotos = photos.filter(p => p.width > p.height);
      console.log(`Found ${landscapePhotos.length} landscape photo(s) out of ${photos.length} total.`);

      if (landscapePhotos.length === 0) {
        throw new Error('No landscape photos found in the current batch from this collection.');
      }

      let history = [];
      if (fs.existsSync(HISTORY_FILE)) {
        try {
          history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
        } catch (e) {
          console.warn('Failed to parse history file, starting fresh:', e);
        }
      }

      let availablePhotos = landscapePhotos.filter(p => !history.includes(p.id));
      if (availablePhotos.length === 0) {
        console.log('All landscape photos in this batch have been used. Resetting history.');
        history = [];
        availablePhotos = landscapePhotos;
      }

      const selectedPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];

      if (selectedPhoto.links && selectedPhoto.links.download_location) {
        try {
          await fetch(selectedPhoto.links.download_location, {
            headers: {
              'Authorization': `Client-ID ${ACCESS_KEY}`,
              'Accept-Version': 'v1'
            }
          });
          console.log('Unsplash download tracked successfully.');
        } catch (err) {
          console.error('Failed to track download:', err);
        }
      }

      outputData.id = selectedPhoto.id;
      outputData.url = `${selectedPhoto.urls.raw}&w=2560&q=90`;
      outputData.url_full = selectedPhoto.urls.full;
      outputData.author = {
        name: selectedPhoto.user.name,
        username: selectedPhoto.user.username,
        link: `${selectedPhoto.user.links.html}?utm_source=Glance&utm_medium=referral`
      };
      outputData.link = `${selectedPhoto.links.html}?utm_source=Glance&utm_medium=referral`;
      outputData.updatedAt = new Date().toISOString();

      history.push(selectedPhoto.id);
      if (history.length > 15) {
        history.shift();
      }
      fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
    } else {
      console.log('Skipping Desktop Wallpaper update. Preserving existing.');
      outputData.id = existingToday.id || "";
      outputData.url = ""; // Blank URL signals Telegram step to skip desktop message
      outputData.url_full = existingToday.url_full || "";
      outputData.author = existingToday.author || { name: "", username: "", link: "" };
      outputData.link = existingToday.link || "";
      outputData.updatedAt = existingToday.updatedAt || new Date().toISOString();
    }

    // ---- Mobile Portrait Wallpaper Selection ----
    if (shouldUpdateMobile) {
      const portraitPhotos = photos.filter(p => p.height >= p.width);
      const landscapePhotos = photos.filter(p => p.width > p.height);
      console.log(`Found ${portraitPhotos.length} portrait/square photo(s) out of ${photos.length} total.`);

      let mobileHistory = [];
      if (fs.existsSync(MOBILE_HISTORY_FILE)) {
        try {
          mobileHistory = JSON.parse(fs.readFileSync(MOBILE_HISTORY_FILE, 'utf8'));
        } catch (e) {
          console.warn('Failed to parse mobile history file, starting fresh:', e);
        }
      }

      let candidateMobilePhotos = portraitPhotos.length > 0 ? portraitPhotos : landscapePhotos;
      let availableMobilePhotos = candidateMobilePhotos.filter(p => !mobileHistory.includes(p.id));
      if (availableMobilePhotos.length === 0) {
        console.log('All mobile photos in this batch have been used. Resetting mobile history.');
        mobileHistory = [];
        availableMobilePhotos = candidateMobilePhotos;
      }

      const selectedMobilePhoto = availableMobilePhotos[Math.floor(Math.random() * availableMobilePhotos.length)];

      if (selectedMobilePhoto.links && selectedMobilePhoto.links.download_location) {
        try {
          await fetch(selectedMobilePhoto.links.download_location, {
            headers: {
              'Authorization': `Client-ID ${ACCESS_KEY}`,
              'Accept-Version': 'v1'
            }
          });
          console.log('Mobile Unsplash download tracked successfully.');
        } catch (err) {
          console.error('Failed to track mobile download:', err);
        }
      }

      outputData.mobile = {
        id: selectedMobilePhoto.id,
        url: `${selectedMobilePhoto.urls.raw}&w=1080&q=90`,
        url_full: selectedMobilePhoto.urls.full,
        author: {
          name: selectedMobilePhoto.user.name,
          username: selectedMobilePhoto.user.username,
          link: `${selectedMobilePhoto.user.links.html}?utm_source=Glance&utm_medium=referral`
        },
        link: `${selectedMobilePhoto.links.html}?utm_source=Glance&utm_medium=referral`,
        updatedAt: new Date().toISOString()
      };

      mobileHistory.push(selectedMobilePhoto.id);
      if (mobileHistory.length > 15) {
        mobileHistory.shift();
      }
      fs.writeFileSync(MOBILE_HISTORY_FILE, JSON.stringify(mobileHistory, null, 2), 'utf8');
    } else {
      console.log('Skipping Mobile Wallpaper update. Preserving existing.');
      outputData.mobile = {
        id: existingToday.mobile?.id || "",
        url: "", // Blank URL signals Telegram step to skip mobile message
        url_full: existingToday.mobile?.url_full || "",
        author: existingToday.mobile?.author || { name: "", username: "", link: "" },
        link: existingToday.mobile?.link || "",
        updatedAt: existingToday.mobile?.updatedAt || new Date().toISOString()
      };
    }

    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), 'utf8');
    console.log('Successfully completed unsplash selector update.');

  } catch (error) {
    console.error('Error running daily unsplash selector:', error);
    process.exit(1);
  }
}

run();
