"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Shield, CheckCircle, ArrowRight, Star, MapPin, ChevronDown } from "lucide-react";

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
    { icon: Phone, title: "Call our emergency line", desc: "Available 24/7 for urgent cases. Our team will triage your situation immediately.", action: "Call Now: 1800-VISARA" },
    { icon: Shield, title: "Connect with a specialist", desc: "Get matched to an emergency-vetted immigration expert within minutes.", action: null },
    { icon: CheckCircle, title: "Get protected", desc: "Your expert will file the necessary stays, appeals, or documents to protect your status.", action: null },
];

export default function EmergencyPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-red-600 via-red-500 to-rose-600 text-white py-14 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
                        Legal Immigration Help
                    </h1>
                    <p className="text-white/75 text-lg mb-6 max-w-2xl mx-auto">
                        Facing an immigration crisis? Overstay, deportation notice, or visa denial? Get urgent help from a vetted expert — right now.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-white/60">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-white" /> 24/7 Legal Support</span>
                        <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-white" /> Verified Specialists</span>
                        <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-white" /> Immediate Response</span>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
                {/* How It Works */}
                <section>
                    <h2 className="font-sora text-2xl font-bold text-navy text-center mb-8">How Emergency Help Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {steps.map((step, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <step.icon className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="font-sora font-bold text-navy mb-2">{step.title}</div>
                                <p className="text-sm text-gray-500 leading-relaxed mb-3">{step.desc}</p>
                                {step.action && (
                                    <span className="inline-block bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-full">
                                        {step.action}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Situation Selector */}
                <section className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">
                    <h2 className="font-sora text-xl font-bold text-navy mb-2">What&apos;s your situation?</h2>
                    <p className="text-sm text-gray-500 mb-5">Select the most relevant option so we can match you to the right expert.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {emergencyTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => { setSelectedType(type.id); setShowForm(true); }}
                                className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedType === type.id
                                        ? "border-red-400 bg-red-50"
                                        : "border-sky-100 hover:border-red-200 hover:bg-red-50/30"
                                    }`}
                            >
                                <div className="font-bold text-navy text-sm mb-0.5">{type.label}</div>
                                <div className="text-xs text-gray-400">{type.desc}</div>
                            </button>
                        ))}
                    </div>

                    {showForm && (
                        <div className="mt-6 space-y-4 animate-fade-up">
                            <hr className="border-sky-100" />
                            <h4 className="font-bold text-navy text-sm">Tell us more (brief)</h4>
                            <textarea
                                placeholder="Briefly describe your situation... (e.g., 'My study visa expired 2 weeks ago, I'm still in Canada')"
                                rows={3}
                                className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-red-400 resize-none"
                            />
                            <input
                                type="tel"
                                placeholder="Your WhatsApp number (for urgent callback)"
                                className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-red-400"
                            />
                            <button className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Get Urgent Help Now
                            </button>
                            <p className="text-xs text-gray-400 text-center">By submitting, you agree to be contacted by a Visara representative within 30 minutes.</p>
                        </div>
                    )}
                </section>

                {/* Available Emergency Experts */}
                <section>
                    <h2 className="font-sora text-2xl font-bold text-navy mb-6">
                        Emergency Experts <span className="text-red-500">Available Now</span>
                    </h2>
                    <div className="space-y-4">
                        {experts.map((expert, idx) => (
                            <Link href={`/expert/${idx + 1}`} key={idx} className="block group">
                                <div className="bg-white rounded-2xl border border-sky-100 p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <img src={expert.image} alt={expert.name} className="w-full h-full object-cover rounded-2xl" />
                                        {expert.available && (
                                            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">Live</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                            <div>
                                                <h3 className="font-bold text-navy group-hover:text-[#0ea5e9] transition-colors">{expert.name}</h3>
                                                <p className="text-sm text-gray-400">{expert.role}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm font-semibold">
                                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {expert.rating}
                                                <span className="text-gray-400 font-normal">({expert.reviews})</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {expert.specialties.map((s) => (
                                                <span key={s} className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-100">{s}</span>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex gap-4 text-xs font-semibold text-gray-500">
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-red-500" /> Responds {expert.responseTime}</span>
                                                <span className="font-bold text-navy">{expert.price} / session</span>
                                            </div>
                                            <button className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97] ${expert.available
                                                    ? "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                }`}>
                                                {expert.available ? "Book Emergency Call" : "Unavailable"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Emergency Hotline Card */}
                <section>
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                            <Phone className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-sora text-xl font-bold mb-1">24/7 Emergency Hotline</h3>
                            <p className="text-white/70 text-sm">For life-threatening immigration emergencies, call us directly. Our team is available day and night.</p>
                        </div>
                        <a href="tel:18004827272" className="shrink-0">
                            <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all text-sm shadow-md flex items-center gap-2">
                                <Phone className="w-4 h-4" /> 1800-VISARA
                            </button>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
