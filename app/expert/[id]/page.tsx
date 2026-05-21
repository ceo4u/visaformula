"use client";

import { useState } from "react";
import { Star, MapPin, Globe, Calendar, Clock, Share2, Bookmark, ThumbsUp, ChevronLeft, ChevronRight, CheckCircle, Award, Shield, MessageSquare, Phone, Video, Users, Mail, Crown, Sparkles, Lock, X } from "lucide-react";
import Link from "next/link";

const insights = [
    { label: "Response Quality", score: 4.8, pct: 96 },
    { label: "Communication", score: 4.5, pct: 90 },
    { label: "Success Rate", score: 4.9, pct: 98 },
    { label: "Value for Money", score: 4.2, pct: 84 },
];

const reviews = [
    {
        initials: "PS",
        name: "Priya Sharma",
        location: "Bengaluru, India",
        date: "March 2024",
        rating: 5,
        service: "Express Entry",
        text: "Marcus handled my ITA application with incredible precision. He walked me through every step and was always reachable on WhatsApp. Got my ITA in 4 months!",
        helpful: 28,
        reply: "Thank you Priya! Congratulations on your ITA — it was a pleasure working with you. Wishing you the very best in Canada!",
        color: "bg-indigo-100 text-indigo-700",
    },
    {
        initials: "RV",
        name: "Rahul Verma",
        location: "Delhi, India",
        date: "Jan 2024",
        rating: 5,
        service: "H-1B Transfer",
        text: "H-1B transfer was done in 45 days with Marcus. Zero surprises on fees, very transparent. Highly recommended for anyone dealing with a tight deadline.",
        helpful: 19,
        reply: null,
        color: "bg-emerald-100 text-emerald-700",
    },
    {
        initials: "JD",
        name: "John Doe",
        location: "San Francisco, CA",
        date: "Oct 2023",
        rating: 4,
        service: "RFE Response",
        text: "Marcus handled my RFE with expertise and didn't charge extra when things got complicated. Very organized and professional throughout.",
        helpful: 12,
        reply: "Thank you John! RFEs can be stressful but your quick responses made it seamless. Looking forward to your extension!",
        color: "bg-amber-100 text-amber-700",
    },
];

const services = [
    { label: "Initial Consultation (30 min)", price: "₹2,500" },
    { label: "Full Visa Application Review (60 min)", price: "₹4,500" },
    { label: "Document Checklist Audit", price: "₹1,500" },
    { label: "H-1B / Express Entry Full Filing", price: "₹35,000" },
];

const photos = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
];

