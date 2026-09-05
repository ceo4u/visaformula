// src/lib/student-visa.ts
// Country-specific student visa steps, documents, fees, processing, and requirements pipeline based on official consular requirements

export interface DocumentRequiredItem {
  title: string;
  description: string;
  is_mandatory: boolean;
}

export interface FinancialProofItem {
  type: string;
  minimum_balance_or_amount: string | null;
  time_frame: string;
  notes: string;
}

export interface OtherRequirementItem {
  category: string;
  details: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview?: string;
  consular_directives?: string[];
  application_portal?: string;
  vac_provider?: string;
  processing_time?: string;
  validity?: string;
  stay_duration?: string;
  entry_type?: string;
  processing_time_details?: string;
  validity_details?: string;
  stay_duration_details?: string;
  entry_type_details?: string;
  validity_and_stay?: {
    visa_validity?: string;
    max_stay_per_entry?: string;
    entry_type?: string;
  };
  documents_required: DocumentRequiredItem[];
  supportingDocuments?: any[];
  financial_proofs: FinancialProofItem[];
  other_requirements: OtherRequirementItem[];
  how_to_apply: string[];
  costs: {
    visa_fee: string;
    service_fee: string;
    total_fee: string;
    notes: string;
  };
  processing_and_timing: {
    apply_window: string;
    decision_time: string;
    max_extension: string;
    center_notes?: string;
  };
  faqs?: FAQItem[];
}

// ── COUNTRY NORMALIZATION HELPER ──
export function normalizeCountry(country: string): string {
  const c = (country || '').toLowerCase().trim().replace(/[-_]/g, ' ');
  if (c.includes('australia') || c.includes('subclass 500')) return 'australia';
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('ireland') || c.includes('irish') || c.includes('eire')) return 'ireland';
  if (c.includes('netherlands') || c.includes('holland') || c.includes('dutch')) return 'netherlands';
  if (c.includes('new zealand') || c === 'nz') return 'new-zealand';
  if (c.includes('sweden') || c.includes('swedish')) return 'sweden';
  if (c.includes('denmark') || c.includes('danish')) return 'denmark';
  return c;
}

// ── 1. STUDENT OVERVIEW — COUNTRY SPECIFIC ──
export function getStudentOverview(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'The Student Visa (Subclass 500) allows international students to reside in Australia for the full duration of their registered CRICOS academic program to undertake full-time higher education, vocational training, or postgraduate research. You must maintain enrolment and satisfactory course progress. Work rights: 48 hours per fortnight during term, unlimited during breaks.',
    'uk': 'The Student Route visa allows international students to study at a UK licensed Higher Education Provider (HEP). You can work part-time (up to 20 hours/week) during term and full-time during vacations. The visa is issued with a 90-day entry vignette and a Biometric Residence Permit (BRP) upon arrival. Graduate Route: 2 years post-study work (3 years for PhD).',
    'usa': 'The F-1 Student Visa allows international students to study at SEVP-certified U.S. institutions. You can work on-campus up to 20 hours/week during term and full-time during breaks. OPT (Optional Practical Training) allows 12-36 months of post-study work depending on your major (STEM OPT extension available for 24 months).',
    'canada': 'The Study Permit allows international students to study at Designated Learning Institutions (DLIs) in Canada. You can work part-time (up to 20 hours/week) during academic sessions and full-time during scheduled breaks. PGWP (Post-Graduation Work Permit) is available after graduation for 1-3 years.',
    'germany': 'The National Student Visa (Type D) allows international students to study at German universities. You can work up to 120 full days or 240 half days per year. After graduation, you can stay for up to 18 months to seek employment (Job Seeker Visa). APS certificate is mandatory for Indian applicants.',
    'ireland': 'The Long Stay Student Visa (Type D) allows international students to study at Irish universities. You can work part-time (up to 20 hours/week) during term and full-time during breaks. After graduation, you can stay for up to 12 months under the Third Level Graduate Scheme. Ireland is NOT part of the Schengen zone.',
    'netherlands': 'The Student Visa (MVV) allows international students to study at Dutch universities. You can work part-time (up to 16 hours/week) with a work permit. After graduation, you can apply for the Orientation Year Visa (up to 12 months job search). Residence permit is required for stay over 90 days.',
    'new-zealand': 'The Student Visa allows international students to study at New Zealand institutions. You can work part-time (up to 20 hours/week) during term and full-time during breaks. After graduation, you can apply for a Post-Study Work Visa for 1-3 years.',
    'sweden': 'The Residence Permit for Studies allows international students to study at Swedish universities. You can work part-time without restrictions during term and full-time during breaks. After graduation, you can apply for a Job Search Visa (up to 12 months).',
    'denmark': 'The Danish Student Residence Permit (ST1) allows international students to study at Danish universities. You can work up to 20 hours/week during term and full-time (37 hours/week) during June-August. After graduation, you can stay for up to 6 months to seek employment.'
  };

  return map[c] || `The Student Visa allows international students to reside in ${country} for the full duration of their academic program to undertake full-time higher education, vocational training, or research. You must maintain enrolment and comply with visa conditions.`;
}

// ── 2. STUDENT FEES — COUNTRY SPECIFIC ──
export function getStudentFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  const map: Record<string, any> = {
    'australia': {
      visa_fee: 'AUD 1,600 (approx. ₹88,000)',
      service_fee: 'Payable at VFS Global ABCC (approx. ₹1,650)',
      total_fee: 'AUD 1,600 Base Application Charge',
      notes: 'Paid online via ImmiAccount. Excludes OSHC (approx. AUD 600-900/year) and medical exam fees. Additional charges for dependents.'
    },
    'uk': {
      visa_fee: '£490 (approx. ₹52,400)',
      service_fee: '£776/year (IHS Healthcare Surcharge)',
      total_fee: '£1,266+ (Visa £490 + IHS £776)',
      notes: 'Paid online on GOV.UK. IHS calculated per 6-month block (£388/6 mo). TB test fee: £100-200 extra. Priority service available: +£500 (5 days) / +£1,000 (24 hours).'
    },
    'usa': {
      visa_fee: '185 USD (MRV Fee)',
      service_fee: '350 USD (SEVIS I-901 Fee)',
      total_fee: '535 USD Total Reference',
      notes: 'Paid online via US Visa Scheduling portal and fmjfee.com. Visa issuance fee may apply. SEVIS fee must be paid at least 3 days before interview.'
    },
    'canada': {
      visa_fee: 'CAD 150 (Study Permit Fee)',
      service_fee: 'CAD 85 (Biometrics Fee)',
      total_fee: 'CAD 235 Total Reference',
      notes: 'Paid online via IRCC portal. Excludes GIC (CAD 20,635) and medical exam fees. Additional fees for dependents.'
    },
    'germany': {
      visa_fee: '€75 (National Visa Fee)',
      service_fee: '₹2,200 (VFS Service Charge)',
      total_fee: '€75 + Service Fee',
      notes: 'Payable at German Embassy/VFS. Excludes blocked account (€11,904/year) and health insurance. APS certificate processing fee: ₹15,000-20,000.'
    },
    'ireland': {
      visa_fee: '€60 Single Entry (approx. ₹5,400) / €100 Multiple Entry (approx. ₹9,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: '€60 - €100 Official Fee + VFS Logistics',
      notes: 'Payable at VFS Global Ireland Visa Application Centre. Tuition deposit is separate. Multiple Entry visa requires justification.'
    },
    'netherlands': {
      visa_fee: '€210 (MVV + Residence Permit)',
      service_fee: 'Payable at VFS Global',
      total_fee: '€210 Total Reference',
      notes: 'Includes both MVV entry visa and Residence Permit application fee. Additional fees for dependents.'
    },
    'new-zealand': {
      visa_fee: 'NZD 530 (approx. ₹27,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: 'NZD 530 Base Application Charge',
      notes: 'Paid online via Immigration New Zealand portal. Medical exam fees extra. Additional fees for dependents.'
    },
    'sweden': {
      visa_fee: 'SEK 1,500 (approx. ₹11,500)',
      service_fee: 'Payable at VFS Global',
      total_fee: 'SEK 1,500 Total Reference',
      notes: 'Paid online via Migration Agency portal. Health insurance extra. Additional fees for dependents.'
    },
    'denmark': {
      visa_fee: 'DKK 2,115 - 2,600 (SIRI Fee) + DKK 1,710 (ApplyVisa Fee)',
      service_fee: '₹1,800 - ₹2,500 (VFS Biometrics)',
      total_fee: 'DKK 3,825 - 4,310 Total Reference',
      notes: 'Paid online via SIRI and ApplyVisa portals. Blocked account may be required. Additional fees for dependents.'
    }
  };

  return map[c] || {
    visa_fee: 'Official Statutory Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Check official embassy website for current fees. Additional charges may apply.'
  };
}

