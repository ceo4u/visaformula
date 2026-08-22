'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Calendar,
  Smile,
  ChevronDown,
  ChevronUp,
  Car,
  Hotel,
  UtensilsCrossed,
  Compass,
  ShieldAlert,
  Wand2,
  Tag,
  User,
  Headphones,
  Home as HomeIcon,
  Briefcase,
  Search,
  UserCircle2,
  Check,
  Sun,
  Sunset,
  CloudSun,
  GraduationCap,
  Users,
  Scale,
  Luggage,
  ShieldCheck,
  Globe2,
  FileCheck2,
  Lock,
  Download,
  FileText,
  Plane,
  CreditCard,
  QrCode,
  CheckCircle2,
  Clock,
  UploadCloud,
  ArrowUpRight,
  ExternalLink,
  Shield,
  AlertTriangle,
  Send,
  Building,
  CheckSquare,
  Award,
  X,
  Plus,
  FileUp,
  Save,
  RotateCw,
  Copy,
  CheckCheck,
  Share2,
  MessageCircle,
  Star,
  PhoneCall,
  Phone,
  BookOpen,
  DollarSign,
  TrendingUp,
  HelpCircle,
  ExternalLink as ExternalIcon
} from 'lucide-react';

// Quick-Pill Intent Tags (8 Visa & Overseas Journey Categories)
const categoryPills = [
  { id: 'student', emoji: '🎓', label: 'Student Visa' },
  { id: 'work', emoji: '💼', label: 'Work Permit' },
  { id: 'pr', emoji: '🏡', label: 'PR & Migration' },
  { id: 'tourist', emoji: '🏝️', label: 'Tourist Visa' },
  { id: 'business', emoji: '🏢', label: 'Business & Investor' },
  { id: 'parents', emoji: '👨‍👩‍👧', label: 'Parents Super Visa' },
  { id: 'ielts', emoji: '🗣️', label: 'IELTS / PTE Test' },
  { id: 'emergency', emoji: '🚨', label: 'Urgent Visa Help' },
];

