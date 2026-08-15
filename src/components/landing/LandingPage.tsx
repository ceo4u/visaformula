import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { DesktopHomeSection } from './DesktopHomeSection';
import { MobileHomeSection } from './MobileHomeSection';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in LandingPage section:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] flex items-center justify-center p-8 bg-white text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Loading Landing Page...</h2>
            <p className="text-sm text-gray-500">Refreshing components to display optimal view.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#00a896] text-white rounded-xl text-xs font-bold shadow hover:bg-[#008f80]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function LandingPage() {
  const [showLeadModal, setShowLeadModal] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [targetCountry, setTargetCountry] = React.useState("Canada");
  const [visaType, setVisaType] = React.useState("Student Visa");
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user is a consultant
    let isConsultant = false;
    try {
      const expertLoggedIn = localStorage.getItem("expert_isLoggedIn") === "true";
      const expertEmail = localStorage.getItem("expert_email");
      if (expertLoggedIn || expertEmail) isConsultant = true;
      const userStr = localStorage.getItem("visaformula_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u && (u.type === "expert" || u.role === "expert" || u.role === "consultant" || u.isExpert)) isConsultant = true;
      }
    } catch (e) {}

    const isDismissed = sessionStorage.getItem("hide_home_lead_modal") === "true";

    // Auto trigger popup after 2 seconds for Seekers/Visitors
    if (!isConsultant && !isDismissed) {
      const timer = setTimeout(() => {
        setShowLeadModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowLeadModal(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hide_home_lead_modal", "true");
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setLoading(true);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seekerName: fullName,
          seekerEmail: email || `${phone.replace(/\D/g, '')}@trawelliq.guest`,
          seekerPhone: phone,
          expertName: "Verified Top Expert",
          expertEmail: "support@trawelliq.com",
          visaCategory: `${targetCountry} - ${visaType}`,
          preferredDate: new Date().toISOString().split("T")[0],
          preferredTime: "11:00 AM",
          notes: `Homepage Lead Request for ${targetCountry} (${visaType})`
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="w-full bg-[#f3f4f6] text-black font-sans antialiased selection:bg-[#2563eb]/20 selection:text-[#2563eb]">
        {/* Desktop: shown on lg+ screens */}
        <div className="hidden lg:block">
          <DesktopHomeSection />
        </div>
        {/* Mobile: shown on screens smaller than lg */}
        <div className="block lg:hidden">
          <MobileHomeSection />
        </div>

        {/* ── HOMEPAGE AUTO CONSULTATION / EXPERT MATCHING POPUP MODAL ── */}
        {showLeadModal && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/45 animate-fadeIn font-sans"
            onClick={handleClose}
          >
            <div 
              className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-100 font-sans text-left" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button & Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00a896] animate-pulse"></span>
                  <span className="text-[11px] font-extrabold text-[#00a896] tracking-wider uppercase">
                    Step {step} of 3 • Quick Match
                  </span>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#00a896] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>

              {!submitted ? (
                <>
                  {/* STEP 1: Country Selection */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-snug">
                          Where do you want to travel? ✈️
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">Select your target destination to get started.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "Canada", flag: "🇨🇦" },
                          { name: "USA", flag: "🇺🇸" },
                          { name: "UK", flag: "🇬🇧" },
                          { name: "Australia", flag: "🇦🇺" },
                          { name: "Germany", flag: "🇩🇪" },
                          { name: "Schengen", flag: "🇪🇺" }
                        ].map(c => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => {
                              setTargetCountry(c.name);
                              setStep(2);
                            }}
                            className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 cursor-pointer hover:scale-[1.02] ${
                              targetCountry === c.name 
                                ? "border-[#00a896] bg-teal-50/60 font-extrabold text-slate-900 shadow-sm" 
                                : "border-slate-200 hover:border-[#00a896]/50 bg-slate-50/50 text-slate-700"
                            }`}
                          >
                            <span className="text-xl">{c.flag}</span>
                            <span className="text-xs font-bold">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Visa Purpose */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-snug">
                          What is your purpose for {targetCountry}? 🎯
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">Select your visa category for accurate guidance.</p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { title: "Student Visa", icon: "🎓", desc: "University, College & Course Admissions" },
                          { title: "Work Permit", icon: "💼", desc: "Job Offers, Employer Sponsorship & Work Visas" },
                          { title: "Tourist / Visit", icon: "🏝️", desc: "Holidays, Business Visits & Family Meetings" },
                          { title: "PR & Settlement", icon: "🏡", desc: "Express Entry, PR Pathways & Migration" }
                        ].map(v => (
                          <button
                            key={v.title}
                            type="button"
                            onClick={() => {
                              setVisaType(v.title);
                              setStep(3);
                            }}
                            className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer hover:scale-[1.01] ${
                              visaType === v.title 
                                ? "border-[#00a896] bg-teal-50/60 font-extrabold text-slate-900 shadow-sm" 
                                : "border-slate-200 hover:border-[#00a896]/50 bg-slate-50/50 text-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{v.icon}</span>
                              <div>
                                <div className="text-xs font-bold text-slate-900">{v.title}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{v.desc}</div>
                              </div>
                            </div>
                            <span className="text-slate-400 font-bold text-xs">→</span>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                      >
                        ← Back to Destination
                      </button>
                    </div>
                  )}

                  {/* STEP 3: Contact Info & Submit */}
                  {step === 3 && (
                    <form onSubmit={handleSubmitLead} className="space-y-4 animate-fadeIn">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-snug">
                          Get Matched with Top Experts 📞
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Selected: <span className="font-extrabold text-slate-800">{targetCountry} ({visaType})</span>
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Prashant Sharma"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          {loading ? "Submitting..." : "✨ Get Free Evaluation"}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="py-5 text-center space-y-3 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">Request Submitted! 🎉</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Our top verified {targetCountry} consultants have been notified and will reach out shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={`/find-experts?country=${encodeURIComponent(targetCountry)}`}
                      className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl transition-all"
                    >
                      Browse Verified {targetCountry} Experts Now →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
