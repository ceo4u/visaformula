// src/lib/work-visa.ts
// Country-specific Work / Employment Visa pipeline based on official immigration and consular mandates

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

export interface WorkHighlightItem {
  icon: string;
  title: string;
  description: string;
}

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview?: string;
  highlights?: WorkHighlightItem[];
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
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('netherlands') || c.includes('holland') || c.includes('dutch')) return 'netherlands';
  if (c.includes('sweden') || c.includes('swedish')) return 'sweden';
  if (c.includes('denmark') || c.includes('danish')) return 'denmark';
  if (c.includes('ireland') || c.includes('irish') || c.includes('eire')) return 'ireland';
  if (c.includes('new zealand') || c === 'nz') return 'new-zealand';
  if (c.includes('saudi') || c.includes('ksa')) return 'saudi-arabia';
  if (c.includes('qatar')) return 'qatar';
  if (c.includes('japan')) return 'japan';
  return c;
}

// ── 1. WORK OVERVIEW — COUNTRY SPECIFIC ──
export function getWorkOverview(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'The UK Skilled Worker Visa allows international professionals to work in the UK for a licensed sponsor. You must have a confirmed job offer from a Home Office-approved sponsor and meet the salary threshold (£38,700 or going rate). The visa is points-based and leads to Indefinite Leave to Remain (ILR) after 5 years.',
    'usa': 'The H-1B Visa allows US employers to hire foreign professionals in specialty occupations. Requires a bachelor\'s degree or higher and a petition filed by the employer. L-1 Visa is for intracompany transferees. H-1B is subject to annual cap (65,000 + 20,000 Masters cap) with lottery system.',
    'canada': 'The Canada Work Permit allows foreign nationals to work in Canada for a specific employer. Requires a positive Labour Market Impact Assessment (LMIA) or an LMIA-exempt offer. The Global Talent Stream (GTS) offers 2-week processing for tech workers. Leads to Express Entry PR pathways.',
    'australia': 'The Australia Temporary Skill Shortage (TSS) Visa (Subclass 482) allows employers to sponsor overseas workers to fill skill shortages. Requires a nominated occupation on the skilled occupation list. Leads to Permanent Residency (Subclass 186) after 3 years on the medium-term stream.',
    'germany': 'The EU Blue Card allows highly skilled non-EU professionals to work and live in Germany. Requires a university degree, a job offer with minimum salary threshold (€45,300/year for shortage occupations, €50,700/year standard), and recognition of qualifications. Leads to Permanent Settlement (Niederlassungserlaubnis) after 21 months (with B1 German) or 27 months (with A1 German).',
    'uae': 'The UAE Employment Visa allows foreign nationals to work in the UAE under a local sponsor. The visa is valid for 2-3 years and is renewable. Requires a valid employment contract, medical fitness test, and Emirates ID. The 10-Year Golden Visa is available for investors, entrepreneurs, and highly skilled professionals.',
    'singapore': 'The Singapore Employment Pass (EP) allows foreign professionals, managers, and executives to work in Singapore. Requires a job offer with minimum salary of SGD 5,000/month (SGD 6,000 for finance). COMPASS (Complementarity Assessment Framework) assesses applications based on salary, qualifications, and diversity.',
    'netherlands': 'The Netherlands Highly Skilled Migrant (HSM) visa allows skilled workers to work in the Netherlands with a recognized sponsor. Requires a job offer with minimum salary threshold (€5,331/month for 30+ years, €3,909/month for under 30). The 30% tax ruling may apply for highly skilled migrants.',
    'sweden': 'The Sweden Work Permit allows non-EU citizens to work in Sweden for a Swedish employer. Requires a job offer with salary meeting Swedish collective bargaining agreements. The visa is valid for 2 years and renewable. Leads to Permanent Residency after 4 years.',
    'denmark': 'The Denmark Pay Limit Scheme allows highly paid professionals to work in Denmark. Requires a job offer with minimum annual salary of DKK 393,000 (approx. ₹47 Lakhs). The visa is valid for up to 4 years and leads to Permanent Residency after 8 years (or 4 years with supplementary conditions).',
    'ireland': 'The Ireland Critical Skills Employment Permit allows professionals in high-demand occupations to work in Ireland. Requires a job offer with minimum salary of €64,000/year (or €32,000 for shortage occupations). The permit is valid for 2 years and leads to Permanent Residency after 5 years.',
    'new-zealand': 'The New Zealand Essential Skills Work Visa allows employers to hire foreign workers for skill shortages. Requires a job offer with salary meeting median wage ($29.66/hour). The visa is valid for up to 3 years and leads to Permanent Residency through the Skilled Migrant Category (SMC).',
    'saudi-arabia': 'The Saudi Arabia Work Visa allows foreign nationals to work in Saudi Arabia under a local sponsor (Kafil). Requires a valid employment contract, medical test, and MFA/MOFA approval. The visa is valid for 1-2 years and renewable. Iqama (residence permit) is issued upon arrival.',
    'qatar': 'The Qatar Work Visa allows foreign nationals to work in Qatar under a local sponsor. Requires a valid employment contract, medical test, and MOI approval. The visa is valid for 1-3 years and renewable. QID (Qatar ID) is issued upon arrival.',
    'japan': 'The Japan Work Visa (Engineer/Specialist in Humanities) allows professionals to work in Japan. Requires a job offer with a Japanese company and a Certificate of Eligibility (COE). The visa is valid for up to 5 years and renewable. JLPT (Japanese Language Proficiency Test) is recommended but not mandatory for all roles.'
  };

  return map[c] || `The ${country} Work Visa allows international professionals to work in ${country} for an approved employer. You must have a confirmed job offer and meet the eligibility requirements. Please check the official immigration website for current requirements.`;
}

