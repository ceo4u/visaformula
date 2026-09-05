import { GoogleGenAI } from '@google/genai';
import { getSourcesForCountry, validateHostname, getSourceByHostname } from './registry';
import type { SourceAuthority } from './types';
import fs from 'fs';
import path from 'path';

export interface DiscoveredSource {
  url: string;
  hostname: string;
  title: string;
  authority: SourceAuthority;
  priority: number;
  visaPath?: string;
  retrievedAt: string;
}

const resolveGeminiApiKey = (): string => {
  let key = (
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  )?.trim();
  if (key) return key;

  try {
    for (const f of ['.env', '.env.local']) {
      const envPath = path.resolve(process.cwd(), f);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/^(?:GEMINI_API_KEY|NEXT_PUBLIC_GEMINI_API_KEY|PUBLIC_GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(.*)$/m);
        if (match) {
          key = match[1].trim().replace(/^["']|["']$/g, '');
          if (key) return key;
        }
      }
    }
  } catch (err) {}
  return '';
};

export async function discoverOfficialSource(
  fromCountry: string,
  toCountry: string,
  purpose: string
): Promise<DiscoveredSource | null> {
  const registeredSources = getSourcesForCountry(toCountry);
  if (registeredSources.length === 0) return null;

  const apiKey = resolveGeminiApiKey();
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const domainQueries = registeredSources.map(s => `site:${s.hostname}`);
      const prompt = `
Search for visa requirements for ${fromCountry} passport holders to ${toCountry} for ${purpose}.

Return ONLY from these domains: ${registeredSources.map(s => s.hostname).join(', ')}

Return format:
URL: [full URL]
Title: [page title]
Hostname: [exact hostname]
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: prompt,
        config: {
          temperature: 0.0,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || '';
      if (!text.includes('NO_OFFICIAL_SOURCE_FOUND')) {
        const urlMatch = text.match(/URL:\s*(https?:\/\/[^\s]+)/i);
        if (urlMatch) {
          const url = urlMatch[1];
          try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase().replace(/^www\./, '');

            if (validateHostname(hostname)) {
              const sourceEntry = getSourceByHostname(hostname);
              if (sourceEntry) {
                const titleMatch = text.match(/Title:\s*([^\n]+)/i);
                const title = titleMatch ? titleMatch[1].trim() : url;
                return {
                  url,
                  hostname,
                  title,
                  authority: sourceEntry.authority,
                  priority: sourceEntry.priority,
                  visaPath: sourceEntry.visaPath,
                  retrievedAt: new Date().toISOString()
                };
              }
            }
          } catch (e) {
            console.warn(`[SourceDiscoverer] Invalid URL generated: ${url}`);
          }
        }
      }
    } catch (error) {
      console.warn('[SourceDiscoverer] Search tool exception, falling back to top registry source:', error);
    }
  }

  // Fallback to top priority registered source
  const topSource = registeredSources.sort((a, b) => a.priority - b.priority)[0];
  const url = topSource.url + (topSource.visaPath && topSource.visaPath !== '/' ? topSource.visaPath : '');
  return {
    url,
    hostname: topSource.hostname.replace(/^www\./, ''),
    title: topSource.name,
    authority: topSource.authority,
    priority: topSource.priority,
    visaPath: topSource.visaPath,
    retrievedAt: new Date().toISOString()
  };
}
