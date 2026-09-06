// src/lib/pure-routes.ts
/**
 * TravlTik — Pure Route Implementation (Non-India Origins & Bilateral Corridors)
 * Supports high-traffic corridors (USA->UK, UK->USA, Canada->Australia, etc.),
 * regional freedom of movement (EU/EEA, GCC, ASEAN), and global origin passports.
 */

import { cleanCountryName, isDestination, SCHENGEN_COUNTRIES, GCC_COUNTRIES } from './country-matching';

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview: string;
  highlights: Array<{ icon: string; title: string; description: string }>;
  how_to_apply: string[];
  documents_required: Array<{ title: string; description: string; is_mandatory: boolean }>;
  costs: { visa_fee: string; service_fee: string; total_fee: string; notes: string };
  processing_time: string;
  processing_time_details: string;
  other_requirements: Array<{ category: string; details: string }>;
  financial_proofs: Array<{ type: string; minimum_balance_or_amount: string | null; time_frame: string; notes: string }>;
  faqs: Array<{ question: string; answer: string }>;
  validity: string;
  validity_details: string;
  stay_duration: string;
  stay_duration_details: string;
  entry_type: string;
  entry_type_details: string;
  validity_and_stay?: { visa_validity: string; max_stay_per_entry: string; entry_type: string };
  processing_and_timing?: { apply_window: string; decision_time: string; max_extension: string; center_notes?: string };
}

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

export const ORIGINS: string[] = [
  'afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'argentina',
  'armenia', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain',
  'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin',
  'bhutan', 'bolivia', 'bosnia', 'botswana', 'brazil', 'brunei',
  'bulgaria', 'burkina-faso', 'burundi', 'cabo-verde', 'cambodia', 'cameroon',
  'canada', 'car', 'chad', 'chile', 'china', 'colombia',
  'comoros', 'congo', 'costa-rica', 'croatia', 'cuba', 'cyprus',
  'czech-republic', 'denmark', 'djibouti', 'dominican-republic', 'drc', 'ecuador',
  'egypt', 'el-salvador', 'equatorial-guinea', 'eritrea', 'estonia', 'eswatini',
  'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'gambia',
  'georgia', 'germany', 'ghana', 'greece', 'guatemala', 'guinea',
  'guinea-bissau', 'guyana', 'haiti', 'honduras', 'hong-kong', 'hungary',
  'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland',
  'israel', 'italy', 'ivory-coast', 'jamaica', 'japan', 'jordan',
  'kazakhstan', 'kenya', 'kiribati', 'kosovo', 'kuwait', 'kyrgyzstan',
  'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya',
  'liechtenstein', 'lithuania', 'luxembourg', 'macau', 'madagascar', 'malawi',
  'malaysia', 'maldives', 'mali', 'malta', 'marshall-islands', 'mauritania',
  'mauritius', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia',
  'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru',
  'nepal', 'netherlands', 'new-zealand', 'nicaragua', 'niger', 'nigeria',
  'north-korea', 'north-macedonia', 'norway', 'oman', 'pakistan', 'palau',
  'palestine', 'panama', 'papua-new-guinea', 'paraguay', 'peru', 'philippines',
  'poland', 'portugal', 'puerto-rico', 'qatar', 'romania', 'russia',
  'rwanda', 'samoa', 'san-marino', 'sao-tome', 'saudi-arabia', 'senegal',
  'serbia', 'seychelles', 'sierra-leone', 'singapore', 'slovakia', 'slovenia',
  'solomon-islands', 'somalia', 'south-africa', 'south-korea', 'south-sudan', 'spain',
  'sri-lanka', 'sudan', 'suriname', 'sweden', 'switzerland', 'syria',
  'taiwan', 'tajikistan', 'tanzania', 'thailand', 'timor-leste', 'togo',
  'tonga', 'trinidad', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu',
  'uae', 'uganda', 'uk', 'ukraine', 'uruguay', 'usa',
  'uzbekistan', 'vanuatu', 'vatican-city', 'venezuela', 'vietnam', 'yemen',
  'zambia', 'zimbabwe',
];


export function isPureRoute(from: string): boolean {
  const norm = normalizeCountry(from);
  return norm !== 'india' && (ORIGINS.includes(norm) || norm.length > 0);
}

export function getPureRouteData(from: string, to: string, purpose: string = 'Tourism'): any {
  const p = (purpose || 'tourism').toLowerCase();
  if (p.includes('student') || p.includes('study') || p.includes('education')) {
    return resolvePureRouteStudent(from, to);
  }
  if (p.includes('work') || p.includes('job') || p.includes('employment')) {
    return resolvePureRouteWork(from, to);
  }
  if (p.includes('business')) {
    return resolvePureRouteBusiness(from, to);
  }
  if (p.includes('pr') || p.includes('permanent')) {
    return resolvePureRoutePR(from, to);
  }
  if (p.includes('family') || p.includes('spouse')) {
    return resolvePureRouteFamily(from, to);
  }
  return resolvePureRouteTourism(from, to);
}


export function isEUMember(slug: string): boolean {
  return [
    'germany', 'france', 'italy', 'spain', 'netherlands', 'belgium', 'austria',
    'sweden', 'denmark', 'finland', 'ireland', 'portugal', 'greece', 'poland',
    'czech-republic', 'hungary', 'romania', 'bulgaria', 'croatia', 'slovakia',
    'slovenia', 'estonia', 'latvia', 'lithuania', 'cyprus', 'malta', 'luxembourg'
  ].includes(slug);
}

export function isSchengenMember(slug: string): boolean {
  return isEUMember(slug) || ['switzerland', 'norway', 'iceland', 'liechtenstein'].includes(slug);
}

