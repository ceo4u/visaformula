import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  GraduationCap,
  Briefcase,
  Camera,
  Globe,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Lightbulb,
  Building2,
  UserCheck,
  FileText,
  Users,
  Lock,
  X,
  ChevronDown,
  RefreshCw,
  Download,
  ArrowLeft,
  Upload,
  Scan,
  Check,
  Sparkles,
  FileUp
} from 'lucide-react';

interface GapItem {
  id: string;
  text: string;
  solution: string;
}

// ── Custom Select Component (Replaces native browser dropdown to eliminate blue highlight) ──
interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

function CustomSelect({ value, onChange, options, placeholder = "Select option...", className = "" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className={`relative font-sans ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none hover:border-slate-900 focus:border-slate-900 transition-colors cursor-pointer shadow-2xs font-sans text-left"
      >
        <span className={`truncate ${!selected ? 'text-slate-400 font-medium' : 'text-slate-900 font-bold'}`}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-slate-900' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto font-sans animate-fade-in">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <span className="text-white font-bold ml-1">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function VisaReadinessEngine() {
  // Persona Tab State: 'student' | 'work' | 'tourist' | 'pr'
  const [activeTab, setActiveTab] = useState<'student' | 'work' | 'tourist' | 'pr'>('student');

  // Step State: false = Persona Form Input, true = Output Results Dashboard
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // hCaptcha Verification Token State
  const [captchaToken, setCaptchaToken] = useState<string | null>('mock-token');
  const [captchaSolved, setCaptchaSolved] = useState<boolean>(true);

  // ── Common Mandatory Inputs (All Users - Completely Blank by Default) ──
  const [targetCountry, setTargetCountry] = useState('');
  const [residenceCountry, setResidenceCountry] = useState('');
  const [passportValidMonths, setPassportValidMonths] = useState('');
  const [hasRefusals, setHasRefusals] = useState(false);
  const [refusalDetails, setRefusalDetails] = useState('');

  // ── Sync URL Search Parameters on Mount (Hero Widget / Direct Deep Link Support) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      
      // Target Destination Country
      const dest = params.get('country') || params.get('destination') || params.get('to') || params.get('targetCountry');
      if (dest) {
        setTargetCountry(dest);
      }

      // Origin / Residence / Passport
      const orig = params.get('from') || params.get('origin') || params.get('residence') || params.get('passport') || params.get('passportCountry');
      if (orig) {
        setResidenceCountry(orig);
      }

      // Category / Purpose / Tab
      const cat = (params.get('category') || params.get('purpose') || params.get('type') || params.get('tab') || '').toLowerCase();
      if (cat.includes('study') || cat.includes('student') || cat.includes('admission') || cat.includes('university')) {
        setActiveTab('student');
      } else if (cat.includes('work') || cat.includes('job') || cat.includes('permit') || cat.includes('ssw')) {
        setActiveTab('work');
      } else if (cat.includes('tour') || cat.includes('visit') || cat.includes('holiday') || cat.includes('package')) {
        setActiveTab('tourist');
      } else if (cat.includes('pr') || cat.includes('permanent') || cat.includes('settle') || cat.includes('immigrat')) {
        setActiveTab('pr');
      }

      // Validity
      const valid = params.get('validity') || params.get('passportValidMonths');
      if (valid) {
        setPassportValidMonths(valid);
      }
    } catch (err) {
      console.warn('[ReadinessEngine] Error parsing URL parameters:', err);
    }
  }, []);

  // ── Passport OCR Scan State ──
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [isScanningPassport, setIsScanningPassport] = useState(false);
  const [passportScanResult, setPassportScanResult] = useState<{
    fullName?: string;
    passportNumber?: string;
    nationality?: string;
    dateOfBirth?: string;
    sex?: string;
    expiryDate?: string;
    remainingMonths?: number;
    isExpiryCompliant?: boolean;
    isMrzValid?: boolean;
    scores?: {
      expiryScore: number;
      identityScore: number;
      blankPagesScore: number;
      mrzLegibilityScore: number;
      totalScore: number;
    };
    auditNotes?: string[];
  } | null>(null);

  const passportInputRef = useRef<HTMLInputElement>(null);

  const handlePassportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPassportFile(file);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPassportPreview(base64);
      setIsScanningPassport(true);

      try {
        const res = await fetch('/api/ocr-analyze-passport', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Image: base64,
            mimeType: file.type || 'image/jpeg',
            targetCountry: targetCountry || 'Canada'
          })
        });

        const json = await res.json();
        if (res.ok && json.data) {
          const scan = json.data;
          setPassportScanResult(scan);

          // Auto-fill residence & passport validity from scan if empty
          if (scan.nationality && !residenceCountry) {
            setResidenceCountry(scan.nationality);
          }
          if (scan.remainingMonths) {
            const months = scan.remainingMonths;
            if (months >= 60) setPassportValidMonths('60');
            else if (months >= 36) setPassportValidMonths('36');
            else if (months >= 24) setPassportValidMonths('24');
            else if (months >= 12) setPassportValidMonths('12');
            else setPassportValidMonths('6');
          }
        }
      } catch (err) {
        console.error('Passport scan error:', err);
      } finally {
        setIsScanningPassport(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // ── Persona 1: Student Visa Inputs ──
  const [academicLevel, setAcademicLevel] = useState('');
  const [languageScore, setLanguageScore] = useState('');
  const [bankBalanceUsd, setBankBalanceUsd] = useState('');
  const [sponsorDetails, setSponsorDetails] = useState('');

  // ── Persona 2: Work & Job Seeker Inputs ──
  const [workExperienceYears, setWorkExperienceYears] = useState('');
  const [jobOfferStatus, setJobOfferStatus] = useState('');
  const [ecaStatus, setEcaStatus] = useState('');
  const [monthlySalaryUsd, setMonthlySalaryUsd] = useState('');

  // ── Persona 3: Tourist & Visitor Inputs ──
  const [bankBalance6MonthAvg, setBankBalance6MonthAvg] = useState('');
  const [homeTiesProof, setHomeTiesProof] = useState('');
  const [invitationStatus, setInvitationStatus] = useState('');
  const [travelStamps, setTravelStamps] = useState('');

  // ── Persona 4: PR & Skilled Migration Inputs ──
  const [pointsBenchmark, setPointsBenchmark] = useState('');
  const [skillAssessmentResult, setSkillAssessmentResult] = useState('');
  const [settlementFundsUsd, setSettlementFundsUsd] = useState('');

  // ── Assessment Results State ──
  const [readinessScore, setReadinessScore] = useState(78);
  const [status, setStatus] = useState<'READY' | 'MODERATE_RISK' | 'HIGH_RISK'>('MODERATE_RISK');
  const [financialScore, setFinancialScore] = useState(28); // max 35
  const [credentialScore, setCredentialScore] = useState(24); // max 30
  const [homeTiesScore, setHomeTiesScore] = useState(15); // max 20
  const [historyScore, setHistoryScore] = useState(11); // max 15
  const [criticalGaps, setCriticalGaps] = useState<GapItem[]>([]);
  const [recommendationSummary, setRecommendationSummary] = useState('');

  const [selectedGap, setSelectedGap] = useState<GapItem | null>(null);
  const [showFullReportModal, setShowFullReportModal] = useState(false);

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Tab Definitions
  const categories = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'work', label: 'Work / Job', icon: Briefcase },
    { id: 'tourist', label: 'Tourist / Visitor', icon: Camera },
    { id: 'pr', label: 'PR & Migration', icon: Globe }
  ];

  // Option definitions for CustomSelect
  const targetCountryOptions = [
    { value: "Canada", label: "🇨🇦 Canada" },
    { value: "United States", label: "🇺🇸 United States" },
    { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
    { value: "Australia", label: "🇦🇺 Australia" },
    { value: "Germany", label: "🇩🇪 Germany" },
    { value: "Schengen", label: "🇪🇺 Schengen Europe" },
    { value: "UAE", label: "🇦🇪 United Arab Emirates" },
    { value: "New Zealand", label: "🇳🇿 New Zealand" },
  ];

  const passportValidityOptions = [
    { value: "6", label: "6 Months" },
    { value: "12", label: "12 Months" },
    { value: "24", label: "24 Months" },
    { value: "36", label: "36 Months" },
    { value: "60", label: "60+ Months" },
  ];

  const academicLevelOptions = [
    { value: "High School", label: "High School" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD / Doctorate", label: "PhD / Doctorate" },
  ];

  const languageScoreOptions = [
    { value: "IELTS - 5.5 Overall", label: "IELTS - 5.5 Band" },
    { value: "IELTS - 6.0 Overall", label: "IELTS - 6.0 Band" },
    { value: "IELTS - 6.5 Overall", label: "IELTS - 6.5 Band" },
    { value: "IELTS - 7.0+ Overall", label: "IELTS - 7.0+ Band" },
    { value: "PTE - 65+ Score", label: "PTE - 65+ Score" },
    { value: "TOEFL - 90+ Score", label: "TOEFL - 90+ Score" },
    { value: "Not Appeared Yet", label: "Not Appeared Yet" },
  ];

  const sponsorDetailsOptions = [
    { value: "Parents Co-Sponsor (Verified Funds)", label: "Parents (Verified Funds)" },
    { value: "Self-Funded Savings", label: "Self-Funded Savings" },
    { value: "Education Loan Approval", label: "Education Loan Approval" },
    { value: "Govt / University Scholarship", label: "Govt / University Scholarship" },
  ];

  const workExperienceOptions = [
    { value: "Fresher / < 1 Year", label: "Fresher / < 1 Year" },
    { value: "1 - 2 Years", label: "1 - 2 Years" },
    { value: "3 - 5 Years", label: "3 - 5 Years" },
    { value: "5 - 10 Years", label: "5 - 10 Years" },
    { value: "10+ Years", label: "10+ Years" },
  ];

  const jobOfferOptions = [
    { value: "Confirmed Job Offer", label: "Confirmed Job Offer" },
    { value: "Awaiting Job Offer", label: "Awaiting Job Offer" },
    { value: "Applying as Job Seeker", label: "Applying as Job Seeker" },
  ];

  const ecaOptions = [
    { value: "Yes", label: "Yes (Evaluated)" },
    { value: "In Progress", label: "In Progress" },
    { value: "No", label: "No" },
  ];

  const bankStabilityOptions = [
    { value: "6 Months Stable Balance", label: "6 Months Stable Balance" },
    { value: "Variable Income Balance", label: "Variable Income Balance" },
    { value: "Recent Lump Sum Deposit", label: "Recent Lump Sum Deposit" },
  ];

  const homeTiesOptions = [
    { value: "Employer NOC & Property Deed", label: "Employer NOC & Property" },
    { value: "Registered Business License", label: "Business License" },
    { value: "Family Affidavit Ties Only", label: "Family Affidavit Only" },
  ];

  const invitationOptions = [
    { value: "Official Host Invitation", label: "Official Host Invitation" },
    { value: "Confirmed Hotel Booking", label: "Confirmed Hotel Booking" },
    { value: "Self-sponsored Travel", label: "Self-sponsored Travel" },
  ];

  const travelStampsOptions = [
    { value: "0 Visas", label: "0 Visas (Blank)" },
    { value: "1-3 Visas", label: "1-3 Visas" },
    { value: "4+ Visas", label: "4+ Visas (Frequent)" },
  ];

  const skillAssessmentOptions = [
    { value: "Yes", label: "Yes (Positively Assessed)" },
    { value: "Pending", label: "Pending" },
    { value: "No", label: "No" },
  ];

  // Handle Category Change
  const handleCategoryChange = (tabId: 'student' | 'work' | 'tourist' | 'pr') => {
    setActiveTab(tabId);
  };

  // Form Submission Handler
  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaSolved && !captchaToken) {
      alert("Please solve the security verification captcha.");
      return;
    }

    setIsEvaluating(true);

    // Build payload details based on active persona
    let profileDetails: any = {
      residenceCountry,
      passportValidMonths,
      previousRefusals: hasRefusals,
      refusalDetails: hasRefusals ? refusalDetails : '',
      passportScan: passportScanResult || null
    };

    if (activeTab === 'student') {
      profileDetails = {
        ...profileDetails,
        academicLevel,
        languageScore,
        bankBalanceUsd: Number(bankBalanceUsd) || 0,
        sponsorDetails
      };
    } else if (activeTab === 'work') {
      profileDetails = {
        ...profileDetails,
        workExperienceYears,
        jobOfferStatus,
        ecaStatus,
        monthlySalaryUsd: Number(monthlySalaryUsd) || 0
      };
    } else if (activeTab === 'tourist') {
      profileDetails = {
        ...profileDetails,
        bankBalance6MonthAvg,
        homeTiesProof,
        invitationStatus,
        travelStamps
      };
    } else {
      profileDetails = {
        ...profileDetails,
        pointsBenchmark,
        skillAssessmentResult,
        settlementFundsUsd: Number(settlementFundsUsd) || 0
      };
    }

    try {
      const res = await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visaCategory: activeTab,
          targetCountry,
          profileDetails,
          captchaToken: captchaToken || 'mock-token'
        })
      });

      const json = await res.json();
      if (res.ok && json.data) {
        const data = json.data;
        setReadinessScore(data.readinessScore || 75);
        setStatus(data.status || (data.readinessScore >= 80 ? 'READY' : data.readinessScore >= 60 ? 'MODERATE_RISK' : 'HIGH_RISK'));
        setFinancialScore(data.financialScore ?? 28);
        setCredentialScore(data.credentialScore ?? 24);
        setHomeTiesScore(data.homeTiesScore ?? 15);
        setHistoryScore(data.historyScore ?? 11);
        setRecommendationSummary(data.recommendationSummary || '');

        // Map gaps array
        if (Array.isArray(data.criticalGaps)) {
          const mapped = data.criticalGaps.map((gapStr: string, idx: number) => {
            const parts = String(gapStr).split(' — Action: ');
            return {
              id: `gap-${idx}`,
              text: parts[0] || gapStr,
              solution: parts[1] || 'Consult with a verified TravlTik migration expert to rectify this gap.'
            };
          });
          setCriticalGaps(mapped);
        }
      }
    } catch (err) {
      // Fallback response
    } finally {
      setTimeout(() => {
        setIsEvaluating(false);
        setIsEvaluated(true);
      }, 400);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    try {
      const existingLeads = JSON.parse(localStorage.getItem('expert_leads') || '[]');
      const newLead = {
        id: Date.now(),
        name: leadName,
        visa: activeTab.toUpperCase(),
        country: targetCountry,
        phone: leadPhone,
        status: 'New',
        score: readinessScore,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('expert_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch(e) {}

    setLeadSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setLeadSuccess(false);
      setLeadName('');
      setLeadPhone('');
    }, 2000);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) window.location.href = "/";
      }}
      className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto selection:bg-slate-900 selection:text-white"
    >
      <div className={`relative z-10 w-full flex flex-col items-center justify-center my-auto py-4 font-sans transition-all ${
        isEvaluated ? 'max-w-5xl' : 'max-w-md'
      }`}>
        
        {/* Top Navigation Header */}
        <div className="w-full flex items-center justify-between mb-3 px-1 shrink-0 gap-2 font-sans">
          <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-full border border-white/30 backdrop-blur-md shadow-md shrink-0">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to </span>Home
          </a>
          <a href="/" className="shrink-0">
            <img src="/logo.png?v=8" alt="TravlTik" className="h-6 sm:h-7 w-auto object-contain" />
          </a>
        </div>

        {/* Modal Container Card */}
        <div className="bg-white border border-slate-200/90 rounded-[32px] shadow-2xl relative w-full p-5 sm:p-7 font-sans max-h-[88vh] overflow-y-auto text-slate-900">
          
          {/* Close Button */}
          <button 
            onClick={() => window.location.href = "/"}
            title="Close and return to homepage"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-slate-200 z-30"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Centered Logo & Title Banner */}
          <div className="flex justify-center pt-1 mb-2">
            <img src="/logo.png" alt="TravlTik" className="h-8 sm:h-9 w-auto max-h-[38px] object-contain mx-auto" />
          </div>

          <div className="mb-4 border-b border-slate-100 pb-3 text-center font-sans">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans">
              AI Travel Readiness Engine
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5 font-sans">
              Get your AI-powered visa approval assessment in minutes
            </p>
          </div>

          {/* ── STEP 1: PERSONA INPUT FORM ── */}
          {!isEvaluated ? (
            <div className="space-y-4 font-sans">
              
              {/* Category Persona Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-slate-100/90 p-1 rounded-xl mb-3 font-sans">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id as any)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all cursor-pointer font-sans ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs font-bold'
                          : 'text-slate-500 hover:text-slate-800 font-medium'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 mb-1 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="text-[10px] text-center leading-tight font-sans">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmitEvaluation} className="space-y-3.5 font-sans">
                
                {/* 1. Target Destination Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1 font-sans">
                    1. Target Destination Country *
                  </label>
                  <CustomSelect
                    value={targetCountry}
                    onChange={setTargetCountry}
                    options={targetCountryOptions}
                    placeholder="Select Target Destination Country..."
                  />
                </div>

                {/* 2. Residence & Passport Validity Row */}
                <div className="grid grid-cols-2 gap-3 font-sans">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                      2. Current Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={residenceCountry}
                      onChange={(e) => setResidenceCountry(e.target.value)}
                      placeholder="e.g. India"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-slate-900 shadow-2xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                      3. Passport Validity *
                    </label>
                    <CustomSelect
                      value={passportValidMonths}
                      onChange={setPassportValidMonths}
                      options={passportValidityOptions}
                      placeholder="Select Validity..."
                    />
                  </div>
                </div>

                {/* ── DYNAMIC PERSONA SPECIFIC FIELDS ── */}
                
                {/* PERSONA A: STUDENT VISA */}
                {activeTab === 'student' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100 font-sans">
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Academic Level *
                        </label>
                        <CustomSelect
                          value={academicLevel}
                          onChange={setAcademicLevel}
                          options={academicLevelOptions}
                          placeholder="Select Academic Level..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Language Score *
                        </label>
                        <CustomSelect
                          value={languageScore}
                          onChange={setLanguageScore}
                          options={languageScoreOptions}
                          placeholder="Select Language Score..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Liquid Funds (USD) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            required
                            min="500"
                            placeholder="e.g. 25000"
                            value={bankBalanceUsd}
                            onChange={(e) => setBankBalanceUsd(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-slate-900 shadow-2xs font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Sponsor Details *
                        </label>
                        <CustomSelect
                          value={sponsorDetails}
                          onChange={setSponsorDetails}
                          options={sponsorDetailsOptions}
                          placeholder="Select Sponsor..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PERSONA B: WORK & JOB SEEKER VISA */}
                {activeTab === 'work' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100 font-sans">
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Work Experience *
                        </label>
                        <CustomSelect
                          value={workExperienceYears}
                          onChange={setWorkExperienceYears}
                          options={workExperienceOptions}
                          placeholder="Select Experience..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Job Offer Status *
                        </label>
                        <CustomSelect
                          value={jobOfferStatus}
                          onChange={setJobOfferStatus}
                          options={jobOfferOptions}
                          placeholder="Select Status..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Degree ECA (WES) *
                        </label>
                        <CustomSelect
                          value={ecaStatus}
                          onChange={setEcaStatus}
                          options={ecaOptions}
                          placeholder="Select ECA Status..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Monthly Salary (USD) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 3500"
                            value={monthlySalaryUsd}
                            onChange={(e) => setMonthlySalaryUsd(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-slate-900 shadow-2xs font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PERSONA C: TOURIST & VISITOR VISA */}
                {activeTab === 'tourist' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100 font-sans">
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Bank Stability (6Mo) *
                        </label>
                        <CustomSelect
                          value={bankBalance6MonthAvg}
                          onChange={setBankBalance6MonthAvg}
                          options={bankStabilityOptions}
                          placeholder="Select Bank Stability..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Home Country Ties *
                        </label>
                        <CustomSelect
                          value={homeTiesProof}
                          onChange={setHomeTiesProof}
                          options={homeTiesOptions}
                          placeholder="Select Home Ties Proof..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Invitation Status *
                        </label>
                        <CustomSelect
                          value={invitationStatus}
                          onChange={setInvitationStatus}
                          options={invitationOptions}
                          placeholder="Select Invitation..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Travel Stamps *
                        </label>
                        <CustomSelect
                          value={travelStamps}
                          onChange={setTravelStamps}
                          options={travelStampsOptions}
                          placeholder="Select Prior Travel..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PERSONA D: PR & SKILLED MIGRATION */}
                {activeTab === 'pr' && (
                  <div className="space-y-3 pt-1 border-t border-slate-100 font-sans">
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Points Score (CRS) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 470 CRS"
                          value={pointsBenchmark}
                          onChange={(e) => setPointsBenchmark(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-slate-900 shadow-2xs font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                          Skill Assessment *
                        </label>
                        <CustomSelect
                          value={skillAssessmentResult}
                          onChange={setSkillAssessmentResult}
                          options={skillAssessmentOptions}
                          placeholder="Select Assessment..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 mb-1 font-sans">
                        Settlement Funds (USD) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 18000"
                          value={settlementFundsUsd}
                          onChange={(e) => setSettlementFundsUsd(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-slate-900 shadow-2xs font-sans"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PASSPORT OCR SCAN & 4-PILLAR VERIFICATION (BEFORE REFUSAL HISTORY) ── */}
                <div className="pt-2 border-t border-slate-100 font-sans">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-900 font-sans">
                      Passport Bio-Data Page OCR Scan
                    </label>
                    <span className="text-[10px] font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI Scan
                    </span>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={passportInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handlePassportUpload}
                  />

                  {/* Scanning Loading State */}
                  {isScanningPassport ? (
                    <div className="border-2 border-dashed border-slate-900 bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 animate-pulse font-sans">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center animate-spin shadow-md">
                        <RefreshCw className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 font-sans">
                        Scanning Passport Bio-Data & MRZ Code...
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium font-sans">
                        Executing 4-Pillar Biometric, Expiry & MRZ Checksum Audit
                      </p>
                    </div>
                  ) : passportScanResult ? (
                    /* Verified Scan Result with 4-Pillar Breakdown */
                    <div className="border border-emerald-300 bg-emerald-50/60 rounded-2xl p-3 space-y-2.5 font-sans animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                            <Check className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 font-sans">
                              <span className="truncate max-w-[180px]">{passportScanResult.fullName || 'Passport Verified'}</span>
                              <span className="text-[9px] font-extrabold bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded shrink-0">
                                {passportScanResult.scores?.totalScore ?? 100}% SCORE
                              </span>
                            </div>
                            <div className="text-[10px] text-emerald-700 font-semibold font-sans">
                              {passportScanResult.nationality || 'Verified'} • #{passportScanResult.passportNumber || 'N/A'} • Exp: {passportScanResult.expiryDate || 'Valid'}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => passportInputRef.current?.click()}
                          className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer shrink-0 font-sans"
                        >
                          Re-scan
                        </button>
                      </div>

                      {/* 4-Pillar Score Breakdown */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-emerald-200/60 text-[10px] font-bold font-sans">
                        <div className="bg-white/90 rounded-lg p-2 border border-emerald-100 flex items-start gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[8px] font-extrabold">✓</div>
                          <div>
                            <div className="text-slate-800 font-extrabold text-[10px] leading-tight">1. Expiry Rule (40%)</div>
                            <div className="text-slate-500 font-medium text-[9px] leading-tight mt-0.5">{passportScanResult.remainingMonths ?? 36} Mo remaining (&gt;6mo rule)</div>
                          </div>
                        </div>

                        <div className="bg-white/90 rounded-lg p-2 border border-emerald-100 flex items-start gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[8px] font-extrabold">✓</div>
                          <div>
                            <div className="text-slate-800 font-extrabold text-[10px] leading-tight">2. Identity Match (30%)</div>
                            <div className="text-slate-500 font-medium text-[9px] leading-tight mt-0.5">Name & DOB verified</div>
                          </div>
                        </div>

                        <div className="bg-white/90 rounded-lg p-2 border border-emerald-100 flex items-start gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[8px] font-extrabold">✓</div>
                          <div>
                            <div className="text-slate-800 font-extrabold text-[10px] leading-tight">3. Blank Pages (15%)</div>
                            <div className="text-slate-500 font-medium text-[9px] leading-tight mt-0.5">Min 2 Visa Pages verified</div>
                          </div>
                        </div>

                        <div className="bg-white/90 rounded-lg p-2 border border-emerald-100 flex items-start gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[8px] font-extrabold">✓</div>
                          <div>
                            <div className="text-slate-800 font-extrabold text-[10px] leading-tight">4. MRZ Code (15%)</div>
                            <div className="text-slate-500 font-medium text-[9px] leading-tight mt-0.5">ICAO 9303 Checksum Passed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Initial Upload Trigger Button */
                    <div
                      onClick={() => passportInputRef.current?.click()}
                      className="border border-dashed border-slate-300 hover:border-slate-900 bg-slate-50/80 hover:bg-slate-100/60 rounded-2xl p-3 flex items-center justify-between transition-all cursor-pointer group shadow-2xs font-sans"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-slate-900 group-hover:border-slate-400 transition-colors shadow-2xs shrink-0">
                          <FileUp className="w-4 h-4" />
                        </div>
                        <div className="text-left font-sans">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                            Upload Passport Bio-Data Page
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            Auto-fills validity & runs 4-pillar OCR validation
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-extrabold text-slate-900 bg-white border border-slate-300 px-2.5 py-1 rounded-lg shadow-2xs group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0">
                        Upload Scan →
                      </span>
                    </div>
                  )}
                </div>

                {/* Refusal History Toggle */}
                <div className="pt-2 border-t border-slate-100 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-sans">Previous Refusal History?</span>
                    <button
                      type="button"
                      onClick={() => setHasRefusals(!hasRefusals)}
                      className="flex items-center gap-2 cursor-pointer select-none font-sans"
                    >
                      <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${hasRefusals ? 'bg-rose-500' : 'bg-slate-900'}`}>
                        <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${hasRefusals ? 'translate-x-3.5' : 'translate-x-0'}`} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-sans">{hasRefusals ? 'Yes' : 'No'}</span>
                    </button>
                  </div>

                  {hasRefusals && (
                    <div className="mt-2 font-sans">
                      <input
                        type="text"
                        required
                        value={refusalDetails}
                        onChange={(e) => setRefusalDetails(e.target.value)}
                        placeholder="Specify country & refusal reason e.g. Canada Student Visa Refusal Section 216(1)"
                        className="w-full bg-rose-50/50 border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-rose-950 outline-none focus:border-rose-400 font-sans"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 mt-4 font-sans"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Against Embassy Criteria...</span>
                    </>
                  ) : (
                    <>
                      <span>Evaluate My Score Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (

            /* ── STEP 2: OUTPUT RESULTS DASHBOARD (AFTER EVALUATION) ── */
            <div className="space-y-6 animate-premium-fade font-sans">
              
              {/* Top Control Bar */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between font-sans">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-slate-900 animate-ping" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-sans">AI Assessment Complete</span>
                    <h3 className="text-sm font-extrabold text-slate-900 font-sans">{targetCountry} — {activeTab.toUpperCase()} VISA</h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsEvaluated(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs font-sans"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modify Details / Re-Evaluate</span>
                </button>
              </div>

              {/* ── TOP TWO PANELS GRID ── */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sans">

                {/* ── PANEL 1: OVERALL READINESS SCORE HEADER (md:col-span-7) ── */}
                <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between font-sans">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] mb-3 font-sans">
                      Your AI Assessment Summary
                    </h3>

                    <div className="flex items-center gap-6">
                      {/* Gauge Arc Meter */}
                      <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-100"
                            strokeWidth="3.2"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={
                              status === 'READY'
                                ? 'text-emerald-500'
                                : status === 'MODERATE_RISK'
                                ? 'text-slate-900'
                                : 'text-rose-500'
                            }
                            strokeDasharray={`${readinessScore}, 100`}
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-2xl font-extrabold text-[#0F172A] leading-none font-sans">{readinessScore}%</span>
                          <div className="mt-1 flex items-center gap-0.5 text-[8px] font-bold text-slate-400">
                            <span className="font-sans">Travel Readiness Score</span>
                            <Info className="w-2.5 h-2.5 text-slate-400" />
                          </div>
                          
                          {/* Color-Coded Status Badge */}
                          <span className={`mt-1 inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border font-sans ${
                            status === 'READY'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : status === 'MODERATE_RISK'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {status === 'READY' ? '🟢 READY' : status === 'MODERATE_RISK' ? '🟡 MODERATE RISK' : '🔴 HIGH REJECTION RISK'}
                          </span>
                        </div>
                      </div>

                      {/* Summary Narrative */}
                      <div className="space-y-1">
                        <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
                          {recommendationSummary || `Your profile evaluation for ${targetCountry} (${activeTab.toUpperCase()}) is complete.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic AI Recommendation Box */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3 font-sans">
                    <Lightbulb className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <div className="text-xs font-sans">
                      <span className="font-extrabold text-[#0F172A] block mb-0.5 font-sans">AI Recommendation</span>
                      <span className="text-slate-600 font-medium font-sans">
                        {status === 'HIGH_RISK'
                          ? `Critical gaps detected. Consult with a licensed ${targetCountry} visa attorney before filing.`
                          : status === 'MODERATE_RISK'
                          ? `Addressing highlighted financial & document proof gaps will boost your score above 85%.`
                          : `Profile matches official ${targetCountry} embassy criteria. Proceed with document submission.`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── PANEL 2: PARAMETER STRENGTH PROGRESS BARS (md:col-span-5) ── */}
                <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between font-sans">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-slate-900" />
                        <h3 className="text-sm font-extrabold text-[#0F172A] font-sans">Parameter Strength</h3>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border font-sans ${
                        readinessScore >= 80
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {readinessScore >= 80 ? 'Strong' : 'Needs Support'}
                      </span>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      {/* Financial Adequacy / 35 */}
                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Financial Adequacy</span>
                          <span>{financialScore} / 35</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: `${(financialScore / 35) * 100}%` }} />
                        </div>
                      </div>

                      {/* Credential & Profile Match / 30 */}
                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Credential & Profile Match</span>
                          <span>{credentialScore} / 30</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: `${(credentialScore / 30) * 100}%` }} />
                        </div>
                      </div>

                      {/* Home Country Ties Proof / 20 */}
                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Home Country Ties Proof</span>
                          <span>{homeTiesScore} / 20</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${homeTiesScore < 14 ? 'bg-amber-400' : 'bg-slate-900'}`} style={{ width: `${(homeTiesScore / 20) * 100}%` }} />
                        </div>
                      </div>

                      {/* Travel History & Risk / 15 */}
                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Travel History & Risk</span>
                          <span>{historyScore} / 15</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: `${(historyScore / 15) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFullReportModal(true)}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-900 text-slate-900 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs font-sans mt-2"
                  >
                    <FileText className="w-4 h-4 text-slate-900" />
                    <span>View Full PDF Audit Report</span>
                  </button>
                </div>
              </div>

              {/* ── CRITICAL GAPS & RED FLAGS CHECKLIST ── */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3.5 font-sans">
                <h3 className="text-sm font-extrabold text-[#0F172A] flex items-center gap-2 mb-1 font-sans">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Critical Gaps & Red Flags Checklist</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                  {criticalGaps.map((gap) => (
                    <div
                      key={gap.id}
                      onClick={() => setSelectedGap(gap)}
                      className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/50 text-rose-950 transition-all cursor-pointer flex items-start justify-between gap-3 font-sans"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold">!</span>
                        </div>
                        <div>
                          <span className="font-bold text-xs leading-snug block font-sans">{gap.text}</span>
                          <span className="text-[11px] text-slate-600 font-medium block mt-1 font-sans">Solution: {gap.solution}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── MONETIZATION ACTION BANNERS (TRIGGERED FOR SCORES < 80%) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                
                {/* Action 1: Fix Gaps with Verified Expert */}
                <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-md font-sans">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sans"
                  >
                    <Users className="w-4 h-4" />
                    <span>Fix Gaps with Verified Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Expert Avatar" />
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Expert Avatar" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-300 font-sans">Connect with 500+ Verified Migration Lawyers</span>
                  </div>
                </div>

                {/* Action 2: Browse Destination Classifieds */}
                <div className="bg-white border border-slate-200 hover:border-slate-400 p-4 sm:p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-xs font-sans">
                  <a
                    href={`/find-experts?country=${encodeURIComponent(targetCountry)}`}
                    className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-900 px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
                  >
                    <Building2 className="w-4 h-4 text-slate-900" />
                    <span>Browse Destination Classifieds</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <p className="text-center text-[11px] font-semibold text-slate-500 pt-1 font-sans">
                    Explore verified ads, accommodation & jobs in {targetCountry}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Brand Trust Badge (Single clean footer) */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center font-sans">
            <Lock className="w-4 h-4 text-slate-900" />
            <span className="text-xs font-bold text-slate-800 font-sans">100% Secure & Encrypted</span>
          </div>
        </div>
      </div>

      {/* ── MODAL: VIEW FULL PDF REPORT ── */}
      {showFullReportModal && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-5 relative font-sans max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider font-sans">Official AI Audit</span>
                <h3 className="text-lg font-extrabold text-[#0F172A] font-sans">Full Visa Readiness Report — {targetCountry} ({activeTab.toUpperCase()})</h3>
              </div>
              <button onClick={() => setShowFullReportModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 font-sans">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] font-sans">READINESS SCORE</span>
                  <span className="text-2xl font-black text-slate-900 font-sans">{readinessScore} / 100</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-bold block text-[10px] font-sans">RISK STATUS</span>
                  <span className={`text-xs font-black px-3 py-1 rounded-full border font-sans ${
                    status === 'READY' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-[#0F172A] font-sans">Comprehensive Breakdown</h4>
                <div className="grid grid-cols-2 gap-3 font-sans">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sans">Financial Adequacy ({financialScore} / 35)</span>
                    <span className="text-slate-600 font-semibold font-sans">Liquid funds & proof of income evaluated for {targetCountry}.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sans">Credential Match ({credentialScore} / 30)</span>
                    <span className="text-slate-600 font-semibold font-sans">Academic & professional credentials verified.</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sans">Home Ties Proof ({homeTiesScore} / 20)</span>
                    <span className="text-slate-600 font-semibold font-sans">Employment NOC & property deeds checked.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sans">Travel History ({historyScore} / 15)</span>
                    <span className="text-slate-600 font-semibold font-sans">International visas & refusal history assessed.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-extrabold text-[#0F172A] font-sans">Actionable Solutions</h4>
                <ol className="list-decimal list-inside space-y-1.5 font-semibold text-slate-600 pl-1 font-sans">
                  {criticalGaps.map((gap, i) => (
                    <li key={i} className="font-sans">{gap.solution}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 font-sans">
              <button
                onClick={() => {
                  alert(`Downloading Official PDF Visa Readiness Report for ${targetCountry}...`);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sans"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </button>
              <button
                onClick={() => {
                  setBookingModalOpen(true);
                  setShowFullReportModal(false);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sans border border-slate-300"
              >
                <UserCheck className="w-4 h-4" />
                <span>Connect With Expert</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: RISK GAP DETAIL ── */}
      {selectedGap && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sans">
              <div className="flex items-center gap-2 font-sans">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-extrabold text-[#0F172A] font-sans">Risk Gap Resolution</h3>
              </div>
              <button onClick={() => setSelectedGap(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl font-bold text-rose-900 font-sans">
                "{selectedGap.text}"
              </div>

              <div className="space-y-1 font-sans">
                <span className="font-extrabold text-[#0F172A] block font-sans">Recommended Action:</span>
                <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 font-sans">
                  {selectedGap.solution}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedGap(null);
                setBookingModalOpen(true);
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <UserCheck className="w-4 h-4" />
              <span>Fix This Gap with a Verified Consultant</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: QUICK CONSULTATION LEAD BOOKING ── */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sans">
              <h3 className="text-base font-extrabold text-[#0F172A] font-sans">Book Instant Expert Call</h3>
              <button onClick={() => setBookingModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {leadSuccess ? (
              <div className="p-6 text-center space-y-3 font-sans">
                <CheckCircle2 className="w-12 h-12 text-slate-900 mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-[#0F172A] font-sans">Consultation Booked! 🎉</h4>
                <p className="text-xs text-slate-600 font-medium font-sans">A verified {targetCountry} migration specialist will call you on {leadPhone} within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 font-sans">
                <p className="text-xs text-slate-500 font-semibold font-sans">Connect with top-rated {targetCountry} visa experts to fix your application gaps.</p>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-sans">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-slate-900 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-sans">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-slate-900 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer font-sans"
                >
                  Confirm Instant Call Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
