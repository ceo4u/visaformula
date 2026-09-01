// scripts/matrix-readiness-pipeline.ts
/**
 * TravlTik Autonomous Search-Grounded Bilateral Visa Compliance Matrix Pipeline
 * 
 * Directives:
 * 1. Model: Strictly "gemini-3.7-flash" with Live Google Search Grounding
 * 2. Stateless Execution: Fresh context window per bilateral route
 * 3. KaTeX Crash Prevention: Converts raw $ into currency codes (USD, EUR, CAD, etc.)
 * 4. 2-Agent Self-Correction Loop: Search-Grounded Generator -> Chief Auditor & Auto-Healer
 * 5. Database Upsert: Persists verified JSON matrix to Neon PostgreSQL
 */

import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { getPool, runMigrations } from '../src/backend/db';
import { getVerifiedOfficialData } from '../src/pages/api/visa/ai-requirements';

function getApiKey(): string {
  let key = (
    process.env.GEMINI_API_KEY ||
    process.env.PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  ).trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^(?:GEMINI_API_KEY|PUBLIC_GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch {}

  return '';
}

export function sanitizeCurrencyCodes(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/\$(\d+(?:[.,]\d+)?)\s*(?:USD)?/gi, '$1 USD')
      .replace(/€(\d+(?:[.,]\d+)?)\s*(?:EUR)?/gi, '$1 EUR')
      .replace(/£(\d+(?:[.,]\d+)?)\s*(?:GBP)?/gi, '$1 GBP')
      .replace(/₹(\d+(?:[.,]\d+)?)\s*(?:INR)?/gi, '₹$1 INR')
      .replace(/\$/g, ' USD ');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeCurrencyCodes);
  }
  if (obj !== null && typeof obj === 'object') {
    const res: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      res[key] = sanitizeCurrencyCodes(obj[key]);
    }
    return res;
  }
  return obj;
}

const ORIGINS = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "United Arab Emirates"];
const DESTINATIONS = [
  "United States", "India", "United Kingdom", "Greece", "Romania", 
  "Ethiopia", "Germany", "Canada", "Australia", "Japan", "United Arab Emirates"
];
const PURPOSES = [
  "Tourism / Vacation", 
  "Higher Studies", 
  "Employment / Work", 
  "Permanent Residency (PR) / Immigration", 
  "Business Visit"
];

async function generateGroundedPayload(ai: GoogleGenAI, origin: string, destination: string, purpose: string) {
  const prompt = `
  Search official immigration and consular sources in real-time:
  - Origin Passport Country: ${origin}
  - Destination Country: ${destination}
  - Purpose of Travel: ${purpose}

  MANDATORY SEARCH & EXTRACTION DIRECTIVES:
  1. Search the official consular / visa portal of ${destination} for ${origin} passport holders.
  2. Determine the exact regime: 100% Online eVisa, Visa on Arrival, Schengen Visa, In-Person Consular Sticker, or Visa-Free.
  3. If eVisa (e.g. Ethiopia, Vietnam): NEVER include in-person VAC appointments or biometric fingerprinting. Provide the official URL (e.g., evisa.gov.et).
  4. If Schengen (e.g. Greece, Romania): Enforce Harmonised Schengen Form, 90/180 rule, 90 EUR fee, and 30,000 EUR medical insurance.
  5. If USA: Enforce Form DS-160 (or DS-260 for PR / I-797 for Work), 185 USD / 205 USD MRV fee, and 2-stage appointment rules.
  6. Ensure currency formatting NEVER contains raw '$' symbols (write 'USD', 'EUR', 'CAD', etc.).

  Return STRICT JSON matching this schema:
  {
    "route_meta": {
      "origin": "${origin}",
      "destination": "${destination}",
      "purpose": "${purpose}",
      "visa_type": "string",
      "official_channel": "string"
    },
    "processing_meta": {
      "processing_time": "string",
      "validity": "string",
      "length_of_stay": "string",
      "entry": "string",
      "total_fees": {
        "consular_fee": "string",
        "service_fee": "string",
        "approx_inr": "string"
      }
    },
    "how_to_apply_steps": ["string"],
    "documents_checklist": [
      {
        "id": "READYDOCUMENT1",
        "title": "string",
        "is_mandatory": true,
        "description": "string"
      }
    ],
    "consular_directives": {
      "statutory_rule": "string",
      "financial_benchmark": "string"
    }
  }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      tools: [{ googleSearch: {} } as any]
    }
  });

  const raw = response.text ? response.text.trim() : '{}';
  return sanitizeCurrencyCodes(JSON.parse(raw));
}

async function auditAndHealPayload(ai: GoogleGenAI, payload: any, origin: string, destination: string, purpose: string) {
  const auditPrompt = `
  Act as the Chief Immigration Auditor. Audit and verify this payload for:
  Route: ${origin} -> ${destination} (${purpose})

  PAYLOAD:
  ${JSON.stringify(payload)}

  AUDIT CHECKS:
  1. Cross-Country Contamination: Are forms or portals from other nations present (e.g., DS-160 for European countries, Oman police data for Romania)?
  2. Regime Integrity: If eVisa, verify there are NO physical VAC biometrics. If Schengen, verify 90 EUR fee and 30,000 EUR insurance.
  3. Currency Safety: Confirm there are NO raw '$' signs.

  TASK:
  - If errors are present, fix them using verified consular rules and return the corrected JSON.
  - If 100% accurate, return the clean JSON.
  - Output ONLY valid JSON matching the same schema.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: [{ role: 'user', parts: [{ text: auditPrompt }] }],
    config: {
      temperature: 0.0,
      responseMimeType: 'application/json',
      tools: [{ googleSearch: {} } as any]
    }
  });

  const raw = response.text ? response.text.trim() : '{}';
  return sanitizeCurrencyCodes(JSON.parse(raw));
}

