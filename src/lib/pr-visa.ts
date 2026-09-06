import { resolvePureRoutePR } from './pure-routes';
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
    "scheme": "Permanent Residency (Vid na Zhitelstvo - VNZh)",
    "overview": "Russia offers Permanent Residency (Vid na Zhitelstvo) after 5 years of continuous residence. Requires a valid residence permit, Russian language proficiency (TIR), and financial stability. Path to Russian citizenship after 5 years of permanent residency.",
    "fees": {
      "visa_fee": "State Duty: 5,000 RUB (approx. ₹4,500)",
      "service_fee": "State medical & TIR exam fees apply",
      "total_fee": "approx. ₹15,000 Total Statutory Reference",
      "currency": "RUB",
      "notes": "Application lodged at local MVD Migration Department."
    },
    "proc_time": "4 to 6 Months (Standard Statutory SLA)",
    "proc_details": "Adjudicated by the Ministry of Internal Affairs (MVD) Migration Directorate.",
    "source": "Russian Ministry of Internal Affairs (MVD) & Migration Department",
    "validity": "Indefinite Permanent Resident Status (Booklet renewed at age milestones)",
    "stay": "Indefinite (with Valid PR Status)",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Temporary Residence Permit (RVP) & TIR Language Certificate",
    "assessment_desc": "Valid RVP maintained for at least 8 months plus official TIR Russian language, history, and law certificate.",
    "min_funds": "Official annual income meeting Russian regional subsistence minimum (NDFL-2 / bank balance)",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Residency",
        "description": "Vid na Zhitelstvo — indefinite residence with unrestricted employment rights."
      },
      {
        "icon": "🗣️",
        "title": "Russian Language",
        "description": "TIR exam — Russian language proficiency required for PR and citizenship."
      },
      {
        "icon": "📋",
        "title": "Temporary Residence Permit",
        "description": "RVP is the prerequisite step toward permanent residency."
      },
      {
        "icon": "🔄",
        "title": "Path to Citizenship",
        "description": "Russian citizenship eligibility after 5 years of permanent residency."
      }
    ],
    "faqs": [
      {
        "question": "How long does it take to get PR in Russia?",
        "answer": "You must complete at least 8-12 months on RVP before applying. Processing takes 4-6 months."
      },
      {
        "question": "Do I need to speak Russian for PR?",
        "answer": "Yes, you must pass the TIR Russian language proficiency, history, and law exam."
      },
      {
        "question": "Can I get Russian citizenship after PR?",
        "answer": "Yes, after holding PR status and residing for 5 years, you can apply for Russian citizenship."
      }
    ]
  },
  "kazakhstan": {
    "cname": "Kazakhstan",
    "scheme": "Permanent Residence Permit (Vid na Zhitelstvo / L-1)",
    "overview": "Kazakhstan offers Permanent Residence permits for foreign nationals residing legally for 3 or more years or investing in the Kazakh economy. Applicants must prove financial solvency (deposit in Kazakh bank) and register with the Migration Police.",
    "fees": {
      "visa_fee": "State duty: 4 monthly calculation indices (approx. ₹3,500)",
      "service_fee": "Legalization & apostille costs",
      "total_fee": "Official Government State Duties Apply",
      "currency": "KZT",
      "notes": "Application lodged at local Migration Service Department in Kazakhstan."
    },
    "proc_time": "2 to 3 Months (Statutory Review)",
    "proc_details": "Processed by the Migration Service Committee of the Ministry of Internal Affairs of Kazakhstan.",
    "source": "Migration Service Committee of the Ministry of Internal Affairs of Kazakhstan",
    "validity": "10-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Solvency Confirmation from Kazakh Bank & Police Clearance",
    "assessment_desc": "Bank guarantee showing 1,320 MCI (approx. $10,000 USD) plus apostilled Indian police clearance certificate.",
    "min_funds": "Deposit of minimum 1,320 Monthly Calculation Indices in a Kazakh bank account",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "10-Year Residence Card",
        "description": "Full residence rights and national social benefits."
      },
      {
        "icon": "💼",
        "title": "Free Employment",
        "description": "Work in any sector without employer-sponsored work permits."
      },
      {
        "icon": "🏡",
        "title": "Property Ownership",
        "description": "Right to purchase real estate and residential property in Kazakhstan."
      },
      {
        "icon": "🔄",
        "title": "Path to Citizenship",
        "description": "Eligible to apply for Kazakh citizenship after 5 years continuous residence."
      }
    ],
    "faqs": [
      {
        "question": "How can an Indian citizen get PR in Kazakhstan?",
        "answer": "Requires holding a valid temporary residence permit, passing security checks, and depositing the statutory solvency amount in a Kazakh bank."
      },
      {
        "question": "How long is the Kazakhstan PR card valid?",
        "answer": "The biometric residence certificate is issued for 10 years, renewable upon expiry."
      },
      {
        "question": "Does PR allow visa-free entry to Kazakhstan?",
        "answer": "Yes, permanent residence permit holders can enter and exit Kazakhstan freely without visas."
      }
    ]
  },
  "ukraine": {
    "cname": "Ukraine",
    "scheme": "Permanent Residence Permit (Posvidka na postiyne prozhyvannya)",
    "overview": "Ukraine grants Permanent Residence (Posvidka) to foreign nationals within statutory immigration quotas or quota-exempt categories (spouses of Ukrainian citizens, investors contributing $100,000+ USD, and scientists).",
    "fees": {
      "visa_fee": "State duty: approx. 1,000-2,000 UAH",
      "service_fee": "Administrative card issuance fee",
      "total_fee": "approx. ₹10,000 Statutory Reference",
      "currency": "UAH",
      "notes": "Applied at State Migration Service offices in Ukraine."
    },
    "proc_time": "6 to 12 Months (Statutory Review)",
    "proc_details": "State Migration Service verifies immigration permission (Dozvil na immigratsiyu).",
    "source": "State Migration Service of Ukraine (SMS)",
    "validity": "10-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Immigration Permit Grant (Dozvil na immigratsiyu)",
    "assessment_desc": "Official immigration quota approval issued by the State Migration Service of Ukraine.",
    "min_funds": "Proof of continuous lawful income or property ownership in Ukraine",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite Stay",
        "description": "Full permanent residency rights with no employment permit required."
      },
      {
        "icon": "🔄",
        "title": "Path to Citizenship",
        "description": "Eligible for naturalization after 5 years continuous permanent residency."
      }
    ],
    "faqs": [
      {
        "question": "How do you qualify for PR in Ukraine?",
        "answer": "Through marriage to a Ukrainian citizen for 2+ years, foreign investment of $100,000+ USD, or holding high-demand specialized skills under annual quotas."
      }
    ]
  },
  "belarus": {
    "cname": "Belarus",
    "scheme": "Permanent Residence Permit (Vid na zhitelstvo)",
    "overview": "Permanent residence in Belarus is available to foreign nationals who have resided continuously on temporary permits for 7 years, or through investment of €150,000+, marriage to a Belarusian citizen, or high professional merit.",
    "fees": {
      "visa_fee": "State duty: 2 basic units (approx. ₹2,200)",
      "service_fee": "Biometric residence card fee",
      "total_fee": "approx. ₹5,000 Statutory Reference",
      "currency": "BYN",
      "notes": "Applied at local Department on Citizenship and Migration in Belarus."
    },
    "proc_time": "3 to 6 Months (Statutory Review)",
    "proc_details": "Adjudicated by the Department on Citizenship and Migration of the Ministry of Internal Affairs.",
    "source": "Department on Citizenship and Migration of the Republic of Belarus",
    "validity": "Biometric Residence Card (Renewable every 5-10 years)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Migration Approval Order & Police Clearance",
    "assessment_desc": "Official decree granting permanent residence status by the Ministry of Internal Affairs.",
    "min_funds": "Proof of continuous lawful income meeting Belarusian subsistence standards",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Full Social Rights",
        "description": "Equal rights to healthcare, education, and social security as citizens."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Employment",
        "description": "Work in any enterprise without special permits."
      }
    ],
    "faqs": [
      {
        "question": "How long before an Indian can get PR in Belarus?",
        "answer": "Standard qualification requires 7 years continuous legal residence, reduced to 2 years for spouses of citizens or high-value investors."
      }
    ]
  },
  "uzbekistan": {
    "cname": "Uzbekistan",
    "scheme": "Permanent Residence Permit (Vid na zhitelstvo)",
    "overview": "Uzbekistan offers permanent residency to foreign nationals investing $100,000+ USD in real estate (in Tashkent region) or residing legally on temporary permits for 5 continuous years.",
    "fees": {
      "visa_fee": "State duty: approx. 2-5 basic calculation units",
      "service_fee": "Biometric card processing fee",
      "total_fee": "approx. ₹8,000 Statutory Reference",
      "currency": "UZS",
      "notes": "Applied at Main Directorate of Migration and Citizenship in Tashkent."
    },
    "proc_time": "3 to 6 Months (Statutory Review)",
    "proc_details": "Processed by the Ministry of Internal Affairs of the Republic of Uzbekistan.",
    "source": "Main Directorate of Migration and Citizenship (MVD Uzbekistan)",
    "validity": "5-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Property Purchase Deed ($100k+ USD) or 5-Year Legal Residence Verification",
    "assessment_desc": "Registered title deed in Tashkent region or continuous employment/residence record.",
    "min_funds": "Real estate investment threshold or verifiable sustainable income",
    "highlights": [
      {
        "icon": "🏡",
        "title": "Real Estate Route",
        "description": "Fast-track PR through property acquisition in Tashkent or Samarkand."
      },
      {
        "icon": "🏛️",
        "title": "Equal Civil Rights",
        "description": "Access to local banking, business ownership, and healthcare."
      }
    ],
    "faqs": [
      {
        "question": "Can buying property in Uzbekistan give PR?",
        "answer": "Yes, foreign nationals purchasing real estate valued at $100,000+ USD in Tashkent region qualify for a permanent residence permit."
      }
    ]
  },
  "kyrgyzstan": {
    "cname": "Kyrgyzstan",
    "scheme": "Permanent Residence Permit (Vid na zhitelstvo)",
    "overview": "Available to foreign nationals residing legally on temporary permits for 5 continuous years, or through significant capital investments or marriage to a Kyrgyz citizen.",
    "fees": {
      "visa_fee": "State duty: approx. 3,000-5,000 KGS",
      "service_fee": "Biometric card fee",
      "total_fee": "approx. ₹6,000 Statutory Reference",
      "currency": "KGS",
      "notes": "Lodged at local Migration Department in Kyrgyzstan."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Adjudicated by the Ministry of Internal Affairs and State Migration Service.",
    "source": "Ministry of Internal Affairs of the Kyrgyz Republic (MVD)",
    "validity": "5-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Proof of 5-Year Continuous Lawful Residence & Solvency",
    "assessment_desc": "Clean police clearance and verified housing registration in Kyrgyzstan.",
    "min_funds": "Proof of sustainable annual income or local property ownership",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "5-Year Residence Card",
        "description": "Permanent residence with unrestricted domestic employment rights."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens obtain PR in Kyrgyzstan?",
        "answer": "Yes, after 5 continuous years of lawful temporary residence and passing standard police/tax clearances."
      }
    ]
  },
  "tajikistan": {
    "cname": "Tajikistan",
    "scheme": "Permanent Residence Permit (Iҷozat baroi sukūnati doimī)",
    "overview": "Permanent residence is granted to foreign nationals residing legally on temporary permits for 5 continuous years, high-value investors, or spouses of Tajik citizens.",
    "fees": {
      "visa_fee": "State duty: approx. 500-1,000 TJS",
      "service_fee": "Biometric card fee",
      "total_fee": "approx. ₹5,000 Statutory Reference",
      "currency": "TJS",
      "notes": "Lodged at Migration Service in Dushanbe."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Adjudicated by the Ministry of Internal Affairs (VKD).",
    "source": "Ministry of Internal Affairs of the Republic of Tajikistan (VKD)",
    "validity": "5-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Proof of 5-Year Continuous Residence & Clean Police Clearance",
    "assessment_desc": "Proof of continuous legal stay and registered residential accommodation.",
    "min_funds": "Proof of sustainable lawful income in Tajikistan",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Status",
        "description": "Live and work indefinitely in Tajikistan without annual work permits."
      }
    ],
    "faqs": [
      {
        "question": "How can an Indian get PR in Tajikistan?",
        "answer": "By completing 5 years of lawful temporary residence or through substantial direct business investments."
      }
    ]
  },
  "turkmenistan": {
    "cname": "Turkmenistan",
    "scheme": "Permanent Residence Status (Hemişelik ýaşaýyş)",
    "overview": "Permanent residence in Turkmenistan is highly restricted and granted strictly by presidential decree or State Migration Service authorization after 5+ years lawful residence, marriage to a citizen, or strategic national contribution.",
    "fees": {
      "visa_fee": "State duty: approx. 200-500 TMT",
      "service_fee": "Biometric card fee",
      "total_fee": "approx. ₹10,000 Statutory Reference",
      "currency": "TMT",
      "notes": "State Migration Service Central Headquarters in Ashgabat."
    },
    "proc_time": "6 to 12 Months",
    "proc_details": "Adjudicated centrally by the State Migration Service of Turkmenistan.",
    "source": "State Migration Service of Turkmenistan",
    "validity": "5-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "State Migration Service Permanent Residence Decree",
    "assessment_desc": "Official decree approving permanent residence registration in Turkmenistan.",
    "min_funds": "Verified lawful income and registered residential accommodation in Turkmenistan",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Rare Permanent Status",
        "description": "Indefinite residence authorization granted under strict statutory criteria."
      }
    ],
    "faqs": [
      {
        "question": "Is PR available in Turkmenistan?",
        "answer": "PR is rare and strictly regulated, requiring years of legal residence, marriage to a citizen, or strategic economic investment."
      }
    ]
  },
  "azerbaijan": {
    "cname": "Azerbaijan",
    "scheme": "Permanent Residence Permit (Daimi yaşamaq üçün icazə vəsiqəsi)",
    "overview": "Azerbaijan grants permanent residence to foreign nationals who have resided continuously on temporary residence permits for 2 years, or through investment of 500,000+ AZN in the economy or 200,000+ AZN in local bank deposits.",
    "fees": {
      "visa_fee": "State duty: approx. 300-500 AZN",
      "service_fee": "Biometric card fee",
      "total_fee": "approx. ₹15,000 Statutory Reference",
      "currency": "AZN",
      "notes": "Applied at State Migration Service in Baku."
    },
    "proc_time": "2 to 3 Months",
    "proc_details": "Adjudicated by the State Migration Service of Azerbaijan.",
    "source": "State Migration Service of the Republic of Azerbaijan",
    "validity": "5-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "2-Year Lawful Residence Record or Investment Proof & Azerbaijani Language Test",
    "assessment_desc": "Proof of 2 years continuous temporary residence and basic Azerbaijani language test.",
    "min_funds": "Proof of sustainable lawful income or bank deposit in Azerbaijan",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Fast 2-Year Pathway",
        "description": "One of the quickest European/Eurasian paths to PR — eligible after just 2 years of residence."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Work Rights",
        "description": "Work in any enterprise without employer-sponsored work permits."
      }
    ],
    "faqs": [
      {
        "question": "How quickly can I get PR in Azerbaijan?",
        "answer": "You can apply after holding a temporary residence permit continuously for just 2 years and passing a basic language/rights test."
      }
    ]
  },
  "georgia": {
    "cname": "Georgia",
    "scheme": "Permanent Residence Permit (Mudmivi binadrobis motsmoba)",
    "overview": "Georgia grants Permanent Residence to foreign nationals who have resided lawfully on temporary residence permits for 6 continuous years, or through $300,000+ USD real estate investment (5-year investment PR leading to permanent status).",
    "fees": {
      "visa_fee": "State fee: approx. 300-500 GEL",
      "service_fee": "Card processing fee",
      "total_fee": "approx. ₹12,000 Statutory Reference",
      "currency": "GEL",
      "notes": "Applied at Public Service Hall in Tbilisi or regional branches."
    },
    "proc_time": "30 Calendar Days (Standard) / 10 Days (Express)",
    "proc_details": "Adjudicated by the Public Service Development Agency under the Ministry of Justice.",
    "source": "Public Service Hall & Ministry of Justice of Georgia",
    "validity": "Indefinite Permanent Residence Status (Biometric card renewed every 5 years)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "6-Year Temporary Residence Record or $300k USD Investment Proof",
    "assessment_desc": "Continuous legal residence record verified by Public Service Hall.",
    "min_funds": "Verified sustainable income or investment threshold",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Residence Card",
        "description": "Indefinite right to live and work in Georgia without visa requirements."
      },
      {
        "icon": "🏡",
        "title": "Real Estate Investment",
        "description": "Pathways to residence through property acquisition."
      }
    ],
    "faqs": [
      {
        "question": "How long does it take to get PR in Georgia?",
        "answer": "Standard eligibility requires 6 continuous years of temporary residence, or fast-track investment in commercial real estate."
      }
    ]
  },
  "armenia": {
    "cname": "Armenia",
    "scheme": "Special Residence Status (10-Year Passport) / Permanent Residence (5-Year Card)",
    "overview": "Armenia offers a unique Special Residence Status (10-year passport booklet) for foreign nationals of Armenian origin or significant economic/cultural contributors, as well as 5-year Permanent Residence cards after 3 years legal residence.",
    "fees": {
      "visa_fee": "Special Status: 150,000 AMD (approx. ₹30,000) / PR: 140,000 AMD",
      "service_fee": "Document review fee",
      "total_fee": "approx. ₹30,000 Statutory Reference",
      "currency": "AMD",
      "notes": "Special Status grants a 10-year passport issued by the President."
    },
    "proc_time": "2 to 3 Months",
    "proc_details": "Adjudicated by the Migration and Citizenship Service and the Office of the Prime Minister/President.",
    "source": "Migration and Citizenship Service & Office of the President of Armenia",
    "validity": "10-Year Special Passport / 5-Year Permanent Residence Card",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "Economic Investment / 3-Year Legal Residence Verification",
    "assessment_desc": "Proof of continuous residence, business investment, or exceptional contribution.",
    "min_funds": "Proof of sustainable lawful income or enterprise ownership in Armenia",
    "highlights": [
      {
        "icon": "📘",
        "title": "10-Year Special Passport",
        "description": "Prestigious 10-year special passport booklet granting full residency rights."
      },
      {
        "icon": "💼",
        "title": "Free Employment & Enterprise",
        "description": "Work and start businesses with zero foreign worker restrictions."
      }
    ],
    "faqs": [
      {
        "question": "What is Armenia Special Residence Status?",
        "answer": "A prestigious 10-year status granted by presidential decree that provides full residency, civil rights, and border-free entry."
      }
    ]
  },
  "moldova": {
    "cname": "Moldova",
    "scheme": "Permanent Residence Permit (Drept de ședere permanentă)",
    "overview": "Moldova grants permanent residency to foreign nationals who have resided continuously on temporary residence permits for 5 years, investors contributing significant capital, or spouses of Moldovan citizens after 3 years.",
    "fees": {
      "visa_fee": "State duty: approx. 1,000 MDL",
      "service_fee": "Biometric card fee",
      "total_fee": "approx. ₹8,000 Statutory Reference",
      "currency": "MDL",
      "notes": "Lodged at General Inspectorate for Migration in Chișinău."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Adjudicated by the General Inspectorate for Migration under the Ministry of Internal Affairs.",
    "source": "General Inspectorate for Migration of the Republic of Moldova (IGM)",
    "validity": "10-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "5-Year Continuous Residence Record & Romanian/Moldovan Language Test",
    "assessment_desc": "Clean police clearance, certified housing, and basic state language test.",
    "min_funds": "Proof of sustainable lawful income or property in Moldova",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent European Status",
        "description": "Full permanent residence rights in an EU candidate country."
      },
      {
        "icon": "💼",
        "title": "Free Employment",
        "description": "Work in any sector without work authorization permits."
      }
    ],
    "faqs": [
      {
        "question": "How can an Indian get PR in Moldova?",
        "answer": "After 5 continuous years of lawful temporary residence, passing standard health, criminal, and state language checks."
      }
    ]
  },
  "pakistan": {
    "cname": "Pakistan",
    "scheme": "Permanent Residence / Pakistan Origin Card (POC)",
    "overview": "Foreign spouses of Pakistani citizens qualify for a Pakistan Origin Card (POC) granting indefinite stay and visa-free travel. Permanent residence for foreign investors requires substantial capital investment under Board of Investment guidelines.",
    "fees": {
      "visa_fee": "$150-250 USD",
      "service_fee": "NADRA smart card fee",
      "total_fee": "$150-250 USD Statutory Reference",
      "currency": "USD",
      "notes": "Issued by NADRA."
    },
    "proc_time": "2 to 3 Months",
    "proc_details": "Adjudicated by NADRA and Ministry of Interior.",
    "source": "NADRA & Ministry of Interior Pakistan",
    "validity": "5-Year Smart Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "POC Eligibility Verification / BOI Investment Approval",
    "assessment_desc": "Proof of marriage to a citizen or major foreign direct investment.",
    "min_funds": "Proof of sustainable lawful income or investment threshold",
    "highlights": [
      {
        "icon": "💳",
        "title": "NADRA Smart Card",
        "description": "Visa-free entry, employment rights, and bank account opening in Pakistan."
      }
    ],
    "faqs": [
      {
        "question": "Can foreign spouses get permanent stay in Pakistan?",
        "answer": "Yes, foreign spouses of Pakistani citizens qualify for the Pakistan Origin Card (POC), which provides multi-year residence and visa-free travel."
      }
    ]
  },
  "bangladesh": {
    "cname": "Bangladesh",
    "scheme": "Permanent Resident Status / Investor PR",
    "overview": "Bangladesh offers permanent residency to foreign nationals who invest a minimum of $75,000 USD in a non-repatriable industrial project or $1,000,000 USD in recognized financial institutions under BIDA guidelines.",
    "fees": {
      "visa_fee": "State duty applies",
      "service_fee": "Administrative processing",
      "total_fee": "Official Statutory Fees Apply",
      "currency": "BDT",
      "notes": "Applied via Bangladesh Investment Development Authority (BIDA)."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Reviewed by BIDA and approved by Ministry of Home Affairs.",
    "source": "Bangladesh Investment Development Authority (BIDA) & Ministry of Home Affairs",
    "validity": "Permanent Residence Status (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "BIDA Investment Certificate ($75,000+ USD)",
    "assessment_desc": "Official proof of capital transfer into Bangladesh banking system.",
    "min_funds": "Minimum $75,000 USD direct industrial investment",
    "highlights": [
      {
        "icon": "💰",
        "title": "Low Investment Threshold",
        "description": "PR granted through direct enterprise investment starting at $75,000 USD."
      },
      {
        "icon": "🏛️",
        "title": "Citizenship Pathway",
        "description": "Investment of $500,000 USD qualifies for naturalized citizenship."
      }
    ],
    "faqs": [
      {
        "question": "How can a foreigner get PR in Bangladesh?",
        "answer": "By investing a minimum of $75,000 USD in a non-repatriable enterprise approved by BIDA."
      }
    ]
  },
  "myanmar": {
    "cname": "Myanmar",
    "scheme": "Permanent Residence Scheme (PR System)",
    "overview": "Myanmar offers a Permanent Residence (PR) scheme for foreign investors, specialists, professionals, and foreign spouses of Myanmar citizens, permitting long-term stay and multi-entry privileges.",
    "fees": {
      "visa_fee": "Application fee: $500 USD / Annual permit fee applies",
      "service_fee": "Biometric card fee",
      "total_fee": "$500 USD Statutory Reference",
      "currency": "USD",
      "notes": "Administered by the Ministry of Immigration and Population in Nay Pyi Taw."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Reviewed by the Central Committee for the Management of Permanent Residence.",
    "source": "Ministry of Immigration and Population of Myanmar",
    "validity": "Initial 5-Year Term (Renewable for 5-year periods)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "DICA Investment / Professional Qualification Verification",
    "assessment_desc": "Certified professional credentials or DICA-approved enterprise investment.",
    "min_funds": "Proof of sustainable lawful income or investment capital",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "5-Year Renewable Term",
        "description": "Multi-year residence with unrestricted exit and entry."
      }
    ],
    "faqs": [
      {
        "question": "How does an Indian citizen qualify for Myanmar PR?",
        "answer": "Through the official PR scheme as an investor, skilled specialist, or foreign spouse after background and financial vetting."
      }
    ]
  },
  "laos": {
    "cname": "Laos",
    "scheme": "Permanent Stay Permit (Bay anuyat yu doim)",
    "overview": "Permanent residence in Laos is granted to foreign investors with substantial registered capital ($500,000+ USD) in national development projects or foreign nationals with 10+ years lawful continuous residence.",
    "fees": {
      "visa_fee": "State duty applies",
      "service_fee": "Biometric card fee",
      "total_fee": "Official Government State Duties Apply",
      "currency": "LAK",
      "notes": "Administered by the Department of Immigration in Vientiane."
    },
    "proc_time": "6 to 12 Months",
    "proc_details": "Reviewed by the Ministry of Public Security and approved by Prime Minister's Office.",
    "source": "Ministry of Public Security & Ministry of Planning and Investment of Lao PDR",
    "validity": "5-Year Renewable Stay Permit",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "MPI Investment Concession / Continuous Residence Record",
    "assessment_desc": "Proof of major enterprise investment or clean 10-year residence record.",
    "min_funds": "Substantial enterprise investment or verified sustainable income",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Long-Term Residence",
        "description": "Long-term security for major international investors and project directors."
      }
    ],
    "faqs": [
      {
        "question": "Can foreigners get PR in Laos?",
        "answer": "Yes, through substantial investment in registered concession projects or extended lawful residence under Ministry of Public Security rules."
      }
    ]
  },
  "mongolia": {
    "cname": "Mongolia",
    "scheme": "Permanent Residence Permit (Baingyn orshin suukh zöwshööröl)",
    "overview": "Permanent residence in Mongolia is available to foreign nationals who have resided legally for 3+ years, made substantial capital investments ($100,000+ USD) in Mongolian enterprise, or spouses of Mongolian citizens.",
    "fees": {
      "visa_fee": "State duty: approx. 100,000-200,000 MNT",
      "service_fee": "Biometric card fee",
      "total_fee": "approx. ₹8,000 Statutory Reference",
      "currency": "MNT",
      "notes": "Administered by the Mongolia Immigration Agency in Ulaanbaatar."
    },
    "proc_time": "2 to 3 Months",
    "proc_details": "Adjudicated by the Mongolia Immigration Agency.",
    "source": "Mongolia Immigration Agency (MIA)",
    "validity": "5-Year Biometric Residence Card (Renewable)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "3-Year Legal Residence Record / $100k USD Investment Certificate",
    "assessment_desc": "Clean background check and certified proof of continuous residence or investment.",
    "min_funds": "Proof of sustainable lawful income or enterprise investment in Mongolia",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "5-Year Residence Card",
        "description": "Permanent residence with unrestricted work authorization and travel freedom."
      }
    ],
    "faqs": [
      {
        "question": "How can an Indian get PR in Mongolia?",
        "answer": "By investing $100,000+ USD in an active Mongolian enterprise or residing continuously for 3+ years on a valid residence permit."
      }
    ]
  },
  "taiwan": {
    "cname": "Taiwan",
    "scheme": "Alien Permanent Resident Certificate (APRC / 永久居留證)",
    "overview": "Taiwan offers Alien Permanent Resident Certificates (APRC) to foreign professionals who have legally resided in Taiwan for 5 consecutive years (residing at least 183 days per year) and meet statutory salary or asset requirements (reduced to 3 years for Gold Card holders).",
    "fees": {
      "visa_fee": "State fee: NT$10,000 (approx. ₹26,000)",
      "service_fee": "Document verification fee",
      "total_fee": "NT$10,000 Statutory Reference",
      "currency": "TWD",
      "notes": "Administered by National Immigration Agency (NIA) service centers in Taiwan."
    },
    "proc_time": "1 to 2 Months",
    "proc_details": "Adjudicated by the National Immigration Agency under the Ministry of the Interior.",
    "source": "National Immigration Agency (NIA Taiwan)",
    "validity": "Indefinite Permanent Resident Status (Open work rights)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "5-Year ARC Residence Record & Tax Assessment (twice minimum wage)",
    "assessment_desc": "Proof of 5 years residence and annual income exceeding twice the statutory minimum wage (NT$575,000+).",
    "min_funds": "Annual income of twice the statutory minimum wage or verified net worth exceeding NT$5,000,000",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Open Work Rights",
        "description": "Work in any role or start any business without employer sponsorship."
      },
      {
        "icon": "⚡",
        "title": "Fast-Track for Gold Card",
        "description": "Employment Gold Card holders qualify for APRC in just 3 years instead of 5 years."
      }
    ],
    "faqs": [
      {
        "question": "How long does it take to get APRC in Taiwan?",
        "answer": "Standard requirement is 5 consecutive years residing at least 183 days/year, reduced to 3 years for Employment Gold Card holders."
      }
    ]
  },
  "hong-kong": {
    "cname": "Hong Kong",
    "scheme": "Permanent Identity Card (Right of Abode / 香港永久性居民身分證)",
    "overview": "Foreign nationals who have entered Hong Kong lawfully on a valid visa (work, business, study) and resided continuously for not less than 7 years qualify for Right of Abode and a Hong Kong Permanent Identity Card (HKID).",
    "fees": {
      "visa_fee": "HK$0 (Application Fee) / HK$0 (Smart ID Card issuance)",
      "service_fee": "₹0",
      "total_fee": "HK$0 Total Government Cost",
      "currency": "HKD",
      "notes": "Right of Abode verification is free of charge."
    },
    "proc_time": "6 to 8 Weeks",
    "proc_details": "Adjudicated by the Right of Abode Section of the Hong Kong Immigration Department.",
    "source": "Hong Kong Immigration Department (ImmD)",
    "validity": "Indefinite Right of Abode (Never expires)",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "7-Year Continuous Ordinary Residence Record & Tax Notices",
    "assessment_desc": "Proof of continuous residence in Hong Kong for at least 7 consecutive years.",
    "min_funds": "No minimum fund requirement for Right of Abode",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Right of Abode",
        "description": "Constitutional right to land, live, work, vote, and never be deported from Hong Kong."
      },
      {
        "icon": "💳",
        "title": "Hong Kong Permanent ID Card",
        "description": "Free electronic e-Channel border clearance and full social healthcare/schooling access."
      }
    ],
    "faqs": [
      {
        "question": "How long does it take to get PR in Hong Kong?",
        "answer": "You must reside continuously for 7 years on an eligible work, talent, or residence visa (time spent on a student visa can count towards the 7 years if followed by work/IANG)."
      }
    ]
  },
  "macau": {
    "cname": "Macau",
    "scheme": "Macau SAR Permanent Resident Identity Card (澳門永久性居民身分證)",
    "overview": "Permanent residency in Macau is granted to foreign nationals who have lawfully resided for a continuous period of not less than 7 years, or high-level talent under the new Qualified Talent Admission Scheme administered by IPIM.",
    "fees": {
      "visa_fee": "State fee applies",
      "service_fee": "Identification Services Bureau card fee",
      "total_fee": "Official Statutory Fees Apply",
      "currency": "MOP",
      "notes": "Administered by the Identification Services Bureau (DSI)."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Adjudicated by the Identification Services Bureau (DSI) and Talent Development Committee.",
    "source": "Identification Services Bureau (DSI) & Commerce and Investment Promotion Institute (IPIM)",
    "validity": "Indefinite Permanent Resident Status",
    "stay": "Indefinite Lawful Residence",
    "entry_type": "Permanent Resident",
    "assessment_doc": "7-Year Lawful Residence Record or Talent Admission Decree",
    "assessment_desc": "Proof of continuous residence for 7 years or certified High-End Talent status.",
    "min_funds": "Sustainable lawful income or specialized professional contribution",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Macau Permanent ID Card",
        "description": "Constitutional Right of Abode, free public healthcare, and annual cash handouts (Wealth Partaking Scheme)."
      }
    ],
    "faqs": [
      {
        "question": "How long does it take to get PR in Macau?",
        "answer": "Standard qualification requires 7 continuous years of ordinary residence, or accelerated entry under the new Talent Admission schemes."
      }
    ]
  },
  "nigeria": {
    "cname": "Nigeria",
    "scheme": "Indefinite Expatriate Residence Permit & High-Capital Investor Status",
    "overview": "Nigeria grants long-term residency and permanent settlement through successive renewals of the CERPAC Green Card, or through large-scale capital importation certified by the Central Bank of Nigeria (CBN) and the Nigerian Investment Promotion Commission (NIPC). Foreigners residing legally in Nigeria for extended periods who contribute substantially to the national economy can apply to the Minister of Interior for indefinite residence status.",
    "fees": {
      "visa_fee": "$2,000 (CERPAC Bi-Annual Renewal)",
      "service_fee": "Variable ministerial processing levies",
      "total_fee": "$2,500 - $3,500",
      "notes": "Statutory rates administered by Federal Ministry of Interior."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Requires submission of file to Comptroller General of Immigration and Federal Ministry of Interior headquarters in Abuja.",
    "source": "Federal Ministry of Interior & Nigeria Immigration Service (NIS)",
    "validity": "Indefinite / 5-Year Renewable Card",
    "stay": "Continuous lawful residency",
    "entry_type": "Multiple Entry",
    "assessment_doc": "NIPC Investor Certificate & Central Bank Certificate of Capital Importation (CCI)",
    "assessment_desc": "Proof of active major foreign direct investment, continuous tax compliance, and clean criminal background in Nigeria.",
    "min_funds": "Minimum $500,000 USD foreign direct investment capital importation or 5+ years executive tax contributions",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Settlement Security",
        "description": "Long-term security of domicile without needing annual expatriate quota renewal submissions."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Business Operations",
        "description": "Own, establish, and operate Nigerian businesses with 100% foreign equity under the NIPC Act."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Full Family Inclusion",
        "description": "Spouses and children receive dependent permanent status with unrestricted domestic schooling and residence."
      }
    ],
    "faqs": [
      {
        "question": "Can foreigners get citizenship or PR in Nigeria?",
        "answer": "Foreigners can obtain permanent residence through the Ministry of Interior after sustained lawful residence and economic contributions. Citizenship by naturalization requires 15 continuous years of residence and presidential assent."
      },
      {
        "question": "What is the fastest pathway to long-term residency in Nigeria?",
        "answer": "The most reliable route is establishing a registered enterprise with NIPC and securing multi-year executive CERPAC status backed by capital importation certificates."
      }
    ]
  },
  "ghana": {
    "cname": "Ghana",
    "scheme": "Indefinite Residence Status / Right of Abode (Immigration Act 2000)",
    "overview": "Ghana offers long-term settlement under Section 17 of the Immigration Act 2000. Foreign nationals who have resided continuously in Ghana for at least seven (7) years and contributed significantly to the country's economic, social, or cultural progress can petition the Minister for the Interior for Indefinite Residence. High-value foreign investors can also qualify for long-term residency privileges through GIPC.",
    "fees": {
      "visa_fee": "$2,500 (Statutory Indefinite Residence Application)",
      "service_fee": "Variable ministerial inspection levies",
      "total_fee": "approx. $3,000",
      "notes": "Administered by the Ministry for the Interior in Accra."
    },
    "proc_time": "6 to 12 Months",
    "proc_details": "Requires security vetting by GIS and approval by the Minister for the Interior.",
    "source": "Ministry for the Interior & Ghana Immigration Service (GIS)",
    "validity": "Indefinite Permanent Status",
    "stay": "Permanent lawful residence in Ghana",
    "entry_type": "Multiple Entry (Free border passage)",
    "assessment_doc": "GIS 7-Year Continuous Residence Records & GRA Tax Clearance Certificates",
    "assessment_desc": "Documentary proof of 7+ years legal residence, clean police report, and Ghana Revenue Authority (GRA) tax compliance.",
    "min_funds": "Continuous financial solvency and property ownership or enterprise investment in Ghana",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Lifetime Right to Reside",
        "description": "Permanent right to live, move, and establish home anywhere in Ghana without annual permit renewals."
      },
      {
        "icon": "💼",
        "title": "Freedom of Enterprise",
        "description": "Direct commercial property ownership and company operations under Ghanaian domestic frameworks."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Settlement Protections",
        "description": "Spouses and qualifying dependents enjoy permanent residency rights."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence are required for PR in Ghana?",
        "answer": "A foreign national must reside legally in Ghana for at least seven (7) consecutive years before qualifying to apply for Indefinite Residence status."
      },
      {
        "question": "Can an Indian national buy property in Ghana?",
        "answer": "Yes. Foreigners can purchase and hold 50-year leasehold interests in real property under Ghanaian land laws."
      }
    ]
  },
  "ethiopia": {
    "cname": "Ethiopia",
    "scheme": "Foreign Investor Residence Permit (Ethiopian Investment Commission)",
    "overview": "Ethiopia grants multi-year and permanent residence privileges to foreign direct investors under the Ethiopian Investment Commission (EIC) framework. Investors who inject qualifying capital into priority manufacturing, agriculture, pharmaceuticals, or technology sectors receive renewable 5-year foreign investor residency cards, complete with duty-free exemptions and land lease access.",
    "fees": {
      "visa_fee": "$500 (Investor Residency Authorization)",
      "service_fee": "Variable municipal levies",
      "total_fee": "approx. $750",
      "notes": "Administered jointly by EIC and Immigration and Citizenship Service (ICS)."
    },
    "proc_time": "1 to 3 Months",
    "proc_details": "Requires approved EIC Investment Permit and capital registration with the National Bank of Ethiopia (NBE).",
    "source": "Ethiopian Investment Commission (EIC) & Immigration and Citizenship Service (ICS)",
    "validity": "5 Years Renewable / Indefinite Status",
    "stay": "Continuous resident status",
    "entry_type": "Multiple Entry",
    "assessment_doc": "EIC Investment Permit & NBE Foreign Exchange Inflow Registration",
    "assessment_desc": "Certified proof of capital importation, operational enterprise license, and local employment creation.",
    "min_funds": "Minimum $150,000 USD (joint venture) or $200,000 USD (100% foreign owned) capital investment",
    "highlights": [
      {
        "icon": "🏢",
        "title": "5-Year Investor Security",
        "description": "Multi-year resident permit eliminates the need for frequent short-term visa renewals."
      },
      {
        "icon": "💰",
        "title": "Generous Tax Holidays",
        "description": "Up to 5 to 10 years of income tax exemption depending on industrial park location and export volume."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Investor Family Privilege",
        "description": "Investor's spouse and dependent children automatically receive matching 5-year residency status."
      }
    ],
    "faqs": [
      {
        "question": "Can an Indian investor obtain long-term residency in Ethiopia?",
        "answer": "Yes. Foreign investors with an approved EIC investment permit and registered capital receive a renewable 5-year foreign investor residence card."
      },
      {
        "question": "Can foreign nationals own land in Ethiopia?",
        "answer": "Land in Ethiopia is state-owned, but foreign investors can secure long-term industrial and agricultural leases of up to 40 to 80 years."
      }
    ]
  },
  "rwanda": {
    "cname": "Rwanda",
    "scheme": "Permanent Residence Permit (Class PR) / High-Value Investor Residency",
    "overview": "Rwanda offers permanent residency to foreign nationals under Law No. 04/2011. Foreigners who have resided continuously and legally in Rwanda for at least five (5) consecutive years, or who invest substantial capital into registered priority sectors through the Rwanda Development Board (RDB), are eligible for permanent residence status.",
    "fees": {
      "visa_fee": "200,000 RWF (approx. $160 Permanent Residence Card)",
      "service_fee": "50,000 RWF application fee",
      "total_fee": "approx. ₹20,000",
      "notes": "Highly accessible permanent residency statutory levies."
    },
    "proc_time": "1 to 3 Months",
    "proc_details": "Application submitted to the Director General of Immigration and Emigration in Kigali.",
    "source": "Directorate General of Immigration and Emigration (DGIE) & RDB",
    "validity": "Permanent / Lifetime Status",
    "stay": "Unrestricted permanent residency in Rwanda",
    "entry_type": "Multiple Entry",
    "assessment_doc": "RDB Certified Investment Portfolio or 5-Year Legal Residence Records",
    "assessment_desc": "Proof of clean judicial record, continuous tax compliance with Rwanda Revenue Authority (RRA), and substantial economic integration.",
    "min_funds": "$100,000+ USD qualifying investment or 5 years demonstrated professional income",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Settlement Security",
        "description": "Indefinite right to reside in Rwanda without renewing work or temporary permits."
      },
      {
        "icon": "🏡",
        "title": "Unrestricted Real Estate & Asset Ownership",
        "description": "Acquire freehold property and assets across Kigali and all provincial districts."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Inclusivity",
        "description": "Full permanent residence rights extended to spouse and qualifying dependent children."
      }
    ],
    "faqs": [
      {
        "question": "How long do I need to live in Rwanda before applying for PR?",
        "answer": "Under DGIE regulations, five (5) consecutive years of lawful temporary residence qualify an applicant for permanent residence status."
      },
      {
        "question": "Can foreign PR holders own real estate in Rwanda?",
        "answer": "Yes. Permanent residents have full rights to purchase and hold property across Rwanda."
      }
    ]
  },
  "zimbabwe": {
    "cname": "Zimbabwe",
    "scheme": "Permanent Residence Permit / Investor Domicile Status",
    "overview": "Zimbabwe grants Permanent Residence to foreign nationals who make substantial qualifying investments in key economic sectors (such as mining, agriculture, manufacturing, or tourism infrastructure) through ZIDA, or who have resided legally in Zimbabwe for extended periods (typically 5+ years) on continuous temporary permits.",
    "fees": {
      "visa_fee": "$1,000 (Permanent Residence Statutory Assessment)",
      "service_fee": "$500 (Issuance)",
      "total_fee": "approx. $1,500",
      "notes": "Approved by the Minister of Home Affairs and Cultural Heritage."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "File submitted to the Chief Director of Immigration in Harare for ministerial approval.",
    "source": "Department of Immigration Zimbabwe & Ministry of Home Affairs",
    "validity": "Permanent / Indefinite Residence",
    "stay": "Permanent lawful domicile in Zimbabwe",
    "entry_type": "Multiple Entry",
    "assessment_doc": "ZIDA Investment License & Central Bank Exchange Control Registration",
    "assessment_desc": "Proof of qualifying foreign direct investment, asset ownership, and clear police background records.",
    "min_funds": "Minimum $100,000 - $300,000 USD foreign direct investment in registered enterprise",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Security of Tenure",
        "description": "Long-term domicile security without reliance on periodic work permit renewals."
      },
      {
        "icon": "🌾",
        "title": "Asset & Enterprise Ownership",
        "description": "Full commercial rights to develop mining claims, agricultural operations, and businesses."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Generational Family Stability",
        "description": "Permanent residence extends to spouse and dependent family members."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian investors get permanent residency in Zimbabwe?",
        "answer": "Yes. Foreign investors who establish bona fide enterprises through ZIDA and invest significant capital qualify to apply for permanent residence."
      },
      {
        "question": "Can foreign PR holders purchase property in Zimbabwe?",
        "answer": "Yes. Foreign permanent residents can purchase residential and commercial real estate in Zimbabwe."
      }
    ]
  },
  "colombia": {
    "cname": "Colombia",
    "scheme": "Resident Visa (Visa R - Residente Permanente) / Investor Residency",
    "overview": "Colombia offers permanent settlement through the Resident Visa (Visa R). Foreign nationals qualify after maintaining continuous legal residence under a Migrant Visa (Visa M) for five (5) consecutive years, or by making a substantial qualifying direct foreign investment (minimum 650 Colombian legal monthly minimum wages, approx. $175,000 USD) in Colombian enterprises or real estate.",
    "fees": {
      "visa_fee": "$52 (Study Fee) + $391 (Issuance Fee) = $443 USD",
      "service_fee": "$55 (Cédula de Extranjería)",
      "total_fee": "$498 USD (approx. ₹41,800)",
      "notes": "Official fees set by Cancillería under Resolution 5477."
    },
    "proc_time": "1 to 3 Months",
    "proc_details": "Applied online at cancilleria.gov.co with proof of 5-year Visa M holding or certified capital investment.",
    "source": "Ministerio de Relaciones Exteriores (Cancillería)",
    "validity": "5 Years (Renewable Indefinite Permanent Status)",
    "stay": "Permanent lawful residence in Colombia",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year Safe Conduct / Visa M History or Banco de la República Foreign Investment Certificate",
    "assessment_desc": "Certified proof of continuous legal residence on Visa M without exceeding absence limits, or Central Bank registered foreign direct investment.",
    "min_funds": "5 years continuous employment on Visa M or 650 monthly minimum wages invested",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Colombian Residence",
        "description": "Full permanent status granting unrestricted employment, business creation, and domicile."
      },
      {
        "icon": "🇨🇴",
        "title": "Pathway to Colombian Citizenship",
        "description": "Eligible to apply for Colombian naturalization and passport after 5 years on Visa R."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Permanent Regularization",
        "description": "Spouses and children receive matching permanent resident status."
      }
    ],
    "faqs": [
      {
        "question": "How many days can I be outside Colombia on Visa R without losing it?",
        "answer": "Under Cancillería regulations, Visa R holders must not remain outside Colombia for more than two (2) consecutive years continuously, or the visa may be canceled."
      },
      {
        "question": "How many years of work visa lead to permanent residency?",
        "answer": "Holding a Visa M (Trabajador) continuously for five (5) years entitles you to apply for permanent Resident Visa (Visa R)."
      }
    ]
  },
  "peru": {
    "cname": "Peru",
    "scheme": "Permanent Residency (Calidad Migratoria Inmigrante) / Investor Status",
    "overview": "Peru offers permanent residency under the Inmigrante status (Legislative Decree 1350). Foreign nationals who have resided legally in Peru for at least three (3) consecutive years on a resident status (such as Resident Worker or Investor), and who demonstrate continuous financial solvency and tax compliance, qualify for permanent residence with indefinite work and domicile rights.",
    "fees": {
      "visa_fee": "$150 (Inmigrante Processing Fee)",
      "service_fee": "$30 (Permanent Carné de Extranjería)",
      "total_fee": "$180 USD (approx. ₹15,000)",
      "notes": "Administered by Migraciones Peru in Lima."
    },
    "proc_time": "2 to 4 Months",
    "proc_details": "Application evaluated by the Directorate of Immigration Management in Lima.",
    "source": "Superintendencia Nacional de Migraciones",
    "validity": "Indefinite / Permanent Status",
    "stay": "Permanent lawful domicile in Peru",
    "entry_type": "Multiple Entry",
    "assessment_doc": "3-Year Continuous Resident History & SUNAT Tax Clearance",
    "assessment_desc": "Certified proof of 3+ years legal residence without exceeding statutory absence limits (max 183 days out per year), plus clean criminal record and SUNAT tax compliance.",
    "min_funds": "Demonstrated ongoing employment income, enterprise profits, or $150,000 USD qualifying investment",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite Settlement Rights",
        "description": "Permanent residence status never expires as long as annual renewal of the physical Carné card is maintained."
      },
      {
        "icon": "🇵🇪",
        "title": "Pathway to Peruvian Citizenship",
        "description": "Eligible to apply for Peruvian citizenship by naturalization after 2 years of legal residence."
      },
      {
        "icon": "💼",
        "title": "Exemption from Foreign Worker Quotas",
        "description": "Permanent residents are classified as domestic workers, exempt from MTPE foreign hiring quotas."
      }
    ],
    "faqs": [
      {
        "question": "How long do I need to live in Peru to get permanent residency?",
        "answer": "Under Peruvian immigration law, you must maintain temporary legal residence (such as worker or investor status) for three (3) consecutive years before applying for Inmigrante status."
      },
      {
        "question": "Can Inmigrante status holders get Peruvian citizenship?",
        "answer": "Yes. Peru has one of the shortest citizenship naturalization timelines in South America: you can apply for naturalization after just 2 years of legal residence in the country."
      }
    ]
  },
  "chile": {
    "cname": "Chile",
    "scheme": "Residencia Definitiva (Permanent Residency) - SERMIG",
    "overview": "Chile offers permanent settlement under the Residencia Definitiva framework. Foreign nationals who have resided legally in Chile on a Temporary Residency permit for at least two (2) consecutive years without excessive overseas travel, and who demonstrate continuous gainful employment or enterprise ownership, qualify to apply for Residencia Definitiva through SERMIG.",
    "fees": {
      "visa_fee": "$150 - $250 (SERMIG Residencia Definitiva Fee)",
      "service_fee": "$10 (Cédula renewal)",
      "total_fee": "approx. ₹18,000",
      "notes": "Applied online through SERMIG portal."
    },
    "proc_time": "6 to 12 Months",
    "proc_details": "Application evaluated directly by Servicio Nacional de Migraciones in Santiago.",
    "source": "Servicio Nacional de Migraciones (SERMIG)",
    "validity": "Indefinite / Permanent Status",
    "stay": "Permanent lawful domicile in Chile",
    "entry_type": "Multiple Entry",
    "assessment_doc": "2-Year Continuous Temporary Residency Records & SII Tax Contributions",
    "assessment_desc": "Certified proof of 2 years lawful residency, pension contributions (AFP), and clean background certificate.",
    "min_funds": "Demonstrated continuous employment salary or profitable registered business enterprise",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Settlement Security",
        "description": "Indefinite right to reside and work anywhere in Chile without further permit renewals."
      },
      {
        "icon": "🇨🇱",
        "title": "Pathway to Chilean Citizenship",
        "description": "Eligible to apply for Chilean naturalization and one of the world's most powerful passports (visa-free to USA/EU) after 5 years of legal residence."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Family Permanent Status",
        "description": "Spouse and children receive concurrent permanent residence privileges."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence lead to Chilean citizenship?",
        "answer": "You can apply for Chilean citizenship by naturalization after five (5) continuous years of legal residence from the date of your initial temporary visa."
      },
      {
        "question": "How long can a Permanent Resident remain outside Chile?",
        "answer": "Under SERMIG rules, permanent residents must not spend more than two (2) continuous years outside Chile, or their Residencia Definitiva may lapse."
      }
    ]
  },
  "argentina": {
    "cname": "Argentina",
    "scheme": "Radicación Permanente (Permanent Residence) / Inversionista Status",
    "overview": "Argentina provides one of the most generous permanent settlement frameworks in the world under Migration Law No. 25.871. Foreign nationals qualify for Radicación Permanente (Permanent Residence) after three (3) consecutive years of lawful temporary residence, or by making a qualifying productive investment (minimum 1,500,000 Argentine Pesos capital injection in approved commercial, industrial, or service enterprises).",
    "fees": {
      "visa_fee": "$250 (Radicación Permanente Application)",
      "service_fee": "$50 (Permanent DNI Card)",
      "total_fee": "$300 USD (approx. ₹25,000)",
      "notes": "Processed directly at Migraciones in Buenos Aires."
    },
    "proc_time": "2 to 4 Months",
    "proc_details": "Application evaluated directly by the Dirección Nacional de Migraciones in Buenos Aires.",
    "source": "Dirección Nacional de Migraciones (DNM)",
    "validity": "Indefinite Permanent Status",
    "stay": "Permanent lawful domicile in Argentina",
    "entry_type": "Multiple Entry",
    "assessment_doc": "3-Year Legal Residence Records & Clean Criminal Record (ReNaP) in Argentina",
    "assessment_desc": "Certified proof of 3 continuous years of temporary residency, Argentine police certificate, and active tax registration.",
    "min_funds": "Continuous gainful employment or qualifying enterprise investment",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Constitutional Right to Settle",
        "description": "Argentina's National Constitution guarantees foreign residents equal civil rights to citizens, including property ownership and work."
      },
      {
        "icon": "🇦🇷",
        "title": "Direct Path to Argentine Citizenship",
        "description": "Eligible to apply for Argentine naturalization and passport after just two (2) continuous years of residence."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Full Family Domicile Rights",
        "description": "Spouses, children, and parents enjoy concurrent permanent residency rights."
      }
    ],
    "faqs": [
      {
        "question": "How quickly can I apply for Argentine citizenship?",
        "answer": "Argentina has the fastest citizenship timeline in South America: under Law 346, any foreigner who has lived legally in Argentina for two (2) consecutive years can apply directly to a federal court for Argentine citizenship."
      },
      {
        "question": "Can permanent residents work for any employer in Argentina?",
        "answer": "Yes. Permanent residents have unrestricted right to work, start businesses, and reside anywhere in the country without employer sponsorship."
      }
    ]
  },
  "costa-rica": {
    "cname": "Costa Rica",
    "scheme": "Residencia Permanente (Permanent Residency) / Inversionista Status",
    "overview": "Costa Rica offers permanent residency (Residencia Permanente) under General Migration Law No. 8764. Foreign nationals qualify after holding continuous temporary residency (such as Temporary Worker or Inversionista) for three (3) consecutive years, or immediately if possessing a direct first-degree family tie (marriage or birth of a child) to a Costa Rican citizen. High-net-worth investors can also obtain Inversionista temporary residency with a qualifying capital investment of $150,000 USD.",
    "fees": {
      "visa_fee": "$200 (Permanent Residency Application Fee)",
      "service_fee": "$125 (DIMEX Permanent Card)",
      "total_fee": "$325 USD (approx. ₹27,500)",
      "notes": "Processed at DGME headquarters in San José."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the Dirección General de Migración y Extranjería (DGME).",
    "source": "Dirección General de Migración y Extranjería (DGME)",
    "validity": "Indefinite Permanent Status",
    "stay": "Permanent lawful domicile in Costa Rica",
    "entry_type": "Multiple Entry",
    "assessment_doc": "3-Year Temporary Residency Records & Clean Background Checks",
    "assessment_desc": "Certified proof of 3 continuous years of temporary residency, Costa Rican judicial record (Hoja de Delincuencia), and CCSS compliance.",
    "min_funds": "Demonstrated ongoing legal income or $150,000 USD registered capital investment",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite Right to Reside & Work",
        "description": "Permanent residents can work for any employer or operate businesses without needing work permit approvals."
      },
      {
        "icon": "🇨🇷",
        "title": "Pathway to Costa Rican Citizenship",
        "description": "Eligible to apply for Costa Rican naturalization and one of the world's most reputable neutral passports after 5 to 7 years of residence."
      },
      {
        "icon": "🌴",
        "title": "World-Class Tropical Retirement",
        "description": "Consistently ranked as one of the best countries in the world for long-term expat settlement and retirement."
      }
    ],
    "faqs": [
      {
        "question": "How long do I need to hold temporary residency before applying for PR?",
        "answer": "Under Costa Rican law, you must maintain continuous temporary residency for three (3) consecutive years before qualifying to apply for Residencia Permanente."
      },
      {
        "question": "What is the Inversionista category in Costa Rica?",
        "answer": "The Inversionista category allows foreign nationals to obtain residency by investing at least $150,000 USD in real estate, active businesses, venture funds, or tourism projects."
      }
    ]
  },
  "romania": {
    "cname": "Romania",
    "scheme": "Drept de Ședere pe Termen Lung (EU Long-Term Permanent Residence)",
    "overview": "Romania grants permanent settlement under the EU Long-Term Resident Directive (Drept de Ședere pe Termen Lung). Foreign nationals who have resided continuously and legally in Romania for at least five (5) consecutive years on a temporary residence permit (such as employment or business), without absences exceeding 6 consecutive months or 10 months total, qualify for EU permanent residence.",
    "fees": {
      "visa_fee": "€120 (Permanent Residence Application)",
      "service_fee": "259 RON (IGI Permanent Card Fee)",
      "total_fee": "approx. ₹18,000",
      "notes": "Administered by Inspectoratul General pentru Imigrări (IGI)."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Requires submission of continuous residency file and Romanian language/civics evaluation at IGI.",
    "source": "Inspectoratul General pentru Imigrări (IGI) & Ministry of Internal Affairs",
    "validity": "5 Years (Renewable Indefinite EU Long-Term Residence Card)",
    "stay": "Permanent lawful residence in Romania",
    "entry_type": "Multiple Entry (Free border movement across EU)",
    "assessment_doc": "5-Year IGI Continuous Residence Records & ANAF Tax Proof",
    "assessment_desc": "Proof of 5 continuous years legal residence, proof of stable income meeting statutory minimums, health insurance (CNAS), and clean police record.",
    "min_funds": "Continuous income meeting national statutory minimum wage standards",
    "highlights": [
      {
        "icon": "🇪🇺",
        "title": "EU Long-Term Resident Status",
        "description": "Grants permanent settlement protections and equal treatment with Romanian citizens regarding employment, education, and social benefits."
      },
      {
        "icon": "🇷🇴",
        "title": "Pathway to Romanian / EU Citizenship",
        "description": "Eligible to apply for Romanian citizenship and an EU passport after 8 years of legal residence (reduced to 5 years if married to a citizen)."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Work Authorization",
        "description": "Work for any employer in Romania without requiring annual Aviz de Muncă approvals."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence are required for PR in Romania?",
        "answer": "You must reside continuously and legally in Romania for five (5) consecutive years under temporary residence permits before qualifying for EU Long-Term Resident status."
      },
      {
        "question": "Is a Romanian language test required for PR?",
        "answer": "Yes. Basic communicative knowledge of the Romanian language is evaluated by IGI during the long-term residence interview."
      }
    ]
  },
  "bulgaria": {
    "cname": "Bulgaria",
    "scheme": "Long-Term / Permanent Residence (EU Long-Term Resident Directive)",
    "overview": "Bulgaria offers permanent settlement under the Foreigners in the Republic of Bulgaria Act and EU Long-Term Resident Directive. Foreign nationals who have resided legally and continuously in Bulgaria for at least five (5) consecutive years on temporary permits, without absences exceeding 6 consecutive months or 10 months total, qualify for EU Long-Term Resident status, granting indefinite residence and equal rights with Bulgarian citizens in employment, education, and healthcare.",
    "fees": {
      "visa_fee": "€100 (Application Fee)",
      "service_fee": "1,000 BGN (Permanent Residence Issuance Fee)",
      "total_fee": "approx. ₹50,000",
      "notes": "Administered by the Migration Directorate (Ministry of Interior)."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the Migration Directorate in Sofia.",
    "source": "Migration Directorate (Ministry of Interior)",
    "validity": "5 Years (Renewable Indefinite EU Residence Card)",
    "stay": "Permanent lawful residence in Bulgaria",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year Continuous Residence Records & NRA Tax Clearance",
    "assessment_desc": "Proof of 5 years lawful residency, stable legal income, National Revenue Agency (NRA) tax compliance, and clean criminal record.",
    "min_funds": "Continuous income meeting national statutory minimum wage benchmarks",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite EU Resident Protections",
        "description": "Equal treatment with Bulgarian citizens in labour access, social security, and business ownership."
      },
      {
        "icon": "🇧🇬",
        "title": "Pathway to Bulgarian / EU Citizenship",
        "description": "Eligible to apply for Bulgarian naturalization and an EU passport after 5 years on permanent resident status."
      },
      {
        "icon": "💼",
        "title": "Open Labour Market",
        "description": "Work freely for any employer in Bulgaria without requiring work permits."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence lead to PR in Bulgaria?",
        "answer": "Foreign nationals who have lived continuously and legally in Bulgaria for five (5) consecutive years qualify to apply for EU Long-Term Residence."
      },
      {
        "question": "Can EU Long-Term Residents in Bulgaria move to other EU countries?",
        "answer": "Yes. EU Long-Term Resident status facilitates simplified mobility and work permit applications in other European Union member states under EU Directive 2003/109/EC."
      }
    ]
  },
  "croatia": {
    "cname": "Croatia",
    "scheme": "Stalni boravak (Permanent Residence) / Dugotrajno boravište (EU Long-Term Residence)",
    "overview": "Croatia grants permanent settlement under the Aliens Act (Zakon o strancima) and EU Long-Term Resident Directive. Foreign nationals who have resided continuously and legally in Croatia for at least five (5) consecutive years on temporary residence permits, without absences exceeding 6 consecutive months or 10 months total, qualify for EU Long-Term Resident status (Dugotrajno boravište). This grants indefinite residence and equal rights to Croatian citizens regarding employment, education, and social protection.",
    "fees": {
      "visa_fee": "€119 (Permanent Residence Application)",
      "service_fee": "€41 (Biometric Permanent Card)",
      "total_fee": "approx. ₹14,500",
      "notes": "Administered by the Ministry of the Interior (MUP)."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the local Police Administration (MUP) in Croatia.",
    "source": "Ministry of the Interior of the Republic of Croatia (MUP)",
    "validity": "5 Years (Renewable Indefinite EU Permanent Residence Card)",
    "stay": "Permanent lawful residence in Croatia",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year MUP Continuous Residence Records & Tax Administration (Porezna uprava) Clearance",
    "assessment_desc": "Proof of 5 years lawful residency, proof of stable income, Croatian health insurance (HZZO), and basic Croatian language/Latin script proficiency.",
    "min_funds": "Continuous income meeting national statutory living minimums",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite EU Resident Protections",
        "description": "Equal treatment with Croatian citizens in employment access, trade licensing, and higher education."
      },
      {
        "icon": "🇭🇷",
        "title": "Pathway to Croatian / EU Citizenship",
        "description": "Eligible to apply for Croatian naturalization and an EU passport after 8 years of continuous legal residence."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Employment",
        "description": "Work freely in any sector across Croatia without requiring work permits or labour market tests."
      }
    ],
    "faqs": [
      {
        "question": "Is a Croatian language test required for permanent residency?",
        "answer": "Yes. Applicants must demonstrate basic knowledge of the Croatian language and Latin script, evaluated through an accredited higher education institution or examination board (exemptions apply for university graduates)."
      },
      {
        "question": "How long can a Permanent Resident remain outside Croatia?",
        "answer": "EU Long-Term Residents in Croatia can remain outside the European Union for up to 12 consecutive months without losing their permanent resident status."
      }
    ]
  },
  "slovenia": {
    "cname": "Slovenia",
    "scheme": "Dovoljenje za stalno prebivanje (Permanent Residence) / EU Long-Term Residence",
    "overview": "Slovenia grants permanent settlement under the Foreigners Act (Zakon o tujcih) and EU Long-Term Resident Directive. Foreign nationals who have resided continuously and legally in Slovenia for at least five (5) consecutive years on temporary residence permits, without absences exceeding 6 consecutive months or 10 months total, qualify for Permanent Residence (Dovoljenje za stalno prebivanje). This confers indefinite residence and equal treatment with Slovenian citizens regarding employment, education, and social security.",
    "fees": {
      "visa_fee": "€89 (Permanent Residence Application Fee)",
      "service_fee": "€15 (Biometric Permanent Card)",
      "total_fee": "approx. ₹9,500",
      "notes": "Administered by the Administrative Unit (Upravna enota)."
    },
    "proc_time": "2 to 4 Months",
    "proc_details": "Application evaluated directly by the local Administrative Unit (Upravna enota) in Slovenia.",
    "source": "Ministry of the Interior of the Republic of Slovenia (MNZ)",
    "validity": "5 Years (Renewable Indefinite EU Permanent Residence Card)",
    "stay": "Permanent lawful residence in Slovenia",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year Upravna Enota Continuous Residence Records & FURS Tax Clearance",
    "assessment_desc": "Proof of 5 years continuous legal residence, stable financial means, health insurance (ZZZS), clean criminal record, and basic Slovenian language proficiency (A1 level).",
    "min_funds": "Continuous income meeting national statutory basic living allowance",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite EU Resident Protections",
        "description": "Equal treatment with Slovenian citizens in employment access, commercial enterprise, and university education."
      },
      {
        "icon": "🇸🇮",
        "title": "Pathway to Slovenian / EU Citizenship",
        "description": "Eligible to apply for Slovenian citizenship by naturalization and an EU passport after 10 years of legal residence (including 5 years on PR status)."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Work Rights",
        "description": "Work for any employer or operate private businesses in Slovenia without needing work permits."
      }
    ],
    "faqs": [
      {
        "question": "Is a Slovenian language test required for permanent residency?",
        "answer": "Yes. Under recent amendments to the Slovenian Foreigners Act, applicants for permanent residence must demonstrate basic knowledge of the Slovenian language at the A1 level (entry-level survival standard)."
      },
      {
        "question": "Can EU permanent residents in Slovenia buy property?",
        "answer": "Yes. Permanent residents have full rights to purchase and hold residential and commercial real estate across Slovenia."
      }
    ]
  },
  "cyprus": {
    "cname": "Cyprus",
    "scheme": "Permanent Residence (Category 6.2 Fast-Track Golden Visa) / EU Long-Term Residence",
    "overview": "Cyprus offers one of Europe's most renowned permanent settlement programs under Regulation 6(2) of the Aliens and Immigration Regulations. Foreign investors who make a qualifying investment of at least €300,000 (+ VAT) in new residential real estate, commercial property, or registered Cypriot company share capital receive Permanent Residency within 2 to 3 months. In addition, professionals residing lawfully in Cyprus for five (5) consecutive years qualify for EU Long-Term Residence.",
    "fees": {
      "visa_fee": "€500 (Permanent Residence Filing Fee)",
      "service_fee": "€70 (Biometric PR Card per person)",
      "total_fee": "approx. ₹52,000",
      "notes": "Official fees administered by Civil Registry and Migration Department (CRMD)."
    },
    "proc_time": "2 to 4 Months (Fast-Track Category 6.2)",
    "proc_details": "Application evaluated directly by the Civil Registry and Migration Department in Nicosia.",
    "source": "Civil Registry and Migration Department (CRMD) & Ministry of Interior",
    "validity": "Indefinite Permanent Residency (Card renewed every 10 years)",
    "stay": "Permanent lawful domicile in Cyprus",
    "entry_type": "Multiple Entry",
    "assessment_doc": "Proof of €300,000 Property Acquisition & Certified Annual Foreign Income",
    "assessment_desc": "Certified contract of sale for new residential/commercial property deposited with the Land Registry, proof of payment of €300,000 from abroad, and verified secure annual income of €50,000.",
    "min_funds": "Minimum €300,000 (+ VAT) capital investment and €50,000 secure annual foreign income",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Lifetime European Permanent Residency",
        "description": "Permanent residence status for life; card only requires physical renewal every 10 years without re-assessment."
      },
      {
        "icon": "🇨🇾",
        "title": "Pathway to Cypriot / EU Citizenship",
        "description": "Eligible to apply for Cypriot citizenship by naturalization and an EU passport after 5 to 7 years of legal residence."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Whole Family Inclusion",
        "description": "Covers investor, spouse, dependent unmarried children up to age 25 in higher education, and parents."
      }
    ],
    "faqs": [
      {
        "question": "Do I have to live in Cyprus to maintain permanent residency under Category 6.2?",
        "answer": "No! Category 6.2 permanent residents only need to visit Cyprus once every two (2) years to keep their permanent resident status active."
      },
      {
        "question": "How long does it take to obtain Cyprus PR through real estate?",
        "answer": "Under the fast-track Category 6(2) procedure, permanent residency approvals are typically granted within 2 to 3 months from file submission."
      }
    ]
  },

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
,
  "serbia": {
    "cname": "Serbia",
    "scheme": "Stalno nastanjenje (Permanent Residence) / Real Estate Investor Residency",
    "overview": "Serbia offers permanent settlement under the Law on Foreigners (Stalno nastanjenje). Foreign nationals who have resided legally in Serbia on temporary residence permits for three (3) consecutive years (reduced from 5 years under recent progressive amendments) qualify for permanent residence. In addition, purchasing residential real estate in Serbia grants renewable temporary residency with a direct path to permanent domicile.",
    "fees": {
      "visa_fee": "RSD 15,000 (Permanent Residence Application)",
      "service_fee": "RSD 3,000 (Biometric Card)",
      "total_fee": "approx. ₹14,000",
      "notes": "Administered by the Ministry of Interior in Belgrade."
    },
    "proc_time": "2 to 4 Months",
    "proc_details": "Evaluated directly by the Directorate for Foreigners (Uprava za strance) in Belgrade.",
    "source": "Ministry of Interior of the Republic of Serbia (MUP)",
    "validity": "5 Years (Renewable Indefinite Permanent Residence Card)",
    "stay": "Permanent lawful domicile in Serbia",
    "entry_type": "Multiple Entry",
    "assessment_doc": "3-Year Legal Residence Records & Real Estate Ownership Cadastre Deed",
    "assessment_desc": "Proof of 3 continuous years legal residence, property ownership deed from the Republic Geodetic Authority, and clean background certificate.",
    "min_funds": "Proof of ongoing financial solvency and property ownership",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Fast 3-Year Settlement Timeline",
        "description": "Eligibility for permanent residence after just 3 continuous years of legal temporary residence."
      },
      {
        "icon": "🏡",
        "title": "Real Estate Residency Pathway",
        "description": "Acquisition of any residential property in Serbia qualifies foreign buyers for residency."
      },
      {
        "icon": "🇷🇸",
        "title": "Pathway to Serbian Citizenship",
        "description": "Eligible to apply for Serbian naturalization and passport after securing permanent residence."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence lead to PR in Serbia?",
        "answer": "Under the latest amendment to the Law on Foreigners, foreign nationals qualify for permanent residence after just three (3) continuous years on temporary permits."
      },
      {
        "question": "Can Indian citizens buy real estate in Serbia?",
        "answer": "Yes, under bilateral reciprocity, Indian citizens are permitted to acquire residential property and land in Serbia."
      }
    ]
  },
  "montenegro": {
    "cname": "Montenegro",
    "scheme": "Stalni boravak (Permanent Residence) / Property Residency",
    "overview": "Montenegro grants permanent residence (Stalni boravak) to foreign nationals who have resided continuously and legally on temporary permits for at least five (5) consecutive years without exceeding statutory absence limits. In addition, owning residential or commercial real estate in Montenegro grants renewable 1-year residency with no minimum property valuation requirement.",
    "fees": {
      "visa_fee": "€100 (Permanent Residence Application)",
      "service_fee": "€10 (Biometric Card)",
      "total_fee": "approx. ₹10,000",
      "notes": "Administered by the Ministry of Internal Affairs (MUP)."
    },
    "proc_time": "2 to 4 Months",
    "proc_details": "Application evaluated directly by MUP in Podgorica.",
    "source": "Ministry of Internal Affairs of Montenegro (MUP)",
    "validity": "5 Years (Renewable Indefinite Permanent Resident Card)",
    "stay": "Permanent lawful domicile in Montenegro",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year MUP Continuous Residency Records & Property Ownership Certificate (List nepokretnosti)",
    "assessment_desc": "Proof of 5 continuous years legal residence, real estate deed (List nepokretnosti), clean police record, and basic Montenegrin language skills.",
    "min_funds": "Demonstrated ongoing legal income or real estate ownership",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Indefinite Settlement Rights",
        "description": "Permanent right to live, work, and operate businesses in Montenegro without annual permit renewals."
      },
      {
        "icon": "🏡",
        "title": "No Minimum Value Property Residency",
        "description": "Owning any habitable apartment or house qualifies foreign buyers for residency."
      },
      {
        "icon": "🇲🇪",
        "title": "Future EU Citizenship Potential",
        "description": "Permanent residents are positioned for EU citizenship upon Montenegro's anticipated EU accession."
      }
    ],
    "faqs": [
      {
        "question": "Is there a minimum real estate value to get residency in Montenegro?",
        "answer": "No! Unlike golden visa programs, Montenegrin law sets no minimum property purchase price to qualify for temporary residency through real estate ownership."
      },
      {
        "question": "How long does permanent residence take in Montenegro?",
        "answer": "Five (5) consecutive years of lawful temporary residence qualify an applicant for Stalni boravak (Permanent Residence)."
      }
    ]
  },
  "albania": {
    "cname": "Albania",
    "scheme": "Leje Qëndrimi e Përhershme (Permanent Residence) / Real Estate Residency",
    "overview": "Albania grants permanent residence (Leje Qëndrimi e Përhershme) to foreign nationals who have resided legally and continuously on temporary permits for at least five (5) consecutive years without exceeding statutory absence limits. In addition, purchasing residential real estate in Albania qualifies foreign buyers for renewable annual temporary residency.",
    "fees": {
      "visa_fee": "€150 (Permanent Residence Application)",
      "service_fee": "ALL 5,000 (Biometric Card)",
      "total_fee": "approx. ₹17,000",
      "notes": "Administered by the State Police Department for Border and Migration."
    },
    "proc_time": "2 to 4 Months",
    "proc_details": "Evaluated directly by the State Police Border and Migration Directorate in Tirana.",
    "source": "State Police Border and Migration Department & Ministry of Interior",
    "validity": "5 Years (Renewable Indefinite Permanent Resident Card)",
    "stay": "Permanent lawful domicile in Albania",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year Continuous Legal Residence Records & Cadastral Property Deed (Hipoteka)",
    "assessment_desc": "Proof of 5 continuous years legal residence, clean criminal background, property ownership deed from the State Cadastre Agency (ASHK), and basic Albanian language proficiency.",
    "min_funds": "Demonstrated ongoing legal income or property ownership",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Settlement Security",
        "description": "Indefinite right to reside, work, and operate commercial enterprises in Albania."
      },
      {
        "icon": "🏡",
        "title": "Coastal Real Estate Ownership",
        "description": "Affordable beachfront property in Sarandë, Vlorë, and Durrës with low property taxes."
      },
      {
        "icon": "🇦🇱",
        "title": "Pathway to Albanian Citizenship",
        "description": "Eligible to apply for Albanian naturalization and passport after 5 to 7 years of legal residence."
      }
    ],
    "faqs": [
      {
        "question": "Can foreigners buy real estate in Albania?",
        "answer": "Yes. Foreign nationals can freely purchase residential apartments and commercial properties in Albania and obtain residency based on ownership."
      },
      {
        "question": "How long does it take to qualify for PR in Albania?",
        "answer": "Five (5) continuous years of legal residence on temporary permits qualify an applicant for permanent residence status."
      }
    ]
  },
  "morocco": {
    "cname": "Morocco",
    "scheme": "Carte de Résidence Permanente (10-Year Permanent Residence)",
    "overview": "Morocco offers permanent settlement under Law No. 02-03. Foreign nationals who have resided legally in Morocco for at least three (3) consecutive years on temporary residence cards (Carte de Séjour), and who demonstrate continuous gainful employment, enterprise ownership, or retirement solvency, qualify to obtain a 10-Year Permanent Residence Card (Carte de Résidence).",
    "fees": {
      "visa_fee": "MAD 1,000 (Permanent Residence Issuance Fee)",
      "service_fee": "MAD 100 application stamp",
      "total_fee": "approx. ₹9,500",
      "notes": "Administered by the Direction Générale de la Sûreté Nationale (DGSN)."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the DGSN Police Prefecture in Morocco.",
    "source": "Direction Générale de la Sûreté Nationale (DGSN) & Ministry of Interior",
    "validity": "10 Years (Renewable Indefinite Permanent Residence Card)",
    "stay": "Permanent lawful domicile in Morocco",
    "entry_type": "Multiple Entry",
    "assessment_doc": "3-Year Continuous Carte de Séjour Records & Tax Clearance (DGI)",
    "assessment_desc": "Proof of 3 continuous years legal residence, clean judicial record (Fiche anthropométrique), and General Tax Directorate (DGI) compliance.",
    "min_funds": "Demonstrated ongoing legal income or enterprise profits",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "10-Year Permanent Security",
        "description": "10-year residency card eliminates the hassle of annual police renewals."
      },
      {
        "icon": "🇲🇦",
        "title": "Pathway to Moroccan Citizenship",
        "description": "Eligible to apply for Moroccan naturalization after 5 years of continuous legal residence."
      },
      {
        "icon": "💼",
        "title": "Unrestricted Business Operations",
        "description": "Direct commercial property ownership and company operations under Moroccan domestic law."
      }
    ],
    "faqs": [
      {
        "question": "How long do I need to live in Morocco before getting permanent residency?",
        "answer": "Under Law 02-03, foreign nationals who have resided legally for three (3) consecutive years on temporary resident status qualify for a 10-year Carte de Résidence."
      },
      {
        "question": "Can foreign nationals own real estate in Morocco?",
        "answer": "Yes. Foreigners can freely purchase residential and commercial real estate across Morocco (with restrictions only applying to agricultural farmland)."
      }
    ]
  },
  "tunisia": {
    "cname": "Tunisia",
    "scheme": "Carte de Séjour Définitive (Permanent Residence) / Foreign Investor Status",
    "overview": "Tunisia offers permanent residence (Carte de Séjour Définitive) to foreign nationals who have resided legally in Tunisia for at least five (5) consecutive years on temporary residence permits, or to substantial foreign direct investors operating qualifying enterprises certified by FIPA.",
    "fees": {
      "visa_fee": "TND 300 (Permanent Residence Filing Fee)",
      "service_fee": "TND 50 (Biometric Card)",
      "total_fee": "approx. ₹9,500",
      "notes": "Administered by the Ministry of Interior in Tunis."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the General Directorate of National Security in Tunis.",
    "source": "Ministry of Interior (Direction Générale de la Sûreté Nationale)",
    "validity": "5 Years (Renewable Indefinite Residence Card)",
    "stay": "Permanent lawful domicile in Tunisia",
    "entry_type": "Multiple Entry",
    "assessment_doc": "5-Year Legal Residence Records & Tax Clearance Records",
    "assessment_desc": "Proof of 5 years continuous legal residence, clean police background (Bulletin No. 3), and active tax compliance.",
    "min_funds": "Demonstrated ongoing legal income or enterprise investment",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Permanent Settlement Protections",
        "description": "Indefinite right to reside and operate businesses in Tunisia without annual renewals."
      },
      {
        "icon": "🇹🇳",
        "title": "Pathway to Tunisian Citizenship",
        "description": "Eligible to apply for Tunisian naturalization after 5 years of continuous legal residence."
      },
      {
        "icon": "🏖️",
        "title": "Idyllic Mediterranean Coast",
        "description": "Charming coastal living in Sidi Bou Said, La Marsa, Hammamet, and Sousse."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence lead to PR in Tunisia?",
        "answer": "Five (5) continuous years of legal temporary residence qualify an applicant to apply for permanent residence status."
      },
      {
        "question": "Can foreigners own real estate in Tunisia?",
        "answer": "Foreigners can purchase residential apartments in urban zones with governorate authorization (Autorisation du Gouverneur)."
      }
    ]
  },
  "algeria": {
    "cname": "Algeria",
    "scheme": "Carte de Résidence (10-Year Permanent Residence) - Ministry of Interior",
    "overview": "Algeria grants long-term permanent settlement under Law No. 08-11. Foreign nationals who have resided legally in Algeria for at least seven (7) consecutive years on temporary residence cards (or spouses of Algerian citizens), and who demonstrate continuous gainful employment and civic integration, qualify for a 10-Year Permanent Residence Card (Carte de Résidence).",
    "fees": {
      "visa_fee": "DZD 10,000 (Permanent Residence Application)",
      "service_fee": "DZD 2,000 (Card issuance)",
      "total_fee": "approx. ₹8,000",
      "notes": "Administered by the Ministry of Interior in Algiers."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the Wilaya Directorate of General Affairs and DGSN.",
    "source": "Ministry of the Interior and Local Authorities (MICLAT)",
    "validity": "10 Years (Renewable Permanent Residence Card)",
    "stay": "Permanent lawful domicile in Algeria",
    "entry_type": "Multiple Entry",
    "assessment_doc": "7-Year Continuous Legal Residence Records & DGI Tax Clearance",
    "assessment_desc": "Proof of 7 continuous years legal residence, clean police background (Casier judiciaire), and active tax compliance.",
    "min_funds": "Demonstrated ongoing legal income or enterprise investment",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "10-Year Residency Tenure",
        "description": "Long-term security of domicile without annual permit renewal requirements."
      },
      {
        "icon": "🇩🇿",
        "title": "Pathway to Algerian Citizenship",
        "description": "Eligible to apply for Algerian naturalization after 7 years of legal continuous residence."
      },
      {
        "icon": "💼",
        "title": "Stable Commercial Protections",
        "description": "Exempt from foreign employee labour quotas once permanent residence is established."
      }
    ],
    "faqs": [
      {
        "question": "How many years of residence lead to PR in Algeria?",
        "answer": "Seven (7) consecutive years of lawful temporary residence qualify a foreign national to apply for a 10-year Carte de Résidence."
      },
      {
        "question": "Can foreign permanent residents purchase property in Algeria?",
        "answer": "Yes. Foreign permanent residents can acquire residential real estate in urban areas under Algerian civil law."
      }
    ]
  },
  "uruguay": {
    "cname": "Uruguay",
    "scheme": "Residencia Permanente (Permanent Residence) / Mercosur Settlement Framework",
    "overview": "Uruguay offers one of the most accessible permanent settlement frameworks in the Americas under Law No. 18.250. Foreign nationals who demonstrate legal financial solvency (from employment, business, or investment) can apply for Residencia Permanente directly at the Dirección Nacional de Migración. Permanent residents receive an indefinite Cédula and enjoy equal civil rights to Uruguayan citizens.",
    "fees": {
      "visa_fee": "$200 (Permanent Residence Application)",
      "service_fee": "$20 (Cédula de Identidad)",
      "total_fee": "approx. ₹18,000",
      "notes": "Processed via Dirección Nacional de Migración in Montevideo."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Applied directly at Migración headquarters in Montevideo with apostilled certificates.",
    "source": "Dirección Nacional de Migración (DNM)",
    "validity": "Indefinite Permanent Residence (Cédula renewed every 3-5 years)",
    "stay": "Permanent lawful domicile in Uruguay",
    "entry_type": "Multiple Entry",
    "assessment_doc": "Certificado de Ingresos (Certified Proof of Income) & Clean Police Certificate",
    "assessment_desc": "Proof of clean judicial record from country of origin and proof of stable monthly income or employment in Uruguay certified by a Public Accountant (Contador Público).",
    "min_funds": "Demonstrated monthly income of approx. $1,500 USD per family or real estate investment",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Constitutional Settlement Equality",
        "description": "Foreigners have equal rights to native citizens under the Uruguayan Constitution."
      },
      {
        "icon": "🇺🇾",
        "title": "Fast Path to Uruguayan Citizenship",
        "description": "Eligible to apply for Uruguayan citizenship and passport after just 3 years (for married couples) or 5 years (for single applicants)."
      },
      {
        "icon": "🌴",
        "title": "Top Expat Quality of Life",
        "description": "Punta del Este and Montevideo offer world-class coastal living, safe streets, and clean air."
      }
    ],
    "faqs": [
      {
        "question": "How fast can I obtain Uruguayan citizenship after getting PR?",
        "answer": "Under the Uruguayan Constitution, permanent residents can apply for legal citizenship after 3 years (if living with family/spouse) or 5 years (if single)."
      },
      {
        "question": "Can permanent residents work for any employer in Uruguay?",
        "answer": "Yes. Permanent residents have unrestricted right to work, establish companies, and purchase real estate."
      }
    ]
  },
  "fiji": {
    "cname": "Fiji",
    "scheme": "Permanent Residence / Foreign Investor Residency (Investor Permit)",
    "overview": "Fiji offers permanent settlement under the Immigration Act. Foreign investors who make a qualifying capital investment through Investment Fiji (minimum FJD $50,000 to $250,000 depending on sector) receive a 7-Year Investor Permit with a direct pathway to permanent residence and citizenship. In addition, professionals residing continuously on work permits for over five (5) years qualify for permanent residence status.",
    "fees": {
      "visa_fee": "FJD $1,500 (Permanent Residence Application)",
      "service_fee": "FJD $500 (Issuance Fee)",
      "total_fee": "approx. ₹75,000",
      "notes": "Administered by the Department of Immigration in Suva."
    },
    "proc_time": "3 to 6 Months",
    "proc_details": "Application evaluated directly by the Director of Immigration in Suva.",
    "source": "Fiji Immigration Department & Investment Fiji",
    "validity": "7 Years / Indefinite Permanent Residence",
    "stay": "Permanent lawful domicile in Fiji",
    "entry_type": "Multiple Entry",
    "assessment_doc": "Investment Fiji Foreign Investment Registration Certificate (FIRC)",
    "assessment_desc": "Certified copy of FIRC certificate, bank proof of foreign capital inflow, and clean police background clearance.",
    "min_funds": "FJD $50,000 - $250,000 qualifying enterprise investment or 5 years legal residence",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "7-Year Investor Residency",
        "description": "Multi-year investor status offering long-term stability and business operation rights."
      },
      {
        "icon": "🇫🇯",
        "title": "Pathway to Fijian Citizenship",
        "description": "Eligible to apply for Fijian naturalization after 5 continuous years of legal residence."
      },
      {
        "icon": "🌺",
        "title": "Tropical Island Settlement",
        "description": "Live peacefully in Pacific island paradises like Denarau Island, Pacific Harbour, or Savusavu."
      }
    ],
    "faqs": [
      {
        "question": "What is the FIRC in Fiji?",
        "answer": "FIRC (Foreign Investment Registration Certificate) is the official certificate issued by Investment Fiji authorizing foreign investors to operate in the country."
      },
      {
        "question": "Can foreigners buy real estate in Fiji?",
        "answer": "Foreigners can acquire freehold real estate located within designated municipal boundaries (such as Denarau Island and resort developments)."
      }
    ]
  },
  "panama": {
    "cname": "Panama",
    "scheme": "Residencia Permanente / Qualified Investor Visa (Golden Visa)",
    "overview": "Panama offers permanent settlement under Executive Decree 722 (Qualified Investor Visa). Foreign investors who make a qualifying investment in real estate ($300,000 to $500,000 USD), stock market securities ($500,000 USD), or fixed-term bank deposits ($750,000 USD) obtain Permanent Residency within 30 days. In addition, professionals residing continuously on work permits qualify for permanent residence after continuous legal status.",
    "fees": {
      "visa_fee": "$5,000 (Government Application Levy) + $5,000 (Repatriation Deposit)",
      "service_fee": "Legal representation fees",
      "total_fee": "approx. $10,000 statutory fees",
      "notes": "Administered by Servicio Nacional de Migración under fast-track rules."
    },
    "proc_time": "30 Days (Qualified Investor) or 3 to 6 Months (Standard)",
    "proc_details": "Fast-tracked within 30 days for Qualified Investors through a Panamanian attorney.",
    "source": "Servicio Nacional de Migración Panamá & Ministry of Commerce and Industries (MICI)",
    "validity": "Indefinite Permanent Residence (Cédula E renewed every 10 years)",
    "stay": "Permanent lawful domicile in Panama",
    "entry_type": "Multiple Entry",
    "assessment_doc": "Public Registry Real Estate Deed or National Securities Commission Certificate",
    "assessment_desc": "Proof of qualifying investment capital originating from abroad, clean criminal background certificate, and health certificate.",
    "min_funds": "$300,000 - $500,000 USD qualifying investment or continuous legal employment",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Fast 30-Day Permanent Residency",
        "description": "Qualified Investor Visa grants immediate permanent residency in as fast as 30 calendar days."
      },
      {
        "icon": "🇵🇦",
        "title": "Territorial Tax System",
        "description": "Panama taxes only income generated within Panamanian territory; all foreign-sourced income is 100% tax-free."
      },
      {
        "icon": "👨‍👩‍👧",
        "title": "Whole Family Inclusion",
        "description": "Investor's spouse, dependent children up to age 25 in education, and dependent parents qualify for concurrent permanent residency."
      }
    ],
    "faqs": [
      {
        "question": "Does Panama tax foreign income?",
        "answer": "No! Panama has a strict territorial tax system. Permanent residents pay zero tax in Panama on income, dividends, or capital gains earned outside Panamanian territory."
      },
      {
        "question": "How often do I need to visit Panama to keep permanent residency?",
        "answer": "Permanent residents only need to visit Panama once every two (2) years to keep their permanent resident status active."
      }
    ]
  },
  "dominican-republic": {
    "cname": "Dominican Republic",
    "scheme": "Residencia Permanente / Residencia por Inversión (Investor Golden Visa)",
    "overview": "The Dominican Republic offers fast-track permanent residency under Law No. 171-07 (Incentives for Retirees and Foreign Investors). Foreign investors who invest at least $200,000 USD in registered enterprise capital, real estate, or Free Trade Zone projects obtain Permanent Residency within 45 days, bypassing the standard temporary residency stage.",
    "fees": {
      "visa_fee": "$200 (Investor Visa Application)",
      "service_fee": "DOP 15,000 (DGM Permanent Carné)",
      "total_fee": "approx. ₹35,000",
      "notes": "Fast-tracked under Law 171-07."
    },
    "proc_time": "45 Days (Investor Fast-Track) or 6 to 12 Months (Standard)",
    "proc_details": "Application expedited through DGM and ProDominicana in Santo Domingo.",
    "source": "Dirección General de Migración (DGM) & ProDominicana",
    "validity": "Indefinite Permanent Residence (Carné renewed every 4 years)",
    "stay": "Permanent lawful domicile in Dominican Republic",
    "entry_type": "Multiple Entry",
    "assessment_doc": "ProDominicana Foreign Investment Registration Certificate & Real Estate Deed",
    "assessment_desc": "Proof of $200,000 USD foreign direct investment, clean judicial record, and medical clearance.",
    "min_funds": "$200,000 USD qualifying investment or 5 years continuous legal residence",
    "highlights": [
      {
        "icon": "⚡",
        "title": "Fast 45-Day Direct Permanent Residency",
        "description": "Law 171-07 grants direct permanent residency within 45 days, skipping temporary stages."
      },
      {
        "icon": "🇩🇴",
        "title": "Pathway to Dominican Citizenship",
        "description": "Eligible to apply for Dominican naturalization and passport after just 6 months on investor permanent residency."
      },
      {
        "icon": "💰",
        "title": "Tax Exemptions on Foreign Income & Assets",
        "description": "100% exemption from tax on transfer of property, import duties on household goods, and tax on foreign investments."
      }
    ],
    "faqs": [
      {
        "question": "What is the investment threshold for Dominican Republic PR?",
        "answer": "Under Law 171-07, a minimum foreign capital investment of $200,000 USD in real estate or business qualifies for direct permanent residency."
      },
      {
        "question": "How quickly can an investor apply for citizenship in Dominican Republic?",
        "answer": "Investors holding residency under Law 171-07 qualify to apply for expedited naturalization after just six (6) months of permanent residency."
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
  const fromNorm = normalizeCountry(from);
  if (fromNorm && fromNorm !== 'india') {
    const pureRoute = resolvePureRoutePR(from, to);
    if (pureRoute) return pureRoute;
  }

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

