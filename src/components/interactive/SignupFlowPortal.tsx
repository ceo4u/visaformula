import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, User, Briefcase, X } from "lucide-react";
import { AuthModalPortalContent } from "./AuthModalPortal";

interface SignupFlowPortalProps {
    initialMode?: "selection" | "seeker";
}

export function SignupFlowPortal({ initialMode = "selection" }: SignupFlowPortalProps) {
    const [mode, setMode] = useState<"selection" | "seeker">(initialMode);

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto no-scrollbar">
            
            {/* Inline CSS Animations for Floating Circles & Pulsing Rings */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.08); opacity: 0.15; }
                    100% { transform: scale(1); opacity: 0.4; }
                }
                .circle-float-1 { animation: float 4s ease-in-out infinite; }
                .circle-float-2 { animation: float 4s ease-in-out infinite 0.5s; }
                .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
            `}} />

            {/* Top Navigation Header */}
            <div className="w-full max-w-2xl flex items-center justify-between mb-4 px-1 shrink-0 gap-2">
                <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700 shadow-md shrink-0">
                    <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to </span>Home
                </a>
                <a href="/" className="shrink-0">
                    <img src="/logo-white.png" alt="VisaFormula" className="h-7 sm:h-9 w-auto object-contain max-w-[120px] sm:max-w-none drop-shadow-md" />
                </a>
            </div>

            {/* ========================================================================= */}
            {/* VIEW 1: ROLE SELECTION MODAL ("I want to join as") */}
            {/* ========================================================================= */}
            {mode === "selection" ? (
                <div className="text-white max-w-2xl w-[94vw] sm:w-full p-6 sm:p-9 text-center space-y-6 sm:space-y-8 animate-fade-up relative my-auto bg-[#0c1a2e] border border-slate-800 rounded-3xl shadow-2xl">
                    
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#00a896]/15 border border-[#00a896]/30 rounded-full px-4 py-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-[#00a896]" />
                        <span className="text-xs font-bold text-[#00a896] tracking-wide">Join 50,000+ users</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                            I want to join as
                        </h1>
                        <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">
                            Select your role to get started with VisaFormula
                        </p>
                    </div>

                    {/* Two Role Choice Cards */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-2">
                        
                        {/* Seeker Option */}
                        <div 
                            onClick={() => setMode("seeker")}
                            className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto bg-slate-900/60 p-5 rounded-2xl border border-teal-500/30 hover:border-[#00a896] transition-all"
                        >
                            <div className="relative circle-float-1">
                                <div className="absolute inset-[-6px] rounded-full border-2 border-[#00a896]/40 pulse-ring" />
                                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-teal-950/80 border-2 border-[#00a896] flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-300 relative z-10 mx-auto">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-12 sm:h-12">
                                        <circle cx="12" cy="8" r="3.5" fill="#00a896" opacity="0.4" />
                                        <circle cx="12" cy="8" r="3.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                        <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M16 4l1.5 1.5L16 7" stroke="#00a896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 5.5H15" stroke="#00a896" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <span className="mt-4 font-extrabold text-white text-lg group-hover:text-[#00a896] transition-colors">
                                Visa Seeker
                            </span>
                            <span className="text-xs text-slate-300 max-w-[200px] mt-1 mb-4 font-medium leading-relaxed">
                                Find, consult &amp; book immigration experts
                            </span>
                            <button className="w-full sm:w-auto bg-[#00a896] hover:bg-[#009485] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                                Register as Seeker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex flex-row sm:flex-col items-center gap-2 text-slate-400 font-black text-xs tracking-widest">
                            <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-700" />
                            <span>OR</span>
                            <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-700" />
                        </div>

                        {/* Expert Option */}
                        <a 
                            href="/signup/expert"
                            className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto bg-slate-900/60 p-5 rounded-2xl border border-slate-700 hover:border-slate-400 transition-all"
                        >
                            <div className="relative circle-float-2">
                                <div className="absolute inset-[-6px] rounded-full border-2 border-slate-600/40 pulse-ring" />
                                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-300 relative z-10 mx-auto">
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
                            <span className="mt-4 font-extrabold text-white text-lg group-hover:text-slate-200 transition-colors">
                                Visa Expert
                            </span>
                            <span className="text-xs text-slate-300 max-w-[200px] mt-1 mb-4 font-medium leading-relaxed">
                                Grow your global client consulting practice
                            </span>
                            <button className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                                Register as Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>

                    </div>

                    <div className="text-xs font-semibold text-slate-300 pt-4 border-t border-slate-800">
                        Already a member? <a href="/login" className="text-[#00a896] font-extrabold hover:underline">Log in</a>
                    </div>
                </div>
            ) : (
                /* ========================================================================= */
                /* VIEW 2: SEEKER REGISTRATION MODAL FORM */
                /* ========================================================================= */
                <div className="w-full flex flex-col items-center">
                    <button 
                        onClick={() => setMode("selection")} 
                        className="mb-3 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full backdrop-blur-md cursor-pointer border border-slate-700"
                    >
                        &larr; Change Account Role
                    </button>
                    <AuthModalPortalContent defaultTab="signup" />
                </div>
            )}

        </div>
    );
}
