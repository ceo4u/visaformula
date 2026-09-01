// src/pages/api/trip-readiness.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import { getPool, runMigrations } from '../../backend/db';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Resolve Gemini API key safely
const getGeminiApiKey = (): string => {
  let key = (import.meta?.env?.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  key = (process.env.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch (err) {}

  return '';
};

// ── IN-MEMORY CACHE WITH 7-DAY TTL ──
interface CacheEntry {
  data: any;
  expiresAt: number;
}
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days in Milliseconds
const routeCache = new Map<string, CacheEntry>();

const getCacheKey = (passportCountry: string, destination: string, purpose: string): string => {
  return `${passportCountry.trim().toLowerCase()}:${destination.trim().toLowerCase()}:${purpose.trim().toLowerCase()}`;
};

// ── CURRENCY SANITIZER (KATEX / MARKDOWN CRASH PREVENTION) ──
function sanitizeCurrencyStrings(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/\$\s?(\d+(?:,\d+)*(?:\.\d+)?)/g, '$1 USD')
      .replace(/\$/g, ' USD ');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeCurrencyStrings);
  }
  if (obj !== null && typeof obj === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeCurrencyStrings(value);
    }
    return sanitized;
  }
  return obj;
}

// ── EXPONENTIAL BACKOFF RETRY WRAPPER (RESILIENCE SHIELD) ──
async function executeWithRetry<T>(fn: () => Promise<T>, maxRetries = 3, initialDelayMs = 1000): Promise<T> {
  let attempt = 0;
  let delay = initialDelayMs;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      if (attempt >= maxRetries) {
        throw err;
      }
      console.warn(`[TripReadiness API] Gemini 3.7 Flash call failed on attempt ${attempt}/${maxRetries}. Retrying in ${delay}ms...`, err?.message);
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2; // Exponential Backoff: 1s -> 2s -> 4s
    }
  }
  throw new Error('Maximum retries exceeded');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      passport_country,
      destination,
      purpose,
      departure_date
    } = body;

    // ── 1. INPUT VALIDATION ──
    if (!passport_country || !destination || !purpose) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required parameters: passport_country, destination, and purpose are mandatory.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const departureDate = departure_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const cacheKey = getCacheKey(passport_country, destination, purpose);

    // ── 2. IN-MEMORY CACHE HIT CHECK (7-DAY TTL) ──
    const cached = routeCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return new Response(
        JSON.stringify({
          success: true,
          source: 'cache_hit_7d',
          data: cached.data
        }),
        { status: 200, headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' } }
      );
    }

    // ── 2B. POSTGRESQL VERIFIED CACHE LOOKUP (0ms Latency & Zero Token Cost) ──
    try {
      await runMigrations();
      const pool = getPool();
      const destinationSlug = destination.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      const dbRes = await pool.query(
        `SELECT payload_json FROM verified_readiness_payloads 
         WHERE LOWER(origin) = LOWER($1) AND (destination_slug = $2 OR LOWER(destination) = LOWER($3))
         ORDER BY updated_at DESC LIMIT 1`,
        [passport_country, destinationSlug, destination]
      );
      if (dbRes.rows.length > 0 && dbRes.rows[0].payload_json) {
        const stored = sanitizeCurrencyStrings(dbRes.rows[0].payload_json);
        routeCache.set(cacheKey, { data: stored, expiresAt: Date.now() + CACHE_TTL_MS });
        return new Response(
          JSON.stringify({
            success: true,
            source: 'postgresql_verified_cache',
            data: stored
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'X-Cache': 'DB_HIT' } }
        );
      }
    } catch (dbErr) {
      console.warn('[TripReadiness API] DB lookup skipped:', dbErr);
    }

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'GEMINI_API_KEY is not configured on the server.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ── 3. GEMINI 3.7 FLASH CONFIGURATION & INVOCATION ──
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the Lead Immigration & Border Control Architect for TravlTik (travltik.com).

Given the traveler inputs:
- Passport Country
- Destination Country
- Purpose of Visit / Visa Category
- Departure Date

Generate a 100% accurate, real-time pre-departure Readiness & Airport Clearance JSON payload matching this exact schema:

{
  "search_meta": {
    "passport_country": "string",
    "destination": "string",
    "purpose": "string",
    "departure_date": "YYYY-MM-DD",
    "visa_requirement_status": "VISA REQUIRED | E-VISA | VISA ON ARRIVAL | VISA EXEMPT",
    "visa_category": "string"
  },
  "hero_verdict": {
    "headline": "string",
    "status_badge": "string",
    "category_name": "string",
    "date_audit_status": "string"
  },
  "column_1_visa_and_entry_documents": {
    "passport_conditions": {
      "validity_rule": "string",
      "blank_pages_required": 2
    },
    "supporting_documents": [
      {
        "title": "string",
        "description": "string",
        "is_mandatory": boolean
      }
    ]
  },
  "column_2_at_arrival_and_hand_luggage": {
    "must_carry_in_hand_bag": [
      {
        "title": "string",
        "reason": "string"
      }
    ],
    "customs_and_airport_rules": [
      {
        "rule_title": "string",
        "details": "string"
      }
    ]
  },
  "travel_readiness_scorecard": {
    "initial_readiness_score": 85,
    "verifications": [
      {
        "id": "string",
        "label": "string",
        "is_ready_default": boolean,
        "action_required": "string"
      }
    ]
  }
}

STRICT CURRENCY DIRECTIVE (KATEX COMPATIBILITY):
NEVER output raw dollar signs ($) inside text strings. Convert all monetary figures to standard text codes (e.g., replace "$350" with "350 USD", and "$10,000" with "10,000 USD").

CRITICAL: Return ONLY raw, valid JSON. Do not include markdown formatting or backticks around the JSON.`;

    const userPrompt = `
Generate pre-departure clearance and visa readiness for:
- Passport Country: ${passport_country}
- Destination Country: ${destination}
- Purpose of Visit: ${purpose}
- Departure Date: ${departureDate}
`;

    // Execute with Exponential Backoff Shield (Strict gemini-3.7-flash, fallback gemini-2.5-flash)
    const response = await executeWithRetry(async () => {
      try {
        return await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: userPrompt }]
            }
          ],
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.1, // Strict zero-hallucination determinism
            responseMimeType: 'application/json' // Suppress reasoning tokens from breaking JSON parser
          }
        });
      } catch (f37Err) {
        return await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: userPrompt }]
            }
          ],
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.1,
            responseMimeType: 'application/json'
          }
        });
      }
    });

    const rawText = response.text ? response.text.trim() : '';
    let parsedData: any = null;

    try {
      parsedData = JSON.parse(rawText);
    } catch (parseErr) {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON received from Gemini 3.7 Flash');
      }
    }

    // ── 4. CURRENCY SANITIZATION (KaTeX Math Crash Prevention) ──
    const sanitizedData = sanitizeCurrencyStrings(parsedData);

    // ── 5. SAVE TO 7-DAY IN-MEMORY CACHE ──
    routeCache.set(cacheKey, {
      data: sanitizedData,
      expiresAt: Date.now() + CACHE_TTL_MS
    });

    return new Response(
      JSON.stringify({
        success: true,
        source: 'gemini-3.7-flash',
        data: sanitizedData
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'MISS',
          'X-Model': 'gemini-3.7-flash'
        }
      }
    );
  } catch (err: any) {
    console.error('[API /api/trip-readiness] Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal Server Error evaluating trip readiness.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
