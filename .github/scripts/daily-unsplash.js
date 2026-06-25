const fs = require('fs');
const path = require('path');

const COLLECTION_ID = 'LqO9knU9z2A';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'unsplash-today.json');
const SCRIPTS_DIR = __dirname;
const HISTORY_FILE = path.join(SCRIPTS_DIR, 'unsplash-history.json');

async function run() {
  if (!ACCESS_KEY) {
    console.error('Error: UNSPLASH_ACCESS_KEY environment variable is not set.');
    process.exit(1);
  }

  try {
    console.log('Fetching photos from collection:', COLLECTION_ID);
    // Fetch photos from collection (up to 30)
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

    // Load history
    let history = [];
    if (fs.existsSync(HISTORY_FILE)) {
      try {
        history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
      } catch (e) {
        console.warn('Failed to parse history file, starting fresh:', e);
      }
    }

    // Filter out recently used photos
    let availablePhotos = photos.filter(p => !history.includes(p.id));

    // If all photos from the collection have been used, reset history to avoid getting stuck
    if (availablePhotos.length === 0) {
      console.log('All photos in this batch have been used. Resetting history.');
      history = [];
      availablePhotos = photos;
    }

    // Select a random photo
    const selectedPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];

    // Track download to comply with Unsplash API Guidelines
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

    // Build the output metadata
    const outputData = {
      id: selectedPhoto.id,
      url: `${selectedPhoto.urls.raw}&w=2560&q=90`, // 2.5K width, high quality (Retina/4K optimized)
      url_full: selectedPhoto.urls.full,
      author: {
        name: selectedPhoto.user.name,
        username: selectedPhoto.user.username,
        link: `${selectedPhoto.user.links.html}?utm_source=Glance&utm_medium=referral`
      },
      link: `${selectedPhoto.links.html}?utm_source=Glance&utm_medium=referral`,
      updatedAt: new Date().toISOString()
    };

    // Make sure public dir exists
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    // Write outputs
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), 'utf8');
    
    // Update history (keep last 15 items to prevent immediate repeats)
    history.push(selectedPhoto.id);
    if (history.length > 15) {
      history.shift();
    }
    
    if (!fs.existsSync(SCRIPTS_DIR)) {
      fs.mkdirSync(SCRIPTS_DIR, { recursive: true });
    }
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');

    console.log(`Successfully updated daily wallpaper: ${selectedPhoto.id} by ${selectedPhoto.user.name}`);
  } catch (error) {
    console.error('Error running daily unsplash selector:', error);
    process.exit(1);
  }
}

run();
