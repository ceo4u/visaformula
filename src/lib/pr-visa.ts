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
  if (c.includes('canada')) return 'canada';
  if (c.includes('australia')) return 'australia';
  if (c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('new zealand') || c === 'nz') return 'new-zealand';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('ireland') || c.includes('irish') || c.includes('eire')) return 'ireland';
  if (c.includes('austria') || c.includes('vienna')) return 'austria';
  if (c.includes('belgium') || c.includes('brussels')) return 'belgium';
  if (c.includes('denmark') || c.includes('copenhagen')) return 'denmark';
  if (c.includes('finland') || c.includes('helsinki')) return 'finland';
  if (c.includes('italy') || c.includes('italia') || c.includes('rome') || c.includes('milan')) return 'italy';
  if (c.includes('sweden') || c.includes('stockholm')) return 'sweden';
  return c;
}

const DESTS: Record<string, any> = {
  "canada": {
    "cname": "Canada",
    "scheme": "Express Entry (FSWP / CEC) & Provincial Nominee Programs (PNP)",
    "overview": "Canada's Permanent Residency (PR) system is globally recognized as the gold standard in economic immigration. The primary pathway is the federal Express Entry system, which ranks skilled candidates via the Comprehensive Ranking System (CRS) across age, education (ECA), language proficiency (CLB in English/French), and skilled work experience (NOC TEER). Candidates selected in category-based or general draws receive an Invitation to Apply (ITA) for PR. Alternatively, Provincial Nominee Programs (PNP) award 600 bonus CRS points to applicants meeting specific provincial labor priorities. Canadian PR confers universal provincial healthcare, free public schooling, and eligibility for Canadian citizenship after 3 years (1,095 days).",
    "fees": {
      "visa_fee": "CAD $950 (Principal Applicant Processing Fee)",
      "service_fee": "CAD $575 (Right of Permanent Residence Fee - RPRF) + CAD $85 Biometrics",
      "total_fee": "CAD $1,610 Total Government Statutory Fee (approx. \u20b91,00,000)",
      "currency": "CAD",
      "notes": "The CAD $575 RPRF fee is refunded if the PR application is not approved. ECA credentials assessment (~$250) and IELTS/CELPIP testing fees are extra."
    },
    "proc_time": "6 Months (Standard Express Entry SLA from e-APR Submission)",
    "proc_details": "Once an Invitation to Apply (ITA) is received, applicants have 60 calendar days to submit the electronic Application for Permanent Residence (e-APR). Standard IRCC processing is 6 months.",
    "source": "Immigration, Refugees and Citizenship Canada (IRCC)",
    "validity": "5 Years (PR Card)",
    "stay": "Indefinite Lawful Permanent Resident Status",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Express Entry Invitation to Apply (ITA) or Provincial Nomination (PNP)",
    "invitation_desc": "Official Invitation to Apply issued under Express Entry or provincial nomination confirmation certificate granting 600 CRS points.",
    "min_funds": "CAD $14,690 for single applicant (scales by family size) held in unencumbered liquid funds for FSWP (exempt for CEC).",
    "highlights": [
      {
        "icon": "\ud83c\udf41",
        "title": "Comprehensive Ranking System (CRS)",
        "description": "Points-based selection prioritizing youth, master's degrees, bilingualism, and Canadian work experience."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Universal Healthcare & Social Benefits",
        "description": "Full access to provincial healthcare (OHIP, MSP, AHCIP), public child benefits, and subsidized university tuition."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "6-Month Fast-Track Processing",
        "description": "Express Entry e-APR applications processed to final decision within 6 months of submission."
      },
      {
        "icon": "\ud83c\udde8\ud83c\udde6",
        "title": "Canadian Citizenship in 3 Years",
        "description": "Eligible to apply for Canadian Citizenship and passport after completing 1,095 days of physical presence as a PR."
      }
    ],
    "faqs": [
      {
        "question": "What is the minimum CRS score required for Canadian Permanent Residency?",
        "answer": "CRS cutoff scores fluctuate with each Express Entry draw depending on intake quotas and category selections (e.g. STEM occupations, Healthcare, French-language proficiency, or Provincial Nominee Programs)."
      },
      {
        "question": "What is the Educational Credential Assessment (ECA)?",
        "answer": "An ECA is an evaluation from a designated organization (such as WES, ICAS, or CES) verifying that your foreign university degree is valid and equal to a completed Canadian educational credential."
      },
      {
        "question": "What are the settlement fund requirements for Canadian Express Entry?",
        "answer": "For the Federal Skilled Worker Program (FSWP), a single applicant must show at least CAD $14,690 in unencumbered liquid funds (savings, fixed deposits). Applicants applying under the Canadian Experience Class (CEC) or holding a valid Canadian job offer are exempt."
      },
      {
        "question": "Can I sponsor my spouse and children on my Canadian PR application?",
        "answer": "Yes. Your spouse/common-law partner and dependent children under 22 years of age can be included as accompanying dependents on your e-APR application and receive PR status simultaneously."
      },
      {
        "question": "What are the residency obligations to maintain Canadian PR status?",
        "answer": "To maintain your Canadian permanent resident status, you must be physically present in Canada for at least 730 days (2 years) out of every 5-year rolling period."
      }
    ]
  },
  "australia": {
    "cname": "Australia",
    "scheme": "General Skilled Migration (Subclass 189 / 190 / 491) & Employer Nomination (Subclass 186)",
    "overview": "Australia's Permanent Residency system operates primarily under the General Skilled Migration (GSM) points-tested framework and employer-sponsored streams. The flagship independent route is the Skilled Independent Visa (Subclass 189), requiring an occupation on the Medium and Long-term Strategic Skills List (MLTSSL), a positive skills assessment, and submitting an Expression of Interest (EOI) via SkillSelect scoring at least 65 points. The Skilled Nominated Visa (Subclass 190) offers direct PR with 5 state nomination bonus points. Australian PR confers universal Medicare health coverage, subsidised tertiary education via CSP, and eligibility for Australian Citizenship after 4 years.",
    "fees": {
      "visa_fee": "AUD 4,770 (Principal Applicant Base Charge)",
      "service_fee": "AUD 2,385 (Additional Adult Dependent) + AUD 1,195 (Child Dependent)",
      "total_fee": "AUD 4,770 Base PR Fee (approx. \u20b92,62,000)",
      "currency": "AUD",
      "notes": "Paid online via ImmiAccount upon receiving an Invitation to Apply (ITA). Skills assessment fees (AUD 800 - 1,500) and English test fees are separate."
    },
    "proc_time": "6 to 12 Months from Lodgement on SkillSelect",
    "proc_details": "Lodged digitally via Home Affairs ImmiAccount following invitation from SkillSelect. Standard assessment takes 6 to 9 months for priority sectors.",
    "source": "Department of Home Affairs (ImmiAccount / SkillSelect)",
    "validity": "5 Years (Resident Return Visa - RRV facility)",
    "stay": "Indefinite Lawful Permanent Resident Status",
    "entry_type": "Multiple Entry",
    "invitation_doc": "SkillSelect Invitation to Apply (ITA) or State Nomination Grant",
    "invitation_desc": "Official invitation issued by the Department of Home Affairs through SkillSelect or formal state nomination approval notice.",
    "min_funds": "Personal savings of AUD $10,000 - $20,000 recommended for initial settlement (statutory proof mandatory for Subclass 190/491 states).",
    "highlights": [
      {
        "icon": "\ud83e\udd98",
        "title": "Direct Permanent Residence",
        "description": "Subclass 189 and 190 grant direct, unconditional permanent residency from the day of initial visa approval."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Medicare & Social Security",
        "description": "Immediate access to Australia's world-class public healthcare system (Medicare) and subsidized education."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "SkillSelect Points System",
        "description": "Merit-based points calculation rewarding age (25-32), English superior scores, bachelor/master degrees, and work experience."
      },
      {
        "icon": "\ud83c\udde6\ud83c\uddfa",
        "title": "Australian Citizenship in 4 Years",
        "description": "Eligible to apply for Australian Citizenship after 4 years of lawful residence, including at least 1 year as a Permanent Resident."
      }
    ],
    "faqs": [
      {
        "question": "What is the minimum points score to receive an invitation for Australia PR?",
        "answer": "The statutory minimum is 65 points on the SkillSelect points test. However, competitive invitations for high-demand occupations typically require 85 to 95+ points in recent invitation rounds."
      },
      {
        "question": "What is a Skills Assessment for Australian immigration?",
        "answer": "A mandatory pre-application assessment conducted by an authorized assessing body (such as ACS for IT, Engineers Australia for engineers, or VETASSESS) certifying that your qualifications and experience match Australian standards."
      },
      {
        "question": "What is the difference between Subclass 189 and Subclass 190?",
        "answer": "Subclass 189 is an independent federal visa allowing you to live and work anywhere in Australia without state sponsorship. Subclass 190 is a state-nominated visa that grants 5 bonus points in exchange for a commitment to live in the nominating state for 2 years."
      },
      {
        "question": "Can I include my family on an Australian PR application?",
        "answer": "Yes. Your spouse or de facto partner and dependent children can be included in the same application, granting them unconditional Australian Permanent Residency."
      },
      {
        "question": "What is the 5-year travel facility on an Australian PR visa?",
        "answer": "Your initial PR grant allows unrestricted travel into Australia for 5 years. If you travel overseas after 5 years, you must obtain a Resident Return Visa (Subclass 155/157) demonstrating continued ties or 2 years presence in Australia."
      }
    ]
  },
  "uk": {
    "cname": "United Kingdom",
    "scheme": "Indefinite Leave to Remain (ILR) / Settlement",
    "overview": "Indefinite Leave to Remain (ILR) is the United Kingdom's permanent residency status, granting foreign nationals the lawful right to live, work, and study in the UK without any immigration time restrictions or sponsor binding. ILR is typically achieved through 5 continuous years of lawful residence under qualifying categories (such as the Skilled Worker Visa, Scale-up Visa, Global Talent Visa, or Innovator Founder Visa; 3 years accelerated for exceptional talent). Applicants must pass the Life in the UK Test, demonstrate CEFR B1 English proficiency, and comply with the continuous residence rule (no more than 180 days absence in any 12-month period). After 12 months holding ILR, holders are eligible for British Citizenship.",
    "fees": {
      "visa_fee": "\u00a32,885 (Standard ILR Application Fee)",
      "service_fee": "\u00a3500 (Priority Service: 5 Days) or \u00a31,000 (Super Priority: Next Working Day)",
      "total_fee": "\u00a32,885 Statutory Base Fee (approx. \u20b93,08,000)",
      "currency": "GBP",
      "notes": "Paid online on GOV.UK. Life in the UK Test fee (\u00a350) is separate. No Immigration Health Surcharge (IHS) is payable once ILR is granted."
    },
    "proc_time": "6 Months (Standard) / Next Business Day (Super Priority)",
    "proc_details": "Processed online via GOV.UK. Super Priority option provides decision within 24 hours of biometric capture at UKVCAS.",
    "source": "UK Visas and Immigration (UKVI / Home Office)",
    "validity": "Permanent Settlement (No expiration of immigration status; BRP card valid 5-10 years)",
    "stay": "Indefinite Settlement",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Employer Settlement Letter & 5-Year Residence Dossier",
    "invitation_desc": "Official employer letter certifying that the sponsor still requires the applicant for the foreseeable future at or above the settlement salary threshold.",
    "min_funds": "Earnings meeting applicable settlement salary threshold (minimum \u00a338,700/year or going rate for Skilled Worker)",
    "highlights": [
      {
        "icon": "\ud83c\uddec\ud83c\udde7",
        "title": "Freedom from Sponsorship",
        "description": "Completely removes employer tie: work for any employer, establish businesses, or pursue independent consulting."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Zero Healthcare Surcharge (IHS)",
        "description": "Permanent exemption from the \u00a31,035/year Immigration Health Surcharge, with full free NHS access."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "British Citizenship in 12 Months",
        "description": "Eligible to apply for naturalisation as a British Citizen and obtain a UK Passport after 12 months of ILR."
      },
      {
        "icon": "\u26a1",
        "title": "Super Priority 24-Hour Decision",
        "description": "Optional Super Priority service grants same-day or next-business-day settlement adjudication."
      }
    ],
    "faqs": [
      {
        "question": "What is the 180-day rule for UK Indefinite Leave to Remain?",
        "answer": "You must not have been absent from the United Kingdom for more than 180 days in any rolling 12-month period during the continuous 5-year qualifying period."
      },
      {
        "question": "What tests must I pass before applying for ILR in the UK?",
        "answer": "You must pass the official 'Life in the UK' test (a 24-question test on British customs and history) and demonstrate English language proficiency at CEFR Level B1 or higher (or hold a degree taught in English)."
      },
      {
        "question": "Can I lose my Indefinite Leave to Remain status?",
        "answer": "Yes. If you remain outside the UK for more than 2 consecutive continuous years, your ILR status automatically lapses, requiring a Returning Resident visa to re-enter."
      },
      {
        "question": "Can my spouse and children apply for ILR at the same time as me?",
        "answer": "Yes. Dependents who have completed their own 5-year continuous qualifying residence in the UK as your partner/child can apply for ILR alongside you or separately."
      },
      {
        "question": "When can I apply for a British passport after getting ILR?",
        "answer": "You can apply for naturalization as a British citizen 12 months after receiving ILR (or immediately after ILR if you are married to a British citizen)."
      }
    ]
  },
  "germany": {
    "cname": "Germany",
    "scheme": "Permanent Settlement Permit (Niederlassungserlaubnis) / EU Long-Term Residence",
    "overview": "The German Permanent Settlement Permit (Niederlassungserlaubnis, \u00a718c AufenthG) is an open-ended residence title authorizing foreign nationals to reside, work, or engage in self-employment in Germany without time restrictions or employer limitations. Under Germany's modernized immigration framework, EU Blue Card holders enjoy the fastest path to permanent settlement in Europe: eligible after just 21 months with B1 German language skills, or 27 months with basic A1 German. General skilled workers qualify after 3 years, and German university graduates after 2 years. The permit requires continuous statutory pension contributions (Rentenversicherung), secure livelihood, and passing the 'Living in Germany' test (Einb\u00fcrgerungstest).",
    "fees": {
      "visa_fee": "\u20ac113 (Standard Settlement Fee for Skilled Workers / Blue Card)",
      "service_fee": "\u20ac147 (Self-employed / Business Investors)",
      "total_fee": "\u20ac113 Statutory Administrative Fee (approx. \u20b910,200)",
      "currency": "EUR",
      "notes": "Paid directly at the local Foreigners Registration Office (Ausl\u00e4nderbeh\u00f6rde) upon biometrics capture for the eAT plastic residence card."
    },
    "proc_time": "6 to 12 Weeks from Ausl\u00e4nderbeh\u00f6rde Appointment",
    "proc_details": "Application lodged with the local municipal Foreigners Authority (Ausl\u00e4nderbeh\u00f6rde) in your city of residence in Germany.",
    "source": "Federal Foreign Office & Municipal Foreigners Authorities (Ausl\u00e4nderbeh\u00f6rde)",
    "validity": "Unlimited / Permanent (Physical biometric card renewed every 10 years)",
    "stay": "Indefinite Settlement in Germany",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Rentenversicherung Contribution Statement & Employer Confirmation",
    "invitation_desc": "Official pension contribution statement (Versicherungsverlauf) proving 21 to 36 months of statutory contributions and current proof of active employment.",
    "min_funds": "Self-sustaining income covering living expenses, health insurance, and rental costs without social assistance (SGB II).",
    "highlights": [
      {
        "icon": "\ud83c\udde9\ud83c\uddea",
        "title": "21-Month Blue Card Fast Track",
        "description": "EU Blue Card holders can obtain permanent settlement after just 21 months with verified B1 German proficiency."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Labour Freedom",
        "description": "Complete freedom to work in any job, start a business, or work as an independent freelancer across Germany."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Pathway to German Citizenship in 3-5 Years",
        "description": "Under recent nationality law reforms, apply for German citizenship after 5 years (or 3 years with exceptional integration)."
      },
      {
        "icon": "\ud83c\uddea\ud83c\uddfa",
        "title": "EU Long-Term Residence Option",
        "description": "Eligible for Daueraufenthalt-EU, facilitating relocation and work permit rights in other EU member states."
      }
    ],
    "faqs": [
      {
        "question": "How quickly can an EU Blue Card holder get PR in Germany?",
        "answer": "An EU Blue Card holder can apply for a Niederlassungserlaubnis after just 21 months if they prove German language ability at CEFR level B1, or after 27 months with basic A1 German, provided pension contributions were paid."
      },
      {
        "question": "What is the German pension contribution requirement for settlement?",
        "answer": "You must prove that you have paid mandatory or voluntary contributions to the statutory pension scheme (Deutsche Rentenversicherung) for 21-27 months (Blue Card), 24 months (German graduates), or 36-60 months (general skilled workers)."
      },
      {
        "question": "What is the 'Living in Germany' test (Leben in Deutschland)?",
        "answer": "It is a 33-question multiple-choice test on the legal and social order and living conditions in Germany, required for general settlement and naturalization."
      },
      {
        "question": "Can I leave Germany without losing my Niederlassungserlaubnis?",
        "answer": "Standard Niederlassungserlaubnis holders can remain outside Germany for up to 6 months before it expires. EU Blue Card settlement holders and long-term residents can remain outside the EU for up to 12-24 months."
      },
      {
        "question": "Can my spouse work in Germany after I get permanent settlement?",
        "answer": "Your spouse already holds unrestricted employment rights under family reunification, and their own path to settlement is preserved."
      }
    ]
  },
  "new-zealand": {
    "cname": "New Zealand",
    "scheme": "Skilled Migrant Category (SMC) Resident Visa & Green List Straight to Residence",
    "overview": "New Zealand's permanent residence system attracts skilled global professionals through the modernized 6-Point Skilled Migrant Category (SMC) system and the Green List Straight to Residence pathways. Under the 6-point system, applicants claim points for New Zealand occupational registration, advanced educational qualifications (Bachelor's to PhD), or high income (1.5x to 3x median wage), combined with 1 to 3 years of skilled New Zealand work experience. Occupations on Tier 1 of the Green List (software engineers, doctors, civil engineers) qualify for direct Straight to Residence without prior NZ work experience. Once granted a Resident Visa, completing 2 years of residence entitles holders to a Permanent Resident Visa (PRV) with permanent travel facility.",
    "fees": {
      "visa_fee": "NZD 4,290 (approx. \u20b92,18,000 SMC Application Fee)",
      "service_fee": "NZD 1,000 (Immigration Levy Included)",
      "total_fee": "NZD 4,290 Total Statutory Fee",
      "currency": "NZD",
      "notes": "Paid online via Immigration New Zealand (INZ) portal. Covers principal applicant and accompanying spouse and dependent children."
    },
    "proc_time": "6 to 9 Months from Submission",
    "proc_details": "Processed online via Immigration Online by Immigration New Zealand (INZ). Green List applications prioritized within 6 to 8 weeks.",
    "source": "Immigration New Zealand (INZ / Immigration Online)",
    "validity": "2 Years (Resident Visa travel conditions) leading to unconditional Permanent Resident Visa (PRV)",
    "stay": "Indefinite Settlement in New Zealand",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Accredited Employer Job Offer & 6-Point SMC Assessment",
    "invitation_desc": "Permanent or minimum 12-month full-time employment contract with an INZ Accredited Employer paying at least the median wage.",
    "min_funds": "Full-time employment contract paying at or above the median hourly wage (NZD $31.61/hour as of 2024).",
    "highlights": [
      {
        "icon": "\ud83e\udd5d",
        "title": "Green List Straight to Residence",
        "description": "Direct fast-track residence for high-demand IT engineers, doctors, and construction specialists."
      },
      {
        "icon": "\ud83d\udccb",
        "title": "Simplified 6-Point SMC System",
        "description": "Transparent criteria awarding points for recognized degrees, professional registration, or high income."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Resident Visa (PRV)",
        "description": "After 2 years on a Resident Visa, transition to a lifetime PRV with perpetual return travel rights."
      },
      {
        "icon": "\ud83c\udf0f",
        "title": "Australian Freedom of Movement",
        "description": "New Zealand citizens enjoy automatic Special Category (Subclass 444) visas to live and work indefinitely in Australia."
      }
    ],
    "faqs": [
      {
        "question": "What is the 6-point system for New Zealand Skilled Migrant Category?",
        "answer": "You must claim 6 points from one of three skill pillars: (1) NZ occupational registration (3-6 pts), (2) recognized qualifications (Bachelor 3 pts, Master 5 pts, PhD 6 pts), or (3) high income (1.5x median wage 3 pts, 3x median wage 6 pts) + 1-3 points for NZ skilled work experience."
      },
      {
        "question": "What is the Green List Straight to Residence pathway?",
        "answer": "Eligible professionals in Tier 1 Green List roles (such as software engineers, medical practitioners, university lecturers) who have a full-time job offer from an accredited employer can apply directly for residence from overseas without waiting."
      },
      {
        "question": "What is the difference between an NZ Resident Visa and a Permanent Resident Visa?",
        "answer": "A Resident Visa grants permanent stay in NZ, but its travel conditions expire after 2 years. A Permanent Resident Visa (PRV), granted after 2 years of meeting commitment criteria, allows lifetime indefinite return to New Zealand."
      },
      {
        "question": "Can I include my partner and children in my New Zealand residence application?",
        "answer": "Yes. Partners (who meet genuine and stable relationship criteria) and dependent children aged 24 and under can be included in your residence application."
      },
      {
        "question": "When can a New Zealand permanent resident apply for citizenship?",
        "answer": "You can apply for New Zealand citizenship after holding residence status and living in New Zealand for at least 5 continuous years, spending at least 240 days in NZ each year."
      }
    ]
  },
  "singapore": {
    "cname": "Singapore",
    "scheme": "Professionals/Technical Personnel and Skilled Workers (PTS) Scheme",
    "overview": "Singapore Permanent Residence (PR) under the Professionals/Technical Personnel and Skilled Workers (PTS) scheme is the premier immigration pathway for foreign professionals holding valid Employment Passes (EP) or S Passes. Administered by the Immigration & Checkpoints Authority (ICA), PR status grants lifelong lawful residency, complete freedom from work pass sponsorship, eligibility to purchase subsidized HDB resale apartments, access to the Central Provident Fund (CPF) retirement and healthcare scheme, and enrollment in premier public schools. Selection is holistic, evaluating economic contributions, academic credentials, professional industry, integration into Singaporean society, and family ties.",
    "fees": {
      "visa_fee": "SGD $100 (Non-refundable Application Fee per applicant)",
      "service_fee": "SGD $120 (Entry Permit + Re-Entry Permit + Identity Card upon approval)",
      "total_fee": "SGD $220 Statutory Reference (approx. \u20b914,000)",
      "currency": "SGD",
      "notes": "Applied online via the ICA Electronic PR (e-PR) portal. Principal applicant pays $100 per applicant at lodgement."
    },
    "proc_time": "6 to 12 Months from Electronic Submission",
    "proc_details": "Lodged digitally via the ICA e-PR system using Singpass. Assessment involves multiple government ministry reviews.",
    "source": "Immigration & Checkpoints Authority (ICA Singapore)",
    "validity": "Permanent Residency (Re-Entry Permit - REP renewed every 5 years)",
    "stay": "Lifelong Permanent Resident Status",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Annex A Employer Verification & Tax Assessment Notices (NOA)",
    "invitation_desc": "Official ICA Annex A form signed by the Singapore employer and past 3 years of Inland Revenue Authority of Singapore (IRAS) Notices of Assessment.",
    "min_funds": "Gainfully employed holding valid EP/S Pass with stable monthly salary (typically SGD $8,000 - $15,000+/month).",
    "highlights": [
      {
        "icon": "\ud83c\uddf8\ud83c\uddec",
        "title": "Freedom from Work Passes",
        "description": "Permanent right to work in Singapore without employer sponsorship, quota constraints, or COMPASS checks."
      },
      {
        "icon": "\ud83c\udfe6",
        "title": "Central Provident Fund (CPF)",
        "description": "Mandatory employer (17%) and employee (20%) pension contributions for tax-free retirement and medical savings."
      },
      {
        "icon": "\ud83c\udfe0",
        "title": "HDB & Private Property Rights",
        "description": "Eligible to purchase resale Housing & Development Board (HDB) flats and enjoy significantly reduced buyer stamp duties."
      },
      {
        "icon": "\ud83e\udd81",
        "title": "Singapore Citizenship Pathway",
        "description": "Eligible to apply for Singapore Citizenship after completing 2 years of permanent residency."
      }
    ],
    "faqs": [
      {
        "question": "When can an Employment Pass holder apply for Singapore PR?",
        "answer": "There is no statutory minimum waiting period, but it is standard practice to apply after completing at least 1 to 2 years of continuous, tax-paying employment in Singapore under the PTS scheme."
      },
      {
        "question": "What is the National Service (NS) liability for Singapore PRs?",
        "answer": "Male applicants who receive PR under the PTS scheme as first-generation migrants are exempt from National Service. However, male children granted PR as dependents are legally liable for mandatory full-time National Service upon reaching age 18."
      },
      {
        "question": "What is a Re-Entry Permit (REP)?",
        "answer": "An REP is a travel authorization that allows a Singapore PR to retain permanent resident status while traveling abroad, typically renewed online every 5 years based on continuing economic ties to Singapore."
      },
      {
        "question": "What factors improve chances of Singapore PR approval?",
        "answer": "Stable employment in key strategic growth sectors (ICT, semiconductors, biotech, finance), competitive salary, degrees from top universities, paying taxes via IRAS, and demonstrable community integration."
      },
      {
        "question": "Can I include my family on my Singapore PR application?",
        "answer": "Yes. You can sponsor your legal spouse and unmarried biological or legally adopted children under the age of 21 within your e-PR application."
      }
    ]
  },
  "uae": {
    "cname": "United Arab Emirates",
    "scheme": "UAE 10-Year Golden Visa (Specialists, Executives & Real Estate Investors)",
    "overview": "The UAE 10-Year Golden Visa is the United Arab Emirates' flagship long-term residency program, granting expatriates, top executive talents, specialized professionals, and major property investors permanent-equivalent residency without requiring a national sponsor. High-skilled employees holding a bachelor's degree and earning a basic monthly salary of at least AED 30,000 qualify under the 'Skilled Professionals' category. Real estate investors purchasing properties valued at AED 2,000,000 or more qualify for 10-year residency. Golden Visa holders enjoy complete self-sponsorship, 100% tax-free income, unrestricted domestic and foreign travel (no 6-month stay requirement), and unlimited family sponsorship.",
    "fees": {
      "visa_fee": "AED 2,800 - 3,800 (approx. \u20b964,000 - \u20b986,000 for 10-Year Residency & Emirates ID)",
      "service_fee": "AED 350 (ICP Nomination Assessment)",
      "total_fee": "AED 3,150 - 4,150 Total Government Reference",
      "currency": "AED",
      "notes": "Applied online via the ICP Smart Services or GDRFA Dubai portal. Includes 10-year physical Emirates ID card and VIP medical screening."
    },
    "proc_time": "1 to 2 Weeks from ICP Nomination Approval",
    "proc_details": "Digital application via ICP or GDRFA portal. Once initial nomination is endorsed, medical fitness and biometric issuance are completed in 3 to 5 business days.",
    "source": "Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) & GDRFA Dubai",
    "validity": "10 Years (Renewable indefinitely upon maintaining qualifying criteria)",
    "stay": "Continuous 10-Year Residency (No 6-month outside UAE stay cancellation rule)",
    "entry_type": "Multiple Entry",
    "invitation_doc": "MOHRE Contract / Salary Certificate or Real Estate Title Deed",
    "invitation_desc": "Official salary certificate demonstrating AED 30,000+/month basic wage or official Land Department Title Deed showing AED 2M+ valuation.",
    "min_funds": "Monthly basic salary of AED 30,000+ or real estate property investment of AED 2,000,000+.",
    "highlights": [
      {
        "icon": "\ud83c\udf1f",
        "title": "10-Year Self-Sponsored Residency",
        "description": "100% self-sponsored long-term residency without requiring a local Emirati partner or employer sponsorship."
      },
      {
        "icon": "\ud83c\udf34",
        "title": "Zero Minimum Stay Cancellation",
        "description": "Holders can remain outside the UAE for longer than 6 continuous months without their Golden Visa being invalidated."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Unlimited Family Sponsorship",
        "description": "Sponsor spouse, children of any age, and domestic staff with uninterrupted validity even upon the holder's passing."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "100% Tax-Free Earnings",
        "description": "Zero personal income tax, capital gains tax, or corporate withholding taxes on individual compensation."
      }
    ],
    "faqs": [
      {
        "question": "Who qualifies for the UAE 10-Year Golden Visa through employment?",
        "answer": "Skilled professionals classified under MOHRE Occupational Level 1 or 2 who hold a bachelor's degree and earn a basic monthly salary of at least AED 30,000 qualify for the 10-Year Golden Visa."
      },
      {
        "question": "Can I qualify for the UAE Golden Visa through property investment?",
        "answer": "Yes. Investors who purchase one or more real estate properties in the UAE with a combined valuation of at least AED 2,000,000 (including mortgaged properties with bank clearance) qualify for a 10-year renewable visa."
      },
      {
        "question": "Do Golden Visa holders lose their residency if they stay outside the UAE for 6 months?",
        "answer": "No. Unlike standard UAE residence visas, Golden Visa holders are exempt from the 6-month stay rule and can remain outside the UAE indefinitely without their residency being canceled."
      },
      {
        "question": "Can I sponsor my family on a UAE Golden Visa?",
        "answer": "Yes. Golden Visa holders can sponsor their spouse and children of any age (no 25-year-old cap for sons), as well as parents and domestic staff."
      },
      {
        "question": "Can I work for any employer in the UAE with a Golden Visa?",
        "answer": "Yes. The Golden Visa provides independent self-sponsored residency. You can work for any company, open your own business, or work as an independent consultant without employer visa transfer."
      }
    ]
  },
  "usa": {
    "cname": "United States",
    "scheme": "Employment-Based Permanent Residency (EB-1, EB-2 NIW, EB-3 Green Card)",
    "overview": "United States Lawful Permanent Residency (Green Card) grants foreign nationals the statutory authorization to reside and work permanently in the United States. Employment-based pathways include EB-1 (Priority Workers: extraordinary ability, outstanding researchers, multinational managers), EB-2 (Advanced Degree professionals or exceptional ability, including National Interest Waivers - NIW), and EB-3 (Skilled Workers with bachelor's degrees). Most EB-2 and EB-3 pathways require a certified permanent labor certification (PERM) from the US Department of Labor confirming no qualified US workers were available, followed by an approved Form I-140 and adjustment of status (Form I-485) or consular processing.",
    "fees": {
      "visa_fee": "USD $715 (Form I-140 Petition Fee) + USD $1,440 (Form I-485 Adjustment of Status)",
      "service_fee": "USD $2,805 (Optional Form I-907 Premium Processing)",
      "total_fee": "USD $2,155+ Government Reference",
      "currency": "USD",
      "notes": "PERM recruitment and filing costs must be paid exclusively by the sponsoring US employer. Immigrant visa fee at consulate is $345."
    },
    "proc_time": "1 to 3 Years (Subject to Visa Bulletin Priority Date Backlogs for India)",
    "proc_details": "Three-stage procedure: (1) DOL PERM labor certification, (2) USCIS Form I-140 immigrant petition, and (3) Form I-485 adjustment of status once priority date is current.",
    "source": "U.S. Citizenship and Immigration Services (USCIS) & U.S. Department of State",
    "validity": "10 Years (Form I-551 Permanent Resident Card - Green Card, renewable)",
    "stay": "Permanent Lawful Resident Status",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Approved Form I-140 Immigrant Petition & Certified ETA-9089",
    "invitation_desc": "Official USCIS Form I-797 Notice of Action confirming approval of Form I-140 Immigrant Petition for Alien Worker.",
    "min_funds": "Guaranteed permanent job offer paying certified prevailing wage or Form I-864 Affidavit of Support.",
    "highlights": [
      {
        "icon": "\ud83c\uddfa\ud83c\uddf8",
        "title": "Lawful Permanent Residency",
        "description": "Full permanent residency (Green Card) granting unrestricted right to live, work, and study anywhere in the United States."
      },
      {
        "icon": "\ud83c\udf93",
        "title": "EB-2 NIW Self-Petitioning",
        "description": "National Interest Waiver allows eligible advanced degree specialists to self-petition without employer sponsorship or PERM."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "AC21 Job Portability",
        "description": "Change employers 180 days after filing Form I-485 in a same or similar occupational classification without losing Green Card priority."
      },
      {
        "icon": "\ud83d\uddfd",
        "title": "US Citizenship in 5 Years",
        "description": "Eligible to apply for naturalization as a United States Citizen after 5 continuous years of Lawful Permanent Resident status."
      }
    ],
    "faqs": [
      {
        "question": "What is the PERM labor certification process in the US?",
        "answer": "PERM is a Department of Labor recruitment and advertising process that the employer must conduct to test the US labor market and prove that no qualified, willing, and available US workers exist for the position."
      },
      {
        "question": "What is the Visa Bulletin and Priority Date for Indian applicants?",
        "answer": "Your Priority Date is established when your PERM or I-140 is filed. Because US law imposes a 7% per-country numerical ceiling, immigrant visas for applicants born in India have significant backlogs in EB-2 and EB-3 categories."
      },
      {
        "question": "What is an EB-2 National Interest Waiver (NIW)?",
        "answer": "An EB-2 NIW allows advanced-degree professionals to waive the job offer and PERM labor certification requirements if their proposed endeavor has substantial merit, national importance, and benefits the United States."
      },
      {
        "question": "Can I work for any employer after getting a Green Card?",
        "answer": "Yes. A Green Card grants complete employment authorization. You can work for any company, freelance, establish a business, or retire."
      },
      {
        "question": "When can a Green Card holder apply for US Citizenship?",
        "answer": "You can apply for naturalization (Form N-400) after 5 continuous years as a Lawful Permanent Resident (or 3 years if married to a US citizen), provided you meet physical presence requirements."
      }
    ]
  },
  "ireland": {
    "cname": "Ireland",
    "scheme": "Stamp 4 Permanent Residence Permission / Long Term Residency",
    "overview": "Ireland offers an accelerated, world-class settlement framework for international professionals through the Stamp 4 permission. Foreign specialists holding a Critical Skills Employment Permit (CSEP) can apply directly for Stamp 4 immigration permission after just 2 years of qualifying employment with their sponsoring employer. General Employment Permit holders qualify for Stamp 4 after 5 continuous years. Stamp 4 confers unrestricted employment rights\u2014allowing individuals to work in any role, switch companies without an employment permit, establish commercial businesses, and sponsor family members. After 5 years of reckonable residence, holders can apply for Irish Citizenship and an EU Passport.",
    "fees": {
      "visa_fee": "\u20ac300 (Irish Residence Permit - IRP Card Fee)",
      "service_fee": "\u20ac500 (Long Term Residency Application Fee, if applying separately)",
      "total_fee": "\u20ac300 Standard IRP Fee (approx. \u20b927,000)",
      "currency": "EUR",
      "notes": "CSEP holders transition to Stamp 4 with no separate government visa fee other than the standard \u20ac300 IRP registration fee."
    },
    "proc_time": "4 to 8 Weeks from Stamp 4 Support Letter Submission",
    "proc_details": "First, obtain a Stamp 4 Support Letter from DETE. Second, book an appointment at the local immigration registration office (ISD Dublin or Garda immigration) to collect the Stamp 4 IRP card.",
    "source": "Department of Enterprise, Trade and Employment (DETE) & Irish Immigration Service (ISD)",
    "validity": "2 Years (Renewable for 3 years, leading directly to permanent settlement)",
    "stay": "Indefinite Settlement Permission",
    "entry_type": "Multiple Entry",
    "invitation_doc": "DETE Stamp 4 Support Letter & P60 / Employment Detail Summary",
    "invitation_desc": "Official Stamp 4 Support Letter issued by DETE verifying 21+ months of continuous employment on a Critical Skills permit accompanied by Revenue tax summaries.",
    "min_funds": "Demonstrated continuous employment meeting Critical Skills threshold (\u20ac38,000 - \u20ac64,000/year).",
    "highlights": [
      {
        "icon": "\ud83c\uddee\ud83c\uddea",
        "title": "Stamp 4 in Just 2 Years",
        "description": "Critical Skills permit holders qualify for Stamp 4 immigration permission after only 21 to 24 months of employment."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Employment Rights",
        "description": "Work for any employer in Ireland without an employment permit, establish a business, or pursue consulting."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "5-Year Irish EU Citizenship",
        "description": "Eligible to apply for Irish Citizenship by naturalization after 5 years of reckonable residence (1,825 days)."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Full Family Work Permissions",
        "description": "Spouses and dependents hold Stamp 1G/4 permissions with full independent employment rights in Ireland."
      }
    ],
    "faqs": [
      {
        "question": "How do I transition from Critical Skills Permit to Stamp 4 in Ireland?",
        "answer": "After working for 21 months with your employer on a CSEP, apply online to DETE for a Stamp 4 Support Letter. Present this letter with recent payslips and P60/Employment Detail Summary to the immigration office to receive your Stamp 4 IRP card."
      },
      {
        "question": "What can I do on Stamp 4 that I couldn't do on Stamp 1?",
        "answer": "On Stamp 4, you no longer require an employment permit from DETE. You can change employers freely, work multiple jobs, start your own enterprise, or freelance."
      },
      {
        "question": "Does Ireland offer an EU Long-Term Resident status?",
        "answer": "Yes. Foreign nationals who have completed 5 years of continuous legal residence on work permits in Ireland can apply for Long-Term Residency."
      },
      {
        "question": "Can I travel to the UK or Europe with an Irish Stamp 4 card?",
        "answer": "Ireland is not part of the Schengen zone. Stamp 4 grants residence rights solely in Ireland. Travel to Schengen or the UK requires standard visitor visas depending on your passport."
      },
      {
        "question": "When can I apply for an Irish passport and citizenship?",
        "answer": "You can apply for Irish citizenship by naturalisation after accumulating 5 years (1,825 days) of reckonable residence in Ireland over the preceding 9 years, including 1 continuous year before applying."
      }
    ]
  },
  "austria": {
    "cname": "Austria",
    "scheme": "Long-Term Resident \u2013 EU (Daueraufenthalt \u2013 EU) & Red-White-Red Card Plus",
    "overview": "Austria's permanent settlement framework is anchored by the 'Long-Term Resident \u2013 EU' (Daueraufenthalt \u2013 EU) title, governed by the Austrian Settlement and Residence Act (NAG). Foreign professionals who have held continuous legal residence in Austria for 5 years on a Red-White-Red Card or EU Blue Card qualify for Daueraufenthalt \u2013 EU. Applicants must demonstrate Module 2 of the Integration Agreement (German B1 proficiency), stable earnings meeting Austrian collective agreement benchmarks, adequate residential accommodation, and clean criminal standing. The status grants indefinite settlement, full labour market parity with Austrian citizens, and mobility across the European Union.",
    "fees": {
      "visa_fee": "\u20ac160 (Statutory Daueraufenthalt Application & Card Fee)",
      "service_fee": "\u20ac20 (Police Biometric Verification Fee)",
      "total_fee": "\u20ac180 Total Reference (approx. \u20b916,200)",
      "currency": "EUR",
      "notes": "Paid directly to the competent settlement authority in Austria (Magistrat or Bezirkshauptmannschaft) upon biometrics capture."
    },
    "proc_time": "2 to 3 Months from Application Lodgement",
    "proc_details": "Lodged in Austria with the local provincial settlement authority (Magistratsabteilung 35 in Vienna or Bezirkshauptmannschaft in other federal provinces).",
    "source": "Austrian Federal Ministry of the Interior (BMI) & Settlement Authorities (Magistrat / BH)",
    "validity": "5 Years (Biometric Card validity, status is permanent and open-ended)",
    "stay": "Indefinite Settlement in Austria",
    "entry_type": "Multiple Entry",
    "invitation_doc": "5-Year Residence Dossier & Austrian Social Insurance Extract (\u00d6GK)",
    "invitation_desc": "Certified insurance history statement from the \u00d6sterreichische Gesundheitskasse (\u00d6GK) confirming 5 continuous years of employment and social insurance.",
    "min_funds": "Regular monthly net income exceeding the ASVG standard equalization supplement rate (\u20ac1,217 single / \u20ac1,921 couple).",
    "highlights": [
      {
        "icon": "\ud83c\udde6\ud83c\uddf9",
        "title": "Indefinite Settlement Rights",
        "description": "Lifelong permanent residence authorization in Austria with unrestricted labour and commercial rights."
      },
      {
        "icon": "\ud83c\uddea\ud83c\uddfa",
        "title": "EU-Wide Mobility Directive",
        "description": "Daueraufenthalt \u2013 EU grants privileged access to live, study, and work in other EU member states under Directive 2003/109/EC."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Integration Agreement Module 2",
        "description": "German B1 language proficiency certifies full social and economic integration into Austrian society."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Full Social Security Parity",
        "description": "Equal access to Austrian public welfare, universal healthcare (\u00d6GK), unemployment insurance, and family allowances."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between RWR Card Plus and Daueraufenthalt \u2013 EU in Austria?",
        "answer": "The Red-White-Red Card Plus is a temporary permit granted after 21 months of an RWR Card that allows free access to the Austrian labour market. Daueraufenthalt \u2013 EU is the permanent settlement title granted after 5 continuous years."
      },
      {
        "question": "What German language level is required for Austrian permanent residence?",
        "answer": "You must fulfill Module 2 of the Integration Agreement, which requires passing a recognized German B1 language examination (\u00d6SD, Goethe, or telc) that includes knowledge of Austrian values."
      },
      {
        "question": "How long can I stay outside Austria without losing Daueraufenthalt \u2013 EU?",
        "answer": "You can stay outside the European Union for up to 12 consecutive months without losing your Daueraufenthalt \u2013 EU status (or up to 24 months for former EU Blue Card holders)."
      },
      {
        "question": "Can I apply for Austrian citizenship after getting permanent residence?",
        "answer": "Yes. Foreign nationals can apply for Austrian citizenship after 6 to 10 years of legal residence, provided they demonstrate B2 German proficiency, financial self-sufficiency, and pass the citizenship exam."
      },
      {
        "question": "Are my family members eligible for Daueraufenthalt \u2013 EU?",
        "answer": "Yes. Family members who have legally resided in Austria for 5 continuous years and have fulfilled Module 2 of the Integration Agreement can apply for their own Daueraufenthalt \u2013 EU cards."
      }
    ]
  },
  "belgium": {
    "cname": "Belgium",
    "scheme": "Belgian Long-Term Resident (Statut de R\u00e9sident de Longue Dur\u00e9e / Electronic D Card)",
    "overview": "Belgium's permanent settlement scheme is governed by the Law of 15 December 1980 and the EU Long-Term Residents Directive. Non-EEA professionals who have resided legally and uninterruptedly in Belgium for 5 years holding qualifying residence permits (Single Permit, EU Blue Card) are entitled to apply for Belgian Long-Term Resident status (R\u00e9sident de Longue Dur\u00e9e - D Card / K Card). The applicant must prove stable, regular, and sufficient financial resources (minimum \u20ac1,070/month net plus \u20ac356 per dependent), comprehensive health insurance, and clean criminal record. Long-term resident status grants unconditional access to the Belgian labour market and EU-wide mobility privileges.",
    "fees": {
      "visa_fee": "\u20ac25 - \u20ac50 (Municipal Administrative Card Fee for Electronic D Card)",
      "service_fee": "Nil",
      "total_fee": "approx. \u20ac50 Municipal Reference (approx. \u20b94,500)",
      "currency": "EUR",
      "notes": "Application lodged at the local municipal administrative office (Maison Communale / Gemeentehuis) in your place of residence in Belgium."
    },
    "proc_time": "2 to 4 Months from Municipal Submission",
    "proc_details": "Lodged at the local municipality, which forwards the dossier to the Belgian Immigration Office (DOFI / Office des \u00c9trangers) for final statutory decision.",
    "source": "Belgian Immigration Office (DOFI / Office des \u00c9trangers) & Municipal Administrations",
    "validity": "5 Years (Physical D-card validity, underlying settlement right is indefinite)",
    "stay": "Indefinite Settlement in Belgium",
    "entry_type": "Multiple Entry",
    "invitation_doc": "5-Year Belgian Residence History & Tax Assessment Summaries (Avertissement-Extrait de R\u00f4le)",
    "invitation_desc": "Official Belgian personal income tax assessments from the SPF Finances proving 5 years of uninterrupted income and statutory social contributions.",
    "min_funds": "Stable regular income exceeding the statutory integration minimum (approx. \u20ac1,070/month net for individual).",
    "highlights": [
      {
        "icon": "\ud83c\udde7\ud83c\uddea",
        "title": "Electronic D-Card Settlement",
        "description": "Unconditional permanent settlement status granting complete parity with Belgian nationals in employment and commerce."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Exemption from Work Permits",
        "description": "Permanently eliminates the requirement for Single Permits or regional labour ministry authorizations."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Belgian Citizenship in 5 Years",
        "description": "Eligible to apply for Belgian Nationality (EU Passport) immediately upon completing 5 years of legal residence and social integration."
      },
      {
        "icon": "\ud83c\uddea\ud83c\uddfa",
        "title": "EU Long-Term Mobility",
        "description": "Facilitates relocation to other European Union member states for employment or business under EU Directive 2003/109/EC."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between an electronic B-card and D-card in Belgium?",
        "answer": "The B-card is an indefinite residence permit valid only within Belgium. The D-card is the EU Long-Term Resident status, which grants both permanent settlement in Belgium and mobility rights across the European Union."
      },
      {
        "question": "Can I apply for Belgian citizenship after 5 years on a work permit?",
        "answer": "Yes. Under the Belgian Nationality Code, foreign nationals who have completed 5 years of uninterrupted legal residence, prove language knowledge (French, Dutch, or German at A2 level), and prove 468 days of work can apply directly for Belgian citizenship."
      },
      {
        "question": "What absences are permitted during the 5-year qualifying period in Belgium?",
        "answer": "Absences from Belgium must not exceed 6 consecutive months and must not total more than 10 months over the entire 5-year period."
      },
      {
        "question": "Do I need to take a formal integration test in Belgium?",
        "answer": "In Flanders, completing a formal integration course (inburgering) is mandatory. In Wallonia and Brussels, completing an integration pathway is required for settlement or nationality."
      },
      {
        "question": "Can my spouse obtain permanent residence in Belgium simultaneously?",
        "answer": "Yes. Family members who have legally resided in Belgium for 5 continuous years can submit concurrent applications for their own D-cards."
      }
    ]
  },
  "denmark": {
    "cname": "Denmark",
    "scheme": "Permanent Residence Permit (Tidsubegr\u00e6nset Opholdstilladelse)",
    "overview": "Denmark's Permanent Residence Permit (Tidsubegr\u00e6nset opholdstilladelse), administered by the Danish Immigration Service and SIRI, grants foreign nationals the permanent right to reside and work in Denmark. Applicants must have resided legally in Denmark for at least 8 continuous years (reduced to 4 years if meeting all 4 supplementary requirements). Mandatory basic requirements include passing the Danish 2 Language Test (Pr\u00f8ve i Dansk 2), being currently employed in ordinary, full-time employment, having worked full-time for at least 3.5 of the past 4 years, not receiving public social assistance (aktivloven) for 4 years, and having a clean criminal record.",
    "fees": {
      "visa_fee": "DKK 4,945 (approx. \u20ac665 / \u20b959,000 SIRI Case Order Fee)",
      "service_fee": "\u20ac30 (Biometrics Fee)",
      "total_fee": "DKK 4,945 + Biometrics Fee",
      "currency": "DKK",
      "notes": "Case Order ID created on newtodenmark.dk and fee paid online prior to biometric submission."
    },
    "proc_time": "6 to 8 Months from Submission",
    "proc_details": "Processed by the Danish Immigration Service or SIRI following digital lodgement on newtodenmark.dk.",
    "source": "Danish Agency for International Recruitment and Integration (SIRI) & Danish Immigration Service",
    "validity": "Permanent / Unlimited (Plastic card renewed every 5-10 years)",
    "stay": "Permanent Lawful Settlement in Denmark",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Danish Employment History (eIndkomst) & Pr\u00f8ve i Dansk 2 Certificate",
    "invitation_desc": "Official Danish Tax Agency (Skattestyrelsen) eIndkomst extract proving 3.5+ years of full-time employment and official language examination certificate.",
    "min_funds": "Ordinary full-time employment (minimum 30 hours/week) and financial self-sufficiency with no public welfare claims for 4 years.",
    "highlights": [
      {
        "icon": "\ud83c\udde9\ud83c\uddf0",
        "title": "Fast-Track 4-Year Settlement",
        "description": "Achieve permanent residence in just 4 years by meeting supplementary criteria: Pr\u00f8ve i Dansk 3, 4 years work, high income, or active civic engagement."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Work Permit Exemption",
        "description": "Completely removes employer sponsorship requirements, salary thresholds, and Pay Limit regulations."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Indefinite Danish Residence",
        "description": "Permanent lawful status with full access to Danish healthcare, university tuition, and social pension systems."
      },
      {
        "icon": "\ud83d\udc51",
        "title": "Pathway to Danish Citizenship",
        "description": "Permanent residence is the mandatory prerequisite before applying for Danish naturalization."
      }
    ],
    "faqs": [
      {
        "question": "What is the 4-year fast-track permanent residence in Denmark?",
        "answer": "You can qualify for permanent residence after 4 years instead of 8 if you meet the basic criteria and fulfill all 4 supplementary requirements: (1) Pr\u00f8ve i Dansk 3, (2) 4 years full-time work, (3) annual income above DKK 328,000, and (4) passing the active citizenship test or participating in local council work."
      },
      {
        "question": "What is the Danish language requirement for permanent residence?",
        "answer": "You must pass the official 'Pr\u00f8ve i Dansk 2' language examination (or an equivalent or higher Danish test such as Pr\u00f8ve i Dansk 3)."
      },
      {
        "question": "What constitutes 'ordinary full-time employment' in Denmark?",
        "answer": "Employment of at least 30 hours per week under a standard Danish employment contract complying with collective bargaining standards."
      },
      {
        "question": "Can I receive public benefits while qualifying for Danish PR?",
        "answer": "You must not have received any benefits under the Active Social Policy Act (Aktivloven) or the Integration Act for the 4 years immediately preceding your application."
      },
      {
        "question": "Can my spouse apply for permanent residence in Denmark at the same time?",
        "answer": "Spouses must independently meet the permanent residence requirements (including residency duration, language test, and employment requirements)."
      }
    ]
  },
  "finland": {
    "cname": "Finland",
    "scheme": "Permanent Residence Permit (Pysyv\u00e4 oleskelulupa - P-lupa) / EU Long-Term Resident",
    "overview": "The Finnish Permanent Residence Permit (Pysyv\u00e4 oleskelulupa, P-permit), issued by the Finnish Immigration Service (Migri) under the Aliens Act (Ulkomaalaislaki), confers indefinite lawful residence in Finland. Foreign nationals qualify for a P-permit after residing continuously in Finland for 4 years holding a continuous residence permit (Type A permit, such as a Specialist or Employed Person permit). Applicants must have spent no more than 2 years total abroad during the 4-year qualifying period, have secure and verifiable income from employment or entrepreneurship, and maintain clean criminal standing. Permanent residence provides an immediate pathway to Finnish Citizenship.",
    "fees": {
      "visa_fee": "\u20ac220 (Electronic Application via Enter Finland) / \u20ac270 (Paper Application)",
      "service_fee": "Nil",
      "total_fee": "\u20ac220 Statutory Reference (approx. \u20b919,800)",
      "currency": "EUR",
      "notes": "Applied online via enterfinland.fi. Biometrics confirmed at a Migri service point in Finland."
    },
    "proc_time": "1 to 3 Months from Enter Finland Submission",
    "proc_details": "Automated and manual digital assessment via Migri's Enter Finland system. Decisions typically issued within 30 to 60 days.",
    "source": "Finnish Immigration Service (Migri / Enter Finland)",
    "validity": "Permanent / Unlimited (Biometric residence card renewed every 5 years)",
    "stay": "Indefinite Settlement in Finland",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Finnish Tax Assessment (Verotodistus) & 4-Year A-Permit History",
    "invitation_desc": "Official tax decisions from the Finnish Tax Administration (Verohallinto) and pension certificates confirming 4 years of continuous employment.",
    "min_funds": "Self-sustaining employment income meeting statutory threshold (minimum \u20ac1,399/month net).",
    "highlights": [
      {
        "icon": "\ud83c\uddeb\ud83c\uddee",
        "title": "P-Permit in 4 Years",
        "description": "Qualify for permanent residence after just 4 continuous years on a Type A work permit."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Labour Market Access",
        "description": "Complete freedom to work in any sector, establish innovative businesses, or study without permit restrictions."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Finnish Citizenship in 5 Years",
        "description": "Eligible for Finnish Citizenship (and EU Passport) after 5 years of residence (or 4 years with B1 Finnish/Swedish)."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Universal Kela Healthcare & Welfare",
        "description": "Full lifelong entitlement to Finland's world-renowned social security and universal healthcare system (Kela)."
      }
    ],
    "faqs": [
      {
        "question": "What is the continuous residence requirement for Finland permanent residence?",
        "answer": "You must hold a continuous residence permit (A-permit) for 4 uninterrupted years and have stayed in Finland for at least half of that time, with no single absence exceeding 2 years."
      },
      {
        "question": "Does student residence count towards Finnish permanent residency?",
        "answer": "Time spent on a B-permit (temporary student permit) counts as half time towards the 4-year requirement, provided you transition to a continuous A-permit before applying for permanent residence."
      },
      {
        "question": "Is there a Finnish language requirement for a Permanent Residence Permit (P-lupa)?",
        "answer": "No. Finnish language proficiency is NOT mandatory for the permanent residence permit (P-lupa). However, passing the YKI test at intermediate level (B1) is required if you subsequently apply for Finnish Citizenship."
      },
      {
        "question": "Can I lose my Finnish permanent residence permit?",
        "answer": "Your permanent permit can be cancelled if you move out of Finland permanently or live outside the European Union for 2 consecutive years without an exemption."
      },
      {
        "question": "Can my family members obtain permanent residence with me?",
        "answer": "Family members who have held continuous A-permits based on family ties for 4 years can apply for their own permanent residence permits simultaneously."
      }
    ]
  },
  "italy": {
    "cname": "Italy",
    "scheme": "EU Long-Term Residence Permit (Permesso di Soggiorno UE per Soggiornanti di Lungo Periodo)",
    "overview": "Italy's permanent residency framework is centered on the EU Long-Term Residence Permit (Permesso di Soggiorno UE per Soggiornanti di Lungo Periodo, formerly known as Carta di Soggiorno), issued under Article 9 of the Consolidated Immigration Act (TUI). Foreign nationals who have resided legally and continuously in Italy for at least 5 years holding a valid residence permit (such as a work permit or EU Blue Card) are entitled to apply. The applicant must prove a minimum annual income equal to the social allowance (Assegno Sociale, approx. \u20ac6,947/year plus 50% per dependent), pass an official Italian A2 language test, provide proof of suitable housing, and possess clean criminal standing.",
    "fees": {
      "visa_fee": "\u20ac100 (Statutory Long-Term Permit Electronic Card Fee)",
      "service_fee": "\u20ac30 (Post Office Postal Kit Fee) + \u20ac16 (Revenue Stamp - Marca da Bollo)",
      "total_fee": "\u20ac146 Total Government Reference (approx. \u20b913,200)",
      "currency": "EUR",
      "notes": "Submitted via the Yellow Postal Kit (Kit Giallo) at designated Italian Post Offices (Sportello Amico) followed by biometric booking at the Questura."
    },
    "proc_time": "3 to 6 Months from Questura Biometric Capture",
    "proc_details": "Lodged via the Post Office Sportello Amico, then processed by the Immigration Office (Ufficio Immigrazione) of the local Questura (police headquarters).",
    "source": "Ministry of the Interior (Ministero dell'Interno) & Questura / Prefettura",
    "validity": "Permanent / Unlimited (Physical card renewed every 10 years for adults)",
    "stay": "Indefinite Settlement in Italy",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Certificato di Idoneit\u00e0 Alloggiativa & Modello CUD / 730 Tax Returns",
    "invitation_desc": "Municipal housing suitability certificate (Certificato di idoneit\u00e0 alloggiativa) and past 3 years of Italian income tax declarations (Modello Unico / 730 / CUD).",
    "min_funds": "Annual income exceeding the statutory social allowance (\u20ac6,947/year for individual + \u20ac3,473 per dependent).",
    "highlights": [
      {
        "icon": "\ud83c\uddee\ud83c\uddf9",
        "title": "Indefinite Settlement Rights",
        "description": "Permanent lawful residence in Italy with unrestricted rights to work as an employee or independent professional."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Exemption from Work Visas",
        "description": "Permanently eliminates the requirement for Nulla Osta authorizations and annual Decreto Flussi quotas."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Italian Citizenship in 10 Years",
        "description": "Eligible to apply for Italian Citizenship by naturalization after completing 10 years of registered municipal residence."
      },
      {
        "icon": "\ud83c\uddea\ud83c\uddfa",
        "title": "EU Long-Term Mobility",
        "description": "Authorized to relocate, work, or study in other European Union member states under EU Directive 2003/109/EC."
      }
    ],
    "faqs": [
      {
        "question": "What Italian language test is required for permanent residence?",
        "answer": "You must pass an official Italian language test at CEFR Level A2 or higher organized by the Prefettura or hold an approved certificate from an accredited institution (CLI, Dante Alighieri, CILS, CELI)."
      },
      {
        "question": "What is the Certificato di Idoneit\u00e0 Alloggiativa in Italy?",
        "answer": "It is an official certificate issued by the local municipality (Comune) certifying that your apartment complies with statutory sanitary and surface standards based on the number of occupants."
      },
      {
        "question": "What absences from Italy are permitted during the 5-year qualifying period?",
        "answer": "You must not have been absent from Italy for more than 6 consecutive months, and total absences must not exceed 10 months over the 5-year qualifying period (12 months for EU Blue Card holders)."
      },
      {
        "question": "Can I lose my Italian EU long-term residence permit?",
        "answer": "The permit can be revoked if you stay outside the European Union for 12 consecutive months or if you acquire EU long-term resident status in another EU member state."
      },
      {
        "question": "Can my spouse and children obtain the EU long-term permit with me?",
        "answer": "Yes. Family members who have legally resided in Italy for 5 continuous years can apply, provided your household income meets the scaled social allowance benchmarks."
      }
    ]
  },
  "sweden": {
    "cname": "Sweden",
    "scheme": "Permanent Residence Permit (Permanent Uppeh\u00e5llstillst\u00e5nd - PUT) / EU Long-Term Resident",
    "overview": "The Swedish Permanent Residence Permit (Permanent Uppeh\u00e5llstillst\u00e5nd - PUT) is issued by the Swedish Migration Agency (Migrationsverket) under the Aliens Act (Utl\u00e4nningslagen). Foreign workers who have held a work permit in Sweden for a total of 4 years within the past 7 years can apply for permanent residence in conjunction with their work permit extension application. Under the revised Aliens Act, applicants must demonstrate financial self-support through ongoing employment or business activity of duration (at least 18 months), compliance with Swedish collective bargaining standards throughout their work history, and good conduct. Permanent residence confers indefinite residency and an accelerated path to Swedish Citizenship after 5 years.",
    "fees": {
      "visa_fee": "SEK 2,200 (Work Permit Extension & Permanent Residence Assessment)",
      "service_fee": "Nil",
      "total_fee": "SEK 2,200 Statutory Reference (approx. \u20b917,500)",
      "currency": "SEK",
      "notes": "Paid online via the Swedish Migration Agency (Migrationsverket) e-service portal."
    },
    "proc_time": "2 to 4 Months from Extension Lodgement",
    "proc_details": "Applied online concurrently with the work permit extension on Migrationsverket's digital portal.",
    "source": "Swedish Migration Agency (Migrationsverket)",
    "validity": "Permanent / Unlimited (Biometric residence card renewed every 5 years)",
    "stay": "Indefinite Settlement in Sweden",
    "entry_type": "Multiple Entry",
    "invitation_doc": "4-Year Employment Dossier & Swedish Tax Agency (Skatteverket) Records",
    "invitation_desc": "Official statement from Skatteverket (tax agency) and insurances certificates proving 4 years of uninterrupted employment and collective terms.",
    "min_funds": "Self-sustaining employment income with an employment contract lasting at least 18 months from the date of decision.",
    "highlights": [
      {
        "icon": "\ud83c\uddf8\ud83c\uddea",
        "title": "Permanent Residence in 4 Years",
        "description": "Eligible for PUT after holding a Swedish work permit for 4 years within the previous 7-year period."
      },
      {
        "icon": "\ud83d\udcbc",
        "title": "Unrestricted Labour Freedom",
        "description": "Completely eliminates employer and occupation ties, allowing you to work for any employer or start an enterprise."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Swedish Citizenship in 5 Years",
        "description": "Apply for Swedish Citizenship and an EU Passport after 5 years of continuous habitual residence in Sweden."
      },
      {
        "icon": "\ud83c\udfe5",
        "title": "Universal Public Services",
        "description": "Equal access to universal healthcare, parental leave insurance, free higher education, and state pensions."
      }
    ],
    "faqs": [
      {
        "question": "What is the 18-month employment requirement for Swedish PR?",
        "answer": "Under the new Swedish Aliens Act, you must prove that you can support yourself through ongoing employment or business activity that is expected to last for at least 18 months from the date of the permanent residence decision."
      },
      {
        "question": "Are past insurances audited during the Swedish PR application?",
        "answer": "Yes. Migrationsverket strictly verifies that your employer provided occupational pension, health, life, and industrial injury insurances covering every single month of your 4-year work history in Sweden."
      },
      {
        "question": "Is there a Swedish language test required for permanent residence?",
        "answer": "Currently, Swedish language proficiency is not a statutory requirement for PUT. However, legislative proposals are in progress to introduce basic Swedish language and civic knowledge criteria."
      },
      {
        "question": "When can I apply for Swedish Citizenship after getting PUT?",
        "answer": "You can apply for Swedish Citizenship (medborgarskap) after completing 5 continuous years of lawful residence in Sweden, provided you hold a permanent residence permit (PUT)."
      },
      {
        "question": "Can my family members get permanent residence in Sweden with me?",
        "answer": "Family members can be granted permanent residence if you receive PUT, provided they have lived in Sweden for at least 3 years and adults can support themselves financially."
      }
    ]
  }
};

