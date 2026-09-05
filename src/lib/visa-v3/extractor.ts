// src/lib/visa-v3/extractor.ts
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import type { VisaData, V3VisaData } from './types';
import { createField } from './types';

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

const EXTRACTION_PROMPT = `
Extract visa requirements from the source content below.

SOURCE CONTENT:
{{CONTENT}}

SOURCE URL: {{URL}}

TASK: Extract requirements for {{FROM}} passport holders to {{TO}} for {{PURPOSE}}.

CRITICAL RULES:
1. ONLY extract what is explicitly stated in the source
2. For each field, provide EXACT evidence text
3. If not mentioned -> applicable: false with reason
4. NEVER use training data

Return JSON:
{
  "fields": {
    "visa_type": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "visa_required": { "value": true, "applicable": true, "reason": "...", "evidence": "..." },
    "visa_free": { "value": true, "applicable": true, "reason": "...", "evidence": "..." },
    "visa_on_arrival": { "value": true, "applicable": true, "reason": "...", "evidence": "..." },
    "evisa_available": { "value": true, "applicable": true, "reason": "...", "evidence": "..." },
    "validity": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "stay_duration": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "entry_type": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "processing_time": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "fee": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "fee_currency": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "service_fee": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "total_fee": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "application_method": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "application_url": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "application_form": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "biometrics_required": { "value": true, "applicable": true, "reason": "...", "evidence": "..." },
    "vac_required": { "value": true, "applicable": true, "reason": "...", "evidence": "..." },
    "vac_name": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "mandatory_documents": { "value": ["..."], "applicable": true, "reason": "...", "evidence": "..." },
    "financial_requirements": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "insurance_requirements": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." },
    "passport_validity_required": { "value": "...", "applicable": true, "reason": "...", "evidence": "..." }
  }
}
`;

export async function extractWithEvidence(
  content: string,
  url: string,
  fromCountry: string,
  toCountry: string,
  purpose: string
): Promise<VisaData | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });

  let extractedContent = content;
  if (content.length > 50000) {
    const visaRegex = /visa|entry|stay|fee|document|passport|requirement|application/i;
    const sections = content.split(/\n\n/);
    const relevantSections = sections.filter(s => visaRegex.test(s));
    extractedContent = relevantSections.join('\n\n');
    if (extractedContent.length > 50000) {
      extractedContent = extractedContent.slice(0, 50000);
    }
  }

  const prompt = EXTRACTION_PROMPT
    .replace('{{CONTENT}}', extractedContent)
    .replace('{{URL}}', url)
    .replace('{{FROM}}', fromCountry)
    .replace('{{TO}}', toCountry)
    .replace('{{PURPOSE}}', purpose);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        temperature: 0.0,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return null;

    const parsed = JSON.parse(text);
    const fields = parsed.fields || {};

    return {
      passport_country: fromCountry,
      destination_country: toCountry,
      purpose_of_visit: purpose,

      visa_type: createField(
        fields.visa_type?.value || null,
        fields.visa_type?.evidence || null,
        fields.visa_type?.applicable !== false,
        fields.visa_type?.reason
      ),
      visa_required: createField(
        fields.visa_required?.value ?? null,
        fields.visa_required?.evidence || null,
        fields.visa_required?.applicable !== false,
        fields.visa_required?.reason
      ),
      visa_free: createField(
        fields.visa_free?.value ?? null,
        fields.visa_free?.evidence || null,
        fields.visa_free?.applicable !== false,
        fields.visa_free?.reason
      ),
      visa_on_arrival: createField(
        fields.visa_on_arrival?.value ?? null,
        fields.visa_on_arrival?.evidence || null,
        fields.visa_on_arrival?.applicable !== false,
        fields.visa_on_arrival?.reason
      ),
      evisa_available: createField(
        fields.evisa_available?.value ?? null,
        fields.evisa_available?.evidence || null,
        fields.evisa_available?.applicable !== false,
        fields.evisa_available?.reason
      ),
      validity: createField(
        fields.validity?.value || null,
        fields.validity?.evidence || null,
        fields.validity?.applicable !== false,
        fields.validity?.reason
      ),
      stay_duration: createField(
        fields.stay_duration?.value || null,
        fields.stay_duration?.evidence || null,
        fields.stay_duration?.applicable !== false,
        fields.stay_duration?.reason
      ),
      entry_type: createField(
        fields.entry_type?.value || null,
        fields.entry_type?.evidence || null,
        fields.entry_type?.applicable !== false,
        fields.entry_type?.reason
      ),
      processing_time: createField(
        fields.processing_time?.value || null,
        fields.processing_time?.evidence || null,
        fields.processing_time?.applicable !== false,
        fields.processing_time?.reason
      ),
      fee: createField(
        fields.fee?.value || null,
        fields.fee?.evidence || null,
        fields.fee?.applicable !== false,
        fields.fee?.reason
      ),
      fee_currency: createField(
        fields.fee_currency?.value || null,
        fields.fee_currency?.evidence || null,
        fields.fee_currency?.applicable !== false,
        fields.fee_currency?.reason
      ),
      service_fee: createField(
        fields.service_fee?.value || null,
        fields.service_fee?.evidence || null,
        fields.service_fee?.applicable !== false,
        fields.service_fee?.reason
      ),
      total_fee: createField(
        fields.total_fee?.value || null,
        fields.total_fee?.evidence || null,
        fields.total_fee?.applicable !== false,
        fields.total_fee?.reason
      ),
      application_method: createField(
        fields.application_method?.value || null,
        fields.application_method?.evidence || null,
        fields.application_method?.applicable !== false,
        fields.application_method?.reason
      ),
      application_url: createField(
        fields.application_url?.value || null,
        fields.application_url?.evidence || null,
        fields.application_url?.applicable !== false,
        fields.application_url?.reason
      ),
      application_form: createField(
        fields.application_form?.value || null,
        fields.application_form?.evidence || null,
        fields.application_form?.applicable !== false,
        fields.application_form?.reason
      ),
      biometrics_required: createField(
        fields.biometrics_required?.value ?? null,
        fields.biometrics_required?.evidence || null,
        fields.biometrics_required?.applicable !== false,
        fields.biometrics_required?.reason
      ),
      vac_required: createField(
        fields.vac_required?.value ?? null,
        fields.vac_required?.evidence || null,
        fields.vac_required?.applicable !== false,
        fields.vac_required?.reason
      ),
      vac_name: createField(
        fields.vac_name?.value || null,
        fields.vac_name?.evidence || null,
        fields.vac_name?.applicable !== false,
        fields.vac_name?.reason
      ),
      mandatory_documents: createField(
        fields.mandatory_documents?.value || null,
        fields.mandatory_documents?.evidence || null,
        fields.mandatory_documents?.applicable !== false,
        fields.mandatory_documents?.reason
      ),
      financial_requirements: createField(
        fields.financial_requirements?.value || null,
        fields.financial_requirements?.evidence || null,
        fields.financial_requirements?.applicable !== false,
        fields.financial_requirements?.reason
      ),
      insurance_requirements: createField(
        fields.insurance_requirements?.value || null,
        fields.insurance_requirements?.evidence || null,
        fields.insurance_requirements?.applicable !== false,
        fields.insurance_requirements?.reason
      ),
      passport_validity_required: createField(
        fields.passport_validity_required?.value || null,
        fields.passport_validity_required?.evidence || null,
        fields.passport_validity_required?.applicable !== false,
        fields.passport_validity_required?.reason
      ),

      source_url: url,
      source_authority: null,
      source_content_hash: null,
      source_snapshot: null,
      last_verified_at: new Date().toISOString(),
      verification_status: 'unverified',
      _timestamp: new Date().toISOString(),
      _version: '3.0'
    };
  } catch (error) {
    console.error('[Extractor] Error:', error);
    return null;
  }
}

