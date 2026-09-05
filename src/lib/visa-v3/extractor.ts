// src/lib/visa-v3/extractor.ts
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import type { V3VisaData, ApplicableField } from './types';

function getGeminiApiKey(): string {
  let key = (
    (import.meta?.env?.GEMINI_API_KEY as string | undefined) ||
    (import.meta?.env?.NEXT_PUBLIC_GEMINI_API_KEY as string | undefined) ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  )?.trim();
  if (key) return key;

  try {
    const envFiles = ['.env', '.env.local'];
    for (const f of envFiles) {
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
  } catch (_) {}

  return '';
}

export async function extractEvidenceWithGemini(
  cleanedContent: string,
  sourceUrl: string,
  retrievedAt: string,
  fromCountry: string,
  toCountry: string,
  purpose: string
): Promise<V3VisaData | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.warn('[V3Extractor] GEMINI_API_KEY is not configured.');
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
You are an expert consular compliance data extractor.
Your task is to extract visa requirements for a traveler from ${fromCountry} traveling to ${toCountry} for the purpose of "${purpose}".

CRITICAL EXTRACTION RULES:
1. SOURCE IS TRUTH: You are strictly an EXTRACTOR, NOT a generator or knowledge base.
2. DO NOT hallucinate, assume, or invent details not present in the provided source text.
3. If information for a field is not found in the source text, set "value": null.
4. FOR EVERY FIELD, return an object containing:
   - "value": string or boolean or array or null
   - "applicable": boolean (false if the field does not apply to this route, e.g., visa-free entry has no visa fee or consular processing time)
   - "reason": optional short string explaining why it is not applicable or why null
   - "evidence": exact verbatim quote/substring copied directly from the source text that supports this value. NEVER paraphrase.
5. NO GENERIC PLACEHOLDERS: Never output generic phrases like "as per embassy regulations", "official consular fee", "depends on application", "check embassy website", "varies". If the exact number or instruction is absent, return value: null.
6. APPLICABILITY LOGIC:
   - For Visa-Free entry routes:
     * "visa_required": { "value": false, "applicable": true, "evidence": "..." }
     * "visa_type": { "value": null, "applicable": false, "reason": "Visa-free entry" }
     * "fee": { "value": null, "applicable": false, "reason": "No visa fee for visa-free entry" }
     * "processing_time": { "value": null, "applicable": false, "reason": "Instant entry on arrival" }
   - For eVisa / Consular Visa routes:
     * "visa_required": { "value": true, "applicable": true, "evidence": "..." }
     * "visa_type": { "value": "...", "applicable": true, "evidence": "..." }
     * "fee": { "value": "...", "applicable": true, "evidence": "..." }
     * "processing_time": { "value": "...", "applicable": true, "evidence": "..." }
`.trim();

  const userPrompt = `
Source URL: ${sourceUrl}
Retrieved At: ${retrievedAt}
Route: From ${fromCountry} to ${toCountry} (${purpose})

OFFICIAL SOURCE CONTENT:
\"\"\"
${cleanedContent.slice(0, 45000)}
\"\"\"

Extract the visa requirements as valid JSON matching this exact structure:
{
  "passport_country": "${fromCountry}",
  "destination_country": "${toCountry}",
  "purpose": "${purpose}",
  "visa_required": { "value": true or false, "applicable": true, "evidence": "exact quote" },
  "visa_type": { "value": "...", "applicable": true or false, "reason": "...", "evidence": "..." },
  "validity": { "value": "...", "applicable": true, "evidence": "..." },
  "stay_duration": { "value": "...", "applicable": true, "evidence": "..." },
  "entry_type": { "value": "Single" or "Multiple", "applicable": true, "evidence": "..." },
  "processing_time": { "value": "...", "applicable": true or false, "reason": "...", "evidence": "..." },
  "fee": { "value": "...", "applicable": true or false, "reason": "...", "evidence": "..." },
  "documents_required": {
    "value": [
      { "title": "...", "description": "...", "is_mandatory": true }
    ],
    "applicable": true,
    "evidence": "..."
  },
  "how_to_apply": {
    "value": ["Step 1: ...", "Step 2: ..."],
    "applicable": true,
    "evidence": "..."
  },
  "financial_proofs": {
    "value": [{ "type": "...", "amount_or_balance": "...", "duration": "...", "notes": "..." }],
    "applicable": true or false,
    "evidence": "..."
  },
  "other_requirements": {
    "value": ["..."],
    "applicable": true or false,
    "evidence": "..."
  }
}
Output ONLY raw JSON. Do not wrap in markdown or backticks.
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    const rawText = response.text?.trim();
    if (!rawText) return null;

    const cleanedJson = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson) as V3VisaData;
    return parsed;
  } catch (err) {
    console.error('[V3Extractor] Extraction failed:', err);
    return null;
  }
}