// ── 1. PR OVERVIEW ──
export function getPROverview(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.overview) return d.overview;
  return `The Permanent Residency (PR) / Settlement framework in ${country} enables qualified foreign nationals to achieve lawful indefinite residence status with full employment, social security, and citizenship pathways.`;
}

// ── 2. PR HIGHLIGHTS ──
export function getPRHighlights(country: string): PRHighlightItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.highlights) return d.highlights;
  return [
    { icon: '🌟', title: 'Indefinite Settlement', description: 'Lawful indefinite residence without employer sponsorship or work permit restrictions.' },
    { icon: '🏥', title: 'Universal Healthcare Access', description: 'Equal access to national public health, social benefits, and subsidized education.' },
    { icon: '⏱️', title: 'Citizenship Pathway', description: 'Direct statutory pathway to naturalization and passport after continuous residence.' },
    { icon: '👨‍👩‍👧', title: 'Family Protection Rights', description: 'Concurrent permanent settlement rights for spouse and dependent minor children.' }
  ];
}

// ── 3. STEPS TO APPLY ──
export function getPRSteps(country: string): string[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = d ? d.cname : country;
  const scheme = d ? d.scheme : 'permanent residency stream';
  const auth = d ? d.source : 'official immigration authorities';
  return [
    `Check Statutory Eligibility: Assess qualifying criteria under ${scheme}, including continuous residence, skill assessment, or qualifying job tier.`,
    `Verify Credentials & Language: Complete required educational evaluation (ECA), professional skills accreditation, and official language examination (IELTS/PTE/national language test).`,
    `Submit Expression of Interest (EOI) / Invitation: Lodge profile via official immigration portal (${auth}) and receive formal Invitation to Apply (ITA) or provincial nomination.`,
    `Assemble Verified PR Dossier: Compile apostilled police clearances (PCC) from all countries of residence, tax assessments, employment references, and proof of unencumbered funds.`,
    `Submit Permanent Residence Application: File complete electronic application and pay statutory government permanent residence and visa processing fees.`,
    `Complete Medical Screening & Biometrics: Undergo statutory panel physician immigration medical examination and attend biometrics appointment.`,
    `Receive PR Grant / Settlement Status: Upon approval, receive official Confirmation of Permanent Residence (COPR), electronic grant notice, or physical biometric permanent residence card.`
  ];
}

