// src/lib/country-matching.ts

export function cleanCountryName(str: string): string {
  if (!str) return 'India';
  const s = str.trim();
  const sLow = s.toLowerCase();
  if (sLow === 'indian' || sLow === 'in' || sLow === 'india') return 'India';
  if (sLow === 'uk' || sLow === 'united kingdom' || sLow === 'england' || sLow === 'great britain' || sLow === 'british') return 'United Kingdom';
  if (sLow === 'us' || sLow === 'usa' || sLow === 'united states' || sLow === 'america' || sLow === 'american') return 'United States';
  if (sLow === 'uae' || sLow === 'dubai' || sLow === 'united arab emirates' || sLow === 'emirati') return 'United Arab Emirates';
  if (sLow === 'gr' || sLow === 'greece' || sLow === 'greek') return 'Greece';
  if (sLow === 'ca' || sLow === 'canada' || sLow === 'canadian') return 'Canada';
  if (sLow === 'au' || sLow === 'australia' || sLow === 'australian') return 'Australia';
  if (sLow === 'de' || sLow === 'germany' || sLow === 'german') return 'Germany';
  if (sLow === 'fr' || sLow === 'france' || sLow === 'french') return 'France';
  if (sLow === 'it' || sLow === 'italy' || sLow === 'italian') return 'Italy';
  if (sLow === 'es' || sLow === 'spain' || sLow === 'spanish') return 'Spain';
  if (sLow === 'sg' || sLow === 'singapore' || sLow === 'singaporean') return 'Singapore';
  if (sLow === 'th' || sLow === 'thailand' || sLow === 'thai') return 'Thailand';
  if (sLow === 'jp' || sLow === 'japan' || sLow === 'japanese') return 'Japan';
  if (sLow === 'ro' || sLow === 'romania' || sLow === 'romanian') return 'Romania';
  if (sLow === 'om' || sLow === 'oman' || sLow === 'omani') return 'Oman';
  
  return s.split(/[-_\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Strict Zero-Collision Destination Matching Function.
 * Protects against naive substring clashes (e.g. "oman" in "romania", "mali" in "somalia", "niger" in "nigeria").
 */
export function isDestination(
  input: string,
  primary: string,
  aliases: string[] = [],
  exclusions: string[] = []
): boolean {
  if (!input) return false;
  const norm = input.trim().toLowerCase();
  
  // 1. Guard against explicit exclusions first
  for (const ex of exclusions) {
    if (norm.includes(ex.toLowerCase())) return false;
  }

  const targets = [primary.toLowerCase(), ...aliases.map(a => a.toLowerCase())];

  // 2. Exact match
  if (targets.some(t => norm === t)) return true;

  // 3. Word-boundary discrete token match
  for (const t of targets) {
    const regex = new RegExp(`(^|[^a-z0-9])${t}([^a-z0-9]|$)`, 'i');
    if (regex.test(norm)) return true;
  }

  return false;
}

export const SCHENGEN_COUNTRIES = [
  'germany', 'france', 'spain', 'italy', 'portugal', 'netherlands', 'belgium',
  'austria', 'switzerland', 'greece', 'norway', 'sweden', 'denmark', 'finland',
  'czechia', 'czech republic', 'poland', 'hungary', 'slovakia', 'slovenia',
  'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'iceland', 'liechtenstein',
  'romania', 'bulgaria', 'croatia', 'schengen'
];

export const GCC_COUNTRIES = [
  'uae', 'united arab emirates', 'dubai', 'abu dhabi', 'sharjah',
  'saudi arabia', 'ksa', 'qatar', 'sultanate of oman', 'muscat', 'salalah',
  'bahrain', 'kuwait'
];

export const SOUTHEAST_ASIA_COUNTRIES = [
  'singapore', 'thailand', 'malaysia', 'vietnam', 'indonesia', 'philippines', 'cambodia', 'myanmar', 'bali'
];

export function isSchengenDestination(input: string): boolean {
  if (!input) return false;
  const norm = input.trim().toLowerCase();
  return SCHENGEN_COUNTRIES.some(c => isDestination(norm, c));
}

export function isGccDestination(input: string): boolean {
  if (!input) return false;
  const norm = input.trim().toLowerCase();
  if (isDestination(norm, 'romania')) return false;
  if (isDestination(norm, 'oman', ['muscat', 'salalah', 'sultanate of oman'], ['romania'])) return true;
  return GCC_COUNTRIES.some(c => isDestination(norm, c));
}

/**
 * KaTeX LaTeX crash prevention sanitizer.
 * Converts raw '$' signs to ISO currency text codes ('USD', 'EUR', 'CAD', etc.)
 */
export function sanitizeCurrencyCodes(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/\$(\d+(?:[.,]\d+)?)\s*(?:USD)?/gi, '$1 USD')
      .replace(/€\s*(\d+(?:[.,]\d+)?)\s*(?:EUR)?/gi, '$1 EUR')
      .replace(/£\s*(\d+(?:[.,]\d+)?)\s*(?:GBP)?/gi, '$1 GBP')
      .replace(/₹\s*(\d+(?:[.,]\d+)?)\s*(?:INR)?/gi, '₹$1')
      .replace(/\$/g, ' USD ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeCurrencyCodes);
  }
  if (obj !== null && typeof obj === 'object') {
    const res: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      res[key] = sanitizeCurrencyCodes(obj[key]);
    }
    return res;
  }
  return obj;
}

