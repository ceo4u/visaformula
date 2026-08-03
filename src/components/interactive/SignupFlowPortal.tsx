import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, User, Briefcase, X } from "lucide-react";
import { AuthModalPortalContent } from "./AuthModalPortal";

interface SignupFlowPortalProps {
    initialMode?: "selection" | "seeker";
}

export function SignupFlowPortal({ initialMode = "selection" }: SignupFlowPortalProps) {
    const [mode, setMode] = useState<"selection" | "seeker">(initialMode);

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-950/30 backdrop-blur-[2px] flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto no-scrollbar">
            
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
            <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-1 shrink-0 gap-2">
                <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white transition-colors bg-white/15 px-3 py-1.5 rounded-full border border-white/25 backdrop-blur-md shadow-md shrink-0">
                    <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to </span>Home
                </a>
                <a href="/" className="shrink-0">
                    <img src="/logo-white.png" alt="VisaFormula" className="h-7 sm:h-10 w-auto object-contain max-w-[120px] sm:max-w-none drop-shadow-md" />
                </a>
            </div>

            {/* ========================================================================= */}
            {/* VIEW 1: ROLE SELECTION MODAL ("I want to join as") */}
            {/* ========================================================================= */}
            {mode === "selection" ? (
                <div className="text-white max-w-2xl w-[94vw] sm:w-full p-2 sm:p-6 text-center space-y-6 sm:space-y-8 animate-fade-up relative my-auto max-h-[90vh] overflow-y-auto no-scrollbar">
                    
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                        <span className="text-xs font-bold text-white tracking-wide">Join 50,000+ users</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            I want to join as
                        </h1>
                        <p className="text-xs sm:text-base font-semibold text-white/90 mt-1.5 drop-shadow-md">
                            Select your role to get started with VisaFormula
                        </p>
                    </div>

                    {/* Two Role Choice Circles */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14 py-2">
                        
                        {/* Seeker Option */}
                        <div 
                            onClick={() => setMode("seeker")}
                            className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto"
                        >
                            <div className="relative circle-float-1">
                                <div className="absolute inset-[-8px] rounded-full border-2 border-blue-400/50 pulse-ring" />
                                <div className="w-24 h-24 sm:w-34 sm:h-34 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:bg-white/30 group-hover:border-blue-400 transition-all duration-300 relative z-10 mx-auto">
                                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-14 sm:h-14">
                                        <circle cx="12" cy="8" r="3.5" fill="#3b82f6" opacity="0.4" />
                                        <circle cx="12" cy="8" r="3.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                        <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M16 4l1.5 1.5L16 7" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 5.5H15" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <span className="mt-4 font-extrabold text-white text-lg group-hover:text-blue-300 transition-colors drop-shadow-lg">
                                Visa Seeker
                            </span>
                            <span className="text-xs sm:text-sm text-white/90 max-w-[210px] mt-1 mb-3 font-semibold drop-shadow-md">
                                Find, consult & book immigration experts
                            </span>
                            <button className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer">
                                Register as Seeker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex flex-row sm:flex-col items-center gap-2 text-white/80 font-black text-xs tracking-widest drop-shadow-md">
                            <div className="w-12 sm:w-px h-px sm:h-10 bg-white/40 shadow-sm" />
                            <span className="text-white drop-shadow-md">OR</span>
                            <div className="w-12 sm:w-px h-px sm:h-10 bg-white/40 shadow-sm" />
                        </div>

                        {/* Expert Option */}
                        <a 
                            href="/signup/expert"
                            className="group flex flex-col items-center text-center cursor-pointer w-full sm:w-auto"
                        >
                            <div className="relative circle-float-2">
                                <div className="absolute inset-[-8px] rounded-full border-2 border-white/30 pulse-ring" />
                                <div className="w-24 h-24 sm:w-34 sm:h-34 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:bg-white/30 group-hover:border-white transition-all duration-300 relative z-10 mx-auto">
                                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-14 sm:h-14">
                                        <rect x="5" y="2" width="14" height="20" rx="3" fill="#ffffff" opacity="0.3" />
                                        <rect x="5" y="2" width="14" height="20" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
                                        <circle cx="12" cy="10" r="2.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                        <path d="M8.5 16c0-1.5 1.6-2.8 3.5-2.8s3.5 1.3 3.5 2.8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <circle cx="16" cy="5" r="0.9" fill="#ffffff" />
                                        <circle cx="16" cy="7.5" r="0.9" fill="#ffffff" />
                                    </svg>
                                </div>
                            </div>
                            <span className="mt-4 font-extrabold text-white text-lg group-hover:text-slate-200 transition-colors drop-shadow-lg">
                                Visa Expert
                            </span>
                            <span className="text-xs sm:text-sm text-white/90 max-w-[210px] mt-1 mb-3 font-semibold drop-shadow-md">
                                Grow your global client consulting practice
                            </span>
                            <button className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer">
                                Register as Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>

                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-white/90 pt-4 border-t border-white/20 drop-shadow-md">
                        Already a member? <a href="/login" className="text-blue-300 font-extrabold hover:underline">Log in</a>
                    </div>
                </div>
            ) : (
                /* ========================================================================= */
                /* VIEW 2: SEEKER REGISTRATION MODAL FORM */
                /* ========================================================================= */
                <div className="w-full flex flex-col items-center">
                    <button 
                        onClick={() => setMode("selection")} 
                        className="mb-3 text-xs font-bold text-white/90 hover:text-white flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md cursor-pointer border border-white/20"
                    >
                        &larr; Change Account Role
                    </button>
                    <AuthModalPortalContent defaultTab="signup" />
                </div>
            )}

        </div>
    );
}
