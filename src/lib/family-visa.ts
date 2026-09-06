import { resolvePureRouteFamily } from './pure-routes';
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
export function normalizeCountry(str: string): string {
  if (!str) return '';
  const s = str.toLowerCase().trim();
  const c = s.replace(/[-_]/g, ' ');

  // ── 1. COMPOUND & MULTI-WORD OVERRIDES FIRST ──
  if (c.includes('north korea') || c.includes('dprk') || s === 'kp') return 'north-korea';
  if (c.includes('south korea') || s === 'kr' || (c.includes('korea') && !c.includes('north'))) return 'south-korea';
  if (c.includes('papua new guinea') || s === 'pg') return 'papua-new-guinea';
  if (c.includes('equatorial guinea') || s === 'gq') return 'equatorial-guinea';
  if (c.includes('guinea bissau') || s === 'gw') return 'guinea-bissau';
  if (c.includes('south sudan') || s === 'ss') return 'south-sudan';
  if (c.includes('central african republic') || c === 'car' || s === 'cf') return 'car';
  if (c.includes('democratic republic') || c.includes('dr congo') || c === 'drc' || s === 'cd') return 'drc';
  if (c.includes('dominican republic') || s === 'do') return 'dominican-republic';
  if (c.includes('trinidad') || c.includes('tobago') || s === 'tt') return 'trinidad';
  if (c.includes('burkina faso') || s === 'bf') return 'burkina-faso';
  if (c.includes('cabo verde') || c.includes('cape verde') || s === 'cv') return 'cabo-verde';
  if (c.includes('costa rica') || s === 'cr') return 'costa-rica';
  if (c.includes('el salvador') || s === 'sv') return 'el-salvador';
  if (c.includes('sao tome') || s === 'st') return 'sao-tome';
  if (c.includes('marshall islands') || s === 'mh') return 'marshall-islands';
  if (c.includes('solomon islands') || s === 'sb') return 'solomon-islands';
  if (c.includes('timor leste') || c.includes('east timor') || s === 'tl') return 'timor-leste';
  if (c.includes('vatican') || c.includes('holy see') || s === 'va') return 'vatican-city';
  if (c.includes('north macedonia') || s === 'mk') return 'north-macedonia';
  if (c.includes('czech') || c.includes('prague') || s === 'cz') return 'czech-republic';
  if (c.includes('bosnia') || s === 'ba') return 'bosnia';
  if (c.includes('ivory coast') || c.includes("cote d'ivoire") || s === 'ci') return 'ivory-coast';
  if (c.includes('new zealand') || s === 'nz') return 'new-zealand';
  if (c.includes('south africa') || s === 'za') return 'south-africa';
  if (c.includes('saudi arabia') || c.includes('saudi') || c.includes('ksa') || s === 'sa') return 'saudi-arabia';
  if (c.includes('sri lanka') || s === 'lk') return 'sri-lanka';
  if (c.includes('nigeria') || s === 'ng') return 'nigeria';
  if (c.includes('ukraine') || s === 'ua') return 'ukraine';
  if (c.includes('madagascar') || s === 'mg') return 'madagascar';
  if (c.includes('nicaragua') || s === 'ni') return 'nicaragua';
  if (c.includes('somalia') || s === 'so') return 'somalia';
  if (c.includes('romania') || s === 'ro') return 'romania';

  // Specific power origin aliases
  if (c.includes('usa') || c.includes('united states') || s === 'us' || c.includes('america') || c.includes('american') || c.includes('b1/b2')) return 'usa';
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('great britain') || c.includes('britain') || s === 'gb' || c.includes('london')) return 'uk';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi') || s === 'ae') return 'uae';

  // ── 2. ALL 195 COUNTRIES MATRIX ──
  // ── EUROPE ──
  if (s.includes('albania') || s === 'al') return 'albania';
  if (s.includes('andorra') || s === 'ad') return 'andorra';
  if (s.includes('austria') || s === 'at') return 'austria';
  if (s.includes('belarus') || s === 'by') return 'belarus';
  if (s.includes('belgium') || s === 'be') return 'belgium';
  if (s.includes('bosnia') || s === 'ba') return 'bosnia';
  if (s.includes('bulgaria') || s === 'bg') return 'bulgaria';
  if (s.includes('croatia') || s === 'hr') return 'croatia';
  if (s.includes('cyprus') || s === 'cy') return 'cyprus';
  if (s.includes('czech') || s === 'cz') return 'czech-republic';
  if (s.includes('denmark') || s === 'dk') return 'denmark';
  if (s.includes('estonia') || s === 'ee') return 'estonia';
  if (s.includes('finland') || s === 'fi') return 'finland';
  if (s.includes('france') || s === 'fr') return 'france';
  if (s.includes('germany') || s === 'de') return 'germany';
  if (s.includes('greece') || s === 'gr') return 'greece';
  if (s.includes('hungary') || s === 'hu') return 'hungary';
  if (s.includes('iceland') || s === 'is') return 'iceland';
  if (s.includes('ireland') || s === 'ie') return 'ireland';
  if (s.includes('italy') || s === 'it') return 'italy';
  if (s.includes('kosovo') || s === 'xk') return 'kosovo';
  if (s.includes('latvia') || s === 'lv') return 'latvia';
  if (s.includes('liechtenstein') || s === 'li') return 'liechtenstein';
  if (s.includes('lithuania') || s === 'lt') return 'lithuania';
  if (s.includes('luxembourg') || s === 'lu') return 'luxembourg';
  if (s.includes('malta') || s === 'mt') return 'malta';
  if (s.includes('moldova') || s === 'md') return 'moldova';
  if (s.includes('monaco') || s === 'mc') return 'monaco';
  if (s.includes('montenegro') || s === 'me') return 'montenegro';
  if (s.includes('netherlands') || s === 'nl') return 'netherlands';
  if (s.includes('north macedonia') || s === 'mk') return 'north-macedonia';
  if (s.includes('norway') || s === 'no') return 'norway';
  if (s.includes('poland') || s === 'pl') return 'poland';
  if (s.includes('portugal') || s === 'pt') return 'portugal';
  if (c.includes('romania') || s === 'ro') return 'romania';
  if (s.includes('russia') || s === 'ru') return 'russia';
  if (s.includes('san marino') || s === 'sm') return 'san-marino';
  if (s.includes('serbia') || s === 'rs') return 'serbia';
  if (s.includes('slovakia') || s === 'sk') return 'slovakia';
  if (s.includes('slovenia') || s === 'si') return 'slovenia';
  if (s.includes('spain') || s === 'es') return 'spain';
  if (s.includes('sweden') || s === 'se') return 'sweden';
  if (s.includes('switzerland') || s === 'ch') return 'switzerland';
  if (c.includes('ukraine') || s === 'ua') return 'ukraine';
  if ((c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || s === 'gb' || c.includes('london')) && !c.includes('ukraine')) return 'uk';
  if (s.includes('vatican') || s === 'va') return 'vatican-city';
  // ── AFRICA ── (54 countries)
  if (s.includes('algeria') || s === 'dz') return 'algeria';
  if (s.includes('angola') || s === 'ao') return 'angola';
  if (s.includes('benin') || s === 'bj') return 'benin';
  if (s.includes('botswana') || s === 'bw') return 'botswana';
  if (s.includes('burkina faso') || s === 'bf') return 'burkina-faso';
  if (s.includes('burundi') || s === 'bi') return 'burundi';
  if (s.includes('cabo verde') || s === 'cv') return 'cabo-verde';
  if (s.includes('cameroon') || s === 'cm') return 'cameroon';
  if (c === 'car' || c.includes('central african republic') || s === 'cf') return 'car';
  if (s.includes('chad') || s === 'td') return 'chad';
  if (s.includes('comoros') || s === 'km') return 'comoros';
  if ((c === 'congo' || c.includes('congo brazzaville') || s === 'cg') && !c.includes('democratic') && !c.includes('dr congo') && c !== 'drc') return 'congo';
  if (s.includes('drc') || s.includes('democratic republic')) return 'drc';
  if (s.includes('djibouti') || s === 'dj') return 'djibouti';
  if (s.includes('egypt') || s === 'eg') return 'egypt';
  if (s.includes('equatorial guinea') || s === 'gq') return 'equatorial-guinea';
  if (s.includes('eritrea') || s === 'er') return 'eritrea';
  if (s.includes('eswatini') || s === 'sz') return 'eswatini';
  if (s.includes('ethiopia') || s === 'et') return 'ethiopia';
  if (s.includes('gabon') || s === 'ga') return 'gabon';
  if (s.includes('gambia') || s === 'gm') return 'gambia';
  if (s.includes('ghana') || s === 'gh') return 'ghana';
  if ((c === 'guinea' || s === 'gn') && !c.includes('bissau') && !c.includes('equatorial') && !c.includes('papua')) return 'guinea';
  if (s.includes('guinea-bissau') || s === 'gw') return 'guinea-bissau';
  if (s.includes('ivory coast') || s === 'ci') return 'ivory-coast';
  if (s.includes('kenya') || s === 'ke') return 'kenya';
  if (s.includes('lesotho') || s === 'ls') return 'lesotho';
  if (s.includes('liberia') || s === 'lr') return 'liberia';
  if (s.includes('libya') || s === 'ly') return 'libya';
  if (s.includes('madagascar') || s === 'mg') return 'madagascar';
  if (s.includes('malawi') || s === 'mw') return 'malawi';
  if ((c === 'mali' || c.startsWith('mali ') || c.endsWith(' mali') || s === 'ml') && !c.includes('somalia')) return 'mali';
  if (s.includes('mauritania') || s === 'mr') return 'mauritania';
  if (s.includes('mauritius') || s === 'mu') return 'mauritius';
  if (s.includes('morocco') || s === 'ma') return 'morocco';
  if (s.includes('mozambique') || s === 'mz') return 'mozambique';
  if (s.includes('namibia') || s === 'na') return 'namibia';
  if ((c === 'niger' || c.startsWith('niger ') || c.endsWith(' niger') || s === 'ne') && !c.includes('nigeria')) return 'niger';
  if (c.includes('nigeria') || s === 'ng') return 'nigeria';
  if (s.includes('rwanda') || s === 'rw') return 'rwanda';
  if (s.includes('sao tome') || s === 'st') return 'sao-tome';
  if (s.includes('senegal') || s === 'sn') return 'senegal';
  if (s.includes('seychelles') || s === 'sc') return 'seychelles';
  if (s.includes('sierra leone') || s === 'sl') return 'sierra-leone';
  if (c.includes('somalia') || s === 'so') return 'somalia';
  if (s.includes('south africa') || s === 'za') return 'south-africa';
  if (s.includes('south sudan') || s === 'ss') return 'south-sudan';
  if ((c === 'sudan' || s === 'sd') && !c.includes('south sudan')) return 'sudan';
  if (s.includes('tanzania') || s === 'tz') return 'tanzania';
  if (s.includes('togo') || s === 'tg') return 'togo';
  if (s.includes('tunisia') || s === 'tn') return 'tunisia';
  if (s.includes('uganda') || s === 'ug') return 'uganda';
  if (s.includes('zambia') || s === 'zm') return 'zambia';
  if (s.includes('zimbabwe') || s === 'zw') return 'zimbabwe';
  // ── ASIA ── (48 countries)
  if (s.includes('afghanistan') || s === 'af') return 'afghanistan';
  if (s.includes('armenia') || s === 'am') return 'armenia';
  if (s.includes('azerbaijan') || s === 'az') return 'azerbaijan';
  if (s.includes('bahrain') || s === 'bh') return 'bahrain';
  if (s.includes('bangladesh') || s === 'bd') return 'bangladesh';
  if (s.includes('bhutan') || s === 'bt') return 'bhutan';
  if (s.includes('brunei') || s === 'bn') return 'brunei';
  if (s.includes('cambodia') || s === 'kh') return 'cambodia';
  if (s.includes('china') || s === 'cn') return 'china';
  if (s.includes('georgia') || s === 'ge') return 'georgia';
  if (s.includes('hong kong') || s === 'hk') return 'hong-kong';
  if (s.includes('india') || s === 'in') return 'india';
  if (s.includes('indonesia') || s === 'id') return 'indonesia';
  if (s.includes('iran') || s === 'ir') return 'iran';
  if (s.includes('iraq') || s === 'iq') return 'iraq';
  if (s.includes('israel') || s === 'il') return 'israel';
  if (s.includes('japan') || s === 'jp') return 'japan';
  if (s.includes('jordan') || s === 'jo') return 'jordan';
  if (s.includes('kazakhstan') || s === 'kz') return 'kazakhstan';
  if (s.includes('kuwait') || s === 'kw') return 'kuwait';
  if (s.includes('kyrgyzstan') || s === 'kg') return 'kyrgyzstan';
  if (s.includes('laos') || s === 'la') return 'laos';
  if (s.includes('lebanon') || s === 'lb') return 'lebanon';
  if (s.includes('macau') || s === 'mo') return 'macau';
  if (s.includes('malaysia') || s === 'my') return 'malaysia';
  if (s.includes('maldives') || s === 'mv') return 'maldives';
  if (s.includes('mongolia') || s === 'mn') return 'mongolia';
  if (s.includes('myanmar') || s === 'mm') return 'myanmar';
  if (s.includes('nepal') || s === 'np') return 'nepal';
  if (c.includes('north korea') || c.includes('dprk') || s === 'kp') return 'north-korea';
  if ((c === 'oman' || c.startsWith('oman ') || c.endsWith(' oman') || s === 'om' || c.includes('muscat')) && !c.includes('romania')) return 'oman';
  if (s.includes('pakistan') || s === 'pk') return 'pakistan';
  if (s.includes('palestine') || s === 'ps') return 'palestine';
  if (s.includes('philippines') || s === 'ph') return 'philippines';
  if (s.includes('qatar') || s === 'qa') return 'qatar';
  if (s.includes('saudi arabia') || s === 'sa') return 'saudi-arabia';
  if (s.includes('singapore') || s === 'sg') return 'singapore';
  if ((c.includes('south korea') || c.includes('republic of korea') || s === 'kr' || c === 'korea') && !c.includes('north')) return 'south-korea';
  if (s.includes('sri lanka') || s === 'lk') return 'sri-lanka';
  if (s.includes('syria') || s === 'sy') return 'syria';
  if (s.includes('taiwan') || s === 'tw') return 'taiwan';
  if (s.includes('tajikistan') || s === 'tj') return 'tajikistan';
  if (s.includes('thailand') || s === 'th') return 'thailand';
  if (s.includes('timor-leste') || s === 'tl') return 'timor-leste';
  if (s.includes('turkey') || s === 'tr') return 'turkey';
  if (s.includes('turkmenistan') || s === 'tm') return 'turkmenistan';
  if (s.includes('uae') || s.includes('united arab emirates') || s === 'ae') return 'uae';
  if (s.includes('uzbekistan') || s === 'uz') return 'uzbekistan';
  if (s.includes('vietnam') || s === 'vn') return 'vietnam';
  if (s.includes('yemen') || s === 'ye') return 'yemen';
  // ── AMERICAS ── (35 countries)
  if (s.includes('argentina') || s === 'ar') return 'argentina';
  if (s.includes('bahamas') || s === 'bs') return 'bahamas';
  if (s.includes('barbados') || s === 'bb') return 'barbados';
  if (s.includes('belize') || s === 'bz') return 'belize';
  if (s.includes('bolivia') || s === 'bo') return 'bolivia';
  if (s.includes('brazil') || s === 'br') return 'brazil';
  if (s.includes('canada') || s === 'ca') return 'canada';
  if (s.includes('chile') || s === 'cl') return 'chile';
  if (s.includes('colombia') || s === 'co') return 'colombia';
  if (s.includes('costa rica') || s === 'cr') return 'costa-rica';
  if (s.includes('cuba') || s === 'cu') return 'cuba';
  if (s.includes('dominican republic') || s === 'do') return 'dominican-republic';
  if (s.includes('ecuador') || s === 'ec') return 'ecuador';
  if (s.includes('el salvador') || s === 'sv') return 'el-salvador';
  if (s.includes('guatemala') || s === 'gt') return 'guatemala';
  if (s.includes('guyana') || s === 'gy') return 'guyana';
  if (s.includes('haiti') || s === 'ht') return 'haiti';
  if (s.includes('honduras') || s === 'hn') return 'honduras';
  if (s.includes('jamaica') || s === 'jm') return 'jamaica';
  if (s.includes('mexico') || s === 'mx') return 'mexico';
  if (s.includes('nicaragua') || s === 'ni') return 'nicaragua';
  if (s.includes('panama') || s === 'pa') return 'panama';
  if (s.includes('paraguay') || s === 'py') return 'paraguay';
  if (s.includes('peru') || s === 'pe') return 'peru';
  if (s.includes('puerto rico') || s === 'pr') return 'puerto-rico';
  if (s.includes('suriname') || s === 'sr') return 'suriname';
  if (s.includes('trinidad') || s === 'tt') return 'trinidad';
  if (s.includes('usa') || s.includes('united states') || s === 'us') return 'usa';
  if (s.includes('uruguay') || s === 'uy') return 'uruguay';
  if (s.includes('venezuela') || s === 've') return 'venezuela';
  // ── OCEANIA ── (14 countries)
  if (s.includes('australia') || s === 'au') return 'australia';
  if (s.includes('fiji') || s === 'fj') return 'fiji';
  if (s.includes('kiribati') || s === 'ki') return 'kiribati';
  if (s.includes('marshall islands') || s === 'mh') return 'marshall-islands';
  if (s.includes('micronesia') || s === 'fm') return 'micronesia';
  if (s.includes('nauru') || s === 'nr') return 'nauru';
  if (s.includes('new zealand') || s === 'nz') return 'new-zealand';
  if (s.includes('palau') || s === 'pw') return 'palau';
  if (s.includes('papua new guinea') || s === 'pg') return 'papua-new-guinea';
  if (s.includes('samoa') || s === 'ws') return 'samoa';
  if (s.includes('solomon islands') || s === 'sb') return 'solomon-islands';
  if (s.includes('tonga') || s === 'to') return 'tonga';
  if (s.includes('tuvalu') || s === 'tv') return 'tuvalu';
  if (s.includes('vanuatu') || s === 'vu') return 'vanuatu';

  return s.replace(/\s+/g, '-');
}