async function runBilateralMatrixPipeline() {
  const outDir = path.resolve(process.cwd(), 'verified_readiness_matrix');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('--- INITIALIZING DATABASE MIGRATIONS & SCHEMA ---');
  await runMigrations();
  const pool = getPool();

  const apiKey = getApiKey();
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  console.log('🚀 Starting Bilateral Visa Compliance Matrix Pipeline...');
  if (!ai) {
    console.log('ℹ️ No GEMINI_API_KEY detected in env; seeding bilateral pairs from verified consular knowledge base...');
  }

  let totalCount = 0;
  let successCount = 0;

  for (const origin of ORIGINS) {
    for (const destination of DESTINATIONS) {
      if (origin.toLowerCase() === destination.toLowerCase()) continue;

      for (const purpose of PURPOSES) {
        totalCount++;
        const routeKey = `${origin.toLowerCase().replace(/\s+/g, '_')}_to_${destination.toLowerCase().replace(/\s+/g, '_')}_${purpose.toLowerCase().split(/\s+/)[0]}`;
        const localFile = path.join(outDir, `${routeKey}.json`);

        console.log(`\n🔄 [${totalCount}] Processing: ${origin} -> ${destination} (${purpose})...`);

        try {
          let verifiedPayload: any;

          if (ai) {
            // 1. Live Search-Grounded Generation
            const raw = await generateGroundedPayload(ai, origin, destination, purpose);
            // 2. Chief Auditor & Auto-Healer
            verifiedPayload = await auditAndHealPayload(ai, raw, origin, destination, purpose);
          } else {
            // Fallback to built-in verified consular dataset
            verifiedPayload = sanitizeCurrencyCodes(getVerifiedOfficialData(origin, destination, purpose));
          }

          // 3. Local File Cache
          fs.writeFileSync(localFile, JSON.stringify(verifiedPayload, null, 2), 'utf8');

          // 4. PostgreSQL Upsert
          const destinationSlug = destination.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
          const visaType = verifiedPayload.route_meta?.visa_type || verifiedPayload.visa_type || 'Standard Visa';
          const officialChannel = verifiedPayload.route_meta?.official_channel || verifiedPayload.official_source_name || 'Official Consular Mission';

          await pool.query(
            `INSERT INTO verified_readiness_payloads 
              (origin, destination, destination_slug, route_key, purpose, visa_type, official_channel, payload_json, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
             ON CONFLICT (origin, destination, purpose)
             DO UPDATE SET
               route_key = EXCLUDED.route_key,
               visa_type = EXCLUDED.visa_type,
               official_channel = EXCLUDED.official_channel,
               payload_json = EXCLUDED.payload_json,
               updated_at = NOW()`,
            [origin, destination, destinationSlug, routeKey, purpose, visaType, officialChannel, JSON.stringify(verifiedPayload)]
          );

          console.log(`✅ Verified & Persisted to DB: ${routeKey}`);
          successCount++;

          if (ai) {
            await new Promise(r => setTimeout(r, 4500)); // 4.5s rate limit throttle
          }
        } catch (err: any) {
          console.error(`❌ Error on ${routeKey}:`, err.message);
        }
      }
    }
  }

  console.log(`\n🎉 BILATERAL MATRIX COMPLETE: ${successCount}/${totalCount} routes verified and persisted to Neon PostgreSQL!`);
  process.exit(0);
}

runBilateralMatrixPipeline();
