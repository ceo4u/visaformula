// src/components/visa/OfficialRequirementsCard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, 
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  Check,
  CheckCircle2,
  Bookmark,
  Mic,
  MessageSquare,
  Lock,
  Calendar,
  Layers,
  HelpCircle,
  Video,
  GraduationCap,
  FileEdit,
  Globe,
  Fingerprint,
  Building2,
  Award,
  DollarSign,
  UserCheck,
  CalendarCheck,
  Stamp,
  Users,
  Compass,
  CheckCheck,
  Plane,
  FileSpreadsheet
} from 'lucide-react';
import type { StructuredVisaRequirements } from '../../pages/api/visa/ai-requirements';

const getStepVisual = (stepText: string, index: number) => {
  const s = stepText.toLowerCase();
  
  const colors = [
    { text: 'text-blue-500', stroke: 'stroke-blue-500' },
    { text: 'text-emerald-500', stroke: 'stroke-emerald-500' },
    { text: 'text-amber-500', stroke: 'stroke-amber-500' },
    { text: 'text-orange-500', stroke: 'stroke-orange-500' },
    { text: 'text-rose-500', stroke: 'stroke-rose-500' },
    { text: 'text-fuchsia-500', stroke: 'stroke-fuchsia-500' },
    { text: 'text-indigo-500', stroke: 'stroke-indigo-500' }
  ];
  
  const color = colors[index % colors.length];

  if (s.includes('i-20') || s.includes('university') || s.includes('admit') || s.includes('offer') || s.includes('student')) {
    return { icon: <GraduationCap className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }
  if (s.includes('sevis') || s.includes('fee') || s.includes('pay') || s.includes('$') || s.includes('mrv') || s.includes('receipt')) {
    return { icon: <CreditCard className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }
  if (s.includes('ds-160') || s.includes('form') || s.includes('application') || s.includes('online') || s.includes('fill')) {
    return { icon: <FileEdit className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }
  if (s.includes('schedule') || s.includes('appointment') || s.includes('slot') || s.includes('profile') || s.includes('portal')) {
    return { icon: <CalendarCheck className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }
  if (s.includes('vac') || s.includes('biometric') || s.includes('fingerprint') || s.includes('photo')) {
    return { icon: <Fingerprint className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }
  if (s.includes('interview') || s.includes('consular') || s.includes('embassy')) {
    return { icon: <Building2 className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }
  if (s.includes('passport') || s.includes('stamped') || s.includes('collect') || s.includes('grant') || s.includes('approval')) {
    return { icon: <Award className={`w-7 h-7 ${color.text} stroke-[1.8]`} /> };
  }

  const fallbackIcons = [
    <Users className={`w-7 h-7 ${color.text} stroke-[1.8]`} />,
    <Compass className={`w-7 h-7 ${color.text} stroke-[1.8]`} />,
    <FileText className={`w-7 h-7 ${color.text} stroke-[1.8]`} />,
    <CheckCheck className={`w-7 h-7 ${color.text} stroke-[1.8]`} />,
    <Globe className={`w-7 h-7 ${color.text} stroke-[1.8]`} />,
    <Plane className={`w-7 h-7 ${color.text} stroke-[1.8]`} />,
    <Sparkles className={`w-7 h-7 ${color.text} stroke-[1.8]`} />
  ];

  return { icon: fallbackIcons[index % fallbackIcons.length] };
};

interface Props {
  countryName: string;
  passportCountry: string;
  purpose?: string;
}

function cleanCountryName(str: string): string {
  if (!str) return 'India';
  const s = str.trim();
  const sLow = s.toLowerCase();
  if (sLow === 'indian' || sLow === 'in' || sLow === 'india') return 'India';
  if (sLow === 'uk' || sLow === 'united kingdom' || sLow === 'england' || sLow === 'great britain' || sLow === 'british') return 'United Kingdom';
  if (sLow === 'us' || sLow === 'usa' || sLow === 'united states' || sLow === 'america' || sLow === 'american') return 'United States';
  if (sLow === 'uae' || sLow === 'dubai' || sLow === 'united arab emirates' || sLow === 'emirati') return 'United Arab Emirates';
  if (sLow === 'gr' || sLow === 'greece' || sLow === 'greek') return 'Greece';
  if (sLow === 'ca' || sLow === 'canada' || sLow === 'canadian') return 'Canada';
  if (sLow === 'au' || sLow === 'australia' || sLow === 'australian') return 'Australia';
  if (sLow === 'de' || sLow === 'germany' || sLow === 'german') return 'Germany';
  if (sLow === 'fr' || sLow === 'france' || sLow === 'french') return 'France';
  if (sLow === 'it' || sLow === 'italy' || sLow === 'italian') return 'Italy';
  if (sLow === 'es' || sLow === 'spain' || sLow === 'spanish') return 'Spain';
  if (sLow === 'sg' || sLow === 'singapore' || sLow === 'singaporean') return 'Singapore';
  if (sLow === 'th' || sLow === 'thailand' || sLow === 'thai') return 'Thailand';
  if (sLow === 'jp' || sLow === 'japan' || sLow === 'japanese') return 'Japan';
  return s.split(/[-_\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getCountryCode(country: string): string {
  const c = country.toLowerCase().trim();
  if (c.includes('india') || c === 'in' || c === 'indian') return 'in';
  if (c.includes('united kingdom') || c.includes('uk') || c.includes('england') || c.includes('britain') || c.includes('great britain')) return 'gb';
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
  if (c.includes('thailand') || c === 'th') return 'th';
  if (c.includes('japan') || c === 'jp') return 'jp';
  if (c.includes('switzerland') || c === 'ch') return 'ch';
  if (c.includes('netherlands') || c === 'nl') return 'nl';
  if (c.includes('austria') || c === 'at') return 'at';
  if (c.includes('portugal') || c === 'pt') return 'pt';
  if (c.includes('new zealand') || c === 'nz') return 'nz';
  if (c.includes('schengen') || c.includes('europe') || c === 'eu') return 'eu';
  if (c.includes('turkey') || c.includes('turkiye') || c === 'tr') return 'tr';
  if (c.includes('vietnam') || c === 'vn') return 'vn';
  if (c.includes('malaysia') || c === 'my') return 'my';
  if (c.includes('indonesia') || c.includes('bali') || c === 'id') return 'id';
  if (c.includes('china') || c === 'cn') return 'cn';
  if (c.includes('russia') || c === 'ru') return 'ru';
  if (c.includes('south africa') || c === 'za') return 'za';
  if (c.includes('brazil') || c === 'br') return 'br';
  if (c.includes('mexico') || c === 'mx') return 'mx';
  if (c.includes('ireland') || c === 'ie') return 'ie';
  if (c.includes('saudi') || c === 'sa') return 'sa';
  if (c.includes('qatar') || c === 'qa') return 'qa';
  if (c.includes('oman') || c === 'om') return 'om';
  if (c.includes('kuwait') || c === 'kw') return 'kw';
  if (c.includes('bahrain') || c === 'bh') return 'bh';
  return 'un';
}

const PURPOSE_OPTIONS = [
  { id: 'Tourism / Vacation', label: 'Tourism / Vacation', icon: '🏖️', desc: 'Holiday, leisure, sightseeing & short travel' },
  { id: 'Higher Studies', label: 'Higher Studies', icon: '🎓', desc: 'University, degree programs & CAS student route' },
  { id: 'Employment / Work', label: 'Employment / Work', icon: '💼', desc: 'Skilled work, sponsored jobs & employment permits' },
  { id: 'Business Visit', label: 'Business Visit', icon: '🤝', desc: 'Meetings, conferences, client deals & exhibitions' },
  { id: 'Family / Friends Visit', label: 'Family / Friends Visit', icon: '👨‍👩‍👧', desc: 'Visiting relatives, private hosts & dependents' },
];

export const OfficialRequirementsCard: React.FC<Props> = ({
  countryName,
  passportCountry,
  purpose = 'Tourism / Vacation'
}) => {
  const cleanFrom = useMemo(() => cleanCountryName(passportCountry), [passportCountry]);
  const cleanTo = useMemo(() => cleanCountryName(countryName), [countryName]);
  const fromCode = useMemo(() => getCountryCode(cleanFrom), [cleanFrom]);
  const toCode = useMemo(() => getCountryCode(cleanTo), [cleanTo]);

  const initialPurposeLabel = useMemo(() => {
    const p = (purpose || '').toLowerCase();
    if (p.includes('study') || p.includes('student') || p.includes('education') || p.includes('higher')) return 'Higher Studies';
    if (p.includes('work') || p.includes('job') || p.includes('employment')) return 'Employment / Work';
    if (p.includes('business')) return 'Business Visit';
    if (p.includes('family') || p.includes('friend')) return 'Family / Friends Visit';
    return 'Tourism / Vacation';
  }, [purpose]);

  const [selectedPurpose, setSelectedPurpose] = useState<string>(initialPurposeLabel);
  const [data, setData] = useState<StructuredVisaRequirements | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'documents' | 'financials' | 'mandates'>('all');

  const [checkedDocs, setCheckedDocs] = useState<Record<string, { ready: boolean; timestamp: string }>>({});
  const [isSavedToProfile, setIsSavedToProfile] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showMockQuestions, setShowMockQuestions] = useState(false);

  const storageKey = `travltik_checklist_${cleanTo}_${selectedPurpose}`.replace(/\s+/g, '_').toLowerCase();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedDocs(JSON.parse(saved));
        setIsSavedToProfile(true);
      } else {
        setCheckedDocs({});
        setIsSavedToProfile(false);
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    fetchRequirements(selectedPurpose);
  }, [cleanFrom, cleanTo, selectedPurpose]);

  const fetchRequirements = async (currPurpose: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/visa/ai-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromCountry: cleanFrom,
          toCountry: cleanTo,
          purpose: currPurpose
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (e) {
      console.error('Failed to load requirements:', e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const isUserLoggedIn = (): boolean => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      localStorage.getItem('travltik_user') || 
      localStorage.getItem('visaformula_user') || 
      localStorage.getItem('seeker_firstName')
    );
  };

  const toggleDocReady = (docKey: string) => {
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    setCheckedDocs(prev => {
      const isCurrentlyReady = prev[docKey]?.ready;
      const updated = {
        ...prev,
        [docKey]: {
          ready: !isCurrentlyReady,
          timestamp: !isCurrentlyReady ? formattedTimestamp : ''
        }
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}

      return updated;
    });
  };

  const handleSaveChecklistToProfile = () => {
    if (!isUserLoggedIn()) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedDocs));
      setIsSavedToProfile(true);
      showToast(`✅ Checklist saved to your dashboard! All timestamps synced.`);
    } catch {
      showToast(`❌ Unable to save checklist. Please try again.`);
    }
  };

  const totalItemsCount = useMemo(() => {
    if (!data) return 0;
    return (data.documents_required?.length || 0) + (data.financial_proofs?.length || 0);
  }, [data]);

  const readyItemsCount = useMemo(() => {
    return Object.values(checkedDocs).filter(v => v.ready).length;
  }, [checkedDocs]);

  const readinessPercentage = totalItemsCount > 0 
    ? Math.round((readyItemsCount / totalItemsCount) * 100) 
    : 0;

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cleanPurposeLabel = useMemo(() => {
    const p = (data?.purpose_of_visit || selectedPurpose || '').trim();
    if (p.toLowerCase().includes('tour')) return 'Tourism';
    if (p.toLowerCase().includes('study') || p.toLowerCase().includes('student')) return 'Higher Studies';
    if (p.toLowerCase().includes('work') || p.toLowerCase().includes('employ')) return 'Employment';
    if (p.toLowerCase().includes('business')) return 'Business';
    if (p.toLowerCase().includes('family') || p.toLowerCase().includes('friend')) return 'Family Visit';
    return p;
  }, [data?.purpose_of_visit, selectedPurpose]);

  const currentOption = PURPOSE_OPTIONS.find(opt => opt.id === selectedPurpose) || PURPOSE_OPTIONS[0];

  return (
    <div className="w-full space-y-4 sm:space-y-6 text-slate-800 font-sans relative">
      
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-full text-xs font-bold z-50 shadow-2xl flex items-center gap-2 border border-white/20 animate-fade-in whitespace-nowrap max-w-[90vw] truncate">
          <span>{toastMessage}</span>
        </div>
      )}

      {showAuthPrompt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 sm:space-y-5 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-xl sm:text-2xl text-indigo-600">
              <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Sign in to Save Checklist</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Save your verified document checklist to your traveler profile so you can log progress, record timestamps, and access your status from any device.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={() => setShowAuthPrompt(false)}
                className="flex-1 py-2.5 sm:py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <a 
                href="/login?redirect=back"
                className="flex-1 py-2.5 sm:py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md"
              >
                Sign In / Join →
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl sm:rounded-3xl px-4 sm:px-7 py-3.5 sm:py-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-5 relative z-30">
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="space-y-0.5 text-left min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">FROM</span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base font-extrabold text-slate-900 truncate">
              <img 
                src={`https://flagcdn.com/w80/${fromCode}.png`}
                alt={cleanFrom}
                className="w-4 h-3 sm:w-6 sm:h-4 object-cover rounded-xs shadow-2xs border border-slate-200/60 shrink-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png'; }}
              />
              <span className="truncate">{cleanFrom}</span>
            </div>
          </div>
          <div className="flex items-center text-slate-300 px-1 shrink-0">
            <span className="w-1 h-1 rounded-full bg-slate-300 mx-1 hidden sm:inline-block" />
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5 text-left min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">TO</span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base font-extrabold text-slate-900 truncate">
              <img 
                src={`https://flagcdn.com/w80/${toCode}.png`}
                alt={cleanTo}
                className="w-4 h-3 sm:w-6 sm:h-4 object-cover rounded-xs shadow-2xs border border-slate-200/60 shrink-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png'; }}
              />
              <span className="truncate">{cleanTo}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto space-y-0.5 text-left border-t md:border-t-0 md:border-l border-slate-200 md:pl-8 pt-2.5 md:pt-0">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">PURPOSE OF TRAVEL</span>
          <div className="text-xs sm:text-base font-extrabold text-slate-900 py-0.5">
            <span>{currentOption.label}</span>
          </div>
        </div>
      </div>

      {data && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 w-full md:w-auto text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-900">Readiness Tracker:</span>
              <span className="text-[10px] sm:text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {readyItemsCount} of {totalItemsCount} Verified ({readinessPercentage}%)
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
              Tap any item to register completion date and log audit timestamps.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSaveChecklistToProfile}
              className="w-full md:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm bg-slate-900 hover:bg-black text-white active:scale-95 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-white" />
              <span>{isSavedToProfile ? '✓ Synced to Profile' : 'Save to Profile'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1.5 text-left pt-1">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#0a1b39] tracking-tight leading-snug break-words">
          Travel Requirements: {cleanFrom} <span className="text-slate-400 font-normal">→</span> {cleanTo}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-4xl">
          <span className="font-bold text-slate-700">{cleanPurposeLabel}</span>
          {' '}•{' '}
          <span className="font-semibold text-slate-600">{data?.visa_type || 'Official Entry Visa'}</span>
          {' '}•{' '}
          <span>Checked against {data?.official_source_name || `${cleanTo} official consular sources`}</span>
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#009e86] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Extracting official consular and VFS visa guidelines...</p>
        </div>
      ) : data ? (
        <div className="space-y-6">
          
          {/* ── 1. OFFICIAL HOW TO APPLY (FULL-WIDTH CLEAN VECTOR ICON LIST AS SHOWN IN PHOTO) ── */}
          <div id="section-visa-process" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-2xs space-y-6 text-left scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Official How to Apply</h3>
                  <span className="text-xs text-slate-400 font-semibold block">Step-by-Step Sovereign Consular Workflow</span>
                </div>
              </div>

              {/* Integrated Fee Pill */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl shrink-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Fees:</span>
                <span className="text-base sm:text-lg font-black text-[#009e86]">
                  {data.costs.total_fee ? data.costs.total_fee.replace(/\s*Total\s*Reference/gi, '').replace(/\s*Reference/gi, '').trim() : data.costs.visa_fee}
                </span>
              </div>
            </div>

            {/* Vector Line Icon Step List (One by One Single-Column Stack) */}
            <div className="space-y-6 pt-2">
              {data.how_to_apply?.map((step, idx) => {
                const visual = getStepVisual(step, idx);
                const sLow = step.toLowerCase();
                const isInterviewMilestone = sLow.includes('consular interview') || (sLow.includes('schedule') && sLow.includes('appointment')) || sLow.includes('vac biometrics');

                return (
                  <div key={idx} className="flex items-start gap-4 group transition-all">
                    {/* Colorful Outlined Vector Icon */}
                    <div className="shrink-0 pt-0.5 transition-transform duration-200 group-hover:scale-110">
                      {visual.icon}
                    </div>

                    {/* Step Text */}
                    <div className="space-y-1 min-w-0 flex-1 text-left">
                      {isInterviewMilestone && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md mb-1">
                          <span>🎯 Crucial Milestone</span>
                        </span>
                      )}
                      <p className="text-xs sm:text-base font-bold text-slate-800 leading-relaxed group-hover:text-slate-950 transition-colors">
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fee Notes Breakdown */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-4 flex-wrap">
                <span><strong>Official Visa Fee:</strong> {data.costs.visa_fee}</span>
                <span>•</span>
                <span><strong>VAC / Logistics Fee:</strong> {data.costs.service_fee}</span>
              </div>
              <span className="text-[11px] text-slate-400">{data.costs.notes}</span>
            </div>
          </div>

          {/* ── 2. DOCUMENTS & FINANCIAL PROOFS (DIRECTLY BELOW HOW TO APPLY) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* DOCUMENTS REQUIRED CHECKLIST (7 cols) */}
            <div id="section-documents" className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5 h-full flex flex-col justify-between scroll-mt-24">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#009e86] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Documents Required Checklist</h3>
                    <span className="text-[11px] text-slate-400 font-medium block">{data.documents_required?.length || 0} Core Identification Items</span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {data.documents_required?.map((item, idx) => {
                    const docId = `doc_req_${idx}_${item.title}`.replace(/\s+/g, '_');
                    const isChecked = Boolean(checkedDocs[docId]?.ready);
                    const timestamp = checkedDocs[docId]?.timestamp;

                    return (
                      <div 
                        key={idx} 
                        onClick={() => toggleDocReady(docId)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                          isChecked 
                            ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400/20' 
                            : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <strong className={`text-xs sm:text-sm font-extrabold block leading-snug ${
                                isChecked ? 'text-emerald-950' : 'text-slate-900'
                              }`}>{item.title}</strong>
                              {item.is_mandatory && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">Mandatory</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.description}</p>
                            {isChecked && timestamp && (
                              <div className="pt-1 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                                <span>✓ Document ready · Recorded on {timestamp}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={handleSaveChecklistToProfile}
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Documents &amp; Sync to Dashboard</span>
                </button>
              </div>
            </div>

            {/* FINANCIAL PROOFS & MEANS (5 cols) */}
            <div id="section-financials" className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#5b45d9] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Financial Proofs &amp; Means</h3>
                    <span className="text-[11px] text-slate-400 font-medium block">Liquidity &amp; Income Verification</span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {data.financial_proofs?.map((item, idx) => {
                    const finId = `fin_proof_${idx}_${item.type}`.replace(/\s+/g, '_');
                    const isChecked = Boolean(checkedDocs[finId]?.ready);
                    const timestamp = checkedDocs[finId]?.timestamp;

                    return (
                      <div 
                        key={idx} 
                        onClick={() => toggleDocReady(finId)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                          isChecked 
                            ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-400/20' 
                            : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked ? 'bg-[#5b45d9] text-white' : 'border border-slate-300 bg-white text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">{item.type}</strong>
                            {item.minimum_balance_or_amount && (
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-950 text-[11px] font-bold">
                                <span>Threshold:</span>
                                <strong>{item.minimum_balance_or_amount}</strong>
                              </div>
                            )}
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              <span className="text-slate-400">Duration: </span>{item.time_frame}
                            </p>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed bg-white p-2 rounded-xl border border-slate-100">{item.notes}</p>
                            {isChecked && timestamp && (
                              <div className="pt-1 text-[10px] font-bold text-indigo-700 flex items-center gap-1">
                                <span>✓ Balance verified · Recorded on {timestamp}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={handleSaveChecklistToProfile}
                  className="w-full py-2.5 bg-[#5b45d9] hover:bg-[#4a36be] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Verify Financials &amp; Sync to Dashboard</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : null}



      {data && (
        <div id="section-mandates" className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Important Consular Mandates &amp; Insurance Guidelines</h3>
              <span className="text-[11px] text-slate-400 font-medium block">Travel Health Insurance, Biometric Rules &amp; Compliance</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {data.other_requirements?.map((req, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-left space-y-1">
                <span className="text-xs font-extrabold text-slate-900 block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{req.category}</span>
                </span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{req.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data && (
        <div id="section-timing" className="bg-[#f4f6f8] border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left space-y-2.5 shadow-2xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">PROCESSING &amp; TIMING</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-900">
            <div><span>{data.processing_and_timing.apply_window}</span></div>
            <div><span>{data.processing_and_timing.decision_time}</span></div>
            <div><span>{data.processing_and_timing.max_extension}</span></div>
          </div>
          {data.processing_and_timing.center_notes && (
            <p className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-200/70">{data.processing_and_timing.center_notes}</p>
          )}
        </div>
      )}
    </div>
  );
};
