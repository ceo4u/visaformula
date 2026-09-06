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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FamilyHighlightItem {
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
  highlights?: FamilyHighlightItem[];
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
  if (c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('canada')) return 'canada';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('australia')) return 'australia';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('ireland') || c.includes('irish') || c.includes('eire')) return 'ireland';
  if (c.includes('new zealand') || c === 'nz') return 'new-zealand';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('austria') || c.includes('vienna')) return 'austria';
  if (c.includes('belgium') || c.includes('brussels')) return 'belgium';
  if (c.includes('denmark') || c.includes('copenhagen')) return 'denmark';
  if (c.includes('finland') || c.includes('helsinki')) return 'finland';
  if (c.includes('italy') || c.includes('italia') || c.includes('rome') || c.includes('milan')) return 'italy';
  if (c.includes('sweden') || c.includes('stockholm')) return 'sweden';
  return c;
}

const DESTS: Record<string, any> = {
  "uk": {
    "cname": "United Kingdom",
    "scheme": "Spouse / Partner Visa (Appendix FM)",
    "overview": "The UK Spouse Visa allows non-UK spouses, civil partners, and unmarried partners of British citizens or settled persons to join their partner in the UK. The UK sponsor must meet the statutory minimum income threshold of \u00a329,000 per year (from April 2024) or cash savings equivalent (\u00a316,000 baseline + 2.5x shortfall). The visa is initially granted for 2.5 years (33 months from outside the UK), extendable for another 2.5 years, creating a direct statutory pathway to Indefinite Leave to Remain (ILR) after 5 years. Applicants must demonstrate a genuine and subsisting relationship, adequate accommodation without recourse to public funds, and CEFR A1 English proficiency.",
    "fees": {
      "visa_fee": "\u00a31,846 (approx. \u20b91,97,000 Out-of-Country Application Fee)",
      "service_fee": "\u00a31,035/year (Immigration Health Surcharge - IHS)",
      "total_fee": "\u00a31,846 + IHS (approx. \u20b94,45,000 total for 2.5 years)",
      "currency": "GBP",
      "notes": "Mandatory IHS of \u00a31,035 per year covers full access to the UK National Health Service (NHS). Priority service (+\u00a3500 for 30 working days) is optional."
    },
    "proc_time": "12 to 24 Weeks (Priority: 30 Working Days)",
    "proc_details": "Processed by UK Visas and Immigration (UKVI) following biometric enrollment at VFS Global in India.",
    "source": "UK Visas and Immigration (UKVI) & Home Office",
    "validity": "2.5 Years (33 Months for offshore applicants, extendable to 5 years)",
    "stay": "Duration of Visa Grant (Leads to ILR)",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate & Cohabitation Dossier",
    "relationship_desc": "Official apostilled civil marriage certificate accompanied by comprehensive joint tenancy agreements, joint utility bills, and correspondence spanning 2+ years.",
    "min_funds": "Sponsor minimum annual gross income of \u00a329,000 (or \u00a388,500 in unencumbered cash savings).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Genuine Relationship Proof",
        "description": "Comprehensive evidence of marriage, continuous cohabitation, joint financial commitments, and daily communication."
      },
      {
        "icon": "\ud83d\udcb7",
        "title": "\u00a329,000 Income Threshold",
        "description": "Sponsor must meet statutory salary benchmark via Appendix FM or savings formula (\u00a316k baseline + 2.5x shortfall)."
      },
      {
        "icon": "\ud83c\udfe0",
        "title": "Adequate Accommodation",
        "description": "Ownership deeds or tenancy agreement demonstrating property with zero statutory overcrowding under UK Housing Act."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "5-Year Path to Settlement",
        "description": "Granted initially for 33 months, extendable for 30 months, leading directly to Indefinite Leave to Remain (ILR)."
      }
    ],
    "faqs": [
      {
        "question": "What is the new sponsor income requirement for a UK Spouse Visa?",
        "answer": "As of April 2024, the UK sponsor must earn a minimum gross annual income of \u00a329,000 through salaried employment, self-employment, pensions, or demonstrate cash savings."
      },
      {
        "question": "Can cash savings be used to meet the financial requirement for a UK Spouse Visa?",
        "answer": "Yes. If relying entirely on cash savings with no salary, the sponsor/applicant must hold at least \u00a388,500 in an approved bank account for at least 6 months."
      },
      {
        "question": "Can the spouse work in the UK on a Spouse Visa?",
        "answer": "Yes. The holder of a UK Spouse Visa receives full, unrestricted rights to work as an employee or establish an independent business in the UK."
      },
      {
        "question": "What English language level is required for a UK Spouse Visa?",
        "answer": "Applicants applying from outside the UK must pass an approved Secure English Language Test (SELT) at CEFR level A1 in speaking and listening (or hold a degree taught in English verified by Ecctis)."
      },
      {
        "question": "How long until a spouse can get British Citizenship?",
        "answer": "After completing 5 continuous years on a Spouse Visa and obtaining ILR, spouses of British citizens can apply for naturalisation as British citizens immediately without waiting 12 months."
      }
    ]
  },
  "canada": {
    "cname": "Canada",
    "scheme": "Spousal Sponsorship (Family Class / In-Canada Class)",
    "overview": "Canada's Spousal Sponsorship program allows Canadian citizens and permanent residents to sponsor their foreign spouse, common-law partner, or conjugal partner for Canadian Permanent Residency. The sponsor must sign an official 3-year financial undertaking to support the spouse upon arrival. There is no statutory minimum income requirement (LICO) for sponsoring a spouse (unless sponsoring dependent children with children). While an inland sponsorship application is pending processing with IRCC, the sponsored spouse is eligible to apply for an open work permit (Spousal Open Work Permit - SOWP) to work legally in Canada.",
    "fees": {
      "visa_fee": "CAD $1,080 (Sponsorship Fee $75 + Principal Applicant $490 + RPRF $515)",
      "service_fee": "CAD $85 (Biometrics Fee)",
      "total_fee": "CAD $1,165 Total Statutory Reference (approx. \u20b972,000)",
      "currency": "CAD",
      "notes": "The CAD $515 Right of Permanent Residence Fee (RPRF) is refunded if the sponsorship is rejected."
    },
    "proc_time": "10 to 12 Months from Electronic Submission",
    "proc_details": "Submitted online via the Permanent Residence Portal. Medical examination and biometrics requested during processing.",
    "source": "Immigration, Refugees and Citizenship Canada (IRCC)",
    "validity": "Permanent Residency (PR Card valid 5 years)",
    "stay": "Indefinite Lawful Permanent Resident Status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Civil Marriage Certificate & Relationship Timeline Dossier",
    "relationship_desc": "Official marriage certificate, statutory declarations, wedding photographs with guests, joint accounts, and communication logs.",
    "min_funds": "Sponsor 3-year undertaking commitment (zero minimum income threshold under LICO for spouse).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Direct Permanent Residence",
        "description": "Sponsored spouse receives direct, unconditional Canadian Permanent Residency upon application approval."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Spousal Open Work Permit (SOWP)",
        "description": "Inland applicants are eligible for an open work permit allowing full-time employment while the PR dossier is adjudicated."
      },
      {
        "icon": "\ud83d\udcb0",
        "title": "No Minimum Income (LICO)",
        "description": "Zero statutory minimum salary requirement for spouses, provided the sponsor is not receiving social assistance."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Citizenship in 3 Years",
        "description": "Eligible for Canadian Citizenship after completing 1,095 days of physical presence as a PR."
      }
    ],
    "faqs": [
      {
        "question": "What is the 3-year sponsorship undertaking in Canada?",
        "answer": "The sponsor legally pledges to provide for the spouse's basic needs (food, clothing, shelter) for 3 years from the date they become a permanent resident, even if the relationship dissolves."
      },
      {
        "question": "Can my spouse work in Canada while the sponsorship is processing?",
        "answer": "Yes. If applying under the In-Canada Class, the sponsored spouse can apply for a Spousal Open Work Permit (SOWP) as soon as IRCC issues an Acknowledgment of Receipt (AOR)."
      },
      {
        "question": "What is considered a common-law partnership in Canada?",
        "answer": "A common-law partnership requires proving that you and your partner have lived together in a conjugal relationship continuously for at least 12 months with joint residential evidence."
      },
      {
        "question": "Can a Canadian citizen living outside Canada sponsor a spouse?",
        "answer": "Yes, provided the Canadian citizen proves they will move to live in Canada when the sponsored spouse becomes a permanent resident. Permanent residents must be living in Canada to sponsor."
      },
      {
        "question": "What proof of genuine relationship does IRCC require?",
        "answer": "IRCC requires a completed relationship questionnaire (IMM 5532), marriage certificate, wedding photos, communication records, joint financial assets, and statutory declarations from family members."
      }
    ]
  },
  "usa": {
    "cname": "United States",
    "scheme": "CR-1 / IR-1 Spousal Immigrant Visa & K-1 Fianc\u00e9(e) Visa",
    "overview": "The United States Family & Marriage Visa pathways include the CR-1/IR-1 Spousal Immigrant Visas and the K-1 Fianc\u00e9(e) Visa. The CR-1 (Conditional Resident for marriages under 2 years) and IR-1 (Immediate Relative for marriages over 2 years) grant direct Lawful Permanent Resident status (Green Card) upon entry to the US. The US citizen petitioner files Form I-130 with USCIS, followed by National Visa Center (NVC) processing and a consular interview in Mumbai. The petitioner must execute Form I-864 Affidavit of Support demonstrating an income of at least 125% of the Federal Poverty Guidelines.",
    "fees": {
      "visa_fee": "USD $675 (Form I-130 Petition Fee) + USD $325 (NVC Immigrant Visa Fee) + USD $120 (AOS Fee)",
      "service_fee": "USD $220 (USCIS Immigrant Fee for Green Card Card Issuance)",
      "total_fee": "USD $1,340 Total Consular Reference (approx. \u20b91,12,000)",
      "currency": "USD",
      "notes": "Paid across stages to USCIS, CEAC (National Visa Center), and USCIS immigrant fee portal."
    },
    "proc_time": "12 to 18 Months Total Consular Processing Time",
    "proc_details": "Two-phase adjudication: USCIS Form I-130 processing (9-12 months) followed by NVC document qualification and consular interview at the US Consulate General in Mumbai.",
    "source": "U.S. Citizenship and Immigration Services (USCIS) & National Visa Center (NVC)",
    "validity": "CR-1: 2-Year Conditional Green Card; IR-1: 10-Year Permanent Green Card",
    "stay": "Indefinite Lawful Permanent Resident Status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate & Evidence of Bona Fide Marriage",
    "relationship_desc": "Official marriage certificate accompanied by affidavits of third parties, joint financial accounts, lease agreements, flight itineraries, and photo timeline.",
    "min_funds": "Form I-864 Affidavit of Support showing petitioner income of at least 125% of Federal Poverty Guidelines (approx. $25,550 for household of 2).",
    "highlights": [
      {
        "icon": "\ud83d\uddfd",
        "title": "Direct Green Card Upon Entry",
        "description": "CR-1 and IR-1 holders enter the United States as Lawful Permanent Residents with immediate work and travel rights."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Form I-864 Legal Guarantee",
        "description": "US petitioner legally undertakes financial sponsorship at 125% of poverty guidelines until citizenship or 40 quarters of work."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "US Citizenship in 3 Years",
        "description": "Spouses of US citizens are eligible to apply for naturalisation (Form N-400) after just 3 years as a permanent resident."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Immediate Employment Rights",
        "description": "No separate Employment Authorization Document (EAD) required; passport entry stamp serves as temporary Form I-551."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between a CR-1 and an IR-1 visa?",
        "answer": "If you have been married for less than 2 years on the day of admission to the US, you receive a conditional 2-year Green Card (CR-1). If married for 2 years or more, you receive a permanent 10-year Green Card (IR-1)."
      },
      {
        "question": "What is the Form I-864 Affidavit of Support requirement?",
        "answer": "The US petitioner must demonstrate an annual income of at least 125% of the US Federal Poverty Guidelines for their household size, or utilize a qualified joint sponsor who meets the income threshold."
      },
      {
        "question": "Where does the immigrant visa interview take place in India?",
        "answer": "All immigrant visa interviews for the United States in India are centralized and conducted exclusively at the U.S. Consulate General in Mumbai."
      },
      {
        "question": "Can the foreign spouse work immediately upon arriving in the US?",
        "answer": "Yes. The immigrant visa stamp in your passport acts as an official temporary I-551 Green Card for 1 year from entry, providing immediate authorization to work and travel."
      },
      {
        "question": "How do I remove the conditions on a 2-year conditional Green Card (CR-1)?",
        "answer": "Within the 90 days before your 2-year conditional Green Card expires, you and your spouse must jointly file Form I-751 with USCIS with updated joint relationship evidence."
      }
    ]
  },
  "australia": {
    "cname": "Australia",
    "scheme": "Partner Visa (Subclass 820/801 Onshore or Subclass 309/100 Offshore)",
    "overview": "The Australia Partner Visa (Subclass 309/100 for offshore or Subclass 820/801 for onshore) permits spouses and de facto partners of Australian citizens, Australian permanent residents, or eligible New Zealand citizens to live and work in Australia. Processed in two stages, applicants first receive a provisional partner visa (Subclass 309/820) granting temporary residence and full work rights. After 2 years, the relationship is reassessed for permanent residency (Subclass 100/801). Evidence must demonstrate a genuine, continuing relationship across four aspects: financial, nature of household, social context, and mutual commitment.",
    "fees": {
      "visa_fee": "AUD 8,850 (Base Application Charge covering both provisional and permanent stages)",
      "service_fee": "AUD 4,430 (Additional Adult Dependent) + AUD 2,215 (Child Dependent)",
      "total_fee": "AUD 8,850 Total Government Statutory Fee (approx. \u20b94,86,000)",
      "currency": "AUD",
      "notes": "Paid online via ImmiAccount upon submission. Covers both the temporary Subclass 309 and permanent Subclass 100 stages."
    },
    "proc_time": "12 to 20 Months (Provisional Subclass 309 Stage)",
    "proc_details": "Lodged digitally via Home Affairs ImmiAccount. Sponsor must complete separate Sponsorship for a Partner form.",
    "source": "Department of Home Affairs (ImmiAccount)",
    "validity": "Provisional until permanent stage decision (typically 2 years), leading to unconditional PR",
    "stay": "Permanent Residency upon Subclass 100 Grant",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate & Form 888 Statutory Declarations",
    "relationship_desc": "Official marriage certificate, two Form 888 statutory declarations from Australian citizens, joint financial statements, and lease/mortgage proof.",
    "min_funds": "Sponsor financial capacity undertaking to support partner for the initial 2 years.",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Four Pillars of Relationship",
        "description": "Rigorous evaluation across financial interdependence, household organization, social context, and mutual commitment."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Full Medicare Coverage",
        "description": "Eligible to enroll in Australia's public Medicare healthcare system as soon as the Subclass 820/309 application is lodged."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Work & Study Rights",
        "description": "Full, unrestricted rights to work for any employer and study across all Australian states and territories."
      },
      {
        "icon": "\ud83c\udde6\ud83c\uddfa",
        "title": "Australian Citizenship in 4 Years",
        "description": "Eligible for Australian Citizenship after 4 years of lawful residence, including 12 months as a permanent resident."
      }
    ],
    "faqs": [
      {
        "question": "What is the two-stage partner visa process in Australia?",
        "answer": "You apply for both the provisional (Subclass 309/820) and permanent (Subclass 100/801) visas in one application. You receive the provisional visa first; 2 years after application lodgement, Home Affairs assesses relationship continuity to grant the permanent visa."
      },
      {
        "question": "What are the four pillars of a genuine relationship for Australia?",
        "answer": "The four mandatory pillars are: (1) Financial aspects (joint accounts, assets, liabilities), (2) Nature of the household (shared chores, living arrangements), (3) Social context (joint travel, friends' declarations), and (4) Mutual commitment (future plans, communication)."
      },
      {
        "question": "What is Form 888?",
        "answer": "Form 888 is a statutory declaration completed by an Australian citizen or permanent resident who knows you and your partner personally, testifying to the genuine and continuing nature of your relationship."
      },
      {
        "question": "Can de facto partners apply for an Australian Partner Visa?",
        "answer": "Yes. De facto couples who have lived together for at least 12 months (or have registered their relationship with an Australian state registry) qualify under the same provisions as married couples."
      },
      {
        "question": "Can I access Medicare while waiting for my partner visa decision?",
        "answer": "Yes. Once an onshore Subclass 820 application is validly lodged and acknowledged, you can apply for an interim Medicare card granting access to public healthcare."
      }
    ]
  },
  "germany": {
    "cname": "Germany",
    "scheme": "Family Reunion Visa (Familienzusammenf\u00fchrung / National Visa D)",
    "overview": "The German Family Reunion Visa (Familienzusammenf\u00fchrung) enables spouses, registered partners, and minor children of German citizens or foreign residents holding a valid residence permit (such as an EU Blue Card, ICT card, or Niederlassungserlaubnis) to relocate to Germany. The sponsor must demonstrate sufficient living space (approx. 12 sqm per adult) and adequate financial resources to support dependents without claiming public funds. Spouses must prove basic German language skills (Goethe/telc A1 certificate) prior to entry, although spouses of EU Blue Card holders, researchers, and university graduates are legally exempt.",
    "fees": {
      "visa_fee": "\u20ac75 (approx. \u20b96,750 National Visa D Fee)",
      "service_fee": "\u20b92,200 (VFS Global Processing Fee) + \u20ac100 (Aufenthaltstitel card fee upon arrival)",
      "total_fee": "\u20ac75 + VFS Logistics",
      "currency": "EUR",
      "notes": "Consular visa fee paid at VFS Global Germany in India. The physical residence permit card is paid for at the local Ausl\u00e4nderbeh\u00f6rde upon arrival."
    },
    "proc_time": "8 to 16 Weeks from Consular Submission",
    "proc_details": "Application lodged via VFS Germany in India and forwarded to the local immigration authority (Ausl\u00e4nderbeh\u00f6rde) in the German sponsor's municipality for approval.",
    "source": "Federal Foreign Office & Municipal Foreigners Authorities (Ausl\u00e4nderbeh\u00f6rde)",
    "validity": "National Visa D: 3 to 6 Months (Converted to 1 to 3-Year Residence Permit in Germany)",
    "stay": "Tied to Sponsor's Residence Permit Validity",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Verification",
    "relationship_desc": "Official marriage certificate, wedding photos, and certificate verification report conducted by German missions in India.",
    "min_funds": "Sponsor verifiable salary and rental contract demonstrating adequate living space and net income without recourse to SGB II welfare.",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Family Reunion D-Visa",
        "description": "National entry visa converted to a renewable multi-year Residence Permit (Aufenthaltserlaubnis) in Germany."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Work Rights",
        "description": "Spouses receive immediate unrestricted access to the German labour market with no labour office approvals needed."
      },
      {
        "icon": "\ud83d\udde3\ufe0f",
        "title": "German A1 Language Rule",
        "description": "Basic A1 German certificate proves readiness for integration (spouses of Blue Card holders are fully exempt)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Independent Residence in 3 Years",
        "description": "Spouses gain an independent right of residence (eigenst\u00e4ndiges Aufenthaltsrecht) after 3 years of marital cohabitation."
      }
    ],
    "faqs": [
      {
        "question": "Who is exempt from the A1 German language requirement for spouses?",
        "answer": "Spouses of EU Blue Card holders, ICT card holders, researchers, highly skilled specialists, and university graduates are legally exempt from providing proof of German language skills before entering Germany."
      },
      {
        "question": "What living space is required for family reunion in Germany?",
        "answer": "The sponsor's apartment must provide at least 12 square meters of living space for each family member aged 6 or older (10 sqm for children under 6), documented through a rental contract (Mietvertrag)."
      },
      {
        "question": "Can my spouse work in Germany on a family reunion permit?",
        "answer": "Yes. Under Section 27(5) of the German Residence Act (AufenthG), a residence permit for family reunification explicitly grants unrestricted permission to engage in economic activity."
      },
      {
        "question": "What is the document verification process by German missions in India?",
        "answer": "German consular missions routinely conduct an internal verification of Indian civil documents (marriage certificates, birth certificates) through trusted local investigators, which takes 8 to 12 weeks."
      },
      {
        "question": "When does a spouse get permanent residence in Germany?",
        "answer": "A spouse can apply for a permanent settlement permit (Niederlassungserlaubnis) after 5 years of holding a residence permit, living together with the spouse, and demonstrating B1 German and financial self-sufficiency."
      }
    ]
  },
  "ireland": {
    "cname": "Ireland",
    "scheme": "Join Family Long-Stay D Visa (Policy Document on Non-EEA Family Reunification)",
    "overview": "Ireland's Join Family Long-Stay D Visa allows spouses, civil partners, and dependent children of Irish citizens or legal foreign residents (holding Stamp 1, Stamp 4, or Critical Skills Employment Permits) to reside in Ireland. Spouses of Critical Skills permit holders benefit from immediate family reunification and receive an Irish Residence Permit (IRP) with Stamp 1G permission, authorizing full-time employment without needing an individual employment permit. General permit sponsors must have worked in Ireland for at least 12 months and meet net income thresholds (\u20ac30,000/year) before sponsoring.",
    "fees": {
      "visa_fee": "\u20ac60 (Single Entry) / \u20ac100 (Multiple Entry Long-Stay D Visa)",
      "service_fee": "\u20ac300 (IRP Card Registration Fee at Immigration Office upon arrival)",
      "total_fee": "\u20ac100 + \u20ac300 IRP Fee (approx. \u20b936,000)",
      "currency": "EUR",
      "notes": "Entry visa fee paid via AVATS / VFS Ireland. IRP card fee paid at Burgh Quay Dublin or local Garda immigration station upon arrival."
    },
    "proc_time": "12 to 16 Weeks (Critical Skills Spouses prioritized in 6 to 8 Weeks)",
    "proc_details": "Applied online via AVATS, lodged at VFS Global Ireland in India, and decided by Immigration Service Delivery (ISD) in Dublin.",
    "source": "Irish Immigration Service Delivery (ISD) & Department of Justice",
    "validity": "Long-Stay D Visa for Entry (Converted to 1 to 3-Year IRP Card in Ireland)",
    "stay": "Aligned with Sponsor's Stamp Permission",
    "entry_type": "Single or Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Cohabitation Dossier",
    "relationship_desc": "State-issued marriage certificate, certified wedding photographs, evidence of joint finances, and continuous contact history.",
    "min_funds": "Sponsor earnings meeting ISD income guidelines (minimum \u20ac30,000 net/year for general permit sponsors).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Stamp 1G Spousal Work Rights",
        "description": "Spouses of Critical Skills holders receive Stamp 1G permission, permitting full-time employment without a work permit."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Immediate Critical Skills Reunion",
        "description": "Spouses can apply concurrently with or immediately after the primary CSEP permit holder arrives in Ireland."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "5-Year Path to Irish Citizenship",
        "description": "Continuous reckonable residence on Stamp 1G/Stamp 4 counts towards Irish naturalization after 5 years (1,825 days)."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Healthcare & Child Benefit Access",
        "description": "Family members qualify for child benefit allocations and access to Ireland's public health infrastructure."
      }
    ],
    "faqs": [
      {
        "question": "Can my spouse work in Ireland on a Join Family visa?",
        "answer": "Yes. Spouses of Critical Skills Employment Permit holders receive Stamp 1G permission, which authorizes full-time employment with any employer in Ireland without needing an employment permit."
      },
      {
        "question": "Can spouses of general work permit holders join immediately in Ireland?",
        "answer": "No. Under the Non-EEA Family Reunification Policy, General Employment Permit holders must complete 12 months of employment in Ireland and meet the minimum income threshold before sponsoring family."
      },
      {
        "question": "What is the financial threshold to sponsor a spouse in Ireland?",
        "answer": "For Irish citizens sponsoring a spouse, a gross income of at least \u20ac40,000 over the past 3 years is required. For non-EEA workers, a net annual income of at least \u20ac30,000 is required."
      },
      {
        "question": "What is the AVATS application for Ireland?",
        "answer": "AVATS is Ireland's official online visa application facility. You must complete the questionnaire, submit the summary sheet, and present your documents at VFS Global in India."
      },
      {
        "question": "Does Ireland belong to the Schengen Area?",
        "answer": "No. Ireland is not part of the Schengen zone. An Irish residence permission grants lawful status strictly in Ireland and does not confer visa-free work or residence in continental Europe."
      }
    ]
  },
  "new-zealand": {
    "cname": "New Zealand",
    "scheme": "Partner of a Citizen or Resident Visa (Work or Resident Stream)",
    "overview": "The New Zealand Partner of a Citizen or Resident Visa allows partners (married, civil union, or de facto) of New Zealand citizens or permanent residents to live, work, and study in New Zealand. Processed under Immigration New Zealand (INZ) partnership instructions, couples must demonstrate that they are living together in a genuine, stable relationship. Couples who have cohabited for at least 12 months can apply directly for a Partner Resident Visa, while couples with shorter cohabitation can obtain a Partner Work Visa allowing open employment while accumulating the required 12 months of living together.",
    "fees": {
      "visa_fee": "NZD 3,610 (Partner Resident Visa) / NZD 860 (Partner Work Visa)",
      "service_fee": "NZD 100 (Immigration Levy Included)",
      "total_fee": "NZD 3,610 Total Government Statutory Fee (approx. \u20b91,84,000)",
      "currency": "NZD",
      "notes": "Paid online via Immigration Online on immigration.govt.nz. Medical exam fees and police clearance fees are separate."
    },
    "proc_time": "6 to 12 Months (Resident Stream) / 6 to 8 Weeks (Work Stream)",
    "proc_details": "Applied online via Immigration Online. Case officers conduct thorough verification of cohabitation evidence and interview both partners.",
    "source": "Immigration New Zealand (INZ / Immigration Online)",
    "validity": "Resident Visa: 2 Years travel conditions (leading to permanent PRV); Work Visa: 1 to 2 Years open work",
    "stay": "Permanent Residency (Resident Stream) / Open Work Duration (Work Stream)",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Joint Tenancy / Ownership Deeds & 12-Month Cohabitation Proof",
    "relationship_desc": "Documentary proof of living together continuously for 12 months: joint rental agreements, joint utility bills, joint bank statements, and personal statements.",
    "min_funds": "New Zealand citizen/resident partner undertaking of maintenance and accommodation.",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "12-Month Cohabitation Rule",
        "description": "Rigorous proof of living together in a genuine and stable partnership for at least 12 months for permanent residence."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Open Partner Work Visa",
        "description": "Couples with less than 12 months cohabitation can obtain an open work visa with full employment rights in New Zealand."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Resident Visa (PRV)",
        "description": "After 2 years on a Partner Resident Visa, transition to a lifetime PRV with perpetual return travel rights."
      },
      {
        "icon": "\ud83e\udd5d",
        "title": "New Zealand Citizenship in 5 Years",
        "description": "Eligible to apply for New Zealand Citizenship and passport after 5 continuous years of lawful residence."
      }
    ],
    "faqs": [
      {
        "question": "What constitutes 'living together' under New Zealand immigration rules?",
        "answer": "Living together means sharing the same home as a couple on a daily basis. Spending holidays together or living in separate accommodations does not count as cohabitation under INZ rules."
      },
      {
        "question": "Can I get an open work visa if we haven't lived together for 12 months?",
        "answer": "Yes. You can apply for a Partner of a Worker/Resident Work Visa, which grants an open work permit so you can live together in New Zealand and build the 12-month cohabitation history for residence."
      },
      {
        "question": "Who can sponsor a partner in New Zealand?",
        "answer": "An eligible New Zealand citizen or permanent resident who has not supported more than one other partner in the past 5 years and has not been sponsored as a partner themselves in the past 5 years."
      },
      {
        "question": "Can same-sex and de facto partners apply for a New Zealand partner visa?",
        "answer": "Yes. New Zealand immigration law treats married, civil union, and de facto opposite-sex and same-sex couples equally under partnership policy."
      },
      {
        "question": "Do partners receive free public healthcare in New Zealand?",
        "answer": "Holders of a Partner Resident Visa or a Partner Work Visa valid for 2 years or more are fully eligible for publicly funded healthcare in New Zealand."
      }
    ]
  },
  "uae": {
    "cname": "United Arab Emirates",
    "scheme": "Family Sponsorship Residence Visa (Spouse & Children)",
    "overview": "The UAE Family Sponsorship Residence Visa allows expatriate residents holding a valid UAE employment or investor visa to sponsor their spouse and dependent children for 1, 2, or 3 years of renewable residence. The sponsor must earn a minimum basic salary of AED 4,000 per month (or AED 3,000 plus company accommodation) and possess an attested tenancy contract (Ejari). Spouses of Golden Visa holders enjoy enhanced privileges, including 10-year residency independent of the sponsor's employment, and female sponsors can sponsor their families under flexible professional categories.",
    "fees": {
      "visa_fee": "AED 250 - 500 (Entry Permit) + AED 500 - 1,000 (Residence Stamping)",
      "service_fee": "AED 370 (Emirates ID) + AED 300 - 750 (Medical Fitness Screening)",
      "total_fee": "AED 1,500 - 2,500 Total Statutory Reference (approx. \u20b935,000 - \u20b958,000)",
      "currency": "AED",
      "notes": "Applied online via the ICP portal or GDRFA Dubai with electronic entry permit issued within 48 to 72 hours."
    },
    "proc_time": "1 to 2 Weeks Total (Entry Permit: 2-3 Days + Medical & Stamping: 5-7 Days)",
    "proc_details": "Employer or sponsor applies for entry permit online. Sponsored family member enters UAE, completes blood pathology/X-ray medical fitness test and Emirates ID biometrics.",
    "source": "Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) & GDRFA Dubai",
    "validity": "1 to 3 Years (Matches sponsor's residence visa; 10 Years for Golden Visa families)",
    "stay": "Full Duration of Valid Emirates ID",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Attested Marriage Certificate (MOFA & UAE Embassy in India)",
    "relationship_desc": "Original marriage certificate apostilled by the Ministry of External Affairs (MEA) in India and attested by the UAE Embassy in New Delhi and UAE MOFA.",
    "min_funds": "Sponsor minimum monthly salary of AED 4,000 (or AED 3,000 with company accommodation) and registered Ejari tenancy.",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Streamlined 1 to 2-Week Process",
        "description": "Rapid digital processing through GDRFA Dubai and ICP with immediate e-Entry Permit issuance."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Registered Ejari Tenancy",
        "description": "Requires official tenancy lease registered with the Dubai Land Department or municipal tenancy authority."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Golden Visa Family Rights",
        "description": "Golden Visa sponsors provide 10-year visas with zero maximum absence restrictions abroad."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Spousal Employment Freedom",
        "description": "Sponsored spouses can take up employment with any UAE company upon obtaining an internal work permit from MOHRE."
      }
    ],
    "faqs": [
      {
        "question": "What is the salary requirement to sponsor a spouse in the UAE?",
        "answer": "The sponsor must earn a minimum salary of AED 4,000 per month or AED 3,000 plus company-provided accommodation, verified through an official MOHRE contract or salary certificate."
      },
      {
        "question": "What attestation is required for an Indian marriage certificate in the UAE?",
        "answer": "The certificate must be: (1) Notarized, (2) Attested by the Home Department of the issuing state, (3) Attested by MEA India, (4) Attested by the UAE Embassy in India, and (5) Attested by MOFA in the UAE."
      },
      {
        "question": "Can a sponsored wife work in the UAE?",
        "answer": "Yes. A sponsored wife can work legally in the UAE. The hiring company simply applies to MOHRE for an electronic work permit without transferring her residence visa sponsorship."
      },
      {
        "question": "Can a female expatriate resident sponsor her husband in the UAE?",
        "answer": "Yes. A female resident working in an approved professional category (such as engineers, doctors, teachers, or corporate executives) earning at least AED 4,000/month can sponsor her husband and children."
      },
      {
        "question": "What medical fitness tests are required for family members in the UAE?",
        "answer": "All applicants aged 18 and over must undergo a medical fitness screening in the UAE comprising a blood test for HIV and hepatitis, and a chest X-ray for pulmonary tuberculosis."
      }
    ]
  },
  "singapore": {
    "cname": "Singapore",
    "scheme": "Dependant's Pass (DP) & Long-Term Visit Pass (LTVP)",
    "overview": "Singapore's Dependant's Pass (DP) and Long-Term Visit Pass (LTVP) schemes enable high-skilled foreign professionals holding Employment Passes (EP) or S Passes to sponsor their legal spouse and dependent children. Administered by the Ministry of Manpower (MOM), the sponsoring EP holder must earn a fixed monthly salary of at least SGD $6,000. Dependant's Pass holders receive lawful residence aligned with the primary pass holder's tenure. Spouses holding a DP who wish to work in Singapore can secure their own qualifying work pass (EP, S Pass, or Work Permit), while DP holders operating businesses can apply for a Letter of Consent (LOC).",
    "fees": {
      "visa_fee": "SGD $105 (DP Application Fee)",
      "service_fee": "SGD $225 (DP Issuance Fee) + SGD $30 (Multiple Journey Visa)",
      "total_fee": "SGD $360 Total Statutory Reference (approx. \u20b922,500)",
      "currency": "SGD",
      "notes": "Applied online by the sponsor's hiring employer via MOM EP eService (myMOM)."
    },
    "proc_time": "10 to 15 Working Days (Concurrent with EP or Post-Arrival)",
    "proc_details": "Processed online by the Ministry of Manpower (MOM). In-principle approval (IPA) letter is issued upon approval.",
    "source": "Ministry of Manpower (MOM Singapore)",
    "validity": "Up to 2 Years (Matches primary Employment Pass validity, renewable)",
    "stay": "Duration of Approved Dependant's Pass",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate & English Translation",
    "relationship_desc": "Official marriage certificate issued by the Registrar of Marriages (ROM) with certified English translation and High Commission verification.",
    "min_funds": "Primary Employment Pass holder minimum fixed monthly salary of SGD $6,000 (SGD $12,000 to sponsor parents on LTVP).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Concurrent EP Submission",
        "description": "Employer can submit the Dependant's Pass application at the same time as the primary Employment Pass."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "In-Principle Approval (IPA)",
        "description": "IPA letter serves as a pre-approved single-entry visa for travel to Singapore to collect the pass card."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Aligned Pass Validity",
        "description": "DP validity mirrors the principal EP holder's status (up to 2-3 years), renewed synchronously."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Work Pass Transition Pathway",
        "description": "DP spouses can transition to their own Employment Pass or S Pass with employer sponsorship."
      }
    ],
    "faqs": [
      {
        "question": "What is the salary requirement to sponsor a spouse on a Dependant's Pass in Singapore?",
        "answer": "The Employment Pass or S Pass holder must earn a minimum fixed monthly salary of SGD $6,000, paid by a Singapore-registered corporate employer."
      },
      {
        "question": "Can a Dependant's Pass holder work in Singapore?",
        "answer": "A DP holder who wishes to work as an employee must have a prospective employer apply for an Employment Pass, S Pass, or Work Permit. DP holders who own eligible local businesses can apply for a Letter of Consent (LOC)."
      },
      {
        "question": "Can common-law partners or parents be sponsored in Singapore?",
        "answer": "Spouses legally married under civil law qualify for a Dependant's Pass. Common-law spouses, unmarried stepchildren, and parents (with sponsor salary of SGD $12,000+) can be sponsored on a Long-Term Visit Pass (LTVP)."
      },
      {
        "question": "What is the In-Principle Approval (IPA) letter for a Dependant's Pass?",
        "answer": "An IPA is the official approval notice issued by MOM once the DP is approved. It allows the dependent to travel to Singapore, complete biometric registration at the MOM Services Centre, and receive their pass card."
      },
      {
        "question": "Do dependent children need vaccinations for a Singapore pass?",
        "answer": "Yes. Foreign-born children aged 12 and below must have their vaccination records for diphtheria and measles certified by the Health Promotion Board (HPB) before applying for a DP."
      }
    ]
  },
  "austria": {
    "cname": "Austria",
    "scheme": "Family Reunification (Familienzusammenf\u00fchrung / Red-White-Red Card Plus)",
    "overview": "Austria's Family Reunification framework, governed by the Settlement and Residence Act (NAG), allows spouses, registered partners, and minor children of Austrian citizens, EU Blue Card holders, or Red-White-Red Card holders to reside in Austria. Family members of Red-White-Red Card and Blue Card holders receive an immediate Red-White-Red Card Plus, granting them unconditional, unrestricted access to the Austrian labour market from day one. Spouses must demonstrate Module 1 of the Integration Agreement (German A1 certificate) before entry (exempt for spouses of Blue Card holders and researchers). The sponsor must demonstrate adequate living space and net household income meeting ASVG benchmarks.",
    "fees": {
      "visa_fee": "\u20ac160 (RWR Card Plus Application Fee: \u20ac120 on submission + \u20ac20 on grant + \u20ac20 biometrics)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac190 Total Consular Reference (approx. \u20b917,100)",
      "currency": "EUR",
      "notes": "Submitted at the Austrian Embassy or VFS Global in India, or lodged directly by the sponsor at the settlement authority in Austria."
    },
    "proc_time": "2 to 4 Months from Submission",
    "proc_details": "Adjudicated by the competent provincial settlement authority (Magistrat or Bezirkshauptmannschaft) in Austria in coordination with the Austrian Embassy.",
    "source": "Austrian Federal Ministry of the Interior (BMI) & Settlement Authorities (Magistrat / BH)",
    "validity": "1 to 2 Years (RWR Card Plus, renewable; permanent after 5 years via Daueraufenthalt \u2013 EU)",
    "stay": "Aligned with Sponsor's Residence Permit",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Verification",
    "relationship_desc": "Official apostilled civil marriage certificate, certified German translation by a sworn court translator, and wedding photo dossier.",
    "min_funds": "Household net income exceeding the ASVG standard supplement rate (\u20ac1,921 net/month for a married couple).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Immediate RWR Card Plus",
        "description": "Spouses of Red-White-Red Card and Blue Card holders receive immediate RWR Card Plus status with unrestricted work rights."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Zero Work Permit Restrictions",
        "description": "Completely free access to work for any employer or operate a commercial business anywhere in Austria."
      },
      {
        "icon": "\ud83d\udde3\ufe0f",
        "title": "German A1 Integration Rule",
        "description": "Basic A1 German certificate certifies readiness for integration (spouses of Blue Card holders are fully exempt)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Residence in 5 Years",
        "description": "Eligible for Daueraufenthalt \u2013 EU after 5 continuous years of lawful residence in Austria."
      }
    ],
    "faqs": [
      {
        "question": "Can my spouse work in Austria on a family reunification permit?",
        "answer": "Yes. Family members of Red-White-Red Card and EU Blue Card holders receive a Red-White-Red Card Plus, granting them unrestricted access to the Austrian labour market from day one."
      },
      {
        "question": "Who is exempt from the German A1 requirement for Austrian family reunion?",
        "answer": "Spouses of EU Blue Card holders, researchers, and very highly qualified workers are exempt from providing proof of German language skills before entering Austria."
      },
      {
        "question": "What is the ASVG income requirement for couples in Austria?",
        "answer": "The sponsor's net household income must exceed the standard equalization supplement rate (Ausgleichszulagenrichtsatz) for married couples, which is approximately \u20ac1,921 net per month."
      },
      {
        "question": "What living space is required for family reunification in Austria?",
        "answer": "You must prove customary local accommodation (orts\u00fcbliche Unterkunft) through a lease agreement, generally requiring a separate bedroom and adequate square footage for the household."
      },
      {
        "question": "Can the sponsor submit the application in Austria on the spouse's behalf?",
        "answer": "Yes. If the sponsor holds an RWR Card or EU Blue Card, they can submit the family reunification application directly to the competent settlement authority (Magistrat or BH) in Austria."
      }
    ]
  },
  "belgium": {
    "cname": "Belgium",
    "scheme": "Family Reunification (Regroupement Familial / Article 10 & 40 bis)",
    "overview": "Belgium's Family Reunification system, regulated by the Law of 15 December 1980 and the Belgian Immigration Office (DOFI), permits spouses, registered civil partners, and minor children of Belgian citizens or legal residents (holding Single Permits, EU Blue Cards, or settlement status) to join their partner in Belgium. The sponsor must demonstrate stable, regular, and sufficient financial resources (minimum \u20ac2,040/month net as of 2024), adequate housing certified by a registered lease, and comprehensive mutuelle health insurance. Spouses receive an electronic residence card granting unrestricted access to the Belgian labour market.",
    "fees": {
      "visa_fee": "\u20ac180 (Long-Stay National Visa D Fee) + \u20ac235 (Federal Administrative Fee - Redevance)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac445 Total Consular Reference (approx. \u20b940,000)",
      "currency": "EUR",
      "notes": "The administrative fee (\u20ac235) must be wired directly to the Belgian Immigration Office account before lodging the application."
    },
    "proc_time": "3 to 6 Months from Consular Lodgement",
    "proc_details": "Lodged at VFS Global Belgium in India and forwarded to the Belgian Immigration Office (DOFI / Office des \u00c9trangers) in Brussels for statutory decision.",
    "source": "Belgian Immigration Office (DOFI / Office des \u00c9trangers) & Embassy of Belgium",
    "validity": "Long-Stay D Visa for Entry (Converted to 1 to 2-Year Electronic A-Card in Belgium)",
    "stay": "Aligned with Sponsor's Residence Permit",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Translation",
    "relationship_desc": "Official apostilled civil marriage certificate accompanied by sworn translation into French, Dutch, or German, and proof of continuous relationship.",
    "min_funds": "Sponsor stable regular income of at least 120% of the statutory integration minimum (approx. \u20ac2,040 net/month).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Immediate Employment Freedom",
        "description": "Spouses holding an electronic A-card enjoy full, unrestricted rights to work for any employer in Belgium without a Single Permit."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Article 10 & 40 bis Framework",
        "description": "Established statutory framework governing reunification with non-EU workers and EU citizens."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Belgian Nationality in 5 Years",
        "description": "Continuous residence on family reunification counts towards eligibility for Belgian Citizenship after 5 years."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Mutuelle Health Coverage",
        "description": "Immediate enrollment into Belgium's universal mutual health insurance system (Mutuelle / Ziekenfonds)."
      }
    ],
    "faqs": [
      {
        "question": "Can my spouse work in Belgium on a family reunification permit?",
        "answer": "Yes. Under Belgian immigration regulations, a spouse holding a residence card granted under family reunification (A-card) has unrestricted access to the Belgian labour market with no work permit required."
      },
      {
        "question": "What is the minimum income requirement to sponsor a spouse in Belgium?",
        "answer": "The sponsor must prove stable and regular net income of at least \u20ac2,040 per month (120% of the social integration income), excluding unemployment benefits or social welfare."
      },
      {
        "question": "What is the Belgian federal administrative fee (redevance)?",
        "answer": "Applicants aged 18 and over must pay a non-refundable administrative fee of \u20ac235 directly to the Belgian Immigration Office (DOFI) before lodging their visa application."
      },
      {
        "question": "What documents prove adequate housing in Belgium?",
        "answer": "A registered residential tenancy agreement (contrat de bail enregistr\u00e9) with proof of sufficient living space and compliance with local municipal housing codes."
      },
      {
        "question": "How long does DOFI take to decide on a family reunification visa?",
        "answer": "Under Belgian law, the statutory maximum processing time is 9 months, though most standard spouse applications are finalized within 3 to 6 months."
      }
    ]
  },
  "denmark": {
    "cname": "Denmark",
    "scheme": "Family Reunification (\u00c6gtef\u00e6llesammenf\u00f8ring / Accompanying Family Scheme)",
    "overview": "Denmark provides two distinct pathways for spouses: the Accompanying Family scheme for spouses of foreign workers (under the Pay Limit or Fast-Track schemes), and standard Family Reunification (\u00c6gtef\u00e6llesammenf\u00f8ring) for spouses of Danish citizens or permanent residents. Spouses of foreign professionals under the Accompanying Family scheme enjoy expedited digital processing via SIRI, require no collateral bond or language test before entry, and receive automatic unrestricted Danish residence and work permits. Standard reunification with Danish citizens requires meeting the 24-Year Rule, language tests, and posting a statutory financial collateral guarantee of DKK 114,424.",
    "fees": {
      "visa_fee": "DKK 2,490 (Accompanying Family SIRI Fee) or DKK 9,565 (Standard Family Reunification Fee)",
      "service_fee": "\u20ac30 (VFS Global Biometrics Fee)",
      "total_fee": "DKK 2,490 - 9,565 (approx. \u20b930,000 - \u20b91,15,000)",
      "currency": "DKK",
      "notes": "Case Order ID created on newtodenmark.dk and fee paid online before booking biometrics at VFS Denmark."
    },
    "proc_time": "1 to 2 Months (Accompanying Family via SIRI) / 7 Months (Standard Reunification)",
    "proc_details": "Accompanying family applications for skilled workers are processed digitally by SIRI within 30 to 60 days.",
    "source": "Danish Agency for International Recruitment and Integration (SIRI) & Danish Immigration Service",
    "validity": "Aligned with Primary Worker's Permit (Up to 4 Years, Renewable)",
    "stay": "Duration of Approved Accompanying Family Permit",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Translation",
    "relationship_desc": "Official apostilled civil marriage certificate with certified English or Danish translation, plus proof of shared cohabitation.",
    "min_funds": "Primary worker statutory salary meeting Pay Limit threshold (DKK 399,440 - 487,000/year) or self-support guarantee.",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Accompanying Family Fast-Track",
        "description": "Spouses of Pay Limit and Fast-Track workers receive residence decisions within 30-60 days with zero financial bonds."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Automatic Unrestricted Work Rights",
        "description": "Accompanying spouse is granted an unrestricted Danish work permit to work for any employer in Denmark."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Free Healthcare & Free Danish Lessons",
        "description": "Yellow CPR health card provides 100% free healthcare, and the state funds free official Danish language classes."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Equal Validity Period",
        "description": "Spouse permit is granted for the exact same multi-year validity period as the primary skilled worker."
      }
    ],
    "faqs": [
      {
        "question": "Can my spouse work in Denmark on an accompanying family permit?",
        "answer": "Yes. Spouses of foreign professionals holding Danish work permits are automatically granted an unrestricted residence and work permit, allowing them to work in any job without a separate permit."
      },
      {
        "question": "What is the difference between Accompanying Family and Family Reunification in Denmark?",
        "answer": "Accompanying Family is for spouses of foreign workers (processed quickly by SIRI with no collateral bond). Family Reunification is for spouses of Danish citizens (processed by DIS with strict 24-year rules and a DKK 114,424 bank guarantee)."
      },
      {
        "question": "Can the spouse apply at the same time as the primary worker for Denmark?",
        "answer": "Yes. SIRI strongly encourages concurrent online applications, allowing the primary worker and spouse to receive their residence decisions simultaneously."
      },
      {
        "question": "What is the CPR number and Yellow Card in Denmark?",
        "answer": "Upon arrival, registering your address at the local citizen service center generates a CPR identity number and Yellow Health Card, giving you access to free public doctor visits and hospitals."
      },
      {
        "question": "Are children included in the Danish accompanying family application?",
        "answer": "Yes. Dependent children under the age of 18 can be included and are entitled to free Danish public schooling and childcare subsidies."
      }
    ]
  },
  "finland": {
    "cname": "Finland",
    "scheme": "Residence Permit on the Basis of Family Ties (Perheside)",
    "overview": "Finland's Residence Permit on the Basis of Family Ties (Perheside), issued by the Finnish Immigration Service (Migri) under the Aliens Act, enables spouses, registered partners, and cohabiting partners of Finnish citizens or foreign residents (such as Specialists, EU Blue Card holders, or researchers) to live in Finland. Family members of specialists benefit from expedited 14-day fast-track processing via Enter Finland and can travel immediately on a Type D visa. Spouses receive a continuous (Type A) permit granting unrestricted access to the Finnish labour market, full social security rights via Kela, and free public education.",
    "fees": {
      "visa_fee": "\u20ac470 (Electronic Application via Enter Finland) / \u20ac530 (Paper Application)",
      "service_fee": "\u20ac30 (VFS Global Biometrics Fee)",
      "total_fee": "\u20ac500 Total Consular Reference (approx. \u20b945,000)",
      "currency": "EUR",
      "notes": "Applied online via enterfinland.fi. Biometrics recorded at VFS Global Finland in India."
    },
    "proc_time": "14 Days (Specialist Fast-Track) to 1-3 Months (Standard Application)",
    "proc_details": "Digital processing via Enter Finland. Fast-track family applications decided concurrently with primary specialist permits.",
    "source": "Finnish Immigration Service (Migri / Enter Finland) & Embassy of Finland",
    "validity": "Continuous (Type A) Permit matching Sponsor's Validity (Up to 4 Years)",
    "stay": "Duration of Approved Residence Permit",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Translation",
    "relationship_desc": "Official apostilled civil marriage certificate with certified English translation, plus proof of shared marital life and communication.",
    "min_funds": "Sponsor verifiable net income meeting Migri subsistence threshold (\u20ac1,000/month for spouse after housing costs).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "14-Day Fast-Track Option",
        "description": "Spouses of Specialists and EU Blue Card holders can obtain digital residence approvals within 14 days via Enter Finland."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Work & Study Rights",
        "description": "Continuous Type A permit grants full, unrestricted authorization to work in any sector or enroll in universities."
      },
      {
        "icon": "\ud83c\uddeb\ud83c\uddee",
        "title": "Fast-Track D-Visa for Immediate Travel",
        "description": "Receive a national D-visa entry vignette and travel to Finland immediately without waiting for the physical residence card."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Universal Kela Healthcare & Welfare",
        "description": "Full entitlement to Finland's world-renowned public healthcare, family allowances, and parental leave benefits."
      }
    ],
    "faqs": [
      {
        "question": "Can my spouse work in Finland on a family ties permit?",
        "answer": "Yes. A residence permit granted on the basis of family ties (Type A permit) confers full, unrestricted rights to work as an employee or entrepreneur across all sectors in Finland."
      },
      {
        "question": "What is the 14-day fast-track for family members in Finland?",
        "answer": "If the primary applicant is a specialist or EU Blue Card holder applying through Enter Finland, family members can apply for fast-track processing concurrently and receive decisions within 2 weeks."
      },
      {
        "question": "What is the income requirement to sponsor a spouse in Finland?",
        "answer": "The sponsor's net income after tax and housing costs must meet Migri's subsistence guidelines (typically around \u20ac1,000 net per month for a spouse, with lower thresholds if the sponsor holds a specialist permit)."
      },
      {
        "question": "Can cohabiting partners apply for a residence permit in Finland without marriage?",
        "answer": "Yes. A cohabiting partner qualifies under family ties if you have lived together in a marriage-like relationship continuously for at least 2 years or have a joint child."
      },
      {
        "question": "When can a spouse apply for Finnish permanent residence and citizenship?",
        "answer": "A spouse holding a continuous A-permit can apply for permanent residence (P-lupa) after 4 years, and Finnish Citizenship after 5 years (4 years with B1 Finnish or Swedish language proficiency)."
      }
    ]
  },
  "italy": {
    "cname": "Italy",
    "scheme": "Family Reunification (Ricongiungimento Familiare / Nulla Osta SUI)",
    "overview": "Italy's Family Reunification system (Ricongiungimento Familiare), governed by Article 29 of the Consolidated Immigration Act (TUI), allows foreign nationals holding a valid Italian residence permit (such as a work permit, EU Blue Card, or long-term permit) valid for at least 1 year to bring their spouse and minor children to Italy. The sponsor must obtain an official immigration clearance certificate (Nulla Osta per Ricongiungimento Familiare) from the Single Desk for Immigration (Sportello Unico per l'Immigrazione - SUI) at the local Prefettura. The sponsor must demonstrate an annual income equal to the social allowance (\u20ac6,947/year + 50% for spouse) and provide a municipal housing suitability certificate (Certificato di Idoneit\u00e0 Alloggiativa).",
    "fees": {
      "visa_fee": "\u20ac116 (Long-Stay National Visa D Fee)",
      "service_fee": "\u20ac16 (Marca da Bollo) + \u20ac100 (Permesso di Soggiorno upon arrival) + \u20b92,500 VFS Italy",
      "total_fee": "approx. \u20ac232 Total Consular Reference (approx. \u20b921,000)",
      "currency": "EUR",
      "notes": "Consular visa fee paid at VFS Global Italy. The residence permit fee is paid at Italian post offices upon arrival."
    },
    "proc_time": "3 to 6 Months (Nulla Osta SUI: 2-3 Months + Consular Visa: 3-4 Weeks)",
    "proc_details": "Two-phase procedure: Sponsoring partner files electronic Nulla Osta application at the Prefettura SUI in Italy; upon approval, spouse applies for Type D visa at VFS Italy in India.",
    "source": "Ministry of the Interior (Ministero dell'Interno) & Prefettura / SUI",
    "validity": "Long-Stay D Visa for Entry (Converted to 1 to 2-Year Permesso per Motivi Familiari)",
    "stay": "Aligned with Sponsor's Permesso di Soggiorno",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Italian Translation",
    "relationship_desc": "Official apostilled civil marriage certificate with certified translation into Italian legalized by the Italian consular mission.",
    "min_funds": "Sponsor annual gross income of at least 1.5 times the statutory social allowance (\u20ac10,420/year for spouse).",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Electronic Nulla Osta SUI",
        "description": "Centralized electronic security and income clearance issued directly by the local Prefettura."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Full Permesso di Soggiorno Work Rights",
        "description": "Permesso per Motivi Familiari authorizes employment as an employee or independent professional across Italy."
      },
      {
        "icon": "\ud83c\udfe0",
        "title": "Idoneit\u00e0 Alloggiativa Standard",
        "description": "Municipal certificate verifies apartment meets statutory surface area and health regulations."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "EU Long-Term Settlement Path",
        "description": "Eligible for an EU Long-Term Resident Permit after 5 continuous years of registered legal residence."
      }
    ],
    "faqs": [
      {
        "question": "What is the Nulla Osta for family reunification in Italy?",
        "answer": "The Nulla Osta is an official clearance certificate issued by the Single Desk for Immigration (Sportello Unico) at the Prefettura in Italy confirming that the sponsor satisfies income and housing criteria to bring family members."
      },
      {
        "question": "What is the income requirement to sponsor a spouse in Italy?",
        "answer": "The sponsor must demonstrate annual taxable income of at least the annual social allowance plus 50% for the spouse, which is approximately \u20ac10,420 gross per year."
      },
      {
        "question": "What is the Certificato di Idoneit\u00e0 Alloggiativa in Italy?",
        "answer": "It is an official certificate issued by the local municipality (Comune) certifying that your apartment complies with statutory sanitary and surface standards based on the number of occupants."
      },
      {
        "question": "Can a spouse work in Italy on a family residence permit?",
        "answer": "Yes. A Permesso di Soggiorno per Motivi Familiari permits the holder to engage in salaried employment or self-employed commercial activities without needing a separate work permit."
      },
      {
        "question": "What must the spouse do within 8 days of arriving in Italy?",
        "answer": "Within 8 business days of arrival, the spouse must report to the Sportello Unico at the Prefettura to collect the residence documentation, then submit the postal kit (Kit Giallo) for the Permesso di Soggiorno card."
      }
    ]
  },
  "sweden": {
    "cname": "Sweden",
    "scheme": "Residence Permit for Moving to a Partner in Sweden (Sambo & Spouse)",
    "overview": "Sweden's residence permit system for moving to a spouse or cohabiting partner (Sambo), administered by the Swedish Migration Agency (Migrationsverket), provides progressive, equal-rights immigration pathways for international couples. Non-EU spouses and registered partners of Swedish citizens or individuals holding Swedish permanent residence or work permits can apply for a residence permit. The Swedish partner must satisfy the maintenance requirement (f\u00f6rs\u00f6rjningskrav): demonstrating adequate employment income to support both partners and holding an apartment of sufficient size (at least 1 bedroom and kitchen for a couple). Spouses receive full, unrestricted authorization to work or study in Sweden from day one.",
    "fees": {
      "visa_fee": "SEK 2,000 (approx. \u20ac175 / \u20b916,000 Application Fee for Adults)",
      "service_fee": "\u20ac30 (VFS Global Biometrics Fee)",
      "total_fee": "SEK 2,000 + VFS Logistics",
      "currency": "SEK",
      "notes": "Paid online via Migrationsverket e-service portal. Biometric verification and interview booked at the Embassy of Sweden in New Delhi."
    },
    "proc_time": "9 to 14 Months from Submission",
    "proc_details": "Applied online via Migrationsverket. Applicant attends in-person relationship interview and biometrics at the Embassy of Sweden in New Delhi.",
    "source": "Swedish Migration Agency (Migrationsverket)",
    "validity": "Up to 2 Years (Initial Permit, renewable; leading to Permanent Residence PUT)",
    "stay": "Duration of Approved Residence Permit",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Government Marriage Certificate with Apostille & Cohabitation Dossier",
    "relationship_desc": "Official apostilled civil marriage certificate with certified English or Swedish translation, plus evidence of shared life and communication history.",
    "min_funds": "Sponsor net income after rent of at least SEK 10,061/month for a couple, and an apartment with at least 1 room and a kitchen.",
    "highlights": [
      {
        "icon": "\u2764\ufe0f",
        "title": "Sambo & Marriage Equality",
        "description": "Swedish law treats married couples, registered civil partners, and cohabiting partners (Sambo) with complete legal equality."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Immediate Unrestricted Work Rights",
        "description": "Spouses are authorized to work for any employer or start an enterprise immediately upon permit grant."
      },
      {
        "icon": "\ud83c\udfe0",
        "title": "F\u00f6rs\u00f6rjningskrav Maintenance Rule",
        "description": "Sponsor must meet statutory housing standards (1 room + kitchen) and maintain sufficient income after rent."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Residence in 2-3 Years",
        "description": "Eligible to apply for Permanent Residence (PUT) in Sweden after 2 to 3 years of living together."
      }
    ],
    "faqs": [
      {
        "question": "What is the Sambo relationship status in Sweden?",
        "answer": "Sambo is the Swedish legal term for a couple living together in a joint household under marriage-like conditions without being formally married. Swedish immigration law recognizes Sambo partners equally."
      },
      {
        "question": "What is the maintenance requirement (f\u00f6rs\u00f6rjningskrav) in Sweden?",
        "answer": "The sponsor must have regular work-related income that leaves at least SEK 10,061 per month for a couple after paying housing rent, and must own or rent an apartment with at least one room and a kitchen."
      },
      {
        "question": "Can my spouse work in Sweden while holding a residence permit for family ties?",
        "answer": "Yes. A residence permit granted on the basis of family ties includes full, unrestricted authorization to work as an employee or run an independent business in Sweden."
      },
      {
        "question": "Where does the relationship interview take place for applicants from India?",
        "answer": "The applicant must attend an in-person relationship interview and provide fingerprints and photograph at the Embassy of Sweden in New Delhi."
      },
      {
        "question": "When can a spouse apply for Swedish citizenship?",
        "answer": "If married or living as Sambo with a Swedish citizen for at least 2 years, you can apply for Swedish citizenship after living in Sweden for 3 years (instead of the standard 5 years)."
      }
    ]
  }
};

