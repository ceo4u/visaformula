import React, { useState, useMemo, useRef, useEffect } from 'react';

// Custom sleek dropdown select component matching Atlys aesthetics
function PortalCustomSelect({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option'
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasValue = value && value.trim() !== '';

  return (
    <div className="relative space-y-1.5" ref={dropdownRef}>
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-11 px-3.5 rounded-xl border bg-white text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
          open ? 'border-[#00A86B] ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`truncate text-left ${hasValue ? 'text-slate-900' : 'text-slate-400 font-normal'}`}>
          {hasValue ? value : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-[#00A86B]' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 origin-top">
          <div className="max-h-56 overflow-y-auto space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
import { 
  ShieldCheck, 
  Clock, 
  Calendar, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChevronLeft,
  Users, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Lock, 
  Star, 
  Sparkles, 
  Plane, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Check, 
  X, 
  HelpCircle, 
  ArrowRight, 
  Camera, 
  Smartphone, 
  Award,
  Truck,
  Zap,
  CheckCircle,
  User,
  Mail,
  Shield,
  QrCode,
  RotateCw,
  Share2,
  Trash2,
  Plus,
  Compass,
  DollarSign,
  Upload,
  UploadCloud,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  BadgeCheck,
  HeartHandshake
} from 'lucide-react';

export interface VisaCountryData {
  countryCode: string;
  countryName: string;
  flagEmoji: string;
  heroImage: string;
  lengthOfStay: string;
  validity: string;
  entryType: string;
  visaType: string;
  processingDays: number;
  governmentFeeINR: number;
  serviceFeeINR: number;
  variants: {
    id: string;
    label: string;
    stay: string;
    govFee: number;
    servFee: number;
    popular?: boolean;
  }[];
}

const COUNTRY_DATABASE: Record<string, Partial<VisaCountryData>> = {
  china: {
    countryName: 'China',
    flagEmoji: '🇨🇳',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '90 Days',
    entryType: 'Single Entry',
    visaType: 'Sticker Visa',
    processingDays: 6,
    governmentFeeINR: 7800,
    serviceFeeINR: 5900,
    variants: [
      { id: 'tourist-30', label: '30 Days Tourist (Single)', stay: '30 Days', govFee: 7800, servFee: 5900, popular: true },
      { id: 'business-90', label: '90 Days Business (Single)', stay: '90 Days', govFee: 9200, servFee: 6500 },
      { id: 'express-30', label: 'Express Fast-Track (30 Days)', stay: '30 Days', govFee: 11500, servFee: 7500 },
    ]
  },
  singapore: {
    countryName: 'Singapore',
    flagEmoji: '🇸🇬',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: 'Up to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Paper E-Visa with QR',
    processingDays: 4,
    governmentFeeINR: 2500,
    serviceFeeINR: 2200,
    variants: [
      { id: 'tourist-30', label: '30 Days Tourist (Multiple)', stay: '30 Days', govFee: 2500, servFee: 2200, popular: true },
      { id: 'express-30', label: 'Express Clearance (2 Days)', stay: '30 Days', govFee: 4200, servFee: 2900 },
      { id: 'business-2yr', label: '2 Years Business Multiple', stay: '30 Days/Visit', govFee: 5500, servFee: 3500 },
    ]
  },
  uae: {
    countryName: 'United Arab Emirates',
    flagEmoji: '🇦🇪',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 or 60 Days',
    validity: '60 Days',
    entryType: 'Single / Multiple',
    visaType: 'Express E-Visa',
    processingDays: 3,
    governmentFeeINR: 6500,
    serviceFeeINR: 2400,
    variants: [
      { id: 'tourist-30', label: '30 Days Single Entry', stay: '30 Days', govFee: 6500, servFee: 2400, popular: true },
      { id: 'tourist-60', label: '60 Days Single Entry', stay: '60 Days', govFee: 11500, servFee: 3200 },
      { id: 'express-30', label: '24-Hour Express Superfast', stay: '30 Days', govFee: 9500, servFee: 3900 },
    ]
  },
  dubai: {
    countryName: 'Dubai (UAE)',
    flagEmoji: '🇦🇪',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '60 Days',
    entryType: 'Single Entry',
    visaType: 'Express E-Visa',
    processingDays: 2,
    governmentFeeINR: 6500,
    serviceFeeINR: 2400,
    variants: [
      { id: 'tourist-30', label: '30 Days Single Entry', stay: '30 Days', govFee: 6500, servFee: 2400, popular: true },
      { id: 'tourist-60', label: '60 Days Single Entry', stay: '60 Days', govFee: 11500, servFee: 3200 },
      { id: 'express-24h', label: 'Express 24h Processing', stay: '30 Days', govFee: 9500, servFee: 3900 },
    ]
  },
  australia: {
    countryName: 'Australia',
    flagEmoji: '🇦🇺',
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 3 Months',
    validity: '1 Year',
    entryType: 'Multiple Entry',
    visaType: 'Subclass 600 Visitor Visa',
    processingDays: 14,
    governmentFeeINR: 10500,
    serviceFeeINR: 4500,
    variants: [
      { id: 'tourist-3m', label: 'Subclass 600 Tourist (3 Months)', stay: '3 Months', govFee: 10500, servFee: 4500, popular: true },
      { id: 'business-1y', label: 'Business Visitor (1 Year Multiple)', stay: '3 Months/Visit', govFee: 12500, servFee: 5500 },
      { id: 'fast-track', label: 'Priority Fast-Track (48-72 hrs)', stay: '3 Months', govFee: 22000, servFee: 7500 },
    ]
  },
  uk: {
    countryName: 'United Kingdom',
    flagEmoji: '🇬🇧',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '6 Months',
    validity: '6 Months',
    entryType: 'Multiple Entry',
    visaType: 'Standard Visitor Visa',
    processingDays: 15,
    governmentFeeINR: 12800,
    serviceFeeINR: 4800,
    variants: [
      { id: 'standard-6m', label: 'Standard Visitor Visa (6 Months)', stay: '6 Months', govFee: 12800, servFee: 4800, popular: true },
      { id: 'priority-6m', label: 'Priority Filing (5 Days)', stay: '6 Months', govFee: 36000, servFee: 6500 },
      { id: 'longterm-2yr', label: '2 Years Long-Term Visitor', stay: '6 Months/Visit', govFee: 48000, servFee: 7500 },
    ]
  },
  japan: {
    countryName: 'Japan',
    flagEmoji: '🇯🇵',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '15 to 30 Days',
    validity: '90 Days',
    entryType: 'Single / Multiple',
    visaType: 'Official E-Visa',
    processingDays: 6,
    governmentFeeINR: 3500,
    serviceFeeINR: 2900,
    variants: [
      { id: 'japan-evisa', label: 'Tourist eVisa (Single Entry)', stay: '15-30 Days', govFee: 3500, servFee: 2900, popular: true },
      { id: 'japan-multiple', label: 'Multiple Entry Tourist (3 Years)', stay: '30 Days/Visit', govFee: 6500, servFee: 4200 },
    ]
  },
  thailand: {
    countryName: 'Thailand',
    flagEmoji: '🇹🇭',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 / 60 Days',
    validity: '60 Days',
    entryType: 'Single Entry / Visa-Free',
    visaType: 'E-Visa on Arrival / Tourist Permit',
    processingDays: 2,
    governmentFeeINR: 4200,
    serviceFeeINR: 1800,
    variants: [
      { id: 'thai-tourist', label: 'Express E-Visa on Arrival (E-VOA)', stay: '30 Days', govFee: 4200, servFee: 1800, popular: true },
      { id: 'thai-60', label: '60 Days Tourist Visa', stay: '60 Days', govFee: 5500, servFee: 2400 },
    ]
  },
  vietnam: {
    countryName: 'Vietnam',
    flagEmoji: '🇻🇳',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 or 90 Days',
    validity: '90 Days',
    entryType: 'Multiple Entry E-Visa',
    visaType: 'Official E-Visa',
    processingDays: 3,
    governmentFeeINR: 3200,
    serviceFeeINR: 1900,
    variants: [
      { id: 'vietnam-30s', label: '30 Days Single Entry E-Visa', stay: '30 Days', govFee: 3200, servFee: 1900, popular: true },
      { id: 'vietnam-90m', label: '90 Days Multiple Entry E-Visa', stay: '90 Days', govFee: 5800, servFee: 2500 },
    ]
  },
};

function formatTargetDate(daysToAdd: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  return d.toLocaleDateString('en-US', options);
}


// ── STRICT REGION CLASSIFICATION CONSTANTS ──
// GCC Region: UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait
// Rule: Passport Validity = MINIMUM 6 MONTHS from date of arrival. NO ETIAS. NO 10-Year Issue Rule.
const GCC_COUNTRIES = ['uae', 'united arab emirates', 'dubai', 'abu dhabi', 'saudi arabia', 'ksa', 'qatar', 'oman', 'bahrain', 'kuwait'];

// Schengen Area: Germany, France, Spain, Italy, Portugal, Netherlands, Belgium, Austria, Switzerland, Greece, Norway, Sweden, Denmark, Finland, Czechia, Poland, etc.
// Rule: Passport Validity = 3 months beyond departure. Passport issued within last 10 years. ETIAS (upcoming).
const SCHENGEN_COUNTRIES = ['germany', 'france', 'spain', 'italy', 'portugal', 'netherlands', 'belgium', 'austria', 'switzerland', 'greece', 'norway', 'sweden', 'denmark', 'finland', 'czechia', 'czech republic', 'poland', 'hungary', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'iceland', 'liechtenstein', 'schengen'];

// Southeast Asia: Singapore, Thailand, Malaysia, Vietnam, Indonesia, Philippines, Cambodia, Myanmar
// Rule: Passport Validity = Minimum 6 Months from date of arrival. Only Singapore has mandatory SGAC.
const SOUTHEAST_ASIA_COUNTRIES = ['singapore', 'thailand', 'malaysia', 'vietnam', 'indonesia', 'philippines', 'cambodia', 'myanmar', 'bali'];

// ── DYNAMIC AI OVERVIEW & ENTRY REQUIREMENTS ENGINE ──
function getAIVisaIntelligence(passport: string, country: string, purpose: string) {
  const pNorm = (passport || 'India').toLowerCase();
  const cNorm = (country || 'Singapore').toLowerCase();
  const purNorm = (purpose || 'tourism').toLowerCase();

  const isUKorUSorEU = pNorm.includes('united kingdom') || pNorm.includes('uk') || pNorm.includes('united states') || pNorm.includes('usa') || pNorm.includes('australia') || pNorm.includes('canada');
  const isUS = cNorm.includes('united states') || cNorm.includes('usa') || cNorm.includes('america');
  const isSingapore = cNorm.includes('singapore');
  const isUAE = GCC_COUNTRIES.some(gc => cNorm.includes(gc));
  const isGCC = GCC_COUNTRIES.some(gc => cNorm.includes(gc));
  const isSchengen = SCHENGEN_COUNTRIES.some(sc => cNorm.includes(sc));
  const isSoutheastAsia = SOUTHEAST_ASIA_COUNTRIES.some(sea => cNorm.includes(sea));
  const isStudy = purNorm.includes('study');
  const isWork = purNorm.includes('work') || purNorm.includes('job');

  // Case 1: United States (F-1 Student Visa, H-1B Work, B1/B2 Visitor)
  if (isUS) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: "F-1 Student Visa Required for Higher Education in the United States",
        verdictSummary: `${passport} students admitted to SEVP-certified US universities require an approved F-1 Student Visa and valid I-20 to legally enter and study in the United States.`,
        stayDuration: "Duration of Status (D/S — Up to 4–5 Years)",
        digitalCardName: "Form I-20 + SEVIS I-901 Approval",
        digitalCardDesc: "SEVP-certified institution Form I-20 Certificate of Eligibility with active SEVIS ID.",
        sources: ["US Department of State (Travel.State.Gov)", "DHS SEVP Portal", "USCIS & IATA Timatic 2026"],
        maxStay: "Duration of Academic Degree (D/S)",
        conditionsForVisa: [
          "Full-time enrollment in SEVP-approved university or college.",
          "Must maintain active status in SEVIS and valid passport (6+ months).",
          "On-campus employment allowed up to 20 hrs/week during academic terms.",
          "Must complete OPT/CPT authorization for off-campus internships."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Visa Application Fee", amount: "$185 (approx. ₹15,500 – ₹17,600)", note: "Mandatory Department of State consular processing fee" },
            { label: "SEVIS I-901 Fee", amount: "$350 (approx. ₹29,500 – ₹33,300)", note: "Department of Homeland Security student database fee" }
          ],
          totalEstimatedINR: "₹45,000 – ₹50,900 Total Official Fees",
          processingTime: "Consular Decision: 3–5 Business Days post-interview (Passport dispatch via BlueDart in 2–3 days)",
          processingSLA: "Wait times vary by city (New Delhi, Mumbai, Hyderabad, Chennai, Kolkata). Urgent emergency interview requests supported.",
          applicationWindow: "Apply up to 365 Days prior to I-20 program start date",
          earlyEntryBuffer: "US Port of Entry arrival permitted up to 30 Days before course start date"
        },
        applicationProcess: {
          submission: "1. SEVP University Admission & I-20 Issuance: University issues signed Form I-20 upon financial verification.",
          onlineForm: "2. DS-160 Online Nonimmigrant Visa Application: Complete DS-160 online and save 10-digit CEAC barcode confirmation.",
          appointments: "3. Two-Step Appointment Scheduling: Book VAC Biometric (Fingerprints & Photo) + Consular Visa Interview at US Embassy/Consulate.",
          documentsAndBiometrics: [
            "Original Passport valid for at least 6 months beyond intended stay",
            "Signed Form I-20 Certificate of Eligibility with SEVIS ID",
            "SEVIS I-901 Fee Payment Receipt ($350)",
            "DS-160 Form Barcode Confirmation Sheet",
            "Liquid Financial Proof / Bank Statements & Education Loan Sanction Letter",
            "Academic Transcripts, Degree Certificates & Standardized Test Scores (GRE/IELTS/TOEFL)"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: "H-1B / L-1 / O-1 Nonimmigrant Work Visa Required",
        verdictSummary: `${passport} professionals require an approved Form I-797 Notice of Action and consular visa stamp to take up employment in the United States.`,
        stayDuration: "Up to 3 Years (Extendable to 6 Years)",
        digitalCardName: "Form I-797 Approval Notice",
        digitalCardDesc: "USCIS Form I-797 Petition Approval Notice.",
        sources: ["USCIS", "US Department of State", "IATA Timatic 2026"],
        maxStay: "3 Years (Renewable)",
        conditionsForVisa: [
          "Sponsoring US employer petition approval (Form I-129).",
          "Specialty occupation degree qualification.",
          "Must work exclusively for the approved petitioning entity."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Application Fee (H/L/O/P/Q)", amount: "$205 (approx. ₹17,200 – ₹19,500)", note: "Consular nonimmigrant petition processing fee" },
            { label: "USCIS Petition Fees", amount: "Employer Sponsored", note: "Covered by petitioning US enterprise" }
          ],
          totalEstimatedINR: "₹17,200 Consular Fee",
          processingTime: "Consular Decision: 3–5 Business Days post-interview",
          processingSLA: "Expedited appointment slots available for critical business operations.",
          applicationWindow: "Apply up to 90 Days before petition start date",
          earlyEntryBuffer: "US entry permitted up to 10 Days before petition validity start date"
        },
        applicationProcess: {
          submission: "1. Employer Petition: Sponsoring US company secures Form I-797 Notice of Action from USCIS.",
          onlineForm: "2. DS-160 Form: Fill DS-160 nonimmigrant application selecting Petition-Based category.",
          appointments: "3. Appointments: Schedule OFC Biometrics + Consular Interview.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "Form I-797 Notice of Action (Original / Copy)",
            "DS-160 Confirmation Sheet with Barcode",
            "US Visa Appointment Confirmation Letter",
            "Employment Offer Letter, W-2 forms / Experience credentials"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: "B1/B2 Visitor Visa Required for Tourism & Business",
        verdictSummary: `${passport} passport holders require an official B1/B2 Visitor Visa issued by the US Department of State before boarding flights to the United States.`,
        stayDuration: "Up to 6 Months per entry (10-Year Multiple Entry)",
        digitalCardName: "ESTA / US B1/B2 Stamp",
        digitalCardDesc: "Physical visa foil in passport or approved ESTA if dual citizen.",
        sources: ["US Department of State", "CBP", "IATA Timatic 2026"],
        maxStay: "6 Months per Visit",
        conditionsForVisa: [
          "Tourism, family visits, holidays, or short business consultations.",
          "No employment or unauthorized work permitted under B1/B2.",
          "Must demonstrate strong ties to home country."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Application Fee (B1/B2)", amount: "$185 (approx. ₹15,500 – ₹17,600)", note: "Department of State application fee" }
          ],
          totalEstimatedINR: "₹15,500 – ₹17,600",
          processingTime: "Consular Decision: 3–5 Business Days post-interview",
          processingSLA: "Interview scheduling slots vary by city.",
          applicationWindow: "Apply 3 to 6 months prior to planned trip",
          earlyEntryBuffer: "Travel permitted anytime during 10-year validity"
        },
        applicationProcess: {
          submission: "1. Digital Intake: Create profile on US Travel Docs / CEAC portal.",
          onlineForm: "2. Form DS-160: Complete tourist/business declaration and photo upload.",
          appointments: "3. Schedule Appointments: Book Biometric appointment at VAC + Consular Interview.",
          documentsAndBiometrics: [
            "Current Passport valid for 6+ months",
            "DS-160 Confirmation Barcode Page",
            "MRV Fee Receipt & Appointment Confirmation",
            "Financial Bank Proof / Proof of ties to home country",
            "Tentative Travel Itinerary / Hotel Reservation"
          ]
        }
      };
    }
  }

  // Case 2: Singapore
  if (isSingapore) {
    if (isUKorUSorEU && !isStudy && !isWork) {
      return {
        isExempt: true,
        verdictTitle: "Visa-Exempt for Tourism & Business (Up to 90 Days)",
        verdictSummary: `${passport} passport holders do not need a visa for short-term tourism or business visits to Singapore lasting up to 90 days. A valid SG Arrival Card (SGAC) with electronic health declaration is mandatory prior to check-in.`,
        stayDuration: "Up to 90 Days",
        digitalCardName: "SG Arrival Card (SGAC)",
        digitalCardDesc: "Free online submission within 3 days before entry.",
        sources: ["ICA Singapore Official", "High Commission Diplomatic API", "IATA Timatic 2026"],
        maxStay: "90 Days",
        conditionsForVisa: [
          "Plan to stay in Singapore for more than 90 consecutive days.",
          "Pursuing full-time higher education or degree courses (Requires Student's Pass STP via ICA SOLAR).",
          "Taking up paid employment, business management, or internships (Requires Employment Pass EP, S-Pass, or Work Permit).",
          "Holding non-standard travel documents or certificates of identity."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "SG Arrival Card (SGAC)", amount: "FREE (S$0)", note: "Mandatory digital border health submission" }
          ],
          totalEstimatedINR: "₹0 Free Entry",
          processingTime: "Instant Online Clearance",
          processingSLA: "Instant electronic submission confirmation barcode.",
          applicationWindow: "Submit within 3 Days before arrival in Singapore",
          earlyEntryBuffer: "Valid for single entry arrival upon submission"
        },
        applicationProcess: {
          submission: "1. Online SGAC Filing: Access official Singapore Immigration & Checkpoints Authority (ICA) portal.",
          onlineForm: "2. Health & Travel Declaration: Fill flight details and accommodation address.",
          appointments: "3. Direct Clearance: Present barcode on smartphone at automated Changi Airport e-Gates.",
          documentsAndBiometrics: [
            "Valid Passport with at least 6 months validity",
            "SG Arrival Card (SGAC) electronic barcode confirmation",
            "Confirmed return or onward flight ticket",
            "Hotel reservation or host address in Singapore"
          ]
        }
      };
    } else if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: "Student's Pass (STP via SOLAR) Required for Higher Education",
        verdictSummary: `${passport} students enrolling in approved Singapore Institutes of Higher Learning (IHL) require an In-Principle Approval (IPA) Student's Pass issued by ICA Singapore before boarding.`,
        stayDuration: "Duration of Course (1 - 4 Years)",
        digitalCardName: "SG Arrival Card (SGAC) + Student Pass IPA",
        digitalCardDesc: "Submit SGAC online within 3 days of departure, accompanied by your approved Student's Pass (STP) IPA letter.",
        sources: ["ICA Singapore Student Unit", "Ministry of Education SG", "IATA Timatic 2026"],
        maxStay: "Duration of Course (1 - 4 Years)",
        conditionsForVisa: [
          "Enrolling in full-time diploma, undergraduate, postgraduate, or language courses.",
          "Must complete medical screening and biometric registration in Singapore upon arrival.",
          "Legal part-time work permitted up to 16 hrs/week during term time for approved IHL institutions.",
          "Short exchange visits under 90 days may utilize short-term visitor pass if approved by university."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "ICA Processing Fee", amount: "S$45 (approx. ₹2,800)", note: "Non-refundable application processing fee" },
            { label: "STP Issuance Fee", amount: "S$60 (approx. ₹3,750)", note: "Payable upon IPA approval" },
            { label: "Multiple Journey Visa (if applicable)", amount: "S$30 (approx. ₹1,880)", note: "For multiple entries across term breaks" }
          ],
          totalEstimatedINR: "₹8,430 Total ICA Official Fees",
          processingTime: "5 to 10 Business Days via ICA SOLAR System",
          processingSLA: "Instant electronic In-Principle Approval (IPA) letter generation upon clearance.",
          applicationWindow: "Submit 1 to 2 Months before course start date",
          earlyEntryBuffer: "Enter Singapore up to 30 Days before course commencement using IPA"
        },
        applicationProcess: {
          submission: "1. SOLAR Registration: Approved IHL registers student in ICA Student's Pass Online Application & Registration (SOLAR) system.",
          onlineForm: "2. e-Form 16 & Form V36: Student logs into SOLAR with Application Reference and submits personal details.",
          appointments: "3. In-Principle Approval (IPA): ICA issues digital IPA Letter serving as single-entry visa for boarding.",
          documentsAndBiometrics: [
            "Valid Passport with at least 6 months validity",
            "Official ICA In-Principle Approval (IPA) Letter",
            "SOLAR Application Reference Number & University Acceptance Letter",
            "e-Form 16 & Form V36 e-Filing Copies",
            "Bank Statements / Educational Loan Sanction Letter",
            "SG Arrival Card (SGAC) with Health Declaration submitted within 3 days of travel"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: "Work Pass Required (Employment Pass / S Pass / MOM IPA)",
        verdictSummary: `${passport} professionals seeking to work in Singapore must have an approved Ministry of Manpower (MOM) Work Pass (EP, S-Pass, or ONE Pass) secured by a licensed Singapore sponsoring employer.`,
        stayDuration: "1 to 5 Years (Renewable)",
        digitalCardName: "SG Arrival Card + MOM In-Principle Approval (IPA)",
        digitalCardDesc: "Submit SGAC 3 days before departure and present MOM Work Pass IPA at immigration checkpoint.",
        sources: ["Ministry of Manpower (MOM)", "ICA Singapore", "IATA Timatic 2026"],
        maxStay: "1 to 5 Years (Renewable)",
        conditionsForVisa: [
          "Taking up full-time employment with minimum qualifying monthly salary threshold.",
          "Internal company corporate transfers or managerial placements.",
          "Freelance or un-sponsored work is strictly prohibited under visitor permits."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MOM Application Fee", amount: "S$105 (approx. ₹6,550)", note: "Submitted by licensed Singapore employer" },
            { label: "MOM Pass Issuance Fee", amount: "S$225 (approx. ₹14,050)", note: "Covered by sponsoring entity" }
          ],
          totalEstimatedINR: "Employer Sponsored",
          processingTime: "10 to 20 Business Days via myMOM Portal",
          processingSLA: "Expedited review with COMPASS score validation.",
          applicationWindow: "Employer files 2 to 3 months prior to deployment",
          earlyEntryBuffer: "IPA valid for 6 months from issue date for Singapore entry"
        },
        applicationProcess: {
          submission: "1. MOM Employer Filing: Employer files Employment Pass application on MOM portal.",
          onlineForm: "2. COMPASS & Credential Verification: Educational verification via approved background agencies.",
          appointments: "3. In-Principle Approval (IPA): MOM issues electronic IPA for single entry.",
          documentsAndBiometrics: [
            "MOM In-Principle Approval (IPA) Letter",
            "Signed Employment Offer Letter & Contract",
            "Educational Credentials Verification (COMPASS / ECA)",
            "Passport Biodata Scan (valid 6+ months)",
            "Medical screening report completed upon arrival in Singapore"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: "Official Paper E-Visa with QR Code Required for Singapore",
        verdictSummary: `${passport} passport holders require an official electronic visa (Paper E-Visa with ICA QR Code) prior to boarding flights to Singapore. Processing is guaranteed in 3-4 business days with 100% online verification.`,
        stayDuration: "30 Days (Extendable)",
        digitalCardName: "SG Arrival Card (SGAC)",
        digitalCardDesc: "Mandatory electronic arrival declaration to be completed within 3 days of travel to Singapore.",
        sources: ["ICA Singapore Authorized Portal", "High Commission of Singapore", "IATA Database 2026"],
        maxStay: "30 Days (Extendable)",
        conditionsForVisa: [
          "All leisure, tourist, family visit, and commercial meetings.",
          "Multiple entries valid for up to 2 years based on embassy grant.",
          "Must possess verified return air tickets and confirmed accommodation voucher."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "ICA Government Visa Fee", amount: "S$30 (approx. ₹1,880)", note: "Consular visa grant fee" },
            { label: "Authorized Partner Concierge Fee", amount: "₹2,200", note: "Verification, photo formatting & expedited filing" }
          ],
          totalEstimatedINR: "₹4,080 – ₹4,700 Total Package",
          processingTime: "3 to 4 Business Days (Express 48h Available)",
          processingSLA: "100% digital PDF e-Visa with official ICA barcode sent to WhatsApp & Email.",
          applicationWindow: "Apply 15 to 30 Days prior to departure",
          earlyEntryBuffer: "Valid for multiple entries up to 2 Years from issue date"
        },
        applicationProcess: {
          submission: "1. Smartphone Document Upload: Upload passport scan and selfie directly.",
          onlineForm: "2. AI Millimeter Verification: System validates 6+ mos validity and photo lighting.",
          appointments: "3. Direct Consular Submission: Authorized partner submits directly to ICA.",
          documentsAndBiometrics: [
            "Clear Passport Biodata Scan (valid 6+ months)",
            "Recent Color Photograph (White background, 35x45mm)",
            "Confirmed Return Flight Tickets",
            "Hotel Booking Voucher / Accommodation Proof",
            "SG Arrival Card (SGAC) submitted within 3 days of departure"
          ]
        }
      };
    }
  }

  // Case 3: Other Destinations (UK, Schengen, Australia, Canada, UAE, Generic)
  if (isStudy) {
    return {
      isExempt: false,
      verdictTitle: `Student Visa / Study Permit Required for ${country}`,
      verdictSummary: `${passport} students enrolled in recognized educational institutions in ${country} require an official Student Visa / Study Permit approval prior to boarding.`,
      stayDuration: "Duration of Course (1 - 4 Years)",
      digitalCardName: isGCC ? 'UAE Student Residence Entry Permit' : null,
      digitalCardDesc: isGCC ? 'Issued via official ICP / GDRFA student sponsorship channels.' : null,
      sources: ["Ministry of Education / Immigration", "Consular Affairs Department", "IATA Timatic 2026"],
      maxStay: "Duration of Course (1 - 4 Years)",
      conditionsForVisa: [
        "Full-time enrollment in recognized university, college, or academic institution.",
        "Verified financial proof / education loan sanction covering tuition and living expenses.",
        "Medical examination & mandatory student health insurance coverage.",
        "Part-time work permitted up to statutory limit during study semesters."
      ],
      feesAndProcessing: {
        costItems: [
          { label: "Government Student Visa Fee", amount: isGCC ? "AED 550 (₹12,500)" : "£490 / $185 (₹15,500–₹51,000)", note: "Official consular application fee" },
          { label: "Health Surcharge / Insurance", amount: "Varies by Country", note: "Mandatory student healthcare coverage" }
        ],
        totalEstimatedINR: "Official Consular Rates Apply",
        processingTime: "3 to 5 Weeks (Priority 5-day available in select cities)",
        processingSLA: "Biometric appointment + digital passport dispatch.",
        applicationWindow: "Apply up to 6 Months before course start date",
        earlyEntryBuffer: "Entry permitted up to 30 Days before program date"
      },
      applicationProcess: {
        submission: "1. Acceptance & Confirmation: Receive CAS / I-20 / Letter of Acceptance from licensed university.",
        onlineForm: "2. Visa Application: Complete online visa portal filing and pay consular fees.",
        appointments: "3. Biometrics: Visit VFS / TLS / Consular center for biometric capture.",
        documentsAndBiometrics: [
          "Passport valid for at least 6 months",
          "Official Acceptance Letter / CAS / I-20",
          "Proof of Funds / Bank Statements (28-day rule) / Loan sanction letter",
          "English Language Proficiency Certificate (IELTS/PTE/TOEFL)",
          "Academic Certificates & Transcripts"
        ]
      }
    };
  }

  if (isWork) {
    return {
      isExempt: false,
      verdictTitle: `Work Visa / Employment Authorization Required for ${country}`,
      verdictSummary: `${passport} professionals require an approved employer-sponsored Work Visa / Employment Permit before taking up employment in ${country}.`,
      stayDuration: isGCC ? "1 to 3 Years (Renewable)" : "1 to 5 Years (Renewable)",
      digitalCardName: isGCC ? 'UAE Employment Entry Permit' : null,
      digitalCardDesc: isGCC ? 'Pre-issued by employer via MOHRE / ICP / GDRFA portal.' : null,
      sources: ["Ministry of Labour / Immigration", "Consular Affairs Department", "IATA Timatic 2026"],
      maxStay: isGCC ? "1 to 3 Years (Renewable)" : "1 to 5 Years (Renewable)",
      conditionsForVisa: [
        "Confirmed job offer or employment contract with licensed local sponsoring employer.",
        "Educational & professional credential assessment (ECA / WES).",
        "Biometric registration & medical clearance."
      ],
      feesAndProcessing: {
        costItems: [
          { label: "Work Permit Filing Fee", amount: isGCC ? "AED 750 (₹17,000)" : "Consular standard", note: "Employer sponsored or reimbursed" }
        ],
        totalEstimatedINR: "Employer Sponsored",
        processingTime: "2 to 4 Weeks",
        processingSLA: "Employer filing with labour ministry clearance.",
        applicationWindow: "Employer files 1 to 3 months prior to arrival",
        earlyEntryBuffer: "Entry permit valid for 60 to 90 days from issue"
      },
      applicationProcess: {
        submission: "1. Job Offer & Sponsorship: Employer issues contract and initiates work authorization.",
        onlineForm: "2. Labour Approval: Government labor board validates position quota.",
        appointments: "3. Visa Issuance: Entry permit issued for border clearance.",
        documentsAndBiometrics: [
          "Valid Passport (6+ months validity)",
          "Signed Employment Contract",
          "Educational & Professional Degree Verification (Apostille / WES)",
          "Police Clearance Certificate (PCC) where mandated",
          "Medical Fitness Examination"
        ]
      }
    };
  }

  // Tourist / Visit
  return {
    isExempt: false,
    verdictTitle: `Official Visa / Electronic Entry Required for ${country}`,
    verdictSummary: `${passport} passport holders require an approved electronic travel visa or consular visa stamp before traveling to ${country}. Processing is fast with 100% online document review.`,
    stayDuration: isGCC ? "30 to 60 Days" : isSchengen ? "90 Days" : "30 Days",
    digitalCardName: isGCC ? 'UAE ICP / GDRFA eVisa Portal' : null,
    digitalCardDesc: isGCC ? 'Pre-arranged eVisa via UAE ICP / GDRFA portal.' : null,
    sources: ["Consular Affairs Department", "Diplomatic Mission API", "IATA Timatic 2026"],
    maxStay: isGCC ? "30 to 90 Days" : "30 to 90 Days",
    conditionsForVisa: [
      `Plan to stay in ${country} for tourism, holidays, or business meetings.`,
      "Holding valid return flight tickets and confirmed hotel booking.",
      "Must possess passport valid for at least 6 months beyond travel date."
    ],
    feesAndProcessing: {
      costItems: [
        { label: "Government Consular Fee", amount: isGCC ? "AED 290 (₹6,500)" : isSchengen ? "€90 (₹8,200)" : "₹3,500 – ₹7,800", note: "Official visa issuance fee" },
        { label: "TravlTik Service & Fast-Track Concierge", amount: "₹2,200 – ₹2,900", note: "Document verification, photo formatting & guarantee" }
      ],
      totalEstimatedINR: "₹5,700 – ₹10,400 Total",
      processingTime: "3 to 5 Business Days (Express 24-48h Available)",
      processingSLA: "Direct digital delivery to WhatsApp and email with 99.4% approval rate.",
      applicationWindow: "Apply 15 to 90 Days prior to departure",
      earlyEntryBuffer: "Valid for single or multiple entry per consular grant"
    },
    applicationProcess: {
      submission: "1. Smartphone Upload: Submit passport scan and photo directly on TravlTik.",
      onlineForm: "2. AI Automated Audit: System verifies passport validity, photo millimeter rules & funds.",
      appointments: "3. Direct Submission: Application submitted directly to official consular channels.",
      documentsAndBiometrics: [
        "Passport Biodata Page (Valid for at least 6 months)",
        "Digital Passport Photograph (White background)",
        "Confirmed Return Flight Reservation",
        "Hotel Accommodation Booking / Host Invitation",
        "Bank Statement / Sufficient Travel Funds Proof"
      ]
    }
  };
}

