// src/lib/pr-visa.ts
// Country-specific Permanent Residency (PR) / Settlement Visa pipeline based on official immigration and consular mandates

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

export interface PRHighlightItem {
  icon: string;
  title: string;
  description: string;
  desc?: string;
}

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview?: string;
  highlights?: PRHighlightItem[];
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
    currency: string;
    notes: string;
  };
  processing_and_timing: {
    apply_window: string;
    decision_time: string;
    max_extension: string;
    center_notes?: string;
  };
  faqs?: FAQItem[];
  verification_status?: string;
  is_v3_verified?: boolean;
}

// ── COUNTRY NORMALIZATION HELPER ──
export function normalizeCountry(country: string): string {
  const c = (country || '').toLowerCase().trim().replace(/[-_]/g, ' ');
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('australia')) return 'australia';
  if (c.includes('new zealand') || c.includes('nz')) return 'new-zealand';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('ireland')) return 'ireland';
  if (c.includes('netherlands') || c.includes('holland') || c.includes('dutch')) return 'netherlands';
  if (c.includes('sweden')) return 'sweden';
  if (c.includes('denmark')) return 'denmark';
  return c;
}

// ── 1. PR OVERVIEW — COUNTRY SPECIFIC ──
export function getPROverview(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': 'Canada Express Entry is a points-based immigration system for skilled workers. Candidates are assessed on age, education, work experience, language proficiency (IELTS/PTE), and adaptability. The Comprehensive Ranking System (CRS) scores candidates, with top-scoring applicants receiving Invitations to Apply (ITA) through regular draws. Successful applicants receive Confirmation of Permanent Residence (COPR) and can live, work, and study anywhere in Canada. Path to Canadian Citizenship after 3 years (1,095 days) of physical presence.',
    'australia': 'Australia Skilled Independent Visa (Subclass 189) is a points-based permanent residency visa for skilled workers not sponsored by an employer, state, or family member. You must score at least 65 points on the SkillSelect points test. Points are awarded based on age, English proficiency (IELTS 6.0+ / PTE 50+), qualifications, and work experience. An Invitation to Apply (ITA) is required before lodging the visa application. Permanent Residency leads to Australian Citizenship after 4 years.',
    'uk': 'UK Indefinite Leave to Remain (ILR) is permanent settlement in the UK. You must have lived in the UK for 5 years on a qualifying visa (Skilled Worker, Global Talent, etc.). Requirements include passing the Life in the UK Test, meeting English language requirement (CEFR B1), and not exceeding 180 days absence in any 12-month period. ILR grants unrestricted right to live, work, and study in the UK. Apply for British Citizenship after 1 year of ILR.',
    'usa': 'US Green Card (Lawful Permanent Resident status) allows foreign nationals to live and work permanently in the United States. There are several pathways: Employment-Based (EB-1, EB-2, EB-3), Family-Based (I-130), or Investment (EB-5). The process involves an approved USCIS petition (I-140/I-130), priority date wait (based on Visa Bulletin), and consular processing (DS-260) or Adjustment of Status (I-485). Green Card is valid for 10 years and renewable. Path to US Citizenship after 5 years (or 3 years if married to a US citizen).',
    'new-zealand': 'New Zealand Skilled Migrant Category (SMC) is a points-based permanent residency visa. The new 6-point system requires a minimum of 6 points from either: NZ occupational registration, recognized qualification (Bachelor/Master/PhD), or high income (1.5x - 3x median wage), plus 1-3 points for skilled work in NZ. A job offer from an accredited employer is required. Permanent Residency leads to NZ Citizenship after 5 years.',
    'germany': 'Germany Permanent Settlement (Niederlassungserlaubnis) allows long-term residence in Germany. For EU Blue Card holders: fast-track PR in 21 months (with B1 German) or 27 months (with A1 German). For other skilled workers: 5 years of residence. Requirements include statutory pension contributions, adequate living space, and basic knowledge of the legal and social order in Germany. Permanent Settlement grants unrestricted right to work and live in Germany.',
    'uae': 'UAE 10-Year Golden Visa is a long-term residency visa for investors, entrepreneurs, and highly skilled professionals. Requirements include: minimum monthly salary of 30,000 AED (approx. 8,160 USD), real estate investment of 2,000,000 AED, or outstanding talent in fields such as technology, healthcare, or education. Golden Visa holders can sponsor family members of any age and unlimited domestic helpers. Stay outside UAE for > 6 months allowed without losing visa status.',
    'singapore': 'Singapore Permanent Residency (PR) is issued by the Immigration and Checkpoints Authority (ICA). Applicants are assessed based on age, education, work experience, salary, and family background. Typically, Employment Pass (EP) holders with 2-5 years of work experience are eligible to apply. PR holders can live, work, and study in Singapore. Path to Singapore Citizenship after 2-3 years of PR status.'
  };

  return map[c] || `The ${country} Permanent Residency (PR) / Settlement Visa allows foreign nationals to live and work permanently in ${country}. Pathways vary by country and include points-based systems, employer sponsorship, family sponsorship, and investment. Please check the official immigration website for current requirements.`;
}

