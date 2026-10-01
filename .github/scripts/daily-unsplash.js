const fs = require('fs');
const path = require('path');

const zlib = require('zlib');

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hexToHsl(hex) {
  if (!hex) return { h: 165, s: 50, l: 27 };
  const sh = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(sh, (m, r, g, b) => r + r + g + g + b + b);
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!match) return { h: 165, s: 50, l: 27 };

  const r = parseInt(match[1], 16);
  const g = parseInt(match[2], 16);
  const b = parseInt(match[3], 16);

  const { h, s, l } = rgbToHsl(r, g, b);
  const effectiveHue = s < 10 ? 165 : h;
  const effectiveSat = s < 10 ? 50 : s;

  return { h: effectiveHue, s: effectiveSat, l };
}

function decodePngPixels(pngBuffer) {
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idatChunks = [];

  while (offset < pngBuffer.length) {
    const len = pngBuffer.readUInt32BE(offset);
    const type = pngBuffer.slice(offset + 4, offset + 8).toString('ascii');
    if (type === 'IHDR') {
      width = pngBuffer.readUInt32BE(offset + 8);
      height = pngBuffer.readUInt32BE(offset + 12);
      colorType = pngBuffer[offset + 17];
    } else if (type === 'IDAT') {
      idatChunks.push(pngBuffer.slice(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const stride = width * bytesPerPixel;
  const pixels = [];

  let prevScanline = Buffer.alloc(stride);
  let srcPos = 0;

  for (let row = 0; row < height; row++) {
    const filter = decompressed[srcPos++];
    const currentScanline = Buffer.alloc(stride);

    for (let col = 0; col < stride; col++) {
      const raw = decompressed[srcPos++];
      const a = col >= bytesPerPixel ? currentScanline[col - bytesPerPixel] : 0;
      const b = prevScanline[col];
      const c = col >= bytesPerPixel ? prevScanline[col - bytesPerPixel] : 0;

      let val = raw;
      if (filter === 1) {
        val = (raw + a) & 0xff;
      } else if (filter === 2) {
        val = (raw + b) & 0xff;
      } else if (filter === 3) {
        val = (raw + Math.floor((a + b) / 2)) & 0xff;
      } else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (raw + pr) & 0xff;
      }
      currentScanline[col] = val;
    }

    for (let col = 0; col < width; col++) {
      const pxOffset = col * bytesPerPixel;
      const r = currentScanline[pxOffset];
      const g = currentScanline[pxOffset + 1];
      const b = currentScanline[pxOffset + 2];
      pixels.push({ r, g, b });
    }

    prevScanline = currentScanline;
  }

  return pixels;
}

function formatThemeColors(hsl) {
  const lightS = Math.min(90, Math.max(55, hsl.s));
  const lightL = Math.min(38, Math.max(25, hsl.l < 15 ? 30 : hsl.l > 85 ? 32 : hsl.l));
  const darkS = Math.min(100, Math.max(70, hsl.s));
  const darkL = Math.min(75, Math.max(55, hsl.l < 15 ? 65 : hsl.l > 85 ? 70 : hsl.l));
  return {
    light: `hsl(${hsl.h}, ${lightS}%, ${lightL}%)`,
    dark: `hsl(${hsl.h}, ${darkS}%, ${darkL}%)`
  };
}

async function extractThemeColorsFromImage(rawImageUrl, fallbackHex) {
  if (rawImageUrl) {
    try {
      const tinyUrl = `${rawImageUrl.replace(/&w=\d+/, '')}&w=48&fm=png&q=40`;
      const res = await fetch(tinyUrl);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const pixels = decodePngPixels(buf);

        const scoredColors = [];
        for (const { r, g, b } of pixels) {
          const hsl = rgbToHsl(r, g, b);
          if (hsl.s >= 12 && hsl.l >= 12 && hsl.l <= 88) {
            const chromaScore = hsl.s;
            const lightnessScore = 100 - Math.abs(hsl.l - 50);
            const score = chromaScore * 1.5 + lightnessScore;
            scoredColors.push({ hsl, score });
          }
        }

        if (scoredColors.length > 0) {
          const buckets = Array(18).fill(0).map(() => ({ totalScore: 0, items: [] }));
          for (const item of scoredColors) {
            const bIdx = Math.floor(item.hsl.h / 20) % 18;
            buckets[bIdx].totalScore += item.score;
            buckets[bIdx].items.push(item);
          }

          buckets.sort((a, b) => b.totalScore - a.totalScore);
          const topBucket = buckets[0];
          topBucket.items.sort((a, b) => b.score - a.score);

          return formatThemeColors(topBucket.items[0].hsl);
        }
      }
    } catch (err) {
      console.warn('Direct image color extraction fallback:', err.message);
    }
  }

  const fallbackHsl = hexToHsl(fallbackHex);
  return formatThemeColors(fallbackHsl);
}

const COLLECTION_ID = 'LqO9knU9z2A';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'unsplash-today.json');
const NEXT_FILE = path.join(PUBLIC_DIR, 'unsplash-next.json');
const HISTORY_FILE = path.join(PUBLIC_DIR, 'unsplash-history.json');
const MOBILE_HISTORY_FILE = path.join(PUBLIC_DIR, 'unsplash-mobile-history.json');
const MAX_HISTORY_LENGTH = 150;

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
      outputData.themeColors = await extractThemeColorsFromImage(selectedPhoto.urls?.raw || selectedPhoto.urls?.full, selectedPhoto.color);

      history.push(selectedPhoto.id);
      if (history.length > MAX_HISTORY_LENGTH) {
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
      outputData.themeColors = existingToday?.themeColors || { light: "hsl(165, 50%, 27%)", dark: "hsl(165, 100%, 65%)" };
    }

    // ---- Mobile Portrait Wallpaper Selection ----
    if (shouldUpdateMobile) {
      // 1. Check if a staged mobile wallpaper is queued in unsplash-next.json
      let stagedNext = null;
      if (fs.existsSync(NEXT_FILE)) {
        try {
          stagedNext = JSON.parse(fs.readFileSync(NEXT_FILE, 'utf8'));
        } catch (e) {
          console.warn('Failed to parse unsplash-next.json:', e);
        }
      }

      if (stagedNext && stagedNext.mobile && stagedNext.mobile.id && stagedNext.mobile.url) {
        console.log(`Using user-staged mobile wallpaper pick from unsplash-next.json: ${stagedNext.mobile.id}`);
        outputData.mobile = {
          ...stagedNext.mobile,
          updatedAt: new Date().toISOString()
        };

        mobileHistory.push(stagedNext.mobile.id);
        if (mobileHistory.length > MAX_HISTORY_LENGTH) {
          mobileHistory.shift();
        }
        fs.writeFileSync(MOBILE_HISTORY_FILE, JSON.stringify(mobileHistory, null, 2), 'utf8');

        // Clear or reset the staged mobile wallpaper
        try {
          fs.writeFileSync(NEXT_FILE, JSON.stringify({}, null, 2), 'utf8');
          console.log('Cleared unsplash-next.json after successfully applying staged mobile wallpaper.');
        } catch (e) {
          console.warn('Failed to reset unsplash-next.json:', e);
        }
      } else {
        // Fallback to random candidate from collection
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
        if (mobileHistory.length > MAX_HISTORY_LENGTH) {
          mobileHistory.shift();
        }
        fs.writeFileSync(MOBILE_HISTORY_FILE, JSON.stringify(mobileHistory, null, 2), 'utf8');
      }
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
