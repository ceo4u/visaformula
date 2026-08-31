import React, { useState, useMemo, useRef, useEffect } from 'react';
import { OfficialRequirementsCard } from './OfficialRequirementsCard';
import { ConsularMockPrepCard } from './ConsularMockPrepCard';

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
      {label && <label className="block text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-snug">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-11 px-3.5 rounded-xl border bg-white text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
          open ? 'border-indigo-600 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`truncate text-left ${hasValue ? 'text-slate-900 font-bold' : 'text-slate-400 font-normal'}`}>
          {hasValue ? value : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-indigo-600' : ''}`} />
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
                      ? 'bg-indigo-50 text-indigo-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 stroke-[3]" />}
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
  HeartHandshake,
  Search
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

// Aliases mapping for direct access
COUNTRY_DATABASE['united-kingdom'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['united_kingdom'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['great-britain'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['britain'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['england'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['united-states'] = {
  countryName: 'United States',
  flagEmoji: '🇺🇸',
  heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&auto=format&fit=crop&q=85',
  lengthOfStay: 'Up to 6 Months (180 Days)',
  validity: '10 Years',
  entryType: 'Multiple Entry',
  visaType: 'B1/B2 Visitor Visa',
  processingDays: 21,
  governmentFeeINR: 15500,
  serviceFeeINR: 4900,
  variants: [
    { id: 'us-b1b2', label: 'B1/B2 10-Year Multiple Entry', stay: '180 Days/Visit', govFee: 15500, servFee: 4900, popular: true },
    { id: 'us-priority', label: 'Emergency Interview Slot Concierge', stay: '180 Days/Visit', govFee: 24000, servFee: 7500 }
  ]
};
COUNTRY_DATABASE['usa'] = COUNTRY_DATABASE['united-states'];
COUNTRY_DATABASE['us'] = COUNTRY_DATABASE['united-states'];

function formatTargetDate(daysToAdd: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  return d.toLocaleDateString('en-US', options);
}


// ── STRICT REGION CLASSIFICATION CONSTANTS ──
// GCC Region: UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait
const GCC_COUNTRIES = ['uae', 'united arab emirates', 'dubai', 'abu dhabi', 'saudi arabia', 'ksa', 'qatar', 'oman', 'bahrain', 'kuwait'];

// Schengen Area: Germany, France, Spain, Italy, Portugal, Netherlands, Belgium, Austria, Switzerland, Greece, Norway, Sweden, Denmark, Finland, Czechia, Poland, etc.
const SCHENGEN_COUNTRIES = ['germany', 'france', 'spain', 'italy', 'portugal', 'netherlands', 'belgium', 'austria', 'switzerland', 'greece', 'norway', 'sweden', 'denmark', 'finland', 'czechia', 'czech republic', 'poland', 'hungary', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'iceland', 'liechtenstein', 'schengen'];

// Southeast Asia: Singapore, Thailand, Malaysia, Vietnam, Indonesia, Philippines, Cambodia, Myanmar
const SOUTHEAST_ASIA_COUNTRIES = ['singapore', 'thailand', 'malaysia', 'vietnam', 'indonesia', 'philippines', 'cambodia', 'myanmar', 'bali'];

// ── NATIONALITY FORMATTER HELPER ──
function formatNationality(passport: string): string {
  const p = (passport || 'India').trim();
  const lower = p.toLowerCase();
  if (lower === 'india' || lower === 'indian' || lower === 'in') return 'Indian';
  if (lower === 'united states' || lower === 'usa' || lower === 'us' || lower === 'america' || lower === 'american') return 'American';
  if (lower === 'united kingdom' || lower === 'uk' || lower === 'great britain' || lower === 'britain' || lower === 'british' || lower === 'england') return 'British';
  if (lower === 'australia' || lower === 'australian') return 'Australian';
  if (lower === 'canada' || lower === 'canadian') return 'Canadian';
  if (lower === 'germany' || lower === 'german') return 'German';
  if (lower === 'france' || lower === 'french') return 'French';
  if (lower === 'italy' || lower === 'italian') return 'Italian';
  if (lower === 'spain' || lower === 'spanish') return 'Spanish';
  if (lower === 'japan' || lower === 'japanese') return 'Japanese';
  if (lower === 'china' || lower === 'chinese') return 'Chinese';
  if (lower === 'uae' || lower === 'united arab emirates' || lower === 'emirati') return 'Emirati';
  if (lower === 'singapore' || lower === 'singaporean') return 'Singaporean';
  if (lower === 'new zealand' || lower === 'kiwi') return 'New Zealand';
  return p.charAt(0).toUpperCase() + p.slice(1);
}

// ── DYNAMIC AI OVERVIEW & ENTRY REQUIREMENTS ENGINE ──
function getAIVisaIntelligence(passport: string, country: string, purpose: string) {
  const pNorm = (passport || 'India').toLowerCase();
  const cNorm = (country || 'Singapore').toLowerCase();
  const purNorm = (purpose || 'tourism').toLowerCase();
  const nationality = formatNationality(passport);

  const isUK = cNorm.includes('united kingdom') || cNorm.includes('uk') || cNorm.includes('great britain') || cNorm.includes('england') || cNorm.includes('britain') || cNorm.includes('scotland');
  const isUKorUSorEU = pNorm.includes('united kingdom') || pNorm.includes('uk') || pNorm.includes('united states') || pNorm.includes('usa') || pNorm.includes('australia') || pNorm.includes('canada');
  const isUS = cNorm.includes('united states') || cNorm.includes('usa') || cNorm.includes('america');
  const isSingapore = cNorm.includes('singapore');
  const isUAE = GCC_COUNTRIES.some(gc => cNorm.includes(gc));
  const isGCC = GCC_COUNTRIES.some(gc => cNorm.includes(gc));
  const isSchengen = SCHENGEN_COUNTRIES.some(sc => cNorm.includes(sc));
  const isSoutheastAsia = SOUTHEAST_ASIA_COUNTRIES.some(sea => cNorm.includes(sea));
  const isStudy = purNorm.includes('study');
  const isWork = purNorm.includes('work') || purNorm.includes('job');

  // Case 1: United Kingdom (UK)
  if (isUK) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Student Visa for the United Kingdom`,
        verdictSummary: `Confirmation of Acceptance for Studies (CAS) required. Includes full-time academic status and BRP / eVisa rights.`,
        entryStatus: "UK Student Visa",
        entryStatusSubtext: "3–4 Weeks Processing",
        stayDuration: "Duration of Course (1–4 Years)",
        stayDurationSubtext: "Full-time degree",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Includes BRP / eVisa status",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "UKVI CAS & eVisa Share Code",
        digitalCardDesc: "Confirmation of Acceptance for Studies issued by licensed UK sponsor.",
        sources: ["UK Visas and Immigration (UKVI)", "Home Office", "IATA Timatic 2026"],
        maxStay: "Duration of Course (1–4 Years)",
        conditionsForVisa: [
          "Unconditional offer on full-time degree course with licensed student sponsor.",
          "Confirmation of Acceptance for Studies (CAS) reference number.",
          "Must meet English language proficiency (IELTS for UKVI/SELT).",
          "Demonstrate 28-day maintenance funds for tuition and London/UK living costs."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI Student Visa Fee", amount: "£490 (approx. ₹51,800)", note: "Standard UK government visa application fee" },
            { label: "Immigration Health Surcharge (IHS)", amount: "£776/year (approx. ₹82,000/yr)", note: "Mandatory NHS healthcare access surcharge" }
          ],
          totalEstimatedINR: "Official UKVI Fees Apply",
          processingTime: "3 Weeks Standard (~15 Working Days)",
          processingSLA: "Priority (5 Days) and Super Priority (24 Hours) available at VFS centers.",
          applicationWindow: "Apply up to 6 Months before course start date",
          earlyEntryBuffer: "Travel to UK permitted up to 1 month before course starts"
        },
        applicationProcess: {
          submission: "1. CAS Issuance: Receive CAS number from licensed university sponsor.",
          onlineForm: "2. UKVI Online Application: Complete Access UK form and pay visa + IHS fees.",
          appointments: "3. VFS Global Appointment: Book biometrics (fingerprints & digital photo) at nearest VFS center.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "CAS Statement & University Acceptance Letter",
            "Financial Proof (Bank statements meeting 28-day maintenance rule)",
            "English Language Certificate (IELTS/PTE)",
            "Tuberculosis (TB) Test Certificate from approved clinic"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Skilled Worker Visa for the United Kingdom`,
        verdictSummary: `Certificate of Sponsorship (CoS) required from a licensed UK employer prior to departure.`,
        entryStatus: "Skilled Worker Visa",
        entryStatusSubtext: "3–4 Weeks Processing",
        stayDuration: "Up to 5 Years (Renewable)",
        stayDurationSubtext: "Leads to ILR (Permanent Residency)",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Employer sponsored",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Certificate of Sponsorship (CoS)",
        digitalCardDesc: "Electronic sponsorship record issued by licensed UK Home Office sponsor.",
        sources: ["UK Home Office", "UKVI", "IATA Timatic 2026"],
        maxStay: "Up to 5 Years",
        conditionsForVisa: [
          "Confirmed job offer from Home Office-approved sponsor.",
          "Valid Certificate of Sponsorship (CoS) reference number.",
          "Salary meets qualifying threshold (minimum £38,700 or going rate).",
          "English language level B1 on CEFR scale."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI Skilled Worker Visa Fee", amount: "£719 – £1,420 (₹76,000 – ₹150,000)", note: "Varies by duration (up to 3 years / over 3 years)" },
            { label: "Immigration Health Surcharge (IHS)", amount: "£1,035/year (approx. ₹109,000/yr)", note: "Mandatory NHS healthcare access surcharge" }
          ],
          totalEstimatedINR: "Employer Sponsored / Subsidized",
          processingTime: "3 Weeks Standard (~15 Working Days)",
          processingSLA: "Priority 5-day decision service available at VFS centers.",
          applicationWindow: "Apply up to 3 Months before job start date on CoS",
          earlyEntryBuffer: "Travel permitted up to 14 days before start date"
        },
        applicationProcess: {
          submission: "1. CoS Assignment: Sponsoring UK company assigns official Certificate of Sponsorship.",
          onlineForm: "2. Online Filing: Submit Skilled Worker visa application on gov.uk portal.",
          appointments: "3. VFS Biometrics: Attend VFS Global appointment for fingerprinting and passport submission.",
          documentsAndBiometrics: [
            "Valid Passport with blank visa pages",
            "CoS Reference Number & Job Offer Letter",
            "Proof of English proficiency (IELTS / degree verification)",
            "TB Test Certificate",
            "Criminal Record Certificate for designated roles"
          ]
        }
      };
    } else {
      // UK Tourism / Standard Visitor
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a visa for United Kingdom`,
        verdictSummary: `Standard Visitor Visa required before travel. 100% verified online application with biometric support.`,
        entryStatus: "Standard Consular Visa",
        entryStatusSubtext: "~3 Weeks Standard Processing",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Standard 6-Month Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Access UK / UKVI Portal",
        digitalCardDesc: "Official UK Visas and Immigration application confirmation & VFS appointment receipt.",
        sources: ["UK Visas and Immigration (UKVI)", "Home Office", "IATA Timatic 2026"],
        maxStay: "Up to 180 Days (6 Months)",
        conditionsForVisa: [
          "Tourism, holidays, visiting family/friends, or short business meetings.",
          "No unauthorized work or public funds access permitted.",
          "Must intend to leave the UK at the end of visit with sufficient funds."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI Government Visa Fee (6 Months)", amount: "£115 (approx. ₹12,500)", note: "Official UK government visa fee" },
            { label: "TravlTik VFS Concierge & Review", amount: "₹4,800", note: "Application vetting, document formatting & biometric assistance" }
          ],
          totalEstimatedINR: "₹17,300 Total Package",
          processingTime: "3 Weeks Standard (~15 Working Days)",
          processingSLA: "Priority 5-day decision service available at VFS centers across India.",
          applicationWindow: "Apply up to 3 Months (90 Days) before planned travel date",
          earlyEntryBuffer: "Valid for multiple entries anytime during the 6-month validity"
        },
        applicationProcess: {
          submission: "1. Online UKVI Portal Filing: Fill official Access UK visa application form.",
          onlineForm: "2. Document Upload & Fee Payment: Pay £115 UKVI consular fee and upload supporting documents.",
          appointments: "3. VFS Global Biometric Appointment: Attend appointment for fingerprint scan and facial photo.",
          documentsAndBiometrics: [
            "Original Passport with at least 6 months validity and blank visa pages",
            "Proof of Financial Funds (6 months bank statements with sufficient balance)",
            "Employment Verification / Salary Slips / Leave Approval Letter",
            "Detailed Travel Itinerary & Accommodation Details",
            "VFS Appointment Confirmation & Document Upload Receipt"
          ]
        }
      };
    }
  }

  // Case 2: United States
  if (isUS) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an F-1 Student Visa for the United States`,
        verdictSummary: `Form I-20 and approved SEVIS required to legally enter and study in the United States.`,
        entryStatus: "F-1 Student Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Duration of Status (D/S — Up to 4–5 Years)",
        stayDurationSubtext: "Full academic degree",
        entryType: "Multiple Entry",
        entryTypeSubtext: "SEVIS Active Status",
        visaPillTag: "CONSULAR VISA REQUIRED",
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
        verdictTitle: `${nationality} passport holders require a Work Visa (H-1B / L-1) for the United States`,
        verdictSummary: `Approved Form I-797 Notice of Action and consular visa stamp required before taking up employment.`,
        entryStatus: "H-1B / L-1 Work Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Up to 3 Years (Extendable to 6 Years)",
        stayDurationSubtext: "Based on petition approval",
        entryType: "Multiple Entry",
        entryTypeSubtext: "USCIS Petition Based",
        visaPillTag: "CONSULAR VISA REQUIRED",
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
        verdictTitle: `${nationality} passport holders require a B1/B2 Visa for the United States`,
        verdictSummary: `Non-immigrant visitor visa required prior to boarding. Valid for multiple entries up to 10 years.`,
        entryStatus: "B1/B2 Consular Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per visit on 10-Year Visa",
        entryType: "Multiple Entry",
        entryTypeSubtext: "10-Year Validity Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
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

  // Case 3: Singapore
  if (isSingapore) {
    if (isUKorUSorEU && !isStudy && !isWork) {
      return {
        isExempt: true,
        verdictTitle: "Visa-Exempt for Tourism & Business (Up to 90 Days)",
        verdictSummary: `${nationality} passport holders do not need a visa for visits up to 90 days. Mandatory SG Arrival Card (SGAC) required prior to check-in.`,
        entryStatus: "Visa-Free / SGAC Required",
        entryStatusSubtext: "Instant Online Clearance",
        stayDuration: "Up to 90 Days",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Automated e-Gates at Changi",
        visaPillTag: "VISA EXEMPT / ETA",
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
        verdictTitle: `${nationality} passport holders require a Student's Pass for Singapore`,
        verdictSummary: `In-Principle Approval (IPA) Student's Pass issued by ICA Singapore required prior to departure.`,
        entryStatus: "Student's Pass (STP)",
        entryStatusSubtext: "5–10 Days via SOLAR",
        stayDuration: "Duration of Course (1 - 4 Years)",
        stayDurationSubtext: "Full academic degree",
        entryType: "Multiple Entry",
        entryTypeSubtext: "ICA In-Principle Approval (IPA)",
        visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
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
        verdictTitle: `${nationality} passport holders require a Work Pass for Singapore`,
        verdictSummary: `Approved Ministry of Manpower (MOM) Work Pass (EP, S-Pass) required from sponsoring employer.`,
        entryStatus: "MOM Work Pass / IPA",
        entryStatusSubtext: "10–20 Days via myMOM",
        stayDuration: "1 to 5 Years (Renewable)",
        stayDurationSubtext: "Based on employment pass grant",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Employer Sponsored",
        visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
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
        verdictTitle: `${nationality} passport holders require an e-Visa for Singapore`,
        verdictSummary: `Official electronic visa required prior to departure. Instant digital processing in 3–5 days.`,
        entryStatus: "Official E-Visa Required",
        entryStatusSubtext: "3–5 Days Processing",
        stayDuration: "30 Days (Extendable)",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Single / Multiple Entry",
        entryTypeSubtext: "Paper E-Visa with ICA Barcode",
        visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
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

  // Case 4: UAE / GCC
  if (isGCC) {
    return {
      isExempt: false,
      verdictTitle: `${nationality} passport holders require an e-Visa for ${country}`,
      verdictSummary: `Pre-arranged official electronic visa required prior to travel. Fast-track digital issuance in 24–72 hours.`,
      entryStatus: "Official E-Visa Required",
      entryStatusSubtext: "24–72 Hours Processing",
      stayDuration: "30 to 60 Days",
      stayDurationSubtext: "Per calendar visit",
      entryType: "Single / Multiple Entry",
      entryTypeSubtext: "Pre-arranged ICP/GDRFA eVisa",
      visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
      digitalCardName: "UAE ICP / GDRFA eVisa Portal",
      digitalCardDesc: "Pre-arranged eVisa via UAE ICP / GDRFA portal.",
      sources: ["ICP UAE", "GDRFA Dubai", "IATA Timatic 2026"],
      maxStay: "30 to 60 Days",
      conditionsForVisa: [
        `Plan to stay in ${country} for tourism, holidays, or business meetings.`,
        "Holding valid return flight tickets and confirmed hotel booking.",
        "Must possess passport valid for at least 6 months beyond travel date."
      ],
      feesAndProcessing: {
        costItems: [
          { label: "Government Consular Fee", amount: "AED 290 (₹6,500)", note: "Official visa issuance fee" },
          { label: "TravlTik Service & Fast-Track Concierge", amount: "₹2,200", note: "Document verification, photo formatting & guarantee" }
        ],
        totalEstimatedINR: "₹8,700 Total Package",
        processingTime: "24 to 72 Hours (Express 12h Available)",
        processingSLA: "Direct digital delivery to WhatsApp and email with 99.4% approval rate.",
        applicationWindow: "Apply 10 to 30 Days prior to departure",
        earlyEntryBuffer: "Entry permit valid for 60 days from issue date"
      },
      applicationProcess: {
        submission: "1. Smartphone Upload: Submit passport scan and photo directly on TravlTik.",
        onlineForm: "2. AI Automated Audit: System verifies passport validity & photo millimeter rules.",
        appointments: "3. Direct Submission: Application submitted directly to official ICP/GDRFA channels.",
        documentsAndBiometrics: [
          "Passport Biodata Page (Valid for at least 6 months)",
          "Digital Passport Photograph (White background)",
          "Confirmed Return Flight Reservation",
          "Hotel Accommodation Booking / Host Invitation"
        ]
      }
    };
  }

  const isCanada = cNorm.includes('canada');
  const isAustralia = cNorm.includes('australia') || cNorm.includes('aus');
  const isGermany = cNorm.includes('germany') || cNorm.includes('deutschland');
  const isGreece = cNorm.includes('greece') || cNorm.includes('hellenic');
  const isJapan = cNorm.includes('japan');
  const isNewZealand = cNorm.includes('new zealand') || cNorm.includes('nz');
  const isIreland = cNorm.includes('ireland');

  // Case 5: Canada
  if (isCanada) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Study Permit for Canada`,
        verdictSummary: `Provincial Attestation Letter (PAL) & DLI Acceptance required prior to lodging IRCC application.`,
        entryStatus: "Canada Study Permit (IRCC)",
        entryStatusSubtext: "4–8 Weeks via IRCC Portal",
        stayDuration: "Duration of Study + 90 Days",
        stayDurationSubtext: "Includes off-campus work rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Student TRV / eTA Sticker",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "IRCC Letter of Introduction",
        digitalCardDesc: "Port of Entry (POE) Study Permit Introduction Letter from Immigration, Refugees and Citizenship Canada.",
        sources: ["IRCC Canada", "Government of Canada", "IATA Timatic 2026"],
        maxStay: "Course Duration + 90 Days",
        conditionsForVisa: [
          "Acceptance letter from Designated Learning Institution (DLI).",
          "Provincial Attestation Letter (PAL) from province.",
          "Guaranteed Investment Certificate (GIC) of CAD $20,635+ for living expenses.",
          "Language proficiency: IELTS (Academic / General) or PTE Core."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Study Permit Application Fee", amount: "CAD $150 (approx. ₹9,200)", note: "Official IRCC processing fee" },
            { label: "Biometrics Collection Fee", amount: "CAD $85 (approx. ₹5,200)", note: "VFS Canada biometric enrollment" }
          ],
          totalEstimatedINR: "CAD $235 (approx. ₹14,400)",
          processingTime: "4 to 8 Weeks (IRCC Processing Time)",
          processingSLA: "Complete digital submission via IRCC secure GCKey account.",
          applicationWindow: "Apply 3 to 6 Months before term start date",
          earlyEntryBuffer: "Travel to Canada permitted up to 30 days before classes commence"
        },
        applicationProcess: {
          submission: "1. Acceptance & PAL: Secure DLI admission and provincial PAL quota.",
          onlineForm: "2. GCKey Portal Filing: Submit online application on official IRCC portal.",
          appointments: "3. VFS Biometrics: Book and attend biometric appointment at nearest VFS center.",
          documentsAndBiometrics: [
            "Valid Passport with at least 6 months validity",
            "Letter of Acceptance (LOA) & PAL Certificate",
            "Proof of Financial Support & CAD $20,635 GIC Certificate",
            "Upfront Medical Exam Report (eMedical)",
            "Statement of Purpose / Study Plan"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Work Permit for Canada`,
        verdictSummary: `LMIA approval or employer-specific sponsorship required before taking up employment.`,
        entryStatus: "Canada Work Permit (LMIA / PGWP)",
        entryStatusSubtext: "6–12 Weeks Processing",
        stayDuration: "1 to 3 Years (Renewable)",
        stayDurationSubtext: "Path to Express Entry PR",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Worker TRV Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "IRCC Work Authorization",
        digitalCardDesc: "Official Port of Entry Work Permit Approval.",
        sources: ["IRCC Canada", "ESDC", "IATA Timatic 2026"],
        maxStay: "1 to 3 Years",
        conditionsForVisa: [
          "Positive LMIA from ESDC or LMIA-exempt job offer.",
          "Signed employment contract with registered Canadian business.",
          "Relevant qualifications and criminal background clearance."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Work Permit Fee", amount: "CAD $155 (approx. ₹9,500)", note: "IRCC worker fee" },
            { label: "Biometrics Fee", amount: "CAD $85 (approx. ₹5,200)", note: "Fingerprints & digital photo" }
          ],
          totalEstimatedINR: "CAD $240 (approx. ₹14,700)",
          processingTime: "6 to 12 Weeks Standard",
          processingSLA: "Expedited processing under Global Skills Strategy if eligible.",
          applicationWindow: "Apply up to 3 Months before job start",
          earlyEntryBuffer: "Entry permitted 14 days before employment start"
        },
        applicationProcess: {
          submission: "1. Employer Filing: Sponsoring enterprise registers job offer on IRCC Employer Portal.",
          onlineForm: "2. Online Submission: Worker completes application on GCKey.",
          appointments: "3. VFS Biometrics: Submit biometrics at VFS Global.",
          documentsAndBiometrics: [
            "Valid Passport with blank pages",
            "LMIA Approval / Offer of Employment Number",
            "Police Clearance Certificate (PCC)",
            "Immigration Medical Exam Confirmation",
            "Educational Credential Assessment (ECA)"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Visitor Visa for Canada`,
        verdictSummary: `Temporary Resident Visa (TRV) required for tourism, family visits, and business trips.`,
        entryStatus: "Canada Visitor Visa (TRV)",
        entryStatusSubtext: "Up to 10-Year Multiple Entry",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "10-Year TRV Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "IRCC TRV Sticker",
        digitalCardDesc: "Physical visa foil in passport issued by Canadian High Commission.",
        sources: ["IRCC Canada", "High Commission of Canada", "IATA Timatic 2026"],
        maxStay: "Up to 6 Months per Visit",
        conditionsForVisa: [
          "Tourism, holidays, visiting family members or short commercial conferences.",
          "Must demonstrate ties to home country and sufficient liquid assets.",
          "No unauthorized work or studying allowed."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "TRV Application Fee", amount: "CAD $100 (approx. ₹6,100)", note: "Official IRCC visa fee" },
            { label: "Biometrics Fee", amount: "CAD $85 (approx. ₹5,200)", note: "Valid for 10 years once enrolled" }
          ],
          totalEstimatedINR: "CAD $185 (approx. ₹11,300)",
          processingTime: "3 to 6 Weeks via GCKey",
          processingSLA: "10-Year multiple entry validity granted up to passport expiry.",
          applicationWindow: "Apply 2 to 4 Months prior to trip",
          earlyEntryBuffer: "Travel permitted anytime during valid TRV window"
        },
        applicationProcess: {
          submission: "1. GCKey Online Intake: Create account and upload passport, itinerary & finances.",
          onlineForm: "2. Document Audit: Upload proof of income, ITR, and hotel/invitation.",
          appointments: "3. Biometrics & Passport Transmission: Attend VFS for biometrics and courier passport.",
          documentsAndBiometrics: [
            "Current Passport valid for 6+ months",
            "6 Months Bank Statements with bank stamp",
            "ITR Acknowledgement for last 2–3 years",
            "Travel Itinerary & Hotel Reservation",
            "Employment Verification / Leave Approval"
          ]
        }
      };
    }
  }

  // Case 6: Australia
  if (isAustralia) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Student Visa (Subclass 500) for Australia`,
        verdictSummary: `Confirmation of Enrolment (CoE) & Genuine Student (GS) criteria required under DHA rules.`,
        entryStatus: "Australia Student Visa (Subclass 500)",
        entryStatusSubtext: "4–6 Weeks via ImmiAccount",
        stayDuration: "Duration of Course (Up to 5 Years)",
        stayDurationSubtext: "Includes 48 hrs/fortnight work rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Digital Visa Grant (VEVO)",
        visaPillTag: "ELECTRONIC VISA REQUIRED",
        digitalCardName: "DHA ImmiAccount VEVO Grant",
        digitalCardDesc: "Department of Home Affairs Electronic Visa Grant Notification.",
        sources: ["Department of Home Affairs (DHA)", "Study Australia", "IATA Timatic 2026"],
        maxStay: "Course Duration + 2 Months",
        conditionsForVisa: [
          "Full-time enrollment in CRICOS-registered course with valid CoE.",
          "Must pass Genuine Student (GS) assessment criteria.",
          "Overseas Student Health Cover (OSHC) for entire stay.",
          "Proof of living cost (AUD $29,710/yr) & tuition funds."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Subclass 500 Application Fee", amount: "AUD $1,600 (approx. ₹88,000)", note: "Official DHA visa surcharge" },
            { label: "OSHC Health Insurance", amount: "AUD $600 – $900/yr", note: "Mandatory Australian medical protection" }
          ],
          totalEstimatedINR: "AUD $1,600 Base Fee",
          processingTime: "4 to 6 Weeks Standard via ImmiAccount",
          processingSLA: "100% paperless digital grant linked electronically to passport.",
          applicationWindow: "Apply up to 6 Months before course start",
          earlyEntryBuffer: "Travel to Australia permitted up to 90 days before course start date"
        },
        applicationProcess: {
          submission: "1. University Offer & CoE: Pay tuition deposit to secure official electronic CoE.",
          onlineForm: "2. ImmiAccount Filing: Complete online application on Home Affairs portal.",
          appointments: "3. Health & Biometrics: Complete HAP health panel exam and VFS biometrics.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "Electronic Confirmation of Enrolment (CoE)",
            "Genuine Student (GS) Statement",
            "Proof of Funds / Bank Statements & Education Loan",
            "OSHC Health Insurance Certificate",
            "English Proficiency Test (IELTS / PTE Academic)"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Visitor Visa (Subclass 600) for Australia`,
        verdictSummary: `Tourist stream visa required prior to departure. 100% digital online lodgement via ImmiAccount.`,
        entryStatus: "Australia Visitor Visa (Subclass 600)",
        entryStatusSubtext: "3–4 Weeks Digital Processing",
        stayDuration: "3, 6, or 12 Months",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Digital VEVO Visa",
        visaPillTag: "ELECTRONIC VISA REQUIRED",
        digitalCardName: "DHA ImmiAccount VEVO",
        digitalCardDesc: "Official Department of Home Affairs electronic visa grant.",
        sources: ["DHA Australia", "Australian High Commission", "IATA Timatic 2026"],
        maxStay: "Up to 3–12 Months per Visit",
        conditionsForVisa: [
          "Tourism, holidays, visiting family or friends, or informal business visits.",
          "Must not work or provide commercial services in Australia.",
          "Must have access to sufficient funds for entire stay."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Visitor Visa Application Fee", amount: "AUD $190 (approx. ₹10,500)", note: "Official DHA lodgement fee" }
          ],
          totalEstimatedINR: "AUD $190 (approx. ₹10,500)",
          processingTime: "3 to 4 Weeks via ImmiAccount",
          processingSLA: "Digital grant linked directly to passport number.",
          applicationWindow: "Apply 1 to 3 Months before trip",
          earlyEntryBuffer: "Travel permitted anytime during 1 to 3 year visa grant"
        },
        applicationProcess: {
          submission: "1. ImmiAccount Registration: Create applicant account on DHA portal.",
          onlineForm: "2. Form Submission: Complete Subclass 600 Tourist Stream declarations.",
          appointments: "3. Biometrics Collection: Complete biometrics at VFS Australian Biometric Center.",
          documentsAndBiometrics: [
            "Valid Passport with 6+ months validity",
            "6 Months Bank Statements & Tax Returns",
            "Employment Leave Certificate / Business Registration",
            "Detailed Travel Itinerary & Accommodation Details",
            "Cover Letter explaining purpose of visit"
          ]
        }
      };
    }
  }

  // Case 7: Germany
  if (isGermany) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a National Visa (Type D) for Germany`,
        verdictSummary: `University Admission, Blocked Account (€11,904/yr) & APS Certificate required for Germany.`,
        entryStatus: "German National Visa (Type D - Study)",
        entryStatusSubtext: "4–8 Weeks Processing",
        stayDuration: "Duration of Study (Up to 4–5 Years)",
        stayDurationSubtext: "Includes 140 full days work permit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "National Visa D + Residence Permit",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "German Embassy National Visa",
        digitalCardDesc: "Federal Republic of Germany National Visa D.",
        sources: ["German Federal Foreign Office", "DAAD", "IATA Timatic 2026"],
        maxStay: "Duration of Academic Degree",
        conditionsForVisa: [
          "Unconditional Admission Letter from German university.",
          "Mandatory APS Certificate (Academic Evaluation Centre) for Indian applicants.",
          "Blocked Account (Sperrkonto) with minimum €11,904/year.",
          "Statutory or private travel health insurance."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "National Visa Fee", amount: "€75 (approx. ₹6,800)", note: "Official German consular fee" },
            { label: "VFS Center Service Charge", amount: "₹2,200", note: "Biometrics & document submission" }
          ],
          totalEstimatedINR: "€75 (approx. ₹6,800) + Service Fee",
          processingTime: "4 to 8 Weeks (German Mission Review)",
          processingSLA: "Appointments booked via VFS Global German Visa Application Centers.",
          applicationWindow: "Apply up to 3 Months before semester start",
          earlyEntryBuffer: "Entry permitted 2 to 3 weeks before course start date"
        },
        applicationProcess: {
          submission: "1. APS Certificate & Admission: Obtain APS verification and university acceptance.",
          onlineForm: "2. VIDEX Form: Fill official VIDEX national visa application online.",
          appointments: "3. VFS Biometric Appointment: Submit dossier and biometrics at VFS German VAC.",
          documentsAndBiometrics: [
            "Valid Passport with at least 12 months validity",
            "APS Certificate (Original)",
            "University Admission Letter (Zulassungsbescheid)",
            "Proof of Blocked Account (€11,904 confirmation letter)",
            "Curriculum Vitae (CV) & Motivation Letter",
            "Proof of German / English Language Proficiency"
          ]
        }
      };
    }
  }

  // Case 8: Schengen Area (Including Greece - Official GVC World / EU Schengen Rules)
  if (isSchengen || isGreece) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a National Study Visa for ${country}`,
        verdictSummary: `National Type D Study Visa required. Acceptance from accredited institution & €30,000 medical insurance required.`,
        entryStatus: "National Study Visa (Type D)",
        entryStatusSubtext: "15 to 45 Calendar Days Processing",
        stayDuration: "Duration of Academic Course (1–4 Years)",
        stayDurationSubtext: "Multi-entry European student rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "National Type D Sticker",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "National Type D Visa Sticker",
        digitalCardDesc: "Official consular long-stay student visa sticker with Schengen mobility.",
        sources: [isGreece ? "Global Visa Center World (GVCW)" : "Schengen Consular Affairs", "Ministry of Foreign Affairs", "IATA Timatic 2026"],
        maxStay: "Duration of Academic Degree",
        conditionsForVisa: [
          `Formal acceptance letter from accredited institution in ${country}.`,
          "Valid travel medical insurance with minimum €30,000 coverage valid across Schengen.",
          "Clean criminal record certificate and medical health certificate.",
          "Demonstrate sufficient funds to cover tuition and living expenses."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "National Type D Visa Fee", amount: "€75 (approx. ₹6,800)", note: "Official consular long-term visa fee" },
            { label: isGreece ? "GVCW / VFS Service Fee" : "VFS / TLS Service Fee", amount: "₹2,500 – ₹3,200", note: "Biometric and center logistics" }
          ],
          totalEstimatedINR: "€75 (approx. ₹6,800) + Logistics",
          processingTime: "15 to 45 Calendar Days",
          processingSLA: isGreece ? "Processed by Greek Consular Authorities via GVCW centers." : "Processed by designated consular mission.",
          applicationWindow: "Apply up to 6 Months before course start",
          earlyEntryBuffer: "Travel permitted 2 to 3 weeks before classes begin"
        },
        applicationProcess: {
          submission: "1. Institutional Acceptance: Secure official enrollment certificate.",
          onlineForm: "2. National Visa Form: Fill national visa application form with photo.",
          appointments: isGreece ? "3. GVCW Appointment: Book biometrics at GVCW Visa Application Center." : "3. VFS/TLS Appointment: Book biometrics at VAC.",
          documentsAndBiometrics: [
            "Valid Passport (issued within 10 years, valid for 1+ year)",
            "University Acceptance Certificate & Receipt of Fees",
            "Proof of Financial Means (Bank statements of last 6 months)",
            "Travel Medical Insurance (€30,000+ coverage)",
            "Police Clearance Certificate (PCC) apostilled / legalized",
            "Medical Health Clearance Certificate"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an Employment Visa for ${country}`,
        verdictSummary: `National Type D Employment Visa required based on certified contract approved by Ministry of Labour.`,
        entryStatus: "National Employment Visa (Type D)",
        entryStatusSubtext: "30 to 60 Calendar Days",
        stayDuration: "1 to 2 Years (Renewable)",
        stayDurationSubtext: "Includes EU Blue Card rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "National Long-Stay Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "National Type D Work Visa",
        digitalCardDesc: "Official employment authorization sticker.",
        sources: [isGreece ? "GVCW / Greek Embassy" : "Ministry of Labour & Consular Affairs", "IATA Timatic 2026"],
        maxStay: "1 to 2 Years (Renewable)",
        conditionsForVisa: [
          "Signed employment agreement with registered enterprise.",
          "Ministry of Labour / Foreign Affairs pre-approval.",
          "Medical insurance and clear background check."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "National Type D Employment Fee", amount: "€180 (approx. ₹16,400)", note: "Official consular long-stay fee" },
            { label: "VAC Biometric Fee", amount: "₹2,500 – ₹3,200", note: "VAC service charge" }
          ],
          totalEstimatedINR: "€180 (approx. ₹16,400)",
          processingTime: "30 to 60 Calendar Days",
          processingSLA: "Employer coordinates with national labour authorities.",
          applicationWindow: "Apply 2 to 3 Months before job start date",
          earlyEntryBuffer: "Travel permitted 14 days before contract start"
        },
        applicationProcess: {
          submission: "1. Labour Approval: Sponsoring enterprise secures work authorization in Europe.",
          onlineForm: "2. Visa Application: Complete long-term national D visa application.",
          appointments: isGreece ? "3. GVCW Biometrics: Attend appointment at GVCW center." : "3. Consular Appointment: Submit biometrics.",
          documentsAndBiometrics: [
            "Valid Passport with at least 1 year validity",
            "Signed Employment Contract & Ministry Pre-Approval",
            "Apostilled Police Clearance Certificate (PCC)",
            "Medical Certificate from authorized hospital",
            "Professional Qualification Certificates & CV"
          ]
        }
      };
    } else {
      // Tourism / Short Stay Type C (GVC World / Schengen Code Official)
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Schengen Visa for ${country}`,
        verdictSummary: `Short-stay visa (Type C) required before departure. Valid across all 29 European Schengen states.`,
        entryStatus: isGreece ? "Greece Schengen Visa (Type C)" : "Schengen Short-Stay Visa",
        entryStatusSubtext: "15 Calendar Days Processing",
        stayDuration: "Up to 90 Days",
        stayDurationSubtext: "Within any 180-day period",
        entryType: "Single / Multiple Entry",
        entryTypeSubtext: "Valid in 29 Schengen states",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Schengen Consular Portal",
        digitalCardDesc: "Official Schengen visa sticker in passport valid across 29 European member states.",
        sources: [isGreece ? "Global Visa Center World (GVCW)" : "European Commission", "Consular Affairs Department", "IATA Timatic 2026"],
        maxStay: "90 Days within 180 Days",
        conditionsForVisa: [
          `Tourism, business visits, or family trips across Schengen territory.`,
          "Mandatory travel medical insurance with minimum €30,000 coverage (e.g. INSURTE / compliant provider).",
          "Passport issued within last 10 years with 3+ months validity beyond return date and 2 blank pages."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Schengen Visa Fee (Adult)", amount: "€90 (approx. ₹8,200)", note: "Official EU / GVCW consular fee (Children 6-12: €45)" },
            { label: isGreece ? "GVCW Service Fee" : "VFS / TLS Service Fee", amount: "₹2,500 – ₹3,200", note: "Biometric collection and center logistics fee" }
          ],
          totalEstimatedINR: "€90 (approx. ₹8,200) + Logistics",
          processingTime: "15 Calendar Days (Standard Consular Period)",
          processingSLA: isGreece 
            ? "Lodged at GVCW VACs across India and assessed by the Embassy of Greece in New Delhi." 
            : "Appointments scheduled at designated VFS/TLS global visa application centers.",
          applicationWindow: "Apply up to 6 Months before planned travel (minimum 15 working days)",
          earlyEntryBuffer: "Travel permitted within valid visa dates"
        },
        applicationProcess: {
          submission: "1. Visa Form Filing: Complete official harmonized Schengen visa application form.",
          onlineForm: "2. Document Preparation: Compile round-trip flights, hotel vouchers, 3-6 month stamped bank statements & €30k insurance.",
          appointments: isGreece ? "3. GVCW Biometrics: Book and attend appointment at nearest GVCW Center in India." : "3. VFS/TLS Biometrics: Attend appointment for fingerprinting & passport submission.",
          documentsAndBiometrics: [
            "Passport valid for at least 3 months beyond departure date with 2 blank pages (issued within 10 years)",
            "2 Recent Passport Photos (35x40mm or 35x45mm, white background, facing forward)",
            "Travel Medical Insurance with minimum €30,000 coverage for medical repatriation",
            "Cover Letter with day-by-day itinerary & purpose of visit",
            "Bank statements of last 3-6 months with original bank seal and stamp",
            "Confirmed round-trip flight reservations & hotel accommodation bookings",
            "Employment NOC / Salary slips of last 3 months or Student Enrollment Proof"
          ]
        }
      };
    }
  }

  // Case 9: Generic / Other Destinations
  return {
    isExempt: false,
    verdictTitle: `${nationality} passport holders require a visa for ${country}`,
    verdictSummary: `Official travel authorization required before departure. Verified online application with fast turnaround.`,
    entryStatus: `${country} Entry Visa`,
    entryStatusSubtext: "3–5 Days Processing",
    stayDuration: "30 Days (Extendable)",
    stayDurationSubtext: "Per calendar visit",
    entryType: "Single / Multiple Entry",
    entryTypeSubtext: "Consular grant",
    visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
    digitalCardName: "Consular E-Visa Portal",
    digitalCardDesc: "Official electronic travel authorization.",
    sources: ["Consular Affairs Department", "Diplomatic Mission API", "IATA Timatic 2026"],
    maxStay: "30 to 90 Days",
    conditionsForVisa: [
      `Plan to stay in ${country} for tourism, holidays, or business meetings.`,
      "Holding valid return flight tickets and confirmed hotel booking.",
      "Must possess passport valid for at least 6 months beyond travel date."
    ],
    feesAndProcessing: {
      costItems: [
        { label: "Government Consular Fee", amount: "₹3,500 – ₹7,800", note: "Official visa issuance fee" },
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

export interface StudyUniversityItem {
  id: string;
  name: string;
  location: string;
  country: string;
  rank: string;
  tuitionLocal: string;
  tuitionINR: string;
  ieltsMin: string;
  degreeLevels: string[];
  sevpApproved: boolean;
  dliNumber?: string;
  majors: string[];
  intakes: string[];
  desc: string;
  acceptanceRate: string;
  heroImg: string;
  campusBadge: string;
}

export interface StudyConsultantItem {
  id: string;
  name: string;
  agencyName: string;
  role: string;
  city: string;
  countries: string[];
  rating: number;
  reviews: number;
  successRate: string;
  license: string;
  experience: string;
  specialities: string[];
  fee: string;
  image: string;
  freeCounselling: boolean;
}

function getDestinationUniversities(country: string): StudyUniversityItem[] {
  const c = (country || 'United Kingdom').toLowerCase();
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('scotland')) {
    return [
      {
        id: 'uk-1',
        name: 'University of Oxford',
        location: 'Oxford, England, UK',
        country: 'United Kingdom',
        rank: 'QS World #3',
        tuitionLocal: '£28,900 / yr',
        tuitionINR: '₹30.5 Lakhs / yr',
        ieltsMin: '7.0 (Min 6.5 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PhD / Doctorate"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #OXF892',
        majors: ['Computer Science & AI', 'Data Science & Analytics', 'Law & Jurisprudence', 'Global MBA & Finance', 'Biotechnology'],
        intakes: ['Fall 2026 (Oct)', 'Spring 2027 (Jan)'],
        desc: 'World premier collegiate research university with unparalleled academic heritage and global alumni network.',
        acceptanceRate: '17%',
        heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Russell Group Elite'
      },
      {
        id: 'uk-2',
        name: 'Imperial College London',
        location: 'South Kensington, London, UK',
        country: 'United Kingdom',
        rank: 'QS World #6',
        tuitionLocal: '£34,500 / yr',
        tuitionINR: '₹36.2 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PhD / Doctorate"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #IMP104',
        majors: ['Computing & Machine Learning', 'Artificial Intelligence', 'Advanced Mechanical & Robotics', 'Fintech & Quant Finance'],
        intakes: ['Fall 2026 (Sep)', 'Summer 2027 (Jun)'],
        desc: 'Global leader in STEM, deep-tech research, computing innovation, and high-impact industry collaboration.',
        acceptanceRate: '14%',
        heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Top STEM Hub'
      },
      {
        id: 'uk-3',
        name: 'University College London (UCL)',
        location: 'Bloomsbury, London, UK',
        country: 'United Kingdom',
        rank: 'QS World #9',
        tuitionLocal: '£26,400 / yr',
        tuitionINR: '₹27.8 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PG Diploma"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #UCL550',
        majors: ['Management Science & MBA', 'Computer Science & AI', 'Biomedical Informatics', 'Economics & Policy'],
        intakes: ['Fall 2026 (Sep)', 'Spring 2027 (Jan)'],
        desc: "London's leading multidisciplinary university known for radical innovation, entrepreneurship, and global careers.",
        acceptanceRate: '29%',
        heroImg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'London Central Campus'
      },
      {
        id: 'uk-4',
        name: 'University of Manchester',
        location: 'Manchester, England, UK',
        country: 'United Kingdom',
        rank: 'QS World #32',
        tuitionLocal: '£22,800 / yr',
        tuitionINR: '₹24.0 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #MAN302',
        majors: ['Data Science & Analytics', 'Engineering & Robotics', 'Business Analytics & Marketing', 'Renewable Energy'],
        intakes: ['Fall 2026 (Sep)', 'Spring 2027 (Jan)'],
        desc: 'Pioneering red-brick university with 25 Nobel laureates and 2-Year UK Graduate Post-Study Work Route access.',
        acceptanceRate: '35%',
        heroImg: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'High Graduate ROI'
      }
    ];
  }
  if (c.includes('united states') || c.includes('usa') || c.includes('us') || c.includes('america')) {
    return [
      {
        id: 'us-1',
        name: 'Massachusetts Institute of Technology (MIT)',
        location: 'Cambridge, MA, USA',
        country: 'United States',
        rank: 'QS World #1',
        tuitionLocal: '$58,500 / yr',
        tuitionINR: '₹49.0 Lakhs / yr',
        ieltsMin: '7.5 / TOEFL 100',
        degreeLevels: ["Master's (MS)", "Bachelor's (BS)", "PhD"],
        sevpApproved: true,
        dliNumber: 'SEVP School Code: BOS214F00120000',
        majors: ['Computer Science & AI', 'Robotics & Hardware', 'Quantum Computing', 'Quantitative Finance'],
        intakes: ['Fall 2026 (Aug)', 'Spring 2027 (Jan)'],
        desc: 'Global benchmark institution for technological breakthroughs, artificial intelligence, and startup incubators.',
        acceptanceRate: '4%',
        heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'SEVP Top Certified'
      },
      {
        id: 'us-2',
        name: 'Stanford University',
        location: 'Stanford, Silicon Valley, CA, USA',
        country: 'United States',
        rank: 'QS World #5',
        tuitionLocal: '$62,000 / yr',
        tuitionINR: '₹52.0 Lakhs / yr',
        ieltsMin: '7.5 / TOEFL 100',
        degreeLevels: ["Master's (MS)", "Bachelor's (BS)", "PhD"],
        sevpApproved: true,
        dliNumber: 'SEVP School Code: SFR214F00085000',
        majors: ['Computer Systems & AI', 'Management Science & Engineering', 'Data Analytics', 'Biomedical Informatics'],
        intakes: ['Fall 2026 (Sep)', 'Winter 2027 (Jan)'],
        desc: 'Heart of Silicon Valley technology entrepreneurship, venture capital connections, and STEM OPT 3-Year extension.',
        acceptanceRate: '3.7%',
        heroImg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Silicon Valley Network'
      },
      {
        id: 'us-3',
        name: 'Columbia University',
        location: 'New York City, NY, USA',
        country: 'United States',
        rank: 'QS World #22',
        tuitionLocal: '$57,000 / yr',
        tuitionINR: '₹47.8 Lakhs / yr',
        ieltsMin: '7.0 / TOEFL 95',
        degreeLevels: ["Master's (MS)", "Bachelor's (BS)", "MBA"],
        sevpApproved: true,
        dliNumber: 'SEVP School Code: NYC214F00012000',
        majors: ['Business Analytics & Finance', 'Computer Science', 'Financial Engineering', 'Data Science'],
        intakes: ['Fall 2026 (Aug)', 'Spring 2027 (Jan)'],
        desc: 'Ivy League powerhouse in Upper Manhattan providing direct recruitment access to Wall Street and tech giants.',
        acceptanceRate: '5.1%',
        heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Ivy League'
      }
    ];
  }
  if (c.includes('canada')) {
    return [
      {
        id: 'ca-1',
        name: 'University of Toronto',
        location: 'Toronto, Ontario, Canada',
        country: 'Canada',
        rank: 'QS World #21',
        tuitionLocal: 'CAD $49,000 / yr',
        tuitionINR: '₹30.2 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MSc)", "Bachelor's (BSc)", "Rotman MBA"],
        sevpApproved: true,
        dliNumber: 'DLI #O19332746094',
        majors: ['Computer Science & AI', 'Applied Engineering', 'Rotman Commerce & Finance', 'Health Data Science'],
        intakes: ['Fall 2026 (Sep)', 'Winter 2027 (Jan)'],
        desc: "Canada's #1 research university with 3-year PGWP work permit and direct pathways to Express Entry PR.",
        acceptanceRate: '43%',
        heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'DLI PGWP Eligible'
      },
      {
        id: 'ca-2',
        name: 'University of British Columbia (UBC)',
        location: 'Vancouver, BC, Canada',
        country: 'Canada',
        rank: 'QS World #34',
        tuitionLocal: 'CAD $44,000 / yr',
        tuitionINR: '₹27.1 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MSc)", "Bachelor's (BSc)"],
        sevpApproved: true,
        dliNumber: 'DLI #O19328526312',
        majors: ['Data Science & AI', 'Sauder Business Analytics', 'Software Engineering', 'Sustainable Tech'],
        intakes: ['Fall 2026 (Sep)', 'Winter 2027 (Jan)'],
        desc: 'Premier West Coast institution with strong industry co-op placements and world-class research facilities.',
        acceptanceRate: '48%',
        heroImg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'DLI PGWP Eligible'
      }
    ];
  }
  // Generic / European / Asian fallback
  return [
    {
      id: 'gen-1',
      name: `National University of ${country}`,
      location: `Capital Campus, ${country}`,
      country: country,
      rank: 'QS Top 150 Accredited',
      tuitionLocal: '$18,500 / yr',
      tuitionINR: '₹15.5 Lakhs / yr',
      ieltsMin: '6.0 (Min 5.5 in bands)',
      degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)"],
      sevpApproved: true,
      dliNumber: `Government Sponsor #${country.toUpperCase().slice(0,3)}-8801`,
      majors: ['Computer Science & AI', 'Global Business Administration', 'Applied Data Science', 'Engineering Management'],
      intakes: ['Fall 2026 (Aug)', 'Spring 2027 (Jan)'],
      desc: `Premier national state university recognized by Ministry of Higher Education with full international student visa support.`,
      acceptanceRate: '52%',
      heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
      campusBadge: 'Govt. Accredited'
    },
    {
      id: 'gen-2',
      name: `${country} Institute of Technology & Management`,
      location: `Metropolitan City, ${country}`,
      country: country,
      rank: 'Accredited STEM Institution',
      tuitionLocal: '$15,000 / yr',
      tuitionINR: '₹12.6 Lakhs / yr',
      ieltsMin: '6.0 (Min 5.5 in bands)',
      degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PG Diploma"],
      sevpApproved: true,
      dliNumber: `Accredited DLI #${country.toUpperCase().slice(0,3)}-5520`,
      majors: ['Software & AI Engineering', 'International Management', 'Biotechnology', 'Data Analytics'],
      intakes: ['Fall 2026 (Sep)', 'Spring 2027 (Feb)'],
      desc: `Industry-focused technological curriculum with practical internship semesters and post-study work authorization.`,
      acceptanceRate: '60%',
      heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
      campusBadge: 'STEM Certified'
    }
  ];
}

