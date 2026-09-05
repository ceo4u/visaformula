// src/lib/visa-v3/registry.ts
import type { SourceRegistryEntry, SourceAuthorityType, SourceEntry, SourceAuthority } from './types';
import { getPool } from '../../backend/db';

export const SOURCE_REGISTRY: SourceEntry[] = [
  // ── SCHENGEN COUNTRIES (29) ──
  {
    hostname: 'www.bmeia.gv.at',
    authority: 'government',
    name: 'Austrian Ministry for European and International Affairs',
    url: 'https://www.bmeia.gv.at',
    visaPath: '/en/travel-stay/entry-and-residence-in-austria',
    priority: 1,
    countries: ['austria']
  },
  {
    hostname: 'diplomatie.belgium.be',
    authority: 'government',
    name: 'Belgian Ministry of Foreign Affairs',
    url: 'https://diplomatie.belgium.be',
    visaPath: '/en/services/visa',
    priority: 1,
    countries: ['belgium']
  },
  {
    hostname: 'www.mfa.bg',
    authority: 'government',
    name: 'Bulgarian Ministry of Foreign Affairs',
    url: 'https://www.mfa.bg',
    visaPath: '/en/services/visas',
    priority: 1,
    countries: ['bulgaria']
  },
  {
    hostname: 'mvep.gov.hr',
    authority: 'government',
    name: 'Croatian Ministry of Foreign and European Affairs',
    url: 'https://mvep.gov.hr',
    visaPath: '/en/consular-information-2/visas',
    priority: 1,
    countries: ['croatia']
  },
  {
    hostname: 'www.mzv.cz',
    authority: 'government',
    name: 'Czech Ministry of Foreign Affairs',
    url: 'https://www.mzv.cz',
    visaPath: '/en/consular_service/visa_requirements',
    priority: 1,
    countries: ['czech-republic', 'czechia']
  },
  {
    hostname: 'um.dk',
    authority: 'government',
    name: 'Danish Ministry of Foreign Affairs',
    url: 'https://um.dk',
    visaPath: '/en/travel-and-residence',
    priority: 1,
    countries: ['denmark']
  },
  {
    hostname: 'vm.ee',
    authority: 'government',
    name: 'Estonian Ministry of Foreign Affairs',
    url: 'https://vm.ee',
    visaPath: '/en/visa-information',
    priority: 1,
    countries: ['estonia']
  },
  {
    hostname: 'um.fi',
    authority: 'government',
    name: 'Finnish Ministry of Foreign Affairs',
    url: 'https://um.fi',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['finland']
  },
  {
    hostname: 'france-visas.gouv.fr',
    authority: 'government',
    name: 'France-Visas',
    url: 'https://france-visas.gouv.fr',
    priority: 1,
    countries: ['france']
  },
  {
    hostname: 'auswaertiges-amt.de',
    authority: 'government',
    name: 'German Federal Foreign Office',
    url: 'https://auswaertiges-amt.de',
    visaPath: '/en/visa-service',
    priority: 1,
    countries: ['germany']
  },
  {
    hostname: 'mfa.gr',
    authority: 'government',
    name: 'Greek Ministry of Foreign Affairs',
    url: 'https://mfa.gr',
    visaPath: '/en/visas',
    priority: 1,
    countries: ['greece']
  },
  {
    hostname: 'konzuliszolgalat.kormany.hu',
    authority: 'government',
    name: 'Hungarian Consular Services',
    url: 'https://konzuliszolgalat.kormany.hu',
    priority: 1,
    countries: ['hungary']
  },
  {
    hostname: 'www.government.is',
    authority: 'government',
    name: 'Government of Iceland',
    url: 'https://www.government.is',
    visaPath: '/en/diplomatic-missions',
    priority: 1,
    countries: ['iceland']
  },
  {
    hostname: 'esteri.it',
    authority: 'government',
    name: 'Italian Ministry of Foreign Affairs',
    url: 'https://esteri.it',
    visaPath: '/en/servizi-consolari-e-visti',
    priority: 1,
    countries: ['italy']
  },
  {
    hostname: 'www.mfa.gov.lv',
    authority: 'government',
    name: 'Latvian Ministry of Foreign Affairs',
    url: 'https://www.mfa.gov.lv',
    visaPath: '/en/consular-information',
    priority: 1,
    countries: ['latvia']
  },
  {
    hostname: 'www.llv.li',
    authority: 'government',
    name: 'Government of Liechtenstein',
    url: 'https://www.llv.li',
    visaPath: '/en/foreigners/entry-and-visa',
    priority: 1,
    countries: ['liechtenstein']
  },
  {
    hostname: 'urm.lt',
    authority: 'government',
    name: 'Lithuanian Ministry of Foreign Affairs',
    url: 'https://urm.lt',
    visaPath: '/en/consular-information',
    priority: 1,
    countries: ['lithuania']
  },
  {
    hostname: 'maee.gouvernement.lu',
    authority: 'government',
    name: 'Luxembourg Ministry of Foreign Affairs',
    url: 'https://maee.gouvernement.lu',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['luxembourg']
  },
  {
    hostname: 'identitymalta.gov.mt',
    authority: 'government',
    name: 'Identity Malta Agency',
    url: 'https://identitymalta.gov.mt',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['malta']
  },
  {
    hostname: 'netherlandsworldwide.nl',
    authority: 'government',
    name: 'Netherlands Worldwide',
    url: 'https://netherlandsworldwide.nl',
    visaPath: '/visa',
    priority: 1,
    countries: ['netherlands']
  },
  {
    hostname: 'www.udi.no',
    authority: 'government',
    name: 'Norwegian Directorate of Immigration',
    url: 'https://www.udi.no',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['norway']
  },
  {
    hostname: 'www.gov.pl/web/diplomacy',
    authority: 'government',
    name: 'Polish Ministry of Foreign Affairs',
    url: 'https://www.gov.pl/web/diplomacy',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['poland']
  },
  {
    hostname: 'vistos.mne.gov.pt',
    authority: 'government',
    name: 'Portuguese Ministry of Foreign Affairs',
    url: 'https://vistos.mne.gov.pt',
    priority: 1,
    countries: ['portugal']
  },
  {
    hostname: 'evisa.mae.ro',
    authority: 'government',
    name: 'Romania eVisa Portal',
    url: 'https://evisa.mae.ro',
    priority: 1,
    countries: ['romania']
  },
  {
    hostname: 'www.mzv.sk',
    authority: 'government',
    name: 'Slovak Ministry of Foreign Affairs',
    url: 'https://www.mzv.sk',
    visaPath: '/en/consular_info/visa',
    priority: 1,
    countries: ['slovakia']
  },
  {
    hostname: 'www.gov.si',
    authority: 'government',
    name: 'Government of Slovenia',
    url: 'https://www.gov.si',
    visaPath: '/en/topics/visa',
    priority: 1,
    countries: ['slovenia']
  },
  {
    hostname: 'exteriores.gob.es',
    authority: 'government',
    name: 'Spanish Ministry of Foreign Affairs',
    url: 'https://exteriores.gob.es',
    visaPath: '/en/ServiciosAlCiudadano/Paginas/Visa.aspx',
    priority: 1,
    countries: ['spain']
  },
  {
    hostname: 'www.government.se',
    authority: 'government',
    name: 'Government of Sweden',
    url: 'https://www.government.se',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['sweden']
  },
  {
    hostname: 'sem.admin.ch',
    authority: 'government',
    name: 'State Secretariat for Migration Switzerland',
    url: 'https://sem.admin.ch',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['switzerland']
  },

  // ── SCHENGEN VAC PROVIDERS ──
  {
    hostname: 'gvcworld.eu',
    authority: 'vac',
    name: 'GVCW Visa Application Center (Greece)',
    url: 'https://gvcworld.eu',
    priority: 4,
    countries: ['greece']
  },
  {
    hostname: 'blsspainvisa.com',
    authority: 'vac',
    name: 'BLS International Spain',
    url: 'https://blsspainvisa.com',
    priority: 4,
    countries: ['spain']
  },
  {
    hostname: 'vfsglobal.com',
    authority: 'vac',
    name: 'VFS Global',
    url: 'https://vfsglobal.com',
    priority: 4,
    countries: [
      'austria', 'belgium', 'bulgaria', 'croatia', 'czech-republic',
      'denmark', 'estonia', 'finland', 'france', 'germany',
      'hungary', 'iceland', 'italy', 'latvia', 'lithuania',
      'luxembourg', 'malta', 'netherlands', 'norway', 'poland',
      'portugal', 'romania', 'slovakia', 'slovenia', 'sweden',
      'switzerland', 'uk', 'ireland', 'australia', 'new-zealand'
    ]
  },

  // ── NORTH AMERICA ──
  {
    hostname: 'travel.state.gov',
    authority: 'government',
    name: 'US Department of State',
    url: 'https://travel.state.gov',
    visaPath: '/content/travel/en/us-visas.html',
    priority: 1,
    countries: ['usa', 'united-states']
  },
  {
    hostname: 'canada.ca',
    authority: 'government',
    name: 'Immigration, Refugees and Citizenship Canada',
    url: 'https://canada.ca',
    visaPath: '/en/immigration-refugees-citizenship.html',
    priority: 1,
    countries: ['canada']
  },
  {
    hostname: 'consulmex.sre.gob.mx',
    authority: 'government',
    name: 'Mexican Ministry of Foreign Affairs',
    url: 'https://consulmex.sre.gob.mx',
    priority: 1,
    countries: ['mexico']
  },
  {
    hostname: 'pica.gov.jm',
    authority: 'government',
    name: 'Passport, Immigration and Citizenship Agency Jamaica',
    url: 'https://pica.gov.jm',
    priority: 1,
    countries: ['jamaica']
  },

  // ── UK & IRELAND ──
  {
    hostname: 'www.gov.uk',
    authority: 'government',
    name: 'UK Visas and Immigration',
    url: 'https://www.gov.uk',
    visaPath: '/browse/visas-immigration',
    priority: 1,
    countries: ['uk', 'united-kingdom']
  },
  {
    hostname: 'visas.inis.gov.ie',
    authority: 'government',
    name: 'Immigration Service Delivery Ireland',
    url: 'https://visas.inis.gov.ie',
    visaPath: '/avats',
    priority: 1,
    countries: ['ireland']
  },

  // ── OCEANIA ──
  {
    hostname: 'immi.homeaffairs.gov.au',
    authority: 'government',
    name: 'Australian Department of Home Affairs',
    url: 'https://immi.homeaffairs.gov.au',
    priority: 1,
    countries: ['australia']
  },
  {
    hostname: 'www.immigration.govt.nz',
    authority: 'government',
    name: 'Immigration New Zealand',
    url: 'https://www.immigration.govt.nz',
    priority: 1,
    countries: ['new-zealand']
  },

  // ── ASIA (Popular) ──
  {
    hostname: 'icp.gov.ae',
    authority: 'government',
    name: 'Federal Authority for Identity and Citizenship UAE',
    url: 'https://icp.gov.ae',
    visaPath: '/en/services/visa-services',
    priority: 1,
    countries: ['uae', 'united-arab-emirates', 'dubai']
  },
  {
    hostname: 'visa.visitsaudi.com',
    authority: 'government',
    name: 'Saudi Arabia Tourist Visa Portal',
    url: 'https://visa.visitsaudi.com',
    priority: 1,
    countries: ['saudi-arabia']
  },
  {
    hostname: 'hayya.qa',
    authority: 'government',
    name: 'Qatar Hayya Portal',
    url: 'https://hayya.qa',
    priority: 1,
    countries: ['qatar']
  },
  {
    hostname: 'evisa.rop.gov.om',
    authority: 'government',
    name: 'Royal Oman Police eVisa',
    url: 'https://evisa.rop.gov.om',
    priority: 1,
    countries: ['oman']
  },
  {
    hostname: 'evisa.gov.bh',
    authority: 'government',
    name: 'Bahrain eVisa Portal',
    url: 'https://evisa.gov.bh',
    priority: 1,
    countries: ['bahrain']
  },
  {
    hostname: 'evisa.moi.gov.kw',
    authority: 'government',
    name: 'Kuwait Ministry of Interior eVisa',
    url: 'https://evisa.moi.gov.kw',
    priority: 1,
    countries: ['kuwait']
  },
  {
    hostname: 'evisa.gov.tr',
    authority: 'government',
    name: 'Turkey eVisa Portal',
    url: 'https://evisa.gov.tr',
    priority: 1,
    countries: ['turkey']
  },
  {
    hostname: 'www.gov.il',
    authority: 'government',
    name: 'Government of Israel',
    url: 'https://www.gov.il',
    visaPath: '/en/departments/ministry_of_foreign_affairs',
    priority: 1,
    countries: ['israel']
  },
  {
    hostname: 'jordanpass.jo',
    authority: 'government',
    name: 'Jordan Pass Portal',
    url: 'https://jordanpass.jo',
    priority: 1,
    countries: ['jordan']
  },
  {
    hostname: 'ica.gov.sg',
    authority: 'government',
    name: 'Immigration & Checkpoints Authority Singapore',
    url: 'https://ica.gov.sg',
    visaPath: '/enter-transit-depart/entering-singapore',
    priority: 1,
    countries: ['singapore']
  },
  {
    hostname: 'imi.gov.my',
    authority: 'government',
    name: 'Immigration Department Malaysia',
    url: 'https://imi.gov.my',
    priority: 1,
    countries: ['malaysia']
  },
  {
    hostname: 'thaievisa.go.th',
    authority: 'government',
    name: 'Royal Thai eVisa Portal',
    url: 'https://thaievisa.go.th',
    priority: 1,
    countries: ['thailand']
  },
  {
    hostname: 'evisa.imigrasi.go.id',
    authority: 'government',
    name: 'Indonesia eVisa Portal',
    url: 'https://evisa.imigrasi.go.id',
    priority: 1,
    countries: ['indonesia', 'bali']
  },
  {
    hostname: 'etravel.gov.ph',
    authority: 'government',
    name: 'Philippines eTravel Portal',
    url: 'https://etravel.gov.ph',
    priority: 1,
    countries: ['philippines']
  },
  {
    hostname: 'evisa.xuatnhapcanh.gov.vn',
    authority: 'government',
    name: 'Vietnam Immigration Department',
    url: 'https://evisa.xuatnhapcanh.gov.vn',
    priority: 1,
    countries: ['vietnam']
  },
  {
    hostname: 'evisa.gov.kh',
    authority: 'government',
    name: 'Cambodia eVisa Portal',
    url: 'https://evisa.gov.kh',
    priority: 1,
    countries: ['cambodia']
  },
  {
    hostname: 'laoevisa.gov.la',
    authority: 'government',
    name: 'Laos eVisa Portal',
    url: 'https://laoevisa.gov.la',
    priority: 1,
    countries: ['laos']
  },
  {
    hostname: 'evisa.moip.gov.mm',
    authority: 'government',
    name: 'Myanmar eVisa Portal',
    url: 'https://evisa.moip.gov.mm',
    priority: 1,
    countries: ['myanmar']
  },
  {
    hostname: 'www.srilankaevisa.lk',
    authority: 'government',
    name: 'Sri Lanka eVisa Portal',
    url: 'https://www.srilankaevisa.lk',
    priority: 1,
    countries: ['sri-lanka']
  },
  {
    hostname: 'nepaliport.immigration.gov.np',
    authority: 'government',
    name: 'Nepal Immigration Portal',
    url: 'https://nepaliport.immigration.gov.np',
    priority: 1,
    countries: ['nepal']
  },
  {
    hostname: 'www.bhutan.travel',
    authority: 'government',
    name: 'Bhutan Tourism Department',
    url: 'https://www.bhutan.travel',
    priority: 1,
    countries: ['bhutan']
  },
  {
    hostname: 'visaforchina.cn',
    authority: 'embassy',
    name: 'China Visa Application Service Center',
    url: 'https://visaforchina.cn',
    priority: 2,
    countries: ['china']
  },
  {
    hostname: 'cvasc.org.in',
    authority: 'embassy',
    name: 'Chinese Visa Application Service Center India',
    url: 'https://cvasc.org.in',
    priority: 2,
    countries: ['china']
  },
  {
    hostname: 'evisa.mofa.go.jp',
    authority: 'government',
    name: 'Japan eVisa Portal',
    url: 'https://evisa.mofa.go.jp',
    priority: 1,
    countries: ['japan']
  },
  {
    hostname: 'visa.go.kr',
    authority: 'government',
    name: 'Korea Visa Portal',
    url: 'https://visa.go.kr',
    priority: 1,
    countries: ['south-korea']
  },
  {
    hostname: 'visawebapp.boca.gov.tw',
    authority: 'government',
    name: 'Taiwan Visa Portal',
    url: 'https://visawebapp.boca.gov.tw',
    priority: 1,
    countries: ['taiwan']
  },

  // ── AFRICA ──
  {
    hostname: 'www.visa2egypt.gov.eg',
    authority: 'government',
    name: 'Egypt eVisa Portal',
    url: 'https://www.visa2egypt.gov.eg',
    priority: 1,
    countries: ['egypt']
  },
  {
    hostname: 'www.dha.gov.za',
    authority: 'government',
    name: 'South African Department of Home Affairs',
    url: 'https://www.dha.gov.za',
    priority: 1,
    countries: ['south-africa']
  },
  {
    hostname: 'passport.govmu.org',
    authority: 'government',
    name: 'Passport and Immigration Office Mauritius',
    url: 'https://passport.govmu.org',
    priority: 1,
    countries: ['mauritius']
  },
  {
    hostname: 'imuga.immigration.gov.mv',
    authority: 'government',
    name: 'Maldives Immigration',
    url: 'https://imuga.immigration.gov.mv',
    priority: 1,
    countries: ['maldives']
  },
  {
    hostname: 'seychelles.govtas.com',
    authority: 'government',
    name: 'Seychelles Travel Authorization Portal',
    url: 'https://seychelles.govtas.com',
    priority: 1,
    countries: ['seychelles']
  },
  {
    hostname: 'www.etakenya.go.ke',
    authority: 'government',
    name: 'Kenya eTA Portal',
    url: 'https://www.etakenya.go.ke',
    priority: 1,
    countries: ['kenya']
  },
  {
    hostname: 'visa.immigration.go.tz',
    authority: 'government',
    name: 'Tanzania eVisa Portal',
    url: 'https://visa.immigration.go.tz',
    priority: 1,
    countries: ['tanzania']
  },

  // ── SOUTH AMERICA ──
  {
    hostname: 'www.gov.br',
    authority: 'government',
    name: 'Government of Brazil',
    url: 'https://www.gov.br',
    visaPath: '/en/visa',
    priority: 1,
    countries: ['brazil']
  }
];

