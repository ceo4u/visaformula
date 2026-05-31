"use client";

import Link from "next/link";
import {
    Users, Plane, CalendarCheck, Shield,
    Compass, Globe, GraduationCap, Briefcase,
    ArrowRight, CheckCircle2, BadgePercent, ShieldCheck
} from "lucide-react";

const primaryServices = [
    {
        title: "Verified Experts",
        desc: "Consult directly with top-tier registered immigration attorneys, consultants, and legal counselors. Get verified support in real time.",
        href: "/find-experts",
        icon: Users,
        circleBg: "bg-[#0d9488]", // Teal
        textColor: "text-[#0d9488]",
        iconColor: "text-white"
    },
    {
        title: "Apply Visa Online",
        desc: "Apply for study, work, tourist visas, and PR programs entirely online. Complete step-by-step guidance and document checklists.",
        href: "/apply-visa",
        icon: Plane,
        circleBg: "bg-[#0c1a2e]", // Navy
        textColor: "text-[#0c1a2e]",
        iconColor: "text-white"
    },
    {
        title: "VFS Booking",
        desc: "Book your VFS Global visa appointment with zero hassle. We manage slot selection, biometric scheduling, and on-the-day coordination.",
        href: "/vfs-booking",
        icon: CalendarCheck,
        circleBg: "bg-[#0d9488]", // Teal
        textColor: "text-[#0d9488]",
        iconColor: "text-white"
    },
    {
        title: "Secure Escrow",
        desc: "Make secure, milestone-based agent payments. Our smart escrow system keeps your money safe until your visa milestones are met.",
        href: "/escrow",
        icon: Shield,
        circleBg: "bg-[#0c1a2e]", // Navy
        textColor: "text-[#0c1a2e]",
        iconColor: "text-white"
    }
];

const secondaryServices = [
    {
        title: "Exclusive Tours & Packages",
        desc: "Explore Holiday Packages, major Sport Tours (FIFA, F1), Cruise voyages, and global Entertainment Events. Every tour package comes with fully verified, comprehensive visa processing support.",
        href: "/tours",
        badge: "All-Inclusive",
        icon: Compass,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-600",
        borderColor: "hover:border-teal-200"
    },
    {
        title: "Global Exhibitions",
        desc: "Attend prestigious trade shows, tech expos, art exhibitions, and medical conventions worldwide. Delegation packages include official entry passes, premium hotels, and business visas.",
        href: "/events/exhibitions",
        badge: "Business Delegation",
        icon: Globe,
        iconBg: "bg-[#f7fbff]",
        iconColor: "text-sky-500",
        borderColor: "hover:border-sky-200"
    },
    {
        title: "Universities Fairs Hub",
        desc: "Register for top-tier international student recruitment fairs. Meet global university admission deans, receive conditional offer letters on-the-spot, and access premium student visa guidance.",
        href: "/events/university-fairs",
        badge: "Academic Placement",
        icon: GraduationCap,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        borderColor: "hover:border-purple-200"
    },
    {
        title: "Overseas Jobs & Sponsorships",
        desc: "Browse premium global career opportunities with verified employers who offer official visa sponsorships. Search by industry, location, and salary, and apply in one click.",
        href: "/jobs",
        badge: "International Careers",
        icon: Briefcase,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        borderColor: "hover:border-amber-200"
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-[#f7fbff] min-h-screen pb-24">
            
            {/* ────── LUXURIOUS TEAL HERO SECTION ────── */}
            <section className="relative text-white py-36 px-4 overflow-hidden border-b border-teal-950">
                {/* Full-bleed background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1800&h=900&fit=crop&q=90"
                        alt="High-end presentation meeting"
                        className="w-full h-full object-cover"
                    />
                    {/* Deep green-teal overlay matching the screenshot */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f766e]/90 via-[#115e59]/80 to-[#0c1a2e]/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(13,148,136,0.25),transparent_60%)]" />
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="font-sora text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                        Our Services
                    </h1>
                    <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Premium global mobility services tailored for your journey. Trusted, verified, and guaranteed.
                    </p>
                </div>
            </section>

            {/* ────── OVERLAPPING CIRCULAR SERVICES ────── */}
            <section className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {primaryServices.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <Link href={service.href} key={idx} className="group">
                                <div className="flex flex-col items-center">
                                    {/* Large overlapping circle with border */}
                                    <div className={`w-28 h-28 rounded-full border-4 border-white shadow-xl ${service.circleBg} flex items-center justify-center ${service.iconColor} group-hover:scale-105 transition-transform duration-300`}>
                                        <Icon className="w-10 h-10" />
                                    </div>

                                    {/* Service Description below circle */}
                                    <h3 className={`font-sora font-extrabold text-base text-center mt-5 transition-colors ${service.textColor} group-hover:text-teal-500`}>
                                        {service.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium text-center leading-relaxed mt-2 max-w-xs mx-auto px-2">
                                        {service.desc}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ────── SECTION BREAK: ADDITIONAL SERVICES ────── */}
            <section className="max-w-6xl mx-auto px-4 mt-20">
                <div className="text-center mb-10">
                    <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest block mb-1">More Options</span>
                    <h2 className="font-sora font-bold text-navy text-2xl">Premium Travel & Global Opportunities</h2>
                    <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">Explore all-inclusive student placements, business expo delegations, high-end vacation packages, and overseas career pathways.</p>
                </div>

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {secondaryServices.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <Link href={service.href} key={idx} className="group">
                                <div className={`flex flex-col bg-white rounded-3xl border border-sky-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${service.borderColor} h-full`}>
                                    
                                    {/* Circular Icon */}
                                    <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform shrink-0`}>
                                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                                            {service.badge}
                                        </span>
                                        <h3 className="font-sora font-bold text-navy text-sm mb-2 group-hover:text-teal-600 transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-6 pt-4 border-t border-sky-50 flex justify-end">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 text-gray-400 group-hover:bg-[#0c1a2e] group-hover:text-white flex items-center justify-center shadow-inner transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ────── VALUE PROPS BANNER ────── */}
            <section className="max-w-6xl mx-auto px-4 mt-20">
                <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-[#0c1a2e] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/15">
                                <ShieldCheck className="w-6 h-6 text-teal-400" />
                            </div>
                            <div>
                                <h4 className="font-sora font-bold text-sm mb-1 text-white">100% Secure Payments</h4>
                                <p className="text-xs text-white/60 leading-relaxed">Our premium escrow system safeguards your money and releases it to agents upon milestone validation.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/15">
                                <CheckCircle2 className="w-6 h-6 text-teal-400" />
                            </div>
                            <div>
                                <h4 className="font-sora font-bold text-sm mb-1 text-white">Vetted Service Providers</h4>
                                <p className="text-xs text-white/60 leading-relaxed">Every immigration consultant, attorney, and travel agency is fully licensed and screened by Visara.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/15">
                                <BadgePercent className="w-6 h-6 text-teal-400" />
                            </div>
                            <div>
                                <h4 className="font-sora font-bold text-sm mb-1 text-white">Transparent Pricing</h4>
                                <p className="text-xs text-white/60 leading-relaxed">Get fixed rates on visa processing, local expert advice, and premium bookings with zero hidden charges.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}