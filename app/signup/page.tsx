"use client";

import Link from "next/link";
import { ArrowRight, Shield, Star, CheckCircle, Sparkles } from "lucide-react";

export default function SignupChoicePage() {
    return (
        <div className="min-h-screen bg-[#f0f4f8] flex flex-col">
            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-14">
                {/* Heading */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-1.5 mb-5">
                        <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
                        <span className="text-xs font-bold text-sky-700">Join 50,000+ users on Visara</span>
                    </div>
                    <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy mb-2 leading-tight">
                        Choose your <span className="text-[#0ea5e9]">role</span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">Select how you want to use Visara</p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl w-full">

                    {/* Seeker Card */}
                    <Link href="/signup/seeker" className="group block">
                        <div className="bg-white border-2 border-sky-100 rounded-2xl sm:rounded-3xl p-6 sm:p-7 hover:border-[#0ea5e9] hover:shadow-xl hover:shadow-sky-100 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ring-4 ring-sky-50 shadow-md shadow-sky-100">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="8" r="4" fill="#0ea5e9" opacity="0.2" />
                                    <circle cx="12" cy="8" r="4" stroke="#0ea5e9" strokeWidth="1.8" fill="none" />
                                    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                                    <path d="M15 3l2 2-2 2" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17 5h-3" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className="font-sora text-xl font-bold text-navy mb-1">I&apos;m a Visa Seeker</h2>
                            <p className="text-gray-400 text-sm mb-5 leading-relaxed">Find experts & track your immigration journey</p>

                            <div className="space-y-2.5 mb-6">
                                {["Browse verified experts", "Escrow-safe payments", "IELTS & training resources"].map(f => (
                                    <div key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-sky-200 transition-all active:scale-[0.97]">
                                Register as Seeker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-center text-xs text-gray-400 mt-2">Free · No credit card needed</p>
                        </div>
                    </Link>

                    {/* Expert Card */}
                    <Link href="/register-provider" className="group block">
                        <div className="bg-white border-2 border-sky-100 rounded-2xl sm:rounded-3xl p-6 sm:p-7 hover:border-[#6366f1] hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ring-4 ring-violet-50 shadow-md shadow-violet-100">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="3" width="16" height="18" rx="3" fill="#6366f1" opacity="0.15" />
                                    <rect x="4" y="3" width="16" height="18" rx="3" stroke="#6366f1" strokeWidth="1.8" fill="none" />
                                    <circle cx="12" cy="10" r="2.5" stroke="#6366f1" strokeWidth="1.5" fill="none" />
                                    <path d="M8 16c0-1.7 1.8-3 4-3s4 1.3 4 3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                    <path d="M15 5h2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M15 7.5h2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className="font-sora text-xl font-bold text-navy mb-1">I&apos;m an Expert</h2>
                            <p className="text-gray-400 text-sm mb-5 leading-relaxed">Grow your practice & get paid securely</p>

                            <div className="space-y-2.5 mb-6">
                                {["Reach visa seekers", "Guaranteed escrow payouts", "Kanban client pipeline"].map(f => (
                                    <div key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-[#6366f1] shrink-0" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-violet-200 transition-all active:scale-[0.97]">
                                Register as Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-center text-xs text-gray-400 mt-2">KYC verified · Approval in 24h</p>
                        </div>
                    </Link>
                </div>

                {/* Trust Strip */}
                <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 mt-8">
                    {[
                        { icon: Shield, text: "Escrow protected", color: "text-[#0ea5e9]" },
                        { icon: Star, text: "4.9★ average", color: "text-amber-500" },
                        { icon: CheckCircle, text: "KYC verified", color: "text-emerald-500" },
                    ].map(t => (
                        <span key={t.text} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                            <t.icon className={`w-3.5 h-3.5 ${t.color}`} /> {t.text}
                        </span>
                    ))}
                </div>
            </main>
        </div>
    );
}
