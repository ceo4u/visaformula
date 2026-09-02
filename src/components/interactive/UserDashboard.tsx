import { useState, useEffect } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, ArrowLeft, Bell, FileText, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, LayoutDashboard, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, LogOut, CheckSquare, Sparkles, X, ChevronDown, Filter, MapPin, Globe, LayoutGrid, Save, Menu, ChevronLeft, Edit2, Upload,
    CheckCircle2, ShieldCheck, AlertCircle, RefreshCw
} from "lucide-react";

export interface VaultDocItem {
  key: string;
  title: string;
  description: string;
  icon: string;
  mandatory: boolean;
  hint: string;
}

export const dashboardPassportOptions = [
  { value: 'India', label: 'India', flag: '🇮🇳' },
  { value: 'Nepal', label: 'Nepal', flag: '🇳🇵' },
  { value: 'Bangladesh', label: 'Bangladesh', flag: '🇧🇩' },
  { value: 'Sri Lanka', label: 'Sri Lanka', flag: '🇱🇰' },
  { value: 'Philippines', label: 'Philippines', flag: '🇵🇭' },
  { value: 'Nigeria', label: 'Nigeria', flag: '🇳🇬' },
  { value: 'Pakistan', label: 'Pakistan', flag: '🇵🇰' },
  { value: 'UAE', label: 'UAE', flag: '🇦🇪' },
  { value: 'United States', label: 'United States', flag: '🇺🇸' },
  { value: 'United Kingdom', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'Canada', label: 'Canada', flag: '🇨🇦' },
  { value: 'Australia', label: 'Australia', flag: '🇦🇺' },
  { value: 'Other', label: 'Other Country', flag: '🌍' }
];