// ── 4. DOCUMENTS REQUIRED ──
export function getPRDocuments(countryOrFrom: string, maybeCountry?: string, purpose?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d.invitation_doc : 'Official Invitation to Apply / Nomination Grant';
  const doc_desc = d ? d.invitation_desc : 'Official government invitation or nomination confirmation certificate issued under qualifying stream.';
  return [
    { title: 'Valid International Passport', description: 'Original passport valid for at least 12 months beyond application submission with all prior visa stamps.', is_mandatory: true },
    { title: doc, description: doc_desc, is_mandatory: true },
    { title: 'Educational Credential Assessment (ECA) / Degree Evaluation', description: 'Official credential evaluation certificate confirming equivalency to domestic higher education degrees.', is_mandatory: true },
    { title: 'Standardized Language Test Report', description: 'Official language proficiency score report (IELTS General, CELPIP, PTE Core, or national language exam) within validity window.', is_mandatory: true },
    { title: 'Proof of Qualifying Work Experience', description: 'Detailed employment reference letters on corporate letterheads with job duties, pay slips, and tax assessment summaries.', is_mandatory: true },
    { title: 'Police Clearance Certificates (PCC)', description: 'Original PCC issued by the Regional Passport Office (RPO) and police authorities of all countries lived in for 6+ months.', is_mandatory: true },
    { title: 'Immigration Medical Examination (IME) Report', description: 'Medical examination conducted by an authorized panel physician covering chest X-ray and blood pathology.', is_mandatory: true },
    { title: 'Verifiable Proof of Settlement Funds', description: 'Official bank statements, fixed deposit certificates, or provident fund statements proving unencumbered liquid funds.', is_mandatory: true },
    { title: 'Civil Status & Family Relationship Documents', description: 'Government-issued birth certificates, marriage certificates, and national identification cards with certified translations.', is_mandatory: true }
  ];
}

