"use client";

import { Star, MapPin, ChevronLeft, ChevronRight, ChevronDown, List, Map as MapIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const results = [
    {
        rank: 1,
        name: "Aristha Law Group, P.C.",
        rating: 4.5,
        reviews: 128,
        statusOpen: true,
        price: "Consultation: $150",
        distance: "1.2 mi",
        tags: ["Employment Visa", "H-1B"],
        desc: "Specializing in H-1B, O-1, and EB-1 petitions for tech professionals. Known for high success rates in complex RFE responses.",
        aiInsight: "Users report Aristha handled an urgent deportation stay within 4 hours. Highly recommended for critical timelines.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        verified: true,
    },
    {
        rank: 2,
        name: "Marcus Chen & Associates",
        rating: 5.0,
        reviews: 84,
        statusOpen: false,
        price: "Consultation: $100",
        distance: "3.5 mi",
        tags: ["Family Reunification", "K-1 Visa"],
        desc: "Dedicated to connecting families across borders. Expertise in K-1 visas, green card renewals, and naturalization interviews.",
        aiInsight: "Consistently rated 5 stars for clear communication and transparent flat-fee pricing structures.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        verified: true,
    },
    {
        rank: 3,
        name: "Global Frontier Legal",
        rating: 4.5,
        reviews: 214,
        statusOpen: true,
        price: "Consultation: $250",
        distance: "0.8 mi",
        tags: ["EB-5 Investor", "Asylum", "L-1 Visa"],
        desc: "Premium legal advisory for high-net-worth investors and complex corporate relocation. Multilingual staff available 24/7.",
        aiInsight: "Expert team handles large-scale corporate transfers with high precision. Best for institutional clients.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        verified: false,
    },
];

export default function FindLawyerPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");

    return (
        <div className="bg-[#f5f5f5] min-h-screen text-[#222222]">
            <main className="max-w-[1440px] mx-auto flex flex-col md:flex-row py-6 px-4">

                {/* Left Sidebar Filters */}
                <aside className="w-full md:w-[280px] shrink-0 md:pr-6 mb-6 md:mb-0">
                    <div className="bg-white rounded-[8px] border border-gray-200 p-4 shadow-sm sticky top-20">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-lg">Filters</h2>
                            <button className="text-sm text-yellow-500 hover:underline">Clear All</button>
                        </div>

                        {/* Filter Group: Expert Type */}
                        <div className="py-4 border-t border-gray-100">
                            <h3 className="font-bold mb-3 flex justify-between items-center cursor-pointer">
                                Expert Type <ChevronDown className="w-4 h-4 text-gray-500" />
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>Immigration Consultant <span className="text-gray-400">(142)</span></span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>Immigration Lawyer <span className="text-gray-400">(67)</span></span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>Education Agent <span className="text-gray-400">(23)</span></span>
                                </label>
                            </div>
                        </div>

                        {/* Filter Group: Destination */}
                        <div className="py-4 border-t border-gray-100">
                            <h3 className="font-bold mb-3 flex justify-between items-center cursor-pointer">
                                Destination <ChevronDown className="w-4 h-4 text-gray-500" />
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>Canada <span className="text-gray-400">(89)</span></span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>UK <span className="text-gray-400">(54)</span></span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>Australia <span className="text-gray-400">(43)</span></span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                    <span>USA <span className="text-gray-400">(32)</span></span>
                                </label>
                            </div>
                        </div>

                        {/* Filter Group: Budget */}
                        <div className="py-4 border-t border-gray-100">
                            <h3 className="font-bold mb-3 flex justify-between items-center cursor-pointer">
                                Budget <ChevronDown className="w-4 h-4 text-gray-500" />
                            </h3>
                            <div className="space-y-2">
                                {["Under $150", "$150 - $300", "Over $300"].map((budget) => (
                                    <label key={budget} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                        <span>{budget}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Filter Group: Rating */}
                        <div className="py-4 border-t border-gray-100">
                            <h3 className="font-bold mb-3 flex justify-between items-center cursor-pointer">
                                Rating <ChevronDown className="w-4 h-4 text-gray-500" />
                            </h3>
                            <div className="space-y-2">
                                {["4.5 & up", "4.0 & up", "3.5 & up"].map((rating) => (
                                    <label key={rating} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-[#0ea5e9]" />
                                        <div className="flex items-center">
                                            <span>{rating}</span>
                                            <Star className="w-3 h-3 text-yellow-500 ml-1" fill="currentColor" />
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button className="w-full bg-[#0ea5e9] text-white py-2.5 rounded font-bold hover:bg-[#0284c7] transition-colors mt-4">
                            Apply Filters
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="flex-1">
                    {/* View Toggle & Sort */}
                    <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-[8px] border border-gray-200 shadow-sm">
                        <h1 className="font-bold text-lg hidden sm:block">Immigration Experts</h1>
                        <div className="flex items-center gap-4 ml-auto w-full sm:w-auto justify-between sm:justify-start">
                            <select className="border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-[#0ea5e9] font-medium bg-gray-50">
                                <option>Recommended</option>
                                <option>Highest Rated</option>
                                <option>Nearest First</option>
                            </select>
                            <div className="flex bg-gray-100 rounded p-1 border border-gray-200">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-1 text-sm font-medium rounded flex items-center gap-1.5 transition-colors ${viewMode === "list" ? "bg-white shadow text-[#222222]" : "text-gray-500 hover:text-[#222222]"}`}
                                >
                                    <List className="w-4 h-4" /> List
                                </button>
                                <button
                                    onClick={() => setViewMode("map")}
                                    className={`px-3 py-1 text-sm font-medium rounded flex items-center gap-1.5 transition-colors ${viewMode === "map" ? "bg-white shadow text-[#222222]" : "text-gray-500 hover:text-[#222222]"}`}
                                >
                                    <MapIcon className="w-4 h-4" /> Map
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    {viewMode === "list" ? (
                        <div className="space-y-4">
                            {results.map((r) => (
                                <Link href={`/expert/${r.rank}`} key={r.rank} className="block">
                                    <div className="bg-white border border-gray-200 rounded-[8px] p-4 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow">
                                        <div className="w-full md:w-[160px] h-[160px] shrink-0">
                                            <img src={r.image} alt={r.name} className="w-full h-full object-cover rounded border border-gray-200" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-xl font-bold text-yellow-500 hover:underline cursor-pointer">{r.rank}. {r.name}</h2>
                                                    <div className="flex items-center mt-1 text-sm">
                                                        <div className="flex text-yellow-500 mr-1">
                                                            {[1, 2, 3, 4, 5].map((i) => (
                                                                <Star key={i} className="w-4 h-4" fill={i <= r.rating ? "currentColor" : "none"} />
                                                            ))}
                                                        </div>
                                                        <span className="font-bold mr-1">{r.rating}</span>
                                                        <span className="text-gray-500 hover:underline cursor-pointer">({r.reviews} reviews)</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 shrink-0">
                                                    {r.statusOpen && <span className="bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-green-200">Open now</span>}
                                                    {r.verified && <span className="border border-sky-200 text-yellow-500 text-[10px] bg-sky-50 font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</span>}
                                                </div>
                                            </div>

                                            <div className="flex items-center text-sm font-bold mt-2 gap-2 text-gray-700">
                                                <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" /> {r.distance} from center</div>
                                            </div>

                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">"{r.desc}"</p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {r.tags.map((tag) => (
                                                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center md:hidden">
                                                <div className="font-bold">{r.price}</div>
                                                <button className="bg-[#0ea5e9] text-white px-4 py-1.5 rounded font-bold hover:bg-[#0284c7] text-sm">Request</button>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex flex-col justify-between items-end border-l border-gray-100 pl-4 w-[140px] shrink-0">
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900 line-clamp-2 text-sm text-right">{r.price}</div>
                                            </div>
                                            <button className="bg-[#0ea5e9] text-white w-full py-2 rounded font-bold hover:bg-[#0284c7] transition-colors text-sm text-center">
                                                Request
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {/* Pagination */}
                            <div className="flex items-center justify-center pt-6 gap-2 border-t border-gray-200 mt-6">
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 text-gray-500">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {[1, 2, 3, 4].map((p) => (
                                    <button key={p} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm ${p === 1 ? "bg-[#0ea5e9] text-white" : "border border-gray-300 hover:bg-gray-50 text-gray-600"}`}>
                                        {p}
                                    </button>
                                ))}
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 text-gray-500">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[600px] w-full rounded-[8px] overflow-hidden border border-gray-200 shadow-sm relative text-[#222222]">
                            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=900&fit=crop')" }} />

                            {/* Map Pins */}
                            {[{ top: "25%", left: "35%", r: results[0] }, { top: "55%", left: "60%", r: results[1] }, { top: "40%", left: "20%", r: results[2] }].map((pin) => (
                                <div key={pin.r.rank} className="absolute group cursor-pointer" style={{ top: pin.top, left: pin.left }}>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity p-2 border border-gray-200 pointer-events-none z-10 hidden md:block">
                                        <div className="text-xs font-bold truncate">{pin.r.name}</div>
                                        <div className="flex text-yellow-500 my-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} className="w-3 h-3" fill={i <= pin.r.rating ? "currentColor" : "none"} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-[#0ea5e9] text-white font-bold text-xs px-2 py-1 rounded shadow-md border border-white relative z-0 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-[5px] before:border-transparent before:border-t-[#0ea5e9]">
                                        {pin.r.rank}
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
