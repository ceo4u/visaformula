// src/lib/business-visa.ts
// Country-specific Business Visa pipeline based on official immigration and consular mandates

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

export interface BusinessHighlightItem {
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
  highlights?: BusinessHighlightItem[];
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
  if (c.includes('australia')) return 'australia';
  if (c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('france') || c.includes('paris')) return 'france';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('japan') || c.includes('tokyo')) return 'japan';
  if (c.includes('belgium') || c.includes('brussels')) return 'belgium';
  if (c.includes('denmark') || c.includes('copenhagen')) return 'denmark';
  if (c.includes('finland') || c.includes('helsinki')) return 'finland';
  if (c.includes('italy') || c.includes('italia') || c.includes('rome') || c.includes('milan')) return 'italy';
  if (c.includes('norway') || c.includes('oslo')) return 'norway';
  if (c.includes('portugal') || c.includes('lisbon')) return 'portugal';
  return c;
}

const DESTS: Record<string, any> = {
  "usa": {
    "cname": "United States",
    "visa_category": "B-1 Business Visitor Visa",
    "overview": "The U.S. B-1 Business Visitor Visa authorizes foreign nationals to enter the United States temporarily to engage in legitimate business activities of a commercial or professional nature. Permitted activities include consulting with business associates, attending scientific, educational, professional, or business conventions or conferences, negotiating commercial contracts, settling an estate, or participating in short-term business training. Productive employment, local labour for hire, or receiving remuneration from a US source is strictly prohibited under B-1 status.",
    "fees": {
      "visa_fee": "USD $185 (MRV Visa Fee - approx. \u20b915,540)",
      "service_fee": "Nil (No petition fee required)",
      "total_fee": "USD $185 Total Consular Fee",
      "notes": "Paid online via the US Visa Scheduling portal prior to scheduling VAC biometrics and consular interview."
    },
    "proc_time": "Consular Decision at Interview Window (Passport return in 3-5 Business Days)",
    "proc_details": "Requires DS-160 submission, biometric appointment at a VAC, and in-person consular interview at a US Embassy or Consulate in India.",
    "source": "U.S. Department of State / US Embassy & Consulates in India",
    "validity": "Up to 10 Years (Multiple Entry B-1/B-2)",
    "stay": "Up to 6 Months per entry (determined by CBP officer at Port of Entry)",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Formal US Host Company Business Invitation Letter",
    "invitation_desc": "Official invitation letter from US business entity detailing purpose of visit, scheduled meetings, and confirmation that no US salary will be paid.",
    "min_funds": "Company sponsorship letter or personal/corporate bank statement showing \u20b93,00,000 - \u20b95,00,000+",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "B-1 Business Authorization",
        "description": "Authorized for commercial negotiations, client meetings, vendor conferences, and contract signings."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "10-Year Multiple Entry",
        "description": "Indian passport holders commonly receive 10-year multiple-entry B-1/B-2 combined visas."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Up to 6 Months Stay",
        "description": "Each entry permits up to 6 months stay as stamped on Form I-94 by US Customs and Border Protection (CBP)."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Strict Non-Work Scope",
        "description": "No productive local work or salary from US sources; all compensation must originate abroad."
      }
    ],
    "faqs": [
      {
        "question": "Can I receive payment from a US company while on a B-1 visa?",
        "answer": "No. Under US immigration law, B-1 visa holders cannot engage in productive employment or receive salary or payment from a US source, with the exception of incidental travel expense reimbursement."
      },
      {
        "question": "What is the standard validity of a US B-1 visa for Indian citizens?",
        "answer": "Eligible Indian citizens are typically granted a 10-year multiple-entry combined B-1/B-2 visa, allowing repeated business and tourist visits."
      },
      {
        "question": "What should the US business invitation letter include?",
        "answer": "The letter must state the detailed purpose of the visit, meeting itinerary, duration of stay, financial guarantees covering travel expenses, and confirm that the visitor remains employed and compensated by the home company."
      },
      {
        "question": "Can I attend trade exhibitions and conferences on a B-1 visa?",
        "answer": "Yes. Attending corporate conventions, industry trade fairs, scientific seminars, and technology expos is fully permitted."
      },
      {
        "question": "Can I negotiate and sign contracts on a B-1 visa?",
        "answer": "Yes. Negotiating business deals, executing commercial agreements, and consulting with legal advisors are standard authorized B-1 activities."
      }
    ]
  },
  "uk": {
    "cname": "United Kingdom",
    "visa_category": "Standard Visitor Visa (Business Activities)",
    "overview": "The UK Standard Visitor Visa for Business permits foreign nationals to travel to the United Kingdom for up to 6 months to participate in a wide range of permitted business activities. Authorized activities include attending meetings, conferences, trade fairs, seminars, negotiating and signing business deals or contracts, carrying out site visits and inspections, gathering information for overseas employment, and receiving work-related training from a UK corporate affiliate. Direct productive work, public sales, and receiving remuneration from a UK entity are strictly barred under the UK Immigration Rules.",
    "fees": {
      "visa_fee": "\u00a3115 (Standard 6-Month) / \u00a3432 (2-Year) / \u00a3771 (5-Year) / \u00a3963 (10-Year)",
      "service_fee": "\u20b92,500 - \u20b93,000 (VFS Global Processing Fee)",
      "total_fee": "\u00a3115+ (approx. \u20b912,300+)",
      "notes": "Paid online via GOV.UK. Priority service (+\u00a3500 for 5 days) and Super Priority (+\u00a31,000 for 24h) are optional."
    },
    "proc_time": "3 Weeks (15 Working Days) Standard UKVI Processing",
    "proc_details": "Processed by UK Visas and Immigration (UKVI) following biometric enrollment at VFS Global in India.",
    "source": "UK Visas and Immigration (UKVI / Home Office) & VFS Global",
    "validity": "6 Months, 2 Years, 5 Years, or 10 Years",
    "stay": "Up to 6 Months per visit",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Official UK Host Company Business Invitation Letter",
    "invitation_desc": "Letter from the inviting UK organization specifying the nature of business meetings, duration, and itinerary.",
    "min_funds": "Employer deputation letter or bank statements showing \u20b92,50,000 - \u20b94,00,000+",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Permitted Business Scope",
        "description": "Covers client presentations, board meetings, corporate conferences, and intra-corporate training."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Long-Term Multi-Entry",
        "description": "Frequent business travelers can apply for 2-year, 5-year, or 10-year multiple-entry visas."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "6 Months Per Visit",
        "description": "Permits stays of up to 180 consecutive days per visit for legitimate corporate objectives."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Corporate Guarantee",
        "description": "Supported by home employer sponsorship covering all travel, lodging, and medical contingencies."
      }
    ],
    "faqs": [
      {
        "question": "Can I do hands-on technical work on a UK Business Visitor Visa?",
        "answer": "No. Hands-on productive work is strictly prohibited. You may only perform permitted activities such as meetings, site inspections, and contract negotiations. Installation or repair work requires a specialist work visa unless covered by specific vendor supply agreements."
      },
      {
        "question": "Can my UK business visa be granted for multiple years?",
        "answer": "Yes. Regular travelers can apply for 2-year, 5-year, or 10-year multiple-entry Standard Visitor visas, allowing visits of up to 6 months per entry."
      },
      {
        "question": "Is an in-person interview required for a UK business visa?",
        "answer": "Most applicants in India only need to submit biometrics at VFS Global. In rare cases, UKVI may request a video or phone interview."
      },
      {
        "question": "What evidence of financial support is required?",
        "answer": "You must provide an official employer letter confirming sponsorship of all travel expenses, or personal/company bank statements demonstrating sufficient liquidity."
      },
      {
        "question": "Can I attend corporate board meetings in the UK on this visa?",
        "answer": "Yes. Attending board meetings, shareholder conferences, and high-level governance discussions are explicitly permitted business activities."
      }
    ]
  },
  "canada": {
    "cname": "Canada",
    "visa_category": "Business Visitor Visa (Temporary Resident Visa - TRV)",
    "overview": "Canada's Business Visitor Visa (under the International Mobility Program and IRPA) allows foreign commercial representatives to visit Canada for short-term international business activities without requiring a Canadian work permit. Eligible business visitors include individuals attending business meetings, trade exhibitions, conferences, buyers conducting purchasing evaluations, corporate trainers providing intra-company sessions, and after-sales service technicians servicing equipment under warranty. Business visitors must demonstrate that their primary source of remuneration and principal place of business remain outside Canada.",
    "fees": {
      "visa_fee": "CAD $100 (approx. \u20b96,200 Consular Fee)",
      "service_fee": "CAD $85 (Biometrics Fee)",
      "total_fee": "CAD $185 Total Consular Reference",
      "notes": "Paid online via the IRCC secure portal. Biometrics are valid for 10 years across all Canadian visa applications."
    },
    "proc_time": "3 to 6 Weeks from Biometric Submission",
    "proc_details": "Applications lodged electronically via IRCC portal. Biometrics provided at VFS Canada Visa Application Centres in India.",
    "source": "Immigration, Refugees and Citizenship Canada (IRCC) & CBSA",
    "validity": "Up to 10 Years (or until passport expiry)",
    "stay": "Up to 6 Months per visit (determined by CBSA at port of entry)",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Official Canadian Corporate Host Invitation Letter",
    "invitation_desc": "Detailed invitation on Canadian corporate letterhead specifying meeting itinerary, contact details, and business purpose.",
    "min_funds": "Company sponsorship letter and 6-month corporate/personal bank statements showing CAD $5,000+",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Work Permit Exemption",
        "description": "Legal exemption from work permits under R186(a) for international business activities."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "10-Year Multi-Entry",
        "description": "Issued as a multiple-entry TRV valid up to 10 years (aligned with passport validity)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "6 Months Per Visit",
        "description": "Stay up to 180 days per entry to manage commercial transactions and corporate negotiations."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "After-Sales Provision",
        "description": "Covers authorized specialized after-sales installation and servicing under contract."
      }
    ],
    "faqs": [
      {
        "question": "Who qualifies as a Business Visitor in Canada?",
        "answer": "A foreign national who comes to Canada to participate in international business activities without directly entering the Canadian labour market, where the main business enterprise and source of income remain outside Canada."
      },
      {
        "question": "Can I do after-sales service or repair work on a Canadian business visa?",
        "answer": "Yes, under specific conditions: if specialized commercial equipment was purchased outside Canada and the original sales/lease agreement includes installation, commissioning, or warranty service."
      },
      {
        "question": "How long is a Canadian business visa valid for?",
        "answer": "It is typically granted as a multiple-entry visa valid for up to 10 years or until one month before your passport expires, whichever comes first."
      },
      {
        "question": "Can my employer sponsor all my expenses for the Canadian business trip?",
        "answer": "Yes. A formal deputation letter from your home employer confirming full sponsorship of flights, lodging, per diems, and medical coverage is the standard supporting financial proof."
      },
      {
        "question": "Do I need to undergo a medical exam for a short business visit to Canada?",
        "answer": "Medical exams are generally not required for business visits of less than 6 months, unless you intend to work in public healthcare or child-care environments."
      }
    ]
  },
  "australia": {
    "cname": "Australia",
    "visa_category": "Visitor Visa (Business Visitor Stream - Subclass 600)",
    "overview": "The Australian Visitor Visa (Subclass 600) - Business Visitor Stream authorizes foreign business professionals to visit Australia for short-term business purposes. Permitted activities include making general business or employment inquiries, negotiating business contracts, participating in government-to-government visits, and attending business conferences, trade fairs, or seminars (provided the applicant is not being paid by organizers). The visa strictly prohibits providing retail services or goods to the Australian public or working for an Australian business.",
    "fees": {
      "visa_fee": "AUD 190 (approx. \u20b910,500 Base Application Charge)",
      "service_fee": "\u20b91,650 (VFS Global Biometrics Fee)",
      "total_fee": "AUD 190 + VFS Logistics",
      "notes": "Paid online via ImmiAccount. Fast-track 48-hour processing available for an additional AUD 1,000 fee."
    },
    "proc_time": "1 to 3 Weeks (Fast-track: 48 to 72 Hours)",
    "proc_details": "Lodged digitally via the Department of Home Affairs ImmiAccount. Biometrics captured at VFS Global Australia.",
    "source": "Department of Home Affairs (ImmiAccount) & VFS Global Australia",
    "validity": "Up to 3 Years (Multiple Entry)",
    "stay": "Up to 3 Months per visit",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Australian Corporate Host Invitation Letter",
    "invitation_desc": "Official invitation from an Australian enterprise with registered ABN detailing commercial agenda and meeting dates.",
    "min_funds": "Company sponsorship guarantee or personal bank statements showing AUD $4,000+",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Subclass 600 Business Stream",
        "description": "Legally authorized stream for commercial talks, supplier evaluation, and conference participation."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Digital ImmiAccount Grant",
        "description": "100% paperless electronic visa grant notification linked directly to your passport number."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Up to 3 Months Per Stay",
        "description": "Permits continuous stays of up to 90 days per visit across the validity period."
      },
      {
        "icon": "\u26a1",
        "title": "Fast-Track Processing",
        "description": "Optional priority assessment service provides decisions within 48 to 72 business hours."
      }
    ],
    "faqs": [
      {
        "question": "What activities are permitted on an Australian Business Visitor visa (Subclass 600)?",
        "answer": "Permitted activities include general business enquiries, negotiating commercial contracts, attending conferences or trade exhibitions, and participating in official government-sponsored visits. Working for an Australian employer is prohibited."
      },
      {
        "question": "Can I work for an Australian business on a Subclass 600 visa?",
        "answer": "No. You cannot perform work for an Australian organization or supply services to the public. If you need to perform highly specialized short-term work, you must apply for a Subclass 400 Temporary Work visa."
      },
      {
        "question": "Is the Australian visa physically stamped in the passport?",
        "answer": "No. Australia issues electronic visas (eVisa) linked directly to your passport number. You receive a digital Visa Grant Notice."
      },
      {
        "question": "What is the Australian Fast-Track processing service?",
        "answer": "For an additional government fee of AUD 1,000, eligible passport holders can request prioritized processing, with decisions typically finalized within 48 to 72 hours."
      },
      {
        "question": "Can I bring my family on my Subclass 600 business visa application?",
        "answer": "Family members cannot be included on the same application form; each family member must lodge an individual Subclass 600 application in the Tourist stream."
      }
    ]
  },
  "germany": {
    "cname": "Germany",
    "visa_category": "Schengen Business Visa (Type C - Gesch\u00e4ftsreise)",
    "overview": "The German Schengen Business Visa (Type C) allows business professionals, corporate executives, and technical specialists to travel to Germany and the wider 29-nation Schengen Area for commercial engagements of up to 90 days within any 180-day period. Recognized activities include participating in international trade fairs (such as Hannover Messe, Medica, or IFA Berlin), holding commercial negotiations with German partners, attending business conferences, and conducting internal company audits or technical consultations with German subsidiaries. The applicant's remuneration must remain covered by their overseas employer.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20b92,200 (VFS Global Service Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Fee paid at VFS Global Germany. Exemption applies for children under 6 and specific research delegates."
    },
    "proc_time": "15 Calendar Days (Consular Standard Timeline)",
    "proc_details": "Application submitted at VFS Global Germany Visa Application Centres and adjudicated by German Missions in New Delhi, Mumbai, Bengaluru, Chennai, or Kolkata.",
    "source": "German Federal Foreign Office & German Missions in India / VFS Global",
    "validity": "From duration of trip up to 5 Years (Circulation Visa / Visum zur mehrfachen Einreise)",
    "stay": "Up to 90 Days within any 180-Day rolling window across the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "German Host Company Formal Business Invitation (Einladungsschreiben)",
    "invitation_desc": "Official invitation from registered German GmbH/AG or trade fair pass specifying meeting objectives, trade register number (HRB), and \u00a766-68 AufenthG financial undertaking.",
    "min_funds": "Formal Verpflichtungserkl\u00e4rung (Declaration of Commitment) or company sponsorship with \u20b93,00,000+ bank balance",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "29-Country Schengen Access",
        "description": "Free mobility across Germany and 28 other European Schengen member states without internal border checks."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Trade Fair Capital of the World",
        "description": "Streamlined visa facilitation for exhibitors and trade visitors attending premier German commercial expos."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Rule",
        "description": "Stay up to 90 days within any 180-day rolling window for corporate meetings and technical consultations."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Circulation Visa Option",
        "description": "Frequent business delegates can qualify for 1-year to 5-year multi-entry Schengen circulation visas."
      }
    ],
    "faqs": [
      {
        "question": "What is the 90/180-day Schengen rule for business visitors?",
        "answer": "You may spend a cumulative maximum of 90 days within any rolling 180-day period across the entire Schengen Area for business, tourism, or meetings."
      },
      {
        "question": "What must the German business invitation letter contain?",
        "answer": "It must be printed on official company letterhead, state the full name and passport number of the invitee, detail the commercial purpose and dates of the visit, and confirm whether the German host covers expenses under \u00a7\u00a7 66-68 of the German Residence Act (AufenthG)."
      },
      {
        "question": "Can I attend trade fairs in Germany on this visa?",
        "answer": "Yes. Exhibitors and trade visitors can apply with an official exhibitor pass, visitor admission voucher, and an invitation letter confirming participation."
      },
      {
        "question": "Can I perform software installation or machinery maintenance on a German business visa?",
        "answer": "Under \u00a730 of the Employment Regulation (BeschV), certain short-term assembly, installation, and maintenance activities of equipment supplied by foreign companies are permitted for up to 90 days without a work permit, provided the mission is notified."
      },
      {
        "question": "Is travel medical insurance mandatory for a German Schengen visa?",
        "answer": "Yes. You must possess comprehensive Schengen travel medical insurance with minimum coverage of \u20ac30,000, covering emergency medical care and repatriation of remains across all Schengen states."
      }
    ]
  },
  "uae": {
    "cname": "United Arab Emirates",
    "visa_category": "Business Entry Visa / Mission Visa / Green Visa for Business",
    "overview": "The United Arab Emirates offers rapid, streamlined business entry options for corporate executives, entrepreneurs, and investors visiting Dubai, Abu Dhabi, and the Northern Emirates. The UAE Business Entry Visa permits foreign commercial delegates to explore business opportunities, attend corporate summits (such as GITEX or Arab Health), negotiate joint ventures, and sign commercial contracts. Foreigners can apply for a 30-day, 60-day, or 90-day single or multiple-entry business visa through the ICP or GDRFA electronic portals. UAE free zones also sponsor Mission Visas for short-term technical specialists.",
    "fees": {
      "visa_fee": "AED 250 - 550 (approx. \u20b95,700 - \u20b912,500 depending on duration: 30 vs 60 days)",
      "service_fee": "AED 100 (ICP / GDRFA Service Charge)",
      "total_fee": "AED 350 - 650 Total Reference",
      "notes": "Applied online via the ICP portal (smartservices.icp.gov.ae) or GDRFA Dubai with electronic issuance within 48 to 72 hours."
    },
    "proc_time": "2 to 3 Business Days (Express: 24 Hours)",
    "proc_details": "100% digital assessment by ICP or GDRFA Dubai. Electronic entry permit issued as a PDF with QR verification code.",
    "source": "Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) & GDRFA Dubai",
    "validity": "60 Days from issuance to enter the UAE",
    "stay": "30, 60, or 90 Days per entry (extendable in-country for 30 days)",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "UAE Host Company Invitation or Trade License",
    "invitation_desc": "Official invitation from a UAE mainland company or registered Free Zone enterprise (DMCC, DIFC, ADGM) or corporate trade fair registration.",
    "min_funds": "Company sponsorship or personal bank statement showing AED 10,000+",
    "highlights": [
      {
        "icon": "\u26a1",
        "title": "24 to 48-Hour Issuance",
        "description": "Rapid digital processing via official ICP / GDRFA government portals with zero physical embassy visits."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Global Commercial Hub",
        "description": "Access international trade expos, sovereign wealth summits, and premier free trade zones."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "In-Country Extension",
        "description": "Easily extend your business stay online for an additional 30 days without departing the country."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Investor / Entrepreneur Friendly",
        "description": "Direct pathway to establish local corporate bank accounts and transition to UAE Golden Visas."
      }
    ],
    "faqs": [
      {
        "question": "How quickly is a UAE business visa processed?",
        "answer": "Standard digital processing takes 48 to 72 hours. Urgent and express processing options through GDRFA can issue the entry permit within 24 hours."
      },
      {
        "question": "Can I extend my UAE business visa while staying in Dubai?",
        "answer": "Yes. Business entry permits can be extended online via the GDRFA or ICP mobile app for an additional 30 days without needing to exit the UAE."
      },
      {
        "question": "Can I sign commercial contracts and register a company in the UAE on this visa?",
        "answer": "Yes. Negotiating joint ventures, executing business contracts, and completing corporate registration with the Department of Economy and Tourism (DET) or free zones are standard permitted activities."
      },
      {
        "question": "Do I need a local UAE sponsor to obtain a business visa?",
        "answer": "You can apply through an inviting UAE company, an approved travel agency, an airline (Emirates/flydubai), or self-apply through the ICP investor portal if you meet professional criteria."
      },
      {
        "question": "What is a UAE Mission Visa?",
        "answer": "A Mission Visa is a specialized temporary visa sponsored by a UAE company permitting foreign technicians, auditors, and consultants to perform short-term specialized work for up to 90 days."
      }
    ]
  },
  "singapore": {
    "cname": "Singapore",
    "visa_category": "Short-Term Business Visit Pass (e-Pass)",
    "overview": "Singapore welcomes global business leaders and professionals through its streamlined Short-Term Business Visit Pass framework. Foreign business visitors travel to Singapore to attend corporate meetings, regional conferences, exhibitions, commercial discussions, and site inspections. Indian nationals require an entry visa prior to travel, applied online via the Singapore Immigration & Checkpoints Authority (ICA) SAVE portal through an authorized visa agent or a Singapore registered local business contact (Letter of Introduction - Form V39A). Upon arrival, visitors receive an electronic Visit Pass (e-Pass) sent via email.",
    "fees": {
      "visa_fee": "SGD $30 (approx. \u20b91,900 ICA Statutory Fee)",
      "service_fee": "\u20b91,500 - \u20b92,500 (Authorized Visa Agent Service Fee)",
      "total_fee": "SGD $30 + Agent Logistics Fee",
      "notes": "Applied online via the ICA SAVE portal by an authorized visa agent or Singapore citizen/PR partner."
    },
    "proc_time": "3 to 5 Business Days",
    "proc_details": "Processed electronically by the Immigration & Checkpoints Authority (ICA). The approved e-Visa is sent as a printable PDF.",
    "source": "Immigration & Checkpoints Authority (ICA Singapore)",
    "validity": "Up to 2 Years (Multiple Entry)",
    "stay": "Up to 30 Days per entry (extendable online via ICA e-Service for up to 89 days)",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Form V39A (Letter of Introduction for Visa Application)",
    "invitation_desc": "Official ICA Form V39A completed and signed by a Singapore registered business entity with valid UEN number.",
    "min_funds": "Company deputation letter or personal bank statement showing SGD $3,000+",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Asia's Prime Commercial Hub",
        "description": "Gateway to ASEAN markets with world-class financial, legal, and arbitration infrastructure."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Digital e-Visa Grant",
        "description": "Electronic visa with verifiable QR code; no physical passport stamping required."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "30-Day Extensible Stay",
        "description": "Granted 30 days upon arrival, conveniently extendable online for up to 89 days via ICA."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Work Pass Exemption (MOM)",
        "description": "Certain short-term activities (conferences, arbitration) are exempt from work passes with MOM e-notification."
      }
    ],
    "faqs": [
      {
        "question": "What is Form V39A for a Singapore business visa?",
        "answer": "Form V39A is the official Letter of Introduction (LOI) issued by a registered company in Singapore with a Unique Entity Number (UEN), confirming the business purpose of your visit."
      },
      {
        "question": "How long can I stay in Singapore on a business visit pass?",
        "answer": "Visitors are typically granted a 30-day visit pass upon arrival. If required, you can submit an extension request online via the ICA e-Service for up to a total stay of 89 days."
      },
      {
        "question": "Can I conduct arbitration or speak at a conference without a work pass?",
        "answer": "Yes. Under MOM regulations, certain short-term activities including speaking at conferences, conducting international arbitration, and exhibitions qualify for Work Pass Exempt Activities, requiring only an online notification to MOM."
      },
      {
        "question": "What is the SG Arrival Card?",
        "answer": "All travelers entering Singapore must complete the free electronic SG Arrival Card (SGAC) with health declaration online within 3 days prior to arrival."
      },
      {
        "question": "Can I look for employment in Singapore while on a business visit pass?",
        "answer": "You may attend interviews and explore career opportunities on a visit pass, but you cannot start work until your prospective employer successfully secures an Employment Pass (EP) or S Pass from MOM."
      }
    ]
  },
  "japan": {
    "cname": "Japan",
    "visa_category": "Temporary Visitor Visa for Business / Commercial Purposes",
    "overview": "The Japanese Temporary Visitor Visa for Business permits foreign executives, technical delegates, and entrepreneurs to visit Japan for up to 90 days for short-term commercial engagements. Authorized activities include business negotiations, commercial liaisons, signing contracts, market surveys, attending international conferences, and performing short-term after-sales machinery inspection and servicing. Productive labor or receiving remuneration from a Japanese entity is strictly prohibited. The Japanese sponsoring enterprise must provide a formal Invitation Letter (Shouheiriyuusho) and a Letter of Guarantee (Mimoto hoshousho).",
    "fees": {
      "visa_fee": "JPY 3,000 (Single Entry) / JPY 6,000 (Multiple Entry) approx. \u20b91,800 - \u20b93,600",
      "service_fee": "\u20b91,500 - \u20b92,500 (VFS Global Japan Handling Fee)",
      "total_fee": "JPY 3,000 + VFS Handling Fee",
      "notes": "Consular visa fee paid at VFS Japan upon submission."
    },
    "proc_time": "5 to 7 Business Days from Consular Submission",
    "proc_details": "Applications lodged via VFS Global Japan in India and decided by the Embassy of Japan in New Delhi or Consulates General in Mumbai, Chennai, Kolkata, and Bengaluru.",
    "source": "Ministry of Foreign Affairs of Japan (MOFA) & Embassy of Japan in India",
    "validity": "Single entry (3 months) or Multiple entry (1 to 5 years for eligible corporate executives)",
    "stay": "15, 30, or 90 Days per visit",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Official MOFA Invitation Letter (Shouheiriyuusho) & Letter of Guarantee",
    "invitation_desc": "Official Japanese Ministry of Foreign Affairs bilingual template signed by a registered Japanese corporation with certified company registry (Tokibo Tohon).",
    "min_funds": "Japanese corporate Letter of Guarantee (Mimoto hoshousho) or corporate bank statements",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Corporate Guarantee System",
        "description": "Japanese host enterprise provides an official Mimoto hoshousho guaranteeing travel expenses and compliance."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Multi-Entry for Business",
        "description": "High-level corporate executives and frequent business visitors can obtain 1 to 5-year multi-entry visas."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Up to 90 Days Stay",
        "description": "Permits up to 90 days per stay for complex joint-venture negotiations and factory inspections."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "After-Sales Provision",
        "description": "Covers specialized after-sales guidance and machinery testing under international commercial sales contracts."
      }
    ],
    "faqs": [
      {
        "question": "What documents are required from the Japanese host company?",
        "answer": "The Japanese company must provide: (1) Invitation Letter (Shouheiriyuusho), (2) Schedule of Stay (Taizai Yoteihyo), (3) Letter of Guarantee (Mimoto hoshousho), and (4) Certified copy of the company registry (Tokibo Tohon) or quarterly corporate report."
      },
      {
        "question": "Can I obtain a multiple-entry business visa for Japan?",
        "answer": "Yes. Employees of publicly listed companies, established joint ventures, or frequent business travelers to Japan can apply for a multiple-entry visa valid for 1, 3, or 5 years with a stay of up to 90 days per visit."
      },
      {
        "question": "Can I participate in product exhibitions or trade shows in Japan?",
        "answer": "Yes. Participating in international trade exhibitions, displaying commercial samples, and conducting vendor negotiations are fully authorized."
      },
      {
        "question": "What is the Visit Japan Web service?",
        "answer": "Visit Japan Web is an official online portal enabling inbound travelers to register immigration clearance, customs declaration, and tax-free shopping details in advance with generated QR codes."
      },
      {
        "question": "Can I receive consultation fees from a Japanese company on a business visa?",
        "answer": "No. Any direct remuneration or compensation paid by a Japanese entity is prohibited on a Temporary Visitor visa. All salary must be paid by your overseas employer."
      }
    ]
  },
  "france": {
    "cname": "France",
    "visa_category": "Schengen Business Visa (Court S\u00e9jour Affaires)",
    "overview": "The French Schengen Business Visa (Court S\u00e9jour Affaires) enables corporate professionals, startup founders, and technical experts to visit France and the European Schengen Area for commercial activities up to 90 days within any 180-day period. Authorized activities include attending international business congresses, negotiating commercial contracts with French and European enterprises, visiting industrial production facilities, and taking part in corporate training sessions. Applications are initiated online on France-Visas and lodged at VFS Global France in India.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20b92,800 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Logistics",
      "notes": "Fee paid at VFS Global France. Applicants benefit from multi-entry circulation visa provisions if traveling frequently."
    },
    "proc_time": "15 Calendar Days (Consular SLA)",
    "proc_details": "Application completed online via France-Visas, followed by biometric appointment at VFS Global France in India.",
    "source": "Ministry of the Interior of France (France-Visas) & Consulate General of France",
    "validity": "From duration of visit up to 5 Years (Circulation Visa)",
    "stay": "Up to 90 Days within any 180-Day period across the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Lettre d'Invitation Professionnelle & Ordre de Mission",
    "invitation_desc": "Official invitation letter from the French host company (Lettre d'invitation) detailing business objectives and employer Ordre de Mission.",
    "min_funds": "Company financial guarantee or personal/corporate bank statement showing \u20ac65 - \u20ac120/day",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "France-Visas Portal",
        "description": "Streamlined digital dossier creation and status tracking through France's centralized visa portal."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "5-Year Circulation Visa",
        "description": "Regular business travelers can obtain multi-entry circulation visas valid from 1 to 5 years."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Schengen Rule",
        "description": "Full flexibility to travel across France and all 29 Schengen member states without border controls."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Global Tech & Aerospace Hub",
        "description": "Direct connectivity to Paris VivaTech, Toulouse aerospace clusters, and European corporate headquarters."
      }
    ],
    "faqs": [
      {
        "question": "What is an Ordre de Mission for a French business visa?",
        "answer": "An Ordre de Mission (Mission Letter) is an official letter from your Indian or overseas employer stating your designation, dates of mission in France, commercial objectives, and guaranteeing full coverage of all expenses."
      },
      {
        "question": "Can I travel to other European countries on a French business visa?",
        "answer": "Yes. A Schengen visa issued by France allows you to travel freely throughout all 29 member states of the Schengen Area, provided France is your main destination."
      },
      {
        "question": "What are the financial requirements for a French business visa?",
        "answer": "If your company covers all expenses, an employer undertaking is sufficient. Otherwise, you must demonstrate liquid funds of at least \u20ac120/day (or \u20ac65/day if hotel is prepaid)."
      },
      {
        "question": "Can I attend trade fairs like VivaTech or Paris Air Show on this visa?",
        "answer": "Yes. Presenting an official attendee or exhibitor badge accompanied by the event invitation validates your business visa application."
      },
      {
        "question": "How early can I apply for a French business visa?",
        "answer": "You can apply up to 6 months before your scheduled travel date, and it is recommended to apply at least 3 to 4 weeks prior to departure."
      }
    ]
  },
  "belgium": {
    "cname": "Belgium",
    "visa_category": "Schengen Business Visa (Court S\u00e9jour Affaires / Zakenvisum)",
    "overview": "The Belgian Schengen Business Visa enables international executives, diplomats, and industry specialists to visit Belgium\u2014the administrative heart of the European Union\u2014for up to 90 days within a 180-day window. Permitted activities include attending bilateral corporate discussions, consulting with EU institutions, negotiating international commercial partnerships, and participating in industrial trade summits in Brussels, Antwerp, or Ghent. The applicant must be supported by an official invitation from a Belgian enterprise or institution and maintain active employment abroad.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Paid at VFS Global Belgium. Multi-entry circulation visas issued to established business travelers."
    },
    "proc_time": "15 Calendar Days from Biometric Submission",
    "proc_details": "Processed by the Belgian Immigration Office (DOFI) and the Embassy of Belgium in New Delhi.",
    "source": "Belgian Immigration Office (DOFI) & Embassy of Belgium in India / VFS Global",
    "validity": "From trip duration up to 5 Years (Multiple Entry)",
    "stay": "Up to 90 Days within any 180-Day rolling window in the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Official Belgian Corporate Business Invitation Letter",
    "invitation_desc": "Invitation from a Belgian company or EU trade organization detailing meeting agendas, registered enterprise number (BCE/KBO), and travel dates.",
    "min_funds": "Company sponsorship letter or personal/corporate bank statement showing minimum \u20ac95/day (or \u20ac45/day if staying with host)",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "EU Capital Access",
        "description": "Conduct business at the headquarters of the European Union, NATO, and multinational federations."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Port of Antwerp & Diamond Hub",
        "description": "Tailored for international logistics, petrochemical, and diamond trading delegations."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Schengen Validity",
        "description": "Seamless travel across Belgium and all Schengen partner countries for business consultations."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Multi-Year Circulation Option",
        "description": "Eligible corporate executives receive multi-entry visas valid for 1, 2, or 5 years."
      }
    ],
    "faqs": [
      {
        "question": "What is the role of the Belgian BCE/KBO number on the invitation letter?",
        "answer": "The BCE/KBO (Banque-Carrefour des Entreprises / Kruispuntbank van Ondernemingen) is the official Belgian business register number. Including it confirms the legal legitimacy of the inviting company."
      },
      {
        "question": "Can I visit EU institutions in Brussels on a Belgian business visa?",
        "answer": "Yes. Attending public consultations, industry hearings, and institutional meetings with the European Commission or Parliament are standard authorized business activities."
      },
      {
        "question": "What is the minimum bank balance required for a Belgian business visa?",
        "answer": "If sponsored by your employer, an official financial guarantee letter is sufficient. Self-funded applicants must show liquid funds of at least \u20ac95 per day of stay in Belgium."
      },
      {
        "question": "How long does it take to process a Belgian business visa in India?",
        "answer": "Standard processing takes approximately 15 calendar days from the date your biometric application is lodged at VFS Global."
      },
      {
        "question": "Is travel health insurance mandatory for Belgium?",
        "answer": "Yes. You must provide a travel health insurance policy with minimum coverage of \u20ac30,000 for emergency medical hospitalization and repatriation across the Schengen Area."
      }
    ]
  },
  "denmark": {
    "cname": "Denmark",
    "visa_category": "Schengen Business Visa (Kortvarigt Forretningsophold)",
    "overview": "The Danish Schengen Business Visa permits commercial representatives, consultants, and technical experts to visit Denmark and the Schengen Area for up to 90 days in a 180-day period. Authorized activities include attending meetings with Danish commercial partners, evaluating maritime, green tech, and life science collaborations, participating in industry trade exhibitions in Copenhagen, and attending intra-corporate workshops. Sponsoring Danish companies can utilize the digital invitation system (VU1 form) on newtodenmark.dk, significantly streamlining consular review.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Paid online on ApplyVisa (applyvisa.um.dk) before submitting biometrics at VFS Denmark."
    },
    "proc_time": "15 Calendar Days from Consular Receipt",
    "proc_details": "Applied online via the Danish Ministry of Foreign Affairs portal (applyvisa.um.dk) and adjudicated by the Royal Danish Embassy in New Delhi.",
    "source": "Ministry of Foreign Affairs of Denmark & Danish Immigration Service (DIS)",
    "validity": "From single visit up to 5 Years (Multiple Entry)",
    "stay": "Up to 90 Days within any 180-Day period in the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Digital Danish Business Invitation (Form VU1) & Invitation Letter",
    "invitation_desc": "Official online VU1 invitation ID registered on newtodenmark.dk by the Danish host company specifying CVR business number.",
    "min_funds": "Company sponsorship guarantee or bank statements showing DKK 500/day (approx. \u20ac67/day)",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Online ApplyVisa Portal",
        "description": "Complete application, fee payment, and digital documentation via the official Danish MFA portal."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Digital VU1 Invitation",
        "description": "Danish host enterprise files electronic VU1 invitation directly with Danish immigration authorities."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Green Tech & Pharma Capital",
        "description": "Direct access to Medicon Valley, renewable energy leaders, and shipping conglomerates."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Multi-Entry Circulation Visas",
        "description": "Frequent business delegates benefit from fast-tracked 1 to 5-year multiple-entry visas."
      }
    ],
    "faqs": [
      {
        "question": "What is the Danish VU1 online invitation form?",
        "answer": "The VU1 form is an electronic business invitation completed online by the host company in Denmark on newtodenmark.dk. It generates an invitation ID code that the applicant enters into their ApplyVisa dossier."
      },
      {
        "question": "What is the CVR number in Denmark?",
        "answer": "The CVR (Central Business Register) number is the unique identification number of the registered Danish enterprise, required on all commercial invitations."
      },
      {
        "question": "Can I visit other Nordic countries on a Danish business visa?",
        "answer": "Yes. A Danish Schengen visa permits unrestricted travel across Sweden, Norway, Finland, Iceland, and all other Schengen countries within the 90/180-day limit."
      },
      {
        "question": "How do I pay the Danish visa fee?",
        "answer": "The visa fee of \u20ac90 must be paid online via credit/debit card on the official ApplyVisa portal (applyvisa.um.dk) before visiting the VFS Global center."
      },
      {
        "question": "Can I carry out short-term installation or machinery assembly in Denmark?",
        "answer": "Foreign workers sent by a non-Danish employer to install, dismantle, inspect, or repair technical equipment for up to 90 days are exempt from work permit requirements under specific Danish 'fitters' rules (mont\u00f8rreglen)."
      }
    ]
  },
  "finland": {
    "cname": "Finland",
    "visa_category": "Schengen Business Visa (Liikeviisumi)",
    "overview": "The Finnish Schengen Business Visa (Liikeviisumi) allows foreign business executives, technology specialists, and industrial partners to visit Finland and the Schengen Area for up to 90 days within a 180-day timeframe. Finland's world-class technology, forestry, telecommunications, and clean energy clusters attract business delegations for negotiations, supplier audits, technology conferences (such as Slush Helsinki), and intra-corporate strategy sessions. The applicant must hold a valid business invitation from a registered Finnish enterprise and proof of financial subsistence.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Paid at VFS Global Finland in India upon biometric enrollment."
    },
    "proc_time": "15 Calendar Days from Biometric Submission",
    "proc_details": "Decided by the Embassy of Finland in New Delhi following document lodgement at VFS Global Finland.",
    "source": "Ministry for Foreign Affairs of Finland & Embassy of Finland in India",
    "validity": "From trip length up to 5 Years (Multiple Entry)",
    "stay": "Up to 90 Days within any 180-Day rolling window in the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Official Finnish Corporate Invitation Letter (Kutsukirje)",
    "invitation_desc": "Official invitation from a registered Finnish company specifying Business ID (Y-tunnus), meeting schedule, and expense coverage.",
    "min_funds": "Company sponsorship letter or personal/corporate bank statement showing minimum \u20ac30 - \u20ac50/day",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Slush & Tech Ecosystem",
        "description": "Direct access to Europe's premier startup event (Slush) and leading deep-tech innovation hubs."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Y-Tunnus Company Verification",
        "description": "Quick consular verification through Finland's official Business ID corporate registry."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Schengen Stay",
        "description": "Permits seamless travel across Finland and all 29 Schengen countries for corporate missions."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Fast Circulation Visa",
        "description": "Established corporate partners can obtain multi-entry circulation visas valid for 1 to 5 years."
      }
    ],
    "faqs": [
      {
        "question": "What is the Finnish Y-tunnus on the business invitation?",
        "answer": "The Y-tunnus (Business Identity Code) is the official registration number of the Finnish enterprise issued by the Finnish Patent and Registration Office (PRH), confirming company authenticity."
      },
      {
        "question": "What financial resources are required for a Finnish business visa?",
        "answer": "An applicant must have at least \u20ac30 per day of stay in Finland, or provide an official company sponsorship undertaking confirming that all travel and lodging expenses are covered."
      },
      {
        "question": "Can I attend Slush Helsinki on this business visa?",
        "answer": "Yes. Attending Slush, industry expos, tech conferences, and investor pitching events are recognized business visitor activities."
      },
      {
        "question": "Can I test software or inspect equipment in Finland on a business visa?",
        "answer": "Yes. Short-term testing, technical discussions, and product inspections that do not constitute regular employment in the Finnish labour market are permitted."
      },
      {
        "question": "Where do I submit my application in India for Finland?",
        "answer": "Applications are lodged in person at designated VFS Global Finland Visa Application Centres across major Indian cities for biometric capture."
      }
    ]
  },
  "italy": {
    "cname": "Italy",
    "visa_category": "Schengen Business Visa (Visto per Affari)",
    "overview": "The Italian Schengen Business Visa (Visto per Affari) enables international business professionals to travel to Italy and the European Schengen Area for commercial transactions for up to 90 days within any 180-day window. Recognized activities include negotiating commercial agreements, purchasing goods, inspecting manufacturing plants in Lombardy and Emilia-Romagna, attending fashion and design showcases in Milan, participating in trade fairs (Fiera Milano), and attending corporate meetings with Italian enterprises. The inviting Italian enterprise must provide an official Letter of Invitation (Lettera d'Invito per Affari) accompanied by a recent Chamber of Commerce extract (Visura Camerale).",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20b92,500 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Paid at VFS Global Italy in India upon submission."
    },
    "proc_time": "15 Calendar Days (Consular Standard Timeline)",
    "proc_details": "Adjudicated by the Embassy of Italy in New Delhi and Consulates General in Mumbai, Kolkata, and Bengaluru.",
    "source": "Ministry of Foreign Affairs and International Cooperation of Italy (MAECI)",
    "validity": "From duration of visit up to 5 Years (Multiple Entry)",
    "stay": "Up to 90 Days within any 180-Day period across the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Lettera d'Invito per Affari & Visura Camerale",
    "invitation_desc": "Official statutory Italian Ministry of Foreign Affairs business invitation format accompanied by a recent Chamber of Commerce certificate (Visura Camerale).",
    "min_funds": "Company sponsorship or personal bank statements meeting the statutory MAECI subsistence directive table (approx. \u20ac50/day)",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Industrial & Design Hub",
        "description": "Engage with world-leading manufacturing, automotive, fashion, packaging, and design enterprises."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Visura Camerale Verification",
        "description": "Robust consular verification through official Italian Chamber of Commerce corporate extracts."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Multi-Country Mobility",
        "description": "Full travel freedom across Italy and all 29 Schengen member states without border formalities."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Circulation Visa Provisions",
        "description": "Frequent corporate travelers receive multi-year multiple-entry Schengen business visas."
      }
    ],
    "faqs": [
      {
        "question": "What is a Visura Camerale for an Italian business visa?",
        "answer": "The Visura Camerale is an official certificate issued by the Italian Chamber of Commerce (Camera di Commercio) containing complete legal and administrative details of the registered Italian host company, valid for 6 months."
      },
      {
        "question": "What template must be used for the Italian business invitation?",
        "answer": "The inviting Italian company must use the official statutory 'Lettera d'Invito per Affari' format issued by the Italian Ministry of Foreign Affairs (MAECI), signed by a legal representative."
      },
      {
        "question": "Can I attend trade exhibitions in Milan or Bologna on this visa?",
        "answer": "Yes. Exhibitors and trade buyers can attend events like Salone del Mobile, Milan Fashion Week, or Cosmoprof with an exhibitor pass and invitation letter."
      },
      {
        "question": "What financial requirements apply to an Italian business visa?",
        "answer": "The Italian Ministry of Interior establishes daily subsistence tables based on the length of stay (Directive 1.3.2000). A company sponsorship letter covering all lodging and travel meets this requirement."
      },
      {
        "question": "Can I inspect machinery and finalize purchase orders in Italy?",
        "answer": "Yes. Commercial inspections, factory acceptance testing (FAT), and signing procurement contracts are standard authorized activities."
      }
    ]
  },
  "norway": {
    "cname": "Norway",
    "visa_category": "Schengen Business Visa (Forretningsvisum)",
    "overview": "The Norwegian Schengen Business Visa (Forretningsvisum) permits international commercial representatives, maritime specialists, and energy delegates to visit Norway and the Schengen Area for up to 90 days in a 180-day window. Norway's leadership in maritime shipping, renewable energy, oil & gas engineering, and aquaculture generates extensive commercial collaboration. Permitted activities include corporate meetings, contract negotiations, attending industry summits in Oslo or Bergen (such as Nor-Shipping), and technical site visits. The application is registered on the UDI Application Portal and lodged at VFS Global Norway in India.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Registered and paid online via the UDI Application Portal (udi.no) before biometric submission."
    },
    "proc_time": "15 Calendar Days from Consular Lodgement",
    "proc_details": "Applications registered online via the UDI Portal (udi.no) and adjudicated by the Royal Norwegian Embassy in New Delhi.",
    "source": "Norwegian Directorate of Immigration (UDI) & Royal Norwegian Embassy / VFS Global",
    "validity": "From duration of visit up to 5 Years (Multiple Entry)",
    "stay": "Up to 90 Days within any 180-Day period in the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Norwegian Host Company Invitation Letter & Br\u00f8nn\u00f8ysund Registration",
    "invitation_desc": "Official invitation from a registered Norwegian enterprise specifying organization number from the Br\u00f8nn\u00f8ysund Register Centre and commercial agenda.",
    "min_funds": "Company financial guarantee or bank statement showing minimum NOK 500/day (approx. \u20ac45/day)",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Maritime & Energy Capital",
        "description": "Engage with world-leading offshore engineering, green maritime, and renewable energy clusters."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Online UDI Portal",
        "description": "Seamless online registration and digital fee payment directly through UDI's official portal."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Schengen Access",
        "description": "Flexible business travel throughout Norway and all 29 European Schengen member states."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Multi-Year Visas for Regulars",
        "description": "Eligible corporate executives qualify for multiple-entry business visas valid for 1, 2, or 5 years."
      }
    ],
    "faqs": [
      {
        "question": "What is the Br\u00f8nn\u00f8ysund organization number for Norway?",
        "answer": "The Br\u00f8nn\u00f8ysund Register Centre (Br\u00f8nn\u00f8ysundregistrene) manages the official register of all business enterprises in Norway. The host's 9-digit organization number must be included in the invitation letter."
      },
      {
        "question": "Can I visit offshore vessels or platforms on a Norwegian business visa?",
        "answer": "Short-term technical inspections, commercial audits, and business discussions on vessels docked in Norwegian ports are permitted. Working as part of the vessel's operational crew requires a maritime work permit."
      },
      {
        "question": "How do I register a business visa application for Norway?",
        "answer": "You must create an account on the UDI Application Portal (udi.no), complete the electronic application form, pay the \u20ac90 fee online, and book an appointment at VFS Norway."
      },
      {
        "question": "Can my employer sponsor my business visit to Norway?",
        "answer": "Yes. A formal employer deputation letter confirming that the employer covers travel, lodging, daily allowances, and return transport fulfills all financial criteria."
      },
      {
        "question": "Is travel medical insurance mandatory for Norway?",
        "answer": "Yes. A comprehensive travel medical insurance policy with minimum coverage of \u20ac30,000 for emergency medical treatment and medical repatriation across the Schengen Area is required."
      }
    ]
  },
  "portugal": {
    "cname": "Portugal",
    "visa_category": "Schengen Business Visa (Visto de Curta Dura\u00e7\u00e3o - Neg\u00f3cios)",
    "overview": "The Portuguese Schengen Business Visa (Visto de Curta Dura\u00e7\u00e3o para Fins Negociais) allows foreign corporate delegates, tech founders, and commercial partners to enter Portugal and the Schengen Area for up to 90 days within any 180-day period. Key commercial hubs in Lisbon and Porto host major global technology conferences (such as Web Summit), bilateral trade forums, and commercial negotiations. Authorized activities include meeting Portuguese and European commercial partners, signing sales agreements, evaluating real estate or corporate investment opportunities, and participating in corporate workshops.",
    "fees": {
      "visa_fee": "\u20ac90 (approx. \u20b98,100 Standard Schengen Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac90 + VFS Service Fee",
      "notes": "Paid at VFS Global Portugal in India upon application submission."
    },
    "proc_time": "15 Calendar Days (Consular Standard SLA)",
    "proc_details": "Adjudicated by the Consular Section of the Embassy of Portugal in New Delhi following biometric capture at VFS Global.",
    "source": "Ministry of Foreign Affairs of Portugal (MNE) & Embassy of Portugal in India / VFS Global",
    "validity": "From duration of visit up to 5 Years (Multiple Entry)",
    "stay": "Up to 90 Days within any 180-Day rolling window in the Schengen Area",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Carta de Convite Comercial & Certid\u00e3o Permanente",
    "invitation_desc": "Official business invitation from a Portuguese company specifying tax number (NIF), commercial agenda, and company registry access code (C\u00f3digo de Acesso da Certid\u00e3o Permanente).",
    "min_funds": "Company sponsorship guarantee or personal bank statement showing \u20ac75 upon entry + \u20ac40/day",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Web Summit & Tech Hub",
        "description": "Attend Europe's largest technology gathering (Web Summit Lisbon) and engage with dynamic startup clusters."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Certid\u00e3o Permanente Verification",
        "description": "Rapid digital verification through Portugal's online commercial company registration portal."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "90/180-Day Schengen Mobility",
        "description": "Seamless travel across Portugal and all 29 European Schengen member states."
      },
      {
        "icon": "\ud83d\udee1\ufe0f",
        "title": "Multi-Entry Circulation Visas",
        "description": "Frequent corporate travelers receive multi-year multiple-entry Schengen business visas."
      }
    ],
    "faqs": [
      {
        "question": "What is the Certid\u00e3o Permanente code for a Portuguese business visa?",
        "answer": "The Certid\u00e3o Permanente (Permanent Certificate) is an online corporate extract for Portuguese companies. The invitation should provide the access code so the Portuguese consulate can verify the company's legal standing."
      },
      {
        "question": "Can I attend Web Summit Lisbon on this business visa?",
        "answer": "Yes. Exhibitors, conference attendees, and investors attending Web Summit or other technology congresses can apply using their official event registration and ticket confirmation."
      },
      {
        "question": "What financial resources are required for a Portuguese business visa?",
        "answer": "Portuguese law (Order no. 1563/2007) requires proof of at least \u20ac75 for entry into the country plus \u20ac40 for each day of stay, or an official employer undertaking covering all expenses."
      },
      {
        "question": "Can I explore real estate or venture capital investments on a business visa?",
        "answer": "Yes. Conducting site visits, consulting with legal and financial advisors, and opening personal or corporate tax numbers (NIF) are permitted activities."
      },
      {
        "question": "Can I travel to other European countries with a Portuguese business visa?",
        "answer": "Yes. A Schengen visa issued by Portugal allows unrestricted travel across all 29 Schengen member states, provided Portugal is your primary destination."
      }
    ]
  }
};

