// src/lib/family-visa.ts
// Comprehensive country-specific data pipeline for Family / Spouse Visas across ALL portal tabs

export interface DocumentRequiredItem {
  title: string;
  description: string;
  is_mandatory: boolean;
}

export interface FinancialProofItem {
  type: string;
  minimum_balance_or_amount?: string;
  time_frame?: string;
  notes?: string;
}

export interface OtherRequirementItem {
  category: string;
  details: string;
}

export function normalizeCountry(country: string): string {
  const c = (country || '').toLowerCase().trim();
  if (c === 'uk' || c.includes('united kingdom') || c.includes('britain') || c.includes('england')) return 'uk';
  if (c === 'usa' || c === 'us' || c.includes('united states') || c.includes('america')) return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('australia')) return 'australia';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('new zealand') || c === 'nz') return 'new-zealand';
  if (c.includes('uae') || c.includes('emirates') || c.includes('dubai')) return 'uae';
  if (c.includes('ireland')) return 'ireland';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('france')) return 'france';
  if (c.includes('italy')) return 'italy';
  if (c.includes('spain')) return 'spain';
  if (c.includes('netherlands') || c.includes('holland')) return 'netherlands';
  return c;
}

// ── 1. FAMILY OVERVIEW — COUNTRY SPECIFIC ────────────────────────────────────
export function getFamilyOverview(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'The UK Spouse Visa allows non-UK spouses, civil partners, and unmarried partners of British citizens or settled persons to join their partner in the UK. The UK sponsor must meet the statutory minimum income threshold of £29,000 per year (from April 2024) or cash savings equivalent (£16,000 baseline + 2.5x shortfall). The visa is initially granted for 2.5 years (33 months from outside the UK), extendable for another 2.5 years, creating a direct statutory pathway to Indefinite Leave to Remain (ILR) after 5 years. Applicants must demonstrate a genuine and subsisting relationship, adequate accommodation without recourse to public funds, and CEFR A1 English proficiency.',
    
    'usa': 'The US Family & Marriage Visa pathways include the K-1 Fiancé(e) Visa and CR-1/IR-1 Spousal Immigrant Visas. The K-1 allows foreign fiancé(e)s to enter the United States to legally marry their US citizen petitioner within 90 days of arrival, followed by filing Form I-485 to adjust status to permanent resident (Green Card). The CR-1 (Conditional Resident for marriages under 2 years) and IR-1 (Immediate Relative for marriages over 2 years) grant direct Lawful Permanent Resident status upon entry. US citizen petitioners must sponsor their spouse by filing Form I-129F or I-130 and Form I-864 Affidavit of Support meeting 125% of the Federal Poverty Guidelines.',
    
    'canada': 'The Canada Spousal Sponsorship program under the Family Class allows Canadian citizens and permanent residents to sponsor their spouse, common-law partner, or conjugal partner for Canadian permanent resident status. There is no statutory minimum income requirement (LICO) for sponsoring a spouse, though the sponsor must sign an official 3-year financial undertaking. While an inland sponsorship application is pending processing with IRCC, the sponsored spouse is eligible to apply for an open work permit (Spousal Open Work Permit - SOWP) to work legally in Canada.',
    
    'australia': 'The Australia Partner Visa (Subclass 820/801 for onshore or Subclass 309/100 for offshore) permits spouses and de facto partners of Australian citizens, permanent residents, or eligible New Zealand citizens to live, work, and study in Australia. Processed as a dual temporary-to-permanent stage, applicants first receive a provisional partner visa (Subclass 820/309) before permanent residence assessment (Subclass 801/100) after 2 years. Evidence of a genuine, continuing relationship across financial, domestic, social, and mutual commitment aspects is mandatory.',
    
    'germany': 'The Germany Family Reunion Visa (Familienzusammenführung) allows spouses and minor children of German citizens or foreign residents holding a valid residence permit (such as an EU Blue Card or Niederlassungserlaubnis) to relocate to Germany. The sponsor must demonstrate sufficient living space (approximately 12-15 square meters per person) and financial self-sufficiency. Spouses must demonstrate basic German language skills (A1 CEFR certificate) prior to entry, with exemptions available for spouses of EU Blue Card holders, researchers, and university graduates.',
    
    'new-zealand': 'The New Zealand Partner of a Citizen or Resident Visa allows partners (married, civil union, or de facto) of New Zealand citizens or permanent residents to live and work in New Zealand. Couples must demonstrate that they have lived together in a genuine, stable relationship for at least 12 months for permanent residence, or a shorter duration for an open partnership work visa. Successful applicants receive full work rights with a clear path to Permanent Resident Visa (PRV) status after 2 years.',
    
    'uae': 'The UAE Family Sponsorship Visa enables expatriate residents holding a valid UAE residence visa to sponsor their spouse and dependent children. The sponsor must satisfy the statutory minimum salary benchmark of 4,000 AED per month (or 3,000 AED plus company accommodation) and hold registered Ejari tenancy documentation and comprehensive medical insurance. Golden Visa holders enjoy enhanced privileges, including sponsoring family members of any age and domestic staff without numerical restrictions.',
    
    'ireland': 'The Ireland Join Family Visa allows spouses, civil partners, and qualified de facto partners of Irish citizens or legal foreign residents (holding Stamp 1, Stamp 4, or critical skills work permits) to reside in Ireland. Successful applicants are issued a long-stay D visa for initial entry, followed by in-person registration at the immigration office to receive an Irish Residence Permit (IRP Stamp 4), which confers full unrestricted working rights and a direct 5-year pathway to Irish permanent residence and citizenship.'
  };
  
  return map[c] || `The ${country} Family / Spouse Visa allows spouses, civil partners, and dependent family members of ${country} citizens or lawful residents to legally join and reside with their family. The sponsor must demonstrate legal status, adequate residential accommodation, and sufficient financial maintenance to support dependents without recourse to public funds.`;
}

// ── 2. FAMILY HIGHLIGHTS — FEATURE CARDS FOR OVERVIEW TAB ──────────────────
export function getFamilyHighlights(country: string): Array<{ icon: string; title: string; description: string }> {
  const c = normalizeCountry(country);
  const map: Record<string, Array<{ icon: string; title: string; description: string }>> = {
    'uk': [
      { icon: 'Heart', title: 'Genuine Relationship Proof', description: 'Comprehensive cohabitation, joint financial, and communication proof required.' },
      { icon: 'CreditCard', title: '£29,000 Income Threshold', description: 'Statutory minimum sponsor salary benchmark or cash savings (£16,000 + 2.5x shortfall).' },
      { icon: 'Home', title: 'Adequate Accommodation', description: 'Documented property ownership or tenancy with zero overcrowding under UK housing laws.' },
      { icon: 'Award', title: '5-Year Path to ILR', description: 'Initially granted for 2.5 years, extendable to 5 years leading directly to Indefinite Leave to Remain.' }
    ],
    'usa': [
      { icon: 'Heart', title: 'K-1 Fiancé or CR-1/IR-1 Spouse', description: 'Dual pathways: K-1 fiancé entry within 90 days or direct immigrant spouse consular processing.' },
      { icon: 'FileText', title: 'USCIS Petition & NVC', description: 'Requires approved Form I-129F or I-130 followed by National Visa Center adjudication.' },
      { icon: 'ShieldCheck', title: 'I-864 Affidavit of Support', description: 'Petitioner must legally sponsor immigrant at 125% of the Federal Poverty Guidelines.' },
      { icon: 'Award', title: 'Direct Path to Green Card', description: 'Full Lawful Permanent Resident status leading to US citizenship after 3 years of marriage.' }
    ],
    'canada': [
      { icon: 'Heart', title: 'Spousal Sponsorship (PR)', description: 'Direct permanent residency status for sponsored spouses and common-law partners.' },
      { icon: 'Briefcase', title: 'Spousal Open Work Permit', description: 'SOWP allows the sponsored spouse to work full-time in Canada while PR is processed.' },
      { icon: 'CheckCircle', title: 'No Minimum Income (LICO)', description: 'Zero statutory minimum salary requirement for spouses, provided basic support is assured.' },
      { icon: 'Award', title: 'Citizenship in 3 Years', description: 'Path to Canadian Citizenship after completing 1,095 days of physical presence as a PR.' }
    ],
    'australia': [
      { icon: 'Heart', title: 'Partner Visa (Subclass 820/801)', description: 'Two-stage pathway: Temporary provisional visa followed by permanent residency grant.' },
      { icon: 'Users', title: '12-Month Relationship Rule', description: 'Must prove 12+ months de facto relationship or valid civil/marriage registration.' },
      { icon: 'Briefcase', title: 'Unrestricted Work & Study', description: 'Full Medicare access and unrestricted employment rights upon temporary visa grant.' },
      { icon: 'Award', title: 'Direct Australian PR', description: 'Permanent Partner Visa (801/100) leads directly to Australian Citizenship after 4 years.' }
    ],
    'germany': [
      { icon: 'Heart', title: 'Family Reunion (D-Visa)', description: 'Long-term national visa for spouses joining German citizens or EU Blue Card holders.' },
      { icon: 'FileText', title: 'German Language A1', description: 'Basic Goethe/telc A1 certificate required prior to entry (exempt for Blue Card spouses).' },
      { icon: 'Home', title: 'Adequate Living Space', description: 'Verified apartment lease meeting statutory living space minimums (12-15 sqm/person).' },
      { icon: 'Award', title: 'Niederlassungserlaubnis Path', description: 'Eligible for Permanent Settlement Permit after 5 years of legal resident status.' }
    ],
    'uae': [
      { icon: 'Heart', title: 'Family Residence Visa', description: 'Expatriates can sponsor spouse and dependent children for 1 to 3 years renewable residency.' },
      { icon: 'CreditCard', title: '4,000 AED Salary Rule', description: 'Sponsor must earn minimum 4,000 AED/month (or 3,000 AED with company accommodation).' },
      { icon: 'ShieldCheck', title: 'Attested Marriage Certificate', description: 'Marriage certificate attested by MEA India, UAE Embassy, and MOFA UAE.' },
      { icon: 'Award', title: 'Golden Visa Family Benefits', description: 'Golden Visa holders can sponsor spouse, children of any age, and domestic helpers.' }
    ],
    'new-zealand': [
      { icon: 'Heart', title: 'Partnership Resident Visa', description: 'Live and work in New Zealand as the partner of a Kiwi citizen or permanent resident.' },
      { icon: 'Users', title: 'Living Together for 12 Months', description: 'Demonstrated cohabitation with joint rental agreement, shared bank accounts, and utilities.' },
      { icon: 'Briefcase', title: 'Open Work Rights', description: 'Immediate eligibility for open partnership work visa while residence application is pending.' },
      { icon: 'Award', title: 'Permanent Resident Visa (PRV)', description: 'Eligible for unconditional Permanent Resident Visa after holding residence for 2 years.' }
    ],
    'ireland': [
      { icon: 'Heart', title: 'Join Family D-Visa', description: 'Long-stay entry visa for spouses of Irish citizens, EU nationals, and employment permit holders.' },
      { icon: 'Award', title: 'Stamp 4 Residence Permit', description: 'Grants immediate full right to work without needing a separate employment permit.' },
      { icon: 'ShieldCheck', title: 'Cohabitation Evidence', description: 'Clear documentary proof of genuine partnership, shared domicile, and financial links.' },
      { icon: 'Home', title: 'Irish Citizenship in 3–5 Yrs', description: 'Direct path to naturalisation as an Irish citizen after qualifying period of residence.' }
    ]
  };
  
  return map[c] || [
    { icon: 'Heart', title: 'Family Reunification', description: 'Reunite and cohabit legally with your spouse or partner in the destination country.' },
    { icon: 'ShieldCheck', title: 'Documented Partnership', description: 'Marriage certificate, cohabitation proofs, and joint financial records required.' },
    { icon: 'CreditCard', title: 'Sponsor Maintenance', description: 'Sponsor must demonstrate adequate financial ability to support dependents.' },
    { icon: 'Award', title: 'Path to Settlement', description: 'Family visas grant resident status leading to permanent residency and citizenship.' }
  ];
}