// ── 3. STUDENT PROCESSING TIME — COUNTRY SPECIFIC ──
export function getStudentProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Higher Education Sector: 30 to 60 calendar days. Peak intake (Feb/July): up to 10 weeks. Student Guardian (Subclass 590): 3 to 5 months. SDS (Student Direct Stream): 20-30 days.',
    'uk': 'Standard: 3 weeks (15 working days). Priority Service: 5 working days (+£500). Super Priority: 24 hours (+£1,000). Peak months (July-Sept): up to 6-8 weeks.',
    'usa': 'Consular Decision: Verbal at interview. Passport dispatch: 3-5 business days via BlueDart. Wait times vary: New Delhi (3 days), Mumbai (5 days), Hyderabad (4 days), Chennai (5 days), Kolkata (7 days).',
    'canada': '4 to 8 weeks (IRCC Standard SLA). SDS (Student Direct Stream): 20 calendar days. New Delhi processing: 4-6 weeks. Biometrics must be submitted within 30 days of application.',
    'germany': '4 to 8 weeks (German Mission Review). New Delhi: 4-6 weeks. Mumbai: 3-5 weeks. APS certificate processing: 2-4 weeks. Peak season (June-Sept): up to 10 weeks.',
    'ireland': '6 to 8 weeks (20 to 25 working days from Embassy receipt). Peak months (June-Aug): up to 10 weeks. AVATS application must be submitted online before VFS appointment.',
    'netherlands': '4 to 8 weeks (IND Processing). MVV entry visa: 4-6 weeks. Residence permit: 4-8 weeks. Total processing: 2-3 months. Peak season (May-Sept): up to 12 weeks.',
    'new-zealand': '4 to 6 weeks (INZ Standard SLA). Student visa processing: 30-45 calendar days. Priority processing available for accredited institutions: 10-15 days.',
    'sweden': '2 to 4 months (Migration Agency SLA). Student Residence Permit: 2-4 months. Fast-track for university applications: 4-6 weeks. Peak season (May-Aug): up to 5 months.',
    'denmark': '60 calendar days (SIRI Standard SLA). Fast-track available if institution is certified: 4-6 weeks. Biometrics must be submitted within 14 calendar days of application.'
  };

  return map[c] || 'Per Official Consular SLA. Apply at least 3-4 months before course start.';
}

// ── 4. STUDENT PROCESSING DETAILS — FOR TOOLTIP ──
export function getStudentProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Apply at least 3-4 months before course start. eCoE must be valid at time of application. Genuine Student (GS) responses required. Health examination (HAP ID) must be completed within 28 days of application lodgement.',
    'uk': 'Apply at least 3 months before course start. CAS valid for 6 months from issuance. Priority service available: 5 working days (+£500) or 24 hours (+£1,000). TB test must be valid for 6 months.',
    'usa': 'Apply at least 3-4 months before course start. I-20 valid for SEVIS registration. Emergency appointments available. Visa interview required. DS-160 must be submitted online.',
    'canada': 'Apply at least 4-6 months before course start. LOA and PAL must be valid. Biometrics must be submitted within 30 days. eMedical exam must be completed before submission.',
    'germany': 'Apply at least 3-4 months before course start. APS certificate valid for visa. Blocked account required. Health insurance must be valid from date of arrival.',
    'ireland': 'Apply at least 3-4 months before course start. AVATS application valid for 30 days. Biometrics within 14 days of AVATS submission. VFS appointment required.',
    'netherlands': 'Apply at least 3-4 months before course start. MVV valid for 90 days. Residence permit issued upon arrival. IND processing times vary by application type.',
    'new-zealand': 'Apply at least 3-4 months before course start. Visa valid for 12 months renewable. Priority processing available for accredited institutions.',
    'sweden': 'Apply at least 3-4 months before course start. Residence permit valid for 12 months renewable. Biometrics required at Embassy or VFS.',
    'denmark': 'Apply at least 3-4 months before course start. Biometrics required within 14 days of application. SIRI processing times vary by application type.'
  };

  return map[c] || 'Apply at least 3-4 months before course start. Check official website for current processing times. Biometrics and medical exams may be required.';
}

// ── 5. STUDENT ENTRY TYPE — COUNTRY SPECIFIC ──
export function getStudentEntryType(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Multiple Entry (Subclass 500)',
    'uk': 'Multiple Entry (90-Day Entry Vignette + BRP)',
    'usa': 'Multiple Entry (F-1 Visa)',
    'canada': 'Multiple Entry (Study Permit)',
    'germany': 'Multiple Entry (National Visa Type D)',
    'ireland': 'Single Entry (Long Stay D) / Multiple Entry (Subject to consular approval)',
    'netherlands': 'Multiple Entry (MVV Entry Visa + Residence Permit)',
    'new-zealand': 'Multiple Entry (Student Visa)',
    'sweden': 'Multiple Entry (Residence Permit)',
    'denmark': 'Multiple Entry (ST1 Residence Permit)'
  };

  return map[c] || 'Multiple Entry';
}

// ── 6. STUDENT ENTRY DETAILS — FOR TOOLTIP ──
export function getStudentEntryDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Multiple entries during validity of your Student Visa (Subclass 500). You can exit and re-enter Australia during the course duration. Must maintain full-time enrolment.',
    'uk': '90-day entry vignette allows first entry. Biometric Residence Permit (BRP) issued upon arrival for multiple entries during course duration. Must collect BRP within 10 days of arrival.',
    'usa': 'F-1 visa allows multiple entries during its validity. Duration of Status (D/S) maintained as long as you are enrolled full-time. Must maintain valid passport.',
    'canada': 'Study Permit is a status document. Entry is facilitated by a TRV (Temporary Resident Visa) or eTA, both allow multiple entries. Must maintain valid status.',
    'germany': 'National Visa (Type D) allows multiple entries during its validity. Residence permit issued upon arrival replaces the visa. Must register address within 14 days.',
    'ireland': 'Single Entry visa for first entry. Irish Residence Permit (IRP Stamp 2) issued upon arrival for multiple entries. Must register with ISD/Garda within 90 days.',
    'netherlands': 'MVV entry visa allows single entry. Residence Permit allows multiple entries after arrival. Must register at municipality within 5 days of arrival.',
    'new-zealand': 'Multiple entry student visa valid for the duration of your course. Must maintain enrolment at an accredited institution.',
    'sweden': 'Residence permit card allows multiple entries during its validity. Must register with Swedish Tax Agency (Skatteverket) upon arrival.',
    'denmark': 'Residence permit card allows multiple entries during its validity. Must register with Civil Registration System (CPR) within 5 days of arrival.'
  };

  return map[c] || 'Multiple entries allowed during visa validity. Check specific conditions for your destination.';
}

// ── 7. STUDENT VALIDITY — COUNTRY SPECIFIC ──
export function getStudentValidity(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Duration of enrolled CRICOS course plus 1 to 2 months post-study buffer',
    'uk': 'Full Course Duration + 4 Months Wrap-up (90-Day Entry Vignette)',
    'usa': 'Duration of Status (D/S) — Typically up to 5 Years',
    'canada': 'Duration of Study + 90 Days',
    'germany': 'Duration of Study (Up to 4-5 Years)',
    'ireland': 'Duration of Academic Program (1-4 Years)',
    'netherlands': 'Duration of Academic Program (1-4 Years)',
    'new-zealand': 'Duration of Course (1-4 Years)',
    'sweden': 'Duration of Academic Program (1-4 Years)',
    'denmark': 'Duration of Study Programme + 6 Months Job Search Extension'
  };

  return map[c] || 'Duration of Academic Program';
}

// ── 8. STUDENT VALIDITY DETAILS — FOR TOOLTIP ──
export function getStudentValidityDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Valid for the total duration of the registered CRICOS program plus 1 to 2 months post-study buffer. Allows entry up to 90 days before course start.',
    'uk': 'Valid for full course length plus additional 4 months wrap-up period. Initial entry vignette is valid for 90 days.',
    'usa': 'Valid for Duration of Status (D/S) indicated on Form I-20, typically up to 5 years as long as full-time student status is maintained.',
    'canada': 'Valid for the duration of the academic course plus an additional 90 days to prepare for departure or apply for PGWP.',
    'germany': 'Initial visa valid for 3 to 6 months upon arrival, converted to an academic residence permit valid for duration of degree (up to 4-5 years).',
    'ireland': 'Valid for full duration of academic degree (1 to 4 years), subject to annual IRP Stamp 2 renewal and academic progress.',
    'netherlands': 'MVV entry sticker valid for 90 days, replaced by student residence permit valid for total course duration (1-4 years).',
    'new-zealand': 'Valid for length of tuition paid, up to 4 years for degree-level qualifications at accredited institutions.',
    'sweden': 'Residence permit issued for up to 1 year at a time, renewable annually throughout academic program.',
    'denmark': 'Valid for the standardized normative duration of the study programme plus 6 months post-study job seeking period.'
  };

  return map[c] || 'Valid for the official duration of the registered academic program subject to maintaining active enrollment.';
}