// ── 2. WORK HIGHLIGHTS — FEATURE CARDS ──
export function getWorkHighlights(country: string): WorkHighlightItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, WorkHighlightItem[]> = {
    'uk': [
      { icon: '🎯', title: 'Points-Based System', description: '70 points required for Skilled Worker Visa — job offer, salary, English proficiency, and qualifications.' },
      { icon: '💰', title: 'Salary Threshold', description: 'Minimum £38,700 per year (or going rate for your SOC occupation code).' },
      { icon: '🛂', title: '5-Year Path to ILR', description: 'Indefinite Leave to Remain after 5 years of continuous residence.' },
      { icon: '🏥', title: 'NHS Access', description: 'Pay IHS (Immigration Health Surcharge) for full NHS coverage.' }
    ],
    'usa': [
      { icon: '🎯', title: 'H-1B Specialty Occupation', description: 'Bachelor\'s degree or higher required. Annual cap: 65,000 + 20,000 Masters cap.' },
      { icon: '💰', title: 'Prevailing Wage', description: 'Employer must pay the higher of prevailing wage or actual wage.' },
      { icon: '🔄', title: '6-Year Max Stay', description: 'H-1B max stay is 6 years (extendable beyond 6 years under AC21 with approved I-140).' },
      { icon: '📋', title: 'USCIS Petition', description: 'Employer files Form I-129 petition with USCIS before you can apply for visa.' }
    ],
    'canada': [
      { icon: '🎯', title: 'LMIA or LMIA-Exempt', description: 'Positive LMIA from ESDC required for most work permits.' },
      { icon: '⚡', title: 'Global Talent Stream', description: '2-week processing for tech workers with qualified employers.' },
      { icon: '🔄', title: 'Path to PR', description: 'Work experience in Canada leads to Express Entry or PNP.' },
      { icon: '🏥', title: 'Healthcare Access', description: 'Provincial health coverage available after 3 months of residence.' }
    ],
    'australia': [
      { icon: '🎯', title: 'TSS Visa (Subclass 482)', description: 'Employer-sponsored work visa for skill shortages. Valid for 2-4 years.' },
      { icon: '📋', title: 'Skilled Occupation List', description: 'Occupation must be on the medium-term or short-term list.' },
      { icon: '🔄', title: 'Path to PR', description: 'Subclass 186 Permanent Residency after 3 years on medium-term stream.' },
      { icon: '🏥', title: 'Medicare Access', description: 'Access to Australia\'s public healthcare system for eligible visa holders.' }
    ],
    'germany': [
      { icon: '🎯', title: 'EU Blue Card', description: 'For highly skilled non-EU professionals with university degree and job offer.' },
      { icon: '💰', title: 'Salary Threshold', description: '€45,300/year for shortage occupations, €50,700/year standard.' },
      { icon: '🔄', title: 'Fast-Track PR', description: 'Permanent Settlement in 21 months (with B1 German) or 27 months (with A1 German).' },
      { icon: '🏥', title: 'Health Insurance', description: 'Statutory health insurance (GKV) or comprehensive private insurance required.' }
    ],
    'uae': [
      { icon: '🎯', title: 'Employment Visa', description: 'Valid for 2-3 years under a UAE sponsor. Requires employment contract and medical test.' },
      { icon: '🌟', title: 'Golden Visa', description: '10-Year renewable visa for investors, entrepreneurs, and highly skilled professionals.' },
      { icon: '📋', title: 'Emirates ID', description: 'Mandatory identity card issued upon arrival for all residents.' },
      { icon: '💰', title: 'Tax-Free Income', description: 'Zero income tax in the UAE. 100% salary retention.' }
    ],
    'singapore': [
      { icon: '🎯', title: 'Employment Pass (EP)', description: 'For foreign professionals, managers, and executives. Minimum salary SGD 5,000/month.' },
      { icon: '📋', title: 'COMPASS Framework', description: 'Points-based assessment based on salary, qualifications, and diversity.' },
      { icon: '🔄', title: 'Path to PR', description: 'Eligible for Permanent Residency after 2-5 years of work experience.' },
      { icon: '🏥', title: 'MediShield Life', description: 'Mandatory national health insurance for all residents.' }
    ],
    'netherlands': [
      { icon: '🎯', title: 'Highly Skilled Migrant (HSM)', description: 'For skilled workers with a recognized sponsor. Minimum salary €5,331/month (30+ years).' },
      { icon: '💰', title: '30% Tax Ruling', description: '30% of salary tax-free for 5 years for highly skilled migrants recruited abroad.' },
      { icon: '🔄', title: 'Path to PR', description: 'Permanent Residency after 5 years of continuous work.' },
      { icon: '🏥', title: 'Dutch Health Insurance', description: 'Mandatory private health insurance within 4 months of arrival.' }
    ],
    'sweden': [
      { icon: '🎯', title: 'Work Permit', description: 'Valid for 2 years, renewable. Requires job offer with collective bargaining agreement.' },
      { icon: '🔄', title: 'Path to PR', description: 'Permanent Residency after 4 years of continuous work.' },
      { icon: '🏥', title: 'Public Healthcare', description: 'Access to Sweden\'s public healthcare system with personal number.' },
      { icon: '🌍', title: 'Work-Life Balance', description: 'Sweden offers excellent work-life balance with 25+ days of paid leave.' }
    ],
    'denmark': [
      { icon: '🎯', title: 'Pay Limit Scheme', description: 'Minimum annual salary DKK 393,000 (approx. ₹47 Lakhs).' },
      { icon: '🔄', title: 'Fast-Track PR', description: 'Permanent Residency in 4 years (with supplementary conditions) or 8 years (standard).' },
      { icon: '🏥', title: 'CPR & Yellow Card', description: 'Mandatory registration for national healthcare coverage.' },
      { icon: '🌍', title: 'Work-Life Balance', description: 'Denmark offers 5 weeks of paid leave and flexible work culture.' }
    ],
    'ireland': [
      { icon: '🎯', title: 'Critical Skills Permit', description: 'For high-demand occupations. Minimum salary €64,000/year.' },
      { icon: '🔄', title: 'Path to PR', description: 'Permanent Residency after 5 years of continuous work.' },
      { icon: '🏥', title: 'Public Healthcare', description: 'Access to Ireland\'s public healthcare system with PPS number.' },
      { icon: '🌍', title: 'English-Speaking', description: 'English-speaking country with easy integration for Indian professionals.' }
    ],
    'new-zealand': [
      { icon: '🎯', title: 'Essential Skills Visa', description: 'For skill shortages. Minimum salary $29.66/hour (median wage).' },
      { icon: '🔄', title: 'Path to PR', description: 'Skilled Migrant Category (SMC) points-based system leads to PR.' },
      { icon: '🏥', title: 'Public Healthcare', description: 'Access to New Zealand\'s public healthcare system with visa.' },
      { icon: '🌍', title: 'Work-Life Balance', description: 'New Zealand offers excellent work-life balance and outdoor lifestyle.' }
    ],
    'saudi-arabia': [
      { icon: '🎯', title: 'Work Visa', description: 'Valid for 1-2 years under a local sponsor (Kafil). Requires employment contract.' },
      { icon: '📋', title: 'Iqama (Residence Permit)', description: 'Mandatory ID card issued upon arrival for all residents.' },
      { icon: '💰', title: 'Tax-Free Income', description: 'Zero income tax in Saudi Arabia. 100% salary retention.' },
      { icon: '🕌', title: 'Cultural Experience', description: 'Work in the heart of the Middle East with rich cultural and religious heritage.' }
    ],
    'qatar': [
      { icon: '🎯', title: 'Work Visa', description: 'Valid for 1-3 years under a local sponsor. Requires employment contract.' },
      { icon: '📋', title: 'QID (Qatar ID)', description: 'Mandatory ID card issued upon arrival for all residents.' },
      { icon: '💰', title: 'Tax-Free Income', description: 'Zero income tax in Qatar. 100% salary retention.' },
      { icon: '🌆', title: 'Modern Lifestyle', description: 'Doha offers modern amenities, luxury lifestyle, and diverse expat community.' }
    ],
    'japan': [
      { icon: '🎯', title: 'Engineer/Specialist Visa', description: 'For professionals in engineering, IT, and humanities. Requires COE (Certificate of Eligibility).' },
      { icon: '📋', title: 'Certificate of Eligibility (COE)', description: 'Mandatory document issued by Japanese Immigration before visa application.' },
      { icon: '🔄', title: 'Path to PR', description: 'Permanent Residency after 5 years (or 1 year under Highly Skilled Professional point system).' },
      { icon: '🏥', title: 'National Health Insurance', description: 'Mandatory health insurance for all residents in Japan.' }
    ]
  };

  return map[c] || [
    { icon: '🎯', title: 'Work Visa', description: 'Employment authorization for international professionals.' },
    { icon: '💰', title: 'Salary Threshold', description: 'Minimum salary requirement varies by country and occupation.' },
    { icon: '🔄', title: 'Path to PR', description: 'Work experience leads to permanent residency pathway.' },
    { icon: '📋', title: 'Sponsorship', description: 'Employer sponsorship required for work visa.' }
  ];
}

