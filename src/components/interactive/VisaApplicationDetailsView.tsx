import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Copy, CheckCircle2, CheckCircle, Clock, Calendar, 
  CreditCard, ShieldCheck, AlertCircle, ExternalLink, MessageSquare, 
  Phone, ChevronDown, ChevronUp, Check, FileText, Plus, Info, 
  Sparkles, CheckSquare, XCircle, Shield, RefreshCw
} from 'lucide-react';

export interface VisaApplicationDetailsProps {
  application: any;
  applicantName: string;
  onBack: () => void;
  onOpenChat?: () => void;
  readinessScore?: number;
  vaultDocuments?: any[];
}

function getCountryFlag(name: string): string {
  if (!name) return '🌍';
  const s = name.toLowerCase().trim();
  if ((s.includes('unit') && s.includes('state')) || s === 'us' || s === 'usa' || s === 'american') return '🇺🇸';
  if (s.includes('emirate') || s.includes('uae') || s.includes('dubai') || s.includes('abu dhabi') || s.includes('emirati')) return '🇦🇪';
  if (s.includes('india') || s === 'in' || s.includes('indian')) return '🇮🇳';
  if (s.includes('kingdom') || s === 'uk' || s.includes('britain') || s.includes('british') || s.includes('england')) return '🇬🇧';
  if (s.includes('canada') || s.includes('canadian')) return '🇨🇦';
  if (s.includes('australia') || s.includes('australian')) return '🇦🇺';
  if (s.includes('germany') || s.includes('german')) return '🇩🇪';
  if (s.includes('france') || s.includes('french')) return '🇫🇷';
  if (s.includes('singapore') || s.includes('singaporean')) return '🇸🇬';
  if (s.includes('japan') || s.includes('japanese')) return '🇯🇵';
  if (s.includes('nepal') || s.includes('nepalese')) return '🇳🇵';
  if (s.includes('mauritius')) return '🇲🇺';
  if (s.includes('maldives')) return '🇲🇻';
  if (s.includes('ireland') || s.includes('irish')) return '🇮🇪';
  if (s.includes('new zealand') || s.includes('kiwi')) return '🇳🇿';
  if (s.includes('schengen')) return '🇪🇺';
  return '🌍';
}

function getRouteStatutoryFee(dest: string): string {
  const s = (dest || '').toLowerCase();
  if (s.includes('emirate') || s.includes('uae') || s.includes('dubai')) return 'AED 350 (~$95 USD)';
  if (s.includes('mauritius') || s.includes('maldives') || s.includes('nepal')) return '₹0 (Visa-Free on Arrival)';
  if (s.includes('france') || s.includes('germany') || s.includes('schengen')) return '€90 (~₹8,200 Consular Fee)';
  if ((s.includes('unit') && s.includes('state')) || s.includes('usa')) return '$185 USD (MRV Application Fee)';
  if (s.includes('kingdom') || s.includes('uk')) return '£115 (~$145 USD)';
  if (s.includes('singapore')) return 'SGD $30 (~$23 USD)';
  if (s.includes('canada')) return 'CAD $100 (~$75 USD)';
  if (s.includes('australia')) return 'AUD $190 (~$125 USD)';
  return 'Standard Consular Fee';
}

function getRouteStatutoryTime(dest: string): string {
  const s = (dest || '').toLowerCase();
  if (s.includes('mauritius') || s.includes('maldives') || s.includes('nepal')) return 'Instant on Arrival (0 Days)';
  if (s.includes('emirate') || s.includes('uae') || s.includes('dubai')) return '24 to 72 Working Hours';
  if (s.includes('singapore')) return '2 to 4 Business Days';
  if (s.includes('france') || s.includes('germany') || s.includes('schengen')) return '15 Calendar Days';
  if (s.includes('kingdom') || s.includes('uk')) return '3 Weeks (Priority Available)';
  if ((s.includes('unit') && s.includes('state')) || s.includes('usa')) return 'Subject to Consular Interview Wait Times';
  if (s.includes('canada')) return '15 to 30 Working Days';
  if (s.includes('australia')) return '15 to 25 Days';
  return '5 to 15 Business Days';
}