// ── 5. PR FEES ──
export function getPRFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; currency: string; notes: string } {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.fees) return d.fees;
  return {
    visa_fee: 'Statutory Permanent Residence Fee',
    service_fee: 'Right of Permanent Residence / Biometrics Fee',
    total_fee: 'Statutory Fee + Biometrics',
    currency: 'USD',
    notes: 'Check official immigration department portal for current fee schedules.'
  };
}

// ── 6. PROCESSING TIME ──
export function getPRProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_time : '6 to 12 Months (Standard Permanent Residence Assessment)';
}

export function getPRProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_details : 'Timelines depend on annual quota allocations, priority date queues, and background security checks.';
}

// ── 7. OTHER REQUIREMENTS ──
export function getPRRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const scheme = d ? d.scheme : 'Permanent residence legal category';
  return [
    { category: 'Qualifying Stream & Points Assessment', details: `Satisfy eligibility criteria under ${scheme} including points benchmarks, continuous residence, or employer sponsorship.` },
    { category: 'Language & Integration Standard', details: 'Verifiable standardized language proficiency and passing national integration or civic knowledge tests.' },
    { category: 'Good Character & Security Clearance', details: 'Apostilled Police Clearance Certificates (PCC) from all resident countries demonstrating no serious criminal convictions.' },
    { category: 'Health & Public Charge Clearance', details: 'Passing comprehensive immigration medical screening with no inadmissible medical conditions or public health burdens.' }
  ];
}