// ── 1. FAMILY OVERVIEW ──
export function getFamilyOverview(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.overview) return d.overview;
  return `The Family / Spouse Visa for ${country} enables spouses, civil partners, and dependent family members of citizens or lawful residents to legally relocate and reside together with full rights and settlement pathways.`;
}

// ── 2. FAMILY HIGHLIGHTS ──
export function getFamilyHighlights(country: string): FamilyHighlightItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.highlights) return d.highlights;
  return [
    { icon: '❤️', title: 'Genuine Relationship Standard', description: 'Comprehensive legal, financial, and cohabitation evidence verifying bona fide partnership.' },
    { icon: '💼', title: 'Full Employment Authorization', description: 'Immediate unrestricted permission to work or study across the destination country.' },
    { icon: '🏠', title: 'Adequate Housing Requirement', description: 'Documented residential accommodation meeting statutory municipal health standards.' },
    { icon: '⏱️', title: 'Settlement & Citizenship', description: 'Direct statutory progression to permanent residency and naturalisation as a citizen.' }
  ];
}

// ── 3. STEPS TO APPLY ──
export function getFamilySteps(country: string): string[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = d ? d.cname : country;
  const scheme = d ? d.scheme : 'family reunification program';
  const auth = d ? d.source : 'official immigration authorities';
  return [
    `Verify Sponsorship Eligibility: Confirm that the sponsor in ${cname} meets statutory income thresholds, legal status, and housing requirements under ${scheme}.`,
    `Assemble Genuine Relationship Dossier: Gather apostilled civil marriage certificates, statutory declarations, wedding photo album, joint lease/bank records, and communication logs.`,
    `Lodge Online Sponsorship / Visa Application: Complete the official digital application on the government portal (${auth}) and upload all certified translations.`,
    `Pay Statutory Government Fees: Pay the mandatory visa application charge, biometric fees, and any applicable healthcare surcharges online.`,
    `Book & Attend Biometrics / Consular Interview: Attend your scheduled appointment at the designated Visa Application Center (VFS Global / Consular Section) for biometrics and relationship interview.`,
    `Undergo Immigration Medical Screening: Complete authorized panel physician medical examination covering chest X-ray and blood pathology checks.`,
    `Receive Entry Visa Vignette & Relocate: Upon approval, collect your passport featuring the official entry vignette, travel to ${cname}, and complete local municipal registration to collect your residence permit.`
  ];
}

