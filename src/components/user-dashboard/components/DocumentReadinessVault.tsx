import React from "react";
import { ChevronRight, Lock, KeyRound, FileText, Upload } from "lucide-react";

export function DocumentReadinessVault({
  hasVaultPassword,
  isVaultUnlocked,
  documents,
  setActiveTab
}: {
  hasVaultPassword: boolean | null;
  isVaultUnlocked: boolean;
  documents: any[];
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-150 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-950">Document Readiness Vault</h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Manage your passport scans, scorecards, and visa applications</p>
        </div>
        <button onClick={() => setActiveTab("scanned-documents")} className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer">
          View Vault <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {hasVaultPassword && !isVaultUnlocked ? (
        <div className="p-7 text-center bg-slate-50/70 rounded-2xl border border-slate-100 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-950">Document Vault Protected</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">Your immigration files are encrypted and locked. Enter your secret password in the Document Vault to view or upload documents.</p>
          <button onClick={() => setActiveTab("scanned-documents")} className="bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <KeyRound className="w-3.5 h-3.5 text-white" /> Unlock Vault
          </button>
        </div>
      ) : documents.length === 0 ? (
        <div className="p-8 text-center bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 space-y-3">
          <FileText className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-950">No Documents Uploaded Yet</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload your Passport copy, IELTS scorecard, or SOP to share with verified consultants.</p>
          <button onClick={() => setActiveTab("scanned-documents")} className="bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Upload Document
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.slice(0, 5).map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/70 rounded-2xl border border-slate-100 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-slate-900 truncate">{doc.label || doc.title}</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">Uploaded</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
