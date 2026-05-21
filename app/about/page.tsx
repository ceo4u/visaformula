"use client";

import { Award, Compass, Shield, Users, Sparkles, CheckCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-[#f7fbff] min-h-screen pb-20">
            {/* Elegant Radial Hero */}
            <div className="relative bg-gradient-to-br from-navy via-ink to-navy text-white pt-16 pb-12 px-4 overflow-hidden border-b border-sky-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-15%,rgba(14,165,233,0.18),transparent_60%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-sky-500/20 mb-4 inline-block">
                        ✨ About Visara
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight">
                        Your Trusted Partner for Global Journeys
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        We combine certified, KYC-verified experts, milestone escrow protection, and smart placement tools so you can focus 100% on your future abroad.
                    </p>
                </div>
            </div>

            {/* Stat Strip */}
            <div className="bg-white border-y border-sky-100 py-6">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="border-r border-sky-100 last:border-0">
                        <div className="font-sora font-extrabold text-sky-500 text-3xl">15k+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">Visa Approvals</div>
                    </div>
                    <div className="border-r border-sky-100 last:border-0">
                        <div className="font-sora font-extrabold text-sky-500 text-3xl">500+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">Verified Experts</div>
                    </div>
                    <div className="border-r border-sky-100 last:border-0">
                        <div className="font-sora font-extrabold text-sky-500 text-3xl">98%</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">Success Rate</div>
                    </div>
                    <div>
                        <div className="font-sora font-extrabold text-sky-500 text-3xl">50+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">Countries Covered</div>
                    </div>
                </div>
            </div>

            {/* Core Mission and Details */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-5 text-2xl shrink-0">
                            🎯
                        </div>
                        <h3 className="font-sora font-bold text-navy text-sm mb-3">Our Mission</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            To make international immigration and visa pathways transparent, accessible, and stress-free. We bridge the gap between visa seekers and verified service providers — from student visas to permanent residency, work permits to corporate holiday tours.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-5 text-2xl shrink-0">
                            ⚡
                        </div>
                        <h3 className="font-sora font-bold text-navy text-sm mb-3">Why Visara?</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            100% KYC verified experts, milestone escrow payments that protect your money, and multi-city search profiles that match your exact immigration requirements. We're not just a listing directory — we are your ultimate co-pilot.
                        </p>
                    </div>
                </div>

                {/* Leadership Section */}
                <div className="mb-6 text-center">
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block mb-1">Leadership</span>
                    <h2 className="font-sora font-bold text-navy text-xl">Built by Experts, for Global Citizens</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { name: "Priya Mehta", role: "CEO & Co-founder", avatar: "👩‍💼", bio: "Ex-immigration lawyer, 12+ years helping students and professionals migrate to 20+ countries." },
                        { name: "Rahul Sharma", role: "CTO", avatar: "👨‍💻", bio: "Product leader with a passion for building trust-first marketplaces. Leads tech & AI roadmap." },
                        { name: "Anjali Nair", role: "Head of Visa Strategy", avatar: "👩‍🎓", bio: "Former RCIC and study-abroad counselor, she makes complex visa rules simple." }
                    ].map(member => (
                        <div key={member.name} className="bg-white rounded-2xl border border-sky-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-[#0ea5e9] flex items-center justify-center mx-auto mb-4 text-3xl text-white">
                                {member.avatar}
                            </div>
                            <h4 className="font-sora font-bold text-navy text-sm">{member.name}</h4>
                            <div className="text-[10px] font-bold text-sky-500 uppercase mt-0.5 mb-2.5">{member.role}</div>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">{member.bio}</p>
                        </div>
                    ))}
                </div>

                {/* Trust Info Box */}
                <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
                    <div className="text-3xl shrink-0">🛡️</div>
                    <div>
                        <h4 className="font-sora font-bold text-navy text-xs sm:text-sm mb-1">Trust & Transparency First</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                            Every single expert on the Visara platform undergoes strict government-issued KYC, credential verification, and license checks. We hold all consulting payments in milestone escrow until you confirm successful delivery. Your future, fully protected.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
