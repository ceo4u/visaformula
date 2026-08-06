import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { AuthModalPortalContent } from "./AuthModalPortal";

export function SignupFlowPortal() {
    const [mode, setMode] = useState<"selection" | "seeker" | "expert">("selection");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const roleParam = urlParams.get("role");
            if (roleParam === "seeker") {
                setMode("seeker");
            } else if (roleParam === "expert") {
                window.location.href = "/signup/expert";
            }
        }
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sora overflow-y-auto no-scrollbar selection:bg-[#00a896] selection:text-white">
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center my-auto py-4 font-sora">
                
                {/* Top Navigation Header */}
                <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-1 shrink-0 gap-2 font-sora">
                    <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white transition-colors bg-white/15 px-3.5 py-1.5 rounded-full border border-white/25 backdrop-blur-md shadow-sm shrink-0">
                        <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to </span>Home
                    </a>
                    <a href="/" className="shrink-0">
                        <img src="/logo-white.png" alt="VisaFormula" className="h-7 sm:h-9 w-auto object-contain max-w-[120px] sm:max-w-none" />
                    </a>
                </div>

                {/* ========================================================================= */}
                {/* VIEW 1: ROLE SELECTION MODAL ("I want to join as") - Unified Sora Font */}
                {/* ========================================================================= */}
                {mode === "selection" ? (
                    <div className="text-slate-900 max-w-2xl w-[94vw] sm:w-full p-6 sm:p-9 text-center space-y-6 sm:space-y-8 animate-fade-up relative my-auto bg-white border border-slate-200/90 rounded-[32px] shadow-2xl font-sora">
                        
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#f0fdfa] border border-[#ccfbf1] rounded-full px-4 py-1.5 shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-[#00a896]" />
                            <span className="text-xs font-bold text-[#00a896] tracking-wide">Join 50,000+ users</span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-1.5">
                            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                I want to join as
                            </h1>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Select your role to get started with VisaFormula
                            </p>
                        </div>

                        {/* Two Role Choice Cards */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-2">
                            
                            {/* Seeker Option */}
                            <div 
                                onClick={() => setMode("seeker")}
                                className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto bg-[#f0fdfa]/60 hover:bg-[#f0fdfa] p-6 rounded-2xl border border-teal-100 hover:border-[#00a896] hover:shadow-xl transition-all font-sora"
                            >
                                <div className="relative circle-float-1">
                                    <div className="absolute inset-[-6px] rounded-full border-2 border-[#00a896]/30 pulse-ring" />
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00a896] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 relative z-10 mx-auto">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-12 sm:h-12">
                                            <circle cx="12" cy="8" r="3.5" fill="#ffffff" opacity="0.3" />
                                            <circle cx="12" cy="8" r="3.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                            <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                            <path d="M16 4l1.5 1.5L16 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.5 5.5H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="mt-4 font-bold text-slate-900 text-lg group-hover:text-[#00a896] transition-colors">
                                    Visa Seeker
                                </span>
                                <span className="text-xs text-slate-500 max-w-[200px] mt-1 mb-4 font-medium leading-relaxed">
                                    Find, consult &amp; book immigration experts
                                </span>
                                <button className="w-full sm:w-auto bg-[#00a896] hover:bg-[#008f80] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                                    Register as Seeker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="flex flex-row sm:flex-col items-center gap-2 text-slate-400 font-bold text-xs tracking-widest font-sora">
                                <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-200" />
                                <span>OR</span>
                                <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-200" />
                            </div>

                            {/* Expert Option */}
                            <a 
                                href="/signup/expert"
                                className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto bg-slate-50 hover:bg-slate-100/80 p-6 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all font-sora"
                            >
                                <div className="relative circle-float-2">
                                    <div className="absolute inset-[-6px] rounded-full border-2 border-slate-300 pulse-ring" />
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0c1a2e] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 relative z-10 mx-auto">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-12 sm:h-12">
                                            <rect x="5" y="2" width="14" height="20" rx="3" fill="#ffffff" opacity="0.2" />
                                            <rect x="5" y="2" width="14" height="20" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
                                            <circle cx="12" cy="10" r="2.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                            <path d="M8.5 16c0-1.5 1.6-2.8 3.5-2.8s3.5 1.3 3.5 2.8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                            <circle cx="16" cy="5" r="0.9" fill="#ffffff" />
                                            <circle cx="16" cy="7.5" r="0.9" fill="#ffffff" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="mt-4 font-bold text-slate-900 text-lg group-hover:text-[#0c1a2e] transition-colors">
                                    Visa Expert
                                </span>
                                <span className="text-xs text-slate-500 max-w-[200px] mt-1 mb-4 font-medium leading-relaxed">
                                    Grow your global client consulting practice
                                </span>
                                <button className="w-full sm:w-auto bg-[#0c1a2e] hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                                    Register as Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>

                        </div>

                        <div className="text-xs font-medium text-slate-500 pt-4 border-t border-slate-100 font-sora">
                            Already a member? <a href="/login" className="text-[#00a896] font-bold hover:underline">Log in</a>
                        </div>
                    </div>
                ) : (
                    /* ========================================================================= */
                    /* VIEW 2: SEEKER REGISTRATION MODAL FORM */
                    /* ========================================================================= */
                    <div className="w-full flex flex-col items-center font-sora">
                        <button 
                            onClick={() => setMode("selection")} 
                            className="mb-3 text-xs font-bold text-white/90 hover:text-white flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-full backdrop-blur-md cursor-pointer border border-white/25 shadow-sm font-sora"
                        >
                            &larr; Change Account Role
                        </button>
                        <AuthModalPortalContent defaultTab="signup" />
                    </div>
                )}

            </div>
        </div>
    );
}
