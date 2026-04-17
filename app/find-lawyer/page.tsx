"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, ChevronLeft, ChevronRight, ChevronDown, List, Map as MapIcon, CheckCircle, Clock } from "lucide-react";
import { MultiCitySelect } from "@/components/shared/multi-city-select";

const results = [
    {
        rank: 1,
        name: "Marcus Thorne, JD",
        rating: 4.5,
        reviews: 142,
        statusOpen: true,
        price: "$150 / 30 min",
        distance: "1.2 mi",
        tags: ["US Visa", "H-1B", "L-1"],
        responses: "Usually responds in 1 hour",
        desc: "Specializing in employment-based petitions for tech professionals. Known for high success rates in complex RFE responses.",
        aiInsight: "Users report Marcus handled an urgent H-1B transfer within 45 days. Highly recommended for premium processing.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        verified: true,
        badge: "Fast Responder"
    },
    {
        rank: 2,
        name: "Elena Rodriguez",
        rating: 5.0,
        reviews: 89,
        statusOpen: true,
        price: "$100 / 30 min",
        distance: "3.5 mi",
        tags: ["Green Card", "Family"],
        responses: "Usually responds in 2 hours",
        desc: "Dedicated to connecting families across borders. Expertise in marriage-based green cards and consular processing.",
        aiInsight: "Consistently rated 5 stars for clear communication and transparent flat-fee pricing structures.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        verified: true,
        badge: null
    },
    {
        rank: 3,
        name: "Beacon Global Services",
        rating: 4.8,
        reviews: 210,
        statusOpen: false,
        price: "$80 / 30 min",
        distance: "0.8 mi",
        tags: ["F-1 Visa", "Admissions"],
        responses: "Usually responds same day",
        desc: "Premium education advisory for studying abroad. End-to-end guidance from university selection to visa approval.",
        aiInsight: "Excellent track record with UK and US student visas. Good for overall application strategy.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop&crop=face",
        verified: false,
        badge: "Top Rated Agency"
    },
];

