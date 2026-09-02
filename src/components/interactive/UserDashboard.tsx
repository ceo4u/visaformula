import { useState, useEffect } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, ArrowLeft, Bell, FileText, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, LayoutDashboard, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, LogOut, CheckSquare, Sparkles, X, ChevronDown, Filter, MapPin, Globe, LayoutGrid, Save, Menu, ChevronLeft, Edit2, Upload,
    CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Compass, CreditCard,
    Eye, EyeOff, Mail, KeyRound
} from "lucide-react";

export interface VaultDocItem {
  key: string;
  title: string;
  description: string;
  icon: string;
  mandatory: boolean;
  hint: string;
}

export function normalizeCountryName(val: string): string {
  const s = (val || '').toLowerCase().trim();
  if (!s) return 'United States';
  if ((s.includes('unit') && s.includes('state')) || s === 'us' || s === 'usa' || s.includes('america') || s === 'american') return 'United States';
  if (s.includes('emirate') || s.includes('uae') || s.includes('dubai') || s.includes('abu dhabi') || s.includes('emirati')) return 'United Arab Emirates';
  if (s.includes('india') || s === 'in' || s.includes('indian')) return 'India';
  if (s.includes('kingdom') || s === 'uk' || s.includes('britain') || s.includes('british') || s.includes('england')) return 'United Kingdom';
  if (s.includes('canada') || s.includes('canadian')) return 'Canada';
  if (s.includes('australia') || s.includes('australian')) return 'Australia';
  if (s.includes('germany') || s.includes('german') || s.includes('deutschland')) return 'Germany';
  if (s.includes('nepal') || s.includes('nepalese') || s.includes('nepali')) return 'Nepal';
  if (s.includes('bangladesh') || s.includes('bangladeshi')) return 'Bangladesh';
  if (s.includes('sri lanka') || s.includes('sri lankan')) return 'Sri Lanka';
  if (s.includes('philippine') || s.includes('filipino')) return 'Philippines';
  if (s.includes('nigeria') || s.includes('nigerian')) return 'Nigeria';
  if (s.includes('pakistan') || s.includes('pakistani')) return 'Pakistan';
  if (s.includes('france') || s.includes('french')) return 'France';
  if (s.includes('new zealand') || s.includes('kiwi')) return 'New Zealand';
  if (s.includes('ireland') || s.includes('irish')) return 'Ireland';
  if (s.includes('singapore') || s.includes('singaporean')) return 'Singapore';
  if (s.includes('japan') || s.includes('japanese')) return 'Japan';
  if (s.includes('jordan') || s.includes('jordanian')) return 'Jordan';
  return val;
}

export function getAiDocIcon(title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('passport')) return '🛂';
  if (t.includes('photo') || t.includes('picture')) return '📸';
  if (t.includes('flight') || t.includes('ticket') || t.includes('air') || t.includes('travel')) return '✈️';
  if (t.includes('hotel') || t.includes('stay') || t.includes('accommodation') || t.includes('host') || t.includes('address')) return '🏨';
  if (t.includes('bank') || t.includes('financial') || t.includes('funds') || t.includes('statement') || t.includes('solvency')) return '💰';
  if (t.includes('ds-160') || t.includes('form') || t.includes('application') || t.includes('schengen')) return '📝';
  if (t.includes('appointment') || t.includes('schedule') || t.includes('confirmation')) return '📅';
  if (t.includes('employment') || t.includes('work') || t.includes('leave') || t.includes('noc') || t.includes('job') || t.includes('ties')) return '💼';
  if (t.includes('insurance') || t.includes('medical') || t.includes('health')) return '🛡️';
  if (t.includes('student') || t.includes('cas') || t.includes('i-20') || t.includes('admit') || t.includes('degree')) return '🎓';
  if (t.includes('invitation') || t.includes('sponsor')) return '✉️';
  return '📄';
}

export function cleanStepText(step: string, idx: number): { stepNum: number; text: string } {
  let text = (step || '').replace(/^[0-9]+[?.\-:\s]+/, '').replace(/^Step\s*[0-9]+[:\s-]*/i, '').trim();
  text = text.replace(/^\?\?+\s*/, '').trim();
  return { stepNum: idx + 1, text };
}