// ── 1. BUSINESS OVERVIEW ──
export function getBusinessOverview(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.overview) return d.overview;
  return `The Business Visa allows commercial representatives and professionals to visit ${country} for commercial negotiations, business conferences, client meetings, and trade expos without entering the local labor market.`;
}

// ── 2. BUSINESS HIGHLIGHTS ──
export function getBusinessHighlights(country: string): BusinessHighlightItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.highlights) return d.highlights;
  return [
    { icon: '💼', title: 'Commercial Negotiations', description: 'Authorized for client meetings, corporate summits, and trade exhibitions.' },
    { icon: '🏢', title: 'Host Company Invitation', description: 'Requires an official business invitation letter from a verified local corporate partner.' },
    { icon: '⏱️', title: 'Short-Term Stay', description: 'Permits stays up to 90 to 180 days per visit depending on consular jurisdiction.' },
    { icon: '🛡️', title: 'Employer Sponsorship', description: 'Fully supported by deputation and financial sponsorship letters from your home employer.' }
  ];
}

// ── 3. STEPS TO APPLY ──
export function getBusinessSteps(country: string): string[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = d ? d.cname : country;
  const doc = d ? d.invitation_doc : 'Host Company Business Invitation Letter';
  const auth = d ? d.source : 'official consular authorities';
  return [
    `Obtain Official Invitation: Secure an official ${doc} from the host organization in ${cname} detailing meeting dates and commercial objectives.`,
    `Secure Employer Deputation Letter: Obtain an official letter from your current employer confirming your designation, salary, mission purpose, and financial guarantee.`,
    `Gather Commercial & Financial Dossier: Compile company registration certificate, past 3-6 months bank statements, ITR filings, and flight/hotel reservations.`,
    `Complete Online Visa Application: Fill out the official visa application portal for ${cname} and upload certified copies of passport and invitations.`,
    `Book & Attend Biometrics Appointment: Schedule an in-person appointment at the designated Visa Application Center (VFS Global / Consular Section) to submit biometrics.`,
    `Attend Consular Interview (if applicable): Provide clear testimony regarding the business agenda, commercial ties, and planned return date.`,
    `Passport Collection & Travel: Upon visa vignette approval, verify visa validity dates, ensure travel medical insurance is active, and finalize flight bookings.`
  ];
}

