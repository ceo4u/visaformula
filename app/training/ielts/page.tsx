"use client";
import { useState } from "react";
import { BookOpen, Star, MapPin, Clock, Users, Filter, ArrowRight, Target, TrendingUp } from "lucide-react";

const institutes = [
    { name: "British Council", city: "Mumbai", rating: 4.9, batches: "Morning / Evening / Weekend", fee: "₹18,500", students: "5K+", nextBatch: "Apr 28", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" },
    { name: "IDP Education", city: "Delhi", rating: 4.8, batches: "Morning / Afternoon", fee: "₹16,000", students: "4K+", nextBatch: "May 1", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
    { name: "IELTS Academy Pro", city: "Hyderabad", rating: 4.7, batches: "Weekend Intensive", fee: "₹12,000", students: "2.5K+", nextBatch: "May 5", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop" },
    { name: "Pearson PTE Center", city: "Bangalore", rating: 4.6, batches: "Full-time / Part-time", fee: "₹14,000", students: "1.8K+", nextBatch: "Apr 30", image: "https://images.unsplash.com/photo-1577036421869-7c8d388d2123?w=400&h=300&fit=crop" },
    { name: "Global English Hub", city: "Pune", rating: 4.8, batches: "Morning / Online", fee: "₹10,500", students: "3K+", nextBatch: "May 3", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" },
    { name: "Prep Zone IELTS", city: "Chennai", rating: 4.5, batches: "Evening / Weekend", fee: "₹11,000", students: "2K+", nextBatch: "May 7", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&h=300&fit=crop" },
];

const scoreTargets = [
    { band: "6.0", desc: "Most study permits", color: "bg-amber-100 text-amber-700 border-amber-200" },
    { band: "6.5", desc: "Canada Express Entry", color: "bg-sky-100 text-sky-700 border-sky-200" },
    { band: "7.0", desc: "UK/Australia skilled", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { band: "8.0", desc: "Maximum CRS points", color: "bg-purple-100 text-purple-700 border-purple-200" },
];

export default function IELTSPage() {
    const [cityFilter, setCityFilter] = useState("All");
    const cities = ["All", ...new Set(institutes.map(i => i.city))];
    const filtered = cityFilter === "All" ? institutes : institutes.filter(i => i.city === cityFilter);

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            <section className="bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-700 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <BookOpen className="w-4 h-4" /> IELTS Preparation
                    </div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">Ace Your IELTS Exam</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Find top-rated coaching centers, compare fees, and book your batch today.</p>
                </div>
            </section>

            {/* Score Targets */}
            <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-10 mb-10">
                <div className="bg-white rounded-2xl shadow-card border border-sky-100 p-5">
                    <h3 className="font-bold text-navy text-sm mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-[#0ea5e9]" /> Score Targets by Immigration Program</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {scoreTargets.map(s => (
                            <div key={s.band} className={`rounded-xl border p-3 text-center ${s.color}`}>
                                <div className="font-sora font-extrabold text-2xl mb-0.5">{s.band}</div>
                                <div className="text-xs font-semibold">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-5xl mx-auto px-4 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-gray-400" />
                    {cities.map(c => (
                        <button key={c} onClick={() => setCityFilter(c)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${cityFilter === c ? "bg-[#0ea5e9] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-sky-50"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            {/* Institutes */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(inst => (
                        <div key={inst.name} className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all group">
                            <div className="h-36 overflow-hidden">
                                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-sora font-bold text-navy text-lg mb-1 group-hover:text-[#0ea5e9] transition-colors">{inst.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {inst.city}</span>
                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" fill="currentColor" /> {inst.rating}</span>
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {inst.students}</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-1"><strong>Batches:</strong> {inst.batches}</div>
                                <div className="text-xs text-gray-500 mb-3"><strong>Next Batch:</strong> {inst.nextBatch}</div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="font-extrabold text-navy text-lg">{inst.fee}</span>
                                    <button className="bg-[#0ea5e9] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0284c7] transition-all">Book Batch</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
