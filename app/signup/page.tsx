"use client";

import Link from "next/link";
import { Globe, GraduationCap, Briefcase, ArrowRight, Shield, CheckCircle, Star, Award } from "lucide-react";

const seekerFeatures = [
    "Find verified immigration experts",
    "Escrow-protected payments",
    "Track your visa application",
    "Access IELTS & training resources",
    "Connect with universities & jobs",
];

const expertFeatures = [
    "Reach thousands of visa seekers",
    "Manage bookings & client pipeline",
    "Guaranteed escrow payments",
    "Build your verified profile",
    "In-house expert opportunities",
];

export default function SignupChoicePage() {
    return (
        <div className="bg-[#f0f4f8] min-h-screen flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-sky-100 py-4 px-6 flex justify-between items-center shadow-sm">
                <Link href="/" className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#0ea5e9]" />
                    <span className="text-xl font-extrabold tracking-tight text-navy">Visara</span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </Link>
                <span className="text-sm font-semibold text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#0ea5e9] font-bold hover:underline">
                        Log in
                    </Link>
                </span>
            </div>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center py-14 px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-navy mb-3 leading-tight">
                        Join <span className="text-[#0ea5e9]">Visara</span>
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
                        Tell us who you are — we'll tailor your experience from day one.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">

                    {/* Seeker Card */}
                    <Link href="/signup/seeker" className="group block">
                        <div className="bg-white rounded-3xl border-2 border-sky-100 p-8 shadow-sm group-hover:shadow-card-hover group-hover:border-[#0ea5e9] group-hover:-translate-y-1 transition-all h-full flex flex-col">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-2xl flex items-center justify-center mb-5 shadow-md shadow-sky-200 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">I&apos;m a Visa Seeker</h2>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Looking to study, work, or migrate abroad. Find experts, universities, and resources all in one place.
                            </p>
                            <ul className="space-y-3 mb-8 flex-1">
                                {seekerFeatures.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-200 group-hover:shadow-xl transition-all active:scale-[0.97]">
                                Register as Seeker <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-3 font-medium">Free · No credit card required</p>
                        </div>
                    </Link>

                    {/* Expert Card */}
                    <Link href="/signup/expert" className="group block">
                        <div className="bg-white rounded-3xl border-2 border-sky-100 p-8 shadow-sm group-hover:shadow-card-hover group-hover:border-navy group-hover:-translate-y-1 transition-all h-full flex flex-col">
                            <div className="w-16 h-16 bg-gradient-to-br from-navy to-ink rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">I&apos;m an Expert</h2>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Immigration lawyer, consultant, or education agent. Grow your practice and get paid securely.
                            </p>
                            <ul className="space-y-3 mb-8 flex-1">
                                {expertFeatures.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                                        <CheckCircle className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-gradient-to-r from-navy to-ink text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl transition-all active:scale-[0.97]">
                                Register as Expert <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-3 font-medium">KYC verification required · Takes 24h</p>
                        </div>
                    </Link>
                </div>

                {/* Trust bar */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs font-semibold text-gray-400">
                    <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#0ea5e9]" /> Bank-grade data security</span>
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9 / 5 average platform rating</span>
                    <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 50,000+ successful applicants</span>
                </div>
            </main>
        </div>
    );
}