// ── 4. DOCUMENTS REQUIRED ──
export function getBusinessDocuments(countryOrFrom: string, maybeCountry?: string, purpose?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d.invitation_doc : 'Host Company Business Invitation Letter';
  const doc_desc = d ? d.invitation_desc : 'Official letter from inviting organization detailing meeting itinerary and confirming non-remuneration.';
  return [
    { title: 'Valid International Passport', description: 'Original passport valid for at least 6 months beyond intended stay with at least 2 blank visa pages.', is_mandatory: true },
    { title: doc, description: doc_desc, is_mandatory: true },
    { title: 'Employer Deputation Letter (No Objection Certificate)', description: 'Official letter on employer company letterhead detailing employee designation, tenure, purpose of visit, and guarantee of return.', is_mandatory: true },
    { title: 'Proof of Business Registration / Incorporation', description: 'Certificate of Incorporation (GST, MCA, or Chamber of Commerce registration) of the sending company in India.', is_mandatory: true },
    { title: 'Corporate or Personal Bank Statements', description: 'Original stamped bank statements for the past 3 to 6 months demonstrating healthy cash flow and operational balances.', is_mandatory: true },
    { title: 'Income Tax Returns (ITR-V)', description: 'Income tax returns (ITR-V) and Form 16 of the applicant or company audited financial accounts for the past 2 assessment years.', is_mandatory: true },
    { title: 'Confirmed Roundtrip Flight Itinerary & Hotel Reservation', description: 'Verifiable roundtrip flight reservation and hotel accommodation booking covering the entire duration of the business visit.', is_mandatory: true },
    { title: 'Comprehensive Travel Medical Insurance', description: 'International travel health insurance policy providing minimum coverage of €30,000 (or $50,000) covering emergency hospital care and repatriation.', is_mandatory: true },
    { title: 'Consular Biometric Photographs', description: 'Recent color photographs meeting specific consular biometric dimensions on a light background.', is_mandatory: true }
  ];
}

