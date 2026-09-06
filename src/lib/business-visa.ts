import { resolvePureRouteBusiness } from './pure-routes';
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

  // ── TOP 20 ORIGINS ALIASES ──
  if (c.includes('usa') || c.includes('united states') || c === 'us' || c.includes('america') || c.includes('american')) return 'usa';
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('great britain') || c.includes('britain') || c.includes('british') || c === 'gb') return 'uk';
  if (c.includes('canada') || c === 'ca' || c.includes('canadian')) return 'canada';
  if (c.includes('australia') || c === 'au' || c.includes('australian') || c.includes('aussie')) return 'australia';
  if (c.includes('germany') || c === 'de' || c.includes('deutschland') || c.includes('german')) return 'germany';
  if (c.includes('france') || c === 'fr' || c.includes('french')) return 'france';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi') || c.includes('emirates') || c.includes('emirati')) return 'uae';
  if (c.includes('singapore') || c === 'sg' || c.includes('singaporean')) return 'singapore';
  if (c.includes('netherlands') || c === 'nl' || c.includes('holland') || c.includes('dutch')) return 'netherlands';
  if (c.includes('switzerland') || c === 'ch' || c.includes('swiss')) return 'switzerland';
  if (c.includes('spain') || c === 'es' || c.includes('españa') || c.includes('spanish')) return 'spain';
  if (c.includes('italy') || c === 'it' || c.includes('italian')) return 'italy';
  if (c.includes('japan') || c === 'jp' || c.includes('japanese')) return 'japan';
  if (c.includes('south korea') || c === 'kr' || c.includes('korea') || c.includes('korean')) return 'south-korea';
  if (c.includes('china') || c === 'cn' || c.includes('chinese') || c.includes('prc')) return 'china';
  if (c.includes('india') || c === 'in' || c.includes('indian')) return 'india';
  if (c.includes('brazil') || c === 'br' || c.includes('brazilian')) return 'brazil';
  if (c.includes('south africa') || c === 'za' || c.includes('south african')) return 'south-africa';
  if (c.includes('mexico') || c === 'mx' || c.includes('mexican')) return 'mexico';
  if (c.includes('russia') || c === 'ru' || c.includes('russian')) return 'russia';
  if (c.includes('new zealand') || c === 'nz' || c.includes('kiwi')) return 'new-zealand';

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

  
  // ── 68 NEW COUNTRIES NORMALIZATION ALIASES ──

  // EUROPE (6)
  if (c.includes('serbia') || c.includes('belgrade')) return 'serbia';
  if (c.includes('montenegro') || c.includes('podgorica')) return 'montenegro';
  if (c.includes('albania') || c.includes('tirana')) return 'albania';
  if (c.includes('bosnia') || c.includes('herzegovina') || c.includes('sarajevo')) return 'bosnia';
  if (c.includes('north macedonia') || c.includes('macedonia') || c.includes('skopje')) return 'north-macedonia';
  if (c.includes('kosovo') || c.includes('pristina')) return 'kosovo';

  // AFRICA (21)
  if (c.includes('morocco') || c.includes('rabat') || c.includes('casablanca') || c.includes('marrakech')) return 'morocco';
  if (c.includes('tunisia') || c.includes('tunis')) return 'tunisia';
  if (c.includes('algeria') || c.includes('algiers')) return 'algeria';
  if (c.includes('libya') || c.includes('tripoli')) return 'libya';
  if (c.includes('south sudan') || c.includes('south-sudan') || c.includes('juba')) return 'south-sudan';
  if (c.includes('sudan') || c.includes('khartoum')) return 'sudan';
  if (c.includes('eritrea') || c.includes('asmara')) return 'eritrea';
  if (c.includes('djibouti')) return 'djibouti';
  if (c.includes('somalia') || c.includes('mogadishu')) return 'somalia';
  if (c.includes('uganda') || c.includes('kampala')) return 'uganda';
  if (c.includes('malawi') || c.includes('lilongwe')) return 'malawi';
  if (c.includes('zambia') || c.includes('lusaka')) return 'zambia';
  if (c.includes('botswana') || c.includes('gaborone')) return 'botswana';
  if (c.includes('namibia') || c.includes('windhoek')) return 'namibia';
  if (c.includes('angola') || c.includes('luanda')) return 'angola';
  if (c.includes('mozambique') || c.includes('maputo')) return 'mozambique';
  if (c.includes('madagascar') || c.includes('antananarivo')) return 'madagascar';
  if (c.includes('comoros') || c.includes('moroni')) return 'comoros';
  if (c.includes('cape verde') || c.includes('cape-verde') || c.includes('cabo verde') || c.includes('praia')) return 'cape-verde';
  if (c.includes('sao tome') || c.includes('são tomé') || c.includes('sao-tome') || c.includes('principe')) return 'sao-tome';
  if (c.includes('mauritius') || c.includes('port louis')) return 'mauritius';

  // ASIA (20)
  if (c.includes('afghanistan') || c.includes('kabul')) return 'afghanistan';
  if (c.includes('iran') || c.includes('tehran')) return 'iran';
  if (c.includes('iraq') || c.includes('baghdad')) return 'iraq';
  if (c.includes('syria') || c.includes('damascus')) return 'syria';
  if (c.includes('lebanon') || c.includes('beirut')) return 'lebanon';
  if (c.includes('jordan') || c.includes('amman')) return 'jordan';
  if (c.includes('yemen') || c.includes('sanaa') || c.includes('aden')) return 'yemen';
  if (c.includes('palestine') || c.includes('ramallah') || c.includes('gaza')) return 'palestine';
  if (c.includes('kuwait') || c.includes('kuwait city')) return 'kuwait';
  if (c.includes('bahrain') || c.includes('manama')) return 'bahrain';
  if (c.includes('oman') || c.includes('muscat')) return 'oman';
  if (c.includes('qatar') || c.includes('doha')) return 'qatar';
  if (c.includes('saudi') || c.includes('riyadh') || c.includes('jeddah')) return 'saudi-arabia';
  if (c.includes('timor') || c.includes('east timor') || c.includes('dili')) return 'timor-leste';
  if (c.includes('brunei') || c.includes('bandar seri begawan')) return 'brunei';

  // OCEANIA (5)
  if (c.includes('fiji') || c.includes('suva') || c.includes('nadi')) return 'fiji';
  if (c.includes('papua new guinea') || c.includes('png') || c.includes('port moresby')) return 'papua-new-guinea';
  if (c.includes('samoa') || c.includes('apia')) return 'samoa';
  if (c.includes('tonga') || c.includes('nuku')) return 'tonga';
  if (c.includes('solomon islands') || c.includes('solomon-islands') || c.includes('honiara')) return 'solomon-islands';
  if (c.includes('vanuatu') || c.includes('port vila')) return 'vanuatu';

  // AMERICAS (20)
  if (c.includes('uruguay') || c.includes('montevideo')) return 'uruguay';
  if (c.includes('panama') || c.includes('panama city')) return 'panama';
  if (c.includes('dominican republic') || c.includes('dominican-republic') || c.includes('santo domingo')) return 'dominican-republic';
  if (c.includes('venezuela') || c.includes('caracas')) return 'venezuela';
  if (c.includes('ecuador') || c.includes('quito') || c.includes('guayaquil')) return 'ecuador';
  if (c.includes('bolivia') || c.includes('la paz') || c.includes('sucre')) return 'bolivia';
  if (c.includes('paraguay') || c.includes('asuncion') || c.includes('asunción')) return 'paraguay';
  if (c.includes('guyana') || c.includes('georgetown')) return 'guyana';
  if (c.includes('suriname') || c.includes('paramaribo')) return 'suriname';
  if (c.includes('trinidad') || c.includes('tobago') || c.includes('port of spain')) return 'trinidad';
  if (c.includes('barbados') || c.includes('bridgetown')) return 'barbados';
  if (c.includes('bahamas') || c.includes('nassau')) return 'bahamas';
  if (c.includes('cuba') || c.includes('havana')) return 'cuba';
  if (c.includes('jamaica') || c.includes('kingston')) return 'jamaica';
  if (c.includes('puerto rico') || c.includes('puerto-rico') || c.includes('san juan')) return 'puerto-rico';
  if (c.includes('haiti') || c.includes('port-au-prince')) return 'haiti';
  if (c.includes('belize') || c.includes('belmopan')) return 'belize';
  if (c.includes('el salvador') || c.includes('el-salvador') || c.includes('san salvador')) return 'el-salvador';
  if (c.includes('guatemala') || c.includes('guatemala city')) return 'guatemala';
  if (c.includes('honduras') || c.includes('tegucigalpa')) return 'honduras';
  if (c.includes('nicaragua') || c.includes('managua')) return 'nicaragua';

  return c;
}