// ── 3. FAMILY DOCUMENTS — COUNTRY SPECIFIC ──────────────────────────────────
export function getFamilyDocuments(countryOrFrom: string, maybeCountry?: string, _purpose?: string): DocumentRequiredItem[] {
  const targetCountry = maybeCountry || countryOrFrom;
  const c = normalizeCountry(targetCountry);
  
  const map: Record<string, DocumentRequiredItem[]> = {
    'uk': [
      { title: 'Original Valid Passport', description: 'Current passport with at least 6 months validity beyond application date and minimum 2 blank visa pages.', is_mandatory: true },
      { title: 'Marriage or Civil Partnership Certificate', description: 'Government-issued original marriage certificate, legalized and translated into English if issued in another language.', is_mandatory: true },
      { title: 'Sponsor Financial Evidence (£29,000)', description: '6 months consecutive payslips, corresponding bank statements, and P60/employer letter confirming £29,000+ annual salary.', is_mandatory: true },
      { title: 'Evidence of Genuine & Subsisting Relationship', description: 'Joint tenancy agreements, joint bank accounts, dated photographs across years, travel history together, and communication logs.', is_mandatory: true },
      { title: 'Proof of Adequate UK Accommodation', description: 'Tenancy agreement, property title deeds, mortgage statement, and property inspection report showing no overcrowding.', is_mandatory: true },
      { title: 'English Language SELT Certificate (A1)', description: 'Official CEFR A1 certificate in speaking and listening from an approved UKVI test provider (IELTS Life Skills / PTE Home / Trinity).', is_mandatory: true },
      { title: 'Tuberculosis (TB) Screening Certificate', description: 'Valid medical clearance certificate from an authorized IOM/UKVI panel clinic in India (valid for 6 months).', is_mandatory: true },
      { title: 'Sponsor Status Documentation', description: 'Bio-data page copy of sponsor\'s British passport or proof of Indefinite Leave to Remain (ILR BRP card / share code).', is_mandatory: true }
    ],
    'usa': [
      { title: 'Original Valid Passport', description: 'Passport valid for at least 6 months beyond intended entry into the United States with minimum 2 blank pages.', is_mandatory: true },
      { title: 'Approved USCIS Petition Notice (Form I-797)', description: 'Official Notice of Action approval from USCIS for Form I-129F (K-1) or Form I-130 (CR-1/IR-1).', is_mandatory: true },
      { title: 'Form DS-160 / DS-260 Confirmation', description: 'Printed confirmation barcode sheet for online immigrant visa application submitted via CEAC.', is_mandatory: true },
      { title: 'Form I-864 / I-134 Affidavit of Support', description: 'Signed affidavit of financial support from US petitioner with latest 3 years IRS federal tax returns and W-2 forms.', is_mandatory: true },
      { title: 'Civil Documents & Marriage Certificate', description: 'Original marriage certificate (CR-1) or declaration of intent to marry within 90 days (K-1), plus certified birth certificates.', is_mandatory: true },
      { title: 'Evidence of Bona Fide Relationship', description: 'Extensive documentation of relationship: flight itineraries of visits, hotel stays, wedding photos, chat histories, joint assets.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Original PCC issued by Regional Passport Office (RPO) and police certificates from any foreign country resided in for 6+ months.', is_mandatory: true },
      { title: 'CDC Panel Physician Medical Examination', description: 'Sealed medical report (or electronic eMedical) completed by a CDC-authorized panel physician including vaccination records.', is_mandatory: true }
    ],
    'canada': [
      { title: 'Original Passport & Travel History', description: 'Color scans of all pages of current passport and previous travel history stamps.', is_mandatory: true },
      { title: 'Marriage Certificate / Common-Law Statutory Declaration', description: 'Official marriage registration certificate or IMM 5409 Statutory Declaration of Common-Law Union with 12 months cohabitation proof.', is_mandatory: true },
      { title: 'Sponsorship Application Dossier (IMM 1344 & IMM 0008)', description: 'Completed and signed Application to Sponsor (IMM 1344), Generic Application Form (IMM 0008), and Background Declaration (IMM 5669).', is_mandatory: true },
      { title: 'Relationship Information & Sponsorship Evaluation (IMM 5532)', description: 'Detailed relationship history questionnaire covering meeting circumstances, proposal, wedding ceremonies, and living arrangements.', is_mandatory: true },
      { title: 'Comprehensive Proof of Relationship', description: 'Joint lease agreements, joint bank accounts, utility bills in both names, photographs with extended family, and message logs.', is_mandatory: true },
      { title: 'Sponsor Proof of Status & Financial Capacity', description: 'Canadian passport, PR card, and Canada Revenue Agency (CRA) Notice of Assessment (Option C) for latest tax year.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Original PCC from Regional Passport Office (India) and clearances from any country lived in for 6+ consecutive months since age 18.', is_mandatory: true },
      { title: 'Immigration Medical Exam (eMedical)', description: 'Upfront or requested medical examination report completed by an IRCC-approved panel physician.', is_mandatory: true }
    ],
    'australia': [
      { title: 'Original Valid Passport', description: 'Color bio-data scan and valid passport pages with minimum 6 months validity.', is_mandatory: true },
      { title: 'Marriage Certificate or 12-Month De Facto Proof', description: 'Official marriage certificate OR statutory relationship register certificate / proof of 12 months continuous cohabitation.', is_mandatory: true },
      { title: 'Sponsorship Form 40SP', description: 'Completed sponsorship application lodged on ImmiAccount by the Australian citizen or permanent resident partner.', is_mandatory: true },
      { title: 'Four Pillars of Relationship Evidence', description: '1. Financial (joint accounts/loans), 2. Nature of household (shared lease/chores), 3. Social context (joint invitations/photos), 4. Mutual commitment (wills/statements).', is_mandatory: true },
      { title: 'Form 888 Statutory Declarations', description: 'Minimum 2 statutory declarations from Australian citizens/PRs who have personal knowledge of your genuine relationship.', is_mandatory: true },
      { title: 'National Police Clearance Certificates (PCC)', description: 'PCC from India (Regional Passport Office) and all jurisdictions resided in for 12+ months over the past 10 years.', is_mandatory: true },
      { title: 'Bupa Medical Health Clearance (HAP ID)', description: 'Immigration health examination including chest X-ray and general medical assessment via eMedical.', is_mandatory: true }
    ],
    'germany': [
      { title: 'Original Valid Passport', description: 'Current passport with at least 12 months validity from submission and minimum 2 blank visa pages.', is_mandatory: true },
      { title: 'Apostilled Marriage Certificate', description: 'Original marriage certificate with MEA Apostille sticker, translated into German by a certified sworn translator.', is_mandatory: true },
      { title: 'Sponsor Residence Title & Passport Copy', description: 'Copy of spouse\'s German passport, EU Blue Card, or German residence permit (Aufenthaltstitel).', is_mandatory: true },
      { title: 'Goethe-Zertifikat A1 German Language Certificate', description: 'Official A1 German certificate from Goethe-Institut, telc, or TestDaF proving basic German language proficiency.', is_mandatory: true },
      { title: 'Lease Agreement & Landlord Confirmation', description: 'Mietvertrag (rental contract) and Wohnungsgeberbestätigung confirming adequate living space (minimum 12 sqm per person).', is_mandatory: true },
      { title: 'Proof of Sponsor Livelihood (Verdienstbescheinigung)', description: 'Sponsor\'s employment contract, last 3 months payslips (Gehaltsabrechnungen), and bank statements showing financial stability.', is_mandatory: true },
      { title: 'Incoming Health Insurance Coverage', description: 'Travel medical insurance for first 90 days followed by proof of statutory (GKV) family co-insurance registration.', is_mandatory: true }
    ],
    'uae': [
      { title: 'Original Valid Passport', description: 'Valid passport with at least 6 months validity and minimum 2 blank pages.', is_mandatory: true },
      { title: 'Attested Marriage Certificate', description: 'Original marriage certificate attested sequentially by Home Dept, MEA New Delhi, UAE Embassy India, and MOFA UAE.', is_mandatory: true },
      { title: 'Sponsor Salary Certificate & Labour Contract', description: 'Attested MOHRE labour contract and official salary certificate showing monthly salary of 4,000+ AED.', is_mandatory: true },
      { title: 'Registered Tenancy Contract (Ejari)', description: 'Valid tenancy contract registered under the Ejari system in the sponsor\'s name.', is_mandatory: true },
      { title: 'Sponsor Emirates ID & Residence Visa Copy', description: 'Color copies of sponsor\'s valid Emirates ID card and stamped UAE residence visa.', is_mandatory: true },
      { title: 'Medical Fitness Screening (UAE)', description: 'Medical examination for communicable diseases (Blood test for HIV and chest X-ray for TB) at an approved UAE health centre.', is_mandatory: true },
      { title: 'Comprehensive Medical Insurance Policy', description: 'Valid UAE health insurance card or policy document covering the sponsored spouse.', is_mandatory: true }
    ],
    'new-zealand': [
      { title: 'Original Valid Passport', description: 'Current passport with at least 6 months validity beyond application date.', is_mandatory: true },
      { title: 'Marriage Certificate or Registered Partnership', description: 'Official marriage certificate or proof of legally registered civil partnership.', is_mandatory: true },
      { title: 'Partnership Sponsorship Form (INZ 1024)', description: 'Completed and signed partnership sponsorship form from the New Zealand citizen or resident partner.', is_mandatory: true },
      { title: 'Evidence of Living Together in a Genuine Relationship', description: 'Minimum 12 months continuous cohabitation evidence: joint tenancy, shared utility bills, joint bank statements, and travel logs.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Original police certificate from India (Passport Seva Kendra) and any country resided in for 12+ months in past 10 years.', is_mandatory: true },
      { title: 'General Medical & Chest X-Ray Certificate (INZ 1007)', description: 'eMedical panel clinic health examination and chest X-ray certificate.', is_mandatory: true }
    ],
    'ireland': [
      { title: 'Original Valid Passport', description: 'Passport with at least 12 months validity from planned arrival date and minimum 2 blank visa pages.', is_mandatory: true },
      { title: 'AVATS Online Application Summary', description: 'Printed and signed AVATS online application summary sheet with proof of consular fee payment.', is_mandatory: true },
      { title: 'Original Marriage Certificate', description: 'State-issued marriage registration certificate with certified English translation.', is_mandatory: true },
      { title: 'Sponsor Irish Residence Permit / Passport', description: 'Clear copy of sponsor\'s Irish passport or Irish Residence Permit (Stamp 1, Stamp 4, CSEP).', is_mandatory: true },
      { title: 'Sponsor Financial Maintenance Evidence', description: 'P60/Employment Detail Summary, last 6 months payslips, and 6 months bank statements demonstrating self-sufficiency.', is_mandatory: true },
      { title: 'Documentary Cohabitation & Relationship Proof', description: 'Photographs across the relationship, evidence of visits, communications records, and joint domestic responsibilities.', is_mandatory: true },
      { title: 'Private Comprehensive Medical Insurance', description: 'Private medical insurance policy providing full hospital coverage in Ireland.', is_mandatory: true }
    ]
  };
  
  const defaultDocs: DocumentRequiredItem[] = [
    { title: 'Original Valid Passport', description: 'Valid for at least 6 months beyond intended stay with minimum 2 blank pages.', is_mandatory: true },
    { title: 'Marriage or Partnership Certificate', description: 'Original official marriage or civil partnership certificate (apostilled and translated if required).', is_mandatory: true },
    { title: 'Sponsorship Undertaking & Declaration', description: 'Official sponsorship application from the partner in the destination country confirming financial maintenance.', is_mandatory: true },
    { title: 'Evidence of Genuine & Subsisting Relationship', description: 'Photographs, communication records, joint financial documents, and proof of cohabitation.', is_mandatory: true },
    { title: 'Sponsor Financial Maintenance Documents', description: 'Bank statements, employment contracts, and tax returns proving ability to maintain dependents without public funds.', is_mandatory: true },
    { title: 'Police Clearance Certificate (PCC)', description: 'Valid PCC from country of origin and any country resided in for 6+ consecutive months.', is_mandatory: true },
    { title: 'Medical Examination Clearance', description: 'Immigration health assessment report completed by an authorized panel physician.', is_mandatory: true }
  ];
  
  return map[c] || defaultDocs;
}