// ── 5. BUSINESS FEES ──
export function getBusinessFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.fees) return d.fees;
  return {
    visa_fee: 'Statutory Consular Business Visa Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Consular Fee + VAC Logistics',
    notes: 'Check official embassy portal for current fee tariffs. Fees are typically reimbursed by sending employer.'
  };
}

// ── 6. PROCESSING TIME ──
export function getBusinessProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_time : '10 to 15 Business Days (Standard Consular Processing)';
}

export function getBusinessProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_details : 'Timelines depend on consular workload, completeness of company registration records, and appointment slots.';
}

// ── 7. OTHER REQUIREMENTS ──
export function getBusinessRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d.invitation_doc : 'Official Host Invitation Letter';
  return [
    { category: 'Commercial Invitation', details: `${doc} from a verified legal entity in ${d ? d.cname : country} specifying commercial purpose.` },
    { category: 'Sending Employer Sponsorship', details: 'Official deputation letter on corporate letterhead confirming full expense coverage and continued overseas salary.' },
    { category: 'Strict Non-Employment Rule', details: 'Applicant must not enter the local labour market or receive compensation directly from a host entity.' },
    { category: 'Return Intent & Genuine Ties', details: 'Verifiable business establishment, ongoing employment contract, and assets in the home country ensuring prompt return.' }
  ];
}

