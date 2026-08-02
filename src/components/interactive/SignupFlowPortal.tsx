import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, User, Briefcase, X } from "lucide-react";
import { AuthModalPortalContent } from "./AuthModalPortal";

interface SignupFlowPortalProps {
    initialMode?: "selection" | "seeker";
}

export function SignupFlowPortal({ initialMode = "selection" }: SignupFlowPortalProps) {
    const [mode, setMode] = useState<"selection" | "seeker">(initialMode);

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto no-scrollbar">
            
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
            <div className="w-full max-w-xl flex items-center justify-between mb-3 px-2 shrink-0">
                <a href="/" className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition-colors bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </a>
                <a href="/">
                    <img src="/logo-white.png" alt="VisaFormula" className="h-10 sm:h-12 w-auto object-contain" />
                </a>
            </div>

            {/* ========================================================================= */}
            {/* VIEW 1: ROLE SELECTION MODAL ("I want to join as") */}
            {/* ========================================================================= */}
            {mode === "selection" ? (
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/15 text-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-10 text-center space-y-8 animate-fade-up relative my-auto max-h-[85vh] overflow-y-auto no-scrollbar">
                    
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs font-bold text-white">Join 50,000+ users</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                            I want to join as
                        </h1>
                        <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 drop-shadow-xs">
                            Select your role to get started with VisaFormula
                        </p>
                    </div>

                    {/* Two Role Choice Circles */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 py-2">
                        
                        {/* Seeker Option */}
                        <div 
                            onClick={() => setMode("seeker")}
                            className="group flex flex-col items-center text-center cursor-pointer"
                        >
                            <div className="relative circle-float-1">
                                <div className="absolute inset-[-6px] rounded-full border-2 border-blue-400/40 pulse-ring" />
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:shadow-2xl group-hover:bg-white/20 group-hover:border-blue-400 transition-all duration-300 relative z-10">
                                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="sm:w-12 sm:h-12">
                                        <circle cx="12" cy="8" r="3.5" fill="#3b82f6" opacity="0.3" />
                                        <circle cx="12" cy="8" r="3.5" stroke="#ffffff" strokeWidth="2" fill="none" />
                                        <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M16 4l1.5 1.5L16 7" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 5.5H15" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <span className="mt-4 font-bold text-white text-base group-hover:text-blue-400 transition-colors drop-shadow-xs">
                                Visa Seeker
                            </span>
                            <span className="text-xs text-slate-200 max-w-[170px] mt-0.5 mb-3 font-semibold drop-shadow-xs">
                                Find, consult & book immigration experts
                            </span>
                            <button className="bg-[#2563eb] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-[0.97] cursor-pointer">
                                Register as Seeker <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex flex-row sm:flex-col items-center gap-2 text-slate-300 font-extrabold text-xs tracking-widest">
                            <div className="w-10 sm:w-px h-px sm:h-8 bg-white/20" />
                            <span className="text-slate-300">OR</span>
                            <div className="w-10 sm:w-px h-px sm:h-8 bg-white/20" />
                        </div>

                        {/* Expert Option */}
                        <a 
                            href="/signup/expert"
                            className="group flex flex-col items-center text-center cursor-pointer"
                        >
                            <div className="relative circle-float-2">
                                <div className="absolute inset-[-6px] rounded-full border-2 border-white/20 pulse-ring" />
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:shadow-2xl group-hover:bg-white/20 group-hover:border-white transition-all duration-300 relative z-10">
                                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="sm:w-12 sm:h-12">
                                        <rect x="5" y="2" width="14" height="20" rx="3" fill="#ffffff" opacity="0.2" />
                                        <rect x="5" y="2" width="14" height="20" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
                                        <circle cx="12" cy="10" r="2.5" stroke="#ffffff" strokeWidth="1.8" fill="none" />
                                        <path d="M8.5 16c0-1.5 1.6-2.8 3.5-2.8s3.5 1.3 3.5 2.8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                                        <circle cx="16" cy="5" r="0.8" fill="#ffffff" />
                                        <circle cx="16" cy="7.5" r="0.8" fill="#ffffff" />
                                    </svg>
                                </div>
                            </div>
                            <span className="mt-4 font-bold text-white text-base group-hover:text-slate-200 transition-colors drop-shadow-xs">
                                Visa Expert
                            </span>
                            <span className="text-xs text-slate-200 max-w-[170px] mt-0.5 mb-3 font-semibold drop-shadow-xs">
                                Grow your global client consulting practice
                            </span>
                            <button className="bg-white hover:bg-slate-100 text-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-[0.97] cursor-pointer">
                                Register as Expert <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </a>

                    </div>

                    <div className="text-xs font-medium text-slate-200 pt-3 border-t border-white/15">
                        Already a member? <a href="/login" className="text-blue-300 font-bold hover:underline">Log in</a>
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
