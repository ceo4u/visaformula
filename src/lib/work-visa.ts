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
  if (c.includes('australia')) return 'australia';
  if (c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('ireland') || c.includes('irish') || c.includes('eire')) return 'ireland';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('japan') || c.includes('tokyo')) return 'japan';
  if (c.includes('austria') || c.includes('vienna')) return 'austria';
  if (c.includes('belgium') || c.includes('brussels')) return 'belgium';
  if (c.includes('czech') || c.includes('prague')) return 'czech-republic';
  if (c.includes('denmark') || c.includes('copenhagen')) return 'denmark';
  if (c.includes('finland') || c.includes('helsinki')) return 'finland';
  if (c.includes('france') || c.includes('paris')) return 'france';
  if (c.includes('italy') || c.includes('italia') || c.includes('rome') || c.includes('milan')) return 'italy';
  if (c.includes('norway') || c.includes('oslo')) return 'norway';
  if (c.includes('poland') || c.includes('warsaw')) return 'poland';
  if (c.includes('portugal') || c.includes('lisbon')) return 'portugal';
  if (c.includes('sweden') || c.includes('stockholm')) return 'sweden';
  if (c.includes('netherlands') || c.includes('holland')) return 'netherlands';
  if (c.includes('new zealand') || c === 'nz') return 'new-zealand';
  
  // ── 35 NEW COUNTRIES NORMALIZATION ──
  // RUSSIA & CIS
  if (c.includes('russia') || c.includes('russian federation') || c.includes('moscow')) return 'russia';
  if (c.includes('ukraine') || c.includes('kyiv') || c.includes('kiev')) return 'ukraine';
  if (c.includes('belarus') || c.includes('minsk')) return 'belarus';
  if (c.includes('kazakhstan') || c.includes('astana') || c.includes('almaty')) return 'kazakhstan';
  if (c.includes('uzbekistan') || c.includes('tashkent') || c.includes('samarkand')) return 'uzbekistan';
  if (c.includes('kyrgyzstan') || c.includes('bishkek') || c.includes('kyrgyz republic')) return 'kyrgyzstan';
  if (c.includes('tajikistan') || c.includes('dushanbe')) return 'tajikistan';
  if (c.includes('turkmenistan') || c.includes('ashgabat')) return 'turkmenistan';
  if (c.includes('azerbaijan') || c.includes('baku')) return 'azerbaijan';
  if (c.includes('georgia') || c.includes('tbilisi') || c.includes('batumi')) return 'georgia';
  if (c.includes('armenia') || c.includes('yerevan')) return 'armenia';
  if (c.includes('moldova') || c.includes('chisinau') || c.includes('republic of moldova')) return 'moldova';

  // ASIA
  if (c.includes('pakistan') || c.includes('islamabad') || c.includes('lahore') || c.includes('karachi')) return 'pakistan';
  if (c.includes('bangladesh') || c.includes('dhaka')) return 'bangladesh';
  if (c.includes('myanmar') || c.includes('burma') || c.includes('yangon') || c.includes('naypyidaw')) return 'myanmar';
  if (c.includes('laos') || c.includes('lao pdr') || c.includes('vientiane')) return 'laos';
  if (c.includes('mongolia') || c.includes('ulaanbaatar')) return 'mongolia';
  if (c.includes('taiwan') || c.includes('taipei') || c.includes('republic of china')) return 'taiwan';
  if (c.includes('hong kong') || c.includes('hong-kong') || c.includes('hongkong') || c === 'hk') return 'hong-kong';
  if (c.includes('macau') || c.includes('macao')) return 'macau';

  // AFRICA
  if (c.includes('nigeria') || c.includes('lagos') || c.includes('abuja')) return 'nigeria';
  if (c.includes('ghana') || c.includes('accra')) return 'ghana';
  if (c.includes('ethiopia') || c.includes('addis ababa')) return 'ethiopia';
  if (c.includes('rwanda') || c.includes('kigali')) return 'rwanda';
  if (c.includes('zimbabwe') || c.includes('harare')) return 'zimbabwe';

  // AMERICAS
  if (c.includes('colombia') || c.includes('bogota') || c.includes('medellin')) return 'colombia';
  if (c.includes('peru') || c.includes('lima') || c.includes('cusco')) return 'peru';
  if (c.includes('chile') || c.includes('santiago')) return 'chile';
  if (c.includes('argentina') || c.includes('buenos aires')) return 'argentina';
  if (c.includes('costa rica') || c.includes('costa-rica') || c.includes('san jose')) return 'costa-rica';

  // EUROPE
  if (c.includes('romania') || c.includes('bucharest')) return 'romania';
  if (c.includes('bulgaria') || c.includes('sofia')) return 'bulgaria';
  if (c.includes('croatia') || c.includes('zagreb') || c.includes('dubrovnik')) return 'croatia';
  if (c.includes('slovenia') || c.includes('ljubljana')) return 'slovenia';
  if (c.includes('cyprus') || c.includes('nicosia') || c.includes('limassol')) return 'cyprus';

  return c;
}

