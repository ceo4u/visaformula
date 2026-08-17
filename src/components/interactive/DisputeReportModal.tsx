import React, { useState, useEffect } from "react";
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Send, 
  FileText, 
  RefreshCw,
  Lock
} from "lucide-react";

export interface DisputeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType?: "provider" | "lead" | "transaction" | "profile" | "other";
  targetId?: string | number;
  targetName?: string;
  onSuccess?: () => void;
}

const REPORT_REASONS = [
  "Spam Lead",
  "Fake Profile",
  "Payment Issue",
  "Misleading Information",
  "Other"
];

export function DisputeReportModal({
  isOpen,
  onClose,
  targetType = "provider",
  targetId = "",
  targetName = "Advisor",
  onSuccess
}: DisputeReportModalProps) {
  const [reason, setReason] = useState<string>("Misleading Information");
  const [description, setDescription] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [reporterRole, setReporterRole] = useState("seeker");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    // Auto-fill logged in user info if available
    try {
      const userStr = localStorage.getItem("visaformula_user") || localStorage.getItem("travltik_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u.name) setReporterName(u.name);
        if (u.email) setReporterEmail(u.email);
        if (u.role) setReporterRole(u.role);
      }
    } catch (e) {}

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!reporterEmail.trim() || !description.trim()) {
      setErrorMsg("Please provide your email address and detailed explanation of the issue.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporterEmail,
          reporterName,
          reporterRole,
          targetType,
          targetId: String(targetId),
          targetName,
          reason,
          description,
          evidenceUrl
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Report filed successfully.");
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        throw new Error(data.error || "Failed to submit report.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit dispute. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn font-sora">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-rose-700 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <ShieldAlert className="w-6 h-6 text-rose-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Report Dispute / Issue
              </h2>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                Target: <span className="font-bold underline">{targetName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-left">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Reason Selection */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Primary Reason for Report *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {REPORT_REASONS.map(r => {
                const isSelected = reason === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReason(r)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-rose-50 border-rose-500 text-rose-700 font-extrabold shadow-2xs" 
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected ? "● " : "○ "}{r}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Explanation */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Detailed Description of Incident / Concern *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Provide specific facts, transaction dates, communication logs, or misleading details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-rose-500 transition-colors resize-none"
            />
          </div>

          {/* Supporting Evidence Link */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Supporting Evidence / Screenshot URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/... or image link"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Reporter Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1">Your Email Address *</label>
              <input
                type="email"
                required
                placeholder="your-email@example.com"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Trust and Safety Notice */}
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-medium">
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Reports are investigated confidentially by TravlTik Trust & Safety compliance officers.</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Submitting Report...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Report to Compliance
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