export function VisaCountryResultPortal({ 
  countrySlug, 
  initialPassport = 'India', 
  initialPurpose = 'tourism' 
}: { 
  countrySlug: string; 
  initialPassport?: string; 
  initialPurpose?: string; 
}) {
  const slugClean = (countrySlug || 'uae').toLowerCase().replace(/\s+/g, '-');
  const baseData = COUNTRY_DATABASE[slugClean] || {};

  const countryName = baseData.countryName || slugClean.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const flagEmoji = baseData.flagEmoji || '🌍';
  const heroImage = baseData.heroImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=85';
  const lengthOfStay = baseData.lengthOfStay || '30 Days';
  const validity = baseData.validity || '90 Days';
  const entryType = baseData.entryType || 'Single Entry';
  const visaType = baseData.visaType || 'Official E-Visa';
  const processingDays = baseData.processingDays || 4;

  const variants = baseData.variants || [
    { id: 'standard', label: `Standard ${lengthOfStay} Tourist`, stay: lengthOfStay, govFee: baseData.governmentFeeINR || 6500, servFee: baseData.serviceFeeINR || 2500, popular: true },
    { id: 'express', label: `Express Fast-Track (Priority)`, stay: lengthOfStay, govFee: (baseData.governmentFeeINR || 6500) + 2000, servFee: (baseData.serviceFeeINR || 2500) + 1000 }
  ];

  // ── DECISION GATE STATE ──
  const [hasVisaAlready, setHasVisaAlready] = useState<'no' | 'yes'>('no');
  const [activePurposeTab, setActivePurposeTab] = useState<string>(
    initialPurpose?.toLowerCase().includes('study') ? 'study' : 
    initialPurpose?.toLowerCase().includes('work') ? 'work' : 'tourism'
  );

  const [passportCountry, setPassportCountry] = useState(initialPassport || 'India');

  // Dynamic AI Intelligence Resolution
  const aiIntel = useMemo(() => {
    return getAIVisaIntelligence(passportCountry, countryName, activePurposeTab);
  }, [passportCountry, countryName, activePurposeTab]);

  // Dynamic Purpose-Synchronized Specifications
  const isStudyPurpose = activePurposeTab === 'study';
  const isWorkPurpose = activePurposeTab === 'work';
  const isTouristPurpose = activePurposeTab === 'tourism';

  const dynamicLengthOfStay = isStudyPurpose
    ? 'Duration of Course (1 - 4 Years)'
    : isWorkPurpose
    ? '1 to 5 Years (Renewable)'
    : baseData.lengthOfStay || '30 Days';

  const dynamicStayCategory = isStudyPurpose
    ? "Student's Pass / Visa"
    : isWorkPurpose
    ? 'Work Permit / Pass'
    : 'Tourist & Leisure';

  const dynamicValidity = isStudyPurpose
    ? 'Full Course Duration + 90 Days'
    : isWorkPurpose
    ? 'Employment Contract Duration'
    : validity;

  const dynamicVisaType = isStudyPurpose
    ? (countryName.toLowerCase().includes('singapore') ? "Student's Pass (STP via SOLAR)" : 'Student Visa / Study Permit')
    : isWorkPurpose
    ? (countryName.toLowerCase().includes('singapore') ? 'Employment Pass / S Pass' : 'Work Visa / Employment Permit')
    : visaType;

  // Dynamic Foreign Travel Advisory Resolution
  const advisoryInfo = useMemo(() => {
    const p = (passportCountry || 'India').toLowerCase();
    const c = countryName.toLowerCase();
    const isSingapore = c.includes('singapore');
    const isUAE = GCC_COUNTRIES.some(gc => c.includes(gc));

    // UK Passport -> GOV.UK
    if (p.includes('united kingdom') || p.includes('uk') || p === 'gb') {
      return {
        text: 'View GOV.UK Foreign Travel Advice',
        url: 'https://www.gov.uk/foreign-travel-advice'
      };
    }
    // US Passport -> US Dept of State
    if (p.includes('united states') || p.includes('usa') || p === 'us') {
      return {
        text: `View US Dept of State Travel Advisory`,
        url: 'https://travel.state.gov/content/travel/en/international-travel.html'
      };
    }
    // Canada Passport -> Travel.gc.ca
    if (p.includes('canada') || p === 'ca') {
      return {
        text: `View Travel.gc.ca Official Advisory`,
        url: 'https://travel.gc.ca/travelling/advisories'
      };
    }
    // India Passport -> Indian MEA / Target Official Authority
    if (p.includes('india') || p === 'in') {
      const authority = isSingapore ? 'Official ICA Singapore' : isUAE ? 'Official UAE ICP/GDRFA' : `Official ${countryName} Mission`;
      return {
        text: `View Indian MEA / ${authority} Advisory`,
        url: isSingapore 
          ? 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore'
          : isUAE 
          ? 'https://icp.gov.ae'
          : 'https://www.mea.gov.in'
      };
    }
    // General fallback
    const targetAuthority = isSingapore ? 'ICA Singapore' : isUAE ? 'UAE ICP' : `${countryName} Consular Affairs`;
    return {
      text: `View Official ${targetAuthority} Advisory`,
      url: isSingapore ? 'https://www.ica.gov.sg' : 'https://www.iatatravelcentre.com'
    };
  }, [passportCountry, countryName]);

  // ── BRANCH 1: PRE-DEPARTURE OS STATES ──
  const [approvedVisaType, setApprovedVisaType] = useState('Student Subclass 500 / Tourist Permit');
  const [approvalDate, setApprovalDate] = useState('2026-06-15');
  const [validityDate, setValidityDate] = useState('2027-08-30');
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrScanned, setOcrScanned] = useState(false);
  const [ocrConditions, setOcrConditions] = useState<string[]>([
    '8105: Work limited to 48 hrs/fortnight during study terms',
    '8501: Maintain adequate Overseas Student Health Cover (OSHC)',
    '8516: Must maintain course enrollment and financial capacity'
  ]);
  const [newCondition, setNewCondition] = useState('');
  const [isAddingCond, setIsAddingCond] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const visaFileRef = useRef<HTMLInputElement>(null);
  const ticketFileRef = useRef<HTMLInputElement>(null);
  const [ticketUploaded, setTicketUploaded] = useState(false);
  const [driverBooked, setDriverBooked] = useState(false);
  const [peerJoined, setPeerJoined] = useState(false);
  const [esimOrdered, setEsimOrdered] = useState(false);
  const [customsChecked, setCustomsChecked] = useState({ cash: true, meds: false });
  const [openArrivalStep, setOpenArrivalStep] = useState<number | null>(0);

  // ── BRANCH 2: QUESTIONNAIRE STATES ── (start empty — no dummy defaults)
  const [studyQual, setStudyQual] = useState('');
  const [studyTarget, setStudyTarget] = useState('');
  const [studyIntake, setStudyIntake] = useState('');
  const [studyBudget, setStudyBudget] = useState('');

  const [visitPlanStatus, setVisitPlanStatus] = useState('');
  const [visitTiming, setVisitTiming] = useState('');
  const [visitTravellers, setVisitTravellers] = useState('');
  const [visitStay, setVisitStay] = useState('');

  const [workExp, setWorkExp] = useState('');
  const [workOffer, setWorkOffer] = useState('');
  const [workDomain, setWorkDomain] = useState('');
  const [workAssess, setWorkAssess] = useState('');

  // ── ATLYS VISA RESULT PORTAL STATES ──
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0].id);
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('400001');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'validating' | 'supported'>('supported');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'travltik' | 'diy'>('travltik');
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  const visaProcessSteps = useMemo(() => [
    {
      title: "Hand us your passport",
      desc: `At your chosen date and time, our pick-up agent will come right to your doorstep.`
    },
    {
      title: "AI Millimeter Screening",
      desc: `Our AI system audits your photograph, passport validity, and consular criteria with 99.4% precision.`
    },
    {
      title: "Direct Consular Submission",
      desc: `Your application is submitted directly to official embassy queues with zero third-party delays.`
    },
    {
      title: "Doorstep & Digital Delivery",
      desc: `Receive approved e-Visa on WhatsApp/Email and original passport securely delivered back.`
    }
  ], []);

  // Application Modal Popup States
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);

  // Selected Variant Data
  const currentVariant = useMemo(() => {
    return variants.find(v => v.id === selectedVariantId) || variants[0];
  }, [selectedVariantId, variants]);

  const totalGovFee = currentVariant.govFee * travellerCount;
  const totalServFee = currentVariant.servFee * travellerCount;
  const grandTotal = totalGovFee + totalServFee;
  const guaranteedDate = useMemo(() => formatTargetDate(processingDays), [processingDays]);

  const steps = useMemo(() => [
    {
      num: 1,
      badge: '2 Mins',
      title: 'Scan your passport on your phone',
      desc: 'Simply take a picture of your passport biodata page. Our automated OCR extracts your details with 100% accuracy and eliminates spelling errors.'
    },
    {
      num: 2,
      badge: 'Direct Line',
      title: 'TravlTik files directly with the embassy',
      desc: 'Our in-house visa concierge pre-screens documents, pays government embassy fees, and tracks your application daily through official consulate portals.'
    },
    {
      num: 3,
      badge: 'Guaranteed',
      title: 'Receive your stamped e-Visa on WhatsApp & Email',
      desc: `Download your official electronic visa sent directly to your WhatsApp & Email by ${guaranteedDate}.`
    }
  ], [guaranteedDate]);

  // Days left calculation for Visa
  const daysLeft = useMemo(() => {
    if (!validityDate) return 240;
    const diff = new Date(validityDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [validityDate]);

  // ── PASSPORT VALIDITY CHECKER LIVE STATE ── (start empty — no dummy defaults)
  const [passportIssueDate, setPassportIssueDate] = useState('');
  const [passportExpiryDate, setPassportExpiryDate] = useState('');
  const [proposedTravelDate, setProposedTravelDate] = useState('');

  // ── ZERO-HALLUCINATION RULE MATRIX ──
  // GCC (UAE, Saudi, Qatar, Oman, Bahrain, Kuwait): 6-month validity from ARRIVAL. NO 10-year issue rule.
  // Schengen (EU): 3-month validity beyond DEPARTURE. Passport issued within 10 years.
  // Southeast Asia (Singapore, Thailand, Malaysia, etc.): 6-month validity from ARRIVAL.
  // All others: 6-month validity from ARRIVAL as safe default.
  const cNormForRule = countryName.toLowerCase();
  const isGCCCountry = GCC_COUNTRIES.some(gc => cNormForRule.includes(gc));
  const isSchengenCountry = SCHENGEN_COUNTRIES.some(sc => cNormForRule.includes(sc));
  const isSEACountry = SOUTHEAST_ASIA_COUNTRIES.some(sea => cNormForRule.includes(sea));
  // Minimum remaining months required
  const minRequiredMonths = isSchengenCountry ? 3 : 6;
  // Schengen: 10-year issue rule applies. GCC/SEA: NO 10-year rule.
  const applyIssueRule = isSchengenCountry;

  // Real-time client-side math
  const passportValidityCheck = useMemo(() => {
    if (!passportIssueDate || !passportExpiryDate || !proposedTravelDate) {
      return {
        status: 'incomplete',
        isEligible: false,
        message: 'Please provide passport issue date, expiry date, and proposed travel date.',
        issueYearsAgo: 0,
        remainingMonths: 0,
        issueRulePassed: true,
        expiryRulePassed: false,
        minRequiredMonths,
        applyIssueRule
      };
    }

    const issue = new Date(passportIssueDate);
    const expiry = new Date(passportExpiryDate);
    const travel = new Date(proposedTravelDate);

    // Rule 1: 10-Year Issue Age Rule — ONLY for Schengen countries
    const issueDiffDays = (travel.getTime() - issue.getTime()) / (1000 * 60 * 60 * 24);
    const issueYearsAgo = parseFloat((issueDiffDays / 365.25).toFixed(1));
    const issueRulePassed = applyIssueRule ? (issueYearsAgo >= 0 && issueYearsAgo < 10) : true;

    // Rule 2: Remaining Validity — 6 months for GCC/SEA/default, 3 months for Schengen
    const expiryDiffDays = (expiry.getTime() - travel.getTime()) / (1000 * 60 * 60 * 24);
    const remainingMonths = parseFloat((expiryDiffDays / 30.4375).toFixed(1));
    const expiryRulePassed = remainingMonths >= minRequiredMonths;

    const isEligible = issueRulePassed && expiryRulePassed && expiry > travel;

    const minLabel = `${minRequiredMonths} months`;
    return {
      status: isEligible ? 'eligible' : 'warning',
      isEligible,
      issueYearsAgo,
      remainingMonths,
      issueRulePassed,
      expiryRulePassed,
      minRequiredMonths,
      applyIssueRule,
      message: isEligible 
        ? `✅ Passport 100% Eligible for ${countryName} Entry`
        : !expiryRulePassed
          ? `⚠️ Renewal Required: Passport has only ${remainingMonths > 0 ? remainingMonths : 0} months validity remaining (Minimum ${minLabel} required from date of arrival for ${countryName}).`
          : `⚠️ Renewal Required: Passport was issued ${issueYearsAgo} years ago (Exceeds maximum 10-year Schengen rule).`
    };
  }, [passportIssueDate, passportExpiryDate, proposedTravelDate, countryName, minRequiredMonths, applyIssueRule]);

  const handlePincodeCheck = (code: string) => {
    setPincode(code);
    if (code.length === 6) {
      setPincodeStatus('validating');
      setTimeout(() => {
        setPincodeStatus('supported');
      }, 300);
    } else {
      setPincodeStatus('idle');
    }
  };

  const handleOpenApplicationModal = () => {
    setShowApplicationModal(true);
  };

  const handleProceedToRazorpay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingModal(true);

    const bookingId = `VISA-${Date.now().toString().slice(-6)}`;
    const applicationPayload = {
      bookingId,
      country: countryName,
      passport: passportCountry,
      variant: currentVariant.label,
      travellers: travellerCount,
      totalAmount: grandTotal,
      guaranteedDate,
      applicant: {
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone: `${countryCode} ${phone}`,
        dob,
        travelDate,
        pickupAddress,
        pincode
      }
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('current_visa_application', JSON.stringify(applicationPayload));
      localStorage.setItem('seeker_email', email);
      localStorage.setItem('seeker_firstName', firstName);
      localStorage.setItem('seeker_phone', `${countryCode} ${phone}`);
    }

    setTimeout(() => {
      window.location.href = `/payment/${bookingId}?country=${encodeURIComponent(countryName)}&amount=${grandTotal}&travellers=${travellerCount}&name=${encodeURIComponent(`${firstName} ${lastName}`.trim())}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(`${countryCode} ${phone}`)}&variant=${encodeURIComponent(currentVariant.label)}`;
    }, 450);
  };

  const handleOcrUpload = () => {
    setIsOcrScanning(true);
    setTimeout(() => {
      setIsOcrScanning(false);
      setOcrScanned(true);
      setApprovedVisaType(`${countryName} Official Approved Permit (Subclass 500 / Tourist)`);
      setApprovalDate('2026-05-15');
      setValidityDate('2027-08-30');
      setOcrConditions([
        `8105: Work permitted up to legal quota during study terms in ${countryName}`,
        `8501: Maintain mandatory health insurance / national coverage (OSHC / NHS)`,
        `8516: Must maintain enrollment or legal residency status in ${countryName}`,
        `Border Clearance: Present digital biometric grant notice on arrival`
      ]);
    }, 1200);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Hi! Here is my verified Pre-Departure & Safe Arrival Roadmap for ${countryName} with TravlTik Escrow & Transit Protection:\n\n• Visa: ${approvedVisaType}\n• Expiry: ${validityDate} (${daysLeft} days valid)\n• Airport Pickup & Housing: Verified ✓\n\nTrack progress live on TravlTik.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleToggleVisaAlready = (val: 'no' | 'yes') => {
    setHasVisaAlready(val);
    setTimeout(() => {
      const targetId = val === 'yes' ? 'pre-departure-branch' : 'visa-application-branch';
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const faqs = [
    {
      question: `Do ${passportCountry} citizens need a visa for ${countryName}?`,
      answer: `Yes, passport holders of ${passportCountry} require an official visa or approved electronic authorization before traveling to ${countryName}. TravlTik handles end-to-end online processing with instant verification and a 99.4% approval rate.`
    },
    {
      question: `What is the guaranteed delivery date?`,
      answer: `We guarantee that your approved ${countryName} e-Visa will be sent to your WhatsApp and Email by ${guaranteedDate}. In the rare event of an embassy system delay, you receive real-time SMS/WhatsApp updates and 100% service fee protection.`
    },
    {
      question: `How does online visa filing with TravlTik work?`,
      answer: `Simply upload your documents and passport photo directly from your smartphone. Our automated AI millimeter validator pre-screens everything for 100% compliance before official submission to the consulate.`
    },
    {
      question: `Can I take my passport photo with a smartphone?`,
      answer: `Yes! Our AI Photo Validator automatically removes backgrounds, corrects lighting, and crops your selfie to the exact millimeter dimensions required by the ${countryName} consulate.`
    },
    {
      question: `What happens if my visa gets delayed?`,
      answer: `All TravlTik applications are insured up to ₹5,00,000. If our express timeline is missed due to any internal processing delay, you receive an instant 100% refund of your service concierge fee.`
    }
  ];

  return (
    <div className="w-full bg-white text-slate-800 font-sans antialiased pb-28 lg:pb-12 [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:optimizeLegibility]">
      
      {/* ── SECTION 1: CINEMATIC ROUNDED HERO BANNER ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end p-4 sm:p-8 lg:p-14 text-white shadow-xl border border-slate-100">
          
          {/* Backdrop Image with Multi-Stop Dark Gradient */}
          <img
            src={heroImage}
            alt={countryName}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-5 text-left">
            
            {/* Real-time Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] sm:text-xs font-semibold shadow-xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="tracking-wide truncate">Official Consulate Rules • 2026 Entry Policy</span>
            </div>

            {/* Country Title */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                {countryName} Visa &amp; Entry Requirements {flagEmoji}
              </h1>
              <p className="text-xs sm:text-base text-slate-200 font-normal sm:font-medium max-w-2xl leading-relaxed pt-0.5 sm:pt-1">
                Check if you need a visa, maximum length of stay, passport validity rules, and verified travel entry requirements for {countryName}.
              </p>
            </div>

            {/* Micro Trust Pills */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2.5 pt-1">
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Official Consular Guidelines</span>
              </div>

              <div className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">Real-Time Policy Verification</span>
              </div>

              <div className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span className="truncate">Instant AI Entry Resolution</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1.5: LUXURY ATLYS-GRADE AI INTELLIGENCE CARD ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-left space-y-6 sm:space-y-8 relative overflow-hidden">
          
          {/* Top Bar: Live AI Indicator & Verified Consular Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <span>AI Visa Intelligence</span>
              </div>
              <span className="text-xs text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs font-medium text-slate-600 hidden sm:inline">
                Live Consular Regulations
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600 bg-[#F8FAFC] border border-slate-200/80 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="text-[11px]">🏛️</span>
                <span>Verified with IATA Timatic &amp; {countryName} Consular Engine</span>
              </span>
            </div>
          </div>

          {/* Main Verdict Card */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-1">
            <div className="w-14 h-14 rounded-2xl bg-[#4338CA] text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-7 h-7 stroke-[2]" />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight leading-snug">
                  {aiIntel.verdictTitle}
                </h3>
                <span className="text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider bg-[#EEF2FF] text-[#4338CA] shrink-0 shadow-2xs">
                  {aiIntel.stayDuration || dynamicLengthOfStay}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-3xl pt-0.5">
                {aiIntel.verdictSummary}
              </p>
            </div>
          </div>

          {/* 3 Clean Visual Requirement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            
            {/* Card 1: Passport */}
            <div className="bg-[#FAFAFC] hover:bg-white border border-slate-200/70 hover:border-slate-300 rounded-2xl p-4 transition-all flex items-center gap-3.5 group shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4338CA] shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  PASSPORT
                </span>
                <span className="text-sm font-bold text-slate-900 block truncate">
                  6+ Months Validity
                </span>
                <span className="text-xs text-slate-500 font-medium block truncate">
                  Min. 2 blank pages
                </span>
              </div>
            </div>

            {/* Card 2: Return Travel */}
            <div className="bg-[#FAFAFC] hover:bg-white border border-slate-200/70 hover:border-slate-300 rounded-2xl p-4 transition-all flex items-center gap-3.5 group shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-105 transition-transform">
                <Plane className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  RETURN TRAVEL
                </span>
                <span className="text-sm font-bold text-slate-900 block truncate">
                  Onward Flight Proof
                </span>
                <span className="text-xs text-slate-500 font-medium block truncate">
                  Confirmed return ticket
                </span>
              </div>
            </div>

            {/* Card 3: Stay & Funds */}
            <div className="bg-[#FAFAFC] hover:bg-white border border-slate-200/70 hover:border-slate-300 rounded-2xl p-4 transition-all flex items-center gap-3.5 group shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706] shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  STAY &amp; FUNDS
                </span>
                <span className="text-sm font-bold text-slate-900 block truncate">
                  Hotel / Host Proof
                </span>
                <span className="text-xs text-slate-500 font-medium block truncate">
                  Sufficient travel funds
                </span>
              </div>
            </div>

          </div>

          {/* ── SECTION 1: VISA FEES AND PROCESSING ── */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#10B981] stroke-[2.5]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-heading">
                1. VISA FEES AND PROCESSING
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cost Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2.5 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  • COST &amp; OFFICIAL FEES
                </span>
                <div className="space-y-2">
                  {aiIntel.feesAndProcessing?.costItems?.map((cItem: any, i: number) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-sm font-bold text-slate-900 block">{cItem.label}:</span>
                      <span className="text-[#00A86B] font-bold text-sm block">{cItem.amount}</span>
                      {cItem.note && <span className="text-xs text-slate-500 block leading-relaxed">{cItem.note}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing Time Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  • PROCESSING TIME &amp; SLAS
                </span>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-slate-900 block">
                    {aiIntel.feesAndProcessing?.processingTime}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {aiIntel.feesAndProcessing?.processingSLA}
                  </p>
                </div>
              </div>

              {/* Application Window Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2.5 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  • APPLICATION WINDOW
                </span>
                <div className="space-y-2 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900 font-bold block text-sm">Allowed Filing Window:</strong>
                    <span className="text-slate-500 leading-relaxed">{aiIntel.feesAndProcessing?.applicationWindow}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block text-sm">Maximum Early Entry Buffer:</strong>
                    <span className="text-slate-500 leading-relaxed">{aiIntel.feesAndProcessing?.earlyEntryBuffer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: APPLICATION PROCESS ── */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#4F46E5] stroke-[2.2]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-heading">
                2. APPLICATION PROCESS
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Step 1: Submission */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs flex flex-col justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] text-[#7C3AED] font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h5 className="text-sm font-bold text-slate-900">Submission &amp; Issuance</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {aiIntel.applicationProcess?.submission}
                </p>
              </div>

              {/* Step 2: Online Form */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs flex flex-col justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h5 className="text-sm font-bold text-slate-900">Online Form &amp; Barcode</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {aiIntel.applicationProcess?.onlineForm}
                </p>
              </div>

              {/* Step 3: Appointments */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs flex flex-col justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <h5 className="text-sm font-bold text-slate-900">Appointments &amp; Biometrics</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {aiIntel.applicationProcess?.appointments}
                </p>
              </div>

              {/* Step 4: Documents Checklist */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs flex flex-col justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] text-[#7C3AED] font-bold text-xs flex items-center justify-center">
                  4
                </div>
                <h5 className="text-sm font-bold text-slate-900">Required Document Items</h5>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  {aiIntel.applicationProcess?.documentsAndBiometrics?.slice(0, 3).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#10B981] stroke-[3] shrink-0 mt-0.5" />
                      <span className="leading-snug text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                  {aiIntel.applicationProcess?.documentsAndBiometrics?.length > 3 && (
                    <li className="text-xs text-[#4F46E5] font-bold pt-0.5">
                      + {aiIntel.applicationProcess.documentsAndBiometrics.length - 3} more verified items
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* ── PASSPORT SECURITY BANNER ── */}
          <div className="bg-[#F4F7FE] border border-blue-100/90 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden mt-6 shadow-2xs">
            <div className="flex items-start gap-4 z-10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-blue-50 flex items-center justify-center text-[#4F46E5] shrink-0">
                <Shield className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
                  Passport Security. <span className="text-[#4F46E5]">Then all else</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-xl">
                  We secure your passport in a safe box and locker at all times.<br />
                  <strong className="text-slate-800 font-semibold">Never out of our sight. 50 lakh passports securely handled already.</strong>
                </p>
              </div>
            </div>

            {/* Glowing Biometric Safe Box Visual */}
            <div className="shrink-0 relative w-56 sm:w-64 h-32 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0c1222] via-[#161f38] to-[#0f172a] p-4 flex flex-col items-center justify-center relative shadow-xl border border-slate-700/80">
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl animate-pulse" />
                <div className="w-18 h-20 rounded-xl bg-indigo-950/90 border border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex flex-col items-center justify-center p-2 text-center relative z-10">
                  <span className="text-[9px] font-mono text-blue-300 font-bold uppercase tracking-widest block">PASSPORT</span>
                  <Lock className="w-5 h-5 text-blue-400 my-1 stroke-[2.2]" />
                  <span className="text-[8px] text-emerald-400 font-bold font-mono">SEALED ✓</span>
                </div>
                <div className="absolute bottom-2 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>BIOMETRIC ESCROW VAULT</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── THE VISA PROCESS STEP SHOWCASE ── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 mt-6 text-left shadow-2xs">
            <div className="space-y-1 mb-6">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                The visa process
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                It all happens at the comfort of your couch. Apply, Track, Get your visa on time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 3D House & TravlTik Concierge Van Illustration */}
              <div className="lg:col-span-5 flex items-center justify-center p-6 bg-slate-50/70 rounded-2xl border border-slate-100">
                <div className="relative w-full max-w-[260px] h-[210px] flex flex-col items-center justify-end">
                  {/* House Body */}
                  <div className="w-40 h-36 bg-gradient-to-b from-white to-slate-100 rounded-2xl border border-slate-300 relative shadow-sm flex flex-col items-center justify-between p-3">
                    {/* Roof */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[88px] border-l-transparent border-r-[88px] border-r-transparent border-b-[32px] border-b-slate-700" />
                    {/* Chimney */}
                    <div className="absolute -top-6 right-3 w-4 h-6 bg-slate-600 rounded-xs" />
                    {/* Windows */}
                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                      <div className="w-7 h-7 bg-amber-50 border border-amber-300 rounded-md shadow-2xs" />
                      <div className="w-7 h-7 bg-amber-50 border border-amber-300 rounded-md shadow-2xs" />
                    </div>
                    {/* Door */}
                    <div className="w-8 h-12 bg-slate-800 rounded-t-md mt-auto" />
                  </div>

                  {/* TravlTik Concierge Van */}
                  <div className="absolute -bottom-2 left-4 right-4 h-12 bg-slate-900 rounded-xl shadow-lg border border-slate-700 flex items-center justify-between px-3 text-white z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                      <span className="text-[10px] font-black tracking-wider text-white">TravlTik</span>
                    </div>
                    <span className="text-[9px] font-medium text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">Doorstep Pickup</span>
                  </div>
                </div>
              </div>

              {/* Right Stepper Milestones */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-4 border-[#4F46E5] bg-white shrink-0 mt-1 shadow-2xs" />
                  <div className="space-y-1.5">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {visaProcessSteps[activeProcessStep]?.title || "Hand us your passport"}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-md">
                      {visaProcessSteps[activeProcessStep]?.desc || "At your chosen date and time, our pick-up agent will come right to your doorstep."}
                    </p>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveProcessStep((prev) => (prev > 0 ? prev - 1 : visaProcessSteps.length - 1))}
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer shadow-xs"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveProcessStep((prev) => (prev < visaProcessSteps.length - 1 ? prev + 1 : 0))}
                    className="w-9 h-9 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] flex items-center justify-center text-white transition-all cursor-pointer shadow-sm"
                    aria-label="Next step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 ml-2">
                    {visaProcessSteps.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveProcessStep(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeProcessStep === idx ? 'w-6 bg-[#4F46E5]' : 'w-2 bg-slate-200'
                        }`}
                        aria-label={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STEP 0: CORE DECISION GATE ("Have Visa Already?") POSITIONED DIRECTLY AFTER SECTION 2 ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-5 sm:mt-8 flex items-center justify-center">
        <div className="w-full sm:w-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full py-2 px-4 sm:px-8 shadow-sm flex items-center justify-between sm:justify-center gap-2 sm:gap-6 transition-all">
          
          <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Have Visa Already?
          </span>

          {/* Toggle Capsule Track */}
          <div className="bg-[#f0f4f8] rounded-full p-1 inline-flex items-center gap-1 border border-slate-200/60 shrink-0">
            
            {/* NO button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('no')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                hasVisaAlready === 'no'
                  ? 'bg-[#0f172a] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {hasVisaAlready === 'no' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00A86B] shrink-0" />
                  <span className="tracking-wide">NO</span>
                  <Check className="w-3.5 h-3.5 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-slate-400 shrink-0" />
                  <span className="tracking-wide">NO</span>
                </>
              )}
            </button>

            {/* YES button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('yes')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                hasVisaAlready === 'yes'
                  ? 'bg-[#0f172a] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {hasVisaAlready === 'yes' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00A86B] shrink-0" />
                  <span className="tracking-wide">YES</span>
                  <Check className="w-3.5 h-3.5 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-slate-400 shrink-0" />
                  <span className="tracking-wide">YES</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>



      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* ── BRANCH 1: USER SELECTS "YES" (PRE-DEPARTURE OS & PARENTAL SECURITY) ── */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {hasVisaAlready === 'yes' && (
        <section id="pre-departure-branch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-fadeIn scroll-mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN (5 COLS): VISA SCAN/UPLOAD FIRST & AUTO-FILLED DETAILS ── */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 text-left">
              
              {/* Widget Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 leading-tight">
                      Visa Verification &amp; Details
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Upload your visa grant letter for AI verification &amp; condition tracking.
                    </p>
                  </div>
                </div>

                {ocrScanned ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>{daysLeft}d valid</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 shrink-0">
                    Scan Required
                  </span>
                )}
              </div>

              {/* ── STEP 1: SCAN OR UPLOAD VISA (FIRST ACTION) ── */}
              <input
                type="file"
                ref={visaFileRef}
                className="hidden"
                accept=".pdf,image/*"
                onChange={handleOcrUpload}
              />

              {!ocrScanned ? (
                <div 
                  onClick={() => visaFileRef.current?.click()}
                  className="bg-gradient-to-b from-purple-50/70 via-slate-50 to-slate-50/50 border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                    {isOcrScanning ? (
                      <RotateCw className="w-6 h-6 animate-spin text-purple-700" />
                    ) : (
                      <UploadCloud className="w-6 h-6 text-purple-700" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {isOcrScanning ? 'Auditing & Extracting Visa Rules with AI...' : 'Scan or Upload Visa Grant Letter'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 max-w-xs mx-auto leading-relaxed">
                    {isOcrScanning 
                      ? 'Extracting visa subclass, expiry dates & work/study quotas...' 
                      : 'Upload PDF, JPG, or PNG. AI will instantly auto-fill visa class, expiry dates & mandatory border conditions.'
                    }
                  </p>
                  <button
                    type="button"
                    disabled={isOcrScanning}
                    className="mt-3.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer group-hover:scale-102"
                  >
                    {isOcrScanning ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing Document...</span>
                      </>
                    ) : (
                      <>
                        <QrCode className="w-3.5 h-3.5 text-purple-300" />
                        <span>Scan &amp; Auto-Fill Visa Details</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00A86B] flex items-center justify-center shrink-0 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-950">Visa Grant Letter Verified</h4>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                          AUTO-FILLED
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                        Official consular conditions &amp; validity dates loaded.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => visaFileRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold shadow-2xs shrink-0 cursor-pointer transition-colors"
                  >
                    Re-scan
                  </button>
                </div>
              )}

              {/* ── STEP 2: AUTO-FILLED VISA DETAILS FORM ── */}
              <div className="space-y-4 pt-1">
                {/* Visa Title Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Visa Class / Approved Subclass
                    </label>
                    {ocrScanned && (
                      <span className="text-[10px] font-bold text-[#00A86B] flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Auto-Extracted
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={approvedVisaType}
                    onChange={(e) => setApprovedVisaType(e.target.value)}
                    placeholder="e.g. Student Subclass 500 / Tourist Permit"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Approval & Expiry Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Approval Date
                    </label>
                    <input
                      type="date"
                      value={approvalDate}
                      onChange={(e) => setApprovalDate(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={validityDate}
                      onChange={(e) => setValidityDate(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Active Conditions Checklist */}
                <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                      <span>Mandatory Conditions &amp; Quotas</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">
                      {ocrConditions.length} Active
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {ocrConditions.map((cond, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 font-semibold">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                          <span className="leading-snug">{cond}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOcrConditions(ocrConditions.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-0.5 cursor-pointer"
                          title="Remove condition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {isAddingCond ? (
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="e.g. Work limited to 48 hrs / fortnight"
                        className="flex-1 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newCondition.trim()) {
                            setOcrConditions([...ocrConditions, newCondition.trim()]);
                            setNewCondition('');
                            setIsAddingCond(false);
                          }
                        }}
                        className="px-3 py-1.5 bg-[#00A86B] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingCond(true)}
                      className="text-xs font-bold text-[#00A86B] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add custom condition manually</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN (7 COLS): SUGGESTED NEXT STEPS FOR YOU ── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* 6 Peace-of-Mind Actions Grid */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 leading-tight">
                      Suggested Next Steps for You
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Verified pre-departure roadmap, housing &amp; community checklist for {countryName}.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] font-bold text-xs border border-emerald-200">
                    Recommended Steps
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Step 1: Join Discord Community */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-200 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">💬</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                          DISCORD • 2,400+ ONLINE
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        1. Join Expat &amp; Student Community
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Connect with verified peers &amp; alumni already living in {countryName}.
                      </p>
                    </div>

                    <a
                      href="/community"
                      className="w-full py-2 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs text-center cursor-pointer select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Join Discord Community</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Step 2: Find Accommodation & Housing */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-blue-200 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">🏡</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          ESCROW HOUSING
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        2. Find Verified Accommodation
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Deposit-protected student dorms, flats &amp; verified stays in {countryName}.
                      </p>
                    </div>

                    <a
                      href="/classifieds?category=hotels"
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center shadow-xs cursor-pointer select-none"
                    >
                      <span>Find Accommodation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Step 3: Flight & Layover Transit Check */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">✈️</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          TRANSIT CHECK
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        3. Flight &amp; Layover Transit Check
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Upload e-Ticket to audit layover transit visa rules.
                      </p>
                    </div>

                    <input
                      type="file"
                      ref={ticketFileRef}
                      className="hidden"
                      accept=".pdf,image/*"
                      onChange={() => setTicketUploaded(true)}
                    />

                    <button
                      type="button"
                      onClick={() => ticketFileRef.current?.click()}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        ticketUploaded
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {ticketUploaded ? 'Transit Verified ✓' : 'Upload Flight Ticket'}
                    </button>
                  </div>

                  {/* Step 4: Driver & Terminal Airport Pickup */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">🚗</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          AIRPORT PICKUP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        4. Driver &amp; Terminal Chauffeur
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Verified background-checked chauffeur in {countryName}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDriverBooked(!driverBooked)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        driverBooked
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                      }`}
                    >
                      {driverBooked ? 'Driver Assigned ✓' : 'Book Chauffeur'}
                    </button>
                  </div>

                  {/* Step 5: Multi-Currency Card & 5G eSIM */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">💳</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          0% MARKUP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        5. Multi-Currency Card &amp; 5G eSIM
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Zero forex markup debit card &amp; instant QR eSIM.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEsimOrdered(!esimOrdered)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        esimOrdered
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {esimOrdered ? 'Card & eSIM Active ✓' : 'Get Free Forex Card'}
                    </button>
                  </div>

                  {/* Step 6: Customs Cash & Doctor Prescription */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">📄</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                          CUSTOMS RULES
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        6. Customs Cash &amp; Doctor Prescription
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Ensure compliance under {countryName} border laws.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customsChecked.cash}
                          onChange={(e) => setCustomsChecked({ ...customsChecked, cash: e.target.checked })}
                          className="rounded text-[#00A86B] w-3.5 h-3.5"
                        />
                        <span>&lt;$10k Cash</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customsChecked.meds}
                          onChange={(e) => setCustomsChecked({ ...customsChecked, meds: e.target.checked })}
                          className="rounded text-[#00A86B] w-3.5 h-3.5"
                        />
                        <span>Doctor Letter</span>
                      </label>
                    </div>
                  </div>

                </div>
              </div>

              {/* On-Arrival Readiness OS Accordion */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 text-slate-900 pb-2 border-b border-slate-100">
                  On-Arrival Readiness OS ({countryName})
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      title: '1. Local Bank Account & Biometrics Setup',
                      desc: 'Open a local checking bank account within 48 hours of landing with student/worker tax registration number.'
                    },
                    {
                      title: '2. Campus Check-In or Workplace Induction',
                      desc: 'Report to student admissions / HR with your official visa grant letter and biometric residency document.'
                    },
                    {
                      title: '3. GP Doctor & National Health Service Registration',
                      desc: 'Register with a certified local medical clinic near your residence for 100% emergency medical coverage.'
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <div 
                        className="flex items-center justify-between cursor-pointer select-none"
                        onClick={() => setOpenArrivalStep(openArrivalStep === idx ? null : idx)}
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{step.title}</h4>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openArrivalStep === idx ? 'rotate-180' : ''}`} />
                      </div>
                      {openArrivalStep === idx && (
                        <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200/60 leading-relaxed">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* ── BRANCH 2: USER SELECTS "NO" (SMART QUESTIONNAIRE & ATLYS PORTAL) ── */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {hasVisaAlready === 'no' && (
        <>
          {/* ── 4-STEP PURPOSE-SPECIFIC INTERACTIVE QUESTIONNAIRE ── */}
          <section id="visa-application-branch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24 animate-fadeIn">
            <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-sm text-left space-y-6">
              
              {/* Header with Step indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">
                      Smart Profile Matcher
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Purpose: {activePurposeTab.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-slate-900 tracking-tight">
                    Tell us about your trip to {countryName}
                  </h3>
                </div>

                {/* Purpose Tabs Switcher */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                  {['study', 'tourism', 'work'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setActivePurposeTab(p);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                        activePurposeTab === p
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {p === 'tourism' ? 'Visit / Tourism' : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* STUDY QUESTIONNAIRE */}
              {activePurposeTab === 'study' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Q1: Qualification */}
                    <PortalCustomSelect
                      label="1. Highest Qualification"
                      value={studyQual}
                      onChange={setStudyQual}
                      placeholder="Select qualification"
                      options={[
                        "12th Grade / High School",
                        "Bachelor's Degree",
                        "Master's Degree",
                        "Diploma / Polytechnic"
                      ]}
                    />

                    {/* Q2: Target Degree */}
                    <PortalCustomSelect
                      label={`2. Target Degree in ${countryName}`}
                      value={studyTarget}
                      onChange={setStudyTarget}
                      placeholder="Select target degree"
                      options={[
                        "Bachelor's (UG Degree)",
                        "Master's (PG / MS)",
                        "Post-Graduate Diploma",
                        "PhD / Doctorate"
                      ]}
                    />

                    {/* Q3: Target Intake */}
                    <PortalCustomSelect
                      label="3. Target Intake"
                      value={studyIntake}
                      onChange={setStudyIntake}
                      placeholder="Select intake session"
                      options={[
                        "Fall 2026 (Aug - Sep)",
                        "Spring 2027 (Jan - Feb)",
                        "Summer 2027 (May - Jun)"
                      ]}
                    />

                    {/* Q4: Budget & Funding */}
                    <PortalCustomSelect
                      label="4. Financial Proof / Funds"
                      value={studyBudget}
                      onChange={setStudyBudget}
                      placeholder="Select funding source"
                      options={[
                        "Self-Funded Liquid Funds (₹25L+)",
                        "Education Loan Required",
                        "Full Scholarship / Sponsorship"
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* VISIT / TOURISM QUESTIONNAIRE */}
              {activePurposeTab === 'tourism' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Q1: Trip Status */}
                    <PortalCustomSelect
                      label="1. Trip Planning Status"
                      value={visitPlanStatus}
                      onChange={setVisitPlanStatus}
                      placeholder="Select trip status"
                      options={[
                        "Need Curated Tour Packages",
                        "I have my Itinerary & Hotel",
                        "Visiting Family / Relatives"
                      ]}
                    />

                    {/* Q2: Travel Timing */}
                    <PortalCustomSelect
                      label="2. Tentative Travel Timing"
                      value={visitTiming}
                      onChange={setVisitTiming}
                      placeholder="Select travel window"
                      options={[
                        "Within 30 Days (Fast-Track)",
                        "In 1 to 3 Months",
                        "In 3 to 6 Months"
                      ]}
                    />

                    {/* Q3: Travellers */}
                    <PortalCustomSelect
                      label="3. Group / Travellers"
                      value={visitTravellers}
                      onChange={setVisitTravellers}
                      placeholder="Select group type"
                      options={[
                        "Solo Traveller",
                        "Couple / Honeymoon",
                        "Family with Kids / Elders",
                        "Corporate Business Group"
                      ]}
                    />

                    {/* Q4: Stay Preference */}
                    <PortalCustomSelect
                      label="4. Accommodation Preference"
                      value={visitStay}
                      onChange={setVisitStay}
                      placeholder="Select accommodation"
                      options={[
                        "4-5 Star Luxury Resorts",
                        "Boutique City Hotels",
                        "Serviced Apartments / Airbnb"
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* WORK QUESTIONNAIRE */}
              {activePurposeTab === 'work' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Q1: Exp */}
                    <PortalCustomSelect
                      label="1. Total Experience"
                      value={workExp}
                      onChange={setWorkExp}
                      placeholder="Select experience level"
                      options={[
                        "0 - 2 Years (Entry Level)",
                        "3 - 5 Years (Mid-Senior)",
                        "6+ Years (Senior / Lead)",
                        "10+ Years (Executive)"
                      ]}
                    />

                    {/* Q2: Job Offer */}
                    <PortalCustomSelect
                      label="2. Sponsoring Job Offer"
                      value={workOffer}
                      onChange={setWorkOffer}
                      placeholder="Select job offer status"
                      options={[
                        "Actively Seeking Sponsoring Job",
                        "Have Confirmed Sponsor Offer",
                        "Internal Company Transfer (ICT)"
                      ]}
                    />

                    {/* Q3: Domain */}
                    <PortalCustomSelect
                      label="3. Industry Domain"
                      value={workDomain}
                      onChange={setWorkDomain}
                      placeholder="Select industry"
                      options={[
                        "Tech / IT / Software / AI",
                        "Healthcare & Nursing",
                        "Banking, Finance & Accounting",
                        "Civil, Mechanical & Engineering"
                      ]}
                    />

                    {/* Q4: Credential Assessment */}
                    <PortalCustomSelect
                      label="4. Credential Assessment"
                      value={workAssess}
                      onChange={setWorkAssess}
                      placeholder="Select assessment status"
                      options={[
                        "Need WES / ACS Credential Evaluation",
                        "Already Assessed & Approved",
                        "Exempt / Not Applicable"
                      ]}
                    />
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* ── VISA RESULT & SPECIFICATION WORKSPACE ── */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14">
            
            {/* ================================================== */}
            {/* 1. INSTANT DIRECT VERDICT BANNER (Clean Google Gemini AI Overview) */}
            {/* ================================================== */}
            <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 text-left transition-all hover:shadow-md">
              {/* Subtle Ambient Gemini AI Gradient Header Glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-[#00a896] to-blue-500" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-50/70 rounded-full blur-3xl pointer-events-none" />

              {/* Top Header Pill Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pb-4 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800">
                  <Sparkles className="w-4 h-4 text-[#00a896]" />
                  <span>✨ AI Visa &amp; Entry Resolution</span>
                </div>

                <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-2xs border ${
                  aiIntel.isExempt
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                    : 'bg-blue-50 text-blue-800 border-blue-200/80'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-ping ${aiIntel.isExempt ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                  <span>{aiIntel.isExempt ? "VISA NOT REQUIRED (Up to 90 Days)" : "ELECTRONIC ENTRY / VISA REQUIRED"}</span>
                </div>
              </div>

              {/* Direct Clear Verdict Sentence & Spaced Description */}
              <div className="space-y-3 relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950 leading-snug tracking-tight font-sans">
                  {activePurposeTab === 'study' 
                    ? `${passportCountry} students traveling to ${countryName} require an approved Student Pass / Visa before departure.`
                    : activePurposeTab === 'work'
                    ? `${passportCountry} professionals traveling to ${countryName} require an approved Work Pass / Employment Visa.`
                    : aiIntel.isExempt
                    ? `${passportCountry} passport holders traveling to ${countryName} for tourism or short stays do not need a visa.`
                    : `${passportCountry} passport holders traveling to ${countryName} require an official e-Visa or entry authorization before departure.`
                  }
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-3xl">
                  {aiIntel.verdictSummary}
                </p>
              </div>

              {/* Structured 3-Card Key Facts Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 relative z-10">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    1. Entry Status
                  </span>
                  <span className="text-sm font-bold text-slate-900 block truncate">
                    {aiIntel.isExempt ? 'Visa-Exempt (Tourist / Visit)' : 'Official E-Visa Required'}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-700 block">
                    {aiIntel.isExempt ? 'Instant Airport Clearance' : '3–5 Days Processing'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    2. Max Allowed Stay
                  </span>
                  <span className="text-sm font-bold text-slate-900 block truncate">
                    {aiIntel.maxStay || 'Up to 90 Days'}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Per calendar visit
                  </span>
                </div>

                {aiIntel.digitalCardName && (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      3. Digital Requirement
                    </span>
                    <span className="text-sm font-bold text-slate-900 block truncate">
                      {aiIntel.digitalCardName}
                    </span>
                    <span className="text-[11px] font-medium text-blue-700 block">
                      Mandatory online filing
                    </span>
                  </div>
                )}
              </div>

              {/* Source Verification Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium relative z-10">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified via official consular rules &amp; IATA Timatic</span>
                </div>
                <span className="text-slate-400">Updated for 2026 Global Travel Season</span>
              </div>
            </div>

            {/* ================================================== */}
            {/* 2. STRUCTURED ENTRY & PASSPORT RULES (Atlys Card Grid) */}
            {/* ================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              
              {/* CARD A: PASSPORT COMPLIANCE RULES */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rule Set A</span>
                      <h3 className="font-bold text-base text-slate-900">Passport Compliance Rules</h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">MANDATORY</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  {/* 10-Year Issue Rule — ONLY shown for Schengen destinations */}
                  {isSchengenCountry && (
                    <li className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                      <span className="text-base shrink-0">📜</span>
                      <div>
                        <strong className="text-slate-900 font-bold block">10-Year Issue Rule (Schengen):</strong>
                        <span className="text-slate-600 font-normal">Passport must be issued less than 10 years before the date you arrive in {countryName}.</span>
                      </div>
                    </li>
                  )}

                  {/* Minimum Validity Rule — 6 months for GCC/SEA, 3 months for Schengen */}
                  <li className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                    <span className="text-base shrink-0">⏳</span>
                    <div>
                      <strong className="text-slate-900 font-bold block">
                        {isSchengenCountry ? '3-Month Remaining Validity:' : '6-Month Minimum Validity:'}
                      </strong>
                      <span className="text-slate-600 font-normal">
                        {isSchengenCountry
                          ? `Must have at least 3 months remaining validity beyond your planned departure date from ${countryName}.`
                          : `Passport must be valid for a minimum of 6 months (180 days) from the date of arrival in ${countryName}. This is a strict immigration requirement.`
                        }
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                    <span className="text-base shrink-0">📖</span>
                    <div>
                      <strong className="text-slate-900 font-bold block">Blank Stamp Pages:</strong>
                      <span className="text-slate-600 font-normal">Recommended 1–2 clean blank pages for border control entry &amp; exit stamps.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* CARD B: STAY LIMITS & TRAVEL DOCUMENTS */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                        <Plane className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rule Set B</span>
                        <h3 className="font-bold text-base text-slate-900">Stay Limits &amp; Travel Documents</h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">BORDER CHECK</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                      <span className="text-base shrink-0">🗓️</span>
                      <div>
                        <strong className="text-slate-900 font-bold block">Stay Limit Duration:</strong>
                        <span className="text-slate-600 font-normal">
                          {isSchengenCountry
                            ? 'Stay up to 90 days within any rolling 180-day period for short tourism & business.'
                            : isStudyPurpose
                            ? `Valid for the entire Duration of Course (1 - 4 Years) with multi-entry student pass privileges in ${countryName}.`
                            : isWorkPurpose
                            ? `Valid for 1 to 5 Years renewable employment contract duration in ${countryName}.`
                            : `Stay up to ${baseData.lengthOfStay || '30 Days'} per visit for leisure and tourism in ${countryName}.`}
                        </span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                      <span className="text-base shrink-0">✈️</span>
                      <div>
                        <strong className="text-slate-900 font-bold block">
                          {isStudyPurpose 
                            ? 'Student Entry & Enrollment Verification:' 
                            : isWorkPurpose 
                            ? 'Work Pass IPA & Employer Sponsorship:' 
                            : 'Border Proof & Return Tickets:'}
                        </strong>
                        <span className="text-slate-600 font-normal">
                          {isStudyPurpose
                            ? `Approved In-Principle Approval (IPA) letter, university SOLAR enrollment registration, and course schedule.`
                            : isWorkPurpose
                            ? `Approved Work Pass IPA letter, signed employment contract, and employer sponsorship registration.`
                            : 'Confirmed return/onward flight tickets & verified accommodation stay proof.'}
                        </span>
                      </div>
                    </li>

                    {/* ETIAS — ONLY shown for Schengen destinations. Not applicable to GCC, SEA, or others. */}
                    {isSchengenCountry && (
                      <li className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                        <span className="text-base shrink-0">🛡️</span>
                        <div>
                          <strong className="text-slate-900 font-bold block">Digital Authorization / ETIAS:</strong>
                          <span className="text-slate-600 font-normal">Digital border declaration &amp; upcoming ETIAS requirement compliance for {countryName}.</span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Official Advisory Button (Dynamic by Origin Passport & Target Country) */}
                <div className="pt-2">
                  <a
                    href={advisoryInfo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-200"
                  >
                    <Building2 className="w-4 h-4 text-slate-700" />
                    <span>{advisoryInfo.text}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* ================================================== */}
            {/* 3. INTERACTIVE PASSPORT VALIDITY CHECKER WIDGET */}
            {/* ================================================== */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Validator Tool</span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">Check if your specific passport meets {countryName}'s entry validity rules</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-auto">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Real-Time Evaluation</span>
                </div>
              </div>

              {/* 3 Input Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    1. Passport Issue Date
                  </label>
                  <input
                    type="date"
                    value={passportIssueDate}
                    onChange={(e) => setPassportIssueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    2. Passport Expiry Date
                  </label>
                  <input
                    type="date"
                    value={passportExpiryDate}
                    onChange={(e) => setPassportExpiryDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    3. Proposed Travel Date
                  </label>
                  <input
                    type="date"
                    value={proposedTravelDate}
                    onChange={(e) => setProposedTravelDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Status Output Box */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                passportValidityCheck.isEligible 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      passportValidityCheck.isEligible ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {passportValidityCheck.isEligible ? '✓' : '!'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base leading-snug">
                        {passportValidityCheck.message}
                      </h4>
                      <p className="text-xs mt-0.5 opacity-80">
                        {passportValidityCheck.isEligible 
                          ? isSchengenCountry
                            ? `Both the 10-year Schengen issue rule and the 3-month departure buffer are fully satisfied for your trip to ${countryName}.`
                            : `The 6-month minimum validity rule (from date of arrival) is fully satisfied for your trip to ${countryName}.`
                          : 'Immigration authorities may deny boarding or entry if the passport does not satisfy the required validity rules.'}
                      </p>
                    </div>
                  </div>

                  {/* Instant Verdict Badge */}
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto border ${
                    passportValidityCheck.isEligible 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {passportValidityCheck.isEligible ? 'PASSPORT ELIGIBLE' : 'RENEWAL REQUIRED'}
                  </span>
                </div>

                {/* Verification Rule Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3.5 mt-3.5 border-t border-current/10 text-xs font-semibold">
                  {/* 10-year issue rule row — only for Schengen */}
                  {isSchengenCountry && (
                    <div className="flex items-center gap-2">
                      <span className={passportValidityCheck.issueRulePassed ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                        {passportValidityCheck.issueRulePassed ? '✓' : '✗'}
                      </span>
                      <span>Schengen Issue Rule: Issued {passportValidityCheck.issueYearsAgo} years ago ({passportValidityCheck.issueRulePassed ? '< 10 yrs' : 'Exceeds 10 yrs'})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={passportValidityCheck.expiryRulePassed ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                      {passportValidityCheck.expiryRulePassed ? '✓' : '✗'}
                    </span>
                    <span>
                      Validity Rule: {passportValidityCheck.remainingMonths} months remaining after travel ({passportValidityCheck.expiryRulePassed ? `≥ ${passportValidityCheck.minRequiredMonths} mos ✓` : `< ${passportValidityCheck.minRequiredMonths} mos — Renewal Required`})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================== */}
            {/* 4. QUICK SPECIFICATION PILL CARDS */}
            {/* ================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                  Length of Stay
                </span>
                <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
                  {dynamicLengthOfStay}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                  {dynamicStayCategory}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                  Validity
                </span>
                <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
                  {dynamicValidity}
                </span>
                <span className="text-[11px] font-bold text-blue-600 block mt-0.5">
                  {isStudyPurpose ? 'From course start date' : isWorkPurpose ? 'Employment Contract Period' : 'From issue date'}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                  Entry Type
                </span>
                <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
                  {isStudyPurpose || isWorkPurpose ? 'Multiple Entry' : entryType.split('/')[0].trim()}
                </span>
                <span className="text-[11px] font-bold text-purple-600 block mt-0.5">
                  Official Stamping
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                  Visa Category
                </span>
                <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1 truncate">
                  {dynamicVisaType}
                </span>
                <span className="text-[11px] font-bold text-amber-600 block mt-0.5">
                  {isStudyPurpose ? 'Institute Sponsored' : isWorkPurpose ? 'Employer Sponsored' : 'Direct Consular'}
                </span>
              </div>
            </div>

            {/* ================================================== */}
            {/* 2. ATLYS-STYLE COMPARISON TIMELINE (DOING IT WITH ATLYS vs DOING IT YOURSELF) */}
            {/* ================================================== */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-10 shadow-xs text-left overflow-x-auto">
              
              {/* SECTION A: DOING IT WITH TRAVLTIK */}
              <div className="space-y-4 min-w-[640px]">
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#4F46E5] font-heading">
                  DOING IT WITH TRAVLTIK
                </h3>

                <div className="relative pt-10 pb-12">
                  {/* Connecting Solid Bar */}
                  <div className="absolute top-[84px] left-8 right-8 h-1 bg-[#4F46E5] -z-0 rounded-full" />

                  {/* 4 Nodes */}
                  <div className="grid grid-cols-4 relative z-10">
                    
                    {/* Node 1: Top text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-tight max-w-[140px]">
                          Submit all your documents on TravlTik
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-bold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        1
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 2: Bottom text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-16" />
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-bold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        2
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-tight max-w-[140px]">
                          TravlTik comes to collect your passport
                        </span>
                      </div>
                    </div>

                    {/* Node 3: Top text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-tight max-w-[150px]">
                          We constantly give you updates and a reliable ETA.
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-bold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        3
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 4: Bottom text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-16" />
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-bold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        4
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-tight max-w-[150px]">
                          When approved, we drop your passport back to you!
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* SECTION B: DOING IT YOURSELF */}
              <div className="space-y-4 min-w-[740px] pt-6 border-t border-slate-100">
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-black font-heading">
                  DOING IT YOURSELF
                </h3>

                <div className="relative pt-10 pb-12">
                  {/* Connecting Solid Black Bar */}
                  <div className="absolute top-[84px] left-6 right-6 h-1 bg-black -z-0 rounded-full" />

                  {/* 8 Nodes */}
                  <div className="grid grid-cols-8 relative z-10">
                    
                    {/* Node 1: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Gather all your documents at home
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        1
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 2: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        2
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Get your documents printed at a print shop
                        </span>
                      </div>
                    </div>

                    {/* Node 3: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Get stuck in traffic driving to the embassy
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        3
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 4: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        4
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Spend 3+ hours at the embassy
                        </span>
                      </div>
                    </div>

                    {/* Node 5: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Get stuck in traffic on the way back home
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        5
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 6: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        6
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Wait anxiously for your visa approval
                        </span>
                      </div>
                    </div>

                    {/* Node 7: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Go back to embassy to pick up passport
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        7
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 8: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        8
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                          Drive back home
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* 3. REQUIRED DOCUMENTS CHECKLIST */}
            <div className="space-y-4 text-left">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00A86B]">
                  Simple Paperwork
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                  {isStudyPurpose 
                    ? `Documents required for ${countryName} Student Pass / Visa`
                    : isWorkPurpose
                    ? `Documents required for ${countryName} Work Pass / Visa`
                    : `Documents required for ${countryName} Visa`}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isStudyPurpose ? (
                  <>
                    {/* Document 1: IPA Letter */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'ICA Singapore In-Principle Approval (IPA) Letter'
                            : `Official ${countryName} Student Visa / IPA Approval Letter`}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Official electronic pre-approval letter issued by immigration authorities prior to flight check-in.
                        </p>
                      </div>
                    </div>

                    {/* Document 2: University Acceptance & SOLAR */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'University Acceptance & SOLAR Application Reference ID'
                            : 'University Acceptance Letter & Enrollment Reference ID'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Confirmed offer letter from an approved Institute of Higher Learning (IHL) with registration details.
                        </p>
                      </div>
                    </div>

                    {/* Document 3: Form 16 & Form V36 */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'Form 16 & Form V36 e-Filing Copies'
                            : 'Student Visa Application & Biometric Registration Forms'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Completed and signed official immigration e-forms and applicant declaration copies.
                        </p>
                      </div>
                    </div>

                    {/* Document 4: Bank Proof / Loan */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Bank Proof / Educational Loan Approval Letter
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Verified proof of liquid funds, bank statements (last 6 months), or sanctioned education loan.
                        </p>
                      </div>
                    </div>
                  </>
                ) : isWorkPurpose ? (
                  <>
                    {/* Work Doc 1: MOM IPA Letter */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'MOM In-Principle Approval (IPA) Letter'
                            : `Official ${countryName} Work Pass / IPA Approval Letter`}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'Official pre-approval issued by Ministry of Manpower (MOM).'
                            : 'Official pre-approval issued by immigration and labour authorities.'}
                        </p>
                      </div>
                    </div>

                    {/* Work Doc 2: Signed Employment Contract */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Signed Employment Contract
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'Copy of signed offer letter from licensed Singapore employer.'
                            : `Copy of signed offer letter from licensed sponsoring employer in ${countryName}.`}
                        </p>
                      </div>
                    </div>

                    {/* Work Doc 3: Educational & Credential Verification */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Educational &amp; Credential Verification
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          {countryName.toLowerCase().includes('singapore')
                            ? 'Recognized University degree certificates and COMPASS qualification evaluation.'
                            : 'Recognized degree certificates and verified credential evaluation (ECA / WES).'}
                        </p>
                      </div>
                    </div>

                    {/* Work Doc 4: Passport & Photo Upload */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Passport &amp; Photo Upload
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          High-resolution passport biodata scan valid for at least 6 months with clear digital photo.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Original Passport / Clear Scan
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Valid for at least 6 months beyond travel date with 2 blank pages.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          1 Passport Photo / Clean Selfie
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          White background. Take selfie on phone, our AI formats it automatically.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Plane className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Confirmed Flight Itinerary
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Return or onward ticket. Don't worry, TravlTik can provide embassy itinerary holding.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          Hotel Booking / Stay Proof
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          Verified hotel reservation or host invitation letter for immigration stamping.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 5. EXPANDABLE FAQ ACCORDION */}
            <div className="space-y-4 text-left">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00A86B]">
                  Got Questions?
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="border border-slate-200/90 rounded-3xl overflow-hidden divide-y divide-slate-100 shadow-2xs">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="bg-white">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer select-none"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </section>

          {/* ── MOBILE FLOATING STICKY ACTION BAR (ANDROID & IOS OPTIMIZED) ── */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-3 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] pb-[max(12px,env(safe-area-inset-bottom))]">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                {countryName} Visa Assistance
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate block">
                Talk to Verified Expert
              </span>
            </div>

            <a
              href={`https://wa.me/917661989366?text=${encodeURIComponent(`Hi TravlTik, I need expert visa assistance for ${countryName}`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/25 active:scale-95 shrink-0 select-none cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </>
      )}

      {/* ── APPLICATION DETAILS MODAL POP-UP ── */}
      {showApplicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-left relative">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowApplicationModal(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center absolute top-6 right-6 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] text-[10px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00A86B]" />
                <span>{countryName} Visa Application</span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-slate-900 tracking-tight">
                Applicant &amp; Travel Details
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to proceed to secure Razorpay checkout.
              </p>
            </div>

            {/* Selected Booking Summary Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  {countryName} • {currentVariant.label}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {travellerCount} Applicant{travellerCount > 1 ? 's' : ''} • Guaranteed {guaranteedDate}
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-semibold text-slate-900 block">
                  ₹{grandTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  All fees included
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleProceedToRazorpay} className="space-y-4">
              
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Email (for e-Visa delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-16 h-11 px-2 rounded-xl border border-slate-300 text-xs font-medium text-center bg-slate-100 text-slate-900"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth & Tentative Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Tentative Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Doorstep Pickup Address & Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Complete Address (for document pickup &amp; delivery) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Flat / Building, Area, Landmark, City"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeCheck(e.target.value)}
                    placeholder="6-digit Pincode"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your passport &amp; payment are 100% protected under TravlTik Escrow &amp; Insurance Guarantee.</span>
              </div>

              {/* Submit to Razorpay Button */}
              <button
                type="submit"
                disabled={isSubmittingModal}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm tracking-wide shadow-xl shadow-slate-900/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
              >
                {isSubmittingModal ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Razorpay Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay ₹{grandTotal.toLocaleString()} with Razorpay</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
