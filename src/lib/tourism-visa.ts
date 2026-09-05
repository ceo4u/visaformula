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
  if (c.includes('australia') || c.includes('sydney') || c.includes('melbourne') || c.includes('subclass 600')) return 'australia';
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales') || c.includes('london')) return 'uk';
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
  if (c.includes('oman') || c.includes('muscat') || c.includes('salalah')) return 'oman';
  if (c.includes('bahrain') || c.includes('manama')) return 'bahrain';
  if (c.includes('new zealand') || c === 'nz' || c.includes('auckland') || c.includes('queenstown')) return 'new-zealand';
  if (c.includes('south africa') || c.includes('johannesburg') || c.includes('cape town') || c.includes('durban')) return 'south-africa';
  if (c.includes('brazil') || c.includes('rio') || c.includes('sao paulo')) return 'brazil';
  return c;
}

// ── 1. TOURISM OVERVIEW — COUNTRY SPECIFIC ──
export function getTourismOverview(country: string): string {
  const c = normalizeCountry(country);
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
  };
  
  return map[c] || 
    `The ${country} Tourist Visa allows Indian passport holders to visit ${country} for tourism, holidays, leisure, and visiting family or friends. Please check the official embassy website for current requirements.`;
}

// ── 2. TOURISM HIGHLIGHTS — COUNTRY SPECIFIC ──
export function getTourismHighlights(country: string): TourismHighlightItem[] {
  const c = normalizeCountry(country);
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
  const map: Record<string, DocumentRequiredItem[]> = {
    // ── VISA-FREE / VOA COUNTRIES ──
    'thailand': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond travel date with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Verifiable ticket leaving Thailand within 60 days.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking or host invitation in Thailand.', is_mandatory: true },
      { title: 'Living Expense Funds', description: '10,000 THB per person / 20,000 THB per family (approx. ₹24,000 – ₹48,000) in cash or cards.', is_mandatory: false }
    ],
    'malaysia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Malaysia Digital Arrival Card (MDAC)', description: 'Mandatory online form submitted within 3 days prior to arrival at imigresen-online.imi.gov.my/mdac.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Malaysia within 30 days.', is_mandatory: true },
      { title: 'Hotel Reservation', description: 'Confirmed hotel booking or proof of residence in Malaysia.', is_mandatory: true }
    ],
    'mauritius': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Mauritius within 60 days.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking voucher or host invitation letter.', is_mandatory: true },
      { title: 'Mauritius All-in-One Digital Form', description: 'Mandatory online entry form at safetravel.govmu.org prior to departure.', is_mandatory: true },
      { title: 'Sufficient Funds Proof', description: 'Minimum USD $100 / EUR €100 / MUR 4,000 per day of stay.', is_mandatory: false }
    ],
    'maldives': [
      { title: 'Valid Passport', description: 'Valid for at least 1 month (recommended 6 months) with machine-readable zone.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Maldives within 30 days.', is_mandatory: true },
      { title: 'Confirmed Resort / Hotel Booking', description: 'Prepaid hotel reservation or resort booking voucher.', is_mandatory: true },
      { title: 'IMUGA Traveler Declaration', description: 'Mandatory online form within 96 hours before arrival at imuga.immigration.gov.mv.', is_mandatory: true }
    ],
    'jamaica': [
      { title: 'Valid Indian Passport', description: 'Valid for the duration of stay. At least 1 blank page required for entry stamp.', is_mandatory: true },
      { title: 'C5 Online Immigration & Customs Form', description: 'MANDATORY: Complete at enterjamaica.com BEFORE boarding. QR code generated.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Immigration officers may request evidence of onward travel.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking, Airbnb reservation, or host invitation letter.', is_mandatory: true }
    ],
    'nepal': [
      { title: 'Indian Passport OR Voter ID Card', description: 'Indian citizens can travel with EITHER a valid Indian Passport OR original Voter ID card.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Kathmandu (KTM).', is_mandatory: true }
    ],
    'bhutan': [
      { title: 'Indian Passport OR Voter ID Card', description: 'Valid for at least 6 months OR original Voter ID card.', is_mandatory: true },
      { title: 'Passport-Size Photographs', description: 'Two recent color photographs on white background (35x45mm).', is_mandatory: true },
      { title: 'Confirmed Hotel Booking', description: 'Hotel reservations with Department of Tourism approved accommodation.', is_mandatory: true },
      { title: 'Sustainable Development Fee (SDF)', description: '₹1,200 per night (children 6-12: ₹600). Paid prior to arrival.', is_mandatory: true }
    ],
    'seychelles': [
      { title: 'Valid Passport', description: 'Valid for the duration of stay with at least 1 blank page.', is_mandatory: true },
      { title: 'Seychelles Travel Authorization (TA)', description: 'Mandatory online TA at seychelles.govtas.com — €10 EUR fee.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Seychelles within 30 days.', is_mandatory: true },
      { title: 'Confirmed Hotel Booking', description: 'Accommodation at certified eco-tourism hotel/resort.', is_mandatory: true },
      { title: 'Travel Medical Insurance', description: 'Mandatory international travel medical insurance covering emergency expenses.', is_mandatory: true }
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
      { title: 'Bank Statements & Tax Returns', description: '6 months stamped bank statements + 3 years ITR.', is_mandatory: true }
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
      { title: 'Hotel Booking / Accommodation', description: 'Confirmed hotel reservations for planned cities.', is_mandatory: true }
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
      { title: 'Cambodia e-Arrival Card', description: 'Mandatory digital form within 7 days prior to arrival at arrival.gov.kh.', is_mandatory: true }
    ],
    'sri-lanka': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from arrival date with 2 blank pages.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Return ticket leaving Sri Lanka within 30 days.', is_mandatory: true },
      { title: 'Proof of Accommodation', description: 'Hotel booking or host address in Sri Lanka.', is_mandatory: true }
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
      { title: 'Mandatory Qatar Health Insurance', description: 'QAR 50 (approx. ₹1,150) from Ministry of Public Health approved insurer.', is_mandatory: true }
    ],
    'saudi-arabia': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond travel date with 2 blank visa pages.', is_mandatory: true },
      { title: 'Digital Passport Photograph (2×2 inch)', description: 'Recent color photo on pure white background.', is_mandatory: true },
      { title: 'Mandatory Saudi Health Insurance', description: 'Automatically bundled with visa fee covering SAR 100,000 emergency medical care.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket to Riyadh, Jeddah, Dammam, or Medina.', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Hotel reservations for the duration of stay.', is_mandatory: true }
    ],
    'oman': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from entry date with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Bio-Data Page Scan', description: 'High-resolution color scan of passport details page.', is_mandatory: true },
      { title: 'Digital Passport Photograph', description: 'Recent color photo on white background (35x45mm).', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Muscat (MCT) or Salalah (SLL).', is_mandatory: true },
      { title: 'Hotel Booking / Accommodation', description: 'Hotel reservations in Oman for duration of visit.', is_mandatory: true }
    ],
    'bahrain': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months with 2 blank pages.', is_mandatory: true },
      { title: 'Passport Bio-Data & Last Page Scan', description: 'Color copy of passport bio page and address page.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip ticket departing Bahrain International Airport (BAH).', is_mandatory: true },
      { title: 'Hotel Booking / Host Proof', description: 'Hotel reservation or CPR copy of resident host.', is_mandatory: true },
      { title: 'Bank Account Statements (3 Months)', description: 'Stamped statement showing USD $1,00,000 / BHD 300 / ₹85,000 balance.', is_mandatory: true }
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
  };
  
  const defaultSteps = [
    'Step 1: Plan Your Itinerary — Research destinations, activities, and the best time to visit.',
    'Step 2: Ensure Passport Validity — Verify your passport has at least 6 months validity and 2 blank pages.',
    'Step 3: Check Visa Requirements — Verify if you need a visa, eVisa, or are eligible for visa-free entry.',
    'Step 4: Gather Required Documents — Compile passport, photographs, flight/hotel bookings, financial proof, and insurance.',
    'Step 5: Complete Application — Submit your visa application online or through the designated Visa Application Center.',
    'Step 6: Pay Visa Fee — Pay the official consular fee and VAC service charges.',
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
    'brazil': { visa_fee: 'Official Statutory Fee', service_fee: 'VAC Service Fee', total_fee: 'Official Fee + VAC Logistics', notes: 'Check official embassy website for current fees. E-visa available for eligible applicants.' }
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
  };
  
  return map[c] || 'Per Official Consular SLA. Apply at least 3-4 weeks before travel.';
}

