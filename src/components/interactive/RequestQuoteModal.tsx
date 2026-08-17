import React, { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Globe2, 
  DollarSign, 
  Clock, 
  Sparkles,
  RefreshCw
} from "lucide-react";

export interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetExpertId?: number;
  targetExpertName?: string;
  targetExpertEmail?: string;
  defaultCountry?: string;
  defaultCategory?: string;
  onSuccess?: () => void;
}

export function RequestQuoteModal({
  isOpen,
  onClose,
  targetExpertId = 0,
  targetExpertName = "",
  targetExpertEmail = "",
  defaultCountry = "",
  defaultCategory = "",
  onSuccess
}: RequestQuoteModalProps) {
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry || "");
  const [visaCategory, setVisaCategory] = useState(defaultCategory || "");
  const [specificPathway, setSpecificPathway] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [preferredChannel, setPreferredChannel] = useState<"whatsapp" | "call" | "email">("whatsapp");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");

  const [seekerName, setSeekerName] = useState("");
  const [seekerEmail, setSeekerEmail] = useState("");
  const [seekerPhone, setSeekerPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    // Auto-fill logged in seeker credentials if available
    try {
      const userStr = localStorage.getItem("visaformula_user") || localStorage.getItem("travltik_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u.name) setSeekerName(u.name);
        if (u.email) setSeekerEmail(u.email);
        if (u.phone) setSeekerPhone(u.phone);
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

    if (!destinationCountry || !visaCategory || !message.trim() || !seekerEmail.trim()) {
      setErrorMsg("Please fill in all mandatory fields (Email, Destination, Visa Type, and Requirements).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seekerName,
          seekerEmail,
          seekerPhone,
          expertId: targetExpertId,
          expertName: targetExpertName,
          expertEmail: targetExpertEmail,
          destinationCountry,
          visaCategory,
          specificPathway,
          budgetRange,
          preferredChannel,
          preferredTime,
          message
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Quote requested successfully!");
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(data.error || "Failed to submit quote request.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn font-sora">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 relative">
        
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-[#481268] to-[#00a896] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Request a Custom Quote
              </h2>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                {targetExpertName 
                  ? `Get direct pricing & timeline from ${targetExpertName}` 
                  : "Receive competitive proposals from top-rated visa advisors."}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Form Content */}
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

          {/* Destination & Visa Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Destination Country *
              </label>
              <select
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="" disabled>Select Country</option>
                {["Canada", "USA", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore", "UAE", "Schengen (Europe)"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Visa Category *
              </label>
              <select
                value={visaCategory}
                onChange={(e) => setVisaCategory(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="" disabled>Select Visa Category</option>
                {["Work Permit / Employment", "Student Visa / Admissions", "PR & Immigration Pathways", "Tourist / Visitor Visa", "Business & Investor Visa", "Family Sponsorship"].map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Specific Pathway & Budget Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Specific Pathway (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Express Entry, LMIA, Tier 2, SDS"
                value={specificPathway}
                onChange={(e) => setSpecificPathway(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="" disabled>Select Budget Range</option>
                {["Under ₹50,000 (< $600)", "₹50,000 - ₹1.5 Lakhs ($600 - $1.8k)", "₹1.5 Lakhs - ₹3 Lakhs ($1.8k - $3.5k)", "₹3 Lakhs+ ($3.5k+)", "Flexible / Need Advice"].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Communication Channel & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Preferred Channel
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                  { id: "call", label: "Phone Call", icon: Phone },
                  { id: "email", label: "Email", icon: Mail }
                ].map(item => {
                  const Icon = item.icon;
                  const active = preferredChannel === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferredChannel(item.id as any)}
                      className={`py-2 px-1 rounded-xl text-[10px] font-extrabold border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        active 
                          ? "bg-teal-50 border-[#00a896] text-[#00a896]" 
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Preferred Contact Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors"
              >
                {["Anytime", "Morning (9 AM – 12 PM)", "Afternoon (12 PM – 4 PM)", "Evening (4 PM – 8 PM)", "Weekends Only"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Detailed Message */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Case Details & Requirements *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe your profile, timeline, current visa status, or any specific questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors resize-none"
            />
          </div>

          {/* Contact Information Fields */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Your Contact Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={seekerName}
                  onChange={(e) => setSeekerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={seekerEmail}
                  onChange={(e) => setSeekerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={seekerPhone}
                  onChange={(e) => setSeekerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex items-center justify-between gap-3">
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
              className="px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Submitting Quote Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Request & Get Quotes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