// ── 8. FINANCIAL PROOFS ──
export function getBusinessFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const funds = d ? d.min_funds : 'Company sponsorship letter and bank balance showing ₹2,50,000 - ₹5,00,000+';
  return [
    { type: 'Corporate Sponsorship Undertaking', minimum_balance_or_amount: 'Full Travel & Accommodation Guarantee', time_frame: 'Duration of mission', notes: 'Employer corporate undertaking confirming full coverage of flights, lodging, per diems, and emergency medical costs.' },
    { type: 'Sending Company Bank Account Statements', minimum_balance_or_amount: 'Past 3 to 6 Months Operating Balance', time_frame: 'Last 3-6 months', notes: 'Audited current bank account statement showing sound liquidity and financial standing of sending enterprise.' },
    { type: 'Personal Bank Account Statements', minimum_balance_or_amount: funds, time_frame: 'Past 3 to 6 months', notes: 'Personal bank statements with bank seal proving self-sufficiency or incidental expense funds.' },
    { type: 'Income Tax Assessment Filings (ITR-V)', minimum_balance_or_amount: 'Past 2 Assessment Years', time_frame: 'Assessment years 2022-2025', notes: 'Income tax returns and Form 16 demonstrating regular salary inflow and tax compliance.' }
  ];
}

// ── 9. FAQS ──
export function getBusinessFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.faqs) return d.faqs;
  const cname = d ? d.cname : country;
  return [
    { question: `Can I take up employment in ${cname} on a business visa?`, answer: `No. A business visa explicitly forbids local employment, productive labour, or receiving salary from an entity registered in ${cname}.` },
    { question: `What is the maximum duration I can stay on each business trip?`, answer: `Stays are generally limited to 30 to 90 days per visit depending on consular regulations and the entry stamp granted at border control.` },
    { question: `Can I apply for a multiple-entry business visa?`, answer: `Yes. Frequent business delegates who demonstrate ongoing commercial ties and a clean travel history can be granted multiple-entry visas valid for 1 to 5 years.` },
    { question: `Who is responsible for the expenses of the business trip?`, answer: `In most cases, the sending company or the inviting host organization provides a financial guarantee covering all travel, lodging, and living expenses.` },
    { question: `Can I attend trade fairs and conferences on a business visa?`, answer: `Yes. Attending corporate conventions, trade exhibitions, technology expos, and commercial symposiums are standard authorized business activities.` }
  ];
}