// ── 7. TOURISM PROCESSING DETAILS — Additional Context ──
export function getTourismProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
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
  };
  
  return map[c] || 'Apply at least 3-4 weeks before travel. Check official website for current processing times.';
}

// ── 8. TOURISM FAQ — COUNTRY SPECIFIC ──
export function getTourismFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FAQItem[]> = {
    'thailand': [
      { question: 'Do Indian citizens need a visa for Thailand?', answer: 'No, Indian passport holders can enter Thailand visa-free for up to 60 days. This is a visa exemption scheme effective from 2024 onwards.' },
      { question: 'How can I extend my stay in Thailand?', answer: 'You can extend your stay for an additional 30 days at local Thai immigration offices for 1,900 THB. Extensions are subject to approval.' },
      { question: 'Is there any minimum funds requirement for Thailand?', answer: 'You should have 10,000 THB per person or 20,000 THB per family in cash or card. This is a standard immigration spot-check requirement.' }
    ],
    'malaysia': [
      { question: 'Do Indian citizens need a visa for Malaysia?', answer: 'No, Indian passport holders enjoy visa-free entry for up to 30 days for tourism. You must submit the free MDAC online within 3 days before arrival.' },
      { question: 'What is the MDAC requirement for Malaysia?', answer: 'The Malaysia Digital Arrival Card (MDAC) is a mandatory online arrival form completed at imigresen-online.imi.gov.my/mdac. It generates an electronic confirmation required at border control.' },
      { question: 'Can I extend my stay in Malaysia?', answer: 'The 30-day visa-free social visit pass is non-extendable except under exceptional medical or emergency circumstances approved by immigration.' }
    ],
    'mauritius': [
      { question: 'Do Indian citizens need a visa for Mauritius?', answer: 'No prior visa is required. Indian tourists receive a free 60-day entry permit on arrival at SSR International Airport.' },
      { question: 'What is the Mauritius All-in-One Digital Form?', answer: 'It is a mandatory online health and immigration declaration completed at safetravel.govmu.org before departure. Generate the QR code for airport presentation.' },
      { question: 'Can I extend my stay in Mauritius?', answer: 'Yes, tourist permits can be extended free of charge for up to 90 days total at the Passport & Immigration Office in Port Louis.' }
    ],
    'maldives': [
      { question: 'Do Indian citizens get visa on arrival for Maldives?', answer: 'Yes, all tourists receive a complimentary 30-day visa on arrival upon showing a valid passport, prepaid hotel voucher, and return ticket.' },
      { question: 'What is the IMUGA declaration?', answer: 'The IMUGA Traveler Declaration must be submitted online at imuga.immigration.gov.mv within 96 hours before arriving and departing Maldives.' },
      { question: 'Can the Maldives tourist visa be extended?', answer: 'Yes, the 30-day visa on arrival can be extended for up to 90 days total by applying directly at the Maldives Immigration Department in Male.' }
    ],
    'jamaica': [
      { question: 'Do Indian citizens need a visa for Jamaica?', answer: 'No, Indian tourists can visit Jamaica visa-free for up to 30 days. You only need a valid passport, return ticket, and the mandatory C5 online form.' },
      { question: 'What is the C5 form for Jamaica?', answer: 'The C5 Online Immigration and Customs Form must be filled out at enterjamaica.com before boarding your flight. It is completely free.' },
      { question: 'Can the 30-day stay in Jamaica be extended?', answer: 'Yes, you can extend your stay inside Jamaica by visiting the Passport, Immigration and Citizenship Agency (PICA) office in Kingston or Montego Bay.' }
    ],
    'uae': [
      { question: 'Do Indian citizens need a visa for UAE?', answer: 'Yes, Indian passport holders require a valid eVisa or entry permit to enter the UAE. Apply online through ICP/GDRFA portals. Visa on arrival is available for US citizens only.' },
      { question: 'How long is the UAE Tourist eVisa valid?', answer: 'The eVisa is valid for 60 days from the date of electronic issuance. You must enter the UAE within this period. Stay duration depends on your selected tier (30 or 60 days).' },
      { question: 'Can I extend my UAE Tourist Visa?', answer: 'Yes, you can extend your tourist visa inside the UAE for an additional 30 days without exit. Extensions are processed through ICP/GDRFA.' }
    ],
    'singapore': [
      { question: 'Do Indian citizens need a visa for Singapore?', answer: 'Yes, Indian passport holders require a valid eVisa to enter Singapore. Apply through ICA Authorized Visa Agents (AVAs) in India. You cannot apply directly on ICA unless sponsored by a Singapore Citizen/PR.' },
      { question: 'How long is the Singapore eVisa valid?', answer: 'Singapore e-Visas are typically issued for up to 2 years with multiple entries. Each visit allows a stay of up to 30 days. Validity and stay duration are at the discretion of ICA.' },
      { question: 'What is the SG Arrival Card (SGAC)?', answer: 'The SGAC is a mandatory electronic arrival declaration. You must submit it online within 3 days before arrival in Singapore. It includes health declaration and travel details.' }
    ],
    'turkey': [
      { question: 'Who is eligible for Turkey online eVisa from India?', answer: 'Indian passport holders can apply for an online eVisa at evisa.gov.tr ONLY IF they hold a valid US, UK, Schengen, or Ireland visa/residence permit. Otherwise, a sticker visa via Gateway Globe is required.' },
      { question: 'How fast is the Turkey online eVisa processed?', answer: 'The online eVisa is issued instantly (typically within 5 minutes) upon online payment of $43 USD at evisa.gov.tr.' },
      { question: 'How long can I stay in Turkey on an eVisa?', answer: 'The eVisa allows a single entry of up to 30 days within a 180-day validity window.' }
    ],
    'jordan': [
      { question: 'How does the Jordan Pass save money on visa fees?', answer: 'Purchasing the Jordan Pass (starting 70 JOD at jordanpass.jo) waives the 40 JOD visa on arrival fee, provided you stay at least 3 consecutive nights, and covers entry to Petra and 40+ attractions.' },
      { question: 'Can Indian citizens get Visa on Arrival in Jordan?', answer: 'Yes, Visa on Arrival is available at Queen Alia Airport (AMM) for 40 JOD cash/card, or free with an advance Jordan Pass.' },
      { question: 'How long is the Jordan tourist visa valid for stay?', answer: 'The standard stay granted on arrival is 30 days, which can be extended for up to 3 months at a local Jordanian police station.' }
    ],
    'egypt': [
      { question: 'How do Indian passport holders apply for Egypt eVisa?', answer: 'Apply online at visa2egypt.gov.eg at least 7 days before departure. The fee is $25 USD for single entry and $60 USD for multiple entry.' },
      { question: 'Can Indian citizens get Visa on Arrival in Egypt?', answer: 'Indian citizens holding a valid, used visa for the US, UK, Schengen, Japan, or Canada can obtain a 30-day Visa on Arrival for $25 USD at Cairo Airport.' },
      { question: 'What documents are checked at Egyptian immigration?', answer: 'You must present your printed eVisa/visa, passport with 6+ months validity, return flight ticket, hotel bookings, and travel itinerary.' }
    ],
    'kenya': [
      { question: 'What is the Kenya eTA system?', answer: 'Kenya has replaced traditional visas with an Electronic Travel Authorisation (eTA). All visitors must apply online at etakenya.go.ke before boarding. Processing takes 72 hours and costs $34 USD.' },
      { question: 'Can I get a visa on arrival in Kenya?', answer: 'No, Kenya no longer issues any visas on arrival. You must obtain an approved eTA QR code prior to flight departure.' },
      { question: 'How long is the Kenya eTA valid?', answer: 'The eTA allows a single entry of up to 90 days from the date of approval.' }
    ],
    'france': [
      { question: 'Do Indian citizens need a visa for France?', answer: 'Yes, Indian passport holders require a Schengen visa to enter France. Apply through France-Visas portal and VFS Global. France is part of the Schengen Area.' },
      { question: 'What is the Schengen 90/180 rule?', answer: 'You can stay up to 90 days within any rolling 180-day period across all 29 Schengen countries. Overstaying results in a multi-year Schengen entry ban.' },
      { question: 'How much travel insurance do I need for Schengen?', answer: 'You need travel medical insurance with minimum €30,000 coverage for emergency medical treatment, hospitalization, and repatriation across all Schengen states.' }
    ],
    'germany': [
      { question: 'Do Indian citizens need a visa for Germany?', answer: 'Yes, Indian passport holders require a Schengen visa to enter Germany. Apply through the VIDEX portal and book an appointment at VFS Global Germany.' },
      { question: 'What is the financial requirement for Germany tourist visa?', answer: 'You should show around €45 to €100 per day of stay through 3 to 6 months stamped bank statements and last 2-3 years ITR.' },
      { question: 'Can I travel to other European countries on a German visa?', answer: 'Yes, a Schengen visa issued by Germany allows seamless travel across all 29 Schengen member states during its validity.' }
    ],
    'italy': [
      { question: 'Do Indian citizens need a visa for Italy?', answer: 'Yes, Indian passport holders require a Schengen visa. Apply online through the Italian MFA portal and schedule submission at VFS Global Italy.' },
      { question: 'How much funds do I need to show for Italy visa?', answer: 'Italian consular authorities expect approximately €50–€100 per day of stay demonstrated via 3–6 months stamped bank statements.' },
      { question: 'Can I visit the Vatican and San Marino with an Italy visa?', answer: 'Yes, both the Vatican City and San Marino are enclaves accessible without additional border checks from Italy.' }
    ],
    'spain': [
      { question: 'Do Indian citizens need a visa for Spain?', answer: 'Yes, Indian passport holders require a Schengen visa to enter Spain. Apply through BLS International Spain (blsspainvisa.com). Spain does NOT use VFS Global.' },
      { question: 'What is the Carta de Invitación for Spain?', answer: 'If staying with friends or relatives in Spain, the host must obtain an official Carta de Invitación from the local Policía Nacional. Private or notarized letters are NOT accepted.' },
      { question: 'What is the financial requirement for Spain visa?', answer: 'You must show minimum €122 per person per day of stay, with an absolute irreducible minimum of €1,099 per person (Order PRE/1282/2007).' }
    ],
    'greece': [
      { question: 'Do Indian citizens need a visa for Greece?', answer: 'Yes, Indian passport holders require a Schengen visa to enter Greece. Apply through GVCW Greece (gvcworld.eu). Greece does NOT use VFS Global.' },
      { question: 'Do I need to book all my Greek island ferries in advance?', answer: 'For visa applications, include inter-island ferry/domestic flight bookings in your itinerary. You can book on seajets.gr or ferryscanner.com for your visa application.' },
      { question: 'Can I visit other Schengen countries with a Greece visa?', answer: 'Yes, a Schengen visa issued by Greece allows travel to all 29 Schengen countries, provided you spend the most time in Greece or enter through Greece.' }
    ],
    'australia': [
      { question: 'Do Indian citizens need a visa for Australia?', answer: 'Yes, Indian passport holders require a valid visa to enter Australia. Apply for Visitor Visa (Subclass 600) through ImmiAccount. No visa on arrival available.' },
      { question: 'What is the processing time for Australia Visitor Visa?', answer: 'Standard processing is 15 to 25 calendar days. Apply 4-8 weeks before travel. 100% digital e-Visa linked to your passport.' },
      { question: 'What documents do I need for Australia Visitor Visa?', answer: 'You need a valid passport, 6-month bank statements, employment proof, travel itinerary, and accommodation details. Biometrics may be requested.' }
    ],
    'uk': [
      { question: 'Do Indian citizens need a visa for UK?', answer: 'Yes, Indian passport holders require a Standard Visitor Visa to enter the UK. Apply online through GOV.UK. No visa on arrival available.' },
      { question: 'What is the processing time for UK Visitor Visa?', answer: 'Standard processing is 3 weeks (15 working days). Priority service available: 5 working days (+£500) or Super Priority: 24 hours (+£1,000).' },
      { question: 'Can I work on a UK Visitor Visa?', answer: 'No, paid work or employment is strictly prohibited on a Standard Visitor Visa. You can attend meetings, conferences, or conduct business negotiations.' }
    ],
    'usa': [
      { question: 'Do Indian citizens need a visa for USA?', answer: 'Yes, Indian passport holders require a B1/B2 Visitor Visa to enter the USA. India is not part of the Visa Waiver Program (ESTA).' },
      { question: 'How long is the US Visitor Visa valid?', answer: 'The B1/B2 visa is typically valid for 10 years with multiple entries. CBP determines stay duration at the port of entry on Form I-94 (usually up to 6 months).' },
      { question: 'What is the visa interview process for USA?', answer: 'You must complete DS-160 online, pay MRV fee, schedule VAC biometrics, and attend an in-person consular interview at the US Embassy/Consulate.' }
    ],
    'canada': [
      { question: 'Do Indian citizens need a visa for Canada?', answer: 'Yes, Indian passport holders require a Visitor Visa (TRV) to enter Canada. Apply online through IRCC. No visa on arrival available.' },
      { question: 'How long is the Canada Visitor Visa valid?', answer: 'The TRV is typically valid for up to 10 years with multiple entries. Biometrics required. Stay duration determined at port of entry.' },
      { question: 'What is the processing time for Canada Visitor Visa?', answer: 'Typically 15 to 30 business days after biometrics submission. Apply 30-90 days before travel.' }
    ],
    'japan': [
      { question: 'Do Indian citizens need a visa for Japan?', answer: 'Yes, Indian passport holders require a Tourist Visa to enter Japan. Apply online through evisa.mofa.go.jp or through VFS Global Japan.' },
      { question: 'How long can I stay in Japan on a Tourist Visa?', answer: 'Tourist visas are typically issued for 15, 30, or 90 days single entry. Duration is determined by the consular officer based on your itinerary.' },
      { question: 'What is Visit Japan Web?', answer: 'Visit Japan Web (vjw-lp.digital.go.jp) is a pre-arrival registration system. Complete it before departure for immigration and customs QR code clearance at airports.' }
    ],
    'new-zealand': [
      { question: 'Do Indian citizens need a visa for New Zealand?', answer: 'Yes, Indian passport holders require a Visitor Visa to enter New Zealand. Apply online through Immigration New Zealand (immigration.govt.nz).' },
      { question: 'What is the processing time for New Zealand Visitor Visa?', answer: 'Standard processing is 15 to 25 calendar days. 100% digital e-Visa linked to your passport.' },
      { question: 'Can I work on a New Zealand Visitor Visa?', answer: 'No, paid work or employment is strictly prohibited on a Visitor Visa. You can only engage in tourism, leisure, and visiting family/friends.' }
    ],
    'south-africa': [
      { question: 'Do Indian citizens need a visa for South Africa?', answer: 'Yes, Indian passport holders require a Visitor Visa (Section 11(1)) to enter South Africa. Apply through VFS Global South Africa.' },
      { question: 'Is there a visa fee for Indian citizens?', answer: 'No, the consular visa fee is completely waived for Indian citizens. You only pay the VFS Global logistics service charge (₹2,040).' },
      { question: 'What is the processing time for South Africa Visitor Visa?', answer: 'Standard processing is 10 to 15 business days. Apply 3-6 weeks before travel.' }
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
  };
  
  return map[c] || 'Per Official Guidelines (30 to 90 Days)';
}

