export interface VaultDocItem {
  key: string;
  title: string;
  description: string;
  icon: string;
  mandatory: boolean;
  hint: string;
}

export interface VaultDocChecklistEntry {
  fileName: string;
  size: string;
  verified: boolean;
  score?: number;
  summary?: string;
  uploadedAt: string;
}

export interface OcrData {
  documentNumber?: string;
  docNumber?: string;
  passportNumber?: string;
  fullName?: string;
  dob?: string;
  dateOfBirth?: string;
  nationality?: string;
  sex?: string;
  placeOfBirth?: string;
  placeOfIssue?: string;
  issueDate?: string;
  expiryDate?: string;
  mrzLine1?: string;
  mrzLine2?: string;
  [key: string]: any;
}

export interface VaultDocument {
  id: string;
  reqKey?: string;
  title: string;
  label?: string;
  originalLabel?: string;
  type: 'passport' | 'visa' | 'id' | 'insurance' | 'flight' | 'bank' | 'other';
  isRealUpload?: boolean;
  isUploaded: boolean;
  mandatory?: boolean;
  description?: string;
  hint?: string;
  docNumber: string;
  country: string;
  issuer: string;
  holderName: string;
  subDetails: string;
  dateOfBirth: string;
  expiryDate: string;
  expirySubtext: string;
  expiryStatus: 'valid' | 'expiring_soon' | 'expired' | 'permanent' | 'pending';
  status: 'verified' | 'pending' | 'rejected' | string;
  scannedMethod: string;
  uploadedAt: string;
  size: string;
  fileData?: string | null;
  ocrData?: OcrData | null;
  summary?: string;
  sqlId?: number | string;
}

export interface VisaApplicationCase {
  id: string;
  trackingId?: string;
  destination: string;
  visaType: string;
  applicantName?: string;
  passportCountry: string;
  purpose: string;
  status: 'submitted' | 'under_review' | 'docs_pending' | 'interview_scheduled' | 'approved' | 'rejected' | string;
  progress: number;
  submissionDate?: string;
  targetDate?: string;
  steps?: Array<{
    title: string;
    description: string;
    completed: boolean;
    current?: boolean;
    date?: string;
  }>;
  [key: string]: any;
}

export interface IeltsScore {
  L: number;
  R: number;
  W: number;
  S: number;
}

export interface LuggageItem {
  id: string;
  category: 'cabin' | 'checked' | 'predeparture';
  title: string;
}

export interface CountryOption {
  value: string;
  label: string;
  flag: string;
  defaultVisa?: string;
}

export interface PurposeOption {
  value: string;
  label: string;
  emoji: string;
}

export interface AuditState {
  auditPassportExpiry: string;
  auditPassportBlankPages: boolean | null;
  auditFinancialBalance: string;
  auditBankStatementType: string;
  auditInsuranceFrom: string;
  auditInsuranceTill: string;
  auditInsuranceCoverage: string;
  auditEmploymentType: 'salaried' | 'business';
  auditSalariedPayslips: string;
  auditSalariedForm16: boolean | null;
  auditSalariedNoc: boolean | null;
  auditSalariedItr: boolean | null;
  auditBusinessReg: boolean | null;
  auditBusinessItr: boolean | null;
  auditFlightDeptDate: string;
  auditFlightRetDate: string;
  auditFlightAirline: string;
  auditFlightHasLayover: boolean | null;
  auditFlightLayoverCity: string;
  auditAccommodationType: string;
  auditSponsorshipType: string;
  auditSponsorDocsReady: boolean | null;
  auditCoveringLetter: string;
  auditVisaFormFilled: boolean | null;
  auditTravelHistory: string;
  auditPastRefusal: boolean | null;
  auditRefusalMitigation: boolean | null;
}
