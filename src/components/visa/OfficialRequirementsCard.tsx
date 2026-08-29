// src/components/visa/OfficialRequirementsCard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, 
  ChevronDown
} from 'lucide-react';
import type { AIRequirementsData } from '../../pages/api/visa/ai-requirements';

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

interface Props {
  countryName: string;
  passportCountry: string;
  purpose?: string;
}

function getCountryFlag(country: string): string {
  const c = country.toLowerCase();
  if (c.includes('india')) return '🇮🇳';
  if (c.includes('united kingdom') || c.includes('uk') || c.includes('england')) return '🇬🇧';
  if (c.includes('united states') || c.includes('usa') || c.includes('us')) return '🇺🇸';
  if (c.includes('greece')) return '🇬🇷';
  if (c.includes('uae') || c.includes('dubai') || c.includes('emirates')) return '🇦🇪';
  if (c.includes('canada')) return '🇨🇦';
  if (c.includes('australia')) return '🇦🇺';
  if (c.includes('germany')) return '🇩🇪';
  if (c.includes('france')) return '🇫🇷';
  if (c.includes('italy')) return '🇮🇹';
  if (c.includes('spain')) return '🇪🇸';
  if (c.includes('singapore')) return '🇸🇬';
  if (c.includes('thailand')) return '🇹🇭';
  if (c.includes('japan')) return '🇯🇵';
  if (c.includes('schengen') || c.includes('europe')) return '🇪🇺';
  if (c.includes('switzerland')) return '🇨🇭';
  if (c.includes('netherlands')) return '🇳🇱';
  if (c.includes('austria')) return '🇦🇹';
  if (c.includes('portugal')) return '🇵🇹';
  if (c.includes('new zealand')) return '🇳🇿';
  return '✈️';
}