// ── 9. STUDENT STAY DURATION — COUNTRY SPECIFIC ──
export function getStudentStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Full duration of registered academic program (up to 5 years)',
    'uk': 'Length of Academic Program (1-4 Years)',
    'usa': 'Duration of Academic Program (D/S) + 60-Day Grace Period',
    'canada': 'Full Study Programme Duration (Renewable Annually)',
    'germany': 'Duration of Academic Degree (Up to 4-5 Years)',
    'ireland': 'Full Duration of Academic Course (1-4 Years)',
    'netherlands': 'Duration of Academic Program (1-4 Years)',
    'new-zealand': 'Duration of Course (1-4 Years)',
    'sweden': 'Duration of Academic Program (1-4 Years)',
    'denmark': 'Duration of Study Programme + 6 Months Post-Study Job Seeking'
  };

  return map[c] || 'Full Duration of Academic Program';
}

// ── 10. STUDENT STAY DETAILS — FOR TOOLTIP ──
export function getStudentStayDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Full duration of registered academic program (up to 5 years). Post-study work rights: 2-4 years depending on qualification. Must maintain full-time enrolment.',
    'uk': 'Length of Academic Program (1-4 Years). Graduate Route: 2 years (PhD: 3 years) post-study work. Must complete course successfully.',
    'usa': 'Duration of Academic Program (D/S) + 60-Day Grace Period. OPT: 12-36 months post-study depending on major. Must maintain full-time status.',
    'canada': 'Full Study Programme Duration (Renewable Annually). PGWP: 1-3 years post-study. Must maintain full-time enrolment.',
    'germany': 'Duration of Academic Degree (Up to 4-5 Years). Job Seeker Visa: 18 months post-study. Must maintain full-time enrolment.',
    'ireland': 'Full Duration of Academic Course (1-4 Years). Third Level Graduate Scheme: 12 months post-study. Must maintain full-time enrolment.',
    'netherlands': 'Duration of Academic Program (1-4 Years). Orientation Year: 12 months job search. Must maintain full-time enrolment.',
    'new-zealand': 'Duration of Course (1-4 Years). Post-Study Work: 1-3 years. Must maintain full-time enrolment.',
    'sweden': 'Duration of Academic Program (1-4 Years). Job Search Visa: 12 months post-study. Must maintain full-time enrolment.',
    'denmark': 'Duration of Study Programme + 6 Months Post-Study Job Seeking. Extendable for thesis. Must maintain full-time enrolment.'
  };

  return map[c] || 'Full duration of academic program. Post-study work rights may be available. Check specific conditions for your destination.';
}

// ── 11. STUDENT FAQ — COUNTRY SPECIFIC ──
export function getStudentFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FAQItem[]> = {
    'australia': [
      {
        question: 'Do I need OSHC for my entire stay in Australia?',
        answer: 'Yes, Overseas Student Health Cover (OSHC) is mandatory for the entire duration of your Student Visa. You must purchase OSHC from an approved Australian provider (BUPA, Medibank, Allianz, etc.) before your visa is granted.'
      },
      {
        question: 'Can I work while studying in Australia?',
        answer: 'Yes, Student Visa (Subclass 500) holders can work up to 48 hours per fortnight during term time and unlimited hours during scheduled course breaks. You must maintain full-time enrolment.'
      },
      {
        question: 'What is the Genuine Student (GS) requirement?',
        answer: 'The GS requirement replaces the GTE statement. You must provide evidence of your academic background, study progression, future career plans, and intention to comply with visa conditions. This is assessed during visa application.'
      }
    ],
    'uk': [
      {
        question: 'Do I need a TB test for UK Student Visa?',
        answer: 'Yes, Indian passport holders must provide a valid TB test certificate from a UKVI-approved clinic. The test must be taken within 6 months of visa application. Apollo, Fortis, and Max Healthcare are authorized clinics in India.'
      },
      {
        question: 'What is the IHS fee and why do I need to pay it?',
        answer: 'The Immigration Health Surcharge (IHS) gives you access to the UK\'s National Health Service (NHS). You must pay £776 per year of study. The fee is calculated in 6-month blocks (£388 for 4-6 months).'
      },
      {
        question: 'What is the 28-day maintenance rule?',
        answer: 'You must show sufficient funds in your bank account for at least 28 consecutive days. The funds must be held for 28 days ending within 31 days of your visa application. This includes tuition + living costs.'
      }
    ],
    'usa': [
      {
        question: 'What is the SEVIS I-901 fee and why do I need to pay it?',
        answer: 'The SEVIS I-901 fee is a mandatory $350 USD fee for all F-1 student visa applicants. It funds the Student and Exchange Visitor Program (SEVP). You must pay this fee at least 3 days before your consular interview.'
      },
      {
        question: 'What is the difference between OPT and CPT?',
        answer: 'OPT (Optional Practical Training) allows up to 12-36 months of post-study work authorization. CPT (Curricular Practical Training) allows paid internships during your degree program. Both require approval from your DSO (Designated School Official).'
      },
      {
        question: 'Can I work on campus as an F-1 student?',
        answer: 'Yes, F-1 students can work on-campus up to 20 hours/week during academic terms and full-time during breaks. You must maintain full-time enrollment status.'
      }
    ],
    'canada': [
      {
        question: 'What is a Provincial Attestation Letter (PAL)?',
        answer: 'A PAL is an official letter issued by the province confirming your admission quota. Required for most provinces as of 2024. Your DLI will provide guidance on obtaining this document.'
      },
      {
        question: 'What is the GIC amount for Canada?',
        answer: 'You need a Guaranteed Investment Certificate (GIC) of CAD $20,635 from a participating Canadian financial institution (CIBC, Scotiabank, etc.). This proves you have enough living expenses for your first year.'
      },
      {
        question: 'Can I work during my studies in Canada?',
        answer: 'Yes, you can work up to 20 hours/week off-campus during academic sessions and full-time during scheduled breaks. No work permit required for on-campus jobs.'
      }
    ],
    'germany': [
      {
        question: 'What is the APS certificate and do I need it?',
        answer: 'The APS certificate is mandatory for Indian students applying to German universities. It verifies your academic credentials. You must obtain it before applying for a visa. Processing time: 2-4 weeks. Fee: approx. ₹15,000-20,000.'
      },
      {
        question: 'What is the blocked account amount for Germany?',
        answer: 'You need a blocked account (Sperrkonto) with €11,904 (approx. ₹10.8 Lakhs) for one year of living expenses. The account must be opened with an approved German bank (Expatrio, Fintiba, Deutsche Bank).'
      },
      {
        question: 'Can I work in Germany as an international student?',
        answer: 'Yes, you can work up to 120 full days or 240 half days per year. During lecture-free periods, you can work full-time. You must maintain full-time enrollment status.'
      }
    ],
    'ireland': [
      {
        question: 'Is Ireland part of the Schengen zone?',
        answer: 'No, Ireland is not part of the Schengen zone. A Schengen visa does NOT grant entry to Ireland. You must apply for a separate Irish visa through AVATS (visas.inis.gov.ie/avats).'
      },
      {
        question: 'What is the AVATS portal?',
        answer: 'AVATS (visas.inis.gov.ie/avats) is the official online visa application portal for Ireland. All Indian students must complete their application on AVATS before submitting documents at VFS Global.'
      },
      {
        question: 'Can I work in Ireland as a student?',
        answer: 'Yes, you can work up to 20 hours/week during term and full-time during holidays. After graduation, you can stay for up to 12 months under the Third Level Graduate Scheme.'
      }
    ],
    'netherlands': [
      {
        question: 'Do I need a residence permit to study in the Netherlands?',
        answer: 'Yes, for studies exceeding 90 days you require an MVV entry visa and a Residence Permit (VVR), which is arranged directly by your Dutch university through the IND.'
      },
      {
        question: 'Can I work while studying in the Netherlands?',
        answer: 'Yes, international students can work up to 16 hours per week during term or full-time during June, July, and August. An employer work permit (TWV) is required.'
      },
      {
        question: 'What is the Orientation Year (Zoekjaar) for graduates?',
        answer: 'The Orientation Year gives graduates from Dutch universities up to 1 year to seek employment as a highly skilled migrant without standard salary thresholds.'
      }
    ],
    'new-zealand': [
      {
        question: 'Can I work on a New Zealand Student Visa?',
        answer: 'Yes, most student visa holders enrolled in full-time courses can work up to 20 hours per week during term and full-time during scheduled holidays.'
      },
      {
        question: 'What post-study work options are available in New Zealand?',
        answer: 'Graduates with eligible degree-level qualifications can apply for a Post-Study Work Visa valid for 1 to 3 years depending on the level and duration of study.'
      },
      {
        question: 'What is the required living cost fund for New Zealand student visa?',
        answer: 'You must demonstrate access to NZD $20,000 per year of study for living expenses (or NZD $1,667 per month for shorter courses) held in an accessible bank account or via an approved FTS (Funds Transfer Scheme).'
      }
    ],
    'sweden': [
      {
        question: 'Can international students work in Sweden?',
        answer: 'Yes, international students holding a valid residence permit for studies can work without hourly restrictions during term time and summer breaks as long as they maintain progress.'
      },
      {
        question: 'How much money do I need to prove for a Swedish study permit?',
        answer: 'You must prove living expenses of at least SEK 10,314 per month for 10 months of each academic year through verifiable bank funds in your own name.'
      },
      {
        question: 'Can I stay in Sweden after graduation to find work?',
        answer: 'Yes, you can apply for a residence permit to seek employment or explore starting your own business in Sweden for up to 12 months after completing your degree program.'
      }
    ],
    'denmark': [
      {
        question: 'Can I work in Denmark on a student residence permit?',
        answer: 'Yes, non-EU students can work up to 20 hours per week during term and full-time (37 hours per week) in June, July, and August.'
      },
      {
        question: 'What is the job search extension after graduating in Denmark?',
        answer: 'Your ST1 residence permit is granted with an automatic 6-month extension beyond the standard study period to seek employment in Denmark.'
      },
      {
        question: 'What are the financial maintenance requirements for studying in Denmark?',
        answer: 'You must demonstrate self-support capability of approximately DKK 6,820 per month (or proof of prepaid tuition and living stipends) unless covered by an official Danish state or university scholarship.'
      }
    ]
  };

  const defaultFAQ: FAQItem[] = [
    {
      question: `Do I need a visa to study in ${country}?`,
      answer: `Yes, international students need a valid student visa to study in ${country}. You must apply through the official immigration authorities of ${country}.`
    },
    {
      question: `Can I work while studying in ${country}?`,
      answer: `Yes, you can work part-time (usually up to 20 hours/week) during academic terms and full-time during breaks. Specific work restrictions depend on your visa type.`
    },
    {
      question: `What documents do I need for a student visa?`,
      answer: `You typically need a valid passport, university offer letter, financial proof, English language test scores, health insurance, and academic transcripts. Check specific requirements for ${country}.`
    }
  ];

  return map[c] || defaultFAQ;
}

