import crypto from 'crypto';
import type { RetrievedContent } from './types';

export function cleanHtmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function computeSha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

export async function fetchSourceContent(
  url: string,
  visaPath?: string
): Promise<RetrievedContent | null> {
  const targetUrl = visaPath && !url.includes(visaPath) ? `${url.replace(/\/+$/, '')}${visaPath}` : url;
  let response: Response | null = null;

  try {
    response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'TravlTik-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: AbortSignal.timeout(8000)
    });
  } catch (fetchErr) {
    if (visaPath && targetUrl !== url) {
      try {
        response = await fetch(url, {
          headers: {
            'User-Agent': 'TravlTik-Bot/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
          },
          signal: AbortSignal.timeout(8000)
        });
      } catch (baseErr) {
        console.warn(`[ContentRetriever] Network timeout/error for ${url}:`, baseErr);
        return null;
      }
    } else {
      console.warn(`[ContentRetriever] Network timeout/error for ${targetUrl}:`, fetchErr);
      return null;
    }
  }

  if (!response || !response.ok) {
    if (visaPath && targetUrl !== url) {
      try {
        const baseResponse = await fetch(url, {
          headers: {
            'User-Agent': 'TravlTik-Bot/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
          },
          signal: AbortSignal.timeout(8000)
        });
        if (baseResponse.ok) {
          const baseHtml = await baseResponse.text();
          if (baseHtml.length >= 500) {
            const cleanContent = cleanHtmlToText(baseHtml);
            return {
              url,
              content: cleanContent,
              contentHash: computeSha256(cleanContent),
              snapshot: cleanContent.slice(0, 5000),
              retrievedAt: new Date().toISOString()
            };
          }
        }
      } catch (e) {}
    }
    console.warn(`[ContentRetriever] HTTP ${response?.status} for ${targetUrl}`);
    return null;
  }

  try {
    const html = await response.text();
    if (html.length < 500) return null;

    const cleanContent = cleanHtmlToText(html);
    const hash = computeSha256(cleanContent);
    const snapshot = cleanContent.slice(0, 5000);

    return {
      url: targetUrl,
      content: cleanContent,
      contentHash: hash,
      snapshot,
      retrievedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`[ContentRetriever] Error parsing content from ${targetUrl}:`, error);
    return null;
  }
}

export function detectSourceChange(oldHash: string, newHash: string): boolean {
  return oldHash !== newHash;
}
