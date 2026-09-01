// scripts/eval-readiness-pipeline.ts
/**
 * TravlTik Automated Multi-Agent Batch Pipeline
 * Generates, Evaluates, and Self-Heals Trip Readiness & Visa Compliance Payloads for 192 Destinations.
 *
 * Directives:
 * 1. Model: Strictly "gemini-3.7-flash"
 * 2. Stateless Execution: Fresh context per query (zero context bleed)
 * 3. KaTeX Crash Prevention: No raw '$' signs, converts to currency codes (USD, EUR, CAD, etc.)
 * 4. Thinking Budget Suppression: responseMimeType: "application/json"
 * 5. Rate-Limit Throttling: 4.5s delay between requests
 */

import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { ALL_COUNTRIES } from '../src/data/countries';

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

// KaTeX dollar sanitization helper
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

const GENERATOR_SYSTEM_PROMPT = `You are the Lead Consular & Immigration Architect for TravlTik (travltik.com).

Given:
- Origin Country
- Destination Country
- Purpose of Travel

Generate a 100% accurate, factual, non-hallucinated Trip Readiness JSON payload adhering strictly to the official consular guidelines of the destination nation.

CRITICAL RULES:
1. Strict Context Isolation: Generate rules, forms, and portals ONLY for the specified Destination Country. Never mix requirements from other nations.
2. Form Accuracy:
   - Schengen Nations (e.g., Greece, Romania, France, Germany, Italy, Spain, Netherlands): Use official Harmonised Schengen Application Form or national eVisa portals (e.g., GVCW, evisa.mae.ro, France-Visas). NEVER list Form DS-160.
   - United States: Form DS-160 for Nonimmigrant Visas (B1/B2, F-1, H-1B), Form I-797 for petition work, DS-260 for Immigrant Visas.
   - United Kingdom: UKVI Online Portal, CAS for students, COS for workers.
   - Canada / Australia PR: Express Entry / SkillSelect, ECA, PCC, and unencumbered settlement funds.
3. Currency Formatting: Never use raw dollar signs ($). Use text format (e.g., '185 USD', '90 EUR', '1,525 CAD', '4,765 AUD', '20 OMR', '535 SAR').

STRICT JSON SCHEMA:
{
  "route_meta": {
    "origin": "string",
    "destination": "string",
    "purpose": "string",
    "visa_type": "string",
    "official_channel": "string"
  },
  "processing_meta": {
    "processing_time": "string",
    "validity": "string",
    "length_of_stay": "string",
    "entry": "string",
    "total_fees": {
      "primary_fee": "string",
      "logistics_or_service_fee": "string",
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
    "key_rule_1": "string",
    "financial_benchmark": "string"
  }
}`;

const AUDITOR_SYSTEM_PROMPT = `You are the Chief Immigration Auditor and Fact-Checker for TravlTik.

You will receive a generated Trip Readiness JSON payload for a target Destination Country.

AUDIT RUBRIC:
1. Cross-Country Contamination Check: Does the payload cite forms, portals, or fees from an unrelated country (e.g., DS-160 for Schengen/Romania/Greece, or Oman Police for Romania, or Schengen insurance for USA/UK)?
2. Purpose Alignment: Does the checklist match the requested purpose (e.g., Business visits must have company letters; Study must have CAS/I-20; PR must have ECA/PCC)?
3. Formatting Rules: Check for raw dollar signs ($) and convert them to text codes (e.g., '185 USD').

INSTRUCTION:
- If errors or contamination are found, correct them directly and return the healed JSON.
- If the payload is completely accurate, return it unmodified.
- Output ONLY valid, parseable JSON.`;

async function generatePayload(ai: GoogleGenAI, origin: string, destination: string, purpose: string): Promise<any> {
  const prompt = `${GENERATOR_SYSTEM_PROMPT}

Generate Trip Readiness JSON for:
Origin Country: "${origin}"
Destination Country: "${destination}"
Purpose of Travel: "${purpose}"`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.1
    }
  });

  const text = response.text || '{}';
  return JSON.parse(text.trim());
}

async function auditAndFix(ai: GoogleGenAI, payload: any, destination: string): Promise<any> {
  const auditPrompt = `${AUDITOR_SYSTEM_PROMPT}

Target Destination Country: "${destination}"

PAYLOAD TO AUDIT:
${JSON.stringify(payload, null, 2)}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: auditPrompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.0
    }
  });

  const text = response.text || '{}';
  const parsed = JSON.parse(text.trim());
  return sanitizeCurrencyCodes(parsed);
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function runPipeline() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY environment variable is missing.');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const origin = 'India';
  const purpose = 'Tourism / Vacation';

  const outputDir = path.join(process.cwd(), 'verified_readiness_data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Parse CLI args for limit/sample if provided (e.g., --sample 5)
  const sampleArgIdx = process.argv.indexOf('--sample');
  const sampleSize = sampleArgIdx !== -1 ? parseInt(process.argv[sampleArgIdx + 1], 10) : 0;

  // Filter out duplicate or non-destination entries
  const countries = ALL_COUNTRIES
    .map(c => c.name)
    .filter(c => c.toLowerCase() !== 'india');

  const targetCountries = sampleSize > 0 ? countries.slice(0, sampleSize) : countries;

  console.log(`\n======================================================`);
  console.log(`🚀 TRAVLTIK AUTOMATED EVAL & SELF-HEALING PIPELINE`);
  console.log(`Targeting ${targetCountries.length} Sovereign Destinations | Origin: ${origin}`);
  console.log(`======================================================\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < targetCountries.length; i++) {
    const country = targetCountries[i];
    console.log(`[${i + 1}/${targetCountries.length}] 🌐 Evaluating Route: ${origin} ➔ ${country}...`);

    try {
      // Step 1: Generate Raw Payload
      const rawData = await generatePayload(ai, origin, country, purpose);

      // Step 2: Multi-Agent Audit & Self-Heal
      const verifiedData = await auditAndFix(ai, rawData, country);

      // Step 3: Save to verified JSON store
      const slug = country.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      const filepath = path.join(outputDir, `${slug}.json`);
      fs.writeFileSync(filepath, JSON.stringify(verifiedData, null, 2), 'utf-8');

      console.log(`  ✅ Verified & Saved: ${slug}.json | Authority: "${verifiedData.route_meta?.official_channel || verifiedData.route_meta?.visa_type}"`);
      successCount++;

      // Step 4: 4.5s Rate-Limit Throttling (15 RPM safe buffer)
      if (i < targetCountries.length - 1) {
        await sleep(4500);
      }
    } catch (err: any) {
      console.error(`  ❌ Failed for ${country}:`, err.message || err);
      failCount++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`🏁 PIPELINE COMPLETE: ${successCount} Succeeded, ${failCount} Failed`);
  console.log(`Verified payloads stored in: ${outputDir}`);
  console.log(`======================================================\n`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('eval-readiness-pipeline.ts')) {
  runPipeline().catch(console.error);
}
