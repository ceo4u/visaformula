import React, { useState, useMemo } from 'react';
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
  UploadCloud, 
  Smartphone, 
  Award,
  Truck
} from 'lucide-react';

export interface VisaCountryData {
  countryCode: string;
  countryName: string;
  flagUrl: string;
  heroImage: string;
  tagline?: string;
  lengthOfStay: string;
  validity: string;
  entryType: string;
  visaType: string;
  processingDays: number;
  governmentFeeINR: number;
  serviceFeeINR: number;
  currencySymbol: string;
  pincodeSupported: boolean;
  requiredDocuments: {
    title: string;
    description: string;
    iconType: 'passport' | 'finance' | 'photo' | 'ticket' | 'work' | 'student';
    badge: string;
  }[];
  processStepsTravlTik: {
    step: number;
    title: string;
    desc: string;
  }[];
  processStepsDIY: {
    step: number;
    title: string;
    painPoint: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const COUNTRY_DATABASE: Record<string, Partial<VisaCountryData>> = {
  china: {
    countryName: 'China',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '90 Days',
    entryType: 'Single Entry',
    visaType: 'Sticker Visa',
    processingDays: 7,
    governmentFeeINR: 7800,
    serviceFeeINR: 5900,
  },
  uae: {
    countryName: 'United Arab Emirates',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 or 60 Days',
    validity: '60 Days',
    entryType: 'Single / Multiple',
    visaType: 'Express E-Visa',
    processingDays: 3,
    governmentFeeINR: 6500,
    serviceFeeINR: 2400,
  },
  dubai: {
    countryName: 'Dubai (UAE)',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '60 Days',
    entryType: 'Single Entry',
    visaType: 'Express E-Visa',
    processingDays: 2,
    governmentFeeINR: 6500,
    serviceFeeINR: 2400,
  },
  australia: {
    countryName: 'Australia',
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 3 Months',
    validity: '1 Year',
    entryType: 'Multiple Entry',
    visaType: 'Subclass 600 / eVisitor',
    processingDays: 15,
    governmentFeeINR: 10500,
    serviceFeeINR: 4500,
  },
  uk: {
    countryName: 'United Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '6 Months',
    validity: '6 Months to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Standard Visitor / Student Visa',
    processingDays: 15,
    governmentFeeINR: 12500,
    serviceFeeINR: 5200,
  },
  'united-kingdom': {
    countryName: 'United Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '6 Months',
    validity: '6 Months to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Standard Visitor / Student Visa',
    processingDays: 15,
    governmentFeeINR: 12500,
    serviceFeeINR: 5200,
  },
  usa: {
    countryName: 'United States',
    heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 6 Months',
    validity: '10 Years',
    entryType: 'Multiple Entry',
    visaType: 'B1/B2 Visitor Visa',
    processingDays: 30,
    governmentFeeINR: 15500,
    serviceFeeINR: 6500,
  },
  'united-states': {
    countryName: 'United States',
    heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 6 Months',
    validity: '10 Years',
    entryType: 'Multiple Entry',
    visaType: 'B1/B2 Visitor Visa',
    processingDays: 30,
    governmentFeeINR: 15500,
    serviceFeeINR: 6500,
  },
  canada: {
    countryName: 'Canada',
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 6 Months',
    validity: 'Up to Passport Expiry (10 Yrs)',
    entryType: 'Multiple Entry',
    visaType: 'Temporary Resident Visa / Student',
    processingDays: 20,
    governmentFeeINR: 11000,
    serviceFeeINR: 4900,
  },
  singapore: {
    countryName: 'Singapore',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '30 Days to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Paper E-Visa with QR',
    processingDays: 4,
    governmentFeeINR: 2500,
    serviceFeeINR: 2200,
  },
  france: {
    countryName: 'France (Schengen)',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '90 Days in 180 Days',
    validity: 'Up to 90 Days',
    entryType: 'Multiple Entry Schengen',
    visaType: 'Schengen Sticker Visa',
    processingDays: 12,
    governmentFeeINR: 8200,
    serviceFeeINR: 4200,
  },
  germany: {
    countryName: 'Germany (Schengen)',
    heroImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '90 Days',
    validity: '90 Days',
    entryType: 'Multiple Entry',
    visaType: 'Schengen Sticker Visa / Opportunity Card',
    processingDays: 14,
    governmentFeeINR: 8200,
    serviceFeeINR: 4500,
  },
  japan: {
    countryName: 'Japan',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '15 / 30 / 90 Days',
    validity: '90 Days',
    entryType: 'Single / Multiple',
    visaType: 'eVisa / Embassy Sticker',
    processingDays: 6,
    governmentFeeINR: 3500,
    serviceFeeINR: 2900,
  },
  thailand: {
    countryName: 'Thailand',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 / 60 Days',
    validity: '60 Days',
    entryType: 'Single Entry / Visa Free / E-Visa',
    visaType: 'E-Visa on Arrival / Tourist Permit',
    processingDays: 2,
    governmentFeeINR: 4200,
    serviceFeeINR: 1800,
  },
  vietnam: {
    countryName: 'Vietnam',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 or 90 Days',
    validity: '90 Days',
    entryType: 'Multiple Entry E-Visa',
    visaType: 'Official E-Visa',
    processingDays: 3,
    governmentFeeINR: 3200,
    serviceFeeINR: 1900,
  },
};

function formatTargetDate(daysToAdd: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  return d.toLocaleDateString('en-US', options);
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
  const heroImage = baseData.heroImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=85';
  const lengthOfStay = baseData.lengthOfStay || '30 Days';
  const validity = baseData.validity || '90 Days';
  const entryType = baseData.entryType || 'Single / Multiple Entry';
  const visaType = baseData.visaType || 'Official E-Visa / Sticker';
  const processingDays = baseData.processingDays || 5;
  const govFee = baseData.governmentFeeINR || 6500;
  const servFee = baseData.serviceFeeINR || 3500;

  // Interactive States
  const [passportCountry, setPassportCountry] = useState(initialPassport || 'India');
  const [purpose, setPurpose] = useState(initialPurpose || 'tourism');
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('400001');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'validating' | 'supported'>('supported');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'travltik' | 'diy'>('travltik');
  const [isApplying, setIsApplying] = useState(false);

  // Dynamic Calculated Fees
  const totalGovFee = govFee * travellerCount;
  const totalServFee = servFee * travellerCount;
  const grandTotal = totalGovFee + totalServFee;

  const guaranteedDate = useMemo(() => formatTargetDate(processingDays), [processingDays]);

  const handlePincodeCheck = (code: string) => {
    setPincode(code);
    if (code.length === 6) {
      setPincodeStatus('validating');
      setTimeout(() => {
        setPincodeStatus('supported');
      }, 400);
    } else {
      setPincodeStatus('idle');
    }
  };

  const handleStartApplication = () => {
    setIsApplying(true);
    setTimeout(() => {
      window.location.href = `/services/apply-visa?country=${encodeURIComponent(countryName)}&passport=${encodeURIComponent(passportCountry)}&travellers=${travellerCount}`;
    }, 600);
  };

  // Step-by-Step Timelines
  const travlTikSteps = [
    { step: 1, title: 'Apply in 5 Mins', desc: 'Scan your passport on phone with auto-OCR error detection.' },
    { step: 2, title: 'Free Home Pickup', desc: 'Verified courier collects original documents from your doorstep.' },
    { step: 3, title: 'Consulate Verification', desc: 'Our ex-consular lawyers verify 100% compliance before submission.' },
    { step: 4, title: 'Embassy Processing', desc: 'Fast-track priority queue processing with zero physical queues.' },
    { step: 5, title: 'Insured Delivery', desc: 'Approved visa and passport delivered right back to your home.' }
  ];

  const diySteps = [
    { step: 1, title: 'Complex Form Search', painPoint: 'Confusing government portals with broken links and captcha loops.' },
    { step: 2, title: 'Booking Center Slots', painPoint: 'Waiting 3-6 weeks for elusive VFS appointment slots.' },
    { step: 3, title: 'Physical Queues', painPoint: 'Standing 4 hours in early morning security lines with physical paperwork.' },
    { step: 4, title: 'High Rejection Risk', painPoint: 'A single typo or wrong photo background leads to 100% loss of fees.' },
    { step: 5, title: 'Manual Tracking Stress', painPoint: 'No notifications or status updates for weeks on end.' }
  ];

  const faqs = [
    {
      question: `Do ${passportCountry} citizens need a visa for ${countryName}?`,
      answer: `Yes, passport holders of ${passportCountry} require an official visa or approved electronic authorization before traveling to ${countryName}. TravlTik handles end-to-end processing with verified doorstep collection and 99.4% approval rate.`
    },
    {
      question: `How long does ${countryName} visa processing take?`,
      answer: `Normal processing typically takes ${processingDays} to ${processingDays + 3} business working days. With TravlTik guaranteed express clearance, your application is verified and dispatched directly to the official consulate.`
    },
    {
      question: `What happens if my ${countryName} visa gets delayed?`,
      answer: `We provide real-time WhatsApp and SMS tracking at every checkpoint. If any embassy query arises, our dedicated specialist resolves it instantly on your behalf without requiring you to visit any center.`
    },
    {
      question: `Is physical passport submission required for ${countryName}?`,
      answer: visaType.toLowerCase().includes('sticker') 
        ? `Yes, for sticker visas, your physical passport is collected via GPS-tracked tamper-evident pouches and stored in high-security biometric vaults.` 
        : `No, for e-Visas, you only need to submit a digital smartphone photo scan of your passport biodata page.`
    },
    {
      question: `What is the refund and cancellation policy?`,
      answer: `TravlTik offers full service-fee protection. If your application cannot be processed due to pre-submission issues, 100% of our service fee is refunded immediately.`
    }
  ];

  const reviews = [
    { name: 'Aarav Mehta', loc: 'Mumbai', stars: 5, date: '2 days ago', text: `Got my ${countryName} visa in just ${processingDays} days! The doorstep pickup was on time and stress-free.` },
    { name: 'Dr. Sunita Rao', loc: 'Bangalore', stars: 5, date: 'Last week', text: 'Atlys/TravlTik made the whole embassy paperwork seamless. The photo validator flagged my background immediately.' },
    { name: 'Rohit Deshmukh', loc: 'Delhi NCR', stars: 5, date: '3 weeks ago', text: 'Saved me 8 hours of standing at the visa center. Transparent fee breakdown with zero hidden charges.' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-[#00A86B] selection:text-white">
      
      {/* ── SECTION 1: CINEMATIC HERO CONTAINER (EDITORIAL ATLYS STYLE) ── */}
      <section className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Background Image with Deep Editorial Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 transform hover:scale-100"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-slate-950/90" />

        {/* Content Box */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center flex flex-col items-center">
          
          {/* Quick Verified Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>Official Embassy Fast-Track 2026</span>
          </div>

          {/* Heading in High-End Editorial Serif */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif leading-[1.12] max-w-4xl">
            {countryName} Visa for {passportCountry} Citizens
          </h1>

          {/* Sub-headline in Bright Neon Green */}
          <p className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-[#00FF66] tracking-tight">
            done entirely from your home
          </p>

          {/* Quick Specification Pills */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              VALID: <span className="text-amber-300 font-extrabold">{validity}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              STAY: <span className="text-emerald-300 font-extrabold">{lengthOfStay}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              TYPE: <span className="text-blue-300 font-extrabold">{visaType}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              ENTRY: <span className="text-purple-300 font-extrabold">{entryType}</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('visa-calculator-widget');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00FF66] hover:bg-[#00e55c] text-slate-950 text-sm sm:text-base font-black tracking-wide shadow-[0_10px_30px_rgba(0,255,102,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start New Application</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <a
              href={`/find-experts?country=${encodeURIComponent(countryName)}`}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Talk to {countryName} Visa Specialist</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: MAIN DUAL-COLUMN WORKSPACE (CALCULATOR & PINCODE CHECKER) ── */}
      <section id="visa-calculator-widget" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Editorial Features, Specs & Pincode Checker (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Editorial Title */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00A86B] block mb-1">
                Zero Embassy Visits • Doorstep Service
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-900 leading-tight">
                Get your {countryName} visa from the comfort of your home
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                No standing in lines, no physical embassy appointments, no paperwork stress. Our concierge team manages everything from document collection to consulate stamping.
              </p>
            </div>

            {/* 3 Core Feature Specification Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs text-left">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Length of Stay
                </span>
                <span className="text-base sm:text-xl font-black text-slate-900 block mt-1">
                  {lengthOfStay}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
                  Single / Multiple
                </span>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs text-left">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Visa Validity
                </span>
                <span className="text-base sm:text-xl font-black text-slate-900 block mt-1">
                  {validity}
                </span>
                <span className="text-[11px] text-blue-600 font-bold block mt-0.5">
                  From issue date
                </span>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs text-left">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Entry Type
                </span>
                <span className="text-base sm:text-xl font-black text-slate-900 block mt-1">
                  {entryType.split('/')[0].trim()}
                </span>
                <span className="text-[11px] text-purple-600 font-bold block mt-0.5">
                  Official Stamping
                </span>
              </div>
            </div>

            {/* Live Pincode Coverage Checker */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Free Doorstep Pickup &amp; Return Coverage
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Check if our verified courier services your address
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeCheck(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 400001)"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-slate-50/50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handlePincodeCheck(pincode)}
                  className="h-12 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Verify
                </button>
              </div>

              {pincodeStatus === 'supported' && (
                <div className="mt-3.5 flex items-center gap-2 text-xs font-bold text-[#00A86B] bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Doorstep Document Pickup &amp; Return is 100% available in pincode {pincode}</span>
                </div>
              )}
            </div>

            {/* Highlighted Assurance Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">On-Time Guarantee</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Receive your passport &amp; visa on or before the committed date.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">99.4% Approval Record</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Ex-consulate officers inspect documentation to eliminate errors.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Application Calculator Widget (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border-2 border-slate-900 rounded-[28px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-left relative overflow-hidden">
              
              {/* Guaranteed Delivery Ribbon */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-2xl flex items-center justify-between shadow-sm mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚡</span>
                  <span className="text-xs font-black uppercase tracking-wider">
                    Guaranteed on {guaranteedDate}
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md">
                  Fast-Track
                </span>
              </div>

              {/* Travellers Counter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Number of Travellers
                  </label>
                  <span className="text-xs font-extrabold text-blue-600">
                    {travellerCount} {travellerCount === 1 ? 'Applicant' : 'Applicants'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2">
                  <div className="flex items-center gap-3 pl-3">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-bold text-slate-800">Travellers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={travellerCount <= 1}
                      onClick={() => setTravellerCount(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 disabled:opacity-40 font-bold flex items-center justify-center cursor-pointer transition-all"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-black text-slate-900 text-sm">
                      {travellerCount}
                    </span>
                    <button
                      type="button"
                      disabled={travellerCount >= 10}
                      onClick={() => setTravellerCount(prev => Math.min(10, prev + 1))}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 disabled:opacity-40 font-bold flex items-center justify-center cursor-pointer transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown Table */}
              <div className="border-t border-b border-slate-100 py-4 space-y-2.5 text-xs font-medium">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Government Visa Fees ({travellerCount}x ₹{govFee.toLocaleString()})</span>
                  <span className="font-bold text-slate-900">₹{totalGovFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    TravlTik Concierge &amp; Pickup Fee
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded">PROMO</span>
                  </span>
                  <span className="font-bold text-slate-900">₹{totalServFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Doorstep Courier Insurance</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="mt-4 mb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Total Amount
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  All taxes &amp; fees included
                </span>
              </div>

              {/* Primary Call to Action */}
              <button
                onClick={handleStartApplication}
                disabled={isApplying}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isApplying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Loading Application...</span>
                  </>
                ) : (
                  <>
                    <span>Start Application</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

              {/* Secondary Business / Work Link */}
              <div className="mt-3 text-center">
                <a
                  href={`/services/apply-visa?country=${encodeURIComponent(countryName)}&type=business`}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 underline transition-colors"
                >
                  Looking for a business or student visa?
                </a>
              </div>

              {/* Instant WhatsApp & Phone Support */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href="https://wa.me/912264231551"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Help</span>
                </a>

                <a
                  href="tel:+912264231551"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700" />
                  <span>Call +91 22-6423-1551</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: GUARANTEE & PASSPORT SECURITY BANNER (DARK GLASSMORPHIC) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-left text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-tight text-white">
                Passport Security. Then all else.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                We secure your physical passport in tamper-proof barcoded safety boxes and GPS-monitored biometric vaults at all times. Over <strong className="text-white">50 Lakh+ passports</strong> safely processed with zero losses.
              </p>
            </div>

            <div className="shrink-0 grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-[#00FF66] block">₹5,00,000</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                  Transit Insurance
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-amber-300 block">100% Vault</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                  CCTV Monitored
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE VISA PROCESS (ATLYS VS DIY TIMELINE) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00A86B] block mb-1">
            Simplified Experience
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900">
            How the {countryName} Visa Process Works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            See how TravlTik transforms weeks of stressful bureaucracy into 5 effortless steps.
          </p>

          {/* Toggle Switch */}
          <div className="mt-6 inline-flex p-1 rounded-full bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setActiveTab('travltik')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === 'travltik' ? 'bg-[#00A86B] text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              DOING IT WITH TRAVLTIK
            </button>
            <button
              onClick={() => setActiveTab('diy')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === 'diy' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              DOING IT YOURSELF (DIY)
            </button>
          </div>
        </div>

        {/* Dynamic Timeline Progression Cards */}
        {activeTab === 'travltik' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {travlTikSteps.map((s) => (
              <div 
                key={s.step} 
                className="bg-white border-2 border-emerald-100 hover:border-[#00A86B] rounded-2xl p-5 text-left transition-all shadow-xs hover:shadow-md relative group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00A86B] font-black text-sm flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <h4 className="text-sm font-black text-slate-900 group-hover:text-[#00A86B] transition-colors">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {diySteps.map((s) => (
              <div 
                key={s.step} 
                className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 text-left transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 font-black text-sm flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <h4 className="text-sm font-bold text-red-200">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-400 font-normal mt-1.5 leading-relaxed">
                  {s.painPoint}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── SECTION 5: ESSENTIAL DOCUMENTS & TRUST REVIEWS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Document Checklist (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00A86B] block">
              Clear &amp; Simple
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Required Documents for {countryName}
            </h3>

            <div className="space-y-3 pt-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Original Passport Scan</h4>
                    <p className="text-xs text-slate-500 font-medium">Valid for minimum 6 months with 2 blank pages</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Mandatory
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Bank Statement / Financial Proof</h4>
                    <p className="text-xs text-slate-500 font-medium">Last 3-6 months with seal or sponsorship letter</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                  Mandatory
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Flight Itinerary &amp; Hotel Proof</h4>
                    <p className="text-xs text-slate-500 font-medium">Auto-generated draft itinerary provided by TravlTik</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Included
                </span>
              </div>
            </div>
          </div>

          {/* Trust Score & Testimonials (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-3xl font-black text-slate-900">4.5 / 5.0</span>
                <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 text-right">
                Rated on Trustpilot,<br />App Store &amp; Play Store
              </span>
            </div>

            {/* Review Cards */}
            <div className="mt-4 space-y-3">
              {reviews.map((r, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{r.name} • {r.loc}</span>
                    <span className="text-slate-400 text-[10px]">{r.date}</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: FREQUENTLY ASKED QUESTIONS (ACCORDION) ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00A86B] block mb-1">
            Answers &amp; Clarity
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            Frequently Asked Questions for {countryName}
          </h3>
        </div>

        <div className="space-y-3 text-left">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 ml-2" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM STICKY MOBILE ACTION BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 px-4 flex items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Guaranteed {guaranteedDate.split(',')[0]}
          </span>
          <span className="text-lg font-black text-slate-900">
            ₹{grandTotal.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleStartApplication}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wide shadow-md cursor-pointer"
        >
          Start Application
        </button>
      </div>

    </div>
  );
}
