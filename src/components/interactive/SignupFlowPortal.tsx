import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, ArrowRight, X } from "lucide-react";
import { AuthModalPortalContent } from "./AuthModalPortal";
import { AuthProvider } from "../providers/auth-provider";

interface SignupFlowPortalProps {
    initialMode?: "selection" | "seeker" | "expert";
}

function SignupFlowPortalInner({ initialMode = "seeker" }: SignupFlowPortalProps) {
    const [mode, setMode] = useState<"selection" | "seeker" | "expert">(initialMode);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const roleParam = urlParams.get("role");
            if (roleParam === "seeker") {
                setMode("seeker");
            } else if (roleParam === "expert") {
                window.location.href = "/signup/expert";
            } else if (roleParam === "selection") {
                setMode("selection");
            } else if (initialMode) {
                setMode(initialMode);
            }
        }
    }, [initialMode]);

    return (
        <div 
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    window.location.href = "/";
                }
            }}
            className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto selection:bg-[#00a896] selection:text-white"
        >
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center my-auto py-4 font-sans">
                
                {/* Top Navigation Header */}
                <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-1 shrink-0 gap-2 font-sans">
                    <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-full border border-white/30 backdrop-blur-md shadow-md shrink-0">
                        <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to </span>Home
                    </a>
                    <a href="/" className="shrink-0">
                        <img src="/logo.png?v=8" alt="TravlTik Logo" className="h-6 sm:h-7 w-auto object-contain" />
                    </a>
                </div>

                {/* ========================================================================= */}
                {/* VIEW 1: ROLE SELECTION MODAL ("I want to join as") - Unified Sora Font */}
                {/* ========================================================================= */}
                {mode === "selection" ? (
                    <div className="text-slate-900 max-w-2xl w-[94vw] sm:w-full p-6 sm:p-9 text-center space-y-6 sm:space-y-8 animate-fade-up relative my-auto bg-white border border-slate-200/90 rounded-[32px] shadow-2xl font-sans max-h-[85vh] overflow-y-auto">
                        
                        {/* Top-Right X Close Button */}
                        <button 
                            onClick={() => window.location.href = "/"}
                            title="Close and return to homepage"
                            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-slate-200 z-30"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Site Logo */}
                        <div className="flex items-center justify-center pt-2 pb-1">
                            <img 
                                src="/logo.png?v=8" 
                                alt="TravlTik Logo" 
                                className="h-12 sm:h-14 md:h-16 max-h-[64px] w-auto object-contain transition-all duration-200" 
                            />
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-1.5">
                            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                I want to join as
                            </h1>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Select your role to get started with TravlTik
                            </p>
                        </div>

                        {/* Two Role Choice Cards */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-2">
                            
                            {/* Traveller Option (Vibrant Teal / Emerald Theme) */}
                            <div 
                                onClick={() => setMode("seeker")} 
                                className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto bg-teal-50/50 hover:bg-teal-50/90 p-6 rounded-2xl border border-teal-200/90 hover:border-[#00a896] hover:shadow-xl hover:shadow-teal-500/15 transition-all font-sans"
                            >
                                <div className="relative circle-float-1">
                                    <div className="absolute inset-[-6px] rounded-full border-2 border-teal-400/40 pulse-ring" />
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#00a896] to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-105 transition-all duration-300 relative z-10 mx-auto">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-12 sm:h-12">
                                            <circle cx="12" cy="8" r="3.5" fill="#ffffff" opacity="0.3" />
                                            <circle cx="12" cy="8" r="3.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                            <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                            <path d="M16 4l1.5 1.5L16 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.5 5.5H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#00a896] transition-colors">
                                    Traveller
                                </h2>
                                <span className="text-xs text-slate-500 max-w-[200px] mt-1 mb-4 font-medium leading-relaxed">
                                    Find visas, self apply &amp; book verified experts
                                </span>
                                <button className="w-full sm:w-auto bg-[#00a896] hover:bg-[#008f80] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                                    Register as Traveller <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="flex flex-row sm:flex-col items-center gap-2 text-slate-400 font-bold text-xs tracking-widest font-sans">
                                <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-200" />
                                <span>OR</span>
                                <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-200" />
                            </div>

                            {/* Service Provider Option */}
                            <a 
                                href="/signup/expert"
                                className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto bg-slate-50 hover:bg-slate-100/80 p-6 rounded-2xl border border-slate-200 hover:border-slate-800 hover:shadow-xl transition-all font-sans"
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
                                <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#0c1a2e] transition-colors">
                                    Service Provider
                                </h2>
                                <span className="text-xs text-slate-500 max-w-[200px] mt-1 mb-4 font-medium leading-relaxed">
                                    Grow your global client consulting practice
                                </span>
                                <button className="w-full sm:w-auto bg-[#0c1a2e] hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                                    Register as Service Provider <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>

                        </div>

                        <div className="text-xs font-medium text-slate-500 pt-4 border-t border-slate-100 font-sans">
                            Already a member? <a href="/login" className="text-[#00A86B] font-bold hover:underline">Log in</a>
                        </div>
                    </div>
                ) : (
                    /* ========================================================================= */
                    /* VIEW 2: SEEKER REGISTRATION MODAL FORM */
                    /* ========================================================================= */
                    <div className="w-full flex flex-col items-center font-sans">
                        <button 
                            onClick={() => setMode("selection")} 
                            className="mb-3 text-xs font-bold text-white/90 hover:text-white flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-full backdrop-blur-md cursor-pointer border border-white/25 shadow-sm font-sans"
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

export function SignupFlowPortal(props: SignupFlowPortalProps) {
    return (
        <AuthProvider>
            <SignupFlowPortalInner {...props} />
        </AuthProvider>
    );
}