export default function ExpertProfilePage() {
    const [selectedService, setSelectedService] = useState(0);
    const [selectedSession, setSelectedSession] = useState<"video" | "phone" | "in-person">("video");
    const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
    const [helpfulVotes, setHelpfulVotes] = useState<number[]>([]);
    const [saved, setSaved] = useState(false);

    // Premium Plan Showcase States
    const [isPremiumPlan, setIsPremiumPlan] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const toggleHelpful = (idx: number) => {
        setHelpfulVotes((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
    };

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Interactive Plan Mode Selector for demo */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-amber-700/10 border-b border-amber-200/40 py-2.5 px-4 text-center">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                        <span>Interactive Demo: Toggle the Expert's Plan to see direct contact details blocking in action!</span>
                    </span>
                    <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-amber-200 shadow-sm">
                        <button 
                            onClick={() => setIsPremiumPlan(false)}
                            className={`px-3 py-1 rounded-full transition-all ${!isPremiumPlan ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Free Plan (Masked Contacts)
                        </button>
                        <button 
                            onClick={() => setIsPremiumPlan(true)}
                            className={`px-3 py-1 rounded-full transition-all ${isPremiumPlan ? "bg-amber-600 text-white" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Premium Plan (Showcase Direct Contacts)
                        </button>
                    </div>
                </div>
            </div>
            {/* Header Info */}
            <div className="bg-white border-b border-sky-100 pt-6">
                <div className="max-w-6xl mx-auto px-4 pb-6">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {isPremiumPlan && (
                                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-400 flex items-center gap-1 shadow-sm">
                                        <Crown className="w-3 h-3 text-white fill-white animate-pulse" /> Premium Partner
                                    </span>
                                )}
                                <span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Open Now
                                </span>
                                <span className="bg-sky-50 text-[#0ea5e9] text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border border-sky-200 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> KYC Verified
                                </span>
                                <span className="bg-amber-50 text-amber-700 text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                                    <Award className="w-3 h-3" /> Top Rated
                                </span>
                            </div>
                            <h1 className="font-sora text-3xl font-extrabold text-navy mb-1 flex items-center gap-2 flex-wrap">
                                Marcus Thorne, JD
                                {isPremiumPlan && (
                                    <span className="inline-flex items-center justify-center bg-amber-50 border border-amber-200 text-amber-600 p-1.5 rounded-xl text-xs font-black shadow-inner">
                                        <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    </span>
                                )}
                            </h1>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                <span>Immigration Attorney</span>
                                <span>·</span>
                                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.5</span>
                                <a href="#reviews" className="text-[#0ea5e9] hover:underline">(142 reviews)</a>
                            </div>
                            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> New York, NY</span>
                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 15 yrs experience</span>
                                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-[#0ea5e9]" /> 1,500+ cases handled</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 shrink-0">
                            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-1.5 border px-4 py-2 text-sm font-bold rounded-xl transition-all ${saved ? "border-[#0ea5e9] bg-sky-50 text-[#0ea5e9]" : "border-sky-200 hover:bg-sky-50 text-gray-500"}`}>
                                <Bookmark className={`w-4 h-4 ${saved ? "fill-[#0ea5e9]" : ""}`} /> {saved ? "Saved" : "Save"}
                            </button>
                            <button className="flex items-center gap-1.5 border border-sky-200 px-4 py-2 text-sm font-bold rounded-xl hover:bg-sky-50 text-gray-500 transition-all">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                    </div>
                </div>

                {/* Photo Grid */}
                <div className="max-w-6xl mx-auto px-4 pb-8 grid grid-cols-4 grid-rows-2 gap-2 h-[320px]">
                    <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
                        <img src={photos[0]} alt="Expert" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    {photos.slice(1, 5).map((p, i) => (
                        <div key={i} className={`rounded-2xl overflow-hidden relative ${i === 3 ? "cursor-pointer" : ""}`}>
                            <img src={p} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            {i === 3 && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                                    <span className="text-white font-bold text-sm">See all 12 photos</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="flex-1 space-y-8">
                    {/* About */}
                    <section className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                        <h2 className="font-sora text-xl font-bold text-navy mb-3">About the Expert</h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            Marcus Thorne is an award-winning immigration attorney with over 15 years of experience resolving complex H-1B, O-1, EB-1, and Express Entry cases. He runs a boutique firm tailored to tech and creative industry professionals.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["H-1B Visa", "O-1 Extraordinary Ability", "EB-1 Green Card", "L-1 Transfer", "Express Entry", "RFE Responses"].map((spec) => (
                                <span key={spec} className="bg-sky-50 text-sky-700 text-xs px-3 py-1.5 rounded-full border border-sky-100 font-semibold">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Services & Pricing */}
                    <section className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                        <h2 className="font-sora text-xl font-bold text-navy mb-4">Services & Pricing</h2>
                        <div className="space-y-3">
                            {services.map((s, i) => (
                                <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${selectedService === i ? "border-[#0ea5e9] bg-sky-50" : "border-sky-100 hover:border-sky-200"}`}
                                    onClick={() => setSelectedService(i)}>
                                    <span className="text-sm font-semibold text-navy">{s.label}</span>
                                    <span className="font-bold text-[#0ea5e9] text-sm shrink-0 ml-4">{s.price}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Review Insights */}
                    <section className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm" id="reviews">
                        <h2 className="font-sora text-xl font-bold text-navy mb-5">Review Insights</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {insights.map((ins) => (
                                <div key={ins.label}>
                                    <div className="flex justify-between text-sm font-semibold mb-1.5">
                                        <span className="text-gray-700">{ins.label}</span>
                                        <span className="text-[#0ea5e9]">{ins.score}</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-sky-50 rounded-full overflow-hidden border border-sky-100">
                                        <div className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] rounded-full transition-all" style={{ width: `${ins.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews List */}
                    <section className="space-y-4">
                        {reviews.map((r, idx) => (
                            <div key={idx} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center font-bold text-sm shrink-0`}>
                                        {r.initials}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-navy text-sm">{r.name}</div>
                                        <div className="text-xs text-gray-400">{r.location} · {r.date}</div>
                                    </div>
                                    <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-100 font-bold shrink-0">{r.service}</span>
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">{r.text}</p>
                                <button
                                    onClick={() => toggleHelpful(idx)}
                                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${helpfulVotes.includes(idx) ? "bg-sky-50 border-[#0ea5e9] text-[#0ea5e9]" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <ThumbsUp className={`w-3.5 h-3.5 ${helpfulVotes.includes(idx) ? "fill-[#0ea5e9]" : ""}`} />
                                    Helpful ({r.helpful + (helpfulVotes.includes(idx) ? 1 : 0)})
                                </button>

                                {r.reply && (
                                    <div className="mt-4 bg-sky-50/70 rounded-xl p-4 border-l-4 border-[#0ea5e9]">
                                        <div className="text-xs font-bold text-navy mb-1 flex items-center gap-1.5">
                                            <CheckCircle className="w-3.5 h-3.5 text-[#0ea5e9]" /> Expert Reply
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{r.reply}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="text-center pt-2">
                            <button className="border-2 border-sky-200 text-navy font-bold px-6 py-2.5 rounded-xl hover:bg-sky-50 transition-all text-sm">
                                Load more reviews (139)
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Sticky Sidebar */}
                <aside className="w-full lg:w-[360px] shrink-0">
                    <div className="sticky top-24 space-y-5">
                        {/* Booking Card */}
                        <div className="bg-white rounded-2xl border border-sky-100 shadow-card p-6">
                            <h3 className="font-sora text-lg font-bold text-navy mb-5">Book a Consultation</h3>

                            {/* Session Type */}
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Session Type</label>
                            <div className="grid grid-cols-3 gap-2 mb-5">
                                {(["video", "phone", "in-person"] as const).map((type) => (
                                    <button key={type} onClick={() => setSelectedSession(type)}
                                        className={`py-2 rounded-xl text-xs font-bold border-2 flex flex-col items-center gap-1 transition-all ${selectedSession === type ? "border-[#0ea5e9] bg-sky-50 text-[#0ea5e9]" : "border-sky-100 text-gray-500 hover:bg-sky-50"
                                            }`}>
                                        {type === "video" ? <Video className="w-4 h-4" /> : type === "phone" ? <Phone className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                                        <span className="capitalize">{type}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Service selector */}
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Service</label>
                            <select
                                className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm font-semibold text-navy outline-none focus:border-[#0ea5e9] mb-5"
                                value={selectedService}
                                onChange={(e) => setSelectedService(Number(e.target.value))}
                            >
                                {services.map((s, i) => (
                                    <option key={i} value={i}>{s.label} — {s.price}</option>
                                ))}
                            </select>

                            {/* Mini Calendar */}
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Select Date</label>
                            <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-navy" />
                                    <span className="text-sm font-bold text-navy">April 2025</span>
                                    <ChevronRight className="w-4 h-4 text-[#0ea5e9] cursor-pointer hover:text-[#0284c7]" />
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                                        <div key={d} className="font-bold text-gray-400 py-1">{d}</div>
                                    ))}
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div key={i} className={`py-1.5 rounded-lg cursor-pointer text-xs font-semibold transition-colors ${i === 14 ? "bg-[#0ea5e9] text-white font-bold" :
                                                i > 12 ? "hover:bg-sky-100 text-navy" : "text-gray-300"
                                            }`}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Available Times</label>
                            <div className="grid grid-cols-3 gap-2 mb-5">
                                {["10:00 AM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:00 PM"].map((slot) => (
                                    <button key={slot} onClick={() => setSelectedSlot(slot)}
                                        className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedSlot === slot ? "border-[#0ea5e9] bg-sky-50 text-[#0ea5e9]" : "border-sky-100 text-navy hover:bg-sky-50"
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>

                            <Link href="/payment/booking-001">
                                <button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-sky-200 transition-all active:scale-[0.97]">
                                    Book & Pay Securely
                                </button>
                            </Link>
                            <p className="text-center text-xs text-gray-400 mt-2 font-medium flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3" /> Escrow protected · Cancel free until 24h before
                            </p>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm relative overflow-hidden">
                            {/* Premium Glow effect if premium */}
                            {isPremiumPlan && (
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-full pointer-events-none" />
                            )}
                            
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-navy text-sm">Contact Details</h4>
                                {isPremiumPlan ? (
                                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm border border-amber-400">
                                        <Crown className="w-2.5 h-2.5" /> Premium
                                    </span>
                                ) : (
                                    <span className="bg-slate-100 text-slate-500 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border border-slate-200">
                                        Free Plan
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3.5 text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                                    <a href="#" className="text-[#0ea5e9] hover:underline font-medium">www.thornelaw.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                                    <span>120 Broadway, Suite 3400, New York, NY</span>
                                </div>

                                <div className="h-[1px] bg-sky-50 my-2" />

                                {/* Phone number */}
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                                    {isPremiumPlan ? (
                                        <span className="font-semibold text-navy font-mono">(212) 555-0198</span>
                                    ) : (
                                        <div className="flex items-center gap-1.5 flex-1 justify-between">
                                            <span className="font-mono text-gray-400 font-medium">(212) 555-••••</span>
                                            <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-200">Premium Locked</span>
                                        </div>
                                    )}
                                </div>

                                {/* Email address */}
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                                    {isPremiumPlan ? (
                                        <a href="mailto:marcus.thorne@thornelaw.com" className="text-[#0ea5e9] hover:underline font-semibold font-mono text-xs">
                                            marcus.thorne@thornelaw.com
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-1.5 flex-1 justify-between">
                                            <span className="font-mono text-gray-400 font-medium text-xs">marcus.t••••@thornelaw.com</span>
                                            <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-200">Premium Locked</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upgrade Premium CTA banner if Free Plan */}
                            {!isPremiumPlan && (
                                <div className="mt-5 p-3.5 bg-gradient-to-br from-amber-500/5 via-amber-600/5 to-amber-700/5 rounded-xl border border-amber-200/50 text-center">
                                    <div className="text-xs font-extrabold text-amber-900 mb-1 flex items-center justify-center gap-1">
                                        <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Premium Content
                                    </div>
                                    <p className="text-[10px] text-amber-700/80 leading-normal mb-3">
                                        Upgrade Marcus to a premium profile to showcase their direct phone number and email address.
                                    </p>
                                    <button 
                                        type="button"
                                        onClick={() => setShowUpgradeModal(true)}
                                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold py-2 rounded-lg hover:shadow-md hover:shadow-amber-100 transition-all text-xs active:scale-[0.97]"
                                    >
                                        Upgrade Plan to Unlock
                                    </button>
                                </div>
                            )}

                            <button className="mt-4 w-full border-2 border-sky-200 text-navy font-bold py-2.5 rounded-xl hover:bg-sky-50 transition-all flex items-center justify-center gap-2 text-sm">
                                <MessageSquare className="w-4 h-4" /> Message Expert
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Upgrade Premium Plan Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm transition-all duration-200">
                    <div className="bg-white rounded-3xl border border-sky-100 shadow-2xl p-6 sm:p-8 max-w-md w-full relative transform transition-all duration-200">
                        {/* Close button */}
                        <button 
                            type="button"
                            onClick={() => setShowUpgradeModal(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-navy hover:bg-sky-50 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 shadow-lg shadow-amber-100">
                                <Crown className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-sora text-xl font-extrabold text-navy">Visara Premium Plan</h3>
                            <p className="text-xs text-gray-400 mt-1">Supercharge your provider visibility and conversions</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-navy">Showcase Direct Contacts</h4>
                                    <p className="text-[11px] text-gray-400 leading-normal mt-0.5">Let visa seekers call and email you directly from your profile page.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-navy">3x Higher Search Visibility</h4>
                                    <p className="text-[11px] text-gray-400 leading-normal mt-0.5">Get boosted to the very top of local and international search results.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-navy">Verified Premium Badge</h4>
                                    <p className="text-[11px] text-gray-400 leading-normal mt-0.5">Earn a premium golden crown badge on your listings and profile page.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-navy">Direct WhatsApp Bookings</h4>
                                    <p className="text-[11px] text-gray-400 leading-normal mt-0.5">Connect your WhatsApp to let seekers initiate chats with a single tap.</p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing and Button */}
                        <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100 flex items-center justify-between mb-6">
                            <div>
                                <span className="text-[9px] uppercase font-bold text-sky-700 tracking-wider">Premium Access</span>
                                <div className="flex items-baseline gap-1 mt-0.5">
                                    <span className="text-xl font-black text-navy">₹1,499</span>
                                    <span className="text-xs text-gray-400 font-bold">/ month</span>
                                </div>
                            </div>
                            <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded-full border border-emerald-200">
                                Save 20% Yearly
                            </span>
                        </div>

                        <button 
                            type="button"
                            onClick={() => {
                                setIsPremiumPlan(true);
                                setShowUpgradeModal(false);
                            }}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold py-3.5 rounded-xl hover:shadow-lg hover:shadow-amber-100 transition-all active:scale-[0.97] text-xs text-center"
                        >
                            Upgrade Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
