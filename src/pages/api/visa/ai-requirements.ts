// src/pages/api/visa/ai-requirements.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import { sanitizeCurrencyCodes } from '../../../lib/country-matching';
import { verifyTurnstileToken } from '../../../lib/verify-turnstile';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Resolve Gemini API key safely
const getGeminiApiKey = (): string => {
  let key = (
    (import.meta?.env?.GEMINI_API_KEY as string | undefined) ||
    (import.meta?.env?.NEXT_PUBLIC_GEMINI_API_KEY as string | undefined) ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  )?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^(?:GEMINI_API_KEY|NEXT_PUBLIC_GEMINI_API_KEY|PUBLIC_GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch (err) {}

  return '';
};

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

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  documents_required: DocumentRequiredItem[];
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
}

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
  
  return s.split(/[-_\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function isDestination(
  input: string,
  primary: string,
  aliases: string[] = [],
  exclusions: string[] = []
): boolean {
  if (!input) return false;
  const norm = input.trim().toLowerCase();
  for (const ex of exclusions) {
    if (norm.includes(ex.toLowerCase())) return false;
  }
  const targets = [primary.toLowerCase(), ...aliases.map(a => a.toLowerCase())];
  if (targets.some(t => norm === t)) return true;
  for (const t of targets) {
    const regex = new RegExp(`(^|[^a-z0-9])${t}([^a-z0-9]|$)`, 'i');
    if (regex.test(norm)) return true;
  }
  return false;
}

// Built-in verified database matching official GVCW, VFS, UKVI & Consular regulations
export function getVerifiedOfficialData(rawFrom: string, rawTo: string, rawPurpose: string): StructuredVisaRequirements {
  const from = cleanCountryName(rawFrom);
  const to = cleanCountryName(rawTo);
  const toLower = to.toLowerCase();
  const purposeLower = rawPurpose.toLowerCase();

  const isUK = isDestination(toLower, 'united kingdom', ['uk', 'great britain', 'england', 'scotland', 'wales', 'british']);
  const isGreece = isDestination(toLower, 'greece', ['hellas', 'athens', 'thessaloniki']);
  const isRomania = isDestination(toLower, 'romania', ['bucharest', 'cluj', 'timisoara', 'brasov', 'iasi', 'constanta']);
  const isBulgaria = isDestination(toLower, 'bulgaria', ['sofia', 'varna', 'plovdiv']);
  const isCroatia = isDestination(toLower, 'croatia', ['zagreb', 'dubrovnik', 'split']);
  const isSchengen = isGreece || isRomania || isBulgaria || isCroatia || ['france', 'germany', 'italy', 'spain', 'netherlands', 'switzerland', 'austria', 'portugal', 'belgium', 'sweden', 'norway', 'denmark', 'finland', 'czechia', 'czech republic', 'poland', 'hungary', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'iceland', 'liechtenstein'].some(c => isDestination(toLower, c));
  const isUSA = isDestination(toLower, 'united states', ['usa', 'us', 'america', 'american']);
  const isCanada = isDestination(toLower, 'canada', ['canadian']);
  const isAustralia = isDestination(toLower, 'australia', ['australian', 'aussie']);
  const isNewZealand = isDestination(toLower, 'new zealand', ['nz', 'kiwi']);
  const isGermany = isDestination(toLower, 'germany', ['deutschland', 'berlin', 'munich', 'frankfurt', 'german']);
  const isUAE = isDestination(toLower, 'united arab emirates', ['uae', 'dubai', 'abu dhabi', 'sharjah', 'emirates', 'emirati']);
  const isMauritius = isDestination(toLower, 'mauritius', ['port louis']);
  const isThailand = isDestination(toLower, 'thailand', ['bangkok', 'phuket', 'pattaya', 'thai']);
  const isMalaysia = isDestination(toLower, 'malaysia', ['kuala lumpur', 'penang', 'malaysian']);
  const isMaldives = isDestination(toLower, 'maldives', ['male']);
  const isSingapore = isDestination(toLower, 'singapore', ['singaporean']);
  const isIndonesia = isDestination(toLower, 'indonesia', ['bali', 'jakarta']);
  const isVietnam = isDestination(toLower, 'vietnam', ['hanoi', 'ho chi minh', 'da nang']);
  const isJapan = isDestination(toLower, 'japan', ['tokyo', 'osaka', 'kyoto', 'japanese']);
  const isSriLanka = isDestination(toLower, 'sri lanka', ['colombo']);
  const isSaudi = isDestination(toLower, 'saudi arabia', ['saudi', 'ksa', 'riyadh', 'jeddah', 'mecca', 'medina']);
  const isQatar = isDestination(toLower, 'qatar', ['doha']);
  const isOman = isDestination(toLower, 'oman', ['sultanate of oman', 'muscat', 'salalah'], ['romania']);
  const isBahrain = isDestination(toLower, 'bahrain', ['manama']);
  const isEgypt = isDestination(toLower, 'egypt', ['cairo', 'alexandria', 'hurghada', 'sharm el sheikh']);
  const isKenya = isDestination(toLower, 'kenya', ['nairobi', 'mombasa']);
  const isTanzania = isDestination(toLower, 'tanzania', ['zanzibar', 'dar es salaam']);
  const isSouthAfrica = isDestination(toLower, 'south africa', ['johannesburg', 'cape town', 'durban', 'rsa']);
  const isSeychelles = isDestination(toLower, 'seychelles', ['mahe']);
  const isSouthKorea = isDestination(toLower, 'south korea', ['korea', 'seoul', 'busan', 'korean'], ['north korea']);
  const isHongKong = isDestination(toLower, 'hong kong', ['hk', 'hongkong']);
  const isKazakhstan = isDestination(toLower, 'kazakhstan', ['almaty', 'astana']);
  const isAzerbaijan = isDestination(toLower, 'azerbaijan', ['baku']);
  const isGeorgia = isDestination(toLower, 'georgia', ['tbilisi', 'batumi', 'sakartvelo'], ['usa', 'united states', 'atlanta']);
  const isPhilippines = isDestination(toLower, 'philippines', ['manila', 'cebu', 'filipino']);
  const isEthiopia = isDestination(toLower, 'ethiopia', ['addis ababa', 'ethiopian', 'ethiopia evisa']);
  const isDenmark = isDestination(toLower, 'denmark', ['copenhagen', 'danish', 'aarhus', 'odense']);
  const isYemen = isDestination(toLower, 'yemen', ['sanaa', "sana'a", 'aden', 'yemeni', 'al mukalla']);

  // ═══════════════════════════════════════════════════════════════
  // MAURITIUS PATHWAYS (100% Verified Official Immigration Data)
  // ═══════════════════════════════════════════════════════════════
  if (isMauritius) {
    const isIndianPassport = from.toLowerCase().includes('india') || from.toLowerCase().includes('in');
    
    if (isIndianPassport && !purposeLower.includes('work') && !purposeLower.includes('study')) {
      return {
        passport_country: from,
        destination_country: 'Mauritius',
        purpose_of_visit: 'Tourism / Vacation',
        visa_type: 'Visa-Free Entry (Granted on Arrival)',
        source_url: 'https://passport.govmu.org',
        official_source_name: 'Passport & Immigration Office, Republic of Mauritius',
        processing_time: 'Instant / On-Arrival (0 Days)',
        validity: '60–90 Days on Arrival',
        stay_duration: 'Up to 60 Days (Extendable to 90 Days)',
        entry_type: 'Single / Multiple Entry',
        validity_and_stay: {
          visa_validity: '60–90 Days on Arrival',
          max_stay_per_entry: 'Up to 60 Days (Extendable)',
          entry_type: 'Single / Multiple Entry'
        },
        documents_required: [
          {
            title: 'Original Passport',
            description: 'Must be valid for at least 6 months beyond intended stay with at least 2 blank visa pages.',
            is_mandatory: true
          },
          {
            title: 'Confirmed Return / Onward Flight Ticket',
            description: 'Confirmed round-trip or onward airline ticket departing Mauritius within the 60-day permitted stay.',
            is_mandatory: true
          },
          {
            title: 'Proof of Accommodation / Hotel Voucher',
            description: 'Confirmed hotel booking reservation or official host accommodation invitation letter with address and contact details.',
            is_mandatory: true
          },
          {
            title: 'Mauritius All-in-One Digital Travel Form',
            description: 'Mandatory online entry form completed at safetravel.govmu.org prior to departure to generate the arrival QR code.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Proof of Sufficient Funds on Arrival',
            minimum_balance_or_amount: 'Minimum USD $100 / EUR €100 / MUR 4,000 per day of stay',
            time_frame: 'Carried during travel',
            notes: 'Acceptable in international credit/debit cards, traveler’s cheques, or physical foreign currency cash.'
          }
        ],
        other_requirements: [
          {
            category: 'Immigration Clearance on Arrival',
            details: 'No advance consular application required. Present passport, return flight, hotel voucher, and digital travel QR code at SSR International Airport (MRU).'
          },
          {
            category: 'Customs Currency Rules',
            details: 'Currency exceeding MUR 500,000 (or foreign equivalent approx. $11,000 USD) must be declared upon arrival.'
          }
        ],
        how_to_apply: [
          'Verify your passport has at least 6 months validity from planned departure date and 2 blank pages.',
          'Book confirmed return flight ticket and hotel accommodation voucher in Mauritius.',
          'Complete the official Mauritius All-in-One Digital Travel / Health Form online at safetravel.govmu.org prior to departure.',
          'Carry passport, return ticket, hotel voucher, and digital entry QR code in your carry-on bag.',
          'Present documents at SSR International Airport (Mauritius) immigration counter for free, instant visa-on-arrival entry stamping.'
        ],
        costs: {
          visa_fee: '₹0 (Free / No Consular Fee)',
          service_fee: '₹0 (No Appointment Needed)',
          total_fee: '₹0 (Free on Arrival)',
          notes: 'Indian citizens traveling for tourism are granted a free tourist visa on arrival for up to 60 days.'
        },
        processing_and_timing: {
          apply_window: 'No prior visa application needed. Complete Mauritius All-in-One Digital Form online before flight.',
          decision_time: 'Instant on-arrival stamping at SSR International Airport (Mauritius).',
          max_extension: 'Extendable up to 90 days total for holiday/tourism via Passport & Immigration Office in Port Louis.',
          center_notes: 'Entry granted directly at SSR International Airport (MRU) / Port Louis Seaport.'
        }
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // THAILAND PATHWAYS (Visa-Free Policy)
  // ═══════════════════════════════════════════════════════════════
  if (isThailand && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Thailand',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Visa Exemption / Visa-Free (60 Days)',
      source_url: 'https://www.thaievisa.go.th',
      official_source_name: 'Royal Thai Immigration Bureau & Ministry of Foreign Affairs',
      processing_time: 'Instant / On-Arrival (0 Days)',
      validity: '60 Days on Arrival',
      stay_duration: 'Up to 60 Days (Extendable by 30 Days)',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '60 Days on Arrival',
        max_stay_per_entry: 'Up to 60 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months with 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Verifiable ticket leaving Thailand within 60 days.',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Hotel booking or host invitation in Thailand.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: '10,000 THB per person / 20,000 THB per family (approx. ₹24,000 – ₹48,000)',
          time_frame: 'Carried during travel',
          notes: 'Held in cash or liquid card funds.'
        }
      ],
      other_requirements: [
        {
          category: 'Entry Stamping',
          details: 'Direct immigration entry stamp on arrival at Bangkok Suvarnabhumi (BKK), Don Mueang (DMK), or Phuket (HKT).'
        }
      ],
      how_to_apply: [
        'Ensure passport has at least 6 months validity.',
        'Book confirmed return flight and hotel accommodation.',
        'Board flight to Thailand with documents in carry-on bag.',
        'Present passport and return flight ticket at Thai Immigration counter for free 60-day entry stamp.'
      ],
      costs: {
        visa_fee: '₹0 (Free Visa Exemption)',
        service_fee: '₹0 (No Appointment Needed)',
        total_fee: '₹0 (Free Entry)',
        notes: 'Indian passport holders receive 60-day visa-free entry under official Thai government exemption.'
      },
      processing_and_timing: {
        apply_window: 'No advance application required.',
        decision_time: 'Instant on-arrival stamping (0 Days).',
        max_extension: 'Can be extended for an additional 30 days at local Thai immigration offices for 1,900 THB.',
        center_notes: 'Available at all international airports in Thailand (BKK, DMK, HKT, CNX).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // MALAYSIA PATHWAYS (Visa-Free Policy with MDAC)
  // ═══════════════════════════════════════════════════════════════
  if (isMalaysia && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Malaysia',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Visa-Free Entry (30 Days with MDAC)',
      source_url: 'https://imigresen-online.imi.gov.my/mdac/main',
      official_source_name: 'Immigration Department of Malaysia',
      processing_time: 'Instant / On-Arrival (0 Days)',
      validity: '30 Days on Arrival',
      stay_duration: 'Up to 30 Days',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '30 Days on Arrival',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from arrival date with 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Malaysia Digital Arrival Card (MDAC)',
          description: 'Mandatory online arrival form submitted within 3 days prior to arrival at imigresen-online.imi.gov.my/mdac.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Confirmed round-trip ticket departing Malaysia within 30 days.',
          is_mandatory: true
        },
        {
          title: 'Hotel Reservation / Accommodation Voucher',
          description: 'Confirmed hotel booking or proof of residence in Malaysia.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Maintenance Funds Proof',
          minimum_balance_or_amount: 'USD $500 – $1,000 or equivalent',
          time_frame: 'Carried during travel',
          notes: 'Credit cards, debit cards, or cash.'
        }
      ],
      other_requirements: [
        {
          category: 'MDAC Digital Submission',
          details: 'Submit MDAC online within 72 hours before arrival in Malaysia and carry digital/printed confirmation.'
        }
      ],
      how_to_apply: [
        'Ensure passport has 6+ months validity from travel date.',
        'Book confirmed return flight and hotel accommodation.',
        'Submit the online Malaysia Digital Arrival Card (MDAC) within 3 days prior to arrival.',
        'Clear immigration at Kuala Lumpur International Airport (KLIA/KLIA2) for free 30-day entry stamping.'
      ],
      costs: {
        visa_fee: '₹0 (Free / No Consular Fee)',
        service_fee: '₹0 (Free Online MDAC)',
        total_fee: '₹0 (Free on Arrival)',
        notes: 'Indian passport holders enjoy visa-free entry to Malaysia for stays up to 30 days.'
      },
      processing_and_timing: {
        apply_window: 'Submit MDAC online within 3 days (72 hours) of arrival.',
        decision_time: 'Instant clearance on arrival (0 Days).',
        max_extension: 'Non-extendable 30-day social visit pass.',
        center_notes: 'Available at KLIA 1, KLIA 2, Penang, and all Malaysian border points.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // MALDIVES PATHWAYS (Free 30-Day Visa on Arrival)
  // ═══════════════════════════════════════════════════════════════
  if (isMaldives && !purposeLower.includes('work')) {
    return {
      passport_country: from,
      destination_country: 'Maldives',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Free Tourist Visa on Arrival (30 Days)',
      source_url: 'https://imuga.immigration.gov.mv',
      official_source_name: 'Maldives Immigration',
      processing_time: 'Instant / On-Arrival (0 Days)',
      validity: '30 Days on Arrival',
      stay_duration: 'Up to 30 Days (Extendable to 90 Days)',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '30 Days on Arrival',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 1 month (recommended 6 months) with machine-readable zone.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return / Onward Ticket',
          description: 'Valid return air ticket leaving Maldives within 30 days.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Resort / Hotel Booking',
          description: 'Prepaid hotel reservation or resort booking voucher.',
          is_mandatory: true
        },
        {
          title: 'IMUGA Traveler Declaration Form',
          description: 'Mandatory online digital declaration filled within 96 hours before arrival at imuga.immigration.gov.mv.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Travel Solvency Proof',
          minimum_balance_or_amount: 'USD $100 + $50/day or confirmed prepaid resort package',
          time_frame: 'Carried during travel',
          notes: 'Credit cards, cash, or confirmed luxury resort booking voucher.'
        }
      ],
      other_requirements: [
        {
          category: 'IMUGA QR Code',
          details: 'Mandatory QR code generated from IMUGA portal to be scanned at Velana International Airport (MLE).'
        }
      ],
      how_to_apply: [
        'Book confirmed flights and resort accommodation.',
        'Fill out the online IMUGA Traveler Declaration Form within 96 hours before landing.',
        'Present passport, IMUGA QR code, and return ticket to Maldives Immigration officer at MLE airport for free 30-day visa stamp.'
      ],
      costs: {
        visa_fee: '₹0 (Free Visa on Arrival)',
        service_fee: '₹0 (Free IMUGA Portal)',
        total_fee: '₹0 (Free on Arrival)',
        notes: 'All tourists entering Maldives receive a complimentary 30-day visa on arrival.'
      },
      processing_and_timing: {
        apply_window: 'Fill IMUGA online within 96 hours of arrival flight.',
        decision_time: 'Instant on-arrival stamping (0 Days).',
        max_extension: 'Can be extended up to 90 days total at Maldives Immigration HQ in Malé for MVR 750.',
        center_notes: 'Cleared directly at Velana International Airport, Malé (MLE).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // SINGAPORE PATHWAYS (Official ICA e-Visa & SGAC)
  // ═══════════════════════════════════════════════════════════════
  if (isSingapore && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Singapore',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Singapore Entry Visa (e-Visa via ICA / SAVE Portal)',
      source_url: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements',
      official_source_name: 'Immigration & Checkpoints Authority (ICA) Singapore',
      processing_time: '3–5 Business Days',
      validity: '30 Days to 2 Years Multiple Entry',
      stay_duration: 'Up to 30 Days Per Visit',
      entry_type: 'Multiple Entry',
      validity_and_stay: {
        visa_validity: 'Up to 2 Years Multiple Entry',
        max_stay_per_entry: 'Up to 30 Days Per Visit',
        entry_type: 'Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Original passport valid for at least 6 months from the date of entry into Singapore with minimum 2 blank visa pages.',
          is_mandatory: true
        },
        {
          title: 'Form 14A Visa Application Form',
          description: 'Fully completed and signed official Form 14A matching passport details with applicant photograph affixed.',
          is_mandatory: true
        },
        {
          title: 'Passport Photographs — 35×45mm',
          description: 'Two recent color photographs (35mm x 45mm, matte/semi-matte finish, white background, taken within last 3 months, 80% face coverage, no borders).',
          is_mandatory: true
        },
        {
          title: 'SG Arrival Card (SGAC) with Electronic Health Declaration',
          description: 'Mandatory online arrival card submitted within 3 days prior to arrival in Singapore via official ICA portal (eservices.ica.gov.sg) or MyICA Mobile app.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Confirmed round-trip flight booking with verifiable PNR showing entry and exit from Singapore.',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Proof',
          description: 'Confirmed hotel reservations in Singapore for all nights of stay, or an official invitation letter (Form V39A) if staying with a Singapore Citizen/PR.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / NOC',
          description: 'Original leave approval / NOC letter on company letterhead confirming designation, salary, approved leave dates, and return commitment + last 3 months salary slips.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 3–6 Months)',
          minimum_balance_or_amount: 'Minimum ₹1,00,000 – ₹1,50,000 liquid balance',
          time_frame: 'Last 3 to 6 months (original bank-stamped)',
          notes: 'Bank statement with original bank seal and signature showing steady financial standing.'
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 consecutive financial years',
          notes: 'ITR-V acknowledgement copies showing declared annual income.'
        }
      ],
      other_requirements: [
        {
          category: 'Authorized Agent Submission',
          details: 'Applications from India must be submitted online through ICA Authorized Visa Agents (AVAs) or strategic partner agencies. Individual direct filing on SAVE is only permitted if sponsored by a Singapore Citizen/PR.'
        },
        {
          category: 'SGAC Digital Entry Clearance',
          details: 'Submit the Singapore Arrival Card (SGAC) online for free within 72 hours before arrival to ensure seamless biometrics clearance at Changi Airport.'
        }
      ],
      how_to_apply: [
        'Compile mandatory documents: valid passport, Form 14A, 35x45mm photos, flight & hotel bookings, bank statements, and employment NOC.',
        'Submit application through an ICA Authorized Visa Agent (AVA) in India.',
        'Pay the official visa fee of SGD $30 + authorized agency processing fee.',
        'Track application status online on the official ICA SAVE portal.',
        'Receive your official Singapore electronic visa (e-Visa PDF) via email and print it for travel.',
        'Submit SG Arrival Card (SGAC) online within 3 days before flight and clear automated immigration at Changi Airport.'
      ],
      costs: {
        visa_fee: 'SGD $30 (approx. ₹1,900)',
        service_fee: '₹1,000 – ₹1,500 (Authorized Agent Fee)',
        total_fee: '₹3,000 – ₹3,500 Total Reference',
        notes: 'Official ICA consular visa fee is SGD $30. Non-refundable once processed.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 4 weeks before intended departure date.',
        decision_time: 'Standard: 3 to 5 business days after agent submission.',
        max_extension: 'Can be extended for an additional 30 days online via ICA e-Services while in Singapore.',
        center_notes: 'Processed electronically; visa delivered as a digital PDF with QR verification code.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // INDONESIA / BALI PATHWAYS (Official e-VOA & Customs QR)
  // ═══════════════════════════════════════════════════════════════
  if (isIndonesia && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Indonesia',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Electronic Visa on Arrival (e-VOA - B1 Tourist 30 Days)',
      source_url: 'https://evisa.imigrasi.go.id',
      official_source_name: 'Directorate General of Immigration, Ministry of Law & Human Rights, Indonesia',
      processing_time: 'Instant / 1–2 Hours Online (or on Arrival)',
      validity: '90 Days to Enter from Issuance',
      stay_duration: '30 Days (Extendable by 30 Days)',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '90 Days Entry Window',
        max_stay_per_entry: '30 Days (Extendable to 60 Days)',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from the date of arrival in Indonesia with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data Page Scan',
          description: 'Clear color scan of passport bio-data page (PDF or JPEG format, minimum 1500x2000 resolution).',
          is_mandatory: true
        },
        {
          title: 'Passport Size Photograph',
          description: 'Recent color photograph on white background (standard 35x45mm or 4x6cm, JPEG format).',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return / Onward Flight Ticket',
          description: 'Confirmed airline ticket leaving Indonesia within 30 days of arrival.',
          is_mandatory: true
        },
        {
          title: 'Electronic Customs Declaration (e-CD)',
          description: 'Mandatory customs QR code filled online within 3 days prior to arrival at ecd.beacukai.go.id.',
          is_mandatory: true
        },
        {
          title: 'Bali Tourist Levy (Bali Only)',
          description: 'Mandatory provincial tourist levy of IDR 150,000 (approx. ₹800) paid online via lovebali.baliprov.go.id prior to landing in Bali.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'USD $1,000 or equivalent in liquid funds / international credit card',
          time_frame: 'Carried during travel',
          notes: 'Standard spot-check solvency requirement upon arrival.'
        }
      ],
      other_requirements: [
        {
          category: 'Online e-VOA vs. Counter VOA',
          details: 'Applying online at evisa.imigrasi.go.id lets you use automated e-gates at Jakarta (CGK) and Bali Ngurah Rai (DPS) airports, avoiding long queue counters.'
        },
        {
          category: '30-Day In-Country Extension',
          details: 'If obtained online via evisa.imigrasi.go.id, the e-VOA can be extended online for another 30 days with a single click without visiting an immigration office.'
        }
      ],
      how_to_apply: [
        'Visit the official Indonesian immigration portal: evisa.imigrasi.go.id.',
        'Upload your passport bio page and passport photograph.',
        'Pay the official visa fee of IDR 500,000 (approx. ₹2,700 / $35 USD) online via credit card.',
        'Download your approved e-VOA PDF instantly.',
        'Complete the Electronic Customs Declaration (e-CD) at ecd.beacukai.go.id within 3 days before flight.',
        'Pay Bali Tourist Levy on lovebali.baliprov.go.id (if visiting Bali).',
        'Use electronic gates or immigration counters at DPS/CGK airport for rapid clearance.'
      ],
      costs: {
        visa_fee: 'IDR 500,000 (approx. ₹2,700 / $35 USD)',
        service_fee: '₹0 (Official Direct Portal)',
        total_fee: 'IDR 500,000 Total Reference',
        notes: 'Payable online via credit/debit card or in cash/card on arrival at airport counters.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 14 days before your flight date.',
        decision_time: 'Instant / Automated approval in 10 to 60 minutes.',
        max_extension: 'Can be extended once for 30 additional days (total 60 days stay).',
        center_notes: 'Available online for all major entry points: Bali (DPS), Jakarta (CGK), Surabaya (SUB).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // VIETNAM PATHWAYS (Official E-Visa 30/90 Days)
  // ═══════════════════════════════════════════════════════════════
  if (isVietnam && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Vietnam',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Vietnam Electronic Visa (E-Visa - 30 to 90 Days)',
      source_url: 'https://evisa.xuatnhapcanh.gov.vn',
      official_source_name: 'Vietnam Immigration Department (Ministry of Public Security)',
      processing_time: '3 Business Days (72 Hours)',
      validity: '30 or 90 Days Single / Multiple Entry',
      stay_duration: 'Up to 90 Days Per Entry',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: 'Up to 90 Days',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from entry date into Vietnam with at least 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data Page Scan',
          description: 'Clear, full-page color scan of passport bio-data page in JPG format (no glare or cut edges).',
          is_mandatory: true
        },
        {
          title: 'Portrait Digital Photograph (4×6cm)',
          description: 'Straight-looking photo on white background, no glasses, no headwear, taken within 6 months.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return / Onward Flight Ticket',
          description: 'Round-trip air ticket with verifiable PNR booking.',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Vouchers',
          description: 'Confirmed hotel reservations for planned cities (Hanoi, Da Nang, Ho Chi Minh City, etc.).',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Travel Living Funds',
          minimum_balance_or_amount: 'Sufficient funds for trip duration (approx. $500–$1,000 USD)',
          time_frame: 'Carried during travel',
          notes: 'Credit cards, debit cards, or liquid bank funds.'
        }
      ],
      other_requirements: [
        {
          category: 'Designated Entry Checkpoints',
          details: 'You must specify your exact entry and exit international airport/port on the application. Vietnam E-Visa is accepted at 33 international border checkpoints (HAN, SGN, DAD, CXR, PQC, etc.).'
        }
      ],
      how_to_apply: [
        'Visit the official Vietnam Immigration E-Visa portal: evisa.xuatnhapcanh.gov.vn.',
        'Upload your passport bio page scan and portrait photograph.',
        'Fill in personal details, intended entry port, and trip dates.',
        'Pay the official visa fee ($25 USD single entry / $50 USD multiple entry) via credit card.',
        'Save your Registration Code to track application progress.',
        'After 3 business days, search with your code and print your official E-Visa PDF letter for boarding.'
      ],
      costs: {
        visa_fee: '$25 USD Single Entry (₹2,100) / $50 USD Multiple Entry (₹4,200)',
        service_fee: '₹0 (Official Direct Portal)',
        total_fee: '$25 – $50 USD Total Reference',
        notes: 'Non-refundable fee paid directly on the official government payment gateway.'
      },
      processing_and_timing: {
        apply_window: 'Apply 7 to 20 days before planned flight.',
        decision_time: 'Standard: 3 business days (72 hours).',
        max_extension: 'Can apply for 90-day multiple-entry e-visa directly online.',
        center_notes: '100% digital electronic visa grant with QR code validation.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // JAPAN PATHWAYS (Official JAPAN eVISA & VFS)
  // ═══════════════════════════════════════════════════════════════
  if (isJapan && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Japan',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Japan Short-Term Tourist eVisa (Single Entry 90 Days)',
      source_url: 'https://www.evisa.mofa.go.jp',
      official_source_name: 'Ministry of Foreign Affairs of Japan (MOFA) & Embassy of Japan',
      processing_time: '5–7 Business Days',
      validity: '3 Months from Date of Issue',
      stay_duration: 'Up to 15, 30, or 90 Days',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '3 Months from Date of Issue',
        max_stay_per_entry: 'Up to 15, 30, or 90 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Original passport valid for at least 6 months with minimum 2 blank visa pages.',
          is_mandatory: true
        },
        {
          title: 'Visa Application Form',
          description: 'Completed Japan visa application form with signature matching passport.',
          is_mandatory: true
        },
        {
          title: 'Passport Photograph — 45×35mm (or 2×2 inch)',
          description: '1 recent photo taken within 6 months, white background, neutral expression, no borders.',
          is_mandatory: true
        },
        {
          title: 'Detailed Schedule of Stay (Taizai Nitteihyo)',
          description: 'Day-by-day travel itinerary form outlining dates, planned activities, hotel names, addresses, and telephone numbers in Japan.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Flight Reservations',
          description: 'Round-trip flight booking with verifiable PNR (refundable or reservation only).',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Hotel booking vouchers for every night of stay in Japan (Tokyo, Kyoto, Osaka, etc.).',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / Occupation',
          description: 'Employer NOC / Leave Approval Letter on company letterhead stating designation, salary, joining date, and approved leave + salary slips for last 3 months.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 6 Months)',
          minimum_balance_or_amount: 'Minimum ₹1,50,000 – ₹2,50,000 liquid balance',
          time_frame: 'Last 6 consecutive months (bank-stamped original)',
          notes: 'Bank statement with original bank seal and branch manager signature demonstrating steady financial solvency.'
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 to 3 financial years',
          notes: 'ITR-V acknowledgement copies filed with the Income Tax Department of India.'
        }
      ],
      other_requirements: [
        {
          category: 'JAPAN eVISA Portal & Electronic Issuance',
          details: 'Indian passport holders residing in India can apply online via the JAPAN eVISA portal (evisa.mofa.go.jp) through accredited VFS agencies, receiving an official digital "Visa Issuance Notice".'
        },
        {
          category: 'Visit Japan Web (Fast Track Entry)',
          details: 'Register on vjw-lp.digital.go.jp before departure for immigration and customs QR code clearance at Narita (NRT), Haneda (HND), and Kansai (KIX) airports.'
        }
      ],
      how_to_apply: [
        'Complete the Japan visa application form and draft your day-by-day Schedule of Stay itinerary.',
        'Compile your document dossier: passport, photos, flight/hotel bookings, 6-month bank statements, ITR, and employer NOC.',
        'Submit application online via JAPAN eVISA portal or at nearest VFS Global Japan center.',
        'Pay official consular fee of 3,000 JPY + VFS logistics fee.',
        'Track application status (takes 5 to 7 business days).',
        'Receive your official digital Electronic Visa Issuance Notice or collect stamped passport from VFS.'
      ],
      costs: {
        visa_fee: '3,000 JPY (approx. ₹1,700)',
        service_fee: '₹750 – ₹1,200 (VFS Processing Fee)',
        total_fee: '₹2,500 – ₹3,000 Total Reference',
        notes: 'Consular visa fee is 3,000 JPY for single-entry tourist visa.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 6 weeks before planned travel date.',
        decision_time: 'Standard: 5 to 7 working days from date of submission.',
        max_extension: 'Single entry valid for 3 months from issuance date.',
        center_notes: 'Handled via Embassy of Japan in New Delhi, Consulates in Mumbai, Chennai, Kolkata, and Bengaluru, and VFS Japan centers.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // SRI LANKA PATHWAYS (Official ETA / e-Visa)
  // ═══════════════════════════════════════════════════════════════
  if (isSriLanka && !purposeLower.includes('work') && !purposeLower.includes('study')) {
    return {
      passport_country: from,
      destination_country: 'Sri Lanka',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Sri Lanka Electronic Travel Authorization (ETA / e-Visa - 30 Days Double Entry)',
      source_url: 'https://www.srilankaevisa.lk',
      official_source_name: 'Department of Immigration and Emigration, Sri Lanka',
      processing_time: 'Instant / 24–48 Hours Online',
      validity: '180 Days from Date of Approval',
      stay_duration: '30 Days (Double Entry, Extendable to 180 Days)',
      entry_type: 'Double Entry',
      validity_and_stay: {
        visa_validity: '180 Days Validity',
        max_stay_per_entry: '30 Days Per Visit (Double Entry)',
        entry_type: 'Double Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from the date of arrival in Sri Lanka with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return / Onward Flight Ticket',
          description: 'Confirmed air ticket leaving Sri Lanka within 30 days of arrival.',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Hotel booking reservation or host address in Sri Lanka.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Maintenance Travel Funds',
          minimum_balance_or_amount: 'USD $30–$50 per day of intended stay',
          time_frame: 'Carried during travel',
          notes: 'International credit card, debit card, or currency cash.'
        }
      ],
      other_requirements: [
        {
          category: 'Double Entry Facility',
          details: 'Standard tourist ETA grants double entry within 30 days from the initial date of entry.'
        }
      ],
      how_to_apply: [
        'Visit the official Sri Lanka eVisa portal: srilankaevisa.lk.',
        'Select 30-Day Standard Tourist ETA and fill in passport details.',
        'Upload passport bio page scan and photograph if requested.',
        'Pay the nominal processing fee online via credit card.',
        'Receive your official Electronic Travel Authorization approval notice via email.',
        'Present ETA approval letter and passport at Colombo (CMB) airport immigration for entry stamping.'
      ],
      costs: {
        visa_fee: '$20 – $50 USD (approx. ₹1,700 – ₹4,200, subject to periodic fee waivers for Indian tourists)',
        service_fee: '₹0 (Official Portal)',
        total_fee: '₹1,700 – ₹4,200 Total Reference',
        notes: 'Periodic fee waivers for Indian citizens apply per Sri Lankan government bilateral agreements.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 15 days before your flight.',
        decision_time: 'Automated processing within 24 to 48 hours.',
        max_extension: 'Can be extended up to 180 days total at Department of Immigration in Battaramulla, Colombo.',
        center_notes: 'Instant digital authorization linked directly to your passport number.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // SAUDI ARABIA PATHWAYS (Official KSA Tourist eVisa / Tasheer)
  // ═══════════════════════════════════════════════════════════════
  if (isSaudi) {
    return {
      passport_country: from,
      destination_country: 'Saudi Arabia',
      purpose_of_visit: 'Tourism / Umrah / Vacation',
      visa_type: 'Saudi Arabia Tourist eVisa / Consular Visa (1-Year Multiple Entry)',
      source_url: 'https://visa.visitsaudi.com',
      official_source_name: 'Ministry of Foreign Affairs (MOFA) Saudi Arabia & Saudi Tourism Authority',
      processing_time: '24–72 Hours Online (or 3–5 Days via Tasheer)',
      validity: '1 Year Multiple Entry from Issuance',
      stay_duration: 'Up to 90 Days Per Visit',
      entry_type: 'Multiple Entry',
      validity_and_stay: {
        visa_validity: '1 Year Multiple Entry',
        max_stay_per_entry: 'Up to 90 Days Per Visit',
        entry_type: 'Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Original passport valid for at least 6 months beyond travel date with minimum 2 blank visa pages.',
          is_mandatory: true
        },
        {
          title: 'Digital Passport Photograph — 2×2 inch / 35×45mm',
          description: 'Recent color photograph on pure white background, neutral expression, without glasses.',
          is_mandatory: true
        },
        {
          title: 'Mandatory Saudi Health & Medical Insurance',
          description: 'Mandatory health insurance policy automatically issued and bundled with visa fee covering SAR 100,000 emergency medical care across Saudi Arabia.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket to Riyadh, Jeddah, Dammam, or Medina with verifiable PNR.',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Proof',
          description: 'Confirmed hotel reservations in Saudi Arabia for the duration of stay.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (If applying via Tasheer)',
          minimum_balance_or_amount: 'Minimum ₹1,00,000 – ₹1,50,000 liquid balance',
          time_frame: 'Last 3 to 6 months bank statement',
          notes: 'Bank-stamped original required only when applying via Tasheer VFS center (waived for online instant eVisa if holding valid US/UK/Schengen visa).'
        }
      ],
      other_requirements: [
        {
          category: 'Instant eVisa Eligibility',
          details: 'Indian passport holders who hold a valid, used tourist or business visa from USA, UK, or Schengen Area, or permanent residency in US/UK/EU/GCC, qualify for Instant eVisa on visa.visitsaudi.com or Visa on Arrival at Saudi airports.'
        },
        {
          category: 'Umrah Permitted',
          details: 'Tourist visa holders are officially permitted to perform Umrah in Mecca and visit Medina outside the designated Hajj season.'
        }
      ],
      how_to_apply: [
        'Check instant eVisa eligibility on official portal: visa.visitsaudi.com.',
        'Upload passport bio page and white background photo.',
        'Pay official visa fee (SAR 395–535) which includes government healthcare insurance.',
        'Receive your official Saudi Electronic Visa PDF via email within 24 to 72 hours.',
        'If not holding US/UK/Schengen visa, book an appointment at Tasheer (VFS Tasheer) center in your city for biometric submission.'
      ],
      costs: {
        visa_fee: 'SAR 395 – SAR 535 (approx. ₹8,800 – ₹11,900, Includes Mandatory Insurance)',
        service_fee: '₹0 (Online Portal) / ₹2,000 (Tasheer Center)',
        total_fee: 'SAR 395 – 535 Total Reference',
        notes: 'Includes full emergency medical hospitalization insurance covering up to SAR 100,000.'
      },
      processing_and_timing: {
        apply_window: 'Apply 1 to 3 weeks before travel.',
        decision_time: 'Online eVisa: 24 to 48 hours. Tasheer Consular: 3 to 5 business days.',
        max_extension: '1-Year multiple-entry visa valid for stays up to 90 days per entry (max 180 days total per year).',
        center_notes: 'Available at Riyadh (RUH), Jeddah (JED), Dammam (DMM), Medina (MED).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // QATAR PATHWAYS (Official Free 30-Day Visa on Arrival / Hayya)
  // ═══════════════════════════════════════════════════════════════
  if (isQatar) {
    return {
      passport_country: from,
      destination_country: 'Qatar',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Qatar Free Tourist Visa on Arrival (30 Days, Extendable to 60 Days)',
      source_url: 'https://visitqatar.com/intl-en/practical-info/visas',
      official_source_name: 'Ministry of Interior (MOI) Qatar & Qatar Tourism',
      processing_time: 'Instant / On-Arrival (0 Days) or Online via Hayya Portal',
      validity: '30 Days on Arrival',
      stay_duration: 'Up to 30 Days (Extendable by 30 Days)',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '30 Days on Arrival',
        max_stay_per_entry: 'Up to 30 Days (Extendable to 60 Days)',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from the date of arrival in Qatar with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Confirmed return or onward flight booking departing Hamad International Airport (DOH).',
          is_mandatory: true
        },
        {
          title: 'Mandatory Hotel Booking via Discover Qatar',
          description: 'Confirmed hotel reservation for your entire stay duration booked strictly through the official Discover Qatar portal (discoverqatar.qa). Hotel bookings from third-party sites are NOT accepted for Indian passport holders on arrival.',
          is_mandatory: true
        },
        {
          title: 'Mandatory Qatar Health Insurance Policy',
          description: 'Official emergency health insurance policy purchased for QAR 50 (approx. ₹1,150) from a Ministry of Public Health (MOPH) approved Qatari insurance company.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Credit Card / Living Funds Proof',
          minimum_balance_or_amount: 'International credit card or minimum QAR 5,000 / USD $1,400 in cash',
          time_frame: 'Carried during travel',
          notes: 'Standard spot-check requirement at Hamad International Airport immigration.'
        }
      ],
      other_requirements: [
        {
          category: 'Discover Qatar Mandate',
          details: 'Indian passport holders utilizing the free Visa on Arrival scheme MUST have their hotel booking confirmed through discoverqatar.qa. Alternatively, apply online in advance via the Hayya Portal (hayya.qa).'
        },
        {
          category: 'Hayya Portal Option',
          details: 'You can also obtain a guaranteed entry permit online in advance via the official Hayya Portal (hayya.qa) for QAR 100.'
        }
      ],
      how_to_apply: [
        'Book confirmed return flight tickets to Doha (DOH).',
        'Book your hotel stay strictly via the official Discover Qatar website: discoverqatar.qa.',
        'Purchase mandatory QAR 50 visitor health insurance online from an approved Qatari insurer.',
        'Board your flight with passport, Discover Qatar voucher, return ticket, and health insurance.',
        'Present documents at Hamad International Airport immigration counter for free 30-day entry stamp.'
      ],
      costs: {
        visa_fee: 'QAR 0 (Free Visa on Arrival)',
        service_fee: 'QAR 50 (approx. ₹1,150 for Mandatory MOPH Health Insurance)',
        total_fee: 'QAR 50 Total Reference',
        notes: 'Visa on arrival is 100% free of charge. Only mandatory insurance and Discover Qatar lodging apply.'
      },
      processing_and_timing: {
        apply_window: 'No advance consular filing required (or apply on Hayya within 30 days).',
        decision_time: 'Instant stamping at Hamad International Airport (0 Days).',
        max_extension: 'Can be extended online for another 30 days via Ministry of Interior (MOI) portal.',
        center_notes: 'Cleared directly at Hamad International Airport (DOH).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // ROMANIA PATHWAYS (Official Ministry of Foreign Affairs - eVisa Romania / Schengen Type C)
  // ═══════════════════════════════════════════════════════════════
  if (isRomania) {
    return {
      passport_country: from,
      destination_country: 'Romania',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Romania Short-Stay Schengen Visa (Type C) / National Visa C/TU',
      source_url: 'https://evisa.mae.ro',
      official_source_name: 'Ministry of Foreign Affairs Romania (MAE) & Embassy of Romania in New Delhi',
      processing_time: '15 Calendar Days (Standard) / Up to 45 Days (Peak)',
      validity: 'Up to 90 Days in any 180-Day Period',
      stay_duration: 'Up to 90 Days (Schengen 90/180 Rule)',
      entry_type: 'Single / Double / Multiple Entry',
      validity_and_stay: {
        visa_validity: 'Up to 90 Days within 180-Day Period',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single / Double / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 3 months beyond intended departure from Schengen area, issued within the last 10 years, with at least 2 blank visa pages.',
          is_mandatory: true
        },
        {
          title: 'eVisa Romania Application Form & Barcode Receipt',
          description: 'Completed and electronically registered visa application form printed from the official evisa.mae.ro portal.',
          is_mandatory: true
        },
        {
          title: 'Digital Passport Photographs (2 Copies)',
          description: 'Recent 35x45mm color photographs on light/white background meeting ICAO biometric standards.',
          is_mandatory: true
        },
        {
          title: 'Schengen Travel Medical Insurance',
          description: 'Mandatory insurance policy covering minimum €30,000 for emergency medical hospitalization and repatriation across the entire Schengen Area.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket / Reservation',
          description: 'Round-trip air ticket reservation showing entry into and departure from Romania / Schengen territory.',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation / Hotel Booking',
          description: 'Confirmed hotel reservations covering entire stay or official invitation certified by the General Inspectorate for Immigration (IGI) if visiting relatives/friends.',
          is_mandatory: true
        },
        {
          title: 'Bank Statements & Financial Solvency',
          description: 'Stamped bank account statements for the last 3–6 months demonstrating at least €50/day of stay (minimum €500 total).',
          is_mandatory: true
        },
        {
          title: 'Employment Proof & Leave NOC',
          description: 'Letter from employer on company letterhead confirming designation, salary slips (last 3 months), and approved leave dates (or Business Registration / GST certificate for self-employed).',
          is_mandatory: true
        },
        {
          title: 'Cover Letter & Travel Itinerary',
          description: 'Personal cover letter outlining purpose of visit, planned cities (Bucharest, Brașov, Cluj-Napoca, etc.), and detailed daily schedule.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Daily Subsistence Benchmark',
          minimum_balance_or_amount: '€50 per day of stay (Minimum €500 for entire duration)',
          time_frame: 'Last 3 to 6 Months Bank Statements',
          notes: 'Must be original stamped statements or verified international credit cards with limit certificate.'
        },
        {
          type: 'Tax & Income Verification',
          minimum_balance_or_amount: 'ITR-V Acknowledgement (Last 2 Years)',
          time_frame: 'Preceding 2 Assessment Years',
          notes: 'Standard economic ties verification required by consular visa officers.'
        }
      ],
      other_requirements: [
        {
          category: 'Schengen Area 90/180 Rule',
          details: 'Romania is a member of the European Union and Schengen Area. Total stay across all Schengen member states cannot exceed 90 days within any 180-day window.'
        },
        {
          category: 'Special Exemption for Multi-Entry Schengen Visa Holders',
          details: 'Indian nationals holding a valid 2-or-multiple entry Schengen visa, or Bulgarian/Cypriot visa/residence permit do NOT require a separate Romanian visa (stay permitted up to 90 days in 180 days).'
        },
        {
          category: 'Online Pre-Validation Mandatory',
          details: 'Applicants must first upload and have all documents validated online on the official evisa.mae.ro portal before securing an in-person biometrics appointment at the Embassy / VAC.'
        }
      ],
      how_to_apply: [
        'eVisa Portal Registration: Create an account and submit your electronic visa dossier on the official MAE portal: evisa.mae.ro.',
        'Online Consular Validation: The Consular Section of the Embassy of Romania reviews the uploaded documents and issues validation for appointment booking.',
        'Appointment Booking & Biometrics: Schedule and attend your consular / VAC appointment in New Delhi, Mumbai, or authorized visa centers with original passport and physical documents.',
        'Biometric Submission: Provide 10-digit fingerprint scans and facial biometrics during the in-person appointment.',
        'Visa Fee Payment: Pay the official Schengen visa fee of €90 (approx. ₹8,100) + VAC logistical fee.',
        'Decision & Passport Collection: Track your file status online and collect your stamped passport once processing is concluded.'
      ],
      costs: {
        visa_fee: '€90 (approx. ₹8,100) Standard Consular Schengen Fee (Children 6-12: €45; Under 6: Free)',
        service_fee: '€30–€35 VAC Global Biometrics Service Charge',
        total_fee: '€90 Official Consular Fee + VAC Logistics',
        notes: 'Non-refundable official consular processing fee mandated under European Union Schengen Visa Code.'
      },
      processing_and_timing: {
        apply_window: 'Apply between 6 months and 15 working days prior to scheduled departure.',
        decision_time: 'Standard: 15 Calendar Days (up to 45 calendar days during peak seasons or when extended background checks apply).',
        max_extension: 'Short-stay visas cannot be extended except for exceptional force majeure reasons.',
        center_notes: 'Embassy of Romania in New Delhi & Consulate General in Mumbai / VFS Global Visa Application Centers.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // OMAN PATHWAYS (Official Royal Oman Police eVisa)
  // ═══════════════════════════════════════════════════════════════
  if (isOman) {
    return {
      passport_country: from,
      destination_country: 'Oman',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Oman Tourist eVisa (26B 30-Day Single Entry / 36B 1-Year Multiple Entry)',
      source_url: 'https://evisa.rop.gov.om',
      official_source_name: 'Royal Oman Police (ROP) Directorate General of Passports & Residence',
      processing_time: '24–48 Hours Online',
      validity: '30 Days to Enter from Issuance',
      stay_duration: 'Up to 30 Days Per Visit',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '30 Days / 1 Year',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from entry date with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data Page Scan',
          description: 'High-resolution color scan of passport details page.',
          is_mandatory: true
        },
        {
          title: 'Digital Passport Photograph',
          description: 'Recent color photograph on white background (standard 35x45mm, JPEG format).',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket departing Muscat (MCT) or Salalah (SLL).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Voucher',
          description: 'Confirmed hotel reservations in Oman for duration of visit.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'OMR 200–300 or credit cards / liquid bank balance',
          time_frame: 'Carried during travel',
          notes: 'Standard self-sufficiency check upon airport arrival.'
        }
      ],
      other_requirements: [
        {
          category: 'Visa-Free 14-Day Rule for Visa Holders',
          details: 'Indian passport holders with a valid, used visa or residency from USA, UK, Canada, Japan, Australia, or Schengen countries are eligible for 14-Day Visa-Free Entry to Oman.'
        }
      ],
      how_to_apply: [
        'Visit the official Royal Oman Police portal: evisa.rop.gov.om.',
        'Select Tourist eVisa (Type 26B for 30 days) and enter passport details.',
        'Upload passport bio page scan and digital photograph.',
        'Pay the official visa fee of OMR 20 (approx. ₹4,300) online via credit card.',
        'Download and print your official Oman Electronic Visa Grant notice.'
      ],
      costs: {
        visa_fee: 'OMR 20 (approx. ₹4,300 for 30-Day Visa) / OMR 50 (1-Year Multiple Entry)',
        service_fee: '₹0 (Official Direct Portal)',
        total_fee: 'OMR 20 Total Reference',
        notes: 'Non-refundable fee paid directly on official Royal Oman Police gateway.'
      },
      processing_and_timing: {
        apply_window: 'Apply 7 to 20 days before intended travel date.',
        decision_time: 'Standard: 24 to 48 hours.',
        max_extension: 'Can be extended once for 30 additional days for OMR 20.',
        center_notes: 'Electronic visa accepted at Muscat International Airport (MCT) and all land border crossings.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // BAHRAIN PATHWAYS (Official Bahrain Tourist eVisa)
  // ═══════════════════════════════════════════════════════════════
  if (isBahrain) {
    return {
      passport_country: from,
      destination_country: 'Bahrain',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Bahrain Tourist eVisa (14 / 30 Days Multiple Entry)',
      source_url: 'https://www.evisa.gov.bh',
      official_source_name: 'Nationality, Passports & Residence Affairs (NPRA), Kingdom of Bahrain',
      processing_time: '3–5 Business Days',
      validity: '30 Days to 3 Months from Issuance',
      stay_duration: '14 to 30 Days Per Entry',
      entry_type: 'Multiple Entry',
      validity_and_stay: {
        visa_validity: '30 Days to 3 Months',
        max_stay_per_entry: '14 to 30 Days',
        entry_type: 'Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 6 months with 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data & Last Page Scan',
          description: 'Color copy of passport bio page and address page.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket departing Bahrain International Airport (BAH).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Host Proof',
          description: 'Confirmed hotel reservation or CPR copy of resident host in Bahrain.',
          is_mandatory: true
        },
        {
          title: 'Bank Account Statements (Last 3 Months)',
          description: 'Stamped bank statement showing closing balance of at least USD $1,000 / BHD 300 / ₹85,000.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 3 Months)',
          minimum_balance_or_amount: 'Minimum USD $1,000 (approx. ₹85,000 / BHD 300) closing balance',
          time_frame: 'Last 3 consecutive months',
          notes: 'Bank stamped copy must be uploaded during online application.'
        }
      ],
      other_requirements: [
        {
          category: '100% Online Paperless Visa',
          details: 'Official eVisa is issued electronically; print the approval notice and present it at airport check-in.'
        }
      ],
      how_to_apply: [
        'Visit the official Bahrain eVisa portal: evisa.gov.bh.',
        'Upload passport scan, return flight ticket, hotel booking, and 3-month bank statement.',
        'Pay application and issuance fee online via credit card.',
        'Track application status using your Application Reference Number.',
        'Download and print the approved Bahrain Electronic Visa document.'
      ],
      costs: {
        visa_fee: 'BHD 9 – BHD 29 (approx. ₹2,000 – ₹6,400 depending on single vs multiple entry)',
        service_fee: 'BHD 4 (Application Processing Fee)',
        total_fee: 'BHD 9 – 29 Total Reference',
        notes: 'Paid online directly on official Bahrain NPRA portal.'
      },
      processing_and_timing: {
        apply_window: 'Apply 10 to 30 days before travel.',
        decision_time: 'Standard: 3 to 5 business days.',
        max_extension: 'Extendable online via NPRA website while in Bahrain.',
        center_notes: 'Available at Bahrain International Airport (BAH).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // EGYPT PATHWAYS (Official Egypt Tourist e-Visa)
  // ═══════════════════════════════════════════════════════════════
  if (isEgypt) {
    return {
      passport_country: from,
      destination_country: 'Egypt',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Egypt Tourist e-Visa (30 Days Single / Multiple Entry)',
      source_url: 'https://www.visa2egypt.gov.eg',
      official_source_name: 'Ministry of Interior & Arab Republic of Egypt Visa Portal',
      processing_time: '5–7 Business Days',
      validity: '90 Days to Enter from Date of Issue',
      stay_duration: 'Up to 30 Days Per Entry',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '90 Days Entry Window',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 6 months from arrival date with 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data Page Scan',
          description: 'Clear color scan of passport details page in JPG/PNG format.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket departing Cairo (CAI), Hurghada (HRG), or Sharm El Sheikh (SSH).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Tour Itinerary',
          description: 'Confirmed hotel reservations for planned tourist cities (Cairo, Giza, Luxor, Aswan).',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'Minimum USD $500 – $1,000 in cash, cards, or bank balance',
          time_frame: 'Carried during travel',
          notes: 'Standard tourist subsistence check.'
        }
      ],
      other_requirements: [
        {
          category: 'Visa on Arrival for Visa Holders',
          details: 'Indian passport holders with a valid, used visa from USA, UK, Schengen, Japan, Canada, Australia, or New Zealand qualify for a 30-Day Visa on Arrival for $25 USD at Cairo Airport.'
        }
      ],
      how_to_apply: [
        'Create an account on the official Egypt e-Visa portal: visa2egypt.gov.eg.',
        'Upload your passport bio page scan and fill in travel itinerary.',
        'Pay the official visa fee ($25 USD single entry / $60 USD multiple entry) via credit card.',
        'Receive your official approved e-Visa PDF document via email.',
        'Print your e-Visa and present it upon arrival at Cairo or Sharm El Sheikh international airports.'
      ],
      costs: {
        visa_fee: '$25 USD Single Entry (approx. ₹2,100) / $60 USD Multiple Entry (approx. ₹5,000)',
        service_fee: '₹0 (Official Direct Portal)',
        total_fee: '$25 – $60 USD Total Reference',
        notes: 'Non-refundable fee paid directly on the official Egyptian government portal.'
      },
      processing_and_timing: {
        apply_window: 'Apply at least 7 to 15 days before your flight date.',
        decision_time: 'Standard: 5 to 7 business days.',
        max_extension: 'Can be extended up to 6 months at Mogamma / Passports Directorate in Cairo.',
        center_notes: 'Valid across all international airports in Egypt.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // KENYA PATHWAYS (Official Kenya eTA 100% Digital)
  // ═══════════════════════════════════════════════════════════════
  if (isKenya) {
    return {
      passport_country: from,
      destination_country: 'Kenya',
      purpose_of_visit: 'Tourism / Safari / Vacation',
      visa_type: 'Kenya Electronic Travel Authorisation (eTA - Replacing Old Visa)',
      source_url: 'https://www.etakenya.go.ke',
      official_source_name: 'Directorate of Immigration Services, Republic of Kenya',
      processing_time: '72 Hours (3 Business Days)',
      validity: '90 Days from Date of Approval',
      stay_duration: 'Up to 90 Days Per Entry',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '90 Days Entry Window',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 6 months beyond travel date with at least 1 blank page.',
          is_mandatory: true
        },
        {
          title: 'Passport Selfie / Digital Photo',
          description: 'Clear selfie photo taken on plain background (or 35x45mm passport photo).',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return / Onward Flight Ticket',
          description: 'Confirmed air ticket leaving Kenya within 90 days.',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Safari Camp Voucher',
          description: 'Confirmed hotel reservation or official safari tour operator itinerary.',
          is_mandatory: true
        },
        {
          title: 'Yellow Fever Vaccination Certificate (If Applicable)',
          description: 'Mandatory if arriving from or transiting for 12+ hours through a yellow fever endemic country.',
          is_mandatory: false
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'USD $500 – $1,000 in cash or international credit card',
          time_frame: 'Carried during travel',
          notes: 'Standard solvency check.'
        }
      ],
      other_requirements: [
        {
          category: 'Mandatory Prior eTA Mandate',
          details: 'Kenya is now 100% visa-free but requires ALL international travelers to have an approved electronic Travel Authorisation (eTA) BEFORE boarding flights. No visas on arrival.'
        }
      ],
      how_to_apply: [
        'Visit the official Kenya government eTA portal: etakenya.go.ke.',
        'Upload your passport bio page, selfie photo, flight tickets, and hotel/safari booking.',
        'Pay the official eTA fee of $34 USD online via credit card.',
        'Receive your official Kenya eTA document with QR code via email within 72 hours.',
        'Present your printed or digital eTA upon departure and at Jomo Kenyatta International Airport (NBO).'
      ],
      costs: {
        visa_fee: '$34 USD (approx. ₹2,850)',
        service_fee: '₹0 (Official Direct Portal)',
        total_fee: '$34 USD Total Reference',
        notes: 'Mandatory for all visitors to Kenya; replaces the legacy tourist visa.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 days to 3 months before your flight.',
        decision_time: 'Standard: 72 hours (3 business days). Express available.',
        max_extension: 'Can be extended up to 180 days total at Immigration Headquarters in Nairobi.',
        center_notes: 'Accepted at Nairobi (NBO), Mombasa (MBA), and all entry points.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // TANZANIA PATHWAYS (Official Tourist eVisa & Zanzibar)
  // ═══════════════════════════════════════════════════════════════
  if (isTanzania) {
    return {
      passport_country: from,
      destination_country: 'Tanzania',
      purpose_of_visit: 'Tourism / Safari / Vacation',
      visa_type: 'Tanzania Ordinary Tourist eVisa (Single Entry 90 Days)',
      source_url: 'https://visa.immigration.go.tz',
      official_source_name: 'Immigration Services Department, United Republic of Tanzania',
      processing_time: '5–10 Working Days (or Visa on Arrival)',
      validity: '90 Days from Date of Issue',
      stay_duration: 'Up to 90 Days',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '90 Days',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 6 months with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Digital Passport Photograph',
          description: 'Recent color photo on white background (JPEG/PNG format).',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Air Ticket',
          description: 'Round-trip air ticket departing Dar es Salaam (DAR), Kilimanjaro (JRO), or Zanzibar (ZNZ).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Safari Itinerary',
          description: 'Confirmed hotel reservations or safari package voucher.',
          is_mandatory: true
        },
        {
          title: 'Zanzibar Inbound Travel Insurance (Zanzibar Only)',
          description: 'Mandatory inbound travel health insurance ($44 USD via visitzanzibar.go.tz) required for all visitors entering Zanzibar archipelago.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'USD $500 – $1,000 in cash or card',
          time_frame: 'Carried during travel',
          notes: 'Standard spot-check.'
        }
      ],
      other_requirements: [
        {
          category: 'Zanzibar Insurance Mandate',
          details: 'Visitors entering Zanzibar must obtain the official Zanzibar Inbound Travel Insurance on visitzanzibar.go.tz regardless of other international travel insurance policies.'
        }
      ],
      how_to_apply: [
        'Visit the official Tanzania eVisa portal: visa.immigration.go.tz.',
        'Upload passport bio page and passport photograph.',
        'Pay the official visa fee of $50 USD online via credit card.',
        'Download your approved Tanzania Electronic Visa Grant notice.',
        'Purchase mandatory Zanzibar insurance on visitzanzibar.go.tz (if visiting Zanzibar).'
      ],
      costs: {
        visa_fee: '$50 USD (approx. ₹4,200)',
        service_fee: '$44 USD (Mandatory Zanzibar Insurance if visiting Zanzibar)',
        total_fee: '$50 – $94 USD Total Reference',
        notes: 'Payable online directly via official government payment system.'
      },
      processing_and_timing: {
        apply_window: 'Apply 2 to 4 weeks before travel.',
        decision_time: 'Standard: 5 to 10 business days.',
        max_extension: 'Extendable up to 6 months at Immigration Office in Dar es Salaam.',
        center_notes: 'Available at DAR, JRO, ZNZ airports and land borders.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // SOUTH AFRICA PATHWAYS (Official Visitor Visa via VFS)
  // ═══════════════════════════════════════════════════════════════
  if (isSouthAfrica) {
    return {
      passport_country: from,
      destination_country: 'South Africa',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'South Africa Visitor Visa (Section 11(1) Tourist - 90 Days)',
      source_url: 'https://www.vfsglobal.com/southafrica/india',
      official_source_name: 'Department of Home Affairs (DHA) South Africa & High Commission of South Africa',
      processing_time: '10–15 Business Days',
      validity: '3 Months from Date of Issue',
      stay_duration: 'Up to 90 Days',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '3 Months from Issue',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Must be valid for at least 30 days beyond departure from South Africa with minimum 2 consecutive blank pages.',
          is_mandatory: true
        },
        {
          title: 'Form DHA-84 Visa Application Form',
          description: 'Fully completed in black ink and signed by applicant matching passport signature.',
          is_mandatory: true
        },
        {
          title: 'Two Passport Photographs — 35×45mm',
          description: 'Two recent color photos, white background, neutral expression, without glasses, taken within 6 months.',
          is_mandatory: true
        },
        {
          title: 'Day-by-Day Travel Itinerary / Cover Letter',
          description: 'Detailed cover letter outlining trip dates, cities visited (Johannesburg, Cape Town, Kruger National Park), and tour activities.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Confirmed round-trip flight booking showing entry and exit from South Africa with verifiable PNR.',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Confirmed hotel reservations for all nights of stay or official invitation letter from South African host with certified ID/passport copy.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / NOC',
          description: 'Employer leave approval / NOC letter stating designation, salary, approved leave dates, and return commitment + salary slips for last 3 months.',
          is_mandatory: true
        },
        {
          title: 'Yellow Fever Vaccination Certificate (If Applicable)',
          description: 'Mandatory if arriving from or transiting through a yellow fever endemic country.',
          is_mandatory: false
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 3 Months)',
          minimum_balance_or_amount: 'Minimum ₹1,00,000 – ₹1,50,000 closing balance',
          time_frame: 'Last 3 consecutive months (bank-stamped originals)',
          notes: 'Bank statement with original bank seal and branch manager signature; online statements are NOT accepted.'
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 to 3 financial years',
          notes: 'ITR-V acknowledgement copies showing declared income history.'
        }
      ],
      other_requirements: [
        {
          category: '₹0 Consular Visa Fee for Indians',
          details: 'The Government of South Africa charges ₹0 consular visa fee for Indian citizens. You only pay the nominal VFS Global logistics service charge.'
        },
        {
          category: 'In-Person or Representative Submission',
          details: 'Applications are submitted at VFS Global South Africa centers across Delhi, Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad, Ahmedabad, and Pune.'
        }
      ],
      how_to_apply: [
        'Complete Form DHA-84 in black ink and draft your day-by-day itinerary.',
        'Compile mandatory documents: passport, photos, flight/hotel bookings, bank statements (3 months, stamped), ITR, and employer NOC.',
        'Book an appointment at your nearest VFS Global South Africa center.',
        'Submit document dossier at VFS and pay the VFS logistics charge (Consular fee is ₹0).',
        'Track application status online and collect your passport with stamped visa vignette.'
      ],
      costs: {
        visa_fee: '₹0 (Free Consular Fee for Indian Citizens)',
        service_fee: '₹2,040 (VFS Logistics Service Charge)',
        total_fee: '₹2,040 Total Reference',
        notes: 'Official consular visa fee is completely waived for Indian passport holders.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 6 weeks before planned travel date.',
        decision_time: 'Standard: 10 to 15 business days after VFS submission.',
        max_extension: 'Can be extended for another 90 days inside South Africa via VFS/DHA.',
        center_notes: 'VFS centers across 8+ major Indian cities.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // SEYCHELLES PATHWAYS (Official Free Visitor Permit & TA)
  // ═══════════════════════════════════════════════════════════════
  if (isSeychelles) {
    return {
      passport_country: from,
      destination_country: 'Seychelles',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Seychelles Free Visitor Permit on Arrival (with Mandatory Digital TA)',
      source_url: 'https://seychelles.govtas.com',
      official_source_name: 'Department of Immigration and Civil Status, Republic of Seychelles',
      processing_time: 'Instant on Arrival (or 12–24 Hours for Digital TA)',
      validity: '30 Days on Arrival (Extendable to 3 Months)',
      stay_duration: 'Up to 30 Days (Extendable to 90 Days)',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '30 Days on Arrival',
        max_stay_per_entry: 'Up to 30 Days (Extendable to 90 Days)',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for the duration of the intended stay in Seychelles with at least 1 blank page.',
          is_mandatory: true
        },
        {
          title: 'Seychelles Travel Authorization (TA) QR Code',
          description: 'Mandatory online travel authorization submitted prior to departure at seychelles.govtas.com.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return / Onward Flight Ticket',
          description: 'Confirmed air ticket leaving Seychelles within 30 days.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Hotel / Eco-Resort Booking',
          description: 'Confirmed accommodation booking voucher at a certified eco-tourism hotel/resort for all nights of stay.',
          is_mandatory: true
        },
        {
          title: 'Travel Health & Medical Insurance',
          description: 'Mandatory international travel medical insurance covering emergency medical expenses and COVID-19 hospitalization.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'Minimum USD $150 per day of stay in Seychelles',
          time_frame: 'Carried during travel',
          notes: 'Credit cards, debit cards, or currency cash.'
        }
      ],
      other_requirements: [
        {
          category: 'Digital Travel Authorization Mandate',
          details: 'All travelers must obtain the electronic Travel Authorization (TA) at seychelles.govtas.com (€10 EUR fee) before boarding their flight to Mahé.'
        }
      ],
      how_to_apply: [
        'Book confirmed flights, certified hotel accommodation, and travel health insurance.',
        'Submit the Seychelles Travel Authorization (TA) application at seychelles.govtas.com within 10 days before flight.',
        'Pay the €10 EUR government fee online.',
        'Receive your official approved Travel Authorization PDF with QR code.',
        'Present QR code and passport at Seychelles International Airport (SEZ) for free 30-day entry permit.'
      ],
      costs: {
        visa_fee: '€0 (Free Visitor’s Permit on Arrival)',
        service_fee: '€10 EUR (approx. ₹900 for Mandatory Online Travel Authorization)',
        total_fee: '€10 EUR Total Reference',
        notes: 'Entry permit on arrival is 100% free; only the mandatory online TA processing fee applies.'
      },
      processing_and_timing: {
        apply_window: 'Submit online TA 10 days to 24 hours before flight.',
        decision_time: 'Online TA: 12 to 24 hours. Airport stamping: Instant.',
        max_extension: 'Can be extended up to 3 months for first extension (and up to 12 months) at Immigration Office in Victoria.',
        center_notes: 'Cleared at Seychelles International Airport, Mahé (SEZ).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // SOUTH KOREA PATHWAYS (Official C-3-9 Tourist Visa & KVAC)
  // ═══════════════════════════════════════════════════════════════
  if (isSouthKorea) {
    return {
      passport_country: from,
      destination_country: 'South Korea',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'South Korea C-3-9 Short-Term Tourist Visa (Single Entry 90 Days)',
      source_url: 'https://www.visaforkorea-in.com',
      official_source_name: 'Embassy of the Republic of Korea & Korea Visa Application Center (KVAC)',
      processing_time: '7–10 Business Days',
      validity: '3 Months from Date of Issue',
      stay_duration: 'Up to 90 Days',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '3 Months from Issue Date',
        max_stay_per_entry: 'Up to 90 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Original passport valid for at least 6 months with minimum 2 blank visa pages.',
          is_mandatory: true
        },
        {
          title: 'Visa Application Form',
          description: 'Completed official Korean visa application form with 35x45mm photo affixed and signed by applicant.',
          is_mandatory: true
        },
        {
          title: 'Passport Photograph — 35×45mm',
          description: 'Recent color photograph on white background, neutral expression, without glasses, taken within 6 months.',
          is_mandatory: true
        },
        {
          title: 'Detailed Travel Itinerary / Cover Letter',
          description: 'Day-by-day travel plan outlining cities to visit (Seoul, Busan, Jeju), sightseeing activities, and dates of stay.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Reservation',
          description: 'Round-trip flight booking with verifiable PNR (refundable or reservation only).',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Confirmed hotel reservations for all nights of stay in South Korea.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / Occupation',
          description: 'Employer leave approval / NOC on company letterhead stating designation, salary, joining date, and approved leave + salary slips for last 3 months (or Business Registration + GST for self-employed).',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 6 Months)',
          minimum_balance_or_amount: 'Minimum ₹1,50,000 – ₹2,00,000 liquid closing balance',
          time_frame: 'Last 6 consecutive months (bank-stamped originals)',
          notes: 'Bank statement with original bank seal and branch manager signature verifying steady income and solvency.'
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 consecutive financial years',
          notes: 'ITR-V e-filing acknowledgements filed with the Income Tax Department of India.'
        }
      ],
      other_requirements: [
        {
          category: 'KVAC Application Submission',
          details: 'Applications in India are processed through Korea Visa Application Center (KVAC) in New Delhi and VFS Global KVAC in Mumbai, Kolkata, Chennai, and Bengaluru.'
        },
        {
          category: 'Q-Code Health Declaration',
          details: 'Submit the online Q-Code health declaration at cov19ent.kdca.go.kr prior to arrival for fast-track immigration at Incheon International Airport (ICN).'
        }
      ],
      how_to_apply: [
        'Complete the official Korean visa application form and compile your day-by-day itinerary.',
        'Compile your document dossier: passport, photos, flight/hotel bookings, 6-month bank statements, ITR-V, and employer NOC.',
        'Book an appointment at your nearest KVAC / VFS Korea center.',
        'Submit document dossier at KVAC and pay consular visa fee (₹3,200) + KVAC service charge.',
        'Track application status online on the official Korea Visa Portal (visa.go.kr).',
        'Download your official Visa Grant Notice from visa.go.kr or collect your passport from KVAC.'
      ],
      costs: {
        visa_fee: '₹3,200 (Single Entry 90 Days Consular Fee)',
        service_fee: '₹1,380 (KVAC Application Service Charge)',
        total_fee: '₹4,580 Total Reference',
        notes: 'Consular visa fee is ₹3,200 for single-entry short-term stay.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 6 weeks before planned departure date.',
        decision_time: 'Standard: 7 to 10 working days after KVAC submission.',
        max_extension: 'Single entry valid for 3 months from issuance date.',
        center_notes: 'KVAC New Delhi, Mumbai, Kolkata, Chennai, Bengaluru.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // HONG KONG PATHWAYS (Official Pre-Arrival Registration - PAR)
  // ═══════════════════════════════════════════════════════════════
  if (isHongKong) {
    return {
      passport_country: from,
      destination_country: 'Hong Kong',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Hong Kong Pre-Arrival Registration (PAR - 14 Days 100% Free Online)',
      source_url: 'https://www.immd.gov.hk/eng/services/visas/pre-arrival_registration_for_indian_nationals.html',
      official_source_name: 'Immigration Department, Government of Hong Kong SAR',
      processing_time: 'Instant Online (2 Minutes)',
      validity: '6 Months Multiple Entry from Registration',
      stay_duration: 'Up to 14 Days Per Visit',
      entry_type: 'Multiple Entry',
      validity_and_stay: {
        visa_validity: '6 Months Multiple Entry',
        max_stay_per_entry: 'Up to 14 Days Per Visit',
        entry_type: 'Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months beyond travel date with at least 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Pre-Arrival Registration (PAR) Notification Slip',
          description: 'Mandatory printed PAR notification slip generated instantly on official GovHK portal, printed on A4 paper and signed by applicant.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket departing Hong Kong International Airport (HKG).',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Confirmed hotel reservations in Hong Kong for all nights of stay.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'HKD 5,000 or equivalent in international credit cards / cash',
          time_frame: 'Carried during travel',
          notes: 'Standard spot-check upon arrival at HKG airport.'
        }
      ],
      other_requirements: [
        {
          category: '100% Free Instant Registration',
          details: 'Indian passport holders can visit Hong Kong visa-free for up to 14 days by completing the FREE Pre-Arrival Registration (PAR) online at GovHK. Results are generated instantly.'
        }
      ],
      how_to_apply: [
        'Visit the official GovHK PAR portal: gov.hk/par.',
        'Fill in personal and passport details exactly as shown in your passport.',
        'System approves registration instantly (takes 2 minutes).',
        'Print the official "Notification Slip for Pre-arrival Registration" on a blank sheet of A4 white paper and sign it.',
        'Present the printed PAR notification slip and passport to the airline at check-in and at HKG immigration.'
      ],
      costs: {
        visa_fee: '₹0 (100% Free Online Registration)',
        service_fee: '₹0 (No Agent Required)',
        total_fee: '₹0 (Free Entry)',
        notes: 'Pre-Arrival Registration for Indian nationals is completely free of charge.'
      },
      processing_and_timing: {
        apply_window: 'Complete PAR online anytime within 6 months of travel.',
        decision_time: 'Instant / Automated approval in 2 minutes.',
        max_extension: 'Allows multiple visits up to 14 days each over 6 months.',
        center_notes: '100% digital electronic clearance linked to your passport.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // KAZAKHSTAN PATHWAYS (14-Day Visa-Free Entry for Indians)
  // ═══════════════════════════════════════════════════════════════
  if (isKazakhstan) {
    return {
      passport_country: from,
      destination_country: 'Kazakhstan',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Kazakhstan 14-Day Visa-Free Entry (Granted on Arrival)',
      source_url: 'https://vmp.gov.kz',
      official_source_name: 'Ministry of Foreign Affairs & Migration Committee of Kazakhstan',
      processing_time: 'Instant / On-Arrival (0 Days)',
      validity: '14 Days on Arrival',
      stay_duration: 'Up to 14 Days (Max 42 Days in 180 Days)',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '14 Days on Arrival',
        max_stay_per_entry: 'Up to 14 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months from entry date with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket departing Almaty (ALA) or Astana (NQZ) within 14 days.',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Proof',
          description: 'Confirmed hotel reservations in Kazakhstan for duration of stay.',
          is_mandatory: true
        },
        {
          title: 'Travel Medical Insurance',
          description: 'International travel health insurance policy covering emergency medical care in Kazakhstan.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'USD $500 or equivalent in cards/cash',
          time_frame: 'Carried during travel',
          notes: 'Standard spot-check.'
        }
      ],
      other_requirements: [
        {
          category: '14-Day Visa-Free Policy',
          details: 'Indian citizens enjoy official visa-free entry to Kazakhstan for stays up to 14 calendar days per visit (up to a cumulative total of 42 days per 180-day period).'
        }
      ],
      how_to_apply: [
        'Ensure passport has 6+ months validity.',
        'Book return flight tickets and hotel accommodation.',
        'Purchase international travel medical insurance.',
        'Board your flight to Almaty or Astana and clear immigration for instant free 14-day entry stamp.'
      ],
      costs: {
        visa_fee: '₹0 (100% Free Visa-Free Entry)',
        service_fee: '₹0 (No Application Needed)',
        total_fee: '₹0 (Free on Arrival)',
        notes: 'Indian passport holders do not require a visa for tourism stays up to 14 days.'
      },
      processing_and_timing: {
        apply_window: 'No advance application required.',
        decision_time: 'Instant stamping at airport immigration (0 Days).',
        max_extension: 'Non-extendable beyond 14 days for tourism without exiting.',
        center_notes: 'Available at Almaty (ALA), Astana (NQZ), and Shymkent (CIT).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // AZERBAIJAN PATHWAYS (Official ASAN Visa 30-Day eVisa)
  // ═══════════════════════════════════════════════════════════════
  if (isAzerbaijan) {
    return {
      passport_country: from,
      destination_country: 'Azerbaijan',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Azerbaijan ASAN Visa (30-Day Single Entry eVisa)',
      source_url: 'https://evisa.gov.az',
      official_source_name: 'State Agency for Public Service & ASAN Visa Department, Republic of Azerbaijan',
      processing_time: '3 Business Days (or 3 Hours Urgent)',
      validity: '90 Days Entry Window from Issue',
      stay_duration: 'Up to 30 Days',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '90 Days Entry Window',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 3 months beyond the validity of the electronic visa (min 6 months from entry) with 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data Page Scan',
          description: 'High-quality color scan of passport details page in JPG format.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket to Heydar Aliyev International Airport, Baku (GYD).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Voucher',
          description: 'Confirmed hotel reservations in Baku for all nights of stay.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Living Expense Funds',
          minimum_balance_or_amount: 'USD $500 or equivalent in cards/cash',
          time_frame: 'Carried during travel',
          notes: 'Standard spot-check.'
        }
      ],
      other_requirements: [
        {
          category: 'Registration for Stays Exceeding 15 Days',
          details: 'If staying in Azerbaijan for more than 15 calendar days, your hotel management must register your stay with the State Migration Service within 15 days of arrival (free of charge).'
        }
      ],
      how_to_apply: [
        'Visit the official ASAN Visa portal: evisa.gov.az.',
        'Upload your passport bio page scan and enter travel details.',
        'Pay the official visa fee ($26 USD standard / $60 USD urgent) online via credit card.',
        'Receive your official ASAN Electronic Visa PDF via email within 3 business days.',
        'Print your ASAN Visa and present it at Heydar Aliyev International Airport (Baku).'
      ],
      costs: {
        visa_fee: '$26 USD Standard (approx. ₹2,200) / $60 USD Urgent (approx. ₹5,000)',
        service_fee: '₹0 (Official Direct Portal)',
        total_fee: '$26 – $60 USD Total Reference',
        notes: 'Official government fee paid securely on the ASAN Visa portal.'
      },
      processing_and_timing: {
        apply_window: 'Apply 7 to 20 days before planned travel.',
        decision_time: 'Standard: 3 business days. Urgent: 3 hours.',
        max_extension: 'Single entry valid for stays up to 30 days.',
        center_notes: 'Valid across all international airports and border checkpoints in Azerbaijan.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // GEORGIA PATHWAYS (Official Georgia eVisa)
  // ═══════════════════════════════════════════════════════════════
  if (isGeorgia) {
    return {
      passport_country: from,
      destination_country: 'Georgia',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Georgia Tourist eVisa (30/90 Days Multiple Entry)',
      source_url: 'https://www.evisa.gov.ge',
      official_source_name: 'Consular Department, Ministry of Foreign Affairs of Georgia',
      processing_time: '5 Business Days',
      validity: '120 Days from Date of Issue',
      stay_duration: 'Up to 30 Days within 120 Days',
      entry_type: 'Multiple Entry',
      validity_and_stay: {
        visa_validity: '120 Days Validity',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 3 months beyond the validity of the visa with 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Passport Bio-Data Page Scan',
          description: 'Clear color scan of passport bio page.',
          is_mandatory: true
        },
        {
          title: 'Digital Passport Photograph',
          description: 'Recent color photo (4.5 x 3.5cm) on white background.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip flight booking to Tbilisi (TBS), Batumi (BUS), or Kutaisi (KUT).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Proof',
          description: 'Confirmed hotel reservations for duration of stay in Georgia.',
          is_mandatory: true
        },
        {
          title: 'Travel Medical Insurance — Min. €30,000',
          description: 'Comprehensive international emergency travel medical insurance policy valid across Georgia.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 3–6 Months)',
          minimum_balance_or_amount: 'Minimum ₹1,00,000 – ₹1,50,000 liquid balance',
          time_frame: 'Last 3 to 6 months bank statement',
          notes: 'Bank-stamped original copy verifying sufficient travel funds.'
        }
      ],
      other_requirements: [
        {
          category: 'Visa-Free for US/UK/Schengen/GCC Visa Holders',
          details: 'Indian passport holders with a valid, used visa or permanent residence from USA, UK, Schengen, Canada, Australia, Japan, or GCC countries can enter Georgia visa-free for up to 90 days in any 180-day period.'
        }
      ],
      how_to_apply: [
        'Visit the official Georgia eVisa portal: evisa.gov.ge.',
        'Upload your passport bio page, photograph, flight booking, hotel reservation, and travel insurance.',
        'Pay the official visa fee of $20 USD + 2% service charge online via credit card.',
        'Receive your official Georgia Electronic Visa PDF via email within 5 business days.',
        'Print your eVisa and carry all supporting documents for immigration check at TBS airport.'
      ],
      costs: {
        visa_fee: '$20 USD (approx. ₹1,700)',
        service_fee: '$0.40 USD (Card Processing)',
        total_fee: '$20.40 USD Total Reference',
        notes: 'Non-refundable fee paid directly on the official Georgia MFA portal.'
      },
      processing_and_timing: {
        apply_window: 'Apply 10 to 30 days before travel.',
        decision_time: 'Standard: 5 business days.',
        max_extension: 'Multiple entry valid for stays up to 30 days within 120-day period.',
        center_notes: 'Available at Tbilisi (TBS), Batumi (BUS), Kutaisi (KUT).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // PHILIPPINES PATHWAYS (Official 9(a) Tourist Visa / VFS)
  // ═══════════════════════════════════════════════════════════════
  if (isPhilippines) {
    return {
      passport_country: from,
      destination_country: 'Philippines',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Philippines 9(a) Temporary Visitor Visa (Single / Multiple Entry)',
      source_url: 'https://www.vfsglobal.com/philippines/india',
      official_source_name: 'Embassy of the Republic of the Philippines & VFS Global',
      processing_time: '7–10 Business Days',
      validity: '3 Months from Date of Issue',
      stay_duration: 'Up to 30 Days Per Entry',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: '3 Months from Issue Date',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Original Passport',
          description: 'Valid for at least 6 months beyond intended stay with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Visa Application Form (FA Form No. 2)',
          description: 'Fully completed official visa application form signed by applicant with 2x2 photo affixed.',
          is_mandatory: true
        },
        {
          title: 'Two Passport Photographs — 2×2 inch (51×51mm)',
          description: 'Recent color photos on white background, neutral expression, taken within last 6 months.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Round-trip air ticket departing Manila (MNL) or Cebu (CEB) with verifiable PNR.',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking / Accommodation Vouchers',
          description: 'Confirmed hotel reservations in the Philippines for all nights of stay.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / Occupation',
          description: 'Employer leave approval / NOC letter stating designation, salary, approved leave dates + salary slips for last 3 months (or Business Registration + ITR for self-employed).',
          is_mandatory: true
        },
        {
          title: 'eTravel QR Code Clearance',
          description: 'Mandatory online arrival registration submitted within 72 hours before departure at etravel.gov.ph.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Statements (Last 6 Months)',
          minimum_balance_or_amount: 'Minimum ₹1,00,000 – ₹1,50,000 liquid balance',
          time_frame: 'Last 6 consecutive months (bank-stamped originals)',
          notes: 'Bank statement with original bank seal and branch manager signature.'
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 consecutive financial years',
          notes: 'ITR-V acknowledgement copies showing declared annual income.'
        }
      ],
      other_requirements: [
        {
          category: '14-Day Visa-Free for Major Visa Holders (AJACSSUK)',
          details: 'Indian passport holders with a valid, current visa or permanent residency from USA, Japan, Australia, Canada, Schengen, Singapore, or UK qualify for 14-Day Visa-Free Entry into the Philippines.'
        }
      ],
      how_to_apply: [
        'Complete FA Form No. 2 and compile document dossier.',
        'Compile: passport, 2x2 photos, flight/hotel bookings, 6-month stamped bank statements, ITR, and employer NOC.',
        'Submit application at nearest VFS Global Philippines center or Philippine Embassy in New Delhi / Consulates.',
        'Pay consular visa fee (₹3,360) + VFS logistics fee.',
        'Track application status and collect passport with stamped 9(a) visa sticker.',
        'Register for eTravel QR code at etravel.gov.ph within 3 days before flight.'
      ],
      costs: {
        visa_fee: '₹3,360 (Single Entry 3 Months Consular Fee)',
        service_fee: '₹1,500 – ₹2,000 (VFS Processing Fee)',
        total_fee: '₹4,860 – ₹5,360 Total Reference',
        notes: 'Consular visa fee for single-entry temporary visitor visa.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 5 weeks before travel date.',
        decision_time: 'Standard: 7 to 10 business days.',
        max_extension: 'Can be extended up to 59 days (and subsequent extensions) at Bureau of Immigration in Manila.',
        center_notes: 'Handled via Philippine Embassy New Delhi, Consulates in Mumbai/Kolkata/Chennai, and VFS centers.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 1. UNITED KINGDOM PATHWAYS
  // ═══════════════════════════════════════════════════════════════
  if (isUK) {
    // 1A. UK Student Visa (Higher Studies)
    if (purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('education') || purposeLower.includes('higher')) {
      return {
        passport_country: from,
        destination_country: 'United Kingdom',
        purpose_of_visit: 'Higher Studies / Student Visa',
        visa_type: 'UK Student Visa (Student Route)',
        source_url: 'https://www.gov.uk/student-visa/documents-you-must-provide',
        official_source_name: 'UK Visas & Immigration (UKVI) official sources',
        processing_time: 'Standard 3 Weeks (15 Working Days)',
        validity: 'Full Course Duration + 4 Months Wrap-up (Initial 90-Day Entry Vignette)',
        stay_duration: 'Length of Academic Program',
        entry_type: 'Multiple Entry',
        validity_and_stay: {
          visa_validity: 'Course Duration + 4 Months Wrap-up (90-Day Entry Vignette)',
          max_stay_per_entry: 'Full Academic Program Length',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Original passport valid for your full period of stay in the UK with at least 1 blank page for the 90-day travel vignette.',
            is_mandatory: true
          },
          {
            title: 'Confirmation of Acceptance for Studies (CAS)',
            description: 'A unique 14-digit reference number provided by your UK licensed Higher Education Provider (HEP) upon unconditional acceptance, detailing course fees, payments made, and assessment qualifications.',
            is_mandatory: true
          },
          {
            title: 'Tuberculosis (TB) Test Certificate',
            description: 'Mandatory for Indian passport holders residing in India for 6+ months. Certificate must be issued by an authorized UKVI-approved medical clinic (e.g. Apollo, Fortis, Max Healthcare). Valid for 6 months.',
            is_mandatory: true
          },
          {
            title: 'Proof of English Language Capability',
            description: 'SELT certificate (IELTS Academic / PTE Academic) or official confirmation on CAS statement that the HEP university assessed and verified English proficiency at CEFR B2 level.',
            is_mandatory: true
          },
          {
            title: 'Academic Transcripts & Degree Certificates',
            description: 'Original certificates and marksheets specified by the university in the CAS statement used to assess academic admission.',
            is_mandatory: true
          },
          {
            title: 'ATAS Certificate (Academic Technology Approval Scheme)',
            description: 'Mandatory clearance certificate for sensitive postgraduate STEM, engineering, medicine, and research courses before visa application.',
            is_mandatory: false
          }
        ],
        financial_proofs: [
          {
            type: 'Bank Statements / Financial Sponsorship (28-Day Holding Rule)',
            minimum_balance_or_amount: 'Tuition Fee Balance + Living Maintenance: £1,483/mo London (max £13,347 for 9 mo) OR £1,136/mo Outside London (max £10,224 for 9 mo)',
            time_frame: 'Held continuously for 28 consecutive days minimum',
            notes: 'Funds must be held in the account for 28 consecutive days without dipping below required balance. Bank statement must be dated within 31 days prior to application submission. In student’s or parents’ name (with birth certificate + consent letter).'
          },
          {
            type: 'Approved Education Loan Sanction Letter',
            minimum_balance_or_amount: 'Covering full tuition balance and living maintenance allowance',
            time_frame: 'Issued within 6 months of visa application',
            notes: 'Must be an official educational loan from a regulated financial institution (RBI approved schedule bank).'
          }
        ],
        other_requirements: [
          {
            category: 'Immigration Health Surcharge (IHS) Calculation',
            details: 'Mandatory NHS healthcare surcharge paid online during application setup. Student discounted rate is £776 per year. For courses with extra wrap-around months (e.g., 1-year Master’s getting a 16-month visa), IHS is calculated in 6-month increments: £776 (1 year) + £388 (4 months) = £1,164 total IHS.'
          },
          {
            category: '90-Day Entry Vignette & Digital eVisa / BRP',
            details: 'Successful applicants receive a 90-day travel vignette (sticker) in their passport to enter the UK. Upon arrival, access digital UKVI eVisa account or collect physical Biometric Residence Permit (BRP) from designated Post Office/university within 10 days.'
          },
          {
            category: 'Biometrics Appointment at VFS Global',
            details: 'Mandatory in-person appointment at VFS Global UK Visa Application Center in India for 10-finger biometric scans and digital photograph.'
          },
          {
            category: 'Work Rights Permitted',
            details: 'Degree-level students at Higher Education Institutions are legally permitted to work up to 20 hours per week during term time and full-time during official vacation periods.'
          }
        ],
        how_to_apply: [
          '1️⃣ Secure unconditional offer and official 14-digit CAS statement from UK Higher Education Provider (HEP).',
          '2️⃣ Obtain Tuberculosis (TB) clearance certificate from a UKVI-approved clinic in India.',
          '3️⃣ Maintain required tuition + living maintenance funds (£1,483/mo London or £1,136/mo Non-London) in bank for 28 consecutive days.',
          '4️⃣ Complete the UKVI Student Visa online application form on gov.uk.',
          '5️⃣ Pay the £490 visa application fee + £776/year Immigration Health Surcharge (IHS).',
          '6️⃣ Upload CAS, TB certificate, academic credentials, and 28-day financial statements to VFS Global portal.',
          '7️⃣ Book and attend VFS Global biometric appointment for fingerprinting and passport submission.',
          '8️⃣ Receive UKVI decision letter within 15 working days and passport with 90-day entry vignette, then travel to UK.'
        ],
        costs: {
          visa_fee: '£490 (approx. ₹52,400 out-of-country student fee)',
          service_fee: '£776 / yr (Student Discounted IHS Healthcare Surcharge)',
          total_fee: '£1,266+ (Visa £490 + 1st Year IHS £776)',
          notes: 'Payable online directly at official UKVI portal; courses with extra months calculate IHS per half-year block (£388/6 mo).'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 6 months before academic course start date.',
          decision_time: 'Standard: 3 weeks (15 working days) from biometric appointment date.',
          max_extension: 'Priority Service (5 working days: +£500) | Super Priority (24 hours: +£1,000) available at VFS centers.',
          center_notes: 'VFS Global UK VACs available in New Delhi, Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad, Ahmedabad, Pune, Chandigarh, Kochi, Jalandhar, Jaipur, and Goa.'
        }
      };
    }

    // 1B. UK Skilled Worker (Employment / Work)
    if (purposeLower.includes('work') || purposeLower.includes('job') || purposeLower.includes('employment')) {
      return {
        passport_country: from,
        destination_country: 'United Kingdom',
        purpose_of_visit: 'Employment / Work',
        visa_type: 'Skilled Worker Visa (Points-Based System)',
        source_url: 'https://www.gov.uk/skilled-worker-visa',
        official_source_name: 'UK Visas & Immigration (UKVI) official sources',
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Must be valid for your intended stay with at least 1 blank visa page for stamping.',
            is_mandatory: true
          },
          {
            title: 'Certificate of Sponsorship (CoS)',
            description: 'Electronic reference number provided by your UK licensed employer confirming job role, SOC code, and salary.',
            is_mandatory: true
          },
          {
            title: 'Proof of English Proficiency',
            description: 'SELT IELTS/PTE General passed at minimum CEFR B1 level in reading, writing, speaking, and listening.',
            is_mandatory: true
          },
          {
            title: 'Tuberculosis (TB) Test Certificate',
            description: 'Valid clearance certificate from an authorized IOM clinic in your home country.',
            is_mandatory: true
          },
          {
            title: 'Criminal Record Certificate (PCC)',
            description: 'Police Clearance Certificate for healthcare, education, or sensitive occupation codes.',
            is_mandatory: false
          }
        ],
        financial_proofs: [
          {
            type: 'Personal Maintenance Funds or Employer Guarantee',
            minimum_balance_or_amount: '£1,270 in bank for 28 consecutive days (unless A-rated sponsor certifies maintenance on CoS)',
            time_frame: 'Held for 28 consecutive days',
            notes: 'Bank statements must be dated within 31 days of application date.'
          }
        ],
        other_requirements: [
          {
            category: 'Immigration Health Surcharge (IHS)',
            details: 'Mandatory payment of £1,035 per year of visa grant for full UK National Health Service (NHS) access.'
          },
          {
            category: 'Biometrics at VFS Global',
            details: 'In-person biometric capture (digital photo and fingerprint scans).'
          },
          {
            category: 'Salary Threshold',
            details: 'Job must meet general salary threshold (£38,700/year or going rate for your SOC occupation code).'
          }
        ],
        how_to_apply: [
          'Receive valid Certificate of Sponsorship (CoS) from licensed UK employer.',
          'Complete UKVI online Skilled Worker application.',
          'Pay visa fee and Immigration Health Surcharge (IHS).',
          'Upload mandatory documents and book VFS biometric appointment.',
          'Attend appointment and receive decision on passport / UKVI eVisa.'
        ],
        costs: {
          visa_fee: '£719 – £1,420 (depending on 3 vs 5 year duration)',
          service_fee: '£1,035 / yr (IHS Healthcare)',
          total_fee: '£1,754+ Total Reference',
          notes: 'Payable online at official UKVI portal; reduced fees for Shortage/Health & Care roles.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 3 months prior to job start date on CoS.',
          decision_time: 'Standard 3 weeks (15 working days).',
          max_extension: 'Priority (5 working days) & Super Priority (24h) available.',
          center_notes: 'Managed via VFS Global application centers.'
        }
      };
    }

    // 1C. UK Business Visit
    if (purposeLower.includes('business')) {
      return {
        passport_country: from,
        destination_country: 'United Kingdom',
        purpose_of_visit: 'Business Visit',
        visa_type: 'Standard Visitor Visa (Business Route)',
        source_url: 'https://www.gov.uk/standard-visitor',
        official_source_name: 'UK Visas & Immigration (UKVI) official sources',
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Valid for the entire duration of your business trip with at least 1 blank visa page.',
            is_mandatory: true
          },
          {
            title: 'UK Host / Conference Invitation Letter',
            description: 'Official letter from UK host company or event organizers stating visit purpose, dates, and agenda.',
            is_mandatory: true
          },
          {
            title: 'Employer Deputation & NOC Letter',
            description: 'Letter from home employer detailing role, salary, purpose of visit, and financial sponsorship guarantee.',
            is_mandatory: true
          },
          {
            title: 'Company Registration Certificate',
            description: 'Proof of legal incorporation / GST registration of sending employer.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Company & Personal Bank Statements',
            minimum_balance_or_amount: 'Sufficient funds covering travel, executive hotel lodging, and incidental costs',
            time_frame: 'Last 6 months bank statements',
            notes: 'Accompanied by sending company financial undertaking letter and corporate bank stamp.'
          },
          {
            type: 'Income Tax Returns (ITR)',
            minimum_balance_or_amount: null,
            time_frame: 'Last 2 assessment years',
            notes: 'ITR-V acknowledgements of traveler and company.'
          }
        ],
        other_requirements: [
          {
            category: 'Permitted Business Activities',
            details: 'Attending meetings, conferences, site visits, and contract negotiations. No direct employment permitted.'
          },
          {
            category: 'Biometrics at VFS Global',
            details: 'Mandatory in-person appointment for digital facial photograph and fingerprint scanning.'
          }
        ],
        how_to_apply: [
          'Complete UKVI Standard Visitor application form online.',
          'Pay visa application fee online.',
          'Upload corporate invitation, employer NOC, and financial records to VFS portal.',
          'Attend VFS biometric appointment.',
          'Collect stamped passport.'
        ],
        costs: {
          visa_fee: '£115 (approx. ₹12,300)',
          service_fee: '₹2,500 – ₹3,500',
          total_fee: '£115 + VFS Logistics',
          notes: 'Standard 6-month multiple-entry business visa.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 3 months before intended business trip.',
          decision_time: 'Standard 3 weeks (15 working days).',
          max_extension: 'Priority (5 working days) available.',
          center_notes: 'VFS Global appointment locations across India.'
        }
      };
    }

    // 1D. UK Family / Friends Visit
    if (purposeLower.includes('family') || purposeLower.includes('friend')) {
      return {
        passport_country: from,
        destination_country: 'United Kingdom',
        purpose_of_visit: 'Family / Friends Visit',
        visa_type: 'Standard Visitor Visa (Family & Private Route)',
        source_url: 'https://www.gov.uk/standard-visitor',
        official_source_name: 'UK Visas & Immigration (UKVI) official sources',
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Valid for the duration of the visit with at least 1 blank visa page.',
            is_mandatory: true
          },
          {
            title: 'Host Invitation Letter',
            description: 'Formal letter from UK host specifying relationship, accommodation arrangements, and dates of stay.',
            is_mandatory: true
          },
          {
            title: 'Host Legal Status Proof',
            description: 'Copy of host\'s British Passport, Indefinite Leave to Remain (ILR), or valid UK Biometric Residence Permit (BRP).',
            is_mandatory: true
          },
          {
            title: 'Host Accommodation Evidence',
            description: 'Tenancy agreement, council tax bill, or property ownership deed proving adequate room space.',
            is_mandatory: true
          },
          {
            title: 'Proof of Family Relationship',
            description: 'Birth certificates, marriage certificates, or family photographs establishing authentic relation.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Personal & Sponsor Bank Statements',
            minimum_balance_or_amount: 'Adequate balance for personal expenses during visit',
            time_frame: 'Last 6 months',
            notes: 'If host is sponsoring, provide host\'s 6 months bank statements, payslips, and P60.'
          }
        ],
        other_requirements: [
          {
            category: 'Ties to Home Country',
            details: 'Proof of ongoing employment, property, or family responsibilities ensuring return before visa expiry.'
          },
          {
            category: 'Biometrics at VFS',
            details: 'Mandatory in-person appointment for fingerprinting and photo.'
          }
        ],
        how_to_apply: [
          'Complete online application form on official UKVI portal.',
          'Pay visa application fee.',
          'Upload host documents, relationship proof, and bank statements to VFS.',
          'Attend biometric appointment at nearest VFS center.',
          'Collect passport with 6-month multiple-entry visa.'
        ],
        costs: {
          visa_fee: '£115 (approx. ₹12,300)',
          service_fee: '₹2,500 – ₹3,500',
          total_fee: '£115 + VFS Logistics',
          notes: 'Payable online at official UKVI portal.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 3 months prior to travel.',
          decision_time: 'Standard 3 weeks (15 working days).',
          max_extension: 'Priority processing available in 5 working days.',
          center_notes: 'VFS Global appointment network.'
        }
      };
    }

    // 1E. UK Tourism / Vacation (Default UK)
    return {
      passport_country: from,
      destination_country: 'United Kingdom',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Standard Visitor Visa (6 Months)',
      source_url: 'https://www.gov.uk/standard-visitor',
      official_source_name: 'UK Visas & Immigration (UKVI) official sources',
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for the entire duration of your stay in the UK with at least 1 blank page.',
          is_mandatory: true
        },
        {
          title: 'Online Application Form',
          description: 'Completed UKVI Standard Visitor form with accurate travel history.',
          is_mandatory: true
        },
        {
          title: 'Travel & Accommodation Itinerary',
          description: 'Planned itinerary, hotel bookings, or invitation letter with host address proof.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / Occupation',
          description: 'Employer letter confirming role, salary, length of employment, and approved leave.',
          is_mandatory: true
        }
      ],
      supportingDocuments: [],
      financial_proofs: [
        {
          type: 'Financial Sufficiency Proof',
          minimum_balance_or_amount: 'Bank balance sufficient for trip cost without public funds recourse',
          time_frame: 'Last 6 months bank statements',
          notes: 'Bank statements showing steady balance, regular income credits, and original bank stamp.'
        },
        {
          type: 'Income Tax Returns (ITR)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 assessment years',
          notes: 'ITR-V acknowledgements showing declared income history.'
        }
      ],
      other_requirements: [
        {
          category: 'Home Ties Demonstration',
          details: 'Proof of property, permanent employment, business ownership, or family in home country.'
        },
        {
          category: 'Biometrics at VFS Global',
          details: 'Mandatory in-person appointment for 10-finger biometric scan and digital photograph.'
        }
      ],
      how_to_apply: [
        'Complete UKVI online application form.',
        'Pay visa application fee online.',
        'Upload supporting financial and travel documents to VFS Global.',
        'Attend biometric appointment at nearest VFS center.',
        'Collect passport with 6-month multiple-entry visa sticker.'
      ],
      costs: {
        visa_fee: '£115 (approx. ₹12,300)',
        service_fee: '₹2,500 – ₹3,500',
        total_fee: '£115 + VFS Logistics',
        notes: 'Payable online at official UKVI portal; VFS add-on services optional.'
      },
      processing_and_timing: {
        apply_window: 'Apply up to 3 months prior to planned travel date.',
        decision_time: 'Decision: Standard 3 weeks (15 working days).',
        max_extension: 'Priority processing (5 working days) available at additional fee.',
        center_notes: 'VFS Global centers operate across 10+ Indian cities.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 1F. DENMARK OFFICIAL IMMIGRATION & RESIDENCE PATHWAYS (SIRI)
  // ═══════════════════════════════════════════════════════════════
  if (isDenmark) {
    const isStudy = purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('education') || purposeLower.includes('higher');
    const isWork = purposeLower.includes('work') || purposeLower.includes('job') || purposeLower.includes('employment');
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');

    if (isStudy) {
      return {
        passport_country: from,
        destination_country: 'Denmark',
        purpose_of_visit: 'Higher Studies',
        visa_type: 'Danish Residence and Work Permit for Students (ST1 Scheme / Higher Education Route)',
        source_url: 'https://www.nyidanmark.dk/en-GB/You-want-to-apply/Study/Higher-education',
        official_source_name: 'Danish Agency for International Recruitment and Integration (SIRI) & Ministry of Foreign Affairs of Denmark',
        processing_time: '60 Calendar Days (Standard SIRI SLA)',
        validity: 'Granted for the Full Duration of the Accredited Degree Programme + 6 Months Post-Study Job Seeking',
        stay_duration: 'Full Study Programme Duration (Renewable Annually / Per Degree Milestone)',
        entry_type: 'Multiple Entry (Biometric Residence Card with Full Schengen Free Movement)',
        validity_and_stay: {
          visa_validity: 'Duration of Study Programme + 6 Months Job Search Extension',
          max_stay_per_entry: 'Continuous Legal Residence in Denmark & 90/180 Days in Schengen Area',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Original passport valid for at least 3 months beyond the intended study permit duration with minimum 2 blank pages, issued within last 10 years.',
            is_mandatory: true
          },
          {
            title: 'Official Unconditional Admission Letter',
            description: 'Letter of acceptance from an accredited Danish higher education institution (University, University College, or Business Academy) confirming admission, start date, and course duration.',
            is_mandatory: true
          },
          {
            title: 'Online ST1 Application Confirmation & Reference Code',
            description: 'Online ST1 application form on newtodenmark.dk / nyidanmark.dk. (Part 1 completed and submitted online by the educational institution; Part 2 completed online by the student).',
            is_mandatory: true
          },
          {
            title: 'SIRI Case Order ID Payment Receipt',
            description: 'Official payment receipt for the SIRI fee (approx. 2,115 – 2,600 DKK) generated and paid prior to application submission.',
            is_mandatory: true
          },
          {
            title: 'ApplyVisa (MFA Denmark) Fee Payment Receipt',
            description: 'Official payment receipt from the Ministry of Foreign Affairs of Denmark portal (applyvisa.um.dk) for consular handling fee (1,710 DKK / approx. €230).',
            is_mandatory: true
          },
          {
            title: 'Proof of Paid Tuition Fee or Scholarship Waiver',
            description: 'Official bank transfer receipt proving full payment of first-year / first-semester tuition fees, or an official Danish government scholarship award letter.',
            is_mandatory: true
          },
          {
            title: 'Recognized English Language Proficiency Certificate',
            description: 'Official scorecard (IELTS Academic minimum 6.5 / TOEFL iBT minimum 88) as required by Danish university programme regulations.',
            is_mandatory: true
          },
          {
            title: 'MEA Apostilled Academic Certificates & Transcripts',
            description: 'Original Bachelor degree / Higher Secondary certificates and transcripts with MEA Apostille certification.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Proof of Sufficient Living Expenses (Maintenance Funds)',
            minimum_balance_or_amount: '6,500 – 6,800 DKK per month (approx. 78,000 – 81,600 DKK / ~₹9.5L–₹10L INR for one academic year)',
            time_frame: 'Last 3 to 6 months bank statements in student\'s own name',
            notes: 'Bank statements must be held in the student\'s sole bank account in a recognized bank, showing liquid funds readily available. Education loan sanction letters or official scholarship award letters are also accepted.'
          },
          {
            type: 'Education Loan Sanction Letter (If Applicable)',
            minimum_balance_or_amount: 'Covering full tuition and living expenses',
            time_frame: 'Current assessment year',
            notes: 'Issued by a nationalized or scheduled bank in India detailing disbursement conditions.'
          }
        ],
        other_requirements: [
          {
            category: 'Biometrics Submission at VFS Denmark (14-Day Deadline)',
            details: 'Students MUST record biometrics (fingerprints and facial photo) at an authorized VFS Global Denmark center within strictly 14 calendar days of submitting the online ST1 application.'
          },
          {
            category: 'Student Part-Time Work Rights',
            details: 'International students in higher education programmes are legally permitted to work up to 20 hours per week during the academic semester and full-time (37 hours/week) during June, July, and August.'
          },
          {
            category: 'Danish CPR Registration & Yellow Health Card',
            details: 'Upon arrival in Denmark, register your address at the local International Citizen Service (ICS) / Citizen Service (Borgerservice) to obtain your Danish CPR number and free national healthcare coverage (Sundhedskort).'
          }
        ],
        how_to_apply: [
          '1️⃣ Secure unconditional admission at an accredited Danish higher education institution.',
          '2️⃣ Danish educational institution completes Part 1 of the online ST1 application form on nyidanmark.dk and sends the reference ID / password to the student.',
          '3️⃣ Create a Case Order ID on nyidanmark.dk and pay the official SIRI processing fee (2,115 – 2,600 DKK) online.',
          '4️⃣ Complete Part 2 of the ST1 application form on nyidanmark.dk, uploading passport, admission letter, and living funds proof.',
          '5️⃣ Register and pay the Danish Embassy application fee (1,710 DKK) on the official ApplyVisa portal (applyvisa.um.dk).',
          '6️⃣ Book an appointment and record biometrics at VFS Global Denmark within 14 calendar days of online ST1 submission.',
          '7️⃣ Track application status on SIRI. Upon approval, receive entry visa sticker or travel to Denmark to collect your physical Biometric Residence Card (Opholdskort).'
        ],
        costs: {
          visa_fee: '2,115 – 2,600 DKK (SIRI Fee) + 1,710 DKK (Embassy ApplyVisa Fee)',
          service_fee: '₹1,800 – ₹2,500 (VFS Denmark Biometrics Logistics Fee)',
          total_fee: 'Approx. 3,825 – 4,310 DKK (~₹46,000–₹52,000 INR) Total Official Fees',
          notes: 'SIRI fee paid online via card on nyidanmark.dk; Embassy fee paid on applyvisa.um.dk; VFS fee paid at appointment.'
        },
        processing_and_timing: {
          apply_window: 'Apply 2 to 3 months prior to academic semester start date (August/September or January/February intake).',
          decision_time: 'Standard SIRI Processing: up to 60 calendar days (fast-track available if institution is certified).',
          max_extension: 'Permit valid for full normal study duration and extendable for thesis or degree completion.',
          center_notes: 'Biometrics recorded via VFS Global Denmark in New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Kochi, Chandigarh, and Jalandhar.'
        }
      };
    }

    if (isWork) {
      return {
        passport_country: from,
        destination_country: 'Denmark',
        purpose_of_visit: 'Employment / Work',
        visa_type: 'Danish Work and Residence Permit (Pay Limit Scheme / Fast-Track / Positive List)',
        source_url: 'https://www.nyidanmark.dk/en-GB/You-want-to-apply/Work',
        official_source_name: 'Danish Agency for International Recruitment and Integration (SIRI)',
        processing_time: '30 to 45 Calendar Days',
        validity: 'Up to 4 Years Initial Grant (Matching Employment Contract)',
        stay_duration: 'Duration of Employment Contract + 6 Months Job Search Grace Period',
        entry_type: 'Multiple Entry',
        validity_and_stay: {
          visa_validity: 'Up to 4 Years Renewable',
          max_stay_per_entry: 'Continuous Legal Residence in Denmark',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Original passport valid for at least 3 months beyond intended contract duration with 2 blank pages.', is_mandatory: true },
          { title: 'Signed Danish Employment Contract', description: 'Detailed job contract specifying job title, Danish Collective Agreement terms, working hours (min 37h/week), and gross annual salary.', is_mandatory: true },
          { title: 'AR1 / AR6 Online Work Permit Application', description: 'Online application submitted via nyidanmark.dk by employer (Part 1) and employee (Part 2).', is_mandatory: true },
          { title: 'SIRI Case Order ID & Fee Payment', description: 'Payment receipt for official SIRI fee (approx. 4,800 – 5,200 DKK).', is_mandatory: true },
          { title: 'ApplyVisa Embassy Fee Receipt', description: 'Payment receipt for Danish Embassy consular processing (1,710 DKK) on applyvisa.um.dk.', is_mandatory: true },
          { title: 'Educational Degrees & Professional Credentials', description: 'Apostilled degree certificates, transcripts, and Danish professional authorization if applying under regulated professions (e.g., healthcare/engineering).', is_mandatory: true }
        ],
        financial_proofs: [
          {
            type: 'Statutory Salary Compliance (Pay Limit Scheme)',
            minimum_balance_or_amount: 'Minimum 393,000 – 487,000 DKK gross annual salary depending on scheme threshold',
            time_frame: 'Stipulated in signed contract and paid into Danish NemKonto bank account',
            notes: 'Salary must comply with Danish collective wage standards.'
          }
        ],
        other_requirements: [
          { category: 'NemKonto Salary Mandate', details: 'Salaries in Denmark must be paid into a registered Danish bank account (NemKonto).' },
          { category: '14-Day Biometric Enrollment', details: 'Biometrics recorded at VFS within 14 calendar days of online AR1 submission.' }
        ],
        how_to_apply: [
          '1️⃣ Secure qualifying job offer meeting Danish salary or Positive List thresholds.',
          '2️⃣ Employer creates Case Order ID, pays SIRI fee, and submits Part 1 on nyidanmark.dk.',
          '3️⃣ Employee completes Part 2 with passport details and employment contract.',
          '4️⃣ Pay Danish Embassy fee on applyvisa.um.dk and book VFS biometrics within 14 days.',
          '5️⃣ Attend VFS for biometrics, receive approval, and obtain Biometric Residence Card in Denmark.'
        ],
        costs: {
          visa_fee: '4,800 – 5,200 DKK (SIRI) + 1,710 DKK (Embassy ApplyVisa)',
          service_fee: '₹1,800 – ₹2,500 (VFS Biometrics)',
          total_fee: 'Approx. 6,510 – 6,910 DKK (~₹78,000–₹83,000 INR)',
          notes: 'Official SIRI and MFA government fees.'
        },
        processing_and_timing: {
          apply_window: 'Apply 1 to 2 months before planned employment start date.',
          decision_time: 'Standard 30 calendar days (Fast-Track certified employers: 10 days).',
          max_extension: 'Renewable indefinitely as long as qualifying employment continues.',
          center_notes: 'Biometrics via VFS Global Denmark.'
        }
      };
    }

    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'Denmark',
        purpose_of_visit: 'Permanent Residency (PR) / Settlement',
        visa_type: 'Danish Permanent Residence Permit (Permanent Opholdstilladelse)',
        source_url: 'https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit',
        official_source_name: 'Danish Immigration Service (Udlændingestyrelsen) / SIRI',
        processing_time: '6 to 10 Months Standard SLA',
        validity: 'Indefinite Permanent Legal Residence in Denmark',
        stay_duration: 'Indefinite Permanent Settlement (Path to Danish Citizenship)',
        entry_type: 'Permanent Resident',
        validity_and_stay: {
          visa_validity: 'Permanent Residence Permit / Indefinite Legal Stay',
          max_stay_per_entry: 'Permanent Settlement in Denmark',
          entry_type: 'Permanent Resident'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Original valid passport and current Danish Residence Card.', is_mandatory: true },
          { title: 'Proof of 8 Years Legal Residence (or 4 Years Supplementary Route)', description: 'Documentation of continuous legal residence in Denmark for at least 8 years (or 4 years meeting 4 supplementary conditions).', is_mandatory: true },
          { title: 'Danish Language Exam (Prøve i Dansk 2 or 3)', description: 'Passed official Danish Language Exam 2 (or Exam 3 for 4-year accelerated route).', is_mandatory: true },
          { title: 'Proof of 3.5 Years Full-Time Employment', description: 'Tax records and employer declarations proving full-time employment for at least 3 years and 6 months within the last 4 years.', is_mandatory: true },
          { title: 'Clean Public Assistance Record', description: 'Proof of no social assistance received under the Active Social Policy Act for the past 4 years.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Steady Income & Tax Records', minimum_balance_or_amount: 'Self-sufficient income with no active public debt', time_frame: 'Last 4 consecutive years', notes: 'Verified via SKAT tax returns and Danish pension/salary registries.' }
        ],
        other_requirements: [
          { category: 'No Serious Criminal Record', details: 'Must have a clean criminal record with no convictions for serious offences.' },
          { category: 'Active Employment at Decision Time', details: 'Must be actively employed in Denmark at the time SIRI/DIS issues the permanent residence decision.' }
        ],
        how_to_apply: [
          '1️⃣ Complete required 8 years (or 4 accelerated years) of continuous legal residence.',
          '2️⃣ Pass Danish language exam (Prøve i Dansk 2/3) and compile SKAT tax records.',
          '3️⃣ Create Case Order ID on nyidanmark.dk and pay official permanent residence fee (approx. 4,800 DKK).',
          '4️⃣ Submit online application (TU1 or TU4 form) on nyidanmark.dk.',
          '5️⃣ Record biometrics at Citizen Service (Borgerservice) or SIRI office in Denmark.',
          '6️⃣ Receive official Permanent Residence Permit letter and updated card.'
        ],
        costs: {
          visa_fee: '4,800 – 5,200 DKK (SIRI / DIS Application Fee)',
          service_fee: '0 DKK (In-country Citizen Service)',
          total_fee: 'Approx. 5,000 DKK (~₹60,000 INR)',
          notes: 'Payable online on nyidanmark.dk.'
        },
        processing_and_timing: {
          apply_window: 'Apply before current temporary residence permit expires.',
          decision_time: 'Decision: 6 to 10 months.',
          max_extension: 'Permanent and indefinite; card renewed every 5-10 years.'
        }
      };
    }

    // Denmark Tourism / Short-Stay Default
    return {
      passport_country: from,
      destination_country: 'Denmark',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Denmark Short-Stay Schengen Visa (Type C)',
      source_url: 'https://applyvisa.um.dk',
      official_source_name: 'Ministry of Foreign Affairs of Denmark (Udenrigsministeriet) & VFS Global Denmark',
      processing_time: '15 Calendar Days (Standard Consular SLA)',
      validity: '90 Days Entry Window',
      stay_duration: 'Up to 90 Days in any 180-Day Period across Schengen Area',
      entry_type: 'Single / Multiple Entry',
      validity_and_stay: {
        visa_validity: 'Up to 90 Days / Multiple Entry',
        max_stay_per_entry: 'Up to 90 Days within 180 Days',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Valid for at least 3 months beyond intended departure from Schengen area, issued within last 10 years, with minimum 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'ApplyVisa Online Application Form & Cover Letter',
          description: 'Completed and paid online via the official Danish Ministry of Foreign Affairs portal (applyvisa.um.dk). Print the cover letter and receipt.',
          is_mandatory: true
        },
        {
          title: 'Two Biometric Passport Photographs (35×45mm)',
          description: 'Recent color photos on light background meeting ICAO biometric standards.',
          is_mandatory: true
        },
        {
          title: 'Travel Medical Insurance (Minimum €30,000)',
          description: 'Comprehensive travel insurance covering medical emergency, hospitalization, and repatriation across all Schengen states.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Flight Reservations (with PNR)',
          description: 'Round-trip flight booking with verifiable PNR entering Copenhagen (CPH) or Billund (BLL).',
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation',
          description: 'Confirmed hotel reservations in Denmark for all nights of stay or official invitation (VU1 form) from host in Denmark.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / Student / Business Status',
          description: 'Employer NOC letter with approved leave dates, recent 3 months payslips, or company registration & 3-year ITR.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Account Statements (Last 3 to 6 Months)',
          minimum_balance_or_amount: 'Minimum 500 DKK (~€70) per day if staying in hotel / 350 DKK (~€50) per day if staying with host',
          time_frame: 'Last 3 to 6 months bank statements (stamped and signed by bank)',
          notes: 'Must show regular income credits and sufficient liquid funds for the entire duration.'
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 2 to 3 financial years',
          notes: 'ITR-V acknowledgement copies showing declared income.'
        }
      ],
      other_requirements: [
        {
          category: 'ApplyVisa Portal Mandate',
          details: 'All visa applications for Denmark must be registered and paid online at applyvisa.um.dk prior to submitting physical documents at VFS.'
        },
        {
          category: 'Biometrics at VFS Denmark',
          details: 'Mandatory in-person appointment for 10-finger biometric scan and digital photograph.'
        }
      ],
      how_to_apply: [
        '1️⃣ Register on the official ApplyVisa portal (applyvisa.um.dk) and complete the visa application form online.',
        '2️⃣ Pay the visa fee (€90) securely online on applyvisa.um.dk and print the signed Cover Letter.',
        '3️⃣ Compile your document dossier: passport, photos, €30k insurance, flight reservation, hotel booking, bank statements (3-6 months), ITR, and employer NOC.',
        '4️⃣ Book an appointment at your nearest VFS Global Denmark application center in India.',
        '5️⃣ Attend the VFS appointment for biometric submission and hand over your document dossier.',
        '6️⃣ Track your application online and collect your passport with the Schengen visa sticker.'
      ],
      costs: {
        visa_fee: '€90 (approx. 675 DKK / ₹8,100)',
        service_fee: '₹1,800 – ₹2,500 (VFS Logistics Fee)',
        total_fee: '€90 + VFS Logistics',
        notes: 'Embassy visa fee paid online via card on applyvisa.um.dk; VFS fee paid at appointment.'
      },
      processing_and_timing: {
        apply_window: 'Apply up to 6 months before intended travel date.',
        decision_time: 'Decision: 15 calendar days from receipt at Embassy of Denmark in New Delhi (may extend to 45 days in peak season).',
        max_extension: 'Standard 90 days stay within any 180-day period in Schengen Area.',
        center_notes: 'Managed via VFS Global Denmark across 10+ Indian cities.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 1G. YEMEN OFFICIAL IMMIGRATION & BUSINESS CLEARANCE PATHWAYS
  // ═══════════════════════════════════════════════════════════════
  if (isYemen) {
    const isBusiness = purposeLower.includes('business') || purposeLower.includes('work') || purposeLower.includes('commercial') || purposeLower.includes('corporate') || purposeLower.includes('official');

    return {
      passport_country: from,
      destination_country: 'Yemen',
      purpose_of_visit: isBusiness ? 'Business / Corporate Visit' : 'Consular Visit',
      visa_type: 'Yemen Business / Consular Entry Visa (Subject to Prior MOI / PISA Security Clearance)',
      source_url: 'https://yemenembassy.in',
      official_source_name: 'Embassy of the Republic of Yemen, New Delhi & Ministry of Interior (PISA - Yemen)',
      processing_time: '10 to 20 Business Days (Post-MOI Clearance Receipt)',
      validity: '90 Days from Date of Issue',
      stay_duration: 'Up to 30 Days (Single Entry, Extendable in-country at PISA)',
      entry_type: 'Single Entry',
      validity_and_stay: {
        visa_validity: '90 Days Validity Window',
        max_stay_per_entry: 'Up to 30 Days',
        entry_type: 'Single Entry'
      },
      documents_required: [
        {
          title: 'Original Valid Passport',
          description: 'Must be valid for at least 6 months beyond travel date with at least 2 blank pages. ⚠️ STRICT RULE: Passport must NOT contain any Israeli visa, entry, exit, or border transit stamps.',
          is_mandatory: true
        },
        {
          title: 'Ministry of Interior (MOI / PISA) Approval Clearance Letter',
          description: 'Official Prior Security Clearance Letter issued by the Passports, Immigration & Naturalization Authority (PISA / MOI Yemen) in Aden/Sana\'a, obtained by the host company and officially transmitted to the Embassy of Yemen in New Delhi.',
          is_mandatory: true
        },
        {
          title: 'Completed Yemen Embassy Visa Application Form',
          description: 'Original visa application form fully completed in English/Arabic and signed by the applicant with two passport-sized color photos affixed.',
          is_mandatory: true
        },
        {
          title: 'Official Yemeni Company Invitation Letter (Chamber Certified)',
          description: 'Formal business invitation letter from the host organization in Yemen on official letterhead, stamped by the local Yemeni Chamber of Commerce & Industry, explaining the exact commercial purpose and duration of visit.',
          is_mandatory: true
        },
        {
          title: 'Indian Sponsoring Company Deputation & MEA Travel Undertaking',
          description: 'Deputation letter from the Indian employer on company letterhead confirming applicant\'s designation, salary, purpose of visit, and an explicit company undertaking acknowledging the Government of India (MEA) Travel Advisory on Yemen and assuming full medical/evacuation responsibility.',
          is_mandatory: true
        },
        {
          title: 'Medical Fitness Certificate (HIV, Hep B/C, TB)',
          description: 'Original medical fitness certificate including certified test reports for HIV, Hepatitis B & C, and Chest X-Ray for Tuberculosis issued by an authorized pathology laboratory.',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Itinerary',
          description: 'Round-trip flight booking entering via Aden International Airport (ADE) or Seiyun Airport (GXF).',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Company Financial Solvency & Bank Statements',
          minimum_balance_or_amount: 'Indian sponsoring company 6-month bank statement & ITR',
          time_frame: 'Last 6 consecutive months',
          notes: 'Verifies financial stability of the deputing Indian enterprise.'
        },
        {
          type: 'Host Company Financial Guarantee',
          minimum_balance_or_amount: 'Full financial, lodging, and security coverage in Yemen',
          time_frame: 'Stipulated in Chamber-attested invitation letter',
          notes: 'Yemeni host assumes official sponsorship under PISA regulations.'
        }
      ],
      other_requirements: [
        {
          category: '⚠️ Absolute Rejection: Israeli Visa / Border Stamp Prohibition',
          details: 'Yemeni immigration regulations strictly prohibit entry to any traveler whose passport bears an Israeli visa, entry/exit stamp, or border crossing stamp (e.g., King Hussein Bridge / Taba). Possession of any such stamp results in immediate refusal of visa and denial of entry at Yemeni ports.'
        },
        {
          category: 'No Commercial VAC / VFS Submission',
          details: 'There is NO VFS Global or commercial visa application center for Yemen. All applications must be submitted directly to the Consular Section of the Embassy of the Republic of Yemen in New Delhi.'
        },
        {
          category: 'Government of India (MEA) Travel Advisory Notice',
          details: 'The Ministry of External Affairs (MEA), Government of India maintains a strict travel advisory advising Indian nationals against non-essential travel to Yemen due to the prevailing security situation. Corporate travelers travel under corporate indemnity.'
        }
      ],
      how_to_apply: [
        '1️⃣ Sponsoring company in Yemen submits an application to the Ministry of Interior (PISA) in Aden/Sana\'a to obtain the official Visa Approval / No Objection Clearance.',
        '2️⃣ Ensure the MOI / PISA approval number and official cable are telexed/transmitted directly to the Embassy of the Republic of Yemen in New Delhi.',
        '3️⃣ Complete the official Yemen Visa Application Form and attach 2 recent color passport photographs.',
        '4️⃣ Compile complete dossier: original passport (strictly NO Israeli stamps), MOI approval copy, Chamber-certified Yemeni invitation, Indian employer deputation letter with MEA advisory undertaking, medical clearance certificate (HIV/Hep/TB), and return flight itinerary.',
        '5️⃣ Submit the physical application dossier directly to the Consular Section, Embassy of the Republic of Yemen, New Delhi and pay the consular fee ($100–$150 USD) via bank draft / consular counter.',
        '6️⃣ Track consular processing (10–20 business days) and collect your stamped passport directly from the Embassy.'
      ],
      costs: {
        visa_fee: '100 – 150 USD (approx. ₹8,500 – ₹12,500 INR)',
        service_fee: '₹0 (Direct Consular Submission — No Commercial VAC / VFS exists)',
        total_fee: '100 – 150 USD Total Official Consular Fee',
        notes: 'Payable directly to the Embassy of the Republic of Yemen in New Delhi via demand draft or authorized consular bank account.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 6 weeks before planned business travel once MOI approval is secured.',
        decision_time: '10 to 20 business days from receipt of physical passport and confirmed MOI telex clearance.',
        max_extension: 'Initial 30 days single entry; can be extended in-country at the Passports & Immigration Authority (PISA) in Aden.',
        center_notes: 'Consular Section, Embassy of the Republic of Yemen, 3, Western Avenue, Maharani Bagh, New Delhi 110065.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. GREECE & SCHENGEN PATHWAYS
  // ═══════════════════════════════════════════════════════════════
  if (isGreece || isSchengen) {
    const dest = isGreece ? 'Greece' : to;
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    const isStudy = purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('education');
    const isWork = purposeLower.includes('work') || purposeLower.includes('job') || purposeLower.includes('employment');
    const isBusiness = purposeLower.includes('business');
    const isFamily = purposeLower.includes('family') || purposeLower.includes('friend');

    if (isPR) {
      return {
        passport_country: from,
        destination_country: dest,
        purpose_of_visit: 'Permanent Residency / Settlement',
        visa_type: `${dest} Long-Term National Residence Permit (Type D / EU Permanent Settlement)`,
        source_url: isGreece ? 'https://migration.gov.gr/en/' : 'https://www.vfsglobal.com',
        official_source_name: `Ministry of Migration & Asylum & Consular Affairs of ${dest}`,
        processing_time: '60 to 90 Days Consular SLA',
        validity: '5-Year Permanent Residence Card (EU Long-Term Resident)',
        stay_duration: 'Indefinite / Permanent Settlement Status',
        entry_type: 'Permanent Resident',
        validity_and_stay: {
          visa_validity: '5-Year Renewable Permanent Residence Card',
          max_stay_per_entry: `Permanent Resident Status in ${dest} & Schengen Free Movement`,
          entry_type: 'Permanent Resident'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Valid for at least 1 year with blank pages, issued within last 10 years.', is_mandatory: true },
          { title: 'National Long-Stay (Type D) Visa Form', description: 'Completed and signed national settlement application form.', is_mandatory: true },
          { title: 'MEA Apostilled Criminal Record (PCC)', description: 'Original Police Clearance Certificate with MEA Apostille certification.', is_mandatory: true },
          { title: 'Proof of Legal Basis / Golden Visa / EU Blue Card', description: 'Property purchase contract, qualifying investment approval, or permanent job offer meeting salary thresholds.', is_mandatory: true },
          { title: 'Medical Fitness Certificate & Private Health Insurance', description: 'Authorized medical checkup report + comprehensive European health insurance.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Proof of Stable Financial Means', minimum_balance_or_amount: '€2,000–€3,500/month or qualifying property investment (€250k–€500k)', time_frame: 'Last 12 months bank statements & tax returns', notes: 'Demonstrates financial independence and sustained economic capacity.' }
        ],
        other_requirements: [
          { category: 'Apostille & Translation', details: 'All Indian civil certificates (Birth, Marriage, PCC) must be Apostilled by MEA and officially translated.' },
          { category: 'Biometrics at Immigration Office', details: 'Initial National D visa issued by Embassy; biometric residence card collected at local immigration office upon arrival.' }
        ],
        how_to_apply: [
          '1️⃣ Secure qualifying legal basis (EU Blue Card, Golden Visa investment, or Family Reunification approval).',
          '2️⃣ Obtain MEA Apostille on PCC and civil documents.',
          '3️⃣ Lodge National Long-Stay (Type D) visa application at the Embassy or authorized VAC.',
          '4️⃣ Submit biometrics and attend consular interview.',
          '5️⃣ Travel to destination country and register biometrics with immigration authority for physical EU Residence Card.'
        ],
        costs: {
          visa_fee: '€180 (Embassy Long-Stay Type D Fee)',
          service_fee: '€30 (VAC Fee)',
          total_fee: '€210 Total Reference',
          notes: 'Official national visa fee for long-stay settlement entry.'
        },
        processing_and_timing: {
          apply_window: 'Apply 2 to 4 months before intended relocation date.',
          decision_time: 'Decision: 60 to 90 calendar days.',
          max_extension: 'Permanent resident permit renewable every 5 years.'
        }
      };
    }

    if (isStudy) {
      return {
        passport_country: from,
        destination_country: dest,
        purpose_of_visit: 'Higher Studies',
        visa_type: `${dest} National Student Visa (Type D Long-Stay)`,
        source_url: isGreece ? 'https://in-gr.gvcworld.eu/en' : 'https://www.vfsglobal.com',
        official_source_name: `Consular Affairs & Ministry of Foreign Affairs of ${dest}`,
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Valid for at least 1 year with at least 2 blank pages, issued within the last 10 years.',
            is_mandatory: true
          },
          {
            title: 'National Visa D Application Form',
            description: 'Fully completed long-stay visa form signed by the applicant.',
            is_mandatory: true
          },
          {
            title: 'University Official Acceptance Letter',
            description: 'Unconditional admission letter stating course title, duration, and tuition fee status.',
            is_mandatory: true
          },
          {
            title: 'Apostilled Academic Certificates',
            description: 'High school / Bachelor degree certificates and transcripts with MEA Apostille stamp.',
            is_mandatory: true
          },
          {
            title: 'Police Clearance Certificate (PCC)',
            description: 'Original PCC issued by Regional Passport Office with MEA Apostille.',
            is_mandatory: true
          },
          {
            title: 'Medical Fitness Certificate',
            description: 'Medical certificate issued by authorized hospital confirming absence of contagious diseases.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Bank Solvency & Proof of Funds',
            minimum_balance_or_amount: '€700 – €900 per month of study duration',
            time_frame: 'Last 6 months bank statements with bank seal',
            notes: 'Blocked bank account or notarized parental financial sponsorship undertaking.'
          }
        ],
        other_requirements: [
          {
            category: 'Travel & Health Insurance',
            details: 'Comprehensive international student medical insurance covering €30,000+ for initial entry.'
          },
          {
            category: 'Biometrics at Visa Application Center',
            details: 'Mandatory in-person biometric appointment for fingerprinting.'
          }
        ],
        how_to_apply: [
          'Secure unconditional admission from authorized European institution.',
          'Complete National D visa application and compile apostilled dossier.',
          'Book appointment at consular visa center.',
          'Submit biometrics, dossier, and attend consular interview if requested.',
          'Receive National D student visa sticker in passport.'
        ],
        costs: {
          visa_fee: '€180 (approx. ₹16,400)',
          service_fee: '€30 (VAC Fee)',
          total_fee: '€210 Total Reference',
          notes: 'Official consular fee for national long-stay visa.'
        },
        processing_and_timing: {
          apply_window: 'Apply 2 to 3 months prior to intake start date.',
          decision_time: 'Decision: 30 to 60 calendar days.',
          max_extension: 'Depends on national immigration authority clearance.',
          center_notes: 'Requires in-person biometric submission.'
        }
      };
    }

    if (isWork) {
      return {
        passport_country: from,
        destination_country: dest,
        purpose_of_visit: 'Employment / Work',
        visa_type: `${dest} National Employment Visa (Type D)`,
        source_url: isGreece ? 'https://in-gr.gvcworld.eu/en' : 'https://www.vfsglobal.com',
        official_source_name: `Ministry of Labour & Consular Affairs of ${dest}`,
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Valid for at least 1 year beyond departure date with 2 blank pages.',
            is_mandatory: true
          },
          {
            title: 'Ministry Work Permit Pre-Approval',
            description: 'Official labour authority approval letter secured by sponsoring employer in Europe.',
            is_mandatory: true
          },
          {
            title: 'Signed Employment Contract',
            description: 'Original employment agreement signed by European employer and employee.',
            is_mandatory: true
          },
          {
            title: 'Apostilled Police Clearance Certificate (PCC)',
            description: 'Clean criminal record check with MEA Apostille certification.',
            is_mandatory: true
          },
          {
            title: 'Medical Fitness Certificate',
            description: 'Medical clearance from recognized medical center.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Guaranteed Employment Salary',
            minimum_balance_or_amount: 'Compliant with national statutory minimum wage standards',
            time_frame: 'Stipulated in signed contract',
            notes: 'Employer financial guarantee and social security registration.'
          }
        ],
        other_requirements: [
          {
            category: 'Initial Travel Insurance',
            details: 'Minimum €30,000 policy until national health insurance registration becomes active.'
          },
          {
            category: 'Biometrics & Submission',
            details: 'Mandatory in-person biometrics at authorized visa center.'
          }
        ],
        how_to_apply: [
          'Employer obtains labour ministry work pre-approval.',
          'Complete National Visa application form.',
          'Compile apostilled PCC, medical, and contract dossier.',
          'Submit at authorized VAC center and pay consular fees.',
          'Collect passport with Type D employment visa.'
        ],
        costs: {
          visa_fee: '€180 (approx. ₹16,400)',
          service_fee: '€30 (VAC Fee)',
          total_fee: '€210 Total Reference',
          notes: 'Official national long-stay consular fee.'
        },
        processing_and_timing: {
          apply_window: 'Apply 2 to 3 months prior to contract commencement.',
          decision_time: 'Decision: 30 to 60 calendar days.',
          max_extension: 'Subject to immigration police vetting.',
          center_notes: 'Handled via consular diplomatic missions.'
        }
      };
    }

    if (isBusiness) {
      return {
        passport_country: from,
        destination_country: dest,
        purpose_of_visit: 'Business Visit',
        visa_type: 'Schengen Business Visa (Type C)',
        source_url: isGreece ? 'https://in-gr.gvcworld.eu/en' : 'https://www.vfsglobal.com',
        official_source_name: `${dest} Consular Affairs & VFS/GVCW Portals`,
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Valid for at least 3 months beyond departure date, issued within 10 years with 2 blank pages.',
            is_mandatory: true
          },
          {
            title: 'Official Invitation Letter',
            description: 'Formal invitation from host company in Schengen area detailing visit purpose, duration, and VIES tax ID.',
            is_mandatory: true
          },
          {
            title: 'Employer Dispatch Letter & NOC',
            description: 'Deputation letter from sending company stating traveler position, reason for travel, and financial guarantee.',
            is_mandatory: true
          },
          {
            title: 'Travel Medical Insurance',
            description: 'Minimum €30,000 coverage across all 29 Schengen states with repatriation cover.',
            is_mandatory: true
          },
          {
            title: 'Flight & Hotel Reservations',
            description: 'Confirmed round-trip flights and business hotel bookings.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Company & Personal Bank Statements',
            minimum_balance_or_amount: '€50 – €70 per day of intended stay',
            time_frame: 'Last 3 to 6 months',
            notes: 'Stamped and signed by issuing bank; company financial undertaking letter.'
          },
          {
            type: 'Company Tax Returns (ITR)',
            minimum_balance_or_amount: null,
            time_frame: 'Last 2 assessment years',
            notes: 'ITR-V acknowledgements and company GST registration.'
          }
        ],
        other_requirements: [
          {
            category: 'Biometrics at Application Center',
            details: 'Mandatory in-person appointment for 10-finger biometric scan.'
          },
          {
            category: 'Schengen 90/180 Rule',
            details: 'Stay permitted up to 90 days in any 180-day window for business meetings.'
          }
        ],
        how_to_apply: [
          'Complete online harmonized Schengen application form.',
          'Compile business invitation, company NOC, and €30,000 insurance.',
          'Book appointment at authorized VAC (GVCW / VFS).',
          'Attend appointment for biometrics and submission.',
          'Collect stamped passport.'
        ],
        costs: {
          visa_fee: '€90',
          service_fee: '€30',
          total_fee: '€120',
          notes: 'Payable in local currency at VAC submission.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 6 months prior to business travel.',
          decision_time: 'Decision: up to 15 calendar days from consular receipt.',
          max_extension: 'May extend to 45 calendar days during peak consular load.',
          center_notes: 'Courier transit applies for non-metro centers.'
        }
      };
    }

    if (isFamily) {
      return {
        passport_country: from,
        destination_country: dest,
        purpose_of_visit: 'Family / Friends Visit',
        visa_type: 'Schengen Visitor Visa (Private Visit)',
        source_url: isGreece ? 'https://in-gr.gvcworld.eu/en' : 'https://www.vfsglobal.com',
        official_source_name: `${dest} Consular Affairs & Diplomatic Missions`,
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Valid for at least 3 months after departure date with 2 blank pages.',
            is_mandatory: true
          },
          {
            title: 'Official Municipal Host Declaration',
            description: 'Formal invitation authenticated by local municipality / Greek Police in host country.',
            is_mandatory: true
          },
          {
            title: 'Proof of Host Legal Residence',
            description: 'Host ID card, EU passport, or valid residence permit copy.',
            is_mandatory: true
          },
          {
            title: 'Proof of Relationship',
            description: 'Birth or marriage certificates establishing family connection with host.',
            is_mandatory: true
          },
          {
            title: 'Travel Medical Insurance',
            description: 'Minimum €30,000 coverage across all Schengen states.',
            is_mandatory: true
          }
        ],
        financial_proofs: [
          {
            type: 'Bank Statements (Traveler or Host)',
            minimum_balance_or_amount: '€50 per day of intended stay',
            time_frame: 'Last 3 to 6 months',
            notes: 'Bank statements with official stamp; host tax return if sponsoring living costs.'
          }
        ],
        other_requirements: [
          {
            category: 'Home Ties Proof',
            details: 'Proof of ongoing employment or property ensuring return.'
          },
          {
            category: 'Biometrics Submission',
            details: 'Mandatory in-person fingerprint and photograph capture at VAC.'
          }
        ],
        how_to_apply: [
          'Complete Schengen visa application form.',
          'Obtain authenticated municipal invitation from host.',
          'Book appointment at authorized visa application center.',
          'Submit biometrics and supporting dossier.',
          'Track application and collect passport.'
        ],
        costs: {
          visa_fee: '€90',
          service_fee: '€30',
          total_fee: '€120',
          notes: 'Payable in local currency at VAC submission.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 6 months before travel.',
          decision_time: 'Decision: up to 15 calendar days.',
          max_extension: 'May extend to 45 calendar days.',
          center_notes: 'Regional dispatch applies.'
        }
      };
    }

    // ── Greece / Schengen Tourism (100% Verified — Embassy of Greece & GVCW Standards) ──
    return {
      passport_country: from,
      destination_country: dest,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: isGreece ? 'Schengen Short-Stay Visa Type C — Greece (via GVCW / Embassy of Greece)' : 'Short-stay Schengen Visa (Type C)',
      source_url: isGreece ? 'https://in-gr.gvcworld.eu/en/visa-info-tourism' : 'https://www.vfsglobal.com',
      official_source_name: isGreece
        ? 'Embassy of Greece, New Delhi — GVC World (GVCW) Official Portal'
        : `${dest} Embassy — VFS Global Official Portal`,
      documents_required: [
        {
          title: 'Valid Passport',
          description: 'Must be valid for at least 6 months from planned departure date (Schengen legal minimum: 3 months beyond return, but 6 months recommended). Issued within last 10 years. Minimum 2 blank visa pages required. Carry all old passports if any.',
          is_mandatory: true
        },
        {
          title: isGreece ? 'Harmonised Schengen Visa Application Form (NOT DS-160)' : 'Schengen Visa Application Form',
          description: isGreece
            ? 'Official Harmonised Schengen Visa Application Form — completed online via the GVCW E-VISA Portal (in-gr.gvcworld.eu) or downloaded from the Embassy of Greece website. ⚠️ IMPORTANT: DS-160 is EXCLUSIVELY for US Visas — submitting DS-160 for a Greece visa will result in immediate rejection at the counter.'
            : 'Completed Harmonised Schengen Visa Application Form — fully filled, signed, and dated by the applicant. Available from the official embassy or VFS portal.',
          is_mandatory: true
        },
        {
          title: 'Biometric Passport Photos — 35×45mm',
          description: '2 recent identical biometric colour photographs. Size: 35mm × 45mm. White or off-white plain background. Neutral expression, mouth closed, eyes open and looking directly at camera. Taken within the last 6 months. No glasses, head coverings (except religious), or digital filters.',
          is_mandatory: true
        },
        {
          title: 'Travel Medical Insurance — Min. €30,000',
          description: 'Mandatory Schengen Travel Health Insurance policy. Minimum coverage: €30,000 (thirty thousand euros). Must cover: emergency medical treatment, hospitalization, medical repatriation and repatriation of mortal remains. Valid for ALL Schengen Area countries. Coverage must span the entire trip duration including buffer days.',
          is_mandatory: true
        },
        {
          title: 'Round-Trip Flight Itinerary / Reservations (with PNR)',
          description: isGreece
            ? 'Confirmed round-trip flight reservation showing outbound and return flights with a verifiable PNR (Passenger Name Record). ⚠️ Do NOT purchase non-refundable tickets before the visa is issued — book a refundable or on-hold reservation only. Itinerary must show travel from India → Greece → India.'
            : `Confirmed round-trip flight reservation showing outbound and return flights with a verifiable PNR. Do NOT purchase non-refundable tickets prior to visa approval. Itinerary must show travel between ${from} and ${dest}.`,
          is_mandatory: true
        },
        {
          title: 'Proof of Accommodation for Entire Stay',
          description: isGreece
            ? 'Confirmed hotel bookings for every night of your stay in Greece (all cities/islands including Athens, Santorini, Mykonos, Crete, etc.). If staying with family/friends: an official Invitation Letter (Declaration of Hospitality) submitted via the Greek Police or authenticated via gov.gr. Booking.com or Airbnb confirmations showing full name, dates, and property address are accepted.'
            : 'Confirmed hotel bookings or accommodation proof for all nights of stay. Must show full name, dates of stay, and property address. If staying with host: notarized invitation letter from host with their residence proof.',
          is_mandatory: true
        },
        {
          title: 'Detailed Day-by-Day Travel Itinerary / Cover Letter',
          description: isGreece
            ? 'A cover letter (self-written or agency-prepared) providing a clear day-by-day travel plan: Entry and exit dates. Cities/islands to be visited (e.g., Day 1-3: Athens, Day 4-6: Santorini, Day 7-9: Mykonos, Day 10: Departure). Mode of transport between islands (ferry/domestic flight). Purpose of each stop. This helps the consular officer assess your trip is genuine tourism.'
            : 'A detailed cover letter explaining your travel plans day-by-day, cities to visit, activities, and return intention.',
          is_mandatory: true
        },
        {
          title: 'Proof of Employment / Occupation Status',
          description: 'Submit documents matching your employment status:\n\n🏢 EMPLOYED: (a) Original NOC / Leave Approval Letter from employer on company letterhead — must state your designation, salary, approved leave dates, and that you will return to your position. (b) Salary slips for the last 3 consecutive months. (c) Employment contract or appointment letter.\n\n🏭 SELF-EMPLOYED / BUSINESS OWNER: (a) Company Registration Certificate / Incorporation Certificate. (b) GST Registration Certificate. (c) Business ITR for last 3 financial years. (d) Company bank statements (last 6 months).\n\n🎓 STUDENT: (a) Original Bonafide Certificate / Enrollment Certificate from university/school. (b) Official Student ID card (photocopy). (c) No Objection Certificate (NOC) from the institution granting permission to travel.\n\n🏠 RETIRED / HOMEMAKER: Pension statement or bank statements showing regular income source.',
          is_mandatory: true
        },
        {
          title: 'Bank Account Statements — Last 3 to 6 Months',
          description: 'Original bank statements for ALL your bank accounts for the last 3 to 6 months. Must be stamped and signed by the bank branch manager (self-printed online statements NOT accepted). Must show sufficient funds — typically €50 to €70 per day of stay (e.g., 10-day trip = minimum €500–€700 liquid balance). Statements must clearly show: account holder name, account number, transaction history, and closing balance.',
          is_mandatory: true
        },
        {
          title: 'Income Tax Returns (ITR) — Last 3 Years',
          description: 'ITR-V acknowledgement copies for the last 3 consecutive financial years (e.g., FY 2022-23, 2023-24, 2024-25). Must be e-filed and acknowledged by the Income Tax Department of India. For self-employed: Business ITR (ITR-3 or ITR-4) for 3 years. For salaried: ITR-1 (Sahaj) or ITR-2 with Form 16 from employer.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Bank Account Statements (Primary)',
          minimum_balance_or_amount: '€50–€70 per day of stay (e.g., min. €700 for a 10-day trip)',
          time_frame: 'Last 3 to 6 months (bank-stamped originals only)',
          notes: isGreece
            ? 'Must show regular income credits, no sudden large deposits. Original bank stamp + branch manager signature mandatory. Online/self-printed statements are NOT accepted by the Embassy of Greece.'
            : `Must show regular income credits, no sudden large deposits. Original bank stamp + branch manager signature mandatory. Online/self-printed statements are NOT accepted by the Embassy / Consulates of ${dest}.`
        },
        {
          type: 'Income Tax Returns (ITR-V)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 3 consecutive financial years',
          notes: 'ITR-V e-filing acknowledgements. Salaried: ITR-1/ITR-2 + Form 16. Self-employed: ITR-3/ITR-4 (Business ITR). Students/Dependents: Sponsor\'s ITR.'
        },
        {
          type: 'Salary Slips (Employed Applicants)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 3 consecutive months',
          notes: 'Original salary slips signed/stamped by employer HR. Must show gross salary, deductions, and net salary. Should match the bank statement credits.'
        },
        {
          type: 'Business Financial Proof (Self-Employed)',
          minimum_balance_or_amount: null,
          time_frame: 'Last 3 years ITR + Last 6 months company bank statements',
          notes: 'Company Registration Certificate + GST Certificate + Audited business accounts or CA-certified balance sheet.'
        },
        {
          type: 'Fixed Deposits / Investments (Supporting)',
          minimum_balance_or_amount: null,
          time_frame: 'Current FD receipts or investment portfolio statement',
          notes: 'Supporting financial documents showing overall wealth and strong economic ties to India — reduces risk of overstay suspicion.'
        }
      ],
      other_requirements: [
        {
          category: '⚠️ Application Form — CRITICAL',
          details: isGreece
            ? 'Use ONLY the Harmonised Schengen Visa Application Form from GVCW (in-gr.gvcworld.eu) or the Embassy of Greece. DS-160 is a US Nonimmigrant Visa form — submitting it for Greece will result in IMMEDIATE REJECTION. The GVCW e-portal guides applicants through the correct form online.'
            : 'Use the official Harmonised Schengen Visa Application Form from your target country\'s embassy or authorized VAC portal. Do NOT use DS-160 (US visa form).'
        },
        {
          category: 'Schengen 90/180 Day Rule',
          details: 'A Schengen Type C visa allows stays of up to 90 days within any rolling 180-day period across all 29 Schengen Area countries combined. Overstaying results in a multi-year Schengen entry ban and potential deportation.'
        },
        {
          category: 'Biometrics — Mandatory In-Person Appointment',
          details: isGreece
            ? 'All applicants must attend an in-person appointment at the GVCW Visa Application Center (VAC) in India (New Delhi, Mumbai, Chennai, Kolkata, Bangalore, Hyderabad, Ahmedabad, Chandigarh). Biometrics include: 10-finger digital fingerprint scan + live digital facial photograph. Children under 12 are exempt from fingerprinting.'
            : 'Mandatory in-person appointment for 10-finger biometric scan and live digital facial photograph at authorized VAC. Children under 12 exempt from fingerprinting.'
        },
        {
          category: 'Strong Ties to Home Country',
          details: isGreece
            ? 'The consular officer must be convinced you will return to India before your visa expires. Provide strong evidence of ties: Employment letter, property ownership documents, family responsibilities, bank assets, or business ownership. Weak home-country ties are the #1 reason for Greece visa rejection.'
            : `The consular officer must be convinced you will return to your home country before your visa expires. Provide strong evidence of ties: Employment letter, property ownership documents, family responsibilities, bank assets, or business ownership. Weak home-country ties are the #1 reason for visa rejection.`
        },
        {
          category: 'Travel & Hotel — Do NOT Buy Non-Refundable',
          details: 'Only book refundable/on-hold flight reservations and hotel bookings for the visa application. Wait for visa approval before making non-refundable purchases. Many travel agents offer "visa purpose" itineraries that are valid for 2-4 weeks for consular submission.'
        },
        {
          category: isGreece ? 'Greece-Specific: Island Travel Planning' : 'Schengen Travel Planning',
          details: isGreece
            ? 'If visiting Greek islands (Santorini, Mykonos, Crete, Rhodes, Corfu), include inter-island ferry/domestic flight bookings in your itinerary. Ferry routes from Athens (Piraeus port) to islands are popular — book on seajets.gr or ferryscanner.com for your visa application. Include these in your accommodation proof.'
            : 'Plan your primary entry Schengen country carefully — you must apply to the embassy of the country where you will spend the most time, or your first point of entry if travel time is equal.'
        }
      ],
      how_to_apply: isGreece ? [
        '1️⃣ Register on the GVCW E-VISA Portal (in-gr.gvcworld.eu) and fill in the Harmonised Schengen Visa Application Form online.',
        '2️⃣ Pay the visa fee online: €90 (Embassy fee) + €30 (GVCW VAC service charge) = €120 total.',
        '3️⃣ Compile your complete document dossier: passport, photos, insurance, flight itinerary (with PNR), hotel bookings, day-by-day travel plan, bank statements (3-6 months, bank-stamped), ITR (3 years), employment/NOC letter.',
        '4️⃣ Book your in-person appointment at the nearest GVCW VAC (available in 8 Indian cities).',
        '5️⃣ Attend the appointment for biometric submission (fingerprints + photo) and hand over your document dossier.',
        '6️⃣ Track your application via the GVCW tracking portal. Standard processing: 15 calendar days. Peak season (June–August): up to 45 days.',
        '7️⃣ Collect your passport with the Schengen visa sticker from the VAC or via courier.'
      ] : [
        'Complete the Harmonised Schengen Visa Application Form from the official embassy/VFS portal.',
        'Pay the visa fee online (€90 embassy + VAC service fee).',
        'Compile your document dossier: passport, photos, insurance, flights, hotel, bank statements, ITR, employment proof.',
        'Book an in-person appointment at the authorized VAC in India.',
        'Attend appointment for biometrics and document submission.',
        'Track your application and collect passport.'
      ],
      costs: {
        visa_fee: '€90 (approx. ₹8,100 at current exchange rate)',
        service_fee: isGreece ? '€30 — GVCW VAC Service Charge (approx. ₹2,700)' : '€30 — VAC Service Charge',
        total_fee: '€120 Total (approx. ₹10,800)',
        notes: isGreece
          ? 'Fees payable in INR at the GVCW VAC at time of appointment. Embassy visa fee (€90) is NON-REFUNDABLE even if the visa is refused. Children under 6: FREE. Children 6–12: €45 (half fee). Rate subject to INR/EUR exchange rate on date of payment.'
          : 'Fees payable in INR at the VAC. Embassy visa fee is non-refundable if refused. Children under 6: free. Children 6–12: €45.'
      },
      processing_and_timing: {
        apply_window: 'Apply between 6 months and minimum 15 calendar days before travel date.',
        decision_time: isGreece
          ? 'Standard: 15 calendar days from date of admissible application receipt at Embassy of Greece. Peak season (June–August / Christmas): may extend up to 45 calendar days.'
          : 'Standard: 15 calendar days. May extend up to 45 days.',
        max_extension: 'Maximum stay: 90 days within any rolling 180-day period (Schengen 90/180 rule).',
        center_notes: isGreece
          ? 'GVCW VAC locations in India: New Delhi (main), Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad, Ahmedabad, Chandigarh. Non-Delhi applications may require 3–5 additional days for document dispatch to Embassy.'
          : 'VFS Global VAC centers across major Indian cities. Non-metro applications may need extra dispatch days.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. UNITED STATES (USA) OFFICIAL EMBASSY REQUIREMENTS
  // ═══════════════════════════════════════════════════════════════
  if (isUSA) {
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    const isBusiness = purposeLower.includes('business') || purposeLower.includes('corporate') || purposeLower.includes('commercial') || purposeLower.includes('b1') || purposeLower.includes('meeting') || purposeLower.includes('conference');
    const isStudent = purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('university') || purposeLower.includes('college');
    const isWork = purposeLower.includes('work') || purposeLower.includes('job') || purposeLower.includes('employment') || purposeLower.includes('h1b') || purposeLower.includes('l1');

    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'United States',
        purpose_of_visit: 'Permanent Residency (PR) / Immigrant Visa',
        visa_type: 'US Immigrant Visa & Permanent Residency (EB-1 / EB-2 / EB-3 / EB-5 / Family Class)',
        source_url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate.html',
        official_source_name: 'U.S. Citizenship and Immigration Services (USCIS) & National Visa Center (NVC)',
        processing_time: 'NVC Consular Processing (Subject to Visa Bulletin Priority Dates)',
        validity: 'Permanent Resident Status (10-Year Renewable Green Card; 6-Month Immigrant Foil for Initial Travel)',
        stay_duration: 'Permanent / Indefinite Legal Resident Status (LPR) with Path to US Citizenship after 5 Years',
        entry_type: 'Permanent Resident (LPR)',
        validity_and_stay: {
          visa_validity: 'Permanent Resident Status (10-Year Renewable Green Card)',
          max_stay_per_entry: 'Permanent / Indefinite Resident Status in the United States',
          entry_type: 'Permanent Resident (LPR)'
        },
        documents_required: [
          { title: 'Approved USCIS Immigrant Petition (Form I-130 / I-140 / I-526)', description: 'Official Form I-797 approval notice with current Priority Date under the Department of State monthly Visa Bulletin.', is_mandatory: true },
          { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond the intended date of entry into the United States with blank visa pages.', is_mandatory: true },
          { title: 'Form DS-260 Immigrant Visa Confirmation Page', description: 'Online Immigrant Visa Electronic Application confirmation page submitted via CEAC with barcode.', is_mandatory: true },
          { title: 'Form I-864 Affidavit of Support & IRS Tax Transcripts', description: 'Legally binding financial sponsorship with IRS tax transcripts and W-2s proving income above 125% of Federal Poverty Guidelines.', is_mandatory: true },
          { title: 'Civil Documents & Police Clearance Certificates (PCC)', description: 'Original birth certificates, marriage certificates, and PCCs from Regional Passport Office (RPO) and all countries lived in for 6+ months.', is_mandatory: true },
          { title: 'CDC Approved Panel Physician Medical Examination', description: 'Sealed medical report from panel physician (Max Healthcare, Apollo) including syphilis, gonorrhea, and TB chest X-ray screening.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'IRS Federal Tax Transcripts & Form I-864', minimum_balance_or_amount: 'Minimum 125% of US Federal Poverty Guidelines for household size', time_frame: 'Last 3 years IRS federal tax transcripts + current employment verification', notes: 'Petitioner / joint sponsor must demonstrate ongoing financial capacity to maintain intending immigrant above poverty line.' }
        ],
        other_requirements: [
          { category: 'Visa Bulletin Priority Date Cutoff', details: 'Immigrant visa interview is scheduled by NVC only when the applicant\'s Priority Date becomes "Current" in the final action dates chart of the DOS Visa Bulletin.' },
          { category: 'Two-Stage Immigrant Biometrics & Interview', details: 'Stage 1: VAC for biometric submission and photo. Stage 2: In-depth immigrant visa interview at the US Embassy in New Delhi or US Consulate Mumbai.' },
          { category: 'USCIS Immigrant Fee (235 USD)', details: 'After visa issuance, the 235 USD USCIS Immigrant Fee must be paid online via USCIS Electronic Immigration System (ELIS) before traveling to the US to produce the physical Green Card.' },
          { category: 'Panel Physician Medical Exam', details: 'Mandatory panel physician medical screening and vaccination dossier must be completed within 6 months of consular interview.' }
        ],
        how_to_apply: [
          '1️⃣ Sponsoring employer or qualifying family relative files Immigrant Petition (Form I-130 / I-140) with USCIS and receives approval.',
          '2️⃣ Case transferred to National Visa Center (NVC); pay DS-260 immigrant fee (345 USD for employment / 325 USD for family) and I-864 review fee (120 USD).',
          '3️⃣ Complete online Form DS-260 and upload civil documents, PCC, and I-864 Affidavit of Support with IRS tax returns.',
          '4️⃣ Complete medical exam at CDC-authorized panel physician clinic in India.',
          '5️⃣ Attend Biometrics appointment at VAC, followed by Immigrant Visa Interview at the US Embassy/Consulate with original civil dossier.',
          '6️⃣ Upon approval, receive 6-month immigrant entry visa foil in passport; pay 235 USD USCIS Immigrant Fee online and travel to the US to receive physical 10-Year Green Card.'
        ],
        costs: {
          visa_fee: '345 USD (Employment-Based DS-260) / 325 USD (Family-Based DS-260)',
          service_fee: '235 USD (USCIS Immigrant Fee for Green Card Production) + 120 USD (NVC I-864 Review if applicable)',
          total_fee: '580 USD – 700 USD Official Government Fee Breakdown',
          notes: 'NVC fees paid via CEAC portal. 235 USD Green Card production fee paid online to USCIS before US arrival. Excludes initial Form I-130/I-140 filing fees.'
        },
        processing_and_timing: {
          apply_window: 'File DS-260 once NVC issues welcome letter and Priority Date is current in Visa Bulletin.',
          decision_time: 'Decision: Interview decision given verbally at consular counter on interview day.',
          max_extension: 'Permanent Resident (Green Card) status is indefinite; physical card valid for 10 years and renewable online.'
        }
      };
    }

    if (isBusiness) {
      return {
        passport_country: from,
        destination_country: 'United States',
        purpose_of_visit: 'Business / Corporate Visit (B-1)',
        visa_type: 'B-1 / B1/B2 Nonimmigrant Visitor Visa',
        source_url: 'https://travel.state.gov/content/travel/en/us-visas/business.html',
        official_source_name: 'U.S. Department of State & U.S. Embassy Consular Affairs',
        processing_time: 'Verbal Decision at Consular Window',
        validity: 'Up to 10 Years (120 Months) Multiple Entry',
        stay_duration: 'Up to 6 Months (180 Days) per entry (determined by CBP on Form I-94)',
        entry_type: 'Multiple Entry',
        validity_and_stay: {
          visa_validity: 'Up to 10 Years (120 Months) Multiple Entry',
          max_stay_per_entry: 'Up to 6 Months (180 Days) per entry (determined by CBP on Form I-94)',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          { title: 'Official U.S. Business Invitation Letter', description: 'Official invitation from U.S. host enterprise detailing meetings, conferences, business negotiations, training scope, dates, and host company details.', is_mandatory: true },
          { title: 'Indian Employer Deputation / Cover Letter', description: 'Official corporate letter on employer letterhead explicitly stating who is funding the trip, project purpose, applicant\'s role, and confirming that no U.S. salary will be drawn (staying on Indian payroll).', is_mandatory: true },
          { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond intended stay with blank visa pages.', is_mandatory: true },
          { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation sheet with clear 10-character alphanumeric barcode.', is_mandatory: true },
          { title: 'Appointment Confirmation Letter', description: 'Printed confirmation confirming both VAC Biometrics and Consular Interview appointments.', is_mandatory: true },
          { title: 'Company Standing & Professional Background', description: 'Employer registration certificate / GST, corporate business cards, and project documentation confirming legitimate commercial purpose.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Corporate Financial Undertaking & Bank Statements', minimum_balance_or_amount: 'Covered by Indian Employer or 4,000–7,000 USD personal liquidity', time_frame: 'Last 6 months company and personal bank statements + 3 years ITR / Form 16', notes: 'Employer cover letter confirming all flights, lodging, and per-diem business expenses are fully sponsored by the Indian organization.' }
        ],
        other_requirements: [
          { category: 'Prohibition on Productive U.S. Labor (B-1 Scope)', details: 'Under B-1 status, taking up local productive employment, performing hands-on billable work, or drawing salary from a U.S. entity is strictly prohibited. Permitted activities: business conferences, client consultations, contract negotiations, exhibitions, and short-term corporate training.' },
          { category: 'Two-Stage Appointment Requirement', details: 'You must attend two separate appointments: (1) VAC for photo & biometrics, and (2) US Embassy/Consulate for the mandatory in-person consular interview.' },
          { category: 'Section 214(b) INA Adjudication', details: 'Applicant must demonstrate strong economic, professional, and business ties to India confirming departure upon conclusion of the business visit.' },
          { category: 'Length of Stay Determined by CBP', details: 'The consular visa foil allows travel to a US port of entry. The U.S. Customs and Border Protection (CBP) officer determines authorized stay duration upon arrival (recorded on electronic Form I-94, typically up to 180 days).' }
        ],
        how_to_apply: [
          '1️⃣ Complete the official Form DS-160 online (ceac.state.gov) selecting B-1 (Business/Conference) and print your confirmation barcode.',
          '2️⃣ Create a profile on usvisascheduling.com and pay the 185 USD MRV visa fee (via UPI, NEFT, or card).',
          '3️⃣ Schedule your two appointments: (1) VAC Biometrics appointment, and (2) Consular Interview.',
          '4️⃣ Attend VAC appointment with passport and DS-160 confirmation for photo and fingerprint registration.',
          '5️⃣ Attend Consular Interview at US Embassy/Consulate with your Official U.S. Business Invitation Letter and Indian Employer Deputation Letter.',
          '6️⃣ Upon visa approval, collect your 10-year multiple-entry visa stamped passport from selected VAC or premium courier.'
        ],
        costs: {
          visa_fee: '185 USD (approx. ₹15,540 MRV fee)',
          service_fee: '0 USD (Direct Consular Fee)',
          total_fee: '185 USD Total Reference',
          notes: 'Payable online directly via official US Visa Scheduling portal (UPI / NEFT / Debit / Credit Card); valid for 10 years multiple entry.'
        },
        processing_and_timing: {
          apply_window: 'Apply 2 to 3 months before intended business travel date.',
          decision_time: 'Decision: Verbal decision given immediately at the interview window.',
          max_extension: '10-Year Multiple Entry Visa (up to 6 months stay per entry authorized at CBP port of entry on electronic Form I-94).'
        }
      };
    }

    if (isStudent) {
      return {
        passport_country: from,
        destination_country: 'United States',
        purpose_of_visit: 'Higher Studies / Academic Degree (F-1)',
        visa_type: 'F-1 Academic Student Visa',
        source_url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
        official_source_name: 'U.S. Department of State & U.S. Embassy Consular Affairs',
        processing_time: 'Verbal Decision at Consular Window',
        validity: 'Duration of Status (D/S) — Typically up to 5 Years',
        stay_duration: 'Duration of Status (D/S) + 60-Day Post-Completion Grace Period',
        entry_type: 'Multiple Entry',
        validity_and_stay: {
          visa_validity: 'Duration of Status (D/S) — Typically up to 5 Years',
          max_stay_per_entry: 'Duration of Academic Program (D/S) + 60-Day Grace Period',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          { title: 'Form I-20 (Certificate of Eligibility)', description: 'Official signed Form I-20 issued by SEVP-certified US educational institution with SEVIS ID and program dates.', is_mandatory: true },
          { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended period of stay in the United States with blank visa pages.', is_mandatory: true },
          { title: 'Form DS-160 Confirmation Page', description: 'Online Nonimmigrant Visa Application confirmation page with clear 10-character alphanumeric barcode.', is_mandatory: true },
          { title: 'I-901 SEVIS Fee Payment Receipt', description: 'Official proof of payment of mandatory 350 USD SEVIS fee paid online at fmjfee.com at least 3 days before interview.', is_mandatory: true },
          { title: 'Appointment Confirmation Letter', description: 'Printed confirmation confirming both VAC Biometrics and Consular Interview appointments.', is_mandatory: true },
          { title: 'Academic Credentials & Test Scores', description: 'Degree certificates, marksheets, GRE/GMAT, and TOEFL/IELTS/PTE scorecards matching the I-20 application.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Liquid Funds Covering 1st Year Costs', minimum_balance_or_amount: 'Total 1-year estimated tuition + living costs as stated on Form I-20', time_frame: 'Last 6 months bank statements', notes: 'Bank balance certificates, fixed deposit receipts, approved education loan sanction letters, or sponsor affidavit (Form I-134).' }
        ],
        other_requirements: [
          { category: 'Two-Stage Appointment Structure', details: 'You must attend two separate appointments: (1) VAC for digital photograph & 10-finger biometrics, and (2) US Embassy/Consulate for the mandatory in-person consular interview.' },
          { category: 'I-901 SEVIS Fee Verification', details: 'Mandatory 350 USD SEVIS fee must be paid and verified online at fmjfee.com at least 3 business days prior to consular interview.' },
          { category: 'Section 214(b) INA Academic Intent', details: 'Student must demonstrate legitimate educational intent, adequate liquid financial solvency for full degree, and intent to depart the US upon program completion.' },
          { category: 'Student Health & Medical Insurance', details: 'Universities mandate comprehensive student health insurance (or waiver-eligible international coverage) prior to campus enrollment.' }
        ],
        how_to_apply: [
          '1️⃣ Receive signed Form I-20 from your SEVP-approved US university.',
          '2️⃣ Pay the mandatory 350 USD I-901 SEVIS fee online at fmjfee.com.',
          '3️⃣ Complete Form DS-160 online (ceac.state.gov) and save your 10-digit confirmation barcode.',
          '4️⃣ Create profile on usvisascheduling.com, pay 185 USD MRV visa fee, and schedule VAC Biometrics + Consular Interview appointments.',
          '5️⃣ Attend VAC appointment for digital biometrics and facial photograph.',
          '6️⃣ Attend Consular Interview at US Embassy/Consulate with original I-20, financial proofs, and academic records.',
          '7️⃣ Upon visa approval, collect passport with stamped F-1 visa foil from chosen VAC or premium courier.'
        ],
        costs: { visa_fee: '185 USD (approx. ₹15,540 MRV fee)', service_fee: '350 USD (I-901 SEVIS Fee)', total_fee: '535 USD Total Reference', notes: 'Paid online via official US visa scheduling portal (UPI / NEFT / Credit Card) and fmjfee.com.' },
        processing_and_timing: { apply_window: 'Apply up to 365 days before course start date on I-20.', decision_time: 'Decision: Verbal decision given immediately at the interview window.', max_extension: 'Can enter USA up to 30 days before program start date stated on Form I-20.' }
      };
    }

    if (isWork) {
      return {
        passport_country: from,
        destination_country: 'United States',
        purpose_of_visit: 'Employment / Work (H-1B / L-1)',
        visa_type: 'H-1B / L-1 Specialty Occupation & Intracompany Transferee Visa',
        source_url: 'https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html',
        official_source_name: 'U.S. Citizenship and Immigration Services (USCIS) & Consular Affairs',
        processing_time: 'Verbal Decision at Consular Window',
        validity: 'As per Form I-797 Notice of Action (Typically up to 3 years initial; max 6 years for H-1B, 5 years for L-1B, 7 years for L-1A; extendable beyond 6 yrs for H-1B with approved I-140)',
        stay_duration: 'As per approved Form I-797 petition validity dates (recorded on Form I-94)',
        entry_type: 'Multiple Entry',
        validity_and_stay: {
          visa_validity: 'As per Form I-797 (Initial up to 3 Years; statutory max: H-1B 6 yrs / L-1B 5 yrs / L-1A 7 yrs)',
          max_stay_per_entry: 'Duration authorized on approved Form I-797 petition / Form I-94',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          { title: 'Form I-797 (Notice of Action)', description: 'Original or copy of approved petition from USCIS with valid receipt number.', is_mandatory: true },
          { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended period of stay with blank pages.', is_mandatory: true },
          { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation barcode page of completed DS-160 online form with 10-character alphanumeric barcode.', is_mandatory: true },
          { title: 'Employment Offer Letter & Client Letter', description: 'Detailed job offer letter, certified LCA (Form ETA-9035), and end-client project documentation if working at third-party client site.', is_mandatory: true },
          { title: 'Educational & Professional Credentials', description: 'Degree evaluations, experience letters, and previous US paystubs/W-2s if applicable.', is_mandatory: true },
          { title: 'Form I-129S & Blanket Notice (L-1 Blanket Only)', description: 'For L-1 Blanket applicants: 3 sets of completed Form I-129S and Form I-797 Blanket approval notice.', is_mandatory: false }
        ],
        financial_proofs: [
          { type: 'Salary Slips & Tax Returns', minimum_balance_or_amount: 'Certified LCA prevailing wage minimum', time_frame: 'Last 3-6 months paystubs & Form 16 / ITR', notes: 'Proof of steady employment and authorized compensation.' }
        ],
        other_requirements: [
          { category: 'USCIS Petition Approval', details: 'Employer must secure approved Form I-129 petition before visa appointment scheduling.' },
          { category: 'Two-Stage Biometrics & Interview', details: 'Attend VAC for fingerprinting and digital photo, followed by consular interview at US Consulate.' },
          { category: 'L-1 Blanket Fraud Prevention Fee (500 USD)', details: 'Applicants applying under an approved L-1 Blanket Petition must pay an additional mandatory 500 USD Fraud Prevention and Detection Fee at the consular/VAC cashier window on appointment day.' },
          { category: 'Statutory Stay Limits & AC21 Extensions', details: 'H-1B: Maximum 6 years (extendable beyond 6 years under AC21 with approved I-140 or PERM pending > 365 days). L-1A (Managers/Execs): Maximum 7 years. L-1B (Specialized Knowledge): Maximum 5 years.' },
          { category: 'Client Letter & End-Client Verification', details: 'Third-party placement workers must present current, signed client letters specifying work location and job duties.' }
        ],
        how_to_apply: [
          '1️⃣ Employer petitions USCIS and receives approved Form I-797 Notice of Action (or prepares Form I-129S for L-1 Blanket).',
          '2️⃣ Complete Form DS-160 online (ceac.state.gov) and save confirmation barcode.',
          '3️⃣ Create account on usvisascheduling.com, pay 205 USD MRV visa fee, and book VAC + Consular interview dates.',
          '4️⃣ Attend VAC for digital biometrics and facial photograph.',
          '5️⃣ Attend Consular Interview at US Embassy/Consulate with I-797, LCA, and employment documents (pay 500 USD fee at cashier if applying under L-1 Blanket).',
          '6️⃣ Receive passport with stamped H-1B/L-1 visa foil via premium delivery or VAC collection.'
        ],
        costs: {
          visa_fee: '205 USD (approx. ₹17,220 MRV Application Fee)',
          service_fee: '500 USD (Mandatory Fraud Prevention Fee — ONLY for L-1 Blanket Applicants)',
          total_fee: '205 USD (Standard H-1B / Individual L-1) | 705 USD (L-1 Blanket)',
          notes: 'Standard MRV fee (205 USD) paid online via usvisascheduling.com. L-1 Blanket applicants pay an additional 500 USD Fraud Fee at the embassy cashier. Excludes USCIS employer filing fees.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 90 days before petition start date.',
          decision_time: 'Decision: Verbal decision given immediately at consular window.',
          max_extension: 'Can enter USA up to 10 days before petition validity start date.'
        }
      };
    }

    // Default US B-2 Visitor / Tourism
    return {
      passport_country: from,
      destination_country: 'United States',
      purpose_of_visit: 'Tourism / Vacation (B-2)',
      visa_type: 'B-2 / B1/B2 Nonimmigrant Visitor Visa',
      source_url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
      official_source_name: 'U.S. Department of State & U.S. Embassy Consular Affairs',
      processing_time: 'Verbal Decision at Consular Window',
      validity: 'Up to 10 Years (120 Months) Multiple Entry',
      stay_duration: 'Up to 6 Months (180 Days) per entry (determined by CBP on Form I-94)',
      entry_type: 'Multiple Entry',
      validity_and_stay: {
        visa_validity: 'Up to 10 Years (120 Months) Multiple Entry',
        max_stay_per_entry: 'Up to 6 Months (180 Days) per entry (determined by CBP on Form I-94)',
        entry_type: 'Multiple Entry'
      },
      documents_required: [
        { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond intended stay with blank visa pages.', is_mandatory: true },
        { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation sheet with clear 10-character alphanumeric barcode.', is_mandatory: true },
        { title: 'Appointment Confirmation Letter', description: 'Printed confirmation confirming both VAC Biometrics and Consular Interview appointments.', is_mandatory: true },
        { title: 'Travel Purpose & Itinerary', description: 'Detailed travel itinerary, flight bookings, hotel reservations, or invitation letter from US host.', is_mandatory: true },
        { title: 'Employment & Ties to Home Country', description: 'Employer leave letter / NOC, business registration, property documents proving intention to return.', is_mandatory: true }
      ],
      financial_proofs: [
        { type: 'Bank Statements & Income Tax Returns', minimum_balance_or_amount: 'Sufficient funds covering full estimated US trip expenses (4,000–7,000 USD / approx. ₹3.5L–₹6L)', time_frame: 'Last 6 months bank statements + last 3 years ITR / Form 16', notes: 'Original bank statements with bank stamp; demonstrating financial self-sufficiency.' }
      ],
      other_requirements: [
        { category: 'Two-Stage Appointment Requirement', details: 'You must attend two separate appointments: (1) VAC for photo & biometrics, and (2) US Embassy/Consulate for the consular interview.' },
        { category: 'Section 214(b) INA Adjudication', details: 'Applicants must demonstrate strong economic, social, and family ties to their home country to overcome non-immigrant intent.' },
        { category: 'DS-160 & MRV Receipt Validity', details: 'The 10-character DS-160 confirmation barcode must be locked before scheduling; MRV fee receipt allows 365 days to schedule.' },
        { category: 'Length of Stay Determined by CBP', details: 'The consular visa foil allows travel to a US port of entry. The U.S. Customs and Border Protection (CBP) officer determines authorized stay duration upon arrival (recorded on electronic Form I-94, typically up to 180 days).' },
        { category: 'Travel Health & Medical Insurance', details: 'Consular authorities strongly advise international travel medical insurance with minimum 50,000 USD emergency medical and evacuation coverage.' }
      ],
      how_to_apply: [
        '1️⃣ Complete the official Form DS-160 online (ceac.state.gov) and print your confirmation barcode.',
        '2️⃣ Create a profile on usvisascheduling.com and pay the 185 USD MRV visa fee (via UPI, NEFT, or card).',
        '3️⃣ Schedule your two appointments: (1) VAC Biometrics appointment, and (2) Consular Interview.',
        '4️⃣ Attend VAC appointment with passport and DS-160 confirmation for photo and fingerprint registration.',
        '5️⃣ Attend in-person Consular Interview at the US Embassy/Consulate with your financial and tie-back proofs.',
        '6️⃣ Upon visa approval, collect your 10-year multiple-entry visa stamped passport from selected VAC or premium courier.'
      ],
      costs: {
        visa_fee: '185 USD (approx. ₹15,540 MRV fee)',
        service_fee: '0 USD (Direct Consular Fee)',
        total_fee: '185 USD Total Reference',
        notes: 'Payable online directly via official US Visa Scheduling portal (UPI / NEFT / Debit / Credit Card); valid for 10 years multiple entry.'
      },
      processing_and_timing: {
        apply_window: 'Apply 2 to 3 months before intended travel date.',
        decision_time: 'Decision: Verbal decision given immediately at the interview window.',
        max_extension: '10-Year Multiple Entry Visa (up to 6 months stay per entry authorized at CBP port of entry on electronic Form I-94).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. CANADA OFFICIAL IMMIGRATION REQUIREMENTS (IRCC)
  // ═══════════════════════════════════════════════════════════════
  if (isCanada) {
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    const isStudent = purposeLower.includes('study') || purposeLower.includes('student');

    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'Canada',
        purpose_of_visit: 'Permanent Residency (PR) / Immigration',
        visa_type: 'Canada Permanent Residence (Express Entry / PNP / FSW / CEC)',
        source_url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html',
        official_source_name: 'Immigration, Refugees and Citizenship Canada (IRCC)',
        processing_time: '6 Months (Express Entry IRCC Standard SLA)',
        validity: 'Permanent Resident Status (5-Year Renewable PR Card; COPR for Initial Entry)',
        stay_duration: 'Permanent Resident Status with Path to Canadian Citizenship after 3 Years (1,095 Days)',
        entry_type: 'Permanent Resident',
        validity_and_stay: {
          visa_validity: 'Permanent Resident Status (5-Year Renewable PR Card)',
          max_stay_per_entry: 'Permanent Resident Status in Canada',
          entry_type: 'Permanent Resident'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages (valid for intended travel duration).', is_mandatory: true },
          { title: 'Educational Credential Assessment (ECA)', description: 'ECA evaluation report from WES, CES, or IQAS establishing Canadian equivalency.', is_mandatory: true },
          { title: 'Official Language Test Results', description: 'IELTS General Training (CLB 7+ minimum; CLB 9+ recommended) or PTE Core scorecard.', is_mandatory: true },
          { title: 'Police Clearance Certificates (PCC)', description: 'PCCs from Regional Passport Office (RPO) and all countries resided in for 6+ consecutive months since age 18.', is_mandatory: true },
          { title: 'Proof of Settlement Funds', description: 'Official bank letter with 6-month average balance meeting IRCC minimum threshold (14,690 CAD for single applicant).', is_mandatory: true },
          { title: 'Immigration Medical Exam (IME)', description: 'Upfront medical examination conducted by an IRCC-authorized panel physician (eMedical sheet).', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Proof of Settlement Funds (POF)', minimum_balance_or_amount: '14,690 CAD for 1 applicant / 18,288 CAD for family of 2', time_frame: 'Last 6 months bank balance certificates & statements', notes: 'Must be unencumbered liquid funds without loans or sudden borrowed deposits.' }
        ],
        other_requirements: [
          { category: 'Express Entry Comprehensive Ranking (CRS)', details: 'Applicant must meet CRS cutoff in Federal Skilled Worker (FSW), Canadian Experience Class (CEC), or PNP category draws.' },
          { category: 'Biometrics Requirement (BIL)', details: 'Mandatory biometrics (fingerprints & photo) given at VFS Global VAC once Biometrics Instruction Letter is issued.' },
          { category: 'Right of Permanent Residence Fee (RPRF)', details: 'Mandatory 575 CAD RPRF fee must be paid before Confirmation of Permanent Residence (COPR) issuance (refundable if refused).' }
        ],
        how_to_apply: [
          '1️⃣ Complete Educational Credential Assessment (WES) and language test (IELTS General / PTE Core).',
          '2️⃣ Create and submit Express Entry profile on IRCC portal.',
          '3️⃣ Receive Invitation to Apply (ITA) in Express Entry or Provincial Nominee draw.',
          '4️⃣ Submit electronic Application for Permanent Residence (e-APR) within 60 days with complete medical, PCC, and financial dossier.',
          '5️⃣ Pay 950 CAD processing fee + 575 CAD RPRF fee + 85 CAD biometrics fee.',
          '6️⃣ Receive Confirmation of Permanent Residence (COPR) and submit passport to VFS for PR visa foil stamping.'
        ],
        costs: {
          visa_fee: '950 CAD (Principal Applicant Processing Fee)',
          service_fee: '575 CAD (Right of Permanent Residence Fee - RPRF) + 85 CAD (Biometrics Fee)',
          total_fee: '1,610 CAD Total IRCC Fee for Single Applicant',
          notes: 'RPRF (575 CAD) is refundable if application is refused. Spouse fee: 950 CAD + 575 CAD RPRF. Dependent child: 230 CAD.'
        },
        processing_and_timing: {
          apply_window: 'Submit complete e-APR within 60 calendar days of receiving ITA.',
          decision_time: 'Standard: 6 months from e-APR submission date.',
          max_extension: 'Permanent resident card valid for 5 years and renewable indefinitely.'
        }
      };
    }

    return {
      passport_country: from,
      destination_country: 'Canada',
      purpose_of_visit: isStudent ? 'Study in Canada' : 'Tourism / Family Visit',
      visa_type: isStudent ? 'Canada Study Permit (Student Visa)' : 'Temporary Resident Visa (Visitor Visa V-1)',
      source_url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
      official_source_name: 'Immigration, Refugees and Citizenship Canada (IRCC)',
      documents_required: [
        { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages (valid for intended stay duration).', is_mandatory: true },
        { title: 'Digital Photograph', description: 'Meeting IRCC specifications (35mm x 45mm, white background, taken within last 6 months).', is_mandatory: true },
        { title: 'Travel Purpose & Itinerary', description: 'Cover letter / Purpose of Travel, round-trip flight booking, hotel reservations, or letter of invitation.', is_mandatory: true },
        { title: 'Ties to Home Country', description: 'Employment letter, leave approval NOC, property documents, and proof of family ties in home country.', is_mandatory: true }
      ],
      financial_proofs: [
        { type: 'Bank Statements & Tax Returns', minimum_balance_or_amount: '10,000 CAD+ for single visitor / GIC 20,635 CAD for students', time_frame: 'Last 6 months stamped bank statements + 3 years ITR', notes: 'Demonstrates sufficient liquid funds without sudden unexplained deposits.' }
      ],
      other_requirements: [
        { category: 'Biometrics Requirement (BIL)', details: 'Mandatory biometrics (fingerprints & photo) given at VFS Global VAC once Biometrics Instruction Letter is issued.' },
        { category: 'Passport Submission (PPR)', details: 'Upon online approval, submit original passport to VFS for counterfoil visa stamping.' }
      ],
      how_to_apply: [
        '1️⃣ Create an official IRCC Portal account on canada.ca and complete the online application.',
        '2️⃣ Upload scanned documents: passport, bank statements, itinerary, employment letter, and SOP.',
        '3️⃣ Pay the 100 CAD visa application fee + 85 CAD biometrics fee online using credit/debit card.',
        '4️⃣ Receive your Biometrics Instruction Letter (BIL) within 24-48 hours.',
        '5️⃣ Book and attend an appointment at your nearest VFS Global Canada VAC to submit biometrics.',
        '6️⃣ Track your application on IRCC portal; upon approval, submit passport to VFS for visa counterfoil stamping.'
      ],
      costs: {
        visa_fee: '100 CAD (approx. ₹6,200)',
        service_fee: '85 CAD (Biometrics Fee)',
        total_fee: '185 CAD Total Reference',
        notes: 'Official IRCC government fees paid online; visa typically granted up to passport expiry.'
      },
      processing_and_timing: {
        apply_window: 'Apply 30 to 90 days before planned departure date.',
        decision_time: 'Decision: Typically 15 to 30 business days after biometrics submission.',
        max_extension: 'Multiple-entry visa valid up to passport validity (max 10 years).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. AUSTRALIA OFFICIAL IMMIGRATION REQUIREMENTS (DHA)
  // ═══════════════════════════════════════════════════════════════
  if (isAustralia) {
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    
    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'Australia',
        purpose_of_visit: 'Permanent Residency (PR) / Skilled Migration',
        visa_type: 'Skilled Independent / Nominated PR Visa (Subclass 189 / 190 / 491)',
        source_url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189',
        official_source_name: 'Australian Department of Home Affairs (SkillSelect)',
        processing_time: '6 to 9 Months from Invitation to Visa Grant',
        validity: 'Permanent Residency (5-Year Travel Facility; Indefinite Stay in Australia)',
        stay_duration: 'Permanent Resident Status with Path to Australian Citizenship after 4 Years',
        entry_type: 'Permanent Resident',
        validity_and_stay: {
          visa_validity: 'Permanent Residency (5-Year Travel Facility; Indefinite Stay)',
          max_stay_per_entry: 'Permanent Resident Status in Australia',
          entry_type: 'Permanent Resident'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Color scan of bio-data and stamped pages of current passport.', is_mandatory: true },
          { title: 'Positive Skills Assessment Outcome', description: 'Official assessment from assessing authority (ACS, Engineers Australia, VETASSESS).', is_mandatory: true },
          { title: 'English Language Competency Scorecard', description: 'PTE Academic (65+ for Proficient English / 79+ for Superior) or IELTS scorecard.', is_mandatory: true },
          { title: 'Employment Reference & Tax Documents', description: 'Detailed work reference letters, payslips, bank statements, and Form 16 / ITRs proving claimed points.', is_mandatory: true },
          { title: 'National Police Clearance Certificates', description: 'Indian PCC from Regional Passport Office (RPO) and clearances from all countries lived in 12+ months.', is_mandatory: true },
          { title: 'HAP ID Medical Clearance Report', description: 'Health assessment conducted by Bupa Medical Visa Services / designated panel clinics.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Proof of Funds & Employment Income', minimum_balance_or_amount: 'Sufficient funds for settlement & relocation (approx. 25,000–35,000 AUD)', time_frame: 'Bank statements & salary records', notes: 'Demonstrates financial solvency during initial settlement.' }
        ],
        other_requirements: [
          { category: 'SkillSelect Points Threshold (65+ Points)', details: 'Minimum 65 points required on DHA points test based on age, English proficiency, qualifications, and work experience.' },
          { category: '100% Digital e-Visa (VEVO)', details: 'Permanent Residency is granted electronically via ImmiAccount; verified online via VEVO.' }
        ],
        how_to_apply: [
          '1️⃣ Complete Skills Assessment with designated Australian assessing authority (ACS, EA, VETASSESS).',
          '2️⃣ Appear for English language exam (PTE / IELTS).',
          '3️⃣ Submit Expression of Interest (EOI) in SkillSelect.',
          '4️⃣ Receive Invitation to Apply (ITA) in federal or state nomination round.',
          '5️⃣ Lodge online visa application on ImmiAccount within 60 days of invitation.',
          '6️⃣ Complete biometric collection at VFS Global ABCC and health examinations.',
          '7️⃣ Receive official Australian Permanent Residency (Subclass 189/190) Visa Grant Notification.'
        ],
        costs: {
          visa_fee: '4,765 AUD (Base Application Charge for Primary Applicant)',
          service_fee: '2,385 AUD (Additional Applicant 18+ Years) / 1,195 AUD (Under 18)',
          total_fee: '4,765 AUD Base Charge',
          notes: 'Paid online via ImmiAccount. Excludes Skills Assessment and English test fees.'
        },
        processing_and_timing: {
          apply_window: 'Lodge application within 60 days of receiving SkillSelect invitation.',
          decision_time: 'Standard processing: 6 to 9 months from lodgement.',
          max_extension: 'Permanent resident visa includes 5-year travel facility, renewable via Resident Return Visa (Subclass 155).'
        }
      };
    }

    return {
      passport_country: from,
      destination_country: 'Australia',
      purpose_of_visit: 'Tourism / Visitor',
      visa_type: 'Visitor Visa (Subclass 600 - Tourist Stream)',
      source_url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600',
      official_source_name: 'Australian Department of Home Affairs (ImmiAccount)',
      documents_required: [
        { title: 'Current Passport', description: 'High-resolution color scan of all pages of your current valid passport.', is_mandatory: true },
        { title: 'National Identity Proof', description: 'Color copy of Aadhaar Card / National ID and PAN card.', is_mandatory: true },
        { title: 'Genuine Temporary Entrant Proof', description: 'Cover letter detailing visit itinerary, travel activities, and strong ties to return to home country.', is_mandatory: true },
        { title: 'Employment Evidence', description: 'Employment contract, recent 3 months payslips, and employer approved leave letter.', is_mandatory: true }
      ],
      financial_proofs: [
        { type: 'Bank Statements & Income Evidence', minimum_balance_or_amount: '5,000–8,000 AUD+ in liquid savings', time_frame: 'Last 6 months stamped bank statements + 3 years ITR', notes: 'Demonstrates financial capacity to support stay in Australia.' }
      ],
      other_requirements: [
        { category: '100% Digital e-Visa', details: 'Australia issues electronic visa grants linked directly to your passport number; no physical passport label is required.' },
        { category: 'Biometrics Collection', details: 'Applicants in India must provide biometrics at Australian Biometric Collection Centre (VFS Global) upon request.' }
      ],
      how_to_apply: [
        '1️⃣ Create an official ImmiAccount on online.immi.gov.au.',
        '2️⃣ Complete the online Subclass 600 Visitor Visa application form.',
        '3️⃣ Upload high-quality color scans of passport, financial proofs, travel itinerary, and employment documents.',
        '4️⃣ Pay the 195 AUD official visa fee securely online via ImmiAccount.',
        '5️⃣ Receive the Biometrics Requirement Letter and complete fingerprint/photo capture at VFS Global ABCC.',
        '6️⃣ Receive your official Australian Electronic Visa Grant Notification via email.'
      ],
      costs: {
        visa_fee: '195 AUD (approx. ₹10,800)',
        service_fee: '₹1,650 (VFS Biometrics if applicable)',
        total_fee: '195 AUD+ Total Reference',
        notes: 'Payable online directly via Australian ImmiAccount portal.'
      },
      processing_and_timing: {
        apply_window: 'Apply 4 to 8 weeks before planned travel.',
        decision_time: 'Decision: Standard 15 to 25 calendar days.',
        max_extension: 'Grants are usually 3, 6, or 12 months with single or multiple entry.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. NEW ZEALAND OFFICIAL IMMIGRATION REQUIREMENTS (INZ)
  // ═══════════════════════════════════════════════════════════════
  if (isNewZealand) {
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    
    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'New Zealand',
        purpose_of_visit: 'Permanent Residency (PR) / Skilled Migration',
        visa_type: 'Skilled Migrant Category (SMC) Resident Visa (6-Point System)',
        source_url: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/skilled-migrant-category-resident-visa',
        official_source_name: 'Immigration New Zealand (INZ)',
        processing_time: '6 to 9 Months Standard SLA',
        validity: 'Permanent Resident Status (2-Year Travel Conditions; Indefinite Stay in NZ)',
        stay_duration: 'Indefinite Stay in New Zealand with Path to Permanent Resident Visa (PRV) after 2 Years',
        entry_type: 'Permanent Resident',
        validity_and_stay: {
          visa_validity: 'Resident Visa (Initial 2-Year Travel Facility; Indefinite Stay)',
          max_stay_per_entry: 'Permanent Resident Status in New Zealand',
          entry_type: 'Permanent Resident'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Color scan of bio-data and all stamped pages of current passport (valid 12+ months).', is_mandatory: true },
          { title: 'NZQA International Qualifications Assessment (IQA)', description: 'Official International Qualifications Assessment from NZQA confirming qualification equivalency.', is_mandatory: true },
          { title: 'English Language Competency Scorecard', description: 'IELTS General Training (minimum 6.5 overall) or PTE Academic (minimum 58 overall) scorecard.', is_mandatory: true },
          { title: 'Skilled Employment Offer / Registration', description: 'Offer of skilled employment from an accredited NZ employer paying at or above the median wage.', is_mandatory: true },
          { title: 'National Police Clearance Certificates (PCC)', description: 'Police certificates from Regional Passport Office (RPO) and all countries resided in for 12+ months.', is_mandatory: true },
          { title: 'INZ 1007 General Medical Certificate & Chest X-ray', description: 'eMedical panel physician medical and chest X-ray certificate.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Proof of Settlement Solvency', minimum_balance_or_amount: 'Minimum 20,000–30,000 NZD in unencumbered liquid funds', time_frame: 'Last 6 months bank statements', notes: 'Demonstrates financial capacity to settle family in New Zealand without state support.' }
        ],
        other_requirements: [
          { category: 'SMC 6-Point Threshold', details: 'Must claim 6 points from either: NZ occupational registration, recognized qualification (Bachelor/Master/PhD), or high income (1.5x - 3x median wage), plus 1-3 points for skilled work in NZ.' },
          { category: 'Accredited Employer Requirement', details: 'Job offer must be for full-time work (minimum 30 hrs/week) with an INZ Accredited Employer.' }
        ],
        how_to_apply: [
          '1️⃣ Phase 1 (Pre-Requisites): Complete NZQA International Qualifications Assessment (IQA) and pass IELTS General (6.5+) / PTE (58+).',
          '2️⃣ Phase 2 (Expression of Interest): Submit online SMC Expression of Interest (EOI) claiming 6 points on Immigration New Zealand portal.',
          '3️⃣ Phase 3 (Invitation to Apply): Receive formal Invitation to Apply (ITA) from INZ upon verification of point claims.',
          '4️⃣ Phase 4 (Full PR Lodgement): Submit complete resident visa application within 4 months with eMedical (INZ 1007), apostilled PCC, and employer job confirmation.',
          '5️⃣ Phase 5 (Resident Visa Grant): Receive electronic Skilled Migrant Category Resident Visa Grant Notice.'
        ],
        costs: {
          visa_fee: '4,890 NZD (Immigration New Zealand SMC Application & Immigration Levy)',
          service_fee: '450 NZD (NZQA IQA Evaluation)',
          total_fee: '4,890 NZD Official Government Fee',
          notes: 'Paid online via Immigration Online portal. Excludes medical exam and English test charges.'
        },
        processing_and_timing: {
          apply_window: 'Submit complete application within 4 months of receiving ITA.',
          decision_time: 'Standard processing: 6 to 9 months from lodgement.',
          max_extension: 'Resident Visa grants indefinite stay in NZ; apply for Permanent Resident Visa (PRV) after 24 months.'
        }
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. GERMANY OFFICIAL IMMIGRATION REQUIREMENTS (BAMF / Ausländerbehörde)
  // ═══════════════════════════════════════════════════════════════
  if (isGermany) {
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    
    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'Germany',
        purpose_of_visit: 'Permanent Residency (PR) / Settlement Permit (Niederlassungserlaubnis)',
        visa_type: 'EU Blue Card (§18g) / Skilled Worker to Permanent Settlement Permit (Niederlassungserlaubnis §18c AufenthG)',
        source_url: 'https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/Niederlassungserlaubnis/niederlassungserlaubnis-node.html',
        official_source_name: 'Federal Office for Migration and Refugees (BAMF) & Ausländerbehörde',
        processing_time: 'Fast-Track PR in 21 Months (with B1 German) or 27 Months (with A1 German)',
        validity: 'Permanent Settlement Permit (Niederlassungserlaubnis) — Indefinite Validity',
        stay_duration: 'Indefinite Permanent Residency in Germany with Unrestricted Right to Work & EU Mobility',
        entry_type: 'Permanent Resident',
        validity_and_stay: {
          visa_validity: 'Niederlassungserlaubnis (Permanent Settlement Permit — Unlimited Validity)',
          max_stay_per_entry: 'Permanent Resident Status in Germany',
          entry_type: 'Permanent Resident'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Current passport with at least 12 months validity and blank visa pages.', is_mandatory: true },
          { title: 'Foreign Degree Recognition (ZAB Statement / Anabin)', description: 'ZAB Statement of Comparability confirming German university degree equivalency.', is_mandatory: true },
          { title: 'German Language Certificate (CEFR A1 / B1)', description: 'Goethe-Institut / telc / TestDaF certificate proving required German language level.', is_mandatory: true },
          { title: 'Statutory Pension Proof (Rentenversicherung)', description: 'Official contribution statement (Versicherungsverlauf) showing 21 to 27 months of statutory pension payments.', is_mandatory: true },
          { title: 'Employment Contract & Salary Slips', description: 'Current indefinite employment contract, job description form (Erklärung zum Beschäftigungsverhältnis), and last 6 months payslips.', is_mandatory: true },
          { title: 'Proof of Adequate Living Space (Mietvertrag)', description: 'Lease agreement (Mietvertrag) and landlord confirmation (Wohnungsgeberbestätigung).', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Statutory Salary Benchmark & Financial Solvency', minimum_balance_or_amount: '45,300 EUR/year for shortage occupations (IT/Engineering) or 50,700 EUR/year standard', time_frame: 'Current annual salary & last 6 months salary accounts', notes: 'Must be completely self-sufficient without claiming German public social assistance (SGB II).' }
        ],
        other_requirements: [
          { category: 'Integration & Legal System Knowledge', details: 'Proof of basic knowledge of the legal and social order in Germany ("Life in Germany" / Einbürgerungstest test certificate).' },
          { category: 'Mandatory Health Insurance', details: 'Statutory (GKV - TK/AOK) or comprehensive private health insurance coverage.' }
        ],
        how_to_apply: [
          '1️⃣ Phase 1 (Pre-Requisites): Obtain ZAB foreign degree comparability and secure employment offer meeting EU Blue Card salary thresholds.',
          '2️⃣ Phase 2 (Consular Entry Visa): Apply for National Type D employment visa at German Embassy/VFS in India.',
          '3️⃣ Phase 3 (Arrival & Blue Card): Register residence (Anmeldung) at Bürgeramt and receive electronic EU Blue Card (Aufenthaltstitel) at Ausländerbehörde.',
          '4️⃣ Phase 4 (Pension Contributions): Complete 21 months of employment with B1 German (or 27 months with A1 German) and pay compulsory pension contributions.',
          '5️⃣ Phase 5 (Permanent Settlement): Apply for Niederlassungserlaubnis at the local immigration office and receive indefinite Permanent Settlement Permit.'
        ],
        costs: {
          visa_fee: '75 EUR (National Visa Type D) + 113 EUR (Niederlassungserlaubnis Settlement Application Fee)',
          service_fee: '200 EUR (ZAB Degree Statement of Comparability)',
          total_fee: '188 EUR Government Immigration Fee',
          notes: 'Payable in EUR/INR at German Embassy and Ausländerbehörde upon application.'
        },
        processing_and_timing: {
          apply_window: 'Apply for Settlement Permit after 21 or 27 months of Blue Card employment.',
          decision_time: 'Decision: 6 to 12 weeks from application submission at Ausländerbehörde.',
          max_extension: 'Permanent Settlement Permit is indefinite; card renewal every 10 years matching passport.'
        }
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. UNITED ARAB EMIRATES (UAE / DUBAI) OFFICIAL REQUIREMENTS
  // ═══════════════════════════════════════════════════════════════
  if (isUAE) {
    const isPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
    
    if (isPR) {
      return {
        passport_country: from,
        destination_country: 'United Arab Emirates',
        purpose_of_visit: 'Permanent Residency (PR) / Golden Visa',
        visa_type: 'UAE 10-Year Golden Visa (Long-Term Permanent Residency)',
        source_url: 'https://smartservices.icp.gov.ae',
        official_source_name: 'Federal Authority for Identity, Citizenship, Customs & Port Security (ICP) & GDRFA Dubai',
        processing_time: '7 to 14 Working Days Standard SLA',
        validity: '10-Year Renewable Golden Visa (No Sponsor Required; 100% Ownership)',
        stay_duration: 'Indefinite Long-Term Residency (Stay outside UAE for > 6 months allowed without losing visa)',
        entry_type: 'Multiple Entry Permanent Resident',
        validity_and_stay: {
          visa_validity: '10-Year Renewable Golden Residency',
          max_stay_per_entry: 'Continuous Residency in UAE (Exempt from 6-month stay rule)',
          entry_type: 'Multiple Entry'
        },
        documents_required: [
          { title: 'Valid Passport', description: 'Original passport valid for at least 6 months with clear bio-data pages.', is_mandatory: true },
          { title: 'MOE Degree Attestation / Equivalency', description: 'Apostilled and UAE Ministry of Education (MOE) attested Bachelor/Master/PhD degree certificate.', is_mandatory: true },
          { title: 'Employment Contract / Professional Letter', description: 'Valid UAE employment contract with minimum monthly salary of 30,000 AED (approx. 8,160 USD) or real estate title deed.', is_mandatory: true },
          { title: '6-Month Bank Statements', description: 'Stamped UAE bank statements showing regular salary credit of 30,000+ AED/month.', is_mandatory: true },
          { title: 'Comprehensive UAE Health Insurance', description: 'Valid medical insurance policy covering Golden Visa holder and family dependents.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Monthly Income or Real Estate Investment', minimum_balance_or_amount: '30,000 AED monthly salary or 2,000,000 AED real estate property investment', time_frame: 'Last 6 months salary records or Title Deed from Dubai Land Department (DLD)', notes: 'Property can be mortgaged from approved UAE local banks.' }
        ],
        other_requirements: [
          { category: 'Exemption from 6-Month Rule', details: 'Golden Visa holders can stay outside the UAE for any duration without their residence visa becoming invalid.' },
          { category: 'Unlimited Family & Domestic Sponsorship', details: 'Sponsor spouse, children of any age, and unlimited domestic helpers with complete security.' }
        ],
        how_to_apply: [
          '1️⃣ Phase 1 (Eligibility & Attestation): Attest university degree with UAE MOE or secure DLD title deed.',
          '2️⃣ Phase 2 (Nomination / Initial Approval): Apply for Golden Visa nomination via ICP portal or GDRFA Dubai.',
          '3️⃣ Phase 3 (6-Month Entry Visa): Obtain 6-month multiple-entry visa to finalize procedures in the UAE.',
          '4️⃣ Phase 4 (Medical & Biometrics): Complete VIP medical fitness screening and Emirates ID biometric enrollment.',
          '5️⃣ Phase 5 (10-Year Golden Visa Issuance): Receive official 10-Year Golden Visa digital residency and physical Emirates ID.'
        ],
        costs: {
          visa_fee: '2,800 AED – 3,800 AED (approx. 760 USD – 1,030 USD)',
          service_fee: '1,050 AED (Emirates ID 10-Year Issuance Fee)',
          total_fee: '3,850 AED Total Official Government Fee',
          notes: 'Paid online directly through official ICP / GDRFA Dubai portals.'
        },
        processing_and_timing: {
          apply_window: 'Apply anytime upon meeting salary (30k AED) or real estate investment (2M AED) benchmarks.',
          decision_time: 'Decision: 48 to 72 hours initial approval; 7 to 14 days full issuance.',
          max_extension: '10-Year Golden Visa renewed automatically every decade as long as criteria are maintained.'
        }
      };
    }

    const fromLower = from.toLowerCase();
    const isIndiaOrigin = fromLower.includes('india');
    const isUSOrigin = fromLower.includes('united states') || fromLower.includes('usa') || fromLower === 'us';

    const uaeCosts = isIndiaOrigin ? {
      visa_fee: '₹6,400 (30 Days) / ₹11,800 (60 Days)',
      service_fee: '₹0 (Included)',
      total_fee: '₹6,400 – ₹11,800 Total Reference',
      notes: 'Includes mandatory health and emergency medical insurance coverage under ICP/GDRFA.'
    } : {
      visa_fee: '90 USD (30 Days) / 175 USD (60 Days) [approx. 330 – 640 AED]',
      service_fee: '0 USD (Included)',
      total_fee: '90 USD – 175 USD Total Reference (approx. 330 – 640 AED)',
      notes: isUSOrigin
        ? 'US regular passport holders receive a 30-day entry permit on arrival at UAE airports free of charge. Pre-arranged 30/60 days tourist e-Visas (approx. 90–175 USD / 330–640 AED) are applicable for extended stays, specific permit tiers, or advance entry clearance.'
        : 'Includes mandatory health and emergency medical insurance coverage under ICP/GDRFA.'
    };

    return {
      passport_country: from,
      destination_country: 'United Arab Emirates',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'UAE Tourist e-Visa (30 / 60 Days Single or Multiple Entry)',
      source_url: 'https://smartservices.icp.gov.ae',
      official_source_name: 'Federal Authority for Identity, Citizenship, Customs & Port Security (ICP) / GDRFA Dubai',
      processing_time: 'Decision: Fast 24 to 72 working hours (Express processing available in 8 hours)',
      validity: '60 Days (Entry window from electronic issuance)',
      stay_duration: 'Up to 30 Days or 60 Days (depending on selected e-Visa tier)',
      entry_type: 'Single / Multiple Entry (based on permit tier)',
      validity_and_stay: {
        visa_validity: '60 Days from electronic issuance',
        max_stay_per_entry: 'Up to 30 Days or 60 Days (depending on selected e-Visa tier)',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        { title: 'Passport Bio-Page & Last Page Scan', description: 'Clear color scan of passport valid for minimum 6 months from entry date.', is_mandatory: true },
        { title: 'Passport-Size Digital Photograph', description: 'Recent color photograph with white background, neutral expression, and 80% face coverage.', is_mandatory: true },
        { title: 'Confirmed Return Air Ticket', description: 'Confirmed round-trip flight booking to Dubai/Abu Dhabi/Sharjah.', is_mandatory: true },
        { title: 'Hotel Booking / Host Address', description: 'Confirmed hotel stay voucher or UAE resident host details & Emirates ID.', is_mandatory: false }
      ],
      financial_proofs: [
        { type: 'Basic Financial Sufficiency', minimum_balance_or_amount: 'AED 3,000 or equivalent (approx. $820 USD) in cash / international credit cards upon airport arrival', time_frame: 'Current', notes: 'Standard immigration spot-check requirement at UAE airports.' }
      ],
      other_requirements: [
        { category: '100% Paperless E-Visa', details: 'Issued as an official electronic PDF entry permit. No physical consulate visit or biometrics required.' },
        { category: 'Entry Window', details: 'Valid for entry into UAE within 60 days from date of electronic issuance.' },
        ...(isUSOrigin ? [{ category: 'Visa on Arrival Option for US Citizens', details: 'US passport holders are eligible for a 30-day visa on arrival free of charge at all UAE international airports, extendable for an additional 30 days.' }] : [])
      ],
      how_to_apply: [
        'Submit color scan of your valid passport (front and back page) and white-background photograph.',
        'Select your desired visa duration (30 Days or 60 Days Tourist e-Visa).',
        'Pay official government ICP / GDRFA entry permit and processing fees online.',
        'Application undergoes rapid automated security clearance with UAE immigration authorities.',
        'Receive your official approved UAE e-Visa PDF via email and download it for airline check-in.'
      ],
      costs: uaeCosts,
      processing_and_timing: {
        apply_window: 'Apply 7 to 30 days before planned departure date.',
        decision_time: 'Decision: Fast 24 to 72 working hours (Express processing available in 8 hours).',
        max_extension: 'Extendable inside the UAE for an additional 30 days without exit.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 8B. ETHIOPIA OFFICIAL 100% ONLINE EVISA REQUIREMENTS
  // ═══════════════════════════════════════════════════════════════
  if (isEthiopia) {
    return {
      passport_country: from,
      destination_country: 'Ethiopia',
      purpose_of_visit: rawPurpose || 'Tourism / Vacation',
      visa_type: 'Ethiopia Tourist e-Visa (30 / 90 Days Single or Multiple Entry)',
      source_url: 'https://www.evisa.gov.et',
      official_source_name: 'Main Department for Immigration and Nationality Affairs / Immigration and Citizenship Service (ICS) Ethiopia',
      processing_time: '24 to 72 Hours (1–3 Business Days)',
      validity: '30 Days or 90 Days from Intended Arrival Date',
      stay_duration: 'Up to 30 Days (Single Entry) or up to 90 Days (Single/Multiple Entry)',
      entry_type: 'Single / Multiple Entry (Strictly valid via Addis Ababa Bole International Airport - ADD only)',
      validity_and_stay: {
        visa_validity: '30 or 90 Days from arrival date',
        max_stay_per_entry: '30 Days (Single Entry) / 90 Days (Single or Multiple Entry)',
        entry_type: 'Single / Multiple Entry'
      },
      documents_required: [
        {
          title: 'Valid Passport (Digital Bio-Page Scan)',
          description: 'Clear color scan of passport bio-data page valid for at least 6 months from the intended date of arrival in Ethiopia.',
          is_mandatory: true
        },
        {
          title: 'Recent Digital Passport-Size Photograph',
          description: 'Clear color photograph with white background taken within the last 6 months (JPEG or PNG format).',
          is_mandatory: true
        },
        {
          title: 'Confirmed Return Flight Ticket',
          description: 'Confirmed onward or return airline booking departing from Addis Ababa Bole International Airport (ADD).',
          is_mandatory: true
        },
        {
          title: 'Hotel Booking or Host Address',
          description: 'Confirmed hotel reservation voucher or full residential address and telephone number of your host in Ethiopia.',
          is_mandatory: false
        },
        {
          title: 'Yellow Fever Vaccination Certificate',
          description: 'International Certificate of Vaccination (ICVP) for Yellow Fever (mandatory for entry health clearance at Addis Ababa airport).',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Basic Financial Sufficiency',
          minimum_balance_or_amount: '50 USD per day of stay in international cards or cash',
          time_frame: 'Current',
          notes: 'Standard airport border verification. No 3-year ITR, stamped bank statements, or pay slips required for online tourist eVisa.'
        }
      ],
      other_requirements: [
        {
          category: '100% Online Paperless eVisa',
          details: 'Application and payment are completed entirely online at evisa.gov.et. No physical embassy visit, paper file, or biometric appointment required.'
        },
        {
          category: 'Port of Entry Mandate',
          details: 'Tourist eVisa holders are strictly authorized to enter Ethiopia through Addis Ababa Bole International Airport (ADD). Land border crossings do not process tourist eVisas on arrival.'
        }
      ],
      how_to_apply: [
        '1️⃣ Visit the official Ethiopian Government portal: https://www.evisa.gov.et.',
        '2️⃣ Select "Tourist Visa" and choose your desired validity (30-Day Single Entry or 90-Day Single/Multiple Entry).',
        '3️⃣ Fill in personal, passport, and travel details and upload digital scans of your passport bio-page and photo.',
        '4️⃣ Pay the official visa fee (82 USD for 30-Day or 102 USD for 90-Day) securely online using credit/debit card.',
        '5️⃣ Receive official electronic visa approval PDF via email within 24 to 72 hours.',
        '6️⃣ Print the eVisa confirmation letter and present it alongside your passport and Yellow Fever Certificate at Addis Ababa Bole Airport immigration.'
      ],
      costs: {
        visa_fee: '82 USD (30-Day Single Entry) / 102 USD (90-Day Single Entry) / 152 USD (90-Day Multiple Entry)',
        service_fee: '0 USD (No VAC or biometric service charge)',
        total_fee: '82 USD (~₹6,800 INR) for 30-Day Tourist eVisa',
        notes: 'Payable online in USD via Mastercard, Visa, or American Express.'
      },
      processing_and_timing: {
        apply_window: 'Apply 3 to 14 days before your intended travel date.',
        decision_time: 'Decision: 24 to 72 hours (1–3 business days).',
        max_extension: 'Can be extended in Ethiopia before expiry at the Immigration and Citizenship Service (ICS) headquarters in Addis Ababa.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 9. GENERIC DESTINATION PR & IMMIGRATION FALLBACK
  // ═══════════════════════════════════════════════════════════════
  const isGenericPR = purposeLower.includes('pr') || purposeLower.includes('permanent') || purposeLower.includes('immigrat') || purposeLower.includes('green') || purposeLower.includes('settle');
  
  if (isGenericPR) {
    return {
      passport_country: from,
      destination_country: to,
      purpose_of_visit: 'Permanent Residency (PR) / Economic Migration',
      visa_type: `${to} Permanent Resident & Settlement Permit (Long-Term Economic Stream)`,
      source_url: `https://www.vfsglobal.com`,
      official_source_name: `Department of Immigration & Consular Affairs of ${to}`,
      processing_time: '6 to 12 Months Standard Migration SLA',
      validity: '5-Year Permanent Resident Card / Indefinite Legal Settlement',
      stay_duration: 'Indefinite Permanent Residency with Path to Citizenship',
      entry_type: 'Permanent Resident',
      validity_and_stay: {
        visa_validity: '5-Year Renewable Permanent Resident Card / Indefinite Stay',
        max_stay_per_entry: `Permanent Legal Resident Status in ${to}`,
        entry_type: 'Permanent Resident'
      },
      documents_required: [
        { title: 'Valid Passport', description: 'Must be valid for at least 12+ months beyond intended relocation date with blank visa pages.', is_mandatory: true },
        { title: 'Educational & Foreign Credential Assessment (ECA)', description: 'Official qualification equivalency report from an authorized evaluating body.', is_mandatory: true },
        { title: 'Standardized Language Proficiency Scorecard', description: 'Official language test scorecard (IELTS General / PTE / national language exam).', is_mandatory: true },
        { title: 'Police Clearance Certificates (PCC)', description: 'National PCCs from Regional Passport Office (RPO) and all jurisdictions lived in 6+ months.', is_mandatory: true },
        { title: 'Proof of Unencumbered Settlement Funds', description: 'Liquid bank balance certificate demonstrating financial self-sufficiency for applicant and family.', is_mandatory: true },
        { title: 'Panel Physician Health & Medical Examination', description: 'Comprehensive medical clearance report from authorized panel clinics.', is_mandatory: true }
      ],
      financial_proofs: [
        { type: 'Unencumbered Liquid Settlement Funds', minimum_balance_or_amount: '15,000–25,000 USD equivalent in liquid savings, fixed deposits, or provident fund', time_frame: 'Last 6 to 12 months stamped bank statements', notes: 'Must be unencumbered liquid funds with no personal loans or sudden unexplained borrowing.' }
      ],
      other_requirements: [
        { category: 'Point-Based / Economic Qualification', details: 'Must meet national economic criteria based on age, education, language ability, and skilled work experience.' },
        { category: 'Two-Stage Biometrics & Health Clearance', details: 'Biometrics recorded at VAC; physical biometric residency card issued by domestic immigration bureau.' }
      ],
      how_to_apply: [
        '1️⃣ Phase 1 (Pre-Requisites): Complete credential evaluation (ECA) and standardized language proficiency exam.',
        '2️⃣ Phase 2 (Expression of Interest): Submit online Expression of Interest (EOI) or economic profile in national talent pool.',
        '3️⃣ Phase 3 (Invitation to Apply): Receive formal Invitation to Apply (ITA) or provincial/state nomination approval.',
        '4️⃣ Phase 4 (Full PR Lodgement): Submit complete immigration dossier with apostilled PCC, medical clearance, and settlement funds proof.',
        '5️⃣ Phase 5 (Permanent Residence Grant): Receive Confirmation of Permanent Residence (COPR) / Resident Visa Grant Letter.'
      ],
      costs: {
        visa_fee: '1,200 – 3,500 USD equivalent in local currency',
        service_fee: '150 – 350 USD (Biometrics and Logistics)',
        total_fee: 'Official National PR Application Fees Apply',
        notes: 'Payable online directly to official immigration authorities.'
      },
      processing_and_timing: {
        apply_window: 'Submit complete application within designated window following invitation (typically 60-90 days).',
        decision_time: 'Standard economic migration processing: 6 to 12 months.',
        max_extension: 'Permanent residency card valid for 5 years and renewable indefinitely.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 10. GENERIC DESTINATION TOURIST FALLBACK
  // ═══════════════════════════════════════════════════════════════
  return {
    passport_country: from,
    destination_country: to,
    purpose_of_visit: rawPurpose || 'Tourism / Vacation',
    visa_type: `${to} Consular Visa / Electronic Travel Authorization`,
    source_url: `https://www.vfsglobal.com`,
    official_source_name: `Official Consular Mission & Ministry of Foreign Affairs of ${to}`,
    documents_required: [
      {
        title: 'Original Passport',
        description: 'Valid for at least 6 months beyond intended departure date with minimum 2 consecutive blank visa pages.',
        is_mandatory: true
      },
      {
        title: 'Official Visa Application Form',
        description: 'Completed and signed official consular visa application form matching passport details.',
        is_mandatory: true
      },
      {
        title: 'Recent Passport Photographs',
        description: 'Color photographs on white background meeting official embassy biometric specifications.',
        is_mandatory: true
      },
      {
        title: 'Flight Itinerary & Accommodation',
        description: 'Confirmed round-trip flight booking and hotel vouchers or official host invitation letter.',
        is_mandatory: true
      },
      {
        title: 'Employment & Occupation Proof',
        description: 'Employer NOC / leave sanction letter, recent 3 months payslips, or company registration documents.',
        is_mandatory: true
      }
    ],
    financial_proofs: [
      {
        type: 'Bank Statements & Income Tax Returns',
        minimum_balance_or_amount: 'Sufficient liquid funds covering total stay duration',
        time_frame: 'Last 6 months original bank statements with bank seal + 3 years ITR',
        notes: 'Signed and stamped by issuing bank verifying steady income and self-sufficiency.'
      },
      {
        type: 'Employment & Income Stability Proof',
        minimum_balance_or_amount: null,
        time_frame: 'Current / Last 3-6 months',
        notes: 'Salary slips, business incorporation certificate, or financial sponsor affidavit.'
      }
    ],
    other_requirements: [
      {
        category: 'Travel Medical Insurance',
        details: 'Comprehensive international emergency policy covering hospitalization, medical evacuation, and repatriation.'
      },
      {
        category: 'Biometrics & VAC Appointment',
        details: 'Mandatory in-person appointment at authorized Visa Application Centre (VFS Global / TLS / BLS) for fingerprinting and document submission.'
      }
    ],
    how_to_apply: [
      `Check requirements and assemble mandatory documents: valid passport, 6-month bank statements, photos, and flight/hotel bookings.`,
      `Complete the official ${to} consular visa application form online or download the official submission packet.`,
      `Book an appointment at the authorized Visa Application Centre (VFS Global / Embassy / VAC) and pay the official visa fee.`,
      `Attend your in-person VAC appointment for document submission, identity verification, and biometric fingerprinting.`,
      `Track your application status online and collect your stamped passport or receive your official electronic visa grant.`
    ],
    costs: {
      visa_fee: '₹4,500 – ₹9,200',
      service_fee: '₹1,500 – ₹2,800 (VAC Processing)',
      total_fee: '₹6,000 – ₹12,000 Total Reference',
      notes: 'Official consular visa and VAC logistics fees combined; exchange rates apply.'
    },
    processing_and_timing: {
      apply_window: 'Apply 30 to 90 days before your intended travel date.',
      decision_time: 'Decision: 10 to 15 business days after appointment submission.',
      max_extension: 'Standard single or multiple entry visa valid per consular approval.'
    }
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const tokenHeader = request.headers.get('x-turnstile-token');
    const turnstileToken = body.turnstileToken || body.token || tokenHeader;

    // Verify Cloudflare Turnstile token
    if (turnstileToken) {
      const isHuman = await verifyTurnstileToken(turnstileToken, request);
      if (!isHuman) {
        return new Response(
          JSON.stringify({ success: false, error: 'Security validation failed. Human verification required.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const rawFrom = body.fromCountry || body.passportCountry || 'India';
    const rawTo = body.toCountry || body.destinationCountry || 'Greece';
    const purpose = body.purpose || 'Tourism / Vacation';

    const fromCountry = cleanCountryName(rawFrom);
    const toCountry = cleanCountryName(rawTo);

    const isToSchengen = ['greece', 'romania', 'bulgaria', 'croatia', 'france', 'germany', 'italy', 'spain', 'switzerland', 'austria', 'netherlands', 'portugal', 'belgium', 'sweden', 'norway', 'denmark', 'finland', 'czechia', 'czech republic', 'poland', 'hungary', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'iceland', 'liechtenstein'].some(c => isDestination(toCountry, c));

    // List of destinations with 100% verified official datasets
    const VERIFIED_DESTINATIONS: Array<{ primary: string; aliases?: string[]; exclusions?: string[] }> = [
      { primary: 'united kingdom', aliases: ['uk', 'england', 'great britain', 'scotland', 'wales', 'british'] },
      { primary: 'united states', aliases: ['usa', 'us', 'america', 'american'] },
      { primary: 'canada', aliases: ['canadian'] },
      { primary: 'australia', aliases: ['australian'] },
      { primary: 'new zealand', aliases: ['nz'] },
      { primary: 'united arab emirates', aliases: ['uae', 'dubai', 'abu dhabi', 'sharjah', 'emirates'] },
      { primary: 'singapore' },
      { primary: 'thailand', aliases: ['bangkok', 'phuket', 'pattaya'] },
      { primary: 'malaysia', aliases: ['kuala lumpur', 'penang'] },
      { primary: 'maldives', aliases: ['male'] },
      { primary: 'mauritius', aliases: ['port louis'] },
      { primary: 'indonesia', aliases: ['bali', 'jakarta'] },
      { primary: 'vietnam', aliases: ['hanoi', 'ho chi minh', 'da nang'] },
      { primary: 'japan', aliases: ['tokyo', 'osaka', 'kyoto'] },
      { primary: 'sri lanka', aliases: ['colombo'] },
      { primary: 'saudi arabia', aliases: ['saudi', 'ksa', 'riyadh', 'jeddah'] },
      { primary: 'qatar', aliases: ['doha'] },
      { primary: 'romania', aliases: ['bucharest', 'cluj', 'timisoara', 'brasov'] },
      { primary: 'oman', aliases: ['muscat', 'salalah', 'sultanate of oman'], exclusions: ['romania'] },
      { primary: 'bahrain', aliases: ['manama'] },
      { primary: 'egypt', aliases: ['cairo', 'alexandria', 'hurghada'] },
      { primary: 'kenya', aliases: ['nairobi', 'mombasa'] },
      { primary: 'tanzania', aliases: ['zanzibar', 'dar es salaam'] },
      { primary: 'south africa', aliases: ['johannesburg', 'cape town', 'durban'] },
      { primary: 'seychelles', aliases: ['mahe'] },
      { primary: 'south korea', aliases: ['korea', 'seoul', 'busan'], exclusions: ['north korea'] },
      { primary: 'hong kong', aliases: ['hk', 'hongkong'] },
      { primary: 'kazakhstan', aliases: ['almaty', 'astana'] },
      { primary: 'azerbaijan', aliases: ['baku'] },
      { primary: 'georgia', aliases: ['tbilisi', 'batumi'], exclusions: ['usa', 'united states', 'atlanta'] },
      { primary: 'philippines', aliases: ['manila', 'cebu'] },
      { primary: 'greece', aliases: ['athens', 'thessaloniki'] },
      { primary: 'germany', aliases: ['berlin', 'munich', 'frankfurt', 'deutschland'] },
      { primary: 'france', aliases: ['paris', 'nice', 'lyon'] },
      { primary: 'italy', aliases: ['rome', 'milan', 'venice', 'florence'] },
      { primary: 'spain', aliases: ['madrid', 'barcelona'] },
      { primary: 'switzerland', aliases: ['zurich', 'geneva'] },
      { primary: 'austria', aliases: ['vienna'] },
      { primary: 'netherlands', aliases: ['amsterdam', 'holland'] },
      { primary: 'portugal', aliases: ['lisbon', 'porto'] },
      { primary: 'belgium', aliases: ['brussels'] },
      { primary: 'sweden', aliases: ['stockholm'] },
      { primary: 'norway', aliases: ['oslo'] },
      { primary: 'denmark', aliases: ['copenhagen'] },
      { primary: 'finland', aliases: ['helsinki'] },
      { primary: 'czechia', aliases: ['czech republic', 'prague'] },
      { primary: 'poland', aliases: ['warsaw', 'krakow'] },
      { primary: 'hungary', aliases: ['budapest'] },
      { primary: 'malta', aliases: ['valletta'] },
      { primary: 'bulgaria', aliases: ['sofia'] },
      { primary: 'croatia', aliases: ['zagreb', 'dubrovnik'] },
      { primary: 'ethiopia', aliases: ['addis ababa', 'ethiopian', 'ethiopia evisa'] }
    ];

    const isVerifiedCountry = VERIFIED_DESTINATIONS.some(d => isDestination(toCountry, d.primary, d.aliases || [], d.exclusions || []));

    // Serve 100% verified official consular dataset directly for instant, flawless accuracy
    if (isVerifiedCountry) {
      const verified = getVerifiedOfficialData(fromCountry, toCountry, purpose);
      return new Response(JSON.stringify({ success: true, data: sanitizeCurrencyCodes(verified), source: 'verified-consular-standards' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = getGeminiApiKey();
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are the Principal Immigration Data Architect & Verification Engine for TravlTik (travltik.com).

Generate 100% accurate, country-isolated, non-hallucinated visa requirements, fees, document checklists, and application steps for:
1. Origin / Passport Country: "${fromCountry}"
2. Destination Country: "${toCountry}"
3. Purpose of Visit: "${purpose}"

CRITICAL ISOLATION RULE:
- Adhere strictly and exclusively to the requested Destination Country: "${toCountry}" and Passport Country: "${fromCountry}".
- Never mix authorities, currencies, forms, fees, or regulations from previous conversational context or other nations.
- Treat this request as a completely fresh, stateless assessment.

PRE-OUTPUT VERIFICATION GUARDRAIL:
- Ensure official_source_name, source_url, visa_type, currency, and embassy names exactly belong to "${toCountry}".

STRICT DATA ISOLATION & VERIFICATION MANDATES:
1. ZERO CROSS-CONTAMINATION (NO HYBRID RULES):
   - Never apply Schengen rules (€30k insurance, 35x45mm, Type C) to USA, UK, Canada, Australia, Singapore, GCC.
   - For USA: strictly 2x2 inches (51x51mm) photo, DS-160 barcode, $185 MRV fee, 10-year B1/B2 validity, CBP 180-day stay rule.
   - For UK: CAS 14-digit code (students), 28-day financial holding rule, IHS surcharge, 35x45mm photo.
   - For GCC (UAE, Saudi, Oman, Qatar, Bahrain, Kuwait): Minimum 6 months passport validity from arrival. Never display 3-month or 10-year Schengen rules.
   - For Schengen / EU: strictly Harmonised Schengen Visa Application Form (NEVER DS-160 which is US only), €90 consular fee, €30 VAC service charge (€120 total), €30,000 travel medical insurance, 35x45mm photo (NEVER 2x2 inch), 90/180-day rule. Include all mandatory documents: Passport (min 3 months beyond return / 6 months recommended, 2 blank pages), Harmonised Application Form, 2 Photos (35x45mm), Travel Insurance (€30k), Flight Reservation (with PNR), Hotel Bookings / Host Letter, Day-by-Day Itinerary, Stamped 3-6 Month Bank Statements (€50-€70/day), 3 Years ITR-V, and Employment Proof (NOC + salary slips / GST + business ITR).

2. DYNAMIC CONSULAR EXCHANGE RATE FORMULA:
   - Always include in costs.notes: "Converted at the official consular exchange rate at the time of fee payment challan generation."

3. INTERVIEW WAIVER & DROP-BOX CLAUSES:
   - In 'how_to_apply', include conditional waiver check: "Interview Waiver / Drop-Box Eligibility: Check if applicant qualifies to bypass the in-person Consular Interview based on prior visa issuance history within eligible renewal windows."

4. PRIMARY VS. SECONDARY FINANCIAL PROOFS:
   - Mandatory primary proofs (Bank Statements, ITRs) marked as is_mandatory: true.
   - Secondary/supplementary proofs (Fixed Deposits, Property Valuations, Mutual Funds) marked as is_mandatory: false with "(Optional / Solvency Strengthening)".

5. CITY-SPECIFIC VAC & CONSULAR LOCATIONS:
   - Auto-populate in processing_and_timing.center_notes all operational VACs and Consulates in ${fromCountry} for ${toCountry}.

Return ONLY a valid JSON object matching this exact schema:
{
  "passport_country": "${fromCountry}",
  "destination_country": "${toCountry}",
  "purpose_of_visit": "${purpose}",
  "visa_type": "Official visa category name",
  "source_url": "Official embassy / ministerial portal URL",
  "official_source_name": "Official issuing authority name",
  "validity_and_stay": {
    "visa_validity": "e.g. 10 Years Multiple Entry or 6 Months or Course Duration",
    "max_stay_per_entry": "e.g. Up to 6 Months (180 Days) or Up to 90 Days",
    "entry_type": "Single Entry / Multiple Entry"
  },
  "documents_required": [
    {
      "title": "Document title",
      "description": "Exhaustive specifications, photo millimeter dimensions, form names, or validity rules",
      "is_mandatory": true
    }
  ],
  "financial_proofs": [
    {
      "type": "Primary / Secondary Proof Title",
      "minimum_balance_or_amount": "Amount with currency or null",
      "time_frame": "Timeframe required",
      "notes": "Bank stamp, sealing rules, or employer NOC"
    }
  ],
  "other_requirements": [
    {
      "category": "Category name",
      "details": "Specific actionable legal and procedural instructions"
    }
  ],
  "how_to_apply": [
    "Step 1...",
    "Step 2...",
    "Step 3...",
    "Step 4...",
    "Step 5..."
  ],
  "costs": {
    "visa_fee": "Fee with currency",
    "service_fee": "VAC logistics fee",
    "total_fee": "Total fee",
    "notes": "Converted at the official consular exchange rate at the time of fee payment challan generation."
  },
  "processing_and_timing": {
    "apply_window": "Application window timeline",
    "decision_time": "Decision and passport dispatch timeline",
    "max_extension": "Extension or in-country stay adjustment rules",
    "center_notes": "Operational VACs and Consulate/Embassy locations across ${fromCountry}"
  }
}`;

        let response: any = null;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          });
        } catch (f35Err) {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          });
        }

        const text = response.text ? response.text.trim() : '';
        if (text) {
          const parsed = JSON.parse(text);
          parsed.passport_country = cleanCountryName(parsed.passport_country || fromCountry);
          parsed.destination_country = cleanCountryName(parsed.destination_country || toCountry);

          // Post-generation sanity guard for Schengen destinations:
          if (isToSchengen) {
            if (Array.isArray(parsed.documents_required)) {
              parsed.documents_required = parsed.documents_required.map((doc: any) => {
                if (doc.title?.toLowerCase().includes('ds-160') || doc.description?.toLowerCase().includes('ds-160')) {
                  doc.title = 'Harmonised Schengen Visa Application Form';
                  doc.description = doc.description.replace(/ds-160/gi, 'Harmonised Schengen Visa Application Form');
                }
                if (doc.description?.includes('2x2')) {
                  doc.description = doc.description.replace(/2x2\s*inch/gi, '35x45mm');
                }
                return doc;
              });
            }
          }

          return new Response(JSON.stringify({ success: true, data: sanitizeCurrencyCodes(parsed), source: 'gemini-ai' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (aiErr) {
        console.warn('[AI Requirements API] Gemini fallback triggered:', aiErr);
      }
    }

    // Fallback to verified official consular database
    const verified = getVerifiedOfficialData(fromCountry, toCountry, purpose);
    return new Response(JSON.stringify({ success: true, data: sanitizeCurrencyCodes(verified), source: 'consular-knowledge-base' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[AI Requirements API Error]', err);
    return new Response(JSON.stringify({ success: false, message: 'Failed to retrieve requirements' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
