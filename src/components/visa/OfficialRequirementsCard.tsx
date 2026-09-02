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

const getMandateVisual = (category: string, index: number) => {
  const catLow = (category || '').toLowerCase();
  
  if (catLow.includes('appointment') || catLow.includes('schedule') || catLow.includes('vac') || catLow.includes('biometric')) {
    return {
      icon: <CalendarCheck className="w-7 h-7 text-amber-500 stroke-[1.8]" />,
      tag: 'APPOINTMENT RULE',
      badgeBg: 'bg-amber-100/90 text-amber-900'
    };
  }
  if (catLow.includes('214') || catLow.includes('adjudication') || catLow.includes('intent') || catLow.includes('legal') || catLow.includes('law')) {
    return {
      icon: <Award className="w-7 h-7 text-indigo-500 stroke-[1.8]" />,
      tag: 'LEGAL ADJUDICATION',
      badgeBg: 'bg-indigo-100/90 text-indigo-900'
    };
  }
  if (catLow.includes('insurance') || catLow.includes('health') || catLow.includes('medical') || catLow.includes('ihs')) {
    return {
      icon: <ShieldCheck className="w-7 h-7 text-emerald-500 stroke-[1.8]" />,
      tag: 'HEALTH & COVERAGE',
      badgeBg: 'bg-emerald-100/90 text-emerald-900'
    };
  }
  if (catLow.includes('sevis') || catLow.includes('fee') || catLow.includes('receipt') || catLow.includes('ds-160') || catLow.includes('form') || catLow.includes('petition') || catLow.includes('letter')) {
    return {
      icon: <FileEdit className="w-7 h-7 text-blue-500 stroke-[1.8]" />,
      tag: 'DOCUMENT COMPLIANCE',
      badgeBg: 'bg-blue-100/90 text-blue-900'
    };
  }
  
  return {
    icon: <AlertCircle className="w-7 h-7 text-orange-500 stroke-[1.8]" />,
    tag: 'CONSULAR DIRECTIVE',
    badgeBg: 'bg-orange-100/90 text-orange-900'
  };
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

import { ALL_COUNTRIES } from '../../data/countries';

function getCountryCode(country: string): string {
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
  if (c.includes('south africa') || c === 'za') return 'za';
  if (c.includes('brazil') || c === 'br') return 'br';
  if (c.includes('mexico') || c === 'mx') return 'mx';
  if (c.includes('ireland') || c === 'ie') return 'ie';
  if (c.includes('saudi') || c === 'sa') return 'sa';
  if (c.includes('qatar') || c === 'qa') return 'qa';
  if (c.includes('oman') || c === 'om') return 'om';
  if (c.includes('kuwait') || c === 'kw') return 'kw';
  if (c.includes('bahrain') || c === 'bh') return 'bh';
  if (c.includes('seychelles') || c === 'sc') return 'sc';
  if (c.includes('fiji') || c === 'fj') return 'fj';
  if (c.includes('kenya') || c === 'ke') return 'ke';
  if (c.includes('egypt') || c === 'eg') return 'eg';
  if (c.includes('philippines') || c === 'ph') return 'ph';
  if (c.includes('georgia') || c === 'ge') return 'ge';
  if (c.includes('kazakhstan') || c === 'kz') return 'kz';
  if (c.includes('south korea') || c === 'kr') return 'kr';
  
  // Lookup in ALL_COUNTRIES
  const match = ALL_COUNTRIES.find(item => item.name.toLowerCase() === c || item.code.toLowerCase() === c);
  if (match) return match.code.toLowerCase();
  
  return 'un';
}

const PURPOSE_OPTIONS = [
  { id: 'Tourism / Vacation', label: 'Tourism / Vacation', icon: '🏖️', desc: 'Holiday, leisure, sightseeing & short travel' },
  { id: 'Higher Studies', label: 'Higher Studies', icon: '🎓', desc: 'University, degree programs & CAS student route' },
  { id: 'Employment / Work', label: 'Employment / Work', icon: '💼', desc: 'Skilled work, sponsored jobs & employment permits' },
  { id: 'Permanent Residency (PR) / Immigration', label: 'Permanent Residency (PR) / Immigration', icon: '🏛️', desc: 'Green Card, Express Entry, Skilled PR & Settlement' },
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
    if (p.includes('pr') || p.includes('permanent') || p.includes('immigrat') || p.includes('green') || p.includes('settle')) return 'Permanent Residency (PR) / Immigration';
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
      (localStorage.getItem("travltik_user")) || 
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
    if (p.toLowerCase().includes('pr') || p.toLowerCase().includes('permanent') || p.toLowerCase().includes('immigrat')) return 'Permanent Residency (PR) / Immigration';
    if (p.toLowerCase().includes('business') || p.toLowerCase().includes('corporate')) return 'Business / Corporate Visit';
    if (p.toLowerCase().includes('study') || p.toLowerCase().includes('student')) return 'Higher Studies';
    if (p.toLowerCase().includes('work') || p.toLowerCase().includes('employ')) return 'Employment / Work';
    if (p.toLowerCase().includes('family') || p.toLowerCase().includes('friend')) return 'Family / Friends Visit';
    if (p.toLowerCase().includes('tour')) return 'Tourism / Vacation';
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
          
          {/* ── KEY VISA TIMING & VALIDITY OVERVIEW (4-CARD GRID MATCHING PHOTO EXACTLY) ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Processing Time */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs text-left space-y-3">
              <Clock className="w-6 h-6 text-slate-800 stroke-[1.75]" />
              <div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 block">Processing Time</span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                  {data.processing_time || data.processing_and_timing?.decision_time || '3–5 Days'}
                </h4>
              </div>
            </div>

            {/* Card 2: Validity */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs text-left space-y-3">
              <Clock className="w-6 h-6 text-slate-800 stroke-[1.75]" />
              <div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 block">Validity</span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                  {data.validity || data.validity_and_stay?.visa_validity || (cleanTo.toLowerCase().includes('emirates') || cleanTo.toLowerCase().includes('uae') || cleanTo.toLowerCase().includes('dubai') ? '60 Days' : cleanTo.toLowerCase().includes('jordan') ? '30 Days' : '90 days')}
                </h4>
              </div>
            </div>

            {/* Card 3: Length of stay */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs text-left space-y-3">
              <Clock className="w-6 h-6 text-slate-800 stroke-[1.75]" />
              <div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 block">Length of stay</span>
                <h4 className="text-sm sm:text-base lg:text-lg font-black text-slate-950 tracking-tight mt-0.5 leading-snug">
                  {data.stay_duration || data.validity_and_stay?.max_stay_per_entry || (cleanTo.toLowerCase().includes('emirates') || cleanTo.toLowerCase().includes('uae') || cleanTo.toLowerCase().includes('dubai') ? 'Up to 30 Days or 60 Days (depending on selected e-Visa tier)' : cleanTo.toLowerCase().includes('jordan') ? '30 Days upon Entry (Extendable up to 3 Months)' : 'Up to 30 to 90 Days')}
                </h4>
              </div>
            </div>

            {/* Card 4: Entry */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs text-left space-y-3">
              <ShieldCheck className="w-6 h-6 text-slate-800 stroke-[1.75]" />
              <div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 block">Entry</span>
                <h4 className="text-sm sm:text-base lg:text-lg font-black text-slate-950 tracking-tight mt-0.5 leading-snug">
                  {data.entry_type || data.validity_and_stay?.entry_type || (cleanTo.toLowerCase().includes('jordan') ? 'Single Entry' : 'Multiple Entry')}
                </h4>
              </div>
            </div>
          </div>

          {/* ── 1. HOW TO APPLY (FULL-WIDTH CLEAN VECTOR ICON LIST AS SHOWN IN PHOTO) ── */}
          <div id="section-visa-process" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-2xs space-y-6 text-left scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">How to Apply</h3>
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
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 flex-wrap text-xs text-slate-500 font-medium">
              <span><strong>Visa Fee:</strong> {data.costs.visa_fee}</span>
              <span>•</span>
              <span><strong>VAC / Logistics Fee:</strong> {data.costs.service_fee}</span>
            </div>
          </div>

          {/* ── 2. DOCUMENTS REQUIRED CHECKLIST (CRYSTAL CLEAR HIGH-CONTRAST TABLE) ── */}
          <div id="section-documents" className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-10 border border-slate-200/90 shadow-2xs space-y-5 sm:space-y-6 text-left scroll-mt-24 w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">Documents Required Checklist</h3>
                  <span className="text-xs text-slate-500 font-semibold block">Official Embassy Verification &amp; Compliance Details</span>
                </div>
              </div>

              <button 
                onClick={handleSaveChecklistToProfile}
                className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verify Documents &amp; Sync</span>
              </button>
            </div>

            {/* Official Consular Checklist Table (Distinct S.NO, READY Checkbox & DOCUMENT Columns) */}
            <div className="border border-slate-300 rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 border-b border-slate-300 text-xs font-black text-slate-900 uppercase tracking-wider">
                    <th className="py-3 sm:py-4 px-1.5 sm:px-3 w-10 sm:w-16 text-center border-r border-slate-300 text-[11px] sm:text-xs">#</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 w-16 sm:w-24 text-center border-r border-slate-300 text-[11px] sm:text-xs">READY</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-8 text-[11px] sm:text-xs">DOCUMENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {data.documents_required && data.documents_required.length > 0 ? (
                    data.documents_required.map((doc, idx) => {
                      const docKey = `doc_req_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
                      const isReady = checkedDocs[docKey]?.ready;
                      const titleLower = doc.title.toLowerCase();
                      const descLower = doc.description.toLowerCase();
                      const isInsurance = titleLower.includes('insurance') || titleLower.includes('medical') || descLower.includes('insurance');
                      const isCriticalNotice = descLower.includes('⚠️') || descLower.includes('mandatory') || descLower.includes('strictly');

                      return (
                        <tr key={idx} className="transition-colors hover:bg-slate-50/50">
                          {/* Col 1: Serial Number */}
                          <td className="py-3 sm:py-5 px-1 sm:px-2 text-center border-r border-slate-200 align-top pt-4 sm:pt-5">
                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-black text-slate-700">
                              {idx + 1}
                            </span>
                          </td>

                          {/* Col 2: Interactive Ready Checklist */}
                          <td className="py-3 sm:py-5 px-1.5 sm:px-3 text-center border-r border-slate-200 align-top pt-4 sm:pt-5">
                            <div 
                              onClick={() => toggleDocReady(docKey)}
                              className="flex flex-col items-center justify-center gap-1 cursor-pointer select-none group"
                              title={isReady ? "Marked as Ready" : "Click to mark as Ready"}
                            >
                              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 transition-all flex items-center justify-center shadow-xs ${
                                isReady
                                  ? 'bg-emerald-600 border-emerald-600 text-white scale-105 shadow-emerald-200'
                                  : 'border-slate-300 bg-white group-hover:border-emerald-500'
                              }`}>
                                {isReady ? (
                                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-white" />
                                ) : (
                                  <div className="w-2 h-2 rounded-xs bg-slate-200 group-hover:bg-emerald-400 transition-colors" />
                                )}
                              </div>
                              {isReady && (
                                <span className="text-[9px] font-black text-emerald-700 uppercase tracking-tighter hidden sm:block">Ready</span>
                              )}
                            </div>
                          </td>

                          {/* Col 3: Document Details */}
                          <td className="py-3 sm:py-5 px-3 sm:px-8 align-top space-y-2 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <strong className="font-black text-slate-950 block text-[13px] sm:text-[17px] tracking-tight leading-snug break-words">
                                {doc.title}
                              </strong>
                              {doc.is_mandatory ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                                  ✓ Mandatory
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                                  Optional / Supporting
                                </span>
                              )}
                            </div>

                            {/* Formatted Multi-line / Bullet Description */}
                            <div className="text-[11px] sm:text-sm text-slate-600 font-medium sm:font-semibold space-y-1.5 break-words leading-relaxed whitespace-pre-line">
                              {doc.description}
                            </div>

                            {/* Consular Insurance Assistance Card */}
                            {isInsurance && (
                              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs mt-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-900 bg-sky-100/90 px-2.5 py-0.5 rounded-full border border-sky-200">
                                    Consular Assistance
                                  </span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                  You can purchase insurance coverage from any insurer of your selection. However, in order to expedite and facilitate your application, TravlTik provides direct consular-approved insurance policy issuance.
                                </p>
                                <div className="pt-1">
                                  <a
                                    href="/find-experts?category=insurance"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#004e8c] hover:bg-[#003866] text-white rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase shadow-sm hover:shadow-md transition-all active:scale-95"
                                  >
                                    <span>FIND A MEDICAL INSURANCE</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500 font-semibold">
                        No specific documents listed for this category. Please check official embassy guidelines.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── 3. FINANCIAL PROOFS & SOLVENCY BREAKDOWN ── */}
            {data.financial_proofs && data.financial_proofs.length > 0 && (
              <div className="pt-6 border-t border-slate-200/80 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                      Financial Proofs &amp; Solvency Benchmarks
                    </h4>
                    <span className="text-xs text-slate-500 font-medium block">
                      Mandatory financial documents required to prove self-sufficiency
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {data.financial_proofs.map((fin, fIdx) => (
                    <div key={fIdx} className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 text-left">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <strong className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {fin.type}
                        </strong>
                        {fin.minimum_balance_or_amount && (
                          <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {fin.minimum_balance_or_amount}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 font-semibold space-y-1">
                        <p><span className="text-slate-400 font-bold uppercase text-[10px]">Timeline:</span> {fin.time_frame}</p>
                        <p className="text-slate-700 font-medium">{fin.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 4. OFFICIAL CONSULAR DIRECTIVES & MANDATES ── */}
            {data.other_requirements && data.other_requirements.length > 0 && (
              <div className="pt-6 border-t border-slate-200/80 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                      Official Consular Directives &amp; Compliance Mandates
                    </h4>
                    <span className="text-xs text-slate-500 font-medium block">
                      Crucial legal guidelines, 90/180 rules, and application standards
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {data.other_requirements.map((mandate, mIdx) => {
                    const visual = getMandateVisual(mandate.category, mIdx);
                    return (
                      <div key={mIdx} className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 text-left shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${visual.badgeBg}`}>
                            {mandate.category}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                          {mandate.details}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
