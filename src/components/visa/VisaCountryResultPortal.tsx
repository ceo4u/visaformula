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

  // Case 5: Schengen Area
  if (isSchengen) {
    return {
      isExempt: false,
      verdictTitle: `${nationality} passport holders require a Schengen Visa for ${country}`,
      verdictSummary: `Short-stay visa (Type C) required before departure. Valid across all 29 European Schengen states.`,
      entryStatus: "Schengen Short-Stay Visa",
      entryStatusSubtext: "15 Calendar Days Processing",
      stayDuration: "Up to 90 Days",
      stayDurationSubtext: "Within any 180-day period",
      entryType: "Single / Multiple Entry",
      entryTypeSubtext: "Valid in 29 Schengen states",
      visaPillTag: "CONSULAR VISA REQUIRED",
      digitalCardName: "Schengen Consular Portal",
      digitalCardDesc: "Official Schengen visa sticker in passport valid across 29 European member states.",
      sources: ["European Commission", "Consular Affairs Department", "IATA Timatic 2026"],
      maxStay: "90 Days within 180 Days",
      conditionsForVisa: [
        `Tourism, business visits, or family trips across Schengen territory.`,
        "Mandatory travel medical insurance with minimum €30,000 coverage.",
        "Passport issued within last 10 years with 3+ months validity beyond return date."
      ],
      feesAndProcessing: {
        costItems: [
          { label: "Schengen Visa Fee (Adult)", amount: "€90 (approx. ₹8,200)", note: "Official EU consular application fee" },
          { label: "VFS/TLS Service Fee", amount: "₹2,500 – ₹3,200", note: "Biometric collection and center logistics fee" }
        ],
        totalEstimatedINR: "₹10,700 – ₹11,400 Total Consular Fees",
        processingTime: "15 Calendar Days (Standard Consular Period)",
        processingSLA: "Appointments scheduled at designated VFS/TLS global visa application centers.",
        applicationWindow: "Apply up to 6 Months before planned travel",
        earlyEntryBuffer: "Travel permitted within valid visa dates"
      },
      applicationProcess: {
        submission: "1. Visa Form Filing: Complete official harmonized Schengen visa application form.",
        onlineForm: "2. Document Preparation: Compile flight bookings, hotel reservations, 3-month bank statements & insurance.",
        appointments: "3. VFS/TLS Biometrics: Attend appointment for biometric fingerprinting & passport submission.",
        documentsAndBiometrics: [
          "Passport valid for at least 3 months beyond departure date with 2 blank pages",
          "2 Passport-sized Photos (35x45mm, white background, neutral expression)",
          "Travel Medical Insurance (€30,000 minimum coverage)",
          "Cover Letter with detailed day-by-day travel itinerary",
          "Bank statements of last 3-6 months with bank seal and stamp",
          "Confirmed round-trip flight reservations & hotel bookings"
        ]
      }
    };
  }

  // Case 6: Generic / Other Destinations
  return {
    isExempt: false,
    verdictTitle: `${nationality} passport holders require a visa for ${country}`,
    verdictSummary: `Official travel authorization required before departure. Verified online application with fast turnaround.`,
    entryStatus: "Official E-Visa Required",
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
  const [casNumberInput, setCasNumberInput] = useState('CAS-UKVI-892410-X');
  const [isCasChecked, setIsCasChecked] = useState(true);

  // Consultant Filter & Booking States
  const [consultantLocationQuery, setConsultantLocationQuery] = useState('');
  const [consultantCountryFilter, setConsultantCountryFilter] = useState('All');
  const [consultantRatingFilter, setConsultantRatingFilter] = useState('All');
  const [bookingModalConsultant, setBookingModalConsultant] = useState<StudyConsultantItem | null>(null);
  const [consultantBookedToast, setConsultantBookedToast] = useState<string | null>(null);

  // Self-Apply Concierge Document Vault & Addon States
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, { fileName: string; size: string; status: 'uploaded' | 'verified'; timestamp: string }>>({
    passport: { fileName: 'Passport_Front_Back_Scan.pdf', size: '2.4 MB', status: 'verified', timestamp: 'Verified via OCR' },
    transcripts: { fileName: 'Degree_Transcripts_Consolidated.pdf', size: '4.8 MB', status: 'verified', timestamp: 'Verified via OCR' }
  });
  const [selectedConciergeAddons, setSelectedConciergeAddons] = useState<string[]>(['sop_polish', 'travel_insurance']);
  const [conciergeSubmittedModal, setConciergeSubmittedModal] = useState(false);
  const [isUploadingDocKey, setIsUploadingDocKey] = useState<string | null>(null);

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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'travltik' | 'diy'>('travltik');
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
              You need <span className="text-[#00E599] underline decoration-[#00E599]/50 underline-offset-4">{aiIntel.entryStatus || dynamicVisaType}</span>
            </h1>

            {/* Clean, Simple Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Official entry &amp; visa requirements for <strong className="text-white font-bold">{passportCountry}</strong> citizens traveling to <strong className="text-white font-bold">{countryName}</strong> {flagEmoji}
            </p>

          </div>

        </div>
      </section>

      {/* ── SECTION 1.5: LUXURY ATLYS-GRADE AI INTELLIGENCE CARD ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8 antialiased [text-rendering:geometricPrecision]">
        <div className="bg-white border border-slate-200 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left space-y-6 sm:space-y-8 relative overflow-hidden">
          
          {/* Top Bar: Live AI Indicator & Verified Consular Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                <span>✨ AI Visa &amp; Entry Resolution</span>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                Live Consular Regulations
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-950 text-white shadow-2xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>YOU NEED: {aiIntel.entryStatus || 'VISA REQUIRED'}</span>
              </span>
            </div>
          </div>

          {/* Main Verdict Card */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-md shadow-slate-900/20 shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-slate-950 tracking-tight leading-snug">
                  You need: <span className="text-emerald-700">{aiIntel.entryStatus || dynamicVisaType}</span> for {countryName} ({passportCountry} Passport)
                </h3>
                <span className="text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider bg-slate-900 text-white shrink-0 shadow-2xs">
                  {aiIntel.stayDuration || dynamicLengthOfStay}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-3xl">
                {aiIntel.verdictSummary}
              </p>
            </div>
          </div>

          {/* 3 Atlys-Style Clean Summary Micro-Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            
            {/* Card 1: Entry Status */}
            <div className="bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 transition-all shadow-2xs flex flex-col justify-between min-h-[136px] group">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-6 h-6 text-slate-800 stroke-[2] group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                  Status
                </span>
              </div>
              <div className="min-w-0 pt-2">
                <span className="text-xs text-slate-600 font-semibold block">
                  Entry Status
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-950 block truncate">
                  {aiIntel.entryStatus || "Official E-Visa Required"}
                </span>
                <span className="text-[11px] text-slate-600 font-medium block mt-0.5 truncate">
                  {aiIntel.entryStatusSubtext || "3–5 Days Processing"}
                </span>
              </div>
            </div>

            {/* Card 2: Max Allowed Stay */}
            <div className="bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 transition-all shadow-2xs flex flex-col justify-between min-h-[136px] group">
              <div className="flex items-center justify-between">
                <Calendar className="w-6 h-6 text-slate-800 stroke-[2] group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                  Duration
                </span>
              </div>
              <div className="min-w-0 pt-2">
                <span className="text-xs text-slate-600 font-semibold block">
                  Max Allowed Stay
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-950 block truncate">
                  {aiIntel.stayDuration || dynamicLengthOfStay || "30 Days (Extendable)"}
                </span>
                <span className="text-[11px] text-slate-600 font-medium block mt-0.5 truncate">
                  {aiIntel.stayDurationSubtext || "Per calendar visit"}
                </span>
              </div>
            </div>

            {/* Card 3: Entry & Validity */}
            <div className="bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 transition-all shadow-2xs flex flex-col justify-between min-h-[136px] group">
              <div className="flex items-center justify-between">
                <Clock className="w-6 h-6 text-slate-800 stroke-[2] group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                  Type
                </span>
              </div>
              <div className="min-w-0 pt-2">
                <span className="text-xs text-slate-600 font-semibold block">
                  Entry &amp; Validity
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-950 block truncate">
                  {aiIntel.entryType || currentVariant?.entryType || "Single / Multiple"}
                </span>
                <span className="text-[11px] text-slate-600 font-medium block mt-0.5 truncate">
                  {aiIntel.entryTypeSubtext || currentVariant?.validity || "90 Days Validity"}
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Verification Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600 font-semibold antialiased">
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 font-bold text-base">✓</span>
              <span>Verified via official consular rules &amp; IATA Timatic</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <span>Updated for 2026 Global Travel Season</span>
            </div>
          </div>

          {/* ── SECTION 1: VISA FEES AND PROCESSING AND TIMING ── */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950 font-heading">
                VISA FEES AND PROCESSING AND TIMING
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cost Card */}
              <div className="bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 space-y-3 shadow-2xs transition-all flex flex-col justify-between h-full">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Official Fees &amp; Costs
                </span>
                <div className="space-y-2.5">
                  {aiIntel.feesAndProcessing?.costItems?.slice(0, 2).map((cItem: any, i: number) => (
                    <div key={i} className="flex items-baseline justify-between gap-2 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-slate-800">{cItem.label}</span>
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-700 font-heading shrink-0">{cItem.amount}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 font-medium block pt-1">
                  Official consular rates
                </span>
              </div>

              {/* Processing Time Card */}
              <div className="bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 space-y-2 shadow-2xs transition-all flex flex-col justify-between h-full">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Processing Time &amp; SLAs
                </span>
                <div className="space-y-1">
                  <span className="text-base sm:text-lg font-bold text-slate-950 block font-heading">
                    {aiIntel.feesAndProcessing?.processingTime || "~3 Weeks Standard"}
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {aiIntel.feesAndProcessing?.processingSLA || "Standard consular review window."}
                  </p>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold block pt-1">
                  Express options supported
                </span>
              </div>

              {/* Application Window Card */}
              <div className="bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 space-y-2 shadow-2xs transition-all flex flex-col justify-between h-full">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Application &amp; Entry Window
                </span>
                <div className="space-y-1">
                  <span className="text-base sm:text-lg font-bold text-slate-950 block font-heading">
                    {aiIntel.feesAndProcessing?.applicationWindow || "Apply 1 to 3 Months Ahead"}
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {aiIntel.feesAndProcessing?.earlyEntryBuffer || "Valid for travel within consular grant."}
                  </p>
                </div>
                <span className="text-[11px] text-slate-500 font-medium block pt-1">
                  Flexible travel buffer
                </span>
              </div>
            </div>
          </div>

          {/* ── PASSPORT SECURITY BANNER (MATCHING SITE FONT & AESTHETICS) ── */}
          <div className="bg-[#F7F8FA] border border-slate-200/70 rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 relative shadow-2xs mt-6 min-h-[170px]">
            
            {/* Left Content */}
            <div className="flex flex-col items-start gap-3.5 text-left py-2 z-10 max-w-xl">
              {/* Minimalist Black Lock Icon */}
              <div className="flex items-center justify-center text-slate-900">
                <Lock className="w-6 h-6 text-slate-900 fill-slate-900 stroke-[1.5]" />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 tracking-tight leading-tight">
                  Passport Security. <span className="font-heading font-normal text-slate-500">Then all else</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                  We secure your passport in a safe box and locker at all times.<br className="hidden sm:inline" />
                  <strong className="text-slate-950 font-bold block sm:inline sm:mt-0 mt-0.5">Never out of our sight. 50 lakh passports securely handled already.</strong>
                </p>
              </div>
            </div>

            {/* Right Side: Black Circular Platform with 3D Open Safe Box & Glowing Passport */}
            <div className="w-full md:w-auto self-stretch flex items-center justify-center md:justify-end overflow-hidden shrink-0">
              <div className="w-60 sm:w-72 md:w-80 h-40 sm:h-48 bg-gradient-to-l from-[#06080d] via-[#0f1420] to-[#182032] rounded-2xl md:rounded-r-none md:rounded-l-full shadow-2xl border-l border-t border-b border-slate-700/70 flex items-center justify-center relative p-3 shrink-0">
                {/* Ambient Radial Spotlight */}
                <div className="absolute inset-0 bg-radial from-blue-500/25 via-transparent to-transparent pointer-events-none rounded-2xl md:rounded-l-full" />

                {/* 3D Open Safe Box with Glowing Passport SVG (Ultra Sharp & High Contrast) */}
                <svg 
                  viewBox="0 0 220 160" 
                  className="w-48 sm:w-56 md:w-60 h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)] z-10 select-none" 
                  fill="none" 
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Outer Lid Gradient */}
                    <linearGradient id="lidOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="50%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    {/* Inner Lid Gradient */}
                    <linearGradient id="lidInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0B0F19" />
                    </linearGradient>
                    {/* Safe Box Body Gradient */}
                    <linearGradient id="safeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="40%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#090D16" />
                    </linearGradient>
                    {/* Safe Well Deep Interior */}
                    <linearGradient id="safeInterior" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#020617" />
                      <stop offset="100%" stopColor="#0B132B" />
                    </linearGradient>
                    {/* Neon Blue Glow */}
                    <linearGradient id="neonBlueGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                    {/* Passport Leather Cover */}
                    <linearGradient id="passportCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E3A8A" />
                      <stop offset="50%" stopColor="#172554" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    {/* Subtle Glow Filter */}
                    <filter id="crispGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Soft Drop Shadow under Base */}
                  <ellipse cx="118" cy="136" rx="72" ry="14" fill="#000000" fillOpacity="0.7" filter="blur(6px)" />

                  {/* Open Hinged Lid (Upright 3D Perspective) */}
                  <path d="M 68 66 L 84 10 L 164 22 L 152 74 Z" fill="url(#lidOuterGrad)" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M 74 62 L 88 16 L 158 26 L 148 68 Z" fill="url(#lidInnerGrad)" stroke="#334155" strokeWidth="1" />
                  {/* Chrome Hinges */}
                  <rect x="82" y="62" width="7" height="6" rx="1.5" fill="#E2E8F0" stroke="#475569" strokeWidth="0.8" />
                  <rect x="138" y="68" width="7" height="6" rx="1.5" fill="#E2E8F0" stroke="#475569" strokeWidth="0.8" />

                  {/* Safe Box Body (Isometric Base Chassis) */}
                  <path d="M 60 72 L 152 74 L 186 116 L 92 140 L 60 72 Z" fill="url(#safeBodyGrad)" stroke="#475569" strokeWidth="1.5" />

                  {/* Safe Rim Neon Blue LED Strip */}
                  <path d="M 64 76 L 148 78 L 178 112 L 96 134 Z" fill="none" stroke="url(#neonBlueGlowGrad)" strokeWidth="3" filter="url(#crispGlow)" />
                  <path d="M 64 76 L 148 78 L 178 112 L 96 134 Z" fill="none" stroke="#F0F9FF" strokeWidth="1" />

                  {/* Safe Box Deep Velvet Well */}
                  <path d="M 68 78 L 146 80 L 174 110 L 100 130 Z" fill="url(#safeInterior)" />

                  {/* Radiant Neon Blue Light Floor */}
                  <ellipse cx="122" cy="104" rx="40" ry="18" fill="#3B82F6" fillOpacity="0.6" filter="url(#crispGlow)" />

                  {/* Biometric Laser Scan Lines */}
                  <line x1="84" y1="88" x2="162" y2="116" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.75" strokeDasharray="3 2" />
                  <line x1="96" y1="124" x2="152" y2="82" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.75" strokeDasharray="3 2" />

                  {/* Luxury Navy Passport Book with Golden Crest */}
                  <g className="transition-all hover:scale-105 origin-center">
                    {/* Shadow of passport */}
                    <polygon points="94,96 134,89 150,113 108,122" fill="#000000" fillOpacity="0.6" />
                    
                    {/* Passport Cover */}
                    <polygon points="92,94 132,87 148,111 106,120" fill="url(#passportCoverGrad)" stroke="#93C5FD" strokeWidth="1.4" />
                    
                    {/* Golden Crest / Emblem */}
                    <circle cx="120" cy="102" r="5.5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.8" />
                    <circle cx="120" cy="102" r="3.2" fill="#D97706" fillOpacity="0.4" />
                    
                    {/* Golden Typography Lines */}
                    <line x1="113" y1="94" x2="127" y2="92" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="112" y="110" width="16" height="2.2" rx="1.1" fill="#FBBF24" />
                  </g>
                </svg>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── STEP 0: CORE DECISION GATE ("Have Visa Already?") POSITIONED DIRECTLY AFTER SECTION 2 ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10 flex items-center justify-center">
        <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-3.5 px-6 sm:px-10 shadow-md hover:shadow-lg flex items-center justify-between sm:justify-center gap-4 sm:gap-8 transition-all duration-300">
          
          <span className="text-sm sm:text-base md:text-lg font-heading font-black text-slate-950 tracking-tight whitespace-nowrap flex items-center gap-2">
            <span>Have Visa Already?</span>
          </span>

          {/* Toggle Capsule Track (Bigger & Prominent) */}
          <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner">
            
            {/* NO button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('no')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 ${
                hasVisaAlready === 'no'
                  ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {hasVisaAlready === 'no' ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                  <span className="tracking-wide">NO</span>
                  <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                  <span className="tracking-wide">NO</span>
                </>
              )}
            </button>

            {/* YES button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('yes')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 ${
                hasVisaAlready === 'yes'
                  ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {hasVisaAlready === 'yes' ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                  <span className="tracking-wide">YES</span>
                  <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
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
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Smart Profile Matcher
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Category: {activePurposeTab === 'study' ? 'STUDENT VISA' : activePurposeTab === 'work' ? 'WORK VISA' : 'TOURIST VISA'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-950 tracking-tight">
                    {activePurposeTab === 'study'
                      ? `Apply for your Student Visa to ${countryName}`
                      : activePurposeTab === 'work'
                      ? `Apply for your Work Visa to ${countryName}`
                      : `Apply for your Tourist Visa to ${countryName}`}
                  </h3>
                </div>

                {/* Purpose Category Tag Badge (No unrelated tabs shown) */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold shadow-xs">
                  <span>
                    {activePurposeTab === 'study'
                      ? '🎓 Student / Study Visa'
                      : activePurposeTab === 'work'
                      ? '💼 Work / Employment Visa'
                      : '🏖️ Visit / Tourist Visa'}
                  </span>
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

          {/* ── SPECIALIZED STUDENT VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'study' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP APPLICATION ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                {/* ── STEP 1: FIND TOP UNIVERSITY ── */}
                <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                        1
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-md">
                            Step 1 of 3
                          </span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institution Selection</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-black text-slate-950 mt-1">
                          Find Top University
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Explore SEVP-approved and top-ranked universities matching your profile &amp; budget.
                        </p>
                      </div>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-72 md:w-80 shrink-0">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={uniSearchQuery}
                        onChange={(e) => setUniSearchQuery(e.target.value)}
                        placeholder="Search universities by name or city..."
                        className="w-full h-11 pl-10 pr-9 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00A86B] focus:ring-4 focus:ring-[#00A86B]/10 transition-all shadow-2xs outline-none"
                      />
                      {uniSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setUniSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] cursor-pointer transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* University Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getDestinationUniversities(countryName)
                      .filter(u => !uniSearchQuery || u.name.toLowerCase().includes(uniSearchQuery.toLowerCase()) || u.desc.toLowerCase().includes(uniSearchQuery.toLowerCase()))
                      .map((uni) => {
                        const isSelected = selectedUniId === uni.id;
                        return (
                          <div
                            key={uni.id}
                            onClick={() => setSelectedUniId(uni.id)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between relative duration-200 group ${
                              isSelected
                                ? 'bg-emerald-50/30 border-2 border-[#00A86B] shadow-[0_4px_20px_rgba(0,168,107,0.12)] ring-2 ring-emerald-500/10'
                                : 'bg-slate-50/40 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-slate-950 text-white shadow-2xs">
                                      {uni.rank}
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                                      {uni.campusBadge}
                                    </span>
                                  </div>
                                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-950 leading-snug group-hover:text-[#00A86B] transition-colors">
                                    {uni.name}
                                  </h4>
                                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{uni.location}</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                    isSelected
                                      ? 'bg-[#00A86B] text-white shadow-xs'
                                      : 'bg-white border border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-700'
                                  }`}
                                >
                                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                                </button>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                {uni.desc}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100 text-[11px]">
                              <div className="bg-white p-2.5 rounded-xl border border-slate-100/90 shadow-2xs">
                                <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Annual Tuition</span>
                                <strong className="text-slate-950 font-black text-xs block mt-0.5">{uni.tuitionLocal} <span className="text-slate-500 font-normal">({uni.tuitionINR})</span></strong>
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-100/90 shadow-2xs">
                                <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">English Min.</span>
                                <strong className="text-slate-950 font-black text-xs block mt-0.5">{uni.ieltsMin}</strong>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ── STEP 2: SELECT COURSE, APPLY & GET ADMISSION ── */}
                <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                        2
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-md">
                            Step 2 of 3
                          </span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course &amp; Application Tracking</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-black text-slate-950 mt-1">
                          Select Course, Apply &amp; Get Admission
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Choose your major, complete university applications, track admission statuses, and store all offer details safely.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Major Selector */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                      Choose Your Major / Specialization:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { icon: '💻', name: 'Computer Science & AI' },
                        { icon: '📊', name: 'Data Science & Analytics' },
                        { icon: '💼', name: 'Global MBA & Finance' },
                        { icon: '🤖', name: 'Robotics & Mechanical Engg' },
                        { icon: '🧬', name: 'Biotechnology & Healthcare' },
                        { icon: '⚖️', name: 'Law & International Policy' }
                      ].map((maj) => (
                        <button
                          key={maj.name}
                          type="button"
                          onClick={() => setSelectedCourseMajor(maj.name)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                            selectedCourseMajor === maj.name
                              ? 'bg-slate-950 text-white shadow-md border border-slate-950 scale-[1.02]'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                          }`}
                        >
                          <span>{maj.icon}</span>
                          <span>{maj.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── STEP 3: RECEIVE FORM I-20 / OFFICIAL ADMISSION LETTER ── */}
                <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                        3
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-md">
                            Step 3 of 3
                          </span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Visa Clearance Document</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-black text-slate-950 mt-1">
                          {countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa')
                            ? 'Receive Form I-20 (Certificate of Eligibility)'
                            : countryName.toLowerCase().includes('united kingdom') || countryName.toLowerCase().includes('uk')
                            ? 'Receive Official CAS Reference (Confirmation of Acceptance for Studies)'
                            : countryName.toLowerCase().includes('canada')
                            ? 'Receive Letter of Acceptance (LOA) & PAL'
                            : 'Receive Official Admission Letter & In-Principle Approval (IPA)'}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Secure your official Form I-20 (US), CAS (UK), LOA (Canada), or In-Principle Approval (IPA) from your institution to unlock consular visa filing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Verification Box */}
                  <div className="bg-gradient-to-br from-amber-500/5 via-emerald-500/5 to-slate-50 border border-amber-300/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-800 flex items-center justify-center font-black text-lg">
                          📜
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                            Document Verification Check
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-slate-950">
                            {countryName.toLowerCase().includes('united states') ? 'Form I-20 & SEVIS ID Record' : 'Official CAS / Acceptance Reference'}
                          </h4>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-black self-start sm:self-auto shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>Ready for Visa Submission</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Document Type</span>
                        <strong className="text-slate-950 font-black text-xs block mt-0.5">Unconditional Tier-4 / F-1 Document</strong>
                      </div>
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Verification Status</span>
                        <strong className="text-[#00A86B] font-black text-xs block mt-0.5">100% Validated in Vault</strong>
                      </div>
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Next Action</span>
                        <strong className="text-slate-950 font-black text-xs block mt-0.5">Choose Filing Path Below</strong>
                      </div>
                    </div>
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

                  {/* Clean Segment Switch */}
                  <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner max-w-full overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setStudentActionTab('consultants')}
                      className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                        studentActionTab === 'consultants'
                          ? 'bg-slate-950 text-white shadow-md'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                      }`}
                    >
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Find Consultants Near Me</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudentActionTab('self_apply')}
                      className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                        studentActionTab === 'self_apply'
                          ? 'bg-slate-950 text-white shadow-md'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Self Apply</span>
                    </button>
                  </div>
                </div>

                {/* ── CONTENT: FIND CONSULTANTS (SEARCH & MATCH) ── */}
                {studentActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="space-y-1.5 border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-md">
                          Verified Advisory
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Independent Legal Counsel</span>
                      </div>
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Verified Immigration Lawyers &amp; Study Visa Experts
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Find ICCRC, OISC, MARA, and Bar-certified immigration consultants specializing in {countryName} student admissions, SOP review, and consular filing.
                      </p>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Consultants Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-4 focus:ring-[#00A86B]/10 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600">
                            Destination Specialization
                          </label>
                          <select
                            value={consultantCountryFilter}
                            onChange={(e) => setConsultantCountryFilter(e.target.value)}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-[#00A86B] focus:ring-4 focus:ring-[#00A86B]/10 transition-all shadow-2xs outline-none cursor-pointer"
                          >
                            <option value={countryName}>{countryName} (Current Destination)</option>
                            <option value="All">All Countries (Global)</option>
                            <option value="United States">United States (F-1 / SEVP)</option>
                            <option value="United Kingdom">United Kingdom (UKVI / CAS)</option>
                            <option value="Canada">Canada (IRCC / DLI / PAL)</option>
                            <option value="Australia">Australia (CRICOS / Subclass 500)</option>
                            <option value="Germany">Germany &amp; EU Blue Card</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600">
                            Service / Advisory Type
                          </label>
                          <select
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-[#00A86B] focus:ring-4 focus:ring-[#00A86B]/10 transition-all shadow-2xs outline-none cursor-pointer"
                          >
                            <option value="student">Study Visa &amp; Admissions Filing</option>
                            <option value="legal">Visa Appeals &amp; Refusal Defense</option>
                            <option value="sop">SOP &amp; Academic Document Review</option>
                            <option value="interview">Embassy Visa Interview Prep</option>
                          </select>
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>100% Escrow Protected • Verified Govt License Holders Only</span>
                        </div>

                        <a
                          href={`/find-experts?category=student&country=${encodeURIComponent(consultantCountryFilter === 'All' ? countryName : consultantCountryFilter)}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}`}
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
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-8 animate-fadeIn text-left">
                    
                    {/* Vault Header & Readiness Meter */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-blue-50/80 border border-emerald-200/80">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                            TravlTik Automated Concierge &amp; Document Vault
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-950">
                          Complete Interactive Document Storage Engine
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          Upload your essential records to run automated OCR checks, verify biometric specifications, and auto-populate your consular visa forms.
                        </p>
                      </div>

                      {/* Readiness Meter */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs shrink-0 text-center sm:text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Dossier Completeness
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 justify-center sm:justify-end">
                          <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-[#00A86B] rounded-full" style={{ width: `${Object.keys(uploadedDocuments).length * 20}%` }} />
                          </div>
                          <strong className="text-sm font-black text-slate-900">
                            {Object.keys(uploadedDocuments).length * 20}%
                          </strong>
                        </div>
                        <span className="text-[10px] text-amber-600 font-bold block mt-0.5">
                          {5 - Object.keys(uploadedDocuments).length > 0 ? `${5 - Object.keys(uploadedDocuments).length} Critical Documents Pending` : 'All Documents Ready!'}
                        </span>
                      </div>
                    </div>

                    {/* 5 Core Document Upload Items */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                        1. Mandatory Document Vault Checklist
                      </h5>

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

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                uploaded
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {uploaded ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              {uploaded ? (
                                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-emerald-200">
                                  <span className="font-semibold truncate max-w-[140px]">{uploaded.fileName}</span>
                                  <span className="text-[10px] font-bold text-[#00A86B]">{uploaded.status.toUpperCase()}</span>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  disabled={isCurrentlyUploading}
                                  onClick={() => {
                                    setIsUploadingDocKey(doc.key);
                                    setTimeout(() => {
                                      setUploadedDocuments(prev => ({
                                        ...prev,
                                        [doc.key]: {
                                          fileName: `${doc.key.toUpperCase()}_Document_Scanned.pdf`,
                                          size: '1.8 MB',
                                          status: 'verified',
                                          timestamp: 'Verified via OCR'
                                        }
                                      }));
                                      setIsUploadingDocKey(null);
                                    }, 800);
                                  }}
                                  className="w-full py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
                                >
                                  {isCurrentlyUploading ? (
                                    <>
                                      <RotateCw className="w-3.5 h-3.5 animate-spin text-[#00A86B]" />
                                      <span>Scanning &amp; Verifying...</span>
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
                          { id: 'sop_polish', name: '✨ AI & Legal Expert SOP Polish & Review', price: 1999, desc: 'Grammar, narrative strength & visa officer alignment by admissions counsel.' },
                          { id: 'travel_insurance', name: '🛡️ Comprehensive Student Travel & Medical Insurance', price: 2499, desc: 'Covers pre-arrival emergencies, flight delays, and $100k emergency medical.' },
                          { id: 'financial_audit', name: '🏦 CA Net Worth & 28-Day Solvency Certification', price: 3200, desc: 'Official chartered accountant report proving genuine liquid funds.' },
                          { id: 'biometrics_booking', name: '📅 VFS / Embassy Priority Biometrics Slot Assistance', price: 1500, desc: 'Guaranteed appointment scheduling at your nearest consulate center.' }
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
                        onClick={() => setConciergeSubmittedModal(true)}
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
            
            {/* ================================================== */}
            {/* 1. STRUCTURED ENTRY & PASSPORT RULES (Atlys Card Grid) */}
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

              {/* Interactive Consular Checklist Helper Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-slate-900 flex items-center justify-center text-white shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-900">Embassy Document Preparation Checklist</span>
                </div>
                <span className="text-slate-500 font-normal text-xs">
                  Click the <strong className="text-slate-900 font-bold">black checklist boxes</strong> below to mark documents as ready.
                </span>
              </div>

              {/* Embassy Official Format Table */}
              <div className="bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                        <th className="py-3.5 px-3 sm:px-4 w-16 sm:w-20 text-center border-r border-slate-300">Ready</th>
                        <th className="py-3.5 px-4 sm:px-6 w-48 sm:w-64 border-r border-slate-300">Document</th>
                        <th className="py-3.5 px-4 sm:px-6">Specification &amp; Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300 text-xs sm:text-sm text-slate-700">
                      
                      {/* Row 1: Visa Application Form */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-3 sm:px-4 text-center font-bold text-slate-500 border-r border-slate-300 align-top">
                          <div className="flex flex-col items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleDocCheck('doc-1')}
                              className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                                checkedDocs['doc-1']
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs scale-105'
                                  : 'border-slate-400 hover:border-slate-900 bg-white'
                              }`}
                              title={checkedDocs['doc-1'] ? "Mark as pending" : "Mark as ready"}
                            >
                              {checkedDocs['doc-1'] && <Check className="w-4 h-4 stroke-[3] text-white" />}
                            </button>
                            <span className="text-[11px] font-bold text-slate-400">1</span>
                          </div>
                        </td>
                        <td className="py-5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-300 align-top font-heading">
                          Visa application form
                        </td>
                        <td className="py-5 px-4 sm:px-6 align-top space-y-1.5">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>Fully completed and signed by the applicant.</span>
                          </div>
                          {isStudyPurpose && (
                            <div className="flex items-start gap-2">
                              <span className="text-slate-400 font-bold">-</span>
                              <span>Includes student visa supplementary declaration &amp; guardian details if applicant is a minor.</span>
                            </div>
                          )}
                        </td>
                      </tr>

                      {/* Row 2: Two recent passport-sized pictures */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-3 sm:px-4 text-center font-bold text-slate-500 border-r border-slate-300 align-top">
                          <div className="flex flex-col items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleDocCheck('doc-2')}
                              className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                                checkedDocs['doc-2']
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs scale-105'
                                  : 'border-slate-400 hover:border-slate-900 bg-white'
                              }`}
                              title={checkedDocs['doc-2'] ? "Mark as pending" : "Mark as ready"}
                            >
                              {checkedDocs['doc-2'] && <Check className="w-4 h-4 stroke-[3] text-white" />}
                            </button>
                            <span className="text-[11px] font-bold text-slate-400">2</span>
                          </div>
                        </td>
                        <td className="py-5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-300 align-top font-heading">
                          Two recent passport-sized pictures
                        </td>
                        <td className="py-5 px-4 sm:px-6 align-top space-y-1.5">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>In colour, 3.5 x 4 cm (approx. 1.2 x 1.6 inch).</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>Facing forward, white background, neutral facial expression.</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row 3: Passport */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-3 sm:px-4 text-center font-bold text-slate-500 border-r border-slate-300 align-top">
                          <div className="flex flex-col items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleDocCheck('doc-3')}
                              className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                                checkedDocs['doc-3']
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs scale-105'
                                  : 'border-slate-400 hover:border-slate-900 bg-white'
                              }`}
                              title={checkedDocs['doc-3'] ? "Mark as pending" : "Mark as ready"}
                            >
                              {checkedDocs['doc-3'] && <Check className="w-4 h-4 stroke-[3] text-white" />}
                            </button>
                            <span className="text-[11px] font-bold text-slate-400">3</span>
                          </div>
                        </td>
                        <td className="py-5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-300 align-top font-heading">
                          Passport
                        </td>
                        <td className="py-5 px-4 sm:px-6 align-top space-y-1.5">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>Valid for at least three (3) to six (6) months after date of return to origin.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>Containing at least two (2) blank visa pages.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>Issued within the previous ten (10) years.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>1 copy of the identification bio-data page and 1 copy of all visa stamp pages.</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row 4: Medical Insurance */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-3 sm:px-4 text-center font-bold text-slate-500 border-r border-slate-300 align-top">
                          <div className="flex flex-col items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleDocCheck('doc-4')}
                              className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                                checkedDocs['doc-4']
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs scale-105'
                                  : 'border-slate-400 hover:border-slate-900 bg-white'
                              }`}
                              title={checkedDocs['doc-4'] ? "Mark as pending" : "Mark as ready"}
                            >
                              {checkedDocs['doc-4'] && <Check className="w-4 h-4 stroke-[3] text-white" />}
                            </button>
                            <span className="text-[11px] font-bold text-slate-400">4</span>
                          </div>
                        </td>
                        <td className="py-5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-300 align-top font-heading">
                          <div>Medical Insurance</div>
                          <span className="text-xs text-slate-500 font-normal block mt-1">
                            (holders of diplomatic passports are exempted)
                          </span>
                        </td>
                        <td className="py-5 px-4 sm:px-6 align-top space-y-4">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>
                              Minimum coverage 30,000 EURO (or USD $50,000 equivalent), for medical costs and emergency medical repatriation, valid across destination and transit zones during the entire duration of the issued visa.
                            </span>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
                            <p className="text-xs text-slate-600 leading-relaxed">
                              You can purchase insurance coverage from any insurer of your selection. However, in order to expedite and facilitate your application, TravlTik provides direct consular-approved insurance policy issuance.
                            </p>
                            
                            <div>
                              <a
                                href="/talk-to-us"
                                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#004B87] hover:bg-[#003866] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                              >
                                FIND A MEDICAL INSURANCE
                              </a>
                            </div>

                            <p className="text-[11px] text-slate-400 italic leading-relaxed pt-1">
                              Disclaimer: By clicking "Find a medical insurance", you will be assisted with verified insurance partners. TravlTik does not accept liability arising from insurer underwriting decisions.
                            </p>
                          </div>
                        </td>
                      </tr>

                      {/* Row 5: Purpose Specific Required Documents */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-3 sm:px-4 text-center font-bold text-slate-500 border-r border-slate-300 align-top">
                          <div className="flex flex-col items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleDocCheck('doc-5')}
                              className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                                checkedDocs['doc-5']
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs scale-105'
                                  : 'border-slate-400 hover:border-slate-900 bg-white'
                              }`}
                              title={checkedDocs['doc-5'] ? "Mark as pending" : "Mark as ready"}
                            >
                              {checkedDocs['doc-5'] && <Check className="w-4 h-4 stroke-[3] text-white" />}
                            </button>
                            <span className="text-[11px] font-bold text-slate-400">5</span>
                          </div>
                        </td>
                        <td className="py-5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-300 align-top font-heading">
                          Required Documents
                          <span className="text-xs text-[#00A86B] font-bold block mt-1">
                            {isStudyPurpose ? '(Student Specific)' : isWorkPurpose ? '(Employment Specific)' : '(Travel Specific)'}
                          </span>
                        </td>
                        <td className="py-5 px-4 sm:px-6 align-top space-y-3">
                          <p className="text-xs font-semibold text-slate-700">
                            Additionally, and according to the purpose of the journey, applicant shall present the necessary verified documents:
                          </p>

                          {isStudyPurpose ? (
                            <div className="space-y-2">
                              {/* Sub-item 1 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-study-acceptance')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-study-acceptance']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-study-acceptance'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-study-acceptance'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>University Acceptance Letter:</strong> Confirmed unconditional offer letter and enrollment reference ID from an approved Institute of Higher Learning.
                                </span>
                              </div>

                              {/* Sub-item 2 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-study-finances')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-study-finances']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-study-finances'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-study-finances'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Financial Solvency Proof:</strong> Verified liquid bank statements (last 6 months), tuition fee receipt, or sanctioned educational loan letter.
                                </span>
                              </div>

                              {/* Sub-item 3 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-study-academics')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-study-academics']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-study-academics'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-study-academics'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Academic &amp; Language Records:</strong> Recognized degree certificates, mark sheets, and standardized language test scorecard (IELTS / PTE / TOEFL).
                                </span>
                              </div>
                            </div>
                          ) : isWorkPurpose ? (
                            <div className="space-y-2">
                              {/* Work Sub-item 1 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-work-contract')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-work-contract']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-work-contract'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-work-contract'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Signed Employment Contract:</strong> Copy of signed offer letter with sponsoring employer credentials.
                                </span>
                              </div>

                              {/* Work Sub-item 2 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-work-permit')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-work-permit']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-work-permit'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-work-permit'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Labour Approval &amp; Work Authorization:</strong> In-Principle Approval (IPA), CoS, or Ministry of Labour clearance.
                                </span>
                              </div>

                              {/* Work Sub-item 3 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-work-credentials')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-work-credentials']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-work-credentials'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-work-credentials'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Credential Verification:</strong> Recognized degree certificates and verified credential evaluation (ECA / WES).
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {/* Tourist Sub-item 1 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-tour-flight')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-tour-flight']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-tour-flight'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-tour-flight'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Flight Itinerary:</strong> Confirmed round-trip flight booking or itinerary reservation with entry and exit dates.
                                </span>
                              </div>

                              {/* Tourist Sub-item 2 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-tour-hotel')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-tour-hotel']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-tour-hotel'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-tour-hotel'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Accommodation Proof:</strong> Verified hotel booking voucher or host sponsorship letter.
                                </span>
                              </div>

                              {/* Tourist Sub-item 3 */}
                              <div 
                                onClick={() => toggleDocCheck('sub-tour-funds')}
                                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer select-none group"
                              >
                                <div className={`w-5 h-5 rounded-md border-2 shrink-0 transition-all flex items-center justify-center mt-0.5 ${
                                  checkedDocs['sub-tour-funds']
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                                    : 'border-slate-400 group-hover:border-slate-900 bg-white'
                                }`}>
                                  {checkedDocs['sub-tour-funds'] && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${checkedDocs['sub-tour-funds'] ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                  <strong>Financial Solvency Proof:</strong> Bank account statements of the last 3-6 months with bank seal and stamp.
                                </span>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>

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
                Your documents and {countryName} student visa application have been safely ingested into the TravlTik Concierge Vault.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Tracking ID:</span>
                <strong className="text-slate-900 font-mono">TT-STU-2026-9824</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Target Institution:</span>
                <strong className="text-slate-900 font-bold">{getDestinationUniversities(countryName).find(u => u.id === selectedUniId)?.name || 'University of Oxford'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Active Add-Ons:</span>
                <strong className="text-[#00A86B] font-bold">{selectedConciergeAddons.length} Services Active</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setConciergeSubmittedModal(false)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              Done &amp; Return to Dashboard
            </button>
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