// ── 3. WORK DOCUMENTS — COUNTRY SPECIFIC ──
export function getWorkDocuments(
  countryOrFrom: string,
  maybeCountry?: string,
  purpose: string = 'Work'
): DocumentRequiredItem[] {
  const target = maybeCountry || countryOrFrom;
  const c = normalizeCountry(target);

  const map: Record<string, DocumentRequiredItem[]> = {
    'uk': [
      { title: 'Valid Passport', description: 'Must be valid for your intended stay with at least 1 blank visa page for stamping.', is_mandatory: true },
      { title: 'Certificate of Sponsorship (CoS)', description: 'Electronic reference number provided by your UK licensed employer confirming job role, SOC code, and salary.', is_mandatory: true },
      { title: 'Proof of English Proficiency', description: 'SELT IELTS/PTE General passed at minimum CEFR B1 level in reading, writing, speaking, and listening.', is_mandatory: true },
      { title: 'Tuberculosis (TB) Test Certificate', description: 'Valid clearance certificate from an authorized IOM/UKVI clinic in your home country (valid for 6 months).', is_mandatory: true },
      { title: 'Criminal Record Certificate (PCC)', description: 'Police Clearance Certificate from your home country (required for healthcare, education, or sensitive occupations).', is_mandatory: false },
      { title: 'Financial Maintenance Proof', description: '£1,270 in bank for 28 consecutive days (unless A-rated sponsor certifies maintenance on CoS).', is_mandatory: true }
    ],
    'usa': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended period of stay with blank visa pages.', is_mandatory: true },
      { title: 'Form I-797 (Notice of Action)', description: 'Original or copy of approved petition from USCIS with valid receipt number.', is_mandatory: true },
      { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation barcode page of completed DS-160 online form.', is_mandatory: true },
      { title: 'Employment Offer Letter & Client Letter', description: 'Detailed job offer letter, certified LCA (Form ETA-9035), and end-client project documentation.', is_mandatory: true },
      { title: 'Educational & Professional Credentials', description: 'Degree evaluations, experience letters, and previous US paystubs/W-2s if applicable.', is_mandatory: true },
      { title: 'Form I-129S & Blanket Notice (L-1 Blanket Only)', description: 'For L-1 Blanket applicants: completed Form I-129S and Form I-797 Blanket approval notice.', is_mandatory: false }
    ],
    'canada': [
      { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages (valid for intended stay duration).', is_mandatory: true },
      { title: 'LMIA Approval / Offer of Employment Number', description: 'Positive Labour Market Impact Assessment (LMIA) from ESDC or LMIA-exempt offer number.', is_mandatory: true },
      { title: 'Signed Employment Contract', description: 'Signed employment agreement with registered Canadian business.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country and all countries resided in 6+ months.', is_mandatory: true },
      { title: 'Educational Credential Assessment (ECA)', description: 'ECA report from WES, CES, or IQAS establishing Canadian equivalency.', is_mandatory: true },
      { title: 'Immigration Medical Exam', description: 'eMedical examination report from an IRCC-approved panel physician.', is_mandatory: true }
    ],
    'australia': [
      { title: 'Valid Passport', description: 'Color scan of bio-data and stamped pages of current passport.', is_mandatory: true },
      { title: 'Positive Skills Assessment', description: 'Official assessment from assessing authority (ACS, Engineers Australia, VETASSESS).', is_mandatory: true },
      { title: 'English Language Competency', description: 'PTE Academic (65+ for Proficient English / 79+ for Superior) or IELTS scorecard.', is_mandatory: true },
      { title: 'Employment Reference & Tax Documents', description: 'Detailed work reference letters, payslips, bank statements, and Form 16 / ITRs.', is_mandatory: true },
      { title: 'National Police Clearance Certificate', description: 'PCC from Regional Passport Office (RPO) and all countries lived in 12+ months.', is_mandatory: true },
      { title: 'HAP ID Medical Clearance', description: 'Health assessment conducted by Bupa Medical Visa Services / designated panel clinics.', is_mandatory: true }
    ],
    'germany': [
      { title: 'Valid Passport', description: 'Current passport with at least 12 months validity and blank visa pages.', is_mandatory: true },
      { title: 'Foreign Degree Recognition (ZAB / Anabin)', description: 'ZAB Statement of Comparability confirming German university degree equivalency.', is_mandatory: true },
      { title: 'German Language Certificate (CEFR A1 / B1)', description: 'Goethe-Institut / telc / TestDaF certificate proving required German language level.', is_mandatory: false },
      { title: 'Employment Contract & Job Description', description: 'Current indefinite employment contract and job description form (Erklärung zum Beschäftigungsverhältnis).', is_mandatory: true },
      { title: 'Statutory Health Insurance', description: 'Statutory (GKV - TK/AOK) or comprehensive private health insurance coverage.', is_mandatory: true },
      { title: 'Proof of Adequate Living Space', description: 'Lease agreement (Mietvertrag) and landlord confirmation (Wohnungsgeberbestätigung).', is_mandatory: true }
    ],
    'uae': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 6 months with clear bio-data pages.', is_mandatory: true },
      { title: 'Employment Contract', description: 'Valid UAE employment contract with minimum monthly salary and job description.', is_mandatory: true },
      { title: 'Medical Fitness Certificate', description: 'Medical test report from an approved UAE health authority (HIV, Hepatitis, TB screening).', is_mandatory: true },
      { title: 'Emirates ID Application', description: 'Application for Emirates ID completed during visa processing.', is_mandatory: true },
      { title: 'Comprehensive UAE Health Insurance', description: 'Valid medical insurance policy covering the visa holder.', is_mandatory: true }
    ],
    'singapore': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with clear bio-data pages.', is_mandatory: true },
      { title: 'MOM Employment Pass Application', description: 'Online application submitted by employer via MOM portal.', is_mandatory: true },
      { title: 'Educational Credentials', description: 'Degree certificates, transcripts, and professional qualifications.', is_mandatory: true },
      { title: 'COMPASS Verification', description: 'COMPASS assessment documents including salary verification and diversity information.', is_mandatory: true },
      { title: 'Employment Contract', description: 'Signed employment contract with salary details and job description.', is_mandatory: true }
    ],
    'netherlands': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond intended stay with 2 blank pages.', is_mandatory: true },
      { title: 'HSM Visa Application Form', description: 'Completed and signed Highly Skilled Migrant visa application form.', is_mandatory: true },
      { title: 'Employment Contract', description: 'Signed employment contract with minimum salary threshold (€5,331/month for 30+ years).', is_mandatory: true },
      { title: 'Educational Qualifications', description: 'Degree certificates and transcripts (must be apostilled and translated).', is_mandatory: true },
      { title: 'Health Insurance', description: 'Comprehensive private health insurance valid in the Netherlands.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true }
    ],
    'sweden': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond intended stay with 2 blank pages.', is_mandatory: true },
      { title: 'Employment Offer', description: 'Job offer with salary meeting Swedish collective bargaining agreements.', is_mandatory: true },
      { title: 'Work Permit Application Form', description: 'Completed online application on Migration Agency portal.', is_mandatory: true },
      { title: 'Union/Employer Statement', description: 'Statement from employer confirming salary and working conditions meet Swedish standards.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true }
    ],
    'denmark': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended stay.', is_mandatory: true },
      { title: 'Signed Danish Employment Contract', description: 'Detailed job contract with salary (min DKK 393,000/year) and working conditions.', is_mandatory: true },
      { title: 'SIRI Case Order ID & Fee Payment', description: 'Payment receipt for SIRI fee (approx. 4,800 DKK).', is_mandatory: true },
      { title: 'ApplyVisa Embassy Fee Receipt', description: 'Payment receipt for Danish Embassy consular processing (1,710 DKK).', is_mandatory: true },
      { title: 'Educational Degrees & Credentials', description: 'Apostilled degree certificates, transcripts, and professional authorization.', is_mandatory: true },
      { title: 'Health Insurance', description: 'Comprehensive health insurance valid in Denmark.', is_mandatory: true }
    ],
    'ireland': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay with 2 blank visa pages.', is_mandatory: true },
      { title: 'Critical Skills Employment Permit', description: 'Approved permit from DETE (Department of Enterprise, Trade and Employment).', is_mandatory: true },
      { title: 'Employment Contract', description: 'Signed employment contract with salary (min €64,000/year or €32,000 for shortage occupations).', is_mandatory: true },
      { title: 'AVATS Application Summary', description: 'Printed and signed AVATS application summary from visas.inis.gov.ie/avats.', is_mandatory: true },
      { title: 'Educational Credentials', description: 'Degree certificates and transcripts.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true }
    ],
    'new-zealand': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay.', is_mandatory: true },
      { title: 'Employment Offer', description: 'Job offer with salary meeting median wage ($29.66/hour).', is_mandatory: true },
      { title: 'Skills Assessment', description: 'NZQA International Qualifications Assessment (IQA) confirming qualification equivalency.', is_mandatory: true },
      { title: 'English Language Competency', description: 'IELTS General Training (6.5+) or PTE Academic (58+) scorecard.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true },
      { title: 'INZ 1007 General Medical Certificate', description: 'eMedical panel physician medical and chest X-ray certificate.', is_mandatory: true }
    ],
    'saudi-arabia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Employment Contract', description: 'Signed employment contract with salary and job description.', is_mandatory: true },
      { title: 'Medical Fitness Certificate', description: 'Medical test from an approved Saudi health authority.', is_mandatory: true },
      { title: 'MFA/MOFA Approval', description: 'Approval from Ministry of Foreign Affairs (MFA) and Ministry of Labor (MOFA).', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true }
    ],
    'qatar': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Employment Contract', description: 'Signed employment contract with salary and job description.', is_mandatory: true },
      { title: 'Medical Fitness Certificate', description: 'Medical test from an approved Qatar health authority.', is_mandatory: true },
      { title: 'MOI Approval', description: 'Approval from Ministry of Interior (MOI).', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true }
    ],
    'japan': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Certificate of Eligibility (COE)', description: 'Issued by Japanese Immigration before visa application.', is_mandatory: true },
      { title: 'Visa Application Form', description: 'Completed visa application form with photo.', is_mandatory: true },
      { title: 'Employment Offer Letter', description: 'Job offer letter from Japanese company.', is_mandatory: true },
      { title: 'Educational Credentials', description: 'Degree certificates and transcripts (translated to Japanese or English).', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true }
    ]
  };

  const defaultDocs = [
    { title: 'Valid Passport', description: `Valid for at least 6 months beyond intended stay with 2 blank visa pages for entry into ${target}.`, is_mandatory: true },
    { title: 'Employment Offer Letter', description: 'Official job offer from a registered employer with salary and job description.', is_mandatory: true },
    { title: 'Visa Application Form', description: 'Completed and signed visa application form.', is_mandatory: true },
    { title: 'Educational Qualifications', description: 'Degree certificates, transcripts, and professional credentials.', is_mandatory: true },
    { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from your home country.', is_mandatory: true },
    { title: 'Health Insurance', description: 'Comprehensive health insurance covering the duration of stay.', is_mandatory: true }
  ];

  return map[c] || defaultDocs;
}