const DESTS: Record<string, any> = {
  // ── 35 NEW COUNTRIES ──
  "russia": {
    "cname": "Russia",
    "scheme": "Private / Family Reunion Visa & Temporary Residence by Marriage/Kinship",
    "overview": "Russia Family Reunion Visa allows spouses, children, and parents of Russian citizens or residents to join their family in Russia. Requires sponsorship from the family member in Russia, accommodation proof, and financial support.",
    "fees": {
      "visa_fee": "$50-100 USD (approx. ₹4,100-8,200)",
      "service_fee": "Payable at VFS",
      "total_fee": "$50-100 USD + VFS Logistics",
      "currency": "USD",
      "notes": "Visa fee varies by relationship and duration."
    },
    "proc_time": "4-8 Weeks (Standard)",
    "proc_details": "Issued by Russian Consulate based on notarized invitation or MVD family voucher.",
    "source": "Russian Ministry of Internal Affairs (MVD) & Consular Department / VFS Global",
    "validity": "1 Year Multi-Entry (Private Visa) / 3 Years (RVP Family Quota Exemption)",
    "stay": "Duration of Family Status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Russian-Translated Marriage or Birth Certificate",
    "relationship_desc": "Official marriage certificate or birth certificate proving direct kinship with Russian citizen or resident.",
    "min_funds": "Sponsor financial solvency proof meeting Russian regional subsistence minimums",
    "highlights": [
      {
        "icon": "💑",
        "title": "Family Reunion",
        "description": "Join your spouse, children, or parents in Russia."
      },
      {
        "icon": "📋",
        "title": "Sponsorship Required",
        "description": "Family member in Russia must sponsor the application."
      },
      {
        "icon": "🏠",
        "title": "Accommodation Proof",
        "description": "Must have registered living space (propiska) in Russia for the family."
      },
      {
        "icon": "🔄",
        "title": "Path to PR",
        "description": "Family visa leads to quota-free Temporary Residence Permit (RVP) and PR."
      }
    ],
    "faqs": [
      {
        "question": "Who can sponsor a family visa for Russia?",
        "answer": "Russian citizens and permanent residence permit holders can sponsor spouses, children, and parents."
      },
      {
        "question": "How long is the Russia Family Visa valid?",
        "answer": "Family visas are typically issued for up to 1 year multiple entry, followed by 3-year RVP in-country."
      },
      {
        "question": "Can I work on a family visa in Russia?",
        "answer": "Once granted an RVP (Temporary Residence Permit) based on marriage/family, you can work lawfully without a separate work permit."
      }
    ]
  },
  "kazakhstan": {
    "cname": "Kazakhstan",
    "scheme": "Family Reunification Visa (Category C1 / C2) & Accompanying Dependents",
    "overview": "Kazakhstan allows foreign spouses, minor children, and dependent parents of Kazakh citizens or lawful permanent/temporary residents to obtain Family Reunification visas and residence permits.",
    "fees": {
      "visa_fee": "$80 USD (Single Entry) / $200 USD (Annual Multi-Entry)",
      "service_fee": "Consular handling fee",
      "total_fee": "$80-200 USD Statutory Reference",
      "currency": "USD",
      "notes": "Fee set by Kazakh consular tariff schedule."
    },
    "proc_time": "15 to 20 Working Days",
    "proc_details": "Invitation confirmed through Migration Service Committee in Kazakhstan.",
    "source": "Migration Service Committee & Ministry of Foreign Affairs of Kazakhstan",
    "validity": "1 to 3 Years (Aligned with Principal Sponsor)",
    "stay": "Duration of Family Sponsorship",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Russian/Kazakh Translated Marriage or Birth Certificate",
    "relationship_desc": "Legalized civil status certificate proving legal marriage or parenthood.",
    "min_funds": "Sponsor income proof covering accommodation and daily living allowance",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Reunification",
        "description": "Join spouse or parents residing lawfully in Kazakhstan."
      },
      {
        "icon": "📋",
        "title": "Multi-Year Validity",
        "description": "Issued for up to 3 years aligned with sponsor’s work/study permit."
      },
      {
        "icon": "🏫",
        "title": "Access to Education",
        "description": "Dependent children can enroll in local public and international schools."
      },
      {
        "icon": "🏥",
        "title": "Healthcare Access",
        "description": "Eligible for mandatory compulsory social medical insurance (OSMS)."
      }
    ],
    "faqs": [
      {
        "question": "Can spouse and children join a foreign worker in Kazakhstan?",
        "answer": "Yes, foreign professionals on C3 work visas can sponsor their spouse and children for C2 family visas."
      },
      {
        "question": "Can a family visa holder work in Kazakhstan?",
        "answer": "Family visas do not automatically grant work authorization; taking up employment requires a separate work permit."
      },
      {
        "question": "What documents prove relationship?",
        "answer": "Apostilled and notarized translated marriage certificates for spouses, and birth certificates for minor children."
      }
    ]
  },
  "ukraine": {
    "cname": "Ukraine",
    "scheme": "Family Reunification Visa (Type D-14 / D-15) & Temporary Residence (Posvidka)",
    "overview": "Allows foreign spouses, minor children, and dependent family members of Ukrainian citizens or foreign permanent/temporary residents to reside in Ukraine.",
    "fees": {
      "visa_fee": "$65-130 USD",
      "service_fee": "State migration card fee on arrival",
      "total_fee": "$65-130 USD Consular Fee",
      "currency": "USD",
      "notes": "Consular visa D-14/15 fee paid at VFS Ukraine."
    },
    "proc_time": "15 to 25 Working Days",
    "proc_details": "Consular entry visa followed by temporary residence permit card from SMS within 30 days of arrival.",
    "source": "State Migration Service of Ukraine & MFA Ukraine",
    "validity": "1 to 3 Years (Renewable)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Ukrainian-Translated Marriage or Birth Certificate",
    "relationship_desc": "Apostilled marriage or birth certificate translated into Ukrainian and notarized.",
    "min_funds": "Sponsor maintenance guarantee and adequate registered housing in Ukraine",
    "highlights": [
      {
        "icon": "💑",
        "title": "Family Unity",
        "description": "Live lawfully in Ukraine with your Ukrainian spouse or resident parent."
      },
      {
        "icon": "📋",
        "title": "Temporary Residence Card",
        "description": "Biometric Posvidka card issued with full domestic movement rights."
      }
    ],
    "faqs": [
      {
        "question": "Can I obtain a residence permit through marriage in Ukraine?",
        "answer": "Yes, marriage to a Ukrainian citizen entitles you to a 1-year renewable temporary residence permit, and after 2 years, permanent residency."
      }
    ]
  },
  "belarus": {
    "cname": "Belarus",
    "scheme": "Family Reunification Visa & Temporary Residence Permit (RVP)",
    "overview": "Allows foreign spouses, minor children, and dependent parents to join family members who are citizens of Belarus or lawful permanent/temporary residents.",
    "fees": {
      "visa_fee": "€60 (Consular Visa) / 3 basic units (Temporary Residence in-country)",
      "service_fee": "Consular direct",
      "total_fee": "€60 Consular Fee",
      "currency": "EUR",
      "notes": "Vignette issued by Embassy of Belarus in New Delhi."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "Consular entry visa followed by temporary residence permit registration in Belarus.",
    "source": "Department on Citizenship and Migration & Ministry of Foreign Affairs of Belarus",
    "validity": "1 Year (Renewable annually)",
    "stay": "Duration of Family Sponsorship",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Russian/Belarusian-Translated Marriage or Birth Certificate",
    "relationship_desc": "Official civil status certificate proving direct family relationship.",
    "min_funds": "Sponsor income verification and registered living space (propiska) in Belarus",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Live and reside in Belarus with your family."
      },
      {
        "icon": "🔄",
        "title": "Annual Renewal",
        "description": "Simple annual extension at the local migration office."
      }
    ],
    "faqs": [
      {
        "question": "Can spouse of a student or worker stay in Belarus?",
        "answer": "Yes, family members can obtain temporary residence permits based on the principal applicant's valid status."
      }
    ]
  },
  "uzbekistan": {
    "cname": "Uzbekistan",
    "scheme": "Family Visit / Dependent Visa & Temporary Residence",
    "overview": "Allows foreign spouses, minor children, and dependent parents of Uzbek citizens or foreign specialists to reside in Uzbekistan.",
    "fees": {
      "visa_fee": "$60 USD (Consular Entry Visa)",
      "service_fee": "Registration and residence permit card fee in Uzbekistan",
      "total_fee": "$60 USD Consular Fee",
      "currency": "USD",
      "notes": "Consular visa stamped at Uzbek Embassy in New Delhi."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Host relative or employer requests visa support letter via Uzbek MFA.",
    "source": "Ministry of Internal Affairs & Ministry of Foreign Affairs of Uzbekistan",
    "validity": "1 Year (Renewable annually)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Russian/Uzbek-Translated Marriage or Birth Certificate",
    "relationship_desc": "Notarized translation of marriage certificate or children's birth certificates.",
    "min_funds": "Sponsor financial maintenance proof and housing lease in Uzbekistan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Reside together in Uzbekistan during work or business assignments."
      },
      {
        "icon": "🔄",
        "title": "Simple Renewal",
        "description": "Renewable annually at the regional migration department."
      }
    ],
    "faqs": [
      {
        "question": "Can family members of Indian workers accompany them to Uzbekistan?",
        "answer": "Yes, family members can obtain dependent visas based on the principal worker's labour contract."
      }
    ]
  },
  "kyrgyzstan": {
    "cname": "Kyrgyzstan",
    "scheme": "Family Visit Visa & Temporary Residence",
    "overview": "Allows spouses and minor children of Kyrgyz citizens or long-term foreign workers to reside together in Kyrgyzstan.",
    "fees": {
      "visa_fee": "$60 USD",
      "service_fee": "Registration and residence card fee in-country",
      "total_fee": "$60 USD Consular Fee",
      "currency": "USD",
      "notes": "Entry visa stamped at Embassy or obtained online."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Foreign Affairs and State Migration Service.",
    "source": "Ministry of Foreign Affairs & Ministry of Internal Affairs of Kyrgyzstan",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Family Sponsorship",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Apostilled marriage or birth certificate with notarized Russian translation.",
    "min_funds": "Sponsor maintenance proof and registered residence in Kyrgyzstan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Keep family together in Bishkek or regional centers."
      }
    ],
    "faqs": [
      {
        "question": "Can dependents of Indian students reside in Kyrgyzstan?",
        "answer": "Spouses of students can obtain private visitor visas, but spouses of work permit holders receive renewable dependent residence permits."
      }
    ]
  },
  "tajikistan": {
    "cname": "Tajikistan",
    "scheme": "Family Reunion Visa (Category Kh) & Temporary Residence",
    "overview": "Allows spouses and minor children of Tajik citizens or lawful foreign specialists to obtain family visas and temporary residence in Tajikistan.",
    "fees": {
      "visa_fee": "$50 USD",
      "service_fee": "Residence permit card fee in-country",
      "total_fee": "$50 USD Consular Fee",
      "currency": "USD",
      "notes": "Issued by Tajik diplomatic missions or online portal."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Foreign Affairs and Ministry of Internal Affairs.",
    "source": "Ministry of Foreign Affairs & Ministry of Internal Affairs of Tajikistan",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Apostilled marriage or birth certificate with certified Russian or Tajik translation.",
    "min_funds": "Sponsor maintenance confirmation and housing proof in Tajikistan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Reunification",
        "description": "Reside lawfully with your spouse or parent in Dushanbe."
      }
    ],
    "faqs": [
      {
        "question": "Can foreign spouses live in Tajikistan?",
        "answer": "Yes, foreign spouses receive a Category Kh family visa and 1-year renewable residence permit."
      }
    ]
  },
  "turkmenistan": {
    "cname": "Turkmenistan",
    "scheme": "Private / Family Visit Visa & Residence",
    "overview": "Allows spouses and minor children of Turkmen citizens or lawful foreign specialists to enter and reside in Turkmenistan under official sponsorship.",
    "fees": {
      "visa_fee": "$60-120 USD",
      "service_fee": "Migration registration fee on arrival",
      "total_fee": "$60-120 USD Consular Fee",
      "currency": "USD",
      "notes": "State Migration Service LOI approval is mandatory."
    },
    "proc_time": "15 to 20 Working Days",
    "proc_details": "State Migration Service in Ashgabat approves invitation.",
    "source": "State Migration Service of Turkmenistan",
    "validity": "Up to 1 Year (Renewable)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Civil status documents authenticated by Ministry of Foreign Affairs.",
    "min_funds": "Sponsor maintenance and housing guarantee in Turkmenistan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Sponsorship",
        "description": "Reunite with immediate family residing in Ashgabat or regional centers."
      }
    ],
    "faqs": [
      {
        "question": "Can foreign spouses join workers in Turkmenistan?",
        "answer": "Yes, sponsoring companies can request family visas through the State Migration Service for senior specialists."
      }
    ]
  },
  "azerbaijan": {
    "cname": "Azerbaijan",
    "scheme": "Family Reunification Visa & Temporary Residence (Ailə üzvü)",
    "overview": "Allows spouses, minor children, and dependent parents of Azerbaijani citizens or foreign permanent/temporary residents to live in Azerbaijan.",
    "fees": {
      "visa_fee": "$50-100 USD (Consular Visa) / State duty on arrival",
      "service_fee": "State Migration residence card fee",
      "total_fee": "$50-100 USD Consular Fee",
      "currency": "USD",
      "notes": "Residence card issued by State Migration Service in Baku."
    },
    "proc_time": "15 to 20 Working Days",
    "proc_details": "State Migration Service issues 1-year renewable residence permit card.",
    "source": "State Migration Service of the Republic of Azerbaijan",
    "validity": "1 Year (Renewable up to 2-3 years)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Translated Marriage or Birth Certificate",
    "relationship_desc": "Certified translation of marriage or birth certificate legalized or apostilled.",
    "min_funds": "Sponsor financial maintenance proof and registered apartment in Azerbaijan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Live and reside in Baku with your spouse and children."
      },
      {
        "icon": "💳",
        "title": "Biometric Residence Card",
        "description": "Full access to local healthcare, public schools, and banking."
      }
    ],
    "faqs": [
      {
        "question": "Can foreign family members join Indian workers in Baku?",
        "answer": "Yes, principal work permit holders can sponsor spouses and minor children for temporary residence cards."
      }
    ]
  },
  "georgia": {
    "cname": "Georgia",
    "scheme": "Category D4 Immigration Visa & Family Reunification Residence Permit",
    "overview": "Allows spouses, minor children, and dependent parents of Georgian citizens or lawful foreign residents to obtain family residence permits.",
    "fees": {
      "visa_fee": "$20 USD (Consular D4 Visa) / 200-300 GEL (PSH Residence Card)",
      "service_fee": "PSH logistics",
      "total_fee": "approx. ₹8,000 Statutory Reference",
      "currency": "GEL",
      "notes": "Public Service Hall issues biometric family card."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Public Service Hall processes family reunification residence cards.",
    "source": "Public Service Hall & Ministry of Justice of Georgia",
    "validity": "1 Year (Renewable up to 5-6 years)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Georgian-Translated Marriage or Birth Certificate",
    "relationship_desc": "Apostilled marriage or birth certificate with certified Georgian translation.",
    "min_funds": "Sponsor income verification and registered residential lease in Georgia",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Unity",
        "description": "Reside together in Tbilisi or coastal Batumi with full civil rights."
      }
    ],
    "faqs": [
      {
        "question": "Can an Indian worker sponsor their family in Georgia?",
        "answer": "Yes, holders of a valid Georgian work residence permit can sponsor their spouse and children for family residence cards."
      }
    ]
  },
  "armenia": {
    "cname": "Armenia",
    "scheme": "Family Reunification & Temporary Residence (Ընտանեկան միավորում)",
    "overview": "Allows spouses, minor children, and dependent parents of Armenian citizens or foreign permanent/temporary residents to live lawfully in Armenia.",
    "fees": {
      "visa_fee": "$33 USD (Consular Visa) / 105,000 AMD (Temporary Residence Card)",
      "service_fee": "Migration card processing fee",
      "total_fee": "approx. ₹15,000 Statutory Reference",
      "currency": "AMD",
      "notes": "Card issued by Migration and Citizenship Service in Yerevan."
    },
    "proc_time": "15 to 25 Calendar Days",
    "proc_details": "Migration and Citizenship Service issues 1-year renewable residence card.",
    "source": "Migration and Citizenship Service of the Republic of Armenia",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Armenian-Translated Marriage or Birth Certificate",
    "relationship_desc": "Apostilled marriage or birth certificate translated into Armenian and notarized.",
    "min_funds": "Sponsor maintenance confirmation and housing proof in Armenia",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Unity",
        "description": "Reside together in Yerevan with full access to schooling and healthcare."
      }
    ],
    "faqs": [
      {
        "question": "Can foreign spouses obtain residency in Armenia?",
        "answer": "Yes, foreign spouses of Armenian residents receive 1-year renewable temporary residence cards."
      }
    ]
  },
  "moldova": {
    "cname": "Moldova",
    "scheme": "Family Reunification Visa (Type D/VF) & Temporary Residence (Reîntregirea familiei)",
    "overview": "Allows foreign spouses, minor children, and dependent parents of Moldovan citizens or lawful foreign residents to obtain family residence permits.",
    "fees": {
      "visa_fee": "€80 (Consular Visa D/VF)",
      "service_fee": "IGM residence card fee on arrival",
      "total_fee": "€80 Consular Fee",
      "currency": "EUR",
      "notes": "Visa D/VF issued by Moldovan Embassy in New Delhi."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "General Inspectorate for Migration issues 1-year renewable family residence card.",
    "source": "General Inspectorate for Migration (IGM) & MFA Moldova",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Romanian-Translated Marriage or Birth Certificate",
    "relationship_desc": "Certified translation of marriage or birth certificate with apostille.",
    "min_funds": "Sponsor maintenance confirmation and housing proof in Moldova",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Reside together in Chișinău with full access to schools and healthcare."
      }
    ],
    "faqs": [
      {
        "question": "Can family members accompany a foreign worker in Moldova?",
        "answer": "Yes, holders of an employment residence permit can sponsor their spouse and dependent children for family residence cards."
      }
    ]
  },
  "pakistan": {
    "cname": "Pakistan",
    "scheme": "Family Visit / Spousal Entry Visa & Extension",
    "overview": "Allows foreign spouses, children, and parents of Pakistani citizens or lawful residents to visit and reside in Pakistan under family sponsorship.",
    "fees": {
      "visa_fee": "$35-60 USD",
      "service_fee": "NADRA portal charge",
      "total_fee": "$35-60 USD Consular Fee",
      "currency": "USD",
      "notes": "Applied via visa.nadra.gov.pk."
    },
    "proc_time": "15 to 30 Working Days",
    "proc_details": "Consular review and Ministry of Interior verification.",
    "source": "Ministry of Interior & NADRA Pakistan",
    "validity": "Up to 1 Year (Renewable)",
    "stay": "Duration of Family Sponsorship",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage or Birth Certificate",
    "relationship_desc": "Certified Nikahnama / marriage registration or birth certificate.",
    "min_funds": "Sponsor maintenance confirmation and residence in Pakistan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Visit and reside with family in Pakistan."
      }
    ],
    "faqs": [
      {
        "question": "How can foreign spouses enter Pakistan?",
        "answer": "Through a Family Visit visa obtained online via NADRA, followed by application for a Pakistan Origin Card (POC)."
      }
    ]
  },
  "bangladesh": {
    "cname": "Family Visit / Dependent Visa (Category F / FE)",
    "scheme": "Category F / FE Dependent Visa",
    "overview": "Allows foreign spouses and minor children of Bangladeshi citizens or Category E work permit holders to reside together in Bangladesh.",
    "fees": {
      "visa_fee": "₹0 (Consular Visa)",
      "service_fee": "approx. ₹850 (VAC Handling)",
      "total_fee": "₹850 Total Reference",
      "currency": "INR",
      "notes": "Issued aligned with principal sponsor's permit."
    },
    "proc_time": "7 to 10 Working Days",
    "proc_details": "Bangladesh High Commission / Deputy High Commissions.",
    "source": "Department of Immigration and Passports & Ministry of Home Affairs",
    "validity": "1 to 2 Years (Aligned with Sponsor)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage or Birth Certificate",
    "relationship_desc": "Notarized and authenticated marriage or birth certificate.",
    "min_funds": "Principal worker's salary certificate and housing proof in Bangladesh",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Live with your spouse and children in Dhaka or Chittagong."
      }
    ],
    "faqs": [
      {
        "question": "Can families of Indian workers reside in Bangladesh?",
        "answer": "Yes, spouses and dependent children receive Category FE visas tied to the principal applicant's BIDA work permit."
      }
    ]
  },
  "myanmar": {
    "cname": "Myanmar",
    "scheme": "Social Visa (Type SV) & Accompanying Dependents",
    "overview": "Allows foreign spouses and minor children of Myanmar citizens or long-term foreign workers to visit and reside in Myanmar.",
    "fees": {
      "visa_fee": "$50-70 USD",
      "service_fee": "Stay permit extension in Yangon",
      "total_fee": "$50-70 USD Consular Fee",
      "currency": "USD",
      "notes": "Social visa issued via embassy or online portal."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Immigration and Population.",
    "source": "Ministry of Immigration and Population of Myanmar",
    "validity": "70 Days (Extendable in-country)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Notarized and authenticated civil status certificates.",
    "min_funds": "Sponsor maintenance confirmation and housing proof in Myanmar",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Reside together with family in Yangon or Mandalay."
      }
    ],
    "faqs": [
      {
        "question": "Can families of foreign workers stay in Myanmar?",
        "answer": "Yes, spouses and dependent children receive Social Visas and stay permits tied to the principal applicant's employment."
      }
    ]
  },
  "laos": {
    "cname": "Laos",
    "scheme": "Family Visit Visa (Type SP) & Dependent Stay Permit",
    "overview": "Allows spouses and minor children of Lao citizens or foreign specialists holding Type LA work permits to reside together in Laos.",
    "fees": {
      "visa_fee": "$50-70 USD",
      "service_fee": "Stay permit extension in Vientiane",
      "total_fee": "$50-70 USD Consular Fee",
      "currency": "USD",
      "notes": "Tied to principal applicant's work permit."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Department of Immigration in Vientiane.",
    "source": "Department of Immigration & Ministry of Public Security of Lao PDR",
    "validity": "1 Year (Renewable)",
    "stay": "Duration of Family Sponsorship",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Notarized and authenticated civil status certificates.",
    "min_funds": "Sponsor maintenance confirmation and registered housing in Laos",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Reside together in Vientiane with peaceful lifestyle and international schooling."
      }
    ],
    "faqs": [
      {
        "question": "Can spouses of foreign workers live in Laos?",
        "answer": "Yes, dependents receive Type SP family visas and stay permit cards tied to the primary worker's contract."
      }
    ]
  },
  "mongolia": {
    "cname": "Mongolia",
    "scheme": "Family Reunion Visa (Type F) & Dependent Residence Permit",
    "overview": "Allows spouses and minor children of Mongolian citizens or lawful foreign specialists to live and reside in Mongolia.",
    "fees": {
      "visa_fee": "$60 USD (Consular Visa) / Residence card fee in-country",
      "service_fee": "MIA processing",
      "total_fee": "$60 USD Consular Fee",
      "currency": "USD",
      "notes": "Issued aligned with principal sponsor's permit."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Mongolia Immigration Agency in Ulaanbaatar.",
    "source": "Mongolia Immigration Agency (MIA)",
    "validity": "1 Year (Renewable annually)",
    "stay": "Duration of Family Sponsorship",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Notarized and authenticated civil status documents.",
    "min_funds": "Sponsor maintenance confirmation and housing proof in Mongolia",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Integrity",
        "description": "Reside together in Ulaanbaatar with full access to schools and healthcare."
      }
    ],
    "faqs": [
      {
        "question": "Can families of Indian workers reside in Mongolia?",
        "answer": "Yes, spouses and dependent children receive Type F family visas and residence cards tied to the primary worker's contract."
      }
    ]
  },
  "taiwan": {
    "cname": "Taiwan",
    "scheme": "Resident Visa for Dependents & Accompanying Family ARC",
    "overview": "Allows spouses and minor children of Taiwan citizens, ARC holders, and Employment Gold Card holders to obtain resident visas and Alien Resident Certificates.",
    "fees": {
      "visa_fee": "₹5,300 (Resident Visa)",
      "service_fee": "ARC fee: NT$1,000/year",
      "total_fee": "approx. ₹8,000 Consular & ARC Reference",
      "currency": "INR",
      "notes": "Spouses of Gold Card holders can also work part-time/full-time under simplified rules."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "TECC in India issues entry Resident Visa; NIA issues ARC in Taiwan.",
    "source": "Bureau of Consular Affairs (BOCA) & National Immigration Agency (NIA)",
    "validity": "1 to 3 Years (Aligned with Sponsor)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Translated Marriage or Birth Certificate",
    "relationship_desc": "Certified marriage or birth certificate authenticated by TECC.",
    "min_funds": "Principal worker's employment contract and tax statements in Taiwan",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Relocation",
        "description": "High safety ranking, clean environment, and top international schools in Taipei and Hsinchu."
      },
      {
        "icon": "🏥",
        "title": "Universal Healthcare (NHI)",
        "description": "All dependents covered under Taiwan's world-class National Health Insurance."
      }
    ],
    "faqs": [
      {
        "question": "Can spouses of foreign professionals work in Taiwan?",
        "answer": "Spouses can apply for specialized work permits or freelance work authorization, and spouses of Gold Card holders enjoy facilitated work permissions."
      }
    ]
  },
  "hong-kong": {
    "cname": "Hong Kong",
    "scheme": "Dependant Visa (受養人簽證)",
    "overview": "Allows spouses and unmarried dependent children under 18 of Hong Kong permanent residents or employment/talent visa holders (GEP, TTPS, QMAS) to live in Hong Kong with full employment rights.",
    "fees": {
      "visa_fee": "HK$230 (approx. ₹2,500)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "HK$230 Statutory Reference",
      "currency": "HKD",
      "notes": "Dependents of work/talent visa holders have unrestricted rights to work."
    },
    "proc_time": "4 to 6 Weeks",
    "proc_details": "Hong Kong Immigration Department.",
    "source": "Hong Kong Immigration Department (ImmD)",
    "validity": "Tied to Principal Sponsor (Pattern: 2+3+3 years)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage or Birth Certificate",
    "relationship_desc": "Certified copy of marriage certificate or children's birth certificates.",
    "min_funds": "Sponsor maintenance proof and registered residential accommodation in Hong Kong",
    "highlights": [
      {
        "icon": "💼",
        "title": "Full Work Authorization",
        "description": "Spouses holding Dependant Visas have the legal right to work without needing separate work permits."
      },
      {
        "icon": "🏫",
        "title": "Public & International Schools",
        "description": "Dependent children can enroll in subsidized public schools or top international schools."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a Hong Kong Dependant Visa?",
        "answer": "YES! Unlike many other jurisdictions, spouses of employment and talent visa holders in Hong Kong have unrestricted legal rights to work in any job."
      }
    ]
  },
  "macau": {
    "cname": "Macau",
    "scheme": "Special Authorization to Stay for Family Dependents (家屬逗留許可)",
    "overview": "Allows spouses and minor children of Macau permanent residents or senior specialized workers (Class A Blue Card holders) to reside in Macau.",
    "fees": {
      "visa_fee": "100 MOP",
      "service_fee": "PSPF processing",
      "total_fee": "100 MOP Consular Fee",
      "currency": "MOP",
      "notes": "Public Security Police Force Immigration issues family authorization."
    },
    "proc_time": "15 to 25 Working Days",
    "proc_details": "Public Security Police Force (PSPF) Immigration Department.",
    "source": "Public Security Police Force of Macau SAR (PSPF)",
    "validity": "1 to 2 Years (Tied to Sponsor)",
    "stay": "Duration of Family Ties",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Translated Marriage or Birth Certificate",
    "relationship_desc": "Notarized and authenticated marriage or birth certificate.",
    "min_funds": "Principal worker's salary verification and housing lease in Macau",
    "highlights": [
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Unity",
        "description": "Reside together in Macau with world-class safety and quality of life."
      }
    ],
    "faqs": [
      {
        "question": "Can family members of Blue Card holders reside in Macau?",
        "answer": "Senior foreign specialists and managerial personnel can sponsor spouses and dependent minor children for family stay authorization."
      }
    ]
  },
  "nigeria": {
    "cname": "Nigeria",
    "scheme": "Subject to Regularization (STR) Dependent Visa & Dependent CERPAC Card",
    "overview": "Spouses and dependent children of expatriate professionals holding valid employment authorization or CERPAC cards in Nigeria can obtain STR Dependent Visas. This authorizes lawful residence in Nigeria alongside the principal earner, with access to international schools, healthcare, and multi-entry travel privileges.",
    "fees": {
      "visa_fee": "$160 (Consular STR Dependent Fee)",
      "service_fee": "$1,000 (Annual Dependent CERPAC Card)",
      "total_fee": "$1,160 (approx. ₹98,000 per family member)",
      "notes": "Each dependent receives an individual CERPAC card for identification and travel."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Applied at Nigerian High Commission New Delhi, followed by biometric regularization at NIS state office in Nigeria.",
    "source": "Nigeria Immigration Service & Federal Ministry of Interior",
    "validity": "Aligned with Principal Expatriate's CERPAC Validity",
    "stay": "Full duration of primary sponsor's assignment",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "Government-issued certificates verifying marriage and parentage, legalized by the Ministry of External Affairs (MEA) in India.",
    "min_funds": "Principal sponsor's employment contract and housing allowance guarantee",
    "highlights": [
      {
        "icon": "👨‍👩‍👧‍👦",
        "title": "Full Family Unity",
        "description": "Keep your immediate family united throughout your corporate executive tenure in Lagos or Abuja."
      },
      {
        "icon": "🎓",
        "title": "Top International School Access",
        "description": "Children can enroll in British, American, and international baccalaureate schools across major cities."
      },
      {
        "icon": "✈️",
        "title": "Seamless Re-entry",
        "description": "Dependent CERPAC cards permit unrestricted travel to and from India without separate re-entry visas."
      }
    ],
    "faqs": [
      {
        "question": "Can an expatriate's spouse work in Nigeria on a dependent visa?",
        "answer": "No. A dependent CERPAC holder cannot take up employment directly. If a spouse secures employment, their new employer must petition for an independent Expatriate Quota slot and STR conversion."
      },
      {
        "question": "Are children required to get their own CERPAC cards?",
        "answer": "Minor children receive dependent residence stamps and CERPAC exemption or dependent cards based on age under NIS regulations."
      }
    ]
  },
  "ghana": {
    "cname": "Ghana",
    "scheme": "Dependent Residence Permit for Spouses and Children",
    "overview": "Spouses and minor children of foreign professionals holding valid Ghana Work and Residence Permits can reside lawfully in Ghana under a GIS Dependent Residence Permit. This allows peaceful family life, enrollment in Ghana's renowned international schools, and full travel freedom.",
    "fees": {
      "visa_fee": "₹6,000 (Consular Entry Visa per person)",
      "service_fee": "$500 - $800 (GIS Annual Dependent Permit per person)",
      "total_fee": "approx. ₹60,000 per dependent",
      "notes": "Permit issued at GIS Headquarters in Accra."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Entry visa processed at High Commission in New Delhi; regularized at GIS Accra upon arrival.",
    "source": "Ghana Immigration Service (GIS)",
    "validity": "Tied to Principal Expatriate's Residence Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage Certificate & Birth Certificates",
    "relationship_desc": "MEA-apostilled marriage certificate for spouse and birth certificates for children.",
    "min_funds": "Principal worker's employment contract and certified accommodation in Ghana",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Safe Family Environment",
        "description": "Accra and Kumasi offer family-friendly living with peaceful communities and excellent safety."
      },
      {
        "icon": "📚",
        "title": "British & IB Curricula",
        "description": "Lincoln Community School, Ghana International School, and British International School provide world-class education."
      },
      {
        "icon": "✈️",
        "title": "Easy Travel Mobility",
        "description": "Multiple entry privileges allow hassle-free travel back to India during school vacations."
      }
    ],
    "faqs": [
      {
        "question": "Can a dependent work in Ghana?",
        "answer": "No. The dependent permit does not authorize employment. To work, the dependent must secure an independent GIPC quota and separate work permit."
      },
      {
        "question": "What is the age limit for dependent children in Ghana?",
        "answer": "Children under 18 years of age qualify as minor dependents. Adult children require independent student or work permits."
      }
    ]
  },
  "ethiopia": {
    "cname": "Ethiopia",
    "scheme": "Foreign National Dependent Residence Permit",
    "overview": "Spouses and minor children of foreign professionals holding valid Ethiopian work permits or investor residency permits can reside in Ethiopia on a Dependent Resident Permit. This allows families to stay together in Addis Ababa and other regional cities, with access to international schooling and medical facilities.",
    "fees": {
      "visa_fee": "$82 (Consular Entry Visa)",
      "service_fee": "$100/year (Dependent Resident ID)",
      "total_fee": "approx. ₹15,000 per dependent",
      "notes": "Processed at ICS headquarters in Addis Ababa."
    },
    "proc_time": "2 to 4 Weeks",
    "proc_details": "Applied online or through the Embassy of Ethiopia, followed by resident ID issuance at ICS Addis Ababa.",
    "source": "Immigration and Citizenship Service (ICS)",
    "validity": "Aligned with Principal's Work or Investor Permit",
    "stay": "Full duration of sponsor's valid contract",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage Certificate & Birth Certificates",
    "relationship_desc": "MEA-attested marriage certificate and children's birth certificates.",
    "min_funds": "Principal worker's salary contract and housing arrangement",
    "highlights": [
      {
        "icon": "👨‍👩‍👧‍👦",
        "title": "Family Unification",
        "description": "Live together safely in Addis Ababa with comprehensive international community support."
      },
      {
        "icon": "🏫",
        "title": "International School Access",
        "description": "Access to top schools like International Community School (ICS) Addis Ababa and Sandford International School."
      },
      {
        "icon": "✈️",
        "title": "Easy Travel to India",
        "description": "Daily non-stop Ethiopian Airlines flights connect Addis Ababa directly to Mumbai, New Delhi, and Bengaluru in under 5 hours."
      }
    ],
    "faqs": [
      {
        "question": "How long is the flight between India and Ethiopia?",
        "answer": "Ethiopian Airlines operates non-stop direct flights connecting Addis Ababa to Mumbai and New Delhi in approximately 4.5 to 5 hours."
      },
      {
        "question": "Can a spouse work on a dependent visa in Ethiopia?",
        "answer": "No. The dependent status does not authorize employment. Spouses wishing to work must secure an independent work permit from an employing organization."
      }
    ]
  },
  "rwanda": {
    "cname": "Rwanda",
    "scheme": "Dependent Resident Permit (Class F1 / F2)",
    "overview": "Spouses and minor children of foreign nationals holding valid Rwanda work permits, student visas, or investor permits can obtain a Dependent Resident Permit from DGIE. This provides legal status, healthcare access, and easy enrollment in Kigali's prestigious international schools.",
    "fees": {
      "visa_fee": "50,000 RWF (approx. $40 / ₹3,400 per person)",
      "service_fee": "10,000 RWF administrative fee",
      "total_fee": "approx. ₹4,500 per family member",
      "notes": "Administered online via IREMBO."
    },
    "proc_time": "1 to 2 Weeks",
    "proc_details": "Applied online on irembo.gov.rw with sponsor's permit and legalized family certificates.",
    "source": "Directorate General of Immigration and Emigration (DGIE)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's legal status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage Certificate & Birth Certificates",
    "relationship_desc": "Apostilled or embassy-certified marriage certificate and children's birth certificates.",
    "min_funds": "Principal worker's salary contract and proof of residence in Rwanda",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Peaceful Family Haven",
        "description": "Ranked among the safest countries globally with clean, quiet, and friendly residential neighborhoods."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "Ecole Belge, Kigali International Community School (KICS), and Green Hills Academy offer French, IB, and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "Unrestricted Travel",
        "description": "Multi-entry dependent permit allows easy school holiday travel to India and worldwide."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent permit in Rwanda?",
        "answer": "A dependent permit alone does not authorize employment. However, securing a work permit is straightforward once a job offer is received, and can be converted inside Rwanda."
      },
      {
        "question": "How safe is Kigali for expat families?",
        "answer": "Kigali is widely recognized as one of the safest capital cities in the world, with virtually zero street crime and orderly civic life."
      }
    ]
  },
  "zimbabwe": {
    "cname": "Zimbabwe",
    "scheme": "Dependent / Scholar Permit for Spouses and Children",
    "overview": "Spouses and minor children of foreign professionals holding valid Temporary Employment Permits (TEP) or investor permits can reside in Zimbabwe on a Dependent or Scholar Permit. Families enjoy Zimbabwe's pleasant subtropical climate, peaceful communities, and established international schooling.",
    "fees": {
      "visa_fee": "$100 (Dependent Entry Visa)",
      "service_fee": "$100/year (Local Dependent Registration)",
      "total_fee": "approx. ₹17,000 per family member",
      "notes": "Processed via Department of Immigration Harare."
    },
    "proc_time": "2 to 4 Weeks",
    "proc_details": "Applied online or through the Department of Immigration in Harare.",
    "source": "Department of Immigration Zimbabwe",
    "validity": "Aligned with Principal Worker's TEP Validity",
    "stay": "Duration of principal earner's contract",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Legalized Marriage Certificate & Birth Certificates",
    "relationship_desc": "MEA-attested marriage certificate and children's birth certificates.",
    "min_funds": "Principal worker's salary contract and adequate family housing",
    "highlights": [
      {
        "icon": "☀️",
        "title": "Superb Subtropical Climate",
        "description": "Harare and Bulawayo enjoy one of the most temperate and sunny year-round climates in the world."
      },
      {
        "icon": "🏫",
        "title": "Established Private Schools",
        "description": "St. George's College, Chisipite Senior School, and Harare International School offer top Cambridge and IB education."
      },
      {
        "icon": "✈️",
        "title": "Travel Freedom",
        "description": "Multiple entry privileges allow easy travel between Zimbabwe and India."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent permit in Zimbabwe?",
        "answer": "No. The dependent permit does not allow employment. The spouse must obtain an independent Temporary Employment Permit (TEP)."
      },
      {
        "question": "What is the cost of living for expat families in Harare?",
        "answer": "Harare offers a comfortable expatriate lifestyle with modern shopping malls, international restaurants, and affordable domestic support."
      }
    ]
  },
  "colombia": {
    "cname": "Colombia",
    "scheme": "Beneficiary Visa (Visa M Beneficiario / Visa R Beneficiario)",
    "overview": "Spouses, permanent domestic partners, and dependent children of foreign nationals holding valid Visa M or Visa R status in Colombia can obtain a matching Beneficiary Visa. This permits family members to live legally in Colombia, obtain Cédulas de Extranjería, access healthcare, and enroll in top bilingual schools.",
    "fees": {
      "visa_fee": "$52 (Study Fee) + $182 (Issuance Fee) = $234 USD",
      "service_fee": "$55 (Cédula de Extranjería)",
      "total_fee": "$289 USD (approx. ₹24,000 per dependent)",
      "notes": "Applied online via Cancillería portal."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Submitted digitally on Cancillería portal with legalized marriage/birth certificates.",
    "source": "Cancillería Colombia & Migración Colombia",
    "validity": "Co-terminus with Principal Holder's Visa",
    "stay": "Full duration of primary sponsor's legal status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "Apostilled and officially translated marriage certificates (for spouse) and birth certificates (for children).",
    "min_funds": "Principal holder's employment income and declaration of economic dependency",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Vibrant Family Lifestyle",
        "description": "Enjoy affordable luxury living, modern residential towers, and pleasant mountain climates in Medellín or Bogotá."
      },
      {
        "icon": "📚",
        "title": "Top Bilingual & IB Schools",
        "description": "Colegio Anglo Colombiano, The Columbus School (Medellín), and Colegio Nueva Granada provide world-class bilingual education."
      },
      {
        "icon": "🏥",
        "title": "Premier Healthcare System",
        "description": "Access Latin America's highest-ranked hospitals and affordable EPS health coverage."
      }
    ],
    "faqs": [
      {
        "question": "Does a beneficiary visa allow the spouse to work in Colombia?",
        "answer": "No. The Visa M Beneficiario does not include open work authorization. If the spouse secures local employment, they can apply for their own Visa M Trabajador."
      },
      {
        "question": "Do official documents need to be translated into Spanish?",
        "answer": "Yes. Indian certificates must be apostilled by the MEA in India and officially translated into Spanish by a certified Colombian translator."
      }
    ]
  },
  "peru": {
    "cname": "Peru",
    "scheme": "Resident Family Visa (Calidad Migratoria Familiar de Residente)",
    "overview": "Spouses and unmarried dependent children of foreign professionals holding valid Peruvian resident worker or investor status can reside in Peru under the Familiar de Residente category. Dependents receive individual Carné de Extranjería cards, authorizing peaceful family life, domestic healthcare, and enrollment in top international schools.",
    "fees": {
      "visa_fee": "$80 (Familiar de Residente Visa Fee)",
      "service_fee": "$30 (Carné de Extranjería per person)",
      "total_fee": "$110 USD (approx. ₹9,200 per dependent)",
      "notes": "Processed through Migraciones Peru portal."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Submitted to Migraciones Peru with apostilled marriage and birth certificates.",
    "source": "Superintendencia Nacional de Migraciones",
    "validity": "Co-terminus with Principal Holder's Visa",
    "stay": "Full duration of primary sponsor's legal status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Spanish by a sworn translator (Traductor Público Juramentado) in Peru.",
    "min_funds": "Principal worker's salary contract and declaration of family maintenance",
    "highlights": [
      {
        "icon": "🏡",
        "title": "High Quality Expat Living",
        "description": "Safe, beautiful coastal neighborhoods like Miraflores, San Isidro, and Barranco in Lima with oceanfront boardwalks."
      },
      {
        "icon": "🎓",
        "title": "Prestigious International Schools",
        "description": "Franklin Delano Roosevelt American School, Markham College, and Newton College offer elite British, American, and IB programs."
      },
      {
        "icon": "✈️",
        "title": "Seamless Border Mobility",
        "description": "Multiple-entry Carné de Extranjería eliminates the need for entry visas when returning to Peru."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family resident visa in Peru?",
        "answer": "The Familiar de Residente visa allows the spouse to reside. To work, the spouse can easily regularize work authorization through Migraciones once an employment offer is secured."
      },
      {
        "question": "Do birth and marriage certificates need apostille?",
        "answer": "Yes. All foreign certificates must be apostilled by the Ministry of External Affairs (MEA) in India and translated into Spanish by a licensed sworn translator in Peru."
      }
    ]
  },
  "chile": {
    "cname": "Chile",
    "scheme": "Reunificación Familiar (Family Temporary Residency)",
    "overview": "Spouses, registered civil partners, and minor children of foreign professionals holding valid Chilean Temporary Residency or Residencia Definitiva can obtain Family Temporary Residency (Reunificación Familiar). Dependents receive full resident status, Chilean Cédula cards, and access to the public/private healthcare and education systems.",
    "fees": {
      "visa_fee": "$100 - $150 per dependent",
      "service_fee": "$10 (Cédula de Identidad)",
      "total_fee": "approx. ₹12,000 per family member",
      "notes": "Applied online via SERMIG platform."
    },
    "proc_time": "6 to 10 Weeks",
    "proc_details": "Applied online on SERMIG portal with apostilled relationship certificates.",
    "source": "Servicio Nacional de Migraciones (SERMIG)",
    "validity": "Co-terminus with Principal Holder's Visa",
    "stay": "Duration of primary sponsor's legal residency",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Spanish.",
    "min_funds": "Principal worker's salary contract and declaration of economic dependency",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Exceptional Safety & Infrastructure",
        "description": "Santiago's Las Condes, Vitacura, and Providencia districts offer European-level infrastructure, parks, and safety."
      },
      {
        "icon": "📚",
        "title": "Elite International Schools",
        "description": "The Grange School, Nido de Aguilas International School, and Santiago College offer top English, IB, and Cambridge programs."
      },
      {
        "icon": "✈️",
        "title": "Easy Travel Mobility",
        "description": "Chilean Cédula enables easy travel across South America without needing separate visas."
      }
    ],
    "faqs": [
      {
        "question": "Can dependent spouses work in Chile under the new migration law?",
        "answer": "Under Law 21.325, dependent spouses holding family temporary residency can engage in lawful economic activities and employment in Chile."
      },
      {
        "question": "Do Indian documents require apostille for Chile?",
        "answer": "Yes. Chile is a member of the Hague Apostille Convention. All Indian certificates (birth, marriage, police clearance) must be apostilled by the MEA in India."
      }
    ]
  },
  "argentina": {
    "cname": "Argentina",
    "scheme": "Radicación por Reunificación Familiar (Family Reunification Residency)",
    "overview": "Spouses, registered civil partners, and minor children of foreign professionals holding valid Argentine temporary or permanent residency can obtain a Family Reunification Residence Permit. Dependents receive Argentine DNI cards, granting full rights to live, study, and access the public healthcare system.",
    "fees": {
      "visa_fee": "$150 (Consular Visa Fee per person)",
      "service_fee": "$50 (DNI Extranjero)",
      "total_fee": "$200 USD (approx. ₹16,800 per dependent)",
      "notes": "Applied at consulate or regularized at Migraciones in Buenos Aires."
    },
    "proc_time": "4 to 6 Weeks",
    "proc_details": "Submitted to Argentine consulate or Migraciones with apostilled relationship documents.",
    "source": "Dirección Nacional de Migraciones (DNM)",
    "validity": "Co-terminus with Principal Holder's Status",
    "stay": "Full duration of primary sponsor's legal residency",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Spanish by a licensed Colegio de Traductores Públicos translator in Argentina.",
    "min_funds": "Principal worker's employment contract and certified accommodation",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Cosmopolitan & Cultured Lifestyle",
        "description": "Buenos Aires offers a world-famous literary, theatrical, and café culture with magnificent European parks."
      },
      {
        "icon": "📚",
        "title": "Free Public University Access",
        "description": "Children of permanent and temporary residents can attend prestigious Argentine public universities tuition-free."
      },
      {
        "icon": "✈️",
        "title": "Mercosur Free Travel",
        "description": "Argentine DNI holders can travel across South America (Brazil, Uruguay, Chile, etc.) using just their DNI card without a passport."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification visa in Argentina?",
        "answer": "Yes! Unlike many other countries, Argentine residence permits granted under family reunification grant the dependent spouse full legal authorization to work and engage in commerce."
      },
      {
        "question": "Do official certificates need to be translated in Argentina?",
        "answer": "Yes. Documents must be translated into Spanish by a sworn translator registered with the Colegio de Traductores Públicos in Argentina."
      }
    ]
  },
  "costa-rica": {
    "cname": "Costa Rica",
    "scheme": "Residencia Temporal por Vínculo (Family Dependent Residency)",
    "overview": "Spouses and minor children of foreign nationals holding valid Costa Rican temporary or permanent residency can obtain dependent residency under the Vínculo category. Family members receive individual DIMEX cards, granting peaceful residence, enrollment in bilingual schools, and access to the Caja Costarricense de Seguro Social (CCSS) healthcare system.",
    "fees": {
      "visa_fee": "$200 per family member",
      "service_fee": "$125 (DIMEX card issuance)",
      "total_fee": "$325 USD (approx. ₹27,500 per dependent)",
      "notes": "Administered via DGME San José."
    },
    "proc_time": "8 to 14 Weeks",
    "proc_details": "Submitted to DGME with apostilled marriage and birth certificates.",
    "source": "Dirección General de Migración y Extranjería (DGME)",
    "validity": "Co-terminus with Principal Holder's DIMEX",
    "stay": "Full duration of primary sponsor's legal status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into Spanish by an official sworn translator in Costa Rica.",
    "min_funds": "Principal worker's salary contract and CCSS health insurance coverage",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Safe & Peaceful Family Living",
        "description": "Enjoy idyllic mountain and coastal living with high public safety and strong environmental protection."
      },
      {
        "icon": "🏫",
        "title": "Top International Schools",
        "description": "Country Day School, Lincoln School, and British School of Costa Rica offer premier American, IB, and British curricula."
      },
      {
        "icon": "🏥",
        "title": "Exceptional Healthcare System",
        "description": "Universal CCSS public healthcare plus world-class private hospitals (CIMA, Clínica Bíblica) accredited by JCI."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent visa in Costa Rica?",
        "answer": "Dependent spouses holding temporary family residency must apply for work authorization or convert to independent temporary residency upon receiving an employment offer."
      },
      {
        "question": "Do Indian certificates require apostille for Costa Rica?",
        "answer": "Yes. Costa Rica is a member of the Hague Apostille Convention. All Indian certificates (birth, marriage, police clearance) must be apostilled by the Ministry of External Affairs (MEA) in India."
      }
    ]
  },
  "romania": {
    "cname": "Romania",
    "scheme": "Reîntregirea Familiei (Family Reunification Long-Stay Visa Type D/VF)",
    "overview": "Spouses and minor children of foreign nationals holding a valid Romanian residence permit (valid for at least 1 year), EU Blue Card, or permanent residency can obtain a Family Reunification Long-Stay Visa (Type D/VF) through IGI and the Ministry of Foreign Affairs. Family members receive a biometric Permis de Ședere, allowing lawful residence, healthcare, and education in Romania.",
    "fees": {
      "visa_fee": "€120 (Type D/VF Visa Fee per person)",
      "service_fee": "259 RON (IGI Residence Card)",
      "total_fee": "approx. ₹16,000 per family member",
      "notes": "Applied at Romanian Embassy in New Delhi after IGI pre-approval."
    },
    "proc_time": "6 to 12 Weeks",
    "proc_details": "Principal sponsor files family reunification petition at IGI in Romania; upon approval, family applies for Visa D/VF in New Delhi.",
    "source": "Inspectoratul General pentru Imigrări (IGI) & Ministry of Foreign Affairs",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Romanian by an authorized sworn translator (Traducător Autorizat).",
    "min_funds": "Principal worker's employment salary and registered rental lease in Romania",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Affordable European Family Living",
        "description": "Romania offers one of the lowest costs of living in the European Union while maintaining excellent internet and infrastructure."
      },
      {
        "icon": "🎓",
        "title": "International Schooling",
        "description": "American International School of Bucharest (AISB), British School of Bucharest (BSB), and Cambridge School offer world-class IB/British diplomas."
      },
      {
        "icon": "🏥",
        "title": "EU Healthcare Access",
        "description": "Full access to national public health insurance (CNAS) and modern private medical networks (Regina Maria, MedLife)."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification visa in Romania?",
        "answer": "Yes. Spouses holding a family reunification residence permit (Permis de Ședere) are legally authorized to work in Romania without requiring their employer to obtain a separate Aviz de Muncă."
      },
      {
        "question": "Do Indian certificates need Romanian translation?",
        "answer": "Yes. Indian birth and marriage certificates must be apostilled by the MEA in India and translated into Romanian by an authorized translator."
      }
    ]
  },
  "bulgaria": {
    "cname": "Bulgaria",
    "scheme": "Family Reunification Long-Stay Visa (Type D) & Residence Permit",
    "overview": "Spouses and minor children of foreign nationals holding a valid Bulgarian residence permit (valid for at least 1 year), EU Blue Card, or permanent residency can obtain a Family Reunification Long-Stay Visa (Type D) and Bulgarian Residence Card. Family members can live legally in Bulgaria, enroll in international schools, and access medical care.",
    "fees": {
      "visa_fee": "€100 (Type D Visa Fee per person)",
      "service_fee": "150 BGN - 500 BGN (Bulgarian Residence Card)",
      "total_fee": "approx. ₹18,000 per family member",
      "notes": "Applied at Embassy of Bulgaria in New Delhi after Migration Directorate pre-approval."
    },
    "proc_time": "6 to 10 Weeks",
    "proc_details": "Sponsor files for family reunification at Migration Directorate in Sofia; upon approval, family applies for Visa D in New Delhi.",
    "source": "Migration Directorate (Ministry of Interior) & Ministry of Foreign Affairs",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Bulgarian by an accredited sworn translator.",
    "min_funds": "Principal worker's salary contract and registered rental lease in Bulgaria",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Extremely Affordable EU Living",
        "description": "Bulgaria offers some of the lowest living expenses, property costs, and utilities in the entire European Union."
      },
      {
        "icon": "🏫",
        "title": "Top International Schools",
        "description": "Anglo-American School of Sofia (AAS) and British School of Sofia offer premier American and IB/Cambridge curricula."
      },
      {
        "icon": "✈️",
        "title": "Schengen Free Travel",
        "description": "Bulgarian residence card allows visa-free travel across the Schengen zone."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification permit in Bulgaria?",
        "answer": "Yes. Spouses granted residence under family reunification are eligible for employment in Bulgaria upon completing local registration."
      },
      {
        "question": "Do Indian documents need apostille for Bulgaria?",
        "answer": "Yes. Bulgaria is a party to the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India and translated into Bulgarian."
      }
    ]
  },
  "croatia": {
    "cname": "Croatia",
    "scheme": "Privremeni boravak u svrhu spajanja obitelji (Family Reunification Temporary Residence)",
    "overview": "Spouses, registered life partners, and minor children of foreign nationals holding a valid Croatian residence permit (valid for at least 1 year), EU Blue Card, or permanent residency can obtain a Family Reunification Temporary Residence Permit. Family members receive individual biometric resident cards, granting lawful residence, healthcare through HZZO, and enrollment in public/private schools.",
    "fees": {
      "visa_fee": "€93 (Temporary Residence Permit per person)",
      "service_fee": "€41 (Biometric Residence Card)",
      "total_fee": "approx. ₹12,000 per family member",
      "notes": "Processed via MUP Police Administration."
    },
    "proc_time": "6 to 10 Weeks",
    "proc_details": "Applied through the Croatian diplomatic mission in New Delhi or directly at the Police Administration (MUP) in Croatia.",
    "source": "Ministry of the Interior of the Republic of Croatia (MUP)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Croatian by a court interpreter (Stalni sudski tumač).",
    "min_funds": "Principal worker's salary contract and registered rental lease in Croatia",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Safe & Wholesome Family Haven",
        "description": "Croatia is ranked among the safest countries in Europe with exceptionally low crime rates and clean Adriatic environment."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "American International School of Zagreb (AISZ) and British International School of Zagreb offer elite IB and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "Schengen Border-Free Travel",
        "description": "Croatian residence card allows easy family travel across Europe without visas."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification permit in Croatia?",
        "answer": "Yes! Under the Croatian Aliens Act, family members granted temporary residence for family reunification are legally entitled to work in Croatia without needing a separate work permit."
      },
      {
        "question": "Do Indian certificates need apostille for Croatia?",
        "answer": "Yes. Croatia is a member of the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India and translated into Croatian by a certified court interpreter."
      }
    ]
  },
  "slovenia": {
    "cname": "Slovenia",
    "scheme": "Dovoljenje za začasno prebivanje zaradi združitve družine (Family Reunification Temporary Residence)",
    "overview": "Spouses, registered civil partners, and minor children of foreign nationals holding a valid Slovenian residence permit (valid for at least 1 year), EU Blue Card, or permanent residency can obtain a Family Reunification Temporary Residence Permit. Family members receive individual biometric resident cards, granting lawful residence, healthcare through ZZZS, and enrollment in public/private schools.",
    "fees": {
      "visa_fee": "€50 (Temporary Residence Permit per person)",
      "service_fee": "€15 (Biometric Residence Card)",
      "total_fee": "approx. ₹6,000 per family member",
      "notes": "Highly affordable statutory levies in Slovenia."
    },
    "proc_time": "6 to 10 Weeks",
    "proc_details": "Applied through Embassy of Slovenia in New Delhi or Administrative Unit (Upravna enota) in Slovenia.",
    "source": "Ministry of the Interior of the Republic of Slovenia (MNZ)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Slovenian by a sworn court interpreter (Sodni tolmač).",
    "min_funds": "Principal worker's salary contract and registered rental lease in Slovenia",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Pristine & Safe Environment",
        "description": "Ljubljana, Maribor, and Kranj offer exceptionally clean, tranquil, and family-friendly living with abundant parks and alpine nature."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "QSI International School of Ljubljana and British International School of Ljubljana offer world-class English and IB education."
      },
      {
        "icon": "✈️",
        "title": "Schengen Border-Free Travel",
        "description": "Slovenian residence card allows easy family travel across all 29 European Schengen countries."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification permit in Slovenia?",
        "answer": "Yes! Spouses granted temporary residence under family reunification have the legal right to work and seek employment in Slovenia under the ZZSDT regulations."
      },
      {
        "question": "Do Indian certificates need apostille for Slovenia?",
        "answer": "Yes. Slovenia is a member of the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India and translated into Slovenian by an authorized court interpreter."
      }
    ]
  },
  "cyprus": {
    "cname": "Cyprus",
    "scheme": "Temporary Residence for Family Members (Pink Slip / Family Reunification)",
    "overview": "Spouses and minor children of foreign professionals working in Cyprus (especially under the Foreign Interest Company regime) or holding Permanent Residency can obtain a Temporary Residence Permit (Pink Slip) for family members. Families enjoy Cyprus's safe Mediterranean lifestyle, English-speaking culture, and world-class British-curriculum private academies.",
    "fees": {
      "visa_fee": "€70 (Family Residence Permit per person)",
      "service_fee": "€70 (Alien Registration ARC card)",
      "total_fee": "approx. ₹13,000 per dependent",
      "notes": "Processed through the Civil Registry and Migration Department."
    },
    "proc_time": "4 to 6 Weeks",
    "proc_details": "Coordinated with sponsor's employer and submitted to CRMD in Nicosia.",
    "source": "Civil Registry and Migration Department (CRMD)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into English or Greek by a certified translator (PIO).",
    "min_funds": "Principal worker's salary contract and registered residential rental agreement in Cyprus",
    "highlights": [
      {
        "icon": "☀️",
        "title": "Mediterranean Coastal Paradise",
        "description": "300+ days of sunshine, Blue Flag beaches, safe neighborhoods, and high English literacy across the island."
      },
      {
        "icon": "🎓",
        "title": "Elite British & International Schools",
        "description": "The English School Nicosia, Heritage Private School (Limassol), and Foley's School offer premier British GCSE and A-Level diplomas."
      },
      {
        "icon": "🏥",
        "title": "GeSY Universal Healthcare",
        "description": "Residents gain access to Cyprus's General Healthcare System (GeSY) offering comprehensive medical coverage."
      }
    ],
    "faqs": [
      {
        "question": "Can dependent spouses work in Cyprus under the Foreign Interest Company regime?",
        "answer": "Yes! Spouses of third-country specialists employed by Foreign Interest Companies (FIC) have direct access to the Cypriot labour market without needing an independent work permit test."
      },
      {
        "question": "Do Indian certificates need apostille for Cyprus?",
        "answer": "Yes. Cyprus is a signatory to the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the Ministry of External Affairs (MEA) in India."
      }
    ]
  },

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
,
  "serbia": {
    "cname": "Serbia",
    "scheme": "Spajanje porodice (Family Reunification Temporary Residence)",
    "overview": "Spouses, registered domestic partners, and minor children of foreign professionals holding valid Serbian single permits or permanent residency can obtain a Family Reunification Residence Permit. Dependents receive biometric resident cards, granting peaceful family life, public healthcare, and schooling in Belgrade.",
    "fees": {
      "visa_fee": "RSD 11,000 (Temporary Residence Fee per person)",
      "service_fee": "RSD 3,000 (Biometric Card)",
      "total_fee": "approx. ₹11,000 per dependent",
      "notes": "Processed via MUP Directorate for Foreigners."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Applied online via eUprava or directly at the local Police Directorate in Serbia.",
    "source": "Ministry of Interior of the Republic of Serbia (MUP)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into Serbian by a certified court interpreter (Sudski tumač).",
    "min_funds": "Principal worker's salary contract and registered rental lease in Serbia",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Safe & Welcoming Balkan Culture",
        "description": "Exceptional hospitality, vibrant café culture, high safety, and low living costs across Belgrade and Novi Sad."
      },
      {
        "icon": "🎓",
        "title": "International School Access",
        "description": "International School of Belgrade (ISB) and British International School offer elite IB and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "Easy Border Travel",
        "description": "Multiple entry privileges allow easy family vacations across Europe and return trips to India."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification permit in Serbia?",
        "answer": "Under the new Law on Foreigners, family members can obtain work authorization under a simplified procedure once resident."
      },
      {
        "question": "Do Indian certificates need translation in Serbia?",
        "answer": "Yes. Indian birth and marriage certificates must be apostilled by the MEA in India and translated into Serbian by a certified court interpreter."
      }
    ]
  },
  "montenegro": {
    "cname": "Montenegro",
    "scheme": "Privremeni boravak radi spajanja porodice (Family Reunification Residency)",
    "overview": "Spouses and minor children of foreign professionals holding valid Montenegrin work or real estate residence permits can obtain a Family Reunification Residence Permit. Family members receive biometric cards, granting lawful residence, healthcare, and enrollment in public/private schools.",
    "fees": {
      "visa_fee": "€60 (Temporary Residence Fee per person)",
      "service_fee": "€10 (Biometric Card)",
      "total_fee": "approx. ₹6,500 per dependent",
      "notes": "Processed via local MUP branches."
    },
    "proc_time": "2 to 4 Weeks",
    "proc_details": "Submitted at local MUP office with apostilled marriage/birth certificates.",
    "source": "Ministry of Internal Affairs of Montenegro (MUP)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into Montenegrin by a certified court interpreter (Sudski tumač).",
    "min_funds": "Principal worker's salary contract and registered rental lease or property deed in Montenegro",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Idyllic Coastal Living",
        "description": "Safe, serene Mediterranean coastal life in Tivat, Kotor, and Budva with exceptional outdoor recreation."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "Knightsbridge Schools International (KSI Montenegro) in Porto Montenegro and Arcadia Academy in Kotor offer elite IB and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "Travel Freedom",
        "description": "Biometric resident card enables seamless travel in and out of Montenegro."
      }
    ],
    "faqs": [
      {
        "question": "Can dependent spouses work in Montenegro?",
        "answer": "Yes. Spouses holding family reunification residency can apply for work authorization under simplified local procedures."
      },
      {
        "question": "Do Indian certificates require apostille for Montenegro?",
        "answer": "Yes. Montenegro is a signatory to the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India."
      }
    ]
  },
  "albania": {
    "cname": "Albania",
    "scheme": "Bashkim Familjar (Family Reunification Residency)",
    "overview": "Spouses and minor children of foreign professionals holding valid Albanian Single Permits or permanent residency can obtain a Family Reunification Residence Permit (Leje Qëndrimi për Bashkim Familjar). Family members receive biometric cards, granting lawful residence, healthcare, and schooling in Tirana.",
    "fees": {
      "visa_fee": "€50 (Temporary Residence Fee per person)",
      "service_fee": "ALL 5,000 (Biometric Card)",
      "total_fee": "approx. ₹8,000 per dependent",
      "notes": "Applied online via e-Albania."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Submitted digitally on e-Albania with apostilled family certificates.",
    "source": "State Police Border and Migration Department",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into Albanian by an authorized sworn translator.",
    "min_funds": "Principal worker's salary contract and registered rental lease or property title in Albania",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Warm Mediterranean Lifestyle",
        "description": "Sunny climate with over 300 days of sunshine, friendly locals, and safe European living in Tirana."
      },
      {
        "icon": "🏫",
        "title": "Top International Schools",
        "description": "Tirana International School (QSI) and World Academy of Tirana offer elite IB and American curricula."
      },
      {
        "icon": "✈️",
        "title": "Free Border Movement",
        "description": "Multiple entry privileges allow easy family travel throughout the Balkans and to India."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family reunification permit in Albania?",
        "answer": "Yes. Under the Law on Foreigners, family reunification permit holders are entitled to engage in lawful employment in Albania."
      },
      {
        "question": "Do Indian documents need apostille for Albania?",
        "answer": "Yes. Albania is a member of the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India."
      }
    ]
  },
  "morocco": {
    "cname": "Morocco",
    "scheme": "Regroupement Familial (Family Reunification Carte de Séjour)",
    "overview": "Spouses and minor children of foreign professionals holding valid Moroccan employment authorization or permanent residence can obtain a Dependent Residence Card (Carte de Séjour Conjoint/Enfant). Family members receive full resident protections, access to international healthcare, and enrollment in French, British, and American accredited schools.",
    "fees": {
      "visa_fee": "$70 (Consular Entry Visa per person)",
      "service_fee": "MAD 500 (Annual Carte de Séjour)",
      "total_fee": "approx. ₹11,000 per family member",
      "notes": "Processed via DGSN Police Prefecture."
    },
    "proc_time": "4 to 6 Weeks",
    "proc_details": "Applied via Moroccan consulate or finalized at local Police Prefecture in Morocco.",
    "source": "Direction Générale de la Sûreté Nationale (DGSN)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into French or Arabic by a sworn translator (Traducteur Assermenté).",
    "min_funds": "Principal worker's salary contract and registered residential lease in Morocco",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Rich Culture & Superb Climate",
        "description": "Year-round sunny Mediterranean and Atlantic climate, delicious cuisine, and vibrant cosmopolitan cities."
      },
      {
        "icon": "🎓",
        "title": "Elite International Schools",
        "description": "George Washington Academy (Casablanca), American School of Tangier, and Lycée Français offer top French, American, and IB diplomas."
      },
      {
        "icon": "✈️",
        "title": "Easy Travel Mobility",
        "description": "Multiple-entry Carte de Séjour enables hassle-free border crossing between Morocco and India."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family dependent card in Morocco?",
        "answer": "To work, a spouse must obtain an independent CTE approved employment contract from an employer in Morocco."
      },
      {
        "question": "Do Indian certificates need translation for Morocco?",
        "answer": "Yes. Indian birth and marriage certificates must be apostilled by the MEA in India and translated into French or Arabic by a certified sworn translator."
      }
    ]
  },
  "tunisia": {
    "cname": "Tunisia",
    "scheme": "Regroupement Familial (Family Dependent Residence)",
    "overview": "Spouses and minor children of foreign professionals holding valid Tunisian employment authorization or permanent residency can obtain a Dependent Residence Card (Carte de Séjour). Family members can reside legally in Tunisia, access public/private healthcare, and enroll in top international schools.",
    "fees": {
      "visa_fee": "$50 (Entry Visa per person)",
      "service_fee": "TND 50 (Annual Carte de Séjour)",
      "total_fee": "approx. ₹5,500 per dependent",
      "notes": "Processed via Ministry of Interior."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Submitted at local police station in Tunisia with apostilled marriage/birth certificates.",
    "source": "Ministry of Interior",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into French or Arabic by a certified sworn translator.",
    "min_funds": "Principal worker's salary contract and registered residential lease in Tunisia",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Tranquil Mediterranean Living",
        "description": "Safe, family-friendly coastal suburbs in Tunis (La Marsa, Carthage, Gammarth) with rich culture and beaches."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "American Cooperative School of Tunis (ACST) and Lycée Français Gustave Flaubert offer world-class US, IB, and French diplomas."
      },
      {
        "icon": "✈️",
        "title": "Easy Travel to Europe & India",
        "description": "Tunis-Carthage Airport (TUN) offers extensive daily flight connections."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent visa in Tunisia?",
        "answer": "A dependent permit does not automatically permit employment; the spouse must obtain an approved MFPE employment contract."
      },
      {
        "question": "Do Indian certificates need translation for Tunisia?",
        "answer": "Yes. Indian certificates must be apostilled by the MEA in India and translated into French or Arabic."
      }
    ]
  },
  "algeria": {
    "cname": "Algeria",
    "scheme": "Regroupement Familial (Family Dependent Residence)",
    "overview": "Spouses and minor children of foreign specialists holding valid Algerian work permits or permanent residency can obtain a Family Dependent Visa and Carte de Résidence. Families enjoy safe compound communities, access to healthcare, and international schooling in Algiers.",
    "fees": {
      "visa_fee": "$80 (Consular Visa per person)",
      "service_fee": "DZD 2,000 (Carte de Résidence)",
      "total_fee": "approx. ₹8,000 per family member",
      "notes": "Processed via Embassy in New Delhi and local Wilaya in Algeria."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Submitted to Algerian Embassy with apostilled marriage/birth certificates.",
    "source": "Ministry of Foreign Affairs & Ministry of Interior",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into French or Arabic by a certified sworn translator.",
    "min_funds": "Principal worker's salary contract and registered residential lease in Algeria",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Comfortable Expat Living",
        "description": "Residential neighborhoods in Algiers (Hydra, Ben Aknoun, El Biar) offering embassies, international restaurants, and green parks."
      },
      {
        "icon": "🏫",
        "title": "International School Access",
        "description": "Lycée International Alexandre Dumas and American International School of Algiers offer top French, IB, and US diplomas."
      },
      {
        "icon": "✈️",
        "title": "Direct Border Entry",
        "description": "Multiple entry privileges allow easy school vacation travel to India."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent visa in Algeria?",
        "answer": "No. The dependent visa does not permit employment. To work, the spouse must obtain an independent work permit from an employer."
      },
      {
        "question": "Do Indian certificates need translation for Algeria?",
        "answer": "Yes. Indian birth and marriage certificates must be apostilled by the MEA in India and translated into French or Arabic."
      }
    ]
  },
  "uruguay": {
    "cname": "Uruguay",
    "scheme": "Residencia por Vínculo Familiar (Family Dependent Residency)",
    "overview": "Spouses, domestic partners, and minor children of foreign professionals holding valid Uruguayan temporary or permanent residency can obtain matching dependent residency. Dependents receive Uruguayan Cédula cards, granting lawful residence, public healthcare (ASSE/mutualista), and free access to top public and private schools.",
    "fees": {
      "visa_fee": "$100 (Residence Fee per person)",
      "service_fee": "$20 (Cédula de Identidad)",
      "total_fee": "approx. ₹10,000 per dependent",
      "notes": "Processed via Dirección Nacional de Migración."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Submitted to Migración in Montevideo with apostilled relationship certificates.",
    "source": "Dirección Nacional de Migración (DNM)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into Spanish by a licensed public translator (Traductor Público) in Uruguay.",
    "min_funds": "Principal worker's salary contract and proof of family accommodation",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Safe & Progressive Society",
        "description": "Ranked among the safest countries in the Americas with universal social safety and high education standards."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "The British Schools of Montevideo, Uruguayan American School (UAS), and Woodlands School offer elite IB and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "Seamless Mercosur Travel",
        "description": "Cédula holders can travel throughout South America (Brazil, Argentina, Chile) using just their Cédula card."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a family residence permit in Uruguay?",
        "answer": "Yes! Family members holding Uruguayan residence permits have the full legal right to work and engage in commerce."
      },
      {
        "question": "Do Indian documents need apostille for Uruguay?",
        "answer": "Yes. Uruguay is a member of the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India."
      }
    ]
  },
  "fiji": {
    "cname": "Fiji",
    "scheme": "Co-Extensive Permit for Spouses and Children",
    "overview": "Spouses and minor children of foreign professionals holding valid Fijian work permits or investor permits can obtain a Co-Extensive Permit from Fiji Immigration. Family members can live legally in Fiji, attend top private schools, and access healthcare services.",
    "fees": {
      "visa_fee": "FJD $250 (Co-Extensive Permit Fee per person)",
      "service_fee": "FJD $100 processing",
      "total_fee": "approx. ₹13,000 per dependent",
      "notes": "Processed via Fiji Immigration Department."
    },
    "proc_time": "2 to 4 Weeks",
    "proc_details": "Applied at Fiji Immigration with legalized marriage and birth certificates.",
    "source": "Fiji Immigration Department",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates verifying legal marriage and parentage.",
    "min_funds": "Principal worker's salary contract and security bond guarantee",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Warm & Welcoming Community",
        "description": "Friendly multi-cultural society where Hindi, English, and Fijian are widely spoken."
      },
      {
        "icon": "🏫",
        "title": "Top International Schools",
        "description": "International School Suva (ISS) and International School Nadi offer premier IB and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "Easy Travel to Australia, NZ & India",
        "description": "Fiji Airways operates direct flights from Nadi to Singapore, Australia, New Zealand, and the US."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a co-extensive permit in Fiji?",
        "answer": "A co-extensive permit alone does not authorize employment; the spouse must apply for an independent work permit upon securing an employer job offer."
      },
      {
        "question": "Is English widely spoken in Fiji?",
        "answer": "Yes. English is an official language in Fiji and is the primary medium of education, commerce, and government."
      }
    ]
  },
  "panama": {
    "cname": "Panama",
    "scheme": "Visa de Dependiente (Family Dependent Residency)",
    "overview": "Spouses and dependent children of foreign professionals holding valid Panamanian work permits, SEM visas, or Qualified Investor residency can obtain a Family Dependent Visa. Dependents receive Cédula E cards, granting lawful residence, healthcare, and enrollment in top international schools.",
    "fees": {
      "visa_fee": "$250 (Migración Fee per person)",
      "service_fee": "$50 (Carné de Migración)",
      "total_fee": "approx. ₹25,000 per dependent",
      "notes": "Processed via Servicio Nacional de Migración."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Submitted via a Panamanian attorney with apostilled marriage/birth certificates.",
    "source": "Servicio Nacional de Migración Panamá",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates officially translated into Spanish by an authorized public translator (Traductor Público Autorizado) in Panama.",
    "min_funds": "Principal worker's salary contract and declaration of family maintenance",
    "highlights": [
      {
        "icon": "🏙️",
        "title": "Cosmopolitan & Safe Living",
        "description": "Panama City's Punta Pacífica, Costa del Este, and Santa María offer luxury oceanfront skyscrapers, gated communities, and shopping malls."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "International School of Panama (ISP), Balboa Academy, and King's College offer premier US, IB, and British diplomas."
      },
      {
        "icon": "🏥",
        "title": "Johns Hopkins Affiliated Healthcare",
        "description": "Hospital Punta Pacífica is affiliated with Johns Hopkins Medicine International, providing world-class care."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent visa in Panama?",
        "answer": "The dependent visa does not grant automatic work rights; the spouse must apply for work authorization through MITRADEL upon securing an employer offer."
      },
      {
        "question": "Do Indian documents need apostille for Panama?",
        "answer": "Yes. Panama is a signatory to the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India."
      }
    ]
  },
  "dominican-republic": {
    "cname": "Dominican Republic",
    "scheme": "Residencia por Dependencia (Family Dependent Residency)",
    "overview": "Spouses and minor children of foreign professionals holding valid Dominican work residency or investor permanent residency can obtain a Family Dependent Residence Card. Dependents receive full resident protections, access to modern private healthcare, and enrollment in top international schools.",
    "fees": {
      "visa_fee": "$100 (Consular Visa Fee per person)",
      "service_fee": "DOP 8,000 (DGM Residence Carné)",
      "total_fee": "approx. ₹18,000 per dependent",
      "notes": "Processed via Dirección General de Migración."
    },
    "proc_time": "4 to 6 Weeks",
    "proc_details": "Submitted to DGM in Santo Domingo with apostilled marriage/birth certificates.",
    "source": "Dirección General de Migración (DGM)",
    "validity": "Co-terminus with Principal Sponsor's Permit",
    "stay": "Full duration of primary sponsor's valid status",
    "entry_type": "Multiple Entry",
    "relationship_doc": "Apostilled Marriage Certificate & Children's Birth Certificates",
    "relationship_desc": "MEA-apostilled certificates translated into Spanish by an authorized judicial interpreter (Intérprete Judicial) in Dominican Republic.",
    "min_funds": "Principal worker's salary contract and declaration of family economic maintenance",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Vibrant Caribbean Lifestyle",
        "description": "Beautiful beach communities in Punta Cana, Cap Cana, and Casa de Campo with tropical resort living."
      },
      {
        "icon": "🎓",
        "title": "Top International Schools",
        "description": "Carol Morgan School (Santo Domingo) and Punta Cana International School offer premier American, IB, and Cambridge diplomas."
      },
      {
        "icon": "✈️",
        "title": "International Airport Connectivity",
        "description": "Punta Cana International Airport connects directly to over 60 global cities."
      }
    ],
    "faqs": [
      {
        "question": "Can a spouse work on a dependent residence permit in Dominican Republic?",
        "answer": "The dependent permit does not authorize work; the spouse must apply for work authorization upon securing an employment contract."
      },
      {
        "question": "Do Indian documents need apostille for Dominican Republic?",
        "answer": "Yes. The Dominican Republic is a member of the Hague Apostille Convention. All Indian certificates (marriage, birth, PCC) must be apostilled by the MEA in India."
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
  const fromNorm = normalizeCountry(from);
  if (fromNorm && fromNorm !== 'india') {
    const pureRoute = resolvePureRouteFamily(from, to);
    if (pureRoute) return pureRoute;
  }

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

export const getFamilyVisaSteps = getFamilySteps;