// ── 12. OFFICIAL SOURCE NAME — COUNTRY SPECIFIC ──
export function getStudentOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Australian Department of Home Affairs (ImmiAccount)',
    'uk': 'UK Visas and Immigration (UKVI)',
    'usa': 'U.S. Department of State & U.S. Embassy Consular Affairs',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC)',
    'germany': 'German Federal Foreign Office & Ausländerbehörde',
    'ireland': 'Immigration Service Delivery (ISD) & Embassy of Ireland',
    'netherlands': 'Immigration and Naturalisation Service (IND) Netherlands',
    'new-zealand': 'Immigration New Zealand (INZ)',
    'sweden': 'Swedish Migration Agency (Migrationsverket)',
    'denmark': 'Danish Agency for International Recruitment and Integration (SIRI)'
  };

  return map[c] || `${country} Immigration Authority`;
}

// Backward-compatibility alias
export const getOfficialSourceName = getStudentOfficialSourceName;

// ── 13. STUDENT FINANCIAL PROOFS — COUNTRY SPECIFIC ──
export function getStudentFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);

  if (c === 'australia') {
    return [{
      type: 'Living & Tuition Funds (AUD 29,710/yr + 1st Year Tuition)',
      minimum_balance_or_amount: 'AUD 29,710 living costs + 1 year tuition fees + return airfare',
      time_frame: 'Seasoned bank funds held for minimum 3 months or approved education loan',
      notes: 'Proof of funds must be genuinely accessible by the student. Form 157A Genuine Student verification applies.'
    }];
  }
  if (c === 'uk') {
    return [{
      type: 'Living Maintenance Funds (28-Day Rule)',
      minimum_balance_or_amount: '£1,483/month London (max £13,347) OR £1,136/month Outside London (max £10,224)',
      time_frame: 'Held consecutively for at least 28 days ending within 31 days of application',
      notes: 'Strict 28-day rule under Appendix Finance. Any dip below the required threshold will cause mandatory visa refusal.'
    }];
  }
  if (c === 'usa') {
    return [{
      type: 'Total 1st Year Cost of Attendance (Form I-20)',
      minimum_balance_or_amount: '100% of tuition, living expenses and insurance as specified in Section 7 of Form I-20',
      time_frame: 'Immediate liquid funds (savings account, fixed deposits, liquid investments)',
      notes: 'Consular officers require proof of immediately available liquid funds for Year 1.'
    }];
  }
  if (c === 'canada') {
    return [{
      type: 'Guaranteed Investment Certificate (GIC)',
      minimum_balance_or_amount: 'CAD $20,635 in an IRCC-approved Canadian financial institution',
      time_frame: 'GIC confirmation certificate issued prior to study permit submission',
      notes: 'Mandatory standard living cost proof for international students arriving in Canada.'
    }];
  }
  if (c === 'germany') {
    return [{
      type: 'Blocked Account (Sperrkonto)',
      minimum_balance_or_amount: '€11,904 (€992 per month for 12 months)',
      time_frame: 'Opened and funded at approved provider (Expatrio, Fintiba, Coracle, Deutsche Bank)',
      notes: 'Mandatory official Sperrkonto opening confirmation (06 Sperrfreigabe) required at visa appointment.'
    }];
  }
  if (c === 'ireland') {
    return [{
      type: 'Immediate Living Expenses Funds',
      minimum_balance_or_amount: 'Minimum €7,000 to €10,000 readily available living expenses',
      time_frame: 'Past 6 consecutive months bank statements',
      notes: 'Must demonstrate self-sufficiency for initial academic year in Ireland.'
    }];
  }
  if (c === 'netherlands') {
    return [{
      type: 'Living Expense Benchmark & Tuition Coverage',
      minimum_balance_or_amount: '€1,045/month living maintenance (approx. €12,540/year) + tuition balance',
      time_frame: 'Bank statements or transferred directly to Dutch university bank account',
      notes: 'Living fees benchmark defined officially by IND Netherlands.'
    }];
  }
  if (c === 'new-zealand') {
    return [{
      type: 'Living Maintenance & Outward Travel Guarantee',
      minimum_balance_or_amount: 'NZD $20,000 per academic year + prepaid course tuition fees',
      time_frame: 'Last 3-6 months genuine bank statements or Financial Undertaking Form (INZ 1014)',
      notes: 'Funds must be held genuinely by student or immediate family sponsor.'
    }];
  }
  if (c === 'sweden') {
    return [{
      type: 'Living Cost Requirement (SEK 10,314/month)',
      minimum_balance_or_amount: 'SEK 10,314 per month (SEK 103,140 for 10-month academic session)',
      time_frame: 'Personal bank statements in applicant\'s own name showing available liquid funds',
      notes: 'Migrationsverket requires funds to be deposited in the student\'s individual bank account.'
    }];
  }
  if (c === 'denmark') {
    return [{
      type: 'Living Cost Benchmark (DKK 6,820/month)',
      minimum_balance_or_amount: 'DKK 6,820 per month (approx. DKK 81,840 for 12 months) + paid tuition fee',
      time_frame: 'Bank statement in student\'s name showing total sum prior to submission',
      notes: 'Required by Danish Agency for International Recruitment and Integration (SIRI).'
    }];
  }

  return [{
    type: 'Proof of Sufficient Educational Funds',
    minimum_balance_or_amount: '1st year tuition fees + living maintenance allowance',
    time_frame: 'Last 3 to 6 months bank statements or loan sanction letter',
    notes: 'Demonstrating financial capability to finance education abroad without unauthorized work.'
  }];
}

