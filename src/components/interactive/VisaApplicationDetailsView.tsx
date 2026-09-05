import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, Copy, CheckCircle2, CheckCircle, Clock, Calendar, 
  CreditCard, ShieldCheck, AlertCircle, ExternalLink, MessageSquare, 
  Phone, ChevronDown, ChevronUp, Check, FileText, Plus, Info, 
  Sparkles, CheckSquare, XCircle, Shield, RefreshCw, Upload,
  X, Camera, Plane, Building2, Landmark, Briefcase, CircleDollarSign
} from 'lucide-react';

export interface VisaApplicationDetailsProps {
  application: any;
  applicantName: string;
  onBack: () => void;
  onOpenChat?: () => void;
  onOpenVault?: () => void;
  readinessScore?: number;
  vaultDocuments?: any[];
}

import { ALL_COUNTRIES } from '../../data/countries';

function getCountryCode(country: string): string {
  if (!country) return 'un';
  const c = country.toLowerCase().trim();
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

  const match = ALL_COUNTRIES.find(item => item.name.toLowerCase() === c || item.code.toLowerCase() === c);
  if (match) return match.code.toLowerCase();
  return 'un';
}

function CountryFlag({ country, className = "w-5 h-3.5 object-cover rounded-xs border border-slate-200/80 shadow-2xs shrink-0" }: { country: string; className?: string }) {
  const code = getCountryCode(country);
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={country || 'Country Flag'}
      className={className}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png';
      }}
    />
  );
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

function getCleanShortTitle(title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && (t.includes('bio') || t.includes('scan') || t.includes('page') || t.includes('last'))) return 'Passport';
  if (t.includes('passport') && !t.includes('photo')) return 'Passport';
  if (t.includes('photo') || t.includes('picture')) return 'Photograph';
  if (t.includes('flight') || t.includes('air') || t.includes('ticket') || t.includes('itinerary')) return 'Travel Itinerary';
  if (t.includes('hotel') || t.includes('accommodation') || t.includes('host') || t.includes('stay')) return 'Hotel Booking';
  if (t.includes('insurance') || t.includes('medical')) return 'Travel Insurance';
  if (t.includes('bank') || t.includes('solvency') || t.includes('financial') || t.includes('statement')) return 'Bank Statements';
  if (t.includes('cover') || t.includes('letter')) return 'Cover Letter';
  if (t.includes('employment') || t.includes('salary') || t.includes('job') || t.includes('noc')) return 'Employment Proof';
  if (t.includes('identity') || t.includes('residence') || t.includes('aadhaar') || t.includes('pan') || t.includes('id proof')) return 'ID Proof';
  if (t.includes('form') || t.includes('application')) return 'Visa Application Form';
  return title;
}

function getCleanShortRequirement(req: string, title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) {
    return 'Valid for at least 6 months beyond return date';
  }
  if (t.includes('photo') || t.includes('picture')) {
    return 'Recent photo, 35mm x 45mm, white background';
  }
  if (t.includes('flight') || t.includes('air') || t.includes('ticket') || t.includes('itinerary')) {
    return 'Confirmed flight tickets (round trip)';
  }
  if (t.includes('hotel') || t.includes('accommodation') || t.includes('host') || t.includes('stay')) {
    return 'Confirmed hotel reservations';
  }
  if (t.includes('insurance') || t.includes('medical')) {
    return 'Minimum coverage of €30,000';
  }
  if (t.includes('bank') || t.includes('solvency') || t.includes('financial') || t.includes('statement')) {
    return 'Last 3 months bank statements';
  }
  if (t.includes('cover') || t.includes('letter')) {
    return 'Purpose of visit and travel details';
  }
  if (t.includes('employment') || t.includes('salary') || t.includes('job') || t.includes('noc')) {
    return 'Salary slips / Leave approval / NOC';
  }
  if (t.includes('identity') || t.includes('residence') || t.includes('aadhaar') || t.includes('pan') || t.includes('id proof')) {
    return 'Aadhaar Card / PAN Card copy';
  }
  if (t.includes('form') || t.includes('application')) {
    return 'Complete and signed application form';
  }
  if (req && req.length > 55) {
    return req.slice(0, 52).trim() + '...';
  }
  return req || 'Official consular document';
}