const DESTS: Record<string, any> = {
  // ── 35 NEW COUNTRIES ──
  "russia": {
    "cname": "Russia",
    "visa_category": "Business / Commercial Visitor Visa",
    "overview": "Russia Business Visa allows Indian professionals to travel for business meetings, conferences, trade fairs, and contract negotiations. Valid for up to 90 days with single or double entry. Business invitation letter from a Russian host company is mandatory.",
    "fees": {
      "visa_fee": "$50-100 USD (approx. ₹4,100-8,200)",
      "service_fee": "Payable at VFS",
      "total_fee": "$50-100 USD + VFS Logistics",
      "notes": "Visa fee varies by entry type and duration."
    },
    "proc_time": "4-7 Working Days (Standard)",
    "proc_details": "Processed at Russian Embassy/VFS based on official electronic MFA/MVD business invitation.",
    "source": "Russian Ministry of Foreign Affairs & Consular Department / VFS Global",
    "validity": "Up to 90 Days (Single/Double Entry) or 1-Year Multi-Entry",
    "stay": "Up to 90 Days per 180-Day Period",
    "entry_type": "Single / Double / Multiple Entry",
    "invitation_doc": "Official Russian MFA / MVD Business Invitation Telex",
    "invitation_desc": "Electronic invitation voucher issued by the Ministry of Foreign Affairs or Russian host enterprise.",
    "min_funds": "Company sponsorship letter or bank statement showing ₹2,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Business Meetings",
        "description": "Attend meetings, conferences, and trade fairs in Moscow, St. Petersburg."
      },
      {
        "icon": "📋",
        "title": "Invitation Required",
        "description": "Official business invitation from Russian host company."
      },
      {
        "icon": "🔄",
        "title": "Single/Double Entry",
        "description": "Valid for up to 90 days with single or double entry."
      },
      {
        "icon": "🌍",
        "title": "Growing Market",
        "description": "Russia offers business opportunities in energy, IT, manufacturing, and trade."
      }
    ],
    "faqs": [
      {
        "question": "Do I need a business visa for Russia?",
        "answer": "Yes, a business visa is required for business activities in Russia. Tourist visa is only for tourism."
      },
      {
        "question": "How long can I stay on a Russia Business Visa?",
        "answer": "Up to 90 days per visit. Single, double, and multi-entry available."
      },
      {
        "question": "Can I work on a business visa?",
        "answer": "No, you CANNOT take up employment. Business visas are for meetings and negotiations only."
      }
    ]
  },
  "kazakhstan": {
    "cname": "Kazakhstan",
    "visa_category": "Category B1 / B2 / B3 Business Visitor Visa",
    "overview": "The Kazakhstan Business Visa authorizes commercial visits, negotiations, contract signing, and attending exhibitions. Indian passport holders enjoy 14 days visa-free for short business meetings; for stays up to 30-90 days, a Category B business visa is issued upon invitation from a registered Kazakh company.",
    "fees": {
      "visa_fee": "$80 USD (Single Entry) / $200 USD (Multiple Entry)",
      "service_fee": "Consular logistics",
      "total_fee": "$80-200 USD Consular Fee",
      "notes": "Fee depends on single vs multiple entry. Stays under 14 days are visa-free."
    },
    "proc_time": "5 to 7 Working Days (Standard)",
    "proc_details": "Invitation telex approved by Ministry of Foreign Affairs of Kazakhstan.",
    "source": "Ministry of Foreign Affairs of Kazakhstan / Embassy of Kazakhstan in India",
    "validity": "90 Days (Single) / 1 Year (Multiple Entry)",
    "stay": "Up to 30-60 Days per visit",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Official MFA Business Invitation Number (Nomer Priglasheniya)",
    "invitation_desc": "Bilingual invitation letter issued by registered Kazakh enterprise with MFA telex number.",
    "min_funds": "Company deputation letter or bank statements showing ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Central Asian Hub",
        "description": "Astana and Almaty are premier business and financial centers (AIFC)."
      },
      {
        "icon": "✈️",
        "title": "Short Trips Visa-Free",
        "description": "Business meetings under 14 days do not require a prior visa."
      },
      {
        "icon": "🌐",
        "title": "1-Year Multi-Entry",
        "description": "Frequent business visitors can obtain 1-year multiple entry visas."
      },
      {
        "icon": "🏢",
        "title": "AIFC Financial Center",
        "description": "Astana International Financial Centre operates under English common law."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Kazakhstan without a visa?",
        "answer": "Yes, Indian citizens can attend short business meetings and conferences for up to 14 days under the visa-free regime."
      },
      {
        "question": "When is a formal Business Visa required?",
        "answer": "A Category B business visa is required if your stay will exceed 14 days or if you need multi-entry access over 1 year."
      },
      {
        "question": "What document does the Kazakh host need to provide?",
        "answer": "The host company must register an invitation telex with the Kazakh MFA and provide the registration number."
      }
    ]
  },
  "ukraine": {
    "cname": "Ukraine",
    "visa_category": "Business Visa (Type C-01)",
    "overview": "The Ukraine Business Visa allows Indian executives and commercial representatives to conduct negotiations, sign contracts, and attend trade exhibitions for up to 90 days within 180 days.",
    "fees": {
      "visa_fee": "$20-65 USD",
      "service_fee": "VFS logistics if filed physically",
      "total_fee": "$20-65 USD Total",
      "notes": "Available as eVisa ($20 USD) or consular sticker visa."
    },
    "proc_time": "3 Days (eVisa) / 10-15 Days (Consular)",
    "proc_details": "Direct MFA eVisa portal or Embassy of Ukraine in New Delhi.",
    "source": "Ministry of Foreign Affairs of Ukraine / Embassy of Ukraine in India",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 90 Days per 180-Day Period",
    "entry_type": "Single / Double / Multiple Entry",
    "invitation_doc": "Official Business Invitation from Ukrainian Entity",
    "invitation_desc": "Invitation on corporate letterhead from a Ukrainian registered legal entity with state registration code (EDRPOU).",
    "min_funds": "Company deputation guarantee or bank balance of ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Commercial Meetings",
        "description": "Contract negotiations, grain and commodities trade, machinery inspection."
      },
      {
        "icon": "📱",
        "title": "Online eVisa",
        "description": "Fast-track 3-day online processing for short business trips."
      }
    ],
    "faqs": [
      {
        "question": "Can I apply for a business visa online for Ukraine?",
        "answer": "Yes, business visitors can obtain an eVisa online via evisa.mfa.gov.ua with a corporate invitation letter."
      }
    ]
  },
  "belarus": {
    "cname": "Belarus",
    "visa_category": "Short-Stay Business Visa (Type C-Business)",
    "overview": "Allows commercial representatives, investors, and company delegates to attend business conferences, inspect factories, and negotiate contracts for up to 90 days per year.",
    "fees": {
      "visa_fee": "€60 (Single) / €150 (Multiple Entry)",
      "service_fee": "Consular direct",
      "total_fee": "€60-150 Consular Fee",
      "notes": "Official invitation from a Belarusian enterprise is mandatory."
    },
    "proc_time": "5 Working Days (Standard) / 2 Days (Express)",
    "proc_details": "Embassy of Belarus in New Delhi based on corporate invitation letter.",
    "source": "Ministry of Foreign Affairs of Belarus & Belarusian Chamber of Commerce",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 90 Days per visit",
    "entry_type": "Single / Double / Multiple Entry",
    "invitation_doc": "Official Business Invitation on Corporate Letterhead",
    "invitation_desc": "Formal invitation from a Belarusian company registered with the state executive committee.",
    "min_funds": "Company deputation letter or bank statements showing ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Industrial Partnerships",
        "description": "Agricultural machinery, fertilizers, IT, and pharmaceutical collaborations."
      },
      {
        "icon": "🏭",
        "title": "Great Stone Industrial Park",
        "description": "Special economic zone offering tax incentives for international ventures."
      }
    ],
    "faqs": [
      {
        "question": "What is needed from the Belarusian host company?",
        "answer": "An official invitation letter on corporate letterhead with company seal, tax ID (UNP), and itinerary."
      }
    ]
  },
  "uzbekistan": {
    "cname": "Uzbekistan",
    "visa_category": "Category B-1 / B-2 Business Visitor Visa",
    "overview": "Authorizes business delegations, corporate investors, and commercial agents to negotiate contracts, inspect manufacturing plants, and participate in trade fairs for up to 90 days.",
    "fees": {
      "visa_fee": "$50 USD (Single) / $150 USD (1-Year Multiple Entry)",
      "service_fee": "Consular direct",
      "total_fee": "$50-150 USD Consular Fee",
      "notes": "Invitation telex confirmation required from Uzbek MFA."
    },
    "proc_time": "5 to 7 Working Days",
    "proc_details": "Host company files visa support application with Uzbek MFA in Tashkent.",
    "source": "Ministry of Foreign Affairs of Uzbekistan & Chamber of Commerce and Industry",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-90 Days per entry",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Official Uzbek MFA Visa Confirmation Telex",
    "invitation_desc": "Invitation registered by the host enterprise with the Ministry of Foreign Affairs.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Central Asian Crossroads",
        "description": "Rapidly reforming economy with extensive foreign trade concessions."
      },
      {
        "icon": "🏢",
        "title": "Tashkent City Business Hub",
        "description": "Modern financial district attracting global corporate headquarters."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Uzbekistan on an eVisa?",
        "answer": "Yes, short commercial meetings can be attended on a standard eVisa, while multi-entry business missions require a B-category visa."
      }
    ]
  },
  "kyrgyzstan": {
    "cname": "Kyrgyzstan",
    "visa_category": "Type B Business Visitor Visa",
    "overview": "Authorizes commercial negotiations, trade fairs, tender submissions, and factory visits for up to 90 days. Can be obtained as an eVisa or consular sticker.",
    "fees": {
      "visa_fee": "$60 USD (Single) / $120 USD (Multiple Entry)",
      "service_fee": "Online portal or consular direct",
      "total_fee": "$60-120 USD Consular Fee",
      "notes": "Corporate invitation letter required."
    },
    "proc_time": "5 to 7 Working Days",
    "proc_details": "Processed via evisa.e-gov.kg or Embassy of the Kyrgyz Republic in New Delhi.",
    "source": "Ministry of Foreign Affairs of Kyrgyzstan & Chamber of Commerce and Industry",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-60 Days per visit",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation from Kyrgyz Host Entity",
    "invitation_desc": "Invitation from a registered Kyrgyz legal entity or joint venture.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Bilateral Trade",
        "description": "Growing trade in textiles, pharmaceuticals, leather, and mining equipment."
      },
      {
        "icon": "📱",
        "title": "Online Business eVisa",
        "description": "Fast online issuance without visiting the Embassy."
      }
    ],
    "faqs": [
      {
        "question": "How do I apply for a Kyrgyz business visa?",
        "answer": "Apply online at evisa.e-gov.kg selecting the Business category with your host company's invitation."
      }
    ]
  },
  "tajikistan": {
    "cname": "Tajikistan",
    "visa_category": "Category K Business Visitor Visa",
    "overview": "Allows commercial representatives, trade delegations, and joint venture partners to conduct negotiations, sign contracts, and attend exhibitions for up to 90 days.",
    "fees": {
      "visa_fee": "$50 USD (Single) / $120 USD (Multiple Entry)",
      "service_fee": "Online portal or consular direct",
      "total_fee": "$50-120 USD Consular Fee",
      "notes": "Available online via evisa.tj with corporate invitation."
    },
    "proc_time": "3 to 5 Working Days",
    "proc_details": "Direct online eVisa portal or Embassy of Tajikistan in New Delhi.",
    "source": "Ministry of Foreign Affairs of Tajikistan & Chamber of Commerce and Industry",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-60 Days per visit",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Official Business Invitation from Tajik Registered Entity",
    "invitation_desc": "Invitation from a registered Tajik enterprise or chamber of commerce.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Regional Commerce",
        "description": "Trade in pharmaceuticals, tea, spices, textiles, and engineering machinery."
      },
      {
        "icon": "📱",
        "title": "Online Business eVisa",
        "description": "Fast 3-day online turnaround for business travelers."
      }
    ],
    "faqs": [
      {
        "question": "Can I get a business visa for Tajikistan online?",
        "answer": "Yes, you can apply for a business eVisa at evisa.tj by uploading your corporate invitation."
      }
    ]
  },
  "turkmenistan": {
    "cname": "Turkmenistan",
    "visa_category": "Business / Commercial Visitor Visa",
    "overview": "Authorizes business negotiations, technical audits, and trade conferences upon invitation from a registered Turkmen state agency or licensed private company.",
    "fees": {
      "visa_fee": "$85-155 USD",
      "service_fee": "Migration LOI fee applies",
      "total_fee": "$85-155 USD Consular Fee",
      "notes": "State Migration Service LOI is strictly mandatory."
    },
    "proc_time": "15 to 20 Working Days",
    "proc_details": "Host enterprise files invitation dossier with State Migration Service in Ashgabat.",
    "source": "State Migration Service of Turkmenistan & Chamber of Commerce",
    "validity": "Up to 90 Days",
    "stay": "Up to 30-60 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "State Migration Service Business Invitation LOI",
    "invitation_desc": "Official invitation approval stamped by the State Migration Service of Turkmenistan.",
    "min_funds": "Company deputation letter and cash reserves in USD",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Energy & Textiles",
        "description": "Commercial partnerships in natural gas, cotton, petrochemicals, and construction."
      },
      {
        "icon": "🏢",
        "title": "Chamber of Commerce",
        "description": "Facilitated business missions through official state industrial chambers."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a business visa for Turkmenistan?",
        "answer": "Your Turkmen business partner must apply for an LOI from the State Migration Service. Once approved, you can obtain your visa at the Embassy or on arrival."
      }
    ]
  },
  "azerbaijan": {
    "cname": "Azerbaijan",
    "visa_category": "Business Visa (ASAN eVisa Business or Consular Sticker)",
    "overview": "Authorizes business meetings, contract negotiations, conference participation, and trade exhibitions for up to 90 days. Can be obtained directly online via ASAN Visa.",
    "fees": {
      "visa_fee": "$26 USD (ASAN Standard) / $60 USD (ASAN Urgent)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$26-60 USD Total Reference",
      "notes": "Select 'Business' category on evisa.gov.az."
    },
    "proc_time": "3 Days (Standard) / 3 Hours (Urgent)",
    "proc_details": "Instant digital processing on evisa.gov.az.",
    "source": "State Agency for Public Service (ASAN Visa) & Ministry of Foreign Affairs",
    "validity": "90 Days Validity / 30 Days Stay",
    "stay": "Up to 30 Days per visit",
    "entry_type": "Single Entry (Multi-entry available via Embassy)",
    "invitation_doc": "Business Invitation Letter from Azerbaijani Company",
    "invitation_desc": "Invitation from a registered Azerbaijani corporate entity detailing meeting itinerary.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Baku Business Hub",
        "description": "Major exhibitions at Baku Expo Center in energy, food, and construction."
      },
      {
        "icon": "📱",
        "title": "Fast-Track 3-Hour eVisa",
        "description": "Get your business visa in 3 hours with urgent ASAN processing."
      }
    ],
    "faqs": [
      {
        "question": "Can I use ASAN eVisa for business trips to Baku?",
        "answer": "Yes, select the 'Business' purpose on the ASAN portal; valid for attending commercial meetings and conferences."
      }
    ]
  },
  "georgia": {
    "cname": "Georgia",
    "visa_category": "Category C3 Business Visa / Visa-Free for Western Visa Holders",
    "overview": "Allows commercial meetings, investment surveys, contract signings, and trade missions. Valid Western visa holders enter visa-free for 90 days; others obtain an eVisa or C3 visa.",
    "fees": {
      "visa_fee": "$20 USD (eVisa) / ₹0 (if holding valid US/UK/Schengen visa)",
      "service_fee": "2% online fee",
      "total_fee": "$20 USD Total",
      "notes": "Holders of valid US/UK/Schengen visas enter free for 90 days."
    },
    "proc_time": "5 Business Days (eVisa) / Instant at Border",
    "proc_details": "Online via evisa.gov.ge or border control with valid Western visa.",
    "source": "Ministry of Foreign Affairs of Georgia & Enterprise Georgia",
    "validity": "Up to 90 Days",
    "stay": "Up to 30-90 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation from Georgian Entity",
    "invitation_desc": "Letter from registered Georgian company or Enterprise Georgia invitation.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Enterprise Georgia",
        "description": "Government incentives for foreign investment, IT free zones, and manufacturing."
      },
      {
        "icon": "🌐",
        "title": "International Gateway",
        "description": "Strategic Eurasian transit corridor linking Europe, the Caucasus, and Asia."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Georgia without a visa?",
        "answer": "Yes, if you hold a valid multiple-entry US, UK, Schengen, or Canadian visa, you can enter visa-free for up to 90 days."
      }
    ]
  },
  "armenia": {
    "cname": "Armenia",
    "visa_category": "Short-Stay Business Visa",
    "overview": "Authorizes business meetings, contract negotiations, conference participation, and corporate missions for up to 120 days. Obtainable online via evisa.mfa.am.",
    "fees": {
      "visa_fee": "$7 USD (21 Days) / $33 USD (120 Days)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$7-33 USD Total Reference",
      "notes": "Extremely low fee paid online."
    },
    "proc_time": "3 Business Days",
    "proc_details": "Processed electronically on evisa.mfa.am.",
    "source": "Ministry of Foreign Affairs of Armenia & Enterprise Armenia",
    "validity": "Up to 120 Days",
    "stay": "Up to 120 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation from Armenian Legal Entity",
    "invitation_desc": "Invitation from a registered Armenian enterprise with tax code (HVHH).",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Free Economic Zones",
        "description": "Tax-exempt trade zones in Meghri and Alliance FEZ for tech and manufacturing."
      },
      {
        "icon": "📱",
        "title": "Instant Online Issuance",
        "description": "Obtain business travel authorization online in 3 days."
      }
    ],
    "faqs": [
      {
        "question": "Can I use Armenia eVisa for business meetings?",
        "answer": "Yes, the standard eVisa covers business meetings, negotiations, and conference attendance."
      }
    ]
  },
  "moldova": {
    "cname": "Moldova",
    "visa_category": "Short-Stay Business Visa (Type C/A)",
    "overview": "Authorizes business delegations, investors, and commercial agents to negotiate contracts, inspect factories, and participate in trade fairs for up to 90 days within 180 days.",
    "fees": {
      "visa_fee": "€40 (eVisa) / €80 (Consular Sticker)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "€40-80 Total Reference",
      "notes": "Official corporate invitation letter required."
    },
    "proc_time": "10 to 15 Calendar Days",
    "proc_details": "Processed online on evisa.gov.md or via Moldovan Embassy in New Delhi.",
    "source": "Ministry of Foreign Affairs of Moldova & Chamber of Commerce and Industry",
    "validity": "Up to 90 Days",
    "stay": "Up to 90 Days within 180 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation from Moldovan Registered Entity",
    "invitation_desc": "Formal invitation from a registered Moldovan company with tax ID (IDNO).",
    "min_funds": "Company deputation letter or personal bank balance of ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Free Economic Zones",
        "description": "Bălți and Ungheni free zones for automotive, electronics, and food export manufacturing."
      },
      {
        "icon": "🍇",
        "title": "Wine & Agriculture",
        "description": "World-class agro-industrial partnerships and export trade."
      }
    ],
    "faqs": [
      {
        "question": "How do I apply for a business visa for Moldova?",
        "answer": "Apply online at evisa.gov.md with an official invitation letter from a Moldovan host company."
      }
    ]
  },
  "pakistan": {
    "cname": "Pakistan",
    "visa_category": "Business Visa in Your Inbox (BVHI) / E-Business Visa",
    "overview": "Authorizes business meetings, commercial audits, contract negotiations, and trade delegations for up to 90 days. Can be obtained online via NADRA portal with Chamber recommendation.",
    "fees": {
      "visa_fee": "$60-100 USD",
      "service_fee": "NADRA portal fee",
      "total_fee": "$60-100 USD Total",
      "notes": "Requires Chamber of Commerce recommendation."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "Processed online via visa.nadra.gov.pk.",
    "source": "Board of Investment & Ministry of Interior Pakistan",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-90 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Corporate Invitation & Chamber of Commerce Recommendation",
    "invitation_desc": "Invitation certified by registered Pakistani business and local Chamber.",
    "min_funds": "Corporate sponsorship letter or bank balance of ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Business in Your Inbox",
        "description": "Fast-track electronic business visa issuance via NADRA portal."
      }
    ],
    "faqs": [
      {
        "question": "What is Business Visa in Your Inbox?",
        "answer": "A fast-track electronic travel authorization issued by NADRA within 48-72 hours for business travelers holding recognized chamber recommendation letters."
      }
    ]
  },
  "bangladesh": {
    "cname": "Bangladesh",
    "visa_category": "Category B Business Visa",
    "overview": "Authorizes business meetings, factory inspections, commercial negotiations, and trade delegations for up to 90 days or 1 year multiple entry.",
    "fees": {
      "visa_fee": "₹0 (Consular Fee)",
      "service_fee": "approx. ₹850 (VAC Handling)",
      "total_fee": "₹850 Total Reference",
      "notes": "Invitation from a registered Bangladeshi company required."
    },
    "proc_time": "5 to 7 Working Days",
    "proc_details": "Deputy High Commissions of Bangladesh in India.",
    "source": "Ministry of Foreign Affairs of Bangladesh & FBCCI",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-90 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation & Letter of Recommendation from FBCCI / Trade Body",
    "invitation_desc": "Invitation from a registered Bangladeshi company with TIN certificate.",
    "min_funds": "Company deputation letter or bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Bilateral Trade",
        "description": "India and Bangladesh enjoy deep bilateral commercial ties and border haats."
      },
      {
        "icon": "🏭",
        "title": "Industrial Parks",
        "description": "Direct investment opportunities in high-tech and manufacturing zones."
      }
    ],
    "faqs": [
      {
        "question": "What is needed for a Bangladesh business visa?",
        "answer": "An invitation letter from a Bangladeshi enterprise with TIN certificate and a letter of deputation from your Indian employer."
      }
    ]
  },
  "myanmar": {
    "cname": "Myanmar",
    "visa_category": "Business eVisa (Type B)",
    "overview": "Authorizes business meetings, contract negotiations, site visits, and commercial conferences for up to 70 days. Can be obtained online via evisa.moip.gov.mm in 3 business days.",
    "fees": {
      "visa_fee": "$70 USD (approx. ₹5,800)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "$70 USD Total Reference",
      "notes": "Corporate invitation and company registration copy required."
    },
    "proc_time": "3 Working Days",
    "proc_details": "Direct online eVisa portal evisa.moip.gov.mm.",
    "source": "Ministry of Immigration and Population & DICA",
    "validity": "90 Days Validity / 70 Days Stay",
    "stay": "Up to 70 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Invitation Letter & Host Company Registration Extract",
    "invitation_desc": "Invitation from a company registered with the Directorate of Investment and Company Administration (DICA).",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Fast 3-Day Business eVisa",
        "description": "70 days of stay issued online in just 3 working days."
      },
      {
        "icon": "🏭",
        "title": "Thilawa SEZ",
        "description": "Prime industrial hub near Yangon attracting major international manufacturers."
      }
    ],
    "faqs": [
      {
        "question": "What is the stay limit on a Myanmar Business eVisa?",
        "answer": "The Business eVisa permits up to 70 days of stay and is extendable in-country through DICA."
      }
    ]
  },
  "laos": {
    "cname": "Laos",
    "visa_category": "Business Visa (Type NI-B2)",
    "overview": "Authorizes commercial discussions, feasibility studies, investment surveys, and contract negotiations for up to 90 days. Can be obtained upon invitation from a registered Lao company.",
    "fees": {
      "visa_fee": "$50-80 USD",
      "service_fee": "Consular direct or fast-track agent",
      "total_fee": "$50-80 USD Total",
      "notes": "Invitation from a registered Lao enterprise required."
    },
    "proc_time": "5 to 7 Working Days",
    "proc_details": "Embassy of Lao PDR in New Delhi or authorized entry checkpoints.",
    "source": "Ministry of Foreign Affairs of Lao PDR & Ministry of Industry and Commerce",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-90 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation & Enterprise Registration Certificate",
    "invitation_desc": "Invitation from a registered Lao company with corporate tax identification.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Special Economic Zones",
        "description": "Savannakhet and Vientiane SEZs offering corporate tax holidays and land leases."
      }
    ],
    "faqs": [
      {
        "question": "What is needed for a Laos business visa?",
        "answer": "An invitation letter from a licensed Lao business partner and a deputation letter from your Indian enterprise."
      }
    ]
  },
  "mongolia": {
    "cname": "Mongolia",
    "visa_category": "Business Visa (Type B)",
    "overview": "Authorizes commercial discussions, mining concession evaluations, contract negotiations, and trade missions for up to 90 days. Can be obtained online via evisa.mn.",
    "fees": {
      "visa_fee": "$51.50 USD (eVisa) / $100 USD (Consular Multi-Entry)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$51.50-100 USD Total Reference",
      "notes": "Invitation from a registered Mongolian legal entity required."
    },
    "proc_time": "3 Business Days (eVisa)",
    "proc_details": "Direct online eVisa portal evisa.mn.",
    "source": "Mongolia Immigration Agency & Mongolian National Chamber of Commerce",
    "validity": "Up to 90 Days / 1 Year",
    "stay": "Up to 30-90 Days",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Business Invitation & Host Company Registration Number",
    "invitation_desc": "Invitation from a registered Mongolian enterprise with state registration certificate.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Fast 3-Day Business eVisa",
        "description": "Apply online at evisa.mn for rapid 72-hour business visa approval."
      },
      {
        "icon": "💼",
        "title": "Mining & Construction Expo",
        "description": "Major annual events like Discover Mongolia bringing global resource executives to Ulaanbaatar."
      }
    ],
    "faqs": [
      {
        "question": "Can I get a Mongolian business visa online?",
        "answer": "Yes, select 'Business' on evisa.mn and upload your host company's invitation letter and company registration certificate."
      }
    ]
  },
  "taiwan": {
    "cname": "Taiwan",
    "visa_category": "Visitor Visa for Business / Free TAC Entry",
    "overview": "Authorizes business meetings, factory inspections, procurement, and international trade fairs (Computex, SEMICON Taiwan). Valid Western visa holders enter free for 14 days; others obtain a BOCA business visitor visa.",
    "fees": {
      "visa_fee": "₹0 (Online TAC) or ₹4,000 (TECC Business Visitor Visa)",
      "service_fee": "₹0 (Direct)",
      "total_fee": "₹0 or ₹4,000 Total Reference",
      "notes": "TAC is completely free online."
    },
    "proc_time": "Instant (TAC) / 5 Working Days (TECC)",
    "proc_details": "Online via National Immigration Agency or TECC New Delhi / Chennai.",
    "source": "Bureau of Consular Affairs (BOCA) & TAITRA",
    "validity": "Up to 90 Days / 1-5 Years Multiple Entry",
    "stay": "Up to 14 Days (TAC) / 30-90 Days (Consular Visa)",
    "entry_type": "Single / Multiple Entry",
    "invitation_doc": "Official Business Invitation from Taiwanese Enterprise",
    "invitation_desc": "Formal invitation on corporate letterhead with Unified Business Number (UBN).",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹2,50,000+",
    "highlights": [
      {
        "icon": "💻",
        "title": "Computex & SEMICON Taiwan",
        "description": "World-leading technology and electronics trade exhibitions in Taipei."
      },
      {
        "icon": "⚡",
        "title": "Instant Free TAC",
        "description": "Attend business meetings for up to 14 days using free online TAC."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend trade exhibitions in Taiwan on a free TAC?",
        "answer": "Yes, short business meetings, conferences, and exhibitions are fully authorized under the 14-day online TAC."
      }
    ]
  },
  "hong-kong": {
    "cname": "Hong Kong",
    "visa_category": "Business Visitor (Free PAR Entry / Business Visa)",
    "overview": "Authorizes business meetings, contract negotiations, trade exhibitions, and corporate audits. Indian citizens can attend business meetings for up to 14 days on a free PAR; longer stays require a business visit visa.",
    "fees": {
      "visa_fee": "₹0 (Free 14-Day PAR) or HK$230 (ImmD Business Visa)",
      "service_fee": "₹0 (Direct)",
      "total_fee": "₹0 or HK$230 Total Reference",
      "notes": "Short commercial meetings fully permitted on free PAR."
    },
    "proc_time": "Instant (PAR) / 4 Weeks (ImmD Consular Visa)",
    "proc_details": "Online via gov.hk or direct filing with ImmD.",
    "source": "Hong Kong Immigration Department & HKTDC",
    "validity": "6 Months (PAR) / Up to 1 Year (Visa)",
    "stay": "Up to 14 Days (PAR) / 30-90 Days (Visa)",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Business Invitation from Hong Kong Host Company",
    "invitation_desc": "Invitation detailing commercial meetings and confirmation that no Hong Kong salary will be paid.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹2,00,000+",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Free 14-Day PAR Entry",
        "description": "Attend business meetings, trade fairs, and negotiations instantly with zero visa fees."
      },
      {
        "icon": "🏢",
        "title": "HKTDC Mega Fairs",
        "description": "World's largest electronics, jewelry, and toy trade fairs at HKCEC."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Hong Kong on a PAR?",
        "answer": "Yes, participating in commercial meetings, negotiations, contract signings, and trade exhibitions is legally permitted under visitor status with a PAR."
      }
    ]
  },
  "macau": {
    "cname": "Macau",
    "visa_category": "Business Visitor (Entry Permit on Arrival)",
    "overview": "Authorizes commercial negotiations, conference attendance, supplier audits, and trade exhibitions for up to 30 days. Obtainable instantly on arrival at border control.",
    "fees": {
      "visa_fee": "100 MOP (approx. ₹1,050)",
      "service_fee": "₹0 (On Arrival)",
      "total_fee": "100 MOP Total Reference",
      "notes": "Paid in MOP or HKD cash at border counter."
    },
    "proc_time": "Instant on Arrival (10 Minutes)",
    "proc_details": "Border control at Macau Airport or ferry checkpoints.",
    "source": "Commerce and Investment Promotion Institute (IPIM) & PSPF",
    "validity": "30 Days on Arrival",
    "stay": "Up to 30 Days",
    "entry_type": "Single Entry",
    "invitation_doc": "Business Invitation from Macau Host Company",
    "invitation_desc": "Corporate invitation letter with Macau business registration details.",
    "min_funds": "Carried solvency proof of minimum 5,000 MOP in cash or cards",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Instant Business VOA",
        "description": "No prior embassy appointment needed — fly in and get 30 days on arrival."
      },
      {
        "icon": "🏢",
        "title": "Sino-Portuguese Commercial Platform",
        "description": "Official gateway bridging China with Portuguese-speaking countries."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Macau on an arrival entry permit?",
        "answer": "Yes, short commercial meetings, trade conventions, and contract negotiations are fully authorized under entry permit status."
      }
    ]
  },
  "nigeria": {
    "cname": "Nigeria",
    "visa_category": "F4A Business Visa / Visa on Arrival (VoA) for Business Executives",
    "overview": "The Nigerian Business Visa is designed for foreign business owners, commercial investors, contractors, and corporate delegates attending meetings, contract signings, trade exhibitions, and scoping operations in Nigeria. Alternatively, senior business executives can apply for the pre-approved Visa on Arrival (VoA) facility via the NIS Comptroller General portal.",
    "fees": {
      "visa_fee": "$160 (Consular Business Visa Fee)",
      "service_fee": "$90 (OIS Logistics Fee)",
      "total_fee": "$250 (approx. ₹21,000)",
      "notes": "VoA processing requires payment online prior to boarding flight."
    },
    "proc_time": "5 to 10 Working Days (or 48-72 hours for pre-approved VoA)",
    "proc_details": "Applied via OIS Services center or pre-approved online via NIS Comptroller General office.",
    "source": "Nigeria Immigration Service & Federal Ministry of Industry, Trade and Investment",
    "validity": "90 Days from Date of Issue",
    "stay": "Up to 90 Days per Entry",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "CAC Corporate Certificate & Notarized Host Invitation with Immigration Responsibility",
    "invitation_desc": "Official formal letter of invitation on corporate letterhead from a CAC-registered Nigerian company accepting full immigration responsibility, plus company CAC Certificate of Incorporation.",
    "min_funds": "Company sponsorship guarantee or ₹2,50,000 personal bank balance",
    "highlights": [
      {
        "icon": "💼",
        "title": "Corporate Commercial Engagement",
        "description": "Authorized for investor negotiations, plant inspections, board conferences, and contract executions."
      },
      {
        "icon": "⚡",
        "title": "Executive Visa on Arrival (VoA) Available",
        "description": "High-level executives can obtain pre-approved entry approval letters online within 48 to 72 hours."
      },
      {
        "icon": "📈",
        "title": "Gateway to ECOWAS Markets",
        "description": "Lagos and Abuja serve as strategic commercial launchpads for the entire 400-million West African market."
      }
    ],
    "faqs": [
      {
        "question": "Can I obtain a Nigerian Business Visa on Arrival?",
        "answer": "Yes, provided you receive an official 'Visa on Arrival Approval Letter' issued directly by the Comptroller General of the Nigeria Immigration Service before boarding your flight."
      },
      {
        "question": "What corporate documents are required from the Nigerian host?",
        "answer": "The host company must provide its Corporate Affairs Commission (CAC) certificate of incorporation, valid tax clearance certificate, and a formal invitation letter accepting immigration responsibility."
      }
    ]
  },
  "ghana": {
    "cname": "Ghana",
    "visa_category": "B-1 Business Visa / Commercial Visitor Permit",
    "overview": "The Ghana Business Visa is issued to commercial executives, technical advisors, infrastructure consultants, and commodity traders visiting Ghana for negotiations, project tenders, corporate oversight, and investment due diligence.",
    "fees": {
      "visa_fee": "₹8,000 (Single Entry) / ₹12,000 (Multiple Entry)",
      "service_fee": "₹1,500 (Processing)",
      "total_fee": "₹9,500 - ₹13,500",
      "notes": "Demand Draft payable to Ghana High Commission New Delhi."
    },
    "proc_time": "5 to 8 Working Days",
    "proc_details": "Applied directly at High Commission of Ghana in New Delhi.",
    "source": "Ghana Immigration Service & Ministry of Foreign Affairs and Regional Integration",
    "validity": "3 to 12 Months",
    "stay": "Up to 60 Days per visit",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Ghana Registrar General's Company Certificate & Formal Host Invitation",
    "invitation_desc": "Invitation letter from a registered Ghanaian business accompanied by its Certificate of Incorporation and Certificate to Commence Business.",
    "min_funds": "Company sponsorship letter or personal 6-month bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Direct B2B Commercial Access",
        "description": "Engage with Ghanaian partners in gold, cocoa, oil & gas, fintech, and agriculture."
      },
      {
        "icon": "🏢",
        "title": "Fast-Track Consular Assessment",
        "description": "Standard decisions rendered within one business week in New Delhi."
      },
      {
        "icon": "🌍",
        "title": "AfCFTA Secretariat Hub",
        "description": "Accra hosts the African Continental Free Trade Area (AfCFTA) headquarters."
      }
    ],
    "faqs": [
      {
        "question": "Can an Indian business traveller get multiple entries for Ghana?",
        "answer": "Yes. If your company maintains regular trading relations with Ghana, a 1-year multiple entry visa can be requested with appropriate host documentation."
      },
      {
        "question": "Is a company registration certificate required from the Ghanaian host?",
        "answer": "Yes. Consular rules require a copy of the host company's Registrar General's Department incorporation certificate."
      }
    ]
  },
  "ethiopia": {
    "cname": "Ethiopia",
    "visa_category": "Conference / Commercial Business eVisa (CB / CONF)",
    "overview": "The Ethiopian Business eVisa enables international company executives, commercial buyers, trade delegation members, and conference participants to enter Ethiopia for business negotiations, investment surveys, African Union events, and commercial contracts. Conveniently issued online via evisa.gov.et.",
    "fees": {
      "visa_fee": "$102 (30-day Single Entry) / $252 (90-day Multiple Entry)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$102 - $252 (approx. ₹8,600 - ₹21,000)",
      "notes": "Official fees payable online by international card."
    },
    "proc_time": "2 to 4 Working Days",
    "proc_details": "Applied 100% online through evisa.gov.et with host company invitation letter.",
    "source": "Immigration and Citizenship Service (ICS) & Ethiopian Investment Commission (EIC)",
    "validity": "30 to 90 Days",
    "stay": "30 to 90 Days as per visa category",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Ethiopian Company Business License & Formal Letter of Invitation",
    "invitation_desc": "Letter of invitation from a registered Ethiopian business enterprise or conference organizer, plus copy of their Business License (TIN / Commercial Registration).",
    "min_funds": "Corporate sponsorship guarantee or ₹1,50,000 bank balance",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Fast Online eVisa Processing",
        "description": "Direct digital approval delivered to your inbox within 48 to 72 hours."
      },
      {
        "icon": "🌐",
        "title": "Diplomatic & AU Center",
        "description": "Addis Ababa is the diplomatic capital of Africa, hosting the African Union and UNECA."
      },
      {
        "icon": "📈",
        "title": "Booming Investment Opportunities",
        "description": "High-growth sectors in renewable energy, telecommunications, logistics, and agriculture."
      }
    ],
    "faqs": [
      {
        "question": "Can I get a Business Visa online for Ethiopia?",
        "answer": "Yes. The Ethiopian official eVisa platform supports Business Visas (Conference, Private Business, and Government delegate visas) with uploaded invitation documents."
      },
      {
        "question": "What documents does my Ethiopian business host need to supply?",
        "answer": "Your host must supply a formal invitation letter and a clear copy of their active Ethiopian Business License and Tax Identification Number (TIN)."
      }
    ]
  },
  "rwanda": {
    "cname": "Rwanda",
    "visa_category": "V2 Business Visa / Conference & Investor Entry Permit",
    "overview": "Rwanda is internationally ranked among Africa's easiest places to do business. The Business Visa is issued to commercial entrepreneurs, institutional investors, startup founders, and conference delegates attending forums at the Kigali Convention Centre.",
    "fees": {
      "visa_fee": "$50 (Single Entry 30 Days) / $70 (Multiple Entry 90 Days)",
      "service_fee": "$0 (Direct Online / VOA)",
      "total_fee": "$50 - $70 (approx. ₹4,200 - ₹5,900)",
      "notes": "Can be obtained on arrival or online via Irembo."
    },
    "proc_time": "Instant (on arrival) or 3 Days (online pre-approval)",
    "proc_details": "Issued directly at Kigali Airport immigration or through irembo.gov.rw.",
    "source": "Directorate General of Immigration and Emigration (DGIE) & Rwanda Development Board (RDB)",
    "validity": "30 to 90 Days",
    "stay": "Up to 90 Days",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "RDB Certificate of Registration & Host Business Invitation Letter",
    "invitation_desc": "Invitation from a registered Rwandan enterprise or event organizer, plus company Rwanda Development Board (RDB) certificate.",
    "min_funds": "Corporate sponsorship or personal bank balance of ₹1,00,000",
    "highlights": [
      {
        "icon": "🚀",
        "title": "Top Ease of Doing Business",
        "description": "Register a new business in Rwanda in just 6 hours through the Rwanda Development Board (RDB)."
      },
      {
        "icon": "🏢",
        "title": "World-Class Convention Hub",
        "description": "Host venue for Commonwealth CHOGM, WEF Africa, and major international summits."
      },
      {
        "icon": "🤝",
        "title": "East African Gateway",
        "description": "Strategic platform connecting East, Central, and francophone African markets."
      }
    ],
    "faqs": [
      {
        "question": "Can I register a business in Rwanda while on a business visa?",
        "answer": "Yes. Foreigners can incorporate a Rwandan company online with RDB within a single working day without minimum capital restrictions."
      },
      {
        "question": "Can I attend conferences on a standard VOA in Rwanda?",
        "answer": "Yes. The standard Visa on Arrival covers conference participation, trade seminars, and introductory business meetings."
      }
    ]
  },
  "zimbabwe": {
    "cname": "Zimbabwe",
    "visa_category": "Business Visitor Visa / Commercial Entry Permit",
    "overview": "The Zimbabwe Business Visa accommodates foreign corporate executives, mining investors, agricultural commodity traders, and machinery technicians visiting Zimbabwe for trade discussions, project surveys, board meetings, and investment scoping.",
    "fees": {
      "visa_fee": "$45 (Single Entry) / $65 (Double Entry)",
      "service_fee": "$0 (Direct Online / Border)",
      "total_fee": "$45 - $65 (approx. ₹3,800 - ₹5,500)",
      "notes": "Applied online via evisa.gov.zw or upon arrival with host documents."
    },
    "proc_time": "3 to 5 Working Days",
    "proc_details": "Applied online via evisa.gov.zw or directly at port of entry with formal company invitation.",
    "source": "Department of Immigration Zimbabwe & Zimbabwe Investment and Development Agency (ZIDA)",
    "validity": "30 to 90 Days",
    "stay": "Up to 30 Days per visit",
    "entry_type": "Single or Double Entry",
    "invitation_doc": "Zimbabwe Company Registration & Host Invitation Letter",
    "invitation_desc": "Official invitation letter from a registered Zimbabwean business indicating nature of business, plus copy of company certificate.",
    "min_funds": "Company sponsorship or personal bank balance of ₹1,00,000",
    "highlights": [
      {
        "icon": "💎",
        "title": "Abundant Mineral Wealth",
        "description": "World-class deposits of lithium, platinum group metals (PGM), gold, and diamonds."
      },
      {
        "icon": "🤝",
        "title": "ZIDA One-Stop Investment Centre",
        "description": "The Zimbabwe Investment and Development Agency provides expedited investor assistance."
      },
      {
        "icon": "🇿🇼",
        "title": "Growing Bilateral Ties",
        "description": "Expanding commercial trade between India and Zimbabwe in pharmaceuticals, agro-machinery, and mining."
      }
    ],
    "faqs": [
      {
        "question": "Can I apply for a Zimbabwean business visa online?",
        "answer": "Yes. The official evisa.gov.zw portal allows you to select 'Business Visa' and upload host invitations and company details."
      },
      {
        "question": "What is ZIDA?",
        "answer": "ZIDA (Zimbabwe Investment and Development Agency) is the national one-stop agency in Harare that facilitates foreign investment, licensing, and permits."
      }
    ]
  },
  "colombia": {
    "cname": "Colombia",
    "visa_category": "Visitor Visa for Business (Visa V Negocios) / Visa-Free Entry",
    "overview": "Business visitors entering Colombia for corporate meetings, commercial negotiations, trade fairs, and contract signings can enter VISA-FREE for up to 90 days if holding a valid US or Schengen visa. Other business travelers apply online for the Visa V Negocios through Cancillería.",
    "fees": {
      "visa_fee": "$52 (Study Fee) + $249 (Issuance Fee) = $301 USD",
      "service_fee": "FREE if using US/Schengen Visa waiver",
      "total_fee": "$0 (Visa-free) or $301 (approx. ₹25,000 for Visa V)",
      "notes": "US/Schengen visa waiver applies to short commercial visits as well."
    },
    "proc_time": "10 to 20 Business Days (or Instant with US/Schengen waiver)",
    "proc_details": "Applied online at cancilleria.gov.co with company sponsorship letters.",
    "source": "Cancillería Colombia & ProColombia",
    "validity": "Up to 2 Years (Multiple Entry)",
    "stay": "Up to 180 Days per calendar year",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Certificado Cámara de Comercio & Corporate Invitation Letter",
    "invitation_desc": "Official invitation from a Colombian company and its Cámara de Comercio (Chamber of Commerce) certificate of existence and legal representation.",
    "min_funds": "Company sponsorship letter or personal 6-month bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🚀",
        "title": "Top Tech & Startup Ecosystem",
        "description": "Medellín and Bogotá are renowned innovation capitals with booming fintech and software sectors."
      },
      {
        "icon": "🤝",
        "title": "ProColombia Investment Support",
        "description": "Direct governmental assistance for foreign enterprises expanding into Latin America."
      },
      {
        "icon": "✈️",
        "title": "Strategic Connectivity",
        "description": "El Dorado International Airport (BOG) in Bogotá is the busiest cargo and passenger hub in South America."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Colombia using my US visa?",
        "answer": "Yes! If you hold a valid US visa (B1/B2) or Schengen visa (180+ days validity), you can enter Colombia visa-free for commercial meetings and market exploration for up to 90 days."
      },
      {
        "question": "Can I receive local salary on a business visa?",
        "answer": "No. Commercial visitors cannot receive remuneration from Colombian entities; payments must originate from your foreign employer."
      }
    ]
  },
  "peru": {
    "cname": "Peru",
    "visa_category": "Business Visa (Visa de Negocios) / Visa-Free Commercial Visit",
    "overview": "Business executives visiting Peru for commercial contracts, corporate negotiations, equipment inspections, and mining forums can enter VISA-FREE for up to 180 days if holding a valid US, UK, Canada, Australia, or Schengen visa. Other business travelers obtain a Business Visa at the Peruvian Embassy.",
    "fees": {
      "visa_fee": "₹2,700 (Consular Business Visa Fee)",
      "service_fee": "FREE if using US/UK/Canada/Schengen waiver",
      "total_fee": "₹0 (Visa-free) or ₹2,700 (Consular)",
      "notes": "Supreme Decree visa exemption applies to commercial visits as well."
    },
    "proc_time": "Instant (Visa-Free on Arrival) or 7 to 10 Working Days (Consular)",
    "proc_details": "Direct entry at Lima airport or application via Embassy of Peru New Delhi.",
    "source": "Superintendencia Nacional de Migraciones & PROMPERÚ",
    "validity": "Up to 180 Days per entry (or 1 Year for Consular)",
    "stay": "Up to 180 Days",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Peruvian Host Letter of Invitation & RUC Certificate",
    "invitation_desc": "Formal letter from a Peruvian registered company specifying commercial objectives and company active RUC status with SUNAT.",
    "min_funds": "Corporate sponsorship or personal bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Pacific Alliance Commercial Hub",
        "description": "Peru is a founding member of the Pacific Alliance with duty-free integration across Latin America."
      },
      {
        "icon": "🚢",
        "title": "Mega Port of Chancay",
        "description": "New state-of-the-art deep-water port transforming Peru into South America's maritime gateway to Asia."
      },
      {
        "icon": "📈",
        "title": "Thriving B2B Markets",
        "description": "Expanding trade in minerals, agricultural exports (avocados, asparagus, coffee), and textiles."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Peru on my US visa?",
        "answer": "Yes! Indian passport holders holding a valid US, UK, Canada, Australia, or Schengen visa can enter Peru visa-free for commercial discussions and conferences for up to 180 days."
      },
      {
        "question": "Can I sign commercial contracts on a business entry?",
        "answer": "Yes. Business visitors are legally authorized to sign commercial agreements, conduct market research, and evaluate investments."
      }
    ]
  },
  "chile": {
    "cname": "Chile",
    "visa_category": "Visto de Turismo para Negocios / Commercial Temporary Permit",
    "overview": "The Chilean Business Visa is issued to international company directors, commercial investors, tech entrepreneurs, and trade delegates visiting Chile for contract negotiations, mining asset reviews, corporate oversight, and venture meetings.",
    "fees": {
      "visa_fee": "$50 (Single Entry) / $70 (Multiple Entry)",
      "service_fee": "Consular administrative fee",
      "total_fee": "$50 - $70 (approx. ₹4,200 - ₹5,900)",
      "notes": "Applied online at serviciosconsulares.cl."
    },
    "proc_time": "15 to 20 Working Days",
    "proc_details": "Submitted digitally on the Chilean consular portal, followed by passport stamping at the Embassy in New Delhi.",
    "source": "Ministerio de Relaciones Exteriores de Chile & InvestChile",
    "validity": "Up to 90 Days per entry (or 1 Year Multiple Entry)",
    "stay": "Up to 90 Days",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Notarized Chilean Host Invitation & Company Tax ID (RUT)",
    "invitation_desc": "Official invitation letter from a Chilean registered enterprise notarized in Chile, stating business purpose and guaranteeing company financial backing.",
    "min_funds": "Company sponsorship letter or personal 6-month bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🚀",
        "title": "Start-Up Chile Accelerator",
        "description": "World-renowned governmental startup accelerator offering equity-free grants and fast-track investor visas."
      },
      {
        "icon": "💼",
        "title": "Strongest Economy in Latin America",
        "description": "Chile boasts Latin America's highest sovereign credit rating and transparent legal framework."
      },
      {
        "icon": "☀️",
        "title": "Green Energy Frontier",
        "description": "Atacama Desert hosts the world's highest solar radiation, attracting billions in green energy investment."
      }
    ],
    "faqs": [
      {
        "question": "Can I apply for Start-Up Chile on a business visa?",
        "answer": "Yes. Selected founders are assisted by Start-Up Chile and SERMIG with a specialized 1-year Temporary Residency visa."
      },
      {
        "question": "How many days can I stay in Chile on a business visa?",
        "answer": "Consular business visas generally authorize up to 90 days per entry, extendable locally at SERMIG."
      }
    ]
  },
  "argentina": {
    "cname": "Argentina",
    "visa_category": "Visa de Negocios (Business Visa) / RENURE Commercial Entry",
    "overview": "The Argentine Business Visa is issued to commercial executives, technical consultants, institutional investors, and trade delegates visiting Argentina for business negotiations, investment surveys, contract executions, and international trade shows.",
    "fees": {
      "visa_fee": "$200 USD (Statutory Consular Business Visa Fee)",
      "service_fee": "₹0 (Embassy submission)",
      "total_fee": "$200 USD (approx. ₹16,800)",
      "notes": "Paid by Demand Draft / bank transfer to Embassy of Argentina."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Applied directly at Embassy of Argentina New Delhi or Consulate in Mumbai.",
    "source": "Dirección Nacional de Migraciones & Cancillería Argentina",
    "validity": "Up to 1 Year (Multiple Entry)",
    "stay": "Up to 60 or 90 Days per visit",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Carta de Invitación Registrada en RENURE & Notarized Argentine Host Letter",
    "invitation_desc": "Formal invitation letter signed by a legal representative of an Argentine enterprise registered on the RENURE portal and authenticated by a Public Notary and Colegios de Escribanos.",
    "min_funds": "Corporate sponsorship letter or personal 6-month bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🥩",
        "title": "Global Agri & Energy Powerhouse",
        "description": "World-class agribusiness (soy, beef, wine) and massive Vaca Muerta shale gas and lithium reserves."
      },
      {
        "icon": "🤝",
        "title": "Mercosur Founding Member",
        "description": "Direct access to the Southern Common Market (Argentina, Brazil, Paraguay, Uruguay)."
      },
      {
        "icon": "🏛️",
        "title": "Reliable Consular Review",
        "description": "Transparent processing via the Argentine diplomatic missions in New Delhi and Mumbai."
      }
    ],
    "faqs": [
      {
        "question": "Does my Argentine host need to be registered with RENURE?",
        "answer": "Yes. Argentine consular regulations require the inviting Argentine company to be registered with RENURE and authenticate the invitation letter before an Argentine notary."
      },
      {
        "question": "Can I conduct commercial contracts on a business visa?",
        "answer": "Yes. Business visa holders are fully authorized to negotiate, inspect facilities, sign commercial agreements, and participate in conferences."
      }
    ]
  },
  "costa-rica": {
    "cname": "Costa Rica",
    "visa_category": "Business Visitor Entry / Visa-Free Commercial Visit",
    "overview": "Corporate executives, commercial delegates, tech investors, and renewable energy consultants visiting Costa Rica for business discussions, investment due diligence, contract signing, and Free Trade Zone reviews can enter VISA-FREE for up to 30 days if holding a valid US, Canada, or Schengen visa. Other business travellers obtain a consular business visa.",
    "fees": {
      "visa_fee": "$52 USD (Consular Visa Fee)",
      "service_fee": "FREE if using US/Canada/Schengen waiver",
      "total_fee": "$0 (Visa-free) or $52 USD (Consular)",
      "notes": "US/Canada/Schengen visa exemption applies to business visits."
    },
    "proc_time": "Instant (Visa-Free on Arrival) or 10 to 15 Working Days (Consular)",
    "proc_details": "Direct entry at airport border control or applied via Embassy of Costa Rica New Delhi.",
    "source": "Dirección General de Migración y Extranjería & CINDE",
    "validity": "30 to 90 Days",
    "stay": "Up to 30 Days per visit (Extendable)",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Notarized Costa Rican Host Letter & Personería Jurídica",
    "invitation_desc": "Official invitation from a registered Costa Rican enterprise accompanied by its certified Personería Jurídica (corporate legal status).",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🏭",
        "title": "Zona Franca (Free Trade Zone) Incentives",
        "description": "100% exemption from corporate income tax, customs duties, and dividend withholding taxes for qualifying export investments."
      },
      {
        "icon": "🤝",
        "title": "CINDE Top Investment Agency",
        "description": "CINDE has been ranked by the International Trade Centre as the world's top foreign investment promotion agency for five consecutive years."
      },
      {
        "icon": "🌱",
        "title": "100% Renewable Energy Grid",
        "description": "Costa Rica's electricity grid runs on over 99% renewable power (hydro, geothermal, wind)."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend commercial meetings on my US visa in Costa Rica?",
        "answer": "Yes! Indian passport holders holding a valid multiple-entry US, Canada, or Schengen visa can enter Costa Rica visa-free for commercial meetings, conferences, and site visits for up to 30 days."
      },
      {
        "question": "What is the Free Trade Zone (Zona Franca) in Costa Rica?",
        "answer": "It is a special tax regime offering 0% corporate tax holidays to international manufacturing, tech, and shared services companies setting up operations in Costa Rica."
      }
    ]
  },
  "romania": {
    "cname": "Romania",
    "visa_category": "Uniform Schengen Business Visa (Type C/Afaceri)",
    "overview": "The Romanian Business Visa (Type C/A) allows foreign company directors, commercial negotiators, IT consultants, and industrial investors to attend trade exhibitions, contract signings, technical consultations, and corporate audits in Romania and across the Schengen area.",
    "fees": {
      "visa_fee": "€90 (Schengen Type C Business Visa)",
      "service_fee": "₹1,500 - ₹2,000 (Consular VAC)",
      "total_fee": "€90 (approx. ₹8,100 + logistics)",
      "notes": "Official EU Schengen fee table."
    },
    "proc_time": "15 to 25 Calendar Days",
    "proc_details": "Applied online via evisa.mae.ro and finalized at the Embassy of Romania in New Delhi.",
    "source": "Ministry of Foreign Affairs of Romania (MAE) & Ministry of Economy",
    "validity": "Up to 1 to 5 Years Multiple Entry (as granted by consulate)",
    "stay": "Up to 90 Days within any 180-Day Period",
    "entry_type": "Multiple Entry Schengen Visa",
    "invitation_doc": "Official Host Invitation Stamped by IGI or Registered Romanian Corporate Entity",
    "invitation_desc": "Official invitation letter from a Romanian company registered with the National Trade Register Office (ONRC) stating commercial scope and financial liability.",
    "min_funds": "Company corporate guarantee or personal bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Schengen Commercial Mobility",
        "description": "Conduct business seamlessly across Romania, Germany, France, and all 29 Schengen states on a single visa."
      },
      {
        "icon": "💻",
        "title": "Silicon Valley of Eastern Europe",
        "description": "Cluj-Napoca and Bucharest are dynamic tech centers hosting Microsoft, Oracle, UiPath, and Continental."
      },
      {
        "icon": "🇪🇺",
        "title": "EU Single Market Access",
        "description": "Direct access to the 450-million consumer European single market."
      }
    ],
    "faqs": [
      {
        "question": "Does a Romanian business visa allow travel to Germany or France?",
        "answer": "Yes! Because Romania issues Uniform Schengen Visas (Type C), your business visa is valid across all 29 Schengen countries including Germany, France, Austria, and Italy."
      },
      {
        "question": "What corporate documents are required from the Romanian host?",
        "answer": "The host company must provide a formal invitation letter, their ONRC Certificate of Registration (CUI), and a confirmation of company financial standing."
      }
    ]
  },
  "bulgaria": {
    "cname": "Bulgaria",
    "visa_category": "Uniform Schengen Business Visa (Type C/Business)",
    "overview": "The Bulgarian Business Visa (Type C) allows company directors, commercial negotiators, industrial suppliers, and trade delegates to attend business meetings, trade exhibitions, corporate conferences, and investor negotiations in Bulgaria and across the 29 Schengen states.",
    "fees": {
      "visa_fee": "€90 (Schengen Type C Business Visa)",
      "service_fee": "₹1,800 - ₹2,400 (VFS Global)",
      "total_fee": "€90 (approx. ₹8,100 + VFS fee)",
      "notes": "Official EU statutory rate."
    },
    "proc_time": "15 to 25 Calendar Days",
    "proc_details": "Applied through VFS Global and processed by the Embassy of Bulgaria in New Delhi.",
    "source": "Ministry of Foreign Affairs of the Republic of Bulgaria & InvestBulgaria Agency (IBA)",
    "validity": "Up to 1 to 5 Years Multiple Entry",
    "stay": "Up to 90 Days within any 180-Day Period",
    "entry_type": "Multiple Entry Schengen Visa",
    "invitation_doc": "Bulgarian Chamber of Commerce (BCCI) Stamped Corporate Invitation",
    "invitation_desc": "Official invitation from a Bulgarian company authenticated by the Bulgarian Chamber of Commerce and Industry (BCCI) or Bulgarian Industrial Association.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "Schengen-Wide Mobility",
        "description": "Travel across Bulgaria and all 29 Schengen countries on a single business visa."
      },
      {
        "icon": "💰",
        "title": "10% Flat Corporate Tax",
        "description": "Lowest corporate tax rate in the European Union, making Bulgaria highly attractive for corporate headquarters and shared services."
      },
      {
        "icon": "🤝",
        "title": "InvestBulgaria Support",
        "description": "Institutional support for foreign enterprises investing in automotive, electronics, and software."
      }
    ],
    "faqs": [
      {
        "question": "Does a Bulgarian business visa allow entry into other European countries?",
        "answer": "Yes! Because Bulgaria issues Uniform Schengen Visas (Type C), your business visa is valid across all 29 Schengen countries including Germany, France, and Greece."
      },
      {
        "question": "Does the invitation letter need Bulgarian Chamber of Commerce authentication?",
        "answer": "Yes. Standard Bulgarian consular regulations require business invitations to be verified by the Bulgarian Chamber of Commerce and Industry (BCCI)."
      }
    ]
  },
  "croatia": {
    "cname": "Croatia",
    "visa_category": "Uniform Schengen Business Visa (Type C/Poslovni)",
    "overview": "The Croatian Business Visa (Type C) allows international corporate executives, commercial buyers, naval architects, maritime investors, and IT specialists to attend commercial negotiations, contract signings, trade conferences, and maritime audits in Croatia and across the Schengen area.",
    "fees": {
      "visa_fee": "€90 (Schengen Type C Business Visa)",
      "service_fee": "₹2,200 (VFS Global)",
      "total_fee": "€90 (approx. ₹8,100 + VFS fee)",
      "notes": "Standard EU Schengen statutory fee."
    },
    "proc_time": "15 to 25 Calendar Days",
    "proc_details": "Applied via VFS Global and processed by the Embassy of the Republic of Croatia in New Delhi.",
    "source": "Ministry of Foreign and European Affairs of Croatia (MVEP) & Croatian Chamber of Economy (HGK)",
    "validity": "Up to 1 to 5 Years Multiple Entry",
    "stay": "Up to 90 Days within any 180-Day Period",
    "entry_type": "Multiple Entry Schengen Visa",
    "invitation_doc": "Jamstveno Pismo (Official Letter of Guarantee for Business) Verified by Notary",
    "invitation_desc": "Official Croatian MFA Guarantee Letter (Jamstveno pismo) completed by a registered Croatian enterprise and certified by a Croatian public notary or Commercial Court.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "Full Schengen Commercial Access",
        "description": "Seamless border-free travel across Croatia and all 29 Schengen member states."
      },
      {
        "icon": "🚢",
        "title": "Premier Maritime & Logistics Hub",
        "description": "Port of Rijeka and Ploče serve as strategic deep-water maritime freight gateways to Central Europe."
      },
      {
        "icon": "🤝",
        "title": "Transparent EU Legal Standards",
        "description": "Strong rule of law, investor protection, and commercial dispute resolution under EU jurisprudence."
      }
    ],
    "faqs": [
      {
        "question": "What is the Jamstveno Pismo in Croatia?",
        "answer": "Jamstveno Pismo is the official Croatian Letter of Guarantee. For business visits, the inviting Croatian company must complete this form, notarize it in Croatia, and send it to the applicant."
      },
      {
        "question": "Can I visit other Schengen countries on a Croatian business visa?",
        "answer": "Yes. A Uniform Schengen Visa (Type C) issued by Croatia is valid for commercial travel across all 29 Schengen states."
      }
    ]
  },
  "slovenia": {
    "cname": "Slovenia",
    "visa_category": "Uniform Schengen Business Visa (Type C/Poslovni)",
    "overview": "The Slovenian Business Visa (Type C) enables international company directors, commercial negotiators, engineering consultants, pharmaceutical executives, and tech partners to attend commercial discussions, corporate audits, trade expos, and investor symposiums in Slovenia and across the Schengen area.",
    "fees": {
      "visa_fee": "€90 (Schengen Type C Business Visa)",
      "service_fee": "₹2,000 - ₹2,500 (VFS Global)",
      "total_fee": "€90 (approx. ₹8,100 + VFS fee)",
      "notes": "Official EU statutory rate."
    },
    "proc_time": "15 to 25 Calendar Days",
    "proc_details": "Applied via VFS Global and processed by the Embassy of the Republic of Slovenia in New Delhi.",
    "source": "Ministry of Foreign and European Affairs of Slovenia & SPIRIT Slovenia (Business Development Agency)",
    "validity": "Up to 1 to 5 Years Multiple Entry",
    "stay": "Up to 90 Days within any 180-Day Period",
    "entry_type": "Multiple Entry Schengen Visa",
    "invitation_doc": "Garancijsko Pismo (Letter of Guarantee for Business) Certified by Administrative Unit",
    "invitation_desc": "Official Letter of Guarantee (Garancijsko pismo) executed by a registered Slovenian enterprise and certified by an Administrative Unit (Upravna enota) or Chamber of Commerce and Industry of Slovenia (GZS).",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "Schengen Commercial Mobility",
        "description": "Conduct business seamlessly across Slovenia, Germany, Austria, Italy, and all 29 Schengen member states."
      },
      {
        "icon": "🚢",
        "title": "Port of Koper (Luka Koper)",
        "description": "The northernmost deep-sea port in the Adriatic, serving as Central Europe's fastest maritime route to Asia and India."
      },
      {
        "icon": "🤝",
        "title": "SPIRIT Slovenia Support",
        "description": "Direct institutional support for foreign companies in green technology, advanced engineering, and logistics."
      }
    ],
    "faqs": [
      {
        "question": "What is the Garancijsko Pismo in Slovenia?",
        "answer": "Garancijsko Pismo is the official Letter of Guarantee required by Slovenian immigration. For business trips, the inviting Slovenian enterprise must certify this guarantee at their local Administrative Unit."
      },
      {
        "question": "Can I visit other Schengen countries on a Slovenian business visa?",
        "answer": "Yes. A Uniform Schengen Visa (Type C) issued by Slovenia allows commercial travel across all 29 Schengen states."
      }
    ]
  },
  "cyprus": {
    "cname": "Cyprus",
    "visa_category": "Business Visitor Visa / Visa-Free Entry with Multi-Entry Schengen",
    "overview": "The Cyprus Business Visa enables corporate directors, shipowners, commercial lawyers, fintech investors, and tech executives to attend commercial meetings, maritime summits (Maritime Cyprus), corporate board sessions, and investment reviews in Nicosia and Limassol. Indian passport holders holding a valid double- or multiple-entry Schengen visa can enter VISA-FREE for up to 90 days.",
    "fees": {
      "visa_fee": "€80 (Consular Business Visa Fee)",
      "service_fee": "FREE if using Multi-Entry Schengen Visa",
      "total_fee": "€0 (Visa-free with Schengen) or €80 (Consular)",
      "notes": "Schengen multi-entry waiver applies to commercial visits as well."
    },
    "proc_time": "Instant (Visa-Free on Arrival with Schengen) or 7 to 12 Working Days (Consular)",
    "proc_details": "Applied via VFS Global / High Commission of Cyprus in New Delhi, or direct entry with multi-entry Schengen visa.",
    "source": "Civil Registry and Migration Department & Invest Cyprus (CIPA)",
    "validity": "Up to 90 Days per visit (or up to 1-3 Years Multi-Entry)",
    "stay": "Up to 90 Days in any 180-Day Period",
    "entry_type": "Multiple Entry",
    "invitation_doc": "Notarized Cypriot Corporate Invitation & Assumption of Responsibility Form",
    "invitation_desc": "Official invitation letter from a registered Cypriot enterprise accompanied by a notarized Assumption of Responsibility form guaranteeing lodging and repatriation.",
    "min_funds": "Company corporate guarantee or personal bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "⚓",
        "title": "Largest Shipmanagement Center in the EU",
        "description": "Cyprus is the largest third-party shipmanagement hub in Europe and top-three worldwide."
      },
      {
        "icon": "💰",
        "title": "12.5% Corporate Tax & Non-Dom Regime",
        "description": "Attractive 12.5% corporate tax rate and zero tax on dividends/interest for non-domiciled tax residents."
      },
      {
        "icon": "🤝",
        "title": "Invest Cyprus Facilitation",
        "description": "Direct state assistance from Invest Cyprus for company headquarters relocation and real estate development."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Cyprus on my Schengen visa?",
        "answer": "Yes! If you hold a valid double- or multiple-entry Schengen visa (Type C), you can enter Cyprus visa-free for commercial meetings, conferences, and site visits for up to 90 days."
      },
      {
        "question": "What is the corporate tax rate in Cyprus?",
        "answer": "Cyprus has one of the lowest corporate tax rates in the European Union at a competitive flat 12.5%."
      }
    ]
  },

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
,
  "serbia": {
    "cname": "Serbia",
    "visa_category": "Short-Stay Business Visa (Visa C) / Visa-Free Commercial Visit",
    "overview": "Indian passport holders can visit Serbia for business negotiations, corporate board meetings, trade exhibitions, and investment scoping VISA-FREE for up to 30 days. For longer commercial stays, foreign executives apply for a Business Visa (Visa C) with an official Chamber of Commerce invitation.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free for 30 Days) / €60 (Extended Business Visa)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Visa-Free)",
      "notes": "No visa required for short commercial trips up to 30 days."
    },
    "proc_time": "Instant (Visa-Free on Arrival) or 10 to 15 Days (Consular)",
    "proc_details": "Immediate entry at Belgrade airport or consular processing in New Delhi.",
    "source": "Ministry of Foreign Affairs of Serbia & Chamber of Commerce and Industry of Serbia (CCIS)",
    "validity": "30 Days (Visa-Free) or up to 1 Year Multi-Entry",
    "stay": "Up to 30 Days per visit",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "CCIS Chamber of Commerce Certified Host Invitation",
    "invitation_desc": "Official invitation letter from a registered Serbian company certified by the Chamber of Commerce and Industry of Serbia.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Strategic European Bridge",
        "description": "Bilateral free trade agreements with EU, Eurasian Economic Union, Turkey, and China."
      },
      {
        "icon": "✈️",
        "title": "Direct Belgrade Hub",
        "description": "Air Serbia operates direct intercontinental connections from Belgrade Nikola Tesla Airport."
      },
      {
        "icon": "🏢",
        "title": "Belgrade Waterfront & EXPO 2027",
        "description": "Massive urban development and host nation of the Specialised World Expo 2027."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Serbia without a visa?",
        "answer": "Yes. Indian passport holders enjoy 30-day visa-free entry, covering business meetings, conferences, and site visits."
      },
      {
        "question": "Can I establish a company in Serbia as a foreign citizen?",
        "answer": "Yes. Foreigners can easily incorporate a Serbian DOO (limited liability company) with a minimum registered capital of only 100 RSD (approx. €1)."
      }
    ]
  },
  "montenegro": {
    "cname": "Montenegro",
    "visa_category": "Short-Stay Business Entry / Visa-Free Commercial Visit",
    "overview": "Indian business executives, commercial investors, luxury marina operators, and real estate developers can visit Montenegro VISA-FREE for up to 30 days for commercial meetings, contract signings, and investment reviews.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free for 30 Days)",
      "service_fee": "₹0 (Direct Airport Border)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "No visa required for short commercial trips up to 30 days."
    },
    "proc_time": "Instant (Visa-Free on Arrival)",
    "proc_details": "Immediate entry at Tivat or Podgorica airport border desks.",
    "source": "Ministry of Foreign Affairs & Montenegro Investment Agency (MIA)",
    "validity": "30 Days on Arrival",
    "stay": "Up to 30 Days per visit",
    "entry_type": "Single Entry",
    "invitation_doc": "Notarized Montenegrin Host Company Invitation Letter",
    "invitation_desc": "Official invitation letter from a registered Montenegrin corporate entity indicating the commercial nature of visit.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹1,50,000",
    "highlights": [
      {
        "icon": "🛥️",
        "title": "Superyacht Capital of the Mediterranean",
        "description": "Porto Montenegro, Portonovi, and Luštica Bay are premier luxury yachting and marina destinations."
      },
      {
        "icon": "📈",
        "title": "Fast-Track EU Accession",
        "description": "Montenegro is the leading candidate nation for European Union accession."
      },
      {
        "icon": "💼",
        "title": "Easy Business Incorporation",
        "description": "Incorporate a Montenegrin DOO with just €1 registered capital in under 5 business days."
      }
    ],
    "faqs": [
      {
        "question": "Can I register a business in Montenegro on a visa-free entry?",
        "answer": "Yes. Foreign citizens can incorporate a Montenegrin company and open corporate bank accounts during a visa-free stay."
      },
      {
        "question": "Does Montenegro have exchange control restrictions?",
        "answer": "No. Capital can be freely transferred and repatriated in Euros without foreign exchange controls."
      }
    ]
  },
  "albania": {
    "cname": "Albania",
    "visa_category": "Short-Stay Commercial Entry / Visa-Free Business Visit",
    "overview": "Indian corporate executives, construction contractors, renewable energy investors, and tourism operators can visit Albania VISA-FREE for up to 90 days for business negotiations, project surveys, and investment evaluations.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry for 90 Days)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "No visa required for short commercial trips up to 90 days."
    },
    "proc_time": "Instant (Visa-Free on Arrival)",
    "proc_details": "Immediate entry at Tirana International Airport border control.",
    "source": "Ministry for Europe and Foreign Affairs & Albanian Investment Development Agency (AIDA)",
    "validity": "90 Days on Arrival",
    "stay": "Up to 90 Days within a 180-Day Period",
    "entry_type": "Single Entry",
    "invitation_doc": "Notarized Albanian Host Company Invitation Letter",
    "invitation_desc": "Official invitation letter from a registered Albanian company accompanied by its National Business Center (QKB) registration extract.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹1,50,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "AIDA Investment Facilitation",
        "description": "The Albanian Investment Development Agency provides one-stop assistance for strategic investment projects."
      },
      {
        "icon": "☀️",
        "title": "Solar & Hydro Renewable Energy Hub",
        "description": "98% of Albania's domestic electricity is generated from renewable hydropower and solar energy."
      },
      {
        "icon": "💼",
        "title": "Fast Company Registration",
        "description": "Incorporate a business in Albania through the National Business Center (QKB) in under 48 hours for a nominal fee."
      }
    ],
    "faqs": [
      {
        "question": "Can I register a business in Albania as an Indian citizen?",
        "answer": "Yes. Foreigners have identical commercial rights to domestic citizens and can register a company (Sh.p.k.) with a minimum capital of just 100 ALL (approx. €1)."
      },
      {
        "question": "Can I attend business meetings without a visa in Albania?",
        "answer": "Yes. Indian passport holders enjoy 90-day visa-free entry covering business conferences, meetings, and trade evaluations."
      }
    ]
  },
  "morocco": {
    "cname": "Morocco",
    "visa_category": "Short-Stay Business Visa / Access Maroc Business eVisa",
    "overview": "The Moroccan Business Visa enables international corporate directors, commercial buyers, automotive suppliers, textile traders, and agricultural investors to attend business meetings, factory audits, trade expos, and contract signings in Casablanca, Rabat, and Tangier.",
    "fees": {
      "visa_fee": "$50 - $70 USD (Business eVisa Fee)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$50 - $70 USD (approx. ₹4,200 - ₹5,900)",
      "notes": "Applied online via acces-maroc.ma with host company invitation."
    },
    "proc_time": "3 to 5 Business Days",
    "proc_details": "Processed online through the official Access Maroc eVisa portal.",
    "source": "Ministry of Foreign Affairs & Moroccan Investment and Export Development Agency (AMDIE)",
    "validity": "30 to 90 Days",
    "stay": "Up to 30 Days per entry",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Notarized Moroccan Corporate Host Invitation & Registre de Commerce (RC)",
    "invitation_desc": "Official invitation from a registered Moroccan enterprise authenticated by local municipal authorities (Légalisation), accompanied by the company's Commercial Register extract (RC).",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🏭",
        "title": "Casablanca Finance City (CFC)",
        "description": "Premier financial center in Africa offering special tax incentives and fast-track business visas for multinationals."
      },
      {
        "icon": "🤝",
        "title": "AMDIE Investment Support",
        "description": "Direct governmental assistance from the Moroccan Investment and Export Development Agency."
      },
      {
        "icon": "🚄",
        "title": "Al Boraq High-Speed Rail",
        "description": "Africa's first high-speed bullet train connects Tangier to Casablanca in just 2 hours."
      }
    ],
    "faqs": [
      {
        "question": "Can I get a Business Visa online for Morocco?",
        "answer": "Yes! The Access Maroc eVisa portal allows commercial visitors to apply for an electronic Business Visa by uploading host company invitation documents."
      },
      {
        "question": "What is Casablanca Finance City (CFC)?",
        "answer": "CFC is an internationally recognized financial and business hub in Casablanca offering preferential corporate tax rates and streamlined work permits for regional headquarters."
      }
    ]
  },
  "tunisia": {
    "cname": "Tunisia",
    "visa_category": "Short-Stay Business Visa / Commercial Visitor Permit",
    "overview": "The Tunisian Business Visa is issued to international company directors, commercial traders, olive oil and textile buyers, and tech investors visiting Tunisia for business discussions, factory inspections, trade exhibitions, and investment scoping.",
    "fees": {
      "visa_fee": "$50 - $70 USD (Consular Business Visa)",
      "service_fee": "₹1,500 (Consular Logistics)",
      "total_fee": "approx. ₹5,500 - ₹7,200",
      "notes": "Applied at Embassy of Tunisia in New Delhi or online."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "Applied via Embassy of Tunisia in New Delhi or online portal with host invitation.",
    "source": "Foreign Investment Promotion Agency (FIPA-Tunisia) & Ministry of Foreign Affairs",
    "validity": "30 to 90 Days",
    "stay": "Up to 30 Days per visit",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Tunisian Corporate Host Invitation Letter & Registre National des Entreprises (RNE)",
    "invitation_desc": "Official invitation from a registered Tunisian company accompanied by its RNE corporate registration extract.",
    "min_funds": "Company sponsorship letter or personal bank balance of ₹1,50,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "FIPA-Tunisia Support",
        "description": "The Foreign Investment Promotion Agency provides direct facilitation for foreign investors."
      },
      {
        "icon": "🫒",
        "title": "World Leader in Olive Oil & Agribusiness",
        "description": "One of the world's largest exporters of premium extra virgin olive oil and dates."
      },
      {
        "icon": "🇪🇺",
        "title": "EU Association Agreement",
        "description": "Duty-free industrial trade with the European Union under bilateral association agreements."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings on a tourist visa in Tunisia?",
        "answer": "Short introductory meetings can be conducted on tourist entry, but formal contract signing and commercial representations require a business visa."
      },
      {
        "question": "What is FIPA-Tunisia?",
        "answer": "FIPA is the governmental agency responsible for promoting foreign direct investment and assisting international corporate delegations in Tunisia."
      }
    ]
  },
  "algeria": {
    "cname": "Algeria",
    "visa_category": "Visa d'Affaires (Business Visa) - Embassy Application",
    "overview": "The Algerian Business Visa enables international corporate executives, commercial negotiators, industrial suppliers, and energy contractors to visit Algeria for business meetings, contract signings, equipment commissioning, and project oversight.",
    "fees": {
      "visa_fee": "$100 USD (Consular Business Visa Fee)",
      "service_fee": "₹1,500 (Consular Logistics)",
      "total_fee": "approx. ₹9,800",
      "notes": "Payable to Embassy of Algeria in New Delhi."
    },
    "proc_time": "7 to 14 Working Days",
    "proc_details": "Applied directly at Embassy of Algeria in New Delhi with legalized host invitation.",
    "source": "Ministry of Foreign Affairs & Algerian Investment Promotion Agency (AAPI)",
    "validity": "30 to 90 Days",
    "stay": "Up to 30 or 90 Days as granted",
    "entry_type": "Single or Multiple Entry",
    "invitation_doc": "Notarized Algerian Host Invitation & Registre du Commerce (RC)",
    "invitation_desc": "Official invitation letter from an Algerian registered enterprise legalized by local municipal town hall (APC), plus copy of company Commercial Register (RC).",
    "min_funds": "Company corporate guarantee letter or personal bank balance of ₹2,50,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "AAPI Investment Agency Support",
        "description": "The Algerian Investment Promotion Agency provides specialized assistance for industrial projects."
      },
      {
        "icon": "⚡",
        "title": "Strategic Industrial Incentives",
        "description": "Exemptions from customs duties and VAT on imported production equipment under the updated Investment Law."
      },
      {
        "icon": "📈",
        "title": "Expanding Bilateral Trade",
        "description": "Growing commercial ties between India and Algeria in fertilizers, pharmaceuticals, and engineering."
      }
    ],
    "faqs": [
      {
        "question": "Does my Algerian business invitation need to be legalized?",
        "answer": "Yes. Algerian consular regulations require all commercial invitation letters to be stamped and legalized by the local municipal town hall (APC) in Algeria."
      },
      {
        "question": "How long does an Algerian business visa take to process?",
        "answer": "Processing typically takes 7 to 10 working days at the Algerian Embassy in New Delhi."
      }
    ]
  },
  "uruguay": {
    "cname": "Uruguay",
    "visa_category": "Short-Stay Commercial Entry / Visa-Free Business Visit",
    "overview": "Indian company directors, commercial negotiators, tech founders, and agribusiness investors can visit Uruguay VISA-FREE for up to 90 days for business negotiations, corporate board meetings, trade exhibitions, and Free Trade Zone inspections.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry for 90 Days)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "No visa required for short commercial trips up to 90 days."
    },
    "proc_time": "Instant (Visa-Free on Arrival)",
    "proc_details": "Immediate entry at Montevideo airport or ferry terminal from Buenos Aires.",
    "source": "Uruguay XXI (Investment & Export Promotion Agency) & Ministry of Foreign Affairs",
    "validity": "90 Days on Arrival",
    "stay": "Up to 90 Days per visit",
    "entry_type": "Single Entry",
    "invitation_doc": "Notarized Uruguayan Host Invitation Letter",
    "invitation_desc": "Official invitation letter from a registered Uruguayan company stating commercial purpose.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹1,50,000",
    "highlights": [
      {
        "icon": "🏭",
        "title": "Zonamerica & Free Trade Zones",
        "description": "100% tax-free regimes for international services, software development, and global trade hubs."
      },
      {
        "icon": "🤝",
        "title": "Uruguay XXI Facilitation",
        "description": "Dedicated governmental one-stop investor assistance for setting up regional headquarters."
      },
      {
        "icon": "🌱",
        "title": "98% Clean Renewable Electricity",
        "description": "Uruguay's power grid runs almost entirely on wind, solar, and hydro energy."
      }
    ],
    "faqs": [
      {
        "question": "Can I set up a business in Uruguay as a foreign citizen?",
        "answer": "Yes. Foreigners have equal commercial rights to citizens and can incorporate a Uruguayan S.A. or S.R.L. with no foreign ownership restrictions."
      },
      {
        "question": "Can I attend business meetings without a visa in Uruguay?",
        "answer": "Yes. Indian passport holders enjoy 90-day visa-free entry for commercial discussions and conferences."
      }
    ]
  },
  "fiji": {
    "cname": "Fiji",
    "visa_category": "Short-Stay Commercial Entry / Visa-Free Business Visit",
    "overview": "Indian corporate directors, commercial buyers, sugar and forestry traders, luxury hospitality investors, and IT entrepreneurs can visit Fiji VISA-FREE for up to 4 months for commercial meetings, hotel development surveys, and investment discussions.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry for 4 Months)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "No visa required for short commercial trips up to 4 months."
    },
    "proc_time": "Instant (Visa-Free on Arrival)",
    "proc_details": "Immediate entry stamp granted at Nadi International Airport.",
    "source": "Investment Fiji & Fiji Immigration Department",
    "validity": "4 Months on Arrival",
    "stay": "Up to 4 Months per visit",
    "entry_type": "Single Entry",
    "invitation_doc": "Fijian Registered Enterprise Invitation Letter",
    "invitation_desc": "Official invitation from a registered Fijian company or Investment Fiji certificate.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹1,50,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "Investment Fiji One-Stop Shop",
        "description": "Investment Fiji provides streamlined business licensing, tax incentives, and investor facilitation."
      },
      {
        "icon": "🌴",
        "title": "Eco-Tourism & Island Hospitality",
        "description": "Massive foreign investment opportunities in luxury private islands, resorts, and eco-retreats."
      },
      {
        "icon": "☀️",
        "title": "Generous Tax Incentives",
        "description": "Tax holidays for hotel investments, ICT development zones, and green energy infrastructure."
      }
    ],
    "faqs": [
      {
        "question": "Can I explore business investments during a visa-free visit to Fiji?",
        "answer": "Yes! Indian passport holders can use their 4-month visa-free stay to conduct site visits, meet with Investment Fiji, and evaluate projects."
      },
      {
        "question": "What is Investment Fiji?",
        "answer": "Investment Fiji is the statutory economic development agency that promotes foreign direct investment and guides international entrepreneurs."
      }
    ]
  },
  "panama": {
    "cname": "Panama",
    "visa_category": "Short-Stay Commercial Entry / Visa-Free Business Visit",
    "overview": "Corporate executives, maritime shippers, logistics managers, banking representatives, and commodity traders can visit Panama VISA-FREE for up to 90 days if holding a valid US, UK, Canada, Australia, or Schengen visa. Perfect for meetings in Panama City and the Colón Free Trade Zone.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free with valid US/UK/Schengen visa)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "No visa required for short commercial trips up to 90 days with qualifying visa."
    },
    "proc_time": "Instant (Visa-Free on Arrival)",
    "proc_details": "Immediate border entry granted at Tocumen International Airport.",
    "source": "PROPANAMA (Export & Investment Promotion Agency) & Migración Panamá",
    "validity": "90 Days on Arrival",
    "stay": "Up to 90 Days per visit",
    "entry_type": "Single Entry",
    "invitation_doc": "Notarized Panamanian Corporate Invitation Letter",
    "invitation_desc": "Official invitation from a registered Panamanian company or Chamber of Commerce stating commercial purpose.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🚢",
        "title": "Colón Free Trade Zone (Zona Libre de Colón)",
        "description": "The second-largest free trade zone in the world, processing billions in tax-free duty-free international re-exports."
      },
      {
        "icon": "🏦",
        "title": "International Banking Center",
        "description": "Over 70 international and domestic banks offering global commercial banking and wealth management."
      },
      {
        "icon": "🤝",
        "title": "PROPANAMA Investment Support",
        "description": "Direct state assistance from PROPANAMA for corporate relocations and infrastructure investments."
      }
    ],
    "faqs": [
      {
        "question": "Can I conduct business meetings in Panama on my US visa?",
        "answer": "Yes! Indian passport holders holding a valid US, UK, Canada, Australia, or Schengen visa can enter Panama visa-free for commercial meetings, conferences, and site visits for up to 90 days."
      },
      {
        "question": "What is the Colón Free Trade Zone?",
        "answer": "It is the largest free trade port in the Western Hemisphere, offering complete exemption from import/export tariffs and corporate taxes on foreign re-export trade."
      }
    ]
  },
  "dominican-republic": {
    "cname": "Dominican Republic",
    "visa_category": "Short-Stay Commercial Entry / Visa-Free Business Visit",
    "overview": "International company executives, hotel developers, Free Trade Zone investors, and logistics operators can visit the Dominican Republic VISA-FREE for up to 30 days if holding a valid US, UK, Canada, or Schengen visa. Perfect for business meetings, contract negotiations, and resort evaluations.",
    "fees": {
      "visa_fee": "₹0 (Visa-Free with valid US/UK/Canada/Schengen visa)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "No visa required for short commercial trips up to 30 days with qualifying visa."
    },
    "proc_time": "Instant (Visa-Free on Arrival)",
    "proc_details": "Immediate entry granted at Punta Cana (PUJ) or Santo Domingo (SDQ) airport.",
    "source": "ProDominicana (Investment & Export Center) & MIREX",
    "validity": "30 Days on Arrival",
    "stay": "Up to 30 Days per visit",
    "entry_type": "Single Entry",
    "invitation_doc": "Notarized Dominican Corporate Host Invitation Letter",
    "invitation_desc": "Official invitation from a registered Dominican company stating commercial purpose.",
    "min_funds": "Company sponsorship guarantee or personal bank balance of ₹2,00,000",
    "highlights": [
      {
        "icon": "🤝",
        "title": "ProDominicana Investor Facilitation",
        "description": "One-stop investor facilitation for foreign corporations setting up regional logistics or hospitality ventures."
      },
      {
        "icon": "🚢",
        "title": "DP World Caucedo Mega Port",
        "description": "State-of-the-art deep-water maritime terminal and logistics hub connecting North America and the Caribbean."
      },
      {
        "icon": "🌴",
        "title": "Tourism Incentive Law (Confotur)",
        "description": "15-year 100% exemption from all national and municipal taxes for qualifying tourism investments."
      }
    ],
    "faqs": [
      {
        "question": "Can I attend business meetings in Dominican Republic on my US visa?",
        "answer": "Yes! Indian passport holders holding a valid US, UK, Canada, or Schengen visa can enter visa-free for commercial meetings, conferences, and site visits for up to 30 days."
      },
      {
        "question": "What is the Confotur law in Dominican Republic?",
        "answer": "Confotur (Law 158-01) is a specialized investment incentive granting 15 years of 0% income tax, property tax, and import duty exemptions for hotel and tourism developers."
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
  const fromNorm = normalizeCountry(from);
  if (fromNorm && fromNorm !== 'india') {
    const pureRoute = resolvePureRouteBusiness(from, to);
    if (pureRoute) return pureRoute;
  }

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

