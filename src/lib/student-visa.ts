import { resolvePureRouteStudent } from './pure-routes';
// src/lib/student-visa.ts
// Country-specific student visa steps, documents, fees, processing, and requirements pipeline based on official consular requirements

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

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview?: string;
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
    "overview": "Russia is a top global destination for Indian medical students (MBBS). World-class universities: Moscow State University, Sechenov First MSMU, Kazan Federal University, and Pavlov First St. Petersburg offer affordable degrees in English.",
    "fees": {
      "visa_fee": "$50-100 USD (approx. ₹4,100-8,200)",
      "service_fee": "Payable at VFS",
      "total_fee": "$50-100 USD + VFS Logistics",
      "notes": "Visa fee varies by entry type. University tuition: ₹20-35 Lakhs total for MBBS."
    },
    "proc_time": "15-20 Working Days",
    "proc_details": "Consular processing following official invitation from the Ministry of Internal Affairs (MVD).",
    "source": "Russian Ministry of Internal Affairs & Consular Department / VFS Global",
    "work_term": "Up to 20 hours per week (during studies)",
    "work_break": "Full-time during semester breaks",
    "post_study": "Job search / work visa transition upon graduation",
    "min_funds": "Proof of funds for tuition + living expenses (approx. ₹3-4 Lakhs/year)",
    "acceptance_doc": "Official Admission Letter & MVD Invitation Voucher",
    "acceptance_desc": "Ministry of Internal Affairs (MVD) official study invitation voucher processed by the university."
  },
  "kazakhstan": {
    "overview": "Kazakhstan is a major medical and engineering education hub for Indian students. Universities such as Kazakh National Medical University (Asfendiyarov), Al-Farabi Kazakh National University, and Astana Medical University offer internationally recognized MBBS and technical programs in English.",
    "fees": {
      "visa_fee": "$80 USD (approx. ₹6,700)",
      "service_fee": "Payable at Embassy/VAC",
      "total_fee": "$80 USD Statutory Reference",
      "notes": "C9 Study Visa fee paid at consular mission in India."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Foreign Affairs / Migration Committee confirmation telex requested by the university.",
    "source": "Ministry of Foreign Affairs of Kazakhstan & Migration Service / Embassy in New Delhi",
    "work_term": "Part-time allowed on campus",
    "work_break": "Full-time during official vacation",
    "post_study": "1 Year post-graduate internship / work visa transition",
    "min_funds": "$3,000 - $4,000 USD / year living expenses + university tuition",
    "acceptance_doc": "Official Letter of Acceptance & MFA Invitation Telex (Nomer Priglasheniya)",
    "acceptance_desc": "Ministry of Foreign Affairs visa invitation number issued through the university portal."
  },
  "ukraine": {
    "overview": "Ukraine has historically been a premier European destination for Indian medical students (MBBS). Leading institutions include Bogomolets National Medical University, VN Karazin Kharkiv National University, and Bukovinian State Medical University.",
    "fees": {
      "visa_fee": "$65-130 USD (approx. ₹5,400-10,800)",
      "service_fee": "Payable at VFS Global Ukraine",
      "total_fee": "$65-130 USD + VFS Logistics",
      "notes": "Long-Stay Visa Type D-13 fee paid upon consular filing."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Application lodged at VFS Global Ukraine in India and verified against the UDMS student database.",
    "source": "Ministry of Education and Science of Ukraine & State Migration Service (SMS)",
    "work_term": "Part-time work permitted with university approval",
    "work_break": "Full-time during semester vacations",
    "post_study": "1 Year post-graduate training / clinical residency",
    "min_funds": "$3,000 - $4,000 USD living expenses + tuition fee coverage",
    "acceptance_doc": "Official Invitation Letter from Ukrainian State Center for International Education",
    "acceptance_desc": "Standardized invitation letter registered with the Ministry of Education and Science of Ukraine."
  },
  "belarus": {
    "overview": "Belarus offers high-standard, cost-effective medical (MBBS) and engineering education at institutions like Belarusian State Medical University (BSMU Minsk), Vitebsk State Medical University, and BSU Minsk, taught in English.",
    "fees": {
      "visa_fee": "€60 (approx. ₹5,400)",
      "service_fee": "Medical insurance and registration on arrival",
      "total_fee": "€60 Consular Reference",
      "notes": "Official invitation processed by the Department on Citizenship and Migration."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "Consular section in New Delhi issues study entry visa based on official Ministry-approved invitation.",
    "source": "Ministry of Education of Belarus & Department on Citizenship and Migration",
    "work_term": "Part-time work permitted during studies",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year internship / clinical residency options",
    "min_funds": "$2,500 - $3,500 USD / year living expenses + tuition coverage",
    "acceptance_doc": "Official Student Invitation Letter from Citizenship and Migration Department",
    "acceptance_desc": "Official statutory invitation approved by regional migration authorities in Belarus."
  },
  "uzbekistan": {
    "overview": "Uzbekistan has rapidly become a premier hub for Indian medical students (MBBS). Recognized universities such as Tashkent Medical Academy, Samarkand State Medical University, and Fergana State University offer affordable WHO/NMC-aligned programs in English.",
    "fees": {
      "visa_fee": "$50-80 USD (approx. ₹4,200-6,700)",
      "service_fee": "Registration and student visa extension in-country",
      "total_fee": "$50-80 USD Consular Reference",
      "notes": "C9 Student visa issued by Uzbek Embassy in New Delhi."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Higher Education and Ministry of Foreign Affairs telex clearance requested by university.",
    "source": "Ministry of Higher Education, Science and Innovations of Uzbekistan & MFA",
    "work_term": "Part-time work permitted during studies",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year clinical internship / licensing pathway",
    "min_funds": "$2,500 - $3,500 USD annual living expenses + tuition fees",
    "acceptance_doc": "Official Admission Letter & MFA Visa Confirmation Telex",
    "acceptance_desc": "Formal invitation voucher confirmed by the Uzbek Ministry of Foreign Affairs."
  },
  "kyrgyzstan": {
    "overview": "Kyrgyzstan is one of the most popular medical study (MBBS) destinations for Indian students. Accredited universities include Kyrgyz State Medical Academy (KSMA), Osh State University, and International School of Medicine (ISM Bishkek) offering affordable NMC-compliant medical programs in English.",
    "fees": {
      "visa_fee": "$60-90 USD",
      "service_fee": "Registration and residence permit extension in Kyrgyzstan",
      "total_fee": "$60-90 USD Consular Reference",
      "notes": "Category S student visa issued upon Ministry confirmation."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Education and Science clearance and electronic visa approval.",
    "source": "Ministry of Education and Science & Ministry of Foreign Affairs of Kyrgyzstan",
    "work_term": "Campus employment permitted",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year medical internship / FMGE-NExT preparation",
    "min_funds": "$2,000 - $3,000 USD / year living costs + tuition fee receipts",
    "acceptance_doc": "Official University Admission Letter & Ministry Student Invitation",
    "acceptance_desc": "Official invitation processed through the Department of Consular Service of Kyrgyzstan."
  },
  "tajikistan": {
    "overview": "Tajikistan offers affordable medical education at Avicenna Tajik State Medical University in Dushanbe. The university is WHO and NMC-recognized, offering an 5-year MBBS curriculum in English.",
    "fees": {
      "visa_fee": "$50-80 USD",
      "service_fee": "Registration and residence visa extension in Dushanbe",
      "total_fee": "$50-80 USD Consular Reference",
      "notes": "Category O student visa issued through Tajik consular missions."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Education and Science clearance and electronic visa confirmation.",
    "source": "Ministry of Education and Science & Ministry of Foreign Affairs of Tajikistan",
    "work_term": "Campus employment allowed",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year clinical internship / licensing pathway",
    "min_funds": "$2,000 - $3,000 USD / year living expenses + tuition receipts",
    "acceptance_doc": "Official Admission Letter & MFA Student Invitation",
    "acceptance_desc": "Official student visa invitation registered with the Tajik Ministry of Foreign Affairs."
  },
  "turkmenistan": {
    "overview": "International students in Turkmenistan study at Turkmen State University (Magtymguly) and State Medical University of Turkmenistan in Ashgabat, sponsored under government bilateral quotas.",
    "fees": {
      "visa_fee": "$60-100 USD",
      "service_fee": "Registration and residence visa extension",
      "total_fee": "$60-100 USD Consular Reference",
      "notes": "State Migration Service student approval voucher required."
    },
    "proc_time": "20 to 30 Calendar Days",
    "proc_details": "State Migration Service of Turkmenistan approves invitation submitted by the university.",
    "source": "State Migration Service of Turkmenistan & Ministry of Education",
    "work_term": "Employment not permitted on study visa",
    "work_break": "Not permitted",
    "post_study": "Graduation transition as per bilateral protocol",
    "min_funds": "$3,000 USD annual maintenance + tuition coverage",
    "acceptance_doc": "State Migration Service Student Invitation Approval",
    "acceptance_desc": "Official statutory invitation issued by the State Migration Service in Ashgabat."
  },
  "azerbaijan": {
    "overview": "Azerbaijan is an emerging higher education hub for Indian students. Universities including Azerbaijan Medical University (Baku), ADA University, and Khazar University offer internationally recognized programs in medicine, engineering, and business in English.",
    "fees": {
      "visa_fee": "$50-80 USD",
      "service_fee": "Payable at VFS / State Migration card fee",
      "total_fee": "$50-80 USD Consular Reference",
      "notes": "Study visa issued by Embassy of Azerbaijan in New Delhi."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Science and Education accreditation and State Migration Service clearance.",
    "source": "Ministry of Science and Education & State Migration Service of Azerbaijan",
    "work_term": "Part-time work permitted during studies",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year post-study job search / work transition",
    "min_funds": "$3,000 - $4,000 USD / year living costs + tuition fees",
    "acceptance_doc": "Official University Admission Letter & State Migration Service Invitation",
    "acceptance_desc": "Formal invitation voucher confirmed by the State Migration Service of Azerbaijan."
  },
  "georgia": {
    "overview": "Georgia is a top European medical study destination for Indian students. Universities including Tbilisi State Medical University (TSMU), University of Georgia, European University, and Ilia State University offer world-class WHO/WFME-accredited MBBS programs in English.",
    "fees": {
      "visa_fee": "$20 USD (Consular D3 Immigration Visa)",
      "service_fee": "Public Service Hall residence card fee (approx. 200 GEL)",
      "total_fee": "approx. ₹8,000 Consular & In-Country Reference",
      "notes": "Category D3 Immigration Visa for Study issued by Georgian MFA."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "National Center for Educational Quality Enhancement (NCEQE) accreditation and consular visa D3.",
    "source": "Ministry of Education and Science & Ministry of Foreign Affairs of Georgia",
    "work_term": "Part-time work permitted during studies",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year clinical internship / licensing pathway",
    "min_funds": "$3,000 - $4,000 USD / year living expenses + tuition fees",
    "acceptance_doc": "NCEQE Recognition Decree & University Order of Enrolment",
    "acceptance_desc": "Official accreditation order from the National Center for Educational Quality Enhancement."
  },
  "armenia": {
    "overview": "Armenia is a prominent medical education center for Indian students. Yerevan State Medical University (YSMU), Mkhitar Gosh University, and Traditional Medicine University offer internationally recognized WHO/NMC-aligned MBBS programs in English.",
    "fees": {
      "visa_fee": "$33 USD (Consular Study Visa)",
      "service_fee": "Temporary Residence card fee (approx. 105,000 AMD)",
      "total_fee": "approx. ₹15,000 Total Consular & In-Country",
      "notes": "Unified Migration Service issues student temporary residence card."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Education, Science, Culture and Sports accreditation and consular visa stamping.",
    "source": "Ministry of Education & Migration and Citizenship Service of the Republic of Armenia",
    "work_term": "Part-time work permitted during studies",
    "work_break": "Full-time during semester breaks",
    "post_study": "1 Year post-graduate internship / work transition",
    "min_funds": "$2,500 - $3,500 USD / year living expenses + tuition coverage",
    "acceptance_doc": "Official Admission Order & Ministry Student Invitation",
    "acceptance_desc": "Official enrolment order approved by the Armenian Ministry of Education."
  },
  "moldova": {
    "overview": "Moldova is home to Nicolae Testemițanu State University of Medicine and Pharmacy (USMF) in Chișinău, offering high-standard European medical degrees (MBBS) recognized by WHO, WFME, and the NMC, taught in English.",
    "fees": {
      "visa_fee": "€80 (Long-Stay Type D/AS Visa)",
      "service_fee": "General Inspectorate for Migration residence permit fee",
      "total_fee": "approx. ₹12,000 Consular & In-Country Reference",
      "notes": "Type D/AS Study Visa issued by Moldovan diplomatic missions."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Ministry of Education and Research letter of acceptance and consular visa review.",
    "source": "Ministry of Education and Research & General Inspectorate for Migration (IGM)",
    "work_term": "Part-time work permitted during studies",
    "work_break": "Full-time during semester breaks",
    "post_study": "1 Year post-graduate clinical training / licensing",
    "min_funds": "$3,000 - $4,000 USD / year living expenses + tuition receipts",
    "acceptance_doc": "Official Letter of Acceptance from Ministry of Education",
    "acceptance_desc": "Standardized admission order from the Moldovan Ministry of Education and Research."
  },
  "pakistan": {
    "overview": "International students in Pakistan enroll in recognized medical, engineering, and Islamic studies programs under Higher Education Commission (HEC) quotas and bilateral exchange schemes.",
    "fees": {
      "visa_fee": "$60 USD",
      "service_fee": "NADRA portal fee",
      "total_fee": "$60 USD Consular Reference",
      "notes": "Requires Higher Education Commission (HEC) clearance."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Coordinated between HEC, Ministry of Interior, and Pakistan High Commission.",
    "source": "Higher Education Commission (HEC) & Ministry of Interior Pakistan",
    "work_term": "Employment not permitted on student visa",
    "work_break": "Not permitted",
    "post_study": "Course completion return protocol",
    "min_funds": "$3,000 USD annual maintenance + tuition coverage",
    "acceptance_doc": "HEC No Objection Certificate (NOC) & University Offer Letter",
    "acceptance_desc": "Official statutory NOC issued by the Higher Education Commission in Islamabad."
  },
  "bangladesh": {
    "overview": "Bangladesh is a major regional destination for Indian medical students. Renowned institutions including Dhaka Medical College, Sir Salimullah Medical College, and leading private medical colleges offer WHO/NMC-recognized 5-year MBBS programs sharing identical syllabi and clinical disease patterns with India.",
    "fees": {
      "visa_fee": "₹0 (Consular Visa Fee)",
      "service_fee": "DGHS equivalency & application handling fees",
      "total_fee": "approx. ₹5,000 Equivalence Reference",
      "notes": "Directorate General of Health Services (DGHS) eligibility required."
    },
    "proc_time": "15 to 25 Working Days",
    "proc_details": "DGHS equivalency verification and Ministry of Foreign Affairs student visa endorsement.",
    "source": "Directorate General of Health Services (DGHS) & Department of Immigration and Passports",
    "work_term": "Internship permitted in affiliated teaching hospital",
    "work_break": "Vacations permitted",
    "post_study": "1 Year mandatory clinical internship recognized by NMC/FMGE",
    "min_funds": "₹2,50,000/year living allowance + university tuition receipts",
    "acceptance_doc": "DGHS Equivalence Certificate & Medical College Offer Letter",
    "acceptance_desc": "Official marks equivalency certificate issued by DGHS in Dhaka."
  },
  "myanmar": {
    "overview": "International students in Myanmar pursue Buddhist philosophy, Burmese language, and cultural studies at universities such as Yangon University and the International Theravāda Buddhist Missionary University (ITBMU).",
    "fees": {
      "visa_fee": "$50 USD (Education Visa Type ED)",
      "service_fee": "Stay permit extension in Yangon",
      "total_fee": "$50 USD Consular Reference",
      "notes": "Requires Ministry of Religious Affairs or Ministry of Education clearance."
    },
    "proc_time": "15 to 25 Working Days",
    "proc_details": "Ministry of Education approval and consular visa issuance.",
    "source": "Ministry of Immigration and Population & Ministry of Education",
    "work_term": "Employment not permitted",
    "work_break": "Not permitted",
    "post_study": "Course completion return protocol",
    "min_funds": "$2,500 USD annual maintenance + course sponsorship",
    "acceptance_doc": "University Admission Letter & Ministry Recommendation",
    "acceptance_desc": "Official enrolment order certified by the Ministry of Education."
  },
  "laos": {
    "overview": "International students in Laos study Lao language, Southeast Asian studies, and environmental management at the National University of Laos (NUOL) in Vientiane under bilateral governmental quotas.",
    "fees": {
      "visa_fee": "$50 USD (Student Visa Type ST)",
      "service_fee": "Annual stay permit extension in Vientiane",
      "total_fee": "$50 USD Consular Reference",
      "notes": "Ministry of Education and Sports authorization required."
    },
    "proc_time": "15 to 25 Working Days",
    "proc_details": "Ministry of Education and Sports student clearance and MFA visa stamping.",
    "source": "Ministry of Education and Sports & Ministry of Foreign Affairs of Lao PDR",
    "work_term": "Employment not permitted on student visa",
    "work_break": "Not permitted",
    "post_study": "Course completion return protocol",
    "min_funds": "$2,500 USD annual maintenance + tuition coverage",
    "acceptance_doc": "National University of Laos Offer Letter & Ministry Approval",
    "acceptance_desc": "Official enrolment order certified by the Ministry of Education and Sports."
  },
  "mongolia": {
    "overview": "International students in Mongolia study Mongolian language, central Asian archaeology, and mining engineering at the National University of Mongolia (NUM) and Mongolian University of Science and Technology (MUST) in Ulaanbaatar.",
    "fees": {
      "visa_fee": "$60 USD (Student Visa Type S)",
      "service_fee": "Mongolia Immigration Agency residence card fee",
      "total_fee": "$60 USD Consular Reference",
      "notes": "Mongolia Immigration Agency study permission required."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Ministry of Education and Science approval and MIA electronic visa clearance.",
    "source": "Mongolia Immigration Agency & Ministry of Education and Science",
    "work_term": "Part-time work permitted with university authorization",
    "work_break": "Full-time during summer vacations",
    "post_study": "1 Year post-graduate transition",
    "min_funds": "$3,000 USD annual maintenance + tuition coverage",
    "acceptance_doc": "National University of Mongolia Offer Letter & MIA Study Approval",
    "acceptance_desc": "Official enrolment order certified by the Mongolia Immigration Agency."
  },
  "taiwan": {
    "overview": "Taiwan is a premier global destination for higher education, semiconductors, and Mandarin studies. World-class institutions including National Taiwan University (NTU), National Tsing Hua University (NTHU), and National Yang Ming Chiao Tung University (NYCU) offer extensive English-taught Master's and PhD programs with generous government scholarships (MOE/TaiwanICDF).",
    "fees": {
      "visa_fee": "₹5,300 (Resident Visa for Study)",
      "service_fee": "Alien Resident Certificate (ARC) fee: NT$1,000/year",
      "total_fee": "approx. ₹8,000 Consular & ARC Reference",
      "notes": "Resident Visa leads to Alien Resident Certificate (ARC) in Taiwan."
    },
    "proc_time": "5 to 10 Working Days",
    "proc_details": "Taipei Economic and Cultural Center (TECC) in New Delhi or Chennai.",
    "source": "Bureau of Consular Affairs (BOCA) & National Immigration Agency (NIA)",
    "work_term": "Up to 20 hours per week (requires Ministry of Labor student work permit)",
    "work_break": "Full-time during winter/summer breaks",
    "post_study": "Up to 1 to 2 Years post-graduation job search extension (ARC extension)",
    "min_funds": "NT$100,000 - NT$200,000 (approx. ₹2,50,000 - ₹5,00,000) bank deposit + scholarship proof",
    "acceptance_doc": "Official University Admission Letter & MOE Scholarship Certificate (if applicable)",
    "acceptance_desc": "Unconditional admission letter issued by an accredited Taiwanese higher education institution."
  },
  "hong-kong": {
    "overview": "Hong Kong hosts five universities ranked in the global Top 100: University of Hong Kong (HKU), Hong Kong University of Science and Technology (HKUST), Chinese University of Hong Kong (CUHK), CityU, and PolyU. All courses taught in English with post-study work rights under the IANG scheme.",
    "fees": {
      "visa_fee": "HK$230 (approx. ₹2,500)",
      "service_fee": "University visa handling logistics",
      "total_fee": "HK$230 Statutory Reference",
      "notes": "Admitting university coordinates visa submission with ImmD."
    },
    "proc_time": "6 to 8 Weeks",
    "proc_details": "Coordinated between the admitting university and the Hong Kong Immigration Department.",
    "source": "Hong Kong Immigration Department (ImmD)",
    "work_term": "On-campus part-time work up to 20 hours/week during term",
    "work_break": "Summer full-time work permitted",
    "post_study": "2 Years post-study work authorization via Immigration Arrangements for Non-local Graduates (IANG)",
    "min_funds": "HK$100,000 - HK$150,000/year living expenses + tuition fee receipts",
    "acceptance_doc": "Official University Offer Letter & ImmD Student Visa Label / e-Visa",
    "acceptance_desc": "Official unconditional admission offer accompanied by ImmD electronic study visa."
  },
  "macau": {
    "overview": "International students in Macau enroll in high-caliber English-medium degree programs in hospitality, gaming management, business, and Chinese-Portuguese bilingual law at the University of Macau (UM) and Macau University of Science and Technology (MUST).",
    "fees": {
      "visa_fee": "100 MOP (Special Authorization to Stay for Study)",
      "service_fee": "University coordination fee",
      "total_fee": "100 MOP Consular Reference",
      "notes": "Special Authorization to Stay granted by PSPF Immigration."
    },
    "proc_time": "15 to 20 Working Days",
    "proc_details": "Public Security Police Force (PSPF) Immigration Department.",
    "source": "Education and Youth Development Bureau (DSEDJ) & PSPF Macau",
    "work_term": "Academic internships permitted as part of curriculum",
    "work_break": "Vacation internships with authorization",
    "post_study": "Transition via specialized talent admission schemes",
    "min_funds": "50,000 MOP/year living expenses + tuition fee receipts",
    "acceptance_doc": "University Admission Letter & Student Stay Authorization",
    "acceptance_desc": "Official acceptance from recognized Macau higher education institution."
  },
  "nigeria": {
    "overview": "Nigeria's higher education system encompasses leading regional institutions like the University of Lagos (UNILAG), University of Ibadan, Covenant University, and Ahmadu Bello University. International students obtain a Subject to Regularization (STR) visa in India, which regularizes into a Combined Expatriate Residence Permit and Aliens Card (CERPAC Green Card) upon arrival.",
    "fees": {
      "visa_fee": "$160 (STR Visa Application)",
      "service_fee": "$1,000 (Annual Student CERPAC Green Card Fee)",
      "total_fee": "$1,160 (Consular + First Year CERPAC)",
      "notes": "CERPAC permits full resident status for the duration of the academic program."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Subject to Regularization (STR) visa issued by Nigerian High Commission New Delhi; CERPAC regularized within 90 days of arrival.",
    "source": "Nigeria Immigration Service (NIS) & Federal Ministry of Education",
    "work_term": "Part-time on-campus work permitted with university authorization",
    "work_break": "Full-time during designated school vacations",
    "post_study": "Graduates may transition to Expatriate Quota employment upon securing a corporate sponsor",
    "min_funds": "$3,000 - $5,000 per academic year tuition plus living expenses",
    "acceptance_doc": "Official University Admission Letter & JAMB Regularization Confirmation",
    "acceptance_desc": "Formal unconditional admission letter from an accredited Nigerian tertiary institution."
  },
  "ghana": {
    "overview": "Ghana is a major educational hub in West Africa, hosting prestigious public universities such as the University of Ghana (Legon), Kwame Nkrumah University of Science and Technology (KNUST), and Ashesi University. International students obtain a Ghana Student Visa and subsequently register for a Non-Citizen ECOWAS/GIS Resident Permit.",
    "fees": {
      "visa_fee": "₹6,000 (Consular Entry Visa)",
      "service_fee": "$150 - $200 (GIS Student Residence Permit)",
      "total_fee": "approx. ₹20,000 Total",
      "notes": "Student Residence Permit renewed annually at GIS headquarters."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Consular entry visa processed in New Delhi; GIS student permit registered in Accra after university matriculation.",
    "source": "Ghana Immigration Service (GIS) & Ghana Tertiary Education Commission (GTEC)",
    "work_term": "Campus employment allowed with university approval",
    "work_break": "Full-time during semester breaks",
    "post_study": "Graduates can apply for GIPC employment quota transfer upon securing an authorized job offer",
    "min_funds": "$2,500 - $4,000 annual maintenance + university tuition payment receipt",
    "acceptance_doc": "Official University Admission Letter & Tuition Fee Receipt",
    "acceptance_desc": "Unconditional admission letter from a recognized Ghanaian public or accredited private university."
  },
  "ethiopia": {
    "overview": "Ethiopia is a growing center for higher learning in the Horn of Africa, anchored by Addis Ababa University (AAU)—one of Africa's premier research universities—and Jimma University. International students obtain an Ethiopian Student Visa (IV) through the Department for Immigration and Nationality Affairs following institutional sponsorship.",
    "fees": {
      "visa_fee": "$82 (Initial Student Entry Visa)",
      "service_fee": "$100/year (Resident ID Card)",
      "total_fee": "approx. ₹15,000",
      "notes": "University foreign students office assists with local resident permit."
    },
    "proc_time": "2 to 4 Weeks",
    "proc_details": "Online pre-clearance via evisa.gov.et or Embassy of Ethiopia in New Delhi with Ministry of Education endorsement.",
    "source": "Main Department for Immigration and Nationality Affairs & Ministry of Education",
    "work_term": "Academic research and teaching assistantships permitted",
    "work_break": "Vacation research work",
    "post_study": "Graduates can transition to corporate employment upon securing an authorized work permit",
    "min_funds": "$2,000 - $3,500 annual maintenance plus paid tuition receipt",
    "acceptance_doc": "Official University Admission Letter & Ministry of Education Clearance",
    "acceptance_desc": "Formal admission confirmation from an accredited Ethiopian higher education institution."
  },
  "rwanda": {
    "overview": "Rwanda has rapidly emerged as a regional technological education hub, hosting prestigious global branch campuses including Carnegie Mellon University Africa (CMU-Africa), African Leadership University (ALU), and the University of Global Health Equity (UGHE), alongside the University of Rwanda. Students receive a Student Visa (Category V1) from the Directorate General of Immigration and Emigration (DGIE).",
    "fees": {
      "visa_fee": "10,000 RWF (approx. $8 / ₹700 Student Visa Fee)",
      "service_fee": "50,000 RWF (Annual Residence ID)",
      "total_fee": "approx. ₹5,000 Total",
      "notes": "Subsidized highly competitive student fee structure under DGIE policies."
    },
    "proc_time": "1 to 2 Weeks",
    "proc_details": "Applied online via IREMBO platform with institution admission letter.",
    "source": "Directorate General of Immigration and Emigration (DGIE) & Higher Education Council (HEC)",
    "work_term": "Internships and part-time research allowed under university guidance",
    "work_break": "Full-time holiday research",
    "post_study": "Graduates can apply for the Category G (Graduate Job Search) permit or transition to a work permit",
    "min_funds": "$2,000 - $3,500 annual living expenses guarantee",
    "acceptance_doc": "University Admission Letter & HEC Registration Equivalence",
    "acceptance_desc": "Official letter of admission from an accredited Rwandan university or international branch campus."
  },
  "zimbabwe": {
    "overview": "Zimbabwe's higher education sector is known for high literacy standards and esteemed universities, notably the University of Zimbabwe (UZ) in Harare, National University of Science and Technology (NUST) in Bulawayo, and Africa University in Mutare. International students apply for a Student Permit / Scholar Permit issued by the Department of Immigration.",
    "fees": {
      "visa_fee": "$100 (Annual Student Permit Fee)",
      "service_fee": "$50 (Registration & Admin)",
      "total_fee": "$150 (approx. ₹12,500)",
      "notes": "Administered by the Department of Immigration in Harare."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Applied through sponsoring university and Department of Immigration headquarters.",
    "source": "Department of Immigration Zimbabwe & Ministry of Higher and Tertiary Education",
    "work_term": "Academic internships and practical training allowed",
    "work_break": "Vacation research work",
    "post_study": "Graduates may qualify for Temporary Employment Permit upon corporate sponsorship",
    "min_funds": "$2,000 - $3,500 annual maintenance plus university fee payment",
    "acceptance_doc": "Official University Admission Letter & Ministry Clearance",
    "acceptance_desc": "Official letter of acceptance from a registered Zimbabwean university."
  },
  "colombia": {
    "overview": "Colombia boasts some of Latin America's top-ranked universities, including Universidad de los Andes (UniAndes), Universidad Nacional de Colombia, and Pontificia Universidad Javeriana. International students apply for the Visitor Visa for Studies (Visa V Estudiante), valid for the full length of academic programs and exchange semesters.",
    "fees": {
      "visa_fee": "$16 (Study Fee) + $51 (Issuance Fee) = $67 USD",
      "service_fee": "$55 (Cédula de Extranjería biometric card)",
      "total_fee": "approx. ₹10,000 Total",
      "notes": "Highly economical visa fees for international students."
    },
    "proc_time": "10 to 20 Working Days",
    "proc_details": "Applied 100% online through the Cancillería portal; Cédula de Extranjería registered at Migración Colombia.",
    "source": "Ministerio de Relaciones Exteriores (Cancillería) & Migración Colombia",
    "work_term": "Internships and research assistantships authorized under university curriculum",
    "work_break": "Vacation research allowed",
    "post_study": "Graduates can apply for Visa M (Migrant Worker) upon securing an authorized employment contract",
    "min_funds": "Minimum 10 times Colombian monthly minimum wage (approx. ₹2,50,000 balance or sponsor guarantee)",
    "acceptance_doc": "Certificado de Admisión / Matrícula from accredited university",
    "acceptance_desc": "Official enrollment certificate from a certified Colombian higher education institution."
  },
  "peru": {
    "overview": "Peru offers rich academic and anthropological research programs at institutions like Pontificia Universidad Católica del Perú (PUCP) and Universidad Nacional Mayor de San Marcos (the oldest continuously operating university in the Americas, founded 1551). Students obtain a Student Resident Visa (Visa de Estudiante) via Migraciones.",
    "fees": {
      "visa_fee": "$80 (Consular / Migraciones Student Fee)",
      "service_fee": "$30 (Carné de Extranjería)",
      "total_fee": "approx. ₹9,500 Total",
      "notes": "Applied at Peruvian consulate or regularized at Migraciones in Lima."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "University issues matriculation certificate; approved by Migraciones Peru.",
    "source": "Superintendencia Nacional de Migraciones & SUNEDU",
    "work_term": "Academic internships permitted under university degree requirements",
    "work_break": "Vacation research work",
    "post_study": "Graduates can transition to Worker Resident status upon securing an approved employment contract",
    "min_funds": "$3,000 annual maintenance or institutional scholarship guarantee",
    "acceptance_doc": "Constancia de Matrícula & University Acceptance Letter",
    "acceptance_desc": "Official enrollment certificate from a SUNEDU-licensed Peruvian university."
  },
  "chile": {
    "overview": "Chile is home to South America's highest-ranking universities: Pontificia Universidad Católica de Chile (UC) and Universidad de Chile. International students obtain a Student Temporary Residency (Residencia Temporal para Estudiantes) through the National Migration Service (SERMIG).",
    "fees": {
      "visa_fee": "$60 (SERMIG Student Visa Fee)",
      "service_fee": "$15 (Registration)",
      "total_fee": "approx. ₹6,500 Total",
      "notes": "Administered online through the SERMIG digital portal."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Applied online via tramites.extranjeria.gob.cl with university acceptance and proof of maintenance.",
    "source": "Servicio Nacional de Migraciones (SERMIG) & Ministerio de Educación",
    "work_term": "Internships required by university curriculum permitted",
    "work_break": "Research work authorized",
    "post_study": "Graduates can apply for Work Temporary Residency upon securing an authorized employment contract",
    "min_funds": "$3,000 - $4,500 annual living expense guarantee or scholarship certificate",
    "acceptance_doc": "Certificado de Matrícula Definitiva from recognized Chilean university",
    "acceptance_desc": "Official enrollment certificate from an accredited higher education institution in Chile."
  },
  "costa-rica": {
    "overview": "Costa Rica is renowned for world-class environmental research, peace studies, and Spanish immersion, hosting the UN-mandated University for Peace (UPEACE), EARTH University, and the Universidad de Costa Rica (UCR). International students obtain a Provisional Student Visa (Permiso de Estudiante) via DGME.",
    "fees": {
      "visa_fee": "$50 (Provisional Student Visa)",
      "service_fee": "$125 (DIMEX student resident card)",
      "total_fee": "approx. ₹15,000 Total",
      "notes": "Registered through the DGME foreign student division."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Applied through university sponsorship and approved by the Dirección General de Migración y Extranjería (DGME).",
    "source": "Dirección General de Migración y Extranjería (DGME) & CONESUP",
    "work_term": "Academic research and university internships authorized",
    "work_break": "Vacation research work",
    "post_study": "Graduates can apply for special work permits upon receiving an authorized corporate job offer",
    "min_funds": "$3,000 - $4,500 annual maintenance or scholarship certificate",
    "acceptance_doc": "Certificado de Admisión Definitiva from accredited university",
    "acceptance_desc": "Official admission letter from a university recognized by CONESUP or created by international treaty (UPEACE)."
  },
  "romania": {
    "overview": "Romania is a major destination for international higher education, particularly renowned for European-accredited English-taught Medical, Dental, and Engineering degrees at prestigious universities like Carol Davila University of Medicine and Pharmacy (Bucharest), Iuliu Hațieganu University (Cluj-Napoca), and Politehnica University of Bucharest. International students obtain a National Long-Stay Visa for Study (Visa D/SD) and an IGI Permis de Ședere resident permit.",
    "fees": {
      "visa_fee": "€120 (National Long-Stay Study Visa Type D)",
      "service_fee": "259 RON + 120 RON (IGI Residence Permit & Stamp)",
      "total_fee": "approx. ₹18,000 Total",
      "notes": "Residence permit renewed annually at Inspectoratul General pentru Imigrări (IGI)."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Requires Ministry of Education Letter of Acceptance (Scrisoare de Acceptare la Studii); visa issued by Embassy in New Delhi.",
    "source": "Ministry of Foreign Affairs (MAE) & Inspectoratul General pentru Imigrări (IGI)",
    "work_term": "Up to 4 hours per day (20 hours per week) without a separate work permit",
    "work_break": "Full-time during scheduled university vacations",
    "post_study": "Graduates can apply for an extension of stay for up to 9 months to seek employment or establish a business",
    "min_funds": "Minimum Romanian statutory minimum wage per month (approx. €600/month or €7,200/year)",
    "acceptance_doc": "Scrisoare de Acceptare la Studii (Ministry of Education Letter of Acceptance)",
    "acceptance_desc": "Official acceptance letter issued directly by the Romanian Ministry of National Education."
  },
  "bulgaria": {
    "overview": "Bulgaria is a premier European destination for international medical, dental, and veterinary studies, offering internationally recognized EU-accredited English-medium programs at Medical University of Sofia, Medical University of Plovdiv, and Sofia University St. Kliment Ohridski. Students obtain a National Long-Stay Visa for Study (Visa D) and a Bulgarian Residence Permit.",
    "fees": {
      "visa_fee": "€100 (National Long-Stay Visa Type D)",
      "service_fee": "200 BGN - 500 BGN (Bulgarian Residence Permit)",
      "total_fee": "approx. ₹18,000 Total",
      "notes": "Processed via Embassy of Bulgaria in New Delhi; residence permit renewed annually."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Requires Certificate of Acceptance from the Bulgarian Ministry of Education and Science (MES).",
    "source": "Ministry of Foreign Affairs (MFA) & Ministry of Education and Science (MES)",
    "work_term": "Up to 20 hours per week during academic term",
    "work_break": "Full-time during official vacations",
    "post_study": "Graduates can apply for an extension of stay for up to 9 months for job search or business startup",
    "min_funds": "Minimum Bulgarian statutory minimum wage per month (approx. €500/month or €6,000/year)",
    "acceptance_doc": "Official Certificate of Acceptance from Ministry of Education and Science (MES)",
    "acceptance_desc": "Official document issued directly by the Bulgarian Ministry of Education and Science certifying university admission."
  },
  "croatia": {
    "overview": "Croatia offers high-quality European university education with historic institutions like the University of Zagreb (founded in 1669, one of the oldest in Southeastern Europe), University of Split, and RIT Croatia (Rochester Institute of Technology branch campus). International students obtain a Temporary Residence Permit for Study (Privremeni boravak u svrhu studiranja) and an entry visa.",
    "fees": {
      "visa_fee": "€93 (Temporary Residence Permit for Study)",
      "service_fee": "€41 (Biometric Residence Card)",
      "total_fee": "approx. ₹12,000 Total",
      "notes": "Administered by the Ministry of the Interior (MUP) in Croatia."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Applied through Croatian diplomatic mission in New Delhi or directly at the local Police Administration (Policijska uprava) in Croatia.",
    "source": "Ministry of the Interior (MUP) & Ministry of Science and Education",
    "work_term": "Students can work through the official Student Centre (Studentski centar) for up to 20 hours per week",
    "work_break": "Full-time during semester breaks",
    "post_study": "Graduates can apply for an extension of temporary residence for up to 12 months for job search or business launch",
    "min_funds": "Minimum €400 to €500 per month of living expenses (approx. €5,000/year)",
    "acceptance_doc": "Potvrda o upisu (Official University Enrollment Certificate)",
    "acceptance_desc": "Official enrollment certificate from an accredited Croatian university or higher education academy."
  },
  "slovenia": {
    "overview": "Slovenia offers outstanding higher education in the heart of Europe, anchored by the University of Ljubljana (ranked among the world's top 3% of universities, founded in 1919) and the University of Maribor. International students obtain a Temporary Residence Permit for Study (Dovoljenje za začasno prebivanje zaradi študija) and an entry visa.",
    "fees": {
      "visa_fee": "€50 (Temporary Residence Permit for Study)",
      "service_fee": "€15 (Biometric card fee)",
      "total_fee": "approx. ₹6,000 Total",
      "notes": "Highly subsidized statutory administrative fees in Slovenia."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Applied through Embassy of Slovenia in New Delhi or Administrative Unit (Upravna enota) in Slovenia.",
    "source": "Ministry of the Interior (MNZ) & Ministry of Higher Education, Science and Innovation",
    "work_term": "Students can work through Student Work (Študentsko delo) with referral forms for up to 20 hours per week",
    "work_break": "Full-time during summer vacations",
    "post_study": "Graduates can extend temporary residence for up to 9 months for job seeking or establishing an innovative business",
    "min_funds": "Minimum basic income per month (approx. €465/month or €5,600/year)",
    "acceptance_doc": "Potrdilo o vpisu (Official University Enrollment Certificate)",
    "acceptance_desc": "Official enrollment certificate from an accredited Slovenian university or higher vocational college."
  },
  "cyprus": {
    "overview": "Cyprus is a major international educational hub in the Eastern Mediterranean, known for affordable, high-calibre English-taught programs at institutions like the University of Cyprus (UCY), Cyprus University of Technology (CUT), and the University of Nicosia (UNIC - famous for its premier Medical School and blockchain research). International students obtain an Entry Visa for Study and an Alien Registration Certificate (ARC / Pink Slip) from CRMD.",
    "fees": {
      "visa_fee": "€140 (Entry Visa for Study & Migration Fee)",
      "service_fee": "€70 (Alien Registration ARC Pink Slip)",
      "total_fee": "approx. ₹19,000 Total",
      "notes": "Administered by the Civil Registry and Migration Department (CRMD)."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "University coordinates clearance with CRMD in Nicosia; entry visa issued by Cyprus High Commission in New Delhi.",
    "source": "Civil Registry and Migration Department (CRMD) & Ministry of Education, Sport and Youth",
    "work_term": "Up to 20 hours per week in designated sectors (hospitality, logistics, agriculture) after completing the first 6 months of study",
    "work_break": "Full-time during summer vacations",
    "post_study": "Graduates can apply for an extension of stay for up to 9 months for job search or business launch",
    "min_funds": "Minimum €7,000 per academic year living expenses guarantee",
    "acceptance_doc": "Official University Admission Letter & CRMD Pre-Clearance Letter",
    "acceptance_desc": "Formal unconditional admission letter and migration pre-clearance issued by CRMD in Nicosia."
  },

  "australia": {
    "overview": "The Australian Student Visa (Subclass 500) authorizes international students to undertake full-time higher education, vocational training, or postgraduate research at registered CRICOS academic institutions. Students are permitted to work up to 48 hours per fortnight during university terms and unrestricted hours during scheduled semester breaks. Upon graduation from eligible degrees, students can transition to the Subclass 485 Temporary Graduate Visa for 2 to 4 years of post-study work rights.",
    "fees": { "visa_fee": "AUD 1,600 (approx. ₹88,000)", "service_fee": "₹1,650 (VFS Global ABCC Biometrics)", "total_fee": "AUD 1,600 Base Application Charge", "notes": "Paid online via ImmiAccount. Excludes mandatory Overseas Student Health Cover (OSHC) of AUD 600-900/year and Bupa medical examinations." },
    "proc_time": "4 to 8 Weeks (Standard Higher Education Sector)",
    "proc_details": "Applications are processed under the simplified student visa framework (SSVF). Lodging with a Confirmation of Enrolment (CoE) and evidence of Genuine Student (GS) intent accelerates assessment.",
    "source": "Department of Home Affairs (ImmiAccount) / VFS Global Australia",
    "work_term": "48 hours per fortnight", "work_break": "Unlimited hours", "post_study": "2 to 4 years (Subclass 485 Temporary Graduate Visa)",
    "min_funds": "AUD 29,710/year (living costs) + 1st year tuition fee + AUD 2,000 travel allowance",
    "acceptance_doc": "Confirmation of Enrolment (CoE)",
    "acceptance_desc": "Electronic CoE issued by CRICOS-registered Australian education provider with PRISMS tracking number."
  },
  "uk": {
    "overview": "The UK Student Route Visa permits international students to enroll in full-time degree programs at licensed Student Sponsor Higher Education Providers (HEPs). Students holding a degree-level visa can work up to 20 hours per week during term time and full-time during official vacation periods. Upon successful course completion, graduates can transition to the 2-year Graduate Route Post-Study Work Visa (3 years for PhD/doctoral graduates) with no job sponsorship required.",
    "fees": { "visa_fee": "£490 (approx. ₹52,400)", "service_fee": "£776/year (Immigration Health Surcharge - IHS)", "total_fee": "£1,266+ (Visa £490 + Annual IHS £776)", "notes": "Paid online on GOV.UK. Mandatory IHS covers full NHS healthcare access during studies. Priority visa processing (+£500 for 5 days) available." },
    "proc_time": "3 Weeks (15 Working Days) Standard Processing",
    "proc_details": "UKVI standard processing is 3 weeks following biometric capture at VFS Global. Priority (5 days) and Super Priority (next business day) services are optional.",
    "source": "UK Visas and Immigration (UKVI / GOV.UK) / VFS Global",
    "work_term": "20 hours per week", "work_break": "Full-time (40 hours/week)", "post_study": "2 years (3 years for PhD) via Graduate Route",
    "min_funds": "£1,483/month (London) or £1,136/month (outside London) for up to 9 months + unpaid tuition",
    "acceptance_doc": "Confirmation of Acceptance for Studies (CAS)",
    "acceptance_desc": "Unique 14-digit electronic reference number issued by a UK licensed Student Sponsor institution."
  },
  "usa": {
    "overview": "The F-1 Academic Student Visa enables international students to pursue full-time academic degree programs at SEVP-certified colleges, universities, and seminaries across the United States. F-1 students may work on-campus up to 20 hours per week during school terms and full-time during vacations. Following graduation, students qualify for 12 months of Optional Practical Training (OPT), with an additional 24-month STEM OPT extension available for eligible science, technology, engineering, and mathematics degrees (36 months total).",
    "fees": { "visa_fee": "USD $185 (MRV Visa Fee - approx. ₹15,540)", "service_fee": "USD $350 (I-901 SEVIS Fee)", "total_fee": "USD $535 Total Statutory Reference", "notes": "SEVIS fee must be paid online via FMJfee.com prior to scheduling the consular interview. MRV visa fee is paid via the US Visa Scheduling portal." },
    "proc_time": "Consular Decision at Interview Window (Passport return in 3-5 Business Days)",
    "proc_details": "Requires a two-stage in-person appointment in India: Biometrics at a Visa Application Center (VAC) followed by an in-person consular interview at a US Embassy or Consulate.",
    "source": "U.S. Department of State / US Embassy & Consulates in India",
    "work_term": "Up to 20 hours per week (on-campus only)", "work_break": "Full-time on-campus (40 hours/week)", "post_study": "12 to 36 Months (OPT / STEM OPT Extension)",
    "min_funds": "Full 1st year estimated expenses (Tuition + Living + Health Insurance as certified on Form I-20)",
    "acceptance_doc": "Certificate of Eligibility for Nonimmigrant Student Status (Form I-20)",
    "acceptance_desc": "Official Form I-20 issued by SEVP-certified institution with designated SEVIS ID number."
  },
  "canada": {
    "overview": "The Canadian Study Permit allows international students to pursue academic, professional, or vocational training at Designated Learning Institutions (DLIs) across Canada. Eligible students may work off-campus up to 20 hours per week during regular academic sessions and full-time during scheduled academic breaks. Following graduation from an eligible program, students can obtain a Post-Graduation Work Permit (PGWP) valid for up to 3 years, offering an established pathway to permanent residence via Express Entry.",
    "fees": { "visa_fee": "CAD $150 (approx. ₹9,300)", "service_fee": "CAD $85 (Biometrics Fee)", "total_fee": "CAD $235 Total Government Charge", "notes": "Paid online via IRCC secure portal. Living expenses must be demonstrated through a Guaranteed Investment Certificate (GIC) of CAD $20,635." },
    "proc_time": "6 to 10 Weeks (Standard Assessment Timeline)",
    "proc_details": "Processed online via the IRCC portal. Provincial Attestation Letter (PAL) is mandatory for post-secondary undergraduate applications.",
    "source": "Immigration, Refugees and Citizenship Canada (IRCC) / VFS Global",
    "work_term": "Up to 20 hours per week off-campus", "work_break": "Full-time during scheduled breaks", "post_study": "Up to 3 Years via Post-Graduation Work Permit (PGWP)",
    "min_funds": "CAD $20,635 (1st year living cost via GIC) + 1st year tuition fee receipt",
    "acceptance_doc": "DLI Letter of Acceptance (LOA) & Provincial Attestation Letter (PAL)",
    "acceptance_desc": "Official unconditional admission letter from a Designated Learning Institution accompanied by a provincial PAL."
  },
  "germany": {
    "overview": "The German National Student Visa (Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at state-accredited German universities. Public universities in 15 of 16 German states offer tuition-free education. Students are legally authorized to work up to 140 full days or 280 half days per calendar year. Following graduation, students can obtain an 18-month Job Seeker Residence Permit to secure qualified employment matching their degree and transition to an EU Blue Card.",
    "fees": { "visa_fee": "€75 (approx. ₹6,750)", "service_fee": "₹18,000 (APS Verification) + ₹2,500 VFS logistics", "total_fee": "approx. ₹27,250 Total Consular Reference", "notes": "APS certificate verification by the Academic Evaluation Centre New Delhi is mandatory prior to visa submission. Visa fee waived for German government scholars." },
    "proc_time": "4 to 8 Weeks from Document Submission at VFS Global",
    "proc_details": "Processed by the German Embassy in New Delhi and Consulates General in Mumbai, Bengaluru, Chennai, and Kolkata following local foreigners authority (Ausländerbehörde) clearance.",
    "source": "German Federal Foreign Office / German Missions in India & VFS Global",
    "work_term": "140 full days or 280 half days per year", "work_break": "Permitted within statutory day allowance", "post_study": "18 Months Job Seeker Residence Permit (Aufenthaltserlaubnis zur Arbeitsplatzsuche)",
    "min_funds": "€11,208/year (€934/month) deposited into an officially approved Blocked Account (Sperrkonto)",
    "acceptance_doc": "University Admission Letter (Zulassungsbescheid) & APS Certificate",
    "acceptance_desc": "Unconditional admission notice from an accredited German university along with mandatory original APS Certificate."
  },
  "france": {
    "overview": "The French Long-Stay Student Visa (VLS-TS) allows international students to enroll in higher education programs at French universities, Grandes Écoles, and specialized institutes. Students are permitted to work up to 60% of the statutory annual working hours (964 hours per year). Following completion of a Master's degree or equivalent, graduates can apply for the 12-month Job Search / Business Creation authorization (RECE / APS), allowing them to seek employment or launch an enterprise in France.",
    "fees": { "visa_fee": "€50 (approx. ₹4,500)", "service_fee": "₹16,500 (Campus France EEF Processing) + VFS Logistics", "total_fee": "approx. ₹23,500 Total Statutory Reference", "notes": "Applicants must complete the mandatory Études en France (EEF) Campus France interview before lodging the visa file at VFS France." },
    "proc_time": "2 to 4 Weeks following Campus France Interview and VFS submission",
    "proc_details": "Two-tier verification: Academic interview with Campus France India followed by consular review and biometric capture through VFS Global France.",
    "source": "Campus France India & Ministry of the Interior (France-Visas) / VFS Global",
    "work_term": "Up to 964 hours per year (approx. 20 hrs/week)", "work_break": "Full-time within annual limit", "post_study": "12 Months via Recherche d'Emploi / Création d'Entreprise (RECE) permit",
    "min_funds": "Minimum €615/month (€7,380/year) living expenses + tuition fee coverage",
    "acceptance_doc": "Campus France EEF Acceptance & University Attestation",
    "acceptance_desc": "Confirmation of registration generated through the official Études en France (EEF) platform."
  },
  "ireland": {
    "overview": "The Irish Long Stay Student Visa (Type D) enables international students to undertake full-time higher education programs listed on the Interim List of Eligible Programmes (ILEP). Non-EEA students are granted permission to work up to 20 hours per week during term time and up to 40 hours per week during designated holiday periods (June–September and December 15–January 15). Under the Third Level Graduate Scheme (Stamp 1G), master's graduates can stay and work full-time for up to 24 months.",
    "fees": { "visa_fee": "€60 (Single Entry) / €100 (Multiple Entry)", "service_fee": "€300 (Irish Residence Permit - IRP Card registration on arrival)", "total_fee": "€360 – €400 Total Reference", "notes": "Paid online via AVATS portal. IRP registration fee (€300) is paid inside Ireland upon appointment with the Immigration Service Delivery (ISD)." },
    "proc_time": "4 to 8 Weeks from Document Submission at VFS Ireland",
    "proc_details": "Processed by the Embassy of Ireland in New Delhi. Ireland is NOT a Schengen member; visa requires direct national clearance.",
    "source": "Immigration Service Delivery (ISD / AVATS) / Embassy of Ireland & VFS Global",
    "work_term": "20 hours per week", "work_break": "40 hours per week (June-Sept & mid-Dec to mid-Jan)", "post_study": "Up to 24 Months via Third Level Graduate Scheme (Stamp 1G)",
    "min_funds": "€10,000/year living expenses demonstrated in personal/sponsor account + full 1st year tuition receipt",
    "acceptance_doc": "Letter of Acceptance from ILEP-approved Institution",
    "acceptance_desc": "Unconditional offer letter from an eligible Irish university confirming course registration and fees paid."
  },
  "italy": {
    "overview": "The Italian National Student Visa (Type D Studio) enables international students to enroll in undergraduate, master, and doctoral degree programs at Italian universities, polytechnics, and AFAM art academies. International students may legally work part-time up to 20 hours per week (maximum 1,040 hours per calendar year). Following graduation, degree holders can apply for a 12-month Permesso di Soggiorno per Ricerca Lavoro (Job Search Residence Permit) to seek employment matching their qualifications.",
    "fees": { "visa_fee": "€50 (National Study Visa Fee)", "service_fee": "€30 (VFS Global Service Fee) + €16 stamp duty (Marca da Bollo)", "total_fee": "approx. ₹8,500 Consular Total Reference", "notes": "Pre-enrolment must be completed online on the Universitaly portal. Declaration of Value (DOV) or CIMEA Statement of Comparability is mandatory for academic recognition." },
    "proc_time": "3 to 6 Weeks following VFS submission and Consular review",
    "proc_details": "Submitted via VFS Global Italy after pre-enrolment approval on the Universitaly portal by the Italian university.",
    "source": "Ministry of Foreign Affairs and International Cooperation (MAECI / Universitaly) / VFS Global",
    "work_term": "Up to 20 hours per week (max 1,040 hrs/year)", "work_break": "Permitted within annual hour ceiling", "post_study": "12 Months via Permesso di Soggiorno per Ricerca Lavoro",
    "min_funds": "Minimum €6,000/year (approx. €468/month) living expenses + accommodation proof",
    "acceptance_doc": "Universitaly Pre-enrolment Summary & University Admission Letter",
    "acceptance_desc": "Validated Summary Form from the official Universitaly portal endorsed by the admitting Italian institution."
  },
  "new-zealand": {
    "overview": "The New Zealand Fee Paying Student Visa allows international students to study full-time at universities, institutes of technology, and registered private training establishments across New Zealand. Students enrolled in eligible full-time tertiary programs can work up to 20 hours per week during term time and full-time during scheduled academic breaks. Following graduation, students can apply for a Post-Study Work Visa (PSWV) for 1, 2, or 3 years depending on the qualification level and study location.",
    "fees": { "visa_fee": "NZD $430 (approx. ₹21,500)", "service_fee": "NZD $35 (Immigration Levy)", "total_fee": "NZD $465 Total Reference", "notes": "Paid online via Immigration New Zealand Immigration Online portal. Excludes approved medical chest X-ray and full medical examination fees." },
    "proc_time": "4 to 6 Weeks from Online Submission",
    "proc_details": "100% digital application processed through Immigration New Zealand's Immigration Online platform. Electronic eVisa issued upon approval.",
    "source": "Immigration New Zealand (INZ / Immigration Online)",
    "work_term": "20 hours per week", "work_break": "Full-time during scheduled breaks", "post_study": "1 to 3 Years via Post-Study Work Visa (PSWV)",
    "min_funds": "NZD $20,000/year for living expenses + 1st year tuition fee receipt or proof of funds",
    "acceptance_doc": "Offer of Place from NZQA-accredited Institution",
    "acceptance_desc": "Unconditional Offer of Place confirming program details, course duration, and accommodation arrangements."
  },
  "singapore": {
    "overview": "The Student's Pass in Singapore allows international students to undertake approved full-time degree programs at Singapore's Institute of Higher Learning (IHLs) including NUS, NTU, SMU, and SUTD. Students at approved public IHLs are permitted to work part-time up to 16 hours per week during term time without a separate work pass and full-time during official vacation periods. Upon graduation, international students from local universities can apply for a 1-year non-renewable Long-Term Visit Pass (LTVP) to seek employment in Singapore.",
    "fees": { "visa_fee": "SGD $30 (Application Processing Fee)", "service_fee": "SGD $60 (Issuance Fee) + SGD $30 (Multiple Journey Visa if applicable)", "total_fee": "SGD $90 – $120 Total Reference", "notes": "Paid online via the ICA SOLAR portal. Security deposit or medical examination may be requested by ICA depending on nationality." },
    "proc_time": "10 to 15 Working Days (via ICA SOLAR system)",
    "proc_details": "Two-step digital process: The admitting educational institution files the SOLAR application, followed by the student submitting eForm 16 online.",
    "source": "Immigration & Checkpoints Authority (ICA Singapore / SOLAR System)",
    "work_term": "Up to 16 hours per week (at approved IHLs only)", "work_break": "Full-time during vacations", "post_study": "1 Year Job Search via Long-Term Visit Pass (LTVP)",
    "min_funds": "SGD $15,000 – $20,000/year demonstrated through personal/parental bank statements",
    "acceptance_doc": "SOLAR Registration Acknowledgement & University In-Principle Approval",
    "acceptance_desc": "Electronic In-Principle Approval (IPA) letter issued by ICA Singapore via SOLAR."
  },
  "japan": {
    "overview": "The Japan College Student Visa permits international students to enroll in degree programs at Japanese universities, graduate schools, and Ministry-accredited vocational colleges. Students must apply for and receive a Permission to Engage in Activity other than that Permitted under the Status of Residence Previously Granted (Shikakugaikatsudō) to work up to 28 hours per week during semesters and up to 8 hours per day during official vacations. Following graduation, students can obtain a 6 to 12-month Designated Activities Visa (Tokutei Katsudo) for employment seeking.",
    "fees": { "visa_fee": "3,000 JPY (Single Entry - approx. ₹1,700)", "service_fee": "₹750 – ₹1,200 (VFS Global Processing Fee)", "total_fee": "approx. ₹2,700 Total Reference", "notes": "The admitting Japanese university first secures the Certificate of Eligibility (COE) from regional immigration authorities in Japan before consular visa stamping in India." },
    "proc_time": "5 to 7 Working Days (following COE issuance in Japan)",
    "proc_details": "Two phases: Phase 1 is Certificate of Eligibility (COE) processing in Japan (takes 2-3 months); Phase 2 is consular visa sticker processing at VFS Japan in India (takes 1 week).",
    "source": "Immigration Services Agency of Japan (MOJ) / Embassy of Japan & VFS Global",
    "work_term": "Up to 28 hours per week (with Shikakugaikatsudō permit)", "work_break": "Up to 8 hours per day during vacations", "post_study": "6 to 12 Months via Designated Activities Visa (Job Hunting)",
    "min_funds": "2,000,000 JPY (approx. ₹11,00,000) living expenses shown in sponsor's bank statements",
    "acceptance_doc": "Certificate of Eligibility (COE) & Letter of Admission",
    "acceptance_desc": "Original Certificate of Eligibility (COE) issued by regional immigration bureaus in Japan."
  },
  "austria": {
    "overview": "The Austrian Student Residence Permit (Aufenthaltsbewilligung Student) allows international students to enroll in full-time degree programs at accredited public and private Austrian universities. International students from third countries may work up to 20 hours per week without requiring an extensive labour market test, provided an employment permit (Beschäftigungsbewilligung) is registered by the employer. Following graduation, degree holders can apply for a 12-month Red-White-Red Card for Job Seekers to secure qualified employment.",
    "fees": { "visa_fee": "€160 (€120 application fee + €20 grant fee + €20 police fee)", "service_fee": "€30 (VFS Service Fee)", "total_fee": "€190 Total Reference (approx. ₹17,100)", "notes": "Initial application submitted through Austrian Embassy in New Delhi / VFS Global. Final biometric residence card issued in Austria by the local magistrate (MA 35 in Vienna)." },
    "proc_time": "8 to 12 Weeks from Document Lodgement",
    "proc_details": "Application dossier is transmitted from the Austrian Embassy in New Delhi to the responsible municipal authority (Magistrat / Bezirkshauptmannschaft) in Austria for adjudication.",
    "source": "Austrian Federal Ministry of the Interior (BMI / OeAD) / Austrian Embassy & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Permitted with employer registration", "post_study": "12 Months via Red-White-Red Card Job Search Residence Permit",
    "min_funds": "€11,000 – €14,000/year living costs in personal bank account (€672/mo under 24, €1,217/mo over 24)",
    "acceptance_doc": "Austrian University Admission Notice (Zulassungsbescheid)",
    "acceptance_desc": "Official notification of admission issued by the rectorate of an accredited Austrian university."
  },
  "belgium": {
    "overview": "The Belgian Long-Stay Student Visa (Type D) enables international students to undertake higher education at universities and university colleges (Hautes Écoles) across Flanders, Wallonia, and Brussels. Students are permitted to work up to 20 hours per week during academic semesters and unlimited hours during summer holidays, provided studies remain the primary activity. Under Belgian law, non-EU graduates can apply for a 12-month Search Year (Orientation Year) residence permit to look for employment or start a business.",
    "fees": { "visa_fee": "€180 (Visa D Application Fee)", "service_fee": "€235 (Federal Administrative Fee paid to Immigration Office DOFI)", "total_fee": "€415 Total Reference (approx. ₹37,500)", "notes": "The federal administrative contribution (€235) must be paid directly into the Belgian Immigration Office bank account before lodging the visa application at VFS Belgium." },
    "proc_time": "4 to 8 Weeks from Physical Submission at VFS Global",
    "proc_details": "Processed by the Belgian Immigration Office (Dienst Vreemdelingenzaken / Office des Étrangers) in Brussels.",
    "source": "Belgian Immigration Office (DOFI) / Embassy of Belgium & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Unlimited during summer holidays", "post_study": "12 Months via Search Year / Orientation Year Residence Permit",
    "min_funds": "Minimum €803/month (€9,636/year) demonstrated via university blocked account or Annex 32 sponsorship",
    "acceptance_doc": "Attestation of Enrolment / Admission (Attestation d'inscription)",
    "acceptance_desc": "Official certificate issued by an accredited Belgian higher education institution."
  },
  "czech-republic": {
    "overview": "The Czech Long-Term Visa / Residence Permit for Studies allows international students to enroll in accredited degree programs at world-renowned Czech universities such as Charles University and CTU Prague. International students studying in an accredited university program have free access to the Czech labour market with no work permit required. Following graduation from an accredited Czech university, graduates can apply for a 9-month Job Seeker Residence Permit to find qualified employment.",
    "fees": { "visa_fee": "CZK 2,500 (approx. €100 / ₹9,000)", "service_fee": "CZK 500 – 1,000 (VFS Global Processing Fee)", "total_fee": "approx. ₹10,500 Total Reference", "notes": "All non-Czech documents (police clearance, birth certificate) must be super-legalized or apostilled and accompanied by an official certified Czech translation." },
    "proc_time": "60 Calendar Days statutory consular SLA",
    "proc_details": "Processed by the Department for Asylum and Migration Policy (OAMP) of the Ministry of the Interior of the Czech Republic.",
    "source": "Ministry of the Interior of the Czech Republic (MOI / OAMP) / Czech Embassy & VFS Global",
    "work_term": "Free access to labour market (no work permit needed for accredited programs)", "work_break": "Unrestricted", "post_study": "9 Months Job Search Residence Permit",
    "min_funds": "CZK 130,000 – 150,000/year (approx. ₹4,80,000) demonstrated through stamped bank statement",
    "acceptance_doc": "Letter of Acceptance for Studies (Potvrzení o studiu)",
    "acceptance_desc": "Official document confirming admission to an accredited Czech degree program issued in Czech."
  },
  "denmark": {
    "overview": "The Danish Student Residence Permit (ST1) allows international students to study at universities and higher education academies in Denmark. Non-EU students are legally permitted to work up to 20 hours per week during the academic year (September to May) and full-time (37 hours per week) during the summer holidays (June, July, and August). Following graduation, students can apply for a 3-year Post-Study Establishment Card to live and work in Denmark without requiring sponsor-based work permits.",
    "fees": { "visa_fee": "DKK 2,490 (approx. ₹30,000 - SIRI Case Order Fee)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "DKK 2,490 + VFS Service Fee", "notes": "Case Order ID must be created on newtodenmark.dk and the statutory SIRI fee paid online before submitting biometric data at VFS Denmark." },
    "proc_time": "2 Months (60 Days) from Biometric Capture",
    "proc_details": "Processed electronically by the Danish Agency for International Recruitment and Integration (SIRI).",
    "source": "Danish Agency for International Recruitment and Integration (SIRI) / VFS Global",
    "work_term": "20 hours per week (Sept–May)", "work_break": "Full-time (37 hours/week) June–August", "post_study": "3 Years via Post-Study Establishment Card Scheme",
    "min_funds": "DKK 6,820/month (approx. DKK 81,840/year) demonstrated through personal bank account",
    "acceptance_doc": "ST1 Application Online Code & University Admission Notice",
    "acceptance_desc": "Joint digital application form ST1 completed by educational institution and student."
  },
  "finland": {
    "overview": "The Finnish Student Residence Permit allows international students to pursue bachelor, master, and doctoral degree programs at Finnish universities and universities of applied sciences (UAS). Finland offers the world's most generous student work rights, permitting up to 30 hours of work per week during the academic term. Following graduation, degree holders can apply for a 2-year Job Search Residence Permit to look for work or start an enterprise.",
    "fees": { "visa_fee": "€350 (Electronic Application via Enter Finland)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "€380 Total Reference (approx. ₹34,200)", "notes": "Application is lodged online via the Enter Finland portal (enterfinland.fi). Private health insurance covering at least €120,000 in medical costs is required." },
    "proc_time": "1 to 2 Months from Biometric Verification at VFS Global",
    "proc_details": "Processed digitally by the Finnish Immigration Service (Migri) via Enter Finland.",
    "source": "Finnish Immigration Service (Migri / Enter Finland) / VFS Global",
    "work_term": "Up to 30 hours per week", "work_break": "Unrestricted hours when university classes are not held", "post_study": "2 Years Job Search Residence Permit (granted in up to 3 periods)",
    "min_funds": "€560/month (€6,720/year) deposited in applicant's personal bank account + tuition fee payment receipt",
    "acceptance_doc": "Study Place Acceptance Letter & Tuition Fee Receipt",
    "acceptance_desc": "Official certificate of acceptance issued through Studyinfo.fi or the admitting Finnish university."
  },
  "hungary": {
    "overview": "The Hungarian Long-Term Student Visa (Type D / Residence Permit for Studies) allows international students to enroll in full-time programs at prestigious Hungarian universities. Many Indian students study under the fully funded Stipendium Hungaricum scholarship. Students are entitled to work up to 24 hours per week during semester time and up to 66 days or 90 days per year outside semester periods. Graduates can transition to the 9-month Study-to-Work Residence Permit to seek employment in Hungary.",
    "fees": { "visa_fee": "€110 (Residence Permit Application Fee)", "service_fee": "€30 (VFS Global Processing Fee)", "total_fee": "€140 Total Reference (approx. ₹12,600)", "notes": "Visa D serves as an entry vignette valid for 30 days. The physical Residence Permit card is collected upon arrival at the National Directorate-General for Aliens Policing (OIF)." },
    "proc_time": "15 to 30 Calendar Days from Consular Submission",
    "proc_details": "Processed by the National Directorate-General for Aliens Policing (OIF) in Hungary via Hungarian consular missions in India.",
    "source": "National Directorate-General for Aliens Policing (OIF) / Hungarian Embassy & VFS Global",
    "work_term": "Up to 24 hours per week during term", "work_break": "Up to 66 working days outside semester", "post_study": "9 Months via Study-to-Work Residence Permit",
    "min_funds": "Approx. €700/month (€8,400/year) demonstrated in student's or sponsor's bank account",
    "acceptance_doc": "Letter of Admission & Stipendium Hungaricum Award (if applicable)",
    "acceptance_desc": "Official certificate of admission issued by a Hungarian higher education institution."
  },
  "iceland": {
    "overview": "The Icelandic Student Residence Permit allows international students to undertake full-time higher education at recognized universities in Iceland (such as the University of Iceland and Reykjavik University). Non-EEA students must apply for a specific student work permit to work up to 15 hours per week during the academic semester, with full-time work permitted during summer vacations. Following graduation, international students can obtain a 6-month residence permit to seek employment in Iceland.",
    "fees": { "visa_fee": "ISK 15,000 (approx. €100 / ₹9,000)", "service_fee": "€30 (VFS Service Fee)", "total_fee": "approx. ₹11,700 Total Reference", "notes": "Application must be submitted to the Directorate of Immigration (Útlendingastofnun) in Iceland before arriving. Criminal record certificate apostilled or legalized is mandatory." },
    "proc_time": "6 to 12 Weeks from Complete Dossier Receipt",
    "proc_details": "Adjudicated directly by the Directorate of Immigration (Útlendingastofnun) in Iceland.",
    "source": "Directorate of Immigration Iceland (Útlendingastofnun) / Danish Embassy (Representation)",
    "work_term": "Up to 15 hours per week (requires student work permit)", "work_break": "Full-time during summer holidays", "post_study": "6 Months Post-Study Job Search Permit",
    "min_funds": "ISK 217,799/month (approx. ₹1,30,000/month) for individual living expenses",
    "acceptance_doc": "Confirmation of School Admission (Staðfesting á skólavist)",
    "acceptance_desc": "Official confirmation of admission to a full-time university program in Iceland."
  },
  "norway": {
    "overview": "The Norwegian Student Residence Permit allows international students to enroll in full-time bachelor, master, and doctoral programs at Norwegian universities. International students are permitted to work part-time up to 20 hours per week during academic semesters and full-time during official semester breaks. Following graduation from a Norwegian university or college, students can apply for a 1-year Job Seeker Residence Permit to seek employment as a skilled worker.",
    "fees": { "visa_fee": "NOK 6,500 (approx. ₹51,000)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "NOK 6,500 + VFS Service Fee", "notes": "Living expenses (NOK 151,690/year) must be deposited into the Norwegian university's student deposit bank account prior to visa issuance." },
    "proc_time": "2 Months (8 Weeks) from Biometric Submission",
    "proc_details": "Applied online via the UDI Application Portal (udi.no) followed by physical document submission at VFS Norway.",
    "source": "Norwegian Directorate of Immigration (UDI) / Royal Norwegian Embassy & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Full-time during official university holidays", "post_study": "1 Year Job Seeker Residence Permit for Skilled Workers",
    "min_funds": "NOK 151,690/year (approx. ₹11,90,000) deposited into university's deposit account",
    "acceptance_doc": "Letter of Admission from Norwegian Higher Education Institution",
    "acceptance_desc": "Unconditional offer of admission to full-time study at an accredited Norwegian university."
  },
  "poland": {
    "overview": "The Polish National Visa for Studies (Type D) enables international students to pursue degree programs at universities across Poland. Poland has become a major Central European educational hub with affordable tuition and living costs. Full-time international students studying at accredited Polish universities have the legal right to work without a separate work permit during their studies. Graduates can apply for a 9-month Temporary Residence Permit for Job Seekers following course completion.",
    "fees": { "visa_fee": "€90 (National Visa D Application Fee)", "service_fee": "€15 (VFS Global Processing Fee)", "total_fee": "€105 Total Reference (approx. ₹9,450)", "notes": "Application is registered online on the official e-Konsulat platform (e-konsulat.gov.pl) and lodged at VFS Global Poland in India." },
    "proc_time": "15 to 30 Calendar Days from Consular Receipt",
    "proc_details": "Processed by the Consular Section of the Embassy of the Republic of Poland in New Delhi.",
    "source": "Ministry of Foreign Affairs of Poland (e-Konsulat) / VFS Global",
    "work_term": "Unrestricted work rights (no work permit needed for full-time students)", "work_break": "Unrestricted", "post_study": "9 Months via Temporary Residence Permit for University Graduates",
    "min_funds": "PLN 800/month living expenses + PLN 200/month accommodation + return flight cost",
    "acceptance_doc": "Certificate of Enrolment (Zaświadczenie o przyjęciu na studia)",
    "acceptance_desc": "Official certificate of acceptance from an accredited Polish university according to standard statutory template."
  },
  "portugal": {
    "overview": "The Portuguese National Student Visa (Type D4 / D5) enables international students to undertake higher education at universities and polytechnics across Portugal. International students are permitted to work up to 20 hours per week during term time and full-time during holidays, subject to notifying the immigration authorities (AIMA). After graduation, international students from Portuguese universities can apply for a 1-year Temporary Residence Permit for Job Searching to secure skilled employment.",
    "fees": { "visa_fee": "€90 (National Long-Stay Visa D Fee)", "service_fee": "€30 (VFS Global Service Fee)", "total_fee": "€120 Total Reference (approx. ₹10,800)", "notes": "The D-visa is a 4-month double-entry visa; upon arrival in Portugal, students attend an appointment at AIMA (Agency for Integration, Migration and Asylum) to obtain their residence permit card." },
    "proc_time": "30 to 60 Calendar Days from Lodgement",
    "proc_details": "Processed by the Consular Section of the Embassy of Portugal in New Delhi in coordination with AIMA in Lisbon.",
    "source": "Agency for Integration, Migration and Asylum (AIMA) / Embassy of Portugal & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Full-time during official university holidays", "post_study": "1 Year Job Search Residence Permit (Procura de Trabalho)",
    "min_funds": "€820/month (€9,840/year - Portuguese statutory minimum wage) in personal bank account",
    "acceptance_doc": "Declaration of Acceptance / University Registration (Declaração de Matrícula)",
    "acceptance_desc": "Official certificate issued by an accredited Portuguese higher education institution."
  },
  "sweden": {
    "overview": "The Swedish Residence Permit for Higher Education allows international students to enroll in degree programs at Swedish universities. Sweden offers an exceptional innovation and research ecosystem. International students in Sweden enjoy unrestricted work rights with no legal cap on weekly hours, provided they maintain satisfactory progress and attend mandatory classes. Following graduation, students can apply for a 12-month Residence Permit for Looking for Work or Starting a Business.",
    "fees": { "visa_fee": "SEK 1,500 (approx. ₹12,000)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "SEK 1,500 + VFS Service Fee", "notes": "Applied online directly via the Swedish Migration Agency (Migrationsverket) portal before biometric capture at VFS Sweden." },
    "proc_time": "2 to 3 Months from Online Submission",
    "proc_details": "Processed centrally by the Swedish Migration Agency (Migrationsverket) in Sweden.",
    "source": "Swedish Migration Agency (Migrationsverket) / Embassy of Sweden & VFS Global",
    "work_term": "Unrestricted weekly hours (must maintain study progress)", "work_break": "Unrestricted", "post_study": "12 Months Job Search Residence Permit",
    "min_funds": "SEK 10,314/month (approx. SEK 103,140 for 10-month academic year) in personal bank account",
    "acceptance_doc": "Notification of Selection Results from University Admissions Sweden",
    "acceptance_desc": "Official selection result letter from universityadmissions.se confirming full-time admission and tuition paid."
  },
  "switzerland": {
    "overview": "The Swiss National Visa for Study (National Visa Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at top-ranked Swiss universities and Federal Institutes of Technology (ETH Zurich, EPFL). International students from non-EU/EFTA countries may work up to 15 hours per week during semesters, but only after completing 6 months of study in Switzerland; full-time work is permitted during semester vacations. Graduates can apply for a 6-month residence permit to seek employment in Switzerland.",
    "fees": { "visa_fee": "€90 (National Visa D Application Fee)", "service_fee": "CHF 100 – 250 (Cantonal Migration Authorization Fee upon arrival)", "total_fee": "approx. ₹18,000 – ₹25,000 Total Reference", "notes": "Visa application is lodged at VFS Switzerland in India. The cantonal migration office in Switzerland evaluates and approves the student residence permit." },
    "proc_time": "8 to 12 Weeks from Consular Lodgement",
    "proc_details": "Tri-level review: Swiss Consulate in India reviews dossier, transmits to the Cantonal Migration Authority (e.g. Zurich, Vaud, Geneva), with federal approval by SEM.",
    "source": "State Secretariat for Migration (SEM) & Cantonal Migration Offices / VFS Global Switzerland",
    "work_term": "Up to 15 hours per week (only permitted after 6 months of study)", "work_break": "Full-time during semester breaks", "post_study": "6 Months Job Search Residence Permit",
    "min_funds": "CHF 21,000/year (approx. ₹20,00,000) demonstrated through personal/Swiss bank account",
    "acceptance_doc": "Confirmation of Registration (Attestation d'immatriculation / Zulassungsbestätigung)",
    "acceptance_desc": "Official registration confirmation issued by the rectorate of a recognized Swiss university."
  },
  "turkey": {
    "overview": "The Turkish Student Residence Permit (Öğrenci İkamet İzni) allows international students to enroll in associate, bachelor, master, and doctoral degree programs at Turkish universities under the Council of Higher Education (YÖK). Master's and PhD students are legally permitted to work part-time in accordance with Turkish labour regulations. Following completion of an undergraduate or postgraduate degree, graduates can apply for a short-term residence permit for job seeking or business establishment.",
    "fees": { "visa_fee": "USD $60 (approx. ₹5,100)", "service_fee": "₹3,500 (Gateway Globe VAC Service Fee)", "total_fee": "approx. ₹8,600 Total Reference", "notes": "Initial Student Visa sticker is obtained through Gateway Globe in India. Upon arrival, students register for the Öğrenci İkamet İzni through the e-Ikamet portal." },
    "proc_time": "15 to 25 Working Days from Gateway Globe Submission",
    "proc_details": "Processed by the Turkish Embassy in New Delhi and General Consulates in Mumbai/Hyderabad.",
    "source": "Presidency of Migration Management (GÖÇ / e-Ikamet) / Gateway Globe",
    "work_term": "Part-time allowed for postgraduate students", "work_break": "Permitted under general labour laws", "post_study": "Short-Term Residence Permit for Job Seeking (up to 1 year)",
    "min_funds": "USD $4,000 – $6,000/year in personal or sponsor bank account",
    "acceptance_doc": "Official University Acceptance Letter & YÖK Recognition",
    "acceptance_desc": "Official acceptance letter issued by an accredited Turkish university."
  },
  "argentina": {
    "overview": "The Argentine Student Visa (Residencia Temporaria por Estudio) allows international students to study at universities and higher institutes across Argentina (such as the University of Buenos Aires - UBA). Public higher education is tuition-free for undergraduate studies in Argentina. International students on a temporary study residence permit have the legal right to work in Argentina with equal labour protections. Following graduation, students can transition to professional work permits or permanent residency.",
    "fees": { "visa_fee": "USD $150 (Consular Visa Fee)", "service_fee": "ARS $10,000 – $20,000 (DGM Immigration Entry Fee on arrival)", "total_fee": "approx. ₹15,000 Total Reference", "notes": "The university in Argentina must register the student on the SINEP / DGM platform before visa issuance at the Embassy of Argentina in New Delhi." },
    "proc_time": "3 to 6 Weeks from Consular Lodgement",
    "proc_details": "Processed by the Consular Section of the Embassy of the Argentine Republic in New Delhi.",
    "source": "National Directorate of Migration (DGM / Migraciones Argentina) / Embassy of Argentina",
    "work_term": "Permitted with temporary residence (DNI)", "work_break": "Full-time permitted", "post_study": "Direct transition to Temporary Work Residence or Mercosur Residency",
    "min_funds": "USD $3,000 – $5,000/year demonstrated through bank statements",
    "acceptance_doc": "Certificate of Enrolment Registered with DGM (Constancia de Inscripción)",
    "acceptance_desc": "Electronic electronic certificate of admission uploaded directly to the DGM immigration system."
  },
  "netherlands": {
    "overview": "The Dutch Student Visa (MVV) and Residence Permit (VVR) allows international students to study at Dutch research universities and universities of applied sciences. Students may work part-time up to 16 hours per week during term time (requiring a TWV work permit filed by the employer) or full-time during the summer months (June to August). Under Dutch law, graduates can apply for a 1-year Orientation Year Visa (Zoekjaar) within 3 years of graduating to seek employment without sponsor salary minimums.",
    "fees": { "visa_fee": "€228 (IND Student Residence Permit Fee)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "€258 Total Reference (approx. ₹23,200)", "notes": "The admitting Dutch university submits the MVV/VVR application directly to the Immigration and Naturalisation Service (IND) on the student's behalf." },
    "proc_time": "2 to 4 Weeks (Fast-Track University Filing)",
    "proc_details": "The Dutch university files the TEV (entry and residence) application directly with IND in the Netherlands.",
    "source": "Immigration and Naturalisation Service (IND) / Dutch Ministry of Foreign Affairs & VFS Global",
    "work_term": "Up to 16 hours per week (requires employer TWV permit)", "work_break": "Full-time during June, July, and August", "post_study": "1 Year via Orientation Year Visa for Highly Educated Persons (Zoekjaar)",
    "min_funds": "€12,000 – €14,000/year living costs deposited into university's account or personal account",
    "acceptance_doc": "IND Approval Letter & University Enrolment Letter",
    "acceptance_desc": "Confirmation of admission from a Dutch university and formal IND approval notice."
  }
,
  "serbia": {
    "overview": "Serbia is an established regional hub for higher education, hosting the prestigious University of Belgrade (ranked among the world's top 500) and University of Novi Sad, offering internationally accredited English-medium Medical, Engineering, and Business degrees. International students obtain a Temporary Residence for Study (Privremeni boravak za studiranje) from the Ministry of Interior.",
    "fees": {
      "visa_fee": "€65 (D-Visa / Long-Stay Entry)",
      "service_fee": "RSD 18,000 (Ministry of Interior Residence Card)",
      "total_fee": "approx. ₹16,000 Total",
      "notes": "Residence permit renewed annually at Police Directorate in Belgrade."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Requires official university admission letter; processed by Serbian diplomatic mission or local Police Directorate.",
    "source": "Ministry of Interior (MUP) & Ministry of Education of Serbia",
    "work_term": "Students can work part-time up to 20 hours per week",
    "work_break": "Full-time during academic holidays",
    "post_study": "Graduates can apply for a 1-year residence permit extension for employment seeking",
    "min_funds": "Minimum €350 to €500 per month of living expenses",
    "acceptance_doc": "Potvrda o upisu (Official University Enrollment Confirmation)",
    "acceptance_desc": "Official enrollment certificate from an accredited Serbian public or private university."
  },
  "montenegro": {
    "overview": "Montenegro offers European university education at the University of Montenegro (Podgorica and Kotor) and University of Donja Gorica (UDG). International students obtain a Temporary Residence Permit for Study (Privremeni boravak radi studiranja) from the Ministry of Internal Affairs (MUP).",
    "fees": {
      "visa_fee": "€60 (Temporary Residence Fee)",
      "service_fee": "€10 (Biometric Card)",
      "total_fee": "approx. ₹6,500 Total",
      "notes": "Administered by MUP branch offices across Montenegro."
    },
    "proc_time": "2 to 4 Weeks",
    "proc_details": "Applied at local MUP office with university enrollment confirmation and proof of accommodation.",
    "source": "Ministry of Internal Affairs of Montenegro (MUP)",
    "work_term": "Students can work part-time in seasonal tourism and retail sectors",
    "work_break": "Full-time during summer vacations",
    "post_study": "Graduates can apply for employment residency upon securing an authorized job offer",
    "min_funds": "Minimum €300 per month of living expenses (approx. €3,600/year)",
    "acceptance_doc": "Potvrda o upisu (Official University Enrollment Certificate)",
    "acceptance_desc": "Official enrollment certificate from a recognized Montenegrin higher education faculty."
  },
  "albania": {
    "overview": "Albania hosts established institutions of higher education including the University of Tirana, Polytechnic University of Tirana, and Epoka University. International students obtain a Student Residence Permit (Leje Qëndrimi për Studime) from the Department of Border and Migration.",
    "fees": {
      "visa_fee": "€50 (National Study Visa)",
      "service_fee": "ALL 10,000 (Police Residence Card)",
      "total_fee": "approx. ₹12,000 Total",
      "notes": "Applied online via the e-Albania government portal."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Applied online via e-Albania platform with university matriculation certificate.",
    "source": "Ministry for Europe and Foreign Affairs & Department for Border and Migration",
    "work_term": "Students can work part-time up to 20 hours per week",
    "work_break": "Full-time during summer vacations",
    "post_study": "Graduates can apply for an extension to seek employment or launch a business",
    "min_funds": "Minimum €300 per month living expenses guarantee",
    "acceptance_doc": "Certifikatë Regjistrimi (Official University Admission Certificate)",
    "acceptance_desc": "Official enrollment certificate from an accredited Albanian public or private university."
  },
  "morocco": {
    "overview": "Morocco is an international educational center in North Africa, hosting the University of al-Qarawiyyin in Fez (recognized by UNESCO as the oldest continually operating university in the world, founded 859 AD), Mohammed V University in Rabat, and Al Akhawayn University in Ifrane (American liberal arts curriculum). International students obtain an Étudiant Residence Permit (Carte de Séjour Étudiant) from the Direction Générale de la Sûreté Nationale (DGSN).",
    "fees": {
      "visa_fee": "$70 (Long-Stay Entry Visa)",
      "service_fee": "MAD 100 (Annual Student Carte de Séjour)",
      "total_fee": "approx. ₹8,000 Total",
      "notes": "Residence permit renewed annually at the local Police Prefecture."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Applied via Moroccan Embassy in New Delhi with AMCI (Moroccan Agency for International Cooperation) or university admission letter.",
    "source": "Ministry of Foreign Affairs & Direction Générale de la Sûreté Nationale (DGSN)",
    "work_term": "Academic internships permitted under university degree requirements",
    "work_break": "Vacation research work",
    "post_study": "Graduates can transition to corporate employment upon securing an authorized ministry work contract",
    "min_funds": "$3,000 - $4,500 annual living expenses guarantee or AMCI scholarship",
    "acceptance_doc": "Attestation d'Inscription Définitive from accredited Moroccan university",
    "acceptance_desc": "Official enrollment certificate from a certified Moroccan higher education institution."
  },
  "tunisia": {
    "overview": "Tunisia offers renowned public higher education anchored by the University of Tunis El Manar (ranked among the best in North Africa) and University of Carthage, featuring prestigious English- and French-taught programs in Medicine, Engineering, and Mediterranean Studies. Students obtain a Carte de Séjour Étudiant from the Ministry of Interior.",
    "fees": {
      "visa_fee": "$50 (Student Entry Visa)",
      "service_fee": "TND 50 (Annual Student Carte de Séjour)",
      "total_fee": "approx. ₹5,500 Total",
      "notes": "Subsidized residence card fees for international students."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Requires official university admission letter endorsed by the Ministry of Higher Education and Scientific Research.",
    "source": "Ministry of Higher Education and Scientific Research & Ministry of Interior",
    "work_term": "Academic internships and practical coursework permitted",
    "work_break": "Vacation research work",
    "post_study": "Graduates can transition to employment status upon securing an approved corporate work contract",
    "min_funds": "$2,500 - $4,000 annual maintenance or scholarship certificate",
    "acceptance_doc": "Certificat d'Inscription Universitaire",
    "acceptance_desc": "Official enrollment certificate from an accredited Tunisian university."
  },
  "algeria": {
    "overview": "Algeria is home to major research universities including the University of Algiers 1 (Benyoucef Benkhedda, founded 1909), USTHB (University of Science and Technology Houari Boumediene), and University of Constantine. International students obtain a Student Visa (Visa Étudiant) and an annual Carte de Résidence from the Wilaya authorities.",
    "fees": {
      "visa_fee": "$80 (Consular Student Visa)",
      "service_fee": "DZD 2,000 (Wilaya Residence Card)",
      "total_fee": "approx. ₹8,500 Total",
      "notes": "Administered by the Wilaya Police Department."
    },
    "proc_time": "4 to 8 Weeks",
    "proc_details": "Requires ministerial admission certificate (MESRS) and approval by the Ministry of Foreign Affairs.",
    "source": "Ministry of Higher Education and Scientific Research (MESRS) & Ministry of Interior",
    "work_term": "Academic research and university assistantships permitted",
    "work_break": "Vacation research work",
    "post_study": "Graduates can transition to corporate employment upon securing a licensed work permit",
    "min_funds": "$3,000 annual maintenance or state scholarship certificate",
    "acceptance_doc": "Certificat de Pré-inscription / Inscription Universitaire",
    "acceptance_desc": "Official enrollment certificate approved by MESRS in Algiers."
  },
  "uruguay": {
    "overview": "Uruguay is home to Universidad de la República (UdelaR, founded in 1849, the nation's premier public university where undergraduate tuition is tuition-free) and prestigious private universities like Universidad ORT Uruguay. International students obtain a Temporary Student Residence (Residencia Temporal Estudiante) from the Dirección Nacional de Migración.",
    "fees": {
      "visa_fee": "$80 (Student Residence Application)",
      "service_fee": "$20 (Cédula de Identidad)",
      "total_fee": "approx. ₹8,500 Total",
      "notes": "Processed via Dirección Nacional de Migración in Montevideo."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Applied at Migración office in Montevideo with university enrollment certificate.",
    "source": "Dirección Nacional de Migración (DNM) & Ministerio de Educación y Cultura",
    "work_term": "Students can work part-time or full-time with equal labour protections",
    "work_break": "Full-time during semester breaks",
    "post_study": "Graduates can easily transition to employment or permanent residency",
    "min_funds": "$3,000 - $4,500 annual living expense guarantee",
    "acceptance_doc": "Certificado de Matrícula Universitaria",
    "acceptance_desc": "Official enrollment certificate from an accredited Uruguayan university."
  },
  "fiji": {
    "overview": "Fiji is the premier educational hub of the South Pacific, hosting the University of the South Pacific (USP, a regional university co-owned by 12 Pacific nations) and Fiji National University (FNU). International students obtain a Student Permit issued by the Fiji Immigration Department.",
    "fees": {
      "visa_fee": "FJD $250 (Student Permit Application Fee)",
      "service_fee": "FJD $150 (Security Bond / Processing)",
      "total_fee": "approx. ₹15,000 Total",
      "notes": "Administered by the Department of Immigration in Suva."
    },
    "proc_time": "3 to 5 Weeks",
    "proc_details": "Applied online or through university international office with admission confirmation.",
    "source": "Fiji Immigration Department & Ministry of Education",
    "work_term": "Academic internships and campus assistantships authorized",
    "work_break": "Vacation research work",
    "post_study": "Graduates can apply for corporate work permits upon receiving an authorized employment offer",
    "min_funds": "FJD $5,000 - $8,000 per academic year living expenses guarantee",
    "acceptance_doc": "Official University Admission Letter & Fee Invoice",
    "acceptance_desc": "Official enrollment certificate from an accredited tertiary institution in Fiji."
  },
  "panama": {
    "overview": "Panama is home to prestigious regional universities including Universidad de Panamá, Universidad Tecnológica de Panamá (UTP), and Florida State University (FSU Panama branch campus). International students obtain a Temporary Student Visa (Visa de Estudiante) via the Servicio Nacional de Migración.",
    "fees": {
      "visa_fee": "$100 (Student Visa Application)",
      "service_fee": "$50 (Carné de Migración)",
      "total_fee": "approx. ₹12,500 Total",
      "notes": "Administered by Servicio Nacional de Migración in Panama City."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Submitted via a licensed Panamanian immigration attorney with university enrollment proof.",
    "source": "Servicio Nacional de Migración Panamá & Ministry of Education",
    "work_term": "Academic internships permitted under university degree requirements",
    "work_break": "Vacation research work",
    "post_study": "Graduates can apply for SEM or professional work permits upon corporate job offer",
    "min_funds": "$3,000 annual maintenance or institutional scholarship certificate",
    "acceptance_doc": "Certificación de Matrícula Universitaria",
    "acceptance_desc": "Official enrollment certificate from an accredited Panamanian university."
  },
  "dominican-republic": {
    "overview": "The Dominican Republic hosts prestigious Caribbean universities including Universidad Autónoma de Santo Domingo (UASD, the oldest university in the New World, founded 1538), Pontificia Universidad Católica Madre y Maestra (PUCMM), and UNIBE (renowned for international English-medium medical and dental programs). International students obtain a Student Visa (Visa de Estudiante - E) from the Ministry of Foreign Affairs (MIREX).",
    "fees": {
      "visa_fee": "$100 (Consular Student Visa Fee)",
      "service_fee": "DOP 5,000 (DGM Student Carné)",
      "total_fee": "approx. ₹15,000 Total",
      "notes": "Applied at Dominican consulate with university admission letter."
    },
    "proc_time": "3 to 6 Weeks",
    "proc_details": "Submitted via MIREX consular portal and finalized with student ID at DGM in Santo Domingo.",
    "source": "Ministerio de Relaciones Exteriores (MIREX) & Dirección General de Migración (DGM)",
    "work_term": "Academic internships and practical clinical coursework permitted",
    "work_break": "Vacation research work",
    "post_study": "Graduates can apply for work residency upon securing an authorized employment offer",
    "min_funds": "$3,000 annual maintenance or institutional scholarship guarantee",
    "acceptance_doc": "Certificado de Inscripción Universitaria",
    "acceptance_desc": "Official enrollment certificate from a recognized Dominican higher education institution."
  }
}
;

// ── 1. STUDENT OVERVIEW ──
export function getStudentOverview(country: string): string {
  const c = normalizeCountry(country);
  if (DESTS[c]?.overview) return DESTS[c].overview;
  const map: Record<string, string> = {
    'australia': 'The Australian Student Visa (Subclass 500) authorizes international students to undertake full-time higher education, vocational training, or postgraduate research at registered CRICOS academic institutions. Students are permitted to work up to 48 hours per fortnight during university terms and unrestricted hours during scheduled semester breaks. Upon graduation from eligible degrees, students can transition to the Subclass 485 Temporary Graduate Visa for 2 to 4 years of post-study work rights.',
    'uk': 'The UK Student Route Visa permits international students to enroll in full-time degree programs at licensed Student Sponsor Higher Education Providers (HEPs). Students holding a degree-level visa can work up to 20 hours per week during term time and full-time during official vacation periods. Upon successful course completion, graduates can transition to the 2-year Graduate Route Post-Study Work Visa (3 years for PhD/doctoral graduates) with no job sponsorship required.',
    'usa': 'The F-1 Academic Student Visa enables international students to pursue full-time academic degree programs at SEVP-certified colleges, universities, and seminaries across the United States. F-1 students may work on-campus up to 20 hours per week during school terms and full-time during vacations. Following graduation, students qualify for 12 months of Optional Practical Training (OPT), with an additional 24-month STEM OPT extension available for eligible science, technology, engineering, and mathematics degrees (36 months total).',
    'canada': 'The Canadian Study Permit allows international students to pursue academic, professional, or vocational training at Designated Learning Institutions (DLIs) across Canada. Eligible students may work off-campus up to 20 hours per week during regular academic sessions and full-time during scheduled academic breaks. Following graduation from an eligible program, students can obtain a Post-Graduation Work Permit (PGWP) valid for up to 3 years, offering an established pathway to permanent residence via Express Entry.',
    'germany': 'The German National Student Visa (Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at state-accredited German universities. Public universities in 15 of 16 German states offer tuition-free education. Students are legally authorized to work up to 140 full days or 280 half days per calendar year. Following graduation, students can obtain an 18-month Job Seeker Residence Permit to secure qualified employment matching their degree and transition to an EU Blue Card.',
    'france': 'The French Long-Stay Student Visa (VLS-TS) allows international students to enroll in higher education programs at French universities, Grandes Écoles, and specialized institutes. Students are permitted to work up to 60% of the statutory annual working hours (964 hours per year). Following completion of a Master\'s degree or equivalent, graduates can apply for the 12-month Job Search / Business Creation authorization (RECE / APS), allowing them to seek employment or launch an enterprise in France.',
    'ireland': 'The Irish Long Stay Student Visa (Type D) enables international students to undertake full-time higher education programs listed on the Interim List of Eligible Programmes (ILEP). Non-EEA students are granted permission to work up to 20 hours per week during term time and up to 40 hours per week during designated holiday periods (June–September and December 15–January 15). Under the Third Level Graduate Scheme (Stamp 1G), master\'s graduates can stay and work full-time for up to 24 months.',
    'italy': 'The Italian National Student Visa (Type D Studio) enables international students to enroll in undergraduate, master, and doctoral degree programs at Italian universities, polytechnics, and AFAM art academies. International students may legally work part-time up to 20 hours per week (maximum 1,040 hours per calendar year). Following graduation, degree holders can apply for a 12-month Permesso di Soggiorno per Ricerca Lavoro (Job Search Residence Permit) to seek employment matching their qualifications.',
    'new-zealand': 'The New Zealand Fee Paying Student Visa allows international students to study full-time at universities, institutes of technology, and registered private training establishments across New Zealand. Students enrolled in eligible full-time tertiary programs can work up to 20 hours per week during term time and full-time during scheduled academic breaks. Following graduation, students can apply for a Post-Study Work Visa (PSWV) for 1, 2, or 3 years depending on the qualification level and study location.',
    'singapore': 'The Student\'s Pass in Singapore allows international students to undertake approved full-time degree programs at Singapore\'s Institute of Higher Learning (IHLs) including NUS, NTU, SMU, and SUTD. Students at approved public IHLs are permitted to work part-time up to 16 hours per week during term time without a separate work pass and full-time during official vacation periods. Upon graduation, international students from local universities can apply for a 1-year non-renewable Long-Term Visit Pass (LTVP) to seek employment in Singapore.',
    'japan': 'The Japan College Student Visa permits international students to enroll in degree programs at Japanese universities, graduate schools, and Ministry-accredited vocational colleges. Students must apply for and receive a Permission to Engage in Activity other than that Permitted under the Status of Residence Previously Granted (Shikakugaikatsudō) to work up to 28 hours per week during semesters and up to 8 hours per day during official vacations. Following graduation, students can obtain a 6 to 12-month Designated Activities Visa (Tokutei Katsudo) for employment seeking.',
    'austria': 'The Austrian Student Residence Permit (Aufenthaltsbewilligung Student) allows international students to enroll in full-time degree programs at accredited public and private Austrian universities. International students from third countries may work up to 20 hours per week without requiring an extensive labour market test, provided an employment permit (Beschäftigungsbewilligung) is registered by the employer. Following graduation, degree holders can apply for a 12-month Red-White-Red Card for Job Seekers to secure qualified employment.',
    'belgium': 'The Belgian Long-Stay Student Visa (Type D) enables international students to undertake higher education at universities and university colleges (Hautes Écoles) across Flanders, Wallonia, and Brussels. Students are permitted to work up to 20 hours per week during academic semesters and unlimited hours during summer holidays, provided studies remain the primary activity. Under Belgian law, non-EU graduates can apply for a 12-month Search Year (Orientation Year) residence permit to look for employment or start a business.',
    'czech-republic': 'The Czech Long-Term Visa / Residence Permit for Studies allows international students to enroll in accredited degree programs at world-renowned Czech universities such as Charles University and CTU Prague. International students studying in an accredited university program have free access to the Czech labour market with no work permit required. Following graduation from an accredited Czech university, graduates can apply for a 9-month Job Seeker Residence Permit to find qualified employment.',
    'denmark': 'The Danish Student Residence Permit (ST1) allows international students to study at universities and higher education academies in Denmark. Non-EU students are legally permitted to work up to 20 hours per week during the academic year (September to May) and full-time (37 hours per week) during the summer holidays (June, July, and August). Following graduation, students can apply for a 3-year Post-Study Establishment Card to live and work in Denmark without requiring sponsor-based work permits.',
    'finland': 'The Finnish Student Residence Permit allows international students to pursue bachelor, master, and doctoral degree programs at Finnish universities and universities of applied sciences (UAS). Finland offers the world\'s most generous student work rights, permitting up to 30 hours of work per week during the academic term. Following graduation, degree holders can apply for a 2-year Job Search Residence Permit to look for work or start an enterprise.',
    'hungary': 'The Hungarian Long-Term Student Visa (Type D / Residence Permit for Studies) allows international students to enroll in full-time programs at prestigious Hungarian universities. Many Indian students study under the fully funded Stipendium Hungaricum scholarship. Students are entitled to work up to 24 hours per week during semester time and up to 66 days or 90 days per year outside semester periods. Graduates can transition to the 9-month Study-to-Work Residence Permit to seek employment in Hungary.',
    'iceland': 'The Icelandic Student Residence Permit allows international students to undertake full-time higher education at recognized universities in Iceland (such as the University of Iceland and Reykjavik University). Non-EEA students must apply for a specific student work permit to work up to 15 hours per week during the academic semester, with full-time work permitted during summer vacations. Following graduation, international students can obtain a 6-month residence permit to seek employment in Iceland.',
    'norway': 'The Norwegian Student Residence Permit allows international students to enroll in full-time bachelor, master, and doctoral programs at Norwegian universities. International students are permitted to work part-time up to 20 hours per week during academic semesters and full-time during official semester breaks. Following graduation from a Norwegian university or college, students can apply for a 1-year Job Seeker Residence Permit to seek employment as a skilled worker.',
    'poland': 'The Polish National Visa for Studies (Type D) enables international students to pursue degree programs at universities across Poland. Poland has become a major Central European educational hub with affordable tuition and living costs. Full-time international students studying at accredited Polish universities have the legal right to work without a separate work permit during their studies. Graduates can apply for a 9-month Temporary Residence Permit for Job Seekers following course completion.',
    'portugal': 'The Portuguese National Student Visa (Type D4 / D5) enables international students to undertake higher education at universities and polytechnics across Portugal. International students are permitted to work up to 20 hours per week during term time and full-time during holidays, subject to notifying the immigration authorities (AIMA). After graduation, international students from Portuguese universities can apply for a 1-year Temporary Residence Permit for Job Searching to secure skilled employment.',
    'sweden': 'The Swedish Residence Permit for Higher Education allows international students to enroll in degree programs at Swedish universities. Sweden offers an exceptional innovation and research ecosystem. International students in Sweden enjoy unrestricted work rights with no legal cap on weekly hours, provided they maintain satisfactory progress and attend mandatory classes. Following graduation, students can apply for a 12-month Residence Permit for Looking for Work or Starting a Business.',
    'switzerland': 'The Swiss National Visa for Study (National Visa Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at top-ranked Swiss universities and Federal Institutes of Technology (ETH Zurich, EPFL). International students from non-EU/EFTA countries may work up to 15 hours per week during semesters, but only after completing 6 months of study in Switzerland; full-time work is permitted during semester vacations. Graduates can apply for a 6-month residence permit to seek employment in Switzerland.',
    'turkey': 'The Turkish Student Residence Permit (Öğrenci İkamet İzni) allows international students to enroll in associate, bachelor, master, and doctoral degree programs at Turkish universities under the Council of Higher Education (YÖK). Master\'s and PhD students are legally permitted to work part-time in accordance with Turkish labour regulations. Following completion of an undergraduate or postgraduate degree, graduates can apply for a short-term residence permit for job seeking or business establishment.',
    'argentina': 'The Argentine Student Visa (Residencia Temporaria por Estudio) allows international students to study at universities and higher institutes across Argentina (such as the University of Buenos Aires - UBA). Public higher education is tuition-free for undergraduate studies in Argentina. International students on a temporary study residence permit have the legal right to work in Argentina with equal labour protections. Following graduation, students can transition to professional work permits or permanent residency.',
    'netherlands': 'The Dutch Student Visa (MVV) and Residence Permit (VVR) allows international students to study at Dutch research universities and universities of applied sciences. Students may work part-time up to 16 hours per week during term time (requiring a TWV work permit filed by the employer) or full-time during the summer months (June to August). Under Dutch law, graduates can apply for a 1-year Orientation Year Visa (Zoekjaar) within 3 years of graduating to seek employment without sponsor salary minimums.',
  };
  return map[c] || `The Student Visa allows international students to reside in ${country} for the full duration of their academic program to undertake full-time higher education, vocational training, or research. You must maintain enrolment and comply with visa conditions.`;
}

// ── 2. STUDENT FEES ──
export function getStudentFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  if (DESTS[c]?.fees) return DESTS[c].fees;
  const map: Record<string, any> = {
    'australia': { visa_fee: 'AUD 1,600 (approx. ₹88,000)', service_fee: '₹1,650 (VFS Global ABCC Biometrics)', total_fee: 'AUD 1,600 Base Application Charge', notes: 'Paid online via ImmiAccount. Excludes mandatory Overseas Student Health Cover (OSHC) of AUD 600-900/year and Bupa medical examinations.' },
    'uk': { visa_fee: '£490 (approx. ₹52,400)', service_fee: '£776/year (Immigration Health Surcharge - IHS)', total_fee: '£1,266+ (Visa £490 + Annual IHS £776)', notes: 'Paid online on GOV.UK. Mandatory IHS covers full NHS healthcare access during studies. Priority visa processing (+£500 for 5 days) available.' },
    'usa': { visa_fee: 'USD $185 (MRV Visa Fee - approx. ₹15,540)', service_fee: 'USD $350 (I-901 SEVIS Fee)', total_fee: 'USD $535 Total Statutory Reference', notes: 'SEVIS fee must be paid online via FMJfee.com prior to scheduling the consular interview. MRV visa fee is paid via the US Visa Scheduling portal.' },
    'canada': { visa_fee: 'CAD $150 (approx. ₹9,300)', service_fee: 'CAD $85 (Biometrics Fee)', total_fee: 'CAD $235 Total Government Charge', notes: 'Paid online via IRCC secure portal. Living expenses must be demonstrated through a Guaranteed Investment Certificate (GIC) of CAD $20,635.' },
    'germany': { visa_fee: '€75 (approx. ₹6,750)', service_fee: '₹18,000 (APS Verification) + ₹2,500 VFS logistics', total_fee: 'approx. ₹27,250 Total Consular Reference', notes: 'APS certificate verification by the Academic Evaluation Centre New Delhi is mandatory prior to visa submission. Visa fee waived for German government scholars.' },
    'france': { visa_fee: '€50 (approx. ₹4,500)', service_fee: '₹16,500 (Campus France EEF Processing) + VFS Logistics', total_fee: 'approx. ₹23,500 Total Statutory Reference', notes: 'Applicants must complete the mandatory Études en France (EEF) Campus France interview before lodging the visa file at VFS France.' },
    'ireland': { visa_fee: '€60 (Single Entry) / €100 (Multiple Entry)', service_fee: '€300 (Irish Residence Permit - IRP Card registration on arrival)', total_fee: '€360 – €400 Total Reference', notes: 'Paid online via AVATS portal. IRP registration fee (€300) is paid inside Ireland upon appointment with the Immigration Service Delivery (ISD).' },
    'italy': { visa_fee: '€50 (National Study Visa Fee)', service_fee: '€30 (VFS Global Service Fee) + €16 stamp duty (Marca da Bollo)', total_fee: 'approx. ₹8,500 Consular Total Reference', notes: 'Pre-enrolment must be completed online on the Universitaly portal. Declaration of Value (DOV) or CIMEA Statement of Comparability is mandatory for academic recognition.' },
    'new-zealand': { visa_fee: 'NZD $430 (approx. ₹21,500)', service_fee: 'NZD $35 (Immigration Levy)', total_fee: 'NZD $465 Total Reference', notes: 'Paid online via Immigration New Zealand Immigration Online portal. Excludes approved medical chest X-ray and full medical examination fees.' },
    'singapore': { visa_fee: 'SGD $30 (Application Processing Fee)', service_fee: 'SGD $60 (Issuance Fee) + SGD $30 (Multiple Journey Visa if applicable)', total_fee: 'SGD $90 – $120 Total Reference', notes: 'Paid online via the ICA SOLAR portal. Security deposit or medical examination may be requested by ICA depending on nationality.' },
    'japan': { visa_fee: '3,000 JPY (Single Entry - approx. ₹1,700)', service_fee: '₹750 – ₹1,200 (VFS Global Processing Fee)', total_fee: 'approx. ₹2,700 Total Reference', notes: 'The admitting Japanese university first secures the Certificate of Eligibility (COE) from regional immigration authorities in Japan before consular visa stamping in India.' },
    'austria': { visa_fee: '€160 (€120 application fee + €20 grant fee + €20 police fee)', service_fee: '€30 (VFS Service Fee)', total_fee: '€190 Total Reference (approx. ₹17,100)', notes: 'Initial application submitted through Austrian Embassy in New Delhi / VFS Global. Final biometric residence card issued in Austria by the local magistrate (MA 35 in Vienna).' },
    'belgium': { visa_fee: '€180 (Visa D Application Fee)', service_fee: '€235 (Federal Administrative Fee paid to Immigration Office DOFI)', total_fee: '€415 Total Reference (approx. ₹37,500)', notes: 'The federal administrative contribution (€235) must be paid directly into the Belgian Immigration Office bank account before lodging the visa application at VFS Belgium.' },
    'czech-republic': { visa_fee: 'CZK 2,500 (approx. €100 / ₹9,000)', service_fee: 'CZK 500 – 1,000 (VFS Global Processing Fee)', total_fee: 'approx. ₹10,500 Total Reference', notes: 'All non-Czech documents (police clearance, birth certificate) must be super-legalized or apostilled and accompanied by an official certified Czech translation.' },
    'denmark': { visa_fee: 'DKK 2,490 (approx. ₹30,000 - SIRI Case Order Fee)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: 'DKK 2,490 + VFS Service Fee', notes: 'Case Order ID must be created on newtodenmark.dk and the statutory SIRI fee paid online before submitting biometric data at VFS Denmark.' },
    'finland': { visa_fee: '€350 (Electronic Application via Enter Finland)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: '€380 Total Reference (approx. ₹34,200)', notes: 'Application is lodged online via the Enter Finland portal (enterfinland.fi). Private health insurance covering at least €120,000 in medical costs is required.' },
    'hungary': { visa_fee: '€110 (Residence Permit Application Fee)', service_fee: '€30 (VFS Global Processing Fee)', total_fee: '€140 Total Reference (approx. ₹12,600)', notes: 'Visa D serves as an entry vignette valid for 30 days. The physical Residence Permit card is collected upon arrival at the National Directorate-General for Aliens Policing (OIF).' },
    'iceland': { visa_fee: 'ISK 15,000 (approx. €100 / ₹9,000)', service_fee: '€30 (VFS Service Fee)', total_fee: 'approx. ₹11,700 Total Reference', notes: 'Application must be submitted to the Directorate of Immigration (Útlendingastofnun) in Iceland before arriving. Criminal record certificate apostilled or legalized is mandatory.' },
    'norway': { visa_fee: 'NOK 6,500 (approx. ₹51,000)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: 'NOK 6,500 + VFS Service Fee', notes: 'Living expenses (NOK 151,690/year) must be deposited into the Norwegian university\'s student deposit bank account prior to visa issuance.' },
    'poland': { visa_fee: '€90 (National Visa D Application Fee)', service_fee: '€15 (VFS Global Processing Fee)', total_fee: '€105 Total Reference (approx. ₹9,450)', notes: 'Application is registered online on the official e-Konsulat platform (e-konsulat.gov.pl) and lodged at VFS Global Poland in India.' },
    'portugal': { visa_fee: '€90 (National Long-Stay Visa D Fee)', service_fee: '€30 (VFS Global Service Fee)', total_fee: '€120 Total Reference (approx. ₹10,800)', notes: 'The D-visa is a 4-month double-entry visa; upon arrival in Portugal, students attend an appointment at AIMA (Agency for Integration, Migration and Asylum) to obtain their residence permit card.' },
    'sweden': { visa_fee: 'SEK 1,500 (approx. ₹12,000)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: 'SEK 1,500 + VFS Service Fee', notes: 'Applied online directly via the Swedish Migration Agency (Migrationsverket) portal before biometric capture at VFS Sweden.' },
    'switzerland': { visa_fee: '€90 (National Visa D Application Fee)', service_fee: 'CHF 100 – 250 (Cantonal Migration Authorization Fee upon arrival)', total_fee: 'approx. ₹18,000 – ₹25,000 Total Reference', notes: 'Visa application is lodged at VFS Switzerland in India. The cantonal migration office in Switzerland evaluates and approves the student residence permit.' },
    'turkey': { visa_fee: 'USD $60 (approx. ₹5,100)', service_fee: '₹3,500 (Gateway Globe VAC Service Fee)', total_fee: 'approx. ₹8,600 Total Reference', notes: 'Initial Student Visa sticker is obtained through Gateway Globe in India. Upon arrival, students register for the Öğrenci İkamet İzni through the e-Ikamet portal.' },
    'argentina': { visa_fee: 'USD $150 (Consular Visa Fee)', service_fee: 'ARS $10,000 – $20,000 (DGM Immigration Entry Fee on arrival)', total_fee: 'approx. ₹15,000 Total Reference', notes: 'The university in Argentina must register the student on the SINEP / DGM platform before visa issuance at the Embassy of Argentina in New Delhi.' },
    'netherlands': { visa_fee: '€228 (IND Student Residence Permit Fee)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: '€258 Total Reference (approx. ₹23,200)', notes: 'The admitting Dutch university submits the MVV/VVR application directly to the Immigration and Naturalisation Service (IND) on the student\'s behalf.' },
  };
  return map[c] || { visa_fee: 'Official Statutory Fee', service_fee: 'VAC Logistics Fee', total_fee: 'Statutory Fee + Logistics', notes: 'Check official embassy portal.' };
}

// ── 3. STUDENT PROCESSING TIME ──
export function getStudentProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  if (DESTS[c]?.proc_time) return DESTS[c].proc_time;
  const map: Record<string, string> = {
    'australia': '4 to 8 Weeks (Standard Higher Education Sector)',
    'uk': '3 Weeks (15 Working Days) Standard Processing',
    'usa': 'Consular Decision at Interview Window (Passport return in 3-5 Business Days)',
    'canada': '6 to 10 Weeks (Standard Assessment Timeline)',
    'germany': '4 to 8 Weeks from Document Submission at VFS Global',
    'france': '2 to 4 Weeks following Campus France Interview and VFS submission',
    'ireland': '4 to 8 Weeks from Document Submission at VFS Ireland',
    'italy': '3 to 6 Weeks following VFS submission and Consular review',
    'new-zealand': '4 to 6 Weeks from Online Submission',
    'singapore': '10 to 15 Working Days (via ICA SOLAR system)',
    'japan': '5 to 7 Working Days (following COE issuance in Japan)',
    'austria': '8 to 12 Weeks from Document Lodgement',
    'belgium': '4 to 8 Weeks from Physical Submission at VFS Global',
    'czech-republic': '60 Calendar Days statutory consular SLA',
    'denmark': '2 Months (60 Days) from Biometric Capture',
    'finland': '1 to 2 Months from Biometric Verification at VFS Global',
    'hungary': '15 to 30 Calendar Days from Consular Submission',
    'iceland': '6 to 12 Weeks from Complete Dossier Receipt',
    'norway': '2 Months (8 Weeks) from Biometric Submission',
    'poland': '15 to 30 Calendar Days from Consular Receipt',
    'portugal': '30 to 60 Calendar Days from Lodgement',
    'sweden': '2 to 3 Months from Online Submission',
    'switzerland': '8 to 12 Weeks from Consular Lodgement',
    'turkey': '15 to 25 Working Days from Gateway Globe Submission',
    'argentina': '3 to 6 Weeks from Consular Lodgement',
    'netherlands': '2 to 4 Weeks (Fast-Track University Filing)',
  };
  return map[c] || '4 to 8 Weeks (Standard Consular Assessment)';
}

// ── 4. STUDENT PROCESSING DETAILS ──
export function getStudentProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  if (DESTS[c]?.proc_details) return DESTS[c].proc_details;
  const map: Record<string, string> = {
    'australia': 'Applications are processed under the simplified student visa framework (SSVF). Lodging with a Confirmation of Enrolment (CoE) and evidence of Genuine Student (GS) intent accelerates assessment.',
    'uk': 'UKVI standard processing is 3 weeks following biometric capture at VFS Global. Priority (5 days) and Super Priority (next business day) services are optional.',
    'usa': 'Requires a two-stage in-person appointment in India: Biometrics at a Visa Application Center (VAC) followed by an in-person consular interview at a US Embassy or Consulate.',
    'canada': 'Processed online via the IRCC portal. Provincial Attestation Letter (PAL) is mandatory for post-secondary undergraduate applications.',
    'germany': 'Processed by the German Embassy in New Delhi and Consulates General in Mumbai, Bengaluru, Chennai, and Kolkata following local foreigners authority (Ausländerbehörde) clearance.',
    'france': 'Two-tier verification: Academic interview with Campus France India followed by consular review and biometric capture through VFS Global France.',
    'ireland': 'Processed by the Embassy of Ireland in New Delhi. Ireland is NOT a Schengen member; visa requires direct national clearance.',
    'italy': 'Submitted via VFS Global Italy after pre-enrolment approval on the Universitaly portal by the Italian university.',
    'new-zealand': '100% digital application processed through Immigration New Zealand\'s Immigration Online platform. Electronic eVisa issued upon approval.',
    'singapore': 'Two-step digital process: The admitting educational institution files the SOLAR application, followed by the student submitting eForm 16 online.',
    'japan': 'Two phases: Phase 1 is Certificate of Eligibility (COE) processing in Japan (takes 2-3 months); Phase 2 is consular visa sticker processing at VFS Japan in India (takes 1 week).',
    'austria': 'Application dossier is transmitted from the Austrian Embassy in New Delhi to the responsible municipal authority (Magistrat / Bezirkshauptmannschaft) in Austria for adjudication.',
    'belgium': 'Processed by the Belgian Immigration Office (Dienst Vreemdelingenzaken / Office des Étrangers) in Brussels.',
    'czech-republic': 'Processed by the Department for Asylum and Migration Policy (OAMP) of the Ministry of the Interior of the Czech Republic.',
    'denmark': 'Processed electronically by the Danish Agency for International Recruitment and Integration (SIRI).',
    'finland': 'Processed digitally by the Finnish Immigration Service (Migri) via Enter Finland.',
    'hungary': 'Processed by the National Directorate-General for Aliens Policing (OIF) in Hungary via Hungarian consular missions in India.',
    'iceland': 'Adjudicated directly by the Directorate of Immigration (Útlendingastofnun) in Iceland.',
    'norway': 'Applied online via the UDI Application Portal (udi.no) followed by physical document submission at VFS Norway.',
    'poland': 'Processed by the Consular Section of the Embassy of the Republic of Poland in New Delhi.',
    'portugal': 'Processed by the Consular Section of the Embassy of Portugal in New Delhi in coordination with AIMA in Lisbon.',
    'sweden': 'Processed centrally by the Swedish Migration Agency (Migrationsverket) in Sweden.',
    'switzerland': 'Tri-level review: Swiss Consulate in India reviews dossier, transmits to the Cantonal Migration Authority (e.g. Zurich, Vaud, Geneva), with federal approval by SEM.',
    'turkey': 'Processed by the Turkish Embassy in New Delhi and General Consulates in Mumbai/Hyderabad.',
    'argentina': 'Processed by the Consular Section of the Embassy of the Argentine Republic in New Delhi.',
    'netherlands': 'The Dutch university files the TEV (entry and residence) application directly with IND in the Netherlands.',
  };
  return map[c] || 'Processing timelines depend on intake volume, completeness of academic documentation, and consular review.';
}

// ── 5. STUDENT ENTRY TYPE ──
export function getStudentEntryType(country: string): string {
  return 'Multiple Entry (Academic Duration)';
}

export function getStudentEntryDetails(country: string): string {
  return 'Authorized for multiple entries throughout the valid period of study and approved academic vacation breaks.';
}

// ── 6. STUDENT VALIDITY & STAY ──
export function getStudentValidity(country: string): string {
  return 'Duration of Academic Program + 2 to 4 Months';
}

export function getStudentValidityDetails(country: string): string {
  return 'Valid for the full registered length of your higher education degree, plus grace period for graduation and visa transition.';
}

export function getStudentStayDuration(country: string): string {
  return 'Full Course Duration (Maintained Enrolment)';
}

export function getStudentStayDetails(country: string): string {
  return 'Authorized to remain in-country as long as you maintain full-time student status and satisfactory academic progress.';
}

// ── 7. OFFICIAL SOURCE NAME ──
export function getStudentOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  if (DESTS[c]?.source) return DESTS[c].source;
  const map: Record<string, string> = {
    'australia': 'Department of Home Affairs (ImmiAccount) / VFS Global Australia',
    'uk': 'UK Visas and Immigration (UKVI / GOV.UK) / VFS Global',
    'usa': 'U.S. Department of State / US Embassy & Consulates in India',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC) / VFS Global',
    'germany': 'German Federal Foreign Office / German Missions in India & VFS Global',
    'france': 'Campus France India & Ministry of the Interior (France-Visas) / VFS Global',
    'ireland': 'Immigration Service Delivery (ISD / AVATS) / Embassy of Ireland & VFS Global',
    'italy': 'Ministry of Foreign Affairs and International Cooperation (MAECI / Universitaly) / VFS Global',
    'new-zealand': 'Immigration New Zealand (INZ / Immigration Online)',
    'singapore': 'Immigration & Checkpoints Authority (ICA Singapore / SOLAR System)',
    'japan': 'Immigration Services Agency of Japan (MOJ) / Embassy of Japan & VFS Global',
    'austria': 'Austrian Federal Ministry of the Interior (BMI / OeAD) / Austrian Embassy & VFS Global',
    'belgium': 'Belgian Immigration Office (DOFI) / Embassy of Belgium & VFS Global',
    'czech-republic': 'Ministry of the Interior of the Czech Republic (MOI / OAMP) / Czech Embassy & VFS Global',
    'denmark': 'Danish Agency for International Recruitment and Integration (SIRI) / VFS Global',
    'finland': 'Finnish Immigration Service (Migri / Enter Finland) / VFS Global',
    'hungary': 'National Directorate-General for Aliens Policing (OIF) / Hungarian Embassy & VFS Global',
    'iceland': 'Directorate of Immigration Iceland (Útlendingastofnun) / Danish Embassy (Representation)',
    'norway': 'Norwegian Directorate of Immigration (UDI) / Royal Norwegian Embassy & VFS Global',
    'poland': 'Ministry of Foreign Affairs of Poland (e-Konsulat) / VFS Global',
    'portugal': 'Agency for Integration, Migration and Asylum (AIMA) / Embassy of Portugal & VFS Global',
    'sweden': 'Swedish Migration Agency (Migrationsverket) / Embassy of Sweden & VFS Global',
    'switzerland': 'State Secretariat for Migration (SEM) & Cantonal Migration Offices / VFS Global Switzerland',
    'turkey': 'Presidency of Migration Management (GÖÇ / e-Ikamet) / Gateway Globe',
    'argentina': 'National Directorate of Migration (DGM / Migraciones Argentina) / Embassy of Argentina',
    'netherlands': 'Immigration and Naturalisation Service (IND) / Dutch Ministry of Foreign Affairs & VFS Global',
  };
  return map[c] || `${country} Ministry of Foreign Affairs / Immigration Department`;
}

// ── 8. FINANCIAL PROOFS ──
export function getStudentFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c] || DESTS['germany'];
  return [
    { type: 'Living Expenses Maintenance', minimum_balance_or_amount: d.min_funds, time_frame: 'Held for past 28 days to 6 months', notes: 'Original bank statement with bank seal, certificate of deposit, or approved blocked account.' },
    { type: 'Tuition Fee Proof / Receipt', minimum_balance_or_amount: '1st Academic Year Tuition Fee', time_frame: 'Prior to visa lodgement', notes: 'Official fee payment receipt issued by the admitting educational institution.' },
    { type: 'Education Loan Sanction Letter', minimum_balance_or_amount: 'Covers full tuition and living shortfall', time_frame: 'Current academic year', notes: 'Sanction letter from a scheduled commercial bank confirming unencumbered disbursement.' },
    { type: 'Sponsor\'s Income Tax Returns (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 Assessment Years', time_frame: 'Assessment years 2022-2025', notes: 'Accompanied by Affidavit of Financial Support from parents/primary sponsors.' }
  ];
}

// ── 9. OTHER REQUIREMENTS ──
export function getStudentOtherRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return [
    { category: 'Academic Acceptance', details: d ? `${d['acceptance_doc']} from an accredited university.` : 'Unconditional acceptance letter from an accredited education provider.' },
    { category: 'Financial Solvency', details: d ? `Proof of living expenses (${d['min_funds']}) and tuition coverage.` : 'Verifiable proof of liquid funds covering full tuition and living expenses.' },
    { category: 'Language Proficiency', details: 'Official standardized test score report (IELTS Academic, TOEFL iBT, PTE Academic, or official language waiver).' },
    { category: 'Health Insurance & Integrity', details: 'Comprehensive international student medical coverage, medical chest X-ray, and Police Clearance Certificate (PCC).' }
  ];
}

// ── 10. STEPS TO APPLY ──
export function getStudentVisaSteps(countryOrFrom: string, maybeCountry?: string): string[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = country;
  const portal = d ? d['source'] : 'Official Government Visa Portal';
  const doc = d ? d['acceptance_doc'] : 'Confirmation of Enrolment';
  const funds = d ? d['min_funds'] : 'statutory living allowance';
  return [
    `Secure Academic Admission: Obtain unconditional offer letter and official acceptance document (${doc}) from your chosen institution in ${cname}.`,
    `Arrange Financial Proofs: Deposit required statutory living funds (${funds}) into a blocked account, personal bank account, or secure a bank education loan sanction.`,
    `Clear Health & Background Checks: Undergo designated panel physician medical examinations and obtain a Police Clearance Certificate (PCC) from the Regional Passport Office (RPO).`,
    `Complete Online Application: Complete the official student visa application via ${portal} and upload certified copies of all academic transcripts, SOP, and financial proofs.`,
    `Book & Attend Biometrics Appointment: Schedule and attend your biometric appointment at the designated Visa Application Center (VFS Global / Consular section) to provide fingerprints and digital photo.`,
    `Attend Consular Interview (if applicable): Articulate your genuine student intent, course curriculum choice, and future career plans during the consular visa interview.`,
    `Collect Passport & Prepare Travel: Upon visa vignette approval or electronic grant notice, verify visa details, purchase flight tickets, and finalize student accommodation in ${cname}.`,
    `Arrive & Register: Upon arrival, register your local address with the municipal foreign registration authority to receive your biometric residence permit card.`
  ];
}

// ── 11. DOCUMENTS REQUIRED ──
export function getStudentDocuments(countryOrFrom: string, maybeCountry?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d['acceptance_doc'] : 'University Acceptance Letter';
  const doc_desc = d ? d['acceptance_desc'] : 'Unconditional admission confirmation issued by accredited educational institution.';
  const funds = d ? d['min_funds'] : 'statutory living allowance';
  return [
    { title: 'Valid Passport', description: 'Original passport valid for at least 6-12 months beyond intended stay with at least 2 blank visa pages.', is_mandatory: true },
    { title: doc, description: doc_desc, is_mandatory: true },
    { title: 'Academic Certificates & Transcripts', description: 'Original degree certificates, mark sheets (Class 10th, 12th, Bachelor\'s), and provisional certificates.', is_mandatory: true },
    { title: 'English / Language Proficiency Score Report', description: 'Official score report (IELTS Academic, TOEFL iBT, PTE, Duolingo, or institutional language waiver).', is_mandatory: true },
    { title: 'Proof of Financial Means / Maintenance', description: `Verifiable proof of living funds (${funds}) via bank statements, loan sanction letter, or blocked account.`, is_mandatory: true },
    { title: 'Tuition Fee Payment Receipt', description: 'Official university fee receipt or transfer receipt confirming 1st semester/annual tuition payment.', is_mandatory: true },
    { title: 'Statement of Purpose (SOP) / Motivation Letter', description: 'Comprehensive personal statement explaining course selection, academic background, and post-study career trajectory.', is_mandatory: true },
    { title: 'Letters of Recommendation (LORs) & CV', description: 'Two academic or professional recommendation letters along with an updated academic curriculum vitae.', is_mandatory: true },
    { title: 'Student Health & Medical Insurance', description: 'Valid international student health insurance policy covering emergency hospitalization, medical evacuation, and repatriation.', is_mandatory: true },
    { title: 'Biometric Passport Photographs', description: 'Recent color photographs meeting specific consular biometric dimensions on white/light grey background.', is_mandatory: true }
  ];
}

// ── 12. FAQS ──
export function getStudentFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = country;
  const work_term = d ? d['work_term'] : 'up to 20 hours per week';
  const work_break = d ? d['work_break'] : 'full-time during official vacation breaks';
  const post_study = d ? d['post_study'] : '1 to 2 years post-study work rights';
  const min_funds = d ? d['min_funds'] : 'statutory living maintenance';
  return [
    { question: `Can international students work part-time while studying in ${cname}?`, answer: `Yes, international students are permitted to work ${work_term} during academic terms and ${work_break} during scheduled semester breaks.` },
    { question: `What post-study work rights are available after graduating in ${cname}?`, answer: `Graduates of eligible higher education degree programs can apply for post-study work authorization for ${post_study} without requiring initial employer sponsorship.` },
    { question: `What are the financial maintenance proof requirements for a ${cname} student visa?`, answer: `You must demonstrate minimum financial resources covering ${min_funds} through personal or sponsor bank accounts, official education loan sanctions, or an approved blocked deposit account.` },
    { question: `Can I bring my spouse or dependents on a student visa to ${cname}?`, answer: `Spouse and dependent accompaniment is generally permitted for students enrolled in postgraduate research programs (Master\'s research or PhD), allowing spouses full work authorization in most destinations.` },
    { question: `What happens if my ${cname} student visa application is refused?`, answer: `You will receive an official refusal letter detailing specific reasons (e.g. financial sufficiency, genuine student intent). You have the right to request an administrative review, file a consular appeal within 15-30 days, or submit a fresh application addressing the refusal points.` }
  ];
}

// ── 13. COMPLETE STUDENT VISA DATA BUILDER ──
export function getStudentVisaData(
  from: string,
  to: string,
  purpose: string = 'Higher Education / Studies'
): StructuredVisaRequirements {
  const fromNorm = normalizeCountry(from);
  if (fromNorm && fromNorm !== 'india') {
    const pureRoute = resolvePureRouteStudent(from, to);
    if (pureRoute) return pureRoute as any;
  }

  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getStudentOfficialSourceName(to);
  const procTime = getStudentProcessingTime(to);
  const procDetails = getStudentProcessingDetails(to);
  const val = getStudentValidity(to);
  const stay = getStudentStayDuration(to);
  const entryType = getStudentEntryType(to);
  const fees = getStudentFees(to);
  const faqs = getStudentFAQ(to);
  const docs = getStudentDocuments(to);
  const steps = getStudentVisaSteps(to);
  const reqs = getStudentOtherRequirements(to);
  const proofs = getStudentFinancialProofs(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Higher Education / Studies',
    visa_type: `${countryName} Student Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' student visa official consular requirements')}`,
    official_source_name: officialSource,
    overview: getStudentOverview(to),
    how_to_apply: steps,
    documents_required: docs,
    costs: fees,
    processing_time: procTime,
    processing_time_details: procDetails,
    other_requirements: reqs,
    financial_proofs: proofs,
    faqs: faqs,
    validity: val,
    validity_details: getStudentValidityDetails(to),
    stay_duration: stay,
    stay_duration_details: getStudentStayDetails(to),
    entry_type: entryType,
    entry_type_details: getStudentEntryDetails(to),
    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },
    processing_and_timing: {
      apply_window: 'Apply 2 to 3 months prior to academic program start date.',
      decision_time: procTime,
      max_extension: 'Renewable annually in-country based on satisfactory academic progression.',
      center_notes: `${officialSource}. Verify mandatory appointment slots and biometrics deadlines.`
    }
  };
}

export const getOfficialSourceName = getStudentOfficialSourceName;