// ── 14. STUDENT OTHER REQUIREMENTS — COUNTRY SPECIFIC ──
export function getStudentOtherRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);

  if (c === 'australia') {
    return [
      { category: 'Overseas Student Health Cover (OSHC)', details: 'Mandatory medical insurance coverage with an approved Australian health fund for the entire visa grant period.' },
      { category: 'Biometrics & Panel Physician Health Check', details: 'Biometrics at VFS Global ABCC and health examination (HAP ID) at an authorized immigration panel clinic.' }
    ];
  }
  if (c === 'uk') {
    return [
      { category: 'Tuberculosis (TB) Screening', details: 'Mandatory TB test at an authorized UKVI panel clinic in India (valid for 6 months).' },
      { category: 'Immigration Health Surcharge (IHS)', details: 'Payable online at £776 per year of study to access National Health Service (NHS) in the UK.' }
    ];
  }
  if (c === 'usa') {
    return [
      { category: 'SEVIS I-901 Registration', details: 'Mandatory 350 USD SEVIS fee paid online at fmjfee.com before booking consular interview.' },
      { category: 'Consular In-Person Interview', details: 'Mandatory interview with a U.S. Consular Officer demonstrating non-immigrant intent under INA 214(b).' }
    ];
  }
  if (c === 'canada') {
    return [
      { category: 'Provincial Attestation Letter (PAL)', details: 'Official PAL issued by the province confirming institution quota allocation.' },
      { category: 'Upfront Medical Examination', details: 'eMedical examination conducted by an IRCC-approved panel physician.' }
    ];
  }
  if (c === 'germany') {
    return [
      { category: 'APS Certificate (Akademische Prüfstelle)', details: 'Mandatory document verification certificate issued by the German Embassy New Delhi for Indian degree holders.' },
      { category: 'Health Insurance Coverage', details: 'Statutory student health insurance (TK, AOK, Barmer) or approved incoming insurance.' }
    ];
  }
  if (c === 'ireland') {
    return [
      { category: 'AVATS Online Application', details: 'Online registration on visas.inis.gov.ie/avats and physical submission at VFS Global Ireland.' },
      { category: 'Irish Residence Permit (IRP Stamp 2)', details: 'Register with ISD at Burgh Quay or local Garda district headquarters within 90 days of arrival in Ireland.' }
    ];
  }
  if (c === 'netherlands') {
    return [
      { category: 'Institutional MVV Application', details: 'The host educational institution must submit the TEV (entry + residence permit) directly to the IND.' },
      { category: 'Municipal BSN & TB Screening', details: 'Register at the Dutch municipal town hall (Gemeente) for BSN within 5 days of arrival and complete GGD TB screening.' }
    ];
  }
  if (c === 'new-zealand') {
    return [
      { category: 'Immigration Medical & Chest X-Ray', details: 'Mandatory medical examination and chest X-ray at an approved eMedical clinic.' },
      { category: 'Police Clearance Certificate (PCC)', details: 'Original PCC issued by Regional Passport Office (RPO) proving good character.' }
    ];
  }
  if (c === 'sweden') {
    return [
      { category: 'Comprehensive Health Insurance', details: 'Full medical coverage via Kammarkollegiet or approved private insurance policy.' },
      { category: 'Biometric Residence Permit Card', details: 'Enroll fingerprints and photograph at Swedish Mission or VFS for card issuance.' }
    ];
  }
  if (c === 'denmark') {
    return [
      { category: 'SIRI Biometrics Enrollment', details: 'Digital biometric facial photo and fingerprints must be recorded at VFS within 14 calendar days of ST1 application.' },
      { category: 'Civil Registration (CPR) Number', details: 'Register with Danish municipality (Borgerservice) for CPR card and healthcare access.' }
    ];
  }

  return [
    { category: 'Admission Confirmation', details: 'Unconditional admission confirmation from an accredited educational institution.' },
    { category: 'Health & Biometrics', details: 'Valid medical clearance and digital biometrics submitted at the designated visa application centre.' }
  ];
}

