"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Shield, CheckCircle, ArrowRight, Star, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";

const emergencyTypes = [
    { id: "overstay", label: "Visa Overstay", desc: "Currently in-country beyond visa validity" },
    { id: "denial", label: "Visa Denial / Rejection", desc: "Just received a rejection letter" },
    { id: "deportation", label: "Deportation / Removal Order", desc: "Received a removal or deportation notice" },
    { id: "detention", label: "Immigration Detention", desc: "Detained by immigration authorities" },
    { id: "asylum", label: "Asylum / Refugee Claim", desc: "Need urgent asylum or refugee protection" },
    { id: "other", label: "Other Emergency", desc: "Any other urgent immigration situation" },
];

const experts = [
    {
        name: "Marcus Thorne, JD",
        role: "Emergency Immigration Attorney",
        rating: 4.9,
        reviews: 142,
        price: "₹3,000",
        responseTime: "< 30 min",
        available: true,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        specialties: ["Deportation Stay", "Overstay Relief", "Detention Hearings"],
    },
    {
        name: "Elena Rodriguez",
        role: "Immigration Consultant",
        rating: 5.0,
        reviews: 89,
        price: "₹2,000",
        responseTime: "< 1 hour",
        available: true,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        specialties: ["Visa Denial Appeals", "Status Restoration"],
    },
    {
        name: "Raj Patel",
        role: "Express Entry & Emergency Specialist",
        rating: 4.8,
        reviews: 234,
        price: "₹1,800",
        responseTime: "< 2 hours",
        available: false,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        specialties: ["Asylum Claims", "Refugee Protection"],
    },
];

const steps = [
    {
        title: "Call Emergency Line",
        desc: "Our toll-free immigration crisis support helpline is active 24/7 for immediate triage and guidance.",
        action: "Call Now: 1800-VISARA",
        icon: Phone,
        circleBg: "bg-red-600",
        textColor: "text-red-600",
        iconColor: "text-white"
    },
    {
        title: "Connect with Lawyer",
        desc: "Get instantly paired with a verified, emergency-vetted immigration attorney or expert within 30 minutes.",
        action: null,
        icon: Shield,
        circleBg: "bg-[#0c1a2e]",
        textColor: "text-[#0c1a2e]",
        iconColor: "text-white"
    },
    {
        title: "Submit Protection Stay",
        desc: "Your dedicated expert will immediately file stays, appeal rejections, or prepare emergency status files.",
        action: null,
        icon: CheckCircle,
        circleBg: "bg-red-600",
        textColor: "text-red-600",
        iconColor: "text-white"
    }
];