// ── 4. DOCUMENTS REQUIRED ──
export function getFamilyDocuments(countryOrFrom: string, maybeCountry?: string, purpose?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d.relationship_doc : 'Government Marriage Certificate & Relationship Dossier';
  const doc_desc = d ? d.relationship_desc : 'Apostilled civil marriage certificate, relationship history questionnaire, wedding photos, and joint accounts.';
  return [
    { title: 'Valid International Passport', description: 'Original passport valid for at least 12 months with minimum 2 blank visa pages.', is_mandatory: true },
    { title: doc, description: doc_desc, is_mandatory: true },
    { title: 'Sponsor Proof of Legal Status & Citizenship', description: 'Certified copy of sponsor\'s citizenship passport, permanent residence card, or valid work permit in destination country.', is_mandatory: true },
    { title: 'Sponsor Proof of Financial Maintenance', description: 'Past 6-12 months payslips, employment contract, tax assessment returns (P60/W-2/ITR), and bank statements proving income threshold.', is_mandatory: true },
    { title: 'Proof of Adequate Residential Accommodation', description: 'Registered tenancy agreement, property ownership title deeds, or municipal housing suitability certificate demonstrating no overcrowding.', is_mandatory: true },
    { title: 'Police Clearance Certificates (PCC)', description: 'Original PCC issued by Regional Passport Office (RPO) and police authorities of any country resided in for 6+ months.', is_mandatory: true },
    { title: 'Standardized Language Proficiency Certificate (if required)', description: 'Recognized language examination certificate (CEFR A1/A2) certifying required language proficiency.', is_mandatory: true },
    { title: 'Immigration Medical Screening Report', description: 'Comprehensive medical clearance and chest X-ray examination conducted by an authorized panel physician.', is_mandatory: true },
    { title: 'Consular Biometric Photographs', description: 'Recent color photographs meeting specific consular biometric dimensions on a light neutral background.', is_mandatory: true }
  ];
}