// ── 2. PR HIGHLIGHTS — COUNTRY SPECIFIC ──
export function getPRHighlights(country: string): PRHighlightItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, PRHighlightItem[]> = {
    'canada': [
      { icon: 'chart', title: 'CRS Points System', description: 'Comprehensive Ranking System (CRS) scores candidates on age, education, work experience, and language.', desc: 'Comprehensive Ranking System scores candidates on age, education, work, and language.' },
      { icon: 'award', title: 'Express Entry Draws', description: 'Top-scoring candidates receive Invitations to Apply (ITA) through regular bi-weekly draws.', desc: 'Top-scoring candidates receive Invitations to Apply (ITA) through regular bi-weekly draws.' },
      { icon: 'globe', title: 'Path to Citizenship', description: 'Canadian Citizenship after 3 years (1,095 days) of physical presence in Canada.', desc: 'Canadian Citizenship after 3 years (1,095 days) of physical presence in Canada.' },
      { icon: 'building', title: 'PNP Pathways', description: 'Provincial Nominee Programs (PNP) offer additional pathways to PR with 600 bonus CRS points.', desc: 'Provincial Nominee Programs offer additional pathways to PR with 600 bonus CRS points.' }
    ],
    'australia': [
      { icon: 'chart', title: 'Points Test (65+ Points)', description: 'Minimum 65 points required on SkillSelect points test based on age, English, qualifications, and work experience.', desc: 'Minimum 65 points required on SkillSelect points test based on age, English, and work.' },
      { icon: 'award', title: 'SkillSelect EOI', description: 'Expression of Interest (EOI) submitted online, then wait for Invitation to Apply (ITA).', desc: 'Expression of Interest submitted online, followed by Invitation to Apply.' },
      { icon: 'globe', title: 'Path to Citizenship', description: 'Australian Citizenship after 4 years of lawful permanent residency.', desc: 'Australian Citizenship after 4 years of lawful permanent residency.' },
      { icon: 'building', title: 'State Nomination', description: 'Subclass 190 (State Nominated) and Subclass 491 (Regional) offer additional pathways.', desc: 'Subclass 190 (State Nominated) and Subclass 491 (Regional) offer additional pathways.' }
    ],
    'uk': [
      { icon: 'calendar', title: '5-Year Residence', description: 'Must have lived in the UK for 5 years on a qualifying visa (Skilled Worker, Global Talent).', desc: 'Must have lived in the UK for 5 years on a qualifying visa.' },
      { icon: 'award', title: 'Life in the UK Test', description: 'Mandatory civic knowledge test covering British history, culture, and government.', desc: 'Mandatory civic knowledge test covering British history, culture, and government.' },
      { icon: 'file', title: 'English Language B1', description: 'CEFR B1 level in reading, writing, speaking, and listening (IELTS/PTE/Trinity).', desc: 'CEFR B1 level in reading, writing, speaking, and listening.' },
      { icon: 'globe', title: 'Path to Citizenship', description: 'Apply for British Citizenship after 1 year of holding Indefinite Leave to Remain status.', desc: 'Apply for British Citizenship after 1 year of holding ILR status.' }
    ],
    'usa': [
      { icon: 'file', title: 'USCIS Petition (I-140/I-130)', description: 'Employer or family relative files petition with USCIS. Must receive approval before immigrant visa application.', desc: 'Employer or family relative files petition with USCIS before immigrant application.' },
      { icon: 'calendar', title: 'Priority Date & Visa Bulletin', description: 'Wait for priority date to become current in the Department of State Visa Bulletin.', desc: 'Wait for priority date to become current in the Department of State Visa Bulletin.' },
      { icon: 'globe', title: 'Path to Citizenship', description: 'US Citizenship after 5 years (or 3 years if married to a US citizen).', desc: 'US Citizenship after 5 years (or 3 years if married to a US citizen).' },
      { icon: 'building', title: 'Adjustment of Status', description: 'I-485 Adjustment of Status for applicants already in the US on a valid nonimmigrant visa.', desc: 'I-485 Adjustment of Status for applicants already legally in the US.' }
    ],
    'new-zealand': [
      { icon: 'chart', title: '6-Point System', description: 'Minimum 6 points from: occupational registration, recognized qualification, or high income.', desc: 'Minimum 6 points from: occupational registration, recognized qualification, or high income.' },
      { icon: 'building', title: 'Accredited Employer', description: 'Job offer from an INZ Accredited Employer required for work experience points.', desc: 'Job offer from an INZ Accredited Employer required for work experience points.' },
      { icon: 'globe', title: 'Path to Citizenship', description: 'NZ Citizenship after 5 years of lawful permanent residency.', desc: 'NZ Citizenship after 5 years of lawful permanent residency.' },
      { icon: 'file', title: 'English Language', description: 'IELTS 6.5+ or PTE 58+ required for primary applicant.', desc: 'IELTS 6.5+ or PTE 58+ required for primary applicant.' }
    ],
    'germany': [
      { icon: 'calendar', title: 'Fast-Track PR (21 Months)', description: 'EU Blue Card holders with B1 German get Permanent Settlement in 21 months.', desc: 'EU Blue Card holders with B1 German get Permanent Settlement in 21 months.' },
      { icon: 'credit', title: 'Statutory Pension', description: '21-27 months of mandatory pension contributions (Rentenversicherung) required.', desc: '21-27 months of mandatory pension contributions required.' },
      { icon: 'building', title: 'Adequate Living Space', description: 'Lease agreement (Mietvertrag) and landlord confirmation required.', desc: 'Lease agreement (Mietvertrag) and landlord confirmation required.' },
      { icon: 'file', title: 'German Language', description: 'B1 German (21 months) or A1 German (27 months) CEFR certificate required.', desc: 'B1 German (21 months) or A1 German (27 months) CEFR certificate required.' }
    ],
    'uae': [
      { icon: 'award', title: '10-Year Golden Visa', description: 'Long-term residency visa for investors, entrepreneurs, and highly skilled professionals.', desc: 'Long-term residency visa for investors, entrepreneurs, and skilled professionals.' },
      { icon: 'credit', title: 'Salary/Investment Requirement', description: '30,000 AED/month salary OR 2,000,000 AED real estate investment.', desc: '30,000 AED/month salary OR 2,000,000 AED real estate investment.' },
      { icon: 'user', title: 'Unlimited Family Sponsorship', description: 'Sponsor spouse, children of any age, and unlimited domestic helpers.', desc: 'Sponsor spouse, children of any age, and unlimited domestic helpers.' },
      { icon: 'plane', title: 'No 6-Month Rule', description: 'Stay outside UAE for any duration without losing residency status.', desc: 'Stay outside UAE for any duration without losing residency status.' }
    ],
    'singapore': [
      { icon: 'file', title: 'ICA Assessment', description: 'PR applications assessed by ICA on age, education, work experience, salary, and family background.', desc: 'PR applications assessed on age, education, work experience, and salary.' },
      { icon: 'building', title: 'EP Holders Preferred', description: 'Employment Pass (EP) holders with 2-5 years Singapore experience are eligible to apply.', desc: 'Employment Pass (EP) holders with 2-5 years experience eligible to apply.' },
      { icon: 'globe', title: 'Path to Citizenship', description: 'Singapore Citizenship after 2-3 years of permanent resident status.', desc: 'Singapore Citizenship after 2-3 years of permanent resident status.' },
      { icon: 'credit', title: 'CPF Contributions', description: 'Central Provident Fund (CPF) contributions for retirement, housing, and healthcare.', desc: 'Central Provident Fund (CPF) contributions for retirement and healthcare.' }
    ]
  };

  const defaultHighlights: PRHighlightItem[] = [
    { icon: 'chart', title: 'Points-Based System', description: 'Most countries use a points-based system to assess PR applicants.', desc: 'Points-based assessment on age, education, and language skills.' },
    { icon: 'award', title: 'Invitation to Apply', description: 'You must receive an Invitation to Apply (ITA) before lodging your formal PR application.', desc: 'Receive an Invitation to Apply before lodging your formal application.' },
    { icon: 'globe', title: 'Path to Citizenship', description: 'Permanent Residency is the primary statutory pathway to full citizenship.', desc: 'Permanent Residency is the primary pathway to full citizenship.' },
    { icon: 'file', title: 'Document Verification', description: 'Educational Credential Assessment (ECA) and Police Clearance Certificate (PCC) required.', desc: 'Educational Credential Assessment and Police Clearance Certificates required.' }
  ];

  return map[c] || defaultHighlights;
}