export default function FindLawyerPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [cities, setCities] = useState<string[]>([]);

    // UI state for filter chips
    const [activeFilters, setActiveFilters] = useState<string[]>(["Immigration Lawyer", "Canada", "4.5 & up"]);

    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter((f) => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            <main className="max-w-7xl mx-auto flex flex-col md:flex-row py-8 px-4 gap-6">

                {/* Left Sidebar Filters */}
                <aside className="w-full md:w-[320px] shrink-0 mb-6 md:mb-0">
                    <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-sora text-lg font-bold text-navy">Filters</h2>
                            <button className="text-sm font-semibold text-[#0ea5e9] hover:underline" onClick={() => setActiveFilters([])}>Clear All</button>
                        </div>

                        {/* Selected Locations using MultiCitySelect */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                            <MultiCitySelect
                                selectedCities={cities}
                                onChange={setCities}
                                placeholder="Add city (e.g. Toronto)"
                            />
                        </div>

                        {/* Filter Group: Expert Type */}
                        <div className="py-4 border-b border-gray-100">
                            <h3 className="font-bold text-sm text-navy mb-3">Expert Type</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Immigration Lawyer", "Immigration Consultant", "Education Agent"].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => toggleFilter(type)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeFilters.includes(type)
                                                ? "bg-[#0ea5e9] text-white border border-[#0ea5e9] shadow-sm"
                                                : "bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Group: Destination */}
                        <div className="py-4 border-b border-gray-100">
                            <h3 className="font-bold text-sm text-navy mb-3">Destination Focus</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Canada", "USA", "UK", "Australia"].map(dest => (
                                    <button
                                        key={dest}
                                        onClick={() => toggleFilter(dest)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeFilters.includes(dest)
                                                ? "bg-navy text-white border border-navy shadow-sm"
                                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        {dest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Group: Rating */}
                        <div className="py-4">
                            <h3 className="font-bold text-sm text-navy mb-3">Minimum Rating</h3>
                            <div className="flex flex-wrap gap-2">
                                {["4.5 & up", "4.0 & up", "3.5 & up"].map(rating => (
                                    <button
                                        key={rating}
                                        onClick={() => toggleFilter(rating)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center transition-all ${activeFilters.includes(rating)
                                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        {rating} <Star className="w-3 h-3 ml-1 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>

                {/* Main Content */}
                <section className="flex-1">
                    {/* View Toggle & Sort */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-2xl border border-sky-100 shadow-sm gap-4">
                        <div>
                            <h1 className="font-sora text-xl font-bold text-navy">Immigration Experts</h1>
                            <p className="text-sm text-gray-500 mt-0.5">Showing {results.length} professionals based on your filters</p>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <select className="w-full appearance-none bg-sky-50 border border-sky-100 rounded-xl py-2 pl-3 pr-8 text-sm font-semibold text-navy outline-none focus:border-[#0ea5e9]">
                                    <option>Recommended</option>
                                    <option>Highest Rated</option>
                                    <option>Price: Low to High</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <div className="flex bg-gray-100 rounded-xl p-1 shrink-0">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-all ${viewMode === "list" ? "bg-white shadow-sm text-navy" : "text-gray-500 hover:text-navy"}`}
                                >
                                    <List className="w-4 h-4" /> <span className="hidden sm:inline">List</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("map")}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-all ${viewMode === "map" ? "bg-white shadow-sm text-navy" : "text-gray-500 hover:text-navy"}`}
                                >
                                    <MapIcon className="w-4 h-4" /> <span className="hidden sm:inline">Map</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    {viewMode === "list" ? (
                        <div className="space-y-4">
                            {results.map((r, idx) => (
                                <Link href={`/expert/${r.rank}`} key={r.rank} className="block group">
                                    <div className="bg-white border border-sky-100 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all">

                                        {/* Avatar & Badges */}
                                        <div className="w-full md:w-[140px] flex flex-col items-center shrink-0 space-y-3">
                                            <div className="relative w-[120px] h-[120px]">
                                                <img src={r.image} alt={r.name} className="w-full h-full object-cover rounded-2xl shadow-sm" />
                                                {r.statusOpen && (
                                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Open
                                                    </span>
                                                )}
                                            </div>
                                            {r.badge && (
                                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1 text-center w-full justify-center">
                                                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {r.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                                <div>
                                                    <h2 className="text-xl font-bold text-navy group-hover:text-[#0ea5e9] transition-colors flex items-center gap-2">
                                                        {r.name}
                                                        {r.verified && <CheckCircle className="w-4 h-4 text-[#0ea5e9]" />}
                                                    </h2>
                                                    <div className="flex items-center text-sm font-semibold mt-1">
                                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                                                        <span className="text-navy mr-1.5">{r.rating}</span>
                                                        <span className="text-gray-400 font-normal">({r.reviews} reviews)</span>
                                                    </div>
                                                </div>
                                                <div className="text-left sm:text-right">
                                                    <div className="font-bold text-navy text-lg">{r.price}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5 text-xs font-medium text-gray-500 mb-3">
                                                <div className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400 shrink-0" /> {r.distance} from center</div>
                                                <div className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-[#0ea5e9] shrink-0" /> {r.responses}</div>
                                            </div>

                                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">{r.desc}</p>

                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {r.tags.map((tag) => (
                                                    <span key={tag} className="bg-sky-50 text-sky-700 text-xs px-2.5 py-1 rounded-full border border-sky-100 font-semibold">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions (Desktop) */}
                                        <div className="hidden md:flex flex-col justify-end border-l border-sky-100 pl-5 w-[160px] shrink-0">
                                            <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white w-full py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-sky-200 transition-all text-sm active:scale-[0.97]">
                                                Book Free Call
                                            </button>
                                        </div>

                                        {/* Actions (Mobile) */}
                                        <div className="mt-4 pt-4 border-t border-sky-100 flex md:hidden">
                                            <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white w-full py-3 rounded-xl font-bold hover:shadow-lg transition-all text-sm">
                                                Book Free Consultation
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {/* Pagination */}
                            <div className="flex items-center justify-center pt-8 pb-4 gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-sky-200 bg-white hover:bg-sky-50 text-gray-500 transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {[1, 2, 3, 4].map((p) => (
                                    <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${p === 1 ? "bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] text-white shadow-md shadow-sky-200 border-none" : "border border-sky-200 bg-white hover:bg-sky-50 text-navy"}`}>
                                        {p}
                                    </button>
                                ))}
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-sky-200 bg-white hover:bg-sky-50 text-gray-500 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-sky-200 shadow-sm relative bg-sky-50">
                            {/* Map Placeholder */}
                            <div className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=900&fit=crop')" }} />
                            <div className="absolute inset-0 bg-blue-500/10" />

                            {/* Map Pins */}
                            {[{ top: "25%", left: "35%", r: results[0] }, { top: "55%", left: "60%", r: results[1] }, { top: "40%", left: "20%", r: results[2] }].map((pin) => (
                                <div key={pin.r.rank} className="absolute group cursor-pointer" style={{ top: pin.top, left: pin.left }}>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all p-3 border border-sky-100 pointer-events-none z-10 hidden md:block">
                                        <div className="flex gap-3">
                                            <img src={pin.r.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                            <div>
                                                <div className="text-sm font-bold text-navy truncate">{pin.r.name}</div>
                                                <div className="flex items-center text-xs font-semibold mt-0.5">
                                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                                                    {pin.r.rating} ({pin.r.reviews})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#0ea5e9] text-white font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-md border-2 border-white relative z-0 hover:scale-110 transition-transform before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-[#0ea5e9]">
                                        {pin.r.price.split(' ')[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
