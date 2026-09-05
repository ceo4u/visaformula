// src/lib/visa-v3/scraper.ts
import crypto from 'crypto';
import type { ContentSnapshotResult } from './types';
import { extractHostname } from './registry';

export function computeSha256(content: string): string {
  return crypto.createHash('sha256').update(content || '', 'utf8').digest('hex');
}

export function cleanHtmlToText(rawHtml: string): string {
  if (!rawHtml) return '';

  let text = rawHtml
    // Remove scripts and style tags entirely
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    // Remove navigation, header, footer, forms, svgs
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
    // Replace breaks and paragraphs with newlines
    .replace(/<(?:br|p|div|li|tr|h[1-6])\b[^>]*>/gi, '\n')
    // Strip all remaining HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Decode basic HTML entities
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    // Normalize spaces and clean lines
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();

  return text;
}

export async function fetchAndSnapshot(
  url: string,
  timeoutMs = 5000
): Promise<ContentSnapshotResult> {
  const hostname = extractHostname(url);
  const nowIso = new Date().toISOString();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        source_url: url,
        hostname,
        raw_html: '',
        cleaned_content: '',
        content_hash: computeSha256(''),
        content_snapshot: '',
        retrieved_at: nowIso,
        status: 'FETCH_FAILED'
      };
    }

    const raw_html = await res.text();
    const cleaned_content = cleanHtmlToText(raw_html);
    const content_hash = computeSha256(cleaned_content);
    const content_snapshot = cleaned_content.slice(0, 5000);

    if (cleaned_content.length < 500) {
      return {
        source_url: url,
        hostname,
        raw_html,
        cleaned_content,
        content_hash,
        content_snapshot,
        retrieved_at: nowIso,
        status: 'CONTENT_TOO_SHORT'
      };
    }

    return {
      source_url: url,
      hostname,
      raw_html,
      cleaned_content,
      content_hash,
      content_snapshot,
      retrieved_at: nowIso,
      status: 'OK'
    };
  } catch (err: any) {
    return {
      source_url: url,
      hostname,
      raw_html: '',
      cleaned_content: '',
      content_hash: computeSha256(''),
      content_snapshot: '',
      retrieved_at: nowIso,
      status: 'FETCH_FAILED'
    };
  }
}

export { fetchSourceContent, detectSourceChange } from './content-retriever';