// ── 3. PR DOCUMENTS — COUNTRY SPECIFIC ──
export function getPRDocuments(countryOrFrom: string, maybeCountry?: string, _purpose?: string): DocumentRequiredItem[] {
  const target = maybeCountry || countryOrFrom;
  const c = normalizeCountry(target);
  const map: Record<string, DocumentRequiredItem[]> = {
    'canada': [
      { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages (valid for intended travel duration).', is_mandatory: true },
      { title: 'Educational Credential Assessment (ECA)', description: 'ECA evaluation report from WES, CES, or IQAS establishing Canadian equivalency.', is_mandatory: true },
      { title: 'Official Language Test Results', description: 'IELTS General Training (CLB 7+ minimum; CLB 9+ recommended) or PTE Core scorecard.', is_mandatory: true },
      { title: 'Police Clearance Certificates (PCC)', description: 'PCCs from Regional Passport Office (RPO) and all countries resided in for 6+ consecutive months since age 18.', is_mandatory: true },
      { title: 'Proof of Settlement Funds', description: 'Official bank letter with 6-month average balance meeting IRCC minimum threshold (14,690 CAD for single applicant).', is_mandatory: true },
      { title: 'Immigration Medical Exam (IME)', description: 'Upfront medical examination conducted by an IRCC-authorized panel physician (eMedical sheet).', is_mandatory: true },
      { title: 'Work Experience Reference Letters', description: 'Detailed reference letters from employers confirming job title, responsibilities, salary, and dates of employment.', is_mandatory: true }
    ],
    'australia': [
      { title: 'Valid Passport', description: 'Color scan of bio-data and stamped pages of current passport.', is_mandatory: true },
      { title: 'Positive Skills Assessment Outcome', description: 'Official assessment from assessing authority (ACS, Engineers Australia, VETASSESS).', is_mandatory: true },
      { title: 'English Language Competency Scorecard', description: 'PTE Academic (65+ for Proficient English / 79+ for Superior) or IELTS scorecard.', is_mandatory: true },
      { title: 'Employment Reference & Tax Documents', description: 'Detailed work reference letters, payslips, bank statements, and Form 16 / ITRs proving claimed points.', is_mandatory: true },
      { title: 'National Police Clearance Certificates', description: 'Indian PCC from Regional Passport Office (RPO) and clearances from all countries lived in 12+ months.', is_mandatory: true },
      { title: 'HAP ID Medical Clearance Report', description: 'Health assessment conducted by Bupa Medical Visa Services / designated panel clinics.', is_mandatory: true },
      { title: 'Proof of Funds & Employment Income', description: 'Sufficient funds for settlement & relocation (approx. 25,000–35,000 AUD).', is_mandatory: true }
    ],
    'uk': [
      { title: 'Valid Passport', description: 'Current and all previous Passports used during the 5-year qualifying residence period.', is_mandatory: true },
      { title: 'Employer Confirmation Letter', description: 'Confirming ongoing employment at required rate (Skilled Worker route) on official letterhead.', is_mandatory: true },
      { title: 'Life in the UK Test Pass Notification', description: 'Mandatory civic knowledge test pass certificate with unique reference number.', is_mandatory: true },
      { title: 'B1 English Language Certificate / UK Degree', description: 'SELT CEFR B1 certificate or Ecctis statement confirming UK degree equivalency.', is_mandatory: true },
      { title: 'Continuous Residence Absence Summary', description: 'Evidence of absences from the UK not exceeding 180 days in any 12-month period with travel history log.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Clean criminal record check from home country and official UK residence disclosure.', is_mandatory: true }
    ],
    'usa': [
      { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond the intended date of entry into the United States.', is_mandatory: true },
      { title: 'Approved USCIS Immigrant Petition', description: 'Form I-797 approval notice (I-130 / I-140 / I-526) with current Priority Date in Visa Bulletin.', is_mandatory: true },
      { title: 'Form DS-260 Immigrant Visa Confirmation Page', description: 'Online Immigrant Visa Electronic Application confirmation page submitted via CEAC with barcode.', is_mandatory: true },
      { title: 'Form I-864 Affidavit of Support & IRS Tax Transcripts', description: 'Legally binding financial sponsorship with IRS tax transcripts and W-2s proving income above 125% FPG.', is_mandatory: true },
      { title: 'Civil Documents & Police Clearance Certificates', description: 'Original birth certificates, marriage certificates, and PCCs from all countries lived in 6+ months.', is_mandatory: true },
      { title: 'CDC Approved Panel Physician Medical Examination', description: 'Sealed medical report from CDC panel physician (Max Healthcare, Apollo) including vaccinations.', is_mandatory: true }
    ],
    'new-zealand': [
      { title: 'Valid Passport', description: 'Color scan of bio-data and all stamped pages of current passport (valid 12+ months).', is_mandatory: true },
      { title: 'NZQA International Qualifications Assessment (IQA)', description: 'Official International Qualifications Assessment from NZQA confirming qualification equivalency.', is_mandatory: true },
      { title: 'English Language Competency Scorecard', description: 'IELTS General Training (minimum 6.5 overall) or PTE Academic (minimum 58 overall) scorecard.', is_mandatory: true },
      { title: 'Skilled Employment Offer / Registration', description: 'Offer of skilled employment from an accredited NZ employer paying at or above the median wage.', is_mandatory: true },
      { title: 'National Police Clearance Certificates', description: 'Police certificates from Regional Passport Office (RPO) and all countries resided in for 12+ months.', is_mandatory: true },
      { title: 'INZ 1007 General Medical Certificate & Chest X-ray', description: 'eMedical panel physician medical and chest X-ray certificate.', is_mandatory: true },
      { title: 'Proof of Settlement Solvency', description: 'Minimum 20,000–30,000 NZD in unencumbered liquid funds.', is_mandatory: true }
    ],
    'germany': [
      { title: 'Valid Passport', description: 'Current passport with at least 12 months validity and blank visa pages.', is_mandatory: true },
      { title: 'Foreign Degree Recognition (ZAB / Anabin)', description: 'ZAB Statement of Comparability confirming German university degree equivalency.', is_mandatory: true },
      { title: 'German Language Certificate (CEFR A1 / B1)', description: 'Goethe-Institut / telc / TestDaF certificate proving required German language level.', is_mandatory: true },
      { title: 'Statutory Pension Proof (Rentenversicherung)', description: 'Official contribution statement showing 21 to 27 months of statutory pension payments.', is_mandatory: true },
      { title: 'Employment Contract & Salary Slips', description: 'Current indefinite employment contract, job description, and last 6 months payslips.', is_mandatory: true },
      { title: 'Proof of Adequate Living Space (Mietvertrag)', description: 'Lease agreement and landlord confirmation (Wohnungsgeberbestätigung).', is_mandatory: true },
      { title: 'Integration & Legal System Knowledge', description: '"Life in Germany" / Einbürgerungstest test certificate.', is_mandatory: true }
    ],
    'uae': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 6 months with clear bio-data pages.', is_mandatory: true },
      { title: 'MOE Degree Attestation / Equivalency', description: 'Apostilled and UAE Ministry of Education (MOE) attested Bachelor/Master/PhD degree certificate.', is_mandatory: true },
      { title: 'Employment Contract / Professional Letter', description: 'Valid UAE employment contract with minimum monthly salary of 30,000 AED or real estate title deed.', is_mandatory: true },
      { title: '6-Month Bank Statements', description: 'Stamped UAE bank statements showing regular salary credit of 30,000+ AED/month.', is_mandatory: true },
      { title: 'Comprehensive UAE Health Insurance', description: 'Valid medical insurance policy covering Golden Visa holder and family dependents.', is_mandatory: true },
      { title: 'Real Estate Title Deed (if applicable)', description: 'Title Deed from Dubai Land Department (DLD) for 2,000,000 AED property investment.', is_mandatory: false }
    ],
    'singapore': [
      { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages.', is_mandatory: true },
      { title: 'Educational Credentials', description: 'Degree certificates, transcripts, and professional qualifications.', is_mandatory: true },
      { title: 'Employment Records', description: 'Employment contracts, payslips, and CPF contribution statements for the last 2-5 years.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 3 years ITR acknowledgements from IRAS or home country.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true },
      { title: 'Medical Examination Report', description: 'Health check report from an approved medical clinic.', is_mandatory: true },
      { title: 'Family Background Documents', description: 'Birth certificates, marriage certificates, and family details.', is_mandatory: true }
    ]
  };

  const defaultDocs: DocumentRequiredItem[] = [
    { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended travel date.', is_mandatory: true },
    { title: 'Educational Credential Assessment (ECA)', description: 'Official qualification equivalency report from an authorized evaluating body.', is_mandatory: true },
    { title: 'English/French Language Test Score', description: 'IELTS, PTE, or TEF scorecard meeting minimum requirements.', is_mandatory: true },
    { title: 'Police Clearance Certificate (PCC)', description: 'PCCs from all countries resided in for 6+ months since age 18.', is_mandatory: true },
    { title: 'Medical Examination Report', description: 'Comprehensive medical clearance from authorized panel clinics.', is_mandatory: true },
    { title: 'Proof of Settlement Funds', description: 'Liquid bank balance certificate demonstrating financial self-sufficiency.', is_mandatory: true },
    { title: 'Work Experience Reference Letters', description: 'Detailed reference letters from employers confirming job title, responsibilities, and dates.', is_mandatory: true }
  ];

  return map[c] || defaultDocs;
}

// ── 4. PR STEPS — COUNTRY SPECIFIC ──
export function getPRSteps(countryOrFrom: string, maybeCountry?: string, _purpose?: string): string[] {
  const target = maybeCountry || countryOrFrom;
  const c = normalizeCountry(target);
  const map: Record<string, string[]> = {
    'canada': [
      'Step 1: Complete Educational Credential Assessment (ECA) — Get your foreign degree assessed by WES, CES, or IQAS for Canadian equivalency.',
      'Step 2: Take Language Test — Appear for IELTS General Training (CLB 7+ minimum) or PTE Core and receive your scorecard.',
      'Step 3: Create Express Entry Profile — Submit your profile online on the IRCC portal with your ECA, language scores, and work experience.',
      'Step 4: Enter Express Entry Pool — Your CRS score is calculated. You will receive an Invitation to Apply (ITA) in a regular bi-weekly draw.',
      'Step 5: Submit Complete e-APR — Within 60 days of receiving ITA, submit your electronic Application for Permanent Residence with medicals, PCC, and settlement fund proof.',
      'Step 6: Pay Fees & Wait for Processing — Pay 950 CAD processing fee + 575 CAD RPRF fee + 85 CAD biometrics fee. Wait for 6 months (standard IRCC SLA).',
      'Step 7: Receive Confirmation of Permanent Residence (COPR) — Submit passport to VFS for PR visa foil stamping.',
      'Step 8: Land in Canada & Receive PR Card — Travel to Canada, present COPR at port of entry, and receive your 5-Year PR Card.'
    ],
    'australia': [
      'Step 1: Complete Skills Assessment — Get your skills assessed by the relevant Australian assessing authority (ACS, Engineers Australia, VETASSESS).',
      'Step 2: Take English Language Exam — Appear for PTE Academic (65+ for Proficient English / 79+ for Superior) or IELTS.',
      'Step 3: Submit Expression of Interest (EOI) — Lodge your EOI on SkillSelect portal with your points breakdown (minimum 65 points).',
      'Step 4: Receive Invitation to Apply (ITA) — Wait for a SkillSelect invitation round based on points cutoff.',
      'Step 5: Lodge Complete Visa Application — Submit your visa application (Subclass 189/190) on ImmiAccount within 60 days of invitation.',
      'Step 6: Complete Health & Biometrics — Complete medical examination (HAP ID) and attend biometrics at VFS Global ABCC.',
      'Step 7: Pay Fees & Wait for Processing — Pay 4,765 AUD base application charge. Wait for 6-9 months.',
      'Step 8: Receive PR Grant & Plan Travel — Receive permanent residency grant notification and travel to Australia before initial entry date.'
    ],
    'uk': [
      'Step 1: Complete 5 Years of Qualifying Residence — Hold a qualifying visa (Skilled Worker, Global Talent, etc.) for 5 years with no major absences.',
      'Step 2: Prepare Continuous Residence Evidence — Ensure absences from the UK do not exceed 180 days in any 12-month period.',
      'Step 3: Pass the Life in the UK Test — Take and pass the civic knowledge test at an authorized test centre.',
      'Step 4: Meet English Language Requirement — Provide CEFR B1 English certificate (IELTS/PTE/Trinity) or UK degree evidence.',
      'Step 5: Complete Online ILR Application (Set(O) / Set(M)) — Fill the online settlement form on GOV.UK.',
      'Step 6: Pay ILR Application Fee — Pay £3,029 ILR settlement application fee + £50 Life in the UK Test fee.',
      'Step 7: Attend UKVCAS Biometrics — Attend biometric appointment to scan passport and enroll biometrics.',
      'Step 8: Receive ILR Decision — Get your Indefinite Leave to Remain approval. Apply for British Citizenship after 1 year of ILR.'
    ],
    'usa': [
      'Step 1: Secure USCIS Petition Approval — Employer or family relative files Form I-130/I-140 and receives Form I-797 approval notice.',
      'Step 2: Case Transfer to NVC — Case transferred to National Visa Center (NVC). Pay DS-260 immigrant fee (345 USD employment / 325 USD family).',
      'Step 3: Complete DS-260 & Upload Documents — Fill online DS-260 and upload civil documents, PCC, and I-864 Affidavit of Support with IRS tax returns.',
      'Step 4: Complete Medical Exam — Complete medical exam at CDC-authorized panel physician clinic in India.',
      'Step 5: Attend VAC Biometrics — Submit biometrics at the Visa Application Center.',
      'Step 6: Attend Immigrant Visa Interview — Attend interview at US Embassy/Consulate with original civil dossier.',
      'Step 7: Receive Immigrant Visa Foil — Receive 6-month immigrant entry visa foil in passport.',
      'Step 8: Travel to US & Receive Green Card — Pay 235 USD USCIS Immigrant Fee online and travel to the US to receive physical 10-Year Green Card.'
    ],
    'new-zealand': [
      'Step 1: Complete NZQA International Qualifications Assessment (IQA) — Get your foreign qualification assessed by NZQA.',
      'Step 2: Take English Language Exam — Appear for IELTS General Training (6.5+) or PTE Academic (58+).',
      'Step 3: Secure Accredited Employer Job Offer — Get a job offer from an INZ Accredited Employer paying at or above median wage.',
      'Step 4: Submit EOI in SMC Pool — Lodge Expression of Interest claiming 6 points on Immigration New Zealand portal.',
      'Step 5: Receive Invitation to Apply (ITA) — Wait for invitation from INZ upon verification of point claims.',
      'Step 6: Lodge Complete Resident Visa Application — Submit complete application within 4 months with eMedical, apostilled PCC, and employer confirmation.',
      'Step 7: Pay Fees & Wait for Processing — Pay 4,890 NZD application & immigration levy. Wait for 6-9 months.',
      'Step 8: Receive Resident Visa Grant — Receive electronic Skilled Migrant Category Resident Visa Grant Notice. Apply for Permanent Resident Visa (PRV) after 24 months.'
    ],
    'germany': [
      'Step 1: Secure EU Blue Card or Qualifying Employment — Get a job offer meeting EU Blue Card salary thresholds (€45,300/year for shortage occupations).',
      'Step 2: Obtain ZAB Degree Comparability — Get your foreign degree recognized as equivalent to a German university degree.',
      'Step 3: Complete 21 Months (B1 German) or 27 Months (A1 German) — Work and pay statutory pension contributions (Rentenversicherung) for the required period.',
      'Step 4: Pass German Language Test — Goethe-Institut / telc / TestDaF certificate at B1 (21 months) or A1 (27 months).',
      'Step 5: Gather Required Documents — Compile employment contract, pension proof, lease agreement, and language certificate.',
      'Step 6: Submit Application at Ausländerbehörde — Apply for Niederlassungserlaubnis at the local immigration office.',
      'Step 7: Pay Settlement Application Fee — Pay 113 EUR settlement application fee.',
      'Step 8: Receive Permanent Settlement Permit — Receive indefinite Niederlassungserlaubnis. Card renewal every 10 years matching passport.'
    ],
    'uae': [
      'Step 1: Check Eligibility — Meet salary requirement (30,000 AED/month) or real estate investment (2,000,000 AED) or outstanding talent criteria.',
      'Step 2: Attest University Degree — Get your degree apostilled and attested by UAE Ministry of Education (MOE).',
      'Step 3: Submit Golden Visa Nomination — Apply for Golden Visa nomination via ICP portal or GDRFA Dubai.',
      'Step 4: Receive 6-Month Entry Visa — Get 6-month multiple-entry visa to finalize procedures in the UAE.',
      'Step 5: Complete Medical & Biometrics — Complete VIP medical fitness screening and Emirates ID biometric enrollment.',
      'Step 6: Pay Fees & Receive Golden Visa — Pay 2,800-3,800 AED + 1,050 AED Emirates ID fee.',
      'Step 7: Receive 10-Year Golden Visa — Get official 10-Year Golden Visa digital residency and physical Emirates ID.'
    ],
    'singapore': [
      'Step 1: Hold Employment Pass (EP) for 2-5 Years — Gain work experience in Singapore on an EP or S-Pass.',
      'Step 2: Gather Required Documents — Compile passport, educational credentials, employment records, CPF contributions, and tax returns.',
      'Step 3: Submit PR Application to ICA — Complete the online PR application form on ICA website.',
      'Step 4: Pay Application Fee — Pay SGD 100 application fee.',
      'Step 5: Attend ICA Interview (if requested) — ICA may call for an interview or additional document submission.',
      'Step 6: Wait for Processing — PR applications take 4-6 months to process.',
      'Step 7: Receive PR Approval — Receive In-Principle Approval (IPA) from ICA.',
      'Step 8: Complete Formalities & Receive PR Card — Complete medical and biometrics at ICA. Receive Blue IC (Singapore PR card).'
    ]
  };

  const defaultSteps: string[] = [
    'Step 1: Check Eligibility — Verify you meet the minimum eligibility requirements for PR in your destination country.',
    'Step 2: Complete Educational Assessment — Get your foreign credentials assessed by the designated authority.',
    'Step 3: Take Language Test — Appear for the required English/French language test.',
    'Step 4: Submit Expression of Interest (EOI) — Lodge your EOI in the immigration pool.',
    'Step 5: Receive Invitation to Apply (ITA) — Wait for invitation from immigration authorities.',
    'Step 6: Lodge Complete Application — Submit complete PR application with all supporting documents.',
    'Step 7: Complete Medical & Biometrics — Complete health examination and biometric enrollment.',
    'Step 8: Receive PR Grant & Plan Travel — Receive permanent residency grant. Plan your move to your destination country.'
  ];

  return map[c] || defaultSteps;
}

export function getPRVisaSteps(countryOrFrom: string, maybeCountry?: string, _purpose?: string): string[] {
  return getPRSteps(countryOrFrom, maybeCountry, _purpose);
}

// ── 5. PR FEES — COUNTRY SPECIFIC ──
export function getPRFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; currency: string; notes: string } {
  const c = normalizeCountry(country);
  const map: Record<string, { visa_fee: string; service_fee: string; total_fee: string; currency: string; notes: string }> = {
    'canada': {
      visa_fee: '950 CAD (Principal Applicant Processing Fee)',
      service_fee: '575 CAD (Right of Permanent Residence Fee - RPRF) + 85 CAD (Biometrics Fee)',
      total_fee: '1,610 CAD Total IRCC Fee for Single Applicant',
      currency: 'CAD',
      notes: 'RPRF (575 CAD) is refundable if application is refused. Spouse fee: 950 CAD + 575 CAD RPRF. Dependent child: 230 CAD.'
    },
    'australia': {
      visa_fee: '4,765 AUD (Base Application Charge for Primary Applicant)',
      service_fee: '2,385 AUD (Additional Applicant 18+ Years) / 1,195 AUD (Under 18)',
      total_fee: '4,765 AUD Base Charge',
      currency: 'AUD',
      notes: 'Paid online via ImmiAccount. Excludes Skills Assessment and English test fees.'
    },
    'uk': {
      visa_fee: '£3,029 (ILR Settlement Application Fee)',
      service_fee: '£50 (Life in the UK Test)',
      total_fee: '£3,079 Total Official Fees',
      currency: 'GBP',
      notes: 'Payable online at official UKVI portal. Super Priority: 24 hours (+£1,000).'
    },
    'usa': {
      visa_fee: '345 USD (Employment-Based DS-260) / 325 USD (Family-Based DS-260)',
      service_fee: '235 USD (USCIS Immigrant Fee for Green Card Production) + 120 USD (NVC I-864 Review if applicable)',
      total_fee: '580 USD – 700 USD Official Government Fee Breakdown',
      currency: 'USD',
      notes: 'NVC fees paid via CEAC portal. 235 USD Green Card production fee paid online to USCIS before US arrival. Excludes initial Form I-130/I-140 filing fees.'
    },
    'new-zealand': {
      visa_fee: '4,890 NZD (Immigration New Zealand SMC Application & Immigration Levy)',
      service_fee: '450 NZD (NZQA IQA Evaluation)',
      total_fee: '4,890 NZD Official Government Fee',
      currency: 'NZD',
      notes: 'Paid online via Immigration Online portal. Excludes medical exam and English test charges.'
    },
    'germany': {
      visa_fee: '75 EUR (National Visa Type D) + 113 EUR (Niederlassungserlaubnis Settlement Application Fee)',
      service_fee: '200 EUR (ZAB Degree Statement of Comparability)',
      total_fee: '188 EUR Government Immigration Fee',
      currency: 'EUR',
      notes: 'Payable in EUR/INR at German Embassy and Ausländerbehörde upon application.'
    },
    'uae': {
      visa_fee: '2,800 AED – 3,800 AED (approx. 760 USD – 1,030 USD)',
      service_fee: '1,050 AED (Emirates ID 10-Year Issuance Fee)',
      total_fee: '3,850 AED Total Official Government Fee',
      currency: 'AED',
      notes: 'Paid online directly through official ICP / GDRFA Dubai portals.'
    },
    'singapore': {
      visa_fee: 'SGD 100 (Application Fee)',
      service_fee: 'SGD 100 (PR Card Issuance Fee)',
      total_fee: 'SGD 200 Total Reference',
      currency: 'SGD',
      notes: 'Paid online via ICA portal. Additional fees for dependents.'
    }
  };

  return map[c] || {
    visa_fee: 'Official Statutory Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    currency: 'USD',
    notes: 'Check official immigration department website for current PR statutory fee schedules.'
  };
}

// ── 6. PR PROCESSING TIME — COUNTRY SPECIFIC ──
export function getPRProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': '6 Months (Express Entry IRCC Standard SLA). PNP: 8-12 months. Quebec: 12-18 months.',
    'australia': '6 to 9 Months from Invitation to Visa Grant. Skills Assessment: 4-8 weeks. EOI waiting: varies.',
    'uk': 'Standard: Up to 6 Months. Super Priority: 24 Hours available (+£1,000).',
    'usa': 'NVC Consular Processing (Subject to Visa Bulletin Priority Dates). I-485: 6-12 months. EB-5: 12-24 months.',
    'new-zealand': '6 to 9 Months Standard SLA. SMC processing: 6-9 months after ITA.',
    'germany': 'Fast-Track PR: 21 Months (B1 German) or 27 Months (A1 German). Application decision: 6-12 weeks.',
    'uae': '48 to 72 hours initial approval; 7 to 14 days full issuance. Golden Visa processing: 1-2 weeks.',
    'singapore': '4 to 6 Months (ICA Standard Processing). PR applications take 4-6 months after submission.'
  };

  return map[c] || 'Per Official Immigration SLA. Apply at least 6-12 months before planned relocation.';
}

export function getPRProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': 'Complete ECA and language test before creating Express Entry profile. Submit complete e-APR within 60 days of receiving ITA.',
    'australia': 'Complete Skills Assessment before submitting EOI. Lodge visa application within 60 days of receiving invitation.',
    'uk': 'Apply up to 28 days before completing the 5-year qualifying period. Life in UK Test must be passed before application.',
    'usa': 'File DS-260 once NVC issues welcome letter and Priority Date is current in Visa Bulletin. Medical exam valid for 6 months.',
    'new-zealand': 'Submit complete application within 4 months of receiving ITA. IQA and medicals must be valid.',
    'germany': 'Apply for Settlement Permit after 21 or 27 months of Blue Card employment. Pension contributions must be verified.',
    'uae': 'Apply anytime upon meeting salary (30k AED) or real estate investment (2M AED) benchmarks.',
    'singapore': 'Apply after 2-5 years of work experience in Singapore. ICA assesses applications on a case-by-case basis.'
  };

  return map[c] || 'Apply at least 6-12 months before planned relocation. Check official immigration website for current processing stages.';
}