export function getSourcesForCountry(country: string): SourceEntry[] {
  const normalized = country.toLowerCase().replace(/\s+/g, '-');
  return SOURCE_REGISTRY.filter(s => 
    s.countries.some(c => c === normalized || c === country.toLowerCase() || country.toLowerCase().includes(c) || c.includes(country.toLowerCase()))
  );
}

export function validateHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^www\./, '');
  return SOURCE_REGISTRY.some(s => s.hostname.replace(/^www\./, '') === normalized);
}

export function getSourceByHostname(hostname: string): SourceEntry | null {
  const normalized = hostname.toLowerCase().replace(/^www\./, '');
  return SOURCE_REGISTRY.find(s => s.hostname.replace(/^www\./, '') === normalized) || null;
}

export function getSourceAuthority(hostname: string): SourceAuthority | null {
  const entry = getSourceByHostname(hostname);
  return entry ? entry.authority : null;
}

export function getSourcePriority(hostname: string): number {
  const entry = getSourceByHostname(hostname);
  return entry ? entry.priority : 5;
}

export const INITIAL_20_COUNTRIES_REGISTRY: SourceRegistryEntry[] = [
  // 1. United Arab Emirates
  {
    destination_country: 'United Arab Emirates',
    exact_hostname: 'icp.gov.ae',
    source_type: 'government',
    source_name: 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP)',
    source_url: 'https://icp.gov.ae',
    visa_path: '/services/visa-services',
    priority: 1
  },
  {
    destination_country: 'United Arab Emirates',
    exact_hostname: 'gdrfad.gov.ae',
    source_type: 'government',
    source_name: 'General Directorate of Residency and Foreigners Affairs Dubai (GDRFAD)',
    source_url: 'https://www.gdrfad.gov.ae',
    visa_path: '/services',
    priority: 2
  },

  // 2. Thailand
  {
    destination_country: 'Thailand',
    exact_hostname: 'thaievisa.go.th',
    source_type: 'evisa',
    source_name: 'Official Thai eVisa Processing Portal',
    source_url: 'https://www.thaievisa.go.th',
    visa_path: '/',
    priority: 1
  },
  {
    destination_country: 'Thailand',
    exact_hostname: 'consular.mfa.go.th',
    source_type: 'government',
    source_name: 'Department of Consular Affairs, Ministry of Foreign Affairs of Thailand',
    source_url: 'https://consular.mfa.go.th',
    visa_path: '/',
    priority: 2
  },

  // 3. Singapore
  {
    destination_country: 'Singapore',
    exact_hostname: 'ica.gov.sg',
    source_type: 'government',
    source_name: 'Immigration & Checkpoints Authority Singapore (ICA)',
    source_url: 'https://www.ica.gov.sg',
    visa_path: '/enter-transit-depart/entering-singapore/visa_requirements',
    priority: 1
  },

  // 4. China
  {
    destination_country: 'China',
    exact_hostname: 'visaforchina.cn',
    source_type: 'vac',
    source_name: 'Chinese Visa Application Service Center (CVASC)',
    source_url: 'https://www.visaforchina.cn',
    visa_path: '/',
    priority: 1
  },
  {
    destination_country: 'China',
    exact_hostname: 'cvasc.org.in',
    source_type: 'vac',
    source_name: 'CVASC India Official Portal',
    source_url: 'https://www.cvasc.org.in',
    visa_path: '/',
    priority: 2
  },
  {
    destination_country: 'China',
    exact_hostname: 'mfa.gov.cn',
    source_type: 'government',
    source_name: 'Ministry of Foreign Affairs of the People\'s Republic of China',
    source_url: 'https://www.mfa.gov.cn',
    visa_path: '/web/wjb_673085/fwxx_673105/wlsfw_673107/',
    priority: 3
  },

  // 5. Australia
  {
    destination_country: 'Australia',
    exact_hostname: 'immi.homeaffairs.gov.au',
    source_type: 'government',
    source_name: 'Department of Home Affairs, Australian Government',
    source_url: 'https://immi.homeaffairs.gov.au',
    visa_path: '/visas/getting-a-visa/visa-listing',
    priority: 1
  },

  // 6. United Kingdom
  {
    destination_country: 'United Kingdom',
    exact_hostname: 'www.gov.uk',
    source_type: 'government',
    source_name: 'UK Visas and Immigration (UKVI) - GOV.UK',
    source_url: 'https://www.gov.uk',
    visa_path: '/standard-visitor',
    priority: 1
  },

  // 7. United States
  {
    destination_country: 'United States',
    exact_hostname: 'travel.state.gov',
    source_type: 'government',
    source_name: 'U.S. Department of State - Bureau of Consular Affairs',
    source_url: 'https://travel.state.gov',
    visa_path: '/content/travel/en/us-visas.html',
    priority: 1
  },
  {
    destination_country: 'United States',
    exact_hostname: 'ustraveldocs.com',
    source_type: 'vac',
    source_name: 'Official U.S. Visa Information and Appointment Services',
    source_url: 'https://www.ustraveldocs.com',
    visa_path: '/',
    priority: 2
  },

  // 8. Canada
  {
    destination_country: 'Canada',
    exact_hostname: 'canada.ca',
    source_type: 'government',
    source_name: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    source_url: 'https://www.canada.ca',
    visa_path: '/en/immigration-refugees-citizenship/services/visit-canada.html',
    priority: 1
  },
  {
    destination_country: 'Canada',
    exact_hostname: 'ircc.canada.ca',
    source_type: 'government',
    source_name: 'IRCC Online Portal',
    source_url: 'https://ircc.canada.ca',
    visa_path: '/',
    priority: 2
  },

  // 9. France
  {
    destination_country: 'France',
    exact_hostname: 'france-visas.gouv.fr',
    source_type: 'government',
    source_name: 'France-Visas Official Portal',
    source_url: 'https://france-visas.gouv.fr',
    visa_path: '/web/france-visas/accueil',
    priority: 1
  },
  {
    destination_country: 'France',
    exact_hostname: 'diplomatie.gouv.fr',
    source_type: 'government',
    source_name: 'Ministry for Europe and Foreign Affairs (France)',
    source_url: 'https://www.diplomatie.gouv.fr',
    visa_path: '/en/coming-to-france/',
    priority: 2
  },

  // 10. Mauritius
  {
    destination_country: 'Mauritius',
    exact_hostname: 'safetravel.govmu.org',
    source_type: 'government',
    source_name: 'Mauritius All-in-One Digital Travel Declaration Portal',
    source_url: 'https://safetravel.govmu.org',
    visa_path: '/',
    priority: 1
  },
  {
    destination_country: 'Mauritius',
    exact_hostname: 'passport.govmu.org',
    source_type: 'government',
    source_name: 'Passport and Immigration Office Mauritius',
    source_url: 'https://passport.govmu.org',
    visa_path: '/',
    priority: 2
  },

  // 11. Germany
  {
    destination_country: 'Germany',
    exact_hostname: 'auswaertiges-amt.de',
    source_type: 'government',
    source_name: 'Federal Foreign Office Germany (Auswärtiges Amt)',
    source_url: 'https://www.auswaertiges-amt.de',
    visa_path: '/en/visa-service',
    priority: 1
  },
  {
    destination_country: 'Germany',
    exact_hostname: 'germany.info',
    source_type: 'embassy',
    source_name: 'German Missions Abroad',
    source_url: 'https://www.germany.info',
    visa_path: '/us-en/service/visa',
    priority: 2
  },

  // 12. Italy
  {
    destination_country: 'Italy',
    exact_hostname: 'esteri.it',
    source_type: 'government',
    source_name: 'Ministry of Foreign Affairs and International Cooperation (Italy)',
    source_url: 'https://www.esteri.it',
    visa_path: '/en/servizi-consolari-e-visti/',
    priority: 1
  },
  {
    destination_country: 'Italy',
    exact_hostname: 'vistoperitalia.esteri.it',
    source_type: 'government',
    source_name: 'Il Visto per l\'Italia Official Visa Portal',
    source_url: 'https://vistoperitalia.esteri.it',
    visa_path: '/home/en',
    priority: 2
  },

  // 13. Spain
  {
    destination_country: 'Spain',
    exact_hostname: 'exteriores.gob.es',
    source_type: 'government',
    source_name: 'Ministry of Foreign Affairs, European Union and Cooperation (Spain)',
    source_url: 'https://www.exteriores.gob.es',
    visa_path: '/en/ServiciosAlCiudadano/Paginas/Visados.aspx',
    priority: 1
  },

  // 14. Japan
  {
    destination_country: 'Japan',
    exact_hostname: 'mofa.go.jp',
    source_type: 'government',
    source_name: 'Ministry of Foreign Affairs of Japan',
    source_url: 'https://www.mofa.go.jp',
    visa_path: '/j_info/visit/visa/index.html',
    priority: 1
  },
  {
    destination_country: 'Japan',
    exact_hostname: 'japan.go.jp',
    source_type: 'government',
    source_name: 'Official Japan Government Portal',
    source_url: 'https://www.japan.go.jp',
    visa_path: '/',
    priority: 2
  },

  // 15. Malaysia
  {
    destination_country: 'Malaysia',
    exact_hostname: 'malaysiavisa.imi.gov.my',
    source_type: 'evisa',
    source_name: 'Official Malaysia eVisa Portal (Jabatan Imigresen Malaysia)',
    source_url: 'https://malaysiavisa.imi.gov.my',
    visa_path: '/evisa/evisa.jsp',
    priority: 1
  },
  {
    destination_country: 'Malaysia',
    exact_hostname: 'imi.gov.my',
    source_type: 'government',
    source_name: 'Immigration Department of Malaysia',
    source_url: 'https://www.imi.gov.my',
    visa_path: '/',
    priority: 2
  },

  // 16. Maldives
  {
    destination_country: 'Maldives',
    exact_hostname: 'imuga.immigration.gov.mv',
    source_type: 'government',
    source_name: 'IMUGA - Maldives Immigration Official Traveller Declaration',
    source_url: 'https://imuga.immigration.gov.mv',
    visa_path: '/',
    priority: 1
  },
  {
    destination_country: 'Maldives',
    exact_hostname: 'immigration.gov.mv',
    source_type: 'government',
    source_name: 'Maldives Immigration Official Portal',
    source_url: 'https://immigration.gov.mv',
    visa_path: '/tourist-visa/',
    priority: 2
  },

  // 17. South Korea
  {
    destination_country: 'South Korea',
    exact_hostname: 'visa.go.kr',
    source_type: 'government',
    source_name: 'Korea Visa Portal (Ministry of Justice)',
    source_url: 'https://www.visa.go.kr',
    visa_path: '/',
    priority: 1
  },

  // 18. Turkey
  {
    destination_country: 'Turkey',
    exact_hostname: 'evisa.gov.tr',
    source_type: 'evisa',
    source_name: 'Republic of Türkiye Electronic Visa Application System',
    source_url: 'https://www.evisa.gov.tr',
    visa_path: '/en/',
    priority: 1
  },
  {
    destination_country: 'Turkey',
    exact_hostname: 'mfa.gov.tr',
    source_type: 'government',
    source_name: 'Ministry of Foreign Affairs of the Republic of Türkiye',
    source_url: 'https://www.mfa.gov.tr',
    visa_path: '/visa-information-for-foreigners.en.mfa',
    priority: 2
  },

  // 19. Indonesia
  {
    destination_country: 'Indonesia',
    exact_hostname: 'evisa.imigrasi.go.id',
    source_type: 'evisa',
    source_name: 'The Official Indonesian eVisa Website (Directorate General of Immigration)',
    source_url: 'https://evisa.imigrasi.go.id',
    visa_path: '/',
    priority: 1
  },
  {
    destination_country: 'Indonesia',
    exact_hostname: 'molina.imigrasi.go.id',
    source_type: 'evisa',
    source_name: 'Molina Indonesia Immigration Portal',
    source_url: 'https://molina.imigrasi.go.id',
    visa_path: '/',
    priority: 2
  },

  // 20. New Zealand
  {
    destination_country: 'New Zealand',
    exact_hostname: 'immigration.govt.nz',
    source_type: 'government',
    source_name: 'Immigration New Zealand',
    source_url: 'https://www.immigration.govt.nz',
    visa_path: '/new-zealand-visas/apply-for-a-visa/about-visa/visitor-visa',
    priority: 1
  },

  // 21. Ireland
  {
    destination_country: 'Ireland',
    exact_hostname: 'irishimmigration.ie',
    source_type: 'government',
    source_name: 'Immigration Service Delivery (ISD), Department of Justice Ireland',
    source_url: 'https://www.irishimmigration.ie',
    visa_path: '/coming-to-visit-ireland/how-to-apply-for-a-short-stay-c-visit-tourist-visa/',
    priority: 1
  },
  {
    destination_country: 'Ireland',
    exact_hostname: 'vfsglobal.com',
    source_type: 'vac',
    source_name: 'VFS Global Ireland Visa Application Centre',
    source_url: 'https://visa.vfsglobal.com',
    visa_path: '/ind/en/irl',
    priority: 2
  }
];