export const OfficialRequirementsCard: React.FC<Props> = ({
  countryName,
  passportCountry,
  purpose = 'Tourism / Vacation'
}) => {
  const cleanFrom = useMemo(() => cleanCountryName(passportCountry), [passportCountry]);
  const cleanTo = useMemo(() => cleanCountryName(countryName), [countryName]);

  const initialPurposeLabel = useMemo(() => {
    const p = (purpose || '').toLowerCase();
    if (p.includes('study') || p.includes('student') || p.includes('education') || p.includes('higher')) return 'Higher Studies';
    if (p.includes('work') || p.includes('job') || p.includes('employment')) return 'Employment / Work';
    if (p.includes('business')) return 'Business Visit';
    if (p.includes('family')) return 'Family / Friends Visit';
    return 'Tourism / Vacation';
  }, [purpose]);

  const [selectedPurpose, setSelectedPurpose] = useState<string>(initialPurposeLabel);
  const [data, setData] = useState<AIRequirementsData | null>(null);
  const [loading, setLoading] = useState(false);

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

  const isStudies = selectedPurpose === 'Higher Studies';
  const fromFlag = getCountryFlag(cleanFrom);
  const toFlag = getCountryFlag(cleanTo);

  return (
    <div className="w-full bg-[#f8fafc] rounded-[24px] sm:rounded-[32px] p-4 sm:p-7 md:p-9 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 font-sans">
      
      {/* ── TOP SELECTOR BAR (Pixel-Perfect Match to Reference UI) ── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl px-5 sm:px-7 py-4 sm:py-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* From & To Pills */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* FROM */}
          <div className="space-y-1 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              FROM
            </span>
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900">
              <span className="text-base sm:text-lg">{fromFlag}</span>
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
              <span className="text-base sm:text-lg">{toFlag}</span>
              <span>{cleanTo}</span>
            </div>
          </div>
        </div>

        {/* PURPOSE OF TRAVEL */}
        <div className="w-full md:w-auto space-y-1 text-left border-t md:border-t-0 md:border-l border-slate-200 md:pl-8 pt-3 md:pt-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            PURPOSE OF TRAVEL
          </span>
          <div className="relative inline-flex items-center">
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="appearance-none text-sm sm:text-base font-extrabold text-slate-900 bg-transparent pr-6 py-0 border-none outline-none cursor-pointer focus:ring-0"
            >
              <option value="Tourism / Vacation">Tourism / Vacation</option>
              <option value="Higher Studies">Higher Studies</option>
              <option value="Employment / Work">Employment / Work</option>
              <option value="Business Visit">Business Visit</option>
              <option value="Family / Friends Visit">Family / Friends Visit</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none -ml-4" />
          </div>
        </div>

        {/* Requirements Checked Badge */}
        <div className="w-full md:w-auto flex justify-end">
          <div className="w-full md:w-auto bg-[#009e86] hover:bg-[#008b76] text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all select-none">
            <span>Requirements checked</span>
            <span className="text-sm font-black">✓</span>
          </div>
        </div>

      </div>

      {/* ── MAIN HEADLINE ── */}
      <div className="space-y-1.5 text-left pt-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a1b39] tracking-tight leading-tight">
          Travel Requirements: {cleanFrom} → {cleanTo}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          {data?.purpose || selectedPurpose} • {data?.visaType || 'Official Entry Visa'} • Information checked against {data?.officialSource || `${cleanTo} official consular sources`}
        </p>
      </div>

      {/* ── MAIN 3-COLUMN CARDS GRID ── */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#009e86] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Checking latest Embassy &amp; VFS official requirements...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ── CARD 1: ENTRY & DOCUMENT REQUIREMENTS (Left Column) ── */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5 h-full">
            <div className="flex items-center gap-3">
              {/* Solid Green Squircle Icon Badge */}
              <div className="w-7 h-7 rounded-lg bg-[#009e86] flex items-center justify-center shrink-0 shadow-2xs" />
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Entry &amp; Document Requirements
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {data.entryAndDocumentRequirements?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009e86] shrink-0 mt-1" />
                  <div className="space-y-0.5 min-w-0">
                    <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CARD 2: SUPPORTING DOCUMENTS (Middle Column) ── */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5 h-full">
            <div className="flex items-center gap-3">
              {/* Solid Purple Squircle Icon Badge */}
              <div className="w-7 h-7 rounded-lg bg-[#5b45d9] flex items-center justify-center shrink-0 shadow-2xs" />
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {isStudies ? 'Academic & Financial Documents' : selectedPurpose.includes('Tourism') ? 'Tourism Supporting Documents' : 'Supporting Evidence & Proofs'}
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {data.supportingDocuments?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009e86] shrink-0 mt-1" />
                  <div className="space-y-0.5 min-w-0">
                    <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: HOW TO APPLY & COSTS ── */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Card 3: How to Apply */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#009e86] flex items-center justify-center shrink-0 shadow-2xs" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  How to Apply
                </h3>
              </div>

              <div className="space-y-3 pt-1">
                {data.howToApply?.map((step, idx) => (
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

            {/* Card 4: Costs & Processing */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#5b45d9] flex items-center justify-center shrink-0 shadow-2xs" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Costs &amp; Processing
                </h3>
              </div>

              <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-bold text-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    {cleanTo === 'Greece' ? 'Schengen visa fee' : isStudies ? 'Consular / Student Visa Fee' : 'Government Visa Fee'}
                  </span>
                  <span className="font-extrabold text-slate-900">{data.costs.visaFee}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    {cleanTo === 'Greece' ? 'GVCW service fee' : isStudies ? 'Healthcare Surcharge / Logistics' : 'VAC / Service Fee'}
                  </span>
                  <span className="font-extrabold text-slate-900">{data.costs.serviceFee}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-sm sm:text-base">
                  <strong className="text-slate-900 font-extrabold">Total reference fees</strong>
                  <strong className="text-[#009e86] font-black text-base sm:text-lg">{data.costs.totalFee}</strong>
                </div>

                <p className="text-[10px] text-slate-400 font-medium pt-1">
                  {data.costs.feeNote}
                </p>
              </div>
            </div>

          </div>

        </div>
      ) : null}

      {/* ── BOTTOM CARD: PROCESSING & TIMING (Exact Match to Reference Design) ── */}
      {data && (
        <div className="bg-[#eaf8f6] border border-[#a8e6dd] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#008f80]">
            PROCESSING &amp; TIMING
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-800">
            <div>
              <span>{data.processingAndTiming.applyWindow}</span>
            </div>
            <div>
              <span>{data.processingAndTiming.decisionTime}</span>
            </div>
            <div>
              <span>{data.processingAndTiming.maxExtension}</span>
            </div>
          </div>

          {data.processingAndTiming.centerNote && (
            <p className="text-[11px] text-slate-500 font-medium pt-1 border-t border-teal-200/50">
              {data.processingAndTiming.centerNote}
            </p>
          )}
        </div>
      )}

    </div>
  );
};
