// src/lib/special-regions-data.ts
/**
 * TravlTik — Microstates, Pacific Islands, Disputed Territories, Special Regions,
 * Dynamic Fees & Regional Freedom of Movement Rules (Schengen, GCC, ASEAN, CARICOM).
 */

export interface SpecialDestinationData {
  overview: string;
  highlights: Array<{ icon: string; title: string; description: string }>;
  documents: Array<{ title: string; description: string; is_mandatory: boolean }>;
  steps: string[];
  fees: { visa_fee: string; service_fee: string; total_fee: string; notes: string };
  processing_time: string;
  proc_time?: string;
  processing_time_details?: string;
  proc_details?: string;
  requirements: Array<{ category: string; details: string }>;
  faqs: Array<{ question: string; answer: string }>;
  validity: string;
  stay_duration: string;
  entry_type: string;
  official_source: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. MICROSTATES, PACIFIC ISLANDS, DISPUTED TERRITORIES & SPECIAL REGIONS DATA
// ═══════════════════════════════════════════════════════════════════════════════
export const SPECIAL_REGIONS_DESTS: Record<string, SpecialDestinationData> = {
  // ── ANDORRA ──
  'andorra': {
    overview: 'Andorra offers visa-free entry for EU/Schengen citizens and visa-on-arrival for most other passport holders. Andorra is not a Schengen member but has open borders with France and Spain. Travelers should have a valid Schengen visa for transit.',
    highlights: [
      { icon: '🏔️', title: 'Pyrenees Mountains', description: 'Beautiful mountain scenery and world-class skiing.' },
      { icon: '🛂', title: 'Visa-Free for EU/Schengen', description: 'EU/Schengen citizens enjoy visa-free access.' },
      { icon: '🛍️', title: 'Duty-Free Shopping', description: 'Andorra is famous for duty-free shopping.' },
      { icon: '🌍', title: 'Transit Visa Requirement', description: 'Requires valid Schengen visa for transit through France/Spain.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Valid Schengen Visa (if required)', description: 'Required for transit through France/Spain.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Andorra.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport requires a visa for Andorra.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Apply for Schengen Visa (if required) — Required for transit through France/Spain.',
      'Step 4: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 5: Board Flight — Carry passport, Schengen visa (if required), return ticket, and hotel booking.',
      'Step 6: Clear Immigration — Present documents at Andorran border (open border with France/Spain).'
    ],
    fees: { visa_fee: '€0 (Visa-Free for EU/Schengen) / €30-50 for others', service_fee: '€0 (Online Portal)', total_fee: 'Depends on nationality', notes: 'Andorra is not a Schengen member. Transit through France/Spain requires Schengen visa.' },
    processing_time: 'Instant (Visa-Free) / 5-10 Working Days (Schengen Visa)',
    proc_time: 'Instant (Visa-Free) / 5-10 Working Days (Schengen Visa)',
    proc_details: 'Entry via French or Spanish border checkpoints. Double or multiple-entry Schengen visa required for non-EU travelers.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Visa-Free for EU/Schengen', details: 'EU/Schengen citizens enjoy visa-free access.' },
      { category: 'Schengen Visa for Transit', details: 'Required for transit through France/Spain (Multiple entry recommended).' },
      { category: 'Insurance', details: 'Travel medical insurance recommended.' }
    ],
    faqs: [
      { question: 'Do EU citizens need a visa for Andorra?', answer: 'No, EU/Schengen citizens enjoy visa-free access to Andorra.' },
      { question: 'Is Andorra part of Schengen?', answer: 'No, Andorra is not a Schengen member but has open borders with France and Spain.' },
      { question: 'Do I need a Schengen visa to transit through France/Spain?', answer: 'Yes, you need a valid Schengen visa to transit through France or Spain to reach Andorra.' }
    ],
    validity: '90 Days (Visa-Free)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single Entry',
    official_source: 'Government of Andorra - Ministry of Foreign Affairs'
  },

  // ── MONACO ──
  'monaco': {
    overview: 'Monaco offers visa-free entry for EU/Schengen citizens and visa required for others based on Schengen rules. Monaco is not a Schengen member but has open borders with France. Travelers should have a valid Schengen visa for entry.',
    highlights: [
      { icon: '🏛️', title: 'Monte Carlo', description: 'Famous casino, luxury hotels, and Formula 1 Grand Prix.' },
      { icon: '🛂', title: 'Schengen Visa Required', description: 'Based on Schengen rules for non-EU citizens.' },
      { icon: '🌊', title: 'Mediterranean Coast', description: 'Beautiful coastline and luxury lifestyle.' },
      { icon: '🔄', title: 'Open Border with France', description: 'Entry through France requires Schengen visa.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa (if required)', description: 'Required for non-EU citizens.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Monaco.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay (minimum €30,000 coverage).', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport requires a Schengen visa.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Apply for Schengen Visa (if required) — Required for non-EU citizens through French consulate/VFS.',
      'Step 4: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 5: Board Flight — Carry passport, Schengen visa (if required), return ticket, and hotel booking.',
      'Step 6: Clear Immigration — Present documents at French/Monegasque border.'
    ],
    fees: { visa_fee: '€0 (Visa-Free for EU/Schengen) / €90 for Schengen Visa', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Monaco follows Schengen visa rules administered by France.' },
    processing_time: 'Instant (Visa-Free) / 15 Calendar Days (Schengen Visa)',
    proc_time: 'Instant (Visa-Free) / 15 Calendar Days (Schengen Visa)',
    proc_details: 'Monaco has an open border with France. Non-EU visitors must hold a valid Schengen short-stay visa issued by France.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Schengen Visa Required', details: 'Non-EU citizens require a Schengen visa.' },
      { category: 'Open Border with France', details: 'Entry through France requires Schengen visa.' },
      { category: 'Insurance', details: 'Travel medical insurance covering minimum €30,000 required for Schengen entry.' }
    ],
    faqs: [
      { question: 'Do EU citizens need a visa for Monaco?', answer: 'No, EU/Schengen citizens enjoy visa-free access to Monaco.' },
      { question: 'Is Monaco part of Schengen?', answer: 'No, Monaco is not an official Schengen member but follows Schengen visa rules through a bilateral agreement with France.' },
      { question: 'Do I need a Schengen visa to enter Monaco?', answer: 'Yes, non-EU citizens require a Schengen visa to enter Monaco via France.' }
    ],
    validity: '90 Days (Schengen Visa)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single/Multiple Entry',
    official_source: 'Government of Monaco - Ministry of Foreign Affairs'
  },

