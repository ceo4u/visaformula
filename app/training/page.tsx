"use client";

import Link from "next/link";
import { BookOpen, Languages, Wallet, ArrowRight, Star, MapPin, Users, CheckCircle2, Award, GraduationCap } from "lucide-react";

const trainingCategories = [
    {
        title: "IELTS Preparation",
        desc: "Prepare for IELTS, TOEFL, or PTE with top-rated coaches. Access standard practice guides, structured mock exams, and score builders.",
        href: "/training/ielts",
        icon: BookOpen,
        circleBg: "bg-purple-600",
        textColor: "text-purple-600",
        iconColor: "text-white"
    },
    {
        title: "Language Training",
        desc: "Learn French, German, Spanish, or Arabic required for immigration points or university admissions. Guided interactive courses.",
        href: "/training/language",
        icon: Languages,
        circleBg: "bg-[#0c1a2e]",
        textColor: "text-[#0c1a2e]",
        iconColor: "text-white"
    },
    {
        title: "Finance & Loans",
        desc: "Secure education loans, GIC accounts, blocked accounts, and professional financial planning advice for international travel.",
        href: "/training/financial",
        icon: Wallet,
        circleBg: "bg-purple-600",
        textColor: "text-purple-600",
        iconColor: "text-white"
    }
];

const featuredInstitutes = [
    { name: "IELTS Academy Pro", city: "Mumbai", rating: 4.9, students: "2.5K+", type: "IELTS", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" },
    { name: "Alliance Française", city: "Delhi", rating: 4.8, students: "1.8K+", type: "French", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
    { name: "Goethe-Institut", city: "Bangalore", rating: 4.7, students: "1.2K+", type: "German", image: "https://images.unsplash.com/photo-1577036421869-7c8d388d2123?w=400&h=300&fit=crop" },
    { name: "FinVisa Advisors", city: "Pune", rating: 4.8, students: "900+", type: "Finance", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
];

export default function TrainingHubPage() {
    return (
        <div className="bg-[#f7fbff] min-h-screen pb-24">
            
            {/* ────── LUXURIOUS PURPLE HERO SECTION ────── */}
            <section className="relative text-white py-36 px-4 overflow-hidden border-b border-purple-950">
                {/* Full-bleed background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1800&h=900&fit=crop&q=90"
                        alt="Luxurious study"
                        className="w-full h-full object-cover"
                    />
                    {/* Deep purple/navy overlay matching the services page structure */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4c1d95]/90 via-[#5b21b6]/80 to-[#0c1a2e]/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(167,139,250,0.25),transparent_60%)]" />
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="font-sora text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                        Training & Preparation
                    </h1>
                    <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Coaching, language training, and financial planning designed to secure your international success.
                    </p>
                </div>
            </section>

            {/* ────── OVERLAPPING CIRCULAR SERVICES ────── */}
            <section className="max-w-5xl mx-auto px-4 -mt-20 relative z-20 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {trainingCategories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <Link href={cat.href} key={idx} className="group">
                                <div className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {/* Large overlapping circle with border */}
                                    <div className={`w-24 h-24 rounded-full border-4 border-white shadow-md ${cat.circleBg} flex items-center justify-center ${cat.iconColor} group-hover:scale-105 transition-transform duration-300 -mt-16`}>
                                        <Icon className="w-9 h-9" />
                                    </div>

                                    {/* Service Description below circle */}
                                    <h3 className={`font-sora font-extrabold text-base text-center mt-5 transition-colors ${cat.textColor} group-hover:text-purple-500`}>
                                        {cat.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium text-center leading-relaxed mt-2 max-w-xs mx-auto px-1">
                                        {cat.desc}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ────── STUDY ABROAD STATS SECTION ────── */}
            <section className="max-w-5xl mx-auto px-4 py-8 mb-8">
                <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-around gap-6 text-center">
                    <div>
                        <div className="font-sora font-extrabold text-purple-600 text-3xl">98%</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">IELTS Pass Rate</div>
                    </div>
                    <div className="w-px bg-sky-100 hidden md:block" />
                    <div>
                        <div className="font-sora font-extrabold text-navy text-3xl">4.9 ★</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Average Rating</div>
                    </div>
                    <div className="w-px bg-sky-100 hidden md:block" />
                    <div>
                        <div className="font-sora font-extrabold text-purple-600 text-3xl">15K+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Students Prepared</div>
                    </div>
                    <div className="w-px bg-sky-100 hidden md:block" />
                    <div>
                        <div className="font-sora font-extrabold text-emerald-600 text-3xl">₹1.2 Cr+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Loans Sanctioned</div>
                    </div>
                </div>
            </section>

            {/* ────── VALUE PROPS SECTION ────── */}
            <section className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block mb-1">Global Standard</span>
                        <h2 className="font-sora font-bold text-navy text-2xl mb-4 leading-tight">Everything You Need Before You Board the Flight</h2>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6">Preparing for study, work, or resettlement abroad requires more than just submitting a visa form. Visara matches you with verified training centers to guarantee you ace all requirements early.</p>
                        
                        <div className="space-y-3">
                            <div className="flex gap-2 items-center text-xs font-semibold text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" /> Official training partnerships (British Council, IDP, Goethe)
                            </div>
                            <div className="flex gap-2 items-center text-xs font-semibold text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" /> Customized study kits and blocked account setups
                            </div>
                            <div className="flex gap-2 items-center text-xs font-semibold text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" /> Direct scholarship channels and bank-vetted loan providers
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-tr from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/25 rounded-full blur-xl" />
                        <h3 className="font-sora font-bold text-navy text-base mb-2">Planning for Canada, UK or Australia?</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">Most immigration programs require verified language competency (IELTS 6.5+ or French CLB 7). Connect with coaching centers to get tailored schedules, expert prep tips, and mock tests today.</p>
                        
                        <div className="flex justify-between items-center bg-white rounded-2xl p-4 border border-purple-100/50 shadow-sm">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-xs text-navy">IELTS Centers near you</div>
                                    <div className="text-[10px] text-gray-400">140+ verified options</div>
                                </div>
                            </div>
                            <Link href="/training/ielts">
                                <button className="bg-purple-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors shadow-sm flex items-center gap-1">
                                    Explore <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────── FEATURED TRAINING INSTITUTES ────── */}
            <section className="max-w-5xl mx-auto px-4 mt-16">
                <div className="text-center mb-10">
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block mb-1">Top Rated</span>
                    <h2 className="font-sora font-bold text-navy text-2xl">Featured Training Institutes</h2>
                    <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">Learn from certified instructors and access premium classroom setups.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredInstitutes.map((inst, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all group">
                            <div className="h-40 overflow-hidden relative">
                                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute top-3 left-3 text-[10px] font-bold text-purple-600 bg-white border border-purple-100 px-3 py-1 rounded-full shadow-sm">{inst.type}</span>
                            </div>
                            <div className="p-5">
                                <h3 className="font-sora font-bold text-navy text-sm mt-1 group-hover:text-purple-600 transition-colors">{inst.name}</h3>
                                <div className="flex items-center gap-2 mt-2.5 text-xs text-gray-500">
                                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-purple-500" /> {inst.city}</span>
                                    <span>·</span>
                                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {inst.rating}</span>
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-3 border-t border-sky-50">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">{inst.students} students trained</span>
                                    <div className="w-7 h-7 bg-slate-50 text-gray-400 group-hover:bg-[#0c1a2e] group-hover:text-white flex items-center justify-center rounded-lg transition-all shadow-inner">
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
