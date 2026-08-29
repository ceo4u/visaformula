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
  Check
} from 'lucide-react';
import type { StructuredVisaRequirements } from '../../pages/api/visa/ai-requirements';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState<StructuredVisaRequirements | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'documents' | 'financials' | 'mandates'>('all');

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className="w-full bg-[#f8fafc] rounded-[24px] sm:rounded-[32px] p-4 sm:p-7 md:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 font-sans">
      
      {/* ── TOP SELECTOR BAR (Clean Reference Aesthetics) ── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl px-5 sm:px-7 py-4 sm:py-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5 relative z-30">
        
        {/* From & To Pills */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* FROM */}
          <div className="space-y-1 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              FROM
            </span>
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900">
              <img 
                src={`https://flagcdn.com/w80/${fromCode}.png`}
                alt={cleanFrom}
                className="w-5 h-3.5 sm:w-6 sm:h-4 object-cover rounded-xs shadow-2xs border border-slate-200/60 shrink-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png'; }}
              />
              <span>{cleanFrom}</span>
            </div>
          </div>

          {/* Dots & Arrow */}
          <div className="flex items-center text-slate-300 px-1 pt-3 sm:pt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1.5" />
            <ArrowRight className="w-4 h-4 text-slate-400 stroke-[2.5]" />
          </div>

          {/* TO */}
          <div className="space-y-1 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              TO
            </span>
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900">
              <img 
                src={`https://flagcdn.com/w80/${toCode}.png`}
                alt={cleanTo}
                className="w-5 h-3.5 sm:w-6 sm:h-4 object-cover rounded-xs shadow-2xs border border-slate-200/60 shrink-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png'; }}
              />
              <span>{cleanTo}</span>
            </div>
          </div>
        </div>

        {/* PURPOSE OF TRAVEL (Clean Display) */}
        <div className="w-full md:w-auto space-y-1 text-left border-t md:border-t-0 md:border-l border-slate-200 md:pl-8 pt-3 md:pt-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            PURPOSE OF TRAVEL
          </span>
          <div className="text-sm sm:text-base font-extrabold text-slate-900 py-0.5">
            <span>{currentOption.label}</span>
          </div>
        </div>

        {/* Requirements Checked Badge */}
        <div className="w-full md:w-auto flex items-center justify-end gap-3">
          {data?.source_url && (
            <a
              href={data.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
            >
              <span>Official Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <div className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all select-none cursor-default">
            <span>Requirements checked</span>
            <span className="text-sm font-bold text-emerald-400">✓</span>
          </div>
        </div>

      </div>

      {/* ── MAIN HEADLINE & SUBTITLE (Clean, Uncrowded Typography) ── */}
      <div className="space-y-2 text-left pt-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a1b39] tracking-tight leading-tight">
          Travel Requirements: {cleanFrom} <span className="text-slate-400 font-normal">→</span> {cleanTo}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-4xl">
          <span className="font-bold text-slate-700">{cleanPurposeLabel}</span>
          {' '}•{' '}
          <span className="font-semibold text-slate-600">{data?.visa_type || 'Official Entry Visa'}</span>
          {' '}•{' '}
          <span>Information checked against {data?.official_source_name || `${cleanTo} official consular sources`}</span>
        </p>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#009e86] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Extracting official consular and VFS visa guidelines...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ── BUCKET A: DOCUMENTS REQUIRED CHECKLIST ── */}
          {(activeTab === 'all' || activeTab === 'documents') && (
            <div className={`${activeTab === 'all' ? 'lg:col-span-4' : 'lg:col-span-6'} bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5 h-full`}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#009e86] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Documents Required Checklist
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    {data.documents_required?.length || 0} Core Identification Items
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                {data.documents_required?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-left group">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#009e86] shrink-0 mt-1 group-hover:scale-125 transition-transform" />
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                          {item.title}
                        </strong>
                        {item.is_mandatory && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                            Mandatory
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BUCKET B: FINANCIAL PROOFS & MEANS OF SUBSISTENCE ── */}
          {(activeTab === 'all' || activeTab === 'financials') && (
            <div className={`${activeTab === 'all' ? 'lg:col-span-4' : 'lg:col-span-6'} bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5 h-full`}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#5b45d9] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Financial Proofs &amp; Means
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Liquidity &amp; Income Verification
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                {data.financial_proofs?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-left group">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5b45d9] shrink-0 mt-1 group-hover:scale-125 transition-transform" />
                    <div className="space-y-1 min-w-0">
                      <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                        {item.type}
                      </strong>
                      
                      {item.minimum_balance_or_amount && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 text-[11px] font-bold">
                          <span>Threshold:</span>
                          <strong>{item.minimum_balance_or_amount}</strong>
                        </div>
                      )}

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        <span className="text-slate-400">Duration: </span>{item.time_frame}
                      </p>

                      <p className="text-[11px] text-slate-500 font-normal leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {item.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BUCKET C / RIGHT STACK: HOW TO APPLY & COSTS ── */}
          {activeTab === 'all' && (
            <div className="lg:col-span-4 space-y-5">
              
              {/* How to Apply */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#009e86] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    How to Apply
                  </h3>
                </div>

                <div className="space-y-3 pt-1">
                  {data.how_to_apply?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-left">
                      <div className="w-5 h-5 rounded-full bg-[#5b45d9] text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Costs & Processing */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#5b45d9] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Costs &amp; Reference Fees
                  </h3>
                </div>

                <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-bold text-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-600">Official Visa Fee:</span>
                    <span className="font-extrabold text-slate-900">{data.costs.visa_fee}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-600">VAC / Logistics Fee:</span>
                    <span className="font-extrabold text-slate-900">{data.costs.service_fee}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-sm sm:text-base">
                    <strong className="text-slate-900 font-extrabold">Total reference fees</strong>
                    <strong className="text-[#009e86] font-black text-base sm:text-lg">{data.costs.total_fee}</strong>
                  </div>

                  <p className="text-[10px] text-slate-400 font-medium pt-1">
                    {data.costs.notes}
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ── BUCKET C: MANDATES & INSURANCE FULL TAB VIEW ── */}
          {(activeTab === 'all' || activeTab === 'mandates') && (
            <div className={`${activeTab === 'all' ? 'lg:col-span-12' : 'lg:col-span-12'} bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4`}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Important Consular Mandates &amp; Insurance Guidelines
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Travel Health Insurance, Biometric Rules &amp; Compliance
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {data.other_requirements?.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-left space-y-1">
                    <span className="text-xs font-extrabold text-slate-900 block flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{req.category}</span>
                    </span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {req.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : null}

      {/* ── BOTTOM CARD: PROCESSING & TIMING (Exact Match to Reference Design) ── */}
      {data && (
        <div className="bg-[#f4f6f8] border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left space-y-2.5 shadow-2xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            PROCESSING &amp; TIMING
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-900">
            <div>
              <span>{data.processing_and_timing.apply_window}</span>
            </div>
            <div>
              <span>{data.processing_and_timing.decision_time}</span>
            </div>
            <div>
              <span>{data.processing_and_timing.max_extension}</span>
            </div>
          </div>

          {data.processing_and_timing.center_notes && (
            <p className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-200/70">
              {data.processing_and_timing.center_notes}
            </p>
          )}
        </div>
      )}

    </div>
  );
};