export function extractHostname(urlOrHost: string): string {
  if (!urlOrHost) return '';
  try {
    const raw = urlOrHost.includes('://') ? urlOrHost : `https://${urlOrHost}`;
    const parsed = new URL(raw);
    return parsed.hostname.toLowerCase().replace(/^www\./, '');
  } catch (_) {
    return urlOrHost.toLowerCase().replace(/^www\./, '').split('/')[0];
  }
}

export function isAllowedExactHostname(
  urlOrHost: string,
  destination: string
): { allowed: boolean; entry?: SourceRegistryEntry } {
  const host = extractHostname(urlOrHost);
  const destLower = (destination || '').toLowerCase().trim();

  // 1. Exact match on initial 20 registry entries
  for (const entry of INITIAL_20_COUNTRIES_REGISTRY) {
    const entryHost = extractHostname(entry.exact_hostname);
    const entryDest = entry.destination_country.toLowerCase();

    const destMatches = 
      destLower.includes(entryDest) || 
      entryDest.includes(destLower) ||
      (destLower.includes('emirates') && entryDest.includes('emirates')) ||
      (destLower.includes('usa') && entryDest.includes('united states')) ||
      (destLower.includes('uk') && entryDest.includes('united kingdom'));

    if (destMatches && (host === entryHost || host.endsWith(`.${entryHost}`))) {
      return { allowed: true, entry };
    }
  }

  // 2. Match against 70+ SOURCE_REGISTRY
  const matchedSources = getSourcesForCountry(destination);
  for (const s of matchedSources) {
    const sHost = extractHostname(s.hostname);
    if (host === sHost || host.endsWith(`.${sHost}`)) {
      return {
        allowed: true,
        entry: {
          destination_country: destination,
          exact_hostname: s.hostname,
          source_type: s.authority,
          source_name: s.name,
          source_url: s.url,
          visa_path: s.visaPath || '/',
          priority: s.priority
        }
      };
    }
  }

  return { allowed: false };
}