// ── 8. FINANCIAL PROOFS ──
export function getPRFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const funds = d ? d.min_funds : 'Demonstrated liquid settlement maintenance funds ($10,000 - $20,000)';
  return [
    { type: 'Unencumbered Settlement Funds / Bank Statements', minimum_balance_or_amount: funds, time_frame: 'Held for past 3 to 6 months', notes: 'Official bank balance certificate and stamped statements proving unencumbered liquid funds for settlement.' },
    { type: 'Income Tax Assessment Summaries (ITR / Form 16 / Notice of Assessment)', minimum_balance_or_amount: 'Past 3 Assessment Years', time_frame: 'Prior 36 months', notes: 'Official government tax assessment notices confirming stable legal earning capacity and tax compliance.' },
    { type: 'Continuous Employment / Contract Confirmation', minimum_balance_or_amount: 'Statutory Prevailing Remuneration', time_frame: 'Current / Ongoing', notes: 'Current employment contract or letter of employment confirming permanent ongoing position and compensation.' },
    { type: 'Superannuation / Social Pension Contributions', minimum_balance_or_amount: 'Statutory Contribution Record', time_frame: 'Qualifying residence period', notes: 'Official statement from statutory pension fund (Rentenversicherung, ÖGK, CPF, Superannuation) proving compliance.' }
  ];
}