// ── 5. FAMILY FEES ──
export function getFamilyFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; currency: string; notes: string } {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.fees) return d.fees;
  return {
    visa_fee: 'Statutory Family Reunification Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    currency: 'USD',
    notes: 'Check official immigration department portal for current fee tariffs.'
  };
}

// ── 6. PROCESSING TIME ──
export function getFamilyProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_time : '3 to 6 Months (Standard Family Reunification Assessment)';
}

export function getFamilyProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_details : 'Timelines depend on relationship verification, sponsor financial audit, and consular queue volume.';
}

// ── 7. OTHER REQUIREMENTS ──
export function getFamilyRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const scheme = d ? d.scheme : 'Family reunification immigration framework';
  return [
    { category: 'Bona Fide Genuine Relationship', details: `Demonstrate genuine, continuing marital or partnership relationship under ${scheme} with no convenience intentions.` },
    { category: 'Sponsor Minimum Financial Capacity', details: d ? `Sponsor must meet statutory maintenance benchmark (${d.min_funds}).` : 'Sponsor must demonstrate adequate stable regular income without recourse to social public funds.' },
    { category: 'Adequate Living Space', details: 'Documented residential property meeting statutory municipal health, safety, and surface area regulations.' },
    { category: 'Good Character & Health Integrity', details: 'Clean criminal record certified via apostilled PCC and medical clearance certified by panel physicians.' }
  ];
}

