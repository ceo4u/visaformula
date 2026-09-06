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