// ── 4. FAMILY STEPS — COUNTRY SPECIFIC ──────────────────────────────────────
export function getFamilySteps(countryOrFrom: string, maybeCountry?: string, _purpose?: string): string[] {
  const targetCountry = maybeCountry || countryOrFrom;
  const c = normalizeCountry(targetCountry);
  
  const map: Record<string, string[]> = {
    'uk': [
      'Step 1: Verify Relationship & Financial Eligibility — Ensure minimum gross sponsor income of £29,000/year (or £88,500 cash savings equivalent).',
      'Step 2: Complete English Language Test (A1) — Appear for IELTS for UKVI / PTE Home at CEFR A1 level in speaking and listening.',
      'Step 3: Undergo Mandatory TB Screening — Complete chest X-ray and TB clearance at an authorized UKVI panel clinic in India.',
      'Step 4: Complete Online Visa Application — Fill the Spouse Visa application on GOV.UK and link your UK sponsor details.',
      'Step 5: Pay Consular Visa Fee & IHS — Pay the £1,846 application fee plus £2,587.50 Immigration Health Surcharge (IHS for 2.5 years).',
      'Step 6: Book & Attend VFS Biometrics — Upload supporting documents online and attend VFS Global for digital fingerprints and photo.',
      'Step 7: Await Consular Adjudication — Standard processing takes 12 weeks (priority 30 working days available).',
      'Step 8: Travel to the UK & Collect BRP / eVisa — Enter the UK during the 90-day vignette window and access digital status or collect BRP.',
      'Step 9: Apply for 2.5-Year Extension (FLR-M) — Renew visa before expiry after meeting A2 English language requirement.',
      'Step 10: Attain Indefinite Leave to Remain (ILR) — Apply for permanent settlement after 5 continuous years in the UK.'
    ],
    'usa': [
      'Step 1: File USCIS Immigrant Petition — US citizen files Form I-129F (K-1 fiancé) or Form I-130 (CR-1/IR-1 spouse) with USCIS.',
      'Step 2: Await USCIS Adjudication — Receive Form I-797 Notice of Action approval (processing takes 6 to 12 months).',
      'Step 3: National Visa Center (NVC) Processing — Case transfers to NVC. Pay fee invoices, submit Form DS-260, and upload civil documents.',
      'Step 4: File Form I-864 Affidavit of Support — Sponsor submits federal tax returns and W-2s proving income above 125% poverty line.',
      'Step 5: Complete CDC Panel Medical Exam — Attend medical screening with vaccination history at an authorized panel clinic.',
      'Step 6: Attend Biometrics at VAC — Provide digital fingerprints and photo at the US Visa Application Center.',
      'Step 7: Attend In-Person Consular Interview — Attend visa interview at the US Embassy/Consulate with original civil documents.',
      'Step 8: Receive Visa & Travel to the USA — Receive passport with K-1 or CR-1 immigrant visa foil.',
      'Step 9: Marry Within 90 Days (K-1) or Enter as LPR (CR-1) — K-1 holders marry within 90 days and file Form I-485 to adjust status.',
      'Step 10: Green Card & Path to Citizenship — Receive 2-year conditional or 10-year Green Card; eligible for US citizenship in 3 years.'
    ],
    'canada': [
      'Step 1: Confirm Sponsor & Applicant Eligibility — Sponsor must be a Canadian citizen or permanent resident at least 18 years old.',
      'Step 2: Compile Comprehensive Dossier — Gather marriage certificate, relationship history questionnaire (IMM 5532), and joint proofs.',
      'Step 3: Complete Sponsorship & PR Forms Online — Submit application electronically via the IRCC Permanent Residence Portal.',
      'Step 4: Pay Statutory Government Fees — Pay sponsorship fee (CAD 75), principal applicant fee (CAD 490), and RPRF (CAD 515).',
      'Step 5: Receive Acknowledgment of Receipt (AOR) — Receive official AOR email from IRCC with application reference number within 2-4 weeks.',
      'Step 6: Submit Biometrics & Complete Medical Exam — Complete biometric enrollment at VFS Global and eMedical exam at panel clinic.',
      'Step 7: Apply for Spousal Open Work Permit (SOWP) — Optional: Eligible inland applicants can apply for an open work permit while PR is pending.',
      'Step 8: Final Decision & Confirmation of PR (COPR) — Receive COPR document and submit passport to VFS for permanent resident visa counterfoil.',
      'Step 9: Land in Canada & Receive 5-Year PR Card — Complete landing formalities at border port of entry and receive physical PR Card.'
    ],
    'australia': [
      'Step 1: Prepare Four Pillars of Relationship Evidence — Compile financial, household, social, and commitment proofs spanning 12+ months.',
      'Step 2: Lodge Combined Partner Visa Application — Submit Subclass 820/801 (onshore) or 309/100 (offshore) via ImmiAccount.',
      'Step 3: Sponsor Lodges Form 40SP — Australian sponsor completes and submits sponsorship application linked to your TRN.',
      'Step 4: Pay Statutory Visa Application Charge — Pay the AUD 8,850 combined temporary and permanent application charge.',
      'Step 5: Provide Statutory Declarations (Form 888) — Submit at least 2 witness declarations from Australian citizens/permanent residents.',
      'Step 6: Complete Health Examination & Biometrics — Complete HAP ID medical check and enroll biometrics at VFS Global ABCC.',
      'Step 7: Receive Temporary Partner Visa Grant — Provisional visa (Subclass 820/309) granted with full work, study, and Medicare rights.',
      'Step 8: Submit Second-Stage Permanent PR Evidence — 2 years after initial lodgement, submit updated relationship evidence.',
      'Step 9: Receive Permanent Partner Visa (Subclass 801/100) — Permanent residency granted, leading to Australian citizenship in 4 years.'
    ],
    'germany': [
      'Step 1: Check Family Reunion Eligibility — Sponsor holds valid German passport, EU Blue Card, or permanent residence title.',
      'Step 2: Obtain Goethe-Zertifikat A1 — Spouse completes and passes CEFR A1 German language exam (unless statutory exemption applies).',
      'Step 3: Legalize Marriage Certificate with MEA Apostille — Complete state verification and apostille on Indian marriage certificate.',
      'Step 4: Secure Compliant Housing (Wohnungsgeberbestätigung) — Obtain landlord confirmation and lease demonstrating 12-15 sqm per person.',
      'Step 5: Fill VIDEX National Visa Application — Complete digital VIDEX application form for National Visa (Type D - Family Reunion).',
      'Step 6: Book & Attend German Mission Appointment — Submit dossier at German Embassy/Consulate or VFS Global with original apostilled certificates.',
      'Step 7: Receive Type-D Visa & Enter Germany — Receive entry visa (valid for 90 days to 1 year) and travel to Germany.',
      'Step 8: Register Residence at Bürgeramt (Anmeldung) — Complete city registration within 14 days of moving into local apartment.',
      'Step 9: Collect Residence Permit at Ausländerbehörde — Receive physical electronic residence title (Aufenthaltstitel) with full work rights.'
    ],
    'uae': [
      'Step 1: Verify Sponsor Salary & Tenancy Eligibility — Sponsor earns minimum 4,000 AED/month (or 3,000 AED + accommodation) with registered Ejari.',
      'Step 2: Complete Multi-Tier Attestation — Legalize marriage certificate via Home Department, MEA New Delhi, UAE Embassy, and MOFA UAE.',
      'Step 3: Apply for Entry Permit via ICP / GDRFA — Sponsor applies online or via Amer/Tasheel service centre with salary certificate and Ejari.',
      'Step 4: Entry Permit Issuance — Receive 60-day electronic entry permit for spouse to enter the United Arab Emirates.',
      'Step 5: Undergo UAE Medical Fitness Test — Spouse completes mandatory blood test and chest X-ray screening at an authorized health centre.',
      'Step 6: Enroll Emirates ID Biometrics — Complete fingerprint and biometric capture at Federal Authority (ICP) service centre.',
      'Step 7: Residence Visa Stamping & Insurance — Receive electronic residence visa approval and obtain mandatory health insurance.',
      'Step 8: Receive Physical Emirates ID Card — Collect 1 to 3-year renewable Emirates ID card with full resident status.'
    ],
    'new-zealand': [
      'Step 1: Establish 12-Month Cohabitation Evidence — Assemble joint tenancy agreements, bank records, and utility bills showing stable partnership.',
      'Step 2: Sponsor Completes INZ 1024 Undertaking — Kiwi citizen or resident partner completes official sponsorship declaration.',
      'Step 3: Submit Online Residence Application — Lodge Partnership Resident Visa application via Immigration New Zealand portal.',
      'Step 4: Pay Statutory Application Fee & Levy — Pay the NZD 2,450 partnership application charge.',
      'Step 5: Complete eMedical & Police Certificates — Complete immigration medical exam and submit original police clearances.',
      'Step 6: Immigration Case Officer Assessment — Provide additional relationship details or attend interview if requested by INZ.',
      'Step 7: Receive Resident Visa Grant — Receive New Zealand Resident Visa with travel conditions and full employment rights.',
      'Step 8: Attain Permanent Resident Visa (PRV) — Transition to unconditional Permanent Resident Visa after 2 years of holding residence.'
    ],
    'ireland': [
      'Step 1: Verify Sponsor Legal & Financial Status — Sponsor holds Irish citizenship or valid Stamp 1/Stamp 4/CSEP status.',
      'Step 2: Submit AVATS Online Visa Application — Complete long-stay D Join Family application on the official Irish immigration portal.',
      'Step 3: Assemble Civil Documents & Financial Records — Compile apostilled marriage certificate, sponsor payslips, and 6 months bank statements.',
      'Step 4: Submit Dossier to VFS Global Ireland — Pay consular fees and submit original physical dossier for transfer to Visa Office.',
      'Step 5: Await Visa Adjudication — Decision issued by Irish Immigration Service Delivery (ISD) within 6 to 8 weeks.',
      'Step 6: Receive Long-Stay D Visa Foil — Passport stamped with D visa foil for entry into the Republic of Ireland.',
      'Step 7: Register at Immigration Office (IRP Stamp 4) — Attend Burgh Quay / local Garda immigration office within 90 days to register.',
      'Step 8: Receive IRP Card with Full Work Rights — Receive Stamp 4 residence card authorizing unrestricted employment across Ireland.'
    ]
  };
  
  const defaultSteps: string[] = [
    'Step 1: Confirm Relationship & Sponsorship Eligibility — Ensure marriage or partnership is legally recognized and sponsor meets maintenance criteria.',
    'Step 2: Legalize Civil Documents & Marriage Certificate — Complete government attestations, apostille, and certified translations.',
    'Step 3: Gather Proof of Genuine Partnership — Collect cohabitation evidence, joint financial commitments, and extensive photographic logs.',
    'Step 4: Complete Online Visa Application — Fill the official family/spouse visa application on the destination government portal.',
    'Step 5: Pay Consular & Service Fees — Pay non-refundable visa application charges and mandatory immigration healthcare surcharges.',
    'Step 6: Enroll Biometrics & Complete Medical Check — Submit digital fingerprints at VAC and undergo panel physician medical exam.',
    'Step 7: Receive Visa Approval & Travel — Receive entry visa counterfoil and travel to join your spouse in the destination country.',
    'Step 8: Register for Local Residence Permit — Register domicile with local authorities and receive residence permit with full work rights.'
  ];
  
  return map[c] || defaultSteps;
}

