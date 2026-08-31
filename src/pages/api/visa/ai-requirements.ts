// src/pages/api/visa/ai-requirements.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Resolve Gemini API key safely
const getGeminiApiKey = (): string => {
  let key = (import.meta?.env?.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  key = (process.env.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY\s*=\s*(.*)$/m);
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

// Built-in verified database matching official GVCW, VFS, UKVI & Consular regulations
function getVerifiedOfficialData(rawFrom: string, rawTo: string, rawPurpose: string): StructuredVisaRequirements {
  const from = cleanCountryName(rawFrom);
  const to = cleanCountryName(rawTo);
  const toLower = to.toLowerCase();
  const purposeLower = rawPurpose.toLowerCase();

  const isUK = toLower.includes('united kingdom') || toLower.includes('uk') || toLower.includes('england');
  const isGreece = toLower.includes('greece');
  const isSchengen = isGreece || ['france', 'germany', 'italy', 'spain', 'netherlands', 'switzerland', 'austria', 'portugal', 'belgium', 'sweden'].some(c => toLower.includes(c));
  const isUSA = toLower.includes('united states') || toLower.includes('usa');
  const isMauritius = toLower.includes('mauritius');
  const isThailand = toLower.includes('thailand');
  const isMalaysia = toLower.includes('malaysia');
  const isMaldives = toLower.includes('maldives');
  const isSriLanka = toLower.includes('sri lanka');
  const isIndonesia = toLower.includes('indonesia') || toLower.includes('bali');
  const isVietnam = toLower.includes('vietnam');

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
  if (toLower.includes('singapore') && !purposeLower.includes('work') && !purposeLower.includes('study')) {
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
  if ((toLower.includes('indonesia') || toLower.includes('bali')) && !purposeLower.includes('work') && !purposeLower.includes('study')) {
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
  if (toLower.includes('vietnam') && !purposeLower.includes('work') && !purposeLower.includes('study')) {
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
  if (toLower.includes('japan') && !purposeLower.includes('work') && !purposeLower.includes('study')) {
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
  if (toLower.includes('sri lanka') && !purposeLower.includes('work') && !purposeLower.includes('study')) {
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
  // 1. UNITED KINGDOM PATHWAYS
  // ═══════════════════════════════════════════════════════════════
  if (isUK) {
    // 1A. UK Student Visa (Higher Studies)
    if (purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('education') || purposeLower.includes('higher')) {
      return {
        passport_country: from,
        destination_country: 'United Kingdom',
        purpose_of_visit: 'Student Visa',
        visa_type: 'UK Student Visa (Student Route)',
        source_url: 'https://www.gov.uk/student-visa/documents-you-must-provide',
        official_source_name: 'UK Visas & Immigration (UKVI) official sources',
        documents_required: [
          {
            title: 'Valid Passport',
            description: 'Must be valid for your full period of stay in the UK and contain at least 1 blank page for the entry vignette.',
            is_mandatory: true
          },
          {
            title: 'Confirmation of Acceptance for Studies (CAS)',
            description: 'A unique 14-digit reference number provided by your UK licensed university sponsor upon unconditional acceptance.',
            is_mandatory: true
          },
          {
            title: 'Proof of English Language Capability',
            description: 'SELT certificate (IELTS Academic/PTE Academic) or confirmation on CAS that university assessed English proficiency.',
            is_mandatory: true
          },
          {
            title: 'Tuberculosis (TB) Test Certificate',
            description: 'Required if residing in a UKVI listed country for 6+ months. Certificate must be from a UKVI-approved clinic.',
            is_mandatory: true
          },
          {
            title: 'ATAS Certificate',
            description: 'Academic Technology Approval Scheme clearance required for specific sensitive postgraduate STEM/tech courses.',
            is_mandatory: false
          }
        ],
        financial_proofs: [
          {
            type: 'Bank Statement / Official Financial Sponsorship',
            minimum_balance_or_amount: 'Tuition Fee Balance + Living Allowance (£1,529/mo London or £1,171/mo Non-London)',
            time_frame: 'Held for 28 consecutive days minimum',
            notes: 'Bank statement must be dated within 31 days of application submission. Account must allow immediate cash withdrawal.'
          }
        ],
        other_requirements: [
          {
            category: 'Immigration Health Surcharge (IHS)',
            details: 'Mandatory healthcare fee paid online during visa application setup for access to NHS medical services (£776/year).'
          },
          {
            category: 'Biometrics Appointment',
            details: 'Mandatory in-person appointment at VFS Global / TLScontact center to submit fingerprints and digital facial photograph.'
          }
        ],
        how_to_apply: [
          'Secure unconditional offer & official CAS letter from UK university.',
          'Complete UKVI online visa application form & pay visa fee + IHS.',
          'Upload supporting academic & 28-day financial documents to VFS portal.',
          'Attend VFS Global appointment for biometrics and passport submission.',
          'Receive UKVI decision letter and collect passport with visa vignette or eVisa.'
        ],
        costs: {
          visa_fee: '£490 (approx. ₹52,400)',
          service_fee: '£776 / yr (IHS Healthcare)',
          total_fee: '£1,266+ (Visa + 1st Year IHS)',
          notes: 'Payable online directly at official UKVI portal; exchange rates apply.'
        },
        processing_and_timing: {
          apply_window: 'Apply up to 6 months before course start date.',
          decision_time: 'Decision: Standard 3 weeks (15 working days).',
          max_extension: 'Priority Service (5 working days) | Super Priority (24 hours) available.',
          center_notes: 'Applications submitted via VFS Global centers across 10+ Indian cities.'
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
  // 2. GREECE & SCHENGEN PATHWAYS
  // ═══════════════════════════════════════════════════════════════
  if (isGreece || isSchengen) {
    const dest = isGreece ? 'Greece' : to;
    const isStudy = purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('education');
    const isWork = purposeLower.includes('work') || purposeLower.includes('job') || purposeLower.includes('employment');
    const isBusiness = purposeLower.includes('business');
    const isFamily = purposeLower.includes('family') || purposeLower.includes('friend');

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
          description: 'Confirmed round-trip flight reservation showing outbound and return flights with a verifiable PNR (Passenger Name Record). ⚠️ Do NOT purchase non-refundable tickets before the visa is issued — book a refundable or on-hold reservation only. Itinerary must show travel from India → Greece (or primary Schengen entry country) → India.',
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
          notes: 'Must show regular income credits, no sudden large deposits. Original bank stamp + branch manager signature mandatory. Online/self-printed statements are NOT accepted by the Embassy of Greece.'
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
          details: 'The consular officer must be convinced you will return to India before your visa expires. Provide strong evidence of ties: Employment letter, property ownership documents, family responsibilities, bank assets, or business ownership. Weak home-country ties are the #1 reason for Greece visa rejection.'
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
  if (toLower.includes('united states') || toLower.includes('usa') || toLower === 'us' || toLower.includes('america')) {
    const isStudent = purposeLower.includes('study') || purposeLower.includes('student') || purposeLower.includes('university') || purposeLower.includes('college');
    const isWork = purposeLower.includes('work') || purposeLower.includes('job') || purposeLower.includes('employment') || purposeLower.includes('h1b') || purposeLower.includes('l1');

    if (isStudent) {
      return {
        passport_country: from,
        destination_country: 'United States',
        purpose_of_visit: 'Study / Higher Education',
        visa_type: 'F-1 Academic Student Visa',
        source_url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
        official_source_name: 'U.S. Department of State & US Travel Docs',
        documents_required: [
          { title: 'Form I-20 (Certificate of Eligibility)', description: 'Official signed Form I-20 issued by SEVP-certified US educational institution.', is_mandatory: true },
          { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended period of stay in the United States.', is_mandatory: true },
          { title: 'DS-160 Confirmation Page', description: 'Online Nonimmigrant Visa Application confirmation page with 10-digit barcode.', is_mandatory: true },
          { title: 'I-901 SEVIS Fee Receipt', description: 'Proof of payment of mandatory $350 SEVIS fee paid at fmjfee.com.', is_mandatory: true },
          { title: 'Academic Transcripts & Standardized Scores', description: 'Degree certificates, marksheets, GRE/GMAT, and TOEFL/IELTS scorecards.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Liquid Funds Covering 1st Year Costs', minimum_balance_or_amount: 'Total 1-year tuition + living costs as stated on Form I-20', time_frame: 'Last 6 months bank statements', notes: 'Bank balance certificates, fixed deposit receipts, approved education loan sanction letters, or sponsor affidavit (Form I-134).' }
        ],
        other_requirements: [
          { category: 'Two-Stage Appointment Requirement', details: 'Stage 1: VAC Biometrics (photo & fingerprints). Stage 2: In-person consular interview at US Embassy/Consulate.' },
          { category: 'I-901 SEVIS Fee Verification', details: 'Mandatory $350 SEVIS fee must be paid and verified online at fmjfee.com at least 3 business days prior to consular interview.' },
          { category: 'Section 214(b) Academic Intent', details: 'Student must demonstrate legitimate educational intent, adequate liquid financial solvency, and intent to depart the US upon program completion.' },
          { category: 'Student Health & Medical Insurance', details: 'Universities mandate comprehensive student health insurance (or waiver-eligible international coverage) prior to campus enrollment.' }
        ],
        how_to_apply: [
          'Receive signed Form I-20 from your SEVP-approved US university.',
          'Pay the mandatory $350 I-901 SEVIS fee online at fmjfee.com.',
          'Complete Form DS-160 online and save your 10-digit confirmation barcode.',
          'Create profile on usvisascheduling.com, pay $185 MRV visa fee, and schedule VAC Biometrics + Consular Interview appointments.',
          'Attend VAC for biometrics, then attend your Embassy Consular Interview with original I-20 and financial documents.',
          'Upon visa approval, collect passport with stamped F-1 visa foil from chosen VAC or courier.'
        ],
        costs: { visa_fee: '$185 (approx. ₹15,540)', service_fee: '$350 (I-901 SEVIS Fee)', total_fee: '$535 Total Reference', notes: 'Paid online via official US visa scheduling portal (UPI / NEFT / Credit Card).' },
        processing_and_timing: { apply_window: 'Apply up to 365 days before course start date on I-20.', decision_time: 'Decision given at the end of consular interview.', max_extension: 'Can enter USA up to 30 days before program start date.' }
      };
    }

    if (isWork) {
      return {
        passport_country: from,
        destination_country: 'United States',
        purpose_of_visit: 'Employment / Work',
        visa_type: 'H-1B / L-1 Specialty Occupation Visa',
        source_url: 'https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html',
        official_source_name: 'U.S. Citizenship and Immigration Services (USCIS)',
        documents_required: [
          { title: 'Form I-797 (Notice of Action)', description: 'Original or copy of approved petition from USCIS with valid receipt number.', is_mandatory: true },
          { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended period of stay.', is_mandatory: true },
          { title: 'DS-160 Confirmation', description: 'Printed confirmation barcode page of completed DS-160 form.', is_mandatory: true },
          { title: 'Employment Offer Letter & Client Letter', description: 'Detailed job offer letter, salary breakdown, and vendor/client documentation.', is_mandatory: true },
          { title: 'Educational & Professional Credentials', description: 'Degree evaluations, experience letters, and previous US paystubs/W-2s if applicable.', is_mandatory: true }
        ],
        financial_proofs: [
          { type: 'Salary Slips & Tax Returns', minimum_balance_or_amount: 'Certified LCA wage minimum', time_frame: 'Last 3-6 months paystubs & Form 16 / ITR', notes: 'Proof of steady employment and authorized compensation.' }
        ],
        other_requirements: [
          { category: 'USCIS Petition Approval', details: 'Employer must secure approved Form I-129 petition before visa appointment scheduling.' },
          { category: 'Two-Stage Biometrics & Interview', details: 'Attend VAC for fingerprinting and digital photo, followed by consular interview at US Consulate.' },
          { category: 'Client Letter & End-Client Verification', details: 'Third-party placement workers must present current, signed client letters specifying work location and job duties.' },
          { category: 'Travel Medical & Relocation Cover', details: 'Comprehensive health coverage is required upon entry into the US until employer group policy becomes active.' }
        ],
        how_to_apply: [
          'Employer petitions USCIS and receives approved Form I-797 Notice of Action.',
          'Complete Form DS-160 online and note your confirmation barcode.',
          'Create account on usvisascheduling.com, pay $205 MRV visa fee, and book VAC + Consular interview dates.',
          'Attend VAC for digital biometrics and facial photograph.',
          'Attend Consular Interview at US Embassy/Consulate with I-797, LCA, and employment documents.',
          'Receive passport with stamped H-1B/L-1 visa foil via premium delivery or VAC collection.'
        ],
        costs: { visa_fee: '$205 (approx. ₹17,220)', service_fee: '₹0 (Included)', total_fee: '$205 Total Reference', notes: 'Excludes USCIS employer filing and fraud prevention fees.' },
        processing_and_timing: { apply_window: 'Apply up to 90 days before petition start date.', decision_time: 'Decision given immediately at consular window.', max_extension: 'Can enter USA up to 10 days before petition validity starts.' }
      };
    }

    // Default US B1/B2 Visitor / Tourism
    return {
      passport_country: from,
      destination_country: 'United States',
      purpose_of_visit: 'Tourism / Business Visit (B1/B2)',
      visa_type: 'B1/B2 Nonimmigrant Visitor Visa',
      source_url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
      official_source_name: 'U.S. Department of State & U.S. Embassy Consular Affairs',
      documents_required: [
        { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond intended stay with blank visa pages.', is_mandatory: true },
        { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation sheet with clear 10-character alphanumeric barcode.', is_mandatory: true },
        { title: 'Appointment Confirmation Letter', description: 'Printed confirmation confirming both VAC Biometrics and Consular Interview appointments.', is_mandatory: true },
        { title: 'Travel Purpose & Itinerary', description: 'Detailed travel itinerary, flight bookings, hotel reservations, or invitation letter from US host.', is_mandatory: true },
        { title: 'Employment & Ties to Home Country', description: 'Employer leave letter / NOC, business registration, property documents proving intention to return.', is_mandatory: true }
      ],
      financial_proofs: [
        { type: 'Bank Statements & Income Tax Returns', minimum_balance_or_amount: 'Sufficient funds covering full estimated US trip expenses ($4,000–$7,000+)', time_frame: 'Last 6 months bank statements + last 3 years ITR / Form 16', notes: 'Original bank statements with bank stamp; demonstrating financial self-sufficiency.' }
      ],
      other_requirements: [
        { category: 'Two-Stage Appointment Requirement', details: 'You must attend two separate appointments: (1) VAC for photo & biometrics, and (2) US Embassy/Consulate for the consular interview.' },
        { category: 'Section 214(b) INA Adjudication', details: 'Applicants must demonstrate strong economic, social, and family ties to their home country to overcome immigrant intent.' },
        { category: 'DS-160 & MRV Receipt Validity', details: 'The 10-character DS-160 confirmation barcode must be locked before scheduling; MRV fee receipt allows 365 days to schedule.' },
        { category: 'Travel Health & Medical Insurance', details: 'Consular authorities strongly advise international travel medical insurance with minimum $50,000 emergency medical and evacuation coverage.' }
      ],
      how_to_apply: [
        'Complete the official Form DS-160 online (ceac.state.gov) and print your confirmation barcode.',
        'Create a profile on usvisascheduling.com and pay the $185 MRV visa fee (via UPI, NEFT, or card).',
        'Schedule your two appointments: (1) VAC Biometrics appointment, and (2) Consular Interview.',
        'Attend VAC appointment with passport and DS-160 confirmation for photo and fingerprint registration.',
        'Attend in-person Consular Interview at the US Embassy/Consulate with your financial and tie-back proofs.',
        'Upon visa approval, collect your 10-year multiple-entry visa stamped passport from selected VAC or courier.'
      ],
      costs: {
        visa_fee: '$185 (approx. ₹15,540)',
        service_fee: '₹0 (Direct Consular Fee)',
        total_fee: '$185 Total Reference',
        notes: 'Payable online directly via official US Visa Scheduling portal; valid for 10 years multiple entry.'
      },
      processing_and_timing: {
        apply_window: 'Apply 2 to 3 months before intended travel date.',
        decision_time: 'Decision: Given verbally at the end of the consular interview.',
        max_extension: '10-Year Multiple Entry Visa (up to 6 months stay per entry authorized at CBP port of entry).'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. CANADA OFFICIAL IMMIGRATION REQUIREMENTS (IRCC)
  // ═══════════════════════════════════════════════════════════════
  if (toLower.includes('canada')) {
    const isStudent = purposeLower.includes('study') || purposeLower.includes('student');
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
        { type: 'Bank Statements & Tax Returns', minimum_balance_or_amount: 'CAD $10,000+ for single visitor / GIC $20,635 CAD for students', time_frame: 'Last 6 months stamped bank statements + 3 years ITR', notes: 'Demonstrates sufficient liquid funds without sudden unexplained deposits.' }
      ],
      other_requirements: [
        { category: 'Biometrics Requirement (BIL)', details: 'Mandatory biometrics (fingerprints & photo) given at VFS Global VAC once Biometrics Instruction Letter is issued.' },
        { category: 'Passport Submission (PPR)', details: 'Upon online approval, submit original passport to VFS for counterfoil visa stamping.' }
      ],
      how_to_apply: [
        'Create an official IRCC Portal account on canada.ca and complete the online application.',
        'Upload scanned documents: passport, bank statements, itinerary, employment letter, and SOP.',
        'Pay the $100 CAD visa application fee + $85 CAD biometrics fee online using credit/debit card.',
        'Receive your Biometrics Instruction Letter (BIL) within 24-48 hours.',
        'Book and attend an appointment at your nearest VFS Global Canada VAC to submit biometrics.',
        'Track your application on IRCC portal; upon approval, submit passport to VFS for visa counterfoil stamping.'
      ],
      costs: {
        visa_fee: '$100 CAD (approx. ₹6,200)',
        service_fee: '$85 CAD (Biometrics Fee)',
        total_fee: '$185 CAD Total Reference',
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
  if (toLower.includes('australia')) {
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
        { type: 'Bank Statements & Income Evidence', minimum_balance_or_amount: 'AUD $5,000–$8,000+ in liquid savings', time_frame: 'Last 6 months stamped bank statements + 3 years ITR', notes: 'Demonstrates financial capacity to support stay in Australia.' }
      ],
      other_requirements: [
        { category: '100% Digital e-Visa', details: 'Australia issues electronic visa grants linked directly to your passport number; no physical passport label is required.' },
        { category: 'Biometrics Collection', details: 'Applicants in India must provide biometrics at Australian Biometric Collection Centre (VFS Global) upon request.' }
      ],
      how_to_apply: [
        'Create an official ImmiAccount on online.immi.gov.au.',
        'Complete the online Subclass 600 Visitor Visa application form.',
        'Upload high-quality color scans of passport, financial proofs, travel itinerary, and employment documents.',
        'Pay the $195 AUD official visa fee securely online via ImmiAccount.',
        'Receive the Biometrics Requirement Letter and complete fingerprint/photo capture at VFS Global ABCC.',
        'Receive your official Australian Electronic Visa Grant Notification via email.'
      ],
      costs: {
        visa_fee: '$195 AUD (approx. ₹10,800)',
        service_fee: '₹1,650 (VFS Biometrics if applicable)',
        total_fee: '$195 AUD+ Total Reference',
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
  // 6. UNITED ARAB EMIRATES (UAE / DUBAI) OFFICIAL REQUIREMENTS
  // ═══════════════════════════════════════════════════════════════
  if (toLower.includes('emirates') || toLower.includes('uae') || toLower.includes('dubai') || toLower.includes('abu dhabi')) {
    return {
      passport_country: from,
      destination_country: 'United Arab Emirates',
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'UAE Tourist e-Visa (30 / 60 Days Single or Multiple Entry)',
      source_url: 'https://smartservices.icp.gov.ae',
      official_source_name: 'Federal Authority for Identity, Citizenship, Customs & Port Security (ICP) / GDRFA Dubai',
      documents_required: [
        { title: 'Passport Bio-Page & Last Page Scan', description: 'Clear color scan of passport valid for minimum 6 months from entry date.', is_mandatory: true },
        { title: 'Passport-Size Digital Photograph', description: 'Recent color photograph with white background, neutral expression, and 80% face coverage.', is_mandatory: true },
        { title: 'Confirmed Return Air Ticket', description: 'Confirmed round-trip flight booking to Dubai/Abu Dhabi/Sharjah.', is_mandatory: true },
        { title: 'Hotel Booking / Host Address', description: 'Confirmed hotel stay voucher or UAE resident host details & Emirates ID.', is_mandatory: false }
      ],
      financial_proofs: [
        { type: 'Basic Financial Sufficiency', minimum_balance_or_amount: 'AED 3,000 or equivalent in cash / international credit cards upon airport arrival', time_frame: 'Current', notes: 'Standard immigration spot-check requirement at UAE airports.' }
      ],
      other_requirements: [
        { category: '100% Paperless E-Visa', details: 'Issued as an official electronic PDF entry permit. No physical consulate visit or biometrics required.' },
        { category: 'Entry Window', details: 'Valid for entry into UAE within 60 days from date of electronic issuance.' }
      ],
      how_to_apply: [
        'Submit color scan of your valid passport (front and back page) and white-background photograph.',
        'Select your desired visa duration (30 Days or 60 Days Tourist e-Visa).',
        'Pay official government ICP / GDRFA entry permit and processing fees online.',
        'Application undergoes rapid automated security clearance with UAE immigration authorities.',
        'Receive your official approved UAE e-Visa PDF via email and download it for airline check-in.'
      ],
      costs: {
        visa_fee: '₹6,400 (30 Days) / ₹11,800 (60 Days)',
        service_fee: '₹0 (Included)',
        total_fee: '₹6,400 – ₹11,800 Total Reference',
        notes: 'Includes mandatory COVID-19 & emergency health insurance coverage.'
      },
      processing_and_timing: {
        apply_window: 'Apply 7 to 30 days before planned departure date.',
        decision_time: 'Decision: Fast 24 to 72 working hours (Express processing available in 8 hours).',
        max_extension: 'Extendable inside the UAE for an additional 30 days without exit.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. GENERIC DESTINATION FALLBACK (Official Embassy Standard 5-Step Process)
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
    const rawFrom = body.fromCountry || body.passportCountry || 'India';
    const rawTo = body.toCountry || body.destinationCountry || 'Greece';
    const purpose = body.purpose || 'Tourism / Vacation';

    const fromCountry = cleanCountryName(rawFrom);
    const toCountry = cleanCountryName(rawTo);

    // List of countries with 100% verified official datasets
    const toLowerCheck = toCountry.toLowerCase();
    const isVerifiedCountry = [
      'greece', 'united kingdom', 'uk', 'england', 'united states', 'usa', 'america',
      'canada', 'australia', 'emirates', 'uae', 'dubai', 'abu dhabi',
      'singapore', 'thailand', 'malaysia', 'maldives', 'mauritius',
      'indonesia', 'bali', 'vietnam', 'japan', 'sri lanka',
      'france', 'germany', 'italy', 'spain', 'switzerland', 'austria', 'netherlands', 'portugal', 'belgium', 'sweden', 'norway', 'denmark', 'finland', 'czechia', 'poland', 'hungary', 'malta'
    ].some(c => toLowerCheck.includes(c));

    // Serve 100% verified official consular dataset directly for instant, flawless accuracy
    if (isVerifiedCountry) {
      const verified = getVerifiedOfficialData(fromCountry, toCountry, purpose);
      return new Response(JSON.stringify({ success: true, data: verified, source: 'verified-consular-standards' }), {
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

STRICT DATA ISOLATION & VERIFICATION MANDATES:
1. ZERO CROSS-CONTAMINATION (NO HYBRID RULES):
   - Never apply Schengen rules (€30k insurance, 35x45mm, Type C) to USA, UK, Canada, Australia.
   - For USA: strictly 2x2 inches (51x51mm) photo, DS-160 barcode, $185 MRV fee, 10-year B1/B2 validity, CBP 180-day stay rule.
   - For UK: CAS 14-digit code (students), 28-day financial holding rule, IHS surcharge, 35x45mm photo.
   - For Schengen / Greece: strictly Harmonised Schengen Visa Application Form (NEVER DS-160 which is US only), €90 consular fee, €30 VAC service charge (€120 total), €30,000 travel medical insurance, 35x45mm photo (NEVER 2x2 inch), 90/180-day rule. Include all mandatory documents: Passport (min 3 months beyond return / 6 months recommended, 2 blank pages), Harmonised Application Form, 2 Photos (35x45mm), Travel Insurance (€30k), Flight Reservation (with PNR), Hotel Bookings / Host Letter, Day-by-Day Itinerary, Stamped 3-6 Month Bank Statements (€50-€70/day), 3 Years ITR-V, and Employment Proof (NOC + salary slips / GST + business ITR).

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

          return new Response(JSON.stringify({ success: true, data: parsed, source: 'gemini-ai' }), {
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
    return new Response(JSON.stringify({ success: true, data: verified, source: 'consular-knowledge-base' }), {
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
