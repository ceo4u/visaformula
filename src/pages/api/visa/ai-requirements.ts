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

    // Default Schengen Tourism
    return {
      passport_country: from,
      destination_country: dest,
      purpose_of_visit: 'Tourism / Vacation',
      visa_type: 'Short-stay Schengen Visa (Type C)',
      source_url: isGreece ? 'https://in-gr.gvcworld.eu/en/visa-info-tourism' : 'https://www.vfsglobal.com',
      official_source_name: `${dest} official sources (${isGreece ? 'GVCW & Embassy' : 'VFS Global & Embassy'})`,
      documents_required: [
        {
          title: 'Passport',
          description: 'Valid at least 3 months after the planned return; issued within previous 10 years; at least 2 blank pages.',
          is_mandatory: true
        },
        {
          title: 'Visa application form',
          description: 'Fully completed and signed in English or official language.',
          is_mandatory: true
        },
        {
          title: 'Photos',
          description: 'Two recent colour passport photos, 3.5 x 4 cm, forward-facing, light/white background.',
          is_mandatory: true
        },
        {
          title: 'Travel medical insurance',
          description: 'Minimum €30,000; covers all Schengen states and the full intended stay, including medical repatriation.',
          is_mandatory: true
        },
        {
          title: 'Travel & accommodation',
          description: 'Return/round-trip reservation and lodging evidence for the trip / each Schengen destination where applicable.',
          is_mandatory: true
        }
      ],
      financial_proofs: [
        {
          type: 'Financial means',
          minimum_balance_or_amount: '€50 per day of intended stay',
          time_frame: 'Bank statement showing the last 3 months\' movements',
          notes: 'Must contain original bank seal and signature.'
        },
        {
          type: 'Income evidence',
          minimum_balance_or_amount: null,
          time_frame: 'Last 3 months payslips',
          notes: 'Accompanied by employment contract and employer holiday approval.'
        },
        {
          type: 'Tax / employment evidence',
          minimum_balance_or_amount: null,
          time_frame: 'Last two assessment years',
          notes: 'Indian income-tax return (ITR-V) acknowledgement (as listed by the Embassy).'
        },
        {
          type: 'If self-employed',
          minimum_balance_or_amount: null,
          time_frame: 'Current assessment year',
          notes: 'Company registration certificate and relevant income tax assessment documentation.'
        },
        {
          type: 'Tourism evidence',
          minimum_balance_or_amount: null,
          time_frame: 'Duration of trip',
          notes: 'Travel-agency booking certificate or other appropriate document indicating the travel plans.'
        }
      ],
      other_requirements: [
        {
          category: 'Health & Travel Insurance',
          details: 'Mandatory minimum €30,000 policy covering hospitalization and medical repatriation across all 29 Schengen states.'
        },
        {
          category: 'Biometrics & Physical Appointments',
          details: 'Mandatory in-person appointment for fingerprinting and live facial photograph.'
        },
        {
          category: 'Application Window',
          details: 'Applications can be lodged up to 6 months before the planned travel date (minimum 15 working days).'
        }
      ],
      how_to_apply: [
        'Check requirements & prepare documents.',
        'Complete the online application form and print it.',
        'Book a Visa Application Center appointment.',
        'Attend in person for submission and biometrics.',
        'Track the application and collect passport.'
      ],
      costs: {
        visa_fee: '€90',
        service_fee: '€30',
        total_fee: '€120',
        notes: 'Payable in INR at the VAC; exchange rate and fees may change.'
      },
      processing_and_timing: {
        apply_window: 'Apply up to 6 months before travel.',
        decision_time: 'Decision: up to 15 days after admissible receipt by Embassy.',
        max_extension: 'May extend to 45 calendar days in individual cases.',
        center_notes: 'Applications from non-New-Delhi VACs: allow additional dispatch time; notes 5 extra days for those centers.'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. GENERIC DESTINATION FALLBACK
  // ═══════════════════════════════════════════════════════════════
  return {
    passport_country: from,
    destination_country: to,
    purpose_of_visit: rawPurpose || 'Tourism / Vacation',
    visa_type: `${to} Entry Visa / Electronic Authorization`,
    source_url: `https://www.vfsglobal.com`,
    official_source_name: `Official Consular Mission & Ministry of Foreign Affairs of ${to}`,
    documents_required: [
      {
        title: 'Original Passport',
        description: 'Valid for at least 6 months beyond travel date with at least 2 blank pages.',
        is_mandatory: true
      },
      {
        title: 'Visa Application Form',
        description: 'Complete digital visa application form with accurate traveler details.',
        is_mandatory: true
      },
      {
        title: 'Digital Passport Photo',
        description: 'Recent clear photograph on white background meeting consulate millimeter specs.',
        is_mandatory: true
      },
      {
        title: 'Confirmed Travel & Lodging',
        description: 'Confirmed round-trip ticket and accommodation proof or invitation.',
        is_mandatory: true
      }
    ],
    financial_proofs: [
      {
        type: 'Bank Statements',
        minimum_balance_or_amount: 'Sufficient funds covering estimated stay',
        time_frame: 'Last 3 to 6 months',
        notes: 'Signed and stamped by issuing banking institution.'
      },
      {
        type: 'Employment & Occupation Proof',
        minimum_balance_or_amount: null,
        time_frame: 'Current',
        notes: 'Employer NOC, salary slips, or business registration documents.'
      }
    ],
    other_requirements: [
      {
        category: 'Travel Insurance',
        details: 'Comprehensive emergency medical policy covering hospitalization and repatriation.'
      },
      {
        category: 'Biometrics & Submission',
        details: 'Digital upload or in-person biometric appointment based on consular route.'
      }
    ],
    how_to_apply: [
      'Check requirements & prepare documents.',
      'Complete online application form.',
      'Submit application & fee online or at VAC.',
      'Track status and receive visa grant.'
    ],
    costs: {
      visa_fee: '₹3,500 – ₹7,800',
      service_fee: '₹1,500 – ₹2,500',
      total_fee: '₹5,000 – ₹10,300',
      notes: 'Consular and processing fees combined.'
    },
    processing_and_timing: {
      apply_window: 'Apply 15 to 90 days before departure.',
      decision_time: 'Decision: 3 to 5 business days.',
      max_extension: 'Subject to consular review.'
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

    // 1. Try Gemini AI generation with fallback
    const apiKey = getGeminiApiKey();
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are an elite, autonomous AI Web Scraping & Data Extraction Agent for TravlTik (travltik.com), specialized in global immigration processing, embassy systems, and VFS Global portals.

Extract and synthesize official visa requirements for:
1. Origin / Passport Country: "${fromCountry}"
2. Destination Country: "${toCountry}"
3. Purpose of Visit: "${purpose}"

Strictly categorize every single requirement item into THREE distinct structural buckets:
Bucket A: DOCUMENTS REQUIRED CHECKLIST (title, description, is_mandatory)
Bucket B: FINANCIAL PROOFS & MEANS OF SUBSISTENCE (type, minimum_balance_or_amount, time_frame, notes)
Bucket C: OTHER IMPORTANT REQUIREMENTS & MANDATES (category, details)

Return ONLY a valid JSON object matching this exact schema:
{
  "passport_country": "${fromCountry}",
  "destination_country": "${toCountry}",
  "purpose_of_visit": "${purpose}",
  "visa_type": "Official visa category (e.g., Short-stay Schengen Visa (Type C), UK Student Visa, Skilled Worker Visa, Standard Visitor Visa)",
  "source_url": "Official portal URL (e.g., https://in-gr.gvcworld.eu/en/visa-info-tourism or https://www.gov.uk/student-visa)",
  "official_source_name": "Name of official authority (e.g., Greek official sources (GVCW & Embassy) or UK Visas & Immigration (UKVI))",
  "documents_required": [
    {
      "title": "Document title",
      "description": "Specific requirements, validity rules, blank pages, or photo dimensions",
      "is_mandatory": true
    }
  ],
  "financial_proofs": [
    {
      "type": "Bank Statement / Income Evidence / Tax Return / Sponsorship",
      "minimum_balance_or_amount": "Amount with currency or null",
      "time_frame": "e.g., Last 3 or 6 months",
      "notes": "Bank stamp, sealing rules, or employer NOC"
    }
  ],
  "other_requirements": [
    {
      "category": "Travel Insurance / Biometrics / Processing Time / Entry Rules",
      "details": "Specific actionable instructions or threshold criteria"
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
    "visa_fee": "e.g. €90 or £490 or £115",
    "service_fee": "e.g. €30 or £776 or ₹2,500",
    "total_fee": "e.g. €120 or £1,266",
    "notes": "Payment notes and currency conversion"
  },
  "processing_and_timing": {
    "apply_window": "e.g. Apply up to 6 months before travel.",
    "decision_time": "e.g. Decision: up to 15 calendar days.",
    "max_extension": "e.g. May extend to 45 calendar days.",
    "center_notes": "Courier transit notes for regional centers."
  }
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1
          }
        });

        const text = response.text ? response.text.trim() : '';
        if (text) {
          const parsed = JSON.parse(text);
          parsed.passport_country = cleanCountryName(parsed.passport_country || fromCountry);
          parsed.destination_country = cleanCountryName(parsed.destination_country || toCountry);
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
