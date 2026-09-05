// src/lib/student-visa.ts
// Country-specific student visa steps and documents pipeline based on official consular requirements

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
}

// ── 1. STUDENT VISA STEPS — COUNTRY SPECIFIC ──
// This function returns the correct 8 steps for each country, starting with University Admission
export function getStudentVisaSteps(
  fromCountry: string,
  toCountry: string,
  visaType: string = 'Student Visa'
): string[] {
  const country = (toCountry || '').toLowerCase();

  // ── AUSTRALIA STUDENT (Subclass 500) ──
  if (country.includes('australia')) {
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
  if (country.includes('uk') || country.includes('united kingdom') || country.includes('england') || country.includes('great britain')) {
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
  if (country.includes('usa') || country.includes('united states') || country.includes('america')) {
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
  if (country.includes('canada')) {
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
  if (country.includes('germany') || country.includes('deutschland')) {
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
  if (country.includes('ireland') || country.includes('irish')) {
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

// ── 2. STUDENT DOCUMENTS — COUNTRY SPECIFIC ──
// This function returns the correct documents for each country based on official consular requirements
export function getStudentDocuments(
  fromCountry: string,
  toCountry: string,
  purpose: string = 'Student'
): DocumentRequiredItem[] {
  const country = (toCountry || '').toLowerCase();

  // ── AUSTRALIA STUDENT (Subclass 500) ──
  if (country.includes('australia')) {
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
  if (country.includes('uk') || country.includes('united kingdom') || country.includes('england') || country.includes('great britain')) {
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
  if (country.includes('usa') || country.includes('united states') || country.includes('america')) {
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
  if (country.includes('canada')) {
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
  if (country.includes('germany') || country.includes('deutschland')) {
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
  if (country.includes('ireland') || country.includes('irish')) {
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

// ── 4. HELPER FUNCTIONS FOR STUDENT VISA ──

export function getOfficialSourceName(country: string): string {
  const map: Record<string, string> = {
    'australia': 'Australian Department of Home Affairs (ImmiAccount)',
    'uk': 'UK Visas and Immigration (UKVI)',
    'united kingdom': 'UK Visas and Immigration (UKVI)',
    'usa': 'U.S. Department of State & U.S. Embassy Consular Affairs',
    'united states': 'U.S. Department of State & U.S. Embassy Consular Affairs',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC)',
    'germany': 'German Federal Foreign Office & Ausländerbehörde',
    'ireland': 'Immigration Service Delivery (ISD) & Embassy of Ireland'
  };
  return map[(country || '').toLowerCase()] || `${country} Immigration Authority`;
}

export function getStudentProcessingTime(country: string): string {
  const map: Record<string, string> = {
    'australia': 'Higher Education Sector: 30 to 60 calendar days (Peak intake: up to 10 weeks)',
    'uk': 'Standard 3 Weeks (15 Working Days)',
    'usa': 'Verbal Decision at Consular Window (3-5 Business Days post-interview)',
    'united states': 'Verbal Decision at Consular Window (3-5 Business Days post-interview)',
    'canada': '4 to 8 Weeks (IRCC Processing Time)',
    'germany': '4 to 8 Weeks (German Mission Review)',
    'ireland': '6 to 8 weeks (20 to 25 working days from Embassy receipt)'
  };
  return map[(country || '').toLowerCase()] || 'Per Official Consular SLA';
}

export function getStudentValidity(country: string): string {
  const map: Record<string, string> = {
    'australia': 'Duration of enrolled CRICOS course plus 1 to 2 months post-study buffer',
    'uk': 'Full Course Duration + 4 Months Wrap-up (90-Day Entry Vignette)',
    'usa': 'Duration of Status (D/S) — Typically up to 5 Years',
    'united states': 'Duration of Status (D/S) — Typically up to 5 Years',
    'canada': 'Duration of Study + 90 Days',
    'germany': 'Duration of Study (Up to 4-5 Years)',
    'ireland': 'Duration of Academic Program (1-4 Years)'
  };
  return map[(country || '').toLowerCase()] || 'Duration of Academic Program';
}

export function getStudentStayDuration(country: string): string {
  const map: Record<string, string> = {
    'australia': 'Full duration of registered academic program (up to 5 years)',
    'uk': 'Length of Academic Program (1-4 Years)',
    'usa': 'Duration of Academic Program (D/S) + 60-Day Grace Period',
    'united states': 'Duration of Academic Program (D/S) + 60-Day Grace Period',
    'canada': 'Full Study Programme Duration (Renewable Annually)',
    'germany': 'Duration of Academic Degree (Up to 4-5 Years)',
    'ireland': 'Full Duration of Academic Course (1-4 Years)'
  };
  return map[(country || '').toLowerCase()] || 'Full Duration of Academic Program';
}

export function getStudentFees(country: string): any {
  const map: Record<string, any> = {
    'australia': {
      visa_fee: 'AUD 1,600 (approx. ₹88,000)',
      service_fee: 'Payable at VFS Global ABCC (approx. ₹1,650)',
      total_fee: 'AUD 1,600 Base Application Charge',
      notes: 'Paid online via ImmiAccount. Excludes OSHC and medical exam fees.'
    },
    'uk': {
      visa_fee: '£490 (approx. ₹52,400)',
      service_fee: '£776/year (IHS Healthcare Surcharge)',
      total_fee: '£1,266+ (Visa £490 + IHS £776)',
      notes: 'Paid online on GOV.UK. IHS calculated per 6-month block (£388/6 mo).'
    },
    'usa': {
      visa_fee: '185 USD (MRV Fee)',
      service_fee: '350 USD (SEVIS I-901 Fee)',
      total_fee: '535 USD Total Reference',
      notes: 'Paid online via US Visa Scheduling portal and fmjfee.com.'
    },
    'canada': {
      visa_fee: 'CAD 150 (Study Permit Fee)',
      service_fee: 'CAD 85 (Biometrics Fee)',
      total_fee: 'CAD 235 Total Reference',
      notes: 'Paid online via IRCC portal. Excludes GIC and medical exam fees.'
    },
    'germany': {
      visa_fee: '€75 (National Visa Fee)',
      service_fee: '₹2,200 (VFS Service Charge)',
      total_fee: '€75 + Service Fee',
      notes: 'Payable at German Embassy/VFS. Excludes blocked account (€11,904).'
    },
    'ireland': {
      visa_fee: '€60 Single Entry (approx. ₹5,400) / €100 Multiple Entry (approx. ₹9,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: '€60 - €100 Official Fee + VFS Logistics',
      notes: 'Payable at VFS Global Ireland Visa Application Centre.'
    }
  };
  return map[(country || '').toLowerCase()] || {
    visa_fee: 'Official Statutory Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Check official embassy website for current fees.'
  };
}

export function getStudentFinancialProofs(country: string): FinancialProofItem[] {
  const c = (country || '').toLowerCase();
  if (c.includes('australia')) {
    return [
      {
        type: 'Living & Tuition Funds (AUD 29,710/yr + 1st Year Tuition)',
        minimum_balance_or_amount: 'AUD 29,710 living costs + 1 year tuition fees + return airfare',
        time_frame: 'Seasoned bank funds held for minimum 3 months or approved education loan',
        notes: 'Proof of funds must be genuinely accessible by the student. Form 157A Genuine Student verification applies.'
      },
      {
        type: 'Approved Education Loan Sanction Letter',
        minimum_balance_or_amount: 'Covers remaining tuition and living expenses',
        time_frame: 'Sanction letter issued for current academic session',
        notes: 'Must be from an approved scheduled bank with disbursement terms clearly indicated.'
      }
    ];
  }
  if (c.includes('uk') || c.includes('united kingdom')) {
    return [
      {
        type: 'Living Maintenance Funds (28-Day Rule)',
        minimum_balance_or_amount: '£1,483/month London (max £13,347) OR £1,136/month Outside London (max £10,224)',
        time_frame: 'Held consecutively for at least 28 days ending within 31 days of application',
        notes: 'Strict 28-day rule under Appendix Finance. Any dip below the required threshold will cause mandatory visa refusal.'
      },
      {
        type: 'Tuition Fee Balance',
        minimum_balance_or_amount: 'Course fee minus any deposit already paid as stated on CAS',
        time_frame: 'Held for 28 consecutive days alongside living costs',
        notes: 'If tuition is already paid in full, this will be stated on the CAS statement.'
      }
    ];
  }
  if (c.includes('usa') || c.includes('united states')) {
    return [
      {
        type: 'Total 1st Year Cost of Attendance (Form I-20)',
        minimum_balance_or_amount: '100% of tuition, living expenses and insurance as specified in Section 7 of Form I-20',
        time_frame: 'Immediate liquid funds (savings account, fixed deposits, liquid investments)',
        notes: 'Consular officers require proof of immediately available liquid funds for Year 1, and realistic projection for subsequent years.'
      },
      {
        type: 'Education Loan Sanction Letter / Sponsor Affidavit',
        minimum_balance_or_amount: 'Sanctioned loan amount + Form I-134 Sponsor Affidavit with 3 years tax returns',
        time_frame: 'Current academic cycle',
        notes: 'Parental sponsors must provide bank statements, IT returns (ITR-V), and proof of employment.'
      }
    ];
  }
  if (c.includes('canada')) {
    return [
      {
        type: 'Guaranteed Investment Certificate (GIC)',
        minimum_balance_or_amount: 'CAD $20,635 in an IRCC-approved Canadian financial institution',
        time_frame: 'GIC confirmation certificate issued prior to study permit submission',
        notes: 'Mandatory standard living cost proof for international students arriving in Canada.'
      },
      {
        type: '1st Year Tuition Fee Payment Receipt',
        minimum_balance_or_amount: 'Full 1st year tuition fee as per DLI Letter of Acceptance',
        time_frame: 'Official payment receipt from DLI',
        notes: 'Payment via Convera, Flywire, or direct wire transfer to institution.'
      }
    ];
  }
  if (c.includes('germany')) {
    return [
      {
        type: 'Blocked Account (Sperrkonto)',
        minimum_balance_or_amount: '€11,904 (€992 per month for 12 months)',
        time_frame: 'Opened and funded at approved provider (Expatrio, Fintiba, Coracle, Deutsche Bank)',
        notes: 'Mandatory official Sperrkonto opening confirmation (06 Sperrfreigabe) required at visa appointment.'
      }
    ];
  }
  if (c.includes('ireland')) {
    return [
      {
        type: 'Immediate Living Expenses Funds',
        minimum_balance_or_amount: 'Minimum €7,000 to €10,000 readily available living expenses',
        time_frame: 'Past 6 consecutive months bank statements',
        notes: 'Must demonstrate self-sufficiency for initial academic year in Ireland.'
      },
      {
        type: 'Tuition Fee Payment Confirmation',
        minimum_balance_or_amount: 'Minimum €6,000 or full first-year fees paid to the college',
        time_frame: 'Official college receipt or Electronic Transfer confirmation',
        notes: 'Evidence of tuition fee payment is strictly required before visa submission.'
      }
    ];
  }
  return [
    {
      type: 'Proof of Sufficient Educational Funds',
      minimum_balance_or_amount: '1st year tuition fees + living maintenance allowance',
      time_frame: 'Last 3 to 6 months bank statements or loan sanction letter',
      notes: 'Demonstrating financial capability to finance education abroad without unauthorized work.'
    }
  ];
}

export function getStudentOtherRequirements(country: string): OtherRequirementItem[] {
  const c = (country || '').toLowerCase();
  if (c.includes('australia')) {
    return [
      {
        category: 'Overseas Student Health Cover (OSHC)',
        details: 'Mandatory medical insurance coverage with an approved Australian health fund for the entire visa grant period.'
      },
      {
        category: 'Biometrics & Panel Physician Health Check',
        details: 'Biometrics at VFS Global ABCC and health examination (HAP ID) at an authorized immigration panel clinic.'
      }
    ];
  }
  if (c.includes('uk') || c.includes('united kingdom')) {
    return [
      {
        category: 'Tuberculosis (TB) Screening',
        details: 'Mandatory TB test at an authorized UKVI panel clinic in India (valid for 6 months).'
      },
      {
        category: 'Immigration Health Surcharge (IHS)',
        details: 'Payable online at £776 per year of study to access National Health Service (NHS) in the UK.'
      }
    ];
  }
  if (c.includes('usa') || c.includes('united states')) {
    return [
      {
        category: 'SEVIS I-901 Registration',
        details: 'Mandatory 350 USD SEVIS fee paid online at fmjfee.com before booking consular interview.'
      },
      {
        category: 'Consular In-Person Interview',
        details: 'Mandatory interview with a U.S. Consular Officer demonstrating non-immigrant intent under INA 214(b).'
      }
    ];
  }
  if (c.includes('canada')) {
    return [
      {
        category: 'Provincial Attestation Letter (PAL)',
        details: 'Official PAL issued by the province confirming institution quota allocation.'
      },
      {
        category: 'Upfront Medical Examination',
        details: 'eMedical examination conducted by an IRCC-approved panel physician.'
      }
    ];
  }
  if (c.includes('germany')) {
    return [
      {
        category: 'APS Certificate (Akademische Prüfstelle)',
        details: 'Mandatory document verification certificate issued by the German Embassy New Delhi for Indian degree holders.'
      },
      {
        category: 'Health Insurance Coverage',
        details: 'Statutory student health insurance (TK, AOK, Barmer) or approved incoming insurance.'
      }
    ];
  }
  if (c.includes('ireland')) {
    return [
      {
        category: 'AVATS Online Application',
        details: 'Online registration on visas.inis.gov.ie/avats and physical submission at VFS Global Ireland.'
      },
      {
        category: 'Irish Residence Permit (IRP Stamp 2)',
        details: 'Register with ISD at Burgh Quay or local Garda district headquarters within 90 days of arrival in Ireland.'
      }
    ];
  }
  return [
    {
      category: 'Admission Confirmation',
      details: 'Unconditional admission confirmation from an accredited educational institution.'
    }
  ];
}

// ── 3. BUILD COMPLETE STUDENT VISA DATA ──
export function getStudentVisaData(
  from: string,
  to: string,
  purpose: string = 'Student'
): StructuredVisaRequirements {
  const countryName = to;
  const studentSteps = getStudentVisaSteps(from, to, 'Student Visa');
  const studentDocs = getStudentDocuments(from, to, purpose);

  const officialSource = getOfficialSourceName(to);
  const procTime = getStudentProcessingTime(to);
  const val = getStudentValidity(to);
  const stay = getStudentStayDuration(to);
  const fees = getStudentFees(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Higher Studies / Student Visa',
    visa_type: `${countryName} Student Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' student visa official consular immigration')}`,
    official_source_name: officialSource,
    overview: `The ${countryName} Student Visa allows international students to reside in ${countryName} for the full duration of their academic program to undertake full-time higher education, vocational training, or research.`,
    how_to_apply: studentSteps,
    documents_required: studentDocs,
    financial_proofs: getStudentFinancialProofs(to),
    other_requirements: getStudentOtherRequirements(to),
    processing_time: procTime,
    validity: val,
    stay_duration: stay,
    entry_type: 'Multiple Entry',
    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: 'Multiple Entry'
    },
    processing_and_timing: {
      apply_window: 'Apply 1 to 3 months prior to program intake.',
      decision_time: procTime,
      max_extension: 'Renewable annually based on ongoing academic standing.'
    },
    costs: fees
  };
}