// ── 7. PR REQUIREMENTS — COUNTRY SPECIFIC ──
export function getPRRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, OtherRequirementItem[]> = {
    'canada': [
      { category: 'CRS Points Threshold', details: 'CRS score must meet current Express Entry draw cutoff. Minimum: 67 points for FSW, but actual cutoff varies (typically 470-500+).' },
      { category: 'Language Proficiency', details: 'IELTS General Training (CLB 7+ minimum; CLB 9+ recommended) or PTE Core (58+).' },
      { category: 'ECA & Work Experience', details: 'Educational Credential Assessment (ECA) and 1+ years of continuous skilled work experience (NOC TEER 0/1/2/3).' },
      { category: 'Settlement Funds', details: 'Minimum 14,690 CAD for single applicant, 18,288 CAD for family of 2. Must be unencumbered liquid funds.' },
      { category: 'Medical & PCC', details: 'Upfront medical examination (IME) and Police Clearance Certificates (PCC) from all countries lived in 6+ months.' }
    ],
    'australia': [
      { category: 'Points Threshold (65+ Points)', details: 'Minimum 65 points required on DHA points test based on age, English proficiency, qualifications, and work experience.' },
      { category: 'Skills Assessment', details: 'Positive skills assessment from designated Australian assessing authority (ACS, EA, VETASSESS).' },
      { category: 'Language Proficiency', details: 'PTE Academic (65+ for Proficient English / 79+ for Superior) or IELTS (6.0+ for Competent / 7.0+ for Proficient).' },
      { category: 'Occupation List', details: 'Nominated occupation must be on the relevant skilled occupation list (MLTSSL or STSOL).' },
      { category: 'Age Limit', details: 'Under 45 years of age at the time of invitation to apply.' }
    ],
    'uk': [
      { category: '5-Year Continuous Residence', details: 'Must have lived in the UK for 5 years on a qualifying visa. Absences not exceeding 180 days in any 12-month period.' },
      { category: 'Life in the UK Test', details: 'Mandatory civic knowledge test covering British history, culture, and government. Must be passed before application.' },
      { category: 'English Language B1', details: 'CEFR B1 level in reading, writing, speaking, and listening (IELTS/PTE/Trinity).' },
      { category: 'Good Character Requirement', details: 'Clean criminal record with no serious convictions. No public funds reliance.' }
    ],
    'usa': [
      { category: 'USCIS Petition Approval', details: 'Approved I-130 (Family) or I-140 (Employment) petition from USCIS. Priority Date must be current in Visa Bulletin.' },
      { category: 'I-864 Affidavit of Support', details: 'Legally binding financial sponsorship with IRS tax transcripts and W-2s proving income above 125% of Federal Poverty Guidelines.' },
      { category: 'Medical & Vaccination', details: 'CDC-approved panel physician medical examination and vaccination dossier completed within 6 months of consular interview.' },
      { category: 'No Unlawful Presence', details: 'No unauthorized work or overstay in the US. Must not have violated immigration laws.' }
    ],
    'germany': [
      { category: 'Pension Contributions', details: '21-27 months of statutory pension payments (Rentenversicherung). Contributions must be verified with official statement.' },
      { category: 'German Language', details: 'B1 German (21 months) or A1 German (27 months) certification from Goethe-Institut / telc / TestDaF.' },
      { category: 'Adequate Living Space', details: 'Lease agreement (Mietvertrag) and landlord confirmation (Wohnungsgeberbestätigung) proving adequate room space.' },
      { category: 'Integration Knowledge', details: '"Life in Germany" / Einbürgerungstest test certificate proving basic knowledge of legal and social order.' }
    ],
    'uae': [
      { category: 'Salary / Investment Threshold', details: '30,000 AED monthly salary OR 2,000,000 AED real estate investment OR outstanding talent in technology/healthcare/education.' },
      { category: 'Degree Attestation', details: 'MOE (Ministry of Education) degree attestation for educational qualification. Must be apostilled and attested.' },
      { category: 'Health Insurance', details: 'Comprehensive UAE health insurance covering Golden Visa holder and family dependents.' },
      { category: 'Exemption from 6-Month Rule', details: 'Golden Visa holders can stay outside the UAE for any duration without visa becoming invalid.' }
    ],
    'new-zealand': [
      { category: '6-Point Threshold', details: 'Minimum 6 points required from qualifications, NZ occupational registration, or high income plus NZ skilled work.' },
      { category: 'Accredited Employer Job Offer', details: 'Full-time employment offer from an INZ Accredited Employer paying at least the median wage.' },
      { category: 'English Competency', details: 'Minimum IELTS 6.5 overall or PTE Academic 58 overall for principal applicant.' },
      { category: 'Age Limit', details: 'Must be 55 years of age or younger when submitting the Resident Visa application.' }
    ],
    'singapore': [
      { category: 'Employment Standing', details: 'Employment Pass (EP) or S-Pass holder with 2-5 years of demonstrated career progression in Singapore.' },
      { category: 'Economic & Social Contributions', details: 'Verified CPF contributions, local tax compliance (IRAS), and community integration.' },
      { category: 'Educational Pedigree', details: 'Recognized tertiary qualifications from accredited global institutions.' },
      { category: 'Family Roots', details: 'Assessment includes marital status, dependent children, and local Singapore family ties.' }
    ]
  };

  const defaultRequirements: OtherRequirementItem[] = [
    { category: 'Points Threshold', details: 'Must meet the minimum points threshold for your destination country\'s PR program.' },
    { category: 'Language Proficiency', details: 'Must meet the minimum language test score requirement (IELTS/PTE/TEF).' },
    { category: 'Qualification Assessment', details: 'ECA (Educational Credential Assessment) from an authorized evaluating body.' },
    { category: 'Police Clearance', details: 'PCC from all countries resided in for 6+ months since age 18.' },
    { category: 'Medical Clearance', details: 'Medical examination from authorized panel physicians.' }
  ];

  return map[c] || defaultRequirements;
}