export function isGCCMember(slug: string): boolean {
  return ['uae', 'saudi-arabia', 'qatar', 'kuwait', 'bahrain', 'oman'].includes(slug);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. PURE ROUTE TOURISM RESOLVER
// ═══════════════════════════════════════════════════════════════════════════════
export function resolvePureRouteTourism(fromRaw: string, toRaw: string): StructuredVisaRequirements | null {
  const from = normalizeCountry(fromRaw);
  const to = normalizeCountry(toRaw);
  const fromName = cleanCountryName(fromRaw);
  const toName = cleanCountryName(toRaw);

  // 1. USA -> UK
  if (from === 'usa' && to === 'uk') {
    return {
      passport_country: 'USA',
      destination_country: 'UK',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Visa-Free Entry (Up to 6 Months) / UK ETA',
      source_url: 'https://www.gov.uk/check-uk-visa/y/usa/tourism',
      official_source_name: 'UK Visas and Immigration (GOV.UK)',
      overview: 'US passport holders can travel to the United Kingdom completely visa-free for tourism, vacations, family visits, short-term study, and business meetings for stays up to 6 months (180 days). No traditional consular visa is required. Starting in 2025, US citizens obtain an Electronic Travel Authorisation (UK ETA) online prior to travel.',
      highlights: [
        { icon: '🛂', title: 'Visa-Free Entry', description: 'US citizens enjoy visa-free entry to the UK for up to 6 months per visit.' },
        { icon: '⚡', title: 'ePassport Smart Gates', description: 'Eligible to use automated ePassport gates at UK airports (Heathrow, Gatwick, etc.) for rapid entry.' },
        { icon: '📱', title: 'UK ETA (£10)', description: 'Electronic Travel Authorisation valid for 2 years with multiple entries, applied via app or GOV.UK.' },
        { icon: '💼', title: 'Permitted Business', description: 'Attend conferences, business meetings, interviews, and contract negotiations without a work visa.' }
      ],
      how_to_apply: [
        'Check US Passport Validity: Ensure your US passport is valid for your intended duration of stay.',
        'Apply for UK ETA: Complete the online ETA application on GOV.UK or via the official "UK ETA" mobile app (£10 fee).',
        'Receive Digital Grant: Most UK ETA decisions arrive within 1 to 3 business days, electronically linked to your passport.',
        'Book Travel Itinerary: Arrange flights into London, Edinburgh, Manchester, or regional UK airports.',
        'Board Flight: Airlines verify your passport and electronic ETA status at check-in.',
        'Clear Border Control: Scan your US e-Passport at the automated airport smart gates upon arrival in the UK.'
      ],
      documents_required: [
        { title: 'Valid US Passport', description: 'Original passport valid for the duration of stay with at least 1 blank page.', is_mandatory: true },
        { title: 'Approved UK ETA (from 2025)', description: 'Electronic Travel Authorisation linked to your passport number.', is_mandatory: false },
        { title: 'Confirmed Return / Onward Air Ticket', description: 'Round-trip flight booking departing the UK within 6 months.', is_mandatory: true },
        { title: 'Accommodation Details', description: 'Hotel reservation, Airbnb booking, or host invitation address.', is_mandatory: true },
        { title: 'Proof of Sufficient Funds', description: 'Credit cards, debit cards, or bank balance sufficient for duration of trip.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '£0 (Visa-Free Entry)',
        service_fee: '£10 (UK ETA Fee from 2025)',
        total_fee: '£0 – £10 (approx. $0 – $13 USD)',
        notes: 'US citizens enter visa-free. £10 ETA fee applies once universally phased in.'
      },
      processing_time: 'Instant on Arrival (UK ETA: 1 to 3 Business Days)',
      processing_time_details: 'Entry clearance granted automatically at UK border e-Gates upon flight landing.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Valid for the full duration of planned stay in the UK.' },
        { category: 'No Local Employment', details: 'Paid employment and work for UK employers is strictly prohibited on visitor status.' },
        { category: 'Stay Limit', details: 'Maximum 180 consecutive days per visit without requiring immigration permission.' }
      ],
      financial_proofs: [
        { type: 'Credit / Debit Cards', minimum_balance_or_amount: 'Sufficient funds for trip', time_frame: 'Valid cards', notes: 'US cards (Visa, Mastercard, Amex) widely accepted.' }
      ],
      faqs: [
        { question: 'Do US citizens need a visa to visit the UK?', answer: 'No! US passport holders do not need a visa to visit the UK for tourism, holidays, or business meetings for stays up to 6 months.' },
        { question: 'What is the UK ETA for American citizens?', answer: 'The UK ETA (Electronic Travel Authorisation) is a digital travel permission (£10) that US travelers obtain online prior to boarding UK-bound flights, valid for multiple trips over 2 years.' },
        { question: 'Can Americans use the ePassport gates in London?', answer: 'Yes! US citizens aged 12 and older holding a biometric e-Passport can use automated ePassport gates at major UK airports for instant self-clearance.' }
      ],
      validity: '6 Months per Visit (UK ETA valid for 2 Years)',
      validity_details: 'Standard tourist entry allows up to 180 consecutive days stay.',
      stay_duration: 'Up to 6 Months (180 Days)',
      stay_duration_details: 'Maximum 6 months per entry.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple Entry visa-free authorization.',
      validity_and_stay: {
        visa_validity: '6 Months per Visit (UK ETA valid 2 Years)',
        max_stay_per_entry: 'Up to 6 Months (180 Days)',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 2. UK -> USA
  if (from === 'uk' && to === 'usa') {
    return {
      passport_country: 'UK',
      destination_country: 'USA',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'ESTA (Visa Waiver Program - VWP)',
      source_url: 'https://esta.cbp.dhs.gov/',
      official_source_name: 'U.S. Customs and Border Protection (CBP) / DHS',
      overview: 'British citizens are eligible for the U.S. Visa Waiver Program (VWP), allowing travel to the United States for up to 90 days for tourism, holidays, family visits, or business meetings without a traditional consular visa. Travelers simply obtain an approved ESTA (Electronic System for Travel Authorization) online before departing.',
      highlights: [
        { icon: '🛂', title: 'Visa Waiver Program', description: 'British citizens travel to the USA without attending an embassy visa interview.' },
        { icon: '⚡', title: 'Instant Online ESTA', description: 'Online authorization through official CBP portal (esta.cbp.dhs.gov) for $21 USD.' },
        { icon: '📅', title: '2-Year Validity', description: 'Valid for 2 years or until passport expiry, with unlimited 90-day visits.' },
        { icon: '🏖️', title: 'Tourism & Business', description: 'Covers vacations, road trips, conferences, conventions, and business consultations.' }
      ],
      how_to_apply: [
        'Check Passport Eligibility: Ensure you have an official UK biometric e-Passport (with chip logo on cover).',
        'Go to Official ESTA Portal: Visit official DHS website at esta.cbp.dhs.gov or the "ESTA Mobile" app.',
        'Complete Application: Fill in personal biodata, passport number, employer details, and US emergency contact.',
        'Pay Statutory Fee: Pay $21 USD fee using credit card, debit card, or PayPal.',
        'Receive Approval: Authorization status typically updates to "Approved" within minutes to 72 hours.',
        'Board Flight to US: Airline automatically validates your digital ESTA status at check-in.'
      ],
      documents_required: [
        { title: 'Valid UK e-Passport', description: 'Biometric British Citizen passport valid for at least 6 months with electronic chip.', is_mandatory: true },
        { title: 'Approved ESTA Authorization', description: 'Digital authorization confirmation from esta.cbp.dhs.gov.', is_mandatory: true },
        { title: 'Confirmed Return Air Ticket', description: 'Round-trip ticket departing North America within 90 days.', is_mandatory: true },
        { title: 'First Night Accommodation Address', description: 'Hotel, Airbnb, or residential address in the US.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '$21 USD (approx. £16.50)',
        service_fee: '$0 (Direct Official DHS Portal)',
        total_fee: '$21 USD Total',
        notes: 'Mandatory statutory fee payable at official CBP portal: esta.cbp.dhs.gov.'
      },
      processing_time: 'Minutes up to 72 Hours',
      processing_time_details: 'CBP recommends applying at least 72 hours before flight departure.',
      other_requirements: [
        { category: 'Passport Type', details: 'Must be a full British Citizen passport with biometric chip.' },
        { category: 'Stay Limit', details: 'Maximum 90 days per visit — cannot be extended within the United States.' },
        { category: 'Cuba Travel Restriction', details: 'Travelers who visited Cuba on or after Jan 12, 2021 must apply for a B1/B2 visa instead of ESTA.' }
      ],
      financial_proofs: [
        { type: 'Credit / Debit Cards', minimum_balance_or_amount: 'Sufficient funds for trip', time_frame: 'Valid cards', notes: 'UK bank cards work across US ATMs and point-of-sale.' }
      ],
      faqs: [
        { question: 'Do UK citizens need a visa for the USA?', answer: 'No! British citizens qualify for the Visa Waiver Program (VWP) and travel using an approved ESTA ($21 USD) rather than a consular visa for stays up to 90 days.' },
        { question: 'How long is a US ESTA valid for British travelers?', answer: 'An ESTA is valid for 2 years or until your passport expires, allowing multiple visits of up to 90 days each.' },
        { question: 'Can I extend my stay in the US on ESTA?', answer: 'No, stays under the Visa Waiver Program cannot be extended beyond 90 days from within the United States.' }
      ],
      validity: '2 Years or until passport expiration',
      validity_details: 'Multiple entries over 2-year validity window.',
      stay_duration: 'Up to 90 Days per Visit',
      stay_duration_details: 'Maximum permitted stay per entry: 90 days.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple Entry electronic authorization.',
      validity_and_stay: {
        visa_validity: '2 Years or until passport expires',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 3. Canada -> Australia
  if (from === 'canada' && to === 'australia') {
    return {
      passport_country: 'Canada',
      destination_country: 'Australia',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Electronic Travel Authority (ETA - Subclass 601)',
      source_url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
      official_source_name: 'Australian Department of Home Affairs',
      overview: 'Canadian citizens can travel to Australia for holidays, tourism, or business visitor activities under the Electronic Travel Authority (ETA - Subclass 601). Applied directly through the Australian ETA smartphone app, it grants multiple entries of up to 3 months each within a 12-month period.',
      highlights: [
        { icon: '📱', title: 'Australian ETA App', description: 'Apply seamlessly in minutes by scanning your Canadian passport with your phone.' },
        { icon: '📅', title: '12-Month Multiple Entry', description: 'Stay up to 3 months per visit as many times as you wish within 1 year.' },
        { icon: '🏖️', title: 'Holiday & Business', description: 'Explore Sydney, the Great Barrier Reef, Melbourne, or conduct business meetings.' },
        { icon: '⚡', title: 'Instant Grant', description: 'Most applications approved instantly or within 24 hours.' }
      ],
      how_to_apply: [
        'Download Official App: Install "Australian ETA" app from the Apple App Store or Google Play Store.',
        'Scan Canadian Passport: Use your phone camera to scan the passport biodata page and chip via NFC.',
        'Take Selfie: Take a live facial photograph to verify biometric identity.',
        'Answer Background Questions: Complete short health and character declarations.',
        'Pay Service Fee: Pay the AUD $20 application service fee inside the app.',
        'Receive ETA Confirmation: Notification of grant is sent via email and linked to your passport.'
      ],
      documents_required: [
        { title: 'Valid Canadian Passport', description: 'Canadian passport valid for at least 6 months with NFC biometric chip.', is_mandatory: true },
        { title: 'Australian ETA App', description: 'Mobile application installed on iOS or Android smartphone.', is_mandatory: true },
        { title: 'Return Flight Ticket', description: 'Confirmed return ticket leaving Australia within 3 months.', is_mandatory: true },
        { title: 'Funds Proof', description: 'Access to sufficient funds (credit card or Canadian bank account).', is_mandatory: true }
      ],
      costs: {
        visa_fee: 'AUD $0 (No Statutory Visa Fee)',
        service_fee: 'AUD $20 (approx. CAD $18)',
        total_fee: 'AUD $20 Total',
        notes: 'Paid via credit/debit card inside the official Australian ETA app.'
      },
      processing_time: 'Instant to 24-48 Hours',
      processing_time_details: 'Most Canadian ETA applicants receive an automated instant grant.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Valid Canadian passport with biometric chip.' },
        { category: 'Health & Character', details: 'Must declare no substantial criminal record or active tuberculosis.' },
        { category: 'No Local Employment', details: 'Work for Australian employers is not permitted on an ETA.' }
      ],
      financial_proofs: [
        { type: 'Canadian Bank / Credit Card', minimum_balance_or_amount: 'AUD $1,000 per month of stay', time_frame: 'Valid cards/account', notes: 'Demonstrates financial solvency.' }
      ],
      faqs: [
        { question: 'Do Canadians need a visa for Australia?', answer: 'Canadians do not need a traditional sticker visa. You obtain an Electronic Travel Authority (ETA - Subclass 601) via the official Australian ETA app for AUD $20.' },
        { question: 'How long can Canadians stay in Australia on an ETA?', answer: 'Up to 3 months (90 days) per visit during the 12-month validity period.' },
        { question: 'Can Canadian citizens work in Australia on an ETA?', answer: 'No, work is strictly prohibited on an ETA. Young Canadians aged 18-35 can apply for a Working Holiday Visa (Subclass 417) to work and travel.' }
      ],
      validity: '12 Months from Date of Grant',
      validity_details: 'Valid for 1 year with unlimited visits.',
      stay_duration: 'Up to 3 Months (90 Days) per Visit',
      stay_duration_details: 'Max 3 months each entry.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple Entry ETA.',
      validity_and_stay: {
        visa_validity: '12 Months',
        max_stay_per_entry: 'Up to 3 Months',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 4. Australia -> Canada
  if (from === 'australia' && to === 'canada') {
    return {
      passport_country: 'Australia',
      destination_country: 'Canada',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Electronic Travel Authorization (eTA)',
      source_url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
      official_source_name: 'Immigration, Refugees and Citizenship Canada (IRCC)',
      overview: 'Australian citizens flying to or transiting through Canada do not need a visitor visa. Instead, they apply online for an Electronic Travel Authorization (eTA) through the official Government of Canada website (canada.ca). An eTA is electronically linked to your Australian passport and is valid for up to 5 years.',
      highlights: [
        { icon: '⚡', title: 'Instant Online eTA', description: 'Applied directly on canada.ca in under 10 minutes for CAD $7.' },
        { icon: '📅', title: '5-Year Validity', description: 'Valid for up to 5 years or until your Australian passport expires.' },
        { icon: '⏱️', title: '6-Month Stays', description: 'Enjoy stays of up to 6 months per visit for tourism or business.' },
        { icon: '🏔️', title: 'Canadian Wilderness', description: 'Explore Banff, Vancouver, Whistler, Toronto, Montreal, and Niagara Falls.' }
      ],
      how_to_apply: [
        'Get Documents Ready: Have your Australian passport, email address, and credit card ready.',
        'Visit Official Canada.ca: Access official portal (canada.ca/eta) — avoid third-party agency surcharge websites.',
        'Complete Online Form: Input passport number, occupation, and travel details.',
        'Pay CAD $7 Fee: Pay using credit card or debit card.',
        'Receive Approval Email: Most approvals arrive within minutes.',
        'Fly to Canada: Airlines check eTA status electronically before boarding.'
      ],
      documents_required: [
        { title: 'Valid Australian Passport', description: 'Australian passport valid for duration of stay.', is_mandatory: true },
        { title: 'Approved Canada eTA', description: 'Electronically linked to passport (no printout required).', is_mandatory: true },
        { title: 'Return Flight Ticket', description: 'Flight booking out of Canada within 6 months.', is_mandatory: true },
        { title: 'Proof of Financial Means', description: 'Credit cards or bank statements.', is_mandatory: true }
      ],
      costs: {
        visa_fee: 'CAD $7 (approx. AUD $8)',
        service_fee: '$0 (Official Portal)',
        total_fee: 'CAD $7 Total',
        notes: 'Paid online at canada.ca/eta.'
      },
      processing_time: 'Minutes to 72 Hours',
      processing_time_details: 'Most Australian applicants approved in under 15 minutes.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Valid Australian passport.' },
        { category: 'Air Travel Only', details: 'eTA is required when arriving by air; not required if entering by land from the US.' },
        { category: 'Stay Limit', details: 'Up to 6 months determined by CBSA officer at port of entry.' }
      ],
      financial_proofs: [
        { type: 'Credit Cards / Bank Funds', minimum_balance_or_amount: 'CAD $1,000 per month of stay', time_frame: 'Valid cards', notes: 'Demonstrates self-sufficiency.' }
      ],
      faqs: [
        { question: 'Do Australians need a visa for Canada?', answer: 'Australians do not need a visa; they only need an electronic travel authorization (eTA) costing CAD $7, applied online at canada.ca.' },
        { question: 'How long can Australians stay in Canada?', answer: 'Australians can stay for up to 6 months per entry on an eTA.' },
        { question: 'Can young Australians work in Canada?', answer: 'Yes! Australians aged 18-35 can apply for an International Experience Canada (IEC) Working Holiday visa to live and work in Canada for up to 2 years.' }
      ],
      validity: 'Up to 5 Years or until passport expires',
      validity_details: 'Linked to passport for 5 years.',
      stay_duration: 'Up to 6 Months per Visit',
      stay_duration_details: 'Standard tourist stay determined by CBSA.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple Entry eTA.',
      validity_and_stay: {
        visa_validity: 'Up to 5 Years',
        max_stay_per_entry: 'Up to 6 Months',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 5. Germany -> France (and EU/Schengen to EU/Schengen)
  if ((isEUMember(from) || isSchengenMember(from)) && (isEUMember(to) || isSchengenMember(to))) {
    return {
      passport_country: fromName,
      destination_country: toName,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'EU Freedom of Movement (Visa-Free / National ID)',
      source_url: 'https://europa.eu/youreurope/citizens/travel/entry-exit/eu-nationals/index_en.htm',
      official_source_name: 'European Union (europa.eu) & Schengen Border Code',
      overview: `As a citizen of the European Union and Schengen Area (${fromName}), you enjoy complete freedom of movement under EU treaties. No visa, travel authorization, or border control is required to enter, vacation, study, or reside in ${toName}. You may travel freely using either your national passport or official National Identity Card.`,
      highlights: [
        { icon: '🇪🇺', title: 'EU Freedom of Movement', description: 'Fundamental right to move and reside freely across EU & Schengen member states.' },
        { icon: '🪪', title: 'National ID Card Travel', description: 'Travel across borders using only your national ID card without carrying a passport.' },
        { icon: '🚫', title: 'Zero Border Checks', description: 'Unrestricted travel across internal Schengen land, rail, and air borders with no passport control.' },
        { icon: '🏥', title: 'EHIC Healthcare', description: 'European Health Insurance Card (EHIC) provides reciprocal state healthcare.' }
      ],
      how_to_apply: [
        `Carry Valid National ID or Passport: Ensure your ${fromName} passport or National ID Card is valid.`,
        `Travel Freely: Board high-speed trains (TGV, ICE, Eurostar), flights, or drive across borders with zero border stops.`,
        'Enjoy Stay: No tourist registration or entry permits required for stays under 3 months.',
        'Longer Stays (3+ Months): If remaining longer than 90 days, register residency at the local town hall / prefecture.'
      ],
      documents_required: [
        { title: `Valid ${fromName} Passport or National ID Card`, description: 'Valid national identification document.', is_mandatory: true },
        { title: 'European Health Insurance Card (EHIC)', description: 'Reciprocal state medical care card.', is_mandatory: false }
      ],
      costs: {
        visa_fee: '€0 (Completely Free)',
        service_fee: '€0',
        total_fee: 'FREE',
        notes: 'EU citizens exercise treaty rights — zero statutory or consular fees.'
      },
      processing_time: 'Instant (0 Days - No Application Needed)',
      processing_time_details: 'Unrestricted entry under EU Freedom of Movement laws.',
      other_requirements: [
        { category: 'EU Citizenship', details: `Valid passport or national ID card confirming ${fromName} citizenship.` },
        { category: 'Right to Reside', details: 'Full right to live, work, and study under Directive 2004/38/EC.' }
      ],
      financial_proofs: [
        { type: 'None Required', minimum_balance_or_amount: 'None', time_frame: 'N/A', notes: 'No financial maintenance proofs required for EU tourists.' }
      ],
      faqs: [
        { question: `Do ${fromName} citizens need a visa for ${toName}?`, answer: `No! As citizens of the European Union, ${fromName} nationals enjoy full freedom of movement to enter, visit, and live in ${toName} without any visa.` },
        { question: 'Can I travel with just my National ID Card?', answer: 'Yes! All EU and Schengen citizens can travel across member states using their official National Identity Card.' },
        { question: `Can I work or study in ${toName}?`, answer: `Yes! EU citizens have the automatic right to take up employment, start a business, or study in ${toName} without needing a work permit or student visa.` }
      ],
      validity: 'Indefinite (EU Treaty Right)',
      validity_details: 'Unrestricted EU citizen rights.',
      stay_duration: 'Unlimited / Unrestricted',
      stay_duration_details: 'Unrestricted stay rights.',
      entry_type: 'Freedom of Movement',
      entry_type_details: 'Internal Schengen / EU travel.',
      validity_and_stay: {
        visa_validity: 'Indefinite',
        max_stay_per_entry: 'Unlimited',
        entry_type: 'Freedom of Movement'
      }
    };
  }

  // 6. UAE -> Saudi Arabia (and GCC to GCC)
  if (isGCCMember(from) && isGCCMember(to)) {
    return {
      passport_country: fromName,
      destination_country: toName,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'GCC Freedom of Movement (Visa-Free with National ID)',
      source_url: 'https://www.my.gov.sa/wps/portal/snp/servicesDirectory/servicedetails/8807',
      official_source_name: 'Gulf Cooperation Council (GCC) & Ministry of Interior',
      overview: `Citizens of ${fromName} enjoy unrestricted visa-free freedom of movement across all Gulf Cooperation Council (GCC) member states, including ${toName}. ${fromName} nationals can enter, live, travel, and vacation in ${toName} using their valid National ID Card (Emirates ID / National ID) or passport with zero visa requirements or fees.`,
      highlights: [
        { icon: '🤝', title: 'GCC Treaty Rights', description: 'Unrestricted travel and residence rights across all 6 Arabian Gulf nations.' },
        { icon: '🪪', title: 'National ID Entry', description: 'Enter via air or land border posts using your digital or physical National ID card.' },
        { icon: '⚡', title: 'Smart e-Gates', description: 'Use automated GCC citizens e-gates at airports for rapid clearance.' },
        { icon: '🕋', title: 'Umrah Freedom', description: 'Perform Umrah at any time of year without a separate Umrah visa.' }
      ],
      how_to_apply: [
        `Carry Valid National ID or Passport: Ensure your ${fromName} National ID or passport has at least 3 months validity.`,
        `Travel by Air or Land: Fly into ${toName} or cross overland border checkpoints.`,
        'Pass Through Dedicated GCC Lanes: Use the dedicated GCC Citizens smart gates or immigration counters.',
        'Instant Clearance: Zero visa applications, stamps, or fees required.'
      ],
      documents_required: [
        { title: `Valid ${fromName} National ID Card or Passport`, description: 'Original National ID card or biometric passport.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '0 SAR / 0 AED (Free)',
        service_fee: '0',
        total_fee: 'FREE',
        notes: 'GCC citizens enter visa-free with zero fees.'
      },
      processing_time: 'Instant on Arrival (0 Days)',
      processing_time_details: 'Granted immediately upon presenting GCC National ID.',
      other_requirements: [
        { category: 'GCC Nationality', details: `Valid National ID or passport confirming ${fromName} citizenship.` },
        { category: 'Vehicle Travel', details: 'If crossing by car, ensure valid vehicle registration (Mulkiya) and border insurance.' }
      ],
      financial_proofs: [
        { type: 'None Required', minimum_balance_or_amount: 'None', time_frame: 'N/A', notes: 'GCC citizens are exempt from financial proofs.' }
      ],
      faqs: [
        { question: `Do ${fromName} citizens need a visa for ${toName}?`, answer: `No! Citizens of GCC countries enjoy reciprocal freedom of movement and enter ${toName} visa-free using their National ID Card or passport.` },
        { question: 'Can I perform Umrah on GCC entry?', answer: 'Yes, GCC citizens can perform Umrah year-round without applying for a special Umrah visa.' },
        { question: 'Can I travel overland between GCC nations?', answer: 'Yes, you can drive across land borders between UAE, Saudi Arabia, Oman, Qatar, Bahrain, and Kuwait using your National ID card.' }
      ],
      validity: 'Indefinite (GCC Treaty Right)',
      validity_details: 'GCC reciprocal rights.',
      stay_duration: 'Unlimited / Unrestricted',
      stay_duration_details: 'Unlimited stay for GCC nationals.',
      entry_type: 'Freedom of Movement',
      entry_type_details: 'GCC smart gate entry.',
      validity_and_stay: {
        visa_validity: 'Indefinite',
        max_stay_per_entry: 'Unlimited',
        entry_type: 'Freedom of Movement'
      }
    };
  }

  // 7. Singapore -> Malaysia (and ASEAN reciprocal)
  if (from === 'singapore' && to === 'malaysia') {
    return {
      passport_country: 'Singapore',
      destination_country: 'Malaysia',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Visa-Free Entry (Up to 30 Days) / MDAC',
      source_url: 'https://imigresen-online.imi.gov.my/mdac/main',
      official_source_name: 'Immigration Department of Malaysia (Jabatan Imigresen Malaysia)',
      overview: 'Singapore citizens enjoy visa-free entry into Malaysia for tourism, social visits, dining, shopping, and business meetings for stays up to 30 days per entry. Travelers crossing by air or overland (Johor-Singapore Causeway or Tuas Second Link) can use automated biometric e-Gates after submitting the free Malaysia Digital Arrival Card (MDAC) online within 3 days prior to arrival.',
      highlights: [
        { icon: '🛂', title: '30-Day Visa-Free Entry', description: 'Singaporeans enter Malaysia without any visa for holidays, day-trips, and getaways.' },
        { icon: '🚗', title: 'Causeway & Second Link e-Gates', description: 'Use automated biometric e-Gates at Bangunan Sultan Iskandar (BSI) and Sultan Abu Bakar Complex (KSAB).' },
        { icon: '📱', title: 'Free Online MDAC', description: 'Quick online digital arrival card submitted within 3 days before travel.' },
        { icon: '🏖️', title: 'Quick Weekend Getaways', description: 'Easy access to Johor Bahru, Kuala Lumpur, Penang, Langkawi, and Malacca.' }
      ],
      how_to_apply: [
        'Check Passport Validity: Ensure your Singapore passport has at least 6 months validity.',
        'Submit MDAC Online: Fill out the free Malaysia Digital Arrival Card (MDAC) online at imigresen-online.imi.gov.my within 3 days before departure.',
        'Cross the Border: Travel by car, bus, train (KTM Shuttle Tebrau), ferry, or flight.',
        'Clear Immigration: Scan your Singapore passport at the automated Malaysian e-Gates or visit manual immigration booths.',
        'Receive 30-Day Visa-Free Clearance: Enjoy your stay in Malaysia up to 30 days.'
      ],
      documents_required: [
        { title: 'Valid Singapore Passport', description: 'Valid for at least 6 months beyond travel dates.', is_mandatory: true },
        { title: 'Malaysia Digital Arrival Card (MDAC) Confirmation', description: 'Submitted online within 3 days of entry (Singaporeans using e-Gates are registered).', is_mandatory: true },
        { title: "Touch 'n Go / RFID (if driving)", description: 'For toll payments and Vehicle Entry Permit (VEP) if driving a Singapore-registered car.', is_mandatory: false }
      ],
      costs: {
        visa_fee: 'RM 0 (Free Entry)',
        service_fee: 'RM 0 (Official Free MDAC)',
        total_fee: 'FREE',
        notes: 'Singapore passport holders enter completely free with no visa charges.'
      },
      processing_time: 'Instant on Arrival (0 Days)',
      processing_time_details: 'Immediate entry clearance at border checkpoints.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Minimum 6 months validity strictly enforced by airlines and border control.' },
        { category: 'Stay Limit', details: 'Up to 30 days per entry for social/tourism visits.' },
        { category: 'Vehicle Entry Permit (VEP)', details: 'Singapore-registered vehicles entering Malaysia require an active RFID VEP tag.' }
      ],
      financial_proofs: [
        { type: 'Singapore Bank / PayNow / Cards', minimum_balance_or_amount: 'Sufficient funds', time_frame: 'Valid cards', notes: 'Singapore credit cards and QR payments widely accepted.' }
      ],
      faqs: [
        { question: 'Do Singaporeans need a visa to enter Malaysia?', answer: 'No! Singapore passport holders enjoy 30 days of visa-free entry to Malaysia for tourism and leisure.' },
        { question: 'What is MDAC for Singaporeans?', answer: 'The Malaysia Digital Arrival Card (MDAC) is a free online declaration that travelers must complete within 3 days before arriving in Malaysia.' },
        { question: 'Can Singaporeans use the Malaysian e-Gates?', answer: 'Yes! Singapore passport holders can use automated e-Gates at the Johor land checkpoints (BSI and KSAB) and Kuala Lumpur International Airport (KLIA).' }
      ],
      validity: '30 Days per Entry',
      validity_details: 'Granted on arrival.',
      stay_duration: 'Up to 30 Days',
      stay_duration_details: '30 days per visit.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple entry visa-free access.',
      validity_and_stay: {
        visa_validity: '30 Days per Entry',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 8. Top-Tier Passports (USA, UK, Canada, Australia, Singapore, Japan, etc.) -> Schengen Area (France, Germany, Italy, Spain, etc.)
  const topTierVisaFreeToSchengen = ['usa', 'uk', 'canada', 'australia', 'singapore', 'japan', 'south-korea', 'uae', 'new-zealand', 'brazil', 'mexico'];
  if (topTierVisaFreeToSchengen.includes(from) && isSchengenMember(to)) {
    return {
      passport_country: fromName,
      destination_country: toName,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Schengen Visa-Free Access (Up to 90 Days)',
      source_url: `https://www.schengenvisainfo.com/who-needs-schengen-visa/`,
      official_source_name: `European Commission & ${toName} Ministry of Foreign Affairs`,
      overview: `${fromName} passport holders enjoy visa-free access to ${toName} and all 29 member states of the Schengen Area for tourism, vacations, and business visits for stays up to 90 days within any 180-day rolling window. No prior consular visa application or embassy interview is required.`,
      highlights: [
        { icon: '🛂', title: '90-Day Visa-Free Access', description: `Travel freely throughout ${toName} and the Schengen Area without a visa.` },
        { icon: '🌍', title: 'Border-Free Europe', description: 'Seamlessly travel across France, Germany, Italy, Switzerland, Austria, and 29 nations.' },
        { icon: '📅', title: '90/180 Day Rule', description: 'Stay up to 90 days in any 180-day rolling period for tourism or business.' },
        { icon: '⚡', title: 'Zero Consular Formalities', description: 'No embassy visits, document dossiers, or visa appointments required.' }
      ],
      how_to_apply: [
        `Ensure ${fromName} Passport Validity: Must have at least 3 months validity beyond intended departure from Schengen.`,
        `Book Travel Itinerary: Arrange flights to ${toName} and book accommodations.`,
        'Obtain Travel Health Insurance: Recommended international medical insurance covering emergency treatment in Europe.',
        `Board Flight: Airlines verify your ${fromName} passport validity at check-in.`,
        `Clear Schengen Immigration: Border officer stamps your passport with a 90-day visa-free entry stamp upon landing in ${toName}.`
      ],
      documents_required: [
        { title: `Valid ${fromName} Passport`, description: 'Valid for at least 3 months after departure from Schengen zone, issued within the last 10 years.', is_mandatory: true },
        { title: 'Confirmed Return / Onward Ticket', description: 'Flight booking departing the Schengen area within 90 days.', is_mandatory: true },
        { title: 'Proof of Accommodation', description: `Hotel booking, apartment rental, or invitation letter in ${toName}.`, is_mandatory: true },
        { title: 'Proof of Financial Means', description: 'Credit cards, international debit cards, or cash to support stay.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '€0 (Visa-Free Entry)',
        service_fee: '€0',
        total_fee: 'FREE',
        notes: `${fromName} citizens enjoy completely visa-free entry to Schengen destinations.`
      },
      processing_time: 'Instant on Arrival (0 Days)',
      processing_time_details: 'Granted automatically at Schengen border control upon arrival.',
      other_requirements: [
        { category: '90/180 Rule', details: 'Cumulative stay across all Schengen states must not exceed 90 days in any 180-day period.' },
        { category: 'No Local Employment', details: 'Paid work for European employers is strictly prohibited on visa-free tourist status.' }
      ],
      financial_proofs: [
        { type: 'Credit / Debit Cards', minimum_balance_or_amount: '€45 to €100 per day', time_frame: 'Valid cards', notes: 'Demonstrates financial solvency.' }
      ],
      faqs: [
        { question: `Do ${fromName} citizens need a visa to visit ${toName}?`, answer: `No! ${fromName} passport holders can travel to ${toName} and all 29 Schengen countries completely visa-free for up to 90 days.` },
        { question: 'What is the 90/180 day Schengen rule?', answer: 'You can stay in the Schengen Area for up to 90 days within any rolling 180-day window. Days spent in any Schengen country count toward the single combined 90-day total.' },
        { question: 'What is ETIAS?', answer: 'ETIAS (European Travel Information and Authorisation System) is a forthcoming electronic travel authorization (€7) for visa-exempt travelers, launching in 2025.' }
      ],
      validity: '90 Days within any 180-Day Period',
      validity_details: 'Rolling 180-day Schengen calculation.',
      stay_duration: 'Up to 90 Days',
      stay_duration_details: 'Maximum 90 days across Schengen.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple Entry visa-free access.',
      validity_and_stay: {
        visa_validity: '90 Days within 180-day period',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 9. Western / Visa Waiver Passports -> USA (ESTA)
  const vwpToUSA = ['australia', 'germany', 'france', 'netherlands', 'switzerland', 'spain', 'italy', 'japan', 'south-korea', 'singapore', 'new-zealand'];
  if (vwpToUSA.includes(from) && to === 'usa') {
    return {
      passport_country: fromName,
      destination_country: 'USA',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'ESTA (Visa Waiver Program - VWP)',
      source_url: 'https://esta.cbp.dhs.gov/',
      official_source_name: 'U.S. Customs and Border Protection (CBP) / DHS',
      overview: `Citizens of ${fromName} are eligible for the U.S. Visa Waiver Program (VWP), allowing travel to the United States for up to 90 days for tourism, holidays, or business meetings without a consular visa. Travelers simply obtain an approved ESTA (Electronic System for Travel Authorization) online before departing.`,
      highlights: [
        { icon: '🛂', title: 'Visa Waiver Program', description: `${fromName} citizens travel to the USA without attending an embassy visa interview.` },
        { icon: '⚡', title: 'Instant Online ESTA', description: 'Online authorization through official CBP portal (esta.cbp.dhs.gov) for $21 USD.' },
        { icon: '📅', title: '2-Year Validity', description: 'Valid for 2 years or until passport expiry, with unlimited 90-day visits.' },
        { icon: '🏖️', title: 'Tourism & Business', description: 'Covers vacations, road trips, conferences, conventions, and business consultations.' }
      ],
      how_to_apply: [
        `Check Passport Eligibility: Ensure you have an official ${fromName} biometric e-Passport.`,
        'Go to Official ESTA Portal: Visit official DHS website at esta.cbp.dhs.gov or the "ESTA Mobile" app.',
        'Complete Application: Fill in personal biodata, passport number, employer details, and US contact.',
        'Pay Statutory Fee: Pay $21 USD fee using credit card, debit card, or PayPal.',
        'Receive Approval: Authorization status typically updates to "Approved" within minutes to 72 hours.',
        'Board Flight to US: Airline automatically validates your digital ESTA status at check-in.'
      ],
      documents_required: [
        { title: `Valid ${fromName} e-Passport`, description: 'Biometric passport with electronic chip.', is_mandatory: true },
        { title: 'Approved ESTA Authorization', description: 'Digital authorization confirmation from esta.cbp.dhs.gov.', is_mandatory: true },
        { title: 'Confirmed Return Air Ticket', description: 'Round-trip ticket departing North America within 90 days.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '$21 USD (approx. €20 / AUD $32)',
        service_fee: '$0 (Direct Official DHS Portal)',
        total_fee: '$21 USD Total',
        notes: 'Mandatory statutory fee payable at official CBP portal: esta.cbp.dhs.gov.'
      },
      processing_time: 'Minutes up to 72 Hours',
      processing_time_details: 'CBP recommends applying at least 72 hours before flight departure.',
      other_requirements: [
        { category: 'Passport Type', details: `Must be a full ${fromName} citizen biometric e-passport.` },
        { category: 'Stay Limit', details: 'Maximum 90 days per visit — cannot be extended within the United States.' }
      ],
      financial_proofs: [
        { type: 'Credit / Debit Cards', minimum_balance_or_amount: 'Sufficient funds for trip', time_frame: 'Valid cards', notes: 'International cards widely accepted in the US.' }
      ],
      faqs: [
        { question: `Do ${fromName} citizens need a visa for the USA?`, answer: `No! ${fromName} citizens qualify for the Visa Waiver Program (VWP) and travel using an approved ESTA ($21 USD) rather than a consular visa for stays up to 90 days.` },
        { question: 'How long is a US ESTA valid?', answer: 'An ESTA is valid for 2 years or until your passport expires, allowing multiple visits of up to 90 days each.' }
      ],
      validity: '2 Years or until passport expiration',
      validity_details: 'Multiple entries over 2-year validity window.',
      stay_duration: 'Up to 90 Days per Visit',
      stay_duration_details: 'Maximum permitted stay per entry: 90 days.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple Entry electronic authorization.',
      validity_and_stay: {
        visa_validity: '2 Years or until passport expires',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Multiple Entry'
      }
    };
  }

  
  // ── 8. ALBANIA -> GERMANY (Schengen Visa-Free for Biometric Passports) ──
  if (from === 'albania' && (to === 'germany' || isSchengenMember(to))) {
    return {
      passport_country: 'Albania',
      destination_country: toName,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Schengen Visa-Free Access (Up to 90 Days)',
      source_url: 'https://tirana.diplo.de/al-sq/service/visa-einreise/-/1807770',
      official_source_name: 'German Federal Foreign Office (Auswärtiges Amt) / German Embassy Tirana',
      overview: 'Albanian citizens holding a valid biometric passport can travel to Germany and the entire Schengen Area completely visa-free for short stays of up to 90 days within any 180-day rolling period for tourism, visiting relatives, business meetings, or cultural trips. No traditional consular visa is required. Note: Non-biometric passports require a standard Schengen C-Visa.',
      highlights: [
        { icon: '🛂', title: '90-Day Visa-Free', description: 'Visa-free entry for up to 90 days in any 180-day period across all 29 Schengen states.' },
        { icon: '💶', title: '€0 Visa Fee', description: 'No consular visa fee required for biometric passport holders.' },
        { icon: '✈️', title: 'Direct EU Flights', description: 'Direct flights connect Tirana (TIA) with Frankfurt, Munich, Berlin, and Memmingen.' },
        { icon: '📱', title: 'ETIAS Preparation', description: 'European Travel Information and Authorisation System (ETIAS) mandatory starting late 2025.' }
      ],
      how_to_apply: [
        'Ensure Biometric Passport: Verify your Albanian passport has an electronic chip and at least 3 months validity beyond planned departure from Schengen.',
        'Prepare Travel Medical Insurance: Obtain insurance with minimum €30,000 emergency medical coverage valid across the Schengen Area.',
        'Secure Accommodation & Flights: Book return flight tickets and confirmed hotel booking or German host invitation (Verpflichtungserklärung).',
        'Proof of Financial Means: Carry proof of economic solvency (~€45 to €50 per day of stay via international cards or cash).',
        'Pass Border Control: Present biometric passport, return ticket, and accommodation details to German Federal Police (Bundespolizei) at Frankfurt, Munich, or other border checkpoints.'
      ],
      documents_required: [
        { title: 'Valid Albanian Biometric Passport', description: 'Issued within the last 10 years and valid for at least 3 months after departure from Germany.', is_mandatory: true },
        { title: 'Return Flight Ticket', description: 'Confirmed return ticket to Albania or onward destination outside Schengen.', is_mandatory: true },
        { title: 'Proof of Lodging / Invitation', description: 'Hotel reservation or formal declaration of commitment (Verpflichtungserklärung).', is_mandatory: true },
        { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 coverage including emergency repatriation.', is_mandatory: true },
        { title: 'Proof of Financial Means', description: 'Cash, international credit/debit cards, or bank statement demonstrating sufficient funds.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '€0 (Visa-Exempt for Biometric Passports)',
        service_fee: '€0',
        total_fee: '€0',
        notes: 'ETIAS application fee of €7 will apply once operational in late 2025.'
      },
      processing_time: 'Instant at Border Control',
      processing_time_details: 'Cleared immediately at airport immigration upon verifying biometric passport and entry conditions.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Must be biometric and valid for at least 3 months beyond departure date.' },
        { category: '90/180 Rule', details: 'Strict maximum of 90 days stay in any 180-day rolling window across the Schengen Area.' }
      ],
      financial_proofs: [
        { type: 'Cash / Credit Cards', minimum_balance_or_amount: '€45 - €50 per day of planned stay', time_frame: 'Valid cards', notes: 'Checked by border police at port of entry.' }
      ],
      faqs: [
        { question: 'Do Albanian citizens need a visa to travel to Germany for tourism?', answer: 'No. Holders of valid Albanian biometric passports are exempt from visa requirements for stays up to 90 days within any 180-day period.' },
        { question: 'What documents should Albanians carry when entering Germany?', answer: 'At German border control, you must be prepared to show your biometric passport, return flight ticket, proof of accommodation, travel insurance with €30,000 minimum coverage, and sufficient funds.' },
        { question: 'Can Albanian tourists work in Germany under the visa-free regime?', answer: 'No. Visa-free entry does not permit employment in Germany. A German national employment visa (D-Visa) is required for work.' }
      ],
      validity: '90 Days in any 180-Day Rolling Period',
      validity_details: 'Schengen short-stay visa waiver rule.',
      stay_duration: 'Up to 90 Days',
      stay_duration_details: 'Maximum allowable stay per 180-day cycle.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Unlimited entries into Germany and other Schengen countries within the 90/180-day limit.',
      validity_and_stay: {
        visa_validity: '90 Days in any 180-Day Rolling Period',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // ── 9. NIGERIA -> UK (Standard Visitor Visa) ──
  if (from === 'nigeria' && to === 'uk') {
    return {
      passport_country: 'Nigeria',
      destination_country: 'UK',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Standard Visitor Visa (UKVI)',
      source_url: 'https://www.gov.uk/standard-visitor',
      official_source_name: 'UK Visas and Immigration (GOV.UK) & VFS Global / TLScontact Nigeria',
      overview: 'Nigerian passport holders must obtain a UK Standard Visitor Visa prior to traveling to the United Kingdom for holidays, sightseeing, visiting friends or family, or attending business conferences. All applications are completed online through GOV.UK, followed by biometric data enrollment at a Visa Application Centre (VFS Global / TLScontact) in Lagos or Abuja. A mandatory Tuberculosis (TB) test certificate from an IOM-approved medical clinic in Nigeria is required for visits over 6 months.',
      highlights: [
        { icon: '🏛️', title: '6-Month Tourist Stay', description: 'Stay up to 6 months per visit across England, Scotland, Wales, and Northern Ireland.' },
        { icon: '📱', title: 'Online GOV.UK Application', description: 'Submit statutory visa application and upload scanned documents through the official UKVI portal.' },
        { icon: '🏢', title: 'Biometric VAC Centers', description: 'Appointments available at TLScontact / VFS Global centers in Victoria Island, Ikeja, and Abuja.' },
        { icon: '⚡', title: 'Priority Service Available', description: 'Optional 5-day Priority Visa service available for urgent travel needs.' }
      ],
      how_to_apply: [
        'Complete Online Application: Fill out the Standard Visitor visa form on the official GOV.UK portal.',
        'Pay Statutory UKVI Fees: Pay the visa application fee (£115 GBP for 6-month visa) online using a debit/credit card.',
        'Book Biometrics Appointment: Schedule an appointment at TLScontact or VFS Global in Lagos (VI or Ikeja) or Abuja.',
        'Upload Supporting Documents: Digitally upload 6 months bank statements, employment verification, tax clearance, and travel itinerary.',
        'Attend Biometric Appointment: Submit fingerprints and digital photograph at the visa application centre.',
        'Passport Collection: Receive your passport with the UK visa vignette via courier or collection from the VAC.'
      ],
      documents_required: [
        { title: 'Valid Nigerian Passport', description: 'Valid for duration of trip with at least 1 full blank page for the UK visa vignette.', is_mandatory: true },
        { title: '6 Months Bank Statements', description: 'Official stamped bank statements showing steady salary/business deposits and adequate savings balance.', is_mandatory: true },
        { title: 'Proof of Employment & Income', description: 'Letter from employer on company letterhead confirming salary, role, length of service, and approved leave.', is_mandatory: true },
        { title: 'Travel & Accommodation Itinerary', description: 'Provisional flight schedule, hotel reservation, or formal invitation letter from UK host with proof of their UK legal status.', is_mandatory: true },
        { title: 'Proof of Strong Ties to Nigeria', description: 'Family ties, property ownership documents, company registration (CAC), or ongoing employment.', is_mandatory: true },
        { title: 'Tuberculosis (TB) Test Certificate', description: 'Required from an approved IOM clinic in Abuja or Lagos if staying over 6 months.', is_mandatory: false }
      ],
      costs: {
        visa_fee: '£115 GBP (~₦230,000 NGN)',
        service_fee: '£0 (Standard VAC appointment included)',
        total_fee: '£115 GBP (6-month) / £400 GBP (2-year) / £771 GBP (5-year) / £963 GBP (10-year)',
        notes: 'Optional Priority Visa fee is £500 GBP for decision within 5 working days.'
      },
      processing_time: '3 to 6 Weeks (15 Working Days Standard)',
      processing_time_details: 'Standard processing is approximately 15 working days after biometric enrollment in Nigeria.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Must be valid for intended stay with at least 1 blank vignette page.' },
        { category: 'Genuine Visitor Test', details: 'Must satisfy UKVI caseworker that you intend to leave the UK at the end of your visit.' }
      ],
      financial_proofs: [
        { type: '6-Month Stamped Bank Statements', minimum_balance_or_amount: '£2,500 - £5,000+ equivalent in NGN', time_frame: 'Past 6 consecutive months', notes: 'Must demonstrate legitimate, steady income without unexplainable lump sum deposits.' }
      ],
      faqs: [
        { question: 'Can Nigerian citizens travel to the UK without a visa?', answer: 'No. Nigerian citizens require a valid UK Standard Visitor Visa stamped in their passport prior to boarding flights to the UK.' },
        { question: 'How much money must a Nigerian applicant show for a UK visitor visa?', answer: 'UKVI does not state a specific minimum balance, but applicants must demonstrate sufficient disposable income to cover all trip expenses (typically £2,500 to £5,000+ equivalent in Naira) with legitimate, traceable funds supported by 6 months of bank statements.' },
        { question: 'Where are UK visa application centres located in Nigeria?', answer: 'UK visa biometrics are captured at TLScontact / VFS Global centres in Lagos (Victoria Island and Ikeja) and Abuja.' }
      ],
      validity: '6 Months / 2 Years / 5 Years / 10 Years',
      validity_details: 'Standard visa is valid for 6 months; multi-year long-term visas available.',
      stay_duration: 'Up to 6 Months per Visit (180 Days)',
      stay_duration_details: 'Permitted stay duration on each trip.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Enter and leave the UK multiple times during the visa validity.',
      validity_and_stay: {
        visa_validity: '6 Months to 10 Years',
        max_stay_per_entry: 'Up to 6 Months',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // ── 10. BRAZIL -> USA (B1/B2 Consular Visitor Visa) ──
  if (from === 'brazil' && to === 'usa') {
    return {
      passport_country: 'Brazil',
      destination_country: 'USA',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'B1/B2 Visitor Visa (Nonimmigrant)',
      source_url: 'https://br.usembassy.gov/visas/tourism-visitor/',
      official_source_name: 'U.S. Embassy & Consulates in Brazil / U.S. Department of State',
      overview: 'Brazilian citizens traveling to the United States for tourism, family visits, leisure, or medical treatment require a U.S. B1/B2 Nonimmigrant Visitor Visa. The application requires completing the online DS-160 form, paying the $185 USD MRV fee, attending a biometrics appointment at an Applicant Service Center (CASV), and completing an in-person consular interview at the U.S. Embassy in Brasília or U.S. Consulates General in São Paulo, Rio de Janeiro, Recife, or Porto Alegre. Once approved, the visa is typically issued with a 10-year multiple-entry validity.',
      highlights: [
        { icon: '🗽', title: '10-Year Multiple Entry', description: 'Most approved Brazilian applicants receive a full 10-year multiple-entry B1/B2 visa.' },
        { icon: '🌴', title: 'Explore the USA', description: 'Visit Orlando theme parks, Miami, New York, California, and national parks.' },
        { icon: '🏛️', title: '5 Consular Locations', description: 'Interviews available in Brasília, São Paulo, Rio de Janeiro, Recife, and Porto Alegre.' },
        { icon: '📅', title: '6-Month Stay per Entry', description: 'U.S. Customs and Border Protection (CBP) typically grants up to 6 months stay upon arrival.' }
      ],
      how_to_apply: [
        'Complete Form DS-160: Fill out the online nonimmigrant visa application on ceac.state.gov and print the confirmation page.',
        'Register and Pay MRV Fee: Create an account on ais.usvisa-info.com and pay the statutory $185 USD application fee.',
        'Schedule Appointments: Book two appointments — one at the CASV (biometrics & photo) and one at the U.S. Embassy or Consulate (interview).',
        'Attend CASV Appointment: Submit digital fingerprints and photo at the Centro de Atendimento ao Solicitante de Visto (CASV).',
        'Attend Consular Interview: Interview in Portuguese or English with a U.S. consular officer, demonstrating ties to Brazil.',
        'Receive Passport & Visa: Collect your passport from the CASV or receive it via Sedex courier with the 10-year B1/B2 visa.'
      ],
      documents_required: [
        { title: 'Valid Brazilian Passport', description: 'Valid for at least 6 months beyond intended stay in the U.S.', is_mandatory: true },
        { title: 'DS-160 Confirmation Page', description: 'Printed confirmation page with barcode from CEAC portal.', is_mandatory: true },
        { title: 'MRV Payment Receipt & Appointment Confirmation', description: 'Proof of $185 USD fee payment and appointment confirmation letter.', is_mandatory: true },
        { title: 'Proof of Economic Ties to Brazil', description: 'Employment contract (carteira de trabalho), pay stubs (holerites), Income Tax Return (Declaração de Imposto de Renda - IRPF).', is_mandatory: true },
        { title: 'Bank Statements & Financial Solvency', description: 'Recent 3 to 6 months checking/investment account statements.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '$185 USD (R$ ~950 – R$ 1,100 BRL)',
        service_fee: '$0 (CASV appointment included)',
        total_fee: '$185 USD',
        notes: 'Non-refundable statutory MRV fee paid via credit card or boleto bancário.'
      },
      processing_time: '3 to 5 Business Days Post-Interview',
      processing_time_details: 'Passport issued and delivered within 3 to 10 days following consular approval. Appointment wait times vary by post.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Must be valid for at least 6 months beyond departure date.' },
        { category: 'Section 214(b)', details: 'Applicant must overcome presumption of immigrant intent by demonstrating strong social and economic ties to Brazil.' }
      ],
      financial_proofs: [
        { type: 'Bank & Investment Statements', minimum_balance_or_amount: 'Sufficient funds for trip duration ($3,000 - $6,000+ USD)', time_frame: 'Last 3 to 6 months', notes: 'Showing regular income and accumulated savings.' }
      ],
      faqs: [
        { question: 'Do Brazilian citizens need a visa to visit the United States?', answer: 'Yes. Brazilian passport holders must obtain a B1/B2 visitor visa prior to traveling to the United States. Brazil is not currently part of the Visa Waiver Program (ESTA).' },
        { question: 'How long is the U.S. tourist visa valid for Brazilians?', answer: 'Under reciprocal agreements, most B1/B2 tourist visas issued to Brazilian citizens are valid for 10 years with multiple entries.' },
        { question: 'Can the consular interview in Brazil be conducted in Portuguese?', answer: 'Yes. U.S. consular officers at all posts in Brazil (Brasília, São Paulo, Rio, Recife, Porto Alegre) speak Portuguese.' }
      ],
      validity: '10 Years',
      validity_details: 'Standard 10-year multiple-entry visa for Brazilian passport holders.',
      stay_duration: 'Up to 6 Months per Visit (180 Days)',
      stay_duration_details: 'Determined by CBP officer at Port of Entry on Form I-94.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple entries permitted over the 10-year duration.',
      validity_and_stay: {
        visa_validity: '10 Years',
        max_stay_per_entry: 'Up to 6 Months',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // ── 11. JAPAN -> AUSTRALIA (Australian ETA Subclass 601) ──
  if (from === 'japan' && to === 'australia') {
    return {
      passport_country: 'Japan',
      destination_country: 'Australia',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Electronic Travel Authority (ETA - Subclass 601)',
      source_url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
      official_source_name: 'Department of Home Affairs (Australian Government) / Australian Embassy Tokyo',
      overview: 'Japanese passport holders are eligible for the Australian Electronic Travel Authority (ETA - Subclass 601). The ETA is applied for directly using the official "Australian ETA" smartphone app on iOS or Android. It allows Japanese citizens to visit Australia for tourism, family visits, holidays, or short business visitor activities for up to 3 months per visit over a 12-month validity period. Most applications are approved automatically within minutes.',
      highlights: [
        { icon: '⚡', title: 'Instant Mobile Grant', description: 'Apply via the official Australian ETA app with instant digital approval linked to your Japanese ePassport.' },
        { icon: '🇦🇺', title: '12-Month Multi-Entry', description: 'Valid for 1 year with unlimited entries; stay up to 3 months on each visit.' },
        { icon: '💵', title: 'AUD $20 Service Fee', description: 'Statutory government visa fee is $0 AUD; only a AUD $20 mobile processing fee applies.' },
        { icon: '🏖️', title: 'Holiday & Sightseeing', description: 'Explore Sydney, Melbourne, the Great Barrier Reef, Gold Coast, and Outback.' }
      ],
      how_to_apply: [
        'Download Official App: Install the "Australian ETA" app from Apple App Store or Google Play Store.',
        'Scan Japanese ePassport: Use your smartphone camera and NFC reader to scan your Japanese passport chip.',
        'Take Live Selfie: Capture a live facial photograph within the app for biometric identity verification.',
        'Answer Declarations: Answer standard security and criminal history declarations.',
        'Pay AUD $20 Fee: Pay the AUD $20 application service charge using Apple Pay, Google Pay, or credit card.',
        'Instant Digital Confirmation: Receive your approved ETA reference number linked electronically to your passport.'
      ],
      documents_required: [
        { title: 'Valid Japanese ePassport', description: 'Original Japanese passport with biometric microchip, valid for intended stay in Australia.', is_mandatory: true },
        { title: 'Australian ETA Mobile App', description: 'Downloaded on NFC-enabled smartphone to complete biometric identity check.', is_mandatory: true },
        { title: 'Valid Payment Method', description: 'Credit card or digital wallet (Apple Pay/Google Pay) for AUD $20 service fee.', is_mandatory: true },
        { title: 'Return Flight & Solvency', description: 'Return flight booking and access to sufficient funds for stay in Australia.', is_mandatory: false }
      ],
      costs: {
        visa_fee: 'AUD $0 (No government visa charge)',
        service_fee: 'AUD $20 (~¥2,000 JPY)',
        total_fee: 'AUD $20',
        notes: 'Charged via the official Australian ETA mobile app.'
      },
      processing_time: 'Instant (Under 24 Hours)',
      processing_time_details: 'Over 90% of Japanese ETA applications are granted instantly within minutes.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Must be a valid Japanese biometric passport.' },
        { category: 'Genuine Temporary Entrant', details: 'Must visit genuinely for holiday, sightseeing, or family visits without undertaking work.' }
      ],
      financial_proofs: [
        { type: 'Credit Cards / Funds', minimum_balance_or_amount: 'AUD $1,000 - $2,000 per month of stay', time_frame: 'Valid cards', notes: 'Proof of economic solvency.' }
      ],
      faqs: [
        { question: 'Do Japanese citizens need a visa for Australia?', answer: 'Japanese citizens require an Electronic Travel Authority (ETA - Subclass 601), which is easily obtained on a smartphone via the official Australian ETA app.' },
        { question: 'How long can Japanese tourists stay in Australia on an ETA?', answer: 'The Subclass 601 ETA permits stays of up to 3 months (90 days) on each entry over a 12-month validity period.' },
        { question: 'Can Japanese travelers use the ePassport SmartGate in Australia?', answer: 'Yes. Japanese ePassport holders aged 16 and over can use the automated SmartGates at all major Australian international airports.' }
      ],
      validity: '12 Months (1 Year)',
      validity_details: 'Valid for 1 year from date of grant or until passport expires.',
      stay_duration: 'Up to 3 Months per Visit (90 Days)',
      stay_duration_details: 'Maximum stay of 3 consecutive months on each entry.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Enter Australia as many times as desired during the 12-month validity.',
      validity_and_stay: {
        visa_validity: '12 Months',
        max_stay_per_entry: 'Up to 3 Months',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // ── 12. SOUTH AFRICA -> CANADA (Temporary Resident Visa - TRV) ──
  if (from === 'south-africa' && to === 'canada') {
    return {
      passport_country: 'South Africa',
      destination_country: 'Canada',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Visitor Visa (Temporary Resident Visa - TRV)',
      source_url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
      official_source_name: 'Immigration, Refugees and Citizenship Canada (IRCC) & VFS Global South Africa',
      overview: 'South African passport holders require a Temporary Resident Visa (Visitor Visa TRV) to travel to Canada for tourism, holidays, or family visits. Applications are submitted online through the IRCC Portal, followed by mandatory biometric enrollment (fingerprints and photo) at a VFS Global Visa Application Centre (VAC) in Johannesburg, Cape Town, or Pretoria. Once approved, the visa is issued as a foil vignette in the passport, often valid up to the expiration date of the passport (up to 10 years).',
      highlights: [
        { icon: '🍁', title: 'Multi-Year Visitor Visa', description: 'Frequently granted as a multiple-entry visa valid up to 10 years (or passport expiry).' },
        { icon: '📱', title: 'Online IRCC Portal', description: 'Apply and upload all financial and personal documents directly via canada.ca.' },
        { icon: '🏢', title: 'VFS VACs in SA', description: 'Biometric enrollment available in Johannesburg, Cape Town, and Pretoria.' },
        { icon: '🏔️', title: '6-Month Stay per Entry', description: 'Standard stay of up to 6 months granted by Canada Border Services Agency (CBSA).' }
      ],
      how_to_apply: [
        'Create IRCC Account: Register on the official IRCC portal (canada.ca) and begin Visitor Visa application.',
        'Complete Form IMM 5257: Fill out Application for Temporary Resident Visa and Family Information (IMM 5645).',
        'Upload Documents: Upload 6 months bank statements, employment verification letter, flight itinerary, and hotel reservations.',
        'Pay IRCC Fees: Pay CAD $100 visa processing fee and CAD $85 biometric fee online by credit card.',
        'Receive Biometric Instruction Letter (BIL): Download BIL and schedule an appointment at VFS Global in Johannesburg, Cape Town, or Pretoria.',
        'Attend Biometrics Appointment: Provide fingerprints and facial photo at the VAC.',
        'Passport Submission & Return: Upon receiving the passport request letter (PPR), submit passport to VFS for visa stamping.'
      ],
      documents_required: [
        { title: 'Valid South African Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
        { title: 'Proof of Financial Solvency', description: '6 months stamped South African bank statements demonstrating sufficient funds (typically ZAR 50,000 to 100,000+).', is_mandatory: true },
        { title: 'Employment Confirmation Letter', description: 'Letter from employer in South Africa stating job title, salary, approved leave dates, and return date.', is_mandatory: true },
        { title: 'Purpose of Travel & Travel Itinerary', description: 'Flight reservations, hotel bookings, or invitation letter from friends/family in Canada with proof of their Canadian status.', is_mandatory: true },
        { title: 'Proof of Ties to South Africa', description: 'Property title deeds, lease agreement, marriage/children certificates, or business registration (CIPC).', is_mandatory: true }
      ],
      costs: {
        visa_fee: 'CAD $100 (~ZAR 1,400)',
        service_fee: 'CAD $85 (~ZAR 1,200) Biometrics Fee',
        total_fee: 'CAD $185 (~ZAR 2,600)',
        notes: 'Biometrics fee is valid for 10 years; paid once during a 10-year period.'
      },
      processing_time: '4 to 8 Weeks',
      processing_time_details: 'Processing typically takes between 25 and 45 business days after biometrics submission at VFS South Africa.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Must be valid for duration of intended stay with blank visa foil pages.' },
        { category: 'Intent to Return', details: 'Applicant must prove they will leave Canada at the end of their authorized stay.' }
      ],
      financial_proofs: [
        { type: '6-Month Stamped Bank Statements', minimum_balance_or_amount: 'CAD $3,000 - $6,000+ (ZAR 50,000 - 100,000+)', time_frame: 'Past 6 consecutive months', notes: 'Showing steady deposits and proof of economic standing.' }
      ],
      faqs: [
        { question: 'Can South Africans visit Canada without a visa?', answer: 'No. South African citizens require a Temporary Resident Visa (Visitor Visa TRV) before traveling to Canada. South Africa is not currently eTA-eligible for initial travel.' },
        { question: 'Where are Canadian visa application centres in South Africa?', answer: 'VFS Global operates Canada Visa Application Centres in Johannesburg (Rivonia), Cape Town, and Pretoria.' },
        { question: 'How long can a South African stay in Canada on a visitor visa?', answer: 'Canadian border officers (CBSA) typically stamp visitors in for up to 6 months per entry.' }
      ],
      validity: 'Up to 10 Years (or Passport Validity)',
      validity_details: 'Multi-entry visa issued up to the expiry date of the South African passport.',
      stay_duration: 'Up to 6 Months per Visit',
      stay_duration_details: 'Standard 6-month stay granted by CBSA at port of entry.',
      entry_type: 'Multiple Entry',
      entry_type_details: 'Multiple entries permitted for tourism, family visits, and leisure.',
      validity_and_stay: {
        visa_validity: 'Up to 10 Years',
        max_stay_per_entry: 'Up to 6 Months',
        entry_type: 'Multiple Entry'
      }
    };
  }

  // 10. General Non-India Origin Resolver
  // If from is one of our 20 origins and heading to any country:
  if (from && from !== 'india' && to) {
    // If destination is India:
    if (to === 'india') {
      return {
        passport_country: fromName,
        destination_country: 'India',
        purpose_of_visit: 'Tourism / Vacation',
        visa_type: 'India e-Tourist Visa (eTV)',
        source_url: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
        official_source_name: 'Ministry of Home Affairs & Bureau of Immigration (BOI)',
        overview: `${fromName} passport holders can travel to India easily by securing an official electronic visa (India e-Visa) online prior to departure. The e-Tourist Visa is available for 30 days (double entry), 1 year (multiple entry), or 5 years (multiple entry) for sightseeing, yoga retreats, visiting friends/relatives, and recreation.`,
        highlights: [
          { icon: '🕌', title: 'Taj Mahal & Golden Triangle', description: 'Explore iconic wonders in Agra, Delhi, and Jaipur.' },
          { icon: '📱', title: '100% Digital e-Visa', description: 'Apply and receive your electronic visa PDF entirely online via indianvisaonline.gov.in.' },
          { icon: '🧘', title: 'Yoga & Wellness Retreats', description: 'Ideal for spiritual journeys, Ayurveda, and meditation across Kerala, Goa, and Rishikesh.' },
          { icon: '✈️', title: '30+ International Airports', description: 'Clear immigration at 31 designated international airports across India.' }
        ],
        how_to_apply: [
          'Visit Official Government Portal: Access indianvisaonline.gov.in/evisa (avoid commercial clone sites).',
          'Fill Application Online: Upload passport information page scan and recent color square photograph.',
          'Pay Visa Fee: Pay statutory government e-Visa fee ($10 to $80 USD depending on season and duration).',
          'Receive Electronic Travel Authorization (ETA): Approved ETA is sent via email within 24 to 72 hours.',
          'Print ETA PDF: Carry a printed copy of the ETA to present to airline and Indian immigration.',
          'Biometrics on Arrival: Have biometric fingerprints captured at designated airport immigration counters.'
        ],
        documents_required: [
          { title: `Valid ${fromName} Passport`, description: 'Valid for at least 6 months with at least 2 blank pages.', is_mandatory: true },
          { title: 'Scanned Passport Biodata Page', description: 'Clear PDF copy of passport information page.', is_mandatory: true },
          { title: 'Digital Passport Photograph', description: 'Recent square color photo on white background (JPEG format).', is_mandatory: true },
          { title: 'Return Flight Booking', description: 'Confirmed return ticket leaving India.', is_mandatory: true }
        ],
        costs: {
          visa_fee: '$10 - $25 USD (30-day e-Visa) / $40 USD (1-Year) / $80 USD (5-Year)',
          service_fee: '$0 (Official Portal)',
          total_fee: '$25 – $80 USD',
          notes: 'Official fee depends on selected validity (30-day, 1-year, or 5-year).'
        },
        processing_time: '24 to 72 Hours',
        processing_time_details: 'Apply at least 4 days in advance of departure date.',
        other_requirements: [
          { category: 'Passport Validity', details: 'Must have at least 6 months validity.' },
          { category: 'Designated Ports', details: 'Valid for entry through 31 designated airports and 5 seaports.' }
        ],
        financial_proofs: [
          { type: 'Credit Cards / Cash', minimum_balance_or_amount: 'Sufficient funds for stay', time_frame: 'Valid cards', notes: 'International Visa and Mastercard work across India.' }
        ],
        faqs: [
          { question: `Do ${fromName} citizens need a visa for India?`, answer: `Yes, ${fromName} passport holders require a visa, which can be obtained quickly online as an official India e-Tourist Visa at indianvisaonline.gov.in.` },
          { question: 'What is the processing time for India e-Visa?', answer: 'Standard processing takes between 24 and 72 hours.' }
        ],
        validity: '30 Days / 1 Year / 5 Years',
        validity_details: 'Selected at time of application.',
        stay_duration: 'Up to 90 Days per Visit (Continuous)',
        stay_duration_details: 'US and UK citizens can stay up to 180 days per visit on 1-year or 5-year visas.',
        entry_type: 'Double / Multiple Entry',
        entry_type_details: 'Double entry for 30-day; multiple entry for 1-year/5-year.',
        validity_and_stay: {
          visa_validity: '30 Days to 5 Years',
          max_stay_per_entry: '90 to 180 Days',
          entry_type: 'Multiple Entry'
        }
      };
    }

    // Generic fallback for non-India origin to any country
    return {
      passport_country: fromName,
      destination_country: toName,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: `${toName} Tourist Entry for ${fromName} Citizens`,
      source_url: `https://www.google.com/search?q=${encodeURIComponent(toName + ' visa requirements for ' + fromName + ' citizens')}`,
      official_source_name: `${toName} Ministry of Foreign Affairs & Immigration`,
      overview: `${fromName} passport holders traveling to ${toName} for tourism, holidays, or family visits should review destination visa guidelines. Many bilateral visa-free, eVisa, or visa-on-arrival agreements exist between ${fromName} and ${toName}.`,
      highlights: [
        { icon: '🛂', title: 'Global Passport Access', description: `${fromName} passport offers strong international mobility and reciprocal travel access.` },
        { icon: '📱', title: 'eVisa / Visa-Free Options', description: `Check whether an electronic travel permit or visa on arrival is available for ${toName}.` },
        { icon: '🏛️', title: 'Consular Assistance', description: `Access official ${fromName} embassy and diplomatic missions abroad if assistance is needed.` },
        { icon: '✈️', title: 'Safe Travel', description: `Follow official ${fromName} government travel advisories for safety and health guidance.` }
      ],
      how_to_apply: [
        `Verify Passport Validity: Ensure your ${fromName} passport has at least 6 months validity remaining.`,
        `Check Specific Entry Rules: Confirm if ${toName} grants visa-free access, eVisa, or requires a consular visa.`,
        'Prepare Travel Documents: Book confirmed return flights, lodging, and international travel medical insurance.',
        'Submit Online Application (if applicable): Complete official digital application form or pay entry fee.',
        `Clear Border Control: Present your ${fromName} passport and travel itinerary upon landing in ${toName}.`
      ],
      documents_required: [
        { title: `Valid ${fromName} Passport`, description: 'Original passport valid for at least 6 months with blank pages.', is_mandatory: true },
        { title: 'Confirmed Return Air Ticket', description: `Round-trip flight booking departing ${toName}.`, is_mandatory: true },
        { title: 'Accommodation Booking', description: 'Hotel, resort, or host address.', is_mandatory: true },
        { title: 'Travel Health Insurance', description: 'Comprehensive coverage recommended for overseas travel.', is_mandatory: false }
      ],
      costs: {
        visa_fee: 'Varies by Destination (Free to $100 USD)',
        service_fee: 'Varies',
        total_fee: 'Check Official Consular Fee',
        notes: `Statutory fee depends on bilateral agreements between ${fromName} and ${toName}.`
      },
      processing_time: 'Instant to 5-10 Business Days',
      processing_time_details: 'Varies based on whether destination offers visa-free access, eVisa, or embassy processing.',
      other_requirements: [
        { category: 'Passport Validity', details: 'Must have at least 6 months validity from arrival date.' },
        { category: 'Onward Ticket', details: 'Mandatory return or onward flight booking.' }
      ],
      financial_proofs: [
        { type: 'Credit Cards / Funds', minimum_balance_or_amount: 'Sufficient funds for duration of trip', time_frame: 'Valid cards', notes: 'Proof of economic solvency.' }
      ],
      faqs: [
        { question: `Do ${fromName} citizens need a visa for ${toName}?`, answer: `Entry requirements depend on bilateral agreements between ${fromName} and ${toName}. Many destinations offer visa-free entry, an eVisa, or Visa on Arrival.` },
        { question: 'What is the passport validity requirement?', answer: `Most international destinations require at least 6 months validity remaining on your ${fromName} passport.` }
      ],
      validity: '30 to 90 Days',
      validity_details: 'Standard tourist stay duration.',
      stay_duration: 'Up to 90 Days',
      stay_duration_details: 'Maximum duration per entry.',
      entry_type: 'Single / Multiple Entry',
      entry_type_details: 'Subject to immigration authority.',
      validity_and_stay: {
        visa_validity: '30 to 90 Days',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single / Multiple Entry'
      }
    };
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. PURE ROUTE STUDENT RESOLVER
// ═══════════════════════════════════════════════════════════════════════════════
export function resolvePureRouteStudent(fromRaw: string, toRaw: string): StructuredVisaRequirements | null {
  const from = normalizeCountry(fromRaw);
  const to = normalizeCountry(toRaw);
  const fromName = cleanCountryName(fromRaw);
  const toName = cleanCountryName(toRaw);

  if (from === 'india') return null;

  // EU to EU Student
  if ((isEUMember(from) || isSchengenMember(from)) && (isEUMember(to) || isSchengenMember(to))) {
    return {
      passport_country: fromName,
      destination_country: toName,
      purpose_of_visit: 'Higher Education / Studies',
      visa_type: 'EU Student Mobility (No Visa Required)',
      source_url: 'https://europa.eu/youreurope/citizens/education/university/admission-entry-conditions/index_en.htm',
      official_source_name: 'European Commission & Erasmus+ Higher Education',
      overview: `As an EU/EEA citizen from ${fromName}, you have the unrestricted right to study at any accredited university or higher education institution in ${toName} under the exact same tuition conditions, fees, and admission rights as domestic students. No student visa or residence permit is required.`,
      highlights: [
        { icon: '🎓', title: 'Equal Tuition Rights', description: `Pay the exact same tuition fees as domestic ${toName} students (often tuition-free).` },
        { icon: '🚫', title: 'Zero Visa Requirements', description: 'No study visa, consular interview, or VFS appointments needed.' },
        { icon: '💼', title: 'Unrestricted Work Rights', description: 'Full right to work part-time or full-time during your studies without a work permit.' },
        { icon: '🏥', title: 'EHIC Medical Cover', description: 'Use your European Health Insurance Card for full student healthcare access.' }
      ],
      how_to_apply: [
        `Secure University Admission: Apply directly to your chosen institution in ${toName}.`,
        'Enrol & Pay Domestic Fees: Complete academic enrolment at domestic student rates.',
        `Travel to ${toName}: Travel freely using your ${fromName} passport or National ID Card.`,
        'Register Municipal Residence: For stays over 3 months, register your student address at the local city hall.'
      ],
      documents_required: [
        { title: `Valid ${fromName} Passport or National ID Card`, description: 'Valid national identification.', is_mandatory: true },
        { title: 'University Letter of Acceptance', description: 'Official confirmation of admission/enrolment.', is_mandatory: true },
        { title: 'European Health Insurance Card (EHIC)', description: 'Valid health card from home country.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '€0 (No Visa Required)',
        service_fee: '€0',
        total_fee: 'FREE',
        notes: 'EU citizens exercise treaty educational mobility rights with zero visa fees.'
      },
      processing_time: 'Instant (0 Days)',
      processing_time_details: 'Zero visa processing required.',
      other_requirements: [
        { category: 'Admission Proof', details: 'Unconditional admission to an accredited university.' },
        { category: 'Local Registration', details: 'Municipal address registration if staying over 3 months.' }
      ],
      financial_proofs: [
        { type: 'Declaration of Resources', minimum_balance_or_amount: 'Self-declaration', time_frame: 'Annual', notes: 'Simple declaration that you have sufficient resources.' }
      ],
      faqs: [
        { question: `Do ${fromName} students need a visa for ${toName}?`, answer: `No! EU citizens have the automatic right to study in any other EU country without a student visa.` },
        { question: 'Do I get work rights as an EU student?', answer: 'Yes, you can work full-time or part-time with zero work permit restrictions.' }
      ],
      validity: 'Full Duration of Academic Program',
      validity_details: 'Valid for complete degree duration.',
      stay_duration: 'Length of Studies',
      stay_duration_details: 'Unrestricted student residency.',
      entry_type: 'Freedom of Movement',
      entry_type_details: 'EU treaty mobility.',
      validity_and_stay: {
        visa_validity: 'Duration of Course',
        max_stay_per_entry: 'Unlimited',
        entry_type: 'Freedom of Movement'
      }
    };
  }

  // General non-India student route
  return {
    passport_country: fromName,
    destination_country: toName,
    purpose_of_visit: 'Higher Education / Studies',
    visa_type: `${toName} International Student Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(toName + ' student visa for ' + fromName + ' citizens')}`,
    official_source_name: `${toName} Department of Immigration & Higher Education`,
    overview: `${fromName} citizens seeking to pursue full-time higher education in ${toName} must secure an official acceptance letter from an accredited university and apply for a national student visa or study permit.`,
    highlights: [
      { icon: '🎓', title: 'Accredited Degree Programs', description: `Pursue Bachelor's, Master's, or PhD programs in ${toName}.` },
      { icon: '💼', title: 'Student Work Rights', description: 'Part-time employment authorization permitted during term time.' },
      { icon: '🚀', title: 'Post-Study Pathways', description: 'Qualify for graduate post-study work authorization upon degree completion.' },
      { icon: '🗣️', title: 'English Exemption', description: ['usa', 'uk', 'canada', 'australia', 'new-zealand'].includes(from) ? 'Native English speakers are exempt from IELTS/TOEFL standardized testing.' : 'Check university language proficiency criteria.' }
    ],
    how_to_apply: [
      `Obtain Offer Letter: Secure admission from an accredited institution in ${toName}.`,
      'Prepare Financial Solvency: Demonstrate funds covering tuition and living expenses.',
      'Submit Student Visa Application: Apply online or through the diplomatic mission of destination country.',
      'Provide Biometrics: Submit biometric data if required.',
      `Travel to ${toName}: Enter on student visa and complete university matriculation.`
    ],
    documents_required: [
      { title: `Valid ${fromName} Passport`, description: 'Valid for duration of academic study.', is_mandatory: true },
      { title: 'Official Acceptance / Enrolment Letter', description: 'From accredited educational institution.', is_mandatory: true },
      { title: 'Proof of Financial Maintenance', description: 'Bank statements or student financial aid confirmation.', is_mandatory: true },
      { title: 'Student Health Insurance', description: 'Comprehensive medical insurance covering stay.', is_mandatory: true }
    ],
    costs: {
      visa_fee: 'Statutory Student Visa Fee',
      service_fee: 'Processing / VAC Fee',
      total_fee: 'Varies by destination ($50 – $350 USD)',
      notes: 'Check official immigration portal of destination country.'
    },
    processing_time: '2 to 8 Weeks',
    processing_time_details: 'Apply 2 to 3 months before academic term begins.',
    other_requirements: [
      { category: 'Academic Standing', details: 'Certified copies of prior diplomas and academic transcripts.' },
      { category: 'Language Criteria', details: ['usa', 'uk', 'canada', 'australia'].includes(from) ? 'Exempt from English language proficiency tests.' : 'Language test certificate if applicable.' }
    ],
    financial_proofs: [
      { type: 'Bank Statement / Loan / Scholarship', minimum_balance_or_amount: 'Covers 1 year tuition + living', time_frame: 'Last 3-6 months', notes: 'Demonstrates funds to support education.' }
    ],
    faqs: [
      { question: `Can ${fromName} students work part-time while studying?`, answer: 'Yes, most international student visas permit up to 20 hours per week of work during semester terms.' }
    ],
    validity: 'Duration of Degree Program',
    validity_details: 'Covers full course duration plus post-study grace period.',
    stay_duration: 'Academic Course Length',
    stay_duration_details: 'Renewable annually.',
    entry_type: 'Multiple Entry',
    entry_type_details: 'Multiple entry student visa.',
    validity_and_stay: {
      visa_validity: 'Course Duration',
      max_stay_per_entry: 'Full Term',
      entry_type: 'Multiple Entry'
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. PURE ROUTE WORK RESOLVER
// ═══════════════════════════════════════════════════════════════════════════════
export function resolvePureRouteWork(fromRaw: string, toRaw: string): StructuredVisaRequirements | null {
  const from = normalizeCountry(fromRaw);
  const to = normalizeCountry(toRaw);
  const fromName = cleanCountryName(fromRaw);
  const toName = cleanCountryName(toRaw);

  if (from === 'india') return null;

  // EU to EU Work
  if ((isEUMember(from) || isSchengenMember(from)) && (isEUMember(to) || isSchengenMember(to))) {
    return {
      passport_country: fromName,
      destination_country: toName,
      purpose_of_visit: 'Work / Employment',
      visa_type: 'EU Right to Work (No Work Permit Required)',
      source_url: 'https://europa.eu/youreurope/citizens/work/work-abroad/work-permits/index_en.htm',
      official_source_name: 'European Commission — Free Movement of Workers',
      overview: `As an EU citizen from ${fromName}, you have the absolute treaty right to take up employment, work as a freelancer, or establish a business in ${toName} under the exact same conditions as nationals of ${toName}. No work permit, visa sponsorship, or labour market test is required.`,
      highlights: [
        { icon: '💼', title: 'No Work Permit Needed', description: 'Direct hiring without sponsorship fees, quotas, or labour market testing.' },
        { icon: '⚖️', title: 'Equal Treatment', description: 'Entitled to the exact same working conditions, pay scales, and social benefits as locals.' },
        { icon: '👨‍👩‍👧', title: 'Family Relocation', description: 'Family members can join and work in the host country with zero restrictions.' },
        { icon: '📈', title: 'Career Mobility', description: 'Switch employers or start a business freely at any time.' }
      ],
      how_to_apply: [
        `Secure Job in ${toName}: Sign an employment contract or register as self-employed.`,
        `Move with ${fromName} Passport or ID: Relocate without applying for any consular visa.`,
        'Register Tax & Social Security: Obtain your local tax identification number and register for national healthcare.',
        'Register Residence: Register your local address at the town hall within 3 months of moving.'
      ],
      documents_required: [
        { title: `Valid ${fromName} Passport or National ID Card`, description: 'Proof of EU citizenship.', is_mandatory: true },
        { title: 'Employment Contract or Job Offer Letter', description: 'Signed agreement with employer.', is_mandatory: true }
      ],
      costs: {
        visa_fee: '€0 (No Visa Required)',
        service_fee: '€0',
        total_fee: 'FREE',
        notes: 'EU citizens exercise fundamental labour treaty rights with zero fees.'
      },
      processing_time: 'Instant (0 Days)',
      processing_time_details: 'Unrestricted immediate right to commence work.',
      other_requirements: [
        { category: 'EU Citizenship', details: 'Valid passport or national ID confirming EU nationality.' }
      ],
      financial_proofs: [
        { type: 'Employment Salary', minimum_balance_or_amount: 'Statutory minimum wage', time_frame: 'Monthly', notes: 'Income from ongoing employment.' }
      ],
      faqs: [
        { question: `Do ${fromName} citizens need a work visa for ${toName}?`, answer: `No! Under EU law, ${fromName} citizens do not need a work visa or permit to work in ${toName}.` }
      ],
      validity: 'Indefinite',
      validity_details: 'Unrestricted EU worker right.',
      stay_duration: 'Unlimited',
      stay_duration_details: 'Unlimited residence as long as employed or self-sufficient.',
      entry_type: 'Freedom of Movement',
      entry_type_details: 'Direct employment access.',
      validity_and_stay: {
        visa_validity: 'Indefinite',
        max_stay_per_entry: 'Unlimited',
        entry_type: 'Freedom of Movement'
      }
    };
  }

  // General non-India work route
  return {
    passport_country: fromName,
    destination_country: toName,
    purpose_of_visit: 'Work / Employment',
    visa_type: `${toName} Skilled Employment Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(toName + ' work visa for ' + fromName + ' citizens')}`,
    official_source_name: `${toName} Department of Immigration & Labour`,
    overview: `${fromName} professionals seeking employment in ${toName} require a formal job offer from a licensed sponsoring employer, followed by a national skilled work visa or work authorization permit.`,
    highlights: [
      { icon: '💼', title: 'Employer Sponsorship', description: 'Requires qualifying job offer and sponsorship from an authorized enterprise.' },
      { icon: '⏱️', title: 'Settlement Pathway', description: 'Leads to permanent residency after continuous lawful employment.' },
      { icon: '👨‍👩‍👧', title: 'Spouse & Dependents', description: 'Eligible to sponsor spouse and minor children for residence and employment.' }
    ],
    how_to_apply: [
      `Secure Job Offer: Receive a formal binding employment contract from an employer in ${toName}.`,
      'Employer Files Petition: Sponsor secures necessary work permit authorization.',
      'Submit Consular Application: Apply online or via embassy consular section.',
      'Book Biometrics: Attend appointment for fingerprint and photo capture.',
      `Relocate to ${toName}: Arrive and collect local residence card.`
    ],
    documents_required: [
      { title: `Valid ${fromName} Passport`, description: 'Valid for duration of employment.', is_mandatory: true },
      { title: 'Signed Employment Contract', description: 'Full-time agreement specifying role and remuneration.', is_mandatory: true },
      { title: 'Educational Credentials & CV', description: 'Degree certificates and professional resume.', is_mandatory: true },
      { title: 'Police Clearance Certificate (PCC)', description: 'Clean criminal record background check.', is_mandatory: true }
    ],
    costs: {
      visa_fee: 'Official Statutory Work Visa Fee',
      service_fee: 'Consular / VAC logistics',
      total_fee: 'Varies by destination ($150 – $600 USD)',
      notes: 'Employer petition fees are often covered by sponsoring enterprise.'
    },
    processing_time: '3 to 8 Weeks',
    processing_time_details: 'Depends on labour market clearance and consular review.',
    other_requirements: [
      { category: 'Contract Minimum', details: 'Must meet statutory minimum prevailing wage.' }
    ],
    financial_proofs: [
      { type: 'Employment Contract Salary', minimum_balance_or_amount: 'Covers living expenses', time_frame: 'Contract duration', notes: 'Guaranteed salary under contract.' }
    ],
    faqs: [
      { question: `Can my family accompany me to ${toName}?`, answer: 'Yes, skilled work visa holders can generally sponsor their spouse and dependent children.' }
    ],
    validity: '1 to 3 Years (Renewable)',
    validity_details: 'Tied to employment contract duration.',
    stay_duration: 'Contract Length',
    stay_duration_details: 'Renewable locally.',
    entry_type: 'Multiple Entry',
    entry_type_details: 'Multiple entry work authorization.',
    validity_and_stay: {
      visa_validity: '1 to 3 Years',
      max_stay_per_entry: 'Full Contract Duration',
      entry_type: 'Multiple Entry'
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. PURE ROUTE BUSINESS RESOLVER
// ═══════════════════════════════════════════════════════════════════════════════
export function resolvePureRouteBusiness(fromRaw: string, toRaw: string): StructuredVisaRequirements | null {
  const from = normalizeCountry(fromRaw);
  const to = normalizeCountry(toRaw);
  const fromName = cleanCountryName(fromRaw);
  const toName = cleanCountryName(toRaw);

  if (from === 'india') return null;

  return {
    passport_country: fromName,
    destination_country: toName,
    purpose_of_visit: 'Business / Commercial',
    visa_type: `${toName} Business Visitor Authorization`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(toName + ' business visa requirements for ' + fromName + ' citizens')}`,
    official_source_name: `${toName} Ministry of Foreign Affairs & Commerce`,
    overview: `${fromName} business travelers visiting ${toName} can attend corporate meetings, trade exhibitions, negotiations, and client conferences under short-term business visitor status.`,
    highlights: [
      { icon: '🤝', title: 'Corporate Negotiations', description: 'Contract signing, client discussions, and strategic meetings.' },
      { icon: '⚡', title: 'Streamlined Entry', description: 'Many bilateral agreements allow visa-free or eVisa entry for business.' },
      { icon: '💼', title: 'Commercial Fairs', description: 'Participate in international industrial trade expos.' }
    ],
    how_to_apply: [
      `Check Bilateral Waiver: If ${fromName} has visa waiver with ${toName}, travel directly.`,
      'Obtain Invitation Letter: Secure formal invitation from host company in destination country.',
      'Submit Online Application: Complete digital form if visa/ETA is required.',
      'Enter and Conduct Business: Permitted business meetings without local employment.'
    ],
    documents_required: [
      { title: `Valid ${fromName} Passport`, description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Business Invitation Letter', description: 'From registered corporate entity in destination country.', is_mandatory: true },
      { title: 'Employer Dispatch Letter', description: 'Confirming role, purpose, and financial backing.', is_mandatory: true }
    ],
    costs: {
      visa_fee: '€0 to $150 USD (Depends on bilateral waiver)',
      service_fee: '$0 to $30 USD',
      total_fee: 'Varies',
      notes: 'Visa-exempt travelers pay nominal or zero fee.'
    },
    processing_time: 'Instant to 5 Business Days',
    processing_time_details: 'Digital or consular turnaround.',
    other_requirements: [
      { category: 'No Local Gainful Employment', details: 'Cannot receive local salary from destination enterprise.' }
    ],
    financial_proofs: [
      { type: 'Corporate Financial Guarantee', minimum_balance_or_amount: 'Employer covers expenses', time_frame: 'Duration of visit', notes: 'Letter confirming corporate sponsorship.' }
    ],
    faqs: [
      { question: `Can ${fromName} citizens conduct business on a tourist visa?`, answer: 'Attending conferences, exploratory discussions, and trade fairs is permitted on business visitor/visa-exempt status.' }
    ],
    validity: '30 to 90 Days',
    validity_details: 'Short-term commercial visit.',
    stay_duration: 'Up to 90 Days',
    stay_duration_details: 'Max 90 days per entry.',
    entry_type: 'Multiple Entry',
    entry_type_details: 'Multiple entry commercial authorization.',
    validity_and_stay: {
      visa_validity: '30 to 90 Days',
      max_stay_per_entry: 'Up to 90 Days',
      entry_type: 'Multiple Entry'
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. PURE ROUTE PR RESOLVER
// ═══════════════════════════════════════════════════════════════════════════════
export function resolvePureRoutePR(fromRaw: string, toRaw: string): StructuredVisaRequirements | null {
  const from = normalizeCountry(fromRaw);
  const to = normalizeCountry(toRaw);
  const fromName = cleanCountryName(fromRaw);
  const toName = cleanCountryName(toRaw);

  if (from === 'india') return null;

  return {
    passport_country: fromName,
    destination_country: toName,
    purpose_of_visit: 'Permanent Residency / Immigration',
    visa_type: `${toName} Permanent Residence / Settlement`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(toName + ' permanent residence for ' + fromName + ' citizens')}`,
    official_source_name: `${toName} Department of Immigration & Citizenship`,
    overview: `${fromName} citizens seeking permanent settlement in ${toName} can access economic immigration programs, points-tested skilled worker categories, investment residency, or long-term employment pathways leading to permanent residence (PR).`,
    highlights: [
      { icon: '🏠', title: 'Permanent Settlement', description: 'Indefinite right to reside, work, and live without time limits.' },
      { icon: '🏥', title: 'National Healthcare', description: 'Full access to state medical care and social security systems.' },
      { icon: '🛂', title: 'Citizenship Pathway', description: 'Eligible to apply for full naturalization and passport after qualifying residence period.' }
    ],
    how_to_apply: [
      'Assess Eligibility: Evaluate points, language, and employment qualifications.',
      'Submit Expression of Interest (EOI): Register through national immigration portal.',
      'Receive Invitation to Apply (ITA): Gather police clearances, medicals, and documentation.',
      'Lodge Permanent Residence Dossier: Pay statutory processing fees.',
      'Receive PR Grant: Land in destination country and receive permanent resident card.'
    ],
    documents_required: [
      { title: `Valid ${fromName} Passport`, description: 'Valid original passport.', is_mandatory: true },
      { title: 'Police Clearance & Medical Exam', description: 'Certified clean criminal record and health clearance.', is_mandatory: true },
      { title: 'Proof of Funds / Income', description: 'Demonstrating economic self-sufficiency.', is_mandatory: true }
    ],
    costs: {
      visa_fee: '$1,000 to $4,000 USD (Statutory PR Fees)',
      service_fee: 'Biometrics & translation fees',
      total_fee: 'Depends on destination immigration schedule',
      notes: 'Official government PR processing fee.'
    },
    processing_time: '6 to 18 Months',
    processing_time_details: 'Standard immigration processing timeline.',
    other_requirements: [
      { category: 'Physical Presence', details: 'Must maintain minimum residency days to preserve status.' }
    ],
    financial_proofs: [
      { type: 'Settlement Funds', minimum_balance_or_amount: 'Demonstrates self-sufficiency', time_frame: 'Past 6 months', notes: 'Required liquid assets.' }
    ],
    faqs: [
      { question: `Does PR lead to citizenship in ${toName}?`, answer: 'Yes, maintaining continuous lawful residence typically qualifies you for citizenship after 3 to 5 years.' }
    ],
    validity: 'Permanent / 5-Year Renewable Card',
    validity_details: 'Indefinite residency right.',
    stay_duration: 'Indefinite',
    stay_duration_details: 'Permanent settlement.',
    entry_type: 'Multiple Entry',
    entry_type_details: 'Unrestricted entry.',
    validity_and_stay: {
      visa_validity: 'Permanent',
      max_stay_per_entry: 'Indefinite',
      entry_type: 'Multiple Entry'
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. PURE ROUTE FAMILY RESOLVER
// ═══════════════════════════════════════════════════════════════════════════════
export function resolvePureRouteFamily(fromRaw: string, toRaw: string): any | null {
  const from = normalizeCountry(fromRaw);
  const to = normalizeCountry(toRaw);
  const fromName = cleanCountryName(fromRaw);
  const toName = cleanCountryName(toRaw);

  if (from === 'india') return null;

  return {
    passport_country: fromName,
    destination_country: toName,
    purpose_of_visit: 'Family Reunification / Spouse Visa',
    visa_type: `${toName} Family Reunification Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(toName + ' family visa for ' + fromName + ' citizens')}`,
    official_source_name: `${toName} Department of Immigration & Civil Registry`,
    overview: `${fromName} family members and spouses of citizens or permanent residents of ${toName} can apply for a family reunification visa to live together permanently with full employment rights.`,
    highlights: [
      { icon: '💍', title: 'Spouse & Partner Rights', description: 'Reunite with your married or civil partner.' },
      { icon: '💼', title: 'Work Authorization', description: 'Spouses typically receive unrestricted right to work.' },
      { icon: '🏠', title: 'Settlement Track', description: 'Direct pathway to permanent residence.' }
    ],
    how_to_apply: [
      'Prove Relationship: Gather legal marriage certificates or proof of genuine partnership.',
      'Demonstrate Financial Threshold: Sponsoring partner proves adequate income and housing.',
      'Submit Family Visa File: Apply online or via diplomatic mission.',
      'Receive Visa & Relocate: Collect biometric residence permit upon arrival.'
    ],
    documents_required: [
      { title: `Valid ${fromName} Passport`, description: 'Valid original passport.', is_mandatory: true },
      { title: 'Official Marriage Certificate / Civil Status', description: 'Legally certified or apostilled.', is_mandatory: true },
      { title: 'Proof of Sponsor Income & Accommodation', description: 'Tax returns, pay slips, and housing lease.', is_mandatory: true }
    ],
    costs: {
      visa_fee: 'Statutory Family Sponsorship Fee ($200 – $1,800 USD)',
      service_fee: 'Biometrics & health surcharge if applicable',
      total_fee: 'Depends on destination country schedule',
      notes: 'Check official government family visa fee.'
    },
    processing_time: '2 to 6 Months',
    processing_time_details: 'Verification of genuine relationship and financial sufficiency.',
    other_requirements: [
      { category: 'Genuine Relationship', details: 'Proof of cohabitation, photographs, communications, and joint assets.' }
    ],
    financial_proofs: [
      { type: 'Sponsor Minimum Income Requirement', minimum_balance_or_amount: 'Covers family living threshold', time_frame: 'Past 12 months', notes: 'Sponsor employment contracts and pay slips.' }
    ],
    faqs: [
      { question: `Can spouses work on a family visa in ${toName}?`, answer: 'Yes! In most destinations, spouses on a family reunification visa enjoy unrestricted work rights.' }
    ],
    validity: '2 to 5 Years (Renewable / PR Track)',
    validity_details: 'Leads to permanent residency.',
    stay_duration: 'Duration of Sponsorship',
    stay_duration_details: 'Renewable resident status.',
    entry_type: 'Multiple Entry',
    entry_type_details: 'Multiple entry resident visa.',
    validity_and_stay: {
      visa_validity: '2 to 5 Years',
      max_stay_per_entry: 'Duration of Visa',
      entry_type: 'Multiple Entry'
    }
  };
}