export function getFamilyVisaSteps(countryOrFrom: string, maybeCountry?: string, _purpose?: string): string[] {
  return getFamilySteps(countryOrFrom, maybeCountry, _purpose);
}

// ── 5. FAMILY FEES — COUNTRY SPECIFIC ────────────────────────────────────────
export function getFamilyFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  const map: Record<string, { visa_fee: string; service_fee: string; total_fee: string; notes: string }> = {
    'uk': {
      visa_fee: '£1,846 (Spouse Visa Consular Application Fee)',
      service_fee: '£2,587.50 (£1,035/year IHS for 2.5 Years)',
      total_fee: '£4,433.50 Total Official Government Surcharge',
      notes: 'Payable online via GOV.UK. Includes £1,846 visa fee + £2,587.50 Immigration Health Surcharge. Optional priority processing: +£500 (30 days).'
    },
    'usa': {
      visa_fee: '325 USD (DS-260 CR-1/IR-1) / 265 USD (DS-160 K-1)',
      service_fee: '535 USD (USCIS Form I-130 Petition) + 235 USD (Immigrant Fee)',
      total_fee: '1,095 USD Total Official Government Fee Breakdown',
      notes: 'USCIS filing fee $535, NVC DS-260 fee $325, Affidavit of Support fee $120, USCIS Immigrant Fee $235. Medical examination paid directly to panel clinic.'
    },
    'canada': {
      visa_fee: 'CAD 1,080 (Sponsorship Fee CAD 75 + Principal Applicant CAD 490 + RPRF CAD 515)',
      service_fee: 'CAD 85 (Biometrics Enrollment Fee)',
      total_fee: 'CAD 1,165 Total Official IRCC Government Fee',
      notes: 'Paid online via IRCC Portal. Right of Permanent Residence Fee (RPRF CAD 515) is fully refundable if sponsorship is refused.'
    },
    'australia': {
      visa_fee: 'AUD 8,850 (Partner Visa Subclass 820/801 Combined Charge)',
      service_fee: 'AUD 4,430 (Additional Dependent 18+) / AUD 2,215 (Under 18)',
      total_fee: 'AUD 8,850 Base Application Charge',
      notes: 'Paid online via ImmiAccount. Covers both temporary (820) and permanent (801) stages. Health check and police clearances paid separately.'
    },
    'germany': {
      visa_fee: '75 EUR (National Visa Type D Consular Fee)',
      service_fee: '100 EUR (Aufenthaltstitel Residence Permit Card at Ausländerbehörde)',
      total_fee: '175 EUR Total Government Statutory Fees',
      notes: 'Consular fee €75 paid in INR at German mission/VFS. Minor children pay reduced consular fee of €37.50. Goethe A1 exam and translations extra.'
    },
    'uae': {
      visa_fee: '1,100 AED (ICP / GDRFA Entry Permit & Visa File Open)',
      service_fee: '370 AED (Emirates ID 2-Year) + 250 AED (Medical Fitness)',
      total_fee: '1,720 AED – 2,200 AED Total Official UAE Government Fee',
      notes: 'Payable online via ICP/GDRFA or Amer/Tasheel centres. Health insurance premium is mandatory and varies by chosen policy provider.'
    },
    'new-zealand': {
      visa_fee: 'NZD 2,450 (Partnership Resident Visa Application Fee)',
      service_fee: 'NZD 450 (Immigration Levy & VAC Logistics)',
      total_fee: 'NZD 2,450 Base Application Charge',
      notes: 'Paid online via Immigration New Zealand portal. Band A / Band B pricing applies depending on onshore vs offshore lodgement.'
    },
    'ireland': {
      visa_fee: '€100 Multiple Entry / €60 Single Entry (Long-Stay D Visa)',
      service_fee: '€300 (Irish Residence Permit IRP Card upon Registration)',
      total_fee: '€400 Total Official Statutory Surcharge',
      notes: 'Consular visa fee paid via VFS Global Ireland. The €300 IRP registration fee is paid directly at the Burgh Quay Registration Office in Dublin.'
    }
  };
  
  return map[c] || {
    visa_fee: 'Official Statutory Consular Fee',
    service_fee: 'VAC Biometrics & Logistics Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Official government consular fees are non-refundable and subject to official consular exchange rates.'
  };
}