  // ── SAN MARINO ──
  'san-marino': {
    overview: 'San Marino offers visa-free entry for EU/Schengen citizens and visa required for others based on Schengen rules. San Marino is completely surrounded by Italy. Travelers should have a valid Schengen visa for entry through Italy.',
    highlights: [
      { icon: '🏛️', title: 'Historic Republic', description: 'One of the world\'s oldest republics with medieval architecture.' },
      { icon: '🛂', title: 'Schengen Visa Required', description: 'Based on Schengen rules for non-EU citizens.' },
      { icon: '🏔️', title: 'Mount Titano', description: 'Beautiful views from the three towers of San Marino.' },
      { icon: '🔄', title: 'Open Border with Italy', description: 'Entry through Italy requires Schengen visa.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa (if required)', description: 'Required for non-EU citizens.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in San Marino.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport requires a Schengen visa.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Apply for Schengen Visa (if required) — Required for non-EU citizens through Italian consulate.',
      'Step 4: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 5: Board Flight — Carry passport, Schengen visa (if required), return ticket, and hotel booking.',
      'Step 6: Clear Immigration — Present documents at Italian/Sammarinese border.'
    ],
    fees: { visa_fee: '€0 (Visa-Free for EU/Schengen) / €90 for Schengen Visa', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'San Marino follows Schengen visa rules through open border with Italy.' },
    processing_time: 'Instant (Visa-Free) / 15 Calendar Days (Schengen Visa)',
    proc_time: 'Instant (Visa-Free) / 15 Calendar Days (Schengen Visa)',
    proc_details: 'Entry via Italy (Rimini/Bologna). Valid Italian or Schengen visa allows unrestricted transit into San Marino.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Schengen Visa Required', details: 'Non-EU citizens require a Schengen visa.' },
      { category: 'Open Border with Italy', details: 'Entry through Italy requires Schengen visa.' },
      { category: 'Insurance', details: 'Travel medical insurance recommended.' }
    ],
    faqs: [
      { question: 'Do EU citizens need a visa for San Marino?', answer: 'No, EU/Schengen citizens enjoy visa-free access to San Marino.' },
      { question: 'Is San Marino part of Schengen?', answer: 'No, San Marino is not an official Schengen member but maintains open borders with Italy.' },
      { question: 'Do I need a Schengen visa to enter San Marino?', answer: 'Yes, non-EU citizens require a Schengen visa to enter San Marino via Italy.' }
    ],
    validity: '90 Days (Schengen Visa)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single/Multiple Entry',
    official_source: 'Government of San Marino - Ministry of Foreign Affairs'
  },

  // ── LIECHTENSTEIN ──
  'liechtenstein': {
    overview: 'Liechtenstein offers visa-free entry for EU/Schengen citizens and visa required for others based on Schengen rules. Liechtenstein is a Schengen member. Travelers should have a valid Schengen visa for entry through Switzerland/Austria.',
    highlights: [
      { icon: '🏔️', title: 'Alpine Scenery', description: 'Beautiful mountains, hiking trails, and castles.' },
      { icon: '🛂', title: 'Schengen Member', description: 'Part of the Schengen zone since 2011.' },
      { icon: '🏰', title: 'Vaduz Castle', description: 'Royal residence and iconic landmark.' },
      { icon: '🔄', title: 'Open Borders with Switzerland/Austria', description: 'Entry requires Schengen visa.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Schengen Visa (if required)', description: 'Required for non-EU citizens.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Liechtenstein.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport requires a Schengen visa.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Apply for Schengen Visa (if required) — Processed via Swiss consular missions worldwide.',
      'Step 4: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 5: Board Flight — Carry passport, Schengen visa (if required), return ticket, and hotel booking.',
      'Step 6: Clear Immigration — Present documents at Swiss/Austrian/Liechtenstein border.'
    ],
    fees: { visa_fee: '€0 (Visa-Free for EU/Schengen) / €90 for Schengen Visa', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Liechtenstein is represented diplomatically by Switzerland.' },
    processing_time: 'Instant (Visa-Free) / 15 Calendar Days (Schengen Visa)',
    proc_time: 'Instant (Visa-Free) / 15 Calendar Days (Schengen Visa)',
    proc_details: 'Liechtenstein is a full member of the Schengen Area. Swiss representations issue visas on behalf of Liechtenstein.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Schengen Visa Required', details: 'Non-EU citizens require a Schengen visa.' },
      { category: 'Schengen Member', details: 'Liechtenstein is part of the Schengen zone.' },
      { category: 'Insurance', details: 'Travel medical insurance recommended.' }
    ],
    faqs: [
      { question: 'Do EU citizens need a visa for Liechtenstein?', answer: 'No, EU/Schengen citizens enjoy visa-free access to Liechtenstein.' },
      { question: 'Is Liechtenstein part of Schengen?', answer: 'Yes, Liechtenstein is a Schengen member since 2011.' },
      { question: 'Do I need a Schengen visa to enter Liechtenstein?', answer: 'Yes, non-EU citizens require a Schengen visa to enter Liechtenstein.' }
    ],
    validity: '90 Days (Schengen Visa)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single/Multiple Entry',
    official_source: 'Government of Liechtenstein - Ministry of Foreign Affairs'
  },

  // ── VATICAN CITY ──
  'vatican-city': {
    overview: 'Vatican City offers visa-free entry for all visitors with a valid passport. Vatican City is completely surrounded by Italy and has open borders with Italy. Travelers can enter freely and then explore the Vatican Museums, St. Peter\'s Basilica, and the Sistine Chapel.',
    highlights: [
      { icon: '🏛️', title: 'St. Peter\'s Basilica', description: 'One of the world\'s largest and most famous churches.' },
      { icon: '🎨', title: 'Sistine Chapel', description: 'Michelangelo\'s famous ceiling and Last Judgment.' },
      { icon: '🛂', title: 'Visa-Free Entry', description: 'Open borders with Italy — no separate visa required.' },
      { icon: '🔄', title: 'Open Border with Italy', description: 'Entry through Italy requires Italian/Schengen visa rules.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for the entire stay.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Rome/Vatican area.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Ensure Passport Validity — Verify your passport is valid for the entire stay.',
      'Step 2: Check Italian/Schengen Visa Requirements — Required for entry into Italy.',
      'Step 3: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 4: Board Flight — Carry passport, return ticket, and hotel booking.',
      'Step 5: Clear Immigration — Present documents at Italian border and walk freely into Vatican City.'
    ],
    fees: { visa_fee: '₹0 (Visa-Free Entry for all visitors)', service_fee: '₹0 (No Appointment Needed)', total_fee: '₹0 (Free Entry)', notes: 'Vatican City has open borders with Italy. Italian/Schengen visa rules apply for entry.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    proc_details: 'No border checks between Rome (Italy) and Vatican City.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for the entire stay.' },
      { category: 'Visa-Free Entry', details: 'All visitors with a valid passport can enter Vatican City.' },
      { category: 'Italian/Schengen Visa', details: 'Required for entry into Italy.' },
      { category: 'Insurance', details: 'Travel medical insurance recommended.' }
    ],
    faqs: [
      { question: 'Do I need a visa to enter Vatican City?', answer: 'No, all visitors with a valid passport can enter Vatican City visa-free.' },
      { question: 'Is Vatican City part of Schengen?', answer: 'No, Vatican City is not a Schengen member but has open borders with Italy.' },
      { question: 'Do I need a Schengen visa to enter Vatican City?', answer: 'Yes, you need a Schengen visa to enter Italy, and then you can visit Vatican City freely.' }
    ],
    validity: 'Depends on Italian/Schengen Visa',
    stay_duration: 'Depends on Italian/Schengen Visa',
    entry_type: 'Single/Multiple Entry',
    official_source: 'Vatican City State - Governatorato'
  },

  // ── FIJI ──
  'fiji': {
    overview: 'Fiji offers visa-free entry for many passport holders including USA, UK, Canada, Australia, New Zealand, and most EU countries for up to 4 months. Indian passport holders enjoy visa-free entry for up to 4 months on arrival.',
    highlights: [
      { icon: '🏖️', title: 'Island Paradise', description: 'Beautiful islands with crystal-clear waters and white-sand beaches.' },
      { icon: '✈️', title: 'Visa-Free for Many', description: 'USA, UK, Canada, Australia, NZ, EU, and Indian citizens enjoy visa-free entry.' },
      { icon: '🤿', title: 'Scuba Diving', description: 'World-class diving and snorkeling in the Pacific Ocean.' },
      { icon: '🌺', title: 'Fijian Culture', description: 'Rich culture, friendly locals, and traditional ceremonies.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Fiji.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport qualifies for visa-free entry.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 4: Board Flight — Carry passport, return ticket, and hotel booking.',
      'Step 5: Clear Immigration — Present documents at Nadi International Airport immigration.'
    ],
    fees: { visa_fee: '₹0 (Visa-Free on Arrival)', service_fee: '₹0 (No Advance Application)', total_fee: '₹0 (Free Entry)', notes: 'Eligible passport holders receive a free visitor permit on arrival.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    proc_details: 'Visitor permit stamped into passport upon arrival at Nadi (NAN) or Nausori (SUV) airports.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Visa-Free Access', details: 'Eligible nationalities receive up to 4 months visitor permit on arrival.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' },
      { category: 'Proof of Funds', details: 'Sufficient funds to cover the duration of stay.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Fiji?', answer: 'No, US citizens enjoy visa-free entry for up to 4 months.' },
      { question: 'Do Indian citizens need a visa for Fiji?', answer: 'No! Indian passport holders receive a free tourist visitor permit upon arrival in Fiji for up to 4 months.' },
      { question: 'How long can I stay in Fiji?', answer: 'Up to 4 months visa-free for eligible nationalities.' }
    ],
    validity: '4 Months (Visa-Free)',
    stay_duration: 'Up to 4 Months',
    entry_type: 'Single Entry',
    official_source: 'Fiji Immigration Department'
  },

  // ── SAMOA ──
  'samoa': {
    overview: 'Samoa offers visa-free entry for many passport holders including USA, UK, Canada, Australia, New Zealand, EU countries, and India for up to 90 days with an entry permit issued on arrival.',
    highlights: [
      { icon: '🏖️', title: 'South Pacific Paradise', description: 'Beautiful beaches, volcanic islands, and lush rainforests.' },
      { icon: '✈️', title: 'Entry Permit on Arrival', description: 'Visitors issued free entry permit valid up to 90 days.' },
      { icon: '🌺', title: 'Polynesian Culture', description: 'Rich Samoan culture, traditions, and hospitality.' },
      { icon: '🌊', title: 'Water Activities', description: 'Snorkeling, diving, and stunning coral reefs.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Samoa.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify entry permit guidelines.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 4: Board Flight — Carry passport, return ticket, and hotel booking.',
      'Step 5: Clear Immigration — Present documents at Faleolo International Airport immigration.'
    ],
    fees: { visa_fee: '₹0 (Free Visitor Permit on Arrival)', service_fee: '₹0 (No Portal Fee)', total_fee: '₹0 (Free on Arrival)', notes: 'Free visitor permit issued at port of entry.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    proc_details: 'Clear border control at Faleolo International Airport (APW).',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Visitor Permit', details: 'Granted on arrival for up to 90 days for tourism.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Samoa?', answer: 'No, US citizens receive an entry permit on arrival for up to 90 days.' },
      { question: 'Do Indian citizens need a visa for Samoa?', answer: 'Indian citizens receive a free 60 to 90-day visitor permit on arrival in Samoa.' },
      { question: 'How long can I stay in Samoa?', answer: 'Up to 90 days for eligible nationalities.' }
    ],
    validity: '90 Days (Visa-Free)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single Entry',
    official_source: 'Samoa Ministry of Foreign Affairs'
  },

  // ── TONGA ──
  'tonga': {
    overview: 'Tonga offers visa-free entry or visa-on-arrival for many passport holders including USA, UK, Canada, Australia, New Zealand, EU countries, and India for up to 31 days.',
    highlights: [
      { icon: '🏖️', title: 'South Pacific Paradise', description: 'Beautiful beaches, coral reefs, and untouched islands.' },
      { icon: '✈️', title: 'Visa on Arrival', description: 'Free 31-day tourist visa granted at immigration.' },
      { icon: '🐋', title: 'Whale Watching', description: 'One of the best places in the world to swim with humpback whales.' },
      { icon: '🌺', title: 'Tongan Culture', description: 'Rich Polynesian culture and traditions.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Tonga.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify entry conditions.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 4: Board Flight — Carry passport, return ticket, and hotel booking.',
      'Step 5: Clear Immigration — Present documents at Fuaʻamotu International Airport immigration.'
    ],
    fees: { visa_fee: '₹0 (Free Visa on Arrival / Exemption)', service_fee: '₹0 (No Advance Fee)', total_fee: '₹0 (Free on Arrival)', notes: 'Free 31-day visitor visa issued on arrival.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    proc_details: 'Immigration clearance at Fuaʻamotu International Airport (TBU).',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'On Arrival Stamp', details: 'Free visitor permit granted for up to 31 days.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Tonga?', answer: 'No, US citizens receive a free 31-day visitor visa on arrival.' },
      { question: 'Do Indian citizens need a visa for Tonga?', answer: 'Indian citizens receive a free 31-day tourist visa on arrival in Tonga.' },
      { question: 'How long can I stay in Tonga?', answer: 'Up to 31 days, extendable through the Immigration Department in Nukuʻalofa.' }
    ],
    validity: '31 Days (Visa-Free)',
    stay_duration: 'Up to 31 Days',
    entry_type: 'Single Entry',
    official_source: 'Tonga Ministry of Foreign Affairs'
  },

  // ── VANUATU ──
  'vanuatu': {
    overview: 'Vanuatu offers visa-free entry for many passport holders including USA, UK, Canada, Australia, New Zealand, EU countries, and Indian passport holders for up to 30 days.',
    highlights: [
      { icon: '🏖️', title: 'South Pacific Paradise', description: 'Beautiful islands, active volcanoes, and coral reefs.' },
      { icon: '✈️', title: 'Visa-Free Entry', description: 'Free 30-day tourist entry stamp on arrival.' },
      { icon: '🌋', title: 'Active Volcanoes', description: 'Mount Yasur on Tanna Island is one of the most accessible active volcanoes.' },
      { icon: '🌺', title: 'Ni-Vanuatu Culture', description: 'Rich Melanesian culture and traditions.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Vanuatu.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport qualifies for visa-free entry.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 4: Board Flight — Carry passport, return ticket, and hotel booking.',
      'Step 5: Clear Immigration — Present documents at Bauerfield International Airport immigration.'
    ],
    fees: { visa_fee: '₹0 (Free Visa-Free Entry)', service_fee: '₹0 (No Advance Fee)', total_fee: '₹0 (Free on Arrival)', notes: 'Free 30-day visitor permit granted on arrival.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    proc_details: 'Clear immigration at Bauerfield International Airport (VLI) in Port Vila.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Visa-Free Access', details: 'Granted up to 30 days tourist stay.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Vanuatu?', answer: 'No, US citizens enjoy visa-free entry for up to 30 days.' },
      { question: 'Do Indian citizens need a visa for Vanuatu?', answer: 'No! Indian passport holders enjoy visa-free entry to Vanuatu for up to 30 days.' },
      { question: 'How long can I stay in Vanuatu?', answer: 'Up to 30 days, extendable up to 4 months at the Department of Immigration.' }
    ],
    validity: '30 Days (Visa-Free)',
    stay_duration: 'Up to 30 Days',
    entry_type: 'Single Entry',
    official_source: 'Vanuatu Department of Immigration'
  },

  // ── SOLOMON ISLANDS ──
  'solomon-islands': {
    overview: 'Solomon Islands grants a Visitor Permit on Arrival for up to 90 days for travelers from the EU, Commonwealth, and various partners, and up to 30 days for others.',
    highlights: [
      { icon: '🏝️', title: 'World War II History', description: 'Guadalcanal battlefields and underwater wrecks.' },
      { icon: '🤿', title: 'Pristine Lagoons', description: 'Marovo Lagoon — world\'s largest saltwater lagoon.' },
      { icon: '🛂', title: 'Permit on Arrival', description: 'Issued at Honiara International Airport.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Proof of onward journey.', is_mandatory: true },
      { title: 'Accommodation Details', description: 'Hotel booking or host invitation.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Passport Validity — Must be valid 6+ months.',
      'Step 2: Book Confirmed Travel — Flights into Honiara (HIR).',
      'Step 3: Board Flight — Present passport and onward ticket.',
      'Step 4: Receive Visitor Permit — Stamped at airport immigration.'
    ],
    fees: { visa_fee: 'Free (Visitor Permit on Arrival)', service_fee: '0', total_fee: 'Free', notes: 'Free visitor permit issued upon arrival.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months.' },
      { category: 'Onward Ticket', details: 'Mandatory return or onward flight.' }
    ],
    faqs: [
      { question: 'Can I get a visa on arrival in Solomon Islands?', answer: 'Yes, eligible travelers receive a visitor permit stamped at Honiara Airport.' }
    ],
    validity: '30 to 90 Days',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single Entry',
    official_source: 'Solomon Islands Immigration Division'
  },

  // ── KIRIBATI ──
  'kiribati': {
    overview: 'Kiribati offers visa-free entry for EU, US, UK, Canada, Australia, and New Zealand citizens for up to 90 days. Other passport holders can apply for an entry permit or visa through the Ministry of Foreign Affairs.',
    highlights: [
      { icon: '🌊', title: 'Pacific Equator', description: 'Straddles all four hemispheres in the central Pacific.' },
      { icon: '🎣', title: 'World-Class Fishing', description: 'Kiritimati (Christmas Island) bonefishing.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Return Flight Ticket', description: 'Confirmed return flight.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Verify Visa Exemption — Check nationality rules.',
      'Step 2: Arrange Flights — Via Fiji or Hawaii to Tarawa or Kiritimati.',
      'Step 3: Clear Immigration — Receive entry stamp.'
    ],
    fees: { visa_fee: 'Free for visa-exempt / $40 AUD for visa', service_fee: '0', total_fee: 'Varies by nationality', notes: 'Visa-free for eligible nationalities.' },
    processing_time: 'Instant on Arrival / 10 Business Days',
    proc_time: 'Instant on Arrival / 10 Business Days',
    requirements: [
      { category: 'Passport Validity', details: 'Valid 6+ months.' }
    ],
    faqs: [
      { question: 'Do US and EU citizens need a visa for Kiribati?', answer: 'No, US and EU passport holders can visit Kiribati visa-free for up to 90 days.' }
    ],
    validity: '30 to 90 Days',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single Entry',
    official_source: 'Kiribati Ministry of Foreign Affairs & Immigration'
  },

  // ── TUVALU ──
  'tuvalu': {
    overview: 'Tuvalu grants a free 1-month tourist visa on arrival to all international visitors holding a valid passport, return ticket, and sufficient funds.',
    highlights: [
      { icon: '🏝️', title: 'Funafuti Atoll', description: 'Crystal-clear lagoon and remote Pacific isolation.' },
      { icon: '🛂', title: 'Universal Visa on Arrival', description: 'Free 1-month visa stamped at Funafuti International Airport.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Return Air Ticket', description: 'Flight booking departing Tuvalu within 30 days.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Flights — Fly via Fiji Airways from Suva to Funafuti (FUN).',
      'Step 2: Board Flight — Present passport and confirmed return ticket.',
      'Step 3: Receive 30-Day Stamp — Stamped at airport immigration.'
    ],
    fees: { visa_fee: 'Free on Arrival (₹0)', service_fee: '0', total_fee: 'Free', notes: 'Free 1-month visitor permit issued at border.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid 6+ months.' },
      { category: 'Return Ticket', details: 'Mandatory return ticket (flights run twice weekly).' }
    ],
    faqs: [
      { question: 'Do I need a visa before traveling to Tuvalu?', answer: 'No, all nationalities receive a free 1-month visa on arrival at Funafuti Airport.' }
    ],
    validity: '30 Days',
    stay_duration: 'Up to 30 Days',
    entry_type: 'Single Entry',
    official_source: 'Tuvalu Department of Immigration'
  },

  // ── PALAU ──
  'palau': {
    overview: 'Palau grants a free 30-day Visa on Arrival to all nationalities. Visitors sign the historic "Palau Pledge" stamped into their passport to protect the island ecology.',
    highlights: [
      { icon: '🪸', title: 'Rock Islands Southern Lagoon', description: 'UNESCO World Heritage marine sanctuary.' },
      { icon: '📜', title: 'Palau Pledge', description: 'Eco-pledge stamped into passport upon arrival.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Return Flight Ticket', description: 'Confirmed return ticket.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Ensure Passport Validity — Valid for 6+ months.',
      'Step 2: Book Flights — Fly to Roman Tmetuchl International Airport (ROR).',
      'Step 3: Sign Palau Pledge — Complete passport pledge at border control.'
    ],
    fees: { visa_fee: 'Free Visa on Arrival ($0)', service_fee: '$100 Pristine Paradise Environmental Fee (PPEF included in airline ticket)', total_fee: 'Free Visa Entry', notes: 'Visitor visa is free on arrival.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Palau Pledge', details: 'Mandatory signature in passport pledging ecological preservation.' },
      { category: 'Passport Validity', details: 'Valid at least 6 months.' }
    ],
    faqs: [
      { question: 'Is visa on arrival free in Palau?', answer: 'Yes! All nationalities receive a free 30-day tourist visa on arrival.' }
    ],
    validity: '30 Days',
    stay_duration: 'Up to 30 Days',
    entry_type: 'Single Entry',
    official_source: 'Republic of Palau Bureau of Immigration'
  },

  // ── MARSHALL ISLANDS ──
  'marshall-islands': {
    overview: 'The Marshall Islands offers visa-free entry for US, EU, and Pacific Island citizens, and a free 30-day Visa on Arrival for citizens of many other countries.',
    highlights: [
      { icon: '🏝️', title: 'Majuro & Kwajalein', description: 'Pacific atolls and diving lagoons.' },
      { icon: '🛂', title: 'Compact of Free Association', description: 'Unrestricted freedom of movement with the USA.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Return Flight Ticket', description: 'Round-trip air reservation.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Confirm Passport Eligibility — US citizens enter freely under COFA.',
      'Step 2: Board Island Hopper Flight — Via United Airlines from Honolulu or Guam.',
      'Step 3: Clear Border Control — Receive entry permit.'
    ],
    fees: { visa_fee: 'Free for US/EU / $25-50 USD for others', service_fee: '0', total_fee: 'Free on Arrival for eligible', notes: 'Visa on arrival granted at Amata Kabua International Airport.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for the Marshall Islands?', answer: 'No, US citizens can enter, live, and work freely under the Compact of Free Association.' }
    ],
    validity: '30 to 90 Days',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single Entry',
    official_source: 'Republic of the Marshall Islands Immigration'
  },

  // ── MICRONESIA (Federated States of Micronesia) ──
  'micronesia': {
    overview: 'The Federated States of Micronesia (Yap, Chuuk, Pohnpei, Kosrae) offers visa-free entry to all visitors holding a valid passport and return ticket for stays of 30 days (up to 365 days for US citizens under COFA).',
    highlights: [
      { icon: '🏛️', title: 'Nan Madol', description: 'Ancient megalithic ruined city on Pohnpei.' },
      { icon: '🤿', title: 'Chuuk Lagoon', description: 'World\'s greatest wreck diving destination.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 120 days beyond intended stay.', is_mandatory: true },
      { title: 'Return Flight Ticket', description: 'Confirmed return booking.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Fly to Micronesia — Flights via United Island Hopper.',
      'Step 2: Complete Entry Form — Fill out arrival declaration.',
      'Step 3: Receive Entry Stamp — Stamped for 30 days.'
    ],
    fees: { visa_fee: 'Free Entry ($0)', service_fee: '0', total_fee: 'Free', notes: 'No visa fee required for entry.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Must be valid for at least 120 days beyond departure.' }
    ],
    faqs: [
      { question: 'Do I need a visa to visit Micronesia?', answer: 'No, all visitors receive visa-free entry for up to 30 days upon arrival.' }
    ],
    validity: '30 Days (Extendable)',
    stay_duration: 'Up to 30 Days (365 Days for US citizens)',
    entry_type: 'Single Entry',
    official_source: 'FSM Division of Immigration'
  },

  // ── NAURU ──
  'nauru': {
    overview: 'Nauru offers visa-on-arrival or pre-arranged visa depending on nationality. Visas are processed through Nauru Immigration via email before travel.',
    highlights: [
      { icon: '🏝️', title: 'World\'s Smallest Island Nation', description: 'Unique Pacific island exploration.' },
      { icon: '✈️', title: 'Nauru Airlines', description: 'Flights connecting Brisbane, Fiji, and Kiribati.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Confirmed Flight Ticket', description: 'Nauru Airlines booking.', is_mandatory: true },
      { title: 'Hotel Booking', description: 'Confirmed accommodation in Nauru.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Contact Nauru Immigration — Email visa application form before booking.',
      'Step 2: Receive Entry Certificate — Visa clearance confirmation issued.',
      'Step 3: Fly to Nauru — Present clearance at Nauru International Airport (INU).'
    ],
    fees: { visa_fee: '$50 - $100 AUD', service_fee: '0', total_fee: '$50 - $100 AUD', notes: 'Payable to Nauru Immigration.' },
    processing_time: '3 to 7 Business Days',
    proc_time: '3 to 7 Business Days',
    requirements: [
      { category: 'Passport Validity', details: 'Valid 6+ months.' }
    ],
    faqs: [
      { question: 'How do I apply for a Nauru visa?', answer: 'Submit your application and hotel booking directly to the Department of Immigration by email prior to travel.' }
    ],
    validity: '30 Days',
    stay_duration: 'Up to 30 Days',
    entry_type: 'Single Entry',
    official_source: 'Republic of Nauru Department of Justice and Border Control'
  },

  // ── TAIWAN ──
  'taiwan': {
    overview: 'Taiwan offers visa-free entry for many passport holders including USA, UK, Canada, Australia, New Zealand, and most EU countries for up to 90 days. Indian passport holders holding a valid US, UK, Schengen, Japan, or Canada visa can apply for a free online Travel Authorization Certificate (ROC TAC); otherwise a consular visa or eVisa is required.',
    highlights: [
      { icon: '🏙️', title: 'Taipei 101', description: 'One of the world\'s tallest buildings with stunning views.' },
      { icon: '🏛️', title: 'Night Markets', description: 'Famous night markets with delicious street food.' },
      { icon: '🌳', title: 'Taroko Gorge', description: 'Stunning marble canyon and hiking trails.' },
      { icon: '🛂', title: 'Visa-Free for Many', description: 'USA, UK, Canada, Australia, NZ, EU citizens enjoy visa-free entry.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Taiwan.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Verify if your passport qualifies for visa-free access or ROC TAC certificate.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Apply for eVisa / ROC TAC (if applicable) — Free online certificate for holders of major visas.',
      'Step 4: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 5: Board Flight — Carry passport, certificate/visa, return ticket, and hotel booking.',
      'Step 6: Clear Immigration — Present documents at Taoyuan International Airport immigration.'
    ],
    fees: { visa_fee: '₹0 (Visa-Free / ROC TAC) / NT$1,600 (eVisa approx. ₹4,200)', service_fee: '₹0 (Online Portal)', total_fee: 'Depends on nationality', notes: 'USA, UK, Canada, Australia, NZ, EU citizens enjoy visa-free entry for up to 90 days. Indian passport holders qualify for free ROC TAC with valid US/UK/Schengen visa.' },
    processing_time: 'Instant on Arrival (Visa-Free) / Instant (ROC TAC) / 3-5 Business Days (eVisa)',
    proc_time: 'Instant on Arrival (Visa-Free) / 3-5 Business Days (eVisa)',
    proc_details: 'Digital clearance or entry stamp at Taoyuan (TPE) or Kaohsiung (KHH) airports.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Visa-Free for Many', details: 'USA, UK, Canada, Australia, NZ, EU citizens enjoy visa-free entry.' },
      { category: 'ROC TAC for Indians', details: 'Free 14-day entry certificate online if holding valid US, UK, Schengen, Japan, Canada, NZ, or Australia visa.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Taiwan?', answer: 'No, US citizens enjoy visa-free entry for up to 90 days.' },
      { question: 'Can Indian citizens travel to Taiwan without an embassy visa?', answer: 'Yes! If you hold a valid visa or permanent residency for the US, UK, Schengen, Canada, Japan, Australia, or New Zealand, you can apply for a FREE online Travel Authorization Certificate (ROC TAC) for a 14-day visit.' },
      { question: 'How long can I stay in Taiwan?', answer: 'Up to 90 days visa-free for eligible Western nationalities; 14 days under ROC TAC.' }
    ],
    validity: '90 Days (Visa-Free) / 90 Days (ROC TAC)',
    stay_duration: 'Up to 90 Days (Visa-Free) / 14 Days (ROC TAC)',
    entry_type: 'Single / Multiple Entry',
    official_source: 'Taiwan Ministry of Foreign Affairs (MOFA) & National Immigration Agency'
  },

  // ── PALESTINE ──
  'palestine': {
    overview: 'Palestine (West Bank and Gaza Strip) has visa-free entry for many passport holders. Entry is controlled by Israeli border authorities or Jordan border crossings. Travelers must comply with Israeli immigration requirements to enter the West Bank.',
    highlights: [
      { icon: '🏛️', title: 'Jerusalem & Old City', description: 'Historic sites of immense cultural and religious significance.' },
      { icon: '🏛️', title: 'Bethlehem', description: 'Birthplace of Jesus and the Church of the Nativity.' },
      { icon: '🏛️', title: 'Ramallah & Hebron', description: 'Vibrant Palestinian cultural centers and historic markets.' },
      { icon: '🛂', title: 'Entry via Israel / Jordan', description: 'Border control administered at Ben Gurion Airport or Allenby/King Hussein Bridge.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Palestine/West Bank.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — Entry is governed by Israeli immigration (visa-free for US, UK, EU; ETA-IL required from 2025).',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Enter via Israel or Jordan — Arrive at Ben Gurion Airport (Tel Aviv) or King Hussein Bridge (Jordan).',
      'Step 4: Receive Entry Card — Collect blue electronic entry card (replaces passport stamp).',
      'Step 5: Travel to West Bank — Cross internal checkpoints (e.g. Checkpoint 300 to Bethlehem) with your passport and entry card.'
    ],
    fees: { visa_fee: 'Free Entry Card (Israel ETA-IL: 25 ILS from 2025)', service_fee: '0', total_fee: 'Depends on entry point', notes: 'No separate Palestinian visa fee. Governed by Israeli border clearance.' },
    processing_time: 'Instant on Arrival (Border Control)',
    proc_time: 'Instant on Arrival (Border Control)',
    proc_details: 'Electronic entry card (B2 visitor status) issued upon arrival in Israel / border crossing.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Entry through Israel/Jordan', details: 'Entry to Palestine is through Israeli-controlled ports or King Hussein Bridge.' },
      { category: 'Security Awareness', details: 'Travelers should check travel advisories and maintain copies of passport and entry card.' }
    ],
    faqs: [
      { question: 'Do I need a separate visa for Palestine?', answer: 'No separate visa is issued by Palestinian authorities. Entry is controlled by Israeli border authorities.' },
      { question: 'Can I visit Bethlehem from Jerusalem?', answer: 'Yes! Bethlehem is located just a short distance from Jerusalem and can be visited via regular public transit or tour buses with your passport.' },
      { question: 'Does Israel stamp your passport when visiting Palestine?', answer: 'No, Israel issues a loose blue paper entry slip (Border Card) instead of stamping your passport, avoiding travel complications with other countries.' }
    ],
    validity: 'Up to 90 Days (B2 Visitor Slip)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single/Multiple Entry',
    official_source: 'Palestinian Ministry of Tourism and Antiquities & Border Authorities'
  },

  // ── KOSOVO ──
  'kosovo': {
    overview: 'Kosovo offers visa-free entry for up to 90 days for citizens of the EU, USA, UK, Canada, Australia, New Zealand, and holders of valid multiple-entry Schengen visas. Other nationalities require an entry visa.',
    highlights: [
      { icon: '🏛️', title: 'Pristina & Prizren', description: 'Ottoman architecture, vibrant café culture, and medieval mosques.' },
      { icon: '🏔️', title: 'Rugova Canyon', description: 'Spectacular mountain scenery and hiking in the Accursed Mountains.' },
      { icon: '🛂', title: 'Schengen Visa Exemption', description: 'Holders of valid Schengen multiple-entry visas enter visa-free.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond intended departure.', is_mandatory: true },
      { title: 'Valid Schengen Visa (if required)', description: 'Multiple-entry Schengen visa exempts visa requirements.', is_mandatory: false },
      { title: 'Return Flight Ticket', description: 'Confirmed return or onward ticket.', is_mandatory: true },
      { title: 'Hotel Booking', description: 'Proof of accommodation in Kosovo.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Exemption — EU/US/UK or Schengen multiple-entry visa holders enter visa-free.',
      'Step 2: Fly to Pristina — Arrive at Pristina International Airport (PRN).',
      'Step 3: Clear Border Control — Receive 90-day entry stamp.'
    ],
    fees: { visa_fee: '€0 (Visa-Free) / €40 for Consular Visa', service_fee: '0', total_fee: '€0 (Free for eligible)', notes: 'Free entry for visa-exempt travelers and Schengen visa holders.' },
    processing_time: 'Instant on Arrival (Visa-Free) / 10 Business Days',
    proc_time: 'Instant on Arrival (Visa-Free) / 10 Business Days',
    proc_details: 'Entry stamp granted at Pristina Airport or land borders with North Macedonia, Albania, and Montenegro.',
    requirements: [
      { category: 'Passport Validity', details: 'Must be valid for at least 3 months beyond departure.' },
      { category: 'Schengen Privilege', details: 'Valid multi-entry Schengen visa waives consular visa.' }
    ],
    faqs: [
      { question: 'Can I enter Kosovo with a Schengen visa?', answer: 'Yes! Anyone with a valid multiple-entry Schengen visa can enter and stay in Kosovo visa-free for up to 15 days.' }
    ],
    validity: '90 Days (Visa-Free) / 15 Days (Schengen waiver)',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single / Multiple Entry',
    official_source: 'Ministry of Foreign Affairs of the Republic of Kosovo'
  },

  // ── WESTERN SAHARA ──
  'western-sahara': {
    overview: 'Western Sahara is administered de facto by Morocco. Entry requirements strictly follow Morocco visa regulations. Travelers holding passports eligible for Moroccan visa-free entry (or holding a Moroccan eVisa) can visit Western Sahara (including Dakhla and Laayoune) under Moroccan immigration rules.',
    highlights: [
      { icon: '🌊', title: 'Dakhla Lagoon', description: 'World-famous kitesurfing capital and desert lagoon.' },
      { icon: '🏜️', title: 'Sahara Desert Dunes', description: 'Vast sand dunes meeting the Atlantic ocean.' },
      { icon: '🛂', title: 'Morocco Visa Rules Apply', description: 'Same entry rules, eVisa, or visa-free status as Morocco.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Morocco eVisa / Visa (if required)', description: 'Apply via official Access Maroc portal.', is_mandatory: false },
      { title: 'Return Flight Ticket', description: 'Round-trip ticket to Dakhla (VIL) or Hassan I Airport (EUN).', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Morocco Entry Rules — Follow Moroccan visa policy.',
      'Step 2: Obtain Moroccan eVisa (if applicable) — Apply at acces-maroc.ma.',
      'Step 3: Fly to Dakhla / Laayoune — Internal flight from Casablanca or direct international flight.',
      'Step 4: Clear Police / Border Check — Standard Moroccan security check upon arrival.'
    ],
    fees: { visa_fee: 'Free (Visa-Free for US/UK/EU) / MAD 770 (approx. ₹6,200 for Morocco eVisa)', service_fee: '0', total_fee: 'Follows Morocco Fee Schedule', notes: 'Administered under Moroccan consular regulations.' },
    processing_time: 'Instant on Arrival (Visa-Free) / 24-72 Hours (Morocco eVisa)',
    proc_time: 'Instant on Arrival (Visa-Free) / 24-72 Hours (Morocco eVisa)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for 6+ months.' },
      { category: 'Moroccan Regulations', details: 'Entry administered under Moroccan territorial sovereignty.' }
    ],
    faqs: [
      { question: 'Do I need a special permit to visit Dakhla in Western Sahara?', answer: 'No special permit is needed beyond a standard entry into Morocco. If you are eligible to enter Morocco visa-free or hold a Moroccan eVisa, you can travel freely to Dakhla.' }
    ],
    validity: '90 Days',
    stay_duration: 'Up to 90 Days',
    entry_type: 'Single / Multiple Entry',
    official_source: 'Kingdom of Morocco - Ministry of Foreign Affairs & Directorate General of National Security'
  },

  // ── HONG KONG ──
  'hong-kong': {
    overview: 'Hong Kong offers visa-free entry for many passport holders including USA, UK, Canada, Australia, New Zealand, and most EU countries for up to 90 days (180 days for UK citizens). Indian passport holders enjoy 14-day visa-free entry by completing a free online Pre-arrival Registration (PAR) in minutes before boarding.',
    highlights: [
      { icon: '🏙️', title: 'Victoria Harbour', description: 'Iconic skyline and nightly Symphony of Lights show.' },
      { icon: '🛍️', title: 'Shopping Paradise', description: 'World-class luxury shopping and bustling Temple Street Night Market.' },
      { icon: '🏛️', title: 'Cultural Heritage', description: 'Tian Tan Big Buddha, Po Lin Monastery, and Man Mo Temple.' },
      { icon: '🛂', title: 'Fast Online PAR for Indians', description: 'Indian citizens enter visa-free for 14 days with instant online registration.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Pre-arrival Registration (PAR) Slip', description: 'Mandatory printout of approved PAR slip for Indian passport holders.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Hong Kong.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Exemption — USA, UK, EU citizens enter visa-free. Indian citizens complete online PAR.',
      'Step 2: Complete Online PAR (for Indians) — Fill out 5-minute online form on official Hong Kong Immigration portal (gov.hk).',
      'Step 3: Print Approved PAR Notification Slip — Must print in standard A4 size.',
      'Step 4: Book Flights & Accommodation — Secure confirmed bookings.',
      'Step 5: Board Flight — Present passport, return ticket, and printed PAR slip at airline check-in.',
      'Step 6: Clear Immigration — Receive electronic landing slip at Hong Kong International Airport (HKG).'
    ],
    fees: { visa_fee: '₹0 (Free Pre-arrival Registration / Visa-Free Entry)', service_fee: '₹0 (Official Gov.hk Portal)', total_fee: '₹0 (Free on Arrival)', notes: 'Hong Kong PAR is completely free of charge. No consular fee.' },
    processing_time: 'Instant on Arrival (Visa-Free) / Instant Online (PAR)',
    proc_time: 'Instant on Arrival (Visa-Free) / Instant Online (PAR)',
    proc_details: 'PAR is processed instantaneously online on the GovHK website. Valid for 6 months with multiple 14-day entries.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'PAR Requirement', details: 'Indian citizens must print and present the approved Pre-arrival Registration notification slip.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' },
      { category: 'No Local Employment', details: 'Employment on visitor status is strictly prohibited.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Hong Kong?', answer: 'No, US citizens enjoy visa-free entry for up to 90 days.' },
      { question: 'Do Indian citizens need a visa for Hong Kong?', answer: 'Indian citizens do NOT need a consular visa! You simply complete a free online Pre-arrival Registration (PAR) on gov.hk in 5 minutes, print the slip, and get 14 days visa-free entry.' },
      { question: 'How long can UK citizens stay in Hong Kong visa-free?', answer: 'British citizens enjoy visa-free entry for up to 180 days (6 months).' }
    ],
    validity: '6 Months (PAR Validity) / 90 Days (Visa-Free)',
    stay_duration: '14 Days (Indian PAR) / 90 Days (US/EU) / 180 Days (UK)',
    entry_type: 'Multiple Entry',
    official_source: 'Hong Kong Immigration Department (GovHK)'
  },

  // ── MACAU ──
  'macau': {
    overview: 'Macau offers visa-free entry for many passport holders including USA, UK, Canada, Australia, New Zealand, and most EU countries for up to 90 days. Indian passport holders enjoy 30-day visa-free entry stamped directly upon arrival without prior registration.',
    highlights: [
      { icon: '🏛️', title: 'Historic Centre of Macau', description: 'UNESCO World Heritage site with Ruins of St. Paul\'s and Senado Square.' },
      { icon: '🎰', title: 'Entertainment Capital', description: 'World-renowned integrated resorts and entertainment on the Cotai Strip.' },
      { icon: '🍽️', title: 'Macanese Cuisine', description: 'World\'s first fusion cuisine blending Portuguese and Cantonese flavors.' },
      { icon: '🛂', title: 'Visa-Free Entry', description: '30 days visa-free entry on arrival for Indian citizens; 90 days for US/EU.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket / Ferry Ticket', description: 'Round-trip flight or TurboJet/Cotai Water Jet ferry booking.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Macau.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Valid for the entire stay.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Requirements — USA, EU, and Indian citizens enter visa-free.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Book Travel — Fly to Macau International Airport (MFM) or take TurboJet ferry / HZMB bridge bus from Hong Kong.',
      'Step 4: Clear Immigration — Present passport at border checkpoint and receive printed entry slip.'
    ],
    fees: { visa_fee: '₹0 (Free Visa Exemption on Arrival)', service_fee: '₹0 (No Advance Application)', total_fee: '₹0 (Free Entry)', notes: 'Free visa exemption granted at all Macau border checkpoints.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    proc_details: 'Border control issues an Arrival Card slip at Macau Airport, Taipa Ferry Terminal, or Hong Kong-Zhuhai-Macau Bridge port.',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'Visa-Free Privileges', details: '30 days entry granted to Indian citizens; 90 days to US/EU/UK/Australia.' },
      { category: 'Return Ticket', details: 'Confirmed return flight or ferry ticket required.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for Macau?', answer: 'No, US citizens enjoy visa-free entry for up to 90 days.' },
      { question: 'Do Indian citizens need a visa for Macau?', answer: 'No! Indian passport holders can enter Macau visa-free for up to 30 days without any prior online registration.' },
      { question: 'Can I travel from Hong Kong to Macau easily?', answer: 'Yes, you can take a 55-minute high-speed ferry (TurboJet or Cotai Water Jet) or the Hong Kong-Zhuhai-Macau Bridge shuttle bus.' }
    ],
    validity: '30 to 90 Days',
    stay_duration: 'Up to 30 Days (India) / 90 Days (US/EU/UK)',
    entry_type: 'Single/Multiple Entry',
    official_source: 'Public Security Police Force of Macau - Immigration Department'
  },

  // ── PUERTO RICO ──
  'puerto-rico': {
    overview: 'Puerto Rico is an unincorporated territory of the United States. Entry requirements strictly follow US federal visa rules. Visa-free for US citizens (photo ID only). Travelers from Visa Waiver Program countries require an approved ESTA. Others require a valid US B1/B2 visitor visa.',
    highlights: [
      { icon: '🏖️', title: 'Caribbean Paradise', description: 'Beautiful beaches, bioluminescent bays, and vibrant culture.' },
      { icon: '🛂', title: 'US Territory', description: 'Entry follows US federal immigration and CBP rules.' },
      { icon: '🏛️', title: 'Old San Juan', description: 'Historic colonial architecture, El Morro fortress, and cobblestone streets.' },
      { icon: '🌳', title: 'El Yunque Rainforest', description: 'The only tropical rainforest in the US National Forest System.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages (or US Real ID for US domestic travelers).', is_mandatory: true },
      { title: 'ESTA (for VWP countries)', description: 'Required for Visa Waiver Program passport holders.', is_mandatory: false },
      { title: 'US Visa (if required)', description: 'Valid US B1/B2 Visitor Visa foil.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight reservation.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Proof of stay in Puerto Rico.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check US Visa Requirements — US citizens travel with domestic ID. Non-US citizens need ESTA or US B1/B2 visa.',
      'Step 2: Ensure Passport Validity — Verify 6+ months validity.',
      'Step 3: Apply for ESTA (if eligible) — Complete online application for VWP countries ($21 USD).',
      'Step 4: Apply for US Visa (if required) — Schedule interview via usvisascheduling.com ($185 USD).',
      'Step 5: Book Flights & Accommodation — Secure confirmed bookings to San Juan (SJU).',
      'Step 6: Clear Border Control — Present documents to US Customs and Border Protection (CBP).'
    ],
    fees: { visa_fee: 'ESTA: $21 USD (approx. ₹1,800) / US Visa: $185 USD (approx. ₹15,540)', service_fee: '0 USD (Official CBP/State Dept)', total_fee: 'Depends on nationality ($21 or $185 USD)', notes: 'Puerto Rico follows US federal visa rules. No separate Puerto Rican visa exists.' },
    processing_time: 'ESTA: 72 Hours / US Visa: 3-5 Business Days after interview',
    proc_time: 'ESTA: 72 Hours / US Visa: 3-5 Business Days after interview',
    proc_details: 'U.S. Customs and Border Protection (CBP) enforces immigration at Luis Muñoz Marín International Airport (SJU).',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months with 2 blank pages.' },
      { category: 'US Visa Rules', details: 'Puerto Rico follows identical entry rules as the 50 US States.' },
      { category: 'ESTA for VWP', details: 'Required for Visa Waiver Program countries prior to boarding.' },
      { category: 'Return Ticket', details: 'Confirmed return or onward ticket required.' }
    ],
    faqs: [
      { question: 'Do US citizens need a passport for Puerto Rico?', answer: 'No, US citizens can travel to Puerto Rico with any standard government-issued photo ID (driver\'s license) as it is a domestic flight.' },
      { question: 'Do EU citizens need a visa for Puerto Rico?', answer: 'EU citizens can travel under the US Visa Waiver Program using an approved ESTA ($21 USD).' },
      { question: 'Do Indian citizens need a visa for Puerto Rico?', answer: 'Yes, Indian citizens require a valid US B1/B2 Visitor Visa to visit Puerto Rico.' }
    ],
    validity: 'Depends on ESTA (2 Years) / US Visa (Up to 10 Years)',
    stay_duration: 'Up to 90 Days (ESTA) / Up to 180 Days (US B1/B2 Visa)',
    entry_type: 'Multiple Entry',
    official_source: 'U.S. Department of State & U.S. Customs and Border Protection (CBP)'
  },

  // ── GUAM ──
  'guam': {
    overview: 'Guam is an organized, unincorporated territory of the United States in the western Pacific. It operates under US federal immigration rules with an additional Guam-CNMI Visa Waiver Program allowing visa-free entry for up to 45 days for select Asia-Pacific nationalities (Australia, Japan, South Korea, Taiwan, UK, etc.). Others require an ESTA or US Visa.',
    highlights: [
      { icon: '🏖️', title: 'Tumon Bay', description: 'White sand beaches and luxury duty-free shopping.' },
      { icon: '🌺', title: 'Chamorro Culture', description: 'Rich indigenous Micronesian culture and cuisine.' },
      { icon: '🛂', title: 'Guam-CNMI VWP', description: 'Special 45-day visa-free program for eligible regional passports.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Biometric passport valid for at least 6 months.', is_mandatory: true },
      { title: 'Form I-736 (for Guam-CNMI VWP)', description: 'Electronic Guam-CNMI declaration completed online.', is_mandatory: false },
      { title: 'ESTA or US Visa (if required)', description: 'Standard US entry authorization.', is_mandatory: false },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip air booking.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Entry Program — Determine if eligible for Guam-CNMI VWP, US ESTA, or US Visa.',
      'Step 2: Complete Online Form — Submit Form I-736 online or obtain ESTA.',
      'Step 3: Fly to Antonio B. Won Pat International Airport (GUM).',
      'Step 4: Clear CBP Immigration — Present passport and entry documentation.'
    ],
    fees: { visa_fee: 'Free (Guam-CNMI VWP) / $21 USD (ESTA) / $185 USD (US Visa)', service_fee: '0', total_fee: 'Depends on nationality', notes: 'Guam-CNMI Visa Waiver Program is free of consular charge.' },
    processing_time: 'Instant on Arrival (Guam VWP) / 72 Hours (ESTA)',
    proc_time: 'Instant on Arrival (Guam VWP) / 72 Hours (ESTA)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months.' },
      { category: 'US CBP Jurisdiction', details: 'Enforced by US Customs and Border Protection.' }
    ],
    faqs: [
      { question: 'Do Japanese and Korean citizens need a US visa for Guam?', answer: 'No! Citizens of Japan and South Korea can visit Guam visa-free for up to 45 days under the Guam-CNMI Visa Waiver Program.' }
    ],
    validity: '45 Days (Guam VWP) / 90 Days (ESTA)',
    stay_duration: 'Up to 45 or 90 Days',
    entry_type: 'Single / Multiple Entry',
    official_source: 'U.S. Customs and Border Protection (CBP) - Guam Port of Entry'
  },

  // ── US VIRGIN ISLANDS ──
  'us-virgin-islands': {
    overview: 'The U.S. Virgin Islands (St. Thomas, St. John, St. Croix) is a territory of the United States. US citizens travel with domestic government ID. Foreign visitors require the same documentation as entering the United States: an approved ESTA for Visa Waiver Program countries or a US B1/B2 Visitor Visa.',
    highlights: [
      { icon: '🏖️', title: 'Magens Bay & Trunk Bay', description: 'Consistently ranked among the top 10 beaches in the world.' },
      { icon: '⛵', title: 'Sailing Capital', description: 'Premier yachting and catamaran cruising destination.' },
      { icon: '🛂', title: 'US Territory', description: 'Strictly follows US federal visa and CBP requirements.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for 6+ months (or US domestic ID for US citizens).', is_mandatory: true },
      { title: 'ESTA or US Visa', description: 'Required for non-US passport holders.', is_mandatory: false },
      { title: 'Return Flight Ticket', description: 'Round-trip air booking departing USVI.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Verify US Visa / ESTA Status — Non-US citizens ensure ESTA or US visa is valid.',
      'Step 2: Book Flights — Fly into Cyril E. King Airport (STT) on St. Thomas or Henry E. Rohlsen Airport (STX) on St. Croix.',
      'Step 3: Clear CBP Inspection — US border inspection on arrival and departure.'
    ],
    fees: { visa_fee: 'ESTA: $21 USD / US Visa: $185 USD', service_fee: '0', total_fee: 'Follows US Fee Schedule', notes: 'No separate USVI visa exists.' },
    processing_time: 'ESTA: 72 Hours / US Visa: 3-5 Business Days after interview',
    proc_time: 'ESTA: 72 Hours / US Visa: 3-5 Business Days after interview',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months.' },
      { category: 'CBP Clearance', details: 'All travelers passing to US mainland must clear CBP pre-clearance in USVI.' }
    ],
    faqs: [
      { question: 'Do US citizens need a passport to visit the US Virgin Islands?', answer: 'No, US citizens do not need a passport to travel to the US Virgin Islands; any Real ID driver\'s license or state photo ID is sufficient.' }
    ],
    validity: 'Depends on ESTA (2 Years) / US Visa',
    stay_duration: 'Up to 90 Days (ESTA) / 180 Days (B1/B2)',
    entry_type: 'Multiple Entry',
    official_source: 'U.S. Customs and Border Protection & USVI Department of Tourism'
  },

  // ── BERMUDA ──
  'bermuda': {
    overview: 'Bermuda is a British Overseas Territory. Effective 2024, Bermuda does NOT require a separate entry visa for any nationality, provided the traveler holds a valid multi-entry visa or permanent residency from the USA, Canada, or the UK, or enters with an approved Bermuda One-Time Entry Visa. US, UK, Canadian, and EU passport holders enter completely visa-free with an online Bermuda Travel Authorisation.',
    highlights: [
      { icon: '🏖️', title: 'Pink Sand Beaches', description: 'Horseshoe Bay and world-famous rose-colored sands.' },
      { icon: '🏰', title: 'St. George\'s', description: 'UNESCO World Heritage town and oldest continuous English settlement.' },
      { icon: '🛂', title: 'Multi-Country Visa Waiver', description: 'Valid US, UK, or Canada multi-entry visa waives Bermuda entry visa.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 45 days beyond departure.', is_mandatory: true },
      { title: 'Bermuda Arrival Card', description: 'Completed online at bermudaarrivalcard.com.', is_mandatory: true },
      { title: 'US/UK/Canada Multi-Entry Visa (if applicable)', description: 'Waives entry visa requirement for third-country nationals.', is_mandatory: false },
      { title: 'Return Flight Ticket', description: 'Confirmed return ticket leaving Bermuda.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Exemption — US/UK/Canada/EU citizens enter visa-free. Others verify US/UK/Canada visa.',
      'Step 2: Complete Online Bermuda Arrival Card — Free online declaration prior to travel.',
      'Step 3: Board Flight — Direct flights from New York, Boston, Miami, Atlanta, Toronto, and London Heathrow.',
      'Step 4: Receive Entry Stamp — Stamped for up to 90 days at L.F. Wade International Airport (BDA).'
    ],
    fees: { visa_fee: 'Free ($0 Online Arrival Card)', service_fee: '0', total_fee: 'Free', notes: 'Bermuda Arrival Card is completely free of charge.' },
    processing_time: 'Instant Online (Arrival Card)',
    proc_time: 'Instant Online (Arrival Card)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 45 days beyond intended stay.' },
      { category: 'Online Card', details: 'Mandatory completion of digital Bermuda Arrival Card.' }
    ],
    faqs: [
      { question: 'Can Indian citizens visit Bermuda with a US visa?', answer: 'Yes! Indian passport holders who hold a valid multi-entry visa from the United States, Canada, or the UK can visit Bermuda visa-free for up to 30 days.' }
    ],
    validity: 'Up to 90 Days',
    stay_duration: 'Up to 90 Days (30 Days for third-country visa waiver holders)',
    entry_type: 'Single / Multiple Entry',
    official_source: 'Government of Bermuda - Department of Immigration'
  },

  // ── CAYMAN ISLANDS ──
  'cayman-islands': {
    overview: 'The Cayman Islands (Grand Cayman, Cayman Brac, Little Cayman) is a British Overseas Territory. Citizens of the USA, UK, Canada, and EU enter visa-free for up to 30 to 180 days. Passport holders of countries requiring a visa can enter visa-free if they hold a valid permanent residency or multi-entry visa for the USA, Canada, or the UK.',
    highlights: [
      { icon: '🏖️', title: 'Seven Mile Beach', description: 'World-renowned coral sand beach and luxury resorts.' },
      { icon: '🤿', title: 'Stingray City', description: 'Interact with wild southern stingrays in waist-deep water.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for duration of intended stay.', is_mandatory: true },
      { title: 'Return Flight Ticket', description: 'Confirmed return flight.', is_mandatory: true },
      { title: 'US/UK/Canada Visa (if applicable)', description: 'Multi-entry visa waiving consular visa.', is_mandatory: false }
    ],
    steps: [
      'Step 1: Verify Exemption — Check nationality or US/UK/Canada visa status.',
      'Step 2: Fly to Grand Cayman — Owen Roberts International Airport (GCM).',
      'Step 3: Receive Visitor Stamp — Border inspection upon arrival.'
    ],
    fees: { visa_fee: 'Free (Visa-Exempt) / CI$92 (Consular Visa approx. $112 USD)', service_fee: '0', total_fee: 'Free for eligible', notes: 'Free entry for visa-exempt travelers and US/UK/Canada visa waiver holders.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for duration of stay.' }
    ],
    faqs: [
      { question: 'Do US citizens need a visa for the Cayman Islands?', answer: 'No, US citizens enter completely visa-free for up to 30 days (extendable).' }
    ],
    validity: '30 to 180 Days',
    stay_duration: 'Up to 30 Days (Extendable)',
    entry_type: 'Single / Multiple Entry',
    official_source: 'Cayman Islands Customs and Border Control (CBC)'
  },

  // ── BRITISH VIRGIN ISLANDS ──
  'british-virgin-islands': {
    overview: 'The British Virgin Islands (Tortola, Virgin Gorda, Anegada, Jost Van Dyke) offers visa-free entry for up to 30 days for citizens of the USA, UK, Canada, and EU. Travelers requiring a visa who hold a valid multi-entry visa for the USA, UK, or Canada are eligible to enter visa-free under the BVI Visa Exemption Programme.',
    highlights: [
      { icon: '⛵', title: 'Sailing Capital of the World', description: 'Sir Francis Drake Channel and world-class bareboat chartering.' },
      { icon: '🏖️', title: 'The Baths', description: 'Massive granite boulders forming scenic sea pools and grottoes.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for at least 6 months.', is_mandatory: true },
      { title: 'Return Flight or Ferry Ticket', description: 'Confirmed return booking.', is_mandatory: true },
      { title: 'Accommodation Details', description: 'Hotel, villa, or yacht charter confirmation.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Visa Rules — US/UK/Canada multi-entry visa waives entry visa.',
      'Step 2: Travel to BVI — Fly to Beef Island (EIS) or take ferry from St. Thomas (USVI).',
      'Step 3: Clear Immigration — Pay $10 USD environmental levy and receive entry stamp.'
    ],
    fees: { visa_fee: 'Free (Visa-Free / BVI Visa Waiver Programme)', service_fee: '$10 USD Environmental and Tourism Levy at port of entry', total_fee: '$10 USD Total', notes: 'Entry visa is waived for US/UK/Canada visa holders.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for at least 6 months.' },
      { category: 'Environmental Levy', details: '$10 USD per person payable on arrival.' }
    ],
    faqs: [
      { question: 'Can I visit the British Virgin Islands with a US visa?', answer: 'Yes! Under the BVI Visa Exemption Programme, travelers holding a valid multi-entry visa for the US, UK, or Canada can enter the BVI visa-free for up to 6 months.' }
    ],
    validity: '30 Days to 6 Months',
    stay_duration: 'Up to 30 Days (Extendable)',
    entry_type: 'Single / Multiple Entry',
    official_source: 'Government of the Virgin Islands - Department of Civil Registry & Passports'
  },

  // ── GIBRALTAR ──
  'gibraltar': {
    overview: 'Gibraltar is a British Overseas Territory located at the southern tip of the Iberian Peninsula. EU/EEA, UK, US, Canadian, and Australian citizens enter visa-free. Non-visa-exempt travelers who hold a valid multi-entry UK visa (valid for at least 6 months) or a valid biometric Schengen visa (under reciprocal transit rules) can enter Gibraltar without a separate visa.',
    highlights: [
      { icon: '🪨', title: 'The Rock of Gibraltar', description: 'Iconic limestone ridge with panoramic views over the Strait of Gibraltar to Africa.' },
      { icon: '🐒', title: 'Barbary Macaques', description: 'Europe\'s only population of wild monkeys residing in the Upper Rock Nature Reserve.' },
      { icon: '🛂', title: 'UK Visa Waiver', description: 'Holders of multiple-entry UK visas enter Gibraltar without a separate visa.' }
    ],
    documents: [
      { title: 'Valid Passport', description: 'Valid for the duration of intended stay.', is_mandatory: true },
      { title: 'Valid UK Multi-Entry Visa (if applicable)', description: 'Valid for at least 6 months remaining.', is_mandatory: false },
      { title: 'Return Flight Ticket / Land Itinerary', description: 'Proof of onward travel.', is_mandatory: true }
    ],
    steps: [
      'Step 1: Check Exemption — UK, US, EU citizens enter visa-free; others check UK multi-entry visa.',
      'Step 2: Arrive in Gibraltar — Fly into Gibraltar Airport (GIB) or cross the land frontier from La Línea, Spain.',
      'Step 3: Clear Borders & Coastguard — Present passport and UK visa at border control.'
    ],
    fees: { visa_fee: 'Free (Visa-Free / UK Visa Waiver)', service_fee: '0', total_fee: 'Free', notes: 'No fee for visa-exempt travelers or UK visa waiver beneficiaries.' },
    processing_time: 'Instant on Arrival (0 Days)',
    proc_time: 'Instant on Arrival (0 Days)',
    requirements: [
      { category: 'Passport Validity', details: 'Valid for duration of stay.' },
      { category: 'Land Border Note', details: 'Entering via Spain requires satisfying Schengen border rules.' }
    ],
    faqs: [
      { question: 'Can I visit Gibraltar with a UK visa?', answer: 'Yes! Anyone holding a multiple-entry UK visa valid for at least 6 months can visit Gibraltar visa-free.' },
      { question: 'Can I cross into Gibraltar from Spain?', answer: 'Yes, travelers can walk or drive across the frontier from La Línea de la Concepción (Spain) into Gibraltar with their passport.' }
    ],
    validity: 'Up to 90 Days',
    stay_duration: 'Up to 90 Days (or duration of UK visa)',
    entry_type: 'Multiple Entry',
    official_source: 'Borders and Coastguard Agency Gibraltar & HM Government of Gibraltar'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. DYNAMIC FEE & PROCESSING TIME OVERRIDES
// ═══════════════════════════════════════════════════════════════════════════════
export const FEE_UPDATES: Record<string, { visa_fee: string; service_fee: string; total_fee: string; notes: string }> = {
  // Schengen Countries
  'france': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE even if visa is refused.' },
  'germany': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is NON-REFUNDABLE.' },
  'spain': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€17 (BLS International Service Fee)', total_fee: '€107 Total Reference', notes: 'Spain uses BLS International, NOT VFS Global.' },
  'greece': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (GVCW Service Fee)', total_fee: '€120 Total Reference', notes: 'Greece uses GVCW, NOT VFS Global.' },
  'italy': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is non-refundable.' },
  'netherlands': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is non-refundable.' },
  'switzerland': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is non-refundable.' },
  'portugal': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is non-refundable.' },
  'austria': { visa_fee: '€90 (Adult) / €45 (Children 6-12) / Free (Under 6)', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Embassy visa fee is non-refundable.' },
  'monaco': { visa_fee: '€90 for Schengen Visa / €0 for EU', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Monaco follows Schengen visa rules.' },
  'san-marino': { visa_fee: '€90 for Schengen Visa / €0 for EU', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'San Marino follows Schengen visa rules via Italy.' },
  'liechtenstein': { visa_fee: '€90 for Schengen Visa / €0 for EU', service_fee: '€30 (VFS Service Fee)', total_fee: '€120 Total Reference', notes: 'Liechtenstein is a Schengen member.' },

  // GCC Countries
  'uae': { visa_fee: '₹6,400 (30 Days) / ₹11,800 (60 Days)', service_fee: '₹0 (Included)', total_fee: '₹6,400 – ₹11,800 Total Reference', notes: 'Includes mandatory health insurance under ICP/GDRFA.' },
  'saudi-arabia': { visa_fee: 'SAR 395 – SAR 535 (approx. ₹8,800 – ₹11,900)', service_fee: '₹0 (Online Portal) / ₹2,000 (Tasheer Center)', total_fee: 'SAR 395 – 535 Total Reference', notes: 'Includes emergency medical insurance covering SAR 100,000.' },

  // ASEAN Countries
  'singapore': { visa_fee: 'SGD $30 (approx. ₹1,900)', service_fee: '₹1,000 – ₹1,500 (AVA Fee)', total_fee: '₹3,000 – ₹3,500 Total Reference', notes: 'ICA consular visa fee is SGD $30. Non-refundable.' },
  'thailand': { visa_fee: '₹0 (Free Visa Exemption)', service_fee: '₹0 (No Appointment Needed)', total_fee: '₹0 (Free Entry)', notes: 'Indian passport holders receive 60-day visa-free entry.' },
  'malaysia': { visa_fee: '₹0 (Free / No Consular Fee)', service_fee: '₹0 (Free Online MDAC)', total_fee: '₹0 (Free on Arrival)', notes: 'Indian passport holders enjoy visa-free entry for up to 30 days.' },
  'indonesia': { visa_fee: 'IDR 500,000 (approx. ₹2,700 / $35 USD)', service_fee: '₹0 (Official Direct Portal)', total_fee: 'IDR 500,000 Total Reference', notes: 'Payable online via credit/debit card or in cash/card on arrival.' },
  'vietnam': { visa_fee: '$25 USD Single Entry (₹2,100) / $50 USD Multiple Entry (₹4,200)', service_fee: '₹0 (Official Direct Portal)', total_fee: '$25 – $50 USD Total Reference', notes: 'Non-refundable fee paid directly on the official government payment gateway.' },

  // UK & USA
  'uk': { visa_fee: '£115 (approx. ₹12,300)', service_fee: '₹2,500 – ₹3,500 (VFS Logistics)', total_fee: '£115 + VFS Logistics', notes: 'Payable online at official UKVI portal.' },
  'usa': { visa_fee: '185 USD (approx. ₹15,540)', service_fee: '0 USD (Direct Consular Fee)', total_fee: '185 USD Total Reference', notes: 'Payable online via official US Visa Scheduling portal. Valid for 10 years multiple entry.' }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. REGIONAL BLOCS & FREEDOM OF MOVEMENT RULES
// ═══════════════════════════════════════════════════════════════════════════════

export const SCHENGEN_RULE = {
  rule: 'Up to 90 days within any 180-day rolling period across all 29 Schengen countries',
  details: 'The 90/180 rule applies to the entire Schengen Area. Stays in all Schengen states are cumulative. Overstaying results in automated entry ban and consular refusal records.',
  countries: [
    'austria', 'belgium', 'bulgaria', 'croatia', 'czech-republic', 'denmark', 'estonia', 'finland',
    'france', 'germany', 'greece', 'hungary', 'iceland', 'italy', 'latvia', 'liechtenstein',
    'lithuania', 'luxembourg', 'malta', 'netherlands', 'norway', 'poland', 'portugal', 'romania',
    'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland',
    // Microstates closely bound to Schengen:
    'monaco', 'san-marino', 'vatican-city', 'andorra'
  ]
};

export const GCC_COUNTRIES = ['uae', 'saudi-arabia', 'qatar', 'kuwait', 'bahrain', 'oman'];

export const GCC_RULE = {
  rule: 'GCC citizens enjoy freedom of movement within GCC countries',
  details: 'No visa required for GCC citizens traveling to other GCC countries. National ID Card (Emirates ID, Saudi National ID, Civil ID, etc.) is sufficient for travel and settlement across the Gulf Cooperation Council.',
  stay: 'Unlimited (Freedom of Movement)',
  fee: '0 SAR / 0 AED / 0 QAR / 0 KWD / 0 BHD / 0 OMR'
};

export const ASEAN_COUNTRIES = [
  'singapore', 'malaysia', 'thailand', 'indonesia', 'philippines', 'vietnam',
  'cambodia', 'laos', 'myanmar', 'brunei'
];

export const ASEAN_RULE = {
  rule: 'ASEAN citizens enjoy visa-free travel within ASEAN countries',
  details: 'No visa required for ASEAN citizens traveling to other ASEAN member nations for tourism, family visits, or commercial meetings for up to 14 to 30 days under the ASEAN Visa Exemption Agreement.',
  stay: 'Up to 30 days (varies by country)',
  fee: '₹0 (Free Entry)'
};

export const CARICOM_COUNTRIES = [
  'antigua-and-barbuda', 'bahamas', 'barbados', 'belize', 'dominica', 'grenada',
  'guyana', 'haiti', 'jamaica', 'montserrat', 'st-kitts-and-nevis', 'st-lucia',
  'st-vincent-and-the-grenadines', 'suriname', 'trinidad'
];

export const CARICOM_RULE = {
  rule: 'CARICOM citizens enjoy visa-free travel within CARICOM countries',
  details: 'No visa required for CARICOM citizens traveling to other CARICOM member states. Eligible Caribbean community nationals enjoy freedom of movement under the revised Treaty of Chaguaramas.',
  stay: 'Unlimited / Up to 6 Months (Freedom of Movement)',
  fee: '₹0 (Free Entry)'
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. MAIN DYNAMIC PIPELINE INJECTOR
// ═══════════════════════════════════════════════════════════════════════════════
export function applyDynamicRulesToRequirements(
  data: any,
  fromNorm: string,
  toNorm: string
): any {
  if (!data) return data;

  // 1. DYNAMIC FEE & COST OVERRIDES
  if (FEE_UPDATES[toNorm]) {
    data.costs = {
      ...data.costs,
      ...FEE_UPDATES[toNorm]
    };
  }

  if (!data.other_requirements) {
    data.other_requirements = [];
  }

  // 2. SCHENGEN 90/180 RULE
  if (SCHENGEN_RULE.countries.includes(toNorm)) {
    const hasSchengen = data.other_requirements.some((r: any) =>
      r.category?.toLowerCase().includes('schengen')
    );
    if (!hasSchengen) {
      data.other_requirements.push({
        category: 'Schengen 90/180 Rule',
        details: SCHENGEN_RULE.details
      });
    }
  }

  // 3. GCC FREEDOM OF MOVEMENT
  if (GCC_COUNTRIES.includes(toNorm)) {
    if (GCC_COUNTRIES.includes(fromNorm)) {
      // Direct bilateral GCC Freedom of Movement!
      data.visa_type = `GCC Freedom of Movement (National ID Entry)`;
      data.overview = `As a citizen of ${data.passport_country || 'GCC member state'}, you enjoy complete freedom of movement to travel, reside, and work in ${data.destination_country || 'GCC'} without requiring an entry visa. You can enter using your official National Identity Card.`;
      data.validity = GCC_RULE.stay;
      data.stay_duration = GCC_RULE.stay;
      data.costs = {
        visa_fee: GCC_RULE.fee,
        service_fee: '0',
        total_fee: 'FREE',
        notes: 'GCC nationals exercise treaty freedom of movement with zero visa fees.'
      };
      data.processing_time = 'Instant (0 Days)';
      const hasGcc = data.other_requirements.some((r: any) =>
        r.category?.toLowerCase().includes('gcc')
      );
      if (!hasGcc) {
        data.other_requirements.unshift({
          category: 'GCC Freedom of Movement',
          details: GCC_RULE.details
        });
      }
    } else {
      // Third-party visiting GCC
      const hasGccNote = data.other_requirements.some((r: any) =>
        r.category?.toLowerCase().includes('gcc')
      );
      if (!hasGccNote) {
        data.other_requirements.push({
          category: 'GCC Regional Travel',
          details: 'Visitors should note that visas issued for this country are generally single-state permits unless holding specific reciprocal GCC tourist authorizations.'
        });
      }
    }
  }

  // 4. ASEAN FREEDOM OF MOVEMENT
  if (ASEAN_COUNTRIES.includes(toNorm)) {
    if (ASEAN_COUNTRIES.includes(fromNorm)) {
      data.visa_type = `ASEAN Visa Exemption (Up to 30 Days)`;
      data.overview = `Citizens of ASEAN member state ${data.passport_country || ''} enjoy reciprocal visa-free entry into ${data.destination_country || 'ASEAN destination'} for tourism and business visits up to 30 days under the ASEAN Framework Agreement.`;
      data.validity = '30 Days';
      data.stay_duration = 'Up to 30 Days';
      data.costs = {
        visa_fee: ASEAN_RULE.fee,
        service_fee: '0',
        total_fee: 'FREE',
        notes: 'ASEAN citizens travel visa-free with zero consular fees.'
      };
      data.processing_time = 'Instant on Arrival (0 Days)';
      const hasAsean = data.other_requirements.some((r: any) =>
        r.category?.toLowerCase().includes('asean')
      );
      if (!hasAsean) {
        data.other_requirements.unshift({
          category: 'ASEAN Freedom of Movement',
          details: ASEAN_RULE.details
        });
      }
    }
  }

  // 5. CARICOM FREEDOM OF MOVEMENT
  if (CARICOM_COUNTRIES.includes(toNorm)) {
    if (CARICOM_COUNTRIES.includes(fromNorm)) {
      data.visa_type = `CARICOM Freedom of Movement (Visa-Free)`;
      data.overview = `Citizens of ${data.passport_country || 'CARICOM member state'} enjoy freedom of movement to enter, visit, and seek employment in ${data.destination_country || 'CARICOM destination'} under the Caribbean Community Single Market and Economy (CSME) protocols.`;
      data.validity = CARICOM_RULE.stay;
      data.stay_duration = CARICOM_RULE.stay;
      data.costs = {
        visa_fee: CARICOM_RULE.fee,
        service_fee: '0',
        total_fee: 'FREE',
        notes: 'CARICOM nationals travel visa-free under community protocols.'
      };
      data.processing_time = 'Instant on Arrival (0 Days)';
      const hasCaricom = data.other_requirements.some((r: any) =>
        r.category?.toLowerCase().includes('caricom')
      );
      if (!hasCaricom) {
        data.other_requirements.unshift({
          category: 'CARICOM Freedom of Movement',
          details: CARICOM_RULE.details
        });
      }
    }
  }

  return data;
}