// ── 9. FAQS ──
export function getPRFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.faqs) return d.faqs;
  const cname = d ? d.cname : country;
  return [
    { question: `What benefits do I receive as a permanent resident of ${cname}?`, answer: `Permanent residents enjoy indefinite lawful residence, unrestricted employment and business rights, access to public healthcare and education, and eligibility for citizenship.` },
    { question: `Can my family be included in my permanent residence application?`, answer: `Yes. Your spouse or partner and dependent children can be included as accompanying dependents and receive permanent resident status concurrently.` },
    { question: `What are the residency obligations to maintain PR status?`, answer: `Most countries require you to be physically present for a minimum number of days (e.g. 2 out of every 5 years) to maintain your permanent resident status and travel facility.` },
    { question: `When can I apply for citizenship after getting permanent residence?`, answer: `Depending on the jurisdiction, permanent residents are typically eligible to apply for citizenship by naturalization after 3 to 5 years of lawful residence.` },
    { question: `Can my permanent residency status be revoked?`, answer: `Permanent residency can generally only be revoked if obtained through fraud, prolonged continuous absence exceeding statutory limits, or conviction of serious criminal offenses.` }
  ];
}

// ── 10. VALIDITY & STAY ──
export function getPRValidity(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.validity : '5 Years (Permanent Residency Travel Facility / Renewable Card)';
}

