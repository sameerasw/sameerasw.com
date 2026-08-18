const fs = require('fs');
const path = require('path');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const USERNAME = process.env.UNSPLASH_USERNAME || 'sameeraswdotcom';
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'photos.json');

async function fetchUserPhotos() {
  if (!ACCESS_KEY) {
    console.error('Error: UNSPLASH_ACCESS_KEY environment variable is not set.');
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('Skipping fetch: Existing photos.json found.');
      return;
    }
    process.exit(1);
  }

  console.log(`Fetching recent photos for Unsplash user: ${USERNAME}...`);

  try {
    const url = `https://api.unsplash.com/users/${USERNAME}/photos?per_page=25&order_by=latest`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    });

    if (!res.ok) {
      throw new Error(`Unsplash API responded with status ${res.status}: ${res.statusText}`);
    }

    const photos = await res.json();
    console.log(`Fetched ${photos.length} photos. Enriching detailed metadata...`);

    // Fetch individual photo details to get location and exif data
    const enrichedPhotos = await Promise.all(
      photos.map(async (photo) => {
        let location = null;
        try {
          const detailRes = await fetch(`https://api.unsplash.com/photos/${photo.id}`, {
            headers: {
              'Authorization': `Client-ID ${ACCESS_KEY}`,
              'Accept-Version': 'v1'
            }
          });
          if (detailRes.ok) {
            const detail = await detailRes.json();
            location = detail.location?.name || detail.location?.city || detail.location?.country || null;
          }
        } catch (e) {
          console.warn(`Could not fetch details for photo ${photo.id}:`, e.message);
        }

        return {
          id: photo.id,
          title: photo.alt_description || photo.description || 'Photography by Sameera',
          description: photo.description || photo.alt_description || '',
          blurUrl: `${photo.urls.raw}&w=40&auto=format&fit=crop&q=30&blur=30`,
          url: `${photo.urls.raw}&w=1000&auto=format&fit=crop&q=80`,
          url_full: photo.urls.full || photo.urls.raw,
          unsplashUrl: `${photo.links.html}?utm_source=Glance&utm_medium=referral`,
          downloadLocation: photo.links.download_location,
          likes: photo.likes || 0,
          createdAt: photo.created_at,
          location: location,
          width: photo.width,
          height: photo.height,
          color: photo.color || null,
        };
      })
    );

    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(enrichedPhotos, null, 2), 'utf8');
    console.log(`Successfully saved ${enrichedPhotos.length} photos with location metadata to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Failed to fetch user photos:', error);
    process.exit(1);
  }
}

fetchUserPhotos();