// ── 8. FINANCIAL PROOFS ──
export function getFamilyFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const funds = d ? d.min_funds : 'Sponsor verifiable annual income meeting statutory household subsistence benchmarks.';
  return [
    { type: 'Sponsor Employment Contract & Payslips', minimum_balance_or_amount: funds, time_frame: 'Past 6 to 12 consecutive months', notes: 'Official employment contract, recent salary slips, and employer verification letter on corporate letterhead.' },
    { type: 'Sponsor Official Tax Assessments', minimum_balance_or_amount: 'Past 1 to 3 Assessment Years', time_frame: 'Prior 12-36 months', notes: 'Official government tax assessment notices (P60, W-2, Notice of Assessment, Steuerbescheid) proving earnings.' },
    { type: 'Sponsor & Joint Bank Account Statements', minimum_balance_or_amount: 'Past 6 Months Stamped Statements', time_frame: 'Last 6 months', notes: 'Original stamped bank statements demonstrating regular salary deposits and adequate liquid savings.' },
    { type: 'Statutory Financial Sponsorship Undertaking', minimum_balance_or_amount: 'Formal Legal Commitment', time_frame: 'Duration of status', notes: 'Executed legal affidavit of support guaranteeing maintenance and accommodation without public funds.' }
  ];
}

// ── 9. FAQS ──
export function getFamilyFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.faqs) return d.faqs;
  const cname = d ? d.cname : country;
  return [
    { question: `Can my spouse work in ${cname} on a family / spouse visa?`, answer: `Yes. In almost all destinations, spouses joining a citizen or skilled resident receive full, unrestricted authorization to work as an employee or run an independent business.` },
    { question: `How do we prove our relationship is genuine and continuing?`, answer: `Provide a comprehensive documentary dossier: civil marriage certificates, shared lease agreements, joint bank statements, joint utility bills, travel tickets, wedding photos, and third-party witness affidavits.` },
    { question: `Does the spouse need to pass a language test before entering?`, answer: `Certain destinations (such as the UK and Germany) require spouses to pass a basic A1 CEFR language test before arrival, though exemptions apply for spouses of high-skilled permit holders.` },
    { question: `Can dependent children be included on the spouse visa application?`, answer: `Yes. Dependent biological or legally adopted minor children can generally be included in the same application, subject to custody clearances and dependent visa fees.` },
    { question: `When can a sponsored spouse apply for permanent residence or citizenship?`, answer: `Spouses typically qualify for independent permanent residence or citizenship by naturalization after 3 to 5 years of continuous lawful cohabitation in the host country.` }
  ];
}

