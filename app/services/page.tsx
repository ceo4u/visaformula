"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield } from "lucide-react";

// Toast Helper
function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2600);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-sky-950 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            {message}
        </div>
    );
}

const serviceItems = [
    {
        title: "Student Visa",
        desc: "Canada, UK, Australia, USA, Germany — end-to-end guidance, SOP review, and university selection.",
        icon: "🎓",
        badge: "Popular",
        badgeType: "blue",
        href: "/find-experts?category=student"
    },
    {
        title: "Work Permit & PR",
        desc: "LMIA, PGWP, Express Entry, skilled worker visas — 1-on-1 with immigration lawyers.",
        icon: "💼",
        badge: "",
        badgeType: "",
        href: "/work-permit"
    },
    {
        title: "Tourist Visa + Holidays",
        desc: "Visa + hotel + itinerary bundles for Dubai, Bali, Europe, Thailand and more.",
        icon: "✈️",
        badge: "",
        badgeType: "",
        href: "/tours"
    },
    {
        title: "IELTS & Language Training",
        desc: "Find top-rated institutes, batch booking, and free score gap analysis.",
        icon: "📚",
        badge: "",
        badgeType: "",
        href: "/training"
    },
    {
        title: "Education Loan & GIC",
        desc: "Loan specialists for Canada, Australia, UK. Blocked account assistance for Germany.",
        icon: "💰",
        badge: "",
        badgeType: "",
        href: "/training"
    },
    {
        title: "Exhibition & Business Fairs",
        desc: "Trade shows, tech expos, medical fairs — visa + registration + hotel packages.",
        icon: "🏛️",
        badge: "",
        badgeType: "",
        href: "/events/exhibitions"
    },
    {
        title: "University Fairs",
        desc: "Meet 500+ universities in India or online. Free registration, spot offers available.",
        icon: "🎓",
        badge: "",
        badgeType: "",
        href: "/events/university-fairs"
    },
    {
        title: "Emergency Visa Help",
        desc: "Overstay, deportation, refusal appeal — 24/7 access to immigration lawyers.",
        icon: "🆘",
        badge: "Urgent",
        badgeType: "red",
        href: "/legal"
    },
    {
        title: "Visara In‑House Experts",
        desc: "Hand‑picked, salaried consultants for complex cases — available across 6 countries.",
        icon: "🏢",
        badge: "",
        badgeType: "",
        href: "/find-experts?expert=inhouse"
    }
];

export default function ServicesPage() {
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    return (
        <div className="bg-[#f7fbff] min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Elegant Hero Section */}
            <section className="relative bg-gradient-to-br from-navy via-ink to-navy text-white py-16 px-4 overflow-hidden border-b border-sky-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-15%,rgba(14,165,233,0.18),transparent_60%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-sky-500/20 mb-4 inline-block">
                        💼 Unified Operations
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        From visa consultation to holiday packages — we connect you with verified experts, smart tools, and secure escrow protections.
                    </p>
                </div>
            </section>

            {/* Services Grid Display */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceItems.map((service, idx) => (
                        <Link 
                            href={service.href} 
                            key={idx} 
                            onClick={() => triggerToast(`🔗 Navigating to ${service.title}`)}
                            className="group flex"
                        >
                            <div className="flex flex-col bg-white rounded-2xl border border-sky-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-sky-200 w-full relative">
                                {/* Icon Box */}
                                <div className="w-12 h-12 rounded-2xl bg-sky-50/50 flex items-center justify-center mb-5 text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-sora font-bold text-navy text-sm group-hover:text-[#0ea5e9] transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        {service.badge && (
                                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                                                service.badgeType === "red" 
                                                    ? "bg-red-50 text-red-600 border border-red-100" 
                                                    : "bg-sky-50 text-sky-600 border border-sky-100"
                                            }`}>
                                                {service.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Action Arrow */}
                                <div className="mt-6 pt-4 border-t border-sky-50 flex justify-end">
                                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 group-hover:bg-[#0ea5e9] group-hover:text-white flex items-center justify-center transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Secure Escrow protection banner */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm mt-10">
                    <div className="text-3xl shrink-0">🔒</div>
                    <div className="text-left">
                        <h4 className="font-sora font-bold text-emerald-800 text-xs sm:text-sm mb-1">Escrow Protection — Included in every service</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                            Your milestone payments stay completely safe in custody. Visara guarantees that money is only released to verified experts upon satisfactory delivery of visa milestones.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