// ── 4. WORK STEPS — COUNTRY SPECIFIC ──
export function getWorkSteps(countryOrFrom: string, maybeCountry?: string, _purpose?: string): string[] {
  const target = maybeCountry || countryOrFrom;
  const c = normalizeCountry(target);

  const map: Record<string, string[]> = {
    'uk': [
      'Step 1: Secure Job Offer — Find a licensed UK Home Office sponsor and secure a job offer meeting the skill and salary requirements (£38,700 or going rate).',
      'Step 2: Obtain Certificate of Sponsorship (CoS) — Your employer assigns a CoS reference number. This is mandatory for visa application.',
      'Step 3: Meet English Language Requirement — Pass a SELT (IELTS for UKVI / PTE) at CEFR B1 level in reading, writing, speaking, and listening.',
      'Step 4: Pass TB Test — Complete a TB screening test at an authorized UKVI clinic in India (valid for 6 months).',
      'Step 5: Complete Online Visa Application — Fill the Skilled Worker visa application on GOV.UK with your CoS reference number.',
      'Step 6: Pay Visa Fee & IHS — Pay the visa fee (£719-£1,420) and Immigration Health Surcharge (£1,035/year).',
      'Step 7: Attend Biometrics — Book and attend a VFS Global UK Visa Application Centre appointment for biometric enrollment.',
      'Step 8: Receive Visa & Plan Travel — Receive your visa decision (3 weeks standard). Travel to the UK with your 90-day entry vignette.'
    ],
    'usa': [
      'Step 1: Secure Job Offer — Find a US employer willing to sponsor your H-1B petition. The employer files the petition with USCIS.',
      'Step 2: Employer Files LCA & I-129 — Employer files Labor Condition Application (LCA) with DOL and Form I-129 petition with USCIS.',
      'Step 3: Wait for H-1B Lottery — H-1B is subject to annual cap (65,000 + 20,000 Masters cap). Lottery is conducted each March for October start.',
      'Step 4: Receive Approved I-797 Notice — USCIS sends Form I-797 Notice of Action to your employer. This is mandatory for visa application.',
      'Step 5: Complete DS-160 & Schedule Interview — Complete DS-160 online and schedule VAC Biometrics + Consular Interview.',
      'Step 6: Attend VAC Biometrics — Submit fingerprints and photo at the Visa Application Center.',
      'Step 7: Attend Consular Interview — Attend interview at US Embassy/Consulate with I-797, DS-160, and supporting documents.',
      'Step 8: Receive Visa & Plan Travel — Receive H-1B visa stamp (valid up to 3 years). Travel to the US up to 10 days before petition start date.'
    ],
    'canada': [
      'Step 1: Secure Job Offer — Find a Canadian employer willing to sponsor your work permit application.',
      'Step 2: Obtain LMIA (if required) — Employer applies for Labour Market Impact Assessment (LMIA) from ESDC (processing: 2-4 weeks).',
      'Step 3: Complete Online Application — Apply for Work Permit on IRCC portal with job offer, LMIA (or LMIA-exempt offer), and supporting documents.',
      'Step 4: Pay Fees — Pay CAD 155 work permit fee + CAD 85 biometrics fee online.',
      'Step 5: Attend Biometrics — Book and attend VFS Global Canada Visa Application Centre for biometric enrollment.',
      'Step 6: Submit Passport — Upon approval, submit passport to VFS for visa counterfoil stamping.',
      'Step 7: Receive Visa & Plan Travel — Receive Work Permit approval and Port of Entry (POE) Letter of Introduction. Travel to Canada.'
    ],
    'australia': [
      'Step 1: Secure Job Offer — Find an Australian employer willing to sponsor your TSS visa (Subclass 482).',
      'Step 2: Skills Assessment — Complete a positive skills assessment from the relevant assessing authority (ACS, Engineers Australia, VETASSESS).',
      'Step 3: Employer Nominates You — Employer submits nomination application on ImmiAccount with job offer, sponsorship details, and Labour Market Testing (LMT) evidence.',
      'Step 4: Complete Visa Application — Lodge your TSS visa application on ImmiAccount with skills assessment, English test, and supporting documents.',
      'Step 5: Pay Visa Fee — Pay the visa application charge (AUD 2,685+ depending on stream).',
      'Step 6: Health & Biometrics — Complete health examination (HAP ID) and attend biometrics at VFS Global ABCC.',
      'Step 7: Receive Visa & Plan Travel — Receive visa grant notification. Travel to Australia. Valid for 2-4 years.'
    ],
    'germany': [
      'Step 1: Secure Job Offer — Find a German employer offering a job with minimum salary threshold (€45,300/year for shortage occupations, €50,700/year standard).',
      'Step 2: Qualification Recognition — Obtain ZAB Statement of Comparability confirming your degree is equivalent to a German university degree.',
      'Step 3: Complete VIDEX Application — Fill the National Visa (Type D) application on VIDEX and schedule an appointment at the German Embassy/VFS.',
      'Step 4: Attend Visa Interview — Submit your dossier at the German Embassy/VFS with employment contract, qualification recognition, and health insurance.',
      'Step 5: Receive Visa & Plan Travel — Receive your National Visa (Type D). Travel to Germany.',
      'Step 6: Register Address — Register your residence (Anmeldung) at Bürgeramt within 14 days of arrival.',
      'Step 7: Apply for EU Blue Card — At the Ausländerbehörde, apply for the electronic EU Blue Card (Aufenthaltstitel).',
      'Step 8: Path to PR — Permanent Settlement after 21 months (with B1 German) or 27 months (with A1 German).'
    ],
    'uae': [
      'Step 1: Secure Job Offer — Find a UAE employer willing to sponsor your employment visa.',
      'Step 2: Employer Files for Work Permit — Employer applies for work permit approval from Ministry of Human Resources and Emiratisation (MOHRE).',
      'Step 3: Medical Fitness Test — Complete medical screening (HIV, Hepatitis, TB) at an approved UAE health authority.',
      'Step 4: Complete Visa Application — Apply for employment visa through ICP/GDRFA with passport, employment contract, and medical report.',
      'Step 5: Receive Entry Permit — Receive entry permit (valid for 60 days) to enter the UAE.',
      'Step 6: Travel to UAE & Stamp Residence — Enter the UAE, complete Emirates ID biometrics, and receive residence visa stamp.',
      'Step 7: Receive Emirates ID — Receive your Emirates ID card (valid for 2-3 years). Start working legally.'
    ],
    'singapore': [
      'Step 1: Secure Job Offer — Find a Singapore employer willing to sponsor your Employment Pass.',
      'Step 2: Employer Submits EP Application — Employer submits Employment Pass application via MOM portal with salary details and qualifications.',
      'Step 3: COMPASS Assessment — Application undergoes COMPASS (Complementarity Assessment Framework) evaluation (scores based on salary, qualifications, and diversity).',
      'Step 4: Receive In-Principle Approval (IPA) — MOM issues IPA letter (valid for 6 months). This is mandatory for entry.',
      'Step 5: Submit SGAC & Travel to Singapore — Complete SG Arrival Card online and travel to Singapore with IPA letter.',
      'Step 6: Clear Immigration — Present IPA letter at Changi Airport. Receive 30-day social visit pass while EP card is processed.',
      'Step 7: Receive EP Card — Register biometrics at MOM and receive your Employment Pass card. Start working.'
    ],
    'netherlands': [
      'Step 1: Secure Job Offer — Find a recognized sponsor offering a job with minimum salary threshold (€5,331/month for 30+ years).',
      'Step 2: Employer Files HSM Application — Employer submits Highly Skilled Migrant visa application on your behalf.',
      'Step 3: Complete Visa Application — Complete the MVV entry visa application at the Dutch Embassy/VFS with employment contract and passport.',
      'Step 4: Receive MVV & Plan Travel — Receive your MVV entry visa. Travel to the Netherlands.',
      'Step 5: Register at Municipality — Register your address at the municipality (Basisregistratie Personen - BRP) within 5 days of arrival.',
      'Step 6: Apply for Residence Permit — Apply for your residence permit at IND (Immigration and Naturalisation Service).',
      'Step 7: Receive Residence Card — Receive your Dutch residence card. Start working.'
    ],
    'sweden': [
      'Step 1: Secure Job Offer — Find a Swedish employer willing to sponsor your work permit.',
      'Step 2: Employer Files Application — Employer and employee jointly submit work permit application on Migration Agency portal.',
      'Step 3: Complete Visa Application — Complete the Work Permit application with employment contract, passport, and PCC.',
      'Step 4: Attend Interview (if required) — Attend interview at Swedish Embassy or Consulate.',
      'Step 5: Receive Visa & Plan Travel — Receive work permit approval. Travel to Sweden.',
      'Step 6: Register at Tax Agency — Register with the Swedish Tax Agency (Skatteverket) for personal number (Personnummer).',
      'Step 7: Receive Residence Card — Receive your residence permit card. Start working.'
    ],
    'denmark': [
      'Step 1: Secure Job Offer — Find a Danish employer offering a job with minimum annual salary of DKK 393,000 (approx. ₹47 Lakhs).',
      'Step 2: Employer Files SIRI Application — Employer creates Case Order ID and submits Part 1 of the application on nyidanmark.dk.',
      'Step 3: Employee Completes Application — Complete Part 2 of the application with passport details and employment contract.',
      'Step 4: Pay Fees & Biometrics — Pay SIRI fee (4,800-5,200 DKK) and Embassy fee (1,710 DKK). Book VFS biometrics within 14 days.',
      'Step 5: Attend Biometrics — Submit biometrics at VFS Global Denmark within 14 calendar days.',
      'Step 6: Receive Visa & Plan Travel — Receive approval. Travel to Denmark.',
      'Step 7: Register CPR & Yellow Card — Register your address at Citizen Service (Borgerservice) for CPR number and healthcare access.'
    ],
    'ireland': [
      'Step 1: Secure Job Offer — Find an Irish employer willing to sponsor your Critical Skills Employment Permit.',
      'Step 2: Employer Files for Permit — Employer applies for Critical Skills Employment Permit from DETE (Department of Enterprise, Trade and Employment).',
      'Step 3: Receive Approved Permit — Receive approved permit from DETE. This is mandatory for visa application.',
      'Step 4: Complete AVATS Application — Complete online visa application on AVATS (visas.inis.gov.ie/avats).',
      'Step 5: Pay Visa Fee & Biometrics — Pay visa fee and attend VFS Global Ireland for biometrics.',
      'Step 6: Receive Visa & Plan Travel — Receive visa decision. Travel to Ireland.',
      'Step 7: Register IRP (Stamp 1) — Register with ISD/Garda within 90 days of arrival. Receive Irish Residence Permit (IRP Stamp 1).'
    ],
    'new-zealand': [
      'Step 1: Secure Job Offer — Find a New Zealand employer offering a job with salary meeting median wage ($29.66/hour).',
      'Step 2: Skills Assessment — Complete NZQA International Qualifications Assessment (IQA).',
      'Step 3: Complete Visa Application — Apply for Essential Skills Work Visa on Immigration New Zealand portal.',
      'Step 4: Health & Biometrics — Complete medical examination (INZ 1007) and biometrics at VFS Global.',
      'Step 5: Receive Visa & Plan Travel — Receive work visa approval. Travel to New Zealand.'
    ],
    'saudi-arabia': [
      'Step 1: Secure Job Offer — Find a Saudi employer willing to sponsor your work visa.',
      'Step 2: Employer Files for Work Permit — Employer applies for work permit approval from Ministry of Labor (MOFA).',
      'Step 3: Medical Fitness Test — Complete medical screening at an approved Saudi health authority.',
      'Step 4: Complete Visa Application — Apply for work visa at Saudi Embassy/VFS with employment contract and medical report.',
      'Step 5: Receive Visa & Plan Travel — Receive work visa. Travel to Saudi Arabia.',
      'Step 6: Complete Iqama Registration — Complete medical test and biometrics in Saudi Arabia. Receive Iqama (residence permit).'
    ],
    'qatar': [
      'Step 1: Secure Job Offer — Find a Qatari employer willing to sponsor your work visa.',
      'Step 2: Employer Files for Work Permit — Employer applies for work permit approval from Ministry of Interior (MOI).',
      'Step 3: Medical Fitness Test — Complete medical screening at an approved Qatar health authority.',
      'Step 4: Complete Visa Application — Apply for work visa at Qatar Embassy/VFS with employment contract and medical report.',
      'Step 5: Receive Visa & Plan Travel — Receive work visa. Travel to Qatar.',
      'Step 6: Complete QID Registration — Complete medical test and biometrics in Qatar. Receive QID (Qatar ID).'
    ],
    'japan': [
      'Step 1: Secure Job Offer — Find a Japanese employer willing to sponsor your work visa.',
      'Step 2: Employer Files for COE — Employer applies for Certificate of Eligibility (COE) from Japanese Immigration.',
      'Step 3: Receive COE — Receive COE from Japanese Immigration. This is mandatory for visa application.',
      'Step 4: Complete Visa Application — Apply for work visa at Japanese Embassy/VFS with COE and supporting documents.',
      'Step 5: Receive Visa & Plan Travel — Receive work visa. Travel to Japan.',
      'Step 6: Register at Municipal Office — Register your address at the municipal office within 14 days of arrival.',
      'Step 7: Receive Residence Card — Receive your Residence Card (Zairyu Card). Start working.'
    ]
  };

  const defaultSteps = [
    `Step 1: Secure Job Offer — Find an employer in ${target} willing to sponsor your work visa.`,
    'Step 2: Obtain Sponsorship — Employer applies for work permit or sponsorship approval.',
    'Step 3: Meet Requirements — Check qualifications, experience, and language requirements.',
    'Step 4: Complete Visa Application — Apply for work visa with employment contract and supporting documents.',
    'Step 5: Pay Visa Fees — Pay the applicable consular visa fee and VAC service charges.',
    'Step 6: Attend Biometrics (if required) — Complete biometric enrollment at the designated Visa Application Center.',
    `Step 7: Receive Visa & Plan Travel — Receive visa approval. Travel to ${target} and start work.`
  ];

  return map[c] || defaultSteps;
}