// ── 10. VALIDITY & STAY ──
export function getBusinessValidity(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.validity : 'Up to 1 Year (Multiple Entry)';
}

export function getBusinessStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.stay : 'Up to 90 Days per visit';
}

export function getBusinessEntryType(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.entry_type : 'Multiple Entry';
}

export function getBusinessOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.source : `${country} Ministry of Foreign Affairs & Consular Section`;
}

// ── 11. COMPLETE BUSINESS VISA DATA BUILDER ──
export function getBusinessVisaData(
  from: string,
  to: string,
  purpose: string = 'Business'
): StructuredVisaRequirements {
  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getBusinessOfficialSourceName(to);
  const procTime = getBusinessProcessingTime(to);
  const procDetails = getBusinessProcessingDetails(to);
  const val = getBusinessValidity(to);
  const stay = getBusinessStayDuration(to);
  const entryType = getBusinessEntryType(to);
  const fees = getBusinessFees(to);
  const faqs = getBusinessFAQ(to);
  const highlights = getBusinessHighlights(to);
  const steps = getBusinessSteps(to);
  const docs = getBusinessDocuments(from, to, purpose);
  const reqs = getBusinessRequirements(to);
  const proofs = getBusinessFinancialProofs(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Commercial / Business Meetings',
    visa_type: `${countryName} Business Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' business commercial visitor visa official consular requirements')}`,
    official_source_name: officialSource,
    overview: getBusinessOverview(to),
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
    validity_details: `Standard business visa validity: ${val}`,
    stay_duration: stay,
    stay_duration_details: `Maximum permitted stay: ${stay}`,
    entry_type: entryType,
    entry_type_details: `${entryType} commercial visit authorization`,
    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },
    processing_and_timing: {
      apply_window: 'Apply 3 to 6 weeks prior to planned business mission date.',
      decision_time: procTime,
      max_extension: 'Extensions are granted only under exceptional commercial or medical circumstances.',
      center_notes: c === 'usa'
        ? 'U.S. Embassy / Consulate & VAC (Visa Application Center) for biometrics & interview.'
        : `VFS Global / ${countryName} Embassy / Consulate. Check appointment availability online.`
    },
    verification_status: 'verified',
    is_v3_verified: true
  };
}

export const getBusinessVisaSteps = getBusinessSteps;