// ── 15. STUDENT VISA STEPS — COUNTRY SPECIFIC ──
// Returns the correct 8 steps for each country, starting with University Admission
export function getStudentVisaSteps(
  fromCountry: string,
  toCountry: string,
  visaType: string = 'Student Visa'
): string[] {
  const c = normalizeCountry(toCountry);

  // ── AUSTRALIA STUDENT (Subclass 500) ──
  if (c === 'australia') {
    return [
      "Step 1: Research & Select University — Research CRICOS-registered courses and universities in Australia that match your academic and career goals. Check rankings, location, fees, and scholarship opportunities.",
      "Step 2: Meet Admission Requirements — Check academic qualifications, English language proficiency (IELTS Academic 6.5+ / PTE 58+ / TOEFL iBT 79+), and work experience (if required for your course).",
      "Step 3: Apply to University — Submit your application directly to the university or through an authorized agent. Include academic transcripts, English test scores, and recommendation letters.",
      "Step 4: Accept Offer & Pay Deposit — Receive your Letter of Offer, accept it, and pay the tuition deposit as per the offer letter instructions.",
      "Step 5: Receive eCoE — Receive your electronic Confirmation of Enrolment (eCoE) from the university. This is mandatory for visa application and contains your CRICOS course code.",
      "Step 6: Apply for Student Visa (Subclass 500) — Lodge your visa application on ImmiAccount with your eCoE, OSHC (Overseas Student Health Cover), financial proofs, and Genuine Student (GS) responses.",
      "Step 7: Health & Biometrics — Complete health examination (HAP ID) at an approved panel clinic and attend biometrics at VFS Global Australian Biometric Collection Centre.",
      "Step 8: Receive Visa & Plan Travel — Receive your visa grant notification via ImmiAccount and plan your travel to Australia (up to 90 days before course start)."
    ];
  }

  // ── UK STUDENT (Student Route) ──
  if (c === 'uk') {
    return [
      "Step 1: Research & Select University — Research UK universities and courses through UCAS (undergraduate) or direct application portals (postgraduate). Check rankings, location, and career outcomes.",
      "Step 2: Meet Admission Requirements — Check academic qualifications, English language (IELTS for UKVI / SELT), references, and any specific course prerequisites.",
      "Step 3: Apply to University — Submit your application through UCAS (undergraduate) or directly to the university (postgraduate). Include academic transcripts, personal statement, and references.",
      "Step 4: Accept Offer & Pay Deposit — Receive your unconditional offer letter, accept it, and pay the tuition deposit as required.",
      "Step 5: Receive CAS — Receive your Confirmation of Acceptance for Studies (CAS) from the university. This 14-digit reference number is mandatory for visa application.",
      "Step 6: Apply for Student Visa — Complete the online Student Visa application on GOV.UK with your CAS, financial proofs (28-day maintenance rule), and TB test certificate.",
      "Step 7: Pay IHS & Biometrics — Pay the Immigration Health Surcharge (IHS) and visa fee, then attend biometrics at VFS Global UK Visa Application Centre.",
      "Step 8: Receive Visa & Plan Travel — Receive your visa decision and 90-day entry vignette. Plan travel to the UK (up to 1 month before course start)."
    ];
  }

  // ── USA STUDENT (F-1 Visa) ──
  if (c === 'usa') {
    return [
      "Step 1: Research & Select University — Research SEVP-certified U.S. universities and programs that match your academic goals. Check rankings, location, and STEM OPT eligibility.",
      "Step 2: Meet Admission Requirements — Check academic transcripts, GRE/GMAT (if required), English proficiency (TOEFL iBT 80-100 / IELTS 6.5-7.0), and recommendation letters.",
      "Step 3: Apply to University — Submit your application through the university's application portal (Common App, Coalition App, or direct). Include essays, transcripts, and test scores.",
      "Step 4: Accept Offer & Pay Deposit — Receive your admission decision and formal acceptance letter. Accept the offer and pay the enrollment deposit.",
      "Step 5: Receive I-20 & Pay SEVIS — Pay the SEVIS I-901 fee ($350 USD) and receive your Form I-20 from the university. This is mandatory for visa application.",
      "Step 6: Complete DS-160 & Schedule Interview — Complete the DS-160 online visa application and schedule your F-1 visa interview at the U.S. Embassy/Consulate.",
      "Step 7: Attend Visa Interview — Attend the visa interview with your I-20, financial proofs, academic documents, and SEVIS fee receipt. Be prepared to demonstrate non-immigrant intent.",
      "Step 8: Receive Visa & Plan Travel — Receive your F-1 visa stamp. Plan travel to the U.S. (up to 30 days before course start)."
    ];
  }

  // ── CANADA STUDENT (Study Permit) ──
  if (c === 'canada') {
    return [
      "Step 1: Research & Select DLI — Research Designated Learning Institutions (DLIs) and programs in Canada. Check rankings, location, and PGWP eligibility.",
      "Step 2: Meet Admission Requirements — Check academic qualifications, English/French proficiency (IELTS 6.0-6.5 / PTE Core 60-65 / TEF), and prerequisites.",
      "Step 3: Apply to DLI — Submit your application directly to the DLI or through an authorized agent. Include transcripts, language scores, and recommendation letters.",
      "Step 4: Accept Offer & Pay Deposit — Receive your Letter of Acceptance (LOA), accept it, and pay the tuition deposit as required.",
      "Step 5: Obtain PAL — Obtain your Provincial Attestation Letter (PAL) from the province (required for most provinces as of 2024).",
      "Step 6: Apply for Study Permit — Apply for your Study Permit through the IRCC portal with your LOA, PAL, Guaranteed Investment Certificate (GIC CAD $20,635), and financial proofs.",
      "Step 7: Biometrics & Medical — Complete your biometrics at VFS Global Canada and medical examination (eMedical) at an IRCC-approved panel physician.",
      "Step 8: Receive Permit & Plan Travel — Receive your Study Permit approval and Port of Entry (POE) Letter of Introduction. Plan travel to Canada."
    ];
  }

  // ── GERMANY STUDENT (National Visa) ──
  if (c === 'germany') {
    return [
      "Step 1: Research & Select University — Research German universities and programs through DAAD or university websites. Check rankings, location, and tuition fees.",
      "Step 2: Meet Admission Requirements — Check academic qualifications, German/English proficiency (TestDaF / Goethe / IELTS 6.5+), and APS certificate (mandatory for Indian students).",
      "Step 3: Apply to University — Submit your application through Uni-Assist or directly to the university. Include transcripts, language certificates, and CV.",
      "Step 4: Accept Offer & Pay Deposit — Receive your admission letter (Zulassungsbescheid), accept it, and pay any required fees.",
      "Step 5: Open Blocked Account & Get Insurance — Open a blocked account (Sperrkonto) with €11,904/year (approx. ₹10.8 Lakhs) and purchase mandatory health insurance.",
      "Step 6: Apply for National Visa (Type D) — Complete the National Visa application on VIDEX and schedule an appointment at the German Embassy/VFS.",
      "Step 7: Attend Visa Interview — Attend the visa interview with your admission letter, blocked account confirmation, health insurance, and APS certificate.",
      "Step 8: Receive Visa & Plan Travel — Receive your National Visa and plan travel to Germany."
    ];
  }

  // ── IRELAND STUDENT ──
  if (c === 'ireland') {
    return [
      "Step 1: Research & Select University — Research Irish universities and courses through the Irish Universities Association or directly. Check rankings, location, and career outcomes.",
      "Step 2: Meet Admission Requirements — Check academic qualifications, English language (IELTS 6.0+ / PTE 55+), and any specific prerequisites.",
      "Step 3: Apply to University — Submit your application directly to the university or through the Central Applications Office (CAO) for undergraduate programs.",
      "Step 4: Accept Offer & Pay Deposit — Receive your Letter of Acceptance, accept it, and pay the tuition deposit to secure your place.",
      "Step 5: Complete AVATS Application — Complete the online visa application on AVATS (visas.inis.gov.ie/avats) with your acceptance letter, financial proofs, and medical insurance.",
      "Step 6: Pay Visa Fee & Schedule Biometrics — Pay the visa fee (€60 Single Entry / €100 Multiple Entry) and schedule biometrics at VFS Global Ireland.",
      "Step 7: Submit Documents & Biometrics — Submit your complete dossier at VFS Global and enroll digital biometrics (fingerprints and photo).",
      "Step 8: Receive Visa & Plan Travel — Receive your visa decision and plan travel to Ireland. Ireland is NOT part of the Schengen zone."
    ];
  }

  // ── NETHERLANDS STUDENT ──
  if (c === 'netherlands') {
    return [
      "Step 1: Research & Select University — Research accredited Dutch research universities or applied sciences institutions via Study in NL.",
      "Step 2: Meet Admission Requirements — Verify diploma equivalence, English proficiency (IELTS Academic 6.5+ / TOEFL iBT 90+), and prerequisites.",
      "Step 3: Apply via Studielink — Submit enrollment application through Studielink and the university portal with transcripts, CV, and motivation letter.",
      "Step 4: Accept Offer & Pay Deposit — Accept formal admission offer, pay tuition fees, and confirm enrolment with the institution.",
      "Step 5: University Initiates TEV Procedure — Your Dutch university acts as your recognized sponsor and submits your MVV entry visa and residence permit application to IND.",
      "Step 6: Prove Financial Solvency & Pay IND Fee — Transfer living maintenance deposit or provide official bank statement, and remit IND fee (€210).",
      "Step 7: Collect MVV Entry Visa — Book appointment at Dutch Embassy or VFS Global to submit passport for the 90-day MVV entry vignette and biometrics.",
      "Step 8: Travel & Municipal Registration — Fly to the Netherlands, collect your residence card at the IND desk, and register for BSN at the local municipality."
    ];
  }

  // ── NEW ZEALAND STUDENT ──
  if (c === 'new-zealand') {
    return [
      "Step 1: Research & Select Institution — Research NZQA-accredited universities, institutes of technology, and polytechnics.",
      "Step 2: Meet Admission Requirements — Check academic background, English proficiency (IELTS Academic 6.0-6.5 / PTE 50-58), and subject prerequisites.",
      "Step 3: Apply to Institution — Submit direct application with certified academic transcripts, certificates, and statement of purpose.",
      "Step 4: Accept Offer of Place & Pay Tuition — Receive Offer of Place, accept conditions, and pay the first year's tuition fees to receive receipt.",
      "Step 5: Health & Police Clearance — Undergo immigration medical exam (chest X-ray) with an approved panel physician and secure Police Clearance Certificate.",
      "Step 6: Apply for Fee Paying Student Visa — Complete online application on Immigration New Zealand (INZ) portal with Offer of Place, receipts, and NZD $20,000 living funds.",
      "Step 7: Biometrics & Passport Verification — Submit passport and digital biometrics at VFS Global New Zealand Visa Application Centre.",
      "Step 8: Receive eVisa & Plan Travel — Receive electronic visa approval (eVisa), secure mandatory travel insurance, and plan arrival in New Zealand."
    ];
  }

  // ── SWEDEN STUDENT ──
  if (c === 'sweden') {
    return [
      "Step 1: Research & Select University — Explore degree programs across Swedish universities through the central portal Universityadmissions.se.",
      "Step 2: Meet Entry Requirements — Confirm general admission requirements, English 6 proficiency (IELTS 6.5 / TOEFL 90), and degree syllabus match.",
      "Step 3: Apply via University Admissions — Submit prioritized applications ranking up to 4 master's or 8 bachelor's programs with certified transcripts.",
      "Step 4: Notification of Results & Pay Tuition — Receive admission notification on University Admissions and pay the first tuition fee installment directly to the university.",
      "Step 5: Secure Comprehensive Health Insurance — Ensure valid health insurance (statutory Kammarkollegiet or comprehensive private policy).",
      "Step 6: Apply for Residence Permit for Studies — Lodge online application on Migrationsverket portal with admission letter, tuition receipt, and SEK 10,314/month funds.",
      "Step 7: Biometrics at Embassy / VFS — Attend scheduled biometric appointment at Embassy of Sweden or VFS Global to capture photo and fingerprints.",
      "Step 8: Receive Residence Card & Travel — Receive Residence Permit decision and card. Fly to Sweden and register with Skatteverket for personnummer."
    ];
  }

  // ── DENMARK STUDENT ──
  if (c === 'denmark') {
    return [
      "Step 1: Research & Select University — Research accredited Danish universities and higher education academies on the Study in Denmark portal.",
      "Step 2: Meet Admission Requirements — Verify academic equivalence, English proficiency (IELTS 6.5+ / TOEFL 83-90+), and course prerequisites.",
      "Step 3: Apply to University — Apply through Optagelse.dk or university online portal with certified diplomas, grade transcripts, and CV.",
      "Step 4: Accept Offer & Pay Tuition — Receive admission letter, pay 1st semester or annual tuition fees, and request the university to start ST1 form.",
      "Step 5: Complete ST1 Online Application — Institution completes Part 1; you receive a case order ID and complete Part 2 on the SIRI online portal.",
      "Step 6: Pay SIRI Application Fee — Pay mandatory SIRI fee online (DKK 2,115 - 2,600) and upload documentation of DKK 6,820/month living funds.",
      "Step 7: Record Biometrics at VFS within 14 Days — Record digital biometrics (facial photo and fingerprints) at VFS Global within 14 calendar days of submitting ST1.",
      "Step 8: Receive Residence Permit & Travel — Receive ST1 permit approval, enter Denmark, and register for CPR number and yellow health card within 5 days."
    ];
  }

  // ── DEFAULT STUDENT STEPS ──
  return [
    `Step 1: Research & Select University — Research universities and programs in ${toCountry} that match your academic and career goals.`,
    `Step 2: Meet Admission Requirements — Check academic qualifications, English language proficiency, and any specific prerequisites.`,
    `Step 3: Apply to University — Submit your application to the university through their official application portal.`,
    `Step 4: Accept Offer & Pay Deposit — Receive your offer letter, accept it, and pay the required tuition deposit.`,
    `Step 5: Receive Official Admission Confirmation — Receive your official admission confirmation (CoE / CAS / I-20 / Acceptance Letter).`,
    `Step 6: Apply for Student Visa — Complete the student visa application with your admission confirmation, financial proofs, and health insurance.`,
    `Step 7: Attend Biometrics (if required) — Complete biometrics at the designated Visa Application Center.`,
    `Step 8: Receive Visa & Plan Travel — Receive your student visa and plan travel to ${toCountry}.`
  ];
}