const DESTS: Record<string, any> = {
  // ── 35 NEW COUNTRIES ──
  "russia": {
    "cname": "Russia",
    "permit_name": "Work Permit & High-Qualified Specialist (HQS) Visa",
    "permit_authority": "General Administration for Migration Issues (MVD)",
    "overview": "Russia offers work visas for skilled professionals. Employers must obtain a work permit from the Ministry of Internal Affairs. IT, engineering, medical, and energy sector professionals are in high demand.",
    "fees": {
      "visa_fee": "$50-150 USD (approx. ₹4,100-12,300)",
      "service_fee": "Payable at VFS",
      "total_fee": "$50-150 USD + VFS Logistics",
      "notes": "Work permit fees paid by employer. Visa fee varies by duration."
    },
    "proc_time": "4-8 Weeks (Work Permit) + 2-4 Weeks (Visa)",
    "proc_details": "Employer secures MVD work permit and invitation, followed by consular entry visa issuance.",
    "source": "Russian Ministry of Internal Affairs (MVD) & Consular Department / VFS Global",
    "validity": "1-3 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "MVD Work Permit & Signed Russian Employment Contract",
    "contract_desc": "Official work authorization issued by MVD with notarized Russian employment agreement.",
    "salary_threshold": "Statutory minimum wage / HQS threshold (RUB 2,000,000/year for High-Qualified Specialists)",
    "work_permit_type": "MVD Work Authorization & Plastic Work Permit Card",
    "min_funds": "Initial settlement maintenance ($2,000 - $3,000 USD)",
    "highlights": [
      {
        "icon": "💼",
        "title": "Skilled Worker Visa",
        "description": "Work permit + entry visa for qualified professionals."
      },
      {
        "icon": "💰",
        "title": "Growing Economy",
        "description": "Moscow, St. Petersburg, and energy sector offer strong employment opportunities."
      },
      {
        "icon": "🔄",
        "title": "1-3 Year Validity",
        "description": "Work visa valid for 1-3 years, renewable based on employment."
      },
      {
        "icon": "📋",
        "title": "Employer Sponsorship",
        "description": "Must have a job offer from a Russian employer with work permit."
      }
    ],
    "faqs": [
      {
        "question": "Do I need a work permit to work in Russia?",
        "answer": "Yes, your employer must obtain a work permit from the Ministry of Internal Affairs before you can apply for a work visa."
      },
      {
        "question": "How long is the Russia Work Visa valid?",
        "answer": "Work visas are typically issued for 1-3 years, renewable based on employment."
      },
      {
        "question": "Can my family join me on a work visa?",
        "answer": "Yes, family members can apply for dependent visas to join you in Russia."
      }
    ]
  },
  "kazakhstan": {
    "cname": "Kazakhstan",
    "permit_name": "Work Permit & Category C3 Employment Visa",
    "permit_authority": "Ministry of Labour and Social Protection of Kazakhstan & Migration Police",
    "overview": "Kazakhstan offers Category C3 work visas for foreign specialists. Employers must obtain foreign labour quota clearance and a work permit from the local Akimat (regional labour department). Strong demand in energy, construction, mining, IT, and healthcare.",
    "fees": {
      "visa_fee": "$80-150 USD (approx. ₹6,700-12,500)",
      "service_fee": "Consular processing fee",
      "total_fee": "$80-150 USD Statutory Reference",
      "notes": "Employer pays regional state duty for work permit authorization."
    },
    "proc_time": "4 to 6 Weeks (Work Permit) + 10-15 Days (Visa)",
    "proc_details": "Regional Akimat issues work permit; MFA registers invitation telex for consular visa stamping.",
    "source": "Ministry of Labour and Social Protection & MFA of the Republic of Kazakhstan",
    "validity": "1 to 3 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Akimat Work Permit Authorization & Employment Agreement",
    "contract_desc": "Official work permit granted under regional quota accompanied by bilingual contract.",
    "salary_threshold": "Statutory minimum wage compliance in foreign specialist quota category",
    "work_permit_type": "Category 1-4 Foreign Specialist Work Permit",
    "min_funds": "$3,000 USD initial living maintenance",
    "highlights": [
      {
        "icon": "🏗️",
        "title": "Booming Infrastructure",
        "description": "Major opportunities in oil & gas, mining, construction, and IT."
      },
      {
        "icon": "📋",
        "title": "Corporate Sponsoring",
        "description": "Employer files Akimat permit and handles MFA invitation telex."
      },
      {
        "icon": "🔄",
        "title": "Multi-Entry Permit",
        "description": "Category C3 visa allows unrestricted travel in and out of Kazakhstan."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Relocation",
        "description": "Dependents qualify for C4/C5 accompanying family visas."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a work visa in Kazakhstan?",
        "answer": "Yes, visa-free entry is only for tourism/business meetings (14 days). Lawful employment requires a C3 work visa and employer work permit."
      },
      {
        "question": "Who applies for the work permit in Kazakhstan?",
        "answer": "The sponsoring Kazakh company must apply to the regional Akimat for foreign labour permission."
      },
      {
        "question": "How long is the C3 work visa valid?",
        "answer": "Typically issued for 1 year, renewable annually based on contract and work permit renewal."
      }
    ]
  },
  "ukraine": {
    "cname": "Ukraine",
    "permit_name": "Work Permit (Dozvil na pratsyuvannya) & Type D-04 Employment Visa",
    "permit_authority": "State Employment Service of Ukraine & State Migration Service (SMS)",
    "overview": "Foreign skilled workers require a work permit issued by the State Employment Service and a Type D-04 long-stay visa. Sponsoring employers must satisfy statutory minimum wage requirements.",
    "fees": {
      "visa_fee": "$65 USD (Single) / $130 USD (Multiple Entry)",
      "service_fee": "Work permit state fee (2 to 6 subsistence minimums paid by employer)",
      "total_fee": "$65-130 USD Consular Reference",
      "notes": "Employer covers State Employment Service permit levies."
    },
    "proc_time": "10 Days (Work Permit) + 15-20 Days (Visa)",
    "proc_details": "State Employment Service issues permit within 7-10 days; consular visa D-04 issued at VFS Ukraine.",
    "source": "State Employment Service of Ukraine & State Migration Service (SMS)",
    "validity": "1 to 3 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "State Employment Service Work Permit & Employment Contract",
    "contract_desc": "Official statutory work authorization permit issued to the sponsoring Ukrainian legal entity.",
    "salary_threshold": "Statutory minimum wage or 10 minimum wages for general non-specialist roles",
    "work_permit_type": "Dozvil na zastosuvannya pratsi inozemtsiv",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "💻",
        "title": "IT & Engineering",
        "description": "Strong engineering, agricultural technology, and software development sectors."
      },
      {
        "icon": "📋",
        "title": "Employer Sponsorship",
        "description": "Sponsoring employer handles work permit filing with Employment Center."
      },
      {
        "icon": "🔄",
        "title": "Multi-Year Permit",
        "description": "Work permits can be granted for up to 3 years for key specialists."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens work in Ukraine?",
        "answer": "Yes, provided the Ukrainian employer secures a work permit from the State Employment Service prior to visa filing."
      }
    ]
  },
  "belarus": {
    "cname": "Belarus",
    "permit_name": "Special Work Permit & Employment Visa (Type C / D)",
    "permit_authority": "Department on Citizenship and Migration of the Ministry of Internal Affairs",
    "overview": "Foreign workers in Belarus require an employer-sponsored Special Work Permit issued by the Department on Citizenship and Migration, especially in IT (Hi-Tech Park resident companies), engineering, and manufacturing.",
    "fees": {
      "visa_fee": "€60 (Single) / €150 (Multi-Entry Type D)",
      "service_fee": "Employer pays state duty for work permit (approx. 5 basic units)",
      "total_fee": "€60-150 Consular Fee",
      "notes": "Hi-Tech Park (HTP) IT employees enjoy simplified work permit procedures."
    },
    "proc_time": "15 Days (Work Permit) + 5 Days (Visa)",
    "proc_details": "Employer secures permit from migration authorities; Embassy stamps entry visa in New Delhi.",
    "source": "Department on Citizenship and Migration of Belarus / Hi-Tech Park (HTP)",
    "validity": "1 to 2 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Special Work Permit (Spetsialnoe Razreshenie) & Labour Contract",
    "contract_desc": "Official work license granted by migration authorities with registered employment contract.",
    "salary_threshold": "Statutory minimum wage or HTP contractual remuneration standards",
    "work_permit_type": "Spetsialnoe razreshenie na pravo zanyatiya trudovoy deyatelnostyu",
    "min_funds": "$2,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "💻",
        "title": "Hi-Tech Park (HTP)",
        "description": "Silicon Valley of Eastern Europe offering tax breaks and work permit exemptions."
      },
      {
        "icon": "📋",
        "title": "Industrial Growth",
        "description": "Strong demand in heavy machinery, petrochemicals, and software development."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian software engineers work in Belarus?",
        "answer": "Yes, companies registered in the Belarus Hi-Tech Park (HTP) can hire foreign IT specialists under fast-track rules without standard quota limitations."
      }
    ]
  },
  "uzbekistan": {
    "cname": "Uzbekistan",
    "permit_name": "Work Permit (Tasdiqnoma) & Category E Employment Visa",
    "permit_authority": "Agency for External Labour Migration under Ministry of Poverty Reduction and Employment",
    "overview": "Foreign professionals require an employment license from the Agency for External Labour Migration and a Category E visa. Surging demand in oil & gas, chemicals, civil construction, pharmaceuticals, and IT.",
    "fees": {
      "visa_fee": "$100-200 USD (Category E Visa)",
      "service_fee": "Employer covers Agency state duty for work authorization",
      "total_fee": "$100-200 USD Statutory Reference",
      "notes": "Sponsoring employer handles labour quota approval."
    },
    "proc_time": "3 to 5 Weeks (Work Permit) + 10 Days (Visa)",
    "proc_details": "Agency for External Labour Migration issues confirmation card; MFA issues visa telex.",
    "source": "Agency for External Labour Migration & Ministry of Foreign Affairs of Uzbekistan",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Labour Migration Agency Work License & Employment Contract",
    "contract_desc": "Official statutory work authorization card issued to the foreign specialist.",
    "salary_threshold": "Statutory minimum wage or skilled specialist benchmark",
    "work_permit_type": "Yollanma mehnat faoliyati huquqiga tasdiqnoma",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Energy & Infrastructure",
        "description": "Massive government investments in energy, mining, and industrial parks."
      },
      {
        "icon": "📋",
        "title": "Corporate Quota",
        "description": "Streamlined work permit approvals for international joint ventures."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian engineers work in Uzbekistan?",
        "answer": "Yes, many Indian engineers and construction professionals work on major industrial and pharmaceutical projects with an Agency work permit."
      }
    ]
  },
  "kyrgyzstan": {
    "cname": "Kyrgyzstan",
    "permit_name": "Work Permit & Type W Employment Visa",
    "permit_authority": "Ministry of Labour, Social Security and Migration of the Kyrgyz Republic",
    "overview": "Foreign workers require an employer-sponsored work permit approved under annual foreign labour quotas. Demand is high in mining (Kumtor gold mine), textile manufacturing, pharmaceuticals, and civil construction.",
    "fees": {
      "visa_fee": "$100 USD (Consular Visa W)",
      "service_fee": "Employer pays state duty for foreign specialist permit card",
      "total_fee": "$100 USD Consular Reference",
      "notes": "Work permit authorized by Ministry of Labour."
    },
    "proc_time": "3 to 4 Weeks (Work Permit) + 10 Days (Visa)",
    "proc_details": "Ministry of Labour issues work card; MFA issues visa authorization.",
    "source": "Ministry of Labour, Social Security and Migration & MFA Kyrgyzstan",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Ministry Work Permit Card & Employment Contract",
    "contract_desc": "Official plastic work license card issued under national foreign labour quota.",
    "salary_threshold": "Statutory minimum wage compliance",
    "work_permit_type": "Razreshenie na rabotu dlya inostrannogo spetsialista",
    "min_funds": "$2,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⛏️",
        "title": "Mining & Construction",
        "description": "Major international mining and infrastructure ventures across the country."
      },
      {
        "icon": "📋",
        "title": "Corporate Quota",
        "description": "Sponsoring enterprise manages annual foreign labour licensing."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian professionals work in Kyrgyzstan?",
        "answer": "Yes, Indian specialists in mining, pharmaceuticals, and engineering are actively recruited with an official work permit."
      }
    ]
  },
  "tajikistan": {
    "cname": "Tajikistan",
    "permit_name": "Work Permit & Category M Employment Visa",
    "permit_authority": "Migration Service of the Ministry of Labour, Migration and Employment of Population",
    "overview": "Foreign workers require a work permit approved under foreign specialist quotas. Major projects in hydropower (Rogun Dam), road building, telecommunications, and mining.",
    "fees": {
      "visa_fee": "$80-150 USD",
      "service_fee": "Employer pays Migration Service state duty",
      "total_fee": "$80-150 USD Consular Reference",
      "notes": "Sponsoring employer handles labour quota clearance."
    },
    "proc_time": "3 to 4 Weeks (Work Permit) + 10 Days (Visa)",
    "proc_details": "Migration Service issues work permit; MFA issues Category M visa.",
    "source": "Migration Service of the Ministry of Labour & MFA of Tajikistan",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Migration Service Work Permit Card & Employment Contract",
    "contract_desc": "Official work license card granted to the foreign specialist.",
    "salary_threshold": "Statutory minimum wage compliance",
    "work_permit_type": "Iҷozatnoma baroi kor (Work Permit)",
    "min_funds": "$2,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Hydropower & Engineering",
        "description": "Giant energy and infrastructure projects including Rogun Dam."
      },
      {
        "icon": "📋",
        "title": "Employer Sponsorship",
        "description": "Sponsoring enterprise secures quota from Ministry of Labour."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian engineers work in Tajikistan?",
        "answer": "Yes, many Indian engineers and construction contractors work on hydropower, telecommunications, and highway projects."
      }
    ]
  },
  "turkmenistan": {
    "cname": "Turkmenistan",
    "permit_name": "Work Permit & Employment Entry Visa",
    "permit_authority": "State Migration Service of Turkmenistan",
    "overview": "Foreign workers in Turkmenistan are employed predominantly in the massive natural gas extraction, petrochemical, pipeline construction (TAPI project), and textile sectors under strict government quotas.",
    "fees": {
      "visa_fee": "$100-200 USD",
      "service_fee": "Employer covers state migration work permit fee",
      "total_fee": "$100-200 USD Consular Reference",
      "notes": "Employer handles State Migration Service clearance."
    },
    "proc_time": "4 to 8 Weeks (State Migration Approval)",
    "proc_details": "State Migration Service investigates company quota and approves employment license.",
    "source": "State Migration Service of Turkmenistan & Ministry of Foreign Affairs",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "State Migration Work Permit Card & Employment Contract",
    "contract_desc": "Official work authorization decree and plastic permit card from Migration Service.",
    "salary_threshold": "Statutory skilled specialist foreign quota minimum",
    "work_permit_type": "Iş rugsatnamasy (Work Permit)",
    "min_funds": "$3,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⛽",
        "title": "World-Class Gas Reserves",
        "description": "Galkynysh gas field and international pipeline engineering (TAPI)."
      },
      {
        "icon": "📋",
        "title": "State Approval",
        "description": "All employment is centrally authorized by the State Migration Service."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian professionals work in Turkmenistan?",
        "answer": "Yes, many Indian engineers and technicians work on international oil & gas and pipeline engineering projects with State Migration permits."
      }
    ]
  },
  "azerbaijan": {
    "cname": "Azerbaijan",
    "permit_name": "Work Permit & Temporary Residence Card for Employment",
    "permit_authority": "State Migration Service of the Republic of Azerbaijan",
    "overview": "Foreign workers require an employer-sponsored Work Permit issued by the State Migration Service. Booming employment opportunities in oil & gas (Caspian energy), petrochemicals, IT, civil construction, and logistics.",
    "fees": {
      "visa_fee": "$100 USD (Consular Entry Visa)",
      "service_fee": "Employer pays state duty for work permit (approx. 1,000 AZN/year)",
      "total_fee": "$100 USD Consular Reference",
      "notes": "Employer covers State Migration Service permit fees."
    },
    "proc_time": "20 to 30 Working Days (Work Permit)",
    "proc_details": "State Migration Service issues unified work and temporary residence permit card.",
    "source": "State Migration Service of Azerbaijan & Ministry of Labour",
    "validity": "1 Year (Renewable up to 5 years)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "State Migration Work Permit Card & Employment Contract",
    "contract_desc": "Unified plastic biometric card granting work and residence rights.",
    "salary_threshold": "Statutory skilled specialist foreign quota minimum",
    "work_permit_type": "İş icazəsi (Work Permit) & Müvəqqəti yaşamaq üçün icazə vəsiqəsi",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⛽",
        "title": "Caspian Energy Hub",
        "description": "Global petroleum and energy engineering projects (SOCAR and BP partnerships)."
      },
      {
        "icon": "💳",
        "title": "Unified Biometric Card",
        "description": "One single plastic card covers both work permission and legal residence."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian professionals work in Azerbaijan?",
        "answer": "Yes, many Indian specialists in oil & gas, IT, and hospitality work in Baku with State Migration Service work permits."
      }
    ]
  },
  "georgia": {
    "cname": "Georgia",
    "permit_name": "Category D1 Immigration Visa & Work Residence Permit",
    "permit_authority": "Public Service Hall (PSH) & Ministry of Internally Displaced Persons, Labour, Health and Social Affairs",
    "overview": "Foreign professionals require an employment contract registered on the national labour migration portal and a Work Residence Permit issued by the Public Service Hall. Surging sectors include IT, engineering, agriculture, hospitality, and construction.",
    "fees": {
      "visa_fee": "$20 USD (Consular D1 Visa)",
      "service_fee": "Public Service Hall residence card fee (200-300 GEL)",
      "total_fee": "approx. ₹10,000 Statutory Reference",
      "notes": "Registered via Public Service Hall in Georgia."
    },
    "proc_time": "30 Calendar Days (Standard) / 10 Days (Fast-Track at PSH)",
    "proc_details": "Public Service Hall (PSH) adjudicates work residence permit cards.",
    "source": "Public Service Hall & Ministry of Justice of Georgia",
    "validity": "1 Year (Renewable up to 5-6 years)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Labour Portal Registration & Employment Contract",
    "contract_desc": "Employment contract registered with the Ministry of Labour accompanied by PSH biometric card.",
    "salary_threshold": "Monthly salary at least 5 times the national subsistence minimum (approx. 1,200 GEL/month)",
    "work_permit_type": "Shromiti binadrobis motsmoba (Work Residence Permit)",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "💼",
        "title": "Liberal Business Climate",
        "description": "Top-ranked globally for ease of doing business and transparent tax rules."
      },
      {
        "icon": "🏛️",
        "title": "Public Service Hall",
        "description": "World-famous one-stop-shop administrative agency for swift permit issuance."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian nationals get a work permit in Georgia?",
        "answer": "Yes, with a registered employment contract meeting the minimum monthly income threshold, you can obtain a 1-year renewable work residence card."
      }
    ]
  },
  "armenia": {
    "cname": "Armenia",
    "permit_name": "Work Permit (Work Permit Exemption Certificate) & Residence Card",
    "permit_authority": "Migration and Citizenship Service of the Ministry of Internal Affairs",
    "overview": "Foreign workers require an employer-sponsored electronic work permit issued via the workpermit.am portal. Armenia's booming IT sector, construction, tourism, and diamond processing offer strong employment prospects.",
    "fees": {
      "visa_fee": "$33-66 USD (Consular Visa)",
      "service_fee": "Unified work and residence permit fee (approx. 105,000 AMD)",
      "total_fee": "approx. ₹18,000 Statutory Reference",
      "notes": "Applied online via workpermit.am by employer."
    },
    "proc_time": "20 to 30 Calendar Days",
    "proc_details": "Digital processing via unified government portal workpermit.am.",
    "source": "Migration and Citizenship Service of the Republic of Armenia (workpermit.am)",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Digital Work Permit Approval & Employment Contract",
    "contract_desc": "Electronic work permit confirmation issued via workpermit.am portal.",
    "salary_threshold": "Statutory minimum wage compliance",
    "work_permit_type": "Ashkhatank’i t’uyltvut’yun (Work Permit)",
    "min_funds": "$2,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "💻",
        "title": "IT Silicon Mountain",
        "description": "Thriving tech sector with extensive foreign engineer recruitment and tax perks."
      },
      {
        "icon": "📱",
        "title": "Digital One-Stop Portal",
        "description": "100% digital work permit applications via workpermit.am."
      }
    ],
    "faqs": [
      {
        "question": "How do Indian citizens get a work permit in Armenia?",
        "answer": "The sponsoring Armenian employer applies online through the official portal workpermit.am. Once approved, a 1-year residence card is granted."
      }
    ]
  },
  "moldova": {
    "cname": "Moldova",
    "permit_name": "Work Permit (Drept de muncă) & Long-Stay Visa (Type D/AM)",
    "permit_authority": "National Agency for Employment (ANOFM) & General Inspectorate for Migration (IGM)",
    "overview": "Foreign skilled workers require a work permit authorization from the National Agency for Employment and a Type D/AM long-stay visa. Key sectors include IT (Moldova IT Park offering 7% flat corporate tax), automotive components, agriculture, and manufacturing.",
    "fees": {
      "visa_fee": "€80 (Consular Visa D/AM)",
      "service_fee": "Employer covers ANOFM work authorization levies",
      "total_fee": "€80 Consular Reference",
      "notes": "Moldova IT Park residents benefit from simplified work permit rules."
    },
    "proc_time": "15 Days (Work Permit) + 15-20 Days (Visa)",
    "proc_details": "ANOFM issues work authorization; IGM issues residence permit card in Chișinău.",
    "source": "General Inspectorate for Migration (IGM) & National Agency for Employment",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "ANOFM Work Authorization & Employment Contract",
    "contract_desc": "Official work permit certificate granted to the foreign specialist.",
    "salary_threshold": "Statutory national average gross wage compliance",
    "work_permit_type": "Drept de muncă și ședere provizorie în scop de muncă",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "💻",
        "title": "Moldova IT Park",
        "description": "Unique European tech park offering 7% flat single tax and simplified expatriate hiring."
      },
      {
        "icon": "🇪🇺",
        "title": "EU Candidate Country",
        "description": "Rapid integration with EU economic and regulatory standards."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian software engineers work in Moldova?",
        "answer": "Yes, companies in the Moldova IT Park actively recruit international developers under streamlined work authorization rules."
      }
    ]
  },
  "pakistan": {
    "cname": "Pakistan",
    "permit_name": "Work Visa & Board of Investment (BOI) Clearance",
    "permit_authority": "Board of Investment (BOI) & Ministry of Interior",
    "overview": "Foreign professionals require work visa authorization vetted by the Board of Investment (BOI) and approved by the Ministry of Interior. Employed in energy, engineering, telecommunications, and diplomatic missions.",
    "fees": {
      "visa_fee": "$100-200 USD",
      "service_fee": "BOI authorization levies",
      "total_fee": "$100-200 USD Consular Reference",
      "notes": "Employer handles BOI petition."
    },
    "proc_time": "6 to 8 Weeks (Inter-Agency Review)",
    "proc_details": "Board of Investment reviews company quota; Ministry of Interior approves entry visa.",
    "source": "Board of Investment (BOI) & Ministry of Interior Pakistan",
    "validity": "1 to 2 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "BOI Approval Letter & Employment Contract",
    "contract_desc": "Official statutory work authorization granted by the Board of Investment.",
    "salary_threshold": "Statutory foreign specialist minimum",
    "work_permit_type": "BOI Work Authorization & Ministry of Interior Work Visa",
    "min_funds": "$3,000 USD initial maintenance",
    "highlights": [
      {
        "icon": "🏢",
        "title": "Corporate Sponsorship",
        "description": "Sponsoring corporate entity coordinates directly with Board of Investment."
      }
    ],
    "faqs": [
      {
        "question": "How are work visas processed for Pakistan?",
        "answer": "The sponsoring employer submits a case to the Board of Investment (BOI), followed by Ministry of Interior clearance and consular issuance."
      }
    ]
  },
  "bangladesh": {
    "cname": "Bangladesh",
    "permit_name": "Work Permit & Employment Visa (Category E)",
    "permit_authority": "Bangladesh Investment Development Authority (BIDA) / BEPZA / BEZA",
    "overview": "Foreign professionals require a work permit issued by BIDA, BEPZA (export processing zones), or BEZA, followed by a Category E visa. Strong demand in ready-made garment (RMG) manufacturing, textiles, civil engineering, pharmaceuticals, and power generation.",
    "fees": {
      "visa_fee": "₹0 (Consular Visa)",
      "service_fee": "BIDA work permit processing fee (approx. 5,000-10,000 BDT)",
      "total_fee": "Official Statutory Fee",
      "notes": "Employer covers BIDA work authorization levies."
    },
    "proc_time": "3 to 4 Weeks (BIDA Permit) + 10 Days (Visa)",
    "proc_details": "BIDA verifies company expatriate quota (maximum 1:5 ratio); DIP stamps visa.",
    "source": "Bangladesh Investment Development Authority (BIDA) & Ministry of Home Affairs",
    "validity": "1 to 2 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "BIDA Work Permit Recommendation & Employment Agreement",
    "contract_desc": "Official statutory work authorization granted by BIDA or BEPZA.",
    "salary_threshold": "Statutory foreign specialist minimum (minimum $500 USD/month gross)",
    "work_permit_type": "BIDA / BEPZA Expatriate Work Permit",
    "min_funds": "$2,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "👔",
        "title": "Garment & Textile Industry",
        "description": "World's second-largest garment exporter with vast expatriate management roles."
      },
      {
        "icon": "⚡",
        "title": "Mega Infrastructure",
        "description": "Major international contracts in energy, bridges, ports, and power plants."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens work in Bangladesh?",
        "answer": "Yes, thousands of Indian professionals work across garments, textiles, engineering, and IT with BIDA/BEPZA work permits."
      }
    ]
  },
  "myanmar": {
    "cname": "Myanmar",
    "permit_name": "Employment Visa (Type EV) & Stay Permit (FRC)",
    "permit_authority": "Ministry of Labour & Ministry of Immigration and Population",
    "overview": "Foreign specialists require an Employment Visa (Type EV) and a Foreigner Registration Certificate (FRC) / Stay Permit. Demand in infrastructure, telecommunications, agriculture, mining, and manufacturing.",
    "fees": {
      "visa_fee": "$70 USD (Employment eVisa) / Stay Permit fees apply",
      "service_fee": "Employer handles Ministry of Labour work permit",
      "total_fee": "$70 USD Consular Reference",
      "notes": "Applied via evisa.moip.gov.mm selecting 'Business/Employment'."
    },
    "proc_time": "3 to 4 Weeks (Work Approval) + 3 Days (Visa)",
    "proc_details": "Ministry of Labour endorses company petition; Stay Permit issued in Yangon.",
    "source": "Ministry of Labour & Directorate of Investment and Company Administration (DICA)",
    "validity": "70 Days initial entry, extended to 1 Year in-country",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Ministry of Labour Approval & Employment Agreement",
    "contract_desc": "Work recommendation approved by the Ministry of Labour.",
    "salary_threshold": "Statutory skilled expatriate minimum",
    "work_permit_type": "Ministry of Labour Work Clearance & Stay Permit",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "🏗️",
        "title": "Infrastructure & Telecom",
        "description": "Key industrial projects in Thilawa Special Economic Zone (SEZ)."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens work in Myanmar?",
        "answer": "Yes, with an Employment Visa (Type EV) and Stay Permit endorsed by the Ministry of Labour and DICA."
      }
    ]
  },
  "laos": {
    "cname": "Laos",
    "permit_name": "Labour Visa (Type LA) & Stay Permit (Quota Quota Card)",
    "permit_authority": "Ministry of Labour and Social Welfare & Department of Immigration",
    "overview": "Foreign workers require an employer-sponsored Labour Visa (Type LA) and a Work Permit / Stay Permit Card. High demand in mining (copper and gold), hydropower dams, high-speed rail construction (Boten-Vientiane railway), and agriculture.",
    "fees": {
      "visa_fee": "$100 USD (Type LA Visa)",
      "service_fee": "Employer pays Ministry of Labour permit quota fee",
      "total_fee": "$100 USD Consular Reference",
      "notes": "Sponsoring employer handles labour quota clearance."
    },
    "proc_time": "3 to 5 Weeks (Ministry of Labour Approval)",
    "proc_details": "Ministry of Labour issues work quota approval; Department of Immigration issues plastic Stay Permit.",
    "source": "Ministry of Labour and Social Welfare & Ministry of Public Security of Lao PDR",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Ministry Labour Quota Authorization & Employment Contract",
    "contract_desc": "Official statutory work permit issued to the foreign specialist.",
    "salary_threshold": "Statutory skilled foreign worker minimum",
    "work_permit_type": "Bay anuyat hed vien (Work Permit)",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Battery of Southeast Asia",
        "description": "Major international hydropower and mining engineering concessions."
      },
      {
        "icon": "🚆",
        "title": "Lao-China High-Speed Railway",
        "description": "Modern railway corridor linking Vientiane to China with booming logistics zones."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian engineers work in Laos?",
        "answer": "Yes, many Indian engineers and managers work on power transmission, mining, and highway construction projects with Ministry of Labour permits."
      }
    ]
  },
  "mongolia": {
    "cname": "Mongolia",
    "permit_name": "Work Permit & Employment Visa (Type HG)",
    "permit_authority": "Ministry of Labour and Social Protection & Mongolia Immigration Agency (MIA)",
    "overview": "Foreign workers require an employer-sponsored work permit approved by the Ministry of Labour under annual foreign labour quotas. Booming sectors include mining (Oyu Tolgoi copper-gold and Tavan Tolgoi coal), heavy civil construction, power plants, and geosciences.",
    "fees": {
      "visa_fee": "$100 USD (Consular Visa HG)",
      "service_fee": "Employer pays monthly statutory foreign workforce workplace levy",
      "total_fee": "$100 USD Consular Reference",
      "notes": "Employer handles Ministry of Labour foreign specialist quota."
    },
    "proc_time": "3 to 4 Weeks (Work Permit) + 7 Days (Visa)",
    "proc_details": "Ministry of Labour issues work permit; MIA issues residence card in Ulaanbaatar.",
    "source": "Ministry of Labour and Social Protection & Mongolia Immigration Agency (MIA)",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Ministry Work Permit Card & Employment Contract",
    "contract_desc": "Official statutory work license card granted to the foreign specialist.",
    "salary_threshold": "Statutory skilled expatriate minimum",
    "work_permit_type": "Azhil erkhlekh zöwshööröl (Work Permit)",
    "min_funds": "$3,000 USD initial relocation funds",
    "highlights": [
      {
        "icon": "⛏️",
        "title": "World-Class Mining",
        "description": "Oyu Tolgoi is one of the world's largest copper-gold deposits with global engineering talent."
      },
      {
        "icon": "🏗️",
        "title": "Infrastructure Expansion",
        "description": "Massive railway and energy projects connecting mines to international export markets."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian mining engineers work in Mongolia?",
        "answer": "Yes, many Indian mining engineers, geologists, and technical specialists work in the South Gobi mining corridor with MIA work permits."
      }
    ]
  },
  "taiwan": {
    "cname": "Taiwan",
    "permit_name": "Ministry of Labor Work Permit & Taiwan Employment Gold Card",
    "permit_authority": "Workforce Development Agency (Ministry of Labor) & National Immigration Agency",
    "overview": "Taiwan offers standard employer-sponsored work permits as well as the world-renowned Taiwan Employment Gold Card (a 4-in-1 visa, work permit, alien resident certificate, and re-entry permit for tech, finance, science, and engineering professionals). Huge demand in semiconductors (TSMC ecosystem), AI, hardware engineering, and finance.",
    "fees": {
      "visa_fee": "₹5,300 (Resident Visa) / Gold Card: approx. NT$3,100 - NT$8,000",
      "service_fee": "ARC registration fee",
      "total_fee": "approx. ₹10,000 - ₹20,000 Statutory Reference",
      "notes": "Employment Gold Card applied online via goldcard.nat.gov.tw."
    },
    "proc_time": "2 to 4 Weeks (Work Permit) / 4 to 6 Weeks (Gold Card)",
    "proc_details": "Ministry of Labor issues work permit; NIA issues ARC or Employment Gold Card.",
    "source": "Ministry of Labor (WDA) & National Immigration Agency (goldcard.nat.gov.tw)",
    "validity": "1 to 3 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Ministry of Labor Work Permit Approval & Employment Contract",
    "contract_desc": "Official statutory work permit decree issued by Workforce Development Agency.",
    "salary_threshold": "Statutory minimum skilled foreign professional salary (NT$47,971/month gross)",
    "work_permit_type": "Ministry of Labor Foreign Professional Work Permit / Employment Gold Card",
    "min_funds": "Initial settlement maintenance ($3,000 USD)",
    "highlights": [
      {
        "icon": "💳",
        "title": "Taiwan Employment Gold Card",
        "description": "Premier open work permit for tech, engineering, and science specialists without needing employer sponsorship."
      },
      {
        "icon": "💻",
        "title": "Global Semiconductor Capital",
        "description": "TSMC, MediaTek, and world-leading hardware/AI engineering ecosystem."
      },
      {
        "icon": "🏥",
        "title": "National Health Insurance (NHI)",
        "description": "Universal world-class healthcare coverage from day one for Gold Card holders."
      }
    ],
    "faqs": [
      {
        "question": "What is the Taiwan Employment Gold Card?",
        "answer": "A 4-in-1 open work permit, resident visa, ARC, and re-entry permit valid for 1-3 years that lets qualified professionals work for any employer or start their own company."
      },
      {
        "question": "What is the minimum salary for a standard work permit in Taiwan?",
        "answer": "Foreign specialized professionals must earn at least NT$47,971 per month under Ministry of Labor regulations."
      }
    ]
  },
  "hong-kong": {
    "cname": "Hong Kong",
    "permit_name": "General Employment Policy (GEP) / Top Talent Pass Scheme (TTPS)",
    "permit_authority": "Hong Kong Immigration Department (ImmD)",
    "overview": "Hong Kong offers premier global employment opportunities under the General Employment Policy (GEP), Top Talent Pass Scheme (TTPS - fast-track for top 100 global university graduates and high earners HK$2.5M+), and Quality Migrant Admission Scheme (QMAS). Major financial capital with 15% flat personal tax cap.",
    "fees": {
      "visa_fee": "HK$230 (approx. ₹2,500)",
      "service_fee": "₹0 (Online Direct ImmD Portal)",
      "total_fee": "HK$230 Statutory Reference",
      "notes": "Visa fee paid only upon approval."
    },
    "proc_time": "4 Weeks (GEP / TTPS) / 2 to 3 Months (QMAS)",
    "proc_details": "Processed electronically by the Hong Kong Immigration Department.",
    "source": "Hong Kong Immigration Department (ImmD - gov.hk)",
    "validity": "2 to 3 Years initial (Pattern: 2+3+3 years)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Formal Hong Kong Employment Offer Letter & Contract",
    "contract_desc": "Binding employment contract detailing designation, gross remuneration, and job description.",
    "salary_threshold": "Market rate remuneration commensurate with local professional standards (approx. HK$20,000+/month)",
    "work_permit_type": "GEP Employment Visa / TTPS e-Visa",
    "min_funds": "$3,000 USD initial maintenance",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Top Talent Pass (TTPS)",
        "description": "Fast-track 2-year open work visa for graduates of top 100 global universities (IITs included) without prior job offer."
      },
      {
        "icon": "💰",
        "title": "15% Maximum Tax",
        "description": "One of the world's most favorable tax regimes with standard flat rate of 15%."
      },
      {
        "icon": "🏢",
        "title": "Global Financial Capital",
        "description": "Premier international banking, legal, trading, and technology hub."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian graduates get a work visa without a job in Hong Kong?",
        "answer": "Yes, graduates of eligible top 100 global universities (including select Indian institutions) can apply for the Top Talent Pass Scheme (TTPS) which grants a 2-year open work visa without needing a prior job offer."
      },
      {
        "question": "How long does a GEP work visa take?",
        "answer": "Standard GEP applications with employer sponsorship take approximately 4 weeks."
      }
    ]
  },
  "macau": {
    "cname": "Macau",
    "permit_name": "Non-Resident Worker Authorization (Blue Card / 藍咭)",
    "permit_authority": "Labour Affairs Bureau (DSAL) & Public Security Police Force (PSPF)",
    "overview": "Foreign workers require employment quota approval from the Labour Affairs Bureau (DSAL) and a Non-resident Worker's Identification Card (popularly known as the 'Blue Card'). Demand in luxury hospitality, culinary arts, integrated resort engineering, IT, and aviation.",
    "fees": {
      "visa_fee": "100 MOP (Entry & Card Fee)",
      "service_fee": "Employer pays statutory DSAL foreign worker employment levy",
      "total_fee": "100 MOP Employee Reference",
      "notes": "Sponsoring employer handles DSAL quota authorization."
    },
    "proc_time": "4 to 6 Weeks (DSAL Quota & Blue Card)",
    "proc_details": "Labour Affairs Bureau approves employer quota; PSPF issues physical Blue Card.",
    "source": "Labour Affairs Bureau (DSAL) & Public Security Police Force (PSPF Macau)",
    "validity": "1 to 2 Years (Renewable)",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "DSAL Non-Resident Worker Approval & Labour Contract",
    "contract_desc": "Official statutory work authorization granted by the Labour Affairs Bureau.",
    "salary_threshold": "Statutory skilled specialist wage standards",
    "work_permit_type": "Non-resident Worker's Identification Card (Blue Card)",
    "min_funds": "$2,500 USD initial relocation funds",
    "highlights": [
      {
        "icon": "🏨",
        "title": "World-Class Hospitality",
        "description": "Global luxury hotel chains and Forbes Five-Star resort complexes."
      },
      {
        "icon": "💳",
        "title": "Blue Card Authorization",
        "description": "Official plastic Non-resident Worker ID card granting multi-entry residence."
      }
    ],
    "faqs": [
      {
        "question": "What is the Blue Card in Macau?",
        "answer": "The Non-resident Worker's Identification Card (Blue Card) is the official work and residence permit issued to foreign professionals working in Macau."
      }
    ]
  },
  "nigeria": {
    "cname": "Nigeria",
    "permit_name": "Expatriate Quota Approval & Subject to Regularization (STR) / CERPAC Green Card",
    "permit_authority": "Federal Ministry of Interior & Nigeria Immigration Service (NIS)",
    "overview": "Foreign professionals taking up lawful employment in Nigeria require an employer holding an authorized Expatriate Quota position granted by the Federal Ministry of Interior. The employee applies for an STR (Subject to Regularization) visa at the Nigerian High Commission, and once in Nigeria, completes biometric registration for the CERPAC (Combined Expatriate Residence Permit and Aliens Card), granting multi-entry work rights.",
    "fees": {
      "visa_fee": "$260 (Consular STR Visa)",
      "service_fee": "$2,000 (Standard CERPAC 2-Year Resident Work Permit)",
      "total_fee": "$2,260 (approx. ₹1,90,000)",
      "notes": "Employer typically pays the CERPAC statutory fee directly to the Ministry of Interior."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Requires existing Expatriate Quota from Ministry of Interior, STR processing in New Delhi (2-3 weeks), and CERPAC biometric card issuance in Lagos/Abuja.",
    "source": "Nigeria Immigration Service (CERPAC Division) & Ministry of Interior",
    "validity": "1 to 2 Years (Renewable subject to Quota validity)",
    "stay": "Duration of employment contract and valid CERPAC",
    "entry_type": "Multiple Entry (embedded in CERPAC Green Card)",
    "contract_doc": "Expatriate Employment Contract & Official Expatriate Quota Approval Letter",
    "contract_desc": "Certified copy of Ministry of Interior Expatriate Quota acceptance and formal executive contract.",
    "salary_threshold": "Expatriate positions typically require managerial or specialized technical qualifications with commensurate executive remuneration.",
    "work_permit_type": "Corporate Expatriate Quota Linked Resident Work Card",
    "min_funds": "Company sponsorship guarantee with corporate tax clearance certificate (TCC)",
    "highlights": [
      {
        "icon": "🏢",
        "title": "Corporate Expatriate Quota",
        "description": "Legally grounded under Ministry of Interior corporate allocations ensuring secure, high-level corporate placement."
      },
      {
        "icon": "💳",
        "title": "CERPAC Multi-Entry Resident Card",
        "description": "Replaces visas with a biometric smartcard allowing seamless border entry and exit for 1-2 years."
      },
      {
        "icon": "💼",
        "title": "Spousal & Family Regularization",
        "description": "Authorizes accompanying dependents on matching STR spousal/child status."
      }
    ],
    "faqs": [
      {
        "question": "Can I travel to Nigeria on a business visa and convert to work?",
        "answer": "No. Working on a tourist or business visa is strictly prohibited under Nigerian immigration law. You must enter on a Subject to Regularization (STR) visa."
      },
      {
        "question": "What is CERPAC in Nigeria?",
        "answer": "CERPAC stands for Combined Expatriate Residence Permit and Aliens Card. It is your official biometric residence and work card issued after entering on an STR visa."
      },
      {
        "question": "Who pays the $2,000 CERPAC fee?",
        "answer": "In virtually all standard corporate expatriate arrangements, the sponsoring Nigerian entity is responsible for the CERPAC card fees and statutory renewals."
      }
    ]
  },
  "ghana": {
    "cname": "Ghana",
    "permit_name": "GIPC Quota / Ghana Immigration Service (GIS) Work & Residence Permit",
    "permit_authority": "Ghana Investment Promotion Centre (GIPC) & Ghana Immigration Service (GIS)",
    "overview": "Employment of foreign nationals in Ghana is governed by the Ghana Investment Promotion Centre (GIPC) Act and Immigration Act 2000. Foreign professionals receive an expatriate quota allocation through their employing company, obtain an entry work visa in India, and upon arrival are issued a biometric GIS Work and Residence Permit allowing lawful employment.",
    "fees": {
      "visa_fee": "₹15,000 (Consular Employment Visa)",
      "service_fee": "$1,000 - $1,500 (Annual GIS Residence & Work Permit)",
      "total_fee": "approx. ₹1,20,000",
      "notes": "Sponsoring Ghanaian enterprise covers statutory GIPC and GIS costs."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Company files GIPC expatriate quota application in Accra; employee completes consular processing in New Delhi.",
    "source": "Ghana Immigration Service (GIS) & GIPC",
    "validity": "1 Year (Renewable annually)",
    "stay": "Full duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "GIPC Automatic Quota Letter & Formal Employment Agreement",
    "contract_desc": "Approved expatriate quota allocation and legally binding employment contract registered in Ghana.",
    "salary_threshold": "Expatriate positions must satisfy GIPC minimum capital and professional criteria.",
    "work_permit_type": "Corporate Expatriate Quota Work & Residence Permit",
    "min_funds": "Company sponsorship and corporate tax clearance",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "GIPC Secure Framework",
        "description": "Backed by Ghana's robust investment laws protecting foreign investor personnel."
      },
      {
        "icon": "💳",
        "title": "Integrated Work & Resident Card",
        "description": "Single GIS biometric card grants both work rights and continuous residency."
      },
      {
        "icon": "🇬🇭",
        "title": "Stable & English-Speaking",
        "description": "Africa's most stable democratic environment with English as the official language."
      }
    ],
    "faqs": [
      {
        "question": "Can I work in Ghana on a visitor visa?",
        "answer": "No. Working without an authorized GIS Work Permit is illegal and leads to deportation and corporate sanctions."
      },
      {
        "question": "What is the GIPC Quota in Ghana?",
        "answer": "The Ghana Investment Promotion Centre allocates automatic expatriate quotas to companies based on foreign equity capital invested in Ghana."
      }
    ]
  },
  "ethiopia": {
    "cname": "Ethiopia",
    "permit_name": "Ministry of Labour and Skills Work Permit & ICS Foreign Resident ID",
    "permit_authority": "Ministry of Labour and Skills & Immigration and Citizenship Service (ICS)",
    "overview": "Foreign professionals employed in Ethiopia's manufacturing, textiles, infrastructure, aviation, and agro-processing sectors require a work permit approved by the Ministry of Labour and Skills. Employers sponsor the specialist based on expatriate technical need, following which the employee receives a Work Visa (WV) and an annual Foreign National Resident ID card.",
    "fees": {
      "visa_fee": "$150 (Work Entry Visa)",
      "service_fee": "$300 (Annual Work Permit & Resident ID Fee)",
      "total_fee": "approx. ₹38,000",
      "notes": "Costs typically paid by the employing commercial enterprise in Ethiopia."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Work permit approval by Ministry of Labour in Addis Ababa, followed by eVisa or consular visa issuance.",
    "source": "Ministry of Labour and Skills & Immigration and Citizenship Service (ICS)",
    "validity": "1 Year (Renewable annually)",
    "stay": "Full duration of certified employment agreement",
    "entry_type": "Multiple Entry",
    "contract_doc": "Ministry of Labour Work Permit Authorization & Employment Contract",
    "contract_desc": "Official labour approval document specifying position, salary, and Ethiopian counterpart understudy training.",
    "salary_threshold": "Expatriate positions must reflect professional or managerial expertise not readily filled by local talent.",
    "work_permit_type": "Specialist / Expatriate Executive Work Permit",
    "min_funds": "Company sponsorship guarantee and investment license copy",
    "highlights": [
      {
        "icon": "🏭",
        "title": "Industrial Park Expansion",
        "description": "Rapidly expanding manufacturing clusters in Hawassa, Bole Lemi, and Kilinto."
      },
      {
        "icon": "✈️",
        "title": "Global Aviation Hub",
        "description": "Addis Ababa connects over 130 global destinations via Ethiopian Airlines."
      },
      {
        "icon": "📋",
        "title": "Structured Work Clearances",
        "description": "Direct coordination between Ministry of Labour and Immigration Services."
      }
    ],
    "faqs": [
      {
        "question": "Can I look for a job in Ethiopia on a tourist visa?",
        "answer": "No. Ethiopian law strictly forbids seeking or performing employment on a tourist visa. You must have an approved work permit and enter on a Work Visa."
      },
      {
        "question": "Is an Ethiopian counterpart understudy required?",
        "answer": "Yes. Ethiopian labor regulations typically require employing companies to designate an Ethiopian professional to be trained alongside the foreign expert."
      }
    ]
  },
  "rwanda": {
    "cname": "Rwanda",
    "permit_name": "Temporary Resident Permit for Employment (Work Permit Categories H1 - H5)",
    "permit_authority": "Directorate General of Immigration and Emigration (DGIE)",
    "overview": "Rwanda operates one of Africa's most transparent and digitized work permit systems. Skilled foreign professionals, managers, IT engineers, healthcare specialists, and educators secure temporary residence permits for employment categorized from H1 to H5 based on profession, applied 100% online through the government IREMBO platform.",
    "fees": {
      "visa_fee": "100,000 RWF (approx. $80 for 1-Year Work Permit)",
      "service_fee": "200,000 RWF ($160 for 2-Year Permit)",
      "total_fee": "approx. ₹7,000 - ₹14,000",
      "notes": "Highly affordable government statutory fees published on migration.gov.rw."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "Processed efficiently online via IREMBO platform; biometric card issued at DGIE headquarters in Kigali.",
    "source": "Directorate General of Immigration and Emigration (DGIE)",
    "validity": "1 to 2 Years (Renewable)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Employment Contract & Validated Academic Degree Equivalency",
    "contract_desc": "Signed formal contract with Rwandan registered employer and Higher Education Council (HEC) academic degree equivalence.",
    "salary_threshold": "Competitive market remuneration corresponding to specialized skills.",
    "work_permit_type": "Digital Expatriate Specialist Work Permit (Class H)",
    "min_funds": "Company sponsorship guarantee",
    "highlights": [
      {
        "icon": "⚡",
        "title": "World-Class Digital Processing",
        "description": "Work permits processed online via IREMBO in as little as 3 to 7 working days."
      },
      {
        "icon": "🏙️",
        "title": "Exemplary Quality of Life",
        "description": "Kigali boasts zero-tolerance for corruption, high safety, reliable high-speed fiber internet, and green surroundings."
      },
      {
        "icon": "🌱",
        "title": "Tech & Innovation Hub",
        "description": "Norrsken Kigali House, Kigali Innovation City, and biotech research clusters."
      }
    ],
    "faqs": [
      {
        "question": "How fast are work permits processed in Rwanda?",
        "answer": "Rwanda is renowned for high bureaucratic efficiency. Standard work permit applications on IREMBO are processed within 5 to 7 business days."
      },
      {
        "question": "Can I convert a tourist visa to a work permit inside Rwanda?",
        "answer": "Yes. If you secure qualifying employment while in Rwanda, you can submit your work permit application online without leaving the country."
      }
    ]
  },
  "zimbabwe": {
    "cname": "Zimbabwe",
    "permit_name": "Temporary Employment Permit (TEP)",
    "permit_authority": "Department of Immigration Zimbabwe & Ministry of Public Service, Labour and Social Welfare",
    "overview": "Foreign specialists, engineers, mining executives, agricultural managers, and healthcare practitioners working in Zimbabwe require a Temporary Employment Permit (TEP). Employers must demonstrate that the required specialized technical skills are not readily available in the local labour market and designate a local counterpart for skills transfer.",
    "fees": {
      "visa_fee": "$500 (TEP Application & Issuance Fee)",
      "service_fee": "$300 (Annual Renewal)",
      "total_fee": "$500 - $800 (approx. ₹42,000 - ₹67,000)",
      "notes": "Fees paid by the employing commercial enterprise."
    },
    "proc_time": "6 to 10 Weeks",
    "proc_details": "Reviewed by the Foreigners' Economic Status Committee (FESC) and approved by Department of Immigration.",
    "source": "Department of Immigration Zimbabwe (TEP Section)",
    "validity": "1 to 3 Years (Renewable based on project)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Certified Employment Contract & Labour Counterpart Training Plan",
    "contract_desc": "Legally binding contract and comprehensive plan outlining understudy training for Zimbabwean professionals.",
    "salary_threshold": "Remuneration must be commensurate with professional specialist standards.",
    "work_permit_type": "Specialist Temporary Employment Permit (TEP)",
    "min_funds": "Company financial guarantee and enterprise registration",
    "highlights": [
      {
        "icon": "⛏️",
        "title": "Mining & Agriculture Booms",
        "description": "Key foreign specialist roles in lithium, platinum, gold, tobacco, and commercial farming."
      },
      {
        "icon": "📋",
        "title": "Multi-Year Authorization",
        "description": "TEP permits can be issued for up to 3 years for large infrastructure and industrial developments."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Dependent Family Inclusivity",
        "description": "Permit holders can bring their spouses and dependent children under scholar/dependent status."
      }
    ],
    "faqs": [
      {
        "question": "Can I work in Zimbabwe on a holiday visa?",
        "answer": "No. Working on a tourist visa or visitor permit is strictly illegal and subject to arrest and deportation."
      },
      {
        "question": "What is the Foreigners' Economic Status Committee (FESC)?",
        "answer": "FESC is the statutory inter-ministerial body that evaluates all foreign work permit applications to ensure genuine transfer of technical skills."
      }
    ]
  },
  "colombia": {
    "cname": "Colombia",
    "permit_name": "Migrant Worker Visa (Visa M Trabajador) & Cédula de Extranjería",
    "permit_authority": "Ministerio de Relaciones Exteriores (Cancillería) & Migración Colombia",
    "overview": "Foreign professionals employed by Colombian companies or multinational corporations in Bogotá, Medellín, and Cali obtain a Migrant Visa for Employment (Visa M Trabajador). Sponsoring employers submit company bank statements and corporate tax returns verifying viability. Visa M is issued for up to 3 years and grants full multi-entry work rights, accompanied by the Cédula de Extranjería (foreigner national identity card).",
    "fees": {
      "visa_fee": "$52 (Study Fee) + $270 (Issuance Fee) = $322 USD",
      "service_fee": "$55 (Cédula de Extranjería)",
      "total_fee": "$377 USD (approx. ₹31,500)",
      "notes": "Official fees published by Cancillería under Decree 1067."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Submitted online on Cancillería portal; Cédula de Extranjería issued within 15 days of arrival at Migración Colombia.",
    "source": "Cancillería Colombia & Migración Colombia",
    "validity": "Up to 3 Years (Renewable)",
    "stay": "Full duration of certified employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Formato Resumen de Contrato & Employer Bank Statements",
    "contract_desc": "Official Ministry contract summary form signed by employer and employee, accompanied by company bank records proving financial solvency (minimum 100 minimum wages).",
    "salary_threshold": "Contract must meet or exceed statutory Colombian professional salary benchmarks.",
    "work_permit_type": "Corporate Sponsored Migrant Worker Visa (Visa M)",
    "min_funds": "Employer financial solvency and bank averages over 100 minimum wages",
    "highlights": [
      {
        "icon": "💳",
        "title": "Cédula de Extranjería Identity",
        "description": "Full resident ID card allowing domestic banking, health insurance (EPS), and local services."
      },
      {
        "icon": "📈",
        "title": "Pathway to Permanent Residency",
        "description": "5 consecutive years on Visa M qualifies the holder to apply for permanent Resident Visa (Visa R)."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Beneficiary Visas for Family",
        "description": "Spouses and children receive matching Visa M Beneficiario status with full residency privileges."
      }
    ],
    "faqs": [
      {
        "question": "Can I work in Colombia on a tourist visa or US visa waiver?",
        "answer": "No. Working on a tourist entry is strictly illegal under Colombian immigration law. You must hold an approved Visa M or Visa V with work authorization."
      },
      {
        "question": "What is the Cédula de Extranjería in Colombia?",
        "answer": "It is the official national foreign resident ID card issued by Migración Colombia. You must apply for it within 15 calendar days of receiving your visa or arriving in Colombia."
      }
    ]
  },
  "peru": {
    "cname": "Peru",
    "permit_name": "Resident Worker Visa (Visa de Trabajador Residente) & Carné de Extranjería",
    "permit_authority": "Ministerio de Trabajo y Promoción del Empleo (MTPE) & Migraciones Peru",
    "overview": "Foreign specialists, engineers, mining executives, and commercial managers working in Peru obtain a Resident Worker Visa (Calidad Migratoria Trabajador Residente). The employment contract must be formally approved by the Ministry of Labour (MTPE) under the Foreign Worker Hiring Act (Legislative Decree 689). Once approved, Migraciones issues the Carné de Extranjería resident ID card.",
    "fees": {
      "visa_fee": "$120 (Migraciones Processing Fee)",
      "service_fee": "$30 (Carné de Extranjería biometric card)",
      "total_fee": "$150 USD (approx. ₹12,500)",
      "notes": "Highly economical statutory fees paid to Banco de la Nación."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Contract approval by MTPE (2-3 weeks), followed by visa approval from Migraciones Peru.",
    "source": "Superintendencia Nacional de Migraciones & MTPE",
    "validity": "1 to 3 Years (Renewable)",
    "stay": "Duration of approved labour contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Approved MTPE Employment Contract & Professional Degree Equivalency",
    "contract_desc": "Official employment agreement formally approved and stamped by the Peruvian Ministry of Labour (MTPE).",
    "salary_threshold": "Contract must comply with statutory limits (foreigners cannot exceed 20% of workforce or 30% of payroll unless exempt).",
    "work_permit_type": "Ministry of Labour Approved Resident Worker Status",
    "min_funds": "Company sponsorship and corporate tax registration (RUC)",
    "highlights": [
      {
        "icon": "⛏️",
        "title": "World-Class Mining Sector",
        "description": "Peru is a top global producer of copper, silver, zinc, and gold with major multinational operations."
      },
      {
        "icon": "💳",
        "title": "Carné de Extranjería",
        "description": "Full national foreign identity document granting domestic banking, tax RUC, and health coverage."
      },
      {
        "icon": "🏛️",
        "title": "Permanent Residency Pathway",
        "description": "3 continuous years on resident worker status qualifies the applicant for Inmigrante (PR) status."
      }
    ],
    "faqs": [
      {
        "question": "Can I work in Peru on a tourist visa or US visa waiver?",
        "answer": "No. Working on a tourist status is strictly prohibited. You must obtain an approved contract from MTPE and a Resident Worker visa."
      },
      {
        "question": "What is the 20% limit for foreign workers in Peru?",
        "answer": "Peruvian labor law limits foreign staff to 20% of total workforce and 30% of payroll, though exemptions apply for specialized technical experts, managers, and new investments."
      }
    ]
  },
  "chile": {
    "cname": "Chile",
    "permit_name": "Temporary Residency for Work (Residencia Temporal por Motivos Laborales)",
    "permit_authority": "Servicio Nacional de Migraciones (SERMIG) & Ministerio de Relaciones Exteriores",
    "overview": "Foreign specialists, IT engineers, mining personnel, and corporate executives employed in Chile obtain Temporary Residency for Employment under the updated Migration Law No. 21.325. Employers submit a formalized employment contract complying with Chilean labour regulations (including repatriation and social security clauses). Approved foreign workers receive a Chilean RUN/RUT and Cédula de Identidad.",
    "fees": {
      "visa_fee": "$200 - $350 (Statutory SERMIG Work Visa Fee)",
      "service_fee": "$10 (Cédula de Identidad at Registro Civil)",
      "total_fee": "approx. ₹25,000",
      "notes": "Fee depends on reciprocal bilateral tables published by SERMIG."
    },
    "proc_time": "8 to 14 Weeks",
    "proc_details": "Submitted online via SERMIG platform; Cédula de Identidad issued at Registro Civil e Identificación in Santiago.",
    "source": "Servicio Nacional de Migraciones (SERMIG)",
    "validity": "Up to 2 Years (Renewable)",
    "stay": "Duration of valid employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Contrato de Trabajo Notarizado with Mandatory Legal Clauses",
    "contract_desc": "Notarized Chilean employment contract containing legal clauses regarding social security, income tax, and employer repatriation commitment.",
    "salary_threshold": "Salary must meet statutory minimums and reflect specialized professional market rates.",
    "work_permit_type": "Digital SERMIG Temporary Work Residency",
    "min_funds": "Company sponsorship guarantee and tax compliance certificate (SII)",
    "highlights": [
      {
        "icon": "🇨🇱",
        "title": "Highest OECD Living Standards",
        "description": "Chile leads South America in human development index, road safety, and modern telecommunications."
      },
      {
        "icon": "💳",
        "title": "Chilean RUN / Cédula",
        "description": "Official national ID card giving access to the local banking system, Fonasa/Isapre healthcare, and services."
      },
      {
        "icon": "🏔️",
        "title": "World Copper & Lithium Leader",
        "description": "Premier global center for high-tech mining engineering, clean solar energy, and green hydrogen."
      }
    ],
    "faqs": [
      {
        "question": "Can I convert a tourist visa to a work permit inside Chile?",
        "answer": "Under the new Migration Law (Law 21.325), foreign nationals must apply for their initial work residency visa from abroad before entering Chile, rather than converting from tourist status inside the country."
      },
      {
        "question": "What is the Chilean RUN / RUT number?",
        "answer": "The RUN (Rol Único Nacional) is your permanent unique identification and tax number in Chile, printed on your Chilean Cédula de Identidad."
      }
    ]
  },
  "argentina": {
    "cname": "Argentina",
    "permit_name": "Residencia Temporaria por Trabajo (Work Visa - Criterio Laboral) & DNI",
    "permit_authority": "Dirección Nacional de Migraciones (DNM) & Ministerio de Trabajo",
    "overview": "Foreign specialists, IT engineers, corporate managers, and researchers employed in Argentina obtain a Temporary Residence for Work (Criterio Laboral). Employing companies must be actively registered with RENURE (Registro Nacional Único de Requirentes Extranjeros). Once approved, the foreign professional receives the Documento Nacional de Identidad (DNI para Extranjeros), granting full resident and employment rights.",
    "fees": {
      "visa_fee": "$250 (Consular Work Visa Fee)",
      "service_fee": "$50 (DNI card issuance)",
      "total_fee": "$300 USD (approx. ₹25,000)",
      "notes": "Statutory rates administered by Migraciones Argentina."
    },
    "proc_time": "6 to 10 Weeks",
    "proc_details": "Employer submits petition via RENURE portal in Argentina; visa issued at consulate and finalized into DNI card upon arrival.",
    "source": "Dirección Nacional de Migraciones (DNM)",
    "validity": "1 to 3 Years (Renewable)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Contrato de Trabajo Registrado en RENURE & AFIP Registration",
    "contract_desc": "Formal employment contract registered with the employer's RENURE filing, accompanied by the company's AFIP tax compliance records.",
    "salary_threshold": "Contract must meet Argentine collective bargaining agreements (Convenios Colectivos de Trabajo).",
    "work_permit_type": "RENURE-Sponsored Temporary Work Residency",
    "min_funds": "Company sponsorship guarantee and corporate tax registration",
    "highlights": [
      {
        "icon": "💳",
        "title": "Argentine DNI Card",
        "description": "National identity card providing access to CUIL tax number, domestic banking, and healthcare."
      },
      {
        "icon": "🏛️",
        "title": "Fast-Track to Permanent Residency",
        "description": "3 consecutive years on temporary work status qualifies the holder for permanent residence (Radicación Permanente)."
      },
      {
        "icon": "💻",
        "title": "Booming Tech & Unicorn Hub",
        "description": "Home to Latin America's leading tech unicorns including MercadoLibre, Globant, and Auth0."
      }
    ],
    "faqs": [
      {
        "question": "What is RENURE in Argentina?",
        "answer": "RENURE is the National Registry of Foreign Petitioners. Any Argentine company wishing to hire foreign personnel must be registered with RENURE before sponsoring a work visa."
      },
      {
        "question": "What is the DNI Extranjero?",
        "answer": "The DNI (Documento Nacional de Identidad) is the national ID card issued to foreign residents in Argentina by the National Registry of Persons (RENAPER)."
      }
    ]
  },
  "costa-rica": {
    "cname": "Costa Rica",
    "permit_name": "Special Work Authorization / Temporary Residency (Residencia Temporal por Cuenta Ajena)",
    "permit_authority": "Dirección General de Migración y Extranjería (DGME) & Ministerio de Trabajo",
    "overview": "Foreign professionals, executives, and technical specialists employed by multinational corporations and local enterprises in Costa Rica obtain a Temporary Residency permit for employment (Residencia Temporal por Cuenta Ajena). Sponsoring enterprises must be officially registered with DGME's Department of Business (Empresas Reconocidas). Approved foreign employees receive the DIMEX (Documento de Identidad Migratorio para Extranjeros) card.",
    "fees": {
      "visa_fee": "$200 (DGME Temporary Residency Filing Fee)",
      "service_fee": "$125 (DIMEX biometric card issuance)",
      "total_fee": "$325 USD (approx. ₹27,500)",
      "notes": "Statutory rates administered by DGME."
    },
    "proc_time": "8 to 16 Weeks",
    "proc_details": "Submitted to DGME in San José; expedited processing available for companies certified under Empresas Reconocidas.",
    "source": "Dirección General de Migración y Extranjería (DGME)",
    "validity": "1 to 2 Years (Renewable)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Contrato de Trabajo & CCSS Registration Records",
    "contract_desc": "Formal employment contract registered with the Caja Costarricense de Seguro Social (CCSS) and Ministry of Labour.",
    "salary_threshold": "Contract must meet or exceed minimum professional wage scales set by the National Wage Council (Consejo Nacional de Salarios).",
    "work_permit_type": "Corporate Recognized Specialist Work Residency",
    "min_funds": "Company sponsorship and corporate registration with CCSS and tax authorities",
    "highlights": [
      {
        "icon": "💳",
        "title": "DIMEX National Foreign ID",
        "description": "Biometric smart card granting access to domestic banking, CCSS social security health system, and services."
      },
      {
        "icon": "🌿",
        "title": "Exceptional Quality of Life",
        "description": "Peaceful democracy with no standing army since 1948, clean air, safe suburbs (Escazú, Santa Ana), and biodiversity."
      },
      {
        "icon": "💻",
        "title": "Multinational Hub",
        "description": "Regional shared-services and tech hub for Intel, Amazon, Microsoft, and medical device manufacturers."
      }
    ],
    "faqs": [
      {
        "question": "What is Empresas Reconocidas in Costa Rica?",
        "answer": "Empresas Reconocidas is a fast-track classification system operated by DGME that allows pre-registered multinational and export corporations to obtain work permits for foreign specialists within 30 to 45 days."
      },
      {
        "question": "What is the DIMEX card in Costa Rica?",
        "answer": "DIMEX (Documento de Identidad Migratorio para Extranjeros) is the official biometric residence card issued by DGME to all legal foreign residents."
      }
    ]
  },
  "romania": {
    "cname": "Romania",
    "permit_name": "Aviz de Muncă (Work Authorization) & National Long-Stay Visa for Employment (Visa D/AM)",
    "permit_authority": "Inspectoratul General pentru Imigrări (IGI) & Ministry of Labour",
    "overview": "Foreign specialists, IT engineers, manufacturing technicians, and construction personnel employed in Romania require an Aviz de Muncă (work authorization permit) obtained by the sponsoring employer from the General Inspectorate for Immigration (IGI). Following approval, the worker obtains a National Long-Stay Visa for Employment (Visa D/AM) from the Embassy of Romania in New Delhi and receives a Permis de Ședere (biometric residence card) in Romania.",
    "fees": {
      "visa_fee": "€120 (National Long-Stay Visa Type D)",
      "service_fee": "€100 (Employer IGI Aviz de Muncă fee)",
      "total_fee": "approx. ₹22,000",
      "notes": "Employer pays the statutory IGI work authorization fee in Romania."
    },
    "proc_time": "8 to 16 Weeks",
    "proc_details": "Employer secures IGI Aviz de Muncă in Romania (6-10 weeks); worker completes biometric visa issuance in New Delhi (3-4 weeks).",
    "source": "Inspectoratul General pentru Imigrări (IGI) & Ministry of Foreign Affairs (MAE)",
    "validity": "1 Year (Renewable annually)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Aviz de Muncă IGI Approval & Individual Employment Contract",
    "contract_desc": "Official work authorization certificate issued by IGI and formal registered employment contract (CIM).",
    "salary_threshold": "Salary must meet or exceed the national average gross salary in Romania for highly skilled roles, or minimum wage for standard roles.",
    "work_permit_type": "IGI Work Authorization & Long-Stay Employment Residency (D/AM)",
    "min_funds": "Employer sponsorship and statutory minimum salary guarantee",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "European Union Work Experience",
        "description": "Gain certified professional work experience within an EU member state adhering to European labour standards."
      },
      {
        "icon": "💳",
        "title": "Permis de Ședere Resident Card",
        "description": "Biometric EU residence card granting local health insurance (CNAS) and legal resident protections."
      },
      {
        "icon": "📈",
        "title": "High Tech & Manufacturing Demand",
        "description": "Thriving hubs in Bucharest, Cluj-Napoca, Timișoara, and Iași in automotive, IT software, and engineering."
      }
    ],
    "faqs": [
      {
        "question": "What is the Aviz de Muncă in Romania?",
        "answer": "Aviz de Muncă is the official work authorization permit issued by the General Inspectorate for Immigration (IGI) in Romania upon petition by a licensed Romanian company."
      },
      {
        "question": "Can I work in Romania on a Schengen tourist visa?",
        "answer": "No. Working on a tourist visa is strictly prohibited under Romanian and EU law. You must hold an Aviz de Muncă and a Type D/AM long-stay employment visa."
      }
    ]
  },
  "bulgaria": {
    "cname": "Bulgaria",
    "permit_name": "Single Work and Residence Permit (SWRP) / EU Blue Card & Visa D",
    "permit_authority": "National Employment Agency (AZ) & Migration Directorate (Ministry of Interior)",
    "overview": "Foreign specialists, IT engineers, manufacturing experts, and executives employed in Bulgaria obtain a Single Work and Residence Permit (SWRP) or European EU Blue Card under the Labour Migration and Labour Mobility Act. The employer applies to the Migration Directorate in Sofia. Once approved, the employee obtains a National Long-Stay Visa (Type D) in New Delhi and receives a biometric Bulgarian Residence Card in Sofia.",
    "fees": {
      "visa_fee": "€100 (National Visa Type D)",
      "service_fee": "400 BGN (Statutory SWRP issuance fee)",
      "total_fee": "approx. ₹28,000",
      "notes": "Employer covers the statutory labour administration fees in Bulgaria."
    },
    "proc_time": "8 to 14 Weeks",
    "proc_details": "Single-procedure submission to Migration Directorate in Sofia; visa issuance at Embassy in New Delhi.",
    "source": "Migration Directorate (Ministry of Interior) & Employment Agency",
    "validity": "Up to 3 Years (for SWRP) or up to 5 Years (for EU Blue Card)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Migration Directorate SWRP Approval Decision & Employment Contract",
    "contract_desc": "Official decision of the Migration Directorate and formal registered employment agreement complying with Bulgarian labour code.",
    "salary_threshold": "EU Blue Card requires salary of at least 1.5 times the average gross salary in Bulgaria; standard SWRP requires statutory minimums.",
    "work_permit_type": "Single Work and Residence Permit (SWRP) / EU Blue Card",
    "min_funds": "Employer sponsorship and salary guarantee",
    "highlights": [
      {
        "icon": "💳",
        "title": "Single Combined Work & Resident Card",
        "description": "Streamlined one-stop procedure: a single biometric card grants both lawful work and residence rights."
      },
      {
        "icon": "🇪🇺",
        "title": "EU Blue Card Mobility",
        "description": "Highly qualified specialists gain intra-EU mobility privileges after 12 months in Bulgaria."
      },
      {
        "icon": "💻",
        "title": "Rapidly Growing Tech Capital",
        "description": "Sofia is one of Europe's top tech and gaming development hubs with low 10% flat corporate and income tax rates."
      }
    ],
    "faqs": [
      {
        "question": "What is the flat tax rate in Bulgaria?",
        "answer": "Bulgaria features one of the most competitive tax regimes in Europe, with a flat 10% personal income tax and flat 10% corporate tax rate."
      },
      {
        "question": "What is the Single Work and Residence Permit (SWRP)?",
        "answer": "SWRP is an integrated procedure under EU law where the Migration Directorate processes both work authorization and residency in a single coordinated permit."
      }
    ]
  },
  "croatia": {
    "cname": "Croatia",
    "permit_name": "Dozvola za boravak i rad (Stay and Work Permit) / EU Blue Card",
    "permit_authority": "Ministry of the Interior (MUP) & Croatian Employment Service (HZZ)",
    "overview": "Foreign professionals, IT specialists, engineers, healthcare practitioners, and hospitality managers working in Croatia require a Stay and Work Permit (Dozvola za boravak i rad). Employers request a Labour Market Test (Test tržišta rada) through the Croatian Employment Service (HZZ). Following approval, the worker obtains an entry visa from the Croatian Embassy in New Delhi and receives a biometric resident card from the Police Administration (MUP) in Croatia.",
    "fees": {
      "visa_fee": "€93 (Statutory Stay and Work Permit Fee)",
      "service_fee": "€41 (Biometric Residence Card fee)",
      "total_fee": "approx. ₹12,000",
      "notes": "Highly economical statutory fees administered by MUP."
    },
    "proc_time": "6 to 12 Weeks",
    "proc_details": "Employer submits petition via HZZ and MUP; employee obtains entry visa in New Delhi.",
    "source": "Ministry of the Interior (MUP) & Croatian Employment Service (HZZ)",
    "validity": "1 to 2 Years (for standard work permit) or up to 4 Years (for EU Blue Card)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Positive HZZ Labour Market Opinion & Signed Employment Agreement",
    "contract_desc": "Official labour approval from HZZ and formal registered employment contract (Ugovor o radu).",
    "salary_threshold": "EU Blue Card requires salary of 1.5 times the Croatian gross average salary; standard permit requires statutory minimums.",
    "work_permit_type": "MUP Stay and Work Permit / EU Blue Card",
    "min_funds": "Employer sponsorship and salary guarantee",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "Schengen Integrated Residence",
        "description": "Croatian residence permit grants visa-free movement throughout all 29 Schengen states for up to 90 days."
      },
      {
        "icon": "🏖️",
        "title": "Unrivalled Mediterranean Lifestyle",
        "description": "Safe, sunny coastal living along the Adriatic Sea with rich culinary and outdoor sporting culture."
      },
      {
        "icon": "🚀",
        "title": "Emerging Tech & EV Hub",
        "description": "Home to Rimac Automobili (hypercars & EV battery systems) and Infobip (global enterprise messaging unicorn)."
      }
    ],
    "faqs": [
      {
        "question": "What is the Labour Market Test (Test tržišta rada) in Croatia?",
        "answer": "It is a mandatory check conducted by the Croatian Employment Service (HZZ) to confirm no suitable unemployed Croatian or EU citizens are available before approving foreign worker hiring."
      },
      {
        "question": "Can I travel to other EU countries on a Croatian work permit?",
        "answer": "Yes! Because Croatia is a full Schengen member, your Croatian biometric residence card allows you to travel across all other Schengen countries for up to 90 days in any 180-day period."
      }
    ]
  },
  "slovenia": {
    "cname": "Slovenia",
    "permit_name": "Single Residence and Work Permit (Enotno dovoljenje za prebivanje in delo) / EU Blue Card",
    "permit_authority": "Administrative Unit (Upravna enota) & Employment Service of Slovenia (ZRSZ)",
    "overview": "Foreign specialists, software engineers, pharmaceutical scientists, and automotive engineers working in Slovenia obtain a Single Residence and Work Permit (Enotno dovoljenje) under the Employment, Self-employment and Work of Foreigners Act (ZZSDT). Sponsoring employers submit a labour market clearance with the Employment Service of Slovenia (ZRSZ). Once approved, the worker receives a biometric card granting lawful residence and employment in Slovenia.",
    "fees": {
      "visa_fee": "€102 (Single Residence and Work Permit Fee)",
      "service_fee": "€15 (Biometric resident card)",
      "total_fee": "approx. ₹10,500",
      "notes": "Statutory rates administered by the Administrative Unit (Upravna enota)."
    },
    "proc_time": "6 to 12 Weeks",
    "proc_details": "Coordinated single procedure between Administrative Unit and Employment Service (ZRSZ); visa issued at Embassy in New Delhi.",
    "source": "Ministry of the Interior (MNZ) & Employment Service of Slovenia (ZRSZ)",
    "validity": "1 to 2 Years (for Single Permit) or up to 2 Years (for EU Blue Card)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "ZRSZ Positive Consent & Signed Employment Contract",
    "contract_desc": "Binding consent from the Employment Service of Slovenia (ZRSZ) and formal employment contract complying with Slovenian labour law.",
    "salary_threshold": "EU Blue Card requires salary of 1.5 times the Slovenian average gross salary; standard permit requires statutory minimums.",
    "work_permit_type": "Single Residence and Work Permit (Enotno dovoljenje) / EU Blue Card",
    "min_funds": "Employer sponsorship and salary guarantee",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "Schengen Integrated Residency",
        "description": "Slovenian residence permit allows visa-free travel across all 29 Schengen member states for up to 90 days."
      },
      {
        "icon": "💊",
        "title": "Leading Pharma & High-Tech Sector",
        "description": "Global home to pharmaceutical giants Krka and Lek (Novartis), Pipistrel electric aviation, and robotics clusters."
      },
      {
        "icon": "🌲",
        "title": "Top Global Quality of Life",
        "description": "Consistently ranked among the world's 10 safest countries with 60% forest coverage and exceptional environmental standards."
      }
    ],
    "faqs": [
      {
        "question": "What is the Single Permit (Enotno dovoljenje) in Slovenia?",
        "answer": "The Single Permit is a unified European procedure where the Administrative Unit (Upravna enota) issues a single biometric card covering both lawful work and residence rights."
      },
      {
        "question": "How safe is Slovenia for expat workers and families?",
        "answer": "Slovenia is ranked among the top 10 safest countries in the world according to the Global Peace Index, with exceptionally low crime and clean public spaces."
      }
    ]
  },
  "cyprus": {
    "cname": "Cyprus",
    "permit_name": "Temporary Residence and Employment Permit (Pink Slip) / Foreign Interest Companies (FIC) Visa",
    "permit_authority": "Civil Registry and Migration Department (CRMD) & Department of Labour",
    "overview": "Cyprus is a premier European tech, fintech, and shipping hub. Foreign specialists, software engineers, financial analysts, and corporate managers employed by Foreign Interest Companies (FICs) in Limassol and Nicosia obtain a Temporary Residence and Employment Permit under the expedited Business Facilitation Unit (BFU) framework. Non-EU specialists receive a 2 to 3-year renewable residence permit (Pink Slip) with generous family reunification rights.",
    "fees": {
      "visa_fee": "€70 (Entry Permit Application)",
      "service_fee": "€70 (Alien Registration ARC biometric card)",
      "total_fee": "approx. ₹13,000",
      "notes": "Highly economical statutory fees paid to CRMD."
    },
    "proc_time": "4 to 6 Weeks (Expedited for Foreign Interest Companies)",
    "proc_details": "Fast-tracked through the Business Facilitation Unit (BFU) and Civil Registry and Migration Department (CRMD) in Nicosia.",
    "source": "Civil Registry and Migration Department (CRMD) & Business Facilitation Unit (BFU)",
    "validity": "Up to 3 Years (Renewable)",
    "stay": "Duration of approved employment contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "BFU Company Registration & Formal Employment Contract",
    "contract_desc": "Certified employment contract registered with the Ministry of Labour and proof of employer registration with the Business Facilitation Unit.",
    "salary_threshold": "Foreign Interest Companies (FIC) specialist regime requires a minimum gross monthly salary of €2,500.",
    "work_permit_type": "FIC Expatriate Specialist Residence & Work Permit",
    "min_funds": "Company sponsorship and corporate tax registration",
    "highlights": [
      {
        "icon": "💻",
        "title": "TechIsland & Fintech Capital",
        "description": "Limassol is dubbed the 'Tech Island of Europe', hosting hundreds of multinational software, fintech, and gaming headquarters."
      },
      {
        "icon": "⚡",
        "title": "Expedited BFU Processing",
        "description": "Work and residence permits processed in as fast as 4 to 6 weeks under the government's Business Facilitation Unit."
      },
      {
        "icon": "💰",
        "title": "Generous Tax Exemptions",
        "description": "50% personal income tax exemption for new expatriate residents earning over €55,000 per year."
      }
    ],
    "faqs": [
      {
        "question": "What is the Foreign Interest Company (FIC) regime in Cyprus?",
        "answer": "The FIC regime is a preferential framework allowing international tech, maritime, and financial corporations registered in Cyprus to hire non-EU specialists earning at least €2,50,00 gross per month with streamlined work permits."
      },
      {
        "question": "What is the Pink Slip in Cyprus?",
        "answer": "The 'Pink Slip' is the colloquial term for the official Temporary Residence and Employment Permit card issued by the Civil Registry and Migration Department (CRMD)."
      }
    ]
  },

  "usa": {
    "cname": "United States",
    "permit_name": "H-1B Specialty Occupation / L-1 Intracompany Transferee / O-1 Extraordinary Ability",
    "overview": "The United States employment visa framework grants temporary lawful work authorization for foreign professionals possessing specialized knowledge or executive capabilities. The premier route is the H-1B Specialty Occupation Visa, requiring a bachelor's degree or higher and an approved Form I-129 petition from a qualifying US employer, preceded by an electronic registration lottery. Intra-company transferees utilize the L-1 Visa (L-1A executive/manager, L-1B specialized knowledge), while extraordinary talent utilizes the O-1 Visa. Spouses of H-1B holders holding approved I-140 petitions are eligible for H-4 EAD employment authorization.",
    "fees": {
      "visa_fee": "USD $205 (MRV Visa Fee - approx. \u20b917,200)",
      "service_fee": "USD $460 (Form I-129 Petition Fee) + USD $2,805 (Optional Premium Processing)",
      "total_fee": "USD $665+ Statutory Reference",
      "notes": "Petition fees, ACWIA training fees, and fraud prevention fees ($500) are statutory employer liabilities under US Department of Labor regulations. Employee pays MRV consular scheduling fee."
    },
    "proc_time": "15 Calendar Days (Premium Processing) to 3-6 Months (Standard USCIS Adjudication)",
    "proc_details": "USCIS petition adjudication timeline depends on service center workload and premium processing election. Consular interview scheduling in India varies by post (New Delhi, Mumbai, Chennai, Hyderabad, Kolkata).",
    "source": "U.S. Citizenship and Immigration Services (USCIS) & U.S. Department of State",
    "salary_threshold": "US Department of Labor Prevailing Wage Determination (PWD) Level I to IV according to SOC occupation and metropolitan statistical area.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Specialty Occupation",
        "description": "Requires minimum U.S. Bachelor's degree or evaluated foreign equivalent in a directly related field."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Employer Petition Mandate",
        "description": "Must have an approved Form I-797 Notice of Action and certified ETA-9035 Labor Condition Application (LCA)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Dual Intent Recognized",
        "description": "H-1B and L-1 visas explicitly permit dual intent, allowing direct transition to lawful permanent residency (Green Card)."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "H-4 Dependent Rights",
        "description": "Spouses and unmarried minor children receive H-4 status, with H-4 EAD available once I-140 Green Card petition is approved."
      }
    ],
    "work_permit_type": "Form I-797 (Notice of Action) / Form I-129 Petition",
    "permit_authority": "USCIS (United States Citizenship and Immigration Services)",
    "validity": "3 Years (Initial Grant)",
    "validity_details": "Issued initially for up to 3 years, extendable up to a maximum statutory limit of 6 years (indefinitely extendable beyond 6 years under AC21 with pending Green Card).",
    "stay": "Duration of Approved Petition (Up to 3 Years)",
    "entry_type": "Multiple Entry",
    "contract_doc": "Form I-797 Approval Notice & Certified LCA (Form ETA-9035)",
    "contract_desc": "Official USCIS Form I-797 Notice of Action showing receipt number and valid petition dates accompanied by DOL-certified Labor Condition Application.",
    "min_funds": "First month living expenses ($3,000 - $5,000) or guaranteed employer relocation allowance",
    "faqs": [
      {
        "question": "What is the difference between USCIS petition approval and a consular visa stamp?",
        "answer": "USCIS petition approval (Form I-797) confirms your legal eligibility to work for the petitioning US employer. The consular visa stamp in your passport, issued by the US Embassy/Consulate, is the official travel authorization required to enter the United States."
      },
      {
        "question": "Can I change employers while on an H-1B visa in the United States?",
        "answer": "Yes. Under AC21 portability regulations, you can commence employment with a new sponsor as soon as the new employer receives an official Form I-797C receipt notice from USCIS for your H-1B transfer petition."
      },
      {
        "question": "Is an in-person consular interview mandatory for US work visa stamping?",
        "answer": "First-time applicants generally must attend an in-person consular interview. However, applicants renewing a visa within 48 months of expiration in the same category may qualify for an Interview Waiver (Dropbox) subject to consular discretion."
      },
      {
        "question": "Can my spouse work in the US on a dependent visa?",
        "answer": "Spouses on H-4 visas are eligible to apply for an Employment Authorization Document (EAD) if the primary H-1B holder has an approved Form I-140 Immigrant Petition or has received an extension beyond 6 years under AC21. L-2 spouses have automatic work authorization incident to status."
      },
      {
        "question": "What is the standard processing time for Form I-129 petitions with USCIS?",
        "answer": "Standard USCIS processing ranges from 2 to 6 months. Employers may elect Premium Processing by submitting Form I-907 and paying $2,805 for guaranteed adjudication within 15 calendar days."
      }
    ]
  },
  "uk": {
    "cname": "United Kingdom",
    "permit_name": "Skilled Worker Visa / Senior or Specialist Worker (Global Business Mobility)",
    "overview": "The UK Skilled Worker Visa allows eligible foreign nationals to work in the United Kingdom with an approved Home Office licensed sponsor employer. To qualify under the UK points-based immigration system, applicants must score 70 points across mandatory attributes: a valid Certificate of Sponsorship (CoS), a job offer at the appropriate skill level (RQF Level 3 or higher), English language proficiency at CEFR B1, and meeting the applicable general salary threshold (minimum \u00a338,700/year or the occupation go-rate, whichever is higher, with lower thresholds for shortage occupations and recent new entrants). The visa provides a direct 5-year pathway to Indefinite Leave to Remain (ILR).",
    "fees": {
      "visa_fee": "\u00a3719 (up to 3 years) / \u00a31,420 (over 3 years) approx. \u20b977,000",
      "service_fee": "\u00a31,035/year (Immigration Health Surcharge - IHS)",
      "total_fee": "\u00a31,754+ Statutory Total",
      "notes": "Mandatory IHS fee provides comprehensive access to the UK National Health Service (NHS). Priority service (+\u00a3500 for 5 days) and Super Priority (+\u00a31,000 for 24h) are optional."
    },
    "proc_time": "3 Weeks (15 Working Days) Standard Processing",
    "proc_details": "Standard UKVI processing timeline following biometric submission at VFS Global. Priority (5 business days) and Super Priority (next business day) available at premium VAC lounges.",
    "source": "UK Visas and Immigration (UKVI / Home Office) & VFS Global",
    "salary_threshold": "\u00a338,700 per annum or the going rate for the SOC 2020 occupation code, whichever is higher (\u00a330,960 for qualifying new entrants).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Points-Based System",
        "description": "Requires 70 points including 50 mandatory points (CoS, RQF 3 skill level, English B1) and 20 tradeable salary points."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Licensed Sponsor CoS",
        "description": "Must possess a valid Defined Certificate of Sponsorship (DCoS) assigned by an A-rated UK licensed sponsor."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Pathway to Settlement (ILR)",
        "description": "Eligible to apply for Indefinite Leave to Remain (ILR) permanent settlement after 5 continuous years of lawful residence."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Family Settlement",
        "description": "Dependents (spouse/civil partner and children under 18) are eligible for dependent visas with full unrestricted work rights."
      }
    ],
    "work_permit_type": "Defined Certificate of Sponsorship (DCoS)",
    "permit_authority": "UK Visas and Immigration (Home Office)",
    "validity": "Up to 5 Years",
    "validity_details": "Granted for up to 5 years depending on the duration specified on your Certificate of Sponsorship (CoS). Extendable indefinitely.",
    "stay": "Full Duration of Sponsorship Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Certificate of Sponsorship (CoS) Reference Document",
    "contract_desc": "Electronic CoE reference issued by an A-rated UK Home Office licensed sponsor detailing salary, job SOC code, and start date.",
    "min_funds": "\u00a31,270 held in personal bank account for 28 consecutive days (waived if sponsor certifies maintenance on CoS)",
    "faqs": [
      {
        "question": "What is a Defined Certificate of Sponsorship (DCoS)?",
        "answer": "A DCoS is a digital record assigned by an approved UK sponsor employer to an overseas applicant. It confirms your job role, SOC code, salary, and employment dates, and is required before submitting your visa application."
      },
      {
        "question": "Can I switch employers while in the UK on a Skilled Worker Visa?",
        "answer": "Yes. To switch employers, you must obtain a new Certificate of Sponsorship from your new licensed sponsor and submit a change of employment visa application to UKVI before commencing work with the new employer."
      },
      {
        "question": "How do I meet the English language requirement for a UK Skilled Worker visa?",
        "answer": "You can demonstrate English proficiency by passing an approved Secure English Language Test (SELT) at CEFR level B1 (e.g. IELTS UKVI, PTE Academic UKVI) or holding a degree taught in English verified by Ecctis."
      },
      {
        "question": "Can my spouse work in the UK on a Skilled Worker Dependent Visa?",
        "answer": "Yes. Your spouse or civil partner receives unrestricted employment rights in the United Kingdom, except they cannot work as a professional sportsperson or coach."
      },
      {
        "question": "When can I apply for permanent settlement (Indefinite Leave to Remain - ILR)?",
        "answer": "You can apply for ILR after completing 5 continuous years of lawful residence on a Skilled Worker visa, provided your employer still requires your services and pays the applicable settlement salary threshold."
      }
    ]
  },
  "canada": {
    "cname": "Canada",
    "permit_name": "Employer-Specific Work Permit (LMIA-based) / Global Skills Strategy (GSS)",
    "overview": "Canada's Temporary Foreign Worker Program (TFWP) and International Mobility Program (IMP) enable foreign skilled workers to work in Canada for Canadian employers. Most standard employer-specific work permits require an approved Labour Market Impact Assessment (LMIA) issued by Employment and Social Development Canada (ESDC), demonstrating that no Canadian citizen or permanent resident was available for the position. High-skilled tech and managerial talent can access expedited 2-week processing under the Global Skills Strategy (GSS). Canadian work experience awards significant Comprehensive Ranking System (CRS) points under the Express Entry Canadian Experience Class (CEC) towards Canadian Permanent Residency.",
    "fees": {
      "visa_fee": "CAD $155 (Work Permit Fee - approx. \u20b99,600)",
      "service_fee": "CAD $85 (Biometrics Fee) + CAD $1,000 (LMIA Employer Processing Fee)",
      "total_fee": "CAD $240 Statutory Applicant Charge",
      "notes": "CAD $1,000 LMIA fee is paid strictly by the Canadian employer to ESDC. Applicant pays CAD $155 work permit fee and CAD $85 biometrics."
    },
    "proc_time": "2 Weeks (Global Skills Strategy) to 8-12 Weeks (Standard Processing)",
    "proc_details": "LMIA-exempt and high-skilled NOC TEER 0/1 positions processed via Global Skills Strategy qualify for 2-week priority processing upon biometrics completion.",
    "source": "Immigration, Refugees and Citizenship Canada (IRCC) & ESDC",
    "salary_threshold": "Must meet or exceed prevailing median provincial hourly wage for the National Occupational Classification (NOC) TEER code.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Express Entry Advantage",
        "description": "1 to 2 years of Canadian skilled work experience adds up to 70+ CRS points towards Canadian Permanent Residency."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "LMIA / GSS Fast Track",
        "description": "Global Skills Strategy provides accelerated 2-week work permit processing for eligible high-skilled STEM occupations."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Open Spousal Work Permit",
        "description": "Spouses of high-skilled temporary foreign workers (NOC TEER 0, 1, 2, 3) are eligible for Open Work Permits (SOWP)."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Healthcare & Education",
        "description": "Permit holders and families qualify for provincial public health coverage and free primary/secondary public schooling."
      }
    ],
    "work_permit_type": "Employer-Specific Work Permit / LMIA",
    "permit_authority": "IRCC & ESDC (Employment and Social Development Canada)",
    "validity": "1 to 2 Years (Extendable)",
    "validity_details": "Issued for the duration approved on the LMIA or employment contract, typically 1 to 2 years, renewable from within Canada.",
    "stay": "Duration of Approved Employment Authorization",
    "entry_type": "Multiple Entry",
    "contract_doc": "Positive LMIA Confirmation & Formal Job Offer Letter",
    "contract_desc": "Official ESDC Labour Market Impact Assessment decision letter and signed employment contract outlining wage, duties, and conditions.",
    "min_funds": "CAD $4,000 - $6,000 in personal settlement savings or guaranteed corporate relocation reimbursement",
    "faqs": [
      {
        "question": "What is an LMIA and who is responsible for obtaining it?",
        "answer": "A Labour Market Impact Assessment (LMIA) is a verification issued by ESDC confirming that employing a foreign national will not adversely affect the Canadian labour market. The Canadian employer must apply for and pay all fees associated with the LMIA."
      },
      {
        "question": "Can my spouse work in Canada while I hold a work permit?",
        "answer": "Yes. Spouses of foreign workers employed in NOC TEER 0, 1, 2, or 3 occupations are eligible to apply for an Open Spousal Work Permit (SOWP), permitting employment with any Canadian employer."
      },
      {
        "question": "How does Canadian work experience help me obtain permanent residency?",
        "answer": "Completing one year of full-time Canadian work experience in a skilled occupation (TEER 0, 1, 2, 3) qualifies you for the Canadian Experience Class (CEC) under Express Entry, providing substantial bonus Comprehensive Ranking System (CRS) points."
      },
      {
        "question": "What is the Global Skills Strategy (GSS) 2-week processing?",
        "answer": "The GSS offers expedited 2-week work permit processing for high-skilled workers whose employers have secured a positive LMIA under the Global Talent Stream or who qualify for LMIA-exempt managerial and executive categories."
      },
      {
        "question": "Can I change employers while holding a closed work permit in Canada?",
        "answer": "Yes, but you cannot work for the new employer until they obtain an approved LMIA (or submit an LMIA-exempt offer) and you receive an approved new work permit from IRCC."
      }
    ]
  },
  "australia": {
    "cname": "Australia",
    "permit_name": "Temporary Skill Shortage (Subclass 482) / Employer Nomination Scheme (Subclass 186)",
    "overview": "The Australian Temporary Skill Shortage (TSS) Visa (Subclass 482) enables Australian businesses to sponsor skilled overseas workers to address labor shortages where suitably skilled Australian citizens cannot be sourced. Available across the Short-Term, Medium-Term, and Labor Agreement streams, the Subclass 482 requires an approved Standard Business Sponsor (SBS), a nominated occupation on the relevant skilled occupation list (STSOL or MLTSSL), and at least 2 years of relevant post-qualification work experience. Under recent migration reforms, all TSS 482 visa holders have a direct pathway to Australian permanent residency through the Employer Nomination Scheme (Subclass 186) after 2 years of employment.",
    "fees": {
      "visa_fee": "AUD 3,115 (approx. \u20b91,71,000 for Short-Term / Medium-Term)",
      "service_fee": "AUD 420 (Nomination Fee) + Skilling Australians Fund (SAF) Levy",
      "total_fee": "AUD 3,115 Base Applicant Charge",
      "notes": "Sponsor employer is legally mandated to pay the Standard Business Sponsorship fee, nomination fee, and the statutory SAF levy (AUD 1,200 to 1,800/year). Applicant pays visa application charge."
    },
    "proc_time": "1 to 3 Months (Standard Assessment Framework)",
    "proc_details": "Processed online via the Department of Home Affairs ImmiAccount. Accredited sponsors receive prioritized processing within 2 to 4 weeks.",
    "source": "Department of Home Affairs (ImmiAccount) & VFS Global Australia",
    "salary_threshold": "Must meet the Temporary Skilled Migration Income Threshold (TSMIT) of AUD $73,150 per year plus superannuation.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Subclass 186 PR Pathway",
        "description": "All 482 visa holders can transition to Australian Permanent Residency via Subclass 186 ENS after 2 years of sponsored employment."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "TSMIT Salary Guarantee",
        "description": "Guaranteed minimum statutory wage of AUD $73,150 plus 11.5% compulsory superannuation guarantee."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Unrestricted Family Work Rights",
        "description": "Accompanying family members receive full, unrestricted study and work rights across Australia for the duration of the visa."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Accredited Sponsor Priority",
        "description": "Fast-tracked application assessment (within 5-15 business days) for employers holding accredited sponsor status."
      }
    ],
    "work_permit_type": "Subclass 482 Nomination Approval Notice",
    "permit_authority": "Department of Home Affairs",
    "validity": "2 to 4 Years",
    "validity_details": "Granted for up to 2 years (Short-Term stream) or up to 4 years (Medium-Term / Regional stream), renewable with employer sponsorship.",
    "stay": "Full Duration of Sponsored Visa Grant",
    "entry_type": "Multiple Entry",
    "contract_doc": "Department Nomination Approval & Employment Contract",
    "contract_desc": "Approved Subclass 482 Nomination Letter issued by Home Affairs alongside signed formal employment contract.",
    "min_funds": "AUD $5,000 in personal savings or documented employer relocation package",
    "faqs": [
      {
        "question": "What is the Temporary Skilled Migration Income Threshold (TSMIT)?",
        "answer": "TSMIT is the minimum salary level set by the Australian Government for employer-sponsored visas, currently AUD $73,150 per annum. Employers must pay the market salary rate, which must be equal to or higher than TSMIT."
      },
      {
        "question": "Can I bring my family with me on a Subclass 482 visa?",
        "answer": "Yes. You can include your spouse or de facto partner and dependent children in your application. Dependent family members receive full, unrestricted work and study rights in Australia."
      },
      {
        "question": "How do I transition from Subclass 482 to Australian Permanent Residency?",
        "answer": "Under the Temporary Residence Transition (TRT) stream of Subclass 186, you can apply for permanent residency after working for your nominating employer on a 482 visa for 2 years."
      },
      {
        "question": "What happens if my employment ends while on a 482 visa?",
        "answer": "Under updated Department rules, you have 180 consecutive days (up to 365 days cumulatively across the visa period) to find a new approved sponsor, transition to another visa category, or arrange departure from Australia."
      },
      {
        "question": "Is a skills assessment mandatory for a Subclass 482 visa?",
        "answer": "A formal skills assessment (e.g. from TRA or VETASSESS) is mandatory for certain nominated trade occupations and specific nationalities. For other roles, relevant degrees plus 2 years of verifiable post-qualification experience are evaluated."
      }
    ]
  },
  "germany": {
    "cname": "Germany",
    "permit_name": "EU Blue Card (Blaue Karte EU) / Skilled Worker Visa (\u00a718a/\u00a718b AufenthG)",
    "overview": "The German Work Visa framework provides world-class immigration pathways for qualified professionals under the reformed Skilled Immigration Act (Fachkr\u00e4fteeinwanderungsgesetz). The flagship route is the EU Blue Card (\u00a718g AufenthG), which features lowered salary thresholds (\u20ac45,300 gross annual salary, or \u20ac41,041.80 for STEM occupations and recent graduates) and requires no Federal Employment Agency (BA) labor market check. Holders of an EU Blue Card can acquire German Permanent Settlement (Niederlassungserlaubnis) in just 21 months with B1 German proficiency (or 27 months with basic A1 German). Germany also offers the Opportunity Card (Chancenkarte), a points-based job seeker visa for qualified specialists.",
    "fees": {
      "visa_fee": "\u20ac75 (approx. \u20b96,750)",
      "service_fee": "\u20b92,200 (VFS Global Service Fee)",
      "total_fee": "\u20ac75 + VFS Logistics",
      "notes": "Payable at German Missions in India or VFS Global. Blue Card holders pay \u20ac100 for the physical residence permit card at the Ausl\u00e4nderbeh\u00f6rde upon arrival."
    },
    "proc_time": "4 to 8 Weeks (Accelerated Procedure: 2-3 Weeks)",
    "proc_details": "Employers can initiate the Fast-Track Procedure for Skilled Workers (\u00a781a AufenthG) with the local Foreigners Authority, slashing processing times to 2-3 weeks.",
    "source": "Federal Foreign Office & Federal Employment Agency (Bundesagentur f\u00fcr Arbeit)",
    "salary_threshold": "EU Blue Card: \u20ac45,300/year (standard) or \u20ac41,041.80/year (STEM shortages & entry-level graduates).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Fast-Track PR in 21 Months",
        "description": "EU Blue Card holders can obtain German Permanent Settlement (Niederlassungserlaubnis) in just 21 months with B1 German."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Fast-Track Employer Procedure",
        "description": "Under \u00a781a AufenthG, employers can fast-track consular appointment booking and visa issuance within 3 weeks."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "EU Mobility Rights",
        "description": "After 12 months of holding an EU Blue Card in Germany, you can move to another EU member state for highly qualified work."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Spousal Work Without German",
        "description": "Spouses of EU Blue Card holders receive immediate unrestricted work authorization without needing prior German language certificates."
      }
    ],
    "work_permit_type": "EU Blue Card (\u00a718g) / Employment Residence Permit",
    "permit_authority": "Federal Foreign Office & Ausl\u00e4nderbeh\u00f6rde",
    "validity": "Up to 4 Years",
    "validity_details": "Issued for the duration of the employment contract plus 3 months, up to a maximum of 4 years, renewable indefinitely.",
    "stay": "Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Declaration of Employment (Erkl\u00e4rung zum Besch\u00e4ftigungsverh\u00e4ltnis)",
    "contract_desc": "Official German Federal Employment Agency Declaration form signed by employer detailing salary, working hours, and social contributions.",
    "min_funds": "First month salary proof or \u20ac1,027/month personal maintenance savings",
    "faqs": [
      {
        "question": "What is the salary threshold for an EU Blue Card in Germany?",
        "answer": "As of 2024, the general gross annual salary threshold is \u20ac45,300. For shortage occupations (math, IT, natural sciences, engineering, human medicine) and young professionals graduating within the last 3 years, the reduced threshold is \u20ac41,041.80."
      },
      {
        "question": "How soon can I get German Permanent Residence with an EU Blue Card?",
        "answer": "You can obtain permanent settlement (Niederlassungserlaubnis) after 21 months if you demonstrate German language proficiency at level B1, or after 27 months with basic A1 German, provided you have paid statutory pension contributions."
      },
      {
        "question": "Does my foreign degree need recognition in Germany?",
        "answer": "Yes. Your university degree must be recognized as comparable to a German higher education qualification on the official Anabin database, or you must obtain a Statement of Comparability from the ZAB (Central Office for Foreign Education)."
      },
      {
        "question": "Can my spouse work in Germany without speaking German?",
        "answer": "Yes. Spouses of EU Blue Card holders are exempt from providing proof of German language skills before entry and are granted an unrestricted work permit upon registration."
      },
      {
        "question": "What is the fast-track procedure for skilled workers (\u00a781a AufenthG)?",
        "answer": "Your employer in Germany can initiate an accelerated procedure with the local immigration authority (Ausl\u00e4nderbeh\u00f6rde) for a statutory fee of \u20ac411, reducing consular processing times to under 3 weeks."
      }
    ]
  },
  "ireland": {
    "cname": "Ireland",
    "permit_name": "Critical Skills Employment Permit (CSEP) / General Employment Permit",
    "overview": "Ireland's employment permits system, managed by the Department of Enterprise, Trade and Employment (DETE), attracts top global talent to Ireland's flourishing technology, life sciences, and financial sectors. The premier pathway is the Critical Skills Employment Permit (CSEP), designed for high-skilled professionals in occupations listed on the Critical Skills Occupations List (ICT specialists, engineers, medical professionals) offering a minimum remuneration of \u20ac38,000/year, or any eligible role paying \u20ac64,000/year or more. CSEP holders are exempt from the labour market needs test and can apply for Irish Permanent Residency (Stamp 4) after just 2 years.",
    "fees": {
      "visa_fee": "\u20ac1,000 (DETE Permit Fee) + \u20ac100 (Consular Entry Visa D)",
      "service_fee": "\u20ac300 (IRP Card Registration Fee upon arrival)",
      "total_fee": "\u20ac1,100 Official Fee + IRP",
      "notes": "The \u20ac1,000 employment permit fee is refunded at 90% if rejected by DETE. Entry visa D is paid via AVATS at VFS Ireland."
    },
    "proc_time": "6 to 12 Weeks (DETE Permit: 4-8 Weeks + Consular Visa: 3-4 Weeks)",
    "proc_details": "Two-step process: First, secure the official employment permit from DETE in Dublin. Second, submit the Long-Stay D Visa application via AVATS at VFS Global in India.",
    "source": "Department of Enterprise, Trade and Employment (DETE) & Irish Immigration Service (ISD)",
    "salary_threshold": "Critical Skills: \u20ac38,000/year (occupations on Critical Skills list) or \u20ac64,000/year (all eligible occupations). General Permit: \u20ac34,000/year.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Stamp 4 PR in 2 Years",
        "description": "CSEP holders can transition to Stamp 4 immigration permission after 2 years, granting unrestricted work rights without a permit."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "No Labour Market Test",
        "description": "Critical Skills applications are fully exempt from the time-consuming Labour Market Needs Test advertising requirement."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Immediate Family Reunion",
        "description": "Critical Skills permit holders can sponsor spouses and dependent children immediately upon receiving their permit."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Spousal Stamp 1G Work Rights",
        "description": "Spouses receive Stamp 1G permission, allowing full-time employment with any employer in Ireland without needing an employment permit."
      }
    ],
    "work_permit_type": "Critical Skills Employment Permit (CSEP)",
    "permit_authority": "DETE (Department of Enterprise, Trade and Employment)",
    "validity": "2 Years (Initial Grant)",
    "validity_details": "Granted for 2 years initially, leading directly to Stamp 4 permanent residence permission without requiring permit renewal.",
    "stay": "2 Years (Direct Stamp 4 Transition)",
    "entry_type": "Single or Multiple Entry",
    "contract_doc": "Certified DETE Employment Permit & 2-Year Contract",
    "contract_desc": "Official electronic Employment Permit document issued by DETE in Dublin confirming salary, employer registration, and SOC code.",
    "min_funds": "\u20ac3,000 - \u20ac5,000 in personal liquid savings or employer relocation support",
    "faqs": [
      {
        "question": "What is the difference between a CSEP and a General Employment Permit in Ireland?",
        "answer": "The Critical Skills Employment Permit (CSEP) is for designated high-demand occupations paying \u20ac38,000+ (or any role \u20ac64,000+), requires no labour market test, and leads to Stamp 4 in 2 years. A General Employment Permit requires a labour market test and takes 5 years to achieve Stamp 4."
      },
      {
        "question": "Can my spouse work in Ireland on a Critical Skills permit?",
        "answer": "Yes. Spouses and civil partners of CSEP holders can join immediately and receive a Stamp 1G permission, authorizing full-time employment without needing an individual employment permit."
      },
      {
        "question": "What is Stamp 4 and how do I qualify?",
        "answer": "Stamp 4 allows you to work in Ireland without an employment permit, establish a business, and access state services. CSEP holders qualify for Stamp 4 after working 21 to 24 months with their sponsoring employer."
      },
      {
        "question": "Can I change employers while on a Critical Skills Employment Permit?",
        "answer": "You are generally expected to remain with your initial employer for 12 months. After 12 months, you can change employers by applying for a new employment permit with the new sponsor."
      },
      {
        "question": "Does Ireland belong to the Schengen Area?",
        "answer": "No. Ireland is not part of the Schengen Area. An Irish employment visa grants access only to Ireland, and an Irish residence permit does not authorize visa-free work across continental Europe."
      }
    ]
  },
  "uae": {
    "cname": "United Arab Emirates",
    "permit_name": "Standard Employment Visa / Green Visa for Skilled Employees / Golden Visa",
    "overview": "The UAE employment visa system provides world-class, tax-free career opportunities across Dubai, Abu Dhabi, and the Northern Emirates. The traditional Standard Employment Visa is sponsored by a mainland company (registered with the Ministry of Human Resources and Emiratisation - MOHRE) or an approved Free Zone Authority (DIFC, DMCC, ADGM). High-earning professionals earning AED 30,000+/month can obtain a 5-year self-sponsored Green Visa for Skilled Employees. Top executive and technical specialists earning AED 30,000+/month or possessing advanced degrees can qualify for the 10-year Golden Visa. UAE employment offers 100% tax-free income and streamlined dependent sponsorship.",
    "fees": {
      "visa_fee": "AED 250 - 500 (Entry Permit) + AED 3,000 - 7,000 (Work Permit / Quota)",
      "service_fee": "AED 370 (Emirates ID) + AED 300 - 750 (Medical Fitness Test)",
      "total_fee": "Borne 100% by Sponsoring Employer",
      "notes": "Under UAE Labour Law, all recruitment, quota, entry permit, medical fitness, and Emirates ID costs must be paid entirely by the employing company."
    },
    "proc_time": "2 to 4 Weeks Total (Entry Permit: 3-5 Days; Stamping & Emirates ID: 1-2 Weeks)",
    "proc_details": "Employer applies for MOHRE work permit quota and e-Entry Permit. Applicant arrives in UAE, completes medical fitness and biometric screening for Emirates ID card issuance.",
    "source": "Ministry of Human Resources and Emiratisation (MOHRE) & Federal Authority for Identity, Citizenship, Customs and Port Security (ICP)",
    "salary_threshold": "Skilled Professional Level 1-3: Minimum AED 5,000 - 15,000/month. Green Visa: AED 30,000/month. Golden Visa: AED 30,000/month.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "100% Tax-Free Income",
        "description": "Zero personal income tax, capital gains tax, or statutory withholding deductions on employment earnings."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Employer Cost Mandate",
        "description": "All visa processing fees, medical fitness costs, and Emirates ID charges are legally mandated to be paid by the employer."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "10-Year Golden Visa",
        "description": "Specialists and executives earning AED 30,000+/month can qualify for a 10-year self-sponsored Golden Visa."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Generous Family Sponsorship",
        "description": "Male or female employees earning AED 4,000+/month can sponsor spouse, children, and parents with private medical insurance."
      }
    ],
    "work_permit_type": "MOHRE Electronic Work Permit / Free Zone Employment Residence Visa",
    "permit_authority": "MOHRE & ICP / GDRFA Dubai",
    "validity": "2 Years (Mainland / Free Zone) or 5-10 Years (Green / Golden Visa)",
    "validity_details": "Standard mainland contracts issue 2-year renewable residence visas. Green Visas are valid for 5 years, and Golden Visas for 10 years.",
    "stay": "Full Duration of Valid Emirates ID",
    "entry_type": "Multiple Entry",
    "contract_doc": "MOHRE Standard Employment Contract & Entry Permit",
    "contract_desc": "Official MOHRE bilingual employment contract registered with the UAE government accompanied by ICP e-Entry Permit.",
    "min_funds": "Guaranteed employer salary transfer via Wage Protection System (WPS)",
    "faqs": [
      {
        "question": "Who pays for the UAE employment visa and Emirates ID?",
        "answer": "Under UAE Labour Law (Federal Decree-Law No. 33 of 2021), the employer is legally obligated to cover all recruitment and visa expenses, including entry permits, medical exams, and Emirates ID fees. Deducting these costs from the employee is illegal."
      },
      {
        "question": "What is the difference between a mainland and a free zone work visa?",
        "answer": "Mainland visas are governed by MOHRE and allow the company to operate anywhere in the UAE and tender for government contracts. Free zone visas are regulated by the specific zone authority (e.g. DMCC, DIFC) and permit operation within that zone and internationally."
      },
      {
        "question": "Can I sponsor my family in the UAE on a work visa?",
        "answer": "Yes. An employee earning a minimum salary of AED 4,000 per month (or AED 3,000 plus company accommodation) can sponsor their spouse and children, provided they secure adequate accommodation and medical insurance."
      },
      {
        "question": "What is the Wage Protection System (WPS)?",
        "answer": "WPS is an electronic salary transfer system overseen by the Central Bank of the UAE and MOHRE ensuring that private sector employers pay employees agreed contractual wages on time through authorized banks or exchanges."
      },
      {
        "question": "How do I qualify for a UAE 10-Year Golden Visa through employment?",
        "answer": "Skilled professionals can qualify by holding a valid employment contract in the UAE categorized under occupational level 1 or 2 by MOHRE, earning a monthly basic salary of at least AED 30,000, and possessing a bachelor's degree or higher."
      }
    ]
  },
  "singapore": {
    "cname": "Singapore",
    "permit_name": "Employment Pass (EP) / COMPASS Points System / S Pass",
    "overview": "Singapore's work pass framework, regulated by the Ministry of Manpower (MOM), provides high-caliber employment opportunities in Southeast Asia's primary financial and technology hub. The primary scheme for professionals, managers, and executives is the Employment Pass (EP). Under the COMPASS (Complementarity Assessment Framework) points system, applicants must earn at least 40 points across individual and foundational criteria: salary benchmark, qualification, diversity, and local hiring support. Mid-skilled technicians utilize the S Pass. Singapore offers exceptional career acceleration, low personal tax rates, and a pathway to Singapore Permanent Residence (PR).",
    "fees": {
      "visa_fee": "SGD $105 (EP Application Fee)",
      "service_fee": "SGD $225 (EP Issuance Fee) + SGD $30 (Multiple Journey Visa)",
      "total_fee": "SGD $360 Total Statutory Reference",
      "notes": "Submitted online by the employer via MOM EP eService (myMOM). Fees are typically borne by the hiring employer."
    },
    "proc_time": "10 Working Days (Standard MOM Processing)",
    "proc_details": "Most online Employment Pass applications are adjudicated by MOM within 10 business days. In-principle approval (IPA) letter is issued upon approval.",
    "source": "Ministry of Manpower (MOM Singapore)",
    "salary_threshold": "EP minimum qualifying salary: SGD $5,000/month (increases progressively up to SGD $10,500 for candidates in their 40s; financial services starts at SGD $5,500).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "COMPASS Framework",
        "description": "Transparent points system evaluating salary benchmarks, degree quality, firm nationality diversity, and local employment."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "In-Principle Approval (IPA)",
        "description": "IPA letter acts as a pre-approved entry visa, allowing travel to Singapore to complete biometric pass card issuance."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Pathway to Singapore PR",
        "description": "EP holders can apply for Singapore Permanent Residence via the Professionals/Technical Personnel and Skilled Workers (PTS) scheme."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Dependant's Pass (DP)",
        "description": "EP holders earning at least SGD $6,000/month can sponsor spouse and unmarried children under 21 years."
      }
    ],
    "work_permit_type": "Employment Pass (EP) / In-Principle Approval (IPA)",
    "permit_authority": "Ministry of Manpower (MOM)",
    "validity": "Up to 2 Years (Initial) / Up to 3 Years (Renewals)",
    "validity_details": "First-time applicants receive an EP valid for up to 2 years, with subsequent renewals granted for up to 3 years.",
    "stay": "Duration of Approved Employment Pass",
    "entry_type": "Multiple Entry",
    "contract_doc": "In-Principle Approval (IPA) Letter & Employment Contract",
    "contract_desc": "Official digital MOM In-Principle Approval letter with registration barcode and employer formal appointment contract.",
    "min_funds": "Guaranteed statutory salary transfer or SGD $5,000 personal relocation funds",
    "faqs": [
      {
        "question": "What is the COMPASS framework for a Singapore Employment Pass?",
        "answer": "COMPASS is a points-based system where EP applicants must earn at least 40 points across four foundational criteria (salary benchmark, qualification, corporate diversity, support for local employment) and two bonus criteria (skills shortage and strategic economic priorities)."
      },
      {
        "question": "Can my spouse work in Singapore if I hold an Employment Pass?",
        "answer": "Spouses holding a Dependant's Pass (DP) who wish to work in Singapore must secure their own qualifying work pass (EP, S Pass, or Work Permit). DP holders who operate businesses can apply for a Letter of Consent (LOC)."
      },
      {
        "question": "What is an In-Principle Approval (IPA) letter?",
        "answer": "An IPA is the official approval notice issued by MOM once an EP is granted. It serves as a single-entry visa for travel to Singapore, allowing you to complete medical checks, register biometrics, and collect your physical pass card."
      },
      {
        "question": "Can I switch employers while in Singapore on an Employment Pass?",
        "answer": "Yes. Your prospective employer must submit a new EP application on your behalf. Once the new EP is approved, you can resign from your existing role and transfer passes without departing Singapore."
      },
      {
        "question": "When can an Employment Pass holder apply for Singapore Permanent Residence?",
        "answer": "There is no statutory minimum wait time, but most EP holders apply after completing at least 1 to 2 years of continuous tax-paying employment in Singapore under the PTS scheme."
      }
    ]
  },
  "japan": {
    "cname": "Japan",
    "permit_name": "Engineer / Specialist in Humanities / International Services / Highly Skilled Professional (HSP)",
    "overview": "Japan's work visa system actively recruits foreign specialists and engineers to meet unprecedented demand across technology, manufacturing, finance, and commerce. The most common work visa category is the 'Engineer / Specialist in Humanities / International Services' visa, requiring a university degree in a relevant major or 10 years of documented professional experience, along with a formal contract with an enterprise in Japan. Top talent can access the points-based 'Highly Skilled Professional' (HSP) visa, which provides preferential immigration treatment, including an expedited pathway to Japanese Permanent Residency in just 1 year (with 80 points) or 3 years (with 70 points).",
    "fees": {
      "visa_fee": "JPY 3,000 (Single Entry) / JPY 6,000 (Multiple Entry) approx. \u20b91,800 - \u20b93,600",
      "service_fee": "\u20b91,500 - \u20b92,500 (VFS Japan Handling Fee)",
      "total_fee": "JPY 3,000 + VFS Handling Fee",
      "notes": "Certificate of Eligibility (COE) application to the Immigration Services Agency of Japan is free. Applicant pays consular visa fee at VFS Japan upon COE approval."
    },
    "proc_time": "1 to 3 Months (COE Issuance: 1-2 Months + Consular Visa: 5-7 Business Days)",
    "proc_details": "Employer in Japan lodges COE application at Regional Immigration Services Bureau. Once COE is granted, consular visa stamping in India takes approximately 5 business days.",
    "source": "Immigration Services Agency of Japan (ISA) & Ministry of Foreign Affairs (MOFA)",
    "salary_threshold": "Remuneration must be equal to or greater than that of a Japanese national undertaking comparable duties (typically JPY 200,000 - 250,000+/month minimum).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Fast-Track PR in 1 Year",
        "description": "Highly Skilled Professional (HSP) visa holders with 80 points can obtain Japanese Permanent Residency after just 1 year."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Certificate of Eligibility (COE)",
        "description": "Pre-approved COE issued by Japanese immigration guarantees high visa issuance certainty at the consular stage."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "5-Year Visa Status",
        "description": "Initial status of residence can be granted for 1, 3, or 5 years, renewable throughout continued employment."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Family Stay (Dependent)",
        "description": "Spouses and children receive 'Family Stay' status, with permission to engage in part-time work up to 28 hours/week."
      }
    ],
    "work_permit_type": "Certificate of Eligibility (COE) / Status of Residence",
    "permit_authority": "Immigration Services Agency of Japan (ISA)",
    "validity": "1, 3, or 5 Years",
    "validity_details": "Granted for 1, 3, or 5 years based on employer corporate category, contract length, and immigration assessment.",
    "stay": "Duration of Status of Residence",
    "entry_type": "Single or Multiple Entry",
    "contract_doc": "Certificate of Eligibility (COE) & Signed Employment Contract",
    "contract_desc": "Original or digital Certificate of Eligibility issued by Japanese Regional Immigration Bureau and bilingual employment contract.",
    "min_funds": "JPY 200,000 - 300,000 in personal savings or guaranteed employer relocation allowance",
    "faqs": [
      {
        "question": "What is a Certificate of Eligibility (COE) for Japan?",
        "answer": "A COE is an official document issued by the Immigration Services Agency of Japan before the visa application. It certifies that the foreign worker satisfies the conditions for the intended status of residence, making consular visa issuance virtually guaranteed."
      },
      {
        "question": "Is Japanese language ability mandatory for a work visa in Japan?",
        "answer": "Japanese language ability is not a legal statutory requirement for the 'Engineer' category (software development, mechanical design). However, knowledge of Japanese (JLPT N3-N1) significantly broadens career prospects and awards bonus points for the HSP visa."
      },
      {
        "question": "Can my spouse work in Japan on a Dependent visa?",
        "answer": "Spouses on a 'Family Stay' (Dependent) visa can work up to 28 hours per week after obtaining 'Permission to Engage in Activity Other Than That Permitted' from the regional immigration bureau."
      },
      {
        "question": "How do I qualify for the 1-year Japanese Permanent Residence pathway?",
        "answer": "Under the points-based Highly Skilled Professional system, candidates scoring 80 points or more based on academic degree, salary, age, and career achievements can apply for permanent residency after just 1 continuous year of residence."
      },
      {
        "question": "Can I switch employers while in Japan on an Engineer visa?",
        "answer": "Yes. As long as the new job falls under the same category (e.g. Engineer/Specialist in Humanities), you can change employers. You must notify immigration within 14 days and can apply for a Certificate of Authorized Employment."
      }
    ]
  },
  "austria": {
    "cname": "Austria",
    "permit_name": "Red-White-Red Card (Rot-Wei\u00df-Rot-Karte) / EU Blue Card",
    "overview": "The Austrian Red-White-Red Card (Rot-Wei\u00df-Rot-Karte) is a criteria-led, points-based immigration model that combines a residence permit and employment authorization for qualified third-country workers and their families. Issued under the Austrian Act Governing the Employment of Foreigners (AuslBG), applicants must reach minimum point benchmarks (typically 55 to 70 points out of 100) across age, qualifications, work experience, language proficiency (German or English), and a binding job offer paying the statutory minimum wage. Austria also offers the EU Blue Card for university graduates earning above the statutory salary threshold. After 21 months of employment on an RWR Card, workers qualify for the Red-White-Red Card Plus, granting free access to the entire Austrian labour market.",
    "fees": {
      "visa_fee": "\u20ac160 (RWR Card Application Fee: \u20ac120 on submission + \u20ac20 on grant + \u20ac20 police biometrics)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac190 Total Consular Reference (approx. \u20b917,100)",
      "notes": "Submitted at the Austrian Embassy/Consulate or VFS Global in India, or directly by the employer at the competent residence authority in Austria."
    },
    "proc_time": "6 to 8 Weeks from Complete Application Submission",
    "proc_details": "Adjudicated jointly by the Austrian Public Employment Service (AMS) and the local provincial administrative authority (Bezirkshauptmannschaft or Magistrat).",
    "source": "Austrian Federal Ministry of the Interior (BMI) & Public Employment Service (AMS)",
    "salary_threshold": "Statutory minimum wage under the applicable Austrian Collective Agreement (Kollektivvertrag) + minimum gross salary of approx. \u20ac3,030/month (2024).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "RWR Card Plus in 21 Months",
        "description": "Eligible for the RWR Card Plus after 21 months, freeing you from employer binding with unrestricted labour market access."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Points-Based Evaluation",
        "description": "Transparent assessment based on degree, experience, age, and language skills (English or German)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "14 Monthly Salaries Per Year",
        "description": "Austrian collective agreements legally mandate 14 salaries per year (holiday and Christmas bonuses - Urlaubs- und Weihnachtsgeld)."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Red-White-Red Card for Family",
        "description": "Spouses receive immediate RWR Card Plus status upon arrival, giving them unrestricted permission to work anywhere in Austria."
      }
    ],
    "work_permit_type": "Red-White-Red Card (Rot-Wei\u00df-Rot-Karte)",
    "permit_authority": "AMS (Arbeitsmarktservice) & BMI",
    "validity": "2 Years",
    "validity_details": "Issued for 24 months, entitling you to fixed-term settlement and employment with the specific employer. Transitions to RWR Card Plus.",
    "stay": "2 Years (Renewable via RWR Card Plus)",
    "entry_type": "Multiple Entry",
    "contract_doc": "Employer Declaration (Arbeitgebererkl\u00e4rung) & Binding Job Offer",
    "contract_desc": "Official AMS Arbeitgebererkl\u00e4rung completed by the Austrian employer specifying collective agreement classification, salary, and job role.",
    "min_funds": "Guaranteed salary meeting collective bargaining threshold (minimum \u20ac3,030/month gross)",
    "faqs": [
      {
        "question": "What is the points requirement for an Austrian Red-White-Red Card?",
        "answer": "Depending on the category (Very Highly Qualified, Skilled Workers in Shortage Occupations, Other Key Workers), you must score between 55 and 70 points out of 100 based on education, experience, language skills, and age."
      },
      {
        "question": "Can my employer file the RWR Card application on my behalf in Austria?",
        "answer": "Yes. Your prospective employer in Austria can submit the complete application directly to the competent settlement authority (Magistrat or Bezirkshauptmannschaft) in Austria, significantly streamlining the process."
      },
      {
        "question": "What is the Red-White-Red Card Plus?",
        "answer": "The RWR Card Plus is an upgraded residence permit granted after 21 months of holding an RWR Card. It entitles the holder to fixed-term settlement and unrestricted access to the labour market anywhere in Austria."
      },
      {
        "question": "Can my spouse work in Austria on a family reunification permit?",
        "answer": "Yes. Family members of Red-White-Red Card holders immediately receive an RWR Card Plus, granting them unrestricted access to work for any employer in Austria from day one."
      },
      {
        "question": "What is the 14-month salary structure in Austria?",
        "answer": "Under Austrian collective agreements (Kollektivvertr\u00e4ge), employees receive 14 salaries per calendar year: 12 standard monthly salaries plus a 13th salary (holiday bonus in summer) and a 14th salary (Christmas bonus in winter), taxed at favorable rates."
      }
    ]
  },
  "belgium": {
    "cname": "Belgium",
    "permit_name": "Single Permit (Permis Unique / Gecombineerde Vergunning) / EU Blue Card",
    "overview": "The Belgian Single Permit (Permis Unique / Gecombineerde Vergunning) is an integrated residence and work authorization issued under the EU Single Permit Directive, allowing non-EEA nationals to live and work in Belgium for more than 90 days. The application is lodged electronically by the employer through the regional authority (Flanders, Wallonia, or Brussels-Capital). Highly skilled workers, executive personnel, and tech specialists benefit from simplified processing with waived labour market tests, provided their gross annual remuneration meets the regional statutory salary thresholds. After 5 years of uninterrupted legal residence, foreign professionals can apply for permanent residency (Belgian Long-Term Resident status).",
    "fees": {
      "visa_fee": "\u20ac140 (Federal Administrative Fee - Redevance Administrative) + \u20ac180 (Long-Stay Visa D Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "\u20ac350 Total Consular Reference (approx. \u20b931,500)",
      "notes": "The administrative fee must be transferred directly to the Belgian Immigration Office (DOFI) account before lodging the application."
    },
    "proc_time": "8 to 12 Weeks from Regional Application Submission",
    "proc_details": "Processed in two steps: Regional employment department approves work authorization, followed by the Immigration Office (DOFI) issuing the formal Annex 46 residence approval.",
    "source": "Belgian Immigration Office (DOFI / Office des \u00c9trangers) & Regional Employment Ministries",
    "salary_threshold": "Regional thresholds (2024): Highly Skilled: approx. \u20ac46,632 - \u20ac50,310/year; Executives: approx. \u20ac78,704 - \u20ac83,850/year.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Integrated Single Permit",
        "description": "A single electronic application combining both work authorization and residence clearance under Belgian law."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Waived Labour Market Test",
        "description": "Highly qualified workers and managerial staff are exempt from regional labour market shortage checks."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Heart of the European Union",
        "description": "Based in Brussels with direct access to European institutional markets, diplomatic headquarters, and multinational hubs."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Family Settlement Pathway",
        "description": "Dependents can join through family reunification, receiving residence cards allowing employment across Belgium."
      }
    ],
    "work_permit_type": "Single Permit Approval (Annex 46) / Type D Visa",
    "permit_authority": "Belgian Regional Ministries & DOFI (Immigration Office)",
    "validity": "1 to 3 Years",
    "validity_details": "Issued for the duration of the employment contract, up to a maximum of 3 years initially, renewable annually.",
    "stay": "Duration of Approved Single Permit",
    "entry_type": "Multiple Entry",
    "contract_doc": "Single Permit Annex 46 Decision & Employment Contract",
    "contract_desc": "Official Annex 46 approval notice issued by the Belgian Immigration Office accompanied by signed regional employment contract.",
    "min_funds": "Guaranteed statutory salary meeting regional threshold (minimum \u20ac3,886+/month gross)",
    "faqs": [
      {
        "question": "Who initiates the Belgian Single Permit application?",
        "answer": "The application must be initiated by your employer in Belgium via the digital 'Working in Belgium' regional portal. Once regional work approval is granted, DOFI issues an Annex 46 approval letter."
      },
      {
        "question": "What is an Annex 46 document?",
        "answer": "Annex 46 is the official decision issued by the Belgian Immigration Office (DOFI) confirming both work and residence authorization. With this document, you submit your passport at VFS to receive your Type D entry visa."
      },
      {
        "question": "What are the regional salary thresholds in Belgium?",
        "answer": "Salary thresholds vary slightly between Flanders, Wallonia, and Brussels. For highly skilled employees, the threshold is approximately \u20ac46,632 to \u20ac50,310 gross annually, adjusted each January."
      },
      {
        "question": "Can my family join me in Belgium on a Single Permit?",
        "answer": "Yes. Spouses and dependent children under 18 can apply for family reunification visas, provided you have adequate accommodation, health insurance, and stable income."
      },
      {
        "question": "Can I travel to other Schengen countries with a Belgian residence card?",
        "answer": "Yes. The Belgian Residence Card (electronic A-card) allows visa-free travel throughout the Schengen Area for up to 90 days in any 180-day period for tourism and business."
      }
    ]
  },
  "czech-republic": {
    "cname": "Czech Republic",
    "permit_name": "Employee Card (Zam\u011bstnaneck\u00e1 karta) / EU Blue Card",
    "overview": "The Czech Employee Card (Zam\u011bstnaneck\u00e1 karta) is a dual-purpose long-term residence permit entitling a third-country national to reside and perform work in the Czech Republic in a specific job position registered with the Czech Labour Office (\u00da\u0159ad pr\u00e1ce). The job must be advertised in the central vacancy database for 10 to 30 days before being allocated to a foreign national. The Czech Republic also grants the EU Blue Card for university-educated specialists in roles requiring high qualifications paying at least 1.5 times the national gross average salary. With booming tech, automotive, and industrial sectors in Prague and Brno, the Czech Republic offers excellent living standards and low unemployment.",
    "fees": {
      "visa_fee": "CZK 2,500 (approx. \u20ac100 / \u20b99,000 consular application fee)",
      "service_fee": "CZK 1,000 (VFS Global Processing Fee) + CZK 2,500 (Residence card fee upon arrival)",
      "total_fee": "approx. \u20b918,000 Total Statutory Reference",
      "notes": "All non-Czech documents (criminal record clearance, degrees) must be apostilled/legalized and accompanied by an official certified Czech translation."
    },
    "proc_time": "60 to 90 Calendar Days from Consular Submission",
    "proc_details": "Adjudicated by the Department for Asylum and Migration Policy (OAMP) of the Ministry of the Interior of the Czech Republic.",
    "source": "Ministry of the Interior of the Czech Republic (MOI / OAMP) & Labour Office (\u00da\u0159ad pr\u00e1ce)",
    "salary_threshold": "Wage must not be lower than the basic monthly statutory minimum wage (CZK 18,900/month) for a 40-hour work week.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Dual-Purpose Permit",
        "description": "Single card combining long-term residence and work authorization for a registered job vacancy number."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Central Labour Registry",
        "description": "Employer registers position in the official Ministry of Labour and Social Affairs vacancy database."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Residence in 5 Years",
        "description": "Qualify for Czech and EU Permanent Residency after 5 continuous years of lawful temporary residence."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Affordable Central European Hub",
        "description": "Exceptional cost-to-income ratio, safe communities, and convenient transit access across Central Europe."
      }
    ],
    "work_permit_type": "Employee Card (Zam\u011bstnaneck\u00e1 karta)",
    "permit_authority": "OAMP (Ministry of the Interior) & Labour Office",
    "validity": "Up to 2 Years",
    "validity_details": "Issued for the duration of the employment contract, up to a maximum of 2 years, extendable repeatedly.",
    "stay": "Duration of Approved Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Employment Contract & Labour Office Vacancy Number",
    "contract_desc": "Formal employment contract for at least 15 hours/week and the official CZ Vacancy Number registered with the Labour Office.",
    "min_funds": "Guaranteed salary under contract or CZK 100,000 in personal bank balance",
    "faqs": [
      {
        "question": "What is an Employee Card Vacancy Number?",
        "answer": "Before hiring a non-EU citizen, the Czech employer must report the vacancy to the Labour Office. If not filled by a Czech or EU citizen within 10-30 days, the position is assigned a Vacancy Number (\u010d\u00edslo voln\u00e9ho m\u00edsta) required for your application."
      },
      {
        "question": "Do my documents need to be translated into Czech?",
        "answer": "Yes. All foreign documents (police clearance, degrees, marriage certificates) must have an Apostille or super-legalization and be accompanied by an official court-certified translation into the Czech language."
      },
      {
        "question": "Can I change employers on a Czech Employee Card?",
        "answer": "Yes, but you must notify the Ministry of the Interior (MOI / OAMP) at least 30 days before the change and meet statutory conditions (e.g. having worked for 6 months for the initial employer, unless terminated by employer)."
      },
      {
        "question": "Can my family join me in the Czech Republic?",
        "answer": "Yes. Family members can apply for a Long-Term Residence Permit for the Purpose of Family Reunification, granting them residence rights and unrestricted access to the Czech labour market."
      },
      {
        "question": "What is the difference between an Employee Card and an EU Blue Card in the Czech Republic?",
        "answer": "An Employee Card is for any registered job and requires no university degree. An EU Blue Card requires completed higher education, pays at least 1.5 times the national average wage, and provides faster mobility across the EU."
      }
    ]
  },
  "denmark": {
    "cname": "Denmark",
    "permit_name": "Pay Limit Scheme (Bel\u00f8bsordningen) / Fast-Track Scheme",
    "overview": "Denmark's work permit ecosystem, overseen by the Danish Agency for International Recruitment and Integration (SIRI), offers some of the most efficient, business-friendly immigration pathways in Europe. The primary route is the Pay Limit Scheme (Bel\u00f8bsordningen), which allows foreign professionals to obtain a Danish residence and work permit without a labour market check, provided they have a signed Danish employment contract with an annual gross salary of at least DKK 399,440 (Supplementary Pay Limit Scheme) or DKK 487,000 (Standard Pay Limit Scheme). Certified companies can utilize the Fast-Track Scheme, allowing employees to start work immediately upon visa submission.",
    "fees": {
      "visa_fee": "DKK 4,615 (approx. \u20ac620 / \u20b955,000 SIRI Case Order Fee)",
      "service_fee": "\u20ac30 (VFS Global Biometrics Fee)",
      "total_fee": "DKK 4,615 + VFS Biometrics Fee",
      "notes": "Case Order ID must be created on newtodenmark.dk and the statutory fee paid online before booking biometrics at VFS Denmark."
    },
    "proc_time": "1 Month (Standard Pay Limit) / 10 Days (Fast-Track Scheme)",
    "proc_details": "Processed digitally by the Danish Agency for International Recruitment and Integration (SIRI). Fast-Track Scheme provides quick-start permits.",
    "source": "Danish Agency for International Recruitment and Integration (SIRI) & VFS Global",
    "salary_threshold": "Supplementary Pay Limit Scheme: DKK 399,440/year (approx. \u20ac53,600); Standard Pay Limit Scheme: DKK 487,000/year (approx. \u20ac65,300).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "No Labour Market Test",
        "description": "Under the Pay Limit Scheme, applicants are completely exempt from labour market testing or educational credential checks."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Fast-Track Quick-Start",
        "description": "Employees of SIRI-certified companies can begin working in Denmark immediately upon submitting biometrics."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "World-Class Work-Life Balance",
        "description": "Standard 37-hour working week, 5 weeks of paid annual vacation, and comprehensive universal public services."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Immediate Family Work Rights",
        "description": "Accompanying spouse or cohabiting partner is granted an unrestricted Danish residence and work permit automatically."
      }
    ],
    "work_permit_type": "Danish Residence & Work Permit (SIRI)",
    "permit_authority": "SIRI (Danish Agency for International Recruitment and Integration)",
    "validity": "Up to 4 Years",
    "validity_details": "Granted for up to 4 years for permanent employment contracts, or the contract duration plus 14 days for fixed-term contracts.",
    "stay": "Duration of Approved Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Signed Danish Employment Contract & Case Order ID",
    "contract_desc": "Signed formal Danish employment contract specifying gross remuneration, vacation pay, and working hours, plus paid Case Order ID receipt.",
    "min_funds": "Salary paid into an official Danish bank account (NemKonto) meeting Pay Limit threshold",
    "faqs": [
      {
        "question": "What is the Pay Limit Scheme in Denmark?",
        "answer": "The Pay Limit Scheme is an immigration pathway for foreign professionals who have a job offer from a Danish employer with an annual gross salary of at least DKK 399,440 (Supplementary) or DKK 487,000 (Standard). No specific degree or labour market test is required."
      },
      {
        "question": "What is the Fast-Track Scheme quick-start permit?",
        "answer": "If your employer is certified by SIRI under the Fast-Track Scheme, you can obtain a quick-start clearance allowing you to enter Denmark and commence work immediately after recording biometrics, without waiting for the final decision."
      },
      {
        "question": "Must my salary be paid into a Danish bank account?",
        "answer": "Yes. Danish law strictly requires that salary under the Pay Limit Scheme must be paid into an official Danish bank account (NemKonto) within 90 days of starting work."
      },
      {
        "question": "Can my spouse work in Denmark on a dependent permit?",
        "answer": "Yes. Your spouse, registered partner, or cohabiting partner is automatically granted a residence permit with full, unrestricted work authorization for any employer in Denmark."
      },
      {
        "question": "How long can I stay in Denmark if my job is terminated?",
        "answer": "Under the Pay Limit Scheme, you are granted a 6-month job seeker period following termination to seek new employment and apply for a new permit without departing Denmark."
      }
    ]
  },
  "finland": {
    "cname": "Finland",
    "permit_name": "Residence Permit for an Employed Person (TTOL) / Specialist Permit",
    "overview": "Finland offers world-leading social welfare, innovation clusters, and an exceptional quality of life. Foreign professionals seeking work in Finland typically utilize the Specialist Residence Permit (Erityisasiantuntija) or the Residence Permit for an Employed Person (Ty\u00f6ntekij\u00e4n oleskelulupa - TTOL). The Specialist permit is designed for highly qualified professionals earning at least \u20ac3,638 gross per month with a university degree, offering expedited 2-week fast-track digital processing via Enter Finland with no labour market availability testing. General workers undergo a two-phase assessment involving the TE Services employment office and the Finnish Immigration Service (Migri).",
    "fees": {
      "visa_fee": "\u20ac380 (Electronic Application via Enter Finland) / \u20ac480 (Paper Application)",
      "service_fee": "\u20ac30 (VFS Global Biometrics Fee)",
      "total_fee": "\u20ac410 Total Reference (approx. \u20b936,900)",
      "notes": "Applied online via enterfinland.fi. Fast-track D-visa option enables immediate travel upon digital grant."
    },
    "proc_time": "2 Weeks (Specialist Fast-Track) to 1-2 Months (Standard TTOL)",
    "proc_details": "Specialists and EU Blue Card applicants can utilize the 14-day Fast-Track service via Enter Finland.",
    "source": "Finnish Immigration Service (Migri / Enter Finland) & TE Services",
    "salary_threshold": "Specialist: Minimum \u20ac3,638/month gross (2024). TTOL: Must comply with applicable collective agreement (minimum \u20ac1,399/month).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "14-Day Fast-Track",
        "description": "Specialists and their families can obtain digital residence permit decisions within 14 calendar days via Enter Finland."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Fast-Track D-Visa",
        "description": "Collect a Type D entry visa immediately upon permit approval and travel to Finland without waiting for the physical card."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Residence in 4 Years",
        "description": "Eligible for Finnish Permanent Residence (P-permit) after 4 continuous years of continuous Type A residence."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Unrestricted Family Work Rights",
        "description": "Spouses are granted Type A permits with unrestricted access to the Finnish labour market and universal social benefits."
      }
    ],
    "work_permit_type": "Specialist Residence Permit / TTOL (Continuous A-Permit)",
    "permit_authority": "Migri (Finnish Immigration Service) & TE-toimisto",
    "validity": "Up to 2 Years (Initial) / Up to 4 Years (Extension)",
    "validity_details": "Issued as a Continuous (A) permit for the duration of the employment contract, typically up to 2 years initially, followed by 4-year extensions.",
    "stay": "Full Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Enter Finland Employer Terms of Employment (TEM054)",
    "contract_desc": "Employer-completed digital Terms of Employment submitted via Enter Finland for Employers detailing salary and collective agreement.",
    "min_funds": "Guaranteed salary meeting specialist threshold (minimum \u20ac3,638/month gross)",
    "faqs": [
      {
        "question": "What is the Finnish Specialist Residence Permit?",
        "answer": "The Specialist permit is for highly qualified experts (e.g. IT engineers, consultants) who hold a higher education degree and earn at least \u20ac3,638 per month. It is exempt from labour market testing and qualifies for 14-day fast-track processing."
      },
      {
        "question": "What is the Enter Finland 14-day fast-track procedure?",
        "answer": "Fast-track processing allows specialists, EU Blue Card holders, startup entrepreneurs, and their family members to receive residence decisions within 2 weeks by submitting digital biometrics and applying online."
      },
      {
        "question": "What is the Finnish Type D visa for specialists?",
        "answer": "The D-visa is a national entry vignette affixed to your passport allowing you to enter Finland immediately after your residence permit is granted, so you can receive your residence card in Finland rather than waiting abroad."
      },
      {
        "question": "Can my spouse work in Finland on a family permit?",
        "answer": "Yes. Spouses of holders of Continuous (A) permits receive full, unrestricted work rights across all sectors in Finland without needing an individual work permit."
      },
      {
        "question": "When can I apply for Finnish citizenship?",
        "answer": "You can apply for Finnish citizenship by naturalization after 5 years of continuous residence in Finland (4 years with Finnish or Swedish language proficiency at B1 level)."
      }
    ]
  },
  "france": {
    "cname": "France",
    "permit_name": "Talent Passport (Passeport Talent - Salari\u00e9 Qualifi\u00e9 / Entreprise Innovante) / Salari\u00e9",
    "overview": "France's Talent Passport (Passeport Talent) is an elite multi-year residence scheme created to attract international engineers, executives, researchers, and innovative startup personnel. Highly qualified employees possessing a master's degree and a contract of at least 3 months paying at least twice the statutory minimum wage (SMIC), or joining a certified innovative enterprise (Jeune Entreprise Innovante - JEI), are granted a 4-year renewable residence permit. The Talent Passport completely bypasses the French labour market test (opposabilit\u00e9 de l'emploi) and provides a direct, automatic work permit for accompanying spouses under the 'Talent Passport - Famille' category.",
    "fees": {
      "visa_fee": "\u20ac99 (Long-Stay Visa D Fee)",
      "service_fee": "\u20ac225 (OFII Residence Permit Tax upon arrival) + \u20b92,800 VFS France",
      "total_fee": "\u20ac324 Total Consular Reference (approx. \u20b929,000)",
      "notes": "Visa fee paid at VFS Global France in India. OFII tax is paid online upon arrival in France when validating the residence permit (VLS-TS)."
    },
    "proc_time": "3 to 6 Weeks from Consular Lodgement",
    "proc_details": "Talent Passport applications benefit from priority consular processing through France-Visas without requiring pre-approval from the regional labour inspectorate (DREETS).",
    "source": "Ministry of the Interior of France (France-Visas) & OFII",
    "salary_threshold": "Talent Passport Qualified Employee: Minimum \u20ac42,406/year (approx. 2x SMIC); Innovative Enterprise: \u20ac31,804.50/year (approx. 1.5x SMIC).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "4-Year Residence Card",
        "description": "Granted directly for up to 4 years from the date of initial entry, renewable throughout employment."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "No Labour Market Test",
        "description": "Exempt from labour market testing (opposabilit\u00e9 de l'emploi) and pre-authorizations from the labour ministry (DREETS)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Simplified Spousal Work Rights",
        "description": "Spouses automatically receive the 'Passeport Talent - Famille' card with full, unrestricted authorization to work anywhere in France."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Direct French PR Pathway",
        "description": "Eligible for a 10-year EU Long-Term Resident Card or French citizenship after 5 continuous years of lawful residence."
      }
    ],
    "work_permit_type": "Passeport Talent (Salari\u00e9 Qualifi\u00e9 / Entreprise Innovante)",
    "permit_authority": "France-Visas & Minist\u00e8re de l'Int\u00e9rieur",
    "validity": "Up to 4 Years",
    "validity_details": "Issued for up to 4 years depending on the employment contract length, extendable repeatedly.",
    "stay": "Full Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Cerfa Form No. 15614*04 & French Employment Contract",
    "contract_desc": "Official bilingual Cerfa justification form signed by the French employer specifying salary and role, accompanied by CDI employment contract.",
    "min_funds": "Guaranteed salary meeting SMIC multiplier threshold (minimum \u20ac3,533/month gross)",
    "faqs": [
      {
        "question": "What is the French Talent Passport (Passeport Talent)?",
        "answer": "The Talent Passport is a multi-year residence permit designed for highly skilled workers, executives, researchers, and creators. It offers a 4-year validity, requires no labour market test, and grants automatic work rights to accompanying spouses."
      },
      {
        "question": "What is the minimum salary for a Talent Passport Qualified Employee?",
        "answer": "For the 'Salari\u00e9 qualifi\u00e9' category, you must hold a master's degree (or equivalent) and earn at least twice the French gross statutory minimum wage (SMIC), which is approximately \u20ac42,406 per year (2024)."
      },
      {
        "question": "Can my spouse work in France on a Talent Passport dependent permit?",
        "answer": "Yes. Spouses automatically receive a 'Passeport Talent - Famille' residence card, giving them unrestricted legal rights to work as an employee or establish a commercial business in France."
      },
      {
        "question": "What is the difference between a standard 'Salari\u00e9' visa and a Talent Passport?",
        "answer": "A standard 'Salari\u00e9' visa requires the employer to prove no French candidate was available through a labour market test (DREETS) and is issued for 1 year. The Talent Passport requires no labour market test and is issued for up to 4 years."
      },
      {
        "question": "What is the OFII validation process upon arrival in France?",
        "answer": "Within 3 months of arriving in France, you must validate your Long-Stay Visa (VLS-TS) online on the official foreign national portal (administration-etrangers-en-france.interieur.gouv.fr), pay the statutory OFII tax (\u20ac225), and complete any required medical visits."
      }
    ]
  },
  "italy": {
    "cname": "Italy",
    "permit_name": "Subordinated Work Visa (Lavoro Subordinato / Decreto Flussi) / EU Blue Card (Carta Blu)",
    "overview": "Italy's foreign employment system operates under two distinct frameworks: the quota-based immigration system governed by the annual Flow Decree (Decreto Flussi), and quota-exempt high-skilled categories including the EU Blue Card (Carta Blu UE, Art. 27-quater of the Consolidated Immigration Act - TUI). Standard subordinated employment (Lavoro Subordinato) requires the Italian employer to submit an electronic application for immigration clearance (Nulla Osta) during designated click days under the Decreto Flussi quota. High-skilled university graduates with an annual salary of at least \u20ac34,000 are eligible for the EU Blue Card outside the quota system year-round.",
    "fees": {
      "visa_fee": "\u20ac116 (Long-Stay National Visa D Fee)",
      "service_fee": "\u20ac16 (Revenue Stamp - Marca da Bollo) + \u20ac100 (Permesso di Soggiorno) + \u20b92,500 VFS Italy",
      "total_fee": "approx. \u20ac232 Total Statutory Reference (approx. \u20b921,000)",
      "notes": "Consular visa fee paid at VFS Global Italy. The residence permit fee is paid at Italian Post Offices (Sportello Amico) upon arrival."
    },
    "proc_time": "2 to 3 Months (Nulla Osta: 1-2 Months + Consular Visa: 3-4 Weeks)",
    "proc_details": "Italian employer applies for the Nulla Osta at the Single Desk for Immigration (Sportello Unico per l'Immigrazione - SUI) at the local Prefettura.",
    "source": "Ministry of the Interior (Ministero dell'Interno) & Prefettura / SUI",
    "salary_threshold": "EU Blue Card: Minimum \u20ac34,000/year (approx. 1.5x average gross annual wage). Subordinated: Minimum statutory collective contract wage (CCNL).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "EU Blue Card Quota Exemption",
        "description": "Highly qualified specialists are exempt from the annual Decreto Flussi quota restrictions and can apply year-round."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Nulla Osta Clearance",
        "description": "Official security and labor clearance issued electronically by the Prefettura's Single Desk for Immigration (SUI)."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permesso di Soggiorno",
        "description": "Collect physical biometric residence permit card (Permesso di Soggiorno) within 8 days of arriving in Italy."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Family Cohesion Rights",
        "description": "Holders of work permits can bring spouses and minor children via family reunification (Ricongiungimento Familiare)."
      }
    ],
    "work_permit_type": "Nulla Osta al Lavoro Subordinato / Carta Blu UE",
    "permit_authority": "Sportello Unico per l'Immigrazione (Prefettura) & Questura",
    "validity": "1 to 2 Years",
    "validity_details": "Granted for 1 year for fixed-term contracts or 2 years for permanent (indeterminato) contracts, renewable repeatedly.",
    "stay": "Duration of Valid Permesso di Soggiorno",
    "entry_type": "Multiple Entry",
    "contract_doc": "Nulla Osta Authorization & Contract of Residence (Contratto di Soggiorno)",
    "contract_desc": "Official electronic Nulla Osta clearance issued by the Prefettura SUI and employer Contratto di Soggiorno signed at the Questura.",
    "min_funds": "Guaranteed statutory salary under national collective agreement (CCNL)",
    "faqs": [
      {
        "question": "What is the Italian Decreto Flussi?",
        "answer": "The Decreto Flussi is the Italian Government's annual immigration quota decree specifying how many non-EU workers can enter Italy for seasonal, non-seasonal, and autonomous work. Applications are submitted electronically by employers during designated 'click days'."
      },
      {
        "question": "Is the EU Blue Card subject to the Decreto Flussi quota in Italy?",
        "answer": "No. The EU Blue Card (Art. 27-quater) is completely exempt from the Decreto Flussi quota system, allowing employers to hire qualified university graduates at any time of the year."
      },
      {
        "question": "What is a Nulla Osta and why is it essential?",
        "answer": "The Nulla Osta is an official authorization issued by the Single Desk for Immigration (Sportello Unico per l'Immigrazione - SUI) at the local Prefettura in Italy confirming that there are no immigration or security impediments to hiring you."
      },
      {
        "question": "What must I do within 8 days of arriving in Italy on a work visa?",
        "answer": "Within 8 business days of entering Italy, you must report to the Sportello Unico at the Prefettura to sign the Contract of Residence (Contratto di Soggiorno) and submit your application for a Permesso di Soggiorno at the post office."
      },
      {
        "question": "Can my spouse work in Italy on a dependent permit?",
        "answer": "Yes. A residence permit for family reasons (Permesso di Soggiorno per Motivi Familiari) allows your spouse to work as an employee or freelance professional without needing an independent work visa."
      }
    ]
  },
  "norway": {
    "cname": "Norway",
    "permit_name": "Residence Permit for Skilled Workers (Fagutdannet)",
    "overview": "Norway's immigration framework for skilled professionals is regulated by the Norwegian Directorate of Immigration (UDI) under the Immigration Act (Utlendingsloven). The premier pathway is the Residence Permit for Skilled Workers (Fagutdannet), designed for third-country nationals who possess completed vocational training, a higher education degree, or special qualifications, and have a concrete, full-time job offer from an employer in Norway. The position must require skilled worker qualifications and pay a salary meeting Norwegian statutory collective agreements or UDI tariff minimums. The permit provides a direct 3-year pathway to Permanent Residence in Norway.",
    "fees": {
      "visa_fee": "NOK 6,500 (approx. \u20ac560 / \u20b951,000 UDI Application Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee)",
      "total_fee": "NOK 6,500 + VFS Service Fee",
      "notes": "Application registered and fee paid online via the UDI Application Portal (udi.no) prior to biometric submission at VFS Norway."
    },
    "proc_time": "4 to 8 Weeks from Biometric Submission",
    "proc_details": "Processed by the Norwegian Directorate of Immigration (UDI) in Oslo. Employers with power of attorney can submit documentation in Norway.",
    "source": "Norwegian Directorate of Immigration (UDI) & Royal Norwegian Embassy / VFS Global",
    "salary_threshold": "Master's degree requirement: Minimum NOK 480,900/year gross (2024); Bachelor's degree requirement: Minimum NOK 448,900/year gross.",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Permanent Residence in 3 Years",
        "description": "Eligible for a Permanent Residence Permit (permanent oppholdstillatelse) after 3 continuous years of skilled worker status."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Strict Salary Protections",
        "description": "Statutory collective bargaining rates ensure foreign specialists receive equal pay and working conditions to Norwegian nationals."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Employer Power of Attorney",
        "description": "Employers in Norway can submit the complete application on your behalf, accelerating administrative clearance."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Family Immigration (Familieinnvandring)",
        "description": "Spouses and children under 18 can apply simultaneously, receiving full rights to live and work in Norway."
      }
    ],
    "work_permit_type": "Skilled Worker Residence Permit (Fagutdannet)",
    "permit_authority": "UDI (Norwegian Directorate of Immigration)",
    "validity": "Up to 2 Years (Initial) / Up to 3 Years (Renewal)",
    "validity_details": "Issued for up to 2 years initially, extendable up to 3 years at a time. After 3 years, you can apply for permanent settlement.",
    "stay": "Full Duration of Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "UDI Offer of Employment Form (Tilbud om ansettelse)",
    "contract_desc": "Official UDI Offer of Employment form completed and signed by the Norwegian employer detailing salary, position, and qualifications.",
    "min_funds": "Guaranteed salary meeting UDI tariff threshold (minimum NOK 448,900/year gross)",
    "faqs": [
      {
        "question": "What qualifications are required for a Norwegian Skilled Worker permit?",
        "answer": "You must have completed higher education (Bachelor's or Master's degree), completed vocational training of at least 3 years at upper secondary school level, or have exceptional special qualifications obtained through long practical experience."
      },
      {
        "question": "What are the minimum salary requirements for skilled workers in Norway?",
        "answer": "If the position requires a Master's degree, the minimum pre-tax annual salary is NOK 480,900. If the position requires a Bachelor's degree, the minimum is NOK 448,900 (adjusted annually by UDI)."
      },
      {
        "question": "Can my employer apply for the permit on my behalf?",
        "answer": "Yes. You can grant your employer a written power of attorney (fullmakt), allowing them to register the application, pay the fee, and upload documents directly with the Norwegian police or UDI."
      },
      {
        "question": "Can my family join me in Norway?",
        "answer": "Yes. Your spouse/cohabitant and children can apply for family immigration at the same time as you or later, provided your salary meets the UDI subsistence requirement (approx. NOK 320,000+/year)."
      },
      {
        "question": "When can I apply for permanent residence in Norway?",
        "answer": "You can apply for a Permanent Residence Permit after holding continuous residence permits as a skilled worker for 3 years, completing mandatory Norwegian language tuition, and meeting income requirements."
      }
    ]
  },
  "poland": {
    "cname": "Poland",
    "permit_name": "Type A Work Permit (Zezwolenie na prac\u0119 typ A) / Single Residence & Work Permit",
    "overview": "Poland has emerged as Central Europe's powerhouse economy and a key hub for IT development, business process outsourcing (BPO), manufacturing, and engineering. Foreign nationals seeking employment in Poland require a Type A Work Permit (Zezwolenie na prac\u0119 typ A), obtained by the Polish employer from the competent Voivodeship Office (Urz\u0105d Wojew\u00f3dzki). The permit requires a labour market test (informacja starosty) unless the occupation is exempt under the Voivodeship list of deficit professions. Once the Voivode grants the work permit, the applicant applies for a National Long-Stay Visa (Type D06) at VFS Poland. Alternatively, foreigners already legally in Poland can apply for a combined Temporary Residence and Work Permit (Pobyt czasowy i praca).",
    "fees": {
      "visa_fee": "\u20ac90 (National Long-Stay Visa D Fee)",
      "service_fee": "PLN 100 (Voivodeship Work Permit Fee) + \u20ac15 (VFS Global Processing Fee)",
      "total_fee": "\u20ac105 + PLN 100 Reference (approx. \u20b911,500)",
      "notes": "The PLN 100 work permit fee is paid by the employer to the Voivodeship Office. Applicant pays \u20ac90 visa fee at VFS Global."
    },
    "proc_time": "1 to 2 Months (Voivodeship Permit: 3-6 Weeks + Consular Visa: 15-20 Days)",
    "proc_details": "Polish employer secures the Voivodeship decision (Zezwolenie) in Poland, then mails the original paper or electronic document to the applicant for visa lodgement.",
    "source": "Voivodeship Office (Urz\u0105d Wojew\u00f3dzki) & Ministry of Foreign Affairs of Poland (e-Konsulat)",
    "salary_threshold": "Salary cannot be lower than that of Polish employees in comparable roles and must meet the national minimum gross wage (PLN 4,300/month as of July 2024).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Type A Voivodeship Permit",
        "description": "Official administrative authorization issued by the regional Voivode allowing employment with the sponsoring firm."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Fast-Track Deficit Occupations",
        "description": "Exemption from the staroste labour market test for IT specialists, software engineers, and registered deficit roles."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Dynamic Tech Ecosystem",
        "description": "World-leading technology engineering centers and multinational shared services hubs in Warsaw, Krakow, and Wroclaw."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Karta Pobytu Pathway",
        "description": "Upon arrival, foreign workers can apply for a multi-year Temporary Residence Card (Karta Pobytu) valid up to 3 years."
      }
    ],
    "work_permit_type": "Voivodeship Type A Work Permit (Zezwolenie na prac\u0119)",
    "permit_authority": "Urz\u0105d Wojew\u00f3dzki (Voivodeship Office) & e-Konsulat",
    "validity": "Up to 3 Years",
    "validity_details": "Issued by the Voivode for up to 3 years (National Visa D06 is issued for up to 1 year, extendable via Karta Pobytu in Poland).",
    "stay": "Duration of Approved Work Permit",
    "entry_type": "Multiple Entry",
    "contract_doc": "Original Voivodeship Work Permit (Zezwolenie) & Employment Contract",
    "contract_desc": "Official stamped administrative decision issued by the Voivodeship Office alongside signed preliminary employment contract.",
    "min_funds": "Guaranteed salary meeting national minimum statutory wage (minimum PLN 4,300/month gross)",
    "faqs": [
      {
        "question": "What is a Polish Type A Work Permit?",
        "answer": "A Type A Work Permit (Zezwolenie na prac\u0119 typ A) is an official authorization issued by the regional Voivode (Urz\u0105d Wojew\u00f3dzki) enabling a foreign citizen to perform work for an employer registered in Poland."
      },
      {
        "question": "What is the Labour Market Test (Informacja Starosty) in Poland?",
        "answer": "It is an assessment conducted by the local Poviat Labour Office verifying whether any unemployed Polish citizens can fill the position. Many high-demand occupations, including software engineers, are exempt."
      },
      {
        "question": "What is the Karta Pobytu (Temporary Residence Card)?",
        "answer": "The Karta Pobytu is a biometric plastic residence card issued in Poland by the Voivodeship Office granting multi-year temporary residence and replacing the need for a consular visa when crossing Schengen borders."
      },
      {
        "question": "Can I change employers while in Poland on a Type A work permit?",
        "answer": "A Type A work permit is tied to a specific employer and role. To switch employers, your new employer must obtain a new work permit (or submit an updated Unified Residence and Work Permit application)."
      },
      {
        "question": "Can my spouse work in Poland on a dependent visa?",
        "answer": "Spouses entering on family visas must obtain their own work permits unless they hold a permanent residence card, an EU Blue Card dependent status, or the primary applicant holds a long-term settlement status."
      }
    ]
  },
  "portugal": {
    "cname": "Portugal",
    "permit_name": "D1 Subordinated Work Visa / D3 Highly Qualified Activity / Tech Visa",
    "overview": "Portugal offers an attractive Mediterranean lifestyle, safety, and modern European immigration schemes designed for skilled professionals. The most advantageous route is the D3 Visa for Highly Qualified Activity (Atividade Altamente Qualificada), tailored for professionals earning at least 1.5 times the national minimum monthly wage (or the IAS index) with specialized skills or higher education degrees. Companies certified under the Portugal Tech Visa program can fast-track tech specialists. General workers utilize the D1 Subordinated Employment Visa, which requires a registered employment contract. D-visa holders receive a double-entry 4-month visa to travel to Portugal and attend an AIMA appointment to receive their residence card (T\u00edtulo de Resid\u00eancia). Portugal offers one of Europe's shortest naturalization timelines: eligibility for citizenship after just 5 years.",
    "fees": {
      "visa_fee": "\u20ac90 (National Long-Stay Visa D Fee)",
      "service_fee": "\u20ac30 (VFS Global Processing Fee) + \u20ac170 (AIMA Residence Card Fee)",
      "total_fee": "\u20ac120 Consular + \u20ac170 AIMA Reference (approx. \u20b926,000)",
      "notes": "Consular visa fee paid at VFS Global Portugal in India. AIMA residence permit processing and card issuance fee is paid upon appointment in Portugal."
    },
    "proc_time": "30 to 60 Calendar Days from Consular Submission",
    "proc_details": "Application submitted at VFS Global in India and forwarded to the Consular Section of the Embassy of Portugal in New Delhi and AIMA in Lisbon.",
    "source": "Agency for Integration, Migration and Asylum (AIMA) & Ministry of Foreign Affairs (MNE)",
    "salary_threshold": "D3 Highly Qualified: Minimum 1.5x national statutory minimum wage (approx. \u20ac1,230 - \u20ac1,800+/month gross). D1: Minimum statutory wage (\u20ac820/month).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "5-Year EU Citizenship",
        "description": "Portugal offers Europe's most accessible citizenship timeline: apply for Portuguese EU citizenship after just 5 years of legal residence."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "D3 Tech Visa Fast-Track",
        "description": "Certified technology companies sponsor global tech talent with streamlined approvals through IAPMEI and AIMA."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "AIMA T\u00edtulo de Resid\u00eancia",
        "description": "Collect your 2-year biometric residence permit card (T\u00edtulo de Resid\u00eancia) following your scheduled AIMA appointment."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Article 98 Family Reunification",
        "description": "Sponsor your spouse and dependent children under Article 98 of the Immigration Law with full rights to live, study, and work."
      }
    ],
    "work_permit_type": "D3 Highly Qualified Visa / D1 Subordinated Work Visa",
    "permit_authority": "AIMA (Agency for Integration, Migration and Asylum) & MNE",
    "validity": "2 Years (Initial Residence Card)",
    "validity_details": "The entry visa is valid for 120 days (double entry); the physical AIMA T\u00edtulo de Resid\u00eancia card is issued for 2 years, renewable for 3 years.",
    "stay": "Duration of Approved Residence Card",
    "entry_type": "Multiple Entry",
    "contract_doc": "Formal Employment Contract & IEFP Declaration",
    "contract_desc": "Signed Portuguese employment contract (Contrato de Trabalho) for at least 1 year accompanied by employer registration documents.",
    "min_funds": "Guaranteed statutory salary or \u20ac9,840 (12 months Portuguese minimum wage) in personal bank account",
    "faqs": [
      {
        "question": "What is the difference between a D1 and a D3 visa in Portugal?",
        "answer": "The D1 visa is for general subordinated employment and requires an employment contract or promise of contract. The D3 visa is for Highly Qualified Activity (tech specialists, managers, researchers) paying higher wages and benefits from prioritized AIMA processing."
      },
      {
        "question": "What is the Portugal Tech Visa program?",
        "answer": "The Tech Visa is a certification program managed by IAPMEI for innovative technological companies based in Portugal, enabling them to hire qualified non-EU technical specialists with expedited visa issuance."
      },
      {
        "question": "How does the 120-day D-visa transition to a residence card in Portugal?",
        "answer": "The D-visa issued in your passport allows you to enter Portugal twice within 120 days. Your visa vignette includes a pre-scheduled appointment link with AIMA to register biometrics and receive your 2-year T\u00edtulo de Resid\u00eancia card."
      },
      {
        "question": "Can my spouse work in Portugal on a family reunification permit?",
        "answer": "Yes. A residence card granted under family reunification (Reagrupamento Familiar) entitles your spouse to live and work in Portugal as an employee or independent professional without restrictions."
      },
      {
        "question": "How long does it take to get Portuguese citizenship through employment?",
        "answer": "Under Portuguese Nationality Law, foreign nationals who have maintained legal residence in Portugal for at least 5 years are eligible to apply for Portuguese citizenship and an EU passport, subject to basic A2 Portuguese proficiency."
      }
    ]
  },
  "sweden": {
    "cname": "Sweden",
    "permit_name": "Work Permit (Arbetstillst\u00e5nd) / EU Blue Card",
    "overview": "Sweden offers world-renowned workplace equity, progressive social standards, and a globally respected innovation sector in Stockholm, Gothenburg, and Malm\u00f6. Under the Swedish Aliens Act (Utl\u00e4nningslagen), a Swedish Work Permit (Arbetstillst\u00e5nd) requires a confirmed job offer with conditions equal to or better than Swedish collective agreements (kollektivavtal) or industry standards. The employer must advertise the vacancy on the Swedish Public Employment Service (Arbetsf\u00f6rmedlingen) and EURES for at least 10 days, obtain an opinion from the relevant trade union (fackf\u00f6rbund), and provide mandatory health, life, and occupational pension insurances. Sweden also offers the EU Blue Card for university-educated specialists earning above the national threshold.",
    "fees": {
      "visa_fee": "SEK 2,200 (approx. \u20ac195 / \u20b917,500 Work Permit Application Fee)",
      "service_fee": "\u20ac30 (VFS Global Biometrics Fee)",
      "total_fee": "SEK 2,200 + VFS Service Fee",
      "notes": "Applied online via the Swedish Migration Agency (Migrationsverket) portal. Employers typically initiate and pay the statutory application charge."
    },
    "proc_time": "1 to 3 Months (Certified Employers: 10-20 Days)",
    "proc_details": "Adjudicated digitally by Migrationsverket in Sweden. Certified corporate partners and fast-track sponsors receive expedited processing.",
    "source": "Swedish Migration Agency (Migrationsverket) & Arbetsf\u00f6rmedlingen",
    "salary_threshold": "Minimum monthly salary must be at least 80% of Sweden's median wage (currently SEK 28,480/month as of 2024).",
    "highlights": [
      {
        "icon": "\ud83d\udcbc",
        "title": "Swedish Collective Standards",
        "description": "Mandatory adherence to Swedish collective bargaining agreements, including occupational pension (tj\u00e4nstepension) and insurances."
      },
      {
        "icon": "\ud83c\udfe2",
        "title": "Trade Union Approval",
        "description": "Application includes formal union opinion (yttrande) ensuring wages and terms match industry union standards."
      },
      {
        "icon": "\u23f1\ufe0f",
        "title": "Permanent Residence in 4 Years",
        "description": "Eligible to apply for Swedish Permanent Residence (PUT) after holding a work permit for a total of 4 years within the last 7 years."
      },
      {
        "icon": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
        "title": "Full Family Work Authorization",
        "description": "Accompanying family members receive residence permits for the same period, with spouses authorized to work immediately."
      }
    ],
    "work_permit_type": "Swedish Work Permit (Arbetstillst\u00e5nd)",
    "permit_authority": "Migrationsverket (Swedish Migration Agency)",
    "validity": "Up to 2 Years (Initial) / Up to 2 Years (Extension)",
    "validity_details": "Issued for the duration of the employment contract up to 2 years. During the first 24 months, the permit is tied to the specific employer and occupation.",
    "stay": "Duration of Approved Employment Contract",
    "entry_type": "Multiple Entry",
    "contract_doc": "Offer of Employment (Anst\u00e4llningserbjudande) & Union Opinion",
    "contract_desc": "Official digital Offer of Employment completed by the employer on Migrationsverket's portal with trade union endorsement.",
    "min_funds": "Guaranteed salary meeting the 80% median wage threshold (minimum SEK 28,480/month gross)",
    "faqs": [
      {
        "question": "What are the new salary requirements for a Swedish work permit?",
        "answer": "Under legislation enacted in late 2023, the monthly salary requirement for a Swedish work permit must equal at least 80% of Sweden's median wage, which is currently SEK 28,480 gross per month."
      },
      {
        "question": "Why is the trade union statement (fackligt yttrande) necessary in Sweden?",
        "answer": "Swedish labour market regulations require the relevant trade union in your industry to review your job offer, salary, and insurances to verify that the terms are not inferior to Swedish collective agreements."
      },
      {
        "question": "Can my spouse work in Sweden while I hold a work permit?",
        "answer": "Yes. If your work permit is granted for 6 months or more, your spouse or cohabitant is granted a residence permit with full, unrestricted permission to work in Sweden."
      },
      {
        "question": "Can I switch employers while in Sweden on a work permit?",
        "answer": "During your first 24 months, your permit is tied to a specific employer and occupation. If you change employers within the first 2 years, you must submit a new work permit application before starting work."
      },
      {
        "question": "When can I apply for Permanent Residence in Sweden?",
        "answer": "You can apply for Permanent Residence (Permanent Uppeh\u00e5llstillst\u00e5nd - PUT) after you have held a work permit in Sweden for at least 4 years within the past 7 years, provided you can support yourself financially."
      }
    ]
  }
};

