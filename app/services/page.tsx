"use client";

import Link from "next/link";
import { 
    Users, Compass, Globe, GraduationCap, 
    Briefcase, Shield, ArrowRight, Sparkles 
} from "lucide-react";

const coreServices = [
    {
        title: "Verified Immigration Experts",
        desc: "Consult directly with top-tier registered immigration attorneys, consultants, and legal counselors. Get answers to study, work, or permanent residency pathways in real time.",
        href: "/find-experts",
        badge: "Vetted Counsel",
        icon: Users,
        iconColor: "text-sky-500",
        bg: "bg-sky-50",
        borderColor: "group-hover:border-sky-200",
        btnColor: "bg-sky-500 hover:bg-sky-600",
        gradient: "from-sky-500 to-[#0284c7]"
    },
    {
        title: "Exclusive Tours & Packages",
        desc: "Explore Holiday Packages, major Sport Tours (FIFA, F1), Cruise voyages, and global Entertainment Events. Every tour package comes with fully verified, comprehensive visa processing support.",
        href: "/tours",
        badge: "All-Inclusive",
        icon: Compass,
        iconColor: "text-indigo-500",
        bg: "bg-indigo-50",
        borderColor: "group-hover:border-indigo-200",
        btnColor: "bg-indigo-600 hover:bg-indigo-700",
        gradient: "from-indigo-500 to-indigo-600"
    },
    {
        title: "Global Exhibitions",
        desc: "Attend prestigious trade shows, tech expos, art exhibitions, and medical conventions worldwide. Delegation packages include official entry passes, premium hotels, and business visas.",
        href: "/events/exhibitions",
        badge: "Business Delegation",
        icon: Globe,
        iconColor: "text-emerald-500",
        bg: "bg-emerald-50",
        borderColor: "group-hover:border-emerald-200",
        btnColor: "bg-emerald-500 hover:bg-emerald-600",
        gradient: "from-emerald-500 to-emerald-600"
    },
    {
        title: "Universities Fairs Hub",
        desc: "Register for top-tier international student recruitment fairs. Meet global university admission deans, receive conditional offer letters on-the-spot, and access premium visa guidance.",
        href: "/events/university-fairs",
        badge: "Academic Placement",
        icon: GraduationCap,
        iconColor: "text-purple-500",
        bg: "bg-purple-50",
        borderColor: "group-hover:border-purple-200",
        btnColor: "bg-purple-600 hover:bg-purple-700",
        gradient: "from-purple-500 to-purple-600"
    },
    {
        title: "Work Permits & Verification",
        desc: "Secure legally compliant employment routes abroad. Obtain fast employer visa sponsorships verification, work permit filings, and certified corporate validation checking.",
        href: "/work-permit",
        badge: "Employment Routes",
        icon: Briefcase,
        iconColor: "text-amber-500",
        bg: "bg-amber-50",
        borderColor: "group-hover:border-amber-200",
        btnColor: "bg-amber-500 hover:bg-amber-600",
        gradient: "from-amber-500 to-amber-600"
    },
    {
        title: "Secure Escrow Milestones",
        desc: "Make secure, milestone-based agent payments. Our smart escrow system keeps your money safe in secure custody, releasing funds to experts only when visa milestones are successfully met.",
        href: "/escrow",
        badge: "100% Financial Protection",
        icon: Shield,
        iconColor: "text-slate-500",
        bg: "bg-slate-100",
        borderColor: "group-hover:border-slate-350",
        btnColor: "bg-navy hover:bg-sky-950",
        gradient: "from-navy to-sky-900"
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-[#f7fbff] min-h-screen pb-24">
            {/* Elegant Hero Section */}
            <section className="relative bg-gradient-to-br from-navy via-ink to-navy text-white py-16 px-4 overflow-hidden border-b border-sky-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-15%,rgba(14,165,233,0.18),transparent_60%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-sky-500/20 mb-4 inline-block">
                        💼 Vetted Operations
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight">
                        Our Unified Services
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-4 leading-relaxed">
                        Visara consolidates every stage of your global mobility journey: expert counseling, safe escrow payments, event registrations, work permits, and premium travel packages.
                    </p>
                </div>
            </section>

            {/* Services Grid Display */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreServices.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <Link href={service.href} key={idx} className="group flex">
                                <div className={`flex flex-col bg-white rounded-2xl border border-sky-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${service.borderColor} w-full`}>
                                    {/* Icon Box */}
                                    <div className={`w-12 h-12 rounded-2xl ${service.bg} flex items-center justify-center shrink-0 mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                                    </div>

                                    {/* Header & Badges */}
                                    <div className="flex-1">
                                        <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">
                                            {service.badge}
                                        </span>
                                        <h3 className="font-sora font-bold text-navy text-sm mb-2 group-hover:text-[#0ea5e9] transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Button Action */}
                                    <div className="mt-6 pt-4 border-t border-sky-50 flex justify-end">
                                        <div className={`w-8 h-8 rounded-xl ${service.btnColor} text-white flex items-center justify-center shadow-sm transition-colors`}>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