// Backward compatibility extractor
export async function extractEvidenceWithGemini(
  cleanedContent: string,
  sourceUrl: string,
  retrievedAt: string,
  fromCountry: string,
  toCountry: string,
  purpose: string
): Promise<V3VisaData | null> {
  const data = await extractWithEvidence(cleanedContent, sourceUrl, fromCountry, toCountry, purpose);
  if (!data) return null;

  return {
    passport_country: data.passport_country,
    destination_country: data.destination_country,
    purpose: data.purpose_of_visit,
    visa_type: {
      value: data.visa_type.value,
      applicable: data.visa_type.applicable,
      reason: data.visa_type.reason,
      evidence: data.visa_type.evidence || undefined
    },
    visa_required: {
      value: data.visa_required.value,
      applicable: data.visa_required.applicable,
      reason: data.visa_required.reason,
      evidence: data.visa_required.evidence || undefined
    },
    validity: {
      value: data.validity.value,
      applicable: data.validity.applicable,
      reason: data.validity.reason,
      evidence: data.validity.evidence || undefined
    },
    stay_duration: {
      value: data.stay_duration.value,
      applicable: data.stay_duration.applicable,
      reason: data.stay_duration.reason,
      evidence: data.stay_duration.evidence || undefined
    },
    entry_type: {
      value: data.entry_type.value,
      applicable: data.entry_type.applicable,
      reason: data.entry_type.reason,
      evidence: data.entry_type.evidence || undefined
    },
    processing_time: {
      value: data.processing_time.value,
      applicable: data.processing_time.applicable,
      reason: data.processing_time.reason,
      evidence: data.processing_time.evidence || undefined
    },
    fee: {
      value: data.fee.value,
      applicable: data.fee.applicable,
      reason: data.fee.reason,
      evidence: data.fee.evidence || undefined
    },
    documents_required: {
      value: (data.mandatory_documents.value || []).map((m: string) => ({
        title: m,
        description: `Mandatory document: ${m}`,
        is_mandatory: true
      })),
      applicable: data.mandatory_documents.applicable,
      evidence: data.mandatory_documents.evidence || undefined
    },
    how_to_apply: {
      value: [
        `Apply online via ${data.application_url.value || 'official portal'}`,
        `Submit application form: ${data.application_form.value || 'Standard form'}`,
        data.biometrics_required.value ? 'Complete biometric appointment' : 'No biometrics required'
      ],
      applicable: true
    },
    financial_proofs: {
      value: data.financial_requirements.value ? [{
        type: 'Proof of Funds',
        amount_or_balance: data.financial_requirements.value,
        duration: 'Recent statements'
      }] : [],
      applicable: data.financial_requirements.applicable,
      evidence: data.financial_requirements.evidence || undefined
    },
    other_requirements: {
      value: [
        data.insurance_requirements.value ? `Insurance: ${data.insurance_requirements.value}` : '',
        data.passport_validity_required.value ? `Passport Validity: ${data.passport_validity_required.value}` : ''
      ].filter(Boolean),
      applicable: true
    }
  };
}