// ── 16. STUDENT DOCUMENTS — COUNTRY SPECIFIC ──
// Returns official consular document checklist for each country
export function getStudentDocuments(
  fromCountry: string,
  toCountry: string,
  purpose: string = 'Student'
): DocumentRequiredItem[] {
  const c = normalizeCountry(toCountry);

  // ── AUSTRALIA STUDENT (Subclass 500) ──
  if (c === 'australia') {
    return [
      {
        title: 'Valid Passport Bio-Pages',
        description: 'Clear high-resolution color scan of all informational and stamped pages of valid passport. Must be valid for at least 6 months beyond intended stay.',
        is_mandatory: true
      },
      {
        title: 'Electronic Confirmation of Enrolment (eCoE)',
        description: 'Official digital Confirmation of Enrolment (eCoE) code issued by an Australian educational institution registered under CRICOS. This is mandatory for visa application.',
        is_mandatory: true
      },
      {
        title: 'Overseas Student Health Cover (OSHC)',
        description: 'Approved Australian medical insurance policy covering the entire duration from intended arrival until visa expiration. Must be from an approved OSHC provider (BUPA, Medibank, Allianz, etc.).',
        is_mandatory: true
      },
      {
        title: 'Genuine Student (GS) Responses & Evidence',
        description: 'Documented responses covering current circumstances, course justification, value to future career, and study progression. Replaces the retired GTE requirement.',
        is_mandatory: true
      },
      {
        title: 'English Language Proficiency Test Score',
        description: 'Valid official test scorecard from IELTS Academic (minimum 6.5 overall, no band below 6.0), PTE Academic (minimum 58), or TOEFL iBT (minimum 79). Check university requirements as scores may vary.',
        is_mandatory: true
      },
      {
        title: 'Financial Capacity Evidence',
        description: 'Verifiable proof of 1 year tuition fees + living costs (minimum AUD 29,710/year) + return travel costs via seasoned bank deposits, education loans, or approved sponsors.',
        is_mandatory: true
      },
      {
        title: 'Academic Records & Certificates',
        description: 'Certified copies of graduation degrees, academic mark sheets, school-leaving certificates, and relevant CV / work experience letters. Must be translated to English if not originally in English.',
        is_mandatory: true
      }
    ];
  }

  // ── UK STUDENT (Student Route) ──
  if (c === 'uk') {
    return [
      {
        title: 'Valid Passport',
        description: 'Original passport valid for your full period of stay in the UK with at least 1 blank page for the 90-day travel vignette. Must be valid for the entire duration of study.',
        is_mandatory: true
      },
      {
        title: 'Confirmation of Acceptance for Studies (CAS)',
        description: 'A unique 14-digit reference number provided by your UK licensed Higher Education Provider (HEP) upon unconditional acceptance. This is mandatory for visa application.',
        is_mandatory: true
      },
      {
        title: 'Tuberculosis (TB) Test Certificate',
        description: 'Mandatory for Indian passport holders residing in India for 6+ months. Certificate must be issued by an authorized UKVI-approved medical clinic (e.g. Apollo, Fortis, Max Healthcare). Valid for 6 months.',
        is_mandatory: true
      },
      {
        title: 'Proof of English Language Capability',
        description: 'SELT certificate (IELTS for UKVI Academic / PTE Academic UKVI) or official confirmation on CAS statement that the HEP university assessed and verified English proficiency at CEFR B2 level.',
        is_mandatory: true
      },
      {
        title: 'Financial Proof (28-Day Maintenance Rule)',
        description: 'Tuition Fee Balance + Living Maintenance: £1,483/month London (max £13,347 for 9 months) OR £1,136/month Outside London (max £10,224 for 9 months). Funds must be held for 28 consecutive days.',
        is_mandatory: true
      },
      {
        title: 'Academic Transcripts & Degree Certificates',
        description: 'Original certificates and marksheets specified by the university in the CAS statement used to assess academic admission. Must be translated to English if not originally in English.',
        is_mandatory: true
      }
    ];
  }

  // ── USA STUDENT (F-1 Visa) ──
  if (c === 'usa') {
    return [
      {
        title: 'Valid Passport',
        description: 'Must be valid for at least 6 months beyond intended period of stay in the United States with blank visa pages.',
        is_mandatory: true
      },
      {
        title: 'Form I-20 (Certificate of Eligibility)',
        description: 'Official signed Form I-20 issued by SEVP-certified US educational institution with SEVIS ID and program dates. This is mandatory for visa application.',
        is_mandatory: true
      },
      {
        title: 'SEVIS I-901 Fee Payment Receipt',
        description: 'Official proof of payment of mandatory 350 USD SEVIS fee paid online at fmjfee.com at least 3 days before interview.',
        is_mandatory: true
      },
      {
        title: 'Form DS-160 Confirmation Page',
        description: 'Online Nonimmigrant Visa Application confirmation page with clear 10-character alphanumeric barcode. Must be printed and brought to the interview.',
        is_mandatory: true
      },
      {
        title: 'English Language Proficiency Score',
        description: 'TOEFL iBT (minimum 80-100 depending on university), IELTS Academic (minimum 6.5-7.0), or PTE Academic. Check university specific requirements.',
        is_mandatory: true
      },
      {
        title: 'Academic Credentials & Test Scores',
        description: 'Degree certificates, marksheets, GRE/GMAT scores (if required), and transcripts. Must be translated to English if not originally in English.',
        is_mandatory: true
      },
      {
        title: 'Financial Proof (Liquid Funds)',
        description: 'Total 1-year estimated tuition + living costs as stated on Form I-20. Bank balance certificates, fixed deposit receipts, approved education loan sanction letters, or sponsor affidavit (Form I-134).',
        is_mandatory: true
      }
    ];
  }

  // ── CANADA STUDENT (Study Permit) ──
  if (c === 'canada') {
    return [
      {
        title: 'Valid Passport',
        description: 'Color scan of bio-data page and all stamped pages. Must be valid for intended stay duration.',
        is_mandatory: true
      },
      {
        title: 'Letter of Acceptance (LOA)',
        description: 'Official acceptance letter from a Designated Learning Institution (DLI) in Canada. This is mandatory for visa application.',
        is_mandatory: true
      },
      {
        title: 'Provincial Attestation Letter (PAL)',
        description: 'Official letter from the province confirming your admission quota. Required for most provinces as of 2024.',
        is_mandatory: true
      },
      {
        title: 'English/French Language Proficiency',
        description: 'IELTS General Training (minimum 6.0-6.5), PTE Core (minimum 60-65), or TEF for French programs. Check specific DLI requirements.',
        is_mandatory: true
      },
      {
        title: 'Guaranteed Investment Certificate (GIC)',
        description: 'CAD $20,635 Guaranteed Investment Certificate from a participating Canadian financial institution (CIBC, Scotiabank, etc.) to prove living expenses.',
        is_mandatory: true
      },
      {
        title: 'Financial Proof',
        description: 'Proof of sufficient funds to cover tuition fees + living expenses (minimum CAD $20,635/year) + return travel costs. Bank statements, education loans, or sponsor letters accepted.',
        is_mandatory: true
      },
      {
        title: 'Upfront Medical Exam',
        description: 'eMedical examination report from an IRCC-approved panel physician. Must be completed before or during visa application.',
        is_mandatory: true
      }
    ];
  }

  // ── GERMANY STUDENT (National Visa) ──
  if (c === 'germany') {
    return [
      {
        title: 'Valid Passport',
        description: 'Must be valid for at least 12 months beyond intended stay with blank visa pages.',
        is_mandatory: true
      },
      {
        title: 'University Admission Letter (Zulassungsbescheid)',
        description: 'Official unconditional admission letter from a German university. This is mandatory for visa application.',
        is_mandatory: true
      },
      {
        title: 'APS Certificate',
        description: 'Mandatory Academic Evaluation Centre certificate for Indian applicants. Required before visa application.',
        is_mandatory: true
      },
      {
        title: 'German/English Language Proficiency',
        description: 'TestDaF (minimum TDN 4) or Goethe-Zertifikat for German programs. IELTS Academic (minimum 6.5) or TOEFL iBT (minimum 88) for English programs.',
        is_mandatory: true
      },
      {
        title: 'Blocked Account (Sperrkonto)',
        description: 'Official blocked account statement with minimum €11,904 (approx. ₹10.8 Lakhs) for one year of living expenses. Must be from an approved German bank.',
        is_mandatory: true
      },
      {
        title: 'Health Insurance',
        description: 'Statutory (GKV) or comprehensive private health insurance covering the entire duration of stay in Germany. Must meet German visa requirements.',
        is_mandatory: true
      },
      {
        title: 'Academic Records & CV',
        description: 'Certified copies of degrees, mark sheets, and curriculum vitae. Must be translated to German or English if not originally in those languages.',
        is_mandatory: true
      }
    ];
  }

  // ── IRELAND STUDENT ──
  if (c === 'ireland') {
    return [
      {
        title: 'Valid Passport',
        description: 'Must be valid for at least 6 months beyond intended stay with minimum 2 blank visa pages.',
        is_mandatory: true
      },
      {
        title: 'Letter of Acceptance',
        description: 'Official unconditional acceptance letter from an Irish university or college. This is mandatory for visa application.',
        is_mandatory: true
      },
      {
        title: 'English Language Proficiency',
        description: 'IELTS Academic (minimum 6.0-6.5) or PTE Academic (minimum 55-60). Check specific university requirements.',
        is_mandatory: true
      },
      {
        title: 'AVATS Online Application Summary',
        description: 'Printed and signed AVATS application summary sheet from visas.inis.gov.ie/avats.',
        is_mandatory: true
      },
      {
        title: 'Financial Proof',
        description: 'Proof of sufficient funds to cover tuition fees + living expenses (minimum €7,000/year) + return travel costs. Bank statements or education loans accepted.',
        is_mandatory: true
      },
      {
        title: 'Tuition Fee Payment Receipt',
        description: 'Official receipt confirming payment of at least the first year\'s tuition fees to the Irish institution.',
        is_mandatory: true
      },
      {
        title: 'Private Medical Insurance',
        description: 'Comprehensive international health insurance covering the entire duration of stay in Ireland.',
        is_mandatory: true
      }
    ];
  }

  // ── NETHERLANDS STUDENT ──
  if (c === 'netherlands') {
    return [
      {
        title: 'Valid Passport Bio-Pages',
        description: 'Must be valid for at least 6 months beyond the intended study duration in the Netherlands.',
        is_mandatory: true
      },
      {
        title: 'University Admission Letter',
        description: 'Official unconditional admission confirmation from a recognized Dutch university or higher education institute.',
        is_mandatory: true
      },
      {
        title: 'Proof of Financial Solvency (€1,045/month)',
        description: 'Verifiable proof of living allowance of at least €1,045 per month for 12 months plus paid tuition balance.',
        is_mandatory: true
      },
      {
        title: 'English Language Proficiency',
        description: 'IELTS Academic (minimum 6.5) or TOEFL iBT (minimum 90) as required by the host Dutch institution.',
        is_mandatory: true
      },
      {
        title: 'Health Insurance Policy',
        description: 'Valid health and liability insurance covering medical costs in the Netherlands for the initial study duration.',
        is_mandatory: true
      },
      {
        title: 'Antecedents Certificate (Declaration)',
        description: 'Signed IND Antecedents Certificate certifying that the applicant has no criminal record.',
        is_mandatory: true
      }
    ];
  }

  // ── NEW ZEALAND STUDENT ──
  if (c === 'new-zealand') {
    return [
      {
        title: 'Valid Passport',
        description: 'Passport valid for at least 3 months beyond intended completion date of course.',
        is_mandatory: true
      },
      {
        title: 'Offer of Place from NZ Institution',
        description: 'Official Offer of Place from an approved NZQA educational institution confirming course details and fees.',
        is_mandatory: true
      },
      {
        title: 'Tuition Fee Payment Receipt',
        description: 'Official receipt proving that the first year\'s tuition fees have been paid in full.',
        is_mandatory: true
      },
      {
        title: 'Financial Maintenance Evidence (NZD $20,000/year)',
        description: 'Bank statements or Financial Undertaking showing minimum NZD $20,000 per academic year for living costs.',
        is_mandatory: true
      },
      {
        title: 'Immigration Medical & Chest X-Ray',
        description: 'Completed eMedical certificate and chest X-ray certificate from an approved INZ panel doctor.',
        is_mandatory: true
      },
      {
        title: 'Police Clearance Certificate (PCC)',
        description: 'PCC issued by Regional Passport Office (RPO) valid within 6 months of submission.',
        is_mandatory: true
      }
    ];
  }

  // ── SWEDEN STUDENT ──
  if (c === 'sweden') {
    return [
      {
        title: 'Valid Passport',
        description: 'Passport copy valid for the entire duration of the study permit sought.',
        is_mandatory: true
      },
      {
        title: 'Notification of Selection Results / Admission',
        description: 'Official Notification of Selection Results showing admitted status to full-time accredited studies in Sweden.',
        is_mandatory: true
      },
      {
        title: 'Tuition Fee Payment Confirmation',
        description: 'Confirmation that the first installment of tuition fees has been paid to the Swedish university.',
        is_mandatory: true
      },
      {
        title: 'Proof of Funds (SEK 10,314/month)',
        description: 'Bank statements in the applicant\'s own name demonstrating SEK 10,314 per month for 10 months (SEK 103,140/yr).',
        is_mandatory: true
      },
      {
        title: 'Comprehensive Medical Insurance',
        description: 'Official health insurance coverage through Kammarkollegiet (FAS+) or approved comprehensive policy.',
        is_mandatory: true
      }
    ];
  }

  // ── DENMARK STUDENT ──
  if (c === 'denmark') {
    return [
      {
        title: 'Valid Passport',
        description: 'Full color copy of all pages of valid passport including blank pages and covers.',
        is_mandatory: true
      },
      {
        title: 'ST1 Application Form Receipt',
        description: 'Official completed ST1 online application receipt and case order ID confirmation from SIRI.',
        is_mandatory: true
      },
      {
        title: 'Letter of Admission',
        description: 'Official admission letter from an accredited Danish higher educational institution.',
        is_mandatory: true
      },
      {
        title: 'Tuition Payment or Waiver Receipt',
        description: 'Documentation confirming payment of tuition fees for the first semester or year, or Danish state scholarship.',
        is_mandatory: true
      },
      {
        title: 'Proof of Living Maintenance (DKK 6,820/month)',
        description: 'Bank statement in applicant\'s name demonstrating self-support of DKK 6,820 per month (approx. DKK 81,840/yr).',
        is_mandatory: true
      },
      {
        title: 'Biometric Enrollment Receipt',
        description: 'Proof of biometric enrollment (facial photo and 10 fingerprints) recorded at VFS within 14 days of ST1.',
        is_mandatory: true
      }
    ];
  }

  // ── DEFAULT STUDENT DOCUMENTS ──
  return [
    {
      title: 'Valid Passport',
      description: `Must be valid for at least 6 months beyond intended stay with minimum 2 blank visa pages.`,
      is_mandatory: true
    },
    {
      title: 'University Offer Letter',
      description: `Official unconditional admission/acceptance letter from a recognized educational institution in ${toCountry}. This is mandatory for visa application.`,
      is_mandatory: true
    },
    {
      title: 'Academic Records & Transcripts',
      description: 'Certified copies of all academic certificates, mark sheets, and transcripts from previous education.',
      is_mandatory: true
    },
    {
      title: 'Financial Proof',
      description: 'Bank statements, education loan sanction letters, or sponsor letters proving sufficient funds for tuition + living expenses.',
      is_mandatory: true
    },
    {
      title: 'Passport Photographs',
      description: 'Recent color photographs meeting official biometric specifications for the student visa application.',
      is_mandatory: true
    }
  ];
}

