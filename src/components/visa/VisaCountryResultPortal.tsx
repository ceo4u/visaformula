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
  Camera, 
  Smartphone, 
  Award,
  Truck,
  Zap,
  CheckCircle,
  HelpCircle as QuestionIcon
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
    validity: '6 Months to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Standard Visitor Visa',
    processingDays: 15,
    governmentFeeINR: 12500,
    serviceFeeINR: 5200,
    variants: [
      { id: 'tourist-6m', label: 'Standard Visitor (6 Months)', stay: '6 Months', govFee: 12500, servFee: 5200, popular: true },
      { id: 'visitor-2y', label: 'Long Term Visitor (2 Years)', stay: '6 Months/Visit', govFee: 45000, servFee: 8500 },
      { id: 'priority-uk', label: 'Priority 5-Day Fast-Track', stay: '6 Months', govFee: 38000, servFee: 9500 },
    ]
  },
  'united-kingdom': {
    countryName: 'United Kingdom',
    flagEmoji: '🇬🇧',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '6 Months',
    validity: '6 Months to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Standard Visitor Visa',
    processingDays: 15,
    governmentFeeINR: 12500,
    serviceFeeINR: 5200,
    variants: [
      { id: 'tourist-6m', label: 'Standard Visitor (6 Months)', stay: '6 Months', govFee: 12500, servFee: 5200, popular: true },
      { id: 'visitor-2y', label: 'Long Term Visitor (2 Years)', stay: '6 Months/Visit', govFee: 45000, servFee: 8500 },
      { id: 'priority-uk', label: 'Priority 5-Day Fast-Track', stay: '6 Months', govFee: 38000, servFee: 9500 },
    ]
  },
  usa: {
    countryName: 'United States',
    flagEmoji: '🇺🇸',
    heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 6 Months',
    validity: '10 Years',
    entryType: 'Multiple Entry',
    visaType: 'B1/B2 Visitor Visa',
    processingDays: 25,
    governmentFeeINR: 15500,
    serviceFeeINR: 6500,
    variants: [
      { id: 'b1-b2-10y', label: 'B1/B2 Tourist & Business (10 Years)', stay: '6 Months/Visit', govFee: 15500, servFee: 6500, popular: true },
      { id: 'f1-student', label: 'F-1 Student Visa Stamping', stay: 'Duration of Study', govFee: 15500, servFee: 7500 },
    ]
  },
  canada: {
    countryName: 'Canada',
    flagEmoji: '🇨🇦',
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 6 Months',
    validity: 'Up to 10 Years',
    entryType: 'Multiple Entry',
    visaType: 'Temporary Resident Visa',
    processingDays: 18,
    governmentFeeINR: 11000,
    serviceFeeINR: 4900,
    variants: [
      { id: 'trv-10y', label: 'Tourist TRV (Up to 10 Years)', stay: '6 Months/Visit', govFee: 11000, servFee: 4900, popular: true },
      { id: 'super-visa', label: 'Super Visa (Parents & Grandparents)', stay: '5 Years/Visit', govFee: 14500, servFee: 6900 },
    ]
  },
  france: {
    countryName: 'France (Schengen)',
    flagEmoji: '🇫🇷',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '90 Days in 180 Days',
    validity: 'Up to 90 Days',
    entryType: 'Multiple Entry Schengen',
    visaType: 'Schengen Sticker Visa',
    processingDays: 12,
    governmentFeeINR: 8200,
    serviceFeeINR: 4200,
    variants: [
      { id: 'schengen-tourist', label: 'Short-Stay Tourist (90 Days)', stay: '90 Days', govFee: 8200, servFee: 4200, popular: true },
      { id: 'schengen-business', label: 'Business / Conference Visa', stay: '90 Days', govFee: 8200, servFee: 4900 },
    ]
  },
  germany: {
    countryName: 'Germany (Schengen)',
    flagEmoji: '🇩🇪',
    heroImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '90 Days',
    validity: '90 Days',
    entryType: 'Multiple Entry',
    visaType: 'Schengen Sticker Visa',
    processingDays: 14,
    governmentFeeINR: 8200,
    serviceFeeINR: 4500,
    variants: [
      { id: 'germany-tourist', label: 'Tourist Schengen (90 Days)', stay: '90 Days', govFee: 8200, servFee: 4500, popular: true },
      { id: 'opportunity-card', label: 'Opportunity Card (Chancenkarte)', stay: '1 Year', govFee: 7500, servFee: 8500 },
    ]
  },
  japan: {
    countryName: 'Japan',
    flagEmoji: '🇯🇵',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '15 / 30 / 90 Days',
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

  // States
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0].id);
  const [passportCountry, setPassportCountry] = useState(initialPassport || 'India');
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('400001');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'validating' | 'supported'>('supported');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'travltik' | 'diy'>('travltik');
  const [isApplying, setIsApplying] = useState(false);

  // Selected Variant Data
  const currentVariant = useMemo(() => {
    return variants.find(v => v.id === selectedVariantId) || variants[0];
  }, [selectedVariantId, variants]);

  const totalGovFee = currentVariant.govFee * travellerCount;
  const totalServFee = currentVariant.servFee * travellerCount;
  const grandTotal = totalGovFee + totalServFee;

  const guaranteedDate = useMemo(() => formatTargetDate(processingDays), [processingDays]);

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

  const handleStartApplication = () => {
    setIsApplying(true);
    setTimeout(() => {
      window.location.href = `/services/apply-visa?country=${encodeURIComponent(countryName)}&passport=${encodeURIComponent(passportCountry)}&travellers=${travellerCount}&variant=${encodeURIComponent(currentVariant.label)}`;
    }, 450);
  };

  const faqs = [
    {
      question: `Do ${passportCountry} citizens need a visa for ${countryName}?`,
      answer: `Yes, passport holders of ${passportCountry} require an official visa or approved electronic authorization before traveling to ${countryName}. TravlTik handles end-to-end processing with verified doorstep collection and 99.4% approval rate.`
    },
    {
      question: `What is the guaranteed delivery date?`,
      answer: `We guarantee that your approved ${countryName} visa will be delivered by ${guaranteedDate}. In the rare event of an embassy system delay, you receive real-time SMS/WhatsApp updates and 100% service fee protection.`
    },
    {
      question: `How does free doorstep document pickup work?`,
      answer: `Once you apply, our background-checked executive visits your address with a tamper-evident, barcoded safety envelope. Your passport is transported directly in GPS-tracked transit boxes to our biometric vault.`
    },
    {
      question: `Can I take my passport photo with a smartphone?`,
      answer: `Yes! Our AI Photo Validator automatically removes backgrounds, corrects lighting, and crops your selfie to the exact millimeter dimensions required by the ${countryName} consulate.`
    },
    {
      question: `What is the refund policy if my visa is rejected?`,
      answer: `TravlTik offers 100% service fee refund protection if an application is rejected due to document verification issues prior to consulate submission.`
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00A86B] selection:text-white">
      
      {/* ── BREADCRUMB & MINI NAVIGATION BAR ── */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <a href="/" className="hover:text-slate-900 transition-colors">Home</a>
            <span>/</span>
            <a href="/find-experts" className="hover:text-slate-900 transition-colors">Visas</a>
            <span>/</span>
            <span className="text-slate-900 font-bold">{countryName} Visa for {passportCountry}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Consulate Open &amp; Accepting Applications
            </span>
          </div>
        </div>
      </div>

      {/* ── ATLYS ULTRA-MODERN HERO SHOWCASE BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-950 min-h-[360px] sm:min-h-[420px] flex items-end p-6 sm:p-10 md:p-12 shadow-2xl">
          
          {/* Background Destination Photography */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Hero Floating Content */}
          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            
            {/* Guaranteed Delivery Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-extrabold uppercase tracking-wide">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Guaranteed on {guaranteedDate}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {countryName} Visa for {passportCountry} Citizens {flagEmoji}
            </h1>

            <p className="text-base sm:text-xl font-medium text-slate-200 leading-relaxed max-w-2xl">
              Get your official {countryName} visa in <strong className="text-white font-bold">{processingDays} business days</strong> with zero embassy visits and free doorstep document pickup.
            </p>

            {/* Key Specification Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                Stay: <span className="text-emerald-300">{lengthOfStay}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                Validity: <span className="text-amber-300">{validity}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                Type: <span className="text-blue-300">{visaType}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                Entry: <span className="text-purple-300">{entryType}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── MAIN 2-COLUMN DUAL WORKSPACE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── LEFT COLUMN (7 COLS): Modern Guided Product Flow ── */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            {/* 1. 4 Quick Specification Pill Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Length of Stay
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 block mt-1">
                  {lengthOfStay}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                  Tourist &amp; Leisure
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Validity
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 block mt-1">
                  {validity}
                </span>
                <span className="text-[11px] font-bold text-blue-600 block mt-0.5">
                  From issue date
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Entry Type
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 block mt-1">
                  {entryType.split('/')[0].trim()}
                </span>
                <span className="text-[11px] font-bold text-purple-600 block mt-0.5">
                  Official Stamping
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Processing Time
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 block mt-1">
                  {processingDays} Days
                </span>
                <span className="text-[11px] font-bold text-amber-600 block mt-0.5">
                  Fast-Track
                </span>
              </div>
            </div>

            {/* 2. ATLYS 3-STEP VISUAL PROGRESSION */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#00A86B]">
                  Effortless 3-Step Process
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How getting your {countryName} visa works
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                
                {/* Step 1 */}
                <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start gap-5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0 font-black text-lg">
                    1
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">
                        Scan your passport on your phone
                      </h3>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">
                        2 Mins
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Simply take a picture of your passport biodata page. Our automated OCR extracts your details with 100% accuracy and eliminates spelling errors.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start gap-5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-black text-lg">
                    2
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">
                        We review, verify &amp; submit to consulate
                      </h3>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                        100% Compliant
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Our certified immigration lawyers pre-screen your documents against official embassy rules and submit directly to the fast-track queue.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start gap-5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-black text-lg">
                    3
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">
                        Receive your approved visa on {guaranteedDate}
                      </h3>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                        Guaranteed
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Your verified visa is emailed directly to your inbox and physically delivered in a secure tamper-proof envelope with real-time tracking.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. FREE DOORSTEP COURIER PINCODE CHECKER */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#00A86B] flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Free Doorstep Pickup &amp; Return Coverage
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Verified courier collects documents right from your home or office
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 mt-4">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeCheck(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 400001)"
                    className="w-full h-12 pl-10 pr-4 rounded-2xl border border-slate-300 font-black text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-white shadow-2xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handlePincodeCheck(pincode)}
                  className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
                >
                  Verify
                </button>
              </div>

              {pincodeStatus === 'supported' && (
                <div className="mt-3.5 flex items-center gap-2 text-xs font-bold text-[#00A86B] bg-white border border-emerald-200/90 rounded-2xl p-3 shadow-2xs">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Doorstep Document Pickup &amp; Return is 100% available in pincode {pincode} (Next Morning Slot)</span>
                </div>
              )}
            </div>

            {/* 4. PASSPORT SECURITY GUARANTEE CARD (OBSIDIAN THEME) */}
            <div className="relative rounded-[32px] overflow-hidden bg-slate-950 border border-slate-800 p-7 sm:p-9 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-lg">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Passport Security. Above all else.
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                    We secure your physical passport in tamper-evident barcoded safety pouches and GPS-tracked biometric vaults. Handled exclusively by background-checked officers.
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col gap-3 w-full sm:w-auto">
                  <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-md">
                    <span className="text-xl font-black text-[#00FF66] block">₹5,00,000</span>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Transit Insurance</span>
                  </div>
                  <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-md">
                    <span className="text-xl font-black text-amber-300 block">50 Lakh+</span>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Passports Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. ATLYS VS DIY COMPARISON SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Why travelers choose TravlTik over DIY
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* TravlTik Way */}
                <div className="bg-emerald-50/50 border-2 border-emerald-200/90 rounded-3xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>WITH TRAVLTIK</span>
                  </div>
                  <ul className="space-y-2 text-xs font-bold text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>5-minute photo scan from home</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>Free home pickup &amp; return</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>Guaranteed approval on {guaranteedDate}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>100% money-back guarantee</span>
                    </li>
                  </ul>
                </div>

                {/* DIY Way */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-red-600 font-black text-sm">
                    <X className="w-5 h-5 text-red-500" />
                    <span>DOING IT YOURSELF</span>
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-slate-500">
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400" />
                      <span>Long embassy queues &amp; VFS slots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400" />
                      <span>Physical paperwork &amp; notary stress</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400" />
                      <span>High risk of rejection for minor errors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400" />
                      <span>Zero refund on visa rejection</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 6. FAQS ACCORDION */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
                Frequently Asked Questions
              </h3>

              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-black text-slate-900 text-sm hover:bg-slate-50/50 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
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

          </div>

          {/* ── RIGHT COLUMN (5 COLS): Signature Sticky Atlys Price Card ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border-2 border-slate-900 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.07)] text-left relative space-y-6">
              
              {/* Top Guaranteed Delivery Header */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#00FF66] text-slate-950 flex items-center justify-center font-black">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Guaranteed Delivery
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white block">
                      {guaranteedDate}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#00FF66] border border-emerald-500/30">
                  Fast-Track
                </span>
              </div>

              {/* Visa Type Variant Selector Pills */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Select Visa Plan
                </label>
                <div className="space-y-2">
                  {variants.map((v) => {
                    const isSelected = selectedVariantId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-slate-900 bg-slate-900' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="text-xs font-black text-slate-900 block leading-tight">
                              {v.label}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold">
                              Stay: {v.stay}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-black text-slate-900">
                          ₹{(v.govFee + v.servFee).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Number of Travellers Stepper */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Number of Travellers
                  </label>
                  <span className="text-xs font-black text-blue-600">
                    {travellerCount} {travellerCount === 1 ? 'Applicant' : 'Applicants'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2">
                  <div className="flex items-center gap-2.5 pl-3">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-bold text-slate-800">Total Travellers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={travellerCount <= 1}
                      onClick={() => setTravellerCount(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 disabled:opacity-40 font-bold flex items-center justify-center cursor-pointer transition-all shadow-2xs"
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
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 disabled:opacity-40 font-bold flex items-center justify-center cursor-pointer transition-all shadow-2xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="border-t border-b border-slate-100 py-3.5 space-y-2 text-xs font-medium">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Government Visa Fees ({travellerCount}x)</span>
                  <span className="font-bold text-slate-900">₹{totalGovFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    TravlTik Concierge &amp; Filing
                    <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded">PROMO</span>
                  </span>
                  <span className="font-bold text-slate-900">₹{totalServFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Doorstep Courier &amp; Transit Insurance</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
              </div>

              {/* Total Amount Header */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Total Amount
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  All taxes &amp; fees included
                </span>
              </div>

              {/* High-Converting Primary Button */}
              <button
                type="button"
                onClick={handleStartApplication}
                disabled={isApplying}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-black text-sm sm:text-base tracking-wide shadow-xl shadow-slate-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isApplying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Application...</span>
                  </>
                ) : (
                  <>
                    <span>Start Application</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

              {/* Direct Support Badges */}
              <div className="pt-2 flex items-center justify-between gap-2">
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
                  <span>Call Support</span>
                </a>
              </div>

              {/* Trust Footer */}
              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted • 99.4% Approval Record</span>
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── MOBILE FLOATING STICKY ACTION BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Guaranteed {guaranteedDate.split(',')[0]}
          </span>
          <span className="text-lg font-black text-slate-900">
            ₹{grandTotal.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleStartApplication}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs tracking-wide shadow-md cursor-pointer active:scale-95"
        >
          Start Application
        </button>
      </div>

    </div>
  );
}