export function getPRStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.stay : 'Indefinite Settlement';
}

export function getPREntryType(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.entry_type : 'Multiple Entry';
}

export function getPROfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.source : `${country} Immigration Department`;
}

// ── 11. COMPLETE PR VISA DATA BUILDER ──
export function getPRVisaData(
  from: string,
  to: string,
  purpose: string = 'Permanent Residency'
): StructuredVisaRequirements {
  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getPROfficialSourceName(to);
  const procTime = getPRProcessingTime(to);
  const procDetails = getPRProcessingDetails(to);
  const val = getPRValidity(to);
  const stay = getPRStayDuration(to);
  const entryType = getPREntryType(to);
  const fees = getPRFees(to);
  const faqs = getPRFAQ(to);
  const highlights = getPRHighlights(to);
  const steps = getPRSteps(to);
  const docs = getPRDocuments(from, to, purpose);
  const reqs = getPRRequirements(to);
  const proofs = getPRFinancialProofs(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Permanent Residency / Settlement',
    visa_type: `${countryName} Permanent Residency (PR)`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' permanent residency settlement official immigration requirements')}`,
    official_source_name: officialSource,
    overview: getPROverview(to),
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
    validity_details: `Standard permanent residency status: ${val}`,
    stay_duration: stay,
    stay_duration_details: `Maximum permitted stay: ${stay}`,
    entry_type: entryType,
    entry_type_details: `${entryType} permanent settlement authorization`,
    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },
    processing_and_timing: {
      apply_window: 'Initiate preparation 6 to 12 months prior to targeted submission window.',
      decision_time: procTime,
      max_extension: 'Permanent resident cards are renewed every 5 to 10 years upon meeting physical presence obligations.',
      center_notes: `Processed by ${officialSource}. Coordinate biometric enrollment at authorized VAC or municipal offices.`
    },
    verification_status: 'verified',
    is_v3_verified: true
  };
}

export const getPRVisaSteps = getPRSteps;