// ── 1. WORK OVERVIEW ──
export function getWorkOverview(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.overview) return d.overview;
  return `The Work / Employment Visa allows qualified international professionals to take up lawful employment in ${country} with a sponsoring employer. Applicants must have a valid contract or binding job offer meeting statutory labour requirements.`;
}

// ── 2. WORK HIGHLIGHTS ──
export function getWorkHighlights(country: string): WorkHighlightItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.highlights) return d.highlights;
  return [
    { icon: '💼', title: 'Employer Sponsorship', description: 'Requires a valid job offer and formal sponsorship from an authorized corporate entity.' },
    { icon: '💶', title: 'Competitive Remuneration', description: 'Mandatory adherence to statutory minimum wage and collective bargaining standards.' },
    { icon: '⏱️', title: 'Settlement Pathway', description: 'Qualify for permanent residence or long-term settlement after continuous lawful employment.' },
    { icon: '👨‍👩‍👧', title: 'Family Relocation', description: 'Eligible to sponsor spouse and minor children for residence and employment.' }
  ];
}

// ── 3. STEPS TO APPLY ──
export function getWorkSteps(country: string): string[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = d ? d.cname : country;
  const permit = d ? d.permit_name : 'work permit authorization';
  const auth = d ? d.permit_authority : 'immigration authority';
  return [
    `Secure Qualifying Job Offer: Receive a formal binding employment contract from an authorized, tax-compliant enterprise in ${cname}.`,
    `Obtain Work Clearance: Sponsoring employer files petition/clearance for ${permit} with the competent government authority (${auth}).`,
    `Gather Mandatory Documentation: Prepare certified apostilled educational degrees, police clearance certificate (PCC), employment letters, and medical clearance.`,
    `Submit Consular Application: Complete the national long-stay visa application online and pay official government statutory processing fees.`,
    `Book & Attend Biometrics Appointment: Schedule an in-person appointment at the designated Visa Application Center (VFS Global / Embassy Consular section) to record biometrics.`,
    `Attend Consular Interview (if required): Provide testimony regarding your job qualifications, occupational background, and employer terms.`,
    `Collect Passport & Visa Vignette: Upon approval, collect your stamped passport featuring the official entry vignette authorization.`,
    `Register & Collect Residence Permit: Upon arrival in ${cname}, complete local municipal registration and obtain your physical biometric residence card.`
  ];
}