// ── 8. PR FINANCIAL PROOFS ──
export function getPRFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FinancialProofItem[]> = {
    'canada': [
      { type: 'Proof of Settlement Funds (LICO)', minimum_balance_or_amount: '14,690 CAD (Single) / 18,288 CAD (Family of 2)', time_frame: 'Last 6 Months', notes: 'Official bank letter stating unencumbered liquid funds in savings/fixed deposit accounts.' },
      { type: 'Average 6-Month Bank Balance', minimum_balance_or_amount: 'Maintained above threshold', time_frame: 'Last 6 Months', notes: 'Detailed stamped bank statements showing steady closing balances with zero borrowed funds.' },
      { type: 'Personal Liquid Assets', minimum_balance_or_amount: 'Liquid cash, FDs, mutual funds', time_frame: 'Immediate availability', notes: 'Real estate equity cannot count toward settlement funds.' }
    ],
    'australia': [
      { type: 'Settlement Liquidity Benchmark', minimum_balance_or_amount: '25,000 AUD – 35,000 AUD recommended', time_frame: 'At time of relocation', notes: 'Liquid funds to support relocation and living expenses prior to securing local employment.' },
      { type: 'Employment Earnings & Tax Filings', minimum_balance_or_amount: 'Proof of claimed salary', time_frame: 'Last 3-5 Years', notes: 'Income tax returns (ITRs / Form 16) and payslips verifying claimed points for overseas work experience.' },
      { type: 'Bank Account Statements', minimum_balance_or_amount: 'Substantial savings', time_frame: 'Last 6 Months', notes: 'Stamped bank statements corroborating salary credits.' }
    ],
    'uk': [
      { type: 'Minimum Income & Salary Threshold', minimum_balance_or_amount: 'Statutory going rate for SOC code', time_frame: 'Current & Ongoing', notes: 'Employer letter and payslips confirming ongoing salary at or above Skilled Worker settlement rate.' },
      { type: 'Bank Statements & Payslips', minimum_balance_or_amount: 'Regular monthly salary credits', time_frame: 'Last 3 to 6 Months', notes: 'Official bank statements showing regular salary deposits matching payslips.' },
      { type: 'No Recourse to Public Funds', minimum_balance_or_amount: 'Financial self-sufficiency', time_frame: 'Entire qualifying 5-year period', notes: 'Evidence that applicant has maintained themselves without claiming public funds.' }
    ],
    'usa': [
      { type: 'Form I-864 Affidavit of Support', minimum_balance_or_amount: '125% of Federal Poverty Guidelines', time_frame: 'Most recent tax year', notes: 'Legally binding financial contract executed by petitioner or joint sponsor.' },
      { type: 'IRS Tax Return Transcripts & W-2s', minimum_balance_or_amount: 'Above federal poverty threshold', time_frame: 'Last 3 Tax Years', notes: 'Official IRS tax return transcripts and Form W-2 wage statements.' },
      { type: 'Proof of Current Employment / Assets', minimum_balance_or_amount: 'Liquid assets or employment letter', time_frame: 'Current', notes: 'Current employment confirmation or liquid assets totaling 5x the shortfall.' }
    ],
    'germany': [
      { type: 'Statutory Pension Proof (Versicherungsverlauf)', minimum_balance_or_amount: '21 to 27 monthly contributions', time_frame: '21-27 Months', notes: 'Official statement from Deutsche Rentenversicherung proving required compulsory pension payments.' },
      { type: 'Salary Slips & Employment Contract', minimum_balance_or_amount: 'EU Blue Card threshold (€45,300+)', time_frame: 'Last 6 Months', notes: 'Indefinite employment contract and last 6 monthly payslips.' },
      { type: 'Bank Account Statements', minimum_balance_or_amount: 'Regular net salary inflows', time_frame: 'Last 3 Months', notes: 'Stamped German bank statements matching salary slips.' }
    ],
    'uae': [
      { type: 'Monthly Salary Credit Benchmark', minimum_balance_or_amount: '30,000+ AED per month', time_frame: 'Last 6 Months', notes: 'Personal bank statements showing continuous monthly salary credits of at least 30,000 AED under standard employment.' },
      { type: 'Real Estate Investment Title Deed', minimum_balance_or_amount: '2,000,000 AED property value', time_frame: 'Unencumbered or low mortgage', notes: 'Official Dubai Land Department (DLD) title deed proving property ownership of 2M+ AED.' },
      { type: 'Bank Deposit Certificate (Investor)', minimum_balance_or_amount: '2,000,000 AED fixed deposit', time_frame: '2-Year Term', notes: 'Accredited UAE bank certificate confirming non-withdrawable 2-year deposit.' }
    ]
  };

  const defaultProofs: FinancialProofItem[] = [
    { type: 'Proof of Settlement Solvency', minimum_balance_or_amount: '₹10,00,000 – ₹15,00,000 equivalent', time_frame: 'Last 6 Months', notes: 'Official bank letter confirming unencumbered liquid funds in savings or fixed deposits.' },
    { type: 'Bank Statements', minimum_balance_or_amount: 'Consistent liquid balance', time_frame: 'Last 6 Months', notes: 'Stamped official bank statements showing regular savings and no recent unexplainable lump sums.' },
    { type: 'Tax Filings & Employment Income', minimum_balance_or_amount: 'Verified earnings', time_frame: 'Last 3 Years', notes: 'Income Tax Return (ITR) acknowledgements and Form 16 / payslips.' }
  ];

  return map[c] || defaultProofs;
}

