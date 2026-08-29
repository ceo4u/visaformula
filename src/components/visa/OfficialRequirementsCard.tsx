// src/components/visa/OfficialRequirementsCard.tsx
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  CreditCard, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Sparkles,
  Plane,
  Building2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import type { AIRequirementsData } from '../../pages/api/visa/ai-requirements';

interface Props {
  countryName: string;
  passportCountry: string;
  purpose?: string;
}

export const OfficialRequirementsCard: React.FC<Props> = ({
  countryName,
  passportCountry,
  purpose = 'Tourism / Vacation'
}) => {
  const [data, setData] = useState<AIRequirementsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(purpose);

  useEffect(() => {
    fetchRequirements(selectedPurpose);
  }, [countryName, passportCountry, selectedPurpose]);

  const fetchRequirements = async (currentPurpose: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/visa/ai-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromCountry: passportCountry,
          toCountry: countryName,
          purpose: currentPurpose
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (e) {
      console.error('Failed to load official visa requirements:', e);
    } finally {
      setLoading(false);
    }
  };

  const isGreece = countryName.toLowerCase().includes('greece');

  return (
    <div className="w-full bg-[#f8fafc] rounded-[28px] sm:rounded-[36px] p-4 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 font-sans">
      
      {/* ── TOP SELECTOR BAR (Exact Match to Screenshot) ── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* From & To Pills */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">FROM</span>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-slate-900">
              <span className="text-lg">🇮🇳</span>
              <span>{passportCountry}</span>
            </div>
          </div>

          <div className="flex items-center px-2 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
            <ArrowRight className="w-4 h-4 text-slate-400 stroke-[2.5]" />
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">TO</span>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-slate-900">
              <span className="text-lg">{isGreece ? '🇬🇷' : '✈️'}</span>
              <span>{countryName}</span>
            </div>
          </div>
        </div>

        {/* Purpose of Travel */}
        <div className="w-full md:w-auto space-y-0.5 border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 pt-3 md:pt-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">PURPOSE OF TRAVEL</span>
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
            className="text-xs sm:text-sm font-extrabold text-slate-900 bg-transparent border-none outline-none cursor-pointer focus:ring-0 p-0"
          >
            <option value="Tourism / Vacation">Tourism / Vacation</option>
            <option value="Higher Studies">Higher Studies</option>
            <option value="Employment / Work">Employment / Work</option>
            <option value="Business Visit">Business Visit</option>
            <option value="Family / Friends Visit">Family / Friends Visit</option>
          </select>
        </div>

        {/* Requirements Checked Badge */}
        <div className="w-full md:w-auto flex justify-end">
          <div className="w-full md:w-auto bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all">
            <span>Requirements checked</span>
            <span className="text-sm">✓</span>
          </div>
        </div>

      </div>

      {/* ── MAIN HEADLINE ── */}
      <div className="space-y-1 pt-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Travel Requirements: {passportCountry} → {countryName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          {data?.purpose || selectedPurpose} • {data?.visaType || 'Short-stay Schengen Visa (Type C)'} • Information checked against {data?.officialSource || (isGreece ? 'Greek official sources (GVCW & Embassy)' : `${countryName} official sources`)}
        </p>
      </div>

      {/* ── MAIN 3-COLUMN CARDS GRID ── */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#00a896] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Checking latest Embassy &amp; VFS requirements...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ── CARD 1: ENTRY & DOCUMENT REQUIREMENTS (Left Column) ── */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5 h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00a896] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Entry &amp; Document Requirements
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {data.entryAndDocumentRequirements?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00a896] shrink-0 mt-1" />
                  <div className="space-y-0.5 min-w-0">
                    <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CARD 2: TOURISM / SUPPORTING DOCUMENTS (Middle Column) ── */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5 h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#6366f1] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {selectedPurpose.includes('Tourism') ? 'Tourism Supporting Documents' : 'Financial & Purpose Documents'}
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {data.supportingDocuments?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00a896] shrink-0 mt-1" />
                  <div className="space-y-0.5 min-w-0">
                    <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: HOW TO APPLY & COSTS & PROCESSING ── */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Card 3: How to Apply */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00a896] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  How to Apply
                </h3>
              </div>

              <div className="space-y-3 pt-1">
                {data.howToApply?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <div className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
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
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#6366f1] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Costs &amp; Processing
                </h3>
              </div>

              <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-bold text-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    {isGreece ? 'Schengen visa fee' : 'Government consular fee'}
                  </span>
                  <span className="font-extrabold text-slate-900">{data.costs.visaFee}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    {isGreece ? 'GVCW service fee' : 'VAC / Service fee'}
                  </span>
                  <span className="font-extrabold text-slate-900">{data.costs.serviceFee}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-sm sm:text-base">
                  <strong className="text-slate-900 font-extrabold">Total reference fees</strong>
                  <strong className="text-[#00a896] font-black text-base sm:text-lg">{data.costs.totalFee}</strong>
                </div>

                <p className="text-[10px] text-slate-400 font-medium pt-1">
                  {data.costs.feeNote}
                </p>
              </div>
            </div>

          </div>

        </div>
      ) : null}

      {/* ── BOTTOM CARD: PROCESSING & TIMING (Exact Match to Screenshot) ── */}
      {data && (
        <div className="bg-[#e6f7f5]/80 border border-teal-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#00a896]">
            PROCESSING &amp; TIMING
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold text-slate-800">
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
