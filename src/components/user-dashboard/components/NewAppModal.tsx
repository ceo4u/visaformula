import React from "react";
import { X, ShieldCheck, AlertCircle } from "lucide-react";
import { ModernDashboardSelect } from "./ModernDashboardSelect";
import { dashboardDestinationOptions, dashboardPassportOptions, dashboardPurposeOptions } from "../utils/constants";

export function NewAppModal({
  show,
  onClose,
  onSubmit,
  newAppName,
  setNewAppName,
  newAppDest,
  setNewAppDest,
  newAppPass,
  setNewAppPass,
  newAppPurpose,
  setNewAppPurpose,
  selectedDestination,
  selectedPassport,
  selectedPurpose,
  visasProcessingCount
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newAppName: string;
  setNewAppName: (val: string) => void;
  newAppDest: string;
  setNewAppDest: (val: string) => void;
  newAppPass: string;
  setNewAppPass: (val: string) => void;
  newAppPurpose: string;
  setNewAppPurpose: (val: string) => void;
  selectedDestination: string;
  selectedPassport: string;
  selectedPurpose: string;
  visasProcessingCount: number;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xs text-lg font-black">
              ✈️
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">Start New Visa Application</h3>
              <p className="text-xs text-slate-500 font-medium">Create a new dossier with unique tracking ID &amp; custom name</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 pt-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Application Name / Custom Nickname
            </label>
            <input
              type="text"
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
              placeholder="e.g. Dubai Summer Vacation, Greece Tour 2026, UK Masters..."
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
            />
            <span className="text-[11px] text-slate-400 font-medium block">
              Give your application a memorable name so you can track multiple visas easily.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ModernDashboardSelect
              label="Destination Country"
              value={newAppDest || selectedDestination}
              onChange={(val) => setNewAppDest(val)}
              options={dashboardDestinationOptions}
              placeholder="Select Destination"
              allowCustom={true}
              customPlaceholder="e.g. Mauritius, Italy, Singapore..."
            />

            <ModernDashboardSelect
              label="Passport / Citizenship"
              value={newAppPass || selectedPassport}
              onChange={(val) => setNewAppPass(val)}
              options={dashboardPassportOptions}
              placeholder="Select Passport"
              allowCustom={true}
              customPlaceholder="e.g. India, Nepal, Canada..."
            />
          </div>

          <ModernDashboardSelect
            label="Visa Purpose / Category"
            value={newAppPurpose || selectedPurpose}
            onChange={(val) => setNewAppPurpose(val)}
            options={dashboardPurposeOptions}
            placeholder="Select Visa Category"
            allowCustom={false}
          />

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 space-y-1">
            <strong className="font-black flex items-center gap-1 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Consular Coverage &amp; Multi-Application Workspace
            </strong>
            <p className="text-[11px] leading-relaxed text-emerald-700">
              A unique official Tracking ID and Document Vault checklist will be assigned to this application without overwriting your other active visa cases.
            </p>
          </div>

          {visasProcessingCount >= 3 && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Maximum limit of 3 active visa applications reached. Please remove or complete an application before creating a new one.</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={visasProcessingCount >= 3}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs shadow-md transition-all ${
                visasProcessingCount >= 3
                  ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                  : "bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white cursor-pointer"
              }`}
            >
              {visasProcessingCount >= 3 ? "Application Limit Reached (3/3)" : `Create & Save Application (${visasProcessingCount}/3)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