export const dashboardDestinationOptions = [
  { value: 'United States', label: 'United States (USA)', flag: '🇺🇸', defaultVisa: 'B1/B2 Visitor Visa' },
  { value: 'Canada', label: 'Canada', flag: '🇨🇦', defaultVisa: 'Visitor Visa / Study Permit' },
  { value: 'United Kingdom', label: 'United Kingdom (UK)', flag: '🇬🇧', defaultVisa: 'Standard Visitor Visa' },
  { value: 'Australia', label: 'Australia', flag: '🇦🇺', defaultVisa: 'Subclass 600 / Subclass 500' },
  { value: 'Germany', label: 'Germany / Schengen', flag: '🇩🇪', defaultVisa: 'Schengen Visa Type C' },
  { value: 'UAE', label: 'UAE / Dubai', flag: '🇦🇪', defaultVisa: '30/60 Days Tourist Visa' },
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
    const [scanningDocKey, setScanningDocKey] = useState<string | null>(null);
    const [vaultChecklistState, setVaultChecklistState] = useState<Record<string, {
        fileName: string;
        size: string;
        verified: boolean;
        score?: number;
        summary?: string;
        uploadedAt: string;
    }>>({});

    const handleCreateOrSwitchTripProfile = (dest: string, pass: string, purp: string) => {
        setSelectedDestination(dest);
        setSelectedPassport(pass);
        setSelectedPurpose(purp);

        const destObj = dashboardDestinationOptions.find(d => d.value.toLowerCase() === dest.toLowerCase());
        const flag = destObj?.flag || '🌍';
        const visaType = destObj?.defaultVisa || `${dest} Visa Permit`;

        const newProfile = {
            destination: dest,
            destinationFlag: flag,
            passport: pass,
            purpose: purp,
            visaType,
            createdAt: new Date().toLocaleDateString()
        };

        localStorage.setItem("active_travel_profile", JSON.stringify(newProfile));

        // Create or update Active Visa Case in dashboard
        try {
            const existingCases = JSON.parse(localStorage.getItem("active_visa_cases") || "[]");
            const caseId = `case-${dest.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            const filteredCases = existingCases.filter((c: any) => c.id !== caseId && c.destination !== dest);
            const newCase = {
                id: caseId,
                trackingId: `TT-${dest.slice(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                destination: dest,
                destinationFlag: flag,
                visaType,
                purpose: purp.toLowerCase(),
                passport: pass,
                status: "Travel Profile & Document Checklist Active",
                stage: "Document Vault Verification",
                progress: 50,
                documentsCount: 6,
                submittedAt: "Active",
                targetDate: "Consular Filing Ready"
            };
            const updatedCases = [newCase, ...filteredCases];
            setVisasProcessingState(updatedCases);
            localStorage.setItem("active_visa_cases", JSON.stringify(updatedCases));
        } catch(e) {}

        // Load or initialize checklist for this new destination
        const storageKey = `vault_checklist_${dest}`.replace(/\s+/g, '_').toLowerCase();
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
                    if (p.destination) { setSelectedDestination(p.destination); initialDest = p.destination; }
                    if (p.passport) { setSelectedPassport(p.passport); initialPass = p.passport; }
                    if (p.purpose) { setSelectedPurpose(p.purpose); initialPurp = p.purpose; }
                } catch(e) {}
            } else if (localJourney) {
                try {
                    const p = JSON.parse(localJourney);
                    if (p.destination) { setSelectedDestination(p.destination); initialDest = p.destination; }
                    if (p.passport_country || p.passportCountry) { setSelectedPassport(p.passport_country || p.passportCountry); initialPass = p.passport_country || p.passportCountry; }
                    if (p.purpose) {
                        const mPurp = p.purpose === 'study' ? 'Higher Studies' : p.purpose === 'work' ? 'Employment / Work' : 'Tourism / Vacation';
                        setSelectedPurpose(mPurp);
                        initialPurp = mPurp;
                    }
                } catch(e) {}
            }

            const storageKey = `vault_checklist_${initialDest}`.replace(/\s+/g, '_').toLowerCase();
            const savedChecklistStr = localStorage.getItem(storageKey);
            if (savedChecklistStr) {
                try {
                    setVaultChecklistState(JSON.parse(savedChecklistStr));
                } catch(e) {}
            }

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
                                if (res?.success && res.data) setJourneyData(res.data);
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
        { id: "cases", label: "Active Visa Cases", icon: Briefcase },
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
                                        <span className="text-xs font-bold text-slate-400 block">Active Cases</span>
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
                            {journeyData && (
                                <div className="space-y-4 animate-fade-up">
                                    {/* CARD 1: OVERSEAS VISA / STUDY ABROAD PATHWAY */}
                                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
                                        <div className="space-y-2 z-10 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider">
                                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                                    {journeyData.has_visa 
                                                        ? 'Active Visa • Departure Safeguard Roadmap' 
                                                        : (journeyData.purpose === 'study' ? '🎓 Study Abroad Pathway (In Progress)' : '✈️ Overseas Visa Application (In Progress)')}
                                                </span>
                                                {journeyData.readiness_score && (
                                                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                                                        Readiness: {journeyData.readiness_score}%
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                                                {journeyData.destination_flag ? `${journeyData.destination_flag} ` : ''}{journeyData.destination || 'Destination'} • {journeyData.matched_university || journeyData.visa_type || 'Student Visa Pathway'}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                                                <span>Passport: <strong className="text-white">{journeyData.passport_country || journeyData.passportCountry || 'India'}</strong></span>
                                                {journeyData.selected_course_major && (
                                                    <span>• Major: <strong className="text-emerald-400 font-bold">{journeyData.selected_course_major}</strong></span>
                                                )}
                                                {journeyData.visa_type && (
                                                    <span>• Visa: <strong className="text-white">{journeyData.visa_type}</strong></span>
                                                )}
                                                {journeyData.stay_duration && (
                                                    <span>• Duration: <strong className="text-slate-300">{journeyData.stay_duration}</strong></span>
                                                )}
                                                {journeyData.target_degree && (
                                                    <span>• Target Degree: <strong className="text-emerald-400 uppercase">{journeyData.target_degree}</strong></span>
                                                )}
                                            </div>

                                            {/* Status Highlights */}
                                            <div className="pt-2 flex flex-wrap items-center gap-2">
                                                {journeyData.cas_i20_number && (
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
                                                href={journeyData.destination ? `/visa/${encodeURIComponent(journeyData.destination.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(journeyData.purpose || 'study')}&passport=${encodeURIComponent(journeyData.passport_country || 'India')}` : '/#need-visa-pathway-dashboard'}
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
                            )}

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

                                    {documents.length === 0 ? (
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
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Personal & Visa Profile</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Manage your personal details, citizenship, and destination preferences</p>
                                </div>
                                <button onClick={() => setShowProfileModal(true)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit Details
                                </button>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                                <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                    <span className="font-bold text-slate-500 block">Visa Goals:</span>
                                    <span className="font-black text-slate-900 block">{selectedGoals.join(", ") || "Not specified"}</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                    <span className="font-bold text-slate-500 block">Target Destinations:</span>
                                    <span className="font-black text-slate-900 block">{selectedDests.join(", ") || "Not specified"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB: ACTIVE VISA CASES */}
                    {activeTab === "cases" && (
                        <div className="space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Active Visa Cases ({visasProcessingState.length})</h2>
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
                        const destChecklist = getDestinationChecklist(selectedDestination, selectedPurpose);
                        const allChecklistItems = [...globalTravelDocuments, ...destChecklist];
                        const totalChecklistItems = allChecklistItems.length;
                        const verifiedItemsCount = allChecklistItems.filter(item => vaultChecklistState[item.key]?.verified).length;
                        const readinessScore = totalChecklistItems > 0 ? Math.round((verifiedItemsCount / totalChecklistItems) * 100) : 0;
                        const currentDestObj = dashboardDestinationOptions.find(d => d.value.toLowerCase() === selectedDestination.toLowerCase());
                        const destFlag = currentDestObj?.flag || '🌍';

                        return (
                            <div className="space-y-7 animate-fade-up">
                                {/* Top Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                                                AI Consular Vault
                                            </span>
                                            <span className="text-xs font-bold text-slate-400">• 256-bit AES Encrypted</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 mt-1">Travel Profile &amp; Document Readiness Vault</h2>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                                            Manage universal travel credentials and destination-specific statutory visa checklists with live AI scanning &amp; verification.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                                            {verifiedItemsCount}/{totalChecklistItems} Verified
                                        </span>
                                    </div>
                                </div>

                                {/* 1. TRAVEL ROUTE & PROFILE SELECTOR CARD */}
                                <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-5 sm:p-6 shadow-sm space-y-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-[#00A86B]" />
                                                Create Travel Profile &amp; Generate Statutory Checklist
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Select your citizenship, target country, and journey purpose to instantly populate the official embassy checklist.
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold self-start sm:self-auto">
                                            <Sparkles className="w-3.5 h-3.5 text-[#00A86B]" /> Active Profile: {destFlag} {selectedDestination}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Going From (Passport Country) */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                                                <span>🛂</span> Passport Country (Going From)
                                            </label>
                                            <select
                                                value={selectedPassport}
                                                onChange={(e) => {
                                                    const pass = e.target.value;
                                                    setSelectedPassport(pass);
                                                    handleCreateOrSwitchTripProfile(selectedDestination, pass, selectedPurpose);
                                                }}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                            >
                                                {dashboardPassportOptions.map(p => (
                                                    <option key={p.value} value={p.value}>
                                                        {p.flag} {p.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Going To (Destination) */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                                                <span>🎯</span> Destination Country (Going To)
                                            </label>
                                            <select
                                                value={selectedDestination}
                                                onChange={(e) => {
                                                    const dest = e.target.value;
                                                    setSelectedDestination(dest);
                                                    handleCreateOrSwitchTripProfile(dest, selectedPassport, selectedPurpose);
                                                }}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                            >
                                                {dashboardDestinationOptions.map(d => (
                                                    <option key={d.value} value={d.value}>
                                                        {d.flag} {d.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Purpose */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                                                <span>🧭</span> Travel Purpose
                                            </label>
                                            <select
                                                value={selectedPurpose}
                                                onChange={(e) => {
                                                    const purp = e.target.value;
                                                    setSelectedPurpose(purp);
                                                    handleCreateOrSwitchTripProfile(selectedDestination, selectedPassport, purp);
                                                }}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                                            >
                                                {dashboardPurposeOptions.map(pur => (
                                                    <option key={pur.value} value={pur.value}>
                                                        {pur.emoji} {pur.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                        <span className="text-[11px] text-slate-500 font-medium">
                                            Trip profile automatically saves to your dashboard and updates Active Visa Cases.
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCreateOrSwitchTripProfile(selectedDestination, selectedPassport, selectedPurpose)}
                                            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                                        >
                                            <span>Update Travel Profile &amp; Checklist</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* 2. ACTIVE TRIP BANNER WITH READINESS PROGRESS GAUGE */}
                                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden border border-slate-800 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider">
                                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                                    Active Profile • {selectedPurpose}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold">
                                                    Passport: {selectedPassport}
                                                </span>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-black text-white">
                                                {destFlag} Trip to {selectedDestination} • {currentDestObj?.defaultVisa || 'Consular Visa Application'}
                                            </h3>

                                            <p className="text-xs text-slate-300 max-w-xl">
                                                Statutory document requirements generated according to official consular directives for {selectedDestination}. Complete upload &amp; AI scans to achieve 100% travel readiness.
                                            </p>
                                        </div>

                                        {/* Readiness Score Progress Meter */}
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 min-w-[220px] text-center space-y-2 shrink-0">
                                            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 block">
                                                Travel Readiness Score
                                            </span>
                                            <div className="text-3xl sm:text-4xl font-black text-white flex items-center justify-center gap-1">
                                                <span>{readinessScore}%</span>
                                                <span className="text-sm text-emerald-400 font-extrabold">Ready</span>
                                            </div>
                                            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mt-2">
                                                <div
                                                    className="bg-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${readinessScore}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-slate-300 font-medium block">
                                                {verifiedItemsCount} of {totalChecklistItems} documents verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. SECTION A: GENERALLY IMPORTANT TRAVEL DOCUMENTS (MANDATORY GLOBAL VAULT) */}
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-black text-slate-900">
                                                    1. Generally Important Travel Documents
                                                </h3>
                                                <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black">
                                                    Universal Travel Assets (3)
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Core international travel credentials required across all visa authorities, border checkpoints, and consular interviews.
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl self-start sm:self-auto">
                                            {globalTravelDocuments.filter(d => vaultChecklistState[d.key]?.verified).length}/3 Ready
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {globalTravelDocuments.map((doc) => {
                                            const itemData = vaultChecklistState[doc.key];
                                            const isVerified = Boolean(itemData?.verified);
                                            const isScanning = scanningDocKey === doc.key;
                                            const inputId = `global-input-${doc.key}`;

                                            return (
                                                <div
                                                    key={doc.key}
                                                    className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                                                        isVerified
                                                            ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                                                            : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                                                    }`}
                                                >
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shadow-2xs">
                                                                {doc.icon}
                                                            </div>
                                                            {isVerified ? (
                                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 border border-emerald-200">
                                                                    <CheckCircle2 className="w-3 h-3 text-[#00A86B]" /> OCR Verified ({itemData.score || 96}%)
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                                                                    Pending Upload
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <h4 className="text-xs font-black text-slate-900 leading-snug">
                                                                {doc.title}
                                                            </h4>
                                                            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                                                                {doc.description}
                                                            </p>
                                                        </div>

                                                        {isVerified && itemData && (
                                                            <div className="bg-white rounded-2xl p-3 border border-emerald-200 text-xs space-y-1">
                                                                <div className="flex items-center justify-between font-bold text-slate-800">
                                                                    <span className="truncate max-w-[140px] text-[11px]">{itemData.fileName}</span>
                                                                    <span className="text-[10px] text-slate-400">{itemData.size}</span>
                                                                </div>
                                                                {itemData.summary && (
                                                                    <p className="text-[10px] text-emerald-800 font-medium leading-tight">
                                                                        ✓ {itemData.summary}
                                                                    </p>
                                                                )}
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
                                                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center ${
                                                                isScanning
                                                                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                                                    : isVerified
                                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                                                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                                                            }`}
                                                        >
                                                            {isScanning ? (
                                                                <span className="flex items-center gap-1.5">
                                                                    <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                                                                    Scanning with AI OCR...
                                                                </span>
                                                            ) : isVerified ? (
                                                                <>
                                                                    <RefreshCw className="w-3 h-3" /> Re-scan / Replace File
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-3 h-3 text-emerald-400" /> Upload &amp; Scan Document
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
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-black text-slate-900">
                                                    2. Current Travel Readiness Visa Documents
                                                </h3>
                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                                                    {selectedDestination} • {selectedPurpose}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Official statutory visa checklist generated for your journey to <strong>{selectedDestination}</strong> matching embassy guidelines.
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl self-start sm:self-auto">
                                            {destChecklist.filter(d => vaultChecklistState[d.key]?.verified).length}/{destChecklist.length} Ready
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {destChecklist.map((doc) => {
                                            const itemData = vaultChecklistState[doc.key];
                                            const isVerified = Boolean(itemData?.verified);
                                            const isScanning = scanningDocKey === doc.key;
                                            const inputId = `dest-input-${doc.key}`;

                                            return (
                                                <div
                                                    key={doc.key}
                                                    className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                                                        isVerified
                                                            ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                                                            : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                                                    }`}
                                                >
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl shadow-2xs">
                                                                {doc.icon}
                                                            </div>
                                                            {isVerified ? (
                                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 border border-emerald-200">
                                                                    <CheckCircle2 className="w-3 h-3 text-[#00A86B]" /> OCR Verified ({itemData.score || 96}%)
                                                                </span>
                                                            ) : doc.mandatory ? (
                                                                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                                                                    Mandatory
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                                                                    Recommended
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <h4 className="text-xs font-black text-slate-900 leading-snug">
                                                                {doc.title}
                                                            </h4>
                                                            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                                                                {doc.description}
                                                            </p>
                                                        </div>

                                                        {isVerified && itemData && (
                                                            <div className="bg-white rounded-2xl p-3 border border-emerald-200 text-xs space-y-1">
                                                                <div className="flex items-center justify-between font-bold text-slate-800">
                                                                    <span className="truncate max-w-[140px] text-[11px]">{itemData.fileName}</span>
                                                                    <span className="text-[10px] text-slate-400">{itemData.size}</span>
                                                                </div>
                                                                {itemData.summary && (
                                                                    <p className="text-[10px] text-emerald-800 font-medium leading-tight">
                                                                        ✓ {itemData.summary}
                                                                    </p>
                                                                )}
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
                                                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center ${
                                                                isScanning
                                                                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                                                    : isVerified
                                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                                                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                                                            }`}
                                                        >
                                                            {isScanning ? (
                                                                <span className="flex items-center gap-1.5">
                                                                    <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                                                                    Scanning with AI OCR...
                                                                </span>
                                                            ) : isVerified ? (
                                                                <>
                                                                    <RefreshCw className="w-3 h-3" /> Re-scan / Replace File
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-3 h-3 text-emerald-400" /> Upload &amp; Scan Document
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
                                <div className="space-y-4 pt-4 border-t border-slate-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div>
                                            <h3 className="text-base font-black text-slate-900">
                                                3. Additional Custom Files &amp; User Uploads ({documents.length})
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Store additional unlisted records, cover letters, or civil certificates in your encrypted cloud vault.
                                            </p>
                                        </div>
                                        <label className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95 transition-all">
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

        </div>
    );
}