const passportCountryOptions = [
  { value: 'India', label: 'India', icon: '🇮🇳', desc: 'Indian Passport' },
  { value: 'Nepal', label: 'Nepal', icon: '🇳🇵', desc: 'Nepalese Passport' },
  { value: 'Bangladesh', label: 'Bangladesh', icon: '🇧🇩', desc: 'Bangladeshi Passport' },
  { value: 'Sri Lanka', label: 'Sri Lanka', icon: '🇱🇰', desc: 'Sri Lankan Passport' },
  { value: 'Philippines', label: 'Philippines', icon: '🇵🇭', desc: 'Philippine Passport' },
  { value: 'Nigeria', label: 'Nigeria', icon: '🇳🇬', desc: 'Nigerian Passport' },
  { value: 'Pakistan', label: 'Pakistan', icon: '🇵🇰', desc: 'Pakistani Passport' },
  { value: 'UAE', label: 'UAE', icon: '🇦🇪', desc: 'Emirati Passport' },
  { value: 'Canada', label: 'Canada', icon: '🇨🇦', desc: 'Canadian Passport' },
  { value: 'United States', label: 'United States', icon: '🇺🇸', desc: 'US Passport' },
  { value: 'United Kingdom', label: 'United Kingdom', icon: '🇬🇧', desc: 'British Passport' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺', desc: 'Australian Passport' },
  { value: 'Other', label: 'Other Country', icon: '🌍', desc: 'All Passports' },
];

const journeyDestinationOptions = [
  { value: 'UAE', label: 'UAE / Dubai', icon: '🇦🇪', desc: 'Student Visas, Golden Visa & Work' },
  { value: 'Canada', label: 'Canada', icon: '🇨🇦', desc: 'Top for PR & Student Visas' },
  { value: 'United Kingdom', label: 'United Kingdom', icon: '🇬🇧', desc: 'Student, Skilled Worker, PSW' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺', desc: 'Subclass 500, 482, 189 & 190' },
  { value: 'United States', label: 'United States', icon: '🇺🇸', desc: 'F-1, H-1B, L-1 & EB Visas' },
  { value: 'Germany', label: 'Germany', icon: '🇩🇪', desc: 'EU Blue Card & Opportunity Card' },
  { value: 'Ireland', label: 'Ireland', icon: '🇮🇪', desc: 'European Tech Hub & Stamp 1G' },
  { value: 'New Zealand', label: 'New Zealand', icon: '🇳🇿', desc: 'Skilled Migrant & Post Study' },
  { value: 'Singapore', label: 'Singapore', icon: '🇸🇬', desc: 'EP, S-Pass & Global Investor' },
  { value: 'France', label: 'France / Schengen', icon: '🇫🇷', desc: 'Talent Passport & Europe Stay' },
  { value: 'Japan', label: 'Japan', icon: '🇯🇵', desc: 'SSW & Skilled Professional' },
];

const travelPurposeOptions = [
  { value: 'study', label: 'Study Visa', icon: '🎓', desc: 'Universities, Colleges & Student Visas' },
  { value: 'visit', label: 'Tourist / Visit', icon: '🏝️', desc: 'Short-stay, Holidays & Family' },
  { value: 'work', label: 'Work Permit', icon: '💼', desc: 'Job Sponsorship, LMIA & Work Visas' },
  { value: 'pr', label: 'PR & Migration', icon: '🏡', desc: 'Express Entry, PNP & Direct PR' },
  { value: 'business', label: 'Business Visa', icon: '💼', desc: 'Startups, Entrepreneur & Investor' },
  { value: 'transit', label: 'Transit Visa', icon: '✈️', desc: 'Airport transit & Stopover Visas' },
];

// Dynamic Destination Study Data Lookup (Real AI Pathway Knowledge Engine)
const getDestinationStudyData = (destination: string) => {
  const d = (destination || '').toLowerCase().trim();
  if (d.includes('uae') || d.includes('dubai')) {
    return {
      country: 'UAE',
      currency: 'AED',
      currencySymbol: 'AED',
      admissionDocName: 'UAE University Offer & Student Entry Permit',
      defaultUni: 'University of Wollongong in Dubai (UOWD)',
      defaultFee: 'AED 58,000 / yr',
      defaultLiving: 'AED 36,000 / yr',
      totalProof: 'AED 94,000 (~$25,600 USD)',
      casNumber: 'UAE-DXB-984210',
      unis: [
        { name: 'University of Wollongong in Dubai (UOWD)', city: 'Dubai Knowledge Park', rank: 'Top Global UAE Campus', fee: 'AED 58,000/yr', accept: 'High Match' },
        { name: 'Middlesex University Dubai', city: 'Dubai Knowledge Park', rank: 'Top UK Campus in Dubai', fee: 'AED 55,000/yr', accept: 'High Match' },
        { name: 'Heriot-Watt University Dubai', city: 'Dubai Academic City', rank: 'Top Scottish Tech Campus', fee: 'AED 62,000/yr', accept: 'High Match' },
        { name: 'American University in Dubai (AUD)', city: 'Dubai Media City', rank: 'US Accredited UAE Leader', fee: 'AED 75,000/yr', accept: 'Competitive' },
      ],
      loanPartners: 'Emirates NBD, HDFC Credila & Global Education Loans',
      insurance: 'UAE Mandatory Student Health Insurance Card',
      vfsText: 'VFS Dubai / UAE Visa Center Biometric & Visa Filing',
      defaultVisaType: 'UAE Student Residence Visa (1 Year Renewable)',
      defaultConditions: [
        'Must maintain full-time enrollment in MOHESR accredited university',
        'Part-time work permitted with university NOC & work permit',
        'Mandatory UAE Emirates ID & medical fitness test on arrival',
        'Multiple entry permitted during visa validity'
      ]
    };
  }
  if (d.includes('uk') || d.includes('united kingdom') || d.includes('london')) {
    return {
      country: 'UK',
      currency: 'GBP (£)',
      currencySymbol: '£',
      admissionDocName: 'CAS (Confirmation of Acceptance for Studies)',
      defaultUni: 'Imperial College London',
      defaultFee: '£28,000 / yr',
      defaultLiving: '£12,006 / yr',
      totalProof: '£40,006 GBP (~$51,000 USD)',
      casNumber: 'CAS-LON-883921',
      unis: [
        { name: 'Imperial College London', city: 'London', rank: '#2 Global', fee: '£31,000/yr', accept: 'Competitive' },
        { name: 'University of Manchester', city: 'Manchester', rank: '#32 Global', fee: '£26,500/yr', accept: 'High Match' },
        { name: 'University of Edinburgh', city: 'Edinburgh, Scotland', rank: '#27 Global', fee: '£28,000/yr', accept: 'High Match' },
        { name: 'University of Warwick', city: 'Coventry', rank: '#67 Global', fee: '£25,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, Prodigy Finance, Axis Bank Student Loans',
      insurance: 'NHS Immigration Health Surcharge (IHS) Included',
      vfsText: 'UKVI / VFS Global Biometrics Appointment Center',
      defaultVisaType: 'UK Student Visa (Tier 4 / CAS)',
      defaultConditions: [
        'Work up to 20 hours/week during term time',
        'Satisfactory academic attendance required',
        'No recourse to public funds',
        'Collect BRP / eVisa within 10 days of arrival'
      ]
    };
  }
  if (d.includes('australia') || d.includes('sydney') || d.includes('melbourne')) {
    return {
      country: 'Australia',
      currency: 'AUD ($)',
      currencySymbol: 'AUD $',
      admissionDocName: 'eCoE (Electronic Confirmation of Enrolment)',
      defaultUni: 'University of Melbourne',
      defaultFee: 'AUD $34,000 / yr',
      defaultLiving: 'AUD $24,505 / yr',
      totalProof: 'AUD $58,505 (~$39,000 USD)',
      casNumber: 'COE-VIC-778219',
      unis: [
        { name: 'University of Melbourne', city: 'Melbourne, VIC', rank: '#13 Global (Go8)', fee: 'AUD $34,000/yr', accept: 'High Match' },
        { name: 'University of Sydney', city: 'Sydney, NSW', rank: '#18 Global (Go8)', fee: 'AUD $36,000/yr', accept: 'High Match' },
        { name: 'UNSW Sydney', city: 'Sydney, NSW', rank: '#19 Global (Go8)', fee: 'AUD $35,000/yr', accept: 'High Match' },
        { name: 'Monash University', city: 'Melbourne, VIC', rank: '#42 Global (Go8)', fee: 'AUD $33,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, InCred Education, SBI Global Ed-Vantage',
      insurance: 'OSHC (Overseas Student Health Cover - Bupa / Allianz)',
      vfsText: 'Australian Biometrics Collection Centre (VFS Global)',
      defaultVisaType: 'Student Visa (Subclass 500)',
      defaultConditions: [
        'Condition 8105: Work 48h per fortnight allowed',
        'Condition 8501: Maintain active OSHC Health Cover',
        'Condition 8202: Meet academic course progress',
        'Condition 8516: Maintain genuine student eligibility'
      ]
    };
  }
  if (d.includes('usa') || d.includes('united states') || d.includes('america')) {
    return {
      country: 'USA',
      currency: 'USD ($)',
      currencySymbol: '$',
      admissionDocName: 'Form I-20 & SEVIS ID (F-1 Student Visa)',
      defaultUni: 'New York University (NYU)',
      defaultFee: '$36,000 / yr',
      defaultLiving: '$18,000 / yr',
      totalProof: '$54,000 USD',
      casNumber: 'N0038921890 (SEVIS)',
      unis: [
        { name: 'New York University (NYU)', city: 'New York, NY', rank: '#38 Global', fee: '$38,000/yr', accept: 'Competitive' },
        { name: 'University of Southern California (USC)', city: 'Los Angeles, CA', rank: '#45 Global', fee: '$42,000/yr', accept: 'High Match' },
        { name: 'Northeastern University', city: 'Boston, MA', rank: '#1 Co-op Programs', fee: '$36,000/yr', accept: 'High Match' },
        { name: 'University of Texas at Austin', city: 'Austin, TX', rank: '#58 Global', fee: '$32,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'Mpower Financing, Prodigy Finance (No Collateral / No Cosigner)',
      insurance: 'ISO International / Student Secure Medical Insurance',
      vfsText: 'US Embassy / CGI Federal OFC Biometrics & Visa Interview',
      defaultVisaType: 'US F-1 Academic Student Visa',
      defaultConditions: [
        'On-campus work up to 20h/week authorized',
        'Must maintain full course of study (12 credits/sem)',
        'Maintain active SEVIS status through DSO',
        'CPT/OPT work rights available after 1 year'
      ]
    };
  }
  if (d.includes('germany') || d.includes('berlin') || d.includes('munich')) {
    return {
      country: 'Germany',
      currency: 'EUR (€)',
      currencySymbol: '€',
      admissionDocName: 'Zulassungsbescheid (German University Admission Letter)',
      defaultUni: 'Technical University of Munich (TUM)',
      defaultFee: '€0 Tuition / yr',
      defaultLiving: '€11,208 / yr',
      totalProof: '€11,208 EUR (Blocked Account - Sperrkonto)',
      casNumber: 'TUM-DE-ADM-66219',
      unis: [
        { name: 'Technical University of Munich (TUM)', city: 'Munich, Bavaria', rank: '#28 Global', fee: '€0 Tuition', accept: 'High Match' },
        { name: 'Ludwig Maximilian University (LMU)', city: 'Munich', rank: '#54 Global', fee: '€0 Tuition', accept: 'High Match' },
        { name: 'RWTH Aachen University', city: 'Aachen, NRW', rank: '#1 Tech in Germany', fee: '€0 Tuition', accept: 'High Match' },
        { name: 'Heidelberg University', city: 'Heidelberg', rank: '#84 Global', fee: '€1,500/sem', accept: 'Competitive' },
      ],
      loanPartners: 'Coracle / Fintiba Blocked Account Partners & SBI',
      insurance: 'TK / Barmer Statutory Public Health Insurance',
      vfsText: 'German Embassy / VFS German Visa Application Centre',
      defaultVisaType: 'German National Visa (Category D / Student)',
      defaultConditions: [
        'Work 140 full days or 280 half days per calendar year',
        'Must open Blocked Account (Sperrkonto €992/month)',
        'Compulsory health insurance (TK/Barmer) mandatory',
        'Register local address (Anmeldung) within 14 days'
      ]
    };
  }
  if (d.includes('ireland') || d.includes('dublin')) {
    return {
      country: 'Ireland',
      currency: 'EUR (€)',
      currencySymbol: '€',
      admissionDocName: 'Full Unconditional Offer Letter & Tuition Receipt',
      defaultUni: 'Trinity College Dublin',
      defaultFee: '€19,500 / yr',
      defaultLiving: '€10,000 / yr',
      totalProof: '€29,500 EUR (~$32,000 USD)',
      casNumber: 'IRL-TCD-881920',
      unis: [
        { name: 'Trinity College Dublin (TCD)', city: 'Dublin', rank: '#81 Global', fee: '€19,500/yr', accept: 'Competitive' },
        { name: 'University College Dublin (UCD)', city: 'Dublin', rank: '#126 Global', fee: '€18,500/yr', accept: 'High Match' },
        { name: 'University of Galway', city: 'Galway', rank: '#289 Global', fee: '€16,000/yr', accept: 'High Match' },
        { name: 'University College Cork (UCC)', city: 'Cork', rank: '#298 Global', fee: '€17,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, Prodigy Finance, Bank of Ireland',
      insurance: 'Irish Private Medical Insurance (VHI / Irish Life Health)',
      vfsText: 'Irish Visa Application Centre (VFS Global)',
      defaultVisaType: 'Ireland Stamp 2 Student Visa',
      defaultConditions: [
        'Work 20h/week during term, 40h/week during holidays',
        'Eligible for 2-year Third Level Graduate Scheme (Stamp 1G)',
        'Register with INIS/IRP immigration office on arrival'
      ]
    };
  }
  if (d.includes('new zealand') || d.includes('auckland')) {
    return {
      country: 'New Zealand',
      currency: 'NZD ($)',
      currencySymbol: 'NZD $',
      admissionDocName: 'Offer of Place & Fee Receipt',
      defaultUni: 'University of Auckland',
      defaultFee: 'NZD $34,000 / yr',
      defaultLiving: 'NZD $20,000 / yr',
      totalProof: 'NZD $54,000 (~$33,000 USD)',
      casNumber: 'NZ-UOA-773190',
      unis: [
        { name: 'University of Auckland', city: 'Auckland', rank: '#68 Global', fee: 'NZD $34,000/yr', accept: 'High Match' },
        { name: 'University of Otago', city: 'Dunedin', rank: '#206 Global', fee: 'NZD $31,000/yr', accept: 'High Match' },
        { name: 'Victoria University of Wellington', city: 'Wellington', rank: '#241 Global', fee: 'NZD $29,000/yr', accept: 'High Match' },
        { name: 'University of Canterbury', city: 'Christchurch', rank: '#256 Global', fee: 'NZD $30,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, InCred, SBI Global Student Loan',
      insurance: 'Studentsafe Inbound University Insurance',
      vfsText: 'Immigration New Zealand VFS Application Centre',
      defaultVisaType: 'New Zealand Fee Paying Student Visa',
      defaultConditions: [
        'Work up to 20 hours per week during term',
        'Full-time study at approved NZQA institution',
        'Comprehensive medical & travel insurance required'
      ]
    };
  }
  // Default: Canada
  return {
    country: 'Canada',
    currency: 'CAD ($)',
    currencySymbol: 'CAD $',
    admissionDocName: 'Letter of Acceptance (LOA) & PAL (Provincial Attestation)',
    defaultUni: 'University of Toronto',
    defaultFee: '$28,500 CAD / yr',
    defaultLiving: '$20,635 CAD / yr',
    totalProof: '$49,135 CAD (~$36,000 USD)',
    casNumber: 'LOA-ON-DLI-992144',
    unis: [
      { name: 'University of Toronto', city: 'Toronto, ON', rank: '#21 Global', fee: '$28,500 CAD/yr', accept: 'High Match' },
      { name: 'University of British Columbia (UBC)', city: 'Vancouver, BC', rank: '#34 Global', fee: '$31,000 CAD/yr', accept: 'High Match' },
      { name: 'McGill University', city: 'Montreal, QC', rank: '#30 Global', fee: '$26,000 CAD/yr', accept: 'High Match' },
      { name: 'University of Waterloo', city: 'Waterloo, ON', rank: '#1 Tech & Co-op', fee: '$32,000 CAD/yr', accept: 'High Match' },
    ],
    loanPartners: 'HDFC Credila, Prodigy Finance, InCred Education Loans',
    insurance: 'UHIP / Guard.me International Student Medical Insurance',
    vfsText: 'Canada Visa Application Centre (TT Services / VFS Global)',
    defaultVisaType: 'Study Permit (IMM 1442)',
    defaultConditions: [
      'Must remain enrolled in a designated learning institution (DLI)',
      'Off-campus work permitted up to 24 hrs/week in session',
      'Primary health insurance coverage required',
      'Maintain lawful status and report address changes'
    ]
  };
};

const getDestinationVisitData = (destination: string) => {
  const d = (destination || '').toLowerCase().trim();
  if (d.includes('uae') || d.includes('dubai')) {
    return {
      packages: [
        { name: 'Dubai City Explorer & Desert Safari Package', price: 'AED 1,650 / person', days: '5 Days / 4 Nights' },
        { name: 'Abu Dhabi & Burj Khalifa Grand Holiday Pass', price: 'AED 2,850 / person', days: '7 Days / 6 Nights' }
      ],
      fundsText: 'Bank statement showing minimum AED 11,000 (~$3,000 USD) available funds.',
      vfsSlotText: 'Book VFS Dubai Biometrics / Apply Direct Online e-Visa'
    };
  }
  if (d.includes('uk') || d.includes('united kingdom') || d.includes('london')) {
    return {
      packages: [
        { name: 'London Royal Heritage & Thames Cruise Package', price: '£750 / person', days: '6 Days / 5 Nights' },
        { name: 'Scottish Highlands & Edinburgh Castle Grand Tour', price: '£1,250 / person', days: '10 Days / 9 Nights' }
      ],
      fundsText: 'Bank statement showing minimum £3,500 GBP available funds + 6 months statement.',
      vfsSlotText: 'Book UK Standard Visitor Visa VFS Appointment'
    };
  }
  if (d.includes('australia') || d.includes('sydney') || d.includes('melbourne')) {
    return {
      packages: [
        { name: 'Sydney Harbour, Blue Mountains & Bondi Explorer', price: 'AUD $1,150 / person', days: '6 Days / 5 Nights' },
        { name: 'Great Barrier Reef & Gold Coast Adventure Package', price: 'AUD $2,100 / person', days: '10 Days / 9 Nights' }
      ],
      fundsText: 'Bank statement showing minimum AUD $5,000 available funds for Visitor Subclass 600.',
      vfsSlotText: 'Book Australian Biometrics Appointment (VFS Global)'
    };
  }
  if (d.includes('usa') || d.includes('united states') || d.includes('america')) {
    return {
      packages: [
        { name: 'New York City & Washington DC Iconic Discovery', price: '$1,350 / person', days: '7 Days / 6 Nights' },
        { name: 'California Coastline & Grand Canyon Holiday Tour', price: '$2,250 / person', days: '12 Days / 11 Nights' }
      ],
      fundsText: 'Bank statement showing minimum $4,000 USD available funds for B1/B2 Tourist Visa.',
      vfsSlotText: 'Book US Embassy Visa Interview Slot (DS-160 Filing)'
    };
  }
  if (d.includes('germany') || d.includes('schengen') || d.includes('france')) {
    return {
      packages: [
        { name: 'Bavarian Castles & Munich Alpine Discovery Tour', price: '€890 / person', days: '6 Days / 5 Nights' },
        { name: 'Paris, Switzerland & Rhine Valley Schengen Tour', price: '€1,850 / person', days: '10 Days / 9 Nights' }
      ],
      fundsText: 'Bank statement showing minimum €3,000 EUR proof of subsistence + travel insurance.',
      vfsSlotText: 'Book Schengen Tourist Visa VFS Slot'
    };
  }
  // Default: Canada
  return {
    packages: [
      { name: 'Niagara Falls & Toronto City Highlights Tour', price: '$850 CAD / person', days: '5 Days / 4 Nights' },
      { name: 'Banff National Park & Canadian Rockies Grand Explorer', price: '$1,850 CAD / person', days: '10 Days / 9 Nights' }
    ],
    fundsText: 'Bank statement showing minimum $3,500 CAD available funds for Canada Visitor Visa (TRV).',
    vfsSlotText: 'Book Canada VFS Biometrics Appointment'
  };
};

const courseLevelOptions = [
  { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', desc: 'Undergraduate Degree' },
  { value: 'masters', label: "Master's / PG", icon: '📜', desc: 'Postgraduate & MBA' },
  { value: 'diploma', label: 'Diploma / Certificate', icon: '📋', desc: 'Vocational & Short Term' },
  { value: 'phd', label: 'PhD / Doctorate', icon: '🔬', desc: 'Doctoral Research' },
  { value: 'language', label: 'Language Program', icon: '🗣️', desc: 'IELTS / ESL / Pathway' },
];

export function AITripPlannerLanding() {
  // Current user email for persistence
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Input search state
  const [searchPrompt, setSearchPrompt] = useState('');
  const [selectedPill, setSelectedPill] = useState<string>('student');

  // Journey Engine Form State
  const [passportCountry, setPassportCountry] = useState('');
  const [journeyDestination, setJourneyDestination] = useState('');
  const [travelPurpose, setTravelPurpose] = useState('');
  const [hasVisaAlready, setHasVisaAlready] = useState<'no' | 'yes'>('no');
  
  // Custom dropdown open states for Journey Form
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isJourneyDestOpen, setIsJourneyDestOpen] = useState(false);
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const passportRef = useRef<HTMLDivElement>(null);
  const journeyDestRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);

  // Dynamic Destination Study & Visit Data Hook
  const currentStudyData = getDestinationStudyData(journeyDestination);
  const currentVisitData = getDestinationVisitData(journeyDestination);
  const activeSelectedUni = currentStudyData.unis.some(u => u.name === selectedMatchedUni) ? selectedMatchedUni : currentStudyData.defaultUni;
  const activeTuitionFee = currentStudyData.unis.find(u => u.name === activeSelectedUni)?.fee || currentStudyData.defaultFee;
  const activeLivingCost = currentStudyData.defaultLiving;

  // FLOW 1: "VISA APPROVED & READY" Real Dynamic State
  const [approvedVisaType, setApprovedVisaType] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [uploadedVisaFileName, setUploadedVisaFileName] = useState('');
  const [uploadedVisaFileSize, setUploadedVisaFileSize] = useState('');
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrScanned, setOcrScanned] = useState(false);
  const [ocrConditions, setOcrConditions] = useState<string[]>([]);
  const [newCustomCondition, setNewCustomCondition] = useState('');
  const [isAddingCondition, setIsAddingCondition] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // File input refs
  const visaFileInputRef = useRef<HTMLInputElement>(null);
  const ticketFileInputRef = useRef<HTMLInputElement>(null);
  
  // Action Checklist Checklist States (Parent's Peace-of-Mind Roadmap)
  const [ticketScanning, setTicketScanning] = useState(false);
  const [uploadedTicketFileName, setUploadedTicketFileName] = useState('');
  const [flightTicketUploaded, setFlightTicketUploaded] = useState(false);
  const [transitCheckResult, setTransitCheckResult] = useState<string | null>(null);
  const [pickupFlightNum, setPickupFlightNum] = useState('');
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [peerNetworkJoined, setPeerNetworkJoined] = useState(false);
  const [forexCardOrdered, setForexCardOrdered] = useState(false);
  const [customsChecklistDone, setCustomsChecklistDone] = useState<Record<string, boolean>>({
    cash: false,
    meds: false,
    food: false,
    docs: false,
  });

  // Generator & Dashboard Trigger States
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Flow 2A: Study Abroad 8-Step Engine States
  const [studyQualification, setStudyQualification] = useState<'12th' | 'bachelors' | 'masters' | 'diploma'>('bachelors');
  const [studyTargetDegree, setStudyTargetDegree] = useState<'bachelors' | 'masters' | 'postgrad' | 'diploma' | 'phd'>('masters');
  const [studyField, setStudyField] = useState('Computer Science & IT');
  const [selectedMatchedUni, setSelectedMatchedUni] = useState<string>('');
  const [studyTuitionFee, setStudyTuitionFee] = useState('');
  const [studyLivingCost, setStudyLivingCost] = useState('');
  
  // Step 3 Document Gathering States
  const [docTranscriptsUploaded, setDocTranscriptsUploaded] = useState(true);
  const [docSopUploaded, setDocSopUploaded] = useState(true);
  const [docLorUploaded, setDocLorUploaded] = useState(false);
  const [docIeltsUploaded, setDocIeltsUploaded] = useState(true);
  
  // Step 4 Funds & Financial Weakness States
  const [fundsAvailableAmount, setFundsAvailableAmount] = useState('25000');
  
  // Step 6 Admission Re-Check
  const [casI20Number, setCasI20Number] = useState('');
  
  // Step 7 & 8 VFS Slot & Final Submission
  const [vfsSlotBooked, setVfsSlotBooked] = useState(false);
  const [finalDossierSubmitted, setFinalDossierSubmitted] = useState(false);

  // Flow 2B: Tourist / Visit Engine States
  const [visitPlannedAlready, setVisitPlannedAlready] = useState<'yes' | 'no'>('yes');
  const [visitItineraryUploaded, setVisitItineraryUploaded] = useState(false);
  const [visitSelectedTourPackage, setVisitSelectedTourPackage] = useState<string>('');
  const [visitFundsVerified, setVisitFundsVerified] = useState(true);
  const [visitTiesProofChecked, setVisitTiesProofChecked] = useState(true);

  // Flow 2: No-Visa Lead Capture Engine States (Fallback for Work / PR)
  const [leadFullName, setLeadFullName] = useState('');
  const [leadPhoneNumber, setLeadPhoneNumber] = useState('');
  const [leadContactPref, setLeadContactPref] = useState<'whatsapp' | 'call'>('whatsapp');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmittedSuccess, setLeadSubmittedSuccess] = useState(false);

  // Global Multi-Tab Search Widget State
  const [activeSearchTab, setActiveSearchTab] = useState<'universities' | 'consultants' | 'relocation' | 'jobs' | 'lawyers'>('universities');
  const [courseLevel, setCourseLevel] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Dropdowns open state
  const [isCourseLevelOpen, setIsCourseLevelOpen] = useState(false);
  const courseLevelRef = useRef<HTMLDivElement>(null);

  // Dynamic Loading HUD State
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(15);

  const loadingSteps = [
    { icon: '🌐', title: 'Connecting to Global Visa & Security Hub...', desc: `Auditing ${passportCountry || 'Applicant'} to ${journeyDestination || 'Abroad'} regulations` },
    { icon: '📑', title: 'Structuring Visa Compliance & Transit Check...', desc: 'Verifying stay conditions, work limits & layover exemptions' },
    { icon: '🛡️', title: 'Activating Parental Security Engine...', desc: 'Configuring verified driver pickup, housing escrow & 5G eSIM' },
    { icon: '✨', title: 'Finalizing Peace-of-Mind Departure Roadmap...', desc: 'Ready for secure international departure' }
  ];

  // 1. REAL-TIME HYDRATION
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let email = '';
    const storedUser = localStorage.getItem('visaformula_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.email) {
          email = parsed.email;
          setCurrentUserEmail(parsed.email);
        }
      } catch (e) {}
    }
    if (!email) {
      const seekerEmail = localStorage.getItem('seeker_email');
      if (seekerEmail) {
        email = seekerEmail;
        setCurrentUserEmail(seekerEmail);
      }
    }

    const localData = localStorage.getItem('visaformula_user_journey');
    if (localData) {
      try {
        const cached = JSON.parse(localData);
        applyHydratedState(cached);
      } catch (e) {}
    }

    if (email) {
      fetch(`/api/journey/status?email=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((result) => {
          if (result?.success && result?.data) {
            applyHydratedState(result.data);
          }
        })
        .catch((err) => console.warn('Could not load backend journey status:', err));
    }
  }, []);

  const applyHydratedState = (data: any) => {
    if (!data) return;
    if (data.passportCountry) setPassportCountry(data.passportCountry);
    if (data.passport_country) setPassportCountry(data.passport_country);
    if (data.destination) setJourneyDestination(data.destination);
    if (data.purpose) setTravelPurpose(data.purpose);
    if (typeof data.has_visa === 'boolean') {
      setHasVisaAlready(data.has_visa ? 'yes' : 'no');
    }
    if (data.approvedVisaType || data.visa_type) setApprovedVisaType(data.approvedVisaType || data.visa_type);
    if (data.approvalDate || data.visa_grant_date) setApprovalDate(data.approvalDate || data.visa_grant_date);
    if (data.validityDate || data.visa_expiry_date) setValidityDate(data.validityDate || data.visa_expiry_date);
    if (data.ocrConditions && Array.isArray(data.ocrConditions)) setOcrConditions(data.ocrConditions);
    if (data.pickupFlightNum || data.airport_pickup_flight_no) setPickupFlightNum(data.pickupFlightNum || data.airport_pickup_flight_no);
    if (typeof data.pickupConfirmed === 'boolean') setPickupConfirmed(data.pickupConfirmed);
    if (typeof data.transitChecked === 'boolean') setFlightTicketUploaded(data.transitChecked);
    if (typeof data.peerNetworkJoined === 'boolean') setPeerNetworkJoined(data.peerNetworkJoined);
    if (typeof data.forexCardOrdered === 'boolean') setForexCardOrdered(data.forexCardOrdered);
    if (data.customsChecklistDone) setCustomsChecklistDone(data.customsChecklistDone);
    if (data.approvedVisaType || data.validityDate || data.pickupConfirmed || data.completedSteps?.length > 0) {
      setHasGenerated(true);
    }
  };

  const getCompletedStepsArray = () => {
    const steps: string[] = [];
    if (approvedVisaType || validityDate) steps.push('visa_verified');
    if (flightTicketUploaded) steps.push('transit_checked');
    if (pickupConfirmed) steps.push('driver_booked');
    if (peerNetworkJoined) steps.push('peer_network');
    if (forexCardOrdered) steps.push('forex_card');
    return steps;
  };

  const autoSaveJourney = async (overrides: Record<string, any> = {}) => {
    setIsAutoSaving(true);
    const email = currentUserEmail || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || 'guest@visaformula.com' : 'guest@visaformula.com');

    const payload = {
      user_email: email,
      passport_country: passportCountry || 'India',
      destination: journeyDestination || 'UAE',
      purpose: travelPurpose || 'study',
      has_visa: hasVisaAlready === 'yes',
      visa_type: approvedVisaType,
      visa_grant_date: approvalDate,
      visa_expiry_date: validityDate,
      visa_conditions: ocrConditions,
      completed_steps: getCompletedStepsArray(),
      airport_pickup_flight_no: pickupFlightNum,
      airport_pickup_confirmed: pickupConfirmed,
      transit_checked: flightTicketUploaded,
      peer_network_joined: peerNetworkJoined,
      forex_ordered: forexCardOrdered,
      customs_checklist: customsChecklistDone,
      ...overrides
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('visaformula_user_journey', JSON.stringify(payload));
    }

    try {
      await fetch('/api/journey/update-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      console.warn('Auto-save error:', e);
    } finally {
      setIsAutoSaving(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (passportRef.current && !passportRef.current.contains(target)) setIsPassportOpen(false);
      if (journeyDestRef.current && !journeyDestRef.current.contains(target)) setIsJourneyDestOpen(false);
      if (purposeRef.current && !purposeRef.current.contains(target)) setIsPurposeOpen(false);
      if (courseLevelRef.current && !courseLevelRef.current.contains(target)) setIsCourseLevelOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalSearch = () => {
    const params = new URLSearchParams();
    if (searchCountry) params.set('country', searchCountry);
    if (searchLocation) params.set('location', searchLocation);

    if (activeSearchTab === 'universities') {
      if (courseLevel) params.set('level', courseLevel);
      window.location.href = `/universities?${params.toString()}`;
    } else if (activeSearchTab === 'consultants') {
      window.location.href = `/find-experts?${params.toString()}`;
    } else if (activeSearchTab === 'relocation') {
      window.location.href = `/classifieds?${params.toString()}`;
    } else if (activeSearchTab === 'jobs') {
      window.location.href = `/jobs?${params.toString()}`;
    } else if (activeSearchTab === 'lawyers') {
      window.location.href = `/emergency?${params.toString()}`;
    }
  };

  // Trigger Parental Security Engine Generation with Dynamic Destination Data
  const fetchAISecurityEngine = async (payload: {
    destination?: string;
    passport?: string;
    purpose?: string;
  }) => {
    setIsGenerating(true);
    setLoadingStep(0);
    setLoadingProgress(15);

    setTimeout(() => {
      const loadingEl = document.getElementById('pathway-generator-status');
      if (loadingEl) {
        loadingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
      setLoadingProgress((prev) => {
        if (prev < 85) return prev + 25;
        return 95;
      });
    }, 350);

    setTimeout(() => {
      clearInterval(stepInterval);
      setLoadingProgress(100);
      setIsGenerating(false);
      setHasGenerated(true);

      const dest = payload.destination || journeyDestination || 'UAE';
      const destinationStudy = getDestinationStudyData(dest);

      setApprovedVisaType(destinationStudy.defaultVisaType);
      setApprovalDate('2025-08-10');
      setValidityDate('2027-08-31');
      setOcrConditions(destinationStudy.defaultConditions);

      autoSaveJourney({
        destination: dest,
        passport_country: payload.passport || passportCountry || 'India',
        purpose: payload.purpose || travelPurpose || 'study',
        has_visa: true
      });

      setTimeout(() => {
        const resultsElement = document.getElementById('parental-security-engine-dashboard');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 1200);
  };

  // Natural Language Search Bar Parser
  const parseQueryToFormState = (query: string) => {
    const q = query.toLowerCase();
    
    // Check passport
    if (q.includes('indian') || q.includes('india')) setPassportCountry('India');
    else if (q.includes('nepal')) setPassportCountry('Nepal');
    else if (q.includes('bangladesh')) setPassportCountry('Bangladesh');
    else if (q.includes('sri lanka')) setPassportCountry('Sri Lanka');
    else if (q.includes('nigeria')) setPassportCountry('Nigeria');
    else if (q.includes('pakistan')) setPassportCountry('Pakistan');
    else if (q.includes('philippines')) setPassportCountry('Philippines');
    else if (q.includes('us ') || q.includes('usa') || q.includes('american')) setPassportCountry('United States');
    else if (q.includes('uk ') || q.includes('british')) setPassportCountry('United Kingdom');
    else if (q.includes('australian') || q.includes('australia')) setPassportCountry('Australia');

    // Check destination
    if (q.includes('uae') || q.includes('dubai')) setJourneyDestination('UAE');
    else if (q.includes('canada')) setJourneyDestination('Canada');
    else if (q.includes('uk') || q.includes('london') || q.includes('britain') || q.includes('united kingdom')) setJourneyDestination('United Kingdom');
    else if (q.includes('usa') || q.includes('united states') || q.includes('america')) setJourneyDestination('United States');
    else if (q.includes('australia') || q.includes('sydney') || q.includes('melbourne')) setJourneyDestination('Australia');
    else if (q.includes('germany') || q.includes('berlin') || q.includes('munich')) setJourneyDestination('Germany');
    else if (q.includes('new zealand') || q.includes('auckland')) setJourneyDestination('New Zealand');
    else if (q.includes('ireland') || q.includes('dublin')) setJourneyDestination('Ireland');
    else if (q.includes('singapore')) setJourneyDestination('Singapore');

    // Check purpose
    if (q.includes('study') || q.includes('student') || q.includes('master') || q.includes('bachelor') || q.includes('university') || q.includes('college')) {
      setTravelPurpose('study');
    } else if (q.includes('tourist') || q.includes('visit') || q.includes('holiday') || q.includes('travel')) {
      setTravelPurpose('visit');
    } else if (q.includes('work') || q.includes('job') || q.includes('permit') || q.includes('h-1b') || q.includes('lmia')) {
      setTravelPurpose('work');
    } else if (q.includes('pr') || q.includes('permanent') || q.includes('migration') || q.includes('express entry') || q.includes('pnp')) {
      setTravelPurpose('pr');
    } else if (q.includes('business') || q.includes('investor') || q.includes('startup')) {
      setTravelPurpose('business');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPrompt.trim()) return;
    parseQueryToFormState(searchPrompt);
    
    if (hasVisaAlready === 'yes') {
      fetchAISecurityEngine({
        destination: journeyDestination || 'UAE',
        passport: passportCountry || 'India',
        purpose: travelPurpose || 'study'
      });
    } else {
      setHasGenerated(false);
      autoSaveJourney({
        destination: journeyDestination || 'UAE',
        passport_country: passportCountry || 'India',
        purpose: travelPurpose || 'study',
        has_visa: false
      });
      setTimeout(() => {
        const el = document.getElementById('need-visa-pathway-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handlePillClick = (pillId: string, pillLabel: string) => {
    setSelectedPill(pillId);
    if (pillId === 'student') setTravelPurpose('study');
    else if (pillId === 'work') setTravelPurpose('work');
    else if (pillId === 'pr') setTravelPurpose('pr');
    else if (pillId === 'tourist') setTravelPurpose('visit');
    else if (pillId === 'business') setTravelPurpose('business');
    else if (pillId === 'parents') setTravelPurpose('visit');
    else if (pillId === 'ielts') setTravelPurpose('study');
    else if (pillId === 'emergency') setTravelPurpose('visit');

    setSearchPrompt(`${pillLabel} to ${journeyDestination || 'UAE'}`);
  };

  const handleGeneratePathway = () => {
    fetchAISecurityEngine({
      destination: journeyDestination || 'UAE',
      passport: passportCountry || 'India',
      purpose: travelPurpose || 'study'
    });
  };

  const handleNoVisaLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFullName.trim() || !leadPhoneNumber.trim()) return;

    setLeadSubmitting(true);
    const prefLabel = leadContactPref === 'whatsapp' ? 'WhatsApp' : 'Direct Phone Call';
    
    autoSaveJourney({
      user_name: leadFullName,
      user_phone: leadPhoneNumber,
      passport_country: passportCountry || 'India',
      destination: journeyDestination || 'UAE',
      purpose: travelPurpose || 'study',
      contact_pref: prefLabel,
      has_visa: false,
      lead_status: 'Callback Requested',
      lead_submitted_at: new Date().toISOString()
    });

    try {
      await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadFullName,
          phone: leadPhoneNumber,
          passport_country: passportCountry || 'India',
          destination_country: journeyDestination || 'UAE',
          purpose: travelPurpose || 'study',
          contact_preference: prefLabel,
          have_visa: false
        })
      });
    } catch {}

    setTimeout(() => {
      setLeadSubmitting(false);
      setLeadSubmittedSuccess(true);
    }, 400);
  };

  const calculateStudyReadinessScore = () => {
    let score = 25;
    if (docTranscriptsUploaded) score += 20;
    if (docSopUploaded) score += 15;
    if (docLorUploaded) score += 10;
    if (docIeltsUploaded) score += 15;
    if (Number(fundsAvailableAmount) >= 15000) score += 10;
    return Math.min(score, 100);
  };
  const studyReadinessScore = calculateStudyReadinessScore();

  const handleVisaFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedVisaFileName(file.name);
    setUploadedVisaFileSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
    setIsOcrScanning(true);

    setTimeout(() => {
      setIsOcrScanning(false);
      setApprovedVisaType(currentStudyData.defaultVisaType);
      setApprovalDate('2025-08-10');
      setValidityDate('2027-08-31');
      setOcrConditions(currentStudyData.defaultConditions);
      setOcrScanned(true);
      autoSaveJourney({
        visa_type: currentStudyData.defaultVisaType,
        visa_grant_date: '2025-08-10',
        visa_expiry_date: '2027-08-31',
        visa_conditions: currentStudyData.defaultConditions
      });
    }, 1000);
  };

  const handleTicketFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedTicketFileName(file.name);
    setTicketScanning(true);

    setTimeout(() => {
      setTicketScanning(false);
      setFlightTicketUploaded(true);
      setTransitCheckResult(`Direct flight / transit to ${journeyDestination || 'Destination'} confirmed with zero layover visa requirement.`);
      autoSaveJourney({ transit_checked: true });
    }, 1000);
  };

  const handleAddCondition = () => {
    if (!newCustomCondition.trim()) return;
    const updated = [...ocrConditions, newCustomCondition.trim()];
    setOcrConditions(updated);
    setNewCustomCondition('');
    setIsAddingCondition(false);
    autoSaveJourney({ visa_conditions: updated });
  };

  const getDaysRemaining = (expDate: string) => {
    if (!expDate) return null;
    const exp = new Date(expDate);
    if (isNaN(exp.getTime())) return null;
    const now = new Date();
    const diffTime = exp.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const daysLeft = validityDate ? getDaysRemaining(validityDate) : null;

  return (
    <div className="w-full bg-[#fbfbfd] text-slate-900 overflow-x-hidden font-sans">
      
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={visaFileInputRef}
        onChange={handleVisaFileSelected}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />
      <input
        type="file"
        ref={ticketFileInputRef}
        onChange={handleTicketFileSelected}
        accept=".pdf,.png,.jpg,.jpeg,.pkpass"
        className="hidden"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Soft Ultra-Light Background Glows */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-2 left-10 w-72 h-72 bg-purple-100/10 rounded-full blur-3xl" />
          <div className="absolute top-16 right-0 w-80 h-80 bg-emerald-50/20 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-1/3 w-96 h-96 bg-slate-50/40 rounded-full blur-3xl" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-6xl mx-auto relative z-10 text-center">

          {/* Centered Hero Info */}
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Official H1 Tagline with Sign Up Button Green Color */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1]">
              <span className="text-[#30005a] block">Dream Abroad.</span>
              <span className="text-[#00A86B] block mt-1">
                We Make It Easy.
              </span>
            </h1>
            
            {/* Supporting Official Subtitle */}
            <p className="mt-3.5 text-slate-600 text-xs sm:text-base font-medium max-w-xl mx-auto leading-relaxed px-2">
              From visa applications to your overseas journey, we simplify every step so you can travel with confidence.
            </p>

            {/* FLOATING PROMPT INPUT */}
            <div className="w-full max-w-3xl mt-6 sm:mt-7 mx-auto px-1 sm:px-0">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white border border-purple-200/90 rounded-full pl-3.5 sm:pl-6 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 shadow-[0_10px_35px_rgb(91,44,111,0.08)] hover:shadow-[0_12px_40px_rgb(91,44,111,0.14)] transition-all">
                <span className="text-purple-600 mr-2 sm:mr-3 text-base sm:text-xl shrink-0">✨</span>
                <input 
                  type="text" 
                  value={searchPrompt}
                  onChange={(e) => {
                    setSearchPrompt(e.target.value);
                    parseQueryToFormState(e.target.value);
                  }}
                  placeholder="Select Passport Country, Destination, and Visa Type (e.g., Indian Passport to UAE Student Visa)..." 
                  className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 text-xs sm:text-sm md:text-[15px] font-medium mr-2 sm:mr-3 truncate"
                />
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full text-white flex items-center justify-center transition-all active:scale-95 shrink-0 cursor-pointer disabled:opacity-75 ${
                    hasVisaAlready === 'no'
                      ? 'bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/30'
                      : 'bg-[#00A86B] hover:bg-[#008f5a] shadow-md hover:shadow-lg'
                  }`}
                  title="Search Pathway"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </form>

              {/* Have Visa Already? Selector Under First Search Bar */}
              <div className="flex items-center justify-center mt-4 mx-auto w-full px-1">
                <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2.5 bg-white/95 backdrop-blur-md border border-purple-200/90 p-1 sm:p-1.5 rounded-2xl sm:rounded-[22px] shadow-[0_8px_30px_rgba(48,0,90,0.06)] max-w-full">
                  <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 px-2 select-none whitespace-nowrap">
                    Have Visa Already?
                  </span>
                  
                  {/* Segmented Control Track */}
                  <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border border-slate-200/80">
                    
                    {/* NO Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setHasVisaAlready('no');
                        setHasGenerated(false);
                        autoSaveJourney({ has_visa: false });
                        setTimeout(() => {
                          const el = document.getElementById('need-visa-pathway-dashboard');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                        hasVisaAlready === 'no'
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/30 ring-2 ring-slate-900/20 scale-[1.03]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${hasVisaAlready === 'no' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-300'}`} />
                      <span>NO</span>
                      {hasVisaAlready === 'no' && (
                        <Check className="w-3.5 h-3.5 text-cyan-300 stroke-[3] shrink-0" />
                      )}
                    </button>

                    {/* YES Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setHasVisaAlready('yes');
                        setHasGenerated(true);
                        autoSaveJourney({ has_visa: true });
                        setTimeout(() => {
                          const el = document.getElementById('parental-security-engine-dashboard');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                        hasVisaAlready === 'yes'
                          ? 'bg-[#00A86B] text-white shadow-md shadow-emerald-600/35 ring-2 ring-emerald-500/25 scale-[1.03]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${hasVisaAlready === 'yes' ? 'bg-white animate-pulse' : 'bg-slate-300'}`} />
                      <span>YES</span>
                      {hasVisaAlready === 'yes' && (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3] shrink-0" />
                      )}
                    </button>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* QUICK-PILL INTENT TAGS (STRICT 1-ROW FLEX CONTAINER) */}
          <div className="mt-8 flex flex-nowrap items-center justify-start sm:justify-center gap-2.5 sm:gap-3 max-w-6xl mx-auto w-full overflow-x-auto no-scrollbar pb-1">
            {categoryPills.map((pill) => {
              const isSelected = selectedPill === pill.id;
              return (
                <button 
                  key={pill.id} 
                  type="button"
                  onClick={() => handlePillClick(pill.id, pill.label)}
                  className={`flex flex-col items-center justify-center bg-white border rounded-2xl px-3 py-2.5 shadow-2xs hover:shadow-md transition-all shrink-0 min-w-[88px] sm:min-w-[98px] h-[74px] cursor-pointer select-none ${
                    isSelected ? 'border-[#00A86B] ring-2 ring-[#00A86B]/20 bg-emerald-50/40' : 'border-slate-200/80 hover:border-[#00A86B]'
                  }`}
                >
                  <span className="text-xl sm:text-2xl leading-none">{pill.emoji}</span>
                  <span className={`text-[11px] sm:text-xs font-bold mt-1.5 whitespace-nowrap leading-tight ${isSelected ? 'text-[#00A86B]' : 'text-slate-700'}`}>
                    {pill.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── 2. PLAN YOUR OVERSEAS JOURNEY FORM CARD ── */}
          <div className="relative z-30 w-full max-w-6xl mx-auto mt-8 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-[0_14px_45px_rgba(0,0,0,0.06)] text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs">
                  <Compass className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    Plan Your Overseas Journey &amp; Visa
                  </h2>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500">
                    Real-time compliance checks, pre-visa audits &amp; departure security
                  </p>
                </div>
              </div>

              {lastSavedTime && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <Save className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Synced at {lastSavedTime}</span>
                </div>
              )}
            </div>

            {/* 3-Column Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-end">
              
              {/* Field 1: Passport Country */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Passport Country
                </label>
                <div
                  ref={passportRef}
                  onClick={() => {
                    setIsPassportOpen(!isPassportOpen);
                    setIsJourneyDestOpen(false);
                    setIsPurposeOpen(false);
                  }}
                  className="relative bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-base shrink-0">
                      {passportCountry ? (passportCountryOptions.find(o => o.value === passportCountry)?.icon || '🌐') : '🌐'}
                    </span>
                    <div className="min-w-0">
                      <span className={`text-xs sm:text-sm font-bold truncate block ${passportCountry ? 'text-slate-800' : 'text-slate-400'}`}>
                        {passportCountry ? (passportCountryOptions.find(o => o.value === passportCountry)?.label || passportCountry) : 'Select Passport'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isPassportOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                  {isPassportOpen && (
                    <div
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Select Citizenship
                      </div>
                      <div className="space-y-0.5">
                        {passportCountryOptions.map((opt) => {
                          const isSelected = passportCountry === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setPassportCountry(opt.value);
                                setIsPassportOpen(false);
                                autoSaveJourney({ passport_country: opt.value });
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{opt.icon}</span>
                                <span className="truncate">{opt.label}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Field 2: Destination Country */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Destination Country
                </label>
                <div
                  ref={journeyDestRef}
                  onClick={() => {
                    setIsJourneyDestOpen(!isJourneyDestOpen);
                    setIsPassportOpen(false);
                    setIsPurposeOpen(false);
                  }}
                  className="relative bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-base shrink-0">
                      {journeyDestination ? (journeyDestinationOptions.find(o => o.value === journeyDestination)?.icon || '✈️') : '✈️'}
                    </span>
                    <div className="min-w-0">
                      <span className={`text-xs sm:text-sm font-bold truncate block ${journeyDestination ? 'text-slate-800' : 'text-slate-400'}`}>
                        {journeyDestination ? (journeyDestinationOptions.find(o => o.value === journeyDestination)?.label || journeyDestination) : 'Select Destination'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isJourneyDestOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                  {isJourneyDestOpen && (
                    <div
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Where do you want to go?
                      </div>
                      <div className="space-y-0.5">
                        {journeyDestinationOptions.map((opt) => {
                          const isSelected = journeyDestination === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setJourneyDestination(opt.value);
                                setIsJourneyDestOpen(false);
                                autoSaveJourney({ destination: opt.value });
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{opt.icon}</span>
                                <span className="truncate">{opt.label}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Field 3: Purpose of Travel */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Purpose of Travel
                </label>
                <div
                  ref={purposeRef}
                  onClick={() => {
                    setIsPurposeOpen(!isPurposeOpen);
                    setIsPassportOpen(false);
                    setIsJourneyDestOpen(false);
                  }}
                  className="relative bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-base shrink-0">
                      {travelPurpose ? (travelPurposeOptions.find(o => o.value === travelPurpose)?.icon || '🎯') : '🎯'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className={`text-xs sm:text-sm font-bold truncate block ${travelPurpose ? 'text-slate-800' : 'text-slate-400'}`}>
                        {travelPurpose ? (travelPurposeOptions.find(o => o.value === travelPurpose)?.label || travelPurpose) : 'Select Purpose'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isPurposeOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                  {isPurposeOpen && (
                    <div
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Select Purpose
                      </div>
                      <div className="space-y-0.5">
                        {travelPurposeOptions.map((opt) => {
                          const isSelected = travelPurpose === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setTravelPurpose(opt.value);
                                setIsPurposeOpen(false);
                                autoSaveJourney({ purpose: opt.value });
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{opt.icon}</span>
                                <span className="truncate">{opt.label}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Field 4: Primary Action Button */}
              <div className="pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (hasVisaAlready === 'yes') {
                      handleGeneratePathway();
                    } else {
                      const el = document.getElementById('need-visa-pathway-dashboard');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.location.href = `/find-experts?country=${encodeURIComponent(journeyDestination)}&category=${travelPurpose}`;
                      }
                    }
                  }}
                  disabled={isGenerating}
                  className={`w-full h-[52px] px-3 sm:px-4 rounded-2xl font-extrabold text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer select-none disabled:opacity-75 ${
                    hasVisaAlready === 'no'
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/30'
                      : 'bg-[#00A86B] hover:bg-[#008f5a] text-white shadow-md shadow-[#00A86B]/25 hover:shadow-lg'
                  }`}
                >
                  {hasVisaAlready === 'yes' ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-100 shrink-0" />
                      <span>{isGenerating ? 'Analyzing...' : 'Plan Journey'}</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      <span>Explore Pathway</span>
                    </>
                  )}
                  <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
                </button>
              </div>

            </div>
          </div>

          {/* ── AI LOADING STATE ── */}
          {isGenerating && (
            <div id="pathway-generator-status" className="w-full max-w-6xl mx-auto my-8 bg-gradient-to-b from-white to-emerald-50/30 border border-emerald-200/80 rounded-2xl sm:rounded-[32px] p-6 sm:p-9 text-left shadow-[0_20px_60px_rgba(0,168,107,0.08)] backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-[#00A86B] to-teal-500 animate-pulse" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0 animate-spin" style={{ animationDuration: '6s' }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black tracking-wider uppercase text-[#00A86B] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        Parental Security Engine
                      </span>
                      <span className="text-xs font-semibold text-slate-400">Pre-Departure Peace-of-Mind</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                      Configuring Safe Pathway for <span className="text-[#00A86B]">{journeyDestination || 'UAE'}</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                    Passport: {passportCountry || 'India'}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-[#00A86B] text-xs font-bold">
                    100% Verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-6">
                {loadingSteps.map((step, idx) => {
                  const isCurrent = loadingStep === idx;
                  const isDone = loadingStep > idx;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                          : 'bg-white/40 border-slate-100 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{step.icon}</span>
                        <span className="text-xs font-black text-slate-900 truncate">Step {idx + 1}</span>
                        {isDone && <Check className="w-3.5 h-3.5 text-[#00A86B] ml-auto shrink-0" />}
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 leading-tight truncate">{step.title}</p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00A86B] to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ── FLOW 1: EXACT SCREENSHOT DESIGN (HAVE VISA? = YES) ── */}
          {hasVisaAlready === 'yes' && hasGenerated && (
            <div id="parental-security-engine-dashboard" className="w-full max-w-6xl mx-auto mt-8 text-left animate-fadeIn">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* ── LEFT CARD: STEP 1: VISA VERIFICATION & SMART ALERTS (5 COLS) ── */}
                <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <RotateCw className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          Step 1: Visa Verification &amp; Smart Alerts
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Auto-expiry tracker &amp; condition audit.
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-600 text-[11px] font-bold shrink-0">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{daysLeft !== null ? `${daysLeft}d left` : 'Set expiry date'}</span>
                    </div>
                  </div>

                  {/* Visa Type / Subclass */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                      VISA TYPE / SUBCLASS
                    </label>
                    <input
                      type="text"
                      value={approvedVisaType || currentStudyData.defaultVisaType}
                      onChange={(e) => {
                        setApprovedVisaType(e.target.value);
                        autoSaveJourney({ visa_type: e.target.value });
                      }}
                      placeholder="e.g. Student Subclass 500 / Skilled Worker (UAE)"
                      className="w-full h-12 px-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                        APPROVAL DATE
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={approvalDate}
                          onChange={(e) => {
                            setApprovalDate(e.target.value);
                            autoSaveJourney({ visa_grant_date: e.target.value });
                          }}
                          className="w-full h-12 px-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                        VISA EXPIRY DATE
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={validityDate}
                          onChange={(e) => {
                            setValidityDate(e.target.value);
                            autoSaveJourney({ visa_expiry_date: e.target.value });
                          }}
                          className="w-full h-12 px-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scan Visa Document Box */}
                  <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          Scan Visa Document
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Auto-extracts work hours &amp; legal rules.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => visaFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#2e0854] hover:bg-[#3d0b6f] text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{isOcrScanning ? 'Scanning...' : 'Scan'}</span>
                    </button>
                  </div>

                  {/* CONDITIONS OF VISA */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                        CONDITIONS OF VISA ({ocrConditions.length > 0 ? ocrConditions.length : currentStudyData.defaultConditions.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddingCondition(!isAddingCondition)}
                        className="text-xs font-extrabold text-[#00A86B] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>+ Add</span>
                      </button>
                    </div>

                    {isAddingCondition && (
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <input
                          type="text"
                          value={newCustomCondition}
                          onChange={(e) => setNewCustomCondition(e.target.value)}
                          placeholder="e.g. Work: 48h/fortnight allowed"
                          className="text-xs border border-slate-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                        <button
                          type="button"
                          onClick={handleAddCondition}
                          className="px-3 py-2 bg-[#00A86B] text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(ocrConditions.length > 0 ? ocrConditions : currentStudyData.defaultConditions).map((cond, idx) => {
                        let icon = '⏱️';
                        if (cond.toLowerCase().includes('health') || cond.toLowerCase().includes('insurance')) icon = '📑';
                        else if (cond.toLowerCase().includes('entry') || cond.toLowerCase().includes('multiple')) icon = '✈️';
                        else if (cond.toLowerCase().includes('id') || cond.toLowerCase().includes('enrollment')) icon = '🛡️';
                        
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/90 text-slate-800 text-[11px] font-bold"
                          >
                            <span className="text-sm shrink-0">{icon}</span>
                            <span className="truncate">{cond}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* ── RIGHT CARD: STEP 2: SUGGESTED NEXT ACTIONS CHECKLIST (7 COLS) ── */}
                <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A86B] shrink-0">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          Step 2: Suggested Next Actions Checklist
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          The Parent's Peace-of-Mind Roadmap for safe departure.
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#00A86B] text-xs font-black shrink-0">
                      <span>6 Safeguards</span>
                    </div>
                  </div>

                  {/* 2-Column x 3-Row Grid of 6 Action Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Action 1: Flight & Transit Check */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">✈️</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-sans">
                            TRANSIT
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          1. Flight &amp; Transit Check
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          {transitCheckResult || `Verify direct flight & transit to ${journeyDestination || 'Destination'}.`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => ticketFileInputRef.current?.click()}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{ticketScanning ? 'Verifying...' : flightTicketUploaded ? 'Ticket Uploaded ✓' : 'Upload Flight Ticket'}</span>
                      </button>
                    </div>

                    {/* Action 2: Driver & Airport Pickup */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">🚗</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-sans">
                            PICKUP
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          2. Driver &amp; Airport Pickup
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Book verified driver at {journeyDestination || 'terminal'}.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={pickupFlightNum}
                          onChange={(e) => setPickupFlightNum(e.target.value)}
                          placeholder="Flight No. (e.g. EK 502 / AI 995)"
                          className="w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPickupConfirmed(true);
                            autoSaveJourney({ airport_pickup_confirmed: true, airport_pickup_flight_no: pickupFlightNum });
                          }}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                            pickupConfirmed
                              ? 'bg-emerald-100 text-[#00A86B]'
                              : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                          }`}
                        >
                          {pickupConfirmed ? 'Pickup Confirmed ✓' : 'Confirm Pickup'}
                        </button>
                      </div>
                    </div>

                    {/* Action 3: Secure Housing */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">🏡</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-sans">
                            ESCROW
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          3. Secure Housing
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Escrow-protected student dorms &amp; flats in {journeyDestination || 'abroad'}.
                        </p>
                      </div>

                      <a
                        href="/classifieds?category=accommodation"
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all text-center shadow-xs"
                      >
                        <span>Find Housing</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Action 4: Peer Network */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">👥</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-sans">
                            COMMUNITY
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          4. Peer Network
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Connect with travellers moving to {journeyDestination || 'same city'}.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPeerNetworkJoined(!peerNetworkJoined);
                          autoSaveJourney({ peer_network_joined: !peerNetworkJoined });
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                          peerNetworkJoined
                            ? 'bg-emerald-100 text-[#00A86B]'
                            : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                        }`}
                      >
                        {peerNetworkJoined ? 'Group Joined ✓' : 'Join Peer Group'}
                      </button>
                    </div>

                    {/* Action 5: Forex & 5G eSIM */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">💳</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-sans">
                            0% MARKUP
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          5. Forex &amp; 5G eSIM
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Zero-markup {currentStudyData.currency} card &amp; instant QR eSIM.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setForexCardOrdered(!forexCardOrdered);
                          autoSaveJourney({ forex_ordered: !forexCardOrdered });
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                          forexCardOrdered
                            ? 'bg-emerald-100 text-[#00A86B]'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {forexCardOrdered ? 'Ordered ✓' : 'Get Forex & eSIM'}
                      </button>
                    </div>

                    {/* Action 6: Customs & Rules */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">📄</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-sans">
                            CUSTOMS
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          6. Customs &amp; Rules
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          {journeyDestination || 'Destination'} cash limit &amp; prescription guidelines.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={customsChecklistDone.cash}
                              onChange={(e) => {
                                const updated = { ...customsChecklistDone, cash: e.target.checked };
                                setCustomsChecklistDone(updated);
                                autoSaveJourney({ customs_checklist: updated });
                              }}
                              className="rounded text-[#00A86B] focus:ring-0 w-3.5 h-3.5"
                            />
                            <span>&lt;$10k Cash</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={customsChecklistDone.meds}
                              onChange={(e) => {
                                const updated = { ...customsChecklistDone, meds: e.target.checked };
                                setCustomsChecklistDone(updated);
                                autoSaveJourney({ customs_checklist: updated });
                              }}
                              className="rounded text-[#00A86B] focus:ring-0 w-3.5 h-3.5"
                            />
                            <span>Doctor Letter</span>
                          </label>
                        </div>

                        <a
                          href="/visa-guide"
                          className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold block text-center transition-all"
                        >
                          Read Arrival Guide →
                        </a>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ── FLOW 2: NOTEBOOK ARCHITECTURE (HAVE VISA? = NO) ── */}
          {hasVisaAlready === 'no' && (
            <div id="need-visa-pathway-dashboard" className="w-full max-w-6xl mx-auto mt-8 text-left animate-fadeIn space-y-6">
              
              {/* BRANCH A: PURPOSE = STUDY (8 STEPS NOTEBOOK ARCHITECTURE) */}
              {(travelPurpose === 'study' || !travelPurpose) && (
                <div className="space-y-6">
                  
                  {/* Top Pathway Header */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider mb-2">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Flow 2A: Study Abroad &amp; University Pathway (8 Steps)</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Target Pathway: Study Abroad in {journeyDestination || 'Top Universities'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                        8-Step notebook architecture: university shortlisting, document gathering, funds audit, readiness score &amp; VFS slot booking.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <div className="px-3.5 py-1.5 rounded-2xl bg-white/10 border border-white/15 text-white text-xs font-bold">
                        <span>Passport: {passportCountry || 'India'}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                        <span>Readiness Score: {studyReadinessScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* 8-Step Study Notebook Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* STEP 1: Qualification & University Match (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-black text-xs">1</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 1: Qualification &amp; University Match</h4>
                          <p className="text-[11px] text-slate-400">Tied-up institutions in {journeyDestination || 'Destination'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Highest Qualification</label>
                          <select
                            value={studyQualification}
                            onChange={(e) => setStudyQualification(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                          >
                            <option value="12th">12th / High School</option>
                            <option value="bachelors">Bachelor's Degree</option>
                            <option value="masters">Master's Degree</option>
                            <option value="diploma">Diploma / Associate</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Degree</label>
                          <select
                            value={studyTargetDegree}
                            onChange={(e) => setStudyTargetDegree(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                          >
                            <option value="bachelors">Bachelor's (UG)</option>
                            <option value="masters">Master's (PG / MS)</option>
                            <option value="postgrad">Postgraduate Diploma</option>
                            <option value="phd">PhD / Research</option>
                          </select>
                        </div>
                      </div>

                      {/* Dynamic Destination Universities */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-extrabold text-slate-600 block">
                          Top Verified Universities in {journeyDestination || 'Destination'}:
                        </span>
                        <div className="space-y-1.5">
                          {currentStudyData.unis.map((uni, idx) => {
                            const isSelected = activeSelectedUni === uni.name;
                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  setSelectedMatchedUni(uni.name);
                                  setStudyTuitionFee(uni.fee);
                                }}
                                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-emerald-50/80 border-[#00A86B] ring-1 ring-[#00A86B]'
                                    : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-50'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <div className="text-xs font-black text-slate-900 truncate">{uni.name}</div>
                                  <div className="text-[10px] text-slate-500 truncate">{uni.city} • {uni.rank} • {uni.fee}</div>
                                </div>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg shrink-0 ${
                                  isSelected ? 'bg-emerald-100 text-[#00A86B]' : 'bg-slate-200/70 text-slate-700'
                                }`}>
                                  {isSelected ? 'Selected ✓' : 'Select'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`/universities?country=${encodeURIComponent(journeyDestination || '')}`}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Search 1,200+ Tied-up Programs in {journeyDestination || 'Course Finder'} →</span>
                        </a>
                      </div>
                    </div>

                    {/* STEP 2: Course & Expense Finalization (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs">2</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 2: Course &amp; Expense Finalization</h4>
                          <p className="text-[11px] text-slate-400">Total estimated budget for {journeyDestination || 'Destination'}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Selected University:</span>
                          <span className="text-xs font-black text-slate-900 text-right truncate max-w-[200px]">{activeSelectedUni}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Annual Tuition Fee:</span>
                          <span className="text-xs font-black text-[#00A86B]">{activeTuitionFee}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Estimated Living Expenses:</span>
                          <span className="text-xs font-black text-slate-800">{activeLivingCost}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900">Total 1st Year Proof Required:</span>
                          <span className="text-sm font-black text-[#00A86B]">{currentStudyData.totalProof}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-extrabold text-slate-600 block mb-2">Required Document Checklist:</span>
                        <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                          <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                            <span>Academic Transcripts</span>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                            <span>Statement of Purpose</span>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                            <span>2 Recommendation Letters</span>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                            <span>IELTS / PTE / English Test</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3: Document Gathering & Client Dashboard Sync (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">3</span>
                          <div>
                            <h4 className="text-sm sm:text-base font-black text-slate-900">Step 3: Document Gathering &amp; Dashboard Sync</h4>
                            <p className="text-[11px] text-slate-400">Scanned docs auto-update data in Client Dashboard DB</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-[#00A86B]">
                          Synced to /dashboard ✓
                        </span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { label: 'Academic Transcripts (10th, 12th, Degree)', state: docTranscriptsUploaded, set: setDocTranscriptsUploaded },
                          { label: 'Statement of Purpose (SOP)', state: docSopUploaded, set: setDocSopUploaded },
                          { label: 'Letters of Recommendation (LOR)', state: docLorUploaded, set: setDocLorUploaded },
                          { label: 'English Proficiency (IELTS / PTE / TOEFL)', state: docIeltsUploaded, set: setDocIeltsUploaded }
                        ].map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
                            <span className="text-xs font-semibold text-slate-800">{doc.label}</span>
                            <button
                              type="button"
                              onClick={() => doc.set(!doc.state)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                                doc.state ? 'bg-[#00A86B] text-white' : 'bg-white border border-slate-200 text-slate-600'
                              }`}
                            >
                              {doc.state ? 'Uploaded ✓' : 'Upload +'}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-emerald-900">University Application Status</div>
                          <div className="text-[11px] text-emerald-700">Dossier prepared for {activeSelectedUni} admissions desk</div>
                        </div>
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-white text-[#00A86B] border border-emerald-200">
                          Applied (In Review)
                        </span>
                      </div>
                    </div>

                    {/* STEP 4: VFS Funds & Financial Weakness Audit (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-xs">4</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 4: VFS Funds &amp; Financial Weakness Audit</h4>
                          <p className="text-[11px] text-slate-400">Proof of funds calculator for {journeyDestination || 'Destination'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Available Funds</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={fundsAvailableAmount}
                              onChange={(e) => setFundsAvailableAmount(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                            />
                            <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400">{currentStudyData.currency}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Timeline</label>
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700">
                            ⏱️ 2–4 Weeks to Collect
                          </div>
                        </div>
                      </div>

                      {/* Partner Recommendations if Weakness / Loan Needed */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-extrabold text-slate-700 block">Partner Loan &amp; Insurance Providers:</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                            <div>
                              <div className="text-xs font-black text-slate-900">Education Loan Partners</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{currentStudyData.loanPartners}</div>
                            </div>
                            <a href="/support" className="text-[11px] font-bold text-[#00A86B] mt-2 block hover:underline">Apply Loan →</a>
                          </div>

                          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                            <div>
                              <div className="text-xs font-black text-slate-900">Mandatory Health Cover</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{currentStudyData.insurance}</div>
                            </div>
                            <a href="/services/travel-insurance" className="text-[11px] font-bold text-[#00A86B] mt-2 block hover:underline">View Policy →</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 5: Dynamic Readiness Score (12 Cols Full Width) */}
                    <div className="lg:col-span-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 rounded-lg bg-[#00A86B] text-white flex items-center justify-center font-black text-xs">5</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 5: Dynamic Visa Readiness Score</span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-black text-white">
                            Visa Approval Likelihood: <span className="text-emerald-400">{studyReadinessScore}%</span>
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                            Algorithmic scoring based on academic qualification, language proficiency, verified funds docket for {journeyDestination || 'destination'}, and university offer status.
                          </p>
                        </div>

                        <div className="shrink-0">
                          {studyReadinessScore >= 95 ? (
                            <div className="bg-emerald-500/20 border border-emerald-500/40 p-3.5 rounded-2xl text-center">
                              <div className="text-xs font-black text-emerald-300">⭐ High Profile Strength</div>
                              <div className="text-[11px] text-slate-200 mt-0.5">Self-Apply Recommended</div>
                              <a
                                href="/self-apply"
                                className="mt-2 inline-block px-4 py-1.5 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-black rounded-xl transition-all shadow-md"
                              >
                                Self Apply Now →
                              </a>
                            </div>
                          ) : (
                            <div className="bg-amber-500/20 border border-amber-500/40 p-3.5 rounded-2xl text-center">
                              <div className="text-xs font-black text-amber-300">Profile Boost Needed (&lt;95%)</div>
                              <div className="text-[11px] text-slate-200 mt-0.5">Specialist Guidance Suggested</div>
                              <button
                                type="button"
                                onClick={() => {
                                  const formEl = document.getElementById('study-lead-capture-section');
                                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-2 inline-block px-4 py-1.5 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer"
                              >
                                📞 Contact Expert to Enhance Profile
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-[#00A86B] h-full rounded-full transition-all duration-500"
                          style={{ width: `${studyReadinessScore}%` }}
                        />
                      </div>
                    </div>

                    {/* STEP 6: Admission Re-Check (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-black text-xs">6</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 6: Admission Re-Check</h4>
                          <p className="text-[11px] text-slate-400">Re-verify documents alongside {currentStudyData.admissionDocName}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600 truncate mr-2">{currentStudyData.admissionDocName}:</span>
                          <input
                            type="text"
                            value={casI20Number || currentStudyData.casNumber}
                            onChange={(e) => setCasI20Number(e.target.value)}
                            className="bg-white border border-slate-200 text-xs font-black text-slate-900 rounded-lg px-2.5 py-1 w-36 text-right"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <span className="text-xs font-bold text-slate-600">University Offer Letter:</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified by {activeSelectedUni} ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* STEPS 7 & 8: VFS Appointment Booking & Final Application Submission (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs">7 &amp; 8</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 7 &amp; 8: Slot Booking &amp; Final Filing</h4>
                          <p className="text-[11px] text-slate-400">Biometric slot booking &amp; official embassy filing</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-black text-slate-900">Step 7: Appointment Slot</div>
                            <div className="text-[11px] text-slate-500">{currentStudyData.vfsText}</div>
                          </div>
                          <a
                            href="/vfs-appointment"
                            className="px-3 py-1.5 bg-[#00A86B] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#008f5a] transition-all"
                          >
                            Book Slot →
                          </a>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-black text-slate-900">Step 8: Final Visa Filing</div>
                            <div className="text-[11px] text-slate-500">Dossier lock &amp; embassy tracking generation</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFinalDossierSubmitted(true)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                              finalDossierSubmitted ? 'bg-emerald-100 text-[#00A86B]' : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {finalDossierSubmitted ? 'Submitted ✓' : 'Submit Application'}
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* BRANCH B: PURPOSE = VISIT (TOURIST / FAMILY - DYNAMICALLY RESOLVED) */}
              {travelPurpose === 'visit' && (
                <div className="space-y-6">
                  
                  {/* Top Pathway Header */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider mb-2">
                        <Compass className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Flow 2B: Tourist &amp; Visitor Visa Engine</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Target Pathway: Tourist / Visitor Visa to {journeyDestination || 'Abroad'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                        3-Step tourist auditor: budget verification, trip itinerary planner / tour packages &amp; VFS slot booking.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <div className="px-3.5 py-1.5 rounded-2xl bg-white/10 border border-white/15 text-white text-xs font-bold">
                        <span>Passport: {passportCountry || 'India'}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                        <span>Verified Tourist Checklist</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* STEP 1: VFS Tourist Checklist & Budget Proof Auditor (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-black text-xs">1</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 1: VFS Tourist Checklist &amp; Budget Proof</h4>
                          <p className="text-[11px] text-slate-400">Essential visitor requirements for {journeyDestination || 'Destination'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">Passport Validity (6+ Months Minimum)</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">Proof of Funds</span>
                            <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                          </div>
                          <p className="text-[10px] text-slate-500">{currentVisitData.fundsText}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">Ties to Home Country (Job / Property / Family)</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">International Travel Health Insurance</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* STEP 2: Trip Planning Audit (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs">2</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 2: Trip Planning Audit</h4>
                          <p className="text-[11px] text-slate-400">Planned trip to {journeyDestination || 'Destination'} or need packages?</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-600 block mb-2">Planned trip already?</span>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setVisitPlannedAlready('yes')}
                            className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              visitPlannedAlready === 'yes'
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-slate-50 border border-slate-200 text-slate-700'
                            }`}
                          >
                            YES (I have itinerary)
                          </button>
                          <button
                            type="button"
                            onClick={() => setVisitPlannedAlready('no')}
                            className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              visitPlannedAlready === 'no'
                                ? 'bg-[#00A86B] text-white shadow-md'
                                : 'bg-slate-50 border border-slate-200 text-slate-700'
                            }`}
                          >
                            NO (Need Tour Packages)
                          </button>
                        </div>
                      </div>

                      {visitPlannedAlready === 'yes' ? (
                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                          <div className="text-xs font-bold text-emerald-900">AI Itinerary &amp; Hotel Audit</div>
                          <p className="text-[11px] text-emerald-700">Upload flight itinerary &amp; hotel booking for {journeyDestination || 'stay'} genuine visitor audit.</p>
                          <button
                            type="button"
                            onClick={() => setVisitItineraryUploaded(true)}
                            className="px-3.5 py-1.5 bg-[#00A86B] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                          >
                            {visitItineraryUploaded ? 'Itinerary Uploaded ✓' : 'Upload Travel Plan'}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-600 block">Curated {journeyDestination || 'Destination'} Tour Packages:</span>
                          <div className="space-y-1.5">
                            {currentVisitData.packages.map((pkg, idx) => (
                              <div
                                key={idx}
                                onClick={() => setVisitSelectedTourPackage(pkg.name)}
                                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${
                                  visitSelectedTourPackage === pkg.name ? 'bg-emerald-50 border-[#00A86B]' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div>
                                  <div className="text-xs font-black text-slate-900">{pkg.name}</div>
                                  <div className="text-[10px] text-slate-500">{pkg.days} • {pkg.price}</div>
                                </div>
                                <span className="text-[10px] font-bold text-[#00A86B]">Select →</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* STEP 3: VFS Booking & Final Submission (12 Cols) */}
                    <div className="lg:col-span-12 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-lg bg-[#00A86B] text-white flex items-center justify-center font-black text-xs">3</span>
                          <span className="text-xs font-black text-slate-900">Step 3: Final Document Re-check &amp; VFS Submission</span>
                        </div>
                        <p className="text-xs text-slate-500">{currentVisitData.vfsSlotText}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <a
                          href="/vfs-appointment"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                        >
                          Book VFS Slot →
                        </a>
                        <a
                          href="/self-apply"
                          className="px-4 py-2 bg-[#00A86B] hover:bg-[#008f5a] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                        >
                          Submit Visa Application
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* FALLBACK / WORK / PR / GENERAL LEAD CAPTURE SECTION */}
              <div id="study-lead-capture-section" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
                {leadSubmittedSuccess ? (
                  <div className="text-center py-6 space-y-3 animate-fadeIn">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-[#00A86B] flex items-center justify-center mx-auto text-3xl shadow-sm">
                      ✅
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Profile Evaluation Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                      Our certified <strong>{journeyDestination || 'Visa'}</strong> specialist will review your profile and reach out to you on <strong>{leadContactPref === 'whatsapp' ? 'WhatsApp' : 'Phone'}</strong> ({leadPhoneNumber}) shortly.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200 text-[10px] font-black uppercase tracking-wider mb-1.5">
                          <Sparkles className="w-3 h-3" />
                          <span>1-on-1 Specialist Matchmaker</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900">
                          Need Expert Profile Enhancement for {journeyDestination || 'Abroad'}?
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Get your SOP, financial proof, and visa file reviewed by certified immigration lawyers.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleNoVisaLeadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={leadFullName}
                          onChange={(e) => setLeadFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={leadPhoneNumber}
                          onChange={(e) => setLeadPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={leadSubmitting}
                          className={`w-full h-11 font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
                            hasVisaAlready === 'no'
                              ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/30'
                              : 'bg-[#00A86B] hover:bg-[#008f5a] text-white shadow-md shadow-[#00A86B]/25'
                          }`}
                        >
                          <PhoneCall className={`w-4 h-4 ${hasVisaAlready === 'no' ? 'text-cyan-400' : 'text-emerald-100'}`} />
                          <span>{leadSubmitting ? 'Connecting...' : 'Request Free Specialist Callback'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ── 3. MULTI-TAB GLOBAL SEARCH & FILTER WIDGET (ALWAYS VISIBLE & ADAPTING) ── */}
          <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-4 sm:p-7 md:p-9 shadow-[0_14px_50px_rgba(0,0,0,0.05)] text-left">
            
            {/* Top 5 Service Directory Tabs */}
            <div className="flex items-center justify-start sm:justify-between gap-4 sm:gap-6 border-b border-slate-100 overflow-x-auto no-scrollbar pb-3 sm:pb-4 mb-5 sm:mb-6 px-1">
              <button
                type="button"
                onClick={() => setActiveSearchTab('universities')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'universities'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Universities</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('consultants')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'consultants'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Consultants</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('relocation')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'relocation'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Luggage className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Relocation Assistance</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('jobs')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'jobs'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Jobs Abroad</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('lawyers')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'lawyers'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Immigration Lawyers</span>
              </button>
            </div>

            {/* ── DYNAMIC ROW 1 FILTER FIELDS ── */}
            {activeSearchTab === 'universities' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course Level</label>
                  <div
                    ref={courseLevelRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => setIsCourseLevelOpen(!isCourseLevelOpen)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">🎓</span>
                      <span className={`text-sm font-semibold truncate ${courseLevel ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {courseLevelOptions.find(o => o.value === courseLevel)?.label || 'Select Level'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCourseLevelOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCourseLevelOpen && (
                      <div
                        className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-0.5">
                          {courseLevelOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setCourseLevel(opt.value);
                                setIsCourseLevelOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                courseLevel === opt.value ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {courseLevel === opt.value && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <input
                    type="text"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    placeholder="e.g. UAE, Canada, UK, Australia"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">State / City</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Dubai, Toronto, London, Sydney"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
              </div>
            )}

            {/* Global Search Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGlobalSearch}
                className={`w-full py-3.5 font-extrabold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  hasVisaAlready === 'no'
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/25'
                    : 'bg-[#00A86B] hover:bg-[#008f5a] text-white shadow-lg shadow-emerald-600/20'
                }`}
              >
                <Search className={`w-4 h-4 ${hasVisaAlready === 'no' ? 'text-cyan-400' : 'text-white'}`} />
                <span>Search {activeSearchTab === 'universities' ? 'Universities & Courses' : activeSearchTab === 'consultants' ? 'Verified Consultants' : activeSearchTab === 'relocation' ? 'Relocation Classifieds' : activeSearchTab === 'jobs' ? 'Jobs Abroad' : 'Immigration Lawyers'} →</span>
              </button>
            </div>

            {/* ── MONETIZATION LAYER: CLASSIFIEDS & DISCORD ADS CONTAINERS ── */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Ad Placeholder 1: Relocation Classifieds & Services */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm text-lg">
                    📦
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-md">
                        Sponsored Classifieds
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                      Student Shuttles, Shared Flats &amp; Forex
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Verified rides, airport transfers &amp; low-cost shared student apartments in Dubai, Toronto, London &amp; Melbourne.
                    </p>
                  </div>
                </div>
                <a
                  href="/classifieds"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl whitespace-nowrap shrink-0 shadow-xs"
                >
                  View Deals →
                </a>
              </div>

              {/* Ad Placeholder 2: Discord & Student Community */}
              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/40 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center font-bold shrink-0 shadow-sm text-lg">
                    💬
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-200/70 text-indigo-900 px-2 py-0.5 rounded-md">
                        Global Community
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                      Join 15,000+ Students &amp; Travellers
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Live visa Q&amp;A, pre-departure roommate matching, and city guides on Discord.
                    </p>
                  </div>
                </div>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold rounded-xl whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1"
                >
                  <span>Join Discord</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
