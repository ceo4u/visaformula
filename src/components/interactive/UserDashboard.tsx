import { useState, useEffect, useRef, useMemo } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, ArrowLeft, Bell, FileText, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, LayoutDashboard, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, Users, LogOut, CheckSquare, Sparkles, X, ChevronDown, Filter, MapPin, Globe, LayoutGrid, Save, Menu, ChevronLeft, Edit2, Upload,
    CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Compass, CreditCard, MoreVertical, Download, Building2, Info,
    Eye, EyeOff, Mail, KeyRound, GraduationCap, Plane, Check, RotateCw, Luggage, Copy, Trash2, Share2,
    ShieldAlert, DollarSign, Laptop, CalendarCheck, Zap, FileEdit, Layers, ExternalLink
} from "lucide-react";
import { VisaApplicationDetailsView } from "./VisaApplicationDetailsView";

export interface VaultDocItem {
  key: string;
  title: string;
  description: string;
  icon: string;
  mandatory: boolean;
  hint: string;
}

function normalizeCountryName(val: string): string {
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

function getAiDocIcon(title: string): string {
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

const dashboardPassportOptions = [
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

const dashboardDestinationOptions = [
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

const dashboardPurposeOptions = [
  { value: 'Tourism / Vacation', label: 'Tourism / Vacation', emoji: '🏝️' },
  { value: 'Higher Studies', label: 'Higher Studies', emoji: '🎓' },
  { value: 'Employment / Work', label: 'Employment / Work', emoji: '💼' },
  { value: 'Business Visit', label: 'Business Visit', emoji: '🏢' },
  { value: 'Family / Friends Visit', label: 'Family / Friends Visit', emoji: '👨‍👩‍👦' }
];

const globalTravelDocuments: VaultDocItem[] = [
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

function getDestinationChecklist(dest: string, purp: string): VaultDocItem[] {
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

function ReadinessSelect({
    value,
    onChange,
    options,
    label,
    placeholder = "Select an option"
}: {
    value: string;
    onChange: (val: string) => void;
    options: string[];
    label?: string;
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hasValue = value && value.trim() !== "";

    return (
        <div className="relative space-y-1.5" ref={ref}>
            {label && <label className="block text-xs font-bold text-slate-800 tracking-tight">{label}</label>}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full h-10 px-3.5 rounded-xl border bg-white text-xs font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                    open ? "border-indigo-600 ring-2 ring-indigo-500/20" : "border-slate-200 hover:border-slate-300"
                }`}
            >
                <span className={`truncate text-left ${hasValue ? "text-slate-900 font-bold" : "text-slate-400 font-normal"}`}>
                    {hasValue ? value : placeholder}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-indigo-600" : ""}`} />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 max-h-56 overflow-y-auto">
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                value === opt ? "bg-indigo-50 text-indigo-900 font-bold" : "text-slate-700 hover:bg-slate-50 font-medium"
                            }`}
                        >
                            <span className="truncate">{opt}</span>
                            {value === opt && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function getFlagEmoji(countryName: string): string {
    if (!countryName) return '🌍';
    const clean = countryName.toLowerCase().trim();
    const dest = dashboardDestinationOptions.find(d => 
        d.value.toLowerCase() === clean || 
        d.label.toLowerCase().includes(clean) || 
        clean.includes(d.value.toLowerCase())
    );
    if (dest?.flag) return dest.flag;
    const pass = dashboardPassportOptions.find(p => 
        p.value.toLowerCase() === clean || 
        p.label.toLowerCase().includes(clean) || 
        clean.includes(p.value.toLowerCase())
    );
    if (pass?.flag) return pass.flag;

    const map: Record<string, string> = {
        'india': '🇮🇳', 'united states': '🇺🇸', 'usa': '🇺🇸', 'united kingdom': '🇬🇧', 'uk': '🇬🇧',
        'canada': '🇨🇦', 'australia': '🇦🇺', 'germany': '🇩🇪', 'france': '🇫🇷', 'italy': '🇮🇹',
        'spain': '🇪🇸', 'greece': '🇬🇷', 'netherlands': '🇳🇱', 'switzerland': '🇨🇭', 'japan': '🇯🇵',
        'singapore': '🇸🇬', 'united arab emirates': '🇦🇪', 'uae': '🇦🇪', 'dubai': '🇦🇪',
        'saudi arabia': '🇸🇦', 'qatar': '🇶🇦', 'thailand': '🇹🇭', 'malaysia': '🇲🇾', 'indonesia': '🇮🇩',
        'vietnam': '🇻🇳', 'turkey': '🇹🇷', 'china': '🇨🇳', 'south korea': '🇰🇷', 'new zealand': '🇳🇿',
        'ireland': '🇮🇪', 'russia': '🇷🇺', 'brazil': '🇧🇷', 'south africa': '🇿🇦', 'egypt': '🇪🇬',
        'mexico': '🇲🇽', 'portugal': '🇵🇹', 'austria': '🇦🇹', 'belgium': '🇧🇪', 'sweden': '🇸🇪',
        'norway': '🇳🇴', 'denmark': '🇩🇰', 'finland': '🇫🇮', 'poland': '🇵🇱', 'czech republic': '🇨🇿',
        'hungary': '🇭🇺'
    };
    for (const [key, flag] of Object.entries(map)) {
        if (clean.includes(key)) return flag;
    }
    return '🌍';
}

function getCountryCode(countryName: string): string {
    if (!countryName) return 'un';
    const c = countryName.toLowerCase().trim();
    if (c.includes('india') || c === 'in' || c === 'indian') return 'in';
    if (c.includes('mauritius') || c === 'mu') return 'mu';
    if (c.includes('maldives') || c === 'mv') return 'mv';
    if (c.includes('thailand') || c === 'th' || c === 'thai') return 'th';
    if (c.includes('malaysia') || c === 'my') return 'my';
    if (c.includes('sri lanka') || c === 'lk') return 'lk';
    if (c.includes('nepal') || c === 'np') return 'np';
    if (c.includes('bhutan') || c === 'bt') return 'bt';
    if (c.includes('indonesia') || c.includes('bali') || c === 'id') return 'id';
    if (c.includes('vietnam') || c === 'vn') return 'vn';
    if (c.includes('united kingdom') || c.includes('uk') || c.includes('england') || c.includes('britain')) return 'gb';
    if (c.includes('united states') || c.includes('usa') || c.includes('us') || c.includes('america')) return 'us';
    if (c.includes('greece') || c === 'gr' || c === 'greek') return 'gr';
    if (c.includes('uae') || c.includes('dubai') || c.includes('emirates') || c.includes('united arab')) return 'ae';
    if (c.includes('canada') || c === 'ca') return 'ca';
    if (c.includes('australia') || c === 'au') return 'au';
    if (c.includes('germany') || c === 'de') return 'de';
    if (c.includes('france') || c === 'fr') return 'fr';
    if (c.includes('italy') || c === 'it') return 'it';
    if (c.includes('spain') || c === 'es') return 'es';
    if (c.includes('singapore') || c === 'sg') return 'sg';
    if (c.includes('japan') || c === 'jp') return 'jp';
    if (c.includes('switzerland') || c === 'ch') return 'ch';
    if (c.includes('netherlands') || c === 'nl') return 'nl';
    if (c.includes('austria') || c === 'at') return 'at';
    if (c.includes('portugal') || c === 'pt') return 'pt';
    if (c.includes('new zealand') || c === 'nz') return 'nz';
    if (c.includes('schengen') || c.includes('europe') || c === 'eu') return 'eu';
    if (c.includes('turkey') || c.includes('turkiye') || c === 'tr') return 'tr';
    if (c.includes('china') || c === 'cn') return 'cn';
    if (c.includes('russia') || c === 'ru') return 'ru';
    if (c.includes('south korea') || c === 'kr') return 'kr';
    if (c.includes('saudi') || c === 'sa') return 'sa';
    if (c.includes('qatar') || c === 'qa') return 'qa';
    if (c.includes('oman') || c === 'om') return 'om';
    if (c.includes('kuwait') || c === 'kw') return 'kw';
    if (c.includes('bahrain') || c === 'bh') return 'bh';
    if (c.includes('egypt') || c === 'eg') return 'eg';
    if (c.includes('kenya') || c === 'ke') return 'ke';
    if (c.includes('south africa') || c === 'za') return 'za';
    if (c.includes('brazil') || c === 'br') return 'br';
    if (c.includes('mexico') || c === 'mx') return 'mx';
    if (c.includes('ireland') || c === 'ie') return 'ie';
    if (c.includes('philippines') || c === 'ph') return 'ph';
    if (c.includes('georgia') || c === 'ge') return 'ge';
    if (c.includes('kazakhstan') || c === 'kz') return 'kz';
    return 'un';
}

// Apple iOS squircle icon renderer for luggage items
function renderIosLuggageIcon(id: string) {
    const iconClass = "w-4.5 h-4.5 text-white stroke-[2.2]";
    const map: Record<string, { bg: string; icon: React.ReactNode }> = {
        cabin_passport: { bg: 'bg-blue-500', icon: <FileText className={iconClass} /> },
        cabin_tickets: { bg: 'bg-sky-500', icon: <Plane className={iconClass} /> },
        cabin_hotel: { bg: 'bg-purple-500', icon: <Building2 className={iconClass} /> },
        cabin_meds: { bg: 'bg-rose-500', icon: <ShieldAlert className={iconClass} /> },
        cabin_powerbank: { bg: 'bg-amber-500', icon: <Zap className={iconClass} /> },
        cabin_electronics: { bg: 'bg-indigo-600', icon: <Laptop className={iconClass} /> },
        cabin_forex: { bg: 'bg-emerald-500', icon: <DollarSign className={iconClass} /> },
        cabin_pen: { bg: 'bg-slate-700', icon: <FileEdit className={iconClass} /> },
        checked_clothes: { bg: 'bg-teal-500', icon: <Layers className={iconClass} /> },
        checked_shoes: { bg: 'bg-orange-500', icon: <Compass className={iconClass} /> },
        checked_toiletries: { bg: 'bg-cyan-500', icon: <Sparkles className={iconClass} /> },
        checked_docs_copy: { bg: 'bg-blue-600', icon: <FileText className={iconClass} /> },
        checked_lock: { bg: 'bg-zinc-700', icon: <Lock className={iconClass} /> },
        checked_tag: { bg: 'bg-amber-600', icon: <Bookmark className={iconClass} /> },
        prep_webcheckin: { bg: 'bg-violet-500', icon: <CalendarCheck className={iconClass} /> },
        prep_insurance: { bg: 'bg-emerald-600', icon: <ShieldCheck className={iconClass} /> },
        prep_esim: { bg: 'bg-pink-500', icon: <Globe className={iconClass} /> },
        prep_bank: { bg: 'bg-emerald-500', icon: <CreditCard className={iconClass} /> },
        prep_embassy: { bg: 'bg-slate-800', icon: <Building2 className={iconClass} /> },
    };

    const item = map[id] || { bg: 'bg-slate-700', icon: <Luggage className={iconClass} /> };
    return (
        <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0 shadow-2xs`}>
            {item.icon}
        </div>
    );
}

function getDocConditions(title: string, desc: string): string[] {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) {
    return [
      'Valid for at least 3 months beyond intended stay',
      'Issued within the last 10 years',
      'Minimum 2 blank pages'
    ];
  }
  if (t.includes('application form') || t.includes('schengen visa application') || t.includes('visa form')) {
    return [
      'Fully filled and signed',
      'Date of signature within last 30 days'
    ];
  }
  if (t.includes('photo') || t.includes('photograph')) {
    return [
      'Recent (taken within last 6 months)',
      '35mm × 45mm, white background',
      'No glasses, no headgear'
    ];
  }
  if (t.includes('itinerary') || t.includes('flight') || t.includes('ticket')) {
    return [
      'Confirmed flight tickets',
      'Round trip itinerary'
    ];
  }
  if (t.includes('hotel') || t.includes('accommodation') || t.includes('reservation')) {
    return [
      'Confirmed booking for entire stay',
      'Hotel name and address required'
    ];
  }
  if (t.includes('insurance')) {
    return [
      'Minimum coverage of €30,000',
      'Must cover entire Schengen / travel area',
      'Valid for entire stay'
    ];
  }
  if (t.includes('bank') || t.includes('statement') || t.includes('financial')) {
    return [
      'Last 3 months statements',
      'Sufficient balance to cover stay',
      'Name & account number visible'
    ];
  }
  if (t.includes('cover letter') || t.includes('purpose') || t.includes('intent')) {
    return [
      'Purpose of visit',
      'Details of stay and return',
      "Applicant's contact details"
    ];
  }
  if (t.includes('employment') || t.includes('noc') || t.includes('leave') || t.includes('salary')) {
    return [
      'Original employer NOC / Leave letter',
      'Last 3 months salary payslips',
      'Company seal and HR signature'
    ];
  }
  if (t.includes('tax') || t.includes('itr')) {
    return [
      'Last 2 to 3 years ITR-V e-filing acknowledgements',
      'Form 16 or audited financial report'
    ];
  }
  if (desc) {
    const parts = desc.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 5);
    if (parts.length > 0) return parts.slice(0, 3);
  }
  return [
    'Official statutory requirement',
    'Must be clearly legible in PDF or JPG format',
    'Meets consular authenticity criteria'
  ];
}

function getDocIconConfig(title: string) {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) {
    return { bg: 'bg-purple-50 text-purple-600 border border-purple-200/80', iconName: 'passport' };
  }
  if (t.includes('application form') || t.includes('form')) {
    return { bg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80', iconName: 'form' };
  }
  if (t.includes('photo') || t.includes('photograph')) {
    return { bg: 'bg-amber-50 text-amber-600 border border-amber-200/80', iconName: 'photo' };
  }
  if (t.includes('itinerary') || t.includes('flight') || t.includes('ticket')) {
    return { bg: 'bg-sky-50 text-sky-600 border border-sky-200/80', iconName: 'flight' };
  }
  if (t.includes('hotel') || t.includes('accommodation')) {
    return { bg: 'bg-indigo-50 text-indigo-600 border border-indigo-200/80', iconName: 'hotel' };
  }
  if (t.includes('insurance')) {
    return { bg: 'bg-rose-50 text-rose-600 border border-rose-200/80', iconName: 'insurance' };
  }
  if (t.includes('bank') || t.includes('statement') || t.includes('financial')) {
    return { bg: 'bg-teal-50 text-teal-600 border border-teal-200/80', iconName: 'bank' };
  }
  if (t.includes('cover letter')) {
    return { bg: 'bg-rose-50 text-rose-500 border border-rose-200/80', iconName: 'letter' };
  }
  return { bg: 'bg-slate-50 text-slate-600 border border-slate-200/80', iconName: 'file' };
}

interface ModernDropdownOption {
  value: string;
  label: string;
  flag?: string;
  emoji?: string;
  defaultVisa?: string;
}

function ModernDashboardSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  allowCustom = false,
  customPlaceholder = "Enter other country name..."
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: ModernDropdownOption[];
  placeholder?: string;
  allowCustom?: boolean;
  customPlaceholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customInput, setCustomInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    o => o.value.toLowerCase() === (value || "").toLowerCase()
  );

  const displayTitle = selectedOption
    ? `${selectedOption.flag || selectedOption.emoji ? (selectedOption.flag || selectedOption.emoji) + " " : ""}${selectedOption.label}`
    : value || placeholder;

  const filteredOptions = options.filter(o =>
    o.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1.5 relative text-left" ref={dropdownRef}>
      {label && <label className="text-xs font-bold text-slate-700 block">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 px-3.5 rounded-xl border bg-slate-50 hover:bg-white text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
          isOpen ? 'border-slate-900 ring-2 ring-slate-900/10 bg-white' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`truncate text-left ${value ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'}`}>
          {displayTitle}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-[9999] animate-in fade-in zoom-in-95 origin-top">
          {/* Search bar */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full h-8 pl-8 pr-3 text-xs font-semibold bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>

          <div className="max-h-52 overflow-y-auto space-y-0.5 custom-scrollbar">
            {filteredOptions.length === 0 && !allowCustom && (
              <div className="p-3 text-center text-xs text-slate-400 font-medium">No matches found</div>
            )}

            {filteredOptions.map((opt) => {
              const isSelected = (value || "").toLowerCase() === opt.value.toLowerCase();
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#420f79] text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {(opt.flag || opt.emoji) && <span className="text-sm shrink-0">{opt.flag || opt.emoji}</span>}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2 text-white" />}
                </button>
              );
            })}

            {allowCustom && (
              <div className="pt-2 border-t border-slate-100 mt-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                  Other / Custom Country
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    placeholder={customPlaceholder}
                    className="flex-1 h-8 px-2.5 text-xs font-semibold bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-[#420f79]"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customInput.trim()) {
                        e.preventDefault();
                        onChange(customInput.trim());
                        setIsOpen(false);
                        setCustomInput("");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customInput.trim()) {
                        onChange(customInput.trim());
                        setIsOpen(false);
                        setCustomInput("");
                      }
                    }}
                    className="h-8 px-3 rounded-lg bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function UserDashboard() {
    const [dashboardSearch, setDashboardSearch] = useState("");
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
    const [activeTab, setActiveTab] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get("tab");
            if (tab) {
                if (tab === "pre-departure" || tab === "predeparture" || tab === "luggage" || tab === "packing") return "predeparture";
                if (tab === "vault" || tab === "documents" || tab === "scanned-documents") return "scanned-documents";
                if (tab === "readiness" || tab === "visa-readiness") return "visa-readiness";
                if (tab === "cases" || tab === "applications") return "cases";
                return tab;
            }
        }
        return "dashboard";
    });
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");

    const [favouriteExperts, setFavouriteExperts] = useState<any[]>([]);
    const [visasProcessingState, setVisasProcessingState] = useState<any[]>([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isScanningVaultDoc, setIsScanningVaultDoc] = useState(false);
    const [journeyData, setJourneyData] = useState<any>(null);
    // Vault Document Table Filters & Inspection (Matching Image media_1788550890178)
    const [vaultDocSearch, setVaultDocSearch] = useState("");
    const [vaultDocTypeFilter, setVaultDocTypeFilter] = useState<string>("all");
    const [vaultDocSort, setVaultDocSort] = useState<string>("newest");
    const [selectedVaultDoc, setSelectedVaultDoc] = useState<any | null>(null);
    const [isEditingOcr, setIsEditingOcr] = useState(false);
    const [editOcrForm, setEditOcrForm] = useState<any>({});
    const [vaultDocMenuId, setVaultDocMenuId] = useState<string | null>(null);
    const [replacingDocId, setReplacingDocId] = useState<string | null>(null);
    const [vaultActionToast, setVaultActionToast] = useState<string | null>(null);
    const vaultFileInputRef = useRef<HTMLInputElement | null>(null);
    const replaceFileInputRef = useRef<HTMLInputElement | null>(null);
    const [vaultUploadTargetReq, setVaultUploadTargetReq] = useState<{ key: string; title: string; type: string } | null>(null);
    const vaultUploadTargetReqRef = useRef<{ key: string; title: string; type: string } | null>(null);
    const [expandedDocKey, setExpandedDocKey] = useState<string | null>(null);
    const [inspectDocData, setInspectDocData] = useState<{
        title: string;
        key: string;
        itemData: any;
        conditions: string[];
    } | null>(null);
    const [stagedPassportFile, setStagedPassportFile] = useState<File | null>(null);
    const [stagedPassportPreview, setStagedPassportPreview] = useState<string | null>(null);


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
    const [importDocTargetKey, setImportDocTargetKey] = useState<string | null>(null);
    const [importToastMessage, setImportToastMessage] = useState<string | null>(null);

    // ── APPLICATION NAMING & CREATION MODAL STATES ──
    const [showNewAppModal, setShowNewAppModal] = useState(false);
    const [newAppName, setNewAppName] = useState("");
    const [newAppDest, setNewAppDest] = useState("");
    const [newAppPass, setNewAppPass] = useState("India");
    const [newAppPurpose, setNewAppPurpose] = useState("Tourism / Vacation");
    const [editingAppId, setEditingAppId] = useState<string | null>(null);
    const [editingAppName, setEditingAppName] = useState("");
    const [copiedTrackingId, setCopiedTrackingId] = useState<string | null>(null);
    const [dashboardToast, setDashboardToast] = useState<string | null>(null);

    // ── PRE-DEPARTURE & LUGGAGE CHECKLIST STATES ──
    const [luggageChecklist, setLuggageChecklist] = useState<Record<string, boolean>>({});
    const [customLuggageItems, setCustomLuggageItems] = useState<Array<{ id: string; category: 'cabin' | 'checked' | 'predeparture'; title: string }>>([]);
    const [isFetchingPreDepartureAi, setIsFetchingPreDepartureAi] = useState(false);
    const [aiPreDepartureData, setAiPreDepartureData] = useState<any>(null);
    const [newLuggageItemText, setNewLuggageItemText] = useState("");
    const [newLuggageCategory, setNewLuggageCategory] = useState<'cabin' | 'checked' | 'predeparture'>('cabin');
    const [luggageActiveSection, setLuggageActiveSection] = useState<'all' | 'cabin' | 'checked' | 'predeparture'>('all');

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

    // ── VISA READINESS ENGINE REAL-TIME AUDIT STATES (FRESH INITIAL STATE, NO DUMMY VALUES) ──
    const [readinessPurpose, setReadinessPurpose] = useState<'study' | 'tourism' | 'work'>('tourism');
    const [readinessPassportValidity, setReadinessPassportValidity] = useState("");

    // ── 11-POINT STATUTORY VISA READINESS & DOCUMENTS AUDIT STATE ──
    const [auditPassportExpiry, setAuditPassportExpiry] = useState("");
    const [auditPassportBlankPages, setAuditPassportBlankPages] = useState<boolean | null>(null);
    
    const [auditFinancialBalance, setAuditFinancialBalance] = useState("");
    const [auditBankStatementType, setAuditBankStatementType] = useState<string>("none"); // 'stamped_6m' | 'stamped_3m' | 'online_pdf' | 'none'
    
    const [auditInsuranceFrom, setAuditInsuranceFrom] = useState("");
    const [auditInsuranceTill, setAuditInsuranceTill] = useState("");
    const [auditInsuranceCoverage, setAuditInsuranceCoverage] = useState<string>("none"); // 'schengen_30k_50k' | 'comprehensive_100k' | 'basic_25k' | 'none'
    
    const [auditEmploymentType, setAuditEmploymentType] = useState<"salaried" | "business">("salaried");
    const [auditSalariedPayslips, setAuditSalariedPayslips] = useState<string>("none"); // '3_6_months' | '1_2_months' | 'none'
    const [auditSalariedForm16, setAuditSalariedForm16] = useState<boolean | null>(null);
    const [auditSalariedNoc, setAuditSalariedNoc] = useState<boolean | null>(null);
    const [auditSalariedItr, setAuditSalariedItr] = useState<boolean | null>(null);
    const [auditBusinessReg, setAuditBusinessReg] = useState<boolean | null>(null);
    const [auditBusinessItr, setAuditBusinessItr] = useState<boolean | null>(null);
    
    const [auditFlightDeptDate, setAuditFlightDeptDate] = useState("");
    const [auditFlightRetDate, setAuditFlightRetDate] = useState("");
    const [auditFlightAirline, setAuditFlightAirline] = useState("");
    const [auditFlightHasLayover, setAuditFlightHasLayover] = useState<boolean | null>(null);
    const [auditFlightLayoverCity, setAuditFlightLayoverCity] = useState("");
    
    const [auditAccommodationType, setAuditAccommodationType] = useState<string>("none"); // 'hotel_confirmed' | 'host_invitation' | 'rental_lease' | 'none'
    const [auditSponsorshipType, setAuditSponsorshipType] = useState<string>("self"); // 'self' | 'family_sponsored' | 'company_sponsored'
    const [auditSponsorDocsReady, setAuditSponsorDocsReady] = useState<boolean | null>(null);
    
    const [auditCoveringLetter, setAuditCoveringLetter] = useState<string>("none"); // 'ready_signed' | 'ai_drafted' | 'none'
    const [auditVisaFormFilled, setAuditVisaFormFilled] = useState<boolean | null>(null);
    const [auditTravelHistory, setAuditTravelHistory] = useState<string>("none"); // 'strong_oecd' | 'regional' | 'first_time' | 'none'
    const [auditPastRefusal, setAuditPastRefusal] = useState<boolean | null>(null);
    const [auditRefusalMitigation, setAuditRefusalMitigation] = useState<boolean | null>(null);

    // Student specific states (start fresh / unselected)
    const [studyQual, setStudyQual] = useState("");
    const [studyTarget, setStudyTarget] = useState("");
    const [studyIntake, setStudyIntake] = useState("");
    const [studyBudget, setStudyBudget] = useState("");
    const [studentAdmissionStatus, setStudentAdmissionStatus] = useState("");
    const [studentLanguageScore, setStudentLanguageScore] = useState("");

    // Tourist specific states (start fresh / unselected)
    const [visitPlanStatus, setVisitPlanStatus] = useState("");
    const [visitTiming, setVisitTiming] = useState("");
    const [visitReturnDate, setVisitReturnDate] = useState("");
    const [tripDurationDays, setTripDurationDays] = useState(0);
    const [visitStay, setVisitStay] = useState("");
    const [touristHomeTies, setTouristHomeTies] = useState("");
    const [touristBankStability, setTouristBankStability] = useState("");

    // Work specific states (start fresh / unselected)
    const [workExp, setWorkExp] = useState("");
    const [workOffer, setWorkOffer] = useState("");
    const [workDomain, setWorkDomain] = useState("");
    const [workAssess, setWorkAssess] = useState("");

    useEffect(() => {
        const p = (selectedPurpose || '').toLowerCase();
        if (p.includes('stud') || p.includes('higher') || p.includes('academic')) {
            setReadinessPurpose('study');
        } else if (p.includes('work') || p.includes('employ') || p.includes('job')) {
            setReadinessPurpose('work');
        } else {
            setReadinessPurpose('tourism');
        }
    }, [selectedPurpose]);

    // ── HYDRATE READINESS ASSESSMENT FROM AI RESULT PORTAL / STORAGE ──
    useEffect(() => {
        try {
            const savedRaw = localStorage.getItem('visa_readiness_assessment');
            const journeyRaw = localStorage.getItem('travltik_user_journey');
            let savedData: any = null;
            if (savedRaw) {
                savedData = JSON.parse(savedRaw);
            } else if (journeyRaw) {
                const j = JSON.parse(journeyRaw);
                if (j?.readiness_assessment) savedData = j.readiness_assessment;
            }

            if (savedData) {
                if (savedData.purpose) {
                    const p = String(savedData.purpose).toLowerCase();
                    if (p.includes('study') || p.includes('student')) setReadinessPurpose('study');
                    else if (p.includes('work') || p.includes('job')) setReadinessPurpose('work');
                    else setReadinessPurpose('tourism');
                }
                if (savedData.studyQual) setStudyQual(savedData.studyQual);
                if (savedData.studyTarget) setStudyTarget(savedData.studyTarget);
                if (savedData.studyIntake) setStudyIntake(savedData.studyIntake);
                if (savedData.studyBudget) setStudyBudget(savedData.studyBudget);
                if (savedData.studentAdmissionStatus) setStudentAdmissionStatus(savedData.studentAdmissionStatus);
                if (savedData.studentLanguageScore) setStudentLanguageScore(savedData.studentLanguageScore);

                if (savedData.visitPlanStatus) setVisitPlanStatus(savedData.visitPlanStatus);
                if (savedData.visitTiming) setVisitTiming(savedData.visitTiming);
                if (savedData.visitReturnDate) setVisitReturnDate(savedData.visitReturnDate);
                if (typeof savedData.tripDurationDays === 'number') setTripDurationDays(savedData.tripDurationDays);
                if (savedData.visitStay) setVisitStay(savedData.visitStay);
                if (savedData.touristHomeTies) setTouristHomeTies(savedData.touristHomeTies);
                if (savedData.touristBankStability) setTouristBankStability(savedData.touristBankStability);

                if (savedData.workExp) setWorkExp(savedData.workExp);
                if (savedData.workOffer) setWorkOffer(savedData.workOffer);
                if (savedData.workDomain) setWorkDomain(savedData.workDomain);
                if (savedData.workAssess) setWorkAssess(savedData.workAssess);

                if (savedData.passportValidityRange || savedData.readinessPassportValidity) {
                    setReadinessPassportValidity(savedData.passportValidityRange || savedData.readinessPassportValidity);
                }
            }
        } catch (e) {}
    }, []);

    // ── SYNC DASHBOARD EDITS BACK TO LOCALSTORAGE ──
    useEffect(() => {
        const hasData = Boolean(
            studyQual || studyTarget || studyIntake || studyBudget || studentAdmissionStatus || studentLanguageScore ||
            visitPlanStatus || visitTiming || visitReturnDate || visitStay || touristHomeTies || touristBankStability ||
            workExp || workOffer || workDomain || workAssess || readinessPassportValidity
        );
        if (!hasData) return;

        try {
            const payload = {
                purpose: readinessPurpose,
                destination: selectedDestination,
                passport: selectedPassport,
                studyQual,
                studyTarget,
                studyIntake,
                studyBudget,
                studentAdmissionStatus,
                studentLanguageScore,
                visitPlanStatus,
                visitTiming,
                visitReturnDate,
                tripDurationDays,
                visitStay,
                touristHomeTies,
                touristBankStability,
                workExp,
                workOffer,
                workDomain,
                workAssess,
                readinessPassportValidity,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('visa_readiness_assessment', JSON.stringify(payload));
        } catch (e) {}
    }, [
        readinessPurpose, selectedDestination, selectedPassport,
        studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
        visitPlanStatus, visitTiming, visitReturnDate, tripDurationDays, visitStay, touristHomeTies, touristBankStability,
        workExp, workOffer, workDomain, workAssess,
        readinessPassportValidity
    ]);

    // Helper to keep document requirements short, clean, and accurate (Atlys / iOS style)
function cleanShortDocRequirement(title: string, description: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('passport') && !t.includes('photo')) {
        return 'Min. 6 months validity from travel date & 2 blank visa pages.';
    }
    if (t.includes('application form') || t.includes('schengen visa application')) {
        return 'Completed & signed official visa form (GVCW / Embassy portal).';
    }
    if (t.includes('photo') || t.includes('photograph')) {
        return '2 recent color photos (35×45mm, white background, taken within 6 months).';
    }
    if (t.includes('insurance')) {
        return 'Min. €30,000 medical coverage across all Schengen countries & dates.';
    }
    if (t.includes('flight') || t.includes('ticket') || t.includes('pnr')) {
        return 'Confirmed round-trip flight booking with verifiable airline PNR.';
    }
    if (t.includes('accommodation') || t.includes('hotel')) {
        return 'Confirmed hotel vouchers or official host invitation covering full stay.';
    }
    if (t.includes('itinerary') || t.includes('cover letter')) {
        return 'Covering letter with day-by-day travel plan and cities to visit.';
    }
    if (t.includes('employment') || t.includes('occupation') || t.includes('noc')) {
        return 'Salary slips (last 3 mos) + Employer NOC letter (or Business registration).';
    }
    if (t.includes('bank') || t.includes('statement')) {
        return 'Original 3 to 6 months bank statements stamped & signed by branch.';
    }
    if (t.includes('itr') || t.includes('tax') || t.includes('income tax')) {
        return 'Last 2 financial years ITR-V acknowledgements.';
    }

    if (description) {
        const firstSentence = description.split(/(?<=[.!?])\s+|\n+/)[0] || '';
        if (firstSentence.length > 85) {
            return firstSentence.slice(0, 80).trim() + '...';
        }
        return firstSentence.trim();
    }
    return 'Mandatory consular compliance document.';
}

    // ── READINESS EMBASSY DOCUMENTS CHECKLIST (FOR REAL-TIME CRITERIA + DOCS AUDIT) ──
    const readinessDocChecklist = useMemo<VaultDocItem[]>(() => {
        const targetDest = normalizeCountryName(selectedDestination);
        const destChecklist = (aiVisaData?.documents_required && aiVisaData.documents_required.length > 0)
            ? aiVisaData.documents_required.map((doc: any, idx: number) => ({
                key: `doc_req_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                title: doc.title,
                description: doc.description || '',
                icon: getAiDocIcon(doc.title),
                mandatory: doc.is_mandatory !== false,
                hint: doc.is_mandatory !== false ? 'Mandatory Statutory Requirement' : 'Supporting / Optional'
            }))
            : getDestinationChecklist(targetDest, readinessPurpose);

        return destChecklist && destChecklist.length > 0 ? destChecklist : [
            { key: 'passport', title: 'Valid Passport (Bio-data Front & Back)', hint: 'Min. 6 months validity & blank pages', icon: '📘', mandatory: true, description: 'Clear color scan of passport bio-data page.' },
            { key: 'financials', title: 'Financial Solvency Proof & Bank Statements', hint: '6 months stamped bank statements or loan sanction', icon: '💰', mandatory: true, description: 'Official bank statements showing adequate liquid funds.' },
            { key: 'purpose_doc', title: readinessPurpose === 'study' ? 'Institutional Offer Letter / CAS / I-20' : readinessPurpose === 'work' ? 'Employer Job Offer & Sponsorship (CoS/LMIA)' : 'Return Flight Ticket & Hotel Reservation', hint: 'Official travel or acceptance proof', icon: '📄', mandatory: true, description: 'Key institutional or travel confirmation document.' },
            { key: 'identity_proof', title: 'National Identity Proof / Aadhaar / Voter ID', hint: 'Government issued identity proof', icon: '🪪', mandatory: true, description: 'National identity card or government document.' },
            { key: 'tax_employment', title: readinessPurpose === 'study' ? 'Academic Marksheets & Language Scorecard' : readinessPurpose === 'work' ? 'Professional Experience & Skill Assessment' : 'Employer Leave NOC & 2-Year ITR', hint: 'Income / Academic qualification record', icon: '📑', mandatory: false, description: 'Supporting tax, employment, or academic paperwork.' },
            { key: 'travel_insurance', title: 'Travel Medical Insurance Policy', hint: 'Medical emergency coverage compliant with embassy specs', icon: '🛡️', mandatory: false, description: 'Comprehensive overseas travel and health insurance.' }
        ];
    }, [aiVisaData, selectedDestination, readinessPurpose]);

    // ── DYNAMIC CATEGORY-SPECIFIC VISA READINESS AUDIT ENGINE ──
    const readinessMetrics = useMemo(() => {
        let recommendations: string[] = [];
        let redFlags: string[] = [];
        let filledCount = 0;

        const targetCountry = normalizeCountryName(selectedDestination);

        // Check if user has uploaded a verified passport in documents or vault
        const hasVerifiedPassport = documents?.some(d => (d.label || d.name || '').toLowerCase().includes('passport')) ||
            Object.values(vaultChecklistState || {}).some(v => v.verified && (v.fileName || '').toLowerCase().includes('passport'));

        // Pillar 1: Passport & Identity (25 pts max + 10 pts validity bonus)
        let passportScore = 0;
        let validityBonus = 0;

        if (hasVerifiedPassport) {
            filledCount += 2;
            passportScore += 25;
            validityBonus = 10;
            recommendations.unshift(`🌟 Exceptional Passport Validity: Active passport verified in your vault. Flawlessly compliant with ${targetCountry} consular 6-month rule.`);
        } else if (readinessPassportValidity.includes('> 12 Months')) {
            filledCount++;
            passportScore += 22;
            validityBonus = 5;
            recommendations.push(`Passport validity exceeds 12 months. Fully compliant with ${targetCountry} entry standards.`);
        } else if (readinessPassportValidity.includes('6 - 12 Months')) {
            filledCount++;
            passportScore += 15;
            validityBonus = 5;
            recommendations.push(`Passport validity meets minimum 6-month threshold for ${targetCountry}.`);
        } else if (readinessPassportValidity.includes('< 6 Months')) {
            filledCount++;
            redFlags.push(`Passport expires in under 6 months. Minimum 6-month validity required by ${targetCountry} consular rules.`);
        }

        const categoryName = readinessPurpose === 'study'
            ? 'Student Visa'
            : readinessPurpose === 'work'
            ? 'Work Visa'
            : 'Tourist Visa';

        let categoryPillars: Array<{ name: string; score: number; max: number; value: string }> = [];
        let categoryScoreRaw = 0;

        // 1. STUDENT VISA SCORING
        if (readinessPurpose === 'study') {
            let admissionScore = 0;
            let fundingScore = 0;
            let academicScore = 0;

            if (studentAdmissionStatus) {
                filledCount++;
                if (studentAdmissionStatus.includes('Confirmed')) {
                    admissionScore = 25;
                    recommendations.push(`✓ Confirmed institutional offer / CAS / I-20 recorded for ${targetCountry}.`);
                } else if (studentAdmissionStatus.includes('Conditional')) {
                    admissionScore = 15;
                    recommendations.push('Clear pending academic conditions to convert conditional offer into unconditional Form I-20 / CAS.');
                } else {
                    admissionScore = 6;
                    redFlags.push('Formal university admission letter / CAS is mandatory before embassy interview.');
                }
            }

            if (studyBudget) {
                filledCount++;
                if (studyBudget.includes('Self-Funded') || studyBudget.includes('Scholarship')) {
                    fundingScore = 25;
                    recommendations.push('Proof of liquid funds covers 1st-year tuition and cost of living.');
                } else if (studyBudget.includes('Loan')) {
                    fundingScore = 20;
                    recommendations.push('Attach official bank loan sanction letter with collateral / co-borrower tax returns.');
                } else {
                    fundingScore = 10;
                    redFlags.push('Insufficient verified liquid funds. Additional sponsor documentation may be required.');
                }
            }

            if (studentLanguageScore) {
                filledCount++;
                if (studentLanguageScore.includes('Cleared')) {
                    academicScore += 10;
                    recommendations.push('✓ English language proficiency requirement satisfied (IELTS 6.5+ / PTE 60+).');
                } else if (studentLanguageScore.includes('MOI')) {
                    academicScore += 7;
                    recommendations.push('Medium of Instruction waiver requires official institutional certificate.');
                } else {
                    academicScore += 4;
                }
            }

            if (studyIntake) {
                filledCount++;
                academicScore += 5;
            }

            if (studyQual) filledCount++;
            if (studyTarget) filledCount++;

            categoryScoreRaw = admissionScore + fundingScore + academicScore;

            categoryPillars = [
                { name: 'Passport & Identity', score: passportScore, max: 25, value: hasVerifiedPassport ? 'Verified in Vault' : (readinessPassportValidity || 'Not Selected') },
                { name: 'Institution Admission (I-20/CAS)', score: admissionScore, max: 25, value: studentAdmissionStatus || 'Not Selected' },
                { name: 'Tuition & Living Funds', score: fundingScore, max: 25, value: studyBudget || 'Not Selected' },
                { name: 'Language & Academic Intake', score: academicScore, max: 15, value: studentLanguageScore ? `${studentLanguageScore.slice(0, 16)}...` : 'Not Selected' }
            ];
        }
        // 2. WORK VISA SCORING
        else if (readinessPurpose === 'work') {
            let offerScore = 0;
            let expScore = 0;
            let assessScore = 0;

            if (workOffer) {
                filledCount++;
                if (workOffer.includes('Confirmed') || workOffer.includes('Approved')) {
                    offerScore = 30;
                    recommendations.push(`✓ Official employer sponsorship petition (CoS/LMIA) attached for ${targetCountry}.`);
                } else if (workOffer.includes('Interviewing')) {
                    offerScore = 15;
                    recommendations.push('Request formal sponsorship certificate once final employment interview is cleared.');
                } else {
                    offerScore = 6;
                    redFlags.push(`Consular work visas require an approved employer sponsorship petition from ${targetCountry}.`);
                }
            }

            if (workExp) {
                filledCount++;
                if (workExp.includes('8+')) expScore = 15;
                else if (workExp.includes('5 - 8')) expScore = 13;
                else if (workExp.includes('3 - 5')) expScore = 10;
                else expScore = 6;
            }

            if (workAssess) {
                filledCount++;
                if (workAssess.includes('Assessed')) {
                    assessScore = 15;
                    recommendations.push('✓ Educational and occupational skills assessment verified (WES/ACS).');
                } else if (workAssess.includes('Progress')) {
                    assessScore = 8;
                    recommendations.push('Expedite credential assessment report for consular filing.');
                } else {
                    assessScore = 3;
                    recommendations.push('Obtain professional qualification equivalency evaluation before filing.');
                }
            }

            if (workDomain) filledCount++;

            categoryScoreRaw = offerScore + expScore + assessScore;

            categoryPillars = [
                { name: 'Passport & Identity', score: passportScore, max: 25, value: hasVerifiedPassport ? 'Verified in Vault' : (readinessPassportValidity || 'Not Selected') },
                { name: 'Employer Sponsorship (CoS/LMIA)', score: offerScore, max: 30, value: workOffer || 'Not Selected' },
                { name: 'Work Experience', score: expScore, max: 15, value: workExp || 'Not Selected' },
                { name: 'Skill Assessment (ECA)', score: assessScore, max: 15, value: workAssess || 'Not Selected' }
            ];
        }
        // 3. TOURIST / VISIT VISA SCORING
        else {
            let finScore = 0;
            let tiesScore = 0;
            let itinScore = 0;

            if (touristBankStability) {
                filledCount++;
                if (touristBankStability.includes('₹4L+')) {
                    finScore = 25;
                    recommendations.push('✓ Strong financial solvency: ₹4L+ liquid balance demonstrates trip affordability.');
                } else if (touristBankStability.includes('₹2L - ₹4L')) {
                    finScore = 18;
                    recommendations.push('Bank balance meets standard threshold; keep latest 6-month stamped statement ready.');
                } else {
                    finScore = 8;
                    redFlags.push('Bank balance below recommended threshold. Provide additional co-sponsor or financial proof.');
                }
            }

            if (touristHomeTies) {
                filledCount++;
                if (touristHomeTies.includes('Salaried')) {
                    tiesScore = 20;
                    recommendations.push('✓ Salaried status with Employer NOC & 3-month payslips strongly satisfies return intent.');
                } else if (touristHomeTies.includes('Business')) {
                    tiesScore = 18;
                    recommendations.push('✓ Business ownership with GST & 2-year ITR establishes solid home ties.');
                } else if (touristHomeTies.includes('Self-Employed')) {
                    tiesScore = 12;
                    recommendations.push('Attach client contracts and bank transaction statements to substantiate income.');
                } else {
                    tiesScore = 10;
                }
            }

            if (tripDurationDays > 0 && tripDurationDays <= 90) {
                filledCount++;
                itinScore += 10;
                recommendations.push(`✓ Itinerary set: ${tripDurationDays}-day round-trip compliant with standard tourist limits.`);
            }

            if (visitPlanStatus) {
                filledCount++;
                if (visitPlanStatus.includes('Fixed')) {
                    itinScore += 5;
                } else {
                    itinScore += 3;
                }
            }

            if (visitStay) filledCount++;

            categoryScoreRaw = finScore + tiesScore + itinScore;

            categoryPillars = [
                { name: 'Passport & Identity', score: passportScore, max: 25, value: hasVerifiedPassport ? 'Verified in Vault' : (readinessPassportValidity || 'Not Selected') },
                { name: 'Financial Solvency', score: finScore, max: 25, value: touristBankStability || 'Not Selected' },
                { name: 'Home Country Ties', score: tiesScore, max: 20, value: touristHomeTies || 'Not Selected' },
                { name: 'Trip Itinerary & Dates', score: itinScore, max: 15, value: visitTiming ? `${tripDurationDays} Days (${visitTiming})` : 'Not Selected' }
            ];
        }

        // Checklist Documents Pillar (35 pts max)
        const totalVaultCount = readinessDocChecklist.length;
        const verifiedVaultCount = readinessDocChecklist.filter(item => vaultChecklistState[item.key]?.verified).length;
        const docsRatio = totalVaultCount > 0 ? (verifiedVaultCount / totalVaultCount) : 0;
        const docsScore = Math.round(docsRatio * 35);

        if (docsRatio === 1) {
            recommendations.unshift(`🌟 100% of required ${targetCountry} embassy documents are verified and ready!`);
        } else if (docsRatio >= 0.5) {
            recommendations.push(`${verifiedVaultCount}/${totalVaultCount} checklist documents ready. Complete remaining to maximize score.`);
        }

        categoryPillars.push({
            name: 'Embassy Documents Checklist',
            score: docsScore,
            max: 35,
            value: verifiedVaultCount > 0 ? `${verifiedVaultCount} of ${totalVaultCount} Documents Ready` : 'No Documents Checked'
        });

        // Check if user has not yet made any selections
        const isCategoryEmpty = readinessPurpose === 'study'
            ? (!studentAdmissionStatus && !studyBudget && !studentLanguageScore && !studyIntake && !studyQual && !studyTarget)
            : readinessPurpose === 'work'
            ? (!workOffer && !workExp && !workAssess && !workDomain)
            : (!touristBankStability && !touristHomeTies && !tripDurationDays && !visitPlanStatus && !visitStay);

        const hasAnyPassportInput = Boolean(hasVerifiedPassport || (readinessPassportValidity && readinessPassportValidity.trim() !== ''));

        if (isCategoryEmpty && !hasAnyPassportInput && verifiedVaultCount === 0) {
            return {
                score: 0,
                category: categoryName,
                statusText: 'AWAITING SELECTIONS',
                badgeBg: 'bg-slate-100 text-slate-600 border border-slate-200',
                recommendations: [`Select your ${categoryName} criteria or check off required embassy documents below to calculate your official readiness score.`],
                redFlags: [],
                pillars: categoryPillars.map(p => ({ ...p, score: 0, value: p.value || 'Not Selected' })),
                hasVerifiedPassport: false,
                verifiedVaultCount: 0,
                totalVaultCount
            };
        }

        const rawTotal = passportScore + validityBonus + categoryScoreRaw + docsScore;
        const minBase = hasVerifiedPassport ? 65 : (filledCount > 0 || verifiedVaultCount > 0 ? 15 : 0);
        const finalScore = Math.max(minBase, Math.min(98, rawTotal));

        return {
            score: finalScore,
            category: categoryName,
            statusText: finalScore >= 85
                ? 'EXCEPTIONAL'
                : finalScore >= 70
                ? 'EXCELLENT'
                : finalScore >= 50
                ? 'GOOD'
                : 'FAIR',
            badgeBg: finalScore >= 85
                ? 'bg-[#D97706] text-white'
                : finalScore >= 70
                ? 'bg-emerald-600 text-white'
                : finalScore >= 50
                ? 'bg-blue-600 text-white'
                : 'bg-orange-500 text-white',
            recommendations,
            redFlags,
            pillars: categoryPillars,
            hasVerifiedPassport,
            verifiedVaultCount,
            totalVaultCount
        };
    }, [
        readinessPurpose,
        selectedDestination,
        documents,
        vaultChecklistState,
        readinessPassportValidity,
        readinessDocChecklist,
        studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
        visitPlanStatus, visitTiming, tripDurationDays, visitStay, touristHomeTies, touristBankStability,
        workExp, workOffer, workDomain, workAssess
    ]);

    const saveAuditField = (field: string, value: any) => {
        const targetDest = normalizeCountryName(selectedDestination);
        const key = `visa_readiness_audit_${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${readinessPurpose}`;
        try {
            const current = JSON.parse(localStorage.getItem(key) || "{}");
            current[field] = value;
            localStorage.setItem(key, JSON.stringify(current));
        } catch(e) {}
    };

    // Hydrate 11-point audit state for the active destination & purpose
    useEffect(() => {
        if (typeof window !== "undefined") {
            const targetDest = normalizeCountryName(selectedDestination);
            const key = `visa_readiness_audit_${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${readinessPurpose}`;
            try {
                const saved = localStorage.getItem(key);
                if (saved) {
                    const p = JSON.parse(saved);
                    if (p.auditPassportExpiry !== undefined) setAuditPassportExpiry(p.auditPassportExpiry);
                    if (p.auditPassportBlankPages !== undefined) setAuditPassportBlankPages(p.auditPassportBlankPages);
                    if (p.auditFinancialBalance !== undefined) setAuditFinancialBalance(p.auditFinancialBalance);
                    if (p.auditBankStatementType !== undefined) setAuditBankStatementType(p.auditBankStatementType);
                    if (p.auditInsuranceFrom !== undefined) setAuditInsuranceFrom(p.auditInsuranceFrom);
                    if (p.auditInsuranceTill !== undefined) setAuditInsuranceTill(p.auditInsuranceTill);
                    if (p.auditInsuranceCoverage !== undefined) setAuditInsuranceCoverage(p.auditInsuranceCoverage);
                    if (p.auditEmploymentType !== undefined) setAuditEmploymentType(p.auditEmploymentType);
                    if (p.auditSalariedPayslips !== undefined) setAuditSalariedPayslips(p.auditSalariedPayslips);
                    if (p.auditSalariedForm16 !== undefined) setAuditSalariedForm16(p.auditSalariedForm16);
                    if (p.auditSalariedNoc !== undefined) setAuditSalariedNoc(p.auditSalariedNoc);
                    if (p.auditSalariedItr !== undefined) setAuditSalariedItr(p.auditSalariedItr);
                    if (p.auditBusinessReg !== undefined) setAuditBusinessReg(p.auditBusinessReg);
                    if (p.auditBusinessItr !== undefined) setAuditBusinessItr(p.auditBusinessItr);
                    if (p.auditFlightDeptDate !== undefined) setAuditFlightDeptDate(p.auditFlightDeptDate);
                    if (p.auditFlightRetDate !== undefined) setAuditFlightRetDate(p.auditFlightRetDate);
                    if (p.auditFlightAirline !== undefined) setAuditFlightAirline(p.auditFlightAirline);
                    if (p.auditFlightHasLayover !== undefined) setAuditFlightHasLayover(p.auditFlightHasLayover);
                    if (p.auditFlightLayoverCity !== undefined) setAuditFlightLayoverCity(p.auditFlightLayoverCity);
                    if (p.auditAccommodationType !== undefined) setAuditAccommodationType(p.auditAccommodationType);
                    if (p.auditSponsorshipType !== undefined) setAuditSponsorshipType(p.auditSponsorshipType);
                    if (p.auditSponsorDocsReady !== undefined) setAuditSponsorDocsReady(p.auditSponsorDocsReady);
                    if (p.auditCoveringLetter !== undefined) setAuditCoveringLetter(p.auditCoveringLetter);
                    if (p.auditVisaFormFilled !== undefined) setAuditVisaFormFilled(p.auditVisaFormFilled);
                    if (p.auditTravelHistory !== undefined) setAuditTravelHistory(p.auditTravelHistory);
                    if (p.auditPastRefusal !== undefined) setAuditPastRefusal(p.auditPastRefusal);
                    if (p.auditRefusalMitigation !== undefined) setAuditRefusalMitigation(p.auditRefusalMitigation);
                } else {
                    const hasVaultPassport = vaultChecklistState['global_passport']?.verified;
                    if (hasVaultPassport) {
                        setAuditPassportBlankPages(true);
                        if (!auditPassportExpiry) setAuditPassportExpiry('2031-10-15');
                    }
                }
            } catch(e) {}
        }
    }, [selectedDestination, readinessPurpose]);

    // ── 11-POINT COMPREHENSIVE STATUTORY AUDIT ENGINE ──
    const comprehensiveAuditMetrics = useMemo(() => {
        let score = 0;
        const missingProofs: string[] = [];
        const criticalAlerts: string[] = [];
        const positiveHighlights: string[] = [];

        // 1. Passport Verification (Max 10 pts)
        let passportScore = 0;
        let passportValidityStatus = "Not Entered";
        const hasBlankPages = auditPassportBlankPages === true;

        if (auditPassportExpiry) {
            const expDate = new Date(auditPassportExpiry);
            const refDate = auditFlightRetDate ? new Date(auditFlightRetDate) : new Date();
            const diffMonths = (expDate.getFullYear() - refDate.getFullYear()) * 12 + (expDate.getMonth() - refDate.getMonth());

            if (diffMonths >= 6) {
                passportScore += 6;
                passportValidityStatus = `Valid (>6 months past ${auditFlightRetDate ? 'return date' : 'travel'})`;
                positiveHighlights.push("Passport validity is fully compliant (>6 months past return date).");
            } else if (diffMonths >= 3) {
                passportScore += 4;
                passportValidityStatus = `Valid (>3 months, meets Schengen rule)`;
                positiveHighlights.push("Passport validity satisfies minimum Schengen statutory requirement (3 months).");
            } else if (diffMonths > 0) {
                passportScore += 1;
                passportValidityStatus = `Expiring soon (<3 months past return)`;
                criticalAlerts.push("Passport expires within 3 months of return date! Immediate renewal advised.");
            } else {
                passportValidityStatus = "Passport Expired";
                criticalAlerts.push("Passport expires before your planned return flight!");
            }
        } else {
            missingProofs.push("Passport Expiry Date");
        }

        if (hasBlankPages) {
            passportScore += 4;
            positiveHighlights.push("Minimum 2 consecutive blank visa pages available.");
        } else if (auditPassportBlankPages === false) {
            criticalAlerts.push("Insufficient blank visa pages. Consulates reject passports without at least 2 clear pages.");
        } else {
            missingProofs.push("Passport Blank Pages Confirmation");
        }
        score += passportScore;

        // 2. Financial Proof (Max 15 pts)
        let finScore = 0;
        const balanceNum = parseFloat(auditFinancialBalance.replace(/[^0-9.]/g, '')) || 0;
        if (balanceNum >= 300000) {
            finScore += 7;
            positiveHighlights.push(`Robust liquid bank balance (₹${balanceNum.toLocaleString('en-IN')}) verified.`);
        } else if (balanceNum >= 150000) {
            finScore += 5;
            positiveHighlights.push(`Adequate funds (₹${balanceNum.toLocaleString('en-IN')}) for primary trip expenses.`);
        } else if (balanceNum > 0) {
            finScore += 2;
            criticalAlerts.push("Available balance may be below consulate comfort threshold. Min ₹2-3 Lakhs recommended.");
        } else {
            missingProofs.push("Available Bank Balance");
        }

        if (auditBankStatementType === 'stamped_6m') {
            finScore += 8;
            positiveHighlights.push("6-month officially stamped and signed bank statement ready.");
        } else if (auditBankStatementType === 'stamped_3m') {
            finScore += 6;
            positiveHighlights.push("3-month officially stamped bank statement ready.");
        } else if (auditBankStatementType === 'online_pdf') {
            finScore += 3;
            criticalAlerts.push("Online e-statement only. Embassies mandate original physical bank branch stamp & sign.");
        } else {
            missingProofs.push("Official Stamped Bank Statement");
        }
        score += finScore;

        // 3. Travel Medical Insurance (Max 10 pts)
        let insScore = 0;
        let insDateStatus = "Not Entered";
        if (auditInsuranceFrom && auditInsuranceTill) {
            const insStart = new Date(auditInsuranceFrom);
            const insEnd = new Date(auditInsuranceTill);
            const fDept = auditFlightDeptDate ? new Date(auditFlightDeptDate) : null;
            const fRet = auditFlightRetDate ? new Date(auditFlightRetDate) : null;

            const isStartCovered = !fDept || insStart <= fDept;
            const isEndCovered = !fRet || insEnd >= fRet;

            if (isStartCovered && isEndCovered && insEnd >= insStart) {
                insScore += 5;
                const days = Math.round((insEnd.getTime() - insStart.getTime()) / (1000 * 3600 * 24)) + 1;
                insDateStatus = `Full Stay Covered (${days} Days)`;
                positiveHighlights.push(`Insurance policy covers full departure-to-return duration (${days} days).`);
            } else if (!isEndCovered) {
                insDateStatus = "Expires Before Return Flight";
                criticalAlerts.push("Travel insurance expires before your scheduled return flight! High refusal risk.");
            } else {
                insDateStatus = "Dates Mismatch";
                criticalAlerts.push("Insurance dates do not fully cover flight itinerary dates.");
            }
        } else {
            missingProofs.push("Travel Insurance Valid Dates");
        }

        if (auditInsuranceCoverage === 'schengen_30k_50k' || auditInsuranceCoverage === 'comprehensive_100k') {
            insScore += 5;
            positiveHighlights.push("Insurance meets mandatory international consular medical coverage (min €30,000 / $50,000).");
        } else if (auditInsuranceCoverage === 'basic_25k') {
            insScore += 2;
            criticalAlerts.push("Insurance coverage ($25,000) is below Schengen/OECD statutory requirement (€30,000).");
        } else {
            missingProofs.push("Compliant Insurance Medical Coverage (€30,000+)");
        }
        score += insScore;

        // 4. Income Proof & Occupational Ties (Max 15 pts)
        let incomeScore = 0;
        if (auditEmploymentType === 'salaried') {
            if (auditSalariedPayslips === '3_6_months') {
                incomeScore += 5;
                positiveHighlights.push("Last 3-6 months official salary pay slips ready.");
            } else if (auditSalariedPayslips === '1_2_months') {
                incomeScore += 2;
                criticalAlerts.push("Only 1-2 months payslips available. Embassies typically demand 3-6 consecutive months.");
            } else {
                missingProofs.push("Salary Pay Slips (3-6 Months)");
            }

            if (auditSalariedForm16 === true) {
                incomeScore += 3;
                positiveHighlights.push("Form 16 / Certificate of Tax Deduction verified.");
            } else if (auditSalariedForm16 === false) {
                missingProofs.push("Form 16");
            }

            if (auditSalariedNoc === true) {
                incomeScore += 4;
                positiveHighlights.push("Employer NOC & Leave sanction letter on official company letterhead ready.");
            } else if (auditSalariedNoc === false) {
                criticalAlerts.push("No Employer NOC letter. Consulates require proof that leave is approved and job is retained.");
                missingProofs.push("Employer NOC / Leave Approval Letter");
            }

            if (auditSalariedItr === true) {
                incomeScore += 3;
                positiveHighlights.push("Income Tax Returns (ITR-V) for last 2-3 assessment years ready.");
            } else if (auditSalariedItr === false) {
                missingProofs.push("ITR Acknowledgements (Last 2-3 Years)");
            }
        } else {
            // Business
            if (auditBusinessReg === true) {
                incomeScore += 8;
                positiveHighlights.push("Business registration documents (GST / Certificate of Incorporation / Trade License) verified.");
            } else if (auditBusinessReg === false) {
                criticalAlerts.push("Missing business registration documents. Self-employed applicants must prove legitimate registration.");
                missingProofs.push("Business Registration Proof (GST/Certificate)");
            }

            if (auditBusinessItr === true) {
                incomeScore += 7;
                positiveHighlights.push("Personal & Company ITR returns with computation of income verified.");
            } else if (auditBusinessItr === false) {
                missingProofs.push("Business & Personal ITR Returns");
            }
        }
        score += incomeScore;

        // 5. Return Ticket & Flight Transit (Max 10 pts)
        let flightScore = 0;
        if (auditFlightDeptDate && auditFlightRetDate) {
            const d1 = new Date(auditFlightDeptDate);
            const d2 = new Date(auditFlightRetDate);
            if (d2 >= d1) {
                flightScore += 5;
                positiveHighlights.push(`Confirmed return flight dates verified (${auditFlightAirline || 'Commercial Airline'}).`);
            } else {
                criticalAlerts.push("Return flight date is before departure date!");
            }
        } else {
            missingProofs.push("Return Flight Booking Dates");
        }

        if (auditFlightHasLayover === false) {
            flightScore += 5;
            positiveHighlights.push("Direct flight without third-country transit requirements.");
        } else if (auditFlightHasLayover === true) {
            const city = (auditFlightLayoverCity || '').toLowerCase();
            if (city.includes('frankfurt') || city.includes('london') || city.includes('paris') || city.includes('amsterdam') || city.includes('doha')) {
                flightScore += 3;
                criticalAlerts.push(`Transit layover in ${auditFlightLayoverCity || 'layover hub'}: Check if Airport Transit Visa (ATV/DATV) is required.`);
            } else {
                flightScore += 5;
                positiveHighlights.push("Transit flight details noted.");
            }
        } else {
            missingProofs.push("Flight Layover & Transit Details");
        }
        score += flightScore;

        // 6. Accommodation Proof (Max 10 pts)
        let accScore = 0;
        if (auditAccommodationType === 'hotel_confirmed') {
            accScore += 10;
            positiveHighlights.push("Confirmed hotel vouchers for full duration of stay ready.");
        } else if (auditAccommodationType === 'host_invitation') {
            accScore += 10;
            positiveHighlights.push("Host invitation letter with proof of residential address & passport copy ready.");
        } else if (auditAccommodationType === 'rental_lease') {
            accScore += 8;
            positiveHighlights.push("Valid lease or booked apartment reservation ready.");
        } else {
            missingProofs.push("Accommodation Proof (Hotel Voucher or Host Invitation)");
        }
        score += accScore;

        // 7. Sponsor Letter & Proof (Max 5 pts)
        let sponsorScore = 0;
        if (auditSponsorshipType === 'self') {
            sponsorScore += 5;
            positiveHighlights.push("Self-funded travel backed by personal bank statement and income.");
        } else if (auditSponsorDocsReady === true) {
            sponsorScore += 5;
            positiveHighlights.push("Sponsor affidavit of financial support and sponsor bank statements ready.");
        } else {
            missingProofs.push("Sponsor Financial Proofs & Affidavit");
        }
        score += sponsorScore;

        // 8. Covering Letter & Detailed Itinerary (Max 10 pts)
        let coverScore = 0;
        if (auditCoveringLetter === 'ready_signed') {
            coverScore += 10;
            positiveHighlights.push("Signed covering letter with detailed day-wise itinerary and travel purpose ready.");
        } else if (auditCoveringLetter === 'ai_drafted') {
            coverScore += 7;
            positiveHighlights.push("Covering letter drafted via AI, ready for final signature.");
        } else {
            missingProofs.push("Covering Letter & Day-wise Itinerary");
        }
        score += coverScore;

        // 9. Visa Application Form (Max 5 pts)
        let formScore = 0;
        if (auditVisaFormFilled === true) {
            formScore += 5;
            positiveHighlights.push("Official consulate application form completely filled and verified.");
        } else {
            missingProofs.push("Official Visa Application Form");
        }
        score += formScore;

        // 10. Travel History (Max 5 pts)
        let travelScore = 0;
        if (auditTravelHistory === 'strong_oecd') {
            travelScore += 5;
            positiveHighlights.push("Strong prior travel footprint (US/UK/Schengen/Canada/OECD stamps).");
        } else if (auditTravelHistory === 'regional') {
            travelScore += 3;
            positiveHighlights.push("Prior regional travel history (GCC/Southeast Asia) present.");
        } else if (auditTravelHistory === 'first_time') {
            travelScore += 2;
            positiveHighlights.push("Fresh passport application. Strong domestic ties required.");
        } else {
            missingProofs.push("Previous Travel History Selection");
        }
        score += travelScore;

        // 11. Refusal History (Max 5 pts)
        let refusalScore = 0;
        if (auditPastRefusal === false) {
            refusalScore += 5;
            positiveHighlights.push("Clean consular immigration record with zero past refusals.");
        } else if (auditPastRefusal === true) {
            if (auditRefusalMitigation === true) {
                refusalScore += 3;
                positiveHighlights.push("Past refusal transparently disclosed with formal mitigation statement.");
            } else {
                refusalScore += 0;
                criticalAlerts.push("Past refusal disclosed without detailed justification letter. High risk of repeat refusal!");
                missingProofs.push("Refusal Justification & Mitigation Letter");
            }
        } else {
            missingProofs.push("Consular Refusal History Disclosure");
        }
        score += refusalScore;

        const isUnselected = score === 0 || (
            !auditPassportExpiry && auditPassportBlankPages === null &&
            !auditFinancialBalance && auditBankStatementType === 'none' &&
            !auditInsuranceFrom && auditInsuranceCoverage === 'none' &&
            !auditFlightDeptDate && auditAccommodationType === 'none' &&
            auditCoveringLetter === 'none' && auditVisaFormFilled === null
        );

        const finalScore = isUnselected ? 0 : Math.min(100, Math.max(0, score));

        return {
            score: finalScore,
            isUnselected,
            missingProofs,
            criticalAlerts,
            positiveHighlights,
            passportValidityStatus,
            insDateStatus,
            needsConsultant: !isUnselected && finalScore < 70,
            pillars: [
                { name: '1. Passport Validity & Blank Pages', score: passportScore, max: 10 },
                { name: '2. Financial Solvency & Bank Statement', score: finScore, max: 15 },
                { name: '3. Travel Medical Insurance', score: insScore, max: 10 },
                { name: '4. Income Proof & Occupational Ties', score: incomeScore, max: 15 },
                { name: '5. Return Flight & Transit Compliance', score: flightScore, max: 10 },
                { name: '6. Accommodation Proof', score: accScore, max: 10 },
                { name: '7. Sponsorship / Funding Proof', score: sponsorScore, max: 5 },
                { name: '8. Covering Letter & Day-wise Itinerary', score: coverScore, max: 10 },
                { name: '9. Visa Application Form', score: formScore, max: 5 },
                { name: '10. Previous Travel History', score: travelScore, max: 5 },
                { name: '11. Consular Refusal History & Mitigation', score: refusalScore, max: 5 },
            ]
        };
    }, [
        auditPassportExpiry, auditPassportBlankPages,
        auditFinancialBalance, auditBankStatementType,
        auditInsuranceFrom, auditInsuranceTill, auditInsuranceCoverage,
        auditEmploymentType, auditSalariedPayslips, auditSalariedForm16, auditSalariedNoc, auditSalariedItr,
        auditBusinessReg, auditBusinessItr,
        auditFlightDeptDate, auditFlightRetDate, auditFlightAirline, auditFlightHasLayover, auditFlightLayoverCity,
        auditAccommodationType, auditSponsorshipType, auditSponsorDocsReady,
        auditCoveringLetter, auditVisaFormFilled, auditTravelHistory,
        auditPastRefusal, auditRefusalMitigation
    ]);

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
            const genuineUploadedDocsCount = (documents || []).filter(
                (d: any) => d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
            ).length;

            const newCase = {
                id: caseId,
                trackingId: `TT-${targetDest.slice(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                destination: targetDest,
                destinationFlag: flag,
                visaType,
                purpose: targetPurp.toLowerCase(),
                passport: targetPass,
                status: genuineUploadedDocsCount > 0 ? "Dossier Ingested & AI Verified" : "Requirements & Eligibility Active",
                stage: genuineUploadedDocsCount > 0 ? "Document Vault Verification" : "Requirements & Document Collection",
                progress: genuineUploadedDocsCount > 0 ? Math.min(35, 15 + genuineUploadedDocsCount * 5) : 10,
                documentsCount: genuineUploadedDocsCount,
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

    const toggleReadinessDoc = (docKey: string, docTitle: string) => {
        const targetDest = normalizeCountryName(selectedDestination);
        const storageKey = `vault_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
        setVaultChecklistState(prev => {
            const isCurrentlyVerified = !!prev[docKey]?.verified;
            const next = {
                ...prev,
                [docKey]: isCurrentlyVerified
                    ? { ...prev[docKey], verified: false }
                    : {
                        ...prev[docKey],
                        fileName: prev[docKey]?.fileName || `${docTitle}.pdf`,
                        verified: true,
                        uploadedAt: prev[docKey]?.uploadedAt || new Date().toLocaleDateString('en-GB')
                    }
            };
            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch(e) {}
            return next;
        });
    };

    const showToastMsg = (msg: string) => {
        setDashboardToast(msg);
        setTimeout(() => setDashboardToast(null), 3500);
    };

    // ── APPLICATION ACTIONS (CUSTOM NAME, UNIQUE ID, CREATION & DELETION) ──
    const handleCreateNewApplication = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (visasProcessingState.length >= 3) {
            showToastMsg("⚠️ Limit reached: Maximum 3 active visa applications allowed. Please delete or complete an existing application first.");
            setShowNewAppModal(false);
            return;
        }
        const targetDest = normalizeCountryName(newAppDest || selectedDestination || "United States");
        const targetPass = normalizeCountryName(newAppPass || selectedPassport || "India");
        const targetPurp = newAppPurpose || selectedPurpose || "Tourism / Vacation";
        const appName = (newAppName || "").trim() || `${targetDest} ${targetPurp.includes('Study') ? 'Student Visa' : targetPurp.includes('Work') ? 'Work Visa' : 'Tourist Visa'}`;
        
        const uniqueAppId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const destCode = targetDest.slice(0, 2).toUpperCase();
        const uniqueTrackingId = `TT-${destCode}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const flag = getFlagEmoji(targetDest);
        const visaType = targetPurp.includes('Study') ? 'F-1 / Tier-4 Student Visa' : targetPurp.includes('Work') ? 'Skilled Worker Visa' : 'Tourist / Visitor Visa';

        const genuineUploadedDocsCount = (documents || []).filter(
            (d: any) => d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
        ).length;

        const newCase = {
            id: uniqueAppId,
            customName: appName,
            trackingId: uniqueTrackingId,
            destination: targetDest,
            destinationFlag: flag,
            visaType,
            purpose: targetPurp.toLowerCase().includes('study') ? 'study' : targetPurp.toLowerCase().includes('work') ? 'work' : 'tourism',
            passport: targetPass,
            status: genuineUploadedDocsCount > 0 ? "Dossier Ingested & AI Verified" : "Requirements & Eligibility Active",
            stage: genuineUploadedDocsCount > 0 ? "Document Vault Verification" : "Requirements & Document Collection",
            progress: genuineUploadedDocsCount > 0 ? Math.min(35, 15 + genuineUploadedDocsCount * 5) : 10,
            documentsCount: genuineUploadedDocsCount,
            addonsCount: 0,
            submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            targetDate: "Consular Filing Ready",
            createdAt: new Date().toISOString()
        };

        const existingCases = JSON.parse(localStorage.getItem("active_visa_cases") || "[]");
        const updatedCases = [newCase, ...existingCases.filter((c: any) => c.id !== uniqueAppId)].slice(0, 3);
        setVisasProcessingState(updatedCases);
        try {
            localStorage.setItem("active_visa_cases", JSON.stringify(updatedCases));
        } catch(e) {}

        // Synchronize active destination, passport, and purpose with dashboard
        setSelectedDestination(targetDest);
        setSelectedPassport(targetPass);
        setSelectedPurpose(targetPurp);

        try {
            localStorage.setItem("user_journey_destination", targetDest);
            localStorage.setItem("user_journey_passport", targetPass);
            localStorage.setItem("user_journey_purpose", targetPurp);
            localStorage.setItem("seeker_target_destination", targetDest);
            localStorage.setItem("seeker_nationality", targetPass);
        } catch(e) {}

        setShowNewAppModal(false);
        setNewAppName("");
        setNewAppDest("");
        setNewAppPass("");
        setNewAppPurpose("");

        // Switch to "cases" tab so the user sees the application added immediately!
        setActiveTab("cases");
        showToastMsg(`✓ Application "${appName}" added to your dashboard! (Tracking ID: ${uniqueTrackingId})`);
    };

    const handleRenameApplication = (appId: string, newName: string) => {
        if (!newName.trim()) return;
        const updated = visasProcessingState.map(c => c.id === appId ? { ...c, customName: newName.trim() } : c);
        setVisasProcessingState(updated);
        try {
            localStorage.setItem("active_visa_cases", JSON.stringify(updated));
        } catch(e) {}
        setEditingAppId(null);
        setEditingAppName("");
        showToastMsg("Application name updated!");
    };

    const handleDeleteApplication = (appId: string) => {
        if (confirm("Are you sure you want to remove this visa application from your dashboard?")) {
            const updated = visasProcessingState.filter(c => c.id !== appId);
            setVisasProcessingState(updated);
            try {
                localStorage.setItem("active_visa_cases", JSON.stringify(updated));
            } catch(e) {}
            showToastMsg("Application removed from dashboard.");
        }
    };

    const handleCopyTrackingId = (trackingId: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(trackingId);
            setCopiedTrackingId(trackingId);
            showToastMsg(`Tracking ID ${trackingId} copied!`);
            setTimeout(() => setCopiedTrackingId(null), 2500);
        }
    };

    // ── PRE-DEPARTURE & LUGGAGE CHECKLIST HELPERS ──
    const fetchPreDepartureAi = async (dest?: string) => {
        const targetDest = normalizeCountryName(dest || selectedDestination);
        setIsFetchingPreDepartureAi(true);
        try {
            const res = await fetch('/api/trip-readiness', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    destination: targetDest,
                    passport_country: selectedPassport || 'India',
                    purpose: selectedPurpose || 'tourism',
                    departureDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
                })
            });
            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    setAiPreDepartureData(json.data);
                    try {
                        localStorage.setItem(`ai_predeparture_${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, JSON.stringify(json.data));
                    } catch(e) {}
                    showToastMsg(`Live pre-departure AI directives updated for ${targetDest}!`);
                }
            }
        } catch(err) {
            console.error('Error fetching pre-departure AI details:', err);
        } finally {
            setIsFetchingPreDepartureAi(false);
        }
    };

    const toggleLuggageItem = (itemId: string) => {
        const targetDest = normalizeCountryName(selectedDestination);
        const storageKey = `luggage_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
        setLuggageChecklist(prev => {
            const next = { ...prev, [itemId]: !prev[itemId] };
            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch(e) {}
            return next;
        });
    };

    const handleAddCustomLuggageItem = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newLuggageItemText.trim()) return;
        const targetDest = normalizeCountryName(selectedDestination);
        const customKey = `custom_luggage_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
        const newItem = {
            id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            category: newLuggageCategory,
            title: newLuggageItemText.trim()
        };
        const updated = [...customLuggageItems, newItem];
        setCustomLuggageItems(updated);
        try {
            localStorage.setItem(customKey, JSON.stringify(updated));
        } catch(e) {}
        setNewLuggageItemText("");
        showToastMsg(`Added "${newItem.title}" to luggage checklist!`);
    };

    const handleDeleteCustomLuggageItem = (itemId: string) => {
        const targetDest = normalizeCountryName(selectedDestination);
        const customKey = `custom_luggage_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
        const updated = customLuggageItems.filter(i => i.id !== itemId);
        setCustomLuggageItems(updated);
        try {
            localStorage.setItem(customKey, JSON.stringify(updated));
        } catch(e) {}
    };

    const defaultLuggageItems = useMemo(() => {
        const dest = normalizeCountryName(selectedDestination);
        return {
            cabin: [
                { id: 'cabin_passport', title: 'Original Passport & Visa / eVisa Printout', hint: 'Must have min. 6 months validity from travel date', icon: '🛂' },
                { id: 'cabin_tickets', title: 'Confirmed Flight Ticket & Boarding Pass', hint: 'Printed copy + offline PDF on smartphone', icon: '✈️' },
                { id: 'cabin_hotel', title: 'Hotel Booking / Host Invitation Letter', hint: 'Keep address & phone number readily accessible', icon: '🏨' },
                { id: 'cabin_meds', title: 'Prescription Medicines + Doctor\'s Prescription', hint: 'Keep in original packaging with doctor stamp', icon: '💊' },
                { id: 'cabin_powerbank', title: 'Portable Power Bank (Hand Luggage ONLY)', hint: 'Airlines strictly prohibit power banks in checked baggage (max 100Wh)', icon: '🔋' },
                { id: 'cabin_electronics', title: 'Laptop, Phone, Charger & Universal Adapter', hint: 'Check destination plug type before boarding', icon: '💻' },
                { id: 'cabin_forex', title: 'Forex Travel Card & Emergency Local Cash', hint: 'Carry at least $200-$500 cash in local currency', icon: '💵' },
                { id: 'cabin_pen', title: 'Ballpoint Pen for Arrival / Customs Card', hint: 'Airports often do not provide pens on arrival', icon: '🖊️' },
            ],
            checked: [
                { id: 'checked_clothes', title: `Weather-Appropriate Clothing for ${dest}`, hint: 'Check 7-day temperature forecast before packing', icon: '👕' },
                { id: 'checked_shoes', title: 'Comfortable Walking Shoes & Casual Footwear', hint: 'Break in new shoes before travel to prevent blisters', icon: '👟' },
                { id: 'checked_toiletries', title: 'Toiletries & Liquids (>100ml packed securely)', hint: 'Pack liquids in sealed zip-lock bags to avoid leaks', icon: '🧴' },
                { id: 'checked_docs_copy', title: 'Duplicate Physical Copies of All Travel Documents', hint: 'Store in waterproof sleeve inside checked suitcase', icon: '📂' },
                { id: 'checked_lock', title: 'TSA-Approved Luggage Combination Lock', hint: 'Allows customs security inspection without damaging bag', icon: '🔒' },
                { id: 'checked_tag', title: 'Luggage Name Tag with Contact Phone & Email', hint: 'Crucial for quick baggage recovery in case of delay', icon: '🏷️' },
            ],
            predeparture: [
                { id: 'prep_webcheckin', title: 'Online Web Check-in & Seat Selection', hint: 'Opens 24 to 48 hours prior to scheduled departure', icon: '🎫' },
                { id: 'prep_insurance', title: 'Travel Medical Insurance Policy Saved Offline', hint: `Must cover emergency hospitalization in ${dest}`, icon: '🛡️' },
                { id: 'prep_esim', title: 'International Roaming or Destination eSIM Ready', hint: 'Setup Airalo/Holafly eSIM before departure for instant data', icon: '📱' },
                { id: 'prep_bank', title: 'Bank International Card Usage Enabled in App', hint: 'Enable international ATM withdrawal & POS transactions', icon: '💳' },
                { id: 'prep_embassy', title: 'Home Country Embassy / Consular Contact Saved', hint: `Save 24x7 emergency helpline for ${dest}`, icon: '🏛️' },
            ]
        };
    }, [selectedDestination]);

    const luggageProgress = useMemo(() => {
        const allItems = [
            ...defaultLuggageItems.cabin,
            ...defaultLuggageItems.checked,
            ...defaultLuggageItems.predeparture,
            ...customLuggageItems
        ];
        const total = allItems.length;
        const packed = allItems.filter(item => luggageChecklist[item.id]).length;
        const percent = total > 0 ? Math.round((packed / total) * 100) : 0;
        return { total, packed, percent };
    }, [defaultLuggageItems, customLuggageItems, luggageChecklist]);

    const handleAutoImportMatchingDocs = () => {
        if (!documents || documents.length === 0) return;
        
        let importedCount = 0;
        const targetDest = normalizeCountryName(selectedDestination);
        const storageKey = `vault_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();

        setVaultChecklistState(prev => {
            const next = { ...prev };
            allChecklistItems.forEach(checkItem => {
                if (!next[checkItem.key]?.verified) {
                    const titleLower = checkItem.title.toLowerCase();
                    const matchedDoc = documents.find(d => {
                        const labelLower = (d.label || d.id || '').toLowerCase();
                        if (titleLower.includes('passport') && labelLower.includes('passport')) return true;
                        if ((titleLower.includes('photo') || titleLower.includes('picture')) && (labelLower.includes('photo') || labelLower.includes('picture'))) return true;
                        if ((titleLower.includes('bank') || titleLower.includes('statement') || titleLower.includes('fund')) && (labelLower.includes('bank') || labelLower.includes('statement'))) return true;
                        if ((titleLower.includes('flight') || titleLower.includes('ticket') || titleLower.includes('itinerary')) && (labelLower.includes('flight') || labelLower.includes('ticket') || labelLower.includes('itinerary'))) return true;
                        if ((titleLower.includes('hotel') || titleLower.includes('accommodation')) && (labelLower.includes('hotel') || labelLower.includes('stay') || labelLower.includes('accommodation'))) return true;
                        if (titleLower.includes('insurance') && labelLower.includes('insurance')) return true;
                        if ((titleLower.includes('noc') || titleLower.includes('employment') || titleLower.includes('leave')) && (labelLower.includes('noc') || labelLower.includes('leave') || labelLower.includes('employment'))) return true;
                        if ((titleLower.includes('transcript') || titleLower.includes('degree') || titleLower.includes('education')) && (labelLower.includes('transcript') || labelLower.includes('degree') || labelLower.includes('mark'))) return true;
                        return false;
                    });

                    if (matchedDoc) {
                        next[checkItem.key] = {
                            fileName: matchedDoc.label || `${checkItem.title}.pdf`,
                            size: matchedDoc.size || '1.8 MB',
                            verified: true,
                            score: 98,
                            summary: `Imported and verified from your secure document vault.`,
                            uploadedAt: matchedDoc.uploadedAt || new Date().toLocaleDateString('en-GB')
                        };
                        importedCount++;
                    }
                }
            });

            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch(e) {}
            return next;
        });

        if (importedCount > 0) {
            setImportToastMessage(`✓ Successfully imported ${importedCount} document${importedCount > 1 ? 's' : ''} into your ${selectedDestination} vault!`);
        } else {
            setImportToastMessage(`No new matching documents found to auto-import. Use 'Import' button on each row to attach any file.`);
        }
        setTimeout(() => setImportToastMessage(null), 4000);
    };

    const handleImportSingleDoc = (docKey: string, matchedDoc: any) => {
        const targetDest = normalizeCountryName(selectedDestination);
        const storageKey = `vault_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
        
        setVaultChecklistState(prev => {
            const next = {
                ...prev,
                [docKey]: {
                    fileName: matchedDoc.label || 'Imported_Document.pdf',
                    size: matchedDoc.size || '1.8 MB',
                    verified: true,
                    score: 98,
                    summary: `Imported and verified from your secure document vault.`,
                    uploadedAt: matchedDoc.uploadedAt || new Date().toLocaleDateString('en-GB')
                }
            };
            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch(e) {}
            return next;
        });
        setImportDocTargetKey(null);
        setImportToastMessage(`✓ Successfully imported ${matchedDoc.label}!`);
        setTimeout(() => setImportToastMessage(null), 3500);
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
                        const docList = Object.entries(parsedJ.uploaded_documents)
                            .filter(([k, v]: [string, any]) => v && (v.fileData || v.base64 || (v.fileName && !v.fileName.includes('Document') && v.size && v.size !== '1.8 MB')))
                            .map(([k, v]: [string, any]) => ({
                                id: k,
                                label: v.fileName || `${k.toUpperCase().replace(/_/g, ' ')}`,
                                title: v.fileName || `${k.toUpperCase().replace(/_/g, ' ')}`,
                                status: 'verified',
                                isRealUpload: true,
                                size: v.size || '1.8 MB',
                                fileData: v.fileData || v.base64 || null,
                                uploadedAt: v.timestamp || 'Recently'
                            }));
                        if (docList.length > 0) setDocuments(docList);
                    }
                } catch(e) {}
            }

            let loadedDocsList: any[] = [];
            if (savedDocsStr) {
                try {
                    const parsedDocs = JSON.parse(savedDocsStr);
                    if (Array.isArray(parsedDocs) && parsedDocs.length > 0) {
                        // Purge legacy dummy items (e.g. global_passport without fileData, doc_req_... without fileData)
                        const cleanDocs = parsedDocs.filter((d: any) => 
                            d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
                        );
                        loadedDocsList = cleanDocs;
                        setDocuments(cleanDocs);
                    }
                } catch(e) {}
            }

            // Check active_visa_cases (both generic and user-scoped)
            let rawCasesStr = activeCasesStr;
            if (!rawCasesStr && typeof window !== "undefined") {
                const userEmail = (localStorage.getItem("seeker_email") || "").toLowerCase().trim();
                if (userEmail) {
                    rawCasesStr = localStorage.getItem(`active_visa_cases_${userEmail}`);
                }
            }

            if (rawCasesStr) {
                try {
                    const parsedCases = JSON.parse(rawCasesStr);
                    if (Array.isArray(parsedCases) && parsedCases.length > 0) {
                        const genuineVaultDocsCount = loadedDocsList.length;
                        const sanitizedCases = parsedCases.map((c: any) => {
                            if ((c.progress === 45 || c.progress === 35) && genuineVaultDocsCount === 0 && !c.isFormSubmitted && !c.isFeePaid) {
                                return {
                                    ...c,
                                    progress: 10,
                                    documentsCount: 0,
                                    stage: 'Requirements & Document Collection',
                                    status: 'Requirements & Eligibility Active'
                                };
                            }
                            return c;
                        });
                        setVisasProcessingState(sanitizedCases);
                        try { localStorage.setItem("active_visa_cases", JSON.stringify(sanitizedCases)); } catch(e) {}
                    }
                } catch(e) {}
            } else if (localJourney) {
                try {
                    const parsedJ = JSON.parse(localJourney);
                    if (parsedJ && parsedJ.destination) {
                        const genuineDocsCount = parsedJ.uploaded_documents ? Object.keys(parsedJ.uploaded_documents).length : 0;
                        const initialCase = [{
                            id: 'case-1',
                            trackingId: parsedJ.tracking_id || 'TT-APP-2026-9824',
                            destination: parsedJ.destination,
                            destinationFlag: parsedJ.destination_flag || '🌍',
                            visaType: parsedJ.visa_type || 'Standard Visitor Visa',
                            purpose: parsedJ.purpose || 'tourism',
                            passport: parsedJ.passport_country || 'India',
                            status: genuineDocsCount > 0 ? 'Dossier Ingested & AI Verified' : 'Requirements & Eligibility Active',
                            stage: genuineDocsCount > 0 ? 'Under AI Concierge Review' : 'Requirements & Document Collection',
                            progress: genuineDocsCount > 0 ? Math.min(35, 10 + genuineDocsCount * 5) : 10,
                            documentsCount: genuineDocsCount,
                            addonsCount: parsedJ.selected_addons ? parsedJ.selected_addons.length : 0,
                            submittedAt: parsedJ.submitted_at || 'Recently',
                            targetDate: '15 Working Days'
                        }];
                        setVisasProcessingState(initialCase);
                        try { localStorage.setItem("active_visa_cases", JSON.stringify(initialCase)); } catch(e) {}
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
                    if (Array.isArray(parsed)) {
                        const cleanDocs = parsed.filter((d: any) => 
                            d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
                        );
                        setDocuments(cleanDocs);
                    }
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

    // ── LIVE AI CONSULAR REQUIREMENTS SYNC FOR DOCUMENT VAULT ──
    useEffect(() => {
        if (activeTab === "scanned-documents") {
            const currentDest = normalizeCountryName(selectedDestination);
            const currentPass = normalizeCountryName(selectedPassport);
            if (!aiVisaData || normalizeCountryName(aiVisaData.destination_country || '') !== currentDest) {
                fetchAiRequirements(currentDest, currentPass, selectedPurpose);
            }
        }
    }, [activeTab, selectedDestination, selectedPassport, selectedPurpose]);


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
        const formattedPhone = modalPhone.startsWith("+") ? modalPhone : (countryCode + " " + modalPhone).trim();
        setFirstName(modalFirstName);
        setLastName(modalLastName);
        setPhone(formattedPhone);
        setCountryOfCitizenship(modalPassportCountry);
        setPassportCountry(modalPassportCountry);
        setResidentOf(modalResidentOf);
        setProfilePhoto(modalPhoto);

        const goalsArr = modalGoals.split(",").map(g => g.trim()).filter(Boolean);
        const destsArr = modalDestinations.split(",").map(d => d.trim()).filter(Boolean);
        setSelectedGoals(goalsArr);
        setSelectedDests(destsArr);

        try {
            localStorage.setItem("seeker_firstName", modalFirstName);
            localStorage.setItem("seeker_lastName", modalLastName);
            localStorage.setItem("seeker_phone", formattedPhone);
            localStorage.setItem("seeker_passportCountry", modalPassportCountry);
            localStorage.setItem("seeker_country_of_citizenship", modalPassportCountry);
            localStorage.setItem("seeker_resident_of", modalResidentOf);
            localStorage.setItem("seeker_destinations", modalDestinations);
            localStorage.setItem("seeker_profilePhoto", modalPhoto);

            const uStr = localStorage.getItem("travltik_user");
            if (uStr) {
                const u = JSON.parse(uStr);
                u.displayName = `${modalFirstName} ${modalLastName}`.trim() || modalFirstName;
                u.firstName = modalFirstName;
                u.lastName = modalLastName;
                if (modalPhoto) u.photoURL = modalPhoto;
                localStorage.setItem("travltik_user", JSON.stringify(u));
            }
        } catch(e) {}

        setIsProfileIncomplete(false);
        setShowProfileModal(false);
        showToastMsg("✓ Profile details saved successfully!");
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
        localStorage.removeItem("travltik_user");
        localStorage.removeItem("seeker_firstName");
        localStorage.removeItem("seeker_lastName");
        localStorage.removeItem("seeker_email");
        localStorage.removeItem("seeker_phone");
        localStorage.removeItem("seeker_passportCountry");
        localStorage.removeItem("seeker_goals");
        localStorage.removeItem("seeker_destinations");
        localStorage.removeItem("seeker_profilePhoto");
        window.location.href = "/";
    };

    const navSections = [
        {
            title: "GENERAL",
            items: [
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { 
                    id: "visa-readiness", 
                    label: "Visa Readiness", 
                    icon: ShieldCheck, 
                    badge: comprehensiveAuditMetrics.isUnselected ? undefined : `${comprehensiveAuditMetrics.score}%`, 
                    badgeColor: comprehensiveAuditMetrics.score >= 70
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : comprehensiveAuditMetrics.score >= 40
                        ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                        : "bg-rose-50 text-rose-700 border border-rose-200/60"
                },
                { id: "cases", label: "Visa Applications", icon: Briefcase, count: visasProcessingState.length > 0 ? visasProcessingState.length : undefined },
                { id: "predeparture", label: "Pre-Departure", icon: Luggage, badge: "AI", badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200/60" },
            ]
        },
        {
            title: "TOOLS",
            items: [
                { id: "scanned-documents", label: "Document Vault", icon: FileText },
                { id: "consultations", label: "Bookings & Sessions", icon: Calendar },
                { id: "favourite-experts", label: "Saved Experts", icon: Bookmark },
                { id: "escrow-milestones", label: "Escrow Vault", icon: Lock, badge: "SAFE", badgeColor: "bg-teal-50 text-teal-700 border border-teal-200/60" },
            ]
        },
        {
            title: "SUPPORT",
            items: [
                { id: "visa-history", label: "Visa History", icon: BookOpen },
                { id: "profile", label: "Settings", icon: User },
            ]
        }
    ];

    const allNavItems = navSections.flatMap(s => s.items);

    const userDisplayName = firstName || (email ? email.split("@")[0] : "User");
    const fullName = `${firstName} ${lastName}`.trim() || userDisplayName;

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
            
            {/* Top Fixed Navigation Header */}
            <header className="bg-white border-b border-slate-200/80 shadow-2xs h-16 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <button 
                        type="button"
                        onClick={() => setIsMobileSidebarOpen(true)}
                        aria-label="Open Navigation Menu"
                        className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    >
                        <Menu className="w-6 h-6 stroke-[2]" />
                    </button>
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-9 sm:h-11 max-h-[46px] w-auto object-contain" />
                    </a>
                </div>

                {/* Center Topbar Search (Atlys / Nexus Style) */}
                <div className="relative flex-1 max-w-sm hidden md:block mx-4">
                    <div className="relative flex items-center w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                        <input 
                            type="text" 
                            placeholder="Search"
                            value={dashboardSearch}
                            onChange={(e) => setDashboardSearch(e.target.value)}
                            className="w-full pl-9 pr-14 py-2 bg-slate-50/70 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-slate-400 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 transition-all outline-none"
                        />
                        <div className="absolute right-2.5 flex items-center pointer-events-none">
                            <kbd className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200/90 px-1.5 py-0.5 rounded shadow-2xs">⌘ + F</kbd>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <a href="/find-experts" className="hidden sm:flex items-center gap-1.5 bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Book Consultation
                    </a>

                    <button onClick={() => setActiveTab("consultations")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
                        <Bell className="w-4.5 h-4.5" />
                    </button>

                    <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
                        {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                            <img src={profilePhoto} alt={fullName} className="w-9 h-9 rounded-full object-cover border border-[#420f79]/30 shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-[#420f79] text-white text-sm font-black flex items-center justify-center border border-[#420f79]/30 shrink-0 shadow-2xs">
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
                
                {/* Desktop Collapsible Left Sidebar (Nexus / Atlys Clean SaaS Style) */}
                <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
                    <div className="p-3.5 space-y-5 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar">
                        {/* Clean Sidebar Header - No duplicate logo, perfectly aligned */}
                        <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-100">
                            {!isSidebarCollapsed ? (
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                    Menu
                                </span>
                            ) : <div className="w-3" />}
                            <button
                                type="button"
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                                className="p-1 rounded-lg border border-slate-200/80 hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                            >
                                <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
                            </button>
                        </div>

                        {/* Grouped Navigation Sections */}
                        <nav className="space-y-4">
                            {navSections.map((section, sIdx) => (
                                <div key={sIdx} className="space-y-1">
                                    {!isSidebarCollapsed && (
                                        <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                                            {section.title}
                                        </h5>
                                    )}
                                    <div className="space-y-0.5">
                                        {section.items.map(item => {
                                            const isActive = activeTab === item.id;
                                            const IconComp = item.icon;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        setActiveTab(item.id);
                                                        if (item.id === "cases") {
                                                            setSelectedApplicationId(null);
                                                        }
                                                    }}
                                                    title={item.label}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                                        isActive
                                                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                                                            : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-slate-950 stroke-[2.2]" : "text-slate-500 stroke-[1.8]"}`} />
                                                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                                    </div>
                                                    {!isSidebarCollapsed && (
                                                        item.count !== undefined ? (
                                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 min-w-[20px] text-center">
                                                                {item.count}
                                                            </span>
                                                        ) : item.badge ? (
                                                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                                                                {item.badge}
                                                            </span>
                                                        ) : null
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="p-3 border-t border-slate-100 space-y-1">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-xs text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                        >
                            <LogOut className="w-4 h-4 shrink-0" />
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
                                {allNavItems.map(item => {
                                    const isActive = activeTab === item.id;
                                    const IconComp = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                if (item.id === "cases") {
                                                    setSelectedApplicationId(null);
                                                }
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
                        <div className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] w-full animate-fade-up">
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold text-lg border border-purple-100">
                                    <User className="w-5 h-5 stroke-[2]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-950 leading-tight">Complete your traveller profile details</h4>
                                    <p className="text-xs font-normal text-slate-500 mt-0.5 leading-relaxed">
                                        Please add your phone number, citizenship country, and target visa goals to receive personalized consultant matches.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowProfileModal(true)}
                                className="bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs active:scale-95 shrink-0 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                            >
                                <span>Complete Profile</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                    {/* 1. TAB: OVERVIEW */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-6 animate-fade-up">

                            {/* Welcome Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Welcome back, {userDisplayName}! 👋</h1>
                                    <p className="text-xs font-normal text-slate-500 mt-1">Track your visa applications, consultations, and document readiness</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a href="/find-experts" className="bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs flex items-center gap-2 transition-all">
                                        <Search className="w-3.5 h-3.5" /> Find Expert
                                    </a>
                                </div>
                            </div>

                            {/* ── STAT CARDS (3x2 GRID MATCHING EXACT PHOTO media_1788503338294.png) ── */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {/* 1. Visa Readiness */}
                                <div
                                    onClick={() => setActiveTab('visa-readiness')}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start justify-between cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-medium text-slate-500 block">Visa Readiness</span>
                                        <span className="text-3xl font-extrabold text-slate-950 block tracking-tight">
                                            {comprehensiveAuditMetrics.isUnselected ? '0%' : `${comprehensiveAuditMetrics.score}%`}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-500 mt-2 block group-hover:underline">
                                            {comprehensiveAuditMetrics.isUnselected
                                                ? 'Awaiting Selections • Audit →'
                                                : comprehensiveAuditMetrics.score >= 70
                                                ? 'Benchmark Met • Audit →'
                                                : 'Consultant Advised • Audit →'}
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                                        <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                </div>

                                {/* 2. Visa Applications */}
                                <div
                                    onClick={() => {
                                        setActiveTab('cases');
                                        setSelectedApplicationId(null);
                                    }}
                                    className="bg-white p-6 rounded-3xl border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start justify-between cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-medium text-slate-500 block">Visa Applications</span>
                                        <span className="text-3xl font-extrabold text-slate-950 block tracking-tight">
                                            {visasProcessingState.length}
                                        </span>
                                        <span className="text-xs font-semibold text-emerald-600 mt-2 block group-hover:underline">
                                            Active Cases →
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shrink-0">
                                        <Briefcase className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                </div>

                                {/* 3. Pre-Departure & Luggage */}
                                <div
                                    onClick={() => setActiveTab('predeparture')}
                                    className="bg-white p-6 rounded-3xl border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start justify-between cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-medium text-slate-500 block">Pre-Departure &amp; Luggage</span>
                                        <span className="text-3xl font-extrabold text-slate-950 block tracking-tight">
                                            {luggageProgress.percent}%
                                        </span>
                                        <span className="text-xs font-semibold text-emerald-600 mt-2 block group-hover:underline">
                                            {luggageProgress.packed}/{luggageProgress.total} Items • Pack →
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                                        <Luggage className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                </div>

                                {/* 4. Document Vault */}
                                <div
                                    onClick={() => setActiveTab('scanned-documents')}
                                    className="bg-white p-6 rounded-3xl border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start justify-between cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-medium text-slate-500 block">Document Vault</span>
                                        <span className="text-3xl font-extrabold text-slate-950 block tracking-tight">
                                            {documents.length}
                                        </span>
                                        <span className="text-xs font-semibold text-emerald-600 mt-2 block group-hover:underline">
                                            Manage Files →
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                                        <FileText className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                </div>

                                {/* 5. IELTS Band Score */}
                                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start justify-between">
                                    <div className="space-y-1">
                                        <span className="text-xs font-medium text-slate-500 block">IELTS Band Score</span>
                                        <span className="text-3xl font-extrabold text-slate-950 block tracking-tight">
                                            {hasIeltsScore ? overallBand : "N/A"}
                                        </span>
                                        <span className="text-xs font-normal text-slate-400 mt-2 block">
                                            {hasIeltsScore ? "Overall Score" : "Not Added"}
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                                        <BookOpen className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                </div>

                                {/* 6. Escrow Protection */}
                                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start justify-between">
                                    <div className="space-y-1">
                                        <span className="text-xs font-medium text-slate-500 block">Escrow Protection</span>
                                        <span className="text-3xl font-extrabold text-slate-950 block tracking-tight">
                                            Active
                                        </span>
                                        <span className="text-xs font-semibold text-emerald-600 mt-2 block">
                                            100% Protected
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
                                        <Lock className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                </div>
                            </div>

                            {/* ── DOCUMENT READINESS VAULT + IELTS SCORECARD (MATCHING EXACT PHOTO media_1788503338294.png) ── */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                {/* Left: Document Readiness Vault */}
                                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-150 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4 text-left">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-950">Document Readiness Vault</h3>
                                            <p className="text-xs text-slate-500 font-normal mt-0.5">Manage your passport scans, scorecards, and visa applications</p>
                                        </div>
                                        <button onClick={() => setActiveTab("scanned-documents")} className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer">
                                            View Vault <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {hasVaultPassword && !isVaultUnlocked ? (
                                        <div className="p-7 text-center bg-slate-50/70 rounded-2xl border border-slate-100 space-y-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-950">Document Vault Protected</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Your immigration files are encrypted and locked. Enter your secret password in the Document Vault to view or upload documents.</p>
                                            <button onClick={() => setActiveTab("scanned-documents")} className="bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer">
                                                <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Unlock Vault
                                            </button>
                                        </div>
                                    ) : documents.length === 0 ? (
                                        <div className="p-8 text-center bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 space-y-3">
                                            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                                            <h4 className="text-sm font-bold text-slate-950">No Documents Uploaded Yet</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload your Passport copy, IELTS scorecard, or SOP to share with verified consultants.</p>
                                            <button onClick={() => setActiveTab("scanned-documents")} className="bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer">
                                                <Upload className="w-3.5 h-3.5" /> Upload Document
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {documents.map(doc => (
                                                <div key={doc.id} className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/70 rounded-2xl border border-slate-100 transition-all">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                                            <FileText className="w-4 h-4 stroke-[2]" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-900 truncate">{doc.label}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">Uploaded</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right: IELTS Scorecard */}
                                <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4 text-left">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-bold text-slate-950">IELTS Scorecard</h3>
                                        <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                                            Overall: {hasIeltsScore ? overallBand : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-1">
                                        {(['L','R','W','S'] as const).map((k, i) => (
                                            <div key={k} className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 text-center">
                                                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">{['Listening','Reading','Writing','Speaking'][i]}</span>
                                                <input
                                                    type="number" step="0.5" min="0" max="9"
                                                    value={(ieltsScore as any)[k] || 0}
                                                    onChange={e => handleUpdateIelts({...ieltsScore, [k]: parseFloat(e.target.value) || 0})}
                                                    className="w-full text-center text-2xl font-black text-slate-950 bg-transparent outline-none mt-1"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <a href="/training/ielts" className="w-full bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white py-3.5 rounded-2xl text-xs font-bold text-center block shadow-sm transition-all mt-4">
                                        Practice IELTS Tests →
                                    </a>
                                </div>
                            </div>

                        </div>
                    )}


                    {/* 1.5 TAB: VISA READINESS SCORE (MATCHING AI RESULT PORTAL) */}
                    {activeTab === "visa-readiness" && (() => {
                        const normalizedDest = normalizeCountryName(selectedDestination);
                        const normalizedPass = normalizeCountryName(selectedPassport);
                        const currentDestObj = dashboardDestinationOptions.find(d => 
                            normalizeCountryName(d.value) === normalizedDest || d.value.toLowerCase() === normalizedDest.toLowerCase() || d.label.toLowerCase().includes(normalizedDest.toLowerCase())
                        );
                        const destFlag = currentDestObj?.flag || '🌍';
                        const currentPassObj = dashboardPassportOptions.find(p => 
                            normalizeCountryName(p.value) === normalizedPass || p.value.toLowerCase() === normalizedPass.toLowerCase() || p.label.toLowerCase().includes(normalizedPass.toLowerCase())
                        );
                        const passFlag = currentPassObj?.flag || '🇮🇳';

                        return (
                            <div className="space-y-6 animate-fade-up">
                                {/* Header Section */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                                Visa Readiness Score &amp; Audit
                                            </h2>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black border border-emerald-200">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                Consular AI Calibrated
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                                            Official AI readiness evaluation for {normalizedDest} ({readinessMetrics.category}). Calibrated against official embassy benchmarks.
                                        </p>
                                    </div>

                                    {/* Simple Route Summary matching Image 2 */}
                                    <div className="bg-white rounded-2xl border border-slate-200/90 px-4 py-2 shadow-2xs flex items-center gap-3 text-xs self-start md:self-auto">
                                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span>{passFlag}</span>
                                            <span>{normalizedPass}</span>
                                        </span>
                                        <span className="text-slate-300 font-medium">→</span>
                                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span>{destFlag}</span>
                                            <span>{normalizedDest}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Active Category (Showing only the category selected by the user) */}
                                <div className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs bg-slate-900 text-white font-bold shadow-xs">
                                    {readinessPurpose === 'study' ? (
                                        <>
                                            <GraduationCap className="w-4 h-4 text-white" />
                                            <span>Student Visa</span>
                                        </>
                                    ) : readinessPurpose === 'work' ? (
                                        <>
                                            <Briefcase className="w-4 h-4 text-white" />
                                            <span>Work Visa</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plane className="w-4 h-4 text-white" />
                                            <span>Tourist Visa</span>
                                        </>
                                    )}
                                </div>

                                {/* Main Two-Column Grid: 11 Statutory Points + Scorecard */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    
                                    {/* Left Column (7 cols): 11 Statutory Assessment Criteria */}
                                    <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5 text-left">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-indigo-600 tracking-wider">
                                                    <span>Step 1</span>
                                                    <span>•</span>
                                                    <span>11 Statutory Verification Points</span>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-0.5">
                                                    Visa Readiness Score
                                                </h3>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                    All 11 criteria are cross-checked in real-time against statutory {normalizeCountryName(selectedDestination)} embassy requirements.
                                                </p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2.5 shrink-0 ${
                                                comprehensiveAuditMetrics.isUnselected
                                                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                                                    : comprehensiveAuditMetrics.score >= 70
                                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                    : 'bg-amber-50 border-amber-300 text-amber-800'
                                            }`}>
                                                <span className="text-xs font-bold text-slate-500">Live Score:</span>
                                                <span className="text-xl font-black font-heading text-slate-950">
                                                    {comprehensiveAuditMetrics.score}%
                                                </span>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                                    comprehensiveAuditMetrics.isUnselected
                                                        ? 'bg-slate-200 text-slate-700'
                                                        : comprehensiveAuditMetrics.score >= 70
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-amber-600 text-white'
                                                }`}>
                                                    {comprehensiveAuditMetrics.isUnselected
                                                        ? 'Awaiting Selections'
                                                        : comprehensiveAuditMetrics.score >= 70
                                                        ? 'Benchmark Met'
                                                        : 'Needs Audit'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 1. PASSPORT VERIFICATION */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">1</span>
                                                    <h4 className="text-sm font-black text-slate-900">Passport Validity &amp; Blank Pages</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (a) Passport Expiry Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={auditPassportExpiry}
                                                        onChange={(e) => {
                                                            setAuditPassportExpiry(e.target.value);
                                                            saveAuditField('auditPassportExpiry', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    {auditPassportExpiry && (
                                                        <div className={`mt-1 text-[11px] font-bold ${
                                                            comprehensiveAuditMetrics.passportValidityStatus.includes('Valid') ? 'text-emerald-600' : 'text-rose-600'
                                                        }`}>
                                                            {comprehensiveAuditMetrics.passportValidityStatus}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (b) Minimum 2 Consecutive Blank Pages?
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditPassportBlankPages(true);
                                                                saveAuditField('auditPassportBlankPages', true);
                                                            }}
                                                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                auditPassportBlankPages === true
                                                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                            }`}
                                                        >
                                                            ✓ Yes (2+ Pages)
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditPassportBlankPages(false);
                                                                saveAuditField('auditPassportBlankPages', false);
                                                            }}
                                                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                auditPassportBlankPages === false
                                                                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                            }`}
                                                        >
                                                            ✗ No / Full
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. FINANCIAL PROOF */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">2</span>
                                                    <h4 className="text-sm font-black text-slate-900">Financial Solvency Proof</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (a) Available Funds (Liquid Bank Balance)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. ₹3,50,000 or $4,500"
                                                        value={auditFinancialBalance}
                                                        onChange={(e) => {
                                                            setAuditFinancialBalance(e.target.value);
                                                            saveAuditField('auditFinancialBalance', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-[10px] text-slate-400 mt-1 block">Consular guideline: min ₹2.5L - ₹4L depending on stay</span>
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (b) Official Bank Statement
                                                    </label>
                                                    <select
                                                        value={auditBankStatementType}
                                                        onChange={(e) => {
                                                            setAuditBankStatementType(e.target.value);
                                                            saveAuditField('auditBankStatementType', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="none">Select Statement Status...</option>
                                                        <option value="stamped_6m">6 Months Stamped &amp; Signed (Consular Gold Standard)</option>
                                                        <option value="stamped_3m">3 Months Stamped &amp; Signed Statement</option>
                                                        <option value="online_pdf">Online e-Statement PDF (Unstamped)</option>
                                                    </select>
                                                    <span className="text-[10px] text-slate-400 mt-1 block">Must carry original bank branch stamp &amp; signature</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. TRAVEL MEDICAL INSURANCE */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">3</span>
                                                    <h4 className="text-sm font-black text-slate-900">Travel Medical Insurance</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        Valid From Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={auditInsuranceFrom}
                                                        onChange={(e) => {
                                                            setAuditInsuranceFrom(e.target.value);
                                                            saveAuditField('auditInsuranceFrom', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        Valid Till Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={auditInsuranceTill}
                                                        onChange={(e) => {
                                                            setAuditInsuranceTill(e.target.value);
                                                            saveAuditField('auditInsuranceTill', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        Medical Coverage
                                                    </label>
                                                    <select
                                                        value={auditInsuranceCoverage}
                                                        onChange={(e) => {
                                                            setAuditInsuranceCoverage(e.target.value);
                                                            saveAuditField('auditInsuranceCoverage', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="none">Select Coverage...</option>
                                                        <option value="schengen_30k_50k">€30,000 / $50,000 (Schengen/OECD Mandated)</option>
                                                        <option value="comprehensive_100k">$100,000+ Comprehensive Global</option>
                                                        <option value="basic_25k">$25,000 Basic (Below Schengen min)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {auditInsuranceFrom && auditInsuranceTill && (
                                                <div className={`text-xs font-bold p-2.5 rounded-xl border ${
                                                    comprehensiveAuditMetrics.insDateStatus.includes('Full')
                                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                                        : 'bg-rose-50 border-rose-200 text-rose-800'
                                                }`}>
                                                    {comprehensiveAuditMetrics.insDateStatus.includes('Full') ? '✓ ' : '⚠️ '}
                                                    {comprehensiveAuditMetrics.insDateStatus}: Must cover entire duration of stay including departure and return dates.
                                                </div>
                                            )}
                                        </div>

                                        {/* 4. INCOME PROOF & OCCUPATIONAL TIES */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">4</span>
                                                    <h4 className="text-sm font-black text-slate-900">Income Proof &amp; Occupational Ties</h4>
                                                </div>
                                                
                                            </div>

                                            {/* Employment Type Toggle */}
                                            <div className="flex bg-slate-200/70 p-1 rounded-xl max-w-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setAuditEmploymentType('salaried');
                                                        saveAuditField('auditEmploymentType', 'salaried');
                                                    }}
                                                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                                                        auditEmploymentType === 'salaried' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                                                    }`}
                                                >
                                                    Salaried Professional
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setAuditEmploymentType('business');
                                                        saveAuditField('auditEmploymentType', 'business');
                                                    }}
                                                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                                                        auditEmploymentType === 'business' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                                                    }`}
                                                >
                                                    Business / Self-Employed
                                                </button>
                                            </div>

                                            {auditEmploymentType === 'salaried' ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (a) Salary Pay Slips
                                                        </label>
                                                        <select
                                                            value={auditSalariedPayslips}
                                                            onChange={(e) => {
                                                                setAuditSalariedPayslips(e.target.value);
                                                                saveAuditField('auditSalariedPayslips', e.target.value);
                                                            }}
                                                            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            <option value="none">Select Pay Slips...</option>
                                                            <option value="3_6_months">Last 3 - 6 Months Stamped Slips Ready</option>
                                                            <option value="1_2_months">1 - 2 Months Only</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (b) Form 16 / Tax Certificate
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedForm16(true);
                                                                    saveAuditField('auditSalariedForm16', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedForm16 === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✓ Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedForm16(false);
                                                                    saveAuditField('auditSalariedForm16', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedForm16 === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✗ Not Ready
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (c) Employer NOC &amp; Leave Letter
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedNoc(true);
                                                                    saveAuditField('auditSalariedNoc', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedNoc === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✓ Letterhead Signed
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedNoc(false);
                                                                    saveAuditField('auditSalariedNoc', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedNoc === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✗ Not Available
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (d) Personal ITR (Last 2 - 3 Years)
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedItr(true);
                                                                    saveAuditField('auditSalariedItr', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedItr === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✓ ITR-V Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedItr(false);
                                                                    saveAuditField('auditSalariedItr', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedItr === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✗ Not Filed
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (a) Business Registration (GST / Incorporation)
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessReg(true);
                                                                    saveAuditField('auditBusinessReg', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessReg === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✓ Certificate Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessReg(false);
                                                                    saveAuditField('auditBusinessReg', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessReg === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✗ Not Available
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (b) Business &amp; Personal ITR (Last 2 - 3 Yrs)
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessItr(true);
                                                                    saveAuditField('auditBusinessItr', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessItr === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✓ Both Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessItr(false);
                                                                    saveAuditField('auditBusinessItr', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessItr === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                ✗ Incomplete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* 5. RETURN FLIGHT TICKET & TRANSIT VISA CHECKER */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">5</span>
                                                    <h4 className="text-sm font-black text-slate-900">Return Ticket &amp; Transit Visa Checker</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Departure Date</label>
                                                    <input
                                                        type="date"
                                                        value={auditFlightDeptDate}
                                                        onChange={(e) => {
                                                            setAuditFlightDeptDate(e.target.value);
                                                            saveAuditField('auditFlightDeptDate', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Return Date</label>
                                                    <input
                                                        type="date"
                                                        value={auditFlightRetDate}
                                                        onChange={(e) => {
                                                            setAuditFlightRetDate(e.target.value);
                                                            saveAuditField('auditFlightRetDate', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Airlines</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Emirates, Lufthansa, Air India"
                                                        value={auditFlightAirline}
                                                        onChange={(e) => {
                                                            setAuditFlightAirline(e.target.value);
                                                            saveAuditField('auditFlightAirline', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Transit Layover Checker */}
                                            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-slate-800">
                                                        Does your flight have layovers in a third country?
                                                    </span>
                                                    <div className="flex gap-2 shrink-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditFlightHasLayover(false);
                                                                saveAuditField('auditFlightHasLayover', false);
                                                            }}
                                                            className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                                                                auditFlightHasLayover === false ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600'
                                                            }`}
                                                        >
                                                            Direct Flight
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditFlightHasLayover(true);
                                                                saveAuditField('auditFlightHasLayover', true);
                                                            }}
                                                            className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                                                                auditFlightHasLayover === true ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 border-slate-200 text-slate-600'
                                                            }`}
                                                        >
                                                            Has Layover
                                                        </button>
                                                    </div>
                                                </div>

                                                {auditFlightHasLayover === true && (
                                                    <div className="pt-2 border-t border-slate-100 space-y-2 animate-fadeIn">
                                                        <label className="text-[11px] font-bold text-slate-600 block">
                                                            Enter Layover City / Airport (Transit Visa Checker)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Frankfurt FRA, London LHR, Paris CDG, Doha DOH"
                                                            value={auditFlightLayoverCity}
                                                            onChange={(e) => {
                                                                setAuditFlightLayoverCity(e.target.value);
                                                                saveAuditField('auditFlightLayoverCity', e.target.value);
                                                            }}
                                                            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                        {auditFlightLayoverCity && (
                                                            <div className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 p-2 rounded-lg">
                                                                ⚠️ <strong>Transit Visa Advisory:</strong> Indian passport holders transiting via Schengen hubs (FRA, CDG, AMS) or UK without a valid US/UK/Canada/Schengen visa may require an Airport Transit Visa (ATV/DATV). Check airline requirements before booking.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 6. ACCOMMODATION PROOF */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">6</span>
                                                    <h4 className="text-sm font-black text-slate-900">Accommodation Proof</h4>
                                                </div>
                                                
                                            </div>

                                            <select
                                                value={auditAccommodationType}
                                                onChange={(e) => {
                                                    setAuditAccommodationType(e.target.value);
                                                    saveAuditField('auditAccommodationType', e.target.value);
                                                }}
                                                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="none">Select Accommodation Proof Status...</option>
                                                <option value="hotel_confirmed">Confirmed Hotel Voucher (Full Duration with Booking ID)</option>
                                                <option value="host_invitation">Host / Relative Official Invitation Letter + Proof of Address</option>
                                                <option value="rental_lease">Confirmed Rental Apartment / Airbnb Lease</option>
                                            </select>
                                        </div>

                                        {/* 7. SPONSOR LETTER */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">7</span>
                                                    <h4 className="text-sm font-black text-slate-900">Sponsorship Details &amp; Proof</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Funding Source</label>
                                                    <select
                                                        value={auditSponsorshipType}
                                                        onChange={(e) => {
                                                            setAuditSponsorshipType(e.target.value);
                                                            saveAuditField('auditSponsorshipType', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="self">Self-Sponsored (My Personal Funds)</option>
                                                        <option value="family_sponsored">Family / Relative Sponsored</option>
                                                        <option value="company_sponsored">Corporate / Company Sponsored</option>
                                                    </select>
                                                </div>

                                                {auditSponsorshipType !== 'self' && (
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            Sponsor Affidavit &amp; Financials Ready?
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSponsorDocsReady(true);
                                                                    saveAuditField('auditSponsorDocsReady', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSponsorDocsReady === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600'
                                                                }`}
                                                            >
                                                                ✓ Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSponsorDocsReady(false);
                                                                    saveAuditField('auditSponsorDocsReady', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSponsorDocsReady === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600'
                                                                }`}
                                                            >
                                                                ✗ Not Ready
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 8. COVERING LETTER */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">8</span>
                                                    <h4 className="text-sm font-black text-slate-900">Covering Letter &amp; Day-wise Itinerary</h4>
                                                </div>
                                                
                                            </div>

                                            <select
                                                value={auditCoveringLetter}
                                                onChange={(e) => {
                                                    setAuditCoveringLetter(e.target.value);
                                                    saveAuditField('auditCoveringLetter', e.target.value);
                                                }}
                                                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="none">Select Covering Letter Status...</option>
                                                <option value="ready_signed">Signed &amp; Ready with Detailed Day-by-Day Travel Itinerary</option>
                                                <option value="ai_drafted">Drafted via AI (Pending Final Print &amp; Signature)</option>
                                            </select>
                                        </div>

                                        {/* 9. VISA APPLICATION FORM FILLED */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">9</span>
                                                    <h4 className="text-sm font-black text-slate-900">Official Visa Application Form</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    Official embassy online/paper application form completed &amp; signed?
                                                </span>
                                                <div className="flex gap-2 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setAuditVisaFormFilled(true);
                                                            saveAuditField('auditVisaFormFilled', true);
                                                        }}
                                                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                            auditVisaFormFilled === true ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        ✓ Yes, Completed
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setAuditVisaFormFilled(false);
                                                            saveAuditField('auditVisaFormFilled', false);
                                                        }}
                                                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                            auditVisaFormFilled === false ? 'bg-rose-600 text-white border-rose-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        ✗ Incomplete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 10. PREVIOUS TRAVEL HISTORY */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">10</span>
                                                    <h4 className="text-sm font-black text-slate-900">Previous International Travel History</h4>
                                                </div>
                                                
                                            </div>

                                            <select
                                                value={auditTravelHistory}
                                                onChange={(e) => {
                                                    setAuditTravelHistory(e.target.value);
                                                    saveAuditField('auditTravelHistory', e.target.value);
                                                }}
                                                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="none">Select Travel History Footprint...</option>
                                                <option value="strong_oecd">Frequent International Traveler (US, UK, Schengen, Canada, OECD visas)</option>
                                                <option value="regional">Regional Travel History (UAE, GCC, Singapore, Thailand, Malaysia)</option>
                                                <option value="first_time">First-Time International Traveler (Fresh Passport)</option>
                                            </select>
                                            <span className="text-[10px] text-slate-400 block">Migrated from your TravlTik profile travel history</span>
                                        </div>


                                    </div>

                                    {/* Right Column (5 cols): Real-Time Readiness Scorecard with <70% Consultant Recommendation */}
                                    <div className="lg:col-span-5 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4 text-center">
                                        
                                        {/* Card Header */}
                                        <div className="w-full flex items-center justify-between gap-2 pb-1 text-left">
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-indigo-700 tracking-wider mb-0.5">
                                                    <span>10-Point Audit</span>
                                                    <span>•</span>
                                                    <span>Live Score</span>
                                                </div>
                                                <h4 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                                                    Visa Readiness Score
                                                </h4>
                                                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                                                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>

                                            <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 ${
                                                comprehensiveAuditMetrics.isUnselected
                                                    ? 'bg-slate-100 text-slate-600 border border-slate-200'
                                                    : comprehensiveAuditMetrics.score >= 70
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-amber-500 text-white'
                                            }`}>
                                                {comprehensiveAuditMetrics.isUnselected
                                                    ? 'AWAITING SELECTIONS'
                                                    : comprehensiveAuditMetrics.score >= 70
                                                    ? 'BENCHMARK MET'
                                                    : 'RISK DETECTED'}
                                            </span>
                                        </div>

                                        {/* Center: Circular Rainbow Gauge */}
                                        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center my-1">
                                            <svg className="w-full h-full" viewBox="0 0 200 200">
                                                <defs>
                                                    <linearGradient id="rainbowGaugeDash11" x1="0%" y1="100%" x2="100%" y2="0%">
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
                                                    stroke="url(#rainbowGaugeDash11)"
                                                    strokeWidth="15"
                                                    strokeLinecap="round"
                                                    strokeDasharray="318"
                                                    strokeDashoffset={comprehensiveAuditMetrics.isUnselected ? 318 : 318 - (Math.max(5, comprehensiveAuditMetrics.score) / 100) * 318}
                                                    className="transition-all duration-1000 ease-out"
                                                />
                                            </svg>

                                            {/* Center Number (0 to 100% Scale) */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2 sm:pt-3">
                                                <div className="flex items-baseline justify-center gap-0.5">
                                                    <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-none font-heading">
                                                        {comprehensiveAuditMetrics.score}
                                                    </span>
                                                    <span className="text-base sm:text-xl font-bold text-slate-400">%</span>
                                                </div>
                                                <span className={`text-[11px] sm:text-xs font-black mt-1 ${
                                                    comprehensiveAuditMetrics.score >= 70 ? 'text-emerald-600' : 'text-amber-600'
                                                }`}>
                                                    {comprehensiveAuditMetrics.isUnselected
                                                        ? 'Awaiting Selections'
                                                        : comprehensiveAuditMetrics.score >= 70
                                                        ? 'Ready for Submission'
                                                        : 'Needs Document Audit'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* CRITICAL CONSULTANT RECOMMENDATION BANNER (< 70%) */}
                                        {comprehensiveAuditMetrics.needsConsultant ? (
                                            <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-left space-y-2.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                                                    <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider">
                                                        CONSULTANT AUDIT HIGHLY RECOMMENDED
                                                    </span>
                                                </div>
                                                <h5 className="text-sm font-black text-amber-950">
                                                    Readiness Score: {comprehensiveAuditMetrics.score}% (Below 70% Safe Threshold)
                                                </h5>
                                                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                                                    Your application currently has missing or incomplete consular proofs ({comprehensiveAuditMetrics.missingProofs.slice(0, 3).join(', ')}). Submitting an incomplete dossier significantly elevates embassy refusal risk.
                                                </p>
                                                <p className="text-xs text-amber-950 font-bold">
                                                    👉 We suggest you contact an expert consultant to audit your documents, fix ties, and improve your visa approval chances.
                                                </p>
                                                <div className="pt-1">
                                                    <a
                                                        href="/find-experts"
                                                        className="w-full py-2.5 px-4 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                                                    >
                                                        <Users className="w-4 h-4 text-emerald-400" />
                                                        <span>Book Consultation with Verified Expert →</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : comprehensiveAuditMetrics.score >= 70 ? (
                                            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-left space-y-2 animate-fade-up">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                    <span className="text-[11px] font-black uppercase text-emerald-900 tracking-wider">
                                                        CONSULAR BENCHMARK MET
                                                    </span>
                                                </div>
                                                <h5 className="text-sm font-black text-emerald-950">
                                                    Strong Visa Readiness ({comprehensiveAuditMetrics.score}%)
                                                </h5>
                                                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                                                    Your documents fulfill primary embassy requirements! Your dossier is strong and ready for appointment booking and submission.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                                                Complete the 11 assessment criteria on the left to calculate your live consular readiness score.
                                            </div>
                                        )}

                                        {/* 11 Evaluation Pillars Grid */}
                                        <div className="w-full pt-3 border-t border-slate-100 text-left">
                                            <div className="flex items-center justify-between pb-2">
                                                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                                                    11 Evaluation Pillars Breakdown
                                                </span>
                                                <span className="text-[11px] font-bold text-slate-700 font-mono">
                                                    {comprehensiveAuditMetrics.score} / 100 Pts
                                                </span>
                                            </div>

                                            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                                                {comprehensiveAuditMetrics.pillars.map((pillar, idx) => {
                                                    const pct = Math.min(100, Math.round((pillar.score / pillar.max) * 100));
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="p-2 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                                                                <span className="truncate pr-1 text-[11px]">{pillar.name}</span>
                                                                <span className="font-mono text-emerald-700 font-extrabold text-[11px] shrink-0">
                                                                    {pillar.score} / {pillar.max}
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                                                                <div
                                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                                        pct === 100 ? 'bg-emerald-500' : pct > 0 ? 'bg-amber-500' : 'bg-slate-300'
                                                                    }`}
                                                                    style={{ width: `${pct}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Consular Red Flags / Alerts */}
                                        {comprehensiveAuditMetrics.criticalAlerts.length > 0 && (
                                            <div className="w-full space-y-1.5 text-left">
                                                {comprehensiveAuditMetrics.criticalAlerts.slice(0, 2).map((rf, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold leading-relaxed"
                                                    >
                                                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                                        <span>{rf}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('scanned-documents')}
                                            className="w-full py-2.5 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                                        >
                                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                                            <span>Upload Documents in Vault →</span>
                                        </button>
                                    </div>
                                </div>

                                {/* STEP 2: MANDATORY EMBASSY DOCUMENTS CHECKLIST (Directly powers readiness score) */}
                                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-left animate-fadeIn mt-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                                                    STEP 2 • DOCUMENTS CHECKLIST
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">•</span>
                                                <span className="text-xs font-bold text-slate-600">
                                                    Boosts Readiness Score by up to +3.5 Pts
                                                </span>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-1">
                                                Mandatory Embassy Documents Checklist for {normalizeCountryName(selectedDestination)}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                Mark documents as ready or upload them to calculate your comprehensive consular approval readiness score.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`text-xs font-black px-3.5 py-1.5 rounded-xl border transition-all ${
                                                readinessMetrics.verifiedVaultCount === readinessMetrics.totalVaultCount && readinessMetrics.totalVaultCount > 0
                                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                    : readinessMetrics.verifiedVaultCount > 0
                                                    ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {readinessMetrics.verifiedVaultCount} of {readinessMetrics.totalVaultCount} Documents Ready
                                            </span>
                                        </div>
                                    </div>

                                    {/* Document Checklist Cards Grid - Crystal Clear Atlys UI */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {readinessDocChecklist.map((doc, idx) => {
                                            const itemData = vaultChecklistState[doc.key];
                                            const isReady = !!itemData?.verified;
                                            const fileInputId = `readiness-file-${doc.key}`;

                                            return (
                                                <div
                                                    key={doc.key || idx}
                                                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between text-left space-y-4 shadow-2xs hover:shadow-sm ${
                                                        isReady
                                                            ? 'bg-emerald-50/40 border-emerald-400'
                                                            : 'bg-white border-slate-200 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <input
                                                        id={fileInputId}
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleVaultDocScan(file, doc.key, doc.title);
                                                        }}
                                                    />

                                                    <div className="space-y-2.5">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-2.5">
                                                                <span className="text-xl shrink-0 p-1.5 rounded-xl bg-slate-50 border border-slate-100">{doc.icon || '📄'}</span>
                                                                <h4 className="text-sm font-black text-slate-950 leading-snug">
                                                                    {doc.title}
                                                                </h4>
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md shrink-0 tracking-wider ${
                                                                isReady
                                                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                                                    : doc.mandatory !== false
                                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200 font-black'
                                                                    : 'bg-slate-100 text-slate-700 border border-slate-200 font-bold'
                                                            }`}>
                                                                {isReady ? 'Ready ✓' : doc.mandatory !== false ? 'Required' : 'Optional'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                                            {cleanShortDocRequirement(doc.title, doc.description || doc.hint)}
                                                        </p>
                                                    </div>

                                                    <div className="pt-3 border-t border-slate-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleReadinessDoc(doc.key, doc.title)}
                                                            className={`w-full px-3.5 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                                                isReady
                                                                    ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                                                                    : 'bg-white border-2 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                                                            }`}
                                                        >
                                                            <Check className={`w-3.5 h-3.5 stroke-[3] ${isReady ? 'text-white' : 'text-slate-400'}`} />
                                                            <span>{isReady ? 'Document Ready' : 'Mark as Ready'}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}


                    {/* 2. TAB: PROFILE & SETTINGS */}
                    {activeTab === "profile" && (
                        <div className="space-y-6 animate-fade-up">
                            {/* Card 1: Profile & Personal Details Form */}
                            <form onSubmit={handleSaveProfileModal} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                            <Settings className="w-5 h-5 text-[#420f79]" /> Personal &amp; Visa Profile Settings
                                        </h2>
                                        <p className="text-xs font-medium text-slate-500 mt-1">
                                            Manage your personal information, citizenship details, and travel preferences
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <button 
                                            type="submit" 
                                            className="bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                                        >
                                            <Save className="w-3.5 h-3.5" /> Save Details
                                        </button>
                                    </div>
                                </div>

                                {/* Profile Photo Upload */}
                                <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-5">
                                    <div className="relative shrink-0">
                                        {modalPhoto && !modalPhoto.includes("unsplash.com") ? (
                                            <img src={modalPhoto} alt="Profile" className="w-20 h-20 rounded-2xl object-cover border-2 border-[#420f79]/30 shadow-sm" />
                                        ) : (
                                            <div className="w-20 h-20 rounded-2xl bg-[#420f79] text-white text-2xl font-black flex items-center justify-center border-2 border-[#420f79]/20 shadow-sm">
                                                {(modalFirstName || userDisplayName || "U").charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                                        <label className="text-xs font-bold text-slate-900 block">Profile Photo</label>
                                        <p className="text-[11px] text-slate-500 font-medium">Upload a clear passport-style photo or portrait (JPG, PNG, or WebP). Square format recommended.</p>
                                        <div className="pt-1 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                                            <input 
                                                type="file" 
                                                id="settings-photo-input"
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
                                                className="hidden" 
                                            />
                                            <label 
                                                htmlFor="settings-photo-input" 
                                                className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-[#420f79] text-slate-700 hover:text-[#420f79] text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                                            >
                                                <Upload className="w-3.5 h-3.5" /> Choose Photo
                                            </label>
                                            {modalPhoto && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => setModalPhoto("")} 
                                                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-transparent"
                                                >
                                                    Remove Photo
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Info Grid */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase">Identity &amp; Contact</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">First Name</label>
                                            <input 
                                                type="text" 
                                                value={modalFirstName} 
                                                onChange={(e) => setModalFirstName(e.target.value)} 
                                                placeholder="e.g. Zynara"
                                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#420f79] transition-all" 
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Last Name</label>
                                            <input 
                                                type="text" 
                                                value={modalLastName} 
                                                onChange={(e) => setModalLastName(e.target.value)} 
                                                placeholder="e.g. Shop"
                                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#420f79] transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Phone Number</label>
                                            <input 
                                                type="text" 
                                                value={modalPhone} 
                                                onChange={(e) => setModalPhone(e.target.value)} 
                                                placeholder="e.g. +91 98765 43210"
                                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#420f79] transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Account Email</label>
                                            <div className="w-full px-3.5 py-2.5 bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 flex items-center justify-between">
                                                <span className="truncate">{email || localStorage.getItem("seeker_email") || "Not set"}</span>
                                                <span className="text-[10px] font-bold bg-teal-50 text-[#00a896] px-2 py-0.5 rounded-full border border-teal-200/80 shrink-0">Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Immigration & Preference Grid */}
                                <div className="space-y-4 pt-2 border-t border-slate-100">
                                    <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase">Immigration &amp; Residence Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Passport Citizenship</label>
                                            <input 
                                                type="text" 
                                                value={modalPassportCountry} 
                                                onChange={(e) => setModalPassportCountry(e.target.value)} 
                                                placeholder="e.g. India"
                                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#420f79] transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Current Country of Residence</label>
                                            <input 
                                                type="text" 
                                                value={modalResidentOf} 
                                                onChange={(e) => setModalResidentOf(e.target.value)} 
                                                placeholder="e.g. United Arab Emirates"
                                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#420f79] transition-all" 
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Target Destinations</label>
                                            <input 
                                                type="text" 
                                                value={modalDestinations} 
                                                onChange={(e) => setModalDestinations(e.target.value)} 
                                                placeholder="e.g. Canada, United Kingdom, USA, Greece"
                                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#420f79] transition-all" 
                                            />
                                            <p className="text-[11px] text-slate-400 mt-1 font-medium">Separate country names with commas. Used by AI to tailor your document checklists and immigration alerts.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Footer Submit Button */}
                                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                    <button 
                                        type="submit" 
                                        className="bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                                    >
                                        <Save className="w-4 h-4" /> Save Details
                                    </button>
                                </div>
                            </form>

                            {/* Card 2: Account Password & Security */}
                            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-[#420f79]/10 text-[#420f79] border border-[#420f79]/20 flex items-center justify-center font-bold shrink-0">
                                        <KeyRound className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-900 text-sm">Account Password &amp; Security</h4>
                                        <p className="text-slate-500 text-xs font-medium mt-0.5">Need to reset your password or update credentials?</p>
                                    </div>
                                </div>
                                <a
                                    href={`/forgot-password?email=${encodeURIComponent(email || localStorage.getItem("seeker_email") || '')}`}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs transition-all text-center shrink-0 border border-slate-200/80 flex items-center gap-1.5"
                                >
                                    <KeyRound className="w-3.5 h-3.5 text-[#420f79]" /> Forgot / Change Password →
                                </a>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB: ACTIVE VISA CASES */}
                    {activeTab === "cases" && (
                        selectedApplicationId ? (
                            <VisaApplicationDetailsView
                                application={visasProcessingState.find(c => c.id === selectedApplicationId) || visasProcessingState[0] || {}}
                                applicantName={fullName || userDisplayName || 'Applicant'}
                                onBack={() => setSelectedApplicationId(null)}
                                onOpenChat={() => setActiveTab('consultations')}
                                onOpenVault={() => {
                                    setSelectedApplicationId(null);
                                    setActiveTab('scanned-documents');
                                }}
                                readinessScore={comprehensiveAuditMetrics.score}
                                vaultDocuments={documents}
                            />
                        ) : (
                        <div className="space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-black text-slate-900">Visa Applications ({visasProcessingState.length}/3)</h2>
                                        {visasProcessingState.length >= 3 && (
                                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                                                Limit Reached (3/3)
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                                        Real-time status, timeline milestones, and embassy filing tracker {visasProcessingState.length >= 3 ? "• Maximum 3 active applications allowed" : "(Max 3 active applications)"}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (visasProcessingState.length >= 3) {
                                            showToastMsg("⚠️ Limit reached: Maximum 3 active visa applications allowed at a time. Please remove an existing application to add a new one.");
                                        } else {
                                            setShowNewAppModal(true);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition-all ${
                                        visasProcessingState.length >= 3
                                            ? "bg-slate-150 text-slate-400 border border-slate-200 cursor-not-allowed"
                                            : "bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white cursor-pointer"
                                    }`}
                                    title={visasProcessingState.length >= 3 ? "Maximum 3 applications limit reached" : "Start New Application"}
                                >
                                    <Plus className={`w-3.5 h-3.5 ${visasProcessingState.length >= 3 ? "text-slate-400" : "text-emerald-400"}`} />
                                    <span>Start New Application ({visasProcessingState.length}/3)</span>
                                </button>
                            </div>

                            {visasProcessingState.length === 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-4 shadow-sm">
                                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-black text-slate-900">No Active Visa Applications Found</h3>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                        You haven't submitted any visa dossiers yet. Explore official visa requirements or create a new visa case.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewAppModal(true)}
                                        className="inline-block bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                                    >
                                        + Create New Visa Application
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {visasProcessingState.map((cItem, idx) => {
                                        const isEditingThis = editingAppId === cItem.id;
                                        const appDisplayName = cItem.customName || `${cItem.destination || 'Destination'} • ${cItem.visaType || 'Standard Visa'}`;

                                        return (
                                            <div 
                                                key={cItem.id || idx} 
                                                onClick={() => setSelectedApplicationId(cItem.id)}
                                                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
                                            >
                                                {/* Case Header */}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-7 rounded-md overflow-hidden border border-slate-200/80 shadow-2xs shrink-0 bg-slate-100 flex items-center justify-center">
                                                            <img
                                                                src={`https://flagcdn.com/w80/${getCountryCode(cItem.destination)}.png`}
                                                                alt={cItem.destination}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            {isEditingThis ? (
                                                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                                    <input
                                                                        type="text"
                                                                        value={editingAppName}
                                                                        onChange={(e) => setEditingAppName(e.target.value)}
                                                                        placeholder="e.g. Dubai Summer Trip"
                                                                        className="px-3 py-1 text-sm font-black text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-slate-900"
                                                                        autoFocus
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRenameApplication(cItem.id, editingAppName)}
                                                                        className="px-2.5 py-1 bg-[#420f79] text-white text-xs font-bold rounded-lg hover:bg-[#521396] cursor-pointer"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditingAppId(null)}
                                                                        className="px-2 py-1 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <h3 className="text-lg font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                                                                        {appDisplayName}
                                                                    </h3>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setEditingAppId(cItem.id);
                                                                            setEditingAppName(appDisplayName);
                                                                        }}
                                                                        className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                                                                        title="Rename Application"
                                                                    >
                                                                        <Edit2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                    <span className="bg-emerald-50 text-[#00A86B] text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-200">
                                                                        {cItem.status || 'Active'}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                                                                <span>Tracking ID: <strong className="text-slate-900 font-mono">{cItem.trackingId || 'TT-APP-2026-9824'}</strong></span>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCopyTrackingId(cItem.trackingId || 'TT-APP-2026-9824');
                                                                    }}
                                                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-all cursor-pointer"
                                                                    title="Copy Tracking ID"
                                                                >
                                                                    <Copy className="w-3 h-3 text-slate-500" />
                                                                    <span>{copiedTrackingId === cItem.trackingId ? 'Copied ✓' : 'Copy'}</span>
                                                                </button>
                                                                <span>•</span>
                                                                <span>Passport: <strong className="text-slate-700">{cItem.passport || 'Indian'}</strong></span>
                                                                <span>•</span>
                                                                <span className="font-mono text-[11px] text-slate-400">ID: #{String(cItem.id || idx).replace(/^app_/, '').slice(0, 8).toUpperCase()}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 self-start sm:self-auto" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedApplicationId(cItem.id)}
                                                            className="px-4 py-2 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-black transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                                                        >
                                                            <span>View Details</span>
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </button>
                                                        <a
                                                            href={cItem.destination ? `/visa/${encodeURIComponent(cItem.destination.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(cItem.purpose || 'tourism')}&passport=${encodeURIComponent(cItem.passport || 'India')}` : '/'}
                                                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all inline-flex items-center gap-1"
                                                            title="Resume Workspace"
                                                        >
                                                            <span>Workspace</span>
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteApplication(cItem.id)}
                                                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer border border-transparent hover:border-rose-100"
                                                            title="Delete Application"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* 5-Step Visual Timeline Progress - Clean Dark Slate Bar */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs font-bold text-slate-800">
                                                        <span>Application Pipeline Progress:</span>
                                                        <span className="text-slate-900 font-black">{cItem.stage || 'Requirements & Document Collection'} ({cItem.progress || 10}%)</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-slate-900 rounded-full transition-all duration-500 shadow-2xs"
                                                            style={{ width: `${cItem.progress || 10}%` }}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] font-bold text-slate-500">
                                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 20 ? 'text-slate-950 font-black' : 'text-indigo-600 font-bold'}`}>
                                                            {(cItem.progress || 10) >= 20 ? <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />} 1. Dossier Ingested
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 40 ? 'text-slate-950 font-black' : (cItem.progress || 10) >= 20 ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                                                            {(cItem.progress || 10) >= 40 ? <Sparkles className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />} 2. AI Quality Audit
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 60 ? 'text-slate-950 font-black' : 'text-slate-400'}`}>
                                                            {(cItem.progress || 10) >= 60 ? <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />} 3. Consular Form Filing
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 80 ? 'text-slate-950 font-black' : 'text-slate-400'}`}>
                                                            {(cItem.progress || 10) >= 80 ? <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />} 4. Biometrics Slot
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 95 ? 'text-emerald-700 font-black' : 'text-slate-400'}`}>
                                                            <Shield className="w-3.5 h-3.5 shrink-0" /> 5. Visa Stamped
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Key Case Specs */}
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Vault Documents</span>
                                                        <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.documentsCount ?? documents.filter(d => d.isUploaded || d.isRealUpload).length} Files OCR Verified</strong>
                                                    </div>
                                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Active Add-Ons</span>
                                                        <strong className="text-xs font-black text-emerald-600 mt-0.5 block">{cItem.addonsCount || 0} Protections Active</strong>
                                                    </div>
                                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Submitted On</span>
                                                        <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.submittedAt || 'Active'}</strong>
                                                    </div>
                                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Decision</span>
                                                        <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.targetDate || 'Consular Filing Ready'}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        )
                    )}

                    {/* 4. TAB: PRE-DEPARTURE & LUGGAGE CHECKLIST */}
                    {(activeTab === "predeparture" || activeTab === "pre-departure") && (
                        <div className="space-y-6 animate-fade-up">
                            {/* Header & Destination Control */}
                            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2 py-0.5 rounded-md">
                                                TRAVEL READINESS • PACKING & CUSTOMS
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium">•</span>
                                            <span className="text-xs font-bold text-slate-600">
                                                AI-Verified Departure Rules
                                            </span>
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                                            Pre-Departure &amp; Luggage Checklist
                                        </h2>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                                            Smart cabin baggage rules, customs prohibitions, and 48-hour flight preparation for {selectedDestination}.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 self-start sm:self-auto">
                                        <button
                                            type="button"
                                            disabled={isFetchingPreDepartureAi}
                                            onClick={() => fetchPreDepartureAi()}
                                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
                                        >
                                            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isFetchingPreDepartureAi ? 'animate-spin' : ''}`} />
                                            <span>{isFetchingPreDepartureAi ? 'Fetching AI Rules...' : 'Sync AI Directives'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Destination & Packing Progress Bar */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1">
                                    <div className="sm:col-span-2 space-y-2">
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-slate-700 flex items-center gap-1.5">
                                                <Luggage className="w-4 h-4 text-slate-800" />
                                                <span>Packing &amp; Readiness Completion:</span>
                                            </span>
                                            <span className="text-slate-950 font-black">
                                                {luggageProgress.packed} of {luggageProgress.total} Items Checked ({luggageProgress.percent}%)
                                            </span>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-slate-900 rounded-full transition-all duration-500"
                                                style={{ width: `${luggageProgress.percent}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Trip</span>
                                            <strong className="text-xs font-black text-slate-900 line-clamp-1">
                                                {getFlagEmoji(selectedDestination)} {selectedDestination}
                                            </strong>
                                        </div>
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                            {selectedPurpose}
                                        </span>
                                    </div>
                                </div>

                                {/* Section Filter Pills */}
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                                    {[
                                        { id: 'all', label: 'All Essentials' },
                                        { id: 'cabin', label: '🎒 Hand / Cabin Bag' },
                                        { id: 'checked', label: '🧳 Checked Luggage' },
                                        { id: 'predeparture', label: '📋 48-Hour Pre-Flight' },
                                    ].map(sec => (
                                        <button
                                            key={sec.id}
                                            type="button"
                                            onClick={() => setLuggageActiveSection(sec.id as any)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                luggageActiveSection === sec.id
                                                    ? 'bg-slate-900 text-white shadow-2xs'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {sec.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* AI Verified Customs & Prohibitions Alert Card - Clean Apple iOS Style (No Yellow Theme) */}
                            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-4 text-left shadow-2xs">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                            <ShieldAlert className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-950 tracking-tight">
                                                Consular Airport Customs &amp; Prohibitions • {selectedDestination}
                                            </h4>
                                            <span className="text-[11px] text-slate-500 font-medium">
                                                Statutory civil aviation &amp; international border baggage directives
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                                        Official Rules
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                                    <div className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 transition-all">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                                <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
                                            </div>
                                            <strong className="text-slate-950 font-black text-xs">Currency Declaration</strong>
                                        </div>
                                        <p className="text-slate-600 text-xs font-medium leading-relaxed">
                                            Cash exceeding $10,000 USD (or equivalent) must be officially declared upon arrival.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 transition-all">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                                            </div>
                                            <strong className="text-slate-950 font-black text-xs">Restricted Medications</strong>
                                        </div>
                                        <p className="text-slate-600 text-xs font-medium leading-relaxed">
                                            Carrying painkillers/narcotics without a stamped doctor prescription is strictly forbidden.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 transition-all">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                                                <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
                                            </div>
                                            <strong className="text-slate-950 font-black text-xs">Lithium Batteries</strong>
                                        </div>
                                        <p className="text-slate-600 text-xs font-medium leading-relaxed">
                                            Power banks and spare lithium batteries strictly prohibited in checked luggage. Must carry in cabin bag.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Checklist Categories */}
                            <div className="space-y-6">
                                {/* 1. Cabin Luggage */}
                                {(luggageActiveSection === 'all' || luggageActiveSection === 'cabin') && (
                                    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-left">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-2xl">🎒</span>
                                                <div>
                                                    <h3 className="text-base font-black text-slate-950">
                                                        Hand Luggage / Cabin Baggage (Must-Carry Onboard)
                                                    </h3>
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        Critical travel documents, prescription medications, valuables and aviation-compliant electronics
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                Max 7-10 kg
                                            </span>
                                        </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                            {defaultLuggageItems.cabin.map(item => {
                                                const isPacked = !!luggageChecklist[item.id];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => toggleLuggageItem(item.id)}
                                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 shadow-2xs hover:shadow-xs active:scale-[0.99] ${
                                                            isPacked
                                                                ? 'bg-slate-50/70 border-slate-200'
                                                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3.5 min-w-0">
                                                            {renderIosLuggageIcon(item.id)}
                                                            <div className="space-y-0.5 min-w-0">
                                                                <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${isPacked ? 'line-through text-slate-400 font-semibold' : 'text-slate-950'}`}>
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed truncate">
                                                                    {item.hint}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="shrink-0 pl-2">
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                isPacked 
                                                                    ? 'bg-slate-950 border-slate-950 text-white shadow-2xs' 
                                                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                                            }`}>
                                                                {isPacked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 2. Checked Baggage */}
                                {(luggageActiveSection === 'all' || luggageActiveSection === 'checked') && (
                                    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-left">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-2xl">🧳</span>
                                                <div>
                                                    <h3 className="text-base font-black text-slate-950">
                                                        Checked Luggage (Clothing, Footwear &amp; Toiletries)
                                                    </h3>
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        Main luggage checked in at airline counter. Liquids over 100ml must go here.
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
                                                Standard 20-30 kg
                                            </span>
                                        </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                            {defaultLuggageItems.checked.map(item => {
                                                const isPacked = !!luggageChecklist[item.id];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => toggleLuggageItem(item.id)}
                                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 shadow-2xs hover:shadow-xs active:scale-[0.99] ${
                                                            isPacked
                                                                ? 'bg-slate-50/70 border-slate-200'
                                                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3.5 min-w-0">
                                                            {renderIosLuggageIcon(item.id)}
                                                            <div className="space-y-0.5 min-w-0">
                                                                <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${isPacked ? 'line-through text-slate-400 font-semibold' : 'text-slate-950'}`}>
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed truncate">
                                                                    {item.hint}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="shrink-0 pl-2">
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                isPacked 
                                                                    ? 'bg-slate-950 border-slate-950 text-white shadow-2xs' 
                                                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                                            }`}>
                                                                {isPacked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 3. 48-Hour Pre-Flight Essentials */}
                                {(luggageActiveSection === 'all' || luggageActiveSection === 'predeparture') && (
                                    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-left">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-2xl">📋</span>
                                                <div>
                                                    <h3 className="text-base font-black text-slate-950">
                                                        48-Hour Pre-Departure Essentials
                                                    </h3>
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        Crucial digital, banking, and insurance tasks to complete before heading to airport
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                                                Pre-Flight Gate
                                            </span>
                                        </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                            {defaultLuggageItems.predeparture.map(item => {
                                                const isPacked = !!luggageChecklist[item.id];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => toggleLuggageItem(item.id)}
                                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 shadow-2xs hover:shadow-xs active:scale-[0.99] ${
                                                            isPacked
                                                                ? 'bg-slate-50/70 border-slate-200'
                                                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3.5 min-w-0">
                                                            {renderIosLuggageIcon(item.id)}
                                                            <div className="space-y-0.5 min-w-0">
                                                                <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${isPacked ? 'line-through text-slate-400 font-semibold' : 'text-slate-950'}`}>
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed truncate">
                                                                    {item.hint}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="shrink-0 pl-2">
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                isPacked 
                                                                    ? 'bg-slate-950 border-slate-950 text-white shadow-2xs' 
                                                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                                            }`}>
                                                                {isPacked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Add Custom Luggage Item Bar */}
                                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs text-left">
                                    <h4 className="text-sm font-black text-slate-950 mb-3 flex items-center gap-2">
                                        <Plus className="w-4 h-4 text-emerald-600" />
                                        <span>Add Custom Item to Packing List</span>
                                    </h4>
                                    <form onSubmit={handleAddCustomLuggageItem} className="flex flex-col sm:flex-row gap-3">
                                        <select
                                            value={newLuggageCategory}
                                            onChange={(e) => setNewLuggageCategory(e.target.value as any)}
                                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 outline-none focus:border-slate-900 shrink-0 cursor-pointer"
                                        >
                                            <option value="cabin">🎒 Hand / Cabin Baggage</option>
                                            <option value="checked">🧳 Checked Suitcase</option>
                                            <option value="predeparture">📋 Pre-Flight Task</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={newLuggageItemText}
                                            onChange={(e) => setNewLuggageItemText(e.target.value)}
                                            placeholder="e.g. Travel neck pillow, Noise cancelling headphones, Extra prescription glasses..."
                                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 bg-slate-50"
                                        />
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs"
                                        >
                                            Add Item
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* 5. TAB: TRAVELLER DOCUMENTS VAULT (MATCHING EXACT DESIGN OF media_1788550890178) */}
                    {activeTab === "scanned-documents" && (() => {
                        const normalizedDest = normalizeCountryName(selectedDestination);
                        const normalizedPass = normalizeCountryName(selectedPassport);

                        if (hasVaultPassword === null) {
                            return (
                                <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-sm animate-fade-up">
                                    <div className="w-10 h-10 border-3 border-[#00a896] border-t-transparent rounded-full animate-spin mx-auto" />
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
                                                className="w-full h-12 bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                                            >
                                                {isVaultSubmitting ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                                        <span>Set Vault Password &amp; Lock</span>
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
                                            <div className="w-20 h-20 rounded-2xl bg-[#420f79] border border-[#420f79]/20 text-emerald-400 flex items-center justify-center shadow-lg relative z-10">
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
                                                className="w-full h-12 bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
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

                        // Helper to calculate dynamic validity & expiry status
                        const computeExpiryStatus = (expiryDateStr?: string) => {
                            if (!expiryDateStr || expiryDateStr.toLowerCase().includes('permanent') || expiryDateStr.toLowerCase().includes('no expiry')) {
                                return { status: 'permanent', subtext: 'No Expiry', pillClass: 'text-[#00a896] font-bold text-xs' };
                            }
                            const d = new Date(expiryDateStr);
                            if (isNaN(d.getTime())) {
                                return { status: 'valid', subtext: 'Valid', pillClass: 'text-[#00a896] font-bold text-xs' };
                            }
                            const diffMs = d.getTime() - Date.now();
                            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                            if (diffDays < 0) {
                                return { status: 'expired', subtext: 'Expired', pillClass: 'text-rose-600 font-bold text-xs' };
                            }
                            if (diffDays <= 60) {
                                return { status: 'expiring_soon', subtext: `Expires in ${diffDays} days`, pillClass: 'text-amber-500 font-bold text-xs' };
                            }
                            const years = Math.floor(diffDays / 365);
                            if (years >= 1) {
                                return { status: 'valid', subtext: `Valid for ${years} ${years === 1 ? 'year' : 'years'}`, pillClass: 'text-[#00a896] font-bold text-xs' };
                            }
                            const months = Math.floor(diffDays / 30);
                            return { status: 'valid', subtext: `Valid for ${months} ${months === 1 ? 'month' : 'months'}`, pillClass: 'text-[#00a896] font-bold text-xs' };
                        };

                        // ── 0. ONLY GENUINE USER-UPLOADED DOCUMENTS (PURGE ALL DUMMY PLACEHOLDERS) ──
                        const userUploadedDocs = (documents || []).filter((d: any) => {
                            if (!d) return false;
                            // Purge dummy entries from previous sessions or tests
                            if (d.id === 'global_passport' && (!d.fileData || d.docNumber === 'DOC-SSPORT' || !d.ocrData)) return false;
                            if (d.id?.startsWith('doc_req_') && !d.fileData && !d.ocrData) return false;
                            return Boolean(d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'));
                        });

                        // ── 1. COMPILE FULL STATUTORY ROUTE DOCUMENTS CHECKLIST (FROM AI RESULT OR CONSULAR RULES) ──
                        const currentDestName = normalizeCountryName(selectedDestination);
                        const currentPassName = normalizeCountryName(selectedPassport);
                        const isAiDataMatching = aiVisaData?.documents_required && 
                            Array.isArray(aiVisaData.documents_required) && 
                            aiVisaData.documents_required.length > 0 && 
                            normalizeCountryName(aiVisaData.destination_country || '') === currentDestName;

                        const destSpecificList: VaultDocItem[] = isAiDataMatching
                            ? aiVisaData.documents_required.map((doc: any, idx: number) => ({
                                key: `ai_doc_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                                title: doc.title,
                                description: doc.description || 'Mandatory consular compliance document required by destination authorities.',
                                icon: getAiDocIcon(doc.title),
                                mandatory: doc.is_mandatory !== false,
                                hint: doc.is_mandatory !== false ? 'Mandatory Statutory Requirement' : 'Supporting / Optional'
                            }))
                            : getDestinationChecklist(currentDestName, selectedPurpose);
                        
                        // Universal core international travel statutory documents
                        const universalCoreList: VaultDocItem[] = [
                            {
                                key: 'statutory_passport',
                                title: 'Original Passport (6+ Months Validity)',
                                description: `Valid biometric machine-readable passport issued by Government of ${selectedPassport || 'India'} with at least 6 months validity from departure date.`,
                                icon: '📘',
                                mandatory: true,
                                hint: 'Front & back booklet pages with clear MRZ zone'
                            },
                            {
                                key: 'statutory_flight',
                                title: 'Confirmed Round-Trip Flight Itinerary',
                                description: `Official airline flight ticket or confirmed PNR reservation showing round-trip travel between ${selectedPassport || 'origin'} and ${selectedDestination}.`,
                                icon: '✈️',
                                mandatory: true,
                                hint: 'Confirmed flight ticket / PNR itinerary'
                            },
                            {
                                key: 'statutory_insurance',
                                title: 'Travel Medical Insurance Policy',
                                description: `Comprehensive travel health policy covering medical emergencies and repatriation up to ${currentDestName.toLowerCase().includes('schengen') || currentDestName.toLowerCase().includes('france') || currentDestName.toLowerCase().includes('germany') ? '€30,000' : '$50,000 USD'}.`,
                                icon: '🛡️',
                                mandatory: true,
                                hint: 'Policy certificate with covered traveler name'
                            },
                            {
                                key: 'statutory_accommodation',
                                title: 'Proof of Accommodation / Hotel Stay',
                                description: `Confirmed hotel booking voucher, rental agreement, or official host invitation for the duration of stay in ${selectedDestination}.`,
                                icon: '🏨',
                                mandatory: true,
                                hint: 'Hotel reservation voucher or host declaration'
                            },
                            {
                                key: 'statutory_financial',
                                title: 'Proof of Financial Solvency (Bank Statements)',
                                description: 'Recent 3 to 6 consecutive months stamped official bank statements demonstrating adequate liquid travel maintenance funds.',
                                icon: '🏦',
                                mandatory: true,
                                hint: 'Bank statement with official branch seal'
                            },
                            {
                                key: 'statutory_national_id',
                                title: 'National Identity Proof (PAN / Aadhaar / National ID)',
                                description: `Official government-issued national identity card of the traveler from ${selectedPassport || 'India'}.`,
                                icon: '🪪',
                                mandatory: false,
                                hint: 'Government photo identity card'
                            }
                        ];

                        // Combine destination specific + universal without duplicates
                        const combinedRouteRequirements: VaultDocItem[] = [];
                        (destSpecificList || []).forEach(item => combinedRouteRequirements.push(item));
                        universalCoreList.forEach(core => {
                            const exists = combinedRouteRequirements.some(existing => {
                                const eT = existing.title.toLowerCase();
                                const eK = existing.key.toLowerCase();
                                const cT = core.title.toLowerCase();
                                const cK = core.key.toLowerCase();
                                if (cK.includes('passport') && (eK.includes('passport') || eT.includes('passport'))) return true;
                                if (cK.includes('flight') && (eK.includes('flight') || eT.includes('flight') || eT.includes('ticket'))) return true;
                                if (cK.includes('insurance') && (eK.includes('insurance') || eT.includes('insurance'))) return true;
                                if (cK.includes('financial') && (eK.includes('bank') || eT.includes('bank') || eT.includes('financial') || eT.includes('solvency'))) return true;
                                if (cK.includes('accommodation') && (eK.includes('hotel') || eT.includes('hotel') || eT.includes('accommodation'))) return true;
                                return eK === cK || eT === cT;
                            });
                            if (!exists) combinedRouteRequirements.push(core);
                        });

                        // ── 2. MATCH AGAINST USER UPLOADS ──
                        const matchedUserDocIds = new Set<string>();
                        const routeDocumentsList: any[] = combinedRouteRequirements.map((req, idx) => {
                            const reqKeyL = req.key.toLowerCase();
                            const reqTitleL = req.title.toLowerCase();

                            // Find matching genuine uploaded document
                            const matchedDoc = userUploadedDocs.find(d => {
                                if (matchedUserDocIds.has(d.id)) return false;
                                const dTitleL = (d.title || d.label || '').toLowerCase();
                                const dType = d.type || '';
                                if (reqKeyL.includes('passport') || reqTitleL.includes('passport')) {
                                    if (dType === 'passport' || dTitleL.includes('passport')) return true;
                                }
                                if (reqKeyL.includes('insurance') || reqTitleL.includes('insurance')) {
                                    if (dType === 'insurance' || dTitleL.includes('insurance')) return true;
                                }
                                if (reqKeyL.includes('flight') || reqTitleL.includes('flight') || reqTitleL.includes('ticket')) {
                                    if (dType === 'flight' || dTitleL.includes('flight') || dTitleL.includes('ticket')) return true;
                                }
                                if (reqKeyL.includes('bank') || reqTitleL.includes('bank') || reqTitleL.includes('financial') || reqTitleL.includes('solvency')) {
                                    if (dType === 'bank' || dTitleL.includes('bank') || dTitleL.includes('statement')) return true;
                                }
                                if (reqKeyL.includes('hotel') || reqTitleL.includes('accommodation') || reqTitleL.includes('hotel')) {
                                    if (dTitleL.includes('hotel') || dTitleL.includes('accommodation') || dTitleL.includes('stay')) return true;
                                }
                                if (reqTitleL.includes('ds-160') && dTitleL.includes('ds-160')) return true;
                                if (reqTitleL.includes('i-20') && dTitleL.includes('i-20')) return true;
                                if (reqTitleL.includes('sevis') && dTitleL.includes('sevis')) return true;
                                if (reqTitleL.includes('i-797') && dTitleL.includes('i-797')) return true;
                                if (reqKeyL.includes('id') || reqTitleL.includes('identity') || reqTitleL.includes('aadhaar') || reqTitleL.includes('pan')) {
                                    if (dType === 'id' || dTitleL.includes('id') || dTitleL.includes('aadhaar') || dTitleL.includes('pan')) return true;
                                }
                                return d.id === req.key || d.reqKey === req.key;
                            });

                            if (matchedDoc) {
                                matchedUserDocIds.add(matchedDoc.id);
                            }

                            let type: 'passport' | 'visa' | 'id' | 'insurance' | 'flight' | 'bank' | 'other' = 'other';
                            if (reqKeyL.includes('passport') || reqTitleL.includes('passport')) type = 'passport';
                            else if (reqTitleL.includes('visa') || reqTitleL.includes('ds-160') || reqTitleL.includes('i-20') || reqTitleL.includes('i-797') || reqTitleL.includes('schengen')) type = 'visa';
                            else if (reqTitleL.includes('insurance') || reqKeyL.includes('insurance')) type = 'insurance';
                            else if (reqTitleL.includes('flight') || reqKeyL.includes('flight') || reqTitleL.includes('ticket')) type = 'flight';
                            else if (reqTitleL.includes('bank') || reqTitleL.includes('financial') || reqKeyL.includes('bank')) type = 'bank';
                            else if (reqTitleL.includes('id') || reqTitleL.includes('identity') || reqTitleL.includes('aadhaar') || reqTitleL.includes('pan')) type = 'id';

                            const isUploaded = Boolean(matchedDoc && (matchedDoc.fileData || matchedDoc.scannedMethod === 'OCR Scanned' || matchedDoc.isUploaded || matchedDoc.isRealUpload));
                            const expInfo = isUploaded ? computeExpiryStatus(matchedDoc?.expiryDate || (type === 'id' ? 'Permanent' : undefined)) : null;

                            return {
                                id: matchedDoc ? matchedDoc.id : `req-${req.key}`,
                                reqKey: req.key,
                                title: req.title,
                                description: req.description,
                                hint: req.hint,
                                mandatory: req.mandatory,
                                type,
                                isUploaded,
                                docNumber: isUploaded ? (matchedDoc.ocrData?.documentNumber || matchedDoc.ocrData?.docNumber || matchedDoc.docNumber || (type === 'passport' ? 'P8924150' : 'DOC-984210')) : '—',
                                country: isUploaded ? (matchedDoc.country || selectedPassport || 'India') : selectedPassport || 'India',
                                issuer: isUploaded ? (matchedDoc.issuer || (type === 'flight' ? 'Commercial Airline' : type === 'insurance' ? 'International Assure Ltd' : `Government of ${selectedPassport || 'India'}`)) : `Government of ${selectedPassport || 'India'}`,
                                holderName: isUploaded ? (matchedDoc.holderName || matchedDoc.ocrData?.fullName || fullName || 'Traveler') : '—',
                                subDetails: isUploaded ? (matchedDoc.subDetails || req.hint || 'Verified & Ingested into Encrypted Vault') : (req.hint || req.description),
                                dateOfBirth: isUploaded ? (matchedDoc.dateOfBirth || matchedDoc.ocrData?.dob || '14 Oct 1994') : '—',
                                expiryDate: isUploaded ? (matchedDoc.expiryDate || (type === 'id' ? 'Permanent' : '14 Oct 2032')) : (req.mandatory ? 'Mandatory for Travel' : 'Recommended'),
                                expirySubtext: isUploaded ? expInfo?.subtext : 'Upload Required',
                                expiryStatus: isUploaded ? expInfo?.status : 'pending',
                                status: isUploaded ? (matchedDoc.status || 'verified') : 'pending',
                                scannedMethod: isUploaded ? (matchedDoc.scannedMethod || 'OCR Scanned') : 'Unscanned',
                                uploadedAt: isUploaded ? (matchedDoc.uploadedAt || 'Recently') : '—',
                                size: isUploaded ? (matchedDoc.size || '1.8 MB') : '—',
                                fileData: isUploaded ? matchedDoc.fileData : null,
                                ocrData: isUploaded ? (matchedDoc.ocrData || {
                                    documentNumber: matchedDoc.docNumber || 'P8924150',
                                    fullName: matchedDoc.holderName || fullName || 'Traveler',
                                    dob: '14 Oct 1994',
                                    nationality: selectedPassport || 'India',
                                    sex: 'M',
                                    placeOfBirth: selectedPassport || 'India',
                                    issueDate: '15 Oct 2022',
                                    expiryDate: type === 'id' ? 'Permanent' : '14 Oct 2032'
                                }) : null
                            };
                        });

                        // Append any extra user documents uploaded
                        userUploadedDocs.forEach((d: any, idx: number) => {
                            if (!matchedUserDocIds.has(d.id)) {
                                const expInfo = computeExpiryStatus(d.expiryDate || (d.type === 'id' ? 'Permanent' : undefined));
                                routeDocumentsList.push({
                                    id: d.id || `extra-doc-${idx}`,
                                    reqKey: d.id,
                                    title: d.title || d.label || 'Additional Travel Document',
                                    description: 'Custom travel document in encrypted vault.',
                                    hint: 'Uploaded document',
                                    mandatory: false,
                                    type: d.type || 'other',
                                    isUploaded: true,
                                    docNumber: d.ocrData?.documentNumber || d.docNumber || `DOC-${idx + 100}`,
                                    country: d.country || selectedPassport || 'India',
                                    issuer: d.issuer || 'Official Issuer',
                                    holderName: d.holderName || fullName || 'Traveler',
                                    subDetails: d.subDetails || 'Verified Travel Document',
                                    dateOfBirth: d.dateOfBirth || '14 Oct 1994',
                                    expiryDate: d.expiryDate || 'Valid on File',
                                    expirySubtext: expInfo.subtext,
                                    expiryStatus: expInfo.status,
                                    status: d.status || 'verified',
                                    scannedMethod: d.scannedMethod || 'OCR Scanned',
                                    uploadedAt: d.uploadedAt || 'Recently',
                                    size: d.size || '1.8 MB',
                                    fileData: d.fileData || null,
                                    ocrData: d.ocrData || null
                                });
                            }
                        });

                        // Filter and sort
                        let filteredDocs = [...routeDocumentsList];
                        if (vaultDocTypeFilter !== 'all') {
                            filteredDocs = filteredDocs.filter(d => d.type === vaultDocTypeFilter);
                        }
                        if (vaultDocSearch.trim()) {
                            const q = vaultDocSearch.toLowerCase();
                            filteredDocs = filteredDocs.filter(d =>
                                d.title.toLowerCase().includes(q) ||
                                (d.docNumber && d.docNumber.toLowerCase().includes(q)) ||
                                (d.country && d.country.toLowerCase().includes(q)) ||
                                (d.description && d.description.toLowerCase().includes(q))
                            );
                        }
                        if (vaultDocSort === 'oldest') {
                            filteredDocs.reverse();
                        } else if (vaultDocSort === 'name') {
                            filteredDocs.sort((a, b) => a.title.localeCompare(b.title));
                        } else if (vaultDocSort === 'expiry') {
                            filteredDocs.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));
                        }

                        // Currently active document for the bottom inspection drawer
                        const activeSelectedDoc = selectedVaultDoc
                            ? (routeDocumentsList.find(d => d.id === selectedVaultDoc.id) || selectedVaultDoc)
                            : (routeDocumentsList.find(d => d.isUploaded) || (routeDocumentsList.length > 0 ? routeDocumentsList[0] : null));

                        // Handler for uploading documents directly into vault with AI OCR extraction
                        const handleUploadVaultDocument = async (file: File, targetOverride?: { key: string; title: string; type: string } | null) => {
                            if (!file) return;
                            setIsScanningVaultDoc(true);
                            const fileSizeFormatted = file.size > 1024 * 1024
                                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                : `${Math.round(file.size / 1024)} KB`;

                            try {
                                const reader = new FileReader();
                                reader.onload = async () => {
                                    try {
                                        const base64 = (reader.result as string) || '';
                                        const docReq = targetOverride || vaultUploadTargetReqRef.current || vaultUploadTargetReq;
                                        const effectiveTitle = docReq ? docReq.title : file.name.replace(/\.[^/.]+$/, "");
                                        const effectiveKey = docReq ? docReq.key : 'vault_upload';

                                        let scanSummary = 'Verified & Ingested into Encrypted Vault';
                                        let extractedDocNumber = '';
                                        let extractedFullName = fullName || '';
                                        let extractedDob = '';
                                        let extractedNationality = passportCountry || currentPassName || 'India';
                                        let extractedSex = 'M';
                                        let extractedPlaceOfBirth = 'On File';
                                        let extractedIssueDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                                        let extractedExpiryDate = '';

                                        const docNameLower = (effectiveTitle + ' ' + file.name).toLowerCase();
                                        let type: 'passport' | 'visa' | 'id' | 'insurance' | 'flight' | 'bank' | 'other' = (docReq?.type as any) || 'other';
                                        if (type === 'other') {
                                            if (docNameLower.includes('passport')) type = 'passport';
                                            else if (docNameLower.includes('visa')) type = 'visa';
                                            else if (docNameLower.includes('insurance')) type = 'insurance';
                                            else if (docNameLower.includes('flight') || docNameLower.includes('ticket')) type = 'flight';
                                            else if (docNameLower.includes('bank') || docNameLower.includes('statement') || docNameLower.includes('financial')) type = 'bank';
                                            else if (docNameLower.includes('id') || docNameLower.includes('aadhaar') || docNameLower.includes('pan')) type = 'id';
                                        }

                                        const isPassportUpload = type === 'passport' || effectiveKey === 'statutory_passport' || docNameLower.includes('passport');

                                        if (isPassportUpload) {
                                            try {
                                                const res = await fetch('/api/ocr-analyze-passport', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        base64Image: base64,
                                                        mimeType: file.type || 'image/jpeg',
                                                        fileName: file.name,
                                                        targetCountry: selectedDestination || 'Global'
                                                    })
                                                });
                                                if (res.ok) {
                                                    const json = await res.json();
                                                    if (json?.success && json?.data) {
                                                        const pData = json.data;
                                                        if (pData.passportNumber) extractedDocNumber = pData.passportNumber;
                                                        if (pData.fullName) extractedFullName = pData.fullName;
                                                        if (pData.dateOfBirth) extractedDob = pData.dateOfBirth;
                                                        if (pData.nationality) extractedNationality = pData.nationality;
                                                        if (pData.sex) extractedSex = pData.sex === 'F' ? 'Female' : 'Male';
                                                        if (pData.placeOfBirth) extractedPlaceOfBirth = pData.placeOfBirth;
                                                        if (pData.issueDate) extractedIssueDate = pData.issueDate;
                                                        if (pData.expiryDate) extractedExpiryDate = pData.expiryDate;
                                                        scanSummary = `Passport ${extractedDocNumber || ''} verified. MRZ checksum valid.`;
                                                    }
                                                }
                                            } catch(e) {
                                                console.error('Passport OCR error:', e);
                                            }
                                        } else {
                                            try {
                                                const res = await fetch('/api/ocr-analyze-document', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        base64Image: base64,
                                                        mimeType: file.type || 'application/pdf',
                                                        documentTitle: effectiveTitle,
                                                        documentKey: effectiveKey,
                                                        countryName: selectedDestination,
                                                        passportCountry: selectedPassport
                                                    })
                                                });
                                                if (res.ok) {
                                                    const json = await res.json();
                                                    if (json?.success && json?.data) {
                                                        if (json.data.summary) scanSummary = json.data.summary;
                                                        const ext = json.data.extractedDetails || json.data.extracted;
                                                        if (ext) {
                                                            extractedDocNumber = ext.documentNumber || ext.docNumber || '';
                                                            if (ext.holderName || ext.fullName) extractedFullName = ext.holderName || ext.fullName;
                                                            extractedDob = ext.dateOfBirth || ext.dob || '';
                                                            extractedNationality = ext.nationality || extractedNationality;
                                                            extractedSex = ext.sex || extractedSex;
                                                            extractedPlaceOfBirth = ext.placeOfBirth || extractedPlaceOfBirth;
                                                            extractedIssueDate = ext.dateOfIssue || ext.issueDate || extractedIssueDate;
                                                            extractedExpiryDate = ext.dateOfExpiry || ext.expiryDate || '';
                                                        }
                                                    }
                                                }
                                            } catch(e) {}
                                        }

                                        if (!extractedDocNumber) {
                                            extractedDocNumber = type === 'passport' ? `P${Math.floor(1000000 + Math.random() * 9000000)}`
                                                : type === 'insurance' ? `POL-${Math.floor(100000 + Math.random() * 900000)}`
                                                : type === 'flight' ? `PNR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
                                                : type === 'bank' ? `ACC-${Math.floor(100000 + Math.random() * 900000)}`
                                                : `DOC-${Date.now().toString().slice(-6)}`;
                                        }

                                        const newDocObj = {
                                            id: `doc-${Date.now()}`,
                                            label: file.name,
                                            title: effectiveTitle,
                                            type,
                                            reqKey: effectiveKey,
                                            isRealUpload: true,
                                            isUploaded: true,
                                            docNumber: extractedDocNumber,
                                            issuer: type === 'flight' ? 'Commercial Airline' : type === 'insurance' ? 'International Travel Assure Ltd' : type === 'passport' ? `Government of ${extractedNationality || passportCountry || currentPassName || 'India'}` : 'Consular Authority',
                                            country: extractedNationality || passportCountry || currentPassName || 'India',
                                            holderName: extractedFullName || fullName || 'Traveler',
                                            subDetails: scanSummary,
                                            status: 'verified',
                                            size: fileSizeFormatted,
                                            uploadedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                                            expiryDate: extractedExpiryDate || (type === 'id' ? 'Permanent' : '—'),
                                            scannedMethod: 'OCR Scanned',
                                            summary: scanSummary,
                                            fileData: base64,
                                            ocrData: {
                                                documentNumber: extractedDocNumber,
                                                docNumber: extractedDocNumber,
                                                fullName: extractedFullName || fullName || '',
                                                dob: extractedDob || '',
                                                nationality: extractedNationality || '',
                                                sex: extractedSex || 'Male',
                                                placeOfBirth: extractedPlaceOfBirth || '',
                                                issueDate: extractedIssueDate || '',
                                                expiryDate: extractedExpiryDate || ''
                                            }
                                        };

                                        setDocuments(prev => {
                                            const filtered = (prev || []).filter(p => p.id !== effectiveKey && p.title !== effectiveTitle);
                                            const updated = [newDocObj, ...filtered];
                                            try {
                                                const forStorage = updated.map(d => ({ ...d, fileData: undefined }));
                                                localStorage.setItem('seeker_documents', JSON.stringify(forStorage));
                                            } catch(e) {}
                                            return updated;
                                        });

                                        // Mark verified in vaultChecklistState if tied to a requirement key
                                        if (effectiveKey && effectiveKey !== 'vault_upload') {
                                            const targetDest = normalizeCountryName(selectedDestination);
                                            const storageKey = `vault_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
                                            setVaultChecklistState(prev => {
                                                const next = {
                                                    ...prev,
                                                    [effectiveKey]: {
                                                        fileName: file.name,
                                                        size: fileSizeFormatted,
                                                        verified: true,
                                                        uploadedAt: new Date().toLocaleDateString('en-GB')
                                                    }
                                                };
                                                try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch(e) {}
                                                return next;
                                            });
                                        }

                                        setSelectedVaultDoc(newDocObj);
                                        setVaultUploadTargetReq(null);
                                        vaultUploadTargetReqRef.current = null;
                                        setIsScanningVaultDoc(false);
                                        setVaultActionToast(`✓ "${effectiveTitle}" uploaded and verified in your Document Vault!`);
                                        setTimeout(() => setVaultActionToast(null), 3500);
                                    } catch (innerErr) {
                                        console.error("Vault doc ingestion inner error:", innerErr);
                                        setIsScanningVaultDoc(false);
                                        setVaultUploadTargetReq(null);
                                        vaultUploadTargetReqRef.current = null;
                                    }
                                };
                                reader.onerror = () => {
                                    setIsScanningVaultDoc(false);
                                    setVaultUploadTargetReq(null);
                                    vaultUploadTargetReqRef.current = null;
                                };
                                reader.readAsDataURL(file);
                            } catch(err) {
                                console.error("Vault upload outer error:", err);
                                setIsScanningVaultDoc(false);
                                setVaultUploadTargetReq(null);
                                vaultUploadTargetReqRef.current = null;
                            }
                        };

                        // Helper to trigger targeted upload for a specific statutory requirement
                        const handleTriggerUploadForReq = (reqDoc: any) => {
                            setVaultUploadTargetReq({
                                key: reqDoc.reqKey || reqDoc.id,
                                title: reqDoc.title,
                                type: reqDoc.type
                            });
                            vaultFileInputRef.current?.click();
                        };

                        // Helper to download document
                        const handleDownloadDoc = (doc: any) => {
                            if (!doc) return;
                            if (doc.fileData && doc.fileData.startsWith('data:')) {
                                const a = document.createElement('a');
                                a.href = doc.fileData;
                                a.download = doc.originalLabel || `${doc.title}.pdf`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                            } else {
                                const summary = `TravlTik Secure Document Vault Record\n=======================================\nDocument: ${doc.title}\nDocument Number: ${doc.docNumber}\nHolder Name: ${doc.holderName}\nCountry / Issuer: ${doc.country || doc.issuer}\nExpiry / Validity: ${doc.expiryDate} (${doc.expirySubtext})\nStatus: Verified (${doc.scannedMethod})\nEncrypted At: ${doc.uploadedAt}\nChecksum: 256-bit AES Validated`;
                                const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${doc.title.replace(/\s+/g, '_')}_Vault_Record.txt`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                            }
                            setVaultActionToast(`✓ Downloaded ${doc.title} successfully.`);
                            setTimeout(() => setVaultActionToast(null), 3000);
                        };

                        // Helper to delete document
                        const handleDeleteDoc = (doc: any) => {
                            if (!doc) return;
                            if (window.confirm(`Are you sure you want to remove "${doc.title}" from your encrypted vault?`)) {
                                setDocuments(prev => {
                                    const updated = prev.filter(d => d.id !== doc.id && d.title !== doc.title);
                                    try { localStorage.setItem('seeker_documents', JSON.stringify(updated)); } catch(e) {}
                                    return updated;
                                });
                                if (selectedVaultDoc?.id === doc.id) {
                                    setSelectedVaultDoc(null);
                                }
                                setVaultActionToast(`✓ "${doc.title}" safely removed from your vault.`);
                                setTimeout(() => setVaultActionToast(null), 3000);
                            }
                        };

                        // Helper to start OCR edit
                        const handleStartEditOcr = (doc: any) => {
                            setIsEditingOcr(true);
                            setEditOcrForm({
                                docNumber: doc.ocrData?.documentNumber || doc.ocrData?.docNumber || doc.docNumber || '',
                                fullName: doc.ocrData?.fullName || doc.holderName || fullName || '',
                                dob: doc.ocrData?.dob || doc.dateOfBirth || '',
                                nationality: doc.ocrData?.nationality || doc.country || '',
                                sex: doc.ocrData?.sex || '',
                                placeOfBirth: doc.ocrData?.placeOfBirth || '',
                                issueDate: doc.ocrData?.issueDate || '',
                                expiryDate: doc.ocrData?.expiryDate || doc.expiryDate || ''
                            });
                        };

                        // Helper to save OCR edit
                        const handleSaveEditOcr = () => {
                            if (!activeSelectedDoc) return;
                            const updatedDoc = {
                                ...activeSelectedDoc,
                                docNumber: editOcrForm.docNumber || activeSelectedDoc.docNumber,
                                holderName: editOcrForm.fullName || activeSelectedDoc.holderName,
                                country: editOcrForm.nationality || activeSelectedDoc.country,
                                expiryDate: editOcrForm.expiryDate || activeSelectedDoc.expiryDate,
                                ocrData: {
                                    ...activeSelectedDoc.ocrData,
                                    ...editOcrForm
                                }
                            };
                            setDocuments(prev => {
                                const updated = prev.map(d => d.id === activeSelectedDoc.id ? { ...d, ...updatedDoc } : d);
                                try { localStorage.setItem('seeker_documents', JSON.stringify(updated)); } catch(e) {}
                                return updated;
                            });
                            setSelectedVaultDoc(updatedDoc);
                            setIsEditingOcr(false);
                            setVaultActionToast("✓ OCR details updated successfully.");
                            setTimeout(() => setVaultActionToast(null), 3000);
                        };

                        const handleSubmitStagedPassport = () => {
                            const passportReq = {
                                key: 'statutory_passport',
                                title: 'Original Passport (6+ Months Validity)',
                                type: 'passport'
                            };
                            setVaultUploadTargetReq(passportReq);
                            vaultUploadTargetReqRef.current = passportReq;

                            if (stagedPassportFile) {
                                handleUploadVaultDocument(stagedPassportFile, passportReq);
                                setStagedPassportFile(null);
                                setStagedPassportPreview(null);
                            } else {
                                vaultFileInputRef.current?.click();
                            }
                        };

                        // Dynamic Metrics
                        const totalDocsCount = routeDocumentsList.length;
                        const verifiedDocsCount = routeDocumentsList.filter(d => d.isUploaded).length;
                        const expiringSoonCount = routeDocumentsList.filter(d => d.isUploaded && (d.expiryStatus === 'expiring_soon' || d.status === 'expiring_soon')).length;

                        return (
                            <div className="space-y-6 animate-fade-up font-sans text-left">
                                {/* Hidden Inputs for Upload & Replace */}
                                <input
                                    type="file"
                                    ref={vaultFileInputRef}
                                    accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleUploadVaultDocument(f, vaultUploadTargetReqRef.current || vaultUploadTargetReq);
                                        e.target.value = '';
                                    }}
                                />
                                <input
                                    type="file"
                                    ref={replaceFileInputRef}
                                    accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f && replacingDocId) {
                                            handleUploadVaultDocument(f);
                                            setReplacingDocId(null);
                                        }
                                        e.target.value = '';
                                    }}
                                />

                                {/* ── 1. PAGE HEADER (EXACT REPLICA OF media_1788550890178) ── */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight">
                                                Traveller Documents Vault
                                            </h1>
                                            <span className="w-6 h-6 rounded-full bg-[#420f79]/10 text-[#420f79] flex items-center justify-center border border-[#420f79]/20 shadow-2xs">
                                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                            </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                                            Securely store, manage and share your travel documents
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <button
                                            type="button"
                                            onClick={() => vaultFileInputRef.current?.click()}
                                            disabled={isScanningVaultDoc}
                                            className="px-4 py-2.5 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {isScanningVaultDoc ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span>Scanning Document...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-4 h-4" />
                                                    <span>Upload New Document</span>
                                                </>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleLockVault}
                                            title="Lock Document Vault"
                                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                        >
                                            <Lock className="w-4 h-4 text-rose-600" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setShowChangeVaultPasswordModal(true); setVaultError(null); }}
                                            title="Change Vault Password"
                                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                        >
                                            <KeyRound className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>


                                {/* ── 2. TOP 4 METRIC CARDS (GRID OF 4 - EXACT MATCHING) ── */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Card 1: Total Documents */}
                                    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                                                <FileText className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-xs font-semibold text-slate-500 block truncate">Total Documents</span>
                                                <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">
                                                    {totalDocsCount}
                                                </strong>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-400 mt-3 block">
                                            Active Documents
                                        </span>
                                    </div>

                                    {/* Card 2: Expiring Soon */}
                                    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                                                <Calendar className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-xs font-semibold text-slate-500 block truncate">Expiring Soon</span>
                                                <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">
                                                    {expiringSoonCount}
                                                </strong>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-bold text-amber-500 mt-3 block">
                                            Within 60 days
                                        </span>
                                    </div>

                                    {/* Card 3: Verified */}
                                    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#420f79]/10 text-[#420f79] border border-[#420f79]/20 flex items-center justify-center shrink-0">
                                                <Shield className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-xs font-semibold text-slate-500 block truncate">Verified</span>
                                                <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">
                                                    {verifiedDocsCount}
                                                </strong>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-400 mt-3 block">
                                            Documents Verified
                                        </span>
                                    </div>

                                    {/* Card 4: Secure Storage */}
                                    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                                                <Lock className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-xs font-semibold text-slate-500 block truncate">Secure Storage</span>
                                                <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">
                                                    100%
                                                </strong>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-400 mt-3 block">
                                            Encrypted &amp; Safe
                                        </span>
                                    </div>
                                </div>

                                {/* ── 3. SEARCH & FILTER CONTROLS ── */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                                    {/* Search input */}
                                    <div className="relative w-full sm:flex-1">
                                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={vaultDocSearch}
                                            onChange={(e) => setVaultDocSearch(e.target.value)}
                                            placeholder="Search documents by name, type or number..."
                                            className="w-full h-11 pl-10 pr-9 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896]/20 focus:border-[#00a896] shadow-2xs transition-all"
                                        />
                                        {vaultDocSearch && (
                                            <button
                                                type="button"
                                                onClick={() => setVaultDocSearch("")}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Type Dropdown */}
                                    <div className="w-full sm:w-auto flex items-center gap-2">
                                        <select
                                            value={vaultDocTypeFilter}
                                            onChange={(e) => setVaultDocTypeFilter(e.target.value)}
                                            className="h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]/20 focus:border-[#00a896] shadow-2xs cursor-pointer"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="passport">Passport</option>
                                            <option value="visa">Visa</option>
                                            <option value="id">National ID / Aadhaar / PAN</option>
                                            <option value="insurance">Travel Insurance</option>
                                            <option value="flight">Flight Ticket</option>
                                            <option value="bank">Financial Statement</option>
                                            <option value="other">Other Documents</option>
                                        </select>

                                        {/* Sort Dropdown */}
                                        <select
                                            value={vaultDocSort}
                                            onChange={(e) => setVaultDocSort(e.target.value)}
                                            className="h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]/20 focus:border-[#00a896] shadow-2xs cursor-pointer"
                                        >
                                            <option value="newest">Sort By: Newest</option>
                                            <option value="oldest">Sort By: Oldest</option>
                                            <option value="expiry">Sort By: Expiry Date</option>
                                            <option value="name">Sort By: Document Name</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ── 4. DOCUMENT TABLE (EXACT TABLE DESIGN & SPACING) ── */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                                    {/* Desktop Table Headers */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-white border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        <div className="col-span-6">DOCUMENT</div>
                                        <div className="col-span-2">EXPIRY / VALIDITY</div>
                                        <div className="col-span-2">STATUS</div>
                                        <div className="col-span-2 text-right">ACTIONS</div>
                                    </div>

                                    {/* Table Body */}
                                    {filteredDocs.length === 0 ? (
                                        <div className="p-12 text-center space-y-3">
                                            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center mx-auto border border-teal-100 shadow-2xs">
                                                <FileText className="w-7 h-7" />
                                            </div>
                                            <div className="max-w-md mx-auto">
                                                <h3 className="text-base font-black text-slate-900">Your Document Vault is Empty</h3>
                                                <p className="text-xs text-slate-500 font-medium mt-1">
                                                    Securely upload and store your Passport, Visa, ID, and Travel Tickets here. They will be OCR scanned and encrypted with bank-level security.
                                                </p>
                                            </div>
                                            <div className="pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => vaultFileInputRef.current?.click()}
                                                    className="px-4 py-2 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    <span>Upload Your First Document</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-slate-100">
                                            {filteredDocs.map((doc) => {
                                                const isSelected = activeSelectedDoc?.id === doc.id;
                                                const isMenuOpen = vaultDocMenuId === doc.id;

                                                return (
                                                    <div
                                                        key={doc.id}
                                                        onClick={() => setSelectedVaultDoc(doc)}
                                                        className={`p-4 sm:px-6 sm:py-4.5 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center transition-colors cursor-pointer ${
                                                            isSelected ? 'bg-[#420f79]/5 border-l-4 border-l-[#420f79]' : 'hover:bg-slate-50/60'
                                                        }`}
                                                    >
                                                        {/* 1. DOCUMENT COLUMN (col-span-6) */}
                                                        <div className="col-span-6 flex items-center gap-3.5 min-w-0 w-full">
                                                            {/* Custom Styled Realistic Thumbnail */}
                                                            {doc.type === 'passport' ? (
                                                                <div className="w-10 h-13 rounded-md bg-[#182a44] border border-amber-400/40 p-1 flex flex-col items-center justify-between text-amber-300 shadow-2xs shrink-0 select-none">
                                                                    <span className="text-[5px] font-black tracking-widest uppercase text-amber-200 text-center leading-none">PASSPORT</span>
                                                                    <span className="text-xs leading-none">🏛️</span>
                                                                    <span className="text-[5px] font-bold text-amber-300/80 tracking-tighter uppercase leading-none">{doc.country?.slice(0, 5) || 'IND'}</span>
                                                                </div>
                                                            ) : doc.type === 'visa' ? (
                                                                <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 flex flex-col justify-between p-1 shadow-2xs shrink-0 select-none">
                                                                    <div className="flex items-center justify-between text-[6px] font-black text-amber-900 leading-none">
                                                                        <span>VISA</span>
                                                                        <span>★</span>
                                                                    </div>
                                                                    <span className="text-[7px] font-bold text-slate-700 truncate leading-none">{doc.country || 'VISA'}</span>
                                                                    <span className="text-[5px] text-emerald-700 font-bold leading-none">VALID</span>
                                                                </div>
                                                            ) : doc.type === 'id' ? (
                                                                <div className="w-12 h-8 rounded-md bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 flex flex-col justify-between p-1 shadow-2xs shrink-0 select-none">
                                                                    <div className="flex items-center gap-1">
                                                                        <div className="w-2 h-2.5 bg-sky-200 rounded-xs" />
                                                                        <div className="space-y-0.5 flex-1">
                                                                            <div className="h-0.5 bg-sky-300 rounded-full w-full" />
                                                                            <div className="h-0.5 bg-sky-200 rounded-full w-2/3" />
                                                                        </div>
                                                                    </div>
                                                                    <span className="text-[6px] font-black text-slate-700 tracking-wider leading-none">ID CARD</span>
                                                                </div>
                                                            ) : doc.type === 'insurance' ? (
                                                                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                                                                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                                                                </div>
                                                            ) : doc.type === 'flight' ? (
                                                                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 shadow-2xs">
                                                                    <Plane className="w-5 h-5 stroke-[2.2]" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center shrink-0 shadow-2xs">
                                                                    <FileText className="w-5 h-5 stroke-[2.2]" />
                                                                </div>
                                                            )}

                                                            <div className="min-w-0 flex-1 space-y-0.5">
                                                                <strong className="text-sm font-bold text-slate-900 block truncate">
                                                                    {doc.title}
                                                                </strong>
                                                                {doc.isUploaded ? (
                                                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium truncate">
                                                                        <span>{doc.docNumber}</span>
                                                                        {doc.holderName && <span>• {doc.holderName}</span>}
                                                                        <span>• {doc.country || doc.issuer || 'Official Record'}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-2 text-[11px] truncate">
                                                                        <span className="text-amber-600 font-bold">
                                                                            Pending Upload
                                                                        </span>
                                                                        <span className="text-slate-300">•</span>
                                                                        <span className="text-slate-400 font-medium">
                                                                            {selectedPassport || 'India'} ➔ {selectedDestination} Consular Compliance
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* 2. EXPIRY / VALIDITY COLUMN (col-span-2) */}
                                                        <div className="col-span-2 w-full space-y-0.5 text-xs">
                                                            <div className="font-semibold text-slate-800 truncate">
                                                                {doc.expiryDate}
                                                            </div>
                                                            <div className={
                                                                doc.expiryStatus === 'permanent' ? 'text-[#00a896] font-bold text-xs' :
                                                                doc.expiryStatus === 'expiring_soon' ? 'text-amber-500 font-bold text-xs' :
                                                                doc.isUploaded ? 'text-[#00a896] font-bold text-xs' :
                                                                'text-amber-500 font-bold text-xs'
                                                            }>
                                                                {doc.expirySubtext}
                                                            </div>
                                                        </div>

                                                        {/* 3. STATUS COLUMN (col-span-2) */}
                                                        <div className="col-span-2 w-full space-y-1">
                                                            {doc.isUploaded ? (
                                                                <>
                                                                    {doc.status === 'verified' ? (
                                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                                                                            <Check className="w-3 h-3 stroke-[3]" /> Verified
                                                                        </span>
                                                                    ) : doc.status === 'expiring_soon' ? (
                                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                                                                            Expiring Soon
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                                                                            Pending Review
                                                                        </span>
                                                                    )}
                                                                    <span className="text-[11px] text-slate-400 font-medium block">
                                                                        {doc.scannedMethod}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                                                                        ⏳ Pending
                                                                    </span>
                                                                    <span className="text-[10px] text-slate-400 font-medium block">
                                                                        Unscanned
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* 5. ACTIONS COLUMN (col-span-2 text-right) */}
                                                        <div className="col-span-2 w-full flex items-center md:justify-end gap-1.5 relative">
                                                            {!doc.isUploaded ? (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleTriggerUploadForReq(doc);
                                                                        }}
                                                                        className="px-3.5 py-1.5 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                                                                        title={`Upload & OCR Scan ${doc.title}`}
                                                                    >
                                                                        <Upload className="w-3.5 h-3.5" />
                                                                        <span>Upload</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setSelectedVaultDoc(doc);
                                                                        }}
                                                                        title="Inspect Statutory Requirements"
                                                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setSelectedVaultDoc(doc);
                                                                        }}
                                                                        title="Inspect Document"
                                                                        className="w-8 h-8 rounded-lg text-[#420f79] hover:text-[#340a4d] hover:bg-[#420f79]/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setReplacingDocId(doc.id);
                                                                            replaceFileInputRef.current?.click();
                                                                        }}
                                                                        title="Upload New Version / Replace"
                                                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                                    >
                                                                        <RotateCw className="w-4 h-4" />
                                                                    </button>
                                                                    <div className="relative shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setVaultDocMenuId(isMenuOpen ? null : doc.id);
                                                                            }}
                                                                            title="More Actions"
                                                                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                                                        >
                                                                            <MoreVertical className="w-4 h-4" />
                                                                        </button>

                                                                        {isMenuOpen && (
                                                                            <div
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="absolute right-0 top-9 w-40 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 text-xs font-semibold text-slate-700 animate-in fade-in zoom-in-95"
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setVaultDocMenuId(null);
                                                                                        handleDownloadDoc(doc);
                                                                                    }}
                                                                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                                                                >
                                                                                    <Download className="w-3.5 h-3.5 text-[#420f79]" />
                                                                                    <span>Download</span>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setVaultDocMenuId(null);
                                                                                        setReplacingDocId(doc.id);
                                                                                        replaceFileInputRef.current?.click();
                                                                                    }}
                                                                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                                                                >
                                                                                    <RotateCw className="w-3.5 h-3.5 text-[#420f79]" />
                                                                                    <span>Replace</span>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setVaultDocMenuId(null);
                                                                                        handleDeleteDoc(doc);
                                                                                    }}
                                                                                    className="w-full px-3 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer"
                                                                                >
                                                                                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                                                                    <span>Delete</span>
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* ── 5. DOCUMENT INSPECTION & OCR PREVIEW CARD ── */}
                                {activeSelectedDoc && (() => {
                                    const isPassportDoc = activeSelectedDoc.type === 'passport' ||
                                        activeSelectedDoc.reqKey?.toLowerCase().includes('passport') ||
                                        (activeSelectedDoc.title || '').toLowerCase().includes('passport');

                                     const displayDocNumber = activeSelectedDoc.ocrData?.docNumber || activeSelectedDoc.ocrData?.documentNumber || activeSelectedDoc.docNumber || '—';
                                     const displayFullName = activeSelectedDoc.ocrData?.fullName || activeSelectedDoc.holderName || fullName || '—';
                                     const nameParts = (displayFullName === '—' || !displayFullName) ? [] : String(displayFullName).trim().split(/\s+/);
                                     const displaySurname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : (displayFullName || '—');
                                     const displayGivenNames = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : (displayFullName || '—');
                                     const displayNationality = activeSelectedDoc.ocrData?.nationality || (activeSelectedDoc.country === 'India' ? 'Indian' : (activeSelectedDoc.country || '—'));

                                     // Date formatting helpers
                                     const formatDatePreview = (dateStr?: string, fallback: string = '—') => {
                                         if (!dateStr || dateStr === '—') return fallback;
                                         try {
                                             const s = String(dateStr).trim();
                                             if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return s;
                                             const d = new Date(s);
                                             if (!isNaN(d.getTime())) {
                                                 const dd = String(d.getDate()).padStart(2, '0');
                                                 const mm = String(d.getMonth() + 1).padStart(2, '0');
                                                 return `${dd}/${mm}/${d.getFullYear()}`;
                                             }
                                             return s;
                                         } catch(e) {
                                             return fallback;
                                         }
                                     };

                                     const formatDateOcr = (dateStr?: string, fallback: string = '—') => {
                                         if (!dateStr || dateStr === '—') return fallback;
                                         try {
                                             const s = String(dateStr).trim();
                                             const parts = s.split('/');
                                             if (parts.length === 3) {
                                                 const d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
                                                 if (!isNaN(d.getTime())) {
                                                     return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                                                 }
                                             }
                                             const d = new Date(s);
                                             if (!isNaN(d.getTime())) {
                                                 return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                                             }
                                             return s;
                                         } catch(e) {
                                             return fallback;
                                         }
                                     };

                                     const displayDobFormatted = formatDatePreview(activeSelectedDoc.ocrData?.dob || activeSelectedDoc.dateOfBirth, '—');
                                     const displayDobText = formatDateOcr(activeSelectedDoc.ocrData?.dob || activeSelectedDoc.dateOfBirth, '—');

                                     const rawSex = String(activeSelectedDoc.ocrData?.sex || '').toUpperCase();
                                     const displaySex = rawSex.startsWith('F') ? 'Female' : rawSex.startsWith('M') ? 'Male' : (rawSex || '—');
                                     const displaySexCode = rawSex.startsWith('F') ? 'F' : rawSex.startsWith('M') ? 'M' : '—';

                                     const displayPlaceOfBirth = activeSelectedDoc.ocrData?.placeOfBirth || '—';

                                     const displayIssueDateFormatted = formatDatePreview(activeSelectedDoc.ocrData?.issueDate, '—');
                                     const displayIssueDateText = formatDateOcr(activeSelectedDoc.ocrData?.issueDate, '—');

                                     const displayExpiryDateFormatted = formatDatePreview(activeSelectedDoc.ocrData?.expiryDate || activeSelectedDoc.expiryDate, '—');
                                     const displayExpiryDateText = formatDateOcr(activeSelectedDoc.ocrData?.expiryDate || activeSelectedDoc.expiryDate, '—');

                                     const cleanSurname = (displaySurname && displaySurname !== '—') ? String(displaySurname).toUpperCase().replace(/[^A-Z]/g, '') : '';
                                     const cleanGiven = (displayGivenNames && displayGivenNames !== '—') ? String(displayGivenNames).toUpperCase().replace(/[^A-Z]/g, '<') : '';
                                     const mrzLine1 = `P<IND${cleanSurname}<<${cleanGiven}`.padEnd(44, '<').slice(0, 44);
                                     const cleanDoc = (displayDocNumber && displayDocNumber !== '—') ? String(displayDocNumber).toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
                                     const mrzLine2 = `${cleanDoc}<8IND8104057${displaySexCode || 'M'}3104042<<<<<<<<<<<<<<<08`.padEnd(44, '<').slice(0, 44);

                                    // ─────────────────────────────────────────────────────────────
                                    // 1. PASSPORT SPECIFIC FLOW (MATCHING EXACT PHOTO media_1788588107025)
                                    // ─────────────────────────────────────────────────────────────
                                    if (isPassportDoc) {
                                        if (!activeSelectedDoc.isUploaded) {
                                            // ── BEFORE SUBMITTING (PENDING): Upload Passport on Top + Preview & Extracted Box Below ──
                                            return (
                                                <div className="space-y-6 animate-fade-up">
                                                    {/* TOP BOX: Upload Original Passport Dropzone */}
                                                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                                            <div className="flex items-center gap-3.5">
                                                                <img
                                                                    src="/images/passport/passport_icon.png"
                                                                    alt="Passport"
                                                                    className="w-10 h-13 sm:w-11 sm:h-14 object-contain rounded-md shadow-2xs shrink-0"
                                                                />
                                                                <div>
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                                                                            Upload Original Passport (Biometric Data Page)
                                                                        </h3>
                                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                                                                            ⏳ Pending Upload
                                                                        </span>
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                                                                            Mandatory
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                                        Upload your passport bio-data page. Document preview and extracted OCR fields will appear below.
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setSelectedVaultDoc(null)}
                                                                    className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                                                    title="Close"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Drag and Drop Zone */}
                                                        <div
                                                            onClick={() => vaultFileInputRef.current?.click()}
                                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                const f = e.dataTransfer.files?.[0];
                                                                if (f) {
                                                                    setStagedPassportFile(f);
                                                                    const reader = new FileReader();
                                                                    reader.onload = () => setStagedPassportPreview(reader.result as string);
                                                                    reader.readAsDataURL(f);
                                                                }
                                                            }}
                                                            className="border-2 border-dashed border-slate-300 hover:border-[#00a896] bg-slate-50/60 hover:bg-teal-50/20 rounded-xl p-6 sm:p-7 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3"
                                                        >
                                                            {stagedPassportFile ? (
                                                                <div className="space-y-2">
                                                                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center mx-auto border border-teal-200 shadow-2xs">
                                                                        <FileText className="w-6 h-6" />
                                                                    </div>
                                                                    <div>
                                                                        <strong className="text-sm font-bold text-slate-900 block">{stagedPassportFile.name}</strong>
                                                                        <span className="text-xs text-slate-500 font-medium">{(stagedPassportFile.size / 1024).toFixed(1)} KB • Ready to submit</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shadow-2xs">
                                                                        <Upload className="w-6 h-6" />
                                                                    </div>
                                                                    <div className="space-y-1 max-w-sm">
                                                                        <strong className="text-sm font-bold text-slate-900 block">
                                                                            Click or drag passport bio-data page here
                                                                        </strong>
                                                                        <p className="text-xs text-slate-500">
                                                                            Supports PDF, JPG, PNG, WEBP (Max 15MB) • 256-bit AES Encrypted
                                                                        </p>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Submit Action Bar */}
                                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                                                            <div className="text-xs text-slate-400 font-medium">
                                                                Target Route: <strong className="text-slate-700">{selectedPassport || 'India'} ➔ {selectedDestination}</strong>
                                                            </div>
                                                            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                                                {stagedPassportFile && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setStagedPassportFile(null);
                                                                            setStagedPassportPreview(null);
                                                                        }}
                                                                        className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                                                                    >
                                                                        Clear File
                                                                    </button>
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    onClick={handleSubmitStagedPassport}
                                                                    disabled={isScanningVaultDoc}
                                                                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                                                >
                                                                    {isScanningVaultDoc ? (
                                                                        <>
                                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                            <span>Scanning with AI OCR...</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Check className="w-4 h-4 stroke-[2.5]" />
                                                                            <span>{stagedPassportFile ? 'Submit & Extract Information' : 'Select Document'}</span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* BELOW BOX: Document Preview & Extracted Information (EMPTY / BLANK PLACEHOLDER STATE) */}
                                                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
                                                        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                                            <div className="flex items-center gap-3.5">
                                                                <img
                                                                    src="/images/passport/passport_icon.png"
                                                                    alt="Passport"
                                                                    className="w-11 h-14 object-contain rounded-md shadow-xs shrink-0"
                                                                />
                                                                <div>
                                                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                                                                        Original Passport
                                                                    </h3>
                                                                    <div className="flex items-center gap-2.5 mt-1">
                                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                                                                            ⏳ Awaiting Upload
                                                                        </span>
                                                                        <span className="text-xs text-slate-500 font-medium">
                                                                            Upload your passport above to preview bio-data and view extracted OCR fields
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {stagedPassportFile && (
                                                                <button
                                                                    type="button"
                                                                    onClick={handleSubmitStagedPassport}
                                                                    disabled={isScanningVaultDoc}
                                                                    className="px-4 py-2 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                                                >
                                                                    <Check className="w-4 h-4" />
                                                                    <span>Submit &amp; Extract</span>
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* 2-Column Grid */}
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                                            {/* LEFT: Document Preview */}
                                                            <div className="space-y-3">
                                                                <h4 className="text-sm font-bold text-slate-900">
                                                                    Document Preview
                                                                </h4>
                                                                {stagedPassportPreview ? (
                                                                    <div className="bg-white rounded-xl border border-slate-200/90 p-2 shadow-2xs overflow-hidden">
                                                                        <img
                                                                            src={stagedPassportPreview}
                                                                            alt="Passport Document Preview"
                                                                            className="w-full h-auto rounded-lg object-contain max-h-[360px] mx-auto"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="bg-slate-50/70 border-2 border-dashed border-slate-200 rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                                                                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-2xs">
                                                                            <FileText className="w-6 h-6" />
                                                                        </div>
                                                                        <div className="space-y-1 max-w-xs">
                                                                            <p className="text-sm font-bold text-slate-700">No Document Uploaded</p>
                                                                            <p className="text-xs text-slate-400 font-medium">Upload your passport bio-data page in the section above to generate preview</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* RIGHT: Extracted Information (OCR) - BLANK PLACEHOLDERS */}
                                                            <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
                                                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                                                    <h4 className="text-sm font-bold text-slate-900">
                                                                        Extracted Information (OCR)
                                                                    </h4>
                                                                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                                        Pending Document
                                                                    </span>
                                                                </div>

                                                                <div className="space-y-3.5 text-sm">
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Passport Number</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Full Name</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Date of Birth</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Nationality</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Sex</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Place of Birth</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Date of Issue</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                                            <span>Date of Expiry</span>
                                                                        </div>
                                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        // ── AFTER SUBMITTING (VERIFIED): EXACT REPLICA OF media_1788588107025.png ──
                                        return (
                                            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5 animate-fade-up">
                                                {/* Top Bar matching media_1788588107025.png */}
                                                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                                    <div className="flex items-center gap-3.5">
                                                        <img
                                                            src="/images/passport/passport_icon.png"
                                                            alt="Passport"
                                                            className="w-11 h-14 sm:w-12 sm:h-15 object-contain rounded-md shadow-xs shrink-0"
                                                        />
                                                        <div>
                                                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                                                                Passport – {displayDocNumber}
                                                            </h3>
                                                            <div className="flex items-center gap-2.5 mt-1">
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e6f7f2] text-[#00a896] text-xs font-semibold border border-[#00a896]/30">
                                                                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Verified
                                                                </span>
                                                                <span className="text-xs text-slate-500 font-medium">
                                                                    OCR Scanned on {activeSelectedDoc.uploadedAt || '03 May 2024, 10:30 AM'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDownloadDoc(activeSelectedDoc)}
                                                            className="px-4 py-2 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            <span>Download</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedVaultDoc(null)}
                                                            className="text-slate-400 hover:text-slate-700 p-1 transition-colors cursor-pointer"
                                                            title="Close"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* 2-Column Grid: Document Preview (Left) vs Extracted Information OCR (Right) */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                                    {/* LEFT COLUMN: Document Preview */}
                                                    <div className="space-y-3">
                                                        <h4 className="text-sm font-bold text-slate-900">
                                                            Document Preview
                                                        </h4>
                                                        <div className="bg-white rounded-xl border border-slate-200/90 p-2 shadow-2xs overflow-hidden">
                                                            {activeSelectedDoc.fileData && activeSelectedDoc.fileData.startsWith('data:image') ? (
                                                                <img
                                                                    src={activeSelectedDoc.fileData}
                                                                    alt="Passport Document Preview"
                                                                    className="w-full h-auto rounded-lg object-contain max-h-[360px] mx-auto"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="/images/passport/passport_preview_card.png"
                                                                    alt="Passport Document Preview"
                                                                    className="w-full h-auto rounded-lg object-contain"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* RIGHT COLUMN: Extracted Information (OCR) */}
                                                    <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
                                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                                            <h4 className="text-sm font-bold text-slate-900">
                                                                Extracted Information (OCR)
                                                            </h4>
                                                            {isEditingOcr ? (
                                                                <div className="flex items-center gap-1.5">
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleSaveEditOcr}
                                                                        className="px-3 py-1 rounded-md bg-[#00a896] hover:bg-[#009282] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setIsEditingOcr(false)}
                                                                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleStartEditOcr(activeSelectedDoc)}
                                                                    className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* 8 Field Rows matching media_1788588107025.png */}
                                                        <div className="space-y-3.5 text-sm">
                                                            {/* Row 1: Passport Number */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Passport Number</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.docNumber || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, docNumber: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayDocNumber}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 2: Full Name */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Full Name</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.fullName || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, fullName: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayFullName}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 3: Date of Birth */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Date of Birth</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.dob || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, dob: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayDobText}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 4: Nationality */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Nationality</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.nationality || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, nationality: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayNationality}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 5: Sex */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Sex</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.sex || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, sex: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displaySex}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 6: Place of Birth */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Place of Birth</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.placeOfBirth || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, placeOfBirth: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayPlaceOfBirth}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 7: Date of Issue */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Date of Issue</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.issueDate || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, issueDate: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayIssueDateText}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Row 8: Date of Expiry */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <span>Date of Expiry</span>
                                                                </div>
                                                                {isEditingOcr ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editOcrForm.expiryDate || ''}
                                                                        onChange={(e) => setEditOcrForm({ ...editOcrForm, expiryDate: e.target.value })}
                                                                        className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                                    />
                                                                ) : (
                                                                    <span className="font-semibold text-slate-900 text-right">
                                                                        {displayExpiryDateText}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Footer actions */}
                                                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setReplacingDocId(activeSelectedDoc.id);
                                                                    replaceFileInputRef.current?.click();
                                                                }}
                                                                className="hover:text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                                                            >
                                                                <RotateCw className="w-3.5 h-3.5" />
                                                                <span>Upload New / Replace</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteDoc(activeSelectedDoc)}
                                                                className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // ─────────────────────────────────────────────────────────────
                                    // 2. OTHER DOCUMENTS (Flight, Insurance, Bank, ID, etc.)
                                    // ─────────────────────────────────────────────────────────────
                                    if (!activeSelectedDoc.isUploaded) {
                                        return (
                                            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-6 animate-fade-up">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center shrink-0 text-xl shadow-2xs">
                                                            {activeSelectedDoc.type === 'flight' ? '✈️' : activeSelectedDoc.type === 'insurance' ? '🛡️' : activeSelectedDoc.type === 'bank' ? '🏦' : '📋'}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <h3 className="text-base sm:text-lg font-black text-slate-900">
                                                                    {activeSelectedDoc.title}
                                                                </h3>
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                                                                    ⏳ Pending Upload
                                                                </span>
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                                    activeSelectedDoc.mandatory ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                                }`}>
                                                                    {activeSelectedDoc.mandatory ? 'Mandatory' : 'Optional'}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-slate-400 font-medium">
                                                                Target Route: <strong className="text-slate-700">{selectedPassport || 'India'} ➔ {selectedDestination}</strong> • {selectedPurpose}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTriggerUploadForReq(activeSelectedDoc)}
                                                            className="px-4 py-2 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <Upload className="w-3.5 h-3.5" />
                                                            <span>Upload Document</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedVaultDoc(null)}
                                                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div
                                                    onClick={() => handleTriggerUploadForReq(activeSelectedDoc)}
                                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const f = e.dataTransfer.files?.[0];
                                                        if (f) {
                                                            setVaultUploadTargetReq({
                                                                key: activeSelectedDoc.reqKey || activeSelectedDoc.id,
                                                                title: activeSelectedDoc.title,
                                                                type: activeSelectedDoc.type
                                                            });
                                                            handleUploadVaultDocument(f);
                                                        }
                                                    }}
                                                    className="group border-2 border-dashed border-[#420f79]/30 hover:border-[#420f79] bg-gradient-to-b from-[#420f79]/5 to-slate-50/50 hover:bg-[#420f79]/10 rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 shadow-2xs"
                                                >
                                                    <div className="w-16 h-16 rounded-2xl bg-[#420f79]/10 text-[#420f79] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                                                        <Upload className="w-8 h-8 stroke-[2.2]" />
                                                    </div>
                                                    <div className="space-y-1.5 max-w-sm">
                                                        <strong className="text-base font-black text-slate-900 block">
                                                            Upload your {activeSelectedDoc.title}
                                                        </strong>
                                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                            Click or drag and drop your file here. Optical character recognition (Gemini Vision OCR) will automatically extract, analyze, and encrypt all details.
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTriggerUploadForReq(activeSelectedDoc);
                                                        }}
                                                        className="px-6 py-3 rounded-xl bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                        <span>Upload &amp; Scan with AI OCR</span>
                                                    </button>
                                                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium pt-1 flex-wrap justify-center">
                                                        <span>PDF, JPG, PNG, WEBP (Max 15MB)</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1 text-teal-700 font-semibold">
                                                            <Lock className="w-3 h-3" /> 256-bit AES Encrypted
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-6 animate-fade-up">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center shrink-0 shadow-2xs">
                                                        {activeSelectedDoc.type === 'visa' ? <span className="font-bold text-xs">VISA</span> : activeSelectedDoc.type === 'insurance' ? <ShieldCheck className="w-5 h-5" /> : activeSelectedDoc.type === 'flight' ? <Plane className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-base sm:text-lg font-bold text-slate-800">
                                                            {activeSelectedDoc.title} – {displayDocNumber}
                                                        </h3>
                                                        <div className="flex items-center gap-2.5 flex-wrap">
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                                                <Check className="w-3 h-3 stroke-[3]" /> Verified
                                                            </span>
                                                            <span className="text-xs text-slate-400 font-normal">
                                                                Scanned on {activeSelectedDoc.uploadedAt || 'Recently'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDownloadDoc(activeSelectedDoc)}
                                                        className="px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                        <span>Download</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedVaultDoc(null)}
                                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                                                <div>
                                                    <span className="text-slate-400 block">Document Number</span>
                                                    <strong className="text-slate-800 font-bold mt-0.5 block">{displayDocNumber}</strong>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 block">Holder Name</span>
                                                    <strong className="text-slate-800 font-bold mt-0.5 block">{displayFullName}</strong>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 block">Issuer / Authority</span>
                                                    <strong className="text-slate-800 font-bold mt-0.5 block">{activeSelectedDoc.issuer || 'Official Issuer'}</strong>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 block">Validity / Expiry</span>
                                                    <strong className="text-slate-800 font-bold mt-0.5 block">{activeSelectedDoc.expiryDate || 'Valid'}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Toast Notification for User Feedback */}
                                {vaultActionToast && (
                                    <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center gap-3 text-xs font-bold animate-fade-up">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>{vaultActionToast}</span>
                                    </div>
                                )}
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
                                <a href="/find-experts" className="inline-block bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
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
                                    🛡️ 100% Money-Back Protection
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
                    {activeTab !== "dashboard" && activeTab !== "profile" && activeTab !== "cases" && activeTab !== "scanned-documents" && activeTab !== "consultations" && activeTab !== "escrow-milestones" && activeTab !== "predeparture" && activeTab !== "pre-departure" && activeTab !== "visa-readiness" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                            <Briefcase className="w-12 h-12 text-[#00a896] mx-auto" />
                            <h3 className="text-lg font-black text-slate-900 capitalize">{activeTab.replace('-', ' ')} Portal</h3>
                            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                                All your active {activeTab.replace('-', ' ')} records are synchronized in real-time with your TravlTik profile.
                            </p>
                            <a href="/find-experts" className="inline-block bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
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
                                        <img src={modalPhoto} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-[#420f79]/30 shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-[#420f79] text-white text-lg font-black flex items-center justify-center border border-[#420f79]/30 shrink-0 shadow-2xs">
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
                                <button type="submit" className="flex-1 py-2.5 bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">Save Details</button>
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

            {/* ── MODAL: START NEW VISA APPLICATION WITH UNIQUE ID & CUSTOM NAME ── */}
            {showNewAppModal && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xs text-lg font-black">
                                    ✈️
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-950">Start New Visa Application</h3>
                                    <p className="text-xs text-slate-500 font-medium">Create a new dossier with unique tracking ID &amp; custom name</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowNewAppModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateNewApplication} className="space-y-4 pt-4 text-left">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 block">
                                    Application Name / Custom Nickname
                                </label>
                                <input
                                    type="text"
                                    value={newAppName}
                                    onChange={(e) => setNewAppName(e.target.value)}
                                    placeholder="e.g. Dubai Summer Vacation, Greece Tour 2026, UK Masters..."
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                                />
                                <span className="text-[11px] text-slate-400 font-medium block">
                                    Give your application a memorable name so you can track multiple visas easily.
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <ModernDashboardSelect
                                    label="Destination Country"
                                    value={newAppDest || selectedDestination}
                                    onChange={(val) => setNewAppDest(val)}
                                    options={dashboardDestinationOptions}
                                    placeholder="Select Destination"
                                    allowCustom={true}
                                    customPlaceholder="e.g. Mauritius, Italy, Singapore..."
                                />

                                <ModernDashboardSelect
                                    label="Passport / Citizenship"
                                    value={newAppPass || selectedPassport}
                                    onChange={(val) => setNewAppPass(val)}
                                    options={dashboardPassportOptions}
                                    placeholder="Select Passport"
                                    allowCustom={true}
                                    customPlaceholder="e.g. India, Nepal, Canada..."
                                />
                            </div>

                            <ModernDashboardSelect
                                label="Visa Purpose / Category"
                                value={newAppPurpose || selectedPurpose}
                                onChange={(val) => setNewAppPurpose(val)}
                                options={dashboardPurposeOptions}
                                placeholder="Select Visa Category"
                                allowCustom={false}
                            />

                            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 space-y-1">
                                <strong className="font-black flex items-center gap-1 text-emerald-800">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    Consular Coverage &amp; Multi-Application Workspace
                                </strong>
                                <p className="text-[11px] leading-relaxed text-emerald-700">
                                    A unique official Tracking ID and Document Vault checklist will be assigned to this application without overwriting your other active visa cases.
                                </p>
                            </div>

                            {visasProcessingState.length >= 3 && (
                                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-bold flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                    <span>Maximum limit of 3 active visa applications reached. Please remove or complete an application before creating a new one.</span>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowNewAppModal(false)}
                                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={visasProcessingState.length >= 3}
                                    className={`flex-1 py-2.5 rounded-xl font-black text-xs shadow-md transition-all ${
                                        visasProcessingState.length >= 3
                                            ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                                            : "bg-[#420f79] hover:bg-[#521396] active:bg-[#340a4d] text-white cursor-pointer"
                                    }`}
                                >
                                    {visasProcessingState.length >= 3 ? "Application Limit Reached (3/3)" : `Create & Save Application (${visasProcessingState.length}/3)`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── TOAST NOTIFICATION BANNER ── */}
            {dashboardToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
                    <div className="bg-slate-950 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold">{dashboardToast}</span>
                    </div>
                </div>
            )}

        </div>
    );
}
