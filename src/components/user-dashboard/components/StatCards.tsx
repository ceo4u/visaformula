import React from "react";
import { ShieldCheck, Briefcase, Luggage, FileText, BookOpen, Lock } from "lucide-react";

export function StatCards({
  comprehensiveAuditMetrics,
  visasProcessingState,
  luggageProgress,
  documentsCount,
  hasIeltsScore,
  overallBand,
  setActiveTab,
  setSelectedApplicationId
}: {
  comprehensiveAuditMetrics: {
    score: number;
    isUnselected: boolean;
  };
  visasProcessingState: any[];
  luggageProgress: {
    packed: number;
    total: number;
    percent: number;
  };
  documentsCount: number;
  hasIeltsScore: boolean;
  overallBand: string;
  setActiveTab: (tab: string) => void;
  setSelectedApplicationId: (id: string | null) => void;
}) {
  return (
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
              ? 'Verification Pending • Audit →'
              : comprehensiveAuditMetrics.score >= 70
              ? 'Benchmark Met • Audit →'
              : 'Consultant Advised • Audit →'}
          </span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#00a896]/10 text-[#00a896] flex items-center justify-center font-bold shrink-0">
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
            {documentsCount}
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
        <div className="w-12 h-12 rounded-2xl bg-[#00a896]/10 text-[#00a896] flex items-center justify-center font-bold shrink-0">
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
  );
}