// ── 17. COMPLETE STUDENT VISA DATA BUILDER ──
export function getStudentVisaData(
  from: string,
  to: string,
  purpose: string = 'Student'
): StructuredVisaRequirements {
  const countryName = to;
  const officialSource = getStudentOfficialSourceName(to);
  const procTime = getStudentProcessingTime(to);
  const procDetails = getStudentProcessingDetails(to);
  const val = getStudentValidity(to);
  const valDetails = getStudentValidityDetails(to);
  const stay = getStudentStayDuration(to);
  const stayDetails = getStudentStayDetails(to);
  const entryType = getStudentEntryType(to);
  const entryDetails = getStudentEntryDetails(to);
  const fees = getStudentFees(to);
  const faqs = getStudentFAQ(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Higher Studies / Student Visa',
    visa_type: `${countryName} Student Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' student visa official consular immigration')}`,
    official_source_name: officialSource,

    // ── OVERVIEW ──
    overview: getStudentOverview(to),

    // ── STEPS ──
    how_to_apply: getStudentVisaSteps(from, to, 'Student Visa'),

    // ── DOCUMENTS ──
    documents_required: getStudentDocuments(from, to, purpose),

    // ── FINANCIAL PROOFS ──
    financial_proofs: getStudentFinancialProofs(to),

    // ── OTHER REQUIREMENTS ──
    other_requirements: getStudentOtherRequirements(to),

    // ── PROCESSING TIME ──
    processing_time: procTime,
    processing_time_details: procDetails,

    // ── VALIDITY ──
    validity: val,
    validity_details: valDetails,

    // ── STAY DURATION ──
    stay_duration: stay,
    stay_duration_details: stayDetails,

    // ── ENTRY TYPE ──
    entry_type: entryType,
    entry_type_details: entryDetails,

    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },

    // ── FEES ──
    costs: fees,

    // ── FAQ ──
    faqs: faqs,

    processing_and_timing: {
      apply_window: 'Apply 3 to 4 months prior to program intake.',
      decision_time: procTime,
      max_extension: 'Renewable annually based on ongoing academic standing.',
      center_notes: `VFS Global ${countryName} Visa Application Centre. Check appointment availability online.`
    }
  };
}
