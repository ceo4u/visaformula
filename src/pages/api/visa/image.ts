// src/pages/api/visa/image.ts
import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import { getStaticCountryHeroImage, normalizeCountrySlug } from '../../../lib/country-hero-images';

export const prerender = false;

// Safe key resolver reading process.env and falling back to .env files
function resolveApiKey(envVarNames: string[]): string {
  for (const name of envVarNames) {
    const val = process.env[name]?.trim();
    if (val) return val;
  }

  try {
    const envFiles = ['.env', '.env.local'];
    for (const f of envFiles) {
      const envPath = path.resolve(process.cwd(), f);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        for (const name of envVarNames) {
          const regex = new RegExp(`^(?:${name})\\s*=\\s*(.*)$`, 'm');
          const match = content.match(regex);
          if (match && match[1]) {
            const clean = match[1].trim().replace(/^["']|["']$/g, '');
            if (clean) return clean;
          }
        }
      }
    }
  } catch (err) {}

  return '';
}

function getUnsplashAccessKey(): string {
  return resolveApiKey([
    'UNSPLASH_ACCESS_KEY',
    'NEXT_PUBLIC_UNSPLASH_ACCESS_KEY',
    'PUBLIC_UNSPLASH_ACCESS_KEY',
    'UNSPLASH_KEY'
  ]);
}

function getPexelsApiKey(): string {
  return resolveApiKey([
    'PEXELS_API_KEY',
    'NEXT_PUBLIC_PEXELS_API_KEY',
    'PUBLIC_PEXELS_API_KEY',
    'PEXELS_KEY'
  ]);
}

// In-Memory Server Cache (TTL: 24 Hours)
interface CacheEntry {
  data: {
    success: boolean;
    source: 'unsplash' | 'pexels' | 'curated_library';
    imageUrl: string;
    alt: string;
    landmark: string;
    photographer?: string;
    country: string;
    purpose: string;
  };
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function fetchHeroImage(countryInput: string, purposeInput: string = 'tourism', customQuery?: string) {
  const countrySlug = normalizeCountrySlug(countryInput || 'united-states');
  const purpose = (purposeInput || 'tourism').toLowerCase();
  const cacheKey = `${countrySlug}:${purpose}:${customQuery || ''}`;

  const now = Date.now();
  const cached = memoryCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const staticFallback = getStaticCountryHeroImage(countrySlug, purpose);
  const countryName = staticFallback.countryName || countryInput;

  // 1. Determine optimal search term based on purpose
  let searchTerm = customQuery?.trim();
  if (!searchTerm) {
    if (purpose.includes('study') || purpose.includes('student') || purpose.includes('education') || purpose.includes('university')) {
      searchTerm = `${countryName} university campus architecture`;
    } else if (purpose.includes('business') || purpose.includes('work') || purpose.includes('corporate')) {
      searchTerm = `${countryName} modern skyline architecture business district`;
    } else {
      searchTerm = `${countryName} ${staticFallback.landmark || 'luxury travel landmark destination'}`;
    }
  }

  // 2. Try Unsplash API
  const unsplashKey = getUnsplashAccessKey();
  if (unsplashKey) {
    try {
      const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&orientation=landscape&per_page=1`;
      const res = await fetch(unsplashUrl, {
        headers: {
          'Authorization': `Client-ID ${unsplashKey}`,
          'Accept-Version': 'v1'
        },
        signal: AbortSignal.timeout(4500)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.results && json.results.length > 0) {
          const photo = json.results[0];
          const rawUrl = photo.urls?.raw;
          const regularUrl = photo.urls?.regular;
          const optimalUrl = rawUrl
            ? `${rawUrl}&w=1600&auto=format&fit=crop&q=85`
            : (regularUrl || staticFallback.url);

          const result = {
            success: true as const,
            source: 'unsplash' as const,
            imageUrl: optimalUrl,
            alt: photo.alt_description || photo.description || `${countryName} ${purpose} Hero View`,
            landmark: staticFallback.landmark,
            photographer: photo.user?.name ? `${photo.user.name} (@${photo.user.username})` : undefined,
            country: countryName,
            purpose
          };

          memoryCache.set(cacheKey, { data: result, expiresAt: now + CACHE_TTL_MS });
          return result;
        }
      } else {
        console.warn(`[ImageAPI] Unsplash returned status ${res.status}`);
      }
    } catch (err: any) {
      console.warn('[ImageAPI] Unsplash fetch failed:', err?.message);
    }
  }

  // 3. Fallback to Pexels API
  const pexelsKey = getPexelsApiKey();
  if (pexelsKey) {
    try {
      const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&orientation=landscape&per_page=1`;
      const res = await fetch(pexelsUrl, {
        headers: {
          'Authorization': pexelsKey
        },
        signal: AbortSignal.timeout(4500)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.photos && json.photos.length > 0) {
          const photo = json.photos[0];
          const optimalUrl = photo.src?.large2x || photo.src?.landscape || photo.src?.original || staticFallback.url;

          const result = {
            success: true as const,
            source: 'pexels' as const,
            imageUrl: optimalUrl,
            alt: photo.alt || `${countryName} ${purpose} Hero View`,
            landmark: staticFallback.landmark,
            photographer: photo.photographer,
            country: countryName,
            purpose
          };

          memoryCache.set(cacheKey, { data: result, expiresAt: now + CACHE_TTL_MS });
          return result;
        }
      } else {
        console.warn(`[ImageAPI] Pexels returned status ${res.status}`);
      }
    } catch (err: any) {
      console.warn('[ImageAPI] Pexels fetch failed:', err?.message);
    }
  }

  // 4. Return Curated 4K Static Fallback
  const result = {
    success: true as const,
    source: 'curated_library' as const,
    imageUrl: staticFallback.url,
    alt: staticFallback.alt,
    landmark: staticFallback.landmark,
    country: countryName,
    purpose
  };

  memoryCache.set(cacheKey, { data: result, expiresAt: now + CACHE_TTL_MS });
  return result;
}

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const country = url.searchParams.get('country') || url.searchParams.get('c') || 'united-states';
    const purpose = url.searchParams.get('purpose') || url.searchParams.get('category') || url.searchParams.get('type') || 'tourism';
    const customQuery = url.searchParams.get('q') || url.searchParams.get('query') || undefined;

    const data = await fetchHeroImage(country, purpose, customQuery);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  } catch (err: any) {
    console.error('[ImageAPI] Error handling GET:', err);
    return new Response(JSON.stringify({
      success: false,
      message: err?.message || 'Failed to fetch country image'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const country = body.country || 'united-states';
    const purpose = body.purpose || body.category || 'tourism';
    const customQuery = body.query || body.q || undefined;

    const data = await fetchHeroImage(country, purpose, customQuery);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  } catch (err: any) {
    console.error('[ImageAPI] Error handling POST:', err);
    return new Response(JSON.stringify({
      success: false,
      message: err?.message || 'Failed to fetch country image'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