// ── 9. PR FAQ — COUNTRY SPECIFIC ──
export function getPRFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FAQItem[]> = {
    'canada': [
      { question: 'What is the minimum CRS score for Canada PR?', answer: 'The CRS score minimum varies by draw. Recently, scores have been 470-500+. You should aim for at least CRS 470 to be competitive. Provincial Nominee Programs (PNP) give an additional 600 points.' },
      { question: 'What is the processing time for Canada Express Entry?', answer: 'Standard processing time is 6 months from e-APR submission. PNP applications take 8-12 months. Apply 4-6 months before planned relocation.' },
      { question: 'Do I need a job offer for Canada PR?', answer: 'No, you do not need a job offer for Federal Skilled Worker (FSW) under Express Entry. However, a job offer can boost your CRS score by 50-200 points.' },
      { question: 'Can I bring my family on Canada PR?', answer: 'Yes, you can include your spouse and dependent children in your PR application. Spouse fee: 950 CAD + 575 CAD RPRF. Dependent child: 230 CAD.' },
      { question: 'When can I apply for Canadian Citizenship?', answer: 'You can apply for Canadian citizenship once you have been physically present in Canada as a Permanent Resident for at least 1,095 days (3 years) within the past 5 years.' }
    ],
    'australia': [
      { question: 'What is the minimum points required for Australia PR?', answer: 'You need at least 65 points on the SkillSelect points test. However, actual invitation scores are often higher (75-85+). Points are awarded for age, English, qualifications, work experience, and more.' },
      { question: 'What is the processing time for Australia PR?', answer: 'Standard processing is 6 to 9 months from invitation to visa grant. Skills assessment: 4-8 weeks. EOI waiting: varies by occupation.' },
      { question: 'Do I need a job offer for Australia PR?', answer: 'No, Subclass 189 (Skilled Independent) does not require a job offer. Subclass 190 (State Nominated) requires state nomination. Subclass 491 (Regional) requires regional nomination.' },
      { question: 'Can I bring my family on Australia PR?', answer: 'Yes, you can include your spouse and dependent children. Additional fees apply: 2,385 AUD for spouse (18+ years), 1,195 AUD for children (under 18).' },
      { question: 'When can I apply for Australian Citizenship?', answer: 'You can apply for Australian citizenship after living in Australia for 4 years on a valid visa, including at least 12 months as a Permanent Resident.' }
    ],
    'uk': [
      { question: 'What is ILR and how do I get it?', answer: 'ILR (Indefinite Leave to Remain) is permanent settlement in the UK. You must have lived in the UK for 5 years on a qualifying visa, pass the Life in the UK Test, and meet English language requirements.' },
      { question: 'What is the processing time for UK ILR?', answer: 'Standard processing: Up to 6 months. Super Priority: 24 hours (+£1,000). Apply 28 days before completing the 5-year qualifying period.' },
      { question: 'Can I bring my family on UK ILR?', answer: 'Yes, you can include your spouse and dependent children. They need to apply as dependents and meet the financial requirement.' },
      { question: 'What is the Life in the UK Test?', answer: 'The Life in the UK Test is a mandatory civic knowledge test covering British history, culture, and government. You must pass it before applying for ILR.' },
      { question: 'When can I apply for British Citizenship after ILR?', answer: 'You can apply for naturalization as a British citizen after holding ILR for at least 12 months (or immediately upon ILR grant if married to a British citizen).' }
    ],
    'usa': [
      { question: 'What is the processing time for US Green Card?', answer: 'Processing time varies by category and priority date. EB-1: 6-12 months. EB-2/EB-3: 12-24 months. EB-5: 12-24 months. Family-based: 12-24 months. Wait for priority date to become current in Visa Bulletin.' },
      { question: 'What is the difference between I-485 and DS-260?', answer: 'I-485 (Adjustment of Status) is for applicants already in the US on a valid visa. DS-260 (Consular Processing) is for applicants outside the US applying through the National Visa Center (NVC).' },
      { question: 'Can I bring my family on US Green Card?', answer: 'Yes, you can include your spouse and dependent children. They will receive derivative immigrant visas and Green Cards.' },
      { question: 'What is the Visa Bulletin?', answer: 'The Visa Bulletin is a monthly publication by the Department of State showing priority dates for immigrant visas. Your priority date must become current before you can proceed with your Green Card application.' },
      { question: 'When can I apply for US Citizenship?', answer: 'You can apply for US citizenship (Form N-400) after 5 years of holding Lawful Permanent Resident status (or 3 years if continuously married to a US citizen).' }
    ],
    'new-zealand': [
      { question: 'How does the New Zealand 6-point SMC system work?', answer: 'The SMC system requires 6 points from either: NZ occupational registration, recognized qualification (Bachelor/Master/PhD), or high income (1.5x-3x median wage), plus skilled work experience in NZ.' },
      { question: 'Do I need a job offer for New Zealand SMC?', answer: 'Yes, you must have a genuine job offer from an INZ Accredited Employer paid at or above the national median wage.' },
      { question: 'Can I include my partner and children in my NZ PR application?', answer: 'Yes, partners and dependent children under 24 years of age can be included, provided they satisfy relationship, character, and health requirements.' },
      { question: 'What is the difference between Resident Visa and Permanent Resident Visa (PRV)?', answer: 'A Resident Visa allows you to live indefinitely in NZ but has a 2-year travel condition. After 2 years, you convert to a Permanent Resident Visa (PRV) with lifetime travel rights.' }
    ],
    'germany': [
      { question: 'How quickly can an EU Blue Card holder get PR in Germany?', answer: 'An EU Blue Card holder can obtain permanent settlement (Niederlassungserlaubnis) in just 21 months with certified B1 German, or in 27 months with basic A1 German.' },
      { question: 'What pension proof is required for German PR?', answer: 'You must provide an official contribution statement (Versicherungsverlauf) from Deutsche Rentenversicherung showing at least 21 or 27 monthly statutory payments.' },
      { question: 'Can my spouse work freely if I receive German permanent settlement?', answer: 'Yes, spouses of Niederlassungserlaubnis holders have unrestricted employment and self-employment rights across Germany.' },
      { question: 'When can I apply for German citizenship after PR?', answer: 'Under the reformed German nationality law, skilled permanent residents can apply for German naturalization after 5 years (or 3 years with exceptional C1 integration).' }
    ],
    'uae': [
      { question: 'Who is eligible for the UAE 10-Year Golden Visa?', answer: 'Professionals earning at least 30,000 AED/month, real estate investors owning 2,000,000+ AED property, entrepreneurs, PhD holders, and outstanding talents in STEM or healthcare.' },
      { question: 'Does the 6-month stay rule apply to UAE Golden Visa holders?', answer: 'No, Golden Visa holders are exempt from the standard rule and can stay outside the UAE for any duration without their visa being revoked.' },
      { question: 'Can I sponsor my parents on a UAE Golden Visa?', answer: 'Yes, Golden Visa holders can sponsor their parents, spouse, and children of any age under 10-year residency permits.' },
      { question: 'Does the UAE Golden Visa lead to UAE citizenship?', answer: 'The Golden Visa provides 10-year renewable long-term residency. UAE citizenship is granted solely by special royal decree or cabinet nomination.' }
    ],
    'singapore': [
      { question: 'How long do I need to work in Singapore before applying for PR?', answer: 'Typically, Employment Pass (EP) or S-Pass holders apply after 2 to 5 years of continuous employment and demonstrated tax compliance in Singapore.' },
      { question: 'What are the main factors ICA looks for in Singapore PR?', answer: 'ICA assesses age, family ties, economic contributions, educational qualifications, industry sector relevance, and social integration.' },
      { question: 'Do Singapore PRs have to contribute to CPF?', answer: 'Yes, both employer and employee must make statutory Central Provident Fund (CPF) contributions starting in the first year of PR status.' },
      { question: 'Can Singapore PRs apply for citizenship?', answer: 'Yes, individuals who have been Singapore Permanent Residents for at least 2 years are eligible to submit an application for Singapore citizenship.' }
    ]
  };

  const defaultFAQ: FAQItem[] = [
    { question: `Do I qualify for PR in ${country}?`, answer: `Qualification depends on age, education, work experience, language proficiency, and other factors. Check the official immigration website for current eligibility requirements.` },
    { question: `What is the processing time for PR in ${country}?`, answer: `Processing times vary by country and application type. Apply at least 6-12 months before planned relocation.` },
    { question: `Can I bring my family on PR?`, answer: `Yes, you can usually include your spouse and dependent children in your PR application. Additional fees and documentation may apply.` },
    { question: `Does Permanent Residency lead to Citizenship?`, answer: `In most countries, permanent residency is the primary legal pathway to citizenship after satisfying physical residence requirements (typically 3 to 5 years).` },
    { question: `Can I buy property and work anywhere on a PR status?`, answer: `Yes, permanent residents enjoy unrestricted work rights and can reside anywhere in the country with property purchase rights similar to domestic citizens.` }
  ];

  return map[c] || defaultFAQ;
}