export default function EmergencyPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-[#f7fbff] min-h-screen pb-24">
            
            {/* ────── LUXURIOUS LEGAL HERO SECTION ────── */}
            <section className="relative text-white py-36 px-4 overflow-hidden border-b border-red-950">
                {/* Full-bleed premium background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&h=900&fit=crop&q=90"
                        alt="Courthouse marble columns"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark red/navy overlay matching the services page structure */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#991b1b]/90 via-[#851818]/85 to-[#0c1a2e]/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(239,68,68,0.25),transparent_60%)]" />
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-md">
                        <AlertTriangle className="w-7 h-7 text-rose-400" />
                    </div>
                    <h1 className="font-sora text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                        Legal Help Portal
                    </h1>
                    <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Facing an immigration crisis? Get urgent, verified support from vetted specialists immediately.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-white/70 mt-6">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-rose-400" /> 24/7 Support</span>
                        <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-rose-400" /> Vetted Specialists</span>
                        <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-rose-400" /> Immediate Triage</span>
                    </div>
                </div>
            </section>

            {/* ────── OVERLAPPING CIRCULAR SERVICES (HOW IT WORKS) ────── */}
            <section className="max-w-5xl mx-auto px-4 -mt-20 relative z-20 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div key={idx} className="group flex flex-col items-center bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                {/* Large overlapping circle with border */}
                                <div className={`w-24 h-24 rounded-full border-4 border-white shadow-md ${step.circleBg} flex items-center justify-center ${step.iconColor} group-hover:scale-105 transition-transform duration-300 -mt-16`}>
                                    <Icon className="w-9 h-9" />
                                </div>

                                {/* Service Description below circle */}
                                <h3 className={`font-sora font-extrabold text-base text-center mt-5 transition-colors ${step.textColor} group-hover:text-red-500`}>
                                    {step.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium text-center leading-relaxed mt-2 max-w-xs mx-auto px-1">
                                    {step.desc}
                                </p>
                                {step.action && (
                                    <a href="tel:18004827272" className="mt-4">
                                        <button className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] font-black uppercase px-4 py-2 rounded-full transition-colors">
                                            {step.action}
                                        </button>
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ────── INTERACTIVE CRISIS SITUATION SELECTOR ────── */}
            <section className="max-w-4xl mx-auto px-4 mb-16">
                <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-8">
                    <div className="mb-6">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">Status Restoration</span>
                        <h2 className="font-sora font-bold text-navy text-xl">What is your current immigration situation?</h2>
                        <p className="text-xs text-gray-400 mt-1">Select the option below so our emergency coordinators can matching-assign you to the right attorney immediately.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {emergencyTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => { setSelectedType(type.id); setShowForm(true); }}
                                className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedType === type.id
                                        ? "border-red-400 bg-red-50/50"
                                        : "border-sky-100 hover:border-red-200 hover:bg-red-50/10"
                                    }`}
                            >
                                <div className="font-bold text-navy text-sm mb-0.5">{type.label}</div>
                                <div className="text-xs text-gray-400 leading-normal">{type.desc}</div>
                            </button>
                        ))}
                    </div>

                    {showForm && (
                        <div className="mt-8 space-y-4 animate-fade-up">
                            <hr className="border-sky-50" />
                            <h4 className="font-sora font-bold text-navy text-sm">Brief Situation Description & Contact</h4>
                            <textarea
                                placeholder="Describe your case briefly... (e.g. 'My visa expired 1 week ago, I received an inquiry email')"
                                rows={3}
                                className="w-full p-4 bg-slate-50/50 border border-sky-100 rounded-2xl text-xs outline-none focus:border-red-400 resize-none font-medium text-gray-700"
                            />
                            <input
                                type="tel"
                                placeholder="Your WhatsApp number (for urgent legal callback within 15 mins)"
                                className="w-full p-4 bg-slate-50/50 border border-sky-100 rounded-2xl text-xs outline-none focus:border-red-400 font-medium text-gray-700"
                            />
                            <button className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider hover:shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Connect with Attorney Now
                            </button>
                            <p className="text-[10px] text-gray-400 text-center">Your privacy is legally protected. Case details are encrypted under Client-Attorney privilege guidelines.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ────── AVAILABLE EMERGENCY EXPERTS ────── */}
            <section className="max-w-4xl mx-auto px-4 mt-16">
                <div className="mb-8">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">Live Queue</span>
                    <h2 className="font-sora font-bold text-navy text-2xl">Verified Legal Specialists On-Duty</h2>
                    <p className="text-xs text-gray-400 mt-1">Consult with verified immigration attorneys who are live on the platform right now.</p>
                </div>

                <div className="space-y-4">
                    {experts.map((expert, idx) => (
                        <Link href={`/expert/${idx + 1}`} key={idx} className="block group">
                            <div className="bg-white rounded-3xl border border-sky-100 p-6 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <div className="relative w-20 h-20 shrink-0 mx-auto sm:mx-0">
                                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover rounded-2xl border border-sky-100" />
                                    {expert.available && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border-2 border-white animate-pulse">Live</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 text-center sm:text-left">
                                        <div>
                                            <h3 className="font-sora font-bold text-navy text-sm group-hover:text-red-500 transition-colors leading-tight">{expert.name}</h3>
                                            <p className="text-xs text-gray-400">{expert.role}</p>
                                        </div>
                                        <div className="flex items-center justify-center sm:justify-end gap-1 text-xs font-bold text-navy">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {expert.rating}
                                            <span className="text-gray-400 font-normal">({expert.reviews} reviews)</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-3">
                                        {expert.specialties.map((s) => (
                                            <span key={s} className="bg-red-50/50 text-red-700 text-[9px] font-bold px-2.5 py-1 rounded-full border border-red-100/50">{s}</span>
                                        ))}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-sky-50">
                                        <div className="flex justify-center sm:justify-start gap-4 text-xs font-semibold text-gray-500">
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-red-500" /> Responds {expert.responseTime}</span>
                                            <span>·</span>
                                            <span className="font-bold text-navy">{expert.price} / session</span>
                                        </div>
                                        <button className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.97] ${expert.available
                                                ? "bg-[#0c1a2e] text-white hover:bg-red-600 hover:shadow-md"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}>
                                            {expert.available ? "Book Emergency Call" : "Offline"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
