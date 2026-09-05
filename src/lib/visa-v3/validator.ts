import type { VisaData, ValidationResult, SourceAuthority } from './types';
import { isFieldApplicable } from './types';

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

export const CRITICAL_FIELDS = [
  'visa_type',
  'visa_required',
  'validity',
  'stay_duration',
  'entry_type',
  'processing_time',
  'fee'
];

export function containsGenericPlaceholders(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return GENERIC_PLACEHOLDERS.some(p => lower.includes(p));
}

export function verifyEvidenceAnchor(field: any, sourceContent: string): boolean {
  if (!field.evidence) return false;

  const normalizedEvidence = field.evidence.toLowerCase().trim();
  const normalizedSource = sourceContent.toLowerCase();

  if (normalizedSource.includes(normalizedEvidence)) return true;

  const evidenceWords = normalizedEvidence.split(/\s+/).filter((w: string) => w.length > 3);
  const matchCount = evidenceWords.filter((w: string) => normalizedSource.includes(w)).length;
  const matchRatio = evidenceWords.length > 0 ? matchCount / evidenceWords.length : 0;

  return matchRatio > 0.6;
}

export function validateVisaData(
  data: VisaData,
  fromCountry: string,
  toCountry: string,
  purpose: string,
  sourceAuthority: SourceAuthority | null,
  sourceContent: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const missingApplicableFields: string[] = [];
  const conflicts: string[] = [];
  const fieldStatus: Record<string, { has_evidence: boolean; verified: boolean }> = {};

  const cleanDest = (data.destination_country || '').toLowerCase();
  const targetTo = (toCountry || '').toLowerCase();
  if (!cleanDest.includes(targetTo) && !targetTo.includes(cleanDest)) {
    errors.push(`Destination mismatch: ${data.destination_country} vs ${toCountry}`);
  }

  const cleanPass = (data.passport_country || '').toLowerCase();
  const targetFrom = (fromCountry || '').toLowerCase();
  if (!cleanPass.includes(targetFrom) && !targetFrom.includes(cleanPass)) {
    errors.push(`Passport mismatch: ${data.passport_country} vs ${fromCountry}`);
  }

  const fields = Object.entries(data).filter(
    ([key, value]) => typeof value === 'object' && value !== null && 'applicable' in value
  );

  for (const [fieldName, field] of fields) {
    const typedField = field as any;

    if (!isFieldApplicable(typedField)) {
      fieldStatus[fieldName] = { has_evidence: false, verified: true };
      continue;
    }

    if (typedField.evidence) {
      const lowerEvidence = typedField.evidence.toLowerCase();
      for (const placeholder of GENERIC_PLACEHOLDERS) {
        if (lowerEvidence.includes(placeholder)) {
          errors.push(`Generic placeholder in ${fieldName}: "${typedField.evidence}"`);
          break;
        }
      }
    }

    const hasEvidence = Boolean(typedField.evidence);
    const evidenceVerified = hasEvidence && verifyEvidenceAnchor(typedField, sourceContent);

    if (!hasEvidence) {
      missingApplicableFields.push(fieldName);
    }

    if (hasEvidence && !evidenceVerified) {
      errors.push(`Evidence for "${fieldName}" not found in source: "${typedField.evidence}"`);
    }

    fieldStatus[fieldName] = {
      has_evidence: hasEvidence,
      verified: evidenceVerified
    };
  }

  const sourcePriority = sourceAuthority ? 
    ({ government: 1, embassy: 2, evisa: 3, vac: 4, other: 5 }[sourceAuthority] || 5) : 5;

  if (sourceAuthority === 'other' || sourceAuthority === 'vac') {
    warnings.push(`Source authority is "${sourceAuthority}" - needs verification`);
  }

  let status: ValidationResult['status'];

  if (
    missingApplicableFields.length === 0 &&
    errors.length === 0 &&
    sourcePriority <= 3 &&
    sourceAuthority !== null &&
    sourceAuthority !== 'other'
  ) {
    status = 'verified';
  } else if (
    missingApplicableFields.filter((f: string) => CRITICAL_FIELDS.includes(f)).length === 0 &&
    errors.length === 0 &&
    (sourcePriority === 4 || sourceAuthority === 'vac')
  ) {
    status = 'partially_verified';
  } else if (missingApplicableFields.length > 0 || errors.length > 0) {
    status = 'needs_review';
  } else {
    status = 'unverified';
  }

  return {
    status,
    errors,
    warnings,
    missing_applicable_fields: missingApplicableFields,
    verification_details: {
      reason: status === 'verified' ? 'All applicable fields have verified evidence' :
              status === 'partially_verified' ? 'Critical fields verified, some non-critical missing' :
              status === 'needs_review' ? 'Some applicable fields missing evidence' :
              'Not verified',
      missing_fields: missingApplicableFields,
      conflicts
    },
    field_status: fieldStatus
  };
}