// ── 12. TOURISM STAY DURATION — COUNTRY SPECIFIC ──
export function getTourismStayDuration(country: string): string {
  const c = normalizeCountry(country);
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
  };
  
  return map[c] || 'Up to 30 Days (Extendable)';
}

// ── 13. TOURISM ENTRY TYPE — COUNTRY SPECIFIC ──
export function getTourismEntryType(country: string): string {
  const c = normalizeCountry(country);
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
  };
  
  return map[c] || 'Single / Multiple Entry';
}

// ── 14. OFFICIAL SOURCE NAME HELPER ──
export function getTourismOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
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
    'spain': 'Ministry of Foreign Affairs, European Union and Cooperation (Spain)',
    'greece': 'Ministry of Foreign Affairs of the Hellenic Republic',
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
  };

  return map[c] || `${country} Immigration Authority & Consular Affairs`;
}

// ── 15. COMPLETE TOURISM VISA DATA BUILDER ──
export function getTourismVisaData(
  from: string,
  to: string,
  purpose: string = 'Tourism'
): StructuredVisaRequirements {
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
    visa_type: `${countryName} Tourist Visa`,
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
      center_notes: `VFS Global / ${countryName} Embassy/Consulate. Check appointment availability online.`
    }
  };
}

export const getTourismVisaSteps = getTourismSteps;