export const getWorkVisaSteps = getWorkSteps;

// ── 5. WORK FEES — COUNTRY SPECIFIC ──
export function getWorkFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  const map: Record<string, { visa_fee: string; service_fee: string; total_fee: string; notes: string }> = {
    'uk': {
      visa_fee: '£719 – £1,420 (depending on 3 vs 5 year duration)',
      service_fee: '£1,035 / year (IHS Healthcare Surcharge)',
      total_fee: '£1,754+ Total Reference',
      notes: 'Payable online at official UKVI portal. Reduced fees for Shortage/Health & Care roles. Priority service available: +£500 (5 days) / +£1,000 (24 hours).'
    },
    'usa': {
      visa_fee: '205 USD (MRV Application Fee)',
      service_fee: '500 USD (Fraud Prevention Fee — ONLY for L-1 Blanket Applicants)',
      total_fee: '205 USD (Standard H-1B / Individual L-1) | 705 USD (L-1 Blanket)',
      notes: 'Standard MRV fee (205 USD) paid online via usvisascheduling.com. L-1 Blanket applicants pay an additional 500 USD Fraud Fee at the embassy cashier. Excludes USCIS employer filing fees.'
    },
    'canada': {
      visa_fee: 'CAD 155 (Work Permit Fee)',
      service_fee: 'CAD 85 (Biometrics Fee)',
      total_fee: 'CAD 240 Total Reference',
      notes: 'Paid online via IRCC portal. LMIA fee may apply (CAD 1,000) paid by employer. Additional fees for dependents.'
    },
    'australia': {
      visa_fee: 'AUD 2,685+ (TSS Visa Subclass 482)',
      service_fee: 'AUD 1,500 (Skills Assessment Fee)',
      total_fee: 'AUD 4,185+ Total Reference',
      notes: 'Paid online via ImmiAccount. Excludes English test and medical exam fees. Fees vary by stream (Short-term: AUD 2,685, Medium-term: AUD 3,045).'
    },
    'germany': {
      visa_fee: '75 EUR (National Visa Type D)',
      service_fee: '200 EUR (ZAB Degree Statement of Comparability)',
      total_fee: '275 EUR Government Immigration Fee',
      notes: 'Payable in EUR/INR at German Embassy and Ausländerbehörde upon application. EU Blue Card issuance fee: 100-200 EUR.'
    },
    'uae': {
      visa_fee: '2,800 AED – 3,800 AED (approx. 760 USD – 1,030 USD)',
      service_fee: '1,050 AED (Emirates ID 10-Year Issuance Fee)',
      total_fee: '3,850 AED Total Official Government Fee',
      notes: 'Paid online directly through official ICP / GDRFA Dubai portals. Includes medical test and Emirates ID fees.'
    },
    'singapore': {
      visa_fee: 'SGD 105 (MOM Application Fee)',
      service_fee: 'SGD 225 (Pass Issuance Fee)',
      total_fee: 'SGD 330 Total Reference',
      notes: 'Paid by employer. COMPASS assessment fee included. Additional fees for dependents.'
    },
    'netherlands': {
      visa_fee: '€210 (MVV + Residence Permit)',
      service_fee: 'Payable at VFS Global',
      total_fee: '€210 Total Reference',
      notes: 'Paid online via IND portal. Employer sponsorship fee may apply. Additional fees for dependents.'
    },
    'sweden': {
      visa_fee: 'SEK 2,000 (approx. ₹16,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: 'SEK 2,000 Total Reference',
      notes: 'Paid online via Migration Agency portal. Additional fees for dependents.'
    },
    'denmark': {
      visa_fee: '4,800 – 5,200 DKK (SIRI) + 1,710 DKK (Embassy ApplyVisa)',
      service_fee: '₹1,800 – ₹2,500 (VFS Biometrics)',
      total_fee: 'Approx. 6,510 – 6,910 DKK (₹78,000–₹83,000 INR)',
      notes: 'Official SIRI and MFA government fees. Paid online on nyidanmark.dk and applyvisa.um.dk.'
    },
    'ireland': {
      visa_fee: '€60 Single Entry (approx. ₹5,400) / €100 Multiple Entry (approx. ₹9,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: '€60 - €100 Official Fee + VFS Logistics',
      notes: 'Payable at VFS Global Ireland Visa Application Centre. Critical Skills Permit fee: €1,000 (paid by employer).'
    },
    'new-zealand': {
      visa_fee: 'NZD 4,890 (SMC Application & Immigration Levy)',
      service_fee: '450 NZD (NZQA IQA Evaluation)',
      total_fee: '4,890 NZD Official Government Fee',
      notes: 'Paid online via Immigration Online portal. Excludes medical exam and English test charges.'
    },
    'saudi-arabia': {
      visa_fee: 'SAR 1,000 – 2,000 (approx. ₹22,000 – ₹44,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: 'SAR 1,000 – 2,000 Total Reference',
      notes: 'Paid online via MOFA portal. Iqama issuance fee extra. Additional fees for dependents.'
    },
    'qatar': {
      visa_fee: 'QAR 500 – 1,000 (approx. ₹11,000 – ₹22,000)',
      service_fee: 'Payable at VFS Global',
      total_fee: 'QAR 500 – 1,000 Total Reference',
      notes: 'Paid online via MOI portal. QID issuance fee extra. Additional fees for dependents.'
    },
    'japan': {
      visa_fee: '3,000 JPY (approx. ₹1,700)',
      service_fee: 'Payable at VFS Global',
      total_fee: '3,000 JPY Total Reference',
      notes: 'Paid at Japanese Embassy/VFS. COE application fee paid by employer. Additional fees for dependents.'
    }
  };

  return map[c] || {
    visa_fee: 'Official Statutory Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Check official immigration website for current fees. Employer may cover application costs.'
  };
}

