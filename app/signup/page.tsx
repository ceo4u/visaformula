"use client";

import Link from "next/link";
import { ArrowRight, Shield, Star, CheckCircle, Sparkles } from "lucide-react";

export default function SignupChoicePage() {
    return (
        <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4 py-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
                <span className="text-xs font-bold text-sky-700">Join 50,000+ users</span>
            </div>

            {/* Heading */}
            <h1 className="font-sora text-3xl sm:text-4xl font-extrabold text-navy mb-2 text-center">
                I want to <span className="text-[#0ea5e9]">join as</span>
            </h1>
            <p className="text-gray-400 text-sm mb-10 text-center">Select your role to get started</p>

            {/* Two Circles */}
            <div className="flex flex-row items-center justify-center gap-8 sm:gap-16 mb-10">
                {/* Seeker */}
                <Link href="/signup/seeker" className="group flex flex-col items-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-sky-100 to-white border-[3px] border-sky-200 flex items-center justify-center shadow-lg shadow-sky-100/60 group-hover:shadow-xl group-hover:shadow-sky-200 group-hover:scale-105 group-hover:border-[#0ea5e9] transition-all duration-300 cursor-pointer">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-14 sm:h-14">
                            <circle cx="12" cy="8" r="3.5" fill="#0ea5e9" opacity="0.2" />
                            <circle cx="12" cy="8" r="3.5" stroke="#0ea5e9" strokeWidth="1.8" fill="none" />
                            <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                            <path d="M16 4l1.5 1.5L16 7" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.5 5.5H15" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="mt-4 font-sora font-bold text-navy text-base sm:text-lg group-hover:text-[#0ea5e9] transition-colors">Visa Seeker</span>
                    <span className="text-xs text-gray-400 mt-0.5 mb-3">Find & book experts</span>
                    <span className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 group-hover:shadow-lg group-hover:shadow-sky-200 transition-all active:scale-[0.97]">
                        Register as Seeker <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </Link>

                {/* Divider */}
                <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-8 bg-gray-200" />
                    <span className="text-xs font-bold text-gray-300">OR</span>
                    <div className="w-px h-8 bg-gray-200" />
                </div>

                {/* Expert */}
                <Link href="/register-provider" className="group flex flex-col items-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-violet-100 to-white border-[3px] border-violet-200 flex items-center justify-center shadow-lg shadow-violet-100/60 group-hover:shadow-xl group-hover:shadow-violet-200 group-hover:scale-105 group-hover:border-[#6366f1] transition-all duration-300 cursor-pointer">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-14 sm:h-14">
                            <rect x="5" y="2" width="14" height="20" rx="3" fill="#6366f1" opacity="0.12" />
                            <rect x="5" y="2" width="14" height="20" rx="3" stroke="#6366f1" strokeWidth="1.8" fill="none" />
                            <circle cx="12" cy="10" r="2.5" stroke="#6366f1" strokeWidth="1.5" fill="none" />
                            <path d="M8.5 16c0-1.5 1.6-2.8 3.5-2.8s3.5 1.3 3.5 2.8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            <circle cx="16" cy="5" r="0.7" fill="#6366f1" />
                            <circle cx="16" cy="7.5" r="0.7" fill="#6366f1" />
                        </svg>
                    </div>
                    <span className="mt-4 font-sora font-bold text-navy text-base sm:text-lg group-hover:text-[#6366f1] transition-colors">Expert</span>
                    <span className="text-xs text-gray-400 mt-0.5 mb-3">Grow your practice</span>
                    <span className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 group-hover:shadow-lg group-hover:shadow-violet-200 transition-all active:scale-[0.97]">
                        Register as Expert <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </Link>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-5 text-[11px] font-semibold text-gray-400">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#0ea5e9]" /> Escrow protected</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> 4.9★ rated</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> KYC verified</span>
            </div>
        </div>
    );
}