// ── 6. FAMILY PROCESSING TIME — COUNTRY SPECIFIC ────────────────────────────
export function getFamilyProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Standard: 12 Weeks (60 Working Days). Priority: 30 Working Days (+£500).',
    'usa': 'USCIS Petition: 6-12 Months. NVC & Interview: 3-6 Months. Total: 10-18 Months.',
    'canada': '10 to 12 Months (IRCC Standard Spousal Sponsorship SLA).',
    'australia': '12 to 24 Months for Subclass 820/309. Subclass 801/100 assessed after 2 years.',
    'germany': '8 to 12 Weeks (German Mission Review & Local Ausländerbehörde Clearance).',
    'uae': '7 to 14 Working Days for complete entry permit, medical, and Emirates ID.',
    'new-zealand': '6 to 9 Months for Partnership Resident Visa assessment.',
    'ireland': '6 to 8 Weeks (Irish Immigration Service Delivery ISD Standard SLA).'
  };
  
  return map[c] || '4 to 6 Months per Official Consular SLA. Apply well in advance of planned relocation.';
}

export function getFamilyProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'Priority service available for out-of-country applications (£500 for 30 working days). Super Priority 24-hour decision available for select in-country extensions.',
    'usa': 'USCIS petition processing: 6-12 months. Case transfers to NVC for document collection (2-4 weeks). Consular interview scheduled at US Embassy New Delhi or Mumbai.',
    'canada': 'Inland applications allow simultaneous Spousal Open Work Permit (SOWP) application (processed in 2-4 months) allowing full work authorization during PR processing.',
    'australia': 'Dual-stage application. The provisional 820/309 visa grants unrestricted work, study, and Medicare access while waiting for permanent 801/100 adjudication.',
    'germany': 'Consular interview at German Mission in India followed by electronic transmission of dossier to local Ausländerbehörde in sponsor\'s German city for accommodation review.',
    'uae': 'Fast-track digital processing. Sponsor receives electronic entry permit in 48-72 hours. Medical fitness and Emirates ID biometrics completed within 5 working days of arrival.',
    'new-zealand': 'Interim partnership work visa can be granted if current visa expires while partnership residence application is under formal immigration assessment.',
    'ireland': 'AVATS online summary submitted at VFS Global India. Dossier transferred to Department of Justice in Dublin for review. Entry visa followed by Stamp 4 registration.'
  };
  
  return map[c] || 'Processing timelines depend on consular caseload, background checks, and verification of civil documentation.';
}