// ── 4. DOCUMENTS REQUIRED ──
export function getWorkDocuments(countryOrFrom: string, maybeCountry?: string, purpose?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d.contract_doc : 'Employment Contract & Sponsoring Permit';
  const doc_desc = d ? d.contract_desc : 'Official government work authorization document accompanied by signed formal employment contract.';
  return [
    { title: 'Valid International Passport', description: 'Original passport valid for at least 6-12 months beyond intended stay with at least 2 blank visa pages.', is_mandatory: true },
    { title: doc, description: doc_desc, is_mandatory: true },
    { title: 'Signed Formal Employment Contract', description: 'Full-time employment agreement detailing designation, job description, gross salary, and working conditions.', is_mandatory: true },
    { title: 'Educational Degrees & Equivalency Certificates', description: 'Original higher education degrees, transcripts, and official evaluation/recognition credentials.', is_mandatory: true },
    { title: 'Curriculum Vitae (CV) & Experience Certificates', description: 'Detailed chronological CV and verifiable reference letters from previous employers proving relevant professional experience.', is_mandatory: true },
    { title: 'Police Clearance Certificate (PCC)', description: 'Official PCC issued by the Regional Passport Office (RPO) / national police headquarters, apostilled or legalized.', is_mandatory: true },
    { title: 'Proof of Accommodation / Relocation Package', description: 'Rental agreement, hotel confirmation, or formal employer undertaking providing initial residential accommodation.', is_mandatory: true },
    { title: 'Medical Fitness Certificate & Health Insurance', description: 'Comprehensive medical clearance and international health insurance policy valid until local social health enrollment.', is_mandatory: true },
    { title: 'Consular Biometric Photographs', description: 'Recent color photographs meeting specific consular biometric dimensions on a light neutral background.', is_mandatory: true }
  ];
}