// ── 6. WORK PROCESSING TIME — COUNTRY SPECIFIC ──
export function getWorkProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Standard 3 weeks (15 working days). Priority: 5 working days (+£500). Super Priority: 24 hours (+£1,000).',
    'usa': 'Consular Decision: Verbal at interview. Passport dispatch: 3-5 business days. USCIS petition: 2-6 months (H-1B lottery in March for October start).',
    'canada': '6-12 weeks (Standard). Global Talent Stream: 2 weeks. Work Permit processing varies by country (India: 8-12 weeks).',
    'australia': '4-8 weeks (TSS Visa Subclass 482). Skills assessment: 4-8 weeks. Nomination: 2-4 weeks. Total: 3-5 months.',
    'germany': '4-8 weeks (German Mission Review). EU Blue Card: 2-4 weeks after application. Ausländerbehörde: 4-8 weeks after arrival.',
    'uae': '7-14 working days (Standard). Medical test: 2-3 days. Emirates ID: 7-10 working days. Total: 2-3 weeks.',
    'singapore': '10-20 working days (MOM Portal). COMPASS assessment: 1-2 weeks. Total: 3-4 weeks.',
    'netherlands': '2-4 weeks (IND Standard). MVV entry visa: 2-4 weeks. Residence permit: 4-8 weeks after arrival.',
    'sweden': '2-4 months (Migration Agency SLA). Work Permit: 2-4 months. Fast-track available for certain employers.',
    'denmark': '30-45 calendar days (SIRI Standard). Fast-track (certified employers): 10 days. Biometrics required within 14 days.',
    'ireland': '6-8 weeks (20-25 working days). Critical Skills Permit: 2-4 weeks. AVATS visa: 6-8 weeks. Total: 3-4 months.',
    'new-zealand': '4-8 weeks (INZ Standard). Skills Assessment: 4-6 weeks. Total: 3-5 months.',
    'saudi-arabia': '4-8 weeks (Standard). MOFA/MOHRE approval: 2-4 weeks. Embassy processing: 2-4 weeks.',
    'qatar': '4-8 weeks (Standard). MOI approval: 2-4 weeks. Embassy processing: 2-4 weeks.',
    'japan': '4-8 weeks (Standard). COE processing: 2-4 weeks. Embassy processing: 2-4 weeks.'
  };

  return map[c] || 'Per Official Consular SLA. Apply at least 3-4 months before planned start date.';
}

// ── 7. WORK PROCESSING DETAILS ──
export function getWorkProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Apply at least 3 months before start date. CoS valid for 6 months. Priority services available for faster processing.',
    'usa': 'H-1B lottery in March for October start. Apply up to 90 days before petition start date. USCIS petition takes 2-6 months.',
    'canada': 'Apply at least 3-4 months before start date. Global Talent Stream offers 2-week processing for tech workers.',
    'australia': 'Apply at least 3-4 months before start date. Skills assessment must be valid at time of application.',
    'germany': 'Apply at least 3-4 months before start date. Degree recognition (ZAB) takes 4-8 weeks. EU Blue Card issued upon arrival.',
    'uae': 'Apply 7-14 working days. Medical test and Emirates ID processing included in timeline.',
    'singapore': 'Apply 3-4 weeks before start date. COMPASS assessment takes 1-2 weeks. IPA valid for 6 months.',
    'netherlands': 'Apply at least 2-3 months before start date. MVV entry visa valid for 90 days. Residence permit issued upon arrival.',
    'sweden': 'Apply at least 3-4 months before start date. Fast-track available for certain employers.',
    'denmark': 'Apply at least 2-3 months before start date. Biometrics required within 14 days of application.',
    'ireland': 'Apply at least 3-4 months before start date. Critical Skills Permit takes 2-4 weeks. AVATS visa takes 6-8 weeks.',
    'new-zealand': 'Apply at least 3-4 months before start date. Skills assessment takes 4-6 weeks.',
    'saudi-arabia': 'Apply at least 2-3 months before start date. MOFA/MOHRE approval takes 2-4 weeks.',
    'qatar': 'Apply at least 2-3 months before start date. MOI approval takes 2-4 weeks.',
    'japan': 'Apply at least 2-3 months before start date. COE takes 2-4 weeks. Embassy processing takes 2-4 weeks.'
  };

  return map[c] || 'Apply at least 3-4 months before planned start date. Check official website for current processing times.';
}

