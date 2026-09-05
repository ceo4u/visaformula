// src/lib/visa-v3/types.ts

export type VerificationStatus = 
  | 'verified'
  | 'partially_verified'
  | 'needs_review'
  | 'unverified'
  | 'not_found';

export type SourceAuthority = 
  | 'government'
  | 'embassy'
  | 'evisa'
  | 'vac'
  | 'other';

export interface VisaField<T> {
  value: T | null;
  applicable: boolean;
  reason?: string;
  evidence: string | null;
  source_url: string | null;
  verified: boolean;
}

export interface VisaData {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  
  visa_type: VisaField<string>;
  visa_required: VisaField<boolean>;
  visa_free: VisaField<boolean>;
  visa_on_arrival: VisaField<boolean>;
  evisa_available: VisaField<boolean>;
  validity: VisaField<string>;
  stay_duration: VisaField<string>;
  entry_type: VisaField<string>;
  processing_time: VisaField<string>;
  fee: VisaField<string>;
  fee_currency: VisaField<string>;
  
  service_fee: VisaField<string>;
  total_fee: VisaField<string>;
  application_method: VisaField<string>;
  application_url: VisaField<string>;
  application_form: VisaField<string>;
  biometrics_required: VisaField<boolean>;
  vac_required: VisaField<boolean>;
  vac_name: VisaField<string>;
  mandatory_documents: VisaField<string[]>;
  financial_requirements: VisaField<string>;
  insurance_requirements: VisaField<string>;
  passport_validity_required: VisaField<string>;
  
  source_url: string | null;
  source_authority: SourceAuthority | null;
  source_content_hash: string | null;
  source_snapshot: string | null;
  last_verified_at: string | null;
  verification_status: VerificationStatus;
  
  _timestamp: string;
  _version: string;
}

export interface SourceEntry {
  hostname: string;
  authority: SourceAuthority;
  name: string;
  url: string;
  visaPath?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  countries: string[];
}

export interface RetrievedContent {
  url: string;
  content: string;
  contentHash: string;
  snapshot: string;
  retrievedAt: string;
}

export interface ValidationResult {
  status: VerificationStatus;
  errors: string[];
  warnings: string[];
  missing_applicable_fields: string[];
  verification_details: {
    reason: string;
    missing_fields: string[];
    conflicts: string[];
  };
  field_status: Record<string, { has_evidence: boolean; verified: boolean }>;
}

export interface VisaResult {
  data: VisaData | null;
  source: 'cache' | 'html' | 'gemini' | 'fallback';
  verification_status: VerificationStatus;
  source_url?: string;
  source_authority?: SourceAuthority;
  source_content_hash?: string;
  retrieved_at?: string;
  is_fresh: boolean;
  validation_errors?: string[];
  missing_critical_fields?: string[];
  message?: string;
  official_embassy_url?: string;
}

export function createField<T>(
  value: T | null,
  evidence: string | null = null,
  applicable: boolean = true,
  reason?: string
): VisaField<T> {
  return {
    value,
    applicable,
    reason,
    evidence,
    source_url: null,
    verified: false
  };
}

export function isFieldApplicable(field: VisaField<any>): boolean {
  if (field.applicable === false) return false;
  if (field.reason && field.reason.toLowerCase().includes('visa-free')) return false;
  if (field.reason && field.reason.toLowerCase().includes('not applicable')) return false;
  return true;
}

// ── BACKWARD COMPATIBILITY TYPES ──
export type V3VerificationStatus = 
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'NEEDS_REVIEW'
  | 'UNVERIFIED'
  | 'NOT_FOUND';

export type SourceAuthorityType = SourceAuthority;

export type AnchorStatus = 
  | 'verified'
  | 'unverified'
  | 'missing_evidence'
  | 'not_applicable';

export interface ApplicableField<T = any> {
  value: T | null;
  applicable: boolean;
  reason?: string;
  evidence?: string;
  anchor_status?: AnchorStatus;
}

export interface V3DocumentItem {
  title: string;
  description: string;
  is_mandatory: boolean;
}

export interface V3FinancialProofItem {
  type: string;
  amount_or_balance: string | null;
  duration: string;
  notes?: string;
}

export interface V3VisaData {
  passport_country: string;
  destination_country: string;
  purpose: string;
  visa_type: ApplicableField<string>;
  visa_required: ApplicableField<boolean>;
  validity: ApplicableField<string>;
  stay_duration: ApplicableField<string>;
  entry_type: ApplicableField<string>;
  processing_time: ApplicableField<string>;
  fee: ApplicableField<string>;
  documents_required: ApplicableField<V3DocumentItem[]>;
  how_to_apply: ApplicableField<string[]>;
  financial_proofs: ApplicableField<V3FinancialProofItem[]>;
  other_requirements: ApplicableField<string[]>;
}

export interface SourceRegistryEntry {
  destination_country: string;
  exact_hostname: string;
  source_type: SourceAuthorityType;
  source_name: string;
  source_url: string;
  visa_path?: string;
  priority: number;
}

export interface ContentSnapshotResult {
  source_url: string;
  hostname: string;
  raw_html: string;
  cleaned_content: string;
  content_hash: string;
  content_snapshot: string;
  retrieved_at: string;
  status: 'OK' | 'CONTENT_TOO_SHORT' | 'FETCH_FAILED';
}

export interface ValidationReport {
  is_valid: boolean;
  errors: string[];
  cross_contamination_detected: boolean;
  placeholders_detected: boolean;
  missing_applicable_critical_fields: string[];
  field_applicability: Record<string, boolean>;
  evidence_anchors: Record<string, string>;
}

export interface V3EngineResult {
  status: V3VerificationStatus;
  route_key: string;
  route_hash: string;
  data: V3VisaData | null;
  source_url?: string;
  source_authority?: SourceAuthorityType;
  source_hash?: string;
  source_snapshot?: string;
  evidence_anchors?: Record<string, string>;
  field_applicability?: Record<string, boolean>;
  validation_errors?: string[];
  message?: string;
  is_cached?: boolean;
}