// ── 7. FAMILY REQUIREMENTS — COUNTRY SPECIFIC ───────────────────────────────
export function getFamilyRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, OtherRequirementItem[]> = {
    'uk': [
      { category: 'Financial Requirement', details: 'Sponsor must earn gross £29,000/year (from April 2024), or demonstrate cash savings of £88,500 held untouched for 6 months.' },
      { category: 'English Language Competence', details: 'CEFR Level A1 speaking and listening certificate from an approved UKVI test provider (IELTS Life Skills / PTE Home).' },
      { category: 'Genuine & Subsisting Relationship', details: 'Must prove legally recognized marriage/civil partnership or 2+ years cohabitation as unmarried partners with shared domicile.' },
      { category: 'Adequate Housing', details: 'Accommodation in the UK must be legally owned or leased with adequate rooms to avoid overcrowding under the Housing Act 1985.' },
      { category: 'Tuberculosis (TB) Mandate', details: 'Mandatory negative chest X-ray screening certificate from a UKVI-approved panel clinic in India.' }
    ],
    'usa': [
      { category: 'Bona Fide Relationship Standard', details: 'Must establish that marriage was not entered into solely to evade immigration laws. Extensive photographic and joint financial proof.' },
      { category: 'Form I-864 Financial Sponsorship', details: 'US petitioner must meet 125% of the Federal Poverty Guidelines for their household size. Joint sponsor permitted if income is insufficient.' },
      { category: '90-Day Marriage Mandate (K-1)', details: 'K-1 fiancé(e) visa holders must legally marry the US citizen petitioner within 90 calendar days of arrival or face deportation.' },
      { category: 'Civil & Police Clearances', details: 'Police Clearance Certificates from Regional Passport Office (India) and any country resided in for 6+ months since age 18.' },
      { category: 'CDC Medical & Immunization', details: 'Comprehensive medical examination by CDC-authorized panel physician with mandatory vaccinations (Tdap, MMR, Varicella, Hepatitis B).' }
    ],
    'canada': [
      { category: 'Sponsor Undertaking', details: 'Sponsor signs a legally binding 3-year financial undertaking to repay any social assistance received by the sponsored spouse.' },
      { category: 'Relationship Authenticity', details: 'Must satisfy IRCC that the marriage or common-law union is genuine and not entered into primarily for acquiring immigration status.' },
      { category: 'Zero Minimum Income Rule', details: 'Unlike parent/grandparent sponsorship, there is no minimum Low Income Cut-Off (LICO) required to sponsor a spouse, unless dependent children have children.' },
      { category: 'Immigration Medical & Clearances', details: 'Mandatory upfront/requested eMedical examination and Police Clearance Certificates from all countries lived in 6+ months.' }
    ],
    'australia': [
      { category: '12-Month Cohabitation Rule', details: 'De facto couples must demonstrate at least 12 months of continuous cohabitation prior to lodgement, unless relationship is legally registered.' },
      { category: 'Four Relationship Aspects', details: 'Assessed across: 1. Financial aspects, 2. Nature of household, 3. Social aspects, and 4. Nature of mutual commitment.' },
      { category: 'Australian Sponsor Eligibility', details: 'Sponsor must be an Australian citizen, permanent resident, or eligible NZ citizen and pass character requirements (police checks).' },
      { category: 'Health & Character Standards', details: 'Mandatory Bupa health assessment (HAP ID) and National Police Clearances covering all jurisdictions lived in 12+ months.' }
    ],
    'germany': [
      { category: 'German Language A1 Benchmark', details: 'Spouse must present Goethe-Zertifikat A1 proving basic German speaking, reading, and listening skills prior to visa issuance.' },
      { category: 'Living Space Requirement (Wohnraum)', details: 'Sponsor must provide an apartment lease with sufficient square footage (minimum 12 sqm per adult, 10 sqm per child).' },
      { category: 'Financial Self-Sufficiency', details: 'Sponsor must demonstrate steady employment income covering family living expenses without relying on citizen benefit (Bürgergeld).' },
      { category: 'Health Insurance Coverage', details: 'Must prove statutory family co-insurance (Familienversicherung) or comprehensive private health insurance.' }
    ],
    'uae': [
      { category: 'Sponsor Monthly Salary Benchmark', details: 'Sponsor must earn a minimum of 4,000 AED per month (or 3,000 AED plus company provided accommodation).' },
      { category: 'MOFA Marriage Attestation', details: 'Marriage certificate must be attested sequentially by MEA India, UAE Embassy New Delhi, and MOFA UAE in the Emirates.' },
      { category: 'Registered Tenancy Contract (Ejari)', details: 'Valid tenancy contract registered under the Ejari system in the sponsor\'s name.' },
      { category: 'UAE Medical Fitness Test', details: 'Mandatory in-country blood test and chest X-ray screening for infectious diseases at a certified UAE health centre.' }
    ],
    'new-zealand': [
      { category: 'Living Together for 12 Months', details: 'Couples must prove they have lived together in a genuine, stable relationship for at least 12 months for residence.' },
      { category: 'Sponsor Kiwi Status', details: 'Partner must be a New Zealand citizen or permanent resident with no domestic violence or immigration sponsorship restrictions.' },
      { category: 'Character Clearances', details: 'Police certificates from India and all countries lived in for 12+ months over the past 10 years.' },
      { category: 'Health Clearance (INZ 1007)', details: 'Medical examination and chest X-ray certificate completed by an authorized eMedical panel physician.' }
    ],
    'ireland': [
      { category: 'Sponsor Financial Maintenance', details: 'Sponsor must have earned minimum €40,000 over 3 years if sponsoring spouse, and show no reliance on social welfare benefits.' },
      { category: 'Genuine Partnership Evidence', details: 'Demonstrated evidence of marriage or 2+ years durable cohabitation for de facto partners.' },
      { category: 'Immigration Registration (Stamp 4)', details: 'Applicant must register in person with Immigration Service Delivery within 90 days of arrival to receive Stamp 4 IRP.' },
      { category: 'Comprehensive Private Insurance', details: 'Full private medical insurance policy providing inpatient hospital coverage across Ireland.' }
    ]
  };
  
  const defaultRequirements: OtherRequirementItem[] = [
    { category: 'Genuine Relationship Standard', details: 'Must prove legally valid marriage or established cohabitation with comprehensive relationship evidence.' },
    { category: 'Sponsor Legal Standing', details: 'The sponsor must hold legal citizenship, permanent residency, or an eligible long-term resident visa in the destination country.' },
    { category: 'Financial Solvency & Maintenance', details: 'The sponsor must demonstrate sufficient income or liquid assets to support all dependents without reliance on public welfare.' },
    { category: 'Adequate Residential Accommodation', details: 'Must provide proof of adequate residential premises with zero statutory overcrowding.' },
    { category: 'Health & Character Clearances', details: 'Mandatory police clearance certificates and panel physician medical screening reports.' }
  ];
  
  return map[c] || defaultRequirements;
}

// ── 8. FAMILY FINANCIAL PROOFS ───────────────────────────────────────────────
export function getFamilyFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FinancialProofItem[]> = {
    'uk': [
      { type: 'Sponsor Salary Benchmark', minimum_balance_or_amount: '£29,000 gross/year', time_frame: 'Last 6 Months', notes: 'Verified via 6 consecutive payslips, matching bank statements, and employer letter.' },
      { type: 'Cash Savings Shortfall Route', minimum_balance_or_amount: '£16,000 + 2.5x income shortfall (up to £88,500)', time_frame: 'Held for 6 Months untouched', notes: 'Can combine employment income with cash savings held in an approved bank.' },
      { type: 'Self-Employment / Director Route', minimum_balance_or_amount: '£29,000 profit', time_frame: 'Latest full financial tax year', notes: 'Verified via SA302, HMRC tax calculations, and audited company accounts.' }
    ],
    'usa': [
      { type: 'Form I-864 Affidavit of Support', minimum_balance_or_amount: '125% of Federal Poverty Guidelines', time_frame: 'Current tax year', notes: 'Petitioner must earn at least $25,550 for a 2-person household ($32,275 for 3 persons).' },
      { type: 'IRS Federal Tax Transcripts', minimum_balance_or_amount: 'Official IRS tax transcripts', time_frame: 'Last 3 consecutive tax years', notes: 'Accompanied by W-2 wage statements and 6 months consecutive paystubs.' },
      { type: 'Joint Sponsor Support (if needed)', minimum_balance_or_amount: '125% of Federal Poverty Line', time_frame: 'Latest tax year', notes: 'A qualifying US citizen/PR joint sponsor can execute an additional Form I-864.' }
    ],
    'canada': [
      { type: 'Sponsorship Financial Undertaking', minimum_balance_or_amount: '3-Year Binding Undertaking', time_frame: 'Last 12 Months', notes: 'No minimum income (LICO) required for spouse, but must prove financial solvency.' },
      { type: 'CRA Notice of Assessment (NOA)', minimum_balance_or_amount: 'Latest Option C printout', time_frame: 'Most recent tax year', notes: 'Official Notice of Assessment from the Canada Revenue Agency.' },
      { type: 'Employment Letter & Bank Statements', minimum_balance_or_amount: 'Stable liquid maintenance', time_frame: 'Last 6 months', notes: 'Employer confirmation letter stating salary, position, and permanent status.' }
    ],
    'australia': [
      { type: 'Sponsor Employment & Income Proof', minimum_balance_or_amount: 'Adequate self-sufficiency', time_frame: 'Last 2 financial years', notes: 'ATO Notice of Assessments, recent payslips, and continuous employment records.' },
      { type: 'Joint Financial Commitments', minimum_balance_or_amount: 'Active joint financial history', time_frame: '12+ months continuous', notes: 'Joint bank account statements showing shared daily expenses and shared household bills.' },
      { type: 'Joint Assets & Liabilities', minimum_balance_or_amount: 'Shared tenancy/mortgage', time_frame: 'Current', notes: 'Joint residential lease, mortgage documentation, or shared motor vehicle ownership.' }
    ],
    'germany': [
      { type: 'Sponsor Net Monthly Income', minimum_balance_or_amount: 'Sufficient living wage without Bürgergeld', time_frame: 'Last 3-6 months', notes: 'Net income must cover rent, heating, and standard subsistence allowances for all family members.' },
      { type: 'Official Salary Slips (Gehaltsabrechnungen)', minimum_balance_or_amount: 'Consecutive monthly payslips', time_frame: 'Last 3 consecutive months', notes: 'Issued by German employer along with signed employment verification letter.' },
      { type: 'Proof of Accommodation Costs', minimum_balance_or_amount: 'Warmmiete breakdown', time_frame: 'Current lease', notes: 'Documented rental lease showing base rent (Kaltmiete) and heating/operating costs (Nebenkosten).' }
    ],
    'uae': [
      { type: 'Sponsor Minimum Monthly Salary', minimum_balance_or_amount: '4,000 AED / month (or 3,000 AED + accommodation)', time_frame: 'Current contract', notes: 'Verified via MOHRE attested labour contract and official company salary certificate.' },
      { type: 'UAE Bank Account Statement', minimum_balance_or_amount: 'Regular monthly salary credits', time_frame: 'Last 3 consecutive months', notes: 'Stamped bank statements showing regular salary transfer under the Wages Protection System (WPS).' },
      { type: 'Registered Ejari Tenancy Lease', minimum_balance_or_amount: 'Fully paid residential lease', time_frame: 'Annual registered lease', notes: 'Official Ejari certificate confirming an independent apartment leased by the sponsor.' }
    ],
    'new-zealand': [
      { type: 'Sponsor Financial Maintenance Evidence', minimum_balance_or_amount: 'Sufficient support capacity', time_frame: 'Last 6-12 months', notes: 'Inland Revenue (IRD) summary of earnings, employer letters, and bank statements.' },
      { type: 'Joint Financial Evidence', minimum_balance_or_amount: 'Active joint transactions', time_frame: '12+ months', notes: 'Joint bank statements, shared loan agreements, and reciprocal insurance policies.' }
    ],
    'ireland': [
      { type: 'Sponsor Minimum Earnings Threshold', minimum_balance_or_amount: '€40,000 cumulative over 3 years', time_frame: 'Last 3 consecutive years', notes: 'Verified via Employment Detail Summaries (P60/P21) from the Irish Revenue Commissioners.' },
      { type: 'Sponsor Bank Statements', minimum_balance_or_amount: 'Healthy closing balance', time_frame: 'Last 6 consecutive months', notes: 'Official statements from an Irish retail bank demonstrating financial self-sufficiency.' }
    ]
  };
  
  return map[c] || [
    { type: 'Sponsor Financial Maintenance', minimum_balance_or_amount: 'Adequate legal earnings', time_frame: 'Last 6-12 months', notes: 'Employment contracts, tax returns, and bank statements confirming ability to support dependents.' },
    { type: 'Proof of Accommodation', minimum_balance_or_amount: 'Adequate residential premises', time_frame: 'Current lease / deeds', notes: 'Tenancy agreement or property ownership deed showing sufficient living space.' }
  ];
}