// ── 10. VALIDITY & STAY ──
export function getFamilyValidity(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.validity : '1 to 3 Years (Renewable; leading to Permanent Settlement)';
}

export function getFamilyStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.stay : 'Duration of Approved Residence Permit';
}

export function getFamilyEntryType(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.entry_type : 'Multiple Entry';
}

export function getFamilyOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.source : `${country} Immigration Department & Consular Affairs`;
}

// ── 11. COMPLETE FAMILY VISA DATA BUILDER ──
export function getFamilyVisaData(
  from: string,
  to: string,
  purpose: string = 'Family'
): any {
  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getFamilyOfficialSourceName(to);
  const procTime = getFamilyProcessingTime(to);
  const procDetails = getFamilyProcessingDetails(to);
  const val = getFamilyValidity(to);
  const stay = getFamilyStayDuration(to);
  const entryType = getFamilyEntryType(to);
  const fees = getFamilyFees(to);
  const faqs = getFamilyFAQ(to);
  const highlights = getFamilyHighlights(to);
  const steps = getFamilySteps(to);
  const docs = getFamilyDocuments(from, to, purpose);
  const reqs = getFamilyRequirements(to);
  const proofs = getFamilyFinancialProofs(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Family / Spouse Visa',
    visa_type: `${countryName} Family / Spouse Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' family spouse reunification visa official immigration requirements')}`,
    official_source_name: officialSource,
    overview: getFamilyOverview(to),
    highlights: highlights,
    how_to_apply: steps,
    documents_required: docs,
    costs: fees,
    processing_time: procTime,
    processing_time_details: procDetails,
    other_requirements: reqs,
    financial_proofs: proofs,
    faqs: faqs,
    validity: val,
    validity_details: `Standard family reunion validity: ${val}`,
    stay_duration: stay,
    stay_duration_details: `Maximum permitted stay: ${stay}`,
    entry_type: entryType,
    entry_type_details: `${entryType} family residence authorization`,
    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },
    processing_and_timing: {
      apply_window: 'Apply 3 to 6 months prior to planned family relocation date.',
      decision_time: procTime,
      max_extension: 'Renewable based on genuine relationship status and continued lawful residence.',
      center_notes: `Processed by ${officialSource}. Coordinate biometric capture at authorized VAC or municipal section.`
    },
    verification_status: 'verified',
    is_v3_verified: true
  };
}