// ── 10. PR VALIDITY, STAY, ENTRY — COUNTRY SPECIFIC ──
export function getPRValidity(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': 'Permanent Resident Status (5-Year Renewable PR Card)',
    'australia': 'Permanent Residency (5-Year Travel Facility; Indefinite Stay)',
    'uk': 'Indefinite Leave to Remain (No Time Limit)',
    'usa': 'Permanent Resident Status (10-Year Renewable Green Card)',
    'new-zealand': 'Resident Visa (2-Year Travel Conditions; Indefinite Stay)',
    'germany': 'Niederlassungserlaubnis (Permanent Settlement — Unlimited Validity)',
    'uae': '10-Year Renewable Golden Residency',
    'singapore': 'Permanent Resident Status (5-Year Renewable PR Card)'
  };

  return map[c] || 'Permanent Resident Status (Renewable)';
}

export function getPRStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': 'Indefinite / Permanent Resident Status with Path to Citizenship after 3 Years (1,095 Days)',
    'australia': 'Permanent Resident Status with Path to Citizenship after 4 Years',
    'uk': 'Indefinite Stay with Path to British Citizenship after 1 Year of ILR',
    'usa': 'Permanent / Indefinite Legal Resident Status (LPR) with Path to Citizenship after 5 Years (or 3 Years if married to US citizen)',
    'new-zealand': 'Indefinite Stay with Path to Permanent Resident Visa (PRV) after 2 Years',
    'germany': 'Indefinite Permanent Residency with Unrestricted Right to Work & EU Mobility',
    'uae': 'Continuous Residency in UAE (Exempt from 6-month stay rule)',
    'singapore': 'Permanent Resident Status with Path to Citizenship after 2-3 Years'
  };

  return map[c] || 'Indefinite / Permanent Resident Status';
}