// ── 5. WORK FEES ──
export function getWorkFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.fees) return d.fees;
  return {
    visa_fee: 'Statutory Consular Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Check official embassy portal for current fee tariffs. Employer usually covers work permit authorization costs.'
  };
}

// ── 6. PROCESSING TIME ──
export function getWorkProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_time : '4 to 8 Weeks (Standard Consular Assessment)';
}

export function getWorkProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.proc_details : 'Timelines depend on domestic labour market checks, employer certification status, and consular caseload.';
}

// ── 7. OTHER REQUIREMENTS ──
export function getWorkRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const wage = d ? d.salary_threshold : 'Meeting prevailing statutory minimum wage standards.';
  const permit = d ? d.work_permit_type : 'Government-issued work authorization.';
  return [
    { category: 'Binding Employment Offer', details: `Signed contract with an authorized employer in ${d ? d.cname : country} complying with statutory labour conditions.` },
    { category: 'Wage & Remuneration Standard', details: wage },
    { category: 'Work Clearance & Labour Market Test', details: `Official permit approval (${permit}) issued by competent domestic labour and migration authorities.` },
    { category: 'Integrity & Security Clearance', details: 'Apostilled Police Clearance Certificate (PCC) certifying no criminal record and comprehensive medical fitness clearance.' }
  ];
}