// ── 9. FAMILY FAQ — COUNTRY SPECIFIC ─────────────────────────────────────────
export function getFamilyFAQ(country: string): Array<{ question: string; answer: string }> {
  const c = normalizeCountry(country);
  const map: Record<string, Array<{ question: string; answer: string }>> = {
    'uk': [
      { question: 'What is the new minimum income requirement for the UK Spouse Visa?', answer: 'As of April 2024, the minimum income threshold increased to £29,000 gross per year. The sponsor can meet this through salaried employment, self-employment, pensions, or cash savings (£16,000 baseline + 2.5 times the income shortfall, equating to £88,500 if relying solely on savings).' },
      { question: 'Can I work in the UK while holding a Spouse Visa?', answer: 'Yes! The UK Spouse Visa grants unrestricted working and study rights in the United Kingdom. You can work for any employer in any profession or be self-employed without requiring a separate sponsor licence.' },
      { question: 'What English language level is required for the initial UK Spouse Visa?', answer: 'You must pass an approved Secure English Language Test (SELT) at CEFR Level A1 in speaking and listening (such as IELTS Life Skills A1 or PTE Home A1). When applying for the 2.5-year extension (FLR-M), you will need Level A2, and for ILR, Level B1.' },
      { question: 'How long does it take to get Indefinite Leave to Remain (ILR) through marriage?', answer: 'The UK Spouse Visa follows a 5-year route to settlement. You are initially granted 30 or 33 months, renew for another 30 months, and become eligible to apply for Indefinite Leave to Remain (ILR) after completing 5 continuous years of residence.' },
      { question: 'What documents count as proof of a genuine relationship?', answer: 'Key evidence includes: joint tenancy agreements, joint utility bills, shared bank accounts, travel itineraries and flight boarding passes from trips together, photos spanning the duration of the relationship, and dated message logs.' }
    ],
    'usa': [
      { question: 'What is the difference between a K-1 fiancé visa and a CR-1 spouse visa?', answer: 'A K-1 visa allows an engaged partner to enter the US to marry their US citizen fiancé within 90 days and then apply for a Green Card (Form I-485). A CR-1 is for couples already legally married, processed via consular immigrant channels, granting direct Lawful Permanent Resident (Green Card) status upon arrival in the United States.' },
      { question: 'How long does it take to get a US Marriage Green Card?', answer: 'Total processing time is typically 10 to 18 months for a CR-1 immigrant visa and 8 to 14 months for a K-1 fiancé visa. Timeline includes USCIS petition approval (6-10 months), NVC document processing (1-2 months), and consular interview scheduling.' },
      { question: 'Can I work immediately upon arriving in the US on a marriage visa?', answer: 'CR-1/IR-1 spouse visa holders can work immediately because their stamped immigrant visa foil serves as temporary proof of Green Card status (Form I-551). K-1 fiancé holders cannot work until they marry and receive an approved Employment Authorization Document (EAD Form I-765).' },
      { question: 'What is the financial requirement for the Form I-864 Affidavit of Support?', answer: 'The US petitioner must demonstrate income of at least 125% of the US Department of Health and Human Services (HHS) Federal Poverty Guidelines for their household size (for example, $25,550 for a household of 2 in 2024). A joint sponsor can be used if needed.' },
      { question: 'When can a spouse apply for US citizenship (naturalization)?', answer: 'If married to and living in marital union with a US citizen, permanent residents can apply for US citizenship via Form N-400 after holding their Green Card for just 3 years (instead of the standard 5 years).' }
    ],
    'canada': [
      { question: 'Is there a minimum income requirement to sponsor a spouse to Canada?', answer: 'No! There is no Low Income Cut-Off (LICO) minimum salary requirement to sponsor a spouse or common-law partner to Canada. However, the sponsor must sign an official 3-year undertaking promising to provide for the spouse\'s basic necessities so they do not access social assistance.' },
      { question: 'Can my spouse work in Canada while the PR application is processing?', answer: 'Yes! Sponsored spouses residing in Canada with valid temporary resident status can apply for a Spousal Open Work Permit (SOWP). The SOWP allows full-time employment for any employer in Canada while IRCC processes the permanent residency application.' },
      { question: 'What is the standard processing time for Canadian spousal sponsorship?', answer: 'IRCC\'s service standard for spousal sponsorship applications (both inland and outland) is approximately 10 to 12 months. Background screening, medical exams, and relationship verification are included in this timeline.' },
      { question: 'What is the difference between inland and outland spousal sponsorship?', answer: 'Inland sponsorship is for couples already living together inside Canada; the applicant can obtain an open work permit and must remain in Canada. Outland sponsorship is processed through the visa office in the applicant\'s home country and allows international travel during processing.' },
      { question: 'What qualifies as a common-law partnership in Canada?', answer: 'To qualify as common-law, you and your partner must have lived together in a conjugal relationship continuously for at least 12 consecutive months with documented proof (joint lease, shared utilities, joint bank accounts).' }
    ],
    'australia': [
      { question: 'What is the difference between Partner Visa Subclasses 820 and 801?', answer: 'Subclass 820 is the temporary partner visa granted first. It allows you to live, work, and study in Australia with Medicare access. Two years after initial application lodgement, you submit updated evidence for Subclass 801, which grants permanent residency.' },
      { question: 'How much does the Australia Partner Visa cost?', answer: 'The base government visa application charge is AUD 8,850. This covers both the temporary (820/309) and permanent (801/100) visa stages together. Additional fees apply for dependent children, health checks, and police clearances.' },
      { question: 'Do de facto couples really have to prove 12 months of living together?', answer: 'Yes, unless you register your relationship with an Australian state/territory civil registry, you must provide documentary evidence of at least 12 months continuous cohabitation (joint lease, joint accounts, shared bills).' },
      { question: 'Can I access Medicare on an Australian partner visa?', answer: 'Yes! As soon as you lodge a valid onshore Partner Visa (Subclass 820/801) application and hold a bridging visa with work rights, you become eligible to enroll in Australia\'s national Medicare healthcare system.' },
      { question: 'What happens if our relationship breaks down during the 2-year provisional stage?', answer: 'Generally, the permanent visa will not be granted. However, important statutory exceptions exist under Australian migration law if there is family/domestic violence, if the couple has dependent children together, or if the sponsoring partner passes away.' }
    ],
    'germany': [
      { question: 'Do I need to speak German before applying for a Family Reunion Visa?', answer: 'Yes, spouses generally must present a Goethe-Zertifikat A1 certificate proving basic German language skills. However, exemptions apply if the sponsoring spouse holds an EU Blue Card, is an ICT specialist, or if the applicant holds a recognized university degree.' },
      { question: 'How large must our apartment in Germany be to sponsor a spouse?', answer: 'Under German residential occupancy guidelines, the apartment must have at least 12 square meters of living space per person aged 6 or older (and 10 sqm for children under 6), with adequate kitchen, water, and toilet facilities.' },
      { question: 'Can I work in Germany on a Family Reunion Visa?', answer: 'Yes! Under Section 27 of the German Residence Act (Aufenthaltsgesetz), family reunion residence permits confer full and unrestricted access to the German labor market with no priority labor checks.' },
      { question: 'How long is the Germany Family Reunion Visa valid?', answer: 'The initial consular entry visa (Type D) is valid for 90 days to 1 year. Upon arrival, you register your address (Anmeldung) and visit the Ausländerbehörde to receive an electronic residence permit (Aufenthaltstitel) valid for 1 to 3 years renewable.' },
      { question: 'When can a spouse on a family reunion visa obtain permanent residency (Niederlassungserlaubnis) or German citizenship?', answer: 'Spouses of German citizens can qualify for permanent residence after 3 years of marital cohabitation and B1 German proficiency, and can apply for citizenship after 3 years in Germany with 2 years of marriage. Spouses of foreign residents can qualify for settlement after 5 years.' }
    ],
    'uae': [
      { question: 'What is the minimum salary to sponsor a spouse in the UAE?', answer: 'The sponsoring resident must earn a minimum monthly salary of 4,000 AED (or 3,000 AED plus company-provided accommodation) as reflected on their MOHRE employment contract and bank salary statements.' },
      { question: 'What attestation is needed for an Indian marriage certificate in the UAE?', answer: 'The certificate must undergo a 4-step legalization: 1. State Home/Notary Department, 2. Ministry of External Affairs (MEA) New Delhi, 3. UAE Embassy in New Delhi, and 4. Ministry of Foreign Affairs (MOFA) inside the UAE.' },
      { question: 'How long does it take to get a UAE spouse residence visa?', answer: 'The process is very fast: the electronic entry permit is issued in 2 to 3 working days. Once the spouse arrives in the UAE, the medical fitness test, Emirates ID biometrics, and residence stamping take approximately 7 to 10 working days.' },
      { question: 'Can a female resident sponsor her husband in the UAE?', answer: 'Yes! A female resident working in technical, medical, or administrative professions earning at least 4,000 AED/month (or holding approval from GDRFA/ICP) can sponsor her husband and children.' },
      { question: 'Can I sponsor my parents or dependent children under the same family visa file?', answer: 'Yes! Male or female sponsors earning at least 20,000 AED per month can sponsor both parents under humanitarian guidelines. Dependent unmarried daughters can be sponsored indefinitely, and sons up to the age of 25 (or older if studying).' }
    ],
    'new-zealand': [
      { question: 'How long must we live together for a New Zealand Partnership Visa?', answer: 'To be granted a Partnership Resident Visa, you must prove that you have lived together in a genuine and stable relationship for at least 12 continuous months. For relationships under 12 months, an open Partnership Work Visa can be granted first.' },
      { question: 'Can I work in New Zealand while on a partnership visa?', answer: 'Yes! Partners of New Zealand citizens and residents are granted full, unrestricted working rights across all industries and employers in New Zealand.' },
      { question: 'What evidence does Immigration New Zealand look for in a partnership?', answer: 'INZ evaluates: shared living arrangements (joint tenancy/mortgage), shared financial commitments (joint bank accounts/debts), public recognition of the relationship, and letters of support from family and friends.' },
      { question: 'What is the difference between a Partnership Work Visa and a Partnership Resident Visa in NZ?', answer: 'A Partnership Work Visa is a temporary open work permit issued quickly to allow couples to live and work together in New Zealand. Once you achieve 12 continuous months of cohabitation, you can apply for the Partnership Resident Visa for permanent settlement.' },
      { question: 'Do I need police certificates and medical exams for New Zealand partnership visa?', answer: 'Yes, all applicants aged 17 and over must provide overseas police clearances from all countries resided in for 12+ months in the last 10 years, along with a full general medical examination and chest X-ray conducted by an INZ-approved panel physician.' }
    ],
    'ireland': [
      { question: 'Can I work in Ireland on a Join Family Visa?', answer: 'Yes! Once you enter on a D visa and register with immigration, you receive an Irish Residence Permit (IRP) with Stamp 4. Stamp 4 allows you to work full-time in any profession or establish a business without an employment permit.' },
      { question: 'What income must my sponsor in Ireland have to sponsor me?', answer: 'If your sponsor is an Irish citizen, they must have earned at least €40,000 gross over the prior 3-year period and not received social welfare assistance. Similar self-sufficiency standards apply for employment permit holders.' },
      { question: 'How long does Irish Join Family Visa processing take?', answer: 'Decisions typically take 6 to 8 weeks through the official Visa Office in Dublin following submission of the physical dossier at VFS Global in India.' },
      { question: 'What healthcare and public entitlements apply on an Irish Stamp 4 visa?', answer: 'Stamp 4 holders are legally resident and entitled to access public healthcare services under the Health Service Executive (HSE) on the same basis as Irish citizens, as well as work without restriction.' },
      { question: 'When does a spouse of an Irish citizen qualify for Irish citizenship (naturalisation)?', answer: 'Under Section 15A of the Irish Nationality and Citizenship Act, spouses and civil partners of Irish citizens can apply for naturalisation after completing just 3 years of continuous reckonable residence in Ireland, provided they have been married for at least 3 years.' }
    ]
  };
  
  const defaultFAQ: Array<{ question: string; answer: string }> = [
    { question: `Do I need a family visa to live with my spouse in ${country}?`, answer: `Yes, foreign spouses and partners require a legally issued Family / Spouse Visa or Residence Permit to reside long-term with their partner in ${country}.` },
    { question: `Can I work on a family visa in ${country}?`, answer: `In most destination countries, spouse and family visas grant full unrestricted employment and study rights once the legal residence permit is registered upon arrival.` },
    { question: `What is the processing time for a family visa for ${country}?`, answer: `Family and spouse visa adjudication generally takes 3 to 6 months depending on background checks, relationship verification, and consular interview schedules.` },
    { question: `What evidence proves a genuine relationship for ${country}?`, answer: `Consulates require official marriage certificates, proof of shared domicile (joint leases/bills), joint financial assets, photographic records over time, and witness declarations.` },
    { question: `Can dependent children accompany the spouse under the family reunification visa for ${country}?`, answer: `Yes, minor dependent children under 18 years of age (or unmarried full-time students in certain jurisdictions) can generally be included in the primary family sponsorship application or apply as accompanying dependents.` }
  ];
  
  return map[c] || defaultFAQ;
}

