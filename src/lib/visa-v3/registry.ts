// src/lib/visa-v3/registry.ts
import type { SourceRegistryEntry, SourceAuthorityType } from './types';
import { getPool } from '../../backend/db';

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

  // 1. Exact match on registry entries
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

  return { allowed: false };
}

export function getSourcesForDestination(destination: string): SourceRegistryEntry[] {
  const destLower = (destination || '').toLowerCase().trim();
  return INITIAL_20_COUNTRIES_REGISTRY.filter(entry => {
    const entryDest = entry.destination_country.toLowerCase();
    return (
      destLower.includes(entryDest) ||
      entryDest.includes(destLower) ||
      (destLower.includes('emirates') && entryDest.includes('emirates')) ||
      (destLower.includes('usa') && entryDest.includes('united states')) ||
      (destLower.includes('uk') && entryDest.includes('united kingdom'))
    );
  }).sort((a, b) => a.priority - b.priority);
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