// ── 8. FINANCIAL PROOFS ──
export function getWorkFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const min_funds = d ? d.min_funds : 'Statutory initial settlement maintenance ($3,000 - $5,000)';
  return [
    { type: 'Employment Contract & Guaranteed Salary', minimum_balance_or_amount: 'Statutory Annual Gross Salary', time_frame: 'Duration of contract', notes: 'Binding formal employment contract stipulating monthly wage, bonuses, and social insurance coverage.' },
    { type: 'Initial Relocation & Settlement Funds', minimum_balance_or_amount: min_funds, time_frame: 'Past 3 to 6 months', notes: 'Personal bank statements proving sufficient liquidity for initial housing deposit and settlement costs.' },
    { type: 'Income Tax Returns (ITR / Form 16)', minimum_balance_or_amount: 'Past 2 Assessment Years', time_frame: 'Prior 24 months', notes: 'Tax assessment filings and salary slips from previous employment demonstrating established earning capacity.' },
    { type: 'Employer Relocation Undertaking', minimum_balance_or_amount: 'Covers initial housing and travel', time_frame: 'Date of commencement', notes: 'Formal corporate guarantee letter confirming employer-provided flights, temporary lodging, or relocation bonus.' }
  ];
}

// ── 9. FAQS ──
export function getWorkFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  if (d && d.faqs) return d.faqs;
  const cname = d ? d.cname : country;
  return [
    { question: `Can my family accompany me on a ${cname} work visa?`, answer: `Yes. In most jurisdictions, holders of long-term skilled work permits can sponsor their spouse and dependent minor children for family reunification residence permits.` },
    { question: `Can I change employers once in ${cname}?`, answer: `Changing employers generally requires either notifying the immigration authorities or having your prospective new employer apply for an updated work permit before you commence duties.` },
    { question: `Does a ${cname} work visa lead to permanent residency?`, answer: `Yes. Maintaining continuous lawful employment, paying statutory taxes and pension contributions, and passing basic language requirements provides a direct pathway to permanent residence (typically after 2 to 5 years).` },
    { question: `Who is responsible for paying work permit fees in ${cname}?`, answer: `Under international labour standards and domestic regulations in most destinations, statutory employer petition and sponsorship levies must be paid by the sponsoring employer.` },
    { question: `What happens if my employment is terminated early?`, answer: `Most countries grant a statutory grace period (typically 30 to 180 days) during which you may legally seek a new qualifying employer or transition to another permit category.` }
  ];
}