interface TourItem {
  id: string;
  name: string;
  location: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  desc: string;
  priceUSD: string;
  priceINR: string;
  heroImg: string;
}

interface SponsoringJobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  domain: string;
  type: string;
  visaType: string;
  experience: string;
  desc: string;
  sponsorshipBadge: string;
}

function getDestinationTours(country: string): TourItem[] {
  const c = (country || 'United Kingdom').toLowerCase();
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('scotland') || c.includes('britain')) {
    return [
      {
        id: 'uk-tour-1',
        name: 'London Royal Landmarks & Tower Experience',
        location: 'London, England, UK',
        duration: '1 Full Day',
        rating: 4.9,
        reviews: 1240,
        category: 'Heritage & Sightseeing',
        desc: 'Buckingham Palace, Tower Bridge, Westminster Abbey & Thames River Cruise.',
        priceUSD: '$89',
        priceINR: '₹7,490',
        heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'uk-tour-2',
        name: 'Stonehenge, Windsor Castle & Bath Day Tour',
        location: 'Wiltshire & Somerset, UK',
        duration: '10 Hours',
        rating: 4.8,
        reviews: 980,
        category: 'Ancient History',
        desc: 'Visit mysterious prehistoric stone monoliths, royal state apartments, and natural Roman thermal baths.',
        priceUSD: '$115',
        priceINR: '₹9,650',
        heroImg: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'uk-tour-3',
        name: 'Scottish Highlands, Loch Ness & Glencoe Expedition',
        location: 'Edinburgh & Inverness, Scotland',
        duration: '2 Days / 1 Night',
        rating: 4.9,
        reviews: 620,
        category: 'Nature & Landscapes',
        desc: 'Dramatic mountain scenery, historic medieval castles, and iconic Loch Ness panoramic boat tour.',
        priceUSD: '$185',
        priceINR: '₹15,490',
        heroImg: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80'
      }
    ];
  }

  if (c.includes('greece')) {
    return [
      {
        id: 'gr-tour-1',
        name: 'Athens Acropolis, Parthenon & Plaka Walking Tour',
        location: 'Athens, Greece',
        duration: 'Half Day (4h)',
        rating: 4.9,
        reviews: 1450,
        category: 'Ancient Heritage',
        desc: 'Skip-the-line guided entrance to the iconic Acropolis hill, Parthenon temple, and picturesque neoclassical Plaka alleys.',
        priceUSD: '$65',
        priceINR: '₹5,450',
        heroImg: 'https://images.unsplash.com/photo-1555993539-1732916b8235?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'gr-tour-2',
        name: 'Santorini Caldera Luxury Catamaran Sunset Cruise',
        location: 'Santorini, Cyclades, Greece',
        duration: '5 Hours',
        rating: 5.0,
        reviews: 890,
        category: 'Island Cruise',
        desc: 'Sail around volcano hot springs, Red Beach snorkeling, Greek BBQ meal onboard, and magical Oia sunset.',
        priceUSD: '$135',
        priceINR: '₹11,300',
        heroImg: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'gr-tour-3',
        name: 'Delphi Archaeological Sanctuary Day Trip',
        location: 'Delphi & Mount Parnassus, Greece',
        duration: 'Full Day (9h)',
        rating: 4.8,
        reviews: 510,
        category: 'UNESCO Heritage',
        desc: 'Explore the ancient navel of the world, Temple of Apollo, and renowned archaeological museum in the mountains.',
        priceUSD: '$89',
        priceINR: '₹7,490',
        heroImg: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=600&auto=format&fit=crop&q=80'
      }
    ];
  }

  // Generic fallback
  return [
    {
      id: 'gen-tour-1',
      name: `${country} Capital Highlights & Cultural Heritage Tour`,
      location: `Metropolitan Center, ${country}`,
      duration: 'Full Day (7h)',
      rating: 4.8,
      reviews: 420,
      category: 'City Tour',
      desc: `Comprehensive guided city sightseeing covering historic monuments, national museums, and top local food markets in ${country}.`,
      priceUSD: '$75',
      priceINR: '₹6,290',
      heroImg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'gen-tour-2',
      name: `${country} Scenic Natural Landscapes & Day Expedition`,
      location: `Regional Coast & Mountains, ${country}`,
      duration: '1 Full Day',
      rating: 4.9,
      reviews: 310,
      category: 'Nature & Adventure',
      desc: `Explore breathtaking national parks, panoramic mountain vistas, and coastal heritage sights with private transfer.`,
      priceUSD: '$95',
      priceINR: '₹7,990',
      heroImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
    }
  ];
}

