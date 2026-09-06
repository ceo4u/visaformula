import { resolvePureRouteTourism } from './pure-routes';
// src/lib/tourism-visa.ts
// Country-specific tourism / visitor visa steps, documents, fees, processing, and requirements pipeline based on official consular requirements

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

export interface TourismHighlightItem {
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
  highlights?: TourismHighlightItem[];
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

  if (c.includes('thailand') || c.includes('bangkok') || c.includes('phuket')) return 'thailand';
  if (c.includes('malaysia') || c.includes('kuala lumpur') || c.includes('penang')) return 'malaysia';
  if (c.includes('mauritius') || c.includes('port louis')) return 'mauritius';
  if (c.includes('maldives') || c.includes('male')) return 'maldives';
  if (c.includes('jamaica') || c.includes('kingston')) return 'jamaica';
  if (c.includes('nepal') || c.includes('kathmandu')) return 'nepal';
  if (c.includes('bhutan') || c.includes('paro') || c.includes('thimphu')) return 'bhutan';
  if (c.includes('seychelles') || c.includes('mahe')) return 'seychelles';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi') || c.includes('sharjah') || c.includes('emirates')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('turkey') || c.includes('turkiye') || c.includes('istanbul')) return 'turkey';
  if (c.includes('jordan') || c.includes('amman') || c.includes('petra')) return 'jordan';
  if (c.includes('egypt') || c.includes('cairo')) return 'egypt';
  if (c.includes('kenya') || c.includes('nairobi')) return 'kenya';
  if (c.includes('tanzania') || c.includes('zanzibar')) return 'tanzania';
  if (c.includes('france') || c.includes('paris')) return 'france';
  if (c.includes('germany') || c.includes('deutschland') || c.includes('berlin') || c.includes('munich')) return 'germany';
  if (c.includes('italy') || c.includes('italia') || c.includes('rome')) return 'italy';
  if (c.includes('spain') || c.includes('espana') || c.includes('madrid') || c.includes('barcelona')) return 'spain';
  if (c.includes('greece') || c.includes('hellas') || c.includes('athens')) return 'greece';
  if (c.includes('netherlands') || c.includes('holland') || c.includes('dutch') || c.includes('amsterdam')) return 'netherlands';
  if (c.includes('switzerland') || c.includes('swiss') || c.includes('zurich')) return 'switzerland';
  if (c.includes('portugal') || c.includes('lisbon')) return 'portugal';
  if (c.includes('austria') || c.includes('vienna')) return 'austria';
  if (c.includes('belgium') || c.includes('brussels')) return 'belgium';
  if (c.includes('denmark') || c.includes('copenhagen')) return 'denmark';
  if (c.includes('sweden') || c.includes('stockholm')) return 'sweden';
  if (c.includes('norway') || c.includes('oslo')) return 'norway';
  if (c.includes('finland') || c.includes('helsinki')) return 'finland';
  if (c.includes('czech') || c.includes('prague') || c.includes('ceska')) return 'czech-republic';
  if (c.includes('poland') || c.includes('warsaw') || c.includes('krakow') || c.includes('polska')) return 'poland';
  if (c.includes('hungary') || c.includes('budapest') || c.includes('magyar')) return 'hungary';
  if (c.includes('croatia') || c.includes('zagreb') || c.includes('dubrovnik')) return 'croatia';
  if (c.includes('cyprus') || c.includes('nicosia')) return 'cyprus';
  if (c.includes('bulgaria') || c.includes('sofia')) return 'bulgaria';
  if (c.includes('romania') || c.includes('bucharest') || c.includes('transylvania')) return 'romania';
  if (c.includes('slovakia') || c.includes('bratislava')) return 'slovakia';
  if (c.includes('slovenia') || c.includes('ljubljana') || c.includes('bled')) return 'slovenia';
  if (c.includes('estonia') || c.includes('tallinn')) return 'estonia';
  if (c.includes('latvia') || c.includes('riga')) return 'latvia';
  if (c.includes('lithuania') || c.includes('vilnius')) return 'lithuania';
  if (c.includes('luxembourg')) return 'luxembourg';
  if (c.includes('malta') || c.includes('valletta')) return 'malta';
  if (c.includes('iceland') || c.includes('reykjavik')) return 'iceland';
  if (c.includes('liechtenstein') || c.includes('vaduz')) return 'liechtenstein';
  if (c.includes('australia') || c.includes('sydney') || c.includes('melbourne') || c.includes('subclass 600')) return 'australia';
  if (c.includes('ukraine') || c.includes('kyiv') || c.includes('kiev')) return 'ukraine';
  if (c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales') || c.includes('london')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us' || c.includes('new york') || c.includes('b1/b2') || c.includes('b2')) return 'usa';
  if (c.includes('canada') || c.includes('toronto') || c.includes('vancouver')) return 'canada';
  if (c.includes('japan') || c.includes('tokyo') || c.includes('osaka') || c.includes('kyoto')) return 'japan';
  if (c.includes('south korea') || c.includes('korea') || c.includes('seoul') || c.includes('busan')) return 'south-korea';
  if (c.includes('vietnam') || c.includes('hanoi') || c.includes('ho chi minh') || c.includes('da nang')) return 'vietnam';
  if (c.includes('indonesia') || c.includes('bali') || c.includes('jakarta')) return 'indonesia';
  if (c.includes('cambodia') || c.includes('phnom penh') || c.includes('siem reap')) return 'cambodia';
  if (c.includes('sri lanka') || c.includes('colombo')) return 'sri-lanka';
  if (c.includes('philippines') || c.includes('manila') || c.includes('cebu')) return 'philippines';
  if (c.includes('qatar') || c.includes('doha')) return 'qatar';
  if (c.includes('saudi arabia') || c.includes('saudi') || c.includes('ksa') || c.includes('riyadh') || c.includes('jeddah')) return 'saudi-arabia';
  if (c === 'oman' || c.startsWith('oman ') || c.endsWith(' oman') || c.includes('muscat') || c.includes('salalah')) return 'oman';
  if (c.includes('bahrain') || c.includes('manama')) return 'bahrain';
  if (c.includes('new zealand') || c === 'nz' || c.includes('auckland') || c.includes('queenstown')) return 'new-zealand';
  if (c.includes('south africa') || c.includes('johannesburg') || c.includes('cape town') || c.includes('durban')) return 'south-africa';
  if (c.includes('brazil') || c.includes('rio') || c.includes('sao paulo')) return 'brazil';
  if (c.includes('israel') || c.includes('tel aviv') || c.includes('jerusalem')) return 'israel';
  if (c.includes('chile') || c.includes('santiago') || c.includes('patagonia')) return 'chile';
  if (c.includes('mexico') || c.includes('cancun') || c.includes('mexico city')) return 'mexico';
  
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

// ── 1. TOURISM OVERVIEW — COUNTRY SPECIFIC ──
export const TOURISM_DESTS: Record<string, any> = {
  "russia": {
    "overview": "Russia offers eVisa and traditional tourist visas for Indian travelers. Explore Moscow, St. Petersburg, the Trans-Siberian Railway, and stunning natural landscapes. eVisa available for select regions including St. Petersburg and the Far East. Valid for up to 30 days.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Historic Cities",
        "description": "Moscow, St. Petersburg — Kremlin, Red Square, Hermitage Museum"
      },
      {
        "icon": "🚂",
        "title": "Trans-Siberian Railway",
        "description": "World's longest railway journey across Russia"
      },
      {
        "icon": "🎭",
        "title": "Culture & Arts",
        "description": "Ballet, opera, and world-class museums"
      },
      {
        "icon": "📱",
        "title": "eVisa Available",
        "description": "Unified Electronic Visa available online for Indian citizens"
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "eVisa Application Form",
        "description": "Completed online for eligible regions.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Invitation Letter",
        "description": "Accommodation proof or host invitation.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay in Russia.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Russia Itinerary — Research Moscow, St. Petersburg, and other destinations.",
      "Step 2: Check eVisa Eligibility — Visit Russian MFA website to check if you qualify for eVisa.",
      "Step 3: Complete eVisa Application — Fill online form with passport scan and photograph.",
      "Step 4: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 5: Receive eVisa — Download eVisa PDF (issued within 4 days).",
      "Step 6: Board Flight to Russia — Carry passport, eVisa, and supporting documents.",
      "Step 7: Clear Immigration — Present documents at Russian airport immigration."
    ],
    "fees": {
      "visa_fee": "eVisa: $40 USD (approx. ₹3,300)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$40 USD Total Reference",
      "notes": "eVisa fee paid online via Russian MFA portal."
    },
    "proc_time": "4 Calendar Days (eVisa Standard)",
    "proc_details": "Processed online via the Russian Ministry of Foreign Affairs (MFA) electronic visa portal.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months from entry date with 2 blank pages."
      },
      {
        "category": "eVisa Regions",
        "details": "Unified electronic visa valid for travel across the Russian Federation."
      },
      {
        "category": "Duration of Stay",
        "details": "Maximum 16 days on eVisa; traditional tourist visa allows up to 30-90 days."
      },
      {
        "category": "Insurance",
        "details": "Travel medical insurance covering the entire stay with at least €30,000 coverage."
      }
    ],
    "financial_proofs": [
      {
        "type": "Personal Bank Statement",
        "minimum_balance_or_amount": "₹1,50,000 - ₹2,50,000",
        "time_frame": "Past 3 months",
        "notes": "Bank statement showing adequate daily travel allowance."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Russia?",
        "answer": "Yes, Indian passport holders require an electronic visa (eVisa) or traditional consular visa."
      },
      {
        "question": "How long can I stay in Russia?",
        "answer": "Up to 16 days on unified eVisa; traditional consular tourist visa allows up to 30 to 90 days."
      },
      {
        "question": "What is the processing time for Russia eVisa?",
        "answer": "eVisa is typically processed within 4 calendar days on the Russian MFA portal."
      }
    ],
    "validity": "60 Days Validity / 16-30 Days Stay",
    "stay_duration": "Up to 16-30 Days",
    "entry_type": "Single Entry",
    "official_source": "Russian Ministry of Foreign Affairs (MFA) & Consular Department"
  },
  "kazakhstan": {
    "overview": "Kazakhstan offers visa-free entry for Indian passport holders for up to 14 days (extendable to 30 days). Explore Almaty, Astana (Nur-Sultan), the Altai Mountains, and the Caspian Sea. Growing tourism destination with modern infrastructure.",
    "highlights": [
      {
        "icon": "🏔️",
        "title": "Natural Beauty",
        "description": "Altai Mountains, Charyn Canyon, and Lake Balkhash."
      },
      {
        "icon": "🌆",
        "title": "Modern Cities",
        "description": "Almaty and Astana — modern architecture and vibrant culture."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free Entry",
        "description": "Indian citizens enjoy 14-30 day visa-free entry."
      },
      {
        "icon": "🏛️",
        "title": "Silk Road Heritage",
        "description": "Historic sites along the ancient Silk Road."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Kazakhstan.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Kazakhstan Itinerary — Research Almaty, Astana, and natural attractions.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 4: Board Flight to Kazakhstan — No prior visa required (14-30 days visa-free).",
      "Step 5: Clear Immigration — Present passport and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy visa-free entry for up to 14 days per visit (max 42 days per 180 days)."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Immigration clearance completed directly at Almaty (ALA) or Astana (NQZ) international airports.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa-Free Entry",
        "details": "Indian citizens enjoy 14-day visa-free entry per visit."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Registration",
        "details": "Hotels or hosts register foreign guests electronically upon check-in."
      }
    ],
    "financial_proofs": [
      {
        "type": "Personal Bank Statement / Credit Cards",
        "minimum_balance_or_amount": "₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "Spot solvency check at border control."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Kazakhstan?",
        "answer": "No, Indian passport holders enjoy visa-free entry for up to 14 days per visit."
      },
      {
        "question": "How long can I stay in Kazakhstan visa-free?",
        "answer": "Up to 14 consecutive calendar days per entry (maximum 42 days per 180 days)."
      },
      {
        "question": "Is registration required?",
        "answer": "Electronic migration registration is completed automatically by hotels."
      }
    ],
    "validity": "14 Days on Arrival",
    "stay_duration": "Up to 14 Days",
    "entry_type": "Visa-Free Entry",
    "official_source": "Ministry of Foreign Affairs & Migration Committee of Kazakhstan"
  },
  "ukraine": {
    "overview": "Ukraine offers an electronic visa (eVisa Type C-02) for Indian passport holders for tourism and visitor travel. Discover Kyiv's historic gold-domed cathedrals, Lviv's UNESCO World Heritage Old Town, and the Carpathian Mountains.",
    "highlights": [
      {
        "icon": "⛪",
        "title": "Kyiv Pechersk Lavra",
        "description": "UNESCO-listed ancient cave monastery and St. Sophia Cathedral."
      },
      {
        "icon": "🏰",
        "title": "Lviv Medieval Charm",
        "description": "Historic cobblestone squares, grand opera house, and artisanal coffee culture."
      },
      {
        "icon": "📱",
        "title": "eVisa Processing",
        "description": "Direct application via the official MFA Ukraine online portal."
      },
      {
        "icon": "🏔️",
        "title": "Carpathian Landscapes",
        "description": "Scenic mountain trails, wooden churches, and alpine health resorts."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months after departure from Ukraine with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Ukraine eVisa Application Form",
        "description": "Completed online application on evisa.mfa.gov.ua.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for Ukraine covering at least €30,000 in emergency medical costs.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip airline reservation.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Bank statements demonstrating minimum $50 USD per day of stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Check Travel Advisories & Entry Points — Review current entry conditions and border crossings.",
      "Step 2: Register on MFA Portal — Create account on evisa.mfa.gov.ua.",
      "Step 3: Upload Scanned Documents — Submit passport bio page, photo, health insurance, and funds proof.",
      "Step 4: Pay eVisa Fee — Settle $20 USD statutory fee online by credit/debit card.",
      "Step 5: Receive eVisa PDF — Decision delivered via email within 3 business days.",
      "Step 6: Travel to Ukraine — Present printed eVisa, passport, and insurance at border control."
    ],
    "fees": {
      "visa_fee": "$20 USD (Single Entry) / $30 USD (Double Entry)",
      "service_fee": "₹0 (Direct MFA Portal)",
      "total_fee": "$20 USD Total Reference",
      "notes": "Urgent processing available for $40 USD within 1 working day."
    },
    "proc_time": "3 Working Days (Standard eVisa)",
    "proc_details": "Processed centrally by the Ministry of Foreign Affairs (MFA) of Ukraine.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months after departure with 2 blank pages."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 days per visit."
      },
      {
        "category": "Medical Insurance",
        "details": "Minimum €30,000 coverage policy valid in Ukraine."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statement",
        "minimum_balance_or_amount": "Minimum $50 USD per day (approx. ₹1,50,000+)",
        "time_frame": "Past 3 months",
        "notes": "Certified bank statement."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian passport holders qualify for Ukraine eVisa?",
        "answer": "Yes, Indian citizens are eligible to apply for the Ukraine eVisa online at evisa.mfa.gov.ua."
      },
      {
        "question": "How long is the Ukraine eVisa valid?",
        "answer": "Valid for up to 30 days of stay with single or double entry options."
      }
    ],
    "validity": "Up to 30 Days (Single/Double Entry)",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single / Double Entry",
    "official_source": "Ministry of Foreign Affairs of Ukraine (MFA eVisa Portal)"
  },
  "belarus": {
    "overview": "Belarus offers rich Eastern European culture, grand Soviet-classicist boulevards in Minsk, UNESCO World Heritage castles in Mir and Nesvizh, and pristine primeval forests in Belovezhskaya Pushcha. Consular visa required for Indian citizens entering via land or commercial flights.",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Mir & Nesvizh Castles",
        "description": "16th-century UNESCO World Heritage Renaissance and Baroque fortresses."
      },
      {
        "icon": "🌆",
        "title": "Minsk Grandeur",
        "description": "Independence Avenue, Victory Square, and pristine public parks."
      },
      {
        "icon": "🌲",
        "title": "Belovezhskaya Pushcha",
        "description": "Ancient primeval forest home to the European bison (wisent)."
      },
      {
        "icon": "🎭",
        "title": "Culture & Ballet",
        "description": "National Bolshoi Opera and Ballet Theatre of Belarus."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 90 days beyond intended departure date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Consular Visa Application Form",
        "description": "Completed and signed Belarus visa form with photo.",
        "is_mandatory": true
      },
      {
        "title": "Tourist Voucher / Travel Agency Confirmation",
        "description": "Official booking confirmation from a licensed Belarusian travel agency.",
        "is_mandatory": true
      },
      {
        "title": "Travel Health Insurance",
        "description": "Mandatory medical insurance with at least €10,000 coverage valid in Belarus (Belgosstrakh or approved).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Tickets",
        "description": "Round-trip flight booking to Minsk International Airport.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Obtain Belarusian Travel Voucher — Secure booking through an authorized Belarusian travel company.",
      "Step 2: Purchase Mandatory Health Insurance — Acquire Belgosstrakh-approved insurance policy with €10,000 coverage.",
      "Step 3: Complete Visa Application — Fill out the official form from the Embassy of Belarus in New Delhi.",
      "Step 4: Submit Dossier at Consular Section — Lodge passport, photos, voucher, and insurance at the Embassy.",
      "Step 5: Pay Consular Fee — Pay €60 standard consular fee (€120 for urgent 2-day processing).",
      "Step 6: Collect Stamped Passport — Retrieve passport with Belarus visa vignette.",
      "Step 7: Travel & Register — Enter via Minsk Airport; register within 10 days if staying outside hotels."
    ],
    "fees": {
      "visa_fee": "€60 (approx. ₹5,400) Standard / €120 Express",
      "service_fee": "₹0 (Direct Consular Section)",
      "total_fee": "€60 Consular Fee",
      "notes": "Express processing issued within 48 hours for €120."
    },
    "proc_time": "5 Working Days (Standard) / 2 Days (Express)",
    "proc_details": "Processed directly by the Consular Section of the Embassy of Belarus in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 90 days beyond departure date with 2 blank pages."
      },
      {
        "category": "Medical Insurance",
        "details": "Mandatory health insurance policy with minimum €10,000 coverage."
      },
      {
        "category": "Registration",
        "details": "Hotels register foreign visitors automatically; private stays must register within 10 days."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement",
        "minimum_balance_or_amount": "Minimum 2 basic units (approx. $25 USD) per day of stay (₹1,50,000+)",
        "time_frame": "Past 3 months",
        "notes": "Original certified bank statement."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Belarus?",
        "answer": "Yes, Indian passport holders require a tourist visa issued by the Embassy of Belarus."
      },
      {
        "question": "How long can I stay on a Belarus Tourist Visa?",
        "answer": "Up to 30 days per single or double entry."
      }
    ],
    "validity": "Up to 30 Days (Single/Double Entry)",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single / Double Entry",
    "official_source": "Ministry of Foreign Affairs of the Republic of Belarus & Embassy in New Delhi"
  },
  "uzbekistan": {
    "overview": "Uzbekistan is the dazzling crown jewel of the ancient Silk Road. Explore the turquoise-domed mosques of Samarkand (Registan), the minarets and trading domes of Bukhara, and the mud-brick oasis of Khiva. Indian passport holders can easily obtain an electronic visa (eVisa) online.",
    "highlights": [
      {
        "icon": "🕌",
        "title": "Samarkand Registan",
        "description": "Iconic ensemble of three majestic madrasahs with turquoise tilework."
      },
      {
        "icon": "🏜️",
        "title": "Historic Bukhara",
        "description": "Over 140 architectural monuments including Kalyan Minaret and Ark Citadel."
      },
      {
        "icon": "🧱",
        "title": "Walled City of Khiva",
        "description": "Itchan Kala open-air museum city protected by ancient mud-brick walls."
      },
      {
        "icon": "📱",
        "title": "Official eVisa",
        "description": "100% digital application issued online within 3 working days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months beyond intended departure date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Uzbekistan eVisa Application",
        "description": "Completed online on the official portal e-visa.gov.uz.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Page Scan",
        "description": "Clear color scan of passport bio page in JPEG format.",
        "is_mandatory": true
      },
      {
        "title": "Passport Digital Photograph",
        "description": "Recent 35x45mm color photo on white background.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip flight booking to Tashkent or Samarkand.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official eVisa Portal — Visit e-visa.gov.uz.",
      "Step 2: Enter Nationality & Passport Details — Select Indian citizenship and tourism category.",
      "Step 3: Upload Passport Scan & Photo — Attach clear JPEG files meeting size specifications.",
      "Step 4: Pay Statutory Fee — Pay $20 USD fee online via Visa or Mastercard.",
      "Step 5: Receive Electronic Visa — Approved eVisa PDF sent via email within 3 working days.",
      "Step 6: Travel to Uzbekistan — Present passport and printed eVisa at Tashkent airport immigration.",
      "Step 7: Hotel Registration — Hotels automatically register guests via the E-Mehmon online system."
    ],
    "fees": {
      "visa_fee": "$20 USD (Single Entry) / $35 USD (Double) / $50 USD (Multiple)",
      "service_fee": "₹0 (Direct Government Portal)",
      "total_fee": "$20 USD Total Reference",
      "notes": "Paid online at e-visa.gov.uz via international credit/debit card."
    },
    "proc_time": "3 Working Days (Standard eVisa)",
    "proc_details": "Processed electronically by the Ministry of Foreign Affairs of Uzbekistan.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond expiry of the visa."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 days per entry within 90 days validity window."
      },
      {
        "category": "Registration",
        "details": "Mandatory E-Mehmon electronic registration provided by hotels upon check-in."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Balance / Cash",
        "minimum_balance_or_amount": "Minimum $40 USD per day or ₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "International debit/credit cards accepted in major cities."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian passport holders qualify for Uzbekistan eVisa?",
        "answer": "Yes, Indian citizens are fully eligible to apply for the electronic visa online at e-visa.gov.uz."
      },
      {
        "question": "How long can I stay on an Uzbekistan eVisa?",
        "answer": "The eVisa allows a stay of up to 30 days and is valid for entry within 90 days of issuance."
      }
    ],
    "validity": "90 Days Validity / 30 Days Stay",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single / Double / Multiple Entry",
    "official_source": "Ministry of Foreign Affairs of the Republic of Uzbekistan (e-visa.gov.uz)"
  },
  "kyrgyzstan": {
    "overview": "Kyrgyzstan is a paradise for mountain lovers, trekkers, and cultural nomads. Known as the 'Switzerland of Central Asia', marvel at the massive alpine Lake Issyk-Kul, hike through Ala Archa National Park, sleep in traditional yurts, and ride horses through Tian Shan mountain passes.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Lake Issyk-Kul",
        "description": "World's second-largest alpine lake surrounded by snow-capped Tian Shan peaks."
      },
      {
        "icon": "🏔️",
        "title": "Ala Archa National Park",
        "description": "Spectacular gorges, glaciers, and hiking trails just 45 minutes from Bishkek."
      },
      {
        "icon": "⛺",
        "title": "Yurt & Nomadic Culture",
        "description": "Experience authentic nomadic hospitality, eagle hunting, and horse riding at Song-Kul."
      },
      {
        "icon": "📱",
        "title": "Official eVisa",
        "description": "Apply online via evisa.e-gov.kg for fast consular clearance."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "eVisa Application Form",
        "description": "Completed online application at evisa.e-gov.kg.",
        "is_mandatory": true
      },
      {
        "title": "Digital Passport Photo",
        "description": "Color photo meeting official biometric format on white background.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Booking",
        "description": "Round-trip airline reservation to Manas International Airport (Bishkek).",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Guesthouse Booking",
        "description": "Confirmed accommodation bookings in Bishkek or Issyk-Kul.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Kyrgyz eVisa Portal — Navigate to evisa.e-gov.kg.",
      "Step 2: Complete Online Form — Input passport info, travel dates, and contact details.",
      "Step 3: Upload Photo & Passport Bio Page — Attach high-resolution scans.",
      "Step 4: Pay Processing Fee — Pay $50 USD (single entry 30 days) via Visa/Mastercard.",
      "Step 5: Receive Approval PDF — Decision issued within 5-7 business days.",
      "Step 6: Travel to Kyrgyzstan — Arrive at Manas Airport (FRU) and present printed eVisa.",
      "Step 7: Hotel Registration — Register with state migration service if stay exceeds statutory limits."
    ],
    "fees": {
      "visa_fee": "$50 USD (30 Days Single) / $70 USD (90 Days Single)",
      "service_fee": "₹0 (Official eVisa Portal)",
      "total_fee": "$50 USD Total Reference",
      "notes": "Paid online at evisa.e-gov.kg."
    },
    "proc_time": "5 to 7 Working Days",
    "proc_details": "Processed electronically by the Ministry of Foreign Affairs of the Kyrgyz Republic.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond the intended departure date."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 or 90 days as per visa category selected."
      },
      {
        "category": "Entry Points",
        "details": "Accepted at Manas International Airport (Bishkek) and Osh International Airport."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement / Credit Cards",
        "minimum_balance_or_amount": "₹1,00,000 - ₹1,50,000",
        "time_frame": "Past 3 months",
        "notes": "Proof of sufficient funds for duration of travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Kyrgyzstan?",
        "answer": "Yes, Indian passport holders require a tourist visa, which can be obtained online as an eVisa via evisa.e-gov.kg."
      },
      {
        "question": "How long can I stay in Kyrgyzstan on an eVisa?",
        "answer": "The tourist eVisa allows stays of up to 30 or 90 days."
      }
    ],
    "validity": "30 to 90 Days",
    "stay_duration": "Up to 30 or 90 Days",
    "entry_type": "Single / Double Entry",
    "official_source": "Ministry of Foreign Affairs of the Kyrgyz Republic (evisa.e-gov.kg)"
  },
  "tajikistan": {
    "overview": "Tajikistan is the breathtaking 'Roof of the World', dominated by the colossal Pamir Mountains and Fan Mountains. Drive the legendary Pamir Highway (M41), hike to the crystal-clear turquoise Seven Lakes of Haft Kul, and explore ancient Silk Road fortresses.",
    "highlights": [
      {
        "icon": "🛣️",
        "title": "Pamir Highway (M41)",
        "description": "World's second-highest international road winding through rugged mountain passes."
      },
      {
        "icon": "🏔️",
        "title": "Fan Mountains & Haft Kul",
        "description": "Breathtaking turquoise alpine lakes and world-class high-altitude trekking circuits."
      },
      {
        "icon": "🏰",
        "title": "Hissar Fortress",
        "description": "Ancient 16th-century fortress and historical reserve near Dushanbe."
      },
      {
        "icon": "📱",
        "title": "Instant eVisa",
        "description": "Electronic visa issued online via evisa.tj in just 3 business days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Tajikistan eVisa Application",
        "description": "Completed online application at evisa.tj.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Scan",
        "description": "Clear color copy of passport bio-data page.",
        "is_mandatory": true
      },
      {
        "title": "GBAO Permit (Optional)",
        "description": "Special permit required if traveling along the Pamir Highway (Gorno-Badakhshan Autonomous Region).",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Travel Itinerary",
        "description": "Flight booking and hotel or homestay reservations.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official Portal — Visit evisa.tj.",
      "Step 2: Complete Application Form — Fill in personal details and travel dates.",
      "Step 3: Select GBAO Permit (if visiting Pamir) — Check GBAO box to add permit for $20 USD.",
      "Step 4: Upload Passport Bio Page — Attach clear scan in JPEG or PDF format.",
      "Step 5: Pay Fee Online — Pay $30 USD (+$20 USD for GBAO) by credit card.",
      "Step 6: Receive eVisa PDF — Download approved eVisa delivered via email within 3 working days.",
      "Step 7: Travel to Dushanbe — Present printed eVisa at Dushanbe International Airport (DYU)."
    ],
    "fees": {
      "visa_fee": "$30 USD (Standard eVisa) + $20 USD (Optional GBAO Permit)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "$30-50 USD Total Reference",
      "notes": "GBAO permit is required for travel to the Pamir region."
    },
    "proc_time": "3 Working Days (Standard eVisa)",
    "proc_details": "Processed electronically by the Ministry of Foreign Affairs of the Republic of Tajikistan.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond departure date."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 60 days of stay within 90 days validity window."
      },
      {
        "category": "GBAO Permit",
        "details": "Mandatory separate permit for traveling in the Gorno-Badakhshan region."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Balance / Cash",
        "minimum_balance_or_amount": "₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "Cash in USD or Somoni is recommended in remote mountain regions."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Tajikistan?",
        "answer": "Yes, Indian passport holders require a visa, which is easily obtainable online via the official eVisa portal (evisa.tj)."
      },
      {
        "question": "What is the GBAO permit for Tajikistan?",
        "answer": "It is a mandatory special entry permit to travel along the Pamir Highway and the Gorno-Badakhshan Autonomous Region, easily added to your eVisa application for $20 USD."
      }
    ],
    "validity": "90 Days Validity / 60 Days Stay",
    "stay_duration": "Up to 60 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of the Republic of Tajikistan (evisa.tj)"
  },
  "turkmenistan": {
    "overview": "Turkmenistan is one of the most mysterious and fascinating destinations on Earth. Explore Ashgabat, the world's gleaming white-marble capital holding the Guinness World Record, visit the fiery Darvaza Gas Crater ('Door to Hell') burning in the Karakum Desert, and discover ancient Merv.",
    "highlights": [
      {
        "icon": "🔥",
        "title": "Darvaza Gas Crater",
        "description": "The legendary 'Door to Hell' — a flaming natural gas crater burning in the desert since 1971."
      },
      {
        "icon": "🏛️",
        "title": "White Marble Ashgabat",
        "description": "Capital city featuring over 500 white-marble palaces, gold-plated statues, and futuristic monuments."
      },
      {
        "icon": "🏺",
        "title": "Ancient Silk Road Merv",
        "description": "UNESCO World Heritage ancient oasis city that was once one of the greatest cities in the Islamic world."
      },
      {
        "icon": "🐴",
        "title": "Akhal-Teke Golden Horses",
        "description": "Ancient and noble equine breed famous for their shimmering metallic coat and endurance."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond the visa expiry date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Letter of Invitation (LOI)",
        "description": "Mandatory official LOI certified by the State Migration Service of Turkmenistan (arranged via licensed tour agency).",
        "is_mandatory": true
      },
      {
        "title": "Consular Visa Application Form",
        "description": "Completed visa application form with recent color photographs.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Tour Package & Guide Undertaking",
        "description": "Licensed local travel agency itinerary with certified guide and hotel bookings.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Flight Booking",
        "description": "Round-trip airline reservation to Ashgabat International Airport (ASB).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Book Licensed Tour Agency — Foreign tourists must book through an authorized Turkmen travel agency.",
      "Step 2: Agency Applies for LOI — The agency submits your dossier to the State Migration Service in Ashgabat (takes 2-3 weeks).",
      "Step 3: Receive Certified LOI — Migration Service issues the official invitation approval.",
      "Step 4: Visa Issuance — Obtain visa sticker at the Embassy of Turkmenistan in New Delhi, or on arrival at Ashgabat Airport.",
      "Step 5: Pay Government & COVID/Migration Fees — Pay statutory visa fee ($55-155 USD) and border entry taxes.",
      "Step 6: Travel with Licensed Guide — Tour the country accompanied by your accredited guide.",
      "Step 7: Hotel Registration — Tour operator ensures immigration registration within 3 days of arrival."
    ],
    "fees": {
      "visa_fee": "$55 USD (10 Days) / $85 USD (20 Days) / $115 USD (30 Days)",
      "service_fee": "Tour operator LOI handling fees apply",
      "total_fee": "$55-155 USD Consular Fee + LOI",
      "notes": "Can be stamped at Embassy or collected on arrival at Ashgabat Airport with valid LOI."
    },
    "proc_time": "15 to 20 Working Days (LOI Approval)",
    "proc_details": "Adjudicated by the State Migration Service of Turkmenistan in Ashgabat.",
    "requirements": [
      {
        "category": "Mandatory LOI",
        "details": "No visa can be issued without an approved Letter of Invitation from the State Migration Service."
      },
      {
        "category": "Tour Guide Requirement",
        "details": "Foreign tourists must be accompanied by an accredited local guide throughout their stay."
      },
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      }
    ],
    "financial_proofs": [
      {
        "type": "Tour Package Payment Receipt & Cash",
        "minimum_balance_or_amount": "Prepaid package + $500 USD cash",
        "time_frame": "Travel duration",
        "notes": "Cash in crisp, unblemished USD bills is essential as international credit cards are rarely accepted."
      }
    ],
    "faqs": [
      {
        "question": "Can I travel to Turkmenistan independently without a tour?",
        "answer": "No, all foreign tourists require an approved Letter of Invitation (LOI) through a licensed local tour operator and must be accompanied by an authorized guide."
      },
      {
        "question": "Can I get a visa on arrival in Turkmenistan?",
        "answer": "Yes, but ONLY if you hold an official Letter of Invitation (LOI) approved in advance by the State Migration Service of Turkmenistan."
      }
    ],
    "validity": "10 to 30 Days (Tied to Tour Itinerary)",
    "stay_duration": "10 to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "State Migration Service of Turkmenistan & Ministry of Foreign Affairs"
  },
  "azerbaijan": {
    "overview": "Azerbaijan, the 'Land of Fire', bridges East and West on the Caspian Sea. Explore Baku's UNESCO-listed Old City (Icherisheher), the iconic Flame Towers, Mud Volcanoes in Gobustan, and the alpine resort town of Shahdag. Indian passport holders enjoy fast online ASAN eVisa processing in just 3 hours to 3 days.",
    "highlights": [
      {
        "icon": "🔥",
        "title": "Baku Flame Towers",
        "description": "Iconic illuminated trio of skyscrapers dominating the Baku bay skyline."
      },
      {
        "icon": "🏛️",
        "title": "Icherisheher Old City",
        "description": "Maiden Tower, Palace of the Shirvanshahs, and medieval stone alleys."
      },
      {
        "icon": "🌋",
        "title": "Gobustan Mud Volcanoes",
        "description": "UNESCO petroglyphs and over half of the world's mud volcanoes."
      },
      {
        "icon": "⚡",
        "title": "Fast ASAN eVisa",
        "description": "100% digital electronic visa issued in 3 hours (Urgent) or 3 days (Standard)."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months beyond the intended departure date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "ASAN eVisa Application",
        "description": "Completed online application on evisa.gov.az.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Page Scan",
        "description": "Clear color copy of passport bio-data page in JPEG format.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking Confirmation",
        "description": "Confirmed hotel reservation or proof of accommodation in Azerbaijan.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip airline reservation to Heydar Aliyev International Airport (GYD).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official ASAN Portal — Visit evisa.gov.az.",
      "Step 2: Choose Processing Speed — Select Standard (3 business days) or Urgent (3 hours).",
      "Step 3: Enter Information & Upload Passport — Fill form and attach passport scan.",
      "Step 4: Pay Statutory Fee — Pay $26 USD (Standard) or $60 USD (Urgent) online.",
      "Step 5: Receive ASAN eVisa — Download the electronic visa PDF sent to your email.",
      "Step 6: Travel to Baku — Present passport and printed eVisa at airport immigration.",
      "Step 7: Migration Registration — If staying over 15 days, hotel registers you with State Migration Service."
    ],
    "fees": {
      "visa_fee": "$26 USD (Standard - 3 Days) / $60 USD (Urgent - 3 Hours)",
      "service_fee": "₹0 (Official ASAN Portal)",
      "total_fee": "$26 USD Total Reference",
      "notes": "Paid online at evisa.gov.az via credit/debit card."
    },
    "proc_time": "3 Business Days (Standard) / 3 Hours (Urgent)",
    "proc_details": "Processed electronically through the State Agency for Public Service and Social Innovations (ASAN).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond intended departure date."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 days per entry."
      },
      {
        "category": "15-Day Registration Rule",
        "details": "Foreigners staying more than 15 calendar days must register with the State Migration Service (hotels handle this automatically)."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Balance / Credit Cards",
        "minimum_balance_or_amount": "₹1,00,000 - ₹1,50,000",
        "time_frame": "Travel duration",
        "notes": "Proof of adequate travel funds."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian passport holders qualify for Azerbaijan ASAN eVisa?",
        "answer": "Yes, Indian citizens are fully eligible for the fast-track ASAN electronic visa at evisa.gov.az."
      },
      {
        "question": "How long does Azerbaijan eVisa take?",
        "answer": "Standard eVisa takes 3 working days ($26 USD); Urgent eVisa is issued in just 3 hours ($60 USD)."
      }
    ],
    "validity": "90 Days Validity / 30 Days Stay",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "State Agency for Public Service (ASAN Visa - evisa.gov.az) & Ministry of Foreign Affairs"
  },
  "georgia": {
    "overview": "Georgia is where breathtaking Caucasus alpine peaks meet world-famous winemaking traditions, ancient cave cities, and warm hospitality. Explore the cobblestone charm of Old Tbilisi, hike around Mount Kazbek in Stepantsminda, and discover the wine valleys of Kakheti. Indian passport holders holding valid visas/PR for the US, UK, Canada, or Schengen can enter visa-free for 90 days; otherwise, apply online via evisa.gov.ge.",
    "highlights": [
      {
        "icon": "🍷",
        "title": "8,000 Years of Wine",
        "description": "Cradle of winemaking using ancient UNESCO-protected clay Qvevri vessels in Kakheti."
      },
      {
        "icon": "🏔️",
        "title": "Kazbegi & Caucasus",
        "description": "Gergeti Trinity Church dramatically set against the snow-capped Mount Kazbek."
      },
      {
        "icon": "🏰",
        "title": "Old Tbilisi & Sulfur Baths",
        "description": "Narikala Fortress, colorful wooden balconies, and thermal sulfur bathhouses."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free for US/UK/Schengen Visa Holders",
        "description": "Holders of valid US/UK/Schengen visas enter visa-free for up to 90 days."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 3 months beyond the validity of the visa with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Georgia eVisa Application",
        "description": "Completed online on the official portal evisa.gov.ge (if not visa-exempt).",
        "is_mandatory": true
      },
      {
        "title": "Valid US/UK/Schengen Visa (if claiming visa-free entry)",
        "description": "Original valid multiple-entry visa or permanent residence card.",
        "is_mandatory": false
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid in Georgia covering emergency hospitalization and medical repatriation.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Airline Ticket",
        "description": "Round-trip airline reservation to Tbilisi (TBS) or Batumi (BUS).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation Proof",
        "description": "Confirmed booking for entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Check Visa-Exemption — If you hold a valid visa or PR for US, UK, Schengen, Canada, or Japan, you can enter visa-free for 90 days.",
      "Step 2: Access eVisa Portal (if not exempt) — Navigate to evisa.gov.ge.",
      "Step 3: Enter Details & Upload Documents — Submit passport scan, photo, return ticket, and hotel booking.",
      "Step 4: Pay Statutory Fee — Pay $20 USD + 2% service charge via credit/debit card.",
      "Step 5: Receive eVisa Grant — Electronic visa delivered via email in 5 business days.",
      "Step 6: Travel to Georgia — Present passport, visa (or US/UK visa), insurance, and return ticket at airport immigration."
    ],
    "fees": {
      "visa_fee": "$20 USD (approx. ₹1,650) or ₹0 (if holding valid US/UK/Schengen visa)",
      "service_fee": "2% card processing fee",
      "total_fee": "$20 USD Total Reference",
      "notes": "Free 90-day entry for holders of valid US, UK, Schengen, Canada, Japan visas."
    },
    "proc_time": "5 Business Days (eVisa) / Instant on Arrival (if Visa-Exempt)",
    "proc_details": "Processed electronically by the Consular Department of the Ministry of Foreign Affairs of Georgia.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond intended departure date."
      },
      {
        "category": "Visa Exemption Rule",
        "details": "Holders of valid multiple-entry visas or PR from US, UK, Schengen, Canada, Japan, Australia, GCC enter visa-free for 90 days in 180 days."
      },
      {
        "category": "Travel Insurance",
        "details": "Mandatory travel medical insurance covering the full stay."
      }
    ],
    "financial_proofs": [
      {
        "type": "Personal Bank Statement / Credit Cards",
        "minimum_balance_or_amount": "Minimum $50 USD per day (approx. ₹1,50,000+)",
        "time_frame": "Past 3 months",
        "notes": "Proof of financial solvency."
      }
    ],
    "faqs": [
      {
        "question": "Can Indians travel to Georgia visa-free?",
        "answer": "Yes, if you hold a valid multiple-entry visa or permanent residence from the US, UK, Schengen countries, Canada, Japan, or GCC, you can enter Georgia visa-free for up to 90 days within 180 days."
      },
      {
        "question": "How do I apply for a Georgia eVisa without a Western visa?",
        "answer": "Apply directly online via the official portal evisa.gov.ge with passport scan, travel insurance, return flight, and hotel booking for $20 USD."
      }
    ],
    "validity": "120 Days Validity / 30-90 Days Stay",
    "stay_duration": "Up to 30 Days (eVisa) / 90 Days (Visa-Exempt)",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Ministry of Foreign Affairs of Georgia (evisa.gov.ge) & Consular Department"
  },
  "armenia": {
    "overview": "Armenia, the world's first Christian nation, offers ancient mountaintop monasteries, stunning alpine Lake Sevan, views of biblical Mount Ararat, and rich culinary traditions. Indian citizens can obtain an electronic visa (eVisa) or Visa on Arrival (VOA) at Zvartnots International Airport in Yerevan.",
    "highlights": [
      {
        "icon": "⛪",
        "title": "Geghard & Khor Virap",
        "description": "Ancient UNESCO monasteries framed against dramatic cliffs and Mount Ararat."
      },
      {
        "icon": "🌊",
        "title": "Lake Sevan",
        "description": "High-altitude alpine lake known as the 'Jewel of Armenia' with hilltop Sevanavank monastery."
      },
      {
        "icon": "🏛️",
        "title": "Pink City Yerevan",
        "description": "Vibrant capital built from rosy volcanic tuff stone, featuring the Cascade complex and Republic Square."
      },
      {
        "icon": "📱",
        "title": "eVisa / Visa on Arrival",
        "description": "Easy online eVisa (evisa.mfa.am) for $7 USD (21 days) or Visa on Arrival at airport."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 3 months beyond the period of requested visa with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Armenia eVisa Application Form",
        "description": "Completed online application at evisa.mfa.am.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Page Scan",
        "description": "Clear color copy of passport bio page.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip airline reservation to Yerevan (EVN).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation Proof",
        "description": "Confirmed booking or host invitation.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official eVisa Portal — Visit evisa.mfa.am.",
      "Step 2: Choose Visa Type — Select Short-Stay 21-day ($7 USD) or 120-day ($33 USD).",
      "Step 3: Enter Details & Upload Passport — Fill form and attach passport scan.",
      "Step 4: Pay Statutory Fee — Settle visa charge online via credit/debit card.",
      "Step 5: Receive Approval PDF — eVisa approved and sent via email within 3 business days.",
      "Step 6: Travel to Yerevan — Present passport and printed eVisa at Zvartnots Airport immigration."
    ],
    "fees": {
      "visa_fee": "$7 USD (21 Days Stay) / $33 USD (120 Days Stay)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "$7 USD Total Reference",
      "notes": "Extremely affordable visa fees paid online at evisa.mfa.am."
    },
    "proc_time": "3 Business Days (Standard eVisa)",
    "proc_details": "Processed electronically by the Ministry of Foreign Affairs of the Republic of Armenia.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond intended departure date."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 21 days or 120 days depending on visa category selected."
      },
      {
        "category": "Entry Points",
        "details": "Accepted at Zvartnots Airport (Yerevan), Shirak Airport (Gyumri), and land border crossings."
      }
    ],
    "financial_proofs": [
      {
        "type": "Personal Bank Statement / Credit Cards",
        "minimum_balance_or_amount": "₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "Proof of financial solvency for stay."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens qualify for Armenia eVisa?",
        "answer": "Yes, Indian passport holders can easily obtain an electronic visa online at evisa.mfa.am for just $7 USD."
      },
      {
        "question": "Can Indians get a Visa on Arrival in Armenia?",
        "answer": "Holders of valid visas/PR for US, UK, EU/Schengen, Canada, or GCC can obtain a Visa on Arrival; all others should apply online for an eVisa."
      }
    ],
    "validity": "90 Days Validity (21-Day Visa) / 180 Days (120-Day Visa)",
    "stay_duration": "Up to 21 or 120 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Ministry of Foreign Affairs of the Republic of Armenia (evisa.mfa.am)"
  },
  "moldova": {
    "overview": "Moldova is Europe's hidden wine and cultural sanctuary. Tour Cricova and Mileștii Mici — the world's largest underground wine cellars with over 200km of tunnels holding Guinness World Records. Explore the historic Orheiul Vechi cave monastery and the charming capital Chișinău. Apply online via evisa.gov.md.",
    "highlights": [
      {
        "icon": "🍷",
        "title": "Mileștii Mici & Cricova",
        "description": "Guinness World Record largest underground wine cellars stretching over 200km."
      },
      {
        "icon": "⛪",
        "title": "Orheiul Vechi Cave Monastery",
        "description": "Breathtaking medieval archaeological complex carved into limestone cliffs."
      },
      {
        "icon": "🌳",
        "title": "Chișinău Green Capital",
        "description": "Vibrant European boulevards, Soviet heritage monuments, and lush parks."
      },
      {
        "icon": "📱",
        "title": "Online eVisa Portal",
        "description": "Direct electronic application via official government portal evisa.gov.md."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 3 months after departure from Moldova with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Moldova eVisa Application Form",
        "description": "Completed online application at evisa.gov.md.",
        "is_mandatory": true
      },
      {
        "title": "Digital Passport Photo",
        "description": "Recent 35x45mm color photo meeting ICAO standards on white background.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid in Moldova covering emergency treatment with minimum €30,000 coverage.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Airline Ticket",
        "description": "Round-trip flight booking to Chișinău International Airport (RMO).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking Confirmation",
        "description": "Confirmed booking for entire stay in Moldova.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official eVisa Portal — Navigate to evisa.gov.md.",
      "Step 2: Complete Online Application — Fill in passport, travel dates, and destination details.",
      "Step 3: Upload Scanned Documents — Attach passport copy, photo, hotel booking, and insurance.",
      "Step 4: Pay Processing Fee — Settle €40 consular fee online by card.",
      "Step 5: Receive Approval Notification — Application decided within 10 to 15 calendar days.",
      "Step 6: Download & Print eVisa — Download the official electronic visa authorization.",
      "Step 7: Travel to Chișinău — Present passport, printed eVisa, and travel insurance at airport immigration."
    ],
    "fees": {
      "visa_fee": "€40 (approx. ₹3,600)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "€40 Total Reference",
      "notes": "Paid online at evisa.gov.md."
    },
    "proc_time": "10 to 15 Calendar Days",
    "proc_details": "Processed electronically by the Ministry of Foreign Affairs and European Integration of Moldova.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond departure date with 2 blank pages."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 90 days of stay within any 180-day period."
      },
      {
        "category": "Medical Insurance",
        "details": "Mandatory travel insurance covering at least €30,000."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement",
        "minimum_balance_or_amount": "Minimum €30/day (at least €300 total - approx. ₹1,50,000+)",
        "time_frame": "Past 3 months",
        "notes": "Proof of financial solvency for travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens qualify for Moldova eVisa?",
        "answer": "Yes, Indian passport holders can apply for an electronic tourist visa directly via evisa.gov.md."
      },
      {
        "question": "How long can I stay on a Moldova Tourist Visa?",
        "answer": "Up to 90 days within any 180-day period."
      }
    ],
    "validity": "Up to 90 Days",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Ministry of Foreign Affairs and European Integration of Moldova (evisa.gov.md)"
  },
  "pakistan": {
    "overview": "Pakistan offers breathtaking high-altitude wonders in Gilgit-Baltistan and the Karakoram range (K2), Mughal historical splendor in Lahore (Badshahi Mosque and Lahore Fort), and ancient Indus Valley heritage in Mohenjo-daro. Indian passport holders must apply through the Pakistan Online Visa System (visa.nadra.gov.pk) or through the Pakistan High Commission.",
    "highlights": [
      {
        "icon": "🏔️",
        "title": "Karakoram & Hunza Valley",
        "description": "Majestic peaks including K2, Rakaposhi, and ancient Baltit Fort in Hunza."
      },
      {
        "icon": "🕌",
        "title": "Lahore Mughal Heritage",
        "description": "Badshahi Mosque, Lahore Fort (Shahi Qila), Shalimar Gardens, and Anarkali Bazaar."
      },
      {
        "icon": "🏛️",
        "title": "Indus Valley Civilization",
        "description": "5,000-year-old archaeological wonders at Mohenjo-daro and Harappa."
      },
      {
        "icon": "📱",
        "title": "NADRA Visa Portal",
        "description": "Online visa portal via visa.nadra.gov.pk."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Pakistan Visa Application",
        "description": "Completed online via NADRA portal visa.nadra.gov.pk.",
        "is_mandatory": true
      },
      {
        "title": "Passport Digital Photo",
        "description": "Recent photograph on white background meeting NADRA specifications.",
        "is_mandatory": true
      },
      {
        "title": "Sponsorship / Invitation / Tour Booking",
        "description": "Formal sponsorship letter from host or tour operator itinerary.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Travel Itinerary",
        "description": "Flight booking or Wagah border crossing documentation.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access NADRA Portal — Visit visa.nadra.gov.pk.",
      "Step 2: Complete Online Application — Fill individual details and select specific cities to visit.",
      "Step 3: Upload Scanned Bio Page & Photo — Attach clear color scans.",
      "Step 4: Pay Processing Fee — Settle $35 USD fee via international card.",
      "Step 5: Security Clearance & Interview — Application undergoes consular review; in-person interview may be requested.",
      "Step 6: Receive Electronic Travel Authorization (ETA) — Approved ETA PDF issued via email.",
      "Step 7: Border Clearance — Present ETA and passport at Wagah-Attari border or international airport."
    ],
    "fees": {
      "visa_fee": "$35 USD (approx. ₹2,900)",
      "service_fee": "NADRA online portal charge",
      "total_fee": "$35 USD Total Reference",
      "notes": "Fee schedule determined by NADRA."
    },
    "proc_time": "4 to 6 Weeks (Subject to Security Review)",
    "proc_details": "Requires consular review and inter-agency clearance.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "City-Specific Stays",
        "details": "Visa is typically granted for specific designated cities."
      },
      {
        "category": "Police Reporting",
        "details": "Foreign visitors may be subject to local police station registration upon arrival."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement",
        "minimum_balance_or_amount": "₹1,50,000+",
        "time_frame": "Past 6 months",
        "notes": "Certified bank statement."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Pakistan visa online?",
        "answer": "Yes, applications are lodged online via visa.nadra.gov.pk, followed by consular processing and security review."
      },
      {
        "question": "How long is the tourist visa valid?",
        "answer": "Typically issued for up to 30 days single entry for specific itinerary locations."
      }
    ],
    "validity": "Up to 30 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Interior & NADRA Pakistan Online Visa System (visa.nadra.gov.pk)"
  },
  "bangladesh": {
    "overview": "Bangladesh offers lush riverine landscapes, the world's longest unbroken natural sandy sea beach in Cox's Bazar (120km), the dense mangrove forests of the Sundarbans (home to Royal Bengal Tigers), and ancient tea gardens in Sreemangal. Indian citizens apply via the Bangladesh High Commission / Deputy High Commissions.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Cox's Bazar Sea Beach",
        "description": "World's longest unbroken natural sand beach stretching 120km along the Bay of Bengal."
      },
      {
        "icon": "🐅",
        "title": "Sundarbans Mangrove",
        "description": "UNESCO World Heritage mangrove delta and sanctuary of the Royal Bengal Tiger."
      },
      {
        "icon": "🍵",
        "title": "Sreemangal Tea Estates",
        "description": "Rolling emerald tea plantations, rainforests, and ethnic tribal villages."
      },
      {
        "icon": "🏛️",
        "title": "Old Dhaka & Lalbagh Fort",
        "description": "17th-century Mughal Lalbagh Fort, Ahsan Manzil Pink Palace, and bustling riverfront."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Bangladesh Visa Application Form",
        "description": "Completed online application at visa.gov.bd and printed.",
        "is_mandatory": true
      },
      {
        "title": "Passport Photographs",
        "description": "Two recent 45x35mm color photos on white background.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Booking / Host Letter",
        "description": "Hotel reservation voucher or invitation from host in Bangladesh with NID copy.",
        "is_mandatory": true
      },
      {
        "title": "Travel Itinerary / Flight Ticket",
        "description": "Round-trip flight booking or Maitree/Bandhan Express train booking / land border port.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Complete Online Application — Fill form on visa.gov.bd.",
      "Step 2: Print Form & Attach Photos — Print completed application and sign.",
      "Step 3: Submit at Deputy High Commission / Visa Center — Lodge file at New Delhi, Kolkata, Agartala, Mumbai, or Guwahati.",
      "Step 4: Pay Processing / Service Fee — Visa fee is ₹0 under bilateral treaty; nominal VAC service fee applies.",
      "Step 5: Consular Review — Application processed within 7 to 10 working days.",
      "Step 6: Collect Stamped Passport — Retrieve passport with Bangladesh visa sticker.",
      "Step 7: Travel to Bangladesh — Enter via Dhaka Airport, Haridaspur-Benapole, or Gede-Darshana land border."
    ],
    "fees": {
      "visa_fee": "₹0 (Bilateral Exemption for Indians)",
      "service_fee": "approx. ₹850 (VAC Application Processing Fee)",
      "total_fee": "₹850 Total Reference",
      "notes": "Consular visa fee is ₹0 for Indian passport holders under bilateral agreement."
    },
    "proc_time": "7 to 10 Working Days",
    "proc_details": "Processed by the High Commission of Bangladesh in New Delhi and Deputy High Commissions across India.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Designated Port of Entry",
        "details": "Must enter and exit via designated land port or international airport indicated on visa."
      },
      {
        "category": "Consular Exemption",
        "details": "Zero visa fee for Indian citizens."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement",
        "minimum_balance_or_amount": "₹1,00,000+",
        "time_frame": "Past 3 months",
        "notes": "Original certified bank statement."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens pay a visa fee for Bangladesh?",
        "answer": "No, consular visa fees are ₹0 for Indian passport holders under bilateral treaties (only VAC logistics fees apply)."
      },
      {
        "question": "Can I travel to Bangladesh by train from India?",
        "answer": "Yes, passenger trains including the Maitree Express (Kolkata-Dhaka) and Bandhan Express operate between India and Bangladesh."
      }
    ],
    "validity": "Up to 90 Days",
    "stay_duration": "Up to 30-90 Days",
    "entry_type": "Single / Double / Multiple Entry",
    "official_source": "High Commission of Bangladesh in India & Department of Immigration and Passports (visa.gov.bd)"
  },
  "myanmar": {
    "overview": "Myanmar (Burma), the 'Golden Land', is renowned for the mesmerizing temple-dotted plains of Bagan, the sacred gold-leaf Shwedagon Pagoda in Yangon, the leg-rowing fishermen of Inle Lake, and the royal heritage of Mandalay. Indian citizens can apply for an electronic visa (eVisa) online at evisa.moip.gov.mm.",
    "highlights": [
      {
        "icon": "🛕",
        "title": "Ancient Bagan Plains",
        "description": "Over 2,200 ancient Buddhist temples and stupas scattered across lush river plains."
      },
      {
        "icon": "✨",
        "title": "Shwedagon Pagoda",
        "description": "Massive 99-meter gold-plated stupa encrusted with thousands of diamonds and rubies in Yangon."
      },
      {
        "icon": "🛶",
        "title": "Inle Lake",
        "description": "Tranquil floating gardens, stilt-house villages, and traditional Intha leg-rowing fishermen."
      },
      {
        "icon": "📱",
        "title": "Official eVisa",
        "description": "Apply online at evisa.moip.gov.mm with fast 3-day approval."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 6 months beyond intended stay with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Myanmar eVisa Application",
        "description": "Completed online application on evisa.moip.gov.mm.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Page Scan",
        "description": "Clear color copy of passport bio page.",
        "is_mandatory": true
      },
      {
        "title": "Digital Passport Photo",
        "description": "Color photo on white background (maximum 3 months old).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Reservation",
        "description": "Booking at a registered hotel or resort in Myanmar.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip airline reservation to Yangon (RGN) or Mandalay (MDL).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official Portal — Visit evisa.moip.gov.mm.",
      "Step 2: Select Tourist eVisa — Choose standard Tourist Visa category ($50 USD).",
      "Step 3: Enter Details & Upload Documents — Submit personal info, photo, and passport bio page.",
      "Step 4: Pay Processing Fee — Settle $50 USD statutory fee online via credit card.",
      "Step 5: Receive Approval Letter — Approval letter PDF issued within 3 business days.",
      "Step 6: Travel to Myanmar — Present approval letter and passport at Yangon or Mandalay international airports to receive entry stamp."
    ],
    "fees": {
      "visa_fee": "$50 USD (approx. ₹4,150)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "$50 USD Total Reference",
      "notes": "Paid online at evisa.moip.gov.mm."
    },
    "proc_time": "3 Working Days (Standard eVisa)",
    "proc_details": "Processed electronically by the Ministry of Immigration and Population of Myanmar.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 28 days of stay from the date of arrival."
      },
      {
        "category": "Designated Entry Ports",
        "details": "Accepted at Yangon, Mandalay, and Nay Pyi Taw international airports."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Bank Statement",
        "minimum_balance_or_amount": "₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "Crisp USD cash recommended as card acceptance is limited outside major hotels."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens qualify for Myanmar eVisa?",
        "answer": "Yes, Indian passport holders can easily apply for the 28-day tourist eVisa online via evisa.moip.gov.mm."
      },
      {
        "question": "Can the 28-day tourist eVisa be extended?",
        "answer": "Tourist visas are generally non-extendable except under force majeure or certified medical emergencies."
      }
    ],
    "validity": "90 Days Validity / 28 Days Stay",
    "stay_duration": "Up to 28 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Immigration and Population of Myanmar (evisa.moip.gov.mm)"
  },
  "laos": {
    "overview": "Laos (Lao PDR) is Southeast Asia's tranquil, land-linked hidden paradise. Discover the UNESCO-protected colonial and Buddhist architecture of Luang Prabang (Kuang Si Falls, morning alms giving), the limestone karst landscapes of Vang Vieng, and the golden stupas of Vientiane (Pha That Luang). Indian passport holders can easily apply for an electronic visa (eVisa) online at laoevisa.gov.la or obtain a Visa on Arrival (VOA).",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "UNESCO Luang Prabang",
        "description": "Preserved fusion of traditional Lao architecture and 19th-century French colonial charm."
      },
      {
        "icon": "🌊",
        "title": "Kuang Si Turquoise Waterfalls",
        "description": "Tiered three-tier limestone cascades flowing into vibrant turquoise swimming pools."
      },
      {
        "icon": "🧗",
        "title": "Vang Vieng Karst Landscapes",
        "description": "Towering limestone mountains, river tubing, hot-air ballooning, and caves."
      },
      {
        "icon": "📱",
        "title": "Official eVisa / VOA",
        "description": "Apply online at laoevisa.gov.la or get Visa on Arrival at international airports."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Laos eVisa Application",
        "description": "Completed online on the official portal laoevisa.gov.la.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Page Scan",
        "description": "Clear color copy of passport bio page.",
        "is_mandatory": true
      },
      {
        "title": "Digital Passport Photograph",
        "description": "Recent 4x6cm color photo on white background.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Booking",
        "description": "Proof of accommodation in Vientiane, Luang Prabang, or Vang Vieng.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip flight booking to Wattay (VTE) or Luang Prabang (LPQ) airport.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official Portal — Visit laoevisa.gov.la.",
      "Step 2: Fill Out Online Form — Provide personal details, passport info, and travel dates.",
      "Step 3: Upload Scanned Bio Page & Photo — Attach clear JPEG/PNG scans.",
      "Step 4: Pay Processing Fee — Settle $50 USD statutory fee online via Visa/Mastercard.",
      "Step 5: Receive eVisa Approval Letter — Download official approval PDF issued in 3 business days.",
      "Step 6: Travel to Laos — Present passport and printed approval letter at Wattay Airport (Vientiane) or Luang Prabang Airport for instant clearance."
    ],
    "fees": {
      "visa_fee": "$50 USD (approx. ₹4,150)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "$50 USD Total Reference",
      "notes": "Also available as Visa on Arrival for $50 USD cash at major border checkpoints."
    },
    "proc_time": "3 Business Days (Standard eVisa)",
    "proc_details": "Processed electronically by the Consular Department of the Ministry of Foreign Affairs of Lao PDR.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond the arrival date."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 days of stay per entry."
      },
      {
        "category": "Designated Entry Ports",
        "details": "Accepted at Wattay International Airport, Luang Prabang Airport, Pakse Airport, and major Thai-Lao Friendship Bridges."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Bank Statement",
        "minimum_balance_or_amount": "₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "Cash in crisp USD bills is widely accepted and recommended."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens qualify for Laos eVisa?",
        "answer": "Yes, Indian passport holders can apply online at laoevisa.gov.la for a 30-day single-entry tourist visa."
      },
      {
        "question": "Can I get a Visa on Arrival in Laos?",
        "answer": "Yes, Visa on Arrival is available at Wattay Airport (Vientiane) and Luang Prabang Airport for $50 USD cash."
      }
    ],
    "validity": "60 Days Validity / 30 Days Stay",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Consular Department, Ministry of Foreign Affairs of Lao PDR (laoevisa.gov.la)"
  },
  "mongolia": {
    "overview": "Mongolia, the 'Land of the Eternal Blue Sky', offers boundless steppe, the dramatic Gobi Desert, pristine alpine Lake Khövsgöl, and living nomadic horse culture. Experience the vibrant Naadam Festival (wrestling, horse racing, archery), explore ancient Karakorum (Genghis Khan's capital), and sleep in traditional felt Gers. Apply online via evisa.mn.",
    "highlights": [
      {
        "icon": "🐎",
        "title": "Nomadic Steppe & Ger Camps",
        "description": "Endless grasslands, sleeping under star-filled skies in traditional felt Gers (yurts)."
      },
      {
        "icon": "🐪",
        "title": "Gobi Desert & Flaming Cliffs",
        "description": "Singing Sand Dunes (Khongoryn Els), ice canyons in Yolyn Am, and dinosaur fossils."
      },
      {
        "icon": "🏹",
        "title": "Naadam Festival",
        "description": "Ancient 'Three Games of Men' — world-famous wrestling, cross-country horse racing, and archery."
      },
      {
        "icon": "📱",
        "title": "Official eVisa",
        "description": "Apply online at evisa.mn for fast 72-hour electronic visa issuance."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 6 months beyond intended stay with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Mongolia eVisa Application",
        "description": "Completed online on the official portal evisa.mn.",
        "is_mandatory": true
      },
      {
        "title": "Passport Bio-Data Page Scan",
        "description": "Clear color copy of passport bio page.",
        "is_mandatory": true
      },
      {
        "title": "Digital Passport Photo",
        "description": "Recent color photograph meeting ICAO biometric standards.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel / Ger Camp Booking",
        "description": "Proof of accommodation in Ulaanbaatar or regional tour camps.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip airline reservation to Chinggis Khaan International Airport (UBN).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official eVisa Portal — Visit evisa.mn.",
      "Step 2: Fill Out Application Form — Enter personal info, passport data, and travel dates.",
      "Step 3: Upload Scanned Bio Page & Photo — Attach clear digital images.",
      "Step 4: Pay Processing Fee — Settle $51.50 USD statutory fee online via credit/debit card.",
      "Step 5: Receive Approval Notification — Decision issued within 72 hours (3 business days).",
      "Step 6: Download & Print eVisa — Download the official electronic visa PDF.",
      "Step 7: Travel to Ulaanbaatar — Present passport and printed eVisa at Chinggis Khaan Airport immigration."
    ],
    "fees": {
      "visa_fee": "$51.50 USD (approx. ₹4,300)",
      "service_fee": "₹0 (Official Direct Portal)",
      "total_fee": "$51.50 USD Total Reference",
      "notes": "Paid online at evisa.mn via card."
    },
    "proc_time": "72 Hours (3 Business Days)",
    "proc_details": "Processed electronically by the Mongolia Immigration Agency (MIA).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond arrival date."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 days of stay per single entry."
      },
      {
        "category": "Designated Entry Ports",
        "details": "Accepted at Chinggis Khaan International Airport and major border checkpoints."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement",
        "minimum_balance_or_amount": "₹1,50,000+",
        "time_frame": "Past 3 months",
        "notes": "Proof of adequate travel funds."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens qualify for Mongolia eVisa?",
        "answer": "Yes, Indian passport holders can easily apply for the 30-day tourist eVisa online at evisa.mn."
      },
      {
        "question": "What is the best time to visit Mongolia?",
        "answer": "Summer months (June to August) are ideal for warm weather and the spectacular Naadam Festival."
      }
    ],
    "validity": "150 Days Validity / 30 Days Stay",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Mongolia Immigration Agency (MIA - evisa.mn) & Ministry of Foreign Affairs"
  },
  "taiwan": {
    "overview": "Taiwan is a powerhouse of cutting-edge innovation, world-famous night markets, stunning nature (Taroko Marble Gorge, Sun Moon Lake), and warm hospitality. Explore Taipei 101, the National Palace Museum, and lush tea mountains. Indian citizens holding a valid visa or permanent residency for the US, UK, Canada, Japan, Australia, New Zealand, or Schengen can obtain an instant, FREE online ROC Travel Authorization Certificate (TAC); all others apply via BOCA.",
    "highlights": [
      {
        "icon": "🏙️",
        "title": "Taipei 101 & Night Markets",
        "description": "Iconic bamboo-inspired skyscraper and legendary Shilin and Raohe street food night markets."
      },
      {
        "icon": "🏞️",
        "title": "Taroko Marble Gorge",
        "description": "Spectacular turquoise river cutting through towering marble cliffs and suspension bridges."
      },
      {
        "icon": "🌊",
        "title": "Sun Moon Lake & Alishan",
        "description": "Scenic alpine lake and high-altitude mist-shrouded ancient cypress forests and sunrise trains."
      },
      {
        "icon": "⚡",
        "title": "Instant Free Travel Certificate (TAC)",
        "description": "Free instant 14-day online entry permit for holders of valid US, UK, Canada, Japan, or Schengen visas."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond the date of arrival with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "ROC Travel Authorization Certificate (TAC) or Visitor Visa Application",
        "description": "Instant online TAC certificate (if eligible) or completed BOCA visa form.",
        "is_mandatory": true
      },
      {
        "title": "Qualifying Western Visa / PR Card (for TAC applicants)",
        "description": "Original valid visa or permanent residence card for US, UK, Schengen, Canada, Japan, Australia, or NZ.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip airline reservation leaving Taiwan within 14-30 days.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking Confirmation",
        "description": "Confirmed accommodation bookings for stay in Taiwan.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Check TAC Eligibility — If you hold a valid visa or PR for US, UK, Canada, Japan, Australia, or Schengen, apply for the FREE online ROC TAC.",
      "Step 2: Complete Online TAC (if eligible) — Fill form on the National Immigration Agency portal (immigration.gov.tw) and get instant PDF approval.",
      "Step 3: Apply for Visitor Visa via BOCA (if not eligible for TAC) — Fill application on visawebview.boca.gov.tw and submit at Taipei Economic and Cultural Center (TECC) in New Delhi or Chennai.",
      "Step 4: Pay Processing Fee (if BOCA visa) — Pay ₹4,000 for single entry or ₹8,000 for multiple entry (TAC is 100% FREE).",
      "Step 5: Receive Visa Vignette — Collect passport with visa stamped within 5 working days.",
      "Step 6: Travel to Taiwan — Present passport, return ticket, and TAC or visa at Taoyuan Airport (TPE) immigration."
    ],
    "fees": {
      "visa_fee": "₹0 (Free Online TAC for Western visa holders) or ₹4,000 (TECC Visitor Visa Single Entry)",
      "service_fee": "₹0 (Direct Portal / TECC)",
      "total_fee": "₹0 or ₹4,000 Total Reference",
      "notes": "Online ROC Travel Authorization Certificate (TAC) is completely free of charge."
    },
    "proc_time": "Instant Online (TAC) / 5 Working Days (TECC Consular Visa)",
    "proc_details": "Instant digital issuance via National Immigration Agency (NIA) or consular review at TECC in India.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond entry date."
      },
      {
        "category": "TAC Entry Rule",
        "details": "Permits up to 14 days of stay; multiple entry valid for 90 days."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return airline ticket or onward ticket is strictly enforced at boarding."
      }
    ],
    "financial_proofs": [
      {
        "type": "Personal Bank Statement",
        "minimum_balance_or_amount": "₹1,50,000 - ₹2,50,000",
        "time_frame": "Past 3 months",
        "notes": "Required if applying for traditional consular visa at TECC."
      }
    ],
    "faqs": [
      {
        "question": "How can Indian passport holders visit Taiwan for free?",
        "answer": "If you hold a valid multiple-entry visa or permanent residence from the US, UK, Schengen, Canada, Japan, Australia, or New Zealand, you can obtain a 100% FREE online ROC Travel Authorization Certificate (TAC) in 2 minutes."
      },
      {
        "question": "How long can I stay in Taiwan on a TAC?",
        "answer": "The TAC permits a stay of up to 14 days per entry and is valid for 90 days with multiple entries."
      }
    ],
    "validity": "90 Days Validity (TAC) / Up to 180 Days (Consular Visa)",
    "stay_duration": "Up to 14 Days (TAC) / 30-90 Days (Consular Visa)",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Bureau of Consular Affairs (BOCA) & National Immigration Agency (NIA Taiwan)"
  },
  "hong-kong": {
    "overview": "Hong Kong SAR is a dazzling vertical metropolis where towering neon skylines meet ancient Cantonese fishing villages, misty green peaks, and Michelin-starred culinary culture. Marvel at Victoria Harbour and Symphony of Lights from Victoria Peak, ride the historic Star Ferry, explore Lantau Island (Tian Tan Big Buddha), and shop in Mong Kok. Indian passport holders must complete an instant, FREE online Pre-Arrival Registration (PAR) at gov.hk before departure.",
    "highlights": [
      {
        "icon": "🌃",
        "title": "Victoria Peak & Harbour",
        "description": "World's most iconic skyscraper skyline, Star Ferry crossing, and Symphony of Lights laser show."
      },
      {
        "icon": "🛕",
        "title": "Lantau Island Giant Buddha",
        "description": "Massive 34-meter bronze Tian Tan Buddha reached via the scenic Ngong Ping 360 glass-bottom cable car."
      },
      {
        "icon": "🥟",
        "title": "Dim Sum & Culinary Capital",
        "description": "World-famous traditional tea houses, roast goose, egg tarts, and Michelin-starred street food."
      },
      {
        "icon": "📱",
        "title": "Instant Free Online PAR",
        "description": "Complete Pre-Arrival Registration online in 5 minutes at gov.hk for 14 days visa-free entry."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 6 months with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Notification Slip for Pre-Arrival Registration (PAR)",
        "description": "Printed official PAR notification slip generated online via gov.hk (mandatory at flight boarding).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip airline reservation leaving Hong Kong within 14 days.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking Confirmation",
        "description": "Proof of accommodation in Hong Kong.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Access Official GovHK Portal — Visit the official Immigration Department PAR portal on gov.hk.",
      "Step 2: Enter Bio-Data & Passport Details — Fill in exact personal details matching your Indian passport.",
      "Step 3: Submit Registration — System instantly verifies and issues electronic result in real-time.",
      "Step 4: Print PAR Notification Slip — Print the official A4-sized 'Notification Slip for Pre-Arrival Registration'.",
      "Step 5: Board Flight to Hong Kong — Airline counter verifies your printed PAR slip and return ticket.",
      "Step 6: Clear Immigration at HKIA — Present passport and printed PAR slip at Hong Kong International Airport (HKG) for 14-day landing slip."
    ],
    "fees": {
      "visa_fee": "₹0 (100% Free Online Pre-Arrival Registration)",
      "service_fee": "₹0 (Direct GovHK Portal)",
      "total_fee": "₹0 (Completely Free)",
      "notes": "Pre-Arrival Registration (PAR) is 100% free of charge on gov.hk."
    },
    "proc_time": "Instant Online (Real-time in 5 minutes)",
    "proc_details": "Generated instantly by the Hong Kong Immigration Department automated system.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "PAR Notification Slip",
        "details": "Must be printed on plain white A4 paper; digital copies on mobile phones are NOT accepted by airlines."
      },
      {
        "category": "Stay Limit",
        "details": "Maximum 14 days of stay per visit; PAR is valid for 6 months with multiple entries."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash / Bank Balance",
        "minimum_balance_or_amount": "Minimum HK$5,000 or ₹1,00,000+",
        "time_frame": "Travel duration",
        "notes": "Spot solvency check at border control."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Hong Kong?",
        "answer": "Indian passport holders do NOT need a prior visa for visits up to 14 days; however, you MUST complete the free online Pre-Arrival Registration (PAR) at gov.hk and print the slip before flying."
      },
      {
        "question": "What if my PAR is unsuccessful?",
        "answer": "If your online PAR registration is not accepted, you must apply for an entry visa directly to the Hong Kong Immigration Department (takes 4-6 weeks)."
      }
    ],
    "validity": "6 Months Validity (Multiple Entries)",
    "stay_duration": "Up to 14 Days per Visit",
    "entry_type": "Multiple Entry",
    "official_source": "Immigration Department of the Government of the Hong Kong Special Administrative Region (gov.hk)"
  },
  "macau": {
    "overview": "Macau SAR, the 'Vegas of the East', is a mesmerizing blend of centuries-old Portuguese colonial architecture and modern resort spectacle. Explore the UNESCO World Heritage Historic Centre of Macao (Ruins of St. Paul's, Senado Square, A-Ma Temple), Portuguese cobblestone lanes, world-class entertainment resorts on the Cotai Strip, and Portuguese egg tarts. Indian passport holders can obtain an Entry Permit (Visa on Arrival) for 30 days at airport and ferry terminals.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Ruins of St. Paul's",
        "description": "17th-century Portuguese Jesuit church stone façade — Macau's most iconic UNESCO landmark."
      },
      {
        "icon": "🎰",
        "title": "Cotai Strip & Venetian",
        "description": "World-famous integrated luxury resorts, indoor canals with gondolas, and spectacular shows."
      },
      {
        "icon": "🥧",
        "title": "Portuguese Culinary Heritage",
        "description": "Lord Stow's legendary Portuguese egg tarts, Macanese African chicken, and egg rolls."
      },
      {
        "icon": "🚢",
        "title": "Ferry & Delta Bridge",
        "description": "Hop over from Hong Kong in 55 minutes via TurboJET ferry or the 55km Hong Kong-Zhuhai-Macau Bridge."
      }
    ],
    "documents": [
      {
        "title": "Valid International Passport",
        "description": "Valid for at least 30 days beyond intended stay with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Entry Permit Application Form (on Arrival)",
        "description": "Completed entry slip provided at Macau border checkpoints.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return / Onward Travel Ticket",
        "description": "Return air ticket or TurboJET/Cotai Water Jet ferry ticket back to Hong Kong or onward destination.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking Confirmation",
        "description": "Confirmed booking at a registered Macau hotel or resort.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Proof of holding at least 5,000 MOP (approx. ₹52,000) for stays up to 7 days, or 10,000 MOP for up to 14 days.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Travel to Macau — Fly directly into Macau International Airport (MFM) or take TurboJET ferry/cross-border bus from Hong Kong.",
      "Step 2: Proceed to Immigration — Approach the 'Visa upon Arrival' (Entry Permit) counter.",
      "Step 3: Present Passport & Solvency Proof — Show passport, return ticket, hotel voucher, and cash/credit card proof.",
      "Step 4: Pay Statutory Entry Permit Fee — Pay 100 MOP (approx. ₹1,050 / $12 USD) per person in MOP or HKD cash.",
      "Step 5: Receive Landing Slip — Immigration officer prints and stamps your 30-day landing slip.",
      "Step 6: Enjoy Macau — Explore the historic center and Cotai Strip resorts."
    ],
    "fees": {
      "visa_fee": "100 MOP (approx. ₹1,050 / $12 USD) on Arrival",
      "service_fee": "₹0 (No prior appointment)",
      "total_fee": "100 MOP Total Reference",
      "notes": "Payable in Macau Patacas (MOP) or Hong Kong Dollars (HKD) at border control."
    },
    "proc_time": "Instant on Arrival (10-15 Minutes at Checkpoint)",
    "proc_details": "Issued directly by the Public Security Police Force (PSPF) at airport and ferry terminals.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 30 days beyond intended stay."
      },
      {
        "category": "Duration of Stay",
        "details": "Up to 30 days from date of arrival."
      },
      {
        "category": "Financial Solvency Requirement",
        "details": "Visitors must demonstrate minimum cash/credit card availability: 5,000 MOP (stays up to 7 days) or 10,000 MOP (up to 14 days)."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (MOP / HKD / USD) or Credit Cards",
        "minimum_balance_or_amount": "Minimum 5,000 MOP (approx. ₹52,000)",
        "time_frame": "Carried during travel",
        "notes": "Statutory spot check enforced by Macau border control."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens get a visa on arrival in Macau?",
        "answer": "Yes, Indian passport holders can obtain an Entry Permit (Visa on Arrival) at Macau airport and ferry terminals for 100 MOP (approx. ₹1,050) valid for up to 30 days."
      },
      {
        "question": "Can I visit Macau for a day trip from Hong Kong?",
        "answer": "Yes! Ferries (TurboJET / Cotai Water Jet) run every 15-30 minutes taking just 55 minutes, or you can take the shuttle bus across the 55km Hong Kong-Zhuhai-Macau Bridge."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Public Security Police Force of Macau SAR (Immigration Department - fsm.gov.mo)"
  },
  "nigeria": {
    "overview": "Nigeria is West Africa's economic giant and cultural powerhouse, renowned for its energetic megacity Lagos, national capital Abuja, rich Yoruba and Igbo cultural traditions, and breathtaking natural wonders like Zuma Rock and Olumo Rock. Indian passport holders must apply for a tourist visa through the Nigeria Immigration Service (NIS) portal or at the Nigerian High Commission in New Delhi.",
    "highlights": [
      {
        "icon": "🏙️",
        "title": "Lagos Megacity & Victoria Island",
        "description": "Dynamic nightlife, Lekki Conservation Centre canopy walk, vibrant contemporary art scene, and beaches."
      },
      {
        "icon": "🪨",
        "title": "Abuja & Iconic Zuma Rock",
        "description": "The monumental monolithic Zuma Rock, Aso Rock, and modernist National Mosque and National Church in Abuja."
      },
      {
        "icon": "🌿",
        "title": "Osun-Osogbo Sacred Grove",
        "description": "UNESCO World Heritage sacred forest sanctuary with ancient shrines, sculptures, and sanctuaries along the Osun River."
      },
      {
        "icon": "🎭",
        "title": "Calabar Carnival & Cultural Festivals",
        "description": "Celebrated as Africa's biggest street party, featuring spectacular pageantry, music, and masquerade heritage."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Card",
        "description": "Mandatory international certificate of yellow fever vaccination (Yellow Card) checked at airport health controls.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Reservation or Host Invitation",
        "description": "Hotel booking voucher or notarized Letter of Invitation from Nigerian host accompanied by their passport/ID copy.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Verifiable round-trip air flight itinerary showing departure from and return to India.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Original stamped bank statements for past 6 months showing sufficient funds for stay (minimum $1,500 equivalent).",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Sized Photographs",
        "description": "Recent color photos (35x45mm) on a plain white background without glasses.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Complete Online Application: Fill the visa form on the official Nigeria Immigration Service portal (portal.immigration.gov.ng).",
      "Pay Statutory Visa Fees Online: Pay consular visa fee and NIS processing charge using international credit card through Innovate1 Services.",
      "Print Application & Payment Receipts: Download and print the completed Form, Acknowledgement Slip, and Payment Receipt.",
      "Gather Mandatory Documents & Yellow Card: Secure original passport, 6-month bank statements, hotel voucher, and yellow fever certificate.",
      "Submit at High Commission / OIS Services: Attend your biometric submission and document review at OIS Services or Nigerian High Commission in New Delhi.",
      "Passport Collection: Receive your stamped Nigerian tourist visa sticker typically within 7 to 14 business days."
    ],
    "fees": {
      "visa_fee": "$160 (NIS Tourist Statutory Fee)",
      "service_fee": "$90 (OIS Services Biometrics & Logistics)",
      "total_fee": "$250 (approx. ₹21,000 Total)",
      "notes": "Official NIS portal rates are set in USD and paid online."
    },
    "proc_time": "7 to 14 Working Days",
    "proc_details": "Processed via OIS Services center in New Delhi/Mumbai and Nigerian High Commission consular section.",
    "requirements": [
      {
        "category": "Health & Vaccination",
        "details": "Mandatory Yellow Fever vaccination certificate administered at least 10 days prior to arrival."
      },
      {
        "category": "Host Acceptance",
        "details": "Host in Nigeria must provide an acceptance of immigration responsibility letter if not staying in a commercial hotel."
      },
      {
        "category": "Financial Sufficiency",
        "details": "Demonstrated minimum bank balance of ₹1,50,000 maintained over 6 months."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000 to ₹2,50,000",
        "description": "Original bank statement with bank stamp and branch manager seal for the last 6 months."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 2 Financial Years",
        "description": "ITR-V acknowledgement forms demonstrating legitimate steady earnings in India."
      }
    ],
    "faqs": [
      {
        "question": "Is the Yellow Fever card strictly required for entering Nigeria?",
        "answer": "Yes, international health port control strictly verifies the Yellow Card upon arrival at Lagos and Abuja airports. It must be administered at least 10 days before travel."
      },
      {
        "question": "Can Indian tourists get a Visa on Arrival in Nigeria?",
        "answer": "No. The Visa on Arrival (VoA) facility for Nigeria is reserved exclusively for high-net-worth investors and urgent business executives with prior NIS Comptroller General approval. Tourists must obtain a visa before travel."
      },
      {
        "question": "How long can an Indian tourist stay in Nigeria?",
        "answer": "The standard single-entry tourist visa authorizes a stay of up to 30 days, extendable inside Nigeria at a state NIS headquarters."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 30 Days (Extendable locally)",
    "entry_type": "Single Entry (Multiple available upon justified request)",
    "official_source": "Nigeria Immigration Service (portal.immigration.gov.ng) & Nigeria High Commission New Delhi"
  },
  "ghana": {
    "overview": "Ghana, celebrated as the 'Gateway to Africa', is revered for its peaceful democracy, warm hospitality ('Akwaaba'), golden Atlantic coastline, historic Cape Coast and Elmina castles, vibrant Accra nightlife, and rich Ashanti royal heritage. Indian passport holders must obtain a tourist visa from the Ghana High Commission in New Delhi.",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Cape Coast & Elmina Castles",
        "description": "UNESCO World Heritage fortress monuments along the Atlantic coast, poignant memorials to the trans-Atlantic trade."
      },
      {
        "icon": "🌳",
        "title": "Kakum National Park Canopy Walk",
        "description": "Thrilling 350-meter suspended canopy walkway high above the lush virgin tropical rainforest."
      },
      {
        "icon": "🏖️",
        "title": "Accra & Labadi Beach Culture",
        "description": "Osu Oxford Street's buzzing food scene, National Museum, Makola market, and lively beachfront drum circles."
      },
      {
        "icon": "🐘",
        "title": "Mole National Park Safaris",
        "description": "Ghana's premier wildlife sanctuary in the northern savanna, home to roaming wild elephants and antelopes."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for minimum 6 months beyond intended stay with at least 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Original International Health Certificate proving yellow fever vaccination at least 10 days before departure.",
        "is_mandatory": true
      },
      {
        "title": "Two Completed Visa Application Forms",
        "description": "Fully filled application forms with two recent identical passport-size photos (white background).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Itinerary",
        "description": "Verifiable return flight ticket showing arrival into and departure from Kotoka International Airport (ACC), Accra.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation or Host Invitation",
        "description": "Confirmed booking at a registered hotel or notarized letter from a host in Ghana with copy of their Ghanaian passport/residence ID.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Original stamped bank statements demonstrating financial solvency (minimum balance ₹1,25,000).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Download & Complete Visa Application: Complete the official Ghana consular visa form accurately in duplicate.",
      "Secure Mandatory Yellow Fever Shot: Ensure yellow fever vaccine is administered at an authorized international vaccination center.",
      "Assemble Supporting Dossier: Prepare passport, 3-month bank statement, hotel booking voucher, flight ticket, and 2 photos.",
      "Submit at Ghana High Commission New Delhi: Submit physical file and pay consular fee by Demand Draft at the High Commission in New Delhi.",
      "Consular Assessment & Interview: Embassy conducts security checks and may contact host or applicant.",
      "Collect Passport: Retrieve your stamped visa sticker within 7 to 10 working days."
    ],
    "fees": {
      "visa_fee": "₹6,000 (Single Entry 3 Months) / ₹10,000 (Multiple Entry)",
      "service_fee": "₹1,500 (Consular Submission Logistics)",
      "total_fee": "₹7,500 - ₹11,500 Total",
      "notes": "Fees paid via Demand Draft to Ghana High Commission New Delhi."
    },
    "proc_time": "7 to 10 Working Days",
    "proc_details": "Consular processing at Ghana High Commission, Vasant Vihar, New Delhi.",
    "requirements": [
      {
        "category": "Health Requirement",
        "details": "Mandatory Yellow Fever vaccination card required for entry at Kotoka International Airport (Accra)."
      },
      {
        "category": "Host Letter",
        "details": "If staying with friends/family, notarized invitation letter and host's Ghanaian ID/residence permit required."
      },
      {
        "category": "Sufficient Funds",
        "details": "Minimum ₹1,25,000 balance in applicant's personal bank account."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statement",
        "minimum_balance_or_amount": "₹1,25,000",
        "description": "Original 3-month bank statement bearing original bank seal and stamp."
      },
      {
        "type": "Employment Proof / Salary Slips",
        "minimum_balance_or_amount": "Last 3 Months",
        "description": "Salary slips and employer leave authorization letter."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders get a Visa on Arrival in Ghana?",
        "answer": "No. Visa on Arrival for Ghana requires special prior authorization from the Comptroller-General of the Ghana Immigration Service (GIS) arranged by a sponsoring entity. Tourists must obtain a visa in New Delhi before travel."
      },
      {
        "question": "Is the Yellow Fever vaccine compulsory for Ghana?",
        "answer": "Yes. Every traveller aged 9 months or older must show a valid Yellow Fever Vaccination Card upon boarding and arrival in Accra."
      },
      {
        "question": "How long can I stay in Ghana on a single-entry tourist visa?",
        "answer": "Consulates issue a 30-day stay upon entry, which can be extended at Ghana Immigration Service headquarters in Accra."
      }
    ],
    "validity": "3 Months from Date of Issue",
    "stay_duration": "Up to 30 Days (Extendable at GIS Accra)",
    "entry_type": "Single Entry (Multiple available for regular visitors)",
    "official_source": "Ghana Immigration Service (GIS) & High Commission of Ghana in New Delhi"
  },
  "ethiopia": {
    "overview": "Ethiopia, the cradle of mankind and Africa's ancient Christian empire, boasts 3,000 years of unbroken history. Marvel at the 12th-century monolithic rock-hewn churches of Lalibela, the dramatic peaks and Gelada baboons of the Simien Mountains, the geothermal lava lakes of Danakil Depression, and the bustling coffee heritage of Addis Ababa. Indian passport holders can easily obtain an official tourist eVisa online via evisa.gov.et.",
    "highlights": [
      {
        "icon": "⛪",
        "title": "Rock-Hewn Churches of Lalibela",
        "description": "11 monolithic medieval rock-cut churches, including the cross-shaped Church of Saint George (UNESCO)."
      },
      {
        "icon": "🏔️",
        "title": "Simien Mountains National Park",
        "description": "Spectacular jagged escarpments, home to endemic Gelada baboons, Walia ibex, and Ethiopian wolves."
      },
      {
        "icon": "🌋",
        "title": "Danakil Depression & Erta Ale",
        "description": "Otherworldly salt pans, bubbling sulfur springs, and active molten lava lakes in the Afar triangle."
      },
      {
        "icon": "☕",
        "title": "Addis Ababa & Coffee Ceremony",
        "description": "National Museum (Lucy fossil skeleton), Holy Trinity Cathedral, and authentic Ethiopian Bunna coffee ceremonies."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months from the intended arrival date with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Ethiopian eVisa Approval",
        "description": "Printed confirmation of approved tourist eVisa from the official portal (evisa.gov.et).",
        "is_mandatory": true
      },
      {
        "title": "Passport Size Photograph",
        "description": "Digital color passport photograph (35x45mm) uploaded during eVisa application.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Confirmed round-trip ticket arriving at Addis Ababa Bole International Airport (ADD).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Confirmed booking voucher from a registered hotel or tour operator in Ethiopia.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Card (if arriving from endemic zone)",
        "description": "Required if transiting through or arriving from an internationally designated yellow fever endemic area.",
        "is_mandatory": false
      }
    ],
    "steps": [
      "Apply Online: Visit the official Ethiopian eVisa portal (evisa.gov.et) and select Tourist Visa.",
      "Upload Passport & Photo: Upload clean digital scan of your passport biodata page and recent portrait photo.",
      "Pay eVisa Fee Online: Pay $82 (30-day single entry) or $202 (90-day single entry) via international credit/debit card.",
      "Receive Approval PDF: Official electronic visa approval is emailed within 24 to 72 hours.",
      "Board Ethiopian Airlines / Flight: Print the eVisa document and carry your passport.",
      "Immigration Clearance: Present your printed eVisa and passport at Bole International Airport (Addis Ababa) for passport entry stamp."
    ],
    "fees": {
      "visa_fee": "$82 (30 Days Single Entry) / $202 (90 Days Single Entry)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$82 - $202 (approx. ₹6,900 - ₹17,000)",
      "notes": "Official fees paid directly via card on evisa.gov.et."
    },
    "proc_time": "1 to 3 Working Days (Often within 24 hours)",
    "proc_details": "Processed completely online by the Main Department for Immigration and Nationality Affairs (ICS).",
    "requirements": [
      {
        "category": "Entry Port",
        "details": "The tourist eVisa is valid for entry ONLY through Addis Ababa Bole International Airport (ADD)."
      },
      {
        "category": "Passport Validity",
        "details": "Passport must have at least 6 months remaining validity from your entry date."
      },
      {
        "category": "Payment Method",
        "details": "Requires an international credit/debit card enabled for foreign currency transactions."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statement / Card Limit",
        "minimum_balance_or_amount": "₹1,00,000",
        "description": "Bank account statement or international credit card statement proving ability to fund travels."
      },
      {
        "type": "Tour Package Booking",
        "minimum_balance_or_amount": "Voucher Confirmation",
        "description": "Tour booking itinerary for regional trips to Lalibela or Danakil."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for an Ethiopian eVisa?",
        "answer": "Yes! Indian passport holders are 100% eligible for the official Ethiopian online eVisa through evisa.gov.et."
      },
      {
        "question": "Can I get a Visa on Arrival at Addis Ababa airport?",
        "answer": "Visa on Arrival facilities at Bole Airport are limited and subject to sudden changes. All tourists are strongly advised by Ethiopian authorities to obtain their eVisa online prior to boarding."
      },
      {
        "question": "Can I extend my tourist visa inside Ethiopia?",
        "answer": "Yes. You can extend your tourist stay in Addis Ababa at the Immigration and Nationality Affairs main headquarters before your initial 30 days expire."
      }
    ],
    "validity": "30 or 90 Days from Date of Arrival",
    "stay_duration": "30 or 90 Days (as selected on application)",
    "entry_type": "Single Entry",
    "official_source": "Main Department for Immigration and Nationality Affairs (evisa.gov.et) & Ethiopian Embassy New Delhi"
  },
  "rwanda": {
    "overview": "Rwanda, known as 'The Land of a Thousand Hills', is celebrated worldwide for its exceptional safety, pristine streets, world-class governance, and remarkable eco-tourism. Experience rare mountain gorilla trekking in Volcanoes National Park, chimpanzee tracking in Nyungwe rainforest, boat cruises on Lake Kivu, and the inspiring modern architecture of Kigali. Indian passport holders can receive a 30-day Visa on Arrival (VOA) or apply online via IREMBO.",
    "highlights": [
      {
        "icon": "🦍",
        "title": "Mountain Gorilla Trekking",
        "description": "Encounter endangered mountain gorilla families in their natural mist-shrouded bamboo habitat in Volcanoes National Park."
      },
      {
        "icon": "🏙️",
        "title": "Kigali & Modern Cleanliness",
        "description": "Africa's cleanest and safest capital city, featuring the Kigali Genocide Memorial, Convention Centre, and art galleries."
      },
      {
        "icon": "🌳",
        "title": "Nyungwe Forest Canopy Walk",
        "description": "Suspended bridge 70 meters above one of Africa's oldest montane rainforests, teeming with primates and birdlife."
      },
      {
        "icon": "🦏",
        "title": "Akagera Big Five Safaris",
        "description": "Savanna wildlife game drives featuring lions, rhinos, elephants, leopards, and buffaloes along picturesque lakes."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond intended stay with at least 1 blank visa page.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Accommodation Booking",
        "description": "Hotel booking voucher or safari lodge confirmation in Rwanda.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip flight booking arriving at Kigali International Airport (KGL).",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Bank account statement or international credit card demonstrating minimum $50/day living allowance.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Card (if arriving from endemic country)",
        "description": "Mandatory if travelling from or transiting through yellow fever endemic zones.",
        "is_mandatory": false
      }
    ],
    "steps": [
      "Select Application Method: Choose 30-day Visa on Arrival (VOA) at Kigali Airport or apply in advance on irembo.gov.rw.",
      "Check Passport Validity: Ensure your Indian passport has at least 6 months validity.",
      "Book Flights & Hotels: Reserve round-trip flights into Kigali International Airport and accommodation.",
      "Fly to Kigali: Board your flight to Kigali (RwandAir operates non-stop direct flights from Mumbai).",
      "Pay Fee at Immigration Counter: Present your passport at Kigali Airport border control and pay the $50 statutory tourist visa fee.",
      "Receive Entry Stamp: Border control stamps your 30-day tourist entry visa into your passport."
    ],
    "fees": {
      "visa_fee": "$50 (Single Entry 30 Days) / $70 (Multiple Entry 90 Days)",
      "service_fee": "$0 (Direct at Airport Border or Irembo)",
      "total_fee": "$50 (approx. ₹4,200)",
      "notes": "Payable by Visa/Mastercard credit card or cash at Kigali Airport."
    },
    "proc_time": "Instant (On Arrival) or 3 Days (via Irembo online)",
    "proc_details": "Granted instantly at Kigali International Airport immigration desk or land borders.",
    "requirements": [
      {
        "category": "Visa on Arrival",
        "details": "Indian citizens are granted a 30-day Visa on Arrival without requiring pre-approval letters."
      },
      {
        "category": "East Africa Tourist Visa",
        "details": "Eligible to purchase the $100 East Africa Tourist Visa (EATV) allowing travel across Rwanda, Kenya, and Uganda."
      },
      {
        "category": "Health Checks",
        "details": "Yellow fever card required if arriving from infected zones."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Account",
        "minimum_balance_or_amount": "₹50,000",
        "description": "International debit/credit card or bank balance demonstrating personal travel funds."
      },
      {
        "type": "Gorilla Trekking Permit (if applicable)",
        "minimum_balance_or_amount": "$1,500 booking voucher",
        "description": "Official RDB gorilla trekking permit voucher."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Rwanda?",
        "answer": "Yes! Rwanda provides Visa on Arrival for citizens of all countries, including India. You pay $50 at the immigration counter upon landing at Kigali International Airport."
      },
      {
        "question": "What is the East Africa Tourist Visa (EATV)?",
        "answer": "The EATV costs $100 and allows 90 days of multiple-entry travel across Rwanda, Uganda, and Kenya, provided you enter first through the issuing country."
      },
      {
        "question": "Are there direct flights between India and Rwanda?",
        "answer": "Yes! RwandAir operates regular non-stop direct flights connecting Mumbai (BOM) to Kigali (KGL) in just about 6 hours."
      }
    ],
    "validity": "30 Days from Date of Entry",
    "stay_duration": "30 Days (Extendable at DGIE Kigali)",
    "entry_type": "Single Entry (Multiple available on request)",
    "official_source": "Directorate General of Immigration and Emigration (migration.gov.rw) & Rwanda Development Board (RDB)"
  },
  "zimbabwe": {
    "overview": "Zimbabwe is a land of dramatic natural drama, warm African hospitality, and ancient civilizations. Gaze upon Victoria Falls ('Mosi-oa-Tunya' - The Smoke That Thunders), one of the Seven Natural Wonders of the World; witness massive elephant herds in Hwange National Park; explore the UNESCO medieval dry-stone citadel of Great Zimbabwe; and canoe down the wild Zambezi River in Mana Pools. Indian passport holders can obtain an official eVisa online (evisa.gov.zw) or enter on Category B visa terms.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Victoria Falls & Zambezi River",
        "description": "The world's largest sheet of falling water, Devils Pool, white-water rafting, and luxury sunset Zambezi cruises."
      },
      {
        "icon": "🐘",
        "title": "Hwange National Park Wildlife",
        "description": "Zimbabwe's largest national park, home to one of the world's highest concentrations of African elephants and predators."
      },
      {
        "icon": "🏰",
        "title": "Great Zimbabwe Monument (UNESCO)",
        "description": "Colossal 11th-century medieval granite stone city, the historic capital of the ancient Kingdom of Zimbabwe."
      },
      {
        "icon": "🛶",
        "title": "Mana Pools National Park",
        "description": "UNESCO World Heritage floodplains famous for walking safaris, canoeing past hippos, and untamed wilderness."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with minimum 3 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Zimbabwean eVisa Approval",
        "description": "Electronic Visa Approval Letter obtained online via evisa.gov.zw.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Flight Itinerary",
        "description": "Return flight booking arriving into Harare (HRE) or Victoria Falls (VFA).",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Safari Lodge Booking",
        "description": "Proof of accommodation in Victoria Falls, Harare, or wildlife safari lodges.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Recent bank statement or credit card proving funds for accommodation and safaris.",
        "is_mandatory": true
      },
      {
        "title": "KAZA UniVisa Option (if visiting Zambia)",
        "description": "Eligible for $50 KAZA UniVisa covering both Zimbabwe and Zambia plus day trips to Botswana.",
        "is_mandatory": false
      }
    ],
    "steps": [
      "Apply Online: Visit official eVisa portal (evisa.gov.zw) and choose Holiday/Tourist Visa.",
      "Upload Documents: Upload digital passport copy, photo, hotel reservation, and proof of residence in India.",
      "Await Electronic Approval: Zimbabwe Department of Immigration reviews application and issues Approval Letter within 3 to 7 working days.",
      "Print Visa Approval: Print the official approval letter to carry with your travel documents.",
      "Travel to Zimbabwe: Fly into Victoria Falls Airport (VFA) or Robert Gabriel Mugabe International Airport (HRE).",
      "Pay Fee & Border Stamping: Present approval letter at immigration desk and pay the $30-$45 statutory fee to receive your visa sticker."
    ],
    "fees": {
      "visa_fee": "$30 (Single Entry) / $45 (Double Entry) / $50 (KAZA UniVisa)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$30 - $50 (approx. ₹2,500 - ₹4,200)",
      "notes": "Payable online or upon arrival with pre-approved eVisa letter."
    },
    "proc_time": "3 to 7 Working Days",
    "proc_details": "Processed online through the Department of Immigration Zimbabwe (evisa.gov.zw).",
    "requirements": [
      {
        "category": "Visa Regime",
        "details": "India is in Category B (Eligible for online pre-approved eVisa or border visa with clearance)."
      },
      {
        "category": "KAZA UniVisa",
        "details": "Tourists visiting both Victoria Falls (Zimbabwe) and Livingstone (Zambia) should request the $50 KAZA UniVisa."
      },
      {
        "category": "Health Requirement",
        "details": "Yellow fever certificate required if travelling from yellow fever risk zones."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statement",
        "minimum_balance_or_amount": "₹75,000",
        "description": "3-month bank statement demonstrating travel solvency."
      },
      {
        "type": "Safari Itinerary Voucher",
        "minimum_balance_or_amount": "Confirmed booking",
        "description": "Tour confirmation for Victoria Falls or Hwange safari packages."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens get an eVisa for Zimbabwe?",
        "answer": "Yes! Indian passport holders can apply for a holiday visa online via the official Zimbabwe Immigration portal (evisa.gov.zw) and receive an approval letter within 3 to 7 days."
      },
      {
        "question": "What is the KAZA UniVisa?",
        "answer": "The KAZA UniVisa costs $50 and allows tourists to travel freely between Zimbabwe and Zambia for up to 30 days, including day-trips into Botswana (Chobe National Park)."
      },
      {
        "question": "Which airport should I fly into to see Victoria Falls?",
        "answer": "Fly directly into Victoria Falls International Airport (VFA), which receives regional flights from Johannesburg, Addis Ababa, and Nairobi."
      }
    ],
    "validity": "3 Months from Date of Issue",
    "stay_duration": "Up to 30 Days (Extendable at Immigration offices)",
    "entry_type": "Single Entry / Double Entry / KAZA UniVisa",
    "official_source": "Department of Immigration Zimbabwe (evisa.gov.zw) & Embassy of Zimbabwe New Delhi"
  },
  "colombia": {
    "overview": "Colombia, the vibrant gateway to South America, enchants visitors with its Caribbean beaches, colonial walled cities (Cartagena), high Andean peaks (Bogotá), lush coffee plantations (Salento), and the innovative 'City of Eternal Spring' (Medellín). Indian passport holders who hold a valid US visa (B1/B2/etc.) or Schengen visa with at least 180 days validity can enter Colombia VISA-FREE for up to 90 days. All other Indian passport holders can apply online for a Visitor Visa (Visa V Turismo) via cancilleria.gov.co.",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Cartagena's Colonial Walled City",
        "description": "UNESCO World Heritage 16th-century Spanish colonial ramparts, bougainvillea-draped balconies, and Caribbean islands."
      },
      {
        "icon": "☕",
        "title": "Coffee Cultural Landscape & Cocora Valley",
        "description": "Hike among towering 60-meter wax palm trees in Cocora Valley and tour historic coffee fincas in Salento and Armenia."
      },
      {
        "icon": "🏙️",
        "title": "Medellín & Comuna 13",
        "description": "The innovative 'City of Eternal Spring' famous for Metrocable views, Botero sculptures, and vibrant street art transformation."
      },
      {
        "icon": "🎉",
        "title": "VISA-FREE with US or Schengen Visa",
        "description": "Indian passport holders enter 100% VISA-FREE for 90 days if holding a valid US (B1/B2) or Schengen visa (min 180 days validity)."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Qualifying US or Schengen Visa (if entering visa-free)",
        "description": "Physical valid US visa or Schengen visa valid for at least 180 days from entry date for visa exemption.",
        "is_mandatory": false
      },
      {
        "title": "Check-MIG Border Registration Form",
        "description": "Mandatory online pre-travel registration (Check-Mig) completed within 72 hours before boarding flight at migracioncolombia.gov.co.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Confirmed round-trip ticket departing Colombia within 90 days of arrival.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation or Host Invitation",
        "description": "Proof of accommodation in Bogotá, Medellín, Cartagena, or host letter.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months (for Visa V applicants)",
        "description": "Demonstrating financial solvency (minimum balance equivalent to 100 times Colombian minimum daily wage, approx. ₹1,50,000).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Visa Exemption Eligibility: If you hold a valid US visa (B1/B2/etc.) or Schengen visa valid for 180+ days, you are exempt from a visa and can travel directly.",
      "Apply Online for Visa V (if not visa-exempt): Visit the official Cancillería portal (cancilleria.gov.co) and submit an online tourist visa application.",
      "Upload Required Documents: Upload passport scan, bank statements, flight itinerary, and photos.",
      "Pay Study Fee: Pay initial visa evaluation fee ($52 USD) online.",
      "Await Consular Decision: Cancillería processes application within 10 to 30 calendar days.",
      "Pay Issuance Fee: Upon approval, pay the visa issuance fee ($82 USD) online to receive your electronic e-Visa.",
      "Complete Check-Mig: Complete the mandatory Check-MIG form online within 72 hours prior to boarding your flight."
    ],
    "fees": {
      "visa_fee": "$52 (Study Fee) + $82 (Issuance Fee) = $134 USD",
      "service_fee": "FREE Entry if holding US or Schengen Visa",
      "total_fee": "$0 (Visa-free) or $134 (approx. ₹11,300 for Visa V)",
      "notes": "Zero visa cost for Indian passport holders with qualifying US/Schengen visas."
    },
    "proc_time": "Instant (Visa-Free) or 10 to 20 Business Days (Online Visa V)",
    "proc_details": "Visa-free entry at airport immigration, or 100% digital e-Visa issued by Ministry of Foreign Affairs (Cancillería).",
    "requirements": [
      {
        "category": "Visa Exemption Criteria",
        "details": "US (B1/B2) or Schengen visa must be valid for at least 180 days upon arrival in Colombia."
      },
      {
        "category": "Check-MIG Requirement",
        "details": "All inbound travellers must submit the electronic Check-MIG form before boarding."
      },
      {
        "category": "Stay Limit",
        "details": "Tourists may stay up to 90 days per visit, extendable up to a maximum of 180 calendar days per year."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months bank statements showing regular income and sufficient travel funds."
      },
      {
        "type": "Credit Card Limit",
        "minimum_balance_or_amount": "USD $1,500 equivalent",
        "description": "Credit card statement indicating available limit for travel expenses."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens travel to Colombia visa-free?",
        "answer": "YES! Under Resolution 5488, Indian passport holders who hold a valid US visa (B1/B2, etc.) or Schengen visa with at least 180 days validity can enter Colombia VISA-FREE for up to 90 days."
      },
      {
        "question": "What is the Check-MIG form for Colombia?",
        "answer": "Check-MIG is a mandatory online border control form operated by Migración Colombia. You must complete it within 72 hours before your flight departure."
      },
      {
        "question": "Can I extend my stay in Colombia as a tourist?",
        "answer": "Yes. You can extend your 90-day stay by another 90 days (up to 180 days total per calendar year) online through the Migración Colombia portal for a small fee."
      }
    ],
    "validity": "Up to 90 Days upon Entry (or up to 1 Year for Visa V)",
    "stay_duration": "Up to 90 Days (Extendable to 180 days per calendar year)",
    "entry_type": "Multiple Entry",
    "official_source": "Cancillería Colombia (cancilleria.gov.co) & Migración Colombia (migracioncolombia.gov.co)"
  },
  "peru": {
    "overview": "Peru, the heart of the ancient Inca Empire and the gastronomic capital of South America, is home to legendary Machu Picchu, the Sacred Valley, Lake Titicaca's floating islands, Rainbow Mountain, and Lima's world-renowned Michelin-starred dining. Indian passport holders who possess a valid visa or permanent residency for the United States, Canada, United Kingdom, Australia, or Schengen area (with at least 6 months validity) can enter Peru 100% VISA-FREE for up to 180 days! All other Indian citizens apply for a tourist visa through the Embassy of Peru in New Delhi.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Machu Picchu & Inca Trail",
        "description": "The mystical 15th-century Inca citadel perched dramatically among high Andean cloud forest peaks (UNESCO)."
      },
      {
        "icon": "🍽️",
        "title": "Gastronomic Capital of the Americas",
        "description": "Lima is home to world-renowned restaurants Central and Maido, celebrated for ceviche, Nikkei, and Amazonian cuisine."
      },
      {
        "icon": "🌈",
        "title": "Rainbow Mountain & Sacred Valley",
        "description": "Stunning multicolored mineral ridges of Vinicunca and ancient agricultural terraces of Moray and Ollantaytambo."
      },
      {
        "icon": "🎉",
        "title": "100% VISA-FREE with US/UK/Canada/Schengen",
        "description": "Indian passport holders enter visa-free for up to 180 days with a valid visa (min 6 months validity) from the US, UK, Canada, Australia, or Schengen."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months from entry date with at least 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Qualifying US, UK, Canada, Australia, or Schengen Visa",
        "description": "Must have minimum 6 months remaining validity from arrival date in Peru for visa exemption under Supreme Decree 069-2016-RE.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Confirmed round-trip flight ticket entering and exiting Jorge Chávez International Airport (LIM), Lima.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservations / Tour Itinerary",
        "description": "Proof of accommodation in Lima, Cusco, or Sacred Valley.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements (if applying for Consular Visa)",
        "description": "Last 3 months stamped bank statements showing minimum balance of ₹1,50,000.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Sized Photographs",
        "description": "Recent color photos (35x45mm) on a pure white background without spectacles.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Visa Exemption: If you hold a valid visa (minimum 6 months validity) from the US, UK, Canada, Australia, or Schengen area, you are 100% EXEMPT from a Peruvian visa.",
      "Book Direct Travel (if visa-exempt): Book your flights into Lima (LIM) and prepare passport and qualifying visa.",
      "Apply at Peruvian Embassy New Delhi (if not visa-exempt): Schedule an appointment and submit application form, passport, photos, and financial documents.",
      "Pay Consular Fee: Pay ₹2,700 tourist visa statutory fee at the embassy.",
      "Attend Interview / Biometrics: Consular officer conducts brief document review.",
      "Collect Passport: Retrieve stamped visa within 7 to 10 working days.",
      "Immigration Entry: Present passport at Lima airport border control to receive your TAM Virtual entry stamp (up to 180 days)."
    ],
    "fees": {
      "visa_fee": "₹2,700 (Consular Tourist Visa Fee)",
      "service_fee": "FREE Entry if holding US/UK/Canada/Schengen Visa",
      "total_fee": "₹0 (Visa-free) or ₹2,700 (Embassy Visa)",
      "notes": "No cost at all for Indian passport holders holding qualifying third-country visas."
    },
    "proc_time": "Instant (Visa-Free on Arrival) or 7 to 10 Working Days (Consular)",
    "proc_details": "Instant border entry at Lima airport for visa-exempt travellers, or consular processing in New Delhi.",
    "requirements": [
      {
        "category": "Supreme Decree Exemption",
        "details": "Indian nationals holding valid visas (min 6 months validity) for the US, Canada, UK, Australia, or Schengen enter visa-free."
      },
      {
        "category": "Stay Duration",
        "details": "Border officer typically stamps 90 to 180 days of authorized stay upon entry."
      },
      {
        "category": "TAM Virtual",
        "details": "Peru uses electronic Tarjeta Andina de Migración (TAM Virtual); keep your passport entry stamp secure."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Original 3-month bank statement stamped by bank branch."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Last 2 Assessment Years",
        "description": "ITR-V acknowledgement forms."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens visit Peru visa-free?",
        "answer": "YES! Under Supreme Decree No. 069-2016-RE, Indian passport holders holding a valid visa (minimum 6 months remaining validity) or permanent residency for the US, Canada, UK, Australia, or Schengen area can enter Peru VISA-FREE for up to 180 days."
      },
      {
        "question": "How long can I stay in Peru as a tourist?",
        "answer": "You can stay up to 180 days (either consecutive or cumulative) in a 365-day period as granted by the border immigration inspector."
      },
      {
        "question": "What is TAM Virtual in Peru?",
        "answer": "TAM Virtual (Tarjeta Andina de Migración Virtual) is an electronic entry record registered automatically by Migraciones Peru when your passport is scanned at the airport."
      }
    ],
    "validity": "Up to 180 Days upon Entry",
    "stay_duration": "Up to 180 Days",
    "entry_type": "Multiple Entry",
    "official_source": "Superintendencia Nacional de Migraciones (migraciones.gob.pe) & Embassy of Peru New Delhi"
  },
  "chile": {
    "overview": "Chile is a breathtaking ribbon of diverse extremes stretching 4,300 km along the Pacific: from the Mars-like Atacama Desert (driest on earth) in the north, through the lush Central Valley wine country and vibrant capital Santiago, to the emerald lakes, fjords, and towering granite spires of Torres del Paine in Patagonia, plus mystical Easter Island (Rapa Nui). Indian passport holders must apply online for a Tourist Visa (Visto de Turismo) via the official consular portal (serviciosconsulares.cl).",
    "highlights": [
      {
        "icon": "🏔️",
        "title": "Torres del Paine National Park",
        "description": "Legendary Patagonian spires, turquoise glacial lakes, icebergs, and world-class 'W' and 'O' trekking circuits."
      },
      {
        "icon": "🌌",
        "title": "San Pedro de Atacama & Stargazing",
        "description": "Moon Valley (Valle de la Luna), high-altitude salt flats with flamingos, El Tatio geysers, and the clearest night skies on Earth."
      },
      {
        "icon": "🗿",
        "title": "Easter Island (Rapa Nui)",
        "description": "Iconic archaeological mystery in the Pacific Ocean featuring over 900 colossal stone Moai statues (UNESCO)."
      },
      {
        "icon": "🍷",
        "title": "Santiago & Casablanca Wine Valley",
        "description": "Vibrant Andean metropolis, historic bohemian Valparaíso hills, and world-renowned Cabernet and Carménère vineyards."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Online Application Form & Digital Photo",
        "description": "Completed application on serviciosconsulares.cl with recent color photo on white background (JPG).",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Stamped bank statements proving financial solvency (minimum balance ₹1,50,000 to ₹2,00,000).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Flight Itinerary",
        "description": "Round-trip flight booking arriving into Arturo Merino Benítez International Airport (SCL), Santiago.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservations / Tour Itinerary",
        "description": "Confirmed booking for each destination in Chile or notarized host letter of invitation.",
        "is_mandatory": true
      },
      {
        "title": "Employment Letter / Income Proof",
        "description": "Official letter from employer stating position, salary, and authorized leave period, or business registration for self-employed.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Create Consular Account: Visit the official Chilean Consular Services portal (serviciosconsulares.cl) and create an online profile.",
      "Complete Visto de Turismo Form: Fill the tourist visa application and select the Embassy of Chile in New Delhi.",
      "Upload Mandatory Documents: Upload PDF scans of passport biodata, 3-month bank statements, hotel vouchers, flight itinerary, and employer letter.",
      "Await Consular Review: Chilean Ministry of Foreign Affairs (SERMIG / Consular section) reviews application within 15 to 30 calendar days.",
      "Attend Consular Appointment: Upon preliminary approval, attend the Chilean Embassy in New Delhi to submit original passport and pay visa fee.",
      "Passport Stamping & Collection: Receive your physical Chilean visa sticker stamped into your passport (or electronic e-visa as instructed)."
    ],
    "fees": {
      "visa_fee": "$50 (Single Entry) / $70 (Multiple Entry)",
      "service_fee": "Variable consular processing fee (approx. ₹1,500)",
      "total_fee": "$50 - $70 (approx. ₹4,200 - ₹5,900)",
      "notes": "Fee payable only after visa application has been approved by the consul."
    },
    "proc_time": "15 to 25 Working Days",
    "proc_details": "Applied online at serviciosconsulares.cl, followed by passport stamping at Embassy of Chile in New Delhi.",
    "requirements": [
      {
        "category": "Advance Application",
        "details": "Applications must be submitted at least 30 to 45 days prior to intended travel date."
      },
      {
        "category": "PDI Tourism Card",
        "details": "Keep the physical PDI receipt (Tarjeta Única Migratoria) given at Santiago airport immigration for hotel tax exemption and departure."
      },
      {
        "category": "Health & Customs",
        "details": "Strict SAG agricultural inspection at border—all plant and food products must be declared."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000 - ₹2,00,000",
        "description": "Original stamped bank statements for past 3 months showing stable balance."
      },
      {
        "type": "Salary Slips / Form 16",
        "minimum_balance_or_amount": "Last 3 Months",
        "description": "Salary slips and tax returns proving ongoing financial stability."
      }
    ],
    "faqs": [
      {
        "question": "How do Indian citizens apply for a Chilean tourist visa?",
        "answer": "Indian citizens must apply online through the official Chilean Consular Services portal (tramites.minrel.gov.cl / serviciosconsulares.cl). Once approved online, you submit your passport at the Chilean Embassy in New Delhi for visa stamping."
      },
      {
        "question": "Does holding a US visa exempt Indian citizens from a Chilean visa?",
        "answer": "Unlike Peru and Colombia, Chile currently requires Indian passport holders to apply for a Chilean Visto de Turismo, though holding a US visa significantly strengthens your application."
      },
      {
        "question": "What is the PDI receipt in Chile?",
        "answer": "When entering Chile, the PDI (Policía de Investigaciones) border officer hands you a small paper slip (Tarjeta Única Migratoria). Keep it inside your passport: showing it exempts tourists from Chile's 19% VAT hotel tax, and it must be surrendered upon departure."
      }
    ],
    "validity": "Up to 90 Days from Date of Entry (valid for 90 days to enter)",
    "stay_duration": "Up to 90 Days (Extendable locally at SERMIG)",
    "entry_type": "Single or Multiple Entry",
    "official_source": "Servicio Nacional de Migraciones (SERMIG) & Ministerio de Relaciones Exteriores de Chile (serviciosconsulares.cl)"
  },
  "argentina": {
    "overview": "Argentina, the passionate land of tango, gaucho traditions, and staggering natural wonders, stretches from the subtropics to Antarctica. Stand before the mighty thunder of Iguazú Falls (UNESCO Wonder of Nature); explore the grand European boulevards and bohemian tango halls of Buenos Aires; sip world-class Malbec wine against the backdrop of snow-capped Andes in Mendoza; and trek upon the colossal blue ice of Perito Moreno Glacier in Patagonia. Indian citizens holding a valid US B2 tourist visa can apply for the ultra-convenient online Electronic Travel Authorization (AVE - Autorización de Viaje Electrónica) via migraciones.gov.ar; all other applicants apply for a consular tourist visa at the Embassy of Argentina in New Delhi or Consulate in Mumbai.",
    "highlights": [
      {
        "icon": "🧊",
        "title": "Perito Moreno Glacier & Patagonia",
        "description": "The world's most accessible advancing glacier in Los Glaciares National Park; witness massive ice calvings."
      },
      {
        "icon": "🌊",
        "title": "Iguazú Falls (UNESCO Wonder)",
        "description": "275 spectacular cascading waterfalls surrounded by lush jungle, featuring the deafening Devil's Throat (Garganta del Diablo)."
      },
      {
        "icon": "💃",
        "title": "Buenos Aires & Tango Heritage",
        "description": "Grand European architecture in Recoleta and Palermo, vibrant colorful houses in La Boca, and authentic San Telmo tango milongas."
      },
      {
        "icon": "⚡",
        "title": "Instant Online AVE with US Visa",
        "description": "Indian passport holders holding a valid US B2 tourist visa can apply 100% online for the AVE travel authorization."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US B2 Tourist Visa (for online AVE applicants)",
        "description": "Valid physical US B1/B2 visa sticker valid for the duration of travel to qualify for online AVE.",
        "is_mandatory": false
      },
      {
        "title": "Approved AVE Confirmation (if using AVE)",
        "description": "Printed electronic travel authorization issued by Migraciones Argentina.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Confirmed flight itinerary entering and leaving Ministro Pistarini International Airport (EZE), Buenos Aires.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservations / Tour Booking",
        "description": "Proof of accommodation in Buenos Aires, El Calafate, Mendoza, or Iguazú.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 6 Months",
        "description": "Stamped bank account statements demonstrating personal travel funds (minimum balance ₹2,00,000).",
        "is_mandatory": true
      },
      {
        "title": "Credit Card Copies & Salary Slips",
        "description": "International credit card front copy and last 3 months salary slips or business tax returns.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check AVE Eligibility: If you hold a valid US B2 tourist visa, you can apply online for the AVE (Autorización de Viaje Electrónica) on migraciones.gov.ar.",
      "Apply for Online AVE (with US Visa): Pay $200 USD AVE statutory fee, upload complete passport scan (all pages in single PDF) and US visa, and receive electronic approval within 10 to 20 working days.",
      "Apply for Consular Visa (without US Visa): Book an appointment at the Embassy of Argentina in New Delhi or Consulate in Mumbai.",
      "Assemble Physical Dossier: Prepare passport, 6-month bank statements, ITR returns, employer NOC, hotel bookings, and flight itinerary.",
      "Attend Consular Interview: Attend in-person consular interview in New Delhi or Mumbai (consular tourist visa is GRATIS / free of charge for Indian citizens!).",
      "Collect Stamped Passport: Receive your physical stamped tourist visa sticker within 7 to 10 working days."
    ],
    "fees": {
      "visa_fee": "$200 USD (Online AVE Fee with US Visa) / GRATIS ₹0 (Consular Visa)",
      "service_fee": "₹0 (Consular Tourist Visa is completely FREE for Indian citizens)",
      "total_fee": "₹0 (Consular Visa) or $200 USD (Online AVE)",
      "notes": "Remarkably, Argentina does NOT charge any visa fee for Indian citizens applying at the embassy!"
    },
    "proc_time": "7 to 14 Working Days (Consular) or 10 to 20 Days (Online AVE)",
    "proc_details": "Applied online at migraciones.gob.ar (AVE) or in-person at Embassy of Argentina New Delhi / Consulate Mumbai.",
    "requirements": [
      {
        "category": "Free Consular Visa",
        "details": "By reciprocal agreement, standard Argentine consular tourist visas are issued GRATIS (free of charge) to Indian passport holders."
      },
      {
        "category": "AVE Full Passport Scan",
        "details": "If applying for AVE, Argentine immigration requires a single PDF scan of ALL passport pages (including blank pages)."
      },
      {
        "category": "Consular Interview",
        "details": "Consular visa applicants must appear for a mandatory in-person interview in New Delhi or Mumbai."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,00,000",
        "description": "Original stamped bank statements for past 6 months showing regular income."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 3 Financial Years",
        "description": "ITR acknowledgement forms verifying domestic earnings in India."
      }
    ],
    "faqs": [
      {
        "question": "Is the Argentine tourist visa really free for Indian citizens?",
        "answer": "YES! By virtue of a bilateral agreement between India and Argentina, the Argentine Embassy in New Delhi and Consulate in Mumbai issue tourist visas GRATIS (100% free of consular fees) to Indian citizens."
      },
      {
        "question": "What is the Argentine AVE?",
        "answer": "AVE (Autorización de Viaje Electrónica) is an online electronic travel authorization. If you hold a valid US B2 visa, you can apply online for the AVE at migraciones.gob.ar for $200 USD without visiting the embassy."
      },
      {
        "question": "How long can an Indian tourist stay in Argentina?",
        "answer": "The standard tourist visa grants a stay of up to 90 days, which can be extended for an additional 90 days at the Dirección Nacional de Migraciones in Buenos Aires."
      }
    ],
    "validity": "90 Days from Date of Entry (valid for 3 months to enter)",
    "stay_duration": "Up to 90 Days (Extendable locally)",
    "entry_type": "Multiple Entry",
    "official_source": "Dirección Nacional de Migraciones (migraciones.gob.pe) & Embassy of the Argentine Republic in New Delhi"
  },
  "costa-rica": {
    "overview": "Costa Rica is the undisputed world capital of eco-tourism, sustainability, and the joyous 'Pura Vida' (pure life) lifestyle. Nestled between the Caribbean and Pacific, Costa Rica shelters 5% of the planet's biodiversity within lush mist-shrouded cloud forests (Monteverde), active volcanic cones (Arenal Volcano), pristine surf beaches (Manuel Antonio, Tamarindo), and protected turtle nesting sanctuaries (Tortuguero). Indian passport holders holding a valid multiple-entry visa for the United States, Canada, or Schengen area (valid for minimum 1 to 3 months) can enter Costa Rica 100% VISA-FREE for up to 30 days! All other Indian passport holders apply for a Consular Visa via the Embassy of Costa Rica in New Delhi.",
    "highlights": [
      {
        "icon": "🌋",
        "title": "Arenal Volcano & Natural Hot Springs",
        "description": "Iconic symmetrical volcanic cone surrounded by geothermal mineral springs, waterfall rappelling, and hanging bridges."
      },
      {
        "icon": "🌿",
        "title": "Monteverde Cloud Forest Reserve",
        "description": "High-altitude canopy zip-lining and suspension bridges among orchids, mosses, and the resplendent Quetzal."
      },
      {
        "icon": "🐒",
        "title": "Manuel Antonio National Park",
        "description": "White-sand Pacific beaches where tropical rainforests meet the ocean, teeming with wild sloths, monkeys, and toucans."
      },
      {
        "icon": "🎉",
        "title": "100% VISA-FREE with US/Canada/Schengen Visa",
        "description": "Indian citizens holding a valid multi-entry US (B1/B2/etc.), Canada, or Schengen visa enter 100% visa-free for up to 30 days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Qualifying US, Canada, or Schengen Visa (for Visa Exemption)",
        "description": "Multiple-entry visa for the US (B1/B2/etc.), Canada, or Schengen area with minimum 1 to 3 months remaining validity upon arrival for visa waiver.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return or Onward Air Ticket",
        "description": "Confirmed flight booking departing Costa Rica within 30 days of arrival (strictly verified by airlines before boarding).",
        "is_mandatory": true
      },
      {
        "title": "Proof of Economic Solvency",
        "description": "Minimum $100 USD in cash or international credit card per month of stay.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservations / Tour Itinerary",
        "description": "Proof of accommodation across San José, Arenal, Monteverde, or Guanacaste.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate (if coming from endemic zone)",
        "description": "Required if arriving from countries in South America or sub-Saharan Africa with yellow fever risk.",
        "is_mandatory": false
      }
    ],
    "steps": [
      "Check Visa Waiver: If you hold a valid multi-entry US, Canada, or Schengen visa, you are EXEMPT from a Costa Rican visa and can travel immediately.",
      "Prepare Direct Travel (if visa-exempt): Ensure passport is valid for 6 months, book round-trip flights into Juan Santamaría Airport (SJO) or Guanacaste Airport (LIR), and carry proof of accommodation.",
      "Apply for Consular Visa (if not visa-exempt): Contact the Embassy of Costa Rica in New Delhi and schedule a visa appointment.",
      "Assemble Required Documents: Prepare passport, 3-month stamped bank statements, employer NOC, round-trip flight booking, and police clearance certificate.",
      "Pay Consular Fee: Pay the $52 USD statutory visa fee at the embassy.",
      "Attend Interview: Consular officer reviews documents and conducts brief interview.",
      "Receive Visa Stamping: Stamped visa sticker is collected within 10 to 15 working days.",
      "Border Entry: Present passport at Costa Rican airport immigration to receive your 30-day entry stamp."
    ],
    "fees": {
      "visa_fee": "$52 USD (Consular Visa Fee)",
      "service_fee": "FREE Entry if holding US/Canada/Schengen Visa",
      "total_fee": "$0 (Visa-free) or $52 USD (approx. ₹4,400 Consular)",
      "notes": "Zero visa cost for Indian passport holders with qualifying US/Canada/Schengen visas."
    },
    "proc_time": "Instant (Visa-Free on Arrival) or 10 to 15 Business Days (Consular)",
    "proc_details": "Direct entry at airport border control for visa-exempt travellers, or consular processing in New Delhi.",
    "requirements": [
      {
        "category": "Visa Exemption Terms",
        "details": "US (B1/B2), Canada, or Schengen multi-entry visa must have minimum 1 to 3 months validity remaining upon entry into Costa Rica."
      },
      {
        "category": "Strict Departure Ticket",
        "details": "Airlines and border control strictly enforce proof of outward travel from Costa Rica within 30 days."
      },
      {
        "category": "Yellow Fever",
        "details": "Mandatory yellow fever card if arriving from endemic South American nations (e.g., Colombia, Peru, Brazil)."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Original 3-month bank statement stamped by bank branch."
      },
      {
        "type": "International Credit Card",
        "minimum_balance_or_amount": "Available limit",
        "description": "Proof of international card with sufficient credit limit for travel."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders enter Costa Rica visa-free?",
        "answer": "YES! Under Costa Rican immigration regulations (Grupo Tercero), Indian citizens holding a valid multiple-entry visa for the United States (B1/B2, etc.), Canada, or Schengen area can enter Costa Rica VISA-FREE for up to 30 days."
      },
      {
        "question": "Can I extend my 30-day tourist stay in Costa Rica?",
        "answer": "Yes. You can extend your tourist stay locally up to a total of 90 days at the Dirección General de Migración y Extranjería (DGME) in San José, or via a short cross-border trip."
      },
      {
        "question": "Which airport is best to fly into for Costa Rica?",
        "answer": "Fly into Juan Santamaría International Airport (SJO) in San José for central and Caribbean destinations, or Guanacaste Airport (LIR) in Liberia for Pacific surf beaches."
      }
    ],
    "validity": "30 Days upon Entry (Extendable to 90 days)",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry (Multiple upon authorized consular request)",
    "official_source": "Dirección General de Migración y Extranjería (migracion.go.cr) & Embassy of Costa Rica in New Delhi"
  },
  "romania": {
    "overview": "Romania, nestled in Eastern Europe, mesmerizes visitors with fairy-tale Transylvanian castles (Bran 'Dracula' Castle, Peleș Castle), medieval fortified Saxon towns (Brașov, Sibiu, Sighișoara), the wild Carpathian Mountains, and the stunning Danube Delta (UNESCO). As of March 31, 2024, Romania is a member of the Schengen Area (air and maritime borders). Indian passport holders can enter with an approved Uniform Schengen Visa (Type C) issued by Romania or any Schengen member state, or apply online via the Romanian Ministry of Foreign Affairs eVisa portal (evisa.mae.ro).",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Bran Castle & Peleș Royal Castle",
        "description": "The dramatic Gothic castle perched on a Transylvanian cliff associated with Dracula legends, and Neo-Renaissance royal Peleș Castle in Sinaia."
      },
      {
        "icon": "🏘️",
        "title": "Brașov, Sibiu & Sighișoara",
        "description": "UNESCO medieval citadel of Sighișoara (birthplace of Vlad the Impaler), charming cobblestone plazas, and medieval watchtowers."
      },
      {
        "icon": "🛣️",
        "title": "Transfăgărășan Alpine Highway",
        "description": "One of the world's most spectacular scenic high-altitude mountain drives winding through the rugged Făgăraș Mountains."
      },
      {
        "icon": "🇪🇺",
        "title": "Official Schengen Member (from 2024)",
        "description": "Romania now issues Schengen Type C visas, granting access across Romania and the entire 29-nation European Schengen Zone."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Issued within the last 10 years, valid for at least 3 months after intended departure from the Schengen area, with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Uniform Schengen Visa Application Form",
        "description": "Fully completed and signed application form submitted online via evisa.mae.ro.",
        "is_mandatory": true
      },
      {
        "title": "Two Recent Passport Photographs",
        "description": "ICAO-standard color photographs (35x45mm) on light background taken within the last 6 months.",
        "is_mandatory": true
      },
      {
        "title": "Schengen Travel Medical Insurance",
        "description": "Coverage of minimum €30,000 for emergency medical care and repatriation across all Schengen states.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Accommodation & Flight Reservations",
        "description": "Confirmed hotel bookings throughout Romania and verified round-trip flight reservations.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Bank statements for the last 3 months demonstrating at least €50/day of stay (minimum €500 total).",
        "is_mandatory": true
      },
      {
        "title": "Employment / Socio-Professional Proof",
        "description": "Employer leave letter, salary slips for last 3 months, and ITR-V forms for past 2 years.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Complete eVisa Application: Fill the Schengen visa application on the Romanian MFA portal (evisa.mae.ro).",
      "Upload Supporting Documents: Upload scans of passport, photo, hotel bookings, flight itinerary, insurance, and bank statements.",
      "Consular Validation: Romanian consular authorities validate the online dossier and issue an appointment date.",
      "Attend Consular Appointment: Submit original passport, biometric fingerprints, and hard-copy documents at the Embassy of Romania in New Delhi.",
      "Pay Schengen Visa Fee: Pay the statutory €90 Schengen visa fee.",
      "Collect Passport: Retrieve passport with Schengen visa sticker within 15 to 45 calendar days."
    ],
    "fees": {
      "visa_fee": "€90 (Standard Schengen Type C Visa Fee)",
      "service_fee": "₹1,500 - ₹2,000 (Consular logistics / VAC)",
      "total_fee": "€90 (approx. ₹8,100 + logistics)",
      "notes": "Official EU statutory Schengen visa fee updated in 2024."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Applied online via evisa.mae.ro and finalized at the Embassy of Romania in New Delhi.",
    "requirements": [
      {
        "category": "Schengen Regulations",
        "details": "Subject to the standard Schengen 90/180-day rule across the European Schengen area."
      },
      {
        "category": "Travel Insurance",
        "details": "Mandatory €30,000 emergency medical and hospitalization insurance valid in all Schengen countries."
      },
      {
        "category": "Financial Requirement",
        "details": "Demonstrated minimum €50 per day of stay in Romania."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,50,000",
        "description": "Original stamped bank statements for the past 3 months."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 2 Years",
        "description": "ITR acknowledgement forms proving steady personal income in India."
      }
    ],
    "faqs": [
      {
        "question": "Is Romania part of the Schengen Area?",
        "answer": "Yes! On March 31, 2024, Romania officially joined the Schengen Area for air and maritime borders. Romanian diplomatic missions now issue standard Uniform Schengen Visas (Type C)."
      },
      {
        "question": "Can I travel to other European countries with a Romanian tourist visa?",
        "answer": "Yes. A Uniform Schengen Visa (Type C) issued by Romania allows travel across all 29 Schengen member states (France, Germany, Italy, Switzerland, etc.) within the 90/180-day limit."
      },
      {
        "question": "What is the evisa.mae.ro portal?",
        "answer": "It is the official electronic visa portal operated by the Ministry of Foreign Affairs of Romania where all visa applicants must pre-register their applications before visiting the embassy."
      }
    ],
    "validity": "Up to 90 Days within a 180-Day Period",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single or Multiple Entry Schengen Visa",
    "official_source": "Ministry of Foreign Affairs of Romania (evisa.mae.ro) & Embassy of Romania New Delhi"
  },
  "bulgaria": {
    "overview": "Bulgaria, one of Europe's oldest nations, is celebrated for its golden Black Sea beaches (Varna, Sunny Beach), snow-capped ski resorts (Bansko, Borovets), UNESCO heritage sites like the 10th-century Rila Monastery, the ancient Thracian tombs, and Europe's oldest continuously inhabited city (Plovdiv). As of March 31, 2024, Bulgaria is officially a member of the Schengen Area (air and maritime borders). Indian passport holders can enter using a Uniform Schengen Visa (Type C) issued by Bulgaria or any Schengen state, or apply through VFS Global / Embassy of Bulgaria in New Delhi.",
    "highlights": [
      {
        "icon": "⛪",
        "title": "Rila Monastery (UNESCO)",
        "description": "The monumental 10th-century Eastern Orthodox monastery nestled in the Rila Mountains, renowned for colorful frescoes and wooden balconies."
      },
      {
        "icon": "🏛️",
        "title": "Plovdiv Old Town & Roman Theatre",
        "description": "Europe's oldest continuously inhabited city, boasting remarkably preserved 2nd-century Roman amphitheatre and 19th-century Bulgarian National Revival mansions."
      },
      {
        "icon": "🏖️",
        "title": "Black Sea Coast & Nessebar",
        "description": "Golden sandy beaches and the ancient UNESCO island citadel of Nessebar with Byzantine churches."
      },
      {
        "icon": "🇪🇺",
        "title": "Official Schengen Zone Member (from 2024)",
        "description": "Bulgaria now issues Schengen Type C visas, granting access across Bulgaria and all 29 European Schengen member states."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months beyond departure date from the Schengen area with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Harmonized Schengen Visa Application Form",
        "description": "Completed and signed application form submitted via VFS Global or consular portal.",
        "is_mandatory": true
      },
      {
        "title": "Two Color Passport Photographs",
        "description": "Recent photos (35x45mm) on light background compliant with ICAO biometric standards.",
        "is_mandatory": true
      },
      {
        "title": "Schengen Travel Medical Insurance",
        "description": "Coverage of minimum €30,000 covering emergency medical expenses across all Schengen countries.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Accommodation & Flight Itinerary",
        "description": "Confirmed hotel bookings throughout Bulgaria and round-trip flight reservations.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Solvency",
        "description": "Bank statements for the past 3 months showing minimum €50/day (minimum €500 total).",
        "is_mandatory": true
      },
      {
        "title": "Employment / Income Proof",
        "description": "Employer leave letter, last 3 months pay slips, and ITR-V forms for past 2 years.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Download & Complete Schengen Visa Form: Complete the standard Schengen application form for Bulgaria.",
      "Gather Supporting Documents: Assemble passport, travel medical insurance (€30,000), hotel bookings, flight itinerary, and bank statements.",
      "Book VFS Global Appointment: Schedule a biometric submission appointment at your nearest VFS Bulgaria visa application center.",
      "Submit Biometrics & Dossier: Attend appointment to submit fingerprints, facial photograph, and hard-copy documents.",
      "Pay Statutory Schengen Fee: Pay €90 consular fee plus VFS logistics fee.",
      "Track & Collect Passport: Receive passport with Schengen visa sticker within 15 to 30 calendar days."
    ],
    "fees": {
      "visa_fee": "€90 (Standard Schengen Type C Visa)",
      "service_fee": "₹1,800 - ₹2,400 (VFS Global Service Fee)",
      "total_fee": "€90 (approx. ₹8,100 + VFS fee)",
      "notes": "Standardized EU Schengen fee updated in 2024."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Submitted via VFS Global Visa Application Centres across India and evaluated by the Embassy of the Republic of Bulgaria in New Delhi.",
    "requirements": [
      {
        "category": "Schengen Status",
        "details": "Uniform Schengen visa grants travel access to Bulgaria and the entire 29-nation Schengen Zone."
      },
      {
        "category": "90/180 Rule",
        "details": "Maximum stay of 90 days in any 180-day rolling period across the Schengen area."
      },
      {
        "category": "Travel Insurance",
        "details": "Mandatory €30,000 coverage valid across all Schengen states."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,50,000",
        "description": "Original stamped bank statements for the past 3 months."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 2 Financial Years",
        "description": "ITR-V acknowledgement forms demonstrating verifiable income in India."
      }
    ],
    "faqs": [
      {
        "question": "Is Bulgaria in the Schengen Area?",
        "answer": "Yes! As of March 31, 2024, Bulgaria joined the Schengen Area for air and maritime borders. Bulgarian consulates now issue standard Uniform Schengen Visas (Type C)."
      },
      {
        "question": "Can I visit other Schengen countries on a Bulgarian tourist visa?",
        "answer": "Yes. A Uniform Schengen Visa issued by Bulgaria is valid for travel across all 29 Schengen member states (e.g., France, Italy, Greece, Austria) within the 90/180-day limit."
      },
      {
        "question": "Where do I apply for a Bulgarian visa in India?",
        "answer": "Applications are submitted through VFS Global visa application centres in New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, and other major Indian cities."
      }
    ],
    "validity": "Up to 90 Days within a 180-Day Period",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single or Multiple Entry Schengen Visa",
    "official_source": "Ministry of Foreign Affairs of the Republic of Bulgaria (mfa.bg) & VFS Global"
  },
  "croatia": {
    "overview": "Croatia, the crown jewel of the Adriatic, enchants travellers with over 1,000 sun-drenched islands (Hvar, Korčula), the medieval walled fortress of Dubrovnik ('King's Landing' in Game of Thrones), the cascading emerald travertine lakes of Plitvice Lakes National Park (UNESCO), and the Roman Diocletian's Palace in Split. Croatia is a full member of the European Union, Eurozone (€), and the Schengen Area (since January 1, 2023). Indian passport holders require a Uniform Schengen Visa (Type C), applied through VFS Global in India or the Embassy of the Republic of Croatia in New Delhi.",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Dubrovnik Old City Walls (UNESCO)",
        "description": "Walk atop the monumental 16th-century medieval maritime ramparts overlooking the sparkling sapphire Adriatic Sea."
      },
      {
        "icon": "🌊",
        "title": "Plitvice Lakes National Park",
        "description": "16 cascading terraced turquoise lakes interconnected by dramatic waterfalls and wooden boardwalks through lush beech forests."
      },
      {
        "icon": "🏛️",
        "title": "Split & Diocletian's Palace",
        "description": "The monumental 4th-century Roman Emperor's palace living complex, bustling seaside Riva promenade, and islands."
      },
      {
        "icon": "🇪🇺",
        "title": "Full Schengen & Eurozone Member",
        "description": "Croatia uses the Euro (€) and is fully integrated into the border-free Schengen Area with standard Schengen visas."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Issued within the last 10 years, valid for at least 3 months after departure from Schengen territory, with at least 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Harmonized Schengen Visa Application Form",
        "description": "Completed online via the Croatian MFA portal (crovisa.mvep.hr) and signed.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Size Photographs",
        "description": "Color photos (35x45mm) on light background compliant with ICAO biometric standards.",
        "is_mandatory": true
      },
      {
        "title": "Schengen Travel Medical Insurance",
        "description": "Minimum coverage of €30,000 for emergency medical treatment and repatriation across all Schengen states.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Flight Itinerary",
        "description": "Round-trip flight booking arriving into Zagreb (ZAG), Dubrovnik (DBV), or Split (SPU).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservations / Accommodation Proof",
        "description": "Confirmed booking across Croatian destinations or registered host voucher.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Original stamped statements showing minimum €70/day of stay (or €30/day if accommodation is prepaid).",
        "is_mandatory": true
      },
      {
        "title": "Employment / Income Documents",
        "description": "Employer leave letter, last 3 months salary slips, and ITR-V acknowledgement forms for past 2 years.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Complete Online Crovisa Application: Fill the visa form on the official Croatian MFA portal (crovisa.mvep.hr).",
      "Print Completed Application: Print the generated summary with barcode and sign it.",
      "Gather Supporting Documents: Secure passport, travel insurance (€30,000), hotel bookings, flight itinerary, and bank statements.",
      "Book Appointment at VFS Global: Schedule appointment at your nearest VFS Global Croatian Visa Application Centre in India.",
      "Submit Biometrics & Application: Attend appointment to provide fingerprint scans, facial photo, and physical dossier.",
      "Pay Statutory Schengen Fee: Pay €90 consular fee plus VFS logistics fee.",
      "Receive Stamped Passport: Retrieve passport with Uniform Schengen Visa sticker within 15 to 30 calendar days."
    ],
    "fees": {
      "visa_fee": "€90 (Uniform Schengen Type C Visa)",
      "service_fee": "₹2,200 (VFS Global Service Fee)",
      "total_fee": "€90 (approx. ₹8,100 + VFS fee)",
      "notes": "Official EU Schengen fee updated in 2024; currency in Croatia is Euro (€)."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Applied via VFS Global in New Delhi, Mumbai, etc., and adjudicated by the Embassy of Croatia in New Delhi.",
    "requirements": [
      {
        "category": "Schengen Regulations",
        "details": "Subject to standard 90/180-day rule across the European Schengen area."
      },
      {
        "category": "Euro Currency",
        "details": "Croatia adopted the Euro (€) on January 1, 2023; kuna is no longer in circulation."
      },
      {
        "category": "Travel Insurance",
        "details": "Mandatory €30,000 emergency medical insurance valid in all Schengen member states."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,50,000",
        "description": "Original stamped bank statements for the past 3 months."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 2 Financial Years",
        "description": "ITR-V forms demonstrating verifiable earnings in India."
      }
    ],
    "faqs": [
      {
        "question": "Is Croatia part of the Schengen Area?",
        "answer": "Yes! Croatia officially joined the Schengen Area on January 1, 2023. Croatian diplomatic missions now issue standard Uniform Schengen Visas (Type C)."
      },
      {
        "question": "Can I visit other European countries with a Croatian visa?",
        "answer": "Yes! A Uniform Schengen Visa issued by Croatia allows unrestricted travel across all 29 Schengen countries (France, Italy, Germany, Austria, Switzerland, etc.) within the 90/180-day limit."
      },
      {
        "question": "What currency is used in Croatia?",
        "answer": "Croatia adopted the Euro (€) as its official currency on January 1, 2023, replacing the Croatian kuna."
      }
    ],
    "validity": "Up to 90 Days within a 180-Day Period",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single or Multiple Entry Schengen Visa",
    "official_source": "Ministry of Foreign and European Affairs of Croatia (crovisa.mvep.hr) & VFS Global"
  },
  "slovenia": {
    "overview": "Slovenia, Europe's green boutique jewel tucked between the Alps and the Mediterranean, enchants visitors with emerald alpine lakes (Lake Bled with its fairy-tale island church, Lake Bohinj), the subterranean wonderland of Postojna Cave and cliff-hanging Predjama Castle, the charming baroque and dragon bridges of Ljubljana, and the coastal Venetian town of Piran. Slovenia is a founding Central European member of the European Union, Eurozone (€), and Schengen Area (since 2007). Indian passport holders require a Uniform Schengen Visa (Type C), applied via VFS Global / Embassy of Slovenia in New Delhi.",
    "highlights": [
      {
        "icon": "⛵",
        "title": "Lake Bled & Island Church",
        "description": "Fairy-tale alpine lake surrounded by Julian Alps; row traditional pletna boats to the island church and ring the wishing bell."
      },
      {
        "icon": "🏰",
        "title": "Postojna Cave & Predjama Castle",
        "description": "Take an underground electric train through vast stalactite caverns and visit the world's largest cave castle built into a 123-meter cliff."
      },
      {
        "icon": "🐉",
        "title": "Ljubljana & Dragon Bridge",
        "description": "One of Europe's greenest and most walkable capitals, designed by master architect Jože Plečnik (UNESCO)."
      },
      {
        "icon": "🏔️",
        "title": "Soča River Valley & Triglav National Park",
        "description": "Vibrant emerald-turquoise alpine river famous for white-water rafting, fly fishing, and hiking among pristine Julian Alps peaks."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Issued within the last 10 years, valid for at least 3 months after departure from the Schengen area, with at least 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Uniform Schengen Visa Application Form",
        "description": "Completed and signed application form submitted via VFS Global.",
        "is_mandatory": true
      },
      {
        "title": "Two Color Passport Photographs",
        "description": "Recent photos (35x45mm) on light background compliant with ICAO biometric standards.",
        "is_mandatory": true
      },
      {
        "title": "Schengen Travel Medical Insurance",
        "description": "Minimum coverage of €30,000 for emergency medical treatment and repatriation across all Schengen states.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Itinerary",
        "description": "Flight booking entering and leaving Ljubljana Jože Pučnik Airport (LJU) or nearby regional hubs (Venice, Vienna).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservations / Accommodation Proof",
        "description": "Confirmed booking across Slovenian destinations or registered host voucher.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Original stamped statements showing minimum €70/day of stay (or €35/day if accommodation is prepaid).",
        "is_mandatory": true
      },
      {
        "title": "Employment & Tax Documents",
        "description": "Employer leave NOC letter, last 3 months salary slips, and ITR-V acknowledgement forms for past 2 years.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Download & Complete Schengen Visa Form: Complete the harmonized Schengen visa form for Slovenia.",
      "Assemble Mandatory Documents: Prepare passport, €30,000 Schengen insurance, hotel vouchers, flight itinerary, and bank statements.",
      "Book Appointment at VFS Global: Schedule an appointment at the nearest VFS Global Slovenia Visa Application Centre in India.",
      "Submit Biometrics & Application: Attend appointment to provide digital fingerprints, photograph, and submit physical file.",
      "Pay Statutory Schengen Fee: Pay €90 consular fee plus VFS logistics fee.",
      "Collect Passport: Retrieve passport with Uniform Schengen Visa sticker within 15 to 30 calendar days."
    ],
    "fees": {
      "visa_fee": "€90 (Uniform Schengen Type C Visa)",
      "service_fee": "₹2,000 - ₹2,500 (VFS Global Service Fee)",
      "total_fee": "€90 (approx. ₹8,100 + VFS fee)",
      "notes": "Official EU Schengen fee; currency in Slovenia is Euro (€)."
    },
    "proc_time": "15 to 30 Calendar Days",
    "proc_details": "Applied via VFS Global and adjudicated by the Embassy of the Republic of Slovenia in New Delhi.",
    "requirements": [
      {
        "category": "Schengen Regulations",
        "details": "Subject to standard 90/180-day rule across the European Schengen area."
      },
      {
        "category": "Green Capital",
        "details": "Ljubljana is recognized as the European Green Capital with pedestrianized historic center."
      },
      {
        "category": "Travel Insurance",
        "details": "Mandatory €30,000 emergency medical insurance valid in all Schengen member states."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,50,000",
        "description": "Original stamped bank statements for the past 3 months."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 2 Financial Years",
        "description": "ITR-V acknowledgement forms demonstrating regular personal income in India."
      }
    ],
    "faqs": [
      {
        "question": "Is Slovenia part of the Schengen Area?",
        "answer": "Yes! Slovenia has been a full member of the European Schengen Area since 2007. Slovenian diplomatic missions issue standard Uniform Schengen Visas (Type C)."
      },
      {
        "question": "Can I visit Italy or Austria on a Slovenian tourist visa?",
        "answer": "Yes! Slovenia borders Italy, Austria, Hungary, and Croatia. A Uniform Schengen Visa issued by Slovenia allows unrestricted travel across all 29 Schengen countries within the 90/180-day limit."
      },
      {
        "question": "What currency is used in Slovenia?",
        "answer": "Slovenia uses the Euro (€) as its official currency."
      }
    ],
    "validity": "Up to 90 Days within a 180-Day Period",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single or Multiple Entry Schengen Visa",
    "official_source": "Ministry of Foreign and European Affairs of Slovenia & Embassy of the Republic of Slovenia New Delhi"
  },
  "cyprus": {
    "overview": "Cyprus, the legendary Mediterranean island of Aphrodite, enchants travellers with over 300 days of annual sunshine, golden sandy beaches (Nissi Beach, Fig Tree Bay), dramatic sea caves in Cape Greco, UNESCO Byzantine painted churches in the Troodos Mountains, the ancient Greco-Roman amphitheatre of Kourion, and the historic divided capital of Nicosia. Cyprus is a full member of the European Union. Indian passport holders holding a valid double- or multiple-entry Schengen visa (Type C) can enter Cyprus 100% VISA-FREE for up to 90 days! All other Indian citizens apply for a national tourist visa through Cyprus Visa Application Centres (VFS Global) or the High Commission of the Republic of Cyprus in New Delhi.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Ayia Napa & Cape Greco Sea Caves",
        "description": "Crystal-clear turquoise waters at Blue Lagoon, sea caves, and golden sands of Nissi Beach and Konnos Bay."
      },
      {
        "icon": "🏛️",
        "title": "Kourion Amphitheatre & Paphos Archaeological Park",
        "description": "Spectacular cliffside Greco-Roman theatre overlooking the Mediterranean and Roman mosaic villas (UNESCO)."
      },
      {
        "icon": "⛰️",
        "title": "Troodos Mountains & Painted Churches",
        "description": "Pine-scented mountain peaks, Kykkos Monastery, and 10 UNESCO World Heritage Byzantine painted churches."
      },
      {
        "icon": "🎉",
        "title": "VISA-FREE with Multi-Entry Schengen Visa",
        "description": "Indian passport holders holding a valid double- or multiple-entry Schengen visa (Type C) enter Cyprus 100% visa-free for up to 90 days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months beyond intended departure date from Cyprus with minimum 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid Double/Multi-Entry Schengen Visa (if entering visa-free)",
        "description": "Valid multi-entry Schengen Visa (Type C) allows 100% visa-free entry to Cyprus for up to 90 days without a separate Cypriot visa.",
        "is_mandatory": false
      },
      {
        "title": "Cyprus Visa Application Form",
        "description": "Completed and signed application form submitted via VFS Global or High Commission.",
        "is_mandatory": true
      },
      {
        "title": "Two Color Passport Photographs",
        "description": "Recent photos (35x45mm) on plain white background compliant with ICAO biometric standards.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Emergency medical and hospitalization coverage of minimum €30,000 valid in Cyprus.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Itinerary",
        "description": "Flight booking arriving into Larnaca International Airport (LCA) or Paphos International Airport (PFO).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Proof of Accommodation",
        "description": "Confirmed booking in Ayia Napa, Limassol, Larnaca, or Paphos, or notarized Assumption of Responsibility from a host.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Original stamped bank statements demonstrating financial solvency (minimum balance ₹1,50,000 to ₹2,00,000).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Schengen Visa Waiver: If you hold a valid double- or multiple-entry Schengen visa (Type C), you are 100% EXEMPT from a Cypriot visa and can travel directly.",
      "Prepare Direct Travel (if visa-exempt): Book flights into Larnaca (LCA) or Paphos (PFO), ensure passport is valid, and carry proof of accommodation.",
      "Apply via VFS Global (if not visa-exempt): Download and complete the official Cyprus visa application form.",
      "Assemble Physical Dossier: Prepare passport, 3-month stamped bank statements, travel medical insurance (€30,000), flight itinerary, and hotel booking.",
      "Submit at VFS Global: Attend your appointment at VFS Global in New Delhi, Mumbai, Bengaluru, etc., to submit documents.",
      "Pay Statutory Visa Fee: Pay €80 consular fee plus VFS logistics fee.",
      "Collect Passport: Retrieve passport with stamped Cyprus tourist visa sticker within 7 to 15 working days."
    ],
    "fees": {
      "visa_fee": "€80 (National Tourist Visa Fee)",
      "service_fee": "FREE Entry if holding Multi-Entry Schengen Visa (or approx. ₹1,800 VFS fee)",
      "total_fee": "€0 (Visa-free with Schengen) or €80 (approx. ₹7,200 Consular)",
      "notes": "Zero visa cost for Indian passport holders holding qualifying multi-entry Schengen visas."
    },
    "proc_time": "Instant (Visa-Free on Arrival with Schengen) or 7 to 12 Working Days (VFS)",
    "proc_details": "Instant border entry for multi-entry Schengen visa holders, or processed via VFS Global and Cyprus High Commission New Delhi.",
    "requirements": [
      {
        "category": "Schengen Exemption",
        "details": "Holders of valid double- or multiple-entry Schengen visas can enter Cyprus without a national visa."
      },
      {
        "category": "Legal Ports of Entry",
        "details": "Travel must enter exclusively through legal ports: Larnaca (LCA) and Paphos (PFO) airports, or Limassol/Larnaca seaports."
      },
      {
        "category": "Northern Cyprus Caution",
        "details": "Entering Cyprus via northern airports (Ercan) is considered an illegal entry by the Republic of Cyprus."
      },
      {
        "category": "Stay Duration",
        "details": "Tourists may stay up to 90 days in any 180-day period."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000 - ₹2,00,000",
        "description": "Original stamped bank statements for the past 3 months."
      },
      {
        "type": "Income Tax Returns",
        "minimum_balance_or_amount": "Past 2 Years",
        "description": "ITR acknowledgement forms demonstrating steady income in India."
      }
    ],
    "faqs": [
      {
        "question": "Can I visit Cyprus with a Schengen visa?",
        "answer": "YES! Under Cypriot immigration law, third-country nationals (including Indian citizens) holding a valid double- or multiple-entry Schengen visa (Type C) can enter the Republic of Cyprus VISA-FREE for up to 90 days in a 180-day period."
      },
      {
        "question": "Is Cyprus in the Schengen Area?",
        "answer": "Cyprus is a full European Union member state but is not yet a full member of the Schengen border-free zone. However, it unilaterally recognizes valid Schengen visas for visa-free tourist entry."
      },
      {
        "question": "Which airports are legal to fly into in Cyprus?",
        "answer": "The only legal ports of entry into the Republic of Cyprus are Larnaca International Airport (LCA) and Paphos International Airport (PFO). Flying into Ercan (ECN) in northern Cyprus is deemed illegal by the Republic of Cyprus."
      }
    ],
    "validity": "Up to 90 Days within a 180-Day Period (or up to 1-3 Years for Multi-Entry)",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single or Multiple Entry",
    "official_source": "Civil Registry and Migration Department (CRMD - mip.gov.cy) & High Commission of Cyprus in New Delhi"
  }
,
  "serbia": {
    "overview": "Serbia offers visa-free entry for Indian passport holders for up to 30 days. Explore Belgrade, Novi Sad, Niš, and the stunning Danube River. Rich history, vibrant nightlife, and beautiful architecture. No prior visa required.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Historic Belgrade",
        "description": "Belgrade Fortress, Kalemegdan Park, and vibrant nightlife."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free Entry",
        "description": "Indian citizens enjoy 30-day visa-free entry to Serbia."
      },
      {
        "icon": "🌊",
        "title": "Danube River",
        "description": "Beautiful river views and historic towns along the Danube."
      },
      {
        "icon": "🍷",
        "title": "Wine & Cuisine",
        "description": "Serbian cuisine and local wines — rakija, ćevapi, and more."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation departing within 30 days.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Belgrade, Novi Sad, or other Serbian cities.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay covering emergency medical expenses.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Serbia Itinerary — Research Belgrade, Novi Sad, and other destinations.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 4: Board Flight to Serbia — No prior visa required (30 days visa-free).",
      "Step 5: Clear Immigration — Present passport and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy visa-free entry for up to 30 days."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Direct entry stamp granted at Belgrade Nikola Tesla Airport (BEG) or land borders.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa-Free Entry",
        "details": "Indian citizens enjoy 30-day visa-free entry."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Registration",
        "details": "Mandatory white card police registration (Beli karton) within 24 hours (handled automatically by registered hotels)."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "€50 per day of stay",
        "description": "Cash or international card to show sufficient maintenance."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Serbia?",
        "answer": "No, Indian passport holders enjoy visa-free entry for up to 30 days within any 1-year period."
      },
      {
        "question": "How long can I stay in Serbia?",
        "answer": "Up to 30 days visa-free. Extensions must be requested from the Ministry of Interior in Belgrade."
      },
      {
        "question": "Is Serbia part of Schengen?",
        "answer": "No, Serbia is not part of the Schengen zone, so stays do not count against your 90/180-day Schengen limit."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of the Republic of Serbia (mfa.gov.rs)"
  },
  "montenegro": {
    "overview": "Montenegro offers visa-free entry for Indian passport holders for up to 30 days. Explore the Bay of Kotor, Budva, Durmitor National Park, and the Adriatic coast. Stunning natural beauty with mountains meeting the sea.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Adriatic Coast",
        "description": "Beautiful beaches and crystal-clear waters on the Adriatic."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free Entry",
        "description": "Indian citizens enjoy 30-day visa-free entry to Montenegro."
      },
      {
        "icon": "🏔️",
        "title": "Durmitor National Park",
        "description": "Stunning mountains, canyons, and glacial lakes."
      },
      {
        "icon": "🏛️",
        "title": "Bay of Kotor",
        "description": "UNESCO World Heritage site with medieval towns."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Montenegro.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Montenegro Itinerary — Research Kotor, Budva, and other destinations.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 4: Board Flight to Montenegro — No prior visa required (30 days visa-free).",
      "Step 5: Clear Immigration — Present passport and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy visa-free entry for up to 30 days."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted upon arrival at Podgorica Airport (TGD) or Tivat Airport (TIV).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa-Free Entry",
        "details": "Indian citizens enjoy 30-day visa-free entry."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Registration",
        "details": "Mandatory tourist registration with local Tourist Organisation within 24 hours (handled by hotel)."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Proof of sufficient funds for stay."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Montenegro?",
        "answer": "No, Indian passport holders enjoy visa-free entry for up to 30 days."
      },
      {
        "question": "How long can I stay in Montenegro?",
        "answer": "Up to 30 days visa-free."
      },
      {
        "question": "Is Montenegro part of Schengen?",
        "answer": "No, Montenegro is not part of the Schengen zone (though it uses the Euro as its de facto currency)."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of Montenegro (gov.me/mvp)"
  },
  "albania": {
    "overview": "Albania offers visa-free entry for Indian passport holders for up to 90 days. Explore Tirana, Berat, Sarandë, and the Albanian Riviera. Beautiful beaches, ancient ruins, and rich cultural heritage.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Albanian Riviera",
        "description": "Beautiful beaches and crystal-clear waters on the Ionian coast."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free Entry",
        "description": "Indian citizens enjoy 90-day visa-free entry to Albania."
      },
      {
        "icon": "🏛️",
        "title": "UNESCO Sites",
        "description": "Berat and Gjirokastër — UNESCO World Heritage sites."
      },
      {
        "icon": "🏔️",
        "title": "Accursed Mountains",
        "description": "Stunning mountain scenery in northern Albania."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Albania.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Albania Itinerary — Research Tirana, Berat, Sarandë, and other destinations.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 4: Board Flight to Albania — No prior visa required (90 days visa-free).",
      "Step 5: Clear Immigration — Present passport and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy visa-free entry for up to 90 days."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted upon arrival at Tirana International Airport Nënë Tereza (TIA) or maritime/land borders.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa-Free Entry",
        "details": "Indian citizens enjoy 90-day visa-free entry."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Registration",
        "details": "Registration required for stays over 90 days."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "€50 per day of stay",
        "description": "Cash or international card to show sufficient maintenance."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Albania?",
        "answer": "No, Indian passport holders enjoy visa-free entry for up to 90 days (either under periodic seasonal decrees or with valid US/UK/Schengen visas)."
      },
      {
        "question": "How long can I stay in Albania?",
        "answer": "Up to 90 days visa-free within a 180-day period."
      },
      {
        "question": "Is Albania part of Schengen?",
        "answer": "No, Albania is not part of the Schengen zone."
      }
    ],
    "validity": "90 Days on Arrival",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry for Europe and Foreign Affairs of Albania (punetejashtme.gov.al)"
  },
  "morocco": {
    "overview": "Morocco is a top African tourist destination offering eVisa for Indian passport holders. Explore Marrakech, Casablanca, Fez, the Sahara Desert, and the Atlas Mountains. Rich culture, beautiful architecture, and delicious cuisine.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Marrakech & Fez",
        "description": "Historic cities with stunning architecture and vibrant souks."
      },
      {
        "icon": "🏜️",
        "title": "Sahara Desert",
        "description": "Camel treks, desert camps, and stunning sunsets."
      },
      {
        "icon": "🏔️",
        "title": "Atlas Mountains",
        "description": "Beautiful mountain scenery and trekking opportunities."
      },
      {
        "icon": "📱",
        "title": "eVisa Available",
        "description": "Apply online for Morocco eVisa — valid for 30 days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "eVisa Application Form",
        "description": "Completed online via Morocco eVisa portal.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Morocco.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Morocco Itinerary — Research Marrakech, Fez, Casablanca, and the Sahara.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Apply for eVisa — Complete online application on Morocco eVisa portal.",
      "Step 4: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 5: Receive eVisa — Download eVisa PDF (issued within 3-5 days).",
      "Step 6: Board Flight to Morocco — Carry passport, eVisa, return ticket, and hotel booking.",
      "Step 7: Clear Immigration — Present documents at Moroccan airport immigration."
    ],
    "fees": {
      "visa_fee": "$30-50 USD (approx. ₹2,500-4,100)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$30-50 USD Total Reference",
      "notes": "eVisa fee paid online via official Morocco portal."
    },
    "proc_time": "3-5 Business Days (eVisa)",
    "proc_details": "Processed 100% online through the official Access Maroc electronic visa portal (acces-maroc.ma).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "eVisa Required",
        "details": "Indian passport holders require eVisa for Morocco (or valid visa for US/UK/Schengen/Canada/Australia)."
      },
      {
        "category": "Duration of Stay",
        "details": "Maximum 30 days per visit."
      },
      {
        "category": "Insurance",
        "details": "Travel medical insurance recommended."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Morocco?",
        "answer": "Yes, Indian passport holders require an eVisa for Morocco. Apply online via acces-maroc.ma before travel."
      },
      {
        "question": "How long can I stay in Morocco?",
        "answer": "Up to 30 days on an eVisa. Extension possible in Casablanca or Marrakech through the police prefecture."
      },
      {
        "question": "What is the processing time for Morocco eVisa?",
        "answer": "Standard eVisa processing takes 3 business days; express eVisa takes 24 to 48 hours."
      }
    ],
    "validity": "30 Days (eVisa)",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Moroccan Ministry of Foreign Affairs & Access Maroc eVisa Portal"
  },
  "tunisia": {
    "overview": "Tunisia offers eVisa and visa-on-arrival for Indian passport holders. Explore Tunis, Carthage, the Sahara Desert, and beautiful Mediterranean beaches. Rich history, ancient ruins, and delicious cuisine.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Carthage Ruins",
        "description": "Ancient Roman ruins and UNESCO World Heritage sites."
      },
      {
        "icon": "🏜️",
        "title": "Sahara Desert",
        "description": "Beautiful desert landscapes and star wars filming locations."
      },
      {
        "icon": "🏖️",
        "title": "Mediterranean Beaches",
        "description": "Beautiful beaches on the Mediterranean coast."
      },
      {
        "icon": "📱",
        "title": "eVisa Available",
        "description": "Apply online for Tunisia eVisa."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "eVisa / Visa Application",
        "description": "Completed online or on arrival.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Tunisia.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Tunisia Itinerary — Research Tunis, Carthage, and the Sahara.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Apply for eVisa — Complete online application on Tunisia eVisa portal.",
      "Step 4: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 5: Receive eVisa — Download eVisa PDF (issued within 3-5 days).",
      "Step 6: Board Flight to Tunisia — Carry passport, eVisa, return ticket, and hotel booking.",
      "Step 7: Clear Immigration — Present documents at Tunisian airport immigration."
    ],
    "fees": {
      "visa_fee": "$30-50 USD (approx. ₹2,500-4,100)",
      "service_fee": "₹0 (Online Portal)",
      "total_fee": "$30-50 USD Total Reference",
      "notes": "eVisa fee paid online via official Tunisia portal."
    },
    "proc_time": "3-5 Business Days (eVisa)",
    "proc_details": "Applied online or through the Embassy of Tunisia in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "eVisa Required",
        "details": "Indian passport holders require eVisa for Tunisia."
      },
      {
        "category": "Duration of Stay",
        "details": "Maximum 30 days per visit."
      },
      {
        "category": "Insurance",
        "details": "Travel medical insurance recommended."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,25,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Tunisia?",
        "answer": "Yes, Indian passport holders require an eVisa or consular visa for Tunisia."
      },
      {
        "question": "How long can I stay in Tunisia?",
        "answer": "Up to 30 days on tourist status."
      },
      {
        "question": "What is the processing time for Tunisia eVisa?",
        "answer": "eVisa is typically processed within 3-5 business days."
      }
    ],
    "validity": "30 Days (eVisa)",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Tunisian Ministry of Foreign Affairs (diplomatie.gov.tn)"
  },
  "algeria": {
    "overview": "Algeria offers traditional visa for Indian passport holders. Explore Algiers, the Sahara Desert, and the Mediterranean coast. Rich history, beautiful architecture, and stunning natural landscapes.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Algiers Casbah",
        "description": "UNESCO World Heritage site with historic architecture."
      },
      {
        "icon": "🏜️",
        "title": "Sahara Desert",
        "description": "Stunning desert landscapes and oasis towns."
      },
      {
        "icon": "🏛️",
        "title": "Roman Ruins",
        "description": "Ancient Roman ruins at Timgad and Djemila."
      },
      {
        "icon": "📋",
        "title": "Visa Required",
        "description": "Traditional visa required — apply at Algerian Embassy."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form",
        "description": "Completed Algerian visa application form in duplicate.",
        "is_mandatory": true
      },
      {
        "title": "Invitation Letter / Hotel Voucher",
        "description": "Official invitation from Algerian host (notarized in Algeria) or confirmed hotel booking.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Algeria.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay covering medical repatriation.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Algeria Itinerary — Research Algiers, Sahara, and other destinations.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Obtain Invitation Letter — Secure invitation from Algerian host or book hotel.",
      "Step 4: Complete Visa Application — Fill Algerian visa application form.",
      "Step 5: Submit Application — Apply at Algerian Embassy/VFS with complete dossier.",
      "Step 6: Pay Visa Fee — Pay the applicable visa fee.",
      "Step 7: Receive Visa & Travel — Receive visa. Travel to Algeria."
    ],
    "fees": {
      "visa_fee": "$30-50 USD (approx. ₹2,500-4,100)",
      "service_fee": "Payable at VFS / Embassy",
      "total_fee": "$30-50 USD + VFS Logistics",
      "notes": "Visa fee varies by entry type; paid at Embassy in New Delhi."
    },
    "proc_time": "5-10 Working Days",
    "proc_details": "Submitted at Embassy of Algeria in New Delhi or authorized consular service center.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa Required",
        "details": "Indian passport holders require a visa for Algeria."
      },
      {
        "category": "Invitation Required",
        "details": "Invitation letter from Algerian host or hotel booking required."
      },
      {
        "category": "Insurance",
        "details": "Travel medical insurance covering the entire stay."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,00,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Algeria?",
        "answer": "Yes, Indian passport holders require a visa for Algeria. Apply at the Algerian Embassy in New Delhi before travel."
      },
      {
        "question": "How long can I stay in Algeria?",
        "answer": "Up to 30-90 days on tourist visa."
      },
      {
        "question": "What is the processing time for Algeria visa?",
        "answer": "Visa processing takes 5-10 working days at the embassy."
      }
    ],
    "validity": "30-90 Days (Tourist Visa)",
    "stay_duration": "Up to 30-90 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of Algeria (mae.gov.dz) & Embassy of Algeria New Delhi"
  },
  "uruguay": {
    "overview": "Uruguay offers visa-free entry for Indian passport holders for up to 90 days. Explore Montevideo, Punta del Este, Colonia del Sacramento, and beautiful beaches along the Rio de la Plata. Rich culture, wine country, and stunning coastal scenery.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Punta del Este",
        "description": "Beautiful beaches and vibrant resort town."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free Entry",
        "description": "Indian citizens enjoy 90-day visa-free entry to Uruguay."
      },
      {
        "icon": "🍷",
        "title": "Wine Country",
        "description": "Tannat wines and beautiful vineyards."
      },
      {
        "icon": "🏛️",
        "title": "Colonia del Sacramento",
        "description": "UNESCO World Heritage site with cobblestone streets."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Uruguay.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Uruguay Itinerary — Research Montevideo, Punta del Este, and Colonia.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 4: Board Flight to Uruguay — No prior visa required (90 days visa-free).",
      "Step 5: Clear Immigration — Present passport and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy visa-free entry for up to 90 days."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Immediate entry granted at Carrasco International Airport (MVD), Montevideo.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa-Free Entry",
        "details": "Indian citizens enjoy 90-day visa-free entry."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Registration",
        "details": "No registration required for stays under 90 days."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "USD $50 per day",
        "description": "Proof of sufficient financial means for stay."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Uruguay?",
        "answer": "No, Indian passport holders enjoy visa-free entry for up to 90 days."
      },
      {
        "question": "How long can I stay in Uruguay?",
        "answer": "Up to 90 days visa-free."
      },
      {
        "question": "Is Uruguay part of Schengen?",
        "answer": "No, Uruguay is located in South America and is a member of Mercosur."
      }
    ],
    "validity": "90 Days on Arrival",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of Uruguay (gub.uy/mrree)"
  },
  "fiji": {
    "overview": "Fiji offers visa-free entry for Indian passport holders for up to 4 months. Explore the beautiful islands, crystal-clear waters, coral reefs, and vibrant Fijian culture. Perfect for honeymoons, diving, and island adventures.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Island Paradise",
        "description": "Beautiful islands with crystal-clear waters and white-sand beaches."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free Entry",
        "description": "Indian citizens enjoy up to 4 months visa-free entry to Fiji."
      },
      {
        "icon": "🤿",
        "title": "Scuba Diving",
        "description": "World-class diving and snorkeling in the Pacific Ocean."
      },
      {
        "icon": "🌺",
        "title": "Fijian Culture",
        "description": "Rich culture, friendly locals, and traditional ceremonies."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Fiji.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Fiji Itinerary — Research islands, resorts, and activities.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 4: Board Flight to Fiji — No prior visa required (4 months visa-free).",
      "Step 5: Clear Immigration — Present passport and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy visa-free entry for up to 4 months."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Direct entry stamp granted at Nadi International Airport (NAN) or Nausori Airport (SUV).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Visa-Free Entry",
        "details": "Indian citizens enjoy up to 4 months visa-free entry."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Registration",
        "details": "No registration required."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "FJD $100 per day",
        "description": "Proof of funds for island travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Fiji?",
        "answer": "No, Indian passport holders enjoy visa-free entry for up to 4 months upon arrival."
      },
      {
        "question": "How long can I stay in Fiji?",
        "answer": "Up to 4 months visa-free on arrival, extendable locally up to 6 months at Fiji Immigration."
      },
      {
        "question": "Is Fiji part of Schengen?",
        "answer": "No, Fiji is an independent island nation in the South Pacific Ocean."
      }
    ],
    "validity": "4 Months on Arrival",
    "stay_duration": "Up to 4 Months",
    "entry_type": "Single Entry",
    "official_source": "Fiji Immigration Department (immigration.gov.fj)"
  },
  "panama": {
    "overview": "Panama offers visa-free entry for Indian passport holders who hold a valid visa from USA, Canada, UK, Australia, or Schengen. Explore Panama City, the Panama Canal, San Blas Islands, and beautiful beaches.",
    "highlights": [
      {
        "icon": "🚢",
        "title": "Panama Canal",
        "description": "World-famous canal with ship transits and Miraflores Locks."
      },
      {
        "icon": "🏖️",
        "title": "San Blas Islands",
        "description": "Beautiful islands with pristine beaches and clear waters."
      },
      {
        "icon": "🌆",
        "title": "Panama City",
        "description": "Modern city with historic Casco Viejo and skyline views."
      },
      {
        "icon": "📋",
        "title": "Visa on Arrival",
        "description": "Visa-free entry with valid US/UK/Canada/Australia/Schengen visa."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US/UK/Canada/Australia/Schengen Visa",
        "description": "Must hold a valid visa from listed countries with minimum 6 months remaining validity.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation departing within 90 days.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Panama City, Bocas del Toro, or San Blas.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Panama Itinerary — Research Panama City, Canal, and San Blas Islands.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Ensure Valid Visa — Must hold valid US/UK/Canada/Australia/Schengen visa.",
      "Step 4: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 5: Board Flight to Panama — Visa-free entry with valid visa.",
      "Step 6: Clear Immigration — Present passport, valid visa, and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry with valid visa)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Visa-free entry for Indian passport holders with valid US/UK/Canada/Australia/Schengen visa."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Immediate entry granted at Tocumen International Airport (PTY), Panama City.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Valid Visa",
        "details": "Must hold valid US/UK/Canada/Australia/Schengen visa (used at least once)."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      },
      {
        "category": "Economic Solvency",
        "details": "Demonstrate minimum $500 in cash or credit card limit upon entry."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card Limit",
        "minimum_balance_or_amount": "USD $500",
        "description": "Minimum $500 in cash or credit card limit checked by immigration officers."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Panama?",
        "answer": "No, Indian passport holders with a valid, previously used visa from the USA, UK, Canada, Australia, or Schengen area enjoy visa-free entry for up to 90 days under Executive Decree 521."
      },
      {
        "question": "How long can I stay in Panama?",
        "answer": "Up to 90 days visa-free with a qualifying third-country visa."
      },
      {
        "question": "Can I enter Panama without a valid third-country visa?",
        "answer": "If you do not hold a US/UK/Canada/Schengen visa, you must apply for a Stamped Visa (Visa Estampada) through the Embassy of Panama in New Delhi."
      }
    ],
    "validity": "90 Days on Arrival (with valid visa)",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Servicio Nacional de Migración Panamá (migracion.gob.pa)"
  },
  "dominican-republic": {
    "overview": "Dominican Republic offers visa-free entry for Indian passport holders who hold a valid visa from USA, Canada, UK, or Schengen. Explore Punta Cana, Santo Domingo, Puerto Plata, and beautiful Caribbean beaches.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Punta Cana Beaches",
        "description": "Beautiful beaches with crystal-clear Caribbean waters."
      },
      {
        "icon": "🏛️",
        "title": "Santo Domingo",
        "description": "Historic Colonial Zone — UNESCO World Heritage site."
      },
      {
        "icon": "🌴",
        "title": "Caribbean Paradise",
        "description": "Resorts, golf courses, and vibrant nightlife."
      },
      {
        "icon": "📋",
        "title": "Visa on Arrival",
        "description": "Visa-free entry with valid US/UK/Canada/Schengen visa."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US/UK/Canada/Schengen Visa",
        "description": "Must hold a valid visa from listed countries with minimum remaining validity.",
        "is_mandatory": true
      },
      {
        "title": "Mandatory E-Ticket Portal Registration",
        "description": "Digital entry/exit ticket completed online prior to boarding at eticket.migracion.gob.do.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight reservation departing within 30 days.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation",
        "description": "Proof of stay in Punta Cana, Santo Domingo, or Puerto Plata.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Step 1: Plan Your Dominican Republic Itinerary — Research Punta Cana, Santo Domingo, and Puerto Plata.",
      "Step 2: Ensure Passport Validity — Verify 6+ months validity.",
      "Step 3: Ensure Valid Visa — Must hold valid US/UK/Canada/Schengen visa.",
      "Step 4: Book Flights & Accommodation — Secure confirmed bookings.",
      "Step 5: Complete E-Ticket Portal — Generate mandatory QR code on eticket.migracion.gob.do.",
      "Step 6: Board Flight to Dominican Republic — Visa-free entry with valid visa.",
      "Step 7: Clear Immigration — Present passport, valid visa, QR code, and return ticket at immigration counter."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free Entry with valid visa)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Visa-free entry for Indian passport holders with valid US/UK/Canada/Schengen visa. Tourist card fee ($10) is embedded in commercial flight tickets."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Immediate entry granted at Punta Cana Airport (PUJ) or Las Américas Airport (SDQ).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 2 blank pages."
      },
      {
        "category": "Valid Visa",
        "details": "Must hold valid US/UK/Canada/Schengen visa."
      },
      {
        "category": "E-Ticket Requirement",
        "details": "Mandatory digital E-Ticket completed online before boarding."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "USD $500",
        "description": "Proof of funds for Caribbean travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Dominican Republic?",
        "answer": "No, Indian passport holders with a valid visa from the USA, UK, Canada, or Schengen area enjoy visa-free entry for up to 30 days under Decree 691-07."
      },
      {
        "question": "How long can I stay in Dominican Republic?",
        "answer": "Up to 30 days on tourist entry, extendable upon payment of departure tax at the airport."
      },
      {
        "question": "What is the Dominican Republic E-Ticket?",
        "answer": "It is a free, mandatory electronic form (eticket.migracion.gob.do) combining the customs declaration and embarkation/disembarkation card into a single QR code."
      }
    ],
    "validity": "30 Days on Arrival (with valid visa)",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Dirección General de Migración (migracion.gob.do) & MIREX"
  },
  "bosnia": {
    "overview": "Bosnia and Herzegovina offers visa-free entry for Indian passport holders holding a valid multiple-entry Schengen visa, US visa, or EU member state visa for up to 30 days. Explore Sarajevo's Ottoman Baščaršija bazaar, the iconic Stari Most (Old Bridge) of Mostar (UNESCO), Kravice Waterfalls, and the emerald Neretva river valley. All other Indian passport holders apply at the Embassy of Bosnia and Herzegovina in New Delhi.",
    "highlights": [
      {
        "icon": "🌉",
        "title": "Mostar & Stari Most (UNESCO)",
        "description": "16th-century Ottoman arched stone bridge over the turquoise Neretva River and traditional bridge divers."
      },
      {
        "icon": "🕌",
        "title": "Sarajevo's Baščaršija & Latin Bridge",
        "description": "Where East meets West: Ottoman bazaars, Austro-Hungarian architecture, and historic Latin Bridge."
      },
      {
        "icon": "🌊",
        "title": "Kravice Waterfalls",
        "description": "Spectacular 25-meter cascading amphitheatre of waterfalls surrounded by lush greenery."
      },
      {
        "icon": "✈️",
        "title": "Visa Waiver with Schengen / US Visa",
        "description": "Holders of valid multiple-entry Schengen or US visas enjoy 30-day visa-free entry."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months beyond departure date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid Schengen / US Visa (for visa waiver)",
        "description": "Multiple-entry visa for Schengen, EU, or USA valid for the duration of stay.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight booking to Sarajevo International Airport (SJJ).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Accommodation Voucher",
        "description": "Confirmed booking in Sarajevo, Mostar, or registered tourist voucher.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Emergency medical coverage valid in Bosnia for minimum €30,000.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Schengen Waiver: If holding a valid multi-entry Schengen or US visa, enter directly without a separate visa.",
      "Apply via Embassy (if no Schengen/US visa): Submit visa application at Embassy of Bosnia and Herzegovina in New Delhi.",
      "Gather Documents: Prepare passport, hotel voucher, flight itinerary, insurance, and bank statements.",
      "Pay Consular Fee: Pay €31 (single entry) or €57 (multiple entry).",
      "Receive Stamped Visa: Passport returned with visa sticker within 7 to 15 working days.",
      "Border Clearance: Present passport, visa/waiver, and return ticket at immigration desk."
    ],
    "fees": {
      "visa_fee": "€0 (Visa-free with Schengen/US visa) / €31 (Consular Visa)",
      "service_fee": "₹0 (Direct Entry / Embassy)",
      "total_fee": "€0 - €31 (approx. ₹0 - ₹2,800)",
      "notes": "Holders of valid Schengen/US visas enter visa-free."
    },
    "proc_time": "Instant (with Schengen/US visa) or 7-15 Days (Consular)",
    "proc_details": "Border entry stamp or consular processing at Embassy in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for minimum 3 months beyond intended departure."
      },
      {
        "category": "Registration",
        "details": "Mandatory white card registration with local police within 48 hours (handled by hotel)."
      },
      {
        "category": "Schengen Waiver",
        "details": "Multiple-entry Schengen or US visa allows 30-day visa-free stay."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statements / Cash",
        "minimum_balance_or_amount": "BAM 150 (approx. €75) per day of stay",
        "description": "Proof of sufficient funds for stay."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens visit Bosnia visa-free?",
        "answer": "Yes! Indian passport holders who hold a valid multiple-entry Schengen, EU, or US visa can enter Bosnia and Herzegovina visa-free for up to 30 days."
      },
      {
        "question": "How long can I stay in Bosnia?",
        "answer": "Up to 30 days per visit under the visa waiver or standard tourist visa."
      },
      {
        "question": "Is Bosnia in the Schengen Zone?",
        "answer": "No, Bosnia is not part of the Schengen area, so your stay does not count against your 90/180 Schengen days."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of Bosnia and Herzegovina (mvp.gov.ba)"
  },
  "north-macedonia": {
    "overview": "North Macedonia, situated in the heart of the Balkans, enchants travellers with UNESCO-listed Lake Ohrid (one of Europe's oldest and deepest lakes), the historic churches and fortress of Ohrid, the grand monuments and Old Bazaar of Skopje, and the dramatic Matka Canyon. Indian citizens holding a valid multiple-entry Schengen (Type C), UK, or US visa can enter North Macedonia VISA-FREE for up to 15 days; others apply at the Embassy of North Macedonia in New Delhi.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Lake Ohrid & Saint John at Kaneo",
        "description": "Fairy-tale 13th-century clifftop church overlooking the crystal-clear waters of ancient Lake Ohrid (UNESCO)."
      },
      {
        "icon": "🏙️",
        "title": "Skopje & Old Bazaar",
        "description": "The largest Ottoman bazaar in the Balkans outside Istanbul, historic Stone Bridge, and monumental neoclassical plazas."
      },
      {
        "icon": "🛶",
        "title": "Matka Canyon & Vrelo Cave",
        "description": "Spectacular karst river gorge popular for kayaking, boat tours, and deep subterranean cave exploration."
      },
      {
        "icon": "✈️",
        "title": "Visa-Free with Schengen / US / UK Visa",
        "description": "Holders of valid multi-entry Schengen, US, or UK visas enter 100% visa-free for up to 15 days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months after departure date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Qualifying Multi-Entry Schengen/US/UK Visa",
        "description": "Must be valid for at least 5 days beyond stay for visa-free entry.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Skopje International Airport (SKP) or Ohrid Airport (OHD).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Booking",
        "description": "Confirmed booking voucher in Skopje, Ohrid, or Bitola.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Minimum €30,000 emergency medical coverage.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Multi-Entry Visa: If holding a valid multi-entry Schengen, UK, or US visa, enter directly without a visa.",
      "Apply at Embassy (if required): Submit visa application at Embassy of North Macedonia in New Delhi.",
      "Gather Required Documents: Secure passport, hotel reservation, flight itinerary, and travel insurance.",
      "Pay Consular Fee: Pay €60 consular tourist visa fee.",
      "Passport Collection: Retrieve passport with visa sticker within 10 to 15 business days.",
      "Border Entry: Present passport, visa/waiver, and return ticket at Skopje airport border control."
    ],
    "fees": {
      "visa_fee": "€0 (Visa-free with Schengen/US/UK visa) / €60 (Consular Visa)",
      "service_fee": "₹0 (Direct Entry)",
      "total_fee": "€0 - €60 (approx. ₹0 - ₹5,400)",
      "notes": "Free entry for holders of valid multi-entry Schengen, US, or UK visas."
    },
    "proc_time": "Instant (with Schengen/US visa) or 10-15 Days (Consular)",
    "proc_details": "Border entry stamp or consular assessment at Embassy in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond intended departure."
      },
      {
        "category": "Visa Waiver Duration",
        "details": "15 days maximum stay per entry with qualifying third-country visa."
      },
      {
        "category": "Police Registration",
        "details": "Mandatory registration with local police within 24 hours of arrival (handled by registered accommodations)."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Proof of funds for stay."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders enter North Macedonia visa-free?",
        "answer": "Yes! Indian passport holders who hold a valid multiple-entry Schengen, UK, or US visa can enter North Macedonia visa-free for up to 15 days per visit."
      },
      {
        "question": "How long can I stay in North Macedonia?",
        "answer": "Up to 15 days under the visa waiver, or up to 90 days under a national consular tourist visa."
      },
      {
        "question": "Is North Macedonia part of Schengen?",
        "answer": "No, North Macedonia is not part of the Schengen area."
      }
    ],
    "validity": "15 Days on Arrival",
    "stay_duration": "Up to 15 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of North Macedonia (mfa.gov.mk)"
  },
  "kosovo": {
    "overview": "Kosovo, Europe's youngest nation, charms visitors with Ottoman heritage, vibrant youth culture in the capital Pristina, UNESCO medieval Byzantine monasteries in Gračanica and Dečani, Ottoman cobblestone streets and Sinan Pasha Mosque in Prizren, and dramatic hiking in the Rugova Canyon. Indian citizens holding a valid multiple-entry Schengen visa can enter Kosovo VISA-FREE for up to 15 days; all other applicants must apply at an authorized Kosovo diplomatic mission.",
    "highlights": [
      {
        "icon": "🕌",
        "title": "Prizren & Kalaja Fortress",
        "description": "Historic cultural capital with Ottoman stone bridge, vibrant Shadervan square, and hilltop fortress views."
      },
      {
        "icon": "☕",
        "title": "Pristina & World-Class Café Culture",
        "description": "Lively capital with Newborn monument, Mother Teresa Cathedral, and world-renowned macchiato coffee scene."
      },
      {
        "icon": "⛪",
        "title": "UNESCO Medieval MonMonuments",
        "description": "Visoki Dečani Monastery and Gračanica Monastery featuring 14th-century Byzantine frescoes."
      },
      {
        "icon": "🏔️",
        "title": "Rugova Canyon & Peja",
        "description": "Breathtaking 25-kilometer mountain canyon with rock climbing, via ferrata, and caves in the Accursed Mountains."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 3 months beyond departure date with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid Multi-Entry Schengen Visa (for visa waiver)",
        "description": "Multiple-entry Schengen visa (Type C) allows 15-day visa-free entry.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Flight booking into Pristina International Airport Adem Jashari (PRN).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Proof of accommodation in Pristina or Prizren.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Emergency medical insurance covering minimum €30,000.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Schengen Visa Waiver: If you hold a valid multiple-entry Schengen visa, enter Kosovo visa-free for up to 15 days.",
      "Apply at Consular Mission (if required): Apply at an accredited Embassy of the Republic of Kosovo.",
      "Assemble Documents: Prepare passport, photo, hotel booking, flight ticket, and travel medical insurance.",
      "Pay Statutory Fee: Pay €40 consular visa fee.",
      "Receive Visa: Collect passport with stamped visa within 10 to 15 working days.",
      "Immigration Entry: Present passport, visa/waiver, and return ticket at Pristina airport border control."
    ],
    "fees": {
      "visa_fee": "€0 (Visa-free with Schengen) / €40 (Consular Visa)",
      "service_fee": "₹0 (Direct Entry)",
      "total_fee": "€0 - €40 (approx. ₹0 - ₹3,600)",
      "notes": "Holders of valid multi-entry Schengen visas enter visa-free."
    },
    "proc_time": "Instant (with Schengen visa) or 10-15 Days (Consular)",
    "proc_details": "Border entry stamp or consular assessment at Kosovo diplomatic mission.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 3 months beyond departure."
      },
      {
        "category": "Schengen Exemption",
        "details": "Holders of valid multi-entry Schengen visas enter visa-free for up to 15 days."
      },
      {
        "category": "Currency",
        "details": "Kosovo uses the Euro (€) as its de facto official currency."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Proof of funds for travel."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens visit Kosovo with a Schengen visa?",
        "answer": "Yes! Indian passport holders holding a valid multiple-entry Schengen visa can enter Kosovo visa-free for up to 15 days."
      },
      {
        "question": "What currency is used in Kosovo?",
        "answer": "Kosovo uses the Euro (€) as its official currency."
      },
      {
        "question": "How long can I stay in Kosovo?",
        "answer": "Up to 15 days under the Schengen visa waiver, or up to 90 days on a national visa."
      }
    ],
    "validity": "15 Days on Arrival",
    "stay_duration": "Up to 15 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs and Diaspora of Kosovo (mfa-ks.net)"
  },
  "libya": {
    "overview": "Libya boasts magnificent classical Roman and Greek antiquities along the Mediterranean coast, including the colossal Roman ruins of Leptis Magna (UNESCO) and Sabratha, the Greek temple city of Cyrene, and the prehistoric rock art of the Sahara Desert. Indian passport holders require a pre-approved tourist visa arranged via an authorized Libyan tour operator and the Directorate of Passports and Nationality.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Leptis Magna (UNESCO)",
        "description": "One of the most complete and best-preserved Roman cities in the Mediterranean, featuring the Arch of Septimius Severus and theatre."
      },
      {
        "icon": "🎭",
        "title": "Sabratha Ancient Amphitheatre",
        "description": "Iconic three-story Roman seaside theatre overlooking the turquoise Mediterranean waters."
      },
      {
        "icon": "🏜️",
        "title": "Ghadames Oasis (Pearl of the Desert)",
        "description": "Ancient fortified mud-brick desert oasis city renowned for whitewashed covered alleys and rooftop networks."
      },
      {
        "icon": "🏺",
        "title": "Cyrene Greek Ruins",
        "description": "Ancient Greek colony in the Green Mountain (Jabal al Akhdar) featuring the Temple of Apollo and Sanctuary of Demeter."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with Arabic passport translation page (mandatory in Libya).",
        "is_mandatory": true
      },
      {
        "title": "Official Libyan Visa Approval Voucher",
        "description": "Government pre-approval clearance arranged via licensed Libyan tour agency.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Booking",
        "description": "Flight booking arriving into Mitiga International Airport (MJI), Tripoli.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Booking",
        "description": "Accommodation and escorted transport confirmation in Libya.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Select Licensed Tour Agency: Contact an authorized Libyan incoming tour agency to sponsor your tourist clearance.",
      "Obtain Arabic Passport Translation: Ensure your passport biodata is translated into Arabic by an authorized translator.",
      "Receive Government Approval: Libyan immigration issues official visa approval voucher.",
      "Submit at Embassy of Libya New Delhi: Present approval letter and passport for consular visa stamping.",
      "Fly to Tripoli: Board flights arriving into Mitiga International Airport (MJI).",
      "Border Stamping: Complete immigration entry procedures upon arrival."
    ],
    "fees": {
      "visa_fee": "$50 - $100 USD (Consular Visa Fee)",
      "service_fee": "Tour operator sponsorship levy",
      "total_fee": "approx. ₹10,000 - ₹15,000",
      "notes": "All independent tourists must travel through registered local tour agencies."
    },
    "proc_time": "10 to 20 Working Days",
    "proc_details": "Coordinated between Libyan Directorate of Passports and Nationality and Embassy of Libya in New Delhi.",
    "requirements": [
      {
        "category": "Arabic Translation",
        "details": "Libyan law strictly requires an official Arabic translation page inserted or accompanying your passport."
      },
      {
        "category": "Guided Tour Mandatory",
        "details": "Foreign tourists must be accompanied by an authorized local guide throughout their stay."
      },
      {
        "category": "Security Clearance",
        "details": "Prior security approval letter is mandatory before visa issuance."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statements / Tour Payment",
        "minimum_balance_or_amount": "₹2,00,000",
        "description": "Proof of tour package payment and travel solvency."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Libya?",
        "answer": "Yes, Indian passport holders require a pre-approved tourist visa arranged through a licensed Libyan tour operator."
      },
      {
        "question": "Is the Arabic passport translation mandatory for Libya?",
        "answer": "Yes. Libyan border regulations require an official Arabic translation of your passport details."
      },
      {
        "question": "Can I travel independently in Libya?",
        "answer": "No. International tourists must travel on an organized itinerary escorted by a licensed local tour guide."
      }
    ],
    "validity": "30 Days from Date of Issue",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Directorate of Passports and Nationality & Embassy of the State of Libya New Delhi"
  },
  "sudan": {
    "overview": "Sudan, the historic Land of the Black Pharaohs, boasts more ancient pyramids than Egypt! Marvel at the steep, slender Nubian pyramids of Meroë (UNESCO), the holy mountain of Jebel Barkal, the ancient royal temple of Naqa, and the confluence of the Blue and White Nile in Khartoum. Indian passport holders can apply for a tourist eVisa or entry permit via the Ministry of Interior / Sudanese diplomatic missions.",
    "highlights": [
      {
        "icon": "🔺",
        "title": "Nubian Pyramids of Meroë (UNESCO)",
        "description": "Over 200 ancient steep stone pyramids rising majestically amidst wind-swept golden Saharan desert dunes."
      },
      {
        "icon": "⛰️",
        "title": "Jebel Barkal & Temple of Amun",
        "description": "Sacred sandstone mountain and 15th-century BC temples of the Kingdom of Kush and the 25th Pharaoh dynasty."
      },
      {
        "icon": "🌊",
        "title": "Confluence of the Blue and White Nile",
        "description": "Witness the dramatic joining of the two great branches of the Nile River in Khartoum."
      },
      {
        "icon": "🏛️",
        "title": "Temple of Naqa & Musawwarat",
        "description": "Remarkably preserved Lion Temple and royal elephant enclosures in the Nubian desert."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages (must not contain Israeli stamps).",
        "is_mandatory": true
      },
      {
        "title": "Entry Permit / Visa Application Form",
        "description": "Completed visa form with sponsor or hotel booking.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Flight Booking",
        "description": "Round-trip flight booking to Port Sudan (PZU) or Khartoum.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Certificate",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Obtain Entry Clearance: Secure entry permit approval from Sudanese tour agency or sponsor.",
      "Apply at Embassy in New Delhi: Submit passport, photo, hotel booking, and entry clearance.",
      "Pay Statutory Fee: Pay $50 - $100 consular fee.",
      "Receive Visa Stamping: Passport returned with visa sticker within 7 to 14 days.",
      "Alien Registration: Register with Aliens Registration Police within 3 days of arrival in Sudan."
    ],
    "fees": {
      "visa_fee": "$50 - $100 USD (Consular Entry Visa)",
      "service_fee": "SDG registration levy",
      "total_fee": "approx. ₹5,000 - ₹9,000",
      "notes": "Mandatory alien registration required within 3 days of arrival."
    },
    "proc_time": "7 to 14 Working Days",
    "proc_details": "Issued via Embassy of the Republic of the Sudan in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months without Israeli stamps."
      },
      {
        "category": "Police Registration",
        "details": "Mandatory alien registration within 3 days of arrival."
      },
      {
        "category": "Travel Permits",
        "details": "Internal travel permits required when travelling outside major regional transit hubs."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Sudan?",
        "answer": "Yes, Indian passport holders require a tourist visa or entry permit prior to travel."
      },
      {
        "question": "Does Sudan have more pyramids than Egypt?",
        "answer": "Yes! Sudan is home to over 255 ancient Nubian pyramids (chiefly at Meroë, Nuri, and Karima), almost double the number found in Egypt."
      },
      {
        "question": "Is registration required upon arrival in Sudan?",
        "answer": "Yes. Foreign visitors must register with the Aliens Registration Office within 3 days of entering Sudan."
      }
    ],
    "validity": "30 to 60 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Interior of Sudan & Embassy of Sudan New Delhi"
  },
  "south-sudan": {
    "overview": "South Sudan, the world's youngest nation (independent since 2011), is home to the world's second-largest mammal migration across Boma National Park, the vast papyrus wetlands of the Sudd (one of the world's largest swamps on the White Nile), and extraordinary indigenous tribal cultures including the Dinka, Mundari, and Toposa cattle-keeping communities. Indian passport holders can apply online for an official tourist eVisa via evisa.gov.ss.",
    "highlights": [
      {
        "icon": "🐂",
        "title": "Mundari & Dinka Cattle Camps",
        "description": "Ancient pastoral cattle camps renowned for indigenous ash-coating rituals, majestic Ankole-Watusi cows, and cultural photography."
      },
      {
        "icon": "🦌",
        "title": "Boma National Park Great Migration",
        "description": "Over 1.5 million white-eared kobs, tiangs, and gazelles migrating across untouched savanna wilderness."
      },
      {
        "icon": "🌿",
        "title": "The Sudd Wetlands & White Nile",
        "description": "Colossal 57,000-sq-km freshwater swamp and birdwatching paradise along the historic White Nile river."
      },
      {
        "icon": "⚡",
        "title": "Official eVisa Portal Available",
        "description": "Apply conveniently online through the official South Sudan eVisa portal (evisa.gov.ss)."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved South Sudan eVisa Approval Letter",
        "description": "Printed confirmation from official portal (evisa.gov.ss).",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight booking arriving into Juba International Airport (JUB).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Operator Letter",
        "description": "Proof of accommodation in Juba or escorted cultural expedition itinerary.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit the official South Sudan eVisa platform (evisa.gov.ss).",
      "Upload Passport & Photo: Submit scans of passport biodata, passport photo, and yellow fever card.",
      "Pay Statutory Fee: Pay $100 - $160 USD eVisa fee online by credit/debit card.",
      "Receive Approval Letter: Official Electronic Visa Approval Letter is issued within 3 to 5 business days.",
      "Fly to Juba: Board flight to Juba International Airport (JUB).",
      "Border Clearance & Alien Registration: Present approval letter at immigration desk to receive passport entry stamp."
    ],
    "fees": {
      "visa_fee": "$100 USD (Single Entry 1 Month) / $160 (Single Entry 3 Months)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$100 - $160 (approx. ₹8,400 - ₹13,500)",
      "notes": "Payable directly by card on evisa.gov.ss."
    },
    "proc_time": "3 to 5 Business Days (eVisa)",
    "proc_details": "Applied online via the Directorate of Nationality, Passports and Immigration (DNPI).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for minimum 6 months from entry date."
      },
      {
        "category": "Yellow Fever Card",
        "details": "Mandatory for all travellers arriving in South Sudan."
      },
      {
        "category": "Alien Registration",
        "details": "Foreigners must complete alien registration within 3 days of arrival in Juba."
      },
      {
        "category": "Photography Permit",
        "details": "Mandatory photography permit required from Ministry of Information for taking photos."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "USD $1,000",
        "description": "Sufficient travel funds."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a South Sudan eVisa?",
        "answer": "Yes! Indian passport holders can apply online directly through the official South Sudan eVisa portal (evisa.gov.ss)."
      },
      {
        "question": "Is a Yellow Fever vaccination required for South Sudan?",
        "answer": "Yes. A valid Yellow Fever Vaccination Card is strictly checked upon landing at Juba Airport."
      },
      {
        "question": "Do I need a photography permit in South Sudan?",
        "answer": "Yes. South Sudan regulations strictly require a photography permit issued by the Ministry of Information before capturing photos or video."
      }
    ],
    "validity": "30 to 90 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Directorate of Nationality, Passports and Immigration of South Sudan (evisa.gov.ss)"
  },
  "eritrea": {
    "overview": "Eritrea, the Red Sea's hidden jewel in the Horn of Africa, is famous for its UNESCO World Heritage capital Asmara—celebrated as a modernist architecture wonderland featuring 1930s Italian Art Deco buildings, vintage espresso bars, and palm-lined boulevards. Explore the historic Ottoman Red Sea port of Massawa and the pristine coral reefs of the Dahlak Archipelago. Indian citizens apply for a tourist visa through the Embassy of Eritrea in New Delhi.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Asmara: Africa's Modernist City (UNESCO)",
        "description": "Pristine Italian modernist, futurist, and Art Deco architecture including the Fiat Tagliero airplane service station."
      },
      {
        "icon": "☕",
        "title": "Historic Italian Café Culture",
        "description": "Sip traditional macchiato coffee in vintage 1930s bars along Harnet Avenue in Asmara."
      },
      {
        "icon": "🌊",
        "title": "Massawa & Red Sea Coast",
        "description": "Ottoman and coral-block architecture, fresh seafood, and scenic Red Sea seaside promenade."
      },
      {
        "icon": "🤿",
        "title": "Dahlak Archipelago",
        "description": "Over 200 pristine uninhabited Red Sea islands renowned for untouched coral reefs, manta rays, and pearl diving."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form",
        "description": "Completed Eritrean visa application form in duplicate.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Sized Photographs",
        "description": "Recent color photos (35x45mm) on white background.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Flight Reservation",
        "description": "Round-trip flight booking to Asmara International Airport (ASM).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Host Invitation",
        "description": "Proof of accommodation in Asmara or Massawa.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Original stamped bank statements for past 3 months.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Download Visa Form: Obtain the official Eritrean visa application form.",
      "Assemble Dossier: Prepare passport, 2 photos, flight itinerary, hotel booking, and bank statements.",
      "Submit at Embassy in New Delhi: Submit physical file at the Embassy of the State of Eritrea in New Delhi.",
      "Pay Consular Fee: Pay ₹4,000 - ₹5,000 consular visa fee.",
      "Await Consular Clearance: Eritrean Ministry of Foreign Affairs reviews and approves entry permit.",
      "Collect Stamped Passport: Retrieve passport with visa sticker within 10 to 15 working days."
    ],
    "fees": {
      "visa_fee": "₹4,200 (approx. $50 USD Consular Fee)",
      "service_fee": "₹0 (Direct Embassy Submission)",
      "total_fee": "approx. ₹4,200 Total",
      "notes": "Payable by cash or Demand Draft to Embassy of Eritrea New Delhi."
    },
    "proc_time": "10 to 15 Working Days",
    "proc_details": "Applied directly at Embassy of the State of Eritrea in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months from arrival."
      },
      {
        "category": "Travel Permits",
        "details": "A Ministry of Tourism travel permit is required for travel outside Asmara (e.g. to Massawa or Keren)."
      },
      {
        "category": "Currency Declaration",
        "details": "Foreign currency must be declared upon arrival and exchanged only at official Himbol bureaux."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Eritrea?",
        "answer": "Yes, Indian passport holders require a tourist visa applied through the Embassy of Eritrea in New Delhi before travel."
      },
      {
        "question": "Why is Asmara famous?",
        "answer": "Asmara is a UNESCO World Heritage site known as 'Piccola Roma' for having the world's most intact collection of Italian modernist and Art Deco architecture."
      },
      {
        "question": "Can I travel outside Asmara?",
        "answer": "Yes, but tourists must obtain an internal travel permit from the Ministry of Tourism in Asmara before travelling to regional towns like Massawa or Keren."
      }
    ],
    "validity": "30 Days from Date of Issue",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of Eritrea & Embassy of Eritrea New Delhi"
  },
  "djibouti": {
    "overview": "Djibouti, located on the Bab-el-Mandeb strait between the Red Sea and Gulf of Aden, is famous for dramatic geothermal wonders: the otherworldly hypersaline Lake Assal (the lowest point in Africa and saltiest body of water on Earth), smoking limestone chimneys and pink flamingos of Lake Abbe, and world-class seasonal whale shark snorkeling in the Gulf of Tadjoura. Indian passport holders can easily obtain an official tourist eVisa online via evisa.gouv.dj.",
    "highlights": [
      {
        "icon": "🧂",
        "title": "Lake Assal (Lowest Point in Africa)",
        "description": "Otherworldly hypersaline volcanic crater lake 155 meters below sea level, surrounded by glittering white salt plains."
      },
      {
        "icon": "🌋",
        "title": "Lake Abbe & Limestone Chimneys",
        "description": "Lunar landscape of towering 50-meter steaming travertine limestone chimneys where Planet of the Apes was filmed."
      },
      {
        "icon": "🦈",
        "title": "Whale Shark Snorkeling in Tadjoura",
        "description": "Swim alongside gentle giant whale sharks in the crystal-clear waters of the Gulf of Tadjoura (October to February)."
      },
      {
        "icon": "⚡",
        "title": "Official Online eVisa Portal",
        "description": "Apply easily online at evisa.gouv.dj — issued typically within 48 to 72 hours."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond stay with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Djibouti eVisa Confirmation",
        "description": "Electronic Visa Approval PDF printed from evisa.gouv.dj.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Djibouti-Ambouli International Airport (JIB).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Host Invitation",
        "description": "Proof of accommodation in Djibouti City or registered tour voucher.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Card (if coming from endemic area)",
        "description": "Required if arriving from yellow fever endemic nations.",
        "is_mandatory": false
      }
    ],
    "steps": [
      "Apply Online: Visit the official Djibouti eVisa portal (evisa.gouv.dj) and select Tourist Visa.",
      "Upload Documents: Upload passport biodata scan, portrait photograph, flight booking, and hotel voucher.",
      "Pay eVisa Fee Online: Pay $12 USD (transit) or $23 USD (short stay up to 30 days) via credit/debit card.",
      "Receive Approval: Download and print your official eVisa PDF issued within 2 to 3 days.",
      "Board Flight: Fly to Djibouti-Ambouli International Airport (JIB).",
      "Border Entry: Present printed eVisa, passport, and hotel voucher for entry stamp."
    ],
    "fees": {
      "visa_fee": "$23 USD (Short Stay up to 30 Days) / $12 USD (Transit up to 3 Days)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$23 USD (approx. ₹1,900 Total)",
      "notes": "One of the most affordable official eVisas in Africa."
    },
    "proc_time": "2 to 3 Business Days (eVisa)",
    "proc_details": "Processed 100% online through the official Djibouti government eVisa portal.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Entry Port",
        "details": "Valid for entry through Djibouti-Ambouli International Airport (JIB) and maritime borders."
      },
      {
        "category": "Accommodations",
        "details": "Confirmed hotel booking or host invitation is strictly verified upon arrival."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "USD $500",
        "description": "Proof of sufficient funds for travel."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Djibouti eVisa?",
        "answer": "Yes! Indian passport holders are 100% eligible to apply online through the official Djibouti portal (evisa.gouv.dj)."
      },
      {
        "question": "How much is the Djibouti eVisa?",
        "answer": "The official short-stay tourist eVisa fee is only $23 USD (approx. ₹1,900), payable online by card."
      },
      {
        "question": "When is whale shark season in Djibouti?",
        "answer": "Whale sharks congregate in large numbers in the Gulf of Tadjoura and Arta Plage from mid-October to February."
      }
    ],
    "validity": "30 Days from Date of Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Direction Générale de la Police Nationale de Djibouti (evisa.gouv.dj)"
  },
  "somalia": {
    "overview": "Somalia and the self-declared autonomous region of Somaliland offer fascinating horn-of-Africa cultural heritage, the ancient Neolithic cave paintings of Laas Geel (UNESCO tentative list, among the oldest and best-preserved rock art in Africa), Mogadishu's historic Lido Beach, and the Gulf of Aden ports of Berbera and Zeila. Indian passport holders obtain a Visa on Arrival arranged with prior sponsorship letter or apply through diplomatic missions.",
    "highlights": [
      {
        "icon": "🎨",
        "title": "Laas Geel Cave Paintings (Somaliland)",
        "description": "5,000 to 7,000-year-old rock art portraying vibrant cows, herders, and deities in vivid red, white, and yellow pigments."
      },
      {
        "icon": "🏖️",
        "title": "Mogadishu Lido Beach",
        "description": "Bustling coastal beachfront along the Indian Ocean with fresh seafood and vibrant local evening life."
      },
      {
        "icon": "🚢",
        "title": "Berbera & Zeila Historic Ports",
        "description": "Ancient Ottoman and British colonial trading ports on the Gulf of Aden with coral-stone architecture."
      },
      {
        "icon": "🐪",
        "title": "Hargeisa Camel Market",
        "description": "One of the largest livestock markets in the Horn of Africa, trading thousands of camels and livestock daily."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Official Sponsorship / Invitation Letter",
        "description": "Formal invitation from a registered host, hotel, or tour operator.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Flight booking into Aden Adde Airport (MGQ), Mogadishu or Egal Airport (HGA), Hargeisa.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Proof of accommodation with registered security arrangements.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Secure Host Sponsorship: Obtain an official invitation and visa pre-clearance letter from your local host or authorized tour operator.",
      "Check Port of Entry: If visiting Somaliland (Hargeisa), obtain Somaliland visa on arrival approval or apply at liaison office.",
      "Book Flights & Accommodations: Secure flights and accommodation.",
      "Fly to Destination: Board flight arriving into Mogadishu (MGQ) or Hargeisa (HGA).",
      "Pay Visa Fee at Border: Pay the $60 USD visa on arrival fee at the airport immigration counter.",
      "Border Stamping: Receive your entry visa stamp."
    ],
    "fees": {
      "visa_fee": "$60 USD (Visa on Arrival Fee)",
      "service_fee": "Host sponsorship coordination fee",
      "total_fee": "approx. $60 - $100 USD (₹5,000 - ₹8,400)",
      "notes": "Payable in US Dollars cash at airport immigration desks."
    },
    "proc_time": "Instant on Arrival (with sponsor pre-approval) or 7-10 Days",
    "proc_details": "Granted at Aden Adde International Airport (Mogadishu) or Egal International Airport (Hargeisa).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months from entry."
      },
      {
        "category": "Somaliland Visa Notice",
        "details": "Somaliland operates separate immigration controls from Mogadishu; visitors to Hargeisa receive a separate Somaliland visa."
      },
      {
        "category": "Security Escort",
        "details": "Guided security escorts are required for international visitors in certain regional areas."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (USD)",
        "minimum_balance_or_amount": "USD $500",
        "description": "US Dollar cash is widely used and accepted."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Somalia?",
        "answer": "Yes, Indian passport holders require a visa, available on arrival at Mogadishu and Hargeisa airports with prior sponsor invitation letters."
      },
      {
        "question": "Are Somalia and Somaliland visas the same?",
        "answer": "No. Somaliland maintains independent border controls; entry into Hargeisa requires an independent Somaliland visa ($60 USD on arrival)."
      },
      {
        "question": "What is Laas Geel?",
        "answer": "Laas Geel near Hargeisa contains some of the most vibrant and ancient rock art in Africa, dating back over 5,000 years."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Department of Immigration and Naturalization of Somalia & Somaliland Immigration"
  },
  "uganda": {
    "overview": "Uganda, the 'Pearl of Africa', is world-renowned for trekking endangered mountain gorillas in Bwindi Impenetrable National Park, chimpanzee tracking in Kibale Forest, spectacular savanna game drives in Queen Elizabeth National Park with tree-climbing lions, roaring Murchison Falls where the Nile thunders through a 7-meter gorge, and white-water rafting at the source of the River Nile in Jinja. Indian passport holders can apply online for an official Uganda tourist eVisa via visas.immigration.go.ug.",
    "highlights": [
      {
        "icon": "🦍",
        "title": "Bwindi Impenetrable Mountain Gorillas",
        "description": "Encounter half of the world's remaining mountain gorilla population in ancient mist-covered rainforests (UNESCO)."
      },
      {
        "icon": "🌊",
        "title": "Murchison Falls National Park",
        "description": "The world's most powerful surge of water, where the River Nile crashes through a narrow 7-meter rock gorge."
      },
      {
        "icon": "🦁",
        "title": "Queen Elizabeth National Park",
        "description": "Kazinga Channel boat safaris with massive hippos and famous tree-climbing lions in the Ishasha sector."
      },
      {
        "icon": "🚣",
        "title": "Source of the Nile & Jinja Rafting",
        "description": "Grade 5 white-water rafting on the Victoria Nile and exploring the historic source of the River Nile."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Uganda eVisa Letter",
        "description": "Official electronic visa approval letter printed from visas.immigration.go.ug.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory international certificate of vaccination against yellow fever.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Entebbe International Airport (EBB).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Safari Itinerary",
        "description": "Proof of accommodation in Entebbe, Kampala, or wildlife lodges.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit the official Directorate of Citizenship and Immigration portal (visas.immigration.go.ug).",
      "Upload Documents: Submit passport biodata page, recent photo, yellow fever card, and travel itinerary.",
      "Pay eVisa Fee Online: Pay the statutory $50 USD visa fee by international credit/debit card.",
      "Receive Approval Letter: Uganda Immigration reviews and issues the approval letter within 2 to 4 working days.",
      "Fly to Entebbe: Board flight to Entebbe International Airport (EBB).",
      "Border Stamping: Present approval letter, passport, and yellow fever card to receive your visa sticker."
    ],
    "fees": {
      "visa_fee": "$50 USD (Single Entry 3 Months) / $100 (East Africa Tourist Visa)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$50 USD (approx. ₹4,200 Total)",
      "notes": "Payable online on visas.immigration.go.ug."
    },
    "proc_time": "2 to 4 Business Days (eVisa)",
    "proc_details": "Applied 100% online through Directorate of Citizenship and Immigration Control (DCIC).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Yellow Fever Card",
        "details": "Mandatory for all arrivals aged 1 year and older."
      },
      {
        "category": "East Africa Tourist Visa",
        "details": "Eligible to apply for the $100 EATV covering Uganda, Rwanda, and Kenya on a single visa."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,00,000",
        "description": "Last 3 months bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Uganda?",
        "answer": "Yes, Indian passport holders require an eVisa for Uganda. Apply online at visas.immigration.go.ug before departure."
      },
      {
        "question": "Is Yellow Fever vaccination mandatory for Uganda?",
        "answer": "Yes. A valid Yellow Fever Vaccination Card is strictly compulsory and checked at Entebbe Airport."
      },
      {
        "question": "What is the East Africa Tourist Visa?",
        "answer": "The East Africa Tourist Visa (EATV) costs $100 USD and allows 90 days of multiple-entry travel across Uganda, Rwanda, and Kenya."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 30 to 90 Days",
    "entry_type": "Single Entry / East Africa Tourist Visa",
    "official_source": "Directorate of Citizenship and Immigration Control of Uganda (visas.immigration.go.ug)"
  },
  "malawi": {
    "overview": "Malawi, known as the 'Warm Heart of Africa', is famous for Lake Malawi (UNESCO)—a vast inland freshwater sea with golden sandy beaches and hundreds of endemic colorful cichlid fish—alongside wildlife safaris in Majete and Liwonde National Parks, and hiking the granite plateau of Mount Mulanje. Indian passport holders can apply online for an official tourist eVisa via evisa.gov.mw.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Lake Malawi (Lake of Stars)",
        "description": "Vast turquoise freshwater lake with golden beaches, kayaking, and world-class freshwater snorkeling among colorful cichlid fish."
      },
      {
        "icon": "🐘",
        "title": "Liwonde & Majete Wildlife Safaris",
        "description": "Remarkable Big Five conservation success stories with roaming elephants, black rhinos, lions, and boat safaris on the Shire River."
      },
      {
        "icon": "⛰️",
        "title": "Mount Mulanje Granite Massif",
        "description": "Majestic 3,000-meter granite mountain peaks, cedar forests, natural swimming pools, and high-altitude hiking huts."
      },
      {
        "icon": "⚡",
        "title": "Official Online eVisa Available",
        "description": "Apply easily online via evisa.gov.mw with decisions within 3 to 5 business days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Malawi eVisa Approval Letter",
        "description": "Printed confirmation from official portal (evisa.gov.mw).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Kamuzu Airport (LLW), Lilongwe or Chileka Airport (BLZ), Blantyre.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Host Letter",
        "description": "Proof of accommodation in Malawi.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Demonstrating financial sufficiency for stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit official Malawi eVisa portal (evisa.gov.mw).",
      "Upload Documents: Submit digital passport scan, photograph, cover letter, and hotel reservation.",
      "Pay eVisa Fee Online: Pay $50 USD statutory fee by credit/debit card.",
      "Receive Approval: Download and print your official eVisa Approval Letter issued within 3 to 5 days.",
      "Fly to Malawi: Board flight to Lilongwe (LLW) or Blantyre (BLZ).",
      "Border Stamping: Present approval letter and passport at immigration desk."
    ],
    "fees": {
      "visa_fee": "$50 USD (Single Entry 30 Days)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$50 USD (approx. ₹4,200 Total)",
      "notes": "Payable online on evisa.gov.mw."
    },
    "proc_time": "3 to 5 Business Days (eVisa)",
    "proc_details": "Applied online through the Malawi Department of Immigration and Citizenship Services.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond intended stay."
      },
      {
        "category": "Cover Letter",
        "details": "Brief cover letter stating purpose of holiday and destinations."
      },
      {
        "category": "Health",
        "details": "Yellow fever certificate required if travelling from endemic countries."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,00,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Malawi eVisa?",
        "answer": "Yes! Indian passport holders can apply online directly through the official Malawi eVisa portal (evisa.gov.mw)."
      },
      {
        "question": "How long can I stay in Malawi on an eVisa?",
        "answer": "Standard single-entry tourist eVisa grants a stay of up to 30 days, extendable locally at Immigration offices."
      },
      {
        "question": "Why is Lake Malawi famous?",
        "answer": "Lake Malawi contains more species of fish than any other lake in the world, including over 1,000 species of colorful cichlids."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Department of Immigration and Citizenship Services of Malawi (evisa.gov.mw)"
  },
  "zambia": {
    "overview": "Zambia, the birthplace of the legendary walking safari, is famous for sharing the awe-inspiring Victoria Falls (Mosi-oa-Tunya) with Zimbabwe, luxury wildlife safaris in South Luangwa National Park (the leopard capital of Africa), and canoeing among hippos in Lower Zambezi National Park. Indian passport holders can apply online for a tourist eVisa via eservices.zambiamigration.gov.zm or enter on the joint KAZA UniVisa.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Victoria Falls & Devil's Pool",
        "description": "Swim on the edge of the world's largest waterfall in Devil's Pool and marvel at the thundering falls from Livingstone."
      },
      {
        "icon": "🐆",
        "title": "South Luangwa National Park",
        "description": "Africa's premier walking safari destination with world-renowned densities of leopards, lions, and Thornicroft giraffes."
      },
      {
        "icon": "🛶",
        "title": "Lower Zambezi National Park",
        "description": "Canoeing safaris past elephant herds and hippo pods along the tranquil Zambezi River against the escarpment backdrop."
      },
      {
        "icon": "⚡",
        "title": "KAZA UniVisa / Online eVisa",
        "description": "Eligible for $50 KAZA UniVisa covering both Zambia and Zimbabwe, or direct online eVisa."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Zambia eVisa Approval Letter",
        "description": "Printed confirmation from eservices.zambiamigration.gov.zm.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Flight booking into Kenneth Kaunda Airport (LUN), Lusaka or Harry Mwaanga Nkumbula Airport (LVI), Livingstone.",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Safari Lodge Reservation",
        "description": "Proof of accommodation in Livingstone, Lusaka, or safari lodges.",
        "is_mandatory": true
      },
      {
        "title": "Cover Letter from Applicant",
        "description": "Letter addressed to Director General of Immigration stating travel dates and itinerary.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit the official Zambia Immigration electronic portal (eservices.zambiamigration.gov.zm).",
      "Upload Documents: Submit passport scan, portrait photo, cover letter, and return flight booking.",
      "Pay Fee Online: Pay $50 USD statutory single-entry fee by credit/debit card.",
      "Receive Approval Letter: Electronic Approval Letter is issued within 3 to 5 working days.",
      "Fly to Zambia: Arrive in Lusaka (LUN) or Livingstone (LVI).",
      "Border Stamping: Present approval letter to immigration officer to receive entry stamp."
    ],
    "fees": {
      "visa_fee": "$50 USD (Single Entry) / $80 (Double Entry) / $50 (KAZA UniVisa)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$50 USD (approx. ₹4,200 Total)",
      "notes": "Payable online or via the joint $50 KAZA UniVisa."
    },
    "proc_time": "3 to 5 Working Days (eVisa)",
    "proc_details": "Applied online through Zambia Department of Immigration.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "KAZA UniVisa",
        "details": "Allows 30 days of seamless travel between Zambia and Zimbabwe for $50 USD."
      },
      {
        "category": "Health",
        "details": "Yellow fever certificate required if arriving from yellow fever endemic areas."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,00,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Zambia?",
        "answer": "Yes, Indian passport holders can easily apply online for an eVisa at eservices.zambiamigration.gov.zm."
      },
      {
        "question": "What is Devil's Pool in Zambia?",
        "answer": "Devil's Pool is a natural rock infinity pool located on the Zambian edge of Victoria Falls on Livingstone Island, open for guided swimming in dry season."
      },
      {
        "question": "What is the KAZA UniVisa?",
        "answer": "The KAZA UniVisa costs $50 USD and allows 30 days of travel between Zambia and Zimbabwe, plus day trips into Botswana (Chobe)."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 30 Days per entry",
    "entry_type": "Single / Double Entry / KAZA UniVisa",
    "official_source": "Department of Immigration Zambia (zambiamigration.gov.zm)"
  },
  "botswana": {
    "overview": "Botswana is Africa's premier high-end eco-safari wonderland, home to the Okavango Delta (UNESCO)—the world's largest inland delta where the Kalahari desert blossoms into a maze of crystal waterways and islands—colossal elephant herds in Chobe National Park, and the otherworldly salt crusts of Makgadikgadi Pans. Indian passport holders can easily apply online for an official tourist eVisa via evisa.gov.bw.",
    "highlights": [
      {
        "icon": "🛶",
        "title": "Okavango Delta Mokoro Safaris (UNESCO)",
        "description": "Glide in traditional dug-out mokoro canoes past water lilies, elephants, and hippos through pristine inland delta lagoons."
      },
      {
        "icon": "🐘",
        "title": "Chobe National Park & River",
        "description": "Home to the world's highest concentration of African elephants (over 120,000) and sensational sunset riverboat safaris."
      },
      {
        "icon": "🦓",
        "title": "Makgadikgadi Salt Pans & Meerkats",
        "description": "Vast lunar salt flats, ancient baobab trees, zebra migrations, and habituated wild meerkat encounters."
      },
      {
        "icon": "⚡",
        "title": "Official Online eVisa Portal",
        "description": "Fast online processing on evisa.gov.bw with electronic approval letters issued within 3 to 7 business days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 3 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Botswana eVisa Approval",
        "description": "Printed electronic visa confirmation from evisa.gov.bw.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Maun (MUB), Kasane (BBK), or Gaborone (GBE).",
        "is_mandatory": true
      },
      {
        "title": "Safari Lodge / Hotel Confirmation",
        "description": "Confirmed booking in safari camps or hotels in Botswana.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Proof of financial sufficiency for travel.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit the official Botswana eVisa portal (evisa.gov.bw).",
      "Upload Documents: Submit passport biodata, passport photo, flight itinerary, and safari lodge confirmations.",
      "Pay Statutory Fee Online: Pay 300 BWP (approx. $25 USD) for single entry or 500 BWP for multiple entry.",
      "Receive Approval Letter: Official Electronic Visa is issued within 3 to 7 business days.",
      "Fly to Botswana: Fly to Maun (Okavango gateway) or Kasane (Chobe gateway).",
      "Border Clearance: Present approval letter and passport at immigration desk for entry stamp."
    ],
    "fees": {
      "visa_fee": "300 BWP (approx. $25 USD / ₹2,100 Single Entry)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "approx. ₹2,100 Total",
      "notes": "Highly affordable official government eVisa fee."
    },
    "proc_time": "3 to 7 Business Days (eVisa)",
    "proc_details": "Applied 100% online through the Department of Immigration and Citizenship of Botswana.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months with 3 blank pages."
      },
      {
        "category": "Children Travelling",
        "details": "Unabridged birth certificates required for minor children entering Botswana."
      },
      {
        "category": "Safari Vouchers",
        "details": "Detailed itinerary from safari operator speeds approval."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Botswana eVisa?",
        "answer": "Yes! Indian passport holders can apply online directly through the official Botswana eVisa portal (evisa.gov.bw)."
      },
      {
        "question": "What is the best gateway airport for Okavango Delta safaris?",
        "answer": "Maun International Airport (MUB) is the primary aviation hub and gateway for scenic bush flights into the Okavango Delta lodges."
      },
      {
        "question": "How much is the Botswana eVisa?",
        "answer": "The official single-entry tourist eVisa fee is only 300 BWP (approx. $25 USD / ₹2,100)."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single or Multiple Entry",
    "official_source": "Department of Immigration and Citizenship of Botswana (evisa.gov.bw)"
  },
  "namibia": {
    "overview": "Namibia, a surreal wonderland of extremes in Southwestern Africa, is famous for the colossal red sand dunes of Sossusvlei and the eerie white clay pan of Deadvlei (with 900-year-old dead camel thorn trees), dramatic ocean-meets-desert scenery along the Skeleton Coast, Etosha National Park's colossal salt pan wildlife, and the Bavarian-style coastal town of Swakopmund. Indian passport holders can apply for an online Visa on Arrival (VoA) / eVisa via the Ministry of Home Affairs.",
    "highlights": [
      {
        "icon": "🏜️",
        "title": "Sossusvlei & Deadvlei (UNESCO)",
        "description": "Climb 300-meter towering red sand dunes (Dune 45, Big Daddy) and marvel at ancient dead trees on bleached white clay."
      },
      {
        "icon": "🦁",
        "title": "Etosha National Park Wildlife",
        "description": "Self-drive wildlife safaris around a colossal white salt pan, home to lions, elephants, leopards, and black rhinos."
      },
      {
        "icon": "🌊",
        "title": "Skeleton Coast & Cape Cross",
        "description": "Wild ocean graveyard of shipwrecks shrouded in Atlantic mist and home to 100,000 Cape fur seals."
      },
      {
        "icon": "🏙️",
        "title": "Swakopmund Adventure Capital",
        "description": "German colonial seaside town famous for sandboarding, quad biking, skydiving, and fresh Atlantic oysters."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 3 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form / Online Pre-Approval",
        "description": "Completed Namibian visa form or online pre-approval.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Hosea Kutako Airport (WDH), Windhoek or Walvis Bay (WVB).",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Safari Lodge / Car Rental Booking",
        "description": "Proof of accommodation and 4x4 self-drive rental reservation.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay in Namibia.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online / Consular: Submit application via official portal (eservices.mhaiss.gov.na) or Embassy of Namibia in New Delhi.",
      "Upload / Submit Documents: Provide passport, photo, round-trip flights, 4x4 rental, and lodge bookings.",
      "Pay Statutory Fee: Pay 1,000 NAD (approx. $55 USD) visa fee.",
      "Receive Visa Stamping: Stamped into passport at embassy or issued upon arrival with pre-clearance.",
      "Arrive in Windhoek: Clear border immigration at Hosea Kutako International Airport."
    ],
    "fees": {
      "visa_fee": "1,000 NAD (approx. $55 USD / ₹4,600)",
      "service_fee": "₹0 (Direct)",
      "total_fee": "approx. ₹4,600 Total",
      "notes": "Payable in Namibian Dollars or South African Rand (ZAR)."
    },
    "proc_time": "5 to 10 Business Days",
    "proc_details": "Applied via Ministry of Home Affairs, Immigration, Safety and Security (MHAISS) or Embassy of Namibia New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond intended stay."
      },
      {
        "category": "Self-Drive Proof",
        "details": "Proof of confirmed 4x4 vehicle rental or safari tour package."
      },
      {
        "category": "Unabridged Birth Certificate",
        "details": "Required for minor children travelling to or through Namibia."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Namibia?",
        "answer": "Yes, Indian passport holders require a tourist visa, available via online pre-approval or the Embassy of Namibia in New Delhi."
      },
      {
        "question": "Is Namibia good for self-drive road trips?",
        "answer": "Yes! Namibia is internationally renowned as one of the best and safest self-drive road trip destinations in the world with well-maintained gravel roads."
      },
      {
        "question": "What is the currency in Namibia?",
        "answer": "The Namibian Dollar (NAD) is pegged 1:1 to the South African Rand (ZAR), and South African Rand cash is accepted everywhere in Namibia."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 30 to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Home Affairs, Immigration, Safety and Security of Namibia (mhaiss.gov.na)"
  },
  "angola": {
    "overview": "Angola is an undiscovered African gem boasting sensational natural spectacles: the thundering Kalandula Falls (one of Africa's largest waterfalls by volume), the serpentine cliff pass of Serra da Leba, the dramatic moonscapes of Miradouro da Lua, the lush Kissama National Park, and Portuguese colonial seaside forts in Luanda. Indian passport holders enjoy 30-day VISA-FREE entry under Presidential Decree 189/23! All other visitors can easily obtain an electronic tourist pre-visa online via sme.gov.ao.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Kalandula Falls",
        "description": "Spectacular 105-meter horseshoe waterfall on the Lucala River, among the largest and most powerful in Africa."
      },
      {
        "icon": "🛣️",
        "title": "Serra da Leba Pass",
        "description": "Iconic winding mountain hairpin road descending 1,800 meters through lush mist-shrouded green cliffs."
      },
      {
        "icon": "🌙",
        "title": "Miradouro da Lua (Moon Valley)",
        "description": "Otherworldly lunar cliffs and multicolored canyon formations overlooking the Atlantic Ocean south of Luanda."
      },
      {
        "icon": "✈️",
        "title": "VISA-FREE / Online eVisa Available",
        "description": "Indian passport holders can visit visa-free or obtain an instant pre-visa online via sme.gov.ao."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip flight booking to Quatro de Fevereiro International Airport (LAD), Luanda.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Proof of accommodation in Luanda or regional hotels.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Demonstrating minimum $200 USD per day of stay in Angola.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Visa Exemption: Indian tourists can travel visa-free for up to 30 days under Presidential Decree 189/23.",
      "Alternatively Apply for Online Pre-Visa: Fill out the simple online form on sme.gov.ao.",
      "Carry Mandatory Yellow Fever Card: Ensure yellow fever vaccine is valid at least 10 days before travel.",
      "Fly to Luanda: Arrive at Quatro de Fevereiro International Airport (LAD).",
      "Immigration Clearance: Present passport, return ticket, and yellow fever certificate to border control."
    ],
    "fees": {
      "visa_fee": "$0 (Visa-free) or $120 USD (Consular / Port Stamping)",
      "service_fee": "$0 (Direct Entry)",
      "total_fee": "$0 - $120 USD",
      "notes": "Indian passport holders can enter visa-free for tourism up to 30 days under Decree 189/23."
    },
    "proc_time": "Instant (on Arrival) or 2 to 3 Days (online pre-visa)",
    "proc_details": "Border entry at Luanda airport or online pre-visa via Migration and Foreigners Service (SME).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Yellow Fever Card",
        "details": "Mandatory for all arrivals at Luanda airport."
      },
      {
        "category": "Stay Limit",
        "details": "Maximum 30 days per entry, up to 90 days total per calendar year."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Card / Cash",
        "minimum_balance_or_amount": "USD $200 per day",
        "description": "Sufficient financial means."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens travel to Angola visa-free?",
        "answer": "Yes! Under Presidential Decree No. 189/23, citizens of India are exempt from tourist visas for stays of up to 30 days per entry (maximum 90 days per year)."
      },
      {
        "question": "Is Yellow Fever vaccine required for Angola?",
        "answer": "Yes. A valid Yellow Fever Certificate is strictly mandatory for entering Angola."
      },
      {
        "question": "What is Kalandula Falls?",
        "answer": "Kalandula Falls in Malanje province is one of Africa's largest waterfalls, spanning over 400 meters wide and dropping 105 meters."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Migration and Foreigners Service of Angola (SME - sme.gov.ao)"
  },
  "mozambique": {
    "overview": "Mozambique offers over 2,500 km of pristine turquoise Indian Ocean coastline, celebrated for the tropical islands of the Bazaruto Archipelago (home to rare dugongs, manta rays, and whale sharks), the historic Portuguese-Arab trading port of Mozambique Island (UNESCO), the coral reefs of Quirimbas, and Maputo's vibrant Afro-Portuguese seafood and jazz culture. Indian citizens can enter on an official tourist eVisa online via evisa.gov.mz.",
    "highlights": [
      {
        "icon": "🏝️",
        "title": "Bazaruto Archipelago (Marine National Park)",
        "description": "Idyllic white-sand barrier islands, towering dunes dropping into turquoise seas, coral reefs, and endangered dugongs."
      },
      {
        "icon": "🏰",
        "title": "Ilha de Moçambique (UNESCO)",
        "description": "Historic fortified coral-stone island trading capital with Portuguese, Arab, and Swahili architecture and Saint Sebastian Fort."
      },
      {
        "icon": "🤿",
        "title": "Tofo Beach & Manta Coast",
        "description": "World capital for swimming alongside giant manta rays, whale sharks, and seasonal humpback whales."
      },
      {
        "icon": "⚡",
        "title": "Official Online eVisa Available",
        "description": "Apply easily online at evisa.gov.mz with electronic approval issued within 3 to 5 business days."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved Mozambique eVisa Pre-Approval Letter",
        "description": "Printed confirmation from evisa.gov.mz.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Maputo International Airport (MPM) or Vilankulo (VNX).",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Resort Booking",
        "description": "Proof of accommodation in Mozambique.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Bank statements or credit card showing adequate travel allowance.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit official Mozambique eVisa portal (evisa.gov.mz).",
      "Upload Documents: Submit passport biodata scan, photo, flight ticket, and hotel booking.",
      "Receive Pre-Approval: Download your official Preliminary Visa Authorization issued within 3 to 5 days.",
      "Fly to Mozambique: Arrive in Maputo (MPM) or Vilankulo (VNX).",
      "Pay Fee & Stamping: Pay the $50 USD statutory visa fee at the airport immigration counter and receive entry stamp."
    ],
    "fees": {
      "visa_fee": "$50 USD (approx. ₹4,200 Statutory Visa Fee)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$50 USD Total",
      "notes": "Payable at port of entry with pre-approved eVisa letter."
    },
    "proc_time": "3 to 5 Business Days (eVisa)",
    "proc_details": "Applied online through the National Migration Service (SENAMI).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months from entry."
      },
      {
        "category": "Preliminary Authorization",
        "details": "Must print and present the SENAMI online approval letter upon arrival."
      },
      {
        "category": "Yellow Fever",
        "details": "Required if travelling from endemic countries."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,00,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Mozambique eVisa?",
        "answer": "Yes! Indian passport holders can apply online directly through the official Mozambique eVisa portal (evisa.gov.mz)."
      },
      {
        "question": "How long can I stay in Mozambique?",
        "answer": "The standard tourist visa grants a stay of 30 days, extendable up to 60 days locally at SENAMI offices."
      },
      {
        "question": "What is Bazaruto Archipelago famous for?",
        "answer": "Bazaruto Archipelago is famous for pristine coral reefs, azure sandbars, and hosting the largest remaining population of dugongs in East Africa."
      }
    ],
    "validity": "30 to 60 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "National Migration Service of Mozambique (SENAMI - evisa.gov.mz)"
  },
  "madagascar": {
    "overview": "Madagascar, the world's fourth-largest island and an isolated biodiversity paradise in the Indian Ocean, shelters wildlife found nowhere else on Earth: over 100 species of lemurs, the iconic giant baobabs of the Avenue of the Baobabs, the otherworldly razor-sharp limestone pinnacles of Tsingy de Bemaraha (UNESCO), and pristine tropical beaches on Nosy Be. Indian citizens can easily obtain a Visa on Arrival (VoA) or apply online via evisamada-mg.com.",
    "highlights": [
      {
        "icon": "🌳",
        "title": "Avenue of the Baobabs",
        "description": "Stunning row of majestic 800-year-old giant Grandidier's baobab trees along a red dirt road near Morondava."
      },
      {
        "icon": "🐒",
        "title": "Wild Lemur Encounters",
        "description": "Spot wild ring-tailed lemurs, indris (singing lemurs), and dancing sifakas in Andasibe-Mantadia and Ranomafana."
      },
      {
        "icon": "🪨",
        "title": "Tsingy de Bemaraha (UNESCO)",
        "description": "Spectacular forest of razor-sharp eroded limestone pinnacles, suspension bridges, and subterranean caves."
      },
      {
        "icon": "🏖️",
        "title": "Nosy Be Tropical Island",
        "description": "Perfume island famous for ylang-ylang plantations, turquoise waters, whale shark snorkeling, and luxury beach resorts."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking departing Madagascar within 60 days.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Booking",
        "description": "Proof of accommodation in Antananarivo, Nosy Be, or national parks.",
        "is_mandatory": true
      },
      {
        "title": "eVisa Confirmation (if applied online)",
        "description": "Electronic Visa confirmation from evisamada-mg.com or obtain on arrival.",
        "is_mandatory": false
      }
    ],
    "steps": [
      "Select Application Route: Apply online on evisamada-mg.com or obtain Visa on Arrival at Ivato Airport.",
      "Book Flights & Accommodations: Secure round-trip flights into Antananarivo (TNR) or Nosy Be (NOS).",
      "Fly to Madagascar: Board flight to Antananarivo or Nosy Be.",
      "Pay Visa Fee at Border: Pay the €10 (15 days) or €35 (30 days) fee at the airport immigration counter.",
      "Passport Stamping: Receive official visa sticker and entry stamp."
    ],
    "fees": {
      "visa_fee": "€10 (up to 15 Days) / €35 (up to 30 Days) / €40 (up to 60 Days)",
      "service_fee": "$0 (Direct at Airport)",
      "total_fee": "€10 - €35 (approx. ₹900 - ₹3,150)",
      "notes": "Payable in Euros, US Dollars, or Malagasy Ariary (MGA) at airport immigration."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted instantly at Ivato International Airport (Antananarivo) or Fascene Airport (Nosy Be).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket strictly required."
      },
      {
        "category": "Stay Limit",
        "details": "Tourists can stay up to 60 days on standard tourist visa."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Proof of funds for island travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Madagascar?",
        "answer": "Yes! Indian passport holders can easily obtain a Visa on Arrival at Ivato International Airport (Antananarivo) or Nosy Be airport for up to 60 days."
      },
      {
        "question": "How much does the Madagascar tourist visa cost?",
        "answer": "The fee is just €10 for stays up to 15 days, or €35 for stays up to 30 days."
      },
      {
        "question": "What percentage of wildlife in Madagascar is endemic?",
        "answer": "Over 90% of Madagascar's wildlife—including all species of lemurs and half of the world's chameleons—is found nowhere else on Earth!"
      }
    ],
    "validity": "Up to 60 Days on Arrival",
    "stay_duration": "15 to 60 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Public Security of Madagascar (evisamada-mg.com)"
  },
  "comoros": {
    "overview": "The Union of the Comoros, known as the 'Perfume Islands' in the Mozambique Channel, is famous for active volcanic landscapes (Mount Karthala), lush rainforests with giant fruit bats, fragrant vanilla and ylang-ylang plantations, white-sand beaches, and ancient coelacanth fish waters. Indian passport holders enjoy convenient VISA ON ARRIVAL at Prince Said Ibrahim International Airport in Moroni.",
    "highlights": [
      {
        "icon": "🌋",
        "title": "Mount Karthala Active Volcano",
        "description": "2,361-meter active volcano on Grande Comore with one of the largest active volcanic calderas in the world (3x4 km)."
      },
      {
        "icon": "🌺",
        "title": "The Perfume Islands",
        "description": "Vast hillside plantations of fragrant ylang-ylang, cloves, vanilla, and nutmeg perfuming the ocean air."
      },
      {
        "icon": "🏖️",
        "title": "Mohéli Marine Park",
        "description": "Protected island sanctuary where giant green sea turtles nest year-round and humpback whales breed."
      },
      {
        "icon": "🐟",
        "title": "Coelacanth Living Fossils",
        "description": "Marine home to the prehistoric coelacanth fish, once thought to be extinct for 65 million years."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Prince Said Ibrahim Airport (HAH), Moroni.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Accommodation Proof",
        "description": "Proof of lodging in Moroni or Mohéli.",
        "is_mandatory": true
      },
      {
        "title": "Visa Fee in Cash",
        "description": "€30 / $50 USD in cash payable at airport immigration counter.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights to Moroni: Reserve flights arriving into Prince Said Ibrahim International Airport (HAH).",
      "Prepare Travel Documents: Carry passport valid for 6 months, return air ticket, and hotel booking.",
      "Arrive in Moroni: Land at Prince Said Ibrahim Airport on Grande Comore.",
      "Pay Fee at Immigration: Pay €30 / $50 USD at the visa on arrival counter.",
      "Receive Entry Stamp: Border control stamps your 45-day tourist visa into your passport."
    ],
    "fees": {
      "visa_fee": "€30 or $50 USD (approx. ₹2,700 - ₹4,200)",
      "service_fee": "$0 (Direct at Airport)",
      "total_fee": "approx. ₹2,700 - ₹4,200 Total",
      "notes": "Payable in cash (Euros or USD) upon arrival at Moroni airport."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted upon arrival at Prince Said Ibrahim International Airport (Moroni).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Visa on Arrival",
        "details": "All international visitors can obtain a 45-day visa on arrival."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return ticket strictly verified before boarding."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Proof of funds for island stay."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Comoros?",
        "answer": "Yes! Indian passport holders receive a Visa on Arrival for up to 45 days upon landing at Moroni airport."
      },
      {
        "question": "How much is the Comoros visa on arrival?",
        "answer": "The fee is €30 or $50 USD, payable in cash at the airport border desk."
      },
      {
        "question": "What is Mohéli known for?",
        "answer": "Mohéli is famous for its UNESCO Biosphere Reserve, where giant green sea turtles lay eggs on nesting beaches every single night of the year."
      }
    ],
    "validity": "45 Days on Arrival",
    "stay_duration": "Up to 45 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Interior and Immigration of the Union of the Comoros"
  },
  "cape-verde": {
    "overview": "Cape Verde (Cabo Verde), an archipelago of 10 volcanic islands off the coast of Senegal, is famous for its year-round sunshine, golden sand beaches and turquoise waters on Sal and Boa Vista, active volcanic peaks of Fogo, dramatic hiking valleys of Santo Antão, and vibrant 'Morna' Creole music heritage in Mindelo (São Vicente). Indian citizens can easily pre-register online via the EASE platform (ease.gov.cv) and receive a Visa on Arrival.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Sal & Boa Vista Island Beaches",
        "description": "Endless golden sand dunes meeting turquoise waters, kite surfing, and luxury beach resorts at Santa Maria."
      },
      {
        "icon": "🌋",
        "title": "Pico do Fogo Volcano",
        "description": "Spectacular 2,829-meter active volcanic peak rising from black ash plains; taste unique volcanic wines in Chã das Caldeiras."
      },
      {
        "icon": "🎵",
        "title": "Mindelo Music & Culture (São Vicente)",
        "description": "The cultural capital of Cape Verde, birthplace of legendary singer Cesária Évora and vibrant carnival celebrations."
      },
      {
        "icon": "⛰️",
        "title": "Santo Antão Hiking Valleys",
        "description": "Dramatic mountain ravines, terraced green valleys, and coastal hiking trails above crashing Atlantic waves."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "EASE Online Pre-Registration Form",
        "description": "Completed online at ease.gov.cv at least 5 days prior to arrival.",
        "is_mandatory": true
      },
      {
        "title": "Airport Security Fee (TSA) Payment",
        "description": "Payment receipt of 3,400 CVE (approx. €31) paid via EASE platform.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Sal (SID), Praia (RAI), or Boa Vista (BVC).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Booking / Accommodation Proof",
        "description": "Proof of stay in Cape Verde.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Pre-Register on EASE: Visit the official EASE portal (ease.gov.cv) at least 5 days before your trip.",
      "Pay Airport Security Fee (TSA): Pay the 3,400 CVE (approx. €31) statutory fee online by card.",
      "Fly to Cape Verde: Board flight to Sal Island (SID) or Praia (RAI).",
      "Visa on Arrival Counter: Present passport and EASE confirmation at immigration desk.",
      "Pay Visa on Arrival Fee: Pay the €25 tourist visa fee (or entry stamp) to receive entry stamp."
    ],
    "fees": {
      "visa_fee": "€25 (Visa on Arrival) + €31 (Airport Security Fee TSA)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "approx. €56 (₹5,000 Total)",
      "notes": "TSA fee paid online via ease.gov.cv; visa fee paid upon arrival."
    },
    "proc_time": "Instant on Arrival (with EASE pre-registration)",
    "proc_details": "Granted at Amílcar Cabral Airport (Sal), Nelson Mandela Airport (Praia), or Aristides Pereira (Boa Vista).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "EASE Pre-Registration",
        "details": "Mandatory online registration on ease.gov.cv before boarding flight."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket required."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Proof of funds for island travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Cape Verde?",
        "answer": "Yes! Indian passport holders can obtain a Visa on Arrival for up to 30 days after completing the online EASE pre-registration at ease.gov.cv."
      },
      {
        "question": "What is the EASE platform?",
        "answer": "EASE is Cape Verde's official online traveler pre-registration portal where visitors submit passport details and pay the statutory Airport Security Tax (TSA)."
      },
      {
        "question": "Which Cape Verde island is best for beaches?",
        "answer": "Sal Island (Santa Maria beach) and Boa Vista are world-famous for long white-sand beaches and watersports."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Direção de Emigração e Fronteiras de Cabo Verde (ease.gov.cv)"
  },
  "sao-tome": {
    "overview": "São Tomé and Príncipe, the 'Chocolate Islands' on the equator in the Gulf of Guinea, is an unspoiled tropical paradise of lush jungle, soaring volcanic plugs (Cão Grande peak), historic Portuguese cocoa plantation estates (roças), deserted golden beaches, and the 'Leve Leve' (take it easy) way of life. Indian citizens can apply online for an official tourist eVisa via evisa.st.",
    "highlights": [
      {
        "icon": "🍫",
        "title": "Historic Cocoa Roças & Chocolate",
        "description": "Tour historic 19th-century Portuguese cocoa plantations (Roça Agostinho Neto, Roça Sundy) and taste world-class organic chocolate."
      },
      {
        "icon": "⛰️",
        "title": "Pico Cão Grande Volcanic Needle",
        "description": "Dramatic 663-meter sheer needle-shaped volcanic plug rising vertically out of pristine primary rainforest in Obo National Park."
      },
      {
        "icon": "🏖️",
        "title": "Banana Beach & Praia Inhame",
        "description": "Picture-perfect palm-fringed tropical golden sand beaches on Príncipe and São Tomé."
      },
      {
        "icon": "🐢",
        "title": "Sea Turtle Nesting Sanctuaries",
        "description": "Witness hawksbill, green, and leatherback sea turtles nesting on protected equatorial beaches."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved São Tomé eVisa Approval Letter",
        "description": "Printed electronic visa approval from evisa.st.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into São Tomé International Airport (TMS).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Roça Lodge Booking",
        "description": "Proof of accommodation in São Tomé or Príncipe.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit official São Tomé eVisa portal (evisa.st).",
      "Fill Application: Submit personal biodata, passport scan, and travel dates.",
      "Receive Approval PDF: Official Visa Approval is emailed within 3 to 7 business days.",
      "Fly to São Tomé: Board flights arriving into São Tomé International Airport (TMS).",
      "Pay Fee & Stamping: Pay €20 statutory fee at airport border control to receive visa entry stamp."
    ],
    "fees": {
      "visa_fee": "€20 (approx. $22 USD / ₹1,800)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "approx. ₹1,800 Total",
      "notes": "Payable in cash (Euros) upon arrival with eVisa approval letter."
    },
    "proc_time": "3 to 7 Business Days (eVisa)",
    "proc_details": "Applied online through the Migration and Border Service (SMF - evisa.st).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond intended stay."
      },
      {
        "category": "Yellow Fever Card",
        "details": "Mandatory for all arrivals at São Tomé airport."
      },
      {
        "category": "Approval Letter",
        "details": "Must print and present the evisa.st approval letter to airline and immigration."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (Euros)",
        "minimum_balance_or_amount": "€50 per day",
        "description": "Euros cash is widely accepted across the islands."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a São Tomé & Príncipe eVisa?",
        "answer": "Yes! Indian passport holders can apply online directly through the official government portal (evisa.st)."
      },
      {
        "question": "Why are São Tomé & Príncipe called the Chocolate Islands?",
        "answer": "In the early 1900s, São Tomé and Príncipe was the world's largest producer of cocoa and is famous for high-grade organic chocolate."
      },
      {
        "question": "What is the national motto in São Tomé?",
        "answer": "'Leve Leve'—meaning 'take it easy' and live life slowly and peacefully."
      }
    ],
    "validity": "30 Days from Date of Arrival",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Migration and Border Service of São Tomé and Príncipe (SMF - evisa.st)"
  },
  "afghanistan": {
    "overview": "Afghanistan is an ancient crossroads of Central and South Asia with millennia of Silk Road history. Historic sites include the ancient Minaret of Jam (UNESCO), the blue-tiled Shrine of Hazrat Ali in Mazar-i-Sharif, the dramatic turquoise lakes of Band-e-Amir National Park, and the ancient ruins of Balkh (Mother of Cities). Indian passport holders require a consular tourist visa issued by an official Afghan diplomatic mission.",
    "highlights": [
      {
        "icon": "🕌",
        "title": "Blue Mosque of Mazar-i-Sharif",
        "description": "Splendid turquoise Persian tilework and minarets at the Shrine of Hazrat Ali."
      },
      {
        "icon": "🌊",
        "title": "Band-e-Amir National Park",
        "description": "Six breathtaking cobalt-blue travertine lakes surrounded by soaring Hindu Kush limestone cliffs in Bamyan."
      },
      {
        "icon": "🏛️",
        "title": "Minaret of Jam (UNESCO)",
        "description": "Graceful 65-meter 12th-century brick minaret rising dramatically from a remote river canyon in Ghor province."
      },
      {
        "icon": "🏺",
        "title": "Ancient Citadel of Herat",
        "description": "Historic fortress rebuilt by Alexander the Great and restored Timurid tiled mosques."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form",
        "description": "Completed consular visa application form.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Kabul International Airport (KBL).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Host Invitation",
        "description": "Proof of accommodation in Kabul or regional centers.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Submit at Embassy: Apply for a consular tourist visa at an authorized Afghan embassy or consulate.",
      "Provide Required Documents: Submit passport, photo, flight booking, and accommodation details.",
      "Pay Consular Fee: Pay $50 - $100 USD visa fee.",
      "Receive Visa Sticker: Collect stamped passport.",
      "Border Clearance: Clear immigration at Kabul International Airport."
    ],
    "fees": {
      "visa_fee": "$50 - $100 USD",
      "service_fee": "Consular logistics",
      "total_fee": "approx. ₹5,000 - ₹9,000",
      "notes": "Issued via diplomatic missions."
    },
    "proc_time": "7 to 15 Working Days",
    "proc_details": "Processed via authorized Afghan diplomatic missions.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for minimum 6 months from travel date."
      },
      {
        "category": "Permits",
        "details": "Tourists must register and obtain travel permits from local authorities when travelling between provinces."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statements / Cash",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Proof of travel funds."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Afghanistan?",
        "answer": "Yes, Indian passport holders require a consular tourist visa issued by an official Afghan diplomatic mission before travel."
      },
      {
        "question": "What is Band-e-Amir?",
        "answer": "Band-e-Amir is Afghanistan's first national park, featuring 6 deep natural cobalt-blue travertine lakes in the Bamyan valley."
      }
    ],
    "validity": "30 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of Afghanistan"
  },
  "iran": {
    "overview": "Iran, the glorious land of ancient Persia, enchants visitors with 2,500 years of civilization: the colossal stone palaces of Persepolis (UNESCO), the dazzling turquoise domes and grand Naqsh-e Jahan Square of Isfahan, the Persian gardens and poetic shrines of Shiraz, the wind-catchers of desert oasis Yazd, and the snow-capped Alborz mountains of Tehran. Indian passport holders can enter VISA-FREE for tourism for up to 15 days (by air) under the 2024 visa waiver decree!",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Persepolis (Takht-e Jamshid)",
        "description": "The monumental 6th-century BC ceremonial capital of the Persian Achaemenid Empire built by Darius the Great."
      },
      {
        "icon": "🕌",
        "title": "Isfahan: Half the World (Naqsh-e Jahan)",
        "description": "Grand UNESCO square with Shah Mosque, Sheikh Lotfollah Mosque, Ali Qapu Palace, and Khaju bridge."
      },
      {
        "icon": "🌹",
        "title": "Shiraz: City of Poets & Gardens",
        "description": "Pink Mosque (Nasir al-Mulk) with kaleidoscope stained glass, Persian gardens, and tombs of Hafez and Saadi."
      },
      {
        "icon": "✈️",
        "title": "15-Day VISA-FREE for Indian Citizens",
        "description": "Indian passport holders enter Iran 100% VISA-FREE for up to 15 days when travelling by air."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Round-trip flight booking to Tehran Imam Khomeini Airport (IKA) or Shiraz (SYZ).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Proof of accommodation in Tehran, Isfahan, or Shiraz.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid for the entire stay in Iran.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Visa-Free Eligibility: Indian citizens entering by air for tourism enjoy 15-day visa-free entry.",
      "Book Flights: Book round-trip air tickets into Tehran (IKA) or Shiraz (SYZ).",
      "Ensure Passport Validity: Passport must be valid for at least 6 months.",
      "Board Flight: Fly to Iran without needing a consular visa sticker.",
      "Immigration Clearance: Present passport, return ticket, and hotel booking at Tehran airport immigration."
    ],
    "fees": {
      "visa_fee": "₹0 (Visa-Free for 15 Days)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy 15-day visa-free entry by air under the 2024 reciprocal decree."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted at Imam Khomeini International Airport (Tehran) and international airport borders.",
    "requirements": [
      {
        "category": "Visa Exemption Terms",
        "details": "Indian citizens entering by air for tourism can enter without a visa once every 6 months for up to 15 non-extendable days."
      },
      {
        "category": "Entry Method",
        "details": "The visa-free facility applies exclusively to arrivals by air (not land borders)."
      },
      {
        "category": "Passport Stamping",
        "details": "Iran stamps an electronic entry slip without marking physical passport pages."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Foreign Currency",
        "minimum_balance_or_amount": "USD $500 or €500",
        "description": "International bank cards do not operate in Iran due to sanctions; bring cash (EUR/USD) to exchange locally."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Iran?",
        "answer": "No! Under the visa waiver decree enacted in 2024, Indian passport holders can enter Iran VISA-FREE for up to 15 days when travelling by air for tourism."
      },
      {
        "question": "Can I use international credit cards in Iran?",
        "answer": "No. Due to international banking sanctions, Visa and Mastercard do not work in Iran. You must bring cash (Euros or USD) to exchange for Iranian Rials upon arrival or obtain a tourist MahCard."
      },
      {
        "question": "Does Iran stamp passports?",
        "answer": "No. Iranian immigration issues an electronic entry record without placing physical ink stamps or stickers in your passport."
      }
    ],
    "validity": "15 Days on Arrival",
    "stay_duration": "Up to 15 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of the Islamic Republic of Iran (evisa.mfa.ir)"
  },
  "iraq": {
    "overview": "Iraq, the ancient Cradle of Civilization (Mesopotamia), boasts the world's most historic landmarks: ancient Babylon with the Ishtar Gate ruins, the great Ziggurat of Ur (birthplace of Prophet Abraham), the Mesopotamian Marshes (UNESCO), the holy shrines of Najaf and Karbala, and the vibrant souqs of Baghdad and Erbil (Iraqi Kurdistan). Indian passport holders can obtain an official Visa on Arrival (VoA) for religious and cultural tourism or apply for an eVisa via evisa.iq.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Babylon & Ishtar Gate Ruins",
        "description": "The legendary Mesopotamian imperial city of Nebuchadnezzar II and King Hammurabi along the Euphrates River."
      },
      {
        "icon": "🕌",
        "title": "Holy Shrines of Najaf & Karbala",
        "description": "The magnificent golden-domed Shrines of Imam Ali and Imam Husayn, sacred pilgrimage destinations for millions."
      },
      {
        "icon": "🏺",
        "title": "Ziggurat of Ur",
        "description": "Colossal 4,000-year-old Sumerian stepped pyramidal temple in ancient Ur, the home of Prophet Abraham (UNESCO)."
      },
      {
        "icon": "🌿",
        "title": "Mesopotamian Ahwar Marshes",
        "description": "The historic biblical wetlands where the Tigris and Euphrates rivers meet, navigated by traditional mashoof reed boats."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa on Arrival Approval / eVisa Slip",
        "description": "Electronic visa approval from evisa.iq or VoA authorization.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Baghdad (BGW), Najaf (NJF), or Erbil (EBL).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Pilgrimage Tour Voucher",
        "description": "Proof of accommodation in Baghdad, Najaf, or Erbil.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Valid travel medical insurance.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online or On Arrival: Apply for an eVisa at evisa.iq or prepare for Visa on Arrival at airport.",
      "Book Flights: Reserve round-trip flights into Baghdad (BGW), Najaf (NJF), or Erbil (EBL).",
      "Fly to Iraq: Arrive at airport immigration.",
      "Pay Statutory Fee: Pay $75 - $80 USD visa fee at airport counter.",
      "Medical Screening: Complete brief health/blood screening at airport if required.",
      "Receive Entry Stamp: Border control stamps your 30-to-60 day visa into your passport."
    ],
    "fees": {
      "visa_fee": "$75 - $80 USD (Visa on Arrival / eVisa Fee)",
      "service_fee": "₹0 (Direct Border)",
      "total_fee": "$75 - $80 USD (approx. ₹6,300 - ₹6,800)",
      "notes": "Payable in cash (USD) or online for eVisa."
    },
    "proc_time": "Instant on Arrival (0 Days) or 3-5 Days (eVisa)",
    "proc_details": "Granted at Baghdad International Airport, Najaf Airport, and Erbil International Airport.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months without Israeli stamps."
      },
      {
        "category": "Kurdistan Region",
        "details": "Erbil and Sulaymaniyah in Iraqi Kurdistan issue an independent regional eVisa (visit.gov.krd) allowing 30 days entry."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (USD)",
        "minimum_balance_or_amount": "USD $500",
        "description": "US Dollar cash is widely accepted and used."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Iraq?",
        "answer": "Yes! Indian passport holders can receive a Visa on Arrival at major international airports in Iraq (Baghdad, Najaf, Basra, Erbil) for $75-$80 USD."
      },
      {
        "question": "Can I visit Iraqi Kurdistan on the same visa?",
        "answer": "A federal Iraqi visa allows travel throughout Iraq including Kurdistan. Alternatively, visitors travelling solely to Erbil can apply for a Kurdistan regional eVisa online via visit.gov.krd."
      },
      {
        "question": "What is the Ziggurat of Ur?",
        "answer": "The Ziggurat of Ur is a colossal ancient Sumerian terraced pyramid built over 4,000 years ago during the Bronze Age."
      }
    ],
    "validity": "30 to 60 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Interior of Iraq (evisa.iq) & KRG Interior Ministry (visit.gov.krd)"
  },
  "syria": {
    "overview": "Syria is a historic cradle of ancient Mediterranean civilizations. Marvel at the grand Umayyad Mosque and ancient covered souq Al-Hamidiyah in Damascus (the oldest continuously inhabited capital in the world), the monumental Roman desert oasis of Palmyra (UNESCO), the medieval Crusader castle Crac des Chevaliers, and Aleppo's ancient citadel. Indian passport holders apply for an electronic security clearance or consular tourist visa via evisa.sy.",
    "highlights": [
      {
        "icon": "🕌",
        "title": "Old City of Damascus & Umayyad Mosque",
        "description": "UNESCO World Heritage ancient walled city with the monumental 8th-century Umayyad Mosque and Roman streets."
      },
      {
        "icon": "🏰",
        "title": "Crac des Chevaliers (Qal'at al-Hosn)",
        "description": "One of the most important and best-preserved medieval Crusader castles in the world."
      },
      {
        "icon": "🏛️",
        "title": "Palmyra (Tadmor)",
        "description": "Monumental Greco-Roman colonnaded desert oasis city and Temple of Bel in the Syrian Desert."
      },
      {
        "icon": "🏺",
        "title": "Citadel of Aleppo",
        "description": "Colossal medieval fortified palace towering above the ancient city of Aleppo."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months (strictly no Israeli stamps).",
        "is_mandatory": true
      },
      {
        "title": "Approved Syrian eVisa / Security Clearance",
        "description": "Electronic pre-approval obtained via official portal (evisa.sy).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Travel Itinerary / Hotel Booking",
        "description": "Proof of accommodation in Damascus or authorized tour package.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online via eVisa Portal: Visit the official Syrian eVisa platform (evisa.sy).",
      "Submit Personal Details: Provide passport biodata scan, photo, and travel dates.",
      "Receive Security Approval: Electronic Visa Authorization is issued within 5 to 10 working days.",
      "Travel to Syria: Fly into Damascus International Airport (DAM) or enter via Beirut overland border.",
      "Pay Fee at Border: Pay the $50 - $75 USD statutory visa fee at border control."
    ],
    "fees": {
      "visa_fee": "$50 - $75 USD",
      "service_fee": "$0 (Direct Online)",
      "total_fee": "approx. ₹4,200 - ₹6,300 Total",
      "notes": "Payable at border upon presenting approved eVisa clearance."
    },
    "proc_time": "5 to 10 Working Days (eVisa)",
    "proc_details": "Applied online via the official Syrian eVisa portal (evisa.sy).",
    "requirements": [
      {
        "category": "Passport Restrictions",
        "details": "Passports containing any Israeli entry/exit stamps or visas will be strictly denied entry."
      },
      {
        "category": "Security Approval",
        "details": "Prior electronic approval from evisa.sy is mandatory before travel."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (USD / EUR)",
        "minimum_balance_or_amount": "USD $500",
        "description": "Bring cash as foreign credit cards do not work in Syria."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Syrian visa online?",
        "answer": "Yes! The Syrian government operates an official electronic visa portal at evisa.sy where travellers can submit applications for security pre-clearance."
      },
      {
        "question": "Can I travel to Syria with an Israeli stamp in my passport?",
        "answer": "No. Syrian border control strictly refuses entry to any passport containing Israeli stamps, visas, or border crossing markers."
      },
      {
        "question": "What is the oldest capital city in the world?",
        "answer": "Damascus is widely recognized as the world's oldest continually inhabited national capital city."
      }
    ],
    "validity": "30 to 90 Days",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Tourism & Ministry of Interior of the Syrian Arab Republic (evisa.sy)"
  },
  "lebanon": {
    "overview": "Lebanon, the sparkling pearl of the Eastern Mediterranean, enchants visitors with world-class Roman temples at Baalbek (UNESCO), the picturesque Phoenician seaport of Byblos (one of the oldest continuously inhabited towns on Earth), Beirut's cosmopolitan dining, nightlife, and seaside Corniche, the subterranean limestone grottos of Jeita, and the snow-capped Cedars of God. Indian passport holders enjoy VISA ON ARRIVAL at Beirut-Rafic Hariri Airport (BEY) provided they hold a confirmed hotel booking and $2,000 USD cash/equivalent.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Roman Temples of Baalbek (UNESCO)",
        "description": "The colossal Temple of Jupiter, Temple of Bacchus, and Temple of Venus, among the greatest Roman temples ever built."
      },
      {
        "icon": "⛵",
        "title": "Byblos (Jbeil) Phoenician Port",
        "description": "Ancient 7,000-year-old Phoenician harbour, Crusader castle, and seaside restaurants along the Mediterranean."
      },
      {
        "icon": "🏙️",
        "title": "Beirut: Paris of the Middle East",
        "description": "Vibrant nightlife in Mar Mikhaël and Gemmayzeh, Raouché Pigeon Rocks, and National Museum."
      },
      {
        "icon": "🌲",
        "title": "Cedars of God & Qadisha Valley",
        "description": "Ancient high-altitude cedar forests mentioned in the Epic of Gilgamesh and cliff-hanging Christian monasteries."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months (strictly no Israeli stamps).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Reservation",
        "description": "Confirmed booking at a registered 3-to-5-star hotel in Lebanon.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into Beirut-Rafic Hariri Airport (BEY).",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means (Cash)",
        "description": "Minimum $2,000 USD in cash (or certified bank card limit) required for Visa on Arrival.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Passport: Verify passport has at least 6 months validity and ZERO Israeli stamps.",
      "Book Flights & Hotel: Secure confirmed round-trip flights to Beirut and prepaid hotel booking voucher.",
      "Prepare Cash: Carry $2,000 USD in cash or equivalent (mandatory border check for Indian nationals).",
      "Fly to Beirut: Arrive at Beirut-Rafic Hariri International Airport (BEY).",
      "Immigration VoA Desk: Present passport, hotel voucher, flight ticket, and show $2,000 cash.",
      "Receive Free Visa Stamp: Border police stamp a free 30-day tourist entry visa into your passport."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Statutory Visa on Arrival Fee)",
      "service_fee": "₹0 (Direct Border Entry)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Tourist Visa on Arrival is completely free for Indian citizens holding hotel booking and $2,000 USD cash."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted at Beirut-Rafic Hariri International Airport (BEY).",
    "requirements": [
      {
        "category": "Israeli Stamp Prohibition",
        "details": "Passports containing any Israeli stamps, visas, or border markers will be strictly denied entry and deported."
      },
      {
        "category": "Mandatory Cash Check",
        "details": "Indian citizens must show $2,000 USD in cash (or credit card with equivalent limit) and confirmed hotel reservation at the airport."
      },
      {
        "category": "Stay Duration",
        "details": "30 days granted on arrival, extendable up to 90 days at Sûreté Générale."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (USD)",
        "minimum_balance_or_amount": "USD $2,000 in cash",
        "description": "Mandatory cash check enforced by General Security at Beirut Airport."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Lebanon?",
        "answer": "Yes! Indian passport holders are granted a FREE 30-day Visa on Arrival at Beirut Airport, provided they have a confirmed hotel reservation and carry $2,000 USD in cash."
      },
      {
        "question": "Can I enter Lebanon if I have an Israeli stamp?",
        "answer": "NO. Lebanese immigration law strictly forbids entry to anyone holding a passport with an Israeli stamp, visa, or land border mark."
      },
      {
        "question": "What is Baalbek famous for?",
        "answer": "Baalbek in the Bekaa Valley contains the monumental Temple of Bacchus—one of the best-preserved and grandest Roman temple sanctuaries in existence."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "General Directorate of General Security of Lebanon (surete-generale.gov.lb)"
  },
  "yemen": {
    "overview": "Yemen is home to ancient South Arabian architectural marvels: the ancient mud skyscraper city of Shibam (the 'Manhattan of the Desert' - UNESCO), the gingerbread stained-glass tower houses of Old Sana'a, the medieval cliff villages of the Haraz Mountains, and the ecological paradise of Socotra Island—celebrated as the 'Galápagos of the Indian Ocean' for its dragon's blood trees, white sand dunes, and pristine coral reefs. Indian passport holders require a visa arranged via a licensed tour agency.",
    "highlights": [
      {
        "icon": "🐉",
        "title": "Socotra Island: Alien Paradise (UNESCO)",
        "description": "The world's most isolated biodiversity island: bizarre umbrella-shaped Dragon's Blood trees, bottle trees, and pristine beaches."
      },
      {
        "icon": "🏙️",
        "title": "Shibam: Manhattan of the Desert (UNESCO)",
        "description": "Ancient 16th-century 10-story high-rise mud-brick skyscrapers rising out of the desert floodplains in Hadramawt."
      },
      {
        "icon": "🏛️",
        "title": "Old City of Sana'a (UNESCO)",
        "description": "Spectacular multi-story rammed-earth tower houses adorned with geometric white gypsum friezes and qamariya stained glass."
      },
      {
        "icon": "⛰️",
        "title": "Haraz Mountain Fortresses",
        "description": "Ancient stone citadel villages perched dramatically on knife-edge peaks surrounded by agricultural terraces."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages (no Israeli stamps).",
        "is_mandatory": true
      },
      {
        "title": "Official Yemen Entry Visa / Socotra Security Clearance",
        "description": "Arranged via licensed tour agency and Ministry of Interior.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Direct flights to Socotra (Air Arabia / Yemenia) or Aden (ADE).",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Authorized Tour Operator: Contact an authorized local agency for Socotra or mainland Yemen.",
      "Receive Immigration Pre-Approval: Operator submits passport copy to immigration authorities in Aden/Socotra.",
      "Obtain Paper Visa Slip: Receive official stamped visa document PDF issued within 5 to 10 days.",
      "Fly to Socotra / Aden: Fly via direct weekly flights from Abu Dhabi (AUH) or Cairo.",
      "Border Clearance: Present paper visa slip and passport to receive entry stamp."
    ],
    "fees": {
      "visa_fee": "$100 - $150 USD (Visa and Processing Fee)",
      "service_fee": "Included in tour package",
      "total_fee": "approx. ₹8,400 - ₹12,500 Total",
      "notes": "Typically processed through Socotra licensed tour operators."
    },
    "proc_time": "5 to 10 Business Days",
    "proc_details": "Issued via Yemen Immigration Authority / Socotra Department of Immigration.",
    "requirements": [
      {
        "category": "Israeli Stamp Prohibition",
        "details": "Passports containing Israeli stamps are strictly barred from entry."
      },
      {
        "category": "Socotra Travel",
        "details": "Socotra Island requires an authorized security visa clearance letter before boarding flights from Abu Dhabi."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (USD)",
        "minimum_balance_or_amount": "USD $1,000",
        "description": "All transactions in Socotra/Yemen require US Dollar cash."
      }
    ],
    "faqs": [
      {
        "question": "How do tourists visit Socotra Island?",
        "answer": "Visitors book through a registered Socotra tour operator, who secures the official Yemeni visa clearance letter allowing you to board the dedicated direct flights from Abu Dhabi."
      },
      {
        "question": "What is the Dragon's Blood Tree?",
        "answer": "The Dragon's Blood Tree (Dracaena cinnabari) is an ancient umbrella-shaped tree endemic to Socotra that produces thick red resin used for centuries in medicine and dyes."
      },
      {
        "question": "Can I visit mainland Yemen?",
        "answer": "Visits to mainland Yemen require specialized tour coordination and security clearances through local agencies."
      }
    ],
    "validity": "30 Days from Date of Issue",
    "stay_duration": "Up to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Yemen Immigration and Passport Authority"
  },
  "palestine": {
    "overview": "Palestine is steeped in profound millennia-old biblical, Islamic, and World Heritage history: the Church of the Nativity in Bethlehem (UNESCO - birthplace of Jesus Christ), ancient Jericho (one of the oldest continually inhabited cities on Earth, 10,000 years old), the historic Old City of Hebron with the Tomb of the Patriarchs (Ibrahimi Mosque), and the vibrant cultural center of Ramallah. International visitors enter through border crossings controlled by border authorities (via Jordan's King Hussein / Allenby Bridge or Ben Gurion Airport).",
    "highlights": [
      {
        "icon": "⛪",
        "title": "Bethlehem & Church of the Nativity (UNESCO)",
        "description": "The historic 4th-century basilica built over the Grotto of the Nativity, birthplace of Jesus Christ."
      },
      {
        "icon": "🌴",
        "title": "Jericho: Oldest City on Earth",
        "description": "Located 258 meters below sea level, featuring 10,000-year-old Tell es-Sultan ruins and Mount of Temptation monastery."
      },
      {
        "icon": "🕌",
        "title": "Hebron & Ibrahimi Mosque (UNESCO)",
        "description": "Monumental Herodian stone sanctuary enshrining the tombs of Abraham, Sarah, Isaac, and Rebecca."
      },
      {
        "icon": "🏙️",
        "title": "Ramallah Cultural Capital",
        "description": "Dynamic city with the Yasser Arafat Museum, Palestinian cultural centers, and bustling markets."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates.",
        "is_mandatory": true
      },
      {
        "title": "Entry Permit / Border Card",
        "description": "Border entry card issued at King Hussein / Allenby Bridge crossing from Jordan.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel / Guest House Reservation",
        "description": "Proof of accommodation in Bethlehem, Ramallah, or Jericho.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Travel Tickets",
        "description": "Return travel reservations departing via Jordan or regional hub.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Travel via Jordan: Travel to Amman, Jordan, and proceed to the King Hussein / Allenby Bridge crossing.",
      "Border Clearance: Present passport and travel details to receive a blue border entry card.",
      "Enter West Bank / Palestine: Proceed through border terminal into Jericho, Bethlehem, or Ramallah.",
      "Explore Cultural Landmarks: Visit Church of the Nativity, ancient Jericho, and Hebron with local guides."
    ],
    "fees": {
      "visa_fee": "Border processing / exit taxes",
      "service_fee": "₹0",
      "total_fee": "approx. $30 - $50 USD border fees",
      "notes": "No separate Palestinian visa fee; standard border crossing fees apply."
    },
    "proc_time": "Instant at Border Crossing (0 Days)",
    "proc_details": "Administered at the King Hussein / Allenby Bridge land border crossing or airport terminals.",
    "requirements": [
      {
        "category": "Border Card",
        "details": "Keep the blue electronic border slip inside your passport at all times."
      },
      {
        "category": "Border Crossing Points",
        "details": "The most common entry for international tourists is via Jordan across the King Hussein Bridge."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "USD $500",
        "description": "Sufficient funds for regional travel."
      }
    ],
    "faqs": [
      {
        "question": "How do international tourists enter Palestine?",
        "answer": "Most international tourists enter from Jordan across the King Hussein / Allenby Bridge crossing or travel from Jerusalem into Bethlehem and Ramallah."
      },
      {
        "question": "Do I need a separate Palestinian visa?",
        "answer": "There is no separate Palestinian visa stamp; travelers receive a blue electronic entry card at the border crossing terminal."
      },
      {
        "question": "Is Bethlehem open to visitors?",
        "answer": "Yes! Bethlehem is located just 10 km south of Jerusalem and welcomes international pilgrims and tourists to the Church of the Nativity daily."
      }
    ],
    "validity": "Up to 90 Days",
    "stay_duration": "Up to 30 to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Palestinian Ministry of Tourism and Antiquities (travelpalestine.ps)"
  },
  "timor-leste": {
    "overview": "Timor-Leste (East Timor), Southeast Asia's youngest nation, is a paradise of pristine coral reefs, rugged mountains, and Portuguese-Timorese heritage. Highlights include diving in the biodiverse waters of Atauro Island (ranked by scientists as having the most biodiverse reef fish in the world), the monumental Cristo Rei statue in Dili, climbing Mount Ramelau for sunrise, and exploring sacred animist culture in Jaco Island. Indian passport holders can receive a convenient 30-day VISA ON ARRIVAL at Dili airport.",
    "highlights": [
      {
        "icon": "🤿",
        "title": "Atauro Island (World's Most Biodiverse Reefs)",
        "description": "Pristine tropical island ranked by marine scientists as having the highest average reef fish diversity on the planet."
      },
      {
        "icon": "🗽",
        "title": "Cristo Rei of Dili",
        "description": "Monumental 27-meter bronze statue of Christ atop a coastal peninsula with panoramic ocean views."
      },
      {
        "icon": "⛰️",
        "title": "Mount Ramelau (Tatamailau)",
        "description": "Hike through eucalyptus forests to the 2,963-meter summit of Timor-Leste's highest peak for a breathtaking sunrise above the clouds."
      },
      {
        "icon": "🏝️",
        "title": "Sacred Jaco Island",
        "description": "Uninhabited sacred island with crystal-clear turquoise waters and powdery white-sand beaches at the eastern tip of Timor."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Presidente Nicolau Lobato Airport (DIL), Dili.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Accommodation",
        "description": "Hotel reservation voucher in Dili.",
        "is_mandatory": true
      },
      {
        "title": "Visa Fee in Cash ($30 USD)",
        "description": "Clean US Dollar cash notes payable at immigration.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Demonstrate minimum $100 USD cash + $50 USD per day of stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights to Dili: Book flights via Bali (DPS), Singapore, or Darwin (DRW) into Dili (DIL).",
      "Prepare Cash: Carry $30 USD in clean cash notes for the Visa on Arrival fee.",
      "Fly to Dili: Arrive at Presidente Nicolau Lobato International Airport.",
      "Pay Fee at Border Desk: Hand passport and $30 USD to immigration border officer.",
      "Receive Visa Sticker: 30-day tourist entry sticker stamped into your passport."
    ],
    "fees": {
      "visa_fee": "$30 USD (approx. ₹2,500 Statutory Visa Fee)",
      "service_fee": "$0 (Direct at Airport)",
      "total_fee": "$30 USD Total",
      "notes": "Payable in US Dollar cash at Dili airport immigration counter."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted at Presidente Nicolau Lobato International Airport (Dili) or Dili seaport.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "US Dollar Currency",
        "details": "The US Dollar ($) is the official currency in Timor-Leste."
      },
      {
        "category": "Stay Duration",
        "details": "30 days granted on arrival, extendable up to 90 days at immigration in Dili."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (USD)",
        "minimum_balance_or_amount": "USD $100 + $50 per day",
        "description": "Show sufficient maintenance funds."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Timor-Leste?",
        "answer": "Yes! Indian passport holders are granted a 30-day Visa on Arrival for $30 USD cash at Dili International Airport."
      },
      {
        "question": "What currency is used in Timor-Leste?",
        "answer": "Timor-Leste uses the US Dollar ($) as its official currency, supplemented by domestic centavo coins."
      },
      {
        "question": "Why is Atauro Island famous among divers?",
        "answer": "Conservation International scientists discovered Atauro Island has the world's most biodiverse coral reef ecosystem, averaging 253 reef fish species per site."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days (Extendable to 90 days)",
    "entry_type": "Single Entry",
    "official_source": "Migration Service of Timor-Leste (migracao.gov.tl)"
  },
  "brunei": {
    "overview": "Brunei Darussalam, the peaceful 'Abode of Peace' on the island of Borneo, is famous for glittering golden-domed royal mosques (Sultan Omar Ali Saifuddien Mosque, Jame' Asr Hassanil Bolkiah), the world's largest water village (Kampong Ayer - 'Venice of the East'), the colossal 1,788-room royal palace Istana Nurul Iman, and pristine virgin primary rainforest in Ulu Temburong National Park. Indian passport holders can apply for a tourist visa via the High Commission of Brunei in New Delhi or obtain a transit entry.",
    "highlights": [
      {
        "icon": "🕌",
        "title": "Sultan Omar Ali Saifuddien Mosque",
        "description": "Magnificent Italian marble mosque with pure gold dome, reflection lagoon, and 16th-century royal barge replica."
      },
      {
        "icon": "🏘️",
        "title": "Kampong Ayer (Venice of the East)",
        "description": "The world's largest stilt settlement spanning 42 villages over the Brunei River, connected by wooden footbridges."
      },
      {
        "icon": "🌳",
        "title": "Ulu Temburong National Park Canopy Walk",
        "description": "Untouched virgin Borneo rainforest featuring 60-meter high aluminum canopy walkway above the mist-shrouded jungle."
      },
      {
        "icon": "👑",
        "title": "Royal Regalia Museum",
        "description": "House of royal crowns, chariots, gold and silver ceremonial armory, and gifts from world heads of state."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form",
        "description": "Completed consular visa application form.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Flight Ticket",
        "description": "Flight booking into Brunei International Airport (BWN), Bandar Seri Begawan.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Host Letter",
        "description": "Proof of accommodation in Bandar Seri Begawan.",
        "is_mandatory": true
      },
      {
        "title": "Two Passport Photos",
        "description": "Recent color photographs on white background.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply at High Commission: Submit application form and passport at Brunei High Commission in New Delhi.",
      "Submit Supporting Documents: Provide flight tickets, hotel booking, and bank statements.",
      "Pay Statutory Fee: Pay BND $20 (approx. ₹1,250) single entry visa fee.",
      "Receive Visa Sticker: Collect stamped passport within 5 to 7 business days.",
      "Fly to Brunei: Board Royal Brunei Airlines or regional flight to Bandar Seri Begawan (BWN)."
    ],
    "fees": {
      "visa_fee": "BND $20 (approx. ₹1,250 Single Entry)",
      "service_fee": "₹0",
      "total_fee": "approx. ₹1,250 Total",
      "notes": "Payable at Brunei High Commission in New Delhi."
    },
    "proc_time": "5 to 7 Business Days",
    "proc_details": "Issued via High Commission of Brunei Darussalam in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Strict Alcohol Laws",
        "details": "Brunei is a dry country; non-Muslims can bring a small personal allowance strictly for private consumption."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Brunei?",
        "answer": "Yes, Indian passport holders require a tourist visa applied through the High Commission of Brunei in New Delhi before travel."
      },
      {
        "question": "What is Kampong Ayer?",
        "answer": "Kampong Ayer in Brunei is the largest traditional stilt village in the world, home to over 30,000 people with schools, fire stations, and mosques built on water."
      },
      {
        "question": "What currency is used in Brunei?",
        "answer": "The Brunei Dollar (BND), which is pegged 1:1 with the Singapore Dollar (SGD). Singapore Dollar notes are accepted everywhere in Brunei."
      }
    ],
    "validity": "90 Days from Date of Issue",
    "stay_duration": "Up to 14 to 30 Days",
    "entry_type": "Single Entry",
    "official_source": "Department of Immigration and National Registration of Brunei (immigration.gov.bn)"
  },
  "papua-new-guinea": {
    "overview": "Papua New Guinea is one of the world's most culturally diverse and biologically rich frontiers, home to over 850 indigenous languages, the spectacular Mount Hagen and Goroka cultural sing-sing festivals (featuring vibrant body paint and bird-of-paradise feather headdresses), the legendary 96-km Kokoda Track, world-class diving in the Bismarck Sea, and untouched Sepik River spirit house traditions. Indian passport holders can apply online for an official tourist eVisa via evisa.ica.gov.pg.",
    "highlights": [
      {
        "icon": "🎭",
        "title": "Goroka & Mount Hagen Sing-Sing Festivals",
        "description": "Hundreds of indigenous tribes gather in elaborate body paint, mud masks, and iridescent bird-of-paradise headdresses."
      },
      {
        "icon": "🥾",
        "title": "Kokoda Track Historic Trek",
        "description": "Legendary 96-kilometer single-file rugged jungle trek crossing the Owen Stanley mountain ranges."
      },
      {
        "icon": "🛶",
        "title": "Sepik River Spirit Houses (Haus Tambaran)",
        "description": "Canoe voyages past riverbank villages famous for sacred spirit houses, wood carvings, and crocodile ceremonies."
      },
      {
        "icon": "🤿",
        "title": "Milne Bay & Kimbe Bay Diving",
        "description": "Unexplored coral walls, WWII aircraft wrecks, and pristine biodiversity in the Coral Triangle."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Approved PNG eVisa Confirmation",
        "description": "Electronic Visa Approval PDF printed from evisa.ica.gov.pg.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Port Moresby Jacksons International Airport (POM).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Itinerary",
        "description": "Proof of accommodation or expedition itinerary in PNG.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements for Past 3 Months",
        "description": "Proof of financial solvency for stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Apply Online: Visit official Papua New Guinea eVisa portal (evisa.ica.gov.pg) and select Tourist - Own Itinerary.",
      "Upload Documents: Provide passport biodata scan, photo, return ticket, and accommodation confirmation.",
      "Pay Fee Online: Pay $50 USD statutory fee by international credit/debit card.",
      "Receive Electronic Visa: Download and print your approved eVisa PDF (issued within 3 to 7 days).",
      "Fly to Port Moresby: Board flight to Jacksons International Airport (POM).",
      "Border Clearance: Present passport and printed eVisa to border officer for entry stamp."
    ],
    "fees": {
      "visa_fee": "$50 USD (approx. ₹4,200 Statutory Fee)",
      "service_fee": "$0 (Direct Government Portal)",
      "total_fee": "$50 USD Total",
      "notes": "Payable online on evisa.ica.gov.pg."
    },
    "proc_time": "3 to 7 Business Days (eVisa)",
    "proc_details": "Applied online via the Papua New Guinea Immigration and Citizenship Authority (ICA).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond intended stay."
      },
      {
        "category": "Health",
        "details": "Proof of yellow fever vaccination if coming from endemic areas."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000",
        "description": "Last 3 months stamped bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens apply for a Papua New Guinea eVisa?",
        "answer": "Yes! Indian passport holders can apply online directly through the official PNG Immigration portal (evisa.ica.gov.pg)."
      },
      {
        "question": "What is a Sing-Sing in Papua New Guinea?",
        "answer": "A Sing-Sing is a traditional cultural gathering where different tribes showcase their distinct music, dance, body paint, and elaborate headdresses."
      },
      {
        "question": "How long is the PNG tourist eVisa valid for?",
        "answer": "The standard tourist eVisa grants a stay of up to 30 or 60 days from arrival."
      }
    ],
    "validity": "60 Days from Date of Issue",
    "stay_duration": "Up to 30 or 60 Days",
    "entry_type": "Single Entry",
    "official_source": "Papua New Guinea Immigration and Citizenship Authority (ICA - evisa.ica.gov.pg)"
  },
  "samoa": {
    "overview": "Samoa, the heart of Polynesia in the South Pacific, enchants travelers with natural wonders: the breathtaking turquoise swimming sinkhole of To Sua Ocean Trench, white-sand beaches on Lalomanu, thundering Alofaaga blowholes, lush volcanic waterfalls, and the timeless 'Fa'a Samoa' (the 3,000-year-old traditional Samoan way of life). Indian passport holders enjoy 60-day VISA-FREE entry (Visitor Permit issued on arrival).",
    "highlights": [
      {
        "icon": "🏊",
        "title": "To Sua Ocean Trench",
        "description": "Magical 30-meter deep natural limestone sinkhole filled with crystal-clear turquoise seawater and lush hanging vines."
      },
      {
        "icon": "🏖️",
        "title": "Lalomanu Beach",
        "description": "World-famous white-sand beach with open-air beach fales overlooking coral reefs and volcanic offshore islands."
      },
      {
        "icon": "🌊",
        "title": "Alofaaga Blowholes (Savai'i)",
        "description": "Underwater sea caves blasting powerful geysers of ocean spray hundreds of feet into the air through volcanic basalt."
      },
      {
        "icon": "✈️",
        "title": "60-Day VISA-FREE for Indian Citizens",
        "description": "Indian passport holders are granted a free 60-day Visitor Permit upon arrival."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Faleolo International Airport (APW), Apia.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel / Beach Fale Booking",
        "description": "Proof of accommodation in Samoa.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Bank card or cash for holiday expenses.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights to Apia: Reserve flights via Fiji, New Zealand, or Australia into Faleolo Airport (APW).",
      "Ensure Passport Validity: Passport must have 6+ months validity.",
      "Fly to Samoa: Land at Faleolo International Airport.",
      "Free Visitor Permit on Arrival: Present passport, return ticket, and accommodation to border officer.",
      "Receive 60-Day Entry Stamp: Enjoy your visa-free Polynesian holiday."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Statutory Visa-Free Entry)",
      "service_fee": "₹0 (No Appointment Needed)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy free 60-day visitor permit on arrival."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted at Faleolo International Airport (Apia).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket strictly enforced."
      },
      {
        "category": "Fa'a Samoa Respect",
        "details": "Dress respectfully when visiting local villages and church services."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "WST $100 per day",
        "description": "Proof of travel funds."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Samoa?",
        "answer": "No! Indian passport holders receive a FREE 60-day Visitor Permit upon arrival at Faleolo Airport in Samoa."
      },
      {
        "question": "What is To Sua Ocean Trench?",
        "answer": "To Sua is an ancient collapsed volcanic lava tube transformed into a breathtaking 30-meter deep swimming pool connected to the ocean."
      },
      {
        "question": "What is a Beach Fale?",
        "answer": "A beach fale is a traditional open-sided thatched wooden hut built right on the sand, offering authentic island accommodation."
      }
    ],
    "validity": "60 Days on Arrival",
    "stay_duration": "Up to 60 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of the Prime Minister and Cabinet - Samoa Immigration"
  },
  "tonga": {
    "overview": "The Kingdom of Tonga, the only Pacific nation never colonized by a foreign power, is celebrated as the 'Friendly Islands'. Marvel at world-class swimming with wild humpback whale mothers and calves in Vava'u (July to October), the ancient megalithic stone trithon Ha'amonga 'a Maui (the Stonehenge of the Pacific), thundering Mapu 'a Vaea blowholes on Tongatapu, and pristine coral atolls. Indian passport holders can receive a 31-day VISA ON ARRIVAL at Fua'amotu Airport.",
    "highlights": [
      {
        "icon": "🐋",
        "title": "Swim with Humpback Whales (Vava'u)",
        "description": "One of the few places on Earth where you can respectfully snorkel in open ocean alongside wild humpback whales and calves."
      },
      {
        "icon": "🗿",
        "title": "Ha'amonga 'a Maui Megalith",
        "description": "13th-century 40-ton royal limestone trilithon, ancient astronomical calendar and gateway."
      },
      {
        "icon": "🌊",
        "title": "Mapu 'a Vaea Blowholes",
        "description": "Five kilometers of coastal limestone blowholes shooting seawater geysers 30 meters into the sky."
      },
      {
        "icon": "👑",
        "title": "Polynesia's Last Monarchy",
        "description": "Victorian royal palace and rich royal Polynesian cultural traditions."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Fua'amotu International Airport (TBU), Nuku'alofa.",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Resort Reservation",
        "description": "Proof of accommodation in Tongatapu or Vava'u.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Demonstrating adequate travel maintenance funds.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights to Nuku'alofa: Reserve flights via Fiji, New Zealand, or Australia into Fua'amotu Airport (TBU).",
      "Ensure Passport Validity: Verify 6+ months validity.",
      "Fly to Tonga: Arrive at Fua'amotu International Airport.",
      "Free Visitor Permit on Arrival: Present passport, return ticket, and accommodation voucher to border officer.",
      "Receive 31-Day Entry Stamp: Entry permit stamped into your passport."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Statutory Entry Stamp)",
      "service_fee": "₹0 (Direct Border)",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders receive free 31-day tourist permit on arrival."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted at Fua'amotu International Airport (Nuku'alofa).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond stay."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket strictly enforced."
      },
      {
        "category": "Whale Season",
        "details": "Whale swimming tours operate from July to October and require advance booking."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "TOP $100 per day",
        "description": "Proof of travel funds."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Tonga?",
        "answer": "Yes! Indian passport holders are granted a FREE 31-day Visitor Visa upon arrival at Fua'amotu Airport in Tonga."
      },
      {
        "question": "Can I swim with whales in Tonga?",
        "answer": "Yes! Tonga is one of the world's top destinations for swimming with humpback whales in the sheltered island waters of Vava'u between July and October."
      },
      {
        "question": "Was Tonga ever colonized?",
        "answer": "No. The Kingdom of Tonga is the only Pacific nation that never lost its indigenous sovereignty or monarchy to colonial rule."
      }
    ],
    "validity": "31 Days on Arrival",
    "stay_duration": "Up to 31 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs of the Kingdom of Tonga (mic.gov.to)"
  },
  "solomon-islands": {
    "overview": "The Solomon Islands, a wild archipelago of nearly 1,000 tropical islands in the South Pacific, is celebrated for world-class WWII wreck diving (Iron Bottom Sound), pristine turquoise lagoons (Marovo Lagoon - the world's largest saltwater lagoon, and UNESCO East Rennell), vibrant shell money traditions in Malaita, and volcanic landscapes. Indian passport holders can obtain a free Visitor Permit on Arrival at Honiara International Airport.",
    "highlights": [
      {
        "icon": "🏝️",
        "title": "Marovo Lagoon (World's Largest Saltwater Lagoon)",
        "description": "World-famous double-barrier lagoon studded with hundreds of palm-fringed islands, coral reefs, and master woodcarvers."
      },
      {
        "icon": "🤿",
        "title": "Iron Bottom Sound & WWII Wreck Diving",
        "description": "Dozens of sunken battleships, destroyers, submarines, and aircraft from the historic 1942 Battle of Guadalcanal."
      },
      {
        "icon": "🌿",
        "title": "East Rennell Coral Atoll (UNESCO)",
        "description": "The world's largest raised coral atoll featuring Lake Tegano, endemic orchid species, and bat colonies."
      },
      {
        "icon": "🐚",
        "title": "Langa Langa Lagoon & Shell Money",
        "description": "Man-made artificial stone islands where villagers craft traditional ancient red shell money strings."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Honiara Henderson Airport (HIR).",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Eco-Lodge Reservation",
        "description": "Proof of accommodation in Honiara or Western Province.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Demonstrate sufficient funds for stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights to Honiara: Reserve flights via Brisbane (BNE), Fiji, or Port Moresby into Honiara (HIR).",
      "Ensure Passport Validity: Verify 6+ months validity.",
      "Fly to Solomon Islands: Land at Honiara International Airport on Guadalcanal.",
      "Free Visitor Permit on Arrival: Present passport, return ticket, and accommodation voucher to immigration officer.",
      "Receive Entry Stamp: Receive 40-day visitor permit stamped into your passport."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Visitor Permit on Arrival)",
      "service_fee": "₹0",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders receive free Visitor Permit on arrival."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted upon arrival at Honiara International Airport (HIR).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return ticket strictly required."
      },
      {
        "category": "Health",
        "details": "Yellow fever certificate required if arriving from endemic countries."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "SBD $100 per day",
        "description": "Proof of funds for island travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens get Visa on Arrival in Solomon Islands?",
        "answer": "Yes! Indian passport holders receive a FREE Visitor Permit on Arrival for up to 40 days at Honiara Airport."
      },
      {
        "question": "Why are Solomon Islands famous among scuba divers?",
        "answer": "The waters around Guadalcanal (Iron Bottom Sound) and Western Province have the highest density of intact WWII warship and aircraft wrecks in the world."
      },
      {
        "question": "What is Marovo Lagoon?",
        "answer": "Marovo Lagoon is the largest saltwater lagoon on Earth, sheltered by high volcanic islands and coral barrier reefs."
      }
    ],
    "validity": "40 Days on Arrival",
    "stay_duration": "Up to 40 Days",
    "entry_type": "Single Entry",
    "official_source": "Department of Immigration of Solomon Islands (commerce.gov.sb)"
  },
  "vanuatu": {
    "overview": "Vanuatu, an archipelago of 83 volcanic islands in the South Pacific, is celebrated for extraordinary spectacles: peering into the bubbling red molten lava lake of Mount Yasur on Tanna Island (the world's most accessible active volcano), watching the breathtaking Pentecost Island land-diving (Naghol - the ancient origin of modern bungee jumping), swimming in radiant blue holes on Espiritu Santo, and diving the colossal SS President Coolidge shipwreck. Indian citizens enjoy 30-day VISA-FREE entry!",
    "highlights": [
      {
        "icon": "🌋",
        "title": "Mount Yasur Active Volcano (Tanna)",
        "description": "Stand on the crater rim and watch glowing red molten magma fountains and volcanic fireworks safely at night."
      },
      {
        "icon": "🪂",
        "title": "Pentecost Island Land Diving (Naghol)",
        "description": "Ancient ritual where tribal men dive head-first from 30-meter wooden towers with forest vines tied to their ankles."
      },
      {
        "icon": "💎",
        "title": "Espiritu Santo Blue Holes & Champagne Beach",
        "description": "Luminous freshwater sapphire blue holes and powdery white-sand Champagne Beach with effervescent bubbles."
      },
      {
        "icon": "🚢",
        "title": "SS President Coolidge Wreck",
        "description": "The world's largest, most accessible luxury ocean liner and WWII military troopship wreck dive."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into Bauerfield Airport (VLI), Port Vila.",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Resort Reservation",
        "description": "Proof of accommodation in Port Vila, Tanna, or Espiritu Santo.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Bank card or cash for holiday stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights to Port Vila: Reserve flights via Fiji, Australia, or New Zealand into Port Vila (VLI).",
      "Ensure Passport Validity: Verify 6+ months validity.",
      "Fly to Vanuatu: Land at Bauerfield International Airport on Efate.",
      "Free Entry on Arrival: Present passport, return ticket, and accommodation voucher to border officer.",
      "Receive 30-Day Entry Stamp: Enjoy your visa-free South Pacific adventure."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Visa-Free Entry)",
      "service_fee": "₹0",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy free 30-day visa-free entry on arrival."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted upon arrival at Bauerfield International Airport (Port Vila).",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for at least 6 months beyond travel dates."
      },
      {
        "category": "Return Ticket",
        "details": "Confirmed return or onward ticket strictly enforced."
      },
      {
        "category": "Extension",
        "details": "Can be extended locally up to 4 months at Vanuatu Immigration."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "VUV 10,000 per day",
        "description": "Proof of funds for island travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Vanuatu?",
        "answer": "No! Indian passport holders enjoy 100% VISA-FREE entry to Vanuatu for up to 30 days upon arrival."
      },
      {
        "question": "What is Mount Yasur?",
        "answer": "Mount Yasur on Tanna Island is widely considered the most accessible active volcano in the world, erupting continuously for over 800 years."
      },
      {
        "question": "What is Pentecost land-diving?",
        "answer": "Naghol (land diving) on Pentecost Island is an ancient harvest fertility ritual where divers leap from tall wooden towers with vines tied to their ankles—the precursor to modern bungee jumping."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Department of Vanuatu Immigration and Passport Services (immigration.gov.vu)"
  },
  "venezuela": {
    "overview": "Venezuela is an ecological wonder of South America, home to Angel Falls (the world's highest uninterrupted waterfall plunging 979 meters), the prehistoric flat-topped tepuis of Canaima National Park (UNESCO), the pristine Caribbean archipelago of Los Roques, and the wildlife-rich plains of Los Llanos. Indian passport holders require an official consular tourist visa issued by the Embassy of the Bolivarian Republic of Venezuela in New Delhi.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Angel Falls (Salto Ángel)",
        "description": "The world's highest uninterrupted waterfall at 979 meters, cascading off Auyán-tepui into the Churun River canyon."
      },
      {
        "icon": "🏝️",
        "title": "Los Roques Archipelago",
        "description": "Over 300 idyllic coral cays and sandbanks in the Caribbean with turquoise lagoons and coral reefs."
      },
      {
        "icon": "⛰️",
        "title": "Mount Roraima & Canaima (UNESCO)",
        "description": "Ancient geological table-top mountains (tepuis) that inspired Arthur Conan Doyle's 'The Lost World'."
      },
      {
        "icon": "🐆",
        "title": "Los Llanos Wildlife Safaris",
        "description": "Vast tropical savannas teeming with capybaras, giant anteaters, anacondas, and hundreds of bird species."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for minimum 6 months with at least 2 blank visa pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form",
        "description": "Completed and signed Venezuelan consular visa application form.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Itinerary",
        "description": "Flight reservation into Simón Bolívar International Airport (CCS), Caracas.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Booking",
        "description": "Confirmed tourist accommodation or authorized national park expedition booking.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Solvency",
        "description": "Original bank statements for the last 3 months attested by bank branch.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "International certificate of vaccination against Yellow Fever.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Schedule Consular Appointment: Contact the Embassy of Venezuela in New Delhi for a tourist visa submission slot.",
      "Compile Documentation: Assemble passport, financial statements, travel itinerary, and yellow fever card.",
      "Attend Consular Interview: Submit application dossier and attend consular interview at the embassy.",
      "Pay Visa Fee: Pay consular fee ($30 to $50 USD) as directed by the embassy cashier.",
      "Collect Passport: Retrieve passport with affixed visa sticker within 10 to 15 business days.",
      "Arrival Clearance: Present stamped visa, hotel proof, and yellow fever certificate at Caracas border control."
    ],
    "fees": {
      "visa_fee": "$30 - $50 USD (approx. ₹2,500 - ₹4,200)",
      "service_fee": "₹0 (Embassy Direct)",
      "total_fee": "approx. ₹3,500 Total",
      "notes": "Consular fee payable as instructed by Venezuelan Embassy New Delhi."
    },
    "proc_time": "10 to 15 Business Days",
    "proc_details": "Consular processing at the Embassy of the Bolivarian Republic of Venezuela in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity from entry date with 2 blank pages."
      },
      {
        "category": "Yellow Fever Certificate",
        "details": "Mandatory yellow fever vaccination card for entry."
      },
      {
        "category": "Consular Interview",
        "details": "Personal appearance may be requested by consular officers."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹2,00,000 balance",
        "description": "Last 3 months attested statements demonstrating travel funding."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Venezuela?",
        "answer": "Yes, Indian passport holders must obtain a consular tourist visa in advance from the Venezuelan Embassy in New Delhi."
      },
      {
        "question": "How high is Angel Falls in Venezuela?",
        "answer": "Angel Falls (Salto Ángel) is the highest uninterrupted waterfall on Earth, standing at 979 meters (3,212 feet) with an 807-meter plunge."
      },
      {
        "question": "Is yellow fever vaccination mandatory for Venezuela?",
        "answer": "Yes, international certificate of yellow fever vaccination is mandatory for travelers arriving in Venezuela."
      }
    ],
    "validity": "Up to 90 Days",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Embassy of the Bolivarian Republic of Venezuela in India & MPPRE"
  },
  "ecuador": {
    "overview": "Ecuador is one of the most biodiverse countries on Earth, encompassing the legendary Galápagos Islands (where Charles Darwin formulated the theory of evolution), Quito's pristine UNESCO-listed Spanish colonial historic centre, the snow-capped Cotopaxi active volcano, the Quilotoa emerald crater lake, and the Amazonian rainforest. Indian citizens must apply online for a consular tourist visa via the official Ecuador Consular Virtual portal (consulvirtual.gob.ec).",
    "highlights": [
      {
        "icon": "🐢",
        "title": "Galápagos Islands (UNESCO)",
        "description": "Unrivaled wildlife encounters with giant tortoises, marine iguanas, blue-footed boobies, and sea lions."
      },
      {
        "icon": "🏛️",
        "title": "Historic Old Town Quito",
        "description": "The best-preserved and least-altered historic colonial centre in the Americas, perched at 2,850m elevation."
      },
      {
        "icon": "🌋",
        "title": "Cotopaxi Volcano & Avenue of the Volcanoes",
        "description": "One of the world's highest active volcanoes (5,897m) with symmetrical snow cone in Cotopaxi National Park."
      },
      {
        "icon": "🌊",
        "title": "Quilotoa Emerald Crater Lake",
        "description": "Breathtaking water-filled caldera lake glowing green and turquoise in the high Andean mountains."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Passport valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Ecuador Visa Application",
        "description": "Electronic visa form completed through the ConsulVirtual portal.",
        "is_mandatory": true
      },
      {
        "title": "Police Clearance Certificate (PCC)",
        "description": "Apostilled Police Clearance Certificate issued within 6 months.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Economic Solvency",
        "description": "Bank statements for last 6 months showing minimum $1,500 - $2,000 USD balance.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into Quito (UIO) or Guayaquil (GYE).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Booking",
        "description": "Confirmed accommodations or Galápagos cruise reservation.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Register on ConsulVirtual: Create an account on the Ministry of Foreign Affairs portal (consulvirtual.gob.ec).",
      "Upload Documents: Submit passport biodata, apostilled PCC, bank statements, and flight itinerary.",
      "Consular Review: Consular officers review submission and schedule appointment / payment instructions.",
      "Pay Visa Fee: Pay $50 application fee plus $400 visa issuance fee upon approval.",
      "Receive eVisa / Stamped Visa: Official electronic visa PDF issued and linked to passport number.",
      "Galápagos Transit Card: If visiting Galápagos, purchase mandatory Transit Control Card (TCT) at airport."
    ],
    "fees": {
      "visa_fee": "$50 Application + $400 Issuance",
      "service_fee": "₹0 (Official Portal)",
      "total_fee": "$450 USD (approx. ₹37,500)",
      "notes": "Official Ecuadorian consular fees paid via ConsulVirtual portal."
    },
    "proc_time": "15 to 30 Business Days",
    "proc_details": "Digital submission via ConsulVirtual evaluated by Ecuadorian Consular Directorate.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Must have at least 6 months remaining validity."
      },
      {
        "category": "Police Clearance",
        "details": "Apostilled PCC required for tourist visa processing."
      },
      {
        "category": "Health Insurance",
        "details": "Valid international travel health insurance required for stay."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Statements",
        "minimum_balance_or_amount": "$2,000 USD (approx. ₹1,65,000)",
        "description": "6 months stamped bank statements showing steady funds."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders travel to Ecuador without a visa?",
        "answer": "No, Ecuador instituted mandatory tourist visas for Indian citizens in 2019, which must be secured via the ConsulVirtual portal."
      },
      {
        "question": "Do I need a special permit to visit the Galápagos Islands?",
        "answer": "Yes, tourists must purchase a Galápagos Transit Control Card (TCT) ($20) at Quito/Guayaquil airport and pay the national park entrance fee ($200) upon landing."
      },
      {
        "question": "What is the official currency of Ecuador?",
        "answer": "Ecuador adopted the United States Dollar (USD) as its official national currency in 2000."
      }
    ],
    "validity": "90 Days from Issuance",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministerio de Relaciones Exteriores y Movilidad Humana (consulvirtual.gob.ec)"
  },
  "bolivia": {
    "overview": "Bolivia is the high-altitude heart of South America, captivating travelers with the world's largest salt flat (Salar de Uyuni spanning 10,500 sq km), Lake Titicaca (the highest navigable lake on Earth), the soaring Andes mountains, and the colonial white city of Sucre (UNESCO). Indian passport holders can conveniently obtain a Tourist Visa on Arrival (VoA) at international airports (La Paz or Santa Cruz) or apply for a digital Tourist Visa in advance via portal.gob.bo.",
    "highlights": [
      {
        "icon": "🧂",
        "title": "Salar de Uyuni (Giant Salt Flats)",
        "description": "Over 10,000 sq km of blinding white salt crust creating an extraordinary infinite mirror reflection during wet season."
      },
      {
        "icon": "🌊",
        "title": "Lake Titicaca & Isla del Sol",
        "description": "Sacred birthplace of the Inca sun god set at 3,812m elevation with terraced hills and sapphire waters."
      },
      {
        "icon": "🏙️",
        "title": "La Paz & Mi Teleférico Cable Car",
        "description": "The world's highest administrative capital (3,640m) navigated by the world's highest and longest urban cable car network."
      },
      {
        "icon": "🏛️",
        "title": "Sucre Colonial City (UNESCO)",
        "description": "Bolivia's constitutional capital renowned for whitewashed colonial mansions, red tiled roofs, and historic churches."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Passport valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa on Arrival Form / Online Application",
        "description": "Completed immigration entry declaration form.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Booking",
        "description": "Flight itinerary into La Paz (LPB) or Santa Cruz (VVI).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Itinerary",
        "description": "Confirmed booking in La Paz, Uyuni, or accredited tour operator itinerary.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Solvency",
        "description": "Credit card copy or recent bank statement showing sufficient funds.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory if traveling into tropical or jungle areas (Santa Cruz, Amazon).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Prepare Documentation: Assemble passport, flight tickets, hotel reservations, and credit card/funds proof.",
      "Flight to Bolivia: Board flight arriving into La Paz El Alto (LPB) or Santa Cruz Viru Viru (VVI).",
      "Approach Immigration VoA Counter: Present passport and documents at designated Visa on Arrival desk.",
      "Pay Statutory VoA Fee: Pay $100 USD visa fee in cash (clean, crisp US dollar bills).",
      "Receive Visa Sticker: Immigration officer stamps and applies the 30-day tourist visa sticker to your passport.",
      "Explore Bolivia: Freely explore Uyuni, Lake Titicaca, and Andean wonders (extendable up to 90 days)."
    ],
    "fees": {
      "visa_fee": "$100 USD (approx. ₹8,300)",
      "service_fee": "$0 (Direct on Arrival)",
      "total_fee": "approx. ₹8,300 Total",
      "notes": "Payable in cash USD at airport border control upon arrival."
    },
    "proc_time": "Instant on Arrival (VoA)",
    "proc_details": "Issued directly at border control upon flight landing in La Paz or Santa Cruz.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Must have 6 months minimum validity."
      },
      {
        "category": "Currency for VoA",
        "details": "Must carry crisp, unblemished US dollar cash bills for border payment."
      },
      {
        "category": "Yellow Fever",
        "details": "Mandatory card required for entry if arriving from or visiting endemic areas."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Bank Proof",
        "minimum_balance_or_amount": "$500 USD equivalent",
        "description": "International credit card or recent bank statement."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens get a Visa on Arrival in Bolivia?",
        "answer": "Yes! Indian passport holders (Group II country) are eligible for a 30-day Tourist Visa on Arrival at international airports (La Paz and Santa Cruz)."
      },
      {
        "question": "When is the best time to see the mirror effect in Salar de Uyuni?",
        "answer": "The famous mirror reflection occurs during the rainy season from January to April when a thin layer of rainwater covers the vast salt crust."
      },
      {
        "question": "Can I extend my stay in Bolivia?",
        "answer": "Yes, the initial 30-day stay can be extended free of charge at any departmental immigration office in Bolivia up to a total of 90 days per calendar year."
      }
    ],
    "validity": "30 Days on Arrival (Extendable to 90 Days)",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Dirección General de Migración de Bolivia (migracion.gob.bo)"
  },
  "paraguay": {
    "overview": "Paraguay, the hidden gem of South America, offers rich Guaraní and Spanish colonial history, tranquil rivers, the UNESCO-listed Jesuit Missions of La Santísima Trinidad de Paraná, the massive Itaipu Dam (one of the engineering wonders of the world), and the vast wilderness of the Gran Chaco. Indian passport holders can apply for a consular tourist visa at the Embassy of Paraguay in New Delhi, or utilize visa facilitation if holding valid US, Canadian, or Schengen visas.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Jesuit Missions of Trinidad & Jesús (UNESCO)",
        "description": "Magnificent 17th-century stone baroque mission ruins reflecting indigenous Guaraní and Jesuit communal society."
      },
      {
        "icon": "⚡",
        "title": "Itaipu Hydroelectric Dam",
        "description": "One of the largest operational hydroelectric plants on Earth, spanning the Paraná River border with Brazil."
      },
      {
        "icon": "🌳",
        "title": "The Gran Chaco Wilderness",
        "description": "Sprawling, sparsely populated thorny wilderness refuge for jaguars, giant armadillos, and indigenous Mennonite communities."
      },
      {
        "icon": "🛶",
        "title": "Asunción Colonial Capital & Costanera",
        "description": "One of the oldest continuously inhabited colonial cities in South America with vibrant riverfront promenades."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Visa Application Form",
        "description": "Completed and signed Paraguayan consular application form.",
        "is_mandatory": true
      },
      {
        "title": "Round-Trip Flight Itinerary",
        "description": "Flight booking into Silvio Pettirossi International Airport (ASU), Asunción.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tourist Package",
        "description": "Proof of accommodation in Asunción or other Paraguayan departments.",
        "is_mandatory": true
      },
      {
        "title": "Bank Statements",
        "description": "Last 3 months bank statements showing sufficient funds (minimum ₹1,50,000).",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Card",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Gather Documents: Assemble passport, bank statements, itinerary, and yellow fever card.",
      "Submit at Embassy of Paraguay New Delhi: Submit visa dossier in person or via accredited representative.",
      "Consular Review: Visa officer evaluates economic solvency and travel itinerary.",
      "Pay Consular Fee: Pay $65 USD (single entry) or $100 USD (multiple entry) consular fee.",
      "Collect Stamped Passport: Visa sticker is affixed within 7 to 10 working days.",
      "Border Inspection: Present stamped visa and yellow fever card upon arrival in Asunción."
    ],
    "fees": {
      "visa_fee": "$65 USD (approx. ₹5,400)",
      "service_fee": "₹0 (Embassy Direct)",
      "total_fee": "approx. ₹5,400 Total",
      "notes": "Consular fee for single-entry tourist visa."
    },
    "proc_time": "7 to 10 Business Days",
    "proc_details": "Processed at the Embassy of the Republic of Paraguay in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months remaining validity."
      },
      {
        "category": "Yellow Fever",
        "details": "Mandatory vaccination card presented at immigration."
      },
      {
        "category": "Funds Proof",
        "details": "Sufficient balance to cover stay duration."
      }
    ],
    "financial_proofs": [
      {
        "type": "Bank Account Statements",
        "minimum_balance_or_amount": "₹1,50,000 balance",
        "description": "Last 3 months attested bank statements."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Paraguay?",
        "answer": "Yes, Indian passport holders require a consular tourist visa obtained from the Embassy of Paraguay in New Delhi."
      },
      {
        "question": "What languages are spoken in Paraguay?",
        "answer": "Paraguay is uniquely bilingual, with Spanish and indigenous Guaraní both recognized as official languages and spoken widely."
      },
      {
        "question": "What is the Jesuit Mission of Trinidad?",
        "answer": "It is an impeccably preserved 17th-century UNESCO World Heritage site built by Jesuit missionaries and Guaraní indigenous artisans."
      }
    ],
    "validity": "90 Days from Issue",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Dirección Nacional de Migraciones de Paraguay & Embassy of Paraguay in India"
  },
  "guyana": {
    "overview": "Guyana, 'Land of Many Waters', is South America's only English-speaking nation, renowned for pristine equatorial Amazonian rainforests, the thunderous Kaieteur Falls (the world's largest single-drop waterfall by volume of water), vibrant Caribbean-influenced Georgetown, and thriving indigenous Amerindian eco-lodges. Indian passport holders can obtain an official Visa on Arrival with prior approval letter, or an eVisa through the Department of Citizenship and Immigration.",
    "highlights": [
      {
        "icon": "🌊",
        "title": "Kaieteur Falls",
        "description": "The world's widest single-drop waterfall, plunging 226 meters through misty Amazonian canyon (5 times the height of Niagara)."
      },
      {
        "icon": "🦜",
        "title": "Iwokrama Rainforest & Canopy Walkway",
        "description": "Pristine wilderness reserve featuring suspended canopy walkways, jaguars, harpy eagles, and giant river otters."
      },
      {
        "icon": "🏛️",
        "title": "St. George's Cathedral Georgetown",
        "description": "One of the tallest freestanding wooden churches in the world, surrounded by vibrant Caribbean-colonial architecture."
      },
      {
        "icon": "🐊",
        "title": "Rupununi Savannas & Eco-Lodges",
        "description": "Vast natural savanna ecosystems inhabited by vaqueros, black caimans, and indigenous Macushi villages."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for minimum 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Guyana Visa Approval Letter",
        "description": "Pre-arranged immigration approval letter from Guyana Ministry of Home Affairs.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Ticket",
        "description": "Round-trip flight booking to Cheddi Jagan International Airport (GEO), Georgetown.",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Eco-Lodge Booking",
        "description": "Confirmed booking in Georgetown or interior eco-resort.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Request Approval Letter: Apply online or through registered Guyanese tour sponsor for prior immigration entry approval.",
      "Receive Approval PDF: Department of Citizenship issues official approval letter within 5 to 7 days.",
      "Flight to Georgetown: Board flight arriving into Cheddi Jagan International Airport (GEO).",
      "Border VoA Counter: Present passport, approval letter, return ticket, and yellow fever certificate.",
      "Pay Statutory Fee: Pay $25 USD visa stamping fee at border control.",
      "Entry Stamp Affixed: 30-day tourist entry stamp is affixed to your passport."
    ],
    "fees": {
      "visa_fee": "$25 USD (approx. ₹2,100)",
      "service_fee": "₹0 (Official)",
      "total_fee": "approx. ₹2,100 Total",
      "notes": "Payable in cash USD at airport immigration upon arrival."
    },
    "proc_time": "5 to 7 Business Days (Pre-Approval) / Instant on Arrival",
    "proc_details": "Pre-approval issued by Department of Citizenship, Georgetown; stamped on arrival.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for minimum 6 months beyond departure."
      },
      {
        "category": "Yellow Fever Card",
        "details": "Mandatory vaccination certificate required upon arrival."
      },
      {
        "category": "Pre-Approval",
        "details": "Must secure immigration approval letter prior to boarding flight."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash",
        "minimum_balance_or_amount": "$500 USD equivalent",
        "description": "Proof of sufficient funds for stay."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens get a visa on arrival in Guyana?",
        "answer": "Yes, Indian passport holders can obtain a Visa on Arrival by securing a prior immigration approval letter through Guyana immigration or an authorized tour operator."
      },
      {
        "question": "What language is spoken in Guyana?",
        "answer": "Guyana is the only English-speaking country in South America, making travel exceptionally convenient for Indian visitors."
      },
      {
        "question": "How high is Kaieteur Falls?",
        "answer": "Kaieteur Falls drops 226 meters (741 feet) in a single sheer plunge, making it four times the height of Niagara Falls."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Department of Citizenship and Immigration, Ministry of Home Affairs Guyana (moha.gov.gy)"
  },
  "suriname": {
    "overview": "Suriname, South America's Dutch-speaking jewel nestled on the Guiana Shield, is a melting pot of Indian (Hindustani), Javanese, Creole, Maroon, and Amerindian cultures. Highlights include Paramaribo's UNESCO-listed wooden Dutch colonial historic inner city, the vast primary rainforest of Central Suriname Nature Reserve (UNESCO), sea turtle nesting at Galibi, and historic plantations. Indian citizens can enter easily by purchasing an online Entry Fee Voucher ($33 USD + $8 service fee) prior to travel.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Historic Paramaribo Wooden City (UNESCO)",
        "description": "Remarkable Dutch colonial inner city constructed entirely of wood, where mosques and synagogues stand harmoniously side-by-side."
      },
      {
        "icon": "🌳",
        "title": "Central Suriname Nature Reserve (UNESCO)",
        "description": "1.6 million hectares of pristine tropical rainforest featuring the towering granite dome of Voltzberg and pristine biodiversity."
      },
      {
        "icon": "🐢",
        "title": "Galibi Nature Reserve Sea Turtles",
        "description": "Protected coastal sanctuary where endangered giant leatherback sea turtles nest on Atlantic beaches."
      },
      {
        "icon": "🛶",
        "title": "Commewijne Plantation Tours & River Dolphins",
        "description": "Historic sugar and coffee plantations along the Commewijne River and sightings of rare pink Guiana river dolphins."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Suriname Entry Fee Voucher",
        "description": "Pre-purchased official Entry Fee Voucher confirmation PDF from suriname.vfsevisa.com.",
        "is_mandatory": true
      },
      {
        "title": "Round-Trip Flight Ticket",
        "description": "Flight booking into Johan Adolf Pengel International Airport (PBM), Paramaribo.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Confirmed booking in Paramaribo or rainforest lodge.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory international certificate of yellow fever vaccination.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Visit Official Entry Portal: Go to the official Suriname Entry Fee portal (suriname.vfsevisa.com).",
      "Fill Traveler Details: Input passport information, arrival date, and travel purpose.",
      "Pay Entry Fee: Pay statutory entry fee of $33 USD (or €25) plus $8 service fee using credit/debit card.",
      "Download Voucher PDF: Instant download of the Entry Fee Voucher sent to your registered email.",
      "Flight to Paramaribo: Board flight arriving into Johan Adolf Pengel International Airport (PBM).",
      "Immigration Entry: Present passport, printed Entry Fee Voucher, return ticket, and yellow fever card for 90-day entry stamp."
    ],
    "fees": {
      "visa_fee": "$33 USD (Entry Fee)",
      "service_fee": "$8 USD (VFS Portal Fee)",
      "total_fee": "$41 USD (approx. ₹3,400)",
      "notes": "Mandatory Entry Fee purchased online prior to departure."
    },
    "proc_time": "Instant (Electronic Voucher)",
    "proc_details": "Instant electronic delivery via official government portal.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity from date of arrival."
      },
      {
        "category": "Yellow Fever Card",
        "details": "Mandatory yellow fever vaccination card for border clearance."
      },
      {
        "category": "Printed Voucher",
        "details": "Must print and carry physical copy of Entry Fee Voucher PDF."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash",
        "minimum_balance_or_amount": "$500 USD equivalent",
        "description": "Proof of sufficient financial means for stay."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa for Suriname?",
        "answer": "No traditional visa is required! Indian passport holders simply purchase the mandatory online Entry Fee Voucher ($33 USD + $8) prior to travel for up to 90 days stay."
      },
      {
        "question": "Why does Suriname have a large Indian population?",
        "answer": "Between 1873 and 1916, over 34,000 Indian indentured workers moved to Suriname. Today, Indian-origin Surinamese (Hindustani) make up over 27% of the population, and Hindi and Bhojpuri are widely spoken."
      },
      {
        "question": "What is the currency of Suriname?",
        "answer": "The official currency is the Surinamese Dollar (SRD), though US Dollars and Euros are widely accepted."
      }
    ],
    "validity": "90 Days from Arrival",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single Entry",
    "official_source": "Ministry of Foreign Affairs, International Business and International Cooperation of Suriname (suriname.vfsevisa.com)"
  },
  "trinidad": {
    "overview": "Trinidad & Tobago is the vibrant dual-island Caribbean cultural powerhouse, birthplace of steelpan music, calypso, and the world-famous Trinidad Carnival. Indian passport holders enjoy 100% VISA-FREE entry for up to 90 days! Explore the bustling culture of Port of Spain, the turquoise waters and coral reefs of Buccoo Reef and Pigeon Point in Tobago, the bird-rich Caroni Bird Sanctuary (home to thousands of scarlet ibises), and the unique Temple in the Sea at Waterloo.",
    "highlights": [
      {
        "icon": "🎭",
        "title": "World-Famous Trinidad Carnival",
        "description": "The greatest street party on Earth featuring flamboyant masquerade bands, calypso, and steelpan competitions."
      },
      {
        "icon": "🏖️",
        "title": "Pigeon Point & Buccoo Reef (Tobago)",
        "description": "Tobago's premier turquoise beach with iconic thatched jetty, Nylon Pool natural swimming pool, and coral reefs."
      },
      {
        "icon": "🦩",
        "title": "Caroni Bird Sanctuary",
        "description": "Mangrove boat safaris to witness thousands of vivid Scarlet Ibises (national bird) returning to roost at sunset."
      },
      {
        "icon": "🛕",
        "title": "Temple in the Sea (Waterloo)",
        "description": "Historic Hindu temple built offshore by indentured Indian laborer Sewdass Sadhu, symbolizing resilience and heritage."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip flight booking departing within 90 days.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Accommodation",
        "description": "Hotel reservation, guesthouse booking, or host invitation letter.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Credit card, traveler's cheques, or recent bank statement.",
        "is_mandatory": true
      },
      {
        "title": "Online Immigration Departure/Arrival Form",
        "description": "Completed electronic immigration form submitted prior to landing.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights: Reserve return flights to Piarco International Airport (POS), Trinidad or ANR Robinson (TAB), Tobago.",
      "Check Passport Validity: Ensure passport has minimum 6 months validity.",
      "Fill Arrival Form: Complete the online travel declaration prior to arrival.",
      "Flight & Arrival: Fly into Trinidad or Tobago without applying for any advance visa.",
      "Border Clearance: Present passport, return ticket, and hotel booking at immigration.",
      "Receive Visa-Free Stamp: Immigration officer stamps passport for up to 90 days of visa-free stay."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Visa-Free Entry)",
      "service_fee": "₹0",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian passport holders enjoy completely free visa-free entry."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Visa-free entry granted immediately at airport border control.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity beyond intended stay."
      },
      {
        "category": "Return Flight",
        "details": "Mandatory confirmed onward/return ticket."
      },
      {
        "category": "Visa Waiver",
        "details": "Bilateral visa waiver grants 90 days stay for tourism."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "$50 USD per day",
        "description": "Proof of funds for Caribbean vacation."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian passport holders need a visa for Trinidad & Tobago?",
        "answer": "No! Indian citizens enjoy 100% VISA-FREE entry for up to 90 days for tourism and leisure."
      },
      {
        "question": "What is the cultural connection between Trinidad and India?",
        "answer": "Over 35% of the population is of Indian descent (Indo-Trinidadians), having arrived between 1845 and 1917. Diwali is an official national public holiday, and Indian food (roti, doubles) is national cuisine."
      },
      {
        "question": "How do you travel between Trinidad and Tobago?",
        "answer": "High-speed passenger ferries operate daily between Port of Spain and Scarborough (approx. 2.5 hours), or 20-minute flights on Caribbean Airlines."
      }
    ],
    "validity": "90 Days on Arrival",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Visa-Free",
    "official_source": "Immigration Division, Ministry of National Security of Trinidad and Tobago (nationalsecurity.gov.tt)"
  },
  "barbados": {
    "overview": "Barbados is the sophisticated jewel of the Eastern Caribbean, celebrated for powder-white pink-tinted beaches, crystal-clear turquoise waters, UNESCO-listed historic Bridgetown and its Garrison, Harrison's Cave limestone caverns, and vibrant Bajan rum and culinary culture. Indian passport holders enjoy completely VISA-FREE entry for up to 90 days on arrival! Bask on legendary beaches, snorkel with sea turtles in Carlisle Bay, and savor world-class Caribbean hospitality.",
    "highlights": [
      {
        "icon": "🏖️",
        "title": "Carlisle Bay & Sea Turtle Snorkeling",
        "description": "Calm crystalline waters harboring six shallow shipwrecks where you can swim freely with green sea turtles."
      },
      {
        "icon": "🏛️",
        "title": "Historic Bridgetown & Garrison (UNESCO)",
        "description": "Outstanding 17th-century British colonial architecture, historic parliament buildings, and military garrison."
      },
      {
        "icon": "💎",
        "title": "Harrison's Cave Eco-Adventure",
        "description": "Spectacular underground crystallised limestone cavern with stalactites, stalagmites, and deep crystal-clear pools."
      },
      {
        "icon": "🌊",
        "title": "The Crane Beach & Platinum Coast",
        "description": "World-famous pink sand beach surrounded by dramatic cliffs and luxury resorts on the Atlantic and Caribbean coasts."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Passport valid for duration of intended stay with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Round-trip flight booking to Grantley Adams International Airport (BGI).",
        "is_mandatory": true
      },
      {
        "title": "Proof of Accommodation",
        "description": "Hotel booking, guesthouse confirmation, or villa rental.",
        "is_mandatory": true
      },
      {
        "title": "Online Immigration ED Card",
        "description": "Completed online Immigration and Customs Form submitted within 72 hours prior to arrival.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Funds",
        "description": "Credit card or bank statement demonstrating sufficient funds for stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights: Reserve return flights to Grantley Adams International Airport (BGI), Bridgetown.",
      "Submit Online ED Card: Complete the free electronic immigration declaration form online (travelform.gov.bb).",
      "Pack Documents: Carry passport, confirmed return ticket, hotel reservation, and funds proof.",
      "Fly to Barbados: Arrive at Grantley Adams International Airport without any prior visa application.",
      "Border Inspection: Present passport and digital ED card at immigration.",
      "Receive Visa-Free Entry: Immigration officer stamps passport for up to 90 days stay."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Visa-Free Entry)",
      "service_fee": "₹0",
      "total_fee": "₹0 (Free Entry)",
      "notes": "Indian citizens enter Barbados visa-free for tourism up to 90 days."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted at Grantley Adams International Airport border control.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Valid for the duration of stay."
      },
      {
        "category": "Return Ticket",
        "details": "Mandatory confirmed return or onward ticket."
      },
      {
        "category": "Online ED Card",
        "details": "Must complete digital travel declaration before arrival."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash",
        "minimum_balance_or_amount": "$50 USD per day",
        "description": "Proof of funds for island stay."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a visa to visit Barbados?",
        "answer": "No! Indian passport holders can visit Barbados completely VISA-FREE for stays up to 90 days for tourism."
      },
      {
        "question": "What is the Barbados Online ED Card?",
        "answer": "All travelers must fill out the free online Immigration/Customs Form (ED Card) at travelform.gov.bb within 72 hours before arrival in Barbados."
      },
      {
        "question": "What currency is used in Barbados?",
        "answer": "The official currency is the Barbadian Dollar (BBD), pegged to the US Dollar at 2 BBD = 1 USD. US dollars are universally accepted."
      }
    ],
    "validity": "90 Days on Arrival",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Visa-Free",
    "official_source": "Barbados Immigration Department (immigration.gov.bb)"
  },
  "bahamas": {
    "overview": "The Bahamas is an archipelago of 700 subtropical islands and 2,400 cays scattered across stunning sapphire Atlantic waters. Renowned for Nassau's Paradise Island, the swimming pigs of Big Major Cay in Exuma, the Pink Sands Beach of Harbour Island, and world-class scuba diving along the world's third-largest barrier reef off Andros. Indian citizens holding a valid visa or permanent residency from the USA, Canada, UK, or Schengen area enjoy visa-free entry / expedited eVisa for up to 90 days.",
    "highlights": [
      {
        "icon": "🐷",
        "title": "Exuma Swimming Pigs & Cays",
        "description": "Boat excursions to Big Major Cay to swim alongside the famous resident pigs in crystal-clear turquoise waters."
      },
      {
        "icon": "🏖️",
        "title": "Harbour Island Pink Sands Beach",
        "description": "Three miles of magical soft pale-pink sand formed by crushed microscopic coral shells (foraminifera)."
      },
      {
        "icon": "🏰",
        "title": "Nassau & Paradise Island",
        "description": "The vibrant capital featuring pastel colonial architecture, pirate history, Queen's Staircase, and luxury water parks."
      },
      {
        "icon": "🤿",
        "title": "Andros Barrier Reef & Blue Holes",
        "description": "The third-largest barrier reef on Earth teeming with coral walls, blue holes, sharks, and marine life."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months beyond departure date.",
        "is_mandatory": true
      },
      {
        "title": "Valid US / UK / Schengen Visa (for Visa Waiver)",
        "description": "Multiple-entry visa from USA, Canada, UK, or Schengen valid for duration of stay.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Round-Trip Air Ticket",
        "description": "Flight booking into Lynden Pindling International Airport (NAS), Nassau.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Reservation",
        "description": "Booking voucher for hotel or resort in Nassau, Exuma, or Grand Bahama.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Funds",
        "description": "Credit card and recent bank statements demonstrating sufficient funds.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Visa Exemption: If holding a valid US, Canadian, UK, or Schengen visa, enter without a national Bahamian visa.",
      "Apply Online (if required): If not holding a waiver visa, apply for an official Bahamas eVisa via mofr.gov.bs.",
      "Submit Application: Upload passport scan, photo, return ticket, and financial proof.",
      "Pay eVisa Fee: Pay $100 USD (single entry) or $110 USD (multiple entry) online.",
      "Receive Approval: Download and print the electronic visa approval within 7 to 10 working days.",
      "Border Entry: Present passport, visa/waiver, and return ticket at Nassau airport immigration desk."
    ],
    "fees": {
      "visa_fee": "$0 (with US/UK/Schengen visa waiver) / $100 USD (eVisa)",
      "service_fee": "₹0 (Official Portal)",
      "total_fee": "$0 - $100 USD (approx. ₹0 - ₹8,300)",
      "notes": "Holders of valid US/UK/Schengen visas enter under the tourist waiver."
    },
    "proc_time": "Instant (Waiver) or 7-10 Days (eVisa)",
    "proc_details": "Border entry stamp on arrival with visa waiver or via Ministry of Foreign Affairs eVisa.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months remaining validity."
      },
      {
        "category": "Visa Waiver Exemption",
        "details": "Valid multiple-entry US, Canadian, UK, or Schengen visa qualifies for waiver."
      },
      {
        "category": "Return Air Ticket",
        "details": "Mandatory return ticket required by airline and immigration."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash",
        "minimum_balance_or_amount": "$100 USD per day",
        "description": "Proof of funds for island stay."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders enter the Bahamas with a US visa?",
        "answer": "Yes! Indian passport holders with a valid multiple-entry visa issued by the USA, Canada, UK, or Schengen area can enter the Bahamas without a separate Bahamian visa for up to 90 days."
      },
      {
        "question": "Where are the swimming pigs located?",
        "answer": "The famous swimming pigs live on Big Major Cay (Pig Beach) in the Exuma district, accessible by guided boat tours from Nassau, Staniel Cay, or Great Exuma."
      },
      {
        "question": "What currency is used in The Bahamas?",
        "answer": "The Bahamian Dollar (BSD) is pegged 1:1 to the US Dollar. Both currencies are accepted interchangeably everywhere across the islands."
      }
    ],
    "validity": "Up to 90 Days",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Ministry of Foreign Affairs and Immigration of The Bahamas (mofr.gov.bs)"
  },
  "cuba": {
    "overview": "Cuba is the largest and most captivating island in the Caribbean, frozen in timeless enchantment with vintage 1950s American classic cars, UNESCO-preserved Spanish colonial architecture in Old Havana (Habana Vieja) and Trinidad, the limestone mogotes and tobacco farms of Viñales Valley, and the dazzling white sands of Varadero. Indian passport holders must obtain an official Cuban Tourist Card (Tarjeta del Turista) prior to travel, available through the Embassy of Cuba in New Delhi or authorized travel agencies/airlines.",
    "highlights": [
      {
        "icon": "🚗",
        "title": "Old Havana & Vintage Classic Cars",
        "description": "Stroll cobblestone plazas of UNESCO-listed Habana Vieja and cruise the Malecón seawall in a vibrant 1950s convertible."
      },
      {
        "icon": "🌿",
        "title": "Viñales Valley & Tobacco Farms",
        "description": "Dramatic karst limestone hills (mogotes) where world-famous Cuban cigars are handcrafted on traditional plantations."
      },
      {
        "icon": "🏖️",
        "title": "Varadero Beach Resort",
        "description": "20 kilometers of powdery white sand and turquoise Caribbean water lined with palm trees and oceanfront resorts."
      },
      {
        "icon": "🎺",
        "title": "Trinidad Colonial Town (UNESCO)",
        "description": "Impeccably preserved 16th-century Spanish colonial pastel mansions, cobblestone streets, and live open-air salsa music."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months beyond travel dates.",
        "is_mandatory": true
      },
      {
        "title": "Cuban Tourist Card (Tarjeta del Turista)",
        "description": "Original tourist card issued by Cuban Embassy or authorized agency.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into José Martí International Airport (HAV), Havana.",
        "is_mandatory": true
      },
      {
        "title": "Travel Medical Insurance",
        "description": "Mandatory international health insurance policy covering medical expenses in Cuba.",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Casa Particular Reservation",
        "description": "Confirmed booking at a hotel or licensed local homestay (Casa Particular).",
        "is_mandatory": true
      },
      {
        "title": "D'Viajeros Digital Declaration",
        "description": "Completed online customs and health declaration completed within 48 hours before flight.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Obtain Cuban Tourist Card: Apply at the Embassy of Cuba in New Delhi or buy through authorized visa services/airlines.",
      "Purchase Travel Insurance: Secure mandatory travel medical insurance valid in Cuba.",
      "Fill D'Viajeros Online Form: Complete the official digital declaration (dviajeros.mitrans.gob.cu) within 48h of departure.",
      "Flight to Havana: Fly into José Martí International Airport (HAV).",
      "Immigration Clearance: Present passport, half of the Tourist Card, D'Viajeros QR code, and insurance policy.",
      "Keep Tourist Card Stub: Retain the second half of the Tourist Card safely, as it must be returned upon departure."
    ],
    "fees": {
      "visa_fee": "$25 - $50 USD (approx. ₹2,100 - ₹4,200)",
      "service_fee": "₹0 - ₹1,500 (Agency)",
      "total_fee": "approx. ₹3,500 Total",
      "notes": "Tourist Card purchased through Cuban Embassy New Delhi or authorized agency."
    },
    "proc_time": "1 to 5 Business Days",
    "proc_details": "Tourist Card issued over-the-counter or delivered via courier by authorized agencies.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity."
      },
      {
        "category": "Medical Insurance",
        "details": "Mandatory non-US travel health insurance policy covering Cuba."
      },
      {
        "category": "D'Viajeros Form",
        "details": "Mandatory digital form completed within 48 hours of flight."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash (Euros / USD)",
        "minimum_balance_or_amount": "$50 USD / €50 per day",
        "description": "Foreign cash (Euros preferred) is essential as non-Cuban credit cards may face restrictions."
      }
    ],
    "faqs": [
      {
        "question": "How do Indian citizens get a Cuban Tourist Card?",
        "answer": "Indian travelers can obtain the Cuban Tourist Card (Tarjeta del Turista) from the Embassy of Cuba in New Delhi or through accredited travel agencies and tour operators."
      },
      {
        "question": "How long is the Cuban Tourist Card valid for?",
        "answer": "The Tourist Card allows a stay of up to 90 days from arrival and can be extended for an additional 90 days locally at immigration offices."
      },
      {
        "question": "What is a Casa Particular in Cuba?",
        "answer": "A Casa Particular is a licensed private homestay offering visitors authentic Cuban hospitality, home-cooked Creole meals, and affordable lodging."
      }
    ],
    "validity": "90 Days from Entry",
    "stay_duration": "Up to 90 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Embassy of the Republic of Cuba in New Delhi & Ministerio de Relaciones Exteriores (cubaminrex.cu)"
  },
  "puerto-rico": {
    "overview": "Puerto Rico, an enchanting unincorporated territory of the United States, combines vibrant Boricua Caribbean culture with lush tropical landscapes. Explore the blue-cobblestone streets and colossal 16th-century sea fortresses of Old San Juan (UNESCO), the magical emerald rainforest of El Yunque (the only tropical rainforest in the US National Forest System), the bioluminescent glowing waters of Mosquito Bay in Vieques, and world-famous Flamenco Beach on Culebra. Because Puerto Rico is a US territory, Indian citizens enter using a standard US B1/B2 Visitor Visa.",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Old San Juan & Castillo San Felipe del Morro (UNESCO)",
        "description": "Colossal 16th-century Spanish coastal fortress (El Morro), blue cobblestone streets, and pastel colonial facades."
      },
      {
        "icon": "🌿",
        "title": "El Yunque National Rainforest",
        "description": "The only tropical rainforest in the US National Forest System, home to rushing waterfalls, giant tree ferns, and coqui frogs."
      },
      {
        "icon": "✨",
        "title": "Mosquito Bay Bioluminescent Waters (Vieques)",
        "description": "Guinness World Record brightest bioluminescent bay on Earth, glowing neon blue with millions of dinoflagellates."
      },
      {
        "icon": "🏖️",
        "title": "Flamenco Beach (Culebra)",
        "description": "Consistently ranked among the top beaches worldwide, with turquoise waves, soft white sand, and historic painted tanks."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months with blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US B1/B2 Visitor Visa",
        "description": "Valid non-immigrant US B1/B2 visitor visa sticker affixed to passport.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into Luis Muñoz Marín International Airport (SJU), San Juan.",
        "is_mandatory": true
      },
      {
        "title": "Hotel / Resort Reservation",
        "description": "Confirmed booking in San Juan, Vieques, or coastal resort.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Funds",
        "description": "Credit cards and bank statements demonstrating travel budget.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Secure US B1/B2 Visa: Apply for a US Non-Immigrant Visitor Visa (DS-160) at US Embassy/Consulates in India.",
      "Book Flights to San Juan: Book flights arriving into San Juan Luis Muñoz Marín International Airport (SJU).",
      "No Separate Visa Required: Since Puerto Rico is a US territory, domestic or international entry is covered under your US Visa.",
      "US Customs & Border Protection (CBP): Clear standard US immigration at port of entry.",
      "Receive US Entry Stamp / I-94: Granted standard stay duration (typically up to 6 months) as determined by CBP.",
      "Explore Puerto Rico: Freely travel between the main island, Vieques, Culebra, and US mainland."
    ],
    "fees": {
      "visa_fee": "$185 USD (Standard US B1/B2 Visa)",
      "service_fee": "₹0",
      "total_fee": "$185 USD (approx. ₹15,400)",
      "notes": "Standard US Department of State MRV visa application fee."
    },
    "proc_time": "Varies by US Consular Appointment Wait Times",
    "proc_details": "Processed by US Department of State / US Embassy & Consulates in India.",
    "requirements": [
      {
        "category": "US Immigration Law",
        "details": "Standard United States immigration laws apply entirely."
      },
      {
        "category": "Valid US Visa",
        "details": "Must hold valid US B1/B2 visa or US Permanent Residency."
      },
      {
        "category": "Electronic I-94",
        "details": "CBP issues automated electronic I-94 arrival record upon entry."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Bank Account",
        "minimum_balance_or_amount": "₹2,50,000 balance",
        "description": "Demonstrates sufficient financial solvency for US territory travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian citizens need a separate visa for Puerto Rico?",
        "answer": "No separate visa is needed! Because Puerto Rico is a territory of the United States, entry requirements are identical to the US mainland. You enter on a valid US B1/B2 Visitor Visa."
      },
      {
        "question": "Can I fly between the US mainland and Puerto Rico without going through immigration?",
        "answer": "Yes! Flights between mainland US cities (Miami, New York, Orlando) and San Juan are domestic flights with no customs or immigration checkpoints between them."
      },
      {
        "question": "What is the official currency in Puerto Rico?",
        "answer": "The official currency is the United States Dollar (USD)."
      }
    ],
    "validity": "Up to 10 Years (US Visa)",
    "stay_duration": "Up to 6 Months (Per CBP I-94)",
    "entry_type": "Multiple Entry",
    "official_source": "US Customs and Border Protection (CBP) & Discover Puerto Rico (discoverpuertorico.com)"
  },
  "haiti": {
    "overview": "Haiti, sharing the Caribbean island of Hispaniola with the Dominican Republic, is the world's first independent Black republic, rich in revolutionary pride, Vodou heritage, vibrant naive art, and monumental historic fortresses. Historic treasures include the Citadelle Laferrière (UNESCO, the largest fortress in the Americas), the ruins of Sans-Souci Palace, the tiered natural turquoise limestone pools of Bassin Bleu in Jacmel, and the seaside artisan markets. Indian passport holders enjoy VISA-FREE entry for up to 90 days upon paying a $10 tourist fee on arrival.",
    "highlights": [
      {
        "icon": "🏰",
        "title": "Citadelle Laferrière (UNESCO)",
        "description": "The largest fortress in the Americas, perched atop Bonnet à l’Évêque mountain at 900m, built with 365 cannons."
      },
      {
        "icon": "🏛️",
        "title": "Sans-Souci Palace (UNESCO)",
        "description": "The magnificent 19th-century royal residence of King Henri I in Milot, known as the 'Versailles of the Caribbean'."
      },
      {
        "icon": "🌊",
        "title": "Bassin Bleu Waterfalls (Jacmel)",
        "description": "Three breathtaking cascading turquoise pools and waterfalls hidden in lush mountain caves near artisan town Jacmel."
      },
      {
        "icon": "🎨",
        "title": "Jacmel Arts & Gingerbread Mansions",
        "description": "Haiti's cultural and carnival capital, famous for papier-mâché sculptures, vibrant art galleries, and Victorian architecture."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for minimum 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Round-Trip Air Ticket",
        "description": "Flight booking into Port-au-Prince (PAP) or Cap-Haïtien (CAP).",
        "is_mandatory": true
      },
      {
        "title": "Confirmed Hotel Reservation",
        "description": "Booking voucher at a verified hotel or guest lodge.",
        "is_mandatory": true
      },
      {
        "title": "Tourist Fee on Arrival",
        "description": "$10 USD tourist card fee payable in cash at border control.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Financial Means",
        "description": "Cash or credit card demonstrating sufficient funds for stay.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Book Flights: Book roundtrip flights to Cap-Haïtien (CAP) or Port-au-Prince (PAP).",
      "Prepare Passport: Ensure your Indian passport has at least 6 months validity.",
      "Fly to Haiti: Travel to Haiti without applying for any prior visa at an embassy.",
      "Immigration Desk: Present passport, return flight ticket, and hotel reservation.",
      "Pay Tourist Fee: Pay $10 USD tourist fee in cash at the airport immigration counter.",
      "Receive Visa-Free Entry Stamp: Immigration officer stamps passport for up to 90 days stay."
    ],
    "fees": {
      "visa_fee": "FREE (₹0 Visa-Free)",
      "service_fee": "$10 USD Tourist Fee (approx. ₹830)",
      "total_fee": "$10 USD Total",
      "notes": "Mandatory $10 USD tourist card fee payable in cash on arrival."
    },
    "proc_time": "Instant on Arrival (0 Days)",
    "proc_details": "Granted upon arrival at Cap-Haïtien or Port-au-Prince international airports.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity from date of entry."
      },
      {
        "category": "Airport Tourist Fee",
        "details": "Must carry $10 USD in cash for airport entry fee."
      },
      {
        "category": "Onward Ticket",
        "details": "Confirmed return flight ticket strictly verified by airlines."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "$500 USD equivalent",
        "description": "Proof of funds for Caribbean travel."
      }
    ],
    "faqs": [
      {
        "question": "Do Indian passport holders need a visa for Haiti?",
        "answer": "No! Indian citizens enjoy VISA-FREE entry for up to 90 days. You only need to pay a nominal $10 USD tourist card fee at airport immigration upon arrival."
      },
      {
        "question": "What is the Citadelle Laferrière?",
        "answer": "It is a massive early 19th-century mountaintop fortress built by King Henri Christophe after Haiti won independence from France, recognized by UNESCO as the eighth wonder of the world."
      },
      {
        "question": "What currencies are used in Haiti?",
        "answer": "The official currency is the Haitian Gourde (HTG), but US Dollars (USD) are widely accepted in hotels, tours, and major establishments."
      }
    ],
    "validity": "90 Days on Arrival",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Visa-Free",
    "official_source": "Direction de l'Immigration et de l'Émigration d'Haïti"
  },
  "belize": {
    "overview": "Belize is Central America's only English-speaking country, nestled along the Caribbean coast with lush tropical rainforests and the second-largest barrier reef in the world. Famous for the Great Blue Hole (a UNESCO world wonder for divers), ancient Mayan pyramids towering in the jungle (Xunantunich and Caracol), snorkeling with nurse sharks at Shark Ray Alley in Caye Caulker, and cave tubing through sacred underground rivers. Indian citizens holding a valid multiple-entry US, Canadian, or Schengen visa enjoy visa-free entry, while others apply for a consular visa.",
    "highlights": [
      {
        "icon": "🤿",
        "title": "Great Blue Hole (UNESCO)",
        "description": "A 300-meter-wide, 125-meter-deep marine sinkhole renowned worldwide for crystal-clear deep scuba diving."
      },
      {
        "icon": "🏛️",
        "title": "Xunantunich & Caracol Mayan Ruins",
        "description": "Ancient ceremonial Mayan temples deep in the Cayo jungle, featuring the soaring 40-meter El Castillo pyramid."
      },
      {
        "icon": "🦈",
        "title": "Caye Caulker & Shark Ray Alley",
        "description": "Laid-back Caribbean island with the motto 'Go Slow' where you can snorkel alongside friendly nurse sharks and stingrays."
      },
      {
        "icon": "🛶",
        "title": "Actun Tunichil Muknal (ATM Cave)",
        "description": "Sacred Mayan sacrificial cave reached by swimming and trekking, featuring intact skeletal remains and ancient pottery."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US / Canada / Schengen Visa (for Visa Waiver)",
        "description": "Multiple-entry visa from USA, Canada, or Schengen valid for duration of stay.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Round-Trip Air Ticket",
        "description": "Flight booking into Philip S.W. Goldson International Airport (BZE), Belize City.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Confirmed booking in Caye Caulker, San Pedro, or Cayo District.",
        "is_mandatory": true
      },
      {
        "title": "Proof of Sufficient Funds",
        "description": "Recent bank statements or international credit card ($75 USD per day).",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check US / Schengen Waiver: If you hold a valid multiple-entry US, Canadian, or Schengen visa, enter visa-free directly.",
      "Apply via Belize Mission (if no waiver): Apply at an accredited Belizean diplomatic mission or consulate.",
      "Assemble Documents: Passport, photos, flight ticket, hotel booking, and bank statements.",
      "Pay Consular Fee: Pay $50 USD (single entry) or statutory visa fee.",
      "Receive Visa Sticker: Passport returned with visa sticker within 10 to 14 working days.",
      "Immigration Clearance: Present passport, visa/waiver, and return ticket at Belize City airport."
    ],
    "fees": {
      "visa_fee": "$0 (Visa-free with US/Schengen visa) / $50 USD (Consular)",
      "service_fee": "₹0",
      "total_fee": "$0 - $50 USD (approx. ₹0 - ₹4,200)",
      "notes": "Indian holders of valid US/Canadian/Schengen visas enter visa-free."
    },
    "proc_time": "Instant (with Waiver) or 10-14 Days (Consular)",
    "proc_details": "Border clearance on arrival with US/Schengen waiver or consular processing.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity."
      },
      {
        "category": "US / Schengen Waiver",
        "details": "Holders of valid multiple-entry US, Canadian, or Schengen visas enter visa-free for up to 30 days."
      },
      {
        "category": "Departure Tax",
        "details": "Airport departure fee (approx. $40 USD) often included in international airline tickets."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash",
        "minimum_balance_or_amount": "$75 USD per day",
        "description": "Proof of funds for Caribbean/Central American stay."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders enter Belize with a US visa?",
        "answer": "Yes! Indian citizens holding a valid multiple-entry visa issued by the USA, Canada, or Schengen member states can enter Belize VISA-FREE for up to 30 days."
      },
      {
        "question": "What language is spoken in Belize?",
        "answer": "English is the official language of Belize, making travel, dining, and navigation effortless for international travelers."
      },
      {
        "question": "What is the Great Blue Hole?",
        "answer": "The Great Blue Hole is a world-famous underwater sinkhole off the coast of Belize, made famous by Jacques Cousteau as one of the top ten scuba diving spots on Earth."
      }
    ],
    "validity": "30 Days on Arrival",
    "stay_duration": "Up to 30 Days (Extendable)",
    "entry_type": "Single Entry",
    "official_source": "Department of Immigration and Nationality Services of Belize (immigration.gov.bz)"
  },
  "el-salvador": {
    "overview": "El Salvador, the 'Land of Volcanoes', is Central America's exciting tourism hotspot, renowned for world-class Pacific surfing along El Tunco and El Zonte (Bitcoin Beach), the scenic mountain villages and coffee plantations of the Ruta de las Flores, the towering turquoise crater lake of Santa Ana Volcano, and the UNESCO-preserved Mayan village of Joya de Cerén (the 'Pompeii of the Americas'). Indian citizens holding a valid multiple-entry US, Canadian, or Schengen visa enjoy visa-free entry under the CA-4 agreement upon purchasing a $12 tourist card.",
    "highlights": [
      {
        "icon": "🏄",
        "title": "El Tunco & Surf City (Bitcoin Beach)",
        "description": "Legendary Pacific point breaks, black volcanic sand beaches, vibrant surf culture, and Bitcoin commerce."
      },
      {
        "icon": "🌋",
        "title": "Santa Ana Volcano (Ilamatepec)",
        "description": "Hike to the summit of El Salvador's highest volcano (2,381m) to gaze into a glowing emerald sulfuric crater lake."
      },
      {
        "icon": "☕",
        "title": "Ruta de las Flores & Coffee Haciendas",
        "description": "Picturesque colonial mountain villages (Juayúa, Ataco) featuring artisan craft markets and specialty high-altitude coffee tours."
      },
      {
        "icon": "🏛️",
        "title": "Joya de Cerén Mayan Ruins (UNESCO)",
        "description": "Pre-Columbian farming village buried beneath volcanic ash in 600 AD, remarkably preserving daily Mayan domestic life."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Passport valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US / Canada / Schengen Visa (for Visa Waiver)",
        "description": "Multiple-entry visa from USA, Canada, or Schengen valid for duration of stay.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Return Air Ticket",
        "description": "Flight booking into El Salvador International Airport San Óscar Romero (SAL).",
        "is_mandatory": true
      },
      {
        "title": "Tourist Card Fee",
        "description": "$12 USD tourist card fee payable upon arrival at airport immigration.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation",
        "description": "Confirmed booking in San Salvador, El Tunco, or Ruta de las Flores.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Verify Visa Waiver: Check valid multiple-entry US, Canadian, or Schengen visa (or CA-4 status).",
      "Book Flights: Book return flights to San Salvador International Airport (SAL).",
      "Arrival at Airport: Land at SAL airport and proceed to immigration desk.",
      "Pay Tourist Card Fee: Purchase the mandatory $12 USD tourist entry card at the immigration booth.",
      "Immigration Stamping: Border officer validates passport and applies 90-day CA-4 regional entry stamp.",
      "Explore El Salvador & CA-4: Travel freely across El Salvador, Guatemala, Honduras, and Nicaragua within the 90-day window."
    ],
    "fees": {
      "visa_fee": "$0 (with US/Schengen visa waiver) / $40 (Consular)",
      "service_fee": "$12 USD Tourist Card",
      "total_fee": "$12 - $52 USD (approx. ₹1,000 - ₹4,300)",
      "notes": "Mandatory $12 USD tourist card fee purchased upon arrival at airport."
    },
    "proc_time": "Instant on Arrival (with Waiver) or 7-10 Days (Consular)",
    "proc_details": "Border entry stamp on arrival with visa waiver or via Salvadoran diplomatic missions.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity beyond entry."
      },
      {
        "category": "CA-4 Tourist Card",
        "details": "$12 USD tourist card payable at airport."
      },
      {
        "category": "Schengen/US Waiver",
        "details": "Valid multiple-entry US/Canadian/Schengen visa grants 90 days stay."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "$50 USD per day",
        "description": "Proof of funds for Central American vacation."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders visit El Salvador with a US visa?",
        "answer": "Yes! Indian citizens holding a valid multiple-entry visa for the USA, Canada, or Schengen area can enter El Salvador visa-free for up to 90 days upon buying a $12 tourist card."
      },
      {
        "question": "What is the Central America CA-4 Border Control Agreement?",
        "answer": "The CA-4 agreement allows free travel across El Salvador, Guatemala, Honduras, and Nicaragua on a single 90-day tourist entry without additional border visas."
      },
      {
        "question": "What currency is accepted in El Salvador?",
        "answer": "El Salvador uses the United States Dollar (USD) and Bitcoin as legal tender."
      }
    ],
    "validity": "90 Days on Arrival (CA-4)",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Dirección General de Migración y Extranjería de El Salvador (migracion.gob.sv)"
  },
  "guatemala": {
    "overview": "Guatemala, the heart of the ancient Mayan civilization, is one of the most culturally and visually breathtaking countries in Central America. Discover the monumental pyramids of Tikal National Park (UNESCO) rising above the dense Petén jungle canopy, the cobblestone streets and Spanish baroque churches of Antigua Guatemala (UNESCO) framed by active volcanoes, the emerald waters of Lake Atitlán ringed by traditional indigenous Mayan villages, and the terraced turquoise limestone pools of Semuc Champey. Indian citizens holding a valid US, Canadian, or Schengen visa enjoy visa-free entry for up to 90 days under the CA-4 agreement.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Tikal National Park & Mayan Pyramids (UNESCO)",
        "description": "Colossal pre-Columbian Mayan pyramids (Temple of the Grand Jaguar) soaring above pristine tropical rainforest canopy."
      },
      {
        "icon": "🌋",
        "title": "Antigua Guatemala & Volcán de Fuego (UNESCO)",
        "description": "Enchanting 16th-century colonial city famous for pastel baroque architecture and views of active erupting Volcán de Fuego."
      },
      {
        "icon": "🌊",
        "title": "Lake Atitlán & Indigenous Mayan Villages",
        "description": "Magnificent volcanic crater lake hailed as one of the most beautiful in the world, ringed by traditional Tz'utujil and Kaqchikel towns."
      },
      {
        "icon": "🏊",
        "title": "Semuc Champey Natural Limestone Pools",
        "description": "Stepped natural turquoise limestone cascades and cascading pools nestled in a lush mountain river gorge."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Original passport valid for at least 6 months beyond travel dates.",
        "is_mandatory": true
      },
      {
        "title": "Valid US / Canada / Schengen Visa (for Visa Waiver)",
        "description": "Multiple-entry visa from USA, Canada, or Schengen area valid during stay.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into La Aurora International Airport (GUA), Guatemala City.",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Tour Itinerary",
        "description": "Confirmed booking in Antigua, Lake Atitlán, or Flores.",
        "is_mandatory": true
      },
      {
        "title": "Guatemala Electronic Entry Declaration",
        "description": "Completed online customs and immigration declaration form prior to arrival.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check US / Schengen Exemption: Holders of valid multi-entry US, Canadian, or Schengen visas qualify for visa-free entry.",
      "Apply via Embassy (if no waiver): Apply for a consular visa at the Embassy of Guatemala in New Delhi.",
      "Fill Electronic Entry Form: Complete the free online customs declaration before flight boarding.",
      "Flight to Guatemala City: Land at La Aurora International Airport (GUA).",
      "Border Control: Present passport, US/Schengen visa, return ticket, and electronic declaration code.",
      "Receive CA-4 Stamp: Border control issues 90-day CA-4 regional entry stamp."
    ],
    "fees": {
      "visa_fee": "$0 (Visa-free with US/Schengen visa) / $50 (Consular)",
      "service_fee": "₹0 (Official)",
      "total_fee": "$0 - $50 USD (approx. ₹0 - ₹4,200)",
      "notes": "Holders of valid US/Canadian/Schengen visas enter completely visa-free."
    },
    "proc_time": "Instant (with Waiver) or 10-15 Days (Consular)",
    "proc_details": "Border entry stamp on arrival with visa waiver or processed at Embassy in New Delhi.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity from entry."
      },
      {
        "category": "Visa Waiver",
        "details": "Multiple-entry US, Canadian, or Schengen visa allows 90 days visa-free entry under CA-4."
      },
      {
        "category": "Return Air Ticket",
        "details": "Mandatory onward/return flight reservation."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Bank Statements",
        "minimum_balance_or_amount": "$500 USD equivalent",
        "description": "Proof of sufficient funds for travel."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian citizens visit Guatemala with a US visa?",
        "answer": "Yes! Indian passport holders with a valid multiple-entry visa for the USA, Canada, or Schengen area can visit Guatemala VISA-FREE for up to 90 days under the CA-4 agreement."
      },
      {
        "question": "What is the CA-4 visa?",
        "answer": "The Central America-4 border control agreement allows tourists to travel freely across Guatemala, El Salvador, Honduras, and Nicaragua for up to 90 days on a single entry."
      },
      {
        "question": "What currency is used in Guatemala?",
        "answer": "The official currency is the Guatemalan Quetzal (GTQ), named after the sacred resplendent quetzal bird. US Dollars are also widely accepted in tourist hubs."
      }
    ],
    "validity": "90 Days on Arrival (CA-4)",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Instituto Guatemalteco de Migración (igm.gob.gt) & Embassy of Guatemala in India"
  },
  "honduras": {
    "overview": "Honduras is a land of incredible biodiversity and ancient mysteries, home to the UNESCO-listed Copán Mayan Ruins (celebrated for the Hieroglyphic Stairway and intricate stone stelae), the world-class Caribbean diving islands of Roatán and Utila along the Mesoamerican Barrier Reef (famous for swimming with whale sharks), the pristine Cayos Cochinos marine reserve, and the colonial cobblestone city of Comayagua. Indian citizens holding a valid multiple-entry US, Canadian, or Schengen visa enjoy visa-free entry for up to 90 days under the CA-4 agreement.",
    "highlights": [
      {
        "icon": "🏛️",
        "title": "Copán Mayan Ruins (UNESCO)",
        "description": "The 'Paris of the Mayan World', renowned for the 63-step Hieroglyphic Stairway (longest Mayan text) and stone stelae."
      },
      {
        "icon": "🦈",
        "title": "Roatán & Utila Bay Islands",
        "description": "World-class scuba diving along the Mesoamerican Barrier Reef, famous for affordable dive certifications and whale sharks."
      },
      {
        "icon": "🏝️",
        "title": "Cayos Cochinos Marine Reserve",
        "description": "Unspoiled archipelago of 15 coral cays inhabited by the indigenous Garifuna people and surrounded by pristine reefs."
      },
      {
        "icon": "🌿",
        "title": "Pico Bonito National Park",
        "description": "Rugged tropical mountain rainforest rising directly from the Caribbean coast, offering class-IV river rafting and canopy ziplines."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Valid for at least 6 months beyond travel dates with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US / Canada / Schengen Visa (for Visa Waiver)",
        "description": "Multiple-entry visa from USA, Canada, or Schengen area valid for stay duration.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into Roatán (RTB), San Pedro Sula (SAP), or Palmerola/Tegucigalpa (XPL).",
        "is_mandatory": true
      },
      {
        "title": "Hotel Reservation / Dive Resort Booking",
        "description": "Confirmed booking in Roatán, Utila, or Copán Ruinas.",
        "is_mandatory": true
      },
      {
        "title": "Honduras Pre-Check (Prechequeo Migratorio)",
        "description": "Mandatory online immigration pre-check completed before flight boarding.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Verify Visa Waiver: Check valid multiple-entry US, Canadian, or Schengen visa.",
      "Complete Prechequeo Migratorio: Fill the mandatory free online immigration pre-check at prechequeo.inm.gob.hn.",
      "Fly to Honduras: Land at Roatán (RTB) or Palmerola International Airport (XPL).",
      "Border Inspection: Present passport, pre-check confirmation, return ticket, and US/Schengen visa.",
      "Receive CA-4 Stamp: Immigration officer stamps passport for up to 90 days stay across the CA-4 region.",
      "Explore Honduras: Enjoy diving in Roatán, exploring Copán, or continuing into Guatemala/El Salvador."
    ],
    "fees": {
      "visa_fee": "$0 (Visa-free with US/Schengen visa) / $30 (Consular)",
      "service_fee": "₹0 (Official)",
      "total_fee": "$0 - $30 USD (approx. ₹0 - ₹2,500)",
      "notes": "Indian holders of valid US/Canadian/Schengen visas enter completely visa-free."
    },
    "proc_time": "Instant (with Waiver) or 10-14 Days (Consular)",
    "proc_details": "Border entry stamp on arrival with visa waiver or processed at consular mission.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months validity."
      },
      {
        "category": "Online Prechequeo",
        "details": "Mandatory pre-registration at prechequeo.inm.gob.hn prior to departure."
      },
      {
        "category": "CA-4 Border Exemption",
        "details": "US/Schengen visa grants 90 days stay across the CA-4 area."
      }
    ],
    "financial_proofs": [
      {
        "type": "Credit Card / Cash",
        "minimum_balance_or_amount": "$50 USD per day",
        "description": "Proof of funds for island/adventure travel."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders enter Honduras with a US visa?",
        "answer": "Yes! Indian passport holders holding a valid multiple-entry visa for the USA, Canada, or Schengen area enter Honduras VISA-FREE for up to 90 days under the CA-4 agreement."
      },
      {
        "question": "What is the Prechequeo Migratorio in Honduras?",
        "answer": "It is a mandatory free electronic immigration pre-check that all travelers must complete at prechequeo.inm.gob.hn before boarding their flight to Honduras."
      },
      {
        "question": "Where can you swim with whale sharks in Honduras?",
        "answer": "The island of Utila is one of the few places in the world where whale sharks can be spotted swimming year-round, especially between March and April and September and December."
      }
    ],
    "validity": "90 Days on Arrival (CA-4)",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Instituto Nacional de Migración de Honduras (inm.gob.hn)"
  },
  "nicaragua": {
    "overview": "Nicaragua, the 'Land of Lakes and Volcanoes', is an eco-adventurer's paradise boasting Granada's vibrant Spanish colonial architecture on Lake Nicaragua, Ometepe Island (a volcanic island formed by two volcanoes rising from a freshwater lake), the glowing lava lake inside Masaya Volcano, volcano-boarding down the black volcanic slopes of Cerro Negro in León, and the emerald Pacific surf haven of San Juan del Sur. Indian passport holders holding a valid multiple-entry US, Canadian, or Schengen visa enjoy visa-free entry upon purchasing a $10 tourist card on arrival.",
    "highlights": [
      {
        "icon": "🌋",
        "title": "Masaya Volcano Lava Lake & Cerro Negro",
        "description": "Peer into the active bubbling glowing molten lava lake of Masaya, and surf down Cerro Negro's black gravel slopes on a board."
      },
      {
        "icon": "🏝️",
        "title": "Ometepe Island (Lake Nicaragua)",
        "description": "Spectacular freshwater lake island formed by twin volcanoes (Concepción and Maderas) with waterfalls and petroglyphs."
      },
      {
        "icon": "🏛️",
        "title": "Granada & León Colonial Cities",
        "description": "Picturesque 16th-century Spanish colonial pastel mansions, Granada's cathedral, and León's rooftop Cathedral (UNESCO)."
      },
      {
        "icon": "🏄",
        "title": "San Juan del Sur & Emerald Coast",
        "description": "Vibrant Pacific coastal town famous for world-class surf breaks, sunset catamaran cruises, and beachfront dining."
      }
    ],
    "documents": [
      {
        "title": "Valid Passport",
        "description": "Passport valid for at least 6 months with 2 blank pages.",
        "is_mandatory": true
      },
      {
        "title": "Valid US / Canada / Schengen Visa (for Visa Waiver)",
        "description": "Multiple-entry visa from USA, Canada, or Schengen area valid for stay.",
        "is_mandatory": false
      },
      {
        "title": "Confirmed Round-Trip Flight Ticket",
        "description": "Flight booking into Augusto C. Sandino International Airport (MGA), Managua.",
        "is_mandatory": true
      },
      {
        "title": "Tourist Card Fee",
        "description": "$10 USD tourist card fee payable in cash upon arrival at airport.",
        "is_mandatory": true
      },
      {
        "title": "Yellow Fever Vaccination Certificate",
        "description": "Mandatory if arriving from countries with risk of yellow fever transmission.",
        "is_mandatory": true
      }
    ],
    "steps": [
      "Check Visa Waiver: Ensure you hold a valid multiple-entry US, Canadian, or Schengen visa.",
      "Online Immigration Notice: Submit online entry notification to Nicaragua immigration at solicitudes.migob.gob.ni.",
      "Fly to Managua: Land at Augusto C. Sandino International Airport (MGA).",
      "Pay Tourist Card Fee: Purchase the $10 USD tourist card at the border immigration booth.",
      "Border Inspection: Present passport, US/Schengen visa, return ticket, and immigration slip.",
      "Receive CA-4 Stamp: Border officer stamps passport for up to 90 days stay across the CA-4 region."
    ],
    "fees": {
      "visa_fee": "$0 (with US/Schengen visa waiver) / $50 (Consular)",
      "service_fee": "$10 USD Tourist Card",
      "total_fee": "$10 - $60 USD (approx. ₹830 - ₹5,000)",
      "notes": "Mandatory $10 USD tourist card fee payable in cash upon arrival."
    },
    "proc_time": "Instant on Arrival (with Waiver) or 10-15 Days (Consular)",
    "proc_details": "Border clearance on arrival with US/Schengen waiver or consular processing.",
    "requirements": [
      {
        "category": "Passport Validity",
        "details": "Minimum 6 months remaining validity."
      },
      {
        "category": "Tourist Card Fee",
        "details": "$10 USD cash payable at immigration on arrival."
      },
      {
        "category": "CA-4 Border Exemption",
        "details": "Valid multiple-entry US/Schengen visa allows 90 days visa-free travel."
      }
    ],
    "financial_proofs": [
      {
        "type": "Cash / Card",
        "minimum_balance_or_amount": "$500 USD equivalent",
        "description": "Proof of funds for Central American vacation."
      }
    ],
    "faqs": [
      {
        "question": "Can Indian passport holders enter Nicaragua with a US visa?",
        "answer": "Yes! Indian passport holders holding a valid multiple-entry visa for the USA, Canada, or Schengen area can enter Nicaragua VISA-FREE for up to 90 days upon paying the $10 tourist card fee."
      },
      {
        "question": "What is volcano boarding at Cerro Negro?",
        "answer": "Cerro Negro is an active volcano near León where adventurers hike up the cone and slide down the steep 45-degree slope on a custom wooden board at speeds up to 80 km/h."
      },
      {
        "question": "What is unique about Lake Nicaragua?",
        "answer": "Lake Nicaragua (Cocibolca) is the largest freshwater lake in Central America and the only freshwater lake in the world that is home to oceanic bull sharks."
      }
    ],
    "validity": "90 Days on Arrival (CA-4)",
    "stay_duration": "Up to 90 Days",
    "entry_type": "Single / Multiple Entry",
    "official_source": "Dirección General de Migración y Extranjería de Nicaragua (migob.gob.ni)"
  }
};

export function getTourismOverview(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.overview) return TOURISM_DESTS[c].overview;
  const map: Record<string, string> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': 'Thailand offers visa-free entry for Indian passport holders for up to 60 days. You can enjoy the vibrant culture, stunning beaches, delicious cuisine, and rich heritage. No prior visa application required — just show up with your passport and return ticket.',
    'malaysia': 'Malaysia offers visa-free entry for Indian passport holders for up to 30 days. Explore the diverse landscapes, from the Petronas Twin Towers in Kuala Lumpur to the rainforests of Borneo. Complete the Malaysia Digital Arrival Card (MDAC) online before arrival.',
    'mauritius': 'Mauritius offers visa-free entry for Indian passport holders for up to 90 days. Enjoy pristine beaches, turquoise lagoons, and luxury resorts. Complete the All-in-One Digital Travel Form online before departure — no consular fees required.',
    'maldives': 'Maldives offers visa-free entry for Indian passport holders for up to 30 days (extendable to 90 days). Experience overwater bungalows, crystal-clear waters, and world-class diving. Complete the IMUGA Traveler Declaration Form online before arrival.',
    'jamaica': 'Jamaica offers visa-free entry for Indian passport holders for up to 30 days. Enjoy reggae culture, beautiful beaches, and lush mountains. Complete the C5 Online Immigration & Customs Form at enterjamaica.com before boarding — no embassy visit required.',
    'nepal': 'Nepal offers visa-free entry for Indian citizens under the 1950 Indo-Nepal Treaty. Travel freely with your Indian passport or Voter ID. No visa application, no fees, no biometrics — just show up and enjoy the Himalayas.',
    'bhutan': 'Bhutan offers visa-free entry for Indian citizens for up to 14 days (extendable). Enjoy the Land of the Thunder Dragon with its monasteries, fortresses, and stunning mountain views. Pay the Sustainable Development Fee (SDF) of ₹1,200 per night.',
    'seychelles': 'Seychelles offers visa-free entry for Indian passport holders for up to 30 days (extendable to 90 days). Experience pristine beaches, granite boulders, and tropical paradise. Complete the Travel Authorization (TA) online at seychelles.govtas.com before departure.',
    
    // ── EVISA / ONLINE VISA COUNTRIES ──
    'uae': 'The UAE Tourist eVisa allows Indian passport holders to visit Dubai, Abu Dhabi, and other Emirates for tourism, leisure, or family visits. Apply online through ICP/GDRFA portals. Choose between 30-day or 60-day single/multiple entry permits. No physical embassy visit required.',
    'singapore': 'Singapore offers an official eVisa for Indian passport holders. Apply through ICA Authorized Visa Agents (AVAs) or through a Singapore Citizen/PR sponsor. The visa is valid for up to 2 years with multiple entries. Submit SG Arrival Card (SGAC) online within 3 days of arrival.',
    'turkey': 'Turkey offers a conditional online eVisa for Indian passport holders. If you hold a valid US, UK, Schengen, or Ireland visa, you can apply instantly online at evisa.gov.tr. Otherwise, apply through Gateway Globe for a sticker visa. Valid for 180 days, stay up to 30 days.',
    'jordan': 'Jordan offers a Tourist Visa on Arrival for Indian passport holders. Purchase the Jordan Pass online (jordanpass.jo) starting at 70 JOD to waive the 40 JOD visa fee and cover entry to Petra & 40+ attractions. Valid for 30 days (extendable to 90 days).',
    'egypt': 'Egypt offers an online eVisa for Indian passport holders. Apply at visa2egypt.gov.eg for 30-day single or multiple entry. If you hold a valid US/UK/Schengen visa, you can also get a 30-day Visa on Arrival for $25 USD at Cairo Airport.',
    'kenya': 'Kenya now offers an Electronic Travel Authorisation (eTA) replacing the traditional visa. Apply online at etakenya.go.ke. Indian passport holders must obtain eTA before boarding. Valid for 90 days single entry. No visas on arrival.',
    'tanzania': 'Tanzania offers an online eVisa for Indian passport holders. Apply at visa.immigration.go.tz for 90-day single entry. If visiting Zanzibar, purchase mandatory inbound travel insurance at visitzanzibar.go.tz for $44 USD.',
    
    // ── SCHENGEN COUNTRIES ──
    'france': 'France Schengen Visa (Type C) allows Indian passport holders to travel to France and all 29 Schengen countries for tourism, leisure, and short visits. Apply through France-Visas portal and VFS Global. Valid for up to 90 days within 180 days.',
    'germany': 'Germany Schengen Visa (Type C) allows Indian passport holders to travel to Germany and all 29 Schengen countries. Apply through the German Federal Foreign Office portal and VFS Global. Valid for up to 90 days within 180 days.',
    'italy': 'Italy Schengen Visa (Type C) allows Indian passport holders to travel to Italy and all 29 Schengen countries. Apply through the Italian Ministry of Foreign Affairs (esteri.it) and VFS Global. Valid for up to 90 days within 180 days.',
    'spain': 'Spain Schengen Visa (Type C) allows Indian passport holders to travel to Spain and all 29 Schengen countries. Apply through BLS International Spain (blsspainvisa.com). Valid for up to 90 days within 180 days. Note: Spain uses BLS International, not VFS Global.',
    'greece': 'Greece Schengen Visa (Type C) allows Indian passport holders to travel to Greece and all 29 Schengen countries. Apply through GVCW Greece (gvcworld.eu). Valid for up to 90 days within 180 days. Note: Greece uses GVCW, not VFS Global.',
    'netherlands': 'Netherlands Schengen Visa (Type C) allows Indian passport holders to travel to the Netherlands and all 29 Schengen countries. Apply through the Dutch Ministry of Foreign Affairs (netherlandsworldwide.nl) and VFS Global.',
    'switzerland': 'Switzerland Schengen Visa (Type C) allows Indian passport holders to travel to Switzerland and all 29 Schengen countries. Apply through SEM (sem.admin.ch) and VFS Global. Valid for up to 90 days within 180 days.',
    'portugal': 'Portugal Schengen Visa (Type C) allows Indian passport holders to travel to Portugal and all 29 Schengen countries. Apply through the Portuguese Ministry of Foreign Affairs (vistos.mne.gov.pt) and VFS Global.',
    'austria': 'Austria Schengen Visa (Type C) allows Indian passport holders to travel to Austria and all 29 Schengen countries. Apply through the Austrian Embassy (bmeia.gv.at) and VFS Global.',
    'belgium': 'Belgium Schengen Visa (Type C) allows Indian passport holders to travel to Belgium and all 29 Schengen countries. Apply through the Belgian Ministry of Foreign Affairs (diplomatie.belgium.be) and VFS Global.',
    'denmark': 'Denmark Schengen Visa (Type C) allows Indian passport holders to travel to Denmark and all 29 Schengen countries. Apply through the Danish Ministry of Foreign Affairs (um.dk) and VFS Global.',
    'sweden': 'Sweden Schengen Visa (Type C) allows Indian passport holders to travel to Sweden and all 29 Schengen countries. Apply through the Government of Sweden (government.se) and VFS Global.',
    'norway': 'Norway Schengen Visa (Type C) allows Indian passport holders to travel to Norway and all 29 Schengen countries. Apply through UDI (udi.no) and VFS Global.',
    'finland': 'Finland Schengen Visa (Type C) allows Indian passport holders to travel to Finland and all 29 Schengen countries. Apply through the Finnish Ministry of Foreign Affairs (um.fi) and VFS Global.',
    
    // ── STANDARD TOURIST VISA COUNTRIES ──
    'australia': 'Australia Visitor Visa (Subclass 600) allows Indian passport holders to visit Australia for tourism, holidays, and visiting family/friends. Apply online through ImmiAccount. Choose between 3, 6, or 12 months stay. Multiple entry available.',
    'uk': 'UK Standard Visitor Visa allows Indian passport holders to visit the UK for tourism, holidays, and visiting family/friends. Apply online through GOV.UK. Valid for 6 months with multiple entries. Biometrics required at VFS Global UK.',
    'usa': 'US B1/B2 Visitor Visa allows Indian passport holders to visit the USA for tourism, holidays, and visiting family/friends. Apply online through DS-160 and attend interview at US Embassy. Valid for 10 years multiple entry. CBP determines stay at port of entry.',
    'canada': 'Canada Visitor Visa (TRV) allows Indian passport holders to visit Canada for tourism, holidays, and visiting family/friends. Apply online through IRCC. Valid for up to 10 years multiple entry. Biometrics required at VFS Global Canada.',
    'japan': 'Japan Tourist Visa allows Indian passport holders to visit Japan for tourism, holidays, and visiting family/friends. Apply online through evisa.mofa.go.jp or through VFS Global Japan. Valid for 15, 30, or 90 days single entry.',
    'south-korea': 'South Korea Tourist Visa (C-3-9) allows Indian passport holders to visit South Korea for tourism, holidays, and visiting family/friends. Apply through KVAC (visa.go.kr). Valid for 90 days single entry. K-ETA available for US/EU/UK visa holders.',
    'vietnam': 'Vietnam eVisa allows Indian passport holders to visit Vietnam for tourism, holidays, and leisure. Apply online at evisa.xuatnhapcanh.gov.vn. Choose between 30 or 90 days single or multiple entry. eVisa is accepted at 33 international border checkpoints.',
    'indonesia': 'Indonesia Tourist Visa (e-VOA B1) allows Indian passport holders to visit Indonesia, including Bali, for tourism, holidays, and leisure. Apply online at evisa.imigrasi.go.id for 30 days (extendable to 60 days). Electronic gates available at Jakarta and Bali airports.',
    'cambodia': 'Cambodia Tourist Visa (Type T) allows Indian passport holders to visit Cambodia for tourism, holidays, and leisure. Apply online at evisa.gov.kh for 30-day single entry. Also available as Visa on Arrival for $30 USD cash.',
    'sri-lanka': 'Sri Lanka Tourist Visa (ETA) allows Indian passport holders to visit Sri Lanka for tourism, holidays, and leisure. Apply online at srilankaevisa.lk for 30-day double entry. Fee may be waived for Indian citizens under bilateral agreements.',
    'philippines': 'Philippines Tourist Visa (9a) allows Indian passport holders to visit the Philippines for tourism, holidays, and leisure. Apply through VFS Global Philippines. Valid for 30 days single entry. AJACSSUK visa holders can enter visa-free for 14 days.',
    'qatar': 'Qatar Tourist Visa on Arrival allows Indian passport holders to visit Qatar for tourism, holidays, and leisure. Valid for 30 days (extendable to 60 days). Book hotel through Discover Qatar (discoverqatar.qa) and purchase mandatory health insurance (QAR 50).',
    'saudi-arabia': 'Saudi Arabia Tourist eVisa allows Indian passport holders to visit Saudi Arabia for tourism, Umrah (outside Hajj), and leisure. Apply online at visa.visitsaudi.com for 1-year multiple entry. Each visit allows up to 90 days stay. Mandatory insurance included.',
    'oman': 'Oman Tourist eVisa allows Indian passport holders to visit Oman for tourism, holidays, and leisure. Apply online at evisa.rop.gov.om for 30-day single entry or 1-year multiple entry. US/UK/Schengen visa holders can enter visa-free for 14 days.',
    'bahrain': 'Bahrain Tourist eVisa allows Indian passport holders to visit Bahrain for tourism, holidays, and leisure. Apply online at evisa.gov.bh for 14 or 30 days multiple entry. Bank statements required for online application.',
    'new-zealand': 'New Zealand Visitor Visa allows Indian passport holders to visit New Zealand for tourism, holidays, and visiting family/friends. Apply online through Immigration New Zealand (immigration.govt.nz). Valid for 3, 6, or 9 months stay. Multiple entry available.',
    'south-africa': 'South Africa Visitor Visa (Section 11(1)) allows Indian passport holders to visit South Africa for tourism, holidays, and leisure. Apply through VFS Global South Africa. Valid for 90 days single/multiple entry. Consular fee is ₹0 for Indian citizens — only VFS service fee applies.',
    'brazil': 'Brazil Tourist Visa allows Indian passport holders to visit Brazil for tourism, holidays, and leisure. Apply through the Brazilian Embassy via VFS Global. Valid for up to 90 days single/multiple entry. E-visa available for eligible applicants.'
  ,

    'czech-republic': 'The Czech Republic Tourist Visa (Schengen Visa Type C) allows Indian citizens to explore Prague\'s historic Old Town, Prague Castle, and the Charles Bridge, as well as UNESCO Heritage towns like Český Krumlov and world-famous spa towns such as Karlovy Vary. A Czech Schengen visa allows unrestricted travel across all 29 Schengen states within the standard 90/180-day limitation.',
    'poland': 'The Poland Tourist Visa (Schengen Visa Type C) permits Indian passport holders to explore Poland\'s remarkable historical legacy and vibrant cultural heritage. Discover Warsaw\'s reconstructed Royal Castle and Old Town, the ancient royal capital of Kraków with Wawel Castle, the medieval salt mine at Wieliczka, and the Baltic port of Gdańsk, alongside free mobility across all Schengen countries.',
    'hungary': 'The Hungary Tourist Visa (Schengen Visa Type C) opens the gateway to Central European grandeur. Budapest, the \'Pearl of the Danube\', features architectural icons including the Hungarian Parliament, Buda Castle, and historic thermal spas like Széchenyi, alongside scenic Lake Balaton and the Tokaj wine region, with full Schengen travel privileges.',
    'croatia': 'The Croatia Tourist Visa (Schengen Visa Type C) allows Indian passport holders to experience the jewel of the Adriatic. Walk Dubrovnik\'s famous ancient stone walls, explore Emperor Diocletian\'s Palace in Split, cruise the sunny Dalmatian islands (Hvar, Korčula), and hike through the cascading waterfalls of Plitvice Lakes National Park with full Schengen access.',
    'bulgaria': 'The Bulgaria Tourist Visa (Short-Stay Type C) enables Indian travelers to discover Southeast Europe\'s ancient crossroads. Highlights include Sofia\'s Alexander Nevsky Cathedral, Europe\'s oldest continuously inhabited city Plovdiv, the spiritual mountain sanctuary of Rila Monastery, and popular Black Sea resorts like Varna and Sunny Beach.',
    'cyprus': 'The Cyprus Tourist Visa (Category C Short-Stay) allows Indian citizens to explore the Mediterranean island nation. Discover UNESCO World Heritage archaeological parks in Paphos, lively coastal promenades in Limassol, the mythical birthplace of Aphrodite at Petra tou Romiou, and tranquil Byzantine monasteries in the Troodos Mountains.',
    'romania': 'The Romania Short-Stay Tourist Visa (Type C/TU) permits Indian visitors to explore Eastern Europe\'s most captivating landscapes and legendary heritage. Tour Bucharest\'s grand boulevards, mythical Transylvanian Gothic fortresses (Bran Castle and Peleș Castle), medieval citadels like Sighișoara, and the Carpathian Mountains.',
    'slovakia': 'The Slovakia Tourist Visa (Schengen Visa Type C) enables Indian visitors to discover Central Europe\'s dramatic mountainous landscapes. Highlights include Bratislava\'s hilltop castle and charming Old Town on the Danube, the alpine peaks and glacier lakes of the High Tatras, UNESCO World Heritage fortress Spiš Castle, and karst ice caves.',
    'slovenia': 'The Slovakia Tourist Visa (Schengen Visa Type C) allows Indian citizens to discover Europe\'s green alpine jewel. Key attractions include the fairytale emerald waters of Lake Bled with its island church, the eco-friendly capital Ljubljana, Triglav National Park, and the subterranean wonders of Postojna Cave.',
    'estonia': 'The Estonia Tourist Visa (Schengen Visa Type C) lets Indian travelers explore the most digitally advanced Nordic-Baltic nation. Walk through Tallinn\'s impeccably preserved UNESCO medieval Old Town, unwind in the Baltic seaside resort of Pärnu, explore Lahemaa National Park, and travel across the Schengen zone.',
    'latvia': 'The Latvia Tourist Visa (Schengen Visa Type C) provides Indian passport holders access to the Baltic coast. Experience Riga\'s world-famous Art Nouveau architecture and historic Old Town, stroll the endless white-sand beaches of Jūrmala on the Gulf of Riga, and explore medieval castles and primeval forests in Gauja National Park.',
    'lithuania': 'The Lithuania Tourist Visa (Schengen Visa Type C) enables Indian citizens to immerse themselves in Baltic culture, architecture, and nature. Key attractions include Vilnius\'s sprawling Baroque Old Town, the Gothic island fortress of Trakai Castle set amid tranquil lakes, the Hill of Crosses pilgrimage site, and the towering sand dunes of the Curonian Spit.',
    'luxembourg': 'The Luxembourg Tourist Visa (Schengen Visa Type C) invites Indian visitors to explore one of Europe\'s wealthiest and most picturesque nations. Discover the dramatic clifftop UNESCO fortifications and underground Bock Casemates of Luxembourg City, the Grand Ducal Palace, the fairytale castle of Vianden, and the scenic vineyards of the Moselle Valley, alongside free nationwide public transit.',
    'malta': 'The Malta Tourist Visa (Schengen Visa Type C) permits Indian passport holders to visit the sun-soaked Mediterranean archipelago. Explore the fortified UNESCO capital Valletta built by the Knights of St. John, the silent walled city of Mdina, the crystal-clear azure waters of the Blue Lagoon on Comino, 5,000-year-old megalithic temples older than the Pyramids, and scenic sister island Gozo.',
    'iceland': 'The Iceland Tourist Visa (Schengen Visa Type C) allows Indian travelers to embark on the ultimate land of fire and ice adventure. Marvel at the dancing Northern Lights (Aurora Borealis), journey along the Golden Circle to see Gullfoss waterfall and Geysir, soak in the mineral-rich geothermal waters of the Blue Lagoon, and witness volcanic black sand beaches in Vík.',
    'liechtenstein': 'The Liechtenstein Tourist Visa (Schengen Visa Type C) allows Indian passport holders to visit the Alpine principality nestled between Switzerland and Austria. Explore the capital Vaduz dominated by the princely Vaduz Castle, enjoy scenic Alpine hiking in Malbun, tour the prince\'s historic vineyards in the Rhine Valley, and experience seamless border-free Schengen entry.',
    'israel': 'The Israel Tourist Visa (B/2 Visitor Visa) permits Indian citizens to visit the holy and historic lands of Israel. Experience the sacred history and timeless spiritual sites of Jerusalem\'s Old City (Western Wall, Church of the Holy Sepulchre, Dome of the Rock), the vibrant Mediterranean beaches and high-tech nightlife of Tel Aviv, floating in the mineral-rich Dead Sea, and ancient fortress Masada.',
    'chile': 'The Chile Tourist Visa (Visto de Turismo) enables Indian passport holders to explore South America\'s dramatic Pacific-to-Andes territory. Highlights include trekking through the granite towers and glaciers of Torres del Paine National Park in Patagonia, stargazing in the world\'s driest Atacama Desert, wine tasting in the Central Valley, and exploring the vibrant capital Santiago.',
    'mexico': 'The Mexico Tourist Visa (Visa de Turista) allows Indian travelers to experience the vibrant colors, ancient pre-Columbian history, and world-class cuisine of Mexico. Highlights include exploring the ancient Mayan wonder of Chichén Itzá, relaxing on the turquoise Caribbean beaches of Cancún and the Riviera Maya, exploring the historic center of Mexico City, and soaking in Oaxaca\'s colonial charm (visa-exempt for valid US/UK/Canada/Japan/Schengen visa holders).',
    'ukraine': 'The Ukraine Tourist e-Visa (Type C-02) allows Indian travelers to visit Eastern Europe\'s cultural heartland. Key attractions include the golden-domed monasteries and cathedrals of Kyiv (Kyiv Pechersk Lavra, St. Sophia\'s), the cobblestone streets and coffee houses of UNESCO-listed Lviv, the Black Sea port of Odesa, and the picturesque Carpathian Mountains.'

  };
  
  return map[c] || 
    `The ${country} Tourist Visa allows Indian passport holders to visit ${country} for tourism, holidays, leisure, and visiting family or friends. Please check the official embassy website for current requirements.`;
}

// ── 2. TOURISM HIGHLIGHTS — COUNTRY SPECIFIC ──
export function getTourismHighlights(country: string): TourismHighlightItem[] {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.highlights) return TOURISM_DESTS[c].highlights;
  const map: Record<string, TourismHighlightItem[]> = {
    'thailand': [
      { icon: '🏖️', title: 'Beach Paradise', description: 'Phuket, Krabi, Koh Samui — world-famous beaches and islands' },
      { icon: '🍜', title: 'Cuisine & Culture', description: 'Street food, night markets, Buddhist temples, and floating markets' },
      { icon: '🏛️', title: 'Heritage Sites', description: 'Grand Palace, Wat Phra Kaew, Ayutthaya Historical Park' },
      { icon: '✈️', title: 'Visa-Free Entry', description: '60-day visa-free entry for Indian passport holders' }
    ],
    'malaysia': [
      { icon: '🏙️', title: 'Modern Cities', description: 'Kuala Lumpur, Penang, Johor Bahru — modern architecture' },
      { icon: '🌴', title: 'Tropical Paradise', description: 'Langkawi, Borneo, Perhentian Islands — beaches and rainforests' },
      { icon: '🍲', title: 'Cuisine', description: 'Nasi lemak, laksa, satay — diverse Malay, Chinese, and Indian food' },
      { icon: '✈️', title: 'Visa-Free Entry', description: '30-day visa-free entry for Indian passport holders with MDAC' }
    ],
    'mauritius': [
      { icon: '🏖️', title: 'Beach Paradise', description: 'Pristine beaches, turquoise lagoons, and luxury resorts' },
      { icon: '🌺', title: 'Tropical Culture', description: 'Creole culture, dhol music, and diverse cuisine' },
      { icon: '🏝️', title: 'Island Hopping', description: 'Explore Île aux Cerfs, Rodrigues, and other islands' },
      { icon: '✈️', title: 'Visa-Free Entry', description: '90-day visa-free entry for Indian passport holders' }
    ],
    'maldives': [
      { icon: '🏝️', title: 'Overwater Luxury', description: 'Private island resorts, water villas, and turquoise lagoons' },
      { icon: '🤿', title: 'World-Class Diving', description: 'Manta rays, whale sharks, vibrant coral reefs' },
      { icon: '🌅', title: 'Sunset Cruises', description: 'Dolphin watching and private sandbank dinners' },
      { icon: '✈️', title: 'Visa on Arrival', description: 'Free 30-day visa on arrival for all tourists' }
    ],
    'jamaica': [
      { icon: '🎵', title: 'Reggae Culture', description: 'Bob Marley, Kingston, and vibrant music scene' },
      { icon: '🏖️', title: 'Stunning Beaches', description: 'Seven Mile Beach, Negril, Montego Bay, Ocho Rios' },
      { icon: '🌴', title: 'Natural Beauty', description: 'Blue Mountains, Dunn\'s River Falls, lush rainforests' },
      { icon: '✈️', title: 'Visa-Free Entry', description: '30-day visa-free entry for Indian passport holders with C5 form' }
    ],
    'nepal': [
      { icon: '🏔️', title: 'Himalayan Peaks', description: 'Mount Everest, Annapurna range, world-class trekking' },
      { icon: '🛕', title: 'Ancient Temples', description: 'Pashupatinath, Boudhanath, Swayambhunath, Durbar Squares' },
      { icon: '🐅', title: 'Wildlife Safaris', description: 'Chitwan National Park — one-horned rhinos & Bengal tigers' },
      { icon: '✈️', title: 'Freedom of Movement', description: 'Zero visa requirements for Indian citizens' }
    ],
    'bhutan': [
      { icon: '🏰', title: 'Tiger\'s Nest', description: 'Iconic Paro Taktsang monastery perched on mountain cliffs' },
      { icon: '🌿', title: 'Carbon Negative', description: 'Pristine valleys, ancient dzongs, and untouched nature' },
      { icon: '🎭', title: 'Rich Traditions', description: 'Colourful tshechu festivals, archery, and Buddhist culture' },
      { icon: '✈️', title: 'Concessional Entry', description: 'Entry permit on arrival with statutory SDF' }
    ],
    'seychelles': [
      { icon: '🏖️', title: 'Anse Source d\'Argent', description: 'World-famous granite boulder beaches and turquoise waters' },
      { icon: '🐢', title: 'Giant Tortoises', description: 'Curieuse Island Aldabra tortoises in natural habitat' },
      { icon: '🌴', title: 'Vallée de Mai', description: 'UNESCO palm forest home to the legendary Coco de Mer' },
      { icon: '✈️', title: 'Visa-Free Entry', description: '30-day visitor permit on arrival with online TA' }
    ],
    'uae': [
      { icon: '🌆', title: 'Modern Marvels', description: 'Burj Khalifa, Palm Jumeirah, Dubai Mall — iconic skyline' },
      { icon: '🛍️', title: 'Shopping & Luxury', description: 'Dubai Mall, Mall of Emirates, gold and spice souks' },
      { icon: '🏜️', title: 'Desert Adventures', description: 'Desert safaris, dune bashing, camel rides, Bedouin camps' },
      { icon: '📱', title: '100% Online eVisa', description: 'Apply online via ICP/GDRFA — no physical embassy visit required' }
    ],
    'singapore': [
      { icon: '🏙️', title: 'City of the Future', description: 'Marina Bay Sands, Gardens by the Bay, Supertree Grove' },
      { icon: '🍲', title: 'Food Paradise', description: 'Hawker centres, Michelin-starred street food, diverse cuisine' },
      { icon: '🛍️', title: 'Shopping Haven', description: 'Orchard Road, Bugis Street, luxury malls and local markets' },
      { icon: '📱', title: 'SGAC Required', description: 'Submit SG Arrival Card online within 3 days of arrival' }
    ],
    'turkey': [
      { icon: '🕌', title: 'Historic Sites', description: 'Hagia Sophia, Blue Mosque, Topkapi Palace, and more' },
      { icon: '🎈', title: 'Cappadocia', description: 'Hot air balloons, fairy chimneys, underground cities' },
      { icon: '🍽️', title: 'Cuisine', description: 'Kebabs, baklava, Turkish tea, and world-class dining' },
      { icon: '📱', title: 'Online eVisa', description: 'Conditional online eVisa available at evisa.gov.tr' }
    ],
    'jordan': [
      { icon: '🏛️', title: 'Petra Wonder', description: 'Ancient Rose City carved into pink sandstone cliffs' },
      { icon: '🏜️', title: 'Wadi Rum Desert', description: 'Mars-like red desert landscapes and Bedouin stargazing' },
      { icon: '🌊', title: 'Dead Sea Floating', description: 'Lowest point on earth with mineral-rich therapeutic waters' },
      { icon: '📱', title: 'Jordan Pass', description: 'Waives visa fee and includes entry to 40+ attractions' }
    ],
    'egypt': [
      { icon: '🏛️', title: 'Ancient Pyramids', description: 'Giza Pyramids, Sphinx, Valley of the Kings, and temples' },
      { icon: '🌊', title: 'Red Sea', description: 'World-class diving, snorkeling, and beach resorts' },
      { icon: '🏜️', title: 'Desert Adventures', description: 'Sahara Desert, oasis tours, and camel trekking' },
      { icon: '📱', title: 'Online eVisa', description: 'Apply online at visa2egypt.gov.eg for 30-day visa' }
    ],
    'kenya': [
      { icon: '🦁', title: 'Safari Adventure', description: 'Masai Mara, Amboseli, Tsavo — Big Five and wildlife' },
      { icon: '🌅', title: 'Scenic Landscapes', description: 'Great Rift Valley, Mount Kenya, Lake Nakuru' },
      { icon: '🌊', title: 'Coastal Beauty', description: 'Mombasa, Diani Beach, Lamu Island — Indian Ocean beaches' },
      { icon: '📱', title: '100% eTA', description: 'Kenya eTA mandatory before boarding — apply at etakenya.go.ke' }
    ],
    'tanzania': [
      { icon: '🦁', title: 'Serengeti Safari', description: 'Great Migration, Serengeti, Ngorongoro Crater, Tarangire' },
      { icon: '🏝️', title: 'Zanzibar Beaches', description: 'Stone Town, white-sand beaches, spice tours' },
      { icon: '🗻', title: 'Mount Kilimanjaro', description: 'Africa\'s highest peak — trekking and climbing' },
      { icon: '📱', title: 'Online eVisa', description: 'Apply at visa.immigration.go.tz for 90-day visa' }
    ],
    'france': [
      { icon: '🗼', title: 'Eiffel Tower & Monuments', description: 'Iconic landmarks, museums, and historic architecture' },
      { icon: '🍷', title: 'Cuisine & Wine', description: 'World-class cuisine, wine regions, and patisseries' },
      { icon: '🎨', title: 'Art & Culture', description: 'Louvre, Musée d\'Orsay, Monet\'s gardens, and more' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'germany': [
      { icon: '🏰', title: 'Castles & History', description: 'Neuschwanstein, Heidelberg, and medieval towns' },
      { icon: '🍺', title: 'Culture & Beer', description: 'Oktoberfest, beer gardens, and traditional cuisine' },
      { icon: '🌲', title: 'Nature & Scenery', description: 'Black Forest, Bavarian Alps, Rhine Valley' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'italy': [
      { icon: '🏛️', title: 'Ancient History', description: 'Colosseum, Pompeii, Roman Forum, and Vatican City' },
      { icon: '🍝', title: 'Cuisine', description: 'Pizza, pasta, gelato, and world-class wines' },
      { icon: '🎭', title: 'Art & Architecture', description: 'Michelangelo, Leonardo da Vinci, and Renaissance art' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'spain': [
      { icon: '🏛️', title: 'Historic Cities', description: 'Madrid, Barcelona, Seville, Granada — rich history and architecture' },
      { icon: '🍤', title: 'Cuisine', description: 'Tapas, paella, sangria, and world-class wines' },
      { icon: '🏖️', title: 'Beaches & Sun', description: 'Costa del Sol, Balearic Islands, Canary Islands' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'greece': [
      { icon: '🏛️', title: 'Ancient Acropolis', description: 'Athens Parthenon, Delphi, and UNESCO heritage sites' },
      { icon: '🏝️', title: 'Greek Islands', description: 'Santorini sunsets, Mykonos beaches, Crete, Rhodes' },
      { icon: '🥗', title: 'Mediterranean Food', description: 'Fresh seafood, olive oil, souvlaki, Greek salads' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'netherlands': [
      { icon: '🚲', title: 'Canals & Cycling', description: 'Amsterdam historic canals, Jordaan, world cycling capital' },
      { icon: '🌷', title: 'Tulips & Windmills', description: 'Keukenhof gardens, Zaanse Schans iconic windmills' },
      { icon: '🎨', title: 'Dutch Masters', description: 'Van Gogh Museum, Rijksmuseum, Rembrandt masterpieces' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'switzerland': [
      { icon: '🏔️', title: 'Alpine Majesty', description: 'Matterhorn, Jungfraujoch, Swiss Alps scenic panoramas' },
      { icon: '🚂', title: 'Scenic Railways', description: 'Glacier Express, Bernina Express panoramic rail routes' },
      { icon: '🍫', title: 'Chocolates & Watches', description: 'World-famous Swiss chocolatiers and luxury horology' },
      { icon: '🛂', title: 'Schengen Access', description: 'Access to all 29 Schengen countries with one visa' }
    ],
    'australia': [
      { icon: '🏄', title: 'Beaches & Surf', description: 'Bondi Beach, Gold Coast, Great Barrier Reef' },
      { icon: '🦘', title: 'Unique Wildlife', description: 'Kangaroos, koalas, and diverse wildlife' },
      { icon: '🏜️', title: 'Outback & Nature', description: 'Uluru, Blue Mountains, Daintree Rainforest' },
      { icon: '📱', title: '100% Digital Visa', description: 'Apply online via ImmiAccount — no physical visa label required' }
    ],
    'uk': [
      { icon: '👑', title: 'Royal Heritage', description: 'Buckingham Palace, Tower of London, Windsor Castle' },
      { icon: '🎭', title: 'Culture & Theatre', description: 'West End, Shakespeare, museums, and galleries' },
      { icon: '🏴', title: 'Historic Cities', description: 'London, Edinburgh, Bath, Oxford, Cambridge' },
      { icon: '🛂', title: '6-Month Visa', description: 'Standard Visitor Visa valid for 6 months with multiple entries' }
    ],
    'usa': [
      { icon: '🗽', title: 'Iconic Landmarks', description: 'Statue of Liberty, Golden Gate Bridge, Grand Canyon' },
      { icon: '🎬', title: 'Entertainment & Culture', description: 'Hollywood, Broadway, Disney World, and more' },
      { icon: '🏞️', title: 'National Parks', description: 'Yellowstone, Yosemite, Zion, and 60+ national parks' },
      { icon: '🛂', title: '10-Year Visa', description: 'B1/B2 visa valid for 10 years with multiple entries' }
    ],
    'canada': [
      { icon: '🏔️', title: 'Natural Beauty', description: 'Canadian Rockies, Niagara Falls, Banff National Park' },
      { icon: '🌆', title: 'Vibrant Cities', description: 'Toronto, Vancouver, Montreal, Quebec City' },
      { icon: '🍁', title: 'Cultural Diversity', description: 'Multicultural festivals, diverse cuisine, friendly locals' },
      { icon: '🛂', title: '10-Year Visa', description: 'Visitor TRV valid for up to 10 years with multiple entries' }
    ],
    'japan': [
      { icon: '🏯', title: 'Ancient Temples', description: 'Kiyomizu-dera, Fushimi Inari, Todai-ji — historic temples' },
      { icon: '🌸', title: 'Cherry Blossoms', description: 'Spring season with pink cherry blossoms across the country' },
      { icon: '🍣', title: 'Cuisine', description: 'Sushi, ramen, tempura, and Michelin-starred dining' },
      { icon: '🚄', title: 'Bullet Trains', description: 'Shinkansen high-speed rail network connecting major cities' }
    ],
    'south-korea': [
      { icon: '🏯', title: 'Historic Temples', description: 'Gyeongbokgung, Changdeokgung, Bulguksa — royal palaces and temples' },
      { icon: '🎤', title: 'K-Pop & Culture', description: 'K-pop, K-dramas, vibrant entertainment and nightlife' },
      { icon: '🍲', title: 'Cuisine', description: 'Kimchi, bibimbap, Korean BBQ, and street food markets' },
      { icon: '📱', title: 'K-ETA Available', description: 'K-ETA for US/EU/UK visa holders — or consular visa via KVAC' }
    ],
    'vietnam': [
      { icon: '🏛️', title: 'Historic Cities', description: 'Hanoi, Ho Chi Minh City, Hoi An — rich history and architecture' },
      { icon: '🌊', title: 'Natural Beauty', description: 'Ha Long Bay, Phong Nha Cave, Mekong Delta' },
      { icon: '🍜', title: 'Cuisine', description: 'Pho, banh mi, fresh spring rolls, and street food' },
      { icon: '📱', title: 'Online eVisa', description: 'Apply at evisa.xuatnhapcanh.gov.vn for 30/90 day visa' }
    ],
    'indonesia': [
      { icon: '🏝️', title: 'Bali Paradise', description: 'Ubud, Seminyak, Nusa Dua — world-famous beaches and culture' },
      { icon: '🏛️', title: 'Cultural Heritage', description: 'Borobudur, Prambanan, and traditional Balinese temples' },
      { icon: '🌋', title: 'Natural Wonders', description: 'Mount Bromo, Komodo Island, rice terraces, and volcanoes' },
      { icon: '📱', title: 'Online e-VOA', description: 'Apply at evisa.imigrasi.go.id for 30-day e-VOA' }
    ],
    'cambodia': [
      { icon: '🏛️', title: 'Angkor Wat', description: 'World Heritage Site — Angkor Wat, Bayon, Ta Prohm temples' },
      { icon: '🌊', title: 'Coastal Beauty', description: 'Sihanoukville, Koh Rong — pristine beaches and islands' },
      { icon: '🍲', title: 'Cuisine', description: 'Amok, lok lak, fresh seafood, and street food markets' },
      { icon: '📱', title: 'Online eVisa', description: 'Apply at evisa.gov.kh for 30-day visa' }
    ],
    'sri-lanka': [
      { icon: '🏛️', title: 'Ancient Heritage', description: 'Sigiriya, Anuradhapura, Polonnaruwa — UNESCO sites' },
      { icon: '🏖️', title: 'Beach Paradise', description: 'Mirissa, Bentota, Unawatuna — pristine beaches' },
      { icon: '🌿', title: 'Tea Country', description: 'Nuwara Eliya, Ella — rolling tea plantations and scenic train rides' },
      { icon: '📱', title: 'Online ETA', description: 'Apply at srilankaevisa.lk for 30-day double entry' }
    ],
    'philippines': [
      { icon: '🏝️', title: 'Island Hopping', description: 'Palawan, Cebu, Siargao — 7,000+ islands to explore' },
      { icon: '🏖️', title: 'Beach Paradise', description: 'El Nido, Boracay, Coron — world-class beaches' },
      { icon: '🍲', title: 'Cuisine', description: 'Adobo, lechon, halo-halo, and diverse Filipino cuisine' },
      { icon: '📱', title: 'eTravel QR Code', description: 'Mandatory eTravel registration at etravel.gov.ph before arrival' }
    ],
    'qatar': [
      { icon: '🌆', title: 'Modern Doha', description: 'West Bay skyline, Museum of Islamic Art, Pearl-Qatar' },
      { icon: '🏜️', title: 'Desert Adventures', description: 'Desert safaris, dune bashing, inland sea (Khor Al Adaid)' },
      { icon: '🍽️', title: 'Cuisine', description: 'Middle Eastern cuisine, world-class dining, and Souq Waqif' },
      { icon: '✈️', title: 'Visa on Arrival', description: '30-day Visa on Arrival for Indian passport holders' }
    ],
    'saudi-arabia': [
      { icon: '🕋', title: 'Umrah & Heritage', description: 'Mecca, Medina, and historic Islamic sites' },
      { icon: '🏜️', title: 'Desert Landscapes', description: 'Empty Quarter, AlUla, Edge of the World' },
      { icon: '🏛️', title: 'Modern Cities', description: 'Riyadh, Jeddah, NEOM — futuristic developments' },
      { icon: '📱', title: '1-Year eVisa', description: 'Apply online at visa.visitsaudi.com for 1-year multiple entry' }
    ],
    'oman': [
      { icon: '🏔️', title: 'Mountain Scenery', description: 'Jebel Shams, Jebel Akhdar — dramatic mountain landscapes' },
      { icon: '🏖️', title: 'Coastal Beauty', description: 'Muscat, Salalah, pristine beaches and fjords' },
      { icon: '🏛️', title: 'Heritage Sites', description: 'Nizwa Fort, Bahla Fort, ancient frankincense trade routes' },
      { icon: '📱', title: 'Online eVisa', description: 'Apply at evisa.rop.gov.om for 30-day visa' }
    ],
    'bahrain': [
      { icon: '🌆', title: 'Modern Manama', description: 'Skyline, Bahrain World Trade Center, modern architecture' },
      { icon: '🏛️', title: 'Cultural Heritage', description: 'Bahrain Fort, Qal\'at al-Bahrain, ancient Dilmun civilization' },
      { icon: '🏎️', title: 'Formula 1', description: 'Bahrain International Circuit — F1 Grand Prix host' },
      { icon: '📱', title: 'Online eVisa', description: 'Apply at evisa.gov.bh for 14/30 day visa' }
    ],
    'new-zealand': [
      { icon: '🏔️', title: 'Natural Wonders', description: 'Fiordland, Milford Sound, Tongariro National Park' },
      { icon: '🎬', title: 'Lord of the Rings', description: 'Filming locations — Hobbiton, Matamata, Queenstown' },
      { icon: '🌿', title: 'Adventure Activities', description: 'Bungee jumping, skydiving, hiking, and jet boating' },
      { icon: '📱', title: 'Online Visa', description: 'Apply through Immigration New Zealand (immigration.govt.nz)' }
    ],
    'south-africa': [
      { icon: '🦁', title: 'Safari Adventure', description: 'Kruger National Park, Big Five, and diverse wildlife' },
      { icon: '🏔️', title: 'Scenic Landscapes', description: 'Table Mountain, Cape Point, Garden Route' },
      { icon: '🏖️', title: 'Coastal Beauty', description: 'Cape Town, Durban, and pristine beaches' },
      { icon: '💰', title: '₹0 Consular Fee', description: 'Visa fee waived for Indian citizens — only VFS service fee applies' }
    ],
    'brazil': [
      { icon: '🏖️', title: 'Beaches', description: 'Copacabana, Ipanema, Fernando de Noronha — world-famous beaches' },
      { icon: '🌳', title: 'Amazon Rainforest', description: 'Amazon River, wildlife, and jungle expeditions' },
      { icon: '⚽', title: 'Sports & Culture', description: 'Football culture, samba, carnival, and vibrant festivals' },
      { icon: '📱', title: 'Online Visa', description: 'E-visa available for eligible applicants' }
    ]
  ,

    'czech-republic': [
      { icon: '🏰', title: 'Prague Castle & Charles Bridge', description: 'Gothic cathedrals, historic bridges, and panoramic Vltava river views' },
      { icon: '🍺', title: 'Brewing Heritage', description: 'World-famous Pilsner Urquell, traditional beer halls, and Czech cuisine' },
      { icon: '🏛️', title: 'UNESCO Heritage Towns', description: 'Fairytale Český Krumlov, Kutná Hora bone church, and Telč' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Seamless access across 29 European countries with one visa' }
    ],
    'poland': [
      { icon: '🏰', title: 'Historic Royal Castles', description: 'Wawel Castle in Kraków and Warsaw\'s meticulously rebuilt Royal Castle' },
      { icon: '⛏️', title: 'Wieliczka Salt Mine', description: 'Subterranean salt-carved chapels, lakes, and centuries of mining history' },
      { icon: '⚓', title: 'Baltic Port of Gdańsk', description: 'Colorful merchant houses, amber workshops, and maritime heritage' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Unrestricted travel across all Schengen member states' }
    ],
    'hungary': [
      { icon: '🏛️', title: 'Danube Architectural Marvels', description: 'Hungarian Parliament, Buda Castle, and Fisherman\'s Bastion' },
      { icon: '♨️', title: 'Historic Thermal Baths', description: 'Century-old hot spring spas including Széchenyi and Gellért' },
      { icon: '🍷', title: 'Tokaj Wine & Lake Balaton', description: 'UNESCO sweet wine cellars and Central Europe\'s largest freshwater lake' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Travel seamlessly across 29 European member countries' }
    ],
    'croatia': [
      { icon: '🏰', title: 'Dubrovnik Old Town', description: 'Walk the ancient stone ramparts overlooking the crystal azure Adriatic Sea' },
      { icon: '🌊', title: 'Plitvice Lakes National Park', description: '16 terraced cascade lakes connected by scenic waterfalls and wooden trails' },
      { icon: '⛵', title: 'Dalmatian Island Hopping', description: 'Explore Hvar, Korčula, and Brač by ferry, speedboat, or yacht' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Full Schengen member status allowing border-free EU transit' }
    ],
    'bulgaria': [
      { icon: '⛪', title: 'Sofia Golden Cathedrals', description: 'Alexander Nevsky Cathedral with neo-Byzantine golden domes' },
      { icon: '🏛️', title: 'Ancient Plovdiv', description: '2,000-year-old Roman amphitheater and vibrant arts district Kapana' },
      { icon: '⛰️', title: 'Rila Monastery Sanctuary', description: '10th-century UNESCO monastery nestled in forested alpine peaks' },
      { icon: '🏖️', title: 'Black Sea Riviera', description: 'Golden sands and sunny seaside resorts at Varna and Nessebar' }
    ],
    'cyprus': [
      { icon: '🏖️', title: 'Sun-Drenched Beaches', description: 'Nissi Beach, Fig Tree Bay, and crystal turquoise Mediterranean coves' },
      { icon: '🏛️', title: 'Paphos Archaeological Park', description: 'Exquisite Roman floor mosaics, Tombs of the Kings, and ancient theaters' },
      { icon: '⛰️', title: 'Troodos Mountain Villages', description: 'Pine-scented peaks, painted Byzantine churches, and traditional wineries' },
      { icon: '🕊️', title: 'Myth of Aphrodite', description: 'Visit Aphrodite\'s legendary sea stack birthplace at Petra tou Romiou' }
    ],
    'romania': [
      { icon: '🧛', title: 'Legendary Bran Castle', description: 'Explore Dracula\'s mythical Gothic fortress nestled in the Carpathians' },
      { icon: '🏰', title: 'Peleș Royal Castle', description: 'Neo-Renaissance masterpiece set in the lush mountains of Sinaia' },
      { icon: '🏛️', title: 'Medieval Transylvania', description: 'Cobblestone streets of Sighișoara, Brașov, and Sibiu\'s historic squares' },
      { icon: '🚗', title: 'Transfăgărășan Highway', description: 'One of the world\'s most dramatic high-altitude mountain drives' }
    ],
    'slovakia': [
      { icon: '🏔️', title: 'High Tatras Alpine Peaks', description: 'Glacial valleys, high-altitude mountain huts, and scenic hiking trails' },
      { icon: '🏰', title: 'Spiš Castle Ruins', description: 'One of Central Europe\'s largest fortified castle complexes on a limestone cliff' },
      { icon: '🏙️', title: 'Bratislava on the Danube', description: 'Compact Old Town, coronation church, and panoramic castle hill' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Border-free mobility across the entire Schengen European territory' }
    ],
    'slovenia': [
      { icon: '⛵', title: 'Fairytale Lake Bled', description: 'Emerald alpine lake with a church on an island and a cliffside castle' },
      { icon: '🐉', title: 'Charming Green Ljubljana', description: 'Pedestrian-only historic center, Dragon Bridge, and outdoor riverside cafés' },
      { icon: '🦇', title: 'Postojna Underground Cave', description: 'Underground electric train ride through stunning stalactite caverns' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Seamless access across all 29 Schengen member states' }
    ],
    'estonia': [
      { icon: '🏰', title: 'Tallinn Medieval Old Town', description: 'One of Europe\'s best-preserved Hanseatic fortified medieval city centers' },
      { icon: '💻', title: 'Digital Innovation Hub', description: 'World\'s pioneer in e-governance, digital nomad lifestyle, and tech culture' },
      { icon: '🌲', title: 'Pristine Bogs & Forests', description: 'Boardwalk hiking across mirror-like bog lakes in Lahemaa National Park' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Unrestricted travel throughout 29 European countries' }
    ],
    'latvia': [
      { icon: '🏛️', title: 'Riga Art Nouveau Splendour', description: 'Over 800 ornate Art Nouveau facades and a UNESCO-listed medieval center' },
      { icon: '🏖️', title: 'Jūrmala White Sand Dunes', description: 'Historic seaside spa resort famous for wooden architecture and pine sea air' },
      { icon: '🏰', title: 'Gauja National Park Castles', description: 'Turaida stone castle and Sigulda bobsleigh track in the Gauja river valley' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Travel freely across all 29 Schengen member nations' }
    ],
    'lithuania': [
      { icon: '🏛️', title: 'Vilnius Baroque Old Town', description: 'Sprawling UNESCO historic center with cobblestone lanes and Gothic churches' },
      { icon: '🏰', title: 'Trakai Island Castle', description: '14th-century red-brick castle built on an island in Lake Galvė' },
      { icon: '🏜️', title: 'Curonian Spit Giant Dunes', description: 'Spectacular moving coastal sand dunes between the Baltic Sea and lagoon' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Border-free European travel within the 90/180-day limitation' }
    ],
    'luxembourg': [
      { icon: '🏰', title: 'UNESCO Fortified Old City', description: 'Dramatic clifftop ramparts and underground 17km Bock Casemates labyrinth' },
      { icon: '👑', title: 'Grand Ducal Palace', description: 'Official residence of the Grand Duke with ceremonial guard changes' },
      { icon: '🚌', title: 'Free Nationwide Transit', description: 'All public trains, trams, and buses are completely free across the country' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Unrestricted access across 29 European Schengen member states' }
    ],
    'malta': [
      { icon: '🏛️', title: 'Fortified Valletta Capital', description: 'Baroque UNESCO capital founded by the Knights Hospitaller in 1566' },
      { icon: '🌊', title: 'Blue Lagoon on Comino', description: 'World-famous crystalline turquoise swimming and snorkeling paradise' },
      { icon: '🗿', title: 'Megalithic Stone Temples', description: 'Prehistoric temples at Ħaġar Qim older than Stonehenge and Egyptian pyramids' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Convenient Mediterranean gateway with full Schengen zone access' }
    ],
    'iceland': [
      { icon: '🌌', title: 'Aurora Borealis (Northern Lights)', description: 'Spectacular winter night sky light displays across untouched dark skies' },
      { icon: '🌋', title: 'Golden Circle & Geysers', description: 'Exploding Strokkur geysir, Gullfoss roaring waterfall, and Thingvellir rift' },
      { icon: '♨️', title: 'Geothermal Blue Lagoon', description: 'Soak in silica-rich mineral milky turquoise pools surrounded by volcanic lava' },
      { icon: '🧊', title: 'Glacier Lagoons & Black Beaches', description: 'Floating icebergs at Jökulsárlón and basalt columns at Reynisfjara' }
    ],
    'liechtenstein': [
      { icon: '🏰', title: 'Vaduz Princely Castle', description: 'Iconic clifftop castle overlooking the Rhine Valley, home to the Prince' },
      { icon: '🏔️', title: 'Alpine Peak Hiking', description: 'Scenic mountain trails, Malbun ski resort, and sweeping Alpine panoramas' },
      { icon: '🍷', title: 'Princely Wine Cellars', description: 'Tasting rare Pinot Noir wines from the Prince\'s personal Hofkellerei estate' },
      { icon: '✨', title: 'Schengen Freedom', description: 'Seamless border-free entry via Switzerland or Austria' }
    ],
    'israel': [
      { icon: '🕊️', title: 'Jerusalem Old City', description: 'Western Wall, Church of the Holy Sepulchre, and Dome of the Rock' },
      { icon: '🏖️', title: 'Tel Aviv Mediterranean Vibe', description: 'Golden sandy city beaches, Bauhaus architecture, and world-class culinary scene' },
      { icon: '🌊', title: 'Floating in the Dead Sea', description: 'Lowest elevation on Earth with hyper-saline waters and therapeutic mineral mud' },
      { icon: '🏰', title: 'Ancient Masada Fortress', description: 'Dramatic King Herod desert mountain plateau fortress overlooking the Dead Sea' }
    ],
    'chile': [
      { icon: '🏔️', title: 'Torres del Paine Patagonia', description: 'Epic granite spires, blue glaciers, and world-famous trekking circuits' },
      { icon: '🌌', title: 'Atacama Stargazing', description: 'World\'s driest desert with ultra-clear skies, geysers, and salt flats' },
      { icon: '🍷', title: 'Central Valley Wineries', description: 'Famous Carménère and Cabernet Sauvignon vineyards near Santiago' },
      { icon: '🗿', title: 'Easter Island (Rapa Nui)', description: 'Mysterious giant stone Moai statues carved by early Polynesian voyagers' }
    ],
    'mexico': [
      { icon: '🏛️', title: 'Chichén Itzá Mayan Wonder', description: 'Iconic El Castillo pyramid and ancient pre-Columbian ceremonial centers' },
      { icon: '🏖️', title: 'Cancún & Riviera Maya', description: 'Turquoise Caribbean waters, all-inclusive luxury resorts, and cenote swimming' },
      { icon: '🌮', title: 'World-Renowned Gastronomy', description: 'UNESCO intangible cultural heritage Mexican cuisine from tacos to mole' },
      { icon: '🏙️', title: 'Mexico City Historic Heart', description: 'Zócalo square, Frida Kahlo\'s Casa Azul, and floating gardens of Xochimilco' }
    ],
    'ukraine': [
      { icon: '⛪', title: 'Kyiv Golden-Domed Monasteries', description: 'Kyiv Pechersk Lavra cave monastery and St. Sophia\'s 11th-century mosaics' },
      { icon: '☕', title: 'Historic Lviv Old Town', description: 'Central European cobblestone charm, historic coffee houses, and chocolate workshops' },
      { icon: '⛰️', title: 'Carpathian Mountains', description: 'Verdant forested peaks, traditional wooden churches, and Hutsul folk culture' },
      { icon: '⚓', title: 'Black Sea Port of Odesa', description: 'Famous Potemkin Stairs, monumental Opera House, and coastal promenades' }
    ]

  };
  
  return map[c] || [
    { icon: '🏛️', title: 'Heritage & Culture', description: 'Explore historic landmarks, museums, and cultural sites' },
    { icon: '🌿', title: 'Nature & Scenery', description: 'Natural landscapes, parks, and scenic views' },
    { icon: '🍽️', title: 'Cuisine', description: 'Local food, international dining, and culinary experiences' },
    { icon: '🛂', title: 'Visitor Visa', description: 'Tourist entry permit for leisure and holidays' }
  ];
}

// ── 3. TOURISM DOCUMENTS — COUNTRY SPECIFIC ──
export function getTourismDocuments(countryOrFrom: string, maybeCountry?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.documents) return TOURISM_DESTS[c].documents;
  const map: Record<string, DocumentRequiredItem[]> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond travel date with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Verifiable ticket leaving Thailand within 60 days.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking or host invitation in Thailand.', is_mandatory: true },
      { title: 'Living Expense Funds', description: '10,000 THB per person / 20,000 THB per family (approx. ₹24,000 – ₹48,000) in cash or cards.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'malaysia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Malaysia Digital Arrival Card (MDAC)', description: 'Mandatory online form submitted within 3 days prior to arrival at imigresen-online.imi.gov.my/mdac.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Malaysia within 30 days.', is_mandatory: true },
      { title: 'Hotel Reservation', description: 'Confirmed hotel booking or proof of residence in Malaysia.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'mauritius': [
      { title: 'Original Valid Passport', description: 'Original passport valid for at least 6 months beyond travel dates with minimum 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip airline ticket departing Mauritius within 60 days.', is_mandatory: true },
      { title: 'Confirmed Hotel Booking / Accommodation', description: 'Verified hotel reservation voucher or official host invitation letter in Mauritius.', is_mandatory: true },
      { title: 'Mauritius All-in-One Digital Travel Form', description: 'Mandatory online entry form filled at safetravel.govmu.org before departure (save the generated QR code).', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Access to funds (cash, credit cards, or bank statements showing minimum USD $100 per day of stay).', is_mandatory: false }
    ],
    'maldives': [
      { title: 'Valid Passport', description: 'Valid for at least 1 month (recommended 6 months) with machine-readable zone.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Maldives within 30 days.', is_mandatory: true },
      { title: 'Confirmed Resort / Hotel Booking', description: 'Prepaid hotel reservation or resort booking voucher.', is_mandatory: true },
      { title: 'IMUGA Traveler Declaration', description: 'Mandatory online form within 96 hours before arrival at imuga.immigration.gov.mv.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'jamaica': [
      { title: 'Valid Indian Passport', description: 'Valid for the duration of stay. At least 1 blank page required for entry stamp.', is_mandatory: true },
      { title: 'C5 Online Immigration & Customs Form', description: 'MANDATORY: Complete at enterjamaica.com BEFORE boarding. QR code generated.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Immigration officers may request evidence of onward travel.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking, Airbnb reservation, or host invitation letter.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'nepal': [
      { title: 'Indian Passport OR Voter ID Card', description: 'Indian citizens can travel with EITHER a valid Indian Passport OR original Voter ID card.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Kathmandu (KTM).', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'bhutan': [
      { title: 'Indian Passport OR Voter ID Card', description: 'Valid for at least 6 months OR original Voter ID card.', is_mandatory: true },
      { title: 'Passport-Size Photographs', description: 'Two recent color photographs on white background (35x45mm).', is_mandatory: true },
      { title: 'Confirmed Hotel Booking', description: 'Hotel reservations with Department of Tourism approved accommodation.', is_mandatory: true },
      { title: 'Sustainable Development Fee (SDF)', description: '₹1,200 per night (children 6-12: ₹600). Paid prior to arrival.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'seychelles': [
      { title: 'Valid Passport', description: 'Valid for the duration of stay with at least 1 blank page.', is_mandatory: true },
      { title: 'Seychelles Travel Authorization (TA)', description: 'Mandatory online TA at seychelles.govtas.com — €10 EUR fee.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Seychelles within 30 days.', is_mandatory: true },
      { title: 'Confirmed Hotel Booking', description: 'Accommodation at certified eco-tourism hotel/resort.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Mandatory international travel medical insurance covering emergency expenses.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    
    // ── SCHENGEN COUNTRIES ──
    'france': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure from Schengen, issued within 10 years, 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Completed online via France-Visas portal, printed and signed.', is_mandatory: true },
      { title: 'Biometric Photographs (35×45mm)', description: '2 recent photos on white background, 70-80% face coverage.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Mandatory Schengen insurance covering emergency medical treatment and repatriation.', is_mandatory: true },
      { title: 'Confirmed Flight Reservation', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel bookings for all nights of stay in France.', is_mandatory: true },
      { title: 'Cover Letter & Day-by-Day Itinerary', description: 'Detailed travel plan across France and/or Schengen countries.', is_mandatory: true },
      { title: 'Employment NOC / Leave Letter', description: 'Employer letter with designation, salary, approved leave dates.', is_mandatory: true },
      { title: 'Bank Statements (3-6 Months)', description: 'Stamped statements showing sufficient funds (approx. €65-120 per day).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'germany': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure, issued within 10 years, 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa Application Form', description: 'Completed online via VIDEX, printed and signed.', is_mandatory: true },
      { title: 'Biometric Photographs (35×45mm)', description: '2 recent photos on white background.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Mandatory Schengen insurance covering emergency treatment.', is_mandatory: true },
      { title: 'Confirmed Flight Reservation', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel bookings for all nights in Germany.', is_mandatory: true },
      { title: 'Day-by-Day Travel Itinerary', description: 'Detailed plan of cities and activities in Germany.', is_mandatory: true },
      { title: 'Employment NOC / Leave Letter', description: 'Employer letter with approved leave dates.', is_mandatory: true },
      { title: 'Bank Statements (3-6 Months)', description: 'Stamped statements showing sufficient funds.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'italy': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure, issued within 10 years, 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa Application Form', description: 'Completed online via Esteri.it portal, printed and signed.', is_mandatory: true },
      { title: 'Biometric Photographs (35×45mm)', description: '2 recent photos on white background.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Mandatory Schengen insurance.', is_mandatory: true },
      { title: 'Confirmed Flight Reservation', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel bookings for all nights in Italy.', is_mandatory: true },
      { title: 'Day-by-Day Travel Itinerary', description: 'Detailed plan of cities in Italy.', is_mandatory: true },
      { title: 'Employment NOC / Leave Letter', description: 'Employer letter with approved leave dates.', is_mandatory: true },
      { title: 'Bank Statements (3-6 Months)', description: 'Stamped statements showing sufficient funds.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'spain': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure, issued within 10 years, 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa Application Form', description: 'Completed via BLS International Spain portal, printed and signed.', is_mandatory: true },
      { title: 'Biometric Photographs (35×45mm)', description: '2 recent photos on white background.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Mandatory Schengen insurance.', is_mandatory: true },
      { title: 'Confirmed Flight Reservation', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel bookings or official Carta de Invitación from host.', is_mandatory: true },
      { title: 'Day-by-Day Travel Itinerary', description: 'Detailed plan of cities in Spain.', is_mandatory: true },
      { title: 'Employment NOC / Leave Letter', description: 'Employer letter with approved leave dates.', is_mandatory: true },
      { title: 'Bank Statements (3-6 Months)', description: 'Stamped statements. Spain statutory: €122/day (min €1,099 floor).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'greece': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure, issued within 10 years, 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa Application Form', description: 'Completed via GVCW Greece portal (in-gr.gvcworld.eu).', is_mandatory: true },
      { title: 'Biometric Photographs (35×45mm)', description: '2 recent photos on white background.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Mandatory Schengen insurance.', is_mandatory: true },
      { title: 'Confirmed Flight Reservation', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel bookings for all nights in Greece (including islands).', is_mandatory: true },
      { title: 'Day-by-Day Travel Itinerary', description: 'Detailed plan of cities and islands (Athens, Santorini, Mykonos, etc.).', is_mandatory: true },
      { title: 'Employment NOC / Leave Letter', description: 'Employer letter with approved leave dates.', is_mandatory: true },
      { title: 'Bank Statements (3-6 Months)', description: 'Stamped statements showing sufficient funds.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    
    // ── STANDARD TOURIST VISA COUNTRIES ──
    'australia': [
      { title: 'Current Passport', description: 'High-resolution color scan of all pages. Valid for 6+ months.', is_mandatory: true },
      { title: 'National Identity Proof', description: 'Color copy of Aadhaar Card / National ID and PAN card.', is_mandatory: true },
      { title: 'Genuine Visitor Proof & Travel Intent', description: 'Detailed travel itinerary, planned activities, proof of employment leave.', is_mandatory: true },
      { title: 'Employment Evidence', description: 'Employment contract, recent 3 months payslips, employer approved leave letter.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing 5,000–8,000 AUD+ in liquid savings.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'uk': [
      { title: 'Valid Passport', description: 'Valid for the entire duration of stay with at least 1 blank page.', is_mandatory: true },
      { title: 'UKVI Online Application Form', description: 'Completed online on GOV.UK with accurate travel history.', is_mandatory: true },
      { title: 'Biometric Photographs', description: 'Recent passport-size photos meeting UKVI specifications.', is_mandatory: true },
      { title: 'Travel Itinerary & Accommodation', description: 'Planned itinerary, hotel bookings, or host invitation letter.', is_mandatory: true },
      { title: 'Proof of Employment / Occupation', description: 'Employer letter with designation, salary, length of employment, approved leave.', is_mandatory: true },
      { title: 'Financial Sufficiency Proof', description: '6 months bank statements showing steady balance and regular income credits.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'usa': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay with blank visa pages.', is_mandatory: true },
      { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation with clear 10-character barcode.', is_mandatory: true },
      { title: 'Appointment Confirmation Letter', description: 'Confirmation for both VAC Biometrics and Consular Interview.', is_mandatory: true },
      { title: 'Travel Purpose & Itinerary', description: 'Detailed itinerary, flight bookings, hotel reservations, or US host invitation.', is_mandatory: true },
      { title: 'Employment & Ties to Home Country', description: 'Employer leave letter, business registration, property documents.', is_mandatory: true },
      { title: 'Bank Statements & ITR', description: '6 months bank statements + 3 years ITR / Form 16.', is_mandatory: true }
    ],
    'canada': [
      { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages.', is_mandatory: true },
      { title: 'Digital Photograph', description: '35mm x 45mm, white background, taken within 6 months.', is_mandatory: true },
      { title: 'Travel Purpose & Itinerary', description: 'Cover letter, round-trip flight booking, hotel reservations, or invitation letter.', is_mandatory: true },
      { title: 'Ties to Home Country', description: 'Employment letter, leave approval NOC, property documents.', is_mandatory: true },
      { title: 'Bank Statements & Tax Returns', description: '6 months stamped bank statements + 3 years ITR.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'japan': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank visa pages.', is_mandatory: true },
      { title: 'Visa Application Form', description: 'Completed Japan visa application form with signature.', is_mandatory: true },
      { title: 'Passport Photograph (45×35mm / 2×2 inch)', description: '1 recent photo taken within 6 months, white background.', is_mandatory: true },
      { title: 'Detailed Schedule of Stay (Taizai Nitteihyo)', description: 'Day-by-day itinerary with hotel names, addresses, and phone numbers.', is_mandatory: true },
      { title: 'Confirmed Flight Reservations', description: 'Round-trip flight booking with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking vouchers for every night in Japan.', is_mandatory: true },
      { title: 'Proof of Employment / Occupation', description: 'Employer NOC / Leave Approval Letter + 3 months salary slips.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing ₹1,50,000 – ₹2,50,000 balance.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'south-korea': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank visa pages.', is_mandatory: true },
      { title: 'Visa Application Form', description: 'Completed Korean visa application form with 35x45mm photo.', is_mandatory: true },
      { title: 'Passport Photograph (35×45mm)', description: 'Recent photo on white background, neutral expression.', is_mandatory: true },
      { title: 'Detailed Travel Itinerary / Cover Letter', description: 'Day-by-day travel plan for Seoul, Busan, Jeju, etc.', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel bookings for all nights in South Korea.', is_mandatory: true },
      { title: 'Proof of Employment / Occupation', description: 'Employer NOC + 3 months salary slips.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing ₹1,50,000 – ₹2,00,000 balance.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'vietnam': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from entry date with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Bio-Data Page Scan', description: 'Clear color scan in JPG format.', is_mandatory: true },
      { title: 'Portrait Digital Photograph (4×6cm)', description: 'Straight-looking photo on white background, taken within 6 months.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip air ticket with verifiable PNR.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Confirmed hotel reservations for planned cities.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'indonesia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Bio-Data Page Scan', description: 'Clear color scan (PDF or JPEG, min 1500x2000 resolution).', is_mandatory: true },
      { title: 'Passport Size Photograph', description: 'Recent color photo on white background (35x45mm).', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Indonesia within 30 days.', is_mandatory: true },
      { title: 'Electronic Customs Declaration (e-CD)', description: 'Mandatory customs QR code at ecd.beacukai.go.id within 3 days.', is_mandatory: true },
      { title: 'Bali Tourist Levy (Bali Only)', description: 'IDR 150,000 (approx. ₹800) paid at lovebali.baliprov.go.id.', is_mandatory: false }
    ],
    'cambodia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Photograph', description: 'Recent digital color photo with white background.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket to Phnom Penh (PNH) or Siem Reap (SAI).', is_mandatory: true },
      { title: 'Hotel Booking / Itinerary', description: 'Confirmed hotel reservations in Siem Reap or Phnom Penh.', is_mandatory: true },
      { title: 'Cambodia e-Arrival Card', description: 'Mandatory digital form within 7 days prior to arrival at arrival.gov.kh.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'sri-lanka': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Sri Lanka within 30 days.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking or host address in Sri Lanka.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'philippines': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond stay with 2 blank pages.', is_mandatory: true },
      { title: 'Visa Application Form (FA Form No. 2)', description: 'Completed form signed by applicant with 2x2 photo.', is_mandatory: true },
      { title: 'Passport Photographs (2×2 inch)', description: '2 recent photos on white background.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket to Manila (MNL) or Cebu (CEB).', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Hotel reservations for all nights in the Philippines.', is_mandatory: true },
      { title: 'Proof of Employment / Occupation', description: 'Employer NOC + 3 months salary slips.', is_mandatory: true },
      { title: 'eTravel QR Code', description: 'Mandatory online registration within 72 hours at etravel.gov.ph.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing ₹1,00,000 – ₹1,50,000 balance.', is_mandatory: true }
    ],
    'qatar': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket departing Hamad International Airport (DOH).', is_mandatory: true },
      { title: 'Mandatory Hotel Booking via Discover Qatar', description: 'Hotel reservation booked through discoverqatar.qa — third-party bookings NOT accepted.', is_mandatory: true },
      { title: 'Mandatory Qatar Health Insurance', description: 'QAR 50 (approx. ₹1,150) from Ministry of Public Health approved insurer.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'saudi-arabia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond travel date with 2 blank visa pages.', is_mandatory: true },
      { title: 'Digital Passport Photograph (2×2 inch)', description: 'Recent color photo on pure white background.', is_mandatory: true },
      { title: 'Mandatory Saudi Health Insurance', description: 'Automatically bundled with visa fee covering SAR 100,000 emergency medical care.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket to Riyadh, Jeddah, Dammam, or Medina.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Hotel reservations for the duration of stay.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'oman': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from entry date with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Bio-Data Page Scan', description: 'High-resolution color scan of passport details page.', is_mandatory: true },
      { title: 'Digital Passport Photograph', description: 'Recent color photo on white background (35x45mm).', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Muscat (MCT) or Salalah (SLL).', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Hotel reservations in Oman for duration of visit.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'bahrain': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Bio-Data & Last Page Scan', description: 'Color copy of passport bio page and address page.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Bahrain International Airport (BAH).', is_mandatory: true },
      { title: 'Hotel Booking / Host Proof', description: 'Hotel reservation or CPR copy of resident host.', is_mandatory: true },
      { title: 'Bank Account Statements (3 Months)', description: 'Stamped statement showing USD $1,00,000 / BHD 300 / ₹85,000 balance.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip ticket departing within permitted stay duration.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Prepaid hotel reservation or confirmed host invitation voucher.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Cash, international credit cards, or stamped bank statements showing sufficient funds.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical and hospitalization travel insurance policy.', is_mandatory: false }
    ],
    'new-zealand': [
      { title: 'Current Passport', description: 'High-resolution color scan of all pages. Valid for 6+ months.', is_mandatory: true },
      { title: 'National Identity Proof', description: 'Color copy of Aadhaar Card / National ID.', is_mandatory: true },
      { title: 'Genuine Visitor Proof & Travel Intent', description: 'Detailed travel itinerary, planned activities, proof of employment leave.', is_mandatory: true },
      { title: 'Employment Evidence', description: 'Employment contract, recent 3 months payslips, employer approved leave letter.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing sufficient funds for stay.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'south-africa': [
      { title: 'Valid Passport', description: 'Valid for at least 30 days beyond departure with 2 blank pages.', is_mandatory: true },
      { title: 'Form DHA-84 Visa Application Form', description: 'Fully completed in black ink, signed.', is_mandatory: true },
      { title: 'Passport Photographs (35×45mm)', description: '2 recent photos on white background.', is_mandatory: true },
      { title: 'Day-by-Day Travel Itinerary / Cover Letter', description: 'Detailed cover letter with trip dates and cities.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel reservations or host invitation letter.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Employer letter with approved leave dates + 3 months salary slips.', is_mandatory: true },
      { title: 'Bank Statements (3 Months)', description: 'Stamped statements showing ₹1,00,000 – ₹1,50,000 balance.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'brazil': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond stay with 2 blank pages.', is_mandatory: true },
      { title: 'Visa Application Form', description: 'Completed Brazilian visa application form.', is_mandatory: true },
      { title: 'Passport Photographs', description: 'Recent photos meeting Brazilian consular specifications.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel reservations for all nights in Brazil.', is_mandatory: true },
      { title: 'Proof of Employment / Occupation', description: 'Employer NOC + 3 months salary slips.', is_mandatory: true },
      { title: 'Bank Statements (3-6 Months)', description: 'Stamped statements showing sufficient funds.', is_mandatory: true }
    ]
  ,

    'czech-republic': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'poland': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'hungary': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'croatia': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'slovakia': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'slovenia': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'estonia': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'latvia': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'lithuania': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'luxembourg': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'malta': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'iceland': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'liechtenstein': [
      { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended departure from Schengen area, with 2 blank pages.', is_mandatory: true },
      { title: 'Harmonised Schengen Visa Application Form', description: 'Fully completed online, printed, and signed by applicant.', is_mandatory: true },
      { title: 'Biometric Passport Photographs', description: 'Two recent photos (35x45mm, white/light-grey background, 70-80% face coverage).', is_mandatory: true },
      { title: 'Confirmed Return Flight Reservation', description: 'Flight itinerary showing entry and exit from Schengen territory with verifiable PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel vouchers for every night across all destinations, or official invitation.', is_mandatory: true },
      { title: 'Schengen Travel Medical Insurance', description: 'Minimum €30,000 emergency medical and repatriation coverage valid across all Schengen states.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing healthy liquid balance (minimum ₹3,00,000 – ₹5,00,000).', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Acknowledged ITR-V forms and Form 16 for the last 2-3 assessment years.', is_mandatory: true },
      { title: 'Proof of Employment / NOC', description: 'Official employer leave sanction letter, 3 months salary slips, and company ID.', is_mandatory: true },
      { title: 'Day-to-Day Travel Plan & Cover Letter', description: 'Detailed cover letter outlining trip purpose, travel dates, and ties to India.', is_mandatory: true }
],
    'bulgaria': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure date from Bulgaria with 2 blank pages.', is_mandatory: true },
      { title: 'Bulgaria Visa Application Form', description: 'Duly completed and signed application form.', is_mandatory: true },
      { title: 'Biometric Photographs', description: 'Two recent color photos (35x45mm) on light background.', is_mandatory: true },
      { title: 'Round-Trip Flight Reservation', description: 'Confirmed return air ticket itinerary with PNR.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Confirmed hotel reservations or host invitation letter certified by Bulgarian authorities.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for Bulgaria with minimum €30,000 emergency medical coverage.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Stamped bank statements showing at least €50 per day (minimum €500).', is_mandatory: true },
      { title: 'Proof of Employment / Occupation', description: 'Employer NOC, salary slips, or business registration.', is_mandatory: true }
    ],
    'cyprus': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond intended stay with at least 2 blank pages.', is_mandatory: true },
      { title: 'Cyprus Visa Application Form', description: 'Completed and signed form with passport-style photograph attached.', is_mandatory: true },
      { title: 'Passport Photographs', description: 'Two recent color photographs (35x45mm) on white background.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Confirmed return flight booking with airline reservation code.', is_mandatory: true },
      { title: 'Proof of Hotel Accommodation', description: 'Confirmed hotel voucher or Assumption of Responsibility form certified by Cyprus notary.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Emergency medical insurance coverage with minimum €30,000 limit.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 3-6 Months)', description: 'Original bank statements with bank seal proving sufficient financial funds.', is_mandatory: true },
      { title: 'Employment NOC / Business Documents', description: 'Leave letter from employer, 3 months payslips, and ITR-V.', is_mandatory: true }
    ],
    'romania': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond planned departure from Romania with 2 blank pages.', is_mandatory: true },
      { title: 'eVisa Application Dossier', description: 'Application registered online at evisa.mae.ro with all uploaded documents.', is_mandatory: true },
      { title: 'Passport Photographs', description: 'Two recent 35x45mm color photographs on white background.', is_mandatory: true },
      { title: 'Round-Trip Air Ticket Booking', description: 'Confirmed return flight itinerary entering and exiting Romania.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Confirmed hotel voucher or certified invitation from Romanian host.', is_mandatory: true },
      { title: 'Travel Health Insurance', description: 'Minimum €30,000 coverage valid across Romania and Europe.', is_mandatory: true },
      { title: 'Proof of Financial Means', description: 'Original bank statement showing minimum €50/day (minimum €500 total).', is_mandatory: true },
      { title: 'Employment NOC & ITR-V', description: 'Letter from employer confirming leave and last 2 years income tax returns.', is_mandatory: true }
    ],
    'israel': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond travel dates with at least 2 blank pages.', is_mandatory: true },
      { title: 'B/2 Visa Application Form', description: 'Completed official application form with original applicant signature.', is_mandatory: true },
      { title: 'Passport Photographs', description: 'Two recent color photos (50x50mm or 35x45mm) on white background.', is_mandatory: true },
      { title: 'Confirmed Round-Trip Flight Itinerary', description: 'Confirmed round-trip ticket reservations with PNR.', is_mandatory: true },
      { title: 'Hotel Bookings / Travel Itinerary', description: 'Confirmed accommodation for each night of stay in Israel.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Comprehensive medical insurance covering emergency treatment in Israel.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 6 Months)', description: 'Original stamped statements showing minimum balance of ₹2,50,000+.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 3 years acknowledged income tax return copies.', is_mandatory: true },
      { title: 'Employer NOC / Leave Sanction', description: 'Letter from employer stating designation, salary, and authorized leave dates.', is_mandatory: true }
    ],
    'chile': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay with at least 2 blank pages.', is_mandatory: true },
      { title: 'SAC Ciudadanos Online Application', description: 'Application submitted via official portal tramites.minrel.gov.cl.', is_mandatory: true },
      { title: 'Digital Photograph', description: 'Recent photograph with white background, JPEG format.', is_mandatory: true },
      { title: 'Confirmed Flight Itinerary', description: 'Round-trip air ticket reservation showing entry and exit from Chile.', is_mandatory: true },
      { title: 'Proof of Lodging', description: 'Confirmed hotel reservations or certified Chilean host invitation letter.', is_mandatory: true },
      { title: 'Proof of Financial Solvency', description: 'Personal bank statements for past 3-6 months showing sufficient funds.', is_mandatory: true },
      { title: 'Employment Certificate / NOC', description: 'Employer letter stating position, salary, and granted leave period.', is_mandatory: true },
      { title: 'Detailed Trip Itinerary', description: 'Day-by-day plan of cities and activities in Chile.', is_mandatory: true }
    ],
    'mexico': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with at least 2 blank pages.', is_mandatory: true },
      { title: 'Mexico Visa Application Form', description: 'Completed and signed form printed double-sided on one sheet.', is_mandatory: true },
      { title: 'Passport Photograph', description: 'One recent color photograph (35x45mm) on white background, no glasses.', is_mandatory: true },
      { title: 'Personal Bank Statements (Past 3-6 Months)', description: 'Stamped bank statements showing monthly balance equivalent to approx. ₹1,50,000 – ₹2,50,000.', is_mandatory: true },
      { title: 'Proof of Employment / Income', description: 'Employment letter on official letterhead stating start date, salary, and position; plus 3 months salary slips.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR-V)', description: 'Last 2 years tax returns.', is_mandatory: true },
      { title: 'Flight & Hotel Reservations', description: 'Tentative round-trip flight booking and hotel accommodation in Mexico.', is_mandatory: true }
    ],
    'ukraine': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure date from Ukraine with 2 blank pages.', is_mandatory: true },
      { title: 'Official e-Visa Application Form', description: 'Registered and submitted online at evisa.mfa.gov.ua.', is_mandatory: true },
      { title: 'Passport Photograph', description: 'Recent color photo in digital format.', is_mandatory: true },
      { title: 'Valid Health Insurance Policy', description: 'Covering at least €30,000 or equivalent emergency medical expenses in Ukraine.', is_mandatory: true },
      { title: 'Proof of Sufficient Funds', description: 'Bank statement or credit card statement demonstrating sufficient financial means.', is_mandatory: true },
      { title: 'Document Confirming Purpose of Travel', description: 'Hotel booking, organized tour voucher, or private invitation letter.', is_mandatory: true },
      { title: 'Return Flight Reservation', description: 'Confirmed flight ticket departing Ukraine.', is_mandatory: true }
    ]

  };
  
  const defaultDocs: DocumentRequiredItem[] = [
    { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond intended stay with 2 blank visa pages.', is_mandatory: true },
    { title: 'Visa Application Form', description: 'Completed official visa application form matching passport details.', is_mandatory: true },
    { title: 'Passport Photographs', description: 'Recent color photographs on white background meeting official specifications.', is_mandatory: true },
    { title: 'Confirmed Return Flight Ticket', description: 'Confirmed round-trip or onward air ticket.', is_mandatory: true },
    { title: 'Proof of Accommodation', description: 'Confirmed hotel reservations or official host invitation letter.', is_mandatory: true },
    { title: 'Travel Medical Insurance', description: 'Comprehensive international emergency medical insurance covering hospitalization and repatriation.', is_mandatory: true },
    { title: 'Financial Proof', description: 'Bank statements or international credit cards demonstrating sufficient funds.', is_mandatory: true },
    { title: 'Cover Letter & Travel Plan', description: 'Detailed itinerary explaining purpose of visit and ties to home country.', is_mandatory: false }
  ];
  
  return map[c] || defaultDocs;
}

// ── 4. TOURISM STEPS — COUNTRY SPECIFIC ──
export function getTourismSteps(countryOrFrom: string, maybeCountry?: string): string[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.steps) return TOURISM_DESTS[c].steps;
  const map: Record<string, string[]> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': [
      'Step 1: Plan Your Thailand Itinerary — Research destinations (Bangkok, Phuket, Chiang Mai, Krabi, Koh Samui) and activities. Check the best time to visit.',
      'Step 2: Book Flights & Accommodation — Secure confirmed return flights and hotel reservations with verifiable booking references.',
      'Step 3: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 4: Pack Travel Documents — Carry your passport, return flight ticket, hotel booking confirmation, and proof of sufficient funds.',
      'Step 5: Board Flight to Thailand — No prior visa required. Present documents at check-in and Thai immigration.',
      'Step 6: Receive Entry Stamp on Arrival — Present your passport and return ticket at Thai Immigration counter for free 60-day entry stamp.'
    ],
    'malaysia': [
      'Step 1: Plan Your Malaysia Itinerary — Research destinations (Kuala Lumpur, Penang, Langkawi, Borneo) and activities.',
      'Step 2: Book Flights & Accommodation — Secure confirmed return flights and hotel reservations.',
      'Step 3: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 4: Submit MDAC Online — Complete the Malaysia Digital Arrival Card at imigresen-online.imi.gov.my/mdac within 3 days before arrival.',
      'Step 5: Board Flight to Malaysia — Carry your passport, MDAC confirmation, return ticket, and hotel booking.',
      'Step 6: Receive Entry Stamp on Arrival — Present documents at Malaysian Immigration counter for free 30-day entry stamp.'
    ],
    'mauritius': [
      'Step 1: Plan Your Mauritius Itinerary — Research destinations (Grand Baie, Flic en Flac, Port Louis, Île aux Cerfs) and activities.',
      'Step 2: Book Flights & Accommodation — Secure confirmed return flights and hotel resort bookings.',
      'Step 3: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 4: Complete Digital Travel Form — Fill the Mauritius All-in-One Digital Travel Form at safetravel.govmu.org before departure.',
      'Step 5: Pack Travel Documents — Carry passport, return flight, hotel voucher, digital QR code, and proof of funds (USD 100/day).',
      'Step 6: Board Flight to Mauritius — No prior visa required. Present documents at SSR International Airport immigration.',
      'Step 7: Receive Entry Permit on Arrival — Present passport, return ticket, hotel voucher & QR code at immigration for free 60-day entry stamp.'
    ],
    'maldives': [
      'Step 1: Plan Your Maldives Itinerary — Select your resort or guesthouse island and planned water excursions.',
      'Step 2: Book Resort & Flights — Secure confirmed round-trip flights to Male (MLE) and prepaid island resort bookings.',
      'Step 3: Ensure Passport Validity — Verify your passport has at least 1 month validity (6 months recommended).',
      'Step 4: Complete IMUGA Declaration — Submit the mandatory IMUGA Traveler Declaration within 96 hours before arrival.',
      'Step 5: Board Flight to Maldives — Carry your passport, hotel booking voucher, return ticket, and IMUGA QR code.',
      'Step 6: Receive Visa on Arrival — Present documents at Velana International Airport immigration for complimentary 30-day stamp.'
    ],
    'jamaica': [
      'Step 1: Plan Your Jamaica Itinerary — Research destinations (Montego Bay, Negril, Ocho Rios, Kingston) and activities.',
      'Step 2: Book Flights & Accommodation — Secure confirmed return flights and hotel/resort reservations.',
      'Step 3: Complete C5 Online Form — Fill the mandatory C5 Immigration & Customs Form online at enterjamaica.com before boarding.',
      'Step 4: Pack Travel Documents — Carry your passport, C5 QR confirmation, hotel voucher, and return ticket.',
      'Step 5: Board Flight to Jamaica — Present your C5 form confirmation and passport at check-in.',
      'Step 6: Receive Entry Stamp on Arrival — Clear immigration at Montego Bay (MBJ) or Kingston (KIN) for free 30-day entry stamp.'
    ],
    
    // ── EVISA / ONLINE VISA COUNTRIES ──
    'uae': [
      'Step 1: Plan Your UAE Itinerary — Research destinations (Dubai, Abu Dhabi, Sharjah) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Apply for UAE eVisa Online — Submit application via ICP/GDRFA portal with passport scan and photograph.',
      'Step 4: Pay Visa Fee — Pay the official visa fee (₹6,400 for 30 days / ₹11,800 for 60 days) online.',
      'Step 5: Receive Approved eVisa — Download your official UAE eVisa PDF via email within 24-72 hours.',
      'Step 6: Book Flights & Accommodation — Secure confirmed return flights and hotel bookings.',
      'Step 7: Board Flight to UAE — Carry passport, printed eVisa, return ticket, and hotel booking.',
      'Step 8: Clear Immigration — Present documents at UAE airport immigration for entry clearance.'
    ],
    'singapore': [
      'Step 1: Plan Your Singapore Itinerary — Research attractions (Marina Bay, Sentosa, Gardens by the Bay, Orchard Road).',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Apply for Singapore eVisa — Submit application through ICA Authorized Visa Agent (AVA) with passport, photo, and documents.',
      'Step 4: Receive Approved eVisa — Download your official Singapore eVisa PDF (valid up to 2 years multiple entry).',
      'Step 5: Submit SGAC — Complete the SG Arrival Card online within 3 days before arrival at eservices.ica.gov.sg.',
      'Step 6: Book Flights & Accommodation — Secure confirmed return flights and hotel reservations.',
      'Step 7: Board Flight to Singapore — Carry passport, printed eVisa, SGAC confirmation, return ticket, and hotel booking.',
      'Step 8: Clear Automated e-Gates — Present passport at Changi Airport automated e-Gates for fast clearance.'
    ],
    'turkey': [
      'Step 1: Plan Your Turkey Itinerary — Research destinations (Istanbul, Cappadocia, Antalya, Pamukkale) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Check eVisa Eligibility — If you hold a valid US/UK/Schengen/Ireland visa, go to evisa.gov.tr. Otherwise, apply for sticker visa via Gateway Globe.',
      'Step 4: Apply for eVisa (if eligible) — Fill in passport details, enter supporting visa number, and pay $43 USD online. Instant eVisa issued.',
      'Step 5: Apply for Sticker Visa (if not eligible) — Prepare document dossier (passport, photos, bank statements, ITR, NOC) and submit via Gateway Globe.',
      'Step 6: Book Flights & Accommodation — Secure confirmed return flights and hotel bookings.',
      'Step 7: Board Flight to Turkey — Carry passport, eVisa/printed sticker visa, return ticket, and hotel booking.',
      'Step 8: Clear Immigration — Present documents at Turkish airport immigration for entry clearance (up to 30 days stay).'
    ],
    'jordan': [
      'Step 1: Plan Your Jordan Itinerary — Research destinations (Amman, Petra, Wadi Rum, Dead Sea, Aqaba) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Purchase Jordan Pass (Recommended) — Buy at jordanpass.jo (starting 70 JOD) to waive 40 JOD visa fee and cover 40+ attractions including Petra.',
      'Step 4: Book Flights & Accommodation — Secure confirmed return flights to Amman (AMM) and hotel reservations.',
      'Step 5: Board Flight to Jordan — No prior visa required. Carry passport, Jordan Pass QR code/printout, return ticket, and hotel booking.',
      'Step 6: Clear Immigration on Arrival — Present passport and Jordan Pass at Queen Alia Airport immigration for free visa waiver (stay up to 30 days).'
    ],
    'egypt': [
      'Step 1: Plan Your Egypt Itinerary — Research destinations (Cairo, Luxor, Aswan, Hurghada, Sharm El Sheikh).',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Submit eVisa Application — Complete application on visa2egypt.gov.eg at least 7 days before departure.',
      'Step 4: Pay Visa Fee Online — Pay $25 USD (single entry) or $60 USD (multiple entry) via card.',
      'Step 5: Download Approved eVisa — Receive electronic visa via email within 5-7 business days.',
      'Step 6: Book Flights & Hotels — Secure confirmed return flights and hotel bookings.',
      'Step 7: Board Flight to Egypt — Carry passport, printed eVisa, return ticket, and hotel confirmation.',
      'Step 8: Clear Cairo Immigration — Present documents at airport immigration counter for entry stamp.'
    ],
    'kenya': [
      'Step 1: Plan Your Kenya Safari & Travel — Research parks (Masai Mara, Amboseli) and coastal destinations (Mombasa, Diani).',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Apply for Kenya eTA — Submit electronic application on etakenya.go.ke at least 3 days before departure.',
      'Step 4: Pay eTA Fee — Pay $34 USD fee online directly via credit/debit card.',
      'Step 5: Download Approved eTA — Receive electronic travel authorization QR code via email.',
      'Step 6: Board Flight to Kenya — Present passport and printed/digital eTA confirmation at airline check-in.',
      'Step 7: Clear Nairobi Immigration — Present eTA and passport at Jomo Kenyatta Airport for fast clearance.'
    ],
    
    // ── SCHENGEN COUNTRIES ──
    'france': [
      'Step 1: Plan Your France & Europe Itinerary — Research cities (Paris, Nice, Lyon, Marseille) and Schengen travel plans.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 3 months beyond departure, issued within 10 years, 2 blank pages.',
      'Step 3: Complete France-Visas Online Application — Fill the official Schengen visa application form on france-visas.gouv.fr.',
      'Step 4: Gather Required Documents — Compile passport, 35x45mm photos, €30,000 insurance, flight/hotel bookings, 3-6 month bank statements, ITR, and employment NOC.',
      'Step 5: Book VFS Global Appointment — Schedule biometric appointment at the nearest VFS Global France Visa Application Centre.',
      'Step 6: Pay Visa Fee — Pay €90 adult Schengen fee + VFS service fee at the appointment.',
      'Step 7: Attend Biometrics & Submit Dossier — Submit your complete dossier and record biometric fingerprints.',
      'Step 8: Track Application Status — Monitor your visa processing status online via the France-Visas portal.',
      'Step 9: Receive Passport with Visa — Collect your stamped passport from VFS or receive via courier (processing: 15 calendar days).',
      'Step 10: Travel to France & Europe — Valid for up to 90 days within 180 days across all 29 Schengen countries.'
    ],
    'spain': [
      'Step 1: Plan Your Spain & Europe Itinerary — Research cities (Madrid, Barcelona, Seville, Valencia) and Schengen travel plans.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 3 months beyond departure, issued within 10 years, 2 blank pages.',
      'Step 3: Complete BLS Spain Application — Fill the official Schengen visa application form on blsspainvisa.com.',
      'Step 4: Gather Required Documents — Compile passport, 35x45mm photos, €30,000 insurance, flight/hotel bookings, 3-6 month bank statements (€122/day, min €1,099), ITR, and NOC.',
      'Step 5: Book BLS International Appointment — Schedule biometric appointment at BLS International Spain Visa Application Centre (Spain does NOT use VFS Global).',
      'Step 6: Pay Visa Fee — Pay €90 adult Schengen fee + €17 BLS service fee at the appointment.',
      'Step 7: Attend Biometrics & Submit Dossier — Submit your complete dossier and record biometric fingerprints.',
      'Step 8: Track Application Status — Monitor your visa processing status online via BLS Spain tracking portal.',
      'Step 9: Receive Passport with Visa — Collect your stamped passport from BLS or receive via courier.',
      'Step 10: Travel to Spain & Europe — Valid for up to 90 days within 180 days across all 29 Schengen countries.'
    ],
    'greece': [
      'Step 1: Plan Your Greece & Europe Itinerary — Research cities (Athens, Santorini, Mykonos, Crete) and Schengen travel plans.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 3 months beyond departure, issued within 10 years, 2 blank pages.',
      'Step 3: Complete GVCW Greece Application — Fill the official Schengen visa application form on in-gr.gvcworld.eu.',
      'Step 4: Gather Required Documents — Compile passport, 35x45mm photos, €30,000 insurance, flight/hotel bookings, 3-6 month bank statements, ITR, and NOC.',
      'Step 5: Book GVCW Appointment — Schedule biometric appointment at GVCW Greece Visa Application Centre (Greece does NOT use VFS Global).',
      'Step 6: Pay Visa Fee — Pay €90 adult Schengen fee + GVCW service fee at the appointment.',
      'Step 7: Attend Biometrics & Submit Dossier — Submit your complete dossier and record biometric fingerprints.',
      'Step 8: Track Application Status — Monitor your visa processing status online via GVCW tracking portal.',
      'Step 9: Receive Passport with Visa — Collect your stamped passport from GVCW or receive via courier.',
      'Step 10: Travel to Greece & Europe — Valid for up to 90 days within 180 days across all 29 Schengen countries.'
    ],
    'germany': [
      'Step 1: Plan Your Germany & Europe Itinerary — Research destinations (Berlin, Munich, Frankfurt, Black Forest).',
      'Step 2: Ensure Passport Validity — Verify passport has at least 3 months validity beyond departure, 2 blank pages.',
      'Step 3: Complete VIDEX Application — Fill the official VIDEX application form on the German Foreign Office portal.',
      'Step 4: Gather Documents — Prepare passport, photos, €30,000 insurance, flight/hotel bookings, bank statements, and ITR.',
      'Step 5: Book VFS Global Appointment — Schedule appointment at VFS Global Germany Centre.',
      'Step 6: Pay Visa Fee — Pay €90 adult fee + VFS logistics fee.',
      'Step 7: Attend Biometrics — Submit dossier and record fingerprints at VFS.',
      'Step 8: Track & Receive Visa — Collect passport with Schengen sticker visa (15 days standard).',
      'Step 9: Travel to Germany & Europe — Valid for up to 90 days within 180 days across all Schengen countries.'
    ],
    'italy': [
      'Step 1: Plan Your Italy & Europe Itinerary — Research destinations (Rome, Florence, Venice, Milan, Amalfi Coast).',
      'Step 2: Ensure Passport Validity — Verify passport has at least 3 months validity beyond departure, 2 blank pages.',
      'Step 3: Complete Schengen Application — Fill official application via Italian Embassy portal or VFS.',
      'Step 4: Compile Dossier — Gather passport, photos, €30,000 insurance, flight/hotel bookings, bank statements, ITR, and NOC.',
      'Step 5: Book VFS Global Appointment — Schedule biometric appointment at VFS Italy Centre.',
      'Step 6: Pay Visa Fee — Pay €90 consular fee + VFS service charge.',
      'Step 7: Submit Dossier & Biometrics — Record ten fingerprints at appointment.',
      'Step 8: Receive Passport — Collect passport with stamped Schengen visa (15 days standard).'
    ],
    
    // ── STANDARD TOURIST VISA COUNTRIES ──
    'australia': [
      'Step 1: Plan Your Australia Itinerary — Research destinations (Sydney, Melbourne, Gold Coast, Great Barrier Reef) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Create ImmiAccount — Register on the Australian Department of Home Affairs ImmiAccount portal.',
      'Step 4: Complete Subclass 600 Application — Fill the online Visitor Visa (Subclass 600) Tourist Stream form with accurate details.',
      'Step 5: Upload Supporting Documents — Upload passport scan, 6-month bank statements, employment proof, itinerary, and accommodation details.',
      'Step 6: Pay Visa Fee — Pay 195 AUD visa application charge online via ImmiAccount.',
      'Step 7: Attend Biometrics (if requested) — Complete biometrics at VFS Global Australian Biometric Collection Centre.',
      'Step 8: Receive Visa Grant — Download your electronic Visa Grant Notification via ImmiAccount (processing: 15-25 days).',
      'Step 9: Travel to Australia — Valid for 3, 6, or 12 months stay with single or multiple entry.',
      'Step 10: Clear Immigration — Present passport at Australian airport for entry clearance.'
    ],
    'uk': [
      'Step 1: Plan Your UK Itinerary — Research destinations (London, Edinburgh, Bath, Oxford, Cambridge) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 1 blank page.',
      'Step 3: Complete UKVI Online Application — Fill the Standard Visitor Visa application on GOV.UK with accurate travel history.',
      'Step 4: Pay Visa Fee — Pay £115 UKVI consular fee online.',
      'Step 5: Upload Supporting Documents — Upload passport, 6-month bank statements, employment proof, itinerary, and accommodation details.',
      'Step 6: Book VFS Global Appointment — Schedule biometric appointment at the nearest VFS Global UK Visa Application Centre.',
      'Step 7: Attend Biometrics — Submit biometrics (fingerprints and photo) at VFS Global UK.',
      'Step 8: Receive Visa Decision — Collect your passport with 6-month multiple-entry visa stamp (processing: 3 weeks standard).',
      'Step 9: Travel to UK — Valid for 6 months with multiple entries.',
      'Step 10: Clear Immigration — Present passport at UK airport for entry clearance.'
    ],
    'usa': [
      'Step 1: Plan Your USA Itinerary — Research destinations (New York, Los Angeles, San Francisco, Las Vegas, Miami) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and blank visa pages.',
      'Step 3: Complete DS-160 Online — Fill the Non-Immigrant Visa Application (DS-160) on ceac.state.gov and print confirmation barcode.',
      'Step 4: Pay MRV Fee — Pay 185 USD MRV visa application fee via usvisascheduling.com.',
      'Step 5: Schedule Appointments — Book VAC Biometrics and Consular Interview appointments on usvisascheduling.com.',
      'Step 6: Attend VAC Biometrics — Submit fingerprints and photo at the Visa Application Center.',
      'Step 7: Attend Consular Interview — Attend interview at US Embassy/Consulate with DS-160 confirmation, passport, and supporting documents.',
      'Step 8: Receive Visa Decision — Verbal decision given at interview. Passport with 10-year B1/B2 visa delivered within 3-5 days.',
      'Step 9: Travel to USA — Valid for 10 years multiple entry. CBP determines stay at port of entry (typically 6 months).',
      'Step 10: Clear Immigration — Present passport at US airport. CBP officer stamps I-94 with authorized stay duration.'
    ],
    'canada': [
      'Step 1: Plan Your Canada Itinerary — Research destinations (Toronto, Vancouver, Montreal, Banff, Niagara Falls) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity.',
      'Step 3: Create IRCC Portal Account — Register on the official IRCC Canada portal.',
      'Step 4: Complete Visitor Visa Application — Fill the Temporary Resident Visa (TRV) application online.',
      'Step 5: Upload Supporting Documents — Upload passport, 6-month bank statements, employment proof, itinerary, and accommodation details.',
      'Step 6: Pay Visa Fee — Pay 100 CAD visa application fee + 85 CAD biometrics fee online.',
      'Step 7: Book VFS Global Appointment — Schedule biometric appointment at VFS Global Canada Visa Application Centre.',
      'Step 8: Attend Biometrics — Submit biometrics at VFS Global Canada.',
      'Step 9: Submit Passport — Upon approval, submit passport to VFS for visa counterfoil stamping.',
      'Step 10: Travel to Canada — Valid for up to 10 years multiple entry. Stay determined at port of entry.'
    ],
    'japan': [
      'Step 1: Plan Your Japan Itinerary — Research destinations (Tokyo, Kyoto, Osaka, Hiroshima) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
      'Step 3: Complete Japan eVisa Application — Fill the online application on evisa.mofa.go.jp or through VFS Global Japan.',
      'Step 4: Gather Required Documents — Compile passport, photos, flight/hotel bookings, 6-month bank statements, ITR, and NOC.',
      'Step 5: Schedule Appointment — Book appointment at VFS Global Japan Visa Application Centre.',
      'Step 6: Pay Visa Fee — Pay 3,000 JPY consular fee + VFS service fee.',
      'Step 7: Submit Documents & Biometrics — Submit dossier and record biometric fingerprints at VFS.',
      'Step 8: Track Application Status — Monitor application status (processing: 5-7 business days).',
      'Step 9: Receive Visa Decision — Collect passport with stamped visa or receive Electronic Visa Issuance Notice.',
      'Step 10: Travel to Japan — Valid for 15, 30, or 90 days single entry.'
    ],
    'new-zealand': [
      'Step 1: Plan Your New Zealand Itinerary — Research destinations (Auckland, Queenstown, Wellington, Rotorua) and activities.',
      'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity.',
      'Step 3: Create INZ Account — Register on Immigration New Zealand (immigration.govt.nz).',
      'Step 4: Complete Visitor Visa Application — Fill the Visitor Visa (Tourist Stream) application online.',
      'Step 5: Upload Supporting Documents — Upload passport, 6-month bank statements, employment proof, itinerary, and accommodation details.',
      'Step 6: Pay Visa Fee — Pay NZD 530 visa application fee online.',
      'Step 7: Attend Biometrics (if requested) — Complete biometrics at VFS Global New Zealand Biometric Collection Centre.',
      'Step 8: Receive Visa Grant — Download your electronic Visitor Visa Grant Notification.',
      'Step 9: Travel to New Zealand — Valid for 3, 6, or 9 months stay with single or multiple entry.',
      'Step 10: Clear Immigration — Present passport at New Zealand airport for entry clearance.'
    ]
  ,

    'czech-republic': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'poland': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'hungary': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'croatia': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'slovakia': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'slovenia': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'estonia': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'latvia': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'lithuania': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'luxembourg': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'malta': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'iceland': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'liechtenstein': [
      'Determine Jurisdiction & Travel Dates: Ensure this destination is your primary destination or point of longest stay in the Schengen zone.',
      'Complete Online Application Form: Fill out the official visa application via the designated consular portal.',
      'Book VAC Appointment: Schedule an appointment for biometric capture and document submission at VFS Global.',
      'Assemble Required Dossier: Gather passport, travel insurance (€30k), bank statements (6 months stamped), ITR-V, flight and hotel reservations, and employer NOC.',
      'Attend Appointment: Visit the VAC to submit physical documents, pay visa (€90) and service fees, and submit digital fingerprints and photo.',
      'Passport Processing & Collection: Track status online; receive your passport with visa vignette via courier or collection within 15 calendar days.'
],
    'bulgaria': [
      'Confirm Entry Eligibility: Check whether traveling on national Bulgarian visa or existing valid double/multiple entry Schengen visa.',
      'Complete Visa Application: Fill out the Bulgarian visa application form accurately.',
      'Schedule VAC Appointment: Book an appointment at VFS Global Bulgaria in your city.',
      'Prepare Dossier: Assemble original passport, photos, flight itinerary, hotel booking, insurance (€30k), bank statements, and employment proof.',
      'Attend Appointment: Submit application, complete biometrics, and pay €90 visa fee plus VFS logistics fee.',
      'Passport Collection: Collect passport with visa vignette or await courier delivery in 10-15 business days.'
    ],
    'cyprus': [
      'Check Visa Requirements: Indian citizens require a Cyprus visa unless holding valid multiple-entry Schengen visa.',
      'Complete Application Form: Fill out Cyprus Category C application form with attached photo.',
      'Book Submission Appointment: Schedule appointment at Cyprus High Commission or authorized VAC.',
      'Assemble Documents: Prepare original passport, flight reservations, confirmed hotel accommodation, bank statements, ITR-V, and employer NOC.',
      'Submit Application & Pay Fees: Submit physical file and pay €90 consular visa fee.',
      'Collect Passport: Receive visa decision within 10 to 15 working days.'
    ],
    'romania': [
      'Register on eVisa Romania: Create account and upload application dossier at official portal evisa.mae.ro.',
      'Await Consular Validation: Embassy/consulate reviews digital dossier and schedules physical submission.',
      'Prepare Physical Documents: Print verified application, gather stamped bank statements, hotel vouchers, flights, and €30k insurance.',
      'Attend Consular Appointment: Submit physical passport and documents at Romanian Embassy/Consulate and pay €90 fee.',
      'Collect Passport: Collect passport with visa sticker within 10 to 14 calendar days.'
    ],
    'israel': [
      'Complete B/2 Application: Fill out official Israel visa application form.',
      'Gather Supporting Documents: Collect 6 months stamped bank statements, 3 years ITR, employer NOC, round-trip flights, and hotel bookings.',
      'Schedule Israel VAC Appointment: Book appointment at Israel Visa Application Centre (I-VAC / Embassy).',
      'Submit Dossier & Pay Fees: Submit application and pay ₹2,500 visa fee plus VAC service charges.',
      'Security Verification & Processing: Consular verification takes 10-15 business days.',
      'Collect Passport: Collect passport with B/2 visa or electronic entry confirmation.'
    ],
    'chile': [
      'Access SAC Ciudadanos: Register on Chilean Ministry of Foreign Affairs portal (tramites.minrel.gov.cl).',
      'Upload Digital Documents: Submit digital copies of passport, round-trip flights, hotel bookings, bank statements, and employment proof.',
      'Await Consular Review: Chilean consulate reviews application and requests any additional information.',
      'Pay Consular Fee: Upon approval notice, pay $50 USD consular visa fee via authorized payment channel.',
      'Submit Passport for Stamping: Present physical passport at Embassy of Chile in New Delhi for visa vignette affixation.',
      'Receive Visa: Collect passport stamped with Chilean tourist visa.'
    ],
    'mexico': [
      'Check Exemption: If holding valid, multiple-entry visa for USA, Canada, Japan, UK, or Schengen, you are visa-exempt.',
      'Schedule MiConsulado Appointment: Book in-person consular appointment via official portal citas.sre.gob.mx.',
      'Complete Application Form: Print application form double-sided on a single sheet of paper.',
      'Assemble Financials: Gather 3-6 months stamped bank statements and payslips meeting monthly income thresholds.',
      'Attend Consular Interview: Visit Embassy of Mexico in New Delhi for biometrics, consular interview, and $53 USD fee payment.',
      'Passport Collection: Collect passport with Mexico visa sticker within 10 business days.'
    ],
    'ukraine': [
      'Register on MFA eVisa Portal: Visit official website evisa.mfa.gov.ua and create applicant profile.',
      'Fill Online Form: Complete online questionnaire matching passport details.',
      'Upload Required Documents: Upload photo, passport scan, health insurance (€30k), bank balance proof, and accommodation confirmation.',
      'Pay Online Fee: Pay $20-$30 USD visa fee securely online using Visa or Mastercard.',
      'Receive Electronic Visa: Download and print approved e-Visa (PDF with QR code) sent via email within 3-5 business days.'
    ]

  };
  
  const defaultSteps = [
    'Step 1: Plan Your Itinerary — Research destinations, activities, and the best time to visit.',
    'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
    'Step 3: Check Visa Requirements — Verify if you need a visa, eVisa, or are eligible for visa-free entry.',
    'Step 4: Gather Required Documents — Compile passport, photographs, flight/hotel bookings, financial proof, and insurance.',
    'Step 5: Complete Application — Submit your visa application online or through the designated Visa Application Center.',
    'Step 6: Pay Visa Fee — Pay the applicable consular visa fee and VAC service charges.',
    'Step 7: Submit Biometrics (if required) — Attend appointment for biometric enrollment.',
    'Step 8: Track Application Status — Monitor your visa processing status online.',
    'Step 9: Receive Passport with Visa — Collect your stamped passport or receive via courier.',
    'Step 10: Travel to Destination — Carry all documents for immigration clearance upon arrival.'
  ];
  
  return map[c] || defaultSteps;
}

// ── 5. TOURISM FEES — COUNTRY SPECIFIC ──
export function getTourismFees(country: string): any {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.fees) return TOURISM_DESTS[c].fees;
  const map: Record<string, any> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': { visa_fee: '₹0 (Free Visa Exemption)', service_fee: '₹0 (No Appointment Needed)', total_fee: '₹0 (Free Entry)', notes: 'Indian passport holders receive 60-day visa-free entry. Extension available for 1,900 THB.' },
    'malaysia': { visa_fee: '₹0 (Free / No Consular Fee)', service_fee: '₹0 (Free Online MDAC)', total_fee: '₹0 (Free on Arrival)', notes: 'Indian passport holders enjoy visa-free entry for up to 30 days. MDAC is free to complete.' },
    'mauritius': { visa_fee: '₹0 (Free / No Consular Fee)', service_fee: '₹0 (No Appointment Needed)', total_fee: '₹0 (Free on Arrival)', notes: 'Indian citizens traveling for tourism are granted a free tourist visa on arrival for up to 60 days.' },
    'maldives': { visa_fee: '₹0 (Free Visa on Arrival)', service_fee: '₹0 (Free IMUGA Portal)', total_fee: '₹0 (Free on Arrival)', notes: 'All tourists entering Maldives receive a complimentary 30-day visa on arrival.' },
    'jamaica': { visa_fee: '₹0 (No Visa Fee)', service_fee: '₹0 (No VAC or Embassy Fee)', total_fee: '₹0 (Free Entry)', notes: 'Indian tourists do not pay any consular visa fee. C5 form at enterjamaica.com is free.' },
    'nepal': { visa_fee: '₹0 (100% Free / Visa Exempt)', service_fee: '₹0 (No VAC)', total_fee: '₹0 (Free Entry)', notes: 'Indian citizens are completely exempt from visa fees and entry permits under bilateral treaty.' },
    'bhutan': { visa_fee: '₹0 (No Visa Fee)', service_fee: '₹1,200/night (SDF)', total_fee: '₹1,200/night (Children 6-12: ₹600/night)', notes: 'Indian citizens do not pay a visa fee. Only the concessional statutory SDF of ₹1,200/night applies.' },
    'seychelles': { visa_fee: '€0 (Free Visitor\'s Permit)', service_fee: '€10 (TA Processing Fee)', total_fee: '€10 Total Reference', notes: 'Entry permit on arrival is 100% free; only the mandatory online TA processing fee applies.' },
    
    // ── EVISA / ONLINE VISA COUNTRIES ──
    'uae': { visa_fee: '₹6,400 (30 Days) / ₹11,800 (60 Days)', service_fee: '₹0 (Included)', total_fee: '₹6,400 – ₹11,800 Total Reference', notes: 'Includes mandatory health and emergency medical insurance coverage under ICP/GDRFA.' },
    'singapore': { visa_fee: 'SGD $30 (approx. ₹1,900)', service_fee: '₹1,000 – ₹1,500 (AVA Fee)', total_fee: '₹3,000 – ₹3,500 Total Reference', notes: 'Official ICA consular visa fee is SGD $30. Non-refundable once processed.' },
    'turkey': { visa_fee: '$43 USD (approx. ₹3,650) for eVisa', service_fee: '₹0 for eVisa / ₹3,500 for Sticker Visa (Gateway Globe)', total_fee: '$43 USD (eVisa) / approx. ₹8,500 (Sticker Visa)', notes: 'Online eVisa fee is paid directly on the official Turkish MFA portal (evisa.gov.tr).' },
    'jordan': { visa_fee: '40 JOD (approx. ₹4,700) on Arrival — OR 0 JOD (with Jordan Pass)', service_fee: '0 JOD (No VFS / VAC Fees)', total_fee: '0 JOD – 40 JOD (or 70 JOD for Jordan Pass)', notes: 'Jordan Pass (70 JOD) waives visa fee + covers 40+ attractions including Petra.' },
    'egypt': { visa_fee: '$25 USD Single Entry (approx. ₹2,100)', service_fee: '₹0 (Official Direct Portal)', total_fee: '$25 USD Total Reference', notes: 'Non-refundable fee paid directly on the official Egyptian government portal.' },
    'kenya': { visa_fee: '$34 USD (approx. ₹2,850)', service_fee: '₹0 (Official Direct Portal)', total_fee: '$34 USD Total Reference', notes: 'Mandatory for all visitors to Kenya; replaces the legacy tourist visa.' },
    'tanzania': { visa_fee: '$50 USD (approx. ₹4,200)', service_fee: '$44 USD (Zanzibar Insurance if visiting Zanzibar)', total_fee: '$50 – $94 USD Total Reference', notes: 'Payable online directly via official government payment system.' },
    
    // ── SCHENGEN COUNTRIES ──
    'france': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference (approx. ₹10,800)', notes: 'Embassy visa fee is NON-REFUNDABLE even if visa is refused.' },
    'germany': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE. Rate subject to consular exchange rate.' },
    'italy': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'spain': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€17 (BLS International Service Fee)', total_fee: '€107 Total Reference (approx. ₹9,650)', notes: 'Spain uses BLS International, not VFS Global. Embassy visa fee is NON-REFUNDABLE.' },
    'greece': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (GVCW Service Fee)', total_fee: '€120 Total Reference (approx. ₹10,800)', notes: 'Greece uses GVCW, not VFS Global. Embassy visa fee is NON-REFUNDABLE.' },
    'netherlands': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'switzerland': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'portugal': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'austria': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'belgium': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'denmark': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'sweden': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'norway': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'finland': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    
    // ── STANDARD TOURIST VISA COUNTRIES ──
    'australia': { visa_fee: '195 AUD (approx. ₹10,800)', service_fee: '₹1,650 (VFS Biometrics if applicable)', total_fee: '195 AUD+ Total Reference', notes: 'Payable online directly via Australian ImmiAccount portal.' },
    'uk': { visa_fee: '£115 (approx. ₹12,300)', service_fee: '₹2,500 – ₹3,500 (VFS Logistics)', total_fee: '£115 + VFS Logistics', notes: 'Payable online at official UKVI portal; VFS add-on services optional.' },
    'usa': { visa_fee: '185 USD (approx. ₹15,540)', service_fee: '0 USD (Direct Consular Fee)', total_fee: '185 USD Total Reference', notes: 'Payable online via official US Visa Scheduling portal. Valid for 10 years multiple entry.' },
    'canada': { visa_fee: '100 CAD (approx. ₹6,200)', service_fee: '85 CAD (Biometrics Fee)', total_fee: '185 CAD Total Reference', notes: 'Official IRCC government fees paid online; visa typically granted up to passport expiry.' },
    'japan': { visa_fee: '3,000 JPY (approx. ₹1,700)', service_fee: '₹750 – ₹1,200 (VFS Processing Fee)', total_fee: '₹2,500 – ₹3,000 Total Reference', notes: 'Consular visa fee is 3,000 JPY for single-entry tourist visa.' },
    'south-korea': { visa_fee: '₹3,200 (Single Entry 90 Days)', service_fee: '₹1,380 (KVAC Service Fee)', total_fee: '₹4,580 Total Reference', notes: 'Consular visa fee is ₹3,200 for single-entry short-term stay.' },
    'vietnam': { visa_fee: '$25 USD Single Entry (₹2,100) / $50 USD Multiple Entry (₹4,200)', service_fee: '₹0 (Official Direct Portal)', total_fee: '$25 – $50 USD Total Reference', notes: 'Non-refundable fee paid directly on the official government payment gateway.' },
    'indonesia': { visa_fee: 'IDR 500,000 (approx. ₹2,700 / $35 USD)', service_fee: '₹0 (Official Direct Portal)', total_fee: 'IDR 500,000 Total Reference', notes: 'Payable online via credit/debit card or in cash/card on arrival at airport counters.' },
    'cambodia': { visa_fee: '$30 USD (approx. ₹2,550) on Arrival / $36 USD (approx. ₹3,050) for Online eVisa', service_fee: '0 USD (No VAC Fees)', total_fee: '$30 – $36 USD Total Official Government Fee', notes: 'Official government fee paid online via credit card or in crisp USD cash at airport VoA counter.' },
    'sri-lanka': { visa_fee: '$20 – $50 USD (approx. ₹1,700 – ₹4,200)', service_fee: '₹0 (Official Portal)', total_fee: '₹1,700 – ₹4,200 Total Reference', notes: 'Periodic fee waivers for Indian citizens apply per bilateral agreements.' },
    'philippines': { visa_fee: '₹3,360 (Single Entry 3 Months)', service_fee: '₹1,500 – ₹2,000 (VFS Processing Fee)', total_fee: '₹4,860 – ₹5,360 Total Reference', notes: 'Consular visa fee for single-entry temporary visitor visa.' },
    'qatar': { visa_fee: 'QAR 0 (Free Visa on Arrival)', service_fee: 'QAR 50 (approx. ₹1,150 for Health Insurance)', total_fee: 'QAR 50 Total Reference', notes: 'Visa on arrival is 100% free. Only mandatory insurance and Discover Qatar lodging apply.' },
    'saudi-arabia': { visa_fee: 'SAR 395 – SAR 535 (approx. ₹8,800 – ₹11,900)', service_fee: '₹0 (Online Portal) / ₹2,000 (Tasheer Center)', total_fee: 'SAR 395 – 535 Total Reference', notes: 'Includes full emergency medical hospitalization insurance covering up to SAR 100,000.' },
    'oman': { visa_fee: 'OMR 20 (approx. ₹4,300 for 30-Day) / OMR 50 (1-Year Multiple)', service_fee: '₹0 (Official Direct Portal)', total_fee: 'OMR 20 Total Reference', notes: 'Non-refundable fee paid directly on official Royal Oman Police gateway.' },
    'bahrain': { visa_fee: 'BHD 9 – BHD 29 (approx. ₹2,000 – ₹6,400)', service_fee: 'BHD 4 (Application Processing Fee)', total_fee: 'BHD 9 – 29 Total Reference', notes: 'Paid online directly on official Bahrain NPRA portal.' },
    'new-zealand': { visa_fee: 'NZD 530 (approx. ₹27,000)', service_fee: 'Payable at VFS Global', total_fee: 'NZD 530 Base Application Charge', notes: 'Paid online via Immigration New Zealand portal. Medical exam fees extra.' },
    'south-africa': { visa_fee: '₹0 (Free Consular Fee for Indian Citizens)', service_fee: '₹2,040 (VFS Logistics Service Charge)', total_fee: '₹2,040 Total Reference', notes: 'Official consular visa fee is completely waived for Indian passport holders.' },
    'brazil': { visa_fee: 'USD $80 (approx. ₹6,800)', service_fee: '₹1,500 (Consular/VAC)', total_fee: 'approx. ₹8,300 Total Reference', notes: 'Apply via E-Consular portal followed by document submission.' }
  ,

    'czech-republic': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE even if visa is refused.' },
    'poland': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'hungary': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'croatia': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'slovakia': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'slovenia': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'estonia': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'latvia': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'lithuania': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'luxembourg': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'malta': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'iceland': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
    'liechtenstein': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Processed under Swiss representation.' },
    'bulgaria': { visa_fee: '€90 (Adult) / €45 (Child 6-12)', service_fee: '€30 (VFS Logistics Fee)', total_fee: '€120 Total Reference (approx. ₹10,800)', notes: 'Consular visa fee is non-refundable.' },
    'cyprus': { visa_fee: '€90 (Adult) / €45 (Child 6-12)', service_fee: '₹1,800 (VAC Logistics Fee)', total_fee: 'approx. ₹9,900 Total Reference', notes: 'Payable at time of submission.' },
    'romania': { visa_fee: '€90 (Adult) / €45 (Child 6-12)', service_fee: '€25 (Consular Logistics)', total_fee: '€115 Total Reference (approx. ₹10,350)', notes: 'Initial registration online at evisa.mae.ro.' },
    'israel': { visa_fee: '₹2,500 (B/2 Consular Visa Fee)', service_fee: '₹1,850 (I-VAC Service Fee)', total_fee: '₹4,350 Total Reference', notes: 'Payable via draft/card at Israel Visa Application Centre.' },
    'chile': { visa_fee: '$50 USD (approx. ₹4,250)', service_fee: '₹1,500 (Consular Processing)', total_fee: 'approx. ₹5,750 Total Reference', notes: 'Paid online upon preliminary application approval.' },
    'mexico': { visa_fee: '$53 USD (approx. ₹4,400)', service_fee: '0 USD (Direct Consular Fee)', total_fee: '$53 USD Total Reference', notes: 'Exempt if holding valid US, Canada, Japan, UK or Schengen visa.' },
    'ukraine': { visa_fee: '$20 – $30 USD (approx. ₹1,700 – ₹2,550)', service_fee: '₹0 (Official Direct Portal)', total_fee: '$20 – $30 USD Total Reference', notes: 'Paid online directly via credit card on evisa.mfa.gov.ua.' }

  };
  
  return map[c] || {
    visa_fee: 'Official Statutory Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Check official embassy website for current fees.'
  };
}

// ── 6. TOURISM PROCESSING TIME — COUNTRY SPECIFIC ──
export function getTourismProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.proc_time) return TOURISM_DESTS[c].proc_time;
  const map: Record<string, string> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': 'Instant on Arrival (0 Days) — Free 60-day entry stamp',
    'malaysia': 'Instant on Arrival (0 Days) — Free 30-day entry stamp with MDAC',
    'mauritius': 'Instant on Arrival (0 Days) — Free 60-day entry stamp',
    'maldives': 'Instant on Arrival (0 Days) — Free 30-day entry stamp',
    'jamaica': 'Instant on Arrival (0 Days) — Free 30-day entry stamp',
    'nepal': 'Instant on Arrival (0 Days) — Freedom of Movement',
    'bhutan': 'Instant on Arrival (0 Days) — Entry Permit with SDF',
    'seychelles': 'Instant on Arrival (0 Days) — Free 30-day entry permit with TA',
    
    // ── EVISA / ONLINE VISA COUNTRIES ──
    'uae': '24 to 72 working hours (Express 8 hours available)',
    'singapore': '3 to 5 Business Days (via ICA Authorized Visa Agent)',
    'turkey': 'Instant / 5 Minutes for Online eVisa (10-15 Working Days for Sticker Visa via Gateway Globe)',
    'jordan': 'Instant on Arrival at Queen Alia Airport (AMM) / 24-48 Hours via MOI Online Portal',
    'egypt': '5–7 Business Days (Official eVisa Portal)',
    'kenya': '72 Hours (3 Business Days) — Kenya eTA',
    'tanzania': '5–10 Working Days (or Visa on Arrival)',
    
    // ── SCHENGEN COUNTRIES ──
    'france': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'germany': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'italy': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'spain': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'greece': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'netherlands': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'switzerland': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'portugal': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'austria': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'belgium': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'denmark': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'sweden': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'norway': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    'finland': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak)',
    
    // ── STANDARD TOURIST VISA COUNTRIES ──
    'australia': '15 to 25 Calendar Days (Standard Assessment Stream)',
    'uk': 'Standard 3 Weeks (15 Working Days) — Priority 5 Working Days (+£500)',
    'usa': 'Verbal Decision at Consular Window — Passport dispatch 3-5 Business Days',
    'canada': '15 to 30 Business Days after Biometrics Submission',
    'japan': '5–7 Business Days (Standard Processing)',
    'south-korea': '7–10 Business Days (Standard Processing)',
    'vietnam': '3 Business Days (72 Hours) — Online eVisa',
    'indonesia': 'Instant / 1–2 Hours Online (or on Arrival)',
    'cambodia': 'Instant on Arrival / 1–3 Business Days for Online eVisa',
    'sri-lanka': 'Instant / 24–48 Hours Online (ETA)',
    'philippines': '7–10 Business Days (Standard Processing)',
    'qatar': 'Instant / On-Arrival (0 Days) or Online via Hayya Portal',
    'saudi-arabia': '24–72 Hours Online (or 3–5 Days via Tasheer)',
    'oman': '24–48 Hours Online (eVisa)',
    'bahrain': '3–5 Business Days (Online eVisa)',
    'new-zealand': '15 to 25 Calendar Days (Standard Assessment)',
    'south-africa': '10–15 Business Days (VFS Submission)',
    'brazil': '5 to 15 Working Days (or Instant / 24–72 Hours for eVisa)'
  ,

    'czech-republic': '15 Calendar Days statutory consular SLA',
    'poland': '15 Calendar Days statutory consular SLA',
    'hungary': '15 Calendar Days statutory consular SLA',
    'croatia': '15 Calendar Days statutory consular SLA',
    'slovakia': '15 Calendar Days statutory consular SLA',
    'slovenia': '15 Calendar Days statutory consular SLA',
    'estonia': '15 Calendar Days statutory consular SLA',
    'latvia': '15 Calendar Days statutory consular SLA',
    'lithuania': '15 Calendar Days statutory consular SLA',
    'luxembourg': '15 Calendar Days statutory consular SLA',
    'malta': '15 Calendar Days statutory consular SLA',
    'iceland': '15 Calendar Days statutory consular SLA',
    'liechtenstein': '15 Calendar Days statutory consular SLA',
    'bulgaria': '10 – 15 Working Days',
    'cyprus': '10 – 15 Working Days',
    'romania': '10 – 14 Calendar Days',
    'israel': '10 – 15 Business Days',
    'chile': '15 – 20 Business Days',
    'mexico': '10 – 15 Working Days',
    'ukraine': '3 – 5 Business Days (e-Visa)'

  };
  
  return map[c] || 'Per Official Consular SLA. Apply at least 3-4 weeks before travel.';
}

// ── 7. TOURISM PROCESSING DETAILS — Additional Context ──
export function getTourismProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.proc_details) return TOURISM_DESTS[c].proc_details;
  const map: Record<string, string> = {
    'thailand': 'No prior application needed. Complete TM6 arrival card on flight. Entry stamp granted at immigration counter.',
    'malaysia': 'Submit MDAC online within 3 days of arrival. Entry stamp granted at immigration counter.',
    'mauritius': 'Complete All-in-One Digital Form before departure. Entry stamp granted at SSR Airport.',
    'maldives': 'Complete IMUGA Traveler Declaration within 96 hours of arrival. Entry stamp at Velana Airport.',
    'jamaica': 'Complete C5 Online Form at enterjamaica.com before boarding. Entry stamp at airport.',
    'nepal': 'No application needed. Just present Indian passport or Voter ID at immigration.',
    'bhutan': 'Arrange hotel and SDF payment 7-20 days before travel. Entry permit on arrival at Paro Airport.',
    'seychelles': 'Complete TA online 10 days to 24 hours before flight. Entry permit on arrival.',
    'uae': 'Apply 7-30 days before departure. Valid for 60 days from electronic issuance.',
    'singapore': 'Apply 3-4 weeks before departure. Valid for up to 2 years multiple entry.',
    'turkey': 'eVisa: Apply 3-14 days before travel. Sticker Visa: Apply 4 weeks before travel.',
    'jordan': 'Purchase Jordan Pass 3-14 days before flying. Instant visa on arrival at AMM Airport.',
    'egypt': 'Apply 7-15 days before flight. Valid for 90 days entry window.',
    'kenya': 'Apply 3 days to 3 months before flight. Valid for 90 days single entry.',
    'tanzania': 'Apply 2-4 weeks before travel. Extendable up to 6 months.',
    'france': 'Apply 6 months to 15 days before travel. 90/180 Schengen rule applies.',
    'germany': 'Apply 6 months to 15 days before travel. VIDEX portal and VFS Global appointment required.',
    'italy': 'Apply 6 months to 15 days before travel. VFS Global appointment required.',
    'spain': 'Apply 6 months to 15 days before travel. BLS International handles submissions.',
    'greece': 'Apply 6 months to 15 days before travel. GVCW handles submissions.',
    'netherlands': 'Apply 6 months to 15 days before travel. VFS Global appointment required.',
    'australia': 'Apply 4-8 weeks before travel. 100% digital e-Visa linked to passport.',
    'uk': 'Apply 3 months before travel. Priority services available for faster processing.',
    'usa': 'Apply 2-3 months before travel. 10-year multiple entry visa.',
    'canada': 'Apply 30-90 days before travel. 10-year multiple entry visa.',
    'japan': 'Apply 3-6 weeks before travel. Visit Japan Web registration recommended.',
    'south-korea': 'Apply 3-6 weeks before travel. Q-Code health declaration required.',
    'new-zealand': 'Apply 4-8 weeks before travel. 100% digital e-Visa.',
    'south-africa': 'Apply 3-6 weeks before travel. ₹0 consular fee for Indian citizens.'
  ,

    'czech-republic': 'Under Schengen Visa Code rules, standard processing takes 15 calendar days from document receipt at Embassy in New Delhi. Apply 4 to 6 weeks prior to travel.',
    'poland': 'Standard Schengen processing time of 15 calendar days from consular receipt. May extend to 45 days if additional security screening is required.',
    'hungary': 'Consular processing standard SLA is 15 calendar days. Early appointment booking at VFS Hungary is recommended.',
    'croatia': 'Processed in approximately 15 calendar days in accordance with Schengen regulations. Apply 1 to 2 months before planned departure.',
    'slovakia': 'Schengen processing SLA is 15 calendar days from submission at VFS Global.',
    'slovenia': 'Standard Schengen timeframe is 15 calendar days from appointment date.',
    'estonia': 'Consular decision takes 15 calendar days under standard circumstances.',
    'latvia': 'Embassy of Latvia processes Schengen tourist applications within 15 calendar days.',
    'lithuania': 'Standard processing timeline is 15 calendar days from biometric appointment.',
    'luxembourg': 'Processed within 15 calendar days in accordance with Schengen guidelines.',
    'malta': 'Central Visa Unit processes applications within 15 calendar days. Peak summer seasons may experience longer queues.',
    'iceland': 'Applications processed via representation within 15 calendar days.',
    'liechtenstein': 'Processed via Swiss Embassy within 15 calendar days.',
    'bulgaria': 'Consular section of Bulgarian Embassy evaluates tourist visa applications within 10-15 working days.',
    'cyprus': 'High Commission of Cyprus processes applications in 10-15 working days.',
    'romania': 'Online validation followed by consular processing takes approximately 10-14 calendar days.',
    'israel': 'Embassy of Israel and Israel VAC process B/2 visitor applications within 10 to 15 business days.',
    'chile': 'Chilean consular authorities process electronic applications within 15 to 20 business days.',
    'mexico': 'Consular interview and visa issuance typically takes 10 to 15 working days at Embassy in New Delhi.',
    'ukraine': 'Ministry of Foreign Affairs processes standard e-Visa applications within 3 to 5 business days.'

  };
  
  return map[c] || 'Apply at least 3-4 weeks before travel. Check official website for current processing times.';
}

// ── 8. TOURISM FAQ — COUNTRY SPECIFIC ──
export function getTourismFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.faqs) return TOURISM_DESTS[c].faqs;
  const map: Record<string, FAQItem[]> = {
    'thailand': [
      { question: 'Do Indian citizens need a visa for Thailand?', answer: 'No, Indian passport holders can enter Thailand visa-free for up to 60 days. This is a visa exemption scheme effective from 2024 onwards.' },
      { question: 'How can I extend my stay in Thailand?', answer: 'You can extend your stay for an additional 30 days at local Thai immigration offices for 1,900 THB. Extensions are subject to approval.' },
      { question: 'Is there any minimum funds requirement for Thailand?', answer: 'You should have 10,000 THB per person or 20,000 THB per family in cash or card. This is a standard immigration spot-check requirement.' },
      { question: 'Can I extend my 60-day visa exemption in Thailand?', answer: 'Yes, you can apply for a one-time 30-day extension at any local Thai Immigration Office for a statutory fee of 1,900 THB.' },
      { question: 'What funds proof is required at Thai immigration?', answer: 'Immigration officers may randomly request proof of 10,000 THB per person (approx. ₹24,000) or 20,000 THB per family in cash or card.' }
    ],
    'malaysia': [
      { question: 'Do Indian citizens need a visa for Malaysia?', answer: 'No, Indian passport holders enjoy visa-free entry for up to 30 days for tourism. You must submit the free MDAC online within 3 days before arrival.' },
      { question: 'What is the MDAC requirement for Malaysia?', answer: 'The Malaysia Digital Arrival Card (MDAC) is a mandatory online arrival form completed at imigresen-online.imi.gov.my/mdac. It generates an electronic confirmation required at border control.' },
      { question: 'Can I extend my stay in Malaysia?', answer: 'The 30-day visa-free social visit pass is non-extendable except under exceptional medical or emergency circumstances approved by immigration.' },
      { question: 'Is the Malaysia Digital Arrival Card (MDAC) mandatory?', answer: 'Yes, all Indian travelers must complete the MDAC online within 3 days prior to arrival at imigresen-online.imi.gov.my/mdac.' },
      { question: 'Can the 30-day visa-free stay be extended in Malaysia?', answer: 'No, the 30-day visa exemption is non-extendable and non-convertible. You must exit Malaysia within 30 days.' }
    ],
    'mauritius': [
      { question: 'Do Indian citizens need a visa for Mauritius?', answer: 'No prior visa is required. Indian tourists receive a free 60-day entry permit on arrival at SSR International Airport.' },
      { question: 'What is the Mauritius All-in-One Digital Form?', answer: 'It is a mandatory online health and immigration declaration completed at safetravel.govmu.org before departure. Generate the QR code for airport presentation.' },
      { question: 'Can I extend my stay in Mauritius?', answer: 'Yes, tourist permits can be extended free of charge for up to 90 days total at the Passport & Immigration Office in Port Louis.' },
      { question: 'Is the All-in-One digital travel form mandatory for Mauritius?', answer: 'Yes, travelers must complete the Mauritius All-in-One Digital Travel Form at safetravel.govmu.org prior to departure.' },
      { question: 'Can I extend my stay beyond 60 days in Mauritius?', answer: 'Yes, you can apply for an extension up to 90 days at the Passport and Immigration Office in Port Louis without additional visa fees.' }
    ],
    'maldives': [
      { question: 'Do Indian citizens get visa on arrival for Maldives?', answer: 'Yes, all tourists receive a complimentary 30-day visa on arrival upon showing a valid passport, prepaid hotel voucher, and return ticket.' },
      { question: 'What is the IMUGA declaration?', answer: 'The IMUGA Traveler Declaration must be submitted online at imuga.immigration.gov.mv within 96 hours before arriving and departing Maldives.' },
      { question: 'Can the Maldives tourist visa be extended?', answer: 'Yes, the 30-day visa on arrival can be extended for up to 90 days total by applying directly at the Maldives Immigration Department in Male.' },
      { question: 'Is the IMUGA declaration mandatory for Maldives?', answer: 'Yes, all passengers must submit the IMUGA online traveler declaration at imuga.immigration.gov.mv within 96 hours before arrival.' },
      { question: 'Can I extend the 30-day Maldives on-arrival visa?', answer: 'Yes, the visa on arrival can be extended for up to 90 days total by applying to the Department of Immigration in Malé.' }
    ],
    'jamaica': [
      { question: 'Do Indian citizens need a visa for Jamaica?', answer: 'No, Indian tourists can visit Jamaica visa-free for up to 30 days. You only need a valid passport, return ticket, and the mandatory C5 online form.' },
      { question: 'What is the C5 form for Jamaica?', answer: 'The C5 Online Immigration and Customs Form must be filled out at enterjamaica.com before boarding your flight. It is completely free.' },
      { question: 'Can the 30-day stay in Jamaica be extended?', answer: 'Yes, you can extend your stay inside Jamaica by visiting the Passport, Immigration and Citizenship Agency (PICA) office in Kingston or Montego Bay.' },
      { question: 'What is the C5 online form for Jamaica?', answer: 'The C5 Online Immigration and Customs Declaration form must be submitted at enterjamaica.com before boarding your flight.' },
      { question: 'Do Indian passport holders pay any visa fees for Jamaica?', answer: 'No, Indian citizens enjoy visa-free entry for up to 30 days with zero consular visa fees.' }
    ],
    'uae': [
      { question: 'Do Indian citizens need a visa for UAE?', answer: 'Yes, Indian passport holders require a valid eVisa or entry permit to enter the UAE. Apply online through ICP/GDRFA portals. Visa on arrival is available for US citizens only.' },
      { question: 'How long is the UAE Tourist eVisa valid?', answer: 'The eVisa is valid for 60 days from the date of electronic issuance. You must enter the UAE within this period. Stay duration depends on your selected tier (30 or 60 days).' },
      { question: 'Can I extend my UAE Tourist Visa?', answer: 'Yes, you can extend your tourist visa inside the UAE for an additional 30 days without exit. Extensions are processed through ICP/GDRFA.' },
      { question: 'Can I extend my UAE tourist visa while inside Dubai?', answer: 'Yes, UAE tourist visas can be extended inside the country for an additional 30 days without exiting through ICP/GDRFA.' },
      { question: 'Does the UAE tourist visa include medical insurance?', answer: 'Yes, official UAE tourist visas include mandatory emergency health insurance valid across the UAE.' }
    ],
    'singapore': [
      { question: 'Do Indian citizens need a visa for Singapore?', answer: 'Yes, Indian passport holders require a valid eVisa to enter Singapore. Apply through ICA Authorized Visa Agents (AVAs) in India. You cannot apply directly on ICA unless sponsored by a Singapore Citizen/PR.' },
      { question: 'How long is the Singapore eVisa valid?', answer: 'Singapore e-Visas are typically issued for up to 2 years with multiple entries. Each visit allows a stay of up to 30 days. Validity and stay duration are at the discretion of ICA.' },
      { question: 'What is the SG Arrival Card (SGAC)?', answer: 'The SGAC is a mandatory electronic arrival declaration. You must submit it online within 3 days before arrival in Singapore. It includes health declaration and travel details.' },
      { question: 'Can I apply for a Singapore visa directly as an individual?', answer: 'Singapore visas must be submitted through an authorized visa agent (AVA) or a Singapore citizen/PR local sponsor via ICA e-Services.' },
      { question: 'Is the Singapore Arrival Card (SGAC) mandatory?', answer: 'Yes, all travelers must submit the SG Arrival Card online within 3 days prior to arrival.' }
    ],
    'turkey': [
      { question: 'Who is eligible for Turkey online eVisa from India?', answer: 'Indian passport holders can apply for an online eVisa at evisa.gov.tr ONLY IF they hold a valid US, UK, Schengen, or Ireland visa/residence permit. Otherwise, a sticker visa via Gateway Globe is required.' },
      { question: 'How fast is the Turkey online eVisa processed?', answer: 'The online eVisa is issued instantly (typically within 5 minutes) upon online payment of $43 USD at evisa.gov.tr.' },
      { question: 'How long can I stay in Turkey on an eVisa?', answer: 'The eVisa allows a single entry of up to 30 days within a 180-day validity window.' },
      { question: 'Who is eligible for a Turkish eVisa?', answer: 'Indian passport holders who possess a valid supporting visa or residence permit from the Schengen area, USA, UK, or Ireland can obtain a 30-day single-entry Turkish eVisa online.' },
      { question: 'How do I apply if I do not have a Schengen/US/UK visa?', answer: 'You must apply for a physical sticker visa through Gateway Globe VAC in India.' }
    ],
    'jordan': [
      { question: 'How does the Jordan Pass save money on visa fees?', answer: 'Purchasing the Jordan Pass (starting 70 JOD at jordanpass.jo) waives the 40 JOD visa on arrival fee, provided you stay at least 3 consecutive nights, and covers entry to Petra and 40+ attractions.' },
      { question: 'Can Indian citizens get Visa on Arrival in Jordan?', answer: 'Yes, Visa on Arrival is available at Queen Alia Airport (AMM) for 40 JOD cash/card, or free with an advance Jordan Pass.' },
      { question: 'How long is the Jordan tourist visa valid for stay?', answer: 'The standard stay granted on arrival is 30 days, which can be extended for up to 3 months at a local Jordanian police station.' },
      { question: 'What is the Jordan Pass benefit for Indians?', answer: 'Buying the Jordan Pass (70 JOD) online before departure waives the 40 JOD visa fee and includes entry to Petra and 40+ sites.' },
      { question: 'Can Indian citizens get visa on arrival in Jordan?', answer: 'Yes, visa on arrival is available at Queen Alia Airport (Amman) for 40 JOD.' }
    ],
    'egypt': [
      { question: 'How do Indian passport holders apply for Egypt eVisa?', answer: 'Apply online at visa2egypt.gov.eg at least 7 days before departure. The fee is $25 USD for single entry and $60 USD for multiple entry.' },
      { question: 'Can Indian citizens get Visa on Arrival in Egypt?', answer: 'Indian citizens holding a valid, used visa for the US, UK, Schengen, Japan, or Canada can obtain a 30-day Visa on Arrival for $25 USD at Cairo Airport.' },
      { question: 'What documents are checked at Egyptian immigration?', answer: 'You must present your printed eVisa/visa, passport with 6+ months validity, return flight ticket, hotel bookings, and travel itinerary.' },
      { question: 'Can Indians get an Egypt eVisa?', answer: 'Yes, Indian citizens holding valid visas for USA, UK, Canada, Japan, or Schengen can obtain an eVisa online or visa on arrival.' },
      { question: 'How long does an Egypt visa take?', answer: 'eVisa takes 5 to 7 days; Embassy sticker visa takes 10 to 15 business days.' }
    ],
    'kenya': [
      { question: 'What is the Kenya eTA system?', answer: 'Kenya has replaced traditional visas with an Electronic Travel Authorisation (eTA). All visitors must apply online at etakenya.go.ke before boarding. Processing takes 72 hours and costs $34 USD.' },
      { question: 'Can I get a visa on arrival in Kenya?', answer: 'No, Kenya no longer issues any visas on arrival. You must obtain an approved eTA QR code prior to flight departure.' },
      { question: 'How long is the Kenya eTA valid?', answer: 'The eTA allows a single entry of up to 90 days from the date of approval.' },
      { question: 'Is Kenya visa-free?', answer: 'Kenya replaced visas with the mandatory Electronic Travel Authorization (eTA) at etakenya.go.ke ($34 USD fee).' },
      { question: 'How long before travel should I apply for Kenya eTA?', answer: 'Apply at least 3 days prior to departure; standard processing takes 72 hours.' }
    ],
    'france': [
      { question: 'Do Indian citizens need a visa for France?', answer: 'Yes, Indian passport holders require a Schengen visa to enter France. Apply through France-Visas portal and VFS Global. France is part of the Schengen Area.' },
      { question: 'What is the Schengen 90/180 rule?', answer: 'You can stay up to 90 days within any rolling 180-day period across all 29 Schengen countries. Overstaying results in a multi-year Schengen entry ban.' },
      { question: 'How much travel insurance do I need for Schengen?', answer: 'You need travel medical insurance with minimum €30,000 coverage for emergency medical treatment, hospitalization, and repatriation across all Schengen states.' },
      { question: 'Can I appeal if my visa is refused?', answer: 'Yes, you receive an official refusal notice and have 30 days to lodge a remonstrance or submit a fresh application addressing the refusal reasons.' },
      { question: 'Do I need to submit biometrics if I gave them previously?', answer: 'Biometric data (fingerprints) is stored in the VIS system for 59 months. If taken within 5 years, you may be exempt from re-fingerprinting.' }
    ],
    'germany': [
      { question: 'Do Indian citizens need a visa for Germany?', answer: 'Yes, Indian passport holders require a Schengen visa to enter Germany. Apply through the VIDEX portal and book an appointment at VFS Global Germany.' },
      { question: 'What is the financial requirement for Germany tourist visa?', answer: 'You should show around €45 to €100 per day of stay through 3 to 6 months stamped bank statements and last 2-3 years ITR.' },
      { question: 'Can I travel to other European countries on a German visa?', answer: 'Yes, a Schengen visa issued by Germany allows seamless travel across all 29 Schengen member states during its validity.' },
      { question: 'Can I appeal if my visa is refused?', answer: 'Yes, you receive an official refusal notice and have 30 days to lodge a remonstrance or submit a fresh application addressing the refusal reasons.' },
      { question: 'Do I need to submit biometrics if I gave them previously?', answer: 'Biometric data (fingerprints) is stored in the VIS system for 59 months. If taken within 5 years, you may be exempt from re-fingerprinting.' }
    ],
    'italy': [
      { question: 'Do Indian citizens need a visa for Italy?', answer: 'Yes, Indian passport holders require a Schengen visa. Apply online through the Italian MFA portal and schedule submission at VFS Global Italy.' },
      { question: 'How much funds do I need to show for Italy visa?', answer: 'Italian consular authorities expect approximately €50–€100 per day of stay demonstrated via 3–6 months stamped bank statements.' },
      { question: 'Can I visit the Vatican and San Marino with an Italy visa?', answer: 'Yes, both the Vatican City and San Marino are enclaves accessible without additional border checks from Italy.' },
      { question: 'Can I appeal if my visa is refused?', answer: 'Yes, you receive an official refusal notice and have 30 days to lodge a remonstrance or submit a fresh application addressing the refusal reasons.' },
      { question: 'Do I need to submit biometrics if I gave them previously?', answer: 'Biometric data (fingerprints) is stored in the VIS system for 59 months. If taken within 5 years, you may be exempt from re-fingerprinting.' }
    ],
    'spain': [
      { question: 'Do Indian citizens need a visa for Spain?', answer: 'Yes, Indian passport holders require a Schengen visa to enter Spain. Apply through BLS International Spain (blsspainvisa.com). Spain does NOT use VFS Global.' },
      { question: 'What is the Carta de Invitación for Spain?', answer: 'If staying with friends or relatives in Spain, the host must obtain an official Carta de Invitación from the local Policía Nacional. Private or notarized letters are NOT accepted.' },
      { question: 'What is the financial requirement for Spain visa?', answer: 'You must show minimum €122 per person per day of stay, with an absolute irreducible minimum of €1,099 per person (Order PRE/1282/2007).' },
      { question: 'Can I appeal if my visa is refused?', answer: 'Yes, you receive an official refusal notice and have 30 days to lodge a remonstrance or submit a fresh application addressing the refusal reasons.' },
      { question: 'Do I need to submit biometrics if I gave them previously?', answer: 'Biometric data (fingerprints) is stored in the VIS system for 59 months. If taken within 5 years, you may be exempt from re-fingerprinting.' }
    ],
    'greece': [
      { question: 'Do Indian citizens need a visa for Greece?', answer: 'Yes, Indian passport holders require a Schengen visa to enter Greece. Apply through GVCW Greece (gvcworld.eu). Greece does NOT use VFS Global.' },
      { question: 'Do I need to book all my Greek island ferries in advance?', answer: 'For visa applications, include inter-island ferry/domestic flight bookings in your itinerary. You can book on seajets.gr or ferryscanner.com for your visa application.' },
      { question: 'Can I visit other Schengen countries with a Greece visa?', answer: 'Yes, a Schengen visa issued by Greece allows travel to all 29 Schengen countries, provided you spend the most time in Greece or enter through Greece.' },
      { question: 'Can I appeal if my visa is refused?', answer: 'Yes, you receive an official refusal notice and have 30 days to lodge a remonstrance or submit a fresh application addressing the refusal reasons.' },
      { question: 'Do I need to submit biometrics if I gave them previously?', answer: 'Biometric data (fingerprints) is stored in the VIS system for 59 months. If taken within 5 years, you may be exempt from re-fingerprinting.' }
    ],
    'australia': [
      { question: 'Do Indian citizens need a visa for Australia?', answer: 'Yes, Indian passport holders require a valid visa to enter Australia. Apply for Visitor Visa (Subclass 600) through ImmiAccount. No visa on arrival available.' },
      { question: 'What is the processing time for Australia Visitor Visa?', answer: 'Standard processing is 15 to 25 calendar days. Apply 4-8 weeks before travel. 100% digital e-Visa linked to your passport.' },
      { question: 'What documents do I need for Australia Visitor Visa?', answer: 'You need a valid passport, 6-month bank statements, employment proof, travel itinerary, and accommodation details. Biometrics may be requested.' },
      { question: 'Is a physical passport submission required for Australia visa?', answer: 'No. The Subclass 600 Visitor Visa is 100% electronic. The visa is digitally linked to your passport number with no physical sticker.' },
      { question: 'Can I work on a Subclass 600 tourist visa in Australia?', answer: 'No, employment is strictly prohibited on an Australian visitor visa. Condition 8101 applies.' }
    ],
    'uk': [
      { question: 'Do Indian citizens need a visa for UK?', answer: 'Yes, Indian passport holders require a Standard Visitor Visa to enter the UK. Apply online through GOV.UK. No visa on arrival available.' },
      { question: 'What is the processing time for UK Visitor Visa?', answer: 'Standard processing is 3 weeks (15 working days). Priority service available: 5 working days (+£500) or Super Priority: 24 hours (+£1,000).' },
      { question: 'Can I work on a UK Visitor Visa?', answer: 'No, paid work or employment is strictly prohibited on a Standard Visitor Visa. You can attend meetings, conferences, or conduct business negotiations.' },
      { question: 'Can I track my UK visa decision online?', answer: 'Yes, you will receive email notifications from UKVI when your application is assessed, and VFS tracking allows you to track passport transit.' },
      { question: 'Is priority or super-priority processing available for UK visa?', answer: 'Yes, UKVI offers Priority Visa (5 working days) and Super Priority Visa (next working day) for an additional expedited fee.' }
    ],
    'usa': [
      { question: 'Do Indian citizens need a visa for USA?', answer: 'Yes, Indian passport holders require a B1/B2 Visitor Visa to enter the USA. India is not part of the Visa Waiver Program (ESTA).' },
      { question: 'How long is the US Visitor Visa valid?', answer: 'The B1/B2 visa is typically valid for 10 years with multiple entries. CBP determines stay duration at the port of entry on Form I-94 (usually up to 6 months).' },
      { question: 'What is the visa interview process for USA?', answer: 'You must complete DS-160 online, pay MRV fee, schedule VAC biometrics, and attend an in-person consular interview at the US Embassy/Consulate.' },
      { question: 'Can I expedite my US visa appointment in India?', answer: 'Yes, expedited emergency appointments can be requested for urgent medical, funeral, or business travel through the official portal.' },
      { question: 'What is the interview waiver (Dropbox) criteria for US visa?', answer: 'Applicants renewing a B1/B2 visa that expired within the last 48 months may qualify for interview waiver dropbox submission without an in-person consular interview.' }
    ],
    'canada': [
      { question: 'Do Indian citizens need a visa for Canada?', answer: 'Yes, Indian passport holders require a Visitor Visa (TRV) to enter Canada. Apply online through IRCC. No visa on arrival available.' },
      { question: 'How long is the Canada Visitor Visa valid?', answer: 'The TRV is typically valid for up to 10 years with multiple entries. Biometrics required. Stay duration determined at port of entry.' },
      { question: 'What is the processing time for Canada Visitor Visa?', answer: 'Typically 15 to 30 business days after biometrics submission. Apply 30-90 days before travel.' },
      { question: 'How long is a Canada multiple-entry tourist visa valid?', answer: 'A Canada visitor visa is typically issued as a multiple-entry visa valid up to 10 years or until one month before passport expiry.' },
      { question: 'Is biometrics mandatory for Canada visa from India?', answer: 'Yes, applicants must give biometric fingerprints and a digital photo at a VFS Canada Visa Application Centre (valid for 10 years).' }
    ],
    'japan': [
      { question: 'Do Indian citizens need a visa for Japan?', answer: 'Yes, Indian passport holders require a Tourist Visa to enter Japan. Apply online through evisa.mofa.go.jp or through VFS Global Japan.' },
      { question: 'How long can I stay in Japan on a Tourist Visa?', answer: 'Tourist visas are typically issued for 15, 30, or 90 days single entry. Duration is determined by the consular officer based on your itinerary.' },
      { question: 'What is Visit Japan Web?', answer: 'Visit Japan Web (vjw-lp.digital.go.jp) is a pre-arrival registration system. Complete it before departure for immigration and customs QR code clearance at airports.' },
      { question: 'Can Indian citizens apply for Japan eVisa?', answer: 'Yes, Indian passport holders living in India can apply for an eVisa for short-term tourism (single entry 90 days) via designated agencies.' },
      { question: 'What is the standard processing time for a Japan visa?', answer: 'Processing typically takes 5 to 7 working days from submission at VFS Japan.' }
    ],
    'new-zealand': [
      { question: 'Do Indian citizens need a visa for New Zealand?', answer: 'Yes, Indian passport holders require a Visitor Visa to enter New Zealand. Apply online through Immigration New Zealand (immigration.govt.nz).' },
      { question: 'What is the processing time for New Zealand Visitor Visa?', answer: 'Standard processing is 15 to 25 calendar days. 100% digital e-Visa linked to your passport.' },
      { question: 'Can I work on a New Zealand Visitor Visa?', answer: 'No, paid work or employment is strictly prohibited on a Visitor Visa. You can only engage in tourism, leisure, and visiting family/friends.' },
      { question: 'What is the processing time for a New Zealand visitor visa?', answer: 'Immigration New Zealand currently processes visitor visas within 4 to 6 weeks on average.' },
      { question: 'Is physical passport submission required for New Zealand?', answer: 'No, New Zealand visitor visas are processed online via RealMe; e-Visas are issued digitally.' }
    ],
    'south-africa': [
      { question: 'Do Indian citizens need a visa for South Africa?', answer: 'Yes, Indian passport holders require a Visitor Visa (Section 11(1)) to enter South Africa. Apply through VFS Global South Africa.' },
      { question: 'Is there a visa fee for Indian citizens?', answer: 'No, the consular visa fee is completely waived for Indian citizens. You only pay the VFS Global logistics service charge (₹2,040).' },
      { question: 'What is the processing time for South Africa Visitor Visa?', answer: 'Standard processing is 10 to 15 business days. Apply 3-6 weeks before travel.' },
      { question: 'Is the South Africa visa fee really free for Indians?', answer: 'Yes! The official consular visa fee is completely waived for Indian citizens; only the VFS logistics charge applies.' },
      { question: 'How long does South Africa visa processing take?', answer: 'Processing takes approximately 10 to 15 business days through VFS Global South Africa.' }
    ]
  ,

    'czech-republic': [
      { question: 'Can I visit other European countries with a Czech Republic Schengen visa?', answer: 'Yes. A Schengen visa issued by Czech Republic grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Czech Republic tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Czech VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Czech Republic?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'poland': [
      { question: 'Can I visit other European countries with a Poland Schengen visa?', answer: 'Yes. A Schengen visa issued by Poland grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Poland tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Poland VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Poland?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'hungary': [
      { question: 'Can I visit other European countries with a Hungary Schengen visa?', answer: 'Yes. A Schengen visa issued by Hungary grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Hungary tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Hungary VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Hungary?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'croatia': [
      { question: 'Can I visit other European countries with a Croatia Schengen visa?', answer: 'Yes. A Schengen visa issued by Croatia grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Croatia tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Croatia VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Croatia?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'slovakia': [
      { question: 'Can I visit other European countries with a Slovakia Schengen visa?', answer: 'Yes. A Schengen visa issued by Slovakia grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Slovakia tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Slovakia VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Slovakia?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'slovenia': [
      { question: 'Can I visit other European countries with a Slovenia Schengen visa?', answer: 'Yes. A Schengen visa issued by Slovenia grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Slovenia tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Slovenia VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Slovenia?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'estonia': [
      { question: 'Can I visit other European countries with a Estonia Schengen visa?', answer: 'Yes. A Schengen visa issued by Estonia grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Estonia tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Estonia VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Estonia?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'latvia': [
      { question: 'Can I visit other European countries with a Latvia Schengen visa?', answer: 'Yes. A Schengen visa issued by Latvia grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Latvia tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Latvia VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Latvia?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'lithuania': [
      { question: 'Can I visit other European countries with a Lithuania Schengen visa?', answer: 'Yes. A Schengen visa issued by Lithuania grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Lithuania tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Lithuania VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Lithuania?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'luxembourg': [
      { question: 'Can I visit other European countries with a Luxembourg Schengen visa?', answer: 'Yes. A Schengen visa issued by Luxembourg grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Luxembourg tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Luxembourg VAC / Embassy across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Luxembourg?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'malta': [
      { question: 'Can I visit other European countries with a Malta Schengen visa?', answer: 'Yes. A Schengen visa issued by Malta grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Malta tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Malta VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Malta?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'iceland': [
      { question: 'Can I visit other European countries with a Iceland Schengen visa?', answer: 'Yes. A Schengen visa issued by Iceland grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Iceland tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global / Danish Embassy across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Iceland?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'liechtenstein': [
      { question: 'Can I visit other European countries with a Liechtenstein Schengen visa?', answer: 'Yes. A Schengen visa issued by Liechtenstein grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Liechtenstein tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Switzerland VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Liechtenstein?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
],
    'bulgaria': [
      { question: 'Can I travel to Bulgaria with a Schengen visa?', answer: 'Yes, holders of valid double or multiple-entry Schengen visas may enter and stay in Bulgaria for up to 90 days in any 180-day period without a separate Bulgarian visa.' },
      { question: 'What is the processing time for a Bulgaria tourist visa?', answer: 'Consular processing at the Embassy of Bulgaria in New Delhi takes approximately 10 to 15 working days from receipt.' },
      { question: 'Is biometrics mandatory for Bulgaria visa?', answer: 'Yes, applicants must submit fingerprints and a digital photograph at VFS Global Bulgaria.' },
      { question: 'What is the minimum bank balance required for Bulgaria?', answer: 'Applicants must show at least €50 per day of planned stay with a minimum of €500 or ₹1,50,000 in liquid funds.' },
      { question: 'Is travel medical insurance mandatory?', answer: 'Yes, international travel medical insurance with minimum €30,000 coverage is compulsory.' }
    ],
    'cyprus': [
      { question: 'Does a Schengen visa allow entry to Cyprus?', answer: 'Yes, holders of valid double or multiple-entry Schengen C visas who have already entered the Schengen zone can enter Cyprus without a separate visa.' },
      { question: 'Where do I submit my Cyprus visa application in India?', answer: 'Applications are lodged through authorized visa application centers or directly with the Cyprus High Commission in New Delhi.' },
      { question: 'What is the processing time for a Cyprus tourist visa?', answer: 'Standard processing takes 10 to 15 working days from submission.' },
      { question: 'Can I travel between South Cyprus and North Cyprus?', answer: 'Travelers must enter Cyprus through official Republic of Cyprus ports (Larnaca or Paphos airports). Entry via the unrecognized northern ports is considered illegal by Cypriot authorities.' },
      { question: 'Is hotel booking confirmation mandatory?', answer: 'Yes, confirmed hotel accommodation vouchers or an Assumption of Responsibility form certified by a Cypriot notary is mandatory.' }
    ],
    'romania': [
      { question: 'Can I visit Romania with a Schengen visa?', answer: 'Holders of valid double or multiple-entry Schengen visas may enter Romania for up to 90 days within any 180-day period without a Romanian visa.' },
      { question: 'What is the eVisa Romania portal?', answer: 'All applicants must first register and upload their dossier on evisa.mae.ro. Once approved, an appointment is scheduled for physical passport submission.' },
      { question: 'How long does it take to process a Romania tourist visa?', answer: 'Total processing typically takes 10 to 14 calendar days from the physical document submission.' },
      { question: 'What financial proof is required for Romania?', answer: 'You must show bank statements demonstrating at least €50 per day of stay (minimum €500).' },
      { question: 'Is travel insurance required for Romania?', answer: 'Yes, comprehensive medical insurance with at least €30,000 coverage valid across the EU is required.' }
    ],
    'israel': [
      { question: 'Does Israel stamp my passport upon arrival?', answer: 'No. Israeli border control does not stamp passports. Instead, they issue an electronic blue entry card (Border Control Card) to keep with your passport during your stay.' },
      { question: 'Where do I submit my Israel tourist visa application in India?', answer: 'Applications are submitted at Israel Visa Application Centres (I-VAC) in New Delhi, Mumbai, or Bengaluru.' },
      { question: 'How long does it take to process an Israel B/2 visitor visa?', answer: 'Processing takes approximately 10 to 15 business days following in-person submission.' },
      { question: 'What bank balance is needed for an Israel visa?', answer: 'Applicants should demonstrate consistent liquid funds of at least ₹2,50,000 to ₹3,50,000 along with 3 years of ITR returns.' },
      { question: 'Can I visit neighboring Jordan or Egypt from Israel?', answer: 'Yes, land border crossings are open (e.g. Allenby Bridge, Yitzhak Rabin/Arava, Taba). Ensure you hold appropriate visas or Jordan Pass beforehand.' }
    ],
    'chile': [
      { question: 'How do I apply for a Chile tourist visa from India?', answer: 'Applications are submitted online via the official SAC Ciudadanos portal (tramites.minrel.gov.cl). Upon approval, your passport is stamped at the Embassy of Chile in New Delhi.' },
      { question: 'What is the processing time for a Chile visa?', answer: 'Online processing and consular review typically takes 15 to 20 business days.' },
      { question: 'Can I enter Chile with a US or Schengen visa?', answer: 'No, Indian citizens require a Chilean tourist visa regardless of holding US or Schengen visas.' },
      { question: 'How much is the consular fee for a Chile visa?', answer: 'The consular visa fee is $50 USD, payable online once preliminary authorization is granted.' },
      { question: 'What documents are essential for Chile?', answer: 'Passport valid for 6 months, round-trip flights, hotel bookings, 3-6 months stamped bank statements, employer NOC, and day-by-day travel plan.' }
    ],
    'mexico': [
      { question: 'Am I exempt from a Mexican visa if I have a US visa?', answer: 'YES! Indian citizens holding a valid, unexpired multiple-entry visa for the USA, Canada, Japan, United Kingdom, or any Schengen country DO NOT need a Mexican visa for stays up to 180 days.' },
      { question: 'How do I book a visa appointment at the Mexican Embassy?', answer: 'Appointments must be booked online through the official MiConsulado appointment system (citas.sre.gob.mx).' },
      { question: 'Is a personal interview mandatory for Mexico?', answer: 'Yes, every applicant must attend an in-person consular interview and biometric capture at the Embassy of Mexico in New Delhi.' },
      { question: 'What are the financial requirements for a Mexico visa?', answer: 'You must show 3 to 6 months stamped bank statements and payslips proving steady monthly income meeting Mexican consular thresholds.' },
      { question: 'What is the maximum duration of stay on a Mexico tourist visa?', answer: 'Tourist visas are typically granted for multiple entries with up to 180 days stay per entry.' }
    ],
    'ukraine': [
      { question: 'How do Indian citizens apply for a Ukraine tourist visa?', answer: 'Eligible Indian citizens can apply 100% online through the official MFA Ukraine e-Visa portal at evisa.mfa.gov.ua.' },
      { question: 'How fast is the Ukraine e-Visa processed?', answer: 'Standard processing takes 3 to 5 business days from online submission.' },
      { question: 'What is the fee for a Ukraine e-Visa?', answer: 'The official consular fee is $20 USD for single-entry and $30 USD for double-entry.' },
      { question: 'Is health insurance mandatory for Ukraine?', answer: 'Yes, medical health insurance with minimum €30,000 coverage is required and must be uploaded with the application.' },
      { question: 'Do I need to visit an embassy for Ukraine e-Visa?', answer: 'No, the entire process is digital. The approved e-Visa is emailed as a PDF with a verification QR code.' }
    ]

  ,

    'netherlands': [
      { question: 'Can I visit other European countries with a Netherlands Schengen visa?', answer: 'Yes. A Schengen visa issued by Netherlands grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Netherlands tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Netherlands VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Netherlands?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'switzerland': [
      { question: 'Can I visit other European countries with a Switzerland Schengen visa?', answer: 'Yes. A Schengen visa issued by Switzerland grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Switzerland tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Switzerland VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Switzerland?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'portugal': [
      { question: 'Can I visit other European countries with a Portugal Schengen visa?', answer: 'Yes. A Schengen visa issued by Portugal grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Portugal tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Portugal VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Portugal?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'austria': [
      { question: 'Can I visit other European countries with a Austria Schengen visa?', answer: 'Yes. A Schengen visa issued by Austria grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Austria tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Austria VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Austria?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'belgium': [
      { question: 'Can I visit other European countries with a Belgium Schengen visa?', answer: 'Yes. A Schengen visa issued by Belgium grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Belgium tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Belgium VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Belgium?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'denmark': [
      { question: 'Can I visit other European countries with a Denmark Schengen visa?', answer: 'Yes. A Schengen visa issued by Denmark grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Denmark tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Denmark VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Denmark?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'sweden': [
      { question: 'Can I visit other European countries with a Sweden Schengen visa?', answer: 'Yes. A Schengen visa issued by Sweden grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Sweden tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Sweden VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Sweden?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'norway': [
      { question: 'Can I visit other European countries with a Norway Schengen visa?', answer: 'Yes. A Schengen visa issued by Norway grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Norway tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Norway VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Norway?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'finland': [
      { question: 'Can I visit other European countries with a Finland Schengen visa?', answer: 'Yes. A Schengen visa issued by Finland grants unrestricted travel across all 29 Schengen member countries within the 90/180-day limitation rule.' },
      { question: 'How early should I apply for a Finland tourist visa?', answer: 'You can apply up to 6 months before your intended departure date. We recommend applying at least 4 to 6 weeks before travel to account for consular processing.' },
      { question: 'Where do I submit my biometrics and documents in India?', answer: 'Applications are submitted at VFS Global Finland VAC across major Indian metro cities including New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata.' },
      { question: 'Is travel medical insurance mandatory for Finland?', answer: 'Yes. Consular regulations mandate a travel health policy with minimum €30,000 emergency coverage valid across all Schengen states.' },
      { question: 'What happens if my visa application is refused?', answer: 'You will receive an official refusal notice outlining specific grounds. You have the right to file an appeal (remonstrance) within 30 days or re-apply with corrected documentation.' }
    ],

    'nepal': [
      { question: 'Do Indian citizens need a visa to enter Nepal?', answer: 'No. Indian citizens do not require a visa or entry permit to enter Nepal for tourism or business under the 1950 Indo-Nepal Treaty of Peace and Friendship.' },
      { question: 'What identification documents can Indian citizens use for Nepal?', answer: 'Indian citizens must carry EITHER an original valid Indian Passport OR an original Voter Identity Card issued by the Election Commission of India. Aadhaar card is NOT accepted.' },
      { question: 'Can Indian citizens drive their own vehicle into Nepal?', answer: 'Yes, with a vehicle permit (Bhansar) obtained at the land border checkpoint upon presenting the RC book, Indian driving license, and insurance.' },
      { question: 'What are the currency restrictions for Indians in Nepal?', answer: 'Indian Rupee notes in denominations of ₹100 and below are freely accepted everywhere. Carrying notes of ₹500 and ₹2000 is strictly prohibited by law.' },
      { question: 'Are there any airport departure taxes in Nepal?', answer: 'Airport passenger service charges and taxes are now included in your commercial flight ticket price.' }
    ],
    'bhutan': [
      { question: 'Do Indian citizens need a visa to enter Bhutan?', answer: 'Indian nationals do not require a visa, but must obtain an Entry Permit at the port of entry (Paro Airport or Phuentsholing/Samdrup Jongkhar land borders).' },
      { question: 'What is the Sustainable Development Fee (SDF) for Indian tourists?', answer: 'Indian nationals pay a concessional statutory SDF of ₹1,200 per person per night (children aged 6-12 pay ₹600 per night). Infants under 6 are exempt.' },
      { question: 'What ID is required for Indian citizens visiting Bhutan?', answer: 'You must present an original valid Indian Passport (with minimum 6 months validity) OR an original Voter ID card issued by the Election Commission of India.' },
      { question: 'Is it mandatory to hire a Bhutanese tour guide?', answer: 'Yes, hiring a certified Bhutanese local guide and staying at Department of Tourism certified accommodation is mandatory for all international visitors.' },
      { question: 'Can Indian tourists drive an Indian registered car into Bhutan?', answer: 'Yes, personal vehicles require an entry permit endorsement from the Department of Surface Transport at the border.' }
    ],
    'seychelles': [
      { question: 'Do Indian citizens need a visa for Seychelles?', answer: 'No prior visa is required. Indian passport holders are granted a complimentary Visitor\'s Permit on arrival valid for up to 30 days.' },
      { question: 'What is the Seychelles Travel Authorization (TA)?', answer: 'All travelers must obtain an electronic Travel Authorization at seychelles.govtas.com prior to departure for a €10 EUR processing fee.' },
      { question: 'What documents are required at Seychelles immigration?', answer: 'Valid passport, approved Travel Authorization (TA) QR code, confirmed return flight ticket, and confirmed certified accommodation voucher.' },
      { question: 'Can the Seychelles visitor permit be extended?', answer: 'Yes, the permit can be extended in 3-month increments up to a total maximum of 12 months at the Department of Immigration in Victoria, Mahé.' },
      { question: 'Is yellow fever vaccination required for Seychelles?', answer: 'A yellow fever vaccination certificate is required only if arriving from or having transited through an endemic yellow fever area.' }
    ],
    'tanzania': [
      { question: 'Do Indian citizens need a visa for Tanzania?', answer: 'Yes, Indian passport holders can apply for an electronic visa online via the official portal (eservices.immigration.go.tz) or obtain a Visa on Arrival for $50 USD.' },
      { question: 'What is the mandatory Zanzibar health insurance?', answer: 'All foreign visitors to Zanzibar must purchase statutory Zanzibar Inbound Travel Insurance online for $44 USD, regardless of existing international insurance.' },
      { question: 'How long is the Tanzania tourist visa valid?', answer: 'The standard single-entry tourist visa allows a stay of up to 90 days from the date of entry.' },
      { question: 'Can I visit both Mainland Tanzania and Zanzibar with one visa?', answer: 'Yes, Tanzania and Zanzibar share the same immigration jurisdiction. One visa covers both areas.' },
      { question: 'Is yellow fever vaccination required for Tanzania?', answer: 'Vaccination certificate is required only if arriving from or transiting through a country with risk of yellow fever transmission for more than 12 hours.' }
    ],
    'south-korea': [
      { question: 'Do Indian citizens need a visa for South Korea?', answer: 'Yes, Indian passport holders require a visa to visit South Korea. Apply for a C-3-9 tourist visa through the Korea Visa Application Center (KVAC) in New Delhi or Kolkata.' },
      { question: 'Can Indian citizens get a multiple-entry visa for South Korea?', answer: 'Yes, multiple-entry visas valid for 5 years (allowing up to 30 days per visit) are available for professionals, high-income earners, and frequent travelers.' },
      { question: 'What is the processing time for a South Korea tourist visa?', answer: 'Processing takes approximately 7 to 10 working days from the date of submission at KVAC.' },
      { question: 'Can Indian citizens visit Jeju Island without a visa?', answer: 'Direct flights to Jeju Island offer visa-free entry, but any transit through mainland South Korea (Seoul/Incheon) strictly requires a Korean visa.' },
      { question: 'What bank balance is needed for a South Korea visa?', answer: 'Consular guidelines recommend demonstrating a bank balance of at least ₹1,50,000 to ₹2,50,000 along with 6 months stamped bank statements and last 2 years ITR.' }
    ],
    'vietnam': [
      { question: 'How do Indian citizens apply for a Vietnam tourist visa?', answer: 'Indian citizens can apply 100% online for an official e-Visa via the National Web Portal on Immigration at evisa.xuatnhapcanh.gov.vn.' },
      { question: 'How long is the Vietnam e-Visa valid?', answer: 'Vietnam issues single or multiple-entry e-Visas valid for up to 90 days.' },
      { question: 'What is the processing time and fee for Vietnam e-Visa?', answer: 'Standard processing takes 3 to 5 business days. The government fee is $25 USD for single entry and $50 USD for multiple entry.' },
      { question: 'Can I extend my stay in Vietnam on an e-Visa?', answer: 'E-visas cannot be renewed from inside Vietnam. You must exit the country and re-enter on a new e-Visa.' },
      { question: 'Do I need to visit an embassy or submit physical passport?', answer: 'No, the entire application is digital. The approved e-Visa is emailed as a PDF with a QR code to print and show at airport immigration.' }
    ],
    'indonesia': [
      { question: 'Can Indian passport holders get a visa on arrival in Indonesia (Bali)?', answer: 'Yes, Indian citizens can obtain a 30-day electronic Visa on Arrival (e-VOA) online at molina.imigrasi.go.id or directly at international airport immigration counters (e.g. Denpasar Bali, Jakarta).' },
      { question: 'What is the cost of the Indonesia e-VOA / VOA?', answer: 'The statutory fee is IDR 500,000 (approx. $35 USD or ₹2,700), payable online via credit card or at airport cash/card counters.' },
      { question: 'Can the 30-day Indonesian visa on arrival be extended?', answer: 'Yes, it can be extended once for an additional 30 days either online through the molina portal (if applied as e-VOA) or at a local immigration office.' },
      { question: 'What is the Bali Tourist Levy?', answer: 'Bali mandates an additional regional tourist tax of IDR 150,000 (approx. ₹800) paid online via lovebali.baliprov.go.id.' },
      { question: 'What documents are required at Indonesian immigration?', answer: 'Passport valid for at least 6 months, return flight ticket, confirmed hotel accommodation, and completed electronic customs declaration (ECD).' }
    ],
    'cambodia': [
      { question: 'Can Indian citizens get a Cambodia visa on arrival?', answer: 'Yes, a 30-day tourist Visa on Arrival (VoA) is available at Phnom Penh and Siem Reap international airports for $30 USD in cash.' },
      { question: 'Can Indian citizens apply for a Cambodia eVisa online?', answer: 'Yes, an official eVisa can be obtained online at evisa.gov.kh for $36 USD within 3 business days.' },
      { question: 'Can the Cambodia tourist visa be extended?', answer: 'Yes, a 30-day tourist visa can be extended once for an additional 30 days through the Department of Immigration in Phnom Penh.' },
      { question: 'What currency is used in Cambodia for visa payment?', answer: 'US Dollars (USD) are widely used and preferred for on-arrival visa fees. Ensure notes are crisp, clean, and uncreased.' },
      { question: 'What is the Cambodia e-Arrival Card?', answer: 'All travelers must submit the free Cambodia e-Arrival Card online within 7 days prior to entry at arrival.gov.kh.' }
    ],
    'sri-lanka': [
      { question: 'Do Indian passport holders need a visa for Sri Lanka?', answer: 'Yes, travelers must obtain an Electronic Travel Authorization (ETA) online at eta.gov.lk or authorized portal before departure.' },
      { question: 'What is the validity and stay duration of Sri Lanka tourist ETA?', answer: 'The tourist ETA is typically valid for 30 days from entry with double-entry privileges.' },
      { question: 'Can Indian citizens get visa on arrival in Sri Lanka?', answer: 'A Visa on Arrival facility is available at Bandaranaike International Airport (Colombo), but obtaining an ETA online in advance avoids long airport queues.' },
      { question: 'Can I extend my stay in Sri Lanka?', answer: 'Yes, tourist ETAs can be extended up to 90 days and further up to 180 days at the Department of Immigration in Battaramulla.' },
      { question: 'Are visa fees waived for Indian tourists in Sri Lanka?', answer: 'Sri Lanka periodically waives visa fees for Indian citizens under bilateral tourism promotional pilot schemes. Check current status at official portal.' }
    ],
    'philippines': [
      { question: 'Do Indian citizens need a visa for the Philippines?', answer: 'Yes, Indian passport holders require a 9A Temporary Visitor Visa. However, Indian passport holders with valid visas for USA, Japan, Australia, Canada, Schengen, UK, or Singapore can enter visa-free for up to 14 days.' },
      { question: 'Where do I submit my Philippines visa application in India?', answer: 'Applications are submitted at the Philippine Embassy in New Delhi or the Philippine General Consulates in Mumbai and Kolkata.' },
      { question: 'What is the processing time for a Philippines tourist visa?', answer: 'Processing typically takes 10 to 15 working days from physical document submission.' },
      { question: 'What is the mandatory eTravel registration for the Philippines?', answer: 'All inbound passengers must complete the free online eTravel declaration at etravel.gov.ph within 72 hours before departure.' },
      { question: 'Can the 14-day visa-free entry be extended in the Philippines?', answer: 'No, the 14-day visa exemption for valid US/Schengen visa holders is non-extendable.' }
    ],
    'qatar': [
      { question: 'Do Indian citizens get visa-free entry to Qatar?', answer: 'Yes, Indian nationals can obtain a 30-day visa waiver completely free of charge upon arrival at Hamad International Airport (Doha).' },
      { question: 'What are the entry conditions for Qatar visa waiver?', answer: 'Passport valid for 6 months, confirmed return flight ticket, mandatory Hayya health insurance (QAR 50), and confirmed hotel reservation booked through Discover Qatar.' },
      { question: 'Can the Qatar 30-day visa waiver be extended?', answer: 'Yes, the visa waiver can be extended for an additional 30 days online via the Ministry of Interior (MOI) portal.' },
      { question: 'Is travel health insurance mandatory for Qatar?', answer: 'Yes, international visitors must obtain a mandatory health insurance policy approved by the Qatar Ministry of Public Health (cost approx. QAR 50).' },
      { question: 'Can I transit through Doha without a visa?', answer: 'Yes, passengers transiting through Hamad International Airport on a single ticket do not need a transit visa if remaining in the international transit area.' }
    ],
    'saudi-arabia': [
      { question: 'Who is eligible for Saudi Tourist Visa on Arrival?', answer: 'Indian citizens holding a valid, used tourist or business visa for the USA, United Kingdom, or Schengen zone (with at least one entry stamp) can obtain a 1-year multiple entry visa on arrival.' },
      { question: 'How do other Indian passport holders apply for a Saudi tourist visa?', answer: 'Applicants not eligible for visa-on-arrival must apply for a tourist sticker visa through Tasheer Visa Application Centers across India.' },
      { question: 'What is the validity and permitted stay on a Saudi tourist visa?', answer: 'The multiple-entry tourist visa is valid for 1 year with a maximum permitted stay of 90 days per visit (up to 180 days cumulative per year).' },
      { question: 'Does the Saudi tourist visa include medical insurance?', answer: 'Yes, the visa fee automatically includes mandatory emergency health insurance covering medical emergencies up to SAR 100,000.' },
      { question: 'Can I perform Umrah on a Saudi tourist visa?', answer: 'Yes, tourists can perform Umrah at any time of the year (except during the official Hajj season) by booking a slot via the Nusuk app.' }
    ],
    'oman': [
      { question: 'Who is eligible for an Oman unsponsored tourist visa?', answer: 'Indian citizens residing in or holding valid visas for the USA, Canada, United Kingdom, Japan, or Schengen states can apply for an unsponsored tourist eVisa online at evisa.rop.gov.om.' },
      { question: 'How do other Indian travelers apply for an Oman tourist visa?', answer: 'Travelers without supporting visas must apply through an authorized Omani travel agency or local sponsor.' },
      { question: 'What is the validity and fee for an Oman tourist eVisa?', answer: 'A 30-day single-entry eVisa (Subclass 26B) costs OMR 20 (approx. ₹4,300); a 1-year multiple-entry eVisa costs OMR 50 (approx. ₹10,800).' },
      { question: 'How long does Oman eVisa processing take?', answer: 'Online processing through the Royal Oman Police portal typically takes 24 to 48 hours.' },
      { question: 'Can the 30-day Oman tourist visa be extended?', answer: 'Yes, the 30-day single entry visa can be extended once for an additional 30 days online for OMR 20.' }
    ],
    'bahrain': [
      { question: 'Can Indian citizens get a Bahrain eVisa?', answer: 'Yes, Indian passport holders can apply online for a tourist eVisa through the official Ministry of Interior NPRA portal at evisa.gov.bh.' },
      { question: 'What are the visa options and validity for Bahrain?', answer: 'Bahrain offers a 2-week single-entry visa (BHD 9), a 1-month multiple-entry visa (BHD 12), and a 1-year multiple-entry visa (BHD 29).' },
      { question: 'How long does Bahrain eVisa processing take?', answer: 'Standard online processing takes 3 to 5 working days from submission.' },
      { question: 'Can Indian citizens get visa on arrival in Bahrain?', answer: 'Indian citizens holding valid GCC residence permits or specific visas may be eligible for visa on arrival; others must obtain an eVisa in advance.' },
      { question: 'Can a Bahrain tourist visa be extended?', answer: 'Yes, tourist e-Visas can be extended inside Bahrain at the Nationality, Passports and Residence Affairs (NPRA) office.' }
    ],
    'brazil': [
      { question: 'How do Indian citizens apply for a Brazil visitor visa (VIVIS)?', answer: 'Applications are registered online via the official E-Consular system (ec-novadelhi.itamaraty.gov.br) before submitting physical documents to the Embassy in New Delhi.' },
      { question: 'What is the consular visa fee for Brazil?', answer: 'The consular fee for an Indian passport holder applying for a Visitor Visa (VIVIS) is $80 USD (approx. ₹6,800), paid via bank draft.' },
      { question: 'What is the processing time for a Brazil visitor visa?', answer: 'Consular processing at the Embassy of Brazil in New Delhi takes approximately 10 to 15 business days.' },
      { question: 'What is the validity and stay duration of a Brazil visa?', answer: 'Brazil visitor visas are typically issued for multiple entries valid for up to 1 to 5 years, with up to 90 days stay per visit (extendable up to 180 days per year).' },
      { question: 'Is yellow fever vaccination mandatory for Brazil?', answer: 'While not legally mandatory for entry, yellow fever vaccination is strongly recommended by Brazilian health authorities (ANVISA) for travel to forested areas and national parks.' }
    ]

  };
  
  const defaultFAQ: FAQItem[] = [
    { question: `Do Indian citizens need a visa for ${country}?`, answer: `Yes, Indian passport holders require a valid visa or travel authorization to enter ${country}. Check the official embassy website for current requirements.` },
    { question: `What is the processing time for ${country} Tourist Visa?`, answer: `Processing times vary by destination and application type. Apply at least 3-4 weeks before travel. Check the official embassy website for current processing times.` },
    { question: `What documents do I need for ${country} Tourist Visa?`, answer: `You typically need a valid passport, photographs, flight/hotel bookings, financial proof, travel insurance, and employment verification. Check specific requirements for ${country}.` }
  ];
  
  return map[c] || defaultFAQ;
}

// ── 9. TOURISM REQUIREMENTS — COUNTRY SPECIFIC ──
export function getTourismRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.requirements) return TOURISM_DESTS[c].requirements;
  const map: Record<string, OtherRequirementItem[]> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from arrival date with 2 blank pages.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket leaving Thailand within 60 days.' },
      { category: 'Sufficient Funds', details: '10,000 THB per person / 20,000 THB per family in cash or card.' },
      { category: 'No Work Permitted', details: 'Working is strictly prohibited on visa-free entry. Separate work visa required.' }
    ],
    'malaysia': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from arrival date with 2 blank pages.' },
      { category: 'MDAC Registration', details: 'Mandatory online MDAC form completed within 3 days prior to arrival.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket departing Malaysia within 30 days.' },
      { category: 'No Local Employment', details: 'Social Visit Pass holders are strictly forbidden from taking up employment.' }
    ],
    'mauritius': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months beyond intended stay with 2 blank pages.' },
      { category: 'Digital Form', details: 'Mandatory Mauritius All-in-One Digital Form completed before departure.' },
      { category: 'Return Ticket', details: 'Confirmed return flight ticket leaving Mauritius within 60 days.' },
      { category: 'Proof of Funds', details: 'Demonstrate USD $100 / EUR €100 / MUR 4,000 per day of stay.' }
    ],
    'maldives': [
      { category: 'Passport Validity', details: 'Valid for at least 1 month (recommended 6 months) with machine-readable zone.' },
      { category: 'IMUGA Declaration', details: 'Mandatory online form submitted within 96 hours before arrival.' },
      { category: 'Confirmed Resort Booking', details: 'Prepaid hotel reservation or resort voucher for the entire stay.' },
      { category: 'Return Ticket', details: 'Confirmed return air ticket departing Maldives within 30 days.' }
    ],
    'jamaica': [
      { category: 'Passport Validity', details: 'Valid for the duration of stay with at least 1 blank page for entry stamp.' },
      { category: 'C5 Online Form', details: 'Mandatory C5 Immigration & Customs form completed at enterjamaica.com before boarding.' },
      { category: 'Return Ticket', details: 'Verifiable onward travel or return air ticket departing within 30 days.' },
      { category: 'Lodging Proof', details: 'Confirmed hotel booking, Airbnb, or host invitation letter in Jamaica.' }
    ],
    'uae': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from entry date with 2 blank pages.' },
      { category: 'Online eVisa', details: 'Apply through ICP/GDRFA portals. No physical embassy visit required.' },
      { category: 'Return Ticket & Hotel', details: 'Confirmed return flight and hotel booking required for visa approval.' },
      { category: 'Health Insurance', details: 'Mandatory medical insurance included with eVisa fee.' }
    ],
    'singapore': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from entry date with 2 blank pages.' },
      { category: 'eVisa Required', details: 'Apply through ICA Authorized Visa Agent (AVA) in India.' },
      { category: 'SGAC Mandatory', details: 'Complete SG Arrival Card online within 3 days before arrival.' },
      { category: 'Sufficient Funds', details: 'Proof of adequate funds for stay in Singapore.' }
    ],
    'france': [
      { category: 'Schengen 90/180 Rule', details: 'Maximum 90 days stay within any rolling 180-day period across all 29 Schengen countries.' },
      { category: 'Travel Insurance', details: 'Mandatory €30,000 medical insurance covering emergency treatment and repatriation.' },
      { category: 'Financial Solvency', details: 'Proof of funds: €65-120 per day of stay.' },
      { category: 'Biometrics', details: 'Mandatory 10-finger biometric scan at VFS Global.' },
      { category: 'Application Timing', details: 'Apply between 6 months and 15 days before travel.' }
    ],
    'spain': [
      { category: 'Schengen 90/180 Rule', details: 'Maximum 90 days stay within any rolling 180-day period across all 29 Schengen countries.' },
      { category: 'Travel Insurance', details: 'Mandatory €30,000 medical insurance covering emergency treatment and repatriation.' },
      { category: 'Financial Solvency', details: '€122/day per person (min €1,099 floor) under Order PRE/1282/2007.' },
      { category: 'Carta de Invitación', details: 'If staying with host, official police-issued invitation required.' },
      { category: 'BLS International', details: 'Spain uses BLS International, NOT VFS Global for visa applications.' }
    ],
    'greece': [
      { category: 'Schengen 90/180 Rule', details: 'Maximum 90 days stay within any rolling 180-day period across all 29 Schengen countries.' },
      { category: 'Travel Insurance', details: 'Mandatory €30,000 medical insurance covering emergency treatment and repatriation.' },
      { category: 'Financial Solvency', details: 'Proof of funds: €50-70 per day of stay.' },
      { category: 'Island Travel', details: 'Include inter-island ferry/domestic flight bookings in itinerary.' },
      { category: 'GVCW', details: 'Greece uses GVCW, NOT VFS Global for visa applications.' }
    ],
    'australia': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from arrival date.' },
      { category: 'Digital e-Visa', details: '100% electronic visa linked to passport. No physical label required.' },
      { category: 'Genuine Visitor', details: 'Must demonstrate genuine tourist intent and strong ties to home country.' },
      { category: 'Work Prohibited', details: 'Working or providing commercial services in Australia is prohibited.' },
      { category: 'Sufficient Funds', details: 'Proof of sufficient funds for stay (5,000-8,000 AUD recommended).' }
    ],
    'uk': [
      { category: 'Passport Validity', details: 'Valid for the entire duration of stay with at least 1 blank page.' },
      { category: 'No Work Permitted', details: 'Paid work or employment strictly prohibited on Standard Visitor Visa.' },
      { category: 'Home Ties', details: 'Must demonstrate strong ties to home country ensuring return before visa expiry.' },
      { category: 'Sufficient Funds', details: 'Bank balance sufficient for trip cost without recourse to public funds.' },
      { category: 'Biometrics', details: 'Mandatory 10-finger biometric scan at VFS Global UK.' }
    ],
    'usa': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months beyond intended stay with blank visa pages.' },
      { category: '10-Year Visa', details: 'B1/B2 visa valid for 10 years with multiple entries.' },
      { category: 'Consular Interview', details: 'Mandatory in-person interview with US Consular Officer.' },
      { category: 'Section 214(b)', details: 'Must demonstrate non-immigrant intent and strong ties to home country.' },
      { category: 'CBP Discretion', details: 'Stay duration determined by CBP at port of entry (typically 6 months).' }
    ],
    'canada': [
      { category: 'Passport Validity', details: 'Valid for the duration of intended stay.' },
      { category: '10-Year Visa', details: 'Visitor TRV valid for up to 10 years with multiple entries.' },
      { category: 'Biometrics', details: 'Mandatory 10-finger biometric scan at VFS Global Canada.' },
      { category: 'No Work Permitted', details: 'Paid work or employment strictly prohibited on Visitor Visa.' },
      { category: 'Sufficient Funds', details: 'Proof of sufficient funds for stay.' }
    ],
    'japan': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank visa pages.' },
      { category: 'Itinerary Compliance', details: 'Must follow submitted daily schedule of stay (Taizai Nitteihyo).' },
      { category: 'Visit Japan Web', details: 'Register on Visit Japan Web for immigration and customs QR clearance.' },
      { category: 'No Employment', details: 'Temporary visitor visa strictly prohibits taking up local paid work.' }
    ]
  ,

    'czech-republic': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'poland': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'hungary': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'croatia': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'slovakia': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'slovenia': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'estonia': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'latvia': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'lithuania': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'luxembourg': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'malta': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'iceland': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'liechtenstein': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months after scheduled departure from Schengen territory with at least 2 blank pages.' },
      { category: 'Financial Sufficiency', details: 'Must demonstrate minimum liquid funds (approx. €65 – €100 per day of stay) via 6 months stamped bank statements and 3 years ITR-V.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory insurance with minimum €30,000 emergency coverage valid across all 29 Schengen states.' },
      { category: 'Genuine Intent & Ties', details: 'Confirmed round-trip flights, hotel vouchers across entire itinerary, employer NOC, and family/property ties to India.' }
],
    'bulgaria': [
      { category: 'Passport Validity', details: 'Passport valid for at least 3 months beyond departure date from Bulgaria.' },
      { category: 'Financial Solvency', details: 'Minimum €50 per day (minimum €500 total) evidenced by stamped bank statements.' },
      { category: 'Travel Insurance', details: 'Minimum €30,000 coverage valid for Bulgaria covering emergency medical care.' },
      { category: 'Travel Confirmation', details: 'Confirmed round-trip flight booking and verifiable hotel reservations.' }
    ],
    'cyprus': [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months beyond planned stay.' },
      { category: 'Sufficient Funds', details: 'Bank statements for past 3-6 months with bank stamp showing adequate balance.' },
      { category: 'Travel Health Insurance', details: 'Emergency medical insurance with minimum €30,000 coverage.' },
      { category: 'Socio-Economic Ties', details: 'Employer NOC, salary slips, and income tax returns (ITR-V).' }
    ],
    'romania': [
      { category: 'Passport Validity', details: 'Valid for at least 3 months after departure from Romania with 2 blank pages.' },
      { category: 'Financial Means', details: 'At least €50 per day for the entire stay, but not less than €500.' },
      { category: 'Travel Insurance', details: 'Medical insurance covering at least €30,000 for emergency treatment.' },
      { category: 'Itinerary Verification', details: 'Confirmed return flight ticket and prepaid accommodation vouchers.' }
    ],
    'israel': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from entry date with 2 blank pages.' },
      { category: 'Financial Capacity', details: 'Stamped bank statements for past 6 months showing minimum balance of ₹2,50,000+.' },
      { category: 'Travel Medical Insurance', details: 'Mandatory policy covering emergency medical care and hospitalisation in Israel.' },
      { category: 'Employment & Ties', details: 'Letter from employer on letterhead granting leave + last 3 years ITR-V.' }
    ],
    'chile': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months beyond intended departure date from Chile.' },
      { category: 'Financial Solvency', details: 'Personal bank statements proving funds to support travel expenses in Chile.' },
      { category: 'Itinerary & Booking', details: 'Round-trip air ticket reservation and confirmed hotel reservations.' },
      { category: 'Employment Proof', details: 'Certificate of employment stating salary, job title, and approved leave.' }
    ],
    'mexico': [
      { category: 'Passport Validity', details: 'Valid for at least 6 months from arrival date with blank pages.' },
      { category: 'Financial Threshold', details: 'Monthly bank balance or employment income meeting Mexican consular requirements.' },
      { category: 'Visa Exemption Rule', details: 'Holders of valid visas for USA, Canada, Japan, UK, or Schengen are visa-exempt.' },
      { category: 'Consular Interview', details: 'Mandatory in-person interview at Mexican Embassy in New Delhi.' }
    ],
    'ukraine': [
      { category: 'Passport Validity', details: 'Valid for at least 3 months after departure date from Ukraine.' },
      { category: 'Financial Sufficiency', details: 'Documentary proof of sufficient funds for stay (approx. $50/day).' },
      { category: 'Travel Medical Insurance', details: 'Medical insurance policy covering at least €30,000 in Ukraine.' },
      { category: 'Purpose of Visit', details: 'Confirmed hotel reservation, tour itinerary, or invitation letter.' }
    ]

  };
  
  const defaultRequirements: OtherRequirementItem[] = [
    { category: 'Passport Validity', details: 'Valid for at least 6 months beyond intended stay with 2 blank visa pages.' },
    { category: 'Return Ticket', details: 'Confirmed return or onward ticket.' },
    { category: 'Proof of Accommodation', details: 'Hotel bookings or host invitation letter.' },
    { category: 'Sufficient Funds', details: 'Proof of adequate funds for the duration of stay.' },
    { category: 'Travel Insurance', details: 'Comprehensive travel medical insurance (recommended).' }
  ];
  
  return map[c] || defaultRequirements;
}

// ── 10. TOURISM FINANCIAL PROOFS — COUNTRY SPECIFIC ──
export function getTourismFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.financial_proofs) return TOURISM_DESTS[c].financial_proofs;
  const map: Record<string, FinancialProofItem[]> = {
    'thailand': [
      { type: 'Cash / Card on Arrival', minimum_balance_or_amount: '10,000 THB per person / 20,000 THB per family (approx. ₹24,000 – ₹48,000)', time_frame: 'At time of entry', notes: 'Immigration spot-check verification upon arrival.' }
    ],
    'spain': [
      { type: 'Statutory Liquid Funds', minimum_balance_or_amount: '€122/day per person (min. €1,099 floor per traveler)', time_frame: 'Last 3 to 6 months', notes: 'Official Spanish immigration requirement (Order PRE/1282/2007).' },
      { type: 'Bank Statements & ITR', minimum_balance_or_amount: 'Closing balance matching duration', time_frame: 'Last 3-6 months + 2-3 years ITR', notes: 'Stamped bank statements and ITR-V acknowledgements.' }
    ],
    'france': [
      { type: 'Bank Statements', minimum_balance_or_amount: '€65/day (prepaid hotel) or €120/day (no booking)', time_frame: 'Last 3 to 6 months', notes: 'Stamped official statements with consistent closing balance.' },
      { type: 'Income Tax Returns (ITR)', minimum_balance_or_amount: 'Form 16 / ITR-V', time_frame: 'Last 2 to 3 financial years', notes: 'Demonstrating steady personal or business income.' }
    ],
    'germany': [
      { type: 'Bank Statements', minimum_balance_or_amount: '€45 to €100 per day of stay', time_frame: 'Last 3 to 6 months', notes: 'Stamped statements with regular monthly salary or business income.' },
      { type: 'Income Tax Returns (ITR)', minimum_balance_or_amount: 'Form 16 / ITR-V', time_frame: 'Last 2 to 3 years', notes: 'Verifying economic stability and ties to home country.' }
    ],
    'australia': [
      { type: 'Liquid Savings Balance', minimum_balance_or_amount: '5,000 to 8,000 AUD+ (approx. ₹2.8L – ₹4.5L)', time_frame: 'Last 6 consecutive months', notes: 'Sufficient funds covering return flights, lodging, and daily expenses.' },
      { type: 'Income & Tax Returns', minimum_balance_or_amount: 'Last 3 years ITR + 3 months salary slips', time_frame: 'Last 3 years', notes: 'Verifying ongoing career stability and domestic ties.' }
    ],
    'uk': [
      { type: 'Bank Statements', minimum_balance_or_amount: '£2,000 to £3,500+ unencumbered liquid funds', time_frame: 'Last 6 consecutive months', notes: 'Demonstrating regular income credits without unexplained lump-sum deposits.' },
      { type: 'Income Tax Returns', minimum_balance_or_amount: 'Last 2 to 3 years ITR', time_frame: 'Last 2-3 years', notes: 'Proof of tax compliance and financial roots in India.' }
    ],
    'usa': [
      { type: 'Liquid Savings & Assets', minimum_balance_or_amount: 'USD $3,000 to $6,000+ covering trip expenses', time_frame: 'Last 6 months', notes: 'Must overcome Section 214(b) presumption of immigrant intent.' },
      { type: 'Income Tax Returns (ITR)', minimum_balance_or_amount: 'Last 3 years ITR / Form 16', time_frame: 'Last 3 years', notes: 'Demonstrating strong economic roots in India.' }
    ],
    'canada': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: 'CAD $3,000 to $5,000+ per traveler', time_frame: 'Last 6 consecutive months', notes: 'Verifying sufficient funds to cover visit without working.' },
      { type: 'Income Tax & Employment', minimum_balance_or_amount: 'Last 3 years ITR + payslips', time_frame: 'Last 3 years', notes: 'Proof of employment stability and financial capability.' }
    ],
    'japan': [
      { type: 'Bank Statements', minimum_balance_or_amount: '₹1,50,000 to ₹2,50,000 closing balance', time_frame: 'Last 6 months', notes: 'Stamped statements demonstrating self-sufficient holiday funds.' },
      { type: 'Income Tax Returns (ITR-V)', minimum_balance_or_amount: 'Last 2 to 3 financial years', time_frame: 'Last 2-3 years', notes: 'Required document for Japan tourist visa processing.' }
    ],
    'mauritius': [
      { type: 'Daily Expense Funds', minimum_balance_or_amount: 'USD $100 / EUR €100 / MUR 4,000 per day', time_frame: 'At time of entry', notes: 'Immigration may request proof of funds or credit cards on arrival.' }
    ]
  ,

    'czech-republic': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'poland': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'hungary': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'croatia': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'slovakia': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'slovenia': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'estonia': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'latvia': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'lithuania': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'luxembourg': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'malta': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'iceland': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'liechtenstein': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹3,00,000 – ₹5,00,000 per applicant', time_frame: 'Past 6 months', notes: 'Original bank stamp and signature on every page with fresh closing balance.' },
      { type: 'Income Tax Return (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 assessment years', time_frame: 'Assessment years 2022-2025', notes: 'Acknowledgment receipts with computation of income.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Latest 3 to 6 months', time_frame: 'Past 3-6 months', notes: 'Bearing official company seal and signature alongside employment contract.' },
      { type: 'Fixed Deposits & Investments', minimum_balance_or_amount: 'Optional supporting', time_frame: 'Current holdings', notes: 'Mutual funds, FD certificates, or property valuation as secondary proof of wealth.' }
],
    'bulgaria': [
      { type: 'Bank Statements', minimum_balance_or_amount: 'Minimum €500 / ₹1,50,000', time_frame: 'Past 6 months', notes: 'Bank stamped statements proving daily allowance.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Last 3 months', time_frame: 'Past 3 months', notes: 'Certified by employer.' }
    ],
    'cyprus': [
      { type: 'Personal Bank Statement', minimum_balance_or_amount: '₹2,00,000 – ₹3,00,000', time_frame: 'Past 3 to 6 months', notes: 'Original stamped statement with consistent transaction history.' },
      { type: 'Income Tax Returns', minimum_balance_or_amount: 'Last 2 assessment years', time_frame: 'Past 2 years', notes: 'ITR-V acknowledgments.' }
    ],
    'romania': [
      { type: 'Bank Statement', minimum_balance_or_amount: '€50/day (minimum €500)', time_frame: 'Past 3 months', notes: 'Original bank statement with bank stamp and seal.' },
      { type: 'Salary Slips & ITR', minimum_balance_or_amount: 'Last 3 months payslips', time_frame: 'Past 2-3 years ITR', notes: 'Employer certified.' }
    ],
    'israel': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: '₹2,50,000+ liquid balance', time_frame: 'Past 6 months', notes: 'Original bank seal and signature.' },
      { type: 'Income Tax Returns (ITR-V)', minimum_balance_or_amount: 'Last 3 assessment years', time_frame: 'Past 3 years', notes: 'Copies of ITR acknowledgments.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Last 3 months', time_frame: 'Past 3 months', notes: 'Official company letterhead with stamp.' }
    ],
    'chile': [
      { type: 'Bank Account Statement', minimum_balance_or_amount: '₹2,00,000 – ₹3,00,000', time_frame: 'Past 3 to 6 months', notes: 'Stamped statements demonstrating solvency.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Last 3 months', time_frame: 'Past 3 months', notes: 'Signed by company HR/Finance.' }
    ],
    'mexico': [
      { type: 'Bank Account Statements', minimum_balance_or_amount: 'Monthly balance approx. ₹1,50,000 – ₹2,50,000', time_frame: 'Past 3 to 6 months', notes: 'Stamped bank statements.' },
      { type: 'Salary Slips', minimum_balance_or_amount: 'Last 3 months', time_frame: 'Past 3 months', notes: 'Showing minimum net monthly income.' }
    ],
    'ukraine': [
      { type: 'Bank Account Statement', minimum_balance_or_amount: '$1,500 – $2,500 equivalent', time_frame: 'Past 3 months', notes: 'Statement demonstrating sufficient funds for stay.' }
    ]

  };
  
  const defaultProofs: FinancialProofItem[] = [
    { type: 'Bank Statements', minimum_balance_or_amount: 'Sufficient funds covering itinerary and living costs', time_frame: 'Last 3 to 6 months', notes: 'Stamped bank statements showing consistent funds and regular credits.' },
    { type: 'Income Tax Returns (ITR)', minimum_balance_or_amount: 'Form 16 / ITR-V acknowledgements', time_frame: 'Last 2 to 3 years', notes: 'Verifying domestic economic ties and financial solvency.' }
  ];
  
  return map[c] || defaultProofs;
}

// ── 11. TOURISM VALIDITY — COUNTRY SPECIFIC ──
export function getTourismValidity(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.validity) return TOURISM_DESTS[c].validity;
  const map: Record<string, string> = {
    'thailand': '60 Days on Arrival (Extendable by 30 Days)',
    'malaysia': '30 Days on Arrival',
    'mauritius': '60–90 Days on Arrival',
    'maldives': '30 Days on Arrival (Extendable to 90 Days)',
    'jamaica': 'Entry Stamp Granted on Arrival (30 Days)',
    'nepal': 'Unrestricted / Freedom of Movement',
    'bhutan': 'Up to 14 Days on Arrival (Extendable)',
    'seychelles': '30 Days on Arrival (Extendable to 90 Days)',
    'uae': '60 Days from electronic issuance (30 or 60 day stay)',
    'singapore': 'Up to 2 Years Multiple Entry (30 Days per visit)',
    'turkey': '180 Days (Entry Window)',
    'jordan': '30 Days from Date of Entry (Extendable up to 3 Months)',
    'egypt': '90 Days to Enter from Date of Issue',
    'kenya': '90 Days from Date of Approval',
    'tanzania': '90 Days from Date of Issue',
    'france': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'germany': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'italy': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'spain': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'greece': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'netherlands': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'switzerland': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'portugal': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'austria': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'belgium': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'denmark': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'sweden': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'norway': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'finland': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'australia': 'Up to 12 Months (Single or Multiple Entry)',
    'uk': '6 Months (Standard Multiple Entry)',
    'usa': 'Up to 10 Years (120 Months) Multiple Entry',
    'canada': 'Up to 10 Years Multiple Entry',
    'japan': '3 Months from Date of Issue',
    'south-korea': '3 Months from Date of Issue',
    'vietnam': '30 or 90 Days',
    'indonesia': '90 Days to Enter from Issuance',
    'cambodia': '3 Months (90 Days) from Date of Issue',
    'sri-lanka': '180 Days from Date of Approval',
    'philippines': '3 Months from Date of Issue',
    'qatar': '30 Days on Arrival (Extendable by 30 Days)',
    'saudi-arabia': '1 Year Multiple Entry from Issuance',
    'oman': '30 Days to Enter from Issuance',
    'bahrain': '30 Days to 3 Months from Issuance',
    'new-zealand': 'Up to 12 Months (Single or Multiple Entry)',
    'south-africa': '3 Months from Date of Issue',
    'brazil': 'Up to 90 Days'
  ,

    'czech-republic': 'Up to 90 Days (Schengen Uniform Visa)',
    'poland': 'Up to 90 Days (Schengen Uniform Visa)',
    'hungary': 'Up to 90 Days (Schengen Uniform Visa)',
    'croatia': 'Up to 90 Days (Schengen Uniform Visa)',
    'slovakia': 'Up to 90 Days (Schengen Uniform Visa)',
    'slovenia': 'Up to 90 Days (Schengen Uniform Visa)',
    'estonia': 'Up to 90 Days (Schengen Uniform Visa)',
    'latvia': 'Up to 90 Days (Schengen Uniform Visa)',
    'lithuania': 'Up to 90 Days (Schengen Uniform Visa)',
    'luxembourg': 'Up to 90 Days (Schengen Uniform Visa)',
    'malta': 'Up to 90 Days (Schengen Uniform Visa)',
    'iceland': 'Up to 90 Days (Schengen Uniform Visa)',
    'liechtenstein': 'Up to 90 Days (Schengen Uniform Visa)',
    'bulgaria': 'Up to 90 Days within 180 Days',
    'cyprus': 'Up to 90 Days within 180 Days',
    'romania': 'Up to 90 Days within 180 Days',
    'israel': 'Up to 3 Months (Single or Multiple Entry)',
    'chile': 'Up to 90 Days Single or Multiple Entry',
    'mexico': 'Up to 180 Days Multiple Entry',
    'ukraine': 'Up to 30 Days Single or Double Entry'

  };
  
  return map[c] || '30 to 90 Days (Subject to Consular Grant)';
}

// ── 12. TOURISM STAY DURATION — COUNTRY SPECIFIC ──
export function getTourismStayDuration(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.stay_duration) return TOURISM_DESTS[c].stay_duration;
  const map: Record<string, string> = {
    'thailand': 'Up to 60 Days (Extendable by 30 Days)',
    'malaysia': 'Up to 30 Days',
    'mauritius': 'Up to 60 Days (Extendable to 90 Days)',
    'maldives': 'Up to 30 Days (Extendable to 90 Days)',
    'jamaica': 'Up to 30 Days per Entry (Extendable via PICA)',
    'nepal': 'Unlimited / Unrestricted Stay for Indian Citizens',
    'bhutan': 'Up to 14 Days (Extendable)',
    'seychelles': 'Up to 30 Days (Extendable to 90 Days)',
    'uae': 'Up to 30 Days or 60 Days (depending on selected e-Visa tier)',
    'singapore': 'Up to 30 Days Per Visit',
    'turkey': 'Up to 30 Days Single Entry',
    'jordan': '30 Days upon Entry (Extendable up to 3 Months)',
    'egypt': 'Up to 30 Days Per Entry',
    'kenya': 'Up to 90 Days Per Entry',
    'tanzania': 'Up to 90 Days',
    'france': 'Up to 90 days within any 180-day rolling period',
    'germany': 'Up to 90 days within any 180-day rolling period',
    'italy': 'Up to 90 days within any 180-day rolling period',
    'spain': 'Up to 90 days within any 180-day rolling period',
    'greece': 'Up to 90 days within any 180-day rolling period',
    'netherlands': 'Up to 90 days within any 180-day rolling period',
    'switzerland': 'Up to 90 days within any 180-day rolling period',
    'portugal': 'Up to 90 days within any 180-day rolling period',
    'austria': 'Up to 90 days within any 180-day rolling period',
    'belgium': 'Up to 90 days within any 180-day rolling period',
    'denmark': 'Up to 90 days within any 180-day rolling period',
    'sweden': 'Up to 90 days within any 180-day rolling period',
    'norway': 'Up to 90 days within any 180-day rolling period',
    'finland': 'Up to 90 days within any 180-day rolling period',
    'australia': 'Up to 3, 6, or 12 Months per stay (as stipulated in Grant Notice)',
    'uk': 'Up to 6 Months (180 Days) per Visit',
    'usa': 'Up to 6 Months (180 Days) per entry (determined by CBP on Form I-94)',
    'canada': 'Up to 180 Days (6 Months) per Visit',
    'japan': 'Up to 15, 30, or 90 Days',
    'south-korea': 'Up to 90 Days',
    'vietnam': 'Up to 30 or 90 Days',
    'indonesia': '30 Days (Extendable by 30 Days)',
    'cambodia': 'Up to 30 Days Single Entry',
    'sri-lanka': '30 Days (Double Entry, Extendable to 180 Days)',
    'philippines': 'Up to 30 Days Per Entry',
    'qatar': 'Up to 30 Days (Extendable to 60 Days)',
    'saudi-arabia': 'Up to 90 Days Per Visit',
    'oman': 'Up to 30 Days Per Visit',
    'bahrain': '14 to 30 Days Per Entry',
    'new-zealand': 'Up to 3, 6, or 9 Months per stay',
    'south-africa': 'Up to 90 Days',
    'brazil': 'Up to 90 Days'
  ,

    'czech-republic': 'Maximum 90 Days per 180-day period',
    'poland': 'Maximum 90 Days per 180-day period',
    'hungary': 'Maximum 90 Days per 180-day period',
    'croatia': 'Maximum 90 Days per 180-day period',
    'slovakia': 'Maximum 90 Days per 180-day period',
    'slovenia': 'Maximum 90 Days per 180-day period',
    'estonia': 'Maximum 90 Days per 180-day period',
    'latvia': 'Maximum 90 Days per 180-day period',
    'lithuania': 'Maximum 90 Days per 180-day period',
    'luxembourg': 'Maximum 90 Days per 180-day period',
    'malta': 'Maximum 90 Days per 180-day period',
    'iceland': 'Maximum 90 Days per 180-day period',
    'liechtenstein': 'Maximum 90 Days per 180-day period',
    'bulgaria': 'Up to 90 Days per 180-day period',
    'cyprus': 'Up to 90 Days per 180-day period',
    'romania': 'Up to 90 Days per 180-day period',
    'israel': 'Up to 90 Days per entry',
    'chile': 'Up to 90 Days per entry',
    'mexico': 'Up to 180 Days per entry',
    'ukraine': 'Up to 30 Days'

  };
  
  return map[c] || 'Up to 30 Days (Extendable)';
}

// ── 13. TOURISM ENTRY TYPE — COUNTRY SPECIFIC ──
export function getTourismEntryType(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.entry_type) return TOURISM_DESTS[c].entry_type;
  const map: Record<string, string> = {
    'thailand': 'Single Entry (Visa-Free)',
    'malaysia': 'Single Entry (Visa-Free)',
    'mauritius': 'Single / Multiple Entry (Visa-Free)',
    'maldives': 'Single Entry (Visa-Free)',
    'jamaica': 'Multiple Entry (Subject to Each Departure)',
    'nepal': 'Multiple Entry (Freedom of Movement)',
    'bhutan': 'Single / Multiple Entry',
    'seychelles': 'Single Entry (Visa-Free)',
    'uae': 'Single / Multiple Entry (based on permit tier)',
    'singapore': 'Multiple Entry (e-Visa)',
    'turkey': 'Single Entry',
    'jordan': 'Single Entry',
    'egypt': 'Single / Multiple Entry',
    'kenya': 'Single Entry',
    'tanzania': 'Single Entry',
    'france': 'Short Stay (Single / Multiple Entry)',
    'germany': 'Short Stay (Single / Multiple Entry)',
    'italy': 'Short Stay (Single / Multiple Entry)',
    'spain': 'Short Stay (Single / Multiple Entry)',
    'greece': 'Short Stay (Single / Multiple Entry)',
    'netherlands': 'Short Stay (Single / Multiple Entry)',
    'switzerland': 'Short Stay (Single / Multiple Entry)',
    'portugal': 'Short Stay (Single / Multiple Entry)',
    'austria': 'Short Stay (Single / Multiple Entry)',
    'belgium': 'Short Stay (Single / Multiple Entry)',
    'denmark': 'Short Stay (Single / Multiple Entry)',
    'sweden': 'Short Stay (Single / Multiple Entry)',
    'norway': 'Short Stay (Single / Multiple Entry)',
    'finland': 'Short Stay (Single / Multiple Entry)',
    'australia': 'Single or Multiple Entry',
    'uk': 'Multiple Entry',
    'usa': 'Multiple Entry (10-Year)',
    'canada': 'Multiple Entry (10-Year)',
    'japan': 'Single Entry',
    'south-korea': 'Single / Multiple Entry',
    'vietnam': 'Single / Multiple Entry',
    'indonesia': 'Single Entry',
    'cambodia': 'Single Entry',
    'sri-lanka': 'Double Entry',
    'philippines': 'Single / Multiple Entry',
    'qatar': 'Single / Multiple Entry',
    'saudi-arabia': 'Multiple Entry',
    'oman': 'Single / Multiple Entry',
    'bahrain': 'Multiple Entry',
    'new-zealand': 'Single or Multiple Entry',
    'south-africa': 'Single / Multiple Entry',
    'brazil': 'Single / Multiple Entry'
  ,

    'czech-republic': 'Single, Double, or Multiple Entry (Consular Discretion)',
    'poland': 'Single, Double, or Multiple Entry',
    'hungary': 'Single, Double, or Multiple Entry',
    'croatia': 'Single, Double, or Multiple Entry',
    'slovakia': 'Single, Double, or Multiple Entry',
    'slovenia': 'Single, Double, or Multiple Entry',
    'estonia': 'Single, Double, or Multiple Entry',
    'latvia': 'Single, Double, or Multiple Entry',
    'lithuania': 'Single, Double, or Multiple Entry',
    'luxembourg': 'Single, Double, or Multiple Entry',
    'malta': 'Single, Double, or Multiple Entry',
    'iceland': 'Single, Double, or Multiple Entry',
    'liechtenstein': 'Single, Double, or Multiple Entry',
    'bulgaria': 'Single, Double, or Multiple Entry',
    'cyprus': 'Single or Multiple Entry',
    'romania': 'Single or Multiple Entry',
    'israel': 'Single or Multiple Entry',
    'chile': 'Single or Multiple Entry',
    'mexico': 'Multiple Entry',
    'ukraine': 'Single or Double Entry'

  };
  
  return map[c] || 'Single / Multiple Entry';
}

// ── 14. OFFICIAL SOURCE NAME HELPER ──
export function getTourismOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  if (TOURISM_DESTS[c]?.official_source) return TOURISM_DESTS[c].official_source;
  const map: Record<string, string> = {
    'thailand': 'Royal Thai Immigration Bureau & Ministry of Foreign Affairs',
    'malaysia': 'Immigration Department of Malaysia (Jabatan Imigresen Malaysia)',
    'mauritius': 'Passport and Immigration Office, Prime Minister\'s Office (Mauritius)',
    'maldives': 'Maldives Immigration & Ministry of Homeland Security',
    'jamaica': 'Passport, Immigration & Citizenship Agency (PICA) Jamaica',
    'nepal': 'Department of Immigration, Ministry of Home Affairs (Nepal)',
    'bhutan': 'Department of Immigration & Department of Tourism, Royal Government of Bhutan',
    'seychelles': 'Seychelles Department of Immigration & Civil Status',
    'uae': 'Federal Authority for Identity, Citizenship, Customs & Port Security (ICP) / GDRFA Dubai',
    'singapore': 'Immigration & Checkpoints Authority (ICA) Singapore',
    'turkey': 'Ministry of Foreign Affairs of the Republic of Türkiye',
    'jordan': 'Ministry of Interior & Ministry of Tourism and Antiquities (Jordan)',
    'egypt': 'Egyptian Ministry of Interior & Ministry of Foreign Affairs',
    'kenya': 'Directorate of Immigration Services, Ministry of Interior (Kenya)',
    'tanzania': 'Immigration Services Department, Ministry of Home Affairs (Tanzania)',
    'france': 'Ministry of the Interior & France-Visas Consular Portal',
    'germany': 'Federal Foreign Office (Auswärtiges Amt)',
    'italy': 'Ministry of Foreign Affairs and International Cooperation (Farnesina)',
    'spain': 'Ministry of Foreign Affairs (Spain) / BLS International Spain',
    'greece': 'Ministry of Foreign Affairs (Greece) / GVCW Greece',
    'netherlands': 'Ministry of Foreign Affairs & Immigration and Naturalisation Service (IND)',
    'switzerland': 'State Secretariat for Migration (SEM) & Federal Department of Foreign Affairs',
    'portugal': 'Ministry of Foreign Affairs (MNE) & AIMA (Portugal)',
    'australia': 'Department of Home Affairs (Immigration and Citizenship)',
    'uk': 'UK Visas and Immigration (GOV.UK)',
    'usa': 'U.S. Department of State — Bureau of Consular Affairs',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC)',
    'japan': 'Ministry of Foreign Affairs of Japan (MOFA)',
    'south-korea': 'Ministry of Justice & Korea Immigration Service',
    'vietnam': 'Vietnam Immigration Department, Ministry of Public Security',
    'indonesia': 'Directorate General of Immigration, Ministry of Law and Human Rights (Indonesia)',
    'cambodia': 'Ministry of Foreign Affairs and International Cooperation (Cambodia)',
    'sri-lanka': 'Department of Immigration and Emigration (Sri Lanka)',
    'philippines': 'Department of Foreign Affairs & Bureau of Immigration (Philippines)',
    'qatar': 'Ministry of Interior (MOI) & Qatar Tourism',
    'saudi-arabia': 'Ministry of Foreign Affairs (MOFA) & Saudi Tourism Authority',
    'oman': 'Royal Oman Police — Directorate General of Passport & Residence',
    'bahrain': 'Nationality, Passports and Residence Affairs (NPRA) Bahrain',
    'new-zealand': 'Immigration New Zealand (Ministry of Business, Innovation and Employment)',
    'south-africa': 'Department of Home Affairs, Republic of South Africa',
    'brazil': 'Ministry of Foreign Affairs (Itamaraty) — Consular Portal'
  ,

    'czech-republic': 'Ministry of Foreign Affairs of the Czech Republic / VFS Global',
    'poland': 'Ministry of Foreign Affairs of the Republic of Poland (e-Konsulat) / VFS Global',
    'hungary': 'Consular Services of Hungary / VFS Global',
    'croatia': 'Ministry of Foreign and European Affairs of the Republic of Croatia / VFS Global',
    'slovakia': 'Ministry of Foreign and European Affairs of the Slovak Republic / VFS Global',
    'slovenia': 'Ministry of Foreign Affairs of the Republic of Slovenia / VFS Global',
    'estonia': 'Ministry of Foreign Affairs of the Republic of Estonia / VFS Global',
    'latvia': 'Ministry of Foreign Affairs of the Republic of Latvia / VFS Global',
    'lithuania': 'Ministry of Foreign Affairs of the Republic of Lithuania / VFS Global',
    'luxembourg': 'Ministry of Foreign and European Affairs Luxembourg / VFS Global',
    'malta': 'Central Visa Unit / Identity Malta Agency / VFS Global',
    'iceland': 'Directorate of Immigration Iceland / Embassy of Denmark / VFS Global',
    'liechtenstein': 'Swiss Federal Department of Foreign Affairs / VFS Global Switzerland',
    'bulgaria': 'Ministry of Foreign Affairs of the Republic of Bulgaria / VFS Global',
    'cyprus': 'Ministry of Foreign Affairs of the Republic of Cyprus / High Commission in New Delhi',
    'romania': 'Ministry of Foreign Affairs Romania (eVisa Portal: evisa.mae.ro)',
    'israel': 'Ministry of Foreign Affairs of Israel / Israel Visa Application Centre (I-VAC)',
    'chile': 'Ministry of Foreign Affairs Chile (SAC Ciudadanos Portal: tramites.minrel.gov.cl)',
    'mexico': 'Secretariat of Foreign Affairs Mexico (SRE / MiConsulado) / Embassy of Mexico',
    'ukraine': 'Ministry of Foreign Affairs of Ukraine (MFA e-Visa Portal: evisa.mfa.gov.ua)'

  };

  return map[c] || `${country} Immigration Authority & Consular Affairs`;
}

// ── 15. COMPLETE TOURISM VISA DATA BUILDER ──
export function getTourismVisaData(
  from: string,
  to: string,
  purpose: string = 'Tourism'
): StructuredVisaRequirements {
  const fromNorm = normalizeCountry(from);
  if (fromNorm && fromNorm !== 'india') {
    const pureRoute = resolvePureRouteTourism(from, to);
    if (pureRoute) return pureRoute;
  }

  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getTourismOfficialSourceName(to);
  const procTime = getTourismProcessingTime(to);
  const procDetails = getTourismProcessingDetails(to);
  const val = getTourismValidity(to);
  const stay = getTourismStayDuration(to);
  const entryType = getTourismEntryType(to);
  const fees = getTourismFees(to);
  const faqs = getTourismFAQ(to);
  const highlights = getTourismHighlights(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Tourism / Vacation',
    visa_type: ['mauritius', 'thailand', 'malaysia', 'maldives', 'jamaica', 'nepal', 'bhutan', 'seychelles'].includes(c)
      ? `${countryName} Visa-Free Entry (On-Arrival Permit)`
      : `${countryName} Tourist Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' tourist visa official consular requirements')}`,
    official_source_name: officialSource,

    // ── OVERVIEW ──
    overview: getTourismOverview(to),
    highlights: highlights,

    // ── STEPS ──
    how_to_apply: getTourismSteps(to),

    // ── DOCUMENTS ──
    documents_required: getTourismDocuments(to),

    // ── FEES ──
    costs: fees,

    // ── PROCESSING TIME ──
    processing_time: procTime,
    processing_time_details: procDetails,

    // ── REQUIREMENTS ──
    other_requirements: getTourismRequirements(to),
    financial_proofs: getTourismFinancialProofs(to),

    // ── FAQ ──
    faqs: faqs,

    // ── VALIDITY & STAY ──
    validity: val,
    validity_details: `Standard tourist validity: ${val}`,
    stay_duration: stay,
    stay_duration_details: `Maximum permitted stay per entry: ${stay}`,
    entry_type: entryType,
    entry_type_details: `${entryType} authorization`,

    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },

    processing_and_timing: {
      apply_window: 'Apply 3 to 4 weeks prior to planned travel date.',
      decision_time: procTime,
      max_extension: 'Subject to local immigration bureau approval.',
      center_notes: c === 'spain'
        ? 'BLS International Spain Visa Application Centre (blsspainvisa.com). Spain does NOT use VFS Global.'
        : c === 'greece'
        ? 'GVCW Greece (Global Visa Center World - in-gr.gvcworld.eu). Greece does NOT use VFS Global.'
        : ['thailand', 'malaysia', 'mauritius', 'maldives', 'jamaica', 'nepal', 'bhutan', 'seychelles'].includes(c)
        ? 'Airport Immigration Checkpoint / On-Arrival Clearance. Zero Embassy or VAC appointments required.'
        : ['uae', 'singapore', 'turkey', 'egypt', 'kenya', 'tanzania', 'qatar', 'saudi-arabia', 'oman', 'bahrain'].includes(c)
        ? 'Official Government Electronic Visa Portal. 100% digital application — no physical VAC visit required.'
        : c === 'usa'
        ? 'U.S. Embassy / Consulate & VAC (Visa Application Center) for Biometrics and In-person Consular Interview.'
        : `VFS Global / ${countryName} Embassy/Consulate. Check appointment availability online.`
    }
  };
}

export const getTourismVisaSteps = getTourismSteps;