export function getPREntryType(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': 'Permanent Resident (Multiple Entry)',
    'australia': 'Permanent Resident (5-Year Travel Facility)',
    'uk': 'Indefinite Leave to Enter / Remain',
    'usa': 'Lawful Permanent Resident (Multiple Entry)',
    'new-zealand': 'Resident Visa (Multiple Entry)',
    'germany': 'Permanent Settlement (Multiple Entry & EU Mobility)',
    'uae': '10-Year Multiple Entry Residency',
    'singapore': 'Permanent Resident (Multiple Re-Entry Permit)'
  };

  return map[c] || 'Permanent Resident (Multiple Entry)';
}

// ── 11. OFFICIAL SOURCE NAME ──
export function getPROfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC)',
    'australia': 'Australian Department of Home Affairs (SkillSelect)',
    'uk': 'UK Visas and Immigration (UKVI) & Home Office',
    'usa': 'USCIS & National Visa Center (Department of State)',
    'new-zealand': 'Immigration New Zealand (INZ)',
    'germany': 'Federal Office for Migration and Refugees (BAMF) & Ausländerbehörde',
    'uae': 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) & GDRFA',
    'singapore': 'Immigration & Checkpoints Authority (ICA) Singapore'
  };

  return map[c] || `${country} Immigration Department & Ministry of Interior`;
}

// ── 12. COMPLETE PR VISA DATA BUILDER ──
export function getPRVisaData(
  from: string,
  to: string,
  purpose: string = 'PR'
): StructuredVisaRequirements {
  const countryName = to;
  const c = normalizeCountry(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Permanent Residency / Settlement',
    visa_type: `${countryName} Permanent Residency Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' permanent residency immigration official')}`,
    official_source_name: getPROfficialSourceName(to),

    // ── OVERVIEW ──
    overview: getPROverview(to),
    highlights: getPRHighlights(to),

    // ── STEPS ──
    how_to_apply: getPRSteps(from, to, purpose),

    // ── DOCUMENTS ──
    documents_required: getPRDocuments(from, to, purpose),

    // ── FEES ──
    costs: getPRFees(to),

    // ── PROCESSING TIME ──
    processing_time: getPRProcessingTime(to),
    processing_time_details: getPRProcessingDetails(to),

    // ── REQUIREMENTS ──
    other_requirements: getPRRequirements(to),
    financial_proofs: getPRFinancialProofs(to),

    // ── FAQ ──
    faqs: getPRFAQ(to),

    // ── VALIDITY & STAY ──
    validity: getPRValidity(to),
    stay_duration: getPRStayDuration(to),
    entry_type: getPREntryType(to),

    validity_and_stay: {
      visa_validity: getPRValidity(to),
      max_stay_per_entry: getPRStayDuration(to),
      entry_type: getPREntryType(to)
    },

    processing_and_timing: {
      apply_window: 'Apply 6 to 12 months prior to planned relocation.',
      decision_time: getPRProcessingTime(to),
      max_extension: 'Permanent resident status is indefinite. Card renewal as per statutory country requirements.',
      center_notes: `Authorized Immigration Portal / ${countryName} Mission. Check appointment availability online.`
    },

    verification_status: 'verified',
    is_v3_verified: true
  };
}
