"use client";
import Link from "next/link";
import { BookOpen, Languages, Wallet, ArrowRight, Star, MapPin, Users } from "lucide-react";

const categories = [
    { title: "IELTS Institutes", desc: "Prepare for IELTS with top-rated coaching centers. Track scores, find batch timings, and ace your exam.", icon: BookOpen, count: 142, href: "/training/ielts", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
    { title: "Language Training", desc: "French, German, Spanish, Arabic — learn the language required for your destination country.", icon: Languages, count: 89, href: "/training/language", color: "from-purple-500 to-violet-600", bg: "bg-purple-50" },
    { title: "Financial Advisors", desc: "Education loans, GIC specialists, EMI calculators — plan your finances for study abroad.", icon: Wallet, count: 67, href: "/training/financial", color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
];

const featuredInstitutes = [
    { name: "IELTS Academy Pro", city: "Mumbai", rating: 4.9, students: "2.5K+", type: "IELTS", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" },
    { name: "Alliance Française", city: "Delhi", rating: 4.8, students: "1.8K+", type: "French", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
    { name: "Goethe-Institut", city: "Bangalore", rating: 4.7, students: "1.2K+", type: "German", image: "https://images.unsplash.com/photo-1577036421869-7c8d388d2123?w=400&h=300&fit=crop" },
    { name: "FinVisa Advisors", city: "Pune", rating: 4.8, students: "900+", type: "Finance", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
];

export default function TrainingHubPage() {
    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-600 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <BookOpen className="w-4 h-4" /> Training & Preparation Hub
                    </div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">Prepare for Your<br />Immigration Journey</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">IELTS coaching, language training, and financial planning — everything you need before you apply.</p>
                </div>
            </section>

            {/* Category Cards */}
            <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map(cat => (
                        <Link href={cat.href} key={cat.title}>
                            <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all h-full group cursor-pointer">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-sora font-bold text-xl text-navy mb-2 group-hover:text-[#0ea5e9] transition-colors">{cat.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-4">{cat.desc}</p>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-gray-400">{cat.count} providers</span>
                                    <span className="text-sm font-bold text-[#0ea5e9] flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Upsell Callout */}
            <section className="max-w-5xl mx-auto px-4 py-10">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                        <Star className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-navy mb-1">Planning for Canada? You&apos;ll need IELTS 6.5+</h3>
                        <p className="text-sm text-gray-500">Most Canadian immigration programs require a minimum IELTS score. Start preparing early.</p>
                    </div>
                    <Link href="/training/ielts">
                        <button className="bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-600 transition-all whitespace-nowrap">Find IELTS Centers →</button>
                    </Link>
                </div>
            </section>

            {/* Featured Institutes */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="font-sora text-2xl font-bold text-navy mb-8">Featured Training Institutes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featuredInstitutes.map(inst => (
                        <div key={inst.name} className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all group">
                            <div className="h-32 overflow-hidden">
                                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                                <span className="text-[10px] font-bold text-[#0ea5e9] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">{inst.type}</span>
                                <h3 className="font-bold text-navy text-sm mt-2 group-hover:text-[#0ea5e9] transition-colors">{inst.name}</h3>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {inst.city}</span>
                                    <span>·</span>
                                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400" fill="currentColor" /> {inst.rating}</span>
                                    <span>·</span>
                                    <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {inst.students}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