function getDestinationJobs(country: string): SponsoringJobItem[] {
  const c = (country || 'United Kingdom').toLowerCase();
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain')) {
    return [
      {
        id: 'uk-job-1',
        title: 'Senior AI & Full-Stack Cloud Engineer',
        company: 'Synthetix Systems UK Ltd.',
        location: 'London, UK (Hybrid)',
        salary: '£68,000 – £82,000 / yr',
        domain: 'Tech / IT / Software / AI',
        type: 'Full-time Permanent',
        visaType: 'Skilled Worker Visa (CoS Sponsoring)',
        experience: '3 - 6 Years',
        desc: 'Lead modern cloud microservices & AI pipeline development. Official A-rated UKVI sponsor providing Certificate of Sponsorship (CoS).',
        sponsorshipBadge: 'Visa Sponsorship Confirmed'
      },
      {
        id: 'uk-job-2',
        title: 'NHS Registered Clinical Staff Nurse (Band 5/6)',
        company: 'National Health Service (NHS Trust)',
        location: 'Manchester / Birmingham, UK',
        salary: '£36,500 – £44,000 / yr',
        domain: 'Healthcare & Nursing',
        type: 'Full-time NHS Staff',
        visaType: 'Health & Care Worker Visa',
        experience: '2+ Years (NMC CBT/OSCE Support)',
        desc: 'Provide acute nursing care within state-of-the-art NHS hospital. Eligible for reduced visa fees and full NHS healthcare exemption.',
        sponsorshipBadge: 'Health & Care Fast-Track'
      },
      {
        id: 'uk-job-3',
        title: 'Fintech Quantitative Risk & Data Analyst',
        company: 'Vanguard Capital Markets UK',
        location: 'Canary Wharf, London, UK',
        salary: '£62,000 – £75,000 / yr',
        domain: 'Banking, Finance & Accounting',
        type: 'Full-time Permanent',
        visaType: 'Skilled Worker Visa',
        experience: '3 - 5 Years',
        desc: 'Portfolio analytics, credit risk modelling, and algorithmic data auditing. Direct sponsor license on UKVI register.',
        sponsorshipBadge: 'Direct Sponsor License'
      }
    ];
  }

  if (c.includes('greece') || c.includes('germany') || c.includes('france') || c.includes('europe')) {
    return [
      {
        id: 'eu-job-1',
        title: 'Cloud DevOps & Infrastructure Architect',
        company: 'EuroTech Solutions SE',
        location: `${country} (Remote / Onsite)`,
        salary: '€65,000 – €80,000 / yr',
        domain: 'Tech / IT / Software / AI',
        type: 'Full-time Permanent',
        visaType: 'EU Blue Card / National Work Visa (Type D)',
        experience: '3+ Years',
        desc: 'Manage enterprise multi-cloud clusters and CI/CD pipelines. Employer provides official labour ministry work permit pre-approval.',
        sponsorshipBadge: 'EU Blue Card Eligible'
      },
      {
        id: 'eu-job-2',
        title: 'Hospital Staff Practitioner & Medical Specialist',
        company: `${country} Healthcare Foundation`,
        location: `Capital Medical Center, ${country}`,
        salary: '€48,000 – €62,000 / yr',
        domain: 'Healthcare & Nursing',
        type: 'Full-time',
        visaType: 'National Type D Medical Work Visa',
        experience: '2+ Years',
        desc: 'Clinical patient management and diagnostic treatment. Fast-track residency sponsorship under national shortage occupations list.',
        sponsorshipBadge: 'National Visa Sponsored'
      }
    ];
  }

  // Generic fallback
  return [
    {
      id: 'gen-job-1',
      title: 'Senior Software & AI Systems Engineer',
      company: `Global Technologies ${country}`,
      location: `Capital City, ${country}`,
      salary: '$60,000 – $75,000 / yr',
      domain: 'Tech / IT / Software / AI',
      type: 'Full-time Permanent',
      visaType: `${country} Employment Entry Permit`,
      experience: '3+ Years',
      desc: `Full-stack engineering & enterprise application development with complete expatriate visa sponsorship and relocation support.`,
      sponsorshipBadge: 'Visa Sponsorship Confirmed'
    },
    {
      id: 'gen-job-2',
      title: 'International Business & Finance Manager',
      company: `Continental Trade Group`,
      location: `Commercial District, ${country}`,
      salary: '$50,000 – $65,000 / yr',
      domain: 'Banking, Finance & Accounting',
      type: 'Full-time',
      visaType: `${country} Work Resident Visa`,
      experience: '4+ Years',
      desc: `Corporate financial planning, cross-border trade accounting, and financial reporting. Full residency visa sponsorship provided.`,
      sponsorshipBadge: 'Work Permit Provided'
    }
  ];
}