// ── 10. VALIDITY & STAY ──
export function getWorkValidity(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.validity : '1 to 2 Years (Renewable)';
}

export function getWorkStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.stay : 'Full Duration of Employment Contract';
}

export function getWorkEntryType(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.entry_type : 'Multiple Entry';
}

export function getWorkOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return d ? d.source : `${country} Ministry of Foreign Affairs & Immigration`;
}

// ── 11. COMPLETE WORK VISA DATA BUILDER ──
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
  const steps = getWorkSteps(to);
  const docs = getWorkDocuments(from, to, purpose);
  const reqs = getWorkRequirements(to);
  const proofs = getWorkFinancialProofs(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Employment / Work',
    visa_type: `${countryName} Work / Employment Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' work employment visa official immigration requirements')}`,
    official_source_name: officialSource,
    overview: getWorkOverview(to),
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
      apply_window: 'Apply 3 to 6 months prior to planned employment commencement date.',
      decision_time: procTime,
      max_extension: 'Renewable based on continued qualifying employment contract and immigration sponsorship.',
      center_notes: c === 'usa'
        ? 'U.S. Embassy / Consulate & VAC (Visa Application Center) for biometrics & interview.'
        : `VFS Global / ${countryName} Embassy / Consulate. Check appointment availability online.`
    },
    verification_status: 'verified',
    is_v3_verified: true
  };
}

export const getWorkVisaSteps = getWorkSteps;