// ── 8. WORK REQUIREMENTS — COUNTRY SPECIFIC ──
export function getWorkRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, OtherRequirementItem[]> = {
    'uk': [
      { category: 'Salary Threshold', details: 'Minimum £38,700 per year (or going rate for your SOC occupation code). Reduced salary for shortage occupations.' },
      { category: 'Certificate of Sponsorship (CoS)', details: 'Mandatory electronic reference from a licensed UK employer. CoS must be valid for visa application.' },
      { category: 'English Proficiency', details: 'CEFR B1 level in reading, writing, speaking, and listening (IELTS for UKVI / PTE).' },
      { category: 'TB Test', details: 'Mandatory TB test from an authorized UKVI clinic for Indian passport holders (valid for 6 months).' },
      { category: 'Immigration Health Surcharge', details: 'Mandatory IHS payment of £1,035/year for NHS access. Paid online during visa application.' }
    ],
    'usa': [
      { category: 'H-1B Cap & Lottery', details: 'Annual cap: 65,000 + 20,000 Masters cap. Lottery conducted each March for October start.' },
      { category: 'USCIS Petition', details: 'Employer files Form I-129 petition with USCIS. Must receive I-797 approval before visa application.' },
      { category: 'Specialty Occupation', details: 'Job must require a bachelor\'s degree or higher in a specific field of study.' },
      { category: 'Prevailing Wage', details: 'Employer must pay the higher of prevailing wage or actual wage (LCA certified).' },
      { category: '6-Year Max Stay', details: 'H-1B max stay is 6 years. Extendable beyond 6 years under AC21 with approved I-140.' }
    ],
    'canada': [
      { category: 'LMIA or LMIA-Exempt', details: 'Positive Labour Market Impact Assessment (LMIA) from ESDC required for most work permits.' },
      { category: 'Job Offer', details: 'Must have a valid job offer from a Canadian employer with specific job duties and salary.' },
      { category: 'Educational Credential Assessment (ECA)', details: 'ECA report from WES, CES, or IQAS establishing Canadian equivalency.' },
      { category: 'Global Talent Stream', details: '2-week processing for tech workers with qualified employers. Must meet salary and skill requirements.' }
    ],
    'australia': [
      { category: 'Skilled Occupation List', details: 'Occupation must be on the medium-term or short-term skilled occupation list.' },
      { category: 'Skills Assessment', details: 'Positive skills assessment from the relevant assessing authority (ACS, Engineers Australia, VETASSESS).' },
      { category: 'English Proficiency', details: 'PTE Academic (65+ for Proficient English / 79+ for Superior) or IELTS scorecard.' },
      { category: 'Labour Market Testing (LMT)', details: 'Employer must demonstrate that the position cannot be filled locally (LMT evidence required).' },
      { category: 'Path to PR', details: 'Subclass 186 Permanent Residency after 3 years on medium-term stream.' }
    ],
    'germany': [
      { category: 'EU Blue Card Salary Threshold', details: 'Minimum €45,300/year for shortage occupations, €50,700/year standard.' },
      { category: 'Degree Recognition', details: 'ZAB Statement of Comparability confirming German university degree equivalency.' },
      { category: 'Fast-Track PR', details: 'Permanent Settlement in 21 months (with B1 German) or 27 months (with A1 German).' },
      { category: 'Health Insurance', details: 'Statutory health insurance (GKV) or comprehensive private insurance required.' },
      { category: 'Statutory Pension', details: 'Mandatory pension contributions (Rentenversicherung) for settlement eligibility.' }
    ],
    'uae': [
      { category: 'Sponsor Requirement', details: 'Must have a local UAE sponsor (employer) to obtain employment visa.' },
      { category: 'Medical Fitness', details: 'Mandatory medical test (HIV, Hepatitis, TB) at an approved UAE health authority.' },
      { category: 'Golden Visa', details: '10-Year renewable visa for investors, entrepreneurs, and highly skilled professionals with 30,000 AED/month salary.' },
      { category: 'Emirates ID', details: 'Mandatory identity card for all residents. Required for banking, healthcare, and government services.' }
    ],
    'singapore': [
      { category: 'COMPASS Framework', details: 'Points-based assessment based on salary, qualifications, and diversity. Minimum score: 40 points.' },
      { category: 'Salary Threshold', details: 'Minimum SGD 5,000/month (SGD 6,000 for finance). Higher salary improves COMPASS score.' },
      { category: 'Qualification Requirement', details: 'Bachelor\'s degree or higher from an accredited institution. Professional qualifications may be accepted.' },
      { category: 'Path to PR', details: 'Eligible for Permanent Residency after 2-5 years of work experience in Singapore.' }
    ],
    'netherlands': [
      { category: 'Recognized Sponsor', details: 'Employer must be a recognized sponsor by IND (Immigration and Naturalisation Service).' },
      { category: 'Salary Threshold', details: '€5,331/month for 30+ years, €3,909/month for under 30. Reduced threshold for graduates.' },
      { category: '30% Tax Ruling', details: '30% of salary tax-free for 5 years for highly skilled migrants recruited abroad. Must meet salary threshold.' },
      { category: 'Path to PR', details: 'Permanent Residency after 5 years of continuous work with a valid residence permit.' }
    ]
  };

  const defaultRequirements: OtherRequirementItem[] = [
    { category: 'Valid Job Offer', details: 'Must have a confirmed job offer from a registered employer.' },
    { category: 'Employer Sponsorship', details: 'Employer must be willing to sponsor your work visa and pay applicable fees.' },
    { category: 'Qualifications & Experience', details: 'Must meet the qualification and experience requirements for the role.' },
    { category: 'Work Rights', details: 'Must comply with work conditions including hours, employer, and location restrictions.' }
  ];

  return map[c] || defaultRequirements;
}

// ── 9. WORK FINANCIAL PROOFS ──
export function getWorkFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FinancialProofItem[]> = {
    'uk': [
      { type: 'Maintenance Funds', minimum_balance_or_amount: '£1,270 in personal bank account', time_frame: 'Held for 28 consecutive days', notes: 'Exempt if A-rated sponsor certifies maintenance on Certificate of Sponsorship.' }
    ],
    'usa': [
      { type: 'Proof of Salary / LCA Wage', minimum_balance_or_amount: 'Prevailing wage as stipulated in certified LCA', time_frame: 'Upon commencement of employment', notes: 'Employer must pay the prevailing wage. Previous W-2s/paystubs required for renewals.' }
    ],
    'canada': [
      { type: 'Settlement Funds', minimum_balance_or_amount: 'CAD $2,500 to $5,000 recommended', time_frame: 'Recent 3-6 months bank statement', notes: 'Sufficient funds to establish residence until first salary payment.' }
    ],
    'australia': [
      { type: 'Salary & Settlement', minimum_balance_or_amount: 'TSMIT compliant (min. AUD 70,000/yr)', time_frame: 'Employment contract', notes: 'Temporary Skilled Migration Income Threshold (TSMIT) guaranteed by employer.' }
    ],
    'germany': [
      { type: 'Statutory Salary Proof', minimum_balance_or_amount: 'Min. €45,300/yr (shortage) / €50,700/yr (standard)', time_frame: 'Employment contract', notes: 'Binding job contract with gross annual remuneration fulfilling EU Blue Card threshold.' }
    ],
    'uae': [
      { type: 'Contracted Monthly Remuneration', minimum_balance_or_amount: 'As per MOHRE approved employment contract', time_frame: 'Monthly WPS bank transfer', notes: 'Wages Protection System (WPS) ensures electronic salary disbursement.' }
    ],
    'singapore': [
      { type: 'Monthly Fixed Remuneration', minimum_balance_or_amount: 'Min. SGD 5,000/mo (SGD 6,000 for financial services)', time_frame: 'Monthly payroll', notes: 'Qualifying salary increases progressively with age up to age 45.' }
    ],
    'netherlands': [
      { type: 'Statutory Monthly Gross', minimum_balance_or_amount: '€5,331/mo (30+) / €3,909/mo (<30)', time_frame: 'Monthly salary slip', notes: 'Excludes 8% holiday allowance. Must meet IND highly skilled migrant wage criteria.' }
    ]
  };

  const defaultFinancial: FinancialProofItem[] = [
    { type: 'Salary / Employment Contract', minimum_balance_or_amount: 'Sufficient to meet local living standards', time_frame: 'Monthly salary', notes: 'Guaranteed wage from registered employer covering living expenses.' }
  ];

  return map[c] || defaultFinancial;
}

// ── 10. WORK FAQ — COUNTRY SPECIFIC ──
export function getWorkFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FAQItem[]> = {
    'uk': [
      { question: 'What is the minimum salary for UK Skilled Worker Visa?', answer: 'The minimum salary is £38,700 per year or the going rate for your SOC occupation code, whichever is higher. Reduced rates apply for shortage occupations and new entrants.' },
      { question: 'What is the Certificate of Sponsorship (CoS)?', answer: 'A CoS is an electronic reference number provided by your UK licensed employer. It confirms your job offer, SOC code, and salary. You need this to apply for the visa.' },
      { question: 'How long does it take to get UK Skilled Worker Visa?', answer: 'Standard processing: 3 weeks (15 working days). Priority service: 5 working days (+£500). Super Priority: 24 hours (+£1,000). Apply from outside the UK.' },
      { question: 'Can I bring my family to the UK on a Skilled Worker Visa?', answer: 'Yes, you can bring your spouse/partner and dependent children (under 18). They need to apply as dependents. They can work and study in the UK.' }
    ],
    'usa': [
      { question: 'What is the H-1B lottery and how does it work?', answer: 'H-1B is subject to an annual cap of 65,000 visas (plus 20,000 for Masters cap). The lottery is conducted each March for October start. Not all applicants are selected.' },
      { question: 'How long can I stay on H-1B visa?', answer: 'H-1B max stay is 6 years. You can extend beyond 6 years under AC21 if you have an approved I-140 or if your PERM application has been pending for 365+ days.' },
      { question: 'What is the difference between H-1B and L-1 visa?', answer: 'H-1B is for specialty occupations requiring a bachelor\'s degree. L-1 is for intracompany transferees (L-1A for managers/executives, L-1B for specialized knowledge workers).' },
      { question: 'Can I change employers on H-1B visa?', answer: 'Yes, you can transfer your H-1B to a new employer. The new employer must file a new H-1B petition. You can start working as soon as the petition is filed (porting rule).' }
    ],
    'canada': [
      { question: 'What is LMIA and do I need it?', answer: 'LMIA (Labour Market Impact Assessment) is a positive assessment from ESDC confirming that hiring a foreign worker will not negatively impact the Canadian labour market. It is required for most work permits unless LMIA-exempt.' },
      { question: 'What is the Global Talent Stream?', answer: 'The Global Talent Stream offers 2-week processing for tech workers with qualified employers. It is available for in-demand tech occupations.' },
      { question: 'Can my spouse work in Canada on my work permit?', answer: 'Yes, your spouse can apply for an open work permit, allowing them to work for any employer in Canada.' },
      { question: 'Does work experience in Canada count towards PR?', answer: 'Yes, Canadian work experience counts towards Express Entry (Canadian Experience Class) and Provincial Nominee Programs (PNP).' }
    ],
    'australia': [
      { question: 'What is the TSS (Subclass 482) visa?', answer: 'The Temporary Skill Shortage (TSS) visa allows employers to sponsor overseas workers to fill skill shortages. It has two streams: Short-term (2 years) and Medium-term (4 years, leads to PR).' },
      { question: 'What is the Skilled Occupation List?', answer: 'The Skilled Occupation List includes occupations eligible for work visas. The list is updated regularly by the Department of Home Affairs.' },
      { question: 'Can I bring my family on TSS visa?', answer: 'Yes, you can bring your spouse and dependent children. They can work and study in Australia.' },
      { question: 'Does TSS visa lead to PR?', answer: 'Yes, the Medium-term stream (Subclass 482) leads to Permanent Residency (Subclass 186) after 3 years of work with the sponsoring employer.' }
    ],
    'germany': [
      { question: 'What is the EU Blue Card?', answer: 'The EU Blue Card is a residence permit for highly skilled non-EU professionals. It offers fast-track Permanent Residency (21-27 months) and mobility across EU countries.' },
      { question: 'What is the salary threshold for EU Blue Card?', answer: 'Minimum €45,300/year for shortage occupations (IT, engineering, healthcare) and €50,700/year standard. The threshold is reviewed annually.' },
      { question: 'Do I need to speak German for EU Blue Card?', answer: 'German is not required for the initial EU Blue Card. However, for Permanent Settlement: B1 German (21 months) or A1 German (27 months) is required.' },
      { question: 'Can I change employers on EU Blue Card?', answer: 'Yes, you can change employers. For the first 2 years, you need approval from the Ausländerbehörde. After 2 years, you can change without approval.' }
    ]
  };

  const defaultFAQ: FAQItem[] = [
    { question: `Do I need a work visa for ${country}?`, answer: `Yes, non-citizens need a valid work visa to work in ${country}. You must have a confirmed job offer and meet eligibility requirements.` },
    { question: `What is the processing time for ${country} Work Visa?`, answer: `Processing times vary by country and application type. Apply at least 3-4 months before planned start date.` },
    { question: `Can I bring my family on a work visa?`, answer: `Yes, you can usually bring your spouse and dependent children. They may be eligible for work or study permits.` }
  ];

  return map[c] || defaultFAQ;
}