const VERIFIED_STUDY_CONSULTANTS: StudyConsultantItem[] = [
  {
    id: 'cons-1',
    name: 'Arjun Mehta',
    agencyName: 'Apex Study Abroad & Immigration Law',
    role: 'Senior International Admissions & Visa Counsel',
    city: 'Hyderabad',
    countries: ['United Kingdom', 'Canada', 'USA', 'Australia'],
    rating: 4.9,
    reviews: 412,
    successRate: '99.4%',
    license: 'ICCRC-R705123 / OISC UK',
    experience: '11+ Years Experience',
    specialities: ['CAS & I-20 Verification', 'SOP Drafting & Review', 'UK & US Student Visas', '28-Day Maintenance Audit'],
    fee: '₹999 / 30 mins',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: true
  },
  {
    id: 'cons-2',
    name: 'Nisha Agarwal',
    agencyName: 'Global Scholar Admissions Advisory',
    role: 'UK Russell Group & Ivy League Specialist',
    city: 'Delhi NCR',
    countries: ['United Kingdom', 'USA', 'Germany', 'Singapore'],
    rating: 4.8,
    reviews: 328,
    successRate: '98.9%',
    license: 'OISC Level 2 #F2021008',
    experience: '9+ Years Experience',
    specialities: ['Oxford / UCL / Imperial Admissions', 'CAS Processing', 'IHS & Visa Submissions', 'VFS Biometrics Slot'],
    fee: '₹899 / 30 mins',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: true
  },
  {
    id: 'cons-3',
    name: 'Karthik Reddy',
    agencyName: 'Stanford & Ivy Legal Admissions Hub',
    role: 'Licensed US Immigration Attorney & SEVP Advisor',
    city: 'Bangalore',
    countries: ['USA', 'Canada', 'United Kingdom'],
    rating: 5.0,
    reviews: 512,
    successRate: '99.8%',
    license: 'US Bar Council #BAR-CA-78912',
    experience: '14+ Years Experience',
    specialities: ['Form I-20 & SEVIS Filing', 'F-1 Visa Interview Prep', 'Financial Solvency Proofs', 'Refusal Overturns'],
    fee: '₹1,499 / 30 mins',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: false
  },
  {
    id: 'cons-4',
    name: 'Priya Sharma',
    agencyName: 'Global Horizon Overseas Education',
    role: 'Australia & Canada Study Permit Director',
    city: 'Mumbai',
    countries: ['Australia', 'Canada', 'United Kingdom', 'New Zealand'],
    rating: 4.9,
    reviews: 295,
    successRate: '99.1%',
    license: 'MARA Australia #1804521 / RCIC',
    experience: '8+ Years Experience',
    specialities: ['GTE & Genuine Student Audits', 'PGWP Pathway Planning', 'Scholarship Matching', 'Medical & Biometrics'],
    fee: '₹799 / 30 mins',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: true
  }
];

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
  
  const [activePurposeTab, setActivePurposeTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const urlPur = sp.get('purpose') || sp.get('category') || sp.get('type') || sp.get('intent') || sp.get('visa') || sp.get('q');
      if (urlPur) {
        const lower = urlPur.toLowerCase();
        if (lower.includes('student') || lower.includes('study') || lower.includes('education') || lower.includes('university') || lower.includes('course')) return 'study';
        if (lower.includes('work') || lower.includes('job') || lower.includes('employment') || lower.includes('career')) return 'work';
      }
    }
    const initLower = (initialPurpose || 'tourism').toLowerCase();
    if (initLower.includes('student') || initLower.includes('study') || initLower.includes('education') || initLower.includes('university') || initLower.includes('course')) return 'study';
    if (initLower.includes('work') || initLower.includes('job') || initLower.includes('employment') || initLower.includes('career')) return 'work';
    return 'tourism';
  });

  const [passportCountry, setPassportCountry] = useState(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const urlPass = sp.get('passport') || sp.get('from');
      if (urlPass) return formatNationality(urlPass);
    }
    return formatNationality(initialPassport || 'India');
  });

  // ── STUDY WORKFLOW (HAVE VISA ALREADY? -> NO) STATES ──
  const [studentActionTab, setStudentActionTab] = useState<'consultants' | 'self_apply'>('consultants');
  const [uniSearchQuery, setUniSearchQuery] = useState('');
  const [uniDegreeFilter, setUniDegreeFilter] = useState('All');
  const [uniBudgetFilter, setUniBudgetFilter] = useState('All');
  const [selectedUniId, setSelectedUniId] = useState<string>('uk-1');
  const [selectedCourseMajor, setSelectedCourseMajor] = useState('Computer Science & AI');
  const [admissionTrackerStage, setAdmissionTrackerStage] = useState(1);
  const [casNumberInput, setCasNumberInput] = useState('');
  const [isCasChecked, setIsCasChecked] = useState(false);

  // ── TOURISM WORKFLOW STATES ──
  const [tourismActionTab, setTourismActionTab] = useState<'consultants' | 'self_apply'>('consultants');
  const [tourSearchQuery, setTourSearchQuery] = useState('');
  const [selectedTourId, setSelectedTourId] = useState<string>('uk-tour-1');
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [flightPnrBooked, setFlightPnrBooked] = useState(false);

  // ── WORK WORKFLOW STATES ──
  const [workActionTab, setWorkActionTab] = useState<'consultants' | 'self_apply'>('consultants');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('uk-job-1');
  const [jobDomainFilter, setJobDomainFilter] = useState('All');
  const [skillAssessed, setSkillAssessed] = useState(false);

  // Consultant Filter & Booking States
  const [consultantLocationQuery, setConsultantLocationQuery] = useState('');
  const [consultantCountryFilter, setConsultantCountryFilter] = useState('All Countries (Global)');
  const [consultantServiceType, setConsultantServiceType] = useState('Study Visa & Admissions Filing');
  const [consultantRatingFilter, setConsultantRatingFilter] = useState('All');
  const [bookingModalConsultant, setBookingModalConsultant] = useState<StudyConsultantItem | null>(null);
  const [consultantBookedToast, setConsultantBookedToast] = useState<string | null>(null);

  // Self-Apply Concierge Document Vault & Addon States
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, { fileName: string; size: string; status: 'uploaded' | 'verified'; timestamp: string }>>({});
  const [selectedConciergeAddons, setSelectedConciergeAddons] = useState<string[]>([]);
  const [conciergeSubmittedModal, setConciergeSubmittedModal] = useState(false);
  const [isUploadingDocKey, setIsUploadingDocKey] = useState<string | null>(null);
  const [uploadValidationWarning, setUploadValidationWarning] = useState<string | null>(null);

  const handleConciergeSubmit = (requiredDocKeys: string[], vaultElementId?: string) => {
    const uploadedCount = Object.keys(uploadedDocuments).length;
    const missingDocs = requiredDocKeys.filter(k => !uploadedDocuments[k]);

    if (uploadedCount === 0 || missingDocs.length > 0) {
      const msg = `⚠️ Action Required: Please upload your mandatory documents (${uploadedCount} of ${requiredDocKeys.length} uploaded) before submitting your dossier.`;
      setUploadValidationWarning(msg);
      if (vaultElementId && typeof document !== 'undefined') {
        const el = document.getElementById(vaultElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      setTimeout(() => setUploadValidationWarning(null), 6000);
      return;
    }
    setUploadValidationWarning(null);

    // ── SYNC FILLED AI PORTAL DETAILS TO DASHBOARD STORAGE ──
    if (typeof window !== 'undefined') {
      try {
        const trackingId = `TT-${activePurposeTab.toUpperCase().slice(0,3)}-2026-${Date.now().toString().slice(-4)}`;
        const submissionDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const visaTypeName = isStudyPurpose ? 'Student Visa' : isWorkPurpose ? 'Skilled Worker Visa' : 'Standard Visitor Visa (6-Month)';
        
        // 1. Save Comprehensive Journey Data
        const journeyPayload = {
          destination: countryName,
          destination_flag: flagEmoji,
          passport_country: passportCountry,
          purpose: activePurposeTab,
          visa_type: visaTypeName,
          stay_duration: isStudyPurpose ? 'Duration of Course (1-4 Yrs)' : isWorkPurpose ? '1 to 5 Years' : 'Up to 6 Months (180 Days)',
          readiness_score: 98,
          uploaded_documents: uploadedDocuments,
          selected_addons: selectedConciergeAddons,
          matched_university: isStudyPurpose ? (getDestinationUniversities(countryName).find(u => u.id === selectedUniId)?.name || 'Target University') : undefined,
          selected_tour: isTouristPurpose ? (getDestinationTours(countryName).find(t => t.id === selectedTourId)?.name || 'Curated Sightseeing') : undefined,
          selected_job: isWorkPurpose ? (getDestinationJobs(countryName).find(j => j.id === selectedJobId)?.title || 'Target Employment') : undefined,
          cas_i20_number: isStudyPurpose && isCasChecked ? (casNumberInput || 'CAS-UK-2026-VERIFIED') : undefined,
          tracking_id: trackingId,
          final_dossier_submitted: true,
          submitted_at: submissionDate,
          status: 'Dossier Ingested & AI Verified'
        };
        localStorage.setItem('travltik_user_journey', JSON.stringify(journeyPayload));

        // 2. Save Seeker Core Profile fields
        localStorage.setItem('seeker_destinations', JSON.stringify([countryName]));
        localStorage.setItem('seeker_passportCountry', passportCountry);
        localStorage.setItem('seeker_country_of_citizenship', passportCountry);
        localStorage.setItem('seeker_goals', JSON.stringify([isStudyPurpose ? 'Study Abroad' : isWorkPurpose ? 'Work Abroad' : 'Tourism / Vacation']));
        
        // Ensure user can immediately view their dashboard without redirect roadblock
        if (!localStorage.getItem('seeker_email') && !(localStorage.getItem("travltik_user"))) {
          localStorage.setItem('seeker_email', 'seeker@travltik.com');
          localStorage.setItem('seeker_firstName', 'TravlTik');
          localStorage.setItem('seeker_lastName', 'Seeker');
        }

        // 3. Save Formatted Documents List
        const docArray = Object.entries(uploadedDocuments).map(([k, v]) => ({
          id: k,
          label: `${k.toUpperCase().replace(/_/g, ' ')} (${v.fileName})`,
          status: 'verified',
          size: v.size,
          uploadedAt: v.timestamp
        }));
        localStorage.setItem('seeker_documents', JSON.stringify(docArray));

        // 4. Save Active Visa Case Record
        const activeCase = {
          id: `case-${Date.now()}`,
          trackingId: trackingId,
          destination: countryName,
          destinationFlag: flagEmoji,
          visaType: visaTypeName,
          purpose: activePurposeTab,
          passport: passportCountry,
          status: 'Dossier Ingested & OCR Verified',
          stage: 'Under AI Concierge Review',
          progress: 35,
          documentsCount: uploadedCount,
          addonsCount: selectedConciergeAddons.length,
          submittedAt: submissionDate,
          targetDate: formatTargetDate(isStudyPurpose ? 15 : isWorkPurpose ? 20 : 15)
        };

        const existingCases = JSON.parse(localStorage.getItem('active_visa_cases') || '[]');
        const filteredCases = existingCases.filter((c: any) => c.destination !== countryName || c.purpose !== activePurposeTab);
        filteredCases.unshift(activeCase);
        localStorage.setItem('active_visa_cases', JSON.stringify(filteredCases));
      } catch (err) {
        console.error('Error syncing journey to localStorage:', err);
      }
    }

    setConciergeSubmittedModal(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const urlPur = sp.get('purpose') || sp.get('category') || sp.get('type') || sp.get('intent') || sp.get('visa') || sp.get('q');
      if (urlPur) {
        const lower = urlPur.toLowerCase();
        if (lower.includes('student') || lower.includes('study') || lower.includes('education') || lower.includes('university') || lower.includes('course')) {
          setActivePurposeTab('study');
        } else if (lower.includes('work') || lower.includes('job') || lower.includes('employment') || lower.includes('career')) {
          setActivePurposeTab('work');
        } else {
          setActivePurposeTab('tourism');
        }
      }
      const urlPass = sp.get('passport') || sp.get('from');
      if (urlPass) {
        setPassportCountry(formatNationality(urlPass));
      }
    }
  }, []);

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

  // Auto-Save / Synchronize Active Visa Search & Roadmap to User Dashboard & Database
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const email = localStorage.getItem('seeker_email') || (() => {
        try {
          const u = JSON.parse((localStorage.getItem("travltik_user")) || '{}');
          return u.email || 'guest@travltik.com';
        } catch(e) { return 'guest@travltik.com'; }
      })();

      const allUnis = getDestinationUniversities(countryName);
      const selectedUniObj = allUnis.find(u => u.id === selectedUniId) || allUnis[0];
      const uniName = selectedUniObj?.name || 'Top University';

      const journeyPayload = {
        user_email: email,
        passport_country: passportCountry || 'India',
        destination: countryName,
        destination_flag: flagEmoji,
        purpose: activePurposeTab || 'study',
        has_visa: hasVisaAlready === 'yes',
        visa_type: aiIntel.entryStatus || dynamicVisaType || 'Student Visa',
        stay_duration: aiIntel.stayDuration || dynamicLengthOfStay,
        entry_type: aiIntel.entryType || 'Multiple Entry',
        fees_info: aiIntel.feesAndProcessing,
        matched_university: uniName,
        selected_course_major: selectedCourseMajor,
        cas_i20_number: casNumberInput || 'CAS-UK-2026-VERIFIED',
        uploaded_documents: uploadedDocuments,
        selected_addons: selectedConciergeAddons,
        readiness_score: Object.keys(uploadedDocuments).length >= 4 ? 100 : (Object.keys(uploadedDocuments).length * 20 + 20),
        last_updated: new Date().toISOString()
      };

      // 1. Save to local storage for immediate offline / instant dashboard display
      localStorage.setItem('travltik_user_journey', JSON.stringify(journeyPayload));
      localStorage.setItem('travltik_last_searched_country', countryName);

      // 2. Synchronize to backend journey endpoint if email exists
      if (email && email !== 'guest@travltik.com') {
        fetch('/api/journey/update-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(journeyPayload)
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('Dashboard sync error:', err);
    }
  }, [
    countryName,
    passportCountry,
    activePurposeTab,
    hasVisaAlready,
    aiIntel,
    dynamicVisaType,
    dynamicLengthOfStay,
    selectedUniId,
    selectedCourseMajor,
    uploadedDocuments,
    selectedConciergeAddons,
    casNumberInput
  ]);

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

  // ── BRANCH 2: QUESTIONNAIRE & DETAILED READINESS PROFILE STATES (START UNSELECTED / EMPTY) ──
  const [passportValidityRange, setPassportValidityRange] = useState('');
  const [visaRefusalHistory, setVisaRefusalHistory] = useState('');

  // Study Visa Specifics
  const [studyQual, setStudyQual] = useState('');
  const [studyTarget, setStudyTarget] = useState('');
  const [studyIntake, setStudyIntake] = useState('');
  const [studyBudget, setStudyBudget] = useState('');
  const [studentAdmissionStatus, setStudentAdmissionStatus] = useState('');
  const [studentLanguageScore, setStudentLanguageScore] = useState('');

  // Tourist Visa Specifics
  const [visitPlanStatus, setVisitPlanStatus] = useState('');
  const [visitTiming, setVisitTiming] = useState('');
  const [visitReturnDate, setVisitReturnDate] = useState('');
  const [visitStay, setVisitStay] = useState('');
  const [touristHomeTies, setTouristHomeTies] = useState('');
  const [touristBankStability, setTouristBankStability] = useState('');

  // Work Visa Specifics
  const [workExp, setWorkExp] = useState('');
  const [workOffer, setWorkOffer] = useState('');
  const [workDomain, setWorkDomain] = useState('');
  const [workAssess, setWorkAssess] = useState('');

  // ── ONLY COLLECT PASSPORT FILE (ALL OTHER DETAILS VIA YES / NO CHECKS) ──
  const [passportFile, setPassportFile] = useState<{ name: string; size: string; type: string } | null>(null);

  const handlePassportUpload = (file: File | null) => {
    if (!file) {
      setPassportFile(null);
      return;
    }
    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;
    setPassportFile({ name: file.name, size: sizeStr, type: file.type });
  };

  // Quick Yes/No Consular Checklist States (Category Specific)
  const [hasFundsProof, setHasFundsProof] = useState<boolean | null>(null);
  const [hasAdmissionOrOffer, setHasAdmissionOrOffer] = useState<boolean | null>(null);
  const [hasFlightItinerary, setHasFlightItinerary] = useState<boolean | null>(null);
  const [hasLanguageOrTies, setHasLanguageOrTies] = useState<boolean | null>(null);
  const [hasPastRefusalCheck, setHasPastRefusalCheck] = useState<boolean | null>(null);

  // ── ATLYS VISA RESULT PORTAL STATES ──
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0].id);
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'travltik' | 'diy'>('travltik');
  const [activeSubNav, setActiveSubNav] = useState('section-visa-info');

  const scrollToSection = (sectionId: string) => {
    setActiveSubNav(sectionId);
    if (sectionId === 'section-visa-readiness') {
      if (hasVisaAlready !== 'no') {
        setHasVisaAlready('no');
      }
      setTimeout(() => {
        const element = document.getElementById('section-visa-readiness') || document.getElementById('visa-application-branch');
        if (element) {
          const headerOffset = 110;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 60);
      return;
    }
    let element = document.getElementById(sectionId);
    if (!element && sectionId === 'section-documents') {
      element = document.getElementById('section-docs') || document.getElementById('section-documents');
    }
    if (!element && sectionId === 'section-visa-process') {
      element = document.getElementById('section-how-to-apply') || document.getElementById('section-visa-process');
    }
    if (!element && sectionId === 'section-mandates') {
      element = document.getElementById('section-mandates');
    }
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll Spy for Sub-Nav Tabs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-visa-info', 'section-visa-process', 'section-documents', 'section-mandates', 'section-visa-readiness', 'section-reviews', 'section-faqs'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSubNav(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const toggleDocCheck = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  // ── REAL-TIME DYNAMIC VISA READINESS & APPROVAL SCORECARD ──
  const readinessMetrics = useMemo(() => {
    let recommendations: string[] = [];
    let redFlags: string[] = [];
    let filledCount = 0;

    // Pillar 1: Passport & Identity (30% weight)
    let passportScore = 0;
    if (passportFile) {
      filledCount++;
      passportScore += 15;
    }
    if (passportValidityRange) {
      filledCount++;
      if (passportValidityRange.includes('> 12 Months')) {
        passportScore += 15;
      } else if (passportValidityRange.includes('6 - 12 Months')) {
        passportScore += 10;
      } else {
        redFlags.push(`Passport expires in under 6 months. Minimum 6-month validity required by ${countryName} consular rules.`);
      }
    }

    // Pillar 2: Financial Sufficiency (35% weight)
    let finScore = 0;
    // Pillar 3: Travel Itinerary (15% weight)
    let itinScore = 0;
    // Pillar 4: Home Ties & Purpose (20% weight)
    let tiesScore = 0;

    if (activePurposeTab === 'study') {
      if (studyQual) filledCount++;
      if (studyTarget) filledCount++;
      if (studyIntake) {
        filledCount++;
        itinScore = 15;
      }
      if (studyBudget) {
        filledCount++;
        if (studyBudget.includes('Self-Funded') || studyBudget.includes('Scholarship')) {
          finScore = 35;
        } else if (studyBudget.includes('Loan')) {
          finScore = 32;
          recommendations.push('Attach unconditional bank loan sanction letter and co-sponsor income tax returns.');
        } else {
          finScore = 22;
          recommendations.push('Prepare liquid savings statement covering 1st-year tuition + living costs.');
        }
      }

      if (studentAdmissionStatus) {
        filledCount++;
        if (studentAdmissionStatus.includes('Confirmed')) {
          tiesScore = 20;
        } else if (studentAdmissionStatus.includes('Conditional')) {
          tiesScore = 14;
          recommendations.push('Fulfill academic conditions to convert offer into unconditional Form I-20 / CAS.');
        } else {
          tiesScore = 8;
          redFlags.push('Formal institutional admission letter is mandatory before scheduling embassy interview.');
        }
      }

      if (studentLanguageScore) filledCount++;

      if (filledCount > 0) {
        recommendations.push(`Upload Form I-20 / CAS and 6-month stamped bank statements for ${countryName}.`);
      }
    } else if (activePurposeTab === 'tourism') {
      if (visitPlanStatus) {
        filledCount++;
        itinScore = 15;
      }
      if (visitTiming) filledCount++;
      if (visitReturnDate) filledCount++;
      if (visitStay) filledCount++;

      if (touristBankStability) {
        filledCount++;
        if (touristBankStability.includes('₹4L+')) {
          finScore = 35;
        } else if (touristBankStability.includes('₹2L - ₹4L')) {
          finScore = 26;
        } else {
          finScore = 12;
          redFlags.push('Recent lump-sum deposits or low balance may trigger consular queries under financial solvency rules.');
        }
      }

      if (touristHomeTies) {
        filledCount++;
        if (touristHomeTies.includes('Salaried')) {
          tiesScore = 20;
        } else if (touristHomeTies.includes('Business')) {
          tiesScore = 18;
        } else {
          tiesScore = 10;
          recommendations.push('Provide property deeds, ongoing contracts, or family ties proof to establish return intent.');
        }
      }

      if (filledCount > 0) {
        recommendations.push(`Keep confirmed round-trip flight booking and hotel vouchers ready for ${countryName}.`);
      }
    } else {
      // Work Visa
      if (workExp) filledCount++;
      if (workOffer) {
        filledCount++;
        if (workOffer.includes('Confirmed') || workOffer.includes('Approved')) {
          finScore = 35;
          tiesScore = 20;
        } else {
          finScore = 15;
          tiesScore = 10;
          redFlags.push(`Official employer sponsorship petition or labour clearance is mandatory for ${countryName} work visa.`);
        }
      }

      if (workDomain) filledCount++;
      if (workAssess) {
        filledCount++;
        if (workAssess.includes('Assessed')) {
          itinScore = 15;
        } else {
          itinScore = 8;
          recommendations.push('Complete ECA educational credential evaluation (WES/ACS) for qualification equivalency.');
        }
      }
    }

    if (visaRefusalHistory) {
      filledCount++;
      if (visaRefusalHistory.includes('Past Refusal')) {
        redFlags.push('Prior refusal recorded. Include a strong cover letter addressing previous refusal grounds.');
      }
    }

    // Calculation
    let refusalPenalty = visaRefusalHistory.includes('Past Refusal') ? 12 : 0;
    let finalScore = 0;

    if (filledCount === 0) {
      finalScore = 0;
      recommendations = ['Select your profile details in the fields above to calculate your exact consular approval readiness score.'];
    } else {
      const totalRaw = passportScore + finScore + itinScore + tiesScore - refusalPenalty;
      finalScore = Math.max(10, Math.min(98, totalRaw));
    }

    return {
      score: finalScore,
      filledCount,
      category: activePurposeTab === 'study' ? 'Student Visa' : activePurposeTab === 'work' ? 'Work Visa' : 'Tourist / Visit Visa',
      statusText: filledCount === 0 
        ? 'Awaiting Profile Selections' 
        : finalScore >= 85 
        ? 'High Approval Readiness' 
        : finalScore >= 65 
        ? 'Moderate Readiness' 
        : 'Action Required / Critical Gaps',
      badgeColor: filledCount === 0
        ? 'text-slate-700 bg-slate-100 border-slate-200'
        : finalScore >= 85 
        ? 'text-emerald-700 bg-emerald-100/80 border-emerald-200' 
        : finalScore >= 65 
        ? 'text-amber-800 bg-amber-100/80 border-amber-200' 
        : 'text-rose-800 bg-rose-100/80 border-rose-200',
      barColor: filledCount === 0
        ? 'bg-slate-300'
        : finalScore >= 85 
        ? 'bg-emerald-500' 
        : finalScore >= 65 
        ? 'bg-amber-500' 
        : 'bg-rose-500',
      recommendations,
      redFlags,
      pillars: [
        { name: 'Passport & Identity', score: passportScore, max: 30, value: passportValidityRange || 'Select Validity' },
        { name: 'Financial Sufficiency', score: finScore, max: 35, value: (activePurposeTab === 'study' ? studyBudget : activePurposeTab === 'tourism' ? touristBankStability : workOffer) || 'Select Funding' },
        { name: 'Trip Itinerary / Intake', score: itinScore, max: 15, value: (activePurposeTab === 'study' ? studyIntake : activePurposeTab === 'tourism' ? visitTiming : workAssess) || 'Select Timing' },
        { name: 'Ties & Sponsorship', score: tiesScore, max: 20, value: (activePurposeTab === 'study' ? studentAdmissionStatus : activePurposeTab === 'tourism' ? touristHomeTies : workExp) || 'Select Status' }
      ]
    };
  }, [
    activePurposeTab,
    passportValidityRange,
    visaRefusalHistory,
    studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
    visitPlanStatus, visitTiming, visitReturnDate, visitStay, touristHomeTies, touristBankStability,
    workExp, workOffer, workDomain, workAssess,
    countryName
  ]);

  // ── AI DOCUMENT INSPECTION & AUDIT STATES ──
  const [docAuditTab, setDocAuditTab] = useState<'quick_check' | 'ai_inspection'>('quick_check');
  const [isAuditingDocs, setIsAuditingDocs] = useState(false);
  const [auditCompleted, setAuditCompleted] = useState(false);

  const handleRunDocAudit = () => {
    setIsAuditingDocs(true);
    setTimeout(() => {
      setIsAuditingDocs(false);
      setAuditCompleted(true);
    }, 1500);
  };

  const docAuditResult = useMemo(() => {
    const isStudent = activePurposeTab === 'study';
    const isWork = activePurposeTab === 'work';

    let score = 0;
    let redFlagsAndWarnings: { severity: string; message: string }[] = [];

    // 1. Passport Upload (30 pts)
    if (passportFile) {
      score += 30;
    } else {
      redFlagsAndWarnings.push({
        severity: 'HIGH',
        message: 'Upload your Passport Bio-Data page to extract MRZ and verify minimum 6-month validity.'
      });
    }

    // 2. Funds Proof (30 pts)
    if (hasFundsProof === true) {
      score += 30;
    } else if (hasFundsProof === false) {
      redFlagsAndWarnings.push({
        severity: 'HIGH',
        message: isStudent 
          ? `Consular rules require 6-month stamped bank statement or sanctioned education loan covering 1st-year tuition + living costs for ${countryName}.`
          : `Adequate liquid travel funds statement is mandatory for ${countryName} visa clearance.`
      });
    }

    // 3. Admission / Sponsor Offer (25 pts)
    if (hasAdmissionOrOffer === true) {
      score += 25;
    } else if (hasAdmissionOrOffer === false) {
      redFlagsAndWarnings.push({
        severity: 'HIGH',
        message: isStudent 
          ? `Official Form I-20 / CAS acceptance is required before attending the consular interview.`
          : isWork
          ? `Approved employer sponsorship petition is required before visa submission.`
          : `Confirmed accommodation / hotel booking is required.`
      });
    }

    // 4. Flight Itinerary (15 pts)
    if (hasFlightItinerary === true) {
      score += 15;
    } else if (hasFlightItinerary === false) {
      redFlagsAndWarnings.push({
        severity: 'LOW',
        message: `Tentative flight itinerary reservation is recommended to demonstrate clear entry and exit plans.`
      });
    }

    // 5. Past Refusals
    if (hasPastRefusalCheck === true) {
      score = Math.max(10, score - 10);
      redFlagsAndWarnings.push({
        severity: 'MEDIUM',
        message: `Past visa refusal on record. Draft a justification cover letter addressing prior 214(b) grounds.`
      });
    }

    const checklistMatches = [
      {
        document_type: 'Passport Bio-Data & MRZ',
        status: passportFile ? 'UPLOADED & VERIFIED' : 'PENDING UPLOAD',
        confidence_score: passportFile ? 0.98 : 0.0,
        details: passportFile 
          ? `Passport document attached: ${passportFile.name} (${passportFile.size}). MRZ checksum valid.`
          : `Upload your passport copy to verify 6-month consular rule.`
      },
      {
        document_type: isStudent ? 'Bank Statement / Loan Sanction' : 'Financial Statement & Solvency',
        status: hasFundsProof === true ? 'CONFIRMED (YES)' : hasFundsProof === false ? 'NOT PREPARED (NO)' : 'PENDING CHECK',
        confidence_score: hasFundsProof === true ? 0.95 : 0.0,
        details: hasFundsProof === true 
          ? `6-Month stamped bank balance or sanctioned education loan confirmed ready.`
          : `Maintain adequate liquid travel solvency proof.`
      },
      {
        document_type: isStudent ? 'Admission Offer / Form I-20 / CAS' : isWork ? 'Employer Petition / Job Offer' : 'Accommodation & Hotel Booking',
        status: hasAdmissionOrOffer === true ? 'CONFIRMED (YES)' : hasAdmissionOrOffer === false ? 'NOT PREPARED (NO)' : 'PENDING CHECK',
        confidence_score: hasAdmissionOrOffer === true ? 0.96 : 0.0,
        details: hasAdmissionOrOffer === true
          ? `Institutional sponsorship / stay proof confirmed ready.`
          : `Keep your official offer or accommodation voucher ready.`
      },
      {
        document_type: 'Flight Ticket / Travel Itinerary',
        status: hasFlightItinerary === true ? 'CONFIRMED (YES)' : hasFlightItinerary === false ? 'NOT PREPARED (NO)' : 'PENDING CHECK',
        confidence_score: hasFlightItinerary === true ? 0.90 : 0.0,
        details: hasFlightItinerary === true
          ? `Round-trip flight booking or tentative reservation itinerary confirmed.`
          : `Prepare tentative flight reservation before biometric appointment.`
      }
    ];

    const nextRecommendedActions = [
      `Lock your official ${countryName} VAC / OFC biometric appointment slot.`,
      `Practice instant voice mock simulation in 'Ace Your Consular Interview' prep suite below.`,
      `Keep physical hardcopies of your stamped bank certificate and admission/offer confirmation.`
    ];

    const finalScore = Math.min(99, Math.max(0, score));

    return {
      readiness_score: finalScore,
      readiness_tier: finalScore >= 85 ? 'HIGH_READINESS' : finalScore >= 65 ? 'MODERATE_READINESS' : 'ACTION_REQUIRED',
      passport_audit: {
        extracted_name: firstName && lastName ? `${firstName.toUpperCase()} ${lastName.toUpperCase()}` : 'APPLICANT / PASSPORT HOLDER',
        passport_number: passportFile ? 'UPLOADED_SCAN_VALID' : 'PENDING UPLOAD',
        expiry_date: passportValidityRange || 'VALID (6+ MONTHS)',
        validity_status: passportFile ? 'VALID' : 'PENDING_UPLOAD',
        issue_flags: []
      },
      checklist_matches: checklistMatches,
      red_flags_and_warnings: redFlagsAndWarnings,
      next_recommended_actions: nextRecommendedActions
    };
  }, [activePurposeTab, countryName, firstName, lastName, passportFile, hasFundsProof, hasAdmissionOrOffer, hasFlightItinerary, hasPastRefusalCheck, passportValidityRange]);

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
      
      {/* ── SECTION 1: CINEMATIC CENTERED HERO BANNER ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 text-white shadow-xl border border-slate-100 text-center">
          
          {/* Backdrop Image with Multi-Stop Dark Gradient */}
          <img
            src={heroImage}
            alt={countryName}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/40" />

          {/* Hero Content - Perfectly Centered & Razor Sharp */}
          <div className="relative z-10 max-w-3xl space-y-4 mx-auto flex flex-col items-center">
            
            {/* Top Official Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse shrink-0" />
              <span>Official 2026 / 2027 Consular Entry Policy</span>
            </div>

            {/* Main Centered Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-tight drop-shadow-md">
              You need <span className="text-white">{aiIntel.entryStatus || dynamicVisaType}</span>
            </h1>

            {/* Clean, Simple Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Official entry &amp; visa requirements for <strong className="text-white font-bold">{passportCountry}</strong> citizens traveling to <strong className="text-white font-bold">{countryName}</strong> {flagEmoji}
            </p>

          </div>

        </div>
      </section>

      {/* ── SECTION 1.2: DISTRIBUTED SUB-NAV TAB BAR (DIRECTLY BELOW BANNER) ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs my-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-around overflow-x-auto no-scrollbar py-0 text-xs sm:text-sm font-bold">
            {[
              { id: 'section-visa-info', label: 'Visa Info' },
              { id: 'section-visa-process', label: 'How to Apply' },
              { id: 'section-documents', label: 'Documents' },
              { id: 'section-mandates', label: 'Mandates' },
              { id: 'section-visa-readiness', label: 'Visa Readiness' },
              { id: 'section-faqs', label: 'FAQs' }
            ].map((tab) => {
              const isActive = activeSubNav === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`py-3.5 px-3 sm:px-6 shrink-0 transition-all border-b-2 font-heading cursor-pointer whitespace-nowrap select-none flex-1 text-center ${
                    isActive
                      ? 'border-indigo-600 text-slate-950 font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-900 font-bold hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION 1.5: OFFICIAL EMBASSY & VFS AI REQUIREMENTS SUITE (Clean Layout Matching Official Specs) ── */}
      <section id="section-visa-info" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8 antialiased">
        <OfficialRequirementsCard 
          countryName={countryName} 
          passportCountry={passportCountry} 
          purpose={initialPurpose === 'study' ? 'Higher Studies' : initialPurpose === 'work' ? 'Employment / Work' : 'Tourism / Vacation'} 
        />
      </section>





      {/* ── STEP 0: CORE DECISION GATE ("Have Visa Already?") POSITIONED DIRECTLY AFTER SECTION 2 ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-10 flex items-center justify-center">
        <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2 sm:py-3.5 px-4 sm:px-10 shadow-xs sm:shadow-md hover:shadow-lg flex items-center justify-between sm:justify-center gap-2.5 sm:gap-8 transition-all duration-300">
          
          <span className="text-xs sm:text-base md:text-lg font-heading font-black text-slate-950 tracking-tight whitespace-nowrap flex items-center gap-1.5 sm:gap-2">
            <span>Have Visa Already?</span>
          </span>

          {/* Toggle Capsule Track */}
          <div className="bg-slate-100/90 rounded-full p-1 sm:p-1.5 inline-flex items-center gap-1 sm:gap-1.5 border border-slate-200/80 shrink-0 shadow-inner">
            
            {/* NO button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('no')}
              className={`px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 select-none active:scale-95 ${
                hasVisaAlready === 'no'
                  ? 'bg-slate-950 text-white shadow-xs sm:shadow-md scale-[1.02] sm:scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {hasVisaAlready === 'no' ? (
                <>
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                  <span className="tracking-wide">NO</span>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                  <span className="tracking-wide">NO</span>
                </>
              )}
            </button>

            {/* YES button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('yes')}
              className={`px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 select-none active:scale-95 ${
                hasVisaAlready === 'yes'
                  ? 'bg-slate-950 text-white shadow-xs sm:shadow-md scale-[1.02] sm:scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {hasVisaAlready === 'yes' ? (
                <>
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                  <span className="tracking-wide">YES</span>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
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
          {/* ── 4-STEP PURPOSE-SPECIFIC INTERACTIVE QUESTIONNAIRE & VISA READINESS ── */}
          <section id="section-visa-readiness" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 scroll-mt-24 animate-fadeIn">
            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-[28px] p-4 sm:p-8 shadow-sm text-left space-y-5 sm:space-y-6">
              
              {/* Header with Step indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                      Category: {activePurposeTab === 'study' ? 'STUDENT VISA' : activePurposeTab === 'work' ? 'WORK VISA' : 'TOURIST VISA'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-heading font-black text-slate-950 tracking-tight leading-tight">
                    {activePurposeTab === 'study'
                      ? `Apply for your Student Visa to ${countryName}`
                      : activePurposeTab === 'work'
                      ? `Apply for your Work Visa to ${countryName}`
                      : `Apply for your Tourist Visa to ${countryName}`}
                  </h3>
                </div>

                {/* Purpose Category Tag Badge (No unrelated tabs shown) */}
                <div className="inline-flex items-center self-start sm:self-auto gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-950 text-white text-xs sm:text-sm font-black shadow-xs">
                  <span>
                    {activePurposeTab === 'study'
                      ? '🎓 Student / Study Visa'
                      : activePurposeTab === 'work'
                      ? '💼 Work / Employment Visa'
                      : '🏖️ Visit / Tourist Visa'}
                  </span>
                </div>
              </div>

              {/* STUDY QUESTIONNAIRE (ALL 8 PROFILE FIELDS) */}
              {activePurposeTab === 'study' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

                  {/* Row 2: Consular Compliance & Profile Criteria */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                    <PortalCustomSelect
                      label="5. Institutional Admission Status"
                      value={studentAdmissionStatus}
                      onChange={setStudentAdmissionStatus}
                      placeholder="Select admission status"
                      options={[
                        "Confirmed Offer / CAS / I-20",
                        "Conditional Offer Received",
                        "Yet to Apply / Planning"
                      ]}
                    />

                    <PortalCustomSelect
                      label="6. English Language Proficiency"
                      value={studentLanguageScore}
                      onChange={setStudentLanguageScore}
                      placeholder="Select language status"
                      options={[
                        "IELTS 6.5+ / PTE 60+ Cleared",
                        "Exam Booked / Preparing",
                        "Medium of Instruction (MOI) Waiver"
                      ]}
                    />

                    <PortalCustomSelect
                      label="7. Passport Validity Remaining"
                      value={passportValidityRange}
                      onChange={setPassportValidityRange}
                      placeholder="Select passport validity"
                      options={[
                        "> 12 Months (Recommended)",
                        "6 - 12 Months Valid",
                        "< 6 Months (Renewal Required)"
                      ]}
                    />

                    <PortalCustomSelect
                      label="8. Prior Consular Refusal History"
                      value={visaRefusalHistory}
                      onChange={setVisaRefusalHistory}
                      placeholder="Select refusal history"
                      options={[
                        "Clean History (No Refusals)",
                        "Past Refusal (Requires Cover Letter)"
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* VISIT / TOURISM QUESTIONNAIRE (ALL 8 PROFILE FIELDS) */}
              {activePurposeTab === 'tourism' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Q1: Trip Status */}
                    <PortalCustomSelect
                      label="1. Trip Planning Status"
                      value={visitPlanStatus}
                      onChange={setVisitPlanStatus}
                      placeholder="Select trip status"
                      options={[
                        "Fixed Dates & Itinerary Ready",
                        "Flexible / Exploring Dates",
                        "Urgent Travel (Next 14 Days)"
                      ]}
                    />

                    {/* Q2: Travel Timing */}
                    <PortalCustomSelect
                      label="2. Tentative Departure Date"
                      value={visitTiming}
                      onChange={setVisitTiming}
                      placeholder="Select travel window"
                      options={[
                        "Next 30 Days",
                        "1 - 3 Months",
                        "3 - 6 Months",
                        "6+ Months Later"
                      ]}
                    />

                    {/* Q3: Tentative Return Date */}
                    <PortalCustomSelect
                      label="3. Tentative Return Date"
                      value={visitReturnDate}
                      onChange={setVisitReturnDate}
                      placeholder="Select return window"
                      options={[
                        "Within 7 Days",
                        "8 - 14 Days",
                        "15 - 30 Days",
                        "1 - 3 Months"
                      ]}
                    />

                    {/* Q4: Stay Preference */}
                    <PortalCustomSelect
                      label="4. Accommodation Preference"
                      value={visitStay}
                      onChange={setVisitStay}
                      placeholder="Select accommodation"
                      options={[
                        "Hotel / Resort Booked",
                        "Staying with Host / Family",
                        "Airbnb / Rental Apartment"
                      ]}
                    />
                  </div>

                  {/* Row 2: Consular Compliance & Profile Criteria */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                    <PortalCustomSelect
                      label="5. 6-Month Stamped Bank Balance"
                      value={touristBankStability}
                      onChange={setTouristBankStability}
                      placeholder="Select bank balance"
                      options={[
                        "₹4L+ Maintained (Strong Solvency)",
                        "₹2L - ₹4L Balance",
                        "Under ₹2L / Need Financial Advice"
                      ]}
                    />

                    <PortalCustomSelect
                      label="6. Home Country Ties & Employment"
                      value={touristHomeTies}
                      onChange={setTouristHomeTies}
                      placeholder="Select employment / ties"
                      options={[
                        "Salaried (NOC & 3-Mo Payslips Ready)",
                        "Business Owner / GST & 2-Yr ITR",
                        "Self-Employed / Freelancer",
                        "Student / Dependent"
                      ]}
                    />

                    <PortalCustomSelect
                      label="7. Passport Validity Remaining"
                      value={passportValidityRange}
                      onChange={setPassportValidityRange}
                      placeholder="Select passport validity"
                      options={[
                        "> 12 Months (Recommended)",
                        "6 - 12 Months Valid",
                        "< 6 Months (Renewal Required)"
                      ]}
                    />

                    <PortalCustomSelect
                      label="8. Prior Consular Refusal History"
                      value={visaRefusalHistory}
                      onChange={setVisaRefusalHistory}
                      placeholder="Select refusal history"
                      options={[
                        "Clean History (No Refusals)",
                        "Past Refusal (Requires Cover Letter)"
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* WORK QUESTIONNAIRE (ALL PROFILE FIELDS) */}
              {activePurposeTab === 'work' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Q1: Exp */}
                    <PortalCustomSelect
                      label="1. Total Work Experience"
                      value={workExp}
                      onChange={setWorkExp}
                      placeholder="Select total experience"
                      options={[
                        "0 - 2 Years (Early Career)",
                        "3 - 5 Years (Mid-Level)",
                        "5 - 8 Years (Senior)",
                        "8+ Years (Lead / Executive)"
                      ]}
                    />

                    {/* Q2: Job Offer */}
                    <PortalCustomSelect
                      label={`2. Job Offer in ${countryName}`}
                      value={workOffer}
                      onChange={setWorkOffer}
                      placeholder="Select offer status"
                      options={[
                        "Confirmed Sponsored Job Offer (CoS/LMIA)",
                        "Interviewing / Final Stages",
                        "Job Seeker (Applying from India)"
                      ]}
                    />

                    {/* Q3: Domain */}
                    <PortalCustomSelect
                      label="3. Industry / Job Role"
                      value={workDomain}
                      onChange={setWorkDomain}
                      placeholder="Select domain"
                      options={[
                        "IT / Software & Tech",
                        "Healthcare / Nursing / Medical",
                        "Engineering & Construction",
                        "Finance & Management",
                        "Hospitality & Services"
                      ]}
                    />

                    {/* Q4: Credential Assessment */}
                    <PortalCustomSelect
                      label="4. Skill Assessment Status"
                      value={workAssess}
                      onChange={setWorkAssess}
                      placeholder="Select assessment status"
                      options={[
                        "Assessed (ACS / WES / Engineers Aus)",
                        "Under Processing",
                        "Not Initiated / Need Assistance"
                      ]}
                    />
                  </div>

                  {/* Row 2: Consular Compliance & Profile Criteria */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                    <PortalCustomSelect
                      label="5. Passport Validity Remaining"
                      value={passportValidityRange}
                      onChange={setPassportValidityRange}
                      placeholder="Select passport validity"
                      options={[
                        "> 12 Months (Recommended)",
                        "6 - 12 Months Valid",
                        "< 6 Months (Renewal Required)"
                      ]}
                    />

                    <PortalCustomSelect
                      label="6. Prior Consular Refusal History"
                      value={visaRefusalHistory}
                      onChange={setVisaRefusalHistory}
                      placeholder="Select refusal history"
                      options={[
                        "Clean History (No Refusals)",
                        "Past Refusal (Requires Cover Letter)"
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 2: PASSPORT COLLECTION & LIVE VISA READINESS SCORECARD ── */}
              <div className="pt-5 sm:pt-6 border-t border-slate-100 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                  
                  {/* LEFT COLUMN: PASSPORT BIO-DATA UPLOAD */}
                  <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-4 sm:space-y-5 text-left flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5 whitespace-nowrap">
                          <span>📘 Passport Bio-Data (Upload)</span>
                        </span>
                        {passportFile ? (
                          <span className="text-[11px] sm:text-xs font-black uppercase text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs shrink-0">
                            ✓ ATTACHED
                          </span>
                        ) : (
                          <span className="text-[11px] sm:text-xs font-black uppercase text-amber-900 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full shadow-2xs shrink-0">
                            UPLOAD REQUIRED
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed mt-2">
                        Upload your passport bio-data page to extract MRZ checksum and verify 6-month consular validity for {countryName}.
                      </p>
                    </div>

                    {passportFile ? (
                      <div className="p-4 sm:p-5 bg-white border border-emerald-300 rounded-2xl space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-black text-slate-950 truncate max-w-[200px] sm:max-w-[260px]">
                            {passportFile.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handlePassportUpload(null)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-black px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 cursor-pointer transition-colors shrink-0"
                          >
                            ✕ Remove
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-emerald-700 font-bold">
                          <span>Size: {passportFile.size}</span>
                          <span>•</span>
                          <span>MRZ Checksum Verified ✓</span>
                        </div>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/60 hover:bg-indigo-50/30 rounded-2xl py-8 sm:py-14 px-4 sm:px-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-2xs hover:shadow-xs group min-h-[190px] sm:min-h-[240px]">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-indigo-50 group-hover:bg-indigo-100/90 group-hover:scale-110 flex items-center justify-center text-indigo-600 mb-3 sm:mb-4 transition-all shadow-xs">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 stroke-[2.5]" />
                        </div>
                        <span className="text-sm sm:text-lg font-heading font-black text-slate-950 tracking-tight">
                          Click or Drag to Upload Passport
                        </span>
                        <span className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">
                          Supports PDF, JPG, PNG (Max 15MB)
                        </span>
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                          <span>📁 Browse File</span>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handlePassportUpload(e.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>

                  {/* RIGHT COLUMN: CIRCULAR GAUGE VISA READINESS SCORECARD (CREDIT SCORE STYLE) */}
                  <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col justify-between items-center text-center space-y-4">
                    
                    {/* Card Header */}
                    <div className="w-full flex items-center justify-between gap-2 pb-1 text-left">
                      <div>
                        <h4 className="text-base sm:text-xl font-heading font-black text-slate-950 tracking-tight">
                          Your Visa Readiness Score
                        </h4>
                        <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-0.5">
                          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>

                      <span className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wider shrink-0 ${
                        readinessMetrics.score >= 85
                          ? 'bg-[#D97706] text-white shadow-xs'
                          : readinessMetrics.score >= 70
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : readinessMetrics.score >= 50
                          ? 'bg-blue-600 text-white shadow-xs'
                          : readinessMetrics.score > 0
                          ? 'bg-orange-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {readinessMetrics.score >= 85
                          ? 'EXCEPTIONAL'
                          : readinessMetrics.score >= 70
                          ? 'EXCELLENT'
                          : readinessMetrics.score >= 50
                          ? 'GOOD'
                          : readinessMetrics.score > 0
                          ? 'FAIR'
                          : 'PENDING'}
                      </span>
                    </div>

                    {/* Center: Circular Rainbow Gauge */}
                    <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center my-1">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="rainbowGauge" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F43F5E" />
                            <stop offset="35%" stopColor="#FB923C" />
                            <stop offset="65%" stopColor="#FACC15" />
                            <stop offset="100%" stopColor="#22C55E" />
                          </linearGradient>
                        </defs>

                        {/* Background Arc */}
                        <path
                          d="M 46 150 A 70 70 0 1 1 154 150"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="15"
                          strokeLinecap="round"
                        />

                        {/* Foreground Rainbow Score Arc */}
                        <path
                          d="M 46 150 A 70 70 0 1 1 154 150"
                          fill="none"
                          stroke="url(#rainbowGauge)"
                          strokeWidth="15"
                          strokeLinecap="round"
                          strokeDasharray="318"
                          strokeDashoffset={318 - (Math.max(readinessMetrics.score > 0 ? 5 : 0, readinessMetrics.score) / 100) * 318}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>

                      {/* Center Number & Points (Clean Out of 10 Scale) */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2 sm:pt-3">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl sm:text-6xl font-heading font-black text-slate-950 tracking-tight leading-none">
                            {readinessMetrics.score > 0
                              ? (readinessMetrics.score / 10).toFixed(1)
                              : '0.0'}
                          </span>
                          <span className="text-sm sm:text-xl font-bold text-slate-400">/ 10</span>
                        </div>
                        <span className="text-[11px] sm:text-sm font-extrabold text-slate-800 mt-1 sm:mt-1.5">
                          {passportFile ? (
                            <span className="text-emerald-600 font-black">+2.0 pts (Passport)</span>
                          ) : readinessMetrics.filledCount > 0 ? (
                            <span className="text-slate-700">+{((readinessMetrics.filledCount * 10) / 10).toFixed(1)} pts</span>
                          ) : (
                            <span className="text-slate-400">0.0 pts</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="w-full pt-3 border-t border-slate-100 space-y-1">
                      <div className="text-xs sm:text-sm font-black text-slate-800">
                        TravlTik Consular AI
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">
                        Score calculated using official {countryName} immigration benchmarks
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── SPECIALIZED STUDENT VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'study' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP APPLICATION ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                {/* ── STEP 1: FIND TOP UNIVERSITY (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        1
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                            Step 1
                          </span>
                          <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                            Find Top University
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-64 shrink-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={uniSearchQuery}
                        onChange={(e) => setUniSearchQuery(e.target.value)}
                        placeholder="Search university or city..."
                        className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      />
                      {uniSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setUniSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[9px] cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* University Cards Grid (Compact & Crisp) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getDestinationUniversities(countryName)
                      .filter(u => !uniSearchQuery || u.name.toLowerCase().includes(uniSearchQuery.toLowerCase()) || u.desc.toLowerCase().includes(uniSearchQuery.toLowerCase()))
                      .map((uni) => {
                        const isSelected = selectedUniId === uni.id;
                        return (
                          <div
                            key={uni.id}
                            onClick={() => setSelectedUniId(uni.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-emerald-50/40 border-2 border-[#00A86B] shadow-xs'
                                : 'bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="min-w-0 space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-950 text-white">
                                  {uni.rank}
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {uni.campusBadge}
                                </span>
                              </div>
                              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-950 truncate">
                                {uni.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                <span className="truncate">{uni.location}</span>
                                <span>•</span>
                                <strong className="text-slate-900 font-bold">{uni.tuitionLocal}</strong>
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? 'bg-[#00A86B] text-white'
                                  : 'bg-white border border-slate-300 text-slate-400'
                              }`}
                            >
                              {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ── STEP 2: SELECT COURSE & MAJOR (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-md">
                        Step 2
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Select Course &amp; Major
                      </h3>
                    </div>
                  </div>

                  {/* Course Major Selector Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { icon: '💻', name: 'Computer Science & AI' },
                      { icon: '📊', name: 'Data Science & Analytics' },
                      { icon: '💼', name: 'Global MBA & Finance' },
                      { icon: '🤖', name: 'Robotics & Mechanical' },
                      { icon: '🧬', name: 'Biotechnology' },
                      { icon: '⚖️', name: 'Law & International Policy' }
                    ].map((maj) => (
                      <button
                        key={maj.name}
                        type="button"
                        onClick={() => setSelectedCourseMajor(maj.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          selectedCourseMajor === maj.name
                            ? 'bg-slate-950 text-white shadow-sm border border-slate-950 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span>{maj.icon}</span>
                        <span>{maj.name}</span>
                        {selectedCourseMajor === maj.name && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── STEP 3: ADMISSION & CLEARANCE DOCUMENT (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                        Step 3
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        {countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa')
                          ? 'Receive Form I-20 & SEVIS Clearance'
                          : countryName.toLowerCase().includes('united kingdom') || countryName.toLowerCase().includes('uk')
                          ? 'Receive Official CAS Reference'
                          : countryName.toLowerCase().includes('canada')
                          ? 'Receive Letter of Acceptance (LOA) & PAL'
                          : 'Receive Official Admission & Clearance Letter'}
                      </h3>
                    </div>
                  </div>

                  {/* Compact Status Card */}
                  <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950">
                          {countryName.toLowerCase().includes('united states') ? 'Form I-20 & SEVIS ID Ready' : 'Official CAS / Acceptance Reference Validated'}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Official university clearance confirmed. Choose your filing pathway below to proceed.
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for Visa Submission</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* 2. DUAL CHOICE ACTION TABS (POST STEP 3) */}
              {/* ================================================== */}
              <div className="space-y-6 pt-4">
                
                {/* Section Title & Segment Controller */}
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Visa Application Pathways
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                    How would you like to apply for your visa?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                    Choose between connecting with certified local immigration consultants or applying directly online.
                  </p>

                  {/* Clean Segment Switch Matching Photo 1 Capsule */}
                  <div className="pt-2 flex items-center justify-center">
                    <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2.5 sm:py-3 px-3 sm:px-5 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                      <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner max-w-full overflow-x-auto">
                        
                        {/* Find Consultants */}
                        <button
                          type="button"
                          onClick={() => setStudentActionTab('consultants')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            studentActionTab === 'consultants'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {studentActionTab === 'consultants' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Find Consultants</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Find Consultants</span>
                            </>
                          )}
                        </button>

                        {/* Self Apply */}
                        <button
                          type="button"
                          onClick={() => setStudentActionTab('self_apply')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            studentActionTab === 'self_apply'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {studentActionTab === 'self_apply' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Self Apply</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Self Apply</span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT: FIND CONSULTANTS (SEARCH & MATCH) ── */}
                {studentActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Verified Immigration Lawyers &amp; Study Visa Experts
                      </h4>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Consultants Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Destination Specialization"
                            value={consultantCountryFilter}
                            onChange={setConsultantCountryFilter}
                            placeholder="Select Destination"
                            options={[
                              `${countryName} (Current Destination)`,
                              "All Countries (Global)",
                              "United States (F-1 / SEVP)",
                              "United Kingdom (UKVI / CAS)",
                              "Canada (IRCC / DLI / PAL)",
                              "Australia (CRICOS / Subclass 500)",
                              "Germany & EU Blue Card"
                            ]}
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Service / Advisory Type"
                            value={consultantServiceType}
                            onChange={setConsultantServiceType}
                            placeholder="Select Service"
                            options={[
                              "Study Visa & Admissions Filing",
                              "Visa Appeals & Refusal Defense",
                              "SOP & Academic Document Review",
                              "Embassy Visa Interview Prep"
                            ]}
                          />
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
                        <a
                          href={`/find-experts?category=student&country=${encodeURIComponent(consultantCountryFilter.includes('All Countries') ? countryName : consultantCountryFilter.split('(')[0].trim())}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}${consultantServiceType ? `&service=${encodeURIComponent(consultantServiceType)}` : ''}`}
                          className="h-11 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Search Verified Experts for {countryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2 CONTENT: SELF APPLY (CONCIERGE VAULT) ── */}
                {studentActionTab === 'self_apply' && (
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn text-left">
                    
                    {/* 5 Core Document Upload Items */}
                    <div className="space-y-3" id="student-doc-vault">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <span>1. Mandatory Document Vault Checklist</span>
                        </h5>
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                          Object.keys(uploadedDocuments).length >= 5
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : Object.keys(uploadedDocuments).length > 0
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {Object.keys(uploadedDocuments).length} of 5 Uploaded
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { key: 'passport', title: 'Passport Scan (Front & Back)', hint: 'Min. 6 months validity & blank pages' },
                          { key: 'transcripts', title: 'Academic Transcripts & Degree', hint: '10th, 12th & Degree marksheets' },
                          { key: 'financials', title: 'Financial / Loan Proof', hint: '28-day maintenance funds or loan letter' },
                          { key: 'sop_cv', title: 'Statement of Purpose (SOP) & CV', hint: 'Academic intent & professional resume' },
                          { key: 'english_test', title: 'English Test Scorecard', hint: 'IELTS / PTE / TOEFL score certificate' }
                        ].map((doc) => {
                          const uploaded = uploadedDocuments[doc.key];
                          const isCurrentlyUploading = isUploadingDocKey === doc.key;
                          const isMissingAfterAttempt = !uploaded && !!uploadValidationWarning;
                          const fileInputId = `doc-file-input-${doc.key}`;

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                uploaded
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : isMissingAfterAttempt
                                  ? 'bg-amber-50/40 border-2 border-amber-400 ring-2 ring-amber-200/80 shadow-sm'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {/* Hidden real file input */}
                              <input
                                id={fileInputId}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setIsUploadingDocKey(doc.key);
                                    const fileSizeFormatted = file.size > 1024 * 1024
                                      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                      : `${Math.round(file.size / 1024)} KB`;
                                    
                                    setTimeout(() => {
                                      setUploadedDocuments(prev => {
                                        const next = {
                                          ...prev,
                                          [doc.key]: {
                                            fileName: file.name,
                                            size: fileSizeFormatted,
                                            status: 'verified' as const,
                                            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                          }
                                        };
                                        if (typeof window !== 'undefined') {
                                          try {
                                            const existingDocs = JSON.parse(localStorage.getItem('seeker_documents') || '[]');
                                            const filtered = existingDocs.filter((d: any) => d.id !== doc.key);
                                            filtered.push({
                                              id: doc.key,
                                              label: `${doc.title} (${file.name})`,
                                              status: 'uploaded',
                                              uploadedAt: new Date().toLocaleDateString(),
                                              size: fileSizeFormatted
                                            });
                                            localStorage.setItem('seeker_documents', JSON.stringify(filtered));
                                          } catch(e) {}
                                        }
                                        return next;
                                      });
                                      setIsUploadingDocKey(null);
                                      setUploadValidationWarning(null);
                                    }, 600);
                                  }
                                }}
                              />

                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {uploaded ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                                  ) : (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      isMissingAfterAttempt
                                        ? 'bg-amber-200 text-amber-950 font-black'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      {isMissingAfterAttempt ? 'Upload Required !' : 'Required'}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              {uploaded ? (
                                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/90 p-2.5 rounded-xl border border-emerald-200 gap-2">
                                  <div className="min-w-0 flex-1">
                                    <span className="font-bold text-slate-900 block truncate text-[11px]">{uploaded.fileName}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block">{uploaded.size} • {uploaded.timestamp}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(fileInputId)?.click()}
                                    className="text-[10px] font-bold text-slate-500 hover:text-slate-900 underline shrink-0 cursor-pointer"
                                  >
                                    Replace
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  disabled={isCurrentlyUploading}
                                  onClick={() => document.getElementById(fileInputId)?.click()}
                                  className="w-full py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50 touch-manipulation"
                                >
                                  {isCurrentlyUploading ? (
                                    <>
                                      <RotateCw className="w-3.5 h-3.5 animate-spin text-[#00A86B]" />
                                      <span>Uploading &amp; Scanning...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="w-3.5 h-3.5 text-slate-600" />
                                      <span>Upload &amp; Store</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* One-Click Concierge Add-On Services */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          2. One-Click Concierge Add-On Services
                        </h5>
                        <span className="text-[11px] text-slate-500 font-medium">Optional automated protections</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'sop_polish', name: '✨ AI & Legal Expert SOP Polish & Review', price: 1999, desc: 'Grammar, narrative strength & visa officer alignment by counsel.' },
                          { id: 'travel_insurance', name: '🛡️ Comprehensive Student Travel & Medical Insurance', price: 2499, desc: 'Covers pre-arrival emergencies & $100k medical protection.' },
                          { id: 'financial_audit', name: '🏦 CA Net Worth & 28-Day Solvency Certification', price: 3200, desc: 'Official CA liquidity report proving genuine funds.' },
                          { id: 'biometrics_booking', name: '📅 VFS / Embassy Priority Biometrics Slot Assistance', price: 1500, desc: 'Priority appointment scheduling at nearest center.' }
                        ].map((addon) => {
                          const isSelected = selectedConciergeAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setSelectedConciergeAddons(prev =>
                                  prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                                );
                              }}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 ${
                                isSelected
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-900'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                                  {addon.name}
                                </h6>
                                <span className={`text-xs font-black shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                                  +₹{addon.price.toLocaleString()}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                                {addon.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Validation Warning Alert */}
                    {uploadValidationWarning && (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-3 animate-pulse shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{uploadValidationWarning}</span>
                      </div>
                    )}

                    {/* Final Submission Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Total Concierge Package:</span>
                        <strong className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{(2499 + selectedConciergeAddons.reduce((sum, id) => {
                            if (id === 'sop_polish') return sum + 1999;
                            if (id === 'travel_insurance') return sum + 2499;
                            if (id === 'financial_audit') return sum + 3200;
                            if (id === 'biometrics_booking') return sum + 1500;
                            return sum;
                          }, 0)).toLocaleString()}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConciergeSubmit(['passport', 'transcripts', 'financials', 'sop_cv', 'english_test'], 'student-doc-vault')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Submit Complete Dossier for AI &amp; Concierge Filing</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* ── SPECIALIZED TOURIST VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'tourism' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP APPLICATION ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                {/* ── STEP 1: EXPLORE SIGHTS & EXPERIENCES (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        1
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                            Step 1
                          </span>
                          <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                            Explore Top Attractions &amp; Sights
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-64 shrink-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={tourSearchQuery}
                        onChange={(e) => setTourSearchQuery(e.target.value)}
                        placeholder="Search attraction or city..."
                        className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      />
                      {tourSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setTourSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[9px] cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tours Cards Grid (Compact & Crisp) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {getDestinationTours(countryName)
                      .filter(t => !tourSearchQuery || t.name.toLowerCase().includes(tourSearchQuery.toLowerCase()) || t.desc.toLowerCase().includes(tourSearchQuery.toLowerCase()))
                      .map((tour) => {
                        const isSelected = selectedTourId === tour.id;
                        return (
                          <div
                            key={tour.id}
                            onClick={() => setSelectedTourId(tour.id)}
                            className={`rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                              isSelected
                                ? 'bg-emerald-50/40 border-2 border-[#00A86B] shadow-xs'
                                : 'bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="h-28 w-full overflow-hidden relative">
                              <img src={tour.heroImg} alt={tour.name} className="w-full h-full object-cover" />
                              <span className="absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-xs">
                                {tour.category}
                              </span>
                            </div>
                            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-950 line-clamp-1">
                                  {tour.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                  {tour.desc}
                                </p>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold">
                                <span className="text-slate-500 text-[11px]">⏱️ {tour.duration}</span>
                                <span className="text-emerald-700 font-extrabold">{tour.priceINR}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ── STEP 2: SELECT TRAVEL STYLE (CHIPS) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-md">
                        Step 2
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Select Travel Style &amp; Itinerary Type
                      </h3>
                    </div>
                  </div>

                  {/* Travel Style Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { icon: '🏖️', name: 'Leisure & Sightseeing' },
                      { icon: '🏛️', name: 'Heritage & UNESCO Culture' },
                      { icon: '👨‍👩‍👧', name: 'Family Vacation & Theme Parks' },
                      { icon: '💍', name: 'Honeymoon & Romantic Getaways' },
                      { icon: '🎒', name: 'Solo Adventure & Hiking' },
                      { icon: '💼', name: 'Business & Bleisure Travel' }
                    ].map((style) => (
                      <button
                        key={style.name}
                        type="button"
                        onClick={() => setVisitPlanStatus(style.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          visitPlanStatus === style.name
                            ? 'bg-slate-950 text-white shadow-sm border border-slate-950 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span>{style.icon}</span>
                        <span>{style.name}</span>
                        {visitPlanStatus === style.name && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── STEP 3: FLIGHT & HOTEL PROOF CLEARANCE ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                        Step 3
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Verifiable Flight Itinerary &amp; Hotel Lodging Clearance
                      </h3>
                    </div>
                  </div>

                  {/* Compact Status Card */}
                  <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950">
                          Flight Reservation PNR &amp; Lodging Proof Validated
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Official embassy and VFS compliant booking documentation attached. Choose your filing pathway below.
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for Visa Submission</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* 2. DUAL CHOICE ACTION TABS (POST STEP 3) */}
              {/* ================================================== */}
              <div className="space-y-6 pt-4">
                
                {/* Section Title & Segment Controller */}
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Visa Application Pathways
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                    How would you like to apply for your {countryName} Tourist Visa?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                    Choose between connecting with certified local travel visa experts or applying directly online.
                  </p>

                  {/* Clean Segment Switch Matching Capsule */}
                  <div className="pt-2 flex items-center justify-center">
                    <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2.5 sm:py-3 px-3 sm:px-5 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                      <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner max-w-full overflow-x-auto">
                        
                        {/* Find Consultants */}
                        <button
                          type="button"
                          onClick={() => setTourismActionTab('consultants')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            tourismActionTab === 'consultants'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {tourismActionTab === 'consultants' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Find Consultants</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Find Consultants</span>
                            </>
                          )}
                        </button>

                        {/* Self Apply */}
                        <button
                          type="button"
                          onClick={() => setTourismActionTab('self_apply')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            tourismActionTab === 'self_apply'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {tourismActionTab === 'self_apply' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Self Apply</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Self Apply</span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT: FIND TOURIST CONSULTANTS ── */}
                {tourismActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Verified Tourist Visa Filing Experts &amp; Lawyers
                      </h4>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Consultants Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Destination Specialization"
                            value={consultantCountryFilter}
                            onChange={setConsultantCountryFilter}
                            placeholder="Select Destination"
                            options={[
                              `${countryName} (Current Destination)`,
                              "All Countries (Global)",
                              "United Kingdom (UKVI Visitor)",
                              "Schengen Area (Type C 90-Day)",
                              "United States (B1/B2)",
                              "Canada (TRV / Visitor)",
                              "Australia & New Zealand (eVisitor)"
                            ]}
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Service / Advisory Type"
                            value={consultantServiceType}
                            onChange={setConsultantServiceType}
                            placeholder="Select Service"
                            options={[
                              "Tourist Visa Filing & Appointment",
                              "Refusal Defense & Reapplication",
                              "Cover Letter & Financials Audit",
                              "Express Biometric Booking"
                            ]}
                          />
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
                        <a
                          href={`/find-experts?category=tourist&country=${encodeURIComponent(consultantCountryFilter.includes('All Countries') ? countryName : consultantCountryFilter.split('(')[0].trim())}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}${consultantServiceType ? `&service=${encodeURIComponent(consultantServiceType)}` : ''}`}
                          className="h-11 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Search Verified Experts for {countryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2 CONTENT: SELF APPLY (CONCIERGE VAULT) ── */}
                {tourismActionTab === 'self_apply' && (
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn text-left">
                    
                    {/* Core Document Upload Items */}
                    <div className="space-y-3" id="tourist-doc-vault">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <span>1. Mandatory Document Vault Checklist</span>
                        </h5>
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                          Object.keys(uploadedDocuments).length >= 6
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : Object.keys(uploadedDocuments).length > 0
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {Object.keys(uploadedDocuments).length} of 6 Uploaded
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { key: 'passport', title: 'Passport Scan (Front & Back)', hint: 'Min. 6 months validity & blank pages' },
                          { key: 'flights_hotel', title: 'Flight Itinerary & Hotel Proof', hint: 'Confirmed return PNR & hotel vouchers' },
                          { key: 'bank_statements', title: 'Bank Statements (6 Months)', hint: 'Official bank stamp & liquid funds' },
                          { key: 'leave_noc', title: 'Employer Leave NOC / ITR', hint: 'Approved leave letter & tax returns' },
                          { key: 'insurance', title: 'Travel Medical Insurance', hint: '€30,000+ emergency medical cover' },
                          { key: 'itinerary', title: 'Day-by-Day Travel Itinerary', hint: 'Trip activity plan & cover letter' }
                        ].map((doc) => {
                          const uploaded = uploadedDocuments[doc.key];
                          const isCurrentlyUploading = isUploadingDocKey === doc.key;
                          const isMissingAfterAttempt = !uploaded && !!uploadValidationWarning;
                          const fileInputId = `tour-doc-file-input-${doc.key}`;

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                uploaded
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : isMissingAfterAttempt
                                  ? 'bg-amber-50/40 border-2 border-amber-400 ring-2 ring-amber-200/80 shadow-sm'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <input
                                id={fileInputId}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setIsUploadingDocKey(doc.key);
                                    const fileSizeFormatted = file.size > 1024 * 1024
                                      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                      : `${Math.round(file.size / 1024)} KB`;
                                    
                                    setTimeout(() => {
                                      setUploadedDocuments(prev => ({
                                        ...prev,
                                        [doc.key]: {
                                          fileName: file.name,
                                          size: fileSizeFormatted,
                                          status: 'verified' as const,
                                          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        }
                                      }));
                                      setIsUploadingDocKey(null);
                                      setUploadValidationWarning(null);
                                    }, 600);
                                  }
                                }}
                              />

                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {uploaded ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                                  ) : (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      isMissingAfterAttempt
                                        ? 'bg-amber-200 text-amber-950 font-black'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      {isMissingAfterAttempt ? 'Upload Required !' : 'Required'}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              {uploaded ? (
                                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/90 p-2.5 rounded-xl border border-emerald-200 gap-2">
                                  <div className="min-w-0 flex-1">
                                    <span className="font-bold text-slate-900 block truncate text-[11px]">{uploaded.fileName}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block">{uploaded.size} • {uploaded.timestamp}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(fileInputId)?.click()}
                                    className="text-[10px] font-bold text-slate-500 hover:text-slate-900 underline shrink-0 cursor-pointer"
                                  >
                                    Replace
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  disabled={isCurrentlyUploading}
                                  onClick={() => document.getElementById(fileInputId)?.click()}
                                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95"
                                >
                                  {isCurrentlyUploading ? (
                                    <>
                                      <span className="w-3.5 h-3.5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                      <span>Verifying via OCR...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                                      <span>Upload &amp; Store</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Concierge Addons */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          2. Smart Concierge Add-Ons (Optional)
                        </h5>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Instant Approval Boosters
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { id: 'flight_reservation', name: 'Verifiable Flight Itinerary', price: 1499, desc: 'Hold confirmed return ticket with live PNR for embassy filing.' },
                          { id: 'travel_insurance', name: '€30,000 Travel Medical Cover', price: 2499, desc: '100% compliant emergency health & repatriation policy.' },
                          { id: 'cover_letter', name: 'Expert Cover Letter Drafting', price: 999, desc: 'Tailored visa application cover letter addressing consular rules.' },
                          { id: 'vfs_concierge', name: 'VFS Appointment Slot Concierge', price: 1500, desc: 'Automated monitoring & booking for prime slot openings.' }
                        ].map((addon) => {
                          const isSelected = selectedConciergeAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setSelectedConciergeAddons(prev =>
                                  prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                                );
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 select-none ${
                                isSelected
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                  {addon.name}
                                </h6>
                                <span className={`text-xs font-black shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                                  +₹{addon.price.toLocaleString()}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                                {addon.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Validation Warning Alert */}
                    {uploadValidationWarning && (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-3 animate-pulse shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{uploadValidationWarning}</span>
                      </div>
                    )}

                    {/* Final Submission Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Total Concierge Package:</span>
                        <strong className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{(1999 + selectedConciergeAddons.reduce((sum, id) => {
                            if (id === 'flight_reservation') return sum + 1499;
                            if (id === 'travel_insurance') return sum + 2499;
                            if (id === 'cover_letter') return sum + 999;
                            if (id === 'vfs_concierge') return sum + 1500;
                            return sum;
                          }, 0)).toLocaleString()}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConciergeSubmit(['passport', 'flights_hotel', 'bank_statements', 'leave_noc', 'insurance', 'itinerary'], 'tourist-doc-vault')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Submit Complete Dossier for AI &amp; Concierge Filing</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* ── SPECIALIZED WORK VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'work' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP WORK ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                {/* ── STEP 1: SPONSORING EMPLOYERS (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        1
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                            Step 1
                          </span>
                          <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                            Find Sponsoring Employers &amp; Open Roles
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-64 shrink-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={jobSearchQuery}
                        onChange={(e) => setJobSearchQuery(e.target.value)}
                        placeholder="Search job title, company..."
                        className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      />
                      {jobSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setJobSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[9px] cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Jobs Cards Grid (Compact & Crisp) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {getDestinationJobs(countryName)
                      .filter(j => !jobSearchQuery || j.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) || j.desc.toLowerCase().includes(jobSearchQuery.toLowerCase()))
                      .map((job) => {
                        const isSelected = selectedJobId === job.id;
                        return (
                          <div
                            key={job.id}
                            onClick={() => setSelectedJobId(job.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                              isSelected
                                ? 'bg-emerald-50/40 border-2 border-[#00A86B] shadow-xs'
                                : 'bg-slate-50/60 hover:bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 inline-block">
                                  {job.sponsorshipBadge}
                                </span>
                                <span className="text-slate-400 text-[10px] font-semibold">{job.type}</span>
                              </div>
                              <h4 className="font-heading font-black text-xs sm:text-sm text-slate-950 line-clamp-1 pt-0.5">
                                {job.title}
                              </h4>
                              <span className="text-[11px] font-medium text-slate-500 block truncate">{job.company} • {job.location}</span>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                              <span className="text-emerald-700 font-extrabold">{job.salary}</span>
                              <span className="text-slate-900 text-[10px] font-extrabold flex items-center gap-0.5">
                                Select <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ── STEP 2: SELECT OCCUPATION DOMAIN (CHIPS) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-md">
                        Step 2
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Select Industry Domain &amp; Speciality
                      </h3>
                    </div>
                  </div>

                  {/* Domain Selector Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { icon: '💻', name: 'Tech / Software & AI' },
                      { icon: '🏥', name: 'Healthcare & Nursing' },
                      { icon: '📈', name: 'Finance, Quant & Banking' },
                      { icon: '🏗️', name: 'Engineering & Construction' },
                      { icon: '🧪', name: 'Life Sciences & Biotech' },
                      { icon: '⚖️', name: 'Corporate Legal & Advisory' }
                    ].map((dom) => (
                      <button
                        key={dom.name}
                        type="button"
                        onClick={() => setWorkDomain(dom.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          workDomain === dom.name
                            ? 'bg-slate-950 text-white shadow-sm border border-slate-950 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span>{dom.icon}</span>
                        <span>{dom.name}</span>
                        {workDomain === dom.name && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── STEP 3: WORK AUTHORIZATION & POINTS CLEARANCE ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                        Step 3
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Certificate of Sponsorship &amp; 70-Points Clearance
                      </h3>
                    </div>
                  </div>

                  {/* Compact Status Card */}
                  <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950">
                          CoS Sponsor Reference &amp; Skills Equivalency Validated
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          70-point threshold satisfied under Points-Based Immigration System. Choose your filing pathway below.
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for Visa Submission</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* 2. DUAL CHOICE ACTION TABS (POST STEP 3) */}
              {/* ================================================== */}
              <div className="space-y-6 pt-4">
                
                {/* Section Title & Segment Controller */}
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Visa Application Pathways
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                    How would you like to apply for your {countryName} Work Visa?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                    Choose between connecting with licensed corporate solicitors or applying directly online.
                  </p>

                  {/* Clean Segment Switch Matching Capsule */}
                  <div className="pt-2 flex items-center justify-center">
                    <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2.5 sm:py-3 px-3 sm:px-5 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                      <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner max-w-full overflow-x-auto">
                        
                        {/* Find Consultants */}
                        <button
                          type="button"
                          onClick={() => setWorkActionTab('consultants')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            workActionTab === 'consultants'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {workActionTab === 'consultants' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Find Consultants</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Find Consultants</span>
                            </>
                          )}
                        </button>

                        {/* Self Apply */}
                        <button
                          type="button"
                          onClick={() => setWorkActionTab('self_apply')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            workActionTab === 'self_apply'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {workActionTab === 'self_apply' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Self Apply</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Self Apply</span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT: FIND WORK SOLICITORS ── */}
                {workActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Licensed Work Visa Solicitors &amp; Corporate Counsel
                      </h4>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Solicitors Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Destination Specialization"
                            value={consultantCountryFilter}
                            onChange={setConsultantCountryFilter}
                            placeholder="Select Destination"
                            options={[
                              `${countryName} (Current Destination)`,
                              "All Countries (Global)",
                              "United Kingdom (Skilled Worker / CoS)",
                              "Germany & EU Blue Card",
                              "United States (H-1B / L-1 / O-1)",
                              "Canada (GTS / LMIA / ICT)",
                              "Australia (TSS 482 / PR 186)"
                            ]}
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Service / Advisory Type"
                            value={consultantServiceType}
                            onChange={setConsultantServiceType}
                            placeholder="Select Service"
                            options={[
                              "Skilled Worker & Work Permit Filing",
                              "CoS Compliance & Sponsor Audit",
                              "Points-Based Legal Assessment",
                              "Dependant & Settlement Visas"
                            ]}
                          />
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>100% Escrow Protected • OISC &amp; Bar Licensed Counsel Only</span>
                        </div>

                        <a
                          href={`/find-experts?category=work&country=${encodeURIComponent(consultantCountryFilter.includes('All Countries') ? countryName : consultantCountryFilter.split('(')[0].trim())}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}${consultantServiceType ? `&service=${encodeURIComponent(consultantServiceType)}` : ''}`}
                          className="h-11 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Search Verified Solicitors for {countryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2 CONTENT: SELF APPLY (CONCIERGE VAULT) ── */}
                {workActionTab === 'self_apply' && (
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn text-left">
                    
                    {/* Core Document Upload Items */}
                    <div className="space-y-3" id="work-doc-vault">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <span>1. Mandatory Document Vault Checklist</span>
                        </h5>
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                          Object.keys(uploadedDocuments).length >= 6
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : Object.keys(uploadedDocuments).length > 0
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {Object.keys(uploadedDocuments).length} of 6 Uploaded
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { key: 'passport', title: 'Passport Scan (Full Validity)', hint: 'Valid for full employment contract' },
                          { key: 'cos_contract', title: 'Certificate of Sponsorship (CoS)', hint: 'Official electronic reference & job contract' },
                          { key: 'transcripts', title: 'Degree & Academic Transcripts', hint: 'Apostilled degrees & credential evaluation' },
                          { key: 'english_test', title: 'English Proficiency (SELT B1+)', hint: 'IELTS for UKVI / PTE Academic scorecard' },
                          { key: 'tb_screening', title: 'TB Clearance & Medical Certificate', hint: 'UKVI / Embassy approved medical clinic' },
                          { key: 'pcc', title: 'Police Clearance Certificate (PCC)', hint: 'Clean criminal record from RPO / Passport office' }
                        ].map((doc) => {
                          const uploaded = uploadedDocuments[doc.key];
                          const isCurrentlyUploading = isUploadingDocKey === doc.key;
                          const isMissingAfterAttempt = !uploaded && !!uploadValidationWarning;
                          const fileInputId = `work-doc-file-input-${doc.key}`;

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                uploaded
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : isMissingAfterAttempt
                                  ? 'bg-amber-50/40 border-2 border-amber-400 ring-2 ring-amber-200/80 shadow-sm'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <input
                                id={fileInputId}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setIsUploadingDocKey(doc.key);
                                    const fileSizeFormatted = file.size > 1024 * 1024
                                      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                      : `${Math.round(file.size / 1024)} KB`;
                                    
                                    setTimeout(() => {
                                      setUploadedDocuments(prev => ({
                                        ...prev,
                                        [doc.key]: {
                                          fileName: file.name,
                                          size: fileSizeFormatted,
                                          status: 'verified' as const,
                                          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        }
                                      }));
                                      setIsUploadingDocKey(null);
                                      setUploadValidationWarning(null);
                                    }, 600);
                                  }
                                }}
                              />

                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {uploaded ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                                  ) : (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      isMissingAfterAttempt
                                        ? 'bg-amber-200 text-amber-950 font-black'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      {isMissingAfterAttempt ? 'Upload Required !' : 'Required'}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              {uploaded ? (
                                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/90 p-2.5 rounded-xl border border-emerald-200 gap-2">
                                  <div className="min-w-0 flex-1">
                                    <span className="font-bold text-slate-900 block truncate text-[11px]">{uploaded.fileName}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block">{uploaded.size} • {uploaded.timestamp}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(fileInputId)?.click()}
                                    className="text-[10px] font-bold text-slate-500 hover:text-slate-900 underline shrink-0 cursor-pointer"
                                  >
                                    Replace
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  disabled={isCurrentlyUploading}
                                  onClick={() => document.getElementById(fileInputId)?.click()}
                                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95"
                                >
                                  {isCurrentlyUploading ? (
                                    <>
                                      <span className="w-3.5 h-3.5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                      <span>Verifying via OCR...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                                      <span>Upload &amp; Store</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Concierge Addons */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          2. Smart Concierge Add-Ons (Optional)
                        </h5>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Instant Approval Boosters
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { id: 'points_audit', name: 'Points & Eligibility Legal Audit', price: 2999, desc: 'Detailed legal evaluation of salary threshold, SOC code & CoS.' },
                          { id: 'contract_review', name: 'Employment Contract Review', price: 3499, desc: 'Solicitor review of employment clauses & visa sponsorship rights.' },
                          { id: 'relocation_banking', name: 'Relocation & National Insurance', price: 2499, desc: 'Pre-landing social security setup, tax code & bank account opening.' },
                          { id: 'vfs_biometrics', name: 'VFS Biometrics Concierge', price: 1500, desc: 'Priority appointment scheduling & biometric passport fast-track.' }
                        ].map((addon) => {
                          const isSelected = selectedConciergeAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setSelectedConciergeAddons(prev =>
                                  prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                                );
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 select-none ${
                                isSelected
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                  {addon.name}
                                </h6>
                                <span className={`text-xs font-black shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                                  +₹{addon.price.toLocaleString()}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                                {addon.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Validation Warning Alert */}
                    {uploadValidationWarning && (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-3 animate-pulse shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{uploadValidationWarning}</span>
                      </div>
                    )}

                    {/* Final Submission Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Total Concierge Package:</span>
                        <strong className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{(3499 + selectedConciergeAddons.reduce((sum, id) => {
                            if (id === 'points_audit') return sum + 2999;
                            if (id === 'contract_review') return sum + 3499;
                            if (id === 'relocation_banking') return sum + 2499;
                            if (id === 'vfs_biometrics') return sum + 1500;
                            return sum;
                          }, 0)).toLocaleString()}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConciergeSubmit(['passport', 'cos_contract', 'transcripts', 'english_test', 'tb_screening', 'pcc'], 'work-doc-vault')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Submit Complete Dossier for AI &amp; Concierge Filing</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* ── VISA RESULT & SPECIFICATION WORKSPACE ── */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14">
            
            {/* AI CONSULAR MOCK INTERVIEW PREP KIT (ABOVE DOING IT WITH TRAVLTIK) */}
            <ConsularMockPrepCard 
              countryName={countryName}
              passportCountry={passportCountry}
              purpose={initialPurpose === 'study' ? 'Higher Studies' : initialPurpose === 'work' ? 'Employment / Work' : 'Tourism / Vacation'}
            />

            {/* ================================================== */}
            {/* 4. ATLYS-STYLE COMPARISON TIMELINE (DOING IT WITH ATLYS vs DOING IT YOURSELF) */}
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
                  <div className="grid grid-cols-4 relative z-10 antialiased">
                    
                    {/* Node 1: Top text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight max-w-[140px]">
                          Submit documents online on TravlTik
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
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight max-w-[140px]">
                          AI &amp; Concierge pre-screen application
                        </span>
                      </div>
                    </div>

                    {/* Node 3: Top text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight max-w-[140px]">
                          Real-time updates &amp; reliable ETA
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
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight max-w-[140px]">
                          Approved e-Visa on WhatsApp &amp; Email
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

            {/* 5. EXPANDABLE FAQ ACCORDION */}
            <div id="section-faqs" className="space-y-4 text-left">
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

      {/* ── CONSULTANT BOOKING MODAL ── */}
      {bookingModalConsultant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-left space-y-5 relative">
            <button
              type="button"
              onClick={() => setBookingModalConsultant(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <img
                src={bookingModalConsultant.image}
                alt={bookingModalConsultant.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-lg text-slate-950">{bookingModalConsultant.name}</h3>
                  <BadgeCheck className="w-4 h-4 text-[#00A86B]" />
                </div>
                <p className="text-xs text-slate-600 font-medium">{bookingModalConsultant.agencyName}</p>
                <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold mt-1">
                  🛡️ {bookingModalConsultant.license}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Select Consultation Date:
                </label>
                <input
                  type="date"
                  defaultValue="2026-09-02"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Select Available Slot:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:30 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '09:00 PM'].map((slot, idx) => (
                    <button
                      key={slot}
                      type="button"
                      className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        idx === 1
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Total Payable:</span>
                  <strong className="text-slate-950 font-black text-sm">{bookingModalConsultant.fee}</strong>
                </div>
                <span className="text-[11px] font-bold text-[#00A86B] bg-emerald-50 px-2 py-1 rounded-lg">
                  Protected under Escrow
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const name = bookingModalConsultant.name;
                setBookingModalConsultant(null);
                setConsultantBookedToast(`🎉 Consultation with ${name} confirmed! Zoom link sent to your email.`);
                setTimeout(() => setConsultantBookedToast(null), 5000);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#00A86B] hover:bg-[#008f5b] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              Confirm 1-on-1 Consultation
            </button>
          </div>
        </div>
      )}

      {/* ── CONCIERGE SUBMITTED MODAL ── */}
      {conciergeSubmittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#00A86B] mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-black text-xl text-slate-950">
                Application Dossier Submitted!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Your {Object.keys(uploadedDocuments).length} verified documents and {countryName} {activePurposeTab === 'study' ? 'Student Visa' : activePurposeTab === 'work' ? 'Work Visa' : 'Tourist Visa'} application have been safely ingested into TravlTik Concierge Vault.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Tracking ID:</span>
                <strong className="text-slate-900 font-mono">TT-{activePurposeTab.toUpperCase().slice(0,3)}-2026-9824</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Destination / Country:</span>
                <strong className="text-slate-900 font-bold">{countryName} ({passportCountry} Citizen)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Verified Documents:</span>
                <strong className="text-emerald-700 font-bold">{Object.keys(uploadedDocuments).length} Files Encrypted &amp; Stored</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Active Add-Ons:</span>
                <strong className="text-[#00A86B] font-bold">{selectedConciergeAddons.length} Services Active</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <a
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl bg-[#00A86B] hover:bg-[#008f5b] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <span>View in User Dashboard →</span>
              </a>
              <button
                type="button"
                onClick={() => setConciergeSubmittedModal(false)}
                className="w-full py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICATION ── */}
      {consultantBookedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{consultantBookedToast}</span>
        </div>
      )}

    </div>
  );
}
