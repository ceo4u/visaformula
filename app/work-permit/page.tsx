"use client";
import { useState } from "react";
import Link from "next/link";
import { Briefcase, GraduationCap, Building2, Globe, FileText, Clock, ArrowRight, CheckCircle, Users } from "lucide-react";

const permits = [
    { id: "pgwp", title: "PGWP Canada", subtitle: "Post-Graduate Work Permit", desc: "Work in Canada for up to 3 years after completing a Canadian study program. Pathway to PR.", icon: GraduationCap, country: "🇨🇦", duration: "Up to 3 years", color: "from-red-500 to-red-600" },
    { id: "opt", title: "OPT / CPT USA", subtitle: "Optional & Curricular Training", desc: "12-month work authorization for F-1 students. STEM OPT extends to 36 months.", icon: Briefcase, country: "🇺🇸", duration: "12-36 months", color: "from-blue-500 to-blue-600" },
    { id: "lmia", title: "LMIA Canada", subtitle: "Labour Market Impact Assessment", desc: "Employer-sponsored work permit. Employer proves no Canadian worker available.", icon: Building2, country: "🇨🇦", duration: "2 years", color: "from-red-500 to-red-600" },
    { id: "tier2", title: "Tier-2 UK", subtitle: "Skilled Worker Visa", desc: "Sponsor-backed visa for skilled professionals. Requires Certificate of Sponsorship.", icon: FileText, country: "🇬🇧", duration: "Up to 5 years", color: "from-indigo-500 to-indigo-600" },
    { id: "jobseeker", title: "Job Seeker Visa", subtitle: "Germany Opportunity Card", desc: "6-18 month visa to find employment in Germany. Points-based assessment.", icon: Globe, country: "🇩🇪", duration: "6-18 months", color: "from-amber-500 to-amber-600" },
    { id: "student-work", title: "Part-Time Student Work", subtitle: "Work While Studying", desc: "20 hrs/week during term across most countries. Full-time during breaks.", icon: Clock, country: "🌍", duration: "During study", color: "from-emerald-500 to-emerald-600" },
];

const countryRules = [
    { country: "Canada", flag: "🇨🇦", rules: ["20 hrs/week off-campus during term", "Full-time during scheduled breaks", "PGWP after graduation (up to 3 yrs)", "Co-op work permits available"] },
    { country: "USA", flag: "🇺🇸", rules: ["On-campus only during study", "CPT for curriculum-related work", "OPT: 12 months post-graduation", "STEM OPT: 36 months total"] },
    { country: "UK", flag: "🇬🇧", rules: ["20 hrs/week during term", "Full-time during vacation", "Graduate Route: 2 years post-study", "Tier-2 sponsorship for long-term"] },
    { country: "Australia", flag: "🇦🇺", rules: ["48 hrs/fortnight during term", "Unlimited during vacation", "Post-Study Work Visa: 2-6 years", "Regional areas: extra benefits"] },
];

const situations = ["Student → Work Auth", "New Work Permit", "Extension", "Employer Sponsorship", "LMIA", "Part-time Student Work"];

export default function WorkPermitPage() {
    const [activeSituation, setActiveSituation] = useState(situations[0]);

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <Briefcase className="w-4 h-4" /> Work Permit & Authorization Hub
                    </div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">Navigate Work Permits<br />with Confidence</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Understand your work authorization options across 190+ countries. Find the right permit, know the rules, book an expert.</p>
                </div>
            </section>

            {/* Situation Chips */}
            <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl shadow-card border border-sky-100 p-4 flex flex-wrap gap-2 justify-center">
                    {situations.map(s => (
                        <button key={s} onClick={() => setActiveSituation(s)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeSituation === s ? "bg-emerald-500 text-white shadow-sm" : "bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200"}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </section>

            {/* 6 Permit Cards */}
            <section className="max-w-6xl mx-auto px-4 py-14">
                <h2 className="font-sora text-2xl font-bold text-navy mb-8">Work Permit Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {permits.map((p, i) => (
                        <div key={p.id} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all group cursor-pointer" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-sm`}>
                                    <p.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl">{p.country}</span>
                            </div>
                            <h3 className="font-sora font-bold text-lg text-navy mb-1 group-hover:text-[#0ea5e9] transition-colors">{p.title}</h3>
                            <p className="text-xs text-[#0ea5e9] font-semibold mb-2">{p.subtitle}</p>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.desc}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-xs font-semibold text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {p.duration}</span>
                                <span className="text-sm font-bold text-[#0ea5e9] flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight className="w-4 h-4" /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Country Rules */}
            <section className="bg-white border-y border-gray-200 py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="font-sora text-2xl font-bold text-navy mb-8">Work Rules by Country</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {countryRules.map(cr => (
                            <div key={cr.country} className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5">
                                <div className="text-3xl mb-2">{cr.flag}</div>
                                <h3 className="font-sora font-bold text-navy mb-3">{cr.country}</h3>
                                <ul className="space-y-2">
                                    {cr.rules.map((r, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-4 py-14 text-center">
                <h2 className="font-sora text-2xl font-bold text-navy mb-4">Ready to get your work permit?</h2>
                <p className="text-gray-500 mb-8 max-w-lg mx-auto">Connect with verified immigration experts who specialize in work permits and authorizations.</p>
                <Link href="/find-lawyer?filter=work-permit">
                    <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-sky-200 transition-all inline-flex items-center gap-2">
                        <Users className="w-5 h-5" /> Find Work Permit Experts <ArrowRight className="w-5 h-5" />
                    </button>
                </Link>
            </section>
        </div>
    );
}
