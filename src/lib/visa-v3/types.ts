// src/lib/visa-v3/types.ts

export type V3VerificationStatus = 
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'NEEDS_REVIEW'
  | 'UNVERIFIED'
  | 'NOT_FOUND';

export type SourceAuthorityType = 
  | 'government'
  | 'embassy'
  | 'evisa'
  | 'vac';

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
  visa_type: ApplicableField<string>;              // NOT applicable for visa-free
  visa_required: ApplicableField<boolean>;         // ALWAYS applicable
  validity: ApplicableField<string>;              // ALWAYS applicable
  stay_duration: ApplicableField<string>;         // ALWAYS applicable
  entry_type: ApplicableField<string>;            // ALWAYS applicable
  processing_time: ApplicableField<string>;       // NOT applicable for visa-free/VOA
  fee: ApplicableField<string>;                   // NOT applicable for visa-free
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
  content_hash: string;       // SHA256 of cleaned content
  content_snapshot: string;   // First 5000 characters
  retrieved_at: string;       // ISO timestamp
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