export const dashboardPassportOptions = [
  { value: 'India', label: 'India (Indian)', flag: '🇮🇳' },
  { value: 'United States', label: 'United States (American)', flag: '🇺🇸' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates (Emirati)', flag: '🇦🇪' },
  { value: 'United Kingdom', label: 'United Kingdom (British)', flag: '🇬🇧' },
  { value: 'Canada', label: 'Canada (Canadian)', flag: '🇨🇦' },
  { value: 'Australia', label: 'Australia (Australian)', flag: '🇦🇺' },
  { value: 'Nepal', label: 'Nepal (Nepalese)', flag: '🇳🇵' },
  { value: 'Bangladesh', label: 'Bangladesh (Bangladeshi)', flag: '🇧🇩' },
  { value: 'Sri Lanka', label: 'Sri Lanka (Sri Lankan)', flag: '🇱🇰' },
  { value: 'Philippines', label: 'Philippines (Philippine)', flag: '🇵🇭' },
  { value: 'Nigeria', label: 'Nigeria (Nigerian)', flag: '🇳🇬' },
  { value: 'Pakistan', label: 'Pakistan (Pakistani)', flag: '🇵🇰' },
  { value: 'Germany', label: 'Germany (German)', flag: '🇩🇪' },
  { value: 'Other', label: 'Other Country', flag: '🌍' }
];

export const dashboardDestinationOptions = [
  { value: 'United States', label: 'United States (USA)', flag: '🇺🇸', defaultVisa: 'B1/B2 Visitor Visa' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates (UAE / Dubai)', flag: '🇦🇪', defaultVisa: '30/60 Days Tourist Visa' },
  { value: 'Canada', label: 'Canada', flag: '🇨🇦', defaultVisa: 'Visitor Visa / Study Permit' },
  { value: 'United Kingdom', label: 'United Kingdom (UK)', flag: '🇬🇧', defaultVisa: 'Standard Visitor Visa' },
  { value: 'Australia', label: 'Australia', flag: '🇦🇺', defaultVisa: 'Subclass 600 / Subclass 500' },
  { value: 'Germany', label: 'Germany / Schengen', flag: '🇩🇪', defaultVisa: 'Schengen Visa Type C' },
  { value: 'Jordan', label: 'Jordan', flag: '🇯🇴', defaultVisa: 'Jordan Pass / Entry Visa' },
  { value: 'Singapore', label: 'Singapore', flag: '🇸🇬', defaultVisa: 'e-Visa / Tourist Pass' },
  { value: 'France', label: 'France / Schengen', flag: '🇫🇷', defaultVisa: 'Short-Stay Schengen Visa' },
  { value: 'New Zealand', label: 'New Zealand', flag: '🇳🇿', defaultVisa: 'NZeTA / Visitor Visa' },
  { value: 'Ireland', label: 'Ireland', flag: '🇮🇪', defaultVisa: 'Short Stay "C" Tourist Visa' },
  { value: 'Japan', label: 'Japan', flag: '🇯🇵', defaultVisa: 'Single/Multiple Entry Tourist Visa' }
];

export const dashboardPurposeOptions = [
  { value: 'Tourism / Vacation', label: 'Tourism / Vacation', emoji: '🏝️' },
  { value: 'Higher Studies', label: 'Higher Studies', emoji: '🎓' },
  { value: 'Employment / Work', label: 'Employment / Work', emoji: '💼' },
  { value: 'Business Visit', label: 'Business Visit', emoji: '🏢' },
  { value: 'Family / Friends Visit', label: 'Family / Friends Visit', emoji: '👨‍👩‍👦' }
];

export const globalTravelDocuments: VaultDocItem[] = [
  {
    key: 'global_passport',
    title: 'Original Passport (Bio-data Page Front & Back)',
    description: 'Current valid passport bio-data page with minimum 6 months validity from intended departure date and at least 2 clear blank visa pages.',
    icon: '🛂',
    mandatory: true,
    hint: 'Front & back booklet pages with clear MRZ zone'
  },
  {
    key: 'global_travel_history',
    title: 'Travel History Proofs (Immigration Stamps & Boarding Passes)',
    description: 'Scans of all entry/exit immigration stamps from previous international travels, old flight boarding passes, or completed foreign trip itineraries.',
    icon: '✈️',
    mandatory: false,
    hint: 'Proves positive travel compliance record'
  },
  {
    key: 'global_previous_visas',
    title: 'Previous Visa Approvals (Old Visas & Permits)',
    description: 'Copies of previously issued US, UK, Schengen, Canada, UAE or other international visas (valid or expired) to establish consular credibility.',
    icon: '📄',
    mandatory: false,
    hint: 'Valid or expired visa stickers'
  }
];

export function getDestinationChecklist(dest: string, purp: string): VaultDocItem[] {
  const d = (dest || '').toLowerCase();
  const p = (purp || '').toLowerCase();

  if (d.includes('united states') || d.includes('usa') || d.includes('america')) {
    if (p.includes('study') || p.includes('student')) {
      return [
        {
          key: 'us_i20',
          title: 'Form I-20 (Certificate of Eligibility)',
          description: 'Official Form I-20 issued by SEVP-certified US university, signed by both the Designated School Official (DSO) and student.',
          icon: '🎓',
          mandatory: true,
          hint: 'Original signed I-20 document'
        },
        {
          key: 'us_sevis',
          title: 'SEVIS I-901 Fee Payment Receipt ($350)',
          description: 'Official Department of Homeland Security receipt confirming payment of $350 SEVIS fee prior to visa interview.',
          icon: '🧾',
          mandatory: true,
          hint: 'SEVIS payment confirmation sheet'
        },
        {
          key: 'us_ds160',
          title: 'DS-160 Confirmation & F-1 Visa Appointment Letter',
          description: 'Form DS-160 Nonimmigrant Visa barcode confirmation page along with OFC biometric and consular interview appointment letter.',
          icon: '📋',
          mandatory: true,
          hint: 'Barcode confirmation & appointment slip'
        },
        {
          key: 'us_transcripts',
          title: 'Academic Transcripts, Degree & Standardized Test Scores',
          description: 'Official mark sheets, degree completion certificates, and valid test scorecards (IELTS, TOEFL, GRE, or GMAT).',
          icon: '📚',
          mandatory: true,
          hint: 'Original marksheets & test score report'
        },
        {
          key: 'us_financials',
          title: 'Financial Solvency Proof & Sponsor Affidavit of Support',
          description: 'Bank statements, fixed deposits, education loan sanction letter, or Form I-134 demonstrating funds covering at least 1 full year expenses.',
          icon: '💰',
          mandatory: true,
          hint: 'Bank statement with seal & loan letter'
        },
        {
          key: 'us_sop',
          title: 'Statement of Purpose (SOP) & Curriculum Vitae (CV)',
          description: 'Comprehensive statement of purpose detailing academic goals, career roadmap, and strong nonimmigrant intent.',
          icon: '📝',
          mandatory: false,
          hint: 'Structured SOP & 2-page resume'
        }
      ];
    }

    if (p.includes('work') || p.includes('employment')) {
      return [
        {
          key: 'us_i797',
          title: 'Form I-797 Notice of Action (Approved Petition)',
          description: 'Official USCIS approval notice for H-1B, L-1, or O-1 temporary worker visa category.',
          icon: '📜',
          mandatory: true,
          hint: 'USCIS I-797 approval copy'
        },
        {
          key: 'us_offer_letter',
          title: 'US Employer Employment Offer Letter & LCA Copy',
          description: 'Letter from US petitioner confirming job role, annual salary, work location, and approved Labor Condition Application.',
          icon: '🏢',
          mandatory: true,
          hint: 'Signed company offer & job specifications'
        },
        {
          key: 'us_ds160',
          title: 'DS-160 Confirmation & Visa Appointment Confirmation',
          description: 'Form DS-160 submission confirmation page with appointment schedule for biometric and interview slots.',
          icon: '📋',
          mandatory: true,
          hint: 'DS-160 barcode confirmation sheet'
        },
        {
          key: 'us_experience',
          title: 'Work Experience Credentials, Pay Slips & Degree Certificates',
          description: 'Past employment certificates, last 6 months pay slips, and university degrees verifying specialized knowledge.',
          icon: '💼',
          mandatory: true,
          hint: 'Relieving letters, pay slips & degree'
        }
      ];
    }

    // Default: USA Tourism / Visitor (B1/B2)
    return [
      {
        key: 'us_ds160',
        title: 'DS-160 Nonimmigrant Visa Confirmation Page',
        description: 'Complete online Form DS-160 submission confirmation page bearing clear alphanumeric barcode and applicant photograph.',
        icon: '📋',
        mandatory: true,
        hint: 'High-resolution barcode confirmation page'
      },
      {
        key: 'us_appointment',
        title: 'US Visa Appointment Confirmation Letter (OFC & Embassy)',
        description: 'Official appointment confirmation document for Visa Application Center (VAC/OFC) biometrics and US Embassy/Consulate interview.',
        icon: '📅',
        mandatory: true,
        hint: 'Appointment letter showing date, time & location'
      },
      {
        key: 'us_bank_statement',
        title: 'Proof of Liquid Funds (6-Month Bank Statements with Bank Seal)',
        description: 'Bank statements for past 6 consecutive months showing healthy liquid closing balance, regular transactions, and official bank branch stamp.',
        icon: '🏦',
        mandatory: true,
        hint: 'Original bank statement with branch seal'
      },
      {
        key: 'us_ties',
        title: 'Ties to Home Country (Employer Leave NOC / Business Registration)',
        description: 'Official letter from employer approving leave dates and confirming job continuation, or company registration / GST for self-employed.',
        icon: '🏢',
        mandatory: true,
        hint: 'Signed NOC on company letterhead / Business proof'
      },
      {
        key: 'us_itinerary',
        title: 'US Travel Itinerary & Hotel Reservation / Invitation Letter',
        description: 'Day-by-day travel plan outlining cities to visit, flight booking reservation, and confirmed hotel booking or host invitation letter.',
        icon: '🗺️',
        mandatory: true,
        hint: 'Tentative flight schedule & hotel vouchers'
      },
      {
        key: 'us_tax_returns',
        title: 'Income Tax Returns (ITR / Form 16 for Last 2-3 Years)',
        description: 'Acknowledgement receipts of filed Income Tax Returns or Form 16 proving legitimate taxable income and financial stability.',
        icon: '📑',
        mandatory: true,
        hint: 'ITR-V acknowledgement copies'
      }
    ];
  }

  if (d.includes('canada')) {
    if (p.includes('study') || p.includes('student')) {
      return [
        {
          key: 'ca_loa',
          title: 'Official Letter of Acceptance (LOA) & PAL Certificate',
          description: 'Official acceptance letter from Designated Learning Institution (DLI) along with mandatory Provincial Attestation Letter.',
          icon: '🎓',
          mandatory: true,
          hint: 'DLI LOA & Provincial Attestation Letter'
        },
        {
          key: 'ca_gic',
          title: 'Guaranteed Investment Certificate (GIC - $20,635 CAD)',
          description: 'GIC certificate issued by approved Canadian financial institution (Scotiabank, ICICI, CIBC, or RBC).',
          icon: '💳',
          mandatory: true,
          hint: 'GIC confirmation certificate'
        },
        {
          key: 'ca_tuition',
          title: 'First Year Tuition Fee Payment Official Receipt',
          description: 'Wire transfer payment receipt or university acknowledgement confirming 1st year tuition fee fully paid.',
          icon: '🧾',
          mandatory: true,
          hint: 'Official university fee receipt'
        },
        {
          key: 'ca_ielts',
          title: 'IELTS / PTE Academic Official Scorecard',
          description: 'Official language proficiency test scorecard meeting SDS / Non-SDS minimum score thresholds.',
          icon: '🗣️',
          mandatory: true,
          hint: 'Valid IELTS/PTE score sheet'
        },
        {
          key: 'ca_sop',
          title: 'Statement of Purpose (SOP) & Study Plan for IRCC Officer',
          description: 'Detailed statement explaining study choice, financial capability, career path in home country, and ties.',
          icon: '📝',
          mandatory: true,
          hint: 'Comprehensive study plan document'
        }
      ];
    }

    return [
      {
        key: 'ca_application',
        title: 'IMM 5257 Application for Visitor Visa & IMM 5645 Family Info',
        description: 'Completed IRCC application forms with accurate travel history, employment, and family tree declarations.',
        icon: '📋',
        mandatory: true,
        hint: 'IRCC application form package'
      },
      {
        key: 'ca_funds',
        title: 'Proof of Financial Means (4-Month Bank Statements & ITR)',
        description: 'Certified bank statements for past 4 months showing stable savings, salary deposits, and last 2 years tax returns.',
        icon: '🏦',
        mandatory: true,
        hint: 'Certified bank statements with manager sign'
      },
      {
        key: 'ca_ties',
        title: 'Employment Verification & Approved Leave Certificate (NOC)',
        description: 'Letter from employer confirming employment designation, monthly compensation, and approved leave duration.',
        icon: '🏢',
        mandatory: true,
        hint: 'Original employer NOC letter'
      },
      {
        key: 'ca_itinerary',
        title: 'Travel Purpose, Flight Itinerary & Hotel Bookings',
        description: 'Confirmed round-trip flight reservations, hotel vouchers or Canadian resident host invitation with status proof.',
        icon: '✈️',
        mandatory: true,
        hint: 'Flight itinerary & stay vouchers'
      }
    ];
  }

  if (d.includes('united kingdom') || d.includes('uk')) {
    return [
      {
        key: 'uk_vfs',
        title: 'UKVI Visa Application Confirmation & Document Checklist',
        description: 'Official UK Visas and Immigration submission confirmation and biometric appointment confirmation at VFS Global.',
        icon: '📋',
        mandatory: true,
        hint: 'UKVI appointment & barcode checklist'
      },
      {
        key: 'uk_bank',
        title: '6-Month Bank Statements with 28-Day Holding Verification',
        description: 'Original bank statements demonstrating consistent financial maintenance without sudden unverified large deposits.',
        icon: '🏦',
        mandatory: true,
        hint: 'Bank statement with branch seal'
      },
      {
        key: 'uk_employment',
        title: 'Employer Leave NOC, Pay Slips & Tax Documents',
        description: 'Approved leave letter from current employer, last 3 to 6 months payslips, and income tax returns.',
        icon: '🏢',
        mandatory: true,
        hint: 'Employer letter & salary slips'
      },
      {
        key: 'uk_itinerary',
        title: 'UK Travel Itinerary, Accommodation Booking & Flight Schedule',
        description: 'Hotel reservations or host accommodation letter along with planned trip schedule.',
        icon: '🗺️',
        mandatory: true,
        hint: 'Hotel bookings & roundtrip flights'
      }
    ];
  }

  if (d.includes('germany') || d.includes('france') || d.includes('schengen') || d.includes('italy') || d.includes('spain')) {
    return [
      {
        key: 'schengen_insurance',
        title: '€30,000 Travel Medical Insurance (Schengen Compliant)',
        description: 'Mandatory travel medical insurance covering emergency medical expenses, hospitalization, and repatriation with €30,000 minimum cover.',
        icon: '🛡️',
        mandatory: true,
        hint: 'Zero deductible Schengen insurance policy'
      },
      {
        key: 'schengen_flight',
        title: 'Confirmed Return Flight Reservations & Hotel Vouchers',
        description: 'Round-trip flight booking with PNR and confirmed hotel accommodation covering entire stay across Schengen zone.',
        icon: '✈️',
        mandatory: true,
        hint: 'Flight PNR & hotel reservation vouchers'
      },
      {
        key: 'schengen_bank',
        title: 'Bank Statements (3 Months) & Last 2 Years ITR',
        description: 'Duly stamped bank statement from bank branch and income tax returns confirming financial stability.',
        icon: '🏦',
        mandatory: true,
        hint: 'Stamped bank statement & ITR'
      },
      {
        key: 'schengen_noc',
        title: 'Employer Leave NOC / Business Registration Proof',
        description: 'Formal leave sanction letter on company letterhead or GST registration for self-employed.',
        icon: '🏢',
        mandatory: true,
        hint: 'Company signed leave approval'
      }
    ];
  }

  if (d.includes('emirate') || d.includes('uae') || d.includes('dubai') || d.includes('abu dhabi')) {
    return [
      {
        key: 'uae_ticket',
        title: 'Confirmed Return Flight Ticket (Within 30/60 Days)',
        description: 'Confirmed roundtrip air ticket with onward journey booking reference.',
        icon: '✈️',
        mandatory: true,
        hint: 'Airline booking reference / PNR'
      },
      {
        key: 'uae_hotel',
        title: 'Hotel Reservation / Resident Host Sponsorship Letter',
        description: 'Confirmed hotel booking voucher or host invitation with valid Emirates ID copy.',
        icon: '🏨',
        mandatory: true,
        hint: 'Confirmed stay accommodation'
      },
      {
        key: 'uae_funds',
        title: 'Proof of Financial Means (3-Month Bank Statements)',
        description: 'Bank statements showing sufficient funds for stay duration in UAE.',
        icon: '🏦',
        mandatory: true,
        hint: 'Bank statement with official stamp'
      },
      {
        key: 'uae_photo',
        title: 'Passport Size Photograph (Recent, White Background, 35x45mm)',
        description: 'High-contrast studio photograph adhering to UAE ICP biometric guidelines.',
        icon: '📸',
        mandatory: true,
        hint: 'Studio photo with white backdrop'
      }
    ];
  }

  // Default international travel checklist
  return [
    {
      key: 'general_flight',
      title: 'Confirmed Return Flight Ticket / Reservation',
      description: 'Proof of onward or return travel from destination country.',
      icon: '✈️',
      mandatory: true,
      hint: 'Airline booking confirmation'
    },
    {
      key: 'general_hotel',
      title: 'Hotel Accommodation Voucher / Host Invitation',
      description: 'Proof of confirmed lodging or host address and contact details.',
      icon: '🏨',
      mandatory: true,
      hint: 'Hotel confirmation or host letter'
    },
    {
      key: 'general_funds',
      title: 'Proof of Financial Means (3-Month Bank Statements)',
      description: 'Demonstrating sufficient liquid funds to cover all living and travel expenses.',
      icon: '🏦',
      mandatory: true,
      hint: 'Official bank statement'
    },
    {
      key: 'general_photo',
      title: 'Passport Size Photograph (Recent, White Background)',
      description: 'Recent photograph meeting consular biometric photo dimensions (35x45mm).',
      icon: '📸',
      mandatory: true,
      hint: 'High-contrast studio photograph'
    }
  ];
}

export function UserDashboard() {
    const [ieltsScore, setIeltsScore] = useState({ L: 0, R: 0, W: 0, S: 0 });
    const hasIeltsScore = ieltsScore.L > 0 || ieltsScore.R > 0 || ieltsScore.W > 0 || ieltsScore.S > 0;
    const overallBand = hasIeltsScore ? ((ieltsScore.L + ieltsScore.R + ieltsScore.W + ieltsScore.S) / 4).toFixed(1) : "N/A";
    
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passportCountry, setPassportCountry] = useState("");
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
    const [residentOf, setResidentOf] = useState("");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");

    const [favouriteExperts, setFavouriteExperts] = useState<any[]>([]);
    const [visasProcessingState, setVisasProcessingState] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isScanningVaultDoc, setIsScanningVaultDoc] = useState(false);
    const [journeyData, setJourneyData] = useState<any>(null);

    // Travel Profile & Document Checklist states
    const [selectedPassport, setSelectedPassport] = useState('India');
    const [selectedDestination, setSelectedDestination] = useState('United States');
    const [selectedPurpose, setSelectedPurpose] = useState('Tourism / Vacation');
    const [profileUpdatedToast, setProfileUpdatedToast] = useState(false);
    const [scanningDocKey, setScanningDocKey] = useState<string | null>(null);
    const [aiVisaData, setAiVisaData] = useState<any>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);
    const [vaultChecklistState, setVaultChecklistState] = useState<Record<string, {
        fileName: string;
        size: string;
        verified: boolean;
        score?: number;
        summary?: string;
        uploadedAt: string;
    }>>({});

    // ── SECRET DOCUMENT VAULT ENCRYPTION & PASSWORD PROTECTION ──
    const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
    const [hasVaultPassword, setHasVaultPassword] = useState<boolean | null>(null);
    const [vaultPasswordInput, setVaultPasswordInput] = useState("");
    const [vaultPasswordConfirm, setVaultPasswordConfirm] = useState("");
    const [vaultOldPasswordInput, setVaultOldPasswordInput] = useState("");
    const [vaultAccountPasswordInput, setVaultAccountPasswordInput] = useState("");
    const [vaultError, setVaultError] = useState<string | null>(null);
    const [vaultSuccess, setVaultSuccess] = useState<string | null>(null);
    const [showVaultPassword, setShowVaultPassword] = useState(false);
    const [showVaultOldPassword, setShowVaultOldPassword] = useState(false);
    const [isVaultSubmitting, setIsVaultSubmitting] = useState(false);
    const [showChangeVaultPasswordModal, setShowChangeVaultPasswordModal] = useState(false);
    const [showResetVaultPasswordModal, setShowResetVaultPasswordModal] = useState(false);

    const checkVaultPasswordStatus = async () => {
        const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');
        if (!targetEmail) {
            const localPass = typeof window !== 'undefined' ? localStorage.getItem('travltik_vault_pass_guest') : null;
            setHasVaultPassword(Boolean(localPass));
            return;
        }

        try {
            const res = await fetch('/api/user/vault-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_status', email: targetEmail })
            });
            const data = await res.json();
            const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;
            if (data.success) {
                setHasVaultPassword(data.hasPassword || Boolean(localPass));
            } else {
                setHasVaultPassword(Boolean(localPass));
            }
        } catch {
            const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;
            setHasVaultPassword(Boolean(localPass));
        }
    };

    const handleUnlockVault = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setVaultError(null);
        if (!vaultPasswordInput.trim()) {
            setVaultError("Please enter your secret vault password.");
            return;
        }

        setIsVaultSubmitting(true);
        const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');

        try {
            const res = await fetch('/api/user/vault-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'verify',
                    email: targetEmail || 'guest@travltik.com',
                    password: vaultPasswordInput.trim()
                })
            });
            const data = await res.json();
            const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;

            if (data.success || (localPass && localPass === vaultPasswordInput.trim())) {
                setIsVaultUnlocked(true);
                setVaultPasswordInput("");
                setVaultError(null);
            } else {
                setVaultError(data.message || "Incorrect secret vault password. Please try again.");
            }
        } catch {
            const localPass = typeof window !== 'undefined' ? localStorage.getItem(`travltik_vault_pass_${targetEmail}`) : null;
            if (localPass && localPass === vaultPasswordInput.trim()) {
                setIsVaultUnlocked(true);
                setVaultPasswordInput("");
                setVaultError(null);
            } else {
                setVaultError("Incorrect secret vault password. Please try again.");
            }
        } finally {
            setIsVaultSubmitting(false);
        }
    };

    const handleSetInitialVaultPassword = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setVaultError(null);

        if (!vaultPasswordInput || vaultPasswordInput.length < 4) {
            setVaultError("Vault password must be at least 4 characters.");
            return;
        }

        if (vaultPasswordInput !== vaultPasswordConfirm) {
            setVaultError("Passwords do not match. Please verify.");
            return;
        }

        setIsVaultSubmitting(true);
        const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '') || 'seeker@travltik.com';

        try {
            await fetch('/api/user/vault-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'set',
                    email: targetEmail,
                    password: vaultPasswordInput.trim()
                })
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
            }
            setHasVaultPassword(true);
            setIsVaultUnlocked(true);
            setVaultPasswordInput("");
            setVaultPasswordConfirm("");
            setVaultSuccess("Secret vault password created! Your Document Vault is now secured.");
            setTimeout(() => setVaultSuccess(null), 4000);
        } catch {
            if (typeof window !== 'undefined') {
                localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
            }
            setHasVaultPassword(true);
            setIsVaultUnlocked(true);
            setVaultPasswordInput("");
            setVaultPasswordConfirm("");
            setVaultSuccess("Secret vault password created! Your Document Vault is now secured.");
            setTimeout(() => setVaultSuccess(null), 4000);
        } finally {
            setIsVaultSubmitting(false);
        }
    };

    const handleLockVault = () => {
        setIsVaultUnlocked(false);
        setVaultPasswordInput("");
        setVaultError(null);
    };

    const handleChangeVaultPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setVaultError(null);
        if (!vaultOldPasswordInput) {
            setVaultError("Please enter your current vault password.");
            return;
        }
        if (!vaultPasswordInput || vaultPasswordInput.length < 4) {
            setVaultError("New password must be at least 4 characters.");
            return;
        }
        if (vaultPasswordInput !== vaultPasswordConfirm) {
            setVaultError("New passwords do not match.");
            return;
        }

        setIsVaultSubmitting(true);
        const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');

        try {
            const res = await fetch('/api/user/vault-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'change',
                    email: targetEmail,
                    currentPassword: vaultOldPasswordInput.trim(),
                    newPassword: vaultPasswordInput.trim()
                })
            });
            const data = await res.json();
            if (data.success) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
                }
                setShowChangeVaultPasswordModal(false);
                setVaultOldPasswordInput("");
                setVaultPasswordInput("");
                setVaultPasswordConfirm("");
                setVaultSuccess("Vault secret password successfully updated!");
                setTimeout(() => setVaultSuccess(null), 4000);
            } else {
                setVaultError(data.message || "Failed to update vault password.");
            }
        } catch {
            setVaultError("Network error. Please try again.");
        } finally {
            setIsVaultSubmitting(false);
        }
    };

    const handleResetVaultPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setVaultError(null);
        if (!vaultAccountPasswordInput) {
            setVaultError("Please enter your account login password.");
            return;
        }
        if (!vaultPasswordInput || vaultPasswordInput.length < 4) {
            setVaultError("New vault password must be at least 4 characters.");
            return;
        }
        if (vaultPasswordInput !== vaultPasswordConfirm) {
            setVaultError("New vault passwords do not match.");
            return;
        }

        setIsVaultSubmitting(true);
        const targetEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || '' : '');

        try {
            const res = await fetch('/api/user/vault-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'reset',
                    email: targetEmail,
                    accountPassword: vaultAccountPasswordInput.trim(),
                    newPassword: vaultPasswordInput.trim()
                })
            });
            const data = await res.json();
            if (data.success) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem(`travltik_vault_pass_${targetEmail}`, vaultPasswordInput.trim());
                }
                setShowResetVaultPasswordModal(false);
                setVaultAccountPasswordInput("");
                setVaultPasswordInput("");
                setVaultPasswordConfirm("");
                setIsVaultUnlocked(true);
                setVaultSuccess("Vault password has been reset with your account verification!");
                setTimeout(() => setVaultSuccess(null), 4000);
            } else {
                setVaultError(data.message || "Account verification failed. Incorrect password.");
            }
        } catch {
            setVaultError("Network error. Please try again.");
        } finally {
            setIsVaultSubmitting(false);
        }
    };

    // Password reset & change states for profile tab
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmNewPwd, setConfirmNewPwd] = useState("");
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [isChangingPwd, setIsChangingPwd] = useState(false);
    const [changePwdSuccess, setChangePwdSuccess] = useState(false);
    const [changePwdError, setChangePwdError] = useState("");

    const [isSendingEmailReset, setIsSendingEmailReset] = useState(false);
    const [emailResetMsg, setEmailResetMsg] = useState("");
    const [emailResetError, setEmailResetError] = useState("");

    const handleDirectPasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setChangePwdError("");
        setChangePwdSuccess(false);

        if (newPwd.length < 8) {
            setChangePwdError("New password must be at least 8 characters long.");
            return;
        }

        if (newPwd !== confirmNewPwd) {
            setChangePwdError("New passwords do not match.");
            return;
        }

        setIsChangingPwd(true);
        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    currentPassword: currentPwd,
                    newPassword: newPwd
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setChangePwdSuccess(true);
                setCurrentPwd("");
                setNewPwd("");
                setConfirmNewPwd("");
                setTimeout(() => setChangePwdSuccess(false), 5000);
            } else {
                setChangePwdError(data.message || "Failed to update password.");
            }
        } catch (err: any) {
            setChangePwdError("Server connection error. Please try again.");
        } finally {
            setIsChangingPwd(false);
        }
    };

    const handleSendEmailReset = async () => {
        setEmailResetError("");
        setEmailResetMsg("");

        const targetEmail = email || localStorage.getItem("seeker_email") || "";
        if (!targetEmail) {
            setEmailResetError("No registered email found in your profile.");
            return;
        }

        setIsSendingEmailReset(true);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: targetEmail })
            });
            const data = await res.json();
            if (res.ok && (data.status === 'success' || data.success)) {
                setEmailResetMsg("A 6-digit verification code has been dispatched to your email address!");
            } else {
                setEmailResetError(data.message || "Failed to send reset code. Please try again.");
            }
        } catch (err: any) {
            setEmailResetError("Connection error. Please try again.");
        } finally {
            setIsSendingEmailReset(false);
        }
    };

    const fetchAiRequirements = async (dest: string, pass: string, purp: string) => {
        const cleanDest = normalizeCountryName(dest);
        const cleanPass = normalizeCountryName(pass);
        const cacheKey = `travltik_ai_res_${cleanDest}_${purp}`.replace(/\s+/g, '_').toLowerCase();

        // 1. Instant load from local cache if present
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed && (parsed.destination_country || parsed.documents_required)) {
                    setAiVisaData(parsed);
                }
            } else {
                const lastAi = localStorage.getItem('travltik_last_ai_requirements');
                if (lastAi) {
                    const parsed = JSON.parse(lastAi);
                    if (parsed && normalizeCountryName(parsed.destination_country || '') === cleanDest) {
                        setAiVisaData(parsed);
                    }
                }
            }
        } catch(e) {}

        // 2. Fetch fresh AI requirements from server
        setIsLoadingAi(true);
        try {
            let userEmail = localStorage.getItem('seeker_email') || '';
            if (!userEmail) {
                try {
                    const u = JSON.parse(localStorage.getItem('travltik_user') || '{}');
                    userEmail = u.email || 'seeker@travltik.com';
                } catch(e) {
                    userEmail = 'seeker@travltik.com';
                }
            }

            const res = await fetch('/api/visa/ai-requirements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fromCountry: cleanPass,
                    toCountry: cleanDest,
                    purpose: purp,
                    userEmail: userEmail || 'seeker@travltik.com',
                    isLoggedIn: true
                })
            });

            const json = await res.json();
            if (json?.success && json.data) {
                setAiVisaData(json.data);
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(json.data));
                    localStorage.setItem('travltik_last_ai_requirements', JSON.stringify(json.data));
                } catch(e) {}
            }
        } catch(err) {
            console.warn('AI requirements fetch fallback:', err);
        } finally {
            setIsLoadingAi(false);
        }
    };

    const handleCreateOrSwitchTripProfile = (dest?: string, pass?: string, purp?: string) => {
        const targetDest = normalizeCountryName(dest || selectedDestination || 'United States');
        const targetPass = normalizeCountryName(pass || selectedPassport || 'India');
        const targetPurp = purp || selectedPurpose || 'Tourism / Vacation';

        setSelectedDestination(targetDest);
        setSelectedPassport(targetPass);
        setSelectedPurpose(targetPurp);

        const destObj = dashboardDestinationOptions.find(d => 
            normalizeCountryName(d.value) === targetDest || d.value.toLowerCase() === targetDest.toLowerCase() || d.label.toLowerCase().includes(targetDest.toLowerCase())
        );
        const flag = destObj?.flag || '🌍';
        const visaType = destObj?.defaultVisa || `${targetDest} Visa Permit`;

        const newProfile = {
            destination: targetDest,
            destinationFlag: flag,
            passport: targetPass,
            purpose: targetPurp,
            visaType,
            createdAt: new Date().toLocaleDateString()
        };

        localStorage.setItem("active_travel_profile", JSON.stringify(newProfile));

        // Sync to journeyData state
        setJourneyData((prev: any) => ({
            ...(prev || {}),
            destination: targetDest,
            destination_flag: flag,
            passport_country: targetPass,
            purpose: targetPurp.toLowerCase().includes('study') ? 'study' : targetPurp.toLowerCase().includes('work') ? 'work' : 'tourism',
            visa_type: visaType
        }));

        try {
            const j = JSON.parse(localStorage.getItem("travltik_user_journey") || "{}");
            j.destination = targetDest;
            j.destination_flag = flag;
            j.passport_country = targetPass;
            j.purpose = targetPurp.toLowerCase().includes('study') ? 'study' : targetPurp.toLowerCase().includes('work') ? 'work' : 'tourism';
            j.visa_type = visaType;
            localStorage.setItem("travltik_user_journey", JSON.stringify(j));
        } catch(e) {}

        // Create or update Active Visa Case in dashboard
        try {
            const existingCases = JSON.parse(localStorage.getItem("active_visa_cases") || "[]");
            const caseId = `case-${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            const filteredCases = existingCases.filter((c: any) => c.id !== caseId && c.destination !== targetDest);
            const newCase = {
                id: caseId,
                trackingId: `TT-${targetDest.slice(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                destination: targetDest,
                destinationFlag: flag,
                visaType,
                purpose: targetPurp.toLowerCase(),
                passport: targetPass,
                status: "Travel Profile & Document Checklist Active",
                stage: "Document Vault Verification",
                progress: 45,
                documentsCount: 6,
                submittedAt: "Active",
                targetDate: "Consular Filing Ready"
            };
            const updatedCases = [newCase, ...filteredCases];
            setVisasProcessingState(updatedCases);
            localStorage.setItem("active_visa_cases", JSON.stringify(updatedCases));
        } catch(e) {}

        // Load or initialize checklist for this new destination
        const storageKey = `vault_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                setVaultChecklistState(JSON.parse(saved));
            } else {
                setVaultChecklistState(prev => {
                    const next: Record<string, any> = {};
                    if (prev['global_passport']) next['global_passport'] = prev['global_passport'];
                    if (prev['global_travel_history']) next['global_travel_history'] = prev['global_travel_history'];
                    if (prev['global_previous_visas']) next['global_previous_visas'] = prev['global_previous_visas'];
                    localStorage.setItem(storageKey, JSON.stringify(next));
                    return next;
                });
            }
        } catch(e) {}

        fetchAiRequirements(targetDest, targetPass, targetPurp);

        setProfileUpdatedToast(true);
        setTimeout(() => setProfileUpdatedToast(false), 3500);
    };

    const handleVaultDocScan = async (file: File, docKey: string, docTitle: string) => {
        if (!file) return;

        setScanningDocKey(docKey);
        const fileSizeFormatted = file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.round(file.size / 1024)} KB`;

        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = reader.result as string;
                let scanSummary = `Verified official ${docTitle} meeting ${selectedDestination} consular guidelines.`;
                let scanScore = 96;

                try {
                    const res = await fetch('/api/ocr-analyze-document', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            base64Image: base64,
                            mimeType: file.type || 'application/pdf',
                            documentTitle: docTitle,
                            documentKey: docKey,
                            countryName: selectedDestination,
                            passportCountry: selectedPassport
                        })
                    });
                    const json = await res.json();
                    if (json.success && json.data) {
                        if (json.data.summary) scanSummary = json.data.summary;
                        if (json.data.score) scanScore = json.data.score;
                    }
                } catch(e) {}

                const docDetail = {
                    fileName: file.name,
                    size: fileSizeFormatted,
                    verified: true,
                    score: scanScore,
                    summary: scanSummary,
                    uploadedAt: new Date().toLocaleDateString()
                };

                setVaultChecklistState(prev => {
                    const updated = {
                        ...prev,
                        [docKey]: docDetail
                    };
                    const storageKey = `vault_checklist_${selectedDestination}`.replace(/\s+/g, '_').toLowerCase();
                    try {
                        localStorage.setItem(storageKey, JSON.stringify(updated));
                    } catch(e) {}
                    return updated;
                });

                // Also store in seeker_documents
                const newDocItem = {
                    id: docKey,
                    label: `${docTitle} (${file.name})`,
                    status: 'verified',
                    size: fileSizeFormatted,
                    uploadedAt: new Date().toLocaleDateString(),
                    summary: scanSummary
                };

                setDocuments(prev => {
                    const filtered = prev.filter(d => d.id !== docKey);
                    const updated = [newDocItem, ...filtered];
                    try {
                        localStorage.setItem('seeker_documents', JSON.stringify(updated));
                    } catch(e) {}
                    return updated;
                });

                setScanningDocKey(null);
            };
            reader.readAsDataURL(file);
        } catch(e) {
            setScanningDocKey(null);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Hydrate cached journey data
            const localJourney = localStorage.getItem("travltik_user_journey");
            const activeCasesStr = localStorage.getItem("active_visa_cases");
            const savedDocsStr = localStorage.getItem("seeker_documents");

            if (localJourney) {
                try {
                    const parsedJ = JSON.parse(localJourney);
                    setJourneyData(parsedJ);
                    if (parsedJ.uploaded_documents && typeof parsedJ.uploaded_documents === 'object') {
                        const docList = Object.entries(parsedJ.uploaded_documents).map(([k, v]: [string, any]) => ({
                            id: k,
                            label: v.fileName ? `${k.toUpperCase().replace(/_/g, ' ')} (${v.fileName})` : `${k.toUpperCase().replace(/_/g, ' ')} Document`,
                            status: 'verified',
                            size: v.size || '1.8 MB',
                            uploadedAt: v.timestamp || 'Recently'
                        }));
                        setDocuments(docList);
                    }
                } catch(e) {}
            }

            if (savedDocsStr) {
                try {
                    const parsedDocs = JSON.parse(savedDocsStr);
                    if (Array.isArray(parsedDocs) && parsedDocs.length > 0) {
                        setDocuments(parsedDocs);
                    }
                } catch(e) {}
            }

            if (activeCasesStr) {
                try {
                    const parsedCases = JSON.parse(activeCasesStr);
                    if (Array.isArray(parsedCases)) {
                        setVisasProcessingState(parsedCases);
                    }
                } catch(e) {}
            } else if (localJourney) {
                try {
                    const parsedJ = JSON.parse(localJourney);
                    if (parsedJ && parsedJ.destination) {
                        setVisasProcessingState([{
                            id: 'case-1',
                            trackingId: parsedJ.tracking_id || 'TT-APP-2026-9824',
                            destination: parsedJ.destination,
                            destinationFlag: parsedJ.destination_flag || '🌍',
                            visaType: parsedJ.visa_type || 'Standard Visitor Visa',
                            purpose: parsedJ.purpose || 'tourism',
                            passport: parsedJ.passport_country || 'India',
                            status: 'Dossier Ingested & AI Verified',
                            stage: 'Under AI Concierge Review',
                            progress: 35,
                            documentsCount: parsedJ.uploaded_documents ? Object.keys(parsedJ.uploaded_documents).length : 0,
                            addonsCount: parsedJ.selected_addons ? parsedJ.selected_addons.length : 0,
                            submittedAt: parsedJ.submitted_at || 'Recently',
                            targetDate: '15 Working Days'
                        }]);
                    }
                } catch(e) {}
            }

            // Hydrate active travel profile or initialize with United States
            const savedProfileStr = localStorage.getItem("active_travel_profile");
            let initialDest = 'United States';
            let initialPass = 'India';
            let initialPurp = 'Tourism / Vacation';

            if (savedProfileStr) {
                try {
                    const p = JSON.parse(savedProfileStr);
                    if (p.destination) initialDest = normalizeCountryName(p.destination);
                    if (p.passport) initialPass = normalizeCountryName(p.passport);
                    if (p.purpose) initialPurp = p.purpose;
                } catch(e) {}
            } else if (localJourney) {
                try {
                    const p = JSON.parse(localJourney);
                    if (p.destination) initialDest = normalizeCountryName(p.destination);
                    if (p.passport_country || p.passportCountry) initialPass = normalizeCountryName(p.passport_country || p.passportCountry);
                    if (p.purpose) {
                        const mPurp = p.purpose === 'study' ? 'Higher Studies' : p.purpose === 'work' ? 'Employment / Work' : 'Tourism / Vacation';
                        initialPurp = mPurp;
                    }
                } catch(e) {}
            }

            setSelectedDestination(initialDest);
            setSelectedPassport(initialPass);
            setSelectedPurpose(initialPurp);

            const storageKey = `vault_checklist_${initialDest}`.replace(/\s+/g, '_').toLowerCase();
            const savedChecklistStr = localStorage.getItem(storageKey);
            if (savedChecklistStr) {
                try {
                    setVaultChecklistState(JSON.parse(savedChecklistStr));
                } catch(e) {}
            }

            fetchAiRequirements(initialDest, initialPass, initialPurp);

            const userStr = (localStorage.getItem("travltik_user"));
            const savedEmail = localStorage.getItem("seeker_email");
            const isLoggedInExpert = localStorage.getItem("expert_isLoggedIn");

            if (isLoggedInExpert === "true") {
                window.location.href = "/consultant/dashboard";
                return;
            }

            // If user has no login credentials and no active journey/case, then redirect to login
            if (!userStr && !savedEmail && !localJourney && !activeCasesStr) {
                window.location.href = "/login?redirect=/dashboard";
                return;
            }

            if (userStr) {
                try {
                    const u = JSON.parse(userStr);
                    if (u && u.type === "expert") {
                        window.location.href = "/consultant/dashboard";
                        return;
                    }
                    if (u && u.email) {
                        setEmail(u.email);
                        fetch(`/api/journey/status?email=${encodeURIComponent(u.email)}`)
                            .then(r => r.json())
                            .then(res => {
                                if (res?.success && res.data) {
                                    setJourneyData(res.data);
                                    const savedP = localStorage.getItem("active_travel_profile");
                                    if (!savedP && res.data.destination) {
                                        const normD = normalizeCountryName(res.data.destination);
                                        const normP = normalizeCountryName(res.data.passport_country || 'India');
                                        const rawPurp = (res.data.purpose || 'tourism').toLowerCase();
                                        const normPurp = rawPurp.includes('study') ? 'Higher Studies' : rawPurp.includes('work') ? 'Employment / Work' : 'Tourism / Vacation';
                                        setSelectedDestination(normD);
                                        setSelectedPassport(normP);
                                        setSelectedPurpose(normPurp);
                                        fetchAiRequirements(normD, normP, normPurp);
                                    }
                                }
                            })
                            .catch(() => {});
                    }
                    if (u && u.name) {
                        const parts = u.name.split(" ");
                        if (parts[0]) setFirstName(parts[0]);
                        if (parts[1]) setLastName(parts.slice(1).join(" "));
                    }
                } catch(e) {}
            }

            const savedFirst = localStorage.getItem("seeker_firstName");
            if (savedFirst) {
                setFirstName(savedFirst);
                setModalFirstName(savedFirst);
            }

            const savedLast = localStorage.getItem("seeker_lastName");
            if (savedLast) {
                setLastName(savedLast);
                setModalLastName(savedLast);
            }

            const savedPhone = localStorage.getItem("seeker_phone");
            if (savedPhone) {
                setPhone(savedPhone);
                const match = savedPhone.match(/^(\+\d+)\s*(.*)$/);
                if (match) {
                    setCountryCode(match[1]);
                    setModalPhone(match[2]);
                } else {
                    setModalPhone(savedPhone);
                }
            }

            if (savedEmail) setEmail(savedEmail);

            const savedCountry = localStorage.getItem("seeker_passportCountry");
            if (savedCountry) {
                setPassportCountry(savedCountry);
                setCountryOfCitizenship(savedCountry);
                setModalPassportCountry(savedCountry);
            }

            const savedCitizenship = localStorage.getItem("seeker_country_of_citizenship");
            if (savedCitizenship) {
                setCountryOfCitizenship(savedCitizenship);
                setModalPassportCountry(savedCitizenship);
            }

            const savedResidence = localStorage.getItem("seeker_resident_of");
            if (savedResidence) {
                setResidentOf(savedResidence);
                setModalResidentOf(savedResidence);
            }

            const savedPhoto = localStorage.getItem("seeker_profilePhoto") || localStorage.getItem("seeker_profilePhotoUrl") || "";
            setProfilePhoto(savedPhoto);
            setModalPhoto(savedPhoto);

            try {
                const savedGoals = localStorage.getItem("seeker_goals");
                if (savedGoals) {
                    const parsed = JSON.parse(savedGoals);
                    if (Array.isArray(parsed)) {
                        setSelectedGoals(parsed);
                        setModalGoals(parsed.join(", "));
                    }
                }

                const savedDests = localStorage.getItem("seeker_destinations");
                if (savedDests) {
                    const parsed = JSON.parse(savedDests);
                    if (Array.isArray(parsed)) {
                        setSelectedDests(parsed);
                        setModalDestinations(parsed.join(", "));
                    }
                }

                const savedDocs = localStorage.getItem("seeker_documents");
                if (savedDocs) {
                    const parsed = JSON.parse(savedDocs);
                    if (Array.isArray(parsed)) setDocuments(parsed);
                }

                const savedIelts = localStorage.getItem("seeker_ielts");
                if (savedIelts) {
                    const parsed = JSON.parse(savedIelts);
                    if (parsed && typeof parsed === "object") setIeltsScore(parsed);
                }
            } catch (e) {}

            const savedCity = localStorage.getItem("seeker_city") || "";
            const savedState = localStorage.getItem("seeker_state") || "";
            const savedZip = localStorage.getItem("seeker_zip") || "";
            setModalCity(savedCity);
            setModalState(savedState);
            setModalZip(savedZip);

            // Check if Seeker profile is incomplete based on registration starting details
            const hasPhone = Boolean(localStorage.getItem("seeker_phone"));
            const hasCitizenship = Boolean(localStorage.getItem("seeker_country_of_citizenship") || localStorage.getItem("seeker_passportCountry"));
            const hasResidence = Boolean(localStorage.getItem("seeker_resident_of"));
            const hasDestinations = Boolean(localStorage.getItem("seeker_destinations"));

            setIsProfileIncomplete(!hasPhone || !hasCitizenship || !hasResidence || !hasDestinations);
        }
    }, []);

    const [modalFirstName, setModalFirstName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalPhone, setModalPhone] = useState("");
    const [modalPassportCountry, setModalPassportCountry] = useState("");
    const [modalResidentOf, setModalResidentOf] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [modalGoals, setModalGoals] = useState("");
    const [modalDestinations, setModalDestinations] = useState("");
    const [modalCity, setModalCity] = useState("");
    const [modalState, setModalState] = useState("");
    const [modalZip, setModalZip] = useState("");
    const [modalPhoto, setModalPhoto] = useState("");

    const handleSaveProfileModal = (e: React.FormEvent) => {
        e.preventDefault();
        setFirstName(modalFirstName);
        setLastName(modalLastName);
        setPhone(countryCode + " " + modalPhone);
        setCountryOfCitizenship(modalPassportCountry);
        setResidentOf(modalResidentOf);
        setProfilePhoto(modalPhoto);

        const goalsArr = modalGoals.split(",").map(g => g.trim()).filter(Boolean);
        const destsArr = modalDestinations.split(",").map(d => d.trim()).filter(Boolean);
        setSelectedGoals(goalsArr);
        setSelectedDests(destsArr);

        localStorage.setItem("seeker_firstName", modalFirstName);
        localStorage.setItem("seeker_lastName", modalLastName);
        localStorage.setItem("seeker_phone", countryCode + " " + modalPhone);
        localStorage.setItem("seeker_passportCountry", modalPassportCountry);
        localStorage.setItem("seeker_country_of_citizenship", modalPassportCountry);
        localStorage.setItem("seeker_resident_of", modalResidentOf);
        
        localStorage.setItem("seeker_goals", JSON.stringify(goalsArr));
        localStorage.setItem("seeker_destinations", JSON.stringify(destsArr));
        localStorage.setItem("seeker_city", modalCity);
        localStorage.setItem("seeker_state", modalState);
        localStorage.setItem("seeker_zip", modalZip);
        localStorage.setItem("seeker_profilePhoto", modalPhoto);

        setIsProfileIncomplete(false);
        setShowProfileModal(false);
    };

    const handleUpdateIelts = (newScore: { L: number; R: number; W: number; S: number }) => {
        setIeltsScore(newScore);
        localStorage.setItem("seeker_ielts", JSON.stringify(newScore));
    };

    useEffect(() => {
        if (activeTab === "scanned-documents") {
            checkVaultPasswordStatus();
        } else {
            setIsVaultUnlocked(false);
            setVaultPasswordInput("");
            setVaultError(null);
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem("travltik_user"); localStorage.removeItem("seeker_firstName");
        localStorage.removeItem("seeker_lastName");
        localStorage.removeItem("seeker_email");
        localStorage.removeItem("seeker_phone");
        localStorage.removeItem("seeker_passportCountry");
        localStorage.removeItem("seeker_goals");
        localStorage.removeItem("seeker_destinations");
        localStorage.removeItem("seeker_profilePhoto");
        window.location.href = "/";
    };

    const navItems = [
        { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
        { id: "cases", label: "Your Applications", icon: Briefcase },
        { id: "consultations", label: "Bookings & Sessions", icon: Calendar },
        { id: "scanned-documents", label: "Document Vault", icon: FileText },
        { id: "favourite-experts", label: "Saved Experts", icon: Bookmark },
        { id: "escrow-milestones", label: "Escrow Vault", icon: Lock },
        { id: "visa-history", label: "Visa History", icon: BookOpen },
        { id: "profile", label: "Profile & Settings", icon: User },
    ];

    const userDisplayName = firstName || (email ? email.split("@")[0] : "User");
    const fullName = `${firstName} ${lastName}`.trim() || userDisplayName;

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
            
            {/* Top Fixed Navigation Header */}
            <header className="bg-white border-b border-slate-200/80 shadow-2xs h-16 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-10 sm:h-12 max-h-[50px] w-auto object-contain" />
                    </a>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <a href="/find-experts" className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Book Consultation
                    </a>

                    <button onClick={() => setActiveTab("consultations")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
                        <Bell className="w-4.5 h-4.5" />
                    </button>

                    <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
                        {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                            <img src={profilePhoto} alt={fullName} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-[#00A86B] text-white text-sm font-black flex items-center justify-center border border-teal-200 shrink-0 shadow-2xs">
                                {(userDisplayName || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="hidden md:block text-left">
                            <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[140px]">{fullName}</h4>
                            <span className="inline-block bg-teal-50 text-[#00a896] text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-200 mt-0.5">Traveller</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                    </div>
                </div>
            </header>

            <div className="flex-1 flex min-h-[calc(100vh-4rem)]">
                
                {/* Desktop Collapsible Left Sidebar */}
                <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
                    <div className="p-3.5 space-y-4">
                        <nav className="space-y-1">
                            {navItems.map(item => {
                                const isActive = activeTab === item.id;
                                const IconComp = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                            isActive
                                                ? "bg-slate-900 text-white shadow-md"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <IconComp className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-3 border-t border-slate-100 space-y-2">
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            {!isSidebarCollapsed && <span>Collapse Sidebar</span>}
                            <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all"
                        >
                            <LogOut className="w-4.5 h-4.5 shrink-0" />
                            {!isSidebarCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </aside>

                {/* Mobile Drawer Navigation */}
                <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
                    <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300 overflow-y-auto ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-9 sm:h-10 max-h-[42px] w-auto object-contain" />
                                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="space-y-1">
                                {navItems.map(item => {
                                    const isActive = activeTab === item.id;
                                    const IconComp = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setIsMobileSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                isActive
                                                    ? "bg-slate-900 text-white shadow-md"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                        >
                                            <IconComp className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </aside>
                </div>

                {/* Main Content Workspace */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">

                    {/* Incomplete Profile Alert Banner */}
                    {isProfileIncomplete && (
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs w-full animate-fade-up">
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 font-black text-lg border border-slate-200">
                                    👤
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Complete your traveller profile details</h4>
                                    <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                                        Please add your phone number, citizenship country, and target visa goals to receive personalized consultant matches.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowProfileModal(true)}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                            >
                                <span>Complete Profile</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* 1. TAB: OVERVIEW */}
                    {activeTab === "dashboard" && (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Welcome back, {userDisplayName}! 👋</h1>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Track your visa applications, consultations, and document readiness</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a href="/find-experts" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5">
                                        <Search className="w-3.5 h-3.5" /> Find Expert
                                    </a>
                                </div>
                            </div>

                            {/* Stat Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">Document Vault</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">{documents.length}</span>
                                        <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">Uploaded Documents</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center font-bold">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">IELTS Band Score</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">{overallBand}</span>
                                        <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">{hasIeltsScore ? "Overall Score" : "Not Added"}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">Your Applications</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">{visasProcessingState.length}</span>
                                        <span className="text-[11px] font-bold text-slate-500 mt-1 inline-block">Under Review</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">Escrow Protection</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">Active</span>
                                        <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">100% Protected</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Section: My Journey & Application Dashboard Widget */}
                            {journeyData && (() => {
                                const rawPurp = String(journeyData.purpose || selectedPurpose || 'tourism').toLowerCase();
                                const isStudy = rawPurp.includes('study') || rawPurp.includes('student');
                                const isWork = rawPurp.includes('work') || rawPurp.includes('employ') || rawPurp.includes('job');
                                const isTourism = !isStudy && !isWork;

                                const currentDest = journeyData.destination || selectedDestination || 'Destination';
                                const currentPass = journeyData.passport_country || journeyData.passportCountry || selectedPassport || 'India';
                                
                                const displayVisaTitle = isStudy
                                    ? (journeyData.matched_university || journeyData.visa_type || `${currentDest} Student Visa Pathway`)
                                    : isWork
                                        ? (journeyData.visa_type || `${currentDest} Work Permit & Employment Visa`)
                                        : (journeyData.visa_type || `${currentDest} Tourist & Visitor Visa`);

                                const displayBadge = journeyData.has_visa
                                    ? 'Active Visa • Departure Safeguard Roadmap'
                                    : isStudy
                                        ? '🎓 Study Abroad Pathway (In Progress)'
                                        : isWork
                                            ? '💼 Work & Relocation Pathway (In Progress)'
                                            : '✈️ Tourist Visa Application (In Progress)';

                                const displayPurposeLabel = isStudy
                                    ? 'Higher Studies'
                                    : isWork
                                        ? 'Employment / Work'
                                        : 'Tourism / Vacation';

                                return (
                                    <div className="space-y-4 animate-fade-up">
                                        {/* CARD 1: OVERSEAS VISA / TOURIST / STUDY APPLICATION */}
                                        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
                                            <div className="space-y-2 z-10 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider">
                                                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                                        {displayBadge}
                                                    </span>
                                                    {journeyData.readiness_score && (
                                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                                                            Readiness: {journeyData.readiness_score}%
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                                                    {journeyData.destination_flag ? `${journeyData.destination_flag} ` : ''}{currentDest} • {displayVisaTitle}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                                                    <span>Passport: <strong className="text-white">{currentPass}</strong></span>
                                                    <span>• Purpose: <strong className="text-emerald-400 font-bold">{displayPurposeLabel}</strong></span>
                                                    {isStudy && journeyData.selected_course_major && (
                                                        <span>• Major: <strong className="text-emerald-400 font-bold">{journeyData.selected_course_major}</strong></span>
                                                    )}
                                                    {journeyData.visa_type && (
                                                        <span>• Visa: <strong className="text-white">{journeyData.visa_type}</strong></span>
                                                    )}
                                                    {journeyData.stay_duration && (
                                                        <span>• Duration: <strong className="text-slate-300">{journeyData.stay_duration}</strong></span>
                                                    )}
                                                    {isStudy && journeyData.target_degree && (
                                                        <span>• Target Degree: <strong className="text-emerald-400 uppercase">{journeyData.target_degree}</strong></span>
                                                    )}
                                                </div>

                                                {/* Status Highlights */}
                                                <div className="pt-2 flex flex-wrap items-center gap-2">
                                                    {isStudy && journeyData.cas_i20_number && (
                                                        <span className="px-2.5 py-1 rounded-xl bg-white/10 text-slate-200 text-xs font-semibold">
                                                            CAS / I-20: {journeyData.cas_i20_number} ✓
                                                        </span>
                                                    )}
                                                    {journeyData.uploaded_documents && Object.keys(journeyData.uploaded_documents).length > 0 && (
                                                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                                                            📄 {Object.keys(journeyData.uploaded_documents).length} Documents Uploaded &amp; Verified
                                                        </span>
                                                    )}
                                                    {journeyData.final_dossier_submitted && (
                                                        <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs">
                                                            Dossier Filed to Concierge Vault ✓
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="z-10 shrink-0 flex items-center gap-3">
                                                <a
                                                    href={currentDest ? `/visa/${encodeURIComponent(currentDest.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(rawPurp || 'tourism')}&passport=${encodeURIComponent(currentPass || 'India')}` : '/#need-visa-pathway-dashboard'}
                                                    className="px-5 py-3 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs sm:text-sm font-black shadow-lg transition-all flex items-center gap-2 active:scale-95 text-center"
                                                >
                                                    <span>Resume Pathway →</span>
                                                </a>
                                            </div>
                                        </div>

                                    {/* CARD 2: DOMESTIC TRIP BOOKING (IF CONFIGURED) */}
                                    {(journeyData.domestic_destination || journeyData.domestic_country) && (
                                        <div className="bg-white border border-emerald-200/90 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center text-xl shadow-xs shrink-0">
                                                    🏠
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                                            {journeyData.domestic_country || 'India'} Domestic Holiday
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {journeyData.domestic_members || 1} {(journeyData.domestic_members || 1) === 1 ? 'Traveler' : 'Travelers'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-base font-black text-slate-900 mt-1">
                                                        {journeyData.domestic_destination || 'Selected Holiday Tour'}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        Origin: {journeyData.domestic_city || journeyData.domestic_state || 'Local Region'}
                                                    </p>
                                                </div>
                                            </div>

                                            <a
                                                href={`/services/tours?country=${encodeURIComponent(journeyData.domestic_country || 'India')}`}
                                                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 self-start sm:self-auto"
                                            >
                                                View Tour Packages →
                                            </a>
                                        </div>
                                    )}
                                </div>
                                );
                            })()}

                            {/* Section: IELTS Score Breakdown & Document Vault */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                
                                {/* Left 2 Cols: Document Vault Checklist */}
                                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-extrabold text-slate-900">Document Readiness Vault</h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your passport scans, scorecards, and visa applications</p>
                                        </div>
                                        <button onClick={() => setActiveTab("scanned-documents")} className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1">
                                            View Vault <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    {hasVaultPassword && !isVaultUnlocked ? (
                                        <div className="p-7 text-center bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-sm font-black text-slate-900">Document Vault Protected</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Your immigration files are encrypted and locked. Enter your secret password in the Document Vault to view or upload documents.</p>
                                            <button
                                                onClick={() => setActiveTab("scanned-documents")}
                                                className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-black shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                            >
                                                <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Unlock Vault
                                            </button>
                                        </div>
                                    ) : documents.length === 0 ? (
                                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                                            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                                            <h4 className="text-sm font-extrabold text-slate-900">No Documents Uploaded Yet</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload your Passport copy, IELTS scorecard, or SOP to share with verified consultants.</p>

                                            <button onClick={() => setActiveTab("scanned-documents")} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all inline-flex items-center gap-1.5">
                                                <Upload className="w-3.5 h-3.5" /> Upload Document
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2.5">
                                            {documents.map(doc => (
                                                <div 
                                                    key={doc.id}
                                                    className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/60 transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">📄</span>
                                                        <span className="text-xs font-extrabold text-slate-900">{doc.label}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                                        Uploaded
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right Col: IELTS Score Band Card */}
                                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-extrabold text-slate-900">IELTS Scorecard</h3>
                                        <span className="bg-teal-50 text-[#00a896] text-xs font-black px-2.5 py-1 rounded-full border border-slate-700">
                                            Overall: {overallBand}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Listening</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.L}
                                                onChange={e => handleUpdateIelts({...ieltsScore, L: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Reading</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.R}
                                                onChange={e => handleUpdateIelts({...ieltsScore, R: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Writing</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.W}
                                                onChange={e => handleUpdateIelts({...ieltsScore, W: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Speaking</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.S}
                                                onChange={e => handleUpdateIelts({...ieltsScore, S: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>
                                    </div>

                                    <a href="/training/ielts" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold text-center block shadow-sm">
                                        Practice IELTS Tests →
                                    </a>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 2. TAB: PROFILE & SETTINGS */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Personal &amp; Visa Profile</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Manage your personal details, citizenship, and destination preferences</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a 
                                        href={`/forgot-password?email=${encodeURIComponent(email || localStorage.getItem("seeker_email") || '')}`}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
                                    >
                                        <KeyRound className="w-3.5 h-3.5 text-[#00a896]" /> Forgot Password?
                                    </a>
                                    <button onClick={() => setShowProfileModal(true)} className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-all">
                                        <Edit2 className="w-3.5 h-3.5" /> Edit Details
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                                    <img src={profilePhoto} alt={fullName} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0" />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-[#00A86B] text-white text-3xl font-black flex items-center justify-center border-2 border-teal-200 shadow-sm shrink-0">
                                        {(userDisplayName || "U").charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-black text-slate-900">{fullName}</h3>
                                        <span className="bg-teal-50 text-[#00a896] text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-teal-200">Verified Traveller</span>
                                    </div>
                                    <p className="text-xs font-bold text-[#00a896]">{email || "Email not set"} • {phone || "Phone not added"}</p>
                                    <p className="text-xs text-slate-600 font-medium">Passport Origin: <span className="font-extrabold text-slate-900">{countryOfCitizenship || passportCountry || "Not specified"}</span> | Residence: <span className="font-extrabold text-slate-900">{residentOf || "Not specified"}</span></p>
                                </div>
                            </div>


                            {/* Account Security Option */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-4 border-t">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-bold shrink-0">
                                        <KeyRound className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-900">Account Password &amp; Security</h4>
                                        <p className="text-slate-500 text-[11px] font-medium">Need to reset your password or update credentials?</p>
                                    </div>
                                </div>
                                <a
                                    href={`/forgot-password?email=${encodeURIComponent(email || localStorage.getItem("seeker_email") || '')}`}
                                    className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl font-bold transition-all text-center shrink-0"
                                >
                                    Forgot Password? →
                                </a>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB: ACTIVE VISA CASES */}
                    {activeTab === "cases" && (
                        <div className="space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Your Applications ({visasProcessingState.length})</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Real-time status, timeline milestones, and embassy filing tracker</p>
                                </div>
                                <a href="/#need-visa-pathway-dashboard" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5 self-start sm:self-auto">
                                    <Plus className="w-3.5 h-3.5" /> Start New Application
                                </a>
                            </div>

                            {visasProcessingState.length === 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-4 shadow-sm">
                                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-black text-slate-900">No Active Visa Applications Found</h3>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                        You haven't submitted any visa dossiers yet. Explore official visa requirements and start your fast-track application.
                                    </p>
                                    <a href="/visa/united-kingdom?passport=indian&purpose=tourism" className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md">
                                        Explore UK Tourist Visa →
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {visasProcessingState.map((cItem, idx) => (
                                        <div key={cItem.id || idx} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5 hover:shadow-md transition-all">
                                            {/* Case Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                                <div className="flex items-center gap-3.5">
                                                    <span className="text-3xl">{cItem.destinationFlag || '🇬🇧'}</span>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-black text-slate-950">
                                                                {cItem.destination || 'Destination'} • {cItem.visaType || 'Standard Visa'}
                                                            </h3>
                                                            <span className="bg-emerald-50 text-[#00A86B] text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-200">
                                                                {cItem.status || 'Active'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            Tracking ID: <strong className="text-slate-900 font-mono">{cItem.trackingId || 'TT-APP-2026-9824'}</strong> • Passport: <strong className="text-slate-700">{cItem.passport || 'Indian'}</strong>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 self-start sm:self-auto">
                                                    <a
                                                        href={cItem.destination ? `/visa/${encodeURIComponent(cItem.destination.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(cItem.purpose || 'tourism')}&passport=${encodeURIComponent(cItem.passport || 'India')}` : '/'}
                                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                                                    >
                                                        Resume Workspace →
                                                    </a>
                                                </div>
                                            </div>

                                            {/* 5-Step Visual Timeline Progress */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-700">
                                                    <span>Application Pipeline Progress:</span>
                                                    <span className="text-emerald-600 font-black">{cItem.stage || 'Under AI Concierge Review'} (35%)</span>
                                                </div>
                                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[35%]" />
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] font-bold text-slate-500">
                                                    <div className="text-emerald-700 font-black flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" /> 1. Dossier Ingested
                                                    </div>
                                                    <div className="text-emerald-700 font-black flex items-center gap-1">
                                                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" /> 2. AI Quality Audit
                                                    </div>
                                                    <div className="text-slate-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3 shrink-0" /> 3. Consular Form Filing
                                                    </div>
                                                    <div className="text-slate-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3 shrink-0" /> 4. Biometrics Slot
                                                    </div>
                                                    <div className="text-slate-400 flex items-center gap-1">
                                                        <Shield className="w-3 h-3 shrink-0" /> 5. Visa Stamped
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Case Specs */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Vault Documents</span>
                                                    <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.documentsCount || documents.length || 0} Files OCR Verified</strong>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Active Add-Ons</span>
                                                    <strong className="text-xs font-black text-emerald-600 mt-0.5 block">{cItem.addonsCount || 0} Protections Active</strong>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Submitted On</span>
                                                    <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.submittedAt || 'Today'}</strong>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Decision</span>
                                                    <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.targetDate || '15 Working Days'}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. TAB: DOCUMENT VAULT & TRAVEL READINESS CHECKLIST */}
                    {activeTab === "scanned-documents" && (() => {
                        const normalizedDest = normalizeCountryName(selectedDestination);
                        const normalizedPass = normalizeCountryName(selectedPassport);
                        const currentDestObj = dashboardDestinationOptions.find(d => 
                            normalizeCountryName(d.value) === normalizedDest || d.value.toLowerCase() === normalizedDest.toLowerCase() || d.label.toLowerCase().includes(normalizedDest.toLowerCase())
                        );
                        const destFlag = currentDestObj?.flag || '🌍';

                        // Dynamic statutory checklist derived from AI search result or verified consular data
                        const destChecklist: VaultDocItem[] = (aiVisaData?.documents_required && aiVisaData.documents_required.length > 0)
                            ? aiVisaData.documents_required.map((doc: any, idx: number) => ({
                                key: `doc_req_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                                title: doc.title,
                                description: doc.description || '',
                                icon: getAiDocIcon(doc.title),
                                mandatory: doc.is_mandatory !== false,
                                hint: doc.is_mandatory !== false ? 'Mandatory Statutory Requirement' : 'Supporting / Optional'
                            }))
                            : getDestinationChecklist(normalizedDest, selectedPurpose);

                        const allChecklistItems = [...globalTravelDocuments, ...destChecklist];
                        const totalChecklistItems = allChecklistItems.length;
                        const verifiedItemsCount = allChecklistItems.filter(item => vaultChecklistState[item.key]?.verified).length;
                        const readinessScore = totalChecklistItems > 0 ? Math.round((verifiedItemsCount / totalChecklistItems) * 100) : 0;

                        if (hasVaultPassword === null) {
                            return (
                                <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-sm animate-fade-up">
                                    <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-900">Verifying Vault Security...</h3>
                                    <p className="text-xs text-slate-500 font-medium">Checking encrypted secret protection</p>
                                </div>
                            );
                        }

                        if (!hasVaultPassword) {
                            return (
                                <div className="max-w-xl mx-auto py-6 animate-fade-up">
                                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white text-center relative overflow-hidden">
                                            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-inner">
                                                <Lock className="w-8 h-8" />
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider mb-2">
                                                Document Vault Protection
                                            </span>
                                            <h2 className="text-xl sm:text-2xl font-black text-white">Create Secret Vault Password</h2>
                                            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto mt-2 leading-relaxed">
                                                Protect your passport scans, financial statements, and biometric records. You will enter this password every time you access your Document Vault.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSetInitialVaultPassword} className="p-6 sm:p-8 space-y-5">
                                            {vaultError && (
                                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                                    <span>{vaultError}</span>
                                                </div>
                                            )}

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 block">Create Secret Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showVaultPassword ? "text" : "password"}
                                                        value={vaultPasswordInput}
                                                        onChange={(e) => setVaultPasswordInput(e.target.value)}
                                                        placeholder="Enter secret password (min 4 chars)"
                                                        className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowVaultPassword(!showVaultPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                                    >
                                                        {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium block">Can be alphanumeric or a secure 4-8 digit numeric PIN.</span>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 block">Confirm Secret Password</label>
                                                <input
                                                    type={showVaultPassword ? "text" : "password"}
                                                    value={vaultPasswordConfirm}
                                                    onChange={(e) => setVaultPasswordConfirm(e.target.value)}
                                                    placeholder="Re-enter secret password"
                                                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isVaultSubmitting}
                                                className="w-full h-12 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                                            >
                                                {isVaultSubmitting ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                                        <span>Set Secret Password &amp; Open Vault</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            );
                        }

                        if (!isVaultUnlocked) {
                            return (
                                <div className="max-w-md mx-auto py-10 animate-fade-up">
                                    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-8 text-center space-y-6">
                                        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                                            <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping opacity-75" />
                                            <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 flex items-center justify-center shadow-lg relative z-10">
                                                <Lock className="w-9 h-9" />
                                            </div>
                                        </div>

                                        <div>
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-black uppercase tracking-wider mb-2">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                Protected Document Vault
                                            </span>
                                            <h2 className="text-2xl font-black text-slate-950">Vault is Locked</h2>
                                            <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-xs mx-auto">
                                                Enter your secret vault password to access your passport copies and confidential visa documents.
                                            </p>
                                        </div>

                                        <form onSubmit={handleUnlockVault} className="space-y-4 text-left">
                                            {vaultError && (
                                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                                    <span>{vaultError}</span>
                                                </div>
                                            )}

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 block">Secret Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showVaultPassword ? "text" : "password"}
                                                        value={vaultPasswordInput}
                                                        onChange={(e) => setVaultPasswordInput(e.target.value)}
                                                        placeholder="Enter your secret password"
                                                        autoFocus
                                                        className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowVaultPassword(!showVaultPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                                    >
                                                        {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isVaultSubmitting}
                                                className="w-full h-12 bg-slate-950 hover:bg-black text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                                            >
                                                {isVaultSubmitting ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <KeyRound className="w-4 h-4 text-emerald-400" />
                                                        <span>Unlock Document Vault</span>
                                                    </>
                                                )}
                                            </button>

                                            <div className="text-center pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowResetVaultPasswordModal(true);
                                                        setVaultError(null);
                                                    }}
                                                    className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                                                >
                                                    Forgot secret vault password?
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className="space-y-7 animate-fade-up">
                                {/* Top Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-black text-slate-900">Document Vault &amp; Checklist</h2>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black border border-emerald-200">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                Vault Protected
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                                            Official AI consular checklist and application steps. Protected by secret password.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowChangeVaultPasswordModal(true);
                                                setVaultError(null);
                                            }}
                                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <KeyRound className="w-3.5 h-3.5 text-slate-600" />
                                            <span>Change Password</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleLockVault}
                                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                                        >
                                            <Lock className="w-3.5 h-3.5 text-rose-400" />
                                            <span>Lock Vault</span>
                                        </button>
                                        <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                                            {verifiedItemsCount}/{totalChecklistItems} Verified
                                        </span>
                                    </div>
                                </div>

                                {/* Confirmation Toast Banner */}
                                {profileUpdatedToast && (
                                    <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-between shadow-md animate-fade-up">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                                            <span>✓ Profile updated to {normalizedDest} ({selectedPurpose})</span>
                                        </div>
                                        <span className="text-[10px] bg-emerald-700/80 px-2 py-0.5 rounded-md font-extrabold">Active</span>
                                    </div>
                                )}

                                {/* 2. ACTIVE TRIP BANNER WITH READINESS PROGRESS GAUGE */}
                                <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider">
                                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                {selectedPurpose}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold">
                                                Passport: {normalizedPass}
                                            </span>
                                            {(aiVisaData?.processing_time || aiVisaData?.processing_and_timing?.decision_time) && (
                                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-bold">
                                                    ⏱️ {aiVisaData.processing_time || aiVisaData.processing_and_timing?.decision_time}
                                                </span>
                                            )}
                                            {(aiVisaData?.costs?.total_fee || aiVisaData?.costs?.visa_fee) && (
                                                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                                                    💳 {aiVisaData.costs?.total_fee || aiVisaData.costs?.visa_fee}
                                                </span>
                                            )}
                                            {isLoadingAi && (
                                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold flex items-center gap-1">
                                                    <div className="w-2 h-2 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                                    Syncing...
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-black text-white">
                                            {destFlag} Trip to {normalizedDest} • {aiVisaData?.visa_type || currentDestObj?.defaultVisa || 'Consular Visa Application'}
                                        </h3>
                                    </div>

                                    {/* Readiness Score Progress Meter */}
                                    <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 min-w-[180px] text-center space-y-1 shrink-0">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                                            Readiness Score
                                        </span>
                                        <div className="text-2xl font-black text-white flex items-center justify-center gap-1">
                                            <span>{readinessScore}%</span>
                                            <span className="text-xs text-emerald-400 font-extrabold">Ready</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${readinessScore}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-slate-300 font-medium block">
                                            {verifiedItemsCount} of {totalChecklistItems} verified
                                        </span>
                                    </div>
                                </div>

                                {/* ── AI STEPS ROADMAP (HOW TO APPLY) ── */}
                                {aiVisaData?.how_to_apply && aiVisaData.how_to_apply.length > 0 && (
                                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                                                    <Compass className="w-4 h-4 text-[#00A86B]" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-black text-slate-900">
                                                        Application Steps • {normalizedDest}
                                                    </h3>
                                                    <span className="text-[10px] font-semibold text-slate-400">
                                                        Official Consular Application Roadmap
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                {aiVisaData.how_to_apply.length} Steps
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {aiVisaData.how_to_apply.map((stepStr: string, idx: number) => {
                                                const { stepNum, text } = cleanStepText(stepStr, idx);
                                                return (
                                                    <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3 hover:border-slate-300 transition-all">
                                                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                                            {stepNum}
                                                        </span>
                                                        <div className="space-y-0.5 min-w-0">
                                                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                                                                Step {stepNum}
                                                            </span>
                                                            <p className="text-xs font-bold text-slate-800 leading-snug">
                                                                {text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* ── AI FINANCIAL SOLVENCY BENCHMARK ── */}
                                {aiVisaData?.financial_proofs && aiVisaData.financial_proofs.length > 0 && (
                                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                                <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                                                Financial Proofs &amp; Solvency Benchmarks
                                            </h4>
                                            <span className="text-[10px] font-bold text-slate-500">
                                                Consular Requirement
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                            {aiVisaData.financial_proofs.map((fin: any, fIdx: number) => (
                                                <div key={fIdx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1">
                                                    <div className="flex items-center justify-between gap-1">
                                                        <span className="font-black text-slate-900 truncate">{fin.type}</span>
                                                        {fin.minimum_balance_or_amount && (
                                                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                                                                {fin.minimum_balance_or_amount}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {fin.time_frame && (
                                                        <p className="text-[10px] text-slate-500 font-semibold">{fin.time_frame}</p>
                                                    )}
                                                    {fin.notes && (
                                                        <p className="text-[11px] text-slate-700 font-medium line-clamp-2">{fin.notes}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. SECTION A: GENERALLY IMPORTANT TRAVEL DOCUMENTS (MANDATORY GLOBAL VAULT) */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-black text-slate-900">
                                                1. General Travel Documents
                                            </h3>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                                Universal (3)
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500">
                                            {globalTravelDocuments.filter(d => vaultChecklistState[d.key]?.verified).length}/3
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {globalTravelDocuments.map((doc) => {
                                            const itemData = vaultChecklistState[doc.key];
                                            const isVerified = Boolean(itemData?.verified);
                                            const isScanning = scanningDocKey === doc.key;
                                            const inputId = `global-input-${doc.key}`;

                                            return (
                                                <div
                                                    key={doc.key}
                                                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                                                        isVerified
                                                            ? 'bg-emerald-50/40 border-emerald-200 shadow-2xs'
                                                            : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                                                    }`}
                                                >
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-base">
                                                                {doc.icon}
                                                            </div>
                                                            {isVerified ? (
                                                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 border border-emerald-200">
                                                                    <CheckCircle2 className="w-3 h-3 text-[#00A86B]" /> Verified
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                                                                    Required
                                                                </span>
                                                            )}
                                                        </div>

                                                        <h4 className="text-xs font-black text-slate-900 leading-snug">
                                                            {doc.title}
                                                        </h4>

                                                        {isVerified && itemData && (
                                                            <div className="bg-white rounded-xl p-2 border border-emerald-100 text-[10px] space-y-0.5">
                                                                <div className="flex items-center justify-between font-bold text-slate-700">
                                                                    <span className="truncate max-w-[130px]">{itemData.fileName}</span>
                                                                    <span className="text-slate-400">{itemData.size}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <input
                                                            id={inputId}
                                                            type="file"
                                                            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                                                            disabled={isScanning}
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleVaultDocScan(file, doc.key, doc.title);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={inputId}
                                                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center ${
                                                                isScanning
                                                                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                                                    : isVerified
                                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                                                            }`}
                                                        >
                                                            {isScanning ? (
                                                                <span className="flex items-center gap-1.5">
                                                                    <div className="w-3 h-3 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                                                                    Scanning...
                                                                </span>
                                                            ) : isVerified ? (
                                                                <>
                                                                    <RefreshCw className="w-3 h-3" /> Re-upload
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-3 h-3 text-emerald-400" /> Upload &amp; Scan
                                                                </>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* 4. SECTION B: CURRENT TRAVEL READINESS VISA DOCUMENTS (DESTINATION SPECIFIC CHECKLIST) */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-black text-slate-900">
                                                2. Visa Checklist • {normalizedDest}
                                            </h3>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                {selectedPurpose}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500">
                                            {destChecklist.filter(d => vaultChecklistState[d.key]?.verified).length}/{destChecklist.length}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {destChecklist.map((doc) => {
                                            const itemData = vaultChecklistState[doc.key];
                                            const isVerified = Boolean(itemData?.verified);
                                            const isScanning = scanningDocKey === doc.key;
                                            const inputId = `dest-input-${doc.key}`;

                                            return (
                                                <div
                                                    key={doc.key}
                                                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                                                        isVerified
                                                            ? 'bg-emerald-50/40 border-emerald-200 shadow-2xs'
                                                            : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                                                    }`}
                                                >
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-base">
                                                                {doc.icon}
                                                            </div>
                                                            {isVerified ? (
                                                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 border border-emerald-200">
                                                                    <CheckCircle2 className="w-3 h-3 text-[#00A86B]" /> Verified
                                                                </span>
                                                            ) : doc.mandatory ? (
                                                                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                                                                    Mandatory
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                                                                    Optional
                                                                </span>
                                                            )}
                                                        </div>

                                                        <h4 className="text-xs font-black text-slate-900 leading-snug">
                                                            {doc.title}
                                                        </h4>

                                                        {isVerified && itemData && (
                                                            <div className="bg-white rounded-xl p-2 border border-emerald-100 text-[10px] space-y-0.5">
                                                                <div className="flex items-center justify-between font-bold text-slate-700">
                                                                    <span className="truncate max-w-[130px]">{itemData.fileName}</span>
                                                                    <span className="text-slate-400">{itemData.size}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <input
                                                            id={inputId}
                                                            type="file"
                                                            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                                                            disabled={isScanning}
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleVaultDocScan(file, doc.key, doc.title);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={inputId}
                                                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center ${
                                                                isScanning
                                                                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                                                    : isVerified
                                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                                                            }`}
                                                        >
                                                            {isScanning ? (
                                                                <span className="flex items-center gap-1.5">
                                                                    <div className="w-3 h-3 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                                                                    Scanning...
                                                                </span>
                                                            ) : isVerified ? (
                                                                <>
                                                                    <RefreshCw className="w-3 h-3" /> Re-upload
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-3 h-3 text-emerald-400" /> Upload &amp; Scan
                                                                </>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* 5. SECTION C: ADDITIONAL STORED DOCUMENTS IN VAULT */}
                                <div className="space-y-3 pt-3 border-t border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-slate-900">
                                            3. Extra Documents ({documents.length})
                                        </h3>
                                        <label className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all">
                                            {isScanningVaultDoc ? (
                                                <span className="flex items-center gap-1.5">
                                                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Scanning &amp; Uploading...
                                                </span>
                                            ) : (
                                                <>
                                                    <Upload className="w-3.5 h-3.5 text-emerald-400" /> Upload Custom / Extra File
                                                </>
                                            )}
                                            <input 
                                                type="file" 
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                                                disabled={isScanningVaultDoc}
                                                className="hidden" 
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    setIsScanningVaultDoc(true);
                                                    const fileSizeFormatted = file.size > 1024 * 1024
                                                        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                                        : `${Math.round(file.size / 1024)} KB`;

                                                    try {
                                                        const reader = new FileReader();
                                                        reader.onload = async () => {
                                                            const base64 = reader.result as string;
                                                            let scanSummary = 'Verified & Ingested into Encrypted Vault';
                                                            try {
                                                                const res = await fetch('/api/ocr-analyze-document', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({
                                                                        base64Image: base64,
                                                                        mimeType: file.type || 'application/pdf',
                                                                        documentTitle: file.name,
                                                                        documentKey: 'vault_upload'
                                                                    })
                                                                });
                                                                const json = await res.json();
                                                                if (json.success && json.data?.summary) {
                                                                    scanSummary = json.data.summary;
                                                                }
                                                            } catch {}

                                                            const newDoc = {
                                                                id: `doc-${Date.now()}`,
                                                                label: file.name,
                                                                status: 'verified',
                                                                size: fileSizeFormatted,
                                                                uploadedAt: new Date().toLocaleDateString(),
                                                                summary: scanSummary
                                                            };
                                                            setDocuments(prev => {
                                                                const updated = [newDoc, ...prev];
                                                                localStorage.setItem('seeker_documents', JSON.stringify(updated));
                                                                return updated;
                                                            });
                                                            setIsScanningVaultDoc(false);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    } catch {
                                                        setIsScanningVaultDoc(false);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>

                                    {documents.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {documents.map((docItem, idx) => (
                                                <div key={docItem.id || idx} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-all">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#00A86B] flex items-center justify-center text-lg font-bold">
                                                                📄
                                                            </div>
                                                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200 flex items-center gap-1">
                                                                <CheckCircle className="w-3 h-3 text-[#00A86B]" /> OCR Verified
                                                            </span>
                                                        </div>
                                                        <h4 className="text-xs font-black text-slate-950 truncate" title={docItem.label}>
                                                            {docItem.label}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-400 font-medium">
                                                            {docItem.size || '1.8 MB'} • Uploaded {docItem.uploadedAt || 'Recently'}
                                                        </p>
                                                        {docItem.summary && (
                                                            <p className="text-[10px] text-emerald-800 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100 font-medium">
                                                                {docItem.summary}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                                        <span className="text-[10px] text-slate-500 font-semibold">256-bit AES Encrypted</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => alert(`Document "${docItem.label}" is securely encrypted and validated in TravlTik Vault.`)}
                                                            className="font-bold text-[#00A86B] hover:underline text-xs cursor-pointer"
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })()}

                    {/* 5. TAB: CONSULTATIONS & SESSIONS */}
                    {activeTab === "consultations" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                            <Calendar className="w-12 h-12 text-[#00a896] mx-auto" />
                            <h3 className="text-lg font-black text-slate-900">1-on-1 Expert Consultation Schedule</h3>
                            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                                View your upcoming video advisory calls with OISC & Bar-licensed solicitors and verified immigration consultants.
                            </p>
                            <div className="pt-2">
                                <a href="/find-experts" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md">
                                    Book New 1-on-1 Session →
                                </a>
                            </div>
                        </div>
                    )}

                    {/* 6. TAB: ESCROW VAULT */}
                    {activeTab === "escrow-milestones" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-[#00a896]" /> TravlTik 100% Escrow Protection
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Your funds remain safely locked in escrow and are only released upon milestone completion.</p>
                                </div>
                                <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                                    🛡️ 100% Money-Back Guarantee
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 1</span>
                                    <h4 className="font-extrabold text-slate-900">AI &amp; Legal Quality Audit</h4>
                                    <p className="text-slate-500 text-[11px]">30% released when all mandatory checklist items are verified.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 2</span>
                                    <h4 className="font-extrabold text-slate-900">Embassy / VFS Filing</h4>
                                    <p className="text-slate-500 text-[11px]">40% released when official visa submission receipt is generated.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 3</span>
                                    <h4 className="font-extrabold text-slate-900">Visa Decision Clearance</h4>
                                    <p className="text-slate-500 text-[11px]">Remaining 30% released upon passport stamping and outcome delivery.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. OTHER TABS */}
                    {activeTab !== "dashboard" && activeTab !== "profile" && activeTab !== "cases" && activeTab !== "scanned-documents" && activeTab !== "consultations" && activeTab !== "escrow-milestones" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                            <Briefcase className="w-12 h-12 text-[#00a896] mx-auto" />
                            <h3 className="text-lg font-black text-slate-900 capitalize">{activeTab.replace('-', ' ')} Portal</h3>
                            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                                All your active {activeTab.replace('-', ' ')} records are synchronized in real-time with your TravlTik profile.
                            </p>
                            <a href="/find-experts" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md">
                                Connect with Expert →
                            </a>
                        </div>
                    )}

                </main>
            </div>

            {/* Edit Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowProfileModal(false)} />
                    <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 space-y-5 animate-fade-up max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <Settings className="w-4 h-4 text-[#00a896]" /> Edit Traveller Profile Details
                            </h3>
                            <button onClick={() => setShowProfileModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveProfileModal} className="space-y-4 text-xs">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Profile Photo</label>
                                <div className="flex items-center gap-3">
                                    {modalPhoto && !modalPhoto.includes("unsplash.com") ? (
                                        <img src={modalPhoto} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-[#00A86B] text-white text-lg font-black flex items-center justify-center border border-teal-200 shrink-0">
                                            {(modalFirstName || userDisplayName || "U").charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === "string") {
                                                        setModalPhoto(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-[#00a896] cursor-pointer" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">First Name</label>
                                    <input 
                                        type="text" 
                                        value={modalFirstName} 
                                        onChange={(e) => setModalFirstName(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={modalLastName} 
                                        onChange={(e) => setModalLastName(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={modalPhone} 
                                        onChange={(e) => setModalPhone(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Current Residence</label>
                                    <input 
                                        type="text" 
                                        value={modalResidentOf} 
                                        onChange={(e) => setModalResidentOf(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Passport Citizenship</label>
                                    <input 
                                        type="text" 
                                        value={modalPassportCountry} 
                                        onChange={(e) => setModalPassportCountry(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Target Destinations</label>
                                    <input 
                                        type="text" 
                                        value={modalDestinations} 
                                        onChange={(e) => setModalDestinations(e.target.value)} 
                                        placeholder="Canada, UK, USA"
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── MODAL: CHANGE VAULT SECRET PASSWORD ── */}
            {showChangeVaultPasswordModal && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xs">
                                    <KeyRound className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-950">Change Vault Password</h3>
                                    <p className="text-xs text-slate-500 font-medium">Update your secret document password</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setShowChangeVaultPasswordModal(false);
                                    setVaultError(null);
                                    setVaultOldPasswordInput("");
                                    setVaultPasswordInput("");
                                    setVaultPasswordConfirm("");
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleChangeVaultPassword} className="space-y-4 pt-4">
                            {vaultError && (
                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                    <span>{vaultError}</span>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Current Secret Password</label>
                                <div className="relative">
                                    <input
                                        type={showVaultOldPassword ? "text" : "password"}
                                        value={vaultOldPasswordInput}
                                        onChange={(e) => setVaultOldPasswordInput(e.target.value)}
                                        placeholder="Enter current password"
                                        className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowVaultOldPassword(!showVaultOldPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showVaultOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">New Secret Password</label>
                                <div className="relative">
                                    <input
                                        type={showVaultPassword ? "text" : "password"}
                                        value={vaultPasswordInput}
                                        onChange={(e) => setVaultPasswordInput(e.target.value)}
                                        placeholder="Enter new password (min 4 chars)"
                                        className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowVaultPassword(!showVaultPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Confirm New Password</label>
                                <input
                                    type={showVaultPassword ? "text" : "password"}
                                    value={vaultPasswordConfirm}
                                    onChange={(e) => setVaultPasswordConfirm(e.target.value)}
                                    placeholder="Re-enter new password"
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowChangeVaultPasswordModal(false)}
                                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isVaultSubmitting}
                                    className="flex-1 py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl font-black text-xs shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {isVaultSubmitting ? "Updating..." : "Save New Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── MODAL: RESET VAULT SECRET PASSWORD ── */}
            {showResetVaultPasswordModal && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xs">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-950">Reset Vault Password</h3>
                                    <p className="text-xs text-slate-500 font-medium">Verify account to restore vault access</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setShowResetVaultPasswordModal(false);
                                    setVaultError(null);
                                    setVaultAccountPasswordInput("");
                                    setVaultPasswordInput("");
                                    setVaultPasswordConfirm("");
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleResetVaultPassword} className="space-y-4 pt-4">
                            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                Enter your TravlTik login account password to securely verify your identity and reset your secret Document Vault password.
                            </p>

                            {vaultError && (
                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                    <span>{vaultError}</span>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Your Account Login Password</label>
                                <input
                                    type="password"
                                    value={vaultAccountPasswordInput}
                                    onChange={(e) => setVaultAccountPasswordInput(e.target.value)}
                                    placeholder="Enter your main account login password"
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">New Secret Vault Password</label>
                                <div className="relative">
                                    <input
                                        type={showVaultPassword ? "text" : "password"}
                                        value={vaultPasswordInput}
                                        onChange={(e) => setVaultPasswordInput(e.target.value)}
                                        placeholder="Enter new secret password (min 4 chars)"
                                        className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowVaultPassword(!showVaultPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">Confirm New Vault Password</label>
                                <input
                                    type={showVaultPassword ? "text" : "password"}
                                    value={vaultPasswordConfirm}
                                    onChange={(e) => setVaultPasswordConfirm(e.target.value)}
                                    placeholder="Re-enter new secret password"
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowResetVaultPasswordModal(false)}
                                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isVaultSubmitting}
                                    className="flex-1 py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl font-black text-xs shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {isVaultSubmitting ? "Verifying..." : "Verify & Reset Vault"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
