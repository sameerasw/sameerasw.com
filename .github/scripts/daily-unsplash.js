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
    console.log('Fetching collection details:', COLLECTION_ID);
    const collectionResponse = await fetch(`https://api.unsplash.com/collections/${COLLECTION_ID}`, {
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    });

    if (!collectionResponse.ok) {
      throw new Error(`Failed to fetch collection details: ${collectionResponse.statusText}`);
    }

    const collection = await collectionResponse.json();
    const totalPhotos = collection.total_photos || 0;
    console.log(`Collection has ${totalPhotos} total photo(s).`);

    const perPage = 30;
    const totalPages = Math.ceil(totalPhotos / perPage) || 1;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    // Shuffle pages to randomize search order and avoid hitting rate limits
    for (let i = pages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pages[i], pages[j]] = [pages[j], pages[i]];
    }
    console.log('Randomized page order for search:', pages);

    let history = [];
    if (fs.existsSync(HISTORY_FILE)) {
      try {
        history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
      } catch (e) {
        console.warn('Failed to parse history file, starting fresh:', e);
      }
    }

    let mobileHistory = [];
    if (fs.existsSync(MOBILE_HISTORY_FILE)) {
      try {
        mobileHistory = JSON.parse(fs.readFileSync(MOBILE_HISTORY_FILE, 'utf8'));
      } catch (e) {
        console.warn('Failed to parse mobile history file, starting fresh:', e);
      }
    }

    let selectedPhoto = null;
    let selectedMobilePhoto = null;

    let allFetchedLandscape = [];
    let allFetchedMobileCandidates = [];

    // Loop over the shuffled pages to find unused photos
    for (const page of pages) {
      const needDesktop = shouldUpdateDesktop && !selectedPhoto;
      const needMobile = shouldUpdateMobile && !selectedMobilePhoto;
      if (!needDesktop && !needMobile) {
        break;
      }

      console.log(`Fetching page ${page}...`);
      const response = await fetch(`https://api.unsplash.com/collections/${COLLECTION_ID}/photos?per_page=${perPage}&page=${page}`, {
        headers: {
          'Authorization': `Client-ID ${ACCESS_KEY}`,
          'Accept-Version': 'v1'
        }
      });

      if (!response.ok) {
        console.warn(`Failed to fetch page ${page}: ${response.statusText}`);
        continue;
      }

      const photos = await response.json();
      if (!photos || photos.length === 0) continue;

      if (needDesktop) {
        const landscapePhotos = photos.filter(p => p.width > p.height);
        allFetchedLandscape.push(...landscapePhotos);
        const availablePhotos = landscapePhotos.filter(p => !history.includes(p.id));
        if (availablePhotos.length > 0) {
          selectedPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
          console.log(`Found unused desktop photo: ${selectedPhoto.id} on page ${page}`);
        }
      }

      if (needMobile) {
        const portraitPhotos = photos.filter(p => p.height >= p.width);
        const landscapePhotos = photos.filter(p => p.width > p.height);
        const candidateMobilePhotos = portraitPhotos.length > 0 ? portraitPhotos : landscapePhotos;
        allFetchedMobileCandidates.push(...candidateMobilePhotos);
        const availableMobilePhotos = candidateMobilePhotos.filter(p => !mobileHistory.includes(p.id));
        if (availableMobilePhotos.length > 0) {
          selectedMobilePhoto = availableMobilePhotos[Math.floor(Math.random() * availableMobilePhotos.length)];
          console.log(`Found unused mobile photo: ${selectedMobilePhoto.id} on page ${page}`);
        }
      }
    }

    let outputData = {};

    // ---- Landscape Wallpaper Selection ----
    if (shouldUpdateDesktop) {
      // If we didn't find any unused photo across all pages, fallback to least recently used
      if (!selectedPhoto) {
        if (allFetchedLandscape.length === 0) {
          throw new Error('No landscape photos found in the collection.');
        }
        console.log('All landscape photos in collection have been used. Selecting the least recently used one.');
        const uniqueLandscape = Array.from(new Map(allFetchedLandscape.map(p => [p.id, p])).values());
        uniqueLandscape.sort((a, b) => history.indexOf(a.id) - history.indexOf(b.id));
        selectedPhoto = uniqueLandscape[0];
        history = history.filter(id => id !== selectedPhoto.id);
      }

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
      outputData.id = existingToday?.id || "";
      outputData.url = existingToday?.url || "";
      outputData.url_full = existingToday?.url_full || "";
      outputData.author = existingToday?.author || { name: "", username: "", link: "" };
      outputData.link = existingToday?.link || "";
      outputData.updatedAt = existingToday?.updatedAt || new Date().toISOString();
    }

    // ---- Mobile Portrait Wallpaper Selection ----
    if (shouldUpdateMobile) {
      // If we didn't find any unused photo across all pages, fallback to least recently used
      if (!selectedMobilePhoto) {
        if (allFetchedMobileCandidates.length === 0) {
          throw new Error('No mobile candidate photos found in the collection.');
        }
        console.log('All mobile photos in collection have been used. Selecting the least recently used one.');
        const uniqueMobile = Array.from(new Map(allFetchedMobileCandidates.map(p => [p.id, p])).values());
        uniqueMobile.sort((a, b) => mobileHistory.indexOf(a.id) - mobileHistory.indexOf(b.id));
        selectedMobilePhoto = uniqueMobile[0];
        mobileHistory = mobileHistory.filter(id => id !== selectedMobilePhoto.id);
      }

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
        id: existingToday?.mobile?.id || "",
        url: existingToday?.mobile?.url || "",
        url_full: existingToday?.mobile?.url_full || "",
        author: existingToday?.mobile?.author || { name: "", username: "", link: "" },
        link: existingToday?.mobile?.link || "",
        updatedAt: existingToday?.mobile?.updatedAt || new Date().toISOString()
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