function getDocumentChecklistIcon(title: string) {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) return <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('form') || t.includes('application')) return <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('photo') || t.includes('picture')) return <Camera className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('flight') || t.includes('air') || t.includes('ticket') || t.includes('itinerary')) return <Plane className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('hotel') || t.includes('accommodation') || t.includes('host') || t.includes('stay')) return <Building2 className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('insurance') || t.includes('medical')) return <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('bank') || t.includes('solvency') || t.includes('financial') || t.includes('statement')) return <Landmark className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('employment') || t.includes('salary') || t.includes('job') || t.includes('noc')) return <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />;
  if (t.includes('identity') || t.includes('residence') || t.includes('aadhaar') || t.includes('pan') || t.includes('id proof')) return <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />;
  return <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
}

export function VisaApplicationDetailsView({
  application,
  applicantName,
  onBack,
  onOpenChat,
  onOpenVault,
  readinessScore,
  vaultDocuments = []
}: VisaApplicationDetailsProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(true);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
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
  const travelDate = application?.travelDate || '15 Jun 2024';
  const returnDate = application?.returnDate || '30 Jun 2024';
  const returnDateWithDuration = useMemo(() => {
    if (!returnDate || returnDate.toLowerCase().includes('flexible') || returnDate.toLowerCase().includes('open')) {
      return returnDate || 'Flexible / Open Return';
    }
    if (returnDate.includes('(') && returnDate.includes('Days')) {
      return returnDate;
    }
    try {
      const d1 = new Date(travelDate);
      const d2 = new Date(returnDate);
      if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          return `${returnDate} (${diffDays} Days)`;
        }
      }
    } catch (_) {}
    return returnDate;
  }, [travelDate, returnDate]);
  const entries = application?.entries || (destination.toLowerCase().includes('emirates') ? 'Single / 30-Day Multiple' : 'Single Entry');
  
  // Fee and Processing Time
  const feeDisplay = routeData?.costs?.total_fee || routeData?.costs?.visa_fee || application?.feePaid || getRouteStatutoryFee(destination);
  const feeNotes = routeData?.costs?.notes || '';
  const processingTimeDisplay = routeData?.processing_time || routeData?.processing_and_timing?.decision_time || application?.processingTime || getRouteStatutoryTime(destination);

  const cleanProcessingTime = useMemo(() => {
    if (!processingTimeDisplay) return '15 - 20 Working Days';
    const s = processingTimeDisplay.trim();
    if (s.toLowerCase().includes('15') && s.toLowerCase().includes('45')) {
      return '15 - 45 Calendar Days';
    }
    return s
      .replace(/\s*\(Standard Consular SLA\)/gi, '')
      .replace(/\s*\(Standard Consular Period\)/gi, '')
      .replace(/\s*\(Standard\)/gi, '')
      .replace(/\s*\(Peak\)/gi, '')
      .replace(/\s*\(Priority Available\)/gi, '')
      .replace(/\s*\(Instant on Arrival\)/gi, '')
      .trim();
  }, [processingTimeDisplay]);

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

  const [userCheckedDocs, setUserCheckedDocs] = useState<Record<string, boolean>>({});

  const checklistDocuments = rawDocs.map((docItem) => {
    const t = docItem.title.toLowerCase();
    
    // Check if matching genuine uploaded document exists in user's vault
    const matchedVaultDoc = (vaultDocuments || []).find((v: any) => {
      if (!v) return false;
      const vName = (v.name || v.title || v.label || v.fileName || '').toLowerCase();
      const hasRealFile = Boolean(v.fileData || v.isRealUpload || (v.scannedMethod === 'OCR Scanned' && v.id && !v.id.startsWith('doc_req_') && v.id !== 'global_passport'));
      if (!hasRealFile) return false;

      if (t.includes('passport') && vName.includes('passport')) return true;
      if ((t.includes('photo') || t.includes('picture')) && (vName.includes('photo') || vName.includes('picture'))) return true;
      if ((t.includes('flight') || t.includes('ticket') || t.includes('air')) && (vName.includes('flight') || vName.includes('ticket'))) return true;
      if ((t.includes('hotel') || t.includes('accommodation') || t.includes('stay')) && (vName.includes('hotel') || vName.includes('stay') || vName.includes('accommodation'))) return true;
      if ((t.includes('insurance') || t.includes('medical')) && (vName.includes('insurance') || vName.includes('medical'))) return true;
      if ((t.includes('bank') || t.includes('financial') || t.includes('solvency')) && (vName.includes('bank') || vName.includes('statement'))) return true;
      if ((t.includes('aadhaar') || t.includes('pan') || t.includes('id') || t.includes('identity')) && (vName.includes('aadhaar') || vName.includes('pan') || vName.includes('id'))) return true;
      return false;
    });

    const isUploaded = Boolean(matchedVaultDoc);
    const isVerified = Boolean(matchedVaultDoc && (matchedVaultDoc.verified || matchedVaultDoc.status === 'verified'));
    const isManuallyChecked = Boolean(userCheckedDocs[docItem.title]);
    const isReady = isVerified || (isUploaded && isManuallyChecked) || isManuallyChecked;

    return {
      name: docItem.title,
      req: docItem.description,
      mandatory: docItem.is_mandatory !== false,
      isUploaded,
      isVerified,
      isManuallyChecked,
      isReady,
      matchedFileName: matchedVaultDoc?.name || matchedVaultDoc?.label || matchedVaultDoc?.fileName || null
    };
  });

  // Calculate live dynamic readiness score
  const readyDocsCount = checklistDocuments.filter(d => d.isReady).length;
  const mandatoryDocs = checklistDocuments.filter(d => d.mandatory);
  const mandatoryReadyCount = checklistDocuments.filter(d => d.mandatory && d.isReady).length;
  const allMandatoryReady = mandatoryDocs.length > 0 ? (mandatoryReadyCount >= mandatoryDocs.length) : (readyDocsCount > 0);

  // Check genuine vault documents count
  const genuineVaultDocs = (vaultDocuments || []).filter(
    (d: any) => d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
  );
  const genuineVaultDocsCount = genuineVaultDocs.length;

  // Pipeline Statuses
  const appStatus = (application?.status || '').toLowerCase();
  const isApproved = appStatus.includes('approved') || appStatus.includes('granted');
  const isFeePaid = Boolean(application?.isFeePaid) || appStatus.includes('fee paid') || appStatus.includes('submitted to embassy');
  const isFormSubmitted = Boolean(application?.isFormSubmitted) || appStatus.includes('form submitted') || appStatus.includes('in review');

  // Dynamic step calculation based on genuine documents & application pipeline state
  let currentStep = 1;
  let dynamicProgress = 10;

  if (isApproved) {
    currentStep = 6;
    dynamicProgress = 100;
  } else if (isFeePaid) {
    currentStep = 5;
    dynamicProgress = 85;
  } else if (isFormSubmitted) {
    currentStep = 4;
    dynamicProgress = 65;
  } else if (allMandatoryReady && mandatoryDocs.length > 0) {
    currentStep = 3;
    dynamicProgress = 45;
  } else if (readyDocsCount > 0 || genuineVaultDocsCount > 0) {
    // User has uploaded at least 1 document: Step 1 (Requirements) is checked, Step 2 (Documents) is in progress!
    currentStep = 2;
    dynamicProgress = Math.min(40, 15 + Math.round((readyDocsCount / Math.max(1, checklistDocuments.length)) * 25));
  } else {
    // Fresh start: 0 documents uploaded, fresh case: Step 1 (Requirements) is in progress, 0 completed!
    currentStep = 1;
    dynamicProgress = 10;
  }

  const progressPercent = typeof application?.progress === 'number' && application.progress > dynamicProgress && (genuineVaultDocsCount > 0 || isFormSubmitted)
    ? application.progress
    : dynamicProgress;

  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    [currentStep]: true
  });
  const [allExpanded, setAllExpanded] = useState(false);

  // Sync expanded steps whenever currentStep changes
  useEffect(() => {
    setExpandedSteps(prev => ({ ...prev, [currentStep]: true }));
  }, [currentStep]);

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

  const docsRatio = checklistDocuments.length > 0 ? (readyDocsCount / checklistDocuments.length) : 0;
  const calculatedReadinessScore = typeof readinessScore === 'number' && readinessScore > 0
    ? readinessScore
    : Math.min(100, Math.round((progressPercent * 0.4) + (docsRatio * 50) + (genuineVaultDocsCount > 0 ? 10 : 0)));

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
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Visa Application Details</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and manage your visa application progress
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
          <span>Back to Applications</span>
        </button>
      </div>

      {/* ── 1. APPLICATION METADATA HERO CARD (EXACT SLEEK LAYOUT MATCHING USER DESIGN) ── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Section 1: Application ID */}
          <div className="lg:col-span-4 space-y-1">
            <span className="text-xs text-slate-400 font-normal block">Application ID</span>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-base sm:text-lg font-bold text-[#009b68] font-mono tracking-tight">
                {trackingId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium transition-all shadow-2xs cursor-pointer"
                title="Copy Application ID"
              >
                <Copy className="w-3 h-3 text-slate-500" />
                <span>{copiedId ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-400 font-normal pt-3">
              Applied on: {appliedDate} &nbsp;·&nbsp; Last Updated: {lastUpdated}
            </div>
          </div>

          {/* Section 2: Name & Route & Visa Type */}
          <div className="lg:col-span-5 space-y-4">
            {/* Top Row: Name, From -> To */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div>
                <span className="text-xs text-slate-400 font-normal block">Name</span>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block truncate max-w-[170px] mt-1">
                  {applicantName || 'Applicant'}
                </strong>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-normal block">From</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <CountryFlag country={passport} />
                  <strong className="text-xs sm:text-sm font-bold text-slate-900">{passport}</strong>
                </div>
              </div>

              <span className="text-slate-400 text-sm mt-5 inline-block select-none">→</span>

              <div>
                <span className="text-xs text-slate-400 font-normal block">To</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <CountryFlag country={destination} />
                  <strong className="text-xs sm:text-sm font-bold text-slate-900">{destination}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Row: Visa Type & Entries */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs">
              <div>
                <span className="text-slate-400 font-normal">Visa Type: </span>
                <strong className="font-semibold text-slate-800">{resolvedVisaType}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-normal">Entries: </span>
                <strong className="font-semibold text-slate-800">{entries}</strong>
              </div>
            </div>
          </div>

          {/* Section 3: Travel & Return Dates */}
          <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
            <div>
              <span className="text-xs text-slate-400 font-normal block">Travel Date</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                {travelDate}
              </strong>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-normal block">Return Date</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                {returnDateWithDuration}
              </strong>
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
                currentStep > 1 ? 'bg-emerald-500 text-white' : currentStep === 1 ? 'bg-[#00a896] text-white ring-[#00a896]/20' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 1 ? 'font-black text-[#00a896]' : 'font-bold text-slate-800'}`}>
                1. Requirements
              </span>
            </div>

            {/* Step 2: Prepare Documents */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 2 ? 'bg-emerald-500 text-white' : currentStep === 2 ? 'bg-[#00a896] text-white ring-[#00a896]/20' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 2 ? 'font-black text-[#00a896]' : 'font-bold text-slate-800'}`}>
                2. Documents
              </span>
            </div>

            {/* Step 3: Fill Application */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 3 ? 'bg-emerald-500 text-white' : currentStep === 3 ? 'bg-[#00a896] text-white ring-[#00a896]/20' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 3 ? 'font-black text-[#00a896]' : 'font-bold text-slate-800'}`}>
                3. Application Form
              </span>
            </div>

            {/* Step 4: Pay Fees */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 4 ? 'bg-emerald-500 text-white' : currentStep === 4 ? 'bg-[#00a896] text-white ring-[#00a896]/20' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 4 ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 4 ? 'font-black text-[#00a896]' : 'font-bold text-slate-800'}`}>
                4. Pay Fees
              </span>
            </div>

            {/* Step 5: Submission / Verification */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white ${
                currentStep > 5 ? 'bg-emerald-500 text-white' : currentStep === 5 ? 'bg-[#00a896] text-white ring-[#00a896]/20' : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > 5 ? <Check className="w-4 h-4 stroke-[3]" /> : '5'}
              </div>
              <span className={`text-xs mt-2 ${currentStep === 5 ? 'font-black text-[#00a896]' : 'font-bold text-slate-800'}`}>
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
                          ? 'bg-[#00a896]/5 hover:bg-[#00a896]/10' 
                          : 'bg-white hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                          isStepCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isStepActive 
                            ? 'bg-[#00a896] text-white' 
                            : 'border-2 border-slate-300 bg-white'
                        }`}>
                          {isStepCompleted ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : isStepActive ? (
                            <CheckSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                          ) : null}
                        </div>
                        <div>
                          <h3 className={`text-xs sm:text-sm font-black ${isStepActive ? 'text-[#00a896]' : isStepCompleted ? 'text-slate-900' : 'text-slate-700'}`}>
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
                            ? 'bg-[#00a896]/10 text-[#00a896] border-[#00a896]/30' 
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {isStepCompleted ? 'Completed' : isStepActive ? 'In Progress' : 'Pending'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className={`w-4 h-4 ${isStepActive ? 'text-[#00a896]' : 'text-slate-400'}`} />
                        ) : (
                          <ChevronDown className={`w-4 h-4 ${isStepActive ? 'text-[#00a896]' : 'text-slate-400'}`} />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className={`p-4 border-t text-xs space-y-2.5 ${
                        isStepActive ? 'bg-indigo-50/20 border-indigo-100 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}>
                        <p className="leading-relaxed">
                          {stepNum === 1 && `Verify statutory validity for ${destination}: passport must have minimum 6 months validity from intended date of entry and 2 blank visa pages.`}
                          {stepNum === 2 && `Ensure all supporting documents (passport scan, photo, flight booking, accommodation voucher) meet official consulate specifications.`}
                          {stepNum === 3 && `Dossier details are validated against your passport biodata to prevent discrepancy rejections.`}
                          {stepNum === 4 && `Applicable visa processing & government statutory fees: ${feeDisplay}. ${feeNotes}`}
                          {stepNum === 5 && (
                            isOnlineOrOnArrival 
                              ? `Application is submitted directly to the immigration portal for automated security adjudication. No physical center visit needed.`
                              : `Dossier submitted to the official Visa Application Center. ${appointmentDisplay}`
                          )}
                          {stepNum === 6 && `Approved entry visa document or stamped passport will be delivered electronically or via secure courier.`}
                        </p>
                        {stepNum <= 2 && onOpenVault && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={onOpenVault}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{readyDocsCount > 0 ? `Manage Vault Documents (${readyDocsCount}/${checklistDocuments.length} Ready) →` : `Upload Required Documents in Vault →`}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION B: DOCUMENTS REQUIRED CHECKLIST (COMPACT LAYOUT MATCHING PHOTO 2) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-950">Documents Required Checklist</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Ensure all documents are available and meet the requirements
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  {readyDocsCount}/{checklistDocuments.length} Ready
                </span>
                <button
                  type="button"
                  onClick={() => setShowGuidelinesModal(true)}
                  className="text-xs font-bold text-[#00a896] hover:text-[#009282] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Document Guidelines</span>
                </button>
              </div>
            </div>

            {/* Checklist Table - Sleek Single-Line Compact Rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-2.5 px-3 md:w-[40%]">DOCUMENT</th>
                    <th className="py-2.5 px-3 hidden md:table-cell md:w-[45%]">REQUIREMENT</th>
                    <th className="py-2.5 px-3 text-right md:text-center whitespace-nowrap">READY TO USE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {checklistDocuments.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      {/* 1. DOCUMENT */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {getDocumentChecklistIcon(doc.name)}
                          <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {getCleanShortTitle(doc.name)}
                          </span>
                        </div>
                      </td>

                      {/* 2. REQUIREMENT (Hidden on mobile) */}
                      <td className="py-2.5 px-3 text-slate-600 font-medium text-xs hidden md:table-cell">
                        <span className="truncate block max-w-xs sm:max-w-md">
                          {getCleanShortRequirement(doc.req, doc.name)}
                        </span>
                      </td>

                      {/* 3. READY TO USE (Square format checkbox) */}
                      <td className="py-2.5 px-3 text-right md:text-center align-middle">
                        <div className="flex items-center justify-end md:justify-center">
                          {doc.isReady ? (
                            <button
                              type="button"
                              onClick={() => setUserCheckedDocs(prev => ({ ...prev, [doc.name]: false }))}
                              title="Ready to use (Click to uncheck)"
                              className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] aspect-square rounded-md bg-emerald-500 text-white border border-emerald-600 shadow-2xs hover:scale-105 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setUserCheckedDocs(prev => ({ ...prev, [doc.name]: true }))}
                              title="Not ready yet (Click when document is prepared)"
                              className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] aspect-square rounded-md border-2 border-amber-400 bg-amber-50/40 hover:border-emerald-500 hover:bg-emerald-50/60 hover:scale-105 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
                            >
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Checklist Legend */}
            <div className="flex flex-wrap items-center gap-6 pt-3.5 border-t border-slate-100 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-emerald-500 text-white border border-emerald-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Ready to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md border-2 border-amber-400 bg-amber-50/40 shrink-0" />
                <span>Pending Preparation</span>
              </div>
            </div>

            {/* Declaration & Terms Box Matching Photo 2 */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-1.5">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmedDeclaration}
                  onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded mt-0.5 focus:ring-emerald-500 border-emerald-300 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800 leading-relaxed">
                  I confirm that all the above documents are true, valid and ready to be used as per the terms and conditions of the embassy/consulate.
                </span>
              </label>
              <div className="pl-7">
                <button
                  type="button"
                  onClick={() => setShowGuidelinesModal(true)}
                  className="text-[11px] font-bold text-teal-700 hover:text-teal-800 underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Terms &amp; Conditions</span>
                  <Info className="w-3 h-3" />
                </button>
              </div>
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
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Evaluation</span>

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
          <div className="bg-[#f2f7ff] rounded-2xl border border-blue-100/80 p-4 sm:p-5 shadow-2xs space-y-3.5">
            <h3 className="text-sm font-bold text-[#0a3871] tracking-tight">Important Reminders</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-[#0a3871] block">Appointment Date</span>
                  <strong className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">{appointmentDisplay}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CircleDollarSign className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-[#0a3871] block">
                    {isFeePaid || currentStep >= 4 ? 'Visa Fee Paid' : 'Visa Fee'}
                  </span>
                  <strong className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">{feeDisplay}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-[#0a3871] block">Processing Time</span>
                  <strong className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">{cleanProcessingTime}</strong>
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
