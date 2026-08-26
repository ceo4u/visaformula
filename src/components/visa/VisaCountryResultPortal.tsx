import React, { useState, useMemo, useRef } from 'react';
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
  ArrowUpRight,
  ExternalLink,
  BookOpen,
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

  // ── BRANCH 2: QUESTIONNAIRE STATES ──
  const [studyQual, setStudyQual] = useState("Bachelor's Degree");
  const [studyTarget, setStudyTarget] = useState("Master's (PG / MS)");
  const [studyIntake, setStudyIntake] = useState("Fall 2026 (Aug - Sep)");
  const [studyBudget, setStudyBudget] = useState("Self-Funded Liquid Funds (₹25L+)");

  const [visitPlanStatus, setVisitPlanStatus] = useState("Need Curated Tour Packages");
  const [visitTiming, setVisitTiming] = useState("Within 30 Days");
  const [visitTravellers, setVisitTravellers] = useState("Family with Kids / Elders");
  const [visitStay, setVisitStay] = useState("4-5 Star Luxury Resorts");

  const [workExp, setWorkExp] = useState("3 - 5 Years (Mid-Senior)");
  const [workOffer, setWorkOffer] = useState("Actively Seeking Sponsoring Job");
  const [workDomain, setWorkDomain] = useState("Tech / IT / Software / AI");
  const [workAssess, setWorkAssess] = useState("Need WES / ACS Credential Evaluation");

  // ── ATLYS VISA RESULT PORTAL STATES ──
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0].id);
  const [passportCountry, setPassportCountry] = useState(initialPassport || 'India');
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('400001');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'validating' | 'supported'>('supported');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'travltik' | 'diy'>('travltik');

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

  // Days left calculation for Visa
  const daysLeft = useMemo(() => {
    if (!validityDate) return 240;
    const diff = new Date(validityDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [validityDate]);

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
      setApprovedVisaType(`${countryName} Official Approved Permit`);
    }, 1200);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Hi! Here is my verified Pre-Departure & Safe Arrival Roadmap for ${countryName} with TravlTik Escrow & Transit Protection:\n\n• Visa: ${approvedVisaType}\n• Expiry: ${validityDate} (${daysLeft} days valid)\n• Airport Pickup & Housing: Verified ✓\n\nTrack progress live on TravlTik.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
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
      question: `What happens if my visa gets delayed?`,
      answer: `All TravlTik applications are insured up to ₹5,00,000. If our express timeline is missed due to any internal processing delay, you receive an instant 100% refund of your service concierge fee.`
    }
  ];

  return (
    <div className="w-full bg-white text-slate-800 font-sans antialiased [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:optimizeLegibility]">
      
      {/* ── SECTION 1: CINEMATIC ROUNDED HERO BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 text-white shadow-2xl border border-slate-100">
          
          {/* Backdrop Image with Multi-Stop Dark Gradient */}
          <img
            src={heroImage}
            alt={countryName}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5 text-left">
            
            {/* Real-time Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wide">Official Visa Processing • 99.4% Approval</span>
            </div>

            {/* Country Title */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white tracking-tight leading-[1.1] drop-shadow-sm">
                {countryName} Visa {flagEmoji}
              </h1>
              <p className="text-sm sm:text-lg text-slate-200 font-normal sm:font-medium max-w-2xl leading-relaxed pt-1">
                Apply online for {countryName} from the comfort of your home. Doorstep document pickup, AI photo verification &amp; guaranteed delivery.
              </p>
            </div>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>₹5 Lakh Transit Insurance</span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Guaranteed in {processingDays} Days</span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>4.9/5 (18,400+ reviews)</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── STEP 0: CORE DECISION GATE ("Have Visa Already?") ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full py-2.5 px-6 sm:px-8 shadow-sm inline-flex items-center gap-4 sm:gap-6 transition-all">
          
          <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Have Visa Already?
          </span>

          {/* Toggle Capsule Track */}
          <div className="bg-[#f0f4f8] rounded-full p-1 inline-flex items-center gap-1 border border-slate-200/60">
            
            {/* NO button */}
            <button
              type="button"
              onClick={() => setHasVisaAlready('no')}
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
              onClick={() => setHasVisaAlready('yes')}
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN (5 COLS): VISA OCR VERIFIER & AUDIT ── */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 text-left">
              
              {/* Widget Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 text-slate-900 leading-tight">
                      Visa Verification &amp; Expiry
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Auto-expiry tracking &amp; condition audit.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shrink-0">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{daysLeft}d valid</span>
                </div>
              </div>

              {/* Visa Title Input */}
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">
                  Visa Class / Approved Subclass
                </label>
                <input
                  type="text"
                  value={approvedVisaType}
                  onChange={(e) => setApprovedVisaType(e.target.value)}
                  placeholder="e.g. Student Subclass 500 / Tourist Permit"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                />
              </div>

              {/* Approval & Expiry Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">
                    Approval Date
                  </label>
                  <input
                    type="date"
                    value={approvalDate}
                    onChange={(e) => setApprovalDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={validityDate}
                    onChange={(e) => setValidityDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Scan Visa Grant Letter */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                      Scan Visa Grant Letter
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Auto-extracts legal work limits &amp; conditions.
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  ref={visaFileRef}
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleOcrUpload}
                />

                <button
                  type="button"
                  onClick={() => visaFileRef.current?.click()}
                  disabled={isOcrScanning}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-75"
                >
                  {isOcrScanning ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Auditing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{ocrScanned ? 'Re-scan' : 'Scan File'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Active Conditions Checklist */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                    <span>MANDATORY CONDITIONS</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">
                    {ocrConditions.length} Active
                  </span>
                </div>

                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {ocrConditions.map((cond, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 font-medium">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                        <span className="leading-snug">{cond}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOcrConditions(ocrConditions.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-500 p-0.5"
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
                      placeholder="e.g. Work limited to 48 hrs"
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
                      className="px-3 py-1.5 bg-[#00A86B] text-white text-xs font-medium rounded-xl"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingCond(true)}
                    className="text-xs font-medium text-[#00A86B] hover:underline flex items-center gap-1 pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add custom condition manually</span>
                  </button>
                )}
              </div>

              {/* Share CTA */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/25 active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedShare ? 'Status Copied to Clipboard!' : '📱 Share Safety Checklist with Parents (WhatsApp)'}</span>
              </button>

            </div>

            {/* ── RIGHT COLUMN (7 COLS): PARENT'S ROADMAP & ARRIVAL OS ── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* 6 Peace-of-Mind Actions Grid */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 text-slate-900 leading-tight">
                      Parent's Peace-of-Mind Roadmap
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      6 essential safeguards before boarding your flight.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] font-semibold text-xs border border-emerald-200">
                    6 Protections
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Action 1: Transit Visa Check */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">✈️</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          TRANSIT
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                        1. Flight &amp; Layover Transit Check
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
                      className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-all shadow-xs cursor-pointer ${
                        ticketUploaded
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {ticketUploaded ? 'Transit Verified ✓' : 'Upload Flight Ticket'}
                    </button>
                  </div>

                  {/* Action 2: Airport Pickup */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">🚗</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          AIRPORT PICKUP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                        2. Driver &amp; Terminal Chauffeur
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Verified background-checked chauffeur in {countryName}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDriverBooked(!driverBooked)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-all shadow-xs cursor-pointer ${
                        driverBooked
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                      }`}
                    >
                      {driverBooked ? 'Driver Assigned ✓' : 'Book Chauffeur'}
                    </button>
                  </div>

                  {/* Action 3: Escrow Housing */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">🏡</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          ESCROW HOUSING
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                        3. Secure Student / Expat Housing
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Deposit-protected flats and student dorms.
                      </p>
                    </div>

                    <a
                      href="/classifieds?category=accommodation"
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center justify-center gap-1 transition-all text-center"
                    >
                      <span>Find Verified Housing</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Action 4: Peer Network */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">👥</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                          COMMUNITY
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                        4. Peer Network Group
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Connect with 2,400+ travellers moving to {countryName}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPeerJoined(!peerJoined)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-all shadow-xs cursor-pointer ${
                        peerJoined
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
                      }`}
                    >
                      {peerJoined ? 'Group Joined ✓' : 'Join Expat Group'}
                    </button>
                  </div>

                  {/* Action 5: Forex & 5G eSIM */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">💳</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          0% MARKUP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                        5. Multi-Currency Card &amp; 5G eSIM
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Zero forex markup debit card &amp; instant QR eSIM.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEsimOrdered(!esimOrdered)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-all shadow-xs cursor-pointer ${
                        esimOrdered
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {esimOrdered ? 'Card & eSIM Active ✓' : 'Get Free Forex Card'}
                    </button>
                  </div>

                  {/* Action 6: Customs & Prescription Rules */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">📄</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                          CUSTOMS RULES
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                        6. Customs Cash &amp; Doctor Prescription
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Ensure compliance under {countryName} border laws.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">1. Highest Qualification</label>
                      <select
                        value={studyQual}
                        onChange={(e) => setStudyQual(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>12th Grade / High School</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                        <option>Diploma / Polytechnic</option>
                      </select>
                    </div>

                    {/* Q2: Target Degree */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">2. Target Degree in {countryName}</label>
                      <select
                        value={studyTarget}
                        onChange={(e) => setStudyTarget(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Bachelor's (UG Degree)</option>
                        <option>Master's (PG / MS)</option>
                        <option>Post-Graduate Diploma</option>
                        <option>PhD / Doctorate</option>
                      </select>
                    </div>

                    {/* Q3: Target Intake */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">3. Target Intake</label>
                      <select
                        value={studyIntake}
                        onChange={(e) => setStudyIntake(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Fall 2026 (Aug - Sep)</option>
                        <option>Spring 2027 (Jan - Feb)</option>
                        <option>Summer 2027 (May - Jun)</option>
                      </select>
                    </div>

                    {/* Q4: Budget & Funding */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">4. Financial Proof / Funds</label>
                      <select
                        value={studyBudget}
                        onChange={(e) => setStudyBudget(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Self-Funded Liquid Funds (₹25L+)</option>
                        <option>Education Loan Required</option>
                        <option>Full Scholarship / Sponsorship</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* VISIT / TOURISM QUESTIONNAIRE */}
              {activePurposeTab === 'tourism' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Q1: Trip Status */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">1. Trip Planning Status</label>
                      <select
                        value={visitPlanStatus}
                        onChange={(e) => setVisitPlanStatus(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Need Curated Tour Packages</option>
                        <option>I have my Itinerary &amp; Hotel</option>
                        <option>Visiting Family / Relatives</option>
                      </select>
                    </div>

                    {/* Q2: Travel Timing */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">2. Tentative Travel Timing</label>
                      <select
                        value={visitTiming}
                        onChange={(e) => setVisitTiming(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Within 30 Days (Fast-Track)</option>
                        <option>In 1 to 3 Months</option>
                        <option>In 3 to 6 Months</option>
                      </select>
                    </div>

                    {/* Q3: Travellers */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">3. Group / Travellers</label>
                      <select
                        value={visitTravellers}
                        onChange={(e) => setVisitTravellers(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Solo Traveller</option>
                        <option>Couple / Honeymoon</option>
                        <option>Family with Kids / Elders</option>
                        <option>Corporate Business Group</option>
                      </select>
                    </div>

                    {/* Q4: Stay Preference */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">4. Accommodation Preference</label>
                      <select
                        value={visitStay}
                        onChange={(e) => setVisitStay(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>4-5 Star Luxury Resorts</option>
                        <option>Boutique City Hotels</option>
                        <option>Serviced Apartments / Airbnb</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* WORK QUESTIONNAIRE */}
              {activePurposeTab === 'work' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Q1: Exp */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">1. Total Experience</label>
                      <select
                        value={workExp}
                        onChange={(e) => setWorkExp(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>0 - 2 Years (Entry Level)</option>
                        <option>3 - 5 Years (Mid-Senior)</option>
                        <option>6+ Years (Senior / Lead)</option>
                        <option>10+ Years (Executive)</option>
                      </select>
                    </div>

                    {/* Q2: Job Offer */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">2. Sponsoring Job Offer</label>
                      <select
                        value={workOffer}
                        onChange={(e) => setWorkOffer(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Actively Seeking Sponsoring Job</option>
                        <option>Have Confirmed Sponsor Offer</option>
                        <option>Internal Company Transfer (ICT)</option>
                      </select>
                    </div>

                    {/* Q3: Domain */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">3. Industry Domain</label>
                      <select
                        value={workDomain}
                        onChange={(e) => setWorkDomain(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Tech / IT / Software / AI</option>
                        <option>Healthcare &amp; Nursing</option>
                        <option>Banking, Finance &amp; Accounting</option>
                        <option>Civil, Mechanical &amp; Engineering</option>
                      </select>
                    </div>

                    {/* Q4: Credential Assessment */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-600">4. Credential Assessment</label>
                      <select
                        value={workAssess}
                        onChange={(e) => setWorkAssess(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#00A86B]"
                      >
                        <option>Need WES / ACS Credential Evaluation</option>
                        <option>Already Assessed &amp; Approved</option>
                        <option>Exempt / Not Applicable</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Summary Pill */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-500">
                  Profile matched with 100% {countryName} visa compliance requirements.
                </span>
                <span className="font-semibold text-[#00A86B]">
                  Live Pricing &amp; Application Ready Below ↓
                </span>
              </div>

            </div>
          </section>

          {/* ── ATLYS-STYLE 2-COLUMN RESULT & STICKY BOOKING WORKSPACE ── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ── LEFT COLUMN (7 COLS): Guided Product Flow ── */}
              <div className="lg:col-span-7 space-y-10 text-left">
                
                {/* 1. 4 Quick Specification Pill Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                      Length of Stay
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
                      {lengthOfStay}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                      Tourist &amp; Leisure
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                      Validity
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
                      {validity}
                    </span>
                    <span className="text-[11px] font-bold text-blue-600 block mt-0.5">
                      From issue date
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                      Entry Type
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
                      {entryType.split('/')[0].trim()}
                    </span>
                    <span className="text-[11px] font-bold text-purple-600 block mt-0.5">
                      Official Stamping
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                      Processing Time
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-slate-900 block mt-1">
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
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00A86B]">
                      Effortless 3-Step Process
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                      How getting your {countryName} visa works
                    </h2>
                  </div>

                  <div className="space-y-3 pt-2">
                    
                    {/* Step 1 */}
                    <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start gap-5 transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0 font-semibold text-lg">
                        1
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-slate-900">
                            Scan your passport on your phone
                          </h3>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">
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
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-semibold text-lg">
                        2
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-slate-900">
                            TravlTik files directly with the embassy
                          </h3>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            Direct Line
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          Our in-house visa concierge pre-screens documents, pays government embassy fees, and tracks your application daily through official consulate portals.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start gap-5 transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-semibold text-lg">
                        3
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-slate-900">
                            Receive your stamped e-Visa on WhatsApp &amp; Email
                          </h3>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                            Guaranteed
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          Download your official electronic visa or receive your stamped physical passport delivered safely to your doorstep by {guaranteedDate}.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 3. OBSIDIAN PASSPORT SECURITY & ESCROW VAULT BANNER */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-0" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Obsidian Bank-Grade Passport Vault</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-white tracking-tight leading-snug">
                      Your passport is protected by ₹5,00,000 transit insurance
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                      Every physical document is sealed in individual tamper-evident barcoded bags, transported via GPS-tracked logistics, and stored in biometric surveillance vaults. Over 50 Lakh+ passports handled safely.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-xs font-medium text-slate-400 block">Insurance Cover</span>
                        <span className="text-sm sm:text-base font-semibold text-white mt-0.5 block">₹5,00,000</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-xs font-medium text-slate-400 block">Transit Security</span>
                        <span className="text-sm sm:text-base font-semibold text-emerald-400 mt-0.5 block">GPS Tracked</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                        <span className="text-xs font-medium text-slate-400 block">Approval Record</span>
                        <span className="text-sm sm:text-base font-semibold text-white mt-0.5 block">99.4% Highest</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. TRAVLTIK VS DIY COMPARISON MATRIX */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#00A86B]">
                        Clear Advantage
                      </span>
                      <h2 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-slate-900 tracking-tight">
                        Applying with TravlTik vs Doing It Yourself
                      </h2>
                    </div>

                    <div className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => setActiveTimelineTab('travltik')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          activeTimelineTab === 'travltik' ? 'bg-[#00A86B] text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        With TravlTik
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTimelineTab('diy')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          activeTimelineTab === 'diy' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        DIY (On Your Own)
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs">
                    <div className="divide-y divide-slate-100">
                      {[
                        {
                          feature: 'Application Filing Time',
                          travltik: '2 minutes on phone (Instant OCR auto-fill)',
                          diy: '2-3 hours filling tedious government forms',
                          highlight: true
                        },
                        {
                          feature: 'Photo & Document Check',
                          travltik: 'AI millimeter verification & auto background clean',
                          diy: 'High risk of rejection due to wrong sizing',
                          highlight: true
                        },
                        {
                          feature: 'Passport Collection',
                          travltik: 'Free doorstep pickup & return in barcoded envelope',
                          diy: 'Physical trip to VFS center & long queues',
                          highlight: false
                        },
                        {
                          feature: 'Real-Time Updates',
                          travltik: 'Live WhatsApp & SMS notifications at every step',
                          diy: 'Checking slow government portals repeatedly',
                          highlight: false
                        },
                        {
                          feature: 'Rejection Guarantee',
                          travltik: '100% Service Fee Refund & ₹5 Lakh Transit Cover',
                          diy: 'Zero refund, fees forfeited',
                          highlight: true
                        },
                      ].map((row, idx) => (
                        <div key={idx} className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center hover:bg-slate-50/60 transition-colors">
                          <div className="sm:col-span-4 font-bold text-xs sm:text-sm text-slate-900">
                            {row.feature}
                          </div>
                          
                          <div className={`sm:col-span-4 text-xs font-semibold flex items-center gap-2 ${
                            activeTimelineTab === 'travltik' ? 'text-emerald-700 font-bold bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200' : 'text-slate-600'
                          }`}>
                            <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                            <span>{row.travltik}</span>
                          </div>

                          <div className={`sm:col-span-4 text-xs font-semibold flex items-center gap-2 ${
                            activeTimelineTab === 'diy' ? 'text-red-700 font-bold bg-rose-50/80 p-2.5 rounded-xl border border-rose-200' : 'text-slate-400 line-through'
                          }`}>
                            <X className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{row.diy}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. REQUIRED DOCUMENTS CHECKLIST */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00A86B]">
                      Simple Paperwork
                    </span>
                    <h2 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-slate-900 tracking-tight">
                      Documents required for {countryName} Visa
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                          Original Passport / Clear Scan
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Valid for at least 6 months beyond travel date with 2 blank pages.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Camera className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                          1 Passport Photo / Clean Selfie
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          White background. Take selfie on phone, our AI formats it automatically.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Plane className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                          Confirmed Flight Itinerary
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Return or onward ticket. Don't worry, TravlTik can provide embassy itinerary holding.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                          Hotel Booking / Stay Proof
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Verified hotel reservation or host invitation letter for immigration stamping.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. EXPANDABLE FAQ ACCORDION */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00A86B]">
                      Got Questions?
                    </span>
                    <h2 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-slate-900 tracking-tight">
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
                            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer select-none"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />
                          </button>

                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN (5 COLS): STICKY HIGH-CONVERTING BOOKING WIDGET ── */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                
                <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-6 text-left relative overflow-hidden">
                  
                  {/* Delivery Guarantee Pill */}
                  <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-[#00A86B] shrink-0" />
                      <div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-800 block">
                          Delivery Guarantee
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-emerald-950">
                          {guaranteedDate}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                      ON-TIME
                    </span>
                  </div>

                  {/* Visa Plan Selector Pills */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Select Visa Option
                    </label>

                    <div className="space-y-2">
                      {variants.map((v) => {
                        const isSelected = selectedVariantId === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVariantId(v.id)}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'border-[#00A86B] bg-emerald-50/40 shadow-xs ring-1 ring-[#00A86B]/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                                  {v.label}
                                </span>
                                {v.popular && (
                                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-500 text-white uppercase tracking-wider">
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                                Stay: {v.stay} • Valid 90 Days
                              </span>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-sm sm:text-base font-semibold text-slate-900 block">
                                ₹{(v.govFee + v.servFee).toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold block">
                                per traveller
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Doorstep Pincode Checker */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Doorstep Document Pickup
                    </label>

                    <div className="relative flex items-center">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => handlePincodeCheck(e.target.value)}
                        placeholder="Enter 6-digit Pincode"
                        className="w-full h-11 pl-10 pr-24 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                      />
                      
                      <div className="absolute right-2.5">
                        {pincodeStatus === 'supported' ? (
                          <span className="text-[10px] font-medium text-[#00A86B] bg-emerald-100 px-2 py-1 rounded-xl flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Supported</span>
                          </span>
                        ) : pincodeStatus === 'validating' ? (
                          <span className="text-[10px] font-bold text-slate-400">Checking...</span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">Enter PIN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Travellers Counter */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Number of Travellers
                      </label>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={travellerCount <= 1}
                          onClick={() => setTravellerCount(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 disabled:opacity-40 font-bold flex items-center justify-center cursor-pointer transition-all shadow-2xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-semibold text-slate-900 text-sm">
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
                        <span className="text-[9px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">PROMO</span>
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
                      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
                        Total Amount
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
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
                    onClick={handleOpenApplicationModal}
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-slate-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Start Application</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  {/* Direct Support Badges */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <a
                      href="https://wa.me/912264231551"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Help</span>
                    </a>

                    <a
                      href="tel:+912264231551"
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
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
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-4 shadow-2xl">
            <div>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                Guaranteed {guaranteedDate.split(',')[0]}
              </span>
              <span className="text-lg font-semibold text-slate-900">
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleOpenApplicationModal}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-md cursor-pointer active:scale-95"
            >
              Start Application
            </button>
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