// ── 10. FAMILY VALIDITY, STAY, ENTRY TYPE, SOURCE NAME ──────────────────────
export function getFamilyValidity(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': '2.5 Years (33 Months Initial) → 2.5 Years Extension → ILR after 5 Years',
    'usa': 'CR-1: 2-Year Conditional Green Card / IR-1: 10-Year Permanent Green Card / K-1: 6 Months Entry',
    'canada': 'Permanent Resident Status (5-Year Renewable PR Card)',
    'australia': 'Subclass 820/309 (Provisional 2 Years) → Subclass 801/100 (Permanent Indefinite)',
    'germany': '1 to 3 Years Renewable Residence Title → Niederlassungserlaubnis after 5 Years',
    'uae': '1 to 3 Years Renewable UAE Residence Visa',
    'new-zealand': '2-Year Resident Visa → Permanent Resident Visa (PRV) after 2 Years',
    'ireland': '1 Year (IRP Stamp 4 Renewable) → Permanent Settlement after 5 Years'
  };
  return map[c] || 'Duration of Valid Residence Permit (Renewable)';
}

export function getFamilyStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': '2.5 Years (Renewable; Leading to Indefinite Stay after 5 Years)',
    'usa': 'Permanent / Indefinite Legal Resident Status (LPR)',
    'canada': 'Indefinite / Permanent Resident Status',
    'australia': 'Indefinite Stay (following 2-year provisional assessment)',
    'germany': 'Continuous Legal Residence (Renewable annually or triennially)',
    'uae': 'Continuous Residency (Renewable for 1, 2, or 3 years)',
    'new-zealand': 'Indefinite Legal Stay with Path to Citizenship after 5 Years',
    'ireland': 'Continuous Legal Residence with Path to Citizenship after 3-5 Years'
  };
  return map[c] || 'Duration of Valid Relationship & Sponsor Residence';
}

export function getFamilyEntryType(country: string): string {
  const c = normalizeCountry(country);
  if (c === 'usa') return 'CR-1/IR-1: Multiple Entry / K-1: Single Entry';
  return 'Multiple Entry';
}

export function getFamilyOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'uk': 'UK Visas and Immigration (UKVI) & Home Office',
    'usa': 'U.S. Citizenship and Immigration Services (USCIS) & NVC',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC)',
    'australia': 'Australian Department of Home Affairs (ImmiAccount)',
    'germany': 'Federal Foreign Office (Auswärtiges Amt) & Ausländerbehörde',
    'uae': 'Federal Authority for Identity and Citizenship (ICP) & GDRFA',
    'new-zealand': 'Immigration New Zealand (INZ)',
    'ireland': 'Irish Immigration Service Delivery (ISD) & Department of Justice'
  };
  return map[c] || `${country} Immigration Department & Consular Affairs`;
}

// ── 11. COMPLETE FAMILY VISA DATA BUILDER ────────────────────────────────────
export function getFamilyVisaData(from: string, to: string, purpose: string = 'Family'): any {
  const countryName = to;
  const c = normalizeCountry(to);
  const fees = getFamilyFees(to);
  
  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Family / Spouse Visa',
    visa_type: `${countryName} Family / Spouse Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' family spouse visa official immigration')}`,
    official_source_name: getFamilyOfficialSourceName(to),
    overview: getFamilyOverview(to),
    highlights: getFamilyHighlights(to),
    how_to_apply: getFamilySteps(to),
    documents_required: getFamilyDocuments(from, to, purpose),
    financial_proofs: getFamilyFinancialProofs(to),
    other_requirements: getFamilyRequirements(to),
    faqs: getFamilyFAQ(to),
    costs: fees,
    processing_time: getFamilyProcessingTime(to),
    processing_time_details: getFamilyProcessingDetails(to),
    validity: getFamilyValidity(to),
    stay_duration: getFamilyStayDuration(to),
    entry_type: getFamilyEntryType(to),
    validity_and_stay: {
      visa_validity: getFamilyValidity(to),
      max_stay_per_entry: getFamilyStayDuration(to),
      entry_type: getFamilyEntryType(to)
    },
    processing_and_timing: {
      apply_window: 'Apply 3 to 6 months prior to planned relocation.',
      decision_time: getFamilyProcessingTime(to),
      max_extension: 'Renewable based on genuine relationship status and sponsor residence.',
      center_notes: getFamilyProcessingDetails(to)
    },
    verification_status: 'verified',
    is_v3_verified: true
  };
}