export function getSourcesForDestination(destination: string): SourceRegistryEntry[] {
  const destLower = (destination || '').toLowerCase().trim();
  const initial = INITIAL_20_COUNTRIES_REGISTRY.filter(entry => {
    const entryDest = entry.destination_country.toLowerCase();
    return (
      destLower.includes(entryDest) ||
      entryDest.includes(destLower) ||
      (destLower.includes('emirates') && entryDest.includes('emirates')) ||
      (destLower.includes('usa') && entryDest.includes('united states')) ||
      (destLower.includes('uk') && entryDest.includes('united kingdom'))
    );
  }).sort((a, b) => a.priority - b.priority);

  if (initial.length > 0) return initial;

  const additional = getSourcesForCountry(destination).map(s => ({
    destination_country: destination,
    exact_hostname: s.hostname,
    source_type: s.authority,
    source_name: s.name,
    source_url: s.url,
    visa_path: s.visaPath || '/',
    priority: s.priority
  }));

  return additional.sort((a, b) => a.priority - b.priority);
}

export async function seedSourceRegistryToDb(): Promise<void> {
  try {
    const pool = getPool();
    for (const entry of INITIAL_20_COUNTRIES_REGISTRY) {
      await pool.query(
        `INSERT INTO source_registry 
          (destination_country, exact_hostname, source_type, source_name, source_url, visa_path, priority)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (exact_hostname) DO UPDATE SET
          source_type = EXCLUDED.source_type,
          source_name = EXCLUDED.source_name,
          source_url = EXCLUDED.source_url,
          visa_path = EXCLUDED.visa_path,
          priority = EXCLUDED.priority`,
        [
          entry.destination_country,
          entry.exact_hostname,
          entry.source_type,
          entry.source_name,
          entry.source_url,
          entry.visa_path || '/',
          entry.priority
        ]
      );
    }
  } catch (err) {
    console.warn('[V3Registry] Seeding source_registry notice:', err);
  }
}