// ── 11. WORK VALIDITY — COUNTRY SPECIFIC ──
export function getWorkValidity(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Up to 5 Years (Renewable)',
    'usa': 'Up to 3 Years (H-1B) / 5-7 Years (L-1)',
    'canada': '1 to 3 Years (Renewable)',
    'australia': '2 to 4 Years (TSS Subclass 482)',
    'germany': 'Up to 4 Years (EU Blue Card)',
    'uae': '2 to 3 Years (Employment Visa)',
    'singapore': '1 to 5 Years (Employment Pass)',
    'netherlands': '1 to 5 Years (HSM)',
    'sweden': '2 Years (Renewable)',
    'denmark': 'Up to 4 Years (Pay Limit Scheme)',
    'ireland': '2 Years (Critical Skills) / 5 Years (General)',
    'new-zealand': '1 to 3 Years (Essential Skills)',
    'saudi-arabia': '1 to 2 Years (Renewable)',
    'qatar': '1 to 3 Years (Renewable)',
    'japan': '1 to 5 Years (Renewable)'
  };

  return map[c] || 'Duration of Employment Contract (Renewable)';
}

// ── 12. WORK STAY DURATION — COUNTRY SPECIFIC ──
export function getWorkStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Duration of Employment Contract + 6 Months Job Search Grace Period',
    'usa': 'Duration of Approved I-797 Petition / Form I-94',
    'canada': 'Duration of Employment Contract (1 to 3 Years)',
    'australia': '2 to 4 Years (TSS Subclass 482)',
    'germany': 'Duration of Employment Contract (Up to 4 Years)',
    'uae': '2 to 3 Years (Employment Visa)',
    'singapore': '1 to 5 Years (Employment Pass)',
    'netherlands': 'Duration of Employment Contract (1 to 5 Years)',
    'sweden': '2 Years (Renewable)',
    'denmark': 'Duration of Employment Contract (Up to 4 Years)',
    'ireland': 'Duration of Employment Contract (2-5 Years)',
    'new-zealand': '1 to 3 Years (Essential Skills)',
    'saudi-arabia': '1 to 2 Years (Renewable)',
    'qatar': '1 to 3 Years (Renewable)',
    'japan': '1 to 5 Years (Renewable)'
  };

  return map[c] || 'Duration of Employment Contract';
}

// ── 13. WORK ENTRY TYPE — COUNTRY SPECIFIC ──
export function getWorkEntryType(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Multiple Entry (90-Day Entry Vignette + BRP / eVisa)',
    'usa': 'Multiple Entry (H-1B / L-1 Visa Stamp)',
    'canada': 'Multiple Entry (TRV / eTA + Work Permit)',
    'australia': 'Multiple Entry (Subclass 482)',
    'germany': 'Multiple Entry (National Visa Type D + Blue Card)',
    'uae': 'Multiple Entry (Residence Visa + Emirates ID)',
    'singapore': 'Multiple Entry (Employment Pass)',
    'netherlands': 'Multiple Entry (MVV + Residence Permit)',
    'sweden': 'Multiple Entry (Work Permit Card)',
    'denmark': 'Multiple Entry (Residence Permit Card)',
    'ireland': 'Multiple Entry (IRP Stamp 1)',
    'new-zealand': 'Multiple Entry (Work Visa)',
    'saudi-arabia': 'Multiple Entry (Iqama)',
    'qatar': 'Multiple Entry (QID)',
    'japan': 'Multiple Entry (Residence Card)'
  };

  return map[c] || 'Multiple Entry';
}

// ── 14. OFFICIAL SOURCE NAME ──
export function getWorkOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'UK Visas and Immigration (GOV.UK) & Home Office',
    'usa': 'U.S. Citizenship and Immigration Services (USCIS) & Dept of State',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC) & ESDC',
    'australia': 'Department of Home Affairs (Immigration and Citizenship)',
    'germany': 'Federal Foreign Office (Auswärtiges Amt) & BAMF',
    'uae': 'Ministry of Human Resources and Emiratisation (MOHRE) & ICP / GDRFA',
    'singapore': 'Ministry of Manpower (MOM) Singapore',
    'netherlands': 'Immigration and Naturalisation Service (IND) & Ministry of Justice',
    'sweden': 'Swedish Migration Agency (Migrationsverket)',
    'denmark': 'Danish Agency for International Recruitment and Integration (SIRI)',
    'ireland': 'Department of Enterprise, Trade and Employment (DETE) & ISD',
    'new-zealand': 'Immigration New Zealand (Ministry of Business, Innovation and Employment)',
    'saudi-arabia': 'Ministry of Human Resources and Social Development & MOFA (Saudi Arabia)',
    'qatar': 'Ministry of Interior (MOI) & Ministry of Labour (Qatar)',
    'japan': 'Immigration Services Agency of Japan (Ministry of Justice)'
  };

  return map[c] || `${country} Immigration Authority & Ministry of Labour`;
}

// ── 15. COMPLETE WORK VISA DATA BUILDER ──
export function getWorkVisaData(
  from: string,
  to: string,
  purpose: string = 'Work'
): StructuredVisaRequirements {
  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getWorkOfficialSourceName(to);
  const procTime = getWorkProcessingTime(to);
  const procDetails = getWorkProcessingDetails(to);
  const val = getWorkValidity(to);
  const stay = getWorkStayDuration(to);
  const entryType = getWorkEntryType(to);
  const fees = getWorkFees(to);
  const faqs = getWorkFAQ(to);
  const highlights = getWorkHighlights(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Employment / Work',
    visa_type: `${countryName} Work / Employment Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' work employment visa official immigration requirements')}`,
    official_source_name: officialSource,

    // ── OVERVIEW ──
    overview: getWorkOverview(to),
    highlights: highlights,

    // ── STEPS ──
    how_to_apply: getWorkSteps(to),

    // ── DOCUMENTS ──
    documents_required: getWorkDocuments(from, to, purpose),

    // ── FEES ──
    costs: fees,

    // ── PROCESSING TIME ──
    processing_time: procTime,
    processing_time_details: procDetails,

    // ── REQUIREMENTS ──
    other_requirements: getWorkRequirements(to),
    financial_proofs: getWorkFinancialProofs(to),

    // ── FAQ ──
    faqs: faqs,

    // ── VALIDITY & STAY ──
    validity: val,
    validity_details: `Standard employment visa validity: ${val}`,
    stay_duration: stay,
    stay_duration_details: `Maximum permitted stay: ${stay}`,
    entry_type: entryType,
    entry_type_details: `${entryType} employment authorization`,

    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },

    processing_and_timing: {
      apply_window: 'Apply 3 to 6 months prior to planned start date.',
      decision_time: procTime,
      max_extension: 'Renewable based on employment contract and immigration approval.',
      center_notes: c === 'usa'
        ? 'U.S. Embassy / Consulate & VAC (Visa Application Center) for biometrics & interview.'
        : `VFS Global / ${countryName} Embassy/Consulate. Check appointment availability online.`
    },

    verification_status: 'verified',
    is_v3_verified: true
  };
}