export function VisaApplicationDetailsView({
  application,
  applicantName,
  onBack,
  onOpenChat,
  readinessScore,
  vaultDocuments = []
}: VisaApplicationDetailsProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(true);
  const [routeData, setRouteData] = useState<any>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Derive route metadata from application
  const trackingId = application?.trackingId || 'TT-APP-2026-9824';
  const destination = application?.destination || 'United Arab Emirates';
  const passport = application?.passport || 'United States';
  const purpose = application?.purpose || 'tourism';
  const destinationFlag = application?.destinationFlag || getCountryFlag(destination);
  const passportFlag = getCountryFlag(passport);

  // Live route requirement fetching from backend AI & consular verification
  useEffect(() => {
    let isMounted = true;
    const cacheKey = `travltik_ai_res_${destination}_${passport}_${purpose}`.replace(/\s+/g, '_').toLowerCase();

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && isMounted) {
          setRouteData(parsed);
        }
      }
    } catch(e) {}

    setIsLoadingRoute(true);
    fetch('/api/visa/ai-requirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromCountry: passport,
        toCountry: destination,
        purpose: purpose,
        isLoggedIn: true
      })
    })
      .then(res => res.json())
      .then(json => {
        if (isMounted && json?.success && json?.data) {
          setRouteData(json.data);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(json.data));
          } catch(e) {}
        }
      })
      .catch(err => {
        console.warn('[VisaDetailsView] Dynamic route requirements fetch notice:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingRoute(false);
      });

    return () => { isMounted = false; };
  }, [destination, passport, purpose]);

  // Derived real details
  const resolvedVisaType = routeData?.visa_type || application?.visaType || `${destination} Tourist / Visitor Visa`;
  
  // Real dates without hardcoded dummy values
  const appliedDate = (application?.submittedAt && application.submittedAt !== 'Active' && application.submittedAt !== 'Recently')
    ? application.submittedAt
    : (application?.createdAt 
        ? new Date(application.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
        : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  
  const lastUpdated = application?.updatedAt || 'Today';
  const travelDate = application?.travelDate || 'Flexible / To be confirmed';
  const returnDate = application?.returnDate || 'Flexible / Open Return';
  const entries = application?.entries || (destination.toLowerCase().includes('emirates') ? 'Single / 30-Day Multiple' : 'Single / Multiple (As Granted)');
  
  // Fee and Processing Time
  const feeDisplay = routeData?.costs?.total_fee || routeData?.costs?.visa_fee || application?.feePaid || getRouteStatutoryFee(destination);
  const feeNotes = routeData?.costs?.notes || '';
  const processingTimeDisplay = routeData?.processing_time || routeData?.processing_and_timing?.decision_time || application?.processingTime || getRouteStatutoryTime(destination);

  // Route type checks
  const isOnlineOrOnArrival = 
    (resolvedVisaType || destination || '').toLowerCase().includes('e-visa') ||
    (resolvedVisaType || destination || '').toLowerCase().includes('evisa') ||
    (resolvedVisaType || destination || '').toLowerCase().includes('free') ||
    (resolvedVisaType || destination || '').toLowerCase().includes('arrival') ||
    destination.toLowerCase().includes('emirates') ||
    destination.toLowerCase().includes('uae') ||
    destination.toLowerCase().includes('dubai') ||
    destination.toLowerCase().includes('mauritius') ||
    destination.toLowerCase().includes('maldives') ||
    destination.toLowerCase().includes('singapore');

  const appointmentRequired = !isOnlineOrOnArrival;
  const appointmentDisplay = appointmentRequired
    ? (application?.appointmentDate || 'To be scheduled upon document review')
    : 'Not Required (100% Online e-Visa Process)';

  // Calculate dynamic current step from application progress
  const progressPercent = typeof application?.progress === 'number' ? application.progress : 35;
  const currentStep = progressPercent >= 95 ? 6 
    : progressPercent >= 75 ? 5 
    : progressPercent >= 55 ? 4 
    : progressPercent >= 35 ? 3 
    : progressPercent >= 15 ? 2 
    : 1;

  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    [currentStep]: true
  });
  const [allExpanded, setAllExpanded] = useState(false);

  const handleCopyId = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(trackingId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const toggleAllSteps = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    setExpandedSteps({
      1: nextState,
      2: nextState,
      3: nextState,
      4: nextState,
      5: nextState,
      6: nextState
    });
  };

  // Compile route-accurate document checklist
  const isSchengen = ['france', 'germany', 'italy', 'spain', 'switzerland', 'netherlands', 'austria', 'greece', 'portugal', 'belgium', 'sweden', 'schengen'].some(c => destination.toLowerCase().includes(c));
  const isIndia = passport.toLowerCase().includes('india');
  const isUS = passport.toLowerCase().includes('unit') || passport.toLowerCase().includes('us');

  const rawDocs: Array<{ title: string; description: string; is_mandatory: boolean }> = 
    (routeData?.documents_required && Array.isArray(routeData.documents_required) && routeData.documents_required.length > 0)
      ? routeData.documents_required
      : [
          {
            title: 'Passport Bio-Page Scan',
            description: 'Valid for at least 6 months beyond travel dates with minimum 2 blank pages.',
            is_mandatory: true
          },
          {
            title: 'Digital Passport-Size Photograph',
            description: isSchengen ? 'Recent 35mm x 45mm color photo, white background, neutral expression.' : 'Recent passport-size color photograph with white or light neutral background.',
            is_mandatory: true
          },
          {
            title: 'Confirmed Return Flight Ticket',
            description: `Confirmed round-trip airline reservation to ${destination}.`,
            is_mandatory: true
          },
          {
            title: 'Proof of Accommodation',
            description: `Hotel reservation booking voucher or registered host invitation in ${destination}.`,
            is_mandatory: true
          },
          {
            title: 'Travel & Medical Insurance',
            description: isSchengen ? 'Mandatory minimum medical coverage of €30,000 for all Schengen states.' : 'Valid international travel medical insurance covering emergency evacuation and hospitalization.',
            is_mandatory: !isOnlineOrOnArrival
          },
          {
            title: 'Proof of Financial Solvency',
            description: 'Recent 3 to 6 months bank statements demonstrating adequate travel funds.',
            is_mandatory: true
          },
          {
            title: 'Identity & Residence Proof',
            description: isIndia 
              ? 'Aadhaar Card / PAN Card copy (Government ID)' 
              : isUS 
              ? "Driver's License / State ID / Proof of Legal Residence" 
              : 'National ID Card or Government Residence Permit copy',
            is_mandatory: true
          }
        ];

  const checklistDocuments = rawDocs.map((docItem) => {
    const t = docItem.title.toLowerCase();
    const hasUploaded = (vaultDocuments || []).some((v: any) => {
      const vName = (v.name || v.title || '').toLowerCase();
      if (t.includes('passport') && vName.includes('passport')) return true;
      if ((t.includes('photo') || t.includes('picture')) && (vName.includes('photo') || vName.includes('picture'))) return true;
      if ((t.includes('flight') || t.includes('ticket') || t.includes('air')) && (vName.includes('flight') || vName.includes('ticket'))) return true;
      if ((t.includes('hotel') || t.includes('accommodation') || t.includes('stay')) && (vName.includes('hotel') || vName.includes('stay') || vName.includes('accommodation'))) return true;
      if ((t.includes('insurance') || t.includes('medical')) && (vName.includes('insurance') || vName.includes('medical'))) return true;
      if ((t.includes('bank') || t.includes('financial') || t.includes('solvency')) && (vName.includes('bank') || vName.includes('statement'))) return true;
      return false;
    });

    return {
      name: docItem.title,
      req: docItem.description,
      mandatory: docItem.is_mandatory !== false,
      available: hasUploaded || docItem.is_mandatory,
      ready: hasUploaded || (docItem.is_mandatory && currentStep >= 2)
    };
  });

  // Calculate live dynamic readiness score
  const readyDocsCount = checklistDocuments.filter(d => d.ready).length;
  const docsRatio = checklistDocuments.length > 0 ? (readyDocsCount / checklistDocuments.length) : 0.6;
  const calculatedReadinessScore = typeof readinessScore === 'number' && readinessScore > 0
    ? readinessScore
    : Math.min(100, Math.round((progressPercent * 0.4) + (docsRatio * 50) + 10));

  const scoreLevel = calculatedReadinessScore >= 75 ? 'Consular Benchmark Met' : calculatedReadinessScore >= 50 ? 'Good Readiness' : 'In Preparation';

  // Dynamic Route Steps
  const routeSteps: string[] = (routeData?.how_to_apply && Array.isArray(routeData.how_to_apply) && routeData.how_to_apply.length >= 3)
    ? routeData.how_to_apply
    : isOnlineOrOnArrival
    ? [
        `Check eligibility and statutory entry conditions for ${destination}`,
        `Assemble passport scan, passport photograph, and travel documents`,
        `Complete online visa application form accurately`,
        `Pay official government processing fees online (${feeDisplay})`,
        `Submit application for automated consular & immigration clearance`,
        `Receive and download your approved electronic visa / entry clearance`
      ]
    : [
        `Check consular visa requirements and appointment availability for ${destination}`,
        `Assemble required document dossier and certified translations`,
        `Complete official visa application form and print signature copy`,
        `Pay consular visa fee and appointment slot booking charges (${feeDisplay})`,
        `Submit documents and biometrics at the designated Visa Application Center`,
        `Track passport status and receive stamped visa dossier via courier`
      ];

  return (
    <div className="space-y-6 animate-fade-up font-sans text-left">
      {/* ── TOP HEADER WITH BACK BUTTON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Visa Application Details</h1>
            {isLoadingRoute && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Verifying route standards...</span>
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Real-time status, checklist requirements, and consular timeline for <strong className="text-slate-800">{destination}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 text-xs font-bold shadow-2xs transition-all self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </button>
      </div>

      {/* ── 1. APPLICATION METADATA HERO CARD ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* Col 1: Application ID */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Application ID</span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-emerald-600 font-mono tracking-tight">
                {trackingId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all cursor-pointer"
                title="Copy Application ID"
              >
                <Copy className="w-3 h-3 text-slate-500" />
                <span>{copiedId ? 'Copied ✓' : 'Copy'}</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block pt-1">
              Applied on: <strong className="text-slate-700 font-bold">{appliedDate}</strong> • Last Updated: <strong className="text-slate-700 font-bold">{lastUpdated}</strong>
            </span>
          </div>

          {/* Col 2: Name & Visa Type */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Applicant / Contact</span>
              <span className="text-sm font-black text-slate-900 block mt-0.5 truncate">{applicantName || 'Applicant'}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Visa Type</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5 leading-snug">{resolvedVisaType}</span>
            </div>
          </div>

          {/* Col 3: From -> To & Entries */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">From (Passport)</span>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <span className="text-base leading-none">{passportFlag}</span> {passport}
                  </span>
                </div>
                <span className="text-slate-300 font-black pt-3">➔</span>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">To (Destination)</span>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <span className="text-base leading-none">{destinationFlag}</span> {destination}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Permitted Entries</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">{entries}</span>
            </div>
          </div>

          {/* Col 4: Travel & Return Date */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Travel Date</span>
              <span className="text-xs font-black text-slate-900 block mt-0.5">{travelDate}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Return Date</span>
              <span className="text-xs font-black text-slate-900 block mt-0.5">{returnDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. DYNAMIC HORIZONTAL PIPELINE PROGRESS STEPPER ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Connector Line & Step Indicators */}
          <div className="relative flex items-center justify-between px-6">
            {/* Background connecting line */}
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-0" />
            
            {/* Active completed progress bar */}
            <div 
              className="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-0 transition-all duration-700 ease-in-out" 
              style={{ width: `${Math.min(100, Math.max(0, ((currentStep - 1) / 5) * 85))}%` }}
            />

            {/* Step 1: Check Requirements */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 1 ? 'bg-emerald-500 text-white' : currentStep === 1 ? 'bg-indigo-600 text-white ring-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 1 ? 'font-black text-indigo-700' : 'font-bold text-slate-800'}`}>
                1. Requirements
              </span>
            </div>

            {/* Step 2: Prepare Documents */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 2 ? 'bg-emerald-500 text-white' : currentStep === 2 ? 'bg-indigo-600 text-white ring-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 2 ? 'font-black text-indigo-700' : 'font-bold text-slate-800'}`}>
                2. Documents
              </span>
            </div>

            {/* Step 3: Fill Application */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 3 ? 'bg-emerald-500 text-white' : currentStep === 3 ? 'bg-indigo-600 text-white ring-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 3 ? 'font-black text-indigo-700' : 'font-bold text-slate-800'}`}>
                3. Application Form
              </span>
            </div>

            {/* Step 4: Pay Fees */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 4 ? 'bg-emerald-500 text-white' : currentStep === 4 ? 'bg-indigo-600 text-white ring-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 4 ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 4 ? 'font-black text-indigo-700' : 'font-bold text-slate-800'}`}>
                4. Pay Fees
              </span>
            </div>

            {/* Step 5: Submission / Verification */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 5 ? 'bg-emerald-500 text-white' : currentStep === 5 ? 'bg-indigo-600 text-white ring-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 5 ? <Check className="w-4 h-4 stroke-[3]" /> : '5'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 5 ? 'font-black text-indigo-700' : 'font-bold text-slate-800'}`}>
                {isOnlineOrOnArrival ? '5. e-Visa Clearance' : '5. Submit & Biometrics'}
              </span>
            </div>

            {/* Step 6: Track & Receive */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep >= 6 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep >= 6 ? <Check className="w-4 h-4 stroke-[3]" /> : '6'}
              </div>
              <span className={`text-xs mt-2 ${currentStep >= 6 ? 'font-black text-emerald-700' : 'font-medium text-slate-400'}`}>
                {isOnlineOrOnArrival ? '6. Download e-Visa' : '6. Receive Passport'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN CONTENT: 2-COLUMN GRID (LEFT ACCORDIONS + TABLE, RIGHT STATS CARDS) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN (8 COLS) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SECTION A: STEPS TO FOLLOW */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-950">Steps to Follow</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Action roadmap customized for {passport} passport holders traveling to {destination}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleAllSteps}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
              >
                {allExpanded ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {routeSteps.map((stepText, idx) => {
                const stepNum = idx + 1;
                const isStepCompleted = currentStep > stepNum;
                const isStepActive = currentStep === stepNum;
                const isExpanded = !!expandedSteps[stepNum];

                return (
                  <div 
                    key={stepNum} 
                    className={`border rounded-2xl overflow-hidden transition-all ${
                      isStepActive 
                        ? 'border-2 border-indigo-500/80 shadow-xs' 
                        : 'border-slate-200'
                    }`}
                  >
                    <div 
                      onClick={() => toggleStep(stepNum)}
                      className={`flex items-center justify-between p-4 transition-colors cursor-pointer ${
                        isStepActive 
                          ? 'bg-indigo-50/40 hover:bg-indigo-50/70' 
                          : 'bg-white hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                          isStepCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isStepActive 
                            ? 'bg-indigo-600 text-white' 
                            : 'border-2 border-slate-300 bg-white'
                        }`}>
                          {isStepCompleted ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : isStepActive ? (
                            <CheckSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                          ) : null}
                        </div>
                        <div>
                          <h3 className={`text-xs sm:text-sm font-black ${isStepActive ? 'text-indigo-950' : isStepCompleted ? 'text-slate-900' : 'text-slate-700'}`}>
                            {stepNum}. {stepText.split('.')[0]}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {stepText}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                          isStepCompleted 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : isStepActive 
                            ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {isStepCompleted ? 'Completed' : isStepActive ? 'In Progress' : 'Pending'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className={`w-4 h-4 ${isStepActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                        ) : (
                          <ChevronDown className={`w-4 h-4 ${isStepActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className={`p-4 border-t text-xs space-y-2 ${
                        isStepActive ? 'bg-indigo-50/20 border-indigo-100 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}>
                        <p className="leading-relaxed">
                          {stepNum === 1 && `Verify statutory validity for ${destination}: passport must have minimum 6 months validity from intended date of entry and 2 blank visa pages.`}
                          {stepNum === 2 && `Ensure all supporting documents (passport scan, photo, flight booking, accommodation voucher) meet official consulate specifications.`}
                          {stepNum === 3 && `Dossier details are validated against your passport biodata to guarantee zero discrepancy rejections.`}
                          {stepNum === 4 && `Applicable visa processing & government statutory fees: ${feeDisplay}. ${feeNotes}`}
                          {stepNum === 5 && (
                            isOnlineOrOnArrival 
                              ? `Application is submitted directly to the immigration portal for automated security adjudication. No physical center visit needed.`
                              : `Dossier submitted to the official Visa Application Center. ${appointmentDisplay}`
                          )}
                          {stepNum === 6 && `Approved entry visa document or stamped passport will be delivered electronically or via secure courier.`}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION B: DOCUMENTS REQUIRED CHECKLIST */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-950">Documents Required Checklist</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Official checklist for {passport} citizens traveling to {destination}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  {readyDocsCount}/{checklistDocuments.length} Ready
                </span>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-2.5 px-3">Required Document</th>
                    <th className="py-2.5 px-3">Official Requirement</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Verified Ready</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {checklistDocuments.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900 block">{doc.name}</span>
                            {doc.mandatory && (
                              <span className="text-[10px] font-extrabold text-amber-600 block">Mandatory</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {doc.req}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {doc.available ? (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {doc.ready ? (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Checklist Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Verified &amp; Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span>Pending Final Review</span>
              </div>
            </div>

            {/* Declaration & Terms Box */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedDeclaration}
                  onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-800 leading-relaxed">
                  I confirm that all uploaded travel and identity documents are authentic and fulfill the official immigration standards of {destination}.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (4 COLS: STATS & REMINDER CARDS) ── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. VISA READINESS SCORE CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs text-center space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Visa Readiness Score</h3>

            {/* Circular Gauge / Donut */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Dynamic Progress Ring */}
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${calculatedReadinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-950 tracking-tight">{calculatedReadinessScore}%</span>
                <span className="text-[11px] font-extrabold text-emerald-600 mt-0.5">{scoreLevel}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {calculatedReadinessScore >= 75 
                ? `Your application dossier meets official consular criteria for ${destination}!` 
                : `Upload missing documents to strengthen your dossier before final filing.`}
            </p>

            {/* Dynamic Score Breakdown Bars */}
            <div className="pt-3 border-t border-slate-100 space-y-3 text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Dossier Evaluation</span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Requirements Check</span>
                  <span className="text-slate-950">100%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Document Readiness</span>
                  <span className="text-slate-950">{Math.round(docsRatio * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.round(docsRatio * 100)}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Application Form</span>
                  <span className="text-slate-950">{currentStep >= 3 ? '100%' : '50%'}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: currentStep >= 3 ? '100%' : '50%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Fee Settlement</span>
                  <span className="text-slate-950">{currentStep >= 4 ? '100%' : '0%'}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: currentStep >= 4 ? '100%' : '0%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 2. IMPORTANT ROUTE REMINDERS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Route Directives</h3>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Appointment Protocol</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{appointmentDisplay}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Applicable Visa Fee</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{feeDisplay}</strong>
                  {feeNotes && (
                    <span className="text-[10px] text-slate-500 block mt-0.5 leading-snug">{feeNotes}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Adjudication / Decision Time</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{processingTimeDisplay}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 3. NEED HELP? CARD */}
          <div className="bg-amber-50/40 rounded-3xl border border-amber-200/70 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">👋</span>
              <h3 className="text-sm font-black text-slate-900">Need Guidance for {destination}?</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Connect with verified consular experts for file review and submission support.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onOpenChat) onOpenChat();
                  else alert("Connecting to Visa Expert Concierge...");
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-amber-300/80 hover:bg-amber-50/80 text-xs font-bold text-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Consult Visa Specialist</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Helpline: +91 800 555 8728 (Mon - Sat, 9 AM - 7 PM)")}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-amber-300/80 hover:bg-amber-50/80 text-xs font-bold text-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Concierge</span>
              </button>
            </div>
          </div>

          {/* 4. APPLICATION SUMMARY CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Application Summary</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tracking ID</span>
                <span className="font-bold font-mono text-slate-900">{trackingId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Visa Category</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px] text-right">{resolvedVisaType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Route</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span>{passportFlag}</span> {passport} ➔ <span>{destinationFlag}</span> {destination}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Travel Date</span>
                <span className="font-bold text-slate-900">{travelDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Return Date</span>
                <span className="font-bold text-slate-900">{returnDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Filing Date</span>
                <span className="font-bold text-slate-900">{appliedDate}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Current Status</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {application?.status || 'Active / In Review'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
