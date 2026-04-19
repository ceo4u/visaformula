"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Calendar, Users, Plane, Hotel, Utensils, Camera, ArrowRight, Filter, X, CheckCircle } from "lucide-react";

const allTours = [
    {
        id: 1, name: "Bali Paradise Getaway", destination: "Bali, Indonesia", days: 5, nights: 4,
        price: 25000, originalPrice: 32000, rating: 4.8, reviews: 156, group: "2-6 people",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop",
        includes: ["Visa Assistance", "Hotel", "Sightseeing", "Airport Transfer"],
        tags: ["Beach", "Adventure"],
        description: "Explore Bali's stunning temples, rice terraces, and pristine beaches. Visa processing included.",
    },
    {
        id: 2, name: "Dubai City & Desert Safari", destination: "Dubai, UAE", days: 6, nights: 5,
        price: 55000, originalPrice: 68000, rating: 4.9, reviews: 234, group: "2-8 people",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
        includes: ["Visa Processing", "5★ Hotel", "Desert Safari", "Burj Khalifa"],
        tags: ["Luxury", "Shopping"],
        description: "Experience the glamour of Dubai with a desert safari, Burj Khalifa visit, and luxury shopping.",
    },
    {
        id: 3, name: "Europe 5-Country Tour", destination: "France · Italy · Switzerland · Germany · Netherlands", days: 14, nights: 13,
        price: 110000, originalPrice: 145000, rating: 4.7, reviews: 89, group: "4-12 people",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop",
        includes: ["Schengen Visa", "Hotels", "Train Pass", "City Tours"],
        tags: ["Multi-Country", "Culture"],
        description: "The ultimate European adventure — Paris, Rome, Zurich, Munich, and Amsterdam in one epic trip.",
    },
    {
        id: 4, name: "Thailand Beach & Culture", destination: "Bangkok · Pattaya · Phuket", days: 7, nights: 6,
        price: 22000, originalPrice: 28000, rating: 4.6, reviews: 198, group: "2-6 people",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=500&fit=crop",
        includes: ["Visa on Arrival", "Hotel", "Island Hopping", "Thai Massage"],
        tags: ["Beach", "Budget"],
        description: "From Bangkok's temples to Phuket's beaches — a perfect budget-friendly tropical escape.",
    },
    {
        id: 5, name: "Singapore Family Package", destination: "Singapore", days: 5, nights: 4,
        price: 45000, originalPrice: 52000, rating: 4.9, reviews: 312, group: "2-6 people",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=500&fit=crop",
        includes: ["Visa", "Hotel", "Universal Studios", "Gardens by the Bay"],
        tags: ["Family", "City"],
        description: "Perfect family holiday — Universal Studios, Sentosa Island, Gardens by the Bay, and more.",
    },
    {
        id: 6, name: "Maldives Honeymoon Special", destination: "Maldives", days: 4, nights: 3,
        price: 85000, originalPrice: 110000, rating: 5.0, reviews: 67, group: "Couples",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=500&fit=crop",
        includes: ["Visa on Arrival", "Water Villa", "Snorkeling", "Candlelight Dinner"],
        tags: ["Luxury", "Romantic"],
        description: "Stay in an overwater villa, snorkel in crystal waters, and enjoy a candlelight dinner under the stars.",
    },
];

const destinations = ["All", "Bali", "Dubai", "Europe", "Thailand", "Singapore", "Maldives"];
const tagFilters = ["All", "Beach", "Luxury", "Budget", "Family", "Adventure", "Culture", "Romantic"];

export default function ToursPage() {
    const [destFilter, setDestFilter] = useState("All");
    const [tagFilter, setTagFilter] = useState("All");
    const [sortBy, setSortBy] = useState("popular");

    const filtered = allTours.filter(t => {
        if (destFilter !== "All" && !t.destination.toLowerCase().includes(destFilter.toLowerCase())) return false;
        if (tagFilter !== "All" && !t.tags.includes(tagFilter)) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews;
    });

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-navy via-ink to-navy py-16 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&h=600&fit=crop" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm mb-4 inline-block">✈️ Visa + Hotel Bundles</span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-white mb-3">
                        Tour <span className="text-[#38bdf8]">Packages</span>
                    </h1>
                    <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
                        All-inclusive holiday packages with visa processing. Just pack your bags — we handle the rest.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10 mb-8">
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Destination</label>
                            <div className="flex flex-wrap gap-2">
                                {destinations.map(d => (
                                    <button key={d} onClick={() => setDestFilter(d)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${destFilter === d ? "bg-[#0ea5e9] text-white" : "bg-sky-50 text-sky-700 border border-sky-100"}`}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Type</label>
                            <div className="flex flex-wrap gap-2">
                                {tagFilters.map(t => (
                                    <button key={t} onClick={() => setTagFilter(t)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${tagFilter === t ? "bg-navy text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-500 font-medium">{sorted.length} package{sorted.length !== 1 ? "s" : ""} found</p>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-sky-50 border border-sky-100 rounded-xl py-2 pl-3 pr-8 text-sm font-semibold text-navy outline-none appearance-none">
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price-low">Price: Low → High</option>
                        <option value="price-high">Price: High → Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sorted.map(tour => (
                        <div key={tour.id} className="group bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all">
                            <div className="relative h-48 overflow-hidden">
                                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 flex gap-1.5">
                                    {tour.tags.map(tag => (
                                        <span key={tag} className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                    {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-bold text-navy text-base mb-0.5">{tour.name}</h3>
                                        <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {tour.destination}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
                                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {tour.rating}
                                        <span className="text-gray-400">({tour.reviews})</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{tour.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {tour.includes.map(inc => (
                                        <span key={inc} className="bg-sky-50 text-sky-700 text-[10px] font-bold px-2 py-1 rounded-full border border-sky-100 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> {inc}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mb-3 text-xs text-gray-500 font-medium">
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {tour.days}D / {tour.nights}N</span>
                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {tour.group}</span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-sky-100">
                                    <div>
                                        <span className="text-xs text-gray-400 line-through">₹{tour.originalPrice.toLocaleString()}</span>
                                        <span className="font-bold text-navy text-lg ml-1.5">₹{tour.price.toLocaleString()}</span>
                                        <span className="text-xs text-gray-400 ml-1">/ person</span>
                                    </div>
                                    <Link href={`/tour/${tour.id}`}>
                                        <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
