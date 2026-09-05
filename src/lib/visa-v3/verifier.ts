// src/lib/visa-v3/verifier.ts
import type { V3VisaData, ApplicableField, ValidationReport, AnchorStatus } from './types';

export const GENERIC_PLACEHOLDERS = [
  'per official guidelines',
  'per official regulations',
  'official consular fee',
  'depends on application',
  'check embassy website',
  'not specified',
  'to be determined',
  'varies',
  'contact embassy',
  'as per embassy'
];

export function normalizeWhitespace(str: string): string {
  return (str || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

export function isSubstringOfSource(evidence: string, cleanedContent: string): boolean {
  if (!evidence) return false;
  const normEvidence = normalizeWhitespace(evidence);
  const normSource = normalizeWhitespace(cleanedContent);
  if (!normEvidence || !normSource) return false;

  // Direct substring check
  if (normSource.includes(normEvidence)) return true;

  // Partial match check for linebreaks or punctuation breaks (min 40 chars or 80% words)
  const words = normEvidence.split(' ').filter(w => w.length > 2);
  if (words.length >= 6) {
    const matchedCount = words.filter(w => normSource.includes(w)).length;
    if (matchedCount / words.length >= 0.9) return true;
  }

  return false;
}

export function containsGenericPlaceholders(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return GENERIC_PLACEHOLDERS.some(ph => lower.includes(ph));
}

export function verifyEvidenceAnchors(
  data: V3VisaData,
  cleanedContent: string
): { verifiedData: V3VisaData; anchors: Record<string, string> } {
  const verifiedData: V3VisaData = JSON.parse(JSON.stringify(data));
  const anchors: Record<string, string> = {};

  const fieldsToCheck: Array<keyof V3VisaData> = [
    'visa_required',
    'visa_type',
    'validity',
    'stay_duration',
    'entry_type',
    'processing_time',
    'fee',
    'documents_required',
    'how_to_apply',
    'financial_proofs',
    'other_requirements'
  ];

  for (const field of fieldsToCheck) {
    const item = verifiedData[field] as ApplicableField<any>;
    if (!item) continue;

    if (!item.applicable) {
      item.anchor_status = 'not_applicable';
      continue;
    }

    if (item.evidence) {
      const existsInSource = isSubstringOfSource(item.evidence, cleanedContent);
      if (existsInSource) {
        item.anchor_status = 'verified';
        anchors[field as string] = item.evidence;
      } else {
        // Evidence does not exist in source text! REJECT value
        item.anchor_status = 'unverified';
        item.value = null;
        item.reason = `Rejected: evidence anchor "${item.evidence.slice(0, 40)}..." not found in source text`;
      }
    } else {
      if (item.value !== null) {
        item.anchor_status = 'missing_evidence';
      } else {
        item.anchor_status = 'unverified';
      }
    }
  }

  return { verifiedData, anchors };
}

export function validateDeterministicRules(
  data: V3VisaData,
  requestedFrom: string,
  requestedTo: string,
  requestedPurpose: string,
  sourceAuthorityType: string
): ValidationReport {
  const errors: string[] = [];
  let crossContamination = false;
  let placeholders = false;
  const missingCritical: string[] = [];
  const fieldApplicability: Record<string, boolean> = {};
  const evidenceAnchors: Record<string, string> = {};

  const reqTo = requestedTo.toLowerCase().trim();
  const reqFrom = requestedFrom.toLowerCase().trim();
  const reqPurpose = requestedPurpose.toLowerCase().trim();

  // 1. Route match check
  const actualTo = (data.destination_country || '').toLowerCase().trim();
  const actualFrom = (data.passport_country || '').toLowerCase().trim();

  if (actualTo && !actualTo.includes(reqTo) && !reqTo.includes(actualTo)) {
    errors.push(`Destination mismatch: requested "${requestedTo}", extracted "${data.destination_country}"`);
  }
  if (actualFrom && !actualFrom.includes(reqFrom) && !reqFrom.includes(actualFrom)) {
    errors.push(`Passport mismatch: requested "${requestedFrom}", extracted "${data.passport_country}"`);
  }

  // 2. Generic placeholder check across all evidence and string values
  const stringValuesToCheck = [
    data.visa_type?.value,
    data.validity?.value,
    data.stay_duration?.value,
    data.entry_type?.value,
    data.processing_time?.value,
    data.fee?.value,
    data.visa_type?.evidence,
    data.validity?.evidence,
    data.stay_duration?.evidence,
    data.entry_type?.evidence,
    data.processing_time?.evidence,
    data.fee?.evidence
  ].filter(Boolean) as string[];

  for (const s of stringValuesToCheck) {
    if (containsGenericPlaceholders(s)) {
      placeholders = true;
      errors.push(`Placeholder detected: "${s}" violates pure extraction rules`);
    }
  }

  // 3. Cross-Contamination checks
  const fullExtractedString = JSON.stringify(data).toLowerCase();

  // 3a. Student route vs Tourist route (Subclass 500 vs 600)
  if (reqPurpose.includes('student') || reqPurpose.includes('study')) {
    if (fullExtractedString.includes('subclass 600') || fullExtractedString.includes('visitor visa')) {
      crossContamination = true;
      errors.push('Cross-contamination: Visitor Subclass 600 detected on Student visa route');
    }
  } else if (reqPurpose.includes('touris') || reqPurpose.includes('visit')) {
    if (fullExtractedString.includes('subclass 500') || fullExtractedString.includes('student visa')) {
      crossContamination = true;
      errors.push('Cross-contamination: Student Subclass 500 detected on Tourist visa route');
    }
  }

  // 3b. Non-US destination must NEVER contain DS-160
  const isUS = reqTo.includes('united states') || reqTo.includes('usa') || reqTo.includes('america');
  if (!isUS && fullExtractedString.includes('ds-160')) {
    crossContamination = true;
    errors.push('Cross-contamination: DS-160 detected on non-US visa route');
  }

  // 3c. Non-Schengen destination must NEVER contain Schengen or €30,000 insurance requirement
  const isSchengen = ['france', 'germany', 'italy', 'spain', 'netherlands', 'greece', 'portugal',
    'austria', 'belgium', 'switzerland', 'schengen'].some(c => reqTo.includes(c));
  if (!isSchengen && (fullExtractedString.includes('schengen') || fullExtractedString.includes('€30,000'))) {
    crossContamination = true;
    errors.push('Cross-contamination: Schengen / €30,000 requirement detected on non-Schengen route');
  }

  // 4. Critical Fields Applicability & Anchor Check
  // Critical fields:
  // - visa_required (ALWAYS applicable)
  // - validity (ALWAYS applicable)
  // - stay_duration (ALWAYS applicable)
  // - entry_type (ALWAYS applicable)
  // - visa_type (NOT applicable for visa-free)
  // - processing_time (NOT applicable for visa-free/VOA)
  // - fee (NOT applicable for visa-free)

  const criticalKeys: Array<keyof V3VisaData> = [
    'visa_required',
    'validity',
    'stay_duration',
    'entry_type',
    'visa_type',
    'processing_time',
    'fee'
  ];

  for (const key of criticalKeys) {
    const field = data[key] as ApplicableField<any>;
    const isApplicable = field?.applicable !== false;
    fieldApplicability[key] = isApplicable;

    if (field?.evidence) {
      evidenceAnchors[key] = field.evidence;
    }

    if (isApplicable) {
      if (!field || field.value === null || field.anchor_status !== 'verified') {
        missingCritical.push(key);
      }
    }
  }

  const isValid = 
    errors.length === 0 && 
    !crossContamination && 
    !placeholders && 
    missingCritical.length === 0;

  return {
    is_valid: isValid,
    errors,
    cross_contamination_detected: crossContamination,
    placeholders_detected: placeholders,
    missing_applicable_critical_fields: missingCritical,
    field_applicability: fieldApplicability,
    evidence_anchors: evidenceAnchors
  };
}
