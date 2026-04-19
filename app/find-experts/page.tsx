"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, ChevronDown, List, Map as MapIcon, CheckCircle, Clock, Search, Filter, X } from "lucide-react";

const allExperts = [
    { id: 1, name: "Marcus Thorne, JD", category: "work", role: "Immigration Attorney", rating: 4.9, reviews: 142, price: 2500, city: "Hyderabad", countries: ["USA", "Canada"], experience: 15, isRemote: true, isAvailableToday: true, isEmergency: true, tags: ["H-1B", "L-1", "EB-1"], image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" },
    { id: 2, name: "Elena Rodriguez", category: "student", role: "Student Visa Consultant", rating: 5.0, reviews: 89, price: 1500, city: "Mumbai", countries: ["UK", "Australia"], experience: 8, isRemote: true, isAvailableToday: true, isEmergency: false, tags: ["Student Visa", "SOP Review"], image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
    { id: 3, name: "Raj Patel", category: "pr", role: "Express Entry Specialist", rating: 4.8, reviews: 234, price: 1800, city: "Delhi", countries: ["Canada", "Australia"], experience: 12, isRemote: false, isAvailableToday: false, isEmergency: false, tags: ["Express Entry", "PNP", "SINP"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
    { id: 4, name: "Aisha Khan", category: "student", role: "UK Visa Consultant", rating: 4.6, reviews: 67, price: 1200, city: "Bangalore", countries: ["UK", "Germany"], experience: 5, isRemote: true, isAvailableToday: true, isEmergency: false, tags: ["UK Student", "Germany Blue Card"], image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
    { id: 5, name: "Deepak Kumar", category: "work", role: "Work Permit Advisor", rating: 4.7, reviews: 156, price: 2000, city: "Hyderabad", countries: ["Canada", "UAE"], experience: 10, isRemote: true, isAvailableToday: false, isEmergency: true, tags: ["LMIA", "Work Permit", "PGWP"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
    { id: 6, name: "Priya Nair", category: "pr", role: "PR & Citizenship Expert", rating: 4.9, reviews: 312, price: 3000, city: "Chennai", countries: ["Canada", "Australia", "USA"], experience: 18, isRemote: true, isAvailableToday: true, isEmergency: false, tags: ["PR", "Citizenship", "Super Visa"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
];

const categoryFilters = ["All", "Student Visa", "Work Permit", "PR", "Local Expert"];
const cityFilters = ["All Cities", "Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Remote"];
const ratingFilters = ["Any", "4★+", "4.5★+", "Top Rated"];
const availFilters = ["Anytime", "Today", "This Week", "Emergency 24/7"];

export default function FindExpertsPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [category, setCategory] = useState("All");
    const [city, setCity] = useState("All Cities");
    const [rating, setRating] = useState("Any");
    const [avail, setAvail] = useState("Anytime");
    const [sortBy, setSortBy] = useState("recommended");
    const [searchText, setSearchText] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const filtered = allExperts.filter(e => {
        if (category !== "All" && !e.tags.some(t => t.toLowerCase().includes(category.toLowerCase().replace(" visa", "").replace(" permit", "").replace("local ", "")))) {
            if (category === "Student Visa" && e.category !== "student") return false;
            if (category === "Work Permit" && e.category !== "work") return false;
            if (category === "PR" && e.category !== "pr") return false;
        }
        if (city !== "All Cities" && city !== "Remote" && e.city !== city) return false;
        if (city === "Remote" && !e.isRemote) return false;
        if (rating === "4★+" && e.rating < 4) return false;
        if (rating === "4.5★+" && e.rating < 4.5) return false;
        if (rating === "Top Rated" && e.rating < 4.8) return false;
        if (avail === "Today" && !e.isAvailableToday) return false;
        if (avail === "Emergency 24/7" && !e.isEmergency) return false;
        if (searchText && !e.name.toLowerCase().includes(searchText.toLowerCase()) && !e.tags.some(t => t.toLowerCase().includes(searchText.toLowerCase()))) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews; // recommended
    });

    const FilterSidebar = () => (
        <div className="space-y-5">
            {/* Category */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                    {categoryFilters.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${category === c ? "bg-[#0ea5e9] text-white" : "bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            {/* City */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</h3>
                <div className="flex flex-wrap gap-2">
                    {cityFilters.map(c => (
                        <button key={c} onClick={() => setCity(c)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${city === c ? "bg-navy text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            {/* Rating */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rating</h3>
                <div className="flex flex-wrap gap-2">
                    {ratingFilters.map(r => (
                        <button key={r} onClick={() => setRating(r)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${rating === r ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>
            {/* Availability */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Availability</h3>
                <div className="flex flex-wrap gap-2">
                    {availFilters.map(a => (
                        <button key={a} onClick={() => setAvail(a)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${avail === a ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                            {a}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={() => { setCategory("All"); setCity("All Cities"); setRating("Any"); setAvail("Anytime"); }}
                className="w-full text-sm font-semibold text-[#0ea5e9] hover:underline mt-2">Clear All Filters</button>
        </div>
    );

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            <main className="max-w-7xl mx-auto flex flex-col lg:flex-row py-6 px-4 gap-6">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-[300px] shrink-0">
                    <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm sticky top-24">
                        <h2 className="font-sora text-lg font-bold text-navy mb-4">Filters</h2>
                        <FilterSidebar />
                    </div>
                </aside>

                {/* Mobile Filter Button */}
                <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 bg-white border border-sky-100 rounded-xl px-4 py-3 font-bold text-sm text-navy shadow-sm">
                    <Filter className="w-4 h-4" /> Filters
                    {(category !== "All" || city !== "All Cities" || rating !== "Any" || avail !== "Anytime") && (
                        <span className="bg-[#0ea5e9] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">●</span>
                    )}
                </button>

                {/* Mobile Filter Drawer */}
                {showMobileFilters && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-sora font-bold text-navy">Filters</h3>
                                <button onClick={() => setShowMobileFilters(false)}><X className="w-5 h-5 text-gray-400" /></button>
                            </div>
                            <FilterSidebar />
                            <button onClick={() => setShowMobileFilters(false)} className="w-full mt-4 bg-[#0ea5e9] text-white py-3 rounded-xl font-bold">Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <section className="flex-1">
                    {/* Search + Sort Bar */}
                    <div className="bg-white rounded-2xl border border-sky-100 p-4 shadow-sm mb-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-xl px-3 py-2 flex-1 w-full sm:w-auto">
                            <Search className="w-4 h-4 text-gray-400 shrink-0" />
                            <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search by name, tag, or specialty..." className="bg-transparent outline-none text-sm w-full" />
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                            <div className="relative">
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none bg-sky-50 border border-sky-100 rounded-xl py-2 pl-3 pr-8 text-sm font-semibold text-navy outline-none">
                                    <option value="recommended">Recommended</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="price-low">Price: Low → High</option>
                                    <option value="price-high">Price: High → Low</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <div className="flex bg-gray-100 rounded-xl p-1 shrink-0">
                                <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-all ${viewMode === "list" ? "bg-white shadow-sm text-navy" : "text-gray-500"}`}>
                                    <List className="w-4 h-4" />
                                </button>
                                <button onClick={() => setViewMode("map")} className={`px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-all ${viewMode === "map" ? "bg-white shadow-sm text-navy" : "text-gray-500"}`}>
                                    <MapIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 font-medium">{sorted.length} expert{sorted.length !== 1 ? "s" : ""} found</p>

                    {viewMode === "list" ? (
                        <div className="space-y-4">
                            {sorted.map(e => (
                                <Link href={`/expert/${e.id}`} key={e.id} className="block group">
                                    <div className="bg-white border border-sky-100 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                                        <div className="relative w-full md:w-[100px] h-[100px] shrink-0">
                                            <img src={e.image} alt={e.name} className="w-full h-full object-cover rounded-2xl" />
                                            {e.isAvailableToday && (
                                                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white flex items-center gap-0.5">
                                                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" /> Open
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-navy group-hover:text-[#0ea5e9] transition-colors flex items-center gap-2">
                                                        {e.name} <CheckCircle className="w-4 h-4 text-[#0ea5e9]" />
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{e.role} · {e.experience} yrs experience</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className="font-bold text-navy text-lg">₹{e.price.toLocaleString()}</div>
                                                    <div className="text-xs text-gray-400">per session</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500 mb-3">
                                                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {e.rating} ({e.reviews})</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {e.city}</span>
                                                {e.isRemote && <span className="text-emerald-600">· Remote available</span>}
                                                {e.isEmergency && <span className="text-red-500">· 24/7 Emergency</span>}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {e.tags.map(tag => (
                                                    <span key={tag} className="bg-sky-50 text-sky-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-sky-100">{tag}</span>
                                                ))}
                                                {e.countries.map(c => (
                                                    <span key={c} className="bg-gray-50 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-full border border-gray-200">{c}</span>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-5 py-2 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]">Book Now</button>
                                                <button className="border border-sky-200 text-[#0ea5e9] px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-50 transition-all">View Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {sorted.length === 0 && (
                                <div className="text-center py-16 bg-white rounded-2xl border border-sky-100">
                                    <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                    <h3 className="font-sora font-bold text-navy mb-1">No experts found</h3>
                                    <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-sky-200 shadow-sm relative bg-sky-50">
                            <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=900&fit=crop')" }} />
                            <div className="absolute inset-0 bg-blue-500/10" />
                            {sorted.slice(0, 4).map((e, i) => {
                                const positions = [{ top: "20%", left: "30%" }, { top: "50%", left: "55%" }, { top: "35%", left: "15%" }, { top: "60%", left: "70%" }];
                                const pos = positions[i] || positions[0];
                                return (
                                    <div key={e.id} className="absolute group cursor-pointer" style={pos}>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all p-3 border border-sky-100 pointer-events-none z-10">
                                            <div className="flex gap-3">
                                                <img src={e.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                                <div>
                                                    <div className="text-sm font-bold text-navy truncate">{e.name}</div>
                                                    <div className="flex items-center text-xs font-semibold">
                                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" /> {e.rating} · ₹{e.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#0ea5e9] text-white font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-md border-2 border-white hover:scale-110 transition-transform">
                                            ₹{e.price.toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
